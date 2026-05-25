const Ks={ROTATE:0,DOLLY:1,PAN:2},$s={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Tv=0,lh=1,Av=2,am=1,Cv=2,oi=3,Ui=0,rn=1,Je=2,Ri=0,js=1,Pi=2,ch=3,uh=4,Rv=5,is=100,Pv=101,Lv=102,Iv=103,Nv=104,Dv=200,Uv=201,Fv=202,Ov=203,Oc=204,kc=205,kv=206,Bv=207,zv=208,Hv=209,Vv=210,Gv=211,$v=212,Wv=213,Xv=214,Bc=0,zc=1,Hc=2,ia=3,Vc=4,Gc=5,$c=6,Wc=7,ol=0,qv=1,Yv=2,Li=0,Zv=1,Kv=2,jv=3,Jv=4,Qv=5,e0=6,t0=7,rm=300,sa=301,aa=302,Xc=303,qc=304,ll=306,Yc=1e3,rs=1001,Zc=1002,kn=1003,n0=1004,Tr=1005,Xn=1006,Cl=1007,os=1008,Jn=1009,om=1010,lm=1011,er=1012,gd=1013,hs=1014,li=1015,br=1016,_d=1017,vd=1018,tr=1020,cm=35902,um=35899,dm=1021,hm=1022,On=1023,nr=1026,ir=1027,fm=1028,yd=1029,pm=1030,bd=1031,xd=1033,mo=33776,go=33777,_o=33778,vo=33779,Kc=35840,jc=35841,Jc=35842,Qc=35843,eu=36196,tu=37492,nu=37496,iu=37808,su=37809,au=37810,ru=37811,ou=37812,lu=37813,cu=37814,uu=37815,du=37816,hu=37817,fu=37818,pu=37819,mu=37820,gu=37821,_u=36492,vu=36494,yu=36495,bu=36283,xu=36284,Su=36285,wu=36286,i0=3200,s0=3201,Sd=0,a0=1,Ai="",Wt="srgb",ra="srgb-linear",Oo="linear",ct="srgb",Ss=7680,dh=519,r0=512,o0=513,l0=514,mm=515,c0=516,u0=517,d0=518,h0=519,Eu=35044,hh="300 es",qn=2e3,ko=2001;class _s{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const s=i[e];if(s!==void 0){const a=s.indexOf(t);a!==-1&&s.splice(a,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let a=0,r=s.length;a<r;a++)s[a].call(this,e);e.target=null}}}const Vt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let fh=1234567;const za=Math.PI/180,sr=180/Math.PI;function Yn(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Vt[n&255]+Vt[n>>8&255]+Vt[n>>16&255]+Vt[n>>24&255]+"-"+Vt[e&255]+Vt[e>>8&255]+"-"+Vt[e>>16&15|64]+Vt[e>>24&255]+"-"+Vt[t&63|128]+Vt[t>>8&255]+"-"+Vt[t>>16&255]+Vt[t>>24&255]+Vt[i&255]+Vt[i>>8&255]+Vt[i>>16&255]+Vt[i>>24&255]).toLowerCase()}function qe(n,e,t){return Math.max(e,Math.min(t,n))}function wd(n,e){return(n%e+e)%e}function f0(n,e,t,i,s){return i+(n-e)*(s-i)/(t-e)}function p0(n,e,t){return n!==e?(t-n)/(e-n):0}function Ha(n,e,t){return(1-t)*n+t*e}function m0(n,e,t,i){return Ha(n,e,1-Math.exp(-t*i))}function g0(n,e=1){return e-Math.abs(wd(n,e*2)-e)}function _0(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function v0(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function y0(n,e){return n+Math.floor(Math.random()*(e-n+1))}function b0(n,e){return n+Math.random()*(e-n)}function x0(n){return n*(.5-Math.random())}function S0(n){n!==void 0&&(fh=n);let e=fh+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function w0(n){return n*za}function E0(n){return n*sr}function M0(n){return(n&n-1)===0&&n!==0}function T0(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function A0(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function C0(n,e,t,i,s){const a=Math.cos,r=Math.sin,o=a(t/2),l=r(t/2),c=a((e+i)/2),u=r((e+i)/2),d=a((e-i)/2),h=r((e-i)/2),p=a((i-e)/2),g=r((i-e)/2);switch(s){case"XYX":n.set(o*u,l*d,l*h,o*c);break;case"YZY":n.set(l*h,o*u,l*d,o*c);break;case"ZXZ":n.set(l*d,l*h,o*u,o*c);break;case"XZX":n.set(o*u,l*g,l*p,o*c);break;case"YXY":n.set(l*p,o*u,l*g,o*c);break;case"ZYZ":n.set(l*g,l*p,o*u,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Un(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function at(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const pt={DEG2RAD:za,RAD2DEG:sr,generateUUID:Yn,clamp:qe,euclideanModulo:wd,mapLinear:f0,inverseLerp:p0,lerp:Ha,damp:m0,pingpong:g0,smoothstep:_0,smootherstep:v0,randInt:y0,randFloat:b0,randFloatSpread:x0,seededRandom:S0,degToRad:w0,radToDeg:E0,isPowerOfTwo:M0,ceilPowerOfTwo:T0,floorPowerOfTwo:A0,setQuaternionFromProperEuler:C0,normalize:at,denormalize:Un};class ue{constructor(e=0,t=0){ue.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=qe(this.x,e.x,t.x),this.y=qe(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=qe(this.x,e,t),this.y=qe(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(qe(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(qe(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),a=this.x-e.x,r=this.y-e.y;return this.x=a*i-r*s+e.x,this.y=a*s+r*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Fi{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,a,r,o){let l=i[s+0],c=i[s+1],u=i[s+2],d=i[s+3];const h=a[r+0],p=a[r+1],g=a[r+2],_=a[r+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d;return}if(o===1){e[t+0]=h,e[t+1]=p,e[t+2]=g,e[t+3]=_;return}if(d!==_||l!==h||c!==p||u!==g){let m=1-o;const f=l*h+c*p+u*g+d*_,w=f>=0?1:-1,x=1-f*f;if(x>Number.EPSILON){const C=Math.sqrt(x),M=Math.atan2(C,f*w);m=Math.sin(m*M)/C,o=Math.sin(o*M)/C}const y=o*w;if(l=l*m+h*y,c=c*m+p*y,u=u*m+g*y,d=d*m+_*y,m===1-o){const C=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=C,c*=C,u*=C,d*=C}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,s,a,r){const o=i[s],l=i[s+1],c=i[s+2],u=i[s+3],d=a[r],h=a[r+1],p=a[r+2],g=a[r+3];return e[t]=o*g+u*d+l*p-c*h,e[t+1]=l*g+u*h+c*d-o*p,e[t+2]=c*g+u*p+o*h-l*d,e[t+3]=u*g-o*d-l*h-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,s=e._y,a=e._z,r=e._order,o=Math.cos,l=Math.sin,c=o(i/2),u=o(s/2),d=o(a/2),h=l(i/2),p=l(s/2),g=l(a/2);switch(r){case"XYZ":this._x=h*u*d+c*p*g,this._y=c*p*d-h*u*g,this._z=c*u*g+h*p*d,this._w=c*u*d-h*p*g;break;case"YXZ":this._x=h*u*d+c*p*g,this._y=c*p*d-h*u*g,this._z=c*u*g-h*p*d,this._w=c*u*d+h*p*g;break;case"ZXY":this._x=h*u*d-c*p*g,this._y=c*p*d+h*u*g,this._z=c*u*g+h*p*d,this._w=c*u*d-h*p*g;break;case"ZYX":this._x=h*u*d-c*p*g,this._y=c*p*d+h*u*g,this._z=c*u*g-h*p*d,this._w=c*u*d+h*p*g;break;case"YZX":this._x=h*u*d+c*p*g,this._y=c*p*d+h*u*g,this._z=c*u*g-h*p*d,this._w=c*u*d-h*p*g;break;case"XZY":this._x=h*u*d-c*p*g,this._y=c*p*d-h*u*g,this._z=c*u*g+h*p*d,this._w=c*u*d+h*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+r)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],a=t[8],r=t[1],o=t[5],l=t[9],c=t[2],u=t[6],d=t[10],h=i+o+d;if(h>0){const p=.5/Math.sqrt(h+1);this._w=.25/p,this._x=(u-l)*p,this._y=(a-c)*p,this._z=(r-s)*p}else if(i>o&&i>d){const p=2*Math.sqrt(1+i-o-d);this._w=(u-l)/p,this._x=.25*p,this._y=(s+r)/p,this._z=(a+c)/p}else if(o>d){const p=2*Math.sqrt(1+o-i-d);this._w=(a-c)/p,this._x=(s+r)/p,this._y=.25*p,this._z=(l+u)/p}else{const p=2*Math.sqrt(1+d-i-o);this._w=(r-s)/p,this._x=(a+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(qe(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,a=e._z,r=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+r*o+s*c-a*l,this._y=s*u+r*l+a*o-i*c,this._z=a*u+r*c+i*l-s*o,this._w=r*u-i*o-s*l-a*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,s=this._y,a=this._z,r=this._w;let o=r*e._w+i*e._x+s*e._y+a*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=r,this._x=i,this._y=s,this._z=a,this;const l=1-o*o;if(l<=Number.EPSILON){const p=1-t;return this._w=p*r+t*this._w,this._x=p*i+t*this._x,this._y=p*s+t*this._y,this._z=p*a+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,o),d=Math.sin((1-t)*u)/c,h=Math.sin(t*u)/c;return this._w=r*d+this._w*h,this._x=i*d+this._x*h,this._y=s*d+this._y*h,this._z=a*d+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),a=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),a*Math.sin(t),a*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class L{constructor(e=0,t=0,i=0){L.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(ph.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(ph.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,a=e.elements;return this.x=a[0]*t+a[3]*i+a[6]*s,this.y=a[1]*t+a[4]*i+a[7]*s,this.z=a[2]*t+a[5]*i+a[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,a=e.elements,r=1/(a[3]*t+a[7]*i+a[11]*s+a[15]);return this.x=(a[0]*t+a[4]*i+a[8]*s+a[12])*r,this.y=(a[1]*t+a[5]*i+a[9]*s+a[13])*r,this.z=(a[2]*t+a[6]*i+a[10]*s+a[14])*r,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,a=e.x,r=e.y,o=e.z,l=e.w,c=2*(r*s-o*i),u=2*(o*t-a*s),d=2*(a*i-r*t);return this.x=t+l*c+r*d-o*u,this.y=i+l*u+o*c-a*d,this.z=s+l*d+a*u-r*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*s,this.y=a[1]*t+a[5]*i+a[9]*s,this.z=a[2]*t+a[6]*i+a[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=qe(this.x,e.x,t.x),this.y=qe(this.y,e.y,t.y),this.z=qe(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=qe(this.x,e,t),this.y=qe(this.y,e,t),this.z=qe(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(qe(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,a=e.z,r=t.x,o=t.y,l=t.z;return this.x=s*l-a*o,this.y=a*r-i*l,this.z=i*o-s*r,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Rl.copy(this).projectOnVector(e),this.sub(Rl)}reflect(e){return this.sub(Rl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(qe(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Rl=new L,ph=new Fi;class $e{constructor(e,t,i,s,a,r,o,l,c){$e.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,a,r,o,l,c)}set(e,t,i,s,a,r,o,l,c){const u=this.elements;return u[0]=e,u[1]=s,u[2]=o,u[3]=t,u[4]=a,u[5]=l,u[6]=i,u[7]=r,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,a=this.elements,r=i[0],o=i[3],l=i[6],c=i[1],u=i[4],d=i[7],h=i[2],p=i[5],g=i[8],_=s[0],m=s[3],f=s[6],w=s[1],x=s[4],y=s[7],C=s[2],M=s[5],T=s[8];return a[0]=r*_+o*w+l*C,a[3]=r*m+o*x+l*M,a[6]=r*f+o*y+l*T,a[1]=c*_+u*w+d*C,a[4]=c*m+u*x+d*M,a[7]=c*f+u*y+d*T,a[2]=h*_+p*w+g*C,a[5]=h*m+p*x+g*M,a[8]=h*f+p*y+g*T,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],a=e[3],r=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*r*u-t*o*c-i*a*u+i*o*l+s*a*c-s*r*l}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],a=e[3],r=e[4],o=e[5],l=e[6],c=e[7],u=e[8],d=u*r-o*c,h=o*l-u*a,p=c*a-r*l,g=t*d+i*h+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=d*_,e[1]=(s*c-u*i)*_,e[2]=(o*i-s*r)*_,e[3]=h*_,e[4]=(u*t-s*l)*_,e[5]=(s*a-o*t)*_,e[6]=p*_,e[7]=(i*l-c*t)*_,e[8]=(r*t-i*a)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,a,r,o){const l=Math.cos(a),c=Math.sin(a);return this.set(i*l,i*c,-i*(l*r+c*o)+r+e,-s*c,s*l,-s*(-c*r+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Pl.makeScale(e,t)),this}rotate(e){return this.premultiply(Pl.makeRotation(-e)),this}translate(e,t){return this.premultiply(Pl.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Pl=new $e;function gm(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Bo(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function R0(){const n=Bo("canvas");return n.style.display="block",n}const mh={};function ar(n){n in mh||(mh[n]=!0,console.warn(n))}function P0(n,e,t){return new Promise(function(i,s){function a(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(a,t);break;default:i()}}setTimeout(a,t)})}const gh=new $e().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),_h=new $e().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function L0(){const n={enabled:!0,workingColorSpace:ra,spaces:{},convert:function(s,a,r){return this.enabled===!1||a===r||!a||!r||(this.spaces[a].transfer===ct&&(s.r=ui(s.r),s.g=ui(s.g),s.b=ui(s.b)),this.spaces[a].primaries!==this.spaces[r].primaries&&(s.applyMatrix3(this.spaces[a].toXYZ),s.applyMatrix3(this.spaces[r].fromXYZ)),this.spaces[r].transfer===ct&&(s.r=Js(s.r),s.g=Js(s.g),s.b=Js(s.b))),s},workingToColorSpace:function(s,a){return this.convert(s,this.workingColorSpace,a)},colorSpaceToWorking:function(s,a){return this.convert(s,a,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Ai?Oo:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,a=this.workingColorSpace){return s.fromArray(this.spaces[a].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,a,r){return s.copy(this.spaces[a].toXYZ).multiply(this.spaces[r].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,a){return ar("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,a)},toWorkingColorSpace:function(s,a){return ar("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,a)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[ra]:{primaries:e,whitePoint:i,transfer:Oo,toXYZ:gh,fromXYZ:_h,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Wt},outputColorSpaceConfig:{drawingBufferColorSpace:Wt}},[Wt]:{primaries:e,whitePoint:i,transfer:ct,toXYZ:gh,fromXYZ:_h,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Wt}}}),n}const tt=L0();function ui(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Js(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let ws;class I0{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{ws===void 0&&(ws=Bo("canvas")),ws.width=e.width,ws.height=e.height;const s=ws.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=ws}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Bo("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),a=s.data;for(let r=0;r<a.length;r++)a[r]=ui(a[r]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(ui(t[i]/255)*255):t[i]=ui(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let N0=0;class Ed{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:N0++}),this.uuid=Yn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let a;if(Array.isArray(s)){a=[];for(let r=0,o=s.length;r<o;r++)s[r].isDataTexture?a.push(Ll(s[r].image)):a.push(Ll(s[r]))}else a=Ll(s);i.url=a}return t||(e.images[this.uuid]=i),i}}function Ll(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?I0.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let D0=0;const Il=new L;class Kt extends _s{constructor(e=Kt.DEFAULT_IMAGE,t=Kt.DEFAULT_MAPPING,i=rs,s=rs,a=Xn,r=os,o=On,l=Jn,c=Kt.DEFAULT_ANISOTROPY,u=Ai){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:D0++}),this.uuid=Yn(),this.name="",this.source=new Ed(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=a,this.minFilter=r,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ue(0,0),this.repeat=new ue(1,1),this.center=new ue(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new $e,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Il).x}get height(){return this.source.getSize(Il).y}get depth(){return this.source.getSize(Il).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==rm)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Yc:e.x=e.x-Math.floor(e.x);break;case rs:e.x=e.x<0?0:1;break;case Zc:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Yc:e.y=e.y-Math.floor(e.y);break;case rs:e.y=e.y<0?0:1;break;case Zc:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Kt.DEFAULT_IMAGE=null;Kt.DEFAULT_MAPPING=rm;Kt.DEFAULT_ANISOTROPY=1;class Tt{constructor(e=0,t=0,i=0,s=1){Tt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,a=this.w,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s+r[12]*a,this.y=r[1]*t+r[5]*i+r[9]*s+r[13]*a,this.z=r[2]*t+r[6]*i+r[10]*s+r[14]*a,this.w=r[3]*t+r[7]*i+r[11]*s+r[15]*a,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,a;const l=e.elements,c=l[0],u=l[4],d=l[8],h=l[1],p=l[5],g=l[9],_=l[2],m=l[6],f=l[10];if(Math.abs(u-h)<.01&&Math.abs(d-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const x=(c+1)/2,y=(p+1)/2,C=(f+1)/2,M=(u+h)/4,T=(d+_)/4,A=(g+m)/4;return x>y&&x>C?x<.01?(i=0,s=.707106781,a=.707106781):(i=Math.sqrt(x),s=M/i,a=T/i):y>C?y<.01?(i=.707106781,s=0,a=.707106781):(s=Math.sqrt(y),i=M/s,a=A/s):C<.01?(i=.707106781,s=.707106781,a=0):(a=Math.sqrt(C),i=T/a,s=A/a),this.set(i,s,a,t),this}let w=Math.sqrt((m-g)*(m-g)+(d-_)*(d-_)+(h-u)*(h-u));return Math.abs(w)<.001&&(w=1),this.x=(m-g)/w,this.y=(d-_)/w,this.z=(h-u)/w,this.w=Math.acos((c+p+f-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=qe(this.x,e.x,t.x),this.y=qe(this.y,e.y,t.y),this.z=qe(this.z,e.z,t.z),this.w=qe(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=qe(this.x,e,t),this.y=qe(this.y,e,t),this.z=qe(this.z,e,t),this.w=qe(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(qe(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class U0 extends _s{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Xn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new Tt(0,0,e,t),this.scissorTest=!1,this.viewport=new Tt(0,0,e,t);const s={width:e,height:t,depth:i.depth},a=new Kt(s);this.textures=[];const r=i.count;for(let o=0;o<r;o++)this.textures[o]=a.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){const t={minFilter:Xn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,a=this.textures.length;s<a;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new Ed(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class fs extends U0{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class _m extends Kt{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=kn,this.minFilter=kn,this.wrapR=rs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class F0 extends Kt{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=kn,this.minFilter=kn,this.wrapR=rs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class xr{constructor(e=new L(1/0,1/0,1/0),t=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(An.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(An.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=An.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const a=i.getAttribute("position");if(t===!0&&a!==void 0&&e.isInstancedMesh!==!0)for(let r=0,o=a.count;r<o;r++)e.isMesh===!0?e.getVertexPosition(r,An):An.fromBufferAttribute(a,r),An.applyMatrix4(e.matrixWorld),this.expandByPoint(An);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ar.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Ar.copy(i.boundingBox)),Ar.applyMatrix4(e.matrixWorld),this.union(Ar)}const s=e.children;for(let a=0,r=s.length;a<r;a++)this.expandByObject(s[a],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,An),An.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ba),Cr.subVectors(this.max,ba),Es.subVectors(e.a,ba),Ms.subVectors(e.b,ba),Ts.subVectors(e.c,ba),gi.subVectors(Ms,Es),_i.subVectors(Ts,Ms),Wi.subVectors(Es,Ts);let t=[0,-gi.z,gi.y,0,-_i.z,_i.y,0,-Wi.z,Wi.y,gi.z,0,-gi.x,_i.z,0,-_i.x,Wi.z,0,-Wi.x,-gi.y,gi.x,0,-_i.y,_i.x,0,-Wi.y,Wi.x,0];return!Nl(t,Es,Ms,Ts,Cr)||(t=[1,0,0,0,1,0,0,0,1],!Nl(t,Es,Ms,Ts,Cr))?!1:(Rr.crossVectors(gi,_i),t=[Rr.x,Rr.y,Rr.z],Nl(t,Es,Ms,Ts,Cr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,An).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(An).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ti[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ti[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ti[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ti[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ti[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ti[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ti[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ti[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ti),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const ti=[new L,new L,new L,new L,new L,new L,new L,new L],An=new L,Ar=new xr,Es=new L,Ms=new L,Ts=new L,gi=new L,_i=new L,Wi=new L,ba=new L,Cr=new L,Rr=new L,Xi=new L;function Nl(n,e,t,i,s){for(let a=0,r=n.length-3;a<=r;a+=3){Xi.fromArray(n,a);const o=s.x*Math.abs(Xi.x)+s.y*Math.abs(Xi.y)+s.z*Math.abs(Xi.z),l=e.dot(Xi),c=t.dot(Xi),u=i.dot(Xi);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const O0=new xr,xa=new L,Dl=new L;class cl{constructor(e=new L,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):O0.setFromPoints(e).getCenter(i);let s=0;for(let a=0,r=e.length;a<r;a++)s=Math.max(s,i.distanceToSquared(e[a]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;xa.subVectors(e,this.center);const t=xa.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(xa,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Dl.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(xa.copy(e.center).add(Dl)),this.expandByPoint(xa.copy(e.center).sub(Dl))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const ni=new L,Ul=new L,Pr=new L,vi=new L,Fl=new L,Lr=new L,Ol=new L;class Md{constructor(e=new L,t=new L(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ni)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=ni.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ni.copy(this.origin).addScaledVector(this.direction,t),ni.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){Ul.copy(e).add(t).multiplyScalar(.5),Pr.copy(t).sub(e).normalize(),vi.copy(this.origin).sub(Ul);const a=e.distanceTo(t)*.5,r=-this.direction.dot(Pr),o=vi.dot(this.direction),l=-vi.dot(Pr),c=vi.lengthSq(),u=Math.abs(1-r*r);let d,h,p,g;if(u>0)if(d=r*l-o,h=r*o-l,g=a*u,d>=0)if(h>=-g)if(h<=g){const _=1/u;d*=_,h*=_,p=d*(d+r*h+2*o)+h*(r*d+h+2*l)+c}else h=a,d=Math.max(0,-(r*h+o)),p=-d*d+h*(h+2*l)+c;else h=-a,d=Math.max(0,-(r*h+o)),p=-d*d+h*(h+2*l)+c;else h<=-g?(d=Math.max(0,-(-r*a+o)),h=d>0?-a:Math.min(Math.max(-a,-l),a),p=-d*d+h*(h+2*l)+c):h<=g?(d=0,h=Math.min(Math.max(-a,-l),a),p=h*(h+2*l)+c):(d=Math.max(0,-(r*a+o)),h=d>0?a:Math.min(Math.max(-a,-l),a),p=-d*d+h*(h+2*l)+c);else h=r>0?-a:a,d=Math.max(0,-(r*h+o)),p=-d*d+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(Ul).addScaledVector(Pr,h),p}intersectSphere(e,t){ni.subVectors(e.center,this.origin);const i=ni.dot(this.direction),s=ni.dot(ni)-i*i,a=e.radius*e.radius;if(s>a)return null;const r=Math.sqrt(a-s),o=i-r,l=i+r;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,a,r,o,l;const c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return c>=0?(i=(e.min.x-h.x)*c,s=(e.max.x-h.x)*c):(i=(e.max.x-h.x)*c,s=(e.min.x-h.x)*c),u>=0?(a=(e.min.y-h.y)*u,r=(e.max.y-h.y)*u):(a=(e.max.y-h.y)*u,r=(e.min.y-h.y)*u),i>r||a>s||((a>i||isNaN(i))&&(i=a),(r<s||isNaN(s))&&(s=r),d>=0?(o=(e.min.z-h.z)*d,l=(e.max.z-h.z)*d):(o=(e.max.z-h.z)*d,l=(e.min.z-h.z)*d),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,ni)!==null}intersectTriangle(e,t,i,s,a){Fl.subVectors(t,e),Lr.subVectors(i,e),Ol.crossVectors(Fl,Lr);let r=this.direction.dot(Ol),o;if(r>0){if(s)return null;o=1}else if(r<0)o=-1,r=-r;else return null;vi.subVectors(this.origin,e);const l=o*this.direction.dot(Lr.crossVectors(vi,Lr));if(l<0)return null;const c=o*this.direction.dot(Fl.cross(vi));if(c<0||l+c>r)return null;const u=-o*vi.dot(Ol);return u<0?null:this.at(u/r,a)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class vt{constructor(e,t,i,s,a,r,o,l,c,u,d,h,p,g,_,m){vt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,a,r,o,l,c,u,d,h,p,g,_,m)}set(e,t,i,s,a,r,o,l,c,u,d,h,p,g,_,m){const f=this.elements;return f[0]=e,f[4]=t,f[8]=i,f[12]=s,f[1]=a,f[5]=r,f[9]=o,f[13]=l,f[2]=c,f[6]=u,f[10]=d,f[14]=h,f[3]=p,f[7]=g,f[11]=_,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new vt().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,s=1/As.setFromMatrixColumn(e,0).length(),a=1/As.setFromMatrixColumn(e,1).length(),r=1/As.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*a,t[5]=i[5]*a,t[6]=i[6]*a,t[7]=0,t[8]=i[8]*r,t[9]=i[9]*r,t[10]=i[10]*r,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,a=e.z,r=Math.cos(i),o=Math.sin(i),l=Math.cos(s),c=Math.sin(s),u=Math.cos(a),d=Math.sin(a);if(e.order==="XYZ"){const h=r*u,p=r*d,g=o*u,_=o*d;t[0]=l*u,t[4]=-l*d,t[8]=c,t[1]=p+g*c,t[5]=h-_*c,t[9]=-o*l,t[2]=_-h*c,t[6]=g+p*c,t[10]=r*l}else if(e.order==="YXZ"){const h=l*u,p=l*d,g=c*u,_=c*d;t[0]=h+_*o,t[4]=g*o-p,t[8]=r*c,t[1]=r*d,t[5]=r*u,t[9]=-o,t[2]=p*o-g,t[6]=_+h*o,t[10]=r*l}else if(e.order==="ZXY"){const h=l*u,p=l*d,g=c*u,_=c*d;t[0]=h-_*o,t[4]=-r*d,t[8]=g+p*o,t[1]=p+g*o,t[5]=r*u,t[9]=_-h*o,t[2]=-r*c,t[6]=o,t[10]=r*l}else if(e.order==="ZYX"){const h=r*u,p=r*d,g=o*u,_=o*d;t[0]=l*u,t[4]=g*c-p,t[8]=h*c+_,t[1]=l*d,t[5]=_*c+h,t[9]=p*c-g,t[2]=-c,t[6]=o*l,t[10]=r*l}else if(e.order==="YZX"){const h=r*l,p=r*c,g=o*l,_=o*c;t[0]=l*u,t[4]=_-h*d,t[8]=g*d+p,t[1]=d,t[5]=r*u,t[9]=-o*u,t[2]=-c*u,t[6]=p*d+g,t[10]=h-_*d}else if(e.order==="XZY"){const h=r*l,p=r*c,g=o*l,_=o*c;t[0]=l*u,t[4]=-d,t[8]=c*u,t[1]=h*d+_,t[5]=r*u,t[9]=p*d-g,t[2]=g*d-p,t[6]=o*u,t[10]=_*d+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(k0,e,B0)}lookAt(e,t,i){const s=this.elements;return cn.subVectors(e,t),cn.lengthSq()===0&&(cn.z=1),cn.normalize(),yi.crossVectors(i,cn),yi.lengthSq()===0&&(Math.abs(i.z)===1?cn.x+=1e-4:cn.z+=1e-4,cn.normalize(),yi.crossVectors(i,cn)),yi.normalize(),Ir.crossVectors(cn,yi),s[0]=yi.x,s[4]=Ir.x,s[8]=cn.x,s[1]=yi.y,s[5]=Ir.y,s[9]=cn.y,s[2]=yi.z,s[6]=Ir.z,s[10]=cn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,a=this.elements,r=i[0],o=i[4],l=i[8],c=i[12],u=i[1],d=i[5],h=i[9],p=i[13],g=i[2],_=i[6],m=i[10],f=i[14],w=i[3],x=i[7],y=i[11],C=i[15],M=s[0],T=s[4],A=s[8],v=s[12],b=s[1],R=s[5],N=s[9],k=s[13],z=s[2],V=s[6],O=s[10],q=s[14],H=s[3],ne=s[7],X=s[11],Q=s[15];return a[0]=r*M+o*b+l*z+c*H,a[4]=r*T+o*R+l*V+c*ne,a[8]=r*A+o*N+l*O+c*X,a[12]=r*v+o*k+l*q+c*Q,a[1]=u*M+d*b+h*z+p*H,a[5]=u*T+d*R+h*V+p*ne,a[9]=u*A+d*N+h*O+p*X,a[13]=u*v+d*k+h*q+p*Q,a[2]=g*M+_*b+m*z+f*H,a[6]=g*T+_*R+m*V+f*ne,a[10]=g*A+_*N+m*O+f*X,a[14]=g*v+_*k+m*q+f*Q,a[3]=w*M+x*b+y*z+C*H,a[7]=w*T+x*R+y*V+C*ne,a[11]=w*A+x*N+y*O+C*X,a[15]=w*v+x*k+y*q+C*Q,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],a=e[12],r=e[1],o=e[5],l=e[9],c=e[13],u=e[2],d=e[6],h=e[10],p=e[14],g=e[3],_=e[7],m=e[11],f=e[15];return g*(+a*l*d-s*c*d-a*o*h+i*c*h+s*o*p-i*l*p)+_*(+t*l*p-t*c*h+a*r*h-s*r*p+s*c*u-a*l*u)+m*(+t*c*d-t*o*p-a*r*d+i*r*p+a*o*u-i*c*u)+f*(-s*o*u-t*l*d+t*o*h+s*r*d-i*r*h+i*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],a=e[3],r=e[4],o=e[5],l=e[6],c=e[7],u=e[8],d=e[9],h=e[10],p=e[11],g=e[12],_=e[13],m=e[14],f=e[15],w=d*m*c-_*h*c+_*l*p-o*m*p-d*l*f+o*h*f,x=g*h*c-u*m*c-g*l*p+r*m*p+u*l*f-r*h*f,y=u*_*c-g*d*c+g*o*p-r*_*p-u*o*f+r*d*f,C=g*d*l-u*_*l-g*o*h+r*_*h+u*o*m-r*d*m,M=t*w+i*x+s*y+a*C;if(M===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const T=1/M;return e[0]=w*T,e[1]=(_*h*a-d*m*a-_*s*p+i*m*p+d*s*f-i*h*f)*T,e[2]=(o*m*a-_*l*a+_*s*c-i*m*c-o*s*f+i*l*f)*T,e[3]=(d*l*a-o*h*a-d*s*c+i*h*c+o*s*p-i*l*p)*T,e[4]=x*T,e[5]=(u*m*a-g*h*a+g*s*p-t*m*p-u*s*f+t*h*f)*T,e[6]=(g*l*a-r*m*a-g*s*c+t*m*c+r*s*f-t*l*f)*T,e[7]=(r*h*a-u*l*a+u*s*c-t*h*c-r*s*p+t*l*p)*T,e[8]=y*T,e[9]=(g*d*a-u*_*a-g*i*p+t*_*p+u*i*f-t*d*f)*T,e[10]=(r*_*a-g*o*a+g*i*c-t*_*c-r*i*f+t*o*f)*T,e[11]=(u*o*a-r*d*a-u*i*c+t*d*c+r*i*p-t*o*p)*T,e[12]=C*T,e[13]=(u*_*s-g*d*s+g*i*h-t*_*h-u*i*m+t*d*m)*T,e[14]=(g*o*s-r*_*s-g*i*l+t*_*l+r*i*m-t*o*m)*T,e[15]=(r*d*s-u*o*s+u*i*l-t*d*l-r*i*h+t*o*h)*T,this}scale(e){const t=this.elements,i=e.x,s=e.y,a=e.z;return t[0]*=i,t[4]*=s,t[8]*=a,t[1]*=i,t[5]*=s,t[9]*=a,t[2]*=i,t[6]*=s,t[10]*=a,t[3]*=i,t[7]*=s,t[11]*=a,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),a=1-i,r=e.x,o=e.y,l=e.z,c=a*r,u=a*o;return this.set(c*r+i,c*o-s*l,c*l+s*o,0,c*o+s*l,u*o+i,u*l-s*r,0,c*l-s*o,u*l+s*r,a*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,a,r){return this.set(1,i,a,0,e,1,r,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,a=t._x,r=t._y,o=t._z,l=t._w,c=a+a,u=r+r,d=o+o,h=a*c,p=a*u,g=a*d,_=r*u,m=r*d,f=o*d,w=l*c,x=l*u,y=l*d,C=i.x,M=i.y,T=i.z;return s[0]=(1-(_+f))*C,s[1]=(p+y)*C,s[2]=(g-x)*C,s[3]=0,s[4]=(p-y)*M,s[5]=(1-(h+f))*M,s[6]=(m+w)*M,s[7]=0,s[8]=(g+x)*T,s[9]=(m-w)*T,s[10]=(1-(h+_))*T,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;let a=As.set(s[0],s[1],s[2]).length();const r=As.set(s[4],s[5],s[6]).length(),o=As.set(s[8],s[9],s[10]).length();this.determinant()<0&&(a=-a),e.x=s[12],e.y=s[13],e.z=s[14],Cn.copy(this);const c=1/a,u=1/r,d=1/o;return Cn.elements[0]*=c,Cn.elements[1]*=c,Cn.elements[2]*=c,Cn.elements[4]*=u,Cn.elements[5]*=u,Cn.elements[6]*=u,Cn.elements[8]*=d,Cn.elements[9]*=d,Cn.elements[10]*=d,t.setFromRotationMatrix(Cn),i.x=a,i.y=r,i.z=o,this}makePerspective(e,t,i,s,a,r,o=qn,l=!1){const c=this.elements,u=2*a/(t-e),d=2*a/(i-s),h=(t+e)/(t-e),p=(i+s)/(i-s);let g,_;if(l)g=a/(r-a),_=r*a/(r-a);else if(o===qn)g=-(r+a)/(r-a),_=-2*r*a/(r-a);else if(o===ko)g=-r/(r-a),_=-r*a/(r-a);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=d,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,s,a,r,o=qn,l=!1){const c=this.elements,u=2/(t-e),d=2/(i-s),h=-(t+e)/(t-e),p=-(i+s)/(i-s);let g,_;if(l)g=1/(r-a),_=r/(r-a);else if(o===qn)g=-2/(r-a),_=-(r+a)/(r-a);else if(o===ko)g=-1/(r-a),_=-a/(r-a);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=d,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const As=new L,Cn=new vt,k0=new L(0,0,0),B0=new L(1,1,1),yi=new L,Ir=new L,cn=new L,vh=new vt,yh=new Fi;class zn{constructor(e=0,t=0,i=0,s=zn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,a=s[0],r=s[4],o=s[8],l=s[1],c=s[5],u=s[9],d=s[2],h=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(qe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-r,a)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-qe(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,a),this._z=0);break;case"ZXY":this._x=Math.asin(qe(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-r,c)):(this._y=0,this._z=Math.atan2(l,a));break;case"ZYX":this._y=Math.asin(-qe(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,p),this._z=Math.atan2(l,a)):(this._x=0,this._z=Math.atan2(-r,c));break;case"YZX":this._z=Math.asin(qe(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,a)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-qe(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,a)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return vh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(vh,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return yh.setFromEuler(this),this.setFromQuaternion(yh,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}zn.DEFAULT_ORDER="XYZ";class vm{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let z0=0;const bh=new L,Cs=new Fi,ii=new vt,Nr=new L,Sa=new L,H0=new L,V0=new Fi,xh=new L(1,0,0),Sh=new L(0,1,0),wh=new L(0,0,1),Eh={type:"added"},G0={type:"removed"},Rs={type:"childadded",child:null},kl={type:"childremoved",child:null};class It extends _s{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:z0++}),this.uuid=Yn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=It.DEFAULT_UP.clone();const e=new L,t=new zn,i=new Fi,s=new L(1,1,1);function a(){i.setFromEuler(t,!1)}function r(){t.setFromQuaternion(i,void 0,!1)}t._onChange(a),i._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new vt},normalMatrix:{value:new $e}}),this.matrix=new vt,this.matrixWorld=new vt,this.matrixAutoUpdate=It.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=It.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new vm,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Cs.setFromAxisAngle(e,t),this.quaternion.multiply(Cs),this}rotateOnWorldAxis(e,t){return Cs.setFromAxisAngle(e,t),this.quaternion.premultiply(Cs),this}rotateX(e){return this.rotateOnAxis(xh,e)}rotateY(e){return this.rotateOnAxis(Sh,e)}rotateZ(e){return this.rotateOnAxis(wh,e)}translateOnAxis(e,t){return bh.copy(e).applyQuaternion(this.quaternion),this.position.add(bh.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(xh,e)}translateY(e){return this.translateOnAxis(Sh,e)}translateZ(e){return this.translateOnAxis(wh,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ii.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Nr.copy(e):Nr.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),Sa.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ii.lookAt(Sa,Nr,this.up):ii.lookAt(Nr,Sa,this.up),this.quaternion.setFromRotationMatrix(ii),s&&(ii.extractRotation(s.matrixWorld),Cs.setFromRotationMatrix(ii),this.quaternion.premultiply(Cs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Eh),Rs.child=e,this.dispatchEvent(Rs),Rs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(G0),kl.child=e,this.dispatchEvent(kl),kl.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ii.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ii.multiply(e.parent.matrixWorld)),e.applyMatrix4(ii),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Eh),Rs.child=e,this.dispatchEvent(Rs),Rs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const r=this.children[i].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const s=this.children;for(let a=0,r=s.length;a<r;a++)s[a].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Sa,e,H0),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Sa,V0,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let a=0,r=s.length;a<r;a++)s[a].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function a(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=a(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const d=l[c];a(e.shapes,d)}else a(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(a(e.materials,this.material[l]));s.material=o}else s.material=a(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(a(e.animations,l))}}if(t){const o=r(e.geometries),l=r(e.materials),c=r(e.textures),u=r(e.images),d=r(e.shapes),h=r(e.skeletons),p=r(e.animations),g=r(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),d.length>0&&(i.shapes=d),h.length>0&&(i.skeletons=h),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=s,i;function r(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}}It.DEFAULT_UP=new L(0,1,0);It.DEFAULT_MATRIX_AUTO_UPDATE=!0;It.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Rn=new L,si=new L,Bl=new L,ai=new L,Ps=new L,Ls=new L,Mh=new L,zl=new L,Hl=new L,Vl=new L,Gl=new Tt,$l=new Tt,Wl=new Tt;class Mn{constructor(e=new L,t=new L,i=new L){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),Rn.subVectors(e,t),s.cross(Rn);const a=s.lengthSq();return a>0?s.multiplyScalar(1/Math.sqrt(a)):s.set(0,0,0)}static getBarycoord(e,t,i,s,a){Rn.subVectors(s,t),si.subVectors(i,t),Bl.subVectors(e,t);const r=Rn.dot(Rn),o=Rn.dot(si),l=Rn.dot(Bl),c=si.dot(si),u=si.dot(Bl),d=r*c-o*o;if(d===0)return a.set(0,0,0),null;const h=1/d,p=(c*l-o*u)*h,g=(r*u-o*l)*h;return a.set(1-p-g,g,p)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,ai)===null?!1:ai.x>=0&&ai.y>=0&&ai.x+ai.y<=1}static getInterpolation(e,t,i,s,a,r,o,l){return this.getBarycoord(e,t,i,s,ai)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(a,ai.x),l.addScaledVector(r,ai.y),l.addScaledVector(o,ai.z),l)}static getInterpolatedAttribute(e,t,i,s,a,r){return Gl.setScalar(0),$l.setScalar(0),Wl.setScalar(0),Gl.fromBufferAttribute(e,t),$l.fromBufferAttribute(e,i),Wl.fromBufferAttribute(e,s),r.setScalar(0),r.addScaledVector(Gl,a.x),r.addScaledVector($l,a.y),r.addScaledVector(Wl,a.z),r}static isFrontFacing(e,t,i,s){return Rn.subVectors(i,t),si.subVectors(e,t),Rn.cross(si).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Rn.subVectors(this.c,this.b),si.subVectors(this.a,this.b),Rn.cross(si).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Mn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Mn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,a){return Mn.getInterpolation(e,this.a,this.b,this.c,t,i,s,a)}containsPoint(e){return Mn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Mn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,a=this.c;let r,o;Ps.subVectors(s,i),Ls.subVectors(a,i),zl.subVectors(e,i);const l=Ps.dot(zl),c=Ls.dot(zl);if(l<=0&&c<=0)return t.copy(i);Hl.subVectors(e,s);const u=Ps.dot(Hl),d=Ls.dot(Hl);if(u>=0&&d<=u)return t.copy(s);const h=l*d-u*c;if(h<=0&&l>=0&&u<=0)return r=l/(l-u),t.copy(i).addScaledVector(Ps,r);Vl.subVectors(e,a);const p=Ps.dot(Vl),g=Ls.dot(Vl);if(g>=0&&p<=g)return t.copy(a);const _=p*c-l*g;if(_<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(i).addScaledVector(Ls,o);const m=u*g-p*d;if(m<=0&&d-u>=0&&p-g>=0)return Mh.subVectors(a,s),o=(d-u)/(d-u+(p-g)),t.copy(s).addScaledVector(Mh,o);const f=1/(m+_+h);return r=_*f,o=h*f,t.copy(i).addScaledVector(Ps,r).addScaledVector(Ls,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const ym={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},bi={h:0,s:0,l:0},Dr={h:0,s:0,l:0};function Xl(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Ze{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Wt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,tt.colorSpaceToWorking(this,t),this}setRGB(e,t,i,s=tt.workingColorSpace){return this.r=e,this.g=t,this.b=i,tt.colorSpaceToWorking(this,s),this}setHSL(e,t,i,s=tt.workingColorSpace){if(e=wd(e,1),t=qe(t,0,1),i=qe(i,0,1),t===0)this.r=this.g=this.b=i;else{const a=i<=.5?i*(1+t):i+t-i*t,r=2*i-a;this.r=Xl(r,a,e+1/3),this.g=Xl(r,a,e),this.b=Xl(r,a,e-1/3)}return tt.colorSpaceToWorking(this,s),this}setStyle(e,t=Wt){function i(a){a!==void 0&&parseFloat(a)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let a;const r=s[1],o=s[2];switch(r){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,t);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,t);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const a=s[1],r=a.length;if(r===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,t);if(r===6)return this.setHex(parseInt(a,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Wt){const i=ym[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ui(e.r),this.g=ui(e.g),this.b=ui(e.b),this}copyLinearToSRGB(e){return this.r=Js(e.r),this.g=Js(e.g),this.b=Js(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Wt){return tt.workingToColorSpace(Gt.copy(this),e),Math.round(qe(Gt.r*255,0,255))*65536+Math.round(qe(Gt.g*255,0,255))*256+Math.round(qe(Gt.b*255,0,255))}getHexString(e=Wt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=tt.workingColorSpace){tt.workingToColorSpace(Gt.copy(this),t);const i=Gt.r,s=Gt.g,a=Gt.b,r=Math.max(i,s,a),o=Math.min(i,s,a);let l,c;const u=(o+r)/2;if(o===r)l=0,c=0;else{const d=r-o;switch(c=u<=.5?d/(r+o):d/(2-r-o),r){case i:l=(s-a)/d+(s<a?6:0);break;case s:l=(a-i)/d+2;break;case a:l=(i-s)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=tt.workingColorSpace){return tt.workingToColorSpace(Gt.copy(this),t),e.r=Gt.r,e.g=Gt.g,e.b=Gt.b,e}getStyle(e=Wt){tt.workingToColorSpace(Gt.copy(this),e);const t=Gt.r,i=Gt.g,s=Gt.b;return e!==Wt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(bi),this.setHSL(bi.h+e,bi.s+t,bi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(bi),e.getHSL(Dr);const i=Ha(bi.h,Dr.h,t),s=Ha(bi.s,Dr.s,t),a=Ha(bi.l,Dr.l,t);return this.setHSL(i,s,a),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,a=e.elements;return this.r=a[0]*t+a[3]*i+a[6]*s,this.g=a[1]*t+a[4]*i+a[7]*s,this.b=a[2]*t+a[5]*i+a[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Gt=new Ze;Ze.NAMES=ym;let $0=0;class mi extends _s{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:$0++}),this.uuid=Yn(),this.name="",this.type="Material",this.blending=js,this.side=Ui,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Oc,this.blendDst=kc,this.blendEquation=is,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ze(0,0,0),this.blendAlpha=0,this.depthFunc=ia,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=dh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ss,this.stencilZFail=Ss,this.stencilZPass=Ss,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==js&&(i.blending=this.blending),this.side!==Ui&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Oc&&(i.blendSrc=this.blendSrc),this.blendDst!==kc&&(i.blendDst=this.blendDst),this.blendEquation!==is&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==ia&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==dh&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ss&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Ss&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Ss&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(a){const r=[];for(const o in a){const l=a[o];delete l.metadata,r.push(l)}return r}if(t){const a=s(e.textures),r=s(e.images);a.length>0&&(i.textures=a),r.length>0&&(i.images=r)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let a=0;a!==s;++a)i[a]=t[a].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class rt extends mi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ze(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new zn,this.combine=ol,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Rt=new L,Ur=new ue;let W0=0;class Bn{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:W0++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Eu,this.updateRanges=[],this.gpuType=li,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,a=this.itemSize;s<a;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Ur.fromBufferAttribute(this,t),Ur.applyMatrix3(e),this.setXY(t,Ur.x,Ur.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Rt.fromBufferAttribute(this,t),Rt.applyMatrix3(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Rt.fromBufferAttribute(this,t),Rt.applyMatrix4(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Rt.fromBufferAttribute(this,t),Rt.applyNormalMatrix(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Rt.fromBufferAttribute(this,t),Rt.transformDirection(e),this.setXYZ(t,Rt.x,Rt.y,Rt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Un(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=at(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Un(t,this.array)),t}setX(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Un(t,this.array)),t}setY(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Un(t,this.array)),t}setZ(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Un(t,this.array)),t}setW(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=at(t,this.array),i=at(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=at(t,this.array),i=at(i,this.array),s=at(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,a){return e*=this.itemSize,this.normalized&&(t=at(t,this.array),i=at(i,this.array),s=at(s,this.array),a=at(a,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=a,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Eu&&(e.usage=this.usage),e}}class bm extends Bn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class xm extends Bn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class st extends Bn{constructor(e,t,i){super(new Float32Array(e),t,i)}}let X0=0;const xn=new vt,ql=new It,Is=new L,un=new xr,wa=new xr,Ft=new L;class Ct extends _s{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:X0++}),this.uuid=Yn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(gm(e)?xm:bm)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const a=new $e().getNormalMatrix(e);i.applyNormalMatrix(a),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return xn.makeRotationFromQuaternion(e),this.applyMatrix4(xn),this}rotateX(e){return xn.makeRotationX(e),this.applyMatrix4(xn),this}rotateY(e){return xn.makeRotationY(e),this.applyMatrix4(xn),this}rotateZ(e){return xn.makeRotationZ(e),this.applyMatrix4(xn),this}translate(e,t,i){return xn.makeTranslation(e,t,i),this.applyMatrix4(xn),this}scale(e,t,i){return xn.makeScale(e,t,i),this.applyMatrix4(xn),this}lookAt(e){return ql.lookAt(e),ql.updateMatrix(),this.applyMatrix4(ql.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Is).negate(),this.translate(Is.x,Is.y,Is.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let s=0,a=e.length;s<a;s++){const r=e[s];i.push(r.x,r.y,r.z||0)}this.setAttribute("position",new st(i,3))}else{const i=Math.min(e.length,t.count);for(let s=0;s<i;s++){const a=e[s];t.setXYZ(s,a.x,a.y,a.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new xr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const a=t[i];un.setFromBufferAttribute(a),this.morphTargetsRelative?(Ft.addVectors(this.boundingBox.min,un.min),this.boundingBox.expandByPoint(Ft),Ft.addVectors(this.boundingBox.max,un.max),this.boundingBox.expandByPoint(Ft)):(this.boundingBox.expandByPoint(un.min),this.boundingBox.expandByPoint(un.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new cl);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(e){const i=this.boundingSphere.center;if(un.setFromBufferAttribute(e),t)for(let a=0,r=t.length;a<r;a++){const o=t[a];wa.setFromBufferAttribute(o),this.morphTargetsRelative?(Ft.addVectors(un.min,wa.min),un.expandByPoint(Ft),Ft.addVectors(un.max,wa.max),un.expandByPoint(Ft)):(un.expandByPoint(wa.min),un.expandByPoint(wa.max))}un.getCenter(i);let s=0;for(let a=0,r=e.count;a<r;a++)Ft.fromBufferAttribute(e,a),s=Math.max(s,i.distanceToSquared(Ft));if(t)for(let a=0,r=t.length;a<r;a++){const o=t[a],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Ft.fromBufferAttribute(o,c),l&&(Is.fromBufferAttribute(e,c),Ft.add(Is)),s=Math.max(s,i.distanceToSquared(Ft))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,s=t.normal,a=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Bn(new Float32Array(4*i.count),4));const r=this.getAttribute("tangent"),o=[],l=[];for(let A=0;A<i.count;A++)o[A]=new L,l[A]=new L;const c=new L,u=new L,d=new L,h=new ue,p=new ue,g=new ue,_=new L,m=new L;function f(A,v,b){c.fromBufferAttribute(i,A),u.fromBufferAttribute(i,v),d.fromBufferAttribute(i,b),h.fromBufferAttribute(a,A),p.fromBufferAttribute(a,v),g.fromBufferAttribute(a,b),u.sub(c),d.sub(c),p.sub(h),g.sub(h);const R=1/(p.x*g.y-g.x*p.y);isFinite(R)&&(_.copy(u).multiplyScalar(g.y).addScaledVector(d,-p.y).multiplyScalar(R),m.copy(d).multiplyScalar(p.x).addScaledVector(u,-g.x).multiplyScalar(R),o[A].add(_),o[v].add(_),o[b].add(_),l[A].add(m),l[v].add(m),l[b].add(m))}let w=this.groups;w.length===0&&(w=[{start:0,count:e.count}]);for(let A=0,v=w.length;A<v;++A){const b=w[A],R=b.start,N=b.count;for(let k=R,z=R+N;k<z;k+=3)f(e.getX(k+0),e.getX(k+1),e.getX(k+2))}const x=new L,y=new L,C=new L,M=new L;function T(A){C.fromBufferAttribute(s,A),M.copy(C);const v=o[A];x.copy(v),x.sub(C.multiplyScalar(C.dot(v))).normalize(),y.crossVectors(M,v);const R=y.dot(l[A])<0?-1:1;r.setXYZW(A,x.x,x.y,x.z,R)}for(let A=0,v=w.length;A<v;++A){const b=w[A],R=b.start,N=b.count;for(let k=R,z=R+N;k<z;k+=3)T(e.getX(k+0)),T(e.getX(k+1)),T(e.getX(k+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Bn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let h=0,p=i.count;h<p;h++)i.setXYZ(h,0,0,0);const s=new L,a=new L,r=new L,o=new L,l=new L,c=new L,u=new L,d=new L;if(e)for(let h=0,p=e.count;h<p;h+=3){const g=e.getX(h+0),_=e.getX(h+1),m=e.getX(h+2);s.fromBufferAttribute(t,g),a.fromBufferAttribute(t,_),r.fromBufferAttribute(t,m),u.subVectors(r,a),d.subVectors(s,a),u.cross(d),o.fromBufferAttribute(i,g),l.fromBufferAttribute(i,_),c.fromBufferAttribute(i,m),o.add(u),l.add(u),c.add(u),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let h=0,p=t.count;h<p;h+=3)s.fromBufferAttribute(t,h+0),a.fromBufferAttribute(t,h+1),r.fromBufferAttribute(t,h+2),u.subVectors(r,a),d.subVectors(s,a),u.cross(d),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Ft.fromBufferAttribute(e,t),Ft.normalize(),e.setXYZ(t,Ft.x,Ft.y,Ft.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,d=o.normalized,h=new c.constructor(l.length*u);let p=0,g=0;for(let _=0,m=l.length;_<m;_++){o.isInterleavedBufferAttribute?p=l[_]*o.data.stride+o.offset:p=l[_]*u;for(let f=0;f<u;f++)h[g++]=c[p++]}return new Bn(h,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Ct,i=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=e(l,i);t.setAttribute(o,c)}const a=this.morphAttributes;for(const o in a){const l=[],c=a[o];for(let u=0,d=c.length;u<d;u++){const h=c[u],p=e(h,i);l.push(p)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const r=this.groups;for(let o=0,l=r.length;o<l;o++){const c=r[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let a=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let d=0,h=c.length;d<h;d++){const p=c[d];u.push(p.toJSON(e.data))}u.length>0&&(s[l]=u,a=!0)}a&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const r=this.groups;r.length>0&&(e.data.groups=JSON.parse(JSON.stringify(r)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const s=e.attributes;for(const c in s){const u=s[c];this.setAttribute(c,u.clone(t))}const a=e.morphAttributes;for(const c in a){const u=[],d=a[c];for(let h=0,p=d.length;h<p;h++)u.push(d[h].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const r=e.groups;for(let c=0,u=r.length;c<u;c++){const d=r[c];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Th=new vt,qi=new Md,Fr=new cl,Ah=new L,Or=new L,kr=new L,Br=new L,Yl=new L,zr=new L,Ch=new L,Hr=new L;class ze extends It{constructor(e=new Ct,t=new rt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,r=s.length;a<r;a++){const o=s[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,a=i.morphAttributes.position,r=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(a&&o){zr.set(0,0,0);for(let l=0,c=a.length;l<c;l++){const u=o[l],d=a[l];u!==0&&(Yl.fromBufferAttribute(d,e),r?zr.addScaledVector(Yl,u):zr.addScaledVector(Yl.sub(t),u))}t.add(zr)}return t}raycast(e,t){const i=this.geometry,s=this.material,a=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Fr.copy(i.boundingSphere),Fr.applyMatrix4(a),qi.copy(e.ray).recast(e.near),!(Fr.containsPoint(qi.origin)===!1&&(qi.intersectSphere(Fr,Ah)===null||qi.origin.distanceToSquared(Ah)>(e.far-e.near)**2))&&(Th.copy(a).invert(),qi.copy(e.ray).applyMatrix4(Th),!(i.boundingBox!==null&&qi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,qi)))}_computeIntersections(e,t,i){let s;const a=this.geometry,r=this.material,o=a.index,l=a.attributes.position,c=a.attributes.uv,u=a.attributes.uv1,d=a.attributes.normal,h=a.groups,p=a.drawRange;if(o!==null)if(Array.isArray(r))for(let g=0,_=h.length;g<_;g++){const m=h[g],f=r[m.materialIndex],w=Math.max(m.start,p.start),x=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let y=w,C=x;y<C;y+=3){const M=o.getX(y),T=o.getX(y+1),A=o.getX(y+2);s=Vr(this,f,e,i,c,u,d,M,T,A),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,p.start),_=Math.min(o.count,p.start+p.count);for(let m=g,f=_;m<f;m+=3){const w=o.getX(m),x=o.getX(m+1),y=o.getX(m+2);s=Vr(this,r,e,i,c,u,d,w,x,y),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(r))for(let g=0,_=h.length;g<_;g++){const m=h[g],f=r[m.materialIndex],w=Math.max(m.start,p.start),x=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let y=w,C=x;y<C;y+=3){const M=y,T=y+1,A=y+2;s=Vr(this,f,e,i,c,u,d,M,T,A),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,p.start),_=Math.min(l.count,p.start+p.count);for(let m=g,f=_;m<f;m+=3){const w=m,x=m+1,y=m+2;s=Vr(this,r,e,i,c,u,d,w,x,y),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function q0(n,e,t,i,s,a,r,o){let l;if(e.side===rn?l=i.intersectTriangle(r,a,s,!0,o):l=i.intersectTriangle(s,a,r,e.side===Ui,o),l===null)return null;Hr.copy(o),Hr.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(Hr);return c<t.near||c>t.far?null:{distance:c,point:Hr.clone(),object:n}}function Vr(n,e,t,i,s,a,r,o,l,c){n.getVertexPosition(o,Or),n.getVertexPosition(l,kr),n.getVertexPosition(c,Br);const u=q0(n,e,t,i,Or,kr,Br,Ch);if(u){const d=new L;Mn.getBarycoord(Ch,Or,kr,Br,d),s&&(u.uv=Mn.getInterpolatedAttribute(s,o,l,c,d,new ue)),a&&(u.uv1=Mn.getInterpolatedAttribute(a,o,l,c,d,new ue)),r&&(u.normal=Mn.getInterpolatedAttribute(r,o,l,c,d,new L),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const h={a:o,b:l,c,normal:new L,materialIndex:0};Mn.getNormal(Or,kr,Br,h.normal),u.face=h,u.barycoord=d}return u}class vs extends Ct{constructor(e=1,t=1,i=1,s=1,a=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:a,depthSegments:r};const o=this;s=Math.floor(s),a=Math.floor(a),r=Math.floor(r);const l=[],c=[],u=[],d=[];let h=0,p=0;g("z","y","x",-1,-1,i,t,e,r,a,0),g("z","y","x",1,-1,i,t,-e,r,a,1),g("x","z","y",1,1,e,i,t,s,r,2),g("x","z","y",1,-1,e,i,-t,s,r,3),g("x","y","z",1,-1,e,t,i,s,a,4),g("x","y","z",-1,-1,e,t,-i,s,a,5),this.setIndex(l),this.setAttribute("position",new st(c,3)),this.setAttribute("normal",new st(u,3)),this.setAttribute("uv",new st(d,2));function g(_,m,f,w,x,y,C,M,T,A,v){const b=y/T,R=C/A,N=y/2,k=C/2,z=M/2,V=T+1,O=A+1;let q=0,H=0;const ne=new L;for(let X=0;X<O;X++){const Q=X*R-k;for(let ge=0;ge<V;ge++){const ve=ge*b-N;ne[_]=ve*w,ne[m]=Q*x,ne[f]=z,c.push(ne.x,ne.y,ne.z),ne[_]=0,ne[m]=0,ne[f]=M>0?1:-1,u.push(ne.x,ne.y,ne.z),d.push(ge/T),d.push(1-X/A),q+=1}}for(let X=0;X<A;X++)for(let Q=0;Q<T;Q++){const ge=h+Q+V*X,ve=h+Q+V*(X+1),Re=h+(Q+1)+V*(X+1),te=h+(Q+1)+V*X;l.push(ge,ve,te),l.push(ve,Re,te),H+=6}o.addGroup(p,H,v),p+=H,h+=q}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new vs(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function oa(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone():Array.isArray(s)?e[t][i]=s.slice():e[t][i]=s}}return e}function Zt(n){const e={};for(let t=0;t<n.length;t++){const i=oa(n[t]);for(const s in i)e[s]=i[s]}return e}function Y0(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Sm(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:tt.workingColorSpace}const Z0={clone:oa,merge:Zt};var K0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,j0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Oi extends mi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=K0,this.fragmentShader=j0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=oa(e.uniforms),this.uniformsGroups=Y0(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const r=this.uniforms[s].value;r&&r.isTexture?t.uniforms[s]={type:"t",value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[s]={type:"c",value:r.getHex()}:r&&r.isVector2?t.uniforms[s]={type:"v2",value:r.toArray()}:r&&r.isVector3?t.uniforms[s]={type:"v3",value:r.toArray()}:r&&r.isVector4?t.uniforms[s]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?t.uniforms[s]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?t.uniforms[s]={type:"m4",value:r.toArray()}:t.uniforms[s]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class wm extends It{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new vt,this.projectionMatrix=new vt,this.projectionMatrixInverse=new vt,this.coordinateSystem=qn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const xi=new L,Rh=new ue,Ph=new ue;class wn extends wm{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=sr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(za*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return sr*2*Math.atan(Math.tan(za*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){xi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(xi.x,xi.y).multiplyScalar(-e/xi.z),xi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(xi.x,xi.y).multiplyScalar(-e/xi.z)}getViewSize(e,t){return this.getViewBounds(e,Rh,Ph),t.subVectors(Ph,Rh)}setViewOffset(e,t,i,s,a,r){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=a,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(za*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,a=-.5*s;const r=this.view;if(this.view!==null&&this.view.enabled){const l=r.fullWidth,c=r.fullHeight;a+=r.offsetX*s/l,t-=r.offsetY*i/c,s*=r.width/l,i*=r.height/c}const o=this.filmOffset;o!==0&&(a+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+s,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Ns=-90,Ds=1;class J0 extends It{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new wn(Ns,Ds,e,t);s.layers=this.layers,this.add(s);const a=new wn(Ns,Ds,e,t);a.layers=this.layers,this.add(a);const r=new wn(Ns,Ds,e,t);r.layers=this.layers,this.add(r);const o=new wn(Ns,Ds,e,t);o.layers=this.layers,this.add(o);const l=new wn(Ns,Ds,e,t);l.layers=this.layers,this.add(l);const c=new wn(Ns,Ds,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,a,r,o,l]=t;for(const c of t)this.remove(c);if(e===qn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===ko)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[a,r,o,l,c,u]=this.children,d=e.getRenderTarget(),h=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,s),e.render(t,a),e.setRenderTarget(i,1,s),e.render(t,r),e.setRenderTarget(i,2,s),e.render(t,o),e.setRenderTarget(i,3,s),e.render(t,l),e.setRenderTarget(i,4,s),e.render(t,c),i.texture.generateMipmaps=_,e.setRenderTarget(i,5,s),e.render(t,u),e.setRenderTarget(d,h,p),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class Em extends Kt{constructor(e=[],t=sa,i,s,a,r,o,l,c,u){super(e,t,i,s,a,r,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Q0 extends fs{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new Em(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new vs(5,5,5),a=new Oi({name:"CubemapFromEquirect",uniforms:oa(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:rn,blending:Ri});a.uniforms.tEquirect.value=t;const r=new ze(s,a),o=t.minFilter;return t.minFilter===os&&(t.minFilter=Xn),new J0(1,10,this).update(e,r),t.minFilter=o,r.geometry.dispose(),r.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){const a=e.getRenderTarget();for(let r=0;r<6;r++)e.setRenderTarget(this,r),e.clear(t,i,s);e.setRenderTarget(a)}}class gt extends It{constructor(){super(),this.isGroup=!0,this.type="Group"}}const ey={type:"move"};class Zl{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new gt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new gt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new gt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,a=null,r=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){r=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,i),f=this._getHandJoint(c,_);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],h=u.position.distanceTo(d.position),p=.02,g=.005;c.inputState.pinching&&h>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(a=t.getPose(e.gripSpace,i),a!==null&&(l.matrix.fromArray(a.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,a.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(a.linearVelocity)):l.hasLinearVelocity=!1,a.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(a.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&a!==null&&(s=a),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(ey)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=a!==null),c!==null&&(c.visible=r!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new gt;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class ty extends It{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new zn,this.environmentIntensity=1,this.environmentRotation=new zn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class ny{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Eu,this.updateRanges=[],this.version=0,this.uuid=Yn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let s=0,a=this.stride;s<a;s++)this.array[e+s]=t.array[i+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Yn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Yn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Yt=new L;class zo{constructor(e,t,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)Yt.fromBufferAttribute(this,t),Yt.applyMatrix4(e),this.setXYZ(t,Yt.x,Yt.y,Yt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Yt.fromBufferAttribute(this,t),Yt.applyNormalMatrix(e),this.setXYZ(t,Yt.x,Yt.y,Yt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Yt.fromBufferAttribute(this,t),Yt.transformDirection(e),this.setXYZ(t,Yt.x,Yt.y,Yt.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=Un(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=at(i,this.array)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=at(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=at(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=at(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=at(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Un(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Un(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Un(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Un(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=at(t,this.array),i=at(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=at(t,this.array),i=at(i,this.array),s=at(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this}setXYZW(e,t,i,s,a){return e=e*this.data.stride+this.offset,this.normalized&&(t=at(t,this.array),i=at(i,this.array),s=at(s,this.array),a=at(a,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this.data.array[e+3]=a,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let a=0;a<this.itemSize;a++)t.push(this.data.array[s+a])}return new Bn(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new zo(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let a=0;a<this.itemSize;a++)t.push(this.data.array[s+a])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Mm extends mi{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Ze(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Us;const Ea=new L,Fs=new L,Os=new L,ks=new ue,Ma=new ue,Tm=new vt,Gr=new L,Ta=new L,$r=new L,Lh=new ue,Kl=new ue,Ih=new ue;class Am extends It{constructor(e=new Mm){if(super(),this.isSprite=!0,this.type="Sprite",Us===void 0){Us=new Ct;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new ny(t,5);Us.setIndex([0,1,2,0,2,3]),Us.setAttribute("position",new zo(i,3,0,!1)),Us.setAttribute("uv",new zo(i,2,3,!1))}this.geometry=Us,this.material=e,this.center=new ue(.5,.5),this.count=1}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Fs.setFromMatrixScale(this.matrixWorld),Tm.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Os.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Fs.multiplyScalar(-Os.z);const i=this.material.rotation;let s,a;i!==0&&(a=Math.cos(i),s=Math.sin(i));const r=this.center;Wr(Gr.set(-.5,-.5,0),Os,r,Fs,s,a),Wr(Ta.set(.5,-.5,0),Os,r,Fs,s,a),Wr($r.set(.5,.5,0),Os,r,Fs,s,a),Lh.set(0,0),Kl.set(1,0),Ih.set(1,1);let o=e.ray.intersectTriangle(Gr,Ta,$r,!1,Ea);if(o===null&&(Wr(Ta.set(-.5,.5,0),Os,r,Fs,s,a),Kl.set(0,1),o=e.ray.intersectTriangle(Gr,$r,Ta,!1,Ea),o===null))return;const l=e.ray.origin.distanceTo(Ea);l<e.near||l>e.far||t.push({distance:l,point:Ea.clone(),uv:Mn.getInterpolation(Ea,Gr,Ta,$r,Lh,Kl,Ih,new ue),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Wr(n,e,t,i,s,a){ks.subVectors(n,t).addScalar(.5).multiply(i),s!==void 0?(Ma.x=a*ks.x-s*ks.y,Ma.y=s*ks.x+a*ks.y):Ma.copy(ks),n.copy(e),n.x+=Ma.x,n.y+=Ma.y,n.applyMatrix4(Tm)}const jl=new L,iy=new L,sy=new $e;class Mi{constructor(e=new L(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=jl.subVectors(i,t).cross(iy.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(jl),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return a<0||a>1?null:t.copy(e.start).addScaledVector(i,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||sy.getNormalMatrix(e),s=this.coplanarPoint(jl).applyMatrix4(e),a=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(a),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Yi=new cl,ay=new ue(.5,.5),Xr=new L;class Td{constructor(e=new Mi,t=new Mi,i=new Mi,s=new Mi,a=new Mi,r=new Mi){this.planes=[e,t,i,s,a,r]}set(e,t,i,s,a,r){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(s),o[4].copy(a),o[5].copy(r),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=qn,i=!1){const s=this.planes,a=e.elements,r=a[0],o=a[1],l=a[2],c=a[3],u=a[4],d=a[5],h=a[6],p=a[7],g=a[8],_=a[9],m=a[10],f=a[11],w=a[12],x=a[13],y=a[14],C=a[15];if(s[0].setComponents(c-r,p-u,f-g,C-w).normalize(),s[1].setComponents(c+r,p+u,f+g,C+w).normalize(),s[2].setComponents(c+o,p+d,f+_,C+x).normalize(),s[3].setComponents(c-o,p-d,f-_,C-x).normalize(),i)s[4].setComponents(l,h,m,y).normalize(),s[5].setComponents(c-l,p-h,f-m,C-y).normalize();else if(s[4].setComponents(c-l,p-h,f-m,C-y).normalize(),t===qn)s[5].setComponents(c+l,p+h,f+m,C+y).normalize();else if(t===ko)s[5].setComponents(l,h,m,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Yi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Yi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Yi)}intersectsSprite(e){Yi.center.set(0,0,0);const t=ay.distanceTo(e.center);return Yi.radius=.7071067811865476+t,Yi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Yi)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let a=0;a<6;a++)if(t[a].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(Xr.x=s.normal.x>0?e.max.x:e.min.x,Xr.y=s.normal.y>0?e.max.y:e.min.y,Xr.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Xr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class ul extends mi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ze(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Ho=new L,Vo=new L,Nh=new vt,Aa=new Md,qr=new cl,Jl=new L,Dh=new L;class Ad extends It{constructor(e=new Ct,t=new ul){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let s=1,a=t.count;s<a;s++)Ho.fromBufferAttribute(t,s-1),Vo.fromBufferAttribute(t,s),i[s]=i[s-1],i[s]+=Ho.distanceTo(Vo);e.setAttribute("lineDistance",new st(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,a=e.params.Line.threshold,r=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),qr.copy(i.boundingSphere),qr.applyMatrix4(s),qr.radius+=a,e.ray.intersectsSphere(qr)===!1)return;Nh.copy(s).invert(),Aa.copy(e.ray).applyMatrix4(Nh);const o=a/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,u=i.index,h=i.attributes.position;if(u!==null){const p=Math.max(0,r.start),g=Math.min(u.count,r.start+r.count);for(let _=p,m=g-1;_<m;_+=c){const f=u.getX(_),w=u.getX(_+1),x=Yr(this,e,Aa,l,f,w,_);x&&t.push(x)}if(this.isLineLoop){const _=u.getX(g-1),m=u.getX(p),f=Yr(this,e,Aa,l,_,m,g-1);f&&t.push(f)}}else{const p=Math.max(0,r.start),g=Math.min(h.count,r.start+r.count);for(let _=p,m=g-1;_<m;_+=c){const f=Yr(this,e,Aa,l,_,_+1,_);f&&t.push(f)}if(this.isLineLoop){const _=Yr(this,e,Aa,l,g-1,p,g-1);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,r=s.length;a<r;a++){const o=s[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}}function Yr(n,e,t,i,s,a,r){const o=n.geometry.attributes.position;if(Ho.fromBufferAttribute(o,s),Vo.fromBufferAttribute(o,a),t.distanceSqToSegment(Ho,Vo,Jl,Dh)>i)return;Jl.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(Jl);if(!(c<e.near||c>e.far))return{distance:c,point:Dh.clone().applyMatrix4(n.matrixWorld),index:r,face:null,faceIndex:null,barycoord:null,object:n}}class dl extends Kt{constructor(e,t,i,s,a,r,o,l,c){super(e,t,i,s,a,r,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Cm extends Kt{constructor(e,t,i=hs,s,a,r,o=kn,l=kn,c,u=nr,d=1){if(u!==nr&&u!==ir)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:e,height:t,depth:d};super(h,s,a,r,o,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ed(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Rm extends Kt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Ws extends Ct{constructor(e=1,t=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:s},t=Math.max(3,t);const a=[],r=[],o=[],l=[],c=new L,u=new ue;r.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let d=0,h=3;d<=t;d++,h+=3){const p=i+d/t*s;c.x=e*Math.cos(p),c.y=e*Math.sin(p),r.push(c.x,c.y,c.z),o.push(0,0,1),u.x=(r[h]/e+1)/2,u.y=(r[h+1]/e+1)/2,l.push(u.x,u.y)}for(let d=1;d<=t;d++)a.push(d,d+1,0);this.setIndex(a),this.setAttribute("position",new st(r,3)),this.setAttribute("normal",new st(o,3)),this.setAttribute("uv",new st(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ws(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class hl extends Ct{constructor(e=1,t=1,i=1,s=32,a=1,r=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:s,heightSegments:a,openEnded:r,thetaStart:o,thetaLength:l};const c=this;s=Math.floor(s),a=Math.floor(a);const u=[],d=[],h=[],p=[];let g=0;const _=[],m=i/2;let f=0;w(),r===!1&&(e>0&&x(!0),t>0&&x(!1)),this.setIndex(u),this.setAttribute("position",new st(d,3)),this.setAttribute("normal",new st(h,3)),this.setAttribute("uv",new st(p,2));function w(){const y=new L,C=new L;let M=0;const T=(t-e)/i;for(let A=0;A<=a;A++){const v=[],b=A/a,R=b*(t-e)+e;for(let N=0;N<=s;N++){const k=N/s,z=k*l+o,V=Math.sin(z),O=Math.cos(z);C.x=R*V,C.y=-b*i+m,C.z=R*O,d.push(C.x,C.y,C.z),y.set(V,T,O).normalize(),h.push(y.x,y.y,y.z),p.push(k,1-b),v.push(g++)}_.push(v)}for(let A=0;A<s;A++)for(let v=0;v<a;v++){const b=_[v][A],R=_[v+1][A],N=_[v+1][A+1],k=_[v][A+1];(e>0||v!==0)&&(u.push(b,R,k),M+=3),(t>0||v!==a-1)&&(u.push(R,N,k),M+=3)}c.addGroup(f,M,0),f+=M}function x(y){const C=g,M=new ue,T=new L;let A=0;const v=y===!0?e:t,b=y===!0?1:-1;for(let N=1;N<=s;N++)d.push(0,m*b,0),h.push(0,b,0),p.push(.5,.5),g++;const R=g;for(let N=0;N<=s;N++){const z=N/s*l+o,V=Math.cos(z),O=Math.sin(z);T.x=v*O,T.y=m*b,T.z=v*V,d.push(T.x,T.y,T.z),h.push(0,b,0),M.x=V*.5+.5,M.y=O*.5*b+.5,p.push(M.x,M.y),g++}for(let N=0;N<s;N++){const k=C+N,z=R+N;y===!0?u.push(z,z+1,k):u.push(z+1,z,k),A+=3}c.addGroup(f,A,y===!0?1:2),f+=A}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new hl(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class rr extends hl{constructor(e=1,t=1,i=32,s=1,a=!1,r=0,o=Math.PI*2){super(0,e,t,i,s,a,r,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:s,openEnded:a,thetaStart:r,thetaLength:o}}static fromJSON(e){return new rr(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Qn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){const i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let i,s=this.getPoint(0),a=0;t.push(0);for(let r=1;r<=e;r++)i=this.getPoint(r/e),a+=i.distanceTo(s),t.push(a),s=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const i=this.getLengths();let s=0;const a=i.length;let r;t?r=t:r=e*i[a-1];let o=0,l=a-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=i[s]-r,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,i[s]===r)return s/(a-1);const u=i[s],h=i[s+1]-u,p=(r-u)/h;return(s+p)/(a-1)}getTangent(e,t){let s=e-1e-4,a=e+1e-4;s<0&&(s=0),a>1&&(a=1);const r=this.getPoint(s),o=this.getPoint(a),l=t||(r.isVector2?new ue:new L);return l.copy(o).sub(r).normalize(),l}getTangentAt(e,t){const i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t=!1){const i=new L,s=[],a=[],r=[],o=new L,l=new vt;for(let p=0;p<=e;p++){const g=p/e;s[p]=this.getTangentAt(g,new L)}a[0]=new L,r[0]=new L;let c=Number.MAX_VALUE;const u=Math.abs(s[0].x),d=Math.abs(s[0].y),h=Math.abs(s[0].z);u<=c&&(c=u,i.set(1,0,0)),d<=c&&(c=d,i.set(0,1,0)),h<=c&&i.set(0,0,1),o.crossVectors(s[0],i).normalize(),a[0].crossVectors(s[0],o),r[0].crossVectors(s[0],a[0]);for(let p=1;p<=e;p++){if(a[p]=a[p-1].clone(),r[p]=r[p-1].clone(),o.crossVectors(s[p-1],s[p]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(qe(s[p-1].dot(s[p]),-1,1));a[p].applyMatrix4(l.makeRotationAxis(o,g))}r[p].crossVectors(s[p],a[p])}if(t===!0){let p=Math.acos(qe(a[0].dot(a[e]),-1,1));p/=e,s[0].dot(o.crossVectors(a[0],a[e]))>0&&(p=-p);for(let g=1;g<=e;g++)a[g].applyMatrix4(l.makeRotationAxis(s[g],p*g)),r[g].crossVectors(s[g],a[g])}return{tangents:s,normals:a,binormals:r}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Cd extends Qn{constructor(e=0,t=0,i=1,s=1,a=0,r=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=s,this.aStartAngle=a,this.aEndAngle=r,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new ue){const i=t,s=Math.PI*2;let a=this.aEndAngle-this.aStartAngle;const r=Math.abs(a)<Number.EPSILON;for(;a<0;)a+=s;for(;a>s;)a-=s;a<Number.EPSILON&&(r?a=0:a=s),this.aClockwise===!0&&!r&&(a===s?a=-s:a=a-s);const o=this.aStartAngle+e*a;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const u=Math.cos(this.aRotation),d=Math.sin(this.aRotation),h=l-this.aX,p=c-this.aY;l=h*u-p*d+this.aX,c=h*d+p*u+this.aY}return i.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class ry extends Cd{constructor(e,t,i,s,a,r){super(e,t,i,i,s,a,r),this.isArcCurve=!0,this.type="ArcCurve"}}function Rd(){let n=0,e=0,t=0,i=0;function s(a,r,o,l){n=a,e=o,t=-3*a+3*r-2*o-l,i=2*a-2*r+o+l}return{initCatmullRom:function(a,r,o,l,c){s(r,o,c*(o-a),c*(l-r))},initNonuniformCatmullRom:function(a,r,o,l,c,u,d){let h=(r-a)/c-(o-a)/(c+u)+(o-r)/u,p=(o-r)/u-(l-r)/(u+d)+(l-o)/d;h*=u,p*=u,s(r,o,h,p)},calc:function(a){const r=a*a,o=r*a;return n+e*a+t*r+i*o}}}const Zr=new L,Ql=new Rd,ec=new Rd,tc=new Rd;class oy extends Qn{constructor(e=[],t=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=s}getPoint(e,t=new L){const i=t,s=this.points,a=s.length,r=(a-(this.closed?0:1))*e;let o=Math.floor(r),l=r-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/a)+1)*a:l===0&&o===a-1&&(o=a-2,l=1);let c,u;this.closed||o>0?c=s[(o-1)%a]:(Zr.subVectors(s[0],s[1]).add(s[0]),c=Zr);const d=s[o%a],h=s[(o+1)%a];if(this.closed||o+2<a?u=s[(o+2)%a]:(Zr.subVectors(s[a-1],s[a-2]).add(s[a-1]),u=Zr),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(d),p),_=Math.pow(d.distanceToSquared(h),p),m=Math.pow(h.distanceToSquared(u),p);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),Ql.initNonuniformCatmullRom(c.x,d.x,h.x,u.x,g,_,m),ec.initNonuniformCatmullRom(c.y,d.y,h.y,u.y,g,_,m),tc.initNonuniformCatmullRom(c.z,d.z,h.z,u.z,g,_,m)}else this.curveType==="catmullrom"&&(Ql.initCatmullRom(c.x,d.x,h.x,u.x,this.tension),ec.initCatmullRom(c.y,d.y,h.y,u.y,this.tension),tc.initCatmullRom(c.z,d.z,h.z,u.z,this.tension));return i.set(Ql.calc(l),ec.calc(l),tc.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(new L().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Uh(n,e,t,i,s){const a=(i-e)*.5,r=(s-t)*.5,o=n*n,l=n*o;return(2*t-2*i+a+r)*l+(-3*t+3*i-2*a-r)*o+a*n+t}function ly(n,e){const t=1-n;return t*t*e}function cy(n,e){return 2*(1-n)*n*e}function uy(n,e){return n*n*e}function Va(n,e,t,i){return ly(n,e)+cy(n,t)+uy(n,i)}function dy(n,e){const t=1-n;return t*t*t*e}function hy(n,e){const t=1-n;return 3*t*t*n*e}function fy(n,e){return 3*(1-n)*n*n*e}function py(n,e){return n*n*n*e}function Ga(n,e,t,i,s){return dy(n,e)+hy(n,t)+fy(n,i)+py(n,s)}class Pm extends Qn{constructor(e=new ue,t=new ue,i=new ue,s=new ue){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=s}getPoint(e,t=new ue){const i=t,s=this.v0,a=this.v1,r=this.v2,o=this.v3;return i.set(Ga(e,s.x,a.x,r.x,o.x),Ga(e,s.y,a.y,r.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class my extends Qn{constructor(e=new L,t=new L,i=new L,s=new L){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=s}getPoint(e,t=new L){const i=t,s=this.v0,a=this.v1,r=this.v2,o=this.v3;return i.set(Ga(e,s.x,a.x,r.x,o.x),Ga(e,s.y,a.y,r.y,o.y),Ga(e,s.z,a.z,r.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Lm extends Qn{constructor(e=new ue,t=new ue){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ue){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ue){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class gy extends Qn{constructor(e=new L,t=new L){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new L){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new L){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Im extends Qn{constructor(e=new ue,t=new ue,i=new ue){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new ue){const i=t,s=this.v0,a=this.v1,r=this.v2;return i.set(Va(e,s.x,a.x,r.x),Va(e,s.y,a.y,r.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class _y extends Qn{constructor(e=new L,t=new L,i=new L){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new L){const i=t,s=this.v0,a=this.v1,r=this.v2;return i.set(Va(e,s.x,a.x,r.x),Va(e,s.y,a.y,r.y),Va(e,s.z,a.z,r.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Nm extends Qn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ue){const i=t,s=this.points,a=(s.length-1)*e,r=Math.floor(a),o=a-r,l=s[r===0?r:r-1],c=s[r],u=s[r>s.length-2?s.length-1:r+1],d=s[r>s.length-3?s.length-1:r+2];return i.set(Uh(o,l.x,c.x,u.x,d.x),Uh(o,l.y,c.y,u.y,d.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(new ue().fromArray(s))}return this}}var Fh=Object.freeze({__proto__:null,ArcCurve:ry,CatmullRomCurve3:oy,CubicBezierCurve:Pm,CubicBezierCurve3:my,EllipseCurve:Cd,LineCurve:Lm,LineCurve3:gy,QuadraticBezierCurve:Im,QuadraticBezierCurve3:_y,SplineCurve:Nm});class vy extends Qn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Fh[i](t,e))}return this}getPoint(e,t){const i=e*this.getLength(),s=this.getCurveLengths();let a=0;for(;a<s.length;){if(s[a]>=i){const r=s[a]-i,o=this.curves[a],l=o.getLength(),c=l===0?0:1-r/l;return o.getPointAt(c,t)}a++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let i=0,s=this.curves.length;i<s;i++)t+=this.curves[i].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let i;for(let s=0,a=this.curves;s<a.length;s++){const r=a[s],o=r.isEllipseCurve?e*2:r.isLineCurve||r.isLineCurve3?1:r.isSplineCurve?e*r.points.length:e,l=r.getPoints(o);for(let c=0;c<l.length;c++){const u=l[c];i&&i.equals(u)||(t.push(u),i=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,i=this.curves.length;t<i;t++){const s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const s=e.curves[t];this.curves.push(new Fh[s.type]().fromJSON(s))}return this}}class Oh extends vy{constructor(e){super(),this.type="Path",this.currentPoint=new ue,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,i=e.length;t<i;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const i=new Lm(this.currentPoint.clone(),new ue(e,t));return this.curves.push(i),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,i,s){const a=new Im(this.currentPoint.clone(),new ue(e,t),new ue(i,s));return this.curves.push(a),this.currentPoint.set(i,s),this}bezierCurveTo(e,t,i,s,a,r){const o=new Pm(this.currentPoint.clone(),new ue(e,t),new ue(i,s),new ue(a,r));return this.curves.push(o),this.currentPoint.set(a,r),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),i=new Nm(t);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,i,s,a,r){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,i,s,a,r),this}absarc(e,t,i,s,a,r){return this.absellipse(e,t,i,i,s,a,r),this}ellipse(e,t,i,s,a,r,o,l){const c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+c,t+u,i,s,a,r,o,l),this}absellipse(e,t,i,s,a,r,o,l){const c=new Cd(e,t,i,s,a,r,o,l);if(this.curves.length>0){const d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);const u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Pd extends Oh{constructor(e){super(e),this.uuid=Yn(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let i=0,s=this.holes.length;i<s;i++)t[i]=this.holes[i].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){const s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,i=this.holes.length;t<i;t++){const s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){const s=e.holes[t];this.holes.push(new Oh().fromJSON(s))}return this}}function yy(n,e,t=2){const i=e&&e.length,s=i?e[0]*t:n.length;let a=Dm(n,0,s,t,!0);const r=[];if(!a||a.next===a.prev)return r;let o,l,c;if(i&&(a=Ey(n,e,a,t)),n.length>80*t){o=1/0,l=1/0;let u=-1/0,d=-1/0;for(let h=t;h<s;h+=t){const p=n[h],g=n[h+1];p<o&&(o=p),g<l&&(l=g),p>u&&(u=p),g>d&&(d=g)}c=Math.max(u-o,d-l),c=c!==0?32767/c:0}return or(a,r,t,o,l,c,0),r}function Dm(n,e,t,i,s){let a;if(s===Uy(n,e,t,i)>0)for(let r=e;r<t;r+=i)a=kh(r/i|0,n[r],n[r+1],a);else for(let r=t-i;r>=e;r-=i)a=kh(r/i|0,n[r],n[r+1],a);return a&&la(a,a.next)&&(cr(a),a=a.next),a}function ps(n,e){if(!n)return n;e||(e=n);let t=n,i;do if(i=!1,!t.steiner&&(la(t,t.next)||wt(t.prev,t,t.next)===0)){if(cr(t),t=e=t.prev,t===t.next)break;i=!0}else t=t.next;while(i||t!==e);return e}function or(n,e,t,i,s,a,r){if(!n)return;!r&&a&&Ry(n,i,s,a);let o=n;for(;n.prev!==n.next;){const l=n.prev,c=n.next;if(a?xy(n,i,s,a):by(n)){e.push(l.i,n.i,c.i),cr(n),n=c.next,o=c.next;continue}if(n=c,n===o){r?r===1?(n=Sy(ps(n),e),or(n,e,t,i,s,a,2)):r===2&&wy(n,e,t,i,s,a):or(ps(n),e,t,i,s,a,1);break}}}function by(n){const e=n.prev,t=n,i=n.next;if(wt(e,t,i)>=0)return!1;const s=e.x,a=t.x,r=i.x,o=e.y,l=t.y,c=i.y,u=Math.min(s,a,r),d=Math.min(o,l,c),h=Math.max(s,a,r),p=Math.max(o,l,c);let g=i.next;for(;g!==e;){if(g.x>=u&&g.x<=h&&g.y>=d&&g.y<=p&&Ia(s,o,a,l,r,c,g.x,g.y)&&wt(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function xy(n,e,t,i){const s=n.prev,a=n,r=n.next;if(wt(s,a,r)>=0)return!1;const o=s.x,l=a.x,c=r.x,u=s.y,d=a.y,h=r.y,p=Math.min(o,l,c),g=Math.min(u,d,h),_=Math.max(o,l,c),m=Math.max(u,d,h),f=Mu(p,g,e,t,i),w=Mu(_,m,e,t,i);let x=n.prevZ,y=n.nextZ;for(;x&&x.z>=f&&y&&y.z<=w;){if(x.x>=p&&x.x<=_&&x.y>=g&&x.y<=m&&x!==s&&x!==r&&Ia(o,u,l,d,c,h,x.x,x.y)&&wt(x.prev,x,x.next)>=0||(x=x.prevZ,y.x>=p&&y.x<=_&&y.y>=g&&y.y<=m&&y!==s&&y!==r&&Ia(o,u,l,d,c,h,y.x,y.y)&&wt(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;x&&x.z>=f;){if(x.x>=p&&x.x<=_&&x.y>=g&&x.y<=m&&x!==s&&x!==r&&Ia(o,u,l,d,c,h,x.x,x.y)&&wt(x.prev,x,x.next)>=0)return!1;x=x.prevZ}for(;y&&y.z<=w;){if(y.x>=p&&y.x<=_&&y.y>=g&&y.y<=m&&y!==s&&y!==r&&Ia(o,u,l,d,c,h,y.x,y.y)&&wt(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function Sy(n,e){let t=n;do{const i=t.prev,s=t.next.next;!la(i,s)&&Fm(i,t,t.next,s)&&lr(i,s)&&lr(s,i)&&(e.push(i.i,t.i,s.i),cr(t),cr(t.next),t=n=s),t=t.next}while(t!==n);return ps(t)}function wy(n,e,t,i,s,a){let r=n;do{let o=r.next.next;for(;o!==r.prev;){if(r.i!==o.i&&Iy(r,o)){let l=Om(r,o);r=ps(r,r.next),l=ps(l,l.next),or(r,e,t,i,s,a,0),or(l,e,t,i,s,a,0);return}o=o.next}r=r.next}while(r!==n)}function Ey(n,e,t,i){const s=[];for(let a=0,r=e.length;a<r;a++){const o=e[a]*i,l=a<r-1?e[a+1]*i:n.length,c=Dm(n,o,l,i,!1);c===c.next&&(c.steiner=!0),s.push(Ly(c))}s.sort(My);for(let a=0;a<s.length;a++)t=Ty(s[a],t);return t}function My(n,e){let t=n.x-e.x;if(t===0&&(t=n.y-e.y,t===0)){const i=(n.next.y-n.y)/(n.next.x-n.x),s=(e.next.y-e.y)/(e.next.x-e.x);t=i-s}return t}function Ty(n,e){const t=Ay(n,e);if(!t)return e;const i=Om(t,n);return ps(i,i.next),ps(t,t.next)}function Ay(n,e){let t=e;const i=n.x,s=n.y;let a=-1/0,r;if(la(n,t))return t;do{if(la(n,t.next))return t.next;if(s<=t.y&&s>=t.next.y&&t.next.y!==t.y){const d=t.x+(s-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(d<=i&&d>a&&(a=d,r=t.x<t.next.x?t:t.next,d===i))return r}t=t.next}while(t!==e);if(!r)return null;const o=r,l=r.x,c=r.y;let u=1/0;t=r;do{if(i>=t.x&&t.x>=l&&i!==t.x&&Um(s<c?i:a,s,l,c,s<c?a:i,s,t.x,t.y)){const d=Math.abs(s-t.y)/(i-t.x);lr(t,n)&&(d<u||d===u&&(t.x>r.x||t.x===r.x&&Cy(r,t)))&&(r=t,u=d)}t=t.next}while(t!==o);return r}function Cy(n,e){return wt(n.prev,n,e.prev)<0&&wt(e.next,n,n.next)<0}function Ry(n,e,t,i){let s=n;do s.z===0&&(s.z=Mu(s.x,s.y,e,t,i)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==n);s.prevZ.nextZ=null,s.prevZ=null,Py(s)}function Py(n){let e,t=1;do{let i=n,s;n=null;let a=null;for(e=0;i;){e++;let r=i,o=0;for(let c=0;c<t&&(o++,r=r.nextZ,!!r);c++);let l=t;for(;o>0||l>0&&r;)o!==0&&(l===0||!r||i.z<=r.z)?(s=i,i=i.nextZ,o--):(s=r,r=r.nextZ,l--),a?a.nextZ=s:n=s,s.prevZ=a,a=s;i=r}a.nextZ=null,t*=2}while(e>1);return n}function Mu(n,e,t,i,s){return n=(n-t)*s|0,e=(e-i)*s|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,n|e<<1}function Ly(n){let e=n,t=n;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==n);return t}function Um(n,e,t,i,s,a,r,o){return(s-r)*(e-o)>=(n-r)*(a-o)&&(n-r)*(i-o)>=(t-r)*(e-o)&&(t-r)*(a-o)>=(s-r)*(i-o)}function Ia(n,e,t,i,s,a,r,o){return!(n===r&&e===o)&&Um(n,e,t,i,s,a,r,o)}function Iy(n,e){return n.next.i!==e.i&&n.prev.i!==e.i&&!Ny(n,e)&&(lr(n,e)&&lr(e,n)&&Dy(n,e)&&(wt(n.prev,n,e.prev)||wt(n,e.prev,e))||la(n,e)&&wt(n.prev,n,n.next)>0&&wt(e.prev,e,e.next)>0)}function wt(n,e,t){return(e.y-n.y)*(t.x-e.x)-(e.x-n.x)*(t.y-e.y)}function la(n,e){return n.x===e.x&&n.y===e.y}function Fm(n,e,t,i){const s=jr(wt(n,e,t)),a=jr(wt(n,e,i)),r=jr(wt(t,i,n)),o=jr(wt(t,i,e));return!!(s!==a&&r!==o||s===0&&Kr(n,t,e)||a===0&&Kr(n,i,e)||r===0&&Kr(t,n,i)||o===0&&Kr(t,e,i))}function Kr(n,e,t){return e.x<=Math.max(n.x,t.x)&&e.x>=Math.min(n.x,t.x)&&e.y<=Math.max(n.y,t.y)&&e.y>=Math.min(n.y,t.y)}function jr(n){return n>0?1:n<0?-1:0}function Ny(n,e){let t=n;do{if(t.i!==n.i&&t.next.i!==n.i&&t.i!==e.i&&t.next.i!==e.i&&Fm(t,t.next,n,e))return!0;t=t.next}while(t!==n);return!1}function lr(n,e){return wt(n.prev,n,n.next)<0?wt(n,e,n.next)>=0&&wt(n,n.prev,e)>=0:wt(n,e,n.prev)<0||wt(n,n.next,e)<0}function Dy(n,e){let t=n,i=!1;const s=(n.x+e.x)/2,a=(n.y+e.y)/2;do t.y>a!=t.next.y>a&&t.next.y!==t.y&&s<(t.next.x-t.x)*(a-t.y)/(t.next.y-t.y)+t.x&&(i=!i),t=t.next;while(t!==n);return i}function Om(n,e){const t=Tu(n.i,n.x,n.y),i=Tu(e.i,e.x,e.y),s=n.next,a=e.prev;return n.next=e,e.prev=n,t.next=s,s.prev=t,i.next=t,t.prev=i,a.next=i,i.prev=a,i}function kh(n,e,t,i){const s=Tu(n,e,t);return i?(s.next=i.next,s.prev=i,i.next.prev=s,i.next=s):(s.prev=s,s.next=s),s}function cr(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function Tu(n,e,t){return{i:n,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Uy(n,e,t,i){let s=0;for(let a=e,r=t-i;a<t;a+=i)s+=(n[r]-n[a])*(n[a+1]+n[r+1]),r=a;return s}class Fy{static triangulate(e,t,i=2){return yy(e,t,i)}}class $a{static area(e){const t=e.length;let i=0;for(let s=t-1,a=0;a<t;s=a++)i+=e[s].x*e[a].y-e[a].x*e[s].y;return i*.5}static isClockWise(e){return $a.area(e)<0}static triangulateShape(e,t){const i=[],s=[],a=[];Bh(e),zh(i,e);let r=e.length;t.forEach(Bh);for(let l=0;l<t.length;l++)s.push(r),r+=t[l].length,zh(i,t[l]);const o=Fy.triangulate(i,s);for(let l=0;l<o.length;l+=3)a.push(o.slice(l,l+3));return a}}function Bh(n){const e=n.length;e>2&&n[e-1].equals(n[0])&&n.pop()}function zh(n,e){for(let t=0;t<e.length;t++)n.push(e[t].x),n.push(e[t].y)}class nn extends Ct{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const a=e/2,r=t/2,o=Math.floor(i),l=Math.floor(s),c=o+1,u=l+1,d=e/o,h=t/l,p=[],g=[],_=[],m=[];for(let f=0;f<u;f++){const w=f*h-r;for(let x=0;x<c;x++){const y=x*d-a;g.push(y,-w,0),_.push(0,0,1),m.push(x/o),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let w=0;w<o;w++){const x=w+c*f,y=w+c*(f+1),C=w+1+c*(f+1),M=w+1+c*f;p.push(x,y,M),p.push(y,C,M)}this.setIndex(p),this.setAttribute("position",new st(g,3)),this.setAttribute("normal",new st(_,3)),this.setAttribute("uv",new st(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new nn(e.width,e.height,e.widthSegments,e.heightSegments)}}class ys extends Ct{constructor(e=.5,t=1,i=32,s=1,a=0,r=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:s,thetaStart:a,thetaLength:r},i=Math.max(3,i),s=Math.max(1,s);const o=[],l=[],c=[],u=[];let d=e;const h=(t-e)/s,p=new L,g=new ue;for(let _=0;_<=s;_++){for(let m=0;m<=i;m++){const f=a+m/i*r;p.x=d*Math.cos(f),p.y=d*Math.sin(f),l.push(p.x,p.y,p.z),c.push(0,0,1),g.x=(p.x/t+1)/2,g.y=(p.y/t+1)/2,u.push(g.x,g.y)}d+=h}for(let _=0;_<s;_++){const m=_*(i+1);for(let f=0;f<i;f++){const w=f+m,x=w,y=w+i+1,C=w+i+2,M=w+1;o.push(x,y,M),o.push(y,C,M)}}this.setIndex(o),this.setAttribute("position",new st(l,3)),this.setAttribute("normal",new st(c,3)),this.setAttribute("uv",new st(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ys(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class fl extends Ct{constructor(e=new Pd([new ue(0,.5),new ue(-.5,-.5),new ue(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};const i=[],s=[],a=[],r=[];let o=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let u=0;u<e.length;u++)c(e[u]),this.addGroup(o,l,u),o+=l,l=0;this.setIndex(i),this.setAttribute("position",new st(s,3)),this.setAttribute("normal",new st(a,3)),this.setAttribute("uv",new st(r,2));function c(u){const d=s.length/3,h=u.extractPoints(t);let p=h.shape;const g=h.holes;$a.isClockWise(p)===!1&&(p=p.reverse());for(let m=0,f=g.length;m<f;m++){const w=g[m];$a.isClockWise(w)===!0&&(g[m]=w.reverse())}const _=$a.triangulateShape(p,g);for(let m=0,f=g.length;m<f;m++){const w=g[m];p=p.concat(w)}for(let m=0,f=p.length;m<f;m++){const w=p[m];s.push(w.x,w.y,0),a.push(0,0,1),r.push(w.x,w.y)}for(let m=0,f=_.length;m<f;m++){const w=_[m],x=w[0]+d,y=w[1]+d,C=w[2]+d;i.push(x,y,C),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes;return Oy(t,e)}static fromJSON(e,t){const i=[];for(let s=0,a=e.shapes.length;s<a;s++){const r=t[e.shapes[s]];i.push(r)}return new fl(i,e.curveSegments)}}function Oy(n,e){if(e.shapes=[],Array.isArray(n))for(let t=0,i=n.length;t<i;t++){const s=n[t];e.shapes.push(s.uuid)}else e.shapes.push(n.uuid);return e}class ca extends Ct{constructor(e=1,t=32,i=16,s=0,a=Math.PI*2,r=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:s,phiLength:a,thetaStart:r,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(r+o,Math.PI);let c=0;const u=[],d=new L,h=new L,p=[],g=[],_=[],m=[];for(let f=0;f<=i;f++){const w=[],x=f/i;let y=0;f===0&&r===0?y=.5/t:f===i&&l===Math.PI&&(y=-.5/t);for(let C=0;C<=t;C++){const M=C/t;d.x=-e*Math.cos(s+M*a)*Math.sin(r+x*o),d.y=e*Math.cos(r+x*o),d.z=e*Math.sin(s+M*a)*Math.sin(r+x*o),g.push(d.x,d.y,d.z),h.copy(d).normalize(),_.push(h.x,h.y,h.z),m.push(M+y,1-x),w.push(c++)}u.push(w)}for(let f=0;f<i;f++)for(let w=0;w<t;w++){const x=u[f][w+1],y=u[f][w],C=u[f+1][w],M=u[f+1][w+1];(f!==0||r>0)&&p.push(x,y,M),(f!==i-1||l<Math.PI)&&p.push(y,C,M)}this.setIndex(p),this.setAttribute("position",new st(g,3)),this.setAttribute("normal",new st(_,3)),this.setAttribute("uv",new st(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ca(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Ld extends Ct{constructor(e=1,t=.4,i=12,s=48,a=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:s,arc:a},i=Math.floor(i),s=Math.floor(s);const r=[],o=[],l=[],c=[],u=new L,d=new L,h=new L;for(let p=0;p<=i;p++)for(let g=0;g<=s;g++){const _=g/s*a,m=p/i*Math.PI*2;d.x=(e+t*Math.cos(m))*Math.cos(_),d.y=(e+t*Math.cos(m))*Math.sin(_),d.z=t*Math.sin(m),o.push(d.x,d.y,d.z),u.x=e*Math.cos(_),u.y=e*Math.sin(_),h.subVectors(d,u).normalize(),l.push(h.x,h.y,h.z),c.push(g/s),c.push(p/i)}for(let p=1;p<=i;p++)for(let g=1;g<=s;g++){const _=(s+1)*p+g-1,m=(s+1)*(p-1)+g-1,f=(s+1)*(p-1)+g,w=(s+1)*p+g;r.push(_,m,w),r.push(m,f,w)}this.setIndex(r),this.setAttribute("position",new st(o,3)),this.setAttribute("normal",new st(l,3)),this.setAttribute("uv",new st(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ld(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Go extends mi{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new Ze(16777215),this.specular=new Ze(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ze(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Sd,this.normalScale=new ue(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new zn,this.combine=ol,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class km extends mi{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Ze(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ze(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Sd,this.normalScale=new ue(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new zn,this.combine=ol,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class ky extends mi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=i0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class By extends mi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Bm extends It{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ze(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}const nc=new vt,Hh=new L,Vh=new L;class zy{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ue(512,512),this.mapType=Jn,this.map=null,this.mapPass=null,this.matrix=new vt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Td,this._frameExtents=new ue(1,1),this._viewportCount=1,this._viewports=[new Tt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;Hh.setFromMatrixPosition(e.matrixWorld),t.position.copy(Hh),Vh.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Vh),t.updateMatrixWorld(),nc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(nc,t.coordinateSystem,t.reversedDepth),t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(nc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class zm extends wm{constructor(e=-1,t=1,i=1,s=-1,a=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=a,this.far=r,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,a,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=a,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let a=i-e,r=i+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=c*this.view.offsetX,r=a+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(a,r,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Hy extends zy{constructor(){super(new zm(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Gh extends Bm{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(It.DEFAULT_UP),this.updateMatrix(),this.target=new It,this.shadow=new Hy}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Vy extends Bm{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class Gy extends wn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class $h{constructor(e=1,t=0,i=0){this.radius=e,this.phi=t,this.theta=i}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=qe(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(qe(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const Wh=new L;let Jr,ic;class $y extends It{constructor(e=new L(0,0,1),t=new L(0,0,0),i=1,s=16776960,a=i*.2,r=a*.2){super(),this.type="ArrowHelper",Jr===void 0&&(Jr=new Ct,Jr.setAttribute("position",new st([0,0,0,0,1,0],3)),ic=new rr(.5,1,5,1),ic.translate(0,-.5,0)),this.position.copy(t),this.line=new Ad(Jr,new ul({color:s,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new ze(ic,new rt({color:s,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(e),this.setLength(i,a,r)}setDirection(e){if(e.y>.99999)this.quaternion.set(0,0,0,1);else if(e.y<-.99999)this.quaternion.set(1,0,0,0);else{Wh.set(e.z,0,-e.x).normalize();const t=Math.acos(e.y);this.quaternion.setFromAxisAngle(Wh,t)}}setLength(e,t=e*.2,i=t*.2){this.line.scale.set(1,Math.max(1e-4,e-t),1),this.line.updateMatrix(),this.cone.scale.set(i,t,i),this.cone.position.y=e,this.cone.updateMatrix()}setColor(e){this.line.material.color.set(e),this.cone.material.color.set(e)}copy(e){return super.copy(e,!1),this.line.copy(e.line),this.cone.copy(e.cone),this}dispose(){this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}}class Wy extends _s{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function Xh(n,e,t,i){const s=Xy(i);switch(t){case dm:return n*e;case fm:return n*e/s.components*s.byteLength;case yd:return n*e/s.components*s.byteLength;case pm:return n*e*2/s.components*s.byteLength;case bd:return n*e*2/s.components*s.byteLength;case hm:return n*e*3/s.components*s.byteLength;case On:return n*e*4/s.components*s.byteLength;case xd:return n*e*4/s.components*s.byteLength;case mo:case go:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case _o:case vo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case jc:case Qc:return Math.max(n,16)*Math.max(e,8)/4;case Kc:case Jc:return Math.max(n,8)*Math.max(e,8)/2;case eu:case tu:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case nu:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case iu:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case su:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case au:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case ru:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case ou:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case lu:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case cu:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case uu:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case du:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case hu:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case fu:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case pu:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case mu:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case gu:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case _u:case vu:case yu:return Math.ceil(n/4)*Math.ceil(e/4)*16;case bu:case xu:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Su:case wu:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Xy(n){switch(n){case Jn:case om:return{byteLength:1,components:1};case er:case lm:case br:return{byteLength:2,components:1};case _d:case vd:return{byteLength:2,components:4};case hs:case gd:case li:return{byteLength:4,components:1};case cm:case um:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");function Hm(){let n=null,e=!1,t=null,i=null;function s(a,r){t(a,r),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(a){t=a},setContext:function(a){n=a}}}function qy(n){const e=new WeakMap;function t(o,l){const c=o.array,u=o.usage,d=c.byteLength,h=n.createBuffer();n.bindBuffer(l,h),n.bufferData(l,c,u),o.onUploadCallback();let p;if(c instanceof Float32Array)p=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=n.SHORT;else if(c instanceof Uint32Array)p=n.UNSIGNED_INT;else if(c instanceof Int32Array)p=n.INT;else if(c instanceof Int8Array)p=n.BYTE;else if(c instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function i(o,l,c){const u=l.array,d=l.updateRanges;if(n.bindBuffer(c,o),d.length===0)n.bufferSubData(c,0,u);else{d.sort((p,g)=>p.start-g.start);let h=0;for(let p=1;p<d.length;p++){const g=d[h],_=d[p];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++h,d[h]=_)}d.length=h+1;for(let p=0,g=d.length;p<g;p++){const _=d[p];n.bufferSubData(c,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function a(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(n.deleteBuffer(l.buffer),e.delete(o))}function r(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:s,remove:a,update:r}}var Yy=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Zy=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Ky=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,jy=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Jy=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Qy=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,eb=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,tb=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,nb=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,ib=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,sb=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ab=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,rb=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,ob=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,lb=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,cb=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,ub=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,db=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,hb=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,fb=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,pb=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,mb=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,gb=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,_b=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,vb=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,yb=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,bb=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,xb=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Sb=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,wb=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Eb="gl_FragColor = linearToOutputTexel( gl_FragColor );",Mb=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Tb=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Ab=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Cb=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Rb=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Pb=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Lb=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Ib=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Nb=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Db=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Ub=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Fb=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Ob=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,kb=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Bb=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,zb=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Hb=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Vb=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Gb=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,$b=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Wb=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Xb=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,qb=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Yb=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Zb=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Kb=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,jb=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Jb=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Qb=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,ex=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,tx=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,nx=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,ix=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,sx=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,ax=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,rx=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,ox=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,lx=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,cx=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,ux=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,dx=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,hx=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,fx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,px=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,mx=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,gx=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,_x=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,vx=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,yx=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,bx=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,xx=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Sx=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,wx=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Ex=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Mx=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Tx=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Ax=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Cx=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Rx=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Px=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Lx=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Ix=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Nx=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Dx=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Ux=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Fx=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Ox=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,kx=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Bx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,zx=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Hx=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Vx=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Gx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,$x=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Wx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Xx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const qx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Yx=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Zx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Kx=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,jx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Jx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Qx=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,eS=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,tS=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,nS=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,iS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,sS=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,aS=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,rS=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,oS=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,lS=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,cS=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,uS=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,dS=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,hS=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,fS=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,pS=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,mS=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,gS=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_S=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,vS=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,yS=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,bS=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,xS=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,SS=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,wS=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ES=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,MS=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,TS=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Xe={alphahash_fragment:Yy,alphahash_pars_fragment:Zy,alphamap_fragment:Ky,alphamap_pars_fragment:jy,alphatest_fragment:Jy,alphatest_pars_fragment:Qy,aomap_fragment:eb,aomap_pars_fragment:tb,batching_pars_vertex:nb,batching_vertex:ib,begin_vertex:sb,beginnormal_vertex:ab,bsdfs:rb,iridescence_fragment:ob,bumpmap_pars_fragment:lb,clipping_planes_fragment:cb,clipping_planes_pars_fragment:ub,clipping_planes_pars_vertex:db,clipping_planes_vertex:hb,color_fragment:fb,color_pars_fragment:pb,color_pars_vertex:mb,color_vertex:gb,common:_b,cube_uv_reflection_fragment:vb,defaultnormal_vertex:yb,displacementmap_pars_vertex:bb,displacementmap_vertex:xb,emissivemap_fragment:Sb,emissivemap_pars_fragment:wb,colorspace_fragment:Eb,colorspace_pars_fragment:Mb,envmap_fragment:Tb,envmap_common_pars_fragment:Ab,envmap_pars_fragment:Cb,envmap_pars_vertex:Rb,envmap_physical_pars_fragment:zb,envmap_vertex:Pb,fog_vertex:Lb,fog_pars_vertex:Ib,fog_fragment:Nb,fog_pars_fragment:Db,gradientmap_pars_fragment:Ub,lightmap_pars_fragment:Fb,lights_lambert_fragment:Ob,lights_lambert_pars_fragment:kb,lights_pars_begin:Bb,lights_toon_fragment:Hb,lights_toon_pars_fragment:Vb,lights_phong_fragment:Gb,lights_phong_pars_fragment:$b,lights_physical_fragment:Wb,lights_physical_pars_fragment:Xb,lights_fragment_begin:qb,lights_fragment_maps:Yb,lights_fragment_end:Zb,logdepthbuf_fragment:Kb,logdepthbuf_pars_fragment:jb,logdepthbuf_pars_vertex:Jb,logdepthbuf_vertex:Qb,map_fragment:ex,map_pars_fragment:tx,map_particle_fragment:nx,map_particle_pars_fragment:ix,metalnessmap_fragment:sx,metalnessmap_pars_fragment:ax,morphinstance_vertex:rx,morphcolor_vertex:ox,morphnormal_vertex:lx,morphtarget_pars_vertex:cx,morphtarget_vertex:ux,normal_fragment_begin:dx,normal_fragment_maps:hx,normal_pars_fragment:fx,normal_pars_vertex:px,normal_vertex:mx,normalmap_pars_fragment:gx,clearcoat_normal_fragment_begin:_x,clearcoat_normal_fragment_maps:vx,clearcoat_pars_fragment:yx,iridescence_pars_fragment:bx,opaque_fragment:xx,packing:Sx,premultiplied_alpha_fragment:wx,project_vertex:Ex,dithering_fragment:Mx,dithering_pars_fragment:Tx,roughnessmap_fragment:Ax,roughnessmap_pars_fragment:Cx,shadowmap_pars_fragment:Rx,shadowmap_pars_vertex:Px,shadowmap_vertex:Lx,shadowmask_pars_fragment:Ix,skinbase_vertex:Nx,skinning_pars_vertex:Dx,skinning_vertex:Ux,skinnormal_vertex:Fx,specularmap_fragment:Ox,specularmap_pars_fragment:kx,tonemapping_fragment:Bx,tonemapping_pars_fragment:zx,transmission_fragment:Hx,transmission_pars_fragment:Vx,uv_pars_fragment:Gx,uv_pars_vertex:$x,uv_vertex:Wx,worldpos_vertex:Xx,background_vert:qx,background_frag:Yx,backgroundCube_vert:Zx,backgroundCube_frag:Kx,cube_vert:jx,cube_frag:Jx,depth_vert:Qx,depth_frag:eS,distanceRGBA_vert:tS,distanceRGBA_frag:nS,equirect_vert:iS,equirect_frag:sS,linedashed_vert:aS,linedashed_frag:rS,meshbasic_vert:oS,meshbasic_frag:lS,meshlambert_vert:cS,meshlambert_frag:uS,meshmatcap_vert:dS,meshmatcap_frag:hS,meshnormal_vert:fS,meshnormal_frag:pS,meshphong_vert:mS,meshphong_frag:gS,meshphysical_vert:_S,meshphysical_frag:vS,meshtoon_vert:yS,meshtoon_frag:bS,points_vert:xS,points_frag:SS,shadow_vert:wS,shadow_frag:ES,sprite_vert:MS,sprite_frag:TS},he={common:{diffuse:{value:new Ze(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new $e},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new $e}},envmap:{envMap:{value:null},envMapRotation:{value:new $e},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new $e}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new $e}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new $e},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new $e},normalScale:{value:new ue(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new $e},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new $e}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new $e}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new $e}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ze(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ze(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0},uvTransform:{value:new $e}},sprite:{diffuse:{value:new Ze(16777215)},opacity:{value:1},center:{value:new ue(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new $e},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0}}},$n={basic:{uniforms:Zt([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.fog]),vertexShader:Xe.meshbasic_vert,fragmentShader:Xe.meshbasic_frag},lambert:{uniforms:Zt([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.fog,he.lights,{emissive:{value:new Ze(0)}}]),vertexShader:Xe.meshlambert_vert,fragmentShader:Xe.meshlambert_frag},phong:{uniforms:Zt([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.fog,he.lights,{emissive:{value:new Ze(0)},specular:{value:new Ze(1118481)},shininess:{value:30}}]),vertexShader:Xe.meshphong_vert,fragmentShader:Xe.meshphong_frag},standard:{uniforms:Zt([he.common,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.roughnessmap,he.metalnessmap,he.fog,he.lights,{emissive:{value:new Ze(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag},toon:{uniforms:Zt([he.common,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.gradientmap,he.fog,he.lights,{emissive:{value:new Ze(0)}}]),vertexShader:Xe.meshtoon_vert,fragmentShader:Xe.meshtoon_frag},matcap:{uniforms:Zt([he.common,he.bumpmap,he.normalmap,he.displacementmap,he.fog,{matcap:{value:null}}]),vertexShader:Xe.meshmatcap_vert,fragmentShader:Xe.meshmatcap_frag},points:{uniforms:Zt([he.points,he.fog]),vertexShader:Xe.points_vert,fragmentShader:Xe.points_frag},dashed:{uniforms:Zt([he.common,he.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Xe.linedashed_vert,fragmentShader:Xe.linedashed_frag},depth:{uniforms:Zt([he.common,he.displacementmap]),vertexShader:Xe.depth_vert,fragmentShader:Xe.depth_frag},normal:{uniforms:Zt([he.common,he.bumpmap,he.normalmap,he.displacementmap,{opacity:{value:1}}]),vertexShader:Xe.meshnormal_vert,fragmentShader:Xe.meshnormal_frag},sprite:{uniforms:Zt([he.sprite,he.fog]),vertexShader:Xe.sprite_vert,fragmentShader:Xe.sprite_frag},background:{uniforms:{uvTransform:{value:new $e},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Xe.background_vert,fragmentShader:Xe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new $e}},vertexShader:Xe.backgroundCube_vert,fragmentShader:Xe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Xe.cube_vert,fragmentShader:Xe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Xe.equirect_vert,fragmentShader:Xe.equirect_frag},distanceRGBA:{uniforms:Zt([he.common,he.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Xe.distanceRGBA_vert,fragmentShader:Xe.distanceRGBA_frag},shadow:{uniforms:Zt([he.lights,he.fog,{color:{value:new Ze(0)},opacity:{value:1}}]),vertexShader:Xe.shadow_vert,fragmentShader:Xe.shadow_frag}};$n.physical={uniforms:Zt([$n.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new $e},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new $e},clearcoatNormalScale:{value:new ue(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new $e},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new $e},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new $e},sheen:{value:0},sheenColor:{value:new Ze(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new $e},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new $e},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new $e},transmissionSamplerSize:{value:new ue},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new $e},attenuationDistance:{value:0},attenuationColor:{value:new Ze(0)},specularColor:{value:new Ze(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new $e},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new $e},anisotropyVector:{value:new ue},anisotropyMap:{value:null},anisotropyMapTransform:{value:new $e}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag};const Qr={r:0,b:0,g:0},Zi=new zn,AS=new vt;function CS(n,e,t,i,s,a,r){const o=new Ze(0);let l=a===!0?0:1,c,u,d=null,h=0,p=null;function g(x){let y=x.isScene===!0?x.background:null;return y&&y.isTexture&&(y=(x.backgroundBlurriness>0?t:e).get(y)),y}function _(x){let y=!1;const C=g(x);C===null?f(o,l):C&&C.isColor&&(f(C,1),y=!0);const M=n.xr.getEnvironmentBlendMode();M==="additive"?i.buffers.color.setClear(0,0,0,1,r):M==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,r),(n.autoClear||y)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(x,y){const C=g(y);C&&(C.isCubeTexture||C.mapping===ll)?(u===void 0&&(u=new ze(new vs(1,1,1),new Oi({name:"BackgroundCubeMaterial",uniforms:oa($n.backgroundCube.uniforms),vertexShader:$n.backgroundCube.vertexShader,fragmentShader:$n.backgroundCube.fragmentShader,side:rn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(M,T,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),Zi.copy(y.backgroundRotation),Zi.x*=-1,Zi.y*=-1,Zi.z*=-1,C.isCubeTexture&&C.isRenderTargetTexture===!1&&(Zi.y*=-1,Zi.z*=-1),u.material.uniforms.envMap.value=C,u.material.uniforms.flipEnvMap.value=C.isCubeTexture&&C.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(AS.makeRotationFromEuler(Zi)),u.material.toneMapped=tt.getTransfer(C.colorSpace)!==ct,(d!==C||h!==C.version||p!==n.toneMapping)&&(u.material.needsUpdate=!0,d=C,h=C.version,p=n.toneMapping),u.layers.enableAll(),x.unshift(u,u.geometry,u.material,0,0,null)):C&&C.isTexture&&(c===void 0&&(c=new ze(new nn(2,2),new Oi({name:"BackgroundMaterial",uniforms:oa($n.background.uniforms),vertexShader:$n.background.vertexShader,fragmentShader:$n.background.fragmentShader,side:Ui,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=C,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.toneMapped=tt.getTransfer(C.colorSpace)!==ct,C.matrixAutoUpdate===!0&&C.updateMatrix(),c.material.uniforms.uvTransform.value.copy(C.matrix),(d!==C||h!==C.version||p!==n.toneMapping)&&(c.material.needsUpdate=!0,d=C,h=C.version,p=n.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null))}function f(x,y){x.getRGB(Qr,Sm(n)),i.buffers.color.setClear(Qr.r,Qr.g,Qr.b,y,r)}function w(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(x,y=1){o.set(x),l=y,f(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(x){l=x,f(o,l)},render:_,addToRenderList:m,dispose:w}}function RS(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=h(null);let a=s,r=!1;function o(b,R,N,k,z){let V=!1;const O=d(k,N,R);a!==O&&(a=O,c(a.object)),V=p(b,k,N,z),V&&g(b,k,N,z),z!==null&&e.update(z,n.ELEMENT_ARRAY_BUFFER),(V||r)&&(r=!1,y(b,R,N,k),z!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(z).buffer))}function l(){return n.createVertexArray()}function c(b){return n.bindVertexArray(b)}function u(b){return n.deleteVertexArray(b)}function d(b,R,N){const k=N.wireframe===!0;let z=i[b.id];z===void 0&&(z={},i[b.id]=z);let V=z[R.id];V===void 0&&(V={},z[R.id]=V);let O=V[k];return O===void 0&&(O=h(l()),V[k]=O),O}function h(b){const R=[],N=[],k=[];for(let z=0;z<t;z++)R[z]=0,N[z]=0,k[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:N,attributeDivisors:k,object:b,attributes:{},index:null}}function p(b,R,N,k){const z=a.attributes,V=R.attributes;let O=0;const q=N.getAttributes();for(const H in q)if(q[H].location>=0){const X=z[H];let Q=V[H];if(Q===void 0&&(H==="instanceMatrix"&&b.instanceMatrix&&(Q=b.instanceMatrix),H==="instanceColor"&&b.instanceColor&&(Q=b.instanceColor)),X===void 0||X.attribute!==Q||Q&&X.data!==Q.data)return!0;O++}return a.attributesNum!==O||a.index!==k}function g(b,R,N,k){const z={},V=R.attributes;let O=0;const q=N.getAttributes();for(const H in q)if(q[H].location>=0){let X=V[H];X===void 0&&(H==="instanceMatrix"&&b.instanceMatrix&&(X=b.instanceMatrix),H==="instanceColor"&&b.instanceColor&&(X=b.instanceColor));const Q={};Q.attribute=X,X&&X.data&&(Q.data=X.data),z[H]=Q,O++}a.attributes=z,a.attributesNum=O,a.index=k}function _(){const b=a.newAttributes;for(let R=0,N=b.length;R<N;R++)b[R]=0}function m(b){f(b,0)}function f(b,R){const N=a.newAttributes,k=a.enabledAttributes,z=a.attributeDivisors;N[b]=1,k[b]===0&&(n.enableVertexAttribArray(b),k[b]=1),z[b]!==R&&(n.vertexAttribDivisor(b,R),z[b]=R)}function w(){const b=a.newAttributes,R=a.enabledAttributes;for(let N=0,k=R.length;N<k;N++)R[N]!==b[N]&&(n.disableVertexAttribArray(N),R[N]=0)}function x(b,R,N,k,z,V,O){O===!0?n.vertexAttribIPointer(b,R,N,z,V):n.vertexAttribPointer(b,R,N,k,z,V)}function y(b,R,N,k){_();const z=k.attributes,V=N.getAttributes(),O=R.defaultAttributeValues;for(const q in V){const H=V[q];if(H.location>=0){let ne=z[q];if(ne===void 0&&(q==="instanceMatrix"&&b.instanceMatrix&&(ne=b.instanceMatrix),q==="instanceColor"&&b.instanceColor&&(ne=b.instanceColor)),ne!==void 0){const X=ne.normalized,Q=ne.itemSize,ge=e.get(ne);if(ge===void 0)continue;const ve=ge.buffer,Re=ge.type,te=ge.bytesPerElement,G=Re===n.INT||Re===n.UNSIGNED_INT||ne.gpuType===gd;if(ne.isInterleavedBufferAttribute){const Y=ne.data,le=Y.stride,Pe=ne.offset;if(Y.isInstancedInterleavedBuffer){for(let ye=0;ye<H.locationSize;ye++)f(H.location+ye,Y.meshPerAttribute);b.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=Y.meshPerAttribute*Y.count)}else for(let ye=0;ye<H.locationSize;ye++)m(H.location+ye);n.bindBuffer(n.ARRAY_BUFFER,ve);for(let ye=0;ye<H.locationSize;ye++)x(H.location+ye,Q/H.locationSize,Re,X,le*te,(Pe+Q/H.locationSize*ye)*te,G)}else{if(ne.isInstancedBufferAttribute){for(let Y=0;Y<H.locationSize;Y++)f(H.location+Y,ne.meshPerAttribute);b.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=ne.meshPerAttribute*ne.count)}else for(let Y=0;Y<H.locationSize;Y++)m(H.location+Y);n.bindBuffer(n.ARRAY_BUFFER,ve);for(let Y=0;Y<H.locationSize;Y++)x(H.location+Y,Q/H.locationSize,Re,X,Q*te,Q/H.locationSize*Y*te,G)}}else if(O!==void 0){const X=O[q];if(X!==void 0)switch(X.length){case 2:n.vertexAttrib2fv(H.location,X);break;case 3:n.vertexAttrib3fv(H.location,X);break;case 4:n.vertexAttrib4fv(H.location,X);break;default:n.vertexAttrib1fv(H.location,X)}}}}w()}function C(){A();for(const b in i){const R=i[b];for(const N in R){const k=R[N];for(const z in k)u(k[z].object),delete k[z];delete R[N]}delete i[b]}}function M(b){if(i[b.id]===void 0)return;const R=i[b.id];for(const N in R){const k=R[N];for(const z in k)u(k[z].object),delete k[z];delete R[N]}delete i[b.id]}function T(b){for(const R in i){const N=i[R];if(N[b.id]===void 0)continue;const k=N[b.id];for(const z in k)u(k[z].object),delete k[z];delete N[b.id]}}function A(){v(),r=!0,a!==s&&(a=s,c(a.object))}function v(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:A,resetDefaultState:v,dispose:C,releaseStatesOfGeometry:M,releaseStatesOfProgram:T,initAttributes:_,enableAttribute:m,disableUnusedAttributes:w}}function PS(n,e,t){let i;function s(c){i=c}function a(c,u){n.drawArrays(i,c,u),t.update(u,i,1)}function r(c,u,d){d!==0&&(n.drawArraysInstanced(i,c,u,d),t.update(u,i,d))}function o(c,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,u,0,d);let p=0;for(let g=0;g<d;g++)p+=u[g];t.update(p,i,1)}function l(c,u,d,h){if(d===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<c.length;g++)r(c[g],u[g],h[g]);else{p.multiDrawArraysInstancedWEBGL(i,c,0,u,0,h,0,d);let g=0;for(let _=0;_<d;_++)g+=u[_]*h[_];t.update(g,i,1)}}this.setMode=s,this.render=a,this.renderInstances=r,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function LS(n,e,t,i){let s;function a(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const T=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function r(T){return!(T!==On&&i.convert(T)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(T){const A=T===br&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(T!==Jn&&i.convert(T)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==li&&!A)}function l(T){if(T==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const d=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),f=n.getParameter(n.MAX_VERTEX_ATTRIBS),w=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),x=n.getParameter(n.MAX_VARYING_VECTORS),y=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),C=g>0,M=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:l,textureFormatReadable:r,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:h,maxTextures:p,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:w,maxVaryings:x,maxFragmentUniforms:y,vertexTextures:C,maxSamples:M}}function IS(n){const e=this;let t=null,i=0,s=!1,a=!1;const r=new Mi,o=new $e,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){const p=d.length!==0||h||i!==0||s;return s=h,i=d.length,p},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(d,h){t=u(d,h,0)},this.setState=function(d,h,p){const g=d.clippingPlanes,_=d.clipIntersection,m=d.clipShadows,f=n.get(d);if(!s||g===null||g.length===0||a&&!m)a?u(null):c();else{const w=a?0:i,x=w*4;let y=f.clippingState||null;l.value=y,y=u(g,h,x,p);for(let C=0;C!==x;++C)y[C]=t[C];f.clippingState=y,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=w}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(d,h,p,g){const _=d!==null?d.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const f=p+_*4,w=h.matrixWorldInverse;o.getNormalMatrix(w),(m===null||m.length<f)&&(m=new Float32Array(f));for(let x=0,y=p;x!==_;++x,y+=4)r.copy(d[x]).applyMatrix4(w,o),r.normal.toArray(m,y),m[y+3]=r.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function NS(n){let e=new WeakMap;function t(r,o){return o===Xc?r.mapping=sa:o===qc&&(r.mapping=aa),r}function i(r){if(r&&r.isTexture){const o=r.mapping;if(o===Xc||o===qc)if(e.has(r)){const l=e.get(r).texture;return t(l,r.mapping)}else{const l=r.image;if(l&&l.height>0){const c=new Q0(l.height);return c.fromEquirectangularTexture(n,r),e.set(r,c),r.addEventListener("dispose",s),t(c.texture,r.mapping)}else return null}}return r}function s(r){const o=r.target;o.removeEventListener("dispose",s);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function a(){e=new WeakMap}return{get:i,dispose:a}}const Xs=4,qh=[.125,.215,.35,.446,.526,.582],ss=20,sc=new zm,Yh=new Ze;let ac=null,rc=0,oc=0,lc=!1;const ts=(1+Math.sqrt(5))/2,Bs=1/ts,Zh=[new L(-ts,Bs,0),new L(ts,Bs,0),new L(-Bs,0,ts),new L(Bs,0,ts),new L(0,ts,-Bs),new L(0,ts,Bs),new L(-1,1,-1),new L(1,1,-1),new L(-1,1,1),new L(1,1,1)],DS=new L;class Kh{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,s=100,a={}){const{size:r=256,position:o=DS}=a;ac=this._renderer.getRenderTarget(),rc=this._renderer.getActiveCubeFace(),oc=this._renderer.getActiveMipmapLevel(),lc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(r);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,s,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Qh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Jh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(ac,rc,oc),this._renderer.xr.enabled=lc,e.scissorTest=!1,eo(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===sa||e.mapping===aa?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ac=this._renderer.getRenderTarget(),rc=this._renderer.getActiveCubeFace(),oc=this._renderer.getActiveMipmapLevel(),lc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Xn,minFilter:Xn,generateMipmaps:!1,type:br,format:On,colorSpace:ra,depthBuffer:!1},s=jh(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=jh(e,t,i);const{_lodMax:a}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=US(a)),this._blurMaterial=FS(a,e,t)}return s}_compileMaterial(e){const t=new ze(this._lodPlanes[0],e);this._renderer.compile(t,sc)}_sceneToCubeUV(e,t,i,s,a){const l=new wn(90,1,t,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,h=d.autoClear,p=d.toneMapping;d.getClearColor(Yh),d.toneMapping=Li,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null));const _=new rt({name:"PMREM.Background",side:rn,depthWrite:!1,depthTest:!1}),m=new ze(new vs,_);let f=!1;const w=e.background;w?w.isColor&&(_.color.copy(w),e.background=null,f=!0):(_.color.copy(Yh),f=!0);for(let x=0;x<6;x++){const y=x%3;y===0?(l.up.set(0,c[x],0),l.position.set(a.x,a.y,a.z),l.lookAt(a.x+u[x],a.y,a.z)):y===1?(l.up.set(0,0,c[x]),l.position.set(a.x,a.y,a.z),l.lookAt(a.x,a.y+u[x],a.z)):(l.up.set(0,c[x],0),l.position.set(a.x,a.y,a.z),l.lookAt(a.x,a.y,a.z+u[x]));const C=this._cubeSize;eo(s,y*C,x>2?C:0,C,C),d.setRenderTarget(s),f&&d.render(m,l),d.render(e,l)}m.geometry.dispose(),m.material.dispose(),d.toneMapping=p,d.autoClear=h,e.background=w}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===sa||e.mapping===aa;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Qh()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Jh());const a=s?this._cubemapMaterial:this._equirectMaterial,r=new ze(this._lodPlanes[0],a),o=a.uniforms;o.envMap.value=e;const l=this._cubeSize;eo(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(r,sc)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let a=1;a<s;a++){const r=Math.sqrt(this._sigmas[a]*this._sigmas[a]-this._sigmas[a-1]*this._sigmas[a-1]),o=Zh[(s-a-1)%Zh.length];this._blur(e,a-1,a,r,o)}t.autoClear=i}_blur(e,t,i,s,a){const r=this._pingPongRenderTarget;this._halfBlur(e,r,t,i,s,"latitudinal",a),this._halfBlur(r,e,i,i,s,"longitudinal",a)}_halfBlur(e,t,i,s,a,r,o){const l=this._renderer,c=this._blurMaterial;r!=="latitudinal"&&r!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,d=new ze(this._lodPlanes[s],c),h=c.uniforms,p=this._sizeLods[i]-1,g=isFinite(a)?Math.PI/(2*p):2*Math.PI/(2*ss-1),_=a/g,m=isFinite(a)?1+Math.floor(u*_):ss;m>ss&&console.warn(`sigmaRadians, ${a}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ss}`);const f=[];let w=0;for(let T=0;T<ss;++T){const A=T/_,v=Math.exp(-A*A/2);f.push(v),T===0?w+=v:T<m&&(w+=2*v)}for(let T=0;T<f.length;T++)f[T]=f[T]/w;h.envMap.value=e.texture,h.samples.value=m,h.weights.value=f,h.latitudinal.value=r==="latitudinal",o&&(h.poleAxis.value=o);const{_lodMax:x}=this;h.dTheta.value=g,h.mipInt.value=x-i;const y=this._sizeLods[s],C=3*y*(s>x-Xs?s-x+Xs:0),M=4*(this._cubeSize-y);eo(t,C,M,3*y,2*y),l.setRenderTarget(t),l.render(d,sc)}}function US(n){const e=[],t=[],i=[];let s=n;const a=n-Xs+1+qh.length;for(let r=0;r<a;r++){const o=Math.pow(2,s);t.push(o);let l=1/o;r>n-Xs?l=qh[r-n+Xs-1]:r===0&&(l=0),i.push(l);const c=1/(o-2),u=-c,d=1+c,h=[u,u,d,u,d,d,u,u,d,d,u,d],p=6,g=6,_=3,m=2,f=1,w=new Float32Array(_*g*p),x=new Float32Array(m*g*p),y=new Float32Array(f*g*p);for(let M=0;M<p;M++){const T=M%3*2/3-1,A=M>2?0:-1,v=[T,A,0,T+2/3,A,0,T+2/3,A+1,0,T,A,0,T+2/3,A+1,0,T,A+1,0];w.set(v,_*g*M),x.set(h,m*g*M);const b=[M,M,M,M,M,M];y.set(b,f*g*M)}const C=new Ct;C.setAttribute("position",new Bn(w,_)),C.setAttribute("uv",new Bn(x,m)),C.setAttribute("faceIndex",new Bn(y,f)),e.push(C),s>Xs&&s--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function jh(n,e,t){const i=new fs(n,e,t);return i.texture.mapping=ll,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function eo(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function FS(n,e,t){const i=new Float32Array(ss),s=new L(0,1,0);return new Oi({name:"SphericalGaussianBlur",defines:{n:ss,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Id(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Ri,depthTest:!1,depthWrite:!1})}function Jh(){return new Oi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Id(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Ri,depthTest:!1,depthWrite:!1})}function Qh(){return new Oi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Id(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ri,depthTest:!1,depthWrite:!1})}function Id(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function OS(n){let e=new WeakMap,t=null;function i(o){if(o&&o.isTexture){const l=o.mapping,c=l===Xc||l===qc,u=l===sa||l===aa;if(c||u){let d=e.get(o);const h=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==h)return t===null&&(t=new Kh(n)),d=c?t.fromEquirectangular(o,d):t.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),d.texture;if(d!==void 0)return d.texture;{const p=o.image;return c&&p&&p.height>0||u&&p&&s(p)?(t===null&&(t=new Kh(n)),d=c?t.fromEquirectangular(o):t.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),o.addEventListener("dispose",a),d.texture):null}}}return o}function s(o){let l=0;const c=6;for(let u=0;u<c;u++)o[u]!==void 0&&l++;return l===c}function a(o){const l=o.target;l.removeEventListener("dispose",a);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function r(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:r}}function kS(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const s=t(i);return s===null&&ar("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function BS(n,e,t,i){const s={},a=new WeakMap;function r(d){const h=d.target;h.index!==null&&e.remove(h.index);for(const g in h.attributes)e.remove(h.attributes[g]);h.removeEventListener("dispose",r),delete s[h.id];const p=a.get(h);p&&(e.remove(p),a.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function o(d,h){return s[h.id]===!0||(h.addEventListener("dispose",r),s[h.id]=!0,t.memory.geometries++),h}function l(d){const h=d.attributes;for(const p in h)e.update(h[p],n.ARRAY_BUFFER)}function c(d){const h=[],p=d.index,g=d.attributes.position;let _=0;if(p!==null){const w=p.array;_=p.version;for(let x=0,y=w.length;x<y;x+=3){const C=w[x+0],M=w[x+1],T=w[x+2];h.push(C,M,M,T,T,C)}}else if(g!==void 0){const w=g.array;_=g.version;for(let x=0,y=w.length/3-1;x<y;x+=3){const C=x+0,M=x+1,T=x+2;h.push(C,M,M,T,T,C)}}else return;const m=new(gm(h)?xm:bm)(h,1);m.version=_;const f=a.get(d);f&&e.remove(f),a.set(d,m)}function u(d){const h=a.get(d);if(h){const p=d.index;p!==null&&h.version<p.version&&c(d)}else c(d);return a.get(d)}return{get:o,update:l,getWireframeAttribute:u}}function zS(n,e,t){let i;function s(h){i=h}let a,r;function o(h){a=h.type,r=h.bytesPerElement}function l(h,p){n.drawElements(i,p,a,h*r),t.update(p,i,1)}function c(h,p,g){g!==0&&(n.drawElementsInstanced(i,p,a,h*r,g),t.update(p,i,g))}function u(h,p,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,a,h,0,g);let m=0;for(let f=0;f<g;f++)m+=p[f];t.update(m,i,1)}function d(h,p,g,_){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<h.length;f++)c(h[f]/r,p[f],_[f]);else{m.multiDrawElementsInstancedWEBGL(i,p,0,a,h,0,_,0,g);let f=0;for(let w=0;w<g;w++)f+=p[w]*_[w];t.update(f,i,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function HS(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(a,r,o){switch(t.calls++,r){case n.TRIANGLES:t.triangles+=o*(a/3);break;case n.LINES:t.lines+=o*(a/2);break;case n.LINE_STRIP:t.lines+=o*(a-1);break;case n.LINE_LOOP:t.lines+=o*a;break;case n.POINTS:t.points+=o*a;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",r);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function VS(n,e,t){const i=new WeakMap,s=new Tt;function a(r,o,l){const c=r.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u!==void 0?u.length:0;let h=i.get(o);if(h===void 0||h.count!==d){let v=function(){T.dispose(),i.delete(o),o.removeEventListener("dispose",v)};h!==void 0&&h.texture.dispose();const p=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],f=o.morphAttributes.normal||[],w=o.morphAttributes.color||[];let x=0;p===!0&&(x=1),g===!0&&(x=2),_===!0&&(x=3);let y=o.attributes.position.count*x,C=1;y>e.maxTextureSize&&(C=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);const M=new Float32Array(y*C*4*d),T=new _m(M,y,C,d);T.type=li,T.needsUpdate=!0;const A=x*4;for(let b=0;b<d;b++){const R=m[b],N=f[b],k=w[b],z=y*C*4*b;for(let V=0;V<R.count;V++){const O=V*A;p===!0&&(s.fromBufferAttribute(R,V),M[z+O+0]=s.x,M[z+O+1]=s.y,M[z+O+2]=s.z,M[z+O+3]=0),g===!0&&(s.fromBufferAttribute(N,V),M[z+O+4]=s.x,M[z+O+5]=s.y,M[z+O+6]=s.z,M[z+O+7]=0),_===!0&&(s.fromBufferAttribute(k,V),M[z+O+8]=s.x,M[z+O+9]=s.y,M[z+O+10]=s.z,M[z+O+11]=k.itemSize===4?s.w:1)}}h={count:d,texture:T,size:new ue(y,C)},i.set(o,h),o.addEventListener("dispose",v)}if(r.isInstancedMesh===!0&&r.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",r.morphTexture,t);else{let p=0;for(let _=0;_<c.length;_++)p+=c[_];const g=o.morphTargetsRelative?1:1-p;l.getUniforms().setValue(n,"morphTargetBaseInfluence",g),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:a}}function GS(n,e,t,i){let s=new WeakMap;function a(l){const c=i.render.frame,u=l.geometry,d=e.get(l,u);if(s.get(d)!==c&&(e.update(d),s.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const h=l.skeleton;s.get(h)!==c&&(h.update(),s.set(h,c))}return d}function r(){s=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:a,dispose:r}}const Vm=new Kt,ef=new Cm(1,1),Gm=new _m,$m=new F0,Wm=new Em,tf=[],nf=[],sf=new Float32Array(16),af=new Float32Array(9),rf=new Float32Array(4);function ma(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let a=tf[s];if(a===void 0&&(a=new Float32Array(s),tf[s]=a),e!==0){i.toArray(a,0);for(let r=1,o=0;r!==e;++r)o+=t,n[r].toArray(a,o)}return a}function Nt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Dt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function pl(n,e){let t=nf[e];t===void 0&&(t=new Int32Array(e),nf[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function $S(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function WS(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nt(t,e))return;n.uniform2fv(this.addr,e),Dt(t,e)}}function XS(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Nt(t,e))return;n.uniform3fv(this.addr,e),Dt(t,e)}}function qS(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nt(t,e))return;n.uniform4fv(this.addr,e),Dt(t,e)}}function YS(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Nt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Dt(t,e)}else{if(Nt(t,i))return;rf.set(i),n.uniformMatrix2fv(this.addr,!1,rf),Dt(t,i)}}function ZS(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Nt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Dt(t,e)}else{if(Nt(t,i))return;af.set(i),n.uniformMatrix3fv(this.addr,!1,af),Dt(t,i)}}function KS(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Nt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Dt(t,e)}else{if(Nt(t,i))return;sf.set(i),n.uniformMatrix4fv(this.addr,!1,sf),Dt(t,i)}}function jS(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function JS(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nt(t,e))return;n.uniform2iv(this.addr,e),Dt(t,e)}}function QS(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Nt(t,e))return;n.uniform3iv(this.addr,e),Dt(t,e)}}function ew(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nt(t,e))return;n.uniform4iv(this.addr,e),Dt(t,e)}}function tw(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function nw(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nt(t,e))return;n.uniform2uiv(this.addr,e),Dt(t,e)}}function iw(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Nt(t,e))return;n.uniform3uiv(this.addr,e),Dt(t,e)}}function sw(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nt(t,e))return;n.uniform4uiv(this.addr,e),Dt(t,e)}}function aw(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let a;this.type===n.SAMPLER_2D_SHADOW?(ef.compareFunction=mm,a=ef):a=Vm,t.setTexture2D(e||a,s)}function rw(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||$m,s)}function ow(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||Wm,s)}function lw(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||Gm,s)}function cw(n){switch(n){case 5126:return $S;case 35664:return WS;case 35665:return XS;case 35666:return qS;case 35674:return YS;case 35675:return ZS;case 35676:return KS;case 5124:case 35670:return jS;case 35667:case 35671:return JS;case 35668:case 35672:return QS;case 35669:case 35673:return ew;case 5125:return tw;case 36294:return nw;case 36295:return iw;case 36296:return sw;case 35678:case 36198:case 36298:case 36306:case 35682:return aw;case 35679:case 36299:case 36307:return rw;case 35680:case 36300:case 36308:case 36293:return ow;case 36289:case 36303:case 36311:case 36292:return lw}}function uw(n,e){n.uniform1fv(this.addr,e)}function dw(n,e){const t=ma(e,this.size,2);n.uniform2fv(this.addr,t)}function hw(n,e){const t=ma(e,this.size,3);n.uniform3fv(this.addr,t)}function fw(n,e){const t=ma(e,this.size,4);n.uniform4fv(this.addr,t)}function pw(n,e){const t=ma(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function mw(n,e){const t=ma(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function gw(n,e){const t=ma(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function _w(n,e){n.uniform1iv(this.addr,e)}function vw(n,e){n.uniform2iv(this.addr,e)}function yw(n,e){n.uniform3iv(this.addr,e)}function bw(n,e){n.uniform4iv(this.addr,e)}function xw(n,e){n.uniform1uiv(this.addr,e)}function Sw(n,e){n.uniform2uiv(this.addr,e)}function ww(n,e){n.uniform3uiv(this.addr,e)}function Ew(n,e){n.uniform4uiv(this.addr,e)}function Mw(n,e,t){const i=this.cache,s=e.length,a=pl(t,s);Nt(i,a)||(n.uniform1iv(this.addr,a),Dt(i,a));for(let r=0;r!==s;++r)t.setTexture2D(e[r]||Vm,a[r])}function Tw(n,e,t){const i=this.cache,s=e.length,a=pl(t,s);Nt(i,a)||(n.uniform1iv(this.addr,a),Dt(i,a));for(let r=0;r!==s;++r)t.setTexture3D(e[r]||$m,a[r])}function Aw(n,e,t){const i=this.cache,s=e.length,a=pl(t,s);Nt(i,a)||(n.uniform1iv(this.addr,a),Dt(i,a));for(let r=0;r!==s;++r)t.setTextureCube(e[r]||Wm,a[r])}function Cw(n,e,t){const i=this.cache,s=e.length,a=pl(t,s);Nt(i,a)||(n.uniform1iv(this.addr,a),Dt(i,a));for(let r=0;r!==s;++r)t.setTexture2DArray(e[r]||Gm,a[r])}function Rw(n){switch(n){case 5126:return uw;case 35664:return dw;case 35665:return hw;case 35666:return fw;case 35674:return pw;case 35675:return mw;case 35676:return gw;case 5124:case 35670:return _w;case 35667:case 35671:return vw;case 35668:case 35672:return yw;case 35669:case 35673:return bw;case 5125:return xw;case 36294:return Sw;case 36295:return ww;case 36296:return Ew;case 35678:case 36198:case 36298:case 36306:case 35682:return Mw;case 35679:case 36299:case 36307:return Tw;case 35680:case 36300:case 36308:case 36293:return Aw;case 36289:case 36303:case 36311:case 36292:return Cw}}class Pw{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=cw(t.type)}}class Lw{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Rw(t.type)}}class Iw{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let a=0,r=s.length;a!==r;++a){const o=s[a];o.setValue(e,t[o.id],i)}}}const cc=/(\w+)(\])?(\[|\.)?/g;function of(n,e){n.seq.push(e),n.map[e.id]=e}function Nw(n,e,t){const i=n.name,s=i.length;for(cc.lastIndex=0;;){const a=cc.exec(i),r=cc.lastIndex;let o=a[1];const l=a[2]==="]",c=a[3];if(l&&(o=o|0),c===void 0||c==="["&&r+2===s){of(t,c===void 0?new Pw(o,n,e):new Lw(o,n,e));break}else{let d=t.map[o];d===void 0&&(d=new Iw(o),of(t,d)),t=d}}}class yo{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const a=e.getActiveUniform(t,s),r=e.getUniformLocation(t,a.name);Nw(a,r,this)}}setValue(e,t,i,s){const a=this.map[t];a!==void 0&&a.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let a=0,r=t.length;a!==r;++a){const o=t[a],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,a=e.length;s!==a;++s){const r=e[s];r.id in t&&i.push(r)}return i}}function lf(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const Dw=37297;let Uw=0;function Fw(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),a=Math.min(e+6,t.length);for(let r=s;r<a;r++){const o=r+1;i.push(`${o===e?">":" "} ${o}: ${t[r]}`)}return i.join(`
`)}const cf=new $e;function Ow(n){tt._getMatrix(cf,tt.workingColorSpace,n);const e=`mat3( ${cf.elements.map(t=>t.toFixed(4))} )`;switch(tt.getTransfer(n)){case Oo:return[e,"LinearTransferOETF"];case ct:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function uf(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),a=(n.getShaderInfoLog(e)||"").trim();if(i&&a==="")return"";const r=/ERROR: 0:(\d+)/.exec(a);if(r){const o=parseInt(r[1]);return t.toUpperCase()+`

`+a+`

`+Fw(n.getShaderSource(e),o)}else return a}function kw(n,e){const t=Ow(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Bw(n,e){let t;switch(e){case Zv:t="Linear";break;case Kv:t="Reinhard";break;case jv:t="Cineon";break;case Jv:t="ACESFilmic";break;case e0:t="AgX";break;case t0:t="Neutral";break;case Qv:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const to=new L;function zw(){tt.getLuminanceCoefficients(to);const n=to.x.toFixed(4),e=to.y.toFixed(4),t=to.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Hw(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Na).join(`
`)}function Vw(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function Gw(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const a=n.getActiveAttrib(e,s),r=a.name;let o=1;a.type===n.FLOAT_MAT2&&(o=2),a.type===n.FLOAT_MAT3&&(o=3),a.type===n.FLOAT_MAT4&&(o=4),t[r]={type:a.type,location:n.getAttribLocation(e,r),locationSize:o}}return t}function Na(n){return n!==""}function df(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function hf(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const $w=/^[ \t]*#include +<([\w\d./]+)>/gm;function Au(n){return n.replace($w,Xw)}const Ww=new Map;function Xw(n,e){let t=Xe[e];if(t===void 0){const i=Ww.get(e);if(i!==void 0)t=Xe[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Au(t)}const qw=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ff(n){return n.replace(qw,Yw)}function Yw(n,e,t,i){let s="";for(let a=parseInt(e);a<parseInt(t);a++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return s}function pf(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Zw(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===am?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===Cv?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===oi&&(e="SHADOWMAP_TYPE_VSM"),e}function Kw(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case sa:case aa:e="ENVMAP_TYPE_CUBE";break;case ll:e="ENVMAP_TYPE_CUBE_UV";break}return e}function jw(n){let e="ENVMAP_MODE_REFLECTION";return n.envMap&&n.envMapMode===aa&&(e="ENVMAP_MODE_REFRACTION"),e}function Jw(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case ol:e="ENVMAP_BLENDING_MULTIPLY";break;case qv:e="ENVMAP_BLENDING_MIX";break;case Yv:e="ENVMAP_BLENDING_ADD";break}return e}function Qw(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function eE(n,e,t,i){const s=n.getContext(),a=t.defines;let r=t.vertexShader,o=t.fragmentShader;const l=Zw(t),c=Kw(t),u=jw(t),d=Jw(t),h=Qw(t),p=Hw(t),g=Vw(a),_=s.createProgram();let m,f,w=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Na).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Na).join(`
`),f.length>0&&(f+=`
`)):(m=[pf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Na).join(`
`),f=[pf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Li?"#define TONE_MAPPING":"",t.toneMapping!==Li?Xe.tonemapping_pars_fragment:"",t.toneMapping!==Li?Bw("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Xe.colorspace_pars_fragment,kw("linearToOutputTexel",t.outputColorSpace),zw(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Na).join(`
`)),r=Au(r),r=df(r,t),r=hf(r,t),o=Au(o),o=df(o,t),o=hf(o,t),r=ff(r),o=ff(o),t.isRawShaderMaterial!==!0&&(w=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",t.glslVersion===hh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===hh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const x=w+m+r,y=w+f+o,C=lf(s,s.VERTEX_SHADER,x),M=lf(s,s.FRAGMENT_SHADER,y);s.attachShader(_,C),s.attachShader(_,M),t.index0AttributeName!==void 0?s.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function T(R){if(n.debug.checkShaderErrors){const N=s.getProgramInfoLog(_)||"",k=s.getShaderInfoLog(C)||"",z=s.getShaderInfoLog(M)||"",V=N.trim(),O=k.trim(),q=z.trim();let H=!0,ne=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(H=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,_,C,M);else{const X=uf(s,C,"vertex"),Q=uf(s,M,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+V+`
`+X+`
`+Q)}else V!==""?console.warn("THREE.WebGLProgram: Program Info Log:",V):(O===""||q==="")&&(ne=!1);ne&&(R.diagnostics={runnable:H,programLog:V,vertexShader:{log:O,prefix:m},fragmentShader:{log:q,prefix:f}})}s.deleteShader(C),s.deleteShader(M),A=new yo(s,_),v=Gw(s,_)}let A;this.getUniforms=function(){return A===void 0&&T(this),A};let v;this.getAttributes=function(){return v===void 0&&T(this),v};let b=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return b===!1&&(b=s.getProgramParameter(_,Dw)),b},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Uw++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=C,this.fragmentShader=M,this}let tE=0;class nE{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,s=this._getShaderStage(t),a=this._getShaderStage(i),r=this._getShaderCacheForMaterial(e);return r.has(s)===!1&&(r.add(s),s.usedTimes++),r.has(a)===!1&&(r.add(a),a.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new iE(e),t.set(e,i)),i}}class iE{constructor(e){this.id=tE++,this.code=e,this.usedTimes=0}}function sE(n,e,t,i,s,a,r){const o=new vm,l=new nE,c=new Set,u=[],d=s.logarithmicDepthBuffer,h=s.vertexTextures;let p=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(v){return c.add(v),v===0?"uv":`uv${v}`}function m(v,b,R,N,k){const z=N.fog,V=k.geometry,O=v.isMeshStandardMaterial?N.environment:null,q=(v.isMeshStandardMaterial?t:e).get(v.envMap||O),H=q&&q.mapping===ll?q.image.height:null,ne=g[v.type];v.precision!==null&&(p=s.getMaxPrecision(v.precision),p!==v.precision&&console.warn("THREE.WebGLProgram.getParameters:",v.precision,"not supported, using",p,"instead."));const X=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,Q=X!==void 0?X.length:0;let ge=0;V.morphAttributes.position!==void 0&&(ge=1),V.morphAttributes.normal!==void 0&&(ge=2),V.morphAttributes.color!==void 0&&(ge=3);let ve,Re,te,G;if(ne){const it=$n[ne];ve=it.vertexShader,Re=it.fragmentShader}else ve=v.vertexShader,Re=v.fragmentShader,l.update(v),te=l.getVertexShaderID(v),G=l.getFragmentShaderID(v);const Y=n.getRenderTarget(),le=n.state.buffers.depth.getReversed(),Pe=k.isInstancedMesh===!0,ye=k.isBatchedMesh===!0,Be=!!v.map,Qe=!!v.matcap,I=!!q,ot=!!v.aoMap,Ve=!!v.lightMap,Fe=!!v.bumpMap,Ee=!!v.normalMap,_t=!!v.displacementMap,Me=!!v.emissiveMap,We=!!v.metalnessMap,Ut=!!v.roughnessMap,At=v.anisotropy>0,P=v.clearcoat>0,S=v.dispersion>0,B=v.iridescence>0,K=v.sheen>0,ee=v.transmission>0,Z=At&&!!v.anisotropyMap,Le=P&&!!v.clearcoatMap,ce=P&&!!v.clearcoatNormalMap,Te=P&&!!v.clearcoatRoughnessMap,Ae=B&&!!v.iridescenceMap,re=B&&!!v.iridescenceThicknessMap,me=K&&!!v.sheenColorMap,Ue=K&&!!v.sheenRoughnessMap,Ce=!!v.specularMap,fe=!!v.specularColorMap,Ge=!!v.specularIntensityMap,D=ee&&!!v.transmissionMap,oe=ee&&!!v.thicknessMap,de=!!v.gradientMap,xe=!!v.alphaMap,se=v.alphaTest>0,j=!!v.alphaHash,we=!!v.extensions;let He=Li;v.toneMapped&&(Y===null||Y.isXRRenderTarget===!0)&&(He=n.toneMapping);const ht={shaderID:ne,shaderType:v.type,shaderName:v.name,vertexShader:ve,fragmentShader:Re,defines:v.defines,customVertexShaderID:te,customFragmentShaderID:G,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:p,batching:ye,batchingColor:ye&&k._colorsTexture!==null,instancing:Pe,instancingColor:Pe&&k.instanceColor!==null,instancingMorph:Pe&&k.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:Y===null?n.outputColorSpace:Y.isXRRenderTarget===!0?Y.texture.colorSpace:ra,alphaToCoverage:!!v.alphaToCoverage,map:Be,matcap:Qe,envMap:I,envMapMode:I&&q.mapping,envMapCubeUVHeight:H,aoMap:ot,lightMap:Ve,bumpMap:Fe,normalMap:Ee,displacementMap:h&&_t,emissiveMap:Me,normalMapObjectSpace:Ee&&v.normalMapType===a0,normalMapTangentSpace:Ee&&v.normalMapType===Sd,metalnessMap:We,roughnessMap:Ut,anisotropy:At,anisotropyMap:Z,clearcoat:P,clearcoatMap:Le,clearcoatNormalMap:ce,clearcoatRoughnessMap:Te,dispersion:S,iridescence:B,iridescenceMap:Ae,iridescenceThicknessMap:re,sheen:K,sheenColorMap:me,sheenRoughnessMap:Ue,specularMap:Ce,specularColorMap:fe,specularIntensityMap:Ge,transmission:ee,transmissionMap:D,thicknessMap:oe,gradientMap:de,opaque:v.transparent===!1&&v.blending===js&&v.alphaToCoverage===!1,alphaMap:xe,alphaTest:se,alphaHash:j,combine:v.combine,mapUv:Be&&_(v.map.channel),aoMapUv:ot&&_(v.aoMap.channel),lightMapUv:Ve&&_(v.lightMap.channel),bumpMapUv:Fe&&_(v.bumpMap.channel),normalMapUv:Ee&&_(v.normalMap.channel),displacementMapUv:_t&&_(v.displacementMap.channel),emissiveMapUv:Me&&_(v.emissiveMap.channel),metalnessMapUv:We&&_(v.metalnessMap.channel),roughnessMapUv:Ut&&_(v.roughnessMap.channel),anisotropyMapUv:Z&&_(v.anisotropyMap.channel),clearcoatMapUv:Le&&_(v.clearcoatMap.channel),clearcoatNormalMapUv:ce&&_(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Te&&_(v.clearcoatRoughnessMap.channel),iridescenceMapUv:Ae&&_(v.iridescenceMap.channel),iridescenceThicknessMapUv:re&&_(v.iridescenceThicknessMap.channel),sheenColorMapUv:me&&_(v.sheenColorMap.channel),sheenRoughnessMapUv:Ue&&_(v.sheenRoughnessMap.channel),specularMapUv:Ce&&_(v.specularMap.channel),specularColorMapUv:fe&&_(v.specularColorMap.channel),specularIntensityMapUv:Ge&&_(v.specularIntensityMap.channel),transmissionMapUv:D&&_(v.transmissionMap.channel),thicknessMapUv:oe&&_(v.thicknessMap.channel),alphaMapUv:xe&&_(v.alphaMap.channel),vertexTangents:!!V.attributes.tangent&&(Ee||At),vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!V.attributes.uv&&(Be||xe),fog:!!z,useFog:v.fog===!0,fogExp2:!!z&&z.isFogExp2,flatShading:v.flatShading===!0&&v.wireframe===!1,sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:le,skinning:k.isSkinnedMesh===!0,morphTargets:V.morphAttributes.position!==void 0,morphNormals:V.morphAttributes.normal!==void 0,morphColors:V.morphAttributes.color!==void 0,morphTargetsCount:Q,morphTextureStride:ge,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:v.dithering,shadowMapEnabled:n.shadowMap.enabled&&R.length>0,shadowMapType:n.shadowMap.type,toneMapping:He,decodeVideoTexture:Be&&v.map.isVideoTexture===!0&&tt.getTransfer(v.map.colorSpace)===ct,decodeVideoTextureEmissive:Me&&v.emissiveMap.isVideoTexture===!0&&tt.getTransfer(v.emissiveMap.colorSpace)===ct,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===Je,flipSided:v.side===rn,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:we&&v.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(we&&v.extensions.multiDraw===!0||ye)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return ht.vertexUv1s=c.has(1),ht.vertexUv2s=c.has(2),ht.vertexUv3s=c.has(3),c.clear(),ht}function f(v){const b=[];if(v.shaderID?b.push(v.shaderID):(b.push(v.customVertexShaderID),b.push(v.customFragmentShaderID)),v.defines!==void 0)for(const R in v.defines)b.push(R),b.push(v.defines[R]);return v.isRawShaderMaterial===!1&&(w(b,v),x(b,v),b.push(n.outputColorSpace)),b.push(v.customProgramCacheKey),b.join()}function w(v,b){v.push(b.precision),v.push(b.outputColorSpace),v.push(b.envMapMode),v.push(b.envMapCubeUVHeight),v.push(b.mapUv),v.push(b.alphaMapUv),v.push(b.lightMapUv),v.push(b.aoMapUv),v.push(b.bumpMapUv),v.push(b.normalMapUv),v.push(b.displacementMapUv),v.push(b.emissiveMapUv),v.push(b.metalnessMapUv),v.push(b.roughnessMapUv),v.push(b.anisotropyMapUv),v.push(b.clearcoatMapUv),v.push(b.clearcoatNormalMapUv),v.push(b.clearcoatRoughnessMapUv),v.push(b.iridescenceMapUv),v.push(b.iridescenceThicknessMapUv),v.push(b.sheenColorMapUv),v.push(b.sheenRoughnessMapUv),v.push(b.specularMapUv),v.push(b.specularColorMapUv),v.push(b.specularIntensityMapUv),v.push(b.transmissionMapUv),v.push(b.thicknessMapUv),v.push(b.combine),v.push(b.fogExp2),v.push(b.sizeAttenuation),v.push(b.morphTargetsCount),v.push(b.morphAttributeCount),v.push(b.numDirLights),v.push(b.numPointLights),v.push(b.numSpotLights),v.push(b.numSpotLightMaps),v.push(b.numHemiLights),v.push(b.numRectAreaLights),v.push(b.numDirLightShadows),v.push(b.numPointLightShadows),v.push(b.numSpotLightShadows),v.push(b.numSpotLightShadowsWithMaps),v.push(b.numLightProbes),v.push(b.shadowMapType),v.push(b.toneMapping),v.push(b.numClippingPlanes),v.push(b.numClipIntersection),v.push(b.depthPacking)}function x(v,b){o.disableAll(),b.supportsVertexTextures&&o.enable(0),b.instancing&&o.enable(1),b.instancingColor&&o.enable(2),b.instancingMorph&&o.enable(3),b.matcap&&o.enable(4),b.envMap&&o.enable(5),b.normalMapObjectSpace&&o.enable(6),b.normalMapTangentSpace&&o.enable(7),b.clearcoat&&o.enable(8),b.iridescence&&o.enable(9),b.alphaTest&&o.enable(10),b.vertexColors&&o.enable(11),b.vertexAlphas&&o.enable(12),b.vertexUv1s&&o.enable(13),b.vertexUv2s&&o.enable(14),b.vertexUv3s&&o.enable(15),b.vertexTangents&&o.enable(16),b.anisotropy&&o.enable(17),b.alphaHash&&o.enable(18),b.batching&&o.enable(19),b.dispersion&&o.enable(20),b.batchingColor&&o.enable(21),b.gradientMap&&o.enable(22),v.push(o.mask),o.disableAll(),b.fog&&o.enable(0),b.useFog&&o.enable(1),b.flatShading&&o.enable(2),b.logarithmicDepthBuffer&&o.enable(3),b.reversedDepthBuffer&&o.enable(4),b.skinning&&o.enable(5),b.morphTargets&&o.enable(6),b.morphNormals&&o.enable(7),b.morphColors&&o.enable(8),b.premultipliedAlpha&&o.enable(9),b.shadowMapEnabled&&o.enable(10),b.doubleSided&&o.enable(11),b.flipSided&&o.enable(12),b.useDepthPacking&&o.enable(13),b.dithering&&o.enable(14),b.transmission&&o.enable(15),b.sheen&&o.enable(16),b.opaque&&o.enable(17),b.pointsUvs&&o.enable(18),b.decodeVideoTexture&&o.enable(19),b.decodeVideoTextureEmissive&&o.enable(20),b.alphaToCoverage&&o.enable(21),v.push(o.mask)}function y(v){const b=g[v.type];let R;if(b){const N=$n[b];R=Z0.clone(N.uniforms)}else R=v.uniforms;return R}function C(v,b){let R;for(let N=0,k=u.length;N<k;N++){const z=u[N];if(z.cacheKey===b){R=z,++R.usedTimes;break}}return R===void 0&&(R=new eE(n,b,v,a),u.push(R)),R}function M(v){if(--v.usedTimes===0){const b=u.indexOf(v);u[b]=u[u.length-1],u.pop(),v.destroy()}}function T(v){l.remove(v)}function A(){l.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:y,acquireProgram:C,releaseProgram:M,releaseShaderCache:T,programs:u,dispose:A}}function aE(){let n=new WeakMap;function e(r){return n.has(r)}function t(r){let o=n.get(r);return o===void 0&&(o={},n.set(r,o)),o}function i(r){n.delete(r)}function s(r,o,l){n.get(r)[o]=l}function a(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:a}}function rE(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function mf(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function gf(){const n=[];let e=0;const t=[],i=[],s=[];function a(){e=0,t.length=0,i.length=0,s.length=0}function r(d,h,p,g,_,m){let f=n[e];return f===void 0?(f={id:d.id,object:d,geometry:h,material:p,groupOrder:g,renderOrder:d.renderOrder,z:_,group:m},n[e]=f):(f.id=d.id,f.object=d,f.geometry=h,f.material=p,f.groupOrder=g,f.renderOrder=d.renderOrder,f.z=_,f.group=m),e++,f}function o(d,h,p,g,_,m){const f=r(d,h,p,g,_,m);p.transmission>0?i.push(f):p.transparent===!0?s.push(f):t.push(f)}function l(d,h,p,g,_,m){const f=r(d,h,p,g,_,m);p.transmission>0?i.unshift(f):p.transparent===!0?s.unshift(f):t.unshift(f)}function c(d,h){t.length>1&&t.sort(d||rE),i.length>1&&i.sort(h||mf),s.length>1&&s.sort(h||mf)}function u(){for(let d=e,h=n.length;d<h;d++){const p=n[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:i,transparent:s,init:a,push:o,unshift:l,finish:u,sort:c}}function oE(){let n=new WeakMap;function e(i,s){const a=n.get(i);let r;return a===void 0?(r=new gf,n.set(i,[r])):s>=a.length?(r=new gf,a.push(r)):r=a[s],r}function t(){n=new WeakMap}return{get:e,dispose:t}}function lE(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new L,color:new Ze};break;case"SpotLight":t={position:new L,direction:new L,color:new Ze,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new L,color:new Ze,distance:0,decay:0};break;case"HemisphereLight":t={direction:new L,skyColor:new Ze,groundColor:new Ze};break;case"RectAreaLight":t={color:new Ze,position:new L,halfWidth:new L,halfHeight:new L};break}return n[e.id]=t,t}}}function cE(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ue};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ue};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ue,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let uE=0;function dE(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function hE(n){const e=new lE,t=cE(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new L);const s=new L,a=new vt,r=new vt;function o(c){let u=0,d=0,h=0;for(let v=0;v<9;v++)i.probe[v].set(0,0,0);let p=0,g=0,_=0,m=0,f=0,w=0,x=0,y=0,C=0,M=0,T=0;c.sort(dE);for(let v=0,b=c.length;v<b;v++){const R=c[v],N=R.color,k=R.intensity,z=R.distance,V=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)u+=N.r*k,d+=N.g*k,h+=N.b*k;else if(R.isLightProbe){for(let O=0;O<9;O++)i.probe[O].addScaledVector(R.sh.coefficients[O],k);T++}else if(R.isDirectionalLight){const O=e.get(R);if(O.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const q=R.shadow,H=t.get(R);H.shadowIntensity=q.intensity,H.shadowBias=q.bias,H.shadowNormalBias=q.normalBias,H.shadowRadius=q.radius,H.shadowMapSize=q.mapSize,i.directionalShadow[p]=H,i.directionalShadowMap[p]=V,i.directionalShadowMatrix[p]=R.shadow.matrix,w++}i.directional[p]=O,p++}else if(R.isSpotLight){const O=e.get(R);O.position.setFromMatrixPosition(R.matrixWorld),O.color.copy(N).multiplyScalar(k),O.distance=z,O.coneCos=Math.cos(R.angle),O.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),O.decay=R.decay,i.spot[_]=O;const q=R.shadow;if(R.map&&(i.spotLightMap[C]=R.map,C++,q.updateMatrices(R),R.castShadow&&M++),i.spotLightMatrix[_]=q.matrix,R.castShadow){const H=t.get(R);H.shadowIntensity=q.intensity,H.shadowBias=q.bias,H.shadowNormalBias=q.normalBias,H.shadowRadius=q.radius,H.shadowMapSize=q.mapSize,i.spotShadow[_]=H,i.spotShadowMap[_]=V,y++}_++}else if(R.isRectAreaLight){const O=e.get(R);O.color.copy(N).multiplyScalar(k),O.halfWidth.set(R.width*.5,0,0),O.halfHeight.set(0,R.height*.5,0),i.rectArea[m]=O,m++}else if(R.isPointLight){const O=e.get(R);if(O.color.copy(R.color).multiplyScalar(R.intensity),O.distance=R.distance,O.decay=R.decay,R.castShadow){const q=R.shadow,H=t.get(R);H.shadowIntensity=q.intensity,H.shadowBias=q.bias,H.shadowNormalBias=q.normalBias,H.shadowRadius=q.radius,H.shadowMapSize=q.mapSize,H.shadowCameraNear=q.camera.near,H.shadowCameraFar=q.camera.far,i.pointShadow[g]=H,i.pointShadowMap[g]=V,i.pointShadowMatrix[g]=R.shadow.matrix,x++}i.point[g]=O,g++}else if(R.isHemisphereLight){const O=e.get(R);O.skyColor.copy(R.color).multiplyScalar(k),O.groundColor.copy(R.groundColor).multiplyScalar(k),i.hemi[f]=O,f++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=he.LTC_FLOAT_1,i.rectAreaLTC2=he.LTC_FLOAT_2):(i.rectAreaLTC1=he.LTC_HALF_1,i.rectAreaLTC2=he.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=d,i.ambient[2]=h;const A=i.hash;(A.directionalLength!==p||A.pointLength!==g||A.spotLength!==_||A.rectAreaLength!==m||A.hemiLength!==f||A.numDirectionalShadows!==w||A.numPointShadows!==x||A.numSpotShadows!==y||A.numSpotMaps!==C||A.numLightProbes!==T)&&(i.directional.length=p,i.spot.length=_,i.rectArea.length=m,i.point.length=g,i.hemi.length=f,i.directionalShadow.length=w,i.directionalShadowMap.length=w,i.pointShadow.length=x,i.pointShadowMap.length=x,i.spotShadow.length=y,i.spotShadowMap.length=y,i.directionalShadowMatrix.length=w,i.pointShadowMatrix.length=x,i.spotLightMatrix.length=y+C-M,i.spotLightMap.length=C,i.numSpotLightShadowsWithMaps=M,i.numLightProbes=T,A.directionalLength=p,A.pointLength=g,A.spotLength=_,A.rectAreaLength=m,A.hemiLength=f,A.numDirectionalShadows=w,A.numPointShadows=x,A.numSpotShadows=y,A.numSpotMaps=C,A.numLightProbes=T,i.version=uE++)}function l(c,u){let d=0,h=0,p=0,g=0,_=0;const m=u.matrixWorldInverse;for(let f=0,w=c.length;f<w;f++){const x=c[f];if(x.isDirectionalLight){const y=i.directional[d];y.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),d++}else if(x.isSpotLight){const y=i.spot[p];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),p++}else if(x.isRectAreaLight){const y=i.rectArea[g];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(m),r.identity(),a.copy(x.matrixWorld),a.premultiply(m),r.extractRotation(a),y.halfWidth.set(x.width*.5,0,0),y.halfHeight.set(0,x.height*.5,0),y.halfWidth.applyMatrix4(r),y.halfHeight.applyMatrix4(r),g++}else if(x.isPointLight){const y=i.point[h];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(m),h++}else if(x.isHemisphereLight){const y=i.hemi[_];y.direction.setFromMatrixPosition(x.matrixWorld),y.direction.transformDirection(m),_++}}}return{setup:o,setupView:l,state:i}}function _f(n){const e=new hE(n),t=[],i=[];function s(u){c.camera=u,t.length=0,i.length=0}function a(u){t.push(u)}function r(u){i.push(u)}function o(){e.setup(t)}function l(u){e.setupView(t,u)}const c={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:a,pushShadow:r}}function fE(n){let e=new WeakMap;function t(s,a=0){const r=e.get(s);let o;return r===void 0?(o=new _f(n),e.set(s,[o])):a>=r.length?(o=new _f(n),r.push(o)):o=r[a],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const pE=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,mE=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function gE(n,e,t){let i=new Td;const s=new ue,a=new ue,r=new Tt,o=new ky({depthPacking:s0}),l=new By,c={},u=t.maxTextureSize,d={[Ui]:rn,[rn]:Ui,[Je]:Je},h=new Oi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ue},radius:{value:4}},vertexShader:pE,fragmentShader:mE}),p=h.clone();p.defines.HORIZONTAL_PASS=1;const g=new Ct;g.setAttribute("position",new Bn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new ze(g,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=am;let f=this.type;this.render=function(M,T,A){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||M.length===0)return;const v=n.getRenderTarget(),b=n.getActiveCubeFace(),R=n.getActiveMipmapLevel(),N=n.state;N.setBlending(Ri),N.buffers.depth.getReversed()===!0?N.buffers.color.setClear(0,0,0,0):N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);const k=f!==oi&&this.type===oi,z=f===oi&&this.type!==oi;for(let V=0,O=M.length;V<O;V++){const q=M[V],H=q.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",q,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;s.copy(H.mapSize);const ne=H.getFrameExtents();if(s.multiply(ne),a.copy(H.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(a.x=Math.floor(u/ne.x),s.x=a.x*ne.x,H.mapSize.x=a.x),s.y>u&&(a.y=Math.floor(u/ne.y),s.y=a.y*ne.y,H.mapSize.y=a.y)),H.map===null||k===!0||z===!0){const Q=this.type!==oi?{minFilter:kn,magFilter:kn}:{};H.map!==null&&H.map.dispose(),H.map=new fs(s.x,s.y,Q),H.map.texture.name=q.name+".shadowMap",H.camera.updateProjectionMatrix()}n.setRenderTarget(H.map),n.clear();const X=H.getViewportCount();for(let Q=0;Q<X;Q++){const ge=H.getViewport(Q);r.set(a.x*ge.x,a.y*ge.y,a.x*ge.z,a.y*ge.w),N.viewport(r),H.updateMatrices(q,Q),i=H.getFrustum(),y(T,A,H.camera,q,this.type)}H.isPointLightShadow!==!0&&this.type===oi&&w(H,A),H.needsUpdate=!1}f=this.type,m.needsUpdate=!1,n.setRenderTarget(v,b,R)};function w(M,T){const A=e.update(_);h.defines.VSM_SAMPLES!==M.blurSamples&&(h.defines.VSM_SAMPLES=M.blurSamples,p.defines.VSM_SAMPLES=M.blurSamples,h.needsUpdate=!0,p.needsUpdate=!0),M.mapPass===null&&(M.mapPass=new fs(s.x,s.y)),h.uniforms.shadow_pass.value=M.map.texture,h.uniforms.resolution.value=M.mapSize,h.uniforms.radius.value=M.radius,n.setRenderTarget(M.mapPass),n.clear(),n.renderBufferDirect(T,null,A,h,_,null),p.uniforms.shadow_pass.value=M.mapPass.texture,p.uniforms.resolution.value=M.mapSize,p.uniforms.radius.value=M.radius,n.setRenderTarget(M.map),n.clear(),n.renderBufferDirect(T,null,A,p,_,null)}function x(M,T,A,v){let b=null;const R=A.isPointLight===!0?M.customDistanceMaterial:M.customDepthMaterial;if(R!==void 0)b=R;else if(b=A.isPointLight===!0?l:o,n.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0||T.alphaToCoverage===!0){const N=b.uuid,k=T.uuid;let z=c[N];z===void 0&&(z={},c[N]=z);let V=z[k];V===void 0&&(V=b.clone(),z[k]=V,T.addEventListener("dispose",C)),b=V}if(b.visible=T.visible,b.wireframe=T.wireframe,v===oi?b.side=T.shadowSide!==null?T.shadowSide:T.side:b.side=T.shadowSide!==null?T.shadowSide:d[T.side],b.alphaMap=T.alphaMap,b.alphaTest=T.alphaToCoverage===!0?.5:T.alphaTest,b.map=T.map,b.clipShadows=T.clipShadows,b.clippingPlanes=T.clippingPlanes,b.clipIntersection=T.clipIntersection,b.displacementMap=T.displacementMap,b.displacementScale=T.displacementScale,b.displacementBias=T.displacementBias,b.wireframeLinewidth=T.wireframeLinewidth,b.linewidth=T.linewidth,A.isPointLight===!0&&b.isMeshDistanceMaterial===!0){const N=n.properties.get(b);N.light=A}return b}function y(M,T,A,v,b){if(M.visible===!1)return;if(M.layers.test(T.layers)&&(M.isMesh||M.isLine||M.isPoints)&&(M.castShadow||M.receiveShadow&&b===oi)&&(!M.frustumCulled||i.intersectsObject(M))){M.modelViewMatrix.multiplyMatrices(A.matrixWorldInverse,M.matrixWorld);const k=e.update(M),z=M.material;if(Array.isArray(z)){const V=k.groups;for(let O=0,q=V.length;O<q;O++){const H=V[O],ne=z[H.materialIndex];if(ne&&ne.visible){const X=x(M,ne,v,b);M.onBeforeShadow(n,M,T,A,k,X,H),n.renderBufferDirect(A,null,k,X,M,H),M.onAfterShadow(n,M,T,A,k,X,H)}}}else if(z.visible){const V=x(M,z,v,b);M.onBeforeShadow(n,M,T,A,k,V,null),n.renderBufferDirect(A,null,k,V,M,null),M.onAfterShadow(n,M,T,A,k,V,null)}}const N=M.children;for(let k=0,z=N.length;k<z;k++)y(N[k],T,A,v,b)}function C(M){M.target.removeEventListener("dispose",C);for(const A in c){const v=c[A],b=M.target.uuid;b in v&&(v[b].dispose(),delete v[b])}}}const _E={[Bc]:zc,[Hc]:$c,[Vc]:Wc,[ia]:Gc,[zc]:Bc,[$c]:Hc,[Wc]:Vc,[Gc]:ia};function vE(n,e){function t(){let D=!1;const oe=new Tt;let de=null;const xe=new Tt(0,0,0,0);return{setMask:function(se){de!==se&&!D&&(n.colorMask(se,se,se,se),de=se)},setLocked:function(se){D=se},setClear:function(se,j,we,He,ht){ht===!0&&(se*=He,j*=He,we*=He),oe.set(se,j,we,He),xe.equals(oe)===!1&&(n.clearColor(se,j,we,He),xe.copy(oe))},reset:function(){D=!1,de=null,xe.set(-1,0,0,0)}}}function i(){let D=!1,oe=!1,de=null,xe=null,se=null;return{setReversed:function(j){if(oe!==j){const we=e.get("EXT_clip_control");j?we.clipControlEXT(we.LOWER_LEFT_EXT,we.ZERO_TO_ONE_EXT):we.clipControlEXT(we.LOWER_LEFT_EXT,we.NEGATIVE_ONE_TO_ONE_EXT),oe=j;const He=se;se=null,this.setClear(He)}},getReversed:function(){return oe},setTest:function(j){j?Y(n.DEPTH_TEST):le(n.DEPTH_TEST)},setMask:function(j){de!==j&&!D&&(n.depthMask(j),de=j)},setFunc:function(j){if(oe&&(j=_E[j]),xe!==j){switch(j){case Bc:n.depthFunc(n.NEVER);break;case zc:n.depthFunc(n.ALWAYS);break;case Hc:n.depthFunc(n.LESS);break;case ia:n.depthFunc(n.LEQUAL);break;case Vc:n.depthFunc(n.EQUAL);break;case Gc:n.depthFunc(n.GEQUAL);break;case $c:n.depthFunc(n.GREATER);break;case Wc:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}xe=j}},setLocked:function(j){D=j},setClear:function(j){se!==j&&(oe&&(j=1-j),n.clearDepth(j),se=j)},reset:function(){D=!1,de=null,xe=null,se=null,oe=!1}}}function s(){let D=!1,oe=null,de=null,xe=null,se=null,j=null,we=null,He=null,ht=null;return{setTest:function(it){D||(it?Y(n.STENCIL_TEST):le(n.STENCIL_TEST))},setMask:function(it){oe!==it&&!D&&(n.stencilMask(it),oe=it)},setFunc:function(it,ei,Vn){(de!==it||xe!==ei||se!==Vn)&&(n.stencilFunc(it,ei,Vn),de=it,xe=ei,se=Vn)},setOp:function(it,ei,Vn){(j!==it||we!==ei||He!==Vn)&&(n.stencilOp(it,ei,Vn),j=it,we=ei,He=Vn)},setLocked:function(it){D=it},setClear:function(it){ht!==it&&(n.clearStencil(it),ht=it)},reset:function(){D=!1,oe=null,de=null,xe=null,se=null,j=null,we=null,He=null,ht=null}}}const a=new t,r=new i,o=new s,l=new WeakMap,c=new WeakMap;let u={},d={},h=new WeakMap,p=[],g=null,_=!1,m=null,f=null,w=null,x=null,y=null,C=null,M=null,T=new Ze(0,0,0),A=0,v=!1,b=null,R=null,N=null,k=null,z=null;const V=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let O=!1,q=0;const H=n.getParameter(n.VERSION);H.indexOf("WebGL")!==-1?(q=parseFloat(/^WebGL (\d)/.exec(H)[1]),O=q>=1):H.indexOf("OpenGL ES")!==-1&&(q=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),O=q>=2);let ne=null,X={};const Q=n.getParameter(n.SCISSOR_BOX),ge=n.getParameter(n.VIEWPORT),ve=new Tt().fromArray(Q),Re=new Tt().fromArray(ge);function te(D,oe,de,xe){const se=new Uint8Array(4),j=n.createTexture();n.bindTexture(D,j),n.texParameteri(D,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(D,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let we=0;we<de;we++)D===n.TEXTURE_3D||D===n.TEXTURE_2D_ARRAY?n.texImage3D(oe,0,n.RGBA,1,1,xe,0,n.RGBA,n.UNSIGNED_BYTE,se):n.texImage2D(oe+we,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,se);return j}const G={};G[n.TEXTURE_2D]=te(n.TEXTURE_2D,n.TEXTURE_2D,1),G[n.TEXTURE_CUBE_MAP]=te(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),G[n.TEXTURE_2D_ARRAY]=te(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),G[n.TEXTURE_3D]=te(n.TEXTURE_3D,n.TEXTURE_3D,1,1),a.setClear(0,0,0,1),r.setClear(1),o.setClear(0),Y(n.DEPTH_TEST),r.setFunc(ia),Fe(!1),Ee(lh),Y(n.CULL_FACE),ot(Ri);function Y(D){u[D]!==!0&&(n.enable(D),u[D]=!0)}function le(D){u[D]!==!1&&(n.disable(D),u[D]=!1)}function Pe(D,oe){return d[D]!==oe?(n.bindFramebuffer(D,oe),d[D]=oe,D===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=oe),D===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=oe),!0):!1}function ye(D,oe){let de=p,xe=!1;if(D){de=h.get(oe),de===void 0&&(de=[],h.set(oe,de));const se=D.textures;if(de.length!==se.length||de[0]!==n.COLOR_ATTACHMENT0){for(let j=0,we=se.length;j<we;j++)de[j]=n.COLOR_ATTACHMENT0+j;de.length=se.length,xe=!0}}else de[0]!==n.BACK&&(de[0]=n.BACK,xe=!0);xe&&n.drawBuffers(de)}function Be(D){return g!==D?(n.useProgram(D),g=D,!0):!1}const Qe={[is]:n.FUNC_ADD,[Pv]:n.FUNC_SUBTRACT,[Lv]:n.FUNC_REVERSE_SUBTRACT};Qe[Iv]=n.MIN,Qe[Nv]=n.MAX;const I={[Dv]:n.ZERO,[Uv]:n.ONE,[Fv]:n.SRC_COLOR,[Oc]:n.SRC_ALPHA,[Vv]:n.SRC_ALPHA_SATURATE,[zv]:n.DST_COLOR,[kv]:n.DST_ALPHA,[Ov]:n.ONE_MINUS_SRC_COLOR,[kc]:n.ONE_MINUS_SRC_ALPHA,[Hv]:n.ONE_MINUS_DST_COLOR,[Bv]:n.ONE_MINUS_DST_ALPHA,[Gv]:n.CONSTANT_COLOR,[$v]:n.ONE_MINUS_CONSTANT_COLOR,[Wv]:n.CONSTANT_ALPHA,[Xv]:n.ONE_MINUS_CONSTANT_ALPHA};function ot(D,oe,de,xe,se,j,we,He,ht,it){if(D===Ri){_===!0&&(le(n.BLEND),_=!1);return}if(_===!1&&(Y(n.BLEND),_=!0),D!==Rv){if(D!==m||it!==v){if((f!==is||y!==is)&&(n.blendEquation(n.FUNC_ADD),f=is,y=is),it)switch(D){case js:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Pi:n.blendFunc(n.ONE,n.ONE);break;case ch:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case uh:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case js:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Pi:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case ch:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case uh:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}w=null,x=null,C=null,M=null,T.set(0,0,0),A=0,m=D,v=it}return}se=se||oe,j=j||de,we=we||xe,(oe!==f||se!==y)&&(n.blendEquationSeparate(Qe[oe],Qe[se]),f=oe,y=se),(de!==w||xe!==x||j!==C||we!==M)&&(n.blendFuncSeparate(I[de],I[xe],I[j],I[we]),w=de,x=xe,C=j,M=we),(He.equals(T)===!1||ht!==A)&&(n.blendColor(He.r,He.g,He.b,ht),T.copy(He),A=ht),m=D,v=!1}function Ve(D,oe){D.side===Je?le(n.CULL_FACE):Y(n.CULL_FACE);let de=D.side===rn;oe&&(de=!de),Fe(de),D.blending===js&&D.transparent===!1?ot(Ri):ot(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),r.setFunc(D.depthFunc),r.setTest(D.depthTest),r.setMask(D.depthWrite),a.setMask(D.colorWrite);const xe=D.stencilWrite;o.setTest(xe),xe&&(o.setMask(D.stencilWriteMask),o.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),o.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),Me(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?Y(n.SAMPLE_ALPHA_TO_COVERAGE):le(n.SAMPLE_ALPHA_TO_COVERAGE)}function Fe(D){b!==D&&(D?n.frontFace(n.CW):n.frontFace(n.CCW),b=D)}function Ee(D){D!==Tv?(Y(n.CULL_FACE),D!==R&&(D===lh?n.cullFace(n.BACK):D===Av?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):le(n.CULL_FACE),R=D}function _t(D){D!==N&&(O&&n.lineWidth(D),N=D)}function Me(D,oe,de){D?(Y(n.POLYGON_OFFSET_FILL),(k!==oe||z!==de)&&(n.polygonOffset(oe,de),k=oe,z=de)):le(n.POLYGON_OFFSET_FILL)}function We(D){D?Y(n.SCISSOR_TEST):le(n.SCISSOR_TEST)}function Ut(D){D===void 0&&(D=n.TEXTURE0+V-1),ne!==D&&(n.activeTexture(D),ne=D)}function At(D,oe,de){de===void 0&&(ne===null?de=n.TEXTURE0+V-1:de=ne);let xe=X[de];xe===void 0&&(xe={type:void 0,texture:void 0},X[de]=xe),(xe.type!==D||xe.texture!==oe)&&(ne!==de&&(n.activeTexture(de),ne=de),n.bindTexture(D,oe||G[D]),xe.type=D,xe.texture=oe)}function P(){const D=X[ne];D!==void 0&&D.type!==void 0&&(n.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function S(){try{n.compressedTexImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function B(){try{n.compressedTexImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function K(){try{n.texSubImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ee(){try{n.texSubImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Z(){try{n.compressedTexSubImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Le(){try{n.compressedTexSubImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ce(){try{n.texStorage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Te(){try{n.texStorage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ae(){try{n.texImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function re(){try{n.texImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function me(D){ve.equals(D)===!1&&(n.scissor(D.x,D.y,D.z,D.w),ve.copy(D))}function Ue(D){Re.equals(D)===!1&&(n.viewport(D.x,D.y,D.z,D.w),Re.copy(D))}function Ce(D,oe){let de=c.get(oe);de===void 0&&(de=new WeakMap,c.set(oe,de));let xe=de.get(D);xe===void 0&&(xe=n.getUniformBlockIndex(oe,D.name),de.set(D,xe))}function fe(D,oe){const xe=c.get(oe).get(D);l.get(oe)!==xe&&(n.uniformBlockBinding(oe,xe,D.__bindingPointIndex),l.set(oe,xe))}function Ge(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),r.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},ne=null,X={},d={},h=new WeakMap,p=[],g=null,_=!1,m=null,f=null,w=null,x=null,y=null,C=null,M=null,T=new Ze(0,0,0),A=0,v=!1,b=null,R=null,N=null,k=null,z=null,ve.set(0,0,n.canvas.width,n.canvas.height),Re.set(0,0,n.canvas.width,n.canvas.height),a.reset(),r.reset(),o.reset()}return{buffers:{color:a,depth:r,stencil:o},enable:Y,disable:le,bindFramebuffer:Pe,drawBuffers:ye,useProgram:Be,setBlending:ot,setMaterial:Ve,setFlipSided:Fe,setCullFace:Ee,setLineWidth:_t,setPolygonOffset:Me,setScissorTest:We,activeTexture:Ut,bindTexture:At,unbindTexture:P,compressedTexImage2D:S,compressedTexImage3D:B,texImage2D:Ae,texImage3D:re,updateUBOMapping:Ce,uniformBlockBinding:fe,texStorage2D:ce,texStorage3D:Te,texSubImage2D:K,texSubImage3D:ee,compressedTexSubImage2D:Z,compressedTexSubImage3D:Le,scissor:me,viewport:Ue,reset:Ge}}function yE(n,e,t,i,s,a,r){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ue,u=new WeakMap;let d;const h=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(P,S){return p?new OffscreenCanvas(P,S):Bo("canvas")}function _(P,S,B){let K=1;const ee=At(P);if((ee.width>B||ee.height>B)&&(K=B/Math.max(ee.width,ee.height)),K<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){const Z=Math.floor(K*ee.width),Le=Math.floor(K*ee.height);d===void 0&&(d=g(Z,Le));const ce=S?g(Z,Le):d;return ce.width=Z,ce.height=Le,ce.getContext("2d").drawImage(P,0,0,Z,Le),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ee.width+"x"+ee.height+") to ("+Z+"x"+Le+")."),ce}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ee.width+"x"+ee.height+")."),P;return P}function m(P){return P.generateMipmaps}function f(P){n.generateMipmap(P)}function w(P){return P.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?n.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function x(P,S,B,K,ee=!1){if(P!==null){if(n[P]!==void 0)return n[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let Z=S;if(S===n.RED&&(B===n.FLOAT&&(Z=n.R32F),B===n.HALF_FLOAT&&(Z=n.R16F),B===n.UNSIGNED_BYTE&&(Z=n.R8)),S===n.RED_INTEGER&&(B===n.UNSIGNED_BYTE&&(Z=n.R8UI),B===n.UNSIGNED_SHORT&&(Z=n.R16UI),B===n.UNSIGNED_INT&&(Z=n.R32UI),B===n.BYTE&&(Z=n.R8I),B===n.SHORT&&(Z=n.R16I),B===n.INT&&(Z=n.R32I)),S===n.RG&&(B===n.FLOAT&&(Z=n.RG32F),B===n.HALF_FLOAT&&(Z=n.RG16F),B===n.UNSIGNED_BYTE&&(Z=n.RG8)),S===n.RG_INTEGER&&(B===n.UNSIGNED_BYTE&&(Z=n.RG8UI),B===n.UNSIGNED_SHORT&&(Z=n.RG16UI),B===n.UNSIGNED_INT&&(Z=n.RG32UI),B===n.BYTE&&(Z=n.RG8I),B===n.SHORT&&(Z=n.RG16I),B===n.INT&&(Z=n.RG32I)),S===n.RGB_INTEGER&&(B===n.UNSIGNED_BYTE&&(Z=n.RGB8UI),B===n.UNSIGNED_SHORT&&(Z=n.RGB16UI),B===n.UNSIGNED_INT&&(Z=n.RGB32UI),B===n.BYTE&&(Z=n.RGB8I),B===n.SHORT&&(Z=n.RGB16I),B===n.INT&&(Z=n.RGB32I)),S===n.RGBA_INTEGER&&(B===n.UNSIGNED_BYTE&&(Z=n.RGBA8UI),B===n.UNSIGNED_SHORT&&(Z=n.RGBA16UI),B===n.UNSIGNED_INT&&(Z=n.RGBA32UI),B===n.BYTE&&(Z=n.RGBA8I),B===n.SHORT&&(Z=n.RGBA16I),B===n.INT&&(Z=n.RGBA32I)),S===n.RGB&&(B===n.UNSIGNED_INT_5_9_9_9_REV&&(Z=n.RGB9_E5),B===n.UNSIGNED_INT_10F_11F_11F_REV&&(Z=n.R11F_G11F_B10F)),S===n.RGBA){const Le=ee?Oo:tt.getTransfer(K);B===n.FLOAT&&(Z=n.RGBA32F),B===n.HALF_FLOAT&&(Z=n.RGBA16F),B===n.UNSIGNED_BYTE&&(Z=Le===ct?n.SRGB8_ALPHA8:n.RGBA8),B===n.UNSIGNED_SHORT_4_4_4_4&&(Z=n.RGBA4),B===n.UNSIGNED_SHORT_5_5_5_1&&(Z=n.RGB5_A1)}return(Z===n.R16F||Z===n.R32F||Z===n.RG16F||Z===n.RG32F||Z===n.RGBA16F||Z===n.RGBA32F)&&e.get("EXT_color_buffer_float"),Z}function y(P,S){let B;return P?S===null||S===hs||S===tr?B=n.DEPTH24_STENCIL8:S===li?B=n.DEPTH32F_STENCIL8:S===er&&(B=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===hs||S===tr?B=n.DEPTH_COMPONENT24:S===li?B=n.DEPTH_COMPONENT32F:S===er&&(B=n.DEPTH_COMPONENT16),B}function C(P,S){return m(P)===!0||P.isFramebufferTexture&&P.minFilter!==kn&&P.minFilter!==Xn?Math.log2(Math.max(S.width,S.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?S.mipmaps.length:1}function M(P){const S=P.target;S.removeEventListener("dispose",M),A(S),S.isVideoTexture&&u.delete(S)}function T(P){const S=P.target;S.removeEventListener("dispose",T),b(S)}function A(P){const S=i.get(P);if(S.__webglInit===void 0)return;const B=P.source,K=h.get(B);if(K){const ee=K[S.__cacheKey];ee.usedTimes--,ee.usedTimes===0&&v(P),Object.keys(K).length===0&&h.delete(B)}i.remove(P)}function v(P){const S=i.get(P);n.deleteTexture(S.__webglTexture);const B=P.source,K=h.get(B);delete K[S.__cacheKey],r.memory.textures--}function b(P){const S=i.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),i.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(S.__webglFramebuffer[K]))for(let ee=0;ee<S.__webglFramebuffer[K].length;ee++)n.deleteFramebuffer(S.__webglFramebuffer[K][ee]);else n.deleteFramebuffer(S.__webglFramebuffer[K]);S.__webglDepthbuffer&&n.deleteRenderbuffer(S.__webglDepthbuffer[K])}else{if(Array.isArray(S.__webglFramebuffer))for(let K=0;K<S.__webglFramebuffer.length;K++)n.deleteFramebuffer(S.__webglFramebuffer[K]);else n.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&n.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&n.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let K=0;K<S.__webglColorRenderbuffer.length;K++)S.__webglColorRenderbuffer[K]&&n.deleteRenderbuffer(S.__webglColorRenderbuffer[K]);S.__webglDepthRenderbuffer&&n.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const B=P.textures;for(let K=0,ee=B.length;K<ee;K++){const Z=i.get(B[K]);Z.__webglTexture&&(n.deleteTexture(Z.__webglTexture),r.memory.textures--),i.remove(B[K])}i.remove(P)}let R=0;function N(){R=0}function k(){const P=R;return P>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+s.maxTextures),R+=1,P}function z(P){const S=[];return S.push(P.wrapS),S.push(P.wrapT),S.push(P.wrapR||0),S.push(P.magFilter),S.push(P.minFilter),S.push(P.anisotropy),S.push(P.internalFormat),S.push(P.format),S.push(P.type),S.push(P.generateMipmaps),S.push(P.premultiplyAlpha),S.push(P.flipY),S.push(P.unpackAlignment),S.push(P.colorSpace),S.join()}function V(P,S){const B=i.get(P);if(P.isVideoTexture&&We(P),P.isRenderTargetTexture===!1&&P.isExternalTexture!==!0&&P.version>0&&B.__version!==P.version){const K=P.image;if(K===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{G(B,P,S);return}}else P.isExternalTexture&&(B.__webglTexture=P.sourceTexture?P.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,B.__webglTexture,n.TEXTURE0+S)}function O(P,S){const B=i.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&B.__version!==P.version){G(B,P,S);return}t.bindTexture(n.TEXTURE_2D_ARRAY,B.__webglTexture,n.TEXTURE0+S)}function q(P,S){const B=i.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&B.__version!==P.version){G(B,P,S);return}t.bindTexture(n.TEXTURE_3D,B.__webglTexture,n.TEXTURE0+S)}function H(P,S){const B=i.get(P);if(P.version>0&&B.__version!==P.version){Y(B,P,S);return}t.bindTexture(n.TEXTURE_CUBE_MAP,B.__webglTexture,n.TEXTURE0+S)}const ne={[Yc]:n.REPEAT,[rs]:n.CLAMP_TO_EDGE,[Zc]:n.MIRRORED_REPEAT},X={[kn]:n.NEAREST,[n0]:n.NEAREST_MIPMAP_NEAREST,[Tr]:n.NEAREST_MIPMAP_LINEAR,[Xn]:n.LINEAR,[Cl]:n.LINEAR_MIPMAP_NEAREST,[os]:n.LINEAR_MIPMAP_LINEAR},Q={[r0]:n.NEVER,[h0]:n.ALWAYS,[o0]:n.LESS,[mm]:n.LEQUAL,[l0]:n.EQUAL,[d0]:n.GEQUAL,[c0]:n.GREATER,[u0]:n.NOTEQUAL};function ge(P,S){if(S.type===li&&e.has("OES_texture_float_linear")===!1&&(S.magFilter===Xn||S.magFilter===Cl||S.magFilter===Tr||S.magFilter===os||S.minFilter===Xn||S.minFilter===Cl||S.minFilter===Tr||S.minFilter===os)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(P,n.TEXTURE_WRAP_S,ne[S.wrapS]),n.texParameteri(P,n.TEXTURE_WRAP_T,ne[S.wrapT]),(P===n.TEXTURE_3D||P===n.TEXTURE_2D_ARRAY)&&n.texParameteri(P,n.TEXTURE_WRAP_R,ne[S.wrapR]),n.texParameteri(P,n.TEXTURE_MAG_FILTER,X[S.magFilter]),n.texParameteri(P,n.TEXTURE_MIN_FILTER,X[S.minFilter]),S.compareFunction&&(n.texParameteri(P,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(P,n.TEXTURE_COMPARE_FUNC,Q[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===kn||S.minFilter!==Tr&&S.minFilter!==os||S.type===li&&e.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||i.get(S).__currentAnisotropy){const B=e.get("EXT_texture_filter_anisotropic");n.texParameterf(P,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,s.getMaxAnisotropy())),i.get(S).__currentAnisotropy=S.anisotropy}}}function ve(P,S){let B=!1;P.__webglInit===void 0&&(P.__webglInit=!0,S.addEventListener("dispose",M));const K=S.source;let ee=h.get(K);ee===void 0&&(ee={},h.set(K,ee));const Z=z(S);if(Z!==P.__cacheKey){ee[Z]===void 0&&(ee[Z]={texture:n.createTexture(),usedTimes:0},r.memory.textures++,B=!0),ee[Z].usedTimes++;const Le=ee[P.__cacheKey];Le!==void 0&&(ee[P.__cacheKey].usedTimes--,Le.usedTimes===0&&v(S)),P.__cacheKey=Z,P.__webglTexture=ee[Z].texture}return B}function Re(P,S,B){return Math.floor(Math.floor(P/B)/S)}function te(P,S,B,K){const Z=P.updateRanges;if(Z.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,S.width,S.height,B,K,S.data);else{Z.sort((re,me)=>re.start-me.start);let Le=0;for(let re=1;re<Z.length;re++){const me=Z[Le],Ue=Z[re],Ce=me.start+me.count,fe=Re(Ue.start,S.width,4),Ge=Re(me.start,S.width,4);Ue.start<=Ce+1&&fe===Ge&&Re(Ue.start+Ue.count-1,S.width,4)===fe?me.count=Math.max(me.count,Ue.start+Ue.count-me.start):(++Le,Z[Le]=Ue)}Z.length=Le+1;const ce=n.getParameter(n.UNPACK_ROW_LENGTH),Te=n.getParameter(n.UNPACK_SKIP_PIXELS),Ae=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,S.width);for(let re=0,me=Z.length;re<me;re++){const Ue=Z[re],Ce=Math.floor(Ue.start/4),fe=Math.ceil(Ue.count/4),Ge=Ce%S.width,D=Math.floor(Ce/S.width),oe=fe,de=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,Ge),n.pixelStorei(n.UNPACK_SKIP_ROWS,D),t.texSubImage2D(n.TEXTURE_2D,0,Ge,D,oe,de,B,K,S.data)}P.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,ce),n.pixelStorei(n.UNPACK_SKIP_PIXELS,Te),n.pixelStorei(n.UNPACK_SKIP_ROWS,Ae)}}function G(P,S,B){let K=n.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(K=n.TEXTURE_2D_ARRAY),S.isData3DTexture&&(K=n.TEXTURE_3D);const ee=ve(P,S),Z=S.source;t.bindTexture(K,P.__webglTexture,n.TEXTURE0+B);const Le=i.get(Z);if(Z.version!==Le.__version||ee===!0){t.activeTexture(n.TEXTURE0+B);const ce=tt.getPrimaries(tt.workingColorSpace),Te=S.colorSpace===Ai?null:tt.getPrimaries(S.colorSpace),Ae=S.colorSpace===Ai||ce===Te?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,S.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,S.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ae);let re=_(S.image,!1,s.maxTextureSize);re=Ut(S,re);const me=a.convert(S.format,S.colorSpace),Ue=a.convert(S.type);let Ce=x(S.internalFormat,me,Ue,S.colorSpace,S.isVideoTexture);ge(K,S);let fe;const Ge=S.mipmaps,D=S.isVideoTexture!==!0,oe=Le.__version===void 0||ee===!0,de=Z.dataReady,xe=C(S,re);if(S.isDepthTexture)Ce=y(S.format===ir,S.type),oe&&(D?t.texStorage2D(n.TEXTURE_2D,1,Ce,re.width,re.height):t.texImage2D(n.TEXTURE_2D,0,Ce,re.width,re.height,0,me,Ue,null));else if(S.isDataTexture)if(Ge.length>0){D&&oe&&t.texStorage2D(n.TEXTURE_2D,xe,Ce,Ge[0].width,Ge[0].height);for(let se=0,j=Ge.length;se<j;se++)fe=Ge[se],D?de&&t.texSubImage2D(n.TEXTURE_2D,se,0,0,fe.width,fe.height,me,Ue,fe.data):t.texImage2D(n.TEXTURE_2D,se,Ce,fe.width,fe.height,0,me,Ue,fe.data);S.generateMipmaps=!1}else D?(oe&&t.texStorage2D(n.TEXTURE_2D,xe,Ce,re.width,re.height),de&&te(S,re,me,Ue)):t.texImage2D(n.TEXTURE_2D,0,Ce,re.width,re.height,0,me,Ue,re.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){D&&oe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,xe,Ce,Ge[0].width,Ge[0].height,re.depth);for(let se=0,j=Ge.length;se<j;se++)if(fe=Ge[se],S.format!==On)if(me!==null)if(D){if(de)if(S.layerUpdates.size>0){const we=Xh(fe.width,fe.height,S.format,S.type);for(const He of S.layerUpdates){const ht=fe.data.subarray(He*we/fe.data.BYTES_PER_ELEMENT,(He+1)*we/fe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,se,0,0,He,fe.width,fe.height,1,me,ht)}S.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,se,0,0,0,fe.width,fe.height,re.depth,me,fe.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,se,Ce,fe.width,fe.height,re.depth,0,fe.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else D?de&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,se,0,0,0,fe.width,fe.height,re.depth,me,Ue,fe.data):t.texImage3D(n.TEXTURE_2D_ARRAY,se,Ce,fe.width,fe.height,re.depth,0,me,Ue,fe.data)}else{D&&oe&&t.texStorage2D(n.TEXTURE_2D,xe,Ce,Ge[0].width,Ge[0].height);for(let se=0,j=Ge.length;se<j;se++)fe=Ge[se],S.format!==On?me!==null?D?de&&t.compressedTexSubImage2D(n.TEXTURE_2D,se,0,0,fe.width,fe.height,me,fe.data):t.compressedTexImage2D(n.TEXTURE_2D,se,Ce,fe.width,fe.height,0,fe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):D?de&&t.texSubImage2D(n.TEXTURE_2D,se,0,0,fe.width,fe.height,me,Ue,fe.data):t.texImage2D(n.TEXTURE_2D,se,Ce,fe.width,fe.height,0,me,Ue,fe.data)}else if(S.isDataArrayTexture)if(D){if(oe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,xe,Ce,re.width,re.height,re.depth),de)if(S.layerUpdates.size>0){const se=Xh(re.width,re.height,S.format,S.type);for(const j of S.layerUpdates){const we=re.data.subarray(j*se/re.data.BYTES_PER_ELEMENT,(j+1)*se/re.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,j,re.width,re.height,1,me,Ue,we)}S.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,re.width,re.height,re.depth,me,Ue,re.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Ce,re.width,re.height,re.depth,0,me,Ue,re.data);else if(S.isData3DTexture)D?(oe&&t.texStorage3D(n.TEXTURE_3D,xe,Ce,re.width,re.height,re.depth),de&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,re.width,re.height,re.depth,me,Ue,re.data)):t.texImage3D(n.TEXTURE_3D,0,Ce,re.width,re.height,re.depth,0,me,Ue,re.data);else if(S.isFramebufferTexture){if(oe)if(D)t.texStorage2D(n.TEXTURE_2D,xe,Ce,re.width,re.height);else{let se=re.width,j=re.height;for(let we=0;we<xe;we++)t.texImage2D(n.TEXTURE_2D,we,Ce,se,j,0,me,Ue,null),se>>=1,j>>=1}}else if(Ge.length>0){if(D&&oe){const se=At(Ge[0]);t.texStorage2D(n.TEXTURE_2D,xe,Ce,se.width,se.height)}for(let se=0,j=Ge.length;se<j;se++)fe=Ge[se],D?de&&t.texSubImage2D(n.TEXTURE_2D,se,0,0,me,Ue,fe):t.texImage2D(n.TEXTURE_2D,se,Ce,me,Ue,fe);S.generateMipmaps=!1}else if(D){if(oe){const se=At(re);t.texStorage2D(n.TEXTURE_2D,xe,Ce,se.width,se.height)}de&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,me,Ue,re)}else t.texImage2D(n.TEXTURE_2D,0,Ce,me,Ue,re);m(S)&&f(K),Le.__version=Z.version,S.onUpdate&&S.onUpdate(S)}P.__version=S.version}function Y(P,S,B){if(S.image.length!==6)return;const K=ve(P,S),ee=S.source;t.bindTexture(n.TEXTURE_CUBE_MAP,P.__webglTexture,n.TEXTURE0+B);const Z=i.get(ee);if(ee.version!==Z.__version||K===!0){t.activeTexture(n.TEXTURE0+B);const Le=tt.getPrimaries(tt.workingColorSpace),ce=S.colorSpace===Ai?null:tt.getPrimaries(S.colorSpace),Te=S.colorSpace===Ai||Le===ce?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,S.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,S.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Te);const Ae=S.isCompressedTexture||S.image[0].isCompressedTexture,re=S.image[0]&&S.image[0].isDataTexture,me=[];for(let j=0;j<6;j++)!Ae&&!re?me[j]=_(S.image[j],!0,s.maxCubemapSize):me[j]=re?S.image[j].image:S.image[j],me[j]=Ut(S,me[j]);const Ue=me[0],Ce=a.convert(S.format,S.colorSpace),fe=a.convert(S.type),Ge=x(S.internalFormat,Ce,fe,S.colorSpace),D=S.isVideoTexture!==!0,oe=Z.__version===void 0||K===!0,de=ee.dataReady;let xe=C(S,Ue);ge(n.TEXTURE_CUBE_MAP,S);let se;if(Ae){D&&oe&&t.texStorage2D(n.TEXTURE_CUBE_MAP,xe,Ge,Ue.width,Ue.height);for(let j=0;j<6;j++){se=me[j].mipmaps;for(let we=0;we<se.length;we++){const He=se[we];S.format!==On?Ce!==null?D?de&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,we,0,0,He.width,He.height,Ce,He.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,we,Ge,He.width,He.height,0,He.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):D?de&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,we,0,0,He.width,He.height,Ce,fe,He.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,we,Ge,He.width,He.height,0,Ce,fe,He.data)}}}else{if(se=S.mipmaps,D&&oe){se.length>0&&xe++;const j=At(me[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,xe,Ge,j.width,j.height)}for(let j=0;j<6;j++)if(re){D?de&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,me[j].width,me[j].height,Ce,fe,me[j].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Ge,me[j].width,me[j].height,0,Ce,fe,me[j].data);for(let we=0;we<se.length;we++){const ht=se[we].image[j].image;D?de&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,we+1,0,0,ht.width,ht.height,Ce,fe,ht.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,we+1,Ge,ht.width,ht.height,0,Ce,fe,ht.data)}}else{D?de&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,Ce,fe,me[j]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Ge,Ce,fe,me[j]);for(let we=0;we<se.length;we++){const He=se[we];D?de&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,we+1,0,0,Ce,fe,He.image[j]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,we+1,Ge,Ce,fe,He.image[j])}}}m(S)&&f(n.TEXTURE_CUBE_MAP),Z.__version=ee.version,S.onUpdate&&S.onUpdate(S)}P.__version=S.version}function le(P,S,B,K,ee,Z){const Le=a.convert(B.format,B.colorSpace),ce=a.convert(B.type),Te=x(B.internalFormat,Le,ce,B.colorSpace),Ae=i.get(S),re=i.get(B);if(re.__renderTarget=S,!Ae.__hasExternalTextures){const me=Math.max(1,S.width>>Z),Ue=Math.max(1,S.height>>Z);ee===n.TEXTURE_3D||ee===n.TEXTURE_2D_ARRAY?t.texImage3D(ee,Z,Te,me,Ue,S.depth,0,Le,ce,null):t.texImage2D(ee,Z,Te,me,Ue,0,Le,ce,null)}t.bindFramebuffer(n.FRAMEBUFFER,P),Me(S)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,K,ee,re.__webglTexture,0,_t(S)):(ee===n.TEXTURE_2D||ee>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ee<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,K,ee,re.__webglTexture,Z),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Pe(P,S,B){if(n.bindRenderbuffer(n.RENDERBUFFER,P),S.depthBuffer){const K=S.depthTexture,ee=K&&K.isDepthTexture?K.type:null,Z=y(S.stencilBuffer,ee),Le=S.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ce=_t(S);Me(S)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ce,Z,S.width,S.height):B?n.renderbufferStorageMultisample(n.RENDERBUFFER,ce,Z,S.width,S.height):n.renderbufferStorage(n.RENDERBUFFER,Z,S.width,S.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Le,n.RENDERBUFFER,P)}else{const K=S.textures;for(let ee=0;ee<K.length;ee++){const Z=K[ee],Le=a.convert(Z.format,Z.colorSpace),ce=a.convert(Z.type),Te=x(Z.internalFormat,Le,ce,Z.colorSpace),Ae=_t(S);B&&Me(S)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Ae,Te,S.width,S.height):Me(S)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Ae,Te,S.width,S.height):n.renderbufferStorage(n.RENDERBUFFER,Te,S.width,S.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function ye(P,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,P),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const K=i.get(S.depthTexture);K.__renderTarget=S,(!K.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),V(S.depthTexture,0);const ee=K.__webglTexture,Z=_t(S);if(S.depthTexture.format===nr)Me(S)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ee,0,Z):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ee,0);else if(S.depthTexture.format===ir)Me(S)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ee,0,Z):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ee,0);else throw new Error("Unknown depthTexture format")}function Be(P){const S=i.get(P),B=P.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==P.depthTexture){const K=P.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),K){const ee=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,K.removeEventListener("dispose",ee)};K.addEventListener("dispose",ee),S.__depthDisposeCallback=ee}S.__boundDepthTexture=K}if(P.depthTexture&&!S.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");const K=P.texture.mipmaps;K&&K.length>0?ye(S.__webglFramebuffer[0],P):ye(S.__webglFramebuffer,P)}else if(B){S.__webglDepthbuffer=[];for(let K=0;K<6;K++)if(t.bindFramebuffer(n.FRAMEBUFFER,S.__webglFramebuffer[K]),S.__webglDepthbuffer[K]===void 0)S.__webglDepthbuffer[K]=n.createRenderbuffer(),Pe(S.__webglDepthbuffer[K],P,!1);else{const ee=P.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Z=S.__webglDepthbuffer[K];n.bindRenderbuffer(n.RENDERBUFFER,Z),n.framebufferRenderbuffer(n.FRAMEBUFFER,ee,n.RENDERBUFFER,Z)}}else{const K=P.texture.mipmaps;if(K&&K.length>0?t.bindFramebuffer(n.FRAMEBUFFER,S.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=n.createRenderbuffer(),Pe(S.__webglDepthbuffer,P,!1);else{const ee=P.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Z=S.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,Z),n.framebufferRenderbuffer(n.FRAMEBUFFER,ee,n.RENDERBUFFER,Z)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Qe(P,S,B){const K=i.get(P);S!==void 0&&le(K.__webglFramebuffer,P,P.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),B!==void 0&&Be(P)}function I(P){const S=P.texture,B=i.get(P),K=i.get(S);P.addEventListener("dispose",T);const ee=P.textures,Z=P.isWebGLCubeRenderTarget===!0,Le=ee.length>1;if(Le||(K.__webglTexture===void 0&&(K.__webglTexture=n.createTexture()),K.__version=S.version,r.memory.textures++),Z){B.__webglFramebuffer=[];for(let ce=0;ce<6;ce++)if(S.mipmaps&&S.mipmaps.length>0){B.__webglFramebuffer[ce]=[];for(let Te=0;Te<S.mipmaps.length;Te++)B.__webglFramebuffer[ce][Te]=n.createFramebuffer()}else B.__webglFramebuffer[ce]=n.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){B.__webglFramebuffer=[];for(let ce=0;ce<S.mipmaps.length;ce++)B.__webglFramebuffer[ce]=n.createFramebuffer()}else B.__webglFramebuffer=n.createFramebuffer();if(Le)for(let ce=0,Te=ee.length;ce<Te;ce++){const Ae=i.get(ee[ce]);Ae.__webglTexture===void 0&&(Ae.__webglTexture=n.createTexture(),r.memory.textures++)}if(P.samples>0&&Me(P)===!1){B.__webglMultisampledFramebuffer=n.createFramebuffer(),B.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let ce=0;ce<ee.length;ce++){const Te=ee[ce];B.__webglColorRenderbuffer[ce]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,B.__webglColorRenderbuffer[ce]);const Ae=a.convert(Te.format,Te.colorSpace),re=a.convert(Te.type),me=x(Te.internalFormat,Ae,re,Te.colorSpace,P.isXRRenderTarget===!0),Ue=_t(P);n.renderbufferStorageMultisample(n.RENDERBUFFER,Ue,me,P.width,P.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ce,n.RENDERBUFFER,B.__webglColorRenderbuffer[ce])}n.bindRenderbuffer(n.RENDERBUFFER,null),P.depthBuffer&&(B.__webglDepthRenderbuffer=n.createRenderbuffer(),Pe(B.__webglDepthRenderbuffer,P,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(Z){t.bindTexture(n.TEXTURE_CUBE_MAP,K.__webglTexture),ge(n.TEXTURE_CUBE_MAP,S);for(let ce=0;ce<6;ce++)if(S.mipmaps&&S.mipmaps.length>0)for(let Te=0;Te<S.mipmaps.length;Te++)le(B.__webglFramebuffer[ce][Te],P,S,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Te);else le(B.__webglFramebuffer[ce],P,S,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0);m(S)&&f(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Le){for(let ce=0,Te=ee.length;ce<Te;ce++){const Ae=ee[ce],re=i.get(Ae);let me=n.TEXTURE_2D;(P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(me=P.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(me,re.__webglTexture),ge(me,Ae),le(B.__webglFramebuffer,P,Ae,n.COLOR_ATTACHMENT0+ce,me,0),m(Ae)&&f(me)}t.unbindTexture()}else{let ce=n.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(ce=P.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ce,K.__webglTexture),ge(ce,S),S.mipmaps&&S.mipmaps.length>0)for(let Te=0;Te<S.mipmaps.length;Te++)le(B.__webglFramebuffer[Te],P,S,n.COLOR_ATTACHMENT0,ce,Te);else le(B.__webglFramebuffer,P,S,n.COLOR_ATTACHMENT0,ce,0);m(S)&&f(ce),t.unbindTexture()}P.depthBuffer&&Be(P)}function ot(P){const S=P.textures;for(let B=0,K=S.length;B<K;B++){const ee=S[B];if(m(ee)){const Z=w(P),Le=i.get(ee).__webglTexture;t.bindTexture(Z,Le),f(Z),t.unbindTexture()}}}const Ve=[],Fe=[];function Ee(P){if(P.samples>0){if(Me(P)===!1){const S=P.textures,B=P.width,K=P.height;let ee=n.COLOR_BUFFER_BIT;const Z=P.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Le=i.get(P),ce=S.length>1;if(ce)for(let Ae=0;Ae<S.length;Ae++)t.bindFramebuffer(n.FRAMEBUFFER,Le.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ae,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,Le.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ae,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,Le.__webglMultisampledFramebuffer);const Te=P.texture.mipmaps;Te&&Te.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Le.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Le.__webglFramebuffer);for(let Ae=0;Ae<S.length;Ae++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(ee|=n.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(ee|=n.STENCIL_BUFFER_BIT)),ce){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Le.__webglColorRenderbuffer[Ae]);const re=i.get(S[Ae]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,re,0)}n.blitFramebuffer(0,0,B,K,0,0,B,K,ee,n.NEAREST),l===!0&&(Ve.length=0,Fe.length=0,Ve.push(n.COLOR_ATTACHMENT0+Ae),P.depthBuffer&&P.resolveDepthBuffer===!1&&(Ve.push(Z),Fe.push(Z),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Fe)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Ve))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ce)for(let Ae=0;Ae<S.length;Ae++){t.bindFramebuffer(n.FRAMEBUFFER,Le.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ae,n.RENDERBUFFER,Le.__webglColorRenderbuffer[Ae]);const re=i.get(S[Ae]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,Le.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ae,n.TEXTURE_2D,re,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Le.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&l){const S=P.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[S])}}}function _t(P){return Math.min(s.maxSamples,P.samples)}function Me(P){const S=i.get(P);return P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function We(P){const S=r.render.frame;u.get(P)!==S&&(u.set(P,S),P.update())}function Ut(P,S){const B=P.colorSpace,K=P.format,ee=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||B!==ra&&B!==Ai&&(tt.getTransfer(B)===ct?(K!==On||ee!==Jn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",B)),S}function At(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(c.width=P.naturalWidth||P.width,c.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(c.width=P.displayWidth,c.height=P.displayHeight):(c.width=P.width,c.height=P.height),c}this.allocateTextureUnit=k,this.resetTextureUnits=N,this.setTexture2D=V,this.setTexture2DArray=O,this.setTexture3D=q,this.setTextureCube=H,this.rebindTextures=Qe,this.setupRenderTarget=I,this.updateRenderTargetMipmap=ot,this.updateMultisampleRenderTarget=Ee,this.setupDepthRenderbuffer=Be,this.setupFrameBufferTexture=le,this.useMultisampledRTT=Me}function bE(n,e){function t(i,s=Ai){let a;const r=tt.getTransfer(s);if(i===Jn)return n.UNSIGNED_BYTE;if(i===_d)return n.UNSIGNED_SHORT_4_4_4_4;if(i===vd)return n.UNSIGNED_SHORT_5_5_5_1;if(i===cm)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===um)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===om)return n.BYTE;if(i===lm)return n.SHORT;if(i===er)return n.UNSIGNED_SHORT;if(i===gd)return n.INT;if(i===hs)return n.UNSIGNED_INT;if(i===li)return n.FLOAT;if(i===br)return n.HALF_FLOAT;if(i===dm)return n.ALPHA;if(i===hm)return n.RGB;if(i===On)return n.RGBA;if(i===nr)return n.DEPTH_COMPONENT;if(i===ir)return n.DEPTH_STENCIL;if(i===fm)return n.RED;if(i===yd)return n.RED_INTEGER;if(i===pm)return n.RG;if(i===bd)return n.RG_INTEGER;if(i===xd)return n.RGBA_INTEGER;if(i===mo||i===go||i===_o||i===vo)if(r===ct)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(i===mo)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===go)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===_o)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===vo)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(i===mo)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===go)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===_o)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===vo)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Kc||i===jc||i===Jc||i===Qc)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(i===Kc)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===jc)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Jc)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Qc)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===eu||i===tu||i===nu)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(i===eu||i===tu)return r===ct?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(i===nu)return r===ct?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===iu||i===su||i===au||i===ru||i===ou||i===lu||i===cu||i===uu||i===du||i===hu||i===fu||i===pu||i===mu||i===gu)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(i===iu)return r===ct?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===su)return r===ct?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===au)return r===ct?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===ru)return r===ct?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===ou)return r===ct?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===lu)return r===ct?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===cu)return r===ct?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===uu)return r===ct?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===du)return r===ct?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===hu)return r===ct?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===fu)return r===ct?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===pu)return r===ct?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===mu)return r===ct?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===gu)return r===ct?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===_u||i===vu||i===yu)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(i===_u)return r===ct?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===vu)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===yu)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===bu||i===xu||i===Su||i===wu)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(i===bu)return a.COMPRESSED_RED_RGTC1_EXT;if(i===xu)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Su)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===wu)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===tr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const xE=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,SE=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class wE{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new Rm(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new Oi({vertexShader:xE,fragmentShader:SE,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ze(new nn(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class EE extends _s{constructor(e,t){super();const i=this;let s=null,a=1,r=null,o="local-floor",l=1,c=null,u=null,d=null,h=null,p=null,g=null;const _=typeof XRWebGLBinding<"u",m=new wE,f={},w=t.getContextAttributes();let x=null,y=null;const C=[],M=[],T=new ue;let A=null;const v=new wn;v.viewport=new Tt;const b=new wn;b.viewport=new Tt;const R=[v,b],N=new Gy;let k=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(G){let Y=C[G];return Y===void 0&&(Y=new Zl,C[G]=Y),Y.getTargetRaySpace()},this.getControllerGrip=function(G){let Y=C[G];return Y===void 0&&(Y=new Zl,C[G]=Y),Y.getGripSpace()},this.getHand=function(G){let Y=C[G];return Y===void 0&&(Y=new Zl,C[G]=Y),Y.getHandSpace()};function V(G){const Y=M.indexOf(G.inputSource);if(Y===-1)return;const le=C[Y];le!==void 0&&(le.update(G.inputSource,G.frame,c||r),le.dispatchEvent({type:G.type,data:G.inputSource}))}function O(){s.removeEventListener("select",V),s.removeEventListener("selectstart",V),s.removeEventListener("selectend",V),s.removeEventListener("squeeze",V),s.removeEventListener("squeezestart",V),s.removeEventListener("squeezeend",V),s.removeEventListener("end",O),s.removeEventListener("inputsourceschange",q);for(let G=0;G<C.length;G++){const Y=M[G];Y!==null&&(M[G]=null,C[G].disconnect(Y))}k=null,z=null,m.reset();for(const G in f)delete f[G];e.setRenderTarget(x),p=null,h=null,d=null,s=null,y=null,te.stop(),i.isPresenting=!1,e.setPixelRatio(A),e.setSize(T.width,T.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(G){a=G,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(G){o=G,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||r},this.setReferenceSpace=function(G){c=G},this.getBaseLayer=function(){return h!==null?h:p},this.getBinding=function(){return d===null&&_&&(d=new XRWebGLBinding(s,t)),d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(G){if(s=G,s!==null){if(x=e.getRenderTarget(),s.addEventListener("select",V),s.addEventListener("selectstart",V),s.addEventListener("selectend",V),s.addEventListener("squeeze",V),s.addEventListener("squeezestart",V),s.addEventListener("squeezeend",V),s.addEventListener("end",O),s.addEventListener("inputsourceschange",q),w.xrCompatible!==!0&&await t.makeXRCompatible(),A=e.getPixelRatio(),e.getSize(T),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let le=null,Pe=null,ye=null;w.depth&&(ye=w.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,le=w.stencil?ir:nr,Pe=w.stencil?tr:hs);const Be={colorFormat:t.RGBA8,depthFormat:ye,scaleFactor:a};d=this.getBinding(),h=d.createProjectionLayer(Be),s.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),y=new fs(h.textureWidth,h.textureHeight,{format:On,type:Jn,depthTexture:new Cm(h.textureWidth,h.textureHeight,Pe,void 0,void 0,void 0,void 0,void 0,void 0,le),stencilBuffer:w.stencil,colorSpace:e.outputColorSpace,samples:w.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{const le={antialias:w.antialias,alpha:!0,depth:w.depth,stencil:w.stencil,framebufferScaleFactor:a};p=new XRWebGLLayer(s,t,le),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),y=new fs(p.framebufferWidth,p.framebufferHeight,{format:On,type:Jn,colorSpace:e.outputColorSpace,stencilBuffer:w.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,r=await s.requestReferenceSpace(o),te.setContext(s),te.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function q(G){for(let Y=0;Y<G.removed.length;Y++){const le=G.removed[Y],Pe=M.indexOf(le);Pe>=0&&(M[Pe]=null,C[Pe].disconnect(le))}for(let Y=0;Y<G.added.length;Y++){const le=G.added[Y];let Pe=M.indexOf(le);if(Pe===-1){for(let Be=0;Be<C.length;Be++)if(Be>=M.length){M.push(le),Pe=Be;break}else if(M[Be]===null){M[Be]=le,Pe=Be;break}if(Pe===-1)break}const ye=C[Pe];ye&&ye.connect(le)}}const H=new L,ne=new L;function X(G,Y,le){H.setFromMatrixPosition(Y.matrixWorld),ne.setFromMatrixPosition(le.matrixWorld);const Pe=H.distanceTo(ne),ye=Y.projectionMatrix.elements,Be=le.projectionMatrix.elements,Qe=ye[14]/(ye[10]-1),I=ye[14]/(ye[10]+1),ot=(ye[9]+1)/ye[5],Ve=(ye[9]-1)/ye[5],Fe=(ye[8]-1)/ye[0],Ee=(Be[8]+1)/Be[0],_t=Qe*Fe,Me=Qe*Ee,We=Pe/(-Fe+Ee),Ut=We*-Fe;if(Y.matrixWorld.decompose(G.position,G.quaternion,G.scale),G.translateX(Ut),G.translateZ(We),G.matrixWorld.compose(G.position,G.quaternion,G.scale),G.matrixWorldInverse.copy(G.matrixWorld).invert(),ye[10]===-1)G.projectionMatrix.copy(Y.projectionMatrix),G.projectionMatrixInverse.copy(Y.projectionMatrixInverse);else{const At=Qe+We,P=I+We,S=_t-Ut,B=Me+(Pe-Ut),K=ot*I/P*At,ee=Ve*I/P*At;G.projectionMatrix.makePerspective(S,B,K,ee,At,P),G.projectionMatrixInverse.copy(G.projectionMatrix).invert()}}function Q(G,Y){Y===null?G.matrixWorld.copy(G.matrix):G.matrixWorld.multiplyMatrices(Y.matrixWorld,G.matrix),G.matrixWorldInverse.copy(G.matrixWorld).invert()}this.updateCamera=function(G){if(s===null)return;let Y=G.near,le=G.far;m.texture!==null&&(m.depthNear>0&&(Y=m.depthNear),m.depthFar>0&&(le=m.depthFar)),N.near=b.near=v.near=Y,N.far=b.far=v.far=le,(k!==N.near||z!==N.far)&&(s.updateRenderState({depthNear:N.near,depthFar:N.far}),k=N.near,z=N.far),N.layers.mask=G.layers.mask|6,v.layers.mask=N.layers.mask&3,b.layers.mask=N.layers.mask&5;const Pe=G.parent,ye=N.cameras;Q(N,Pe);for(let Be=0;Be<ye.length;Be++)Q(ye[Be],Pe);ye.length===2?X(N,v,b):N.projectionMatrix.copy(v.projectionMatrix),ge(G,N,Pe)};function ge(G,Y,le){le===null?G.matrix.copy(Y.matrixWorld):(G.matrix.copy(le.matrixWorld),G.matrix.invert(),G.matrix.multiply(Y.matrixWorld)),G.matrix.decompose(G.position,G.quaternion,G.scale),G.updateMatrixWorld(!0),G.projectionMatrix.copy(Y.projectionMatrix),G.projectionMatrixInverse.copy(Y.projectionMatrixInverse),G.isPerspectiveCamera&&(G.fov=sr*2*Math.atan(1/G.projectionMatrix.elements[5]),G.zoom=1)}this.getCamera=function(){return N},this.getFoveation=function(){if(!(h===null&&p===null))return l},this.setFoveation=function(G){l=G,h!==null&&(h.fixedFoveation=G),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=G)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(N)},this.getCameraTexture=function(G){return f[G]};let ve=null;function Re(G,Y){if(u=Y.getViewerPose(c||r),g=Y,u!==null){const le=u.views;p!==null&&(e.setRenderTargetFramebuffer(y,p.framebuffer),e.setRenderTarget(y));let Pe=!1;le.length!==N.cameras.length&&(N.cameras.length=0,Pe=!0);for(let I=0;I<le.length;I++){const ot=le[I];let Ve=null;if(p!==null)Ve=p.getViewport(ot);else{const Ee=d.getViewSubImage(h,ot);Ve=Ee.viewport,I===0&&(e.setRenderTargetTextures(y,Ee.colorTexture,Ee.depthStencilTexture),e.setRenderTarget(y))}let Fe=R[I];Fe===void 0&&(Fe=new wn,Fe.layers.enable(I),Fe.viewport=new Tt,R[I]=Fe),Fe.matrix.fromArray(ot.transform.matrix),Fe.matrix.decompose(Fe.position,Fe.quaternion,Fe.scale),Fe.projectionMatrix.fromArray(ot.projectionMatrix),Fe.projectionMatrixInverse.copy(Fe.projectionMatrix).invert(),Fe.viewport.set(Ve.x,Ve.y,Ve.width,Ve.height),I===0&&(N.matrix.copy(Fe.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale)),Pe===!0&&N.cameras.push(Fe)}const ye=s.enabledFeatures;if(ye&&ye.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&_){d=i.getBinding();const I=d.getDepthInformation(le[0]);I&&I.isValid&&I.texture&&m.init(I,s.renderState)}if(ye&&ye.includes("camera-access")&&_){e.state.unbindTexture(),d=i.getBinding();for(let I=0;I<le.length;I++){const ot=le[I].camera;if(ot){let Ve=f[ot];Ve||(Ve=new Rm,f[ot]=Ve);const Fe=d.getCameraImage(ot);Ve.sourceTexture=Fe}}}}for(let le=0;le<C.length;le++){const Pe=M[le],ye=C[le];Pe!==null&&ye!==void 0&&ye.update(Pe,Y,c||r)}ve&&ve(G,Y),Y.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:Y}),g=null}const te=new Hm;te.setAnimationLoop(Re),this.setAnimationLoop=function(G){ve=G},this.dispose=function(){}}}const Ki=new zn,ME=new vt;function TE(n,e){function t(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function i(m,f){f.color.getRGB(m.fogColor.value,Sm(n)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function s(m,f,w,x,y){f.isMeshBasicMaterial||f.isMeshLambertMaterial?a(m,f):f.isMeshToonMaterial?(a(m,f),d(m,f)):f.isMeshPhongMaterial?(a(m,f),u(m,f)):f.isMeshStandardMaterial?(a(m,f),h(m,f),f.isMeshPhysicalMaterial&&p(m,f,y)):f.isMeshMatcapMaterial?(a(m,f),g(m,f)):f.isMeshDepthMaterial?a(m,f):f.isMeshDistanceMaterial?(a(m,f),_(m,f)):f.isMeshNormalMaterial?a(m,f):f.isLineBasicMaterial?(r(m,f),f.isLineDashedMaterial&&o(m,f)):f.isPointsMaterial?l(m,f,w,x):f.isSpriteMaterial?c(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function a(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,t(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===rn&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,t(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===rn&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,t(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,t(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const w=e.get(f),x=w.envMap,y=w.envMapRotation;x&&(m.envMap.value=x,Ki.copy(y),Ki.x*=-1,Ki.y*=-1,Ki.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(Ki.y*=-1,Ki.z*=-1),m.envMapRotation.value.setFromMatrix4(ME.makeRotationFromEuler(Ki)),m.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,m.aoMapTransform))}function r(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform))}function o(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,w,x){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*w,m.scale.value=x*.5,f.map&&(m.map.value=f.map,t(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function u(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function d(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function h(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,w){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===rn&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=w.texture,m.transmissionSamplerSize.value.set(w.width,w.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function _(m,f){const w=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(w.matrixWorld),m.nearDistance.value=w.shadow.camera.near,m.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function AE(n,e,t,i){let s={},a={},r=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(w,x){const y=x.program;i.uniformBlockBinding(w,y)}function c(w,x){let y=s[w.id];y===void 0&&(g(w),y=u(w),s[w.id]=y,w.addEventListener("dispose",m));const C=x.program;i.updateUBOMapping(w,C);const M=e.render.frame;a[w.id]!==M&&(h(w),a[w.id]=M)}function u(w){const x=d();w.__bindingPointIndex=x;const y=n.createBuffer(),C=w.__size,M=w.usage;return n.bindBuffer(n.UNIFORM_BUFFER,y),n.bufferData(n.UNIFORM_BUFFER,C,M),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,x,y),y}function d(){for(let w=0;w<o;w++)if(r.indexOf(w)===-1)return r.push(w),w;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(w){const x=s[w.id],y=w.uniforms,C=w.__cache;n.bindBuffer(n.UNIFORM_BUFFER,x);for(let M=0,T=y.length;M<T;M++){const A=Array.isArray(y[M])?y[M]:[y[M]];for(let v=0,b=A.length;v<b;v++){const R=A[v];if(p(R,M,v,C)===!0){const N=R.__offset,k=Array.isArray(R.value)?R.value:[R.value];let z=0;for(let V=0;V<k.length;V++){const O=k[V],q=_(O);typeof O=="number"||typeof O=="boolean"?(R.__data[0]=O,n.bufferSubData(n.UNIFORM_BUFFER,N+z,R.__data)):O.isMatrix3?(R.__data[0]=O.elements[0],R.__data[1]=O.elements[1],R.__data[2]=O.elements[2],R.__data[3]=0,R.__data[4]=O.elements[3],R.__data[5]=O.elements[4],R.__data[6]=O.elements[5],R.__data[7]=0,R.__data[8]=O.elements[6],R.__data[9]=O.elements[7],R.__data[10]=O.elements[8],R.__data[11]=0):(O.toArray(R.__data,z),z+=q.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,N,R.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(w,x,y,C){const M=w.value,T=x+"_"+y;if(C[T]===void 0)return typeof M=="number"||typeof M=="boolean"?C[T]=M:C[T]=M.clone(),!0;{const A=C[T];if(typeof M=="number"||typeof M=="boolean"){if(A!==M)return C[T]=M,!0}else if(A.equals(M)===!1)return A.copy(M),!0}return!1}function g(w){const x=w.uniforms;let y=0;const C=16;for(let T=0,A=x.length;T<A;T++){const v=Array.isArray(x[T])?x[T]:[x[T]];for(let b=0,R=v.length;b<R;b++){const N=v[b],k=Array.isArray(N.value)?N.value:[N.value];for(let z=0,V=k.length;z<V;z++){const O=k[z],q=_(O),H=y%C,ne=H%q.boundary,X=H+ne;y+=ne,X!==0&&C-X<q.storage&&(y+=C-X),N.__data=new Float32Array(q.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=y,y+=q.storage}}}const M=y%C;return M>0&&(y+=C-M),w.__size=y,w.__cache={},this}function _(w){const x={boundary:0,storage:0};return typeof w=="number"||typeof w=="boolean"?(x.boundary=4,x.storage=4):w.isVector2?(x.boundary=8,x.storage=8):w.isVector3||w.isColor?(x.boundary=16,x.storage=12):w.isVector4?(x.boundary=16,x.storage=16):w.isMatrix3?(x.boundary=48,x.storage=48):w.isMatrix4?(x.boundary=64,x.storage=64):w.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",w),x}function m(w){const x=w.target;x.removeEventListener("dispose",m);const y=r.indexOf(x.__bindingPointIndex);r.splice(y,1),n.deleteBuffer(s[x.id]),delete s[x.id],delete a[x.id]}function f(){for(const w in s)n.deleteBuffer(s[w]);r=[],s={},a={}}return{bind:l,update:c,dispose:f}}class CE{constructor(e={}){const{canvas:t=R0(),context:i=null,depth:s=!0,stencil:a=!1,alpha:r=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:h=!1}=e;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=r;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,f=null;const w=[],x=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Li,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const y=this;let C=!1;this._outputColorSpace=Wt;let M=0,T=0,A=null,v=-1,b=null;const R=new Tt,N=new Tt;let k=null;const z=new Ze(0);let V=0,O=t.width,q=t.height,H=1,ne=null,X=null;const Q=new Tt(0,0,O,q),ge=new Tt(0,0,O,q);let ve=!1;const Re=new Td;let te=!1,G=!1;const Y=new vt,le=new L,Pe=new Tt,ye={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Be=!1;function Qe(){return A===null?H:1}let I=i;function ot(E,U){return t.getContext(E,U)}try{const E={alpha:!0,depth:s,stencil:a,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine","three.js r180"),t.addEventListener("webglcontextlost",de,!1),t.addEventListener("webglcontextrestored",xe,!1),t.addEventListener("webglcontextcreationerror",se,!1),I===null){const U="webgl2";if(I=ot(U,E),I===null)throw ot(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let Ve,Fe,Ee,_t,Me,We,Ut,At,P,S,B,K,ee,Z,Le,ce,Te,Ae,re,me,Ue,Ce,fe,Ge;function D(){Ve=new kS(I),Ve.init(),Ce=new bE(I,Ve),Fe=new LS(I,Ve,e,Ce),Ee=new vE(I,Ve),Fe.reversedDepthBuffer&&h&&Ee.buffers.depth.setReversed(!0),_t=new HS(I),Me=new aE,We=new yE(I,Ve,Ee,Me,Fe,Ce,_t),Ut=new NS(y),At=new OS(y),P=new qy(I),fe=new RS(I,P),S=new BS(I,P,_t,fe),B=new GS(I,S,P,_t),re=new VS(I,Fe,We),ce=new IS(Me),K=new sE(y,Ut,At,Ve,Fe,fe,ce),ee=new TE(y,Me),Z=new oE,Le=new fE(Ve),Ae=new CS(y,Ut,At,Ee,B,p,l),Te=new gE(y,B,Fe),Ge=new AE(I,_t,Fe,Ee),me=new PS(I,Ve,_t),Ue=new zS(I,Ve,_t),_t.programs=K.programs,y.capabilities=Fe,y.extensions=Ve,y.properties=Me,y.renderLists=Z,y.shadowMap=Te,y.state=Ee,y.info=_t}D();const oe=new EE(y,I);this.xr=oe,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const E=Ve.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=Ve.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return H},this.setPixelRatio=function(E){E!==void 0&&(H=E,this.setSize(O,q,!1))},this.getSize=function(E){return E.set(O,q)},this.setSize=function(E,U,$=!0){if(oe.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}O=E,q=U,t.width=Math.floor(E*H),t.height=Math.floor(U*H),$===!0&&(t.style.width=E+"px",t.style.height=U+"px"),this.setViewport(0,0,E,U)},this.getDrawingBufferSize=function(E){return E.set(O*H,q*H).floor()},this.setDrawingBufferSize=function(E,U,$){O=E,q=U,H=$,t.width=Math.floor(E*$),t.height=Math.floor(U*$),this.setViewport(0,0,E,U)},this.getCurrentViewport=function(E){return E.copy(R)},this.getViewport=function(E){return E.copy(Q)},this.setViewport=function(E,U,$,W){E.isVector4?Q.set(E.x,E.y,E.z,E.w):Q.set(E,U,$,W),Ee.viewport(R.copy(Q).multiplyScalar(H).round())},this.getScissor=function(E){return E.copy(ge)},this.setScissor=function(E,U,$,W){E.isVector4?ge.set(E.x,E.y,E.z,E.w):ge.set(E,U,$,W),Ee.scissor(N.copy(ge).multiplyScalar(H).round())},this.getScissorTest=function(){return ve},this.setScissorTest=function(E){Ee.setScissorTest(ve=E)},this.setOpaqueSort=function(E){ne=E},this.setTransparentSort=function(E){X=E},this.getClearColor=function(E){return E.copy(Ae.getClearColor())},this.setClearColor=function(){Ae.setClearColor(...arguments)},this.getClearAlpha=function(){return Ae.getClearAlpha()},this.setClearAlpha=function(){Ae.setClearAlpha(...arguments)},this.clear=function(E=!0,U=!0,$=!0){let W=0;if(E){let F=!1;if(A!==null){const ae=A.texture.format;F=ae===xd||ae===bd||ae===yd}if(F){const ae=A.texture.type,pe=ae===Jn||ae===hs||ae===er||ae===tr||ae===_d||ae===vd,Se=Ae.getClearColor(),be=Ae.getClearAlpha(),De=Se.r,Oe=Se.g,Ie=Se.b;pe?(g[0]=De,g[1]=Oe,g[2]=Ie,g[3]=be,I.clearBufferuiv(I.COLOR,0,g)):(_[0]=De,_[1]=Oe,_[2]=Ie,_[3]=be,I.clearBufferiv(I.COLOR,0,_))}else W|=I.COLOR_BUFFER_BIT}U&&(W|=I.DEPTH_BUFFER_BIT),$&&(W|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),I.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",de,!1),t.removeEventListener("webglcontextrestored",xe,!1),t.removeEventListener("webglcontextcreationerror",se,!1),Ae.dispose(),Z.dispose(),Le.dispose(),Me.dispose(),Ut.dispose(),At.dispose(),B.dispose(),fe.dispose(),Ge.dispose(),K.dispose(),oe.dispose(),oe.removeEventListener("sessionstart",Vn),oe.removeEventListener("sessionend",nh),Gi.stop()};function de(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function xe(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;const E=_t.autoReset,U=Te.enabled,$=Te.autoUpdate,W=Te.needsUpdate,F=Te.type;D(),_t.autoReset=E,Te.enabled=U,Te.autoUpdate=$,Te.needsUpdate=W,Te.type=F}function se(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function j(E){const U=E.target;U.removeEventListener("dispose",j),we(U)}function we(E){He(E),Me.remove(E)}function He(E){const U=Me.get(E).programs;U!==void 0&&(U.forEach(function($){K.releaseProgram($)}),E.isShaderMaterial&&K.releaseShaderCache(E))}this.renderBufferDirect=function(E,U,$,W,F,ae){U===null&&(U=ye);const pe=F.isMesh&&F.matrixWorld.determinant()<0,Se=bv(E,U,$,W,F);Ee.setMaterial(W,pe);let be=$.index,De=1;if(W.wireframe===!0){if(be=S.getWireframeAttribute($),be===void 0)return;De=2}const Oe=$.drawRange,Ie=$.attributes.position;let je=Oe.start*De,lt=(Oe.start+Oe.count)*De;ae!==null&&(je=Math.max(je,ae.start*De),lt=Math.min(lt,(ae.start+ae.count)*De)),be!==null?(je=Math.max(je,0),lt=Math.min(lt,be.count)):Ie!=null&&(je=Math.max(je,0),lt=Math.min(lt,Ie.count));const Mt=lt-je;if(Mt<0||Mt===1/0)return;fe.setup(F,W,Se,$,be);let ft,dt=me;if(be!==null&&(ft=P.get(be),dt=Ue,dt.setIndex(ft)),F.isMesh)W.wireframe===!0?(Ee.setLineWidth(W.wireframeLinewidth*Qe()),dt.setMode(I.LINES)):dt.setMode(I.TRIANGLES);else if(F.isLine){let Ne=W.linewidth;Ne===void 0&&(Ne=1),Ee.setLineWidth(Ne*Qe()),F.isLineSegments?dt.setMode(I.LINES):F.isLineLoop?dt.setMode(I.LINE_LOOP):dt.setMode(I.LINE_STRIP)}else F.isPoints?dt.setMode(I.POINTS):F.isSprite&&dt.setMode(I.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)ar("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),dt.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if(Ve.get("WEBGL_multi_draw"))dt.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{const Ne=F._multiDrawStarts,xt=F._multiDrawCounts,et=F._multiDrawCount,on=be?P.get(be).bytesPerElement:1,xs=Me.get(W).currentProgram.getUniforms();for(let ln=0;ln<et;ln++)xs.setValue(I,"_gl_DrawID",ln),dt.render(Ne[ln]/on,xt[ln])}else if(F.isInstancedMesh)dt.renderInstances(je,Mt,F.count);else if($.isInstancedBufferGeometry){const Ne=$._maxInstanceCount!==void 0?$._maxInstanceCount:1/0,xt=Math.min($.instanceCount,Ne);dt.renderInstances(je,Mt,xt)}else dt.render(je,Mt)};function ht(E,U,$){E.transparent===!0&&E.side===Je&&E.forceSinglePass===!1?(E.side=rn,E.needsUpdate=!0,Mr(E,U,$),E.side=Ui,E.needsUpdate=!0,Mr(E,U,$),E.side=Je):Mr(E,U,$)}this.compile=function(E,U,$=null){$===null&&($=E),f=Le.get($),f.init(U),x.push(f),$.traverseVisible(function(F){F.isLight&&F.layers.test(U.layers)&&(f.pushLight(F),F.castShadow&&f.pushShadow(F))}),E!==$&&E.traverseVisible(function(F){F.isLight&&F.layers.test(U.layers)&&(f.pushLight(F),F.castShadow&&f.pushShadow(F))}),f.setupLights();const W=new Set;return E.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;const ae=F.material;if(ae)if(Array.isArray(ae))for(let pe=0;pe<ae.length;pe++){const Se=ae[pe];ht(Se,$,F),W.add(Se)}else ht(ae,$,F),W.add(ae)}),f=x.pop(),W},this.compileAsync=function(E,U,$=null){const W=this.compile(E,U,$);return new Promise(F=>{function ae(){if(W.forEach(function(pe){Me.get(pe).currentProgram.isReady()&&W.delete(pe)}),W.size===0){F(E);return}setTimeout(ae,10)}Ve.get("KHR_parallel_shader_compile")!==null?ae():setTimeout(ae,10)})};let it=null;function ei(E){it&&it(E)}function Vn(){Gi.stop()}function nh(){Gi.start()}const Gi=new Hm;Gi.setAnimationLoop(ei),typeof self<"u"&&Gi.setContext(self),this.setAnimationLoop=function(E){it=E,oe.setAnimationLoop(E),E===null?Gi.stop():Gi.start()},oe.addEventListener("sessionstart",Vn),oe.addEventListener("sessionend",nh),this.render=function(E,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),oe.enabled===!0&&oe.isPresenting===!0&&(oe.cameraAutoUpdate===!0&&oe.updateCamera(U),U=oe.getCamera()),E.isScene===!0&&E.onBeforeRender(y,E,U,A),f=Le.get(E,x.length),f.init(U),x.push(f),Y.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),Re.setFromProjectionMatrix(Y,qn,U.reversedDepth),G=this.localClippingEnabled,te=ce.init(this.clippingPlanes,G),m=Z.get(E,w.length),m.init(),w.push(m),oe.enabled===!0&&oe.isPresenting===!0){const ae=y.xr.getDepthSensingMesh();ae!==null&&Tl(ae,U,-1/0,y.sortObjects)}Tl(E,U,0,y.sortObjects),m.finish(),y.sortObjects===!0&&m.sort(ne,X),Be=oe.enabled===!1||oe.isPresenting===!1||oe.hasDepthSensing()===!1,Be&&Ae.addToRenderList(m,E),this.info.render.frame++,te===!0&&ce.beginShadows();const $=f.state.shadowsArray;Te.render($,E,U),te===!0&&ce.endShadows(),this.info.autoReset===!0&&this.info.reset();const W=m.opaque,F=m.transmissive;if(f.setupLights(),U.isArrayCamera){const ae=U.cameras;if(F.length>0)for(let pe=0,Se=ae.length;pe<Se;pe++){const be=ae[pe];sh(W,F,E,be)}Be&&Ae.render(E);for(let pe=0,Se=ae.length;pe<Se;pe++){const be=ae[pe];ih(m,E,be,be.viewport)}}else F.length>0&&sh(W,F,E,U),Be&&Ae.render(E),ih(m,E,U);A!==null&&T===0&&(We.updateMultisampleRenderTarget(A),We.updateRenderTargetMipmap(A)),E.isScene===!0&&E.onAfterRender(y,E,U),fe.resetDefaultState(),v=-1,b=null,x.pop(),x.length>0?(f=x[x.length-1],te===!0&&ce.setGlobalState(y.clippingPlanes,f.state.camera)):f=null,w.pop(),w.length>0?m=w[w.length-1]:m=null};function Tl(E,U,$,W){if(E.visible===!1)return;if(E.layers.test(U.layers)){if(E.isGroup)$=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(U);else if(E.isLight)f.pushLight(E),E.castShadow&&f.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||Re.intersectsSprite(E)){W&&Pe.setFromMatrixPosition(E.matrixWorld).applyMatrix4(Y);const pe=B.update(E),Se=E.material;Se.visible&&m.push(E,pe,Se,$,Pe.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||Re.intersectsObject(E))){const pe=B.update(E),Se=E.material;if(W&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),Pe.copy(E.boundingSphere.center)):(pe.boundingSphere===null&&pe.computeBoundingSphere(),Pe.copy(pe.boundingSphere.center)),Pe.applyMatrix4(E.matrixWorld).applyMatrix4(Y)),Array.isArray(Se)){const be=pe.groups;for(let De=0,Oe=be.length;De<Oe;De++){const Ie=be[De],je=Se[Ie.materialIndex];je&&je.visible&&m.push(E,pe,je,$,Pe.z,Ie)}}else Se.visible&&m.push(E,pe,Se,$,Pe.z,null)}}const ae=E.children;for(let pe=0,Se=ae.length;pe<Se;pe++)Tl(ae[pe],U,$,W)}function ih(E,U,$,W){const F=E.opaque,ae=E.transmissive,pe=E.transparent;f.setupLightsView($),te===!0&&ce.setGlobalState(y.clippingPlanes,$),W&&Ee.viewport(R.copy(W)),F.length>0&&Er(F,U,$),ae.length>0&&Er(ae,U,$),pe.length>0&&Er(pe,U,$),Ee.buffers.depth.setTest(!0),Ee.buffers.depth.setMask(!0),Ee.buffers.color.setMask(!0),Ee.setPolygonOffset(!1)}function sh(E,U,$,W){if(($.isScene===!0?$.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[W.id]===void 0&&(f.state.transmissionRenderTarget[W.id]=new fs(1,1,{generateMipmaps:!0,type:Ve.has("EXT_color_buffer_half_float")||Ve.has("EXT_color_buffer_float")?br:Jn,minFilter:os,samples:4,stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:tt.workingColorSpace}));const ae=f.state.transmissionRenderTarget[W.id],pe=W.viewport||R;ae.setSize(pe.z*y.transmissionResolutionScale,pe.w*y.transmissionResolutionScale);const Se=y.getRenderTarget(),be=y.getActiveCubeFace(),De=y.getActiveMipmapLevel();y.setRenderTarget(ae),y.getClearColor(z),V=y.getClearAlpha(),V<1&&y.setClearColor(16777215,.5),y.clear(),Be&&Ae.render($);const Oe=y.toneMapping;y.toneMapping=Li;const Ie=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),f.setupLightsView(W),te===!0&&ce.setGlobalState(y.clippingPlanes,W),Er(E,$,W),We.updateMultisampleRenderTarget(ae),We.updateRenderTargetMipmap(ae),Ve.has("WEBGL_multisampled_render_to_texture")===!1){let je=!1;for(let lt=0,Mt=U.length;lt<Mt;lt++){const ft=U[lt],dt=ft.object,Ne=ft.geometry,xt=ft.material,et=ft.group;if(xt.side===Je&&dt.layers.test(W.layers)){const on=xt.side;xt.side=rn,xt.needsUpdate=!0,ah(dt,$,W,Ne,xt,et),xt.side=on,xt.needsUpdate=!0,je=!0}}je===!0&&(We.updateMultisampleRenderTarget(ae),We.updateRenderTargetMipmap(ae))}y.setRenderTarget(Se,be,De),y.setClearColor(z,V),Ie!==void 0&&(W.viewport=Ie),y.toneMapping=Oe}function Er(E,U,$){const W=U.isScene===!0?U.overrideMaterial:null;for(let F=0,ae=E.length;F<ae;F++){const pe=E[F],Se=pe.object,be=pe.geometry,De=pe.group;let Oe=pe.material;Oe.allowOverride===!0&&W!==null&&(Oe=W),Se.layers.test($.layers)&&ah(Se,U,$,be,Oe,De)}}function ah(E,U,$,W,F,ae){E.onBeforeRender(y,U,$,W,F,ae),E.modelViewMatrix.multiplyMatrices($.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),F.onBeforeRender(y,U,$,W,E,ae),F.transparent===!0&&F.side===Je&&F.forceSinglePass===!1?(F.side=rn,F.needsUpdate=!0,y.renderBufferDirect($,U,W,F,E,ae),F.side=Ui,F.needsUpdate=!0,y.renderBufferDirect($,U,W,F,E,ae),F.side=Je):y.renderBufferDirect($,U,W,F,E,ae),E.onAfterRender(y,U,$,W,F,ae)}function Mr(E,U,$){U.isScene!==!0&&(U=ye);const W=Me.get(E),F=f.state.lights,ae=f.state.shadowsArray,pe=F.state.version,Se=K.getParameters(E,F.state,ae,U,$),be=K.getProgramCacheKey(Se);let De=W.programs;W.environment=E.isMeshStandardMaterial?U.environment:null,W.fog=U.fog,W.envMap=(E.isMeshStandardMaterial?At:Ut).get(E.envMap||W.environment),W.envMapRotation=W.environment!==null&&E.envMap===null?U.environmentRotation:E.envMapRotation,De===void 0&&(E.addEventListener("dispose",j),De=new Map,W.programs=De);let Oe=De.get(be);if(Oe!==void 0){if(W.currentProgram===Oe&&W.lightsStateVersion===pe)return oh(E,Se),Oe}else Se.uniforms=K.getUniforms(E),E.onBeforeCompile(Se,y),Oe=K.acquireProgram(Se,be),De.set(be,Oe),W.uniforms=Se.uniforms;const Ie=W.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Ie.clippingPlanes=ce.uniform),oh(E,Se),W.needsLights=Sv(E),W.lightsStateVersion=pe,W.needsLights&&(Ie.ambientLightColor.value=F.state.ambient,Ie.lightProbe.value=F.state.probe,Ie.directionalLights.value=F.state.directional,Ie.directionalLightShadows.value=F.state.directionalShadow,Ie.spotLights.value=F.state.spot,Ie.spotLightShadows.value=F.state.spotShadow,Ie.rectAreaLights.value=F.state.rectArea,Ie.ltc_1.value=F.state.rectAreaLTC1,Ie.ltc_2.value=F.state.rectAreaLTC2,Ie.pointLights.value=F.state.point,Ie.pointLightShadows.value=F.state.pointShadow,Ie.hemisphereLights.value=F.state.hemi,Ie.directionalShadowMap.value=F.state.directionalShadowMap,Ie.directionalShadowMatrix.value=F.state.directionalShadowMatrix,Ie.spotShadowMap.value=F.state.spotShadowMap,Ie.spotLightMatrix.value=F.state.spotLightMatrix,Ie.spotLightMap.value=F.state.spotLightMap,Ie.pointShadowMap.value=F.state.pointShadowMap,Ie.pointShadowMatrix.value=F.state.pointShadowMatrix),W.currentProgram=Oe,W.uniformsList=null,Oe}function rh(E){if(E.uniformsList===null){const U=E.currentProgram.getUniforms();E.uniformsList=yo.seqWithValue(U.seq,E.uniforms)}return E.uniformsList}function oh(E,U){const $=Me.get(E);$.outputColorSpace=U.outputColorSpace,$.batching=U.batching,$.batchingColor=U.batchingColor,$.instancing=U.instancing,$.instancingColor=U.instancingColor,$.instancingMorph=U.instancingMorph,$.skinning=U.skinning,$.morphTargets=U.morphTargets,$.morphNormals=U.morphNormals,$.morphColors=U.morphColors,$.morphTargetsCount=U.morphTargetsCount,$.numClippingPlanes=U.numClippingPlanes,$.numIntersection=U.numClipIntersection,$.vertexAlphas=U.vertexAlphas,$.vertexTangents=U.vertexTangents,$.toneMapping=U.toneMapping}function bv(E,U,$,W,F){U.isScene!==!0&&(U=ye),We.resetTextureUnits();const ae=U.fog,pe=W.isMeshStandardMaterial?U.environment:null,Se=A===null?y.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:ra,be=(W.isMeshStandardMaterial?At:Ut).get(W.envMap||pe),De=W.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,Oe=!!$.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),Ie=!!$.morphAttributes.position,je=!!$.morphAttributes.normal,lt=!!$.morphAttributes.color;let Mt=Li;W.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(Mt=y.toneMapping);const ft=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,dt=ft!==void 0?ft.length:0,Ne=Me.get(W),xt=f.state.lights;if(te===!0&&(G===!0||E!==b)){const qt=E===b&&W.id===v;ce.setState(W,E,qt)}let et=!1;W.version===Ne.__version?(Ne.needsLights&&Ne.lightsStateVersion!==xt.state.version||Ne.outputColorSpace!==Se||F.isBatchedMesh&&Ne.batching===!1||!F.isBatchedMesh&&Ne.batching===!0||F.isBatchedMesh&&Ne.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&Ne.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&Ne.instancing===!1||!F.isInstancedMesh&&Ne.instancing===!0||F.isSkinnedMesh&&Ne.skinning===!1||!F.isSkinnedMesh&&Ne.skinning===!0||F.isInstancedMesh&&Ne.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&Ne.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&Ne.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&Ne.instancingMorph===!1&&F.morphTexture!==null||Ne.envMap!==be||W.fog===!0&&Ne.fog!==ae||Ne.numClippingPlanes!==void 0&&(Ne.numClippingPlanes!==ce.numPlanes||Ne.numIntersection!==ce.numIntersection)||Ne.vertexAlphas!==De||Ne.vertexTangents!==Oe||Ne.morphTargets!==Ie||Ne.morphNormals!==je||Ne.morphColors!==lt||Ne.toneMapping!==Mt||Ne.morphTargetsCount!==dt)&&(et=!0):(et=!0,Ne.__version=W.version);let on=Ne.currentProgram;et===!0&&(on=Mr(W,U,F));let xs=!1,ln=!1,ya=!1;const St=on.getUniforms(),yn=Ne.uniforms;if(Ee.useProgram(on.program)&&(xs=!0,ln=!0,ya=!0),W.id!==v&&(v=W.id,ln=!0),xs||b!==E){Ee.buffers.depth.getReversed()&&E.reversedDepth!==!0&&(E._reversedDepth=!0,E.updateProjectionMatrix()),St.setValue(I,"projectionMatrix",E.projectionMatrix),St.setValue(I,"viewMatrix",E.matrixWorldInverse);const Jt=St.map.cameraPosition;Jt!==void 0&&Jt.setValue(I,le.setFromMatrixPosition(E.matrixWorld)),Fe.logarithmicDepthBuffer&&St.setValue(I,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&St.setValue(I,"isOrthographic",E.isOrthographicCamera===!0),b!==E&&(b=E,ln=!0,ya=!0)}if(F.isSkinnedMesh){St.setOptional(I,F,"bindMatrix"),St.setOptional(I,F,"bindMatrixInverse");const qt=F.skeleton;qt&&(qt.boneTexture===null&&qt.computeBoneTexture(),St.setValue(I,"boneTexture",qt.boneTexture,We))}F.isBatchedMesh&&(St.setOptional(I,F,"batchingTexture"),St.setValue(I,"batchingTexture",F._matricesTexture,We),St.setOptional(I,F,"batchingIdTexture"),St.setValue(I,"batchingIdTexture",F._indirectTexture,We),St.setOptional(I,F,"batchingColorTexture"),F._colorsTexture!==null&&St.setValue(I,"batchingColorTexture",F._colorsTexture,We));const bn=$.morphAttributes;if((bn.position!==void 0||bn.normal!==void 0||bn.color!==void 0)&&re.update(F,$,on),(ln||Ne.receiveShadow!==F.receiveShadow)&&(Ne.receiveShadow=F.receiveShadow,St.setValue(I,"receiveShadow",F.receiveShadow)),W.isMeshGouraudMaterial&&W.envMap!==null&&(yn.envMap.value=be,yn.flipEnvMap.value=be.isCubeTexture&&be.isRenderTargetTexture===!1?-1:1),W.isMeshStandardMaterial&&W.envMap===null&&U.environment!==null&&(yn.envMapIntensity.value=U.environmentIntensity),ln&&(St.setValue(I,"toneMappingExposure",y.toneMappingExposure),Ne.needsLights&&xv(yn,ya),ae&&W.fog===!0&&ee.refreshFogUniforms(yn,ae),ee.refreshMaterialUniforms(yn,W,H,q,f.state.transmissionRenderTarget[E.id]),yo.upload(I,rh(Ne),yn,We)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(yo.upload(I,rh(Ne),yn,We),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&St.setValue(I,"center",F.center),St.setValue(I,"modelViewMatrix",F.modelViewMatrix),St.setValue(I,"normalMatrix",F.normalMatrix),St.setValue(I,"modelMatrix",F.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){const qt=W.uniformsGroups;for(let Jt=0,Al=qt.length;Jt<Al;Jt++){const $i=qt[Jt];Ge.update($i,on),Ge.bind($i,on)}}return on}function xv(E,U){E.ambientLightColor.needsUpdate=U,E.lightProbe.needsUpdate=U,E.directionalLights.needsUpdate=U,E.directionalLightShadows.needsUpdate=U,E.pointLights.needsUpdate=U,E.pointLightShadows.needsUpdate=U,E.spotLights.needsUpdate=U,E.spotLightShadows.needsUpdate=U,E.rectAreaLights.needsUpdate=U,E.hemisphereLights.needsUpdate=U}function Sv(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return M},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(E,U,$){const W=Me.get(E);W.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,W.__autoAllocateDepthBuffer===!1&&(W.__useRenderToTexture=!1),Me.get(E.texture).__webglTexture=U,Me.get(E.depthTexture).__webglTexture=W.__autoAllocateDepthBuffer?void 0:$,W.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,U){const $=Me.get(E);$.__webglFramebuffer=U,$.__useDefaultFramebuffer=U===void 0};const wv=I.createFramebuffer();this.setRenderTarget=function(E,U=0,$=0){A=E,M=U,T=$;let W=!0,F=null,ae=!1,pe=!1;if(E){const be=Me.get(E);if(be.__useDefaultFramebuffer!==void 0)Ee.bindFramebuffer(I.FRAMEBUFFER,null),W=!1;else if(be.__webglFramebuffer===void 0)We.setupRenderTarget(E);else if(be.__hasExternalTextures)We.rebindTextures(E,Me.get(E.texture).__webglTexture,Me.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const Ie=E.depthTexture;if(be.__boundDepthTexture!==Ie){if(Ie!==null&&Me.has(Ie)&&(E.width!==Ie.image.width||E.height!==Ie.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");We.setupDepthRenderbuffer(E)}}const De=E.texture;(De.isData3DTexture||De.isDataArrayTexture||De.isCompressedArrayTexture)&&(pe=!0);const Oe=Me.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Oe[U])?F=Oe[U][$]:F=Oe[U],ae=!0):E.samples>0&&We.useMultisampledRTT(E)===!1?F=Me.get(E).__webglMultisampledFramebuffer:Array.isArray(Oe)?F=Oe[$]:F=Oe,R.copy(E.viewport),N.copy(E.scissor),k=E.scissorTest}else R.copy(Q).multiplyScalar(H).floor(),N.copy(ge).multiplyScalar(H).floor(),k=ve;if($!==0&&(F=wv),Ee.bindFramebuffer(I.FRAMEBUFFER,F)&&W&&Ee.drawBuffers(E,F),Ee.viewport(R),Ee.scissor(N),Ee.setScissorTest(k),ae){const be=Me.get(E.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+U,be.__webglTexture,$)}else if(pe){const be=U;for(let De=0;De<E.textures.length;De++){const Oe=Me.get(E.textures[De]);I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0+De,Oe.__webglTexture,$,be)}}else if(E!==null&&$!==0){const be=Me.get(E.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,be.__webglTexture,$)}v=-1},this.readRenderTargetPixels=function(E,U,$,W,F,ae,pe,Se=0){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let be=Me.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&pe!==void 0&&(be=be[pe]),be){Ee.bindFramebuffer(I.FRAMEBUFFER,be);try{const De=E.textures[Se],Oe=De.format,Ie=De.type;if(!Fe.textureFormatReadable(Oe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Fe.textureTypeReadable(Ie)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=E.width-W&&$>=0&&$<=E.height-F&&(E.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+Se),I.readPixels(U,$,W,F,Ce.convert(Oe),Ce.convert(Ie),ae))}finally{const De=A!==null?Me.get(A).__webglFramebuffer:null;Ee.bindFramebuffer(I.FRAMEBUFFER,De)}}},this.readRenderTargetPixelsAsync=async function(E,U,$,W,F,ae,pe,Se=0){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let be=Me.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&pe!==void 0&&(be=be[pe]),be)if(U>=0&&U<=E.width-W&&$>=0&&$<=E.height-F){Ee.bindFramebuffer(I.FRAMEBUFFER,be);const De=E.textures[Se],Oe=De.format,Ie=De.type;if(!Fe.textureFormatReadable(Oe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Fe.textureTypeReadable(Ie))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const je=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,je),I.bufferData(I.PIXEL_PACK_BUFFER,ae.byteLength,I.STREAM_READ),E.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+Se),I.readPixels(U,$,W,F,Ce.convert(Oe),Ce.convert(Ie),0);const lt=A!==null?Me.get(A).__webglFramebuffer:null;Ee.bindFramebuffer(I.FRAMEBUFFER,lt);const Mt=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await P0(I,Mt,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,je),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,ae),I.deleteBuffer(je),I.deleteSync(Mt),ae}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(E,U=null,$=0){const W=Math.pow(2,-$),F=Math.floor(E.image.width*W),ae=Math.floor(E.image.height*W),pe=U!==null?U.x:0,Se=U!==null?U.y:0;We.setTexture2D(E,0),I.copyTexSubImage2D(I.TEXTURE_2D,$,0,0,pe,Se,F,ae),Ee.unbindTexture()};const Ev=I.createFramebuffer(),Mv=I.createFramebuffer();this.copyTextureToTexture=function(E,U,$=null,W=null,F=0,ae=null){ae===null&&(F!==0?(ar("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ae=F,F=0):ae=0);let pe,Se,be,De,Oe,Ie,je,lt,Mt;const ft=E.isCompressedTexture?E.mipmaps[ae]:E.image;if($!==null)pe=$.max.x-$.min.x,Se=$.max.y-$.min.y,be=$.isBox3?$.max.z-$.min.z:1,De=$.min.x,Oe=$.min.y,Ie=$.isBox3?$.min.z:0;else{const bn=Math.pow(2,-F);pe=Math.floor(ft.width*bn),Se=Math.floor(ft.height*bn),E.isDataArrayTexture?be=ft.depth:E.isData3DTexture?be=Math.floor(ft.depth*bn):be=1,De=0,Oe=0,Ie=0}W!==null?(je=W.x,lt=W.y,Mt=W.z):(je=0,lt=0,Mt=0);const dt=Ce.convert(U.format),Ne=Ce.convert(U.type);let xt;U.isData3DTexture?(We.setTexture3D(U,0),xt=I.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(We.setTexture2DArray(U,0),xt=I.TEXTURE_2D_ARRAY):(We.setTexture2D(U,0),xt=I.TEXTURE_2D),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,U.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,U.unpackAlignment);const et=I.getParameter(I.UNPACK_ROW_LENGTH),on=I.getParameter(I.UNPACK_IMAGE_HEIGHT),xs=I.getParameter(I.UNPACK_SKIP_PIXELS),ln=I.getParameter(I.UNPACK_SKIP_ROWS),ya=I.getParameter(I.UNPACK_SKIP_IMAGES);I.pixelStorei(I.UNPACK_ROW_LENGTH,ft.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,ft.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,De),I.pixelStorei(I.UNPACK_SKIP_ROWS,Oe),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Ie);const St=E.isDataArrayTexture||E.isData3DTexture,yn=U.isDataArrayTexture||U.isData3DTexture;if(E.isDepthTexture){const bn=Me.get(E),qt=Me.get(U),Jt=Me.get(bn.__renderTarget),Al=Me.get(qt.__renderTarget);Ee.bindFramebuffer(I.READ_FRAMEBUFFER,Jt.__webglFramebuffer),Ee.bindFramebuffer(I.DRAW_FRAMEBUFFER,Al.__webglFramebuffer);for(let $i=0;$i<be;$i++)St&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Me.get(E).__webglTexture,F,Ie+$i),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Me.get(U).__webglTexture,ae,Mt+$i)),I.blitFramebuffer(De,Oe,pe,Se,je,lt,pe,Se,I.DEPTH_BUFFER_BIT,I.NEAREST);Ee.bindFramebuffer(I.READ_FRAMEBUFFER,null),Ee.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(F!==0||E.isRenderTargetTexture||Me.has(E)){const bn=Me.get(E),qt=Me.get(U);Ee.bindFramebuffer(I.READ_FRAMEBUFFER,Ev),Ee.bindFramebuffer(I.DRAW_FRAMEBUFFER,Mv);for(let Jt=0;Jt<be;Jt++)St?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,bn.__webglTexture,F,Ie+Jt):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,bn.__webglTexture,F),yn?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,qt.__webglTexture,ae,Mt+Jt):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,qt.__webglTexture,ae),F!==0?I.blitFramebuffer(De,Oe,pe,Se,je,lt,pe,Se,I.COLOR_BUFFER_BIT,I.NEAREST):yn?I.copyTexSubImage3D(xt,ae,je,lt,Mt+Jt,De,Oe,pe,Se):I.copyTexSubImage2D(xt,ae,je,lt,De,Oe,pe,Se);Ee.bindFramebuffer(I.READ_FRAMEBUFFER,null),Ee.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else yn?E.isDataTexture||E.isData3DTexture?I.texSubImage3D(xt,ae,je,lt,Mt,pe,Se,be,dt,Ne,ft.data):U.isCompressedArrayTexture?I.compressedTexSubImage3D(xt,ae,je,lt,Mt,pe,Se,be,dt,ft.data):I.texSubImage3D(xt,ae,je,lt,Mt,pe,Se,be,dt,Ne,ft):E.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,ae,je,lt,pe,Se,dt,Ne,ft.data):E.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,ae,je,lt,ft.width,ft.height,dt,ft.data):I.texSubImage2D(I.TEXTURE_2D,ae,je,lt,pe,Se,dt,Ne,ft);I.pixelStorei(I.UNPACK_ROW_LENGTH,et),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,on),I.pixelStorei(I.UNPACK_SKIP_PIXELS,xs),I.pixelStorei(I.UNPACK_SKIP_ROWS,ln),I.pixelStorei(I.UNPACK_SKIP_IMAGES,ya),ae===0&&U.generateMipmaps&&I.generateMipmap(xt),Ee.unbindTexture()},this.initRenderTarget=function(E){Me.get(E).__webglFramebuffer===void 0&&We.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?We.setTextureCube(E,0):E.isData3DTexture?We.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?We.setTexture2DArray(E,0):We.setTexture2D(E,0),Ee.unbindTexture()},this.resetState=function(){M=0,T=0,A=null,Ee.reset(),fe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return qn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=tt._getDrawingBufferColorSpace(e),t.unpackColorSpace=tt._getUnpackColorSpace()}}const vf={type:"change"},Nd={type:"start"},Xm={type:"end"},no=new Md,yf=new Mi,RE=Math.cos(70*pt.DEG2RAD),Pt=new L,Qt=2*Math.PI,ut={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},uc=1e-6;class PE extends Wy{constructor(e,t=null){super(e,t),this.state=ut.NONE,this.target=new L,this.cursor=new L,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Ks.ROTATE,MIDDLE:Ks.DOLLY,RIGHT:Ks.PAN},this.touches={ONE:$s.ROTATE,TWO:$s.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new L,this._lastQuaternion=new Fi,this._lastTargetPosition=new L,this._quat=new Fi().setFromUnitVectors(e.up,new L(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new $h,this._sphericalDelta=new $h,this._scale=1,this._panOffset=new L,this._rotateStart=new ue,this._rotateEnd=new ue,this._rotateDelta=new ue,this._panStart=new ue,this._panEnd=new ue,this._panDelta=new ue,this._dollyStart=new ue,this._dollyEnd=new ue,this._dollyDelta=new ue,this._dollyDirection=new L,this._mouse=new ue,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=IE.bind(this),this._onPointerDown=LE.bind(this),this._onPointerUp=NE.bind(this),this._onContextMenu=zE.bind(this),this._onMouseWheel=FE.bind(this),this._onKeyDown=OE.bind(this),this._onTouchStart=kE.bind(this),this._onTouchMove=BE.bind(this),this._onMouseDown=DE.bind(this),this._onMouseMove=UE.bind(this),this._interceptControlDown=HE.bind(this),this._interceptControlUp=VE.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(vf),this.update(),this.state=ut.NONE}update(e=null){const t=this.object.position;Pt.copy(t).sub(this.target),Pt.applyQuaternion(this._quat),this._spherical.setFromVector3(Pt),this.autoRotate&&this.state===ut.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=Qt:i>Math.PI&&(i-=Qt),s<-Math.PI?s+=Qt:s>Math.PI&&(s-=Qt),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let a=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const r=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),a=r!=this._spherical.radius}if(Pt.setFromSpherical(this._spherical),Pt.applyQuaternion(this._quatInverse),t.copy(this.target).add(Pt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let r=null;if(this.object.isPerspectiveCamera){const o=Pt.length();r=this._clampDistance(o*this._scale);const l=o-r;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),a=!!l}else if(this.object.isOrthographicCamera){const o=new L(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),a=l!==this.object.zoom;const c=new L(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),r=Pt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;r!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(r).add(this.object.position):(no.origin.copy(this.object.position),no.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(no.direction))<RE?this.object.lookAt(this.target):(yf.setFromNormalAndCoplanarPoint(this.object.up,this.target),no.intersectPlane(yf,this.target))))}else if(this.object.isOrthographicCamera){const r=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),r!==this.object.zoom&&(this.object.updateProjectionMatrix(),a=!0)}return this._scale=1,this._performCursorZoom=!1,a||this._lastPosition.distanceToSquared(this.object.position)>uc||8*(1-this._lastQuaternion.dot(this.object.quaternion))>uc||this._lastTargetPosition.distanceToSquared(this.target)>uc?(this.dispatchEvent(vf),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Qt/60*this.autoRotateSpeed*e:Qt/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Pt.setFromMatrixColumn(t,0),Pt.multiplyScalar(-e),this._panOffset.add(Pt)}_panUp(e,t){this.screenSpacePanning===!0?Pt.setFromMatrixColumn(t,1):(Pt.setFromMatrixColumn(t,0),Pt.crossVectors(this.object.up,Pt)),Pt.multiplyScalar(e),this._panOffset.add(Pt)}_pan(e,t){const i=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;Pt.copy(s).sub(this.target);let a=Pt.length();a*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*a/i.clientHeight,this.object.matrix),this._panUp(2*t*a/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),s=e-i.left,a=t-i.top,r=i.width,o=i.height;this._mouse.x=s/r*2-1,this._mouse.y=-(a/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Qt*this._rotateDelta.x/t.clientHeight),this._rotateUp(Qt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Qt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Qt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Qt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Qt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(i,s)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,s=e.pageY-t.y,a=Math.sqrt(i*i+s*s);this._dollyStart.set(0,a)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),a=.5*(e.pageY+i.y);this._rotateEnd.set(s,a)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Qt*this._rotateDelta.x/t.clientHeight),this._rotateUp(Qt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,s=e.pageY-t.y,a=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,a),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const r=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(r,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new ue,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function LE(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n)))}function IE(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function NE(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Xm),this.state=ut.NONE;break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function DE(n){let e;switch(n.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Ks.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=ut.DOLLY;break;case Ks.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=ut.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=ut.ROTATE}break;case Ks.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=ut.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=ut.PAN}break;default:this.state=ut.NONE}this.state!==ut.NONE&&this.dispatchEvent(Nd)}function UE(n){switch(this.state){case ut.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case ut.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case ut.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function FE(n){this.enabled===!1||this.enableZoom===!1||this.state!==ut.NONE||(n.preventDefault(),this.dispatchEvent(Nd),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(Xm))}function OE(n){this.enabled!==!1&&this._handleKeyDown(n)}function kE(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case $s.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=ut.TOUCH_ROTATE;break;case $s.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=ut.TOUCH_PAN;break;default:this.state=ut.NONE}break;case 2:switch(this.touches.TWO){case $s.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=ut.TOUCH_DOLLY_PAN;break;case $s.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=ut.TOUCH_DOLLY_ROTATE;break;default:this.state=ut.NONE}break;default:this.state=ut.NONE}this.state!==ut.NONE&&this.dispatchEvent(Nd)}function BE(n){switch(this._trackPointer(n),this.state){case ut.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case ut.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case ut.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case ut.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=ut.NONE}}function zE(n){this.enabled!==!1&&n.preventDefault()}function HE(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function VE(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Dd=1,bo=.32,bf=1024,GE=16;function xf(n){const e=new rt({color:n,transparent:!0,opacity:Dd,side:Je});return e.forceSinglePass=!0,e}function $E(n){return new km({color:n,side:Je,transparent:!0,opacity:Dd})}function zs(n,e,t,i){return new ze(new vs(n,t,e,6,1,6),i)}function dc(n,e,t,i,s,a,r,o){n.beginPath();for(let l=0;l<=e;l+=8){const c=l/e,u=i*t+Math.sin(c*Math.PI*2+a)*s+Math.sin(c*Math.PI*4+a*.5)*s*.35;l===0?n.moveTo(l,u):n.lineTo(l,u)}n.lineWidth=r,n.strokeStyle=o,n.stroke()}function hc(n,e,t,i,s,a,r,o){n.beginPath();for(let l=0;l<=t;l+=8){const c=l/t,u=i*e+Math.sin(c*Math.PI*2+a)*s+Math.sin(c*Math.PI*6+a*.3)*s*.18;l===0?n.moveTo(u,l):n.lineTo(u,l)}n.lineWidth=r,n.strokeStyle=o,n.stroke()}function fc(n,e,t,i,s,a){n.beginPath(),n.arc(e,t,i,0,Math.PI*2),n.fillStyle=s,n.fill(),n.lineWidth=Math.max(6,i*.15),n.strokeStyle=a,n.stroke()}function WE(n){const e=document.createElement("canvas");e.width=bf,e.height=bf;const t=e.getContext("2d");if(!t)throw new Error("Unable to create ball texture canvas");const{width:i,height:s}=e,a=t.createLinearGradient(0,0,i,s);a.addColorStop(0,"#faf7ee"),a.addColorStop(.55,"#e7e1d0"),a.addColorStop(1,"#d5cfbe"),t.fillStyle=a,t.fillRect(0,0,i,s),t.globalAlpha=.22;for(let l=0;l<28;l+=1){const c=l/27*s;t.fillStyle=l%2===0?"#ffffff":"#d3cbb6",t.fillRect(0,c,i,s/54)}t.globalAlpha=1;const r="#2d313b";t.lineCap="round",dc(t,i,s,.24,22,.35,18,r),dc(t,i,s,.5,14,1.1,20,r),dc(t,i,s,.77,20,2.35,18,r),hc(t,i,s,.2,24,.2,18,r),hc(t,i,s,.48,18,1.6,18,r),hc(t,i,s,.76,26,2.7,18,r),t.globalAlpha=.92,fc(t,i*.28,s*.32,88,"#f1a63a","#fff4d7"),fc(t,i*.68,s*.6,72,"#4db0ff","#eef8ff"),fc(t,i*.76,s*.2,54,"#1f232c","#f0ece1"),t.globalAlpha=1,t.beginPath(),t.moveTo(i*.08,s*.86),t.quadraticCurveTo(i*.28,s*.72,i*.42,s*.8),t.quadraticCurveTo(i*.58,s*.9,i*.82,s*.78),t.lineWidth=24,t.strokeStyle="rgba(255, 246, 220, 0.9)",t.stroke();const o=new dl(e);return o.colorSpace=Wt,o.anisotropy=Math.min(8,n.capabilities.getMaxAnisotropy()),o}function XE(n,e,t,i){return new ze(new vs(n,e,t,6,6,1),i)}function qE(n){const e=10280*n,t=8240*n,i=1960*n,s=1e3*n,a=1900*n,r=800*n,o=900*n,l=Math.max(1,n),c=[],u=[1,-1];function d(_,m,f=null){const w=_.material.clone();return _.material=w,c.push({mesh:_,material:w,outwardLocal:m.clone().normalize(),fixedOpacity:f}),_}function h(_){const m=new gt,f=xf(_),w=t/2-s-a/2,x=Math.sqrt(2*Math.pow(s,2));for(const C of u){const M=d(zs(w,i,l,f),new L(0,1,0));M.position.set(C*(w/2+a/2),0,i/2),m.add(M);const T=d(zs(x,i,l,f),new L(0,1,0));T.position.set(C*(t/2-s/2),-s/2,i/2),T.rotateZ(-C*Math.PI/4),m.add(T)}const y=d(zs(a,i-r,l,f),new L(0,1,0));return y.position.set(0,0,i/2+r/2),m.add(y),m}function p(_,m){const f=new gt,w=[[t/2,0],[-t/2,0],[-t/2,e/2-s],[-t/2+s,e/2],[-a/2,e/2],[-a/2,e/2+o],[a/2,e/2+o],[a/2,e/2],[t/2-s,e/2],[t/2,e/2-s],[t/2,0]],x=new Pd;w.forEach(([b,R],N)=>{N===0?x.moveTo(b,R):x.lineTo(b,R)});const y=$E(_),C=xf(_),M=d(new ze(new fl(x),y),new L(0,0,-1));M.receiveShadow=!0,f.add(M);for(const b of u){const R=d(zs(o,r,l,C),new L(0,-b,0),bo);R.position.set(b*a/2,e/2+o/2,r/2),R.rotateZ(Math.PI/2),f.add(R)}const T=d(XE(a,o,l,C),new L(0,0,1),bo);T.position.set(0,e/2+o/2,r),f.add(T);const A=d(zs(a,r,l,C),new L(0,1,0),bo);A.position.set(0,e/2+o,r/2),f.add(A);const v=h(_);v.position.y=e/2,f.add(v);for(const b of u){const R=d(zs(e/2-s,i,l,C),new L(0,-b,0));R.position.set(b*t/2,(e/2-s)/2,i/2),R.rotateZ(Math.PI/2),f.add(R)}return m&&f.rotateZ(Math.PI),f}const g=new gt;return g.add(p(16771251,!1)),g.add(p(8381439,!0)),{stadium:g,wallPanels:c}}function YE(n){const e=[[100,-100,100],[100,100,100],[-100,100,100],[-100,-100,100],[150,-220,20],[-150,-220,20],[130,-400,-20],[-130,-400,-20],[140,170,25],[-140,170,25],[130,240,25],[-130,240,25],[130,-400,-80],[-130,-400,-80],[150,-220,-80],[-150,-220,-80],[140,170,-80],[-140,170,-80],[130,240,-80],[-130,240,-80]],t=[[0,1,2],[0,2,3],[4,0,5],[0,3,5],[6,4,5],[6,5,7],[1,8,9],[1,9,2],[4,8,1],[4,1,0],[3,2,9],[3,9,5],[8,10,11],[8,11,9],[12,6,7],[12,7,13],[7,5,15],[7,15,13],[6,14,4],[12,14,6],[14,16,4],[4,16,8],[5,9,15],[15,9,17],[16,18,8],[8,18,10],[9,11,17],[17,11,19],[10,18,11],[11,18,19],[14,12,13],[14,13,15],[16,14,15],[16,15,17],[18,16,17],[18,17,19]],i=new Ct;i.setAttribute("position",new st(e.flat(),3)),i.setIndex(t.flat()),i.computeVertexNormals();const s=new gt,a=new gt,r=new ze(i,new km({color:n}));r.castShadow=!0,a.add(r);const o=new Go({color:1710894,shininess:120,transparent:!0,opacity:.82}),l=[[100,-100,100],[-100,-100,100],[150,-220,20],[-150,-220,20],[100,100,100],[-100,100,100],[140,170,25],[-140,170,25],[100,-100,100],[100,100,100],[150,-220,20],[140,170,25],[-100,-100,100],[-100,100,100],[-150,-220,20],[-140,170,25]],c=[[0,2,3],[0,3,1],[4,6,7],[4,7,5],[8,10,11],[8,11,9],[12,14,15],[12,15,13]],u=new Ct;u.setAttribute("position",new st(l.flat(),3)),u.setIndex(c.flat()),u.computeVertexNormals();const d=new ze(u,o);d.position.z=1,a.add(d);const h=new rt({color:8968191,transparent:!0,opacity:.34,side:Je}),p=new Ct;p.setAttribute("position",new st([90,-110,95,-90,-110,95,140,-210,25,-140,-210,25],3)),p.setIndex([0,2,3,0,3,1]),p.computeVertexNormals();const g=new ze(p,h);g.position.z=2,a.add(g);const _=new Go({color:2236962,shininess:48}),m=(f,w,x,y)=>{const C=new ze(new hl(70,70,y,10),_);return C.rotateZ(Math.PI/2),C.position.set(f,w,x),C.castShadow=!0,C};return a.add(m(120,-300,-60,50)),a.add(m(-120,-300,-60,50)),a.add(m(120,150,-60,70)),a.add(m(-120,150,-60,70)),a.position.set(0,0,50),a.rotateZ(Math.PI/2),a.scale.set(.35,.35,.35),s.add(a),s}function ZE(){const n=new gt;n.visible=!1,n.position.set(-124,0,8);const e=new rr(30,220,14,1,!0);e.rotateZ(Math.PI/2),e.translate(-110,0,0);const t=new rr(17,150,12,1,!0);t.rotateZ(Math.PI/2),t.translate(-75,0,0);const i=new ca(21,12,12),s=[-38,38];for(const a of s){const r=new gt;r.position.set(0,a,0);const o=new rt({color:"#ff9b2f",transparent:!0,opacity:.42,blending:Pi,depthWrite:!1,side:Je});o.forceSinglePass=!0;const l=new ze(e,o);l.name="outer-flame",r.add(l);const c=new rt({color:"#fff2ba",transparent:!0,opacity:.9,blending:Pi,depthWrite:!1,side:Je});c.forceSinglePass=!0;const u=new ze(t,c);u.name="inner-flame",r.add(u);const d=new rt({color:"#fff8db",transparent:!0,opacity:.62,blending:Pi,depthWrite:!1});d.forceSinglePass=!0;const h=new ze(i,d);h.name="glow",h.position.x=-10,r.add(h),n.add(r)}return n}function KE(){const n=new gt;n.visible=!1,n.position.set(0,0,235);const e=240,t=82,i=188,s=20,a=new nn(e,t),r=new rt({color:463645,transparent:!0,opacity:.78,side:Je,depthWrite:!1}),o=new ze(a,r);o.position.z=-1,n.add(o);const l=new nn(i,s),c=new rt({color:1385521,transparent:!0,opacity:.92,side:Je,depthWrite:!1}),u=new ze(l,c);u.position.y=-18,n.add(u);const d=new nn(i,s),h=new rt({color:16761415,transparent:!0,opacity:.98,side:Je,depthWrite:!1}),p=new ze(d,h);p.position.y=-18,n.add(p);const g=document.createElement("canvas");g.width=512,g.height=160;const _=g.getContext("2d");if(!_)throw new Error("Unable to create boost meter label context");const m=new dl(g);m.colorSpace=Wt,m.needsUpdate=!0;const f=new nn(190,48),w=new rt({map:m,transparent:!0,depthWrite:!1,side:Je}),x=new ze(f,w);return x.position.set(0,15,0),n.add(x),{group:n,fillMesh:p,fillMaterial:h,labelTexture:m,labelContext:_,labelCanvas:g,lastPercent:null}}function jE(){const n=new gt;n.visible=!1;const e=new rt({color:16765276,transparent:!0,opacity:.86,depthWrite:!1}),t=new ze(new Ld(170,8,8,48),e);t.position.z=16,n.add(t);const i=document.createElement("canvas");i.width=512,i.height=192;const s=i.getContext("2d");if(!s)throw new Error("Unable to create demo indicator label context");s.textAlign="center",s.textBaseline="middle",s.lineJoin="round",s.font="800 86px sans-serif",s.lineWidth=20,s.strokeStyle="rgba(7, 19, 29, 0.94)",s.strokeText("DEMO",i.width/2,88),s.fillStyle="#fff0b8",s.fillText("DEMO",i.width/2,88),s.font="700 34px sans-serif",s.lineWidth=10,s.strokeText("RESPAWNING",i.width/2,150),s.fillStyle="#ffbd4a",s.fillText("RESPAWNING",i.width/2,150);const a=new dl(i);a.colorSpace=Wt;const r=new rt({map:a,transparent:!0,depthWrite:!1,side:Je}),o=new ze(new nn(310,116),r);return o.position.z=300,n.add(o),{group:n,ring:t,label:o}}function JE(n,e,t,i){n.fillMesh.scale.x=Math.max(.001,e);const s=94;n.fillMesh.position.x=-(1-e)*s,n.fillMesh.position.y=-18;const a=Math.max(0,Math.min(100,Math.round(t/255*100)));if(n.lastPercent!==a){const{labelContext:r,labelCanvas:o,labelTexture:l}=n;r.clearRect(0,0,o.width,o.height),r.textAlign="center",r.textBaseline="middle",r.lineJoin="round",r.font="700 84px sans-serif",r.lineWidth=18,r.strokeStyle="rgba(7, 19, 29, 0.92)",r.strokeText(`${a}`,o.width/2,78),r.fillStyle="#fff8e1",r.fillText(`${a}`,o.width/2,78),r.font="600 30px sans-serif",r.lineWidth=10,r.strokeText("BOOST",o.width/2,130),r.fillStyle="#ffcf70",r.fillText("BOOST",o.width/2,130),l.needsUpdate=!0,n.lastPercent=a}n.group.quaternion.copy(i.quaternion)}function QE(n){n.add(new Vy("#d8ecff",1.6));const e=new Gh("#fff6df",2.4);e.position.set(4e3,-6e3,5e3),n.add(e);const t=new Gh("#97d7ff",1.2);t.position.set(-5e3,4e3,3e3),n.add(t)}function eM(n){const e=WE(n),t=new Go({color:16777215,map:e,shininess:42,specular:new Ze("#f7f2e3")});return{mesh:new ze(new ca(93,24,24),t),texture:e}}function tM(n,e,t){const i=new ty;i.background=new Ze("#081119");const s=new wn(48,1,10*t,5e5*t);s.up.set(0,0,1),s.position.set(0,-9e3*t,5e3*t),s.lookAt(0,0,0);const a=new CE({antialias:!0});a.setPixelRatio(window.devicePixelRatio),a.domElement.style.display="block",a.domElement.style.width="100%",a.domElement.style.height="100%",a.domElement.tabIndex=0,a.domElement.setAttribute("aria-label","Replay player viewport"),n.replaceChildren(a.domElement);const r=new PE(s,a.domElement);r.enableDamping=!0,r.maxDistance=16e4*t,r.keyPanSpeed=GE,r.target.set(0,0,600*t),r.listenToKeyEvents(a.domElement),r.update();const o=()=>{a.domElement.focus()};a.domElement.addEventListener("pointerdown",o);const{stadium:l,wallPanels:c}=qE(t);i.add(l),QE(i);const u=new gt;u.scale.set(-t,t,t),i.add(u);const{mesh:d,texture:h}=eM(a);u.add(d);const p=new Map,g=new Map,_=new Map,m=new Map;for(const A of e.players){const v=YE(A.isTeamZero?"#57a8ff":"#ff9c40"),b=ZE();v.add(b);const R=KE();v.add(R.group);const N=jE();u.add(v),u.add(N.group),p.set(A.id,v),g.set(A.id,b),_.set(A.id,R),m.set(A.id,N)}const f=()=>{const A=n.clientWidth||1,v=n.clientHeight||1;s.aspect=A/v,s.updateProjectionMatrix(),a.setSize(A,v,!1)};f();const w=new L,x=new L,y=new Fi,C=new L;return{scene:i,replayRoot:u,camera:s,renderer:a,controls:r,resize:f,dispose:()=>{a.domElement.removeEventListener("pointerdown",o),r.stopListenToKeyEvents(),r.dispose(),h.dispose(),a.dispose(),n.replaceChildren()},ballMesh:d,playerMeshes:p,playerBoostTrails:g,playerBoostMeters:_,playerDemoIndicators:m,updateWallVisibility:()=>{i.updateMatrixWorld(!0);for(const A of c){if(A.fixedOpacity!==null){A.material.transparent=!0,A.material.opacity=A.fixedOpacity,A.material.depthWrite=!1;continue}A.mesh.getWorldPosition(w),A.mesh.getWorldQuaternion(y),x.copy(A.outwardLocal).applyQuaternion(y).normalize(),C.copy(s.position).sub(w);const v=x.dot(C)>0;A.material.transparent=!0,A.material.opacity=v?bo:Dd,A.material.depthWrite=!v}}}}function Da(n,e){if(n.frames.length===0)return 0;let t=0,i=n.frames.length-1;for(;t<=i;){const s=Math.floor((t+i)/2),a=n.frames[s]?.time??0;if(a<e)t=s+1;else if(a>e)i=s-1;else return s}return Math.max(0,t-1)}function nM(n,e){return n.frames.length===0?0:pt.clamp(Math.round(e),0,n.frames.length-1)}function iM(n){if(n.frames.length===0)return null;const e=new Map;for(const s of n.frames)e.set(s.gameState,(e.get(s.gameState)??0)+1);let t=null,i=-1;for(const[s,a]of e.entries())a<=i||(t=s,i=a);return t}function sM(n,e){if(e===null)return null;for(const t of n.frames){if(t.gameState===e)break;return t.gameState}return null}function qm(n,e){return e===null?n.kickoffCountdown<=0:n.gameState===e}function Ud(n,e){return n.kickoffCountdown>0?!0:e!==null&&n.gameState===e}function aM(n,e){return n.ballFrames[e]?.position?!0:n.players.some(t=>t.frames[e]?.position)}function rM(n,e,t,i){return Ud(e,i)&&aM(n,t)}function xo(n,e,t,i,s){return!qm(e,i)&&!rM(n,e,t,s)}function Sf(n,e,t,i,s,a,r){return i&&xo(n,e,t,a,r)||s&&Ud(e,r)}function oM(n,e,t,i,s){const a=[],{frames:r}=n;if(r.length===0||!e&&!t)return a;let o=0;for(;o<r.length;){const l=r[o];if(!l||!Sf(n,l,o,e,t,i,s)){o+=1;continue}const c=l.time;let u=o+1;for(;u<r.length&&Sf(n,r[u],u,e,t,i,s);)u+=1;const d=r[u]?.time??n.duration;if(d>c){const h=a.at(-1);h&&h.endTime>=c?h.endTime=Math.max(h.endTime,d):a.push({startTime:c,endTime:d})}o=u}return a}function lM(n,e,t){const i=pt.clamp(t,0,n);let s=0;for(const a of e){if(i<a.startTime)break;if(i<a.endTime)return{replayTime:i,timelineTime:a.startTime-s,seekTime:a.startTime,hiddenBySkip:!0};s+=a.endTime-a.startTime}return{replayTime:i,timelineTime:i-s,seekTime:i,hiddenBySkip:!1}}function cM(n,e,t,i){const s=pt.clamp(i,0,e);let a=0;for(const r of t){const o=r.startTime-a;if(s<=o)return s+a;a+=r.endTime-r.startTime}return pt.clamp(s+a,0,n)}function uM(n,e){const t=e.at(-1);return!t||t.endTime<n?n:pt.clamp(t.startTime,0,n)}function dM(n,e,t){const i=n.frames[e];if(!i||i.kickoffCountdown<=0)return null;let s=e;for(;s>0&&(n.frames[s-1]?.kickoffCountdown??0)>0;)s-=1;let a=e+1;for(;a<n.frames.length&&n.frames[a].kickoffCountdown>0;)a+=1;let r=0;for(let c=s;c<a;c+=1)r=Math.max(r,n.frames[c].kickoffCountdown);const o=n.frames[a]?.time??n.duration,l=Math.max(0,o-t);return{kind:"kickoff-countdown",countdown:Math.max(1,Math.min(r,Math.ceil(l))),secondsRemaining:l,endsAt:o}}function hM(n,e){const t=Da(n,e),i=Math.min(t+1,n.frames.length-1);if(i===t)return{frameIndex:t,nextFrameIndex:i,alpha:0};const s=n.frames[t]?.time??0,a=n.frames[i]?.time??s;return a<=s?{frameIndex:t,nextFrameIndex:i,alpha:0}:{frameIndex:t,nextFrameIndex:i,alpha:pt.clamp((e-s)/(a-s),0,1)}}const fM=1.4,Hs=.18,io=.14,pM=120,wf=90,mM=40,gM=45,_M=.58,Ef=.82,vM=132,Ym=new L(-1,0,0),as=new L(0,0,1),yM=new L(-1,0,0),bM=new L(0,0,18800),xM=new L(0,0,700),SM=new L(-9600,-12600,6400),wM=new L(0,0,900),$o=48,EM=16,MM=16,TM=.003,AM=.05;function Mf(n,e,t){return n?!e||t<=0?n:{x:pt.lerp(n.x,e.x,t),y:pt.lerp(n.y,e.y,t),z:pt.lerp(n.z,e.z,t)}:e}function pc(n){return new L(n.x,n.y,n.z)}function Zm(n,e){return new L(-n.x*e,n.y*e,n.z*e)}function mc(n){return new L(-n.x,n.y,n.z).normalize()}function CM(n,e){switch(n){case"overhead":return{position:bM.clone().multiplyScalar(e),target:xM.clone().multiplyScalar(e),up:yM.clone(),fov:$o};case"side":return{position:SM.clone().multiplyScalar(e),target:wM.clone().multiplyScalar(e),up:as.clone(),fov:$o}}}function RM(n){const{fov:e,position:t,sceneState:i,target:s,up:a}=n,{camera:r,controls:o}=i;o.enabled=!1,r.position.lerp(t,io),o.target.lerp(s,io),r.up.lerp(a,io).normalize(),r.fov=pt.lerp(r.fov,e,io),r.updateProjectionMatrix(),r.lookAt(o.target);const l=r.position.distanceToSquared(t)<=EM,c=o.target.distanceToSquared(s)<=MM,u=r.up.angleTo(a)<=TM,d=Math.abs(r.fov-e)<=AM;return!l||!c||!u||!d?!1:(r.position.copy(t),o.target.copy(s),r.up.copy(a).normalize(),r.fov=e,r.updateProjectionMatrix(),r.lookAt(s),o.enabled=!0,!0)}function PM(n){const e=n.linearVelocity?mc(n.linearVelocity):null,t=n.forward?mc(n.forward):null,i=n.up?mc(n.up):null;if((n.position?.z??1/0)<pM){const l=(t??e??Ym.clone()).clone().setZ(0);if(l.lengthSq()<1e-4)return null;l.normalize(),e&&e.lengthSq()>1e-4&&l.dot(e)<0&&l.negate();const c=new L().crossVectors(as,l).normalize(),u=new L().crossVectors(l,c).normalize();return{forward:l,up:u,right:c}}if(!t||!i)return null;const a=t.clone().normalize(),r=new L().crossVectors(i,a).normalize(),o=new L().crossVectors(a,r).normalize();return{forward:a,up:o,right:r}}function LM(n){const{cameraViewMode:e,attachedPlayerId:t,ballCamEnabled:i,ballPosition:s,cameraDistanceScale:a,customCameraSettings:r,desiredCameraPosition:o,desiredLookTarget:l,fieldScale:c,frameIndex:u,replay:d,sceneState:h}=n,p=h.controls;if(e==="free"){p.enabled=!0,h.camera.fov=pt.lerp(h.camera.fov,$o,Hs),h.camera.updateProjectionMatrix();return}if(!t){p.enabled=!0,h.camera.fov=pt.lerp(h.camera.fov,$o,Hs),h.camera.updateProjectionMatrix();return}const g=d.players.find(k=>k.id===t),_=g?.frames[u];if(!g||!_?.position||_.isPresent===!1){p.enabled=!0;return}p.enabled=!1;const m=Zm(_.position,c),f=PM(_),w=f?.forward??Ym.clone(),x=f?.right??new L(0,1,0),y={...g.cameraSettings,...r??{}},C=(y.distance??270)*c*a,M=(y.height??100)*c*fM,T=pt.degToRad(y.pitch??-4),A=w.clone().applyAxisAngle(x,T).normalize(),v=m.clone().addScaledVector(as,M),b=w.clone().multiplyScalar(-C).addScaledVector(as,M).applyAxisAngle(x,T),R=m.clone().addScaledVector(as,mM*c);let N=y.fov??110;if(i&&s){const k=s.clone().addScaledVector(as,gM*c),z=k.clone().sub(R),V=(z.lengthSq()>1e-4?z.normalize():A.clone()).multiplyScalar(Ef).addScaledVector(A,1-Ef).normalize();l.copy(R).lerp(k,_M),o.copy(v).addScaledVector(V,-C),o.z=Math.max(wf*c,o.z);const O=R.clone().sub(o),q=k.clone().sub(o);if(O.lengthSq()>1e-4&&q.lengthSq()>1e-4){const H=O.angleTo(q);N=Math.min(vM,Math.max(N,pt.radToDeg(H)*1.7))}}else o.copy(R).add(b),o.z=Math.max(wf*c,o.z),l.copy(R);h.camera.position.lerp(o,Hs),h.camera.up.lerp(as,Hs).normalize(),p.target.lerp(l,Hs),h.camera.fov=pt.lerp(h.camera.fov,N,Hs),h.camera.updateProjectionMatrix(),h.camera.lookAt(p.target)}const IM=1,NM=2.25,so="free",Tf=3.2;function ji(n){return typeof n=="number"&&Number.isFinite(n)?n:void 0}function gc(n){if(!n)return null;const e={},t=ji(n.fov),i=ji(n.height),s=ji(n.pitch),a=ji(n.distance),r=ji(n.stiffness),o=ji(n.swivelSpeed),l=ji(n.transitionSpeed);return t!==void 0&&(e.fov=t),i!==void 0&&(e.height=i),s!==void 0&&(e.pitch=s),a!==void 0&&(e.distance=a),r!==void 0&&(e.stiffness=r),o!==void 0&&(e.swivelSpeed=o),l!==void 0&&(e.transitionSpeed=l),e}function DM(n){return!!n?.position&&n?.isPresent!==!1}class UM extends EventTarget{container;replay;options;sceneState;beforeRenderCallbacks=[];plugins=[];fieldScale;desiredCameraPosition=new L;desiredLookTarget=new L;boundWindowResize=()=>this.sceneState.resize();liveGameState;kickoffGameState;timelineSegmentsCacheKey=null;timelineSegmentsCache=[];timelineDurationCache=0;resizeObserver=null;animationFrameId=null;disposed=!1;playing=!1;speed=1;currentTime=0;playbackStartedAt=0;playbackStartedTime=0;cameraDistanceScale;customCameraSettings;cameraViewMode;freeCameraTransition=null;attachedPlayerId;ballCamEnabled;boostMeterEnabled;boostPickupAnimationEnabled;skipPostGoalTransitionsEnabled;skipKickoffsEnabled;constructor(e,t,i={}){super(),this.container=e,this.replay=t,this.options=i,this.fieldScale=i.fieldScale??IM,this.sceneState=tM(e,t,this.fieldScale),this.liveGameState=iM(t),this.kickoffGameState=sM(t,this.liveGameState),this.speed=Math.max(.1,i.initialPlaybackRate??1),this.cameraDistanceScale=Math.max(.25,i.initialCameraDistanceScale??NM),this.customCameraSettings=gc(i.initialCustomCameraSettings),this.attachedPlayerId=i.initialAttachedPlayerId??null,this.cameraViewMode=i.initialCameraViewMode??(this.attachedPlayerId?"follow":so),this.ballCamEnabled=i.initialBallCamEnabled??!1,this.boostMeterEnabled=i.initialBoostMeterEnabled??!1,this.boostPickupAnimationEnabled=i.initialBoostPickupAnimationEnabled??!0,this.skipPostGoalTransitionsEnabled=i.initialSkipPostGoalTransitionsEnabled??!0,this.skipKickoffsEnabled=i.initialSkipKickoffsEnabled??!1,this.skipPostGoalTransitionIfNeeded(),this.skipPastKickoffIfNeeded(),this.installResizeHandling();for(const s of i.plugins??[])this.installPlugin(s,!1);this.render(),this.scheduleAnimationFrame(),this.emitChange(),i.autoplay&&this.play()}play(){this.playing||(this.playing=!0,this.reanchorPlaybackClock(),this.emitChange())}pause(){this.playing&&(this.syncPlaybackClock(),this.playing=!1,this.emitChange())}togglePlayback(){this.playing?this.pause():this.play()}setPlaybackRate(e){this.playing&&this.syncPlaybackClock(),this.speed=Math.max(.1,e),this.playing&&this.reanchorPlaybackClock(),this.emitChange()}setCameraDistanceScale(e){this.cameraDistanceScale=Math.max(.25,e),this.render(),this.emitChange()}setCustomCameraSettings(e){this.customCameraSettings=gc(e),this.render(),this.emitChange()}setAttachedPlayer(e){this.attachedPlayerId=e,this.cameraViewMode=e?"follow":so,this.freeCameraTransition=null,this.render(),this.emitChange()}setCameraViewMode(e){this.cameraViewMode=e,this.freeCameraTransition=null,this.render(),this.emitChange()}setFreeCameraPreset(e){const{fov:t,position:i,target:s,up:a}=CM(e,this.fieldScale);this.cameraViewMode=so,this.freeCameraTransition={position:i,target:s,up:a,fov:t},this.render(),this.emitChange()}setBallCamEnabled(e){this.ballCamEnabled=e,this.render(),this.emitChange()}setBoostMeterEnabled(e){if(this.boostMeterEnabled=e,!e)for(const t of this.sceneState.playerBoostMeters.values())t.group.visible=!1;this.render(),this.emitChange()}setBoostPickupAnimationEnabled(e){this.boostPickupAnimationEnabled=e,this.render(),this.emitChange()}setSkipPostGoalTransitionsEnabled(e){this.skipPostGoalTransitionsEnabled=e,e&&this.skipPostGoalTransitionIfNeeded(),this.render(),this.emitChange()}setSkipKickoffsEnabled(e){this.skipKickoffsEnabled=e,e&&(this.skipPostGoalTransitionIfNeeded(),this.skipPastKickoffIfNeeded()),this.render(),this.emitChange()}seek(e){this.currentTime=this.clampReplayTime(e),this.skipPostGoalTransitionIfNeeded(),this.skipPastKickoffIfNeeded(),this.playing&&this.reanchorPlaybackClock(),this.render(),this.emitChange()}setFrameIndex(e){const t=nM(this.replay,e),i=this.replay.frames[t]?.time??0,s=this.playing,a=this.currentTime!==i||s;this.playing=!1,this.currentTime=i,this.render(),a&&this.emitChange()}stepFrames(e){if(!Number.isFinite(e)||this.replay.frames.length===0)return;const t=Da(this.replay,this.currentTime);this.setFrameIndex(t+Math.trunc(e))}stepForwardFrame(){this.stepFrames(1)}stepBackwardFrame(){this.stepFrames(-1)}setState(e){const t=performance.now();if(e.speed!==void 0&&(this.playing&&this.syncPlaybackClock(t),this.speed=Math.max(.1,e.speed)),e.cameraDistanceScale!==void 0&&(this.cameraDistanceScale=Math.max(.25,e.cameraDistanceScale)),e.customCameraSettings!==void 0&&(this.customCameraSettings=gc(e.customCameraSettings)),e.cameraViewMode!==void 0&&(this.cameraViewMode=e.cameraViewMode),e.attachedPlayerId!==void 0&&(this.attachedPlayerId=e.attachedPlayerId,e.cameraViewMode===void 0&&(this.cameraViewMode=this.attachedPlayerId?"follow":so)),e.ballCamEnabled!==void 0&&(this.ballCamEnabled=e.ballCamEnabled),e.boostMeterEnabled!==void 0&&(this.boostMeterEnabled=e.boostMeterEnabled,!this.boostMeterEnabled))for(const i of this.sceneState.playerBoostMeters.values())i.group.visible=!1;e.boostPickupAnimationEnabled!==void 0&&(this.boostPickupAnimationEnabled=e.boostPickupAnimationEnabled),e.skipPostGoalTransitionsEnabled!==void 0&&(this.skipPostGoalTransitionsEnabled=e.skipPostGoalTransitionsEnabled),e.skipKickoffsEnabled!==void 0&&(this.skipKickoffsEnabled=e.skipKickoffsEnabled),e.currentTime!==void 0&&(this.currentTime=this.clampReplayTime(e.currentTime)),e.playing!==void 0&&e.playing!==this.playing&&(e.playing?this.playing=!0:(e.currentTime===void 0&&this.syncPlaybackClock(t),this.playing=!1)),this.playing&&this.reanchorPlaybackClock(t),this.skipPostGoalTransitionIfNeeded(t),this.skipPastKickoffIfNeeded(t),this.render(),this.emitChange()}getState(){const e=Da(this.replay,this.currentTime);return{currentTime:this.currentTime,duration:this.replay.duration,frameIndex:e,activeMetadata:this.getActiveMetadata(e,this.currentTime),playing:this.playing,speed:this.speed,cameraDistanceScale:this.cameraDistanceScale,customCameraSettings:this.customCameraSettings,cameraViewMode:this.cameraViewMode,attachedPlayerId:this.attachedPlayerId,ballCamEnabled:this.ballCamEnabled,boostMeterEnabled:this.boostMeterEnabled,boostPickupAnimationEnabled:this.boostPickupAnimationEnabled,skipPostGoalTransitionsEnabled:this.skipPostGoalTransitionsEnabled,skipKickoffsEnabled:this.skipKickoffsEnabled}}getSnapshot(){return this.getState()}getTimelineDuration(){return this.getTimelineSegments().length===0?this.replay.duration:this.timelineDurationCache}getTimelineCurrentTime(){return this.projectReplayTimeToTimeline(this.currentTime).timelineTime}getTimelineSegments(){const e=`${this.skipPostGoalTransitionsEnabled}:${this.skipKickoffsEnabled}`;return this.timelineSegmentsCacheKey===e?this.timelineSegmentsCache:(this.timelineSegmentsCacheKey=e,this.timelineSegmentsCache=this.computeTimelineSegments(),this.timelineDurationCache=Math.max(0,this.replay.duration-this.timelineSegmentsCache.reduce((t,i)=>t+(i.endTime-i.startTime),0)),this.timelineSegmentsCache)}projectReplayTimeToTimeline(e){return lM(this.replay.duration,this.getTimelineSegments(),e)}projectTimelineTimeToReplay(e){return cM(this.replay.duration,this.getTimelineDuration(),this.getTimelineSegments(),e)}clampReplayTime(e){return pt.clamp(e,0,this.replay.duration)}getPlaybackEndTime(){return uM(this.replay.duration,this.getTimelineSegments())}subscribe(e){const t=i=>{e(i.detail)};return this.addEventListener("change",t),e(this.getState()),()=>{this.removeEventListener("change",t)}}onBeforeRender(e){return this.beforeRenderCallbacks.push(e),()=>{const t=this.beforeRenderCallbacks.indexOf(e);t>=0&&this.beforeRenderCallbacks.splice(t,1)}}addPlugin(e){return this.installPlugin(e,!0)}removePlugin(e){const t=this.plugins.findIndex(s=>s.plugin.id===e);if(t<0)return!1;const[i]=this.plugins.splice(t,1);return i.plugin.teardown?.(this.createPluginContext()),this.render(),!0}getPlugins(){return this.plugins.map(e=>e.plugin)}destroy(){for(this.playing&&this.pause(),this.disposed=!0,this.animationFrameId!==null&&(cancelAnimationFrame(this.animationFrameId),this.animationFrameId=null),this.resizeObserver?(this.resizeObserver.disconnect(),this.resizeObserver=null):window.removeEventListener("resize",this.boundWindowResize);this.plugins.length>0;)this.plugins.pop()?.plugin.teardown?.(this.createPluginContext());this.sceneState.dispose()}dispose(){this.destroy()}installResizeHandling(){if(typeof ResizeObserver<"u"){this.resizeObserver=new ResizeObserver(()=>{this.sceneState.resize()}),this.resizeObserver.observe(this.container);return}window.addEventListener("resize",this.boundWindowResize)}scheduleAnimationFrame(){this.animationFrameId!==null||this.disposed||(this.animationFrameId=requestAnimationFrame(this.tick))}reanchorPlaybackClock(e=performance.now()){this.playbackStartedAt=e,this.playbackStartedTime=this.currentTime}syncPlaybackClock(e=performance.now()){if(!this.playing)return!1;const t=(e-this.playbackStartedAt)/1e3,i=pt.clamp(this.playbackStartedTime+t*this.speed,0,this.getPlaybackEndTime()),s=i!==this.currentTime;return this.currentTime=i,s}tick=e=>{if(this.animationFrameId=null,this.disposed)return;let t=!1;this.playing&&(t=this.syncPlaybackClock(e),t=this.skipPostGoalTransitionIfNeeded(e)||t,t=this.skipPastKickoffIfNeeded(e)||t,this.currentTime>=this.getPlaybackEndTime()&&(this.playing=!1,t=!0)),this.render(),t&&this.emitChange(),this.scheduleAnimationFrame()};render(){const e=hM(this.replay,this.currentTime),t=e.frameIndex,i=this.replay.ballFrames[t]??null,s=this.replay.ballFrames[e.nextFrameIndex]??i,a=Mf(i?.position??null,s?.position??null,e.alpha),r=a?Zm(a,this.fieldScale):null,o=[];a?(this.sceneState.ballMesh.visible=!0,this.sceneState.ballMesh.position.copy(pc(a)),i?.rotation?this.sceneState.ballMesh.quaternion.set(i.rotation.x,i.rotation.y,i.rotation.z,i.rotation.w):this.sceneState.ballMesh.quaternion.identity()):this.sceneState.ballMesh.visible=!1;for(const[u,d]of this.replay.players.entries()){const h=this.sceneState.playerMeshes.get(d.id),p=this.sceneState.playerBoostTrails.get(d.id),g=this.sceneState.playerBoostMeters.get(d.id),_=this.sceneState.playerDemoIndicators.get(d.id),m=d.frames[t]??null,f=d.frames[e.nextFrameIndex]??m;let w=null,x=null,y=0;if(!h){_&&(_.group.visible=!1),o.push({track:d,mesh:null,boostTrail:p??null,frame:m,nextFrame:f,interpolatedPosition:x,boostFraction:y});continue}if(w=Mf(m?.position??null,f?.position??null,e.alpha),!w){h.visible=!1,p&&(p.visible=!1),g&&(g.group.visible=!1),_&&(_.group.visible=!1),o.push({track:d,mesh:h,boostTrail:p??null,frame:m,nextFrame:f,interpolatedPosition:x,boostFraction:y});continue}if(!DM(m)){h.visible=!1,p&&(p.visible=!1),g&&(g.group.visible=!1),this.updateDemoIndicator(d.id,_??null,w),o.push({track:d,mesh:h,boostTrail:p??null,frame:m,nextFrame:f,interpolatedPosition:x,boostFraction:y});continue}h.visible=!0,_&&(_.group.visible=!1),x=w,h.position.copy(pc(w)),m?.rotation?h.quaternion.set(m.rotation.x,m.rotation.y,m.rotation.z,m.rotation.w):h.quaternion.identity();const M=m?.boostFraction??0,T=f?.boostFraction??M;if(y=pt.lerp(M,T,e.alpha),p){const A=(e.alpha>=.5?f?.boostActive:m?.boostActive)??m?.boostActive??f?.boostActive??!1;this.updateBoostTrail(p,A,y,this.currentTime,u)}g&&(this.boostMeterEnabled?(g.group.visible=!0,JE(g,y,pt.lerp(m?.boostAmount??0,f?.boostAmount??m?.boostAmount??0,e.alpha),this.sceneState.camera)):g.group.visible=!1),o.push({track:d,mesh:h,boostTrail:p??null,frame:m,nextFrame:f,interpolatedPosition:x,boostFraction:y})}LM({sceneState:this.sceneState,replay:this.replay,fieldScale:this.fieldScale,cameraViewMode:this.cameraViewMode,attachedPlayerId:this.attachedPlayerId,ballCamEnabled:this.ballCamEnabled,cameraDistanceScale:this.cameraDistanceScale,customCameraSettings:this.customCameraSettings,frameIndex:t,ballPosition:r,desiredCameraPosition:this.desiredCameraPosition,desiredLookTarget:this.desiredLookTarget}),this.cameraViewMode==="free"&&this.freeCameraTransition&&RM({sceneState:this.sceneState,...this.freeCameraTransition})&&(this.freeCameraTransition=null),this.sceneState.controls.update(),this.sceneState.updateWallVisibility();const l={frameIndex:e.frameIndex,nextFrameIndex:e.nextFrameIndex,alpha:e.alpha,currentTime:this.currentTime};for(const u of this.beforeRenderCallbacks)u(l);const c=this.createRenderContext(l,i,s,r,o);for(const u of this.plugins)u.plugin.beforeRender?.(c);this.sceneState.renderer.render(this.sceneState.scene,this.sceneState.camera)}skipPastKickoffIfNeeded(e){if(!this.skipKickoffsEnabled)return!1;const t=Da(this.replay,this.currentTime),i=this.replay.frames[t];if(!i||!Ud(i,this.kickoffGameState))return!1;const s=this.replay.frames.find((a,r)=>r>t&&qm(a,this.liveGameState));return!s||s.time===this.currentTime?!1:(this.currentTime=s.time,this.playing&&this.reanchorPlaybackClock(e),!0)}skipPostGoalTransitionIfNeeded(e){if(!this.skipPostGoalTransitionsEnabled)return!1;const t=Da(this.replay,this.currentTime),i=this.replay.frames[t];if(!i||!xo(this.replay,i,t,this.liveGameState,this.kickoffGameState))return!1;const s=this.replay.frames.find((a,r)=>r>t&&!xo(this.replay,a,r,this.liveGameState,this.kickoffGameState));if(!s){let a=t;for(;a>0&&xo(this.replay,this.replay.frames[a-1],a-1,this.liveGameState,this.kickoffGameState);)a-=1;const r=this.replay.frames[a]?.time;return r===void 0||r===this.currentTime?!1:(this.currentTime=r,this.playing&&this.reanchorPlaybackClock(e),!0)}return s.time===this.currentTime?!1:(this.currentTime=s.time,this.playing&&this.reanchorPlaybackClock(e),!0)}getActiveMetadata(e,t){return dM(this.replay,e,t)}computeTimelineSegments(){return oM(this.replay,this.skipPostGoalTransitionsEnabled,this.skipKickoffsEnabled,this.liveGameState,this.kickoffGameState)}installPlugin(e,t){const i=typeof e=="function"?e():e;if(this.plugins.some(a=>a.plugin.id===i.id))throw new Error(`Replay player plugin "${i.id}" is already installed`);const s={definition:e,plugin:i};return this.plugins.push(s),i.setup?.(this.createPluginContext()),i.onStateChange?.(this.createPluginStateContext(this.getState())),t&&this.render(),()=>{const a=this.plugins.indexOf(s);a<0||(this.plugins.splice(a,1),i.teardown?.(this.createPluginContext()),this.render())}}createPluginContext(){return{player:this,replay:this.replay,scene:this.sceneState,container:this.container,options:this.options}}createPluginStateContext(e){return{...this.createPluginContext(),state:e}}createRenderContext(e,t,i,s,a){return{...this.createPluginStateContext(this.getState()),...e,frame:this.replay.frames[e.frameIndex]??null,nextFrame:this.replay.frames[e.nextFrameIndex]??null,ballFrame:t,nextBallFrame:i,ballPosition:s,players:a}}emitChange(){const e=this.getState(),t=this.createPluginStateContext(e);for(const i of this.plugins)i.plugin.onStateChange?.(t);this.dispatchEvent(new CustomEvent("change",{detail:e}))}getActiveDemoEvent(e,t){for(let i=this.replay.timelineEvents.length-1;i>=0;i-=1){const s=this.replay.timelineEvents[i],a=t-s.time;if(!(a<0)){if(a>Tf)break;if(s.kind==="demo"&&s.secondaryPlayerId===e)return s}}return null}updateDemoIndicator(e,t,i){if(!t)return;const s=this.getActiveDemoEvent(e,this.currentTime),a=s?.location??i;if(!s||!a){t.group.visible=!1;return}const r=Math.max(0,this.currentTime-s.time),o=this.currentTime*8,l=1+.08*Math.sin(o);t.group.visible=!0,t.group.position.copy(pc(a)),t.ring.rotation.z=o*.15,t.ring.scale.setScalar(l),t.label.quaternion.copy(this.sceneState.camera.quaternion),t.label.scale.setScalar(1+.04*Math.sin(o+1.3));const c=pt.clamp(1-r/Tf,.28,1);for(const u of[t.ring,t.label]){const d=u.material;d instanceof mi&&(d.opacity=c)}}updateBoostTrail(e,t,i,s,a){if(!t){e.visible=!1;return}e.visible=!0;const r=s*36+a*1.7,o=.86+.14*Math.sin(r),l=pt.clamp(.62+i*.88,.62,1.5),c=l*(1.02+o*.52),u=1.02+l*.28;e.scale.set(c,u,u);for(const[d,h]of e.children.entries()){const p=h,g=.92+.14*Math.sin(r+d*.85);p.scale.setScalar(g),p.traverse(_=>{if(!(_ instanceof ze))return;const m=_.material;if(m instanceof rt)switch(_.name){case"outer-flame":m.opacity=.24+l*.24;break;case"inner-flame":m.opacity=.58+l*.3;break;case"glow":m.opacity=.4+l*.26;break}})}}}const FM="https://ballchasing.com",OM=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;function kM(n,e){const i=(e instanceof URL?e.href:e).replace(/\/+$/,"");return new URL(`${i}/${n.replace(/^\/+/,"")}`)}function Af(n){return OM.test(n.trim())}function Fd(n){const e=n.trim();if(Af(e))return e.toLowerCase();let t;try{t=new URL(e)}catch{throw new Error(`Invalid Ballchasing replay id: ${n}`)}if(!/(^|\.)ballchasing\.com$/i.test(t.hostname))throw new Error(`Invalid Ballchasing replay URL: ${n}`);const i=t.pathname.split("/").filter(Boolean),s=i.findIndex(o=>o==="replay"),a=i.findIndex(o=>o==="replays"),r=s>=0?i[s+1]:a>=0?i[a+1]:void 0;if(!r||!Af(r))throw new Error(`Invalid Ballchasing replay URL: ${n}`);return r.toLowerCase()}function BM(n){return`ballchasing-${Fd(n)}.replay`}function zM(n,e=FM){const t=Fd(n);return kM(`dl/replay/${encodeURIComponent(t)}`,e)}const Cf="subtr-actor-ballchasing-overlay-styles",HM="#3b82f6",VM="#f59e0b";function GM(){if(document.getElementById(Cf))return;const n=document.createElement("style");n.id=Cf,n.textContent=`
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
      right: calc(50% + 0.35rem);
      flex-direction: row;
      justify-content: flex-end;
      border-bottom: 2px solid ${HM};
    }

    .sap-bc-team-hud-orange {
      left: calc(50% + 0.35rem);
      flex-direction: row;
      justify-content: flex-start;
      border-bottom: 2px solid ${VM};
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
  `,document.head.append(n)}function $M(n,e){const t=n.players[e],i=t.frame?.boostAmount??0,s=t.nextFrame?.boostAmount??i;return pt.lerp(i,s,n.alpha)}function Rf(n,e,t,i){if(!n||!e)return;const s=Math.max(0,Math.min(100,Math.round(t/255*100)));n.style.width=`${s}%`,e.textContent=`${s} ${i}`}function Pf(n,e,t,i){if(!n)return;const s=()=>{e.player.setAttachedPlayer(t)};n.classList.add("sap-bc-player-selectable"),n.tabIndex=0,n.setAttribute("role","button"),n.setAttribute("aria-label",`Follow ${i}`),n.title=`Follow ${i}`,n.addEventListener("click",s),n.addEventListener("keydown",a=>{a.key!=="Enter"&&a.key!==" "||(a.preventDefault(),s())})}function WM(n,e,t,i,s){if(n.getWorldPosition(s),s.add(e),s.project(t),s.z<-1||s.z>1)return!1;const a=i.clientWidth||1,r=i.clientHeight||1;return s.x=(s.x+1)*a/2,s.y=(1-s.y)*r/2,!(s.x<-80||s.x>a+80||s.y<-80||s.y>r+80)}function XM(n={}){const e=n.showFloatingNames??!0,t=n.showFloatingBoostBars??!0,i=n.showTeamBoostHud??!0;let s=null,a=null,r=null,o=null,l=!1,c="";const u=new Map,d=new L,h=new L(0,0,255);function p(_){for(const[m,f]of u.entries()){const w=m===_;f.floatingRoot?.classList.toggle("sap-bc-player-following",w),f.teamHudEntry?.classList.toggle("sap-bc-player-following",w),f.floatingRoot?.setAttribute("aria-pressed",w?"true":"false"),f.teamHudEntry?.setAttribute("aria-pressed",w?"true":"false")}}function g(_,m){GM(),getComputedStyle(m).position==="static"&&(l=!0,c=m.style.position,m.style.position="relative"),s=document.createElement("div"),s.className="sap-bc-overlay-root",e||t?(a=document.createElement("div"),a.className="sap-bc-floating-layer",s.append(a)):a=null,i?(r=document.createElement("div"),r.className="sap-bc-team-hud sap-bc-team-hud-blue",o=document.createElement("div"),o.className="sap-bc-team-hud sap-bc-team-hud-orange",s.append(r,o)):(r=null,o=null);for(const f of _.replay.players){let w=null,x=null,y=null,C=null;a&&(w=document.createElement("div"),w.className="sap-bc-floating-track",w.hidden=!0,(e||t)&&(x=document.createElement("div"),x.className=`sap-bc-boost-bar ${f.isTeamZero?"sap-bc-boost-bar-blue":"sap-bc-boost-bar-orange"}`,y=document.createElement("div"),y.className=`sap-bc-boost-fill ${f.isTeamZero?"sap-bc-boost-fill-blue":"sap-bc-boost-fill-orange"}`,C=document.createElement("span"),C.className="sap-bc-boost-text",x.append(y,C),w.append(x)),Pf(w,_,f.id,f.name),a.append(w));let M=null,T=null,A=null;if(i){M=document.createElement("div"),M.className="sap-bc-hud-player";const v=document.createElement("div");v.className=`sap-bc-hud-boost-bar ${f.isTeamZero?"sap-bc-boost-bar-blue":"sap-bc-boost-bar-orange"}`,T=document.createElement("div"),T.className=`sap-bc-hud-boost-fill ${f.isTeamZero?"sap-bc-boost-fill-blue":"sap-bc-boost-fill-orange"}`,A=document.createElement("span"),A.className="sap-bc-hud-boost-text",v.append(T,A),M.append(v),Pf(M,_,f.id,f.name),(f.isTeamZero?r:o)?.append(M)}u.set(f.id,{floatingRoot:w,floatingBoostFill:y,floatingBoostText:C,teamHudEntry:M,teamHudFill:T,teamHudText:A})}h.set(0,0,255*(_.options.fieldScale??1)),m.append(s),p(_.player.getState().attachedPlayerId)}return{id:"ballchasing-overlay",setup(_){g(_,_.container)},onStateChange(_){p(_.state.attachedPlayerId)},teardown(_){s?.remove(),s=null,a=null,r=null,o=null,u.clear(),l&&(_.container.style.position=c,l=!1)},beforeRender(_){if(s)for(const[m,f]of _.players.entries()){const w=u.get(f.track.id);if(!w)continue;const x=$M(_,m);Rf(w.floatingBoostFill,w.floatingBoostText,x,f.track.name),Rf(w.teamHudFill,w.teamHudText,x,f.track.name);const y=f.mesh,C=y!==null&&f.interpolatedPosition!==null;if(w.teamHudEntry?.classList.toggle("sap-bc-hud-player-inactive",!C),!!w.floatingRoot){if(!C||!WM(y,h,_.scene.camera,_.container,d)){w.floatingRoot.hidden=!0;continue}w.floatingRoot.hidden=!1,w.floatingRoot.style.transform=`translate(${d.x.toFixed(1)}px, ${d.y.toFixed(1)}px) translate(-50%, -100%)`}}}}}function _c(n){n.depthTest=!1,n.depthWrite=!1,n.transparent=!0,n.polygonOffset=!0,n.polygonOffsetFactor=-2,n.polygonOffsetUnits=-2,n.forceSinglePass=!0}const Qs=6,qM=.6;function Sr(n){return n*qM}function YM(n){return Sr(n.size==="big"?150:92)}function Km(n){return Sr(n.size==="big"?155:46)}function ZM(n){return Sr(n.size==="big"?34:14)}function jm(n){return Qs+ZM(n)+Km(n)}function Jm(n){return n.size==="big"?jm(n):Qs+Sr(1.2)}function Qm(n){return n.size==="big"?jm(n):Qs+Sr(.8)}function KM(n){return n.size==="big"?16096779:16436245}function jM(n){const e=YM(n),t=KM(n),i=Km(n),s=n.size==="big",a=new gt;a.position.set(n.position.x,n.position.y,n.position.z),a.renderOrder=20,a.frustumCulled=!1;const r=new ze(new ys(e*.72,e,24),new rt({color:t,transparent:!0,opacity:.92,side:Je,depthWrite:!1}));_c(r.material),r.position.z=Qs,r.renderOrder=20,r.frustumCulled=!1,a.add(r);const o=new ze(new Ws(e*.58,24),new rt({color:t,transparent:!0,opacity:.3,side:Je,depthWrite:!1}));_c(o.material),o.position.z=Qs+.5,o.renderOrder=21,o.frustumCulled=!1,a.add(o);const l=new ze(new Ws(e*.42,20),new rt({color:16777215,transparent:!0,opacity:.22,side:Je,depthWrite:!1}));_c(l.material),l.position.z=Qs+1,l.renderOrder=22,l.frustumCulled=!1,a.add(l);const c=new ze(s?new ca(i,32,18):new Ws(i*.9,24),s?new Go({color:t,emissive:new Ze(t),emissiveIntensity:.6,shininess:88,specular:new Ze(16773826),transparent:!0,opacity:.92,depthWrite:!1}):new rt({color:t,transparent:!0,opacity:.88,side:Je,blending:Pi,depthWrite:!1}));c.position.z=Jm(n),c.renderOrder=23,c.frustumCulled=!1,a.add(c);const u=new ze(s?new ca(i*1.36,32,14):new Ws(i*1.35,28),new rt({color:t,transparent:!0,opacity:s?.2:.16,side:Je,blending:Pi,depthWrite:!1}));return u.position.z=Qm(n),u.renderOrder=24,u.frustumCulled=!1,a.add(u),{group:a,ring:r,core:o,cooldown:l,orb:c,glow:u}}function JM(n,e){let t=-1;for(let a=0;a<n.events.length&&!(n.events[a].time>e);a+=1)t=a;if(t<0)return{available:!0,progress:1};const i=n.events[t];if(i.available)return{available:!0,progress:1};const s=n.events.slice(t+1).find(a=>a.available);return!s||s.time<=i.time?{available:!1,progress:0}:{available:!1,progress:pt.clamp((e-i.time)/(s.time-i.time),0,1)}}function QM(n,e,t,i){const{available:s,progress:a}=JM(e,t),r=e.size==="big",o=.92+.08*Math.sin(t*6+e.index*.45),l=.96+.04*Math.sin(t*(r?4.8:7.2)+e.index*.37),c=r?Math.sin(t*2.2+e.index*.61)*18:0,u=Jm(e)+c,d=Qm(e)+c;if(n.orb.position.z=u,n.glow.position.z=d,n.orb.rotation.z=t*(r?.9:1.25),n.glow.rotation.z=-t*.45,s){n.group.visible=!0,n.ring.material.opacity=.95,n.core.material.opacity=r?.56:.5,n.cooldown.visible=!1,n.ring.scale.setScalar(o),n.core.scale.setScalar(1),n.orb.visible=!0,n.glow.visible=!0,n.orb.material.opacity=r?.96:.9,n.glow.material.opacity=(r?.2:.16)+(l-.96),n.orb.scale.setScalar(l),n.glow.scale.setScalar(r?1.02+(l-.96)*2:1);return}if(n.group.visible=!0,n.ring.material.opacity=.18,n.core.material.opacity=.07,n.ring.scale.setScalar(1),n.core.scale.setScalar(1),n.orb.visible=!1,n.glow.visible=!1,n.cooldown.visible=i,i){const h=.3+a*.7;n.cooldown.scale.setScalar(h),n.cooldown.material.opacity=.16+a*.2}}function eT(n={}){const e=n.showCooldownProgress??!0;let t=null;const i=new Map;function s(r){t=new gt,t.name="boost-pad-overlay",t.renderOrder=20,t.frustumCulled=!1;for(const o of r.replay.boostPads){const l=jM(o);t.add(l.group),i.set(o.index,l)}r.scene.replayRoot.add(t)}function a(r){for(const o of r.replay.boostPads){const l=i.get(o.index);l&&QM(l,o,r.state.currentTime,e)}}return{id:"boost-pad-overlay",setup(r){s(r),a({...r,state:r.player.getState()})},onStateChange(r){a(r)},teardown(){t?.removeFromParent(),t=null,i.clear()}}}const tT=1.35,nT="#57a8ff",iT="#ff9c40",sT=256,aT=160,rT=360,oT=225,lT=260,cT=430,eg=18,Lf=120;function uT(n){return n?nT:iT}function dT(n){return n.events.filter(e=>!e.available&&e.playerId)}function tg(n,e){const t=document.createElement("canvas");t.width=sT,t.height=aT;const i=t.getContext("2d");if(!i)throw new Error("Unable to create boost pickup count canvas");i.clearRect(0,0,t.width,t.height),i.textAlign="center",i.textBaseline="middle",i.lineJoin="round",i.font="800 124px sans-serif",i.lineWidth=18,i.strokeStyle="rgba(4, 10, 18, 0.88)",i.strokeText(`${n}`,t.width/2,t.height/2),i.fillStyle=e,i.fillText(`${n}`,t.width/2,t.height/2);const s=new dl(t);return s.colorSpace=Wt,s.needsUpdate=!0,s}function hT(n){n?.dispose()}function fT(n){const e=new gt;e.visible=!1,e.renderOrder=60,e.frustumCulled=!1;const t=tg(1,n),i=new Mm({map:t,transparent:!0,depthTest:!1,depthWrite:!1}),s=new Am(i);s.scale.set(rT,oT,1),s.renderOrder=62,s.frustumCulled=!1,e.add(s);const a=new rt({color:n,transparent:!0,opacity:0,side:Je,depthTest:!1,depthWrite:!1,blending:Pi}),r=new ze(new ys(Lf*.72,Lf,36),a);return r.position.z=eg,r.renderOrder=61,r.frustumCulled=!1,e.add(r),{group:e,textMaterial:i,ringMaterial:a}}function pT(n,e){n.currentCount!==e&&(hT(n.textMaterial.map),n.textMaterial.map=tg(e,n.color),n.textMaterial.needsUpdate=!0,n.currentCount=e)}function mT(n){const e=new Map;for(const s of n.replay.players)e.set(s.id,s);const t=[];for(const s of n.replay.boostPads)for(const a of dT(s))t.push({pad:s,event:a});t.sort((s,a)=>s.event.time!==a.event.time?s.event.time-a.event.time:s.event.frame!==a.event.frame?s.event.frame-a.event.frame:s.pad.index-a.pad.index);const i=[];for(const{pad:s,event:a}of t){if(!a.playerId)continue;const r=e.get(a.playerId);if(!r)continue;const o=uT(r.isTeamZero),{group:l,textMaterial:c,ringMaterial:u}=fT(o);l.position.copy(s.position),n.scene.replayRoot.add(l),i.push({time:a.time,pad:s,event:a,player:r,color:o,currentCount:1,position:new L(s.position.x,s.position.y,s.position.z),size:s.size,group:l,textMaterial:c,ringMaterial:u})}return i}function gT(n,e,t){const i=pt.clamp(e/t,0,1),s=1-Math.pow(1-i,3),a=i*i,r=n.size==="big"?cT:lT,o=n.size==="big"?360:280,l=1+Math.sin(i*Math.PI)*.22;n.group.visible=!0,n.group.position.set(n.position.x,n.position.y,n.position.z+r+s*o),n.group.scale.setScalar(l),n.textMaterial.opacity=Math.max(0,1-a),n.ringMaterial.opacity=Math.max(0,.48*(1-i));const c=n.group.children[1];if(c){const u=.75+s*(n.size==="big"?2.8:1.85);c.scale.setScalar(u),c.position.z=eg-r-s*o}}function _T(n={}){const e=Math.max(.1,n.durationSeconds??tT);let t=[];function i(a){return n.includePickup?.({pad:a.pad,event:a.event,player:a.player})??!0}function s(){for(const a of t)a.group.visible=!1}return{id:"boost-pickup-animation",setup(a){t=mT(a)},beforeRender(a){if(!a.state.boostPickupAnimationEnabled){s();return}const r=a.currentTime-e,o=new Map;for(const l of t){if(l.time>a.currentTime){l.group.visible=!1;continue}if(!i(l)){l.group.visible=!1;continue}const c=(o.get(l.player.id)??0)+1;if(o.set(l.player.id,c),l.time<r){l.group.visible=!1;continue}pT(l,c),gT(l,a.currentTime-l.time,e)}},teardown(){for(const a of t)a.group.removeFromParent(),a.group.traverse(r=>{(r instanceof ze||r instanceof Am)&&r.geometry?.dispose()}),a.textMaterial.map?.dispose(),a.textMaterial.dispose(),a.ringMaterial.dispose();t=[]}}}const vT=60,yT=["video/webm;codecs=vp9","video/webm;codecs=vp8","video/webm"];function bT(n){if(n&&MediaRecorder.isTypeSupported(n))return n;for(const e of yT)if(MediaRecorder.isTypeSupported(e))return e;return""}function xT(n){return n instanceof Error?n.message:String(n)}function ST(n={}){let e=null,t=null,i=[],s=null,a=0,r=0,o="",l=0,c=null,u=null,d=null,h=null,p=!1,g=null;const _=new Set;function m(){return{state:t?t.state==="recording"?"recording":"stopping":c?"error":s?"ready":"idle",elapsedSeconds:r,mimeType:o,sizeBytes:l,error:c}}function f(){const M=m();n.onStatusChange?.(M);for(const T of _)T(M)}function w(){if(!e)throw new Error("Canvas recorder plugin is not installed");return e}function x(M){t=null,h=null,p=!1,s=M,l=M?.size??0,g&&e&&e.player.setState({currentTime:g.currentTime,speed:g.speed,playing:g.playing}),g=null,M&&n.onComplete?.(M),f(),d?.(M),d=null,u=null}function y(M){c=xT(M),t=null,h=null,p=!1,g=null,f(),d?.(null),d=null,u=null}const C={id:"canvas-recorder",setup(M){e=M},beforeRender(M){t?.state==="recording"&&(r=(performance.now()-a)/1e3,f()),t?.state==="recording"&&h!==null&&M.currentTime>=h&&C.stop()},onStateChange(M){p&&t?.state==="recording"&&!M.state.playing&&r>0&&C.stop()},teardown(){t?.state==="recording"&&t.stop(),e=null,t=null,h=null,p=!1,g=null,d?.(null),d=null,u=null,_.clear()},start(M={}){const T=w();if(t?.state==="recording")throw new Error("Canvas recording is already in progress");if(typeof MediaRecorder>"u")throw new Error("MediaRecorder is not available in this browser");const A=T.scene.renderer.domElement;if(!A.captureStream)throw new Error("Canvas captureStream is not available in this browser");c=null,s=null,i=[],l=0,r=0,a=performance.now(),o=bT(M.mimeType??n.mimeType);const v=Math.max(1,M.fps??n.fps??vT),b=A.captureStream(v);t=new MediaRecorder(b,{mimeType:o,videoBitsPerSecond:M.videoBitsPerSecond??n.videoBitsPerSecond}),u=new Promise(R=>{d=R}),t.addEventListener("dataavailable",R=>{R.data.size>0&&(i.push(R.data),l+=R.data.size,f())}),t.addEventListener("stop",()=>{b.getTracks().forEach(R=>R.stop()),x(new Blob(i,{type:o||"video/webm"}))},{once:!0}),t.addEventListener("error",R=>{b.getTracks().forEach(N=>N.stop()),y(R.error??R)},{once:!0}),t.start(1e3),f()},stop(){if(!t)return Promise.resolve(s);if(t.state==="inactive")return u??Promise.resolve(s);const M=u??new Promise(T=>{d=T});return t.stop(),f(),M},clear(){if(t?.state==="recording")throw new Error("Cannot clear a recording while recording is in progress");s=null,i=[],l=0,r=0,c=null,f()},getRecording(){return s},getStatus(){return m()},subscribe(M){return _.add(M),M(m()),()=>{_.delete(M)}},recordRange(M={}){const T=w(),A=T.player.getState();(M.restorePlaybackState??!0)&&(g=A);const v=M.playbackRate??A.speed,b=M.startTime??A.currentTime;h=M.endTime??A.duration,p=!0,T.player.setState({currentTime:b,speed:v,playing:!1}),C.start(M);const R=u;return T.player.play(),(R??Promise.resolve(null)).then(N=>{if(!N)throw new Error("Recording stopped without producing a video");return N})},recordFullReplay(M={}){return C.recordRange({...M,startTime:M.startTime??0,endTime:M.endTime??w().replay.duration})}};return C}const If="subtr-actor-timeline-overlay-styles",wT=new Set(["goal","save"]),ET=.2,MT=2,TT=4,AT=.01,Nf=.01;function CT(){if(document.getElementById(If))return;const n=document.createElement("style");n.id=If,n.textContent=`
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
      row-gap: 0.5rem;
      align-items: center;
    }

    .sap-tl-ranges {
      grid-column: 1 / -1;
      display: flex;
      flex-direction: column;
      gap: 0.34rem;
      margin-bottom: 0.58rem;
    }

    .sap-tl-event-lanes {
      grid-column: 1 / -1;
      display: flex;
      flex-direction: column;
      gap: 0.34rem;
      margin-bottom: 0.58rem;
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

    .sap-tl-range-playhead {
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

    .sap-tl-track-rail {
      position: relative;
      grid-column: 2;
      min-width: 0;
      min-height: var(--sap-tl-thumb-size);
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
  `,document.head.append(n)}function Cu(n){if(!Number.isFinite(n))return"--:--.--";const e=Math.max(0,n),t=Math.floor(e/60),i=Math.floor(e%60),s=Math.floor((e-Math.floor(e))*100);return`${t}:${String(i).padStart(2,"0")}.${String(s).padStart(2,"0")}`}function Df(n){switch(n.kind){case"goal":return 5;case"demo":return 4;case"save":return 3;case"assist":return 2;case"shot":return 1;default:return 0}}function RT(n){switch(n.kind){case"goal":case"goal-context":case"goal-tag":return TT;default:return MT}}function Od(n){return n.seekTime!==void 0&&Number.isFinite(n.seekTime)?Math.max(0,n.seekTime):Number.isFinite(n.time)?Math.max(0,n.time-RT(n)):0}function PT(n){if(n.color)return n.color;if(n.isTeamZero===!0)return"#3b82f6";if(n.isTeamZero===!1)return"#f59e0b";switch(n.kind){case"goal":return"#f5f7fa";case"demo":return"#ef4444";case"save":return"#34d399";case"assist":return"#c084fc";case"shot":return"#60a5fa";default:return"#d1d9e0"}}function LT(n){if(n.events.length>1)return`${n.events.length}`;const e=n.events[0];return e?e.shortLabel&&e.shortLabel.trim()!==""?e.shortLabel.slice(0,3).toUpperCase():e.kind.slice(0,1).toUpperCase():""}function IT(n){return n.events.map(e=>`${Cu(e.time)} ${e.label??e.kind}`).join(`
`)}function ng(n){const e=new Map;for(const t of n){const i=t.frame!==void 0?`frame:${t.frame}`:`time:${t.time.toFixed(2)}`,s=e.get(i);if(s){s.events.push(t);continue}e.set(i,{key:i,time:t.time,events:[t]})}return[...e.values()].map(t=>({...t,events:[...t.events].sort((i,s)=>{const a=Df(s)-Df(i);return a!==0?a:i.time-s.time})})).sort((t,i)=>t.time-i.time)}function ig(n,e){return n?typeof n=="function"?n(e):n:[]}function NT(n,e){const t=[];for(const i of n){const s=ig(i.source,e);s.length!==0&&t.push({key:i.key,label:i.label,buckets:ng(s)})}return t}function DT(n,e){return n?typeof n=="function"?n(e):n:[]}function UT(n,e){const t=new Set,i=[];for(const s of n)for(const a of DT(s,e)){const r=a.id;if(r!==void 0){if(t.has(r))continue;t.add(r)}i.push(a)}return i}function FT(n){const e=new Map;for(const t of n){const i=t.lane??"default",s=t.laneLabel??t.lane??"",a=e.get(i);if(a){a.ranges.push(t);continue}e.set(i,{key:i,label:s,ranges:[t]})}return[...e.values()].map(t=>({...t,ranges:[...t.ranges].sort((i,s)=>i.startTime-s.startTime)}))}function OT(n){return n.color?n.color:n.isTeamZero===!0?"#3b82f6":n.isTeamZero===!1?"#f59e0b":"#d1d9e0"}function kT(n,e){if(n.replayEvents)return ig(n.replayEvents,e);if(n.includeReplayEvents===!1)return[];const t=new Set(n.replayEventKinds??wT);return e.replay.timelineEvents.filter(i=>t.has(i.kind))}function BT(n,e){const t=e.player.projectReplayTimeToTimeline(Od(n));if(!t.hiddenBySkip)return t.seekTime;const i=Math.min(e.player.getTimelineDuration(),t.timelineTime+AT);return e.player.projectTimelineTimeToReplay(i)}function ao(n,e){return`${n/Math.max(e,1e-4)*100}%`}function zT(n,e,t){let i=n.timelineTime,s=e.timelineTime;return s<=i&&(n.hiddenBySkip||e.hiddenBySkip)&&(i>=t?(i=Math.max(0,t-Nf),s=t):s=Math.min(t,i+Nf)),{startTimelineTime:i,endTimelineTime:s}}function HT(n={}){const e=n.pauseWhileScrubbing??!0;let t=0;const i=n.events?[{key:"events:initial",label:n.eventsLabel??"Events",source:n.events}]:[],s=n.ranges?[n.ranges]:[];let a=null,r=null,o=null,l=null,c=null,u=null,d=null,h=null,p=null,g=null,_=null,m=null,f=!1,w="",x=!1,y=!1,C=null,M=[],T=[],A=null;const v=new Map,b=[],R=[];function N(){C&&(O(C),z({...C,state:C.player.getState()}))}function k(){C&&(q(C),z({...C,state:C.player.getState()}))}function z(X){if(!l||!c||!u||!d||!h||!p||!r)return;const Q=X.player.getTimelineCurrentTime(),ge=X.player.getTimelineDuration(),ve=[ge.toFixed(4),X.state.skipKickoffsEnabled?"1":"0",X.state.skipPostGoalTransitionsEnabled?"1":"0"].join(":");A!==ve&&(O(X),q(X),A=ve),l.min="0",l.max=`${ge}`,l.step="0.01",l.value=`${Math.min(Q,ge)}`,c.dataset.playing=X.state.playing?"true":"false",c.setAttribute("aria-label",X.state.playing?"Pause replay":"Play replay"),c.title=X.state.playing?"Pause replay":"Play replay",u.textContent=X.state.playing?"||":">",d.textContent=X.state.playing?"Pause":"Play",h.textContent=Cu(Q),p.textContent=`-${Cu(ge-Q)}`,r.dataset.scrubbing=x?"true":"false";for(const te of v.values()){const G=Q-te.timelineTime,Y=G>=0&&G<=ET;te.element.dataset.active=Y?"true":"false",te.element.dataset.passed=te.timelineTime<=Q?"true":"false"}for(const te of b){const G=Math.max(0,te.startTimelineTime),Y=Math.min(ge,te.endTimelineTime);if(Math.max(0,Y-G)<=1e-4){te.element.hidden=!0;continue}te.element.hidden=!1,te.element.dataset.active=Q>=G&&Q<=Y?"true":"false"}const Re=ao(Math.min(Q,ge),ge);for(const te of R)te.element.style.left=Re}function V(X,Q,ge){const ve=X.events[0];if(!ve)return null;const Re=Q.player.projectReplayTimeToTimeline(X.time),te=document.createElement("button");return te.type="button",te.className="sap-tl-marker",te.style.left=ao(Re.timelineTime,ge),te.style.color=PT(ve),te.title=IT(X),te.textContent=LT(X),te.addEventListener("click",()=>{Q.player.seek(BT(ve,Q))}),te.dataset.active="false",te.dataset.passed="false",v.set(X.key,{element:te,timelineTime:Re.timelineTime}),te}function O(X){if(!_||!g)return;_.replaceChildren(),g.replaceChildren(),v.clear();const Q=kT(n,X);M=[],Q.length>0&&M.push({key:"replay",label:n.replayEventsLabel??"Replay",buckets:ng(Q)}),M.push(...NT(i,X));const ge=Math.max(X.player.getTimelineDuration(),1e-4),ve=M[0];if(ve?.key==="replay")for(const te of ve.buckets){const G=V({...te,key:`${ve.key}:${te.key}`},X,ge);G&&_.append(G)}const Re=M.filter(te=>te.key!=="replay");g.hidden=Re.length===0;for(const te of Re){const G=document.createElement("div");G.className="sap-tl-event-lane",G.dataset.label=te.label;const Y=document.createElement("span");Y.className="sap-tl-event-lane-label",Y.textContent=te.label,Y.setAttribute("aria-label",te.label),G.append(Y);const le=document.createElement("div");le.className="sap-tl-event-lane-track";const Pe=document.createElement("div");Pe.className="sap-tl-markers";for(const ye of te.buckets){const Be=V({...ye,key:`${te.key}:${ye.key}`},X,ge);Be&&Pe.append(Be)}le.append(Pe),G.append(le),g.append(G)}}function q(X){if(!o)return;o.replaceChildren(),b.splice(0,b.length),R.splice(0,R.length);const Q=UT(s,X).filter(ve=>Number.isFinite(ve.startTime)&&Number.isFinite(ve.endTime)&&ve.endTime>ve.startTime);T=FT(Q);const ge=Math.max(X.player.getTimelineDuration(),1e-4);if(T.length===0){o.hidden=!0;return}o.hidden=!1;for(const ve of T){const Re=document.createElement("div");Re.className="sap-tl-range-lane";const te=document.createElement("div");if(te.className="sap-tl-range-lane-track",ve.label){Re.dataset.label=ve.label;const Y=document.createElement("span");Y.className="sap-tl-range-lane-label",Y.textContent=ve.label,Y.setAttribute("aria-label",ve.label),Re.append(Y)}for(const Y of ve.ranges){const le=X.player.projectReplayTimeToTimeline(Y.startTime),Pe=X.player.projectReplayTimeToTimeline(Y.endTime),{startTimelineTime:ye,endTimelineTime:Be}=zT(le,Pe,ge),Qe=document.createElement("div");Qe.className="sap-tl-range-segment",Y.className&&Qe.classList.add(Y.className),Qe.style.background=OT(Y),Qe.title=Y.label??ve.label,Qe.dataset.active="false",Qe.style.left=ao(ye,ge),Qe.style.width=ao(Math.max(0,Be-ye),ge),te.append(Qe),b.push({range:Y,element:Qe,startTimelineTime:ye,endTimelineTime:Be})}const G=document.createElement("div");G.className="sap-tl-range-playhead",te.append(G),R.push({element:G}),Re.append(te),o.append(Re)}}function H(){x&&(x=!1,r?.setAttribute("data-scrubbing","false"),y&&C?.player.play(),y=!1)}function ne(){if(x||(x=!0,r?.setAttribute("data-scrubbing","true"),!e))return;const X=C?.player;X&&(y=X.getState().playing,y&&X.pause())}return{id:"timeline-overlay",addEventSource(X,Q={}){return i.push({key:Q.id??`events:${t++}`,label:Q.label??"Events",source:X}),N(),()=>{this.removeEventSource(X)}},removeEventSource(X){const Q=i.findIndex(ge=>ge.source===X);return Q<0?!1:(i.splice(Q,1),N(),!0)},refreshEvents(){N()},addRangeSource(X){return s.push(X),k(),()=>{this.removeRangeSource(X)}},removeRangeSource(X){const Q=s.indexOf(X);return Q<0?!1:(s.splice(Q,1),k(),!0)},refreshRanges(){k()},setup(X){C=X,CT(),getComputedStyle(X.container).position==="static"&&(f=!0,w=X.container.style.position,X.container.style.position="relative"),a=document.createElement("div"),a.className="sap-tl-root",r=document.createElement("div"),r.className="sap-tl-shell",r.dataset.scrubbing="false";const Q=document.createElement("div");Q.className="sap-tl-topline";const ge=document.createElement("div");ge.className="sap-tl-primary",c=document.createElement("button"),c.type="button",c.className="sap-tl-toggle sap-tl-track-toggle",u=document.createElement("span"),u.className="sap-tl-toggle-icon",u.setAttribute("aria-hidden","true"),u.textContent=">",d=document.createElement("span"),d.className="sap-tl-toggle-label",d.textContent="Play",c.append(u,d),c.addEventListener("click",()=>{X.player.togglePlayback()}),h=document.createElement("span"),h.className="sap-tl-current",h.textContent="0:00.00",p=document.createElement("span"),p.className="sap-tl-remaining",p.textContent="-0:00.00",ge.append(h),Q.append(ge,p);const ve=document.createElement("div");ve.className="sap-tl-track-wrap",o=document.createElement("div"),o.className="sap-tl-ranges",o.hidden=!0,g=document.createElement("div"),g.className="sap-tl-event-lanes",g.hidden=!0;const Re=document.createElement("div");Re.className="sap-tl-track-rail";const te=document.createElement("div");te.className="sap-tl-main-rail",_=document.createElement("div"),_.className="sap-tl-markers",l=document.createElement("input"),l.className="sap-tl-range",l.type="range",l.min="0",l.max=`${X.replay.duration}`,l.step="0.01",l.value="0";const G=()=>{ne()},Y=()=>{l&&X.player.seek(X.player.projectTimelineTimeToReplay(Number(l.value)))},le=()=>{H()};l.addEventListener("pointerdown",G),l.addEventListener("input",Y),l.addEventListener("change",le),window.addEventListener("pointerup",le),window.addEventListener("pointercancel",le),m=()=>{l?.removeEventListener("pointerdown",G),l?.removeEventListener("input",Y),l?.removeEventListener("change",le),window.removeEventListener("pointerup",le),window.removeEventListener("pointercancel",le)},Re.append(te,_,l),ve.append(o,g,c,Re),r.append(Q,ve),a.append(r),X.container.append(a),O(X),q(X),z({...X,state:X.player.getState()})},onStateChange(X){C=X,z(X)},teardown(X){m?.(),m=null,H(),a?.remove(),a=null,r=null,o=null,g=null,l=null,c=null,u=null,d=null,h=null,p=null,_=null,C=null,M=[],T=[],A=null,v.clear(),b.splice(0,b.length),R.splice(0,R.length),f&&(X.container.style.position=w,f=!1)}}}function VT(n){return`
  <main class="shell">
    <section class="workspace">
      <div class="viewport-panel">
        <div id="viewport" class="viewport"></div>
        <div class="top-chrome">
          <button
            id="launcher-toggle"
            class="launcher-toggle"
            type="button"
            aria-label="Open menu"
            aria-expanded="false"
            aria-controls="launcher-menu"
          >
            <span class="launcher-toggle-bars" aria-hidden="true"></span>
          </button>
          <div id="launcher-menu" class="launcher-menu" hidden>
            <section class="launcher-section">
              <h2>Actions</h2>
              <button id="load-replay-action" type="button">Load Replay...</button>
            </section>
            <section class="launcher-section">
              <h2>Windows</h2>
              <button type="button" data-window-toggle="camera">Camera</button>
              <button type="button" data-window-toggle="scoreboard">Scoreboard</button>
              <button type="button" data-window-toggle="playback">Playback</button>
              <button type="button" data-window-toggle="recording">Recording</button>
              <button type="button" data-window-toggle="mechanics">Events</button>
              <button type="button" data-window-toggle="event-playlist">Event playlist</button>
              <button type="button" data-window-toggle="mechanics-review">Mechanics review</button>
              <button type="button" data-window-toggle="boost-pickups">Boost pickup filters</button>
              <button type="button" data-window-toggle="touch-controls">Touch controls</button>
              <button type="button" data-create-stats-window="player">New player stats</button>
              <button type="button" data-create-stats-window="team">New team stats</button>
              <button type="button" data-create-stats-window="all-players">New all players stats</button>
              <button type="button" data-create-stats-window="all-teams">New all teams stats</button>
              <button type="button" data-create-stats-window="goals-overview">New goal labels</button>
              <button type="button" data-create-stats-window="ad-hoc">New ad hoc stats</button>
            </section>
            <div class="module-groups" id="module-summary"></div>
            <div id="module-settings" class="module-settings" hidden></div>
          </div>
        </div>

        <div id="floating-window-layer" class="floating-window-layer">
          <section class="scoreboard-window" data-window-id="scoreboard">
            <div id="scoreboard-window-body" class="scoreboard-window-body"></div>
          </section>

          <section
            class="floating-window floating-window-camera"
            data-window-id="camera"
            style="--window-x: 1rem; --window-y: 4.25rem;"
          >
            <header class="floating-window-header">
              <div>
                <h2>Camera</h2>
              </div>
              <button class="floating-window-hide" type="button" data-window-hide="camera">
                Hide
              </button>
            </header>
            <label>
              <span class="label">Camera profile</span>
              <select id="attached-player" disabled>
                <option value="">Free camera</option>
              </select>
            </label>
            <div class="camera-presets" role="group" aria-label="Camera views">
              <button id="camera-view-free" type="button" disabled>Free</button>
              <button id="camera-view-follow" type="button" disabled>Follow</button>
              <button id="camera-view-overhead" type="button" disabled>
                Overhead
              </button>
              <button id="camera-view-side" type="button" disabled>Diagonal</button>
            </div>
            <label>
              <span class="label">Distance scale</span>
              <input
                id="camera-distance"
                type="range"
                min="0.75"
                max="4"
                step="0.05"
                value="${n}"
                disabled
              />
            </label>
            <strong id="camera-distance-readout" class="metric-readout">
              ${n.toFixed(2)}x
            </strong>
            <label class="toggle">
              <input id="custom-camera-settings" type="checkbox" disabled />
              <span>Custom camera settings</span>
            </label>
            <div id="camera-settings-controls" class="camera-settings-controls" hidden>
              <label>
                <span class="camera-setting-label">
                  <span>FOV</span>
                  <strong id="custom-camera-fov-readout">110</strong>
                </span>
                <input
                  id="custom-camera-fov"
                  type="range"
                  min="60"
                  max="130"
                  step="1"
                  value="110"
                  disabled
                />
              </label>
              <label>
                <span class="camera-setting-label">
                  <span>Height</span>
                  <strong id="custom-camera-height-readout">100</strong>
                </span>
                <input
                  id="custom-camera-height"
                  type="range"
                  min="40"
                  max="250"
                  step="1"
                  value="100"
                  disabled
                />
              </label>
              <label>
                <span class="camera-setting-label">
                  <span>Pitch</span>
                  <strong id="custom-camera-pitch-readout">-4</strong>
                </span>
                <input
                  id="custom-camera-pitch"
                  type="range"
                  min="-30"
                  max="30"
                  step="1"
                  value="-4"
                  disabled
                />
              </label>
              <label>
                <span class="camera-setting-label">
                  <span>Distance</span>
                  <strong id="custom-camera-distance-readout">270</strong>
                </span>
                <input
                  id="custom-camera-distance"
                  type="range"
                  min="100"
                  max="500"
                  step="1"
                  value="270"
                  disabled
                />
              </label>
              <label>
                <span class="camera-setting-label">
                  <span>Stiffness</span>
                  <strong id="custom-camera-stiffness-readout">--</strong>
                </span>
                <input
                  id="custom-camera-stiffness"
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value="0"
                  disabled
                />
              </label>
              <label>
                <span class="camera-setting-label">
                  <span>Swivel</span>
                  <strong id="custom-camera-swivel-speed-readout">--</strong>
                </span>
                <input
                  id="custom-camera-swivel-speed"
                  type="range"
                  min="1"
                  max="10"
                  step="0.1"
                  value="1"
                  disabled
                />
              </label>
              <label>
                <span class="camera-setting-label">
                  <span>Transition</span>
                  <strong id="custom-camera-transition-speed-readout">--</strong>
                </span>
                <input
                  id="custom-camera-transition-speed"
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.05"
                  value="1"
                  disabled
                />
              </label>
            </div>
            <label class="toggle">
              <input id="ball-cam" type="checkbox" disabled />
              <span>Ball cam</span>
            </label>
            <dl class="detail-grid">
              <div>
                <dt>Profile</dt>
                <dd id="camera-profile-readout">Free camera</dd>
              </div>
              <div>
                <dt>FOV</dt>
                <dd id="camera-fov-readout">--</dd>
              </div>
              <div>
                <dt>Height</dt>
                <dd id="camera-height-readout">--</dd>
              </div>
              <div>
                <dt>Pitch</dt>
                <dd id="camera-pitch-readout">--</dd>
              </div>
              <div>
                <dt>Distance</dt>
                <dd id="camera-base-distance-readout">--</dd>
              </div>
              <div>
                <dt>Stiffness</dt>
                <dd id="camera-stiffness-readout">--</dd>
              </div>
            </dl>
          </section>

          <section
            class="floating-window floating-window-playback"
            data-window-id="playback"
            hidden
            style="--window-x: calc(100vw - 23rem); --window-y: 4.25rem;"
          >
            <header class="floating-window-header">
              <div>
                <h2>Playback</h2>
              </div>
              <button class="floating-window-hide" type="button" data-window-hide="playback">
                Hide
              </button>
            </header>
            <div class="transport-row">
              <button id="toggle-playback" disabled>Play</button>
              <select id="playback-rate" disabled>
                <option value="0.25">0.25x</option>
                <option value="0.5">0.5x</option>
                <option value="1" selected>1.0x</option>
                <option value="1.5">1.5x</option>
                <option value="2">2.0x</option>
              </select>
            </div>
            <label class="toggle">
              <input id="skip-post-goal-transitions" type="checkbox" checked />
              <span>Skip post-goal resets</span>
            </label>
            <label class="toggle">
              <input id="skip-kickoffs" type="checkbox" />
              <span>Skip kickoff countdowns</span>
            </label>
            <div class="detail-grid">
              <div>
                <dt>Time</dt>
                <dd id="time-readout">0.00s</dd>
              </div>
              <div>
                <dt>Frame</dt>
                <dd id="frame-readout">0</dd>
              </div>
              <div>
                <dt>Duration</dt>
                <dd id="duration-readout">0.00s</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd id="playback-status-readout">Stopped</dd>
              </div>
            </div>
          </section>

          <section
            class="floating-window floating-window-recording"
            data-window-id="recording"
            hidden
            style="--window-x: calc(100vw - 28rem); --window-y: 24rem;"
          >
            <header class="floating-window-header">
              <div>
                <h2>Recording</h2>
              </div>
              <button class="floating-window-hide" type="button" data-window-hide="recording">
                Hide
              </button>
            </header>
            <div class="recording-controls">
              <label>
                <span class="label">FPS</span>
                <input id="recording-fps" type="number" min="1" max="120" step="1" value="60" />
              </label>
              <label>
                <span class="label">Playback rate</span>
                <select id="recording-playback-rate">
                  <option value="0.5">0.5x</option>
                  <option value="1" selected>1.0x</option>
                  <option value="1.5">1.5x</option>
                  <option value="2">2.0x</option>
                </select>
              </label>
            </div>
            <div class="transport-row">
              <button id="recording-start" type="button" disabled>Start</button>
              <button id="recording-full-replay" type="button" disabled>Full replay</button>
              <button id="recording-stop" type="button" disabled>Stop</button>
            </div>
            <div class="transport-row">
              <button id="recording-download" type="button" disabled>Download</button>
              <button id="recording-clear" type="button" disabled>Clear</button>
            </div>
            <div class="detail-grid">
              <div>
                <dt>Status</dt>
                <dd id="recording-status">Idle</dd>
              </div>
              <div>
                <dt>Elapsed</dt>
                <dd id="recording-elapsed">0.0s</dd>
              </div>
              <div>
                <dt>Size</dt>
                <dd id="recording-size">--</dd>
              </div>
              <div>
                <dt>Type</dt>
                <dd id="recording-type">WebM</dd>
              </div>
            </div>
          </section>

          <section
            class="floating-window floating-window-mechanics"
            data-window-id="mechanics"
            hidden
            style="--window-x: 1rem; --window-y: 16rem;"
          >
            <header class="floating-window-header">
              <div>
                <h2>Events</h2>
              </div>
              <button class="floating-window-hide" type="button" data-window-hide="mechanics">
                Hide
              </button>
            </header>
            <div id="mechanics-timeline-window-body"></div>
          </section>

          <section
            class="floating-window floating-window-event-playlist"
            data-window-id="event-playlist"
            hidden
            style="--window-x: calc(100vw - 28rem); --window-y: 16rem;"
          >
            <header class="floating-window-header">
              <div>
                <h2>Event playlist</h2>
              </div>
              <button class="floating-window-hide" type="button" data-window-hide="event-playlist">
                Hide
              </button>
            </header>
            <div id="event-playlist-window-body" class="event-playlist-window-body"></div>
          </section>

          <section
            class="floating-window floating-window-mechanics-review"
            data-window-id="mechanics-review"
            hidden
            style="--window-x: calc(100vw - 31rem); --window-y: 16rem;"
          >
            <header class="floating-window-header">
              <div>
                <h2>Mechanics review</h2>
              </div>
              <button class="floating-window-hide" type="button" data-window-hide="mechanics-review">
                Hide
              </button>
            </header>
            <div id="mechanics-review-window-body" class="mechanics-review-window-body">
              <div class="mechanics-review-load-row">
                <label class="mechanics-review-file">
                  <input id="mechanics-review-file" type="file" accept="application/json,.json" />
                  Playlist JSON
                </label>
                <input
                  id="mechanics-review-url"
                  type="url"
                  placeholder="Playlist URL"
                  autocomplete="off"
                />
                <button id="mechanics-review-load-url" type="button">Load</button>
              </div>
              <div id="mechanics-review-status" class="mechanics-review-status">
                Load a review playlist.
              </div>
              <section class="mechanics-review-current">
                <div id="mechanics-review-index" class="mechanics-review-index">0 / 0</div>
                <h3 id="mechanics-review-title">No candidate selected</h3>
                <dl class="mechanics-review-fields">
                  <div>
                    <dt>Mechanic</dt>
                    <dd id="mechanics-review-mechanic">--</dd>
                  </div>
                  <div>
                    <dt>Player</dt>
                    <dd id="mechanics-review-player">--</dd>
                  </div>
                  <div>
                    <dt>Clip</dt>
                    <dd id="mechanics-review-clip">--</dd>
                  </div>
                  <div>
                    <dt>Event</dt>
                    <dd id="mechanics-review-event">--</dd>
                  </div>
                  <div class="mechanics-review-wide">
                    <dt>Reason</dt>
                    <dd id="mechanics-review-reason">--</dd>
                  </div>
                </dl>
              </section>
              <div class="mechanics-review-actions">
                <button id="mechanics-review-prev" type="button" disabled>Prev</button>
                <button id="mechanics-review-replay" type="button" disabled>Replay clip</button>
                <button id="mechanics-review-next" type="button" disabled>Next</button>
              </div>
              <div class="mechanics-review-decision-actions">
                <button id="mechanics-review-confirm" type="button" disabled>Confirm</button>
                <button id="mechanics-review-reject" type="button" disabled>Reject</button>
                <button id="mechanics-review-uncertain" type="button" disabled>Uncertain</button>
              </div>
              <section class="mechanics-review-replays">
                <div class="mechanics-review-list-header">
                  <span>Replays</span>
                  <span id="mechanics-review-replay-load-summary">0 replays</span>
                </div>
                <div
                  id="mechanics-review-replay-loads"
                  class="mechanics-review-replay-loads"
                ></div>
              </section>
              <div class="mechanics-review-list-header">
                <span>Playlist</span>
                <span id="mechanics-review-count">0 items</span>
              </div>
              <div id="mechanics-review-list" class="mechanics-review-list"></div>
            </div>
          </section>

          <section
            class="floating-window floating-window-boost-pickups"
            data-window-id="boost-pickups"
            hidden
            style="--window-x: 1rem; --window-y: 28rem;"
          >
            <header class="floating-window-header">
              <div>
                <h2>Boost pickup filters</h2>
              </div>
              <button class="floating-window-hide" type="button" data-window-hide="boost-pickups">
                Hide
              </button>
            </header>
            <div id="boost-pickup-filters-window-body"></div>
          </section>

          <section
            class="floating-window floating-window-touch-controls"
            data-window-id="touch-controls"
            hidden
            style="--window-x: calc(100vw - 25rem); --window-y: 16rem;"
          >
            <header class="floating-window-header">
              <div>
                <h2>Touch controls</h2>
              </div>
              <button class="floating-window-hide" type="button" data-window-hide="touch-controls">
                Hide
              </button>
            </header>
            <div id="touch-controls-window-body"></div>
          </section>
        </div>

        <div id="stats-window-layer" class="stats-window-layer"></div>

        <div id="empty-state" class="empty-state">
          <p>Load a replay to start.</p>
          <button id="empty-load-replay" type="button">Load Replay...</button>
        </div>
      </div>
    </section>

    <input id="replay-file" class="hidden-file-input" type="file" accept=".replay" />
    <div id="status-readout" class="visually-hidden">Waiting for file</div>
    <div id="players-readout" class="visually-hidden">--</div>
    <div id="frames-readout" class="visually-hidden">--</div>
    <div id="events-readout" class="visually-hidden">--</div>
  </main>
`}const kd=[{stage:"validating",index:1,total:8,label:"Parse replay",start:0,end:.08},{stage:"processing",index:2,total:8,label:"Process replay frames",start:.08,end:.62},{stage:"building-stats",index:3,total:8,label:"Build stats snapshots",start:.62,end:.7},{stage:"serializing-replay",index:4,total:8,label:"Serialize replay data",start:.7,end:.76},{stage:"serializing-stats",index:5,total:8,label:"Serialize stats timeline",start:.76,end:.86},{stage:"normalizing",index:6,total:8,label:"Normalize replay model",start:.86,end:.91},{stage:"decoding-replay",index:7,total:8,label:"Decode replay data",start:.91,end:.94},{stage:"decoding-stats",index:8,total:8,label:"Decode stats chunks",start:.94,end:.99}];function sg(n){return Math.max(0,Math.min(1,n))}function vc(n,e,t){if(n!==void 0)return sg((n-e)/(t-e))}function Bd(n){if(n.stage!=="stats-timeline")return n;const e=n.progress;return e===void 0?{...n,stage:"building-stats"}:e<.35?{...n,stage:"building-stats",progress:vc(e,0,.35)}:e<.55?{...n,stage:"serializing-replay",progress:vc(e,.35,.55)}:{...n,stage:"serializing-stats",progress:vc(e,.55,.92)}}function ag(n){const e=Bd(n);return kd.find(t=>t.stage===e.stage)}function GT(){return kd.map(({stage:n,index:e,total:t,label:i})=>({stage:n,index:e,total:t,label:i}))}function $T(n){const e=ag(n);return{stage:e.stage,index:e.index,total:e.total,label:e.label}}function WT(n){const e=Bd(n),t=ag(e);return kd.map(({stage:i,index:s,total:a,label:r})=>{if(s<t.index)return{stage:i,index:s,total:a,label:r,state:"complete",completion:1,indeterminate:!1};if(s>t.index)return{stage:i,index:s,total:a,label:r,state:"pending",completion:0,indeterminate:!1};const o=e.progress!==void 0;return{stage:i,index:s,total:a,label:r,state:"active",completion:o?sg(e.progress??0):1,indeterminate:!o}})}function ml(n){const e=Bd(n),t=e.progress===void 0?null:Math.round(e.progress*100);switch(e.stage){case"validating":return"Parsing replay...";case"processing":return t!==null&&e.totalFrames!==void 0?`Processing replay frames... ${t}% (${e.processedFrames??0}/${e.totalFrames})`:"Processing replay frames...";case"building-stats":return t!==null?e.totalFrames!==void 0?`Building stats snapshots... ${t}% (${e.processedFrames??0}/${e.totalFrames})`:`Building stats snapshots... ${t}%`:"Building stats snapshots...";case"serializing-replay":return t!==null?`Serializing replay data... ${t}%`:"Serializing replay data...";case"serializing-stats":return t!==null?`Serializing stats timeline... ${t}%`:"Serializing stats timeline...";case"decoding-replay":return t!==null?`Decoding replay data... ${t}%`:"Decoding replay data...";case"decoding-stats":return t!==null?e.totalChunks!==void 0?`Decoding stats chunks... ${t}% (${e.processedChunks??0}/${e.totalChunks})`:`Decoding stats chunks... ${t}%`:"Decoding stats chunks...";case"normalizing":return t!==null?`Normalizing replay model... ${t}%`:"Normalizing replay model...";default:return"Loading replay..."}}function Ua(n,e){return JSON.parse(n.decode(new Uint8Array(e)))}async function XT(n,e,t){t?.({stage:"decoding-stats",progress:0});const i=Ua(n,e.configBuffer);t?.({stage:"decoding-stats",progress:.05}),await qs();const s=Ua(n,e.replayMetaBuffer);t?.({stage:"decoding-stats",progress:.1}),await qs();const a=Ua(n,e.eventsBuffer);t?.({stage:"decoding-stats",progress:.15}),await qs();const r=[],o=e.frameChunkBuffers.length;for(let l=0;l<o;l+=1){const c=e.frameChunkBuffers[l];r.push(...Ua(n,c)),t?.({stage:"decoding-stats",processedChunks:l+1,totalChunks:o,progress:.15+(l+1)/Math.max(1,o)*.85}),await qs()}return o===0&&t?.({stage:"decoding-stats",progress:1}),{config:i,replay_meta:s,events:a,frames:r}}function qs(){return typeof requestAnimationFrame!="function"?Promise.resolve():new Promise(n=>requestAnimationFrame(()=>n()))}async function rg(n,e={}){if(typeof Worker>"u")throw new Error("Replay loading worker is not available in this environment");const t=new Worker(new URL(""+new URL("replayLoader.worker-Rmq-nGeG.js",import.meta.url).href,import.meta.url),{type:"module"}),i=n.slice(),s=e.reportEveryNFrames??100;return new Promise((a,r)=>{const o=()=>{t.terminate()};t.onmessage=async c=>{const u=c.data;if(u.type==="progress"){e.onProgress?.(u.progress);return}if(u.type==="error"){o(),r(new Error(u.error));return}o();const d=new TextDecoder;e.onProgress?.({stage:"decoding-replay",progress:0}),await qs();const h=Ua(d,u.replayBuffer);e.onProgress?.({stage:"decoding-replay",progress:1}),await qs();const p=await XT(d,u.statsTimelineParts,e.onProgress);a({replay:h,statsTimeline:p})},t.onerror=c=>{o(),r(new Error(c.message||"Replay loading worker failed"))};const l={type:"load-replay",bytes:i.buffer,reportEveryNFrames:s};t.postMessage(l,[i.buffer])})}function qT(n){const e=document.createElement("div");e.className="replay-load-modal",e.hidden=!0;const t=document.createElement("div");t.className="replay-load-modal__dialog",t.setAttribute("role","dialog"),t.setAttribute("aria-modal","true"),t.setAttribute("aria-labelledby","replay-load-modal-title");const i=document.createElement("p");i.className="replay-load-modal__eyebrow",i.textContent="Replay loading";const s=document.createElement("h2");s.id="replay-load-modal-title",s.className="replay-load-modal__title",s.textContent="Preparing replay pipeline";const a=document.createElement("p");a.className="replay-load-modal__status",a.textContent="Preparing replay...";const r=document.createElement("div");r.className="replay-load-modal__phase-list";const o=new Map;for(const p of GT()){const g=document.createElement("div");g.className="replay-load-modal__phase-row",g.dataset.state="pending";const _=document.createElement("p");_.className="replay-load-modal__phase-label",_.textContent=`${p.index}. ${p.label}`;const m=document.createElement("div");m.className="replay-load-modal__phase-bar";const f=document.createElement("div");f.className="replay-load-modal__phase-fill",f.dataset.indeterminate="false",m.append(f),g.append(_,m),r.append(g),o.set(p.stage,{row:g,fill:f})}const l=document.createElement("p");l.className="replay-load-modal__meta",t.append(i,s,a,r,l),e.append(t),n.append(e);let c="";const u=()=>{for(const{row:p,fill:g}of o.values())p.dataset.state="pending",g.style.width="0%",g.dataset.indeterminate="false"},d=p=>{for(const g of WT(p)){const _=o.get(g.stage);_&&(_.row.dataset.state=g.state,_.fill.dataset.indeterminate=g.indeterminate?"true":"false",_.fill.style.width=`${Math.round(g.completion*100)}%`)}},h=p=>{e.hidden=!p};return{show(p,g="Preparing replay..."){c=p,h(!0),u(),s.textContent="Preparing replay pipeline",a.textContent=g,l.textContent=`Loading ${p}`},update(p){h(!0);const g=$T(p);if(d(p),s.textContent=`Phase ${g.index} of ${g.total}: ${g.label}`,a.textContent=ml(p),p.stage==="processing"&&p.totalFrames!==void 0){l.textContent=`${p.processedFrames??0}/${p.totalFrames} frames`;return}if(p.stage==="decoding-stats"&&p.totalChunks!==void 0){l.textContent=`${p.processedChunks??0}/${p.totalChunks} chunks`;return}l.textContent=c?`Loading ${c}`:""},hide(){h(!1)},destroy(){e.remove()}}}const YT=236,ur=4120,ZT=2300,KT=16185075,jT=.18,JT=1118481,So=5882879,wo=16761180,QT=.55,yc=.12,Uf=.28,e1=3,t1=4,Ff=5,Of=2,n1=6,i1=856343,s1=.42,a1=18,r1=.24,o1=10,kf=220,l1=200,og=140,c1=220,u1=100,d1=120;function h1(n){const e=l1/2;if(n){const s=-ur+kf,a=-e;return{minX:s,maxX:a,centerX:(s+a)/2,width:a-s}}const t=e,i=ur-kf;return{minX:t,maxX:i,centerX:(t+i)/2,width:i-t}}function f1(n,e,t){if(n.length<2)return[];const i=Math.min(...n),s=Math.max(...n),a=s-i,r=e?-1:1,o=-r;return a<=t?[{kind:"other",centerY:(i+s)/2,halfDepth:Math.max(t-a/2,t*.35),directions:[r,o]}]:[{kind:"back",centerY:e?i:s,halfDepth:t,directions:[r]},{kind:"forward",centerY:e?s:i,halfDepth:t,directions:[o]}]}function p1(n,e){const t=new Pd;return t.moveTo(0,e/2),t.lineTo(n/2,-e/2),t.lineTo(-n/2,-e/2),t.closePath(),new fl(t)}function Bf(n){const e=u1*n,t=new rt({color:JT,transparent:!0,opacity:.9,side:Je,depthWrite:!1,depthTest:!1}),i=new gt;i.visible=!1;const s=new nn(og*.55*n,1),a=new ze(s,t);a.position.z=Ff,a.renderOrder=22,i.add(a);const r=p1(d1*n,e),o=new ze(r,t);return o.position.z=Ff,o.renderOrder=23,i.add(o),{group:i,shaftGeom:s,shaftMesh:a,headGeom:r,headMesh:o,material:t,headLength:e}}function bc(n,e,t,i){const s=Math.max(t-n.headLength,n.headLength*.2);n.group.position.x=e,n.group.rotation.z=i>0?0:Math.PI,n.shaftMesh.scale.y=s,n.shaftMesh.position.y=-n.headLength/2,n.headMesh.position.y=t/2-n.headLength/2,n.group.visible=!0}function Wo(n){n.group.visible=!1}function Vs(n,e){const t=new gt;t.visible=!1;const i=new rt({color:KT,transparent:!0,opacity:jT,side:Je,depthWrite:!1,depthTest:!1}),s=new nn(1,1),a=new ze(s,i);a.position.z=e1,a.renderOrder=20,t.add(a);const r=new rt({color:e,transparent:!0,opacity:QT,side:Je,depthWrite:!1,depthTest:!1}),o=new nn(1,1),l=new ze(o,r);l.position.z=t1,l.renderOrder=21,t.add(l);const c=Bf(n),u=Bf(n);return t.add(c.group),t.add(u.group),{group:t,floorGeom:s,floorMesh:a,floorMaterial:i,stripeGeom:o,stripeMesh:l,stripeMaterial:r,primaryMarker:c,secondaryMarker:u}}function m1(n){n.group.visible=!1,Wo(n.primaryMarker),Wo(n.secondaryMarker)}function g1(n,e,t,i){const s=e.halfDepth*2*i,a=ur*2*i,r=t.width*i,o=t.centerX*i,l=og*i,c=Math.max(s-32*i,n.primaryMarker.headLength*1.15),u=Math.min(c,Math.max(c1*i,s*.6));if(n.group.position.y=e.centerY*i,n.floorMesh.position.x=0,n.floorMesh.scale.set(a,s,1),n.stripeMesh.position.x=o,n.stripeMesh.scale.set(l,s,1),Wo(n.primaryMarker),Wo(n.secondaryMarker),e.directions.length===1)bc(n.primaryMarker,o,u,e.directions[0]);else{const d=r*.18;bc(n.primaryMarker,o-d,u,e.directions[0]),bc(n.secondaryMarker,o+d,u,e.directions[1])}n.group.visible=!0}function zf(n){n.group.removeFromParent(),n.shaftGeom.dispose(),n.headGeom.dispose(),n.material.dispose()}class _1{replay;blueBack;blueForward;blueOther;orangeBack;orangeForward;orangeOther;constructor(e,t,i){this.replay=t,this.blueBack=Vs(i,So),this.blueForward=Vs(i,So),this.blueOther=Vs(i,So),this.orangeBack=Vs(i,wo),this.orangeForward=Vs(i,wo),this.orangeOther=Vs(i,wo);for(const s of this.getZones())e.add(s.group)}update(e,t){const{frameIndex:i}=e,s=YT;for(const a of[!0,!1]){const r=this.replay.players.filter(d=>d.isTeamZero===a).length,o=[];for(const d of this.replay.players){if(d.isTeamZero!==a)continue;const h=d.frames[i];h?.position&&o.push(h.position.y)}const l=h1(a),c=this.getTeamZones(a);for(const d of c.values())m1(d);if(r<2||o.length!==r)continue;const u=f1(o,a,s);for(const d of u){const h=c.get(d.kind);h&&g1(h,d,l,t)}}}dispose(){for(const e of this.getZones())e.group.removeFromParent(),e.floorGeom.dispose(),e.floorMaterial.dispose(),e.stripeGeom.dispose(),e.stripeMaterial.dispose(),zf(e.primaryMarker),zf(e.secondaryMarker)}getTeamZones(e){return e?new Map([["back",this.blueBack],["forward",this.blueForward],["other",this.blueOther]]):new Map([["back",this.orangeBack],["forward",this.orangeForward],["other",this.orangeOther]])}getZones(){return[this.blueBack,this.blueForward,this.blueOther,this.orangeBack,this.orangeForward,this.orangeOther]}}function v1(n){return n==null||Number.isNaN(n)?null:n<0?"team-zero":"team-one"}class y1{group;teamZeroSide;teamOneSide;constructor(e,t){this.group=new gt,this.teamZeroSide=this.createHalfFieldSide(So),this.teamOneSide=this.createHalfFieldSide(wo);const i=ur*t,s=5120*t;this.teamZeroSide.mesh.position.set(0,-s/2,Of),this.teamZeroSide.mesh.scale.set(i*2,s,1),this.teamOneSide.mesh.position.set(0,s/2,Of),this.teamOneSide.mesh.scale.set(i*2,s,1),this.group.add(this.teamZeroSide.mesh),this.group.add(this.teamOneSide.mesh),e.add(this.group)}update(e){const t=v1(e);this.teamZeroSide.material.opacity=t==="team-zero"?Uf:yc,this.teamOneSide.material.opacity=t==="team-one"?Uf:yc}dispose(){this.group.removeFromParent(),this.teamZeroSide.mesh.geometry.dispose(),this.teamZeroSide.material.dispose(),this.teamOneSide.mesh.geometry.dispose(),this.teamOneSide.material.dispose()}createHalfFieldSide(e){const t=new nn(1,1),i=new rt({color:e,transparent:!0,opacity:yc,side:Je,depthWrite:!1,depthTest:!1}),s=new ze(t,i);return s.renderOrder=18,{mesh:s,material:i}}}function b1(n,e){const t=new gt,i=ur*2*e,s=(a,r,o)=>{const l=new nn(i,r*e),c=new rt({color:i1,transparent:!0,opacity:o,side:Je,depthWrite:!1,depthTest:!1}),u=new ze(l,c);return u.position.set(0,a,n1),u.renderOrder=24,u};for(const a of[-1,1]){const r=a*ZT*e;t.add(s(r,a1,s1))}return t.add(s(0,o1,r1)),n.add(t),t}function Lt(n){return n===void 0||Number.isNaN(n)?"?":`${Math.round(n)}`}function Ru(n,e,t=1){return n===void 0||e===void 0||Number.isNaN(n)||Number.isNaN(e)||e<=0?"?":`${(n*100/e).toFixed(t)}%`}function Pn(n,e){return`<div class="stat-row"><span class="label">${n}</span><span class="value">${e}</span></div>`}function x1(n,e){return`
      ${Pn("50s",Lt(n?.count))}
      ${Pn("Blue wins",`${Lt(n?.wins)} (${Ru(n?.wins,n?.count)})`)}
      ${Pn("Orange wins",`${Lt(n?.losses)} (${Ru(n?.losses,n?.count)})`)}
      ${Pn("Neutral",Lt(n?.neutral_outcomes))}
      ${Pn("Blue poss after",Lt(n?.possession_after_count))}
      ${Pn("Orange poss after",Lt(n?.opponent_possession_after_count))}
      ${Pn("Kickoff 50s",Lt(n?.kickoff_count))}
      ${Pn("Blue kickoff wins",Lt(n?.kickoff_wins))}
      ${Pn("Orange kickoff wins",Lt(n?.kickoff_losses))}
      ${Pn("Blue kickoff poss",Lt(n?.kickoff_possession_after_count))}
      ${Pn("Orange kickoff poss",Lt(n?.kickoff_opponent_possession_after_count))}
    `}function Hf(n){return`
    <div class="stat-row"><span class="label">50s</span><span class="value">${Lt(n?.count)}</span></div>
    <div class="stat-row"><span class="label">Wins</span><span class="value">${Lt(n?.wins)} (${Ru(n?.wins,n?.count)})</span></div>
    <div class="stat-row"><span class="label">Losses</span><span class="value">${Lt(n?.losses)}</span></div>
    <div class="stat-row"><span class="label">Neutral</span><span class="value">${Lt(n?.neutral_outcomes)}</span></div>
    <div class="stat-row"><span class="label">Poss after</span><span class="value">${Lt(n?.possession_after_count)}</span></div>
    <div class="stat-row"><span class="label">Kickoff 50s</span><span class="value">${Lt(n?.kickoff_count)}</span></div>
    <div class="stat-row"><span class="label">Kickoff wins</span><span class="value">${Lt(n?.kickoff_wins)}</span></div>
    <div class="stat-row"><span class="label">Kickoff poss</span><span class="value">${Lt(n?.kickoff_possession_after_count)}</span></div>
  `}function S1(n,e=1,t=""){return n===void 0||Number.isNaN(n)?"?":`${n.toFixed(e)}${t}`}function w1(n,e,t=1){return n===void 0||e===void 0||Number.isNaN(n)||Number.isNaN(e)||e<=0?"?":`${(n*100/e).toFixed(t)}%`}function Vf(n,e,t=1){if(n===void 0||Number.isNaN(n))return"?";const i=w1(n,e,t);return i==="?"?`${n.toFixed(t)}s`:`${n.toFixed(t)}s (${i})`}function Gf(n){return n.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Pu(n,e){return`<div class="stat-row"><span class="label">${Gf(n)}</span><span class="value">${Gf(e)}</span></div>`}function E1(n){const e=new Set,t=[];for(const i of n??[])e.has(i)||(e.add(i),t.push(i));return t}function lg(n,e){return n==="neutral"?"Neutral":e.kind==="shared"?n==="own"?"Blue control":"Orange control":n==="own"?"Team control":"Opp control"}function Lu(n){return n.kind==="shared"?["own","neutral","opponent"]:["own","neutral","opponent"]}function M1(n,e){return n==="neutral_third"?"Neutral third":e.kind==="shared"?n==="defensive_third"?"Blue third":"Orange third":n==="defensive_third"?"Own third":"Opp third"}function T1(n){return n.kind==="shared"?["defensive_third","neutral_third","offensive_third"]:["defensive_third","neutral_third","offensive_third"]}function A1(n,e,t,i){for(const s of t){const a=s==="possession_state"?Lu(i):T1(i),r=a.indexOf(n[s]),o=a.indexOf(e[s]),l=r===-1?Number.MAX_SAFE_INTEGER:r,c=o===-1?Number.MAX_SAFE_INTEGER:o;if(l!==c)return l-c}return 0}function C1(n,e,t){const i=(s,a)=>s==="possession_state"?lg(a,t):M1(a,t);if(e.length===1){const s=e[0];return i(s,n[s])}return e.map(s=>i(s,n[s])).join(" / ")}function R1(n,e,t,i){if(e.length===0)return"";const s=new Map;if(n?.labeled_time?.entries?.length)for(const a of n.labeled_time.entries){const r=new Map(a.labels.map(d=>[d.key,d.value])),o={};let l=!0;for(const d of e){const h=r.get(d);if(h===void 0){l=!1;break}o[d]=h}if(!l)continue;const c=e.map(d=>`${d}:${o[d]}`).join("|"),u=s.get(c);u?u.total+=a.value:s.set(c,{values:o,total:a.value})}if(s.size===0&&e.length===1&&e[0]==="possession_state"){const a=new Map;return n&&(a.set("own",n.possession_time),a.set("neutral",n.neutral_time??0),a.set("opponent",n.opponent_possession_time)),Lu(i).some(r=>(a.get(r)??0)>0)?Lu(i).filter(r=>a.has(r)).map(r=>Pu(lg(r,i),Vf(a.get(r),t))).join(""):""}return[...s.values()].sort((a,r)=>A1(a.values,r.values,e,i)).map(a=>Pu(C1(a.values,e,i),Vf(a.total,t))).join("")}function $f(n,e){const t=n?.tracked_time,i=E1(e.breakdownClasses),s=R1(n,i,t,e.labelPerspective);return`
    ${Pu("Tracked",S1(t,1,"s"))}
    ${s}
  `}function P1(n,e=1,t=""){return n===void 0||Number.isNaN(n)?"?":`${n.toFixed(e)}${t}`}function L1(n,e,t=1){return n===void 0||e===void 0||Number.isNaN(n)||Number.isNaN(e)||e<=0?"?":`${(n*100/e).toFixed(t)}%`}function I1(n,e,t=1){if(n===void 0||Number.isNaN(n))return"?";const i=L1(n,e,t);return i==="?"?`${n.toFixed(t)}s`:`${n.toFixed(t)}s (${i})`}function Wf(n){return n.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function cg(n,e){return`<div class="stat-row"><span class="label">${Wf(n)}</span><span class="value">${Wf(e)}</span></div>`}function N1(n,e){return n==="neutral"?"Neutral zone":e.kind==="shared"?n==="defensive_half"?"Blue side":"Orange side":n==="defensive_half"?"Own half":"Opp half"}function D1(n,e,t){const i=new Map;if(n&&(i.set("defensive_half",n.defensive_half_time),i.set("neutral",n.neutral_time??0),i.set("offensive_half",n.offensive_half_time)),n?.labeled_time?.entries?.length){i.clear();for(const a of n.labeled_time.entries){const r=a.labels.find(o=>o.key==="field_half")?.value;r&&i.set(r,(i.get(r)??0)+a.value)}}const s=["defensive_half","neutral","offensive_half"];return s.some(a=>(i.get(a)??0)>0)?s.filter(a=>i.has(a)).map(a=>cg(N1(a,t),I1(i.get(a),e))).join(""):""}function Xf(n,e){const t=n?.tracked_time,i=D1(n,t,e.labelPerspective);return`
    ${i.length===0?cg("Tracked",P1(t,1,"s")):""}
    ${i}
  `}function Ji(n){return n===void 0||Number.isNaN(n)?"?":`${Math.round(n)}`}function Qi(n,e){return`<div class="stat-row"><span class="label">${n}</span><span class="value">${e}</span></div>`}function xc(n){return`
    ${Qi("Rushes",Ji(n?.count))}
    ${Qi("2v1",Ji(n?.two_v_one_count))}
    ${Qi("2v2",Ji(n?.two_v_two_count))}
    ${Qi("2v3",Ji(n?.two_v_three_count))}
    ${Qi("3v1",Ji(n?.three_v_one_count))}
    ${Qi("3v2",Ji(n?.three_v_two_count))}
    ${Qi("3v3",Ji(n?.three_v_three_count))}
  `}const qf="subtr-actor-fifty-fifty-overlay-styles",U1=5882879,F1=16761180,O1=15988472,k1=180,B1=4;function Iu(n){if(!n)return null;const[e,t]=Object.entries(n)[0]??["Unknown","unknown"],i=typeof t=="string"?t:JSON.stringify(t);return`${e}:${i}`}function Yf(n,e){const t=Iu(e);return t?n.players.find(i=>i.id===t)?.name??t:"Unknown"}function z1(n,e){const t=Yf(e,n.team_zero_player),i=Yf(e,n.team_one_player),s=n.is_kickoff?"Kickoff 50/50":"50/50",a=n.winning_team_is_team_0===void 0?null:n.winning_team_is_team_0,r=n.possession_team_is_team_0===void 0?null:n.possession_team_is_team_0,o=a===null?"neutral":a?"blue win":"orange win",l=r===null?"neutral poss":r?"blue poss":"orange poss",c=a===null?"sap-fifty-fifty-overlay-label-neutral":a?"sap-fifty-fifty-overlay-label-blue":"sap-fifty-fifty-overlay-label-orange";return{text:`${s}: ${t} vs ${i} | ${o} | ${l}`,className:c,winnerIsTeamZero:a}}function ug(n,e){return n.events.fifty_fifty.map(t=>{const i=z1(t,e),s=new L(...t.team_zero_position),a=new L(...t.team_one_position),r=new L(...t.midpoint),o=e.frames[t.start_frame]?.time??t.start_time;return{id:`fifty-fifty:${t.start_frame}:${Iu(t.team_zero_player)}:${Iu(t.team_one_player)}`,time:o,frame:t.start_frame,label:i.text,labelClassName:i.className,axisStart:s,axisEnd:a,midpoint:r,winnerIsTeamZero:i.winnerIsTeamZero}})}function H1(n,e,t){const i=Math.max(.1,t);return n.filter(s=>{const a=e-s.time;return a>=0&&a<=i})}function V1(){if(document.getElementById(qf))return;const n=document.createElement("style");n.id=qf,n.textContent=`
    .sap-fifty-fifty-overlay-root {
      position: absolute;
      inset: 0;
      z-index: 2;
      pointer-events: none;
      overflow: hidden;
      font-family: "IBM Plex Sans", "Avenir Next", sans-serif;
    }

    .sap-fifty-fifty-overlay-label {
      position: absolute;
      min-width: max-content;
      padding: 0.24rem 0.6rem;
      border-radius: 999px;
      border: 1px solid rgba(255, 255, 255, 0.16);
      background: rgba(6, 12, 18, 0.82);
      color: #f5fbff;
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.01em;
      transform: translate(-50%, -100%);
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.7);
      box-shadow: 0 10px 24px rgba(0, 0, 0, 0.24);
      backdrop-filter: blur(8px);
      will-change: transform, opacity;
    }

    .sap-fifty-fifty-overlay-label-blue {
      border-color: rgba(89, 195, 255, 0.5);
      background: rgba(17, 47, 73, 0.84);
    }

    .sap-fifty-fifty-overlay-label-orange {
      border-color: rgba(255, 193, 92, 0.5);
      background: rgba(76, 41, 7, 0.84);
    }

    .sap-fifty-fifty-overlay-label-neutral {
      border-color: rgba(243, 246, 248, 0.4);
      background: rgba(34, 41, 47, 0.86);
    }
  `,document.head.append(n)}function G1(n,e,t,i){if(i.copy(n).project(e),i.z<-1||i.z>1)return!1;const s=t.clientWidth||1,a=t.clientHeight||1;return i.x=(i.x+1)*s/2,i.y=(1-i.y)*a/2,!(i.x<-100||i.x>s+100||i.y<-100||i.y>a+100)}class $1{scene;container;group=new gt;labelRoot;projectedPosition=new L;worldPosition=new L;labelOffset=new L(0,0,k1);markers;views=new Map;changedContainerPosition=!1;originalContainerPosition="";decaySeconds=B1;constructor(e,t,i,s){V1(),this.scene=e,this.container=t,this.markers=ug(s,i),getComputedStyle(t).position==="static"&&(this.changedContainerPosition=!0,this.originalContainerPosition=t.style.position,t.style.position="relative"),this.group.name="fifty-fifty-overlay",this.scene.replayRoot.add(this.group),this.labelRoot=document.createElement("div"),this.labelRoot.className="sap-fifty-fifty-overlay-root",this.container.append(this.labelRoot)}update(e){const t=H1(this.markers,e,this.decaySeconds),i=new Set(t.map(s=>s.id));for(const[s,a]of this.views.entries())i.has(s)||(a.line.removeFromParent(),a.line.geometry.dispose(),a.material.dispose(),a.label.remove(),this.views.delete(s));for(const s of t){const a=Math.max(0,e-s.time),r=Math.max(0,1-a/this.decaySeconds),o=this.ensureView(s),l=.12+.78*r;o.material.opacity=l;const c=o.line.geometry.getAttribute("position");c.setXYZ(0,s.axisStart.x,s.axisStart.y,s.axisStart.z+24),c.setXYZ(1,s.axisEnd.x,s.axisEnd.y,s.axisEnd.z+24),c.needsUpdate=!0,this.worldPosition.copy(s.midpoint).add(this.labelOffset),this.scene.replayRoot.localToWorld(this.worldPosition),G1(this.worldPosition,this.scene.camera,this.container,this.projectedPosition)?(o.label.hidden=!1,o.label.style.opacity=`${.24+.76*r}`,o.label.style.transform=`translate(${this.projectedPosition.x.toFixed(1)}px, ${this.projectedPosition.y.toFixed(1)}px) translate(-50%, -100%)`):o.label.hidden=!0}}dispose(){for(const e of this.views.values())e.line.removeFromParent(),e.line.geometry.dispose(),e.material.dispose(),e.label.remove();this.views.clear(),this.group.removeFromParent(),this.labelRoot.remove(),this.changedContainerPosition&&(this.container.style.position=this.originalContainerPosition,this.changedContainerPosition=!1)}ensureView(e){const t=this.views.get(e.id);if(t)return t;const i=new Ct().setFromPoints([e.axisStart,e.axisEnd]),s=new ul({color:e.winnerIsTeamZero===null?O1:e.winnerIsTeamZero?U1:F1,transparent:!0,opacity:.9}),a=new Ad(i,s);a.renderOrder=3,this.group.add(a);const r=document.createElement("div");r.className=`sap-fifty-fifty-overlay-label ${e.labelClassName}`,r.textContent=e.label,this.labelRoot.append(r);const o={marker:e,line:a,material:s,label:r};return this.views.set(e.id,o),o}}const Zf="subtr-actor-ceiling-shot-overlay-styles",W1=5882879,X1=16761180,q1=16185075,Y1=140,Z1=215,K1=220,j1=4.5;function dg(n){if(!n)return null;const[e,t]=Object.entries(n)[0]??["Unknown","unknown"],i=typeof t=="string"?t:JSON.stringify(t);return`${e}:${i}`}function J1(n,e){const t=dg(e);return t?n.players.find(i=>i.id===t)?.name??t:"Unknown"}function hg(n,e){return n.events.ceiling_shot.map(t=>{const i=J1(e,t.player),s=dg(t.player),a=e.frames[t.frame]?.time??t.time,r=t.confidence;return{id:`ceiling-shot:${t.frame}:${s}:${Math.round(r*1e3)}`,time:a,frame:t.frame,isTeamZero:t.is_team_0,playerId:s,playerName:i,ceilingContactPosition:{x:t.ceiling_contact_position[0],y:t.ceiling_contact_position[1],z:t.ceiling_contact_position[2]},touchPosition:{x:t.touch_position[0],y:t.touch_position[1],z:t.touch_position[2]},quality:r,qualityLabel:`${Math.round(r*100)}%`}})}function Q1(n,e,t){const i=Math.max(.1,t);return n.filter(s=>{const a=e-s.time;return a>=0&&a<=i})}function eA(){if(document.getElementById(Zf))return;const n=document.createElement("style");n.id=Zf,n.textContent=`
    .sap-ceiling-shot-overlay-root {
      position: absolute;
      inset: 0;
      z-index: 2;
      pointer-events: none;
      overflow: hidden;
      font-family: "IBM Plex Sans", "Avenir Next", sans-serif;
    }

    .sap-ceiling-shot-overlay-label {
      position: absolute;
      min-width: max-content;
      padding: 0.24rem 0.6rem;
      border-radius: 999px;
      border: 1px solid rgba(255, 255, 255, 0.18);
      background: rgba(6, 12, 18, 0.82);
      color: #f5fbff;
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.01em;
      transform: translate(-50%, -100%);
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.7);
      box-shadow: 0 10px 24px rgba(0, 0, 0, 0.24);
      backdrop-filter: blur(8px);
      will-change: transform, opacity;
    }

    .sap-ceiling-shot-overlay-label-blue {
      border-color: rgba(89, 195, 255, 0.5);
      background: rgba(17, 47, 73, 0.84);
    }

    .sap-ceiling-shot-overlay-label-orange {
      border-color: rgba(255, 193, 92, 0.5);
      background: rgba(76, 41, 7, 0.84);
    }
  `,document.head.append(n)}function tA(n,e,t,i){if(i.copy(n).project(e),i.z<-1||i.z>1)return!1;const s=t.clientWidth||1,a=t.clientHeight||1;return i.x=(i.x+1)*s/2,i.y=(1-i.y)*a/2,!(i.x<-100||i.x>s+100||i.y<-100||i.y>a+100)}class nA{scene;container;group=new gt;labelRoot;projectedPosition=new L;worldPosition=new L;labelOffset=new L(0,0,K1);markers;views=new Map;changedContainerPosition=!1;originalContainerPosition="";decaySeconds=j1;constructor(e,t,i,s){eA(),this.scene=e,this.container=t,this.markers=hg(s,i),getComputedStyle(t).position==="static"&&(this.changedContainerPosition=!0,this.originalContainerPosition=t.style.position,t.style.position="relative"),this.group.name="ceiling-shot-overlay",this.scene.replayRoot.add(this.group),this.labelRoot=document.createElement("div"),this.labelRoot.className="sap-ceiling-shot-overlay-root",this.container.append(this.labelRoot)}update(e){const t=Q1(this.markers,e,this.decaySeconds),i=new Set(t.map(s=>s.id));for(const[s,a]of this.views.entries())i.has(s)||(a.ring.removeFromParent(),a.ring.geometry.dispose(),a.ringMaterial.dispose(),a.beam.removeFromParent(),a.beamGeometry.dispose(),a.beamMaterial.dispose(),a.label.remove(),this.views.delete(s));for(const s of t){const a=Math.max(0,e-s.time),r=Math.max(0,1-a/this.decaySeconds),o=this.ensureView(s),l=.14+.6*r,c=.94+(1-r)*.18;o.ringMaterial.opacity=l,o.beamMaterial.opacity=.18+.55*r,o.ring.position.set(s.touchPosition.x,s.touchPosition.y,s.touchPosition.z+12),o.ring.scale.setScalar(c+s.quality*.08),this.worldPosition.set(s.touchPosition.x,s.touchPosition.y,s.touchPosition.z).add(this.labelOffset);const u=tA(this.worldPosition,this.scene.camera,this.container,this.projectedPosition);o.label.style.display=u?"block":"none",u&&(o.label.style.left=`${this.projectedPosition.x}px`,o.label.style.top=`${this.projectedPosition.y}px`,o.label.style.opacity=`${.42+.58*r}`)}}dispose(){for(const e of this.views.values())e.ring.removeFromParent(),e.ring.geometry.dispose(),e.ringMaterial.dispose(),e.beam.removeFromParent(),e.beamGeometry.dispose(),e.beamMaterial.dispose(),e.label.remove();this.views.clear(),this.group.removeFromParent(),this.labelRoot.remove(),this.changedContainerPosition&&(this.container.style.position=this.originalContainerPosition)}ensureView(e){const t=this.views.get(e.id);if(t)return t;const i=e.quality>=.8?q1:e.isTeamZero?W1:X1,s=new rt({color:i,transparent:!0,opacity:.8,side:Je,depthWrite:!1,depthTest:!1}),a=new ys(Y1,Z1,48),r=new ze(a,s);r.renderOrder=30,this.group.add(r);const o=new Ct().setFromPoints([new L(e.ceilingContactPosition.x,e.ceilingContactPosition.y,e.ceilingContactPosition.z),new L(e.touchPosition.x,e.touchPosition.y,e.touchPosition.z)]),l=new ul({color:i,transparent:!0,opacity:.7,depthWrite:!1,depthTest:!1}),c=new Ad(o,l);c.renderOrder=29,this.group.add(c);const u=document.createElement("div");u.className=`sap-ceiling-shot-overlay-label ${e.isTeamZero?"sap-ceiling-shot-overlay-label-blue":"sap-ceiling-shot-overlay-label-orange"}`,u.textContent=`${e.playerName} ceiling shot ${e.qualityLabel}`,this.labelRoot.append(u);const d={marker:e,ring:r,ringMaterial:s,beam:c,beamGeometry:o,beamMaterial:l,label:u};return this.views.set(e.id,d),d}}const Kf="subtr-actor-touch-overlay-styles",jf=5882879,Jf=16761180,iA=120,sA=196,Sc=24,Qf=210,ep=5,Eo=.1,aA=48;function nt(n){const[e,t]=Object.entries(n)[0]??["Unknown","unknown"],i=typeof t=="string"?t:JSON.stringify(t);return`${e}:${i}`}function rA(n){return{touchCount:n.touch?.touch_count??0,totalBallTravelDistance:n.touch?.total_ball_travel_distance??0,totalBallAdvanceDistance:n.touch?.total_ball_advance_distance??0,totalBallRetreatDistance:n.touch?.total_ball_retreat_distance??0}}function wc(n,e){return Math.max(0,n-e)}function oA(n,e){if(e==="markers")return n.playerName;const t=Math.round(n.totalBallAdvanceDistance),i=Math.round(n.totalBallRetreatDistance);return t>0&&i>0?`${n.playerName} +${t} / -${i} uu`:i>0?`${n.playerName} -${i} uu`:`${n.playerName} +${t} uu`}function fg(n,e){const t=new Map,i=new Map,s=[];for(const a of n.frames){const r=e.ballFrames[a.frame_number]?.position;for(const o of a.players){const l=nt(o.player_id),c=rA(o),u=t.get(l)??{touchCount:0,totalBallTravelDistance:0,totalBallAdvanceDistance:0,totalBallRetreatDistance:0},d=i.get(l),h=wc(c.totalBallTravelDistance,u.totalBallTravelDistance),p=wc(c.totalBallAdvanceDistance,u.totalBallAdvanceDistance),g=wc(c.totalBallRetreatDistance,u.totalBallRetreatDistance);if(d!==void 0&&r&&(h>Eo||p>Eo||g>Eo)){const x=s[d];x&&(x.totalBallTravelDistance+=h,x.totalBallAdvanceDistance+=p,x.totalBallRetreatDistance+=g,x.endPosition={x:r.x,y:r.y,z:r.z})}const _=Math.max(0,c.touchCount-u.touchCount);if(_===0){t.set(l,c);continue}const m=o.touch?.last_touch_frame??a.frame_number,f=e.frames[m]?.time??o.touch?.last_touch_time??a.time,w=e.ballFrames[m]?.position;if(!w){t.set(l,c);continue}for(let x=0;x<_;x+=1){const y=s.length;s.push({id:`touch-stat:${m}:${l}:${c.touchCount-_+x+1}`,time:f,frame:m,isTeamZero:o.is_team_0,playerId:l,playerName:o.name,position:{x:w.x,y:w.y,z:w.z},endPosition:{x:w.x,y:w.y,z:w.z},totalBallTravelDistance:0,totalBallAdvanceDistance:0,totalBallRetreatDistance:0}),i.set(l,y)}t.set(l,c)}}return s}function lA(n,e,t){const i=Math.max(.1,t);return n.filter(s=>{const a=e-s.time;return a>=0&&a<=i})}function cA(){if(document.getElementById(Kf))return;const n=document.createElement("style");n.id=Kf,n.textContent=`
    .sap-touch-overlay-root {
      position: absolute;
      inset: 0;
      z-index: 2;
      pointer-events: none;
      overflow: hidden;
      font-family: "IBM Plex Sans", "Avenir Next", sans-serif;
    }

    .sap-touch-overlay-label {
      position: absolute;
      min-width: max-content;
      padding: 0.22rem 0.55rem;
      border-radius: 999px;
      border: 1px solid rgba(255, 255, 255, 0.16);
      background: rgba(6, 12, 18, 0.8);
      color: #f5fbff;
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.01em;
      transform: translate(-50%, -100%);
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.7);
      box-shadow: 0 10px 24px rgba(0, 0, 0, 0.24);
      backdrop-filter: blur(8px);
      will-change: transform, opacity;
    }

    .sap-touch-overlay-label-advancement {
      min-width: 4.8rem;
      text-align: center;
    }

    .sap-touch-overlay-label-blue {
      border-color: rgba(89, 195, 255, 0.5);
      background: rgba(17, 47, 73, 0.84);
    }

    .sap-touch-overlay-label-orange {
      border-color: rgba(255, 193, 92, 0.5);
      background: rgba(76, 41, 7, 0.84);
    }
  `,document.head.append(n)}function uA(n,e,t,i){if(i.copy(n).project(e),i.z<-1||i.z>1)return!1;const s=t.clientWidth||1,a=t.clientHeight||1;return i.x=(i.x+1)*s/2,i.y=(1-i.y)*a/2,!(i.x<-100||i.x>s+100||i.y<-100||i.y>a+100)}function pg(n){return[n.line.material,n.cone.material].flatMap(e=>Array.isArray(e)?e:[e])}function tp(n,e){for(const t of pg(n))t.transparent=!0,t.opacity=e,t.depthWrite=!1,t.depthTest=!1}function np(n){n.removeFromParent(),n.line.geometry.dispose(),n.cone.geometry.dispose();for(const e of pg(n))e.dispose()}class dA{scene;container;group=new gt;labelRoot;projectedPosition=new L;worldPosition=new L;arrowStart=new L;arrowEnd=new L;arrowDirection=new L;labelOffset=new L(0,0,Qf);markers;views=new Map;changedContainerPosition=!1;originalContainerPosition="";decaySeconds=ep;mode="markers";constructor(e,t,i,s,a){cA(),this.scene=e,this.container=t,this.decaySeconds=Math.max(.1,a?.decaySeconds??ep),this.mode=a?.mode??"markers",this.labelOffset.set(0,0,Qf),this.markers=fg(s,i),getComputedStyle(t).position==="static"&&(this.changedContainerPosition=!0,this.originalContainerPosition=t.style.position,t.style.position="relative"),this.group.name="touch-event-overlay",this.scene.replayRoot.add(this.group),this.labelRoot=document.createElement("div"),this.labelRoot.className="sap-touch-overlay-root",this.container.append(this.labelRoot)}getDecaySeconds(){return this.decaySeconds}setDecaySeconds(e){this.decaySeconds=Math.max(.1,e)}getMode(){return this.mode}setMode(e){this.mode=e}update(e){const t=lA(this.markers,e,this.decaySeconds),i=new Set(t.map(s=>s.id));for(const[s,a]of this.views.entries())i.has(s)||(a.ring.removeFromParent(),a.ring.geometry.dispose(),a.material.dispose(),np(a.arrow),a.label.remove(),this.views.delete(s));for(const s of t){const a=Math.max(0,e-s.time),r=Math.max(0,1-a/this.decaySeconds),o=this.ensureView(s),l=.1+.6*r,c=.95+(1-r)*.28;o.material.opacity=l,o.ring.position.set(s.position.x,s.position.y,s.position.z+Sc),o.ring.scale.setScalar(c),o.label.textContent=oA(s,this.mode),o.label.classList.toggle("sap-touch-overlay-label-advancement",this.mode==="advancement"),this.updateArrow(o,s,l),this.worldPosition.set(s.position.x,s.position.y,s.position.z),this.worldPosition.add(this.labelOffset),this.scene.replayRoot.localToWorld(this.worldPosition),uA(this.worldPosition,this.scene.camera,this.container,this.projectedPosition)?(o.label.hidden=!1,o.label.style.opacity=`${.22+.78*r}`,o.label.style.transform=`translate(${this.projectedPosition.x.toFixed(1)}px, ${this.projectedPosition.y.toFixed(1)}px) translate(-50%, -100%)`):o.label.hidden=!0}}dispose(){for(const e of this.views.values())e.ring.removeFromParent(),e.ring.geometry.dispose(),e.material.dispose(),np(e.arrow),e.label.remove();this.views.clear(),this.group.removeFromParent(),this.labelRoot.remove(),this.changedContainerPosition&&(this.container.style.position=this.originalContainerPosition,this.changedContainerPosition=!1)}ensureView(e){const t=this.views.get(e.id);if(t)return t;const i=new rt({color:e.isTeamZero?jf:Jf,transparent:!0,opacity:.7,side:Je,depthWrite:!1,depthTest:!1}),s=new ze(new ys(iA,sA,48),i);s.rotation.x=-Math.PI/2,s.renderOrder=40,this.group.add(s);const a=new $y(new L(0,1,0),new L,1,e.isTeamZero?jf:Jf,1,1);a.visible=!1,a.renderOrder=45,a.line.renderOrder=45,a.cone.renderOrder=45,tp(a,.7),this.group.add(a);const r=document.createElement("div");r.className=`sap-touch-overlay-label ${e.isTeamZero?"sap-touch-overlay-label-blue":"sap-touch-overlay-label-orange"}`,r.textContent=e.playerName,r.hidden=!0,this.labelRoot.append(r);const o={marker:e,ring:s,material:i,arrow:a,label:r};return this.views.set(e.id,o),o}updateArrow(e,t,i){if(this.mode!=="advancement"||t.totalBallTravelDistance<=Eo){e.arrow.visible=!1;return}this.arrowStart.set(t.position.x,t.position.y,t.position.z+Sc*2),this.arrowEnd.set(t.endPosition.x,t.endPosition.y,t.endPosition.z+Sc*2),this.arrowDirection.copy(this.arrowEnd).sub(this.arrowStart);const s=this.arrowDirection.length();if(s<aA){e.arrow.visible=!1;return}this.arrowDirection.normalize(),e.arrow.visible=!0,e.arrow.position.copy(this.arrowStart),e.arrow.setDirection(this.arrowDirection),e.arrow.setLength(s,Math.min(140,Math.max(42,s*.18)),Math.min(86,Math.max(24,s*.1))),tp(e.arrow,Math.min(.86,i+.12))}}const yt="#3b82f6",bt="#f59e0b",hA="#d1d9e0",fA={air_dribble:"AD",ball_carry:"BC",ceiling_shot:"CS",double_tap:"DT",flick:"F",flip_reset:"FR",half_flip:"HF",half_volley:"HV",musty_flick:"M",one_timer:"OT",pass:"P",speed_flip:"SF",wall_aerial:"WA",wall_aerial_shot:"WS",wavedash:"WD"},pA=new Set(["wavedash"]);function Hn(n,e){return n.players.find(t=>t.id===e)?.name??e}function Bt(n,e,t){return n.frames[e??-1]?.time??t}function gn(n){return n.split(/[_-]+/).filter(e=>e.length>0).map(e=>`${e.slice(0,1).toUpperCase()}${e.slice(1)}`).join(" ")}function mA(n){return fA[n]??(n.split(/[_-]+/).filter(e=>e.length>0).map(e=>e.slice(0,1).toUpperCase()).join("").slice(0,3)||"M")}function mg(n){return[...new Set((n?.events.mechanics??[]).filter(e=>zd(e.kind)).map(e=>e.kind))].sort((e,t)=>gn(e).localeCompare(gn(t)))}function zd(n){return!pA.has(n)}function Hd(n,e,t){const i=t?new Set(t):null,s=new Map(e.players.map(a=>[a.id,a.name]));return(n.events.mechanics??[]).filter(a=>zd(a.kind)&&(!i||i.has(a.kind))).map(a=>{const r=nt(a.player_id),o=s.get(r)??r,l=gn(a.kind),c=a.timing.type==="moment"?{frame:a.timing.frame,time:a.timing.time}:{frame:a.timing.end_frame,time:a.timing.end_time};return{id:a.id,time:Bt(e,c.frame,c.time),frame:c.frame,kind:a.kind,label:`${o} ${l.toLowerCase()}`,shortLabel:mA(a.kind),playerId:r,playerName:o,isTeamZero:a.is_team_0,color:a.is_team_0?yt:bt}})}function gg(n,e,t){const i=[],s=new Map;for(const a of n.frames)for(const r of a.players){const o=nt(r.player_id),l=t.getCount(r),c=s.get(o)??0;s.set(o,l);const u=Math.max(0,l-c);if(u===0)continue;const d=Bt(e,a.frame_number,a.time);for(let h=0;h<u;h+=1){const p=l-u+h+1;i.push({id:`${t.idPrefix}:${a.frame_number}:${o}:${p}`,time:d,frame:a.frame_number,kind:t.kind,label:t.buildLabel(r),shortLabel:t.shortLabel,playerId:o,playerName:r.name,isTeamZero:r.is_team_0,color:r.is_team_0?yt:bt})}}return i}function gA(n){const e=new Set(n),t=new Set(["goal"]);return e.has("core")&&(t.add("save"),t.add("shot"),t.add("assist")),e.has("demo")&&t.add("demo"),[...t]}function _g(n,e){const t=new Set(gA(e));return n.timelineEvents.filter(i=>t.has(i.kind))}function vg(n,e){return ug(n,e).map(t=>({id:t.id,time:t.time,frame:t.frame,kind:"fifty-fifty",label:t.label,shortLabel:t.label.startsWith("Kickoff 50/50")?"KO":"50",isTeamZero:t.winnerIsTeamZero,color:t.winnerIsTeamZero===null?hA:t.winnerIsTeamZero?yt:bt}))}function yg(n,e){const t=[],i=new Map;for(const s of n.frames)for(const a of s.players){const r=nt(a.player_id),o=a.musty_flick?.count??0,l=i.get(r)??0;i.set(r,o);const c=Math.max(0,o-l);if(c===0)continue;const u=a.musty_flick?.last_musty_frame??s.frame_number,d=e.frames[u]?.time??a.musty_flick?.last_musty_time??s.time;for(let h=0;h<c;h+=1)t.push({id:`musty-flick:${u}:${r}:${o-c+h+1}`,time:d,frame:u,kind:"musty-flick",label:`${a.name} musty flick`,shortLabel:"M",playerId:r,playerName:a.name,isTeamZero:a.is_team_0,color:a.is_team_0?yt:bt})}return t}function bg(n,e){const t=[],i=new Map;for(const s of n.frames)for(const a of s.players){const r=nt(a.player_id),o=a.flick?.count??0,l=i.get(r)??0;i.set(r,o);const c=Math.max(0,o-l);if(c===0)continue;const u=a.flick?.last_flick_frame??s.frame_number,d=e.frames[u]?.time??a.flick?.last_flick_time??s.time;for(let h=0;h<c;h+=1)t.push({id:`flick:${u}:${r}:${o-c+h+1}`,time:d,frame:u,kind:"flick",label:`${a.name} flick`,shortLabel:"F",playerId:r,playerName:a.name,isTeamZero:a.is_team_0,color:a.is_team_0?yt:bt})}return t}function xg(n,e){return fg(n,e).map(t=>({id:t.id,time:t.time,frame:t.frame,kind:"touch",label:`${t.playerName} touch`,shortLabel:"T",playerId:t.playerId,playerName:t.playerName,isTeamZero:t.isTeamZero,color:t.isTeamZero?yt:bt}))}function Sg(n,e){return n.events.backboard.map((t,i)=>{const s=nt(t.player),a=e.players.find(r=>r.id===s)?.name??s;return{id:`backboard:${t.frame}:${s}:${i}`,time:Bt(e,t.frame,t.time),frame:t.frame,kind:"backboard",label:`${a} backboard`,shortLabel:"BB",playerId:s,playerName:a,isTeamZero:t.is_team_0,color:t.is_team_0?yt:bt}})}function wg(n,e){return hg(n,e).map(t=>({id:t.id,time:t.time,frame:t.frame,kind:"ceiling-shot",label:`${t.playerName} ceiling shot ${t.qualityLabel}`,shortLabel:"CS",playerId:t.playerId,playerName:t.playerName,isTeamZero:t.isTeamZero,color:t.isTeamZero?yt:bt}))}function Eg(n,e){return n.events.wall_aerial.map((t,i)=>{const s=nt(t.player),a=Hn(e,s),r=Bt(e,t.frame,t.time),o=Math.round(t.confidence*100),l=gn(t.wall).toLowerCase();return{id:`wall-aerial:${t.frame}:${s}:${i}`,time:r,frame:t.frame,kind:"wall-aerial",label:`${a} wall aerial ${o}% | ${l} wall`,shortLabel:"WA",playerId:s,playerName:a,isTeamZero:t.is_team_0,color:t.is_team_0?yt:bt}})}function Mg(n,e){return n.events.wall_aerial_shot.map((t,i)=>{const s=nt(t.player),a=Hn(e,s),r=Bt(e,t.frame,t.time),o=Math.round(t.confidence*100),l=gn(t.wall).toLowerCase();return{id:`wall-aerial-shot:${t.frame}:${s}:${i}`,time:r,frame:t.frame,kind:"wall-aerial-shot",label:`${a} wall aerial shot ${o}% | ${l} wall`,shortLabel:"WS",playerId:s,playerName:a,isTeamZero:t.is_team_0,color:t.is_team_0?yt:bt}})}function Tg(n,e){return n.events.double_tap.map((t,i)=>{const s=nt(t.player),a=Hn(e,s);return{id:`double-tap:${t.frame}:${s}:${i}`,time:Bt(e,t.frame,t.time),frame:t.frame,kind:"double-tap",label:`${a} double tap`,shortLabel:"DT",playerId:s,playerName:a,isTeamZero:t.is_team_0,color:t.is_team_0?yt:bt}})}function _A(n,e){return n.events.center.map((t,i)=>{const s=nt(t.player),a=Hn(e,s),r=Bt(e,t.frame,t.time),o=Math.round(t.lateral_centering_distance);return{id:`center:${t.frame}:${s}:${i}`,time:r,frame:t.frame,kind:"center",label:`${a} center | ${o}uu lateral`,shortLabel:"C",playerId:s,playerName:a,isTeamZero:t.is_team_0,color:t.is_team_0?yt:bt}})}function Ag(n,e){return n.events.one_timer.map((t,i)=>{const s=nt(t.player),a=nt(t.passer),r=Hn(e,s),o=Hn(e,a),l=Bt(e,t.frame,t.time),c=Math.round(t.ball_speed);return{id:`one-timer:${t.frame}:${a}:${s}:${i}`,time:l,frame:t.frame,kind:"one-timer",label:`${r} one-timer from ${o} | ${c}uu/s`,shortLabel:"OT",playerId:s,playerName:r,secondaryPlayerId:a,secondaryPlayerName:o,isTeamZero:t.is_team_0,color:t.is_team_0?yt:bt}})}function vA(n){return gn(n.replace(/_pass$/,""))}function Cg(n,e){return n.events.pass.map((t,i)=>{const s=nt(t.passer),a=nt(t.receiver),r=Hn(e,s),o=Hn(e,a),l=Bt(e,t.frame,t.time),c=Math.round(t.ball_travel_distance),u=vA(t.pass_kind);return{id:`pass:${t.frame}:${s}:${a}:${i}`,time:l,frame:t.frame,kind:"pass",label:`${r} to ${o} ${u.toLowerCase()} pass | ${c}uu`,shortLabel:"P",playerId:s,playerName:r,secondaryPlayerId:a,secondaryPlayerName:o,isTeamZero:t.is_team_0,color:t.is_team_0?yt:bt}})}function yA(n,e){return n.events.half_volley.map((t,i)=>{const s=nt(t.player),a=Hn(e,s),r=Bt(e,t.frame,t.time),o=Math.round(t.ball_speed);return{id:`half-volley:${t.frame}:${s}:${i}`,time:r,frame:t.frame,kind:"half-volley",label:`${a} half volley | ${o}uu/s`,shortLabel:"HV",playerId:s,playerName:a,isTeamZero:t.is_team_0,color:t.is_team_0?yt:bt}})}function Rg(n,e){return n.events.rush.map((t,i)=>{const s=Bt(e,t.end_frame,t.end_time),a=`${t.attackers}v${t.defenders}`,r=t.is_team_0?"Blue":"Orange";return{id:`rush:${t.start_frame}:${t.end_frame}:${i}`,time:s,frame:t.end_frame,kind:"rush",label:`${r} rush ${a}`,shortLabel:"R",playerId:null,playerName:null,isTeamZero:t.is_team_0,color:t.is_team_0?yt:bt}})}function bA(n){return gn(n.replace(/_goal$/,""))}function Pg(n,e){return n.events.goal_tags.map((t,i)=>{const s=t.scorer?nt(t.scorer):null,a=s?Hn(e,s):null,r=Bt(e,t.frame,t.time),o=bA(t.kind),l=Math.round(t.confidence*100);return{id:`goal-tag:${t.goal_index}:${t.kind}:${i}`,time:r,frame:t.frame,kind:"goal-tag",label:`${a??"Goal"} ${o.toLowerCase()} goal ${l}%`,shortLabel:"GT",playerId:s,playerName:a,isTeamZero:t.scoring_team_is_team_0,color:t.scoring_team_is_team_0?yt:bt}})}function Lg(n,e){return n.events.goal_context.map((t,i)=>{const s=t.scorer?nt(t.scorer):null,a=s?Hn(e,s):null,r=Bt(e,t.frame,t.time);return{id:`goal-context:${t.frame}:${s??"team"}:${i}`,time:r,frame:t.frame,kind:"goal-context",label:a?`${a} goal context`:"Goal context",shortLabel:"GC",playerId:s,playerName:a,isTeamZero:t.scoring_team_is_team_0,color:t.scoring_team_is_team_0?yt:bt}})}function Ig(n,e){const t=[],i=new Map,s=new Map;for(const a of n.frames){const r=Bt(e,a.frame_number,a.time);for(const o of a.players){const l=nt(o.player_id),c=o.dodge_reset?.count??0,u=i.get(l)??0;i.set(l,c);const d=o.dodge_reset?.on_ball_count??0,h=s.get(l)??0;s.set(l,d);const p=Math.max(0,c-u),g=Math.min(p,Math.max(0,d-h));for(let _=0;_<p;_+=1){const m=c-p+_+1;_<g||t.push({id:`dodge-reset:${a.frame_number}:${l}:${m}:air`,time:r,frame:a.frame_number,kind:"dodge-reset",label:`${o.name} dodge refresh`,shortLabel:"DR",playerId:l,playerName:o.name,isTeamZero:o.is_team_0,color:o.is_team_0?yt:bt})}}}return t}function Ng(n,e){return gg(n,e,{kind:"ball-carry",idPrefix:"ball-carry",shortLabel:"BC",getCount:t=>t.ball_carry?.carry_count??0,buildLabel:t=>`${t.name} ball carry`})}function Dg(n,e){return gg(n,e,{kind:"powerslide",idPrefix:"powerslide",shortLabel:"PS",getCount:t=>t.powerslide?.press_count??0,buildLabel:t=>`${t.name} powerslide`})}function Ug(n,e){return n.events.speed_flip.map(t=>{const i=t.player?nt(t.player):null,s=i?e.players.find(o=>o.id===i)?.name??i:"Unknown",a=e.frames[t.frame]?.time??t.time,r=Math.round(t.confidence*100);return{id:`speed-flip:${t.frame}:${i}:${Math.round(t.confidence*1e3)}`,time:a,frame:t.frame,kind:"speed-flip",label:`${s} speed flip ${r}%`,shortLabel:"SF",playerId:i,playerName:s,isTeamZero:t.is_team_0,color:t.is_team_0?yt:bt}})}function Fg(n,e){return n.events.half_flip.map((t,i)=>{const s=nt(t.player),a=e.players.find(c=>c.id===s)?.name??s,r=Bt(e,t.frame,t.time),o=Math.round(t.confidence*100),l=Math.round(t.end_speed-t.start_speed);return{id:`half-flip:${t.frame}:${s}:${i}`,time:r,frame:t.frame,kind:"half-flip",label:`${a} half flip ${o}% | +${l}uu/s`,shortLabel:"HF",playerId:s,playerName:a,isTeamZero:t.is_team_0,color:t.is_team_0?yt:bt}})}function Og(n,e){return n.events.wavedash.map((t,i)=>{const s=nt(t.player),a=e.players.find(c=>c.id===s)?.name??s,r=Bt(e,t.frame,t.time),o=Math.round(t.confidence*100),l=Math.round(t.horizontal_speed_gain);return{id:`wavedash:${t.frame}:${s}:${i}`,time:r,frame:t.frame,kind:"wavedash",label:`${a} wavedash ${o}% | +${l}uu/s`,shortLabel:"WD",playerId:s,playerName:a,isTeamZero:t.is_team_0,color:t.is_team_0?yt:bt}})}function kg(n,e){return n.events.bump.map((t,i)=>{const s=nt(t.initiator),a=nt(t.victim),r=e.players.find(u=>u.id===s)?.name??s,o=e.players.find(u=>u.id===a)?.name??a,l=Bt(e,t.frame,t.time),c=Math.round(t.confidence*100);return{id:`bump:${t.frame}:${s}:${a}:${i}`,time:l,frame:t.frame,kind:"bump",label:`${r} bumped ${o} ${c}%`,shortLabel:"B",playerId:s,playerName:r,isTeamZero:t.initiator_is_team_0,color:t.initiator_is_team_0?yt:bt}})}function xA(n){return n.kind==="beaten_to_ball"?"BT":n.dodge_active?"DW":n.aerial?"AW":"W"}function SA(n){const e=[n.aerial?"aerial":"grounded"];return n.dodge_active&&e.push("dodge"),e.join(" ")}function wA(n){return n.kind==="beaten_to_ball"?"beaten to ball":"whiff"}function Bg(n,e){return n.events.whiff.map((t,i)=>{const s=nt(t.player),a=e.players.find(c=>c.id===s)?.name??s,r=Bt(e,t.frame,t.time),o=Math.round(t.closest_approach_distance),l=Math.round(t.approach_speed);return{id:`whiff:${t.frame}:${s}:${i}`,time:r,frame:t.frame,kind:"whiff",label:`${a} ${SA(t)} ${wA(t)} | ${o}uu closest, ${l}uu/s`,shortLabel:xA(t),playerId:s,playerName:a,isTeamZero:t.is_team_0,color:t.is_team_0?yt:bt}})}function EA(n,e,t){const i=new Set(n);let s=_g(e,i).length;return i.has("fifty-fifty")&&(s+=vg(t,e).length),i.has("goal-context")&&(s+=Lg(t,e).length),i.has("goal-tags")&&(s+=Pg(t,e).length),i.has("musty-flick")&&(s+=yg(t,e).length),i.has("flick")&&(s+=bg(t,e).length),i.has("backboard")&&(s+=Sg(t,e).length),i.has("ceiling-shot")&&(s+=wg(t,e).length),i.has("wall-aerial")&&(s+=Eg(t,e).length),i.has("wall-aerial-shot")&&(s+=Mg(t,e).length),i.has("double-tap")&&(s+=Tg(t,e).length),i.has("center")&&(s+=_A(t,e).length),i.has("one-timer")&&(s+=Ag(t,e).length),i.has("pass")&&(s+=Cg(t,e).length),i.has("touch")&&(s+=xg(t,e).length),i.has("dodge-reset")&&(s+=Ig(t,e).length),i.has("ball-carry")&&(s+=Ng(t,e).length),i.has("powerslide")&&(s+=Dg(t,e).length),i.has("speed-flip")&&(s+=Ug(t,e).length),i.has("half-flip")&&(s+=Fg(t,e).length),i.has("half-volley")&&(s+=yA(t,e).length),i.has("rush")&&(s+=Rg(t,e).length),i.has("wavedash")&&(s+=Og(t,e).length),i.has("whiff")&&(s+=Bg(t,e).length),i.has("bump")&&(s+=kg(t,e).length),s}const zg=.02,Fn=1e-4,MA=200,Hg=.08,TA="#3b82f6",AA="#f59e0b",Nu={big:"rgba(245, 158, 11, 0.92)",small:"rgba(52, 211, 153, 0.86)"},ip={both:"rgba(52, 211, 153, 0.86)",ghost:"rgba(239, 68, 68, 0.9)",missed:"rgba(59, 130, 246, 0.9)"},CA={air_dribble:"AD",ball_carry:"BC",ceiling_shot:"CS",double_tap:"DT",flick:"F",half_flip:"HF",half_volley:"HV",musty_flick:"M",one_timer:"OT",pass:"P",wavedash:"WD"};function RA(n){const e=n.config?.pressure_neutral_zone_half_width_y;return typeof e=="number"&&Number.isFinite(e)?Math.max(0,e):MA}function Xo(n,e,t){return n?.frames?.[e??-1]?.time??t}function Vd(n){return n===!0?TA:n===!1?AA:null}function PA(n){return CA[n]??(n.split(/[_-]+/).filter(e=>e.length>0).map(e=>e.slice(0,1).toUpperCase()).join("").slice(0,3)||"M")}function Vg(n,e,t){const i=t?new Set(t):null,s=new Map(e.players.map(a=>[a.id,a.name]));return(n.events.mechanics??[]).filter(a=>zd(a.kind)&&a.timing.type==="span"&&(!i||i.has(a.kind))).map(a=>{if(a.timing.type!=="span")throw new Error("unreachable non-span mechanic event");const r=Du(a.player_id),o=s.get(r)??r,l=gn(a.kind),c=Xo(e,a.timing.start_frame,a.timing.start_time),u=Math.max(c,Xo(e,a.timing.end_frame,a.timing.end_time));return{id:a.id,startTime:c,endTime:u,lane:`mechanic:${a.kind}`,laneLabel:l,label:`${o} ${l.toLowerCase()}`,shortLabel:PA(a.kind),isTeamZero:a.is_team_0,color:Vd(a.is_team_0)??void 0}}).sort((a,r)=>a.startTime!==r.startTime?a.startTime-r.startTime:(a.id??"").localeCompare(r.id??""))}function LA(n,e,t,i,s,a){const r=e?.ballFrames[n]?.position?.y;return typeof r=="number"&&Number.isFinite(r)&&Math.abs(r)<=t+Fn||a>Fn?"neutral":i>s+Fn?"team_zero_side":s>i+Fn?"team_one_side":null}function IA(n,e,t){if(n==="neutral")return{id:`half-control:neutral:${e.toFixed(3)}`,startTime:e,endTime:t,lane:"half-control",laneLabel:"Half Control",label:"Neutral half control",color:"rgba(209, 217, 224, 0.7)",isTeamZero:null};const i=n==="team_zero_side";return{id:`half-control:${n}:${e.toFixed(3)}`,startTime:e,endTime:t,lane:"half-control",laneLabel:"Half Control",label:i?"Blue half control":"Orange half control",color:i?"rgba(89, 195, 255, 0.76)":"rgba(255, 193, 92, 0.76)",isTeamZero:i}}function NA(n,e){const t=[];let i=0,s=0,a=0,r=null;for(const o of n.frames){if(!Number.isFinite(o.time)||!Number.isFinite(o.dt)||o.dt<=0){r=o;continue}const l=o.team_zero?.possession?.possession_time??0,c=o.team_one?.possession?.possession_time??0,u=o.team_zero?.possession?.neutral_time??0,d=l-i,h=c-s,p=u-a;i=l,s=c,a=u;let g=null;const{startTime:_,endTime:m}=Gd(o,r,e);d>h+Fn&&d>p+Fn?g={id:`possession:team_zero:${_.toFixed(3)}`,startTime:_,endTime:m,lane:"possession",laneLabel:"Possession",label:"Blue possession",color:"rgba(59, 130, 246, 0.88)",isTeamZero:!0}:h>d+Fn&&h>p+Fn?g={id:`possession:team_one:${_.toFixed(3)}`,startTime:_,endTime:m,lane:"possession",laneLabel:"Possession",label:"Orange possession",color:"rgba(245, 158, 11, 0.88)",isTeamZero:!1}:p>Fn&&(g={id:`possession:neutral:${_.toFixed(3)}`,startTime:_,endTime:m,lane:"possession",laneLabel:"Possession",label:"Neutral possession",color:"rgba(209, 217, 224, 0.7)",isTeamZero:null}),$g(t,g),r=o}return t}function DA(n,e){const t=[];let i=0,s=0,a=0;const r=RA(n);let o=null;for(const l of n.frames){if(!Number.isFinite(l.time)||!Number.isFinite(l.dt)||l.dt<=0){o=l;continue}const c=l.team_zero?.pressure?.defensive_half_time??0,u=l.team_one?.pressure?.defensive_half_time??0,d=l.team_zero?.pressure?.neutral_time??0,h=c-i,p=u-s,g=d-a;i=c,s=u,a=d;const{startTime:_,endTime:m}=Gd(l,o,e),f=LA(l.frame_number,e,r,h,p,g),w=f?IA(f,_,m):null;$g(t,w),o=l}return t}function UA(n,e){return n.events.rush.map((t,i)=>{const s=e?.frames[t.start_frame]?.time??t.start_time,a=e?.frames[t.end_frame]?.time??t.end_time,r=`${t.attackers}v${t.defenders}`,o=t.is_team_0;return{id:`rush-range:${t.start_frame}:${t.end_frame}:${i}`,startTime:s,endTime:Math.max(s,a),lane:"rush",laneLabel:"Rush",label:`${o?"Blue":"Orange"} rush ${r}`,color:o?"rgba(59, 130, 246, 0.4)":"rgba(245, 158, 11, 0.4)",isTeamZero:o}})}function FA(n,e={}){const t=Gg(e),i=new Set(e.comparisons??["both"]),s=new Set(e.activities??["active","inactive","unknown"]),a=new Set(e.fieldHalves??["own","opponent","unknown"]),r=e.playerIds?new Set(e.playerIds):null;if(t.size===0||!i.has("both")||!s.has("unknown")||!a.has("unknown")||r?.size===0)return[];const o=new Map(n.players.map(c=>[c.id,c.isTeamZero])),l=[];for(const c of n.boostPads)if(t.has(c.size))for(let u=0;u<c.events.length;u+=1){const d=c.events[u];if(d.available||!Number.isFinite(d.time)||r&&!d.playerId||d.playerId&&r&&!r.has(d.playerId))continue;const h=Math.max(0,Xo(n,d.frame,d.time)),p=c.size==="big"?"Big":"Small",g=d.playerName?`${d.playerName} `:"",_=d.playerId?o.get(d.playerId)??null:null;l.push({id:`boost-pickup:${c.index}:${d.frame}:${u}`,startTime:h,endTime:Math.max(h+Hg,h),lane:"boost-pickups",laneLabel:"Boost Pickups",label:`${g}picked up ${p.toLowerCase()} boost pad ${c.index}`,shortLabel:c.size==="big"?"100":"12",color:Vd(_)??Nu[c.size],isTeamZero:_})}return l.sort((c,u)=>c.startTime!==u.startTime?c.startTime-u.startTime:(c.id??"").localeCompare(u.id??""))}function Gg(n){if(n.padTypes)return new Set(n.padTypes);if(n.sizes){const e=new Set(n.sizes),t=new Set;return e.has("big")&&t.add("big"),e.has("small")&&t.add("small"),e.has("big")&&e.has("small")&&t.add("ambiguous"),t}return new Set(["big","small","ambiguous"])}function Du(n){const[e,t]=Object.entries(n)[0]??["Unknown","unknown"],i=typeof t=="string"?t:JSON.stringify(t);return`${e}:${i}`}function OA(n){return{big:"big",small:"small",ambiguous:"ambiguous"}[n]}function kA(n){return{both:"counted",ghost:"ghost",missed:"missed"}[n]}function BA(n,e){return n==="ghost"?"G":n==="missed"?"M":{big:"100",small:"12",ambiguous:"?"}[e]}function zA(n,e,t={}){const i=n.events?.boost_pickups??[];if(i.length===0&&e)return FA(e,t);const s=Gg(t),a=new Set(t.comparisons??["both"]),r=new Set(t.activities??["active","inactive","unknown"]),o=new Set(t.fieldHalves??["own","opponent","unknown"]),l=t.playerIds?new Set(t.playerIds):null;if(s.size===0||a.size===0||r.size===0||o.size===0||l?.size===0)return[];const c=new Map((e?.players??[]).map(u=>[u.id,u.name]));return i.filter(u=>{const d=Du(u.player_id);return s.has(u.pad_type)&&a.has(u.comparison)&&r.has(u.activity)&&o.has(u.field_half)&&(!l||l.has(d))}).map((u,d)=>{const h=Du(u.player_id),p=c.get(h)??h,g=Math.max(0,Xo(e,u.frame,u.time)),_=kA(u.comparison),m=OA(u.pad_type);return{id:`boost-pickup:${u.comparison}:${u.frame}:${h}:${d}`,startTime:g,endTime:Math.max(g+Hg,g),lane:"boost-pickups",laneLabel:"Boost Pickups",label:`${p} ${_} ${m} boost pickup`,shortLabel:BA(u.comparison,u.pad_type),color:Vd(u.is_team_0)??(u.comparison==="both"?u.pad_type==="big"?Nu.big:u.pad_type==="small"?Nu.small:ip.both:ip[u.comparison]),isTeamZero:u.is_team_0}}).sort((u,d)=>u.startTime!==d.startTime?u.startTime-d.startTime:(u.id??"").localeCompare(d.id??""))}const HA=[{fieldName:"time_defensive_third",aliases:["time_defensive_zone"],label:"Def third",relativeColor:"own"},{fieldName:"time_neutral_third",aliases:["time_neutral_zone"],label:"Neutral third",relativeColor:"neutral"},{fieldName:"time_offensive_third",aliases:["time_offensive_zone"],label:"Off third",relativeColor:"opp"}];function VA(n,e){return n.relativeColor==="neutral"?"rgba(209, 217, 224, 0.68)":(n.relativeColor==="own"?e:!e)?"rgba(89, 195, 255, 0.74)":"rgba(255, 193, 92, 0.78)"}function GA(n){const[e,t]=Object.entries(n)[0]??["Unknown","unknown"],i=typeof t=="string"?t:JSON.stringify(t);return`${e}:${i}`}function $A(n,e){const t=n.positioning;if(!t)return 0;for(const i of[e.fieldName,...e.aliases??[]]){const s=t[i];if(typeof s=="number"&&Number.isFinite(s))return s}return 0}function WA(n,e){const t=new Map,i=[],s=new Map;let a=null;for(const r of n.frames){if(!Number.isFinite(r.time)||!Number.isFinite(r.dt)||r.dt<=0){a=r;continue}const{startTime:o,endTime:l}=Gd(r,a,e);if(l-o<=Fn){a=r;continue}for(const c of r.players){const u=GA(c.player_id),d=t.get(u)??new Map;let h=null,p=0;for(const g of HA){const _=$A(c,g),m=_-(d.get(g.fieldName)??0);m>p+Fn&&(p=m,h=g),d.set(g.fieldName,_)}t.set(u,d),h&&XA(i,s,{id:`time-in-zone:${u}:${h.fieldName}:${o.toFixed(3)}`,startTime:o,endTime:l,lane:`time-in-zone:${u}`,laneLabel:c.name,label:h.label,color:VA(h,c.is_team_0),isTeamZero:c.is_team_0})}a=r}return i}function Gd(n,e,t){const i=t?.frames[n.frame_number]?.time??n.time,s=e?t?.frames[e.frame_number]?.time??e.time:Math.max(0,i-n.dt);return{startTime:Math.max(0,s),endTime:Math.max(s,i)}}function $g(n,e){if(!e)return;const t=n[n.length-1];if(t&&t.lane===e.lane&&t.label===e.label&&Math.abs(t.endTime-e.startTime)<=zg){t.endTime=e.endTime;return}n.push(e)}function XA(n,e,t){if(!t)return;const i=t.lane??"",s=e.get(i);if(s&&s.label===t.label&&Math.abs(s.endTime-t.startTime)<=zg){s.endTime=t.endTime;return}n.push(t),e.set(i,t)}function qA(n){return new Map(n.frames.map(e=>[e.frame_number,e]))}function Et(n,e){return n.get(e)??null}const Ec=236,Wg="relative-positioning",YA={last:"Last",upfield:"Upfield",level:"Level",mid:"Mid"};function bs(n){return n?"team-blue":"team-orange"}function Xg(n,e,t){return`<div class="player-card ${t.tone==="shared"?"shared":t.tone==="blue"?"team-blue":"team-orange"}">
    <div class="player-card-header">
      <span class="player-name">${n}</span>
      ${t.metaHtml??""}
    </div>
    ${e}
  </div>`}function Ht(n,e,t,i=""){return Xg(n,t,{metaHtml:i,tone:e?"blue":"orange"})}function jt(n,e){return`<div class="player-team-stack">${[!0,!1].map(t=>{const i=n.filter(a=>a.is_team_0===t);if(i.length===0)return"";const s=t?"Blue":"Orange";return`<section class="player-team-group ${bs(t)}">
        <div class="player-team-header">
          <h3>${s} team</h3>
          <span>${i.length} player${i.length===1?"":"s"}</span>
        </div>
        <div class="player-stats-grid">
          ${i.map(e).join("")}
        </div>
      </section>`}).join("")}</div>`}function $d(n,e,t=""){return Xg(n,e,{metaHtml:t,tone:"shared"})}function zt(n,e,t){const i=Et(n.statsFrameLookup,e);return i?i.players.find(s=>nt(s.player_id)===t)??null:null}function ZA(n,e,t){const i=n.players.find(g=>g.id===e);if(!i||!i.frames[t]?.position)return"mid";const a=i.isTeamZero,r=n.players.filter(g=>g.isTeamZero===a).length,o=[];let l=0;for(const g of n.players){if(g.isTeamZero!==a)continue;const _=g.frames[t];if(!_?.position)continue;const m=a?_.position.y:-_.position.y;o.push(m),g.id===e&&(l=m)}if(r<2||o.length!==r)return"mid";const c=Math.min(...o),u=Math.max(...o);if(u-c<=Ec)return"level";const h=l-c<=Ec,p=u-l<=Ec;return h&&!p?"last":p&&!h?"upfield":"mid"}function KA(n){let e=null,t=null;const i=new Set,s=["possession_state","field_third"];return{id:"possession",label:"Possession",setup(){a()},teardown(){},onBeforeRender(){},getTimelineRanges(o){return NA(o.statsTimeline,o.replay)},getConfig(){return{breakdownClasses:r()}},applyConfig(o){if(i.clear(),o&&typeof o=="object"&&!Array.isArray(o)){const l=o.breakdownClasses;if(Array.isArray(l))for(const c of l)s.includes(c)&&i.add(c)}a(),n.rerenderCurrentState()},renderStats(o,l){const u=Et(l.statsFrameLookup,o)?.team_zero?.possession;return u?$d("Control State",$f(u,{labelPerspective:{kind:"shared"},breakdownClasses:r()})):""},renderFocusedPlayerStats(o,l,c){const u=Et(c.statsFrameLookup,l),d=zt(c,l,o),h=d?.is_team_0?u?.team_zero?.possession:u?.team_one?.possession;return!h||!d?"":$f(h,{labelPerspective:{kind:"team"},breakdownClasses:r()})},renderSettings(){if(!e){e=document.createElement("div"),e.className="module-settings-card";const o=document.createElement("div");o.className="module-settings-header";const l=document.createElement("div"),c=document.createElement("p");c.className="module-settings-eyebrow",c.textContent="Stat display";const u=document.createElement("h3");u.textContent="Possession breakdown",l.append(c,u),t=document.createElement("strong"),t.className="metric-readout",o.append(l,t);const d=document.createElement("div");d.className="module-settings-options";const h=document.createElement("label");h.className="toggle";const p=document.createElement("input");p.type="checkbox",p.dataset.breakdownClass="possession_state",p.addEventListener("change",()=>{p.checked?i.add("possession_state"):i.delete("possession_state"),a(),n.rerenderCurrentState(),n.requestConfigSync?.()});const g=document.createElement("span");g.textContent="Control",h.append(p,g),d.append(h);const _=document.createElement("label");_.className="toggle";const m=document.createElement("input");m.type="checkbox",m.dataset.breakdownClass="field_third",m.addEventListener("change",()=>{m.checked?i.add("field_third"):i.delete("field_third"),a(),n.rerenderCurrentState(),n.requestConfigSync?.()});const f=document.createElement("span");f.textContent="Third",_.append(m,f),d.append(_),e.append(o,d)}return a(),e}};function a(){if(e){for(const o of e.querySelectorAll("input[data-breakdown-class]")){const l=o.dataset.breakdownClass;o.checked=l?i.has(l):!1}if(t){const o=s.filter(l=>i.has(l));t.textContent=o.length===0?"Total only":o.map(l=>l==="possession_state"?"Control":"Third").join(" x ")}}}function r(){return s.filter(o=>i.has(o))}}function jA(){let n=null;return{id:"fifty-fifty",label:"50/50",setup(e){n=new $1(e.player.sceneState,e.player.container,e.replay,e.statsTimeline)},teardown(){n?.dispose(),n=null},onBeforeRender(e){n?.update(e.currentTime)},getTimelineEvents(e){return vg(e.statsTimeline,e.replay)},renderStats(e,t){const i=Et(t.statsFrameLookup,e);if(!i)return"";const s=$d("Challenge Summary",x1(i.team_zero?.fifty_fifty)),a=jt(i.players,r=>Ht(r.name,r.is_team_0,Hf(r.fifty_fifty)));return s+a},renderFocusedPlayerStats(e,t,i){const s=zt(i,t,e);return s?Hf(s.fifty_fifty):""}}}function JA(){let n=null,e=null;return{id:"pressure",label:"Half Control",setup(t){e=t.replay,n=new y1(t.player.sceneState.scene,t.fieldScale)},teardown(){n?.dispose(),n=null,e=null},onBeforeRender(t){const i=e?.ballFrames[t.frameIndex];n?.update(i?.position?.y??null)},getTimelineRanges(t){return DA(t.statsTimeline,t.replay)},renderStats(t,i){const a=Et(i.statsFrameLookup,t)?.team_zero?.pressure;return a?$d("Field State",Xf(a,{labelPerspective:{kind:"shared"}})):""},renderFocusedPlayerStats(t,i,s){const a=Et(s.statsFrameLookup,i),r=zt(s,i,t),o=r?.is_team_0?a?.team_zero?.pressure:a?.team_one?.pressure;return!o||!r?"":Xf(o,{labelPerspective:{kind:"team"}})}}}function QA(){return{id:"rush",label:"Rush",setup(){},teardown(){},onBeforeRender(){},getTimelineRanges(n){return UA(n.statsTimeline,n.replay)},getTimelineEvents(n){return Rg(n.statsTimeline,n.replay)},renderStats(n,e){const t=Et(e.statsFrameLookup,n),i=t?.team_zero?.rush,s=t?.team_one?.rush;return!i||!s?"":[Ht("Blue Team",!0,xc(i)),Ht("Orange Team",!1,xc(s))].join("")},renderFocusedPlayerStats(n,e,t){const i=Et(t.statsFrameLookup,e),s=zt(t,e,n),a=s?.is_team_0?i?.team_zero?.rush:i?.team_one?.rush;return!a||!s?"":xc(a)}}}const Uu={speed_band:{valueOrder:["slow","boost","supersonic"],formatValue:n=>({slow:"Slow",boost:"Boost",supersonic:"Supersonic"})[n]??n},height_band:{valueOrder:["ground","low_air","high_air"],formatValue:n=>({ground:"Ground",low_air:"Low air",high_air:"High air"})[n]??n}};function eC(n){const e=new Set,t=[];for(const i of n??[])e.has(i)||(e.add(i),t.push(i));return t}function Mc(n,e=1,t=""){return n===void 0||Number.isNaN(n)?"?":`${n.toFixed(e)}${t}`}function tC(n,e,t=1){return n===void 0||Number.isNaN(n)?"?":e===void 0||Number.isNaN(e)||e<=0?`${n.toFixed(t)}s`:`${n.toFixed(t)}s (${(n*100/e).toFixed(t)}%)`}function sp(n){return n.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Mo(n,e){return`<div class="stat-row"><span class="label">${sp(n)}</span><span class="value">${sp(e)}</span></div>`}function nC(n,e,t){for(const i of t){const{valueOrder:s}=Uu[i],a=s.indexOf(n[i]),r=s.indexOf(e[i]),o=a===-1?Number.MAX_SAFE_INTEGER:a,l=r===-1?Number.MAX_SAFE_INTEGER:r;if(o!==l)return o-l}return 0}function iC(n,e){if(e.length===1){const t=e[0];return Uu[t].formatValue(n[t])}return e.map(t=>Uu[t].formatValue(n[t])).join(" / ")}function sC(n,e,t){if(e.length===0||!n?.labeled_tracked_time?.entries?.length)return"";const i=new Map,s=n?.labeled_tracked_time?.entries??[];for(const a of s){const r=new Map(a.labels.map(d=>[d.key,d.value])),o={};let l=!0;for(const d of e){const h=r.get(d);if(h===void 0){l=!1;break}o[d]=h}if(!l)continue;const c=e.map(d=>`${d}:${o[d]}`).join("|"),u=i.get(c);u?u.total+=a.value:i.set(c,{values:o,total:a.value})}return[...i.values()].sort((a,r)=>nC(a.values,r.values,e)).map(a=>Mo(iC(a.values,e),tC(a.total,t))).join("")}function ap(n,e={}){const t=n?.tracked_time,i=n&&t&&t>0?n.speed_integral/t:t===0?0:void 0,s=eC(e.breakdownClasses),a=sC(n,s,t);return`
    ${Mo("Tracked",Mc(t,1,"s"))}
    ${Mo("Distance",Mc(n?.total_distance,0," uu"))}
    ${Mo("Avg speed",Mc(i,0," uu/s"))}
    ${a}
  `}const Fu={kind:{label:"Kind",valueOrder:["control","medium_hit","hard_hit"],formatValue:n=>({control:"Control",medium_hit:"Medium",hard_hit:"Hard"})[n]??n},height_band:{label:"Height",valueOrder:["ground","low_air","high_air"],formatValue:n=>({ground:"Ground",low_air:"Low air",high_air:"High air"})[n]??n},surface:{label:"Surface",valueOrder:["ground","air","wall"],formatValue:n=>({ground:"Ground",air:"Air",wall:"Wall"})[n]??n},dodge_state:{label:"Dodge",valueOrder:["no_dodge","dodge"],formatValue:n=>({no_dodge:"No dodge",dodge:"Dodge"})[n]??n}};function aC(n){const e=new Set,t=[];for(const i of n??[])e.has(i)||(e.add(i),t.push(i));return t}function Ti(n){return n===void 0||Number.isNaN(n)?"?":`${Math.round(n)}`}function Tc(n,e=0,t=""){return n===void 0||!Number.isFinite(n)?"?":`${n.toFixed(e)}${t}`}function rp(n){return n.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Dn(n,e){return`<div class="stat-row"><span class="label">${rp(n)}</span><span class="value">${rp(e)}</span></div>`}function rC(n,e,t){for(const i of t){const{valueOrder:s}=Fu[i],a=s.indexOf(n[i]),r=s.indexOf(e[i]),o=a===-1?Number.MAX_SAFE_INTEGER:a,l=r===-1?Number.MAX_SAFE_INTEGER:r;if(o!==l)return o-l}return 0}function oC(n,e){if(e.length===1){const t=e[0];return Fu[t].formatValue(n[t])}return e.map(t=>Fu[t].formatValue(n[t])).join(" / ")}function lC(n){return(n?.labeled_touch_counts?.entries??[]).map(e=>({labels:e.labels,count:e.count}))}function cC(n,e){if(e.length===0||n.length===0)return"";const t=new Map;for(const i of n){const s=new Map(i.labels.map(c=>[c.key,c.value])),a={};let r=!0;for(const c of e){const u=s.get(c);if(u===void 0){r=!1;break}a[c]=u}if(!r)continue;const o=e.map(c=>`${c}:${a[c]}`).join("|"),l=t.get(o);l?l.count+=i.count:t.set(o,{values:a,count:i.count})}return[...t.values()].sort((i,s)=>rC(i.values,s.values,e)).map(i=>Dn(oC(i.values,e),Ti(i.count))).join("")}function uC(n,e){if(!n||e.length!==1)return"";const[t]=e;if(t==="kind")return[Dn("Control",Ti(n.control_touch_count)),Dn("Medium",Ti(n.medium_hit_count)),Dn("Hard",Ti(n.hard_hit_count))].join("");if(t==="height_band"){const i=n.high_aerial_touch_count??0,s=(n.aerial_touch_count??0)-i,a=(n.touch_count??0)-(n.aerial_touch_count??0);return[Dn("Ground",Ti(a)),Dn("Low air",Ti(s)),Dn("High air",Ti(i))].join("")}return""}function op(n,e={}){const t=aC(e.breakdownClasses),i=lC(n),s=cC(i,t)||uC(n,t);return`
    ${Dn("Touches",Ti(n?.touch_count))}
    ${Dn("Ball advanced",Tc(n?.total_ball_advance_distance,0," uu"))}
    ${Dn("Ball traveled",Tc(n?.total_ball_travel_distance,0," uu"))}
    ${Dn("Ball retreated",Tc(n?.total_ball_retreat_distance,0," uu"))}
    ${s}
  `}const lp="subtr-actor-speed-flip-overlay-styles",dC=5882879,hC=16761180,fC=16185075,pC=150,mC=230,gC=220,_C=4;function qg(n){if(!n)return null;const[e,t]=Object.entries(n)[0]??["Unknown","unknown"],i=typeof t=="string"?t:JSON.stringify(t);return`${e}:${i}`}function vC(n,e){const t=qg(e);return t?n.players.find(i=>i.id===t)?.name??t:"Unknown"}function yC(n,e){return n.events.speed_flip.map(t=>{const i=vC(e,t.player),s=qg(t.player),a=e.frames[t.frame]?.time??t.time,r=t.confidence;return{id:`speed-flip:${t.frame}:${s}:${Math.round(r*1e3)}`,time:a,frame:t.frame,isTeamZero:t.is_team_0,playerId:s,playerName:i,position:{x:t.start_position[0],y:t.start_position[1],z:t.start_position[2]},quality:r,qualityLabel:`${Math.round(r*100)}%`}})}function bC(n,e,t){const i=Math.max(.1,t);return n.filter(s=>{const a=e-s.time;return a>=0&&a<=i})}function xC(){if(document.getElementById(lp))return;const n=document.createElement("style");n.id=lp,n.textContent=`
    .sap-speed-flip-overlay-root {
      position: absolute;
      inset: 0;
      z-index: 2;
      pointer-events: none;
      overflow: hidden;
      font-family: "IBM Plex Sans", "Avenir Next", sans-serif;
    }

    .sap-speed-flip-overlay-label {
      position: absolute;
      min-width: max-content;
      padding: 0.24rem 0.6rem;
      border-radius: 999px;
      border: 1px solid rgba(255, 255, 255, 0.18);
      background: rgba(6, 12, 18, 0.82);
      color: #f5fbff;
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.01em;
      transform: translate(-50%, -100%);
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.7);
      box-shadow: 0 10px 24px rgba(0, 0, 0, 0.24);
      backdrop-filter: blur(8px);
      will-change: transform, opacity;
    }

    .sap-speed-flip-overlay-label-blue {
      border-color: rgba(89, 195, 255, 0.5);
      background: rgba(17, 47, 73, 0.84);
    }

    .sap-speed-flip-overlay-label-orange {
      border-color: rgba(255, 193, 92, 0.5);
      background: rgba(76, 41, 7, 0.84);
    }
  `,document.head.append(n)}function SC(n,e,t,i){if(i.copy(n).project(e),i.z<-1||i.z>1)return!1;const s=t.clientWidth||1,a=t.clientHeight||1;return i.x=(i.x+1)*s/2,i.y=(1-i.y)*a/2,!(i.x<-100||i.x>s+100||i.y<-100||i.y>a+100)}class wC{scene;container;group=new gt;labelRoot;projectedPosition=new L;worldPosition=new L;labelOffset=new L(0,0,gC);markers;views=new Map;changedContainerPosition=!1;originalContainerPosition="";decaySeconds=_C;constructor(e,t,i,s){xC(),this.scene=e,this.container=t,this.markers=yC(s,i),getComputedStyle(t).position==="static"&&(this.changedContainerPosition=!0,this.originalContainerPosition=t.style.position,t.style.position="relative"),this.group.name="speed-flip-overlay",this.scene.replayRoot.add(this.group),this.labelRoot=document.createElement("div"),this.labelRoot.className="sap-speed-flip-overlay-root",this.container.append(this.labelRoot)}update(e){const t=bC(this.markers,e,this.decaySeconds),i=new Set(t.map(s=>s.id));for(const[s,a]of this.views.entries())i.has(s)||(a.ring.removeFromParent(),a.ring.geometry.dispose(),a.material.dispose(),a.label.remove(),this.views.delete(s));for(const s of t){const a=Math.max(0,e-s.time),r=Math.max(0,1-a/this.decaySeconds),o=this.ensureView(s),l=.16+.56*r,c=.96+(1-r)*.22;o.material.opacity=l,o.ring.position.set(s.position.x,s.position.y,s.position.z+14),o.ring.scale.setScalar(c+s.quality*.08),this.worldPosition.set(s.position.x,s.position.y,s.position.z).add(this.labelOffset);const u=SC(this.worldPosition,this.scene.camera,this.container,this.projectedPosition);o.label.style.display=u?"block":"none",u&&(o.label.style.left=`${this.projectedPosition.x}px`,o.label.style.top=`${this.projectedPosition.y}px`,o.label.style.opacity=`${.42+.58*r}`)}}dispose(){for(const e of this.views.values())e.ring.removeFromParent(),e.ring.geometry.dispose(),e.material.dispose(),e.label.remove();this.views.clear(),this.group.removeFromParent(),this.labelRoot.remove(),this.changedContainerPosition&&(this.container.style.position=this.originalContainerPosition)}ensureView(e){const t=this.views.get(e.id);if(t)return t;const i=new rt({color:e.quality>=.75?fC:e.isTeamZero?dC:hC,transparent:!0,opacity:.8,side:Je,depthWrite:!1,depthTest:!1}),s=new ys(pC,mC,48),a=new ze(s,i);a.renderOrder=30,this.group.add(a);const r=document.createElement("div");r.className=`sap-speed-flip-overlay-label ${e.isTeamZero?"sap-speed-flip-overlay-label-blue":"sap-speed-flip-overlay-label-orange"}`,r.textContent=`${e.playerName} speed flip ${e.qualityLabel}`,this.labelRoot.append(r);const o={marker:e,ring:a,material:i,label:r};return this.views.set(e.id,o),o}}const ro=[{value:"big",label:"Big pads"},{value:"small",label:"Small pads"},{value:"ambiguous",label:"Ambiguous pads"}],Ac=[{value:"both",label:"Pickup events"}],oo=[{value:"active",label:"Active play"},{value:"inactive",label:"Inactive play"},{value:"unknown",label:"Unknown activity"}],lo=[{value:"own",label:"Own half"},{value:"opponent",label:"Opponent half"},{value:"unknown",label:"Unknown half"}];function EC(n,e){return n===e||n==="ambiguous"}function MC(n,e){const t=e?.events.boost_pickups??[];return t.length===0?null:t.find(i=>{const s=nt(i.player_id),a=i.reported_frame??i.frame;return s===n.player.id&&i.comparison==="both"&&a===n.event.frame&&EC(i.pad_type,n.pad.size)})??null}function Yg(n={}){let e=null,t=null,i=null,s=null,a=null,r=null;const o=new Set(ro.map(T=>T.value)),l=new Set(Ac.map(T=>T.value)),c=new Set(oo.map(T=>T.value)),u=new Set(lo.map(T=>T.value));let d=null,h=!1;function p(T,A,v,b){const R=document.createElement("div");R.className="boost-pickup-filter-group";const N=document.createElement("p");N.className="module-settings-group-title",N.textContent=T;const k=document.createElement("div");k.className="boost-pickup-filter-options";for(const z of A){const V=document.createElement("label");V.className="toggle";const O=document.createElement("input");O.type="checkbox",O.dataset.boostPickupFilter=b,O.dataset.boostPickupValue=z.value,O.addEventListener("change",()=>{O.checked?v.add(z.value):v.delete(z.value),m(a),n.refreshTimelineRanges?.(),n.rerenderCurrentState?.(),n.requestConfigSync?.()});const q=document.createElement("span");q.textContent=z.label,V.append(O,q),k.append(V)}return R.append(N,k),R}function g(){const T=document.createElement("div");T.className="boost-pickup-filter-group boost-pickup-filter-group-wide",i=T;const A=document.createElement("p");return A.className="module-settings-group-title",A.textContent="Player",s=document.createElement("div"),s.className="boost-pickup-filter-options",T.append(A,s),T}function _(T){if(s&&(s.replaceChildren(),i&&(i.hidden=!T||T.players.length===0),!!T))for(const A of T.players){const v=document.createElement("label");v.className="toggle";const b=document.createElement("input");b.type="checkbox",b.dataset.boostPickupPlayerId=A.id,b.addEventListener("change",()=>{d||(d=new Set(T.players.map(N=>N.id))),b.checked?d.add(A.id):d.delete(A.id),m(T),n.refreshTimelineRanges?.(),n.rerenderCurrentState?.(),n.requestConfigSync?.()});const R=document.createElement("span");R.textContent=`${A.name} (${A.isTeamZero?"Blue":"Orange"})`,v.append(b,R),s.append(v)}}function m(T){if(e){for(const A of e.querySelectorAll("input[data-boost-pickup-filter][data-boost-pickup-value]")){const v=A.dataset.boostPickupFilter,b=A.dataset.boostPickupValue;A.checked=f(v,b)}for(const A of e.querySelectorAll("input[data-boost-pickup-player-id]")){const v=A.dataset.boostPickupPlayerId;A.checked=v?d?.has(v)??!0:!1}t&&(t.textContent=w(T))}}function f(T,A){if(!A)return!1;switch(T){case"pad-type":return o.has(A);case"comparison":return l.has(A);case"activity":return c.has(A);case"field-half":return u.has(A);default:return!1}}function w(T){const A=T?.players.length??0,v=d?d.size:A;if(o.size===0||l.size===0||c.size===0||u.size===0||d!==null&&d.size===0)return"Hidden";const R=[o.size<ro.length,l.size<Ac.length,c.size<oo.length,u.size<lo.length,d!==null&&v<A].filter(Boolean).length;return R===0?"All labels":`${R} filters`}function x(T){if(d&&!d.has(T.player.id))return!1;if((r?.events.boost_pickups??[]).length===0)return o.has(T.pad.size)&&l.has("both")&&c.has("unknown")&&u.has("unknown");const A=MC(T,r);return A?o.has(A.pad_type)&&l.has(A.comparison)&&c.has(A.activity)&&u.has(A.field_half):!1}function y(T,A,v){if(T.clear(),!Array.isArray(v)){for(const R of A)T.add(R.value);return}const b=new Set(A.map(R=>R.value));for(const R of v)typeof R=="string"&&b.has(R)&&T.add(R)}function C(){return{padTypes:[...o],comparisons:[...l],activities:[...c],fieldHalves:[...u],playerIds:d?[...d]:null}}function M(T){if(!T||typeof T!="object"||Array.isArray(T))return;const A=T;y(o,ro,A.padTypes),y(l,Ac,A.comparisons),y(c,oo,A.activities),y(u,lo,A.fieldHalves),d=Array.isArray(A.playerIds)?new Set(A.playerIds.filter(v=>typeof v=="string")):null,h=a===null&&d!==null,m(a),n.refreshTimelineRanges?.(),n.rerenderCurrentState?.(),n.requestConfigSync?.()}return{setup(T){a!==T.replay&&(a=T.replay,h?h=!1:d=null),r=T.statsTimeline,m(T.replay)},teardown(){},getConfig:C,applyConfig:M,getTimelineRangeOptions(){const T={padTypes:o,comparisons:l,activities:c,fieldHalves:u};return d&&(T.playerIds=d),T},includePickup:x,renderSettings(T,A){if(!e){e=document.createElement("div"),e.className="boost-pickup-filter-panel";const v=document.createElement("div");v.className="boost-pickup-filter-summary",t=document.createElement("strong"),t.className="metric-readout",v.append(t);const b=document.createElement("div");b.className="boost-pickup-filter-grid",b.append(p("Pad type",ro,o,"pad-type"),p("Activity",oo,c,"activity"),p("Field half",lo,u,"field-half"),g()),(A.showHeader??!1)&&e.append(v),e.append(b)}return _(T?.replay??null),m(T?.replay??null),e}}}function vn(n){return{id:n.id,label:n.label,setup(){},teardown(){},onBeforeRender(){},getTimelineEvents:n.getTimelineEvents,renderStats(e,t){const i=Et(t.statsFrameLookup,e);return i?jt(i.players,s=>Ht(s.name,s.is_team_0,n.render(n.select(s),s))):""},renderFocusedPlayerStats(e,t,i){const s=zt(i,t,e);return s?n.render(n.select(s),s):""}}}const TC=255;function Zg(n){return n*100/TC}function In(n){return n==null?"?":Zg(n).toFixed(0)}function AC(n,e){const t=In(n);if(n==null||e==null)return t;const i=In(n+e);return`${t} (${i})`}function Cc(n){n&&typeof n=="object"&&"dispose"in n&&typeof n.dispose=="function"&&n.dispose()}function CC(n){n&&(n.removeFromParent(),n.traverse(e=>{const t="geometry"in e?e.geometry:null;Cc(t);const i="material"in e?e.material:null;if(Array.isArray(i))for(const s of i)Cc(s);else Cc(i)}))}function RC(){let n=0,e=null;return{acquire(t){e||(e=b1(t.player.sceneState.scene,t.fieldScale)),n+=1},release(){n<=0||(n-=1,n===0&&(CC(e),e=null))}}}const cp=RC();function ke(n){return n===void 0||Number.isNaN(n)?"?":`${Math.round(n)}`}function _e(n,e=1,t=""){return n===void 0||Number.isNaN(n)?"?":`${n.toFixed(e)}${t}`}function Ou(n,e=0){return _e(n,e,"%")}function Kg(n,e,t=1,i=0){if(n===void 0||Number.isNaN(n))return Ou(e,i);const s=_e(n,t,"s");return e===void 0||Number.isNaN(e)?s:`${s} (${Ou(e,i)})`}function ns(n,e,t=1,i=0){const s=n!==void 0&&e!==void 0&&!Number.isNaN(n)&&!Number.isNaN(e)&&e>0?n*100/e:void 0;return Kg(n,s,t,i)}function Ye(n){return typeof n=="number"&&Number.isFinite(n)?n:void 0}function Zn(n){const e=Ye(n);return e===void 0?void 0:e*100}function jg(n){return Ye(n?.tracked_time)}function PC(n,e,t){const i=Ye(n?.[e]);if(i!==void 0)return i;const s=jg(n),a=Ye(n?.[t]);if(!(s===void 0||s<=0||a===void 0))return a*100/s}function en(n,e,t){return Kg(Ye(n?.[t]),PC(n,e,t))}function up(n,e,t){const i=Ye(n?.[e]);if(i!==void 0)return i;const s=jg(n),a=Ye(n?.[t]);if(!(s===void 0||s<=0||a===void 0))return a/s}function dp(n){return`
    <div class="stat-row"><span class="label">Most back</span><span class="value">${en(n,"percent_most_back","time_most_back")}</span></div>
    <div class="stat-row"><span class="label">Most forward</span><span class="value">${en(n,"percent_most_forward","time_most_forward")}</span></div>
    <div class="stat-row"><span class="label">Mid role</span><span class="value">${en(n,"percent_mid_role","time_mid_role")}</span></div>
    <div class="stat-row"><span class="label">Other role</span><span class="value">${en(n,"percent_other_role","time_other_role")}</span></div>
    <div class="stat-row"><span class="label">Closest to ball</span><span class="value">${en(n,"percent_closest_to_ball","time_closest_to_ball")}</span></div>
    <div class="stat-row"><span class="label">Farthest from ball</span><span class="value">${en(n,"percent_farthest_from_ball","time_farthest_from_ball")}</span></div>
    <div class="stat-row"><span class="label">Behind ball</span><span class="value">${en(n,"percent_behind_ball","time_behind_ball")}</span></div>
    <div class="stat-row"><span class="label">Level with ball</span><span class="value">${en(n,"percent_level_with_ball","time_level_with_ball")}</span></div>
    <div class="stat-row"><span class="label">In front of ball</span><span class="value">${en(n,"percent_in_front_of_ball","time_in_front_of_ball")}</span></div>
  `}function hp(n){return`
    <div class="stat-row"><span class="label">Defensive zone</span><span class="value">${en(n,"percent_defensive_third","time_defensive_third")}</span></div>
    <div class="stat-row"><span class="label">Neutral zone</span><span class="value">${en(n,"percent_neutral_third","time_neutral_third")}</span></div>
    <div class="stat-row"><span class="label">Offensive zone</span><span class="value">${en(n,"percent_offensive_third","time_offensive_third")}</span></div>
    <div class="stat-row"><span class="label">Defensive half</span><span class="value">${en(n,"percent_defensive_half","time_defensive_half")}</span></div>
    <div class="stat-row"><span class="label">Offensive half</span><span class="value">${en(n,"percent_offensive_half","time_offensive_half")}</span></div>
    <div class="stat-row"><span class="label">To teammates</span><span class="value">${_e(up(n,"average_distance_to_teammates","sum_distance_to_teammates"),0)}</span></div>
    <div class="stat-row"><span class="label">To ball</span><span class="value">${_e(up(n,"average_distance_to_ball","sum_distance_to_ball"),0)}</span></div>
  `}function es(n,e){return ns(Ye(n?.[e]),Ye(n?.tracked_time))}function fp(n){return n?n.split("_").map(e=>e.charAt(0).toUpperCase()+e.slice(1)).join(" "):"?"}function LC(n){return`
    <div class="stat-row"><span class="label">Current role</span><span class="value">${fp(n?.current_role_state)}</span></div>
    <div class="stat-row"><span class="label">Current depth</span><span class="value">${fp(n?.current_depth_state)}</span></div>
    <div class="stat-row"><span class="label">First man</span><span class="value">${es(n,"time_first_man")}</span></div>
    <div class="stat-row"><span class="label">Second man</span><span class="value">${es(n,"time_second_man")}</span></div>
    <div class="stat-row"><span class="label">Third man</span><span class="value">${es(n,"time_third_man")}</span></div>
    <div class="stat-row"><span class="label">Ambiguous</span><span class="value">${es(n,"time_ambiguous_role")}</span></div>
    <div class="stat-row"><span class="label">Behind play</span><span class="value">${es(n,"time_behind_play")}</span></div>
    <div class="stat-row"><span class="label">Level with play</span><span class="value">${es(n,"time_level_with_play")}</span></div>
    <div class="stat-row"><span class="label">Ahead of play</span><span class="value">${es(n,"time_ahead_of_play")}</span></div>
    <div class="stat-row"><span class="label">Became first</span><span class="value">${ke(n?.became_first_man_count)}</span></div>
    <div class="stat-row"><span class="label">Lost first</span><span class="value">${ke(n?.lost_first_man_count)}</span></div>
  `}function IC(n){const e=n&&n.shots>0?n.goals*100/n.shots:void 0;return`
    <div class="stat-row"><span class="label">Score</span><span class="value">${ke(n?.score)}</span></div>
    <div class="stat-row"><span class="label">Goals</span><span class="value">${ke(n?.goals)}</span></div>
    <div class="stat-row"><span class="label">Assists</span><span class="value">${ke(n?.assists)}</span></div>
    <div class="stat-row"><span class="label">Saves</span><span class="value">${ke(n?.saves)}</span></div>
    <div class="stat-row"><span class="label">Shots</span><span class="value">${ke(n?.shots)}</span></div>
    <div class="stat-row"><span class="label">Shooting %</span><span class="value">${Ou(e)}</span></div>
  `}function NC(n){return`
    <div class="stat-row"><span class="label">Hits</span><span class="value">${ke(n?.count)}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${_e(Ye(n?.time_since_last_backboard),2,"s")}</span></div>
  `}function DC(n){return`
    <div class="stat-row"><span class="label">Count</span><span class="value">${ke(n?.count)}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${_e(Ye(n?.time_since_last_double_tap),2,"s")}</span></div>
  `}function UC(n){const e=n&&n.completed_pass_count>0?n.total_pass_distance/n.completed_pass_count:void 0,t=n&&n.completed_pass_count>0?n.total_pass_advance/n.completed_pass_count:void 0;return`
    <div class="stat-row"><span class="label">Completed</span><span class="value">${ke(n?.completed_pass_count)}</span></div>
    <div class="stat-row"><span class="label">Received</span><span class="value">${ke(n?.received_pass_count)}</span></div>
    <div class="stat-row"><span class="label">Avg distance</span><span class="value">${_e(e,0)}</span></div>
    <div class="stat-row"><span class="label">Avg advance</span><span class="value">${_e(t,0)}</span></div>
    <div class="stat-row"><span class="label">Longest</span><span class="value">${_e(n?.longest_pass_distance,0)}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${_e(Ye(n?.time_since_last_completed_pass),2,"s")}</span></div>
  `}function FC(n){const e=n&&n.count>0?n.total_ball_speed/n.count:void 0,t=n&&n.count>0?n.total_pass_distance/n.count:void 0;return`
    <div class="stat-row"><span class="label">Attempts</span><span class="value">${ke(n?.count)}</span></div>
    <div class="stat-row"><span class="label">Avg speed</span><span class="value">${_e(e,0)}</span></div>
    <div class="stat-row"><span class="label">Fastest</span><span class="value">${_e(n?.fastest_ball_speed,0)}</span></div>
    <div class="stat-row"><span class="label">Avg pass distance</span><span class="value">${_e(t,0)}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${_e(Ye(n?.time_since_last_one_timer),2,"s")}</span></div>
  `}function pp(n){const e=n&&n.count>0?n.cumulative_confidence/n.count:void 0;return`
    <div class="stat-row"><span class="label">Attempts</span><span class="value">${ke(n?.count)}</span></div>
    <div class="stat-row"><span class="label">High conf</span><span class="value">${ke(n?.high_confidence_count)}</span></div>
    <div class="stat-row"><span class="label">Last quality</span><span class="value">${_e(Ye(n?.last_confidence),0,"%")}</span></div>
    <div class="stat-row"><span class="label">Avg quality</span><span class="value">${_e(e,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Best quality</span><span class="value">${_e(Ye(n?.best_confidence),0,"%")}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${_e(Ye(n?.time_since_last_ceiling_shot),2,"s")}</span></div>
  `}function mp(n){const e=n&&n.count>0?n.cumulative_confidence/n.count:void 0,t=Zn(e),i=n&&n.count>0?n.cumulative_setup_duration/n.count:void 0,s=n&&n.count>0?n.cumulative_takeoff_to_touch_time/n.count:void 0,a=n&&n.count>0?n.cumulative_touch_height/n.count:void 0;return`
    <div class="stat-row"><span class="label">Plays</span><span class="value">${ke(n?.count)}</span></div>
    <div class="stat-row"><span class="label">High conf</span><span class="value">${ke(n?.high_confidence_count)}</span></div>
    <div class="stat-row"><span class="label">Last quality</span><span class="value">${_e(Zn(n?.last_confidence),0,"%")}</span></div>
    <div class="stat-row"><span class="label">Avg quality</span><span class="value">${_e(t,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Avg setup</span><span class="value">${_e(i,2,"s")}</span></div>
    <div class="stat-row"><span class="label">Avg takeoff</span><span class="value">${_e(s,2,"s")}</span></div>
    <div class="stat-row"><span class="label">Avg height</span><span class="value">${_e(a,0)}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${_e(Ye(n?.time_since_last_wall_aerial),2,"s")}</span></div>
  `}function gp(n){const e=n&&n.count>0?n.cumulative_confidence/n.count:void 0,t=n&&n.count>0?n.cumulative_takeoff_to_shot_time/n.count:void 0,i=n&&n.count>0?n.cumulative_shot_height/n.count:void 0;return`
    <div class="stat-row"><span class="label">Shots</span><span class="value">${ke(n?.count)}</span></div>
    <div class="stat-row"><span class="label">High conf</span><span class="value">${ke(n?.high_confidence_count)}</span></div>
    <div class="stat-row"><span class="label">Last quality</span><span class="value">${_e(Zn(n?.last_confidence),0,"%")}</span></div>
    <div class="stat-row"><span class="label">Avg quality</span><span class="value">${_e(Zn(e),0,"%")}</span></div>
    <div class="stat-row"><span class="label">Avg takeoff</span><span class="value">${_e(t,2,"s")}</span></div>
    <div class="stat-row"><span class="label">Avg height</span><span class="value">${_e(i,0)}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${_e(Ye(n?.time_since_last_wall_aerial_shot),2,"s")}</span></div>
  `}function OC(n){const e=n&&n.carry_count>0?n.average_horizontal_gap_sum/n.carry_count:void 0;return`
    <div class="stat-row"><span class="label">Carries</span><span class="value">${ke(n?.carry_count)}</span></div>
    <div class="stat-row"><span class="label">Total time</span><span class="value">${_e(n?.total_carry_time,1,"s")}</span></div>
    <div class="stat-row"><span class="label">Longest</span><span class="value">${_e(n?.longest_carry_time,1,"s")}</span></div>
    <div class="stat-row"><span class="label">Furthest</span><span class="value">${_e(n?.furthest_carry_distance,0)}</span></div>
    <div class="stat-row"><span class="label">Avg gap</span><span class="value">${_e(e,0)}</span></div>
  `}function kC(n){const e=n&&n.count>0?n.average_horizontal_gap_sum/n.count:void 0,t=n&&n.count>0?n.total_touch_count/n.count:void 0;return`
    <div class="stat-row"><span class="label">Air dribbles</span><span class="value">${ke(n?.count)}</span></div>
    <div class="stat-row"><span class="label">Ground to air</span><span class="value">${ke(n?.ground_to_air_count)}</span></div>
    <div class="stat-row"><span class="label">Wall to air</span><span class="value">${ke(n?.wall_to_air_count)}</span></div>
    <div class="stat-row"><span class="label">Avg touches</span><span class="value">${_e(t,1)}</span></div>
    <div class="stat-row"><span class="label">Max touches</span><span class="value">${ke(n?.max_touch_count)}</span></div>
    <div class="stat-row"><span class="label">Total time</span><span class="value">${_e(n?.total_time,1,"s")}</span></div>
    <div class="stat-row"><span class="label">Longest</span><span class="value">${_e(n?.longest_time,1,"s")}</span></div>
    <div class="stat-row"><span class="label">Furthest</span><span class="value">${_e(n?.furthest_distance,0)}</span></div>
    <div class="stat-row"><span class="label">Avg gap</span><span class="value">${_e(e,0)}</span></div>
  `}function BC(n){const e=n&&n.press_count>0?n.total_duration/n.press_count:void 0;return`
    <div class="stat-row"><span class="label">Presses</span><span class="value">${ke(n?.press_count)}</span></div>
    <div class="stat-row"><span class="label">Total time</span><span class="value">${_e(n?.total_duration,1,"s")}</span></div>
    <div class="stat-row"><span class="label">Avg duration</span><span class="value">${_e(e,2,"s")}</span></div>
  `}function zC(n){const e=n&&n.whiff_count>0?n.cumulative_closest_approach_distance/n.whiff_count:void 0;return`
    <div class="stat-row"><span class="label">Whiffs</span><span class="value">${ke(n?.whiff_count)}</span></div>
    <div class="stat-row"><span class="label">Beaten to ball</span><span class="value">${ke(n?.beaten_to_ball_count)}</span></div>
    <div class="stat-row"><span class="label">Grounded</span><span class="value">${ke(n?.grounded_whiff_count)}</span></div>
    <div class="stat-row"><span class="label">Aerial</span><span class="value">${ke(n?.aerial_whiff_count)}</span></div>
    <div class="stat-row"><span class="label">Dodge</span><span class="value">${ke(n?.dodge_whiff_count)}</span></div>
    <div class="stat-row"><span class="label">Last closest</span><span class="value">${_e(Ye(n?.last_closest_approach_distance),0)}</span></div>
    <div class="stat-row"><span class="label">Best closest</span><span class="value">${_e(Ye(n?.best_closest_approach_distance),0)}</span></div>
    <div class="stat-row"><span class="label">Avg closest</span><span class="value">${_e(e,0)}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${_e(Ye(n?.time_since_last_whiff),2,"s")}</span></div>
  `}function HC(n){return`
    <div class="stat-row"><span class="label">Inflicted</span><span class="value">${ke(n?.demos_inflicted)}</span></div>
    <div class="stat-row"><span class="label">Taken</span><span class="value">${ke(n?.demos_taken)}</span></div>
  `}function VC(n){const e=n&&n.bumps_inflicted>0?n.cumulative_bump_strength/n.bumps_inflicted:void 0;return`
    <div class="stat-row"><span class="label">Inflicted</span><span class="value">${ke(n?.bumps_inflicted)}</span></div>
    <div class="stat-row"><span class="label">Taken</span><span class="value">${ke(n?.bumps_taken)}</span></div>
    <div class="stat-row"><span class="label">Team inflicted</span><span class="value">${ke(n?.team_bumps_inflicted)}</span></div>
    <div class="stat-row"><span class="label">Team taken</span><span class="value">${ke(n?.team_bumps_taken)}</span></div>
    <div class="stat-row"><span class="label">Last strength</span><span class="value">${_e(Ye(n?.last_bump_strength),0)}</span></div>
    <div class="stat-row"><span class="label">Max strength</span><span class="value">${_e(Ye(n?.max_bump_strength),0)}</span></div>
    <div class="stat-row"><span class="label">Avg strength</span><span class="value">${_e(e,0)}</span></div>
  `}function GC(n){return`
    <div class="stat-row"><span class="label">Refreshes</span><span class="value">${ke(n?.count)}</span></div>
    <div class="stat-row"><span class="label">Flip resets</span><span class="value">${ke(n?.on_ball_count)}</span></div>
  `}function _p(n){const e=n&&n.count>0?n.cumulative_confidence/n.count:void 0;return`
    <div class="stat-row"><span class="label">Attempts</span><span class="value">${ke(n?.count)}</span></div>
    <div class="stat-row"><span class="label">High conf</span><span class="value">${ke(n?.high_confidence_count)}</span></div>
    <div class="stat-row"><span class="label">Last quality</span><span class="value">${_e(Ye(n?.last_confidence),0,"%")}</span></div>
    <div class="stat-row"><span class="label">Avg quality</span><span class="value">${_e(e,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Best quality</span><span class="value">${_e(Ye(n?.best_confidence),0,"%")}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${_e(Ye(n?.time_since_last_musty),2,"s")}</span></div>
  `}function vp(n){const e=n&&n.count>0?n.cumulative_confidence/n.count:void 0,t=n&&n.count>0?n.cumulative_setup_duration/n.count:void 0,i=n&&n.count>0?n.cumulative_ball_speed_change/n.count:void 0;return`
    <div class="stat-row"><span class="label">Attempts</span><span class="value">${ke(n?.count)}</span></div>
    <div class="stat-row"><span class="label">High conf</span><span class="value">${ke(n?.high_confidence_count)}</span></div>
    <div class="stat-row"><span class="label">Last quality</span><span class="value">${_e(Ye(n?.last_confidence),0,"%")}</span></div>
    <div class="stat-row"><span class="label">Avg quality</span><span class="value">${_e(e,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Avg setup</span><span class="value">${_e(t,2,"s")}</span></div>
    <div class="stat-row"><span class="label">Avg impulse</span><span class="value">${_e(i,0,"uu/s")}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${_e(Ye(n?.time_since_last_flick),2,"s")}</span></div>
  `}function yp(n){const e=n&&n.count>0?n.cumulative_quality/n.count:void 0;return`
    <div class="stat-row"><span class="label">Attempts</span><span class="value">${ke(n?.count)}</span></div>
    <div class="stat-row"><span class="label">High conf</span><span class="value">${ke(n?.high_confidence_count)}</span></div>
    <div class="stat-row"><span class="label">Last quality</span><span class="value">${_e(Ye(n?.last_quality),0,"%")}</span></div>
    <div class="stat-row"><span class="label">Avg quality</span><span class="value">${_e(e,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Best quality</span><span class="value">${_e(Ye(n?.best_quality),0,"%")}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${_e(Ye(n?.time_since_last_speed_flip),2,"s")}</span></div>
  `}function bp(n){const e=n&&n.count>0?n.cumulative_quality/n.count:void 0,t=Zn(n?.last_quality),i=Zn(e),s=Zn(n?.best_quality);return`
    <div class="stat-row"><span class="label">Attempts</span><span class="value">${ke(n?.count)}</span></div>
    <div class="stat-row"><span class="label">High conf</span><span class="value">${ke(n?.high_confidence_count)}</span></div>
    <div class="stat-row"><span class="label">Last quality</span><span class="value">${_e(t,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Avg quality</span><span class="value">${_e(i,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Best quality</span><span class="value">${_e(s,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${_e(Ye(n?.time_since_last_half_flip),2,"s")}</span></div>
  `}function xp(n){const e=n&&n.count>0?n.cumulative_quality/n.count:void 0,t=Zn(n?.last_quality),i=Zn(e),s=Zn(n?.best_quality);return`
    <div class="stat-row"><span class="label">Attempts</span><span class="value">${ke(n?.count)}</span></div>
    <div class="stat-row"><span class="label">High conf</span><span class="value">${ke(n?.high_confidence_count)}</span></div>
    <div class="stat-row"><span class="label">Last quality</span><span class="value">${_e(t,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Avg quality</span><span class="value">${_e(i,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Best quality</span><span class="value">${_e(s,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${_e(Ye(n?.time_since_last_wavedash),2,"s")}</span></div>
  `}function Sp(n){const e=n&&n.tracked_time>0?Zg(n.boost_integral/n.tracked_time).toFixed(0):"?",t=Ye(n?.tracked_time);return`
    <div class="stat-row"><span class="label">Collected</span><span class="value">${AC(n?.amount_collected,n?.amount_respawned)}</span></div>
    <div class="stat-row"><span class="label">Inactive collected</span><span class="value">${In(n?.amount_collected_inactive)}</span></div>
    <div class="stat-row"><span class="label">Big pads amt</span><span class="value">${In(n?.amount_collected_big)}</span></div>
    <div class="stat-row"><span class="label">Small pads amt</span><span class="value">${In(n?.amount_collected_small)}</span></div>
    <div class="stat-row"><span class="label">Respawns</span><span class="value">${In(n?.amount_respawned)}</span></div>
    <div class="stat-row"><span class="label">Overfill</span><span class="value">${In(n?.overfill_total)}</span></div>
    <div class="stat-row"><span class="label">Used</span><span class="value">${In(n?.amount_used)}</span></div>
    <div class="stat-row"><span class="label">Used ground</span><span class="value">${In(n?.amount_used_while_grounded)}</span></div>
    <div class="stat-row"><span class="label">Used air</span><span class="value">${In(n?.amount_used_while_airborne)}</span></div>
    <div class="stat-row"><span class="label">Big pads</span><span class="value">${n?.big_pads_collected??"?"}</span></div>
    <div class="stat-row"><span class="label">Small pads</span><span class="value">${n?.small_pads_collected??"?"}</span></div>
    <div class="stat-row"><span class="label">Inactive big pads</span><span class="value">${n?.big_pads_collected_inactive??"?"}</span></div>
    <div class="stat-row"><span class="label">Inactive small pads</span><span class="value">${n?.small_pads_collected_inactive??"?"}</span></div>
    <div class="stat-row"><span class="label">Stolen</span><span class="value">${In(n?.amount_stolen)}</span></div>
    <div class="stat-row"><span class="label">Avg boost</span><span class="value">${e}</span></div>
    <div class="stat-row"><span class="label">Time @ 0</span><span class="value">${ns(Ye(n?.time_zero_boost),t)}</span></div>
    <div class="stat-row"><span class="label">Time 0-25</span><span class="value">${ns(Ye(n?.time_boost_0_25),t)}</span></div>
    <div class="stat-row"><span class="label">Time 25-50</span><span class="value">${ns(Ye(n?.time_boost_25_50),t)}</span></div>
    <div class="stat-row"><span class="label">Time 50-75</span><span class="value">${ns(Ye(n?.time_boost_50_75),t)}</span></div>
    <div class="stat-row"><span class="label">Time 75-100</span><span class="value">${ns(Ye(n?.time_boost_75_100),t)}</span></div>
    <div class="stat-row"><span class="label">Time @ 100</span><span class="value">${ns(Ye(n?.time_hundred_boost),t)}</span></div>
  `}function $C(n,e=Yg({refreshTimelineRanges:n.refreshTimelineRanges,rerenderCurrentState:n.rerenderCurrentState})){return{id:"boost",label:"Boost",setup(t){e.setup(t)},teardown(){e.teardown()},onBeforeRender(){},getTimelineRanges(t){return zA(t.statsTimeline,t.replay,e.getTimelineRangeOptions())},getConfig(){return e.getConfig()},applyConfig(t){e.applyConfig(t)},includeBoostPickupAnimationPickup(t){return e.includePickup(t)},renderStats(t,i){const s=Et(i.statsFrameLookup,t);return s?jt(s.players,a=>Ht(a.name,a.is_team_0,Sp(a.boost))):""},renderFocusedPlayerStats(t,i,s){const a=zt(s,i,t);return a?Sp(a.boost):""},renderSettings(t){return e.renderSettings(t,{showHeader:!0})}}}function WC(){return vn({id:"core",label:"Core",select:n=>n.core,render:n=>IC(n)})}function XC(){return vn({id:"backboard",label:"Backboard",select:n=>n.backboard,render:n=>NC(n),getTimelineEvents(n){return Sg(n.statsTimeline,n.replay)}})}function qC(){let n=null;return{id:"ceiling-shot",label:"Ceiling Shot",setup(e){n=new nA(e.player.sceneState,e.player.container,e.replay,e.statsTimeline)},teardown(){n?.dispose(),n=null},onBeforeRender(e){n?.update(e.currentTime)},getTimelineEvents(e){return wg(e.statsTimeline,e.replay)},renderStats(e,t){const i=Et(t.statsFrameLookup,e);return i?jt(i.players,s=>Ht(s.name,s.is_team_0,pp(s.ceiling_shot),s.ceiling_shot?.is_last_ceiling_shot?'<span class="role-indicator role-forward">Last Ceiling Shot</span>':"")):""},renderFocusedPlayerStats(e,t,i){const s=zt(i,t,e);return s?pp(s.ceiling_shot):""}}}function YC(){return{id:"wall-aerial",label:"Wall Aerial",setup(){},teardown(){},onBeforeRender(){},getTimelineEvents(n){return Eg(n.statsTimeline,n.replay)},renderStats(n,e){const t=Et(e.statsFrameLookup,n);return t?jt(t.players,i=>Ht(i.name,i.is_team_0,mp(i.wall_aerial),i.wall_aerial?.is_last_wall_aerial?'<span class="role-indicator role-forward">Last Wall Aerial</span>':"")):""},renderFocusedPlayerStats(n,e,t){const i=zt(t,e,n);return i?mp(i.wall_aerial):""}}}function ZC(){return{id:"wall-aerial-shot",label:"Wall Aerial Shot",setup(){},teardown(){},onBeforeRender(){},getTimelineEvents(n){return Mg(n.statsTimeline,n.replay)},renderStats(n,e){const t=Et(e.statsFrameLookup,n);return t?jt(t.players,i=>Ht(i.name,i.is_team_0,gp(i.wall_aerial_shot),i.wall_aerial_shot?.is_last_wall_aerial_shot?'<span class="role-indicator role-forward">Last Wall Aerial Shot</span>':"")):""},renderFocusedPlayerStats(n,e,t){const i=zt(t,e,n);return i?gp(i.wall_aerial_shot):""}}}function KC(){return vn({id:"ball-carry",label:"Ball Carry",select:n=>n.ball_carry,render:n=>OC(n),getTimelineEvents(n){return Ng(n.statsTimeline,n.replay)}})}function jC(){return vn({id:"air-dribble",label:"Air Dribble",select:n=>n.air_dribble,render:n=>kC(n)})}function JC(){return vn({id:"dodge-reset",label:"Dodge Refresh",select:n=>n.dodge_reset,render:n=>GC(n),getTimelineEvents(n){return Ig(n.statsTimeline,n.replay)}})}function QC(){return vn({id:"double-tap",label:"Double Tap",select:n=>n.double_tap,render:n=>DC(n),getTimelineEvents(n){return Tg(n.statsTimeline,n.replay)}})}function eR(){return vn({id:"pass",label:"Pass",select:n=>n.pass,render:n=>UC(n),getTimelineEvents(n){return Cg(n.statsTimeline,n.replay)}})}function tR(){return vn({id:"one-timer",label:"One-timer",select:n=>n.one_timer,render:n=>FC(n),getTimelineEvents(n){return Ag(n.statsTimeline,n.replay)}})}function nR(){return{id:"musty-flick",label:"Musty Flick",setup(){},teardown(){},onBeforeRender(){},getTimelineEvents(n){return yg(n.statsTimeline,n.replay)},renderStats(n,e){const t=Et(e.statsFrameLookup,n);return t?jt(t.players,i=>Ht(i.name,i.is_team_0,_p(i.musty_flick),i.musty_flick?.is_last_musty?'<span class="role-indicator role-forward">Last Musty</span>':"")):""},renderFocusedPlayerStats(n,e,t){const i=zt(t,e,n);return i?_p(i.musty_flick):""}}}function iR(){return{id:"flick",label:"Flick",setup(){},teardown(){},onBeforeRender(){},getTimelineEvents(n){return bg(n.statsTimeline,n.replay)},renderStats(n,e){const t=Et(e.statsFrameLookup,n);return t?jt(t.players,i=>Ht(i.name,i.is_team_0,vp(i.flick),i.flick?.is_last_flick?'<span class="role-indicator role-forward">Last Flick</span>':"")):""},renderFocusedPlayerStats(n,e,t){const i=zt(t,e,n);return i?vp(i.flick):""}}}function sR(){let n=null;return{id:"speed-flip",label:"Speed Flip",setup(e){n=new wC(e.player.sceneState,e.player.container,e.replay,e.statsTimeline)},teardown(){n?.dispose(),n=null},onBeforeRender(e){n?.update(e.currentTime)},getTimelineEvents(e){return Ug(e.statsTimeline,e.replay)},renderStats(e,t){const i=Et(t.statsFrameLookup,e);return i?jt(i.players,s=>Ht(s.name,s.is_team_0,yp(s.speed_flip),s.speed_flip?.is_last_speed_flip?'<span class="role-indicator role-forward">Last Speed Flip</span>':"")):""},renderFocusedPlayerStats(e,t,i){const s=zt(i,t,e);return s?yp(s.speed_flip):""}}}function aR(){return{id:"half-flip",label:"Half Flip",setup(){},teardown(){},onBeforeRender(){},getTimelineEvents(n){return Fg(n.statsTimeline,n.replay)},renderStats(n,e){const t=Et(e.statsFrameLookup,n);return t?jt(t.players,i=>Ht(i.name,i.is_team_0,bp(i.half_flip),i.half_flip?.is_last_half_flip?'<span class="role-indicator role-forward">Last Half Flip</span>':"")):""},renderFocusedPlayerStats(n,e,t){const i=zt(t,e,n);return i?bp(i.half_flip):""}}}function rR(){return{id:"wavedash",label:"Wavedash",setup(){},teardown(){},onBeforeRender(){},getTimelineEvents(n){return Og(n.statsTimeline,n.replay)},renderStats(n,e){const t=Et(e.statsFrameLookup,n);return t?jt(t.players,i=>Ht(i.name,i.is_team_0,xp(i.wavedash),i.wavedash?.is_last_wavedash?'<span class="role-indicator role-forward">Last Wavedash</span>':"")):""},renderFocusedPlayerStats(n,e,t){const i=zt(t,e,n);return i?xp(i.wavedash):""}}}function oR(n){let e=null,t=5,i="advancement",s=null,a=null,r=null,o=null;const l=new Set,c=["kind","height_band","surface","dodge_state"];return{id:"touch",label:"Touch",setup(h){e=new dA(h.player.sceneState,h.player.container,h.replay,h.statsTimeline,{mode:i}),e.setDecaySeconds(t),u()},teardown(){e?.dispose(),e=null},onBeforeRender(h){e?.update(h.currentTime)},getTimelineEvents(h){return xg(h.statsTimeline,h.replay)},getConfig(){return{decaySeconds:t,overlayMode:i,breakdownClasses:d()}},applyConfig(h){if(h&&typeof h=="object"&&!Array.isArray(h)){const p=h;if(typeof p.decaySeconds=="number"&&Number.isFinite(p.decaySeconds)&&(t=Math.max(1,Math.min(10,p.decaySeconds)),e?.setDecaySeconds(t)),(p.overlayMode==="markers"||p.overlayMode==="advancement")&&(i=p.overlayMode,e?.setMode(i)),l.clear(),Array.isArray(p.breakdownClasses))for(const g of p.breakdownClasses)c.includes(g)&&l.add(g)}u(),n.rerenderCurrentState()},renderStats(h,p){const g=Et(p.statsFrameLookup,h);return g?jt(g.players,_=>Ht(_.name,_.is_team_0,op(_.touch,{breakdownClasses:d()}),_.touch?.is_last_touch?'<span class="role-indicator role-forward">Last Touch</span>':"")):""},renderFocusedPlayerStats(h,p,g){const _=zt(g,p,h);return _?op(_.touch,{breakdownClasses:d()}):""},renderSettings(){if(!s){s=document.createElement("div"),s.className="module-settings-card";const h=document.createElement("div");h.className="module-settings-header";const p=document.createElement("div"),g=document.createElement("p");g.className="module-settings-eyebrow",g.textContent="Touch markers";const _=document.createElement("h3");_.textContent="Touch decay",p.append(g,_),a=document.createElement("strong"),a.className="metric-readout",h.append(p,a);const m=document.createElement("label"),f=document.createElement("span");f.className="label",f.textContent="Keep each marker visible after the touch";const w=document.createElement("input");w.type="range",w.min="1",w.max="10",w.step="0.5",w.value=`${t}`,w.addEventListener("input",()=>{const V=Number(w.value);t=Number.isFinite(V)?Math.max(1,Math.min(10,V)):t,e?.setDecaySeconds(t),u(t),n.requestConfigSync?.()}),m.append(f,w);const x=document.createElement("div");x.className="module-settings-subgroup";const y=document.createElement("div");y.className="module-settings-header";const C=document.createElement("div"),M=document.createElement("p");M.className="module-settings-eyebrow",M.textContent="Overlay";const T=document.createElement("h3");T.textContent="Touch mode",C.append(M,T),r=document.createElement("strong"),r.className="metric-readout",y.append(C,r);const A=document.createElement("div");A.className="module-settings-options";for(const V of[{mode:"markers",label:"Markers"},{mode:"advancement",label:"Advancement"}]){const O=document.createElement("label");O.className="toggle";const q=document.createElement("input");q.type="radio",q.name="touch-overlay-mode",q.dataset.overlayMode=V.mode,q.addEventListener("change",()=>{q.checked&&(i=V.mode,e?.setMode(i),u(),n.requestConfigSync?.())});const H=document.createElement("span");H.textContent=V.label,O.append(q,H),A.append(O)}x.append(y,A);const v=document.createElement("div");v.className="module-settings-subgroup";const b=document.createElement("div");b.className="module-settings-header";const R=document.createElement("div"),N=document.createElement("p");N.className="module-settings-eyebrow",N.textContent="Stat display";const k=document.createElement("h3");k.textContent="Touch breakdown",R.append(N,k),o=document.createElement("strong"),o.className="metric-readout",b.append(R,o);const z=document.createElement("div");z.className="module-settings-options";for(const V of[{className:"kind",label:"Kind"},{className:"height_band",label:"Height"},{className:"surface",label:"Surface"},{className:"dodge_state",label:"Dodge"}]){const O=document.createElement("label");O.className="toggle";const q=document.createElement("input");q.type="checkbox",q.dataset.breakdownClass=V.className,q.addEventListener("change",()=>{q.checked?l.add(V.className):l.delete(V.className),u(),n.rerenderCurrentState(),n.requestConfigSync?.()});const H=document.createElement("span");H.textContent=V.label,O.append(q,H),z.append(O)}v.append(b,z),s.append(h,m,x,v)}return u(),s}};function u(h){if(!s)return;const p=h??t,g=s.querySelector("input");g instanceof HTMLInputElement&&(g.value=`${p}`),a&&(a.textContent=`${p.toFixed(1)}s`);for(const _ of s.querySelectorAll("input[data-overlay-mode]"))_.checked=_.dataset.overlayMode===i;r&&(r.textContent=i==="advancement"?"Advancement":"Markers");for(const _ of s.querySelectorAll("input[data-breakdown-class]")){const m=_.dataset.breakdownClass;_.checked=m?l.has(m):!1}if(o){const _=d();o.textContent=_.length>0?_.map(m=>({kind:"Kind",height_band:"Height",surface:"Surface",dodge_state:"Dodge"})[m]).join(" + "):"Total only"}}function d(){return c.filter(h=>l.has(h))}}function lR(){return vn({id:"whiff",label:"Whiff",select:n=>n.whiff,render:n=>zC(n),getTimelineEvents(n){return Bg(n.statsTimeline,n.replay)}})}function cR(n){let e=null,t=null;const i=new Set,s=["speed_band","height_band"];return{id:"movement",label:"Movement",setup(){a()},teardown(){},onBeforeRender(){},getConfig(){return{breakdownClasses:r()}},applyConfig(o){if(i.clear(),o&&typeof o=="object"&&!Array.isArray(o)){const l=o.breakdownClasses;if(Array.isArray(l))for(const c of l)s.includes(c)&&i.add(c)}a(),n.rerenderCurrentState()},renderStats(o,l){const c=Et(l.statsFrameLookup,o);return c?jt(c.players,u=>Ht(u.name,u.is_team_0,ap(u.movement,{breakdownClasses:r()}))):""},renderFocusedPlayerStats(o,l,c){const u=zt(c,l,o);return u?ap(u.movement,{breakdownClasses:r()}):""},renderSettings(){if(!e){e=document.createElement("div"),e.className="module-settings-card";const o=document.createElement("div");o.className="module-settings-header";const l=document.createElement("div"),c=document.createElement("p");c.className="module-settings-eyebrow",c.textContent="Stat display";const u=document.createElement("h3");u.textContent="Movement breakdown",l.append(c,u),t=document.createElement("strong"),t.className="metric-readout",o.append(l,t);const d=document.createElement("div");d.className="module-settings-options";for(const h of[{className:"speed_band",label:"Speed band"},{className:"height_band",label:"Height band"}]){const p=document.createElement("label");p.className="toggle";const g=document.createElement("input");g.type="checkbox",g.dataset.breakdownClass=h.className,g.addEventListener("change",()=>{g.checked?i.add(h.className):i.delete(h.className),a(),n.rerenderCurrentState(),n.requestConfigSync?.()});const _=document.createElement("span");_.textContent=h.label,p.append(g,_),d.append(p)}e.append(o,d)}return a(),e}};function a(){if(e){for(const o of e.querySelectorAll("input[data-breakdown-class]")){const l=o.dataset.breakdownClass;o.checked=l?i.has(l):!1}if(t){const o=r();t.textContent=o.length>0?o.map(l=>({speed_band:"Speed band",height_band:"Height band"})[l]).join(" + "):"Total only"}}}function r(){return s.filter(o=>i.has(o))}}function uR(){return vn({id:"powerslide",label:"Powerslide",select:n=>n.powerslide,render:n=>BC(n),getTimelineEvents(n){return Dg(n.statsTimeline,n.replay)}})}function dR(){return vn({id:"rotation",label:"Rotation",select:n=>n.rotation,render:n=>LC(n)})}function hR(){return vn({id:"demo",label:"Demo",select:n=>n.demo,render:n=>HC(n)})}function fR(){return vn({id:"bump",label:"Bump",select:n=>n.bump,render:n=>VC(n),getTimelineEvents(n){return kg(n.statsTimeline,n.replay)}})}function pR(){let n=null,e=1;return{id:Wg,label:"Relative Positioning",setup(t){e=t.fieldScale,n=new _1(t.player.sceneState.scene,t.replay,e)},teardown(){n?.dispose(),n=null},onBeforeRender(t){n?.update(t,e)},renderStats(t,i){const s=Et(i.statsFrameLookup,t);return s?jt(s.players,a=>{const r=ZA(i.replay,nt(a.player_id),t),o=YA[r];return Ht(a.name,a.is_team_0,dp(a.positioning),`<span class="depth-indicator depth-${r}" title="Team Depth: ${o}" aria-label="Team Depth: ${o}">${o}</span>`)}):""},renderFocusedPlayerStats(t,i,s){const a=zt(s,i,t);return a?dp(a.positioning):""}}}function mR(){return{id:"absolute-positioning",label:"Absolute Positioning",setup(n){cp.acquire(n)},teardown(){cp.release()},onBeforeRender(){},getTimelineRanges(n){return WA(n.statsTimeline,n.replay)},renderStats(n,e){const t=Et(e.statsFrameLookup,n);return t?jt(t.players,i=>Ht(i.name,i.is_team_0,hp(i.positioning))):""},renderFocusedPlayerStats(n,e,t){const i=zt(t,e,n);return i?hp(i.positioning):""}}}function gR(n,e={}){return[WC(),XC(),qC(),YC(),ZC(),QC(),tR(),eR(),KA(n),jA(),JA(),QA(),pR(),mR(),dR(),sR(),aR(),rR(),oR(n),lR(),iR(),nR(),JC(),jC(),$C(n,e.boostPickupFilters),KC(),cR(n),uR(),hR(),fR()]}function _R(n){const e={};for(const t of n)if(t.getConfig){if(Object.hasOwn(e,t.id))throw new Error(`Duplicate stats player config adapter id: ${t.id}`);e[t.id]=t.getConfig()}return e}function vR(n,e){for(const t of n)if(t.applyConfig){if(Object.hasOwn(e,t.id)){t.applyConfig(e[t.id]);continue}for(const i of t.aliases??[])if(Object.hasOwn(e,i)){t.applyConfig(e[i]);break}}}function Jg(n,e){return n}function qo(n){return Jg({fifty_fifty:{count:0,wins:0,losses:0,neutral_outcomes:0,kickoff_count:0,kickoff_wins:0,kickoff_losses:0,kickoff_neutral_outcomes:0,possession_after_count:0,opponent_possession_after_count:0,neutral_possession_after_count:0,kickoff_possession_after_count:0,kickoff_opponent_possession_after_count:0,kickoff_neutral_possession_after_count:0},possession:{tracked_time:0,possession_time:0,opponent_possession_time:0,neutral_time:0,labeled_time:{entries:[]}},pressure:{tracked_time:0,defensive_half_time:0,offensive_half_time:0,neutral_time:0,labeled_time:{entries:[]}},rotation:{first_man_changes_for_team:0,rotation_count:0},rush:{count:0,two_v_one_count:0,two_v_two_count:0,two_v_three_count:0,three_v_one_count:0,three_v_two_count:0,three_v_three_count:0},core:{score:0,goals:0,assists:0,saves:0,shots:0,kickoff_goal_count:0,short_goal_count:0,medium_goal_count:0,long_goal_count:0,counter_attack_goal_count:0,sustained_pressure_goal_count:0,other_buildup_goal_count:0,goal_ball_air_time_sample_count:0,cumulative_goal_ball_air_time:0,last_goal_ball_air_time:null},backboard:{count:0},double_tap:{count:0},one_timer:{count:0,total_ball_speed:0,fastest_ball_speed:0},half_volley:{count:0,total_ball_speed:0,fastest_ball_speed:0},pass:{completed_pass_count:0,total_pass_distance:0,total_pass_advance:0,longest_pass_distance:0},ball_carry:{carry_count:0,total_carry_time:0,total_straight_line_distance:0,total_path_distance:0,longest_carry_time:0,furthest_carry_distance:0,fastest_carry_speed:0,carry_speed_sum:0,average_horizontal_gap_sum:0,average_vertical_gap_sum:0},air_dribble:{count:0,ground_to_air_count:0,wall_to_air_count:0,total_touch_count:0,max_touch_count:0,total_time:0,total_straight_line_distance:0,total_path_distance:0,longest_time:0,furthest_distance:0,fastest_speed:0,speed_sum:0,average_horizontal_gap_sum:0,average_vertical_gap_sum:0},boost:{tracked_time:0,boost_integral:0,time_zero_boost:0,time_hundred_boost:0,time_boost_0_25:0,time_boost_25_50:0,time_boost_50_75:0,time_boost_75_100:0,amount_collected:0,amount_collected_inactive:0,big_pads_collected_inactive:0,small_pads_collected_inactive:0,amount_stolen:0,big_pads_collected:0,small_pads_collected:0,big_pads_stolen:0,small_pads_stolen:0,amount_collected_big:0,amount_stolen_big:0,amount_collected_small:0,amount_stolen_small:0,amount_respawned:0,overfill_total:0,overfill_from_stolen:0,amount_used:0,amount_used_while_grounded:0,amount_used_while_airborne:0,amount_used_while_supersonic:0},movement:{tracked_time:0,total_distance:0,speed_integral:0,time_slow_speed:0,time_boost_speed:0,time_supersonic_speed:0,time_on_ground:0,time_low_air:0,time_high_air:0,labeled_tracked_time:{entries:[]}},powerslide:{total_duration:0,press_count:0},demo:{demos_inflicted:0},bump:{bumps_inflicted:0,team_bumps_inflicted:0}})}function Qg(n){return Jg({player_id:{Steam:"test-player"},name:"Test Player",is_team_0:!0,core:{score:0,goals:0,assists:0,saves:0,shots:0,goals_conceded_while_last_defender:0,goals_for_while_most_back:0,goals_against_while_most_back:0,goal_against_boost_sample_count:0,cumulative_boost_on_goals_against:0,last_boost_on_goal_against:null,goal_against_boost_leadup_sample_count:0,cumulative_average_boost_in_goal_against_leadup:0,cumulative_min_boost_in_goal_against_leadup:0,last_average_boost_in_goal_against_leadup:null,last_min_boost_in_goal_against_leadup:null,goal_against_position_sample_count:0,cumulative_goal_against_position_x:0,cumulative_goal_against_position_y:0,cumulative_goal_against_position_z:0,last_goal_against_position:null,scoring_goal_last_touch_position_sample_count:0,cumulative_scoring_goal_last_touch_position_x:0,cumulative_scoring_goal_last_touch_position_y:0,cumulative_scoring_goal_last_touch_position_z:0,last_scoring_goal_last_touch_position:null,kickoff_goal_count:0,short_goal_count:0,medium_goal_count:0,long_goal_count:0,counter_attack_goal_count:0,sustained_pressure_goal_count:0,other_buildup_goal_count:0,goal_ball_air_time_sample_count:0,cumulative_goal_ball_air_time:0,last_goal_ball_air_time:null},backboard:{count:0,is_last_backboard:!1,last_backboard_time:null,last_backboard_frame:null,time_since_last_backboard:null,frames_since_last_backboard:null},ceiling_shot:{count:0,high_confidence_count:0,is_last_ceiling_shot:!1,last_ceiling_shot_time:null,last_ceiling_shot_frame:null,time_since_last_ceiling_shot:null,frames_since_last_ceiling_shot:null,last_confidence:null,best_confidence:0,cumulative_confidence:0},wall_aerial:{count:0,high_confidence_count:0,is_last_wall_aerial:!1,last_wall_aerial_time:null,last_wall_aerial_frame:null,time_since_last_wall_aerial:null,frames_since_last_wall_aerial:null,last_confidence:null,best_confidence:0,cumulative_confidence:0,cumulative_setup_duration:0,cumulative_takeoff_to_touch_time:0,cumulative_touch_height:0},wall_aerial_shot:{count:0,high_confidence_count:0,is_last_wall_aerial_shot:!1,last_wall_aerial_shot_time:null,last_wall_aerial_shot_frame:null,time_since_last_wall_aerial_shot:null,frames_since_last_wall_aerial_shot:null,last_confidence:null,best_confidence:0,cumulative_confidence:0,cumulative_takeoff_to_shot_time:0,cumulative_shot_height:0},double_tap:{count:0,is_last_double_tap:!1,last_double_tap_time:null,last_double_tap_frame:null,time_since_last_double_tap:null,frames_since_last_double_tap:null},one_timer:{count:0,total_ball_speed:0,fastest_ball_speed:0,total_pass_distance:0,is_last_one_timer:!1,last_one_timer_time:null,last_one_timer_frame:null,time_since_last_one_timer:null,frames_since_last_one_timer:null},pass:{completed_pass_count:0,received_pass_count:0,total_pass_distance:0,total_pass_advance:0,longest_pass_distance:0,is_last_completed_pass:!1,last_completed_pass_time:null,last_completed_pass_frame:null,time_since_last_completed_pass:null,frames_since_last_completed_pass:null},fifty_fifty:{count:0,wins:0,losses:0,neutral_outcomes:0,kickoff_count:0,kickoff_wins:0,kickoff_losses:0,kickoff_neutral_outcomes:0,possession_after_count:0,kickoff_possession_after_count:0},speed_flip:{count:0,high_confidence_count:0,is_last_speed_flip:!1,last_speed_flip_time:null,last_speed_flip_frame:null,time_since_last_speed_flip:null,frames_since_last_speed_flip:null,last_quality:null,best_quality:0,cumulative_quality:0},half_flip:{count:0,high_confidence_count:0,is_last_half_flip:!1,last_half_flip_time:null,last_half_flip_frame:null,time_since_last_half_flip:null,frames_since_last_half_flip:null,last_quality:null,best_quality:0,cumulative_quality:0},half_volley:{count:0,total_ball_speed:0,fastest_ball_speed:0,is_last_half_volley:!1,last_half_volley_time:null,last_half_volley_frame:null,time_since_last_half_volley:null,frames_since_last_half_volley:null},wavedash:{count:0,high_confidence_count:0,is_last_wavedash:!1,last_wavedash_time:null,last_wavedash_frame:null,time_since_last_wavedash:null,frames_since_last_wavedash:null,last_quality:null,best_quality:0,cumulative_quality:0},touch:{touch_count:0,control_touch_count:0,medium_hit_count:0,hard_hit_count:0,aerial_touch_count:0,high_aerial_touch_count:0,wall_touch_count:0,is_last_touch:!1,last_touch_time:null,last_touch_frame:null,time_since_last_touch:null,frames_since_last_touch:null,last_ball_speed_change:null,max_ball_speed_change:0,cumulative_ball_speed_change:0,total_ball_travel_distance:0,total_ball_advance_distance:0,total_ball_retreat_distance:0,labeled_touch_counts:{entries:[]}},whiff:{whiff_count:0,beaten_to_ball_count:0,grounded_whiff_count:0,aerial_whiff_count:0,dodge_whiff_count:0,is_last_whiff:!1,last_whiff_time:null,last_whiff_frame:null,time_since_last_whiff:null,frames_since_last_whiff:null,last_closest_approach_distance:null,best_closest_approach_distance:null,cumulative_closest_approach_distance:0},flick:{count:0,high_confidence_count:0,is_last_flick:!1,last_flick_time:null,last_flick_frame:null,time_since_last_flick:null,frames_since_last_flick:null,last_confidence:null,best_confidence:0,cumulative_confidence:0,cumulative_setup_duration:0,cumulative_ball_speed_change:0},musty_flick:{count:0,aerial_count:0,high_confidence_count:0,is_last_musty:!1,last_musty_time:null,last_musty_frame:null,time_since_last_musty:null,frames_since_last_musty:null,last_confidence:null,best_confidence:0,cumulative_confidence:0},dodge_reset:{count:0,on_ball_count:0},ball_carry:{carry_count:0,total_carry_time:0,total_straight_line_distance:0,total_path_distance:0,longest_carry_time:0,furthest_carry_distance:0,fastest_carry_speed:0,carry_speed_sum:0,average_horizontal_gap_sum:0,average_vertical_gap_sum:0},air_dribble:{count:0,ground_to_air_count:0,wall_to_air_count:0,total_touch_count:0,max_touch_count:0,total_time:0,total_straight_line_distance:0,total_path_distance:0,longest_time:0,furthest_distance:0,fastest_speed:0,speed_sum:0,average_horizontal_gap_sum:0,average_vertical_gap_sum:0},boost:qo().boost,movement:qo().movement,positioning:{active_game_time:0,tracked_time:0,sum_distance_to_teammates:0,sum_distance_to_ball:0,sum_distance_to_ball_has_possession:0,time_has_possession:0,sum_distance_to_ball_no_possession:0,time_no_possession:0,time_demolished:0,time_no_teammates:0,time_most_back:0,time_most_forward:0,time_mid_role:0,time_other_role:0,time_defensive_third:0,time_neutral_third:0,time_offensive_third:0,time_defensive_half:0,time_offensive_half:0,time_closest_to_ball:0,time_farthest_from_ball:0,time_behind_ball:0,time_level_with_ball:0,time_in_front_of_ball:0,times_caught_ahead_of_play_on_conceded_goals:0},rotation:{active_game_time:0,tracked_time:0,time_first_man:0,time_second_man:0,time_third_man:0,time_ambiguous_role:0,time_behind_play:0,time_level_with_play:0,time_ahead_of_play:0,became_first_man_count:0,lost_first_man_count:0,current_role_state:"unknown",current_depth_state:"unknown"},powerslide:{total_duration:0,press_count:0},demo:{demos_inflicted:0,demos_taken:0},bump:{bumps_inflicted:0,bumps_taken:0,team_bumps_inflicted:0,team_bumps_taken:0,last_bump_time:null,last_bump_frame:null,last_bump_strength:null,max_bump_strength:0,cumulative_bump_strength:0}})}const yR=new Set(["player_id","name","is_team_0"]);function bR(n){return n===null||typeof n=="number"||typeof n=="string"||typeof n=="boolean"||Array.isArray(n)}function xR(n,e){let t=n;for(const i of e){if(!t||typeof t!="object"||Array.isArray(t))return;t=t[i]}return t}function SR(n){return n==null?"--":typeof n=="number"?Number.isFinite(n)?Number.isInteger(n)?`${n}`:`${Number(n.toFixed(3))}`:"--":typeof n=="boolean"?n?"true":"false":Array.isArray(n)?n.length===0?"[]":JSON.stringify(n):`${n}`}function ku(n,e,t,i){if(!(!n||typeof n!="object"||Array.isArray(n)))for(const[s,a]of Object.entries(n)){if(e==="player"&&t.length===0&&yR.has(s))continue;const r=[...t,s];if(bR(a)){const o=`${e}:${r.join(".")}`;i.push({id:o,label:r.join("."),category:r[0]??e,scope:e,path:r,read(l){return xR(l,r)},format:SR});continue}ku(a,e,r,i)}}function wR(n){const e=new Set;return n.filter(t=>e.has(t.id)?!1:(e.add(t.id),!0))}function e_(n,e){const t=[];return n&&ku(n,"player",[],t),e&&ku(e,"team",[],t),wR(t).sort((i,s)=>i.label.localeCompare(s.label))}function ER(){return e_(Qg(),qo())}function Yo(n){return n?e_(n.players[0]??Qg(),n.team_zero??n.team_one??qo()):ER()}function t_(n){return n.toLowerCase().replace(/[_/.-]+/g," ").replace(/\s+/g," ").trim()}function MR(n){return t_(n).split(" ").filter(Boolean)}function TR(n,e){const t=MR(e);if(t.length===0)return 0;const i=t_([n.scope,n.category,n.label,n.id,...n.path].join(" "));let s=0;for(const a of t){const r=i.indexOf(a);if(r<0)return null;s+=r}return s+i.length/1e3}function AR(n,e){return n.map((t,i)=>({definition:t,index:i,score:TR(t,e)})).filter(t=>t.score!==null).sort((t,i)=>t.score-i.score||t.index-i.index).map(t=>t.definition)}var kt=Uint8Array,fn=Uint16Array,Wd=Int32Array,gl=new kt([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),_l=new kt([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),Bu=new kt([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),n_=function(n,e){for(var t=new fn(31),i=0;i<31;++i)t[i]=e+=1<<n[i-1];for(var s=new Wd(t[30]),i=1;i<30;++i)for(var a=t[i];a<t[i+1];++a)s[a]=a-t[i]<<5|i;return{b:t,r:s}},i_=n_(gl,2),s_=i_.b,zu=i_.r;s_[28]=258,zu[258]=28;var a_=n_(_l,0),CR=a_.b,wp=a_.r,Hu=new fn(32768);for(var mt=0;mt<32768;++mt){var Si=(mt&43690)>>1|(mt&21845)<<1;Si=(Si&52428)>>2|(Si&13107)<<2,Si=(Si&61680)>>4|(Si&3855)<<4,Hu[mt]=((Si&65280)>>8|(Si&255)<<8)>>1}var Kn=(function(n,e,t){for(var i=n.length,s=0,a=new fn(e);s<i;++s)n[s]&&++a[n[s]-1];var r=new fn(e);for(s=1;s<e;++s)r[s]=r[s-1]+a[s-1]<<1;var o;if(t){o=new fn(1<<e);var l=15-e;for(s=0;s<i;++s)if(n[s])for(var c=s<<4|n[s],u=e-n[s],d=r[n[s]-1]++<<u,h=d|(1<<u)-1;d<=h;++d)o[Hu[d]>>l]=c}else for(o=new fn(i),s=0;s<i;++s)n[s]&&(o[s]=Hu[r[n[s]-1]++]>>15-n[s]);return o}),ki=new kt(288);for(var mt=0;mt<144;++mt)ki[mt]=8;for(var mt=144;mt<256;++mt)ki[mt]=9;for(var mt=256;mt<280;++mt)ki[mt]=7;for(var mt=280;mt<288;++mt)ki[mt]=8;var dr=new kt(32);for(var mt=0;mt<32;++mt)dr[mt]=5;var RR=Kn(ki,9,0),PR=Kn(ki,9,1),LR=Kn(dr,5,0),IR=Kn(dr,5,1),Rc=function(n){for(var e=n[0],t=1;t<n.length;++t)n[t]>e&&(e=n[t]);return e},Ln=function(n,e,t){var i=e/8|0;return(n[i]|n[i+1]<<8)>>(e&7)&t},Pc=function(n,e){var t=e/8|0;return(n[t]|n[t+1]<<8|n[t+2]<<16)>>(e&7)},Xd=function(n){return(n+7)/8|0},vl=function(n,e,t){return(e==null||e<0)&&(e=0),(t==null||t>n.length)&&(t=n.length),new kt(n.subarray(e,t))},NR=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],Gn=function(n,e,t){var i=new Error(e||NR[n]);if(i.code=n,Error.captureStackTrace&&Error.captureStackTrace(i,Gn),!t)throw i;return i},DR=function(n,e,t,i){var s=n.length,a=0;if(!s||e.f&&!e.l)return t||new kt(0);var r=!t,o=r||e.i!=2,l=e.i;r&&(t=new kt(s*3));var c=function(Be){var Qe=t.length;if(Be>Qe){var I=new kt(Math.max(Qe*2,Be));I.set(t),t=I}},u=e.f||0,d=e.p||0,h=e.b||0,p=e.l,g=e.d,_=e.m,m=e.n,f=s*8;do{if(!p){u=Ln(n,d,1);var w=Ln(n,d+1,3);if(d+=3,w)if(w==1)p=PR,g=IR,_=9,m=5;else if(w==2){var M=Ln(n,d,31)+257,T=Ln(n,d+10,15)+4,A=M+Ln(n,d+5,31)+1;d+=14;for(var v=new kt(A),b=new kt(19),R=0;R<T;++R)b[Bu[R]]=Ln(n,d+R*3,7);d+=T*3;for(var N=Rc(b),k=(1<<N)-1,z=Kn(b,N,1),R=0;R<A;){var V=z[Ln(n,d,k)];d+=V&15;var x=V>>4;if(x<16)v[R++]=x;else{var O=0,q=0;for(x==16?(q=3+Ln(n,d,3),d+=2,O=v[R-1]):x==17?(q=3+Ln(n,d,7),d+=3):x==18&&(q=11+Ln(n,d,127),d+=7);q--;)v[R++]=O}}var H=v.subarray(0,M),ne=v.subarray(M);_=Rc(H),m=Rc(ne),p=Kn(H,_,1),g=Kn(ne,m,1)}else Gn(1);else{var x=Xd(d)+4,y=n[x-4]|n[x-3]<<8,C=x+y;if(C>s){l&&Gn(0);break}o&&c(h+y),t.set(n.subarray(x,C),h),e.b=h+=y,e.p=d=C*8,e.f=u;continue}if(d>f){l&&Gn(0);break}}o&&c(h+131072);for(var X=(1<<_)-1,Q=(1<<m)-1,ge=d;;ge=d){var O=p[Pc(n,d)&X],ve=O>>4;if(d+=O&15,d>f){l&&Gn(0);break}if(O||Gn(2),ve<256)t[h++]=ve;else if(ve==256){ge=d,p=null;break}else{var Re=ve-254;if(ve>264){var R=ve-257,te=gl[R];Re=Ln(n,d,(1<<te)-1)+s_[R],d+=te}var G=g[Pc(n,d)&Q],Y=G>>4;G||Gn(3),d+=G&15;var ne=CR[Y];if(Y>3){var te=_l[Y];ne+=Pc(n,d)&(1<<te)-1,d+=te}if(d>f){l&&Gn(0);break}o&&c(h+131072);var le=h+Re;if(h<ne){var Pe=a-ne,ye=Math.min(ne,le);for(Pe+h<0&&Gn(3);h<ye;++h)t[h]=i[Pe+h]}for(;h<le;++h)t[h]=t[h-ne]}}e.l=p,e.p=ge,e.b=h,e.f=u,p&&(u=1,e.m=_,e.d=g,e.n=m)}while(!u);return h!=t.length&&r?vl(t,0,h):t.subarray(0,h)},ri=function(n,e,t){t<<=e&7;var i=e/8|0;n[i]|=t,n[i+1]|=t>>8},Ca=function(n,e,t){t<<=e&7;var i=e/8|0;n[i]|=t,n[i+1]|=t>>8,n[i+2]|=t>>16},Lc=function(n,e){for(var t=[],i=0;i<n.length;++i)n[i]&&t.push({s:i,f:n[i]});var s=t.length,a=t.slice();if(!s)return{t:o_,l:0};if(s==1){var r=new kt(t[0].s+1);return r[t[0].s]=1,{t:r,l:1}}t.sort(function(C,M){return C.f-M.f}),t.push({s:-1,f:25001});var o=t[0],l=t[1],c=0,u=1,d=2;for(t[0]={s:-1,f:o.f+l.f,l:o,r:l};u!=s-1;)o=t[t[c].f<t[d].f?c++:d++],l=t[c!=u&&t[c].f<t[d].f?c++:d++],t[u++]={s:-1,f:o.f+l.f,l:o,r:l};for(var h=a[0].s,i=1;i<s;++i)a[i].s>h&&(h=a[i].s);var p=new fn(h+1),g=Vu(t[u-1],p,0);if(g>e){var i=0,_=0,m=g-e,f=1<<m;for(a.sort(function(M,T){return p[T.s]-p[M.s]||M.f-T.f});i<s;++i){var w=a[i].s;if(p[w]>e)_+=f-(1<<g-p[w]),p[w]=e;else break}for(_>>=m;_>0;){var x=a[i].s;p[x]<e?_-=1<<e-p[x]++-1:++i}for(;i>=0&&_;--i){var y=a[i].s;p[y]==e&&(--p[y],++_)}g=e}return{t:new kt(p),l:g}},Vu=function(n,e,t){return n.s==-1?Math.max(Vu(n.l,e,t+1),Vu(n.r,e,t+1)):e[n.s]=t},Ep=function(n){for(var e=n.length;e&&!n[--e];);for(var t=new fn(++e),i=0,s=n[0],a=1,r=function(l){t[i++]=l},o=1;o<=e;++o)if(n[o]==s&&o!=e)++a;else{if(!s&&a>2){for(;a>138;a-=138)r(32754);a>2&&(r(a>10?a-11<<5|28690:a-3<<5|12305),a=0)}else if(a>3){for(r(s),--a;a>6;a-=6)r(8304);a>2&&(r(a-3<<5|8208),a=0)}for(;a--;)r(s);a=1,s=n[o]}return{c:t.subarray(0,i),n:e}},Ra=function(n,e){for(var t=0,i=0;i<e.length;++i)t+=n[i]*e[i];return t},r_=function(n,e,t){var i=t.length,s=Xd(e+2);n[s]=i&255,n[s+1]=i>>8,n[s+2]=n[s]^255,n[s+3]=n[s+1]^255;for(var a=0;a<i;++a)n[s+a+4]=t[a];return(s+4+i)*8},Mp=function(n,e,t,i,s,a,r,o,l,c,u){ri(e,u++,t),++s[256];for(var d=Lc(s,15),h=d.t,p=d.l,g=Lc(a,15),_=g.t,m=g.l,f=Ep(h),w=f.c,x=f.n,y=Ep(_),C=y.c,M=y.n,T=new fn(19),A=0;A<w.length;++A)++T[w[A]&31];for(var A=0;A<C.length;++A)++T[C[A]&31];for(var v=Lc(T,7),b=v.t,R=v.l,N=19;N>4&&!b[Bu[N-1]];--N);var k=c+5<<3,z=Ra(s,ki)+Ra(a,dr)+r,V=Ra(s,h)+Ra(a,_)+r+14+3*N+Ra(T,b)+2*T[16]+3*T[17]+7*T[18];if(l>=0&&k<=z&&k<=V)return r_(e,u,n.subarray(l,l+c));var O,q,H,ne;if(ri(e,u,1+(V<z)),u+=2,V<z){O=Kn(h,p,0),q=h,H=Kn(_,m,0),ne=_;var X=Kn(b,R,0);ri(e,u,x-257),ri(e,u+5,M-1),ri(e,u+10,N-4),u+=14;for(var A=0;A<N;++A)ri(e,u+3*A,b[Bu[A]]);u+=3*N;for(var Q=[w,C],ge=0;ge<2;++ge)for(var ve=Q[ge],A=0;A<ve.length;++A){var Re=ve[A]&31;ri(e,u,X[Re]),u+=b[Re],Re>15&&(ri(e,u,ve[A]>>5&127),u+=ve[A]>>12)}}else O=RR,q=ki,H=LR,ne=dr;for(var A=0;A<o;++A){var te=i[A];if(te>255){var Re=te>>18&31;Ca(e,u,O[Re+257]),u+=q[Re+257],Re>7&&(ri(e,u,te>>23&31),u+=gl[Re]);var G=te&31;Ca(e,u,H[G]),u+=ne[G],G>3&&(Ca(e,u,te>>5&8191),u+=_l[G])}else Ca(e,u,O[te]),u+=q[te]}return Ca(e,u,O[256]),u+q[256]},UR=new Wd([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),o_=new kt(0),FR=function(n,e,t,i,s,a){var r=a.z||n.length,o=new kt(i+r+5*(1+Math.ceil(r/7e3))+s),l=o.subarray(i,o.length-s),c=a.l,u=(a.r||0)&7;if(e){u&&(l[0]=a.r>>3);for(var d=UR[e-1],h=d>>13,p=d&8191,g=(1<<t)-1,_=a.p||new fn(32768),m=a.h||new fn(g+1),f=Math.ceil(t/3),w=2*f,x=function(ot){return(n[ot]^n[ot+1]<<f^n[ot+2]<<w)&g},y=new Wd(25e3),C=new fn(288),M=new fn(32),T=0,A=0,v=a.i||0,b=0,R=a.w||0,N=0;v+2<r;++v){var k=x(v),z=v&32767,V=m[k];if(_[z]=V,m[k]=z,R<=v){var O=r-v;if((T>7e3||b>24576)&&(O>423||!c)){u=Mp(n,l,0,y,C,M,A,b,N,v-N,u),b=T=A=0,N=v;for(var q=0;q<286;++q)C[q]=0;for(var q=0;q<30;++q)M[q]=0}var H=2,ne=0,X=p,Q=z-V&32767;if(O>2&&k==x(v-Q))for(var ge=Math.min(h,O)-1,ve=Math.min(32767,v),Re=Math.min(258,O);Q<=ve&&--X&&z!=V;){if(n[v+H]==n[v+H-Q]){for(var te=0;te<Re&&n[v+te]==n[v+te-Q];++te);if(te>H){if(H=te,ne=Q,te>ge)break;for(var G=Math.min(Q,te-2),Y=0,q=0;q<G;++q){var le=v-Q+q&32767,Pe=_[le],ye=le-Pe&32767;ye>Y&&(Y=ye,V=le)}}}z=V,V=_[z],Q+=z-V&32767}if(ne){y[b++]=268435456|zu[H]<<18|wp[ne];var Be=zu[H]&31,Qe=wp[ne]&31;A+=gl[Be]+_l[Qe],++C[257+Be],++M[Qe],R=v+H,++T}else y[b++]=n[v],++C[n[v]]}}for(v=Math.max(v,R);v<r;++v)y[b++]=n[v],++C[n[v]];u=Mp(n,l,c,y,C,M,A,b,N,v-N,u),c||(a.r=u&7|l[u/8|0]<<3,u-=7,a.h=m,a.p=_,a.i=v,a.w=R)}else{for(var v=a.w||0;v<r+c;v+=65535){var I=v+65535;I>=r&&(l[u/8|0]=c,I=r),u=r_(l,u+1,n.subarray(v,I))}a.i=r}return vl(o,0,i+Xd(u)+s)},OR=function(n,e,t,i,s){if(!s&&(s={l:1},e.dictionary)){var a=e.dictionary.subarray(-32768),r=new kt(a.length+n.length);r.set(a),r.set(n,a.length),n=r,s.w=a.length}return FR(n,e.level==null?6:e.level,e.mem==null?s.l?Math.ceil(Math.max(8,Math.min(13,Math.log(n.length)))*1.5):20:12+e.mem,t,i,s)};function kR(n,e){return OR(n,e||{},0,0)}function l_(n,e){return DR(n,{i:2},e,e)}var Tp=typeof TextEncoder<"u"&&new TextEncoder,Gu=typeof TextDecoder<"u"&&new TextDecoder,BR=0;try{Gu.decode(o_,{stream:!0}),BR=1}catch{}var zR=function(n){for(var e="",t=0;;){var i=n[t++],s=(i>127)+(i>223)+(i>239);if(t+s>n.length)return{s:e,r:vl(n,t-1)};s?s==3?(i=((i&15)<<18|(n[t++]&63)<<12|(n[t++]&63)<<6|n[t++]&63)-65536,e+=String.fromCharCode(55296|i>>10,56320|i&1023)):s&1?e+=String.fromCharCode((i&31)<<6|n[t++]&63):e+=String.fromCharCode((i&15)<<12|(n[t++]&63)<<6|n[t++]&63):e+=String.fromCharCode(i)}};function HR(n,e){var t;if(Tp)return Tp.encode(n);for(var i=n.length,s=new kt(n.length+(n.length>>1)),a=0,r=function(c){s[a++]=c},t=0;t<i;++t){if(a+5>s.length){var o=new kt(a+8+(i-t<<1));o.set(s),s=o}var l=n.charCodeAt(t);l<128||e?r(l):l<2048?(r(192|l>>6),r(128|l&63)):l>55295&&l<57344?(l=65536+(l&1047552)|n.charCodeAt(++t)&1023,r(240|l>>18),r(128|l>>12&63),r(128|l>>6&63),r(128|l&63)):(r(224|l>>12),r(128|l>>6&63),r(128|l&63))}return vl(s,0,a)}function c_(n,e){var t;if(Gu)return Gu.decode(n);var i=zR(n),s=i.s,t=i.r;return t.length&&Gn(8),s}const VR=["replayUrl","replay_url","replay"],GR=["r","replayUrlZ","replay_url_z"],$R=["ballchasing","ballchasingId","ballchasingUuid","ballchasingReplay"];function WR(n){const e=n.replaceAll("-","+").replaceAll("_","/"),t=e.padEnd(Math.ceil(e.length/4)*4,"="),i=atob(t),s=new Uint8Array(i.length);for(let a=0;a<i.length;a+=1)s[a]=i.charCodeAt(a);return s}function XR(n){try{return c_(l_(WR(n)))}catch(e){throw new Error(`Invalid compressed replay URL: ${e instanceof Error?e.message:String(e)}`)}}function qR(n,e){const t=new URLSearchParams(n);for(const i of VR){const s=t.get(i)?.trim();if(!s)continue;const a=new URL(s,e);if(a.protocol!=="http:"&&a.protocol!=="https:")throw new Error(`Unsupported replay URL protocol: ${a.protocol}`);return a}for(const i of GR){const s=t.get(i)?.trim();if(!s)continue;const a=new URL(XR(s),e);if(a.protocol!=="http:"&&a.protocol!=="https:")throw new Error(`Unsupported replay URL protocol: ${a.protocol}`);return a}return null}function YR(n,e){for(const t of e){const i=n.get(t)?.trim();if(i)return i}return null}function ZR(n,e){const t=new URLSearchParams(n),i=YR(t,$R);if(i){const a=Fd(i);return{kind:"ballchasing",url:zM(a),name:BM(a),fetchInit:{method:"POST"}}}const s=qR(n,e);return s?{kind:"url",url:s,name:KR(s)}:null}function KR(n){const t=n.pathname.replace(/\/+$/,"").split("/").pop();if(!t)return n.hostname||"remote replay";try{return decodeURIComponent(t)}catch{return t}}const $u=1,Wu="cfg",Ap="cfgDebug";function jR(n){let e="";for(const t of n)e+=String.fromCharCode(t);return btoa(e).replaceAll("+","-").replaceAll("/","_").replace(/=+$/,"")}function JR(n){const e=n.replaceAll("-","+").replaceAll("_","/"),t=e.padEnd(Math.ceil(e.length/4)*4,"="),i=atob(t),s=new Uint8Array(i.length);for(let a=0;a<i.length;a+=1)s[a]=i.charCodeAt(a);return s}function QR(n){return jR(kR(HR(JSON.stringify(n)),{level:9}))}function eP(n){let e;try{e=JSON.parse(c_(l_(JR(n))))}catch(t){throw new Error(`Invalid stats player config: ${t instanceof Error?t.message:String(t)}`)}return aP(e)}function tP(n){const e=u_(n);return e.selectedValue?eP(e.selectedValue):null}function u_(n){const e=new URLSearchParams(qd(n.hash)),t=new URLSearchParams(n.search),i=e.getAll(Wu),s=t.getAll(Wu),a=i[0]?"hash":s[0]?"search":null,r=a==="hash"?i[0]:a==="search"?s[0]:null;return{search:n.search,hash:n.hash,searchParams:[...t.entries()],hashParams:[...e.entries()],searchValues:s,hashValues:i,selectedSource:a,selectedValue:r}}function nP(n){const e=new URLSearchParams(n.search),t=new URLSearchParams(qd(n.hash)),i=e.get(Ap)??t.get(Ap);return i===""||i==="1"||i==="true"}function iP(n,e){const t=new URL(n.href),i=new URLSearchParams(qd(t.hash));return i.set(Wu,QR(e)),t.hash=i.toString(),t}function qd(n){return n.startsWith("#")?n.slice(1):n}function sP(n,e,t=120,i=100){const s=Zo(n.viewport.width)??e.width,a=Zo(n.viewport.height)??e.height,r=e.width/Math.max(1,s),o=e.height/Math.max(1,a),l=Math.max(8,e.width-t),c=Math.max(8,e.height-i);return{x:Cp(n.x*r,8,l),y:Cp(n.y*o,8,c)}}function aP(n){if(!Tn(n)||n.version!==$u)throw new Error("Unsupported stats player config version");return{version:$u,playback:oP(n.playback),camera:lP(n.camera),overlays:uP(n.overlays),recording:rP(n.recording),singletonWindows:dP(n.singletonWindows),statsWindows:hP(n.statsWindows),moduleConfigs:Tn(n.moduleConfigs)?n.moduleConfigs:{}}}function rP(n){return Tn(n)?{fps:Xt(n.fps),playbackRate:Xt(n.playbackRate)}:{}}function oP(n){return Tn(n)?{currentTime:Xt(n.currentTime),playing:Ii(n.playing),rate:Xt(n.rate),skipPostGoalTransitions:Ii(n.skipPostGoalTransitions),skipKickoffs:Ii(n.skipKickoffs)}:{}}function lP(n){if(!Tn(n))return{};const e={},t=n.mode==="follow"?"follow":n.mode==="free"?"free":void 0,i=n.freePreset==="overhead"?"overhead":n.freePreset==="side"?"side":n.freePreset===null?null:void 0,s=h_(n.attachedPlayerId),a=Xt(n.distanceScale),r=Ii(n.ballCam),o=cP(n.customSettings);return t!==void 0&&(e.mode=t),i!==void 0&&(e.freePreset=i),s!==void 0&&(e.attachedPlayerId=s),a!==void 0&&(e.distanceScale=a),r!==void 0&&(e.ballCam=r),o!==void 0&&(e.customSettings=o),e}function cP(n){if(n===null)return null;if(!Tn(n))return;const e={},t=Xt(n.fov),i=Xt(n.height),s=Xt(n.pitch),a=Xt(n.distance),r=Xt(n.stiffness),o=Xt(n.swivelSpeed),l=Xt(n.transitionSpeed);return t!==void 0&&(e.fov=t),i!==void 0&&(e.height=i),s!==void 0&&(e.pitch=s),a!==void 0&&(e.distance=a),r!==void 0&&(e.stiffness=r),o!==void 0&&(e.swivelSpeed=o),l!==void 0&&(e.transitionSpeed=l),e}function uP(n){const e=Tn(n)?n:{};return{timelineEvents:co(e.timelineEvents),timelineRanges:co(e.timelineRanges),mechanics:co(e.mechanics),renderEffects:co(e.renderEffects),followedPlayerHud:Ii(e.followedPlayerHud)??!1,boostPads:Ii(e.boostPads)??!0,boostPickupAnimation:Ii(e.boostPickupAnimation)??!1}}function dP(n){return Array.isArray(n)?n.map(e=>!Tn(e)||!pP(e.id)?null:{id:e.id,placement:d_(e.placement)}).filter(e=>e!==null):[]}function hP(n){return Array.isArray(n)?n.map(e=>!Tn(e)||typeof e.id!="string"||!mP(e.kind)?null:{id:e.id,kind:e.kind,placement:d_(e.placement),playerId:h_(e.playerId)??null,team:e.team==="orange"?"orange":e.team==="blue"?"blue":null,entries:fP(e.entries)}).filter(e=>e!==null):[]}function fP(n){return Array.isArray(n)?n.map(e=>!Tn(e)||typeof e.statId!="string"?null:{statId:e.statId,targetId:typeof e.targetId=="string"?e.targetId:void 0}).filter(e=>e!==null):[]}function d_(n){const e=Tn(n)?n:{},t=Tn(e.viewport)?e.viewport:{};return{x:Xt(e.x)??8,y:Xt(e.y)??8,viewport:{width:Zo(t.width)??1,height:Zo(t.height)??1},zIndex:Xt(e.zIndex),visible:Ii(e.visible)??!0}}function pP(n){return n==="camera"||n==="scoreboard"||n==="playback"||n==="recording"||n==="mechanics"||n==="event-playlist"||n==="mechanics-review"||n==="boost-pickups"||n==="touch-controls"}function mP(n){return n==="player"||n==="team"||n==="all-players"||n==="all-teams"||n==="goals-overview"||n==="ad-hoc"}function Tn(n){return typeof n=="object"&&n!==null&&!Array.isArray(n)}function Xt(n){return typeof n=="number"&&Number.isFinite(n)?n:void 0}function Zo(n){const e=Xt(n);return e!==void 0&&e>0?e:void 0}function Ii(n){return typeof n=="boolean"?n:void 0}function h_(n){return n===null?null:typeof n=="string"?n:void 0}function co(n){return Array.isArray(n)?n.filter(e=>typeof e=="string"):[]}function Cp(n,e,t){return Math.min(t,Math.max(e,n))}const f_=2.25,p_=4,gP=["free","follow"];let J=null,hn=null,$t=null,sn=null,ms=null,Ys=null,Ko=null;const Wa=new Map,jo=new Map,Xa=new Map,yl=Yg({refreshTimelineRanges(){na()},rerenderCurrentState(){J&&J.setBoostPickupAnimationEnabled(J.getState().boostPickupAnimationEnabled)},requestConfigSync(){Ke()}}),ga=gR({rerenderCurrentState(){if(!J)return;const n=J.getState();wr(n.frameIndex)},refreshTimelineRanges(){na()},requestConfigSync(){Ke()}},{boostPickupFilters:yl});let di=[],_n=new Set,_a=new Set,dn=new Set,va=new Set;const _P=new Set(["ceiling-shot","fifty-fifty","pressure",Wg,"absolute-positioning","speed-flip","touch"]),m_="touch",vP=new Set(["module:touch","module:powerslide"]),yP="mechanics:ranges",g_=new Set(["ball-carry","ceiling-shot","double-tap","flick","half-flip","musty-flick","one-timer","pass","speed-flip"]),Rp=["#3b82f6","#06b6d4","#22c55e","#a855f7","#f97316","#ef4444","#f59e0b","#ec4899"],bP="#d1d9e0",__=[{id:"core",label:"Shots, saves, assists",buildEvents(n){return n.replay.timelineEvents.filter(e=>e.kind==="shot"||e.kind==="save"||e.kind==="assist")}},{id:"demo",label:"Demos",buildEvents(n){return n.replay.timelineEvents.filter(e=>e.kind==="demo")}}],Yd=[{id:"goal-context",label:"Goal Context",buildEvents(n){return Lg(n.statsTimeline,n.replay)}},{id:"goal-tags",label:"Goal Tags",buildEvents(n){return Pg(n.statsTimeline,n.replay)}}];let Ni=null,ea,v_,Jo,Pp,Qo,Xu,Lp,Ip,Fa,wi,Zs,uo,Ic,Np,qu,y_,b_,x_,S_,w_,E_,M_,Yu,Zu,Ku,ju,Ju,Qu,ed,Oa,T_,ka,td,To,nd,el,us,Di,id,sd,qa,Ya,Za,A_,Ci,tl,hr,fr,pr,mr,gr,_r,vr,C_,R_,P_,L_,I_,N_,D_,Ka,ad,Ba,U_,F_,O_,k_,tn,B_,z_,rd,Ao,Co,Ro,Po,Lo,Io,pn,ci=null,mn,ua,da,od,ld,cd,ud,dd,H_,V_,G_,$_,ho=null,ds=Yo(null),nl=30,ja=1,hi=!0,il=null,Wn=null,Ei=null,ta=!1,ls=null,Bi=null,sl=!0,zi=null;const xP=["camera","scoreboard","playback","recording","mechanics","event-playlist","mechanics-review","boost-pickups","touch-controls"],gs=new Map;let Ot=null,No=!1;function SP(){return new Set([..._n,..._a,...va])}function W_(n){return n==="events"?_n:n==="ranges"?_a:va}function Vi(){return!J||!sn||!ms?null:{player:J,replay:J.replay,statsTimeline:sn,statsFrameLookup:ms,fieldScale:J.options.fieldScale??1}}function ha(){Zd();const n=Vi();if(!n)return;const e=SP();di=ga.filter(t=>e.has(t.id)),yl.setup(n);for(const t of di)t.setup(n);Ko=n.player.onBeforeRender(t=>{for(const i of di)va.has(i.id)&&i.onBeforeRender(t)}),Do(),na()}function Zd(){Ko?.(),Ko=null,bl(),xl();for(const n of di)n.teardown();di=[]}function X_(n,e,t){const i=W_(e);if(t?i.add(n):i.delete(n),ha(),Hi(),pi(),J){const s=J.getState();wr(s.frameIndex)}fi(),Ke()}function bl(){for(const n of Wa.values())n();Wa.clear()}function xl(){for(const n of jo.values())n();jo.clear()}function q_(){for(const n of Xa.values())n();Xa.clear()}function Kd(){Xa.get("boost-pad-overlay")?.(),Xa.delete("boost-pad-overlay"),!(!J||!hi)&&Xa.set("boost-pad-overlay",J.addPlugin(eT()))}function wP(){hi=!hi,Kd(),Hi(),Ke()}function Do(){bl();const n=Vi();if(!(!hn||!n)){for(const e of di){if(!_n.has(e.id))continue;const t=e.getTimelineEvents?.(n);!t||t.length===0||Wa.set(e.id,hn.addEventSource(Uo(t),{id:`module:${e.id}`,label:e.label}))}for(const e of Yd){if(!_n.has(e.id))continue;const t=e.buildEvents(n);t.length!==0&&Wa.set(`events:${e.id}`,hn.addEventSource(Uo(t),{id:`events:${e.id}`,label:e.label}))}for(const e of dn){const t=Hd(n.statsTimeline,n.replay,[e]);t.length!==0&&Wa.set(`mechanics:events:${e}`,hn.addEventSource(Uo(t),{id:`mechanics:${e}`,label:gn(e)}))}hn.refreshEvents()}}function na(){xl();const n=Vi();if(!hn||!n)return;for(const t of di)!_a.has(t.id)||!t.getTimelineRanges||jo.set(t.id,hn.addRangeSource(()=>t.getTimelineRanges?.(n)??[]));const e=Vg(n.statsTimeline,n.replay,dn);e.length>0&&jo.set(yP,hn.addRangeSource(e)),hn.refreshRanges()}function fi(){if(!J||!sn){rd.textContent="--";return}const n=Hd(sn,J.replay,dn).length,e=Vg(sn,J.replay,dn).length;rd.textContent=`${EA(_n,J.replay,sn)+n+e}`}function ie(n,e){const t=n.querySelector(e);if(!(t instanceof HTMLElement))throw new Error(`Missing element for selector: ${e}`);return t}function EP(n){return n.closest("[data-window-id]")?.dataset.windowId??null}function Y_(){return{width:Math.max(1,window.innerWidth),height:Math.max(1,window.innerHeight)}}function Dp(n,e){const t=n.style.getPropertyValue(e).trim(),i=getComputedStyle(n).getPropertyValue(e).trim(),s=t||i,a=Number.parseFloat(s);if(Number.isFinite(a))return a;const r=n.getBoundingClientRect();return e==="--window-y"?r.top:r.left}function Z_(n){const e=Number.parseInt(n.style.zIndex,10);return{x:Dp(n,"--window-x"),y:Dp(n,"--window-y"),viewport:Y_(),zIndex:Number.isFinite(e)?e:void 0,visible:!n.hidden}}function K_(n,e){const t=sP(e,Y_());n.style.setProperty("--window-x",`${t.x}px`),n.style.setProperty("--window-y",`${t.y}px`),n.hidden=!e.visible,e.zIndex!==void 0&&(n.style.zIndex=`${e.zIndex}`,nl=Math.max(nl,e.zIndex+1))}function MP(){const n=[],e=Ni??document;for(const t of xP){const i=e.querySelector(`[data-window-id="${t}"]`);i&&n.push({id:t,placement:Z_(i)})}return n}function j_(){return ga.filter(n=>n.getConfig||n.applyConfig).map(n=>{const e={id:n.id};return n.id==="boost"&&(e.aliases=["boost-pickup-animation"]),n.getConfig&&(e.getConfig=()=>n.getConfig?.()),n.applyConfig&&(e.applyConfig=t=>n.applyConfig?.(t)),e})}function TP(){return _R(j_())}function AP(n){vR(j_(),n)}function CP(n){return{id:n.id,kind:n.kind,placement:Z_(n.element),playerId:n.playerId,team:n.team,entries:n.entries.map(e=>({statId:e.statId,targetId:e.targetId}))}}function RP(){const n=J?.getState();return{currentTime:n?.currentTime,playing:n?.playing,rate:n?.speed??Number(us?.value??1),skipPostGoalTransitions:J?n?.skipPostGoalTransitionsEnabled:pn.checked,skipKickoffs:J?n?.skipKickoffsEnabled:mn.checked}}function PP(){const n=J?.getState();return{mode:n?.cameraViewMode,freePreset:Wn,attachedPlayerId:n?.attachedPlayerId,distanceScale:n?.cameraDistanceScale,ballCam:n?.ballCamEnabled,customSettings:n?.customCameraSettings}}function LP(){return{fps:Number(ua?.value),playbackRate:Number(da?.value)}}function IP(){return{version:$u,playback:RP(),camera:PP(),overlays:{timelineEvents:[..._n],timelineRanges:[..._a],mechanics:[...dn],renderEffects:[...va],followedPlayerHud:!1,boostPads:hi,boostPickupAnimation:J?.getState().boostPickupAnimationEnabled??!1},recording:LP(),singletonWindows:MP(),statsWindows:[...gs.values()].map(CP),moduleConfigs:TP()}}function Ke(){ta||(ls!==null&&window.clearTimeout(ls),ls=window.setTimeout(()=>{ls=null;const n=iP(new URL(window.location.href),IP());window.history.replaceState(window.history.state,"",n)},150))}function NP(n,e,t){console.groupCollapsed("[subtr-actor] stats player cfg load"),console.log("location.href",window.location.href),console.log("location.search",n.search||"(empty)"),console.log("location.hash",n.hash||"(empty)"),console.table([...n.searchParams.map(([i,s])=>({source:"search",name:i,value:s})),...n.hashParams.map(([i,s])=>({source:"hash",name:i,value:s}))]),console.log("cfg selected source",n.selectedSource??"(none)"),console.log("cfg selected raw text",n.selectedValue??"(none)"),console.log("cfg selected raw length",n.selectedValue?.length??0),console.log("cfg search values",n.searchValues),console.log("cfg hash values",n.hashValues),n.hashValues.length>0&&n.searchValues.length>0&&console.warn("Both hash and search contain cfg; hash cfg is used."),e&&(console.log("cfg normalized JSON",JSON.stringify(e,null,2)),console.log("cfg normalized object",e)),t&&console.error("cfg decode/apply error",t),console.groupEnd()}function DP(n){const e=Ni??document;for(const t of n.singletonWindows){const i=e.querySelector(`[data-window-id="${t.id}"]`);i&&K_(i,t.placement)}}function UP(n){_n=new Set(n.overlays.timelineEvents),_a=new Set(n.overlays.timelineRanges),dn=new Set(n.overlays.mechanics),va=new Set(n.overlays.renderEffects),hi=n.overlays.boostPads,pn.checked=n.playback.skipPostGoalTransitions??pn.checked,mn.checked=n.playback.skipKickoffs??mn.checked,n.playback.rate!==void 0&&(us.value=`${n.playback.rate}`),n.recording.fps!==void 0&&(ua.value=`${n.recording.fps}`),n.recording.playbackRate!==void 0&&(da.value=`${n.recording.playbackRate}`),AP(n.moduleConfigs),DP(n),x2(n.statsWindows),Hi(),pi(),fi()}function FP(n,e,t){return{currentTime:n.currentTime,playing:n.playing,speed:n.rate,cameraDistanceScale:e.distanceScale,customCameraSettings:e.customSettings,cameraViewMode:e.mode,attachedPlayerId:e.attachedPlayerId,ballCamEnabled:e.ballCam,boostPickupAnimationEnabled:t.overlays.boostPickupAnimation,skipPostGoalTransitionsEnabled:n.skipPostGoalTransitions,skipKickoffsEnabled:n.skipKickoffs}}function OP(n,e){if(!J||!Number.isFinite(n))return;Ot&&(Ot.currentClip=null),e!==null&&J.replay.players.some(i=>i.id===e)&&(J.setAttachedPlayer(e),J.setCameraViewMode("follow"),Wn=null),pn.checked=!1,mn.checked=!1,J.setState({currentTime:Math.max(0,n-p_),playing:!0,skipPostGoalTransitionsEnabled:!1,skipKickoffsEnabled:!1}),Ke()}function kP(n){J&&(Ot&&(Ot.currentClip=null),pn.checked=!1,mn.checked=!1,J.setState({currentTime:Od(n),skipPostGoalTransitionsEnabled:!1,skipKickoffsEnabled:!1}),Ke())}function Uo(n){return n.map(e=>({...e,seekTime:Od(e)}))}function BP(n){J&&(J.setState(FP(n.playback,n.camera,n)),Wn=n.camera.freePreset??null,n.camera.mode==="free"&&n.camera.freePreset&&J.setFreeCameraPreset(n.camera.freePreset),Kd(),ha(),Hi(),pi(),wr(J.getState().frameIndex))}function Sl(n){n.style.zIndex=`${nl++}`}function zP(n){const e=ie(Ni??document,`[data-window-id="${n}"]`);e.hidden=!1,Sl(e),Ke()}function HP(n){const e=ie(Ni??document,`[data-window-id="${n}"]`);e.hidden=!e.hidden,e.hidden||Sl(e),Ke()}function VP(n){const e=ie(Ni??document,`[data-window-id="${n}"]`);e.hidden=!0,Ke()}function Ja(n){Xu.hidden=!n,Qo.setAttribute("aria-label",n?"Close menu":"Open menu"),Qo.setAttribute("aria-expanded",n?"true":"false")}function Up(){ea.click(),Ja(!1)}function GP(n){return n instanceof Element&&!!n.closest("button, input, select, textarea, option, label, a, [data-no-drag]")}function Fp(n,e){n.addEventListener("pointerdown",t=>{if(!(t.target instanceof HTMLElement)||GP(t.target))return;const i=t.target.closest("[data-window-id]");if(!i||i.hidden)return;Sl(i);const s=t.clientX,a=t.clientY,r=i.getBoundingClientRect(),o=t.pointerId;i.setPointerCapture(o),t.preventDefault();const l=u=>{const d=Math.max(8,Math.min(window.innerWidth-120,r.left+u.clientX-s)),h=Math.max(8,Math.min(window.innerHeight-100,r.top+u.clientY-a));i.style.setProperty("--window-x",`${d}px`),i.style.setProperty("--window-y",`${h}px`)},c=()=>{i.releasePointerCapture(o),i.removeEventListener("pointermove",l),i.removeEventListener("pointerup",c),i.removeEventListener("pointercancel",c),Ke()};i.addEventListener("pointermove",l),i.addEventListener("pointerup",c),i.addEventListener("pointercancel",c)},{signal:e})}function Hi(){ad.replaceChildren();const n=[],e=[];for(const c of ga){const u=_P.has(c.id);!c.getTimelineEvents&&!c.getTimelineRanges&&!u||(c.getTimelineEvents&&n.push(Fc(c.id,Uc(c,"events"),"events")),c.getTimelineRanges&&n.push(Fc(c.id,Uc(c,"ranges"),"ranges")),u&&e.push(Fc(c.id,Uc(c,"effects"),"effects")))}const t=J?.getState().boostPickupAnimationEnabled??!1,i=document.createElement("button");i.type="button",i.className="module-summary-item",i.dataset.active=t?"true":"false",i.setAttribute("aria-pressed",t?"true":"false"),i.addEventListener("click",()=>{const c=!(J?.getState().boostPickupAnimationEnabled??!1);J?.setBoostPickupAnimationEnabled(c),ha(),Hi(),pi(),Ke()});const s=document.createElement("span");s.textContent="Boost pickup animation";const a=document.createElement("strong");a.textContent=t?"On":"Off",i.append(s,a),e.push(i);const r=document.createElement("button");r.type="button",r.className="module-summary-item",r.dataset.active=hi?"true":"false",r.setAttribute("aria-pressed",hi?"true":"false"),r.addEventListener("click",wP);const o=document.createElement("span");o.textContent="Boost pad locations";const l=document.createElement("strong");l.textContent=hi?"On":"Off",r.append(o,l),e.push(r),ad.append(Xp("Timeline visualizations",n),Xp("In-game visualizations",e))}function Qa(){wi.replaceChildren();const n=Vi(),e=mg(sn),t=new Map;for(const f of sn?.events.mechanics??[])t.set(f.kind,(t.get(f.kind)??0)+1);const i=new Set(e.map(f=>f.replaceAll("_","-"))),s=ga.filter(f=>f.getTimelineEvents&&!g_.has(f.id)&&!i.has(f.id)).map(f=>({id:f.id,label:f.label,count:n?f.getTimelineEvents?.(n).length??0:0})),a=__.map(f=>({id:f.id,label:f.label,count:n?f.buildEvents(n).length:0})),r=Yd.map(f=>({id:f.id,label:f.label,count:n?f.buildEvents(n).length:0})),o=[...a,...s,...r].filter(f=>f.count>0).map(f=>f.id);if(o.length===0&&e.length===0){const f=document.createElement("p");f.className="stat-window-empty",f.textContent="No events loaded.",wi.append(f);return}const l=document.createElement("div");l.className="mechanics-actions";const c=document.createElement("button");c.type="button",c.className="module-summary-item",c.addEventListener("click",()=>{for(const f of o)_n.add(f);dn=new Set(e),ha(),Do(),na(),Qa(),Hi(),pi(),fi(),Ke()});const u=document.createElement("span");u.textContent="All events";const d=document.createElement("strong");d.textContent=`${o.length+e.length}`,c.append(u,d);const h=document.createElement("button");h.type="button",h.className="module-summary-item",h.addEventListener("click",()=>{_n.clear(),dn.clear(),ha(),Do(),na(),Qa(),Hi(),pi(),fi(),Ke()});const p=document.createElement("span");p.textContent="No events";const g=document.createElement("strong");g.textContent="Off",h.append(p,g),l.append(c,h),wi.append(l);const _=kp("Replay",a);_&&wi.append(_);const m=kp("Stats",[...s,...r]);if(m&&wi.append(m),e.length>0){const f=document.createElement("h3");f.className="module-settings-eyebrow",f.textContent="Mechanics",wi.append(f);const w=document.createElement("div");w.className="module-list mechanics-list";for(const x of e){const y=dn.has(x),C=document.createElement("button");C.type="button",C.className="module-summary-item",C.dataset.active=y?"true":"false",C.setAttribute("aria-pressed",y?"true":"false"),C.addEventListener("click",()=>{dn.has(x)?dn.delete(x):dn.add(x),Do(),na(),Qa(),fi(),Ke()});const M=document.createElement("span");M.textContent=gn(x);const T=document.createElement("strong");T.textContent=`${y?"On":"Off"} ${t.get(x)??0}`,C.append(M,T),w.append(C)}wi.append(w)}}function Op(){Qa()}function kp(n,e){const t=e.filter(r=>r.count>0);if(t.length===0)return null;const i=document.createElement("section"),s=document.createElement("h3");s.className="module-settings-eyebrow",s.textContent=n;const a=document.createElement("div");a.className="module-list mechanics-list";for(const r of t){const o=_n.has(r.id),l=document.createElement("button");l.type="button",l.className="module-summary-item",l.dataset.active=o?"true":"false",l.setAttribute("aria-pressed",o?"true":"false"),l.addEventListener("click",()=>{X_(r.id,"events",!_n.has(r.id)),Qa(),fi()});const c=document.createElement("span");c.textContent=r.label;const u=document.createElement("strong");u.textContent=`${o?"On":"Off"} ${r.count}`,l.append(c,u),a.append(l)}return i.append(s,a),i}function $P(n){return[{id:"replay:goals",group:"Replay",label:"Goals",events:n.replay.timelineEvents.filter(t=>t.kind==="goal")},...__.map(t=>({id:`replay:${t.id}`,group:"Replay",label:t.label,events:t.buildEvents(n)}))].filter(t=>t.events.length>0)}function WP(){const n=Vi();if(!n)return[];const e=mg(n.statsTimeline),t=new Set(e.map(r=>r.replaceAll("_","-"))),i=ga.filter(r=>r.getTimelineEvents&&!g_.has(r.id)&&!t.has(r.id)).map(r=>({id:`module:${r.id}`,group:"Stats",label:r.label,events:r.getTimelineEvents?.(n)??[]})).filter(r=>r.events.length>0),s=Yd.map(r=>({id:`extra:${r.id}`,group:"Stats",label:r.label,events:r.buildEvents(n)})).filter(r=>r.events.length>0),a=e.map(r=>({id:`mechanic:${r}`,group:"Mechanics",label:gn(r),events:Hd(n.statsTimeline,n.replay,[r])})).filter(r=>r.events.length>0);return[...$P(n),...i,...s,...a]}function jd(n){const e=n.map(t=>t.id);return Bi===null?new Set(e.filter(t=>!vP.has(t))):new Set(e.filter(t=>Bi?.has(t)))}function XP(n){const e=n.playerId??null,t=e&&J?J.replay.players.findIndex(i=>i.id===e):-1;return t>=0?Rp[t%Rp.length]:n.color??bP}function qP(n){const e=jd(n);return n.filter(t=>e.has(t.id)).flatMap(t=>t.events.map((i,s)=>({key:`${t.id}:${i.id??`${i.kind}:${i.time}:${s}`}`,sourceId:t.id,sourceLabel:t.label,event:i,color:XP(i)}))).sort((t,i)=>t.event.time!==i.event.time?t.event.time-i.event.time:(t.event.label??t.sourceLabel).localeCompare(i.event.label??i.sourceLabel))}function YP(n,e){const t=jd(n);e(t),Bi=t,zi=null,fa();const i=J?.getState();i&&yr(i)}function fa(){if(!Zs)return;Zs.replaceChildren();const n=WP();if(n.length===0){const _=document.createElement("p");_.className="stat-window-empty",_.textContent=J?"No events loaded.":"Load a replay to see events.",Zs.append(_);return}const e=jd(n),t=qP(n),i=document.createElement("div");i.className="event-playlist-toolbar";const s=document.createElement("details");s.className="event-playlist-filter",s.dataset.noDrag="true";const a=document.createElement("summary");a.textContent=`Filters ${e.size}/${n.length}`,s.append(a);const r=document.createElement("div");r.className="event-playlist-filter-panel";const o=document.createElement("div");o.className="event-playlist-filter-actions";const l=document.createElement("button");l.type="button",l.textContent="All",l.addEventListener("click",()=>{Bi=new Set(n.map(m=>m.id)),zi=null,fa();const _=J?.getState();_&&yr(_)});const c=document.createElement("button");c.type="button",c.textContent="None",c.addEventListener("click",()=>{Bi=new Set,zi=null,fa()}),o.append(l,c),r.append(o);const u=new Map;for(const _ of n){const m=u.get(_.group)??[];m.push(_),u.set(_.group,m)}for(const[_,m]of u){const f=document.createElement("section");f.className="event-playlist-filter-group";const w=document.createElement("h3");w.textContent=_,f.append(w);for(const x of m){const y=document.createElement("label");y.className="toggle event-playlist-filter-option";const C=document.createElement("input");C.type="checkbox",C.checked=e.has(x.id),C.addEventListener("change",()=>{YP(n,T=>{C.checked?T.add(x.id):T.delete(x.id)})});const M=document.createElement("span");M.textContent=`${x.label} (${x.events.length})`,y.append(C,M),f.append(y)}r.append(f)}s.append(r);const d=document.createElement("label");d.className="toggle event-playlist-follow";const h=document.createElement("input");h.type="checkbox",h.checked=sl,h.addEventListener("change",()=>{sl=h.checked;const _=J?.getState();_&&yr(_,{forceScroll:!0})});const p=document.createElement("span");p.textContent="Auto-follow",d.append(h,p),i.append(s,d);const g=document.createElement("div");if(g.className="event-playlist-list",g.dataset.noDrag="true",t.length===0){const _=document.createElement("p");_.className="stat-window-empty",_.textContent="No event types selected.",g.append(_)}else for(const _ of t){const m=document.createElement("button");m.type="button",m.className="event-playlist-item",m.dataset.eventKey=_.key,m.dataset.eventTime=`${_.event.time}`,m.style.setProperty("--event-color",_.color),m.addEventListener("click",()=>{kP(_.event)});const f=document.createElement("span");f.className="event-playlist-time",f.textContent=pv(_.event.time);const w=document.createElement("span");w.className="event-playlist-main";const x=document.createElement("strong");x.textContent=_.event.label??_.sourceLabel;const y=document.createElement("span");y.textContent=[_.event.playerName??null,_.event.frame!==void 0?`frame ${_.event.frame}`:null,_.sourceLabel].filter(C=>!!C).join(" · "),w.append(x,y),m.append(f,w),g.append(m)}Zs.append(i,g)}function ZP(n,e){const t=[...n.querySelectorAll(".event-playlist-item")];if(t.length===0)return null;let i=t[0]??null,s=Number.POSITIVE_INFINITY;for(const a of t){const r=Number(a.dataset.eventTime);if(!Number.isFinite(r))continue;const o=Math.abs(r-e);o<s&&(s=o,i=a)}return i}function yr(n,e={}){const t=Zs?.querySelector(".event-playlist-list");if(!t)return;const i=ZP(t,n.currentTime),s=i?.dataset.eventKey??null;s===zi&&!e.forceScroll||(t.querySelectorAll(".event-playlist-item[data-active='true']").forEach(a=>{a.dataset.active="false"}),i&&(i.dataset.active="true",(sl||e.forceScroll)&&i.scrollIntoView({block:"nearest"})),zi=s)}function En(n){return typeof n=="object"&&n!==null&&!Array.isArray(n)}function Bp(n){return En(n)&&(n.kind==="time"||n.kind==="frame")&&typeof n.value=="number"&&Number.isFinite(n.value)?{kind:n.kind,value:n.value}:null}function fo(n,e){if(n!=null){if(typeof n!="number"||!Number.isInteger(n)||!Number.isFinite(n)||n<0)throw new Error(`Review playlist page ${e} must be a non-negative integer.`);return n}}function zp(n,e){if(n!=null){if(typeof n!="string")throw new Error(`Review playlist page ${e} must be a string.`);return n}}function KP(n){if(n!=null){if(!En(n))throw new Error("Review playlist page must be an object.");return{next:zp(n.next,"next"),previous:zp(n.previous,"previous"),total:fo(n.total,"total"),count:fo(n.count,"count"),limit:fo(n.limit,"limit"),offset:fo(n.offset,"offset")}}}function jP(n){if(!En(n)||!Array.isArray(n.items))throw new Error("Review playlist must contain an items array.");const e=n.items.map((i,s)=>{if(!En(i)||typeof i.replay!="string")throw new Error(`Invalid review item at index ${s}.`);const a=Bp(i.start),r=Bp(i.end);if(!a||!r)throw new Error(`Review item ${s+1} has invalid start or end.`);return{id:typeof i.id=="string"?i.id:void 0,replay:i.replay,start:a,end:r,label:typeof i.label=="string"?i.label:void 0,meta:En(i.meta)?i.meta:void 0}}),t=Array.isArray(n.replays)?n.replays.map(i=>!En(i)||typeof i.id!="string"?null:{id:i.id,path:typeof i.path=="string"?i.path:void 0,label:typeof i.label=="string"?i.label:void 0,locator:En(i.locator)?i.locator:void 0,meta:En(i.meta)?i.meta:void 0}).filter(i=>i!==null):void 0;return{label:typeof n.label=="string"?n.label:void 0,replays:t,items:e,page:KP(n.page),playback:n.playback,meta:n.meta}}function J_(n){let e;try{e=JSON.parse(n)}catch(t){throw new Error(`Invalid review playlist JSON: ${t instanceof Error?t.message:String(t)}`)}return jP(e)}function JP(){const n=new URLSearchParams(window.location.search);return n.get("reviewPlaylist")?.trim()||n.get("review")?.trim()||n.get("playlist")?.trim()||n.get("playlistUrl")?.trim()||null}function QP(n){return/^\/(?:home|Users|tmp|var\/tmp|mnt|media|run\/user|nix\/store)\//.test(n)}function Q_(n,e){const t=n.startsWith("path:")?n.slice(5):n;return/^https?:\/\//i.test(t)||t.startsWith("/@fs/")?t:t.startsWith("/")?QP(t)?`/@fs${t}`:t:e?new URL(t,e).href:t}function wl(n,e){const t=e.replaysById.get(n.replay);if(t?.path)return t.path;if(En(t?.locator)&&t.locator.kind==="path"&&typeof t.locator.path=="string")return t.locator.path;if(/^https?:\/\//i.test(n.replay)||n.replay.startsWith("/")||n.replay.startsWith("/@fs/")||n.replay.startsWith("path:"))return n.replay;throw new Error(`Review replay "${n.replay}" does not include a loadable path.`)}function ev(n,e){const t=e.replaysById.get(n.replay),s=(t?.path??wl(n,e)).replace(/^path:/,"").split("/").filter(Boolean).pop();return t?.label??s??"review replay"}function tv(n,e,t){const i=wl(n,e),s=Q_(i,e.sourceUrl);return{name:ev(n,e),preparingStatus:"Loading review replay...",async readBytes(){const a=await fetch(s,{signal:t});if(!a.ok){const r=a.statusText?` ${a.statusText}`:"";throw new Error(`Failed to fetch review replay from ${s} (${a.status}${r})`)}return new Uint8Array(await a.arrayBuffer())}}}function Hp(n){if(n.kind==="time")return n.value;const e=Math.max(0,Math.trunc(n.value));return J?.replay.frames[e]?.time??J?.replay.frames.at(-1)?.time??0}function Fo(n){return typeof n=="number"&&Number.isFinite(n)?`${n.toFixed(2)}s`:"--"}function Vp(n){return n.kind==="time"?Fo(n.value):`frame ${Math.trunc(n.value)}`}function cs(n,e){if(!En(n.meta?.target))return null;const t=n.meta.target[e];return typeof t=="number"&&Number.isFinite(t)?t:null}function Nc(n,e){if(!En(n.meta?.target))return null;const t=n.meta.target[e];return typeof t=="number"&&Number.isFinite(t)?Math.trunc(t):null}function e2(n){const e=n.start.kind==="time"?n.start.value:null,t=n.end.kind==="time"?n.end.value:null,i=[`${Vp(n.start)} to ${Vp(n.end)}`];e!==null&&t!==null&&i.push(`${Math.max(0,t-e).toFixed(1)}s clip`);const s=cs(n,"startTime")??cs(n,"eventTime"),a=cs(n,"endTime")??cs(n,"eventTime");return e!==null&&s!==null&&i.push(`${Math.max(0,s-e).toFixed(1)}s preroll`),t!==null&&a!==null&&i.push(`${Math.max(0,t-a).toFixed(1)}s postroll`),i.join(" · ")}function t2(n){const e=cs(n,"eventTime"),t=cs(n,"startTime"),i=cs(n,"endTime"),s=Nc(n,"eventFrame"),a=Nc(n,"startFrame"),r=Nc(n,"endFrame"),o=t!==null&&i!==null&&Math.abs(i-t)>.001?`${Fo(t)} to ${Fo(i)}`:Fo(e??t??i),l=a!==null&&r!==null&&r!==a?`frames ${a}-${r}`:s!==null?`frame ${s}`:a!==null?`frame ${a}`:null;return[o,l].filter(c=>c&&c!=="--").join(" · ")||"--"}function hd(n,e){return n.label??n.meta?.mechanicLabel??`Review item ${e+1}`}function nv(n){return typeof n.meta?.playerId=="string"?n.meta.playerId:En(n.meta?.target)&&typeof n.meta.target.playerId=="string"?n.meta.target.playerId:null}function n2(n){if(typeof n.meta?.playerName=="string"&&n.meta.playerName.trim())return n.meta.playerName;const e=nv(n);return e?J?.replay.players.find(t=>t.id===e)?.name??e:"--"}function Gp(n){return typeof n.meta?.mechanicLabel=="string"&&n.meta.mechanicLabel.trim()?n.meta.mechanicLabel:typeof n.meta?.mechanic=="string"?gn(n.meta.mechanic):"--"}function fd(n){return typeof n=="string"&&n.trim()?n.replaceAll("_"," "):"unreviewed"}function iv(n){if(!n)return null;if(typeof n.meta?.reviewEndpoint=="string"&&n.meta.reviewEndpoint)return n.meta.reviewEndpoint;const e=typeof n.meta?.eventId=="string"&&n.meta.eventId?n.meta.eventId:n.id;return e?`/api/v1/mechanics/events/${encodeURIComponent(e)}/reviews`:null}function i2(){const n=new URLSearchParams(window.location.search),e=n.get("reviewToken")??n.get("token")??window.localStorage.getItem("rocket_sense_access_token");return e?{Authorization:`Bearer ${e}`}:{}}function an(n){qu&&(qu.textContent=n)}function sv(n){const e=new Map;for(const t of n.manifest.items)e.has(t.replay)||e.set(t.replay,t);return e}function s2(n){const e=new Map;for(const t of n.manifest.items)e.set(t.replay,(e.get(t.replay)??0)+1);return e}function a2(n){const e=s2(n);for(const[t,i]of sv(n)){let s="",a=t;try{s=wl(i,n),a=ev(i,n)}catch{a=n.replaysById.get(t)?.label??t}n.replayLoadStates.set(t,{replayId:t,label:a,path:s,clipCount:e.get(t)??0,status:"idle",progress:null,error:null})}}function po(n,e,t){const i=n.replayLoadStates.get(e)??{replayId:e,label:e,path:"",clipCount:0,status:"idle",progress:null,error:null};n.replayLoadStates.set(e,{...i,...t});const s=n.manifest.items[n.currentIndex];n.loading&&s?.replay===e&&t.progress&&(tn.textContent=ml(t.progress),ci?.update(t.progress)),Ot===n&&av(n)}function r2(n){if(!n)return"";const e=ml(n);if(n.processedFrames!==void 0){const t=n.totalFrames!==void 0?` / ${n.totalFrames}`:"";return`${e} (${n.processedFrames}${t} frames)`}if(n.processedChunks!==void 0){const t=n.totalChunks!==void 0?` / ${n.totalChunks}`:"";return`${e} (${n.processedChunks}${t} chunks)`}return e}function o2(n){return n.status==="idle"?"Pending":n.status==="loading"?r2(n.progress)||"Loading":n.status==="loaded"?"Loaded":n.error?`Failed: ${n.error}`:"Failed"}function l2(n){if(n.status==="loaded")return 1;const e=n.progress?.progress;return typeof e=="number"&&Number.isFinite(e)?Math.max(0,Math.min(1,e)):0}function av(n){if(!Oa||!ed)return;const e=n?Array.from(n.replayLoadStates.values()):[],t=e.filter(a=>a.status==="loaded").length,i=e.filter(a=>a.status==="loading").length,s=e.filter(a=>a.status==="error").length;if(ed.textContent=e.length===0?"0 replays":`${t}/${e.length} loaded${i>0?`, ${i} loading`:""}${s>0?`, ${s} failed`:""}`,Oa.replaceChildren(),!n||e.length===0){const a=document.createElement("p");a.className="stat-window-empty",a.textContent="No replay sources.",Oa.append(a);return}for(const a of e){const r=document.createElement("div");r.className=`mechanics-review-replay-load ${a.status}`;const o=document.createElement("div");o.className="mechanics-review-replay-load-main";const l=document.createElement("span");l.className="mechanics-review-replay-load-title",l.textContent=a.label;const c=document.createElement("span");c.className="mechanics-review-replay-load-meta",c.textContent=[a.replayId,`${a.clipCount} ${a.clipCount===1?"clip":"clips"}`,a.path].filter(Boolean).join(" · "),o.append(l,c);const u=document.createElement("strong");u.className="mechanics-review-replay-load-status",u.textContent=o2(a);const d=document.createElement("div");d.className="mechanics-review-replay-load-progress";const h=document.createElement("span");h.style.width=`${Math.round(l2(a)*100)}%`,d.append(h),r.append(o,u,d),Oa.append(r)}}function $p(n,e){for(const[t,i]of sv(n))t!==e&&rv(i,n).catch(()=>{})}function rv(n,e){const t=e.replayLoadCache.get(n.replay);if(t)return t;const i=tv(n,e);po(e,n.replay,{label:i.name,path:wl(n,e),status:"loading",progress:null,error:null});const s=Promise.resolve().then(async()=>{const a=await i.readBytes();return rg(a,{reportEveryNFrames:100,onProgress(r){po(e,n.replay,{status:"loading",progress:r,error:null})}})}).then(a=>(po(e,n.replay,{status:"loaded",progress:null,error:null}),a)).catch(a=>{throw e.replayLoadCache.delete(n.replay),po(e,n.replay,{status:"error",error:a instanceof Error?a.message:String(a)}),a});return e.replayLoadCache.set(n.replay,s),s}function pa(){if(!ka)return;const n=Ot,e=n?.manifest.items??[],t=n?e[n.currentIndex]??null:null,i=e.length>0;T_.textContent=`${e.length} item${e.length===1?"":"s"}`,y_.textContent=i&&n?`${n.currentIndex+1} / ${e.length}`:"0 / 0",b_.textContent=t?hd(t,n?.currentIndex??0):"No candidate selected",x_.textContent=t?Gp(t):"--",S_.textContent=t?n2(t):"--",w_.textContent=t?e2(t):"--",E_.textContent=t?t2(t):"--",M_.textContent=t?.meta?.reason??"--",Yu.disabled=!n||n.loading||n.currentIndex<=0,Zu.disabled=!n||n.loading||!n.currentClip,Ku.disabled=!n||n.loading||n.currentIndex>=e.length-1;const s=!n||n.loading||iv(t)===null;if(ju.disabled=s,Ju.disabled=s,Qu.disabled=s,av(n),ka.replaceChildren(),!n||e.length===0){const a=document.createElement("p");a.className="stat-window-empty",a.textContent="No review playlist loaded.",ka.append(a);return}e.forEach((a,r)=>{const o=document.createElement("button");o.type="button",o.className="mechanics-review-item",o.dataset.active=r===n.currentIndex?"true":"false",o.disabled=n.loading,o.addEventListener("click",()=>{al(r)});const l=document.createElement("span");l.textContent=hd(a,r);const c=document.createElement("strong");c.textContent=[Gp(a),fd(a.meta?.reviewStatus)].join(" · "),o.append(l,c),ka.append(o)})}async function ov(n,e){const t=new Map;for(const i of n.replays??[])t.set(i.id,i);Ot={manifest:n,sourceUrl:e,replaysById:t,replayLoadStates:new Map,replayLoadCache:new Map,currentIndex:0,loading:!1,currentReplayId:null,currentClip:null},a2(Ot),an(n.label?`Loaded ${n.label}.`:"Loaded review playlist."),pa(),n.items.length>0&&await al(0)}async function Wp(n){if(!n){an("Enter a review playlist URL.");return}const e=Q_(n,window.location.href);an("Loading review playlist...");const t=await fetch(e);if(!t.ok){const s=t.statusText?` ${t.statusText}`:"";throw new Error(`Failed to fetch review playlist from ${e} (${t.status}${s})`)}const i=J_(await t.text());await ov(i,t.url||e)}async function al(n){const e=Ot,t=e?.manifest.items[n];if(!(!e||!t||e.loading)){e.loading=!0,e.currentIndex=n,pa(),an(`Loading ${hd(t,n)}...`);try{if(!J||e.currentReplayId!==t.replay){const r=tv(t,e),o=rv(t,e);$p(e,t.replay),await th(r,o),e.currentReplayId=t.replay}else $p(e,t.replay);const i=Math.max(0,Hp(t.start)),s=Math.min(J?.getState().duration??Number.POSITIVE_INFINITY,Math.max(i,Hp(t.end)));if(!Number.isFinite(i)||!Number.isFinite(s)||s<=i)throw new Error("Review item has an empty playback range.");const a=nv(t);a&&J?.replay.players.some(r=>r.id===a)&&(J.setAttachedPlayer(a),J.setCameraViewMode("follow"),Wn=null),pn.checked=!1,mn.checked=!1,e.currentClip={startTime:i,endTime:s},J?.setState({currentTime:i,playing:!0,skipPostGoalTransitionsEnabled:!1,skipKickoffsEnabled:!1}),an(`Playing ${i.toFixed(2)}s to ${s.toFixed(2)}s`)}catch(i){console.error("Failed to activate mechanics review item:",i),e.currentClip=null,an(i instanceof Error?i.message:"Failed to load review item")}finally{e.loading=!1,pa()}}}function c2(){const n=Ot?.currentClip;!n||!J||J.setState({currentTime:n.startTime,playing:!0,skipPostGoalTransitionsEnabled:!1,skipKickoffsEnabled:!1})}async function Dc(n){const e=Ot,t=e?.manifest.items[e.currentIndex]??null,i=iv(t);if(!e||!t||!i){an("Current review item has no review endpoint.");return}an(`Submitting ${fd(n)}...`);const s=await fetch(i,{method:"POST",headers:{"content-type":"application/json",...i2()},credentials:"same-origin",body:JSON.stringify({status:n})});if(!s.ok){let a=`${s.status}${s.statusText?` ${s.statusText}`:""}`;try{const r=await s.json();typeof r.error=="string"&&(a=r.error)}catch{}an(`Review failed: ${a}`);return}t.meta=t.meta??{},t.meta.reviewStatus=n,an(`Marked ${fd(n)}.`),pa()}function u2(n){const e=Ot?.currentClip;if(!e||!J||No)return!1;const t=n.currentTime<e.startTime-.1,i=n.playing&&n.currentTime>=e.endTime-.025;if(!t&&!i)return!1;No=!0;try{J.setState({currentTime:t?e.startTime:e.endTime,playing:!1,skipPostGoalTransitionsEnabled:!1,skipKickoffsEnabled:!1}),i&&an(`Finished clip at ${e.endTime.toFixed(2)}s`)}finally{No=!1}return!0}function Xp(n,e){const t=document.createElement("section");t.className="module-summary-group";const i=document.createElement("h3");i.textContent=n;const s=document.createElement("div");return s.className="module-list",s.append(...e),t.append(i,s),t}function Uc(n,e){const t={"absolute-positioning:ranges":"Position zones","backboard:events":"Backboard","ball-carry:events":"Ball carry","boost:ranges":"Boost pickup timeline","bump:events":"Bump","ceiling-shot:events":"Ceiling shot","demo:events":"Demo","dodge-reset:events":"Dodge refresh","double-tap:events":"Double tap","fifty-fifty:events":"50/50","half-flip:events":"Half flip","musty-flick:events":"Musty flick","possession:ranges":"Possession","powerslide:events":"Powerslide","pressure:ranges":"Half control","rush:ranges":"Rush","speed-flip:events":"Speed flip","touch:events":"Touch","wavedash:events":"Wavedash"},i={"absolute-positioning":"Position zones","ceiling-shot":"Ceiling shot labels","fifty-fifty":"50/50 labels",pressure:"Half control","relative-positioning":"Player roles","speed-flip":"Speed flip labels",touch:"Touch labels"};return e==="effects"?i[n.id]??n.label:t[`${n.id}:${e}`]??`${n.label} timeline`}function Fc(n,e,t){const i=W_(t),s=i.has(n),a=document.createElement("button");a.type="button",a.className="module-summary-item",a.dataset.active=s?"true":"false",a.setAttribute("aria-pressed",s?"true":"false"),a.addEventListener("click",()=>{X_(n,t,!i.has(n))});const r=document.createElement("span");r.textContent=e;const o=document.createElement("strong");return o.textContent=s?"On":"Off",a.append(r,o),a}function pi(){Ba.replaceChildren();const n=Vi(),e=di.filter(t=>t.id!=="boost"&&t.id!==m_).map(t=>t.renderSettings?.(n)??null).filter(t=>t instanceof HTMLElement);if(e.length===0){Ba.hidden=!0,qp(),Kp();return}Ba.hidden=!1,Ba.append(...e),qp(),Kp()}function qp(){if(!td)return;const n=Vi(),e=yl.renderSettings(n,{showHeader:!1});td.replaceChildren(e)}function Gs(n){return typeof n=="number"&&Number.isFinite(n)?`${Math.round(n)}`:"--"}function d2(n,e){return n.players.find(t=>nt(t.player_id)===e)??null}function h2(n,e){const t=d2(n,e.id),i=document.createElement("div");i.className=`scoreboard-player-row ${bs(e.isTeamZero)}`;const s=document.createElement("span");s.className="scoreboard-player-name",s.textContent=t?.name||e.name;const a=document.createElement("span");return a.className="scoreboard-player-values",a.append(Pa(Gs(t?.core.score),"Score"),Pa(Gs(t?.core.goals),"Goals"),Pa(Gs(t?.core.assists),"Assists"),Pa(Gs(t?.core.saves),"Saves"),Pa(Gs(t?.core.shots),"Shots")),i.append(s,a),i}function Pa(n,e){const t=document.createElement("span");t.className="scoreboard-value",t.title=e;const i=document.createElement("strong");return i.textContent=n,t.append(i),t}function rl(n=J?.getState().frameIndex??0){if(!Fa)return;Fa.replaceChildren();const e=lv(n),t=J?.replay??null;if(!e||!t){const a=document.createElement("p");a.className="scoreboard-empty",a.textContent="Load a replay to show the scoreboard.",Fa.append(a);return}const i=document.createElement("div");i.className="scoreboard-scoreline",i.append(Yp("Blue",e.team_zero?.core.goals,!0),f2(),Yp("Orange",e.team_one?.core.goals,!1));const s=document.createElement("div");s.className="scoreboard-teams",s.append(Zp(e,t.players.filter(a=>a.isTeamZero)),Zp(e,t.players.filter(a=>!a.isTeamZero))),Fa.append(i,s)}function La(n){const e=document.createElement("span");return e.className="scoreboard-header-value",e.textContent=n,e}function f2(){const n=document.createElement("span");return n.className="scoreboard-divider",n.textContent="-",n}function Yp(n,e,t){const i=document.createElement("div");i.className=`scoreboard-team-score ${bs(t)}`;const s=document.createElement("span");s.textContent=n;const a=document.createElement("strong");return a.textContent=Gs(e),i.append(s,a),i}function p2(){const n=document.createElement("div");n.className="scoreboard-player-row scoreboard-player-row-header";const e=document.createElement("span");e.className="scoreboard-player-name";const t=document.createElement("span");return t.className="scoreboard-player-values",t.append(La("Score"),La("G"),La("A"),La("S"),La("Sh")),n.append(e,t),n}function Zp(n,e){const t=document.createElement("div");if(t.className="scoreboard-team",t.append(p2()),e.length===0){const i=document.createElement("p");return i.className="scoreboard-empty",i.textContent="No players",t.append(i),t}for(const i of e)t.append(h2(n,i));return t}function Kp(){if(!To)return;const n=Vi(),t=ga.find(i=>i.id===m_)?.renderSettings?.(n)??null;To.replaceChildren(),t instanceof HTMLElement&&To.append(t)}function m2(n){return ds.find(e=>e.id===n)??null}function lv(n){return ms?Et(ms,n):null}function Jd(n,e){return e==="blue"?n.team_zero??null:n.team_one??null}function Qd(n){return n==="blue"?"Blue":"Orange"}function cv(n){const e=J?.replay.players.find(t=>t.id===n);return e?bs(e.isTeamZero):null}function El(n){return bs(n==="blue")}function uv(n,e){const t=J?.replay.players??[];for(const i of["blue","orange"]){const s=t.filter(r=>r.isTeamZero===(i==="blue"));if(s.length===0)continue;const a=document.createElement("optgroup");a.label=`${Qd(i)} team`;for(const r of s)a.append(new Option(r.name,r.id,r.id===e,r.id===e));n.append(a)}}function g2(n){return n.kind==="player"?cv(n.playerId):n.kind==="team"?El(n.team??"blue"):null}function _2(n,e){return n.scope==="player"?cv(e):El(e==="orange"?"orange":"blue")}function v2(n){switch(n){case"player":return"Player stats";case"team":return"Team stats";case"all-players":return"All players stats";case"all-teams":return"All teams stats";case"goals-overview":return"Goal labels";case"ad-hoc":return"Ad hoc stats"}}function dv(n){return n==="player"||n==="team"}function y2(n){return n!=="goals-overview"}function hv(n){switch(n){case"player":case"all-players":return"player";case"team":case"all-teams":return"team";case"goals-overview":return null;case"ad-hoc":return null}}function b2(){const n=gs.size*18;return{x:Math.max(12,Math.min(window.innerWidth-360,96+n)),y:Math.max(64,Math.min(window.innerHeight-240,96+n))}}function wr(n=J?.getState().frameIndex??0,e={}){for(const t of gs.values())e.preserveOpenPickers&&(t.pickerOpen||t.element.contains(document.activeElement))||jn(t,n)}function fv(n,e){const t=e?.id??`stats-${ja++}`,i=Number.parseInt(t.replace(/^stats-/,""),10);Number.isFinite(i)&&(ja=Math.max(ja,i+1));const{x:s,y:a}=b2(),r=document.createElement("section");r.className="stats-window",r.dataset.windowId=t,r.style.setProperty("--window-x",`${s}px`),r.style.setProperty("--window-y",`${a}px`),e&&K_(r,e.placement);const o=document.createElement("header");o.className="stats-window-header";const l=document.createElement("div");l.className="stats-window-actions";const c=document.createElement("button");if(c.type="button",c.className="stats-window-action",c.textContent="Hide",l.append(c),dv(n))o.classList.add("stats-window-header-actions-only"),o.append(l);else{const h=document.createElement("h2");h.textContent=v2(n),o.append(h,l)}const u=document.createElement("div");u.className="stats-window-body",r.append(o,u),nd.append(r);const d={id:t,kind:n,entries:e?.entries.map(h=>({key:`${t}:${h.statId}:${h.targetId??"scope"}`,statId:h.statId,targetId:h.targetId}))??[],playerId:e?.playerId??J?.replay.players[0]?.id??null,team:e?.team??"blue",pickerOpen:!1,query:"",element:r,body:u};return c.addEventListener("click",()=>{r.hidden=!0,Ke()}),gs.set(t,d),e||Sl(r),Ja(!1),jn(d),Ke(),d}function x2(n){for(const e of gs.values())e.element.remove();gs.clear(),ja=1;for(const e of n)fv(e.kind,e)}function jn(n,e=J?.getState().frameIndex??0){const t=document.activeElement,i=t instanceof HTMLInputElement&&t.dataset.statsWindowSearch===n.id,s=i?t.selectionStart:null,a=i?t.selectionEnd:null,r=i?t.selectionDirection:null;if(n.body.replaceChildren(),S2(n),y2(n.kind)&&(w2(n),E2(n)),A2(n,e),i){const o=n.body.querySelector(`input[data-stats-window-search="${n.id}"]`);o?.focus({preventScroll:!0}),o&&s!==null&&a!==null&&o.setSelectionRange(s,a,r??"none")}}function S2(n){if(n.kind!=="player"&&n.kind!=="team")return;const e=document.createElement("div");e.className="stats-window-scope-row";const t=document.createElement("select");t.className="stats-window-scope-select";const i=g2(n);i&&t.classList.add(i),t.setAttribute("aria-label",n.kind==="player"?"Player stats target":"Team stats target"),n.kind==="player"?(uv(t,n.playerId),t.value=n.playerId??"",t.addEventListener("change",()=>{n.playerId=t.value||null,jn(n),Ke()})):(t.append(new Option("Blue","blue",n.team==="blue",n.team==="blue"),new Option("Orange","orange",n.team==="orange",n.team==="orange")),t.value=n.team??"blue",t.addEventListener("change",()=>{n.team=t.value==="orange"?"orange":"blue",jn(n),Ke()})),e.append(t),n.body.append(e)}function w2(n){const e=document.createElement("button");if(e.type="button",e.className="stats-window-add-button",e.textContent="+",e.title="Add stat",e.setAttribute("aria-label","Add stat"),e.setAttribute("aria-expanded",String(n.pickerOpen)),pd(e,()=>{n.pickerOpen=!n.pickerOpen,jn(n)}),dv(n.kind)){n.body.querySelector(".stats-window-scope-row")?.append(e);return}const t=document.createElement("div");t.className="stats-window-toolbar",t.append(e),n.body.append(t)}function pd(n,e){let t=!1;n.addEventListener("pointerdown",i=>{n.disabled||(t=!0,i.preventDefault(),e())}),n.addEventListener("click",()=>{if(t){t=!1;return}n.disabled||e()})}function E2(n){const e=document.createElement("div");if(e.className="stats-window-picker",e.hidden=!n.pickerOpen,e.hidden){n.body.append(e);return}const t=hv(n.kind),i=document.createElement("input");i.type="search",i.placeholder="Search stats",i.value=n.query,i.dataset.statsWindowSearch=n.id;const s=document.createElement("div");s.className="stats-window-picker-list",i.addEventListener("input",()=>{n.query=i.value,jp(n,s,t)}),jp(n,s,t),e.append(i,s),n.body.append(e)}function jp(n,e,t){e.replaceChildren();const i=t?ds.filter(r=>r.scope===t):ds,s=AR(i,n.query),a=new Map;for(const r of s){const o=a.get(r.category)??[];o.push(r),a.set(r.category,o)}for(const[r,o]of a){if(o.length<2)continue;const l=document.createElement("button");l.type="button",l.className="stats-window-picker-item",l.innerHTML=`<span>Add all ${r}</span><strong>${o.length}</strong>`,pd(l,()=>{for(const c of o)Jp(n,c);jn(n),Ke()}),e.append(l)}for(const r of s){const o=document.createElement("button");o.type="button",o.className="stats-window-picker-item",o.innerHTML=`<span>${r.label}</span><strong>${r.scope}</strong>`,o.disabled=n.kind!=="ad-hoc"&&n.entries.some(l=>l.statId===r.id),pd(o,()=>{Jp(n,r),jn(n),Ke()}),e.append(o)}if(s.length===0){const r=document.createElement("p");r.className="stat-window-empty",r.textContent=ds.length===0?"No stats available.":"No matching stats.",e.append(r)}}function Jp(n,e){const t=n.kind==="ad-hoc"?M2(e):void 0;n.entries.some(i=>i.statId===e.id&&i.targetId===t)||n.entries.push({key:`${n.id}:${e.id}:${t??"scope"}`,statId:e.id,targetId:t})}function M2(n){return n.scope==="player"?J?.replay.players[0]?.id??"":"blue"}function T2(n,e){const t=n.entries.findIndex(i=>i.key===e);t>=0&&n.entries.splice(t,1)}function A2(n,e){if(n.kind==="goals-overview"){C2(n);return}const t=lv(e),i=hv(n.kind),s=n.entries.map(a=>({entry:a,definition:m2(a.statId)})).filter(a=>a.definition!==null&&(!i||a.definition.scope===i));if(s.length===0){const a=document.createElement("p");a.className="stat-window-empty",a.textContent="No stats added.",n.body.append(a);return}if(!t){const a=document.createElement("p");a.className="stat-window-empty",a.textContent="Load a replay to show stats.",n.body.append(a);return}if(n.kind==="all-players"){R2(n,t,s);return}if(n.kind==="all-teams"){P2(n,t,s);return}if(n.kind==="player"){const a=n.playerId?t.players.find(r=>nt(r.player_id)===n.playerId)??null:null;em(n,a,s);return}if(n.kind==="team"){em(n,Jd(t,n.team??"blue"),s);return}n.kind==="ad-hoc"&&L2(n,t,s)}function C2(n){const e=sn,t=J?.replay??null;if(!e||!t){Qp(n,"Load a replay to show goal labels.");return}const i=[...e.events.goal_context??[]].sort((l,c)=>l.time-c.time),s=new Map;for(const l of e.events.goal_tags??[]){const c=s.get(l.goal_index)??[];c.push(l),s.set(l.goal_index,c)}for(const l of s.values())l.sort((c,u)=>c.kind.localeCompare(u.kind)||u.confidence-c.confidence);const a=new Set(i.map((l,c)=>c));for(const l of s.keys())a.add(l);const r=[...a].sort((l,c)=>l-c);if(r.length===0){Qp(n,"No goals loaded.");return}const o=document.createElement("div");o.className="goal-label-list";for(const l of r){const c=i[l]??null,u=s.get(l)??[],d=u[0]??null,h=c?.time??d?.time??0,p=c?.scorer??d?.scorer??null,g=p?nt(p):null,_=p?t.players.find(v=>v.id===g)?.name??g:"Unknown scorer",m=c?.scoring_team_is_team_0??d?.scoring_team_is_team_0??null,f=document.createElement("section");f.className="goal-label-item",m!==null&&f.classList.add(bs(m));const w=document.createElement("header"),x=document.createElement("h3");x.textContent=`Goal ${l+1}`;const y=document.createElement("span");y.textContent=`${pv(h)} · ${_}`,w.append(x,y);const C=document.createElement("div");if(C.className="goal-label-tags",u.length===0){const v=document.createElement("span");v.className="goal-label-tag goal-label-tag-empty",v.textContent="Unlabeled",C.append(v)}else for(const v of u){const b=document.createElement("span");b.className="goal-label-tag",b.textContent=`${gn(v.kind)} ${Math.round(v.confidence*100)}%`,C.append(b)}const M=document.createElement("div");M.className="goal-label-actions";const T=document.createElement("button");T.type="button",T.className="goal-label-watch",T.textContent="Watch",T.addEventListener("click",()=>{OP(h,g)});const A=document.createElement("button");A.type="button",A.textContent="Cue",A.addEventListener("click",()=>{J?.setState({currentTime:Math.max(0,h-p_),playing:!1,skipPostGoalTransitionsEnabled:!1,skipKickoffsEnabled:!1}),pn.checked=!1,mn.checked=!1,Ke()}),M.append(T,A),f.append(w,C,M),o.append(f)}n.body.append(o)}function Qp(n,e){const t=document.createElement("p");t.className="stat-window-empty",t.textContent=e,n.body.append(t)}function pv(n){if(!Number.isFinite(n))return"--";const e=Math.floor(Math.max(0,n)/60),t=Math.max(0,n)-e*60;return`${e}:${t.toFixed(1).padStart(4,"0")}`}function em(n,e,t){const i=document.createElement("div");i.className="stats-window-stat-list";for(const{entry:s,definition:a}of t)i.append(Ml(n,s,a,e?a.format(a.read(e)):"--"));n.body.append(i)}function R2(n,e,t){const i=document.createElement("div");i.className="stats-window-team-list";for(const s of["blue","orange"]){const a=e.players.filter(d=>d.is_team_0===(s==="blue"));if(a.length===0)continue;const r=document.createElement("section");r.className=`stats-window-team-group ${El(s)}`;const o=document.createElement("header");o.className="stats-window-team-header";const l=document.createElement("h3");l.textContent=`${Qd(s)} team`;const c=document.createElement("span");c.textContent=`${a.length} player${a.length===1?"":"s"}`,o.append(l,c),r.append(o);const u=document.createElement("div");u.className="stats-window-entity-list";for(const d of a){const h=document.createElement("section");h.className=`stats-window-entity ${bs(d.is_team_0)}`;const p=document.createElement("h4");p.className="stats-window-entity-title",p.textContent=d.name,h.append(p);for(const{entry:g,definition:_}of t)h.append(Ml(n,g,_,_.format(_.read(d))));u.append(h)}r.append(u),i.append(r)}n.body.append(i)}function P2(n,e,t){const i=document.createElement("div");i.className="stats-window-entity-list";for(const s of["blue","orange"]){const a=Jd(e,s),r=document.createElement("section");r.className=`stats-window-entity ${El(s)}`;const o=document.createElement("h3");o.className="stats-window-entity-title",o.textContent=Qd(s),r.append(o);for(const{entry:l,definition:c}of t)r.append(Ml(n,l,c,a?c.format(c.read(a)):"--"));i.append(r)}n.body.append(i)}function L2(n,e,t){const i=document.createElement("div");i.className="stats-window-stat-list";for(const{entry:s,definition:a}of t){const r=I2(e,a,s.targetId);i.append(Ml(n,s,a,r?a.format(a.read(r)):"--"))}n.body.append(i)}function I2(n,e,t){return e.scope==="player"?n.players.find(i=>nt(i.player_id)===t)??n.players[0]??null:Jd(n,t==="orange"?"orange":"blue")}function Ml(n,e,t,i){const s=document.createElement("div");s.className="stats-window-stat-row";const a=document.createElement("span");if(a.className="stats-window-stat-name",a.textContent=t.label,n.kind==="ad-hoc"){const l=document.createElement("select");l.className="stats-window-stat-target";const c=_2(t,e.targetId);c&&l.classList.add(c),t.scope==="player"?uv(l,e.targetId):l.append(new Option("Blue","blue",e.targetId==="blue",e.targetId==="blue"),new Option("Orange","orange",e.targetId==="orange",e.targetId==="orange")),l.value=e.targetId??"",l.addEventListener("change",()=>{const u=l.value;if(n.entries.some(h=>h!==e&&h.statId===e.statId&&h.targetId===u)){jn(n);return}const d=n.entries.findIndex(h=>h.key===e.key);d>=0&&(n.entries[d]={key:`${n.id}:${e.statId}:${u}`,statId:e.statId,targetId:u}),jn(n),Ke()}),a.append(" ",l)}const r=document.createElement("span");r.className="stats-window-stat-value",r.textContent=i;const o=document.createElement("button");return o.type="button",o.className="stats-window-stat-remove",o.textContent="x",o.addEventListener("click",()=>{T2(n,e.key),jn(n),Ke()}),s.append(a,r,o),s}function Sn(n,e="",t=0){return n===void 0||Number.isNaN(n)?"--":`${n.toFixed(t)}${e}`}function mv(){return{fov:110,height:100,pitch:-4,distance:270,stiffness:0,swivelSpeed:1,transitionSpeed:1}}function N2(n){return!J||n===null?null:J.replay.players.find(e=>e.id===n)?.cameraSettings??null}function gv(n){return{...mv(),...N2(n.attachedPlayerId)??{},...n.customCameraSettings??{}}}function tm(){return{fov:Number(hr.value),height:Number(fr.value),pitch:Number(pr.value),distance:Number(mr.value),stiffness:Number(gr.value),swivelSpeed:Number(_r.value),transitionSpeed:Number(vr.value)}}function D2(n){tl.hidden=!Ci.checked,hr.disabled=!n,fr.disabled=!n,pr.disabled=!n,mr.disabled=!n,gr.disabled=!n,_r.disabled=!n,vr.disabled=!n}function _v(n){const e=mv(),t=n.fov??e.fov,i=n.height??e.height,s=n.pitch??e.pitch,a=n.distance??e.distance,r=n.stiffness??e.stiffness,o=n.swivelSpeed??e.swivelSpeed,l=n.transitionSpeed??e.transitionSpeed;hr.value=`${t}`,fr.value=`${i}`,pr.value=`${s}`,mr.value=`${a}`,gr.value=`${r}`,_r.value=`${o}`,vr.value=`${l}`,C_.textContent=Sn(t,"",0),R_.textContent=Sn(i,"",0),P_.textContent=Sn(s,"",0),L_.textContent=Sn(a,"",0),I_.textContent=Sn(r,"",2),N_.textContent=Sn(o,"",1),D_.textContent=Sn(l,"",2)}function nm(n){el.disabled=!n,us.disabled=!n,Di.disabled=!n,pn.disabled=!n,mn.disabled=!n,eh(n?J?.getState():void 0)}function U2(n){switch(n){case"free":return id;case"follow":return sd}}function eh(n){const e=n?.cameraViewMode??"free",t=J!==null&&n!==void 0,i=(n?.attachedPlayerId??null)!==null;for(const s of gP){const a=U2(s);a.disabled=!t||s==="follow"&&!i;const r=s===e;a.dataset.active=r?"true":"false",a.setAttribute("aria-pressed",r?"true":"false")}qa.disabled=!t,Ya.disabled=!t,qa.dataset.active="false",Ya.dataset.active="false",qa.setAttribute("aria-pressed","false"),Ya.setAttribute("aria-pressed","false")}function md(n){eh(n);const e=J!==null&&n?.cameraViewMode==="follow"&&(n.attachedPlayerId??null)!==null;Za.disabled=!e,Ci.disabled=!e,D2(e&&n?.customCameraSettings!==null),Ka.disabled=!e}function F2(n){Di.replaceChildren(),Di.append(new Option("Free camera",""));for(const e of n)Di.append(new Option(`${e.name} (${e.isTeamZero?"Blue":"Orange"})`,e.id))}function O2(n){if(n<=0)return"--";const e=["B","KB","MB","GB"];let t=n,i=0;for(;t>=1024&&i<e.length-1;)t/=1024,i+=1;const s=i===0?0:t>=10?1:2;return`${t.toFixed(s)} ${e[i]}`}function k2(n){if(!n)return"No replay";if(n.error)return n.error;switch(n.state){case"idle":return"Idle";case"recording":return"Recording";case"stopping":return"Stopping";case"ready":return"Ready";case"error":return"Error"}}function im(){const n=Number(ua.value),e=Number(da.value);return{fps:Number.isFinite(n)?Math.max(1,Math.min(120,Math.trunc(n))):60,playbackRate:Number.isFinite(e)?Math.max(.1,e):1}}function Nn(n=$t?.getStatus()??null){const e=$t!==null&&J!==null,t=n?.state??"idle",i=t==="recording"||t==="stopping",s=($t?.getRecording()??null)!==null;H_.textContent=k2(n),V_.textContent=`${(n?.elapsedSeconds??0).toFixed(1)}s`,G_.textContent=O2(n?.sizeBytes??0),$_.textContent=n?.mimeType||"WebM",od.disabled=!e||i,ld.disabled=!e||i,cd.disabled=!e||!i,ud.disabled=!s||i,dd.disabled=!s||i,ua.disabled=i,da.disabled=i}function B2(){const e=(il?.replace(/\.replay$/i,"")||"replay").replace(/[^a-zA-Z0-9._-]+/g,"-").replace(/^-+|-+$/g,""),t=new Date().toISOString().replace(/[:.]/g,"-");return`${e||"replay"}-${t}.webm`}function z2(n){const e=URL.createObjectURL(n),t=document.createElement("a");t.href=e,t.download=B2(),document.body.append(t),t.click(),t.remove(),window.setTimeout(()=>URL.revokeObjectURL(e),0)}function vv(n){const e=n?.attachedPlayerId??null;if(!J||n?.cameraViewMode!=="follow"||e===null){Ao.textContent="Free camera",Co.textContent="--",Ro.textContent="--",Po.textContent="--",Lo.textContent="--",Io.textContent="--";return}const t=J.replay.players.find(s=>s.id===e);if(!t){Ao.textContent="Unknown",Co.textContent="--",Ro.textContent="--",Po.textContent="--",Lo.textContent="--",Io.textContent="--";return}const i=gv(n);Ao.textContent=n.customCameraSettings===null?t.name:`${t.name} custom`,Co.textContent=Sn(i.fov,"",0),Ro.textContent=Sn(i.height,"",0),Po.textContent=Sn(i.pitch,"",0),Lo.textContent=Sn(i.distance,"",0),Io.textContent=Sn(i.stiffness,"",2)}function sm(n){u2(n)||(U_.textContent=`${n.currentTime.toFixed(2)}s`,F_.textContent=`${n.frameIndex}`,O_.textContent=`${n.duration.toFixed(2)}s`,k_.textContent=n.playing?"Playing":"Paused",el.textContent=n.playing?"Pause":"Play",us.value=`${n.speed}`,Za.value=`${n.cameraDistanceScale}`,A_.textContent=`${n.cameraDistanceScale.toFixed(2)}x`,Ci.checked=n.customCameraSettings!==null,tl.hidden=!Ci.checked,_v(gv(n)),Ka.checked=n.ballCamEnabled,Di.value=n.attachedPlayerId??"",pn.checked=n.skipPostGoalTransitionsEnabled,mn.checked=n.skipKickoffsEnabled,Jo.hidden=!0,md(n),vv(n),wr(n.frameIndex,{preserveOpenPickers:!0}),rl(n.frameIndex),yr(n))}function H2(n){return yl.includePickup(n)}function V2(n){return{name:n.name,preparingStatus:"Preparing replay...",async readBytes(){return new Uint8Array(await n.arrayBuffer())}}}function G2(n,e){return{name:n.name,preparingStatus:"Fetching replay...",async readBytes(){const t=await fetch(n.url,{...n.fetchInit,signal:e});if(!t.ok){const i=t.statusText?` ${t.statusText}`:"",s=n.kind==="ballchasing"&&[401,403,404].includes(t.status)?". The replay may be private, unavailable, or not downloadable without a Ballchasing session":"";throw new Error(`Failed to fetch replay from ${n.url.href} (${t.status}${i})${s}`)}return new Uint8Array(await t.arrayBuffer())}}}async function yv(n){await th(n,Promise.resolve().then(()=>$2(n,e=>{tn.textContent=ml(e),ci?.update(e)})))}async function $2(n,e){const t=await n.readBytes();return rg(t,{reportEveryNFrames:100,onProgress:e})}async function th(n,e){tn.textContent=n.preparingStatus,ea.disabled=!0,ci?.show(n.name,n.preparingStatus),nm(!1),md(),Jo.hidden=!1,Ys&&(Ys(),Ys=null),Zd(),J?.destroy(),J=null,$t=null,il=null,hn=null,sn=null,ms=null,ds=Yo(null),bl(),xl(),q_(),Bi=null,zi=null,rl(),fi(),Op(),fa(),pi(),Nn();try{tn.textContent="Parsing replay...",ci?.show(n.name,"Parsing replay...");const t=await e,{replay:i}=t;sn=t.statsTimeline,ms=qA(sn),ds=Yo(sn.frames[0]??null),hn=HT({replayEventsLabel:"Replay",replayEvents:r=>Uo(_g(r.replay,_n))});const s=ST({onStatusChange:Nn});$t=s;const a=Ei;if(J=new UM(v_,i,{initialPlaybackRate:a?.playback.rate,initialCameraDistanceScale:a?.camera.distanceScale??f_,initialCustomCameraSettings:a?.camera.customSettings??null,initialAttachedPlayerId:a?.camera.attachedPlayerId??null,initialCameraViewMode:a?.camera.mode,initialBallCamEnabled:a?.camera.ballCam??!1,initialBoostPickupAnimationEnabled:a?.overlays.boostPickupAnimation??!1,initialSkipPostGoalTransitionsEnabled:pn.checked,initialSkipKickoffsEnabled:mn.checked,plugins:[XM(),_T({includePickup:H2}),s,hn]}),Kd(),ha(),Ys=J.subscribe(sm),a){ta=!0;try{BP(a)}finally{ta=!1}}F2(i.players),Jo.hidden=!0,tn.textContent=`Loaded ${n.name}`,il=n.name,B_.textContent=i.players.map(r=>r.name).join(", "),z_.textContent=`${i.frameCount}`,fi(),Op(),Bi=null,zi=null,fa(),nm(!0),md(J.getState()),sm(J.getState()),wr(J.getState().frameIndex),rl(J.getState().frameIndex),yr(J.getState(),{forceScroll:!0}),pi(),Nn(),ci?.hide()}catch(t){throw ci?.hide(),J?.destroy(),J=null,$t=null,Nn(),t}finally{ea.disabled=!1}}function W2(n){let e;try{e=ZR(window.location.search,window.location.href)}catch(t){console.error("Invalid replay URL:",t),tn.textContent=t instanceof Error?t.message:"Invalid replay URL";return}e&&yv(G2(e,n)).catch(t=>{n.aborted||(console.error("Failed to load replay URL:",t),tn.textContent=t instanceof Error?t.message:"Failed to load replay URL")})}function X2(n,e={}){ho?.(),n.innerHTML=VT(f_),Ni=n,ci=qT(n),ea=ie(n,"#replay-file"),v_=ie(n,"#viewport"),Jo=ie(n,"#empty-state"),Pp=ie(n,"#empty-load-replay"),Qo=ie(n,"#launcher-toggle"),Xu=ie(n,"#launcher-menu"),Lp=ie(n,"#load-replay-action"),Ip=ie(n,"#floating-window-layer"),Fa=ie(n,"#scoreboard-window-body"),wi=ie(n,"#mechanics-timeline-window-body"),Zs=ie(n,"#event-playlist-window-body"),uo=ie(n,"#mechanics-review-file"),Ic=ie(n,"#mechanics-review-url"),Np=ie(n,"#mechanics-review-load-url"),qu=ie(n,"#mechanics-review-status"),y_=ie(n,"#mechanics-review-index"),b_=ie(n,"#mechanics-review-title"),x_=ie(n,"#mechanics-review-mechanic"),S_=ie(n,"#mechanics-review-player"),w_=ie(n,"#mechanics-review-clip"),E_=ie(n,"#mechanics-review-event"),M_=ie(n,"#mechanics-review-reason"),Yu=ie(n,"#mechanics-review-prev"),Zu=ie(n,"#mechanics-review-replay"),Ku=ie(n,"#mechanics-review-next"),ju=ie(n,"#mechanics-review-confirm"),Ju=ie(n,"#mechanics-review-reject"),Qu=ie(n,"#mechanics-review-uncertain"),ed=ie(n,"#mechanics-review-replay-load-summary"),Oa=ie(n,"#mechanics-review-replay-loads"),T_=ie(n,"#mechanics-review-count"),ka=ie(n,"#mechanics-review-list"),td=ie(n,"#boost-pickup-filters-window-body"),To=ie(n,"#touch-controls-window-body"),nd=ie(n,"#stats-window-layer"),el=ie(n,"#toggle-playback"),us=ie(n,"#playback-rate"),Di=ie(n,"#attached-player"),id=ie(n,"#camera-view-free"),sd=ie(n,"#camera-view-follow"),qa=ie(n,"#camera-view-overhead"),Ya=ie(n,"#camera-view-side"),Za=ie(n,"#camera-distance"),A_=ie(n,"#camera-distance-readout"),Ci=ie(n,"#custom-camera-settings"),tl=ie(n,"#camera-settings-controls"),hr=ie(n,"#custom-camera-fov"),fr=ie(n,"#custom-camera-height"),pr=ie(n,"#custom-camera-pitch"),mr=ie(n,"#custom-camera-distance"),gr=ie(n,"#custom-camera-stiffness"),_r=ie(n,"#custom-camera-swivel-speed"),vr=ie(n,"#custom-camera-transition-speed"),C_=ie(n,"#custom-camera-fov-readout"),R_=ie(n,"#custom-camera-height-readout"),P_=ie(n,"#custom-camera-pitch-readout"),L_=ie(n,"#custom-camera-distance-readout"),I_=ie(n,"#custom-camera-stiffness-readout"),N_=ie(n,"#custom-camera-swivel-speed-readout"),D_=ie(n,"#custom-camera-transition-speed-readout"),Ka=ie(n,"#ball-cam"),ad=ie(n,"#module-summary"),Ba=ie(n,"#module-settings"),U_=ie(n,"#time-readout"),F_=ie(n,"#frame-readout"),O_=ie(n,"#duration-readout"),k_=ie(n,"#playback-status-readout"),tn=ie(n,"#status-readout"),B_=ie(n,"#players-readout"),z_=ie(n,"#frames-readout"),rd=ie(n,"#events-readout"),Ao=ie(n,"#camera-profile-readout"),Co=ie(n,"#camera-fov-readout"),Ro=ie(n,"#camera-height-readout"),Po=ie(n,"#camera-pitch-readout"),Lo=ie(n,"#camera-base-distance-readout"),Io=ie(n,"#camera-stiffness-readout"),pn=ie(n,"#skip-post-goal-transitions"),mn=ie(n,"#skip-kickoffs"),ua=ie(n,"#recording-fps"),da=ie(n,"#recording-playback-rate"),od=ie(n,"#recording-start"),ld=ie(n,"#recording-full-replay"),cd=ie(n,"#recording-stop"),ud=ie(n,"#recording-download"),dd=ie(n,"#recording-clear"),H_=ie(n,"#recording-status"),V_=ie(n,"#recording-elapsed"),G_=ie(n,"#recording-size"),$_=ie(n,"#recording-type");const t=u_(window.location),i=nP(window.location);let s=null;if(e.initialConfig!==void 0)Ei=e.initialConfig;else{try{Ei=tP(window.location)}catch(l){s=l,console.error("Invalid stats player config:",l),tn.textContent=l instanceof Error?l.message:"Invalid stats player config",Ei=null}i&&NP(t,Ei,s)}const a=new AbortController;Fp(Ip,a.signal),Fp(nd,a.signal);const r=()=>{a.abort(),Ys?.(),Ys=null,Zd(),J?.destroy(),J=null,$t=null,hn=null,sn=null,ms=null,ds=Yo(null),gs.clear(),bl(),xl(),q_(),di=[],ci?.destroy(),ci=null,_n=new Set,_a=new Set,dn=new Set,va=new Set,Bi=null,sl=!0,zi=null,Ot=null,No=!1,hi=!0,il=null,Wn=null,Ei=null,ls!==null&&(window.clearTimeout(ls),ls=null),ta=!1,ja=1,nl=30,Ko=null,Ni===n&&(Ni=null,n.replaceChildren()),ho===r&&(ho=null)};if(ho=r,Ei){ta=!0;try{UP(Ei)}finally{ta=!1}}Qo.addEventListener("click",()=>{Ja(Xu.hidden)},{signal:a.signal}),n.addEventListener("click",l=>{l.target instanceof Element&&(l.target.closest(".top-chrome")||Ja(!1))},{signal:a.signal}),Lp.addEventListener("click",Up,{signal:a.signal}),Pp.addEventListener("click",Up,{signal:a.signal}),n.querySelectorAll("[data-window-toggle]").forEach(l=>{l.addEventListener("click",()=>{const c=l.dataset.windowToggle;c&&(HP(c),Ja(!1))},{signal:a.signal})}),n.querySelectorAll("[data-window-hide]").forEach(l=>{l.addEventListener("click",()=>{const c=l.dataset.windowHide??EP(l);c&&VP(c)},{signal:a.signal})}),n.querySelectorAll("[data-create-stats-window]").forEach(l=>{l.addEventListener("click",()=>{fv(l.dataset.createStatsWindow)},{signal:a.signal})}),ea.addEventListener("change",async()=>{const l=ea.files?.[0];if(l)try{Ot&&(Ot.currentClip=null,Ot.currentReplayId=null,pa()),await yv(V2(l))}catch(c){console.error("Failed to load replay:",c),tn.textContent=c instanceof Error?c.message:"Failed to load replay"}},{signal:a.signal}),uo.addEventListener("change",async()=>{const l=uo.files?.[0];if(l)try{const c=J_(await l.text());await ov(c,null)}catch(c){console.error("Failed to load mechanics review playlist:",c),an(c instanceof Error?c.message:"Failed to load mechanics review playlist")}finally{uo.value=""}},{signal:a.signal}),Np.addEventListener("click",()=>{Wp(Ic.value.trim()).catch(l=>{console.error("Failed to load mechanics review playlist URL:",l),an(l instanceof Error?l.message:"Failed to load mechanics review playlist URL")})},{signal:a.signal}),Yu.addEventListener("click",()=>{const l=Ot;l&&al(Math.max(0,l.currentIndex-1))},{signal:a.signal}),Zu.addEventListener("click",c2,{signal:a.signal}),Ku.addEventListener("click",()=>{const l=Ot;l&&al(Math.min(l.manifest.items.length-1,l.currentIndex+1))},{signal:a.signal}),ju.addEventListener("click",()=>{Dc("confirmed")},{signal:a.signal}),Ju.addEventListener("click",()=>{Dc("rejected")},{signal:a.signal}),Qu.addEventListener("click",()=>{Dc("uncertain")},{signal:a.signal}),el.addEventListener("click",()=>{J?.togglePlayback(),Ke()},{signal:a.signal}),us.addEventListener("change",()=>{J?.setPlaybackRate(Number(us.value)),Ke()},{signal:a.signal}),od.addEventListener("click",()=>{if($t)try{const{fps:l}=im();$t.start({fps:l}),Nn()}catch(l){console.error("Failed to start recording:",l),tn.textContent=l instanceof Error?l.message:"Failed to start recording",Nn($t.getStatus())}},{signal:a.signal}),ld.addEventListener("click",()=>{if(!$t)return;const{fps:l,playbackRate:c}=im();$t.recordFullReplay({fps:l,playbackRate:c,restorePlaybackState:!0}).catch(u=>{console.error("Failed to record replay:",u),tn.textContent=u instanceof Error?u.message:"Failed to record replay",Nn($t?.getStatus()??null)}),Nn()},{signal:a.signal}),cd.addEventListener("click",()=>{$t?.stop().catch(l=>{console.error("Failed to stop recording:",l),tn.textContent=l instanceof Error?l.message:"Failed to stop recording"}),Nn()},{signal:a.signal}),ud.addEventListener("click",()=>{const l=$t?.getRecording();l&&z2(l)},{signal:a.signal}),dd.addEventListener("click",()=>{try{$t?.clear(),Nn()}catch(l){console.error("Failed to clear recording:",l)}},{signal:a.signal}),ua.addEventListener("change",Ke,{signal:a.signal}),da.addEventListener("change",Ke,{signal:a.signal}),Za.addEventListener("input",()=>{J?.setCameraDistanceScale(Number(Za.value)),Ke()},{signal:a.signal}),Ci.addEventListener("change",()=>{tl.hidden=!Ci.checked,J?.setCustomCameraSettings(Ci.checked?tm():null),Ke()},{signal:a.signal});for(const l of[hr,fr,pr,mr,gr,_r,vr])l.addEventListener("input",()=>{const c=tm();_v(c),J?.setCustomCameraSettings(c),Ke()},{signal:a.signal});Di.addEventListener("change",()=>{J?.setAttachedPlayer(Di.value||null),Wn=null,Ke()},{signal:a.signal}),id.addEventListener("click",()=>{J?.setCameraViewMode("free"),Wn=null,Ke()},{signal:a.signal}),sd.addEventListener("click",()=>{J?.setCameraViewMode("follow"),Wn=null,Ke()},{signal:a.signal}),qa.addEventListener("click",()=>{J?.setFreeCameraPreset("overhead"),Wn="overhead",Ke()},{signal:a.signal}),Ya.addEventListener("click",()=>{J?.setFreeCameraPreset("side"),Wn="side",Ke()},{signal:a.signal}),Ka.addEventListener("change",()=>{J?.setBallCamEnabled(Ka.checked),Ke()},{signal:a.signal}),pn.addEventListener("change",()=>{J?.setSkipPostGoalTransitionsEnabled(pn.checked),Ke()},{signal:a.signal}),mn.addEventListener("change",()=>{J?.setSkipKickoffsEnabled(mn.checked),Ke()},{signal:a.signal}),Hi(),pi(),rl(),vv(),eh(),Nn(),fi(),pa(),fa(),e.initialBundle?th({name:e.initialReplayName??"replay",preparingStatus:"Preparing replay...",async readBytes(){throw new Error("Replay bytes are not available for this preloaded replay")}},Promise.resolve(e.initialBundle)).catch(l=>{a.signal.aborted||(console.error("Failed to load preprocessed replay bundle:",l),tn.textContent=l instanceof Error?l.message:"Failed to load preprocessed replay bundle")}):e.loadFromLocation!==!1&&W2(a.signal);const o=JP();return o&&(Ic.value=o,zP("mechanics-review"),Wp(o).catch(l=>{a.signal.aborted||(console.error("Failed to load mechanics review playlist from URL:",l),an(l instanceof Error?l.message:"Failed to load mechanics review playlist from URL"))})),{root:n,destroy:r}}export{X2 as mountStatEvaluationPlayer};
