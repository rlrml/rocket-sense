import * as c from "three";
import { Controls as Hn, Vector3 as K, MOUSE as ue, TOUCH as de, Quaternion as gt, Spherical as yt, Vector2 as $, Ray as Wn, Plane as $n, MathUtils as Kn } from "three";
import { boostAmountToPercent as Xt } from "./boost-units.js";
import { BOOST_RAW_MAX as eo, boostPercentToAmount as to } from "./boost-units.js";
import * as Oe from "@rlrml/subtr-actor";
const wt = { type: "change" }, rt = { type: "start" }, qt = { type: "end" }, Se = new Wn(), _t = new $n(), Yn = Math.cos(70 * Kn.DEG2RAD), F = new K(), U = 2 * Math.PI, R = {
  NONE: -1,
  ROTATE: 0,
  DOLLY: 1,
  PAN: 2,
  TOUCH_ROTATE: 3,
  TOUCH_PAN: 4,
  TOUCH_DOLLY_PAN: 5,
  TOUCH_DOLLY_ROTATE: 6
}, je = 1e-6;
class Zn extends Hn {
  /**
   * Constructs a new controls instance.
   *
   * @param {Object3D} object - The object that is managed by the controls.
   * @param {?HTMLDOMElement} domElement - The HTML element used for event listeners.
   */
  constructor(t, n = null) {
    super(t, n), this.state = R.NONE, this.target = new K(), this.cursor = new K(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.keyRotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: ue.ROTATE, MIDDLE: ue.DOLLY, RIGHT: ue.PAN }, this.touches = { ONE: de.ROTATE, TWO: de.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this._lastPosition = new K(), this._lastQuaternion = new gt(), this._lastTargetPosition = new K(), this._quat = new gt().setFromUnitVectors(t.up, new K(0, 1, 0)), this._quatInverse = this._quat.clone().invert(), this._spherical = new yt(), this._sphericalDelta = new yt(), this._scale = 1, this._panOffset = new K(), this._rotateStart = new $(), this._rotateEnd = new $(), this._rotateDelta = new $(), this._panStart = new $(), this._panEnd = new $(), this._panDelta = new $(), this._dollyStart = new $(), this._dollyEnd = new $(), this._dollyDelta = new $(), this._dollyDirection = new K(), this._mouse = new $(), this._performCursorZoom = !1, this._pointers = [], this._pointerPositions = {}, this._controlActive = !1, this._onPointerMove = qn.bind(this), this._onPointerDown = Xn.bind(this), this._onPointerUp = Qn.bind(this), this._onContextMenu = sa.bind(this), this._onMouseWheel = ta.bind(this), this._onKeyDown = na.bind(this), this._onTouchStart = aa.bind(this), this._onTouchMove = ia.bind(this), this._onMouseDown = Jn.bind(this), this._onMouseMove = ea.bind(this), this._interceptControlDown = ra.bind(this), this._interceptControlUp = oa.bind(this), this.domElement !== null && this.connect(this.domElement), this.update();
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
    this.target.copy(this.target0), this.object.position.copy(this.position0), this.object.zoom = this.zoom0, this.object.updateProjectionMatrix(), this.dispatchEvent(wt), this.update(), this.state = R.NONE;
  }
  update(t = null) {
    const n = this.object.position;
    F.copy(n).sub(this.target), F.applyQuaternion(this._quat), this._spherical.setFromVector3(F), this.autoRotate && this.state === R.NONE && this._rotateLeft(this._getAutoRotationAngle(t)), this.enableDamping ? (this._spherical.theta += this._sphericalDelta.theta * this.dampingFactor, this._spherical.phi += this._sphericalDelta.phi * this.dampingFactor) : (this._spherical.theta += this._sphericalDelta.theta, this._spherical.phi += this._sphericalDelta.phi);
    let a = this.minAzimuthAngle, i = this.maxAzimuthAngle;
    isFinite(a) && isFinite(i) && (a < -Math.PI ? a += U : a > Math.PI && (a -= U), i < -Math.PI ? i += U : i > Math.PI && (i -= U), a <= i ? this._spherical.theta = Math.max(a, Math.min(i, this._spherical.theta)) : this._spherical.theta = this._spherical.theta > (a + i) / 2 ? Math.max(a, this._spherical.theta) : Math.min(i, this._spherical.theta)), this._spherical.phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, this._spherical.phi)), this._spherical.makeSafe(), this.enableDamping === !0 ? this.target.addScaledVector(this._panOffset, this.dampingFactor) : this.target.add(this._panOffset), this.target.sub(this.cursor), this.target.clampLength(this.minTargetRadius, this.maxTargetRadius), this.target.add(this.cursor);
    let s = !1;
    if (this.zoomToCursor && this._performCursorZoom || this.object.isOrthographicCamera)
      this._spherical.radius = this._clampDistance(this._spherical.radius);
    else {
      const r = this._spherical.radius;
      this._spherical.radius = this._clampDistance(this._spherical.radius * this._scale), s = r != this._spherical.radius;
    }
    if (F.setFromSpherical(this._spherical), F.applyQuaternion(this._quatInverse), n.copy(this.target).add(F), this.object.lookAt(this.target), this.enableDamping === !0 ? (this._sphericalDelta.theta *= 1 - this.dampingFactor, this._sphericalDelta.phi *= 1 - this.dampingFactor, this._panOffset.multiplyScalar(1 - this.dampingFactor)) : (this._sphericalDelta.set(0, 0, 0), this._panOffset.set(0, 0, 0)), this.zoomToCursor && this._performCursorZoom) {
      let r = null;
      if (this.object.isPerspectiveCamera) {
        const o = F.length();
        r = this._clampDistance(o * this._scale);
        const l = o - r;
        this.object.position.addScaledVector(this._dollyDirection, l), this.object.updateMatrixWorld(), s = !!l;
      } else if (this.object.isOrthographicCamera) {
        const o = new K(this._mouse.x, this._mouse.y, 0);
        o.unproject(this.object);
        const l = this.object.zoom;
        this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), this.object.updateProjectionMatrix(), s = l !== this.object.zoom;
        const d = new K(this._mouse.x, this._mouse.y, 0);
        d.unproject(this.object), this.object.position.sub(d).add(o), this.object.updateMatrixWorld(), r = F.length();
      } else
        console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), this.zoomToCursor = !1;
      r !== null && (this.screenSpacePanning ? this.target.set(0, 0, -1).transformDirection(this.object.matrix).multiplyScalar(r).add(this.object.position) : (Se.origin.copy(this.object.position), Se.direction.set(0, 0, -1).transformDirection(this.object.matrix), Math.abs(this.object.up.dot(Se.direction)) < Yn ? this.object.lookAt(this.target) : (_t.setFromNormalAndCoplanarPoint(this.object.up, this.target), Se.intersectPlane(_t, this.target))));
    } else if (this.object.isOrthographicCamera) {
      const r = this.object.zoom;
      this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), r !== this.object.zoom && (this.object.updateProjectionMatrix(), s = !0);
    }
    return this._scale = 1, this._performCursorZoom = !1, s || this._lastPosition.distanceToSquared(this.object.position) > je || 8 * (1 - this._lastQuaternion.dot(this.object.quaternion)) > je || this._lastTargetPosition.distanceToSquared(this.target) > je ? (this.dispatchEvent(wt), this._lastPosition.copy(this.object.position), this._lastQuaternion.copy(this.object.quaternion), this._lastTargetPosition.copy(this.target), !0) : !1;
  }
  _getAutoRotationAngle(t) {
    return t !== null ? U / 60 * this.autoRotateSpeed * t : U / 60 / 60 * this.autoRotateSpeed;
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
    F.setFromMatrixColumn(n, 0), F.multiplyScalar(-t), this._panOffset.add(F);
  }
  _panUp(t, n) {
    this.screenSpacePanning === !0 ? F.setFromMatrixColumn(n, 1) : (F.setFromMatrixColumn(n, 0), F.crossVectors(this.object.up, F)), F.multiplyScalar(t), this._panOffset.add(F);
  }
  // deltaX and deltaY are in pixels; right and down are positive
  _pan(t, n) {
    const a = this.domElement;
    if (this.object.isPerspectiveCamera) {
      const i = this.object.position;
      F.copy(i).sub(this.target);
      let s = F.length();
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
    this._rotateLeft(U * this._rotateDelta.x / n.clientHeight), this._rotateUp(U * this._rotateDelta.y / n.clientHeight), this._rotateStart.copy(this._rotateEnd), this.update();
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
        t.ctrlKey || t.metaKey || t.shiftKey ? this.enableRotate && this._rotateUp(U * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(0, this.keyPanSpeed), n = !0;
        break;
      case this.keys.BOTTOM:
        t.ctrlKey || t.metaKey || t.shiftKey ? this.enableRotate && this._rotateUp(-U * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(0, -this.keyPanSpeed), n = !0;
        break;
      case this.keys.LEFT:
        t.ctrlKey || t.metaKey || t.shiftKey ? this.enableRotate && this._rotateLeft(U * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(this.keyPanSpeed, 0), n = !0;
        break;
      case this.keys.RIGHT:
        t.ctrlKey || t.metaKey || t.shiftKey ? this.enableRotate && this._rotateLeft(-U * this.keyRotateSpeed / this.domElement.clientHeight) : this.enablePan && this._pan(-this.keyPanSpeed, 0), n = !0;
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
    this._rotateLeft(U * this._rotateDelta.x / n.clientHeight), this._rotateUp(U * this._rotateDelta.y / n.clientHeight), this._rotateStart.copy(this._rotateEnd);
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
    n === void 0 && (n = new $(), this._pointerPositions[t.pointerId] = n), n.set(t.pageX, t.pageY);
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
function Xn(e) {
  this.enabled !== !1 && (this._pointers.length === 0 && (this.domElement.setPointerCapture(e.pointerId), this.domElement.addEventListener("pointermove", this._onPointerMove), this.domElement.addEventListener("pointerup", this._onPointerUp)), !this._isTrackingPointer(e) && (this._addPointer(e), e.pointerType === "touch" ? this._onTouchStart(e) : this._onMouseDown(e)));
}
function qn(e) {
  this.enabled !== !1 && (e.pointerType === "touch" ? this._onTouchMove(e) : this._onMouseMove(e));
}
function Qn(e) {
  switch (this._removePointer(e), this._pointers.length) {
    case 0:
      this.domElement.releasePointerCapture(e.pointerId), this.domElement.removeEventListener("pointermove", this._onPointerMove), this.domElement.removeEventListener("pointerup", this._onPointerUp), this.dispatchEvent(qt), this.state = R.NONE;
      break;
    case 1:
      const t = this._pointers[0], n = this._pointerPositions[t];
      this._onTouchStart({ pointerId: t, pageX: n.x, pageY: n.y });
      break;
  }
}
function Jn(e) {
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
    case ue.DOLLY:
      if (this.enableZoom === !1) return;
      this._handleMouseDownDolly(e), this.state = R.DOLLY;
      break;
    case ue.ROTATE:
      if (e.ctrlKey || e.metaKey || e.shiftKey) {
        if (this.enablePan === !1) return;
        this._handleMouseDownPan(e), this.state = R.PAN;
      } else {
        if (this.enableRotate === !1) return;
        this._handleMouseDownRotate(e), this.state = R.ROTATE;
      }
      break;
    case ue.PAN:
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
  this.state !== R.NONE && this.dispatchEvent(rt);
}
function ea(e) {
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
function ta(e) {
  this.enabled === !1 || this.enableZoom === !1 || this.state !== R.NONE || (e.preventDefault(), this.dispatchEvent(rt), this._handleMouseWheel(this._customWheelEvent(e)), this.dispatchEvent(qt));
}
function na(e) {
  this.enabled !== !1 && this._handleKeyDown(e);
}
function aa(e) {
  switch (this._trackPointer(e), this._pointers.length) {
    case 1:
      switch (this.touches.ONE) {
        case de.ROTATE:
          if (this.enableRotate === !1) return;
          this._handleTouchStartRotate(e), this.state = R.TOUCH_ROTATE;
          break;
        case de.PAN:
          if (this.enablePan === !1) return;
          this._handleTouchStartPan(e), this.state = R.TOUCH_PAN;
          break;
        default:
          this.state = R.NONE;
      }
      break;
    case 2:
      switch (this.touches.TWO) {
        case de.DOLLY_PAN:
          if (this.enableZoom === !1 && this.enablePan === !1) return;
          this._handleTouchStartDollyPan(e), this.state = R.TOUCH_DOLLY_PAN;
          break;
        case de.DOLLY_ROTATE:
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
  this.state !== R.NONE && this.dispatchEvent(rt);
}
function ia(e) {
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
function sa(e) {
  this.enabled !== !1 && e.preventDefault();
}
function ra(e) {
  e.key === "Control" && (this._controlActive = !0, this.domElement.getRootNode().addEventListener("keyup", this._interceptControlUp, { passive: !0, capture: !0 }));
}
function oa(e) {
  e.key === "Control" && (this._controlActive = !1, this.domElement.getRootNode().removeEventListener("keyup", this._interceptControlUp, { passive: !0, capture: !0 }));
}
const Et = "octane", la = {
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
}, ca = {
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
function da(e) {
  const t = {};
  for (const [n, a] of e)
    for (const i of n)
      t[i] = a;
  return t;
}
const ha = da([
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
function Qt(e) {
  return e.toLowerCase().replace(/[^a-z0-9]+/g, "");
}
function Jt(e) {
  if (!e)
    return null;
  switch (Qt(e)) {
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
function en(e) {
  return e ? ca[Qt(e)] ?? null : null;
}
function ua(e) {
  return Jt(e) ?? en(e);
}
function tn(e) {
  return la[e];
}
function ma(e) {
  return {
    position: [e.offset, 0, e.elevation],
    rotationYDegrees: e.slopeDegrees,
    dimensions: [e.length, e.width, e.height]
  };
}
function et(e, t) {
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
          Array.isArray(a) && (typeof a[0] == "string" && t.push(a[0]), et(a[1], t));
      return;
    }
    if ("Array" in e && Array.isArray(e.Array)) {
      for (const n of e.Array)
        if (Array.isArray(n))
          for (const a of n)
            Array.isArray(a) && (typeof a[0] == "string" && t.push(a[0]), et(a[1], t));
    }
  }
}
function nn(e) {
  const t = Jt(e?.car_hitbox_family);
  if (t)
    return t;
  const n = e?.car_body_id;
  if (typeof n == "number") {
    const r = ha[n];
    if (r)
      return r;
  }
  const a = en(e?.car_body_name);
  if (a)
    return a;
  const i = e?.stats;
  if (!i)
    return Et;
  const s = [];
  for (const [r, o] of Object.entries(i))
    s.push(r), et(o, s);
  for (const r of s) {
    const o = ua(r);
    if (o)
      return o;
  }
  return Et;
}
const an = 0.08, pa = 0.22, fa = 0.94, ot = 1, Ie = 0.32, vt = 1024, ba = 16, ga = 1.5;
function xt(e) {
  const t = new c.MeshBasicMaterial({
    color: e,
    transparent: !0,
    opacity: ot,
    side: c.DoubleSide
  });
  return t.forceSinglePass = !0, t;
}
function ya(e) {
  return new c.MeshLambertMaterial({
    color: e,
    side: c.DoubleSide,
    transparent: !0,
    opacity: ot
  });
}
function oe(e, t, n, a) {
  return new c.Mesh(new c.BoxGeometry(e, n, t, 6, 1, 6), a);
}
function wa(e) {
  return new c.Color(e).lerp(new c.Color(0), fa);
}
function He(e, t, n, a, i, s, r, o) {
  e.beginPath();
  for (let l = 0; l <= t; l += 8) {
    const d = l / t, h = a * n + Math.sin(d * Math.PI * 2 + s) * i + Math.sin(d * Math.PI * 4 + s * 0.5) * i * 0.35;
    l === 0 ? e.moveTo(l, h) : e.lineTo(l, h);
  }
  e.lineWidth = r, e.strokeStyle = o, e.stroke();
}
function We(e, t, n, a, i, s, r, o) {
  e.beginPath();
  for (let l = 0; l <= n; l += 8) {
    const d = l / n, h = a * t + Math.sin(d * Math.PI * 2 + s) * i + Math.sin(d * Math.PI * 6 + s * 0.3) * i * 0.18;
    l === 0 ? e.moveTo(h, l) : e.lineTo(h, l);
  }
  e.lineWidth = r, e.strokeStyle = o, e.stroke();
}
function $e(e, t, n, a, i, s) {
  e.beginPath(), e.arc(t, n, a, 0, Math.PI * 2), e.fillStyle = i, e.fill(), e.lineWidth = Math.max(6, a * 0.15), e.strokeStyle = s, e.stroke();
}
function _a(e) {
  const t = document.createElement("canvas");
  t.width = vt, t.height = vt;
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
  n.lineCap = "round", He(n, a, i, 0.24, 22, 0.35, 18, r), He(n, a, i, 0.5, 14, 1.1, 20, r), He(n, a, i, 0.77, 20, 2.35, 18, r), We(n, a, i, 0.2, 24, 0.2, 18, r), We(n, a, i, 0.48, 18, 1.6, 18, r), We(n, a, i, 0.76, 26, 2.7, 18, r), n.globalAlpha = 0.92, $e(n, a * 0.28, i * 0.32, 88, "#f1a63a", "#fff4d7"), $e(n, a * 0.68, i * 0.6, 72, "#4db0ff", "#eef8ff"), $e(n, a * 0.76, i * 0.2, 54, "#1f232c", "#f0ece1"), n.globalAlpha = 1, n.beginPath(), n.moveTo(a * 0.08, i * 0.86), n.quadraticCurveTo(a * 0.28, i * 0.72, a * 0.42, i * 0.8), n.quadraticCurveTo(a * 0.58, i * 0.9, a * 0.82, i * 0.78), n.lineWidth = 24, n.strokeStyle = "rgba(255, 246, 220, 0.9)", n.stroke();
  const o = new c.CanvasTexture(t);
  return o.colorSpace = c.SRGBColorSpace, o.anisotropy = Math.min(8, e.capabilities.getMaxAnisotropy()), o;
}
function Ea(e, t, n, a) {
  return new c.Mesh(new c.BoxGeometry(e, t, n, 6, 6, 1), a);
}
function va(e) {
  const t = 10280 * e, n = 8240 * e, a = 1960 * e, i = 1e3 * e, s = 1900 * e, r = 800 * e, o = 900 * e, l = Math.max(1, e), d = [], h = [1, -1];
  function u(m, p, f = null) {
    const w = m.material.clone();
    return m.material = w, d.push({
      mesh: m,
      material: w,
      outwardLocal: p.clone().normalize(),
      fixedOpacity: f
    }), m;
  }
  function b(m) {
    const p = new c.Group(), f = xt(m), w = n / 2 - i - s / 2, S = Math.sqrt(2 * Math.pow(i, 2));
    for (const k of h) {
      const _ = u(
        oe(w, a, l, f),
        new c.Vector3(0, 1, 0)
      );
      _.position.set(k * (w / 2 + s / 2), 0, a / 2), p.add(_);
      const P = u(
        oe(S, a, l, f),
        new c.Vector3(0, 1, 0)
      );
      P.position.set(
        k * (n / 2 - i / 2),
        -i / 2,
        a / 2
      ), P.rotateZ(-k * Math.PI / 4), p.add(P);
    }
    const I = u(
      oe(s, a - r, l, f),
      new c.Vector3(0, 1, 0)
    );
    return I.position.set(0, 0, a / 2 + r / 2), p.add(I), p;
  }
  function E(m, p) {
    const f = new c.Group(), w = [
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
    ], S = new c.Shape();
    w.forEach(([v, T], z) => {
      z === 0 ? S.moveTo(v, T) : S.lineTo(v, T);
    });
    const I = ya(m), k = xt(m), _ = u(
      new c.Mesh(new c.ShapeGeometry(S), I),
      new c.Vector3(0, 0, -1)
    );
    _.receiveShadow = !0, f.add(_);
    for (const v of h) {
      const T = u(
        oe(o, r, l, k),
        new c.Vector3(0, -v, 0),
        Ie
      );
      T.position.set(
        v * s / 2,
        t / 2 + o / 2,
        r / 2
      ), T.rotateZ(Math.PI / 2), f.add(T);
    }
    const P = u(
      Ea(s, o, l, k),
      new c.Vector3(0, 0, 1),
      Ie
    );
    P.position.set(0, t / 2 + o / 2, r), f.add(P);
    const O = u(
      oe(s, r, l, k),
      new c.Vector3(0, 1, 0),
      Ie
    );
    O.position.set(0, t / 2 + o, r / 2), f.add(O);
    const B = b(m);
    B.position.y = t / 2, f.add(B);
    for (const v of h) {
      const T = u(
        oe(
          t / 2 - i,
          a,
          l,
          k
        ),
        new c.Vector3(0, -v, 0)
      );
      T.position.set(
        v * n / 2,
        (t / 2 - i) / 2,
        a / 2
      ), T.rotateZ(Math.PI / 2), f.add(T);
    }
    return p && f.rotateZ(Math.PI), f;
  }
  const y = new c.Group();
  return y.add(E(16771251, !1)), y.add(E(8381439, !0)), { stadium: y, wallPanels: d };
}
function xa(e, t) {
  const n = ma(e), a = wa(t), i = new c.Group();
  i.name = `${e.kind}-hitbox-overlay`, i.visible = !1, i.position.set(...n.position), i.rotateY(c.MathUtils.degToRad(n.rotationYDegrees));
  const s = new c.BoxGeometry(...n.dimensions), r = new c.MeshBasicMaterial({
    color: a,
    transparent: !0,
    opacity: an,
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
function Ma(e, t) {
  const n = e.getObjectByName("hitbox-overlay-fill");
  n && (n.material.opacity = t ? pa : an);
}
function ka(e) {
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
  const b = new c.MeshBasicMaterial({
    color: 8968191,
    transparent: !0,
    opacity: 0.34,
    side: c.DoubleSide
  }), E = new c.BufferGeometry();
  E.setAttribute(
    "position",
    new c.Float32BufferAttribute(
      [90, -110, 95, -90, -110, 95, 140, -210, 25, -140, -210, 25],
      3
    )
  ), E.setIndex([0, 2, 3, 0, 3, 1]), E.computeVertexNormals();
  const y = new c.Mesh(E, b);
  y.position.z = 2, s.add(y);
  const m = new c.MeshPhongMaterial({
    color: 2236962,
    shininess: 48
  }), p = (f, w, S, I) => {
    const k = new c.Mesh(new c.CylinderGeometry(70, 70, I, 10), m);
    return k.rotateZ(Math.PI / 2), k.position.set(f, w, S), k.castShadow = !0, k;
  };
  return s.add(p(120, -300, -60, 50)), s.add(p(-120, -300, -60, 50)), s.add(p(120, 150, -60, 70)), s.add(p(-120, 150, -60, 70)), s.position.set(0, 0, 50), s.rotateZ(Math.PI / 2), s.scale.set(0.35, 0.35, 0.35), i.add(s), i;
}
function Sa() {
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
    const b = new c.Mesh(a, u);
    b.name = "glow", b.position.x = -10, r.add(b), e.add(r);
  }
  return e;
}
function Ta() {
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
  const u = new c.PlaneGeometry(a, i), b = new c.MeshBasicMaterial({
    color: 16761415,
    transparent: !0,
    opacity: 0.98,
    side: c.DoubleSide,
    depthWrite: !1
  }), E = new c.Mesh(u, b);
  E.position.y = -18, e.add(E);
  const y = document.createElement("canvas");
  y.width = 512, y.height = 160;
  const m = y.getContext("2d");
  if (!m)
    throw new Error("Unable to create boost meter label context");
  const p = new c.CanvasTexture(y);
  p.colorSpace = c.SRGBColorSpace, p.needsUpdate = !0;
  const f = new c.PlaneGeometry(190, 48), w = new c.MeshBasicMaterial({
    map: p,
    transparent: !0,
    depthWrite: !1,
    side: c.DoubleSide
  }), S = new c.Mesh(f, w);
  return S.position.set(0, 15, 0), e.add(S), {
    group: e,
    fillMesh: E,
    fillMaterial: b,
    labelTexture: p,
    labelContext: m,
    labelCanvas: y,
    lastPercent: null
  };
}
function Pa() {
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
function Ca(e, t, n, a) {
  e.fillMesh.scale.x = Math.max(1e-3, t);
  const i = 94;
  e.fillMesh.position.x = -(1 - t) * i, e.fillMesh.position.y = -18;
  const s = Math.max(0, Math.min(100, Math.round(Xt(n))));
  if (e.lastPercent !== s) {
    const { labelContext: r, labelCanvas: o, labelTexture: l } = e;
    r.clearRect(0, 0, o.width, o.height), r.textAlign = "center", r.textBaseline = "middle", r.lineJoin = "round", r.font = "700 84px sans-serif", r.lineWidth = 18, r.strokeStyle = "rgba(7, 19, 29, 0.92)", r.strokeText(`${s}`, o.width / 2, 78), r.fillStyle = "#fff8e1", r.fillText(`${s}`, o.width / 2, 78), r.font = "600 30px sans-serif", r.lineWidth = 10, r.strokeText("BOOST", o.width / 2, 130), r.fillStyle = "#ffcf70", r.fillText("BOOST", o.width / 2, 130), l.needsUpdate = !0, e.lastPercent = s;
  }
  e.group.quaternion.copy(a.quaternion);
}
function Ia(e) {
  e.add(new c.AmbientLight("#d8ecff", 1.6));
  const t = new c.DirectionalLight("#fff6df", 2.4);
  t.position.set(4e3, -6e3, 5e3), e.add(t);
  const n = new c.DirectionalLight("#97d7ff", 1.2);
  n.position.set(-5e3, 4e3, 3e3), e.add(n);
}
function Aa(e) {
  const t = _a(e), n = new c.MeshPhongMaterial({
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
function Ra(e, t, n) {
  const a = new c.Scene();
  a.background = new c.Color("#081119");
  const i = new c.PerspectiveCamera(48, 1, 10 * n, 5e5 * n);
  i.up.set(0, 0, 1), i.position.set(0, -9e3 * n, 5e3 * n), i.lookAt(0, 0, 0);
  const s = new c.WebGLRenderer({
    antialias: !1,
    powerPreference: "high-performance"
  });
  s.setPixelRatio(Math.min(window.devicePixelRatio || 1, ga)), s.domElement.style.display = "block", s.domElement.style.width = "100%", s.domElement.style.height = "100%", s.domElement.tabIndex = 0, s.domElement.setAttribute("aria-label", "Replay player viewport"), e.replaceChildren(s.domElement);
  const r = new Zn(i, s.domElement);
  r.enableDamping = !0, r.maxDistance = 16e4 * n, r.keyPanSpeed = ba, r.target.set(0, 0, 600 * n), r.listenToKeyEvents(s.domElement), r.update();
  const o = () => {
    s.domElement.focus();
  };
  s.domElement.addEventListener("pointerdown", o);
  const { stadium: l, wallPanels: d } = va(n);
  a.add(l), Ia(a);
  const h = new c.Group();
  h.scale.set(-n, n, n), a.add(h);
  const { mesh: u, texture: b } = Aa(s);
  h.add(u);
  const E = /* @__PURE__ */ new Map(), y = /* @__PURE__ */ new Map(), m = /* @__PURE__ */ new Map(), p = /* @__PURE__ */ new Map(), f = /* @__PURE__ */ new Map(), w = /* @__PURE__ */ new Map();
  for (const v of t.players) {
    const T = new c.Group(), z = v.isTeamZero ? "#57a8ff" : "#ff9c40", j = ka(z), G = xa(v.hitbox, z);
    T.add(j), T.add(G);
    const Z = Sa();
    T.add(Z);
    const q = Ta();
    T.add(q.group);
    const H = Pa();
    h.add(T), h.add(H.group), E.set(v.id, T), y.set(v.id, j), m.set(v.id, G), p.set(v.id, Z), f.set(v.id, q), w.set(v.id, H);
  }
  const S = () => {
    const v = e.clientWidth || 1, T = e.clientHeight || 1;
    i.aspect = v / T, i.updateProjectionMatrix(), s.setSize(v, T, !1);
  };
  S();
  const I = new c.Vector3(), k = new c.Vector3(), _ = new c.Quaternion(), P = new c.Vector3();
  return {
    scene: a,
    replayRoot: h,
    camera: i,
    renderer: s,
    controls: r,
    resize: S,
    dispose: () => {
      s.domElement.removeEventListener("pointerdown", o), r.stopListenToKeyEvents(), r.dispose(), b.dispose(), s.dispose(), e.replaceChildren();
    },
    ballMesh: u,
    playerMeshes: E,
    playerBodyMeshes: y,
    playerHitboxes: m,
    playerBoostTrails: p,
    playerBoostMeters: f,
    playerDemoIndicators: w,
    updateWallVisibility: () => {
      a.updateMatrixWorld(!0);
      for (const v of d) {
        if (v.fixedOpacity !== null) {
          v.material.transparent = !0, v.material.opacity = v.fixedOpacity, v.material.depthWrite = !1;
          continue;
        }
        v.mesh.getWorldPosition(I), v.mesh.getWorldQuaternion(_), k.copy(v.outwardLocal).applyQuaternion(_).normalize(), P.copy(i.position).sub(I);
        const T = k.dot(P) > 0;
        v.material.transparent = !0, v.material.opacity = T ? Ie : ot, v.material.depthWrite = !T;
      }
    }
  };
}
function Y(e) {
  const [t, n] = Object.entries(e)[0] ?? ["Unknown", "unknown"];
  return typeof n == "string" || typeof n == "number" ? `${t}:${n}` : n && typeof n == "object" ? `${t}:${JSON.stringify(n)}` : `${t}:${JSON.stringify(n)}`;
}
function fe(e, t) {
  return Math.max(0, e - t);
}
function ze(e) {
  return new Map(e.map((t) => [t.id, t]));
}
const X = 70, Mt = 73, Da = 3072, Oa = 4096, La = 1792, Na = 4184, Ba = 940, za = 3308, Fa = 2816, kt = 3584, Ua = 2484, Ga = 1788, Va = 2300, ja = 2048, Ha = 1036, Wa = 1024, $a = 1024, Ka = 4240, lt = 34;
function Le(e, t, n, a, i) {
  e.push({
    index: e.length,
    padId: null,
    size: i,
    position: { x: t, y: n, z: a },
    events: []
  });
}
function Ne(e, t, n, a, i) {
  Le(e, -t, n, a, i), Le(e, t, n, a, i);
}
function Ke(e, t, n, a, i) {
  Le(e, t, -n, a, i), Le(e, t, n, a, i);
}
function le(e, t, n, a, i) {
  Ne(e, t, -n, a, i), Ne(e, t, n, a, i);
}
function sn() {
  const e = [];
  return Ke(e, 0, Ka, X, "small"), le(e, La, Na, X, "small"), le(e, Da, Oa, Mt, "big"), le(e, Ba, za, X, "small"), Ke(e, 0, Fa, X, "small"), le(e, kt, Ua, X, "small"), le(e, Ga, Va, X, "small"), le(e, ja, Ha, X, "small"), Ke(e, 0, $a, X, "small"), Ne(e, kt, 0, Mt, "big"), Ne(e, Wa, 0, X, "small"), e;
}
function _e(e) {
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
function rn(e) {
  return e === "big" || e === "Big" ? "big" : e === "small" || e === "Small" ? "small" : null;
}
function on(e) {
  let t = null;
  for (const n of e) {
    const a = _e(n.kind);
    if (a === !1) {
      t = n.time;
      continue;
    }
    if (a === !0 && t !== null)
      return n.time - t >= 7 ? "big" : "small";
  }
  return null;
}
function Ya(e, t, n, a) {
  const i = ze(t), s = /* @__PURE__ */ new Map();
  for (const d of e.boost_pad_events ?? []) {
    if (_e(d.kind) === null) {
      a?.advance();
      continue;
    }
    const u = s.get(d.pad_id);
    u ? u.push(d) : s.set(d.pad_id, [d]), a?.advance();
  }
  const r = e.boost_pads;
  if (!r || r.length === 0)
    return a?.advance(lt), sn();
  const o = [...r].sort((d, h) => d.index - h.index), l = new Array(o.length);
  for (let d = 0; d < o.length; d += 1) {
    const h = o[d], u = typeof h.pad_id == "string" ? h.pad_id : null, b = u ? [...s.get(u) ?? []] : [], E = rn(h.size) ?? on(b) ?? (h.position.z >= 72 ? "big" : "small"), y = b.sort((p, f) => p.time - f.time), m = new Array(y.length);
    for (let p = 0; p < y.length; p += 1) {
      const f = y[p], w = f.player ? Y(f.player) : null;
      m[p] = {
        time: fe(f.time, n),
        frame: f.frame,
        available: _e(f.kind) ?? !0,
        playerId: w,
        playerName: w ? i.get(w)?.name ?? w : null
      };
    }
    l[d] = {
      index: h.index,
      padId: u,
      size: E,
      position: h.position,
      events: m
    }, a?.advance();
  }
  return l;
}
async function Za(e, t, n, a) {
  const i = ze(t), s = /* @__PURE__ */ new Map();
  for (const d of e.boost_pad_events ?? []) {
    if (_e(d.kind) === null) {
      a.advance() && await a.yieldToMainThread();
      continue;
    }
    const u = s.get(d.pad_id);
    u ? u.push(d) : s.set(d.pad_id, [d]), a.advance() && await a.yieldToMainThread();
  }
  const r = e.boost_pads;
  if (!r || r.length === 0)
    return a.advance(lt) && await a.yieldToMainThread(), sn();
  const o = [...r].sort((d, h) => d.index - h.index), l = new Array(o.length);
  for (let d = 0; d < o.length; d += 1) {
    const h = o[d], u = typeof h.pad_id == "string" ? h.pad_id : null, b = u ? [...s.get(u) ?? []] : [], E = rn(h.size) ?? on(b) ?? (h.position.z >= 72 ? "big" : "small"), y = b.sort((p, f) => p.time - f.time), m = new Array(y.length);
    for (let p = 0; p < y.length; p += 1) {
      const f = y[p], w = f.player ? Y(f.player) : null;
      m[p] = {
        time: fe(f.time, n),
        frame: f.frame,
        available: _e(f.kind) ?? !0,
        playerId: w,
        playerName: w ? i.get(w)?.name ?? w : null
      };
    }
    l[d] = {
      index: h.index,
      padId: u,
      size: E,
      position: h.position,
      events: m
    }, a.advance() && await a.yieldToMainThread();
  }
  return l;
}
function ct(e) {
  return Number.isInteger(e.frame) && e.frame >= 0 ? e.frame : null;
}
function Xa(e, t) {
  if (typeof e.time == "number" && Number.isFinite(e.time))
    return e.time;
  const n = ct(e);
  if (n === null)
    return null;
  const a = t.frame_data.metadata_frames[n]?.time;
  return typeof a == "number" && Number.isFinite(a) ? a : null;
}
function qa(e, t) {
  return `bookmark:${ct(e) ?? "unknown"}:${e.description || "tick-mark"}:${t}`;
}
function ln(e, t, n) {
  return (e.replay_tick_marks ?? []).flatMap((a, i) => {
    n?.advance();
    const s = Xa(a, e);
    return s === null ? [] : [
      {
        id: qa(a, i),
        description: a.description,
        frame: ct(a),
        time: fe(s, t)
      }
    ];
  });
}
function cn(e) {
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
const ne = {
  distance: 270,
  height: 100,
  pitch: -4,
  fov: 110
}, Qa = 5e-3, Ja = Number.POSITIVE_INFINITY, ei = 16;
function St(e) {
  const t = Math.hypot(e.x, e.y, e.z);
  return t < 1e-6 ? null : {
    x: e.x / t,
    y: e.y / t,
    z: e.z / t
  };
}
function dn(e) {
  const t = Math.hypot(e.x, e.y, e.z, e.w);
  return t < 1e-6 ? null : {
    x: e.x / t,
    y: e.y / t,
    z: e.z / t,
    w: e.w / t
  };
}
function Tt(e, t) {
  return {
    w: e.w * t.w - e.x * t.x - e.y * t.y - e.z * t.z,
    x: e.w * t.x + e.x * t.w + e.y * t.z - e.z * t.y,
    y: e.w * t.y - e.x * t.z + e.y * t.w + e.z * t.x,
    z: e.w * t.z + e.x * t.y - e.y * t.x + e.z * t.w
  };
}
function Pt(e, t) {
  const n = Tt(
    Tt(t, {
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
function hn(e) {
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
    rotation: dn(t.rotation)
  };
}
function un(e) {
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
  const t = e.Data.rigid_body, n = dn(t.rotation), a = n ? St(Pt({ x: 1, y: 0, z: 0 }, n)) : null, i = n ? St(Pt({ x: 0, y: 0, z: 1 }, n)) : null;
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
function ti(e) {
  return e.position !== null;
}
function ni(e) {
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
function mn(e) {
  let t = null, n = null;
  for (let a = 0; a < e.length; a += 1) {
    const i = e[a];
    if (ti(i)) {
      if (n !== null && t) {
        const s = ni(t);
        for (let r = n; r < a; r += 1)
          e[r] = s;
      }
      t = i, n = null;
    } else t && n === null && (n = a);
  }
}
function Ct() {
  return typeof performance > "u" ? Date.now() : performance.now();
}
function ai() {
  return new Promise((e) => setTimeout(e, 0));
}
function ii(e) {
  const t = e.meta.team_zero.length + e.meta.team_one.length, n = e.frame_data.players.reduce(
    (r, [, o]) => r + o.frames.length,
    0
  ), a = e.boost_pads?.length ?? lt, i = e.boost_pad_events?.length ?? 0, s = (e.goal_events?.length ?? 0) + (e.player_stat_events?.length ?? 0) + (e.demolish_infos?.length ?? 0) + (e.replay_tick_marks?.length ?? 0);
  return [
    Math.max(1, e.frame_data.metadata_frames.length),
    Math.max(1, t),
    Math.max(1, n),
    Math.max(1, e.frame_data.ball_data.frames.length),
    Math.max(1, a + i),
    Math.max(1, s)
  ].reduce((r, o) => r + o, 0);
}
function si(e) {
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
function pn(e, t, n = {}) {
  const a = ii(e), i = si(e);
  let s = 0, r = 0, o = -1, l = -1, d = Ct();
  const h = n.yieldEveryMs ?? Number.POSITIVE_INFINITY, u = n.progressReportMinDelta ?? Qa, b = Math.max(
    1,
    n.progressReportFrameInterval ?? Ja
  ), E = () => {
    if (!t)
      return !1;
    const m = Math.max(0, Math.min(1, s / a));
    if (m <= o)
      return !1;
    const f = r - l >= b;
    return m >= 1 || m - o >= u || f ? (o = m, l = r, t(m, {
      progress: m,
      processedFrames: Math.min(r, i),
      totalFrames: i,
      processedUnits: s,
      totalUnits: a
    }), !0) : !1;
  }, y = (m = !1) => {
    const p = Ct();
    return !m && p - d < h ? !1 : (d = p, !0);
  };
  return E(), {
    advance(m = 1) {
      if (m <= 0)
        return !1;
      s = Math.min(a, s + m);
      const p = E();
      return y(p);
    },
    advanceFrame(m = 1) {
      if (m <= 0)
        return !1;
      r = Math.min(i, r + m), s = Math.min(a, s + m);
      const p = E();
      return y(p);
    },
    finish() {
      s = a, r = i, E();
    }
  };
}
function ri(e, t) {
  return {
    ...pn(e, t.onProgress, {
      progressReportMinDelta: t.progressReportMinDelta,
      progressReportFrameInterval: t.progressReportFrameInterval,
      yieldEveryMs: t.yieldEveryMs ?? ei
    }),
    yieldToMainThread: t.yieldToMainThread ?? ai
  };
}
function oi(e, t) {
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
async function li(e, t) {
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
function fn(e, t, n, a) {
  return t.has(e) ? !0 : n.has(e) ? !1 : a && a !== "Empty" && typeof a.Data.is_team_0 == "boolean" ? a.Data.is_team_0 : !0;
}
function ci(e) {
  return e ? Object.entries(e) : [];
}
function ae(e, t) {
  const n = e.find(([a]) => a === t)?.[1];
  return typeof n == "number" && Number.isFinite(n) ? n : void 0;
}
function bn(e) {
  const t = ci(e?.stats);
  return {
    fov: ae(t, "CameraFOV") ?? ne.fov,
    height: ae(t, "CameraHeight") ?? ne.height,
    pitch: ae(t, "CameraPitch") ?? ne.pitch,
    distance: ae(t, "CameraDistance") ?? ne.distance,
    stiffness: ae(t, "CameraStiffness") ?? ne.stiffness,
    swivelSpeed: ae(t, "CameraSwivelSpeed") ?? ne.swivelSpeed,
    transitionSpeed: ae(t, "CameraTransitionSpeed") ?? ne.transitionSpeed
  };
}
function di(e, t) {
  const n = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), i = [...e.meta.team_zero, ...e.meta.team_one];
  if (i.length === 0)
    return t?.advance(), { byId: n, byName: a };
  for (const s of i)
    a.set(s.name, s), s.remote_id && n.set(Y(s.remote_id), s), t?.advance();
  return { byId: n, byName: a };
}
async function hi(e, t) {
  const n = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), i = [...e.meta.team_zero, ...e.meta.team_one];
  if (i.length === 0)
    return t.advance() && await t.yieldToMainThread(), { byId: n, byName: a };
  for (const s of i)
    a.set(s.name, s), s.remote_id && n.set(Y(s.remote_id), s), t.advance() && await t.yieldToMainThread();
  return { byId: n, byName: a };
}
function ui(e, t) {
  const n = new Set(e.meta.team_zero.map((o) => o.name)), a = new Set(e.meta.team_one.map((o) => o.name)), i = di(e, t), s = [];
  let r = 0;
  for (const [o, l] of e.frame_data.players) {
    const d = new Array(l.frames.length);
    let h;
    for (let y = 0; y < l.frames.length; y += 1) {
      const m = l.frames[y];
      h === void 0 && m !== "Empty" && (h = m), d[y] = un(m), r += 1, t?.advanceFrame();
    }
    mn(d);
    const u = Y(o), b = h !== void 0 && h.Data.player_name ? h.Data.player_name : i.byId.get(u)?.name ?? u, E = i.byId.get(u) ?? i.byName.get(b);
    s.push({
      id: u,
      name: b,
      isTeamZero: fn(b, n, a, h),
      cameraSettings: bn(E),
      hitbox: tn(nn(E)),
      frames: d
    });
  }
  return r === 0 && t?.advanceFrame(), s;
}
async function mi(e, t) {
  const n = new Set(e.meta.team_zero.map((o) => o.name)), a = new Set(e.meta.team_one.map((o) => o.name)), i = await hi(e, t), s = [];
  let r = 0;
  for (const [o, l] of e.frame_data.players) {
    const d = new Array(l.frames.length);
    let h;
    for (let y = 0; y < l.frames.length; y += 1) {
      const m = l.frames[y];
      h === void 0 && m !== "Empty" && (h = m), d[y] = un(m), r += 1, t.advanceFrame() && await t.yieldToMainThread();
    }
    mn(d);
    const u = Y(o), b = h !== void 0 && h.Data.player_name ? h.Data.player_name : i.byId.get(u)?.name ?? u, E = i.byId.get(u) ?? i.byName.get(b);
    s.push({
      id: u,
      name: b,
      isTeamZero: fn(b, n, a, h),
      cameraSettings: bn(E),
      hitbox: tn(nn(E)),
      frames: d
    });
  }
  return r === 0 && t.advanceFrame() && await t.yieldToMainThread(), s;
}
function pi(e, t) {
  const n = e.frame_data.ball_data.frames;
  if (n.length === 0)
    return t?.advanceFrame(), [];
  const a = new Array(n.length);
  for (let i = 0; i < n.length; i += 1)
    a[i] = hn(n[i]), t?.advanceFrame();
  return a;
}
async function fi(e, t) {
  const n = e.frame_data.ball_data.frames;
  if (n.length === 0)
    return t.advanceFrame() && await t.yieldToMainThread(), [];
  const a = new Array(n.length);
  for (let i = 0; i < n.length; i += 1)
    a[i] = hn(n[i]), t.advanceFrame() && await t.yieldToMainThread();
  return a;
}
function dt(e, t, n) {
  return `${e}:${t}:${n}`;
}
function gn(e) {
  return e.sort((t, n) => t.time !== n.time ? t.time - n.time : (t.frame ?? 0) - (n.frame ?? 0));
}
function yn(e, t, n) {
  const a = e.player ? Y(e.player) : null, i = a ? t.get(a)?.name ?? a : null, s = i ? `${i} scored` : "Goal";
  return {
    id: dt("goal", e.frame, a ?? "team"),
    time: fe(e.time, n),
    frame: e.frame,
    kind: "goal",
    label: s,
    shortLabel: "G",
    playerId: a,
    playerName: i,
    isTeamZero: e.scoring_team_is_team_0
  };
}
function wn(e, t, n) {
  const a = Y(e.player), i = t.get(a)?.name ?? a, s = e.kind.toLowerCase(), r = e.kind === "Shot" ? "shot" : e.kind === "Save" ? "save" : "assist", o = e.kind === "Shot" ? "SH" : e.kind === "Save" ? "SV" : "A";
  return {
    id: dt(s, e.frame, a),
    time: fe(e.time, n),
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
function _n(e, t, n) {
  const a = Y(e.attacker), i = Y(e.victim), s = t.get(a), r = t.get(i);
  return {
    id: dt("demo", e.frame, `${a}:${i}`),
    time: fe(e.time, n),
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
function bi(e, t, n, a, i) {
  const s = ze(t), r = [];
  for (const o of e.goal_events ?? [])
    r.push(yn(o, s, a)), i?.advance();
  for (const o of e.player_stat_events ?? [])
    r.push(wn(o, s, a)), i?.advance();
  for (const o of e.demolish_infos ?? [])
    r.push(_n(o, s, a)), i?.advance();
  for (const o of n)
    r.push(cn(o));
  return r.length === 0 && i?.advance(), gn(r);
}
async function gi(e, t, n, a, i) {
  const s = ze(t), r = [];
  for (const o of e.goal_events ?? [])
    r.push(yn(o, s, a)), i.advance() && await i.yieldToMainThread();
  for (const o of e.player_stat_events ?? [])
    r.push(wn(o, s, a)), i.advance() && await i.yieldToMainThread();
  for (const o of e.demolish_infos ?? [])
    r.push(_n(o, s, a)), i.advance() && await i.yieldToMainThread();
  for (const o of n)
    r.push(cn(o));
  return r.length === 0 && i.advance() && await i.yieldToMainThread(), gn(r);
}
function Lr(e, t = {}) {
  const n = pn(e, t.onProgress, {
    progressReportMinDelta: t.progressReportMinDelta,
    progressReportFrameInterval: t.progressReportFrameInterval
  }), a = e.frame_data.metadata_frames[0]?.time ?? 0, i = oi(e, n), s = ui(e, n), r = pi(e, n), o = Ya(e, s, a, n), l = ln(e, a, n), d = bi(e, s, l, a, n);
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
async function yi(e, t = {}) {
  const n = ri(e, t), a = e.frame_data.metadata_frames[0]?.time ?? 0, i = await li(e, n), s = await mi(e, n), r = await fi(e, n), o = await Za(e, s, a, n), l = ln(e, a, n), d = await gi(
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
function pe(e, t) {
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
function wi(e, t) {
  return e.frames.length === 0 ? 0 : c.MathUtils.clamp(Math.round(t), 0, e.frames.length - 1);
}
function _i(e) {
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
function Ei(e, t) {
  if (t === null)
    return null;
  for (const n of e.frames) {
    if (n.gameState === t)
      break;
    return n.gameState;
  }
  return null;
}
function En(e, t) {
  return t === null ? e.kickoffCountdown <= 0 : e.gameState === t;
}
function ht(e, t) {
  return e.kickoffCountdown > 0 ? !0 : t !== null && e.gameState === t;
}
function vi(e, t) {
  return e.ballFrames[t]?.position ? !0 : e.players.some((n) => n.frames[t]?.position);
}
function xi(e, t, n, a) {
  return ht(t, a) && vi(e, n);
}
function Ae(e, t, n, a, i) {
  return !En(t, a) && !xi(e, t, n, i);
}
function It(e, t, n, a, i, s, r) {
  return a && Ae(e, t, n, s, r) || i && ht(t, r);
}
function Mi(e, t, n, a, i) {
  const s = [], { frames: r } = e;
  if (r.length === 0 || !t && !n)
    return s;
  let o = 0;
  for (; o < r.length; ) {
    const l = r[o];
    if (!l || !It(
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
    for (; h < r.length && It(
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
      const b = s.at(-1);
      b && b.endTime >= d ? b.endTime = Math.max(b.endTime, u) : s.push({ startTime: d, endTime: u });
    }
    o = h;
  }
  return s;
}
function ki(e, t, n) {
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
function Si(e, t, n, a) {
  return c.MathUtils.clamp(a, 0, e);
}
function Ti(e, t) {
  const n = t.at(-1);
  return !n || n.endTime < e ? e : c.MathUtils.clamp(n.startTime, 0, e);
}
function Pi(e, t, n) {
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
function Ci(e, t) {
  const n = pe(e, t), a = Math.min(n + 1, e.frames.length - 1);
  if (a === n)
    return { frameIndex: n, nextFrameIndex: a, alpha: 0, dt: 0 };
  const i = e.frames[n]?.time ?? 0, s = e.frames[a]?.time ?? i;
  return s <= i ? { frameIndex: n, nextFrameIndex: a, alpha: 0, dt: 0 } : {
    frameIndex: n,
    nextFrameIndex: a,
    alpha: c.MathUtils.clamp((t - i) / (s - i), 0, 1),
    dt: s - i
  };
}
const Ii = 1.4, ce = 0.18, Te = 0.14, Ai = 120, At = 90, Ri = 40, Di = 45, Oi = 0.58, Rt = 0.82, Li = 132, vn = new c.Vector3(-1, 0, 0), re = new c.Vector3(0, 0, 1), Ni = new c.Vector3(-1, 0, 0), Bi = new c.Vector3(0, 0, 18800), zi = new c.Vector3(0, 0, 700), Fi = new c.Vector3(-9600, -12600, 6400), Ui = new c.Vector3(0, 0, 900), Be = 48, Gi = 16, Vi = 16, ji = 3e-3, Hi = 0.05;
function Re(e, t, n) {
  return e ? !t || n <= 0 ? e : {
    x: c.MathUtils.lerp(e.x, t.x, n),
    y: c.MathUtils.lerp(e.y, t.y, n),
    z: c.MathUtils.lerp(e.z, t.z, n)
  } : t;
}
function ut(e, t, n, a, i, s) {
  const r = Re(e, t, s);
  if (!e || !t || !n || !a || i <= 0 || s <= 0 || s >= 1)
    return r;
  const o = s, l = o * o, d = l * o, h = 2 * d - 3 * l + 1, u = d - 2 * l + o, b = -2 * d + 3 * l, E = d - l, y = (p, f, w, S) => h * p + u * w * i + b * f + E * S * i, m = {
    x: y(e.x, t.x, n.x, a.x),
    y: y(e.y, t.y, n.y, a.y),
    z: y(e.z, t.z, n.z, a.z)
  };
  if (r) {
    const p = m.x - r.x, f = m.y - r.y, w = m.z - r.z, S = p * p + f * f + w * w, I = t.x - e.x, k = t.y - e.y, _ = t.z - e.z, P = I * I + k * k + _ * _;
    if (S > P)
      return r;
  }
  return m;
}
function xn(e, t, n) {
  const a = e ?? t;
  if (!a)
    return null;
  const i = new c.Quaternion(a.x, a.y, a.z, a.w);
  return !t || n <= 0 || e === null ? i : i.slerp(new c.Quaternion(t.x, t.y, t.z, t.w), n);
}
function mt(e) {
  return new c.Vector3(e.x, e.y, e.z);
}
function Mn(e, t) {
  return new c.Vector3(
    -e.x * t,
    e.y * t,
    e.z * t
  );
}
function Ye(e) {
  return new c.Vector3(-e.x, e.y, e.z).normalize();
}
function Wi(e, t) {
  switch (e) {
    case "overhead":
      return {
        position: Bi.clone().multiplyScalar(t),
        target: zi.clone().multiplyScalar(t),
        up: Ni.clone(),
        fov: Be
      };
    case "side":
      return {
        position: Fi.clone().multiplyScalar(t),
        target: Ui.clone().multiplyScalar(t),
        up: re.clone(),
        fov: Be
      };
  }
}
function $i(e) {
  const { fov: t, position: n, sceneState: a, target: i, up: s } = e, { camera: r, controls: o } = a;
  o.enabled = !1, r.position.lerp(n, Te), o.target.lerp(i, Te), r.up.lerp(s, Te).normalize(), r.fov = c.MathUtils.lerp(r.fov, t, Te), r.updateProjectionMatrix(), r.lookAt(o.target);
  const l = r.position.distanceToSquared(n) <= Gi, d = o.target.distanceToSquared(i) <= Vi, h = r.up.angleTo(s) <= ji, u = Math.abs(r.fov - t) <= Hi;
  return !l || !d || !h || !u ? !1 : (r.position.copy(n), o.target.copy(i), r.up.copy(s).normalize(), r.fov = t, r.updateProjectionMatrix(), r.lookAt(i), o.enabled = !0, !0);
}
function Ki(e, t, n, a) {
  return !t || a <= 0 || t.isPresent === !1 || !t.position ? e : {
    ...e,
    position: ut(
      e.position ?? null,
      t.position,
      e.linearVelocity ?? null,
      t.linearVelocity ?? null,
      n,
      a
    ) ?? e.position,
    forward: Re(e.forward ?? null, t.forward ?? null, a) ?? e.forward,
    up: Re(e.up ?? null, t.up ?? null, a) ?? e.up,
    linearVelocity: Re(e.linearVelocity ?? null, t.linearVelocity ?? null, a) ?? e.linearVelocity
  };
}
function Yi(e) {
  const t = e.linearVelocity ? Ye(e.linearVelocity) : null, n = e.forward ? Ye(e.forward) : null, a = e.up ? Ye(e.up) : null;
  if ((e.position?.z ?? 1 / 0) < Ai) {
    const l = (n ?? t ?? vn.clone()).clone().setZ(0);
    if (l.lengthSq() < 1e-4)
      return null;
    l.normalize(), t && t.lengthSq() > 1e-4 && l.dot(t) < 0 && l.negate();
    const d = new c.Vector3().crossVectors(re, l).normalize(), h = new c.Vector3().crossVectors(l, d).normalize();
    return { forward: l, up: h, right: d };
  }
  if (!n || !a)
    return null;
  const s = n.clone().normalize(), r = new c.Vector3().crossVectors(a, s).normalize(), o = new c.Vector3().crossVectors(s, r).normalize();
  return { forward: s, up: o, right: r };
}
function Zi(e) {
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
    nextFrameIndex: b,
    alpha: E,
    dt: y,
    replay: m,
    sceneState: p
  } = e, f = p.controls;
  if (t === "free") {
    f.enabled = !0, p.camera.fov = c.MathUtils.lerp(
      p.camera.fov,
      Be,
      ce
    ), p.camera.updateProjectionMatrix();
    return;
  }
  if (!n) {
    f.enabled = !0, p.camera.fov = c.MathUtils.lerp(
      p.camera.fov,
      Be,
      ce
    ), p.camera.updateProjectionMatrix();
    return;
  }
  const w = m.players.find((ee) => ee.id === n), S = w?.frames[u];
  if (!w || d || !S?.position || S.isPresent === !1) {
    f.enabled = !0;
    return;
  }
  f.enabled = !1;
  const I = w.frames[b] ?? S, k = Ki(S, I, y, E), _ = Mn(k.position ?? S.position, h), P = Yi(k), O = P?.forward ?? vn.clone(), B = P?.right ?? new c.Vector3(0, 1, 0), v = {
    ...w.cameraSettings,
    ...r ?? {}
  }, T = (v.distance ?? 270) * h * s, z = (v.height ?? 100) * h * Ii, j = c.MathUtils.degToRad(v.pitch ?? -4), G = O.clone().applyAxisAngle(B, j).normalize(), Z = _.clone().addScaledVector(re, z), q = O.clone().multiplyScalar(-T).addScaledVector(re, z).applyAxisAngle(B, j), H = _.clone().addScaledVector(re, Ri * h);
  let Q = v.fov ?? 110;
  if (a && i) {
    const ee = i.clone().addScaledVector(re, Di * h), ve = ee.clone().sub(H), xe = (ve.lengthSq() > 1e-4 ? ve.normalize() : G.clone()).multiplyScalar(Rt).addScaledVector(G, 1 - Rt).normalize();
    l.copy(H).lerp(ee, Oi), o.copy(Z).addScaledVector(xe, -T), o.z = Math.max(At * h, o.z);
    const be = H.clone().sub(o), Me = ee.clone().sub(o);
    if (be.lengthSq() > 1e-4 && Me.lengthSq() > 1e-4) {
      const ke = be.angleTo(Me);
      Q = Math.min(
        Li,
        Math.max(Q, c.MathUtils.radToDeg(ke) * 1.7)
      );
    }
  } else
    o.copy(H).add(q), o.z = Math.max(At * h, o.z), l.copy(H);
  p.camera.position.lerp(o, ce), p.camera.up.lerp(re, ce).normalize(), f.target.lerp(l, ce), p.camera.fov = c.MathUtils.lerp(p.camera.fov, Q, ce), p.camera.updateProjectionMatrix(), p.camera.lookAt(f.target);
}
const Xi = 2.25, kn = 3.2, De = "free";
function ie(e) {
  return typeof e == "number" && Number.isFinite(e) ? e : void 0;
}
function tt(e) {
  if (!e)
    return null;
  const t = {}, n = ie(e.fov), a = ie(e.height), i = ie(e.pitch), s = ie(e.distance), r = ie(e.stiffness), o = ie(e.swivelSpeed), l = ie(e.transitionSpeed);
  return n !== void 0 && (t.fov = n), a !== void 0 && (t.height = a), i !== void 0 && (t.pitch = i), s !== void 0 && (t.distance = s), r !== void 0 && (t.stiffness = r), o !== void 0 && (t.swivelSpeed = o), l !== void 0 && (t.transitionSpeed = l), t;
}
function qi(e) {
  const t = e.initialAttachedPlayerId ?? null;
  return {
    speed: Math.max(0.1, e.initialPlaybackRate ?? 1),
    cameraDistanceScale: Math.max(
      0.25,
      e.initialCameraDistanceScale ?? Xi
    ),
    customCameraSettings: tt(e.initialCustomCameraSettings),
    attachedPlayerId: t,
    cameraViewMode: e.initialCameraViewMode ?? (t ? "follow" : De),
    ballCamEnabled: e.initialBallCamEnabled ?? !1,
    boostMeterEnabled: e.initialBoostMeterEnabled ?? !1,
    boostPickupAnimationEnabled: e.initialBoostPickupAnimationEnabled ?? !0,
    hitboxWireframesEnabled: e.initialHitboxWireframesEnabled ?? !1,
    hitboxOnlyModeEnabled: e.initialHitboxOnlyModeEnabled ?? !1,
    skipPostGoalTransitionsEnabled: e.initialSkipPostGoalTransitionsEnabled ?? !0,
    skipKickoffsEnabled: e.initialSkipKickoffsEnabled ?? !1
  };
}
function Qi(e, t, n, a) {
  const i = pe(e, t), s = e.frames[i];
  if (!s || !ht(s, a))
    return null;
  const r = e.frames.find(
    (o, l) => l > i && En(o, n)
  );
  return !r || r.time === t ? null : r.time;
}
function Ji(e, t, n, a) {
  const i = pe(e, t), s = e.frames[i];
  if (!s || !Ae(e, s, i, n, a))
    return null;
  const r = e.frames.find(
    (d, h) => h > i && !Ae(e, d, h, n, a)
  );
  if (r)
    return r.time === t ? null : r.time;
  let o = i;
  for (; o > 0 && Ae(
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
function es({
  replay: e,
  sceneState: t,
  fieldScale: n,
  frameWindow: a
}) {
  const i = e.ballFrames[a.frameIndex] ?? null, s = e.ballFrames[a.nextFrameIndex] ?? i, r = ut(
    i?.position ?? null,
    s?.position ?? null,
    i?.linearVelocity ?? null,
    s?.linearVelocity ?? null,
    a.dt,
    a.alpha
  ), o = r ? Mn(r, n) : null;
  if (r) {
    t.ballMesh.visible = !0, t.ballMesh.position.copy(mt(r));
    const l = xn(
      i?.rotation ?? null,
      s?.rotation ?? null,
      a.alpha
    );
    l ? t.ballMesh.quaternion.copy(l) : t.ballMesh.quaternion.identity();
  } else
    t.ballMesh.visible = !1;
  return { ballFrame: i, nextBallFrame: s, ballPosition: o };
}
function ts(e) {
  return !!e?.position && e?.isPresent !== !1;
}
function Dt(e, t, n) {
  for (let a = e.length - 1; a >= 0; a -= 1) {
    const i = e[a], s = n - i.time;
    if (!(s < 0)) {
      if (s > kn)
        break;
      if (i.kind === "demo" && i.secondaryPlayerId === t)
        return i;
    }
  }
  return null;
}
function Ze({
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
  e.group.visible = !0, e.group.position.copy(mt(s)), e.ring.rotation.z = o * 0.15, e.ring.scale.setScalar(l), e.label.quaternion.copy(i.quaternion), e.label.scale.setScalar(1 + 0.04 * Math.sin(o + 1.3));
  const d = c.MathUtils.clamp(1 - r / kn, 0.28, 1);
  for (const h of [e.ring, e.label]) {
    const u = h.material;
    u instanceof c.Material && (u.opacity = d);
  }
}
function ns(e, t, n, a, i) {
  if (!t) {
    e.visible = !1;
    return;
  }
  e.visible = !0;
  const s = a * 36 + i * 1.7, r = 0.86 + 0.14 * Math.sin(s), o = c.MathUtils.clamp(0.62 + n * 0.88, 0.62, 1.5), l = o * (1.02 + r * 0.52), d = 1.02 + o * 0.28;
  e.scale.set(l, d, d);
  for (const [h, u] of e.children.entries()) {
    const b = u, E = 0.92 + 0.14 * Math.sin(s + h * 0.85);
    b.scale.setScalar(E), b.traverse((y) => {
      if (!(y instanceof c.Mesh))
        return;
      const m = y.material;
      if (m instanceof c.MeshBasicMaterial)
        switch (y.name) {
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
const as = 1;
class is extends EventTarget {
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
    super(), this.container = t, this.replay = n, this.options = a, this.fieldScale = a.fieldScale ?? as, this.sceneState = Ra(t, n, this.fieldScale), this.liveGameState = _i(n), this.kickoffGameState = Ei(n, this.liveGameState);
    const i = qi(a);
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
    this.customCameraSettings = tt(t), this.render(), this.emitChange();
  }
  setAttachedPlayer(t) {
    this.attachedPlayerId = t, this.cameraViewMode = t ? "follow" : De, this.freeCameraTransition = null, this.render(), this.emitChange();
  }
  setCameraViewMode(t) {
    this.cameraViewMode = t, this.freeCameraTransition = null, this.render(), this.emitChange();
  }
  setFreeCameraPreset(t) {
    const { fov: n, position: a, target: i, up: s } = Wi(t, this.fieldScale);
    this.cameraViewMode = De, this.freeCameraTransition = {
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
    const n = wi(this.replay, t), a = this.replay.frames[n]?.time ?? 0, i = this.playing, s = this.currentTime !== a || i;
    this.playing = !1, this.currentTime = a, this.render(), s && this.emitChange();
  }
  stepFrames(t) {
    if (!Number.isFinite(t) || this.replay.frames.length === 0)
      return;
    const n = pe(this.replay, this.currentTime);
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
    if (t.speed !== void 0 && (this.playing && this.syncPlaybackClock(n), this.speed = Math.max(0.1, t.speed)), t.cameraDistanceScale !== void 0 && (this.cameraDistanceScale = Math.max(0.25, t.cameraDistanceScale)), t.customCameraSettings !== void 0 && (this.customCameraSettings = tt(t.customCameraSettings)), t.cameraViewMode !== void 0 && (this.cameraViewMode = t.cameraViewMode), t.attachedPlayerId !== void 0 && (this.attachedPlayerId = t.attachedPlayerId, t.cameraViewMode === void 0 && (this.cameraViewMode = this.attachedPlayerId ? "follow" : De)), t.ballCamEnabled !== void 0 && (this.ballCamEnabled = t.ballCamEnabled), t.boostMeterEnabled !== void 0 && (this.boostMeterEnabled = t.boostMeterEnabled, !this.boostMeterEnabled))
      for (const a of this.sceneState.playerBoostMeters.values())
        a.group.visible = !1;
    t.boostPickupAnimationEnabled !== void 0 && (this.boostPickupAnimationEnabled = t.boostPickupAnimationEnabled), t.hitboxWireframesEnabled !== void 0 && (this.hitboxWireframesEnabled = t.hitboxWireframesEnabled, this.setHitboxVisualizationVisibility()), t.hitboxOnlyModeEnabled !== void 0 && (this.hitboxOnlyModeEnabled = t.hitboxOnlyModeEnabled, this.setHitboxVisualizationVisibility()), t.skipPostGoalTransitionsEnabled !== void 0 && (this.skipPostGoalTransitionsEnabled = t.skipPostGoalTransitionsEnabled), t.skipKickoffsEnabled !== void 0 && (this.skipKickoffsEnabled = t.skipKickoffsEnabled), t.currentTime !== void 0 && (this.currentTime = this.clampReplayTime(t.currentTime)), t.playing !== void 0 && t.playing !== this.playing && (t.playing ? this.playing = !0 : (t.currentTime === void 0 && this.syncPlaybackClock(n), this.playing = !1)), this.playing && (this.skipPostGoalTransitionIfNeeded(n), this.skipPastKickoffIfNeeded(n), this.reanchorPlaybackClock(n)), this.render(), this.emitChange();
  }
  getState() {
    const t = pe(this.replay, this.currentTime);
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
    return ki(
      this.replay.duration,
      this.getTimelineSegments(),
      t
    );
  }
  projectTimelineTimeToReplay(t) {
    return Si(
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
    return Ti(this.replay.duration, this.getTimelineSegments());
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
      t.visible = this.hitboxWireframesEnabled || this.hitboxOnlyModeEnabled, Ma(t, this.hitboxOnlyModeEnabled);
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
    const t = Ci(this.replay, this.currentTime), n = t.frameIndex, { ballFrame: a, nextBallFrame: i, ballPosition: s } = es({
      replay: this.replay,
      sceneState: this.sceneState,
      fieldScale: this.fieldScale,
      frameWindow: t
    }), r = [];
    for (const [d, h] of this.replay.players.entries()) {
      const u = this.sceneState.playerMeshes.get(h.id), b = this.sceneState.playerBoostTrails.get(h.id), E = this.sceneState.playerBoostMeters.get(h.id), y = this.sceneState.playerDemoIndicators.get(h.id), m = h.frames[n] ?? null, p = h.frames[t.nextFrameIndex] ?? m;
      let f = null, w = null, S = 0;
      if (!u) {
        y && (y.group.visible = !1), r.push({
          track: h,
          mesh: null,
          boostTrail: b ?? null,
          frame: m,
          nextFrame: p,
          interpolatedPosition: w,
          boostFraction: S
        });
        continue;
      }
      f = ut(
        m?.position ?? null,
        p?.position ?? null,
        m?.linearVelocity ?? null,
        p?.linearVelocity ?? null,
        t.dt,
        t.alpha
      );
      const I = Dt(
        this.replay.timelineEvents,
        h.id,
        this.currentTime
      );
      if (!f) {
        u.visible = !1, b && (b.visible = !1), E && (E.group.visible = !1), Ze({
          indicator: y ?? null,
          fallbackPosition: null,
          demoEvent: I,
          currentTime: this.currentTime,
          camera: this.sceneState.camera
        }), r.push({
          track: h,
          mesh: u,
          boostTrail: b ?? null,
          frame: m,
          nextFrame: p,
          interpolatedPosition: w,
          boostFraction: S
        });
        continue;
      }
      if (I) {
        u.visible = !1, b && (b.visible = !1), E && (E.group.visible = !1), Ze({
          indicator: y ?? null,
          fallbackPosition: f,
          demoEvent: I,
          currentTime: this.currentTime,
          camera: this.sceneState.camera
        }), r.push({
          track: h,
          mesh: u,
          boostTrail: b ?? null,
          frame: m,
          nextFrame: p,
          interpolatedPosition: w,
          boostFraction: S
        });
        continue;
      }
      if (!ts(m)) {
        u.visible = !1, b && (b.visible = !1), E && (E.group.visible = !1), Ze({
          indicator: y ?? null,
          fallbackPosition: f,
          demoEvent: null,
          currentTime: this.currentTime,
          camera: this.sceneState.camera
        }), r.push({
          track: h,
          mesh: u,
          boostTrail: b ?? null,
          frame: m,
          nextFrame: p,
          interpolatedPosition: w,
          boostFraction: S
        });
        continue;
      }
      u.visible = !0, y && (y.group.visible = !1), w = f, u.position.copy(mt(f));
      const _ = xn(
        m?.rotation ?? null,
        p?.rotation ?? null,
        t.alpha
      );
      _ ? u.quaternion.copy(_) : u.quaternion.identity();
      const P = m?.boostFraction ?? 0, O = p?.boostFraction ?? P;
      if (S = c.MathUtils.lerp(
        P,
        O,
        t.alpha
      ), b) {
        const B = (t.alpha >= 0.5 ? p?.boostActive : m?.boostActive) ?? m?.boostActive ?? p?.boostActive ?? !1;
        this.hitboxOnlyModeEnabled ? b.visible = !1 : ns(b, B, S, this.currentTime, d);
      }
      E && (this.boostMeterEnabled && !this.hitboxOnlyModeEnabled ? (E.group.visible = !0, Ca(
        E,
        S,
        c.MathUtils.lerp(
          m?.boostAmount ?? 0,
          p?.boostAmount ?? m?.boostAmount ?? 0,
          t.alpha
        ),
        this.sceneState.camera
      )) : E.group.visible = !1), r.push({
        track: h,
        mesh: u,
        boostTrail: b ?? null,
        frame: m,
        nextFrame: p,
        interpolatedPosition: w,
        boostFraction: S
      });
    }
    Zi({
      sceneState: this.sceneState,
      replay: this.replay,
      fieldScale: this.fieldScale,
      cameraViewMode: this.cameraViewMode,
      attachedPlayerId: this.attachedPlayerId,
      ballCamEnabled: this.ballCamEnabled,
      cameraDistanceScale: this.cameraDistanceScale,
      customCameraSettings: this.customCameraSettings,
      frameIndex: n,
      nextFrameIndex: t.nextFrameIndex,
      alpha: t.alpha,
      dt: t.dt,
      attachedPlayerUnavailable: this.attachedPlayerId !== null && Dt(this.replay.timelineEvents, this.attachedPlayerId, this.currentTime) !== null,
      ballPosition: s,
      desiredCameraPosition: this.desiredCameraPosition,
      desiredLookTarget: this.desiredLookTarget
    }), this.cameraViewMode === "free" && this.freeCameraTransition && $i({
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
    const n = Qi(
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
    const n = Ji(
      this.replay,
      this.currentTime,
      this.liveGameState,
      this.kickoffGameState
    );
    return n === null ? !1 : (this.currentTime = n, this.playing && this.reanchorPlaybackClock(t), !0);
  }
  getActiveMetadata(t, n) {
    return Pi(this.replay, t, n);
  }
  computeTimelineSegments() {
    return Mi(
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
let Xe = null;
function we(e) {
  if (e instanceof Map)
    return Object.fromEntries(
      Array.from(e.entries()).map(([t, n]) => [t, we(n)])
    );
  if (Array.isArray(e))
    return e.map((t) => we(t));
  if (e && typeof e == "object") {
    const t = {};
    for (const [n, a] of Object.entries(e))
      t[n] = we(a);
    return t;
  }
  return e;
}
async function ss() {
  if (!Xe) {
    const e = Oe.default;
    Xe = typeof e == "function" ? e() : Promise.resolve();
  }
  await Xe;
}
function rs(e) {
  return e.useWorker !== void 0 ? e.useWorker && typeof Worker < "u" : typeof Worker < "u";
}
function os(e) {
  return e instanceof Error ? e : new Error(String(e));
}
function ls(e = 100) {
  return typeof requestAnimationFrame != "function" ? Promise.resolve() : new Promise((t) => {
    let n = !1, a = null;
    const i = () => {
      n || (n = !0, a !== null && clearTimeout(a), t());
    };
    a = setTimeout(i, e), requestAnimationFrame(() => i());
  });
}
async function cs(e, t) {
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
        t.onProgress?.({ stage: "decoding-replay", progress: 0 }), await ls();
        const h = new TextDecoder(), u = JSON.parse(
          h.decode(new Uint8Array(d.rawBuffer))
        );
        t.onProgress?.({ stage: "decoding-replay", progress: 0.5 });
        const b = JSON.parse(
          h.decode(new Uint8Array(d.replayBuffer))
        );
        t.onProgress?.({ stage: "decoding-replay", progress: 1 }), i({
          raw: u,
          replay: b
        });
      } catch (h) {
        s(os(h));
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
async function pt(e, t = {}) {
  if (rs(t))
    return cs(e, t);
  await ss(), t.onProgress?.({ stage: "validating", progress: 0 });
  const n = ds(e);
  if (!n.valid)
    throw new Error(n.error ?? "Replay validation failed");
  t.onProgress?.({ stage: "processing", progress: 0 });
  const a = we(
    t.onProgress ? Oe.get_replay_frames_data_with_progress(
      e,
      (s) => {
        t.onProgress?.(s);
      },
      t.reportEveryNFrames ?? 1e3
    ) : Oe.get_replay_frames_data(e)
  );
  t.onProgress?.({ stage: "normalizing", progress: 0 });
  const i = await yi(a, {
    onProgress(s) {
      t.onProgress?.({ stage: "normalizing", progress: s });
    }
  });
  return {
    raw: a,
    replay: i
  };
}
function ds(e) {
  return we(
    Oe.validate_replay(e)
  );
}
const hs = "https://ballchasing.com/api", Sn = "https://ballchasing.com", us = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
function Tn(e, t) {
  const a = (t instanceof URL ? t.href : t).replace(/\/+$/, "");
  return new URL(`${a}/${e.replace(/^\/+/, "")}`);
}
function ms(e) {
  const t = new Headers(e.fetchInit?.headers);
  return {
    ...e.fetchInit,
    method: e.fetchInit?.method ?? "POST",
    headers: t,
    signal: e.signal ?? e.fetchInit?.signal
  };
}
function ps(e, t) {
  const n = e.statusText ? ` ${e.statusText}` : "", a = e.status === 401 || e.status === 403 || e.status === 404 ? ". The replay may be private, unavailable, or not downloadable without a Ballchasing session" : "";
  return `Failed to fetch Ballchasing replay from ${t.href} (${e.status}${n})${a}`;
}
function Ot(e) {
  return us.test(e.trim());
}
function Fe(e) {
  const t = e.trim();
  if (Ot(t))
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
  if (!r || !Ot(r))
    throw new Error(`Invalid Ballchasing replay URL: ${e}`);
  return r.toLowerCase();
}
function Nr(e) {
  return `ballchasing-${Fe(e)}.replay`;
}
function fs(e, t = Sn) {
  const n = Fe(e);
  return Tn(`dl/replay/${encodeURIComponent(n)}`, t);
}
function Br(e, t = hs) {
  const n = Fe(e);
  return Tn(`replays/${encodeURIComponent(n)}/file`, t);
}
async function bs(e, t = {}) {
  const n = fs(e, t.baseUrl ?? Sn), a = t.fetch ?? globalThis.fetch;
  if (!a)
    throw new Error("No fetch implementation is available");
  const i = await a(n, ms(t));
  if (!i.ok)
    throw new Error(ps(i, n));
  return new Uint8Array(await i.arrayBuffer());
}
function zr(e, t = {}) {
  const n = Fe(e);
  return {
    id: `ballchasing:${n}`,
    async load(a) {
      const i = await bs(n, t);
      return pt(i, {
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
const Lt = "subtr-actor-ballchasing-overlay-styles", gs = "#3b82f6", ys = "#f59e0b";
function ws() {
  if (document.getElementById(Lt))
    return;
  const e = document.createElement("style");
  e.id = Lt, e.textContent = `
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
      border-bottom: 2px solid ${gs};
    }

    .sap-bc-team-hud-orange {
      left: calc(50% + 2.7rem);
      flex-direction: row;
      justify-content: flex-start;
      border-bottom: 2px solid ${ys};
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
function _s(e, t) {
  const n = e.players[t], a = n.frame?.boostAmount ?? 0, i = n.nextFrame?.boostAmount ?? a;
  return c.MathUtils.lerp(a, i, e.alpha);
}
function Nt(e, t, n, a) {
  if (!e || !t)
    return;
  const i = Math.max(0, Math.min(100, Math.round(Xt(n))));
  e.style.width = `${i}%`, t.textContent = `${i} ${a}`;
}
function Bt(e, t, n, a) {
  if (!e)
    return;
  const i = () => {
    t.player.setAttachedPlayer(n);
  };
  e.classList.add("sap-bc-player-selectable"), e.tabIndex = 0, e.setAttribute("role", "button"), e.setAttribute("aria-label", `Follow ${a}`), e.title = `Follow ${a}`, e.addEventListener("click", i), e.addEventListener("keydown", (s) => {
    s.key !== "Enter" && s.key !== " " || (s.preventDefault(), i());
  });
}
function Es(e, t, n, a, i) {
  if (e.getWorldPosition(i), i.add(t), i.project(n), i.z < -1 || i.z > 1)
    return !1;
  const s = a.clientWidth || 1, r = a.clientHeight || 1;
  return i.x = (i.x + 1) * s / 2, i.y = (1 - i.y) * r / 2, !(i.x < -80 || i.x > s + 80 || i.y < -80 || i.y > r + 80);
}
function Fr(e = {}) {
  const t = e.showFloatingNames ?? !0, n = e.showFloatingBoostBars ?? !0, a = e.showTeamBoostHud ?? !0;
  let i = null, s = null, r = null, o = null, l = !1, d = "";
  const h = /* @__PURE__ */ new Map(), u = new c.Vector3(), b = new c.Vector3(0, 0, 255);
  function E(m) {
    for (const [p, f] of h.entries()) {
      const w = p === m;
      f.floatingRoot?.classList.toggle("sap-bc-player-following", w), f.teamHudEntry?.classList.toggle("sap-bc-player-following", w), f.floatingRoot?.setAttribute("aria-pressed", w ? "true" : "false"), f.teamHudEntry?.setAttribute("aria-pressed", w ? "true" : "false");
    }
  }
  function y(m, p) {
    ws(), getComputedStyle(p).position === "static" && (l = !0, d = p.style.position, p.style.position = "relative"), i = document.createElement("div"), i.className = "sap-bc-overlay-root", t || n ? (s = document.createElement("div"), s.className = "sap-bc-floating-layer", i.append(s)) : s = null, a ? (r = document.createElement("div"), r.className = "sap-bc-team-hud sap-bc-team-hud-blue", o = document.createElement("div"), o.className = "sap-bc-team-hud sap-bc-team-hud-orange", i.append(r, o)) : (r = null, o = null);
    for (const f of m.replay.players) {
      let w = null, S = null, I = null, k = null;
      s && (w = document.createElement("div"), w.className = "sap-bc-floating-track", w.hidden = !0, (t || n) && (S = document.createElement("div"), S.className = `sap-bc-boost-bar ${f.isTeamZero ? "sap-bc-boost-bar-blue" : "sap-bc-boost-bar-orange"}`, I = document.createElement("div"), I.className = `sap-bc-boost-fill ${f.isTeamZero ? "sap-bc-boost-fill-blue" : "sap-bc-boost-fill-orange"}`, k = document.createElement("span"), k.className = "sap-bc-boost-text", S.append(I, k), w.append(S)), Bt(w, m, f.id, f.name), s.append(w));
      let _ = null, P = null, O = null;
      if (a) {
        _ = document.createElement("div"), _.className = "sap-bc-hud-player";
        const B = document.createElement("div");
        B.className = `sap-bc-hud-boost-bar ${f.isTeamZero ? "sap-bc-boost-bar-blue" : "sap-bc-boost-bar-orange"}`, P = document.createElement("div"), P.className = `sap-bc-hud-boost-fill ${f.isTeamZero ? "sap-bc-boost-fill-blue" : "sap-bc-boost-fill-orange"}`, O = document.createElement("span"), O.className = "sap-bc-hud-boost-text", B.append(P, O), _.append(B), Bt(_, m, f.id, f.name), (f.isTeamZero ? r : o)?.append(_);
      }
      h.set(f.id, {
        floatingRoot: w,
        floatingBoostFill: I,
        floatingBoostText: k,
        teamHudEntry: _,
        teamHudFill: P,
        teamHudText: O
      });
    }
    b.set(0, 0, 255 * (m.options.fieldScale ?? 1)), p.append(i), E(m.player.getState().attachedPlayerId);
  }
  return {
    id: "ballchasing-overlay",
    setup(m) {
      y(m, m.container);
    },
    onStateChange(m) {
      E(m.state.attachedPlayerId);
    },
    teardown(m) {
      i?.remove(), i = null, s = null, r = null, o = null, h.clear(), l && (m.container.style.position = d, l = !1);
    },
    beforeRender(m) {
      if (i)
        for (const [p, f] of m.players.entries()) {
          const w = h.get(f.track.id);
          if (!w)
            continue;
          const S = _s(m, p);
          Nt(
            w.floatingBoostFill,
            w.floatingBoostText,
            S,
            f.track.name
          ), Nt(w.teamHudFill, w.teamHudText, S, f.track.name);
          const I = f.mesh, k = I !== null && f.interpolatedPosition !== null;
          if (w.teamHudEntry?.classList.toggle("sap-bc-hud-player-inactive", !k), !!w.floatingRoot) {
            if (!k || !Es(
              I,
              b,
              m.scene.camera,
              m.container,
              u
            )) {
              w.floatingRoot.hidden = !0;
              continue;
            }
            w.floatingRoot.hidden = !1, w.floatingRoot.style.transform = `translate(${u.x.toFixed(1)}px, ${u.y.toFixed(1)}px) translate(-50%, -100%)`;
          }
        }
    }
  };
}
function qe(e) {
  e.depthTest = !1, e.depthWrite = !1, e.transparent = !0, e.polygonOffset = !0, e.polygonOffsetFactor = -2, e.polygonOffsetUnits = -2, e.forceSinglePass = !0;
}
const me = 6, vs = 0.6;
function Ee(e) {
  return e * vs;
}
function xs(e) {
  return Ee(e.size === "big" ? 150 : 92);
}
function Pn(e) {
  return Ee(e.size === "big" ? 155 : 46);
}
function Ms(e) {
  return Ee(e.size === "big" ? 34 : 14);
}
function Cn(e) {
  return me + Ms(e) + Pn(e);
}
function In(e) {
  return e.size === "big" ? Cn(e) : me + Ee(1.2);
}
function An(e) {
  return e.size === "big" ? Cn(e) : me + Ee(0.8);
}
function ks(e) {
  return e.size === "big" ? 16096779 : 16436245;
}
function Ss(e) {
  const t = xs(e), n = ks(e), a = Pn(e), i = e.size === "big", s = new c.Group();
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
  qe(r.material), r.position.z = me, r.renderOrder = 20, r.frustumCulled = !1, s.add(r);
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
  qe(o.material), o.position.z = me + 0.5, o.renderOrder = 21, o.frustumCulled = !1, s.add(o);
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
  qe(l.material), l.position.z = me + 1, l.renderOrder = 22, l.frustumCulled = !1, s.add(l);
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
  d.position.z = In(e), d.renderOrder = 23, d.frustumCulled = !1, s.add(d);
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
  return h.position.z = An(e), h.renderOrder = 24, h.frustumCulled = !1, s.add(h), { group: s, ring: r, core: o, cooldown: l, orb: d, glow: h };
}
function Ts(e, t) {
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
function Ps(e, t, n, a) {
  const { available: i, progress: s } = Ts(t, n), r = t.size === "big", o = 0.92 + 0.08 * Math.sin(n * 6 + t.index * 0.45), l = 0.96 + 0.04 * Math.sin(n * (r ? 4.8 : 7.2) + t.index * 0.37), d = r ? Math.sin(n * 2.2 + t.index * 0.61) * 18 : 0, h = In(t) + d, u = An(t) + d;
  if (e.orb.position.z = h, e.glow.position.z = u, e.orb.rotation.z = n * (r ? 0.9 : 1.25), e.glow.rotation.z = -n * 0.45, i) {
    e.group.visible = !0, e.ring.material.opacity = 0.95, e.core.material.opacity = r ? 0.56 : 0.5, e.cooldown.visible = !1, e.ring.scale.setScalar(o), e.core.scale.setScalar(1), e.orb.visible = !0, e.glow.visible = !0, e.orb.material.opacity = r ? 0.96 : 0.9, e.glow.material.opacity = (r ? 0.2 : 0.16) + (l - 0.96), e.orb.scale.setScalar(l), e.glow.scale.setScalar(r ? 1.02 + (l - 0.96) * 2 : 1);
    return;
  }
  if (e.group.visible = !0, e.ring.material.opacity = 0.18, e.core.material.opacity = 0.07, e.ring.scale.setScalar(1), e.core.scale.setScalar(1), e.orb.visible = !1, e.glow.visible = !1, e.cooldown.visible = a, a) {
    const b = 0.3 + s * 0.7;
    e.cooldown.scale.setScalar(b), e.cooldown.material.opacity = 0.16 + s * 0.2;
  }
}
function Ur(e = {}) {
  const t = e.showCooldownProgress ?? !0;
  let n = null;
  const a = /* @__PURE__ */ new Map();
  function i(r) {
    n = new c.Group(), n.name = "boost-pad-overlay", n.renderOrder = 20, n.frustumCulled = !1;
    for (const o of r.replay.boostPads) {
      const l = Ss(o);
      n.add(l.group), a.set(o.index, l);
    }
    r.scene.replayRoot.add(n);
  }
  function s(r) {
    for (const o of r.replay.boostPads) {
      const l = a.get(o.index);
      l && Ps(l, o, r.state.currentTime, t);
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
const Cs = 1.35, Is = "#57a8ff", As = "#ff9c40", Rs = 256, Ds = 160, Os = 360, Ls = 225, Ns = 260, Bs = 430, Rn = 18, zt = 120;
function zs(e) {
  return e ? Is : As;
}
function Fs(e) {
  return e.events.filter((t) => !t.available && t.playerId);
}
function Dn(e, t) {
  const n = document.createElement("canvas");
  n.width = Rs, n.height = Ds;
  const a = n.getContext("2d");
  if (!a)
    throw new Error("Unable to create boost pickup count canvas");
  a.clearRect(0, 0, n.width, n.height), a.textAlign = "center", a.textBaseline = "middle", a.lineJoin = "round", a.font = "800 124px sans-serif", a.lineWidth = 18, a.strokeStyle = "rgba(4, 10, 18, 0.88)", a.strokeText(`${e}`, n.width / 2, n.height / 2), a.fillStyle = t, a.fillText(`${e}`, n.width / 2, n.height / 2);
  const i = new c.CanvasTexture(n);
  return i.colorSpace = c.SRGBColorSpace, i.needsUpdate = !0, i;
}
function Us(e) {
  e?.dispose();
}
function Gs(e) {
  const t = new c.Group();
  t.visible = !1, t.renderOrder = 60, t.frustumCulled = !1;
  const n = Dn(1, e), a = new c.SpriteMaterial({
    map: n,
    transparent: !0,
    depthTest: !1,
    depthWrite: !1
  }), i = new c.Sprite(a);
  i.scale.set(Os, Ls, 1), i.renderOrder = 62, i.frustumCulled = !1, t.add(i);
  const s = new c.MeshBasicMaterial({
    color: e,
    transparent: !0,
    opacity: 0,
    side: c.DoubleSide,
    depthTest: !1,
    depthWrite: !1,
    blending: c.AdditiveBlending
  }), r = new c.Mesh(
    new c.RingGeometry(zt * 0.72, zt, 36),
    s
  );
  return r.position.z = Rn, r.renderOrder = 61, r.frustumCulled = !1, t.add(r), { group: t, textMaterial: a, ringMaterial: s };
}
function Vs(e, t) {
  e.currentCount !== t && (Us(e.textMaterial.map), e.textMaterial.map = Dn(t, e.color), e.textMaterial.needsUpdate = !0, e.currentCount = t);
}
function js(e) {
  const t = /* @__PURE__ */ new Map();
  for (const i of e.replay.players)
    t.set(i.id, i);
  const n = [];
  for (const i of e.replay.boostPads)
    for (const s of Fs(i))
      n.push({ pad: i, event: s });
  n.sort((i, s) => i.event.time !== s.event.time ? i.event.time - s.event.time : i.event.frame !== s.event.frame ? i.event.frame - s.event.frame : i.pad.index - s.pad.index);
  const a = [];
  for (const { pad: i, event: s } of n) {
    if (!s.playerId)
      continue;
    const r = t.get(s.playerId);
    if (!r)
      continue;
    const o = zs(r.isTeamZero), { group: l, textMaterial: d, ringMaterial: h } = Gs(o);
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
function Hs(e, t, n) {
  const a = c.MathUtils.clamp(t / n, 0, 1), i = 1 - Math.pow(1 - a, 3), s = a * a, r = e.size === "big" ? Bs : Ns, o = e.size === "big" ? 360 : 280, l = 1 + Math.sin(a * Math.PI) * 0.22;
  e.group.visible = !0, e.group.position.set(
    e.position.x,
    e.position.y,
    e.position.z + r + i * o
  ), e.group.scale.setScalar(l), e.textMaterial.opacity = Math.max(0, 1 - s), e.ringMaterial.opacity = Math.max(0, 0.48 * (1 - a));
  const d = e.group.children[1];
  if (d) {
    const h = 0.75 + i * (e.size === "big" ? 2.8 : 1.85);
    d.scale.setScalar(h), d.position.z = Rn - r - i * o;
  }
}
function Gr(e = {}) {
  const t = Math.max(0.1, e.durationSeconds ?? Cs);
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
      n = js(s);
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
        Vs(l, d), Hs(l, s.currentTime - l.time, t);
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
const Ws = 60, $s = ["video/webm;codecs=vp9", "video/webm;codecs=vp8", "video/webm"];
function Ks(e) {
  if (e && MediaRecorder.isTypeSupported(e))
    return e;
  for (const t of $s)
    if (MediaRecorder.isTypeSupported(t))
      return t;
  return "";
}
function Ys(e) {
  return e instanceof Error ? e.message : String(e);
}
function Vr(e = {}) {
  let t = null, n = null, a = [], i = null, s = 0, r = 0, o = "", l = 0, d = null, h = null, u = null, b = null, E = !1, y = null;
  const m = /* @__PURE__ */ new Set();
  function p() {
    return {
      state: n ? n.state === "recording" ? "recording" : "stopping" : d ? "error" : i ? "ready" : "idle",
      elapsedSeconds: r,
      mimeType: o,
      sizeBytes: l,
      error: d
    };
  }
  function f() {
    const _ = p();
    e.onStatusChange?.(_);
    for (const P of m)
      P(_);
  }
  function w() {
    if (!t)
      throw new Error("Canvas recorder plugin is not installed");
    return t;
  }
  function S(_) {
    n = null, b = null, E = !1, i = _, l = _?.size ?? 0, y && t && t.player.setState({
      currentTime: y.currentTime,
      speed: y.speed,
      playing: y.playing
    }), y = null, _ && e.onComplete?.(_), f(), u?.(_), u = null, h = null;
  }
  function I(_) {
    d = Ys(_), n = null, b = null, E = !1, y = null, f(), u?.(null), u = null, h = null;
  }
  const k = {
    id: "canvas-recorder",
    setup(_) {
      t = _;
    },
    beforeRender(_) {
      n?.state === "recording" && (r = (performance.now() - s) / 1e3, f()), n?.state === "recording" && b !== null && _.currentTime >= b && k.stop();
    },
    onStateChange(_) {
      E && n?.state === "recording" && !_.state.playing && r > 0 && k.stop();
    },
    teardown() {
      n?.state === "recording" && n.stop(), t = null, n = null, b = null, E = !1, y = null, u?.(null), u = null, h = null, m.clear();
    },
    start(_ = {}) {
      const P = w();
      if (n?.state === "recording")
        throw new Error("Canvas recording is already in progress");
      if (typeof MediaRecorder > "u")
        throw new Error("MediaRecorder is not available in this browser");
      const O = P.scene.renderer.domElement;
      if (!O.captureStream)
        throw new Error("Canvas captureStream is not available in this browser");
      d = null, i = null, a = [], l = 0, r = 0, s = performance.now(), o = Ks(_.mimeType ?? e.mimeType);
      const B = Math.max(1, _.fps ?? e.fps ?? Ws), v = O.captureStream(B);
      n = new MediaRecorder(v, {
        mimeType: o,
        videoBitsPerSecond: _.videoBitsPerSecond ?? e.videoBitsPerSecond
      }), h = new Promise((T) => {
        u = T;
      }), n.addEventListener("dataavailable", (T) => {
        T.data.size > 0 && (a.push(T.data), l += T.data.size, f());
      }), n.addEventListener(
        "stop",
        () => {
          v.getTracks().forEach((T) => T.stop()), S(new Blob(a, { type: o || "video/webm" }));
        },
        { once: !0 }
      ), n.addEventListener(
        "error",
        (T) => {
          v.getTracks().forEach((z) => z.stop()), I(T.error ?? T);
        },
        { once: !0 }
      ), n.start(1e3), f();
    },
    stop() {
      if (!n)
        return Promise.resolve(i);
      if (n.state === "inactive")
        return h ?? Promise.resolve(i);
      const _ = h ?? new Promise((P) => {
        u = P;
      });
      return n.stop(), f(), _;
    },
    clear() {
      if (n?.state === "recording")
        throw new Error("Cannot clear a recording while recording is in progress");
      i = null, a = [], l = 0, r = 0, d = null, f();
    },
    getRecording() {
      return i;
    },
    getStatus() {
      return p();
    },
    subscribe(_) {
      return m.add(_), _(p()), () => {
        m.delete(_);
      };
    },
    recordRange(_ = {}) {
      const P = w(), O = P.player.getState();
      (_.restorePlaybackState ?? !0) && (y = O);
      const B = _.playbackRate ?? O.speed, v = _.startTime ?? O.currentTime;
      b = _.endTime ?? O.duration, E = !0, P.player.setState({
        currentTime: v,
        speed: B,
        playing: !1
      }), k.start(_);
      const T = h;
      return P.player.play(), (T ?? Promise.resolve(null)).then((z) => {
        if (!z)
          throw new Error("Recording stopped without producing a video");
        return z;
      });
    },
    recordFullReplay(_ = {}) {
      return k.recordRange({
        ..._,
        startTime: _.startTime ?? 0,
        endTime: _.endTime ?? w().replay.duration
      });
    }
  };
  return k;
}
const Ft = "subtr-actor-timeline-overlay-styles";
function Zs() {
  if (document.getElementById(Ft))
    return;
  const e = document.createElement("style");
  e.id = Ft, e.textContent = `
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
const Xs = /* @__PURE__ */ new Set(["goal", "save", "bookmark"]), qs = 0.2, Qe = 60, Qs = 2, Js = 4, er = 0.01, Ut = 0.01;
function nt(e) {
  if (!Number.isFinite(e))
    return "--:--.--";
  const t = Math.max(0, e), n = Math.floor(t / 60), a = Math.floor(t % 60), i = Math.floor((t - Math.floor(t)) * 100);
  return `${n}:${String(a).padStart(2, "0")}.${String(i).padStart(2, "0")}`;
}
function Gt(e) {
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
function tr(e) {
  switch (e.kind) {
    case "goal":
    case "goal-context":
    case "goal-tag":
      return Js;
    default:
      return Qs;
  }
}
function nr(e) {
  return e.seekTime !== void 0 && Number.isFinite(e.seekTime) ? Math.max(0, e.seekTime) : Number.isFinite(e.time) ? Math.max(0, e.time - tr(e)) : 0;
}
function ar(e) {
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
function ir(e) {
  if (e.events.length > 1)
    return `${e.events.length}`;
  const t = e.events[0];
  return t ? t.shortLabel && t.shortLabel.trim() !== "" ? t.shortLabel.slice(0, 3).toUpperCase() : t.kind.slice(0, 1).toUpperCase() : "";
}
function at(e) {
  return [...e].sort((t, n) => {
    const a = Gt(n) - Gt(t);
    return a !== 0 ? a : t.time - n.time;
  });
}
function sr(e) {
  return e.events.map((t) => `${nt(t.time)} ${t.label ?? t.kind}`).join(`
`);
}
function On(e) {
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
    events: at(n.events)
  })).sort((n, a) => n.time - a.time);
}
function Vt(e) {
  if (e.length <= Qe)
    return e;
  const t = e[0]?.time ?? 0, a = (e[e.length - 1]?.time ?? t) - t;
  if (a <= 0)
    return [
      {
        key: "compact:0",
        time: t,
        events: at(e.flatMap((r) => r.events))
      }
    ];
  const i = a / Qe, s = /* @__PURE__ */ new Map();
  for (const r of e) {
    const o = Math.min(
      Qe - 1,
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
    events: at(r.events)
  })).sort((r, o) => r.time - o.time);
}
function Ln(e, t) {
  return e ? typeof e == "function" ? e(t) : e : [];
}
function rr(e, t) {
  const n = [];
  for (const a of e) {
    const i = Ln(a.source, t);
    i.length !== 0 && n.push({
      key: a.key,
      label: a.label,
      buckets: On(i)
    });
  }
  return n;
}
function or(e, t) {
  return e ? typeof e == "function" ? e(t) : e : [];
}
function lr(e, t) {
  const n = /* @__PURE__ */ new Set(), a = [];
  for (const i of e)
    for (const s of or(i, t)) {
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
function cr(e) {
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
function dr(e) {
  return e.color ? e.color : e.isTeamZero === !0 ? "#3b82f6" : e.isTeamZero === !1 ? "#f59e0b" : "#d1d9e0";
}
function hr(e, t) {
  if (e.replayEvents)
    return Ln(e.replayEvents, t);
  if (e.includeReplayEvents === !1)
    return [];
  const n = new Set(e.replayEventKinds ?? Xs);
  return t.replay.timelineEvents.filter((a) => n.has(a.kind));
}
function ur(e, t) {
  const n = t.player.projectReplayTimeToTimeline(nr(e));
  if (!n.hiddenBySkip)
    return n.seekTime;
  const a = Math.min(
    t.player.getTimelineDuration(),
    n.timelineTime + er
  );
  return t.player.projectTimelineTimeToReplay(a);
}
function Pe(e, t) {
  return `${e / Math.max(t, 1e-4) * 100}%`;
}
function mr(e, t, n) {
  let a = e.timelineTime, i = t.timelineTime;
  return i <= a && (e.hiddenBySkip || t.hiddenBySkip) && (a >= n ? (a = Math.max(0, n - Ut), i = n) : i = Math.min(
    n,
    a + Ut
  )), { startTimelineTime: a, endTimelineTime: i };
}
function jr(e = {}) {
  const t = e.pauseWhileScrubbing ?? !0;
  let n = 0;
  const a = e.events ? [
    {
      key: "events:initial",
      label: e.eventsLabel ?? "Events",
      source: e.events
    }
  ] : [], i = e.ranges ? [e.ranges] : [];
  let s = null, r = null, o = null, l = null, d = null, h = null, u = null, b = null, E = null, y = null, m = null, p = null, f = !1, w = "", S = !1, I = !1, k = null, _ = [], P = [], O = null;
  const B = /* @__PURE__ */ new Map(), v = [], T = [], z = [], j = [];
  let G = 0, Z = /* @__PURE__ */ new Set();
  function q() {
    k && (Ge(k), Q({
      ...k,
      state: k.player.getState()
    }));
  }
  function H() {
    k && (Ve(k), Q({
      ...k,
      state: k.player.getState()
    }));
  }
  function Q(g) {
    if (!l || !d || !h || !u || !b || !E || !r)
      return;
    const M = g.player.getTimelineCurrentTime(), A = g.player.getTimelineDuration(), C = [
      A.toFixed(4),
      g.state.skipKickoffsEnabled ? "1" : "0",
      g.state.skipPostGoalTransitionsEnabled ? "1" : "0"
    ].join(":");
    O !== C && (Ge(g), Ve(g), O = C), l.min = "0", l.max = `${A}`, l.step = "0.01", l.value = `${Math.min(M, A)}`, d.dataset.playing = g.state.playing ? "true" : "false", d.setAttribute("aria-label", g.state.playing ? "Pause replay" : "Play replay"), d.title = g.state.playing ? "Pause replay" : "Play replay", h.textContent = g.state.playing ? "||" : ">", u.textContent = g.state.playing ? "Pause" : "Play", b.textContent = nt(M), E.textContent = `-${nt(A - M)}`, r.dataset.scrubbing = S ? "true" : "false", Me(M);
    for (const x of T) {
      const D = Math.max(0, x.startTimelineTime), L = Math.min(A, x.endTimelineTime);
      if (Math.max(0, L - D) <= 1e-4) {
        x.element.hidden = !0;
        continue;
      }
      x.element.hidden = !1, x.element.dataset.active = M >= D && M <= L ? "true" : "false";
    }
    const N = Pe(Math.min(M, A), A);
    for (const x of j)
      x.element.style.left = N;
    for (const x of z)
      x.element.style.left = N;
  }
  function ee(g) {
    let M = 0, A = v.length;
    for (; M < A; ) {
      const C = Math.floor((M + A) / 2);
      v[C].timelineTime <= g ? M = C + 1 : A = C;
    }
    return M;
  }
  function ve(g) {
    let M = 0, A = v.length;
    for (; M < A; ) {
      const C = Math.floor((M + A) / 2);
      v[C].timelineTime < g ? M = C + 1 : A = C;
    }
    return M;
  }
  function xe(g, M) {
    g.active !== M && (g.active = M, g.element.dataset.active = M ? "true" : "false");
  }
  function be(g, M) {
    g.passed !== M && (g.passed = M, g.element.dataset.passed = M ? "true" : "false");
  }
  function Me(g) {
    if (v.length === 0)
      return;
    const M = ee(g);
    if (M > G)
      for (let x = G; x < M; x += 1)
        be(v[x], !0);
    else if (M < G)
      for (let x = M; x < G; x += 1)
        be(v[x], !1);
    G = M;
    const A = ve(g - qs), C = M, N = /* @__PURE__ */ new Set();
    for (let x = A; x < C; x += 1) {
      const D = v[x];
      N.add(D), xe(D, !0);
    }
    for (const x of Z)
      N.has(x) || xe(x, !1);
    Z = N;
  }
  function ke(g, M, A) {
    const C = g.events[0];
    if (!C)
      return null;
    const N = M.player.projectReplayTimeToTimeline(g.time), x = document.createElement("button");
    x.type = "button", x.className = "sap-tl-marker", x.style.left = Pe(N.timelineTime, A), x.style.color = ar(C), x.title = sr(g), x.textContent = ir(g), x.addEventListener("click", () => {
      M.player.seek(ur(C, M));
    }), x.dataset.active = "false", x.dataset.passed = "false";
    const D = {
      element: x,
      timelineTime: N.timelineTime,
      active: !1,
      passed: !1
    };
    return B.set(g.key, D), v.push(D), x;
  }
  function Ge(g) {
    if (!m || !y)
      return;
    m.replaceChildren(), y.replaceChildren(), B.clear(), v.splice(0, v.length), G = 0, Z = /* @__PURE__ */ new Set(), j.splice(0, j.length);
    const M = hr(e, g);
    _ = [], M.length > 0 && _.push({
      key: "replay",
      label: e.replayEventsLabel ?? "Replay",
      buckets: On(M)
    }), _.push(...rr(a, g));
    const A = Math.max(g.player.getTimelineDuration(), 1e-4), C = _[0];
    if (C?.key === "replay")
      for (const x of Vt(C.buckets)) {
        const D = ke(
          { ...x, key: `${C.key}:${x.key}` },
          g,
          A
        );
        D && m.append(D);
      }
    const N = _.filter((x) => x.key !== "replay");
    y.hidden = N.length === 0;
    for (const x of N) {
      const D = document.createElement("div");
      D.className = "sap-tl-event-lane", D.dataset.label = x.label;
      const L = document.createElement("span");
      L.className = "sap-tl-event-lane-label", L.textContent = x.label, L.setAttribute("aria-label", x.label), D.append(L);
      const V = document.createElement("div");
      V.className = "sap-tl-event-lane-track";
      const ge = document.createElement("div");
      ge.className = "sap-tl-markers";
      for (const ye of Vt(x.buckets)) {
        const W = ke(
          { ...ye, key: `${x.key}:${ye.key}` },
          g,
          A
        );
        W && ge.append(W);
      }
      const te = document.createElement("div");
      te.className = "sap-tl-event-playhead", V.append(ge, te), j.push({ element: te }), D.append(V), y.append(D);
    }
    v.sort((x, D) => x.timelineTime - D.timelineTime);
  }
  function Ve(g) {
    if (!o)
      return;
    o.replaceChildren(), T.splice(0, T.length), z.splice(0, z.length);
    const M = lr(i, g).filter(
      (C) => Number.isFinite(C.startTime) && Number.isFinite(C.endTime) && C.endTime > C.startTime
    );
    P = cr(M);
    const A = Math.max(g.player.getTimelineDuration(), 1e-4);
    if (P.length === 0) {
      o.hidden = !0;
      return;
    }
    o.hidden = !1;
    for (const C of P) {
      const N = document.createElement("div");
      N.className = "sap-tl-range-lane";
      const x = document.createElement("div");
      if (x.className = "sap-tl-range-lane-track", C.label) {
        N.dataset.label = C.label;
        const L = document.createElement("span");
        L.className = "sap-tl-range-lane-label", L.textContent = C.label, L.setAttribute("aria-label", C.label), N.append(L);
      }
      for (const L of C.ranges) {
        const V = g.player.projectReplayTimeToTimeline(L.startTime), ge = g.player.projectReplayTimeToTimeline(L.endTime), { startTimelineTime: te, endTimelineTime: ye } = mr(
          V,
          ge,
          A
        ), W = document.createElement("div");
        W.className = "sap-tl-range-segment", L.className && W.classList.add(L.className), W.style.background = dr(L), W.title = L.label ?? C.label, W.dataset.active = "false", W.style.left = Pe(te, A), W.style.width = Pe(
          Math.max(0, ye - te),
          A
        ), x.append(W), T.push({
          range: L,
          element: W,
          startTimelineTime: te,
          endTimelineTime: ye
        });
      }
      const D = document.createElement("div");
      D.className = "sap-tl-range-playhead", x.append(D), z.push({ element: D }), N.append(x), o.append(N);
    }
  }
  function bt() {
    S && (S = !1, r?.setAttribute("data-scrubbing", "false"), I && k?.player.play(), I = !1);
  }
  function jn() {
    if (S || (S = !0, r?.setAttribute("data-scrubbing", "true"), !t))
      return;
    const g = k?.player;
    g && (I = g.getState().playing, I && g.pause());
  }
  return {
    id: "timeline-overlay",
    addEventSource(g, M = {}) {
      return a.push({
        key: M.id ?? `events:${n++}`,
        label: M.label ?? "Events",
        source: g
      }), q(), () => {
        this.removeEventSource(g);
      };
    },
    removeEventSource(g) {
      const M = a.findIndex((A) => A.source === g);
      return M < 0 ? !1 : (a.splice(M, 1), q(), !0);
    },
    refreshEvents() {
      q();
    },
    addRangeSource(g) {
      return i.push(g), H(), () => {
        this.removeRangeSource(g);
      };
    },
    removeRangeSource(g) {
      const M = i.indexOf(g);
      return M < 0 ? !1 : (i.splice(M, 1), H(), !0);
    },
    refreshRanges() {
      H();
    },
    setup(g) {
      k = g, Zs(), getComputedStyle(g.container).position === "static" && (f = !0, w = g.container.style.position, g.container.style.position = "relative"), s = document.createElement("div"), s.className = "sap-tl-root", r = document.createElement("div"), r.className = "sap-tl-shell", r.dataset.scrubbing = "false";
      const M = document.createElement("div");
      M.className = "sap-tl-topline";
      const A = document.createElement("div");
      A.className = "sap-tl-primary", d = document.createElement("button"), d.type = "button", d.className = "sap-tl-toggle sap-tl-track-toggle", h = document.createElement("span"), h.className = "sap-tl-toggle-icon", h.setAttribute("aria-hidden", "true"), h.textContent = ">", u = document.createElement("span"), u.className = "sap-tl-toggle-label", u.textContent = "Play", d.append(h, u), d.addEventListener("click", () => {
        g.player.togglePlayback();
      }), b = document.createElement("span"), b.className = "sap-tl-current", b.textContent = "0:00.00", E = document.createElement("span"), E.className = "sap-tl-remaining", E.textContent = "-0:00.00", A.append(b), M.append(A, E);
      const C = document.createElement("div");
      C.className = "sap-tl-track-wrap", o = document.createElement("div"), o.className = "sap-tl-ranges", o.hidden = !0, y = document.createElement("div"), y.className = "sap-tl-event-lanes", y.hidden = !0;
      const N = document.createElement("div");
      N.className = "sap-tl-track-rail";
      const x = document.createElement("div");
      x.className = "sap-tl-main-rail", m = document.createElement("div"), m.className = "sap-tl-markers", l = document.createElement("input"), l.className = "sap-tl-range", l.type = "range", l.min = "0", l.max = `${g.replay.duration}`, l.step = "0.01", l.value = "0";
      const D = () => {
        jn();
      }, L = () => {
        l && g.player.seek(g.player.projectTimelineTimeToReplay(Number(l.value)));
      }, V = () => {
        bt();
      };
      l.addEventListener("pointerdown", D), l.addEventListener("input", L), l.addEventListener("change", V), window.addEventListener("pointerup", V), window.addEventListener("pointercancel", V), p = () => {
        l?.removeEventListener("pointerdown", D), l?.removeEventListener("input", L), l?.removeEventListener("change", V), window.removeEventListener("pointerup", V), window.removeEventListener("pointercancel", V);
      }, N.append(x, m, l), C.append(o, y, d, N), r.append(M, C), s.append(r), g.container.append(s), Ge(g), Ve(g), Q({
        ...g,
        state: g.player.getState()
      });
    },
    onStateChange(g) {
      k = g, Q(g);
    },
    teardown(g) {
      p?.(), p = null, bt(), s?.remove(), s = null, r = null, o = null, y = null, l = null, d = null, h = null, u = null, b = null, E = null, m = null, k = null, _ = [], P = [], O = null, B.clear(), v.splice(0, v.length), T.splice(0, T.length), z.splice(0, z.length), j.splice(0, j.length), G = 0, Z = /* @__PURE__ */ new Set(), f && (g.container.style.position = w, f = !1);
    }
  };
}
function J(e) {
  return e !== null && typeof e == "object" && !Array.isArray(e);
}
function ft(e) {
  return J(e);
}
function jt(e, t) {
  if (!J(e))
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
function pr(e, t) {
  const n = `manifest.replays[${t}]`;
  if (!J(e))
    throw new Error(`${n} must be an object`);
  if (typeof e.id != "string" || e.id.trim() === "")
    throw new Error(`${n}.id must be a non-empty string`);
  if (e.path !== void 0 && typeof e.path != "string")
    throw new Error(`${n}.path must be a string when provided`);
  if (e.label !== void 0 && typeof e.label != "string")
    throw new Error(`${n}.label must be a string when provided`);
  if (e.meta !== void 0 && !ft(e.meta))
    throw new Error(`${n}.meta must be an object when provided`);
  const a = typeof e.path == "string" ? e.path : "";
  return {
    id: e.id,
    path: a,
    label: typeof e.label == "string" ? e.label : e.id,
    locator: br(e.locator, `${n}.locator`, a),
    meta: e.meta ?? {}
  };
}
function fr(e, t) {
  const n = `manifest.items[${t}]`;
  if (!J(e))
    throw new Error(`${n} must be an object`);
  if (typeof e.replay != "string" || e.replay.trim() === "")
    throw new Error(`${n}.replay must be a non-empty string`);
  if (e.label !== void 0 && typeof e.label != "string")
    throw new Error(`${n}.label must be a string when provided`);
  if (e.meta !== void 0 && !ft(e.meta))
    throw new Error(`${n}.meta must be an object when provided`);
  return {
    id: typeof e.id == "string" && e.id.trim() !== "" ? e.id : `${e.replay}:${t}`,
    replay: e.replay,
    start: jt(e.start, `${n}.start`),
    end: jt(e.end, `${n}.end`),
    label: typeof e.label == "string" ? e.label : "",
    meta: e.meta ?? {}
  };
}
function br(e, t, n) {
  if (e === void 0)
    return n ? { kind: "path", path: n } : { kind: "inline" };
  if (!J(e))
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
function gr(e) {
  if (!J(e))
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
function Ce(e, t) {
  if (e != null) {
    if (typeof e != "number" || !Number.isInteger(e) || !Number.isFinite(e) || e < 0)
      throw new Error(`${t} must be a non-negative integer when provided`);
    return e;
  }
}
function Ht(e, t) {
  if (e != null) {
    if (typeof e != "string")
      throw new Error(`${t} must be a string when provided`);
    return e;
  }
}
function yr(e) {
  if (!J(e))
    throw new Error("manifest.page must be an object when provided");
  return {
    next: Ht(e.next, "manifest.page.next"),
    previous: Ht(e.previous, "manifest.page.previous"),
    total: Ce(e.total, "manifest.page.total"),
    count: Ce(e.count, "manifest.page.count"),
    limit: Ce(e.limit, "manifest.page.limit"),
    offset: Ce(e.offset, "manifest.page.offset")
  };
}
function wr(e) {
  if (!J(e))
    throw new Error("manifest must be an object");
  if (!Array.isArray(e.items))
    throw new Error("manifest.items must be an array");
  if (e.replays !== void 0 && !Array.isArray(e.replays))
    throw new Error("manifest.replays must be an array when provided");
  if (e.label !== void 0 && typeof e.label != "string")
    throw new Error("manifest.label must be a string when provided");
  if (e.meta !== void 0 && !ft(e.meta))
    throw new Error("manifest.meta must be an object when provided");
  const t = e.playback === void 0 ? { advanceMode: "manual", endMode: "stop" } : gr(e.playback);
  return {
    version: typeof e.version == "number" ? e.version : 1,
    kind: typeof e.kind == "string" ? e.kind : "playlist",
    replays: (e.replays ?? []).map(pr),
    items: e.items.map(fr),
    label: typeof e.label == "string" ? e.label : "Playlist",
    page: e.page === void 0 ? void 0 : yr(e.page),
    meta: e.meta ?? {},
    playback: t
  };
}
async function Hr(e) {
  const t = await e.text();
  let n;
  try {
    n = JSON.parse(t);
  } catch (a) {
    throw new Error(
      `Failed to parse playlist manifest JSON: ${a instanceof Error ? a.message : String(a)}`
    );
  }
  return wr(n);
}
function Wr(e, t) {
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
function _r(e) {
  return typeof e != "string";
}
function Wt(e, t, n) {
  return Math.min(Math.max(e, t), n);
}
function Nn(e) {
  return e instanceof Error ? e.message : "Failed to load replay";
}
function Bn(e) {
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
function zn(e) {
  return e.advanceMode ? e.advanceMode : e.advanceOnEnd === !1 ? "manual" : "auto";
}
function Fn(e) {
  return e.endMode ?? "stop";
}
function it(e) {
  const t = [], n = /* @__PURE__ */ new Set();
  for (const a of e)
    n.has(a.replay.id) || (n.add(a.replay.id), t.push(a.replay));
  return t;
}
function $t(e, t, n, a, i) {
  const s = [], r = /* @__PURE__ */ new Set([i]);
  for (let o = t + n; o >= 0 && o < e.length && s.length < Math.max(0, a); o += n) {
    const l = e[o]?.replay;
    !l || r.has(l.id) || (r.add(l.id), s.push(l));
  }
  return s;
}
function Un(e, t, n) {
  const a = e[t];
  if (!a)
    return [];
  if (n.kind === "none")
    return [];
  if (n.kind === "all")
    return it(e).filter((l) => l.id !== a.replay.id);
  if (n.kind === "adjacent") {
    const l = $t(
      e,
      t,
      -1,
      n.behind ?? 0,
      a.replay.id
    ), d = $t(
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
    it(e).map((l) => [l.id, l])
  );
  for (const l of n.pick(i)) {
    const d = _r(l) ? l : o.get(l);
    !d || s.has(d.id) || (s.add(d.id), r.push(d));
  }
  return r;
}
function $r(e) {
  return { kind: "frame", value: e };
}
function Kt(e) {
  return { kind: "time", value: e };
}
function Ue(e, t) {
  return { id: e, load: t };
}
function Er(e, t) {
  return Ue(e, async () => t);
}
function Kr(e, t) {
  return Ue(e, async () => pt(t, { useWorker: !0 }));
}
function Yr(e, t = e.webkitRelativePath || e.name) {
  return Ue(t, async () => {
    const n = new Uint8Array(await e.arrayBuffer());
    return pt(n, { useWorker: !0 });
  });
}
function Zr(e, t, n = e) {
  return Ue(n, async (a) => t(e, a));
}
function vr(e, t = {}) {
  return {
    replay: e,
    start: Kt(0),
    end: Kt(Number.POSITIVE_INFINITY),
    label: t.label,
    meta: t.meta
  };
}
class Gn {
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
        error: Nn(s),
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
class Xr {
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
    this.items = t, this.loadCache = n.loadCache ?? new Gn(), this.preloadPolicy = Bn(n), this.advanceMode = zn(n), this.endMode = Fn(n), t.length > 0 && (this.currentItemIndex = Wt(n.initialItemIndex ?? 0, 0, t.length - 1), this.pendingLoad = this.loadItem(this.currentItemIndex));
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
    const n = Wt(t, 0, this.items.length - 1), a = ++this.loadGeneration, i = this.items[n];
    this.pendingItemIndex = n, this.loading = !0, this.error = null, this.playlistEnded = !1, this.emitChange();
    try {
      const s = await this.loadCache.load(i.replay);
      if (this.disposed || a !== this.loadGeneration)
        return;
      this.currentItemIndex = n, this.pendingItemIndex = null, this.currentLoaded = s, this.loading = !1, this.error = null, this.loadCache.preload(Un(this.items, n, this.preloadPolicy)), this.emitChange();
    } catch (s) {
      if (this.disposed || a !== this.loadGeneration)
        return;
      throw this.pendingItemIndex = null, this.loading = !1, this.error = Nn(s), this.currentLoaded = null, this.emitChange(), s;
    }
  }
  emitChange() {
    const t = this.getState();
    for (const n of this.listeners)
      n(t);
  }
}
const xr = 2.25, Mr = 1, Je = 1e-4;
function he(e, t, n) {
  return Math.min(Math.max(e, t), n);
}
function kr(e, t) {
  if (e.frames.length === 0)
    return 0;
  const n = e.frames.length - 1;
  return he(Math.round(t), 0, n);
}
function Sr(e) {
  return e instanceof Error ? e.message : "Failed to load replay";
}
function se(e) {
  return typeof e == "number" && Number.isFinite(e) ? e : void 0;
}
function Vn(e) {
  if (!e)
    return null;
  const t = {}, n = se(e.fov), a = se(e.height), i = se(e.pitch), s = se(e.distance), r = se(e.stiffness), o = se(e.swivelSpeed), l = se(e.transitionSpeed);
  return n !== void 0 && (t.fov = n), a !== void 0 && (t.height = a), i !== void 0 && (t.pitch = i), s !== void 0 && (t.distance = s), r !== void 0 && (t.stiffness = r), o !== void 0 && (t.swivelSpeed = o), l !== void 0 && (t.transitionSpeed = l), t;
}
function Yt(e, t) {
  if (t.kind === "frame") {
    const a = kr(e, t.value);
    return {
      frameIndex: a,
      time: e.frames[a]?.time ?? 0
    };
  }
  const n = he(t.value, 0, e.duration);
  return {
    frameIndex: pe(e, n),
    time: n
  };
}
function Tr(e, t, n) {
  if (n.time < t.time) {
    const a = e.label ? ` "${e.label}"` : "";
    throw new Error(`Playlist item${a} ends before it starts`);
  }
}
function Pr(e) {
  return {
    speed: Math.max(0.1, e.initialPlaybackRate ?? Mr),
    cameraDistanceScale: Math.max(
      0.25,
      e.initialCameraDistanceScale ?? xr
    ),
    customCameraSettings: Vn(e.initialCustomCameraSettings),
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
function Cr(e, t) {
  const n = Yt(t.replay, e.start), a = Yt(t.replay, e.end);
  return Tr(e, n, a), {
    source: e,
    replay: t,
    start: n,
    end: a,
    duration: Math.max(0, a.time - n.time)
  };
}
class st extends EventTarget {
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
  replayCache = new Gn();
  replayCacheUnsubscribe = null;
  preferences;
  preloadPolicy;
  advanceMode;
  endMode;
  static fromReplay(t, n, a = {}) {
    return st.fromReplaySource(
      t,
      Er(a.replayId ?? "replay", n),
      a
    );
  }
  static fromReplaySource(t, n, a = {}) {
    return new st(
      t,
      [
        vr(n, {
          label: a.itemLabel,
          meta: a.itemMeta
        })
      ],
      a
    );
  }
  constructor(t, n, a = {}) {
    if (super(), this.container = t, this.items = n, this.options = a, this.preferences = Pr(a), this.preloadPolicy = Bn(a), this.advanceMode = zn(a), this.endMode = Fn(a), this.playbackIntent = a.autoplay ?? !1, this.replayCacheUnsubscribe = this.replayCache.subscribe(() => {
      this.emitChange();
    }), n.length > 0) {
      const i = he(a.initialItemIndex ?? 0, 0, n.length - 1);
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
    const n = he(
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
    this.preferences.customCameraSettings = Vn(t), this.player?.setCustomCameraSettings(this.preferences.customCameraSettings), this.emitChange();
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
    const t = this.player?.getState() ?? null, n = this.pendingItemIndex ?? this.currentItemIndex, a = this.items[n] ?? null, i = t?.currentTime ?? 0, s = t?.duration ?? this.currentResolvedItem?.replay.replay.duration ?? 0, r = this.currentResolvedItem?.start.time ?? 0, o = this.currentResolvedItem?.duration ?? 0, l = he(i - r, 0, o), d = this.currentResolvedItem !== null && l >= o - Je;
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
    const n = he(t, 0, this.items.length - 1), a = ++this.loadGeneration, i = this.items[n];
    this.pendingItemIndex = n, this.loading = !0, this.error = null, this.emitChange();
    try {
      const s = this.loadReplaySource(i.replay);
      this.prefetchNearbyReplays(n);
      const r = await s;
      if (this.disposed || a !== this.loadGeneration)
        return;
      const o = Cr(i, r);
      this.currentItemIndex = n, this.pendingItemIndex = null, this.currentResolvedItem = o, this.attachPlayer(o), this.loading = !1, this.error = null, this.prefetchNearbyReplays(n), this.emitChange();
    } catch (s) {
      if (this.disposed || a !== this.loadGeneration)
        return;
      throw this.playbackIntent = !1, this.pendingItemIndex = null, this.loading = !1, this.error = Sr(s), this.detachPlayer(), this.currentResolvedItem = null, this.emitChange(), s;
    }
  }
  loadReplaySource(t) {
    return this.replayCache.load(t);
  }
  prefetchNearbyReplays(t) {
    this.replayCache.preload(Un(this.items, t, this.preloadPolicy));
  }
  getReplayLoadStates() {
    return it(this.items).map((t) => this.replayCache.getState(t));
  }
  attachPlayer(t) {
    this.detachPlayer();
    const n = t.replay.replay, a = n.players.some(
      (i) => i.id === this.preferences.attachedPlayerId
    ) ? this.preferences.attachedPlayerId : null;
    this.preferences.attachedPlayerId = a, a === null && this.preferences.cameraViewMode === "follow" && (this.preferences.cameraViewMode = "free"), this.player = new is(this.container, n, {
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
    if (t.playing && t.currentTime >= n - Je) {
      this.boundaryGuard = !0, this.advanceMode === "auto" && this.playbackIntent ? this.currentItemIndex < this.items.length - 1 ? this.setCurrentItemIndex(this.currentItemIndex + 1) : this.endMode === "loop" && this.items.length > 0 ? this.setCurrentItemIndex(0) : (this.playbackIntent = !1, this.player?.setState({ currentTime: n, playing: !1 })) : (this.playbackIntent = !1, this.player?.setState({ currentTime: n, playing: !1 })), this.boundaryGuard = !1, this.emitChange();
      return;
    }
    if (t.currentTime > n + Je) {
      this.boundaryGuard = !0, this.player?.setState({ currentTime: n, playing: !1 }), this.playbackIntent = !1, this.boundaryGuard = !1, this.emitChange();
      return;
    }
    this.emitChange();
  }
  emitChange() {
    this.dispatchEvent(new CustomEvent("change", { detail: this.getState() }));
  }
}
const Zt = "subtr-actor-replay-load-overlay-styles";
function Ir() {
  if (document.getElementById(Zt))
    return;
  const e = document.createElement("style");
  e.id = Zt, e.textContent = `
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
function Ar(e) {
  const t = e.progress === void 0 ? null : Math.round(e.progress * 100);
  return e.stage === "processing" ? t === null || e.totalFrames === void 0 ? "Processing replay frames..." : `Processing replay frames... ${t}% (${e.processedFrames ?? 0}/${e.totalFrames})` : e.stage === "validating" ? "Validating replay..." : e.stage === "normalizing" ? t !== null ? `Normalizing replay data... ${t}%` : "Normalizing replay data..." : "Loading replay...";
}
function Rr(e) {
  const t = e.progress ?? 0;
  return e.stage === "processing" ? e.totalFrames !== void 0 ? e.processedFrames === void 0 ? `${e.totalFrames} frames` : `${e.processedFrames}/${e.totalFrames} frames` : "Extracting frame data" : e.stage === "validating" ? "Checking replay file" : e.stage === "normalizing" ? t < 0.45 ? "Decoding structured replay data" : t < 0.65 ? "Parsing frame data" : t < 1 ? "Building playback model" : "Playback model ready" : e.stage;
}
function qr(e, t = {}) {
  Ir();
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
    const b = Math.max(0, Math.min(1, u ?? 0));
    l.style.width = `${Math.round(b * 100)}%`;
  };
  return {
    update(u) {
      i.dataset.state = "loading", r.textContent = t.formatProgress?.(u) ?? Ar(u), h(u.progress), d.textContent = Rr(u);
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
  hs as BALLCHASING_API_BASE_URL,
  Sn as BALLCHASING_BASE_URL,
  eo as BOOST_RAW_MAX,
  Et as DEFAULT_REPLAY_HITBOX_KIND,
  Gn as PlaylistLoadCache,
  Xr as PlaylistSession,
  la as REPLAY_HITBOX_SPECS,
  is as ReplayPlayer,
  st as ReplayPlaylistPlayer,
  Xt as boostAmountToPercent,
  to as boostPercentToAmount,
  Mi as computeTimelineSegments,
  Fr as createBallchasingOverlayPlugin,
  zr as createBallchasingReplaySource,
  Ur as createBoostPadOverlayPlugin,
  Gr as createBoostPickupAnimationPlugin,
  Vr as createCanvasRecorderPlugin,
  vr as createFullReplayPlaylistItem,
  Kr as createReplayBytesSource,
  Yr as createReplayFileSource,
  qr as createReplayLoadOverlay,
  Zr as createReplayPathSource,
  Ue as createReplaySource,
  Er as createStaticReplaySource,
  jr as createTimelineOverlayPlugin,
  ss as ensureBindingsReady,
  bs as fetchBallchasingReplayBytes,
  pe as findFrameIndexAtTime,
  Ar as formatReplayLoadProgress,
  Rr as formatReplayLoadProgressMeta,
  $r as frameBound,
  Dt as getActiveDemoEvent,
  Br as getBallchasingReplayApiFileUrl,
  Nr as getBallchasingReplayFileName,
  fs as getBallchasingReplayFileUrl,
  Ci as getFrameWindow,
  Pi as getKickoffCountdownMetadata,
  Qi as getKickoffSkipTargetTime,
  Ji as getPostGoalTransitionSkipTargetTime,
  tn as getReplayHitboxSpec,
  Ti as getReplayPlaybackEndTime,
  Ei as inferKickoffGameState,
  _i as inferLiveGameState,
  nn as inferReplayHitboxKind,
  en as inferReplayHitboxKindFromBodyName,
  Re as interpolatePosition,
  Ot as isBallchasingReplayId,
  ts as isPlayerSamplePresent,
  Hr as loadPlaylistManifestFromFile,
  pt as loadReplayFromBytes,
  Fe as normalizeBallchasingReplayId,
  Lr as normalizeReplayData,
  yi as normalizeReplayDataAsync,
  ua as normalizeReplayHitboxKind,
  wr as parsePlaylistManifest,
  Y as playerIdToString,
  ki as projectReplayTimeToTimeline,
  Si as projectTimelineTimeToReplay,
  Cr as resolvePlaylistItem,
  Wr as resolvePlaylistItemsFromManifest,
  Kt as timeBound,
  nr as timelineEventSeekTime,
  ds as validateReplayBytes
};
