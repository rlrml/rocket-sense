import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const FIELD_HALF_WIDTH = 4096;
const FIELD_HALF_LENGTH = 5120;
const FIELD_SCALE = 0.01;
const MARKER_LAYER_NAME = "goal-touch-marker";

export interface GoalTouchLocation {
  id: string;
  index: number;
  scorerName: string;
  team: number | null;
  time: number | null;
  position: {
    x: number;
    y: number;
    z: number;
  };
}

export function GoalTouchMap({
  goals,
  activeId,
  onActivate,
}: {
  goals: GoalTouchLocation[];
  activeId: string | null;
  onActivate: (goalId: string, force: boolean) => void;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const activeIdRef = useRef(activeId);
  const onActivateRef = useRef(onActivate);
  const markersRef = useRef<Map<string, GoalTouchMarker>>(new Map());

  useEffect(() => {
    activeIdRef.current = activeId;
    updateMarkerSelection(markersRef.current, activeId);
  }, [activeId]);

  useEffect(() => {
    onActivateRef.current = onActivate;
  }, [onActivate]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8fafc);
    scene.fog = new THREE.Fog(0xf8fafc, 90, 180);

    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 500);
    camera.position.set(0, 76, 104);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enablePan = false;
    controls.minDistance = 55;
    controls.maxDistance = 150;
    controls.maxPolarAngle = Math.PI * 0.48;
    controls.target.set(0, 0, 0);

    addLights(scene);
    createField(scene);

    const markerMeshes: THREE.Object3D[] = [];
    const markers = new Map<string, GoalTouchMarker>();
    for (const goal of goals) {
      const marker = createGoalTouchMarker(goal);
      markers.set(goal.id, marker);
      markerMeshes.push(marker.pickMesh);
      scene.add(marker.group);
    }
    markersRef.current = markers;
    updateMarkerSelection(markers, activeIdRef.current);

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const updatePointer = (event: PointerEvent) => {
      const bounds = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      pointer.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const [hit] = raycaster.intersectObjects(markerMeshes, false);
      const goalId = hit?.object.userData.goalId as string | undefined;
      renderer.domElement.style.cursor = goalId ? "pointer" : "grab";
      if (goalId && goalId !== activeIdRef.current) {
        onActivateRef.current(goalId, false);
      }
    };
    const handleClick = (event: PointerEvent) => {
      const bounds = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      pointer.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const [hit] = raycaster.intersectObjects(markerMeshes, false);
      const goalId = hit?.object.userData.goalId as string | undefined;
      if (goalId) {
        onActivateRef.current(goalId, true);
      }
    };

    renderer.domElement.addEventListener("pointermove", updatePointer);
    renderer.domElement.addEventListener("click", handleClick);

    const resize = () => {
      const width = Math.max(1, container.clientWidth);
      const height = Math.max(1, container.clientHeight);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();

    let animationFrame = 0;
    const animate = () => {
      controls.update();
      for (const marker of markers.values()) {
        marker.label.quaternion.copy(camera.quaternion);
      }
      renderer.render(scene, camera);
      animationFrame = window.requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.cancelAnimationFrame(animationFrame);
      observer.disconnect();
      renderer.domElement.removeEventListener("pointermove", updatePointer);
      renderer.domElement.removeEventListener("click", handleClick);
      controls.dispose();
      scene.traverse((object: THREE.Object3D) => {
        const mesh = object as THREE.Mesh;
        mesh.geometry?.dispose();
        const material = mesh.material;
        if (Array.isArray(material)) {
          material.forEach((entry) => entry.dispose());
        } else {
          material?.dispose();
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
      markersRef.current = new Map();
    };
  }, [goals]);

  if (!goals.length) {
    return <div className="goal-touch-map-empty">No scoring touch locations</div>;
  }

  return <div className="goal-touch-map" ref={containerRef} />;
}

interface GoalTouchMarker {
  group: THREE.Group;
  pickMesh: THREE.Mesh;
  orb: THREE.Mesh;
  halo: THREE.Mesh;
  label: THREE.Sprite;
  team: number | null;
}

function createField(scene: THREE.Scene) {
  const fieldWidth = FIELD_HALF_WIDTH * 2 * FIELD_SCALE;
  const fieldLength = FIELD_HALF_LENGTH * 2 * FIELD_SCALE;
  const field = new THREE.Mesh(
    new THREE.PlaneGeometry(fieldWidth, fieldLength),
    new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.86, metalness: 0.02 }),
  );
  field.rotation.x = -Math.PI / 2;
  field.receiveShadow = true;
  scene.add(field);

  const border = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.BoxGeometry(fieldWidth, 0.1, fieldLength)),
    new THREE.LineBasicMaterial({ color: 0x475569 }),
  );
  border.position.y = 0.08;
  scene.add(border);

  addFieldLine(scene, [-FIELD_HALF_WIDTH, 0], [FIELD_HALF_WIDTH, 0], 0x94a3b8);
  addFieldLine(scene, [0, -FIELD_HALF_LENGTH], [0, FIELD_HALF_LENGTH], 0xcbd5e1);
  addFieldCircle(scene, 0, 0, 900, 0xcbd5e1);
  addGoalMouth(scene, -FIELD_HALF_LENGTH, 0x3b82f6);
  addGoalMouth(scene, FIELD_HALF_LENGTH, 0xf97316);
  addBox(scene, -FIELD_HALF_LENGTH, 0x3b82f6);
  addBox(scene, FIELD_HALF_LENGTH, 0xf97316);
}

function addLights(scene: THREE.Scene) {
  scene.add(new THREE.HemisphereLight(0xffffff, 0x94a3b8, 2.2));
  const light = new THREE.DirectionalLight(0xffffff, 2.8);
  light.position.set(-32, 72, 48);
  light.castShadow = true;
  light.shadow.mapSize.set(1024, 1024);
  scene.add(light);
}

function addFieldLine(scene: THREE.Scene, start: [number, number], end: [number, number], color: number) {
  const geometry = new THREE.BufferGeometry().setFromPoints([
    fieldPoint(start[0], start[1], 0.16),
    fieldPoint(end[0], end[1], 0.16),
  ]);
  scene.add(new THREE.Line(geometry, new THREE.LineBasicMaterial({ color })));
}

function addFieldCircle(scene: THREE.Scene, x: number, y: number, radius: number, color: number) {
  const points: THREE.Vector3[] = [];
  for (let index = 0; index <= 96; index += 1) {
    const angle = (index / 96) * Math.PI * 2;
    points.push(fieldPoint(x + Math.cos(angle) * radius, y + Math.sin(angle) * radius, 0.17));
  }
  scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), new THREE.LineBasicMaterial({ color })));
}

function addGoalMouth(scene: THREE.Scene, y: number, color: number) {
  const width = 1786;
  const depth = 820;
  const z = 0.2;
  const sign = y > 0 ? 1 : -1;
  const points = [
    fieldPoint(-width / 2, y, z),
    fieldPoint(-width / 2, y + sign * depth, z),
    fieldPoint(width / 2, y + sign * depth, z),
    fieldPoint(width / 2, y, z),
  ];
  scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), new THREE.LineBasicMaterial({ color })));
}

function addBox(scene: THREE.Scene, y: number, color: number) {
  const width = 5120;
  const depth = 1150;
  const sign = y > 0 ? -1 : 1;
  const points = [
    fieldPoint(-width / 2, y, 0.18),
    fieldPoint(-width / 2, y + sign * depth, 0.18),
    fieldPoint(width / 2, y + sign * depth, 0.18),
    fieldPoint(width / 2, y, 0.18),
  ];
  scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), new THREE.LineBasicMaterial({ color })));
}

function createGoalTouchMarker(goal: GoalTouchLocation): GoalTouchMarker {
  const teamColor = goal.team === 0 ? 0x2563eb : goal.team === 1 ? 0xea580c : 0x64748b;
  const group = new THREE.Group();
  group.name = MARKER_LAYER_NAME;
  group.position.copy(fieldPoint(goal.position.x, goal.position.y, Math.max(goal.position.z, 120)));

  const stemHeight = Math.max(0.8, goal.position.z * FIELD_SCALE);
  const stem = new THREE.Mesh(
    new THREE.CylinderGeometry(0.035, 0.035, stemHeight, 10),
    new THREE.MeshBasicMaterial({ color: teamColor, transparent: true, opacity: 0.42 }),
  );
  stem.position.y = -stemHeight / 2;
  group.add(stem);

  const orb = new THREE.Mesh(
    new THREE.SphereGeometry(0.58, 24, 16),
    new THREE.MeshStandardMaterial({ color: teamColor, roughness: 0.38, metalness: 0.08 }),
  );
  orb.castShadow = true;
  group.add(orb);

  const halo = new THREE.Mesh(
    new THREE.RingGeometry(0.72, 0.98, 32),
    new THREE.MeshBasicMaterial({ color: teamColor, transparent: true, opacity: 0.32, side: THREE.DoubleSide }),
  );
  halo.rotation.x = -Math.PI / 2;
  halo.position.y = -goal.position.z * FIELD_SCALE + 0.12;
  group.add(halo);

  const pickMesh = new THREE.Mesh(
    new THREE.SphereGeometry(1.25, 16, 12),
    new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 }),
  );
  pickMesh.userData.goalId = goal.id;
  group.add(pickMesh);

  const label = createLabelSprite(String(goal.index + 1), teamColor);
  label.position.set(0, 1.15, 0);
  group.add(label);

  return { group, pickMesh, orb, halo, label, team: goal.team };
}

function createLabelSprite(text: string, color: number): THREE.Sprite {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Unable to create goal touch marker label");
  }
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = `#${color.toString(16).padStart(6, "0")}`;
  context.beginPath();
  context.arc(64, 64, 48, 0, Math.PI * 2);
  context.fill();
  context.fillStyle = "#ffffff";
  context.font = "800 54px Inter, system-ui, sans-serif";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(text, 64, 66);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true }));
  sprite.scale.set(2.6, 2.6, 1);
  return sprite;
}

function updateMarkerSelection(markers: Map<string, GoalTouchMarker>, activeId: string | null) {
  for (const [id, marker] of markers) {
    const active = id === activeId;
    marker.group.scale.setScalar(active ? 1.45 : 1);
    marker.halo.visible = active;
    const material = marker.orb.material as THREE.MeshStandardMaterial;
    material.emissive.setHex(active ? (marker.team === 0 ? 0x1d4ed8 : marker.team === 1 ? 0xc2410c : 0x475569) : 0x000000);
    material.emissiveIntensity = active ? 0.35 : 0;
  }
}

function fieldPoint(x: number, y: number, z: number): THREE.Vector3 {
  return new THREE.Vector3(x * FIELD_SCALE, z, -y * FIELD_SCALE);
}
