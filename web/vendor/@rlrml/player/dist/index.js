import * as c from "three";
import { Controls as jn, Vector3 as K, MOUSE as he, TOUCH as ce, Quaternion as mt, Spherical as pt, Vector2 as W, Ray as Hn, Plane as Wn, MathUtils as $n } from "three";
import { boostAmountToPercent as $t } from "./boost-units.js";
import { BOOST_RAW_MAX as Qr, boostPercentToAmount as Jr } from "./boost-units.js";
import * as Te from "@rlrml/subtr-actor";
const ft = { type: "change" }, et = { type: "start" }, Kt = { type: "end" }, _e = new Hn(), bt = new Wn(), Kn = Math.cos(70 * $n.DEG2RAD), z = new K(), G = 2 * Math.PI, R = {
  NONE: -1,
  ROTATE: 0,
  DOLLY: 1,
  PAN: 2,
  TOUCH_ROTATE: 3,
  TOUCH_PAN: 4,
  TOUCH_DOLLY_PAN: 5,
  TOUCH_DOLLY_ROTATE: 6
}, Be = 1e-6;
class Yn extends jn {
  /**
   * Constructs a new controls instance.
   *
   * @param {Object3D} object - The object that is managed by the controls.
   * @param {?HTMLDOMElement} domElement - The HTML element used for event listeners.
   */
  constructor(t, n = null) {
    super(t, n), this.state = R.NONE, this.target = new K(), this.cursor = new K(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.keyRotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: he.ROTATE, MIDDLE: he.DOLLY, RIGHT: he.PAN }, this.touches = { ONE: ce.ROTATE, TWO: ce.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this._lastPosition = new K(), this._lastQuaternion = new mt(), this._lastTargetPosition = new K(), this._quat = new mt().setFromUnitVectors(t.up, new K(0, 1, 0)), this._quatInverse = this._quat.clone().invert(), this._spherical = new pt(), this._sphericalDelta = new pt(), this._scale = 1, this._panOffset = new K(), this._rotateStart = new W(), this._rotateEnd = new W(), this._rotateDelta = new W(), this._panStart = new W(), this._panEnd = new W(), this._panDelta = new W(), this._dollyStart = new W(), this._dollyEnd = new W(), this._dollyDelta = new W(), this._dollyDirection = new K(), this._mouse = new W(), this._performCursorZoom = !1, this._pointers = [], this._pointerPositions = {}, this._controlActive = !1, this._onPointerMove = Xn.bind(this), this._onPointerDown = Zn.bind(this), this._onPointerUp = qn.bind(this), this._onContextMenu = ia.bind(this), this._onMouseWheel = ea.bind(this), this._onKeyDown = ta.bind(this), this._onTouchStart = na.bind(this), this._onTouchMove = aa.bind(this), this._onMouseDown = Qn.bind(this), this._onMouseMove = Jn.bind(this), this._interceptControlDown = sa.bind(this), this._interceptControlUp = ra.bind(this), this.domElement !== null && this.connect(this.domElement), this.update();
  }
  connect(t) {
    super.connect(t), this.domElement.addEventListener("pointerdown", this._onPointerDown), this.domElement.addEventListener("pointercancel", this._onPointerUp), this.domElement.addEventListener("contextmenu", this._onContextMenu), this.domElement.addEventListener("wheel", this._onMouseWheel, { passive: !1 }), this.domElement.getRootNode().addEventListener("keydown", this._interceptControlDown, { passive: !0, capture: !0 }), this.domElement.style.touchAction = "none";
  }
  disconnect() {
    this.domElement.removeEventListener("pointerdown", this._onPointerDown), this.domElement.removeEventListener("pointermove", this._onPointerMove), this.domElement.removeEventListener("pointerup", this._onPointerUp), this.domElement.removeEventListener("pointercancel", this._onPointerUp), this.domElement.removeEventListener("wheel", this._onMouseWheel), this.domElement.removeEventListener("contextmenu", this._onContextMenu), this.stopListenToKeyEvents(), this.domElement.getRootNode().removeEventListener("keydown", this._interceptControlDown, { capture: !0 }), this.domElement.style.touchAction = "auto";
  }
  dispose() {
    this.disconnect();
  }
  /**
   * Get the current vertical rotation, in radians.
   *
   * @return {number} The current vertical rotation, in radians.
   */
  getPolarAngle() {
    return this._spherical.phi;
  }
  /**
   * Get the current horizontal rotation, in radians.
   *
   * @return {number} The current horizontal rotation, in radians.
   */
  getAzimuthalAngle() {
    return this._spherical.theta;
  }
  /**
   * Returns the distance from the camera to the target.
   *
   * @return {number} The distance from the camera to the target.
   */
  getDistance() {
    return this.object.position.distanceTo(this.target);
  }
  /**
   * Adds key event listeners to the given DOM element.
   * `window` is a recommended argument for using this method.
   *
   * @param {HTMLDOMElement} domElement - The DOM element
   */
  listenToKeyEvents(t) {
    t.addEventListener("keydown", this._onKeyDown), this._domElementKeyEvents = t;
  }
  /**
   * Removes the key event listener previously defined with `listenToKeyEvents()`.
   */
  stopListenToKeyEvents() {
    this._domElementKeyEvents !== null && (this._domElementKeyEvents.removeEventListener("keydown", this._onKeyDown), this._domElementKeyEvents = null);
  }
  /**
   * Save the current state of the controls. This can later be recovered with `reset()`.
   */
  saveState() {
    this.target0.copy(this.target), this.position0.copy(this.object.position), this.zoom0 = this.object.zoom;
  }
  /**
   * Reset the controls to their state from either the last time the `saveState()`
   * was called, or the initial state.
   */
  reset() {
    this.target.copy(this.target0), this.object.position.copy(this.position0), this.object.zoom = this.zoom0, this.object.updateProjectionMatrix(), this.dispatchEvent(ft), this.update(), this.state = R.NONE;
  }
  update(t = null) {
    const n = this.object.position;
    z.copy(n).sub(this.target), z.applyQuaternion(this._quat), this._spherical.setFromVector3(z), this.autoRotate && this.state === R.NONE && this._rotateLeft(this._getAutoRotationAngle(t)), this.enableDamping ? (this._spherical.theta += this._sphericalDelta.theta * this.dampingFactor, this._spherical.phi += this._sphericalDelta.phi * this.dampingFactor) : (this._spherical.theta += this._sphericalDelta.theta, this._spherical.phi += this._sphericalDelta.phi);
    let a = this.minAzimuthAngle, i = this.maxAzimuthAngle;
    isFinite(a) && isFinite(i) && (a < -Math.PI ? a += G : a > Math.PI && (a -= G), i < -Math.PI ? i += G : i > Math.PI && (i -= G), a <= i ? this._spherical.theta = Math.max(a, Math.min(i, this._spherical.theta)) : this._spherical.theta = this._spherical.theta > (a + i) / 2 ? Math.max(a, this._spherical.theta) : Math.min(i, this._spherical.theta)), this._spherical.phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, this._spherical.phi)), this._spherical.makeSafe(), this.enableDamping === !0 ? this.target.addScaledVector(this._panOffset, this.dampingFactor) : this.target.add(this._panOffset), this.target.sub(this.cursor), this.target.clampLength(this.minTargetRadius, this.maxTargetRadius), this.target.add(this.cursor);
    let s = !1;
    if (this.zoomToCursor && this._performCursorZoom || this.object.isOrthographicCamera)
      this._spherical.radius = this._clampDistance(this._spherical.radius);
    else {
      const r = this._spherical.radius;
      this._spherical.radius = this._clampDistance(this._spherical.radius * this._scale), s = r != this._spherical.radius;
    }
    if (z.setFromSpherical(this._spherical), z.applyQuaternion(this._quatInverse), n.copy(this.target).add(z), this.object.lookAt(this.target), this.enableDamping === !0 ? (this._sphericalDelta.theta *= 1 - this.dampingFactor, this._sphericalDelta.phi *= 1 - this.dampingFactor, this._panOffset.multiplyScalar(1 - this.dampingFactor)) : (this._sphericalDelta.set(0, 0, 0), this._panOffset.set(0, 0, 0)), this.zoomToCursor && this._performCursorZoom) {
      let r = null;
      if (this.object.isPerspectiveCamera) {
        const o = z.length();
        r = this._clampDistance(o * this._scale);
        const l = o - r;
        this.object.position.addScaledVector(this._dollyDirection, l), this.object.updateMatrixWorld(), s = !!l;
      } else if (this.object.isOrthographicCamera) {
        const o = new K(this._mouse.x, this._mouse.y, 0);
        o.unproject(this.object);
        const l = this.object.zoom;
        this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), this.object.updateProjectionMatrix(), s = l !== this.object.zoom;
        const d = new K(this._mouse.x, this._mouse.y, 0);
        d.unproject(this.object), this.object.position.sub(d).add(o), this.object.updateMatrixWorld(), r = z.length();
      } else
        console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), this.zoomToCursor = !1;
      r !== null && (this.screenSpacePanning ? this.target.set(0, 0, -1).transformDirection(this.object.matrix).multiplyScalar(r).add(this.object.position) : (_e.origin.copy(this.object.position), _e.direction.set(0, 0, -1).transformDirection(this.object.matrix), Math.abs(this.object.up.dot(_e.direction)) < Kn ? this.object.lookAt(this.target) : (bt.setFromNormalAndCoplanarPoint(this.object.up, this.target), _e.intersectPlane(bt, this.target))));
    } else if (this.object.isOrthographicCamera) {
      const r = this.object.zoom;
      this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), r !== this.object.zoom && (this.object.updateProjectionMatrix(), s = !0);
    }
    return this._scale = 1, this._performCursorZoom = !1, s || this._lastPosition.distanceToSquared(this.object.position) > Be || 8 * (1 - this._lastQuaternion.dot(this.object.quaternion)) > Be || this._lastTargetPosition.distanceToSquared(this.target) > Be ? (this.dispatchEvent(ft), this._lastPosition.copy(this.object.position), this._lastQuaternion.copy(this.object.quaternion), this._lastTargetPosition.copy(this.target), !0) : !1;
  }
  _getAutoRotationAngle(t) {
    return t !== null ? G / 60 * this.autoRotateSpeed * t : G / 60 / 60 * this.autoRotateSpeed;
  }
  _getZoomScale(t) {
    const n = Math.abs(t * 0.01);
    return Math.pow(0.95, this.zoomSpeed * n);
  }
  _rotateLeft(t) {
    this._sphericalDelta.theta -= t;
  }
  _rotateUp(t) {
    this._sphericalDelta.phi -= t;
  }
  _panLeft(t, n) {
    z.setFromMatrixColumn(n, 0), z.multiplyScalar(-t), this._panOffset.add(z);
  }
  _panUp(t, n) {
    this.screenSpacePanning === !0 ? z.setFromMatrixColumn(n, 1) : (z.setFromMatrixColumn(n, 0), z.crossVectors(this.object.up, z)), z.multiplyScalar(t), this._panOffset.add(z);
  }
  // deltaX and deltaY are in pixels; right and down are positive
  _pan(t, n) {
    const a = this.domElement;
    if (this.object.isPerspectiveCamera) {
      const i = this.object.position;
      z.copy(i).sub(this.target);
      let s = z.length();
      s *= Math.tan(this.object.fov / 2 * Math.PI / 180), this._panLeft(2 * t * s / a.clientHeight, this.object.matrix), this._panUp(2 * n * s / a.clientHeight, this.object.matrix);
    } else this.object.isOrthographicCamera ? (this._panLeft(t * (this.object.right - this.object.left) / this.object.zoom / a.clientWidth, this.object.matrix), this._panUp(n * (this.object.top - this.object.bottom) / this.object.zoom / a.clientHeight, this.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), this.enablePan = !1);
  }
  _dollyOut(t) {
    this.object.isPerspectiveCamera || this.object.isOrthographicCamera ? this._scale /= t : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), this.enableZoom = !1);
  }
  _dollyIn(t) {
    this.object.isPerspectiveCamera || this.object.isOrthographicCamera ? this._scale *= t : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), this.enableZoom = !1);
  }
  _updateZoomParameters(t, n) {
    if (!this.zoomToCursor)
      return;
    this._performCursorZoom = !0;
    const a = this.domElement.getBoundingClientRect(), i = t - a.left, s = n - a.top, r = a.width, o = a.height;
    this._mouse.x = i / r * 2 - 1, this._mouse.y = -(s / o) * 2 + 1, this._dollyDirection.set(this._mouse.x, this._mouse.y, 1).unproject(this.object).sub(this.object.position).normalize();
  }
  _clampDistance(t) {
    return Math.max(this.minDistance, Math.min(this.maxDistance, t));
  }
  //
  // event callbacks - update the object state
  //
  _handleMouseDownRotate(t) {
    this._rotateStart.set(t.clientX, t.clientY);
  }
  _handleMouseDownDolly(t) {
    this._updateZoomParameters(t.clientX, t.clientX), this._dollyStart.set(t.clientX, t.clientY);
  }
  _handleMouseDownPan(t) {
    this._panStart.set(t.clientX, t.clientY);
  }
  _handleMouseMoveRotate(t) {
    this._rotateEnd.set(t.clientX, t.clientY), this._rotateDelta.subVectors(this._rotateEnd, this._rotateStart).multiplyScalar(this.rotateSpeed);
    const n = this.domElement;
    this._rotateLeft(G * this._rotateDelta.x / n.clientHeight), this._rotateUp(G * this._rotateDelta.y / n.clientHeight), this._rotateStart.copy(this._rotateEnd), this.update();
  }
  _handleMouseMoveDolly(t) {
    this._dollyEnd.set(t.clientX, t.clientY), this._dollyDelta.subVectors(this._dollyEnd, this._dollyStart), this._dollyDelta.y > 0 ? this._dollyOut(this._getZoomScale(this._dollyDelta.y)) : this._dollyDelta.y < 0 && this._dollyIn(this._getZoomScale(this._dollyDelta.y)), this._dollyStart.copy(this._dollyEnd), this.update();
  }
  _handleMouseMovePan(t) {
    this._panEnd.set(t.clientX, t.clientY), this._panDelta.subVectors(this._panEnd, this._panStart).multiplyScalar(this.panSpeed), this._pan(this._panDelta.x, this._panDelta.y), this._panStart.copy(this._panEnd), this.update();
  }
  _handleMouseWheel(t) {
    this._updateZoomParameters(t.clientX, t.clientY), t.deltaY < 0 ? this._dollyIn(this._getZoomScale(t.deltaY)) : t.deltaY > 0 && this._dollyOut(this._getZoomScale(t.deltaY)), this.update();
  }
  _handleKeyDown(t) {
    let n = !1;
    switch (t.code) {
      case this.keys.UP:
        t.ctrlKey || t.metaKey || t.shiftKey ? this.enableRotate && this._rotateUp(G * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(0, this.keyPanSpeed), n = !0;
        break;
      case this.keys.BOTTOM:
        t.ctrlKey || t.metaKey || t.shiftKey ? this.enableRotate && this._rotateUp(-G * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(0, -this.keyPanSpeed), n = !0;
        break;
      case this.keys.LEFT:
        t.ctrlKey || t.metaKey || t.shiftKey ? this.enableRotate && this._rotateLeft(G * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(this.keyPanSpeed, 0), n = !0;
        break;
      case this.keys.RIGHT:
        t.ctrlKey || t.metaKey || t.shiftKey ? this.enableRotate && this._rotateLeft(-G * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(-this.keyPanSpeed, 0), n = !0;
        break;
    }
    n && (t.preventDefault(), this.update());
  }
  _handleTouchStartRotate(t) {
    if (this._pointers.length === 1)
      this._rotateStart.set(t.pageX, t.pageY);
    else {
      const n = this._getSecondPointerPosition(t), a = 0.5 * (t.pageX + n.x), i = 0.5 * (t.pageY + n.y);
      this._rotateStart.set(a, i);
    }
  }
  _handleTouchStartPan(t) {
    if (this._pointers.length === 1)
      this._panStart.set(t.pageX, t.pageY);
    else {
      const n = this._getSecondPointerPosition(t), a = 0.5 * (t.pageX + n.x), i = 0.5 * (t.pageY + n.y);
      this._panStart.set(a, i);
    }
  }
  _handleTouchStartDolly(t) {
    const n = this._getSecondPointerPosition(t), a = t.pageX - n.x, i = t.pageY - n.y, s = Math.sqrt(a * a + i * i);
    this._dollyStart.set(0, s);
  }
  _handleTouchStartDollyPan(t) {
    this.enableZoom && this._handleTouchStartDolly(t), this.enablePan && this._handleTouchStartPan(t);
  }
  _handleTouchStartDollyRotate(t) {
    this.enableZoom && this._handleTouchStartDolly(t), this.enableRotate && this._handleTouchStartRotate(t);
  }
  _handleTouchMoveRotate(t) {
    if (this._pointers.length == 1)
      this._rotateEnd.set(t.pageX, t.pageY);
    else {
      const a = this._getSecondPointerPosition(t), i = 0.5 * (t.pageX + a.x), s = 0.5 * (t.pageY + a.y);
      this._rotateEnd.set(i, s);
    }
    this._rotateDelta.subVectors(this._rotateEnd, this._rotateStart).multiplyScalar(this.rotateSpeed);
    const n = this.domElement;
    this._rotateLeft(G * this._rotateDelta.x / n.clientHeight), this._rotateUp(G * this._rotateDelta.y / n.clientHeight), this._rotateStart.copy(this._rotateEnd);
  }
  _handleTouchMovePan(t) {
    if (this._pointers.length === 1)
      this._panEnd.set(t.pageX, t.pageY);
    else {
      const n = this._getSecondPointerPosition(t), a = 0.5 * (t.pageX + n.x), i = 0.5 * (t.pageY + n.y);
      this._panEnd.set(a, i);
    }
    this._panDelta.subVectors(this._panEnd, this._panStart).multiplyScalar(this.panSpeed), this._pan(this._panDelta.x, this._panDelta.y), this._panStart.copy(this._panEnd);
  }
  _handleTouchMoveDolly(t) {
    const n = this._getSecondPointerPosition(t), a = t.pageX - n.x, i = t.pageY - n.y, s = Math.sqrt(a * a + i * i);
    this._dollyEnd.set(0, s), this._dollyDelta.set(0, Math.pow(this._dollyEnd.y / this._dollyStart.y, this.zoomSpeed)), this._dollyOut(this._dollyDelta.y), this._dollyStart.copy(this._dollyEnd);
    const r = (t.pageX + n.x) * 0.5, o = (t.pageY + n.y) * 0.5;
    this._updateZoomParameters(r, o);
  }
  _handleTouchMoveDollyPan(t) {
    this.enableZoom && this._handleTouchMoveDolly(t), this.enablePan && this._handleTouchMovePan(t);
  }
  _handleTouchMoveDollyRotate(t) {
    this.enableZoom && this._handleTouchMoveDolly(t), this.enableRotate && this._handleTouchMoveRotate(t);
  }
  // pointers
  _addPointer(t) {
    this._pointers.push(t.pointerId);
  }
  _removePointer(t) {
    delete this._pointerPositions[t.pointerId];
    for (let n = 0; n < this._pointers.length; n++)
      if (this._pointers[n] == t.pointerId) {
        this._pointers.splice(n, 1);
        return;
      }
  }
  _isTrackingPointer(t) {
    for (let n = 0; n < this._pointers.length; n++)
      if (this._pointers[n] == t.pointerId) return !0;
    return !1;
  }
  _trackPointer(t) {
    let n = this._pointerPositions[t.pointerId];
    n === void 0 && (n = new W(), this._pointerPositions[t.pointerId] = n), n.set(t.pageX, t.pageY);
  }
  _getSecondPointerPosition(t) {
    const n = t.pointerId === this._pointers[0] ? this._pointers[1] : this._pointers[0];
    return this._pointerPositions[n];
  }
  //
  _customWheelEvent(t) {
    const n = t.deltaMode, a = {
      clientX: t.clientX,
      clientY: t.clientY,
      deltaY: t.deltaY
    };
    switch (n) {
      case 1:
        a.deltaY *= 16;
        break;
      case 2:
        a.deltaY *= 100;
        break;
    }
    return t.ctrlKey && !this._controlActive && (a.deltaY *= 10), a;
  }
}
function Zn(e) {
  this.enabled !== !1 && (this._pointers.length === 0 && (this.domElement.setPointerCapture(e.pointerId), this.domElement.addEventListener("pointermove", this._onPointerMove), this.domElement.addEventListener("pointerup", this._onPointerUp)), !this._isTrackingPointer(e) && (this._addPointer(e), e.pointerType === "touch" ? this._onTouchStart(e) : this._onMouseDown(e)));
}
function Xn(e) {
  this.enabled !== !1 && (e.pointerType === "touch" ? this._onTouchMove(e) : this._onMouseMove(e));
}
function qn(e) {
  switch (this._removePointer(e), this._pointers.length) {
    case 0:
      this.domElement.releasePointerCapture(e.pointerId), this.domElement.removeEventListener("pointermove", this._onPointerMove), this.domElement.removeEventListener("pointerup", this._onPointerUp), this.dispatchEvent(Kt), this.state = R.NONE;
      break;
    case 1:
      const t = this._pointers[0], n = this._pointerPositions[t];
      this._onTouchStart({ pointerId: t, pageX: n.x, pageY: n.y });
      break;
  }
}
function Qn(e) {
  let t;
  switch (e.button) {
    case 0:
      t = this.mouseButtons.LEFT;
      break;
    case 1:
      t = this.mouseButtons.MIDDLE;
      break;
    case 2:
      t = this.mouseButtons.RIGHT;
      break;
    default:
      t = -1;
  }
  switch (t) {
    case he.DOLLY:
      if (this.enableZoom === !1) return;
      this._handleMouseDownDolly(e), this.state = R.DOLLY;
      break;
    case he.ROTATE:
      if (e.ctrlKey || e.metaKey || e.shiftKey) {
        if (this.enablePan === !1) return;
        this._handleMouseDownPan(e), this.state = R.PAN;
      } else {
        if (this.enableRotate === !1) return;
        this._handleMouseDownRotate(e), this.state = R.ROTATE;
      }
      break;
    case he.PAN:
      if (e.ctrlKey || e.metaKey || e.shiftKey) {
        if (this.enableRotate === !1) return;
        this._handleMouseDownRotate(e), this.state = R.ROTATE;
      } else {
        if (this.enablePan === !1) return;
        this._handleMouseDownPan(e), this.state = R.PAN;
      }
      break;
    default:
      this.state = R.NONE;
  }
  this.state !== R.NONE && this.dispatchEvent(et);
}
function Jn(e) {
  switch (this.state) {
    case R.ROTATE:
      if (this.enableRotate === !1) return;
      this._handleMouseMoveRotate(e);
      break;
    case R.DOLLY:
      if (this.enableZoom === !1) return;
      this._handleMouseMoveDolly(e);
      break;
    case R.PAN:
      if (this.enablePan === !1) return;
      this._handleMouseMovePan(e);
      break;
  }
}
function ea(e) {
  this.enabled === !1 || this.enableZoom === !1 || this.state !== R.NONE || (e.preventDefault(), this.dispatchEvent(et), this._handleMouseWheel(this._customWheelEvent(e)), this.dispatchEvent(Kt));
}
function ta(e) {
  this.enabled !== !1 && this._handleKeyDown(e);
}
function na(e) {
  switch (this._trackPointer(e), this._pointers.length) {
    case 1:
      switch (this.touches.ONE) {
        case ce.ROTATE:
          if (this.enableRotate === !1) return;
          this._handleTouchStartRotate(e), this.state = R.TOUCH_ROTATE;
          break;
        case ce.PAN:
          if (this.enablePan === !1) return;
          this._handleTouchStartPan(e), this.state = R.TOUCH_PAN;
          break;
        default:
          this.state = R.NONE;
      }
      break;
    case 2:
      switch (this.touches.TWO) {
        case ce.DOLLY_PAN:
          if (this.enableZoom === !1 && this.enablePan === !1) return;
          this._handleTouchStartDollyPan(e), this.state = R.TOUCH_DOLLY_PAN;
          break;
        case ce.DOLLY_ROTATE:
          if (this.enableZoom === !1 && this.enableRotate === !1) return;
          this._handleTouchStartDollyRotate(e), this.state = R.TOUCH_DOLLY_ROTATE;
          break;
        default:
          this.state = R.NONE;
      }
      break;
    default:
      this.state = R.NONE;
  }
  this.state !== R.NONE && this.dispatchEvent(et);
}
function aa(e) {
  switch (this._trackPointer(e), this.state) {
    case R.TOUCH_ROTATE:
      if (this.enableRotate === !1) return;
      this._handleTouchMoveRotate(e), this.update();
      break;
    case R.TOUCH_PAN:
      if (this.enablePan === !1) return;
      this._handleTouchMovePan(e), this.update();
      break;
    case R.TOUCH_DOLLY_PAN:
      if (this.enableZoom === !1 && this.enablePan === !1) return;
      this._handleTouchMoveDollyPan(e), this.update();
      break;
    case R.TOUCH_DOLLY_ROTATE:
      if (this.enableZoom === !1 && this.enableRotate === !1) return;
      this._handleTouchMoveDollyRotate(e), this.update();
      break;
    default:
      this.state = R.NONE;
  }
}
function ia(e) {
  this.enabled !== !1 && e.preventDefault();
}
function sa(e) {
  e.key === "Control" && (this._controlActive = !0, this.domElement.getRootNode().addEventListener("keyup", this._interceptControlUp, { passive: !0, capture: !0 }));
}
function ra(e) {
  e.key === "Control" && (this._controlActive = !1, this.domElement.getRootNode().removeEventListener("keyup", this._interceptControlUp, { passive: !0, capture: !0 }));
}
const gt = "octane", oa = {
  breakout: {
    kind: "breakout",
    label: "Breakout",
    length: 131.4924,
    width: 80.521,
    height: 30.3,
    slopeDegrees: -0.9795,
    groundHeightFront: 43.8976,
    groundHeightBack: 46.1454,
    offset: 13.88,
    elevation: 17.05
  },
  dominus: {
    kind: "dominus",
    label: "Dominus",
    length: 127.9268,
    width: 83.27995,
    height: 31.3,
    slopeDegrees: -0.9635,
    groundHeightFront: 47.2238,
    groundHeightBack: 49.3749,
    offset: 13.88,
    elevation: 17.05
  },
  hybrid: {
    kind: "hybrid",
    label: "Hybrid",
    length: 127.0192,
    width: 82.18787,
    height: 34.15907,
    slopeDegrees: -0.5499,
    groundHeightFront: 54.0982,
    groundHeightBack: 55.3173,
    offset: 13.88,
    elevation: 17.05
  },
  merc: {
    kind: "merc",
    label: "Merc",
    length: 120.72,
    width: 76.71,
    height: 41.66,
    slopeDegrees: 0.28,
    groundHeightFront: 60.76,
    groundHeightBack: 61.35,
    offset: 13.88,
    elevation: 17.05
  },
  octane: {
    kind: "octane",
    label: "Octane",
    length: 118.0074,
    width: 84.19941,
    height: 36.15907,
    slopeDegrees: -0.5518,
    groundHeightFront: 55.1449,
    groundHeightBack: 56.2814,
    offset: 13.88,
    elevation: 17.05
  },
  plank: {
    kind: "plank",
    label: "Plank",
    length: 128.8198,
    width: 84.67036,
    height: 29.3944,
    slopeDegrees: -0.3447,
    groundHeightFront: 44.998,
    groundHeightBack: 45.773,
    offset: 13.88,
    elevation: 17.05
  }
}, la = {
  "16batmobile": "plank",
  "70dodgechargerrt": "dominus",
  "89batmobile": "dominus",
  "99nissanskylinegtrr34": "hybrid",
  aftershock: "dominus",
  animusgp: "breakout",
  artemis: "plank",
  artemisg1: "plank",
  artemisgxt: "plank",
  astonmartinvalhalla: "breakout",
  backfire: "octane",
  backtothefuturetimemachine: "dominus",
  batmobile1989: "dominus",
  battlebus: "merc",
  breakout: "breakout",
  breakouttypes: "breakout",
  centio: "plank",
  centiov17: "plank",
  cyclone: "breakout",
  deloreantimemachine: "dominus",
  diestro: "dominus",
  dominus: "dominus",
  dominusgt: "dominus",
  endo: "hybrid",
  esper: "hybrid",
  fast4wd: "octane",
  fennec: "octane",
  gazellagt: "dominus",
  gizmo: "octane",
  grog: "octane",
  guardian: "dominus",
  guardiang1: "dominus",
  guardiangxt: "dominus",
  hotshot: "dominus",
  icecharger: "dominus",
  imperatordt5: "dominus",
  jager619rs: "hybrid",
  jurassicjeepwrangler: "octane",
  mantis: "plank",
  marauder: "octane",
  masamune: "dominus",
  maverick: "dominus",
  maverickg1: "dominus",
  maverickgxt: "dominus",
  mclaren570s: "dominus",
  merc: "merc",
  mr11: "dominus",
  nimbus: "hybrid",
  octane: "octane",
  octanezsr: "octane",
  paladin: "plank",
  proteus: "octane",
  ripper: "dominus",
  roadhog: "octane",
  roadhogxl: "octane",
  samurai: "breakout",
  scarab: "octane",
  takumi: "octane",
  takumirxt: "octane",
  thedarkknightstumbler: "octane",
  thedarkknightrisestumbler: "octane",
  triton: "octane",
  twinmilliii: "plank",
  twinzer: "octane",
  venom: "hybrid",
  vulcan: "octane",
  werewolf: "dominus",
  xdevil: "hybrid",
  xdevilmk2: "hybrid",
  zippy: "octane",
  "1966cadillacdeville": "breakout",
  ace: "breakout",
  admiral: "dominus",
  azura: "breakout",
  behemoth: "merc",
  beskar: "hybrid",
  bmwm3e30: "dominus",
  bmwm2racing: "dominus",
  bmwm4gt3evo: "dominus",
  bmw1series: "octane",
  bmw1seriesrle: "octane",
  bmwm240i: "dominus",
  bugatticentodieci: "plank",
  bumblebee: "dominus",
  bumblebeecar: "dominus",
  chevroletastro: "merc",
  chevroletcorvettestingray: "breakout",
  chevroletcorvettezr1: "breakout",
  chryslerpacifica: "hybrid",
  corlay: "octane",
  cyberpunkquadra: "breakout",
  defenderd7xr: "merc",
  diesel: "breakout",
  dodgechargerdaytonascatpack: "dominus",
  dodgerchargerdaytonascatpack: "dominus",
  dominusneon: "dominus",
  emperor: "breakout",
  emperorii: "breakout",
  emperoriifrozen: "breakout",
  emperoriiscorched: "breakout",
  fastfuriousdodgecharger: "dominus",
  fastandfuriousdodgecharger: "dominus",
  fastandfuriousdodgechargersrthellcat: "dominus",
  fastfuriousmazdarx7: "breakout",
  fastandfuriousmazdarx7: "breakout",
  fastfuriousnissanskyline: "hybrid",
  fastandfuriousnissanskyline: "hybrid",
  fastfuriouspontiacfiero: "hybrid",
  fastandfuriouspontiacfiero: "hybrid",
  fenneczrf: "octane",
  ferrari296gtb: "dominus",
  ferrarif40: "breakout",
  fordbroncoraptorrle: "merc",
  fordf150rle: "octane",
  fordmustanggtd: "dominus",
  fordmustangshelbygt500: "dominus",
  fordmustangmacherle: "octane",
  fordmustangshelbygt350rrle: "dominus",
  formula12021: "plank",
  formula12022: "plank",
  fuse: "breakout",
  havoc: "breakout",
  hearse: "hybrid",
  homerscar: "dominus",
  hondacivictyper: "octane",
  hondacivictyperle: "octane",
  jackal: "octane",
  jeepwranglerrubicon: "octane",
  kitt: "dominus",
  knightindustries2000: "dominus",
  komodo: "breakout",
  lamborghinicountachlpi8004: "dominus",
  lamborghinihuracansto: "dominus",
  lamborghiniurus: "hybrid",
  lamborghiniurusse: "hybrid",
  lightningmcqueen: "dominus",
  lightningmcqueencar: "dominus",
  lockjaw: "dominus",
  luiginsr: "octane",
  maestro: "dominus",
  magnifique: "dominus",
  magnifiquegxt: "dominus",
  mako: "breakout",
  mamba: "dominus",
  mario: "octane",
  marionsr: "octane",
  maven: "dominus",
  mclaren765lt: "dominus",
  mclarenp1: "dominus",
  mclarensenna: "breakout",
  megastar: "breakout",
  mercedesamggt63s: "dominus",
  mercedesbenzcla: "dominus",
  mudcat: "octane",
  mudcatg1: "octane",
  mudcatgxt: "octane",
  nissan350z: "dominus",
  nissanfairladyz: "dominus",
  nissanfairladyzrle: "dominus",
  nissansilvia: "hybrid",
  nissansilviarle: "hybrid",
  nissanskylinegtr: "hybrid",
  nissanskylinegtrr32: "hybrid",
  nissanzperformance: "dominus",
  nissanzperformancecar: "dominus",
  outlaw: "octane",
  outlawgxt: "octane",
  pattywagon: "octane",
  pizzaplanetdeliverytruck: "merc",
  pontiacfirebird: "breakout",
  porsche918spyder: "breakout",
  porsche911gt3rs: "dominus",
  porsche911turbo: "dominus",
  porsche911turborle: "dominus",
  primo: "hybrid",
  psyclops: "octane",
  quadraturbor: "breakout",
  ram1500rho: "hybrid",
  recoilav: "merc",
  redline: "breakout",
  revolver: "breakout",
  rivianr1s: "hybrid",
  scorpion: "dominus",
  shokunin: "octane",
  shokuningxt: "octane",
  stampede: "merc",
  teslacybertruck: "hybrid",
  themysterymachine: "merc",
  theincredibile: "breakout",
  turtlevan: "merc",
  voidburn: "hybrid",
  volkswagengolfgti: "octane",
  volkswagengolfgtirle: "octane",
  xentari: "octane",
  zefira: "dominus",
  breakoutx: "breakout",
  nexus: "breakout",
  nexussc: "breakout",
  whiplash: "breakout",
  "007sastonmartindbs": "dominus",
  "007sastonmartinvalhalla": "dominus",
  batmobile2022: "dominus",
  chikara: "dominus",
  chikarag1: "dominus",
  chikaragxt: "dominus",
  ecto1: "dominus",
  ecto1ghostbusters: "dominus",
  fastfuriousdodgechargersrthellcat: "dominus",
  gazellagthotwheels: "dominus",
  kittknightrider: "dominus",
  lamborghinihuracnsto: "dominus",
  mr11hotwheels: "dominus",
  nascarchevroletcamaro: "dominus",
  nascarfordmustang: "dominus",
  nascartoyotacamry: "dominus",
  nascarnextgenchevroletcamaro: "dominus",
  nascarnextgenchevroletcamaro2022: "dominus",
  nascarnextgenfordmustang: "dominus",
  nascarnextgenfordmustang2022: "dominus",
  nascarnextgentoyotacamry: "dominus",
  nascarnextgentoyotacamry2022: "dominus",
  nemesis: "dominus",
  peregrinett: "dominus",
  perigrinett: "dominus",
  ronin: "dominus",
  roning1: "dominus",
  roningxt: "dominus",
  samusgunship: "dominus",
  samusgunshipnintendoexclusive: "dominus",
  tyranno: "dominus",
  tyrannogxt: "dominus",
  insidio: "hybrid",
  jager619: "hybrid",
  jger619: "hybrid",
  jger619rs: "hybrid",
  r3mx: "hybrid",
  r3mxgxt: "hybrid",
  tygris: "hybrid",
  nomad: "merc",
  nomadgxt: "merc",
  "007sastonmartindb5": "octane",
  armadillo: "octane",
  armadilloxboxexclusive: "octane",
  boneshaker: "octane",
  dingo: "octane",
  fast4wdhotwheels: "octane",
  harbinger: "octane",
  harbingergxt: "octane",
  hogsticker: "octane",
  hogstickerxboxexclusive: "octane",
  sweettooth: "octane",
  sweettoothplaystationexclusive: "octane",
  thedarkknighttumbler: "octane",
  batmobile2016: "plank",
  sentinel: "plank"
};
function ca(e) {
  const t = {};
  for (const [n, a] of e)
    for (const i of n)
      t[i] = a;
  return t;
}
const da = ca([
  [
    [
      22,
      1416,
      1894,
      1932,
      3031,
      3311,
      6243,
      6489,
      7651,
      7696,
      7890,
      7901,
      8006,
      8360,
      8361,
      8565,
      8566,
      8669,
      9357,
      10697,
      10698,
      10817,
      10822,
      11038,
      11394,
      11505,
      11677,
      11800,
      11933,
      11949,
      12173,
      12315,
      12361,
      12484
    ],
    "breakout"
  ],
  [
    [
      29,
      403,
      597,
      600,
      1018,
      1171,
      1286,
      1675,
      1689,
      1883,
      2070,
      2268,
      2666,
      2950,
      2951,
      3155,
      3156,
      3157,
      3265,
      3426,
      3875,
      3879,
      3880,
      4014,
      4155,
      4367,
      4472,
      4473,
      4745,
      4770,
      4781,
      4861,
      4864,
      5709,
      5773,
      5823,
      5858,
      5964,
      5979,
      6122,
      6244,
      6247,
      6260,
      6836,
      7211,
      7337,
      7338,
      7341,
      7343,
      7415,
      7512,
      7532,
      7593,
      7772,
      8454,
      9053,
      9088,
      9089,
      9140,
      9388,
      9894,
      10094,
      10440,
      10441,
      10694,
      10695,
      11016,
      11095,
      11315,
      11336,
      11534,
      11941,
      11996,
      12106,
      12142,
      12262,
      12286,
      12325,
      12382,
      12563,
      12669
    ],
    "dominus"
  ],
  [
    [
      28,
      31,
      1159,
      1317,
      1624,
      1856,
      2269,
      3451,
      3582,
      3702,
      5470,
      5488,
      5879,
      7012,
      9084,
      9085,
      9427,
      10044,
      10805,
      11138,
      11141,
      11379,
      11932,
      12569,
      12652
    ],
    "hybrid"
  ],
  [[30, 4780, 7336, 7477, 7815, 7979, 10689, 11098, 11736, 11905, 11950, 12318, 12335], "merc"],
  [
    [
      21,
      23,
      25,
      26,
      27,
      402,
      404,
      523,
      607,
      625,
      723,
      1172,
      1295,
      1300,
      1475,
      1478,
      1533,
      1568,
      1623,
      2665,
      2853,
      2919,
      2949,
      4284,
      4318,
      4319,
      4320,
      4782,
      4906,
      5020,
      5039,
      5188,
      5361,
      5547,
      5713,
      5837,
      5951,
      6939,
      7947,
      7948,
      8383,
      8806,
      8807,
      10896,
      10897,
      10900,
      10901,
      11314,
      11603,
      12104,
      12105
    ],
    "octane"
  ],
  [[24, 803, 1603, 1691, 1919, 3594, 3614, 3622, 4268, 5265, 7052, 8524], "plank"]
]);
function Yt(e) {
  return e.toLowerCase().replace(/[^a-z0-9]+/g, "");
}
function Zt(e) {
  if (!e)
    return null;
  switch (Yt(e)) {
    case "breakout":
      return "breakout";
    case "dominus":
      return "dominus";
    case "hybrid":
      return "hybrid";
    case "merc":
      return "merc";
    case "octane":
      return "octane";
    case "batmobile":
    case "plank":
      return "plank";
    default:
      return null;
  }
}
function Xt(e) {
  return e ? la[Yt(e)] ?? null : null;
}
function ha(e) {
  return Zt(e) ?? Xt(e);
}
function qt(e) {
  return oa[e];
}
function ua(e) {
  return {
    position: [e.offset, 0, e.elevation],
    rotationYDegrees: e.slopeDegrees,
    dimensions: [e.length, e.width, e.height]
  };
}
function Ye(e, t) {
  if (!(!e || typeof e != "object")) {
    if ("Str" in e && typeof e.Str == "string") {
      t.push(e.Str);
      return;
    }
    if ("Name" in e && typeof e.Name == "string") {
      t.push(e.Name);
      return;
    }
    if ("Byte" in e && e.Byte && typeof e.Byte == "object") {
      const n = e.Byte;
      typeof n.kind == "string" && t.push(n.kind), typeof n.value == "string" && t.push(n.value);
      return;
    }
    if ("Struct" in e && e.Struct && typeof e.Struct == "object") {
      const n = e.Struct;
      if (typeof n.name == "string" && t.push(n.name), Array.isArray(n.fields))
        for (const a of n.fields)
          Array.isArray(a) && (typeof a[0] == "string" && t.push(a[0]), Ye(a[1], t));
      return;
    }
    if ("Array" in e && Array.isArray(e.Array)) {
      for (const n of e.Array)
        if (Array.isArray(n))
          for (const a of n)
            Array.isArray(a) && (typeof a[0] == "string" && t.push(a[0]), Ye(a[1], t));
    }
  }
}
function Qt(e) {
  const t = Zt(e?.car_hitbox_family);
  if (t)
    return t;
  const n = e?.car_body_id;
  if (typeof n == "number") {
    const r = da[n];
    if (r)
      return r;
  }
  const a = Xt(e?.car_body_name);
  if (a)
    return a;
  const i = e?.stats;
  if (!i)
    return gt;
  const s = [];
  for (const [r, o] of Object.entries(i))
    s.push(r), Ye(o, s);
  for (const r of s) {
    const o = ha(r);
    if (o)
      return o;
  }
  return gt;
}
const Jt = 0.08, ma = 0.22, pa = 0.94, tt = 1, Me = 0.32, yt = 1024, fa = 16, ba = 1.5;
function wt(e) {
  const t = new c.MeshBasicMaterial({
    color: e,
    transparent: !0,
    opacity: tt,
    side: c.DoubleSide
  });
  return t.forceSinglePass = !0, t;
}
function ga(e) {
  return new c.MeshLambertMaterial({
    color: e,
    side: c.DoubleSide,
    transparent: !0,
    opacity: tt
  });
}
function re(e, t, n, a) {
  return new c.Mesh(new c.BoxGeometry(e, n, t, 6, 1, 6), a);
}
function ya(e) {
  return new c.Color(e).lerp(new c.Color(0), pa);
}
function Fe(e, t, n, a, i, s, r, o) {
  e.beginPath();
  for (let l = 0; l <= t; l += 8) {
    const d = l / t, h = a * n + Math.sin(d * Math.PI * 2 + s) * i + Math.sin(d * Math.PI * 4 + s * 0.5) * i * 0.35;
    l === 0 ? e.moveTo(l, h) : e.lineTo(l, h);
  }
  e.lineWidth = r, e.strokeStyle = o, e.stroke();
}
function ze(e, t, n, a, i, s, r, o) {
  e.beginPath();
  for (let l = 0; l <= n; l += 8) {
    const d = l / n, h = a * t + Math.sin(d * Math.PI * 2 + s) * i + Math.sin(d * Math.PI * 6 + s * 0.3) * i * 0.18;
    l === 0 ? e.moveTo(h, l) : e.lineTo(h, l);
  }
  e.lineWidth = r, e.strokeStyle = o, e.stroke();
}
function Ue(e, t, n, a, i, s) {
  e.beginPath(), e.arc(t, n, a, 0, Math.PI * 2), e.fillStyle = i, e.fill(), e.lineWidth = Math.max(6, a * 0.15), e.strokeStyle = s, e.stroke();
}
function wa(e) {
  const t = document.createElement("canvas");
  t.width = yt, t.height = yt;
  const n = t.getContext("2d");
  if (!n)
    throw new Error("Unable to create ball texture canvas");
  const { width: a, height: i } = t, s = n.createLinearGradient(0, 0, a, i);
  s.addColorStop(0, "#faf7ee"), s.addColorStop(0.55, "#e7e1d0"), s.addColorStop(1, "#d5cfbe"), n.fillStyle = s, n.fillRect(0, 0, a, i), n.globalAlpha = 0.22;
  for (let l = 0; l < 28; l += 1) {
    const d = l / 27 * i;
    n.fillStyle = l % 2 === 0 ? "#ffffff" : "#d3cbb6", n.fillRect(0, d, a, i / 54);
  }
  n.globalAlpha = 1;
  const r = "#2d313b";
  n.lineCap = "round", Fe(n, a, i, 0.24, 22, 0.35, 18, r), Fe(n, a, i, 0.5, 14, 1.1, 20, r), Fe(n, a, i, 0.77, 20, 2.35, 18, r), ze(n, a, i, 0.2, 24, 0.2, 18, r), ze(n, a, i, 0.48, 18, 1.6, 18, r), ze(n, a, i, 0.76, 26, 2.7, 18, r), n.globalAlpha = 0.92, Ue(n, a * 0.28, i * 0.32, 88, "#f1a63a", "#fff4d7"), Ue(n, a * 0.68, i * 0.6, 72, "#4db0ff", "#eef8ff"), Ue(n, a * 0.76, i * 0.2, 54, "#1f232c", "#f0ece1"), n.globalAlpha = 1, n.beginPath(), n.moveTo(a * 0.08, i * 0.86), n.quadraticCurveTo(a * 0.28, i * 0.72, a * 0.42, i * 0.8), n.quadraticCurveTo(a * 0.58, i * 0.9, a * 0.82, i * 0.78), n.lineWidth = 24, n.strokeStyle = "rgba(255, 246, 220, 0.9)", n.stroke();
  const o = new c.CanvasTexture(t);
  return o.colorSpace = c.SRGBColorSpace, o.anisotropy = Math.min(8, e.capabilities.getMaxAnisotropy()), o;
}
function _a(e, t, n, a) {
  return new c.Mesh(new c.BoxGeometry(e, t, n, 6, 6, 1), a);
}
function Ea(e) {
  const t = 10280 * e, n = 8240 * e, a = 1960 * e, i = 1e3 * e, s = 1900 * e, r = 800 * e, o = 900 * e, l = Math.max(1, e), d = [], h = [1, -1];
  function u(m, b, p = null) {
    const _ = m.material.clone();
    return m.material = _, d.push({
      mesh: m,
      material: _,
      outwardLocal: b.clone().normalize(),
      fixedOpacity: p
    }), m;
  }
  function f(m) {
    const b = new c.Group(), p = wt(m), _ = n / 2 - i - s / 2, T = Math.sqrt(2 * Math.pow(i, 2));
    for (const k of h) {
      const E = u(
        re(_, a, l, p),
        new c.Vector3(0, 1, 0)
      );
      E.position.set(k * (_ / 2 + s / 2), 0, a / 2), b.add(E);
      const C = u(
        re(T, a, l, p),
        new c.Vector3(0, 1, 0)
      );
      C.position.set(
        k * (n / 2 - i / 2),
        -i / 2,
        a / 2
      ), C.rotateZ(-k * Math.PI / 4), b.add(C);
    }
    const A = u(
      re(s, a - r, l, p),
      new c.Vector3(0, 1, 0)
    );
    return A.position.set(0, 0, a / 2 + r / 2), b.add(A), b;
  }
  function w(m, b) {
    const p = new c.Group(), _ = [
      [n / 2, 0],
      [-n / 2, 0],
      [-n / 2, t / 2 - i],
      [-n / 2 + i, t / 2],
      [-s / 2, t / 2],
      [-s / 2, t / 2 + o],
      [s / 2, t / 2 + o],
      [s / 2, t / 2],
      [n / 2 - i, t / 2],
      [n / 2, t / 2 - i],
      [n / 2, 0]
    ], T = new c.Shape();
    _.forEach(([x, S], N) => {
      N === 0 ? T.moveTo(x, S) : T.lineTo(x, S);
    });
    const A = ga(m), k = wt(m), E = u(
      new c.Mesh(new c.ShapeGeometry(T), A),
      new c.Vector3(0, 0, -1)
    );
    E.receiveShadow = !0, p.add(E);
    for (const x of h) {
      const S = u(
        re(o, r, l, k),
        new c.Vector3(0, -x, 0),
        Me
      );
      S.position.set(
        x * s / 2,
        t / 2 + o / 2,
        r / 2
      ), S.rotateZ(Math.PI / 2), p.add(S);
    }
    const C = u(
      _a(s, o, l, k),
      new c.Vector3(0, 0, 1),
      Me
    );
    C.position.set(0, t / 2 + o / 2, r), p.add(C);
    const O = u(
      re(s, r, l, k),
      new c.Vector3(0, 1, 0),
      Me
    );
    O.position.set(0, t / 2 + o, r / 2), p.add(O);
    const F = f(m);
    F.position.y = t / 2, p.add(F);
    for (const x of h) {
      const S = u(
        re(
          t / 2 - i,
          a,
          l,
          k
        ),
        new c.Vector3(0, -x, 0)
      );
      S.position.set(
        x * n / 2,
        (t / 2 - i) / 2,
        a / 2
      ), S.rotateZ(Math.PI / 2), p.add(S);
    }
    return b && p.rotateZ(Math.PI), p;
  }
  const g = new c.Group();
  return g.add(w(16771251, !1)), g.add(w(8381439, !0)), { stadium: g, wallPanels: d };
}
function va(e, t) {
  const n = ua(e), a = ya(t), i = new c.Group();
  i.name = `${e.kind}-hitbox-overlay`, i.visible = !1, i.position.set(...n.position), i.rotateY(c.MathUtils.degToRad(n.rotationYDegrees));
  const s = new c.BoxGeometry(...n.dimensions), r = new c.MeshBasicMaterial({
    color: a,
    transparent: !0,
    opacity: Jt,
    depthTest: !1,
    depthWrite: !1,
    side: c.DoubleSide
  }), o = new c.Mesh(s, r);
  o.name = "hitbox-overlay-fill", o.renderOrder = 9, i.add(o);
  const l = new c.EdgesGeometry(s), d = new c.LineBasicMaterial({
    color: a,
    transparent: !0,
    opacity: 1,
    depthTest: !1,
    depthWrite: !1
  }), h = new c.LineSegments(l, d);
  return h.name = "hitbox-overlay-lines", h.renderOrder = 10, i.add(h), i;
}
function xa(e, t) {
  const n = e.getObjectByName("hitbox-overlay-fill");
  n && (n.material.opacity = t ? ma : Jt);
}
function Ma(e) {
  const t = [
    [100, -100, 100],
    [100, 100, 100],
    [-100, 100, 100],
    [-100, -100, 100],
    [150, -220, 20],
    [-150, -220, 20],
    [130, -400, -20],
    [-130, -400, -20],
    [140, 170, 25],
    [-140, 170, 25],
    [130, 240, 25],
    [-130, 240, 25],
    [130, -400, -80],
    [-130, -400, -80],
    [150, -220, -80],
    [-150, -220, -80],
    [140, 170, -80],
    [-140, 170, -80],
    [130, 240, -80],
    [-130, 240, -80]
  ], n = [
    [0, 1, 2],
    [0, 2, 3],
    [4, 0, 5],
    [0, 3, 5],
    [6, 4, 5],
    [6, 5, 7],
    [1, 8, 9],
    [1, 9, 2],
    [4, 8, 1],
    [4, 1, 0],
    [3, 2, 9],
    [3, 9, 5],
    [8, 10, 11],
    [8, 11, 9],
    [12, 6, 7],
    [12, 7, 13],
    [7, 5, 15],
    [7, 15, 13],
    [6, 14, 4],
    [12, 14, 6],
    [14, 16, 4],
    [4, 16, 8],
    [5, 9, 15],
    [15, 9, 17],
    [16, 18, 8],
    [8, 18, 10],
    [9, 11, 17],
    [17, 11, 19],
    [10, 18, 11],
    [11, 18, 19],
    [14, 12, 13],
    [14, 13, 15],
    [16, 14, 15],
    [16, 15, 17],
    [18, 16, 17],
    [18, 17, 19]
  ], a = new c.BufferGeometry();
  a.setAttribute("position", new c.Float32BufferAttribute(t.flat(), 3)), a.setIndex(n.flat()), a.computeVertexNormals();
  const i = new c.Group(), s = new c.Group(), r = new c.Mesh(a, new c.MeshLambertMaterial({ color: e }));
  r.castShadow = !0, s.add(r);
  const o = new c.MeshPhongMaterial({
    color: 1710894,
    shininess: 120,
    transparent: !0,
    opacity: 0.82
  }), l = [
    [100, -100, 100],
    [-100, -100, 100],
    [150, -220, 20],
    [-150, -220, 20],
    [100, 100, 100],
    [-100, 100, 100],
    [140, 170, 25],
    [-140, 170, 25],
    [100, -100, 100],
    [100, 100, 100],
    [150, -220, 20],
    [140, 170, 25],
    [-100, -100, 100],
    [-100, 100, 100],
    [-150, -220, 20],
    [-140, 170, 25]
  ], d = [
    [0, 2, 3],
    [0, 3, 1],
    [4, 6, 7],
    [4, 7, 5],
    [8, 10, 11],
    [8, 11, 9],
    [12, 14, 15],
    [12, 15, 13]
  ], h = new c.BufferGeometry();
  h.setAttribute(
    "position",
    new c.Float32BufferAttribute(l.flat(), 3)
  ), h.setIndex(d.flat()), h.computeVertexNormals();
  const u = new c.Mesh(h, o);
  u.position.z = 1, s.add(u);
  const f = new c.MeshBasicMaterial({
    color: 8968191,
    transparent: !0,
    opacity: 0.34,
    side: c.DoubleSide
  }), w = new c.BufferGeometry();
  w.setAttribute(
    "position",
    new c.Float32BufferAttribute(
      [90, -110, 95, -90, -110, 95, 140, -210, 25, -140, -210, 25],
      3
    )
  ), w.setIndex([0, 2, 3, 0, 3, 1]), w.computeVertexNormals();
  const g = new c.Mesh(w, f);
  g.position.z = 2, s.add(g);
  const m = new c.MeshPhongMaterial({
    color: 2236962,
    shininess: 48
  }), b = (p, _, T, A) => {
    const k = new c.Mesh(new c.CylinderGeometry(70, 70, A, 10), m);
    return k.rotateZ(Math.PI / 2), k.position.set(p, _, T), k.castShadow = !0, k;
  };
  return s.add(b(120, -300, -60, 50)), s.add(b(-120, -300, -60, 50)), s.add(b(120, 150, -60, 70)), s.add(b(-120, 150, -60, 70)), s.position.set(0, 0, 50), s.rotateZ(Math.PI / 2), s.scale.set(0.35, 0.35, 0.35), i.add(s), i;
}
function ka() {
  const e = new c.Group();
  e.visible = !1, e.position.set(-124, 0, 8);
  const t = new c.ConeGeometry(30, 220, 14, 1, !0);
  t.rotateZ(Math.PI / 2), t.translate(-110, 0, 0);
  const n = new c.ConeGeometry(17, 150, 12, 1, !0);
  n.rotateZ(Math.PI / 2), n.translate(-75, 0, 0);
  const a = new c.SphereGeometry(21, 12, 12), i = [-38, 38];
  for (const s of i) {
    const r = new c.Group();
    r.position.set(0, s, 0);
    const o = new c.MeshBasicMaterial({
      color: "#ff9b2f",
      transparent: !0,
      opacity: 0.42,
      blending: c.AdditiveBlending,
      depthWrite: !1,
      side: c.DoubleSide
    });
    o.forceSinglePass = !0;
    const l = new c.Mesh(t, o);
    l.name = "outer-flame", r.add(l);
    const d = new c.MeshBasicMaterial({
      color: "#fff2ba",
      transparent: !0,
      opacity: 0.9,
      blending: c.AdditiveBlending,
      depthWrite: !1,
      side: c.DoubleSide
    });
    d.forceSinglePass = !0;
    const h = new c.Mesh(n, d);
    h.name = "inner-flame", r.add(h);
    const u = new c.MeshBasicMaterial({
      color: "#fff8db",
      transparent: !0,
      opacity: 0.62,
      blending: c.AdditiveBlending,
      depthWrite: !1
    });
    u.forceSinglePass = !0;
    const f = new c.Mesh(a, u);
    f.name = "glow", f.position.x = -10, r.add(f), e.add(r);
  }
  return e;
}
function Sa() {
  const e = new c.Group();
  e.visible = !1, e.position.set(0, 0, 235);
  const t = 240, n = 82, a = 188, i = 20, s = new c.PlaneGeometry(t, n), r = new c.MeshBasicMaterial({
    color: 463645,
    transparent: !0,
    opacity: 0.78,
    side: c.DoubleSide,
    depthWrite: !1
  }), o = new c.Mesh(s, r);
  o.position.z = -1, e.add(o);
  const l = new c.PlaneGeometry(a, i), d = new c.MeshBasicMaterial({
    color: 1385521,
    transparent: !0,
    opacity: 0.92,
    side: c.DoubleSide,
    depthWrite: !1
  }), h = new c.Mesh(l, d);
  h.position.y = -18, e.add(h);
  const u = new c.PlaneGeometry(a, i), f = new c.MeshBasicMaterial({
    color: 16761415,
    transparent: !0,
    opacity: 0.98,
    side: c.DoubleSide,
    depthWrite: !1
  }), w = new c.Mesh(u, f);
  w.position.y = -18, e.add(w);
  const g = document.createElement("canvas");
  g.width = 512, g.height = 160;
  const m = g.getContext("2d");
  if (!m)
    throw new Error("Unable to create boost meter label context");
  const b = new c.CanvasTexture(g);
  b.colorSpace = c.SRGBColorSpace, b.needsUpdate = !0;
  const p = new c.PlaneGeometry(190, 48), _ = new c.MeshBasicMaterial({
    map: b,
    transparent: !0,
    depthWrite: !1,
    side: c.DoubleSide
  }), T = new c.Mesh(p, _);
  return T.position.set(0, 15, 0), e.add(T), {
    group: e,
    fillMesh: w,
    fillMaterial: f,
    labelTexture: b,
    labelContext: m,
    labelCanvas: g,
    lastPercent: null
  };
}
function Ta() {
  const e = new c.Group();
  e.visible = !1;
  const t = new c.MeshBasicMaterial({
    color: 16765276,
    transparent: !0,
    opacity: 0.86,
    depthWrite: !1
  }), n = new c.Mesh(new c.TorusGeometry(170, 8, 8, 48), t);
  n.position.z = 16, e.add(n);
  const a = document.createElement("canvas");
  a.width = 512, a.height = 192;
  const i = a.getContext("2d");
  if (!i)
    throw new Error("Unable to create demo indicator label context");
  i.textAlign = "center", i.textBaseline = "middle", i.lineJoin = "round", i.font = "800 86px sans-serif", i.lineWidth = 20, i.strokeStyle = "rgba(7, 19, 29, 0.94)", i.strokeText("DEMO", a.width / 2, 88), i.fillStyle = "#fff0b8", i.fillText("DEMO", a.width / 2, 88), i.font = "700 34px sans-serif", i.lineWidth = 10, i.strokeText("RESPAWNING", a.width / 2, 150), i.fillStyle = "#ffbd4a", i.fillText("RESPAWNING", a.width / 2, 150);
  const s = new c.CanvasTexture(a);
  s.colorSpace = c.SRGBColorSpace;
  const r = new c.MeshBasicMaterial({
    map: s,
    transparent: !0,
    depthWrite: !1,
    side: c.DoubleSide
  }), o = new c.Mesh(new c.PlaneGeometry(310, 116), r);
  return o.position.z = 300, e.add(o), { group: e, ring: n, label: o };
}
function Pa(e, t, n, a) {
  e.fillMesh.scale.x = Math.max(1e-3, t);
  const i = 94;
  e.fillMesh.position.x = -(1 - t) * i, e.fillMesh.position.y = -18;
  const s = Math.max(0, Math.min(100, Math.round($t(n))));
  if (e.lastPercent !== s) {
    const { labelContext: r, labelCanvas: o, labelTexture: l } = e;
    r.clearRect(0, 0, o.width, o.height), r.textAlign = "center", r.textBaseline = "middle", r.lineJoin = "round", r.font = "700 84px sans-serif", r.lineWidth = 18, r.strokeStyle = "rgba(7, 19, 29, 0.92)", r.strokeText(`${s}`, o.width / 2, 78), r.fillStyle = "#fff8e1", r.fillText(`${s}`, o.width / 2, 78), r.font = "600 30px sans-serif", r.lineWidth = 10, r.strokeText("BOOST", o.width / 2, 130), r.fillStyle = "#ffcf70", r.fillText("BOOST", o.width / 2, 130), l.needsUpdate = !0, e.lastPercent = s;
  }
  e.group.quaternion.copy(a.quaternion);
}
function Ca(e) {
  e.add(new c.AmbientLight("#d8ecff", 1.6));
  const t = new c.DirectionalLight("#fff6df", 2.4);
  t.position.set(4e3, -6e3, 5e3), e.add(t);
  const n = new c.DirectionalLight("#97d7ff", 1.2);
  n.position.set(-5e3, 4e3, 3e3), e.add(n);
}
function Ia(e) {
  const t = wa(e), n = new c.MeshPhongMaterial({
    color: 16777215,
    map: t,
    shininess: 42,
    specular: new c.Color("#f7f2e3")
  });
  return {
    mesh: new c.Mesh(new c.SphereGeometry(93, 24, 24), n),
    texture: t
  };
}
function Aa(e, t, n) {
  const a = new c.Scene();
  a.background = new c.Color("#081119");
  const i = new c.PerspectiveCamera(48, 1, 10 * n, 5e5 * n);
  i.up.set(0, 0, 1), i.position.set(0, -9e3 * n, 5e3 * n), i.lookAt(0, 0, 0);
  const s = new c.WebGLRenderer({
    antialias: !1,
    powerPreference: "high-performance"
  });
  s.setPixelRatio(Math.min(window.devicePixelRatio || 1, ba)), s.domElement.style.display = "block", s.domElement.style.width = "100%", s.domElement.style.height = "100%", s.domElement.tabIndex = 0, s.domElement.setAttribute("aria-label", "Replay player viewport"), e.replaceChildren(s.domElement);
  const r = new Yn(i, s.domElement);
  r.enableDamping = !0, r.maxDistance = 16e4 * n, r.keyPanSpeed = fa, r.target.set(0, 0, 600 * n), r.listenToKeyEvents(s.domElement), r.update();
  const o = () => {
    s.domElement.focus();
  };
  s.domElement.addEventListener("pointerdown", o);
  const { stadium: l, wallPanels: d } = Ea(n);
  a.add(l), Ca(a);
  const h = new c.Group();
  h.scale.set(-n, n, n), a.add(h);
  const { mesh: u, texture: f } = Ia(s);
  h.add(u);
  const w = /* @__PURE__ */ new Map(), g = /* @__PURE__ */ new Map(), m = /* @__PURE__ */ new Map(), b = /* @__PURE__ */ new Map(), p = /* @__PURE__ */ new Map(), _ = /* @__PURE__ */ new Map();
  for (const x of t.players) {
    const S = new c.Group(), N = x.isTeamZero ? "#57a8ff" : "#ff9c40", V = Ma(N), U = va(x.hitbox, N);
    S.add(V), S.add(U);
    const $ = ka();
    S.add($);
    const q = Sa();
    S.add(q.group);
    const Z = Ta();
    h.add(S), h.add(Z.group), w.set(x.id, S), g.set(x.id, V), m.set(x.id, U), b.set(x.id, $), p.set(x.id, q), _.set(x.id, Z);
  }
  const T = () => {
    const x = e.clientWidth || 1, S = e.clientHeight || 1;
    i.aspect = x / S, i.updateProjectionMatrix(), s.setSize(x, S, !1);
  };
  T();
  const A = new c.Vector3(), k = new c.Vector3(), E = new c.Quaternion(), C = new c.Vector3();
  return {
    scene: a,
    replayRoot: h,
    camera: i,
    renderer: s,
    controls: r,
    resize: T,
    dispose: () => {
      s.domElement.removeEventListener("pointerdown", o), r.stopListenToKeyEvents(), r.dispose(), f.dispose(), s.dispose(), e.replaceChildren();
    },
    ballMesh: u,
    playerMeshes: w,
    playerBodyMeshes: g,
    playerHitboxes: m,
    playerBoostTrails: b,
    playerBoostMeters: p,
    playerDemoIndicators: _,
    updateWallVisibility: () => {
      a.updateMatrixWorld(!0);
      for (const x of d) {
        if (x.fixedOpacity !== null) {
          x.material.transparent = !0, x.material.opacity = x.fixedOpacity, x.material.depthWrite = !1;
          continue;
        }
        x.mesh.getWorldPosition(A), x.mesh.getWorldQuaternion(E), k.copy(x.outwardLocal).applyQuaternion(E).normalize(), C.copy(i.position).sub(A);
        const S = k.dot(C) > 0;
        x.material.transparent = !0, x.material.opacity = S ? Me : tt, x.material.depthWrite = !S;
      }
    }
  };
}
function Y(e) {
  const [t, n] = Object.entries(e)[0] ?? ["Unknown", "unknown"];
  return typeof n == "string" || typeof n == "number" ? `${t}:${n}` : n && typeof n == "object" ? `${t}:${JSON.stringify(n)}` : `${t}:${JSON.stringify(n)}`;
}
function pe(e, t) {
  return Math.max(0, e - t);
}
function Ae(e) {
  return new Map(e.map((t) => [t.id, t]));
}
const X = 70, _t = 73, Ra = 3072, Da = 4096, Oa = 1792, La = 4184, Na = 940, Ba = 3308, Fa = 2816, Et = 3584, za = 2484, Ua = 1788, Ga = 2300, Va = 2048, ja = 1036, Ha = 1024, Wa = 1024, $a = 4240, nt = 34;
function Pe(e, t, n, a, i) {
  e.push({
    index: e.length,
    padId: null,
    size: i,
    position: { x: t, y: n, z: a },
    events: []
  });
}
function Ce(e, t, n, a, i) {
  Pe(e, -t, n, a, i), Pe(e, t, n, a, i);
}
function Ge(e, t, n, a, i) {
  Pe(e, t, -n, a, i), Pe(e, t, n, a, i);
}
function oe(e, t, n, a, i) {
  Ce(e, t, -n, a, i), Ce(e, t, n, a, i);
}
function en() {
  const e = [];
  return Ge(e, 0, $a, X, "small"), oe(e, Oa, La, X, "small"), oe(e, Ra, Da, _t, "big"), oe(e, Na, Ba, X, "small"), Ge(e, 0, Fa, X, "small"), oe(e, Et, za, X, "small"), oe(e, Ua, Ga, X, "small"), oe(e, Va, ja, X, "small"), Ge(e, 0, Wa, X, "small"), Ce(e, Et, 0, _t, "big"), Ce(e, Ha, 0, X, "small"), e;
}
function ye(e) {
  if (e === "Available")
    return !0;
  if (e && typeof e == "object") {
    if ("Available" in e)
      return !0;
    if ("PickedUp" in e)
      return !1;
    const t = e.kind;
    if (t === "Available")
      return !0;
    if (t === "PickedUp")
      return !1;
  }
  return null;
}
function tn(e) {
  return e === "big" || e === "Big" ? "big" : e === "small" || e === "Small" ? "small" : null;
}
function nn(e) {
  let t = null;
  for (const n of e) {
    const a = ye(n.kind);
    if (a === !1) {
      t = n.time;
      continue;
    }
    if (a === !0 && t !== null)
      return n.time - t >= 7 ? "big" : "small";
  }
  return null;
}
function Ka(e, t, n, a) {
  const i = Ae(t), s = /* @__PURE__ */ new Map();
  for (const d of e.boost_pad_events ?? []) {
    if (ye(d.kind) === null) {
      a?.advance();
      continue;
    }
    const u = s.get(d.pad_id);
    u ? u.push(d) : s.set(d.pad_id, [d]), a?.advance();
  }
  const r = e.boost_pads;
  if (!r || r.length === 0)
    return a?.advance(nt), en();
  const o = [...r].sort((d, h) => d.index - h.index), l = new Array(o.length);
  for (let d = 0; d < o.length; d += 1) {
    const h = o[d], u = typeof h.pad_id == "string" ? h.pad_id : null, f = u ? [...s.get(u) ?? []] : [], w = tn(h.size) ?? nn(f) ?? (h.position.z >= 72 ? "big" : "small"), g = f.sort((b, p) => b.time - p.time), m = new Array(g.length);
    for (let b = 0; b < g.length; b += 1) {
      const p = g[b], _ = p.player ? Y(p.player) : null;
      m[b] = {
        time: pe(p.time, n),
        frame: p.frame,
        available: ye(p.kind) ?? !0,
        playerId: _,
        playerName: _ ? i.get(_)?.name ?? _ : null
      };
    }
    l[d] = {
      index: h.index,
      padId: u,
      size: w,
      position: h.position,
      events: m
    }, a?.advance();
  }
  return l;
}
async function Ya(e, t, n, a) {
  const i = Ae(t), s = /* @__PURE__ */ new Map();
  for (const d of e.boost_pad_events ?? []) {
    if (ye(d.kind) === null) {
      a.advance() && await a.yieldToMainThread();
      continue;
    }
    const u = s.get(d.pad_id);
    u ? u.push(d) : s.set(d.pad_id, [d]), a.advance() && await a.yieldToMainThread();
  }
  const r = e.boost_pads;
  if (!r || r.length === 0)
    return a.advance(nt) && await a.yieldToMainThread(), en();
  const o = [...r].sort((d, h) => d.index - h.index), l = new Array(o.length);
  for (let d = 0; d < o.length; d += 1) {
    const h = o[d], u = typeof h.pad_id == "string" ? h.pad_id : null, f = u ? [...s.get(u) ?? []] : [], w = tn(h.size) ?? nn(f) ?? (h.position.z >= 72 ? "big" : "small"), g = f.sort((b, p) => b.time - p.time), m = new Array(g.length);
    for (let b = 0; b < g.length; b += 1) {
      const p = g[b], _ = p.player ? Y(p.player) : null;
      m[b] = {
        time: pe(p.time, n),
        frame: p.frame,
        available: ye(p.kind) ?? !0,
        playerId: _,
        playerName: _ ? i.get(_)?.name ?? _ : null
      };
    }
    l[d] = {
      index: h.index,
      padId: u,
      size: w,
      position: h.position,
      events: m
    }, a.advance() && await a.yieldToMainThread();
  }
  return l;
}
function at(e) {
  return Number.isInteger(e.frame) && e.frame >= 0 ? e.frame : null;
}
function Za(e, t) {
  if (typeof e.time == "number" && Number.isFinite(e.time))
    return e.time;
  const n = at(e);
  if (n === null)
    return null;
  const a = t.frame_data.metadata_frames[n]?.time;
  return typeof a == "number" && Number.isFinite(a) ? a : null;
}
function Xa(e, t) {
  return `bookmark:${at(e) ?? "unknown"}:${e.description || "tick-mark"}:${t}`;
}
function an(e, t, n) {
  return (e.replay_tick_marks ?? []).flatMap((a, i) => {
    n?.advance();
    const s = Za(a, e);
    return s === null ? [] : [
      {
        id: Xa(a, i),
        description: a.description,
        frame: at(a),
        time: pe(s, t)
      }
    ];
  });
}
function sn(e) {
  const t = e.description.trim() || "Replay bookmark";
  return {
    id: e.id,
    time: e.time,
    seekTime: e.time,
    frame: e.frame ?? void 0,
    kind: "bookmark",
    label: t,
    shortLabel: "BM",
    iconName: "bookmark"
  };
}
const te = {
  distance: 270,
  height: 100,
  pitch: -4,
  fov: 110
}, qa = 5e-3, Qa = Number.POSITIVE_INFINITY, Ja = 16;
function vt(e) {
  const t = Math.hypot(e.x, e.y, e.z);
  return t < 1e-6 ? null : {
    x: e.x / t,
    y: e.y / t,
    z: e.z / t
  };
}
function rn(e) {
  const t = Math.hypot(e.x, e.y, e.z, e.w);
  return t < 1e-6 ? null : {
    x: e.x / t,
    y: e.y / t,
    z: e.z / t,
    w: e.w / t
  };
}
function xt(e, t) {
  return {
    w: e.w * t.w - e.x * t.x - e.y * t.y - e.z * t.z,
    x: e.w * t.x + e.x * t.w + e.y * t.z - e.z * t.y,
    y: e.w * t.y - e.x * t.z + e.y * t.w + e.z * t.x,
    z: e.w * t.z + e.x * t.y - e.y * t.x + e.z * t.w
  };
}
function Mt(e, t) {
  const n = xt(
    xt(t, {
      x: e.x,
      y: e.y,
      z: e.z,
      w: 0
    }),
    {
      x: -t.x,
      y: -t.y,
      z: -t.z,
      w: t.w
    }
  );
  return {
    x: n.x,
    y: n.y,
    z: n.z
  };
}
function on(e) {
  if (e === "Empty")
    return {
      position: null,
      linearVelocity: null,
      angularVelocity: null,
      rotation: null
    };
  const t = e.Data.rigid_body;
  return {
    position: t.location,
    linearVelocity: t.linear_velocity ?? null,
    angularVelocity: t.angular_velocity ?? null,
    rotation: rn(t.rotation)
  };
}
function ln(e) {
  if (e === "Empty")
    return {
      isPresent: !1,
      position: null,
      linearVelocity: null,
      angularVelocity: null,
      rotation: null,
      forward: null,
      up: null,
      boostAmount: 0,
      boostFraction: 0,
      boostActive: !1,
      powerslideActive: !1,
      jumpActive: !1,
      doubleJumpActive: !1,
      dodgeActive: !1
    };
  const t = e.Data.rigid_body, n = rn(t.rotation), a = n ? vt(Mt({ x: 1, y: 0, z: 0 }, n)) : null, i = n ? vt(Mt({ x: 0, y: 0, z: 1 }, n)) : null;
  return {
    isPresent: !0,
    position: t.location,
    linearVelocity: t.linear_velocity ?? null,
    angularVelocity: t.angular_velocity ?? null,
    rotation: n,
    forward: a,
    up: i,
    boostAmount: e.Data.boost_amount,
    boostFraction: Math.max(0, Math.min(1, e.Data.boost_amount / 255)),
    boostActive: e.Data.boost_active,
    powerslideActive: e.Data.powerslide_active,
    jumpActive: e.Data.jump_active,
    doubleJumpActive: e.Data.double_jump_active,
    dodgeActive: e.Data.dodge_active
  };
}
function ei(e) {
  return e.position !== null;
}
function ti(e) {
  return {
    ...e,
    isPresent: !1,
    linearVelocity: null,
    angularVelocity: null,
    boostActive: !1,
    powerslideActive: !1,
    jumpActive: !1,
    doubleJumpActive: !1,
    dodgeActive: !1
  };
}
function cn(e) {
  let t = null, n = null;
  for (let a = 0; a < e.length; a += 1) {
    const i = e[a];
    if (ei(i)) {
      if (n !== null && t) {
        const s = ti(t);
        for (let r = n; r < a; r += 1)
          e[r] = s;
      }
      t = i, n = null;
    } else t && n === null && (n = a);
  }
}
function kt() {
  return typeof performance > "u" ? Date.now() : performance.now();
}
function ni() {
  return new Promise((e) => setTimeout(e, 0));
}
function ai(e) {
  const t = e.meta.team_zero.length + e.meta.team_one.length, n = e.frame_data.players.reduce(
    (r, [, o]) => r + o.frames.length,
    0
  ), a = e.boost_pads?.length ?? nt, i = e.boost_pad_events?.length ?? 0, s = (e.goal_events?.length ?? 0) + (e.player_stat_events?.length ?? 0) + (e.demolish_infos?.length ?? 0) + (e.replay_tick_marks?.length ?? 0);
  return [
    Math.max(1, e.frame_data.metadata_frames.length),
    Math.max(1, t),
    Math.max(1, n),
    Math.max(1, e.frame_data.ball_data.frames.length),
    Math.max(1, a + i),
    Math.max(1, s)
  ].reduce((r, o) => r + o, 0);
}
function ii(e) {
  const t = e.frame_data.players.reduce(
    (n, [, a]) => n + a.frames.length,
    0
  );
  return [
    Math.max(1, e.frame_data.metadata_frames.length),
    Math.max(1, t),
    Math.max(1, e.frame_data.ball_data.frames.length)
  ].reduce((n, a) => n + a, 0);
}
function dn(e, t, n = {}) {
  const a = ai(e), i = ii(e);
  let s = 0, r = 0, o = -1, l = -1, d = kt();
  const h = n.yieldEveryMs ?? Number.POSITIVE_INFINITY, u = n.progressReportMinDelta ?? qa, f = Math.max(
    1,
    n.progressReportFrameInterval ?? Qa
  ), w = () => {
    if (!t)
      return !1;
    const m = Math.max(0, Math.min(1, s / a));
    if (m <= o)
      return !1;
    const p = r - l >= f;
    return m >= 1 || m - o >= u || p ? (o = m, l = r, t(m, {
      progress: m,
      processedFrames: Math.min(r, i),
      totalFrames: i,
      processedUnits: s,
      totalUnits: a
    }), !0) : !1;
  }, g = (m = !1) => {
    const b = kt();
    return !m && b - d < h ? !1 : (d = b, !0);
  };
  return w(), {
    advance(m = 1) {
      if (m <= 0)
        return !1;
      s = Math.min(a, s + m);
      const b = w();
      return g(b);
    },
    advanceFrame(m = 1) {
      if (m <= 0)
        return !1;
      r = Math.min(i, r + m), s = Math.min(a, s + m);
      const b = w();
      return g(b);
    },
    finish() {
      s = a, r = i, w();
    }
  };
}
function si(e, t) {
  return {
    ...dn(e, t.onProgress, {
      progressReportMinDelta: t.progressReportMinDelta,
      progressReportFrameInterval: t.progressReportFrameInterval,
      yieldEveryMs: t.yieldEveryMs ?? Ja
    }),
    yieldToMainThread: t.yieldToMainThread ?? ni
  };
}
function ri(e, t) {
  const n = e.frame_data.metadata_frames;
  if (n.length === 0)
    return t?.advanceFrame(), [];
  const a = n[0]?.time ?? 0, i = new Array(n.length);
  for (let s = 0; s < n.length; s += 1) {
    const r = n[s];
    i[s] = {
      time: r.time - a,
      secondsRemaining: r.seconds_remaining,
      gameState: r.replicated_game_state_name,
      kickoffCountdown: r.replicated_game_state_time_remaining
    }, t?.advanceFrame();
  }
  return i;
}
async function oi(e, t) {
  const n = e.frame_data.metadata_frames;
  if (n.length === 0)
    return t.advanceFrame() && await t.yieldToMainThread(), [];
  const a = n[0]?.time ?? 0, i = new Array(n.length);
  for (let s = 0; s < n.length; s += 1) {
    const r = n[s];
    i[s] = {
      time: r.time - a,
      secondsRemaining: r.seconds_remaining,
      gameState: r.replicated_game_state_name,
      kickoffCountdown: r.replicated_game_state_time_remaining
    }, t.advanceFrame() && await t.yieldToMainThread();
  }
  return i;
}
function hn(e, t, n, a) {
  return t.has(e) ? !0 : n.has(e) ? !1 : a && a !== "Empty" && typeof a.Data.is_team_0 == "boolean" ? a.Data.is_team_0 : !0;
}
function li(e) {
  return e ? Object.entries(e) : [];
}
function ne(e, t) {
  const n = e.find(([a]) => a === t)?.[1];
  return typeof n == "number" && Number.isFinite(n) ? n : void 0;
}
function un(e) {
  const t = li(e?.stats);
  return {
    fov: ne(t, "CameraFOV") ?? te.fov,
    height: ne(t, "CameraHeight") ?? te.height,
    pitch: ne(t, "CameraPitch") ?? te.pitch,
    distance: ne(t, "CameraDistance") ?? te.distance,
    stiffness: ne(t, "CameraStiffness") ?? te.stiffness,
    swivelSpeed: ne(t, "CameraSwivelSpeed") ?? te.swivelSpeed,
    transitionSpeed: ne(t, "CameraTransitionSpeed") ?? te.transitionSpeed
  };
}
function ci(e, t) {
  const n = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), i = [...e.meta.team_zero, ...e.meta.team_one];
  if (i.length === 0)
    return t?.advance(), { byId: n, byName: a };
  for (const s of i)
    a.set(s.name, s), s.remote_id && n.set(Y(s.remote_id), s), t?.advance();
  return { byId: n, byName: a };
}
async function di(e, t) {
  const n = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), i = [...e.meta.team_zero, ...e.meta.team_one];
  if (i.length === 0)
    return t.advance() && await t.yieldToMainThread(), { byId: n, byName: a };
  for (const s of i)
    a.set(s.name, s), s.remote_id && n.set(Y(s.remote_id), s), t.advance() && await t.yieldToMainThread();
  return { byId: n, byName: a };
}
function hi(e, t) {
  const n = new Set(e.meta.team_zero.map((o) => o.name)), a = new Set(e.meta.team_one.map((o) => o.name)), i = ci(e, t), s = [];
  let r = 0;
  for (const [o, l] of e.frame_data.players) {
    const d = new Array(l.frames.length);
    let h;
    for (let g = 0; g < l.frames.length; g += 1) {
      const m = l.frames[g];
      h === void 0 && m !== "Empty" && (h = m), d[g] = ln(m), r += 1, t?.advanceFrame();
    }
    cn(d);
    const u = Y(o), f = h !== void 0 && h.Data.player_name ? h.Data.player_name : i.byId.get(u)?.name ?? u, w = i.byId.get(u) ?? i.byName.get(f);
    s.push({
      id: u,
      name: f,
      isTeamZero: hn(f, n, a, h),
      cameraSettings: un(w),
      hitbox: qt(Qt(w)),
      frames: d
    });
  }
  return r === 0 && t?.advanceFrame(), s;
}
async function ui(e, t) {
  const n = new Set(e.meta.team_zero.map((o) => o.name)), a = new Set(e.meta.team_one.map((o) => o.name)), i = await di(e, t), s = [];
  let r = 0;
  for (const [o, l] of e.frame_data.players) {
    const d = new Array(l.frames.length);
    let h;
    for (let g = 0; g < l.frames.length; g += 1) {
      const m = l.frames[g];
      h === void 0 && m !== "Empty" && (h = m), d[g] = ln(m), r += 1, t.advanceFrame() && await t.yieldToMainThread();
    }
    cn(d);
    const u = Y(o), f = h !== void 0 && h.Data.player_name ? h.Data.player_name : i.byId.get(u)?.name ?? u, w = i.byId.get(u) ?? i.byName.get(f);
    s.push({
      id: u,
      name: f,
      isTeamZero: hn(f, n, a, h),
      cameraSettings: un(w),
      hitbox: qt(Qt(w)),
      frames: d
    });
  }
  return r === 0 && t.advanceFrame() && await t.yieldToMainThread(), s;
}
function mi(e, t) {
  const n = e.frame_data.ball_data.frames;
  if (n.length === 0)
    return t?.advanceFrame(), [];
  const a = new Array(n.length);
  for (let i = 0; i < n.length; i += 1)
    a[i] = on(n[i]), t?.advanceFrame();
  return a;
}
async function pi(e, t) {
  const n = e.frame_data.ball_data.frames;
  if (n.length === 0)
    return t.advanceFrame() && await t.yieldToMainThread(), [];
  const a = new Array(n.length);
  for (let i = 0; i < n.length; i += 1)
    a[i] = on(n[i]), t.advanceFrame() && await t.yieldToMainThread();
  return a;
}
function it(e, t, n) {
  return `${e}:${t}:${n}`;
}
function mn(e) {
  return e.sort((t, n) => t.time !== n.time ? t.time - n.time : (t.frame ?? 0) - (n.frame ?? 0));
}
function pn(e, t, n) {
  const a = e.player ? Y(e.player) : null, i = a ? t.get(a)?.name ?? a : null, s = i ? `${i} scored` : "Goal";
  return {
    id: it("goal", e.frame, a ?? "team"),
    time: pe(e.time, n),
    frame: e.frame,
    kind: "goal",
    label: s,
    shortLabel: "G",
    playerId: a,
    playerName: i,
    isTeamZero: e.scoring_team_is_team_0
  };
}
function fn(e, t, n) {
  const a = Y(e.player), i = t.get(a)?.name ?? a, s = e.kind.toLowerCase(), r = e.kind === "Shot" ? "shot" : e.kind === "Save" ? "save" : "assist", o = e.kind === "Shot" ? "SH" : e.kind === "Save" ? "SV" : "A";
  return {
    id: it(s, e.frame, a),
    time: pe(e.time, n),
    frame: e.frame,
    kind: s,
    label: `${i} ${r}`,
    shortLabel: o,
    playerId: a,
    playerName: i,
    location: e.shot?.shot_touch_position ?? e.shot?.ball_position ?? null,
    shot: e.shot ?? null,
    isTeamZero: e.is_team_0
  };
}
function bn(e, t, n) {
  const a = Y(e.attacker), i = Y(e.victim), s = t.get(a), r = t.get(i);
  return {
    id: it("demo", e.frame, `${a}:${i}`),
    time: pe(e.time, n),
    frame: e.frame,
    kind: "demo",
    label: `${s?.name ?? a} demoed ${r?.name ?? i}`,
    shortLabel: "D",
    playerId: a,
    playerName: s?.name ?? a,
    secondaryPlayerId: i,
    secondaryPlayerName: r?.name ?? i,
    location: e.victim_location,
    isTeamZero: s?.isTeamZero ?? null
  };
}
function fi(e, t, n, a, i) {
  const s = Ae(t), r = [];
  for (const o of e.goal_events ?? [])
    r.push(pn(o, s, a)), i?.advance();
  for (const o of e.player_stat_events ?? [])
    r.push(fn(o, s, a)), i?.advance();
  for (const o of e.demolish_infos ?? [])
    r.push(bn(o, s, a)), i?.advance();
  for (const o of n)
    r.push(sn(o));
  return r.length === 0 && i?.advance(), mn(r);
}
async function bi(e, t, n, a, i) {
  const s = Ae(t), r = [];
  for (const o of e.goal_events ?? [])
    r.push(pn(o, s, a)), i.advance() && await i.yieldToMainThread();
  for (const o of e.player_stat_events ?? [])
    r.push(fn(o, s, a)), i.advance() && await i.yieldToMainThread();
  for (const o of e.demolish_infos ?? [])
    r.push(bn(o, s, a)), i.advance() && await i.yieldToMainThread();
  for (const o of n)
    r.push(sn(o));
  return r.length === 0 && i.advance() && await i.yieldToMainThread(), mn(r);
}
function Dr(e, t = {}) {
  const n = dn(e, t.onProgress, {
    progressReportMinDelta: t.progressReportMinDelta,
    progressReportFrameInterval: t.progressReportFrameInterval
  }), a = e.frame_data.metadata_frames[0]?.time ?? 0, i = ri(e, n), s = hi(e, n), r = mi(e, n), o = Ka(e, s, a, n), l = an(e, a, n), d = fi(e, s, l, a, n);
  return n.finish(), {
    frameCount: i.length,
    duration: i.at(-1)?.time ?? 0,
    rawStartTime: a,
    frames: i,
    ballFrames: r,
    boostPads: o,
    players: s,
    tickMarks: l,
    timelineEvents: d,
    teamZeroNames: e.meta.team_zero.map((h) => h.name),
    teamOneNames: e.meta.team_one.map((h) => h.name)
  };
}
async function gi(e, t = {}) {
  const n = si(e, t), a = e.frame_data.metadata_frames[0]?.time ?? 0, i = await oi(e, n), s = await ui(e, n), r = await pi(e, n), o = await Ya(e, s, a, n), l = an(e, a, n), d = await bi(
    e,
    s,
    l,
    a,
    n
  );
  return n.finish(), {
    frameCount: i.length,
    duration: i.at(-1)?.time ?? 0,
    rawStartTime: a,
    frames: i,
    ballFrames: r,
    boostPads: o,
    players: s,
    tickMarks: l,
    timelineEvents: d,
    teamZeroNames: e.meta.team_zero.map((h) => h.name),
    teamOneNames: e.meta.team_one.map((h) => h.name)
  };
}
function me(e, t) {
  if (e.frames.length === 0)
    return 0;
  let n = 0, a = e.frames.length - 1;
  for (; n <= a; ) {
    const i = Math.floor((n + a) / 2), s = e.frames[i]?.time ?? 0;
    if (s < t)
      n = i + 1;
    else if (s > t)
      a = i - 1;
    else
      return i;
  }
  return Math.max(0, n - 1);
}
function yi(e, t) {
  return e.frames.length === 0 ? 0 : c.MathUtils.clamp(Math.round(t), 0, e.frames.length - 1);
}
function wi(e) {
  if (e.frames.length === 0)
    return null;
  const t = /* @__PURE__ */ new Map();
  for (const i of e.frames)
    t.set(i.gameState, (t.get(i.gameState) ?? 0) + 1);
  let n = null, a = -1;
  for (const [i, s] of t.entries())
    s <= a || (n = i, a = s);
  return n;
}
function _i(e, t) {
  if (t === null)
    return null;
  for (const n of e.frames) {
    if (n.gameState === t)
      break;
    return n.gameState;
  }
  return null;
}
function gn(e, t) {
  return t === null ? e.kickoffCountdown <= 0 : e.gameState === t;
}
function st(e, t) {
  return e.kickoffCountdown > 0 ? !0 : t !== null && e.gameState === t;
}
function Ei(e, t) {
  return e.ballFrames[t]?.position ? !0 : e.players.some((n) => n.frames[t]?.position);
}
function vi(e, t, n, a) {
  return st(t, a) && Ei(e, n);
}
function ke(e, t, n, a, i) {
  return !gn(t, a) && !vi(e, t, n, i);
}
function St(e, t, n, a, i, s, r) {
  return a && ke(e, t, n, s, r) || i && st(t, r);
}
function xi(e, t, n, a, i) {
  const s = [], { frames: r } = e;
  if (r.length === 0 || !t && !n)
    return s;
  let o = 0;
  for (; o < r.length; ) {
    const l = r[o];
    if (!l || !St(
      e,
      l,
      o,
      t,
      n,
      a,
      i
    )) {
      o += 1;
      continue;
    }
    const d = l.time;
    let h = o + 1;
    for (; h < r.length && St(
      e,
      r[h],
      h,
      t,
      n,
      a,
      i
    ); )
      h += 1;
    const u = r[h]?.time ?? e.duration;
    if (u > d) {
      const f = s.at(-1);
      f && f.endTime >= d ? f.endTime = Math.max(f.endTime, u) : s.push({ startTime: d, endTime: u });
    }
    o = h;
  }
  return s;
}
function Mi(e, t, n) {
  const a = c.MathUtils.clamp(n, 0, e);
  for (const i of t) {
    if (a < i.startTime)
      break;
    if (a < i.endTime)
      return {
        replayTime: a,
        timelineTime: a,
        seekTime: i.endTime,
        hiddenBySkip: !0
      };
  }
  return {
    replayTime: a,
    timelineTime: a,
    seekTime: a,
    hiddenBySkip: !1
  };
}
function ki(e, t, n, a) {
  return c.MathUtils.clamp(a, 0, e);
}
function Si(e, t) {
  const n = t.at(-1);
  return !n || n.endTime < e ? e : c.MathUtils.clamp(n.startTime, 0, e);
}
function Ti(e, t, n) {
  const a = e.frames[t];
  if (!a || a.kickoffCountdown <= 0)
    return null;
  let i = t;
  for (; i > 0 && (e.frames[i - 1]?.kickoffCountdown ?? 0) > 0; )
    i -= 1;
  let s = t + 1;
  for (; s < e.frames.length && e.frames[s].kickoffCountdown > 0; )
    s += 1;
  let r = 0;
  for (let d = i; d < s; d += 1)
    r = Math.max(r, e.frames[d].kickoffCountdown);
  const o = e.frames[s]?.time ?? e.duration, l = Math.max(0, o - n);
  return {
    kind: "kickoff-countdown",
    countdown: Math.max(1, Math.min(r, Math.ceil(l))),
    secondsRemaining: l,
    endsAt: o
  };
}
function Pi(e, t) {
  const n = me(e, t), a = Math.min(n + 1, e.frames.length - 1);
  if (a === n)
    return { frameIndex: n, nextFrameIndex: a, alpha: 0 };
  const i = e.frames[n]?.time ?? 0, s = e.frames[a]?.time ?? i;
  return s <= i ? { frameIndex: n, nextFrameIndex: a, alpha: 0 } : {
    frameIndex: n,
    nextFrameIndex: a,
    alpha: c.MathUtils.clamp((t - i) / (s - i), 0, 1)
  };
}
const Ci = 1.4, le = 0.18, Ee = 0.14, Ii = 120, Tt = 90, Ai = 40, Ri = 45, Di = 0.58, Pt = 0.82, Oi = 132, yn = new c.Vector3(-1, 0, 0), se = new c.Vector3(0, 0, 1), Li = new c.Vector3(-1, 0, 0), Ni = new c.Vector3(0, 0, 18800), Bi = new c.Vector3(0, 0, 700), Fi = new c.Vector3(-9600, -12600, 6400), zi = new c.Vector3(0, 0, 900), Ie = 48, Ui = 16, Gi = 16, Vi = 3e-3, ji = 0.05;
function wn(e, t, n) {
  return e ? !t || n <= 0 ? e : {
    x: c.MathUtils.lerp(e.x, t.x, n),
    y: c.MathUtils.lerp(e.y, t.y, n),
    z: c.MathUtils.lerp(e.z, t.z, n)
  } : t;
}
function _n(e, t, n) {
  const a = e ?? t;
  if (!a)
    return null;
  const i = new c.Quaternion(a.x, a.y, a.z, a.w);
  return !t || n <= 0 || e === null ? i : i.slerp(new c.Quaternion(t.x, t.y, t.z, t.w), n);
}
function rt(e) {
  return new c.Vector3(e.x, e.y, e.z);
}
function En(e, t) {
  return new c.Vector3(
    -e.x * t,
    e.y * t,
    e.z * t
  );
}
function Ve(e) {
  return new c.Vector3(-e.x, e.y, e.z).normalize();
}
function Hi(e, t) {
  switch (e) {
    case "overhead":
      return {
        position: Ni.clone().multiplyScalar(t),
        target: Bi.clone().multiplyScalar(t),
        up: Li.clone(),
        fov: Ie
      };
    case "side":
      return {
        position: Fi.clone().multiplyScalar(t),
        target: zi.clone().multiplyScalar(t),
        up: se.clone(),
        fov: Ie
      };
  }
}
function Wi(e) {
  const { fov: t, position: n, sceneState: a, target: i, up: s } = e, { camera: r, controls: o } = a;
  o.enabled = !1, r.position.lerp(n, Ee), o.target.lerp(i, Ee), r.up.lerp(s, Ee).normalize(), r.fov = c.MathUtils.lerp(r.fov, t, Ee), r.updateProjectionMatrix(), r.lookAt(o.target);
  const l = r.position.distanceToSquared(n) <= Ui, d = o.target.distanceToSquared(i) <= Gi, h = r.up.angleTo(s) <= Vi, u = Math.abs(r.fov - t) <= ji;
  return !l || !d || !h || !u ? !1 : (r.position.copy(n), o.target.copy(i), r.up.copy(s).normalize(), r.fov = t, r.updateProjectionMatrix(), r.lookAt(i), o.enabled = !0, !0);
}
function $i(e) {
  const t = e.linearVelocity ? Ve(e.linearVelocity) : null, n = e.forward ? Ve(e.forward) : null, a = e.up ? Ve(e.up) : null;
  if ((e.position?.z ?? 1 / 0) < Ii) {
    const l = (n ?? t ?? yn.clone()).clone().setZ(0);
    if (l.lengthSq() < 1e-4)
      return null;
    l.normalize(), t && t.lengthSq() > 1e-4 && l.dot(t) < 0 && l.negate();
    const d = new c.Vector3().crossVectors(se, l).normalize(), h = new c.Vector3().crossVectors(l, d).normalize();
    return { forward: l, up: h, right: d };
  }
  if (!n || !a)
    return null;
  const s = n.clone().normalize(), r = new c.Vector3().crossVectors(a, s).normalize(), o = new c.Vector3().crossVectors(s, r).normalize();
  return { forward: s, up: o, right: r };
}
function Ki(e) {
  const {
    cameraViewMode: t,
    attachedPlayerId: n,
    ballCamEnabled: a,
    ballPosition: i,
    cameraDistanceScale: s,
    customCameraSettings: r,
    desiredCameraPosition: o,
    desiredLookTarget: l,
    attachedPlayerUnavailable: d = !1,
    fieldScale: h,
    frameIndex: u,
    replay: f,
    sceneState: w
  } = e, g = w.controls;
  if (t === "free") {
    g.enabled = !0, w.camera.fov = c.MathUtils.lerp(
      w.camera.fov,
      Ie,
      le
    ), w.camera.updateProjectionMatrix();
    return;
  }
  if (!n) {
    g.enabled = !0, w.camera.fov = c.MathUtils.lerp(
      w.camera.fov,
      Ie,
      le
    ), w.camera.updateProjectionMatrix();
    return;
  }
  const m = f.players.find((U) => U.id === n), b = m?.frames[u];
  if (!m || d || !b?.position || b.isPresent === !1) {
    g.enabled = !0;
    return;
  }
  g.enabled = !1;
  const p = En(b.position, h), _ = $i(b), T = _?.forward ?? yn.clone(), A = _?.right ?? new c.Vector3(0, 1, 0), k = {
    ...m.cameraSettings,
    ...r ?? {}
  }, E = (k.distance ?? 270) * h * s, C = (k.height ?? 100) * h * Ci, O = c.MathUtils.degToRad(k.pitch ?? -4), F = T.clone().applyAxisAngle(A, O).normalize(), x = p.clone().addScaledVector(se, C), S = T.clone().multiplyScalar(-E).addScaledVector(se, C).applyAxisAngle(A, O), N = p.clone().addScaledVector(se, Ai * h);
  let V = k.fov ?? 110;
  if (a && i) {
    const U = i.clone().addScaledVector(se, Ri * h), $ = U.clone().sub(N), q = ($.lengthSq() > 1e-4 ? $.normalize() : F.clone()).multiplyScalar(Pt).addScaledVector(F, 1 - Pt).normalize();
    l.copy(N).lerp(U, Di), o.copy(x).addScaledVector(q, -E), o.z = Math.max(Tt * h, o.z);
    const Z = N.clone().sub(o), J = U.clone().sub(o);
    if (Z.lengthSq() > 1e-4 && J.lengthSq() > 1e-4) {
      const Oe = Z.angleTo(J);
      V = Math.min(
        Oi,
        Math.max(V, c.MathUtils.radToDeg(Oe) * 1.7)
      );
    }
  } else
    o.copy(N).add(S), o.z = Math.max(Tt * h, o.z), l.copy(N);
  w.camera.position.lerp(o, le), w.camera.up.lerp(se, le).normalize(), g.target.lerp(l, le), w.camera.fov = c.MathUtils.lerp(w.camera.fov, V, le), w.camera.updateProjectionMatrix(), w.camera.lookAt(g.target);
}
const Yi = 2.25, vn = 3.2, Se = "free";
function ae(e) {
  return typeof e == "number" && Number.isFinite(e) ? e : void 0;
}
function Ze(e) {
  if (!e)
    return null;
  const t = {}, n = ae(e.fov), a = ae(e.height), i = ae(e.pitch), s = ae(e.distance), r = ae(e.stiffness), o = ae(e.swivelSpeed), l = ae(e.transitionSpeed);
  return n !== void 0 && (t.fov = n), a !== void 0 && (t.height = a), i !== void 0 && (t.pitch = i), s !== void 0 && (t.distance = s), r !== void 0 && (t.stiffness = r), o !== void 0 && (t.swivelSpeed = o), l !== void 0 && (t.transitionSpeed = l), t;
}
function Zi(e) {
  const t = e.initialAttachedPlayerId ?? null;
  return {
    speed: Math.max(0.1, e.initialPlaybackRate ?? 1),
    cameraDistanceScale: Math.max(
      0.25,
      e.initialCameraDistanceScale ?? Yi
    ),
    customCameraSettings: Ze(e.initialCustomCameraSettings),
    attachedPlayerId: t,
    cameraViewMode: e.initialCameraViewMode ?? (t ? "follow" : Se),
    ballCamEnabled: e.initialBallCamEnabled ?? !1,
    boostMeterEnabled: e.initialBoostMeterEnabled ?? !1,
    boostPickupAnimationEnabled: e.initialBoostPickupAnimationEnabled ?? !0,
    hitboxWireframesEnabled: e.initialHitboxWireframesEnabled ?? !1,
    hitboxOnlyModeEnabled: e.initialHitboxOnlyModeEnabled ?? !1,
    skipPostGoalTransitionsEnabled: e.initialSkipPostGoalTransitionsEnabled ?? !0,
    skipKickoffsEnabled: e.initialSkipKickoffsEnabled ?? !1
  };
}
function Xi(e, t, n, a) {
  const i = me(e, t), s = e.frames[i];
  if (!s || !st(s, a))
    return null;
  const r = e.frames.find(
    (o, l) => l > i && gn(o, n)
  );
  return !r || r.time === t ? null : r.time;
}
function qi(e, t, n, a) {
  const i = me(e, t), s = e.frames[i];
  if (!s || !ke(e, s, i, n, a))
    return null;
  const r = e.frames.find(
    (d, h) => h > i && !ke(e, d, h, n, a)
  );
  if (r)
    return r.time === t ? null : r.time;
  let o = i;
  for (; o > 0 && ke(
    e,
    e.frames[o - 1],
    o - 1,
    n,
    a
  ); )
    o -= 1;
  const l = e.frames[o]?.time;
  return l === void 0 || l === t ? null : l;
}
function Qi({
  replay: e,
  sceneState: t,
  fieldScale: n,
  frameWindow: a
}) {
  const i = e.ballFrames[a.frameIndex] ?? null, s = e.ballFrames[a.nextFrameIndex] ?? i, r = wn(
    i?.position ?? null,
    s?.position ?? null,
    a.alpha
  ), o = r ? En(r, n) : null;
  if (r) {
    t.ballMesh.visible = !0, t.ballMesh.position.copy(rt(r));
    const l = _n(
      i?.rotation ?? null,
      s?.rotation ?? null,
      a.alpha
    );
    l ? t.ballMesh.quaternion.copy(l) : t.ballMesh.quaternion.identity();
  } else
    t.ballMesh.visible = !1;
  return { ballFrame: i, nextBallFrame: s, ballPosition: o };
}
function Ji(e) {
  return !!e?.position && e?.isPresent !== !1;
}
function Ct(e, t, n) {
  for (let a = e.length - 1; a >= 0; a -= 1) {
    const i = e[a], s = n - i.time;
    if (!(s < 0)) {
      if (s > vn)
        break;
      if (i.kind === "demo" && i.secondaryPlayerId === t)
        return i;
    }
  }
  return null;
}
function je({
  indicator: e,
  fallbackPosition: t,
  demoEvent: n,
  currentTime: a,
  camera: i
}) {
  if (!e)
    return;
  const s = n?.location ?? t;
  if (!n || !s) {
    e.group.visible = !1;
    return;
  }
  const r = Math.max(0, a - n.time), o = a * 8, l = 1 + 0.08 * Math.sin(o);
  e.group.visible = !0, e.group.position.copy(rt(s)), e.ring.rotation.z = o * 0.15, e.ring.scale.setScalar(l), e.label.quaternion.copy(i.quaternion), e.label.scale.setScalar(1 + 0.04 * Math.sin(o + 1.3));
  const d = c.MathUtils.clamp(1 - r / vn, 0.28, 1);
  for (const h of [e.ring, e.label]) {
    const u = h.material;
    u instanceof c.Material && (u.opacity = d);
  }
}
function es(e, t, n, a, i) {
  if (!t) {
    e.visible = !1;
    return;
  }
  e.visible = !0;
  const s = a * 36 + i * 1.7, r = 0.86 + 0.14 * Math.sin(s), o = c.MathUtils.clamp(0.62 + n * 0.88, 0.62, 1.5), l = o * (1.02 + r * 0.52), d = 1.02 + o * 0.28;
  e.scale.set(l, d, d);
  for (const [h, u] of e.children.entries()) {
    const f = u, w = 0.92 + 0.14 * Math.sin(s + h * 0.85);
    f.scale.setScalar(w), f.traverse((g) => {
      if (!(g instanceof c.Mesh))
        return;
      const m = g.material;
      if (m instanceof c.MeshBasicMaterial)
        switch (g.name) {
          case "outer-flame":
            m.opacity = 0.24 + o * 0.24;
            break;
          case "inner-flame":
            m.opacity = 0.58 + o * 0.3;
            break;
          case "glow":
            m.opacity = 0.4 + o * 0.26;
            break;
        }
    });
  }
}
const ts = 1;
class ns extends EventTarget {
  container;
  replay;
  options;
  sceneState;
  beforeRenderCallbacks = [];
  plugins = [];
  fieldScale;
  desiredCameraPosition = new c.Vector3();
  desiredLookTarget = new c.Vector3();
  boundWindowResize = () => this.sceneState.resize();
  liveGameState;
  kickoffGameState;
  timelineSegmentsCacheKey = null;
  timelineSegmentsCache = [];
  resizeObserver = null;
  animationFrameId = null;
  disposed = !1;
  playing = !1;
  speed = 1;
  currentTime = 0;
  playbackStartedAt = 0;
  playbackStartedTime = 0;
  cameraDistanceScale;
  customCameraSettings;
  cameraViewMode;
  freeCameraTransition = null;
  attachedPlayerId;
  ballCamEnabled;
  boostMeterEnabled;
  boostPickupAnimationEnabled;
  hitboxWireframesEnabled;
  hitboxOnlyModeEnabled;
  skipPostGoalTransitionsEnabled;
  skipKickoffsEnabled;
  constructor(t, n, a = {}) {
    super(), this.container = t, this.replay = n, this.options = a, this.fieldScale = a.fieldScale ?? ts, this.sceneState = Aa(t, n, this.fieldScale), this.liveGameState = wi(n), this.kickoffGameState = _i(n, this.liveGameState);
    const i = Zi(a);
    this.speed = i.speed, this.cameraDistanceScale = i.cameraDistanceScale, this.customCameraSettings = i.customCameraSettings, this.attachedPlayerId = i.attachedPlayerId, this.cameraViewMode = i.cameraViewMode, this.ballCamEnabled = i.ballCamEnabled, this.boostMeterEnabled = i.boostMeterEnabled, this.boostPickupAnimationEnabled = i.boostPickupAnimationEnabled, this.hitboxWireframesEnabled = i.hitboxWireframesEnabled, this.hitboxOnlyModeEnabled = i.hitboxOnlyModeEnabled, this.skipPostGoalTransitionsEnabled = i.skipPostGoalTransitionsEnabled, this.skipKickoffsEnabled = i.skipKickoffsEnabled, this.setHitboxVisualizationVisibility(), this.installResizeHandling();
    for (const s of a.plugins ?? [])
      this.installPlugin(s, !1);
    this.render(), this.scheduleAnimationFrame(), this.emitChange(), a.autoplay && this.play();
  }
  play() {
    this.playing || (this.playing = !0, this.skipPostGoalTransitionIfNeeded(), this.skipPastKickoffIfNeeded(), this.reanchorPlaybackClock(), this.emitChange());
  }
  pause() {
    this.playing && (this.syncPlaybackClock(), this.playing = !1, this.emitChange());
  }
  togglePlayback() {
    this.playing ? this.pause() : this.play();
  }
  setPlaybackRate(t) {
    this.playing && this.syncPlaybackClock(), this.speed = Math.max(0.1, t), this.playing && this.reanchorPlaybackClock(), this.emitChange();
  }
  setCameraDistanceScale(t) {
    this.cameraDistanceScale = Math.max(0.25, t), this.render(), this.emitChange();
  }
  setCustomCameraSettings(t) {
    this.customCameraSettings = Ze(t), this.render(), this.emitChange();
  }
  setAttachedPlayer(t) {
    this.attachedPlayerId = t, this.cameraViewMode = t ? "follow" : Se, this.freeCameraTransition = null, this.render(), this.emitChange();
  }
  setCameraViewMode(t) {
    this.cameraViewMode = t, this.freeCameraTransition = null, this.render(), this.emitChange();
  }
  setFreeCameraPreset(t) {
    const { fov: n, position: a, target: i, up: s } = Hi(t, this.fieldScale);
    this.cameraViewMode = Se, this.freeCameraTransition = {
      position: a,
      target: i,
      up: s,
      fov: n
    }, this.render(), this.emitChange();
  }
  setBallCamEnabled(t) {
    this.ballCamEnabled = t, this.render(), this.emitChange();
  }
  setBoostMeterEnabled(t) {
    if (this.boostMeterEnabled = t, !t)
      for (const n of this.sceneState.playerBoostMeters.values())
        n.group.visible = !1;
    this.render(), this.emitChange();
  }
  setBoostPickupAnimationEnabled(t) {
    this.boostPickupAnimationEnabled = t, this.render(), this.emitChange();
  }
  setHitboxWireframesEnabled(t) {
    this.hitboxWireframesEnabled = t, this.setHitboxVisualizationVisibility(), this.render(), this.emitChange();
  }
  setHitboxOnlyModeEnabled(t) {
    this.hitboxOnlyModeEnabled = t, this.setHitboxVisualizationVisibility(), this.render(), this.emitChange();
  }
  setSkipPostGoalTransitionsEnabled(t) {
    this.skipPostGoalTransitionsEnabled = t, t && this.playing && this.skipPostGoalTransitionIfNeeded(), this.render(), this.emitChange();
  }
  setSkipKickoffsEnabled(t) {
    this.skipKickoffsEnabled = t, t && this.playing && (this.skipPostGoalTransitionIfNeeded(), this.skipPastKickoffIfNeeded()), this.render(), this.emitChange();
  }
  seek(t) {
    this.currentTime = this.clampReplayTime(t), this.playing && (this.skipPostGoalTransitionIfNeeded(), this.skipPastKickoffIfNeeded()), this.playing && this.reanchorPlaybackClock(), this.render(), this.emitChange();
  }
  setFrameIndex(t) {
    const n = yi(this.replay, t), a = this.replay.frames[n]?.time ?? 0, i = this.playing, s = this.currentTime !== a || i;
    this.playing = !1, this.currentTime = a, this.render(), s && this.emitChange();
  }
  stepFrames(t) {
    if (!Number.isFinite(t) || this.replay.frames.length === 0)
      return;
    const n = me(this.replay, this.currentTime);
    this.setFrameIndex(n + Math.trunc(t));
  }
  stepForwardFrame() {
    this.stepFrames(1);
  }
  stepBackwardFrame() {
    this.stepFrames(-1);
  }
  setState(t) {
    const n = performance.now();
    if (t.speed !== void 0 && (this.playing && this.syncPlaybackClock(n), this.speed = Math.max(0.1, t.speed)), t.cameraDistanceScale !== void 0 && (this.cameraDistanceScale = Math.max(0.25, t.cameraDistanceScale)), t.customCameraSettings !== void 0 && (this.customCameraSettings = Ze(t.customCameraSettings)), t.cameraViewMode !== void 0 && (this.cameraViewMode = t.cameraViewMode), t.attachedPlayerId !== void 0 && (this.attachedPlayerId = t.attachedPlayerId, t.cameraViewMode === void 0 && (this.cameraViewMode = this.attachedPlayerId ? "follow" : Se)), t.ballCamEnabled !== void 0 && (this.ballCamEnabled = t.ballCamEnabled), t.boostMeterEnabled !== void 0 && (this.boostMeterEnabled = t.boostMeterEnabled, !this.boostMeterEnabled))
      for (const a of this.sceneState.playerBoostMeters.values())
        a.group.visible = !1;
    t.boostPickupAnimationEnabled !== void 0 && (this.boostPickupAnimationEnabled = t.boostPickupAnimationEnabled), t.hitboxWireframesEnabled !== void 0 && (this.hitboxWireframesEnabled = t.hitboxWireframesEnabled, this.setHitboxVisualizationVisibility()), t.hitboxOnlyModeEnabled !== void 0 && (this.hitboxOnlyModeEnabled = t.hitboxOnlyModeEnabled, this.setHitboxVisualizationVisibility()), t.skipPostGoalTransitionsEnabled !== void 0 && (this.skipPostGoalTransitionsEnabled = t.skipPostGoalTransitionsEnabled), t.skipKickoffsEnabled !== void 0 && (this.skipKickoffsEnabled = t.skipKickoffsEnabled), t.currentTime !== void 0 && (this.currentTime = this.clampReplayTime(t.currentTime)), t.playing !== void 0 && t.playing !== this.playing && (t.playing ? this.playing = !0 : (t.currentTime === void 0 && this.syncPlaybackClock(n), this.playing = !1)), this.playing && (this.skipPostGoalTransitionIfNeeded(n), this.skipPastKickoffIfNeeded(n), this.reanchorPlaybackClock(n)), this.render(), this.emitChange();
  }
  getState() {
    const t = me(this.replay, this.currentTime);
    return {
      currentTime: this.currentTime,
      duration: this.replay.duration,
      frameIndex: t,
      activeMetadata: this.getActiveMetadata(t, this.currentTime),
      playing: this.playing,
      speed: this.speed,
      cameraDistanceScale: this.cameraDistanceScale,
      customCameraSettings: this.customCameraSettings,
      cameraViewMode: this.cameraViewMode,
      attachedPlayerId: this.attachedPlayerId,
      ballCamEnabled: this.ballCamEnabled,
      boostMeterEnabled: this.boostMeterEnabled,
      boostPickupAnimationEnabled: this.boostPickupAnimationEnabled,
      hitboxWireframesEnabled: this.hitboxWireframesEnabled,
      hitboxOnlyModeEnabled: this.hitboxOnlyModeEnabled,
      skipPostGoalTransitionsEnabled: this.skipPostGoalTransitionsEnabled,
      skipKickoffsEnabled: this.skipKickoffsEnabled
    };
  }
  getSnapshot() {
    return this.getState();
  }
  getTimelineDuration() {
    return this.replay.duration;
  }
  getTimelineCurrentTime() {
    return this.projectReplayTimeToTimeline(this.currentTime).timelineTime;
  }
  getTimelineSegments() {
    const t = `${this.skipPostGoalTransitionsEnabled}:${this.skipKickoffsEnabled}`;
    return this.timelineSegmentsCacheKey === t ? this.timelineSegmentsCache : (this.timelineSegmentsCacheKey = t, this.timelineSegmentsCache = this.computeTimelineSegments(), this.timelineSegmentsCache);
  }
  projectReplayTimeToTimeline(t) {
    return Mi(
      this.replay.duration,
      this.getTimelineSegments(),
      t
    );
  }
  projectTimelineTimeToReplay(t) {
    return ki(
      this.replay.duration,
      this.getTimelineDuration(),
      this.getTimelineSegments(),
      t
    );
  }
  clampReplayTime(t) {
    return c.MathUtils.clamp(t, 0, this.replay.duration);
  }
  getPlaybackEndTime() {
    return Si(this.replay.duration, this.getTimelineSegments());
  }
  subscribe(t) {
    const n = (a) => {
      t(a.detail);
    };
    return this.addEventListener("change", n), t(this.getState()), () => {
      this.removeEventListener("change", n);
    };
  }
  onBeforeRender(t) {
    return this.beforeRenderCallbacks.push(t), () => {
      const n = this.beforeRenderCallbacks.indexOf(t);
      n >= 0 && this.beforeRenderCallbacks.splice(n, 1);
    };
  }
  addPlugin(t) {
    return this.installPlugin(t, !0);
  }
  removePlugin(t) {
    const n = this.plugins.findIndex((i) => i.plugin.id === t);
    if (n < 0)
      return !1;
    const [a] = this.plugins.splice(n, 1);
    return a.plugin.teardown?.(this.createPluginContext()), this.render(), !0;
  }
  getPlugins() {
    return this.plugins.map((t) => t.plugin);
  }
  destroy() {
    for (this.playing && this.pause(), this.disposed = !0, this.animationFrameId !== null && (cancelAnimationFrame(this.animationFrameId), this.animationFrameId = null), this.resizeObserver ? (this.resizeObserver.disconnect(), this.resizeObserver = null) : window.removeEventListener("resize", this.boundWindowResize); this.plugins.length > 0; )
      this.plugins.pop()?.plugin.teardown?.(this.createPluginContext());
    this.sceneState.dispose();
  }
  dispose() {
    this.destroy();
  }
  installResizeHandling() {
    if (typeof ResizeObserver < "u") {
      this.resizeObserver = new ResizeObserver(() => {
        this.sceneState.resize();
      }), this.resizeObserver.observe(this.container);
      return;
    }
    window.addEventListener("resize", this.boundWindowResize);
  }
  scheduleAnimationFrame() {
    this.animationFrameId !== null || this.disposed || (this.animationFrameId = requestAnimationFrame(this.tick));
  }
  reanchorPlaybackClock(t = performance.now()) {
    this.playbackStartedAt = t, this.playbackStartedTime = this.currentTime;
  }
  setHitboxVisualizationVisibility() {
    for (const t of this.sceneState.playerHitboxes.values())
      t.visible = this.hitboxWireframesEnabled || this.hitboxOnlyModeEnabled, xa(t, this.hitboxOnlyModeEnabled);
    for (const t of this.sceneState.playerBodyMeshes.values())
      t.visible = !this.hitboxOnlyModeEnabled;
    if (this.hitboxOnlyModeEnabled) {
      for (const t of this.sceneState.playerBoostTrails.values())
        t.visible = !1;
      for (const t of this.sceneState.playerBoostMeters.values())
        t.group.visible = !1;
    }
  }
  syncPlaybackClock(t = performance.now()) {
    if (!this.playing)
      return !1;
    const n = (t - this.playbackStartedAt) / 1e3, a = c.MathUtils.clamp(
      this.playbackStartedTime + n * this.speed,
      0,
      this.getPlaybackEndTime()
    ), i = a !== this.currentTime;
    return this.currentTime = a, i;
  }
  tick = (t) => {
    if (this.animationFrameId = null, this.disposed)
      return;
    let n = !1;
    this.playing && (n = this.syncPlaybackClock(t), n = this.skipPostGoalTransitionIfNeeded(t) || n, n = this.skipPastKickoffIfNeeded(t) || n, this.currentTime >= this.getPlaybackEndTime() && (this.playing = !1, n = !0)), this.render(), n && this.emitChange(), this.scheduleAnimationFrame();
  };
  render() {
    const t = Pi(this.replay, this.currentTime), n = t.frameIndex, { ballFrame: a, nextBallFrame: i, ballPosition: s } = Qi({
      replay: this.replay,
      sceneState: this.sceneState,
      fieldScale: this.fieldScale,
      frameWindow: t
    }), r = [];
    for (const [d, h] of this.replay.players.entries()) {
      const u = this.sceneState.playerMeshes.get(h.id), f = this.sceneState.playerBoostTrails.get(h.id), w = this.sceneState.playerBoostMeters.get(h.id), g = this.sceneState.playerDemoIndicators.get(h.id), m = h.frames[n] ?? null, b = h.frames[t.nextFrameIndex] ?? m;
      let p = null, _ = null, T = 0;
      if (!u) {
        g && (g.group.visible = !1), r.push({
          track: h,
          mesh: null,
          boostTrail: f ?? null,
          frame: m,
          nextFrame: b,
          interpolatedPosition: _,
          boostFraction: T
        });
        continue;
      }
      p = wn(
        m?.position ?? null,
        b?.position ?? null,
        t.alpha
      );
      const A = Ct(
        this.replay.timelineEvents,
        h.id,
        this.currentTime
      );
      if (!p) {
        u.visible = !1, f && (f.visible = !1), w && (w.group.visible = !1), je({
          indicator: g ?? null,
          fallbackPosition: null,
          demoEvent: A,
          currentTime: this.currentTime,
          camera: this.sceneState.camera
        }), r.push({
          track: h,
          mesh: u,
          boostTrail: f ?? null,
          frame: m,
          nextFrame: b,
          interpolatedPosition: _,
          boostFraction: T
        });
        continue;
      }
      if (A) {
        u.visible = !1, f && (f.visible = !1), w && (w.group.visible = !1), je({
          indicator: g ?? null,
          fallbackPosition: p,
          demoEvent: A,
          currentTime: this.currentTime,
          camera: this.sceneState.camera
        }), r.push({
          track: h,
          mesh: u,
          boostTrail: f ?? null,
          frame: m,
          nextFrame: b,
          interpolatedPosition: _,
          boostFraction: T
        });
        continue;
      }
      if (!Ji(m)) {
        u.visible = !1, f && (f.visible = !1), w && (w.group.visible = !1), je({
          indicator: g ?? null,
          fallbackPosition: p,
          demoEvent: null,
          currentTime: this.currentTime,
          camera: this.sceneState.camera
        }), r.push({
          track: h,
          mesh: u,
          boostTrail: f ?? null,
          frame: m,
          nextFrame: b,
          interpolatedPosition: _,
          boostFraction: T
        });
        continue;
      }
      u.visible = !0, g && (g.group.visible = !1), _ = p, u.position.copy(rt(p));
      const E = _n(
        m?.rotation ?? null,
        b?.rotation ?? null,
        t.alpha
      );
      E ? u.quaternion.copy(E) : u.quaternion.identity();
      const C = m?.boostFraction ?? 0, O = b?.boostFraction ?? C;
      if (T = c.MathUtils.lerp(
        C,
        O,
        t.alpha
      ), f) {
        const F = (t.alpha >= 0.5 ? b?.boostActive : m?.boostActive) ?? m?.boostActive ?? b?.boostActive ?? !1;
        this.hitboxOnlyModeEnabled ? f.visible = !1 : es(f, F, T, this.currentTime, d);
      }
      w && (this.boostMeterEnabled && !this.hitboxOnlyModeEnabled ? (w.group.visible = !0, Pa(
        w,
        T,
        c.MathUtils.lerp(
          m?.boostAmount ?? 0,
          b?.boostAmount ?? m?.boostAmount ?? 0,
          t.alpha
        ),
        this.sceneState.camera
      )) : w.group.visible = !1), r.push({
        track: h,
        mesh: u,
        boostTrail: f ?? null,
        frame: m,
        nextFrame: b,
        interpolatedPosition: _,
        boostFraction: T
      });
    }
    Ki({
      sceneState: this.sceneState,
      replay: this.replay,
      fieldScale: this.fieldScale,
      cameraViewMode: this.cameraViewMode,
      attachedPlayerId: this.attachedPlayerId,
      ballCamEnabled: this.ballCamEnabled,
      cameraDistanceScale: this.cameraDistanceScale,
      customCameraSettings: this.customCameraSettings,
      frameIndex: n,
      attachedPlayerUnavailable: this.attachedPlayerId !== null && Ct(this.replay.timelineEvents, this.attachedPlayerId, this.currentTime) !== null,
      ballPosition: s,
      desiredCameraPosition: this.desiredCameraPosition,
      desiredLookTarget: this.desiredLookTarget
    }), this.cameraViewMode === "free" && this.freeCameraTransition && Wi({
      sceneState: this.sceneState,
      ...this.freeCameraTransition
    }) && (this.freeCameraTransition = null), this.sceneState.controls.update(), this.sceneState.updateWallVisibility();
    const o = {
      frameIndex: t.frameIndex,
      nextFrameIndex: t.nextFrameIndex,
      alpha: t.alpha,
      currentTime: this.currentTime
    };
    for (const d of this.beforeRenderCallbacks)
      d(o);
    const l = this.createRenderContext(
      o,
      a,
      i,
      s,
      r
    );
    for (const d of this.plugins)
      d.plugin.beforeRender?.(l);
    this.sceneState.renderer.render(this.sceneState.scene, this.sceneState.camera);
  }
  skipPastKickoffIfNeeded(t) {
    if (!this.skipKickoffsEnabled)
      return !1;
    const n = Xi(
      this.replay,
      this.currentTime,
      this.liveGameState,
      this.kickoffGameState
    );
    return n === null ? !1 : (this.currentTime = n, this.playing && this.reanchorPlaybackClock(t), !0);
  }
  skipPostGoalTransitionIfNeeded(t) {
    if (!this.skipPostGoalTransitionsEnabled)
      return !1;
    const n = qi(
      this.replay,
      this.currentTime,
      this.liveGameState,
      this.kickoffGameState
    );
    return n === null ? !1 : (this.currentTime = n, this.playing && this.reanchorPlaybackClock(t), !0);
  }
  getActiveMetadata(t, n) {
    return Ti(this.replay, t, n);
  }
  computeTimelineSegments() {
    return xi(
      this.replay,
      this.skipPostGoalTransitionsEnabled,
      this.skipKickoffsEnabled,
      this.liveGameState,
      this.kickoffGameState
    );
  }
  installPlugin(t, n) {
    const a = typeof t == "function" ? t() : t;
    if (this.plugins.some((s) => s.plugin.id === a.id))
      throw new Error(`Replay player plugin "${a.id}" is already installed`);
    const i = { definition: t, plugin: a };
    return this.plugins.push(i), a.setup?.(this.createPluginContext()), a.onStateChange?.(this.createPluginStateContext(this.getState())), n && this.render(), () => {
      const s = this.plugins.indexOf(i);
      s < 0 || (this.plugins.splice(s, 1), a.teardown?.(this.createPluginContext()), this.render());
    };
  }
  createPluginContext() {
    return {
      player: this,
      replay: this.replay,
      scene: this.sceneState,
      container: this.container,
      options: this.options
    };
  }
  createPluginStateContext(t) {
    return {
      ...this.createPluginContext(),
      state: t
    };
  }
  createRenderContext(t, n, a, i, s) {
    return {
      ...this.createPluginStateContext(this.getState()),
      ...t,
      frame: this.replay.frames[t.frameIndex] ?? null,
      nextFrame: this.replay.frames[t.nextFrameIndex] ?? null,
      ballFrame: n,
      nextBallFrame: a,
      ballPosition: i,
      players: s
    };
  }
  emitChange() {
    const t = this.getState(), n = this.createPluginStateContext(t);
    for (const a of this.plugins)
      a.plugin.onStateChange?.(n);
    this.dispatchEvent(new CustomEvent("change", { detail: t }));
  }
}
let He = null;
function ge(e) {
  if (e instanceof Map)
    return Object.fromEntries(
      Array.from(e.entries()).map(([t, n]) => [t, ge(n)])
    );
  if (Array.isArray(e))
    return e.map((t) => ge(t));
  if (e && typeof e == "object") {
    const t = {};
    for (const [n, a] of Object.entries(e))
      t[n] = ge(a);
    return t;
  }
  return e;
}
async function as() {
  if (!He) {
    const e = Te.default;
    He = typeof e == "function" ? e() : Promise.resolve();
  }
  await He;
}
function is(e) {
  return e.useWorker !== void 0 ? e.useWorker && typeof Worker < "u" : typeof Worker < "u";
}
function ss(e) {
  return e instanceof Error ? e : new Error(String(e));
}
function rs(e = 100) {
  return typeof requestAnimationFrame != "function" ? Promise.resolve() : new Promise((t) => {
    let n = !1, a = null;
    const i = () => {
      n || (n = !0, a !== null && clearTimeout(a), t());
    };
    a = setTimeout(i, e), requestAnimationFrame(() => i());
  });
}
async function os(e, t) {
  const n = new Worker(new URL(
    /* @vite-ignore */
    "" + new URL("assets/wasm.worker-CyMwBQw7.js", import.meta.url).href,
    import.meta.url
  ), {
    type: "module"
  }), a = e.slice();
  return new Promise((i, s) => {
    const r = () => {
      n.terminate();
    };
    n.onmessage = async (l) => {
      const d = l.data;
      if (d.type === "progress") {
        t.onProgress?.(d.progress);
        return;
      }
      if (d.type === "error") {
        r(), s(new Error(d.error));
        return;
      }
      r();
      try {
        t.onProgress?.({ stage: "decoding-replay", progress: 0 }), await rs();
        const h = new TextDecoder(), u = JSON.parse(
          h.decode(new Uint8Array(d.rawBuffer))
        );
        t.onProgress?.({ stage: "decoding-replay", progress: 0.5 });
        const f = JSON.parse(
          h.decode(new Uint8Array(d.replayBuffer))
        );
        t.onProgress?.({ stage: "decoding-replay", progress: 1 }), i({
          raw: u,
          replay: f
        });
      } catch (h) {
        s(ss(h));
      }
    }, n.onerror = (l) => {
      r(), s(new Error(l.message || "Replay loading worker failed"));
    };
    const o = {
      type: "load-replay",
      bytes: a.buffer,
      reportEveryNFrames: t.reportEveryNFrames ?? 1e3
    };
    n.postMessage(o, [a.buffer]);
  });
}
async function ot(e, t = {}) {
  if (is(t))
    return os(e, t);
  await as(), t.onProgress?.({ stage: "validating", progress: 0 });
  const n = ls(e);
  if (!n.valid)
    throw new Error(n.error ?? "Replay validation failed");
  t.onProgress?.({ stage: "processing", progress: 0 });
  const a = ge(
    t.onProgress ? Te.get_replay_frames_data_with_progress(
      e,
      (s) => {
        t.onProgress?.(s);
      },
      t.reportEveryNFrames ?? 1e3
    ) : Te.get_replay_frames_data(e)
  );
  t.onProgress?.({ stage: "normalizing", progress: 0 });
  const i = await gi(a, {
    onProgress(s) {
      t.onProgress?.({ stage: "normalizing", progress: s });
    }
  });
  return {
    raw: a,
    replay: i
  };
}
function ls(e) {
  return ge(
    Te.validate_replay(e)
  );
}
const cs = "https://ballchasing.com/api", xn = "https://ballchasing.com", ds = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
function Mn(e, t) {
  const a = (t instanceof URL ? t.href : t).replace(/\/+$/, "");
  return new URL(`${a}/${e.replace(/^\/+/, "")}`);
}
function hs(e) {
  const t = new Headers(e.fetchInit?.headers);
  return {
    ...e.fetchInit,
    method: e.fetchInit?.method ?? "POST",
    headers: t,
    signal: e.signal ?? e.fetchInit?.signal
  };
}
function us(e, t) {
  const n = e.statusText ? ` ${e.statusText}` : "", a = e.status === 401 || e.status === 403 || e.status === 404 ? ". The replay may be private, unavailable, or not downloadable without a Ballchasing session" : "";
  return `Failed to fetch Ballchasing replay from ${t.href} (${e.status}${n})${a}`;
}
function It(e) {
  return ds.test(e.trim());
}
function Re(e) {
  const t = e.trim();
  if (It(t))
    return t.toLowerCase();
  let n;
  try {
    n = new URL(t);
  } catch {
    throw new Error(`Invalid Ballchasing replay id: ${e}`);
  }
  if (!/(^|\.)ballchasing\.com$/i.test(n.hostname))
    throw new Error(`Invalid Ballchasing replay URL: ${e}`);
  const a = n.pathname.split("/").filter(Boolean), i = a.findIndex((o) => o === "replay"), s = a.findIndex((o) => o === "replays"), r = i >= 0 ? a[i + 1] : s >= 0 ? a[s + 1] : void 0;
  if (!r || !It(r))
    throw new Error(`Invalid Ballchasing replay URL: ${e}`);
  return r.toLowerCase();
}
function Or(e) {
  return `ballchasing-${Re(e)}.replay`;
}
function ms(e, t = xn) {
  const n = Re(e);
  return Mn(`dl/replay/${encodeURIComponent(n)}`, t);
}
function Lr(e, t = cs) {
  const n = Re(e);
  return Mn(`replays/${encodeURIComponent(n)}/file`, t);
}
async function ps(e, t = {}) {
  const n = ms(e, t.baseUrl ?? xn), a = t.fetch ?? globalThis.fetch;
  if (!a)
    throw new Error("No fetch implementation is available");
  const i = await a(n, hs(t));
  if (!i.ok)
    throw new Error(us(i, n));
  return new Uint8Array(await i.arrayBuffer());
}
function Nr(e, t = {}) {
  const n = Re(e);
  return {
    id: `ballchasing:${n}`,
    async load(a) {
      const i = await ps(n, t);
      return ot(i, {
        useWorker: !0,
        onProgress(s) {
          a?.updateProgress({
            stage: s.stage,
            progress: s.progress,
            processedFrames: s.processedFrames,
            totalFrames: s.totalFrames
          });
        }
      });
    }
  };
}
const At = "subtr-actor-ballchasing-overlay-styles", fs = "#3b82f6", bs = "#f59e0b";
function gs() {
  if (document.getElementById(At))
    return;
  const e = document.createElement("style");
  e.id = At, e.textContent = `
    .sap-bc-overlay-root {
      position: absolute;
      inset: 0;
      z-index: 3;
      pointer-events: none;
      overflow: hidden;
      font-family: "IBM Plex Sans", "Segoe UI", Roboto, sans-serif;
    }

    .sap-bc-floating-layer {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }

    .sap-bc-floating-track {
      position: absolute;
      display: flex;
      align-items: center;
      min-width: max-content;
      transform: translate(-50%, -100%);
      will-change: transform;
    }

    .sap-bc-player-selectable {
      pointer-events: auto;
      cursor: pointer;
    }

    .sap-bc-player-selectable:focus-visible {
      outline: 2px solid rgba(255, 255, 255, 0.88);
      outline-offset: 2px;
    }

    .sap-bc-floating-track[hidden] {
      display: none;
    }

    .sap-bc-boost-bar {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 8rem;
      max-width: 14rem;
      min-height: 1.45rem;
      border-radius: 999px;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.3);
      background: rgba(6, 11, 17, 0.42);
      box-shadow: 0 10px 24px rgba(0, 0, 0, 0.18);
      backdrop-filter: blur(6px);
      transition:
        border-color 0.12s ease-out,
        box-shadow 0.12s ease-out,
        transform 0.12s ease-out;
    }

    .sap-bc-boost-bar-blue {
      background: rgba(18, 39, 68, 0.68);
      border-color: rgba(109, 169, 255, 0.5);
    }

    .sap-bc-boost-bar-orange {
      background: rgba(71, 35, 8, 0.72);
      border-color: rgba(255, 189, 110, 0.5);
    }

    .sap-bc-boost-fill {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 0%;
      border-radius: 999px;
      transition: width 0.08s ease-out;
    }

    .sap-bc-boost-fill-blue {
      background:
        linear-gradient(90deg, rgba(123, 185, 255, 0.94), rgba(59, 130, 246, 0.96));
    }

    .sap-bc-boost-fill-orange {
      background:
        linear-gradient(90deg, rgba(255, 201, 118, 0.94), rgba(245, 158, 11, 0.96));
    }

    .sap-bc-boost-text {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.35rem;
      position: relative;
      z-index: 1;
      min-width: 0;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 0.22rem 0.72rem;
      color: #ffffff;
      font-size: 0.72rem;
      font-weight: 700;
      text-shadow: 0 1px 3px rgba(0, 0, 0, 0.7);
      white-space: nowrap;
      font-variant-numeric: tabular-nums;
    }

    .sap-bc-team-hud {
      position: absolute;
      top: 0.7rem;
      display: flex;
      gap: 0.35rem;
      padding: 0.35rem 0.42rem;
      border-radius: 999px;
      background: rgba(9, 14, 21, 0.52);
      backdrop-filter: blur(8px);
      box-shadow: 0 14px 36px rgba(0, 0, 0, 0.2);
    }

    .sap-bc-team-hud-blue {
      right: calc(50% + 2.7rem);
      flex-direction: row;
      justify-content: flex-end;
      border-bottom: 2px solid ${fs};
    }

    .sap-bc-team-hud-orange {
      left: calc(50% + 2.7rem);
      flex-direction: row;
      justify-content: flex-start;
      border-bottom: 2px solid ${bs};
    }

    .sap-bc-hud-player {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .sap-bc-hud-boost-bar {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 5.9rem;
      max-width: 8rem;
      min-height: 1.05rem;
      border-radius: 999px;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.26);
      background: rgba(0, 0, 0, 0.44);
      transition:
        border-color 0.12s ease-out,
        box-shadow 0.12s ease-out,
        transform 0.12s ease-out;
    }

    .sap-bc-hud-boost-fill {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 0%;
      border-radius: 999px;
      transition: width 0.08s ease-out;
    }

    .sap-bc-hud-boost-text {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.35rem;
      position: relative;
      z-index: 1;
      min-width: 0;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 0.14rem 0.65rem;
      color: #ffffff;
      font-size: 0.64rem;
      font-weight: 700;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.75);
      white-space: nowrap;
      font-variant-numeric: tabular-nums;
    }

    .sap-bc-hud-player-inactive {
      opacity: 0.45;
    }

    .sap-bc-player-selectable:hover .sap-bc-boost-bar,
    .sap-bc-player-selectable:hover .sap-bc-hud-boost-bar,
    .sap-bc-player-selectable:focus-visible .sap-bc-boost-bar,
    .sap-bc-player-selectable:focus-visible .sap-bc-hud-boost-bar {
      transform: translateY(-1px);
      border-color: rgba(255, 255, 255, 0.56);
      box-shadow: 0 10px 22px rgba(0, 0, 0, 0.24);
    }

    .sap-bc-player-following .sap-bc-boost-bar,
    .sap-bc-player-following .sap-bc-hud-boost-bar {
      border-color: rgba(255, 255, 255, 0.82);
      box-shadow:
        0 0 0 2px rgba(255, 255, 255, 0.22),
        0 12px 28px rgba(0, 0, 0, 0.28);
    }

    @media (max-width: 900px) {
      .sap-bc-team-hud {
        top: 3.25rem;
      }
    }

    @media (max-width: 640px) {
      .sap-bc-boost-bar {
        min-width: 6.7rem;
        max-width: 11rem;
        min-height: 1.2rem;
      }

      .sap-bc-boost-text {
        font-size: 0.64rem;
        padding-inline: 0.58rem;
      }
    }
  `, document.head.append(e);
}
function ys(e, t) {
  const n = e.players[t], a = n.frame?.boostAmount ?? 0, i = n.nextFrame?.boostAmount ?? a;
  return c.MathUtils.lerp(a, i, e.alpha);
}
function Rt(e, t, n, a) {
  if (!e || !t)
    return;
  const i = Math.max(0, Math.min(100, Math.round($t(n))));
  e.style.width = `${i}%`, t.textContent = `${i} ${a}`;
}
function Dt(e, t, n, a) {
  if (!e)
    return;
  const i = () => {
    t.player.setAttachedPlayer(n);
  };
  e.classList.add("sap-bc-player-selectable"), e.tabIndex = 0, e.setAttribute("role", "button"), e.setAttribute("aria-label", `Follow ${a}`), e.title = `Follow ${a}`, e.addEventListener("click", i), e.addEventListener("keydown", (s) => {
    s.key !== "Enter" && s.key !== " " || (s.preventDefault(), i());
  });
}
function ws(e, t, n, a, i) {
  if (e.getWorldPosition(i), i.add(t), i.project(n), i.z < -1 || i.z > 1)
    return !1;
  const s = a.clientWidth || 1, r = a.clientHeight || 1;
  return i.x = (i.x + 1) * s / 2, i.y = (1 - i.y) * r / 2, !(i.x < -80 || i.x > s + 80 || i.y < -80 || i.y > r + 80);
}
function Br(e = {}) {
  const t = e.showFloatingNames ?? !0, n = e.showFloatingBoostBars ?? !0, a = e.showTeamBoostHud ?? !0;
  let i = null, s = null, r = null, o = null, l = !1, d = "";
  const h = /* @__PURE__ */ new Map(), u = new c.Vector3(), f = new c.Vector3(0, 0, 255);
  function w(m) {
    for (const [b, p] of h.entries()) {
      const _ = b === m;
      p.floatingRoot?.classList.toggle("sap-bc-player-following", _), p.teamHudEntry?.classList.toggle("sap-bc-player-following", _), p.floatingRoot?.setAttribute("aria-pressed", _ ? "true" : "false"), p.teamHudEntry?.setAttribute("aria-pressed", _ ? "true" : "false");
    }
  }
  function g(m, b) {
    gs(), getComputedStyle(b).position === "static" && (l = !0, d = b.style.position, b.style.position = "relative"), i = document.createElement("div"), i.className = "sap-bc-overlay-root", t || n ? (s = document.createElement("div"), s.className = "sap-bc-floating-layer", i.append(s)) : s = null, a ? (r = document.createElement("div"), r.className = "sap-bc-team-hud sap-bc-team-hud-blue", o = document.createElement("div"), o.className = "sap-bc-team-hud sap-bc-team-hud-orange", i.append(r, o)) : (r = null, o = null);
    for (const p of m.replay.players) {
      let _ = null, T = null, A = null, k = null;
      s && (_ = document.createElement("div"), _.className = "sap-bc-floating-track", _.hidden = !0, (t || n) && (T = document.createElement("div"), T.className = `sap-bc-boost-bar ${p.isTeamZero ? "sap-bc-boost-bar-blue" : "sap-bc-boost-bar-orange"}`, A = document.createElement("div"), A.className = `sap-bc-boost-fill ${p.isTeamZero ? "sap-bc-boost-fill-blue" : "sap-bc-boost-fill-orange"}`, k = document.createElement("span"), k.className = "sap-bc-boost-text", T.append(A, k), _.append(T)), Dt(_, m, p.id, p.name), s.append(_));
      let E = null, C = null, O = null;
      if (a) {
        E = document.createElement("div"), E.className = "sap-bc-hud-player";
        const F = document.createElement("div");
        F.className = `sap-bc-hud-boost-bar ${p.isTeamZero ? "sap-bc-boost-bar-blue" : "sap-bc-boost-bar-orange"}`, C = document.createElement("div"), C.className = `sap-bc-hud-boost-fill ${p.isTeamZero ? "sap-bc-boost-fill-blue" : "sap-bc-boost-fill-orange"}`, O = document.createElement("span"), O.className = "sap-bc-hud-boost-text", F.append(C, O), E.append(F), Dt(E, m, p.id, p.name), (p.isTeamZero ? r : o)?.append(E);
      }
      h.set(p.id, {
        floatingRoot: _,
        floatingBoostFill: A,
        floatingBoostText: k,
        teamHudEntry: E,
        teamHudFill: C,
        teamHudText: O
      });
    }
    f.set(0, 0, 255 * (m.options.fieldScale ?? 1)), b.append(i), w(m.player.getState().attachedPlayerId);
  }
  return {
    id: "ballchasing-overlay",
    setup(m) {
      g(m, m.container);
    },
    onStateChange(m) {
      w(m.state.attachedPlayerId);
    },
    teardown(m) {
      i?.remove(), i = null, s = null, r = null, o = null, h.clear(), l && (m.container.style.position = d, l = !1);
    },
    beforeRender(m) {
      if (i)
        for (const [b, p] of m.players.entries()) {
          const _ = h.get(p.track.id);
          if (!_)
            continue;
          const T = ys(m, b);
          Rt(
            _.floatingBoostFill,
            _.floatingBoostText,
            T,
            p.track.name
          ), Rt(_.teamHudFill, _.teamHudText, T, p.track.name);
          const A = p.mesh, k = A !== null && p.interpolatedPosition !== null;
          if (_.teamHudEntry?.classList.toggle("sap-bc-hud-player-inactive", !k), !!_.floatingRoot) {
            if (!k || !ws(
              A,
              f,
              m.scene.camera,
              m.container,
              u
            )) {
              _.floatingRoot.hidden = !0;
              continue;
            }
            _.floatingRoot.hidden = !1, _.floatingRoot.style.transform = `translate(${u.x.toFixed(1)}px, ${u.y.toFixed(1)}px) translate(-50%, -100%)`;
          }
        }
    }
  };
}
function We(e) {
  e.depthTest = !1, e.depthWrite = !1, e.transparent = !0, e.polygonOffset = !0, e.polygonOffsetFactor = -2, e.polygonOffsetUnits = -2, e.forceSinglePass = !0;
}
const ue = 6, _s = 0.6;
function we(e) {
  return e * _s;
}
function Es(e) {
  return we(e.size === "big" ? 150 : 92);
}
function kn(e) {
  return we(e.size === "big" ? 155 : 46);
}
function vs(e) {
  return we(e.size === "big" ? 34 : 14);
}
function Sn(e) {
  return ue + vs(e) + kn(e);
}
function Tn(e) {
  return e.size === "big" ? Sn(e) : ue + we(1.2);
}
function Pn(e) {
  return e.size === "big" ? Sn(e) : ue + we(0.8);
}
function xs(e) {
  return e.size === "big" ? 16096779 : 16436245;
}
function Ms(e) {
  const t = Es(e), n = xs(e), a = kn(e), i = e.size === "big", s = new c.Group();
  s.position.set(e.position.x, e.position.y, e.position.z), s.renderOrder = 20, s.frustumCulled = !1;
  const r = new c.Mesh(
    new c.RingGeometry(t * 0.72, t, 24),
    new c.MeshBasicMaterial({
      color: n,
      transparent: !0,
      opacity: 0.92,
      side: c.DoubleSide,
      depthWrite: !1
    })
  );
  We(r.material), r.position.z = ue, r.renderOrder = 20, r.frustumCulled = !1, s.add(r);
  const o = new c.Mesh(
    new c.CircleGeometry(t * 0.58, 24),
    new c.MeshBasicMaterial({
      color: n,
      transparent: !0,
      opacity: 0.3,
      side: c.DoubleSide,
      depthWrite: !1
    })
  );
  We(o.material), o.position.z = ue + 0.5, o.renderOrder = 21, o.frustumCulled = !1, s.add(o);
  const l = new c.Mesh(
    new c.CircleGeometry(t * 0.42, 20),
    new c.MeshBasicMaterial({
      color: 16777215,
      transparent: !0,
      opacity: 0.22,
      side: c.DoubleSide,
      depthWrite: !1
    })
  );
  We(l.material), l.position.z = ue + 1, l.renderOrder = 22, l.frustumCulled = !1, s.add(l);
  const d = new c.Mesh(
    i ? new c.SphereGeometry(a, 32, 18) : new c.CircleGeometry(a * 0.9, 24),
    i ? new c.MeshPhongMaterial({
      color: n,
      emissive: new c.Color(n),
      emissiveIntensity: 0.6,
      shininess: 88,
      specular: new c.Color(16773826),
      transparent: !0,
      opacity: 0.92,
      depthWrite: !1
    }) : new c.MeshBasicMaterial({
      color: n,
      transparent: !0,
      opacity: 0.88,
      side: c.DoubleSide,
      blending: c.AdditiveBlending,
      depthWrite: !1
    })
  );
  d.position.z = Tn(e), d.renderOrder = 23, d.frustumCulled = !1, s.add(d);
  const h = new c.Mesh(
    i ? new c.SphereGeometry(a * 1.36, 32, 14) : new c.CircleGeometry(a * 1.35, 28),
    new c.MeshBasicMaterial({
      color: n,
      transparent: !0,
      opacity: i ? 0.2 : 0.16,
      side: c.DoubleSide,
      blending: c.AdditiveBlending,
      depthWrite: !1
    })
  );
  return h.position.z = Pn(e), h.renderOrder = 24, h.frustumCulled = !1, s.add(h), { group: s, ring: r, core: o, cooldown: l, orb: d, glow: h };
}
function ks(e, t) {
  let n = -1;
  for (let s = 0; s < e.events.length && !(e.events[s].time > t); s += 1)
    n = s;
  if (n < 0)
    return { available: !0, progress: 1 };
  const a = e.events[n];
  if (a.available)
    return { available: !0, progress: 1 };
  const i = e.events.slice(n + 1).find((s) => s.available);
  return !i || i.time <= a.time ? { available: !1, progress: 0 } : {
    available: !1,
    progress: c.MathUtils.clamp(
      (t - a.time) / (i.time - a.time),
      0,
      1
    )
  };
}
function Ss(e, t, n, a) {
  const { available: i, progress: s } = ks(t, n), r = t.size === "big", o = 0.92 + 0.08 * Math.sin(n * 6 + t.index * 0.45), l = 0.96 + 0.04 * Math.sin(n * (r ? 4.8 : 7.2) + t.index * 0.37), d = r ? Math.sin(n * 2.2 + t.index * 0.61) * 18 : 0, h = Tn(t) + d, u = Pn(t) + d;
  if (e.orb.position.z = h, e.glow.position.z = u, e.orb.rotation.z = n * (r ? 0.9 : 1.25), e.glow.rotation.z = -n * 0.45, i) {
    e.group.visible = !0, e.ring.material.opacity = 0.95, e.core.material.opacity = r ? 0.56 : 0.5, e.cooldown.visible = !1, e.ring.scale.setScalar(o), e.core.scale.setScalar(1), e.orb.visible = !0, e.glow.visible = !0, e.orb.material.opacity = r ? 0.96 : 0.9, e.glow.material.opacity = (r ? 0.2 : 0.16) + (l - 0.96), e.orb.scale.setScalar(l), e.glow.scale.setScalar(r ? 1.02 + (l - 0.96) * 2 : 1);
    return;
  }
  if (e.group.visible = !0, e.ring.material.opacity = 0.18, e.core.material.opacity = 0.07, e.ring.scale.setScalar(1), e.core.scale.setScalar(1), e.orb.visible = !1, e.glow.visible = !1, e.cooldown.visible = a, a) {
    const f = 0.3 + s * 0.7;
    e.cooldown.scale.setScalar(f), e.cooldown.material.opacity = 0.16 + s * 0.2;
  }
}
function Fr(e = {}) {
  const t = e.showCooldownProgress ?? !0;
  let n = null;
  const a = /* @__PURE__ */ new Map();
  function i(r) {
    n = new c.Group(), n.name = "boost-pad-overlay", n.renderOrder = 20, n.frustumCulled = !1;
    for (const o of r.replay.boostPads) {
      const l = Ms(o);
      n.add(l.group), a.set(o.index, l);
    }
    r.scene.replayRoot.add(n);
  }
  function s(r) {
    for (const o of r.replay.boostPads) {
      const l = a.get(o.index);
      l && Ss(l, o, r.state.currentTime, t);
    }
  }
  return {
    id: "boost-pad-overlay",
    setup(r) {
      i(r), s({
        ...r,
        state: r.player.getState()
      });
    },
    onStateChange(r) {
      s(r);
    },
    teardown() {
      n?.removeFromParent(), n = null, a.clear();
    }
  };
}
const Ts = 1.35, Ps = "#57a8ff", Cs = "#ff9c40", Is = 256, As = 160, Rs = 360, Ds = 225, Os = 260, Ls = 430, Cn = 18, Ot = 120;
function Ns(e) {
  return e ? Ps : Cs;
}
function Bs(e) {
  return e.events.filter((t) => !t.available && t.playerId);
}
function In(e, t) {
  const n = document.createElement("canvas");
  n.width = Is, n.height = As;
  const a = n.getContext("2d");
  if (!a)
    throw new Error("Unable to create boost pickup count canvas");
  a.clearRect(0, 0, n.width, n.height), a.textAlign = "center", a.textBaseline = "middle", a.lineJoin = "round", a.font = "800 124px sans-serif", a.lineWidth = 18, a.strokeStyle = "rgba(4, 10, 18, 0.88)", a.strokeText(`${e}`, n.width / 2, n.height / 2), a.fillStyle = t, a.fillText(`${e}`, n.width / 2, n.height / 2);
  const i = new c.CanvasTexture(n);
  return i.colorSpace = c.SRGBColorSpace, i.needsUpdate = !0, i;
}
function Fs(e) {
  e?.dispose();
}
function zs(e) {
  const t = new c.Group();
  t.visible = !1, t.renderOrder = 60, t.frustumCulled = !1;
  const n = In(1, e), a = new c.SpriteMaterial({
    map: n,
    transparent: !0,
    depthTest: !1,
    depthWrite: !1
  }), i = new c.Sprite(a);
  i.scale.set(Rs, Ds, 1), i.renderOrder = 62, i.frustumCulled = !1, t.add(i);
  const s = new c.MeshBasicMaterial({
    color: e,
    transparent: !0,
    opacity: 0,
    side: c.DoubleSide,
    depthTest: !1,
    depthWrite: !1,
    blending: c.AdditiveBlending
  }), r = new c.Mesh(
    new c.RingGeometry(Ot * 0.72, Ot, 36),
    s
  );
  return r.position.z = Cn, r.renderOrder = 61, r.frustumCulled = !1, t.add(r), { group: t, textMaterial: a, ringMaterial: s };
}
function Us(e, t) {
  e.currentCount !== t && (Fs(e.textMaterial.map), e.textMaterial.map = In(t, e.color), e.textMaterial.needsUpdate = !0, e.currentCount = t);
}
function Gs(e) {
  const t = /* @__PURE__ */ new Map();
  for (const i of e.replay.players)
    t.set(i.id, i);
  const n = [];
  for (const i of e.replay.boostPads)
    for (const s of Bs(i))
      n.push({ pad: i, event: s });
  n.sort((i, s) => i.event.time !== s.event.time ? i.event.time - s.event.time : i.event.frame !== s.event.frame ? i.event.frame - s.event.frame : i.pad.index - s.pad.index);
  const a = [];
  for (const { pad: i, event: s } of n) {
    if (!s.playerId)
      continue;
    const r = t.get(s.playerId);
    if (!r)
      continue;
    const o = Ns(r.isTeamZero), { group: l, textMaterial: d, ringMaterial: h } = zs(o);
    l.position.copy(i.position), e.scene.replayRoot.add(l), a.push({
      time: s.time,
      pad: i,
      event: s,
      player: r,
      color: o,
      currentCount: 1,
      position: new c.Vector3(i.position.x, i.position.y, i.position.z),
      size: i.size,
      group: l,
      textMaterial: d,
      ringMaterial: h
    });
  }
  return a;
}
function Vs(e, t, n) {
  const a = c.MathUtils.clamp(t / n, 0, 1), i = 1 - Math.pow(1 - a, 3), s = a * a, r = e.size === "big" ? Ls : Os, o = e.size === "big" ? 360 : 280, l = 1 + Math.sin(a * Math.PI) * 0.22;
  e.group.visible = !0, e.group.position.set(
    e.position.x,
    e.position.y,
    e.position.z + r + i * o
  ), e.group.scale.setScalar(l), e.textMaterial.opacity = Math.max(0, 1 - s), e.ringMaterial.opacity = Math.max(0, 0.48 * (1 - a));
  const d = e.group.children[1];
  if (d) {
    const h = 0.75 + i * (e.size === "big" ? 2.8 : 1.85);
    d.scale.setScalar(h), d.position.z = Cn - r - i * o;
  }
}
function zr(e = {}) {
  const t = Math.max(0.1, e.durationSeconds ?? Ts);
  let n = [];
  function a(s) {
    return e.includePickup?.({
      pad: s.pad,
      event: s.event,
      player: s.player
    }) ?? !0;
  }
  function i() {
    for (const s of n)
      s.group.visible = !1;
  }
  return {
    id: "boost-pickup-animation",
    setup(s) {
      n = Gs(s);
    },
    beforeRender(s) {
      if (!s.state.boostPickupAnimationEnabled) {
        i();
        return;
      }
      const r = s.currentTime - t, o = /* @__PURE__ */ new Map();
      for (const l of n) {
        if (l.time > s.currentTime) {
          l.group.visible = !1;
          continue;
        }
        if (!a(l)) {
          l.group.visible = !1;
          continue;
        }
        const d = (o.get(l.player.id) ?? 0) + 1;
        if (o.set(l.player.id, d), l.time < r) {
          l.group.visible = !1;
          continue;
        }
        Us(l, d), Vs(l, s.currentTime - l.time, t);
      }
    },
    teardown() {
      for (const s of n)
        s.group.removeFromParent(), s.group.traverse((r) => {
          (r instanceof c.Mesh || r instanceof c.Sprite) && r.geometry?.dispose();
        }), s.textMaterial.map?.dispose(), s.textMaterial.dispose(), s.ringMaterial.dispose();
      n = [];
    }
  };
}
const js = 60, Hs = ["video/webm;codecs=vp9", "video/webm;codecs=vp8", "video/webm"];
function Ws(e) {
  if (e && MediaRecorder.isTypeSupported(e))
    return e;
  for (const t of Hs)
    if (MediaRecorder.isTypeSupported(t))
      return t;
  return "";
}
function $s(e) {
  return e instanceof Error ? e.message : String(e);
}
function Ur(e = {}) {
  let t = null, n = null, a = [], i = null, s = 0, r = 0, o = "", l = 0, d = null, h = null, u = null, f = null, w = !1, g = null;
  const m = /* @__PURE__ */ new Set();
  function b() {
    return {
      state: n ? n.state === "recording" ? "recording" : "stopping" : d ? "error" : i ? "ready" : "idle",
      elapsedSeconds: r,
      mimeType: o,
      sizeBytes: l,
      error: d
    };
  }
  function p() {
    const E = b();
    e.onStatusChange?.(E);
    for (const C of m)
      C(E);
  }
  function _() {
    if (!t)
      throw new Error("Canvas recorder plugin is not installed");
    return t;
  }
  function T(E) {
    n = null, f = null, w = !1, i = E, l = E?.size ?? 0, g && t && t.player.setState({
      currentTime: g.currentTime,
      speed: g.speed,
      playing: g.playing
    }), g = null, E && e.onComplete?.(E), p(), u?.(E), u = null, h = null;
  }
  function A(E) {
    d = $s(E), n = null, f = null, w = !1, g = null, p(), u?.(null), u = null, h = null;
  }
  const k = {
    id: "canvas-recorder",
    setup(E) {
      t = E;
    },
    beforeRender(E) {
      n?.state === "recording" && (r = (performance.now() - s) / 1e3, p()), n?.state === "recording" && f !== null && E.currentTime >= f && k.stop();
    },
    onStateChange(E) {
      w && n?.state === "recording" && !E.state.playing && r > 0 && k.stop();
    },
    teardown() {
      n?.state === "recording" && n.stop(), t = null, n = null, f = null, w = !1, g = null, u?.(null), u = null, h = null, m.clear();
    },
    start(E = {}) {
      const C = _();
      if (n?.state === "recording")
        throw new Error("Canvas recording is already in progress");
      if (typeof MediaRecorder > "u")
        throw new Error("MediaRecorder is not available in this browser");
      const O = C.scene.renderer.domElement;
      if (!O.captureStream)
        throw new Error("Canvas captureStream is not available in this browser");
      d = null, i = null, a = [], l = 0, r = 0, s = performance.now(), o = Ws(E.mimeType ?? e.mimeType);
      const F = Math.max(1, E.fps ?? e.fps ?? js), x = O.captureStream(F);
      n = new MediaRecorder(x, {
        mimeType: o,
        videoBitsPerSecond: E.videoBitsPerSecond ?? e.videoBitsPerSecond
      }), h = new Promise((S) => {
        u = S;
      }), n.addEventListener("dataavailable", (S) => {
        S.data.size > 0 && (a.push(S.data), l += S.data.size, p());
      }), n.addEventListener(
        "stop",
        () => {
          x.getTracks().forEach((S) => S.stop()), T(new Blob(a, { type: o || "video/webm" }));
        },
        { once: !0 }
      ), n.addEventListener(
        "error",
        (S) => {
          x.getTracks().forEach((N) => N.stop()), A(S.error ?? S);
        },
        { once: !0 }
      ), n.start(1e3), p();
    },
    stop() {
      if (!n)
        return Promise.resolve(i);
      if (n.state === "inactive")
        return h ?? Promise.resolve(i);
      const E = h ?? new Promise((C) => {
        u = C;
      });
      return n.stop(), p(), E;
    },
    clear() {
      if (n?.state === "recording")
        throw new Error("Cannot clear a recording while recording is in progress");
      i = null, a = [], l = 0, r = 0, d = null, p();
    },
    getRecording() {
      return i;
    },
    getStatus() {
      return b();
    },
    subscribe(E) {
      return m.add(E), E(b()), () => {
        m.delete(E);
      };
    },
    recordRange(E = {}) {
      const C = _(), O = C.player.getState();
      (E.restorePlaybackState ?? !0) && (g = O);
      const F = E.playbackRate ?? O.speed, x = E.startTime ?? O.currentTime;
      f = E.endTime ?? O.duration, w = !0, C.player.setState({
        currentTime: x,
        speed: F,
        playing: !1
      }), k.start(E);
      const S = h;
      return C.player.play(), (S ?? Promise.resolve(null)).then((N) => {
        if (!N)
          throw new Error("Recording stopped without producing a video");
        return N;
      });
    },
    recordFullReplay(E = {}) {
      return k.recordRange({
        ...E,
        startTime: E.startTime ?? 0,
        endTime: E.endTime ?? _().replay.duration
      });
    }
  };
  return k;
}
const Lt = "subtr-actor-timeline-overlay-styles";
function Ks() {
  if (document.getElementById(Lt))
    return;
  const e = document.createElement("style");
  e.id = Lt, e.textContent = `
    .sap-tl-root {
      position: absolute;
      inset: 0;
      z-index: 4;
      pointer-events: none;
      overflow: hidden;
      font-family: "IBM Plex Sans", "Segoe UI", Roboto, sans-serif;
    }

    .sap-tl-shell {
      --sap-tl-thumb-size: 1.35rem;
      --sap-tl-track-height: 0.6rem;
      --sap-tl-gutter-width: 2.25rem;
      --sap-tl-gutter-gap: 0.55rem;
      --sap-tl-marker-offset: 1.05rem;
      position: absolute;
      left: 0.8rem;
      right: 0.8rem;
      bottom: 0.9rem;
      padding: 0.75rem 0.9rem 0.9rem;
      border: 1px solid rgba(180, 205, 226, 0.18);
      border-radius: 1.05rem;
      background:
        linear-gradient(180deg, rgba(13, 20, 28, 0.92), rgba(7, 12, 18, 0.96));
      box-shadow: 0 18px 42px rgba(0, 0, 0, 0.28);
      backdrop-filter: blur(12px);
      pointer-events: auto;
    }

    .sap-tl-shell::before {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background:
        linear-gradient(90deg, rgba(60, 134, 255, 0.18), transparent 28%, transparent 72%, rgba(242, 138, 37, 0.16));
      pointer-events: none;
    }

    .sap-tl-topline {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-left: calc(var(--sap-tl-gutter-width) + var(--sap-tl-gutter-gap));
      margin-bottom: 0.55rem;
      color: #f5fbff;
      font-size: 0.82rem;
      font-weight: 600;
      font-variant-numeric: tabular-nums;
      gap: 0.85rem;
    }

    .sap-tl-primary {
      display: flex;
      align-items: center;
      gap: 0.65rem;
      min-width: 0;
    }

    .sap-tl-toggle {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.4rem;
      min-width: 4.9rem;
      padding: 0.42rem 0.72rem;
      border: 1px solid rgba(184, 214, 236, 0.24);
      border-radius: 999px;
      background: rgba(18, 30, 42, 0.92);
      color: #f5fbff;
      font: inherit;
      font-size: 0.76rem;
      font-weight: 700;
      letter-spacing: 0.02em;
      cursor: pointer;
      transition:
        transform 140ms ease,
        border-color 140ms ease,
        background 140ms ease;
    }

    .sap-tl-track-toggle {
      width: 2.15rem;
      min-width: 2.15rem;
      min-height: 2.15rem;
      padding: 0;
      gap: 0;
    }

    .sap-tl-toggle-label {
      display: none;
      min-width: 0;
    }

    .sap-tl-toggle:hover {
      border-color: rgba(184, 214, 236, 0.4);
      background: rgba(28, 45, 61, 0.96);
      transform: translateY(-1px);
    }

    .sap-tl-toggle:focus-visible {
      outline: 2px solid rgba(123, 180, 255, 0.9);
      outline-offset: 2px;
    }

    .sap-tl-toggle-icon {
      width: 0.85rem;
      text-align: center;
      font-size: 0.7rem;
      line-height: 1;
    }

    .sap-tl-current {
      color: #f5fbff;
    }

    .sap-tl-remaining {
      color: #b8c9d9;
    }

    .sap-tl-track-wrap {
      position: relative;
      display: grid;
      grid-template-columns: var(--sap-tl-gutter-width) minmax(0, 1fr);
      column-gap: var(--sap-tl-gutter-gap);
      row-gap: 0;
      align-items: center;
    }

    .sap-tl-ranges {
      grid-column: 1 / -1;
      display: flex;
      flex-direction: column;
      gap: 0.34rem;
      margin-bottom: 0;
    }

    .sap-tl-event-lanes {
      grid-column: 1 / -1;
      display: flex;
      flex-direction: column;
      gap: 0.34rem;
      margin-bottom: 0;
    }

    .sap-tl-event-lane {
      position: relative;
      display: grid;
      grid-template-columns: var(--sap-tl-gutter-width) minmax(0, 1fr);
      column-gap: var(--sap-tl-gutter-gap);
      align-items: center;
    }

    .sap-tl-event-lane-track {
      position: relative;
      grid-column: 2;
      height: 1.05rem;
      margin: 0 calc(var(--sap-tl-thumb-size) / 2);
      box-sizing: border-box;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.045);
      box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.07);
    }

    .sap-tl-event-lane-label {
      display: block;
      max-width: 100%;
      padding: 0.08rem 0.38rem;
      border: 1px solid rgba(184, 214, 236, 0.18);
      border-radius: 999px;
      background: rgba(10, 16, 23, 0.82);
      color: #c8d7e4;
      font-size: 0.54rem;
      font-weight: 800;
      letter-spacing: 0.04em;
      line-height: 1.2;
      text-transform: uppercase;
      backdrop-filter: blur(6px);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .sap-tl-range-lane {
      position: relative;
      display: grid;
      grid-template-columns: var(--sap-tl-gutter-width) minmax(0, 1fr);
      column-gap: var(--sap-tl-gutter-gap);
      align-items: center;
    }

    .sap-tl-range-lane-track {
      position: relative;
      grid-column: 2;
      height: var(--sap-tl-track-height);
      margin: 0 calc(var(--sap-tl-thumb-size) / 2);
      box-sizing: border-box;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.06);
      box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
      overflow: hidden;
    }

    .sap-tl-range-lane-label {
      display: block;
      max-width: 100%;
      padding: 0.08rem 0.38rem;
      border: 1px solid rgba(184, 214, 236, 0.18);
      border-radius: 999px;
      background: rgba(10, 16, 23, 0.82);
      color: #c8d7e4;
      font-size: 0.54rem;
      font-weight: 800;
      letter-spacing: 0.04em;
      line-height: 1.2;
      text-transform: uppercase;
      backdrop-filter: blur(6px);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .sap-tl-event-lane[data-label]::after,
    .sap-tl-range-lane[data-label]::after {
      content: attr(data-label);
      position: absolute;
      left: calc(var(--sap-tl-gutter-width) + var(--sap-tl-gutter-gap) + calc(var(--sap-tl-thumb-size) / 2));
      bottom: calc(100% + 0.28rem);
      z-index: 8;
      max-width: min(22rem, calc(100% - var(--sap-tl-gutter-width) - var(--sap-tl-gutter-gap)));
      padding: 0.28rem 0.48rem;
      border: 1px solid rgba(184, 214, 236, 0.24);
      border-radius: 0.4rem;
      background: rgba(7, 12, 18, 0.96);
      color: #f5fbff;
      box-shadow: 0 10px 24px rgba(0, 0, 0, 0.34);
      font-size: 0.68rem;
      font-weight: 800;
      line-height: 1.2;
      opacity: 0;
      overflow: hidden;
      pointer-events: none;
      text-overflow: ellipsis;
      transform: translateY(0.14rem);
      transition:
        opacity 120ms ease,
        transform 120ms ease;
      white-space: nowrap;
    }

    .sap-tl-event-lane[data-label]:hover::after,
    .sap-tl-event-lane[data-label]:focus-within::after,
    .sap-tl-range-lane[data-label]:hover::after,
    .sap-tl-range-lane[data-label]:focus-within::after {
      opacity: 1;
      transform: translateY(0);
    }

    .sap-tl-range-segment {
      position: absolute;
      top: 0;
      bottom: 0;
      min-width: 2px;
      border-radius: 999px;
      opacity: 0.62;
      transition:
        opacity 120ms ease,
        filter 120ms ease,
        transform 120ms ease;
    }

    .sap-tl-range-segment[data-active="true"] {
      opacity: 0.92;
      filter: brightness(1.12);
      transform: scaleY(1.06);
    }

    .sap-tl-range-playhead,
    .sap-tl-event-playhead {
      position: absolute;
      top: -0.14rem;
      bottom: -0.14rem;
      width: 1px;
      transform: translateX(-50%);
      border-radius: 999px;
      background: rgba(245, 251, 255, 0.74);
      box-shadow: 0 0 0 1px rgba(6, 12, 18, 0.45);
      opacity: 0.9;
      pointer-events: none;
      z-index: 3;
    }

    .sap-tl-event-playhead {
      top: -0.08rem;
      bottom: -0.08rem;
    }

    .sap-tl-track-rail {
      position: relative;
      grid-column: 2;
      min-width: 0;
      min-height: var(--sap-tl-thumb-size);
      margin-top: 0.58rem;
    }

    .sap-tl-main-rail {
      position: absolute;
      left: calc(var(--sap-tl-thumb-size) / 2);
      right: calc(var(--sap-tl-thumb-size) / 2);
      top: 50%;
      height: var(--sap-tl-track-height);
      border-radius: 999px;
      border: 1px solid rgba(255, 255, 255, 0.12);
      background:
        linear-gradient(90deg, rgba(60, 134, 255, 0.42), rgba(103, 179, 255, 0.58) 45%, rgba(242, 138, 37, 0.58));
      box-shadow: inset 0 0 0 999px rgba(5, 10, 15, 0.4);
      transform: translateY(-50%);
      pointer-events: none;
      z-index: 0;
    }

    .sap-tl-range {
      position: relative;
      z-index: 2;
      width: 100%;
      height: var(--sap-tl-thumb-size);
      margin: 0;
      appearance: none;
      background: transparent;
      cursor: pointer;
    }

    .sap-tl-range:focus {
      outline: none;
    }

    .sap-tl-range::-webkit-slider-runnable-track {
      height: var(--sap-tl-track-height);
      border-radius: 999px;
      border: 0;
      background: transparent;
      box-shadow: none;
    }

    .sap-tl-range::-moz-range-track {
      height: var(--sap-tl-track-height);
      border-radius: 999px;
      border: 0;
      background: transparent;
      box-shadow: none;
    }

    .sap-tl-range::-webkit-slider-thumb {
      appearance: none;
      margin-top: -0.38rem;
      width: var(--sap-tl-thumb-size);
      height: var(--sap-tl-thumb-size);
      border: 0;
      border-radius: 50%;
      background:
        radial-gradient(circle at 35% 35%, #ffffff 0%, #d8ebff 28%, #7bb4ff 55%, #27456d 100%);
      box-shadow: 0 8px 22px rgba(0, 0, 0, 0.34);
    }

    .sap-tl-range::-moz-range-thumb {
      width: var(--sap-tl-thumb-size);
      height: var(--sap-tl-thumb-size);
      border: 0;
      border-radius: 50%;
      background:
        radial-gradient(circle at 35% 35%, #ffffff 0%, #d8ebff 28%, #7bb4ff 55%, #27456d 100%);
      box-shadow: 0 8px 22px rgba(0, 0, 0, 0.34);
    }

    .sap-tl-shell[data-scrubbing="true"] .sap-tl-range::-webkit-slider-thumb,
    .sap-tl-shell[data-scrubbing="true"] .sap-tl-range::-moz-range-thumb {
      background:
        radial-gradient(circle at 35% 35%, #ffffff 0%, #ffe5c5 32%, #ffad47 58%, #7b3d00 100%);
      transform: scale(1.05);
    }

    .sap-tl-markers {
      position: absolute;
      left: calc(var(--sap-tl-thumb-size) / 2);
      right: calc(var(--sap-tl-thumb-size) / 2);
      top: calc(-1 * var(--sap-tl-marker-offset));
      height: 1rem;
      pointer-events: none;
      z-index: 1;
    }

    .sap-tl-event-lane .sap-tl-markers {
      position: relative;
      left: auto;
      right: auto;
      top: auto;
      height: 100%;
    }

    .sap-tl-event-lane .sap-tl-marker {
      top: 50%;
      transform: translate(-50%, -50%);
    }

    .sap-tl-event-lane .sap-tl-marker::before {
      display: none;
    }

    .sap-tl-event-lane .sap-tl-marker[data-active="true"] {
      transform: translate(-50%, -50%) scale(1.16);
    }

    .sap-tl-marker {
      position: absolute;
      top: 0;
      transform: translateX(-50%);
      width: 0.95rem;
      height: 0.95rem;
      padding: 0;
      border: 0;
      border-radius: 999px;
      background: rgba(12, 18, 24, 0.96);
      color: #f5fbff;
      font-size: 0.52rem;
      font-weight: 800;
      line-height: 1;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3);
      pointer-events: auto;
      cursor: pointer;
    }

    .sap-tl-marker::before {
      content: "";
      position: absolute;
      left: 50%;
      top: 0.85rem;
      width: 2px;
      height: 0.55rem;
      transform: translateX(-50%);
      background: currentColor;
      opacity: 0.7;
    }

    .sap-tl-marker:hover {
      filter: brightness(1.08);
    }

    .sap-tl-marker[data-passed="true"] {
      opacity: 0.9;
    }

    .sap-tl-marker[data-active="true"] {
      transform: translateX(-50%) scale(1.16);
      opacity: 1;
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.38);
    }

    @media (max-width: 720px) {
      .sap-tl-shell {
        --sap-tl-gutter-width: 4rem;
        --sap-tl-gutter-gap: 0.55rem;
        bottom: 0.6rem;
        left: 0.5rem;
        right: 0.5rem;
        padding: 0.65rem 0.7rem 0.75rem;
      }

      .sap-tl-topline {
        font-size: 0.72rem;
      }
    }
  `, document.head.append(e);
}
const Ys = /* @__PURE__ */ new Set(["goal", "save", "bookmark"]), Zs = 0.2, $e = 60, Xs = 2, qs = 4, Qs = 0.01, Nt = 0.01;
function Xe(e) {
  if (!Number.isFinite(e))
    return "--:--.--";
  const t = Math.max(0, e), n = Math.floor(t / 60), a = Math.floor(t % 60), i = Math.floor((t - Math.floor(t)) * 100);
  return `${n}:${String(a).padStart(2, "0")}.${String(i).padStart(2, "0")}`;
}
function Bt(e) {
  switch (e.kind) {
    case "goal":
      return 5;
    case "demo":
      return 4;
    case "save":
      return 3;
    case "assist":
      return 2;
    case "shot":
    case "bookmark":
      return 1;
    default:
      return 0;
  }
}
function Js(e) {
  switch (e.kind) {
    case "goal":
    case "goal-context":
    case "goal-tag":
      return qs;
    default:
      return Xs;
  }
}
function er(e) {
  return e.seekTime !== void 0 && Number.isFinite(e.seekTime) ? Math.max(0, e.seekTime) : Number.isFinite(e.time) ? Math.max(0, e.time - Js(e)) : 0;
}
function tr(e) {
  if (e.color)
    return e.color;
  if (e.isTeamZero === !0)
    return "#3b82f6";
  if (e.isTeamZero === !1)
    return "#f59e0b";
  switch (e.kind) {
    case "goal":
      return "#f5f7fa";
    case "demo":
      return "#ef4444";
    case "save":
      return "#34d399";
    case "assist":
      return "#c084fc";
    case "shot":
      return "#60a5fa";
    case "bookmark":
      return "#facc15";
    default:
      return "#d1d9e0";
  }
}
function nr(e) {
  if (e.events.length > 1)
    return `${e.events.length}`;
  const t = e.events[0];
  return t ? t.shortLabel && t.shortLabel.trim() !== "" ? t.shortLabel.slice(0, 3).toUpperCase() : t.kind.slice(0, 1).toUpperCase() : "";
}
function qe(e) {
  return [...e].sort((t, n) => {
    const a = Bt(n) - Bt(t);
    return a !== 0 ? a : t.time - n.time;
  });
}
function ar(e) {
  return e.events.map((t) => `${Xe(t.time)} ${t.label ?? t.kind}`).join(`
`);
}
function An(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) {
    const a = n.frame !== void 0 ? `frame:${n.frame}` : `time:${n.time.toFixed(2)}`, i = t.get(a);
    if (i) {
      i.events.push(n);
      continue;
    }
    t.set(a, {
      key: a,
      time: n.time,
      events: [n]
    });
  }
  return [...t.values()].map((n) => ({
    ...n,
    events: qe(n.events)
  })).sort((n, a) => n.time - a.time);
}
function Ft(e) {
  if (e.length <= $e)
    return e;
  const t = e[0]?.time ?? 0, a = (e[e.length - 1]?.time ?? t) - t;
  if (a <= 0)
    return [
      {
        key: "compact:0",
        time: t,
        events: qe(e.flatMap((r) => r.events))
      }
    ];
  const i = a / $e, s = /* @__PURE__ */ new Map();
  for (const r of e) {
    const o = Math.min(
      $e - 1,
      Math.max(0, Math.floor((r.time - t) / i))
    ), l = s.get(o);
    if (l) {
      l.events.push(...r.events);
      continue;
    }
    s.set(o, {
      key: `compact:${o}`,
      time: r.time,
      events: [...r.events]
    });
  }
  return [...s.values()].map((r) => ({
    ...r,
    events: qe(r.events)
  })).sort((r, o) => r.time - o.time);
}
function Rn(e, t) {
  return e ? typeof e == "function" ? e(t) : e : [];
}
function ir(e, t) {
  const n = [];
  for (const a of e) {
    const i = Rn(a.source, t);
    i.length !== 0 && n.push({
      key: a.key,
      label: a.label,
      buckets: An(i)
    });
  }
  return n;
}
function sr(e, t) {
  return e ? typeof e == "function" ? e(t) : e : [];
}
function rr(e, t) {
  const n = /* @__PURE__ */ new Set(), a = [];
  for (const i of e)
    for (const s of sr(i, t)) {
      const r = s.id;
      if (r !== void 0) {
        if (n.has(r))
          continue;
        n.add(r);
      }
      a.push(s);
    }
  return a;
}
function or(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e) {
    const a = n.lane ?? "default", i = n.laneLabel ?? n.lane ?? "", s = t.get(a);
    if (s) {
      s.ranges.push(n);
      continue;
    }
    t.set(a, {
      key: a,
      label: i,
      ranges: [n]
    });
  }
  return [...t.values()].map((n) => ({
    ...n,
    ranges: [...n.ranges].sort((a, i) => a.startTime - i.startTime)
  }));
}
function lr(e) {
  return e.color ? e.color : e.isTeamZero === !0 ? "#3b82f6" : e.isTeamZero === !1 ? "#f59e0b" : "#d1d9e0";
}
function cr(e, t) {
  if (e.replayEvents)
    return Rn(e.replayEvents, t);
  if (e.includeReplayEvents === !1)
    return [];
  const n = new Set(e.replayEventKinds ?? Ys);
  return t.replay.timelineEvents.filter((a) => n.has(a.kind));
}
function dr(e, t) {
  const n = t.player.projectReplayTimeToTimeline(er(e));
  if (!n.hiddenBySkip)
    return n.seekTime;
  const a = Math.min(
    t.player.getTimelineDuration(),
    n.timelineTime + Qs
  );
  return t.player.projectTimelineTimeToReplay(a);
}
function ve(e, t) {
  return `${e / Math.max(t, 1e-4) * 100}%`;
}
function hr(e, t, n) {
  let a = e.timelineTime, i = t.timelineTime;
  return i <= a && (e.hiddenBySkip || t.hiddenBySkip) && (a >= n ? (a = Math.max(0, n - Nt), i = n) : i = Math.min(
    n,
    a + Nt
  )), { startTimelineTime: a, endTimelineTime: i };
}
function Gr(e = {}) {
  const t = e.pauseWhileScrubbing ?? !0;
  let n = 0;
  const a = e.events ? [
    {
      key: "events:initial",
      label: e.eventsLabel ?? "Events",
      source: e.events
    }
  ] : [], i = e.ranges ? [e.ranges] : [];
  let s = null, r = null, o = null, l = null, d = null, h = null, u = null, f = null, w = null, g = null, m = null, b = null, p = !1, _ = "", T = !1, A = !1, k = null, E = [], C = [], O = null;
  const F = /* @__PURE__ */ new Map(), x = [], S = [], N = [], V = [];
  let U = 0, $ = /* @__PURE__ */ new Set();
  function q() {
    k && (Le(k), J({
      ...k,
      state: k.player.getState()
    }));
  }
  function Z() {
    k && (Ne(k), J({
      ...k,
      state: k.player.getState()
    }));
  }
  function J(y) {
    if (!l || !d || !h || !u || !f || !w || !r)
      return;
    const M = y.player.getTimelineCurrentTime(), I = y.player.getTimelineDuration(), P = [
      I.toFixed(4),
      y.state.skipKickoffsEnabled ? "1" : "0",
      y.state.skipPostGoalTransitionsEnabled ? "1" : "0"
    ].join(":");
    O !== P && (Le(y), Ne(y), O = P), l.min = "0", l.max = `${I}`, l.step = "0.01", l.value = `${Math.min(M, I)}`, d.dataset.playing = y.state.playing ? "true" : "false", d.setAttribute("aria-label", y.state.playing ? "Pause replay" : "Play replay"), d.title = y.state.playing ? "Pause replay" : "Play replay", h.textContent = y.state.playing ? "||" : ">", u.textContent = y.state.playing ? "Pause" : "Play", f.textContent = Xe(M), w.textContent = `-${Xe(I - M)}`, r.dataset.scrubbing = T ? "true" : "false", Gn(M);
    for (const v of S) {
      const D = Math.max(0, v.startTimelineTime), L = Math.min(I, v.endTimelineTime);
      if (Math.max(0, L - D) <= 1e-4) {
        v.element.hidden = !0;
        continue;
      }
      v.element.hidden = !1, v.element.dataset.active = M >= D && M <= L ? "true" : "false";
    }
    const B = ve(Math.min(M, I), I);
    for (const v of V)
      v.element.style.left = B;
    for (const v of N)
      v.element.style.left = B;
  }
  function Oe(y) {
    let M = 0, I = x.length;
    for (; M < I; ) {
      const P = Math.floor((M + I) / 2);
      x[P].timelineTime <= y ? M = P + 1 : I = P;
    }
    return M;
  }
  function Un(y) {
    let M = 0, I = x.length;
    for (; M < I; ) {
      const P = Math.floor((M + I) / 2);
      x[P].timelineTime < y ? M = P + 1 : I = P;
    }
    return M;
  }
  function ct(y, M) {
    y.active !== M && (y.active = M, y.element.dataset.active = M ? "true" : "false");
  }
  function dt(y, M) {
    y.passed !== M && (y.passed = M, y.element.dataset.passed = M ? "true" : "false");
  }
  function Gn(y) {
    if (x.length === 0)
      return;
    const M = Oe(y);
    if (M > U)
      for (let v = U; v < M; v += 1)
        dt(x[v], !0);
    else if (M < U)
      for (let v = M; v < U; v += 1)
        dt(x[v], !1);
    U = M;
    const I = Un(y - Zs), P = M, B = /* @__PURE__ */ new Set();
    for (let v = I; v < P; v += 1) {
      const D = x[v];
      B.add(D), ct(D, !0);
    }
    for (const v of $)
      B.has(v) || ct(v, !1);
    $ = B;
  }
  function ht(y, M, I) {
    const P = y.events[0];
    if (!P)
      return null;
    const B = M.player.projectReplayTimeToTimeline(y.time), v = document.createElement("button");
    v.type = "button", v.className = "sap-tl-marker", v.style.left = ve(B.timelineTime, I), v.style.color = tr(P), v.title = ar(y), v.textContent = nr(y), v.addEventListener("click", () => {
      M.player.seek(dr(P, M));
    }), v.dataset.active = "false", v.dataset.passed = "false";
    const D = {
      element: v,
      timelineTime: B.timelineTime,
      active: !1,
      passed: !1
    };
    return F.set(y.key, D), x.push(D), v;
  }
  function Le(y) {
    if (!m || !g)
      return;
    m.replaceChildren(), g.replaceChildren(), F.clear(), x.splice(0, x.length), U = 0, $ = /* @__PURE__ */ new Set(), V.splice(0, V.length);
    const M = cr(e, y);
    E = [], M.length > 0 && E.push({
      key: "replay",
      label: e.replayEventsLabel ?? "Replay",
      buckets: An(M)
    }), E.push(...ir(a, y));
    const I = Math.max(y.player.getTimelineDuration(), 1e-4), P = E[0];
    if (P?.key === "replay")
      for (const v of Ft(P.buckets)) {
        const D = ht(
          { ...v, key: `${P.key}:${v.key}` },
          y,
          I
        );
        D && m.append(D);
      }
    const B = E.filter((v) => v.key !== "replay");
    g.hidden = B.length === 0;
    for (const v of B) {
      const D = document.createElement("div");
      D.className = "sap-tl-event-lane", D.dataset.label = v.label;
      const L = document.createElement("span");
      L.className = "sap-tl-event-lane-label", L.textContent = v.label, L.setAttribute("aria-label", v.label), D.append(L);
      const j = document.createElement("div");
      j.className = "sap-tl-event-lane-track";
      const fe = document.createElement("div");
      fe.className = "sap-tl-markers";
      for (const be of Ft(v.buckets)) {
        const H = ht(
          { ...be, key: `${v.key}:${be.key}` },
          y,
          I
        );
        H && fe.append(H);
      }
      const ee = document.createElement("div");
      ee.className = "sap-tl-event-playhead", j.append(fe, ee), V.push({ element: ee }), D.append(j), g.append(D);
    }
    x.sort((v, D) => v.timelineTime - D.timelineTime);
  }
  function Ne(y) {
    if (!o)
      return;
    o.replaceChildren(), S.splice(0, S.length), N.splice(0, N.length);
    const M = rr(i, y).filter(
      (P) => Number.isFinite(P.startTime) && Number.isFinite(P.endTime) && P.endTime > P.startTime
    );
    C = or(M);
    const I = Math.max(y.player.getTimelineDuration(), 1e-4);
    if (C.length === 0) {
      o.hidden = !0;
      return;
    }
    o.hidden = !1;
    for (const P of C) {
      const B = document.createElement("div");
      B.className = "sap-tl-range-lane";
      const v = document.createElement("div");
      if (v.className = "sap-tl-range-lane-track", P.label) {
        B.dataset.label = P.label;
        const L = document.createElement("span");
        L.className = "sap-tl-range-lane-label", L.textContent = P.label, L.setAttribute("aria-label", P.label), B.append(L);
      }
      for (const L of P.ranges) {
        const j = y.player.projectReplayTimeToTimeline(L.startTime), fe = y.player.projectReplayTimeToTimeline(L.endTime), { startTimelineTime: ee, endTimelineTime: be } = hr(
          j,
          fe,
          I
        ), H = document.createElement("div");
        H.className = "sap-tl-range-segment", L.className && H.classList.add(L.className), H.style.background = lr(L), H.title = L.label ?? P.label, H.dataset.active = "false", H.style.left = ve(ee, I), H.style.width = ve(
          Math.max(0, be - ee),
          I
        ), v.append(H), S.push({
          range: L,
          element: H,
          startTimelineTime: ee,
          endTimelineTime: be
        });
      }
      const D = document.createElement("div");
      D.className = "sap-tl-range-playhead", v.append(D), N.push({ element: D }), B.append(v), o.append(B);
    }
  }
  function ut() {
    T && (T = !1, r?.setAttribute("data-scrubbing", "false"), A && k?.player.play(), A = !1);
  }
  function Vn() {
    if (T || (T = !0, r?.setAttribute("data-scrubbing", "true"), !t))
      return;
    const y = k?.player;
    y && (A = y.getState().playing, A && y.pause());
  }
  return {
    id: "timeline-overlay",
    addEventSource(y, M = {}) {
      return a.push({
        key: M.id ?? `events:${n++}`,
        label: M.label ?? "Events",
        source: y
      }), q(), () => {
        this.removeEventSource(y);
      };
    },
    removeEventSource(y) {
      const M = a.findIndex((I) => I.source === y);
      return M < 0 ? !1 : (a.splice(M, 1), q(), !0);
    },
    refreshEvents() {
      q();
    },
    addRangeSource(y) {
      return i.push(y), Z(), () => {
        this.removeRangeSource(y);
      };
    },
    removeRangeSource(y) {
      const M = i.indexOf(y);
      return M < 0 ? !1 : (i.splice(M, 1), Z(), !0);
    },
    refreshRanges() {
      Z();
    },
    setup(y) {
      k = y, Ks(), getComputedStyle(y.container).position === "static" && (p = !0, _ = y.container.style.position, y.container.style.position = "relative"), s = document.createElement("div"), s.className = "sap-tl-root", r = document.createElement("div"), r.className = "sap-tl-shell", r.dataset.scrubbing = "false";
      const M = document.createElement("div");
      M.className = "sap-tl-topline";
      const I = document.createElement("div");
      I.className = "sap-tl-primary", d = document.createElement("button"), d.type = "button", d.className = "sap-tl-toggle sap-tl-track-toggle", h = document.createElement("span"), h.className = "sap-tl-toggle-icon", h.setAttribute("aria-hidden", "true"), h.textContent = ">", u = document.createElement("span"), u.className = "sap-tl-toggle-label", u.textContent = "Play", d.append(h, u), d.addEventListener("click", () => {
        y.player.togglePlayback();
      }), f = document.createElement("span"), f.className = "sap-tl-current", f.textContent = "0:00.00", w = document.createElement("span"), w.className = "sap-tl-remaining", w.textContent = "-0:00.00", I.append(f), M.append(I, w);
      const P = document.createElement("div");
      P.className = "sap-tl-track-wrap", o = document.createElement("div"), o.className = "sap-tl-ranges", o.hidden = !0, g = document.createElement("div"), g.className = "sap-tl-event-lanes", g.hidden = !0;
      const B = document.createElement("div");
      B.className = "sap-tl-track-rail";
      const v = document.createElement("div");
      v.className = "sap-tl-main-rail", m = document.createElement("div"), m.className = "sap-tl-markers", l = document.createElement("input"), l.className = "sap-tl-range", l.type = "range", l.min = "0", l.max = `${y.replay.duration}`, l.step = "0.01", l.value = "0";
      const D = () => {
        Vn();
      }, L = () => {
        l && y.player.seek(y.player.projectTimelineTimeToReplay(Number(l.value)));
      }, j = () => {
        ut();
      };
      l.addEventListener("pointerdown", D), l.addEventListener("input", L), l.addEventListener("change", j), window.addEventListener("pointerup", j), window.addEventListener("pointercancel", j), b = () => {
        l?.removeEventListener("pointerdown", D), l?.removeEventListener("input", L), l?.removeEventListener("change", j), window.removeEventListener("pointerup", j), window.removeEventListener("pointercancel", j);
      }, B.append(v, m, l), P.append(o, g, d, B), r.append(M, P), s.append(r), y.container.append(s), Le(y), Ne(y), J({
        ...y,
        state: y.player.getState()
      });
    },
    onStateChange(y) {
      k = y, J(y);
    },
    teardown(y) {
      b?.(), b = null, ut(), s?.remove(), s = null, r = null, o = null, g = null, l = null, d = null, h = null, u = null, f = null, w = null, m = null, k = null, E = [], C = [], O = null, F.clear(), x.splice(0, x.length), S.splice(0, S.length), N.splice(0, N.length), V.splice(0, V.length), U = 0, $ = /* @__PURE__ */ new Set(), p && (y.container.style.position = _, p = !1);
    }
  };
}
function Q(e) {
  return e !== null && typeof e == "object" && !Array.isArray(e);
}
function lt(e) {
  return Q(e);
}
function zt(e, t) {
  if (!Q(e))
    throw new Error(`${t} must be an object`);
  const n = e.kind, a = e.value;
  if (n !== "frame" && n !== "time")
    throw new Error(`${t}.kind must be "frame" or "time"`);
  if (typeof a != "number" || !Number.isFinite(a))
    throw new Error(`${t}.value must be a finite number`);
  return {
    kind: n,
    value: a
  };
}
function ur(e, t) {
  const n = `manifest.replays[${t}]`;
  if (!Q(e))
    throw new Error(`${n} must be an object`);
  if (typeof e.id != "string" || e.id.trim() === "")
    throw new Error(`${n}.id must be a non-empty string`);
  if (e.path !== void 0 && typeof e.path != "string")
    throw new Error(`${n}.path must be a string when provided`);
  if (e.label !== void 0 && typeof e.label != "string")
    throw new Error(`${n}.label must be a string when provided`);
  if (e.meta !== void 0 && !lt(e.meta))
    throw new Error(`${n}.meta must be an object when provided`);
  const a = typeof e.path == "string" ? e.path : "";
  return {
    id: e.id,
    path: a,
    label: typeof e.label == "string" ? e.label : e.id,
    locator: pr(e.locator, `${n}.locator`, a),
    meta: e.meta ?? {}
  };
}
function mr(e, t) {
  const n = `manifest.items[${t}]`;
  if (!Q(e))
    throw new Error(`${n} must be an object`);
  if (typeof e.replay != "string" || e.replay.trim() === "")
    throw new Error(`${n}.replay must be a non-empty string`);
  if (e.label !== void 0 && typeof e.label != "string")
    throw new Error(`${n}.label must be a string when provided`);
  if (e.meta !== void 0 && !lt(e.meta))
    throw new Error(`${n}.meta must be an object when provided`);
  return {
    id: typeof e.id == "string" && e.id.trim() !== "" ? e.id : `${e.replay}:${t}`,
    replay: e.replay,
    start: zt(e.start, `${n}.start`),
    end: zt(e.end, `${n}.end`),
    label: typeof e.label == "string" ? e.label : "",
    meta: e.meta ?? {}
  };
}
function pr(e, t, n) {
  if (e === void 0)
    return n ? { kind: "path", path: n } : { kind: "inline" };
  if (!Q(e))
    throw new Error(`${t} must be an object when provided`);
  if (typeof e.kind != "string" || e.kind.trim() === "")
    throw new Error(`${t}.kind must be a non-empty string`);
  if (e.id !== void 0 && typeof e.id != "string")
    throw new Error(`${t}.id must be a string when provided`);
  if (e.path !== void 0 && typeof e.path != "string")
    throw new Error(`${t}.path must be a string when provided`);
  if (e.cachePath !== void 0 && typeof e.cachePath != "string")
    throw new Error(`${t}.cachePath must be a string when provided`);
  return {
    kind: e.kind,
    id: e.id,
    path: e.path,
    cachePath: e.cachePath
  };
}
function fr(e) {
  if (!Q(e))
    throw new Error("manifest.playback must be an object");
  if (e.advanceMode !== void 0 && e.advanceMode !== "auto" && e.advanceMode !== "manual")
    throw new Error('manifest.playback.advanceMode must be "auto" or "manual"');
  if (e.endMode !== void 0 && e.endMode !== "stop" && e.endMode !== "loop")
    throw new Error('manifest.playback.endMode must be "stop" or "loop"');
  if (e.advanceOnEnd !== void 0 && typeof e.advanceOnEnd != "boolean")
    throw new Error("manifest.playback.advanceOnEnd must be a boolean");
  return {
    advanceMode: e.advanceMode ?? (e.advanceOnEnd === !0 ? "auto" : "manual"),
    endMode: e.endMode ?? "stop"
  };
}
function xe(e, t) {
  if (e != null) {
    if (typeof e != "number" || !Number.isInteger(e) || !Number.isFinite(e) || e < 0)
      throw new Error(`${t} must be a non-negative integer when provided`);
    return e;
  }
}
function Ut(e, t) {
  if (e != null) {
    if (typeof e != "string")
      throw new Error(`${t} must be a string when provided`);
    return e;
  }
}
function br(e) {
  if (!Q(e))
    throw new Error("manifest.page must be an object when provided");
  return {
    next: Ut(e.next, "manifest.page.next"),
    previous: Ut(e.previous, "manifest.page.previous"),
    total: xe(e.total, "manifest.page.total"),
    count: xe(e.count, "manifest.page.count"),
    limit: xe(e.limit, "manifest.page.limit"),
    offset: xe(e.offset, "manifest.page.offset")
  };
}
function gr(e) {
  if (!Q(e))
    throw new Error("manifest must be an object");
  if (!Array.isArray(e.items))
    throw new Error("manifest.items must be an array");
  if (e.replays !== void 0 && !Array.isArray(e.replays))
    throw new Error("manifest.replays must be an array when provided");
  if (e.label !== void 0 && typeof e.label != "string")
    throw new Error("manifest.label must be a string when provided");
  if (e.meta !== void 0 && !lt(e.meta))
    throw new Error("manifest.meta must be an object when provided");
  const t = e.playback === void 0 ? { advanceMode: "manual", endMode: "stop" } : fr(e.playback);
  return {
    version: typeof e.version == "number" ? e.version : 1,
    kind: typeof e.kind == "string" ? e.kind : "playlist",
    replays: (e.replays ?? []).map(ur),
    items: e.items.map(mr),
    label: typeof e.label == "string" ? e.label : "Playlist",
    page: e.page === void 0 ? void 0 : br(e.page),
    meta: e.meta ?? {},
    playback: t
  };
}
async function Vr(e) {
  const t = await e.text();
  let n;
  try {
    n = JSON.parse(t);
  } catch (a) {
    throw new Error(
      `Failed to parse playlist manifest JSON: ${a instanceof Error ? a.message : String(a)}`
    );
  }
  return gr(n);
}
function jr(e, t) {
  const n = new Map(
    (e.replays ?? []).map((a) => [a.id, a])
  );
  return e.items.map((a) => {
    const i = n.get(a.replay);
    return {
      replay: t({
        replayId: a.replay,
        replay: i
      }),
      start: a.start,
      end: a.end,
      label: a.label || i?.label,
      meta: a.meta
    };
  });
}
function yr(e) {
  return typeof e != "string";
}
function Gt(e, t, n) {
  return Math.min(Math.max(e, t), n);
}
function Dn(e) {
  return e instanceof Error ? e.message : "Failed to load replay";
}
function On(e) {
  return e.preloadPolicy ? e.preloadPolicy : e.preloadRadius !== void 0 ? {
    kind: "adjacent",
    ahead: e.preloadRadius,
    behind: e.preloadRadius
  } : {
    kind: "adjacent",
    ahead: 1,
    behind: 1
  };
}
function Ln(e) {
  return e.advanceMode ? e.advanceMode : e.advanceOnEnd === !1 ? "manual" : "auto";
}
function Nn(e) {
  return e.endMode ?? "stop";
}
function Qe(e) {
  const t = [], n = /* @__PURE__ */ new Set();
  for (const a of e)
    n.has(a.replay.id) || (n.add(a.replay.id), t.push(a.replay));
  return t;
}
function Vt(e, t, n, a, i) {
  const s = [], r = /* @__PURE__ */ new Set([i]);
  for (let o = t + n; o >= 0 && o < e.length && s.length < Math.max(0, a); o += n) {
    const l = e[o]?.replay;
    !l || r.has(l.id) || (r.add(l.id), s.push(l));
  }
  return s;
}
function Bn(e, t, n) {
  const a = e[t];
  if (!a)
    return [];
  if (n.kind === "none")
    return [];
  if (n.kind === "all")
    return Qe(e).filter((l) => l.id !== a.replay.id);
  if (n.kind === "adjacent") {
    const l = Vt(
      e,
      t,
      -1,
      n.behind ?? 0,
      a.replay.id
    ), d = Vt(
      e,
      t,
      1,
      n.ahead,
      a.replay.id
    );
    return [...l, ...d];
  }
  const i = {
    items: e,
    currentIndex: t,
    currentItem: a
  }, s = /* @__PURE__ */ new Set([a.replay.id]), r = [], o = new Map(
    Qe(e).map((l) => [l.id, l])
  );
  for (const l of n.pick(i)) {
    const d = yr(l) ? l : o.get(l);
    !d || s.has(d.id) || (s.add(d.id), r.push(d));
  }
  return r;
}
function Hr(e) {
  return { kind: "frame", value: e };
}
function jt(e) {
  return { kind: "time", value: e };
}
function De(e, t) {
  return { id: e, load: t };
}
function wr(e, t) {
  return De(e, async () => t);
}
function Wr(e, t) {
  return De(e, async () => ot(t, { useWorker: !0 }));
}
function $r(e, t = e.webkitRelativePath || e.name) {
  return De(t, async () => {
    const n = new Uint8Array(await e.arrayBuffer());
    return ot(n, { useWorker: !0 });
  });
}
function Kr(e, t, n = e) {
  return De(n, async (a) => t(e, a));
}
function _r(e, t = {}) {
  return {
    replay: e,
    start: jt(0),
    end: jt(Number.POSITIVE_INFINITY),
    label: t.label,
    meta: t.meta
  };
}
class Fn {
  cache = /* @__PURE__ */ new Map();
  states = /* @__PURE__ */ new Map();
  listeners = /* @__PURE__ */ new Set();
  load(t) {
    const n = this.cache.get(t.id);
    if (n)
      return n;
    this.setSourceState(t.id, {
      status: "loading",
      progress: null,
      error: null,
      startedAt: Date.now(),
      completedAt: null
    });
    const a = {
      sourceId: t.id,
      updateProgress: (s) => this.updateProgress(t.id, s)
    }, i = Promise.resolve().then(() => t.load(a)).then((s) => (this.setSourceState(t.id, {
      status: "loaded",
      progress: null,
      error: null,
      completedAt: Date.now()
    }), s)).catch((s) => {
      throw this.cache.delete(t.id), this.setSourceState(t.id, {
        status: "error",
        error: Dn(s),
        completedAt: Date.now()
      }), s;
    });
    return this.cache.set(t.id, i), i;
  }
  preload(t) {
    for (const n of t)
      this.load(n).catch(() => {
      });
  }
  has(t) {
    return this.cache.has(typeof t == "string" ? t : t.id);
  }
  delete(t) {
    const n = typeof t == "string" ? t : t.id, a = this.cache.delete(n);
    return a && (this.states.delete(n), this.emitChange()), a;
  }
  clear() {
    this.cache.clear(), this.states.size > 0 && (this.states.clear(), this.emitChange());
  }
  getState(t) {
    const n = typeof t == "string" ? t : t.id;
    return this.states.get(n) ?? {
      sourceId: n,
      status: "idle",
      progress: null,
      error: null,
      startedAt: null,
      updatedAt: null,
      completedAt: null
    };
  }
  getStates() {
    return Array.from(this.states.values());
  }
  subscribe(t) {
    return this.listeners.add(t), () => {
      this.listeners.delete(t);
    };
  }
  updateProgress(t, n) {
    const a = this.getState(t);
    this.setSourceState(t, {
      status: a.status === "idle" ? "loading" : a.status,
      progress: n,
      updatedAt: Date.now()
    });
  }
  setSourceState(t, n) {
    const a = this.getState(t);
    this.states.set(t, {
      ...a,
      ...n,
      sourceId: t,
      updatedAt: n.updatedAt ?? Date.now()
    }), this.emitChange();
  }
  emitChange() {
    for (const t of this.listeners)
      t();
  }
}
class Yr {
  items;
  loadCache;
  currentItemIndex = 0;
  pendingItemIndex = null;
  loading = !1;
  error = null;
  currentLoaded = null;
  disposed = !1;
  loadGeneration = 0;
  pendingLoad = Promise.resolve();
  playlistEnded = !1;
  listeners = /* @__PURE__ */ new Set();
  preloadPolicy;
  advanceMode;
  endMode;
  constructor(t, n = {}) {
    this.items = t, this.loadCache = n.loadCache ?? new Fn(), this.preloadPolicy = On(n), this.advanceMode = Ln(n), this.endMode = Nn(n), t.length > 0 && (this.currentItemIndex = Gt(n.initialItemIndex ?? 0, 0, t.length - 1), this.pendingLoad = this.loadItem(this.currentItemIndex));
  }
  async waitForCurrentItem() {
    await this.pendingLoad;
  }
  async setCurrentItemIndex(t) {
    this.pendingLoad = this.loadItem(t), await this.pendingLoad;
  }
  async next() {
    const t = this.pendingItemIndex ?? this.currentItemIndex;
    return t >= this.items.length - 1 ? this.endMode === "loop" && this.items.length > 0 ? (await this.setCurrentItemIndex(0), !0) : !1 : (await this.setCurrentItemIndex(t + 1), !0);
  }
  async previous() {
    const t = this.pendingItemIndex ?? this.currentItemIndex;
    return t <= 0 ? this.endMode === "loop" && this.items.length > 0 ? (await this.setCurrentItemIndex(this.items.length - 1), !0) : !1 : (await this.setCurrentItemIndex(t - 1), !0);
  }
  async completeCurrentItem() {
    if (this.advanceMode !== "auto")
      return this.playlistEnded = this.currentItemIndex >= this.items.length - 1, this.emitChange(), !1;
    const t = await this.next();
    return this.playlistEnded = !t && this.currentItemIndex >= this.items.length - 1, this.emitChange(), t;
  }
  setAdvanceMode(t) {
    this.advanceMode = t, this.emitChange();
  }
  setEndMode(t) {
    this.endMode = t, this.playlistEnded = !1, this.emitChange();
  }
  getCurrentLoaded() {
    return this.currentLoaded;
  }
  getState() {
    const t = this.pendingItemIndex ?? this.currentItemIndex;
    return {
      ready: this.currentLoaded !== null && !this.loading && this.error === null,
      loading: this.loading,
      error: this.error,
      itemIndex: t,
      itemCount: this.items.length,
      item: this.items[t] ?? null,
      loaded: this.currentLoaded,
      advanceMode: this.advanceMode,
      endMode: this.endMode,
      playlistEnded: this.playlistEnded
    };
  }
  subscribe(t) {
    return this.listeners.add(t), t(this.getState()), () => {
      this.listeners.delete(t);
    };
  }
  destroy() {
    this.disposed = !0, this.listeners.clear();
  }
  dispose() {
    this.destroy();
  }
  async loadItem(t) {
    if (this.items.length === 0)
      return;
    const n = Gt(t, 0, this.items.length - 1), a = ++this.loadGeneration, i = this.items[n];
    this.pendingItemIndex = n, this.loading = !0, this.error = null, this.playlistEnded = !1, this.emitChange();
    try {
      const s = await this.loadCache.load(i.replay);
      if (this.disposed || a !== this.loadGeneration)
        return;
      this.currentItemIndex = n, this.pendingItemIndex = null, this.currentLoaded = s, this.loading = !1, this.error = null, this.loadCache.preload(Bn(this.items, n, this.preloadPolicy)), this.emitChange();
    } catch (s) {
      if (this.disposed || a !== this.loadGeneration)
        return;
      throw this.pendingItemIndex = null, this.loading = !1, this.error = Dn(s), this.currentLoaded = null, this.emitChange(), s;
    }
  }
  emitChange() {
    const t = this.getState();
    for (const n of this.listeners)
      n(t);
  }
}
const Er = 2.25, vr = 1, Ke = 1e-4;
function de(e, t, n) {
  return Math.min(Math.max(e, t), n);
}
function xr(e, t) {
  if (e.frames.length === 0)
    return 0;
  const n = e.frames.length - 1;
  return de(Math.round(t), 0, n);
}
function Mr(e) {
  return e instanceof Error ? e.message : "Failed to load replay";
}
function ie(e) {
  return typeof e == "number" && Number.isFinite(e) ? e : void 0;
}
function zn(e) {
  if (!e)
    return null;
  const t = {}, n = ie(e.fov), a = ie(e.height), i = ie(e.pitch), s = ie(e.distance), r = ie(e.stiffness), o = ie(e.swivelSpeed), l = ie(e.transitionSpeed);
  return n !== void 0 && (t.fov = n), a !== void 0 && (t.height = a), i !== void 0 && (t.pitch = i), s !== void 0 && (t.distance = s), r !== void 0 && (t.stiffness = r), o !== void 0 && (t.swivelSpeed = o), l !== void 0 && (t.transitionSpeed = l), t;
}
function Ht(e, t) {
  if (t.kind === "frame") {
    const a = xr(e, t.value);
    return {
      frameIndex: a,
      time: e.frames[a]?.time ?? 0
    };
  }
  const n = de(t.value, 0, e.duration);
  return {
    frameIndex: me(e, n),
    time: n
  };
}
function kr(e, t, n) {
  if (n.time < t.time) {
    const a = e.label ? ` "${e.label}"` : "";
    throw new Error(`Playlist item${a} ends before it starts`);
  }
}
function Sr(e) {
  return {
    speed: Math.max(0.1, e.initialPlaybackRate ?? vr),
    cameraDistanceScale: Math.max(
      0.25,
      e.initialCameraDistanceScale ?? Er
    ),
    customCameraSettings: zn(e.initialCustomCameraSettings),
    cameraViewMode: e.initialCameraViewMode ?? (e.initialAttachedPlayerId ? "follow" : "free"),
    attachedPlayerId: e.initialAttachedPlayerId ?? null,
    ballCamEnabled: e.initialBallCamEnabled ?? !1,
    boostPickupAnimationEnabled: e.initialBoostPickupAnimationEnabled ?? !0,
    hitboxWireframesEnabled: e.initialHitboxWireframesEnabled ?? !1,
    hitboxOnlyModeEnabled: e.initialHitboxOnlyModeEnabled ?? !1,
    skipPostGoalTransitionsEnabled: e.initialSkipPostGoalTransitionsEnabled ?? !0,
    skipKickoffsEnabled: e.initialSkipKickoffsEnabled ?? !1
  };
}
function Tr(e, t) {
  const n = Ht(t.replay, e.start), a = Ht(t.replay, e.end);
  return kr(e, n, a), {
    source: e,
    replay: t,
    start: n,
    end: a,
    duration: Math.max(0, a.time - n.time)
  };
}
class Je extends EventTarget {
  container;
  items;
  options;
  player = null;
  playerUnsubscribe = null;
  currentResolvedItem = null;
  currentItemIndex = 0;
  pendingItemIndex = null;
  loading = !1;
  error = null;
  disposed = !1;
  playbackIntent;
  loadGeneration = 0;
  boundaryGuard = !1;
  pendingLoad = Promise.resolve();
  replayCache = new Fn();
  replayCacheUnsubscribe = null;
  preferences;
  preloadPolicy;
  advanceMode;
  endMode;
  static fromReplay(t, n, a = {}) {
    return Je.fromReplaySource(
      t,
      wr(a.replayId ?? "replay", n),
      a
    );
  }
  static fromReplaySource(t, n, a = {}) {
    return new Je(
      t,
      [
        _r(n, {
          label: a.itemLabel,
          meta: a.itemMeta
        })
      ],
      a
    );
  }
  constructor(t, n, a = {}) {
    if (super(), this.container = t, this.items = n, this.options = a, this.preferences = Sr(a), this.preloadPolicy = On(a), this.advanceMode = Ln(a), this.endMode = Nn(a), this.playbackIntent = a.autoplay ?? !1, this.replayCacheUnsubscribe = this.replayCache.subscribe(() => {
      this.emitChange();
    }), n.length > 0) {
      const i = de(a.initialItemIndex ?? 0, 0, n.length - 1);
      this.pendingLoad = this.loadItem(i);
      return;
    }
    this.emitChange();
  }
  async waitForCurrentItem() {
    await this.pendingLoad;
  }
  async setCurrentItemIndex(t) {
    this.pendingLoad = this.loadItem(t), await this.pendingLoad;
  }
  async next() {
    const t = this.pendingItemIndex ?? this.currentItemIndex;
    return t >= this.items.length - 1 ? this.endMode === "loop" && this.items.length > 0 ? (await this.setCurrentItemIndex(0), !0) : !1 : (await this.setCurrentItemIndex(t + 1), !0);
  }
  async previous() {
    const t = this.pendingItemIndex ?? this.currentItemIndex;
    return t <= 0 ? this.endMode === "loop" && this.items.length > 0 ? (await this.setCurrentItemIndex(this.items.length - 1), !0) : !1 : (await this.setCurrentItemIndex(t - 1), !0);
  }
  play() {
    this.playbackIntent = !0, this.player?.play(), this.emitChange();
  }
  pause() {
    this.playbackIntent = !1, this.player?.pause(), this.emitChange();
  }
  togglePlayback() {
    this.player?.getState().playing ? this.pause() : this.play();
  }
  seek(t) {
    if (!this.player || !this.currentResolvedItem)
      return;
    const n = de(
      this.currentResolvedItem.start.time + t,
      this.currentResolvedItem.start.time,
      this.currentResolvedItem.end.time
    );
    this.player.seek(n);
  }
  setReplayFrameIndex(t) {
    return this.player ? (this.playbackIntent = !1, this.player.setFrameIndex(t), this.emitChange(), !0) : !1;
  }
  stepFrames(t) {
    return !this.player || !Number.isFinite(t) ? !1 : (this.playbackIntent = !1, this.player.stepFrames(t), this.emitChange(), !0);
  }
  stepForwardFrame() {
    return this.stepFrames(1);
  }
  stepBackwardFrame() {
    return this.stepFrames(-1);
  }
  setPlaybackRate(t) {
    this.preferences.speed = Math.max(0.1, t), this.player?.setPlaybackRate(this.preferences.speed), this.emitChange();
  }
  setCameraDistanceScale(t) {
    this.preferences.cameraDistanceScale = Math.max(0.25, t), this.player?.setCameraDistanceScale(this.preferences.cameraDistanceScale), this.emitChange();
  }
  setCustomCameraSettings(t) {
    this.preferences.customCameraSettings = zn(t), this.player?.setCustomCameraSettings(this.preferences.customCameraSettings), this.emitChange();
  }
  setCameraViewMode(t) {
    this.preferences.cameraViewMode = t, this.player?.setCameraViewMode(t), this.emitChange();
  }
  setFreeCameraPreset(t) {
    this.preferences.cameraViewMode = "free", this.player?.setFreeCameraPreset(t), this.emitChange();
  }
  setAttachedPlayer(t) {
    this.preferences.attachedPlayerId = t, this.preferences.cameraViewMode = t ? "follow" : "free", this.player?.setAttachedPlayer(t), this.emitChange();
  }
  setBallCamEnabled(t) {
    this.preferences.ballCamEnabled = t, this.player?.setBallCamEnabled(t), this.emitChange();
  }
  setBoostPickupAnimationEnabled(t) {
    this.preferences.boostPickupAnimationEnabled = t, this.player?.setBoostPickupAnimationEnabled(t), this.emitChange();
  }
  setHitboxWireframesEnabled(t) {
    this.preferences.hitboxWireframesEnabled = t, this.player?.setHitboxWireframesEnabled(t), this.emitChange();
  }
  setHitboxOnlyModeEnabled(t) {
    this.preferences.hitboxOnlyModeEnabled = t, this.player?.setHitboxOnlyModeEnabled(t), this.emitChange();
  }
  setSkipPostGoalTransitionsEnabled(t) {
    this.preferences.skipPostGoalTransitionsEnabled = t, this.player?.setSkipPostGoalTransitionsEnabled(t), this.emitChange();
  }
  setSkipKickoffsEnabled(t) {
    this.preferences.skipKickoffsEnabled = t, this.player?.setSkipKickoffsEnabled(t), this.emitChange();
  }
  setAdvanceMode(t) {
    this.advanceMode = t, this.emitChange();
  }
  setEndMode(t) {
    this.endMode = t, this.emitChange();
  }
  getState() {
    const t = this.player?.getState() ?? null, n = this.pendingItemIndex ?? this.currentItemIndex, a = this.items[n] ?? null, i = t?.currentTime ?? 0, s = t?.duration ?? this.currentResolvedItem?.replay.replay.duration ?? 0, r = this.currentResolvedItem?.start.time ?? 0, o = this.currentResolvedItem?.duration ?? 0, l = de(i - r, 0, o), d = this.currentResolvedItem !== null && l >= o - Ke;
    return {
      ready: this.currentResolvedItem !== null && !this.loading && this.error === null,
      loading: this.loading,
      error: this.error,
      replayLoadStates: this.getReplayLoadStates(),
      itemIndex: n,
      itemCount: this.items.length,
      item: a,
      advanceMode: this.advanceMode,
      endMode: this.endMode,
      itemEnded: d,
      playlistEnded: d && n >= this.items.length - 1,
      currentTime: l,
      duration: o,
      replayCurrentTime: i,
      replayDuration: s,
      frameIndex: t?.frameIndex ?? this.currentResolvedItem?.start.frameIndex ?? 0,
      activeMetadata: t?.activeMetadata ?? null,
      playing: t?.playing ?? !1,
      speed: t?.speed ?? this.preferences.speed,
      cameraDistanceScale: t?.cameraDistanceScale ?? this.preferences.cameraDistanceScale,
      customCameraSettings: t?.customCameraSettings ?? this.preferences.customCameraSettings,
      cameraViewMode: t?.cameraViewMode ?? this.preferences.cameraViewMode,
      attachedPlayerId: t?.attachedPlayerId ?? this.preferences.attachedPlayerId,
      ballCamEnabled: t?.ballCamEnabled ?? this.preferences.ballCamEnabled,
      boostPickupAnimationEnabled: t?.boostPickupAnimationEnabled ?? this.preferences.boostPickupAnimationEnabled,
      hitboxWireframesEnabled: t?.hitboxWireframesEnabled ?? this.preferences.hitboxWireframesEnabled,
      hitboxOnlyModeEnabled: t?.hitboxOnlyModeEnabled ?? this.preferences.hitboxOnlyModeEnabled,
      skipPostGoalTransitionsEnabled: t?.skipPostGoalTransitionsEnabled ?? this.preferences.skipPostGoalTransitionsEnabled,
      skipKickoffsEnabled: t?.skipKickoffsEnabled ?? this.preferences.skipKickoffsEnabled
    };
  }
  getSnapshot() {
    return this.getState();
  }
  getCurrentReplay() {
    return this.currentResolvedItem?.replay ?? null;
  }
  getCurrentPlayer() {
    return this.player;
  }
  getCurrentResolvedItem() {
    return this.currentResolvedItem;
  }
  subscribe(t) {
    const n = (a) => {
      t(a.detail);
    };
    return this.addEventListener("change", n), t(this.getState()), () => {
      this.removeEventListener("change", n);
    };
  }
  destroy() {
    this.disposed = !0, this.replayCacheUnsubscribe?.(), this.replayCacheUnsubscribe = null, this.detachPlayer(), this.replayCache.clear();
  }
  dispose() {
    this.destroy();
  }
  async loadItem(t) {
    if (this.items.length === 0)
      return;
    const n = de(t, 0, this.items.length - 1), a = ++this.loadGeneration, i = this.items[n];
    this.pendingItemIndex = n, this.loading = !0, this.error = null, this.emitChange();
    try {
      const s = this.loadReplaySource(i.replay);
      this.prefetchNearbyReplays(n);
      const r = await s;
      if (this.disposed || a !== this.loadGeneration)
        return;
      const o = Tr(i, r);
      this.currentItemIndex = n, this.pendingItemIndex = null, this.currentResolvedItem = o, this.attachPlayer(o), this.loading = !1, this.error = null, this.prefetchNearbyReplays(n), this.emitChange();
    } catch (s) {
      if (this.disposed || a !== this.loadGeneration)
        return;
      throw this.playbackIntent = !1, this.pendingItemIndex = null, this.loading = !1, this.error = Mr(s), this.detachPlayer(), this.currentResolvedItem = null, this.emitChange(), s;
    }
  }
  loadReplaySource(t) {
    return this.replayCache.load(t);
  }
  prefetchNearbyReplays(t) {
    this.replayCache.preload(Bn(this.items, t, this.preloadPolicy));
  }
  getReplayLoadStates() {
    return Qe(this.items).map((t) => this.replayCache.getState(t));
  }
  attachPlayer(t) {
    this.detachPlayer();
    const n = t.replay.replay, a = n.players.some(
      (i) => i.id === this.preferences.attachedPlayerId
    ) ? this.preferences.attachedPlayerId : null;
    this.preferences.attachedPlayerId = a, a === null && this.preferences.cameraViewMode === "follow" && (this.preferences.cameraViewMode = "free"), this.player = new ns(this.container, n, {
      fieldScale: this.options.fieldScale,
      initialPlaybackRate: this.preferences.speed,
      initialCameraDistanceScale: this.preferences.cameraDistanceScale,
      initialCustomCameraSettings: this.preferences.customCameraSettings,
      initialCameraViewMode: this.preferences.cameraViewMode,
      initialAttachedPlayerId: a,
      initialBallCamEnabled: this.preferences.ballCamEnabled,
      initialBoostPickupAnimationEnabled: this.preferences.boostPickupAnimationEnabled,
      initialHitboxWireframesEnabled: this.preferences.hitboxWireframesEnabled,
      initialHitboxOnlyModeEnabled: this.preferences.hitboxOnlyModeEnabled,
      initialSkipPostGoalTransitionsEnabled: this.preferences.skipPostGoalTransitionsEnabled,
      initialSkipKickoffsEnabled: this.preferences.skipKickoffsEnabled,
      plugins: this.options.plugins
    }), this.player.seek(t.start.time), this.playerUnsubscribe = this.player.subscribe((i) => {
      this.handlePlayerState(i);
    }), this.playbackIntent && this.player.play();
  }
  detachPlayer() {
    this.playerUnsubscribe?.(), this.playerUnsubscribe = null, this.player?.destroy(), this.player = null;
  }
  handlePlayerState(t) {
    if (!this.currentResolvedItem || this.boundaryGuard) {
      this.emitChange();
      return;
    }
    const n = this.currentResolvedItem.end.time;
    if (t.playing && t.currentTime >= n - Ke) {
      this.boundaryGuard = !0, this.advanceMode === "auto" && this.playbackIntent ? this.currentItemIndex < this.items.length - 1 ? this.setCurrentItemIndex(this.currentItemIndex + 1) : this.endMode === "loop" && this.items.length > 0 ? this.setCurrentItemIndex(0) : (this.playbackIntent = !1, this.player?.setState({ currentTime: n, playing: !1 })) : (this.playbackIntent = !1, this.player?.setState({ currentTime: n, playing: !1 })), this.boundaryGuard = !1, this.emitChange();
      return;
    }
    if (t.currentTime > n + Ke) {
      this.boundaryGuard = !0, this.player?.setState({ currentTime: n, playing: !1 }), this.playbackIntent = !1, this.boundaryGuard = !1, this.emitChange();
      return;
    }
    this.emitChange();
  }
  emitChange() {
    this.dispatchEvent(new CustomEvent("change", { detail: this.getState() }));
  }
}
const Wt = "subtr-actor-replay-load-overlay-styles";
function Pr() {
  if (document.getElementById(Wt))
    return;
  const e = document.createElement("style");
  e.id = Wt, e.textContent = `
    .sap-load-overlay {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      background:
        radial-gradient(circle at top, rgba(255,255,255,0.12), transparent 50%),
        rgba(10, 15, 26, 0.72);
      backdrop-filter: blur(8px);
      z-index: 40;
      pointer-events: none;
    }

    .sap-load-overlay__panel {
      width: min(360px, 100%);
      padding: 18px 20px;
      border: 1px solid rgba(255,255,255,0.14);
      border-radius: 16px;
      background: rgba(8, 12, 20, 0.88);
      box-shadow: 0 20px 60px rgba(0,0,0,0.35);
      color: #f5f7fb;
      font: 500 14px/1.4 "IBM Plex Sans", "Avenir Next", sans-serif;
      letter-spacing: 0.01em;
    }

    .sap-load-overlay__title {
      margin: 0 0 10px;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: rgba(255,255,255,0.64);
    }

    .sap-load-overlay__status {
      margin: 0 0 12px;
      font-size: 15px;
      color: #ffffff;
    }

    .sap-load-overlay__bar {
      overflow: hidden;
      height: 8px;
      border-radius: 999px;
      background: rgba(255,255,255,0.12);
    }

    .sap-load-overlay__fill {
      width: 0%;
      height: 100%;
      border-radius: inherit;
      background: linear-gradient(90deg, #58c4dd 0%, #f4b860 100%);
      transition: width 120ms linear;
    }

    .sap-load-overlay__meta {
      margin-top: 10px;
      font-size: 12px;
      color: rgba(255,255,255,0.6);
    }

    .sap-load-overlay__panel[data-state="error"] .sap-load-overlay__fill {
      background: linear-gradient(90deg, #ff6b6b 0%, #ff9b6b 100%);
      width: 100% !important;
    }
  `, document.head.append(e);
}
function Cr(e) {
  const t = e.progress === void 0 ? null : Math.round(e.progress * 100);
  return e.stage === "processing" ? t === null || e.totalFrames === void 0 ? "Processing replay frames..." : `Processing replay frames... ${t}% (${e.processedFrames ?? 0}/${e.totalFrames})` : e.stage === "validating" ? "Validating replay..." : e.stage === "normalizing" ? t !== null ? `Normalizing replay data... ${t}%` : "Normalizing replay data..." : "Loading replay...";
}
function Ir(e) {
  const t = e.progress ?? 0;
  return e.stage === "processing" ? e.totalFrames !== void 0 ? e.processedFrames === void 0 ? `${e.totalFrames} frames` : `${e.processedFrames}/${e.totalFrames} frames` : "Extracting frame data" : e.stage === "validating" ? "Checking replay file" : e.stage === "normalizing" ? t < 0.45 ? "Decoding structured replay data" : t < 0.65 ? "Parsing frame data" : t < 1 ? "Building playback model" : "Playback model ready" : e.stage;
}
function Zr(e, t = {}) {
  Pr();
  let n = null;
  getComputedStyle(e).position === "static" && (n = e.style.position, e.style.position = "relative");
  const a = document.createElement("div");
  a.className = "sap-load-overlay";
  const i = document.createElement("div");
  i.className = "sap-load-overlay__panel", i.dataset.state = "loading";
  const s = document.createElement("p");
  s.className = "sap-load-overlay__title", s.textContent = t.title ?? "Replay Loading";
  const r = document.createElement("p");
  r.className = "sap-load-overlay__status", r.textContent = "Loading replay...";
  const o = document.createElement("div");
  o.className = "sap-load-overlay__bar";
  const l = document.createElement("div");
  l.className = "sap-load-overlay__fill", o.append(l);
  const d = document.createElement("div");
  d.className = "sap-load-overlay__meta", d.textContent = "", i.append(s, r, o, d), a.append(i), e.append(a);
  const h = (u) => {
    const f = Math.max(0, Math.min(1, u ?? 0));
    l.style.width = `${Math.round(f * 100)}%`;
  };
  return {
    update(u) {
      i.dataset.state = "loading", r.textContent = t.formatProgress?.(u) ?? Cr(u), h(u.progress), d.textContent = Ir(u);
    },
    complete(u = "Replay loaded") {
      i.dataset.state = "complete", r.textContent = u, l.style.width = "100%", d.textContent = "";
    },
    fail(u) {
      i.dataset.state = "error", r.textContent = u, d.textContent = "Loading failed";
    },
    destroy() {
      a.remove(), n !== null && (e.style.position = n);
    }
  };
}
export {
  cs as BALLCHASING_API_BASE_URL,
  xn as BALLCHASING_BASE_URL,
  Qr as BOOST_RAW_MAX,
  gt as DEFAULT_REPLAY_HITBOX_KIND,
  Fn as PlaylistLoadCache,
  Yr as PlaylistSession,
  oa as REPLAY_HITBOX_SPECS,
  ns as ReplayPlayer,
  Je as ReplayPlaylistPlayer,
  $t as boostAmountToPercent,
  Jr as boostPercentToAmount,
  Br as createBallchasingOverlayPlugin,
  Nr as createBallchasingReplaySource,
  Fr as createBoostPadOverlayPlugin,
  zr as createBoostPickupAnimationPlugin,
  Ur as createCanvasRecorderPlugin,
  _r as createFullReplayPlaylistItem,
  Wr as createReplayBytesSource,
  $r as createReplayFileSource,
  Zr as createReplayLoadOverlay,
  Kr as createReplayPathSource,
  De as createReplaySource,
  wr as createStaticReplaySource,
  Gr as createTimelineOverlayPlugin,
  as as ensureBindingsReady,
  ps as fetchBallchasingReplayBytes,
  me as findFrameIndexAtTime,
  Cr as formatReplayLoadProgress,
  Ir as formatReplayLoadProgressMeta,
  Hr as frameBound,
  Lr as getBallchasingReplayApiFileUrl,
  Or as getBallchasingReplayFileName,
  ms as getBallchasingReplayFileUrl,
  qt as getReplayHitboxSpec,
  Qt as inferReplayHitboxKind,
  Xt as inferReplayHitboxKindFromBodyName,
  It as isBallchasingReplayId,
  Vr as loadPlaylistManifestFromFile,
  ot as loadReplayFromBytes,
  Re as normalizeBallchasingReplayId,
  Dr as normalizeReplayData,
  gi as normalizeReplayDataAsync,
  ha as normalizeReplayHitboxKind,
  gr as parsePlaylistManifest,
  Tr as resolvePlaylistItem,
  jr as resolvePlaylistItemsFromManifest,
  jt as timeBound,
  er as timelineEventSeekTime,
  ls as validateReplayBytes
};
