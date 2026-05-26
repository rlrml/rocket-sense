(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function t(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(a){if(a.ep)return;a.ep=!0;const s=t(a);fetch(a.href,s)}})();const Hu="180",as={ROTATE:0,DOLLY:1,PAN:2},Ja={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},E0=0,Bh=1,M0=2,km=1,T0=2,pi=3,Gi=0,un=1,Qe=2,Fi=0,ss=1,ki=2,zh=3,Hh=4,A0=5,da=100,C0=101,R0=102,P0=103,L0=104,N0=200,I0=201,D0=202,U0=203,od=204,ld=205,F0=206,k0=207,O0=208,B0=209,z0=210,H0=211,G0=212,V0=213,$0=214,cd=0,dd=1,ud=2,us=3,hd=4,fd=5,pd=6,md=7,Rl=0,W0=1,X0=2,Oi=0,q0=1,Y0=2,Z0=3,K0=4,j0=5,J0=6,Q0=7,Om=300,hs=301,fs=302,gd=303,_d=304,Pl=306,vd=1e3,fa=1001,yd=1002,$n=1003,ey=1004,Gr=1005,Jn=1006,Jl=1007,pa=1008,ai=1009,Bm=1010,zm=1011,fr=1012,Gu=1013,ba=1014,mi=1015,Fr=1016,Vu=1017,$u=1018,pr=1020,Hm=35902,Gm=35899,Vm=1021,$m=1022,Gn=1023,mr=1026,gr=1027,Wm=1028,Wu=1029,Xm=1030,Xu=1031,qu=1033,No=33776,Io=33777,Do=33778,Uo=33779,bd=35840,xd=35841,wd=35842,Sd=35843,Ed=36196,Md=37492,Td=37496,Ad=37808,Cd=37809,Rd=37810,Pd=37811,Ld=37812,Nd=37813,Id=37814,Dd=37815,Ud=37816,Fd=37817,kd=37818,Od=37819,Bd=37820,zd=37821,Hd=36492,Gd=36494,Vd=36495,$d=36283,Wd=36284,Xd=36285,qd=36286,ty=3200,ny=3201,Yu=0,iy=1,Di="",Yt="srgb",ps="srgb-linear",nl="linear",dt="srgb",Pa=7680,Gh=519,ay=512,sy=513,ry=514,qm=515,oy=516,ly=517,cy=518,dy=519,Yd=35044,Vh="300 es",Qn=2e3,il=2001;class Ma{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const a=i[e];if(a!==void 0){const s=a.indexOf(t);s!==-1&&a.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const a=i.slice(0);for(let s=0,r=a.length;s<r;s++)a[s].call(this,e);e.target=null}}}const Wt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let $h=1234567;const Js=Math.PI/180,_r=180/Math.PI;function ei(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Wt[n&255]+Wt[n>>8&255]+Wt[n>>16&255]+Wt[n>>24&255]+"-"+Wt[e&255]+Wt[e>>8&255]+"-"+Wt[e>>16&15|64]+Wt[e>>24&255]+"-"+Wt[t&63|128]+Wt[t>>8&255]+"-"+Wt[t>>16&255]+Wt[t>>24&255]+Wt[i&255]+Wt[i>>8&255]+Wt[i>>16&255]+Wt[i>>24&255]).toLowerCase()}function Ye(n,e,t){return Math.max(e,Math.min(t,n))}function Zu(n,e){return(n%e+e)%e}function uy(n,e,t,i,a){return i+(n-e)*(a-i)/(t-e)}function hy(n,e,t){return n!==e?(t-n)/(e-n):0}function Qs(n,e,t){return(1-t)*n+t*e}function fy(n,e,t,i){return Qs(n,e,1-Math.exp(-t*i))}function py(n,e=1){return e-Math.abs(Zu(n,e*2)-e)}function my(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function gy(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function _y(n,e){return n+Math.floor(Math.random()*(e-n+1))}function vy(n,e){return n+Math.random()*(e-n)}function yy(n){return n*(.5-Math.random())}function by(n){n!==void 0&&($h=n);let e=$h+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function xy(n){return n*Js}function wy(n){return n*_r}function Sy(n){return(n&n-1)===0&&n!==0}function Ey(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function My(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Ty(n,e,t,i,a){const s=Math.cos,r=Math.sin,o=s(t/2),l=r(t/2),c=s((e+i)/2),d=r((e+i)/2),u=s((e-i)/2),h=r((e-i)/2),f=s((i-e)/2),g=r((i-e)/2);switch(a){case"XYX":n.set(o*d,l*u,l*h,o*c);break;case"YZY":n.set(l*h,o*d,l*u,o*c);break;case"ZXZ":n.set(l*u,l*h,o*d,o*c);break;case"XZX":n.set(o*d,l*g,l*f,o*c);break;case"YXY":n.set(l*f,o*d,l*g,o*c);break;case"ZYZ":n.set(l*g,l*f,o*d,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+a)}}function zn(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function st(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const mt={DEG2RAD:Js,RAD2DEG:_r,generateUUID:ei,clamp:Ye,euclideanModulo:Zu,mapLinear:uy,inverseLerp:hy,lerp:Qs,damp:fy,pingpong:py,smoothstep:my,smootherstep:gy,randInt:_y,randFloat:vy,randFloatSpread:yy,seededRandom:by,degToRad:xy,radToDeg:wy,isPowerOfTwo:Sy,ceilPowerOfTwo:Ey,floorPowerOfTwo:My,setQuaternionFromProperEuler:Ty,normalize:st,denormalize:zn};class ce{constructor(e=0,t=0){ce.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,a=e.elements;return this.x=a[0]*t+a[3]*i+a[6],this.y=a[1]*t+a[4]*i+a[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ye(this.x,e.x,t.x),this.y=Ye(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ye(this.x,e,t),this.y=Ye(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ye(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ye(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),a=Math.sin(t),s=this.x-e.x,r=this.y-e.y;return this.x=s*i-r*a+e.x,this.y=s*a+r*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Vi{constructor(e=0,t=0,i=0,a=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=a}static slerpFlat(e,t,i,a,s,r,o){let l=i[a+0],c=i[a+1],d=i[a+2],u=i[a+3];const h=s[r+0],f=s[r+1],g=s[r+2],_=s[r+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=d,e[t+3]=u;return}if(o===1){e[t+0]=h,e[t+1]=f,e[t+2]=g,e[t+3]=_;return}if(u!==_||l!==h||c!==f||d!==g){let m=1-o;const p=l*h+c*f+d*g+u*_,S=p>=0?1:-1,x=1-p*p;if(x>Number.EPSILON){const C=Math.sqrt(x),M=Math.atan2(C,p*S);m=Math.sin(m*M)/C,o=Math.sin(o*M)/C}const y=o*S;if(l=l*m+h*y,c=c*m+f*y,d=d*m+g*y,u=u*m+_*y,m===1-o){const C=1/Math.sqrt(l*l+c*c+d*d+u*u);l*=C,c*=C,d*=C,u*=C}}e[t]=l,e[t+1]=c,e[t+2]=d,e[t+3]=u}static multiplyQuaternionsFlat(e,t,i,a,s,r){const o=i[a],l=i[a+1],c=i[a+2],d=i[a+3],u=s[r],h=s[r+1],f=s[r+2],g=s[r+3];return e[t]=o*g+d*u+l*f-c*h,e[t+1]=l*g+d*h+c*u-o*f,e[t+2]=c*g+d*f+o*h-l*u,e[t+3]=d*g-o*u-l*h-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,a){return this._x=e,this._y=t,this._z=i,this._w=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,a=e._y,s=e._z,r=e._order,o=Math.cos,l=Math.sin,c=o(i/2),d=o(a/2),u=o(s/2),h=l(i/2),f=l(a/2),g=l(s/2);switch(r){case"XYZ":this._x=h*d*u+c*f*g,this._y=c*f*u-h*d*g,this._z=c*d*g+h*f*u,this._w=c*d*u-h*f*g;break;case"YXZ":this._x=h*d*u+c*f*g,this._y=c*f*u-h*d*g,this._z=c*d*g-h*f*u,this._w=c*d*u+h*f*g;break;case"ZXY":this._x=h*d*u-c*f*g,this._y=c*f*u+h*d*g,this._z=c*d*g+h*f*u,this._w=c*d*u-h*f*g;break;case"ZYX":this._x=h*d*u-c*f*g,this._y=c*f*u+h*d*g,this._z=c*d*g-h*f*u,this._w=c*d*u+h*f*g;break;case"YZX":this._x=h*d*u+c*f*g,this._y=c*f*u+h*d*g,this._z=c*d*g-h*f*u,this._w=c*d*u-h*f*g;break;case"XZY":this._x=h*d*u-c*f*g,this._y=c*f*u-h*d*g,this._z=c*d*g+h*f*u,this._w=c*d*u+h*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+r)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,a=Math.sin(i);return this._x=e.x*a,this._y=e.y*a,this._z=e.z*a,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],a=t[4],s=t[8],r=t[1],o=t[5],l=t[9],c=t[2],d=t[6],u=t[10],h=i+o+u;if(h>0){const f=.5/Math.sqrt(h+1);this._w=.25/f,this._x=(d-l)*f,this._y=(s-c)*f,this._z=(r-a)*f}else if(i>o&&i>u){const f=2*Math.sqrt(1+i-o-u);this._w=(d-l)/f,this._x=.25*f,this._y=(a+r)/f,this._z=(s+c)/f}else if(o>u){const f=2*Math.sqrt(1+o-i-u);this._w=(s-c)/f,this._x=(a+r)/f,this._y=.25*f,this._z=(l+d)/f}else{const f=2*Math.sqrt(1+u-i-o);this._w=(r-a)/f,this._x=(s+c)/f,this._y=(l+d)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ye(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const a=Math.min(1,t/i);return this.slerp(e,a),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,a=e._y,s=e._z,r=e._w,o=t._x,l=t._y,c=t._z,d=t._w;return this._x=i*d+r*o+a*c-s*l,this._y=a*d+r*l+s*o-i*c,this._z=s*d+r*c+i*l-a*o,this._w=r*d-i*o-a*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,a=this._y,s=this._z,r=this._w;let o=r*e._w+i*e._x+a*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=r,this._x=i,this._y=a,this._z=s,this;const l=1-o*o;if(l<=Number.EPSILON){const f=1-t;return this._w=f*r+t*this._w,this._x=f*i+t*this._x,this._y=f*a+t*this._y,this._z=f*s+t*this._z,this.normalize(),this}const c=Math.sqrt(l),d=Math.atan2(c,o),u=Math.sin((1-t)*d)/c,h=Math.sin(t*d)/c;return this._w=r*u+this._w*h,this._x=i*u+this._x*h,this._y=a*u+this._y*h,this._z=s*u+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),a=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(a*Math.sin(e),a*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class L{constructor(e=0,t=0,i=0){L.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Wh.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Wh.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,a=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*a,this.y=s[1]*t+s[4]*i+s[7]*a,this.z=s[2]*t+s[5]*i+s[8]*a,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,a=this.z,s=e.elements,r=1/(s[3]*t+s[7]*i+s[11]*a+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*a+s[12])*r,this.y=(s[1]*t+s[5]*i+s[9]*a+s[13])*r,this.z=(s[2]*t+s[6]*i+s[10]*a+s[14])*r,this}applyQuaternion(e){const t=this.x,i=this.y,a=this.z,s=e.x,r=e.y,o=e.z,l=e.w,c=2*(r*a-o*i),d=2*(o*t-s*a),u=2*(s*i-r*t);return this.x=t+l*c+r*u-o*d,this.y=i+l*d+o*c-s*u,this.z=a+l*u+s*d-r*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,a=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*a,this.y=s[1]*t+s[5]*i+s[9]*a,this.z=s[2]*t+s[6]*i+s[10]*a,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ye(this.x,e.x,t.x),this.y=Ye(this.y,e.y,t.y),this.z=Ye(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ye(this.x,e,t),this.y=Ye(this.y,e,t),this.z=Ye(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ye(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,a=e.y,s=e.z,r=t.x,o=t.y,l=t.z;return this.x=a*l-s*o,this.y=s*r-i*l,this.z=i*o-a*r,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Ql.copy(this).projectOnVector(e),this.sub(Ql)}reflect(e){return this.sub(Ql.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ye(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,a=this.z-e.z;return t*t+i*i+a*a}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const a=Math.sin(t)*e;return this.x=a*Math.sin(i),this.y=Math.cos(t)*e,this.z=a*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),a=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=a,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ql=new L,Wh=new Vi;class We{constructor(e,t,i,a,s,r,o,l,c){We.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,a,s,r,o,l,c)}set(e,t,i,a,s,r,o,l,c){const d=this.elements;return d[0]=e,d[1]=a,d[2]=o,d[3]=t,d[4]=s,d[5]=l,d[6]=i,d[7]=r,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,a=t.elements,s=this.elements,r=i[0],o=i[3],l=i[6],c=i[1],d=i[4],u=i[7],h=i[2],f=i[5],g=i[8],_=a[0],m=a[3],p=a[6],S=a[1],x=a[4],y=a[7],C=a[2],M=a[5],T=a[8];return s[0]=r*_+o*S+l*C,s[3]=r*m+o*x+l*M,s[6]=r*p+o*y+l*T,s[1]=c*_+d*S+u*C,s[4]=c*m+d*x+u*M,s[7]=c*p+d*y+u*T,s[2]=h*_+f*S+g*C,s[5]=h*m+f*x+g*M,s[8]=h*p+f*y+g*T,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],a=e[2],s=e[3],r=e[4],o=e[5],l=e[6],c=e[7],d=e[8];return t*r*d-t*o*c-i*s*d+i*o*l+a*s*c-a*r*l}invert(){const e=this.elements,t=e[0],i=e[1],a=e[2],s=e[3],r=e[4],o=e[5],l=e[6],c=e[7],d=e[8],u=d*r-o*c,h=o*l-d*s,f=c*s-r*l,g=t*u+i*h+a*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=u*_,e[1]=(a*c-d*i)*_,e[2]=(o*i-a*r)*_,e[3]=h*_,e[4]=(d*t-a*l)*_,e[5]=(a*s-o*t)*_,e[6]=f*_,e[7]=(i*l-c*t)*_,e[8]=(r*t-i*s)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,a,s,r,o){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*r+c*o)+r+e,-a*c,a*l,-a*(-c*r+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(ec.makeScale(e,t)),this}rotate(e){return this.premultiply(ec.makeRotation(-e)),this}translate(e,t){return this.premultiply(ec.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let a=0;a<9;a++)if(t[a]!==i[a])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const ec=new We;function Ym(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function al(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Ay(){const n=al("canvas");return n.style.display="block",n}const Xh={};function vr(n){n in Xh||(Xh[n]=!0,console.warn(n))}function Cy(n,e,t){return new Promise(function(i,a){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:a();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}const qh=new We().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Yh=new We().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Ry(){const n={enabled:!0,workingColorSpace:ps,spaces:{},convert:function(a,s,r){return this.enabled===!1||s===r||!s||!r||(this.spaces[s].transfer===dt&&(a.r=_i(a.r),a.g=_i(a.g),a.b=_i(a.b)),this.spaces[s].primaries!==this.spaces[r].primaries&&(a.applyMatrix3(this.spaces[s].toXYZ),a.applyMatrix3(this.spaces[r].fromXYZ)),this.spaces[r].transfer===dt&&(a.r=rs(a.r),a.g=rs(a.g),a.b=rs(a.b))),a},workingToColorSpace:function(a,s){return this.convert(a,this.workingColorSpace,s)},colorSpaceToWorking:function(a,s){return this.convert(a,s,this.workingColorSpace)},getPrimaries:function(a){return this.spaces[a].primaries},getTransfer:function(a){return a===Di?nl:this.spaces[a].transfer},getToneMappingMode:function(a){return this.spaces[a].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(a,s=this.workingColorSpace){return a.fromArray(this.spaces[s].luminanceCoefficients)},define:function(a){Object.assign(this.spaces,a)},_getMatrix:function(a,s,r){return a.copy(this.spaces[s].toXYZ).multiply(this.spaces[r].fromXYZ)},_getDrawingBufferColorSpace:function(a){return this.spaces[a].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(a=this.workingColorSpace){return this.spaces[a].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(a,s){return vr("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(a,s)},toWorkingColorSpace:function(a,s){return vr("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(a,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[ps]:{primaries:e,whitePoint:i,transfer:nl,toXYZ:qh,fromXYZ:Yh,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Yt},outputColorSpaceConfig:{drawingBufferColorSpace:Yt}},[Yt]:{primaries:e,whitePoint:i,transfer:dt,toXYZ:qh,fromXYZ:Yh,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Yt}}}),n}const tt=Ry();function _i(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function rs(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let La;class Py{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{La===void 0&&(La=al("canvas")),La.width=e.width,La.height=e.height;const a=La.getContext("2d");e instanceof ImageData?a.putImageData(e,0,0):a.drawImage(e,0,0,e.width,e.height),i=La}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=al("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const a=i.getImageData(0,0,e.width,e.height),s=a.data;for(let r=0;r<s.length;r++)s[r]=_i(s[r]/255)*255;return i.putImageData(a,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(_i(t[i]/255)*255):t[i]=_i(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Ly=0;class Ku{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Ly++}),this.uuid=ei(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},a=this.data;if(a!==null){let s;if(Array.isArray(a)){s=[];for(let r=0,o=a.length;r<o;r++)a[r].isDataTexture?s.push(tc(a[r].image)):s.push(tc(a[r]))}else s=tc(a);i.url=s}return t||(e.images[this.uuid]=i),i}}function tc(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Py.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Ny=0;const nc=new L;class Qt extends Ma{constructor(e=Qt.DEFAULT_IMAGE,t=Qt.DEFAULT_MAPPING,i=fa,a=fa,s=Jn,r=pa,o=Gn,l=ai,c=Qt.DEFAULT_ANISOTROPY,d=Di){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ny++}),this.uuid=ei(),this.name="",this.source=new Ku(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=a,this.magFilter=s,this.minFilter=r,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ce(0,0),this.repeat=new ce(1,1),this.center=new ce(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new We,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(nc).x}get height(){return this.source.getSize(nc).y}get depth(){return this.source.getSize(nc).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const a=this[t];if(a===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}a&&i&&a.isVector2&&i.isVector2||a&&i&&a.isVector3&&i.isVector3||a&&i&&a.isMatrix3&&i.isMatrix3?a.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Om)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case vd:e.x=e.x-Math.floor(e.x);break;case fa:e.x=e.x<0?0:1;break;case yd:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case vd:e.y=e.y-Math.floor(e.y);break;case fa:e.y=e.y<0?0:1;break;case yd:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Qt.DEFAULT_IMAGE=null;Qt.DEFAULT_MAPPING=Om;Qt.DEFAULT_ANISOTROPY=1;class At{constructor(e=0,t=0,i=0,a=1){At.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=a}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,a){return this.x=e,this.y=t,this.z=i,this.w=a,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,a=this.z,s=this.w,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*a+r[12]*s,this.y=r[1]*t+r[5]*i+r[9]*a+r[13]*s,this.z=r[2]*t+r[6]*i+r[10]*a+r[14]*s,this.w=r[3]*t+r[7]*i+r[11]*a+r[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,a,s;const l=e.elements,c=l[0],d=l[4],u=l[8],h=l[1],f=l[5],g=l[9],_=l[2],m=l[6],p=l[10];if(Math.abs(d-h)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(d+h)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const x=(c+1)/2,y=(f+1)/2,C=(p+1)/2,M=(d+h)/4,T=(u+_)/4,A=(g+m)/4;return x>y&&x>C?x<.01?(i=0,a=.707106781,s=.707106781):(i=Math.sqrt(x),a=M/i,s=T/i):y>C?y<.01?(i=.707106781,a=0,s=.707106781):(a=Math.sqrt(y),i=M/a,s=A/a):C<.01?(i=.707106781,a=.707106781,s=0):(s=Math.sqrt(C),i=T/s,a=A/s),this.set(i,a,s,t),this}let S=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(h-d)*(h-d));return Math.abs(S)<.001&&(S=1),this.x=(m-g)/S,this.y=(u-_)/S,this.z=(h-d)/S,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ye(this.x,e.x,t.x),this.y=Ye(this.y,e.y,t.y),this.z=Ye(this.z,e.z,t.z),this.w=Ye(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ye(this.x,e,t),this.y=Ye(this.y,e,t),this.z=Ye(this.z,e,t),this.w=Ye(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ye(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Iy extends Ma{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Jn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new At(0,0,e,t),this.scissorTest=!1,this.viewport=new At(0,0,e,t);const a={width:e,height:t,depth:i.depth},s=new Qt(a);this.textures=[];const r=i.count;for(let o=0;o<r;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){const t={minFilter:Jn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let a=0,s=this.textures.length;a<s;a++)this.textures[a].image.width=e,this.textures[a].image.height=t,this.textures[a].image.depth=i,this.textures[a].isArrayTexture=this.textures[a].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const a=Object.assign({},e.textures[t].image);this.textures[t].source=new Ku(a)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class xa extends Iy{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Zm extends Qt{constructor(e=null,t=1,i=1,a=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:a},this.magFilter=$n,this.minFilter=$n,this.wrapR=fa,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Dy extends Qt{constructor(e=null,t=1,i=1,a=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:a},this.magFilter=$n,this.minFilter=$n,this.wrapR=fa,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class kr{constructor(e=new L(1/0,1/0,1/0),t=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Nn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Nn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Nn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let r=0,o=s.count;r<o;r++)e.isMesh===!0?e.getVertexPosition(r,Nn):Nn.fromBufferAttribute(s,r),Nn.applyMatrix4(e.matrixWorld),this.expandByPoint(Nn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Vr.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Vr.copy(i.boundingBox)),Vr.applyMatrix4(e.matrixWorld),this.union(Vr)}const a=e.children;for(let s=0,r=a.length;s<r;s++)this.expandByObject(a[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Nn),Nn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Is),$r.subVectors(this.max,Is),Na.subVectors(e.a,Is),Ia.subVectors(e.b,Is),Da.subVectors(e.c,Is),Si.subVectors(Ia,Na),Ei.subVectors(Da,Ia),Ji.subVectors(Na,Da);let t=[0,-Si.z,Si.y,0,-Ei.z,Ei.y,0,-Ji.z,Ji.y,Si.z,0,-Si.x,Ei.z,0,-Ei.x,Ji.z,0,-Ji.x,-Si.y,Si.x,0,-Ei.y,Ei.x,0,-Ji.y,Ji.x,0];return!ic(t,Na,Ia,Da,$r)||(t=[1,0,0,0,1,0,0,0,1],!ic(t,Na,Ia,Da,$r))?!1:(Wr.crossVectors(Si,Ei),t=[Wr.x,Wr.y,Wr.z],ic(t,Na,Ia,Da,$r))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Nn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Nn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(li[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),li[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),li[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),li[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),li[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),li[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),li[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),li[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(li),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const li=[new L,new L,new L,new L,new L,new L,new L,new L],Nn=new L,Vr=new kr,Na=new L,Ia=new L,Da=new L,Si=new L,Ei=new L,Ji=new L,Is=new L,$r=new L,Wr=new L,Qi=new L;function ic(n,e,t,i,a){for(let s=0,r=n.length-3;s<=r;s+=3){Qi.fromArray(n,s);const o=a.x*Math.abs(Qi.x)+a.y*Math.abs(Qi.y)+a.z*Math.abs(Qi.z),l=e.dot(Qi),c=t.dot(Qi),d=i.dot(Qi);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>o)return!1}return!0}const Uy=new kr,Ds=new L,ac=new L;class Ll{constructor(e=new L,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Uy.setFromPoints(e).getCenter(i);let a=0;for(let s=0,r=e.length;s<r;s++)a=Math.max(a,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(a),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ds.subVectors(e,this.center);const t=Ds.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),a=(i-this.radius)*.5;this.center.addScaledVector(Ds,a/i),this.radius+=a}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ac.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ds.copy(e.center).add(ac)),this.expandByPoint(Ds.copy(e.center).sub(ac))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const ci=new L,sc=new L,Xr=new L,Mi=new L,rc=new L,qr=new L,oc=new L;class ju{constructor(e=new L,t=new L(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ci)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=ci.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ci.copy(this.origin).addScaledVector(this.direction,t),ci.distanceToSquared(e))}distanceSqToSegment(e,t,i,a){sc.copy(e).add(t).multiplyScalar(.5),Xr.copy(t).sub(e).normalize(),Mi.copy(this.origin).sub(sc);const s=e.distanceTo(t)*.5,r=-this.direction.dot(Xr),o=Mi.dot(this.direction),l=-Mi.dot(Xr),c=Mi.lengthSq(),d=Math.abs(1-r*r);let u,h,f,g;if(d>0)if(u=r*l-o,h=r*o-l,g=s*d,u>=0)if(h>=-g)if(h<=g){const _=1/d;u*=_,h*=_,f=u*(u+r*h+2*o)+h*(r*u+h+2*l)+c}else h=s,u=Math.max(0,-(r*h+o)),f=-u*u+h*(h+2*l)+c;else h=-s,u=Math.max(0,-(r*h+o)),f=-u*u+h*(h+2*l)+c;else h<=-g?(u=Math.max(0,-(-r*s+o)),h=u>0?-s:Math.min(Math.max(-s,-l),s),f=-u*u+h*(h+2*l)+c):h<=g?(u=0,h=Math.min(Math.max(-s,-l),s),f=h*(h+2*l)+c):(u=Math.max(0,-(r*s+o)),h=u>0?s:Math.min(Math.max(-s,-l),s),f=-u*u+h*(h+2*l)+c);else h=r>0?-s:s,u=Math.max(0,-(r*h+o)),f=-u*u+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,u),a&&a.copy(sc).addScaledVector(Xr,h),f}intersectSphere(e,t){ci.subVectors(e.center,this.origin);const i=ci.dot(this.direction),a=ci.dot(ci)-i*i,s=e.radius*e.radius;if(a>s)return null;const r=Math.sqrt(s-a),o=i-r,l=i+r;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,a,s,r,o,l;const c=1/this.direction.x,d=1/this.direction.y,u=1/this.direction.z,h=this.origin;return c>=0?(i=(e.min.x-h.x)*c,a=(e.max.x-h.x)*c):(i=(e.max.x-h.x)*c,a=(e.min.x-h.x)*c),d>=0?(s=(e.min.y-h.y)*d,r=(e.max.y-h.y)*d):(s=(e.max.y-h.y)*d,r=(e.min.y-h.y)*d),i>r||s>a||((s>i||isNaN(i))&&(i=s),(r<a||isNaN(a))&&(a=r),u>=0?(o=(e.min.z-h.z)*u,l=(e.max.z-h.z)*u):(o=(e.max.z-h.z)*u,l=(e.min.z-h.z)*u),i>l||o>a)||((o>i||i!==i)&&(i=o),(l<a||a!==a)&&(a=l),a<0)?null:this.at(i>=0?i:a,t)}intersectsBox(e){return this.intersectBox(e,ci)!==null}intersectTriangle(e,t,i,a,s){rc.subVectors(t,e),qr.subVectors(i,e),oc.crossVectors(rc,qr);let r=this.direction.dot(oc),o;if(r>0){if(a)return null;o=1}else if(r<0)o=-1,r=-r;else return null;Mi.subVectors(this.origin,e);const l=o*this.direction.dot(qr.crossVectors(Mi,qr));if(l<0)return null;const c=o*this.direction.dot(rc.cross(Mi));if(c<0||l+c>r)return null;const d=-o*Mi.dot(oc);return d<0?null:this.at(d/r,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class yt{constructor(e,t,i,a,s,r,o,l,c,d,u,h,f,g,_,m){yt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,a,s,r,o,l,c,d,u,h,f,g,_,m)}set(e,t,i,a,s,r,o,l,c,d,u,h,f,g,_,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=a,p[1]=s,p[5]=r,p[9]=o,p[13]=l,p[2]=c,p[6]=d,p[10]=u,p[14]=h,p[3]=f,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new yt().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,a=1/Ua.setFromMatrixColumn(e,0).length(),s=1/Ua.setFromMatrixColumn(e,1).length(),r=1/Ua.setFromMatrixColumn(e,2).length();return t[0]=i[0]*a,t[1]=i[1]*a,t[2]=i[2]*a,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*r,t[9]=i[9]*r,t[10]=i[10]*r,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,a=e.y,s=e.z,r=Math.cos(i),o=Math.sin(i),l=Math.cos(a),c=Math.sin(a),d=Math.cos(s),u=Math.sin(s);if(e.order==="XYZ"){const h=r*d,f=r*u,g=o*d,_=o*u;t[0]=l*d,t[4]=-l*u,t[8]=c,t[1]=f+g*c,t[5]=h-_*c,t[9]=-o*l,t[2]=_-h*c,t[6]=g+f*c,t[10]=r*l}else if(e.order==="YXZ"){const h=l*d,f=l*u,g=c*d,_=c*u;t[0]=h+_*o,t[4]=g*o-f,t[8]=r*c,t[1]=r*u,t[5]=r*d,t[9]=-o,t[2]=f*o-g,t[6]=_+h*o,t[10]=r*l}else if(e.order==="ZXY"){const h=l*d,f=l*u,g=c*d,_=c*u;t[0]=h-_*o,t[4]=-r*u,t[8]=g+f*o,t[1]=f+g*o,t[5]=r*d,t[9]=_-h*o,t[2]=-r*c,t[6]=o,t[10]=r*l}else if(e.order==="ZYX"){const h=r*d,f=r*u,g=o*d,_=o*u;t[0]=l*d,t[4]=g*c-f,t[8]=h*c+_,t[1]=l*u,t[5]=_*c+h,t[9]=f*c-g,t[2]=-c,t[6]=o*l,t[10]=r*l}else if(e.order==="YZX"){const h=r*l,f=r*c,g=o*l,_=o*c;t[0]=l*d,t[4]=_-h*u,t[8]=g*u+f,t[1]=u,t[5]=r*d,t[9]=-o*d,t[2]=-c*d,t[6]=f*u+g,t[10]=h-_*u}else if(e.order==="XZY"){const h=r*l,f=r*c,g=o*l,_=o*c;t[0]=l*d,t[4]=-u,t[8]=c*d,t[1]=h*u+_,t[5]=r*d,t[9]=f*u-g,t[2]=g*u-f,t[6]=o*d,t[10]=_*u+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Fy,e,ky)}lookAt(e,t,i){const a=this.elements;return mn.subVectors(e,t),mn.lengthSq()===0&&(mn.z=1),mn.normalize(),Ti.crossVectors(i,mn),Ti.lengthSq()===0&&(Math.abs(i.z)===1?mn.x+=1e-4:mn.z+=1e-4,mn.normalize(),Ti.crossVectors(i,mn)),Ti.normalize(),Yr.crossVectors(mn,Ti),a[0]=Ti.x,a[4]=Yr.x,a[8]=mn.x,a[1]=Ti.y,a[5]=Yr.y,a[9]=mn.y,a[2]=Ti.z,a[6]=Yr.z,a[10]=mn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,a=t.elements,s=this.elements,r=i[0],o=i[4],l=i[8],c=i[12],d=i[1],u=i[5],h=i[9],f=i[13],g=i[2],_=i[6],m=i[10],p=i[14],S=i[3],x=i[7],y=i[11],C=i[15],M=a[0],T=a[4],A=a[8],v=a[12],b=a[1],R=a[5],I=a[9],O=a[13],H=a[2],V=a[6],B=a[10],X=a[14],G=a[3],te=a[7],fe=a[11],q=a[15];return s[0]=r*M+o*b+l*H+c*G,s[4]=r*T+o*R+l*V+c*te,s[8]=r*A+o*I+l*B+c*fe,s[12]=r*v+o*O+l*X+c*q,s[1]=d*M+u*b+h*H+f*G,s[5]=d*T+u*R+h*V+f*te,s[9]=d*A+u*I+h*B+f*fe,s[13]=d*v+u*O+h*X+f*q,s[2]=g*M+_*b+m*H+p*G,s[6]=g*T+_*R+m*V+p*te,s[10]=g*A+_*I+m*B+p*fe,s[14]=g*v+_*O+m*X+p*q,s[3]=S*M+x*b+y*H+C*G,s[7]=S*T+x*R+y*V+C*te,s[11]=S*A+x*I+y*B+C*fe,s[15]=S*v+x*O+y*X+C*q,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],a=e[8],s=e[12],r=e[1],o=e[5],l=e[9],c=e[13],d=e[2],u=e[6],h=e[10],f=e[14],g=e[3],_=e[7],m=e[11],p=e[15];return g*(+s*l*u-a*c*u-s*o*h+i*c*h+a*o*f-i*l*f)+_*(+t*l*f-t*c*h+s*r*h-a*r*f+a*c*d-s*l*d)+m*(+t*c*u-t*o*f-s*r*u+i*r*f+s*o*d-i*c*d)+p*(-a*o*d-t*l*u+t*o*h+a*r*u-i*r*h+i*l*d)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const a=this.elements;return e.isVector3?(a[12]=e.x,a[13]=e.y,a[14]=e.z):(a[12]=e,a[13]=t,a[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],a=e[2],s=e[3],r=e[4],o=e[5],l=e[6],c=e[7],d=e[8],u=e[9],h=e[10],f=e[11],g=e[12],_=e[13],m=e[14],p=e[15],S=u*m*c-_*h*c+_*l*f-o*m*f-u*l*p+o*h*p,x=g*h*c-d*m*c-g*l*f+r*m*f+d*l*p-r*h*p,y=d*_*c-g*u*c+g*o*f-r*_*f-d*o*p+r*u*p,C=g*u*l-d*_*l-g*o*h+r*_*h+d*o*m-r*u*m,M=t*S+i*x+a*y+s*C;if(M===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const T=1/M;return e[0]=S*T,e[1]=(_*h*s-u*m*s-_*a*f+i*m*f+u*a*p-i*h*p)*T,e[2]=(o*m*s-_*l*s+_*a*c-i*m*c-o*a*p+i*l*p)*T,e[3]=(u*l*s-o*h*s-u*a*c+i*h*c+o*a*f-i*l*f)*T,e[4]=x*T,e[5]=(d*m*s-g*h*s+g*a*f-t*m*f-d*a*p+t*h*p)*T,e[6]=(g*l*s-r*m*s-g*a*c+t*m*c+r*a*p-t*l*p)*T,e[7]=(r*h*s-d*l*s+d*a*c-t*h*c-r*a*f+t*l*f)*T,e[8]=y*T,e[9]=(g*u*s-d*_*s-g*i*f+t*_*f+d*i*p-t*u*p)*T,e[10]=(r*_*s-g*o*s+g*i*c-t*_*c-r*i*p+t*o*p)*T,e[11]=(d*o*s-r*u*s-d*i*c+t*u*c+r*i*f-t*o*f)*T,e[12]=C*T,e[13]=(d*_*a-g*u*a+g*i*h-t*_*h-d*i*m+t*u*m)*T,e[14]=(g*o*a-r*_*a-g*i*l+t*_*l+r*i*m-t*o*m)*T,e[15]=(r*u*a-d*o*a+d*i*l-t*u*l-r*i*h+t*o*h)*T,this}scale(e){const t=this.elements,i=e.x,a=e.y,s=e.z;return t[0]*=i,t[4]*=a,t[8]*=s,t[1]*=i,t[5]*=a,t[9]*=s,t[2]*=i,t[6]*=a,t[10]*=s,t[3]*=i,t[7]*=a,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],a=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,a))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),a=Math.sin(t),s=1-i,r=e.x,o=e.y,l=e.z,c=s*r,d=s*o;return this.set(c*r+i,c*o-a*l,c*l+a*o,0,c*o+a*l,d*o+i,d*l-a*r,0,c*l-a*o,d*l+a*r,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,a,s,r){return this.set(1,i,s,0,e,1,r,0,t,a,1,0,0,0,0,1),this}compose(e,t,i){const a=this.elements,s=t._x,r=t._y,o=t._z,l=t._w,c=s+s,d=r+r,u=o+o,h=s*c,f=s*d,g=s*u,_=r*d,m=r*u,p=o*u,S=l*c,x=l*d,y=l*u,C=i.x,M=i.y,T=i.z;return a[0]=(1-(_+p))*C,a[1]=(f+y)*C,a[2]=(g-x)*C,a[3]=0,a[4]=(f-y)*M,a[5]=(1-(h+p))*M,a[6]=(m+S)*M,a[7]=0,a[8]=(g+x)*T,a[9]=(m-S)*T,a[10]=(1-(h+_))*T,a[11]=0,a[12]=e.x,a[13]=e.y,a[14]=e.z,a[15]=1,this}decompose(e,t,i){const a=this.elements;let s=Ua.set(a[0],a[1],a[2]).length();const r=Ua.set(a[4],a[5],a[6]).length(),o=Ua.set(a[8],a[9],a[10]).length();this.determinant()<0&&(s=-s),e.x=a[12],e.y=a[13],e.z=a[14],In.copy(this);const c=1/s,d=1/r,u=1/o;return In.elements[0]*=c,In.elements[1]*=c,In.elements[2]*=c,In.elements[4]*=d,In.elements[5]*=d,In.elements[6]*=d,In.elements[8]*=u,In.elements[9]*=u,In.elements[10]*=u,t.setFromRotationMatrix(In),i.x=s,i.y=r,i.z=o,this}makePerspective(e,t,i,a,s,r,o=Qn,l=!1){const c=this.elements,d=2*s/(t-e),u=2*s/(i-a),h=(t+e)/(t-e),f=(i+a)/(i-a);let g,_;if(l)g=s/(r-s),_=r*s/(r-s);else if(o===Qn)g=-(r+s)/(r-s),_=-2*r*s/(r-s);else if(o===il)g=-r/(r-s),_=-r*s/(r-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,a,s,r,o=Qn,l=!1){const c=this.elements,d=2/(t-e),u=2/(i-a),h=-(t+e)/(t-e),f=-(i+a)/(i-a);let g,_;if(l)g=1/(r-s),_=r/(r-s);else if(o===Qn)g=-2/(r-s),_=-(r+s)/(r-s);else if(o===il)g=-1/(r-s),_=-s/(r-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let a=0;a<16;a++)if(t[a]!==i[a])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Ua=new L,In=new yt,Fy=new L(0,0,0),ky=new L(1,1,1),Ti=new L,Yr=new L,mn=new L,Zh=new yt,Kh=new Vi;class Xn{constructor(e=0,t=0,i=0,a=Xn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=a}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,a=this._order){return this._x=e,this._y=t,this._z=i,this._order=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const a=e.elements,s=a[0],r=a[4],o=a[8],l=a[1],c=a[5],d=a[9],u=a[2],h=a[6],f=a[10];switch(t){case"XYZ":this._y=Math.asin(Ye(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,f),this._z=Math.atan2(-r,s)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ye(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ye(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-r,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Ye(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(h,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-r,c));break;case"YZX":this._z=Math.asin(Ye(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Ye(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-d,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Zh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Zh,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Kh.setFromEuler(this),this.setFromQuaternion(Kh,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Xn.DEFAULT_ORDER="XYZ";class Km{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Oy=0;const jh=new L,Fa=new Vi,di=new yt,Zr=new L,Us=new L,By=new L,zy=new Vi,Jh=new L(1,0,0),Qh=new L(0,1,0),ef=new L(0,0,1),tf={type:"added"},Hy={type:"removed"},ka={type:"childadded",child:null},lc={type:"childremoved",child:null};class It extends Ma{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Oy++}),this.uuid=ei(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=It.DEFAULT_UP.clone();const e=new L,t=new Xn,i=new Vi,a=new L(1,1,1);function s(){i.setFromEuler(t,!1)}function r(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:a},modelViewMatrix:{value:new yt},normalMatrix:{value:new We}}),this.matrix=new yt,this.matrixWorld=new yt,this.matrixAutoUpdate=It.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=It.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Km,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Fa.setFromAxisAngle(e,t),this.quaternion.multiply(Fa),this}rotateOnWorldAxis(e,t){return Fa.setFromAxisAngle(e,t),this.quaternion.premultiply(Fa),this}rotateX(e){return this.rotateOnAxis(Jh,e)}rotateY(e){return this.rotateOnAxis(Qh,e)}rotateZ(e){return this.rotateOnAxis(ef,e)}translateOnAxis(e,t){return jh.copy(e).applyQuaternion(this.quaternion),this.position.add(jh.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Jh,e)}translateY(e){return this.translateOnAxis(Qh,e)}translateZ(e){return this.translateOnAxis(ef,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(di.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Zr.copy(e):Zr.set(e,t,i);const a=this.parent;this.updateWorldMatrix(!0,!1),Us.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?di.lookAt(Us,Zr,this.up):di.lookAt(Zr,Us,this.up),this.quaternion.setFromRotationMatrix(di),a&&(di.extractRotation(a.matrixWorld),Fa.setFromRotationMatrix(di),this.quaternion.premultiply(Fa.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(tf),ka.child=e,this.dispatchEvent(ka),ka.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Hy),lc.child=e,this.dispatchEvent(lc),lc.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),di.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),di.multiply(e.parent.matrixWorld)),e.applyMatrix4(di),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(tf),ka.child=e,this.dispatchEvent(ka),ka.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,a=this.children.length;i<a;i++){const r=this.children[i].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const a=this.children;for(let s=0,r=a.length;s<r;s++)a[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Us,e,By),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Us,zy,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,a=t.length;i<a;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,a=t.length;i<a;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,a=t.length;i<a;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const a=this.children;for(let s=0,r=a.length;s<r;s++)a[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const a={};a.uuid=this.uuid,a.type=this.type,this.name!==""&&(a.name=this.name),this.castShadow===!0&&(a.castShadow=!0),this.receiveShadow===!0&&(a.receiveShadow=!0),this.visible===!1&&(a.visible=!1),this.frustumCulled===!1&&(a.frustumCulled=!1),this.renderOrder!==0&&(a.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(a.userData=this.userData),a.layers=this.layers.mask,a.matrix=this.matrix.toArray(),a.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(a.matrixAutoUpdate=!1),this.isInstancedMesh&&(a.type="InstancedMesh",a.count=this.count,a.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(a.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(a.type="BatchedMesh",a.perObjectFrustumCulled=this.perObjectFrustumCulled,a.sortObjects=this.sortObjects,a.drawRanges=this._drawRanges,a.reservedRanges=this._reservedRanges,a.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),a.instanceInfo=this._instanceInfo.map(o=>({...o})),a.availableInstanceIds=this._availableInstanceIds.slice(),a.availableGeometryIds=this._availableGeometryIds.slice(),a.nextIndexStart=this._nextIndexStart,a.nextVertexStart=this._nextVertexStart,a.geometryCount=this._geometryCount,a.maxInstanceCount=this._maxInstanceCount,a.maxVertexCount=this._maxVertexCount,a.maxIndexCount=this._maxIndexCount,a.geometryInitialized=this._geometryInitialized,a.matricesTexture=this._matricesTexture.toJSON(e),a.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(a.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(a.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(a.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?a.background=this.background.toJSON():this.background.isTexture&&(a.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(a.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){a.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){const u=l[c];s(e.shapes,u)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(a.bindMode=this.bindMode,a.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),a.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));a.material=o}else a.material=s(e.materials,this.material);if(this.children.length>0){a.children=[];for(let o=0;o<this.children.length;o++)a.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){a.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];a.animations.push(s(e.animations,l))}}if(t){const o=r(e.geometries),l=r(e.materials),c=r(e.textures),d=r(e.images),u=r(e.shapes),h=r(e.skeletons),f=r(e.animations),g=r(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),d.length>0&&(i.images=d),u.length>0&&(i.shapes=u),h.length>0&&(i.skeletons=h),f.length>0&&(i.animations=f),g.length>0&&(i.nodes=g)}return i.object=a,i;function r(o){const l=[];for(const c in o){const d=o[c];delete d.metadata,l.push(d)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const a=e.children[i];this.add(a.clone())}return this}}It.DEFAULT_UP=new L(0,1,0);It.DEFAULT_MATRIX_AUTO_UPDATE=!0;It.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Dn=new L,ui=new L,cc=new L,hi=new L,Oa=new L,Ba=new L,nf=new L,dc=new L,uc=new L,hc=new L,fc=new At,pc=new At,mc=new At;class Rn{constructor(e=new L,t=new L,i=new L){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,a){a.subVectors(i,t),Dn.subVectors(e,t),a.cross(Dn);const s=a.lengthSq();return s>0?a.multiplyScalar(1/Math.sqrt(s)):a.set(0,0,0)}static getBarycoord(e,t,i,a,s){Dn.subVectors(a,t),ui.subVectors(i,t),cc.subVectors(e,t);const r=Dn.dot(Dn),o=Dn.dot(ui),l=Dn.dot(cc),c=ui.dot(ui),d=ui.dot(cc),u=r*c-o*o;if(u===0)return s.set(0,0,0),null;const h=1/u,f=(c*l-o*d)*h,g=(r*d-o*l)*h;return s.set(1-f-g,g,f)}static containsPoint(e,t,i,a){return this.getBarycoord(e,t,i,a,hi)===null?!1:hi.x>=0&&hi.y>=0&&hi.x+hi.y<=1}static getInterpolation(e,t,i,a,s,r,o,l){return this.getBarycoord(e,t,i,a,hi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,hi.x),l.addScaledVector(r,hi.y),l.addScaledVector(o,hi.z),l)}static getInterpolatedAttribute(e,t,i,a,s,r){return fc.setScalar(0),pc.setScalar(0),mc.setScalar(0),fc.fromBufferAttribute(e,t),pc.fromBufferAttribute(e,i),mc.fromBufferAttribute(e,a),r.setScalar(0),r.addScaledVector(fc,s.x),r.addScaledVector(pc,s.y),r.addScaledVector(mc,s.z),r}static isFrontFacing(e,t,i,a){return Dn.subVectors(i,t),ui.subVectors(e,t),Dn.cross(ui).dot(a)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,a){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[a]),this}setFromAttributeAndIndices(e,t,i,a){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,a),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Dn.subVectors(this.c,this.b),ui.subVectors(this.a,this.b),Dn.cross(ui).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Rn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Rn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,a,s){return Rn.getInterpolation(e,this.a,this.b,this.c,t,i,a,s)}containsPoint(e){return Rn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Rn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,a=this.b,s=this.c;let r,o;Oa.subVectors(a,i),Ba.subVectors(s,i),dc.subVectors(e,i);const l=Oa.dot(dc),c=Ba.dot(dc);if(l<=0&&c<=0)return t.copy(i);uc.subVectors(e,a);const d=Oa.dot(uc),u=Ba.dot(uc);if(d>=0&&u<=d)return t.copy(a);const h=l*u-d*c;if(h<=0&&l>=0&&d<=0)return r=l/(l-d),t.copy(i).addScaledVector(Oa,r);hc.subVectors(e,s);const f=Oa.dot(hc),g=Ba.dot(hc);if(g>=0&&f<=g)return t.copy(s);const _=f*c-l*g;if(_<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(i).addScaledVector(Ba,o);const m=d*g-f*u;if(m<=0&&u-d>=0&&f-g>=0)return nf.subVectors(s,a),o=(u-d)/(u-d+(f-g)),t.copy(a).addScaledVector(nf,o);const p=1/(m+_+h);return r=_*p,o=h*p,t.copy(i).addScaledVector(Oa,r).addScaledVector(Ba,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const jm={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ai={h:0,s:0,l:0},Kr={h:0,s:0,l:0};function gc(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Ke{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const a=e;a&&a.isColor?this.copy(a):typeof a=="number"?this.setHex(a):typeof a=="string"&&this.setStyle(a)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Yt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,tt.colorSpaceToWorking(this,t),this}setRGB(e,t,i,a=tt.workingColorSpace){return this.r=e,this.g=t,this.b=i,tt.colorSpaceToWorking(this,a),this}setHSL(e,t,i,a=tt.workingColorSpace){if(e=Zu(e,1),t=Ye(t,0,1),i=Ye(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,r=2*i-s;this.r=gc(r,s,e+1/3),this.g=gc(r,s,e),this.b=gc(r,s,e-1/3)}return tt.colorSpaceToWorking(this,a),this}setStyle(e,t=Yt){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let a;if(a=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const r=a[1],o=a[2];switch(r){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(a=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=a[1],r=s.length;if(r===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(r===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Yt){const i=jm[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=_i(e.r),this.g=_i(e.g),this.b=_i(e.b),this}copyLinearToSRGB(e){return this.r=rs(e.r),this.g=rs(e.g),this.b=rs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Yt){return tt.workingToColorSpace(Xt.copy(this),e),Math.round(Ye(Xt.r*255,0,255))*65536+Math.round(Ye(Xt.g*255,0,255))*256+Math.round(Ye(Xt.b*255,0,255))}getHexString(e=Yt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=tt.workingColorSpace){tt.workingToColorSpace(Xt.copy(this),t);const i=Xt.r,a=Xt.g,s=Xt.b,r=Math.max(i,a,s),o=Math.min(i,a,s);let l,c;const d=(o+r)/2;if(o===r)l=0,c=0;else{const u=r-o;switch(c=d<=.5?u/(r+o):u/(2-r-o),r){case i:l=(a-s)/u+(a<s?6:0);break;case a:l=(s-i)/u+2;break;case s:l=(i-a)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=d,e}getRGB(e,t=tt.workingColorSpace){return tt.workingToColorSpace(Xt.copy(this),t),e.r=Xt.r,e.g=Xt.g,e.b=Xt.b,e}getStyle(e=Yt){tt.workingToColorSpace(Xt.copy(this),e);const t=Xt.r,i=Xt.g,a=Xt.b;return e!==Yt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${a.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(a*255)})`}offsetHSL(e,t,i){return this.getHSL(Ai),this.setHSL(Ai.h+e,Ai.s+t,Ai.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Ai),e.getHSL(Kr);const i=Qs(Ai.h,Kr.h,t),a=Qs(Ai.s,Kr.s,t),s=Qs(Ai.l,Kr.l,t);return this.setHSL(i,a,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,a=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*a,this.g=s[1]*t+s[4]*i+s[7]*a,this.b=s[2]*t+s[5]*i+s[8]*a,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Xt=new Ke;Ke.NAMES=jm;let Gy=0;class wi extends Ma{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Gy++}),this.uuid=ei(),this.name="",this.type="Material",this.blending=ss,this.side=Gi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=od,this.blendDst=ld,this.blendEquation=da,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ke(0,0,0),this.blendAlpha=0,this.depthFunc=us,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Gh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Pa,this.stencilZFail=Pa,this.stencilZPass=Pa,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const a=this[t];if(a===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}a&&a.isColor?a.set(i):a&&a.isVector3&&i&&i.isVector3?a.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==ss&&(i.blending=this.blending),this.side!==Gi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==od&&(i.blendSrc=this.blendSrc),this.blendDst!==ld&&(i.blendDst=this.blendDst),this.blendEquation!==da&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==us&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Gh&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Pa&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Pa&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Pa&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function a(s){const r=[];for(const o in s){const l=s[o];delete l.metadata,r.push(l)}return r}if(t){const s=a(e.textures),r=a(e.images);s.length>0&&(i.textures=s),r.length>0&&(i.images=r)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const a=t.length;i=new Array(a);for(let s=0;s!==a;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class rt extends wi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ke(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Xn,this.combine=Rl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Pt=new L,jr=new ce;let Vy=0;class Wn{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Vy++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Yd,this.updateRanges=[],this.gpuType=mi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let a=0,s=this.itemSize;a<s;a++)this.array[e+a]=t.array[i+a];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)jr.fromBufferAttribute(this,t),jr.applyMatrix3(e),this.setXY(t,jr.x,jr.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Pt.fromBufferAttribute(this,t),Pt.applyMatrix3(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Pt.fromBufferAttribute(this,t),Pt.applyMatrix4(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Pt.fromBufferAttribute(this,t),Pt.applyNormalMatrix(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Pt.fromBufferAttribute(this,t),Pt.transformDirection(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=zn(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=st(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=zn(t,this.array)),t}setX(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=zn(t,this.array)),t}setY(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=zn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=zn(t,this.array)),t}setW(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=st(t,this.array),i=st(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,a){return e*=this.itemSize,this.normalized&&(t=st(t,this.array),i=st(i,this.array),a=st(a,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=a,this}setXYZW(e,t,i,a,s){return e*=this.itemSize,this.normalized&&(t=st(t,this.array),i=st(i,this.array),a=st(a,this.array),s=st(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=a,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Yd&&(e.usage=this.usage),e}}class Jm extends Wn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Qm extends Wn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class it extends Wn{constructor(e,t,i){super(new Float32Array(e),t,i)}}let $y=0;const Mn=new yt,_c=new It,za=new L,gn=new kr,Fs=new kr,kt=new L;class Rt extends Ma{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:$y++}),this.uuid=ei(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Ym(e)?Qm:Jm)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new We().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const a=this.attributes.tangent;return a!==void 0&&(a.transformDirection(e),a.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Mn.makeRotationFromQuaternion(e),this.applyMatrix4(Mn),this}rotateX(e){return Mn.makeRotationX(e),this.applyMatrix4(Mn),this}rotateY(e){return Mn.makeRotationY(e),this.applyMatrix4(Mn),this}rotateZ(e){return Mn.makeRotationZ(e),this.applyMatrix4(Mn),this}translate(e,t,i){return Mn.makeTranslation(e,t,i),this.applyMatrix4(Mn),this}scale(e,t,i){return Mn.makeScale(e,t,i),this.applyMatrix4(Mn),this}lookAt(e){return _c.lookAt(e),_c.updateMatrix(),this.applyMatrix4(_c.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(za).negate(),this.translate(za.x,za.y,za.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let a=0,s=e.length;a<s;a++){const r=e[a];i.push(r.x,r.y,r.z||0)}this.setAttribute("position",new it(i,3))}else{const i=Math.min(e.length,t.count);for(let a=0;a<i;a++){const s=e[a];t.setXYZ(a,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new kr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,a=t.length;i<a;i++){const s=t[i];gn.setFromBufferAttribute(s),this.morphTargetsRelative?(kt.addVectors(this.boundingBox.min,gn.min),this.boundingBox.expandByPoint(kt),kt.addVectors(this.boundingBox.max,gn.max),this.boundingBox.expandByPoint(kt)):(this.boundingBox.expandByPoint(gn.min),this.boundingBox.expandByPoint(gn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ll);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(e){const i=this.boundingSphere.center;if(gn.setFromBufferAttribute(e),t)for(let s=0,r=t.length;s<r;s++){const o=t[s];Fs.setFromBufferAttribute(o),this.morphTargetsRelative?(kt.addVectors(gn.min,Fs.min),gn.expandByPoint(kt),kt.addVectors(gn.max,Fs.max),gn.expandByPoint(kt)):(gn.expandByPoint(Fs.min),gn.expandByPoint(Fs.max))}gn.getCenter(i);let a=0;for(let s=0,r=e.count;s<r;s++)kt.fromBufferAttribute(e,s),a=Math.max(a,i.distanceToSquared(kt));if(t)for(let s=0,r=t.length;s<r;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,d=o.count;c<d;c++)kt.fromBufferAttribute(o,c),l&&(za.fromBufferAttribute(e,c),kt.add(za)),a=Math.max(a,i.distanceToSquared(kt))}this.boundingSphere.radius=Math.sqrt(a),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,a=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Wn(new Float32Array(4*i.count),4));const r=this.getAttribute("tangent"),o=[],l=[];for(let A=0;A<i.count;A++)o[A]=new L,l[A]=new L;const c=new L,d=new L,u=new L,h=new ce,f=new ce,g=new ce,_=new L,m=new L;function p(A,v,b){c.fromBufferAttribute(i,A),d.fromBufferAttribute(i,v),u.fromBufferAttribute(i,b),h.fromBufferAttribute(s,A),f.fromBufferAttribute(s,v),g.fromBufferAttribute(s,b),d.sub(c),u.sub(c),f.sub(h),g.sub(h);const R=1/(f.x*g.y-g.x*f.y);isFinite(R)&&(_.copy(d).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(R),m.copy(u).multiplyScalar(f.x).addScaledVector(d,-g.x).multiplyScalar(R),o[A].add(_),o[v].add(_),o[b].add(_),l[A].add(m),l[v].add(m),l[b].add(m))}let S=this.groups;S.length===0&&(S=[{start:0,count:e.count}]);for(let A=0,v=S.length;A<v;++A){const b=S[A],R=b.start,I=b.count;for(let O=R,H=R+I;O<H;O+=3)p(e.getX(O+0),e.getX(O+1),e.getX(O+2))}const x=new L,y=new L,C=new L,M=new L;function T(A){C.fromBufferAttribute(a,A),M.copy(C);const v=o[A];x.copy(v),x.sub(C.multiplyScalar(C.dot(v))).normalize(),y.crossVectors(M,v);const R=y.dot(l[A])<0?-1:1;r.setXYZW(A,x.x,x.y,x.z,R)}for(let A=0,v=S.length;A<v;++A){const b=S[A],R=b.start,I=b.count;for(let O=R,H=R+I;O<H;O+=3)T(e.getX(O+0)),T(e.getX(O+1)),T(e.getX(O+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Wn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let h=0,f=i.count;h<f;h++)i.setXYZ(h,0,0,0);const a=new L,s=new L,r=new L,o=new L,l=new L,c=new L,d=new L,u=new L;if(e)for(let h=0,f=e.count;h<f;h+=3){const g=e.getX(h+0),_=e.getX(h+1),m=e.getX(h+2);a.fromBufferAttribute(t,g),s.fromBufferAttribute(t,_),r.fromBufferAttribute(t,m),d.subVectors(r,s),u.subVectors(a,s),d.cross(u),o.fromBufferAttribute(i,g),l.fromBufferAttribute(i,_),c.fromBufferAttribute(i,m),o.add(d),l.add(d),c.add(d),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let h=0,f=t.count;h<f;h+=3)a.fromBufferAttribute(t,h+0),s.fromBufferAttribute(t,h+1),r.fromBufferAttribute(t,h+2),d.subVectors(r,s),u.subVectors(a,s),d.cross(u),i.setXYZ(h+0,d.x,d.y,d.z),i.setXYZ(h+1,d.x,d.y,d.z),i.setXYZ(h+2,d.x,d.y,d.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)kt.fromBufferAttribute(e,t),kt.normalize(),e.setXYZ(t,kt.x,kt.y,kt.z)}toNonIndexed(){function e(o,l){const c=o.array,d=o.itemSize,u=o.normalized,h=new c.constructor(l.length*d);let f=0,g=0;for(let _=0,m=l.length;_<m;_++){o.isInterleavedBufferAttribute?f=l[_]*o.data.stride+o.offset:f=l[_]*d;for(let p=0;p<d;p++)h[g++]=c[f++]}return new Wn(h,d,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Rt,i=this.index.array,a=this.attributes;for(const o in a){const l=a[o],c=e(l,i);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let d=0,u=c.length;d<u;d++){const h=c[d],f=e(h,i);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const r=this.groups;for(let o=0,l=r.length;o<l;o++){const c=r[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const a={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],d=[];for(let u=0,h=c.length;u<h;u++){const f=c[u];d.push(f.toJSON(e.data))}d.length>0&&(a[l]=d,s=!0)}s&&(e.data.morphAttributes=a,e.data.morphTargetsRelative=this.morphTargetsRelative);const r=this.groups;r.length>0&&(e.data.groups=JSON.parse(JSON.stringify(r)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const a=e.attributes;for(const c in a){const d=a[c];this.setAttribute(c,d.clone(t))}const s=e.morphAttributes;for(const c in s){const d=[],u=s[c];for(let h=0,f=u.length;h<f;h++)d.push(u[h].clone(t));this.morphAttributes[c]=d}this.morphTargetsRelative=e.morphTargetsRelative;const r=e.groups;for(let c=0,d=r.length;c<d;c++){const u=r[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const af=new yt,ea=new ju,Jr=new Ll,sf=new L,Qr=new L,eo=new L,to=new L,vc=new L,no=new L,rf=new L,io=new L;class He extends It{constructor(e=new Rt,t=new rt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const a=t[i[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=a.length;s<r;s++){const o=a[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const i=this.geometry,a=i.attributes.position,s=i.morphAttributes.position,r=i.morphTargetsRelative;t.fromBufferAttribute(a,e);const o=this.morphTargetInfluences;if(s&&o){no.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const d=o[l],u=s[l];d!==0&&(vc.fromBufferAttribute(u,e),r?no.addScaledVector(vc,d):no.addScaledVector(vc.sub(t),d))}t.add(no)}return t}raycast(e,t){const i=this.geometry,a=this.material,s=this.matrixWorld;a!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Jr.copy(i.boundingSphere),Jr.applyMatrix4(s),ea.copy(e.ray).recast(e.near),!(Jr.containsPoint(ea.origin)===!1&&(ea.intersectSphere(Jr,sf)===null||ea.origin.distanceToSquared(sf)>(e.far-e.near)**2))&&(af.copy(s).invert(),ea.copy(e.ray).applyMatrix4(af),!(i.boundingBox!==null&&ea.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,ea)))}_computeIntersections(e,t,i){let a;const s=this.geometry,r=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,d=s.attributes.uv1,u=s.attributes.normal,h=s.groups,f=s.drawRange;if(o!==null)if(Array.isArray(r))for(let g=0,_=h.length;g<_;g++){const m=h[g],p=r[m.materialIndex],S=Math.max(m.start,f.start),x=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let y=S,C=x;y<C;y+=3){const M=o.getX(y),T=o.getX(y+1),A=o.getX(y+2);a=ao(this,p,e,i,c,d,u,M,T,A),a&&(a.faceIndex=Math.floor(y/3),a.face.materialIndex=m.materialIndex,t.push(a))}}else{const g=Math.max(0,f.start),_=Math.min(o.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const S=o.getX(m),x=o.getX(m+1),y=o.getX(m+2);a=ao(this,r,e,i,c,d,u,S,x,y),a&&(a.faceIndex=Math.floor(m/3),t.push(a))}}else if(l!==void 0)if(Array.isArray(r))for(let g=0,_=h.length;g<_;g++){const m=h[g],p=r[m.materialIndex],S=Math.max(m.start,f.start),x=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let y=S,C=x;y<C;y+=3){const M=y,T=y+1,A=y+2;a=ao(this,p,e,i,c,d,u,M,T,A),a&&(a.faceIndex=Math.floor(y/3),a.face.materialIndex=m.materialIndex,t.push(a))}}else{const g=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const S=m,x=m+1,y=m+2;a=ao(this,r,e,i,c,d,u,S,x,y),a&&(a.faceIndex=Math.floor(m/3),t.push(a))}}}}function Wy(n,e,t,i,a,s,r,o){let l;if(e.side===un?l=i.intersectTriangle(r,s,a,!0,o):l=i.intersectTriangle(a,s,r,e.side===Gi,o),l===null)return null;io.copy(o),io.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(io);return c<t.near||c>t.far?null:{distance:c,point:io.clone(),object:n}}function ao(n,e,t,i,a,s,r,o,l,c){n.getVertexPosition(o,Qr),n.getVertexPosition(l,eo),n.getVertexPosition(c,to);const d=Wy(n,e,t,i,Qr,eo,to,rf);if(d){const u=new L;Rn.getBarycoord(rf,Qr,eo,to,u),a&&(d.uv=Rn.getInterpolatedAttribute(a,o,l,c,u,new ce)),s&&(d.uv1=Rn.getInterpolatedAttribute(s,o,l,c,u,new ce)),r&&(d.normal=Rn.getInterpolatedAttribute(r,o,l,c,u,new L),d.normal.dot(i.direction)>0&&d.normal.multiplyScalar(-1));const h={a:o,b:l,c,normal:new L,materialIndex:0};Rn.getNormal(Qr,eo,to,h.normal),d.face=h,d.barycoord=u}return d}class Ta extends Rt{constructor(e=1,t=1,i=1,a=1,s=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:a,heightSegments:s,depthSegments:r};const o=this;a=Math.floor(a),s=Math.floor(s),r=Math.floor(r);const l=[],c=[],d=[],u=[];let h=0,f=0;g("z","y","x",-1,-1,i,t,e,r,s,0),g("z","y","x",1,-1,i,t,-e,r,s,1),g("x","z","y",1,1,e,i,t,a,r,2),g("x","z","y",1,-1,e,i,-t,a,r,3),g("x","y","z",1,-1,e,t,i,a,s,4),g("x","y","z",-1,-1,e,t,-i,a,s,5),this.setIndex(l),this.setAttribute("position",new it(c,3)),this.setAttribute("normal",new it(d,3)),this.setAttribute("uv",new it(u,2));function g(_,m,p,S,x,y,C,M,T,A,v){const b=y/T,R=C/A,I=y/2,O=C/2,H=M/2,V=T+1,B=A+1;let X=0,G=0;const te=new L;for(let fe=0;fe<B;fe++){const q=fe*R-O;for(let ue=0;ue<V;ue++){const Se=ue*b-I;te[_]=Se*S,te[m]=q*x,te[p]=H,c.push(te.x,te.y,te.z),te[_]=0,te[m]=0,te[p]=M>0?1:-1,d.push(te.x,te.y,te.z),u.push(ue/T),u.push(1-fe/A),X+=1}}for(let fe=0;fe<A;fe++)for(let q=0;q<T;q++){const ue=h+q+V*fe,Se=h+q+V*(fe+1),be=h+(q+1)+V*(fe+1),me=h+(q+1)+V*fe;l.push(ue,Se,me),l.push(Se,be,me),G+=6}o.addGroup(f,G,v),f+=G,h+=X}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ta(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function ms(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const a=n[t][i];a&&(a.isColor||a.isMatrix3||a.isMatrix4||a.isVector2||a.isVector3||a.isVector4||a.isTexture||a.isQuaternion)?a.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=a.clone():Array.isArray(a)?e[t][i]=a.slice():e[t][i]=a}}return e}function Jt(n){const e={};for(let t=0;t<n.length;t++){const i=ms(n[t]);for(const a in i)e[a]=i[a]}return e}function Xy(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function eg(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:tt.workingColorSpace}const qy={clone:ms,merge:Jt};var Yy=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Zy=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class $i extends wi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Yy,this.fragmentShader=Zy,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ms(e.uniforms),this.uniformsGroups=Xy(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const a in this.uniforms){const r=this.uniforms[a].value;r&&r.isTexture?t.uniforms[a]={type:"t",value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[a]={type:"c",value:r.getHex()}:r&&r.isVector2?t.uniforms[a]={type:"v2",value:r.toArray()}:r&&r.isVector3?t.uniforms[a]={type:"v3",value:r.toArray()}:r&&r.isVector4?t.uniforms[a]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?t.uniforms[a]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?t.uniforms[a]={type:"m4",value:r.toArray()}:t.uniforms[a]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const a in this.extensions)this.extensions[a]===!0&&(i[a]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class tg extends It{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new yt,this.projectionMatrix=new yt,this.projectionMatrixInverse=new yt,this.coordinateSystem=Qn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Ci=new L,of=new ce,lf=new ce;class An extends tg{constructor(e=50,t=1,i=.1,a=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=a,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=_r*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Js*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return _r*2*Math.atan(Math.tan(Js*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Ci.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ci.x,Ci.y).multiplyScalar(-e/Ci.z),Ci.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Ci.x,Ci.y).multiplyScalar(-e/Ci.z)}getViewSize(e,t){return this.getViewBounds(e,of,lf),t.subVectors(lf,of)}setViewOffset(e,t,i,a,s,r){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=a,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Js*.5*this.fov)/this.zoom,i=2*t,a=this.aspect*i,s=-.5*a;const r=this.view;if(this.view!==null&&this.view.enabled){const l=r.fullWidth,c=r.fullHeight;s+=r.offsetX*a/l,t-=r.offsetY*i/c,a*=r.width/l,i*=r.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+a,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Ha=-90,Ga=1;class Ky extends It{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const a=new An(Ha,Ga,e,t);a.layers=this.layers,this.add(a);const s=new An(Ha,Ga,e,t);s.layers=this.layers,this.add(s);const r=new An(Ha,Ga,e,t);r.layers=this.layers,this.add(r);const o=new An(Ha,Ga,e,t);o.layers=this.layers,this.add(o);const l=new An(Ha,Ga,e,t);l.layers=this.layers,this.add(l);const c=new An(Ha,Ga,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,a,s,r,o,l]=t;for(const c of t)this.remove(c);if(e===Qn)i.up.set(0,1,0),i.lookAt(1,0,0),a.up.set(0,1,0),a.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===il)i.up.set(0,-1,0),i.lookAt(-1,0,0),a.up.set(0,-1,0),a.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:a}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,r,o,l,c,d]=this.children,u=e.getRenderTarget(),h=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,a),e.render(t,s),e.setRenderTarget(i,1,a),e.render(t,r),e.setRenderTarget(i,2,a),e.render(t,o),e.setRenderTarget(i,3,a),e.render(t,l),e.setRenderTarget(i,4,a),e.render(t,c),i.texture.generateMipmaps=_,e.setRenderTarget(i,5,a),e.render(t,d),e.setRenderTarget(u,h,f),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class ng extends Qt{constructor(e=[],t=hs,i,a,s,r,o,l,c,d){super(e,t,i,a,s,r,o,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class jy extends xa{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},a=[i,i,i,i,i,i];this.texture=new ng(a),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},a=new Ta(5,5,5),s=new $i({name:"CubemapFromEquirect",uniforms:ms(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:un,blending:Fi});s.uniforms.tEquirect.value=t;const r=new He(a,s),o=t.minFilter;return t.minFilter===pa&&(t.minFilter=Jn),new Ky(1,10,this).update(e,r),t.minFilter=o,r.geometry.dispose(),r.material.dispose(),this}clear(e,t=!0,i=!0,a=!0){const s=e.getRenderTarget();for(let r=0;r<6;r++)e.setRenderTarget(this,r),e.clear(t,i,a);e.setRenderTarget(s)}}class _t extends It{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Jy={type:"move"};class yc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new _t,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new _t,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new _t,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let a=null,s=null,r=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){r=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,i),p=this._getHandJoint(c,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const d=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],h=d.position.distanceTo(u.position),f=.02,g=.005;c.inputState.pinching&&h>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(a=t.getPose(e.targetRaySpace,i),a===null&&s!==null&&(a=s),a!==null&&(o.matrix.fromArray(a.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,a.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(a.linearVelocity)):o.hasLinearVelocity=!1,a.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(a.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Jy)))}return o!==null&&(o.visible=a!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=r!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new _t;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class Qy extends It{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Xn,this.environmentIntensity=1,this.environmentRotation=new Xn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class eb{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Yd,this.updateRanges=[],this.version=0,this.uuid=ei()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let a=0,s=this.stride;a<s;a++)this.array[e+a]=t.array[i+a];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ei()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ei()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const jt=new L;class sl{constructor(e,t,i,a=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=a}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)jt.fromBufferAttribute(this,t),jt.applyMatrix4(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)jt.fromBufferAttribute(this,t),jt.applyNormalMatrix(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)jt.fromBufferAttribute(this,t),jt.transformDirection(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=zn(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=st(i,this.array)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=st(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=st(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=st(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=st(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=zn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=zn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=zn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=zn(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=st(t,this.array),i=st(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,a){return e=e*this.data.stride+this.offset,this.normalized&&(t=st(t,this.array),i=st(i,this.array),a=st(a,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=a,this}setXYZW(e,t,i,a,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=st(t,this.array),i=st(i,this.array),a=st(a,this.array),s=st(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=a,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const a=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[a+s])}return new Wn(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new sl(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const a=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[a+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class ig extends wi{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Ke(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Va;const ks=new L,$a=new L,Wa=new L,Xa=new ce,Os=new ce,ag=new yt,so=new L,Bs=new L,ro=new L,cf=new ce,bc=new ce,df=new ce;class sg extends It{constructor(e=new ig){if(super(),this.isSprite=!0,this.type="Sprite",Va===void 0){Va=new Rt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new eb(t,5);Va.setIndex([0,1,2,0,2,3]),Va.setAttribute("position",new sl(i,3,0,!1)),Va.setAttribute("uv",new sl(i,2,3,!1))}this.geometry=Va,this.material=e,this.center=new ce(.5,.5),this.count=1}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),$a.setFromMatrixScale(this.matrixWorld),ag.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Wa.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&$a.multiplyScalar(-Wa.z);const i=this.material.rotation;let a,s;i!==0&&(s=Math.cos(i),a=Math.sin(i));const r=this.center;oo(so.set(-.5,-.5,0),Wa,r,$a,a,s),oo(Bs.set(.5,-.5,0),Wa,r,$a,a,s),oo(ro.set(.5,.5,0),Wa,r,$a,a,s),cf.set(0,0),bc.set(1,0),df.set(1,1);let o=e.ray.intersectTriangle(so,Bs,ro,!1,ks);if(o===null&&(oo(Bs.set(-.5,.5,0),Wa,r,$a,a,s),bc.set(0,1),o=e.ray.intersectTriangle(so,ro,Bs,!1,ks),o===null))return;const l=e.ray.origin.distanceTo(ks);l<e.near||l>e.far||t.push({distance:l,point:ks.clone(),uv:Rn.getInterpolation(ks,so,Bs,ro,cf,bc,df,new ce),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function oo(n,e,t,i,a,s){Xa.subVectors(n,t).addScalar(.5).multiply(i),a!==void 0?(Os.x=s*Xa.x-a*Xa.y,Os.y=a*Xa.x+s*Xa.y):Os.copy(Xa),n.copy(e),n.x+=Os.x,n.y+=Os.y,n.applyMatrix4(ag)}const xc=new L,tb=new L,nb=new We;class Ni{constructor(e=new L(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,a){return this.normal.set(e,t,i),this.constant=a,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const a=xc.subVectors(i,t).cross(tb.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(a,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(xc),a=this.normal.dot(i);if(a===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/a;return s<0||s>1?null:t.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||nb.getNormalMatrix(e),a=this.coplanarPoint(xc).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-a.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ta=new Ll,ib=new ce(.5,.5),lo=new L;class Ju{constructor(e=new Ni,t=new Ni,i=new Ni,a=new Ni,s=new Ni,r=new Ni){this.planes=[e,t,i,a,s,r]}set(e,t,i,a,s,r){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(a),o[4].copy(s),o[5].copy(r),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Qn,i=!1){const a=this.planes,s=e.elements,r=s[0],o=s[1],l=s[2],c=s[3],d=s[4],u=s[5],h=s[6],f=s[7],g=s[8],_=s[9],m=s[10],p=s[11],S=s[12],x=s[13],y=s[14],C=s[15];if(a[0].setComponents(c-r,f-d,p-g,C-S).normalize(),a[1].setComponents(c+r,f+d,p+g,C+S).normalize(),a[2].setComponents(c+o,f+u,p+_,C+x).normalize(),a[3].setComponents(c-o,f-u,p-_,C-x).normalize(),i)a[4].setComponents(l,h,m,y).normalize(),a[5].setComponents(c-l,f-h,p-m,C-y).normalize();else if(a[4].setComponents(c-l,f-h,p-m,C-y).normalize(),t===Qn)a[5].setComponents(c+l,f+h,p+m,C+y).normalize();else if(t===il)a[5].setComponents(l,h,m,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ta.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ta.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ta)}intersectsSprite(e){ta.center.set(0,0,0);const t=ib.distanceTo(e.center);return ta.radius=.7071067811865476+t,ta.applyMatrix4(e.matrixWorld),this.intersectsSphere(ta)}intersectsSphere(e){const t=this.planes,i=e.center,a=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<a)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const a=t[i];if(lo.x=a.normal.x>0?e.max.x:e.min.x,lo.y=a.normal.y>0?e.max.y:e.min.y,lo.z=a.normal.z>0?e.max.z:e.min.z,a.distanceToPoint(lo)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Nl extends wi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ke(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const rl=new L,ol=new L,uf=new yt,zs=new ju,co=new Ll,wc=new L,hf=new L;class Qu extends It{constructor(e=new Rt,t=new Nl){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let a=1,s=t.count;a<s;a++)rl.fromBufferAttribute(t,a-1),ol.fromBufferAttribute(t,a),i[a]=i[a-1],i[a]+=rl.distanceTo(ol);e.setAttribute("lineDistance",new it(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,a=this.matrixWorld,s=e.params.Line.threshold,r=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),co.copy(i.boundingSphere),co.applyMatrix4(a),co.radius+=s,e.ray.intersectsSphere(co)===!1)return;uf.copy(a).invert(),zs.copy(e.ray).applyMatrix4(uf);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,d=i.index,h=i.attributes.position;if(d!==null){const f=Math.max(0,r.start),g=Math.min(d.count,r.start+r.count);for(let _=f,m=g-1;_<m;_+=c){const p=d.getX(_),S=d.getX(_+1),x=uo(this,e,zs,l,p,S,_);x&&t.push(x)}if(this.isLineLoop){const _=d.getX(g-1),m=d.getX(f),p=uo(this,e,zs,l,_,m,g-1);p&&t.push(p)}}else{const f=Math.max(0,r.start),g=Math.min(h.count,r.start+r.count);for(let _=f,m=g-1;_<m;_+=c){const p=uo(this,e,zs,l,_,_+1,_);p&&t.push(p)}if(this.isLineLoop){const _=uo(this,e,zs,l,g-1,f,g-1);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const a=t[i[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=a.length;s<r;s++){const o=a[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function uo(n,e,t,i,a,s,r){const o=n.geometry.attributes.position;if(rl.fromBufferAttribute(o,a),ol.fromBufferAttribute(o,s),t.distanceSqToSegment(rl,ol,wc,hf)>i)return;wc.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(wc);if(!(c<e.near||c>e.far))return{distance:c,point:hf.clone().applyMatrix4(n.matrixWorld),index:r,face:null,faceIndex:null,barycoord:null,object:n}}class Il extends Qt{constructor(e,t,i,a,s,r,o,l,c){super(e,t,i,a,s,r,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class rg extends Qt{constructor(e,t,i=ba,a,s,r,o=$n,l=$n,c,d=mr,u=1){if(d!==mr&&d!==gr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:e,height:t,depth:u};super(h,a,s,r,o,l,d,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ku(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class og extends Qt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Qa extends Rt{constructor(e=1,t=32,i=0,a=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:a},t=Math.max(3,t);const s=[],r=[],o=[],l=[],c=new L,d=new ce;r.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let u=0,h=3;u<=t;u++,h+=3){const f=i+u/t*a;c.x=e*Math.cos(f),c.y=e*Math.sin(f),r.push(c.x,c.y,c.z),o.push(0,0,1),d.x=(r[h]/e+1)/2,d.y=(r[h+1]/e+1)/2,l.push(d.x,d.y)}for(let u=1;u<=t;u++)s.push(u,u+1,0);this.setIndex(s),this.setAttribute("position",new it(r,3)),this.setAttribute("normal",new it(o,3)),this.setAttribute("uv",new it(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Qa(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Dl extends Rt{constructor(e=1,t=1,i=1,a=32,s=1,r=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:a,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:l};const c=this;a=Math.floor(a),s=Math.floor(s);const d=[],u=[],h=[],f=[];let g=0;const _=[],m=i/2;let p=0;S(),r===!1&&(e>0&&x(!0),t>0&&x(!1)),this.setIndex(d),this.setAttribute("position",new it(u,3)),this.setAttribute("normal",new it(h,3)),this.setAttribute("uv",new it(f,2));function S(){const y=new L,C=new L;let M=0;const T=(t-e)/i;for(let A=0;A<=s;A++){const v=[],b=A/s,R=b*(t-e)+e;for(let I=0;I<=a;I++){const O=I/a,H=O*l+o,V=Math.sin(H),B=Math.cos(H);C.x=R*V,C.y=-b*i+m,C.z=R*B,u.push(C.x,C.y,C.z),y.set(V,T,B).normalize(),h.push(y.x,y.y,y.z),f.push(O,1-b),v.push(g++)}_.push(v)}for(let A=0;A<a;A++)for(let v=0;v<s;v++){const b=_[v][A],R=_[v+1][A],I=_[v+1][A+1],O=_[v][A+1];(e>0||v!==0)&&(d.push(b,R,O),M+=3),(t>0||v!==s-1)&&(d.push(R,I,O),M+=3)}c.addGroup(p,M,0),p+=M}function x(y){const C=g,M=new ce,T=new L;let A=0;const v=y===!0?e:t,b=y===!0?1:-1;for(let I=1;I<=a;I++)u.push(0,m*b,0),h.push(0,b,0),f.push(.5,.5),g++;const R=g;for(let I=0;I<=a;I++){const H=I/a*l+o,V=Math.cos(H),B=Math.sin(H);T.x=v*B,T.y=m*b,T.z=v*V,u.push(T.x,T.y,T.z),h.push(0,b,0),M.x=V*.5+.5,M.y=B*.5*b+.5,f.push(M.x,M.y),g++}for(let I=0;I<a;I++){const O=C+I,H=R+I;y===!0?d.push(H,H+1,O):d.push(H+1,H,O),A+=3}c.addGroup(p,A,y===!0?1:2),p+=A}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Dl(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class yr extends Dl{constructor(e=1,t=1,i=32,a=1,s=!1,r=0,o=Math.PI*2){super(0,e,t,i,a,s,r,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:a,openEnded:s,thetaStart:r,thetaLength:o}}static fromJSON(e){return new yr(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class ri{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){const i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let i,a=this.getPoint(0),s=0;t.push(0);for(let r=1;r<=e;r++)i=this.getPoint(r/e),s+=i.distanceTo(a),t.push(s),a=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const i=this.getLengths();let a=0;const s=i.length;let r;t?r=t:r=e*i[s-1];let o=0,l=s-1,c;for(;o<=l;)if(a=Math.floor(o+(l-o)/2),c=i[a]-r,c<0)o=a+1;else if(c>0)l=a-1;else{l=a;break}if(a=l,i[a]===r)return a/(s-1);const d=i[a],h=i[a+1]-d,f=(r-d)/h;return(a+f)/(s-1)}getTangent(e,t){let a=e-1e-4,s=e+1e-4;a<0&&(a=0),s>1&&(s=1);const r=this.getPoint(a),o=this.getPoint(s),l=t||(r.isVector2?new ce:new L);return l.copy(o).sub(r).normalize(),l}getTangentAt(e,t){const i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t=!1){const i=new L,a=[],s=[],r=[],o=new L,l=new yt;for(let f=0;f<=e;f++){const g=f/e;a[f]=this.getTangentAt(g,new L)}s[0]=new L,r[0]=new L;let c=Number.MAX_VALUE;const d=Math.abs(a[0].x),u=Math.abs(a[0].y),h=Math.abs(a[0].z);d<=c&&(c=d,i.set(1,0,0)),u<=c&&(c=u,i.set(0,1,0)),h<=c&&i.set(0,0,1),o.crossVectors(a[0],i).normalize(),s[0].crossVectors(a[0],o),r[0].crossVectors(a[0],s[0]);for(let f=1;f<=e;f++){if(s[f]=s[f-1].clone(),r[f]=r[f-1].clone(),o.crossVectors(a[f-1],a[f]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(Ye(a[f-1].dot(a[f]),-1,1));s[f].applyMatrix4(l.makeRotationAxis(o,g))}r[f].crossVectors(a[f],s[f])}if(t===!0){let f=Math.acos(Ye(s[0].dot(s[e]),-1,1));f/=e,a[0].dot(o.crossVectors(s[0],s[e]))>0&&(f=-f);for(let g=1;g<=e;g++)s[g].applyMatrix4(l.makeRotationAxis(a[g],f*g)),r[g].crossVectors(a[g],s[g])}return{tangents:a,normals:s,binormals:r}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class eh extends ri{constructor(e=0,t=0,i=1,a=1,s=0,r=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=a,this.aStartAngle=s,this.aEndAngle=r,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new ce){const i=t,a=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const r=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=a;for(;s>a;)s-=a;s<Number.EPSILON&&(r?s=0:s=a),this.aClockwise===!0&&!r&&(s===a?s=-a:s=s-a);const o=this.aStartAngle+e*s;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const d=Math.cos(this.aRotation),u=Math.sin(this.aRotation),h=l-this.aX,f=c-this.aY;l=h*d-f*u+this.aX,c=h*u+f*d+this.aY}return i.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class ab extends eh{constructor(e,t,i,a,s,r){super(e,t,i,i,a,s,r),this.isArcCurve=!0,this.type="ArcCurve"}}function th(){let n=0,e=0,t=0,i=0;function a(s,r,o,l){n=s,e=o,t=-3*s+3*r-2*o-l,i=2*s-2*r+o+l}return{initCatmullRom:function(s,r,o,l,c){a(r,o,c*(o-s),c*(l-r))},initNonuniformCatmullRom:function(s,r,o,l,c,d,u){let h=(r-s)/c-(o-s)/(c+d)+(o-r)/d,f=(o-r)/d-(l-r)/(d+u)+(l-o)/u;h*=d,f*=d,a(r,o,h,f)},calc:function(s){const r=s*s,o=r*s;return n+e*s+t*r+i*o}}}const ho=new L,Sc=new th,Ec=new th,Mc=new th;class sb extends ri{constructor(e=[],t=!1,i="centripetal",a=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=a}getPoint(e,t=new L){const i=t,a=this.points,s=a.length,r=(s-(this.closed?0:1))*e;let o=Math.floor(r),l=r-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/s)+1)*s:l===0&&o===s-1&&(o=s-2,l=1);let c,d;this.closed||o>0?c=a[(o-1)%s]:(ho.subVectors(a[0],a[1]).add(a[0]),c=ho);const u=a[o%s],h=a[(o+1)%s];if(this.closed||o+2<s?d=a[(o+2)%s]:(ho.subVectors(a[s-1],a[s-2]).add(a[s-1]),d=ho),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(u),f),_=Math.pow(u.distanceToSquared(h),f),m=Math.pow(h.distanceToSquared(d),f);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),Sc.initNonuniformCatmullRom(c.x,u.x,h.x,d.x,g,_,m),Ec.initNonuniformCatmullRom(c.y,u.y,h.y,d.y,g,_,m),Mc.initNonuniformCatmullRom(c.z,u.z,h.z,d.z,g,_,m)}else this.curveType==="catmullrom"&&(Sc.initCatmullRom(c.x,u.x,h.x,d.x,this.tension),Ec.initCatmullRom(c.y,u.y,h.y,d.y,this.tension),Mc.initCatmullRom(c.z,u.z,h.z,d.z,this.tension));return i.set(Sc.calc(l),Ec.calc(l),Mc.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const a=e.points[t];this.points.push(a.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const a=this.points[t];e.points.push(a.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const a=e.points[t];this.points.push(new L().fromArray(a))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function ff(n,e,t,i,a){const s=(i-e)*.5,r=(a-t)*.5,o=n*n,l=n*o;return(2*t-2*i+s+r)*l+(-3*t+3*i-2*s-r)*o+s*n+t}function rb(n,e){const t=1-n;return t*t*e}function ob(n,e){return 2*(1-n)*n*e}function lb(n,e){return n*n*e}function er(n,e,t,i){return rb(n,e)+ob(n,t)+lb(n,i)}function cb(n,e){const t=1-n;return t*t*t*e}function db(n,e){const t=1-n;return 3*t*t*n*e}function ub(n,e){return 3*(1-n)*n*n*e}function hb(n,e){return n*n*n*e}function tr(n,e,t,i,a){return cb(n,e)+db(n,t)+ub(n,i)+hb(n,a)}class lg extends ri{constructor(e=new ce,t=new ce,i=new ce,a=new ce){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=a}getPoint(e,t=new ce){const i=t,a=this.v0,s=this.v1,r=this.v2,o=this.v3;return i.set(tr(e,a.x,s.x,r.x,o.x),tr(e,a.y,s.y,r.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class fb extends ri{constructor(e=new L,t=new L,i=new L,a=new L){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=a}getPoint(e,t=new L){const i=t,a=this.v0,s=this.v1,r=this.v2,o=this.v3;return i.set(tr(e,a.x,s.x,r.x,o.x),tr(e,a.y,s.y,r.y,o.y),tr(e,a.z,s.z,r.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class cg extends ri{constructor(e=new ce,t=new ce){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ce){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ce){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class pb extends ri{constructor(e=new L,t=new L){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new L){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new L){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class dg extends ri{constructor(e=new ce,t=new ce,i=new ce){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new ce){const i=t,a=this.v0,s=this.v1,r=this.v2;return i.set(er(e,a.x,s.x,r.x),er(e,a.y,s.y,r.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class mb extends ri{constructor(e=new L,t=new L,i=new L){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new L){const i=t,a=this.v0,s=this.v1,r=this.v2;return i.set(er(e,a.x,s.x,r.x),er(e,a.y,s.y,r.y),er(e,a.z,s.z,r.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class ug extends ri{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ce){const i=t,a=this.points,s=(a.length-1)*e,r=Math.floor(s),o=s-r,l=a[r===0?r:r-1],c=a[r],d=a[r>a.length-2?a.length-1:r+1],u=a[r>a.length-3?a.length-1:r+2];return i.set(ff(o,l.x,c.x,d.x,u.x),ff(o,l.y,c.y,d.y,u.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const a=e.points[t];this.points.push(a.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const a=this.points[t];e.points.push(a.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const a=e.points[t];this.points.push(new ce().fromArray(a))}return this}}var pf=Object.freeze({__proto__:null,ArcCurve:ab,CatmullRomCurve3:sb,CubicBezierCurve:lg,CubicBezierCurve3:fb,EllipseCurve:eh,LineCurve:cg,LineCurve3:pb,QuadraticBezierCurve:dg,QuadraticBezierCurve3:mb,SplineCurve:ug});class gb extends ri{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new pf[i](t,e))}return this}getPoint(e,t){const i=e*this.getLength(),a=this.getCurveLengths();let s=0;for(;s<a.length;){if(a[s]>=i){const r=a[s]-i,o=this.curves[s],l=o.getLength(),c=l===0?0:1-r/l;return o.getPointAt(c,t)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let i=0,a=this.curves.length;i<a;i++)t+=this.curves[i].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let i;for(let a=0,s=this.curves;a<s.length;a++){const r=s[a],o=r.isEllipseCurve?e*2:r.isLineCurve||r.isLineCurve3?1:r.isSplineCurve?e*r.points.length:e,l=r.getPoints(o);for(let c=0;c<l.length;c++){const d=l[c];i&&i.equals(d)||(t.push(d),i=d)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const a=e.curves[t];this.curves.push(a.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,i=this.curves.length;t<i;t++){const a=this.curves[t];e.curves.push(a.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const a=e.curves[t];this.curves.push(new pf[a.type]().fromJSON(a))}return this}}class mf extends gb{constructor(e){super(),this.type="Path",this.currentPoint=new ce,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,i=e.length;t<i;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const i=new cg(this.currentPoint.clone(),new ce(e,t));return this.curves.push(i),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,i,a){const s=new dg(this.currentPoint.clone(),new ce(e,t),new ce(i,a));return this.curves.push(s),this.currentPoint.set(i,a),this}bezierCurveTo(e,t,i,a,s,r){const o=new lg(this.currentPoint.clone(),new ce(e,t),new ce(i,a),new ce(s,r));return this.curves.push(o),this.currentPoint.set(s,r),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),i=new ug(t);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,i,a,s,r){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,i,a,s,r),this}absarc(e,t,i,a,s,r){return this.absellipse(e,t,i,i,a,s,r),this}ellipse(e,t,i,a,s,r,o,l){const c=this.currentPoint.x,d=this.currentPoint.y;return this.absellipse(e+c,t+d,i,a,s,r,o,l),this}absellipse(e,t,i,a,s,r,o,l){const c=new eh(e,t,i,a,s,r,o,l);if(this.curves.length>0){const u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);const d=c.getPoint(1);return this.currentPoint.copy(d),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class nh extends mf{constructor(e){super(e),this.uuid=ei(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let i=0,a=this.holes.length;i<a;i++)t[i]=this.holes[i].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){const a=e.holes[t];this.holes.push(a.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,i=this.holes.length;t<i;t++){const a=this.holes[t];e.holes.push(a.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){const a=e.holes[t];this.holes.push(new mf().fromJSON(a))}return this}}function _b(n,e,t=2){const i=e&&e.length,a=i?e[0]*t:n.length;let s=hg(n,0,a,t,!0);const r=[];if(!s||s.next===s.prev)return r;let o,l,c;if(i&&(s=wb(n,e,s,t)),n.length>80*t){o=1/0,l=1/0;let d=-1/0,u=-1/0;for(let h=t;h<a;h+=t){const f=n[h],g=n[h+1];f<o&&(o=f),g<l&&(l=g),f>d&&(d=f),g>u&&(u=g)}c=Math.max(d-o,u-l),c=c!==0?32767/c:0}return br(s,r,t,o,l,c,0),r}function hg(n,e,t,i,a){let s;if(a===Ib(n,e,t,i)>0)for(let r=e;r<t;r+=i)s=gf(r/i|0,n[r],n[r+1],s);else for(let r=t-i;r>=e;r-=i)s=gf(r/i|0,n[r],n[r+1],s);return s&&gs(s,s.next)&&(wr(s),s=s.next),s}function wa(n,e){if(!n)return n;e||(e=n);let t=n,i;do if(i=!1,!t.steiner&&(gs(t,t.next)||wt(t.prev,t,t.next)===0)){if(wr(t),t=e=t.prev,t===t.next)break;i=!0}else t=t.next;while(i||t!==e);return e}function br(n,e,t,i,a,s,r){if(!n)return;!r&&s&&Ab(n,i,a,s);let o=n;for(;n.prev!==n.next;){const l=n.prev,c=n.next;if(s?yb(n,i,a,s):vb(n)){e.push(l.i,n.i,c.i),wr(n),n=c.next,o=c.next;continue}if(n=c,n===o){r?r===1?(n=bb(wa(n),e),br(n,e,t,i,a,s,2)):r===2&&xb(n,e,t,i,a,s):br(wa(n),e,t,i,a,s,1);break}}}function vb(n){const e=n.prev,t=n,i=n.next;if(wt(e,t,i)>=0)return!1;const a=e.x,s=t.x,r=i.x,o=e.y,l=t.y,c=i.y,d=Math.min(a,s,r),u=Math.min(o,l,c),h=Math.max(a,s,r),f=Math.max(o,l,c);let g=i.next;for(;g!==e;){if(g.x>=d&&g.x<=h&&g.y>=u&&g.y<=f&&$s(a,o,s,l,r,c,g.x,g.y)&&wt(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function yb(n,e,t,i){const a=n.prev,s=n,r=n.next;if(wt(a,s,r)>=0)return!1;const o=a.x,l=s.x,c=r.x,d=a.y,u=s.y,h=r.y,f=Math.min(o,l,c),g=Math.min(d,u,h),_=Math.max(o,l,c),m=Math.max(d,u,h),p=Zd(f,g,e,t,i),S=Zd(_,m,e,t,i);let x=n.prevZ,y=n.nextZ;for(;x&&x.z>=p&&y&&y.z<=S;){if(x.x>=f&&x.x<=_&&x.y>=g&&x.y<=m&&x!==a&&x!==r&&$s(o,d,l,u,c,h,x.x,x.y)&&wt(x.prev,x,x.next)>=0||(x=x.prevZ,y.x>=f&&y.x<=_&&y.y>=g&&y.y<=m&&y!==a&&y!==r&&$s(o,d,l,u,c,h,y.x,y.y)&&wt(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;x&&x.z>=p;){if(x.x>=f&&x.x<=_&&x.y>=g&&x.y<=m&&x!==a&&x!==r&&$s(o,d,l,u,c,h,x.x,x.y)&&wt(x.prev,x,x.next)>=0)return!1;x=x.prevZ}for(;y&&y.z<=S;){if(y.x>=f&&y.x<=_&&y.y>=g&&y.y<=m&&y!==a&&y!==r&&$s(o,d,l,u,c,h,y.x,y.y)&&wt(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function bb(n,e){let t=n;do{const i=t.prev,a=t.next.next;!gs(i,a)&&pg(i,t,t.next,a)&&xr(i,a)&&xr(a,i)&&(e.push(i.i,t.i,a.i),wr(t),wr(t.next),t=n=a),t=t.next}while(t!==n);return wa(t)}function xb(n,e,t,i,a,s){let r=n;do{let o=r.next.next;for(;o!==r.prev;){if(r.i!==o.i&&Pb(r,o)){let l=mg(r,o);r=wa(r,r.next),l=wa(l,l.next),br(r,e,t,i,a,s,0),br(l,e,t,i,a,s,0);return}o=o.next}r=r.next}while(r!==n)}function wb(n,e,t,i){const a=[];for(let s=0,r=e.length;s<r;s++){const o=e[s]*i,l=s<r-1?e[s+1]*i:n.length,c=hg(n,o,l,i,!1);c===c.next&&(c.steiner=!0),a.push(Rb(c))}a.sort(Sb);for(let s=0;s<a.length;s++)t=Eb(a[s],t);return t}function Sb(n,e){let t=n.x-e.x;if(t===0&&(t=n.y-e.y,t===0)){const i=(n.next.y-n.y)/(n.next.x-n.x),a=(e.next.y-e.y)/(e.next.x-e.x);t=i-a}return t}function Eb(n,e){const t=Mb(n,e);if(!t)return e;const i=mg(t,n);return wa(i,i.next),wa(t,t.next)}function Mb(n,e){let t=e;const i=n.x,a=n.y;let s=-1/0,r;if(gs(n,t))return t;do{if(gs(n,t.next))return t.next;if(a<=t.y&&a>=t.next.y&&t.next.y!==t.y){const u=t.x+(a-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(u<=i&&u>s&&(s=u,r=t.x<t.next.x?t:t.next,u===i))return r}t=t.next}while(t!==e);if(!r)return null;const o=r,l=r.x,c=r.y;let d=1/0;t=r;do{if(i>=t.x&&t.x>=l&&i!==t.x&&fg(a<c?i:s,a,l,c,a<c?s:i,a,t.x,t.y)){const u=Math.abs(a-t.y)/(i-t.x);xr(t,n)&&(u<d||u===d&&(t.x>r.x||t.x===r.x&&Tb(r,t)))&&(r=t,d=u)}t=t.next}while(t!==o);return r}function Tb(n,e){return wt(n.prev,n,e.prev)<0&&wt(e.next,n,n.next)<0}function Ab(n,e,t,i){let a=n;do a.z===0&&(a.z=Zd(a.x,a.y,e,t,i)),a.prevZ=a.prev,a.nextZ=a.next,a=a.next;while(a!==n);a.prevZ.nextZ=null,a.prevZ=null,Cb(a)}function Cb(n){let e,t=1;do{let i=n,a;n=null;let s=null;for(e=0;i;){e++;let r=i,o=0;for(let c=0;c<t&&(o++,r=r.nextZ,!!r);c++);let l=t;for(;o>0||l>0&&r;)o!==0&&(l===0||!r||i.z<=r.z)?(a=i,i=i.nextZ,o--):(a=r,r=r.nextZ,l--),s?s.nextZ=a:n=a,a.prevZ=s,s=a;i=r}s.nextZ=null,t*=2}while(e>1);return n}function Zd(n,e,t,i,a){return n=(n-t)*a|0,e=(e-i)*a|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,n|e<<1}function Rb(n){let e=n,t=n;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==n);return t}function fg(n,e,t,i,a,s,r,o){return(a-r)*(e-o)>=(n-r)*(s-o)&&(n-r)*(i-o)>=(t-r)*(e-o)&&(t-r)*(s-o)>=(a-r)*(i-o)}function $s(n,e,t,i,a,s,r,o){return!(n===r&&e===o)&&fg(n,e,t,i,a,s,r,o)}function Pb(n,e){return n.next.i!==e.i&&n.prev.i!==e.i&&!Lb(n,e)&&(xr(n,e)&&xr(e,n)&&Nb(n,e)&&(wt(n.prev,n,e.prev)||wt(n,e.prev,e))||gs(n,e)&&wt(n.prev,n,n.next)>0&&wt(e.prev,e,e.next)>0)}function wt(n,e,t){return(e.y-n.y)*(t.x-e.x)-(e.x-n.x)*(t.y-e.y)}function gs(n,e){return n.x===e.x&&n.y===e.y}function pg(n,e,t,i){const a=po(wt(n,e,t)),s=po(wt(n,e,i)),r=po(wt(t,i,n)),o=po(wt(t,i,e));return!!(a!==s&&r!==o||a===0&&fo(n,t,e)||s===0&&fo(n,i,e)||r===0&&fo(t,n,i)||o===0&&fo(t,e,i))}function fo(n,e,t){return e.x<=Math.max(n.x,t.x)&&e.x>=Math.min(n.x,t.x)&&e.y<=Math.max(n.y,t.y)&&e.y>=Math.min(n.y,t.y)}function po(n){return n>0?1:n<0?-1:0}function Lb(n,e){let t=n;do{if(t.i!==n.i&&t.next.i!==n.i&&t.i!==e.i&&t.next.i!==e.i&&pg(t,t.next,n,e))return!0;t=t.next}while(t!==n);return!1}function xr(n,e){return wt(n.prev,n,n.next)<0?wt(n,e,n.next)>=0&&wt(n,n.prev,e)>=0:wt(n,e,n.prev)<0||wt(n,n.next,e)<0}function Nb(n,e){let t=n,i=!1;const a=(n.x+e.x)/2,s=(n.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&a<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(i=!i),t=t.next;while(t!==n);return i}function mg(n,e){const t=Kd(n.i,n.x,n.y),i=Kd(e.i,e.x,e.y),a=n.next,s=e.prev;return n.next=e,e.prev=n,t.next=a,a.prev=t,i.next=t,t.prev=i,s.next=i,i.prev=s,i}function gf(n,e,t,i){const a=Kd(n,e,t);return i?(a.next=i.next,a.prev=i,i.next.prev=a,i.next=a):(a.prev=a,a.next=a),a}function wr(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function Kd(n,e,t){return{i:n,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Ib(n,e,t,i){let a=0;for(let s=e,r=t-i;s<t;s+=i)a+=(n[r]-n[s])*(n[s+1]+n[r+1]),r=s;return a}class Db{static triangulate(e,t,i=2){return _b(e,t,i)}}class nr{static area(e){const t=e.length;let i=0;for(let a=t-1,s=0;s<t;a=s++)i+=e[a].x*e[s].y-e[s].x*e[a].y;return i*.5}static isClockWise(e){return nr.area(e)<0}static triangulateShape(e,t){const i=[],a=[],s=[];_f(e),vf(i,e);let r=e.length;t.forEach(_f);for(let l=0;l<t.length;l++)a.push(r),r+=t[l].length,vf(i,t[l]);const o=Db.triangulate(i,a);for(let l=0;l<o.length;l+=3)s.push(o.slice(l,l+3));return s}}function _f(n){const e=n.length;e>2&&n[e-1].equals(n[0])&&n.pop()}function vf(n,e){for(let t=0;t<e.length;t++)n.push(e[t].x),n.push(e[t].y)}class ln extends Rt{constructor(e=1,t=1,i=1,a=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:a};const s=e/2,r=t/2,o=Math.floor(i),l=Math.floor(a),c=o+1,d=l+1,u=e/o,h=t/l,f=[],g=[],_=[],m=[];for(let p=0;p<d;p++){const S=p*h-r;for(let x=0;x<c;x++){const y=x*u-s;g.push(y,-S,0),_.push(0,0,1),m.push(x/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let S=0;S<o;S++){const x=S+c*p,y=S+c*(p+1),C=S+1+c*(p+1),M=S+1+c*p;f.push(x,y,M),f.push(y,C,M)}this.setIndex(f),this.setAttribute("position",new it(g,3)),this.setAttribute("normal",new it(_,3)),this.setAttribute("uv",new it(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ln(e.width,e.height,e.widthSegments,e.heightSegments)}}class Aa extends Rt{constructor(e=.5,t=1,i=32,a=1,s=0,r=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:a,thetaStart:s,thetaLength:r},i=Math.max(3,i),a=Math.max(1,a);const o=[],l=[],c=[],d=[];let u=e;const h=(t-e)/a,f=new L,g=new ce;for(let _=0;_<=a;_++){for(let m=0;m<=i;m++){const p=s+m/i*r;f.x=u*Math.cos(p),f.y=u*Math.sin(p),l.push(f.x,f.y,f.z),c.push(0,0,1),g.x=(f.x/t+1)/2,g.y=(f.y/t+1)/2,d.push(g.x,g.y)}u+=h}for(let _=0;_<a;_++){const m=_*(i+1);for(let p=0;p<i;p++){const S=p+m,x=S,y=S+i+1,C=S+i+2,M=S+1;o.push(x,y,M),o.push(y,C,M)}}this.setIndex(o),this.setAttribute("position",new it(l,3)),this.setAttribute("normal",new it(c,3)),this.setAttribute("uv",new it(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Aa(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Ul extends Rt{constructor(e=new nh([new ce(0,.5),new ce(-.5,-.5),new ce(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};const i=[],a=[],s=[],r=[];let o=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let d=0;d<e.length;d++)c(e[d]),this.addGroup(o,l,d),o+=l,l=0;this.setIndex(i),this.setAttribute("position",new it(a,3)),this.setAttribute("normal",new it(s,3)),this.setAttribute("uv",new it(r,2));function c(d){const u=a.length/3,h=d.extractPoints(t);let f=h.shape;const g=h.holes;nr.isClockWise(f)===!1&&(f=f.reverse());for(let m=0,p=g.length;m<p;m++){const S=g[m];nr.isClockWise(S)===!0&&(g[m]=S.reverse())}const _=nr.triangulateShape(f,g);for(let m=0,p=g.length;m<p;m++){const S=g[m];f=f.concat(S)}for(let m=0,p=f.length;m<p;m++){const S=f[m];a.push(S.x,S.y,0),s.push(0,0,1),r.push(S.x,S.y)}for(let m=0,p=_.length;m<p;m++){const S=_[m],x=S[0]+u,y=S[1]+u,C=S[2]+u;i.push(x,y,C),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes;return Ub(t,e)}static fromJSON(e,t){const i=[];for(let a=0,s=e.shapes.length;a<s;a++){const r=t[e.shapes[a]];i.push(r)}return new Ul(i,e.curveSegments)}}function Ub(n,e){if(e.shapes=[],Array.isArray(n))for(let t=0,i=n.length;t<i;t++){const a=n[t];e.shapes.push(a.uuid)}else e.shapes.push(n.uuid);return e}class _s extends Rt{constructor(e=1,t=32,i=16,a=0,s=Math.PI*2,r=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:a,phiLength:s,thetaStart:r,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(r+o,Math.PI);let c=0;const d=[],u=new L,h=new L,f=[],g=[],_=[],m=[];for(let p=0;p<=i;p++){const S=[],x=p/i;let y=0;p===0&&r===0?y=.5/t:p===i&&l===Math.PI&&(y=-.5/t);for(let C=0;C<=t;C++){const M=C/t;u.x=-e*Math.cos(a+M*s)*Math.sin(r+x*o),u.y=e*Math.cos(r+x*o),u.z=e*Math.sin(a+M*s)*Math.sin(r+x*o),g.push(u.x,u.y,u.z),h.copy(u).normalize(),_.push(h.x,h.y,h.z),m.push(M+y,1-x),S.push(c++)}d.push(S)}for(let p=0;p<i;p++)for(let S=0;S<t;S++){const x=d[p][S+1],y=d[p][S],C=d[p+1][S],M=d[p+1][S+1];(p!==0||r>0)&&f.push(x,y,M),(p!==i-1||l<Math.PI)&&f.push(y,C,M)}this.setIndex(f),this.setAttribute("position",new it(g,3)),this.setAttribute("normal",new it(_,3)),this.setAttribute("uv",new it(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new _s(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class ih extends Rt{constructor(e=1,t=.4,i=12,a=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:a,arc:s},i=Math.floor(i),a=Math.floor(a);const r=[],o=[],l=[],c=[],d=new L,u=new L,h=new L;for(let f=0;f<=i;f++)for(let g=0;g<=a;g++){const _=g/a*s,m=f/i*Math.PI*2;u.x=(e+t*Math.cos(m))*Math.cos(_),u.y=(e+t*Math.cos(m))*Math.sin(_),u.z=t*Math.sin(m),o.push(u.x,u.y,u.z),d.x=e*Math.cos(_),d.y=e*Math.sin(_),h.subVectors(u,d).normalize(),l.push(h.x,h.y,h.z),c.push(g/a),c.push(f/i)}for(let f=1;f<=i;f++)for(let g=1;g<=a;g++){const _=(a+1)*f+g-1,m=(a+1)*(f-1)+g-1,p=(a+1)*(f-1)+g,S=(a+1)*f+g;r.push(_,m,S),r.push(m,p,S)}this.setIndex(r),this.setAttribute("position",new it(o,3)),this.setAttribute("normal",new it(l,3)),this.setAttribute("uv",new it(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ih(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class ll extends wi{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new Ke(16777215),this.specular=new Ke(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ke(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Yu,this.normalScale=new ce(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Xn,this.combine=Rl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class gg extends wi{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Ke(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ke(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Yu,this.normalScale=new ce(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Xn,this.combine=Rl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Fb extends wi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=ty,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class kb extends wi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class _g extends It{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ke(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}const Tc=new yt,yf=new L,bf=new L;class Ob{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ce(512,512),this.mapType=ai,this.map=null,this.mapPass=null,this.matrix=new yt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ju,this._frameExtents=new ce(1,1),this._viewportCount=1,this._viewports=[new At(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;yf.setFromMatrixPosition(e.matrixWorld),t.position.copy(yf),bf.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(bf),t.updateMatrixWorld(),Tc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Tc,t.coordinateSystem,t.reversedDepth),t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Tc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class vg extends tg{constructor(e=-1,t=1,i=1,a=-1,s=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=a,this.near=s,this.far=r,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,a,s,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=a,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,a=(this.top+this.bottom)/2;let s=i-e,r=i+e,o=a+t,l=a-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,r=s+c*this.view.width,o-=d*this.view.offsetY,l=o-d*this.view.height}this.projectionMatrix.makeOrthographic(s,r,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Bb extends Ob{constructor(){super(new vg(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class xf extends _g{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(It.DEFAULT_UP),this.updateMatrix(),this.target=new It,this.shadow=new Bb}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class zb extends _g{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class Hb extends An{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class wf{constructor(e=1,t=0,i=0){this.radius=e,this.phi=t,this.theta=i}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Ye(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(Ye(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const Sf=new L;let mo,Ac;class Gb extends It{constructor(e=new L(0,0,1),t=new L(0,0,0),i=1,a=16776960,s=i*.2,r=s*.2){super(),this.type="ArrowHelper",mo===void 0&&(mo=new Rt,mo.setAttribute("position",new it([0,0,0,0,1,0],3)),Ac=new yr(.5,1,5,1),Ac.translate(0,-.5,0)),this.position.copy(t),this.line=new Qu(mo,new Nl({color:a,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new He(Ac,new rt({color:a,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(e),this.setLength(i,s,r)}setDirection(e){if(e.y>.99999)this.quaternion.set(0,0,0,1);else if(e.y<-.99999)this.quaternion.set(1,0,0,0);else{Sf.set(e.z,0,-e.x).normalize();const t=Math.acos(e.y);this.quaternion.setFromAxisAngle(Sf,t)}}setLength(e,t=e*.2,i=t*.2){this.line.scale.set(1,Math.max(1e-4,e-t),1),this.line.updateMatrix(),this.cone.scale.set(i,t,i),this.cone.position.y=e,this.cone.updateMatrix()}setColor(e){this.line.material.color.set(e),this.cone.material.color.set(e)}copy(e){return super.copy(e,!1),this.line.copy(e.line),this.cone.copy(e.cone),this}dispose(){this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}}class Vb extends Ma{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function Ef(n,e,t,i){const a=$b(i);switch(t){case Vm:return n*e;case Wm:return n*e/a.components*a.byteLength;case Wu:return n*e/a.components*a.byteLength;case Xm:return n*e*2/a.components*a.byteLength;case Xu:return n*e*2/a.components*a.byteLength;case $m:return n*e*3/a.components*a.byteLength;case Gn:return n*e*4/a.components*a.byteLength;case qu:return n*e*4/a.components*a.byteLength;case No:case Io:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Do:case Uo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case xd:case Sd:return Math.max(n,16)*Math.max(e,8)/4;case bd:case wd:return Math.max(n,8)*Math.max(e,8)/2;case Ed:case Md:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Td:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ad:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Cd:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Rd:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Pd:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Ld:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Nd:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Id:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Dd:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Ud:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Fd:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case kd:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Od:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Bd:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case zd:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Hd:case Gd:case Vd:return Math.ceil(n/4)*Math.ceil(e/4)*16;case $d:case Wd:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Xd:case qd:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function $b(n){switch(n){case ai:case Bm:return{byteLength:1,components:1};case fr:case zm:case Fr:return{byteLength:2,components:1};case Vu:case $u:return{byteLength:2,components:4};case ba:case Gu:case mi:return{byteLength:4,components:1};case Hm:case Gm:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Hu}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Hu);function yg(){let n=null,e=!1,t=null,i=null;function a(s,r){t(s,r),i=n.requestAnimationFrame(a)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(a),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function Wb(n){const e=new WeakMap;function t(o,l){const c=o.array,d=o.usage,u=c.byteLength,h=n.createBuffer();n.bindBuffer(l,h),n.bufferData(l,c,d),o.onUploadCallback();let f;if(c instanceof Float32Array)f=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=n.HALF_FLOAT:f=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=n.SHORT;else if(c instanceof Uint32Array)f=n.UNSIGNED_INT;else if(c instanceof Int32Array)f=n.INT;else if(c instanceof Int8Array)f=n.BYTE;else if(c instanceof Uint8Array)f=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function i(o,l,c){const d=l.array,u=l.updateRanges;if(n.bindBuffer(c,o),u.length===0)n.bufferSubData(c,0,d);else{u.sort((f,g)=>f.start-g.start);let h=0;for(let f=1;f<u.length;f++){const g=u[h],_=u[f];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++h,u[h]=_)}u.length=h+1;for(let f=0,g=u.length;f<g;f++){const _=u[f];n.bufferSubData(c,_.start*d.BYTES_PER_ELEMENT,d,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function a(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(n.deleteBuffer(l.buffer),e.delete(o))}function r(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const d=e.get(o);(!d||d.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:a,remove:s,update:r}}var Xb=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,qb=`#ifdef USE_ALPHAHASH
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
#endif`,Yb=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Zb=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Kb=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,jb=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Jb=`#ifdef USE_AOMAP
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
#endif`,Qb=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,ex=`#ifdef USE_BATCHING
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
#endif`,tx=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,nx=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ix=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,ax=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,sx=`#ifdef USE_IRIDESCENCE
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
#endif`,rx=`#ifdef USE_BUMPMAP
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
#endif`,ox=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,lx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,cx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,dx=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ux=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,hx=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,fx=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,px=`#if defined( USE_COLOR_ALPHA )
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
#endif`,mx=`#define PI 3.141592653589793
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
} // validated`,gx=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,_x=`vec3 transformedNormal = objectNormal;
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
#endif`,vx=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,yx=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,bx=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,xx=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,wx="gl_FragColor = linearToOutputTexel( gl_FragColor );",Sx=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Ex=`#ifdef USE_ENVMAP
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
#endif`,Mx=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Tx=`#ifdef USE_ENVMAP
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
#endif`,Ax=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Cx=`#ifdef USE_ENVMAP
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
#endif`,Rx=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Px=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Lx=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Nx=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Ix=`#ifdef USE_GRADIENTMAP
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
}`,Dx=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Ux=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Fx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,kx=`uniform bool receiveShadow;
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
#endif`,Ox=`#ifdef USE_ENVMAP
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
#endif`,Bx=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,zx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Hx=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Gx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Vx=`PhysicalMaterial material;
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
#endif`,$x=`struct PhysicalMaterial {
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
}`,Wx=`
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
#endif`,Xx=`#if defined( RE_IndirectDiffuse )
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
#endif`,qx=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Yx=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Zx=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Kx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,jx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Jx=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Qx=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,ew=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,tw=`#if defined( USE_POINTS_UV )
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
#endif`,nw=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,iw=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,aw=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,sw=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,rw=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ow=`#ifdef USE_MORPHTARGETS
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
#endif`,lw=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,cw=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,dw=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,uw=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,hw=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,fw=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,pw=`#ifdef USE_NORMALMAP
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
#endif`,mw=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,gw=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,_w=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,vw=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,yw=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,bw=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,xw=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,ww=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Sw=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Ew=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Mw=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Tw=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Aw=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Cw=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Rw=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Pw=`float getShadowMask() {
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
}`,Lw=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Nw=`#ifdef USE_SKINNING
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
#endif`,Iw=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Dw=`#ifdef USE_SKINNING
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
#endif`,Uw=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Fw=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,kw=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Ow=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Bw=`#ifdef USE_TRANSMISSION
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
#endif`,zw=`#ifdef USE_TRANSMISSION
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
#endif`,Hw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Gw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Vw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,$w=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Ww=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Xw=`uniform sampler2D t2D;
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
}`,qw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Yw=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Zw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Kw=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,jw=`#include <common>
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
}`,Jw=`#if DEPTH_PACKING == 3200
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
}`,Qw=`#define DISTANCE
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
}`,eS=`#define DISTANCE
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
}`,tS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,nS=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,iS=`uniform float scale;
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
}`,aS=`uniform vec3 diffuse;
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
}`,sS=`#include <common>
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
}`,rS=`uniform vec3 diffuse;
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
}`,oS=`#define LAMBERT
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
}`,lS=`#define LAMBERT
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
}`,cS=`#define MATCAP
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
}`,dS=`#define MATCAP
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
}`,uS=`#define NORMAL
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
}`,hS=`#define NORMAL
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
}`,fS=`#define PHONG
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
}`,pS=`#define PHONG
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
}`,mS=`#define STANDARD
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
}`,gS=`#define STANDARD
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
}`,_S=`#define TOON
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
}`,vS=`#define TOON
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
}`,yS=`uniform float size;
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
}`,bS=`uniform vec3 diffuse;
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
}`,xS=`#include <common>
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
}`,wS=`uniform vec3 color;
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
}`,SS=`uniform float rotation;
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
}`,ES=`uniform vec3 diffuse;
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
}`,qe={alphahash_fragment:Xb,alphahash_pars_fragment:qb,alphamap_fragment:Yb,alphamap_pars_fragment:Zb,alphatest_fragment:Kb,alphatest_pars_fragment:jb,aomap_fragment:Jb,aomap_pars_fragment:Qb,batching_pars_vertex:ex,batching_vertex:tx,begin_vertex:nx,beginnormal_vertex:ix,bsdfs:ax,iridescence_fragment:sx,bumpmap_pars_fragment:rx,clipping_planes_fragment:ox,clipping_planes_pars_fragment:lx,clipping_planes_pars_vertex:cx,clipping_planes_vertex:dx,color_fragment:ux,color_pars_fragment:hx,color_pars_vertex:fx,color_vertex:px,common:mx,cube_uv_reflection_fragment:gx,defaultnormal_vertex:_x,displacementmap_pars_vertex:vx,displacementmap_vertex:yx,emissivemap_fragment:bx,emissivemap_pars_fragment:xx,colorspace_fragment:wx,colorspace_pars_fragment:Sx,envmap_fragment:Ex,envmap_common_pars_fragment:Mx,envmap_pars_fragment:Tx,envmap_pars_vertex:Ax,envmap_physical_pars_fragment:Ox,envmap_vertex:Cx,fog_vertex:Rx,fog_pars_vertex:Px,fog_fragment:Lx,fog_pars_fragment:Nx,gradientmap_pars_fragment:Ix,lightmap_pars_fragment:Dx,lights_lambert_fragment:Ux,lights_lambert_pars_fragment:Fx,lights_pars_begin:kx,lights_toon_fragment:Bx,lights_toon_pars_fragment:zx,lights_phong_fragment:Hx,lights_phong_pars_fragment:Gx,lights_physical_fragment:Vx,lights_physical_pars_fragment:$x,lights_fragment_begin:Wx,lights_fragment_maps:Xx,lights_fragment_end:qx,logdepthbuf_fragment:Yx,logdepthbuf_pars_fragment:Zx,logdepthbuf_pars_vertex:Kx,logdepthbuf_vertex:jx,map_fragment:Jx,map_pars_fragment:Qx,map_particle_fragment:ew,map_particle_pars_fragment:tw,metalnessmap_fragment:nw,metalnessmap_pars_fragment:iw,morphinstance_vertex:aw,morphcolor_vertex:sw,morphnormal_vertex:rw,morphtarget_pars_vertex:ow,morphtarget_vertex:lw,normal_fragment_begin:cw,normal_fragment_maps:dw,normal_pars_fragment:uw,normal_pars_vertex:hw,normal_vertex:fw,normalmap_pars_fragment:pw,clearcoat_normal_fragment_begin:mw,clearcoat_normal_fragment_maps:gw,clearcoat_pars_fragment:_w,iridescence_pars_fragment:vw,opaque_fragment:yw,packing:bw,premultiplied_alpha_fragment:xw,project_vertex:ww,dithering_fragment:Sw,dithering_pars_fragment:Ew,roughnessmap_fragment:Mw,roughnessmap_pars_fragment:Tw,shadowmap_pars_fragment:Aw,shadowmap_pars_vertex:Cw,shadowmap_vertex:Rw,shadowmask_pars_fragment:Pw,skinbase_vertex:Lw,skinning_pars_vertex:Nw,skinning_vertex:Iw,skinnormal_vertex:Dw,specularmap_fragment:Uw,specularmap_pars_fragment:Fw,tonemapping_fragment:kw,tonemapping_pars_fragment:Ow,transmission_fragment:Bw,transmission_pars_fragment:zw,uv_pars_fragment:Hw,uv_pars_vertex:Gw,uv_vertex:Vw,worldpos_vertex:$w,background_vert:Ww,background_frag:Xw,backgroundCube_vert:qw,backgroundCube_frag:Yw,cube_vert:Zw,cube_frag:Kw,depth_vert:jw,depth_frag:Jw,distanceRGBA_vert:Qw,distanceRGBA_frag:eS,equirect_vert:tS,equirect_frag:nS,linedashed_vert:iS,linedashed_frag:aS,meshbasic_vert:sS,meshbasic_frag:rS,meshlambert_vert:oS,meshlambert_frag:lS,meshmatcap_vert:cS,meshmatcap_frag:dS,meshnormal_vert:uS,meshnormal_frag:hS,meshphong_vert:fS,meshphong_frag:pS,meshphysical_vert:mS,meshphysical_frag:gS,meshtoon_vert:_S,meshtoon_frag:vS,points_vert:yS,points_frag:bS,shadow_vert:xS,shadow_frag:wS,sprite_vert:SS,sprite_frag:ES},he={common:{diffuse:{value:new Ke(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new We}},envmap:{envMap:{value:null},envMapRotation:{value:new We},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new We}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new We}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new We},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new We},normalScale:{value:new ce(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new We},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new We}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new We}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new We}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ke(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ke(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0},uvTransform:{value:new We}},sprite:{diffuse:{value:new Ke(16777215)},opacity:{value:1},center:{value:new ce(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}}},Zn={basic:{uniforms:Jt([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.fog]),vertexShader:qe.meshbasic_vert,fragmentShader:qe.meshbasic_frag},lambert:{uniforms:Jt([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.fog,he.lights,{emissive:{value:new Ke(0)}}]),vertexShader:qe.meshlambert_vert,fragmentShader:qe.meshlambert_frag},phong:{uniforms:Jt([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.fog,he.lights,{emissive:{value:new Ke(0)},specular:{value:new Ke(1118481)},shininess:{value:30}}]),vertexShader:qe.meshphong_vert,fragmentShader:qe.meshphong_frag},standard:{uniforms:Jt([he.common,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.roughnessmap,he.metalnessmap,he.fog,he.lights,{emissive:{value:new Ke(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:qe.meshphysical_vert,fragmentShader:qe.meshphysical_frag},toon:{uniforms:Jt([he.common,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.gradientmap,he.fog,he.lights,{emissive:{value:new Ke(0)}}]),vertexShader:qe.meshtoon_vert,fragmentShader:qe.meshtoon_frag},matcap:{uniforms:Jt([he.common,he.bumpmap,he.normalmap,he.displacementmap,he.fog,{matcap:{value:null}}]),vertexShader:qe.meshmatcap_vert,fragmentShader:qe.meshmatcap_frag},points:{uniforms:Jt([he.points,he.fog]),vertexShader:qe.points_vert,fragmentShader:qe.points_frag},dashed:{uniforms:Jt([he.common,he.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:qe.linedashed_vert,fragmentShader:qe.linedashed_frag},depth:{uniforms:Jt([he.common,he.displacementmap]),vertexShader:qe.depth_vert,fragmentShader:qe.depth_frag},normal:{uniforms:Jt([he.common,he.bumpmap,he.normalmap,he.displacementmap,{opacity:{value:1}}]),vertexShader:qe.meshnormal_vert,fragmentShader:qe.meshnormal_frag},sprite:{uniforms:Jt([he.sprite,he.fog]),vertexShader:qe.sprite_vert,fragmentShader:qe.sprite_frag},background:{uniforms:{uvTransform:{value:new We},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:qe.background_vert,fragmentShader:qe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new We}},vertexShader:qe.backgroundCube_vert,fragmentShader:qe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:qe.cube_vert,fragmentShader:qe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:qe.equirect_vert,fragmentShader:qe.equirect_frag},distanceRGBA:{uniforms:Jt([he.common,he.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:qe.distanceRGBA_vert,fragmentShader:qe.distanceRGBA_frag},shadow:{uniforms:Jt([he.lights,he.fog,{color:{value:new Ke(0)},opacity:{value:1}}]),vertexShader:qe.shadow_vert,fragmentShader:qe.shadow_frag}};Zn.physical={uniforms:Jt([Zn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new We},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new We},clearcoatNormalScale:{value:new ce(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new We},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new We},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new We},sheen:{value:0},sheenColor:{value:new Ke(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new We},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new We},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new We},transmissionSamplerSize:{value:new ce},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new We},attenuationDistance:{value:0},attenuationColor:{value:new Ke(0)},specularColor:{value:new Ke(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new We},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new We},anisotropyVector:{value:new ce},anisotropyMap:{value:null},anisotropyMapTransform:{value:new We}}]),vertexShader:qe.meshphysical_vert,fragmentShader:qe.meshphysical_frag};const go={r:0,b:0,g:0},na=new Xn,MS=new yt;function TS(n,e,t,i,a,s,r){const o=new Ke(0);let l=s===!0?0:1,c,d,u=null,h=0,f=null;function g(x){let y=x.isScene===!0?x.background:null;return y&&y.isTexture&&(y=(x.backgroundBlurriness>0?t:e).get(y)),y}function _(x){let y=!1;const C=g(x);C===null?p(o,l):C&&C.isColor&&(p(C,1),y=!0);const M=n.xr.getEnvironmentBlendMode();M==="additive"?i.buffers.color.setClear(0,0,0,1,r):M==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,r),(n.autoClear||y)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(x,y){const C=g(y);C&&(C.isCubeTexture||C.mapping===Pl)?(d===void 0&&(d=new He(new Ta(1,1,1),new $i({name:"BackgroundCubeMaterial",uniforms:ms(Zn.backgroundCube.uniforms),vertexShader:Zn.backgroundCube.vertexShader,fragmentShader:Zn.backgroundCube.fragmentShader,side:un,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(M,T,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),a.update(d)),na.copy(y.backgroundRotation),na.x*=-1,na.y*=-1,na.z*=-1,C.isCubeTexture&&C.isRenderTargetTexture===!1&&(na.y*=-1,na.z*=-1),d.material.uniforms.envMap.value=C,d.material.uniforms.flipEnvMap.value=C.isCubeTexture&&C.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(MS.makeRotationFromEuler(na)),d.material.toneMapped=tt.getTransfer(C.colorSpace)!==dt,(u!==C||h!==C.version||f!==n.toneMapping)&&(d.material.needsUpdate=!0,u=C,h=C.version,f=n.toneMapping),d.layers.enableAll(),x.unshift(d,d.geometry,d.material,0,0,null)):C&&C.isTexture&&(c===void 0&&(c=new He(new ln(2,2),new $i({name:"BackgroundMaterial",uniforms:ms(Zn.background.uniforms),vertexShader:Zn.background.vertexShader,fragmentShader:Zn.background.fragmentShader,side:Gi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),a.update(c)),c.material.uniforms.t2D.value=C,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.toneMapped=tt.getTransfer(C.colorSpace)!==dt,C.matrixAutoUpdate===!0&&C.updateMatrix(),c.material.uniforms.uvTransform.value.copy(C.matrix),(u!==C||h!==C.version||f!==n.toneMapping)&&(c.material.needsUpdate=!0,u=C,h=C.version,f=n.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null))}function p(x,y){x.getRGB(go,eg(n)),i.buffers.color.setClear(go.r,go.g,go.b,y,r)}function S(){d!==void 0&&(d.geometry.dispose(),d.material.dispose(),d=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(x,y=1){o.set(x),l=y,p(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(x){l=x,p(o,l)},render:_,addToRenderList:m,dispose:S}}function AS(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},a=h(null);let s=a,r=!1;function o(b,R,I,O,H){let V=!1;const B=u(O,I,R);s!==B&&(s=B,c(s.object)),V=f(b,O,I,H),V&&g(b,O,I,H),H!==null&&e.update(H,n.ELEMENT_ARRAY_BUFFER),(V||r)&&(r=!1,y(b,R,I,O),H!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(H).buffer))}function l(){return n.createVertexArray()}function c(b){return n.bindVertexArray(b)}function d(b){return n.deleteVertexArray(b)}function u(b,R,I){const O=I.wireframe===!0;let H=i[b.id];H===void 0&&(H={},i[b.id]=H);let V=H[R.id];V===void 0&&(V={},H[R.id]=V);let B=V[O];return B===void 0&&(B=h(l()),V[O]=B),B}function h(b){const R=[],I=[],O=[];for(let H=0;H<t;H++)R[H]=0,I[H]=0,O[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:I,attributeDivisors:O,object:b,attributes:{},index:null}}function f(b,R,I,O){const H=s.attributes,V=R.attributes;let B=0;const X=I.getAttributes();for(const G in X)if(X[G].location>=0){const fe=H[G];let q=V[G];if(q===void 0&&(G==="instanceMatrix"&&b.instanceMatrix&&(q=b.instanceMatrix),G==="instanceColor"&&b.instanceColor&&(q=b.instanceColor)),fe===void 0||fe.attribute!==q||q&&fe.data!==q.data)return!0;B++}return s.attributesNum!==B||s.index!==O}function g(b,R,I,O){const H={},V=R.attributes;let B=0;const X=I.getAttributes();for(const G in X)if(X[G].location>=0){let fe=V[G];fe===void 0&&(G==="instanceMatrix"&&b.instanceMatrix&&(fe=b.instanceMatrix),G==="instanceColor"&&b.instanceColor&&(fe=b.instanceColor));const q={};q.attribute=fe,fe&&fe.data&&(q.data=fe.data),H[G]=q,B++}s.attributes=H,s.attributesNum=B,s.index=O}function _(){const b=s.newAttributes;for(let R=0,I=b.length;R<I;R++)b[R]=0}function m(b){p(b,0)}function p(b,R){const I=s.newAttributes,O=s.enabledAttributes,H=s.attributeDivisors;I[b]=1,O[b]===0&&(n.enableVertexAttribArray(b),O[b]=1),H[b]!==R&&(n.vertexAttribDivisor(b,R),H[b]=R)}function S(){const b=s.newAttributes,R=s.enabledAttributes;for(let I=0,O=R.length;I<O;I++)R[I]!==b[I]&&(n.disableVertexAttribArray(I),R[I]=0)}function x(b,R,I,O,H,V,B){B===!0?n.vertexAttribIPointer(b,R,I,H,V):n.vertexAttribPointer(b,R,I,O,H,V)}function y(b,R,I,O){_();const H=O.attributes,V=I.getAttributes(),B=R.defaultAttributeValues;for(const X in V){const G=V[X];if(G.location>=0){let te=H[X];if(te===void 0&&(X==="instanceMatrix"&&b.instanceMatrix&&(te=b.instanceMatrix),X==="instanceColor"&&b.instanceColor&&(te=b.instanceColor)),te!==void 0){const fe=te.normalized,q=te.itemSize,ue=e.get(te);if(ue===void 0)continue;const Se=ue.buffer,be=ue.type,me=ue.bytesPerElement,k=be===n.INT||be===n.UNSIGNED_INT||te.gpuType===Gu;if(te.isInterleavedBufferAttribute){const Y=te.data,ie=Y.stride,we=te.offset;if(Y.isInstancedInterleavedBuffer){for(let ye=0;ye<G.locationSize;ye++)p(G.location+ye,Y.meshPerAttribute);b.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=Y.meshPerAttribute*Y.count)}else for(let ye=0;ye<G.locationSize;ye++)m(G.location+ye);n.bindBuffer(n.ARRAY_BUFFER,Se);for(let ye=0;ye<G.locationSize;ye++)x(G.location+ye,q/G.locationSize,be,fe,ie*me,(we+q/G.locationSize*ye)*me,k)}else{if(te.isInstancedBufferAttribute){for(let Y=0;Y<G.locationSize;Y++)p(G.location+Y,te.meshPerAttribute);b.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=te.meshPerAttribute*te.count)}else for(let Y=0;Y<G.locationSize;Y++)m(G.location+Y);n.bindBuffer(n.ARRAY_BUFFER,Se);for(let Y=0;Y<G.locationSize;Y++)x(G.location+Y,q/G.locationSize,be,fe,q*me,q/G.locationSize*Y*me,k)}}else if(B!==void 0){const fe=B[X];if(fe!==void 0)switch(fe.length){case 2:n.vertexAttrib2fv(G.location,fe);break;case 3:n.vertexAttrib3fv(G.location,fe);break;case 4:n.vertexAttrib4fv(G.location,fe);break;default:n.vertexAttrib1fv(G.location,fe)}}}}S()}function C(){A();for(const b in i){const R=i[b];for(const I in R){const O=R[I];for(const H in O)d(O[H].object),delete O[H];delete R[I]}delete i[b]}}function M(b){if(i[b.id]===void 0)return;const R=i[b.id];for(const I in R){const O=R[I];for(const H in O)d(O[H].object),delete O[H];delete R[I]}delete i[b.id]}function T(b){for(const R in i){const I=i[R];if(I[b.id]===void 0)continue;const O=I[b.id];for(const H in O)d(O[H].object),delete O[H];delete I[b.id]}}function A(){v(),r=!0,s!==a&&(s=a,c(s.object))}function v(){a.geometry=null,a.program=null,a.wireframe=!1}return{setup:o,reset:A,resetDefaultState:v,dispose:C,releaseStatesOfGeometry:M,releaseStatesOfProgram:T,initAttributes:_,enableAttribute:m,disableUnusedAttributes:S}}function CS(n,e,t){let i;function a(c){i=c}function s(c,d){n.drawArrays(i,c,d),t.update(d,i,1)}function r(c,d,u){u!==0&&(n.drawArraysInstanced(i,c,d,u),t.update(d,i,u))}function o(c,d,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,d,0,u);let f=0;for(let g=0;g<u;g++)f+=d[g];t.update(f,i,1)}function l(c,d,u,h){if(u===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<c.length;g++)r(c[g],d[g],h[g]);else{f.multiDrawArraysInstancedWEBGL(i,c,0,d,0,h,0,u);let g=0;for(let _=0;_<u;_++)g+=d[_]*h[_];t.update(g,i,1)}}this.setMode=a,this.render=s,this.renderInstances=r,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function RS(n,e,t,i){let a;function s(){if(a!==void 0)return a;if(e.has("EXT_texture_filter_anisotropic")===!0){const T=e.get("EXT_texture_filter_anisotropic");a=n.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else a=0;return a}function r(T){return!(T!==Gn&&i.convert(T)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(T){const A=T===Fr&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(T!==ai&&i.convert(T)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==mi&&!A)}function l(T){if(T==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const d=l(c);d!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",d,"instead."),c=d);const u=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),S=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),x=n.getParameter(n.MAX_VARYING_VECTORS),y=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),C=g>0,M=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:r,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:h,maxTextures:f,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:S,maxVaryings:x,maxFragmentUniforms:y,vertexTextures:C,maxSamples:M}}function PS(n){const e=this;let t=null,i=0,a=!1,s=!1;const r=new Ni,o=new We,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,h){const f=u.length!==0||h||i!==0||a;return a=h,i=u.length,f},this.beginShadows=function(){s=!0,d(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,h){t=d(u,h,0)},this.setState=function(u,h,f){const g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,p=n.get(u);if(!a||g===null||g.length===0||s&&!m)s?d(null):c();else{const S=s?0:i,x=S*4;let y=p.clippingState||null;l.value=y,y=d(g,h,x,f);for(let C=0;C!==x;++C)y[C]=t[C];p.clippingState=y,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=S}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function d(u,h,f,g){const _=u!==null?u.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const p=f+_*4,S=h.matrixWorldInverse;o.getNormalMatrix(S),(m===null||m.length<p)&&(m=new Float32Array(p));for(let x=0,y=f;x!==_;++x,y+=4)r.copy(u[x]).applyMatrix4(S,o),r.normal.toArray(m,y),m[y+3]=r.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function LS(n){let e=new WeakMap;function t(r,o){return o===gd?r.mapping=hs:o===_d&&(r.mapping=fs),r}function i(r){if(r&&r.isTexture){const o=r.mapping;if(o===gd||o===_d)if(e.has(r)){const l=e.get(r).texture;return t(l,r.mapping)}else{const l=r.image;if(l&&l.height>0){const c=new jy(l.height);return c.fromEquirectangularTexture(n,r),e.set(r,c),r.addEventListener("dispose",a),t(c.texture,r.mapping)}else return null}}return r}function a(r){const o=r.target;o.removeEventListener("dispose",a);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}const es=4,Mf=[.125,.215,.35,.446,.526,.582],ua=20,Cc=new vg,Tf=new Ke;let Rc=null,Pc=0,Lc=0,Nc=!1;const la=(1+Math.sqrt(5))/2,qa=1/la,Af=[new L(-la,qa,0),new L(la,qa,0),new L(-qa,0,la),new L(qa,0,la),new L(0,la,-qa),new L(0,la,qa),new L(-1,1,-1),new L(1,1,-1),new L(-1,1,1),new L(1,1,1)],NS=new L;class Cf{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,a=100,s={}){const{size:r=256,position:o=NS}=s;Rc=this._renderer.getRenderTarget(),Pc=this._renderer.getActiveCubeFace(),Lc=this._renderer.getActiveMipmapLevel(),Nc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(r);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,a,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Lf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Pf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Rc,Pc,Lc),this._renderer.xr.enabled=Nc,e.scissorTest=!1,_o(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===hs||e.mapping===fs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Rc=this._renderer.getRenderTarget(),Pc=this._renderer.getActiveCubeFace(),Lc=this._renderer.getActiveMipmapLevel(),Nc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Jn,minFilter:Jn,generateMipmaps:!1,type:Fr,format:Gn,colorSpace:ps,depthBuffer:!1},a=Rf(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Rf(e,t,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=IS(s)),this._blurMaterial=DS(s,e,t)}return a}_compileMaterial(e){const t=new He(this._lodPlanes[0],e);this._renderer.compile(t,Cc)}_sceneToCubeUV(e,t,i,a,s){const l=new An(90,1,t,i),c=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,f=u.toneMapping;u.getClearColor(Tf),u.toneMapping=Oi,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(a),u.clearDepth(),u.setRenderTarget(null));const _=new rt({name:"PMREM.Background",side:un,depthWrite:!1,depthTest:!1}),m=new He(new Ta,_);let p=!1;const S=e.background;S?S.isColor&&(_.color.copy(S),e.background=null,p=!0):(_.color.copy(Tf),p=!0);for(let x=0;x<6;x++){const y=x%3;y===0?(l.up.set(0,c[x],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+d[x],s.y,s.z)):y===1?(l.up.set(0,0,c[x]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+d[x],s.z)):(l.up.set(0,c[x],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+d[x]));const C=this._cubeSize;_o(a,y*C,x>2?C:0,C,C),u.setRenderTarget(a),p&&u.render(m,l),u.render(e,l)}m.geometry.dispose(),m.material.dispose(),u.toneMapping=f,u.autoClear=h,e.background=S}_textureToCubeUV(e,t){const i=this._renderer,a=e.mapping===hs||e.mapping===fs;a?(this._cubemapMaterial===null&&(this._cubemapMaterial=Lf()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Pf());const s=a?this._cubemapMaterial:this._equirectMaterial,r=new He(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;_o(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(r,Cc)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const a=this._lodPlanes.length;for(let s=1;s<a;s++){const r=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=Af[(a-s-1)%Af.length];this._blur(e,s-1,s,r,o)}t.autoClear=i}_blur(e,t,i,a,s){const r=this._pingPongRenderTarget;this._halfBlur(e,r,t,i,a,"latitudinal",s),this._halfBlur(r,e,i,i,a,"longitudinal",s)}_halfBlur(e,t,i,a,s,r,o){const l=this._renderer,c=this._blurMaterial;r!=="latitudinal"&&r!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const d=3,u=new He(this._lodPlanes[a],c),h=c.uniforms,f=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*ua-1),_=s/g,m=isFinite(s)?1+Math.floor(d*_):ua;m>ua&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ua}`);const p=[];let S=0;for(let T=0;T<ua;++T){const A=T/_,v=Math.exp(-A*A/2);p.push(v),T===0?S+=v:T<m&&(S+=2*v)}for(let T=0;T<p.length;T++)p[T]=p[T]/S;h.envMap.value=e.texture,h.samples.value=m,h.weights.value=p,h.latitudinal.value=r==="latitudinal",o&&(h.poleAxis.value=o);const{_lodMax:x}=this;h.dTheta.value=g,h.mipInt.value=x-i;const y=this._sizeLods[a],C=3*y*(a>x-es?a-x+es:0),M=4*(this._cubeSize-y);_o(t,C,M,3*y,2*y),l.setRenderTarget(t),l.render(u,Cc)}}function IS(n){const e=[],t=[],i=[];let a=n;const s=n-es+1+Mf.length;for(let r=0;r<s;r++){const o=Math.pow(2,a);t.push(o);let l=1/o;r>n-es?l=Mf[r-n+es-1]:r===0&&(l=0),i.push(l);const c=1/(o-2),d=-c,u=1+c,h=[d,d,u,d,u,u,d,d,u,u,d,u],f=6,g=6,_=3,m=2,p=1,S=new Float32Array(_*g*f),x=new Float32Array(m*g*f),y=new Float32Array(p*g*f);for(let M=0;M<f;M++){const T=M%3*2/3-1,A=M>2?0:-1,v=[T,A,0,T+2/3,A,0,T+2/3,A+1,0,T,A,0,T+2/3,A+1,0,T,A+1,0];S.set(v,_*g*M),x.set(h,m*g*M);const b=[M,M,M,M,M,M];y.set(b,p*g*M)}const C=new Rt;C.setAttribute("position",new Wn(S,_)),C.setAttribute("uv",new Wn(x,m)),C.setAttribute("faceIndex",new Wn(y,p)),e.push(C),a>es&&a--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function Rf(n,e,t){const i=new xa(n,e,t);return i.texture.mapping=Pl,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function _o(n,e,t,i,a){n.viewport.set(e,t,i,a),n.scissor.set(e,t,i,a)}function DS(n,e,t){const i=new Float32Array(ua),a=new L(0,1,0);return new $i({name:"SphericalGaussianBlur",defines:{n:ua,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:a}},vertexShader:ah(),fragmentShader:`

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
		`,blending:Fi,depthTest:!1,depthWrite:!1})}function Pf(){return new $i({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ah(),fragmentShader:`

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
		`,blending:Fi,depthTest:!1,depthWrite:!1})}function Lf(){return new $i({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ah(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Fi,depthTest:!1,depthWrite:!1})}function ah(){return`

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
	`}function US(n){let e=new WeakMap,t=null;function i(o){if(o&&o.isTexture){const l=o.mapping,c=l===gd||l===_d,d=l===hs||l===fs;if(c||d){let u=e.get(o);const h=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==h)return t===null&&(t=new Cf(n)),u=c?t.fromEquirectangular(o,u):t.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),u.texture;if(u!==void 0)return u.texture;{const f=o.image;return c&&f&&f.height>0||d&&f&&a(f)?(t===null&&(t=new Cf(n)),u=c?t.fromEquirectangular(o):t.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),o.addEventListener("dispose",s),u.texture):null}}}return o}function a(o){let l=0;const c=6;for(let d=0;d<c;d++)o[d]!==void 0&&l++;return l===c}function s(o){const l=o.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function r(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:r}}function FS(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let a;switch(i){case"WEBGL_depth_texture":a=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":a=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":a=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":a=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:a=n.getExtension(i)}return e[i]=a,a}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const a=t(i);return a===null&&vr("THREE.WebGLRenderer: "+i+" extension not supported."),a}}}function kS(n,e,t,i){const a={},s=new WeakMap;function r(u){const h=u.target;h.index!==null&&e.remove(h.index);for(const g in h.attributes)e.remove(h.attributes[g]);h.removeEventListener("dispose",r),delete a[h.id];const f=s.get(h);f&&(e.remove(f),s.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function o(u,h){return a[h.id]===!0||(h.addEventListener("dispose",r),a[h.id]=!0,t.memory.geometries++),h}function l(u){const h=u.attributes;for(const f in h)e.update(h[f],n.ARRAY_BUFFER)}function c(u){const h=[],f=u.index,g=u.attributes.position;let _=0;if(f!==null){const S=f.array;_=f.version;for(let x=0,y=S.length;x<y;x+=3){const C=S[x+0],M=S[x+1],T=S[x+2];h.push(C,M,M,T,T,C)}}else if(g!==void 0){const S=g.array;_=g.version;for(let x=0,y=S.length/3-1;x<y;x+=3){const C=x+0,M=x+1,T=x+2;h.push(C,M,M,T,T,C)}}else return;const m=new(Ym(h)?Qm:Jm)(h,1);m.version=_;const p=s.get(u);p&&e.remove(p),s.set(u,m)}function d(u){const h=s.get(u);if(h){const f=u.index;f!==null&&h.version<f.version&&c(u)}else c(u);return s.get(u)}return{get:o,update:l,getWireframeAttribute:d}}function OS(n,e,t){let i;function a(h){i=h}let s,r;function o(h){s=h.type,r=h.bytesPerElement}function l(h,f){n.drawElements(i,f,s,h*r),t.update(f,i,1)}function c(h,f,g){g!==0&&(n.drawElementsInstanced(i,f,s,h*r,g),t.update(f,i,g))}function d(h,f,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,s,h,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];t.update(m,i,1)}function u(h,f,g,_){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<h.length;p++)c(h[p]/r,f[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(i,f,0,s,h,0,_,0,g);let p=0;for(let S=0;S<g;S++)p+=f[S]*_[S];t.update(p,i,1)}}this.setMode=a,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=d,this.renderMultiDrawInstances=u}function BS(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,r,o){switch(t.calls++,r){case n.TRIANGLES:t.triangles+=o*(s/3);break;case n.LINES:t.lines+=o*(s/2);break;case n.LINE_STRIP:t.lines+=o*(s-1);break;case n.LINE_LOOP:t.lines+=o*s;break;case n.POINTS:t.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",r);break}}function a(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:a,update:i}}function zS(n,e,t){const i=new WeakMap,a=new At;function s(r,o,l){const c=r.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=d!==void 0?d.length:0;let h=i.get(o);if(h===void 0||h.count!==u){let v=function(){T.dispose(),i.delete(o),o.removeEventListener("dispose",v)};h!==void 0&&h.texture.dispose();const f=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],S=o.morphAttributes.color||[];let x=0;f===!0&&(x=1),g===!0&&(x=2),_===!0&&(x=3);let y=o.attributes.position.count*x,C=1;y>e.maxTextureSize&&(C=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);const M=new Float32Array(y*C*4*u),T=new Zm(M,y,C,u);T.type=mi,T.needsUpdate=!0;const A=x*4;for(let b=0;b<u;b++){const R=m[b],I=p[b],O=S[b],H=y*C*4*b;for(let V=0;V<R.count;V++){const B=V*A;f===!0&&(a.fromBufferAttribute(R,V),M[H+B+0]=a.x,M[H+B+1]=a.y,M[H+B+2]=a.z,M[H+B+3]=0),g===!0&&(a.fromBufferAttribute(I,V),M[H+B+4]=a.x,M[H+B+5]=a.y,M[H+B+6]=a.z,M[H+B+7]=0),_===!0&&(a.fromBufferAttribute(O,V),M[H+B+8]=a.x,M[H+B+9]=a.y,M[H+B+10]=a.z,M[H+B+11]=O.itemSize===4?a.w:1)}}h={count:u,texture:T,size:new ce(y,C)},i.set(o,h),o.addEventListener("dispose",v)}if(r.isInstancedMesh===!0&&r.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",r.morphTexture,t);else{let f=0;for(let _=0;_<c.length;_++)f+=c[_];const g=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(n,"morphTargetBaseInfluence",g),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:s}}function HS(n,e,t,i){let a=new WeakMap;function s(l){const c=i.render.frame,d=l.geometry,u=e.get(l,d);if(a.get(u)!==c&&(e.update(u),a.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),a.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),a.set(l,c))),l.isSkinnedMesh){const h=l.skeleton;a.get(h)!==c&&(h.update(),a.set(h,c))}return u}function r(){a=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:r}}const bg=new Qt,Nf=new rg(1,1),xg=new Zm,wg=new Dy,Sg=new ng,If=[],Df=[],Uf=new Float32Array(16),Ff=new Float32Array(9),kf=new Float32Array(4);function Es(n,e,t){const i=n[0];if(i<=0||i>0)return n;const a=e*t;let s=If[a];if(s===void 0&&(s=new Float32Array(a),If[a]=s),e!==0){i.toArray(s,0);for(let r=1,o=0;r!==e;++r)o+=t,n[r].toArray(s,o)}return s}function Dt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Ut(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Fl(n,e){let t=Df[e];t===void 0&&(t=new Int32Array(e),Df[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function GS(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function VS(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Dt(t,e))return;n.uniform2fv(this.addr,e),Ut(t,e)}}function $S(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Dt(t,e))return;n.uniform3fv(this.addr,e),Ut(t,e)}}function WS(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Dt(t,e))return;n.uniform4fv(this.addr,e),Ut(t,e)}}function XS(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Dt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Ut(t,e)}else{if(Dt(t,i))return;kf.set(i),n.uniformMatrix2fv(this.addr,!1,kf),Ut(t,i)}}function qS(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Dt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Ut(t,e)}else{if(Dt(t,i))return;Ff.set(i),n.uniformMatrix3fv(this.addr,!1,Ff),Ut(t,i)}}function YS(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Dt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Ut(t,e)}else{if(Dt(t,i))return;Uf.set(i),n.uniformMatrix4fv(this.addr,!1,Uf),Ut(t,i)}}function ZS(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function KS(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Dt(t,e))return;n.uniform2iv(this.addr,e),Ut(t,e)}}function jS(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Dt(t,e))return;n.uniform3iv(this.addr,e),Ut(t,e)}}function JS(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Dt(t,e))return;n.uniform4iv(this.addr,e),Ut(t,e)}}function QS(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function eE(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Dt(t,e))return;n.uniform2uiv(this.addr,e),Ut(t,e)}}function tE(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Dt(t,e))return;n.uniform3uiv(this.addr,e),Ut(t,e)}}function nE(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Dt(t,e))return;n.uniform4uiv(this.addr,e),Ut(t,e)}}function iE(n,e,t){const i=this.cache,a=t.allocateTextureUnit();i[0]!==a&&(n.uniform1i(this.addr,a),i[0]=a);let s;this.type===n.SAMPLER_2D_SHADOW?(Nf.compareFunction=qm,s=Nf):s=bg,t.setTexture2D(e||s,a)}function aE(n,e,t){const i=this.cache,a=t.allocateTextureUnit();i[0]!==a&&(n.uniform1i(this.addr,a),i[0]=a),t.setTexture3D(e||wg,a)}function sE(n,e,t){const i=this.cache,a=t.allocateTextureUnit();i[0]!==a&&(n.uniform1i(this.addr,a),i[0]=a),t.setTextureCube(e||Sg,a)}function rE(n,e,t){const i=this.cache,a=t.allocateTextureUnit();i[0]!==a&&(n.uniform1i(this.addr,a),i[0]=a),t.setTexture2DArray(e||xg,a)}function oE(n){switch(n){case 5126:return GS;case 35664:return VS;case 35665:return $S;case 35666:return WS;case 35674:return XS;case 35675:return qS;case 35676:return YS;case 5124:case 35670:return ZS;case 35667:case 35671:return KS;case 35668:case 35672:return jS;case 35669:case 35673:return JS;case 5125:return QS;case 36294:return eE;case 36295:return tE;case 36296:return nE;case 35678:case 36198:case 36298:case 36306:case 35682:return iE;case 35679:case 36299:case 36307:return aE;case 35680:case 36300:case 36308:case 36293:return sE;case 36289:case 36303:case 36311:case 36292:return rE}}function lE(n,e){n.uniform1fv(this.addr,e)}function cE(n,e){const t=Es(e,this.size,2);n.uniform2fv(this.addr,t)}function dE(n,e){const t=Es(e,this.size,3);n.uniform3fv(this.addr,t)}function uE(n,e){const t=Es(e,this.size,4);n.uniform4fv(this.addr,t)}function hE(n,e){const t=Es(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function fE(n,e){const t=Es(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function pE(n,e){const t=Es(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function mE(n,e){n.uniform1iv(this.addr,e)}function gE(n,e){n.uniform2iv(this.addr,e)}function _E(n,e){n.uniform3iv(this.addr,e)}function vE(n,e){n.uniform4iv(this.addr,e)}function yE(n,e){n.uniform1uiv(this.addr,e)}function bE(n,e){n.uniform2uiv(this.addr,e)}function xE(n,e){n.uniform3uiv(this.addr,e)}function wE(n,e){n.uniform4uiv(this.addr,e)}function SE(n,e,t){const i=this.cache,a=e.length,s=Fl(t,a);Dt(i,s)||(n.uniform1iv(this.addr,s),Ut(i,s));for(let r=0;r!==a;++r)t.setTexture2D(e[r]||bg,s[r])}function EE(n,e,t){const i=this.cache,a=e.length,s=Fl(t,a);Dt(i,s)||(n.uniform1iv(this.addr,s),Ut(i,s));for(let r=0;r!==a;++r)t.setTexture3D(e[r]||wg,s[r])}function ME(n,e,t){const i=this.cache,a=e.length,s=Fl(t,a);Dt(i,s)||(n.uniform1iv(this.addr,s),Ut(i,s));for(let r=0;r!==a;++r)t.setTextureCube(e[r]||Sg,s[r])}function TE(n,e,t){const i=this.cache,a=e.length,s=Fl(t,a);Dt(i,s)||(n.uniform1iv(this.addr,s),Ut(i,s));for(let r=0;r!==a;++r)t.setTexture2DArray(e[r]||xg,s[r])}function AE(n){switch(n){case 5126:return lE;case 35664:return cE;case 35665:return dE;case 35666:return uE;case 35674:return hE;case 35675:return fE;case 35676:return pE;case 5124:case 35670:return mE;case 35667:case 35671:return gE;case 35668:case 35672:return _E;case 35669:case 35673:return vE;case 5125:return yE;case 36294:return bE;case 36295:return xE;case 36296:return wE;case 35678:case 36198:case 36298:case 36306:case 35682:return SE;case 35679:case 36299:case 36307:return EE;case 35680:case 36300:case 36308:case 36293:return ME;case 36289:case 36303:case 36311:case 36292:return TE}}class CE{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=oE(t.type)}}class RE{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=AE(t.type)}}class PE{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const a=this.seq;for(let s=0,r=a.length;s!==r;++s){const o=a[s];o.setValue(e,t[o.id],i)}}}const Ic=/(\w+)(\])?(\[|\.)?/g;function Of(n,e){n.seq.push(e),n.map[e.id]=e}function LE(n,e,t){const i=n.name,a=i.length;for(Ic.lastIndex=0;;){const s=Ic.exec(i),r=Ic.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&r+2===a){Of(t,c===void 0?new CE(o,n,e):new RE(o,n,e));break}else{let u=t.map[o];u===void 0&&(u=new PE(o),Of(t,u)),t=u}}}class Fo{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const s=e.getActiveUniform(t,a),r=e.getUniformLocation(t,s.name);LE(s,r,this)}}setValue(e,t,i,a){const s=this.map[t];s!==void 0&&s.setValue(e,i,a)}setOptional(e,t,i){const a=t[i];a!==void 0&&this.setValue(e,i,a)}static upload(e,t,i,a){for(let s=0,r=t.length;s!==r;++s){const o=t[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,a)}}static seqWithValue(e,t){const i=[];for(let a=0,s=e.length;a!==s;++a){const r=e[a];r.id in t&&i.push(r)}return i}}function Bf(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const NE=37297;let IE=0;function DE(n,e){const t=n.split(`
`),i=[],a=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let r=a;r<s;r++){const o=r+1;i.push(`${o===e?">":" "} ${o}: ${t[r]}`)}return i.join(`
`)}const zf=new We;function UE(n){tt._getMatrix(zf,tt.workingColorSpace,n);const e=`mat3( ${zf.elements.map(t=>t.toFixed(4))} )`;switch(tt.getTransfer(n)){case nl:return[e,"LinearTransferOETF"];case dt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Hf(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+DE(n.getShaderSource(e),o)}else return s}function FE(n,e){const t=UE(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function kE(n,e){let t;switch(e){case q0:t="Linear";break;case Y0:t="Reinhard";break;case Z0:t="Cineon";break;case K0:t="ACESFilmic";break;case J0:t="AgX";break;case Q0:t="Neutral";break;case j0:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const vo=new L;function OE(){tt.getLuminanceCoefficients(vo);const n=vo.x.toFixed(4),e=vo.y.toFixed(4),t=vo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function BE(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ws).join(`
`)}function zE(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function HE(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let a=0;a<i;a++){const s=n.getActiveAttrib(e,a),r=s.name;let o=1;s.type===n.FLOAT_MAT2&&(o=2),s.type===n.FLOAT_MAT3&&(o=3),s.type===n.FLOAT_MAT4&&(o=4),t[r]={type:s.type,location:n.getAttribLocation(e,r),locationSize:o}}return t}function Ws(n){return n!==""}function Gf(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Vf(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const GE=/^[ \t]*#include +<([\w\d./]+)>/gm;function jd(n){return n.replace(GE,$E)}const VE=new Map;function $E(n,e){let t=qe[e];if(t===void 0){const i=VE.get(e);if(i!==void 0)t=qe[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return jd(t)}const WE=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function $f(n){return n.replace(WE,XE)}function XE(n,e,t,i){let a="";for(let s=parseInt(e);s<parseInt(t);s++)a+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return a}function Wf(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}function qE(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===km?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===T0?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===pi&&(e="SHADOWMAP_TYPE_VSM"),e}function YE(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case hs:case fs:e="ENVMAP_TYPE_CUBE";break;case Pl:e="ENVMAP_TYPE_CUBE_UV";break}return e}function ZE(n){let e="ENVMAP_MODE_REFLECTION";return n.envMap&&n.envMapMode===fs&&(e="ENVMAP_MODE_REFRACTION"),e}function KE(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Rl:e="ENVMAP_BLENDING_MULTIPLY";break;case W0:e="ENVMAP_BLENDING_MIX";break;case X0:e="ENVMAP_BLENDING_ADD";break}return e}function jE(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function JE(n,e,t,i){const a=n.getContext(),s=t.defines;let r=t.vertexShader,o=t.fragmentShader;const l=qE(t),c=YE(t),d=ZE(t),u=KE(t),h=jE(t),f=BE(t),g=zE(s),_=a.createProgram();let m,p,S=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Ws).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Ws).join(`
`),p.length>0&&(p+=`
`)):(m=[Wf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ws).join(`
`),p=[Wf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+d:"",t.envMap?"#define "+u:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Oi?"#define TONE_MAPPING":"",t.toneMapping!==Oi?qe.tonemapping_pars_fragment:"",t.toneMapping!==Oi?kE("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",qe.colorspace_pars_fragment,FE("linearToOutputTexel",t.outputColorSpace),OE(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ws).join(`
`)),r=jd(r),r=Gf(r,t),r=Vf(r,t),o=jd(o),o=Gf(o,t),o=Vf(o,t),r=$f(r),o=$f(o),t.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===Vh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Vh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const x=S+m+r,y=S+p+o,C=Bf(a,a.VERTEX_SHADER,x),M=Bf(a,a.FRAGMENT_SHADER,y);a.attachShader(_,C),a.attachShader(_,M),t.index0AttributeName!==void 0?a.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&a.bindAttribLocation(_,0,"position"),a.linkProgram(_);function T(R){if(n.debug.checkShaderErrors){const I=a.getProgramInfoLog(_)||"",O=a.getShaderInfoLog(C)||"",H=a.getShaderInfoLog(M)||"",V=I.trim(),B=O.trim(),X=H.trim();let G=!0,te=!0;if(a.getProgramParameter(_,a.LINK_STATUS)===!1)if(G=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(a,_,C,M);else{const fe=Hf(a,C,"vertex"),q=Hf(a,M,"fragment");console.error("THREE.WebGLProgram: Shader Error "+a.getError()+" - VALIDATE_STATUS "+a.getProgramParameter(_,a.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+V+`
`+fe+`
`+q)}else V!==""?console.warn("THREE.WebGLProgram: Program Info Log:",V):(B===""||X==="")&&(te=!1);te&&(R.diagnostics={runnable:G,programLog:V,vertexShader:{log:B,prefix:m},fragmentShader:{log:X,prefix:p}})}a.deleteShader(C),a.deleteShader(M),A=new Fo(a,_),v=HE(a,_)}let A;this.getUniforms=function(){return A===void 0&&T(this),A};let v;this.getAttributes=function(){return v===void 0&&T(this),v};let b=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return b===!1&&(b=a.getProgramParameter(_,NE)),b},this.destroy=function(){i.releaseStatesOfProgram(this),a.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=IE++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=C,this.fragmentShader=M,this}let QE=0;class eM{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,a=this._getShaderStage(t),s=this._getShaderStage(i),r=this._getShaderCacheForMaterial(e);return r.has(a)===!1&&(r.add(a),a.usedTimes++),r.has(s)===!1&&(r.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new tM(e),t.set(e,i)),i}}class tM{constructor(e){this.id=QE++,this.code=e,this.usedTimes=0}}function nM(n,e,t,i,a,s,r){const o=new Km,l=new eM,c=new Set,d=[],u=a.logarithmicDepthBuffer,h=a.vertexTextures;let f=a.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(v){return c.add(v),v===0?"uv":`uv${v}`}function m(v,b,R,I,O){const H=I.fog,V=O.geometry,B=v.isMeshStandardMaterial?I.environment:null,X=(v.isMeshStandardMaterial?t:e).get(v.envMap||B),G=X&&X.mapping===Pl?X.image.height:null,te=g[v.type];v.precision!==null&&(f=a.getMaxPrecision(v.precision),f!==v.precision&&console.warn("THREE.WebGLProgram.getParameters:",v.precision,"not supported, using",f,"instead."));const fe=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,q=fe!==void 0?fe.length:0;let ue=0;V.morphAttributes.position!==void 0&&(ue=1),V.morphAttributes.normal!==void 0&&(ue=2),V.morphAttributes.color!==void 0&&(ue=3);let Se,be,me,k;if(te){const nt=Zn[te];Se=nt.vertexShader,be=nt.fragmentShader}else Se=v.vertexShader,be=v.fragmentShader,l.update(v),me=l.getVertexShaderID(v),k=l.getFragmentShaderID(v);const Y=n.getRenderTarget(),ie=n.state.buffers.depth.getReversed(),we=O.isInstancedMesh===!0,ye=O.isBatchedMesh===!0,Fe=!!v.map,ot=!!v.matcap,N=!!X,lt=!!v.aoMap,Ve=!!v.lightMap,Oe=!!v.bumpMap,Ae=!!v.normalMap,vt=!!v.displacementMap,Ce=!!v.emissiveMap,Xe=!!v.metalnessMap,Ft=!!v.roughnessMap,Ct=v.anisotropy>0,P=v.clearcoat>0,w=v.dispersion>0,z=v.iridescence>0,j=v.sheen>0,ee=v.transmission>0,Z=Ct&&!!v.anisotropyMap,Ne=P&&!!v.clearcoatMap,le=P&&!!v.clearcoatNormalMap,Re=P&&!!v.clearcoatRoughnessMap,Pe=z&&!!v.iridescenceMap,re=z&&!!v.iridescenceThicknessMap,_e=j&&!!v.sheenColorMap,ke=j&&!!v.sheenRoughnessMap,Le=!!v.specularMap,pe=!!v.specularColorMap,$e=!!v.specularIntensityMap,D=ee&&!!v.transmissionMap,oe=ee&&!!v.thicknessMap,de=!!v.gradientMap,Ee=!!v.alphaMap,ae=v.alphaTest>0,J=!!v.alphaHash,Te=!!v.extensions;let Ge=Oi;v.toneMapped&&(Y===null||Y.isXRRenderTarget===!0)&&(Ge=n.toneMapping);const ft={shaderID:te,shaderType:v.type,shaderName:v.name,vertexShader:Se,fragmentShader:be,defines:v.defines,customVertexShaderID:me,customFragmentShaderID:k,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:f,batching:ye,batchingColor:ye&&O._colorsTexture!==null,instancing:we,instancingColor:we&&O.instanceColor!==null,instancingMorph:we&&O.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:Y===null?n.outputColorSpace:Y.isXRRenderTarget===!0?Y.texture.colorSpace:ps,alphaToCoverage:!!v.alphaToCoverage,map:Fe,matcap:ot,envMap:N,envMapMode:N&&X.mapping,envMapCubeUVHeight:G,aoMap:lt,lightMap:Ve,bumpMap:Oe,normalMap:Ae,displacementMap:h&&vt,emissiveMap:Ce,normalMapObjectSpace:Ae&&v.normalMapType===iy,normalMapTangentSpace:Ae&&v.normalMapType===Yu,metalnessMap:Xe,roughnessMap:Ft,anisotropy:Ct,anisotropyMap:Z,clearcoat:P,clearcoatMap:Ne,clearcoatNormalMap:le,clearcoatRoughnessMap:Re,dispersion:w,iridescence:z,iridescenceMap:Pe,iridescenceThicknessMap:re,sheen:j,sheenColorMap:_e,sheenRoughnessMap:ke,specularMap:Le,specularColorMap:pe,specularIntensityMap:$e,transmission:ee,transmissionMap:D,thicknessMap:oe,gradientMap:de,opaque:v.transparent===!1&&v.blending===ss&&v.alphaToCoverage===!1,alphaMap:Ee,alphaTest:ae,alphaHash:J,combine:v.combine,mapUv:Fe&&_(v.map.channel),aoMapUv:lt&&_(v.aoMap.channel),lightMapUv:Ve&&_(v.lightMap.channel),bumpMapUv:Oe&&_(v.bumpMap.channel),normalMapUv:Ae&&_(v.normalMap.channel),displacementMapUv:vt&&_(v.displacementMap.channel),emissiveMapUv:Ce&&_(v.emissiveMap.channel),metalnessMapUv:Xe&&_(v.metalnessMap.channel),roughnessMapUv:Ft&&_(v.roughnessMap.channel),anisotropyMapUv:Z&&_(v.anisotropyMap.channel),clearcoatMapUv:Ne&&_(v.clearcoatMap.channel),clearcoatNormalMapUv:le&&_(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Re&&_(v.clearcoatRoughnessMap.channel),iridescenceMapUv:Pe&&_(v.iridescenceMap.channel),iridescenceThicknessMapUv:re&&_(v.iridescenceThicknessMap.channel),sheenColorMapUv:_e&&_(v.sheenColorMap.channel),sheenRoughnessMapUv:ke&&_(v.sheenRoughnessMap.channel),specularMapUv:Le&&_(v.specularMap.channel),specularColorMapUv:pe&&_(v.specularColorMap.channel),specularIntensityMapUv:$e&&_(v.specularIntensityMap.channel),transmissionMapUv:D&&_(v.transmissionMap.channel),thicknessMapUv:oe&&_(v.thicknessMap.channel),alphaMapUv:Ee&&_(v.alphaMap.channel),vertexTangents:!!V.attributes.tangent&&(Ae||Ct),vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!V.attributes.uv&&(Fe||Ee),fog:!!H,useFog:v.fog===!0,fogExp2:!!H&&H.isFogExp2,flatShading:v.flatShading===!0&&v.wireframe===!1,sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:ie,skinning:O.isSkinnedMesh===!0,morphTargets:V.morphAttributes.position!==void 0,morphNormals:V.morphAttributes.normal!==void 0,morphColors:V.morphAttributes.color!==void 0,morphTargetsCount:q,morphTextureStride:ue,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:v.dithering,shadowMapEnabled:n.shadowMap.enabled&&R.length>0,shadowMapType:n.shadowMap.type,toneMapping:Ge,decodeVideoTexture:Fe&&v.map.isVideoTexture===!0&&tt.getTransfer(v.map.colorSpace)===dt,decodeVideoTextureEmissive:Ce&&v.emissiveMap.isVideoTexture===!0&&tt.getTransfer(v.emissiveMap.colorSpace)===dt,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===Qe,flipSided:v.side===un,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:Te&&v.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Te&&v.extensions.multiDraw===!0||ye)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return ft.vertexUv1s=c.has(1),ft.vertexUv2s=c.has(2),ft.vertexUv3s=c.has(3),c.clear(),ft}function p(v){const b=[];if(v.shaderID?b.push(v.shaderID):(b.push(v.customVertexShaderID),b.push(v.customFragmentShaderID)),v.defines!==void 0)for(const R in v.defines)b.push(R),b.push(v.defines[R]);return v.isRawShaderMaterial===!1&&(S(b,v),x(b,v),b.push(n.outputColorSpace)),b.push(v.customProgramCacheKey),b.join()}function S(v,b){v.push(b.precision),v.push(b.outputColorSpace),v.push(b.envMapMode),v.push(b.envMapCubeUVHeight),v.push(b.mapUv),v.push(b.alphaMapUv),v.push(b.lightMapUv),v.push(b.aoMapUv),v.push(b.bumpMapUv),v.push(b.normalMapUv),v.push(b.displacementMapUv),v.push(b.emissiveMapUv),v.push(b.metalnessMapUv),v.push(b.roughnessMapUv),v.push(b.anisotropyMapUv),v.push(b.clearcoatMapUv),v.push(b.clearcoatNormalMapUv),v.push(b.clearcoatRoughnessMapUv),v.push(b.iridescenceMapUv),v.push(b.iridescenceThicknessMapUv),v.push(b.sheenColorMapUv),v.push(b.sheenRoughnessMapUv),v.push(b.specularMapUv),v.push(b.specularColorMapUv),v.push(b.specularIntensityMapUv),v.push(b.transmissionMapUv),v.push(b.thicknessMapUv),v.push(b.combine),v.push(b.fogExp2),v.push(b.sizeAttenuation),v.push(b.morphTargetsCount),v.push(b.morphAttributeCount),v.push(b.numDirLights),v.push(b.numPointLights),v.push(b.numSpotLights),v.push(b.numSpotLightMaps),v.push(b.numHemiLights),v.push(b.numRectAreaLights),v.push(b.numDirLightShadows),v.push(b.numPointLightShadows),v.push(b.numSpotLightShadows),v.push(b.numSpotLightShadowsWithMaps),v.push(b.numLightProbes),v.push(b.shadowMapType),v.push(b.toneMapping),v.push(b.numClippingPlanes),v.push(b.numClipIntersection),v.push(b.depthPacking)}function x(v,b){o.disableAll(),b.supportsVertexTextures&&o.enable(0),b.instancing&&o.enable(1),b.instancingColor&&o.enable(2),b.instancingMorph&&o.enable(3),b.matcap&&o.enable(4),b.envMap&&o.enable(5),b.normalMapObjectSpace&&o.enable(6),b.normalMapTangentSpace&&o.enable(7),b.clearcoat&&o.enable(8),b.iridescence&&o.enable(9),b.alphaTest&&o.enable(10),b.vertexColors&&o.enable(11),b.vertexAlphas&&o.enable(12),b.vertexUv1s&&o.enable(13),b.vertexUv2s&&o.enable(14),b.vertexUv3s&&o.enable(15),b.vertexTangents&&o.enable(16),b.anisotropy&&o.enable(17),b.alphaHash&&o.enable(18),b.batching&&o.enable(19),b.dispersion&&o.enable(20),b.batchingColor&&o.enable(21),b.gradientMap&&o.enable(22),v.push(o.mask),o.disableAll(),b.fog&&o.enable(0),b.useFog&&o.enable(1),b.flatShading&&o.enable(2),b.logarithmicDepthBuffer&&o.enable(3),b.reversedDepthBuffer&&o.enable(4),b.skinning&&o.enable(5),b.morphTargets&&o.enable(6),b.morphNormals&&o.enable(7),b.morphColors&&o.enable(8),b.premultipliedAlpha&&o.enable(9),b.shadowMapEnabled&&o.enable(10),b.doubleSided&&o.enable(11),b.flipSided&&o.enable(12),b.useDepthPacking&&o.enable(13),b.dithering&&o.enable(14),b.transmission&&o.enable(15),b.sheen&&o.enable(16),b.opaque&&o.enable(17),b.pointsUvs&&o.enable(18),b.decodeVideoTexture&&o.enable(19),b.decodeVideoTextureEmissive&&o.enable(20),b.alphaToCoverage&&o.enable(21),v.push(o.mask)}function y(v){const b=g[v.type];let R;if(b){const I=Zn[b];R=qy.clone(I.uniforms)}else R=v.uniforms;return R}function C(v,b){let R;for(let I=0,O=d.length;I<O;I++){const H=d[I];if(H.cacheKey===b){R=H,++R.usedTimes;break}}return R===void 0&&(R=new JE(n,b,v,s),d.push(R)),R}function M(v){if(--v.usedTimes===0){const b=d.indexOf(v);d[b]=d[d.length-1],d.pop(),v.destroy()}}function T(v){l.remove(v)}function A(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:y,acquireProgram:C,releaseProgram:M,releaseShaderCache:T,programs:d,dispose:A}}function iM(){let n=new WeakMap;function e(r){return n.has(r)}function t(r){let o=n.get(r);return o===void 0&&(o={},n.set(r,o)),o}function i(r){n.delete(r)}function a(r,o,l){n.get(r)[o]=l}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:a,dispose:s}}function aM(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function Xf(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function qf(){const n=[];let e=0;const t=[],i=[],a=[];function s(){e=0,t.length=0,i.length=0,a.length=0}function r(u,h,f,g,_,m){let p=n[e];return p===void 0?(p={id:u.id,object:u,geometry:h,material:f,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},n[e]=p):(p.id=u.id,p.object=u,p.geometry=h,p.material=f,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=_,p.group=m),e++,p}function o(u,h,f,g,_,m){const p=r(u,h,f,g,_,m);f.transmission>0?i.push(p):f.transparent===!0?a.push(p):t.push(p)}function l(u,h,f,g,_,m){const p=r(u,h,f,g,_,m);f.transmission>0?i.unshift(p):f.transparent===!0?a.unshift(p):t.unshift(p)}function c(u,h){t.length>1&&t.sort(u||aM),i.length>1&&i.sort(h||Xf),a.length>1&&a.sort(h||Xf)}function d(){for(let u=e,h=n.length;u<h;u++){const f=n[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:i,transparent:a,init:s,push:o,unshift:l,finish:d,sort:c}}function sM(){let n=new WeakMap;function e(i,a){const s=n.get(i);let r;return s===void 0?(r=new qf,n.set(i,[r])):a>=s.length?(r=new qf,s.push(r)):r=s[a],r}function t(){n=new WeakMap}return{get:e,dispose:t}}function rM(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new L,color:new Ke};break;case"SpotLight":t={position:new L,direction:new L,color:new Ke,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new L,color:new Ke,distance:0,decay:0};break;case"HemisphereLight":t={direction:new L,skyColor:new Ke,groundColor:new Ke};break;case"RectAreaLight":t={color:new Ke,position:new L,halfWidth:new L,halfHeight:new L};break}return n[e.id]=t,t}}}function oM(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ce};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ce};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ce,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let lM=0;function cM(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function dM(n){const e=new rM,t=oM(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new L);const a=new L,s=new yt,r=new yt;function o(c){let d=0,u=0,h=0;for(let v=0;v<9;v++)i.probe[v].set(0,0,0);let f=0,g=0,_=0,m=0,p=0,S=0,x=0,y=0,C=0,M=0,T=0;c.sort(cM);for(let v=0,b=c.length;v<b;v++){const R=c[v],I=R.color,O=R.intensity,H=R.distance,V=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)d+=I.r*O,u+=I.g*O,h+=I.b*O;else if(R.isLightProbe){for(let B=0;B<9;B++)i.probe[B].addScaledVector(R.sh.coefficients[B],O);T++}else if(R.isDirectionalLight){const B=e.get(R);if(B.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const X=R.shadow,G=t.get(R);G.shadowIntensity=X.intensity,G.shadowBias=X.bias,G.shadowNormalBias=X.normalBias,G.shadowRadius=X.radius,G.shadowMapSize=X.mapSize,i.directionalShadow[f]=G,i.directionalShadowMap[f]=V,i.directionalShadowMatrix[f]=R.shadow.matrix,S++}i.directional[f]=B,f++}else if(R.isSpotLight){const B=e.get(R);B.position.setFromMatrixPosition(R.matrixWorld),B.color.copy(I).multiplyScalar(O),B.distance=H,B.coneCos=Math.cos(R.angle),B.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),B.decay=R.decay,i.spot[_]=B;const X=R.shadow;if(R.map&&(i.spotLightMap[C]=R.map,C++,X.updateMatrices(R),R.castShadow&&M++),i.spotLightMatrix[_]=X.matrix,R.castShadow){const G=t.get(R);G.shadowIntensity=X.intensity,G.shadowBias=X.bias,G.shadowNormalBias=X.normalBias,G.shadowRadius=X.radius,G.shadowMapSize=X.mapSize,i.spotShadow[_]=G,i.spotShadowMap[_]=V,y++}_++}else if(R.isRectAreaLight){const B=e.get(R);B.color.copy(I).multiplyScalar(O),B.halfWidth.set(R.width*.5,0,0),B.halfHeight.set(0,R.height*.5,0),i.rectArea[m]=B,m++}else if(R.isPointLight){const B=e.get(R);if(B.color.copy(R.color).multiplyScalar(R.intensity),B.distance=R.distance,B.decay=R.decay,R.castShadow){const X=R.shadow,G=t.get(R);G.shadowIntensity=X.intensity,G.shadowBias=X.bias,G.shadowNormalBias=X.normalBias,G.shadowRadius=X.radius,G.shadowMapSize=X.mapSize,G.shadowCameraNear=X.camera.near,G.shadowCameraFar=X.camera.far,i.pointShadow[g]=G,i.pointShadowMap[g]=V,i.pointShadowMatrix[g]=R.shadow.matrix,x++}i.point[g]=B,g++}else if(R.isHemisphereLight){const B=e.get(R);B.skyColor.copy(R.color).multiplyScalar(O),B.groundColor.copy(R.groundColor).multiplyScalar(O),i.hemi[p]=B,p++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=he.LTC_FLOAT_1,i.rectAreaLTC2=he.LTC_FLOAT_2):(i.rectAreaLTC1=he.LTC_HALF_1,i.rectAreaLTC2=he.LTC_HALF_2)),i.ambient[0]=d,i.ambient[1]=u,i.ambient[2]=h;const A=i.hash;(A.directionalLength!==f||A.pointLength!==g||A.spotLength!==_||A.rectAreaLength!==m||A.hemiLength!==p||A.numDirectionalShadows!==S||A.numPointShadows!==x||A.numSpotShadows!==y||A.numSpotMaps!==C||A.numLightProbes!==T)&&(i.directional.length=f,i.spot.length=_,i.rectArea.length=m,i.point.length=g,i.hemi.length=p,i.directionalShadow.length=S,i.directionalShadowMap.length=S,i.pointShadow.length=x,i.pointShadowMap.length=x,i.spotShadow.length=y,i.spotShadowMap.length=y,i.directionalShadowMatrix.length=S,i.pointShadowMatrix.length=x,i.spotLightMatrix.length=y+C-M,i.spotLightMap.length=C,i.numSpotLightShadowsWithMaps=M,i.numLightProbes=T,A.directionalLength=f,A.pointLength=g,A.spotLength=_,A.rectAreaLength=m,A.hemiLength=p,A.numDirectionalShadows=S,A.numPointShadows=x,A.numSpotShadows=y,A.numSpotMaps=C,A.numLightProbes=T,i.version=lM++)}function l(c,d){let u=0,h=0,f=0,g=0,_=0;const m=d.matrixWorldInverse;for(let p=0,S=c.length;p<S;p++){const x=c[p];if(x.isDirectionalLight){const y=i.directional[u];y.direction.setFromMatrixPosition(x.matrixWorld),a.setFromMatrixPosition(x.target.matrixWorld),y.direction.sub(a),y.direction.transformDirection(m),u++}else if(x.isSpotLight){const y=i.spot[f];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(x.matrixWorld),a.setFromMatrixPosition(x.target.matrixWorld),y.direction.sub(a),y.direction.transformDirection(m),f++}else if(x.isRectAreaLight){const y=i.rectArea[g];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(m),r.identity(),s.copy(x.matrixWorld),s.premultiply(m),r.extractRotation(s),y.halfWidth.set(x.width*.5,0,0),y.halfHeight.set(0,x.height*.5,0),y.halfWidth.applyMatrix4(r),y.halfHeight.applyMatrix4(r),g++}else if(x.isPointLight){const y=i.point[h];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(m),h++}else if(x.isHemisphereLight){const y=i.hemi[_];y.direction.setFromMatrixPosition(x.matrixWorld),y.direction.transformDirection(m),_++}}}return{setup:o,setupView:l,state:i}}function Yf(n){const e=new dM(n),t=[],i=[];function a(d){c.camera=d,t.length=0,i.length=0}function s(d){t.push(d)}function r(d){i.push(d)}function o(){e.setup(t)}function l(d){e.setupView(t,d)}const c={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:a,state:c,setupLights:o,setupLightsView:l,pushLight:s,pushShadow:r}}function uM(n){let e=new WeakMap;function t(a,s=0){const r=e.get(a);let o;return r===void 0?(o=new Yf(n),e.set(a,[o])):s>=r.length?(o=new Yf(n),r.push(o)):o=r[s],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const hM=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,fM=`uniform sampler2D shadow_pass;
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
}`;function pM(n,e,t){let i=new Ju;const a=new ce,s=new ce,r=new At,o=new Fb({depthPacking:ny}),l=new kb,c={},d=t.maxTextureSize,u={[Gi]:un,[un]:Gi,[Qe]:Qe},h=new $i({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ce},radius:{value:4}},vertexShader:hM,fragmentShader:fM}),f=h.clone();f.defines.HORIZONTAL_PASS=1;const g=new Rt;g.setAttribute("position",new Wn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new He(g,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=km;let p=this.type;this.render=function(M,T,A){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||M.length===0)return;const v=n.getRenderTarget(),b=n.getActiveCubeFace(),R=n.getActiveMipmapLevel(),I=n.state;I.setBlending(Fi),I.buffers.depth.getReversed()===!0?I.buffers.color.setClear(0,0,0,0):I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);const O=p!==pi&&this.type===pi,H=p===pi&&this.type!==pi;for(let V=0,B=M.length;V<B;V++){const X=M[V],G=X.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",X,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;a.copy(G.mapSize);const te=G.getFrameExtents();if(a.multiply(te),s.copy(G.mapSize),(a.x>d||a.y>d)&&(a.x>d&&(s.x=Math.floor(d/te.x),a.x=s.x*te.x,G.mapSize.x=s.x),a.y>d&&(s.y=Math.floor(d/te.y),a.y=s.y*te.y,G.mapSize.y=s.y)),G.map===null||O===!0||H===!0){const q=this.type!==pi?{minFilter:$n,magFilter:$n}:{};G.map!==null&&G.map.dispose(),G.map=new xa(a.x,a.y,q),G.map.texture.name=X.name+".shadowMap",G.camera.updateProjectionMatrix()}n.setRenderTarget(G.map),n.clear();const fe=G.getViewportCount();for(let q=0;q<fe;q++){const ue=G.getViewport(q);r.set(s.x*ue.x,s.y*ue.y,s.x*ue.z,s.y*ue.w),I.viewport(r),G.updateMatrices(X,q),i=G.getFrustum(),y(T,A,G.camera,X,this.type)}G.isPointLightShadow!==!0&&this.type===pi&&S(G,A),G.needsUpdate=!1}p=this.type,m.needsUpdate=!1,n.setRenderTarget(v,b,R)};function S(M,T){const A=e.update(_);h.defines.VSM_SAMPLES!==M.blurSamples&&(h.defines.VSM_SAMPLES=M.blurSamples,f.defines.VSM_SAMPLES=M.blurSamples,h.needsUpdate=!0,f.needsUpdate=!0),M.mapPass===null&&(M.mapPass=new xa(a.x,a.y)),h.uniforms.shadow_pass.value=M.map.texture,h.uniforms.resolution.value=M.mapSize,h.uniforms.radius.value=M.radius,n.setRenderTarget(M.mapPass),n.clear(),n.renderBufferDirect(T,null,A,h,_,null),f.uniforms.shadow_pass.value=M.mapPass.texture,f.uniforms.resolution.value=M.mapSize,f.uniforms.radius.value=M.radius,n.setRenderTarget(M.map),n.clear(),n.renderBufferDirect(T,null,A,f,_,null)}function x(M,T,A,v){let b=null;const R=A.isPointLight===!0?M.customDistanceMaterial:M.customDepthMaterial;if(R!==void 0)b=R;else if(b=A.isPointLight===!0?l:o,n.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0||T.alphaToCoverage===!0){const I=b.uuid,O=T.uuid;let H=c[I];H===void 0&&(H={},c[I]=H);let V=H[O];V===void 0&&(V=b.clone(),H[O]=V,T.addEventListener("dispose",C)),b=V}if(b.visible=T.visible,b.wireframe=T.wireframe,v===pi?b.side=T.shadowSide!==null?T.shadowSide:T.side:b.side=T.shadowSide!==null?T.shadowSide:u[T.side],b.alphaMap=T.alphaMap,b.alphaTest=T.alphaToCoverage===!0?.5:T.alphaTest,b.map=T.map,b.clipShadows=T.clipShadows,b.clippingPlanes=T.clippingPlanes,b.clipIntersection=T.clipIntersection,b.displacementMap=T.displacementMap,b.displacementScale=T.displacementScale,b.displacementBias=T.displacementBias,b.wireframeLinewidth=T.wireframeLinewidth,b.linewidth=T.linewidth,A.isPointLight===!0&&b.isMeshDistanceMaterial===!0){const I=n.properties.get(b);I.light=A}return b}function y(M,T,A,v,b){if(M.visible===!1)return;if(M.layers.test(T.layers)&&(M.isMesh||M.isLine||M.isPoints)&&(M.castShadow||M.receiveShadow&&b===pi)&&(!M.frustumCulled||i.intersectsObject(M))){M.modelViewMatrix.multiplyMatrices(A.matrixWorldInverse,M.matrixWorld);const O=e.update(M),H=M.material;if(Array.isArray(H)){const V=O.groups;for(let B=0,X=V.length;B<X;B++){const G=V[B],te=H[G.materialIndex];if(te&&te.visible){const fe=x(M,te,v,b);M.onBeforeShadow(n,M,T,A,O,fe,G),n.renderBufferDirect(A,null,O,fe,M,G),M.onAfterShadow(n,M,T,A,O,fe,G)}}}else if(H.visible){const V=x(M,H,v,b);M.onBeforeShadow(n,M,T,A,O,V,null),n.renderBufferDirect(A,null,O,V,M,null),M.onAfterShadow(n,M,T,A,O,V,null)}}const I=M.children;for(let O=0,H=I.length;O<H;O++)y(I[O],T,A,v,b)}function C(M){M.target.removeEventListener("dispose",C);for(const A in c){const v=c[A],b=M.target.uuid;b in v&&(v[b].dispose(),delete v[b])}}}const mM={[cd]:dd,[ud]:pd,[hd]:md,[us]:fd,[dd]:cd,[pd]:ud,[md]:hd,[fd]:us};function gM(n,e){function t(){let D=!1;const oe=new At;let de=null;const Ee=new At(0,0,0,0);return{setMask:function(ae){de!==ae&&!D&&(n.colorMask(ae,ae,ae,ae),de=ae)},setLocked:function(ae){D=ae},setClear:function(ae,J,Te,Ge,ft){ft===!0&&(ae*=Ge,J*=Ge,Te*=Ge),oe.set(ae,J,Te,Ge),Ee.equals(oe)===!1&&(n.clearColor(ae,J,Te,Ge),Ee.copy(oe))},reset:function(){D=!1,de=null,Ee.set(-1,0,0,0)}}}function i(){let D=!1,oe=!1,de=null,Ee=null,ae=null;return{setReversed:function(J){if(oe!==J){const Te=e.get("EXT_clip_control");J?Te.clipControlEXT(Te.LOWER_LEFT_EXT,Te.ZERO_TO_ONE_EXT):Te.clipControlEXT(Te.LOWER_LEFT_EXT,Te.NEGATIVE_ONE_TO_ONE_EXT),oe=J;const Ge=ae;ae=null,this.setClear(Ge)}},getReversed:function(){return oe},setTest:function(J){J?Y(n.DEPTH_TEST):ie(n.DEPTH_TEST)},setMask:function(J){de!==J&&!D&&(n.depthMask(J),de=J)},setFunc:function(J){if(oe&&(J=mM[J]),Ee!==J){switch(J){case cd:n.depthFunc(n.NEVER);break;case dd:n.depthFunc(n.ALWAYS);break;case ud:n.depthFunc(n.LESS);break;case us:n.depthFunc(n.LEQUAL);break;case hd:n.depthFunc(n.EQUAL);break;case fd:n.depthFunc(n.GEQUAL);break;case pd:n.depthFunc(n.GREATER);break;case md:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Ee=J}},setLocked:function(J){D=J},setClear:function(J){ae!==J&&(oe&&(J=1-J),n.clearDepth(J),ae=J)},reset:function(){D=!1,de=null,Ee=null,ae=null,oe=!1}}}function a(){let D=!1,oe=null,de=null,Ee=null,ae=null,J=null,Te=null,Ge=null,ft=null;return{setTest:function(nt){D||(nt?Y(n.STENCIL_TEST):ie(n.STENCIL_TEST))},setMask:function(nt){oe!==nt&&!D&&(n.stencilMask(nt),oe=nt)},setFunc:function(nt,oi,qn){(de!==nt||Ee!==oi||ae!==qn)&&(n.stencilFunc(nt,oi,qn),de=nt,Ee=oi,ae=qn)},setOp:function(nt,oi,qn){(J!==nt||Te!==oi||Ge!==qn)&&(n.stencilOp(nt,oi,qn),J=nt,Te=oi,Ge=qn)},setLocked:function(nt){D=nt},setClear:function(nt){ft!==nt&&(n.clearStencil(nt),ft=nt)},reset:function(){D=!1,oe=null,de=null,Ee=null,ae=null,J=null,Te=null,Ge=null,ft=null}}}const s=new t,r=new i,o=new a,l=new WeakMap,c=new WeakMap;let d={},u={},h=new WeakMap,f=[],g=null,_=!1,m=null,p=null,S=null,x=null,y=null,C=null,M=null,T=new Ke(0,0,0),A=0,v=!1,b=null,R=null,I=null,O=null,H=null;const V=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let B=!1,X=0;const G=n.getParameter(n.VERSION);G.indexOf("WebGL")!==-1?(X=parseFloat(/^WebGL (\d)/.exec(G)[1]),B=X>=1):G.indexOf("OpenGL ES")!==-1&&(X=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),B=X>=2);let te=null,fe={};const q=n.getParameter(n.SCISSOR_BOX),ue=n.getParameter(n.VIEWPORT),Se=new At().fromArray(q),be=new At().fromArray(ue);function me(D,oe,de,Ee){const ae=new Uint8Array(4),J=n.createTexture();n.bindTexture(D,J),n.texParameteri(D,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(D,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Te=0;Te<de;Te++)D===n.TEXTURE_3D||D===n.TEXTURE_2D_ARRAY?n.texImage3D(oe,0,n.RGBA,1,1,Ee,0,n.RGBA,n.UNSIGNED_BYTE,ae):n.texImage2D(oe+Te,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ae);return J}const k={};k[n.TEXTURE_2D]=me(n.TEXTURE_2D,n.TEXTURE_2D,1),k[n.TEXTURE_CUBE_MAP]=me(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),k[n.TEXTURE_2D_ARRAY]=me(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),k[n.TEXTURE_3D]=me(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),r.setClear(1),o.setClear(0),Y(n.DEPTH_TEST),r.setFunc(us),Oe(!1),Ae(Bh),Y(n.CULL_FACE),lt(Fi);function Y(D){d[D]!==!0&&(n.enable(D),d[D]=!0)}function ie(D){d[D]!==!1&&(n.disable(D),d[D]=!1)}function we(D,oe){return u[D]!==oe?(n.bindFramebuffer(D,oe),u[D]=oe,D===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=oe),D===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=oe),!0):!1}function ye(D,oe){let de=f,Ee=!1;if(D){de=h.get(oe),de===void 0&&(de=[],h.set(oe,de));const ae=D.textures;if(de.length!==ae.length||de[0]!==n.COLOR_ATTACHMENT0){for(let J=0,Te=ae.length;J<Te;J++)de[J]=n.COLOR_ATTACHMENT0+J;de.length=ae.length,Ee=!0}}else de[0]!==n.BACK&&(de[0]=n.BACK,Ee=!0);Ee&&n.drawBuffers(de)}function Fe(D){return g!==D?(n.useProgram(D),g=D,!0):!1}const ot={[da]:n.FUNC_ADD,[C0]:n.FUNC_SUBTRACT,[R0]:n.FUNC_REVERSE_SUBTRACT};ot[P0]=n.MIN,ot[L0]=n.MAX;const N={[N0]:n.ZERO,[I0]:n.ONE,[D0]:n.SRC_COLOR,[od]:n.SRC_ALPHA,[z0]:n.SRC_ALPHA_SATURATE,[O0]:n.DST_COLOR,[F0]:n.DST_ALPHA,[U0]:n.ONE_MINUS_SRC_COLOR,[ld]:n.ONE_MINUS_SRC_ALPHA,[B0]:n.ONE_MINUS_DST_COLOR,[k0]:n.ONE_MINUS_DST_ALPHA,[H0]:n.CONSTANT_COLOR,[G0]:n.ONE_MINUS_CONSTANT_COLOR,[V0]:n.CONSTANT_ALPHA,[$0]:n.ONE_MINUS_CONSTANT_ALPHA};function lt(D,oe,de,Ee,ae,J,Te,Ge,ft,nt){if(D===Fi){_===!0&&(ie(n.BLEND),_=!1);return}if(_===!1&&(Y(n.BLEND),_=!0),D!==A0){if(D!==m||nt!==v){if((p!==da||y!==da)&&(n.blendEquation(n.FUNC_ADD),p=da,y=da),nt)switch(D){case ss:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case ki:n.blendFunc(n.ONE,n.ONE);break;case zh:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Hh:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case ss:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case ki:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case zh:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Hh:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}S=null,x=null,C=null,M=null,T.set(0,0,0),A=0,m=D,v=nt}return}ae=ae||oe,J=J||de,Te=Te||Ee,(oe!==p||ae!==y)&&(n.blendEquationSeparate(ot[oe],ot[ae]),p=oe,y=ae),(de!==S||Ee!==x||J!==C||Te!==M)&&(n.blendFuncSeparate(N[de],N[Ee],N[J],N[Te]),S=de,x=Ee,C=J,M=Te),(Ge.equals(T)===!1||ft!==A)&&(n.blendColor(Ge.r,Ge.g,Ge.b,ft),T.copy(Ge),A=ft),m=D,v=!1}function Ve(D,oe){D.side===Qe?ie(n.CULL_FACE):Y(n.CULL_FACE);let de=D.side===un;oe&&(de=!de),Oe(de),D.blending===ss&&D.transparent===!1?lt(Fi):lt(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),r.setFunc(D.depthFunc),r.setTest(D.depthTest),r.setMask(D.depthWrite),s.setMask(D.colorWrite);const Ee=D.stencilWrite;o.setTest(Ee),Ee&&(o.setMask(D.stencilWriteMask),o.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),o.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),Ce(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?Y(n.SAMPLE_ALPHA_TO_COVERAGE):ie(n.SAMPLE_ALPHA_TO_COVERAGE)}function Oe(D){b!==D&&(D?n.frontFace(n.CW):n.frontFace(n.CCW),b=D)}function Ae(D){D!==E0?(Y(n.CULL_FACE),D!==R&&(D===Bh?n.cullFace(n.BACK):D===M0?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):ie(n.CULL_FACE),R=D}function vt(D){D!==I&&(B&&n.lineWidth(D),I=D)}function Ce(D,oe,de){D?(Y(n.POLYGON_OFFSET_FILL),(O!==oe||H!==de)&&(n.polygonOffset(oe,de),O=oe,H=de)):ie(n.POLYGON_OFFSET_FILL)}function Xe(D){D?Y(n.SCISSOR_TEST):ie(n.SCISSOR_TEST)}function Ft(D){D===void 0&&(D=n.TEXTURE0+V-1),te!==D&&(n.activeTexture(D),te=D)}function Ct(D,oe,de){de===void 0&&(te===null?de=n.TEXTURE0+V-1:de=te);let Ee=fe[de];Ee===void 0&&(Ee={type:void 0,texture:void 0},fe[de]=Ee),(Ee.type!==D||Ee.texture!==oe)&&(te!==de&&(n.activeTexture(de),te=de),n.bindTexture(D,oe||k[D]),Ee.type=D,Ee.texture=oe)}function P(){const D=fe[te];D!==void 0&&D.type!==void 0&&(n.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function w(){try{n.compressedTexImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function z(){try{n.compressedTexImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function j(){try{n.texSubImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ee(){try{n.texSubImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Z(){try{n.compressedTexSubImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ne(){try{n.compressedTexSubImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function le(){try{n.texStorage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Re(){try{n.texStorage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Pe(){try{n.texImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function re(){try{n.texImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function _e(D){Se.equals(D)===!1&&(n.scissor(D.x,D.y,D.z,D.w),Se.copy(D))}function ke(D){be.equals(D)===!1&&(n.viewport(D.x,D.y,D.z,D.w),be.copy(D))}function Le(D,oe){let de=c.get(oe);de===void 0&&(de=new WeakMap,c.set(oe,de));let Ee=de.get(D);Ee===void 0&&(Ee=n.getUniformBlockIndex(oe,D.name),de.set(D,Ee))}function pe(D,oe){const Ee=c.get(oe).get(D);l.get(oe)!==Ee&&(n.uniformBlockBinding(oe,Ee,D.__bindingPointIndex),l.set(oe,Ee))}function $e(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),r.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),d={},te=null,fe={},u={},h=new WeakMap,f=[],g=null,_=!1,m=null,p=null,S=null,x=null,y=null,C=null,M=null,T=new Ke(0,0,0),A=0,v=!1,b=null,R=null,I=null,O=null,H=null,Se.set(0,0,n.canvas.width,n.canvas.height),be.set(0,0,n.canvas.width,n.canvas.height),s.reset(),r.reset(),o.reset()}return{buffers:{color:s,depth:r,stencil:o},enable:Y,disable:ie,bindFramebuffer:we,drawBuffers:ye,useProgram:Fe,setBlending:lt,setMaterial:Ve,setFlipSided:Oe,setCullFace:Ae,setLineWidth:vt,setPolygonOffset:Ce,setScissorTest:Xe,activeTexture:Ft,bindTexture:Ct,unbindTexture:P,compressedTexImage2D:w,compressedTexImage3D:z,texImage2D:Pe,texImage3D:re,updateUBOMapping:Le,uniformBlockBinding:pe,texStorage2D:le,texStorage3D:Re,texSubImage2D:j,texSubImage3D:ee,compressedTexSubImage2D:Z,compressedTexSubImage3D:Ne,scissor:_e,viewport:ke,reset:$e}}function _M(n,e,t,i,a,s,r){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ce,d=new WeakMap;let u;const h=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(P,w){return f?new OffscreenCanvas(P,w):al("canvas")}function _(P,w,z){let j=1;const ee=Ct(P);if((ee.width>z||ee.height>z)&&(j=z/Math.max(ee.width,ee.height)),j<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){const Z=Math.floor(j*ee.width),Ne=Math.floor(j*ee.height);u===void 0&&(u=g(Z,Ne));const le=w?g(Z,Ne):u;return le.width=Z,le.height=Ne,le.getContext("2d").drawImage(P,0,0,Z,Ne),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ee.width+"x"+ee.height+") to ("+Z+"x"+Ne+")."),le}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ee.width+"x"+ee.height+")."),P;return P}function m(P){return P.generateMipmaps}function p(P){n.generateMipmap(P)}function S(P){return P.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?n.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function x(P,w,z,j,ee=!1){if(P!==null){if(n[P]!==void 0)return n[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let Z=w;if(w===n.RED&&(z===n.FLOAT&&(Z=n.R32F),z===n.HALF_FLOAT&&(Z=n.R16F),z===n.UNSIGNED_BYTE&&(Z=n.R8)),w===n.RED_INTEGER&&(z===n.UNSIGNED_BYTE&&(Z=n.R8UI),z===n.UNSIGNED_SHORT&&(Z=n.R16UI),z===n.UNSIGNED_INT&&(Z=n.R32UI),z===n.BYTE&&(Z=n.R8I),z===n.SHORT&&(Z=n.R16I),z===n.INT&&(Z=n.R32I)),w===n.RG&&(z===n.FLOAT&&(Z=n.RG32F),z===n.HALF_FLOAT&&(Z=n.RG16F),z===n.UNSIGNED_BYTE&&(Z=n.RG8)),w===n.RG_INTEGER&&(z===n.UNSIGNED_BYTE&&(Z=n.RG8UI),z===n.UNSIGNED_SHORT&&(Z=n.RG16UI),z===n.UNSIGNED_INT&&(Z=n.RG32UI),z===n.BYTE&&(Z=n.RG8I),z===n.SHORT&&(Z=n.RG16I),z===n.INT&&(Z=n.RG32I)),w===n.RGB_INTEGER&&(z===n.UNSIGNED_BYTE&&(Z=n.RGB8UI),z===n.UNSIGNED_SHORT&&(Z=n.RGB16UI),z===n.UNSIGNED_INT&&(Z=n.RGB32UI),z===n.BYTE&&(Z=n.RGB8I),z===n.SHORT&&(Z=n.RGB16I),z===n.INT&&(Z=n.RGB32I)),w===n.RGBA_INTEGER&&(z===n.UNSIGNED_BYTE&&(Z=n.RGBA8UI),z===n.UNSIGNED_SHORT&&(Z=n.RGBA16UI),z===n.UNSIGNED_INT&&(Z=n.RGBA32UI),z===n.BYTE&&(Z=n.RGBA8I),z===n.SHORT&&(Z=n.RGBA16I),z===n.INT&&(Z=n.RGBA32I)),w===n.RGB&&(z===n.UNSIGNED_INT_5_9_9_9_REV&&(Z=n.RGB9_E5),z===n.UNSIGNED_INT_10F_11F_11F_REV&&(Z=n.R11F_G11F_B10F)),w===n.RGBA){const Ne=ee?nl:tt.getTransfer(j);z===n.FLOAT&&(Z=n.RGBA32F),z===n.HALF_FLOAT&&(Z=n.RGBA16F),z===n.UNSIGNED_BYTE&&(Z=Ne===dt?n.SRGB8_ALPHA8:n.RGBA8),z===n.UNSIGNED_SHORT_4_4_4_4&&(Z=n.RGBA4),z===n.UNSIGNED_SHORT_5_5_5_1&&(Z=n.RGB5_A1)}return(Z===n.R16F||Z===n.R32F||Z===n.RG16F||Z===n.RG32F||Z===n.RGBA16F||Z===n.RGBA32F)&&e.get("EXT_color_buffer_float"),Z}function y(P,w){let z;return P?w===null||w===ba||w===pr?z=n.DEPTH24_STENCIL8:w===mi?z=n.DEPTH32F_STENCIL8:w===fr&&(z=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===ba||w===pr?z=n.DEPTH_COMPONENT24:w===mi?z=n.DEPTH_COMPONENT32F:w===fr&&(z=n.DEPTH_COMPONENT16),z}function C(P,w){return m(P)===!0||P.isFramebufferTexture&&P.minFilter!==$n&&P.minFilter!==Jn?Math.log2(Math.max(w.width,w.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?w.mipmaps.length:1}function M(P){const w=P.target;w.removeEventListener("dispose",M),A(w),w.isVideoTexture&&d.delete(w)}function T(P){const w=P.target;w.removeEventListener("dispose",T),b(w)}function A(P){const w=i.get(P);if(w.__webglInit===void 0)return;const z=P.source,j=h.get(z);if(j){const ee=j[w.__cacheKey];ee.usedTimes--,ee.usedTimes===0&&v(P),Object.keys(j).length===0&&h.delete(z)}i.remove(P)}function v(P){const w=i.get(P);n.deleteTexture(w.__webglTexture);const z=P.source,j=h.get(z);delete j[w.__cacheKey],r.memory.textures--}function b(P){const w=i.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),i.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let j=0;j<6;j++){if(Array.isArray(w.__webglFramebuffer[j]))for(let ee=0;ee<w.__webglFramebuffer[j].length;ee++)n.deleteFramebuffer(w.__webglFramebuffer[j][ee]);else n.deleteFramebuffer(w.__webglFramebuffer[j]);w.__webglDepthbuffer&&n.deleteRenderbuffer(w.__webglDepthbuffer[j])}else{if(Array.isArray(w.__webglFramebuffer))for(let j=0;j<w.__webglFramebuffer.length;j++)n.deleteFramebuffer(w.__webglFramebuffer[j]);else n.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&n.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&n.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let j=0;j<w.__webglColorRenderbuffer.length;j++)w.__webglColorRenderbuffer[j]&&n.deleteRenderbuffer(w.__webglColorRenderbuffer[j]);w.__webglDepthRenderbuffer&&n.deleteRenderbuffer(w.__webglDepthRenderbuffer)}const z=P.textures;for(let j=0,ee=z.length;j<ee;j++){const Z=i.get(z[j]);Z.__webglTexture&&(n.deleteTexture(Z.__webglTexture),r.memory.textures--),i.remove(z[j])}i.remove(P)}let R=0;function I(){R=0}function O(){const P=R;return P>=a.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+a.maxTextures),R+=1,P}function H(P){const w=[];return w.push(P.wrapS),w.push(P.wrapT),w.push(P.wrapR||0),w.push(P.magFilter),w.push(P.minFilter),w.push(P.anisotropy),w.push(P.internalFormat),w.push(P.format),w.push(P.type),w.push(P.generateMipmaps),w.push(P.premultiplyAlpha),w.push(P.flipY),w.push(P.unpackAlignment),w.push(P.colorSpace),w.join()}function V(P,w){const z=i.get(P);if(P.isVideoTexture&&Xe(P),P.isRenderTargetTexture===!1&&P.isExternalTexture!==!0&&P.version>0&&z.__version!==P.version){const j=P.image;if(j===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(j.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{k(z,P,w);return}}else P.isExternalTexture&&(z.__webglTexture=P.sourceTexture?P.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,z.__webglTexture,n.TEXTURE0+w)}function B(P,w){const z=i.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&z.__version!==P.version){k(z,P,w);return}t.bindTexture(n.TEXTURE_2D_ARRAY,z.__webglTexture,n.TEXTURE0+w)}function X(P,w){const z=i.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&z.__version!==P.version){k(z,P,w);return}t.bindTexture(n.TEXTURE_3D,z.__webglTexture,n.TEXTURE0+w)}function G(P,w){const z=i.get(P);if(P.version>0&&z.__version!==P.version){Y(z,P,w);return}t.bindTexture(n.TEXTURE_CUBE_MAP,z.__webglTexture,n.TEXTURE0+w)}const te={[vd]:n.REPEAT,[fa]:n.CLAMP_TO_EDGE,[yd]:n.MIRRORED_REPEAT},fe={[$n]:n.NEAREST,[ey]:n.NEAREST_MIPMAP_NEAREST,[Gr]:n.NEAREST_MIPMAP_LINEAR,[Jn]:n.LINEAR,[Jl]:n.LINEAR_MIPMAP_NEAREST,[pa]:n.LINEAR_MIPMAP_LINEAR},q={[ay]:n.NEVER,[dy]:n.ALWAYS,[sy]:n.LESS,[qm]:n.LEQUAL,[ry]:n.EQUAL,[cy]:n.GEQUAL,[oy]:n.GREATER,[ly]:n.NOTEQUAL};function ue(P,w){if(w.type===mi&&e.has("OES_texture_float_linear")===!1&&(w.magFilter===Jn||w.magFilter===Jl||w.magFilter===Gr||w.magFilter===pa||w.minFilter===Jn||w.minFilter===Jl||w.minFilter===Gr||w.minFilter===pa)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(P,n.TEXTURE_WRAP_S,te[w.wrapS]),n.texParameteri(P,n.TEXTURE_WRAP_T,te[w.wrapT]),(P===n.TEXTURE_3D||P===n.TEXTURE_2D_ARRAY)&&n.texParameteri(P,n.TEXTURE_WRAP_R,te[w.wrapR]),n.texParameteri(P,n.TEXTURE_MAG_FILTER,fe[w.magFilter]),n.texParameteri(P,n.TEXTURE_MIN_FILTER,fe[w.minFilter]),w.compareFunction&&(n.texParameteri(P,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(P,n.TEXTURE_COMPARE_FUNC,q[w.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===$n||w.minFilter!==Gr&&w.minFilter!==pa||w.type===mi&&e.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||i.get(w).__currentAnisotropy){const z=e.get("EXT_texture_filter_anisotropic");n.texParameterf(P,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,a.getMaxAnisotropy())),i.get(w).__currentAnisotropy=w.anisotropy}}}function Se(P,w){let z=!1;P.__webglInit===void 0&&(P.__webglInit=!0,w.addEventListener("dispose",M));const j=w.source;let ee=h.get(j);ee===void 0&&(ee={},h.set(j,ee));const Z=H(w);if(Z!==P.__cacheKey){ee[Z]===void 0&&(ee[Z]={texture:n.createTexture(),usedTimes:0},r.memory.textures++,z=!0),ee[Z].usedTimes++;const Ne=ee[P.__cacheKey];Ne!==void 0&&(ee[P.__cacheKey].usedTimes--,Ne.usedTimes===0&&v(w)),P.__cacheKey=Z,P.__webglTexture=ee[Z].texture}return z}function be(P,w,z){return Math.floor(Math.floor(P/z)/w)}function me(P,w,z,j){const Z=P.updateRanges;if(Z.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,w.width,w.height,z,j,w.data);else{Z.sort((re,_e)=>re.start-_e.start);let Ne=0;for(let re=1;re<Z.length;re++){const _e=Z[Ne],ke=Z[re],Le=_e.start+_e.count,pe=be(ke.start,w.width,4),$e=be(_e.start,w.width,4);ke.start<=Le+1&&pe===$e&&be(ke.start+ke.count-1,w.width,4)===pe?_e.count=Math.max(_e.count,ke.start+ke.count-_e.start):(++Ne,Z[Ne]=ke)}Z.length=Ne+1;const le=n.getParameter(n.UNPACK_ROW_LENGTH),Re=n.getParameter(n.UNPACK_SKIP_PIXELS),Pe=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,w.width);for(let re=0,_e=Z.length;re<_e;re++){const ke=Z[re],Le=Math.floor(ke.start/4),pe=Math.ceil(ke.count/4),$e=Le%w.width,D=Math.floor(Le/w.width),oe=pe,de=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,$e),n.pixelStorei(n.UNPACK_SKIP_ROWS,D),t.texSubImage2D(n.TEXTURE_2D,0,$e,D,oe,de,z,j,w.data)}P.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,le),n.pixelStorei(n.UNPACK_SKIP_PIXELS,Re),n.pixelStorei(n.UNPACK_SKIP_ROWS,Pe)}}function k(P,w,z){let j=n.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(j=n.TEXTURE_2D_ARRAY),w.isData3DTexture&&(j=n.TEXTURE_3D);const ee=Se(P,w),Z=w.source;t.bindTexture(j,P.__webglTexture,n.TEXTURE0+z);const Ne=i.get(Z);if(Z.version!==Ne.__version||ee===!0){t.activeTexture(n.TEXTURE0+z);const le=tt.getPrimaries(tt.workingColorSpace),Re=w.colorSpace===Di?null:tt.getPrimaries(w.colorSpace),Pe=w.colorSpace===Di||le===Re?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,w.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,w.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Pe);let re=_(w.image,!1,a.maxTextureSize);re=Ft(w,re);const _e=s.convert(w.format,w.colorSpace),ke=s.convert(w.type);let Le=x(w.internalFormat,_e,ke,w.colorSpace,w.isVideoTexture);ue(j,w);let pe;const $e=w.mipmaps,D=w.isVideoTexture!==!0,oe=Ne.__version===void 0||ee===!0,de=Z.dataReady,Ee=C(w,re);if(w.isDepthTexture)Le=y(w.format===gr,w.type),oe&&(D?t.texStorage2D(n.TEXTURE_2D,1,Le,re.width,re.height):t.texImage2D(n.TEXTURE_2D,0,Le,re.width,re.height,0,_e,ke,null));else if(w.isDataTexture)if($e.length>0){D&&oe&&t.texStorage2D(n.TEXTURE_2D,Ee,Le,$e[0].width,$e[0].height);for(let ae=0,J=$e.length;ae<J;ae++)pe=$e[ae],D?de&&t.texSubImage2D(n.TEXTURE_2D,ae,0,0,pe.width,pe.height,_e,ke,pe.data):t.texImage2D(n.TEXTURE_2D,ae,Le,pe.width,pe.height,0,_e,ke,pe.data);w.generateMipmaps=!1}else D?(oe&&t.texStorage2D(n.TEXTURE_2D,Ee,Le,re.width,re.height),de&&me(w,re,_e,ke)):t.texImage2D(n.TEXTURE_2D,0,Le,re.width,re.height,0,_e,ke,re.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){D&&oe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Ee,Le,$e[0].width,$e[0].height,re.depth);for(let ae=0,J=$e.length;ae<J;ae++)if(pe=$e[ae],w.format!==Gn)if(_e!==null)if(D){if(de)if(w.layerUpdates.size>0){const Te=Ef(pe.width,pe.height,w.format,w.type);for(const Ge of w.layerUpdates){const ft=pe.data.subarray(Ge*Te/pe.data.BYTES_PER_ELEMENT,(Ge+1)*Te/pe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ae,0,0,Ge,pe.width,pe.height,1,_e,ft)}w.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ae,0,0,0,pe.width,pe.height,re.depth,_e,pe.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ae,Le,pe.width,pe.height,re.depth,0,pe.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else D?de&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,ae,0,0,0,pe.width,pe.height,re.depth,_e,ke,pe.data):t.texImage3D(n.TEXTURE_2D_ARRAY,ae,Le,pe.width,pe.height,re.depth,0,_e,ke,pe.data)}else{D&&oe&&t.texStorage2D(n.TEXTURE_2D,Ee,Le,$e[0].width,$e[0].height);for(let ae=0,J=$e.length;ae<J;ae++)pe=$e[ae],w.format!==Gn?_e!==null?D?de&&t.compressedTexSubImage2D(n.TEXTURE_2D,ae,0,0,pe.width,pe.height,_e,pe.data):t.compressedTexImage2D(n.TEXTURE_2D,ae,Le,pe.width,pe.height,0,pe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):D?de&&t.texSubImage2D(n.TEXTURE_2D,ae,0,0,pe.width,pe.height,_e,ke,pe.data):t.texImage2D(n.TEXTURE_2D,ae,Le,pe.width,pe.height,0,_e,ke,pe.data)}else if(w.isDataArrayTexture)if(D){if(oe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Ee,Le,re.width,re.height,re.depth),de)if(w.layerUpdates.size>0){const ae=Ef(re.width,re.height,w.format,w.type);for(const J of w.layerUpdates){const Te=re.data.subarray(J*ae/re.data.BYTES_PER_ELEMENT,(J+1)*ae/re.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,J,re.width,re.height,1,_e,ke,Te)}w.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,re.width,re.height,re.depth,_e,ke,re.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Le,re.width,re.height,re.depth,0,_e,ke,re.data);else if(w.isData3DTexture)D?(oe&&t.texStorage3D(n.TEXTURE_3D,Ee,Le,re.width,re.height,re.depth),de&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,re.width,re.height,re.depth,_e,ke,re.data)):t.texImage3D(n.TEXTURE_3D,0,Le,re.width,re.height,re.depth,0,_e,ke,re.data);else if(w.isFramebufferTexture){if(oe)if(D)t.texStorage2D(n.TEXTURE_2D,Ee,Le,re.width,re.height);else{let ae=re.width,J=re.height;for(let Te=0;Te<Ee;Te++)t.texImage2D(n.TEXTURE_2D,Te,Le,ae,J,0,_e,ke,null),ae>>=1,J>>=1}}else if($e.length>0){if(D&&oe){const ae=Ct($e[0]);t.texStorage2D(n.TEXTURE_2D,Ee,Le,ae.width,ae.height)}for(let ae=0,J=$e.length;ae<J;ae++)pe=$e[ae],D?de&&t.texSubImage2D(n.TEXTURE_2D,ae,0,0,_e,ke,pe):t.texImage2D(n.TEXTURE_2D,ae,Le,_e,ke,pe);w.generateMipmaps=!1}else if(D){if(oe){const ae=Ct(re);t.texStorage2D(n.TEXTURE_2D,Ee,Le,ae.width,ae.height)}de&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,_e,ke,re)}else t.texImage2D(n.TEXTURE_2D,0,Le,_e,ke,re);m(w)&&p(j),Ne.__version=Z.version,w.onUpdate&&w.onUpdate(w)}P.__version=w.version}function Y(P,w,z){if(w.image.length!==6)return;const j=Se(P,w),ee=w.source;t.bindTexture(n.TEXTURE_CUBE_MAP,P.__webglTexture,n.TEXTURE0+z);const Z=i.get(ee);if(ee.version!==Z.__version||j===!0){t.activeTexture(n.TEXTURE0+z);const Ne=tt.getPrimaries(tt.workingColorSpace),le=w.colorSpace===Di?null:tt.getPrimaries(w.colorSpace),Re=w.colorSpace===Di||Ne===le?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,w.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,w.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Re);const Pe=w.isCompressedTexture||w.image[0].isCompressedTexture,re=w.image[0]&&w.image[0].isDataTexture,_e=[];for(let J=0;J<6;J++)!Pe&&!re?_e[J]=_(w.image[J],!0,a.maxCubemapSize):_e[J]=re?w.image[J].image:w.image[J],_e[J]=Ft(w,_e[J]);const ke=_e[0],Le=s.convert(w.format,w.colorSpace),pe=s.convert(w.type),$e=x(w.internalFormat,Le,pe,w.colorSpace),D=w.isVideoTexture!==!0,oe=Z.__version===void 0||j===!0,de=ee.dataReady;let Ee=C(w,ke);ue(n.TEXTURE_CUBE_MAP,w);let ae;if(Pe){D&&oe&&t.texStorage2D(n.TEXTURE_CUBE_MAP,Ee,$e,ke.width,ke.height);for(let J=0;J<6;J++){ae=_e[J].mipmaps;for(let Te=0;Te<ae.length;Te++){const Ge=ae[Te];w.format!==Gn?Le!==null?D?de&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,Te,0,0,Ge.width,Ge.height,Le,Ge.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,Te,$e,Ge.width,Ge.height,0,Ge.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):D?de&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,Te,0,0,Ge.width,Ge.height,Le,pe,Ge.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,Te,$e,Ge.width,Ge.height,0,Le,pe,Ge.data)}}}else{if(ae=w.mipmaps,D&&oe){ae.length>0&&Ee++;const J=Ct(_e[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,Ee,$e,J.width,J.height)}for(let J=0;J<6;J++)if(re){D?de&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,_e[J].width,_e[J].height,Le,pe,_e[J].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,$e,_e[J].width,_e[J].height,0,Le,pe,_e[J].data);for(let Te=0;Te<ae.length;Te++){const ft=ae[Te].image[J].image;D?de&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,Te+1,0,0,ft.width,ft.height,Le,pe,ft.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,Te+1,$e,ft.width,ft.height,0,Le,pe,ft.data)}}else{D?de&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,Le,pe,_e[J]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,$e,Le,pe,_e[J]);for(let Te=0;Te<ae.length;Te++){const Ge=ae[Te];D?de&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,Te+1,0,0,Le,pe,Ge.image[J]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,Te+1,$e,Le,pe,Ge.image[J])}}}m(w)&&p(n.TEXTURE_CUBE_MAP),Z.__version=ee.version,w.onUpdate&&w.onUpdate(w)}P.__version=w.version}function ie(P,w,z,j,ee,Z){const Ne=s.convert(z.format,z.colorSpace),le=s.convert(z.type),Re=x(z.internalFormat,Ne,le,z.colorSpace),Pe=i.get(w),re=i.get(z);if(re.__renderTarget=w,!Pe.__hasExternalTextures){const _e=Math.max(1,w.width>>Z),ke=Math.max(1,w.height>>Z);ee===n.TEXTURE_3D||ee===n.TEXTURE_2D_ARRAY?t.texImage3D(ee,Z,Re,_e,ke,w.depth,0,Ne,le,null):t.texImage2D(ee,Z,Re,_e,ke,0,Ne,le,null)}t.bindFramebuffer(n.FRAMEBUFFER,P),Ce(w)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,j,ee,re.__webglTexture,0,vt(w)):(ee===n.TEXTURE_2D||ee>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ee<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,j,ee,re.__webglTexture,Z),t.bindFramebuffer(n.FRAMEBUFFER,null)}function we(P,w,z){if(n.bindRenderbuffer(n.RENDERBUFFER,P),w.depthBuffer){const j=w.depthTexture,ee=j&&j.isDepthTexture?j.type:null,Z=y(w.stencilBuffer,ee),Ne=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,le=vt(w);Ce(w)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,le,Z,w.width,w.height):z?n.renderbufferStorageMultisample(n.RENDERBUFFER,le,Z,w.width,w.height):n.renderbufferStorage(n.RENDERBUFFER,Z,w.width,w.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Ne,n.RENDERBUFFER,P)}else{const j=w.textures;for(let ee=0;ee<j.length;ee++){const Z=j[ee],Ne=s.convert(Z.format,Z.colorSpace),le=s.convert(Z.type),Re=x(Z.internalFormat,Ne,le,Z.colorSpace),Pe=vt(w);z&&Ce(w)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Pe,Re,w.width,w.height):Ce(w)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Pe,Re,w.width,w.height):n.renderbufferStorage(n.RENDERBUFFER,Re,w.width,w.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function ye(P,w){if(w&&w.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,P),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const j=i.get(w.depthTexture);j.__renderTarget=w,(!j.__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),V(w.depthTexture,0);const ee=j.__webglTexture,Z=vt(w);if(w.depthTexture.format===mr)Ce(w)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ee,0,Z):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ee,0);else if(w.depthTexture.format===gr)Ce(w)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ee,0,Z):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ee,0);else throw new Error("Unknown depthTexture format")}function Fe(P){const w=i.get(P),z=P.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==P.depthTexture){const j=P.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),j){const ee=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,j.removeEventListener("dispose",ee)};j.addEventListener("dispose",ee),w.__depthDisposeCallback=ee}w.__boundDepthTexture=j}if(P.depthTexture&&!w.__autoAllocateDepthBuffer){if(z)throw new Error("target.depthTexture not supported in Cube render targets");const j=P.texture.mipmaps;j&&j.length>0?ye(w.__webglFramebuffer[0],P):ye(w.__webglFramebuffer,P)}else if(z){w.__webglDepthbuffer=[];for(let j=0;j<6;j++)if(t.bindFramebuffer(n.FRAMEBUFFER,w.__webglFramebuffer[j]),w.__webglDepthbuffer[j]===void 0)w.__webglDepthbuffer[j]=n.createRenderbuffer(),we(w.__webglDepthbuffer[j],P,!1);else{const ee=P.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Z=w.__webglDepthbuffer[j];n.bindRenderbuffer(n.RENDERBUFFER,Z),n.framebufferRenderbuffer(n.FRAMEBUFFER,ee,n.RENDERBUFFER,Z)}}else{const j=P.texture.mipmaps;if(j&&j.length>0?t.bindFramebuffer(n.FRAMEBUFFER,w.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=n.createRenderbuffer(),we(w.__webglDepthbuffer,P,!1);else{const ee=P.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Z=w.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,Z),n.framebufferRenderbuffer(n.FRAMEBUFFER,ee,n.RENDERBUFFER,Z)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function ot(P,w,z){const j=i.get(P);w!==void 0&&ie(j.__webglFramebuffer,P,P.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),z!==void 0&&Fe(P)}function N(P){const w=P.texture,z=i.get(P),j=i.get(w);P.addEventListener("dispose",T);const ee=P.textures,Z=P.isWebGLCubeRenderTarget===!0,Ne=ee.length>1;if(Ne||(j.__webglTexture===void 0&&(j.__webglTexture=n.createTexture()),j.__version=w.version,r.memory.textures++),Z){z.__webglFramebuffer=[];for(let le=0;le<6;le++)if(w.mipmaps&&w.mipmaps.length>0){z.__webglFramebuffer[le]=[];for(let Re=0;Re<w.mipmaps.length;Re++)z.__webglFramebuffer[le][Re]=n.createFramebuffer()}else z.__webglFramebuffer[le]=n.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){z.__webglFramebuffer=[];for(let le=0;le<w.mipmaps.length;le++)z.__webglFramebuffer[le]=n.createFramebuffer()}else z.__webglFramebuffer=n.createFramebuffer();if(Ne)for(let le=0,Re=ee.length;le<Re;le++){const Pe=i.get(ee[le]);Pe.__webglTexture===void 0&&(Pe.__webglTexture=n.createTexture(),r.memory.textures++)}if(P.samples>0&&Ce(P)===!1){z.__webglMultisampledFramebuffer=n.createFramebuffer(),z.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let le=0;le<ee.length;le++){const Re=ee[le];z.__webglColorRenderbuffer[le]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,z.__webglColorRenderbuffer[le]);const Pe=s.convert(Re.format,Re.colorSpace),re=s.convert(Re.type),_e=x(Re.internalFormat,Pe,re,Re.colorSpace,P.isXRRenderTarget===!0),ke=vt(P);n.renderbufferStorageMultisample(n.RENDERBUFFER,ke,_e,P.width,P.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+le,n.RENDERBUFFER,z.__webglColorRenderbuffer[le])}n.bindRenderbuffer(n.RENDERBUFFER,null),P.depthBuffer&&(z.__webglDepthRenderbuffer=n.createRenderbuffer(),we(z.__webglDepthRenderbuffer,P,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(Z){t.bindTexture(n.TEXTURE_CUBE_MAP,j.__webglTexture),ue(n.TEXTURE_CUBE_MAP,w);for(let le=0;le<6;le++)if(w.mipmaps&&w.mipmaps.length>0)for(let Re=0;Re<w.mipmaps.length;Re++)ie(z.__webglFramebuffer[le][Re],P,w,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+le,Re);else ie(z.__webglFramebuffer[le],P,w,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+le,0);m(w)&&p(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ne){for(let le=0,Re=ee.length;le<Re;le++){const Pe=ee[le],re=i.get(Pe);let _e=n.TEXTURE_2D;(P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(_e=P.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(_e,re.__webglTexture),ue(_e,Pe),ie(z.__webglFramebuffer,P,Pe,n.COLOR_ATTACHMENT0+le,_e,0),m(Pe)&&p(_e)}t.unbindTexture()}else{let le=n.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(le=P.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(le,j.__webglTexture),ue(le,w),w.mipmaps&&w.mipmaps.length>0)for(let Re=0;Re<w.mipmaps.length;Re++)ie(z.__webglFramebuffer[Re],P,w,n.COLOR_ATTACHMENT0,le,Re);else ie(z.__webglFramebuffer,P,w,n.COLOR_ATTACHMENT0,le,0);m(w)&&p(le),t.unbindTexture()}P.depthBuffer&&Fe(P)}function lt(P){const w=P.textures;for(let z=0,j=w.length;z<j;z++){const ee=w[z];if(m(ee)){const Z=S(P),Ne=i.get(ee).__webglTexture;t.bindTexture(Z,Ne),p(Z),t.unbindTexture()}}}const Ve=[],Oe=[];function Ae(P){if(P.samples>0){if(Ce(P)===!1){const w=P.textures,z=P.width,j=P.height;let ee=n.COLOR_BUFFER_BIT;const Z=P.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Ne=i.get(P),le=w.length>1;if(le)for(let Pe=0;Pe<w.length;Pe++)t.bindFramebuffer(n.FRAMEBUFFER,Ne.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Pe,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,Ne.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Pe,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,Ne.__webglMultisampledFramebuffer);const Re=P.texture.mipmaps;Re&&Re.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ne.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ne.__webglFramebuffer);for(let Pe=0;Pe<w.length;Pe++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(ee|=n.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(ee|=n.STENCIL_BUFFER_BIT)),le){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Ne.__webglColorRenderbuffer[Pe]);const re=i.get(w[Pe]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,re,0)}n.blitFramebuffer(0,0,z,j,0,0,z,j,ee,n.NEAREST),l===!0&&(Ve.length=0,Oe.length=0,Ve.push(n.COLOR_ATTACHMENT0+Pe),P.depthBuffer&&P.resolveDepthBuffer===!1&&(Ve.push(Z),Oe.push(Z),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Oe)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Ve))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),le)for(let Pe=0;Pe<w.length;Pe++){t.bindFramebuffer(n.FRAMEBUFFER,Ne.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Pe,n.RENDERBUFFER,Ne.__webglColorRenderbuffer[Pe]);const re=i.get(w[Pe]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,Ne.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Pe,n.TEXTURE_2D,re,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ne.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&l){const w=P.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[w])}}}function vt(P){return Math.min(a.maxSamples,P.samples)}function Ce(P){const w=i.get(P);return P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function Xe(P){const w=r.render.frame;d.get(P)!==w&&(d.set(P,w),P.update())}function Ft(P,w){const z=P.colorSpace,j=P.format,ee=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||z!==ps&&z!==Di&&(tt.getTransfer(z)===dt?(j!==Gn||ee!==ai)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",z)),w}function Ct(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(c.width=P.naturalWidth||P.width,c.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(c.width=P.displayWidth,c.height=P.displayHeight):(c.width=P.width,c.height=P.height),c}this.allocateTextureUnit=O,this.resetTextureUnits=I,this.setTexture2D=V,this.setTexture2DArray=B,this.setTexture3D=X,this.setTextureCube=G,this.rebindTextures=ot,this.setupRenderTarget=N,this.updateRenderTargetMipmap=lt,this.updateMultisampleRenderTarget=Ae,this.setupDepthRenderbuffer=Fe,this.setupFrameBufferTexture=ie,this.useMultisampledRTT=Ce}function vM(n,e){function t(i,a=Di){let s;const r=tt.getTransfer(a);if(i===ai)return n.UNSIGNED_BYTE;if(i===Vu)return n.UNSIGNED_SHORT_4_4_4_4;if(i===$u)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Hm)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Gm)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Bm)return n.BYTE;if(i===zm)return n.SHORT;if(i===fr)return n.UNSIGNED_SHORT;if(i===Gu)return n.INT;if(i===ba)return n.UNSIGNED_INT;if(i===mi)return n.FLOAT;if(i===Fr)return n.HALF_FLOAT;if(i===Vm)return n.ALPHA;if(i===$m)return n.RGB;if(i===Gn)return n.RGBA;if(i===mr)return n.DEPTH_COMPONENT;if(i===gr)return n.DEPTH_STENCIL;if(i===Wm)return n.RED;if(i===Wu)return n.RED_INTEGER;if(i===Xm)return n.RG;if(i===Xu)return n.RG_INTEGER;if(i===qu)return n.RGBA_INTEGER;if(i===No||i===Io||i===Do||i===Uo)if(r===dt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===No)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Io)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Do)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Uo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===No)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Io)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Do)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Uo)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===bd||i===xd||i===wd||i===Sd)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===bd)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===xd)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===wd)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Sd)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Ed||i===Md||i===Td)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Ed||i===Md)return r===dt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Td)return r===dt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Ad||i===Cd||i===Rd||i===Pd||i===Ld||i===Nd||i===Id||i===Dd||i===Ud||i===Fd||i===kd||i===Od||i===Bd||i===zd)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Ad)return r===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Cd)return r===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Rd)return r===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Pd)return r===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Ld)return r===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Nd)return r===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Id)return r===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Dd)return r===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Ud)return r===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Fd)return r===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===kd)return r===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Od)return r===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Bd)return r===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===zd)return r===dt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Hd||i===Gd||i===Vd)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===Hd)return r===dt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Gd)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Vd)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===$d||i===Wd||i===Xd||i===qd)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===$d)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Wd)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Xd)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===qd)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===pr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const yM=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,bM=`
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

}`;class xM{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new og(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new $i({vertexShader:yM,fragmentShader:bM,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new He(new ln(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class wM extends Ma{constructor(e,t){super();const i=this;let a=null,s=1,r=null,o="local-floor",l=1,c=null,d=null,u=null,h=null,f=null,g=null;const _=typeof XRWebGLBinding<"u",m=new xM,p={},S=t.getContextAttributes();let x=null,y=null;const C=[],M=[],T=new ce;let A=null;const v=new An;v.viewport=new At;const b=new An;b.viewport=new At;const R=[v,b],I=new Hb;let O=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(k){let Y=C[k];return Y===void 0&&(Y=new yc,C[k]=Y),Y.getTargetRaySpace()},this.getControllerGrip=function(k){let Y=C[k];return Y===void 0&&(Y=new yc,C[k]=Y),Y.getGripSpace()},this.getHand=function(k){let Y=C[k];return Y===void 0&&(Y=new yc,C[k]=Y),Y.getHandSpace()};function V(k){const Y=M.indexOf(k.inputSource);if(Y===-1)return;const ie=C[Y];ie!==void 0&&(ie.update(k.inputSource,k.frame,c||r),ie.dispatchEvent({type:k.type,data:k.inputSource}))}function B(){a.removeEventListener("select",V),a.removeEventListener("selectstart",V),a.removeEventListener("selectend",V),a.removeEventListener("squeeze",V),a.removeEventListener("squeezestart",V),a.removeEventListener("squeezeend",V),a.removeEventListener("end",B),a.removeEventListener("inputsourceschange",X);for(let k=0;k<C.length;k++){const Y=M[k];Y!==null&&(M[k]=null,C[k].disconnect(Y))}O=null,H=null,m.reset();for(const k in p)delete p[k];e.setRenderTarget(x),f=null,h=null,u=null,a=null,y=null,me.stop(),i.isPresenting=!1,e.setPixelRatio(A),e.setSize(T.width,T.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(k){s=k,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(k){o=k,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||r},this.setReferenceSpace=function(k){c=k},this.getBaseLayer=function(){return h!==null?h:f},this.getBinding=function(){return u===null&&_&&(u=new XRWebGLBinding(a,t)),u},this.getFrame=function(){return g},this.getSession=function(){return a},this.setSession=async function(k){if(a=k,a!==null){if(x=e.getRenderTarget(),a.addEventListener("select",V),a.addEventListener("selectstart",V),a.addEventListener("selectend",V),a.addEventListener("squeeze",V),a.addEventListener("squeezestart",V),a.addEventListener("squeezeend",V),a.addEventListener("end",B),a.addEventListener("inputsourceschange",X),S.xrCompatible!==!0&&await t.makeXRCompatible(),A=e.getPixelRatio(),e.getSize(T),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let ie=null,we=null,ye=null;S.depth&&(ye=S.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ie=S.stencil?gr:mr,we=S.stencil?pr:ba);const Fe={colorFormat:t.RGBA8,depthFormat:ye,scaleFactor:s};u=this.getBinding(),h=u.createProjectionLayer(Fe),a.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),y=new xa(h.textureWidth,h.textureHeight,{format:Gn,type:ai,depthTexture:new rg(h.textureWidth,h.textureHeight,we,void 0,void 0,void 0,void 0,void 0,void 0,ie),stencilBuffer:S.stencil,colorSpace:e.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{const ie={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(a,t,ie),a.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new xa(f.framebufferWidth,f.framebufferHeight,{format:Gn,type:ai,colorSpace:e.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,r=await a.requestReferenceSpace(o),me.setContext(a),me.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(a!==null)return a.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function X(k){for(let Y=0;Y<k.removed.length;Y++){const ie=k.removed[Y],we=M.indexOf(ie);we>=0&&(M[we]=null,C[we].disconnect(ie))}for(let Y=0;Y<k.added.length;Y++){const ie=k.added[Y];let we=M.indexOf(ie);if(we===-1){for(let Fe=0;Fe<C.length;Fe++)if(Fe>=M.length){M.push(ie),we=Fe;break}else if(M[Fe]===null){M[Fe]=ie,we=Fe;break}if(we===-1)break}const ye=C[we];ye&&ye.connect(ie)}}const G=new L,te=new L;function fe(k,Y,ie){G.setFromMatrixPosition(Y.matrixWorld),te.setFromMatrixPosition(ie.matrixWorld);const we=G.distanceTo(te),ye=Y.projectionMatrix.elements,Fe=ie.projectionMatrix.elements,ot=ye[14]/(ye[10]-1),N=ye[14]/(ye[10]+1),lt=(ye[9]+1)/ye[5],Ve=(ye[9]-1)/ye[5],Oe=(ye[8]-1)/ye[0],Ae=(Fe[8]+1)/Fe[0],vt=ot*Oe,Ce=ot*Ae,Xe=we/(-Oe+Ae),Ft=Xe*-Oe;if(Y.matrixWorld.decompose(k.position,k.quaternion,k.scale),k.translateX(Ft),k.translateZ(Xe),k.matrixWorld.compose(k.position,k.quaternion,k.scale),k.matrixWorldInverse.copy(k.matrixWorld).invert(),ye[10]===-1)k.projectionMatrix.copy(Y.projectionMatrix),k.projectionMatrixInverse.copy(Y.projectionMatrixInverse);else{const Ct=ot+Xe,P=N+Xe,w=vt-Ft,z=Ce+(we-Ft),j=lt*N/P*Ct,ee=Ve*N/P*Ct;k.projectionMatrix.makePerspective(w,z,j,ee,Ct,P),k.projectionMatrixInverse.copy(k.projectionMatrix).invert()}}function q(k,Y){Y===null?k.matrixWorld.copy(k.matrix):k.matrixWorld.multiplyMatrices(Y.matrixWorld,k.matrix),k.matrixWorldInverse.copy(k.matrixWorld).invert()}this.updateCamera=function(k){if(a===null)return;let Y=k.near,ie=k.far;m.texture!==null&&(m.depthNear>0&&(Y=m.depthNear),m.depthFar>0&&(ie=m.depthFar)),I.near=b.near=v.near=Y,I.far=b.far=v.far=ie,(O!==I.near||H!==I.far)&&(a.updateRenderState({depthNear:I.near,depthFar:I.far}),O=I.near,H=I.far),I.layers.mask=k.layers.mask|6,v.layers.mask=I.layers.mask&3,b.layers.mask=I.layers.mask&5;const we=k.parent,ye=I.cameras;q(I,we);for(let Fe=0;Fe<ye.length;Fe++)q(ye[Fe],we);ye.length===2?fe(I,v,b):I.projectionMatrix.copy(v.projectionMatrix),ue(k,I,we)};function ue(k,Y,ie){ie===null?k.matrix.copy(Y.matrixWorld):(k.matrix.copy(ie.matrixWorld),k.matrix.invert(),k.matrix.multiply(Y.matrixWorld)),k.matrix.decompose(k.position,k.quaternion,k.scale),k.updateMatrixWorld(!0),k.projectionMatrix.copy(Y.projectionMatrix),k.projectionMatrixInverse.copy(Y.projectionMatrixInverse),k.isPerspectiveCamera&&(k.fov=_r*2*Math.atan(1/k.projectionMatrix.elements[5]),k.zoom=1)}this.getCamera=function(){return I},this.getFoveation=function(){if(!(h===null&&f===null))return l},this.setFoveation=function(k){l=k,h!==null&&(h.fixedFoveation=k),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=k)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(I)},this.getCameraTexture=function(k){return p[k]};let Se=null;function be(k,Y){if(d=Y.getViewerPose(c||r),g=Y,d!==null){const ie=d.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let we=!1;ie.length!==I.cameras.length&&(I.cameras.length=0,we=!0);for(let N=0;N<ie.length;N++){const lt=ie[N];let Ve=null;if(f!==null)Ve=f.getViewport(lt);else{const Ae=u.getViewSubImage(h,lt);Ve=Ae.viewport,N===0&&(e.setRenderTargetTextures(y,Ae.colorTexture,Ae.depthStencilTexture),e.setRenderTarget(y))}let Oe=R[N];Oe===void 0&&(Oe=new An,Oe.layers.enable(N),Oe.viewport=new At,R[N]=Oe),Oe.matrix.fromArray(lt.transform.matrix),Oe.matrix.decompose(Oe.position,Oe.quaternion,Oe.scale),Oe.projectionMatrix.fromArray(lt.projectionMatrix),Oe.projectionMatrixInverse.copy(Oe.projectionMatrix).invert(),Oe.viewport.set(Ve.x,Ve.y,Ve.width,Ve.height),N===0&&(I.matrix.copy(Oe.matrix),I.matrix.decompose(I.position,I.quaternion,I.scale)),we===!0&&I.cameras.push(Oe)}const ye=a.enabledFeatures;if(ye&&ye.includes("depth-sensing")&&a.depthUsage=="gpu-optimized"&&_){u=i.getBinding();const N=u.getDepthInformation(ie[0]);N&&N.isValid&&N.texture&&m.init(N,a.renderState)}if(ye&&ye.includes("camera-access")&&_){e.state.unbindTexture(),u=i.getBinding();for(let N=0;N<ie.length;N++){const lt=ie[N].camera;if(lt){let Ve=p[lt];Ve||(Ve=new og,p[lt]=Ve);const Oe=u.getCameraImage(lt);Ve.sourceTexture=Oe}}}}for(let ie=0;ie<C.length;ie++){const we=M[ie],ye=C[ie];we!==null&&ye!==void 0&&ye.update(we,Y,c||r)}Se&&Se(k,Y),Y.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:Y}),g=null}const me=new yg;me.setAnimationLoop(be),this.setAnimationLoop=function(k){Se=k},this.dispose=function(){}}}const ia=new Xn,SM=new yt;function EM(n,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,eg(n)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function a(m,p,S,x,y){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(m,p):p.isMeshToonMaterial?(s(m,p),u(m,p)):p.isMeshPhongMaterial?(s(m,p),d(m,p)):p.isMeshStandardMaterial?(s(m,p),h(m,p),p.isMeshPhysicalMaterial&&f(m,p,y)):p.isMeshMatcapMaterial?(s(m,p),g(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),_(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(r(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,S,x):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===un&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===un&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const S=e.get(p),x=S.envMap,y=S.envMapRotation;x&&(m.envMap.value=x,ia.copy(y),ia.x*=-1,ia.y*=-1,ia.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(ia.y*=-1,ia.z*=-1),m.envMapRotation.value.setFromMatrix4(SM.makeRotationFromEuler(ia)),m.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function r(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,S,x){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*S,m.scale.value=x*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function d(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function h(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,S){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===un&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=S.texture,m.transmissionSamplerSize.value.set(S.width,S.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const S=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(S.matrixWorld),m.nearDistance.value=S.shadow.camera.near,m.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:a}}function MM(n,e,t,i){let a={},s={},r=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(S,x){const y=x.program;i.uniformBlockBinding(S,y)}function c(S,x){let y=a[S.id];y===void 0&&(g(S),y=d(S),a[S.id]=y,S.addEventListener("dispose",m));const C=x.program;i.updateUBOMapping(S,C);const M=e.render.frame;s[S.id]!==M&&(h(S),s[S.id]=M)}function d(S){const x=u();S.__bindingPointIndex=x;const y=n.createBuffer(),C=S.__size,M=S.usage;return n.bindBuffer(n.UNIFORM_BUFFER,y),n.bufferData(n.UNIFORM_BUFFER,C,M),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,x,y),y}function u(){for(let S=0;S<o;S++)if(r.indexOf(S)===-1)return r.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(S){const x=a[S.id],y=S.uniforms,C=S.__cache;n.bindBuffer(n.UNIFORM_BUFFER,x);for(let M=0,T=y.length;M<T;M++){const A=Array.isArray(y[M])?y[M]:[y[M]];for(let v=0,b=A.length;v<b;v++){const R=A[v];if(f(R,M,v,C)===!0){const I=R.__offset,O=Array.isArray(R.value)?R.value:[R.value];let H=0;for(let V=0;V<O.length;V++){const B=O[V],X=_(B);typeof B=="number"||typeof B=="boolean"?(R.__data[0]=B,n.bufferSubData(n.UNIFORM_BUFFER,I+H,R.__data)):B.isMatrix3?(R.__data[0]=B.elements[0],R.__data[1]=B.elements[1],R.__data[2]=B.elements[2],R.__data[3]=0,R.__data[4]=B.elements[3],R.__data[5]=B.elements[4],R.__data[6]=B.elements[5],R.__data[7]=0,R.__data[8]=B.elements[6],R.__data[9]=B.elements[7],R.__data[10]=B.elements[8],R.__data[11]=0):(B.toArray(R.__data,H),H+=X.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,I,R.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function f(S,x,y,C){const M=S.value,T=x+"_"+y;if(C[T]===void 0)return typeof M=="number"||typeof M=="boolean"?C[T]=M:C[T]=M.clone(),!0;{const A=C[T];if(typeof M=="number"||typeof M=="boolean"){if(A!==M)return C[T]=M,!0}else if(A.equals(M)===!1)return A.copy(M),!0}return!1}function g(S){const x=S.uniforms;let y=0;const C=16;for(let T=0,A=x.length;T<A;T++){const v=Array.isArray(x[T])?x[T]:[x[T]];for(let b=0,R=v.length;b<R;b++){const I=v[b],O=Array.isArray(I.value)?I.value:[I.value];for(let H=0,V=O.length;H<V;H++){const B=O[H],X=_(B),G=y%C,te=G%X.boundary,fe=G+te;y+=te,fe!==0&&C-fe<X.storage&&(y+=C-fe),I.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),I.__offset=y,y+=X.storage}}}const M=y%C;return M>0&&(y+=C-M),S.__size=y,S.__cache={},this}function _(S){const x={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(x.boundary=4,x.storage=4):S.isVector2?(x.boundary=8,x.storage=8):S.isVector3||S.isColor?(x.boundary=16,x.storage=12):S.isVector4?(x.boundary=16,x.storage=16):S.isMatrix3?(x.boundary=48,x.storage=48):S.isMatrix4?(x.boundary=64,x.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),x}function m(S){const x=S.target;x.removeEventListener("dispose",m);const y=r.indexOf(x.__bindingPointIndex);r.splice(y,1),n.deleteBuffer(a[x.id]),delete a[x.id],delete s[x.id]}function p(){for(const S in a)n.deleteBuffer(a[S]);r=[],a={},s={}}return{bind:l,update:c,dispose:p}}class TM{constructor(e={}){const{canvas:t=Ay(),context:i=null,depth:a=!0,stencil:s=!1,alpha:r=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:h=!1}=e;this.isWebGLRenderer=!0;let f;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=i.getContextAttributes().alpha}else f=r;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,p=null;const S=[],x=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Oi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const y=this;let C=!1;this._outputColorSpace=Yt;let M=0,T=0,A=null,v=-1,b=null;const R=new At,I=new At;let O=null;const H=new Ke(0);let V=0,B=t.width,X=t.height,G=1,te=null,fe=null;const q=new At(0,0,B,X),ue=new At(0,0,B,X);let Se=!1;const be=new Ju;let me=!1,k=!1;const Y=new yt,ie=new L,we=new At,ye={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Fe=!1;function ot(){return A===null?G:1}let N=i;function lt(E,U){return t.getContext(E,U)}try{const E={alpha:!0,depth:a,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Hu}`),t.addEventListener("webglcontextlost",de,!1),t.addEventListener("webglcontextrestored",Ee,!1),t.addEventListener("webglcontextcreationerror",ae,!1),N===null){const U="webgl2";if(N=lt(U,E),N===null)throw lt(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let Ve,Oe,Ae,vt,Ce,Xe,Ft,Ct,P,w,z,j,ee,Z,Ne,le,Re,Pe,re,_e,ke,Le,pe,$e;function D(){Ve=new FS(N),Ve.init(),Le=new vM(N,Ve),Oe=new RS(N,Ve,e,Le),Ae=new gM(N,Ve),Oe.reversedDepthBuffer&&h&&Ae.buffers.depth.setReversed(!0),vt=new BS(N),Ce=new iM,Xe=new _M(N,Ve,Ae,Ce,Oe,Le,vt),Ft=new LS(y),Ct=new US(y),P=new Wb(N),pe=new AS(N,P),w=new kS(N,P,vt,pe),z=new HS(N,w,P,vt),re=new zS(N,Oe,Xe),le=new PS(Ce),j=new nM(y,Ft,Ct,Ve,Oe,pe,le),ee=new EM(y,Ce),Z=new sM,Ne=new uM(Ve),Pe=new TS(y,Ft,Ct,Ae,z,f,l),Re=new pM(y,z,Oe),$e=new MM(N,vt,Oe,Ae),_e=new CS(N,Ve,vt),ke=new OS(N,Ve,vt),vt.programs=j.programs,y.capabilities=Oe,y.extensions=Ve,y.properties=Ce,y.renderLists=Z,y.shadowMap=Re,y.state=Ae,y.info=vt}D();const oe=new wM(y,N);this.xr=oe,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const E=Ve.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=Ve.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(E){E!==void 0&&(G=E,this.setSize(B,X,!1))},this.getSize=function(E){return E.set(B,X)},this.setSize=function(E,U,$=!0){if(oe.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}B=E,X=U,t.width=Math.floor(E*G),t.height=Math.floor(U*G),$===!0&&(t.style.width=E+"px",t.style.height=U+"px"),this.setViewport(0,0,E,U)},this.getDrawingBufferSize=function(E){return E.set(B*G,X*G).floor()},this.setDrawingBufferSize=function(E,U,$){B=E,X=U,G=$,t.width=Math.floor(E*$),t.height=Math.floor(U*$),this.setViewport(0,0,E,U)},this.getCurrentViewport=function(E){return E.copy(R)},this.getViewport=function(E){return E.copy(q)},this.setViewport=function(E,U,$,W){E.isVector4?q.set(E.x,E.y,E.z,E.w):q.set(E,U,$,W),Ae.viewport(R.copy(q).multiplyScalar(G).round())},this.getScissor=function(E){return E.copy(ue)},this.setScissor=function(E,U,$,W){E.isVector4?ue.set(E.x,E.y,E.z,E.w):ue.set(E,U,$,W),Ae.scissor(I.copy(ue).multiplyScalar(G).round())},this.getScissorTest=function(){return Se},this.setScissorTest=function(E){Ae.setScissorTest(Se=E)},this.setOpaqueSort=function(E){te=E},this.setTransparentSort=function(E){fe=E},this.getClearColor=function(E){return E.copy(Pe.getClearColor())},this.setClearColor=function(){Pe.setClearColor(...arguments)},this.getClearAlpha=function(){return Pe.getClearAlpha()},this.setClearAlpha=function(){Pe.setClearAlpha(...arguments)},this.clear=function(E=!0,U=!0,$=!0){let W=0;if(E){let F=!1;if(A!==null){const se=A.texture.format;F=se===qu||se===Xu||se===Wu}if(F){const se=A.texture.type,ge=se===ai||se===ba||se===fr||se===pr||se===Vu||se===$u,Me=Pe.getClearColor(),xe=Pe.getClearAlpha(),Ue=Me.r,Be=Me.g,Ie=Me.b;ge?(g[0]=Ue,g[1]=Be,g[2]=Ie,g[3]=xe,N.clearBufferuiv(N.COLOR,0,g)):(_[0]=Ue,_[1]=Be,_[2]=Ie,_[3]=xe,N.clearBufferiv(N.COLOR,0,_))}else W|=N.COLOR_BUFFER_BIT}U&&(W|=N.DEPTH_BUFFER_BIT),$&&(W|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),N.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",de,!1),t.removeEventListener("webglcontextrestored",Ee,!1),t.removeEventListener("webglcontextcreationerror",ae,!1),Pe.dispose(),Z.dispose(),Ne.dispose(),Ce.dispose(),Ft.dispose(),Ct.dispose(),z.dispose(),pe.dispose(),$e.dispose(),j.dispose(),oe.dispose(),oe.removeEventListener("sessionstart",qn),oe.removeEventListener("sessionend",Ih),Ki.stop()};function de(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function Ee(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;const E=vt.autoReset,U=Re.enabled,$=Re.autoUpdate,W=Re.needsUpdate,F=Re.type;D(),vt.autoReset=E,Re.enabled=U,Re.autoUpdate=$,Re.needsUpdate=W,Re.type=F}function ae(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function J(E){const U=E.target;U.removeEventListener("dispose",J),Te(U)}function Te(E){Ge(E),Ce.remove(E)}function Ge(E){const U=Ce.get(E).programs;U!==void 0&&(U.forEach(function($){j.releaseProgram($)}),E.isShaderMaterial&&j.releaseShaderCache(E))}this.renderBufferDirect=function(E,U,$,W,F,se){U===null&&(U=ye);const ge=F.isMesh&&F.matrixWorld.determinant()<0,Me=v0(E,U,$,W,F);Ae.setMaterial(W,ge);let xe=$.index,Ue=1;if(W.wireframe===!0){if(xe=w.getWireframeAttribute($),xe===void 0)return;Ue=2}const Be=$.drawRange,Ie=$.attributes.position;let Je=Be.start*Ue,ct=(Be.start+Be.count)*Ue;se!==null&&(Je=Math.max(Je,se.start*Ue),ct=Math.min(ct,(se.start+se.count)*Ue)),xe!==null?(Je=Math.max(Je,0),ct=Math.min(ct,xe.count)):Ie!=null&&(Je=Math.max(Je,0),ct=Math.min(ct,Ie.count));const Tt=ct-Je;if(Tt<0||Tt===1/0)return;pe.setup(F,W,Me,$,xe);let pt,ht=_e;if(xe!==null&&(pt=P.get(xe),ht=ke,ht.setIndex(pt)),F.isMesh)W.wireframe===!0?(Ae.setLineWidth(W.wireframeLinewidth*ot()),ht.setMode(N.LINES)):ht.setMode(N.TRIANGLES);else if(F.isLine){let De=W.linewidth;De===void 0&&(De=1),Ae.setLineWidth(De*ot()),F.isLineSegments?ht.setMode(N.LINES):F.isLineLoop?ht.setMode(N.LINE_LOOP):ht.setMode(N.LINE_STRIP)}else F.isPoints?ht.setMode(N.POINTS):F.isSprite&&ht.setMode(N.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)vr("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ht.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if(Ve.get("WEBGL_multi_draw"))ht.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{const De=F._multiDrawStarts,bt=F._multiDrawCounts,et=F._multiDrawCount,fn=xe?P.get(xe).bytesPerElement:1,Ra=Ce.get(W).currentProgram.getUniforms();for(let pn=0;pn<et;pn++)Ra.setValue(N,"_gl_DrawID",pn),ht.render(De[pn]/fn,bt[pn])}else if(F.isInstancedMesh)ht.renderInstances(Je,Tt,F.count);else if($.isInstancedBufferGeometry){const De=$._maxInstanceCount!==void 0?$._maxInstanceCount:1/0,bt=Math.min($.instanceCount,De);ht.renderInstances(Je,Tt,bt)}else ht.render(Je,Tt)};function ft(E,U,$){E.transparent===!0&&E.side===Qe&&E.forceSinglePass===!1?(E.side=un,E.needsUpdate=!0,Hr(E,U,$),E.side=Gi,E.needsUpdate=!0,Hr(E,U,$),E.side=Qe):Hr(E,U,$)}this.compile=function(E,U,$=null){$===null&&($=E),p=Ne.get($),p.init(U),x.push(p),$.traverseVisible(function(F){F.isLight&&F.layers.test(U.layers)&&(p.pushLight(F),F.castShadow&&p.pushShadow(F))}),E!==$&&E.traverseVisible(function(F){F.isLight&&F.layers.test(U.layers)&&(p.pushLight(F),F.castShadow&&p.pushShadow(F))}),p.setupLights();const W=new Set;return E.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;const se=F.material;if(se)if(Array.isArray(se))for(let ge=0;ge<se.length;ge++){const Me=se[ge];ft(Me,$,F),W.add(Me)}else ft(se,$,F),W.add(se)}),p=x.pop(),W},this.compileAsync=function(E,U,$=null){const W=this.compile(E,U,$);return new Promise(F=>{function se(){if(W.forEach(function(ge){Ce.get(ge).currentProgram.isReady()&&W.delete(ge)}),W.size===0){F(E);return}setTimeout(se,10)}Ve.get("KHR_parallel_shader_compile")!==null?se():setTimeout(se,10)})};let nt=null;function oi(E){nt&&nt(E)}function qn(){Ki.stop()}function Ih(){Ki.start()}const Ki=new yg;Ki.setAnimationLoop(oi),typeof self<"u"&&Ki.setContext(self),this.setAnimationLoop=function(E){nt=E,oe.setAnimationLoop(E),E===null?Ki.stop():Ki.start()},oe.addEventListener("sessionstart",qn),oe.addEventListener("sessionend",Ih),this.render=function(E,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),oe.enabled===!0&&oe.isPresenting===!0&&(oe.cameraAutoUpdate===!0&&oe.updateCamera(U),U=oe.getCamera()),E.isScene===!0&&E.onBeforeRender(y,E,U,A),p=Ne.get(E,x.length),p.init(U),x.push(p),Y.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),be.setFromProjectionMatrix(Y,Qn,U.reversedDepth),k=this.localClippingEnabled,me=le.init(this.clippingPlanes,k),m=Z.get(E,S.length),m.init(),S.push(m),oe.enabled===!0&&oe.isPresenting===!0){const se=y.xr.getDepthSensingMesh();se!==null&&Kl(se,U,-1/0,y.sortObjects)}Kl(E,U,0,y.sortObjects),m.finish(),y.sortObjects===!0&&m.sort(te,fe),Fe=oe.enabled===!1||oe.isPresenting===!1||oe.hasDepthSensing()===!1,Fe&&Pe.addToRenderList(m,E),this.info.render.frame++,me===!0&&le.beginShadows();const $=p.state.shadowsArray;Re.render($,E,U),me===!0&&le.endShadows(),this.info.autoReset===!0&&this.info.reset();const W=m.opaque,F=m.transmissive;if(p.setupLights(),U.isArrayCamera){const se=U.cameras;if(F.length>0)for(let ge=0,Me=se.length;ge<Me;ge++){const xe=se[ge];Uh(W,F,E,xe)}Fe&&Pe.render(E);for(let ge=0,Me=se.length;ge<Me;ge++){const xe=se[ge];Dh(m,E,xe,xe.viewport)}}else F.length>0&&Uh(W,F,E,U),Fe&&Pe.render(E),Dh(m,E,U);A!==null&&T===0&&(Xe.updateMultisampleRenderTarget(A),Xe.updateRenderTargetMipmap(A)),E.isScene===!0&&E.onAfterRender(y,E,U),pe.resetDefaultState(),v=-1,b=null,x.pop(),x.length>0?(p=x[x.length-1],me===!0&&le.setGlobalState(y.clippingPlanes,p.state.camera)):p=null,S.pop(),S.length>0?m=S[S.length-1]:m=null};function Kl(E,U,$,W){if(E.visible===!1)return;if(E.layers.test(U.layers)){if(E.isGroup)$=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(U);else if(E.isLight)p.pushLight(E),E.castShadow&&p.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||be.intersectsSprite(E)){W&&we.setFromMatrixPosition(E.matrixWorld).applyMatrix4(Y);const ge=z.update(E),Me=E.material;Me.visible&&m.push(E,ge,Me,$,we.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||be.intersectsObject(E))){const ge=z.update(E),Me=E.material;if(W&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),we.copy(E.boundingSphere.center)):(ge.boundingSphere===null&&ge.computeBoundingSphere(),we.copy(ge.boundingSphere.center)),we.applyMatrix4(E.matrixWorld).applyMatrix4(Y)),Array.isArray(Me)){const xe=ge.groups;for(let Ue=0,Be=xe.length;Ue<Be;Ue++){const Ie=xe[Ue],Je=Me[Ie.materialIndex];Je&&Je.visible&&m.push(E,ge,Je,$,we.z,Ie)}}else Me.visible&&m.push(E,ge,Me,$,we.z,null)}}const se=E.children;for(let ge=0,Me=se.length;ge<Me;ge++)Kl(se[ge],U,$,W)}function Dh(E,U,$,W){const F=E.opaque,se=E.transmissive,ge=E.transparent;p.setupLightsView($),me===!0&&le.setGlobalState(y.clippingPlanes,$),W&&Ae.viewport(R.copy(W)),F.length>0&&zr(F,U,$),se.length>0&&zr(se,U,$),ge.length>0&&zr(ge,U,$),Ae.buffers.depth.setTest(!0),Ae.buffers.depth.setMask(!0),Ae.buffers.color.setMask(!0),Ae.setPolygonOffset(!1)}function Uh(E,U,$,W){if(($.isScene===!0?$.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[W.id]===void 0&&(p.state.transmissionRenderTarget[W.id]=new xa(1,1,{generateMipmaps:!0,type:Ve.has("EXT_color_buffer_half_float")||Ve.has("EXT_color_buffer_float")?Fr:ai,minFilter:pa,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:tt.workingColorSpace}));const se=p.state.transmissionRenderTarget[W.id],ge=W.viewport||R;se.setSize(ge.z*y.transmissionResolutionScale,ge.w*y.transmissionResolutionScale);const Me=y.getRenderTarget(),xe=y.getActiveCubeFace(),Ue=y.getActiveMipmapLevel();y.setRenderTarget(se),y.getClearColor(H),V=y.getClearAlpha(),V<1&&y.setClearColor(16777215,.5),y.clear(),Fe&&Pe.render($);const Be=y.toneMapping;y.toneMapping=Oi;const Ie=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),p.setupLightsView(W),me===!0&&le.setGlobalState(y.clippingPlanes,W),zr(E,$,W),Xe.updateMultisampleRenderTarget(se),Xe.updateRenderTargetMipmap(se),Ve.has("WEBGL_multisampled_render_to_texture")===!1){let Je=!1;for(let ct=0,Tt=U.length;ct<Tt;ct++){const pt=U[ct],ht=pt.object,De=pt.geometry,bt=pt.material,et=pt.group;if(bt.side===Qe&&ht.layers.test(W.layers)){const fn=bt.side;bt.side=un,bt.needsUpdate=!0,Fh(ht,$,W,De,bt,et),bt.side=fn,bt.needsUpdate=!0,Je=!0}}Je===!0&&(Xe.updateMultisampleRenderTarget(se),Xe.updateRenderTargetMipmap(se))}y.setRenderTarget(Me,xe,Ue),y.setClearColor(H,V),Ie!==void 0&&(W.viewport=Ie),y.toneMapping=Be}function zr(E,U,$){const W=U.isScene===!0?U.overrideMaterial:null;for(let F=0,se=E.length;F<se;F++){const ge=E[F],Me=ge.object,xe=ge.geometry,Ue=ge.group;let Be=ge.material;Be.allowOverride===!0&&W!==null&&(Be=W),Me.layers.test($.layers)&&Fh(Me,U,$,xe,Be,Ue)}}function Fh(E,U,$,W,F,se){E.onBeforeRender(y,U,$,W,F,se),E.modelViewMatrix.multiplyMatrices($.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),F.onBeforeRender(y,U,$,W,E,se),F.transparent===!0&&F.side===Qe&&F.forceSinglePass===!1?(F.side=un,F.needsUpdate=!0,y.renderBufferDirect($,U,W,F,E,se),F.side=Gi,F.needsUpdate=!0,y.renderBufferDirect($,U,W,F,E,se),F.side=Qe):y.renderBufferDirect($,U,W,F,E,se),E.onAfterRender(y,U,$,W,F,se)}function Hr(E,U,$){U.isScene!==!0&&(U=ye);const W=Ce.get(E),F=p.state.lights,se=p.state.shadowsArray,ge=F.state.version,Me=j.getParameters(E,F.state,se,U,$),xe=j.getProgramCacheKey(Me);let Ue=W.programs;W.environment=E.isMeshStandardMaterial?U.environment:null,W.fog=U.fog,W.envMap=(E.isMeshStandardMaterial?Ct:Ft).get(E.envMap||W.environment),W.envMapRotation=W.environment!==null&&E.envMap===null?U.environmentRotation:E.envMapRotation,Ue===void 0&&(E.addEventListener("dispose",J),Ue=new Map,W.programs=Ue);let Be=Ue.get(xe);if(Be!==void 0){if(W.currentProgram===Be&&W.lightsStateVersion===ge)return Oh(E,Me),Be}else Me.uniforms=j.getUniforms(E),E.onBeforeCompile(Me,y),Be=j.acquireProgram(Me,xe),Ue.set(xe,Be),W.uniforms=Me.uniforms;const Ie=W.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Ie.clippingPlanes=le.uniform),Oh(E,Me),W.needsLights=b0(E),W.lightsStateVersion=ge,W.needsLights&&(Ie.ambientLightColor.value=F.state.ambient,Ie.lightProbe.value=F.state.probe,Ie.directionalLights.value=F.state.directional,Ie.directionalLightShadows.value=F.state.directionalShadow,Ie.spotLights.value=F.state.spot,Ie.spotLightShadows.value=F.state.spotShadow,Ie.rectAreaLights.value=F.state.rectArea,Ie.ltc_1.value=F.state.rectAreaLTC1,Ie.ltc_2.value=F.state.rectAreaLTC2,Ie.pointLights.value=F.state.point,Ie.pointLightShadows.value=F.state.pointShadow,Ie.hemisphereLights.value=F.state.hemi,Ie.directionalShadowMap.value=F.state.directionalShadowMap,Ie.directionalShadowMatrix.value=F.state.directionalShadowMatrix,Ie.spotShadowMap.value=F.state.spotShadowMap,Ie.spotLightMatrix.value=F.state.spotLightMatrix,Ie.spotLightMap.value=F.state.spotLightMap,Ie.pointShadowMap.value=F.state.pointShadowMap,Ie.pointShadowMatrix.value=F.state.pointShadowMatrix),W.currentProgram=Be,W.uniformsList=null,Be}function kh(E){if(E.uniformsList===null){const U=E.currentProgram.getUniforms();E.uniformsList=Fo.seqWithValue(U.seq,E.uniforms)}return E.uniformsList}function Oh(E,U){const $=Ce.get(E);$.outputColorSpace=U.outputColorSpace,$.batching=U.batching,$.batchingColor=U.batchingColor,$.instancing=U.instancing,$.instancingColor=U.instancingColor,$.instancingMorph=U.instancingMorph,$.skinning=U.skinning,$.morphTargets=U.morphTargets,$.morphNormals=U.morphNormals,$.morphColors=U.morphColors,$.morphTargetsCount=U.morphTargetsCount,$.numClippingPlanes=U.numClippingPlanes,$.numIntersection=U.numClipIntersection,$.vertexAlphas=U.vertexAlphas,$.vertexTangents=U.vertexTangents,$.toneMapping=U.toneMapping}function v0(E,U,$,W,F){U.isScene!==!0&&(U=ye),Xe.resetTextureUnits();const se=U.fog,ge=W.isMeshStandardMaterial?U.environment:null,Me=A===null?y.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:ps,xe=(W.isMeshStandardMaterial?Ct:Ft).get(W.envMap||ge),Ue=W.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,Be=!!$.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),Ie=!!$.morphAttributes.position,Je=!!$.morphAttributes.normal,ct=!!$.morphAttributes.color;let Tt=Oi;W.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(Tt=y.toneMapping);const pt=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,ht=pt!==void 0?pt.length:0,De=Ce.get(W),bt=p.state.lights;if(me===!0&&(k===!0||E!==b)){const Kt=E===b&&W.id===v;le.setState(W,E,Kt)}let et=!1;W.version===De.__version?(De.needsLights&&De.lightsStateVersion!==bt.state.version||De.outputColorSpace!==Me||F.isBatchedMesh&&De.batching===!1||!F.isBatchedMesh&&De.batching===!0||F.isBatchedMesh&&De.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&De.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&De.instancing===!1||!F.isInstancedMesh&&De.instancing===!0||F.isSkinnedMesh&&De.skinning===!1||!F.isSkinnedMesh&&De.skinning===!0||F.isInstancedMesh&&De.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&De.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&De.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&De.instancingMorph===!1&&F.morphTexture!==null||De.envMap!==xe||W.fog===!0&&De.fog!==se||De.numClippingPlanes!==void 0&&(De.numClippingPlanes!==le.numPlanes||De.numIntersection!==le.numIntersection)||De.vertexAlphas!==Ue||De.vertexTangents!==Be||De.morphTargets!==Ie||De.morphNormals!==Je||De.morphColors!==ct||De.toneMapping!==Tt||De.morphTargetsCount!==ht)&&(et=!0):(et=!0,De.__version=W.version);let fn=De.currentProgram;et===!0&&(fn=Hr(W,U,F));let Ra=!1,pn=!1,Ns=!1;const xt=fn.getUniforms(),Sn=De.uniforms;if(Ae.useProgram(fn.program)&&(Ra=!0,pn=!0,Ns=!0),W.id!==v&&(v=W.id,pn=!0),Ra||b!==E){Ae.buffers.depth.getReversed()&&E.reversedDepth!==!0&&(E._reversedDepth=!0,E.updateProjectionMatrix()),xt.setValue(N,"projectionMatrix",E.projectionMatrix),xt.setValue(N,"viewMatrix",E.matrixWorldInverse);const tn=xt.map.cameraPosition;tn!==void 0&&tn.setValue(N,ie.setFromMatrixPosition(E.matrixWorld)),Oe.logarithmicDepthBuffer&&xt.setValue(N,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&xt.setValue(N,"isOrthographic",E.isOrthographicCamera===!0),b!==E&&(b=E,pn=!0,Ns=!0)}if(F.isSkinnedMesh){xt.setOptional(N,F,"bindMatrix"),xt.setOptional(N,F,"bindMatrixInverse");const Kt=F.skeleton;Kt&&(Kt.boneTexture===null&&Kt.computeBoneTexture(),xt.setValue(N,"boneTexture",Kt.boneTexture,Xe))}F.isBatchedMesh&&(xt.setOptional(N,F,"batchingTexture"),xt.setValue(N,"batchingTexture",F._matricesTexture,Xe),xt.setOptional(N,F,"batchingIdTexture"),xt.setValue(N,"batchingIdTexture",F._indirectTexture,Xe),xt.setOptional(N,F,"batchingColorTexture"),F._colorsTexture!==null&&xt.setValue(N,"batchingColorTexture",F._colorsTexture,Xe));const En=$.morphAttributes;if((En.position!==void 0||En.normal!==void 0||En.color!==void 0)&&re.update(F,$,fn),(pn||De.receiveShadow!==F.receiveShadow)&&(De.receiveShadow=F.receiveShadow,xt.setValue(N,"receiveShadow",F.receiveShadow)),W.isMeshGouraudMaterial&&W.envMap!==null&&(Sn.envMap.value=xe,Sn.flipEnvMap.value=xe.isCubeTexture&&xe.isRenderTargetTexture===!1?-1:1),W.isMeshStandardMaterial&&W.envMap===null&&U.environment!==null&&(Sn.envMapIntensity.value=U.environmentIntensity),pn&&(xt.setValue(N,"toneMappingExposure",y.toneMappingExposure),De.needsLights&&y0(Sn,Ns),se&&W.fog===!0&&ee.refreshFogUniforms(Sn,se),ee.refreshMaterialUniforms(Sn,W,G,X,p.state.transmissionRenderTarget[E.id]),Fo.upload(N,kh(De),Sn,Xe)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(Fo.upload(N,kh(De),Sn,Xe),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&xt.setValue(N,"center",F.center),xt.setValue(N,"modelViewMatrix",F.modelViewMatrix),xt.setValue(N,"normalMatrix",F.normalMatrix),xt.setValue(N,"modelMatrix",F.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){const Kt=W.uniformsGroups;for(let tn=0,jl=Kt.length;tn<jl;tn++){const ji=Kt[tn];$e.update(ji,fn),$e.bind(ji,fn)}}return fn}function y0(E,U){E.ambientLightColor.needsUpdate=U,E.lightProbe.needsUpdate=U,E.directionalLights.needsUpdate=U,E.directionalLightShadows.needsUpdate=U,E.pointLights.needsUpdate=U,E.pointLightShadows.needsUpdate=U,E.spotLights.needsUpdate=U,E.spotLightShadows.needsUpdate=U,E.rectAreaLights.needsUpdate=U,E.hemisphereLights.needsUpdate=U}function b0(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return M},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(E,U,$){const W=Ce.get(E);W.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,W.__autoAllocateDepthBuffer===!1&&(W.__useRenderToTexture=!1),Ce.get(E.texture).__webglTexture=U,Ce.get(E.depthTexture).__webglTexture=W.__autoAllocateDepthBuffer?void 0:$,W.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,U){const $=Ce.get(E);$.__webglFramebuffer=U,$.__useDefaultFramebuffer=U===void 0};const x0=N.createFramebuffer();this.setRenderTarget=function(E,U=0,$=0){A=E,M=U,T=$;let W=!0,F=null,se=!1,ge=!1;if(E){const xe=Ce.get(E);if(xe.__useDefaultFramebuffer!==void 0)Ae.bindFramebuffer(N.FRAMEBUFFER,null),W=!1;else if(xe.__webglFramebuffer===void 0)Xe.setupRenderTarget(E);else if(xe.__hasExternalTextures)Xe.rebindTextures(E,Ce.get(E.texture).__webglTexture,Ce.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const Ie=E.depthTexture;if(xe.__boundDepthTexture!==Ie){if(Ie!==null&&Ce.has(Ie)&&(E.width!==Ie.image.width||E.height!==Ie.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Xe.setupDepthRenderbuffer(E)}}const Ue=E.texture;(Ue.isData3DTexture||Ue.isDataArrayTexture||Ue.isCompressedArrayTexture)&&(ge=!0);const Be=Ce.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Be[U])?F=Be[U][$]:F=Be[U],se=!0):E.samples>0&&Xe.useMultisampledRTT(E)===!1?F=Ce.get(E).__webglMultisampledFramebuffer:Array.isArray(Be)?F=Be[$]:F=Be,R.copy(E.viewport),I.copy(E.scissor),O=E.scissorTest}else R.copy(q).multiplyScalar(G).floor(),I.copy(ue).multiplyScalar(G).floor(),O=Se;if($!==0&&(F=x0),Ae.bindFramebuffer(N.FRAMEBUFFER,F)&&W&&Ae.drawBuffers(E,F),Ae.viewport(R),Ae.scissor(I),Ae.setScissorTest(O),se){const xe=Ce.get(E.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+U,xe.__webglTexture,$)}else if(ge){const xe=U;for(let Ue=0;Ue<E.textures.length;Ue++){const Be=Ce.get(E.textures[Ue]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+Ue,Be.__webglTexture,$,xe)}}else if(E!==null&&$!==0){const xe=Ce.get(E.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,xe.__webglTexture,$)}v=-1},this.readRenderTargetPixels=function(E,U,$,W,F,se,ge,Me=0){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let xe=Ce.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&ge!==void 0&&(xe=xe[ge]),xe){Ae.bindFramebuffer(N.FRAMEBUFFER,xe);try{const Ue=E.textures[Me],Be=Ue.format,Ie=Ue.type;if(!Oe.textureFormatReadable(Be)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Oe.textureTypeReadable(Ie)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=E.width-W&&$>=0&&$<=E.height-F&&(E.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+Me),N.readPixels(U,$,W,F,Le.convert(Be),Le.convert(Ie),se))}finally{const Ue=A!==null?Ce.get(A).__webglFramebuffer:null;Ae.bindFramebuffer(N.FRAMEBUFFER,Ue)}}},this.readRenderTargetPixelsAsync=async function(E,U,$,W,F,se,ge,Me=0){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let xe=Ce.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&ge!==void 0&&(xe=xe[ge]),xe)if(U>=0&&U<=E.width-W&&$>=0&&$<=E.height-F){Ae.bindFramebuffer(N.FRAMEBUFFER,xe);const Ue=E.textures[Me],Be=Ue.format,Ie=Ue.type;if(!Oe.textureFormatReadable(Be))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Oe.textureTypeReadable(Ie))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Je=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,Je),N.bufferData(N.PIXEL_PACK_BUFFER,se.byteLength,N.STREAM_READ),E.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+Me),N.readPixels(U,$,W,F,Le.convert(Be),Le.convert(Ie),0);const ct=A!==null?Ce.get(A).__webglFramebuffer:null;Ae.bindFramebuffer(N.FRAMEBUFFER,ct);const Tt=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await Cy(N,Tt,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,Je),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,se),N.deleteBuffer(Je),N.deleteSync(Tt),se}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(E,U=null,$=0){const W=Math.pow(2,-$),F=Math.floor(E.image.width*W),se=Math.floor(E.image.height*W),ge=U!==null?U.x:0,Me=U!==null?U.y:0;Xe.setTexture2D(E,0),N.copyTexSubImage2D(N.TEXTURE_2D,$,0,0,ge,Me,F,se),Ae.unbindTexture()};const w0=N.createFramebuffer(),S0=N.createFramebuffer();this.copyTextureToTexture=function(E,U,$=null,W=null,F=0,se=null){se===null&&(F!==0?(vr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),se=F,F=0):se=0);let ge,Me,xe,Ue,Be,Ie,Je,ct,Tt;const pt=E.isCompressedTexture?E.mipmaps[se]:E.image;if($!==null)ge=$.max.x-$.min.x,Me=$.max.y-$.min.y,xe=$.isBox3?$.max.z-$.min.z:1,Ue=$.min.x,Be=$.min.y,Ie=$.isBox3?$.min.z:0;else{const En=Math.pow(2,-F);ge=Math.floor(pt.width*En),Me=Math.floor(pt.height*En),E.isDataArrayTexture?xe=pt.depth:E.isData3DTexture?xe=Math.floor(pt.depth*En):xe=1,Ue=0,Be=0,Ie=0}W!==null?(Je=W.x,ct=W.y,Tt=W.z):(Je=0,ct=0,Tt=0);const ht=Le.convert(U.format),De=Le.convert(U.type);let bt;U.isData3DTexture?(Xe.setTexture3D(U,0),bt=N.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(Xe.setTexture2DArray(U,0),bt=N.TEXTURE_2D_ARRAY):(Xe.setTexture2D(U,0),bt=N.TEXTURE_2D),N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,U.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,U.unpackAlignment);const et=N.getParameter(N.UNPACK_ROW_LENGTH),fn=N.getParameter(N.UNPACK_IMAGE_HEIGHT),Ra=N.getParameter(N.UNPACK_SKIP_PIXELS),pn=N.getParameter(N.UNPACK_SKIP_ROWS),Ns=N.getParameter(N.UNPACK_SKIP_IMAGES);N.pixelStorei(N.UNPACK_ROW_LENGTH,pt.width),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,pt.height),N.pixelStorei(N.UNPACK_SKIP_PIXELS,Ue),N.pixelStorei(N.UNPACK_SKIP_ROWS,Be),N.pixelStorei(N.UNPACK_SKIP_IMAGES,Ie);const xt=E.isDataArrayTexture||E.isData3DTexture,Sn=U.isDataArrayTexture||U.isData3DTexture;if(E.isDepthTexture){const En=Ce.get(E),Kt=Ce.get(U),tn=Ce.get(En.__renderTarget),jl=Ce.get(Kt.__renderTarget);Ae.bindFramebuffer(N.READ_FRAMEBUFFER,tn.__webglFramebuffer),Ae.bindFramebuffer(N.DRAW_FRAMEBUFFER,jl.__webglFramebuffer);for(let ji=0;ji<xe;ji++)xt&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Ce.get(E).__webglTexture,F,Ie+ji),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Ce.get(U).__webglTexture,se,Tt+ji)),N.blitFramebuffer(Ue,Be,ge,Me,Je,ct,ge,Me,N.DEPTH_BUFFER_BIT,N.NEAREST);Ae.bindFramebuffer(N.READ_FRAMEBUFFER,null),Ae.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(F!==0||E.isRenderTargetTexture||Ce.has(E)){const En=Ce.get(E),Kt=Ce.get(U);Ae.bindFramebuffer(N.READ_FRAMEBUFFER,w0),Ae.bindFramebuffer(N.DRAW_FRAMEBUFFER,S0);for(let tn=0;tn<xe;tn++)xt?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,En.__webglTexture,F,Ie+tn):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,En.__webglTexture,F),Sn?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Kt.__webglTexture,se,Tt+tn):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Kt.__webglTexture,se),F!==0?N.blitFramebuffer(Ue,Be,ge,Me,Je,ct,ge,Me,N.COLOR_BUFFER_BIT,N.NEAREST):Sn?N.copyTexSubImage3D(bt,se,Je,ct,Tt+tn,Ue,Be,ge,Me):N.copyTexSubImage2D(bt,se,Je,ct,Ue,Be,ge,Me);Ae.bindFramebuffer(N.READ_FRAMEBUFFER,null),Ae.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else Sn?E.isDataTexture||E.isData3DTexture?N.texSubImage3D(bt,se,Je,ct,Tt,ge,Me,xe,ht,De,pt.data):U.isCompressedArrayTexture?N.compressedTexSubImage3D(bt,se,Je,ct,Tt,ge,Me,xe,ht,pt.data):N.texSubImage3D(bt,se,Je,ct,Tt,ge,Me,xe,ht,De,pt):E.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,se,Je,ct,ge,Me,ht,De,pt.data):E.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,se,Je,ct,pt.width,pt.height,ht,pt.data):N.texSubImage2D(N.TEXTURE_2D,se,Je,ct,ge,Me,ht,De,pt);N.pixelStorei(N.UNPACK_ROW_LENGTH,et),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,fn),N.pixelStorei(N.UNPACK_SKIP_PIXELS,Ra),N.pixelStorei(N.UNPACK_SKIP_ROWS,pn),N.pixelStorei(N.UNPACK_SKIP_IMAGES,Ns),se===0&&U.generateMipmaps&&N.generateMipmap(bt),Ae.unbindTexture()},this.initRenderTarget=function(E){Ce.get(E).__webglFramebuffer===void 0&&Xe.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?Xe.setTextureCube(E,0):E.isData3DTexture?Xe.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?Xe.setTexture2DArray(E,0):Xe.setTexture2D(E,0),Ae.unbindTexture()},this.resetState=function(){M=0,T=0,A=null,Ae.reset(),pe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Qn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=tt._getDrawingBufferColorSpace(e),t.unpackColorSpace=tt._getUnpackColorSpace()}}const Zf={type:"change"},sh={type:"start"},Eg={type:"end"},yo=new ju,Kf=new Ni,AM=Math.cos(70*mt.DEG2RAD),Lt=new L,nn=2*Math.PI,ut={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Dc=1e-6;class CM extends Vb{constructor(e,t=null){super(e,t),this.state=ut.NONE,this.target=new L,this.cursor=new L,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:as.ROTATE,MIDDLE:as.DOLLY,RIGHT:as.PAN},this.touches={ONE:Ja.ROTATE,TWO:Ja.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new L,this._lastQuaternion=new Vi,this._lastTargetPosition=new L,this._quat=new Vi().setFromUnitVectors(e.up,new L(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new wf,this._sphericalDelta=new wf,this._scale=1,this._panOffset=new L,this._rotateStart=new ce,this._rotateEnd=new ce,this._rotateDelta=new ce,this._panStart=new ce,this._panEnd=new ce,this._panDelta=new ce,this._dollyStart=new ce,this._dollyEnd=new ce,this._dollyDelta=new ce,this._dollyDirection=new L,this._mouse=new ce,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=PM.bind(this),this._onPointerDown=RM.bind(this),this._onPointerUp=LM.bind(this),this._onContextMenu=OM.bind(this),this._onMouseWheel=DM.bind(this),this._onKeyDown=UM.bind(this),this._onTouchStart=FM.bind(this),this._onTouchMove=kM.bind(this),this._onMouseDown=NM.bind(this),this._onMouseMove=IM.bind(this),this._interceptControlDown=BM.bind(this),this._interceptControlUp=zM.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Zf),this.update(),this.state=ut.NONE}update(e=null){const t=this.object.position;Lt.copy(t).sub(this.target),Lt.applyQuaternion(this._quat),this._spherical.setFromVector3(Lt),this.autoRotate&&this.state===ut.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,a=this.maxAzimuthAngle;isFinite(i)&&isFinite(a)&&(i<-Math.PI?i+=nn:i>Math.PI&&(i-=nn),a<-Math.PI?a+=nn:a>Math.PI&&(a-=nn),i<=a?this._spherical.theta=Math.max(i,Math.min(a,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+a)/2?Math.max(i,this._spherical.theta):Math.min(a,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let s=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const r=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),s=r!=this._spherical.radius}if(Lt.setFromSpherical(this._spherical),Lt.applyQuaternion(this._quatInverse),t.copy(this.target).add(Lt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let r=null;if(this.object.isPerspectiveCamera){const o=Lt.length();r=this._clampDistance(o*this._scale);const l=o-r;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),s=!!l}else if(this.object.isOrthographicCamera){const o=new L(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),s=l!==this.object.zoom;const c=new L(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),r=Lt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;r!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(r).add(this.object.position):(yo.origin.copy(this.object.position),yo.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(yo.direction))<AM?this.object.lookAt(this.target):(Kf.setFromNormalAndCoplanarPoint(this.object.up,this.target),yo.intersectPlane(Kf,this.target))))}else if(this.object.isOrthographicCamera){const r=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),r!==this.object.zoom&&(this.object.updateProjectionMatrix(),s=!0)}return this._scale=1,this._performCursorZoom=!1,s||this._lastPosition.distanceToSquared(this.object.position)>Dc||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Dc||this._lastTargetPosition.distanceToSquared(this.target)>Dc?(this.dispatchEvent(Zf),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?nn/60*this.autoRotateSpeed*e:nn/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Lt.setFromMatrixColumn(t,0),Lt.multiplyScalar(-e),this._panOffset.add(Lt)}_panUp(e,t){this.screenSpacePanning===!0?Lt.setFromMatrixColumn(t,1):(Lt.setFromMatrixColumn(t,0),Lt.crossVectors(this.object.up,Lt)),Lt.multiplyScalar(e),this._panOffset.add(Lt)}_pan(e,t){const i=this.domElement;if(this.object.isPerspectiveCamera){const a=this.object.position;Lt.copy(a).sub(this.target);let s=Lt.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*s/i.clientHeight,this.object.matrix),this._panUp(2*t*s/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),a=e-i.left,s=t-i.top,r=i.width,o=i.height;this._mouse.x=a/r*2-1,this._mouse.y=-(s/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(nn*this._rotateDelta.x/t.clientHeight),this._rotateUp(nn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(nn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-nn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(nn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-nn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),a=.5*(e.pageY+t.y);this._rotateStart.set(i,a)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),a=.5*(e.pageY+t.y);this._panStart.set(i,a)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,a=e.pageY-t.y,s=Math.sqrt(i*i+a*a);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),a=.5*(e.pageX+i.x),s=.5*(e.pageY+i.y);this._rotateEnd.set(a,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(nn*this._rotateDelta.x/t.clientHeight),this._rotateUp(nn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),a=.5*(e.pageY+t.y);this._panEnd.set(i,a)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,a=e.pageY-t.y,s=Math.sqrt(i*i+a*a);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const r=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(r,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new ce,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function RM(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n)))}function PM(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function LM(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Eg),this.state=ut.NONE;break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function NM(n){let e;switch(n.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case as.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=ut.DOLLY;break;case as.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=ut.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=ut.ROTATE}break;case as.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=ut.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=ut.PAN}break;default:this.state=ut.NONE}this.state!==ut.NONE&&this.dispatchEvent(sh)}function IM(n){switch(this.state){case ut.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case ut.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case ut.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function DM(n){this.enabled===!1||this.enableZoom===!1||this.state!==ut.NONE||(n.preventDefault(),this.dispatchEvent(sh),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(Eg))}function UM(n){this.enabled!==!1&&this._handleKeyDown(n)}function FM(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case Ja.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=ut.TOUCH_ROTATE;break;case Ja.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=ut.TOUCH_PAN;break;default:this.state=ut.NONE}break;case 2:switch(this.touches.TWO){case Ja.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=ut.TOUCH_DOLLY_PAN;break;case Ja.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=ut.TOUCH_DOLLY_ROTATE;break;default:this.state=ut.NONE}break;default:this.state=ut.NONE}this.state!==ut.NONE&&this.dispatchEvent(sh)}function kM(n){switch(this._trackPointer(n),this.state){case ut.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case ut.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case ut.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case ut.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=ut.NONE}}function OM(n){this.enabled!==!1&&n.preventDefault()}function BM(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function zM(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const rh=1,ko=.32,jf=1024,HM=16;function Jf(n){const e=new rt({color:n,transparent:!0,opacity:rh,side:Qe});return e.forceSinglePass=!0,e}function GM(n){return new gg({color:n,side:Qe,transparent:!0,opacity:rh})}function Ya(n,e,t,i){return new He(new Ta(n,t,e,6,1,6),i)}function Uc(n,e,t,i,a,s,r,o){n.beginPath();for(let l=0;l<=e;l+=8){const c=l/e,d=i*t+Math.sin(c*Math.PI*2+s)*a+Math.sin(c*Math.PI*4+s*.5)*a*.35;l===0?n.moveTo(l,d):n.lineTo(l,d)}n.lineWidth=r,n.strokeStyle=o,n.stroke()}function Fc(n,e,t,i,a,s,r,o){n.beginPath();for(let l=0;l<=t;l+=8){const c=l/t,d=i*e+Math.sin(c*Math.PI*2+s)*a+Math.sin(c*Math.PI*6+s*.3)*a*.18;l===0?n.moveTo(d,l):n.lineTo(d,l)}n.lineWidth=r,n.strokeStyle=o,n.stroke()}function kc(n,e,t,i,a,s){n.beginPath(),n.arc(e,t,i,0,Math.PI*2),n.fillStyle=a,n.fill(),n.lineWidth=Math.max(6,i*.15),n.strokeStyle=s,n.stroke()}function VM(n){const e=document.createElement("canvas");e.width=jf,e.height=jf;const t=e.getContext("2d");if(!t)throw new Error("Unable to create ball texture canvas");const{width:i,height:a}=e,s=t.createLinearGradient(0,0,i,a);s.addColorStop(0,"#faf7ee"),s.addColorStop(.55,"#e7e1d0"),s.addColorStop(1,"#d5cfbe"),t.fillStyle=s,t.fillRect(0,0,i,a),t.globalAlpha=.22;for(let l=0;l<28;l+=1){const c=l/27*a;t.fillStyle=l%2===0?"#ffffff":"#d3cbb6",t.fillRect(0,c,i,a/54)}t.globalAlpha=1;const r="#2d313b";t.lineCap="round",Uc(t,i,a,.24,22,.35,18,r),Uc(t,i,a,.5,14,1.1,20,r),Uc(t,i,a,.77,20,2.35,18,r),Fc(t,i,a,.2,24,.2,18,r),Fc(t,i,a,.48,18,1.6,18,r),Fc(t,i,a,.76,26,2.7,18,r),t.globalAlpha=.92,kc(t,i*.28,a*.32,88,"#f1a63a","#fff4d7"),kc(t,i*.68,a*.6,72,"#4db0ff","#eef8ff"),kc(t,i*.76,a*.2,54,"#1f232c","#f0ece1"),t.globalAlpha=1,t.beginPath(),t.moveTo(i*.08,a*.86),t.quadraticCurveTo(i*.28,a*.72,i*.42,a*.8),t.quadraticCurveTo(i*.58,a*.9,i*.82,a*.78),t.lineWidth=24,t.strokeStyle="rgba(255, 246, 220, 0.9)",t.stroke();const o=new Il(e);return o.colorSpace=Yt,o.anisotropy=Math.min(8,n.capabilities.getMaxAnisotropy()),o}function $M(n,e,t,i){return new He(new Ta(n,e,t,6,6,1),i)}function WM(n){const e=10280*n,t=8240*n,i=1960*n,a=1e3*n,s=1900*n,r=800*n,o=900*n,l=Math.max(1,n),c=[],d=[1,-1];function u(_,m,p=null){const S=_.material.clone();return _.material=S,c.push({mesh:_,material:S,outwardLocal:m.clone().normalize(),fixedOpacity:p}),_}function h(_){const m=new _t,p=Jf(_),S=t/2-a-s/2,x=Math.sqrt(2*Math.pow(a,2));for(const C of d){const M=u(Ya(S,i,l,p),new L(0,1,0));M.position.set(C*(S/2+s/2),0,i/2),m.add(M);const T=u(Ya(x,i,l,p),new L(0,1,0));T.position.set(C*(t/2-a/2),-a/2,i/2),T.rotateZ(-C*Math.PI/4),m.add(T)}const y=u(Ya(s,i-r,l,p),new L(0,1,0));return y.position.set(0,0,i/2+r/2),m.add(y),m}function f(_,m){const p=new _t,S=[[t/2,0],[-t/2,0],[-t/2,e/2-a],[-t/2+a,e/2],[-s/2,e/2],[-s/2,e/2+o],[s/2,e/2+o],[s/2,e/2],[t/2-a,e/2],[t/2,e/2-a],[t/2,0]],x=new nh;S.forEach(([b,R],I)=>{I===0?x.moveTo(b,R):x.lineTo(b,R)});const y=GM(_),C=Jf(_),M=u(new He(new Ul(x),y),new L(0,0,-1));M.receiveShadow=!0,p.add(M);for(const b of d){const R=u(Ya(o,r,l,C),new L(0,-b,0),ko);R.position.set(b*s/2,e/2+o/2,r/2),R.rotateZ(Math.PI/2),p.add(R)}const T=u($M(s,o,l,C),new L(0,0,1),ko);T.position.set(0,e/2+o/2,r),p.add(T);const A=u(Ya(s,r,l,C),new L(0,1,0),ko);A.position.set(0,e/2+o,r/2),p.add(A);const v=h(_);v.position.y=e/2,p.add(v);for(const b of d){const R=u(Ya(e/2-a,i,l,C),new L(0,-b,0));R.position.set(b*t/2,(e/2-a)/2,i/2),R.rotateZ(Math.PI/2),p.add(R)}return m&&p.rotateZ(Math.PI),p}const g=new _t;return g.add(f(16771251,!1)),g.add(f(8381439,!0)),{stadium:g,wallPanels:c}}function XM(n){const e=[[100,-100,100],[100,100,100],[-100,100,100],[-100,-100,100],[150,-220,20],[-150,-220,20],[130,-400,-20],[-130,-400,-20],[140,170,25],[-140,170,25],[130,240,25],[-130,240,25],[130,-400,-80],[-130,-400,-80],[150,-220,-80],[-150,-220,-80],[140,170,-80],[-140,170,-80],[130,240,-80],[-130,240,-80]],t=[[0,1,2],[0,2,3],[4,0,5],[0,3,5],[6,4,5],[6,5,7],[1,8,9],[1,9,2],[4,8,1],[4,1,0],[3,2,9],[3,9,5],[8,10,11],[8,11,9],[12,6,7],[12,7,13],[7,5,15],[7,15,13],[6,14,4],[12,14,6],[14,16,4],[4,16,8],[5,9,15],[15,9,17],[16,18,8],[8,18,10],[9,11,17],[17,11,19],[10,18,11],[11,18,19],[14,12,13],[14,13,15],[16,14,15],[16,15,17],[18,16,17],[18,17,19]],i=new Rt;i.setAttribute("position",new it(e.flat(),3)),i.setIndex(t.flat()),i.computeVertexNormals();const a=new _t,s=new _t,r=new He(i,new gg({color:n}));r.castShadow=!0,s.add(r);const o=new ll({color:1710894,shininess:120,transparent:!0,opacity:.82}),l=[[100,-100,100],[-100,-100,100],[150,-220,20],[-150,-220,20],[100,100,100],[-100,100,100],[140,170,25],[-140,170,25],[100,-100,100],[100,100,100],[150,-220,20],[140,170,25],[-100,-100,100],[-100,100,100],[-150,-220,20],[-140,170,25]],c=[[0,2,3],[0,3,1],[4,6,7],[4,7,5],[8,10,11],[8,11,9],[12,14,15],[12,15,13]],d=new Rt;d.setAttribute("position",new it(l.flat(),3)),d.setIndex(c.flat()),d.computeVertexNormals();const u=new He(d,o);u.position.z=1,s.add(u);const h=new rt({color:8968191,transparent:!0,opacity:.34,side:Qe}),f=new Rt;f.setAttribute("position",new it([90,-110,95,-90,-110,95,140,-210,25,-140,-210,25],3)),f.setIndex([0,2,3,0,3,1]),f.computeVertexNormals();const g=new He(f,h);g.position.z=2,s.add(g);const _=new ll({color:2236962,shininess:48}),m=(p,S,x,y)=>{const C=new He(new Dl(70,70,y,10),_);return C.rotateZ(Math.PI/2),C.position.set(p,S,x),C.castShadow=!0,C};return s.add(m(120,-300,-60,50)),s.add(m(-120,-300,-60,50)),s.add(m(120,150,-60,70)),s.add(m(-120,150,-60,70)),s.position.set(0,0,50),s.rotateZ(Math.PI/2),s.scale.set(.35,.35,.35),a.add(s),a}function qM(){const n=new _t;n.visible=!1,n.position.set(-124,0,8);const e=new yr(30,220,14,1,!0);e.rotateZ(Math.PI/2),e.translate(-110,0,0);const t=new yr(17,150,12,1,!0);t.rotateZ(Math.PI/2),t.translate(-75,0,0);const i=new _s(21,12,12),a=[-38,38];for(const s of a){const r=new _t;r.position.set(0,s,0);const o=new rt({color:"#ff9b2f",transparent:!0,opacity:.42,blending:ki,depthWrite:!1,side:Qe});o.forceSinglePass=!0;const l=new He(e,o);l.name="outer-flame",r.add(l);const c=new rt({color:"#fff2ba",transparent:!0,opacity:.9,blending:ki,depthWrite:!1,side:Qe});c.forceSinglePass=!0;const d=new He(t,c);d.name="inner-flame",r.add(d);const u=new rt({color:"#fff8db",transparent:!0,opacity:.62,blending:ki,depthWrite:!1});u.forceSinglePass=!0;const h=new He(i,u);h.name="glow",h.position.x=-10,r.add(h),n.add(r)}return n}function YM(){const n=new _t;n.visible=!1,n.position.set(0,0,235);const e=240,t=82,i=188,a=20,s=new ln(e,t),r=new rt({color:463645,transparent:!0,opacity:.78,side:Qe,depthWrite:!1}),o=new He(s,r);o.position.z=-1,n.add(o);const l=new ln(i,a),c=new rt({color:1385521,transparent:!0,opacity:.92,side:Qe,depthWrite:!1}),d=new He(l,c);d.position.y=-18,n.add(d);const u=new ln(i,a),h=new rt({color:16761415,transparent:!0,opacity:.98,side:Qe,depthWrite:!1}),f=new He(u,h);f.position.y=-18,n.add(f);const g=document.createElement("canvas");g.width=512,g.height=160;const _=g.getContext("2d");if(!_)throw new Error("Unable to create boost meter label context");const m=new Il(g);m.colorSpace=Yt,m.needsUpdate=!0;const p=new ln(190,48),S=new rt({map:m,transparent:!0,depthWrite:!1,side:Qe}),x=new He(p,S);return x.position.set(0,15,0),n.add(x),{group:n,fillMesh:f,fillMaterial:h,labelTexture:m,labelContext:_,labelCanvas:g,lastPercent:null}}function ZM(){const n=new _t;n.visible=!1;const e=new rt({color:16765276,transparent:!0,opacity:.86,depthWrite:!1}),t=new He(new ih(170,8,8,48),e);t.position.z=16,n.add(t);const i=document.createElement("canvas");i.width=512,i.height=192;const a=i.getContext("2d");if(!a)throw new Error("Unable to create demo indicator label context");a.textAlign="center",a.textBaseline="middle",a.lineJoin="round",a.font="800 86px sans-serif",a.lineWidth=20,a.strokeStyle="rgba(7, 19, 29, 0.94)",a.strokeText("DEMO",i.width/2,88),a.fillStyle="#fff0b8",a.fillText("DEMO",i.width/2,88),a.font="700 34px sans-serif",a.lineWidth=10,a.strokeText("RESPAWNING",i.width/2,150),a.fillStyle="#ffbd4a",a.fillText("RESPAWNING",i.width/2,150);const s=new Il(i);s.colorSpace=Yt;const r=new rt({map:s,transparent:!0,depthWrite:!1,side:Qe}),o=new He(new ln(310,116),r);return o.position.z=300,n.add(o),{group:n,ring:t,label:o}}function KM(n,e,t,i){n.fillMesh.scale.x=Math.max(.001,e);const a=94;n.fillMesh.position.x=-(1-e)*a,n.fillMesh.position.y=-18;const s=Math.max(0,Math.min(100,Math.round(t/255*100)));if(n.lastPercent!==s){const{labelContext:r,labelCanvas:o,labelTexture:l}=n;r.clearRect(0,0,o.width,o.height),r.textAlign="center",r.textBaseline="middle",r.lineJoin="round",r.font="700 84px sans-serif",r.lineWidth=18,r.strokeStyle="rgba(7, 19, 29, 0.92)",r.strokeText(`${s}`,o.width/2,78),r.fillStyle="#fff8e1",r.fillText(`${s}`,o.width/2,78),r.font="600 30px sans-serif",r.lineWidth=10,r.strokeText("BOOST",o.width/2,130),r.fillStyle="#ffcf70",r.fillText("BOOST",o.width/2,130),l.needsUpdate=!0,n.lastPercent=s}n.group.quaternion.copy(i.quaternion)}function jM(n){n.add(new zb("#d8ecff",1.6));const e=new xf("#fff6df",2.4);e.position.set(4e3,-6e3,5e3),n.add(e);const t=new xf("#97d7ff",1.2);t.position.set(-5e3,4e3,3e3),n.add(t)}function JM(n){const e=VM(n),t=new ll({color:16777215,map:e,shininess:42,specular:new Ke("#f7f2e3")});return{mesh:new He(new _s(93,24,24),t),texture:e}}function QM(n,e,t){const i=new Qy;i.background=new Ke("#081119");const a=new An(48,1,10*t,5e5*t);a.up.set(0,0,1),a.position.set(0,-9e3*t,5e3*t),a.lookAt(0,0,0);const s=new TM({antialias:!0});s.setPixelRatio(window.devicePixelRatio),s.domElement.style.display="block",s.domElement.style.width="100%",s.domElement.style.height="100%",s.domElement.tabIndex=0,s.domElement.setAttribute("aria-label","Replay player viewport"),n.replaceChildren(s.domElement);const r=new CM(a,s.domElement);r.enableDamping=!0,r.maxDistance=16e4*t,r.keyPanSpeed=HM,r.target.set(0,0,600*t),r.listenToKeyEvents(s.domElement),r.update();const o=()=>{s.domElement.focus()};s.domElement.addEventListener("pointerdown",o);const{stadium:l,wallPanels:c}=WM(t);i.add(l),jM(i);const d=new _t;d.scale.set(-t,t,t),i.add(d);const{mesh:u,texture:h}=JM(s);d.add(u);const f=new Map,g=new Map,_=new Map,m=new Map;for(const A of e.players){const v=XM(A.isTeamZero?"#57a8ff":"#ff9c40"),b=qM();v.add(b);const R=YM();v.add(R.group);const I=ZM();d.add(v),d.add(I.group),f.set(A.id,v),g.set(A.id,b),_.set(A.id,R),m.set(A.id,I)}const p=()=>{const A=n.clientWidth||1,v=n.clientHeight||1;a.aspect=A/v,a.updateProjectionMatrix(),s.setSize(A,v,!1)};p();const S=new L,x=new L,y=new Vi,C=new L;return{scene:i,replayRoot:d,camera:a,renderer:s,controls:r,resize:p,dispose:()=>{s.domElement.removeEventListener("pointerdown",o),r.stopListenToKeyEvents(),r.dispose(),h.dispose(),s.dispose(),n.replaceChildren()},ballMesh:u,playerMeshes:f,playerBoostTrails:g,playerBoostMeters:_,playerDemoIndicators:m,updateWallVisibility:()=>{i.updateMatrixWorld(!0);for(const A of c){if(A.fixedOpacity!==null){A.material.transparent=!0,A.material.opacity=A.fixedOpacity,A.material.depthWrite=!1;continue}A.mesh.getWorldPosition(S),A.mesh.getWorldQuaternion(y),x.copy(A.outwardLocal).applyQuaternion(y).normalize(),C.copy(a.position).sub(S);const v=x.dot(C)>0;A.material.transparent=!0,A.material.opacity=v?ko:rh,A.material.depthWrite=!v}}}}function Xs(n,e){if(n.frames.length===0)return 0;let t=0,i=n.frames.length-1;for(;t<=i;){const a=Math.floor((t+i)/2),s=n.frames[a]?.time??0;if(s<e)t=a+1;else if(s>e)i=a-1;else return a}return Math.max(0,t-1)}function eT(n,e){return n.frames.length===0?0:mt.clamp(Math.round(e),0,n.frames.length-1)}function tT(n){if(n.frames.length===0)return null;const e=new Map;for(const a of n.frames)e.set(a.gameState,(e.get(a.gameState)??0)+1);let t=null,i=-1;for(const[a,s]of e.entries())s<=i||(t=a,i=s);return t}function nT(n,e){if(e===null)return null;for(const t of n.frames){if(t.gameState===e)break;return t.gameState}return null}function Mg(n,e){return e===null?n.kickoffCountdown<=0:n.gameState===e}function oh(n,e){return n.kickoffCountdown>0?!0:e!==null&&n.gameState===e}function iT(n,e){return n.ballFrames[e]?.position?!0:n.players.some(t=>t.frames[e]?.position)}function aT(n,e,t,i){return oh(e,i)&&iT(n,t)}function Oo(n,e,t,i,a){return!Mg(e,i)&&!aT(n,e,t,a)}function Qf(n,e,t,i,a,s,r){return i&&Oo(n,e,t,s,r)||a&&oh(e,r)}function sT(n,e,t,i,a){const s=[],{frames:r}=n;if(r.length===0||!e&&!t)return s;let o=0;for(;o<r.length;){const l=r[o];if(!l||!Qf(n,l,o,e,t,i,a)){o+=1;continue}const c=l.time;let d=o+1;for(;d<r.length&&Qf(n,r[d],d,e,t,i,a);)d+=1;const u=r[d]?.time??n.duration;if(u>c){const h=s.at(-1);h&&h.endTime>=c?h.endTime=Math.max(h.endTime,u):s.push({startTime:c,endTime:u})}o=d}return s}function rT(n,e,t){const i=mt.clamp(t,0,n);let a=0;for(const s of e){if(i<s.startTime)break;if(i<s.endTime)return{replayTime:i,timelineTime:s.startTime-a,seekTime:s.startTime,hiddenBySkip:!0};a+=s.endTime-s.startTime}return{replayTime:i,timelineTime:i-a,seekTime:i,hiddenBySkip:!1}}function oT(n,e,t,i){const a=mt.clamp(i,0,e);let s=0;for(const r of t){const o=r.startTime-s;if(a<=o)return a+s;s+=r.endTime-r.startTime}return mt.clamp(a+s,0,n)}function lT(n,e){const t=e.at(-1);return!t||t.endTime<n?n:mt.clamp(t.startTime,0,n)}function cT(n,e,t){const i=n.frames[e];if(!i||i.kickoffCountdown<=0)return null;let a=e;for(;a>0&&(n.frames[a-1]?.kickoffCountdown??0)>0;)a-=1;let s=e+1;for(;s<n.frames.length&&n.frames[s].kickoffCountdown>0;)s+=1;let r=0;for(let c=a;c<s;c+=1)r=Math.max(r,n.frames[c].kickoffCountdown);const o=n.frames[s]?.time??n.duration,l=Math.max(0,o-t);return{kind:"kickoff-countdown",countdown:Math.max(1,Math.min(r,Math.ceil(l))),secondsRemaining:l,endsAt:o}}function dT(n,e){const t=Xs(n,e),i=Math.min(t+1,n.frames.length-1);if(i===t)return{frameIndex:t,nextFrameIndex:i,alpha:0};const a=n.frames[t]?.time??0,s=n.frames[i]?.time??a;return s<=a?{frameIndex:t,nextFrameIndex:i,alpha:0}:{frameIndex:t,nextFrameIndex:i,alpha:mt.clamp((e-a)/(s-a),0,1)}}const uT=1.4,Za=.18,bo=.14,hT=120,ep=90,fT=40,pT=45,mT=.58,tp=.82,gT=132,Tg=new L(-1,0,0),ha=new L(0,0,1),_T=new L(-1,0,0),vT=new L(0,0,18800),yT=new L(0,0,700),bT=new L(-9600,-12600,6400),xT=new L(0,0,900),cl=48,wT=16,ST=16,ET=.003,MT=.05;function np(n,e,t){return n?!e||t<=0?n:{x:mt.lerp(n.x,e.x,t),y:mt.lerp(n.y,e.y,t),z:mt.lerp(n.z,e.z,t)}:e}function Oc(n){return new L(n.x,n.y,n.z)}function Ag(n,e){return new L(-n.x*e,n.y*e,n.z*e)}function Bc(n){return new L(-n.x,n.y,n.z).normalize()}function TT(n,e){switch(n){case"overhead":return{position:vT.clone().multiplyScalar(e),target:yT.clone().multiplyScalar(e),up:_T.clone(),fov:cl};case"side":return{position:bT.clone().multiplyScalar(e),target:xT.clone().multiplyScalar(e),up:ha.clone(),fov:cl}}}function AT(n){const{fov:e,position:t,sceneState:i,target:a,up:s}=n,{camera:r,controls:o}=i;o.enabled=!1,r.position.lerp(t,bo),o.target.lerp(a,bo),r.up.lerp(s,bo).normalize(),r.fov=mt.lerp(r.fov,e,bo),r.updateProjectionMatrix(),r.lookAt(o.target);const l=r.position.distanceToSquared(t)<=wT,c=o.target.distanceToSquared(a)<=ST,d=r.up.angleTo(s)<=ET,u=Math.abs(r.fov-e)<=MT;return!l||!c||!d||!u?!1:(r.position.copy(t),o.target.copy(a),r.up.copy(s).normalize(),r.fov=e,r.updateProjectionMatrix(),r.lookAt(a),o.enabled=!0,!0)}function CT(n){const e=n.linearVelocity?Bc(n.linearVelocity):null,t=n.forward?Bc(n.forward):null,i=n.up?Bc(n.up):null;if((n.position?.z??1/0)<hT){const l=(t??e??Tg.clone()).clone().setZ(0);if(l.lengthSq()<1e-4)return null;l.normalize(),e&&e.lengthSq()>1e-4&&l.dot(e)<0&&l.negate();const c=new L().crossVectors(ha,l).normalize(),d=new L().crossVectors(l,c).normalize();return{forward:l,up:d,right:c}}if(!t||!i)return null;const s=t.clone().normalize(),r=new L().crossVectors(i,s).normalize(),o=new L().crossVectors(s,r).normalize();return{forward:s,up:o,right:r}}function RT(n){const{cameraViewMode:e,attachedPlayerId:t,ballCamEnabled:i,ballPosition:a,cameraDistanceScale:s,customCameraSettings:r,desiredCameraPosition:o,desiredLookTarget:l,fieldScale:c,frameIndex:d,replay:u,sceneState:h}=n,f=h.controls;if(e==="free"){f.enabled=!0,h.camera.fov=mt.lerp(h.camera.fov,cl,Za),h.camera.updateProjectionMatrix();return}if(!t){f.enabled=!0,h.camera.fov=mt.lerp(h.camera.fov,cl,Za),h.camera.updateProjectionMatrix();return}const g=u.players.find(O=>O.id===t),_=g?.frames[d];if(!g||!_?.position||_.isPresent===!1){f.enabled=!0;return}f.enabled=!1;const m=Ag(_.position,c),p=CT(_),S=p?.forward??Tg.clone(),x=p?.right??new L(0,1,0),y={...g.cameraSettings,...r??{}},C=(y.distance??270)*c*s,M=(y.height??100)*c*uT,T=mt.degToRad(y.pitch??-4),A=S.clone().applyAxisAngle(x,T).normalize(),v=m.clone().addScaledVector(ha,M),b=S.clone().multiplyScalar(-C).addScaledVector(ha,M).applyAxisAngle(x,T),R=m.clone().addScaledVector(ha,fT*c);let I=y.fov??110;if(i&&a){const O=a.clone().addScaledVector(ha,pT*c),H=O.clone().sub(R),V=(H.lengthSq()>1e-4?H.normalize():A.clone()).multiplyScalar(tp).addScaledVector(A,1-tp).normalize();l.copy(R).lerp(O,mT),o.copy(v).addScaledVector(V,-C),o.z=Math.max(ep*c,o.z);const B=R.clone().sub(o),X=O.clone().sub(o);if(B.lengthSq()>1e-4&&X.lengthSq()>1e-4){const G=B.angleTo(X);I=Math.min(gT,Math.max(I,mt.radToDeg(G)*1.7))}}else o.copy(R).add(b),o.z=Math.max(ep*c,o.z),l.copy(R);h.camera.position.lerp(o,Za),h.camera.up.lerp(ha,Za).normalize(),f.target.lerp(l,Za),h.camera.fov=mt.lerp(h.camera.fov,I,Za),h.camera.updateProjectionMatrix(),h.camera.lookAt(f.target)}const PT=1,LT=2.25,xo="free",ip=3.2;function aa(n){return typeof n=="number"&&Number.isFinite(n)?n:void 0}function zc(n){if(!n)return null;const e={},t=aa(n.fov),i=aa(n.height),a=aa(n.pitch),s=aa(n.distance),r=aa(n.stiffness),o=aa(n.swivelSpeed),l=aa(n.transitionSpeed);return t!==void 0&&(e.fov=t),i!==void 0&&(e.height=i),a!==void 0&&(e.pitch=a),s!==void 0&&(e.distance=s),r!==void 0&&(e.stiffness=r),o!==void 0&&(e.swivelSpeed=o),l!==void 0&&(e.transitionSpeed=l),e}function NT(n){return!!n?.position&&n?.isPresent!==!1}class IT extends EventTarget{container;replay;options;sceneState;beforeRenderCallbacks=[];plugins=[];fieldScale;desiredCameraPosition=new L;desiredLookTarget=new L;boundWindowResize=()=>this.sceneState.resize();liveGameState;kickoffGameState;timelineSegmentsCacheKey=null;timelineSegmentsCache=[];timelineDurationCache=0;resizeObserver=null;animationFrameId=null;disposed=!1;playing=!1;speed=1;currentTime=0;playbackStartedAt=0;playbackStartedTime=0;cameraDistanceScale;customCameraSettings;cameraViewMode;freeCameraTransition=null;attachedPlayerId;ballCamEnabled;boostMeterEnabled;boostPickupAnimationEnabled;skipPostGoalTransitionsEnabled;skipKickoffsEnabled;constructor(e,t,i={}){super(),this.container=e,this.replay=t,this.options=i,this.fieldScale=i.fieldScale??PT,this.sceneState=QM(e,t,this.fieldScale),this.liveGameState=tT(t),this.kickoffGameState=nT(t,this.liveGameState),this.speed=Math.max(.1,i.initialPlaybackRate??1),this.cameraDistanceScale=Math.max(.25,i.initialCameraDistanceScale??LT),this.customCameraSettings=zc(i.initialCustomCameraSettings),this.attachedPlayerId=i.initialAttachedPlayerId??null,this.cameraViewMode=i.initialCameraViewMode??(this.attachedPlayerId?"follow":xo),this.ballCamEnabled=i.initialBallCamEnabled??!1,this.boostMeterEnabled=i.initialBoostMeterEnabled??!1,this.boostPickupAnimationEnabled=i.initialBoostPickupAnimationEnabled??!0,this.skipPostGoalTransitionsEnabled=i.initialSkipPostGoalTransitionsEnabled??!0,this.skipKickoffsEnabled=i.initialSkipKickoffsEnabled??!1,this.skipPostGoalTransitionIfNeeded(),this.skipPastKickoffIfNeeded(),this.installResizeHandling();for(const a of i.plugins??[])this.installPlugin(a,!1);this.render(),this.scheduleAnimationFrame(),this.emitChange(),i.autoplay&&this.play()}play(){this.playing||(this.playing=!0,this.reanchorPlaybackClock(),this.emitChange())}pause(){this.playing&&(this.syncPlaybackClock(),this.playing=!1,this.emitChange())}togglePlayback(){this.playing?this.pause():this.play()}setPlaybackRate(e){this.playing&&this.syncPlaybackClock(),this.speed=Math.max(.1,e),this.playing&&this.reanchorPlaybackClock(),this.emitChange()}setCameraDistanceScale(e){this.cameraDistanceScale=Math.max(.25,e),this.render(),this.emitChange()}setCustomCameraSettings(e){this.customCameraSettings=zc(e),this.render(),this.emitChange()}setAttachedPlayer(e){this.attachedPlayerId=e,this.cameraViewMode=e?"follow":xo,this.freeCameraTransition=null,this.render(),this.emitChange()}setCameraViewMode(e){this.cameraViewMode=e,this.freeCameraTransition=null,this.render(),this.emitChange()}setFreeCameraPreset(e){const{fov:t,position:i,target:a,up:s}=TT(e,this.fieldScale);this.cameraViewMode=xo,this.freeCameraTransition={position:i,target:a,up:s,fov:t},this.render(),this.emitChange()}setBallCamEnabled(e){this.ballCamEnabled=e,this.render(),this.emitChange()}setBoostMeterEnabled(e){if(this.boostMeterEnabled=e,!e)for(const t of this.sceneState.playerBoostMeters.values())t.group.visible=!1;this.render(),this.emitChange()}setBoostPickupAnimationEnabled(e){this.boostPickupAnimationEnabled=e,this.render(),this.emitChange()}setSkipPostGoalTransitionsEnabled(e){this.skipPostGoalTransitionsEnabled=e,e&&this.skipPostGoalTransitionIfNeeded(),this.render(),this.emitChange()}setSkipKickoffsEnabled(e){this.skipKickoffsEnabled=e,e&&(this.skipPostGoalTransitionIfNeeded(),this.skipPastKickoffIfNeeded()),this.render(),this.emitChange()}seek(e){this.currentTime=this.clampReplayTime(e),this.skipPostGoalTransitionIfNeeded(),this.skipPastKickoffIfNeeded(),this.playing&&this.reanchorPlaybackClock(),this.render(),this.emitChange()}setFrameIndex(e){const t=eT(this.replay,e),i=this.replay.frames[t]?.time??0,a=this.playing,s=this.currentTime!==i||a;this.playing=!1,this.currentTime=i,this.render(),s&&this.emitChange()}stepFrames(e){if(!Number.isFinite(e)||this.replay.frames.length===0)return;const t=Xs(this.replay,this.currentTime);this.setFrameIndex(t+Math.trunc(e))}stepForwardFrame(){this.stepFrames(1)}stepBackwardFrame(){this.stepFrames(-1)}setState(e){const t=performance.now();if(e.speed!==void 0&&(this.playing&&this.syncPlaybackClock(t),this.speed=Math.max(.1,e.speed)),e.cameraDistanceScale!==void 0&&(this.cameraDistanceScale=Math.max(.25,e.cameraDistanceScale)),e.customCameraSettings!==void 0&&(this.customCameraSettings=zc(e.customCameraSettings)),e.cameraViewMode!==void 0&&(this.cameraViewMode=e.cameraViewMode),e.attachedPlayerId!==void 0&&(this.attachedPlayerId=e.attachedPlayerId,e.cameraViewMode===void 0&&(this.cameraViewMode=this.attachedPlayerId?"follow":xo)),e.ballCamEnabled!==void 0&&(this.ballCamEnabled=e.ballCamEnabled),e.boostMeterEnabled!==void 0&&(this.boostMeterEnabled=e.boostMeterEnabled,!this.boostMeterEnabled))for(const i of this.sceneState.playerBoostMeters.values())i.group.visible=!1;e.boostPickupAnimationEnabled!==void 0&&(this.boostPickupAnimationEnabled=e.boostPickupAnimationEnabled),e.skipPostGoalTransitionsEnabled!==void 0&&(this.skipPostGoalTransitionsEnabled=e.skipPostGoalTransitionsEnabled),e.skipKickoffsEnabled!==void 0&&(this.skipKickoffsEnabled=e.skipKickoffsEnabled),e.currentTime!==void 0&&(this.currentTime=this.clampReplayTime(e.currentTime)),e.playing!==void 0&&e.playing!==this.playing&&(e.playing?this.playing=!0:(e.currentTime===void 0&&this.syncPlaybackClock(t),this.playing=!1)),this.playing&&this.reanchorPlaybackClock(t),this.skipPostGoalTransitionIfNeeded(t),this.skipPastKickoffIfNeeded(t),this.render(),this.emitChange()}getState(){const e=Xs(this.replay,this.currentTime);return{currentTime:this.currentTime,duration:this.replay.duration,frameIndex:e,activeMetadata:this.getActiveMetadata(e,this.currentTime),playing:this.playing,speed:this.speed,cameraDistanceScale:this.cameraDistanceScale,customCameraSettings:this.customCameraSettings,cameraViewMode:this.cameraViewMode,attachedPlayerId:this.attachedPlayerId,ballCamEnabled:this.ballCamEnabled,boostMeterEnabled:this.boostMeterEnabled,boostPickupAnimationEnabled:this.boostPickupAnimationEnabled,skipPostGoalTransitionsEnabled:this.skipPostGoalTransitionsEnabled,skipKickoffsEnabled:this.skipKickoffsEnabled}}getSnapshot(){return this.getState()}getTimelineDuration(){return this.getTimelineSegments().length===0?this.replay.duration:this.timelineDurationCache}getTimelineCurrentTime(){return this.projectReplayTimeToTimeline(this.currentTime).timelineTime}getTimelineSegments(){const e=`${this.skipPostGoalTransitionsEnabled}:${this.skipKickoffsEnabled}`;return this.timelineSegmentsCacheKey===e?this.timelineSegmentsCache:(this.timelineSegmentsCacheKey=e,this.timelineSegmentsCache=this.computeTimelineSegments(),this.timelineDurationCache=Math.max(0,this.replay.duration-this.timelineSegmentsCache.reduce((t,i)=>t+(i.endTime-i.startTime),0)),this.timelineSegmentsCache)}projectReplayTimeToTimeline(e){return rT(this.replay.duration,this.getTimelineSegments(),e)}projectTimelineTimeToReplay(e){return oT(this.replay.duration,this.getTimelineDuration(),this.getTimelineSegments(),e)}clampReplayTime(e){return mt.clamp(e,0,this.replay.duration)}getPlaybackEndTime(){return lT(this.replay.duration,this.getTimelineSegments())}subscribe(e){const t=i=>{e(i.detail)};return this.addEventListener("change",t),e(this.getState()),()=>{this.removeEventListener("change",t)}}onBeforeRender(e){return this.beforeRenderCallbacks.push(e),()=>{const t=this.beforeRenderCallbacks.indexOf(e);t>=0&&this.beforeRenderCallbacks.splice(t,1)}}addPlugin(e){return this.installPlugin(e,!0)}removePlugin(e){const t=this.plugins.findIndex(a=>a.plugin.id===e);if(t<0)return!1;const[i]=this.plugins.splice(t,1);return i.plugin.teardown?.(this.createPluginContext()),this.render(),!0}getPlugins(){return this.plugins.map(e=>e.plugin)}destroy(){for(this.playing&&this.pause(),this.disposed=!0,this.animationFrameId!==null&&(cancelAnimationFrame(this.animationFrameId),this.animationFrameId=null),this.resizeObserver?(this.resizeObserver.disconnect(),this.resizeObserver=null):window.removeEventListener("resize",this.boundWindowResize);this.plugins.length>0;)this.plugins.pop()?.plugin.teardown?.(this.createPluginContext());this.sceneState.dispose()}dispose(){this.destroy()}installResizeHandling(){if(typeof ResizeObserver<"u"){this.resizeObserver=new ResizeObserver(()=>{this.sceneState.resize()}),this.resizeObserver.observe(this.container);return}window.addEventListener("resize",this.boundWindowResize)}scheduleAnimationFrame(){this.animationFrameId!==null||this.disposed||(this.animationFrameId=requestAnimationFrame(this.tick))}reanchorPlaybackClock(e=performance.now()){this.playbackStartedAt=e,this.playbackStartedTime=this.currentTime}syncPlaybackClock(e=performance.now()){if(!this.playing)return!1;const t=(e-this.playbackStartedAt)/1e3,i=mt.clamp(this.playbackStartedTime+t*this.speed,0,this.getPlaybackEndTime()),a=i!==this.currentTime;return this.currentTime=i,a}tick=e=>{if(this.animationFrameId=null,this.disposed)return;let t=!1;this.playing&&(t=this.syncPlaybackClock(e),t=this.skipPostGoalTransitionIfNeeded(e)||t,t=this.skipPastKickoffIfNeeded(e)||t,this.currentTime>=this.getPlaybackEndTime()&&(this.playing=!1,t=!0)),this.render(),t&&this.emitChange(),this.scheduleAnimationFrame()};render(){const e=dT(this.replay,this.currentTime),t=e.frameIndex,i=this.replay.ballFrames[t]??null,a=this.replay.ballFrames[e.nextFrameIndex]??i,s=np(i?.position??null,a?.position??null,e.alpha),r=s?Ag(s,this.fieldScale):null,o=[];s?(this.sceneState.ballMesh.visible=!0,this.sceneState.ballMesh.position.copy(Oc(s)),i?.rotation?this.sceneState.ballMesh.quaternion.set(i.rotation.x,i.rotation.y,i.rotation.z,i.rotation.w):this.sceneState.ballMesh.quaternion.identity()):this.sceneState.ballMesh.visible=!1;for(const[d,u]of this.replay.players.entries()){const h=this.sceneState.playerMeshes.get(u.id),f=this.sceneState.playerBoostTrails.get(u.id),g=this.sceneState.playerBoostMeters.get(u.id),_=this.sceneState.playerDemoIndicators.get(u.id),m=u.frames[t]??null,p=u.frames[e.nextFrameIndex]??m;let S=null,x=null,y=0;if(!h){_&&(_.group.visible=!1),o.push({track:u,mesh:null,boostTrail:f??null,frame:m,nextFrame:p,interpolatedPosition:x,boostFraction:y});continue}if(S=np(m?.position??null,p?.position??null,e.alpha),!S){h.visible=!1,f&&(f.visible=!1),g&&(g.group.visible=!1),_&&(_.group.visible=!1),o.push({track:u,mesh:h,boostTrail:f??null,frame:m,nextFrame:p,interpolatedPosition:x,boostFraction:y});continue}if(!NT(m)){h.visible=!1,f&&(f.visible=!1),g&&(g.group.visible=!1),this.updateDemoIndicator(u.id,_??null,S),o.push({track:u,mesh:h,boostTrail:f??null,frame:m,nextFrame:p,interpolatedPosition:x,boostFraction:y});continue}h.visible=!0,_&&(_.group.visible=!1),x=S,h.position.copy(Oc(S)),m?.rotation?h.quaternion.set(m.rotation.x,m.rotation.y,m.rotation.z,m.rotation.w):h.quaternion.identity();const M=m?.boostFraction??0,T=p?.boostFraction??M;if(y=mt.lerp(M,T,e.alpha),f){const A=(e.alpha>=.5?p?.boostActive:m?.boostActive)??m?.boostActive??p?.boostActive??!1;this.updateBoostTrail(f,A,y,this.currentTime,d)}g&&(this.boostMeterEnabled?(g.group.visible=!0,KM(g,y,mt.lerp(m?.boostAmount??0,p?.boostAmount??m?.boostAmount??0,e.alpha),this.sceneState.camera)):g.group.visible=!1),o.push({track:u,mesh:h,boostTrail:f??null,frame:m,nextFrame:p,interpolatedPosition:x,boostFraction:y})}RT({sceneState:this.sceneState,replay:this.replay,fieldScale:this.fieldScale,cameraViewMode:this.cameraViewMode,attachedPlayerId:this.attachedPlayerId,ballCamEnabled:this.ballCamEnabled,cameraDistanceScale:this.cameraDistanceScale,customCameraSettings:this.customCameraSettings,frameIndex:t,ballPosition:r,desiredCameraPosition:this.desiredCameraPosition,desiredLookTarget:this.desiredLookTarget}),this.cameraViewMode==="free"&&this.freeCameraTransition&&AT({sceneState:this.sceneState,...this.freeCameraTransition})&&(this.freeCameraTransition=null),this.sceneState.controls.update(),this.sceneState.updateWallVisibility();const l={frameIndex:e.frameIndex,nextFrameIndex:e.nextFrameIndex,alpha:e.alpha,currentTime:this.currentTime};for(const d of this.beforeRenderCallbacks)d(l);const c=this.createRenderContext(l,i,a,r,o);for(const d of this.plugins)d.plugin.beforeRender?.(c);this.sceneState.renderer.render(this.sceneState.scene,this.sceneState.camera)}skipPastKickoffIfNeeded(e){if(!this.skipKickoffsEnabled)return!1;const t=Xs(this.replay,this.currentTime),i=this.replay.frames[t];if(!i||!oh(i,this.kickoffGameState))return!1;const a=this.replay.frames.find((s,r)=>r>t&&Mg(s,this.liveGameState));return!a||a.time===this.currentTime?!1:(this.currentTime=a.time,this.playing&&this.reanchorPlaybackClock(e),!0)}skipPostGoalTransitionIfNeeded(e){if(!this.skipPostGoalTransitionsEnabled)return!1;const t=Xs(this.replay,this.currentTime),i=this.replay.frames[t];if(!i||!Oo(this.replay,i,t,this.liveGameState,this.kickoffGameState))return!1;const a=this.replay.frames.find((s,r)=>r>t&&!Oo(this.replay,s,r,this.liveGameState,this.kickoffGameState));if(!a){let s=t;for(;s>0&&Oo(this.replay,this.replay.frames[s-1],s-1,this.liveGameState,this.kickoffGameState);)s-=1;const r=this.replay.frames[s]?.time;return r===void 0||r===this.currentTime?!1:(this.currentTime=r,this.playing&&this.reanchorPlaybackClock(e),!0)}return a.time===this.currentTime?!1:(this.currentTime=a.time,this.playing&&this.reanchorPlaybackClock(e),!0)}getActiveMetadata(e,t){return cT(this.replay,e,t)}computeTimelineSegments(){return sT(this.replay,this.skipPostGoalTransitionsEnabled,this.skipKickoffsEnabled,this.liveGameState,this.kickoffGameState)}installPlugin(e,t){const i=typeof e=="function"?e():e;if(this.plugins.some(s=>s.plugin.id===i.id))throw new Error(`Replay player plugin "${i.id}" is already installed`);const a={definition:e,plugin:i};return this.plugins.push(a),i.setup?.(this.createPluginContext()),i.onStateChange?.(this.createPluginStateContext(this.getState())),t&&this.render(),()=>{const s=this.plugins.indexOf(a);s<0||(this.plugins.splice(s,1),i.teardown?.(this.createPluginContext()),this.render())}}createPluginContext(){return{player:this,replay:this.replay,scene:this.sceneState,container:this.container,options:this.options}}createPluginStateContext(e){return{...this.createPluginContext(),state:e}}createRenderContext(e,t,i,a,s){return{...this.createPluginStateContext(this.getState()),...e,frame:this.replay.frames[e.frameIndex]??null,nextFrame:this.replay.frames[e.nextFrameIndex]??null,ballFrame:t,nextBallFrame:i,ballPosition:a,players:s}}emitChange(){const e=this.getState(),t=this.createPluginStateContext(e);for(const i of this.plugins)i.plugin.onStateChange?.(t);this.dispatchEvent(new CustomEvent("change",{detail:e}))}getActiveDemoEvent(e,t){for(let i=this.replay.timelineEvents.length-1;i>=0;i-=1){const a=this.replay.timelineEvents[i],s=t-a.time;if(!(s<0)){if(s>ip)break;if(a.kind==="demo"&&a.secondaryPlayerId===e)return a}}return null}updateDemoIndicator(e,t,i){if(!t)return;const a=this.getActiveDemoEvent(e,this.currentTime),s=a?.location??i;if(!a||!s){t.group.visible=!1;return}const r=Math.max(0,this.currentTime-a.time),o=this.currentTime*8,l=1+.08*Math.sin(o);t.group.visible=!0,t.group.position.copy(Oc(s)),t.ring.rotation.z=o*.15,t.ring.scale.setScalar(l),t.label.quaternion.copy(this.sceneState.camera.quaternion),t.label.scale.setScalar(1+.04*Math.sin(o+1.3));const c=mt.clamp(1-r/ip,.28,1);for(const d of[t.ring,t.label]){const u=d.material;u instanceof wi&&(u.opacity=c)}}updateBoostTrail(e,t,i,a,s){if(!t){e.visible=!1;return}e.visible=!0;const r=a*36+s*1.7,o=.86+.14*Math.sin(r),l=mt.clamp(.62+i*.88,.62,1.5),c=l*(1.02+o*.52),d=1.02+l*.28;e.scale.set(c,d,d);for(const[u,h]of e.children.entries()){const f=h,g=.92+.14*Math.sin(r+u*.85);f.scale.setScalar(g),f.traverse(_=>{if(!(_ instanceof He))return;const m=_.material;if(m instanceof rt)switch(_.name){case"outer-flame":m.opacity=.24+l*.24;break;case"inner-flame":m.opacity=.58+l*.3;break;case"glow":m.opacity=.4+l*.26;break}})}}}const DT="https://ballchasing.com",UT=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;function FT(n,e){const i=(e instanceof URL?e.href:e).replace(/\/+$/,"");return new URL(`${i}/${n.replace(/^\/+/,"")}`)}function ap(n){return UT.test(n.trim())}function lh(n){const e=n.trim();if(ap(e))return e.toLowerCase();let t;try{t=new URL(e)}catch{throw new Error(`Invalid Ballchasing replay id: ${n}`)}if(!/(^|\.)ballchasing\.com$/i.test(t.hostname))throw new Error(`Invalid Ballchasing replay URL: ${n}`);const i=t.pathname.split("/").filter(Boolean),a=i.findIndex(o=>o==="replay"),s=i.findIndex(o=>o==="replays"),r=a>=0?i[a+1]:s>=0?i[s+1]:void 0;if(!r||!ap(r))throw new Error(`Invalid Ballchasing replay URL: ${n}`);return r.toLowerCase()}function kT(n){return`ballchasing-${lh(n)}.replay`}function OT(n,e=DT){const t=lh(n);return FT(`dl/replay/${encodeURIComponent(t)}`,e)}const sp="subtr-actor-ballchasing-overlay-styles",BT="#3b82f6",zT="#f59e0b";function HT(){if(document.getElementById(sp))return;const n=document.createElement("style");n.id=sp,n.textContent=`
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
      border-bottom: 2px solid ${BT};
    }

    .sap-bc-team-hud-orange {
      left: calc(50% + 2.7rem);
      flex-direction: row;
      justify-content: flex-start;
      border-bottom: 2px solid ${zT};
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
  `,document.head.append(n)}function GT(n,e){const t=n.players[e],i=t.frame?.boostAmount??0,a=t.nextFrame?.boostAmount??i;return mt.lerp(i,a,n.alpha)}function rp(n,e,t,i){if(!n||!e)return;const a=Math.max(0,Math.min(100,Math.round(t/255*100)));n.style.width=`${a}%`,e.textContent=`${a} ${i}`}function op(n,e,t,i){if(!n)return;const a=()=>{e.player.setAttachedPlayer(t)};n.classList.add("sap-bc-player-selectable"),n.tabIndex=0,n.setAttribute("role","button"),n.setAttribute("aria-label",`Follow ${i}`),n.title=`Follow ${i}`,n.addEventListener("click",a),n.addEventListener("keydown",s=>{s.key!=="Enter"&&s.key!==" "||(s.preventDefault(),a())})}function VT(n,e,t,i,a){if(n.getWorldPosition(a),a.add(e),a.project(t),a.z<-1||a.z>1)return!1;const s=i.clientWidth||1,r=i.clientHeight||1;return a.x=(a.x+1)*s/2,a.y=(1-a.y)*r/2,!(a.x<-80||a.x>s+80||a.y<-80||a.y>r+80)}function $T(n={}){const e=n.showFloatingNames??!0,t=n.showFloatingBoostBars??!0,i=n.showTeamBoostHud??!0;let a=null,s=null,r=null,o=null,l=!1,c="";const d=new Map,u=new L,h=new L(0,0,255);function f(_){for(const[m,p]of d.entries()){const S=m===_;p.floatingRoot?.classList.toggle("sap-bc-player-following",S),p.teamHudEntry?.classList.toggle("sap-bc-player-following",S),p.floatingRoot?.setAttribute("aria-pressed",S?"true":"false"),p.teamHudEntry?.setAttribute("aria-pressed",S?"true":"false")}}function g(_,m){HT(),getComputedStyle(m).position==="static"&&(l=!0,c=m.style.position,m.style.position="relative"),a=document.createElement("div"),a.className="sap-bc-overlay-root",e||t?(s=document.createElement("div"),s.className="sap-bc-floating-layer",a.append(s)):s=null,i?(r=document.createElement("div"),r.className="sap-bc-team-hud sap-bc-team-hud-blue",o=document.createElement("div"),o.className="sap-bc-team-hud sap-bc-team-hud-orange",a.append(r,o)):(r=null,o=null);for(const p of _.replay.players){let S=null,x=null,y=null,C=null;s&&(S=document.createElement("div"),S.className="sap-bc-floating-track",S.hidden=!0,(e||t)&&(x=document.createElement("div"),x.className=`sap-bc-boost-bar ${p.isTeamZero?"sap-bc-boost-bar-blue":"sap-bc-boost-bar-orange"}`,y=document.createElement("div"),y.className=`sap-bc-boost-fill ${p.isTeamZero?"sap-bc-boost-fill-blue":"sap-bc-boost-fill-orange"}`,C=document.createElement("span"),C.className="sap-bc-boost-text",x.append(y,C),S.append(x)),op(S,_,p.id,p.name),s.append(S));let M=null,T=null,A=null;if(i){M=document.createElement("div"),M.className="sap-bc-hud-player";const v=document.createElement("div");v.className=`sap-bc-hud-boost-bar ${p.isTeamZero?"sap-bc-boost-bar-blue":"sap-bc-boost-bar-orange"}`,T=document.createElement("div"),T.className=`sap-bc-hud-boost-fill ${p.isTeamZero?"sap-bc-boost-fill-blue":"sap-bc-boost-fill-orange"}`,A=document.createElement("span"),A.className="sap-bc-hud-boost-text",v.append(T,A),M.append(v),op(M,_,p.id,p.name),(p.isTeamZero?r:o)?.append(M)}d.set(p.id,{floatingRoot:S,floatingBoostFill:y,floatingBoostText:C,teamHudEntry:M,teamHudFill:T,teamHudText:A})}h.set(0,0,255*(_.options.fieldScale??1)),m.append(a),f(_.player.getState().attachedPlayerId)}return{id:"ballchasing-overlay",setup(_){g(_,_.container)},onStateChange(_){f(_.state.attachedPlayerId)},teardown(_){a?.remove(),a=null,s=null,r=null,o=null,d.clear(),l&&(_.container.style.position=c,l=!1)},beforeRender(_){if(a)for(const[m,p]of _.players.entries()){const S=d.get(p.track.id);if(!S)continue;const x=GT(_,m);rp(S.floatingBoostFill,S.floatingBoostText,x,p.track.name),rp(S.teamHudFill,S.teamHudText,x,p.track.name);const y=p.mesh,C=y!==null&&p.interpolatedPosition!==null;if(S.teamHudEntry?.classList.toggle("sap-bc-hud-player-inactive",!C),!!S.floatingRoot){if(!C||!VT(y,h,_.scene.camera,_.container,u)){S.floatingRoot.hidden=!0;continue}S.floatingRoot.hidden=!1,S.floatingRoot.style.transform=`translate(${u.x.toFixed(1)}px, ${u.y.toFixed(1)}px) translate(-50%, -100%)`}}}}}function Hc(n){n.depthTest=!1,n.depthWrite=!1,n.transparent=!0,n.polygonOffset=!0,n.polygonOffsetFactor=-2,n.polygonOffsetUnits=-2,n.forceSinglePass=!0}const os=6,WT=.6;function Or(n){return n*WT}function XT(n){return Or(n.size==="big"?150:92)}function Cg(n){return Or(n.size==="big"?155:46)}function qT(n){return Or(n.size==="big"?34:14)}function Rg(n){return os+qT(n)+Cg(n)}function Pg(n){return n.size==="big"?Rg(n):os+Or(1.2)}function Lg(n){return n.size==="big"?Rg(n):os+Or(.8)}function YT(n){return n.size==="big"?16096779:16436245}function ZT(n){const e=XT(n),t=YT(n),i=Cg(n),a=n.size==="big",s=new _t;s.position.set(n.position.x,n.position.y,n.position.z),s.renderOrder=20,s.frustumCulled=!1;const r=new He(new Aa(e*.72,e,24),new rt({color:t,transparent:!0,opacity:.92,side:Qe,depthWrite:!1}));Hc(r.material),r.position.z=os,r.renderOrder=20,r.frustumCulled=!1,s.add(r);const o=new He(new Qa(e*.58,24),new rt({color:t,transparent:!0,opacity:.3,side:Qe,depthWrite:!1}));Hc(o.material),o.position.z=os+.5,o.renderOrder=21,o.frustumCulled=!1,s.add(o);const l=new He(new Qa(e*.42,20),new rt({color:16777215,transparent:!0,opacity:.22,side:Qe,depthWrite:!1}));Hc(l.material),l.position.z=os+1,l.renderOrder=22,l.frustumCulled=!1,s.add(l);const c=new He(a?new _s(i,32,18):new Qa(i*.9,24),a?new ll({color:t,emissive:new Ke(t),emissiveIntensity:.6,shininess:88,specular:new Ke(16773826),transparent:!0,opacity:.92,depthWrite:!1}):new rt({color:t,transparent:!0,opacity:.88,side:Qe,blending:ki,depthWrite:!1}));c.position.z=Pg(n),c.renderOrder=23,c.frustumCulled=!1,s.add(c);const d=new He(a?new _s(i*1.36,32,14):new Qa(i*1.35,28),new rt({color:t,transparent:!0,opacity:a?.2:.16,side:Qe,blending:ki,depthWrite:!1}));return d.position.z=Lg(n),d.renderOrder=24,d.frustumCulled=!1,s.add(d),{group:s,ring:r,core:o,cooldown:l,orb:c,glow:d}}function KT(n,e){let t=-1;for(let s=0;s<n.events.length&&!(n.events[s].time>e);s+=1)t=s;if(t<0)return{available:!0,progress:1};const i=n.events[t];if(i.available)return{available:!0,progress:1};const a=n.events.slice(t+1).find(s=>s.available);return!a||a.time<=i.time?{available:!1,progress:0}:{available:!1,progress:mt.clamp((e-i.time)/(a.time-i.time),0,1)}}function jT(n,e,t,i){const{available:a,progress:s}=KT(e,t),r=e.size==="big",o=.92+.08*Math.sin(t*6+e.index*.45),l=.96+.04*Math.sin(t*(r?4.8:7.2)+e.index*.37),c=r?Math.sin(t*2.2+e.index*.61)*18:0,d=Pg(e)+c,u=Lg(e)+c;if(n.orb.position.z=d,n.glow.position.z=u,n.orb.rotation.z=t*(r?.9:1.25),n.glow.rotation.z=-t*.45,a){n.group.visible=!0,n.ring.material.opacity=.95,n.core.material.opacity=r?.56:.5,n.cooldown.visible=!1,n.ring.scale.setScalar(o),n.core.scale.setScalar(1),n.orb.visible=!0,n.glow.visible=!0,n.orb.material.opacity=r?.96:.9,n.glow.material.opacity=(r?.2:.16)+(l-.96),n.orb.scale.setScalar(l),n.glow.scale.setScalar(r?1.02+(l-.96)*2:1);return}if(n.group.visible=!0,n.ring.material.opacity=.18,n.core.material.opacity=.07,n.ring.scale.setScalar(1),n.core.scale.setScalar(1),n.orb.visible=!1,n.glow.visible=!1,n.cooldown.visible=i,i){const h=.3+s*.7;n.cooldown.scale.setScalar(h),n.cooldown.material.opacity=.16+s*.2}}function JT(n={}){const e=n.showCooldownProgress??!0;let t=null;const i=new Map;function a(r){t=new _t,t.name="boost-pad-overlay",t.renderOrder=20,t.frustumCulled=!1;for(const o of r.replay.boostPads){const l=ZT(o);t.add(l.group),i.set(o.index,l)}r.scene.replayRoot.add(t)}function s(r){for(const o of r.replay.boostPads){const l=i.get(o.index);l&&jT(l,o,r.state.currentTime,e)}}return{id:"boost-pad-overlay",setup(r){a(r),s({...r,state:r.player.getState()})},onStateChange(r){s(r)},teardown(){t?.removeFromParent(),t=null,i.clear()}}}const QT=1.35,e1="#57a8ff",t1="#ff9c40",n1=256,i1=160,a1=360,s1=225,r1=260,o1=430,Ng=18,lp=120;function l1(n){return n?e1:t1}function c1(n){return n.events.filter(e=>!e.available&&e.playerId)}function Ig(n,e){const t=document.createElement("canvas");t.width=n1,t.height=i1;const i=t.getContext("2d");if(!i)throw new Error("Unable to create boost pickup count canvas");i.clearRect(0,0,t.width,t.height),i.textAlign="center",i.textBaseline="middle",i.lineJoin="round",i.font="800 124px sans-serif",i.lineWidth=18,i.strokeStyle="rgba(4, 10, 18, 0.88)",i.strokeText(`${n}`,t.width/2,t.height/2),i.fillStyle=e,i.fillText(`${n}`,t.width/2,t.height/2);const a=new Il(t);return a.colorSpace=Yt,a.needsUpdate=!0,a}function d1(n){n?.dispose()}function u1(n){const e=new _t;e.visible=!1,e.renderOrder=60,e.frustumCulled=!1;const t=Ig(1,n),i=new ig({map:t,transparent:!0,depthTest:!1,depthWrite:!1}),a=new sg(i);a.scale.set(a1,s1,1),a.renderOrder=62,a.frustumCulled=!1,e.add(a);const s=new rt({color:n,transparent:!0,opacity:0,side:Qe,depthTest:!1,depthWrite:!1,blending:ki}),r=new He(new Aa(lp*.72,lp,36),s);return r.position.z=Ng,r.renderOrder=61,r.frustumCulled=!1,e.add(r),{group:e,textMaterial:i,ringMaterial:s}}function h1(n,e){n.currentCount!==e&&(d1(n.textMaterial.map),n.textMaterial.map=Ig(e,n.color),n.textMaterial.needsUpdate=!0,n.currentCount=e)}function f1(n){const e=new Map;for(const a of n.replay.players)e.set(a.id,a);const t=[];for(const a of n.replay.boostPads)for(const s of c1(a))t.push({pad:a,event:s});t.sort((a,s)=>a.event.time!==s.event.time?a.event.time-s.event.time:a.event.frame!==s.event.frame?a.event.frame-s.event.frame:a.pad.index-s.pad.index);const i=[];for(const{pad:a,event:s}of t){if(!s.playerId)continue;const r=e.get(s.playerId);if(!r)continue;const o=l1(r.isTeamZero),{group:l,textMaterial:c,ringMaterial:d}=u1(o);l.position.copy(a.position),n.scene.replayRoot.add(l),i.push({time:s.time,pad:a,event:s,player:r,color:o,currentCount:1,position:new L(a.position.x,a.position.y,a.position.z),size:a.size,group:l,textMaterial:c,ringMaterial:d})}return i}function p1(n,e,t){const i=mt.clamp(e/t,0,1),a=1-Math.pow(1-i,3),s=i*i,r=n.size==="big"?o1:r1,o=n.size==="big"?360:280,l=1+Math.sin(i*Math.PI)*.22;n.group.visible=!0,n.group.position.set(n.position.x,n.position.y,n.position.z+r+a*o),n.group.scale.setScalar(l),n.textMaterial.opacity=Math.max(0,1-s),n.ringMaterial.opacity=Math.max(0,.48*(1-i));const c=n.group.children[1];if(c){const d=.75+a*(n.size==="big"?2.8:1.85);c.scale.setScalar(d),c.position.z=Ng-r-a*o}}function m1(n={}){const e=Math.max(.1,n.durationSeconds??QT);let t=[];function i(s){return n.includePickup?.({pad:s.pad,event:s.event,player:s.player})??!0}function a(){for(const s of t)s.group.visible=!1}return{id:"boost-pickup-animation",setup(s){t=f1(s)},beforeRender(s){if(!s.state.boostPickupAnimationEnabled){a();return}const r=s.currentTime-e,o=new Map;for(const l of t){if(l.time>s.currentTime){l.group.visible=!1;continue}if(!i(l)){l.group.visible=!1;continue}const c=(o.get(l.player.id)??0)+1;if(o.set(l.player.id,c),l.time<r){l.group.visible=!1;continue}h1(l,c),p1(l,s.currentTime-l.time,e)}},teardown(){for(const s of t)s.group.removeFromParent(),s.group.traverse(r=>{(r instanceof He||r instanceof sg)&&r.geometry?.dispose()}),s.textMaterial.map?.dispose(),s.textMaterial.dispose(),s.ringMaterial.dispose();t=[]}}}const g1=60,_1=["video/webm;codecs=vp9","video/webm;codecs=vp8","video/webm"];function v1(n){if(n&&MediaRecorder.isTypeSupported(n))return n;for(const e of _1)if(MediaRecorder.isTypeSupported(e))return e;return""}function y1(n){return n instanceof Error?n.message:String(n)}function b1(n={}){let e=null,t=null,i=[],a=null,s=0,r=0,o="",l=0,c=null,d=null,u=null,h=null,f=!1,g=null;const _=new Set;function m(){return{state:t?t.state==="recording"?"recording":"stopping":c?"error":a?"ready":"idle",elapsedSeconds:r,mimeType:o,sizeBytes:l,error:c}}function p(){const M=m();n.onStatusChange?.(M);for(const T of _)T(M)}function S(){if(!e)throw new Error("Canvas recorder plugin is not installed");return e}function x(M){t=null,h=null,f=!1,a=M,l=M?.size??0,g&&e&&e.player.setState({currentTime:g.currentTime,speed:g.speed,playing:g.playing}),g=null,M&&n.onComplete?.(M),p(),u?.(M),u=null,d=null}function y(M){c=y1(M),t=null,h=null,f=!1,g=null,p(),u?.(null),u=null,d=null}const C={id:"canvas-recorder",setup(M){e=M},beforeRender(M){t?.state==="recording"&&(r=(performance.now()-s)/1e3,p()),t?.state==="recording"&&h!==null&&M.currentTime>=h&&C.stop()},onStateChange(M){f&&t?.state==="recording"&&!M.state.playing&&r>0&&C.stop()},teardown(){t?.state==="recording"&&t.stop(),e=null,t=null,h=null,f=!1,g=null,u?.(null),u=null,d=null,_.clear()},start(M={}){const T=S();if(t?.state==="recording")throw new Error("Canvas recording is already in progress");if(typeof MediaRecorder>"u")throw new Error("MediaRecorder is not available in this browser");const A=T.scene.renderer.domElement;if(!A.captureStream)throw new Error("Canvas captureStream is not available in this browser");c=null,a=null,i=[],l=0,r=0,s=performance.now(),o=v1(M.mimeType??n.mimeType);const v=Math.max(1,M.fps??n.fps??g1),b=A.captureStream(v);t=new MediaRecorder(b,{mimeType:o,videoBitsPerSecond:M.videoBitsPerSecond??n.videoBitsPerSecond}),d=new Promise(R=>{u=R}),t.addEventListener("dataavailable",R=>{R.data.size>0&&(i.push(R.data),l+=R.data.size,p())}),t.addEventListener("stop",()=>{b.getTracks().forEach(R=>R.stop()),x(new Blob(i,{type:o||"video/webm"}))},{once:!0}),t.addEventListener("error",R=>{b.getTracks().forEach(I=>I.stop()),y(R.error??R)},{once:!0}),t.start(1e3),p()},stop(){if(!t)return Promise.resolve(a);if(t.state==="inactive")return d??Promise.resolve(a);const M=d??new Promise(T=>{u=T});return t.stop(),p(),M},clear(){if(t?.state==="recording")throw new Error("Cannot clear a recording while recording is in progress");a=null,i=[],l=0,r=0,c=null,p()},getRecording(){return a},getStatus(){return m()},subscribe(M){return _.add(M),M(m()),()=>{_.delete(M)}},recordRange(M={}){const T=S(),A=T.player.getState();(M.restorePlaybackState??!0)&&(g=A);const v=M.playbackRate??A.speed,b=M.startTime??A.currentTime;h=M.endTime??A.duration,f=!0,T.player.setState({currentTime:b,speed:v,playing:!1}),C.start(M);const R=d;return T.player.play(),(R??Promise.resolve(null)).then(I=>{if(!I)throw new Error("Recording stopped without producing a video");return I})},recordFullReplay(M={}){return C.recordRange({...M,startTime:M.startTime??0,endTime:M.endTime??S().replay.duration})}};return C}const cp="subtr-actor-timeline-overlay-styles",x1=new Set(["goal","save"]),w1=.2,S1=2,E1=4,M1=.01,dp=.01;function T1(){if(document.getElementById(cp))return;const n=document.createElement("style");n.id=cp,n.textContent=`
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
  `,document.head.append(n)}function Jd(n){if(!Number.isFinite(n))return"--:--.--";const e=Math.max(0,n),t=Math.floor(e/60),i=Math.floor(e%60),a=Math.floor((e-Math.floor(e))*100);return`${t}:${String(i).padStart(2,"0")}.${String(a).padStart(2,"0")}`}function up(n){switch(n.kind){case"goal":return 5;case"demo":return 4;case"save":return 3;case"assist":return 2;case"shot":return 1;default:return 0}}function A1(n){switch(n.kind){case"goal":case"goal-context":case"goal-tag":return E1;default:return S1}}function ch(n){return n.seekTime!==void 0&&Number.isFinite(n.seekTime)?Math.max(0,n.seekTime):Number.isFinite(n.time)?Math.max(0,n.time-A1(n)):0}function C1(n){if(n.color)return n.color;if(n.isTeamZero===!0)return"#3b82f6";if(n.isTeamZero===!1)return"#f59e0b";switch(n.kind){case"goal":return"#f5f7fa";case"demo":return"#ef4444";case"save":return"#34d399";case"assist":return"#c084fc";case"shot":return"#60a5fa";default:return"#d1d9e0"}}function R1(n){if(n.events.length>1)return`${n.events.length}`;const e=n.events[0];return e?e.shortLabel&&e.shortLabel.trim()!==""?e.shortLabel.slice(0,3).toUpperCase():e.kind.slice(0,1).toUpperCase():""}function P1(n){return n.events.map(e=>`${Jd(e.time)} ${e.label??e.kind}`).join(`
`)}function Dg(n){const e=new Map;for(const t of n){const i=t.frame!==void 0?`frame:${t.frame}`:`time:${t.time.toFixed(2)}`,a=e.get(i);if(a){a.events.push(t);continue}e.set(i,{key:i,time:t.time,events:[t]})}return[...e.values()].map(t=>({...t,events:[...t.events].sort((i,a)=>{const s=up(a)-up(i);return s!==0?s:i.time-a.time})})).sort((t,i)=>t.time-i.time)}function Ug(n,e){return n?typeof n=="function"?n(e):n:[]}function L1(n,e){const t=[];for(const i of n){const a=Ug(i.source,e);a.length!==0&&t.push({key:i.key,label:i.label,buckets:Dg(a)})}return t}function N1(n,e){return n?typeof n=="function"?n(e):n:[]}function I1(n,e){const t=new Set,i=[];for(const a of n)for(const s of N1(a,e)){const r=s.id;if(r!==void 0){if(t.has(r))continue;t.add(r)}i.push(s)}return i}function D1(n){const e=new Map;for(const t of n){const i=t.lane??"default",a=t.laneLabel??t.lane??"",s=e.get(i);if(s){s.ranges.push(t);continue}e.set(i,{key:i,label:a,ranges:[t]})}return[...e.values()].map(t=>({...t,ranges:[...t.ranges].sort((i,a)=>i.startTime-a.startTime)}))}function U1(n){return n.color?n.color:n.isTeamZero===!0?"#3b82f6":n.isTeamZero===!1?"#f59e0b":"#d1d9e0"}function F1(n,e){if(n.replayEvents)return Ug(n.replayEvents,e);if(n.includeReplayEvents===!1)return[];const t=new Set(n.replayEventKinds??x1);return e.replay.timelineEvents.filter(i=>t.has(i.kind))}function k1(n,e){const t=e.player.projectReplayTimeToTimeline(ch(n));if(!t.hiddenBySkip)return t.seekTime;const i=Math.min(e.player.getTimelineDuration(),t.timelineTime+M1);return e.player.projectTimelineTimeToReplay(i)}function wo(n,e){return`${n/Math.max(e,1e-4)*100}%`}function O1(n,e,t){let i=n.timelineTime,a=e.timelineTime;return a<=i&&(n.hiddenBySkip||e.hiddenBySkip)&&(i>=t?(i=Math.max(0,t-dp),a=t):a=Math.min(t,i+dp)),{startTimelineTime:i,endTimelineTime:a}}function B1(n={}){const e=n.pauseWhileScrubbing??!0;let t=0;const i=n.events?[{key:"events:initial",label:n.eventsLabel??"Events",source:n.events}]:[],a=n.ranges?[n.ranges]:[];let s=null,r=null,o=null,l=null,c=null,d=null,u=null,h=null,f=null,g=null,_=null,m=null,p=!1,S="",x=!1,y=!1,C=null,M=[],T=[],A=null;const v=new Map,b=[],R=[],I=[];function O(){C&&(X(C),V({...C,state:C.player.getState()}))}function H(){C&&(G(C),V({...C,state:C.player.getState()}))}function V(q){if(!l||!c||!d||!u||!h||!f||!r)return;const ue=q.player.getTimelineCurrentTime(),Se=q.player.getTimelineDuration(),be=[Se.toFixed(4),q.state.skipKickoffsEnabled?"1":"0",q.state.skipPostGoalTransitionsEnabled?"1":"0"].join(":");A!==be&&(X(q),G(q),A=be),l.min="0",l.max=`${Se}`,l.step="0.01",l.value=`${Math.min(ue,Se)}`,c.dataset.playing=q.state.playing?"true":"false",c.setAttribute("aria-label",q.state.playing?"Pause replay":"Play replay"),c.title=q.state.playing?"Pause replay":"Play replay",d.textContent=q.state.playing?"||":">",u.textContent=q.state.playing?"Pause":"Play",h.textContent=Jd(ue),f.textContent=`-${Jd(Se-ue)}`,r.dataset.scrubbing=x?"true":"false";for(const k of v.values()){const Y=ue-k.timelineTime,ie=Y>=0&&Y<=w1;k.element.dataset.active=ie?"true":"false",k.element.dataset.passed=k.timelineTime<=ue?"true":"false"}for(const k of b){const Y=Math.max(0,k.startTimelineTime),ie=Math.min(Se,k.endTimelineTime);if(Math.max(0,ie-Y)<=1e-4){k.element.hidden=!0;continue}k.element.hidden=!1,k.element.dataset.active=ue>=Y&&ue<=ie?"true":"false"}const me=wo(Math.min(ue,Se),Se);for(const k of I)k.element.style.left=me;for(const k of R)k.element.style.left=me}function B(q,ue,Se){const be=q.events[0];if(!be)return null;const me=ue.player.projectReplayTimeToTimeline(q.time),k=document.createElement("button");return k.type="button",k.className="sap-tl-marker",k.style.left=wo(me.timelineTime,Se),k.style.color=C1(be),k.title=P1(q),k.textContent=R1(q),k.addEventListener("click",()=>{ue.player.seek(k1(be,ue))}),k.dataset.active="false",k.dataset.passed="false",v.set(q.key,{element:k,timelineTime:me.timelineTime}),k}function X(q){if(!_||!g)return;_.replaceChildren(),g.replaceChildren(),v.clear(),I.splice(0,I.length);const ue=F1(n,q);M=[],ue.length>0&&M.push({key:"replay",label:n.replayEventsLabel??"Replay",buckets:Dg(ue)}),M.push(...L1(i,q));const Se=Math.max(q.player.getTimelineDuration(),1e-4),be=M[0];if(be?.key==="replay")for(const k of be.buckets){const Y=B({...k,key:`${be.key}:${k.key}`},q,Se);Y&&_.append(Y)}const me=M.filter(k=>k.key!=="replay");g.hidden=me.length===0;for(const k of me){const Y=document.createElement("div");Y.className="sap-tl-event-lane",Y.dataset.label=k.label;const ie=document.createElement("span");ie.className="sap-tl-event-lane-label",ie.textContent=k.label,ie.setAttribute("aria-label",k.label),Y.append(ie);const we=document.createElement("div");we.className="sap-tl-event-lane-track";const ye=document.createElement("div");ye.className="sap-tl-markers";for(const ot of k.buckets){const N=B({...ot,key:`${k.key}:${ot.key}`},q,Se);N&&ye.append(N)}const Fe=document.createElement("div");Fe.className="sap-tl-event-playhead",we.append(ye,Fe),I.push({element:Fe}),Y.append(we),g.append(Y)}}function G(q){if(!o)return;o.replaceChildren(),b.splice(0,b.length),R.splice(0,R.length);const ue=I1(a,q).filter(be=>Number.isFinite(be.startTime)&&Number.isFinite(be.endTime)&&be.endTime>be.startTime);T=D1(ue);const Se=Math.max(q.player.getTimelineDuration(),1e-4);if(T.length===0){o.hidden=!0;return}o.hidden=!1;for(const be of T){const me=document.createElement("div");me.className="sap-tl-range-lane";const k=document.createElement("div");if(k.className="sap-tl-range-lane-track",be.label){me.dataset.label=be.label;const ie=document.createElement("span");ie.className="sap-tl-range-lane-label",ie.textContent=be.label,ie.setAttribute("aria-label",be.label),me.append(ie)}for(const ie of be.ranges){const we=q.player.projectReplayTimeToTimeline(ie.startTime),ye=q.player.projectReplayTimeToTimeline(ie.endTime),{startTimelineTime:Fe,endTimelineTime:ot}=O1(we,ye,Se),N=document.createElement("div");N.className="sap-tl-range-segment",ie.className&&N.classList.add(ie.className),N.style.background=U1(ie),N.title=ie.label??be.label,N.dataset.active="false",N.style.left=wo(Fe,Se),N.style.width=wo(Math.max(0,ot-Fe),Se),k.append(N),b.push({range:ie,element:N,startTimelineTime:Fe,endTimelineTime:ot})}const Y=document.createElement("div");Y.className="sap-tl-range-playhead",k.append(Y),R.push({element:Y}),me.append(k),o.append(me)}}function te(){x&&(x=!1,r?.setAttribute("data-scrubbing","false"),y&&C?.player.play(),y=!1)}function fe(){if(x||(x=!0,r?.setAttribute("data-scrubbing","true"),!e))return;const q=C?.player;q&&(y=q.getState().playing,y&&q.pause())}return{id:"timeline-overlay",addEventSource(q,ue={}){return i.push({key:ue.id??`events:${t++}`,label:ue.label??"Events",source:q}),O(),()=>{this.removeEventSource(q)}},removeEventSource(q){const ue=i.findIndex(Se=>Se.source===q);return ue<0?!1:(i.splice(ue,1),O(),!0)},refreshEvents(){O()},addRangeSource(q){return a.push(q),H(),()=>{this.removeRangeSource(q)}},removeRangeSource(q){const ue=a.indexOf(q);return ue<0?!1:(a.splice(ue,1),H(),!0)},refreshRanges(){H()},setup(q){C=q,T1(),getComputedStyle(q.container).position==="static"&&(p=!0,S=q.container.style.position,q.container.style.position="relative"),s=document.createElement("div"),s.className="sap-tl-root",r=document.createElement("div"),r.className="sap-tl-shell",r.dataset.scrubbing="false";const ue=document.createElement("div");ue.className="sap-tl-topline";const Se=document.createElement("div");Se.className="sap-tl-primary",c=document.createElement("button"),c.type="button",c.className="sap-tl-toggle sap-tl-track-toggle",d=document.createElement("span"),d.className="sap-tl-toggle-icon",d.setAttribute("aria-hidden","true"),d.textContent=">",u=document.createElement("span"),u.className="sap-tl-toggle-label",u.textContent="Play",c.append(d,u),c.addEventListener("click",()=>{q.player.togglePlayback()}),h=document.createElement("span"),h.className="sap-tl-current",h.textContent="0:00.00",f=document.createElement("span"),f.className="sap-tl-remaining",f.textContent="-0:00.00",Se.append(h),ue.append(Se,f);const be=document.createElement("div");be.className="sap-tl-track-wrap",o=document.createElement("div"),o.className="sap-tl-ranges",o.hidden=!0,g=document.createElement("div"),g.className="sap-tl-event-lanes",g.hidden=!0;const me=document.createElement("div");me.className="sap-tl-track-rail";const k=document.createElement("div");k.className="sap-tl-main-rail",_=document.createElement("div"),_.className="sap-tl-markers",l=document.createElement("input"),l.className="sap-tl-range",l.type="range",l.min="0",l.max=`${q.replay.duration}`,l.step="0.01",l.value="0";const Y=()=>{fe()},ie=()=>{l&&q.player.seek(q.player.projectTimelineTimeToReplay(Number(l.value)))},we=()=>{te()};l.addEventListener("pointerdown",Y),l.addEventListener("input",ie),l.addEventListener("change",we),window.addEventListener("pointerup",we),window.addEventListener("pointercancel",we),m=()=>{l?.removeEventListener("pointerdown",Y),l?.removeEventListener("input",ie),l?.removeEventListener("change",we),window.removeEventListener("pointerup",we),window.removeEventListener("pointercancel",we)},me.append(k,_,l),be.append(o,g,c,me),r.append(ue,be),s.append(r),q.container.append(s),X(q),G(q),V({...q,state:q.player.getState()})},onStateChange(q){C=q,V(q)},teardown(q){m?.(),m=null,te(),s?.remove(),s=null,r=null,o=null,g=null,l=null,c=null,d=null,u=null,h=null,f=null,_=null,C=null,M=[],T=[],A=null,v.clear(),b.splice(0,b.length),R.splice(0,R.length),I.splice(0,I.length),p&&(q.container.style.position=S,p=!1)}}}function z1(n){return`
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
              <button type="button" data-window-toggle="replay-loading">Replay loading</button>
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
              </section>
              <div class="mechanics-review-list-header">
                <span>Playlist</span>
                <span id="mechanics-review-count">0 items</span>
              </div>
              <div id="mechanics-review-list" class="mechanics-review-list"></div>
            </div>
          </section>

          <section
            class="floating-window floating-window-replay-loading"
            data-window-id="replay-loading"
            hidden
            style="--window-x: calc(100vw - 33rem); --window-y: 4.25rem;"
          >
            <header class="floating-window-header">
              <div>
                <h2>Replay loading</h2>
              </div>
              <button class="floating-window-hide" type="button" data-window-hide="replay-loading">
                Hide
              </button>
            </header>
            <div id="replay-loading-window-body" class="replay-loading-window-body">
              <div class="replay-loading-summary">
                <span id="replay-loading-summary">0 replays</span>
                <span id="replay-loading-active">Idle</span>
              </div>
              <div id="replay-loading-list" class="replay-loading-list"></div>
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
`}const dh=[{stage:"validating",index:1,total:8,label:"Parse replay",start:0,end:.08},{stage:"processing",index:2,total:8,label:"Process replay frames",start:.08,end:.62},{stage:"building-stats",index:3,total:8,label:"Build stats snapshots",start:.62,end:.7},{stage:"serializing-replay",index:4,total:8,label:"Serialize replay data",start:.7,end:.76},{stage:"serializing-stats",index:5,total:8,label:"Serialize stats timeline",start:.76,end:.86},{stage:"normalizing",index:6,total:8,label:"Normalize replay model",start:.86,end:.91},{stage:"decoding-replay",index:7,total:8,label:"Decode replay data",start:.91,end:.94},{stage:"decoding-stats",index:8,total:8,label:"Decode stats chunks",start:.94,end:.99}];function Fg(n){return Math.max(0,Math.min(1,n))}function Gc(n,e,t){if(n!==void 0)return Fg((n-e)/(t-e))}function uh(n){if(n.stage!=="stats-timeline")return n;const e=n.progress;return e===void 0?{...n,stage:"building-stats"}:e<.35?{...n,stage:"building-stats",progress:Gc(e,0,.35)}:e<.55?{...n,stage:"serializing-replay",progress:Gc(e,.35,.55)}:{...n,stage:"serializing-stats",progress:Gc(e,.55,.92)}}function kg(n){const e=uh(n);return dh.find(t=>t.stage===e.stage)}function H1(){return dh.map(({stage:n,index:e,total:t,label:i})=>({stage:n,index:e,total:t,label:i}))}function G1(n){const e=kg(n);return{stage:e.stage,index:e.index,total:e.total,label:e.label}}function V1(n){const e=uh(n),t=kg(e);return dh.map(({stage:i,index:a,total:s,label:r})=>{if(a<t.index)return{stage:i,index:a,total:s,label:r,state:"complete",completion:1,indeterminate:!1};if(a>t.index)return{stage:i,index:a,total:s,label:r,state:"pending",completion:0,indeterminate:!1};const o=e.progress!==void 0;return{stage:i,index:a,total:s,label:r,state:"active",completion:o?Fg(e.progress??0):1,indeterminate:!o}})}function Ms(n){const e=uh(n),t=e.progress===void 0?null:Math.round(e.progress*100);switch(e.stage){case"validating":return"Parsing replay...";case"processing":return t!==null&&e.totalFrames!==void 0?`Processing replay frames... ${t}% (${e.processedFrames??0}/${e.totalFrames})`:"Processing replay frames...";case"building-stats":return t!==null?e.totalFrames!==void 0?`Building stats snapshots... ${t}% (${e.processedFrames??0}/${e.totalFrames})`:`Building stats snapshots... ${t}%`:"Building stats snapshots...";case"serializing-replay":return t!==null?`Serializing replay data... ${t}%`:"Serializing replay data...";case"serializing-stats":return t!==null?`Serializing stats timeline... ${t}%`:"Serializing stats timeline...";case"decoding-replay":return t!==null?`Decoding replay data... ${t}%`:"Decoding replay data...";case"decoding-stats":return t!==null?e.totalChunks!==void 0?`Decoding stats chunks... ${t}% (${e.processedChunks??0}/${e.totalChunks})`:`Decoding stats chunks... ${t}%`:"Decoding stats chunks...";case"normalizing":return t!==null?`Normalizing replay model... ${t}%`:"Normalizing replay model...";default:return"Loading replay..."}}function qs(n,e){return JSON.parse(n.decode(new Uint8Array(e)))}async function $1(n,e,t){t?.({stage:"decoding-stats",progress:0});const i=qs(n,e.configBuffer);t?.({stage:"decoding-stats",progress:.05}),await ts();const a=qs(n,e.replayMetaBuffer);t?.({stage:"decoding-stats",progress:.1}),await ts();const s=qs(n,e.eventsBuffer);t?.({stage:"decoding-stats",progress:.15}),await ts();const r=[],o=e.frameChunkBuffers.length;for(let l=0;l<o;l+=1){const c=e.frameChunkBuffers[l];r.push(...qs(n,c)),t?.({stage:"decoding-stats",processedChunks:l+1,totalChunks:o,progress:.15+(l+1)/Math.max(1,o)*.85}),await ts()}return o===0&&t?.({stage:"decoding-stats",progress:1}),{config:i,replay_meta:a,events:s,frames:r}}function ts(){return typeof requestAnimationFrame!="function"?Promise.resolve():new Promise(n=>requestAnimationFrame(()=>n()))}async function kl(n,e={}){if(typeof Worker>"u")throw new Error("Replay loading worker is not available in this environment");const t=new Worker(new URL(""+new URL("replayLoader.worker-D4jOiD4n.js",import.meta.url).href,import.meta.url),{type:"module"}),i=n.slice(),a=e.reportEveryNFrames??100;return new Promise((s,r)=>{const o=()=>{t.terminate()};t.onmessage=async c=>{const d=c.data;if(d.type==="progress"){e.onProgress?.(d.progress);return}if(d.type==="error"){o(),r(new Error(d.error));return}o();const u=new TextDecoder;e.onProgress?.({stage:"decoding-replay",progress:0}),await ts();const h=qs(u,d.replayBuffer);e.onProgress?.({stage:"decoding-replay",progress:1}),await ts();const f=await $1(u,d.statsTimelineParts,e.onProgress);s({replay:h,statsTimeline:f})},t.onerror=c=>{o(),r(new Error(c.message||"Replay loading worker failed"))};const l={type:"load-replay",bytes:i.buffer,reportEveryNFrames:a};t.postMessage(l,[i.buffer])})}function W1(n){const e=document.createElement("div");e.className="replay-load-modal",e.hidden=!0;const t=document.createElement("div");t.className="replay-load-modal__dialog",t.setAttribute("role","dialog"),t.setAttribute("aria-modal","true"),t.setAttribute("aria-labelledby","replay-load-modal-title");const i=document.createElement("p");i.className="replay-load-modal__eyebrow",i.textContent="Replay loading";const a=document.createElement("h2");a.id="replay-load-modal-title",a.className="replay-load-modal__title",a.textContent="Preparing replay pipeline";const s=document.createElement("p");s.className="replay-load-modal__status",s.textContent="Preparing replay...";const r=document.createElement("div");r.className="replay-load-modal__phase-list";const o=new Map;for(const f of H1()){const g=document.createElement("div");g.className="replay-load-modal__phase-row",g.dataset.state="pending";const _=document.createElement("p");_.className="replay-load-modal__phase-label",_.textContent=`${f.index}. ${f.label}`;const m=document.createElement("div");m.className="replay-load-modal__phase-bar";const p=document.createElement("div");p.className="replay-load-modal__phase-fill",p.dataset.indeterminate="false",m.append(p),g.append(_,m),r.append(g),o.set(f.stage,{row:g,fill:p})}const l=document.createElement("p");l.className="replay-load-modal__meta",t.append(i,a,s,r,l),e.append(t),n.append(e);let c="";const d=()=>{for(const{row:f,fill:g}of o.values())f.dataset.state="pending",g.style.width="0%",g.dataset.indeterminate="false"},u=f=>{for(const g of V1(f)){const _=o.get(g.stage);_&&(_.row.dataset.state=g.state,_.fill.dataset.indeterminate=g.indeterminate?"true":"false",_.fill.style.width=`${Math.round(g.completion*100)}%`)}},h=f=>{e.hidden=!f};return{show(f,g="Preparing replay..."){c=f,h(!0),d(),a.textContent="Preparing replay pipeline",s.textContent=g,l.textContent=`Loading ${f}`},update(f){h(!0);const g=G1(f);if(u(f),a.textContent=`Phase ${g.index} of ${g.total}: ${g.label}`,s.textContent=Ms(f),f.stage==="processing"&&f.totalFrames!==void 0){l.textContent=`${f.processedFrames??0}/${f.totalFrames} frames`;return}if(f.stage==="decoding-stats"&&f.totalChunks!==void 0){l.textContent=`${f.processedChunks??0}/${f.totalChunks} chunks`;return}l.textContent=c?`Loading ${c}`:""},hide(){h(!1)},destroy(){e.remove()}}}const X1=236,Sr=4120,q1=2300,Y1=16185075,Z1=.18,K1=1118481,Bo=5882879,zo=16761180,j1=.55,Vc=.12,hp=.28,J1=3,Q1=4,fp=5,pp=2,eA=6,tA=856343,nA=.42,iA=18,aA=.24,sA=10,mp=220,rA=200,Og=140,oA=220,lA=100,cA=120;function dA(n){const e=rA/2;if(n){const a=-Sr+mp,s=-e;return{minX:a,maxX:s,centerX:(a+s)/2,width:s-a}}const t=e,i=Sr-mp;return{minX:t,maxX:i,centerX:(t+i)/2,width:i-t}}function uA(n,e,t){if(n.length<2)return[];const i=Math.min(...n),a=Math.max(...n),s=a-i,r=e?-1:1,o=-r;return s<=t?[{kind:"other",centerY:(i+a)/2,halfDepth:Math.max(t-s/2,t*.35),directions:[r,o]}]:[{kind:"back",centerY:e?i:a,halfDepth:t,directions:[r]},{kind:"forward",centerY:e?a:i,halfDepth:t,directions:[o]}]}function hA(n,e){const t=new nh;return t.moveTo(0,e/2),t.lineTo(n/2,-e/2),t.lineTo(-n/2,-e/2),t.closePath(),new Ul(t)}function gp(n){const e=lA*n,t=new rt({color:K1,transparent:!0,opacity:.9,side:Qe,depthWrite:!1,depthTest:!1}),i=new _t;i.visible=!1;const a=new ln(Og*.55*n,1),s=new He(a,t);s.position.z=fp,s.renderOrder=22,i.add(s);const r=hA(cA*n,e),o=new He(r,t);return o.position.z=fp,o.renderOrder=23,i.add(o),{group:i,shaftGeom:a,shaftMesh:s,headGeom:r,headMesh:o,material:t,headLength:e}}function $c(n,e,t,i){const a=Math.max(t-n.headLength,n.headLength*.2);n.group.position.x=e,n.group.rotation.z=i>0?0:Math.PI,n.shaftMesh.scale.y=a,n.shaftMesh.position.y=-n.headLength/2,n.headMesh.position.y=t/2-n.headLength/2,n.group.visible=!0}function dl(n){n.group.visible=!1}function Ka(n,e){const t=new _t;t.visible=!1;const i=new rt({color:Y1,transparent:!0,opacity:Z1,side:Qe,depthWrite:!1,depthTest:!1}),a=new ln(1,1),s=new He(a,i);s.position.z=J1,s.renderOrder=20,t.add(s);const r=new rt({color:e,transparent:!0,opacity:j1,side:Qe,depthWrite:!1,depthTest:!1}),o=new ln(1,1),l=new He(o,r);l.position.z=Q1,l.renderOrder=21,t.add(l);const c=gp(n),d=gp(n);return t.add(c.group),t.add(d.group),{group:t,floorGeom:a,floorMesh:s,floorMaterial:i,stripeGeom:o,stripeMesh:l,stripeMaterial:r,primaryMarker:c,secondaryMarker:d}}function fA(n){n.group.visible=!1,dl(n.primaryMarker),dl(n.secondaryMarker)}function pA(n,e,t,i){const a=e.halfDepth*2*i,s=Sr*2*i,r=t.width*i,o=t.centerX*i,l=Og*i,c=Math.max(a-32*i,n.primaryMarker.headLength*1.15),d=Math.min(c,Math.max(oA*i,a*.6));if(n.group.position.y=e.centerY*i,n.floorMesh.position.x=0,n.floorMesh.scale.set(s,a,1),n.stripeMesh.position.x=o,n.stripeMesh.scale.set(l,a,1),dl(n.primaryMarker),dl(n.secondaryMarker),e.directions.length===1)$c(n.primaryMarker,o,d,e.directions[0]);else{const u=r*.18;$c(n.primaryMarker,o-u,d,e.directions[0]),$c(n.secondaryMarker,o+u,d,e.directions[1])}n.group.visible=!0}function _p(n){n.group.removeFromParent(),n.shaftGeom.dispose(),n.headGeom.dispose(),n.material.dispose()}class mA{replay;blueBack;blueForward;blueOther;orangeBack;orangeForward;orangeOther;constructor(e,t,i){this.replay=t,this.blueBack=Ka(i,Bo),this.blueForward=Ka(i,Bo),this.blueOther=Ka(i,Bo),this.orangeBack=Ka(i,zo),this.orangeForward=Ka(i,zo),this.orangeOther=Ka(i,zo);for(const a of this.getZones())e.add(a.group)}update(e,t){const{frameIndex:i}=e,a=X1;for(const s of[!0,!1]){const r=this.replay.players.filter(u=>u.isTeamZero===s).length,o=[];for(const u of this.replay.players){if(u.isTeamZero!==s)continue;const h=u.frames[i];h?.position&&o.push(h.position.y)}const l=dA(s),c=this.getTeamZones(s);for(const u of c.values())fA(u);if(r<2||o.length!==r)continue;const d=uA(o,s,a);for(const u of d){const h=c.get(u.kind);h&&pA(h,u,l,t)}}}dispose(){for(const e of this.getZones())e.group.removeFromParent(),e.floorGeom.dispose(),e.floorMaterial.dispose(),e.stripeGeom.dispose(),e.stripeMaterial.dispose(),_p(e.primaryMarker),_p(e.secondaryMarker)}getTeamZones(e){return e?new Map([["back",this.blueBack],["forward",this.blueForward],["other",this.blueOther]]):new Map([["back",this.orangeBack],["forward",this.orangeForward],["other",this.orangeOther]])}getZones(){return[this.blueBack,this.blueForward,this.blueOther,this.orangeBack,this.orangeForward,this.orangeOther]}}function gA(n){return n==null||Number.isNaN(n)?null:n<0?"team-zero":"team-one"}class _A{group;teamZeroSide;teamOneSide;constructor(e,t){this.group=new _t,this.teamZeroSide=this.createHalfFieldSide(Bo),this.teamOneSide=this.createHalfFieldSide(zo);const i=Sr*t,a=5120*t;this.teamZeroSide.mesh.position.set(0,-a/2,pp),this.teamZeroSide.mesh.scale.set(i*2,a,1),this.teamOneSide.mesh.position.set(0,a/2,pp),this.teamOneSide.mesh.scale.set(i*2,a,1),this.group.add(this.teamZeroSide.mesh),this.group.add(this.teamOneSide.mesh),e.add(this.group)}update(e){const t=gA(e);this.teamZeroSide.material.opacity=t==="team-zero"?hp:Vc,this.teamOneSide.material.opacity=t==="team-one"?hp:Vc}dispose(){this.group.removeFromParent(),this.teamZeroSide.mesh.geometry.dispose(),this.teamZeroSide.material.dispose(),this.teamOneSide.mesh.geometry.dispose(),this.teamOneSide.material.dispose()}createHalfFieldSide(e){const t=new ln(1,1),i=new rt({color:e,transparent:!0,opacity:Vc,side:Qe,depthWrite:!1,depthTest:!1}),a=new He(t,i);return a.renderOrder=18,{mesh:a,material:i}}}function vA(n,e){const t=new _t,i=Sr*2*e,a=(s,r,o)=>{const l=new ln(i,r*e),c=new rt({color:tA,transparent:!0,opacity:o,side:Qe,depthWrite:!1,depthTest:!1}),d=new He(l,c);return d.position.set(0,s,eA),d.renderOrder=24,d};for(const s of[-1,1]){const r=s*q1*e;t.add(a(r,iA,nA))}return t.add(a(0,sA,aA)),n.add(t),t}function Nt(n){return n===void 0||Number.isNaN(n)?"?":`${Math.round(n)}`}function Qd(n,e,t=1){return n===void 0||e===void 0||Number.isNaN(n)||Number.isNaN(e)||e<=0?"?":`${(n*100/e).toFixed(t)}%`}function Un(n,e){return`<div class="stat-row"><span class="label">${n}</span><span class="value">${e}</span></div>`}function yA(n,e){return`
      ${Un("50s",Nt(n?.count))}
      ${Un("Blue wins",`${Nt(n?.wins)} (${Qd(n?.wins,n?.count)})`)}
      ${Un("Orange wins",`${Nt(n?.losses)} (${Qd(n?.losses,n?.count)})`)}
      ${Un("Neutral",Nt(n?.neutral_outcomes))}
      ${Un("Blue poss after",Nt(n?.possession_after_count))}
      ${Un("Orange poss after",Nt(n?.opponent_possession_after_count))}
      ${Un("Kickoff 50s",Nt(n?.kickoff_count))}
      ${Un("Blue kickoff wins",Nt(n?.kickoff_wins))}
      ${Un("Orange kickoff wins",Nt(n?.kickoff_losses))}
      ${Un("Blue kickoff poss",Nt(n?.kickoff_possession_after_count))}
      ${Un("Orange kickoff poss",Nt(n?.kickoff_opponent_possession_after_count))}
    `}function vp(n){return`
    <div class="stat-row"><span class="label">50s</span><span class="value">${Nt(n?.count)}</span></div>
    <div class="stat-row"><span class="label">Wins</span><span class="value">${Nt(n?.wins)} (${Qd(n?.wins,n?.count)})</span></div>
    <div class="stat-row"><span class="label">Losses</span><span class="value">${Nt(n?.losses)}</span></div>
    <div class="stat-row"><span class="label">Neutral</span><span class="value">${Nt(n?.neutral_outcomes)}</span></div>
    <div class="stat-row"><span class="label">Poss after</span><span class="value">${Nt(n?.possession_after_count)}</span></div>
    <div class="stat-row"><span class="label">Kickoff 50s</span><span class="value">${Nt(n?.kickoff_count)}</span></div>
    <div class="stat-row"><span class="label">Kickoff wins</span><span class="value">${Nt(n?.kickoff_wins)}</span></div>
    <div class="stat-row"><span class="label">Kickoff poss</span><span class="value">${Nt(n?.kickoff_possession_after_count)}</span></div>
  `}function bA(n,e=1,t=""){return n===void 0||Number.isNaN(n)?"?":`${n.toFixed(e)}${t}`}function xA(n,e,t=1){return n===void 0||e===void 0||Number.isNaN(n)||Number.isNaN(e)||e<=0?"?":`${(n*100/e).toFixed(t)}%`}function yp(n,e,t=1){if(n===void 0||Number.isNaN(n))return"?";const i=xA(n,e,t);return i==="?"?`${n.toFixed(t)}s`:`${n.toFixed(t)}s (${i})`}function bp(n){return n.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function eu(n,e){return`<div class="stat-row"><span class="label">${bp(n)}</span><span class="value">${bp(e)}</span></div>`}function wA(n){const e=new Set,t=[];for(const i of n??[])e.has(i)||(e.add(i),t.push(i));return t}function Bg(n,e){return n==="neutral"?"Neutral":e.kind==="shared"?n==="own"?"Blue control":"Orange control":n==="own"?"Team control":"Opp control"}function tu(n){return n.kind==="shared"?["own","neutral","opponent"]:["own","neutral","opponent"]}function SA(n,e){return n==="neutral_third"?"Neutral third":e.kind==="shared"?n==="defensive_third"?"Blue third":"Orange third":n==="defensive_third"?"Own third":"Opp third"}function EA(n){return n.kind==="shared"?["defensive_third","neutral_third","offensive_third"]:["defensive_third","neutral_third","offensive_third"]}function MA(n,e,t,i){for(const a of t){const s=a==="possession_state"?tu(i):EA(i),r=s.indexOf(n[a]),o=s.indexOf(e[a]),l=r===-1?Number.MAX_SAFE_INTEGER:r,c=o===-1?Number.MAX_SAFE_INTEGER:o;if(l!==c)return l-c}return 0}function TA(n,e,t){const i=(a,s)=>a==="possession_state"?Bg(s,t):SA(s,t);if(e.length===1){const a=e[0];return i(a,n[a])}return e.map(a=>i(a,n[a])).join(" / ")}function AA(n,e,t,i){if(e.length===0)return"";const a=new Map;if(n?.labeled_time?.entries?.length)for(const s of n.labeled_time.entries){const r=new Map(s.labels.map(u=>[u.key,u.value])),o={};let l=!0;for(const u of e){const h=r.get(u);if(h===void 0){l=!1;break}o[u]=h}if(!l)continue;const c=e.map(u=>`${u}:${o[u]}`).join("|"),d=a.get(c);d?d.total+=s.value:a.set(c,{values:o,total:s.value})}if(a.size===0&&e.length===1&&e[0]==="possession_state"){const s=new Map;return n&&(s.set("own",n.possession_time),s.set("neutral",n.neutral_time??0),s.set("opponent",n.opponent_possession_time)),tu(i).some(r=>(s.get(r)??0)>0)?tu(i).filter(r=>s.has(r)).map(r=>eu(Bg(r,i),yp(s.get(r),t))).join(""):""}return[...a.values()].sort((s,r)=>MA(s.values,r.values,e,i)).map(s=>eu(TA(s.values,e,i),yp(s.total,t))).join("")}function xp(n,e){const t=n?.tracked_time,i=wA(e.breakdownClasses),a=AA(n,i,t,e.labelPerspective);return`
    ${eu("Tracked",bA(t,1,"s"))}
    ${a}
  `}function CA(n,e=1,t=""){return n===void 0||Number.isNaN(n)?"?":`${n.toFixed(e)}${t}`}function RA(n,e,t=1){return n===void 0||e===void 0||Number.isNaN(n)||Number.isNaN(e)||e<=0?"?":`${(n*100/e).toFixed(t)}%`}function PA(n,e,t=1){if(n===void 0||Number.isNaN(n))return"?";const i=RA(n,e,t);return i==="?"?`${n.toFixed(t)}s`:`${n.toFixed(t)}s (${i})`}function wp(n){return n.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function zg(n,e){return`<div class="stat-row"><span class="label">${wp(n)}</span><span class="value">${wp(e)}</span></div>`}function LA(n,e){return n==="neutral"?"Neutral zone":e.kind==="shared"?n==="defensive_half"?"Blue side":"Orange side":n==="defensive_half"?"Own half":"Opp half"}function NA(n,e,t){const i=new Map;if(n&&(i.set("defensive_half",n.defensive_half_time),i.set("neutral",n.neutral_time??0),i.set("offensive_half",n.offensive_half_time)),n?.labeled_time?.entries?.length){i.clear();for(const s of n.labeled_time.entries){const r=s.labels.find(o=>o.key==="field_half")?.value;r&&i.set(r,(i.get(r)??0)+s.value)}}const a=["defensive_half","neutral","offensive_half"];return a.some(s=>(i.get(s)??0)>0)?a.filter(s=>i.has(s)).map(s=>zg(LA(s,t),PA(i.get(s),e))).join(""):""}function Sp(n,e){const t=n?.tracked_time,i=NA(n,t,e.labelPerspective);return`
    ${i.length===0?zg("Tracked",CA(t,1,"s")):""}
    ${i}
  `}function sa(n){return n===void 0||Number.isNaN(n)?"?":`${Math.round(n)}`}function ra(n,e){return`<div class="stat-row"><span class="label">${n}</span><span class="value">${e}</span></div>`}function Wc(n){return`
    ${ra("Rushes",sa(n?.count))}
    ${ra("2v1",sa(n?.two_v_one_count))}
    ${ra("2v2",sa(n?.two_v_two_count))}
    ${ra("2v3",sa(n?.two_v_three_count))}
    ${ra("3v1",sa(n?.three_v_one_count))}
    ${ra("3v2",sa(n?.three_v_two_count))}
    ${ra("3v3",sa(n?.three_v_three_count))}
  `}const Ep="subtr-actor-fifty-fifty-overlay-styles",IA=5882879,DA=16761180,UA=15988472,FA=180,kA=4;function nu(n){if(!n)return null;const[e,t]=Object.entries(n)[0]??["Unknown","unknown"],i=typeof t=="string"?t:JSON.stringify(t);return`${e}:${i}`}function Mp(n,e){const t=nu(e);return t?n.players.find(i=>i.id===t)?.name??t:"Unknown"}function OA(n,e){const t=Mp(e,n.team_zero_player),i=Mp(e,n.team_one_player),a=n.is_kickoff?"Kickoff 50/50":"50/50",s=n.winning_team_is_team_0===void 0?null:n.winning_team_is_team_0,r=n.possession_team_is_team_0===void 0?null:n.possession_team_is_team_0,o=s===null?"neutral":s?"blue win":"orange win",l=r===null?"neutral poss":r?"blue poss":"orange poss",c=s===null?"sap-fifty-fifty-overlay-label-neutral":s?"sap-fifty-fifty-overlay-label-blue":"sap-fifty-fifty-overlay-label-orange";return{text:`${a}: ${t} vs ${i} | ${o} | ${l}`,className:c,winnerIsTeamZero:s}}function Hg(n,e){return n.events.fifty_fifty.map(t=>{const i=OA(t,e),a=new L(...t.team_zero_position),s=new L(...t.team_one_position),r=new L(...t.midpoint),o=e.frames[t.start_frame]?.time??t.start_time;return{id:`fifty-fifty:${t.start_frame}:${nu(t.team_zero_player)}:${nu(t.team_one_player)}`,time:o,frame:t.start_frame,label:i.text,labelClassName:i.className,axisStart:a,axisEnd:s,midpoint:r,winnerIsTeamZero:i.winnerIsTeamZero}})}function BA(n,e,t){const i=Math.max(.1,t);return n.filter(a=>{const s=e-a.time;return s>=0&&s<=i})}function zA(){if(document.getElementById(Ep))return;const n=document.createElement("style");n.id=Ep,n.textContent=`
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
  `,document.head.append(n)}function HA(n,e,t,i){if(i.copy(n).project(e),i.z<-1||i.z>1)return!1;const a=t.clientWidth||1,s=t.clientHeight||1;return i.x=(i.x+1)*a/2,i.y=(1-i.y)*s/2,!(i.x<-100||i.x>a+100||i.y<-100||i.y>s+100)}class GA{scene;container;group=new _t;labelRoot;projectedPosition=new L;worldPosition=new L;labelOffset=new L(0,0,FA);markers;views=new Map;changedContainerPosition=!1;originalContainerPosition="";decaySeconds=kA;constructor(e,t,i,a){zA(),this.scene=e,this.container=t,this.markers=Hg(a,i),getComputedStyle(t).position==="static"&&(this.changedContainerPosition=!0,this.originalContainerPosition=t.style.position,t.style.position="relative"),this.group.name="fifty-fifty-overlay",this.scene.replayRoot.add(this.group),this.labelRoot=document.createElement("div"),this.labelRoot.className="sap-fifty-fifty-overlay-root",this.container.append(this.labelRoot)}update(e){const t=BA(this.markers,e,this.decaySeconds),i=new Set(t.map(a=>a.id));for(const[a,s]of this.views.entries())i.has(a)||(s.line.removeFromParent(),s.line.geometry.dispose(),s.material.dispose(),s.label.remove(),this.views.delete(a));for(const a of t){const s=Math.max(0,e-a.time),r=Math.max(0,1-s/this.decaySeconds),o=this.ensureView(a),l=.12+.78*r;o.material.opacity=l;const c=o.line.geometry.getAttribute("position");c.setXYZ(0,a.axisStart.x,a.axisStart.y,a.axisStart.z+24),c.setXYZ(1,a.axisEnd.x,a.axisEnd.y,a.axisEnd.z+24),c.needsUpdate=!0,this.worldPosition.copy(a.midpoint).add(this.labelOffset),this.scene.replayRoot.localToWorld(this.worldPosition),HA(this.worldPosition,this.scene.camera,this.container,this.projectedPosition)?(o.label.hidden=!1,o.label.style.opacity=`${.24+.76*r}`,o.label.style.transform=`translate(${this.projectedPosition.x.toFixed(1)}px, ${this.projectedPosition.y.toFixed(1)}px) translate(-50%, -100%)`):o.label.hidden=!0}}dispose(){for(const e of this.views.values())e.line.removeFromParent(),e.line.geometry.dispose(),e.material.dispose(),e.label.remove();this.views.clear(),this.group.removeFromParent(),this.labelRoot.remove(),this.changedContainerPosition&&(this.container.style.position=this.originalContainerPosition,this.changedContainerPosition=!1)}ensureView(e){const t=this.views.get(e.id);if(t)return t;const i=new Rt().setFromPoints([e.axisStart,e.axisEnd]),a=new Nl({color:e.winnerIsTeamZero===null?UA:e.winnerIsTeamZero?IA:DA,transparent:!0,opacity:.9}),s=new Qu(i,a);s.renderOrder=3,this.group.add(s);const r=document.createElement("div");r.className=`sap-fifty-fifty-overlay-label ${e.labelClassName}`,r.textContent=e.label,this.labelRoot.append(r);const o={marker:e,line:s,material:a,label:r};return this.views.set(e.id,o),o}}const Tp="subtr-actor-ceiling-shot-overlay-styles",VA=5882879,$A=16761180,WA=16185075,XA=140,qA=215,YA=220,ZA=4.5;function Gg(n){if(!n)return null;const[e,t]=Object.entries(n)[0]??["Unknown","unknown"],i=typeof t=="string"?t:JSON.stringify(t);return`${e}:${i}`}function KA(n,e){const t=Gg(e);return t?n.players.find(i=>i.id===t)?.name??t:"Unknown"}function Vg(n,e){return n.events.ceiling_shot.map(t=>{const i=KA(e,t.player),a=Gg(t.player),s=e.frames[t.frame]?.time??t.time,r=t.confidence;return{id:`ceiling-shot:${t.frame}:${a}:${Math.round(r*1e3)}`,time:s,frame:t.frame,isTeamZero:t.is_team_0,playerId:a,playerName:i,ceilingContactPosition:{x:t.ceiling_contact_position[0],y:t.ceiling_contact_position[1],z:t.ceiling_contact_position[2]},touchPosition:{x:t.touch_position[0],y:t.touch_position[1],z:t.touch_position[2]},quality:r,qualityLabel:`${Math.round(r*100)}%`}})}function jA(n,e,t){const i=Math.max(.1,t);return n.filter(a=>{const s=e-a.time;return s>=0&&s<=i})}function JA(){if(document.getElementById(Tp))return;const n=document.createElement("style");n.id=Tp,n.textContent=`
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
  `,document.head.append(n)}function QA(n,e,t,i){if(i.copy(n).project(e),i.z<-1||i.z>1)return!1;const a=t.clientWidth||1,s=t.clientHeight||1;return i.x=(i.x+1)*a/2,i.y=(1-i.y)*s/2,!(i.x<-100||i.x>a+100||i.y<-100||i.y>s+100)}class eC{scene;container;group=new _t;labelRoot;projectedPosition=new L;worldPosition=new L;labelOffset=new L(0,0,YA);markers;views=new Map;changedContainerPosition=!1;originalContainerPosition="";decaySeconds=ZA;constructor(e,t,i,a){JA(),this.scene=e,this.container=t,this.markers=Vg(a,i),getComputedStyle(t).position==="static"&&(this.changedContainerPosition=!0,this.originalContainerPosition=t.style.position,t.style.position="relative"),this.group.name="ceiling-shot-overlay",this.scene.replayRoot.add(this.group),this.labelRoot=document.createElement("div"),this.labelRoot.className="sap-ceiling-shot-overlay-root",this.container.append(this.labelRoot)}update(e){const t=jA(this.markers,e,this.decaySeconds),i=new Set(t.map(a=>a.id));for(const[a,s]of this.views.entries())i.has(a)||(s.ring.removeFromParent(),s.ring.geometry.dispose(),s.ringMaterial.dispose(),s.beam.removeFromParent(),s.beamGeometry.dispose(),s.beamMaterial.dispose(),s.label.remove(),this.views.delete(a));for(const a of t){const s=Math.max(0,e-a.time),r=Math.max(0,1-s/this.decaySeconds),o=this.ensureView(a),l=.14+.6*r,c=.94+(1-r)*.18;o.ringMaterial.opacity=l,o.beamMaterial.opacity=.18+.55*r,o.ring.position.set(a.touchPosition.x,a.touchPosition.y,a.touchPosition.z+12),o.ring.scale.setScalar(c+a.quality*.08),this.worldPosition.set(a.touchPosition.x,a.touchPosition.y,a.touchPosition.z).add(this.labelOffset);const d=QA(this.worldPosition,this.scene.camera,this.container,this.projectedPosition);o.label.style.display=d?"block":"none",d&&(o.label.style.left=`${this.projectedPosition.x}px`,o.label.style.top=`${this.projectedPosition.y}px`,o.label.style.opacity=`${.42+.58*r}`)}}dispose(){for(const e of this.views.values())e.ring.removeFromParent(),e.ring.geometry.dispose(),e.ringMaterial.dispose(),e.beam.removeFromParent(),e.beamGeometry.dispose(),e.beamMaterial.dispose(),e.label.remove();this.views.clear(),this.group.removeFromParent(),this.labelRoot.remove(),this.changedContainerPosition&&(this.container.style.position=this.originalContainerPosition)}ensureView(e){const t=this.views.get(e.id);if(t)return t;const i=e.quality>=.8?WA:e.isTeamZero?VA:$A,a=new rt({color:i,transparent:!0,opacity:.8,side:Qe,depthWrite:!1,depthTest:!1}),s=new Aa(XA,qA,48),r=new He(s,a);r.renderOrder=30,this.group.add(r);const o=new Rt().setFromPoints([new L(e.ceilingContactPosition.x,e.ceilingContactPosition.y,e.ceilingContactPosition.z),new L(e.touchPosition.x,e.touchPosition.y,e.touchPosition.z)]),l=new Nl({color:i,transparent:!0,opacity:.7,depthWrite:!1,depthTest:!1}),c=new Qu(o,l);c.renderOrder=29,this.group.add(c);const d=document.createElement("div");d.className=`sap-ceiling-shot-overlay-label ${e.isTeamZero?"sap-ceiling-shot-overlay-label-blue":"sap-ceiling-shot-overlay-label-orange"}`,d.textContent=`${e.playerName} ceiling shot ${e.qualityLabel}`,this.labelRoot.append(d);const u={marker:e,ring:r,ringMaterial:a,beam:c,beamGeometry:o,beamMaterial:l,label:d};return this.views.set(e.id,u),u}}const Ap="subtr-actor-touch-overlay-styles",Cp=5882879,Rp=16761180,tC=120,nC=196,Xc=24,Pp=210,Lp=5,Ho=.1,iC=48;function at(n){const[e,t]=Object.entries(n)[0]??["Unknown","unknown"],i=typeof t=="string"?t:JSON.stringify(t);return`${e}:${i}`}function aC(n){return{touchCount:n.touch?.touch_count??0,totalBallTravelDistance:n.touch?.total_ball_travel_distance??0,totalBallAdvanceDistance:n.touch?.total_ball_advance_distance??0,totalBallRetreatDistance:n.touch?.total_ball_retreat_distance??0}}function qc(n,e){return Math.max(0,n-e)}function sC(n,e){if(e==="markers")return n.playerName;const t=Math.round(n.totalBallAdvanceDistance),i=Math.round(n.totalBallRetreatDistance);return t>0&&i>0?`${n.playerName} +${t} / -${i} uu`:i>0?`${n.playerName} -${i} uu`:`${n.playerName} +${t} uu`}function $g(n,e){const t=new Map,i=new Map,a=[];for(const s of n.frames){const r=e.ballFrames[s.frame_number]?.position;for(const o of s.players){const l=at(o.player_id),c=aC(o),d=t.get(l)??{touchCount:0,totalBallTravelDistance:0,totalBallAdvanceDistance:0,totalBallRetreatDistance:0},u=i.get(l),h=qc(c.totalBallTravelDistance,d.totalBallTravelDistance),f=qc(c.totalBallAdvanceDistance,d.totalBallAdvanceDistance),g=qc(c.totalBallRetreatDistance,d.totalBallRetreatDistance);if(u!==void 0&&r&&(h>Ho||f>Ho||g>Ho)){const x=a[u];x&&(x.totalBallTravelDistance+=h,x.totalBallAdvanceDistance+=f,x.totalBallRetreatDistance+=g,x.endPosition={x:r.x,y:r.y,z:r.z})}const _=Math.max(0,c.touchCount-d.touchCount);if(_===0){t.set(l,c);continue}const m=o.touch?.last_touch_frame??s.frame_number,p=e.frames[m]?.time??o.touch?.last_touch_time??s.time,S=e.ballFrames[m]?.position;if(!S){t.set(l,c);continue}for(let x=0;x<_;x+=1){const y=a.length;a.push({id:`touch-stat:${m}:${l}:${c.touchCount-_+x+1}`,time:p,frame:m,isTeamZero:o.is_team_0,playerId:l,playerName:o.name,position:{x:S.x,y:S.y,z:S.z},endPosition:{x:S.x,y:S.y,z:S.z},totalBallTravelDistance:0,totalBallAdvanceDistance:0,totalBallRetreatDistance:0}),i.set(l,y)}t.set(l,c)}}return a}function rC(n,e,t){const i=Math.max(.1,t);return n.filter(a=>{const s=e-a.time;return s>=0&&s<=i})}function oC(){if(document.getElementById(Ap))return;const n=document.createElement("style");n.id=Ap,n.textContent=`
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
  `,document.head.append(n)}function lC(n,e,t,i){if(i.copy(n).project(e),i.z<-1||i.z>1)return!1;const a=t.clientWidth||1,s=t.clientHeight||1;return i.x=(i.x+1)*a/2,i.y=(1-i.y)*s/2,!(i.x<-100||i.x>a+100||i.y<-100||i.y>s+100)}function Wg(n){return[n.line.material,n.cone.material].flatMap(e=>Array.isArray(e)?e:[e])}function Np(n,e){for(const t of Wg(n))t.transparent=!0,t.opacity=e,t.depthWrite=!1,t.depthTest=!1}function Ip(n){n.removeFromParent(),n.line.geometry.dispose(),n.cone.geometry.dispose();for(const e of Wg(n))e.dispose()}class cC{scene;container;group=new _t;labelRoot;projectedPosition=new L;worldPosition=new L;arrowStart=new L;arrowEnd=new L;arrowDirection=new L;labelOffset=new L(0,0,Pp);markers;views=new Map;changedContainerPosition=!1;originalContainerPosition="";decaySeconds=Lp;mode="markers";constructor(e,t,i,a,s){oC(),this.scene=e,this.container=t,this.decaySeconds=Math.max(.1,s?.decaySeconds??Lp),this.mode=s?.mode??"markers",this.labelOffset.set(0,0,Pp),this.markers=$g(a,i),getComputedStyle(t).position==="static"&&(this.changedContainerPosition=!0,this.originalContainerPosition=t.style.position,t.style.position="relative"),this.group.name="touch-event-overlay",this.scene.replayRoot.add(this.group),this.labelRoot=document.createElement("div"),this.labelRoot.className="sap-touch-overlay-root",this.container.append(this.labelRoot)}getDecaySeconds(){return this.decaySeconds}setDecaySeconds(e){this.decaySeconds=Math.max(.1,e)}getMode(){return this.mode}setMode(e){this.mode=e}update(e){const t=rC(this.markers,e,this.decaySeconds),i=new Set(t.map(a=>a.id));for(const[a,s]of this.views.entries())i.has(a)||(s.ring.removeFromParent(),s.ring.geometry.dispose(),s.material.dispose(),Ip(s.arrow),s.label.remove(),this.views.delete(a));for(const a of t){const s=Math.max(0,e-a.time),r=Math.max(0,1-s/this.decaySeconds),o=this.ensureView(a),l=.1+.6*r,c=.95+(1-r)*.28;o.material.opacity=l,o.ring.position.set(a.position.x,a.position.y,a.position.z+Xc),o.ring.scale.setScalar(c),o.label.textContent=sC(a,this.mode),o.label.classList.toggle("sap-touch-overlay-label-advancement",this.mode==="advancement"),this.updateArrow(o,a,l),this.worldPosition.set(a.position.x,a.position.y,a.position.z),this.worldPosition.add(this.labelOffset),this.scene.replayRoot.localToWorld(this.worldPosition),lC(this.worldPosition,this.scene.camera,this.container,this.projectedPosition)?(o.label.hidden=!1,o.label.style.opacity=`${.22+.78*r}`,o.label.style.transform=`translate(${this.projectedPosition.x.toFixed(1)}px, ${this.projectedPosition.y.toFixed(1)}px) translate(-50%, -100%)`):o.label.hidden=!0}}dispose(){for(const e of this.views.values())e.ring.removeFromParent(),e.ring.geometry.dispose(),e.material.dispose(),Ip(e.arrow),e.label.remove();this.views.clear(),this.group.removeFromParent(),this.labelRoot.remove(),this.changedContainerPosition&&(this.container.style.position=this.originalContainerPosition,this.changedContainerPosition=!1)}ensureView(e){const t=this.views.get(e.id);if(t)return t;const i=new rt({color:e.isTeamZero?Cp:Rp,transparent:!0,opacity:.7,side:Qe,depthWrite:!1,depthTest:!1}),a=new He(new Aa(tC,nC,48),i);a.rotation.x=-Math.PI/2,a.renderOrder=40,this.group.add(a);const s=new Gb(new L(0,1,0),new L,1,e.isTeamZero?Cp:Rp,1,1);s.visible=!1,s.renderOrder=45,s.line.renderOrder=45,s.cone.renderOrder=45,Np(s,.7),this.group.add(s);const r=document.createElement("div");r.className=`sap-touch-overlay-label ${e.isTeamZero?"sap-touch-overlay-label-blue":"sap-touch-overlay-label-orange"}`,r.textContent=e.playerName,r.hidden=!0,this.labelRoot.append(r);const o={marker:e,ring:a,material:i,arrow:s,label:r};return this.views.set(e.id,o),o}updateArrow(e,t,i){if(this.mode!=="advancement"||t.totalBallTravelDistance<=Ho){e.arrow.visible=!1;return}this.arrowStart.set(t.position.x,t.position.y,t.position.z+Xc*2),this.arrowEnd.set(t.endPosition.x,t.endPosition.y,t.endPosition.z+Xc*2),this.arrowDirection.copy(this.arrowEnd).sub(this.arrowStart);const a=this.arrowDirection.length();if(a<iC){e.arrow.visible=!1;return}this.arrowDirection.normalize(),e.arrow.visible=!0,e.arrow.position.copy(this.arrowStart),e.arrow.setDirection(this.arrowDirection),e.arrow.setLength(a,Math.min(140,Math.max(42,a*.18)),Math.min(86,Math.max(24,a*.1))),Np(e.arrow,Math.min(.86,i+.12))}}const Et="#3b82f6",Mt="#f59e0b",dC="#d1d9e0",uC={air_dribble:"AD",ball_carry:"BC",ceiling_shot:"CS",double_tap:"DT",flick:"F",flip_reset:"FR",half_flip:"HF",half_volley:"HV",musty_flick:"M",one_timer:"OT",pass:"P",speed_flip:"SF",wall_aerial:"WA",wall_aerial_shot:"WS",wavedash:"WD"},hC=new Set(["wavedash"]),Xg=new Set(["air_dribble","ball_carry"]),fC=new Set(["center","ceiling-shot","double-tap","flick","half-flip","half-volley","musty-flick","one-timer","pass","speed-flip","wall-aerial","wall-aerial-shot"]);function si(n,e){return n.players.find(t=>t.id===e)?.name??e}function $t(n,e,t){return n.frames[e??-1]?.time??t}function Ht(n){return n.split(/[_-]+/).filter(e=>e.length>0).map(e=>`${e.slice(0,1).toUpperCase()}${e.slice(1)}`).join(" ")}function pC(n){return uC[n]??(n.split(/[_-]+/).filter(e=>e.length>0).map(e=>e.slice(0,1).toUpperCase()).join("").slice(0,3)||"M")}function hh(n){return[...new Set((n?.events.mechanics??[]).filter(e=>fh(e.kind)).map(e=>e.kind))].sort((e,t)=>Ht(e).localeCompare(Ht(t)))}function fh(n){return!hC.has(n)}function qg(n){return hh(n).filter(e=>!Xg.has(e)&&fC.has(ph(e)))}function ph(n){return n.replaceAll("_","-")}function Ol(n){return new Set(qg(n).map(ph))}function Yg(n,e){const t=Ol(e);return new Set([...n].filter(i=>!t.has(i)))}function mh(n,e,t){const i=t?new Set(t):null,a=new Map(e.players.map(s=>[s.id,s.name]));return(n.events.mechanics??[]).filter(s=>fh(s.kind)&&!Xg.has(s.kind)&&(!i||i.has(s.kind))).map(s=>{const r=at(s.player_id),o=a.get(r)??r,l=Ht(s.kind),c=s.timing.type==="moment"?{frame:s.timing.frame,time:s.timing.time}:{frame:s.timing.end_frame,time:s.timing.end_time};return{id:s.id,time:$t(e,c.frame,c.time),frame:c.frame,kind:s.kind,label:`${o} ${l.toLowerCase()}`,shortLabel:pC(s.kind),playerId:r,playerName:o,isTeamZero:s.is_team_0,color:s.is_team_0?Et:Mt}})}function Zg(n,e,t){const i=[],a=new Map;for(const s of n.frames)for(const r of s.players){const o=at(r.player_id),l=t.getCount(r),c=a.get(o)??0;a.set(o,l);const d=Math.max(0,l-c);if(d===0)continue;const u=$t(e,s.frame_number,s.time);for(let h=0;h<d;h+=1){const f=l-d+h+1;i.push({id:`${t.idPrefix}:${s.frame_number}:${o}:${f}`,time:u,frame:s.frame_number,kind:t.kind,label:t.buildLabel(r),shortLabel:t.shortLabel,playerId:o,playerName:r.name,isTeamZero:r.is_team_0,color:r.is_team_0?Et:Mt})}}return i}function mC(n){const e=new Set(n),t=new Set(["goal"]);return e.has("core")&&(t.add("save"),t.add("shot"),t.add("assist")),e.has("demo")&&t.add("demo"),[...t]}function Kg(n,e){const t=new Set(mC(e));return n.timelineEvents.filter(i=>t.has(i.kind))}function jg(n,e){return Hg(n,e).map(t=>({id:t.id,time:t.time,frame:t.frame,kind:"fifty-fifty",label:t.label,shortLabel:t.label.startsWith("Kickoff 50/50")?"KO":"50",isTeamZero:t.winnerIsTeamZero,color:t.winnerIsTeamZero===null?dC:t.winnerIsTeamZero?Et:Mt}))}function Jg(n,e){const t=[],i=new Map;for(const a of n.frames)for(const s of a.players){const r=at(s.player_id),o=s.musty_flick?.count??0,l=i.get(r)??0;i.set(r,o);const c=Math.max(0,o-l);if(c===0)continue;const d=s.musty_flick?.last_musty_frame??a.frame_number,u=e.frames[d]?.time??s.musty_flick?.last_musty_time??a.time;for(let h=0;h<c;h+=1)t.push({id:`musty-flick:${d}:${r}:${o-c+h+1}`,time:u,frame:d,kind:"musty-flick",label:`${s.name} musty flick`,shortLabel:"M",playerId:r,playerName:s.name,isTeamZero:s.is_team_0,color:s.is_team_0?Et:Mt})}return t}function Qg(n,e){const t=[],i=new Map;for(const a of n.frames)for(const s of a.players){const r=at(s.player_id),o=s.flick?.count??0,l=i.get(r)??0;i.set(r,o);const c=Math.max(0,o-l);if(c===0)continue;const d=s.flick?.last_flick_frame??a.frame_number,u=e.frames[d]?.time??s.flick?.last_flick_time??a.time;for(let h=0;h<c;h+=1)t.push({id:`flick:${d}:${r}:${o-c+h+1}`,time:u,frame:d,kind:"flick",label:`${s.name} flick`,shortLabel:"F",playerId:r,playerName:s.name,isTeamZero:s.is_team_0,color:s.is_team_0?Et:Mt})}return t}function e_(n,e){return $g(n,e).map(t=>({id:t.id,time:t.time,frame:t.frame,kind:"touch",label:`${t.playerName} touch`,shortLabel:"T",playerId:t.playerId,playerName:t.playerName,isTeamZero:t.isTeamZero,color:t.isTeamZero?Et:Mt}))}function t_(n,e){return n.events.backboard.map((t,i)=>{const a=at(t.player),s=e.players.find(r=>r.id===a)?.name??a;return{id:`backboard:${t.frame}:${a}:${i}`,time:$t(e,t.frame,t.time),frame:t.frame,kind:"backboard",label:`${s} backboard`,shortLabel:"BB",playerId:a,playerName:s,isTeamZero:t.is_team_0,color:t.is_team_0?Et:Mt}})}function n_(n,e){return Vg(n,e).map(t=>({id:t.id,time:t.time,frame:t.frame,kind:"ceiling-shot",label:`${t.playerName} ceiling shot ${t.qualityLabel}`,shortLabel:"CS",playerId:t.playerId,playerName:t.playerName,isTeamZero:t.isTeamZero,color:t.isTeamZero?Et:Mt}))}function i_(n,e){return n.events.wall_aerial.map((t,i)=>{const a=at(t.player),s=si(e,a),r=$t(e,t.frame,t.time),o=Math.round(t.confidence*100),l=Ht(t.wall).toLowerCase();return{id:`wall-aerial:${t.frame}:${a}:${i}`,time:r,frame:t.frame,kind:"wall-aerial",label:`${s} wall-to-air setup ${o}% | ${l} wall`,shortLabel:"W2A",playerId:a,playerName:s,isTeamZero:t.is_team_0,color:t.is_team_0?Et:Mt}})}function a_(n,e){return n.events.wall_aerial_shot.map((t,i)=>{const a=at(t.player),s=si(e,a),r=$t(e,t.frame,t.time),o=Math.round(t.confidence*100),l=Ht(t.wall).toLowerCase();return{id:`wall-aerial-shot:${t.frame}:${a}:${i}`,time:r,frame:t.frame,kind:"wall-aerial-shot",label:`${s} wall aerial shot ${o}% | ${l} wall`,shortLabel:"WS",playerId:a,playerName:s,isTeamZero:t.is_team_0,color:t.is_team_0?Et:Mt}})}function s_(n,e){return n.events.double_tap.map((t,i)=>{const a=at(t.player),s=si(e,a);return{id:`double-tap:${t.frame}:${a}:${i}`,time:$t(e,t.frame,t.time),frame:t.frame,kind:"double-tap",label:`${s} double tap`,shortLabel:"DT",playerId:a,playerName:s,isTeamZero:t.is_team_0,color:t.is_team_0?Et:Mt}})}function gC(n,e){return n.events.center.map((t,i)=>{const a=at(t.player),s=si(e,a),r=$t(e,t.frame,t.time),o=Math.round(t.lateral_centering_distance);return{id:`center:${t.frame}:${a}:${i}`,time:r,frame:t.frame,kind:"center",label:`${s} center | ${o}uu lateral`,shortLabel:"C",playerId:a,playerName:s,isTeamZero:t.is_team_0,color:t.is_team_0?Et:Mt}})}function r_(n,e){return n.events.one_timer.map((t,i)=>{const a=at(t.player),s=at(t.passer),r=si(e,a),o=si(e,s),l=$t(e,t.frame,t.time),c=Math.round(t.ball_speed);return{id:`one-timer:${t.frame}:${s}:${a}:${i}`,time:l,frame:t.frame,kind:"one-timer",label:`${r} one-timer from ${o} | ${c}uu/s`,shortLabel:"OT",playerId:a,playerName:r,secondaryPlayerId:s,secondaryPlayerName:o,isTeamZero:t.is_team_0,color:t.is_team_0?Et:Mt}})}function _C(n){return Ht(n.replace(/_pass$/,""))}function o_(n,e){return n.events.pass.map((t,i)=>{const a=at(t.passer),s=at(t.receiver),r=si(e,a),o=si(e,s),l=$t(e,t.frame,t.time),c=Math.round(t.ball_travel_distance),d=_C(t.pass_kind);return{id:`pass:${t.frame}:${a}:${s}:${i}`,time:l,frame:t.frame,kind:"pass",label:`${r} to ${o} ${d.toLowerCase()} pass | ${c}uu`,shortLabel:"P",playerId:a,playerName:r,secondaryPlayerId:s,secondaryPlayerName:o,isTeamZero:t.is_team_0,color:t.is_team_0?Et:Mt}})}function vC(n,e){return n.events.half_volley.map((t,i)=>{const a=at(t.player),s=si(e,a),r=$t(e,t.frame,t.time),o=Math.round(t.ball_speed);return{id:`half-volley:${t.frame}:${a}:${i}`,time:r,frame:t.frame,kind:"half-volley",label:`${s} half volley | ${o}uu/s`,shortLabel:"HV",playerId:a,playerName:s,isTeamZero:t.is_team_0,color:t.is_team_0?Et:Mt}})}function l_(n,e){return n.events.rush.map((t,i)=>{const a=$t(e,t.end_frame,t.end_time),s=`${t.attackers}v${t.defenders}`,r=t.is_team_0?"Blue":"Orange";return{id:`rush:${t.start_frame}:${t.end_frame}:${i}`,time:a,frame:t.end_frame,kind:"rush",label:`${r} rush ${s}`,shortLabel:"R",playerId:null,playerName:null,isTeamZero:t.is_team_0,color:t.is_team_0?Et:Mt}})}function yC(n){return Ht(n.replace(/_goal$/,""))}function c_(n,e){return n.events.goal_tags.map((t,i)=>{const a=t.scorer?at(t.scorer):null,s=a?si(e,a):null,r=$t(e,t.frame,t.time),o=yC(t.kind),l=Math.round(t.confidence*100);return{id:`goal-tag:${t.goal_index}:${t.kind}:${i}`,time:r,frame:t.frame,kind:"goal-tag",label:`${s??"Goal"} ${o.toLowerCase()} goal ${l}%`,shortLabel:"GT",playerId:a,playerName:s,isTeamZero:t.scoring_team_is_team_0,color:t.scoring_team_is_team_0?Et:Mt}})}function d_(n,e){const t=[],i=new Map,a=new Map;for(const s of n.frames){const r=$t(e,s.frame_number,s.time);for(const o of s.players){const l=at(o.player_id),c=o.dodge_reset?.count??0,d=i.get(l)??0;i.set(l,c);const u=o.dodge_reset?.on_ball_count??0,h=a.get(l)??0;a.set(l,u);const f=Math.max(0,c-d),g=Math.min(f,Math.max(0,u-h));for(let _=0;_<f;_+=1){const m=c-f+_+1;_<g||t.push({id:`dodge-reset:${s.frame_number}:${l}:${m}:air`,time:r,frame:s.frame_number,kind:"dodge-reset",label:`${o.name} dodge refresh`,shortLabel:"DR",playerId:l,playerName:o.name,isTeamZero:o.is_team_0,color:o.is_team_0?Et:Mt})}}}return t}function u_(n,e){return Zg(n,e,{kind:"ball-carry",idPrefix:"ball-carry",shortLabel:"BC",getCount:t=>t.ball_carry?.carry_count??0,buildLabel:t=>`${t.name} ball carry`})}function h_(n,e){return Zg(n,e,{kind:"powerslide",idPrefix:"powerslide",shortLabel:"PS",getCount:t=>t.powerslide?.press_count??0,buildLabel:t=>`${t.name} powerslide`})}function f_(n,e){return n.events.speed_flip.map(t=>{const i=t.player?at(t.player):null,a=i?e.players.find(o=>o.id===i)?.name??i:"Unknown",s=e.frames[t.frame]?.time??t.time,r=Math.round(t.confidence*100);return{id:`speed-flip:${t.frame}:${i}:${Math.round(t.confidence*1e3)}`,time:s,frame:t.frame,kind:"speed-flip",label:`${a} speed flip ${r}%`,shortLabel:"SF",playerId:i,playerName:a,isTeamZero:t.is_team_0,color:t.is_team_0?Et:Mt}})}function p_(n,e){return n.events.half_flip.map((t,i)=>{const a=at(t.player),s=e.players.find(c=>c.id===a)?.name??a,r=$t(e,t.frame,t.time),o=Math.round(t.confidence*100),l=Math.round(t.end_speed-t.start_speed);return{id:`half-flip:${t.frame}:${a}:${i}`,time:r,frame:t.frame,kind:"half-flip",label:`${s} half flip ${o}% | +${l}uu/s`,shortLabel:"HF",playerId:a,playerName:s,isTeamZero:t.is_team_0,color:t.is_team_0?Et:Mt}})}function m_(n,e){return n.events.wavedash.map((t,i)=>{const a=at(t.player),s=e.players.find(c=>c.id===a)?.name??a,r=$t(e,t.frame,t.time),o=Math.round(t.confidence*100),l=Math.round(t.horizontal_speed_gain);return{id:`wavedash:${t.frame}:${a}:${i}`,time:r,frame:t.frame,kind:"wavedash",label:`${s} wavedash ${o}% | +${l}uu/s`,shortLabel:"WD",playerId:a,playerName:s,isTeamZero:t.is_team_0,color:t.is_team_0?Et:Mt}})}function g_(n,e){return n.events.bump.map((t,i)=>{const a=at(t.initiator),s=at(t.victim),r=e.players.find(d=>d.id===a)?.name??a,o=e.players.find(d=>d.id===s)?.name??s,l=$t(e,t.frame,t.time),c=Math.round(t.confidence*100);return{id:`bump:${t.frame}:${a}:${s}:${i}`,time:l,frame:t.frame,kind:"bump",label:`${r} bumped ${o} ${c}%`,shortLabel:"B",playerId:a,playerName:r,isTeamZero:t.initiator_is_team_0,color:t.initiator_is_team_0?Et:Mt}})}function bC(n){return n.kind==="beaten_to_ball"?"BT":n.dodge_active?"DW":n.aerial?"AW":"W"}function xC(n){const e=[n.aerial?"aerial":"grounded"];return n.dodge_active&&e.push("dodge"),e.join(" ")}function wC(n){return n.kind==="beaten_to_ball"?"beaten to ball":"whiff"}function __(n,e){return n.events.whiff.map((t,i)=>{const a=at(t.player),s=e.players.find(c=>c.id===a)?.name??a,r=$t(e,t.frame,t.time),o=Math.round(t.closest_approach_distance),l=Math.round(t.approach_speed);return{id:`whiff:${t.frame}:${a}:${i}`,time:r,frame:t.frame,kind:"whiff",label:`${s} ${xC(t)} ${wC(t)} | ${o}uu closest, ${l}uu/s`,shortLabel:bC(t),playerId:a,playerName:s,isTeamZero:t.is_team_0,color:t.is_team_0?Et:Mt}})}function SC(n,e,t){const i=Yg(n,t);let a=Kg(e,i).length;return i.has("fifty-fifty")&&(a+=jg(t,e).length),i.has("goal-tags")&&(a+=c_(t,e).length),i.has("musty-flick")&&(a+=Jg(t,e).length),i.has("flick")&&(a+=Qg(t,e).length),i.has("backboard")&&(a+=t_(t,e).length),i.has("ceiling-shot")&&(a+=n_(t,e).length),i.has("wall-aerial")&&(a+=i_(t,e).length),i.has("wall-aerial-shot")&&(a+=a_(t,e).length),i.has("double-tap")&&(a+=s_(t,e).length),i.has("center")&&(a+=gC(t,e).length),i.has("one-timer")&&(a+=r_(t,e).length),i.has("pass")&&(a+=o_(t,e).length),i.has("touch")&&(a+=e_(t,e).length),i.has("dodge-reset")&&(a+=d_(t,e).length),i.has("ball-carry")&&(a+=u_(t,e).length),i.has("powerslide")&&(a+=h_(t,e).length),i.has("speed-flip")&&(a+=f_(t,e).length),i.has("half-flip")&&(a+=p_(t,e).length),i.has("half-volley")&&(a+=vC(t,e).length),i.has("rush")&&(a+=l_(t,e).length),i.has("wavedash")&&(a+=m_(t,e).length),i.has("whiff")&&(a+=__(t,e).length),i.has("bump")&&(a+=g_(t,e).length),a}const v_=.02,Hn=1e-4,EC=200,y_=.08,MC="#3b82f6",TC="#f59e0b",iu={big:"rgba(245, 158, 11, 0.92)",small:"rgba(52, 211, 153, 0.86)"},Dp={both:"rgba(52, 211, 153, 0.86)",ghost:"rgba(239, 68, 68, 0.9)",missed:"rgba(59, 130, 246, 0.9)"},AC={air_dribble:"AD",ball_carry:"BC",ceiling_shot:"CS",double_tap:"DT",flick:"F",half_flip:"HF",half_volley:"HV",musty_flick:"M",one_timer:"OT",pass:"P",wavedash:"WD"};function CC(n){const e=n.config?.pressure_neutral_zone_half_width_y;return typeof e=="number"&&Number.isFinite(e)?Math.max(0,e):EC}function ul(n,e,t){return n?.frames?.[e??-1]?.time??t}function gh(n){return n===!0?MC:n===!1?TC:null}function RC(n){return AC[n]??(n.split(/[_-]+/).filter(e=>e.length>0).map(e=>e.slice(0,1).toUpperCase()).join("").slice(0,3)||"M")}function b_(n,e,t){const i=t?new Set(t):null,a=new Map(e.players.map(s=>[s.id,s.name]));return(n.events.mechanics??[]).filter(s=>fh(s.kind)&&s.timing.type==="span"&&(!i||i.has(s.kind))).map(s=>{if(s.timing.type!=="span")throw new Error("unreachable non-span mechanic event");const r=au(s.player_id),o=a.get(r)??r,l=Ht(s.kind),c=ul(e,s.timing.start_frame,s.timing.start_time),d=Math.max(c,ul(e,s.timing.end_frame,s.timing.end_time));return{id:s.id,startTime:c,endTime:d,lane:`mechanic:${s.kind}`,laneLabel:l,label:`${o} ${l.toLowerCase()}`,shortLabel:RC(s.kind),isTeamZero:s.is_team_0,color:gh(s.is_team_0)??void 0}}).sort((s,r)=>s.startTime!==r.startTime?s.startTime-r.startTime:(s.id??"").localeCompare(r.id??""))}function PC(n,e,t,i,a,s){const r=e?.ballFrames[n]?.position?.y;return typeof r=="number"&&Number.isFinite(r)&&Math.abs(r)<=t+Hn||s>Hn?"neutral":i>a+Hn?"team_zero_side":a>i+Hn?"team_one_side":null}function LC(n,e,t){if(n==="neutral")return{id:`half-control:neutral:${e.toFixed(3)}`,startTime:e,endTime:t,lane:"half-control",laneLabel:"Half Control",label:"Neutral half control",color:"rgba(209, 217, 224, 0.7)",isTeamZero:null};const i=n==="team_zero_side";return{id:`half-control:${n}:${e.toFixed(3)}`,startTime:e,endTime:t,lane:"half-control",laneLabel:"Half Control",label:i?"Blue half control":"Orange half control",color:i?"rgba(89, 195, 255, 0.76)":"rgba(255, 193, 92, 0.76)",isTeamZero:i}}function NC(n,e){const t=[];let i=0,a=0,s=0,r=null;for(const o of n.frames){if(!Number.isFinite(o.time)||!Number.isFinite(o.dt)||o.dt<=0){r=o;continue}const l=o.team_zero?.possession?.possession_time??0,c=o.team_one?.possession?.possession_time??0,d=o.team_zero?.possession?.neutral_time??0,u=l-i,h=c-a,f=d-s;i=l,a=c,s=d;let g=null;const{startTime:_,endTime:m}=_h(o,r,e);u>h+Hn&&u>f+Hn?g={id:`possession:team_zero:${_.toFixed(3)}`,startTime:_,endTime:m,lane:"possession",laneLabel:"Possession",label:"Blue possession",color:"rgba(59, 130, 246, 0.88)",isTeamZero:!0}:h>u+Hn&&h>f+Hn?g={id:`possession:team_one:${_.toFixed(3)}`,startTime:_,endTime:m,lane:"possession",laneLabel:"Possession",label:"Orange possession",color:"rgba(245, 158, 11, 0.88)",isTeamZero:!1}:f>Hn&&(g={id:`possession:neutral:${_.toFixed(3)}`,startTime:_,endTime:m,lane:"possession",laneLabel:"Possession",label:"Neutral possession",color:"rgba(209, 217, 224, 0.7)",isTeamZero:null}),w_(t,g),r=o}return t}function IC(n,e){const t=[];let i=0,a=0,s=0;const r=CC(n);let o=null;for(const l of n.frames){if(!Number.isFinite(l.time)||!Number.isFinite(l.dt)||l.dt<=0){o=l;continue}const c=l.team_zero?.pressure?.defensive_half_time??0,d=l.team_one?.pressure?.defensive_half_time??0,u=l.team_zero?.pressure?.neutral_time??0,h=c-i,f=d-a,g=u-s;i=c,a=d,s=u;const{startTime:_,endTime:m}=_h(l,o,e),p=PC(l.frame_number,e,r,h,f,g),S=p?LC(p,_,m):null;w_(t,S),o=l}return t}function DC(n,e){return n.events.rush.map((t,i)=>{const a=e?.frames[t.start_frame]?.time??t.start_time,s=e?.frames[t.end_frame]?.time??t.end_time,r=`${t.attackers}v${t.defenders}`,o=t.is_team_0;return{id:`rush-range:${t.start_frame}:${t.end_frame}:${i}`,startTime:a,endTime:Math.max(a,s),lane:"rush",laneLabel:"Rush",label:`${o?"Blue":"Orange"} rush ${r}`,color:o?"rgba(59, 130, 246, 0.4)":"rgba(245, 158, 11, 0.4)",isTeamZero:o}})}function UC(n,e={}){const t=x_(e),i=new Set(e.comparisons??["both"]),a=new Set(e.activities??["active","inactive","unknown"]),s=new Set(e.fieldHalves??["own","opponent","unknown"]),r=e.playerIds?new Set(e.playerIds):null;if(t.size===0||!i.has("both")||!a.has("unknown")||!s.has("unknown")||r?.size===0)return[];const o=new Map(n.players.map(c=>[c.id,c.isTeamZero])),l=[];for(const c of n.boostPads)if(t.has(c.size))for(let d=0;d<c.events.length;d+=1){const u=c.events[d];if(u.available||!Number.isFinite(u.time)||r&&!u.playerId||u.playerId&&r&&!r.has(u.playerId))continue;const h=Math.max(0,ul(n,u.frame,u.time)),f=c.size==="big"?"Big":"Small",g=u.playerName?`${u.playerName} `:"",_=u.playerId?o.get(u.playerId)??null:null;l.push({id:`boost-pickup:${c.index}:${u.frame}:${d}`,startTime:h,endTime:Math.max(h+y_,h),lane:"boost-pickups",laneLabel:"Boost Pickups",label:`${g}picked up ${f.toLowerCase()} boost pad ${c.index}`,shortLabel:c.size==="big"?"100":"12",color:gh(_)??iu[c.size],isTeamZero:_})}return l.sort((c,d)=>c.startTime!==d.startTime?c.startTime-d.startTime:(c.id??"").localeCompare(d.id??""))}function x_(n){if(n.padTypes)return new Set(n.padTypes);if(n.sizes){const e=new Set(n.sizes),t=new Set;return e.has("big")&&t.add("big"),e.has("small")&&t.add("small"),e.has("big")&&e.has("small")&&t.add("ambiguous"),t}return new Set(["big","small","ambiguous"])}function au(n){const[e,t]=Object.entries(n)[0]??["Unknown","unknown"],i=typeof t=="string"?t:JSON.stringify(t);return`${e}:${i}`}function FC(n){return{big:"big",small:"small",ambiguous:"ambiguous"}[n]}function kC(n){return{both:"counted",ghost:"ghost",missed:"missed"}[n]}function OC(n,e){return n==="ghost"?"G":n==="missed"?"M":{big:"100",small:"12",ambiguous:"?"}[e]}function BC(n,e,t={}){const i=n.events?.boost_pickups??[];if(i.length===0&&e)return UC(e,t);const a=x_(t),s=new Set(t.comparisons??["both"]),r=new Set(t.activities??["active","inactive","unknown"]),o=new Set(t.fieldHalves??["own","opponent","unknown"]),l=t.playerIds?new Set(t.playerIds):null;if(a.size===0||s.size===0||r.size===0||o.size===0||l?.size===0)return[];const c=new Map((e?.players??[]).map(d=>[d.id,d.name]));return i.filter(d=>{const u=au(d.player_id);return a.has(d.pad_type)&&s.has(d.comparison)&&r.has(d.activity)&&o.has(d.field_half)&&(!l||l.has(u))}).map((d,u)=>{const h=au(d.player_id),f=c.get(h)??h,g=Math.max(0,ul(e,d.frame,d.time)),_=kC(d.comparison),m=FC(d.pad_type);return{id:`boost-pickup:${d.comparison}:${d.frame}:${h}:${u}`,startTime:g,endTime:Math.max(g+y_,g),lane:"boost-pickups",laneLabel:"Boost Pickups",label:`${f} ${_} ${m} boost pickup`,shortLabel:OC(d.comparison,d.pad_type),color:gh(d.is_team_0)??(d.comparison==="both"?d.pad_type==="big"?iu.big:d.pad_type==="small"?iu.small:Dp.both:Dp[d.comparison]),isTeamZero:d.is_team_0}}).sort((d,u)=>d.startTime!==u.startTime?d.startTime-u.startTime:(d.id??"").localeCompare(u.id??""))}const zC=[{fieldName:"time_defensive_third",aliases:["time_defensive_zone"],label:"Def third",relativeColor:"own"},{fieldName:"time_neutral_third",aliases:["time_neutral_zone"],label:"Neutral third",relativeColor:"neutral"},{fieldName:"time_offensive_third",aliases:["time_offensive_zone"],label:"Off third",relativeColor:"opp"}];function HC(n,e){return n.relativeColor==="neutral"?"rgba(209, 217, 224, 0.68)":(n.relativeColor==="own"?e:!e)?"rgba(89, 195, 255, 0.74)":"rgba(255, 193, 92, 0.78)"}function GC(n){const[e,t]=Object.entries(n)[0]??["Unknown","unknown"],i=typeof t=="string"?t:JSON.stringify(t);return`${e}:${i}`}function VC(n,e){const t=n.positioning;if(!t)return 0;for(const i of[e.fieldName,...e.aliases??[]]){const a=t[i];if(typeof a=="number"&&Number.isFinite(a))return a}return 0}function $C(n,e){const t=new Map,i=[],a=new Map;let s=null;for(const r of n.frames){if(!Number.isFinite(r.time)||!Number.isFinite(r.dt)||r.dt<=0){s=r;continue}const{startTime:o,endTime:l}=_h(r,s,e);if(l-o<=Hn){s=r;continue}for(const c of r.players){const d=GC(c.player_id),u=t.get(d)??new Map;let h=null,f=0;for(const g of zC){const _=VC(c,g),m=_-(u.get(g.fieldName)??0);m>f+Hn&&(f=m,h=g),u.set(g.fieldName,_)}t.set(d,u),h&&WC(i,a,{id:`time-in-zone:${d}:${h.fieldName}:${o.toFixed(3)}`,startTime:o,endTime:l,lane:`time-in-zone:${d}`,laneLabel:c.name,label:h.label,color:HC(h,c.is_team_0),isTeamZero:c.is_team_0})}s=r}return i}function _h(n,e,t){const i=t?.frames[n.frame_number]?.time??n.time,a=e?t?.frames[e.frame_number]?.time??e.time:Math.max(0,i-n.dt);return{startTime:Math.max(0,a),endTime:Math.max(a,i)}}function w_(n,e){if(!e)return;const t=n[n.length-1];if(t&&t.lane===e.lane&&t.label===e.label&&Math.abs(t.endTime-e.startTime)<=v_){t.endTime=e.endTime;return}n.push(e)}function WC(n,e,t){if(!t)return;const i=t.lane??"",a=e.get(i);if(a&&a.label===t.label&&Math.abs(a.endTime-t.startTime)<=v_){a.endTime=t.endTime;return}n.push(t),e.set(i,t)}function XC(n){return new Map(n.frames.map(e=>[e.frame_number,e]))}function St(n,e){return n.get(e)??null}const Yc=236,S_="relative-positioning",qC={last:"Last",upfield:"Upfield",level:"Level",mid:"Mid"};function Ts(n){return n?"team-blue":"team-orange"}function E_(n,e,t){return`<div class="player-card ${t.tone==="shared"?"shared":t.tone==="blue"?"team-blue":"team-orange"}">
    <div class="player-card-header">
      <span class="player-name">${n}</span>
      ${t.metaHtml??""}
    </div>
    ${e}
  </div>`}function Vt(n,e,t,i=""){return E_(n,t,{metaHtml:i,tone:e?"blue":"orange"})}function en(n,e){return`<div class="player-team-stack">${[!0,!1].map(t=>{const i=n.filter(s=>s.is_team_0===t);if(i.length===0)return"";const a=t?"Blue":"Orange";return`<section class="player-team-group ${Ts(t)}">
        <div class="player-team-header">
          <h3>${a} team</h3>
          <span>${i.length} player${i.length===1?"":"s"}</span>
        </div>
        <div class="player-stats-grid">
          ${i.map(e).join("")}
        </div>
      </section>`}).join("")}</div>`}function vh(n,e,t=""){return E_(n,e,{metaHtml:t,tone:"shared"})}function Gt(n,e,t){const i=St(n.statsFrameLookup,e);return i?i.players.find(a=>at(a.player_id)===t)??null:null}function YC(n,e,t){const i=n.players.find(g=>g.id===e);if(!i||!i.frames[t]?.position)return"mid";const s=i.isTeamZero,r=n.players.filter(g=>g.isTeamZero===s).length,o=[];let l=0;for(const g of n.players){if(g.isTeamZero!==s)continue;const _=g.frames[t];if(!_?.position)continue;const m=s?_.position.y:-_.position.y;o.push(m),g.id===e&&(l=m)}if(r<2||o.length!==r)return"mid";const c=Math.min(...o),d=Math.max(...o);if(d-c<=Yc)return"level";const h=l-c<=Yc,f=d-l<=Yc;return h&&!f?"last":f&&!h?"upfield":"mid"}function ZC(n){let e=null,t=null;const i=new Set,a=["possession_state","field_third"];return{id:"possession",label:"Possession",setup(){s()},teardown(){},onBeforeRender(){},getTimelineRanges(o){return NC(o.statsTimeline,o.replay)},getConfig(){return{breakdownClasses:r()}},applyConfig(o){if(i.clear(),o&&typeof o=="object"&&!Array.isArray(o)){const l=o.breakdownClasses;if(Array.isArray(l))for(const c of l)a.includes(c)&&i.add(c)}s(),n.rerenderCurrentState()},renderStats(o,l){const d=St(l.statsFrameLookup,o)?.team_zero?.possession;return d?vh("Control State",xp(d,{labelPerspective:{kind:"shared"},breakdownClasses:r()})):""},renderFocusedPlayerStats(o,l,c){const d=St(c.statsFrameLookup,l),u=Gt(c,l,o),h=u?.is_team_0?d?.team_zero?.possession:d?.team_one?.possession;return!h||!u?"":xp(h,{labelPerspective:{kind:"team"},breakdownClasses:r()})},renderSettings(){if(!e){e=document.createElement("div"),e.className="module-settings-card";const o=document.createElement("div");o.className="module-settings-header";const l=document.createElement("div"),c=document.createElement("p");c.className="module-settings-eyebrow",c.textContent="Stat display";const d=document.createElement("h3");d.textContent="Possession breakdown",l.append(c,d),t=document.createElement("strong"),t.className="metric-readout",o.append(l,t);const u=document.createElement("div");u.className="module-settings-options";const h=document.createElement("label");h.className="toggle";const f=document.createElement("input");f.type="checkbox",f.dataset.breakdownClass="possession_state",f.addEventListener("change",()=>{f.checked?i.add("possession_state"):i.delete("possession_state"),s(),n.rerenderCurrentState(),n.requestConfigSync?.()});const g=document.createElement("span");g.textContent="Control",h.append(f,g),u.append(h);const _=document.createElement("label");_.className="toggle";const m=document.createElement("input");m.type="checkbox",m.dataset.breakdownClass="field_third",m.addEventListener("change",()=>{m.checked?i.add("field_third"):i.delete("field_third"),s(),n.rerenderCurrentState(),n.requestConfigSync?.()});const p=document.createElement("span");p.textContent="Third",_.append(m,p),u.append(_),e.append(o,u)}return s(),e}};function s(){if(e){for(const o of e.querySelectorAll("input[data-breakdown-class]")){const l=o.dataset.breakdownClass;o.checked=l?i.has(l):!1}if(t){const o=a.filter(l=>i.has(l));t.textContent=o.length===0?"Total only":o.map(l=>l==="possession_state"?"Control":"Third").join(" x ")}}}function r(){return a.filter(o=>i.has(o))}}function KC(){let n=null;return{id:"fifty-fifty",label:"50/50",setup(e){n=new GA(e.player.sceneState,e.player.container,e.replay,e.statsTimeline)},teardown(){n?.dispose(),n=null},onBeforeRender(e){n?.update(e.currentTime)},getTimelineEvents(e){return jg(e.statsTimeline,e.replay)},renderStats(e,t){const i=St(t.statsFrameLookup,e);if(!i)return"";const a=vh("Challenge Summary",yA(i.team_zero?.fifty_fifty)),s=en(i.players,r=>Vt(r.name,r.is_team_0,vp(r.fifty_fifty)));return a+s},renderFocusedPlayerStats(e,t,i){const a=Gt(i,t,e);return a?vp(a.fifty_fifty):""}}}function jC(){let n=null,e=null;return{id:"pressure",label:"Half Control",setup(t){e=t.replay,n=new _A(t.player.sceneState.scene,t.fieldScale)},teardown(){n?.dispose(),n=null,e=null},onBeforeRender(t){const i=e?.ballFrames[t.frameIndex];n?.update(i?.position?.y??null)},getTimelineRanges(t){return IC(t.statsTimeline,t.replay)},renderStats(t,i){const s=St(i.statsFrameLookup,t)?.team_zero?.pressure;return s?vh("Field State",Sp(s,{labelPerspective:{kind:"shared"}})):""},renderFocusedPlayerStats(t,i,a){const s=St(a.statsFrameLookup,i),r=Gt(a,i,t),o=r?.is_team_0?s?.team_zero?.pressure:s?.team_one?.pressure;return!o||!r?"":Sp(o,{labelPerspective:{kind:"team"}})}}}function JC(){return{id:"rush",label:"Rush",setup(){},teardown(){},onBeforeRender(){},getTimelineRanges(n){return DC(n.statsTimeline,n.replay)},getTimelineEvents(n){return l_(n.statsTimeline,n.replay)},renderStats(n,e){const t=St(e.statsFrameLookup,n),i=t?.team_zero?.rush,a=t?.team_one?.rush;return!i||!a?"":[Vt("Blue Team",!0,Wc(i)),Vt("Orange Team",!1,Wc(a))].join("")},renderFocusedPlayerStats(n,e,t){const i=St(t.statsFrameLookup,e),a=Gt(t,e,n),s=a?.is_team_0?i?.team_zero?.rush:i?.team_one?.rush;return!s||!a?"":Wc(s)}}}const su={speed_band:{valueOrder:["slow","boost","supersonic"],formatValue:n=>({slow:"Slow",boost:"Boost",supersonic:"Supersonic"})[n]??n},height_band:{valueOrder:["ground","low_air","high_air"],formatValue:n=>({ground:"Ground",low_air:"Low air",high_air:"High air"})[n]??n}};function QC(n){const e=new Set,t=[];for(const i of n??[])e.has(i)||(e.add(i),t.push(i));return t}function Zc(n,e=1,t=""){return n===void 0||Number.isNaN(n)?"?":`${n.toFixed(e)}${t}`}function eR(n,e,t=1){return n===void 0||Number.isNaN(n)?"?":e===void 0||Number.isNaN(e)||e<=0?`${n.toFixed(t)}s`:`${n.toFixed(t)}s (${(n*100/e).toFixed(t)}%)`}function Up(n){return n.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Go(n,e){return`<div class="stat-row"><span class="label">${Up(n)}</span><span class="value">${Up(e)}</span></div>`}function tR(n,e,t){for(const i of t){const{valueOrder:a}=su[i],s=a.indexOf(n[i]),r=a.indexOf(e[i]),o=s===-1?Number.MAX_SAFE_INTEGER:s,l=r===-1?Number.MAX_SAFE_INTEGER:r;if(o!==l)return o-l}return 0}function nR(n,e){if(e.length===1){const t=e[0];return su[t].formatValue(n[t])}return e.map(t=>su[t].formatValue(n[t])).join(" / ")}function iR(n,e,t){if(e.length===0||!n?.labeled_tracked_time?.entries?.length)return"";const i=new Map,a=n?.labeled_tracked_time?.entries??[];for(const s of a){const r=new Map(s.labels.map(u=>[u.key,u.value])),o={};let l=!0;for(const u of e){const h=r.get(u);if(h===void 0){l=!1;break}o[u]=h}if(!l)continue;const c=e.map(u=>`${u}:${o[u]}`).join("|"),d=i.get(c);d?d.total+=s.value:i.set(c,{values:o,total:s.value})}return[...i.values()].sort((s,r)=>tR(s.values,r.values,e)).map(s=>Go(nR(s.values,e),eR(s.total,t))).join("")}function Fp(n,e={}){const t=n?.tracked_time,i=n&&t&&t>0?n.speed_integral/t:t===0?0:void 0,a=QC(e.breakdownClasses),s=iR(n,a,t);return`
    ${Go("Tracked",Zc(t,1,"s"))}
    ${Go("Distance",Zc(n?.total_distance,0," uu"))}
    ${Go("Avg speed",Zc(i,0," uu/s"))}
    ${s}
  `}const ru={kind:{label:"Kind",valueOrder:["control","medium_hit","hard_hit"],formatValue:n=>({control:"Control",medium_hit:"Medium",hard_hit:"Hard"})[n]??n},height_band:{label:"Height",valueOrder:["ground","low_air","high_air"],formatValue:n=>({ground:"Ground",low_air:"Low air",high_air:"High air"})[n]??n},surface:{label:"Surface",valueOrder:["ground","air","wall"],formatValue:n=>({ground:"Ground",air:"Air",wall:"Wall"})[n]??n},dodge_state:{label:"Dodge",valueOrder:["no_dodge","dodge"],formatValue:n=>({no_dodge:"No dodge",dodge:"Dodge"})[n]??n}};function aR(n){const e=new Set,t=[];for(const i of n??[])e.has(i)||(e.add(i),t.push(i));return t}function Ii(n){return n===void 0||Number.isNaN(n)?"?":`${Math.round(n)}`}function Kc(n,e=0,t=""){return n===void 0||!Number.isFinite(n)?"?":`${n.toFixed(e)}${t}`}function kp(n){return n.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Bn(n,e){return`<div class="stat-row"><span class="label">${kp(n)}</span><span class="value">${kp(e)}</span></div>`}function sR(n,e,t){for(const i of t){const{valueOrder:a}=ru[i],s=a.indexOf(n[i]),r=a.indexOf(e[i]),o=s===-1?Number.MAX_SAFE_INTEGER:s,l=r===-1?Number.MAX_SAFE_INTEGER:r;if(o!==l)return o-l}return 0}function rR(n,e){if(e.length===1){const t=e[0];return ru[t].formatValue(n[t])}return e.map(t=>ru[t].formatValue(n[t])).join(" / ")}function oR(n){return(n?.labeled_touch_counts?.entries??[]).map(e=>({labels:e.labels,count:e.count}))}function lR(n,e){if(e.length===0||n.length===0)return"";const t=new Map;for(const i of n){const a=new Map(i.labels.map(c=>[c.key,c.value])),s={};let r=!0;for(const c of e){const d=a.get(c);if(d===void 0){r=!1;break}s[c]=d}if(!r)continue;const o=e.map(c=>`${c}:${s[c]}`).join("|"),l=t.get(o);l?l.count+=i.count:t.set(o,{values:s,count:i.count})}return[...t.values()].sort((i,a)=>sR(i.values,a.values,e)).map(i=>Bn(rR(i.values,e),Ii(i.count))).join("")}function cR(n,e){if(!n||e.length!==1)return"";const[t]=e;if(t==="kind")return[Bn("Control",Ii(n.control_touch_count)),Bn("Medium",Ii(n.medium_hit_count)),Bn("Hard",Ii(n.hard_hit_count))].join("");if(t==="height_band"){const i=n.high_aerial_touch_count??0,a=(n.aerial_touch_count??0)-i,s=(n.touch_count??0)-(n.aerial_touch_count??0);return[Bn("Ground",Ii(s)),Bn("Low air",Ii(a)),Bn("High air",Ii(i))].join("")}return""}function Op(n,e={}){const t=aR(e.breakdownClasses),i=oR(n),a=lR(i,t)||cR(n,t);return`
    ${Bn("Touches",Ii(n?.touch_count))}
    ${Bn("Ball advanced",Kc(n?.total_ball_advance_distance,0," uu"))}
    ${Bn("Ball traveled",Kc(n?.total_ball_travel_distance,0," uu"))}
    ${Bn("Ball retreated",Kc(n?.total_ball_retreat_distance,0," uu"))}
    ${a}
  `}const Bp="subtr-actor-speed-flip-overlay-styles",dR=5882879,uR=16761180,hR=16185075,fR=150,pR=230,mR=220,gR=4;function M_(n){if(!n)return null;const[e,t]=Object.entries(n)[0]??["Unknown","unknown"],i=typeof t=="string"?t:JSON.stringify(t);return`${e}:${i}`}function _R(n,e){const t=M_(e);return t?n.players.find(i=>i.id===t)?.name??t:"Unknown"}function vR(n,e){return n.events.speed_flip.map(t=>{const i=_R(e,t.player),a=M_(t.player),s=e.frames[t.frame]?.time??t.time,r=t.confidence;return{id:`speed-flip:${t.frame}:${a}:${Math.round(r*1e3)}`,time:s,frame:t.frame,isTeamZero:t.is_team_0,playerId:a,playerName:i,position:{x:t.start_position[0],y:t.start_position[1],z:t.start_position[2]},quality:r,qualityLabel:`${Math.round(r*100)}%`}})}function yR(n,e,t){const i=Math.max(.1,t);return n.filter(a=>{const s=e-a.time;return s>=0&&s<=i})}function bR(){if(document.getElementById(Bp))return;const n=document.createElement("style");n.id=Bp,n.textContent=`
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
  `,document.head.append(n)}function xR(n,e,t,i){if(i.copy(n).project(e),i.z<-1||i.z>1)return!1;const a=t.clientWidth||1,s=t.clientHeight||1;return i.x=(i.x+1)*a/2,i.y=(1-i.y)*s/2,!(i.x<-100||i.x>a+100||i.y<-100||i.y>s+100)}class wR{scene;container;group=new _t;labelRoot;projectedPosition=new L;worldPosition=new L;labelOffset=new L(0,0,mR);markers;views=new Map;changedContainerPosition=!1;originalContainerPosition="";decaySeconds=gR;constructor(e,t,i,a){bR(),this.scene=e,this.container=t,this.markers=vR(a,i),getComputedStyle(t).position==="static"&&(this.changedContainerPosition=!0,this.originalContainerPosition=t.style.position,t.style.position="relative"),this.group.name="speed-flip-overlay",this.scene.replayRoot.add(this.group),this.labelRoot=document.createElement("div"),this.labelRoot.className="sap-speed-flip-overlay-root",this.container.append(this.labelRoot)}update(e){const t=yR(this.markers,e,this.decaySeconds),i=new Set(t.map(a=>a.id));for(const[a,s]of this.views.entries())i.has(a)||(s.ring.removeFromParent(),s.ring.geometry.dispose(),s.material.dispose(),s.label.remove(),this.views.delete(a));for(const a of t){const s=Math.max(0,e-a.time),r=Math.max(0,1-s/this.decaySeconds),o=this.ensureView(a),l=.16+.56*r,c=.96+(1-r)*.22;o.material.opacity=l,o.ring.position.set(a.position.x,a.position.y,a.position.z+14),o.ring.scale.setScalar(c+a.quality*.08),this.worldPosition.set(a.position.x,a.position.y,a.position.z).add(this.labelOffset);const d=xR(this.worldPosition,this.scene.camera,this.container,this.projectedPosition);o.label.style.display=d?"block":"none",d&&(o.label.style.left=`${this.projectedPosition.x}px`,o.label.style.top=`${this.projectedPosition.y}px`,o.label.style.opacity=`${.42+.58*r}`)}}dispose(){for(const e of this.views.values())e.ring.removeFromParent(),e.ring.geometry.dispose(),e.material.dispose(),e.label.remove();this.views.clear(),this.group.removeFromParent(),this.labelRoot.remove(),this.changedContainerPosition&&(this.container.style.position=this.originalContainerPosition)}ensureView(e){const t=this.views.get(e.id);if(t)return t;const i=new rt({color:e.quality>=.75?hR:e.isTeamZero?dR:uR,transparent:!0,opacity:.8,side:Qe,depthWrite:!1,depthTest:!1}),a=new Aa(fR,pR,48),s=new He(a,i);s.renderOrder=30,this.group.add(s);const r=document.createElement("div");r.className=`sap-speed-flip-overlay-label ${e.isTeamZero?"sap-speed-flip-overlay-label-blue":"sap-speed-flip-overlay-label-orange"}`,r.textContent=`${e.playerName} speed flip ${e.qualityLabel}`,this.labelRoot.append(r);const o={marker:e,ring:s,material:i,label:r};return this.views.set(e.id,o),o}}const So=[{value:"big",label:"Big pads"},{value:"small",label:"Small pads"},{value:"ambiguous",label:"Ambiguous pads"}],jc=[{value:"both",label:"Pickup events"}],Eo=[{value:"active",label:"Active play"},{value:"inactive",label:"Inactive play"},{value:"unknown",label:"Unknown activity"}],Mo=[{value:"own",label:"Own half"},{value:"opponent",label:"Opponent half"},{value:"unknown",label:"Unknown half"}];function SR(n,e){return n===e||n==="ambiguous"}function ER(n,e){const t=e?.events.boost_pickups??[];return t.length===0?null:t.find(i=>{const a=at(i.player_id),s=i.reported_frame??i.frame;return a===n.player.id&&i.comparison==="both"&&s===n.event.frame&&SR(i.pad_type,n.pad.size)})??null}function T_(n={}){let e=null,t=null,i=null,a=null,s=null,r=null;const o=new Set(So.map(T=>T.value)),l=new Set(jc.map(T=>T.value)),c=new Set(Eo.map(T=>T.value)),d=new Set(Mo.map(T=>T.value));let u=null,h=!1;function f(T,A,v,b){const R=document.createElement("div");R.className="boost-pickup-filter-group";const I=document.createElement("p");I.className="module-settings-group-title",I.textContent=T;const O=document.createElement("div");O.className="boost-pickup-filter-options";for(const H of A){const V=document.createElement("label");V.className="toggle";const B=document.createElement("input");B.type="checkbox",B.dataset.boostPickupFilter=b,B.dataset.boostPickupValue=H.value,B.addEventListener("change",()=>{B.checked?v.add(H.value):v.delete(H.value),m(s),n.refreshTimelineRanges?.(),n.rerenderCurrentState?.(),n.requestConfigSync?.()});const X=document.createElement("span");X.textContent=H.label,V.append(B,X),O.append(V)}return R.append(I,O),R}function g(){const T=document.createElement("div");T.className="boost-pickup-filter-group boost-pickup-filter-group-wide",i=T;const A=document.createElement("p");return A.className="module-settings-group-title",A.textContent="Player",a=document.createElement("div"),a.className="boost-pickup-filter-options",T.append(A,a),T}function _(T){if(a&&(a.replaceChildren(),i&&(i.hidden=!T||T.players.length===0),!!T))for(const A of T.players){const v=document.createElement("label");v.className="toggle";const b=document.createElement("input");b.type="checkbox",b.dataset.boostPickupPlayerId=A.id,b.addEventListener("change",()=>{u||(u=new Set(T.players.map(I=>I.id))),b.checked?u.add(A.id):u.delete(A.id),m(T),n.refreshTimelineRanges?.(),n.rerenderCurrentState?.(),n.requestConfigSync?.()});const R=document.createElement("span");R.textContent=`${A.name} (${A.isTeamZero?"Blue":"Orange"})`,v.append(b,R),a.append(v)}}function m(T){if(e){for(const A of e.querySelectorAll("input[data-boost-pickup-filter][data-boost-pickup-value]")){const v=A.dataset.boostPickupFilter,b=A.dataset.boostPickupValue;A.checked=p(v,b)}for(const A of e.querySelectorAll("input[data-boost-pickup-player-id]")){const v=A.dataset.boostPickupPlayerId;A.checked=v?u?.has(v)??!0:!1}t&&(t.textContent=S(T))}}function p(T,A){if(!A)return!1;switch(T){case"pad-type":return o.has(A);case"comparison":return l.has(A);case"activity":return c.has(A);case"field-half":return d.has(A);default:return!1}}function S(T){const A=T?.players.length??0,v=u?u.size:A;if(o.size===0||l.size===0||c.size===0||d.size===0||u!==null&&u.size===0)return"Hidden";const R=[o.size<So.length,l.size<jc.length,c.size<Eo.length,d.size<Mo.length,u!==null&&v<A].filter(Boolean).length;return R===0?"All labels":`${R} filters`}function x(T){if(u&&!u.has(T.player.id))return!1;if((r?.events.boost_pickups??[]).length===0)return o.has(T.pad.size)&&l.has("both")&&c.has("unknown")&&d.has("unknown");const A=ER(T,r);return A?o.has(A.pad_type)&&l.has(A.comparison)&&c.has(A.activity)&&d.has(A.field_half):!1}function y(T,A,v){if(T.clear(),!Array.isArray(v)){for(const R of A)T.add(R.value);return}const b=new Set(A.map(R=>R.value));for(const R of v)typeof R=="string"&&b.has(R)&&T.add(R)}function C(){return{padTypes:[...o],comparisons:[...l],activities:[...c],fieldHalves:[...d],playerIds:u?[...u]:null}}function M(T){if(!T||typeof T!="object"||Array.isArray(T))return;const A=T;y(o,So,A.padTypes),y(l,jc,A.comparisons),y(c,Eo,A.activities),y(d,Mo,A.fieldHalves),u=Array.isArray(A.playerIds)?new Set(A.playerIds.filter(v=>typeof v=="string")):null,h=s===null&&u!==null,m(s),n.refreshTimelineRanges?.(),n.rerenderCurrentState?.(),n.requestConfigSync?.()}return{setup(T){s!==T.replay&&(s=T.replay,h?h=!1:u=null),r=T.statsTimeline,m(T.replay)},teardown(){},getConfig:C,applyConfig:M,getTimelineRangeOptions(){const T={padTypes:o,comparisons:l,activities:c,fieldHalves:d};return u&&(T.playerIds=u),T},includePickup:x,renderSettings(T,A){if(!e){e=document.createElement("div"),e.className="boost-pickup-filter-panel";const v=document.createElement("div");v.className="boost-pickup-filter-summary",t=document.createElement("strong"),t.className="metric-readout",v.append(t);const b=document.createElement("div");b.className="boost-pickup-filter-grid",b.append(f("Pad type",So,o,"pad-type"),f("Activity",Eo,c,"activity"),f("Field half",Mo,d,"field-half"),g()),(A.showHeader??!1)&&e.append(v),e.append(b)}return _(T?.replay??null),m(T?.replay??null),e}}}function wn(n){return{id:n.id,label:n.label,setup(){},teardown(){},onBeforeRender(){},getTimelineEvents:n.getTimelineEvents,renderStats(e,t){const i=St(t.statsFrameLookup,e);return i?en(i.players,a=>Vt(a.name,a.is_team_0,n.render(n.select(a),a))):""},renderFocusedPlayerStats(e,t,i){const a=Gt(i,t,e);return a?n.render(n.select(a),a):""}}}const MR=255;function Ca(n){return n*100/MR}function kn(n){return n==null?"?":Ca(n).toFixed(0)}function TR(n,e){const t=kn(n);if(n==null||e==null)return t;const i=kn(n+e);return`${t} (${i})`}function Jc(n){n&&typeof n=="object"&&"dispose"in n&&typeof n.dispose=="function"&&n.dispose()}function AR(n){n&&(n.removeFromParent(),n.traverse(e=>{const t="geometry"in e?e.geometry:null;Jc(t);const i="material"in e?e.material:null;if(Array.isArray(i))for(const a of i)Jc(a);else Jc(i)}))}function CR(){let n=0,e=null;return{acquire(t){e||(e=vA(t.player.sceneState.scene,t.fieldScale)),n+=1},release(){n<=0||(n-=1,n===0&&(AR(e),e=null))}}}const zp=CR();function ze(n){return n===void 0||Number.isNaN(n)?"?":`${Math.round(n)}`}function ve(n,e=1,t=""){return n===void 0||Number.isNaN(n)?"?":`${n.toFixed(e)}${t}`}function ou(n,e=0){return ve(n,e,"%")}function A_(n,e,t=1,i=0){if(n===void 0||Number.isNaN(n))return ou(e,i);const a=ve(n,t,"s");return e===void 0||Number.isNaN(e)?a:`${a} (${ou(e,i)})`}function ca(n,e,t=1,i=0){const a=n!==void 0&&e!==void 0&&!Number.isNaN(n)&&!Number.isNaN(e)&&e>0?n*100/e:void 0;return A_(n,a,t,i)}function Ze(n){return typeof n=="number"&&Number.isFinite(n)?n:void 0}function ti(n){const e=Ze(n);return e===void 0?void 0:e*100}function C_(n){return Ze(n?.tracked_time)}function RR(n,e,t){const i=Ze(n?.[e]);if(i!==void 0)return i;const a=C_(n),s=Ze(n?.[t]);if(!(a===void 0||a<=0||s===void 0))return s*100/a}function an(n,e,t){return A_(Ze(n?.[t]),RR(n,e,t))}function Hp(n,e,t){const i=Ze(n?.[e]);if(i!==void 0)return i;const a=C_(n),s=Ze(n?.[t]);if(!(a===void 0||a<=0||s===void 0))return s/a}function Gp(n){return`
    <div class="stat-row"><span class="label">Most back</span><span class="value">${an(n,"percent_most_back","time_most_back")}</span></div>
    <div class="stat-row"><span class="label">Most forward</span><span class="value">${an(n,"percent_most_forward","time_most_forward")}</span></div>
    <div class="stat-row"><span class="label">Mid role</span><span class="value">${an(n,"percent_mid_role","time_mid_role")}</span></div>
    <div class="stat-row"><span class="label">Other role</span><span class="value">${an(n,"percent_other_role","time_other_role")}</span></div>
    <div class="stat-row"><span class="label">Closest to ball</span><span class="value">${an(n,"percent_closest_to_ball","time_closest_to_ball")}</span></div>
    <div class="stat-row"><span class="label">Farthest from ball</span><span class="value">${an(n,"percent_farthest_from_ball","time_farthest_from_ball")}</span></div>
    <div class="stat-row"><span class="label">Behind ball</span><span class="value">${an(n,"percent_behind_ball","time_behind_ball")}</span></div>
    <div class="stat-row"><span class="label">Level with ball</span><span class="value">${an(n,"percent_level_with_ball","time_level_with_ball")}</span></div>
    <div class="stat-row"><span class="label">In front of ball</span><span class="value">${an(n,"percent_in_front_of_ball","time_in_front_of_ball")}</span></div>
  `}function Vp(n){return`
    <div class="stat-row"><span class="label">Defensive zone</span><span class="value">${an(n,"percent_defensive_third","time_defensive_third")}</span></div>
    <div class="stat-row"><span class="label">Neutral zone</span><span class="value">${an(n,"percent_neutral_third","time_neutral_third")}</span></div>
    <div class="stat-row"><span class="label">Offensive zone</span><span class="value">${an(n,"percent_offensive_third","time_offensive_third")}</span></div>
    <div class="stat-row"><span class="label">Defensive half</span><span class="value">${an(n,"percent_defensive_half","time_defensive_half")}</span></div>
    <div class="stat-row"><span class="label">Offensive half</span><span class="value">${an(n,"percent_offensive_half","time_offensive_half")}</span></div>
    <div class="stat-row"><span class="label">To teammates</span><span class="value">${ve(Hp(n,"average_distance_to_teammates","sum_distance_to_teammates"),0)}</span></div>
    <div class="stat-row"><span class="label">To ball</span><span class="value">${ve(Hp(n,"average_distance_to_ball","sum_distance_to_ball"),0)}</span></div>
  `}function oa(n,e){return ca(Ze(n?.[e]),Ze(n?.tracked_time))}function $p(n){return n?n.split("_").map(e=>e.charAt(0).toUpperCase()+e.slice(1)).join(" "):"?"}function PR(n){return`
    <div class="stat-row"><span class="label">Current role</span><span class="value">${$p(n?.current_role_state)}</span></div>
    <div class="stat-row"><span class="label">Current depth</span><span class="value">${$p(n?.current_depth_state)}</span></div>
    <div class="stat-row"><span class="label">First man</span><span class="value">${oa(n,"time_first_man")}</span></div>
    <div class="stat-row"><span class="label">Second man</span><span class="value">${oa(n,"time_second_man")}</span></div>
    <div class="stat-row"><span class="label">Third man</span><span class="value">${oa(n,"time_third_man")}</span></div>
    <div class="stat-row"><span class="label">Ambiguous</span><span class="value">${oa(n,"time_ambiguous_role")}</span></div>
    <div class="stat-row"><span class="label">Behind play</span><span class="value">${oa(n,"time_behind_play")}</span></div>
    <div class="stat-row"><span class="label">Level with play</span><span class="value">${oa(n,"time_level_with_play")}</span></div>
    <div class="stat-row"><span class="label">Ahead of play</span><span class="value">${oa(n,"time_ahead_of_play")}</span></div>
    <div class="stat-row"><span class="label">Became first</span><span class="value">${ze(n?.became_first_man_count)}</span></div>
    <div class="stat-row"><span class="label">Lost first</span><span class="value">${ze(n?.lost_first_man_count)}</span></div>
  `}function LR(n){const e=n&&n.shots>0?n.goals*100/n.shots:void 0;return`
    <div class="stat-row"><span class="label">Score</span><span class="value">${ze(n?.score)}</span></div>
    <div class="stat-row"><span class="label">Goals</span><span class="value">${ze(n?.goals)}</span></div>
    <div class="stat-row"><span class="label">Assists</span><span class="value">${ze(n?.assists)}</span></div>
    <div class="stat-row"><span class="label">Saves</span><span class="value">${ze(n?.saves)}</span></div>
    <div class="stat-row"><span class="label">Shots</span><span class="value">${ze(n?.shots)}</span></div>
    <div class="stat-row"><span class="label">Shooting %</span><span class="value">${ou(e)}</span></div>
  `}function NR(n){return`
    <div class="stat-row"><span class="label">Hits</span><span class="value">${ze(n?.count)}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${ve(Ze(n?.time_since_last_backboard),2,"s")}</span></div>
  `}function IR(n){return`
    <div class="stat-row"><span class="label">Count</span><span class="value">${ze(n?.count)}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${ve(Ze(n?.time_since_last_double_tap),2,"s")}</span></div>
  `}function DR(n){const e=n&&n.completed_pass_count>0?n.total_pass_distance/n.completed_pass_count:void 0,t=n&&n.completed_pass_count>0?n.total_pass_advance/n.completed_pass_count:void 0;return`
    <div class="stat-row"><span class="label">Completed</span><span class="value">${ze(n?.completed_pass_count)}</span></div>
    <div class="stat-row"><span class="label">Received</span><span class="value">${ze(n?.received_pass_count)}</span></div>
    <div class="stat-row"><span class="label">Avg distance</span><span class="value">${ve(e,0)}</span></div>
    <div class="stat-row"><span class="label">Avg advance</span><span class="value">${ve(t,0)}</span></div>
    <div class="stat-row"><span class="label">Longest</span><span class="value">${ve(n?.longest_pass_distance,0)}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${ve(Ze(n?.time_since_last_completed_pass),2,"s")}</span></div>
  `}function UR(n){const e=n&&n.count>0?n.total_ball_speed/n.count:void 0,t=n&&n.count>0?n.total_pass_distance/n.count:void 0;return`
    <div class="stat-row"><span class="label">Attempts</span><span class="value">${ze(n?.count)}</span></div>
    <div class="stat-row"><span class="label">Avg speed</span><span class="value">${ve(e,0)}</span></div>
    <div class="stat-row"><span class="label">Fastest</span><span class="value">${ve(n?.fastest_ball_speed,0)}</span></div>
    <div class="stat-row"><span class="label">Avg pass distance</span><span class="value">${ve(t,0)}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${ve(Ze(n?.time_since_last_one_timer),2,"s")}</span></div>
  `}function Wp(n){const e=n&&n.count>0?n.cumulative_confidence/n.count:void 0;return`
    <div class="stat-row"><span class="label">Attempts</span><span class="value">${ze(n?.count)}</span></div>
    <div class="stat-row"><span class="label">High conf</span><span class="value">${ze(n?.high_confidence_count)}</span></div>
    <div class="stat-row"><span class="label">Last quality</span><span class="value">${ve(Ze(n?.last_confidence),0,"%")}</span></div>
    <div class="stat-row"><span class="label">Avg quality</span><span class="value">${ve(e,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Best quality</span><span class="value">${ve(Ze(n?.best_confidence),0,"%")}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${ve(Ze(n?.time_since_last_ceiling_shot),2,"s")}</span></div>
  `}function Xp(n){const e=n&&n.count>0?n.cumulative_confidence/n.count:void 0,t=ti(e),i=n&&n.count>0?n.cumulative_setup_duration/n.count:void 0,a=n&&n.count>0?n.cumulative_takeoff_to_touch_time/n.count:void 0,s=n&&n.count>0?n.cumulative_touch_height/n.count:void 0;return`
    <div class="stat-row"><span class="label">Plays</span><span class="value">${ze(n?.count)}</span></div>
    <div class="stat-row"><span class="label">High conf</span><span class="value">${ze(n?.high_confidence_count)}</span></div>
    <div class="stat-row"><span class="label">Last quality</span><span class="value">${ve(ti(n?.last_confidence),0,"%")}</span></div>
    <div class="stat-row"><span class="label">Avg quality</span><span class="value">${ve(t,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Avg setup</span><span class="value">${ve(i,2,"s")}</span></div>
    <div class="stat-row"><span class="label">Avg takeoff</span><span class="value">${ve(a,2,"s")}</span></div>
    <div class="stat-row"><span class="label">Avg height</span><span class="value">${ve(s,0)}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${ve(Ze(n?.time_since_last_wall_aerial),2,"s")}</span></div>
  `}function qp(n){const e=n&&n.count>0?n.cumulative_confidence/n.count:void 0,t=n&&n.count>0?n.cumulative_takeoff_to_shot_time/n.count:void 0,i=n&&n.count>0?n.cumulative_shot_height/n.count:void 0;return`
    <div class="stat-row"><span class="label">Shots</span><span class="value">${ze(n?.count)}</span></div>
    <div class="stat-row"><span class="label">High conf</span><span class="value">${ze(n?.high_confidence_count)}</span></div>
    <div class="stat-row"><span class="label">Last quality</span><span class="value">${ve(ti(n?.last_confidence),0,"%")}</span></div>
    <div class="stat-row"><span class="label">Avg quality</span><span class="value">${ve(ti(e),0,"%")}</span></div>
    <div class="stat-row"><span class="label">Avg takeoff</span><span class="value">${ve(t,2,"s")}</span></div>
    <div class="stat-row"><span class="label">Avg height</span><span class="value">${ve(i,0)}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${ve(Ze(n?.time_since_last_wall_aerial_shot),2,"s")}</span></div>
  `}function FR(n){const e=n&&n.carry_count>0?n.average_horizontal_gap_sum/n.carry_count:void 0;return`
    <div class="stat-row"><span class="label">Carries</span><span class="value">${ze(n?.carry_count)}</span></div>
    <div class="stat-row"><span class="label">Total time</span><span class="value">${ve(n?.total_carry_time,1,"s")}</span></div>
    <div class="stat-row"><span class="label">Longest</span><span class="value">${ve(n?.longest_carry_time,1,"s")}</span></div>
    <div class="stat-row"><span class="label">Furthest</span><span class="value">${ve(n?.furthest_carry_distance,0)}</span></div>
    <div class="stat-row"><span class="label">Avg gap</span><span class="value">${ve(e,0)}</span></div>
  `}function kR(n){const e=n&&n.count>0?n.average_horizontal_gap_sum/n.count:void 0,t=n&&n.count>0?n.total_touch_count/n.count:void 0;return`
    <div class="stat-row"><span class="label">Air dribbles</span><span class="value">${ze(n?.count)}</span></div>
    <div class="stat-row"><span class="label">Ground to air</span><span class="value">${ze(n?.ground_to_air_count)}</span></div>
    <div class="stat-row"><span class="label">Wall to air</span><span class="value">${ze(n?.wall_to_air_count)}</span></div>
    <div class="stat-row"><span class="label">Avg touches</span><span class="value">${ve(t,1)}</span></div>
    <div class="stat-row"><span class="label">Max touches</span><span class="value">${ze(n?.max_touch_count)}</span></div>
    <div class="stat-row"><span class="label">Total time</span><span class="value">${ve(n?.total_time,1,"s")}</span></div>
    <div class="stat-row"><span class="label">Longest</span><span class="value">${ve(n?.longest_time,1,"s")}</span></div>
    <div class="stat-row"><span class="label">Furthest</span><span class="value">${ve(n?.furthest_distance,0)}</span></div>
    <div class="stat-row"><span class="label">Avg gap</span><span class="value">${ve(e,0)}</span></div>
  `}function OR(n){const e=n&&n.press_count>0?n.total_duration/n.press_count:void 0;return`
    <div class="stat-row"><span class="label">Presses</span><span class="value">${ze(n?.press_count)}</span></div>
    <div class="stat-row"><span class="label">Total time</span><span class="value">${ve(n?.total_duration,1,"s")}</span></div>
    <div class="stat-row"><span class="label">Avg duration</span><span class="value">${ve(e,2,"s")}</span></div>
  `}function BR(n){const e=n&&n.whiff_count>0?n.cumulative_closest_approach_distance/n.whiff_count:void 0;return`
    <div class="stat-row"><span class="label">Whiffs</span><span class="value">${ze(n?.whiff_count)}</span></div>
    <div class="stat-row"><span class="label">Beaten to ball</span><span class="value">${ze(n?.beaten_to_ball_count)}</span></div>
    <div class="stat-row"><span class="label">Grounded</span><span class="value">${ze(n?.grounded_whiff_count)}</span></div>
    <div class="stat-row"><span class="label">Aerial</span><span class="value">${ze(n?.aerial_whiff_count)}</span></div>
    <div class="stat-row"><span class="label">Dodge</span><span class="value">${ze(n?.dodge_whiff_count)}</span></div>
    <div class="stat-row"><span class="label">Last closest</span><span class="value">${ve(Ze(n?.last_closest_approach_distance),0)}</span></div>
    <div class="stat-row"><span class="label">Best closest</span><span class="value">${ve(Ze(n?.best_closest_approach_distance),0)}</span></div>
    <div class="stat-row"><span class="label">Avg closest</span><span class="value">${ve(e,0)}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${ve(Ze(n?.time_since_last_whiff),2,"s")}</span></div>
  `}function zR(n){return`
    <div class="stat-row"><span class="label">Inflicted</span><span class="value">${ze(n?.demos_inflicted)}</span></div>
    <div class="stat-row"><span class="label">Taken</span><span class="value">${ze(n?.demos_taken)}</span></div>
  `}function HR(n){const e=n&&n.bumps_inflicted>0?n.cumulative_bump_strength/n.bumps_inflicted:void 0;return`
    <div class="stat-row"><span class="label">Inflicted</span><span class="value">${ze(n?.bumps_inflicted)}</span></div>
    <div class="stat-row"><span class="label">Taken</span><span class="value">${ze(n?.bumps_taken)}</span></div>
    <div class="stat-row"><span class="label">Team inflicted</span><span class="value">${ze(n?.team_bumps_inflicted)}</span></div>
    <div class="stat-row"><span class="label">Team taken</span><span class="value">${ze(n?.team_bumps_taken)}</span></div>
    <div class="stat-row"><span class="label">Last strength</span><span class="value">${ve(Ze(n?.last_bump_strength),0)}</span></div>
    <div class="stat-row"><span class="label">Max strength</span><span class="value">${ve(Ze(n?.max_bump_strength),0)}</span></div>
    <div class="stat-row"><span class="label">Avg strength</span><span class="value">${ve(e,0)}</span></div>
  `}function GR(n){return`
    <div class="stat-row"><span class="label">Refreshes</span><span class="value">${ze(n?.count)}</span></div>
    <div class="stat-row"><span class="label">Flip resets</span><span class="value">${ze(n?.on_ball_count)}</span></div>
  `}function Yp(n){const e=n&&n.count>0?n.cumulative_confidence/n.count:void 0;return`
    <div class="stat-row"><span class="label">Attempts</span><span class="value">${ze(n?.count)}</span></div>
    <div class="stat-row"><span class="label">High conf</span><span class="value">${ze(n?.high_confidence_count)}</span></div>
    <div class="stat-row"><span class="label">Last quality</span><span class="value">${ve(Ze(n?.last_confidence),0,"%")}</span></div>
    <div class="stat-row"><span class="label">Avg quality</span><span class="value">${ve(e,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Best quality</span><span class="value">${ve(Ze(n?.best_confidence),0,"%")}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${ve(Ze(n?.time_since_last_musty),2,"s")}</span></div>
  `}function Zp(n){const e=n&&n.count>0?n.cumulative_confidence/n.count:void 0,t=n&&n.count>0?n.cumulative_setup_duration/n.count:void 0,i=n&&n.count>0?n.cumulative_ball_speed_change/n.count:void 0;return`
    <div class="stat-row"><span class="label">Attempts</span><span class="value">${ze(n?.count)}</span></div>
    <div class="stat-row"><span class="label">High conf</span><span class="value">${ze(n?.high_confidence_count)}</span></div>
    <div class="stat-row"><span class="label">Last quality</span><span class="value">${ve(Ze(n?.last_confidence),0,"%")}</span></div>
    <div class="stat-row"><span class="label">Avg quality</span><span class="value">${ve(e,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Avg setup</span><span class="value">${ve(t,2,"s")}</span></div>
    <div class="stat-row"><span class="label">Avg impulse</span><span class="value">${ve(i,0,"uu/s")}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${ve(Ze(n?.time_since_last_flick),2,"s")}</span></div>
  `}function Kp(n){const e=n&&n.count>0?n.cumulative_quality/n.count:void 0;return`
    <div class="stat-row"><span class="label">Attempts</span><span class="value">${ze(n?.count)}</span></div>
    <div class="stat-row"><span class="label">High conf</span><span class="value">${ze(n?.high_confidence_count)}</span></div>
    <div class="stat-row"><span class="label">Last quality</span><span class="value">${ve(Ze(n?.last_quality),0,"%")}</span></div>
    <div class="stat-row"><span class="label">Avg quality</span><span class="value">${ve(e,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Best quality</span><span class="value">${ve(Ze(n?.best_quality),0,"%")}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${ve(Ze(n?.time_since_last_speed_flip),2,"s")}</span></div>
  `}function jp(n){const e=n&&n.count>0?n.cumulative_quality/n.count:void 0,t=ti(n?.last_quality),i=ti(e),a=ti(n?.best_quality);return`
    <div class="stat-row"><span class="label">Attempts</span><span class="value">${ze(n?.count)}</span></div>
    <div class="stat-row"><span class="label">High conf</span><span class="value">${ze(n?.high_confidence_count)}</span></div>
    <div class="stat-row"><span class="label">Last quality</span><span class="value">${ve(t,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Avg quality</span><span class="value">${ve(i,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Best quality</span><span class="value">${ve(a,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${ve(Ze(n?.time_since_last_half_flip),2,"s")}</span></div>
  `}function Jp(n){const e=n&&n.count>0?n.cumulative_quality/n.count:void 0,t=ti(n?.last_quality),i=ti(e),a=ti(n?.best_quality);return`
    <div class="stat-row"><span class="label">Attempts</span><span class="value">${ze(n?.count)}</span></div>
    <div class="stat-row"><span class="label">High conf</span><span class="value">${ze(n?.high_confidence_count)}</span></div>
    <div class="stat-row"><span class="label">Last quality</span><span class="value">${ve(t,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Avg quality</span><span class="value">${ve(i,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Best quality</span><span class="value">${ve(a,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${ve(Ze(n?.time_since_last_wavedash),2,"s")}</span></div>
  `}function Qp(n){const e=n&&n.tracked_time>0?Ca(n.boost_integral/n.tracked_time).toFixed(0):"?",t=Ze(n?.tracked_time);return`
    <div class="stat-row"><span class="label">Collected</span><span class="value">${TR(n?.amount_collected,n?.amount_respawned)}</span></div>
    <div class="stat-row"><span class="label">Inactive collected</span><span class="value">${kn(n?.amount_collected_inactive)}</span></div>
    <div class="stat-row"><span class="label">Big pads amt</span><span class="value">${kn(n?.amount_collected_big)}</span></div>
    <div class="stat-row"><span class="label">Small pads amt</span><span class="value">${kn(n?.amount_collected_small)}</span></div>
    <div class="stat-row"><span class="label">Respawns</span><span class="value">${kn(n?.amount_respawned)}</span></div>
    <div class="stat-row"><span class="label">Overfill</span><span class="value">${kn(n?.overfill_total)}</span></div>
    <div class="stat-row"><span class="label">Used</span><span class="value">${kn(n?.amount_used)}</span></div>
    <div class="stat-row"><span class="label">Used ground</span><span class="value">${kn(n?.amount_used_while_grounded)}</span></div>
    <div class="stat-row"><span class="label">Used air</span><span class="value">${kn(n?.amount_used_while_airborne)}</span></div>
    <div class="stat-row"><span class="label">Big pads</span><span class="value">${n?.big_pads_collected??"?"}</span></div>
    <div class="stat-row"><span class="label">Small pads</span><span class="value">${n?.small_pads_collected??"?"}</span></div>
    <div class="stat-row"><span class="label">Inactive big pads</span><span class="value">${n?.big_pads_collected_inactive??"?"}</span></div>
    <div class="stat-row"><span class="label">Inactive small pads</span><span class="value">${n?.small_pads_collected_inactive??"?"}</span></div>
    <div class="stat-row"><span class="label">Stolen</span><span class="value">${kn(n?.amount_stolen)}</span></div>
    <div class="stat-row"><span class="label">Avg boost</span><span class="value">${e}</span></div>
    <div class="stat-row"><span class="label">Time @ 0</span><span class="value">${ca(Ze(n?.time_zero_boost),t)}</span></div>
    <div class="stat-row"><span class="label">Time 0-25</span><span class="value">${ca(Ze(n?.time_boost_0_25),t)}</span></div>
    <div class="stat-row"><span class="label">Time 25-50</span><span class="value">${ca(Ze(n?.time_boost_25_50),t)}</span></div>
    <div class="stat-row"><span class="label">Time 50-75</span><span class="value">${ca(Ze(n?.time_boost_50_75),t)}</span></div>
    <div class="stat-row"><span class="label">Time 75-100</span><span class="value">${ca(Ze(n?.time_boost_75_100),t)}</span></div>
    <div class="stat-row"><span class="label">Time @ 100</span><span class="value">${ca(Ze(n?.time_hundred_boost),t)}</span></div>
  `}function VR(n,e=T_({refreshTimelineRanges:n.refreshTimelineRanges,rerenderCurrentState:n.rerenderCurrentState})){return{id:"boost",label:"Boost",setup(t){e.setup(t)},teardown(){e.teardown()},onBeforeRender(){},getTimelineRanges(t){return BC(t.statsTimeline,t.replay,e.getTimelineRangeOptions())},getConfig(){return e.getConfig()},applyConfig(t){e.applyConfig(t)},includeBoostPickupAnimationPickup(t){return e.includePickup(t)},renderStats(t,i){const a=St(i.statsFrameLookup,t);return a?en(a.players,s=>Vt(s.name,s.is_team_0,Qp(s.boost))):""},renderFocusedPlayerStats(t,i,a){const s=Gt(a,i,t);return s?Qp(s.boost):""},renderSettings(t){return e.renderSettings(t,{showHeader:!0})}}}function $R(){return wn({id:"core",label:"Core",select:n=>n.core,render:n=>LR(n)})}function WR(){return wn({id:"backboard",label:"Backboard",select:n=>n.backboard,render:n=>NR(n),getTimelineEvents(n){return t_(n.statsTimeline,n.replay)}})}function XR(){let n=null;return{id:"ceiling-shot",label:"Ceiling Shot",setup(e){n=new eC(e.player.sceneState,e.player.container,e.replay,e.statsTimeline)},teardown(){n?.dispose(),n=null},onBeforeRender(e){n?.update(e.currentTime)},getTimelineEvents(e){return n_(e.statsTimeline,e.replay)},renderStats(e,t){const i=St(t.statsFrameLookup,e);return i?en(i.players,a=>Vt(a.name,a.is_team_0,Wp(a.ceiling_shot),a.ceiling_shot?.is_last_ceiling_shot?'<span class="role-indicator role-forward">Last Ceiling Shot</span>':"")):""},renderFocusedPlayerStats(e,t,i){const a=Gt(i,t,e);return a?Wp(a.ceiling_shot):""}}}function qR(){return{id:"wall-aerial",label:"Wall-to-Air Setup",setup(){},teardown(){},onBeforeRender(){},getTimelineEvents(n){return i_(n.statsTimeline,n.replay)},renderStats(n,e){const t=St(e.statsFrameLookup,n);return t?en(t.players,i=>Vt(i.name,i.is_team_0,Xp(i.wall_aerial),i.wall_aerial?.is_last_wall_aerial?'<span class="role-indicator role-forward">Last Wall-to-Air Setup</span>':"")):""},renderFocusedPlayerStats(n,e,t){const i=Gt(t,e,n);return i?Xp(i.wall_aerial):""}}}function YR(){return{id:"wall-aerial-shot",label:"Wall Aerial Shot",setup(){},teardown(){},onBeforeRender(){},getTimelineEvents(n){return a_(n.statsTimeline,n.replay)},renderStats(n,e){const t=St(e.statsFrameLookup,n);return t?en(t.players,i=>Vt(i.name,i.is_team_0,qp(i.wall_aerial_shot),i.wall_aerial_shot?.is_last_wall_aerial_shot?'<span class="role-indicator role-forward">Last Wall Aerial Shot</span>':"")):""},renderFocusedPlayerStats(n,e,t){const i=Gt(t,e,n);return i?qp(i.wall_aerial_shot):""}}}function ZR(){return wn({id:"ball-carry",label:"Ball Carry",select:n=>n.ball_carry,render:n=>FR(n),getTimelineEvents(n){return u_(n.statsTimeline,n.replay)}})}function KR(){return wn({id:"air-dribble",label:"Air Dribble",select:n=>n.air_dribble,render:n=>kR(n)})}function jR(){return wn({id:"dodge-reset",label:"Dodge Refresh",select:n=>n.dodge_reset,render:n=>GR(n),getTimelineEvents(n){return d_(n.statsTimeline,n.replay)}})}function JR(){return wn({id:"double-tap",label:"Double Tap",select:n=>n.double_tap,render:n=>IR(n),getTimelineEvents(n){return s_(n.statsTimeline,n.replay)}})}function QR(){return wn({id:"pass",label:"Pass",select:n=>n.pass,render:n=>DR(n),getTimelineEvents(n){return o_(n.statsTimeline,n.replay)}})}function eP(){return wn({id:"one-timer",label:"One-timer",select:n=>n.one_timer,render:n=>UR(n),getTimelineEvents(n){return r_(n.statsTimeline,n.replay)}})}function tP(){return{id:"musty-flick",label:"Musty Flick",setup(){},teardown(){},onBeforeRender(){},getTimelineEvents(n){return Jg(n.statsTimeline,n.replay)},renderStats(n,e){const t=St(e.statsFrameLookup,n);return t?en(t.players,i=>Vt(i.name,i.is_team_0,Yp(i.musty_flick),i.musty_flick?.is_last_musty?'<span class="role-indicator role-forward">Last Musty</span>':"")):""},renderFocusedPlayerStats(n,e,t){const i=Gt(t,e,n);return i?Yp(i.musty_flick):""}}}function nP(){return{id:"flick",label:"Flick",setup(){},teardown(){},onBeforeRender(){},getTimelineEvents(n){return Qg(n.statsTimeline,n.replay)},renderStats(n,e){const t=St(e.statsFrameLookup,n);return t?en(t.players,i=>Vt(i.name,i.is_team_0,Zp(i.flick),i.flick?.is_last_flick?'<span class="role-indicator role-forward">Last Flick</span>':"")):""},renderFocusedPlayerStats(n,e,t){const i=Gt(t,e,n);return i?Zp(i.flick):""}}}function iP(){let n=null;return{id:"speed-flip",label:"Speed Flip",setup(e){n=new wR(e.player.sceneState,e.player.container,e.replay,e.statsTimeline)},teardown(){n?.dispose(),n=null},onBeforeRender(e){n?.update(e.currentTime)},getTimelineEvents(e){return f_(e.statsTimeline,e.replay)},renderStats(e,t){const i=St(t.statsFrameLookup,e);return i?en(i.players,a=>Vt(a.name,a.is_team_0,Kp(a.speed_flip),a.speed_flip?.is_last_speed_flip?'<span class="role-indicator role-forward">Last Speed Flip</span>':"")):""},renderFocusedPlayerStats(e,t,i){const a=Gt(i,t,e);return a?Kp(a.speed_flip):""}}}function aP(){return{id:"half-flip",label:"Half Flip",setup(){},teardown(){},onBeforeRender(){},getTimelineEvents(n){return p_(n.statsTimeline,n.replay)},renderStats(n,e){const t=St(e.statsFrameLookup,n);return t?en(t.players,i=>Vt(i.name,i.is_team_0,jp(i.half_flip),i.half_flip?.is_last_half_flip?'<span class="role-indicator role-forward">Last Half Flip</span>':"")):""},renderFocusedPlayerStats(n,e,t){const i=Gt(t,e,n);return i?jp(i.half_flip):""}}}function sP(){return{id:"wavedash",label:"Wavedash",setup(){},teardown(){},onBeforeRender(){},getTimelineEvents(n){return m_(n.statsTimeline,n.replay)},renderStats(n,e){const t=St(e.statsFrameLookup,n);return t?en(t.players,i=>Vt(i.name,i.is_team_0,Jp(i.wavedash),i.wavedash?.is_last_wavedash?'<span class="role-indicator role-forward">Last Wavedash</span>':"")):""},renderFocusedPlayerStats(n,e,t){const i=Gt(t,e,n);return i?Jp(i.wavedash):""}}}function rP(n){let e=null,t=5,i="advancement",a=null,s=null,r=null,o=null;const l=new Set,c=["kind","height_band","surface","dodge_state"];return{id:"touch",label:"Touch",setup(h){e=new cC(h.player.sceneState,h.player.container,h.replay,h.statsTimeline,{mode:i}),e.setDecaySeconds(t),d()},teardown(){e?.dispose(),e=null},onBeforeRender(h){e?.update(h.currentTime)},getTimelineEvents(h){return e_(h.statsTimeline,h.replay)},getConfig(){return{decaySeconds:t,overlayMode:i,breakdownClasses:u()}},applyConfig(h){if(h&&typeof h=="object"&&!Array.isArray(h)){const f=h;if(typeof f.decaySeconds=="number"&&Number.isFinite(f.decaySeconds)&&(t=Math.max(1,Math.min(10,f.decaySeconds)),e?.setDecaySeconds(t)),(f.overlayMode==="markers"||f.overlayMode==="advancement")&&(i=f.overlayMode,e?.setMode(i)),l.clear(),Array.isArray(f.breakdownClasses))for(const g of f.breakdownClasses)c.includes(g)&&l.add(g)}d(),n.rerenderCurrentState()},renderStats(h,f){const g=St(f.statsFrameLookup,h);return g?en(g.players,_=>Vt(_.name,_.is_team_0,Op(_.touch,{breakdownClasses:u()}),_.touch?.is_last_touch?'<span class="role-indicator role-forward">Last Touch</span>':"")):""},renderFocusedPlayerStats(h,f,g){const _=Gt(g,f,h);return _?Op(_.touch,{breakdownClasses:u()}):""},renderSettings(){if(!a){a=document.createElement("div"),a.className="module-settings-card";const h=document.createElement("div");h.className="module-settings-header";const f=document.createElement("div"),g=document.createElement("p");g.className="module-settings-eyebrow",g.textContent="Touch markers";const _=document.createElement("h3");_.textContent="Touch decay",f.append(g,_),s=document.createElement("strong"),s.className="metric-readout",h.append(f,s);const m=document.createElement("label"),p=document.createElement("span");p.className="label",p.textContent="Keep each marker visible after the touch";const S=document.createElement("input");S.type="range",S.min="1",S.max="10",S.step="0.5",S.value=`${t}`,S.addEventListener("input",()=>{const V=Number(S.value);t=Number.isFinite(V)?Math.max(1,Math.min(10,V)):t,e?.setDecaySeconds(t),d(t),n.requestConfigSync?.()}),m.append(p,S);const x=document.createElement("div");x.className="module-settings-subgroup";const y=document.createElement("div");y.className="module-settings-header";const C=document.createElement("div"),M=document.createElement("p");M.className="module-settings-eyebrow",M.textContent="Overlay";const T=document.createElement("h3");T.textContent="Touch mode",C.append(M,T),r=document.createElement("strong"),r.className="metric-readout",y.append(C,r);const A=document.createElement("div");A.className="module-settings-options";for(const V of[{mode:"markers",label:"Markers"},{mode:"advancement",label:"Advancement"}]){const B=document.createElement("label");B.className="toggle";const X=document.createElement("input");X.type="radio",X.name="touch-overlay-mode",X.dataset.overlayMode=V.mode,X.addEventListener("change",()=>{X.checked&&(i=V.mode,e?.setMode(i),d(),n.requestConfigSync?.())});const G=document.createElement("span");G.textContent=V.label,B.append(X,G),A.append(B)}x.append(y,A);const v=document.createElement("div");v.className="module-settings-subgroup";const b=document.createElement("div");b.className="module-settings-header";const R=document.createElement("div"),I=document.createElement("p");I.className="module-settings-eyebrow",I.textContent="Stat display";const O=document.createElement("h3");O.textContent="Touch breakdown",R.append(I,O),o=document.createElement("strong"),o.className="metric-readout",b.append(R,o);const H=document.createElement("div");H.className="module-settings-options";for(const V of[{className:"kind",label:"Kind"},{className:"height_band",label:"Height"},{className:"surface",label:"Surface"},{className:"dodge_state",label:"Dodge"}]){const B=document.createElement("label");B.className="toggle";const X=document.createElement("input");X.type="checkbox",X.dataset.breakdownClass=V.className,X.addEventListener("change",()=>{X.checked?l.add(V.className):l.delete(V.className),d(),n.rerenderCurrentState(),n.requestConfigSync?.()});const G=document.createElement("span");G.textContent=V.label,B.append(X,G),H.append(B)}v.append(b,H),a.append(h,m,x,v)}return d(),a}};function d(h){if(!a)return;const f=h??t,g=a.querySelector("input");g instanceof HTMLInputElement&&(g.value=`${f}`),s&&(s.textContent=`${f.toFixed(1)}s`);for(const _ of a.querySelectorAll("input[data-overlay-mode]"))_.checked=_.dataset.overlayMode===i;r&&(r.textContent=i==="advancement"?"Advancement":"Markers");for(const _ of a.querySelectorAll("input[data-breakdown-class]")){const m=_.dataset.breakdownClass;_.checked=m?l.has(m):!1}if(o){const _=u();o.textContent=_.length>0?_.map(m=>({kind:"Kind",height_band:"Height",surface:"Surface",dodge_state:"Dodge"})[m]).join(" + "):"Total only"}}function u(){return c.filter(h=>l.has(h))}}function oP(){return wn({id:"whiff",label:"Whiff",select:n=>n.whiff,render:n=>BR(n),getTimelineEvents(n){return __(n.statsTimeline,n.replay)}})}function lP(n){let e=null,t=null;const i=new Set,a=["speed_band","height_band"];return{id:"movement",label:"Movement",setup(){s()},teardown(){},onBeforeRender(){},getConfig(){return{breakdownClasses:r()}},applyConfig(o){if(i.clear(),o&&typeof o=="object"&&!Array.isArray(o)){const l=o.breakdownClasses;if(Array.isArray(l))for(const c of l)a.includes(c)&&i.add(c)}s(),n.rerenderCurrentState()},renderStats(o,l){const c=St(l.statsFrameLookup,o);return c?en(c.players,d=>Vt(d.name,d.is_team_0,Fp(d.movement,{breakdownClasses:r()}))):""},renderFocusedPlayerStats(o,l,c){const d=Gt(c,l,o);return d?Fp(d.movement,{breakdownClasses:r()}):""},renderSettings(){if(!e){e=document.createElement("div"),e.className="module-settings-card";const o=document.createElement("div");o.className="module-settings-header";const l=document.createElement("div"),c=document.createElement("p");c.className="module-settings-eyebrow",c.textContent="Stat display";const d=document.createElement("h3");d.textContent="Movement breakdown",l.append(c,d),t=document.createElement("strong"),t.className="metric-readout",o.append(l,t);const u=document.createElement("div");u.className="module-settings-options";for(const h of[{className:"speed_band",label:"Speed band"},{className:"height_band",label:"Height band"}]){const f=document.createElement("label");f.className="toggle";const g=document.createElement("input");g.type="checkbox",g.dataset.breakdownClass=h.className,g.addEventListener("change",()=>{g.checked?i.add(h.className):i.delete(h.className),s(),n.rerenderCurrentState(),n.requestConfigSync?.()});const _=document.createElement("span");_.textContent=h.label,f.append(g,_),u.append(f)}e.append(o,u)}return s(),e}};function s(){if(e){for(const o of e.querySelectorAll("input[data-breakdown-class]")){const l=o.dataset.breakdownClass;o.checked=l?i.has(l):!1}if(t){const o=r();t.textContent=o.length>0?o.map(l=>({speed_band:"Speed band",height_band:"Height band"})[l]).join(" + "):"Total only"}}}function r(){return a.filter(o=>i.has(o))}}function cP(){return wn({id:"powerslide",label:"Powerslide",select:n=>n.powerslide,render:n=>OR(n),getTimelineEvents(n){return h_(n.statsTimeline,n.replay)}})}function dP(){return wn({id:"rotation",label:"Rotation",select:n=>n.rotation,render:n=>PR(n)})}function uP(){return wn({id:"demo",label:"Demo",select:n=>n.demo,render:n=>zR(n)})}function hP(){return wn({id:"bump",label:"Bump",select:n=>n.bump,render:n=>HR(n),getTimelineEvents(n){return g_(n.statsTimeline,n.replay)}})}function fP(){let n=null,e=1;return{id:S_,label:"Relative Positioning",setup(t){e=t.fieldScale,n=new mA(t.player.sceneState.scene,t.replay,e)},teardown(){n?.dispose(),n=null},onBeforeRender(t){n?.update(t,e)},renderStats(t,i){const a=St(i.statsFrameLookup,t);return a?en(a.players,s=>{const r=YC(i.replay,at(s.player_id),t),o=qC[r];return Vt(s.name,s.is_team_0,Gp(s.positioning),`<span class="depth-indicator depth-${r}" title="Team Depth: ${o}" aria-label="Team Depth: ${o}">${o}</span>`)}):""},renderFocusedPlayerStats(t,i,a){const s=Gt(a,i,t);return s?Gp(s.positioning):""}}}function pP(){return{id:"absolute-positioning",label:"Absolute Positioning",setup(n){zp.acquire(n)},teardown(){zp.release()},onBeforeRender(){},getTimelineRanges(n){return $C(n.statsTimeline,n.replay)},renderStats(n,e){const t=St(e.statsFrameLookup,n);return t?en(t.players,i=>Vt(i.name,i.is_team_0,Vp(i.positioning))):""},renderFocusedPlayerStats(n,e,t){const i=Gt(t,e,n);return i?Vp(i.positioning):""}}}function mP(n,e={}){return[$R(),WR(),XR(),qR(),YR(),JR(),eP(),QR(),ZC(n),KC(),jC(),JC(),fP(),pP(),dP(),iP(),aP(),sP(),rP(n),oP(),nP(),tP(),jR(),KR(),VR(n,e.boostPickupFilters),ZR(),lP(n),cP(),uP(),hP()]}function gP(n){const e={};for(const t of n)if(t.getConfig){if(Object.hasOwn(e,t.id))throw new Error(`Duplicate stats player config adapter id: ${t.id}`);e[t.id]=t.getConfig()}return e}function _P(n,e){for(const t of n)if(t.applyConfig){if(Object.hasOwn(e,t.id)){t.applyConfig(e[t.id]);continue}for(const i of t.aliases??[])if(Object.hasOwn(e,i)){t.applyConfig(e[i]);break}}}function R_(n,e){return n}function hl(n){return R_({fifty_fifty:{count:0,wins:0,losses:0,neutral_outcomes:0,kickoff_count:0,kickoff_wins:0,kickoff_losses:0,kickoff_neutral_outcomes:0,possession_after_count:0,opponent_possession_after_count:0,neutral_possession_after_count:0,kickoff_possession_after_count:0,kickoff_opponent_possession_after_count:0,kickoff_neutral_possession_after_count:0},possession:{tracked_time:0,possession_time:0,opponent_possession_time:0,neutral_time:0,labeled_time:{entries:[]}},pressure:{tracked_time:0,defensive_half_time:0,offensive_half_time:0,neutral_time:0,labeled_time:{entries:[]}},rotation:{first_man_changes_for_team:0,rotation_count:0},rush:{count:0,two_v_one_count:0,two_v_two_count:0,two_v_three_count:0,three_v_one_count:0,three_v_two_count:0,three_v_three_count:0},core:{score:0,goals:0,assists:0,saves:0,shots:0,kickoff_goal_count:0,short_goal_count:0,medium_goal_count:0,long_goal_count:0,counter_attack_goal_count:0,sustained_pressure_goal_count:0,other_buildup_goal_count:0,goal_ball_air_time_sample_count:0,cumulative_goal_ball_air_time:0,last_goal_ball_air_time:null},backboard:{count:0},double_tap:{count:0},one_timer:{count:0,total_ball_speed:0,fastest_ball_speed:0},half_volley:{count:0,total_ball_speed:0,fastest_ball_speed:0},pass:{completed_pass_count:0,total_pass_distance:0,total_pass_advance:0,longest_pass_distance:0},ball_carry:{carry_count:0,total_carry_time:0,total_straight_line_distance:0,total_path_distance:0,longest_carry_time:0,furthest_carry_distance:0,fastest_carry_speed:0,carry_speed_sum:0,average_horizontal_gap_sum:0,average_vertical_gap_sum:0},air_dribble:{count:0,ground_to_air_count:0,wall_to_air_count:0,total_touch_count:0,max_touch_count:0,total_time:0,total_straight_line_distance:0,total_path_distance:0,longest_time:0,furthest_distance:0,fastest_speed:0,speed_sum:0,average_horizontal_gap_sum:0,average_vertical_gap_sum:0},boost:{tracked_time:0,boost_integral:0,time_zero_boost:0,time_hundred_boost:0,time_boost_0_25:0,time_boost_25_50:0,time_boost_50_75:0,time_boost_75_100:0,amount_collected:0,amount_collected_inactive:0,big_pads_collected_inactive:0,small_pads_collected_inactive:0,amount_stolen:0,big_pads_collected:0,small_pads_collected:0,big_pads_stolen:0,small_pads_stolen:0,amount_collected_big:0,amount_stolen_big:0,amount_collected_small:0,amount_stolen_small:0,amount_respawned:0,overfill_total:0,overfill_from_stolen:0,amount_used:0,amount_used_while_grounded:0,amount_used_while_airborne:0,amount_used_while_supersonic:0},movement:{tracked_time:0,total_distance:0,speed_integral:0,time_slow_speed:0,time_boost_speed:0,time_supersonic_speed:0,time_on_ground:0,time_low_air:0,time_high_air:0,labeled_tracked_time:{entries:[]}},powerslide:{total_duration:0,press_count:0},demo:{demos_inflicted:0},bump:{bumps_inflicted:0,team_bumps_inflicted:0}})}function P_(n){return R_({player_id:{Steam:"test-player"},name:"Test Player",is_team_0:!0,core:{score:0,goals:0,assists:0,saves:0,shots:0,goals_conceded_while_last_defender:0,goals_for_while_most_back:0,goals_against_while_most_back:0,goal_against_boost_sample_count:0,cumulative_boost_on_goals_against:0,last_boost_on_goal_against:null,goal_against_boost_leadup_sample_count:0,cumulative_average_boost_in_goal_against_leadup:0,cumulative_min_boost_in_goal_against_leadup:0,last_average_boost_in_goal_against_leadup:null,last_min_boost_in_goal_against_leadup:null,goal_against_position_sample_count:0,cumulative_goal_against_position_x:0,cumulative_goal_against_position_y:0,cumulative_goal_against_position_z:0,last_goal_against_position:null,scoring_goal_last_touch_position_sample_count:0,cumulative_scoring_goal_last_touch_position_x:0,cumulative_scoring_goal_last_touch_position_y:0,cumulative_scoring_goal_last_touch_position_z:0,last_scoring_goal_last_touch_position:null,kickoff_goal_count:0,short_goal_count:0,medium_goal_count:0,long_goal_count:0,counter_attack_goal_count:0,sustained_pressure_goal_count:0,other_buildup_goal_count:0,goal_ball_air_time_sample_count:0,cumulative_goal_ball_air_time:0,last_goal_ball_air_time:null},backboard:{count:0,is_last_backboard:!1,last_backboard_time:null,last_backboard_frame:null,time_since_last_backboard:null,frames_since_last_backboard:null},ceiling_shot:{count:0,high_confidence_count:0,is_last_ceiling_shot:!1,last_ceiling_shot_time:null,last_ceiling_shot_frame:null,time_since_last_ceiling_shot:null,frames_since_last_ceiling_shot:null,last_confidence:null,best_confidence:0,cumulative_confidence:0},wall_aerial:{count:0,high_confidence_count:0,is_last_wall_aerial:!1,last_wall_aerial_time:null,last_wall_aerial_frame:null,time_since_last_wall_aerial:null,frames_since_last_wall_aerial:null,last_confidence:null,best_confidence:0,cumulative_confidence:0,cumulative_setup_duration:0,cumulative_takeoff_to_touch_time:0,cumulative_touch_height:0},wall_aerial_shot:{count:0,high_confidence_count:0,is_last_wall_aerial_shot:!1,last_wall_aerial_shot_time:null,last_wall_aerial_shot_frame:null,time_since_last_wall_aerial_shot:null,frames_since_last_wall_aerial_shot:null,last_confidence:null,best_confidence:0,cumulative_confidence:0,cumulative_takeoff_to_shot_time:0,cumulative_shot_height:0},double_tap:{count:0,is_last_double_tap:!1,last_double_tap_time:null,last_double_tap_frame:null,time_since_last_double_tap:null,frames_since_last_double_tap:null},one_timer:{count:0,total_ball_speed:0,fastest_ball_speed:0,total_pass_distance:0,is_last_one_timer:!1,last_one_timer_time:null,last_one_timer_frame:null,time_since_last_one_timer:null,frames_since_last_one_timer:null},pass:{completed_pass_count:0,received_pass_count:0,total_pass_distance:0,total_pass_advance:0,longest_pass_distance:0,is_last_completed_pass:!1,last_completed_pass_time:null,last_completed_pass_frame:null,time_since_last_completed_pass:null,frames_since_last_completed_pass:null},fifty_fifty:{count:0,wins:0,losses:0,neutral_outcomes:0,kickoff_count:0,kickoff_wins:0,kickoff_losses:0,kickoff_neutral_outcomes:0,possession_after_count:0,kickoff_possession_after_count:0},speed_flip:{count:0,high_confidence_count:0,is_last_speed_flip:!1,last_speed_flip_time:null,last_speed_flip_frame:null,time_since_last_speed_flip:null,frames_since_last_speed_flip:null,last_quality:null,best_quality:0,cumulative_quality:0},half_flip:{count:0,high_confidence_count:0,is_last_half_flip:!1,last_half_flip_time:null,last_half_flip_frame:null,time_since_last_half_flip:null,frames_since_last_half_flip:null,last_quality:null,best_quality:0,cumulative_quality:0},half_volley:{count:0,total_ball_speed:0,fastest_ball_speed:0,is_last_half_volley:!1,last_half_volley_time:null,last_half_volley_frame:null,time_since_last_half_volley:null,frames_since_last_half_volley:null},wavedash:{count:0,high_confidence_count:0,is_last_wavedash:!1,last_wavedash_time:null,last_wavedash_frame:null,time_since_last_wavedash:null,frames_since_last_wavedash:null,last_quality:null,best_quality:0,cumulative_quality:0},touch:{touch_count:0,control_touch_count:0,medium_hit_count:0,hard_hit_count:0,aerial_touch_count:0,high_aerial_touch_count:0,wall_touch_count:0,is_last_touch:!1,last_touch_time:null,last_touch_frame:null,time_since_last_touch:null,frames_since_last_touch:null,last_ball_speed_change:null,max_ball_speed_change:0,cumulative_ball_speed_change:0,total_ball_travel_distance:0,total_ball_advance_distance:0,total_ball_retreat_distance:0,labeled_touch_counts:{entries:[]}},whiff:{whiff_count:0,beaten_to_ball_count:0,grounded_whiff_count:0,aerial_whiff_count:0,dodge_whiff_count:0,is_last_whiff:!1,last_whiff_time:null,last_whiff_frame:null,time_since_last_whiff:null,frames_since_last_whiff:null,last_closest_approach_distance:null,best_closest_approach_distance:null,cumulative_closest_approach_distance:0},flick:{count:0,high_confidence_count:0,is_last_flick:!1,last_flick_time:null,last_flick_frame:null,time_since_last_flick:null,frames_since_last_flick:null,last_confidence:null,best_confidence:0,cumulative_confidence:0,cumulative_setup_duration:0,cumulative_ball_speed_change:0},musty_flick:{count:0,aerial_count:0,high_confidence_count:0,is_last_musty:!1,last_musty_time:null,last_musty_frame:null,time_since_last_musty:null,frames_since_last_musty:null,last_confidence:null,best_confidence:0,cumulative_confidence:0},dodge_reset:{count:0,on_ball_count:0},ball_carry:{carry_count:0,total_carry_time:0,total_straight_line_distance:0,total_path_distance:0,longest_carry_time:0,furthest_carry_distance:0,fastest_carry_speed:0,carry_speed_sum:0,average_horizontal_gap_sum:0,average_vertical_gap_sum:0},air_dribble:{count:0,ground_to_air_count:0,wall_to_air_count:0,total_touch_count:0,max_touch_count:0,total_time:0,total_straight_line_distance:0,total_path_distance:0,longest_time:0,furthest_distance:0,fastest_speed:0,speed_sum:0,average_horizontal_gap_sum:0,average_vertical_gap_sum:0},boost:hl().boost,movement:hl().movement,positioning:{active_game_time:0,tracked_time:0,sum_distance_to_teammates:0,sum_distance_to_ball:0,sum_distance_to_ball_has_possession:0,time_has_possession:0,sum_distance_to_ball_no_possession:0,time_no_possession:0,time_demolished:0,time_no_teammates:0,time_most_back:0,time_most_forward:0,time_mid_role:0,time_other_role:0,time_defensive_third:0,time_neutral_third:0,time_offensive_third:0,time_defensive_half:0,time_offensive_half:0,time_closest_to_ball:0,time_farthest_from_ball:0,time_behind_ball:0,time_level_with_ball:0,time_in_front_of_ball:0,times_caught_ahead_of_play_on_conceded_goals:0},rotation:{active_game_time:0,tracked_time:0,time_first_man:0,time_second_man:0,time_third_man:0,time_ambiguous_role:0,time_behind_play:0,time_level_with_play:0,time_ahead_of_play:0,became_first_man_count:0,lost_first_man_count:0,current_role_state:"unknown",current_depth_state:"unknown"},powerslide:{total_duration:0,press_count:0},demo:{demos_inflicted:0,demos_taken:0},bump:{bumps_inflicted:0,bumps_taken:0,team_bumps_inflicted:0,team_bumps_taken:0,last_bump_time:null,last_bump_frame:null,last_bump_strength:null,max_bump_strength:0,cumulative_bump_strength:0}})}const vP=new Set(["player_id","name","is_team_0"]);function yP(n){return n===null||typeof n=="number"||typeof n=="string"||typeof n=="boolean"||Array.isArray(n)}function bP(n,e){let t=n;for(const i of e){if(!t||typeof t!="object"||Array.isArray(t))return;t=t[i]}return t}function xP(n){return n==null?"--":typeof n=="number"?Number.isFinite(n)?Number.isInteger(n)?`${n}`:`${Number(n.toFixed(3))}`:"--":typeof n=="boolean"?n?"true":"false":Array.isArray(n)?n.length===0?"[]":JSON.stringify(n):`${n}`}function lu(n,e,t,i){if(!(!n||typeof n!="object"||Array.isArray(n)))for(const[a,s]of Object.entries(n)){if(e==="player"&&t.length===0&&vP.has(a))continue;const r=[...t,a];if(yP(s)){const o=`${e}:${r.join(".")}`;i.push({id:o,label:r.join("."),category:r[0]??e,scope:e,path:r,read(l){return bP(l,r)},format:xP});continue}lu(s,e,r,i)}}function wP(n){const e=new Set;return n.filter(t=>e.has(t.id)?!1:(e.add(t.id),!0))}function L_(n,e){const t=[];return n&&lu(n,"player",[],t),e&&lu(e,"team",[],t),wP(t).sort((i,a)=>i.label.localeCompare(a.label))}function SP(){return L_(P_(),hl())}function Er(n){return n?L_(n.players[0]??P_(),n.team_zero??n.team_one??hl()):SP()}function N_(n){return n.toLowerCase().replace(/[_/.-]+/g," ").replace(/\s+/g," ").trim()}function EP(n){return N_(n).split(" ").filter(Boolean)}function MP(n,e){const t=EP(e);if(t.length===0)return 0;const i=N_([n.scope,n.category,n.label,n.id,...n.path].join(" "));let a=0;for(const s of t){const r=i.indexOf(s);if(r<0)return null;a+=r}return a+i.length/1e3}function TP(n,e){return n.map((t,i)=>({definition:t,index:i,score:MP(t,e)})).filter(t=>t.score!==null).sort((t,i)=>t.score-i.score||t.index-i.index).map(t=>t.definition)}var Bt=Uint8Array,yn=Uint16Array,yh=Int32Array,Bl=new Bt([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),zl=new Bt([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),cu=new Bt([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),I_=function(n,e){for(var t=new yn(31),i=0;i<31;++i)t[i]=e+=1<<n[i-1];for(var a=new yh(t[30]),i=1;i<30;++i)for(var s=t[i];s<t[i+1];++s)a[s]=s-t[i]<<5|i;return{b:t,r:a}},D_=I_(Bl,2),U_=D_.b,du=D_.r;U_[28]=258,du[258]=28;var F_=I_(zl,0),AP=F_.b,em=F_.r,uu=new yn(32768);for(var gt=0;gt<32768;++gt){var Ri=(gt&43690)>>1|(gt&21845)<<1;Ri=(Ri&52428)>>2|(Ri&13107)<<2,Ri=(Ri&61680)>>4|(Ri&3855)<<4,uu[gt]=((Ri&65280)>>8|(Ri&255)<<8)>>1}var ni=(function(n,e,t){for(var i=n.length,a=0,s=new yn(e);a<i;++a)n[a]&&++s[n[a]-1];var r=new yn(e);for(a=1;a<e;++a)r[a]=r[a-1]+s[a-1]<<1;var o;if(t){o=new yn(1<<e);var l=15-e;for(a=0;a<i;++a)if(n[a])for(var c=a<<4|n[a],d=e-n[a],u=r[n[a]-1]++<<d,h=u|(1<<d)-1;u<=h;++u)o[uu[u]>>l]=c}else for(o=new yn(i),a=0;a<i;++a)n[a]&&(o[a]=uu[r[n[a]-1]++]>>15-n[a]);return o}),Wi=new Bt(288);for(var gt=0;gt<144;++gt)Wi[gt]=8;for(var gt=144;gt<256;++gt)Wi[gt]=9;for(var gt=256;gt<280;++gt)Wi[gt]=7;for(var gt=280;gt<288;++gt)Wi[gt]=8;var Mr=new Bt(32);for(var gt=0;gt<32;++gt)Mr[gt]=5;var CP=ni(Wi,9,0),RP=ni(Wi,9,1),PP=ni(Mr,5,0),LP=ni(Mr,5,1),Qc=function(n){for(var e=n[0],t=1;t<n.length;++t)n[t]>e&&(e=n[t]);return e},Fn=function(n,e,t){var i=e/8|0;return(n[i]|n[i+1]<<8)>>(e&7)&t},ed=function(n,e){var t=e/8|0;return(n[t]|n[t+1]<<8|n[t+2]<<16)>>(e&7)},bh=function(n){return(n+7)/8|0},Hl=function(n,e,t){return(e==null||e<0)&&(e=0),(t==null||t>n.length)&&(t=n.length),new Bt(n.subarray(e,t))},NP=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],Yn=function(n,e,t){var i=new Error(e||NP[n]);if(i.code=n,Error.captureStackTrace&&Error.captureStackTrace(i,Yn),!t)throw i;return i},IP=function(n,e,t,i){var a=n.length,s=0;if(!a||e.f&&!e.l)return t||new Bt(0);var r=!t,o=r||e.i!=2,l=e.i;r&&(t=new Bt(a*3));var c=function(Fe){var ot=t.length;if(Fe>ot){var N=new Bt(Math.max(ot*2,Fe));N.set(t),t=N}},d=e.f||0,u=e.p||0,h=e.b||0,f=e.l,g=e.d,_=e.m,m=e.n,p=a*8;do{if(!f){d=Fn(n,u,1);var S=Fn(n,u+1,3);if(u+=3,S)if(S==1)f=RP,g=LP,_=9,m=5;else if(S==2){var M=Fn(n,u,31)+257,T=Fn(n,u+10,15)+4,A=M+Fn(n,u+5,31)+1;u+=14;for(var v=new Bt(A),b=new Bt(19),R=0;R<T;++R)b[cu[R]]=Fn(n,u+R*3,7);u+=T*3;for(var I=Qc(b),O=(1<<I)-1,H=ni(b,I,1),R=0;R<A;){var V=H[Fn(n,u,O)];u+=V&15;var x=V>>4;if(x<16)v[R++]=x;else{var B=0,X=0;for(x==16?(X=3+Fn(n,u,3),u+=2,B=v[R-1]):x==17?(X=3+Fn(n,u,7),u+=3):x==18&&(X=11+Fn(n,u,127),u+=7);X--;)v[R++]=B}}var G=v.subarray(0,M),te=v.subarray(M);_=Qc(G),m=Qc(te),f=ni(G,_,1),g=ni(te,m,1)}else Yn(1);else{var x=bh(u)+4,y=n[x-4]|n[x-3]<<8,C=x+y;if(C>a){l&&Yn(0);break}o&&c(h+y),t.set(n.subarray(x,C),h),e.b=h+=y,e.p=u=C*8,e.f=d;continue}if(u>p){l&&Yn(0);break}}o&&c(h+131072);for(var fe=(1<<_)-1,q=(1<<m)-1,ue=u;;ue=u){var B=f[ed(n,u)&fe],Se=B>>4;if(u+=B&15,u>p){l&&Yn(0);break}if(B||Yn(2),Se<256)t[h++]=Se;else if(Se==256){ue=u,f=null;break}else{var be=Se-254;if(Se>264){var R=Se-257,me=Bl[R];be=Fn(n,u,(1<<me)-1)+U_[R],u+=me}var k=g[ed(n,u)&q],Y=k>>4;k||Yn(3),u+=k&15;var te=AP[Y];if(Y>3){var me=zl[Y];te+=ed(n,u)&(1<<me)-1,u+=me}if(u>p){l&&Yn(0);break}o&&c(h+131072);var ie=h+be;if(h<te){var we=s-te,ye=Math.min(te,ie);for(we+h<0&&Yn(3);h<ye;++h)t[h]=i[we+h]}for(;h<ie;++h)t[h]=t[h-te]}}e.l=f,e.p=ue,e.b=h,e.f=d,f&&(d=1,e.m=_,e.d=g,e.n=m)}while(!d);return h!=t.length&&r?Hl(t,0,h):t.subarray(0,h)},fi=function(n,e,t){t<<=e&7;var i=e/8|0;n[i]|=t,n[i+1]|=t>>8},Hs=function(n,e,t){t<<=e&7;var i=e/8|0;n[i]|=t,n[i+1]|=t>>8,n[i+2]|=t>>16},td=function(n,e){for(var t=[],i=0;i<n.length;++i)n[i]&&t.push({s:i,f:n[i]});var a=t.length,s=t.slice();if(!a)return{t:O_,l:0};if(a==1){var r=new Bt(t[0].s+1);return r[t[0].s]=1,{t:r,l:1}}t.sort(function(C,M){return C.f-M.f}),t.push({s:-1,f:25001});var o=t[0],l=t[1],c=0,d=1,u=2;for(t[0]={s:-1,f:o.f+l.f,l:o,r:l};d!=a-1;)o=t[t[c].f<t[u].f?c++:u++],l=t[c!=d&&t[c].f<t[u].f?c++:u++],t[d++]={s:-1,f:o.f+l.f,l:o,r:l};for(var h=s[0].s,i=1;i<a;++i)s[i].s>h&&(h=s[i].s);var f=new yn(h+1),g=hu(t[d-1],f,0);if(g>e){var i=0,_=0,m=g-e,p=1<<m;for(s.sort(function(M,T){return f[T.s]-f[M.s]||M.f-T.f});i<a;++i){var S=s[i].s;if(f[S]>e)_+=p-(1<<g-f[S]),f[S]=e;else break}for(_>>=m;_>0;){var x=s[i].s;f[x]<e?_-=1<<e-f[x]++-1:++i}for(;i>=0&&_;--i){var y=s[i].s;f[y]==e&&(--f[y],++_)}g=e}return{t:new Bt(f),l:g}},hu=function(n,e,t){return n.s==-1?Math.max(hu(n.l,e,t+1),hu(n.r,e,t+1)):e[n.s]=t},tm=function(n){for(var e=n.length;e&&!n[--e];);for(var t=new yn(++e),i=0,a=n[0],s=1,r=function(l){t[i++]=l},o=1;o<=e;++o)if(n[o]==a&&o!=e)++s;else{if(!a&&s>2){for(;s>138;s-=138)r(32754);s>2&&(r(s>10?s-11<<5|28690:s-3<<5|12305),s=0)}else if(s>3){for(r(a),--s;s>6;s-=6)r(8304);s>2&&(r(s-3<<5|8208),s=0)}for(;s--;)r(a);s=1,a=n[o]}return{c:t.subarray(0,i),n:e}},Gs=function(n,e){for(var t=0,i=0;i<e.length;++i)t+=n[i]*e[i];return t},k_=function(n,e,t){var i=t.length,a=bh(e+2);n[a]=i&255,n[a+1]=i>>8,n[a+2]=n[a]^255,n[a+3]=n[a+1]^255;for(var s=0;s<i;++s)n[a+s+4]=t[s];return(a+4+i)*8},nm=function(n,e,t,i,a,s,r,o,l,c,d){fi(e,d++,t),++a[256];for(var u=td(a,15),h=u.t,f=u.l,g=td(s,15),_=g.t,m=g.l,p=tm(h),S=p.c,x=p.n,y=tm(_),C=y.c,M=y.n,T=new yn(19),A=0;A<S.length;++A)++T[S[A]&31];for(var A=0;A<C.length;++A)++T[C[A]&31];for(var v=td(T,7),b=v.t,R=v.l,I=19;I>4&&!b[cu[I-1]];--I);var O=c+5<<3,H=Gs(a,Wi)+Gs(s,Mr)+r,V=Gs(a,h)+Gs(s,_)+r+14+3*I+Gs(T,b)+2*T[16]+3*T[17]+7*T[18];if(l>=0&&O<=H&&O<=V)return k_(e,d,n.subarray(l,l+c));var B,X,G,te;if(fi(e,d,1+(V<H)),d+=2,V<H){B=ni(h,f,0),X=h,G=ni(_,m,0),te=_;var fe=ni(b,R,0);fi(e,d,x-257),fi(e,d+5,M-1),fi(e,d+10,I-4),d+=14;for(var A=0;A<I;++A)fi(e,d+3*A,b[cu[A]]);d+=3*I;for(var q=[S,C],ue=0;ue<2;++ue)for(var Se=q[ue],A=0;A<Se.length;++A){var be=Se[A]&31;fi(e,d,fe[be]),d+=b[be],be>15&&(fi(e,d,Se[A]>>5&127),d+=Se[A]>>12)}}else B=CP,X=Wi,G=PP,te=Mr;for(var A=0;A<o;++A){var me=i[A];if(me>255){var be=me>>18&31;Hs(e,d,B[be+257]),d+=X[be+257],be>7&&(fi(e,d,me>>23&31),d+=Bl[be]);var k=me&31;Hs(e,d,G[k]),d+=te[k],k>3&&(Hs(e,d,me>>5&8191),d+=zl[k])}else Hs(e,d,B[me]),d+=X[me]}return Hs(e,d,B[256]),d+X[256]},DP=new yh([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),O_=new Bt(0),UP=function(n,e,t,i,a,s){var r=s.z||n.length,o=new Bt(i+r+5*(1+Math.ceil(r/7e3))+a),l=o.subarray(i,o.length-a),c=s.l,d=(s.r||0)&7;if(e){d&&(l[0]=s.r>>3);for(var u=DP[e-1],h=u>>13,f=u&8191,g=(1<<t)-1,_=s.p||new yn(32768),m=s.h||new yn(g+1),p=Math.ceil(t/3),S=2*p,x=function(lt){return(n[lt]^n[lt+1]<<p^n[lt+2]<<S)&g},y=new yh(25e3),C=new yn(288),M=new yn(32),T=0,A=0,v=s.i||0,b=0,R=s.w||0,I=0;v+2<r;++v){var O=x(v),H=v&32767,V=m[O];if(_[H]=V,m[O]=H,R<=v){var B=r-v;if((T>7e3||b>24576)&&(B>423||!c)){d=nm(n,l,0,y,C,M,A,b,I,v-I,d),b=T=A=0,I=v;for(var X=0;X<286;++X)C[X]=0;for(var X=0;X<30;++X)M[X]=0}var G=2,te=0,fe=f,q=H-V&32767;if(B>2&&O==x(v-q))for(var ue=Math.min(h,B)-1,Se=Math.min(32767,v),be=Math.min(258,B);q<=Se&&--fe&&H!=V;){if(n[v+G]==n[v+G-q]){for(var me=0;me<be&&n[v+me]==n[v+me-q];++me);if(me>G){if(G=me,te=q,me>ue)break;for(var k=Math.min(q,me-2),Y=0,X=0;X<k;++X){var ie=v-q+X&32767,we=_[ie],ye=ie-we&32767;ye>Y&&(Y=ye,V=ie)}}}H=V,V=_[H],q+=H-V&32767}if(te){y[b++]=268435456|du[G]<<18|em[te];var Fe=du[G]&31,ot=em[te]&31;A+=Bl[Fe]+zl[ot],++C[257+Fe],++M[ot],R=v+G,++T}else y[b++]=n[v],++C[n[v]]}}for(v=Math.max(v,R);v<r;++v)y[b++]=n[v],++C[n[v]];d=nm(n,l,c,y,C,M,A,b,I,v-I,d),c||(s.r=d&7|l[d/8|0]<<3,d-=7,s.h=m,s.p=_,s.i=v,s.w=R)}else{for(var v=s.w||0;v<r+c;v+=65535){var N=v+65535;N>=r&&(l[d/8|0]=c,N=r),d=k_(l,d+1,n.subarray(v,N))}s.i=r}return Hl(o,0,i+bh(d)+a)},FP=function(n,e,t,i,a){if(!a&&(a={l:1},e.dictionary)){var s=e.dictionary.subarray(-32768),r=new Bt(s.length+n.length);r.set(s),r.set(n,s.length),n=r,a.w=s.length}return UP(n,e.level==null?6:e.level,e.mem==null?a.l?Math.ceil(Math.max(8,Math.min(13,Math.log(n.length)))*1.5):20:12+e.mem,t,i,a)};function kP(n,e){return FP(n,e||{},0,0)}function B_(n,e){return IP(n,{i:2},e,e)}var im=typeof TextEncoder<"u"&&new TextEncoder,fu=typeof TextDecoder<"u"&&new TextDecoder,OP=0;try{fu.decode(O_,{stream:!0}),OP=1}catch{}var BP=function(n){for(var e="",t=0;;){var i=n[t++],a=(i>127)+(i>223)+(i>239);if(t+a>n.length)return{s:e,r:Hl(n,t-1)};a?a==3?(i=((i&15)<<18|(n[t++]&63)<<12|(n[t++]&63)<<6|n[t++]&63)-65536,e+=String.fromCharCode(55296|i>>10,56320|i&1023)):a&1?e+=String.fromCharCode((i&31)<<6|n[t++]&63):e+=String.fromCharCode((i&15)<<12|(n[t++]&63)<<6|n[t++]&63):e+=String.fromCharCode(i)}};function zP(n,e){var t;if(im)return im.encode(n);for(var i=n.length,a=new Bt(n.length+(n.length>>1)),s=0,r=function(c){a[s++]=c},t=0;t<i;++t){if(s+5>a.length){var o=new Bt(s+8+(i-t<<1));o.set(a),a=o}var l=n.charCodeAt(t);l<128||e?r(l):l<2048?(r(192|l>>6),r(128|l&63)):l>55295&&l<57344?(l=65536+(l&1047552)|n.charCodeAt(++t)&1023,r(240|l>>18),r(128|l>>12&63),r(128|l>>6&63),r(128|l&63)):(r(224|l>>12),r(128|l>>6&63),r(128|l&63))}return Hl(a,0,s)}function z_(n,e){var t;if(fu)return fu.decode(n);var i=BP(n),a=i.s,t=i.r;return t.length&&Yn(8),a}const HP=["replayUrl","replay_url","replay"],GP=["r","replayUrlZ","replay_url_z"],VP=["ballchasing","ballchasingId","ballchasingUuid","ballchasingReplay"];function $P(n){const e=n.replaceAll("-","+").replaceAll("_","/"),t=e.padEnd(Math.ceil(e.length/4)*4,"="),i=atob(t),a=new Uint8Array(i.length);for(let s=0;s<i.length;s+=1)a[s]=i.charCodeAt(s);return a}function WP(n){try{return z_(B_($P(n)))}catch(e){throw new Error(`Invalid compressed replay URL: ${e instanceof Error?e.message:String(e)}`)}}function XP(n,e){const t=new URLSearchParams(n);for(const i of HP){const a=t.get(i)?.trim();if(!a)continue;const s=new URL(a,e);if(s.protocol!=="http:"&&s.protocol!=="https:")throw new Error(`Unsupported replay URL protocol: ${s.protocol}`);return s}for(const i of GP){const a=t.get(i)?.trim();if(!a)continue;const s=new URL(WP(a),e);if(s.protocol!=="http:"&&s.protocol!=="https:")throw new Error(`Unsupported replay URL protocol: ${s.protocol}`);return s}return null}function qP(n,e){for(const t of e){const i=n.get(t)?.trim();if(i)return i}return null}function H_(n,e){const t=new URLSearchParams(n),i=qP(t,VP);if(i){const s=lh(i);return{kind:"ballchasing",url:OT(s),name:kT(s),fetchInit:{method:"POST"}}}const a=XP(n,e);return a?{kind:"url",url:a,name:YP(a)}:null}function YP(n){const t=n.pathname.replace(/\/+$/,"").split("/").pop();if(!t)return n.hostname||"remote replay";try{return decodeURIComponent(t)}catch{return t}}const fl=1,pu="cfg",am="cfgDebug";function ZP(n){let e="";for(const t of n)e+=String.fromCharCode(t);return btoa(e).replaceAll("+","-").replaceAll("/","_").replace(/=+$/,"")}function KP(n){const e=n.replaceAll("-","+").replaceAll("_","/"),t=e.padEnd(Math.ceil(e.length/4)*4,"="),i=atob(t),a=new Uint8Array(i.length);for(let s=0;s<i.length;s+=1)a[s]=i.charCodeAt(s);return a}function jP(n){return ZP(kP(zP(JSON.stringify(n)),{level:9}))}function JP(n){let e;try{e=JSON.parse(z_(B_(KP(n))))}catch(t){throw new Error(`Invalid stats player config: ${t instanceof Error?t.message:String(t)}`)}return n2(e)}function QP(n){const e=G_(n);return e.selectedValue?JP(e.selectedValue):null}function G_(n){const e=new URLSearchParams(xh(n.hash)),t=new URLSearchParams(n.search),i=e.getAll(pu),a=t.getAll(pu),s=i[0]?"hash":a[0]?"search":null,r=s==="hash"?i[0]:s==="search"?a[0]:null;return{search:n.search,hash:n.hash,searchParams:[...t.entries()],hashParams:[...e.entries()],searchValues:a,hashValues:i,selectedSource:s,selectedValue:r}}function e2(n){const e=new URLSearchParams(n.search),t=new URLSearchParams(xh(n.hash)),i=e.get(am)??t.get(am);return i===""||i==="1"||i==="true"}function V_(n,e){const t=new URL(n.href),i=new URLSearchParams(xh(t.hash));return i.set(pu,jP(e)),t.hash=i.toString(),t}function xh(n){return n.startsWith("#")?n.slice(1):n}function t2(n,e,t=120,i=100){const a=pl(n.viewport.width)??e.width,s=pl(n.viewport.height)??e.height,r=e.width/Math.max(1,a),o=e.height/Math.max(1,s),l=Math.max(8,e.width-t),c=Math.max(8,e.height-i);return{x:sm(n.x*r,8,l),y:sm(n.y*o,8,c)}}function n2(n){if(!Ln(n)||n.version!==fl)throw new Error("Unsupported stats player config version");return{version:fl,playback:a2(n.playback),camera:s2(n.camera),overlays:o2(n.overlays),recording:i2(n.recording),singletonWindows:l2(n.singletonWindows),statsWindows:c2(n.statsWindows),moduleConfigs:Ln(n.moduleConfigs)?n.moduleConfigs:{}}}function i2(n){return Ln(n)?{fps:Zt(n.fps),playbackRate:Zt(n.playbackRate)}:{}}function a2(n){return Ln(n)?{currentTime:Zt(n.currentTime),playing:Bi(n.playing),rate:Zt(n.rate),skipPostGoalTransitions:Bi(n.skipPostGoalTransitions),skipKickoffs:Bi(n.skipKickoffs)}:{}}function s2(n){if(!Ln(n))return{};const e={},t=n.mode==="follow"?"follow":n.mode==="free"?"free":void 0,i=n.freePreset==="overhead"?"overhead":n.freePreset==="side"?"side":n.freePreset===null?null:void 0,a=W_(n.attachedPlayerId),s=Zt(n.distanceScale),r=Bi(n.ballCam),o=r2(n.customSettings);return t!==void 0&&(e.mode=t),i!==void 0&&(e.freePreset=i),a!==void 0&&(e.attachedPlayerId=a),s!==void 0&&(e.distanceScale=s),r!==void 0&&(e.ballCam=r),o!==void 0&&(e.customSettings=o),e}function r2(n){if(n===null)return null;if(!Ln(n))return;const e={},t=Zt(n.fov),i=Zt(n.height),a=Zt(n.pitch),s=Zt(n.distance),r=Zt(n.stiffness),o=Zt(n.swivelSpeed),l=Zt(n.transitionSpeed);return t!==void 0&&(e.fov=t),i!==void 0&&(e.height=i),a!==void 0&&(e.pitch=a),s!==void 0&&(e.distance=s),r!==void 0&&(e.stiffness=r),o!==void 0&&(e.swivelSpeed=o),l!==void 0&&(e.transitionSpeed=l),e}function o2(n){const e=Ln(n)?n:{};return{timelineEvents:To(e.timelineEvents),timelineRanges:To(e.timelineRanges),mechanics:To(e.mechanics),renderEffects:To(e.renderEffects),followedPlayerHud:Bi(e.followedPlayerHud)??!1,boostPads:Bi(e.boostPads)??!0,boostPickupAnimation:Bi(e.boostPickupAnimation)??!1}}function l2(n){return Array.isArray(n)?n.map(e=>!Ln(e)||!u2(e.id)?null:{id:e.id,placement:$_(e.placement)}).filter(e=>e!==null):[]}function c2(n){return Array.isArray(n)?n.map(e=>!Ln(e)||typeof e.id!="string"||!h2(e.kind)?null:{id:e.id,kind:e.kind,placement:$_(e.placement),playerId:W_(e.playerId)??null,team:e.team==="orange"?"orange":e.team==="blue"?"blue":null,entries:d2(e.entries)}).filter(e=>e!==null):[]}function d2(n){return Array.isArray(n)?n.map(e=>!Ln(e)||typeof e.statId!="string"?null:{statId:e.statId,targetId:typeof e.targetId=="string"?e.targetId:void 0}).filter(e=>e!==null):[]}function $_(n){const e=Ln(n)?n:{},t=Ln(e.viewport)?e.viewport:{};return{x:Zt(e.x)??8,y:Zt(e.y)??8,viewport:{width:pl(t.width)??1,height:pl(t.height)??1},zIndex:Zt(e.zIndex),visible:Bi(e.visible)??!0}}function u2(n){return n==="camera"||n==="scoreboard"||n==="playback"||n==="recording"||n==="mechanics"||n==="event-playlist"||n==="mechanics-review"||n==="replay-loading"||n==="boost-pickups"||n==="touch-controls"}function h2(n){return n==="player"||n==="team"||n==="all-players"||n==="all-teams"||n==="goals-overview"||n==="ad-hoc"}function Ln(n){return typeof n=="object"&&n!==null&&!Array.isArray(n)}function Zt(n){return typeof n=="number"&&Number.isFinite(n)?n:void 0}function pl(n){const e=Zt(n);return e!==void 0&&e>0?e:void 0}function Bi(n){return typeof n=="boolean"?n:void 0}function W_(n){return n===null?null:typeof n=="string"?n:void 0}function To(n){return Array.isArray(n)?n.filter(e=>typeof e=="string"):[]}function sm(n,e,t){return Math.min(t,Math.max(e,n))}const X_=2.25,q_=4,f2=["free","follow"];let Q=null,vn=null,qt=null,zt=null,Sa=null,ns=null,ml=null;const ir=new Map,gl=new Map,ar=new Map,Gl=T_({refreshTimelineRanges(){ds()},rerenderCurrentState(){Q&&Q.setBoostPickupAnimationEnabled(Q.getState().boostPickupAnimationEnabled)},requestConfigSync(){je()}}),As=mP({rerenderCurrentState(){if(!Q)return;const n=Q.getState();Br(n.frameIndex)},refreshTimelineRanges(){ds()},requestConfigSync(){je()}},{boostPickupFilters:Gl});let vi=[],hn=new Set,Cs=new Set,rn=new Set,Rs=new Set;const p2=new Set(["ceiling-shot","fifty-fifty","pressure",S_,"absolute-positioning","speed-flip","touch"]),Y_="touch",m2=new Set(["module:touch","module:powerslide"]),g2="mechanics:ranges",rm=["#3b82f6","#06b6d4","#22c55e","#a855f7","#f97316","#ef4444","#f59e0b","#ec4899"],_2="#d1d9e0",Z_=[{id:"core",label:"Shots, saves, assists",buildEvents(n){return n.replay.timelineEvents.filter(e=>e.kind==="shot"||e.kind==="save"||e.kind==="assist")}},{id:"demo",label:"Demos",buildEvents(n){return n.replay.timelineEvents.filter(e=>e.kind==="demo")}}],wh=[{id:"goal-tags",label:"Goal Tags",buildEvents(n){return c_(n.statsTimeline,n.replay)}}];let zi=null,ls,K_,_l,om,vl,mu,lm,cm,Ys,Pi,is,Ao,nd,dm,gu,j_,J_,Q_,ev,tv,nv,iv,_u,vu,yu,bu,xu,wu,Su,Eu,av,Zs,sv,Ks,Mu,Vo,Tu,yl,va,Hi,Au,Cu,sr,rr,or,rv,Ui,bl,Tr,Ar,Cr,Rr,Pr,Lr,Nr,ov,lv,cv,dv,uv,hv,fv,lr,Ru,js,pv,mv,gv,_v,sn,vv,yv,Pu,$o,Wo,Xo,qo,Yo,Zo,bn,gi=null,xn,vs,ys,Lu,Nu,Iu,Du,Uu,bv,xv,wv,Sv,Co=null,ya=Er(null),xl=30,cr=1,yi=!0,wl=null,Kn=null,Li=null,cs=!1,ma=null,Xi=null,Sl=!0,qi=null;const v2=["camera","scoreboard","playback","recording","mechanics","event-playlist","mechanics-review","replay-loading","boost-pickups","touch-controls"],Ea=new Map;let Ot=null,Ko=!1;function y2(){return new Set([...hn,...Cs,...Rs])}function b2(){return Yg(hn,zt)}function Ev(n){return n==="events"?hn:n==="ranges"?Cs:Rs}function Zi(){return!Q||!zt||!Sa?null:{player:Q,replay:Q.replay,statsTimeline:zt,statsFrameLookup:Sa,fieldScale:Q.options.fieldScale??1}}function bs(){Sh();const n=Zi();if(!n)return;const e=y2();vi=As.filter(t=>e.has(t.id)),Gl.setup(n);for(const t of vi)t.setup(n);ml=n.player.onBeforeRender(t=>{for(const i of vi)Rs.has(i.id)&&i.onBeforeRender(t)}),jo(),ds()}function Mv(){for(const n of qg(zt)){const e=ph(n);hn.delete(e)&&rn.add(n)}}function Sh(){ml?.(),ml=null,Vl(),$l();for(const n of vi)n.teardown();vi=[]}function Tv(n,e,t){const i=Ev(e);if(t?i.add(n):i.delete(n),bs(),Yi(),xi(),Q){const a=Q.getState();Br(a.frameIndex)}bi(),je()}function Vl(){for(const n of ir.values())n();ir.clear()}function $l(){for(const n of gl.values())n();gl.clear()}function Av(){for(const n of ar.values())n();ar.clear()}function Eh(){ar.get("boost-pad-overlay")?.(),ar.delete("boost-pad-overlay"),!(!Q||!yi)&&ar.set("boost-pad-overlay",Q.addPlugin(JT()))}function x2(){yi=!yi,Eh(),Yi(),je()}function jo(){Vl();const n=Zi();if(!vn||!n)return;const e=b2();for(const t of vi){if(!e.has(t.id))continue;const i=t.getTimelineEvents?.(n);!i||i.length===0||ir.set(t.id,vn.addEventSource(Jo(i),{id:`module:${t.id}`,label:t.label}))}for(const t of wh){if(!hn.has(t.id))continue;const i=t.buildEvents(n);i.length!==0&&ir.set(`events:${t.id}`,vn.addEventSource(Jo(i),{id:`events:${t.id}`,label:t.label}))}for(const t of rn){const i=mh(n.statsTimeline,n.replay,[t]);i.length!==0&&ir.set(`mechanics:events:${t}`,vn.addEventSource(Jo(i),{id:`mechanics:${t}`,label:Ht(t)}))}vn.refreshEvents()}function ds(){$l();const n=Zi();if(!vn||!n)return;for(const t of vi)!Cs.has(t.id)||!t.getTimelineRanges||gl.set(t.id,vn.addRangeSource(()=>t.getTimelineRanges?.(n)??[]));const e=b_(n.statsTimeline,n.replay,rn);e.length>0&&gl.set(g2,vn.addRangeSource(e)),vn.refreshRanges()}function bi(){if(!Q||!zt){Pu.textContent="--";return}const n=mh(zt,Q.replay,rn).length,e=b_(zt,Q.replay,rn).length;Pu.textContent=`${SC(hn,Q.replay,zt)+n+e}`}function ne(n,e){const t=n.querySelector(e);if(!(t instanceof HTMLElement))throw new Error(`Missing element for selector: ${e}`);return t}function w2(n){return n.closest("[data-window-id]")?.dataset.windowId??null}function Cv(){return{width:Math.max(1,window.innerWidth),height:Math.max(1,window.innerHeight)}}function um(n,e){const t=n.style.getPropertyValue(e).trim(),i=getComputedStyle(n).getPropertyValue(e).trim(),a=t||i,s=Number.parseFloat(a);if(Number.isFinite(s))return s;const r=n.getBoundingClientRect();return e==="--window-y"?r.top:r.left}function Rv(n){const e=Number.parseInt(n.style.zIndex,10);return{x:um(n,"--window-x"),y:um(n,"--window-y"),viewport:Cv(),zIndex:Number.isFinite(e)?e:void 0,visible:!n.hidden}}function Pv(n,e){const t=t2(e,Cv());n.style.setProperty("--window-x",`${t.x}px`),n.style.setProperty("--window-y",`${t.y}px`),n.hidden=!e.visible,e.zIndex!==void 0&&(n.style.zIndex=`${e.zIndex}`,xl=Math.max(xl,e.zIndex+1))}function S2(){const n=[],e=zi??document;for(const t of v2){const i=e.querySelector(`[data-window-id="${t}"]`);i&&n.push({id:t,placement:Rv(i)})}return n}function Lv(){return As.filter(n=>n.getConfig||n.applyConfig).map(n=>{const e={id:n.id};return n.id==="boost"&&(e.aliases=["boost-pickup-animation"]),n.getConfig&&(e.getConfig=()=>n.getConfig?.()),n.applyConfig&&(e.applyConfig=t=>n.applyConfig?.(t)),e})}function E2(){return gP(Lv())}function M2(n){_P(Lv(),n)}function T2(n){return{id:n.id,kind:n.kind,placement:Rv(n.element),playerId:n.playerId,team:n.team,entries:n.entries.map(e=>({statId:e.statId,targetId:e.targetId}))}}function A2(){const n=Q?.getState();return{currentTime:n?.currentTime,playing:n?.playing,rate:n?.speed??Number(va?.value??1),skipPostGoalTransitions:Q?n?.skipPostGoalTransitionsEnabled:bn.checked,skipKickoffs:Q?n?.skipKickoffsEnabled:xn.checked}}function C2(){const n=Q?.getState();return{mode:n?.cameraViewMode,freePreset:Kn,attachedPlayerId:n?.attachedPlayerId,distanceScale:n?.cameraDistanceScale,ballCam:n?.ballCamEnabled,customSettings:n?.customCameraSettings}}function R2(){return{fps:Number(vs?.value),playbackRate:Number(ys?.value)}}function P2(){return{version:fl,playback:A2(),camera:C2(),overlays:{timelineEvents:[...hn],timelineRanges:[...Cs],mechanics:[...rn],renderEffects:[...Rs],followedPlayerHud:!1,boostPads:yi,boostPickupAnimation:Q?.getState().boostPickupAnimationEnabled??!1},recording:R2(),singletonWindows:S2(),statsWindows:[...Ea.values()].map(T2),moduleConfigs:E2()}}function je(){cs||(ma!==null&&window.clearTimeout(ma),ma=window.setTimeout(()=>{ma=null;const n=V_(new URL(window.location.href),P2());window.history.replaceState(window.history.state,"",n)},150))}function L2(n,e,t){console.groupCollapsed("[subtr-actor] stats player cfg load"),console.log("location.href",window.location.href),console.log("location.search",n.search||"(empty)"),console.log("location.hash",n.hash||"(empty)"),console.table([...n.searchParams.map(([i,a])=>({source:"search",name:i,value:a})),...n.hashParams.map(([i,a])=>({source:"hash",name:i,value:a}))]),console.log("cfg selected source",n.selectedSource??"(none)"),console.log("cfg selected raw text",n.selectedValue??"(none)"),console.log("cfg selected raw length",n.selectedValue?.length??0),console.log("cfg search values",n.searchValues),console.log("cfg hash values",n.hashValues),n.hashValues.length>0&&n.searchValues.length>0&&console.warn("Both hash and search contain cfg; hash cfg is used."),e&&(console.log("cfg normalized JSON",JSON.stringify(e,null,2)),console.log("cfg normalized object",e)),t&&console.error("cfg decode/apply error",t),console.groupEnd()}function N2(n){const e=zi??document;for(const t of n.singletonWindows){const i=e.querySelector(`[data-window-id="${t.id}"]`);i&&Pv(i,t.placement)}}function I2(n){hn=new Set(n.overlays.timelineEvents),Cs=new Set(n.overlays.timelineRanges),rn=new Set(n.overlays.mechanics),Mv(),Rs=new Set(n.overlays.renderEffects),yi=n.overlays.boostPads,bn.checked=n.playback.skipPostGoalTransitions??bn.checked,xn.checked=n.playback.skipKickoffs??xn.checked,n.playback.rate!==void 0&&(va.value=`${n.playback.rate}`),n.recording.fps!==void 0&&(vs.value=`${n.recording.fps}`),n.recording.playbackRate!==void 0&&(ys.value=`${n.recording.playbackRate}`),M2(n.moduleConfigs),N2(n),_L(n.statsWindows),Yi(),xi(),bi()}function D2(n,e,t){return{currentTime:n.currentTime,playing:n.playing,speed:n.rate,cameraDistanceScale:e.distanceScale,customCameraSettings:e.customSettings,cameraViewMode:e.mode,attachedPlayerId:e.attachedPlayerId,ballCamEnabled:e.ballCam,boostPickupAnimationEnabled:t.overlays.boostPickupAnimation,skipPostGoalTransitionsEnabled:n.skipPostGoalTransitions,skipKickoffsEnabled:n.skipKickoffs}}function U2(n,e){if(!Q||!Number.isFinite(n))return;Ot&&(Ot.currentClip=null),e!==null&&Q.replay.players.some(i=>i.id===e)&&(Q.setAttachedPlayer(e),Q.setCameraViewMode("follow"),Kn=null),bn.checked=!1,xn.checked=!1,Q.setState({currentTime:Math.max(0,n-q_),playing:!0,skipPostGoalTransitionsEnabled:!1,skipKickoffsEnabled:!1}),je()}function F2(n){Q&&(Ot&&(Ot.currentClip=null),bn.checked=!1,xn.checked=!1,Q.setState({currentTime:ch(n),skipPostGoalTransitionsEnabled:!1,skipKickoffsEnabled:!1}),je())}function Jo(n){return n.map(e=>({...e,seekTime:ch(e)}))}function k2(n){Q&&(Q.setState(D2(n.playback,n.camera,n)),Kn=n.camera.freePreset??null,n.camera.mode==="free"&&n.camera.freePreset&&Q.setFreeCameraPreset(n.camera.freePreset),Eh(),bs(),Yi(),xi(),Br(Q.getState().frameIndex))}function Wl(n){n.style.zIndex=`${xl++}`}function Nv(n){const e=ne(zi??document,`[data-window-id="${n}"]`);e.hidden=!1,Wl(e),je()}function O2(n){const e=ne(zi??document,`[data-window-id="${n}"]`);e.hidden=!e.hidden,e.hidden||Wl(e),je()}function B2(n){const e=ne(zi??document,`[data-window-id="${n}"]`);e.hidden=!0,je()}function dr(n){mu.hidden=!n,vl.setAttribute("aria-label",n?"Close menu":"Open menu"),vl.setAttribute("aria-expanded",n?"true":"false")}function hm(){ls.click(),dr(!1)}function z2(n){return n instanceof Element&&!!n.closest("button, input, select, textarea, option, label, a, [data-no-drag]")}function fm(n,e){n.addEventListener("pointerdown",t=>{if(!(t.target instanceof HTMLElement)||z2(t.target))return;const i=t.target.closest("[data-window-id]");if(!i||i.hidden)return;Wl(i);const a=t.clientX,s=t.clientY,r=i.getBoundingClientRect(),o=t.pointerId;i.setPointerCapture(o),t.preventDefault();const l=d=>{const u=Math.max(8,Math.min(window.innerWidth-120,r.left+d.clientX-a)),h=Math.max(8,Math.min(window.innerHeight-100,r.top+d.clientY-s));i.style.setProperty("--window-x",`${u}px`),i.style.setProperty("--window-y",`${h}px`)},c=()=>{i.releasePointerCapture(o),i.removeEventListener("pointermove",l),i.removeEventListener("pointerup",c),i.removeEventListener("pointercancel",c),je()};i.addEventListener("pointermove",l),i.addEventListener("pointerup",c),i.addEventListener("pointercancel",c)},{signal:e})}function Yi(){Ru.replaceChildren();const n=[],e=[],t=Ol(zt);for(const d of As){const u=p2.has(d.id);!d.getTimelineEvents&&!d.getTimelineRanges&&!u||(d.getTimelineEvents&&!t.has(d.id)&&n.push(rd(d.id,sd(d,"events"),"events")),d.getTimelineRanges&&n.push(rd(d.id,sd(d,"ranges"),"ranges")),u&&e.push(rd(d.id,sd(d,"effects"),"effects")))}const i=Q?.getState().boostPickupAnimationEnabled??!1,a=document.createElement("button");a.type="button",a.className="module-summary-item",a.dataset.active=i?"true":"false",a.setAttribute("aria-pressed",i?"true":"false"),a.addEventListener("click",()=>{const d=!(Q?.getState().boostPickupAnimationEnabled??!1);Q?.setBoostPickupAnimationEnabled(d),bs(),Yi(),xi(),je()});const s=document.createElement("span");s.textContent="Boost pickup animation";const r=document.createElement("strong");r.textContent=i?"On":"Off",a.append(s,r),e.push(a);const o=document.createElement("button");o.type="button",o.className="module-summary-item",o.dataset.active=yi?"true":"false",o.setAttribute("aria-pressed",yi?"true":"false"),o.addEventListener("click",x2);const l=document.createElement("span");l.textContent="Boost pad locations";const c=document.createElement("strong");c.textContent=yi?"On":"Off",o.append(l,c),e.push(o),Ru.append(wm("Timeline visualizations",n),wm("In-game visualizations",e))}function ur(){Pi.replaceChildren();const n=Zi(),e=hh(zt),t=new Map;for(const p of zt?.events.mechanics??[])t.set(p.kind,(t.get(p.kind)??0)+1);const i=Ol(zt),a=As.filter(p=>p.getTimelineEvents&&!i.has(p.id)).map(p=>({id:p.id,label:p.label,count:n?p.getTimelineEvents?.(n).length??0:0})),s=Z_.map(p=>({id:p.id,label:p.label,count:n?p.buildEvents(n).length:0})),r=wh.map(p=>({id:p.id,label:p.label,count:n?p.buildEvents(n).length:0})),o=[...s,...a,...r].filter(p=>p.count>0).map(p=>p.id);if(o.length===0&&e.length===0){const p=document.createElement("p");p.className="stat-window-empty",p.textContent="No events loaded.",Pi.append(p);return}const l=document.createElement("div");l.className="mechanics-actions";const c=document.createElement("button");c.type="button",c.className="module-summary-item",c.addEventListener("click",()=>{for(const p of o)hn.add(p);rn=new Set(e),bs(),jo(),ds(),ur(),Yi(),xi(),bi(),je()});const d=document.createElement("span");d.textContent="All events";const u=document.createElement("strong");u.textContent=`${o.length+e.length}`,c.append(d,u);const h=document.createElement("button");h.type="button",h.className="module-summary-item",h.addEventListener("click",()=>{hn.clear(),rn.clear(),bs(),jo(),ds(),ur(),Yi(),xi(),bi(),je()});const f=document.createElement("span");f.textContent="No events";const g=document.createElement("strong");g.textContent="Off",h.append(f,g),l.append(c,h),Pi.append(l);const _=mm("Replay",s);_&&Pi.append(_);const m=mm("Stats",[...a,...r]);if(m&&Pi.append(m),e.length>0){const p=document.createElement("h3");p.className="module-settings-eyebrow",p.textContent="Mechanics",Pi.append(p);const S=document.createElement("div");S.className="module-list mechanics-list";for(const x of e){const y=rn.has(x),C=document.createElement("button");C.type="button",C.className="module-summary-item",C.dataset.active=y?"true":"false",C.setAttribute("aria-pressed",y?"true":"false"),C.addEventListener("click",()=>{rn.has(x)?rn.delete(x):rn.add(x),jo(),ds(),ur(),bi(),je()});const M=document.createElement("span");M.textContent=Ht(x);const T=document.createElement("strong");T.textContent=`${y?"On":"Off"} ${t.get(x)??0}`,C.append(M,T),S.append(C)}Pi.append(S)}}function pm(){ur()}function mm(n,e){const t=e.filter(r=>r.count>0);if(t.length===0)return null;const i=document.createElement("section"),a=document.createElement("h3");a.className="module-settings-eyebrow",a.textContent=n;const s=document.createElement("div");s.className="module-list mechanics-list";for(const r of t){const o=hn.has(r.id),l=document.createElement("button");l.type="button",l.className="module-summary-item",l.dataset.active=o?"true":"false",l.setAttribute("aria-pressed",o?"true":"false"),l.addEventListener("click",()=>{Tv(r.id,"events",!hn.has(r.id)),ur(),bi()});const c=document.createElement("span");c.textContent=r.label;const d=document.createElement("strong");d.textContent=`${o?"On":"Off"} ${r.count}`,l.append(c,d),s.append(l)}return i.append(a,s),i}function H2(n){return[{id:"replay:goals",group:"Replay",label:"Goals",events:n.replay.timelineEvents.filter(t=>t.kind==="goal")},...Z_.map(t=>({id:`replay:${t.id}`,group:"Replay",label:t.label,events:t.buildEvents(n)}))].filter(t=>t.events.length>0)}function G2(){const n=Zi();if(!n)return[];const e=hh(n.statsTimeline),t=Ol(n.statsTimeline),i=As.filter(r=>r.getTimelineEvents&&!t.has(r.id)).map(r=>({id:`module:${r.id}`,group:"Stats",label:r.label,events:r.getTimelineEvents?.(n)??[]})).filter(r=>r.events.length>0),a=wh.map(r=>({id:`extra:${r.id}`,group:"Stats",label:r.label,events:r.buildEvents(n)})).filter(r=>r.events.length>0),s=e.map(r=>({id:`mechanic:${r}`,group:"Mechanics",label:Ht(r),events:mh(n.statsTimeline,n.replay,[r])})).filter(r=>r.events.length>0);return[...H2(n),...i,...a,...s]}function Mh(n){const e=n.map(t=>t.id);return Xi===null?new Set(e.filter(t=>!m2.has(t))):new Set(e.filter(t=>Xi?.has(t)))}function V2(n){const e=n.playerId??null,t=e&&Q?Q.replay.players.findIndex(i=>i.id===e):-1;return t>=0?rm[t%rm.length]:n.color??_2}function $2(n){const e=Mh(n);return n.filter(t=>e.has(t.id)).flatMap(t=>t.events.map((i,a)=>({key:`${t.id}:${i.id??`${i.kind}:${i.time}:${a}`}`,sourceId:t.id,sourceLabel:t.label,event:i,color:V2(i)}))).sort((t,i)=>t.event.time!==i.event.time?t.event.time-i.event.time:(t.event.label??t.sourceLabel).localeCompare(i.event.label??i.sourceLabel))}function W2(n,e){const t=Mh(n);e(t),Xi=t,qi=null,xs();const i=Q?.getState();i&&Ir(i)}function xs(){if(!is)return;is.replaceChildren();const n=G2();if(n.length===0){const _=document.createElement("p");_.className="stat-window-empty",_.textContent=Q?"No events loaded.":"Load a replay to see events.",is.append(_);return}const e=Mh(n),t=$2(n),i=document.createElement("div");i.className="event-playlist-toolbar";const a=document.createElement("details");a.className="event-playlist-filter",a.dataset.noDrag="true";const s=document.createElement("summary");s.textContent=`Filters ${e.size}/${n.length}`,a.append(s);const r=document.createElement("div");r.className="event-playlist-filter-panel";const o=document.createElement("div");o.className="event-playlist-filter-actions";const l=document.createElement("button");l.type="button",l.textContent="All",l.addEventListener("click",()=>{Xi=new Set(n.map(m=>m.id)),qi=null,xs();const _=Q?.getState();_&&Ir(_)});const c=document.createElement("button");c.type="button",c.textContent="None",c.addEventListener("click",()=>{Xi=new Set,qi=null,xs()}),o.append(l,c),r.append(o);const d=new Map;for(const _ of n){const m=d.get(_.group)??[];m.push(_),d.set(_.group,m)}for(const[_,m]of d){const p=document.createElement("section");p.className="event-playlist-filter-group";const S=document.createElement("h3");S.textContent=_,p.append(S);for(const x of m){const y=document.createElement("label");y.className="toggle event-playlist-filter-option";const C=document.createElement("input");C.type="checkbox",C.checked=e.has(x.id),C.addEventListener("change",()=>{W2(n,T=>{C.checked?T.add(x.id):T.delete(x.id)})});const M=document.createElement("span");M.textContent=`${x.label} (${x.events.length})`,y.append(C,M),p.append(y)}r.append(p)}a.append(r);const u=document.createElement("label");u.className="toggle event-playlist-follow";const h=document.createElement("input");h.type="checkbox",h.checked=Sl,h.addEventListener("change",()=>{Sl=h.checked;const _=Q?.getState();_&&Ir(_,{forceScroll:!0})});const f=document.createElement("span");f.textContent="Auto-follow",u.append(h,f),i.append(a,u);const g=document.createElement("div");if(g.className="event-playlist-list",g.dataset.noDrag="true",t.length===0){const _=document.createElement("p");_.className="stat-window-empty",_.textContent="No event types selected.",g.append(_)}else for(const _ of t){const m=document.createElement("button");m.type="button",m.className="event-playlist-item",m.dataset.eventKey=_.key,m.dataset.eventTime=`${_.event.time}`,m.style.setProperty("--event-color",_.color),m.addEventListener("click",()=>{F2(_.event)});const p=document.createElement("span");p.className="event-playlist-time",p.textContent=Zv(_.event.time);const S=document.createElement("span");S.className="event-playlist-main";const x=document.createElement("strong");x.textContent=_.event.label??_.sourceLabel;const y=document.createElement("span");y.textContent=[_.event.playerName??null,_.event.frame!==void 0?`frame ${_.event.frame}`:null,_.sourceLabel].filter(C=>!!C).join(" · "),S.append(x,y),m.append(p,S),g.append(m)}is.append(i,g)}function X2(n,e){const t=[...n.querySelectorAll(".event-playlist-item")];if(t.length===0)return null;let i=t[0]??null,a=Number.POSITIVE_INFINITY;for(const s of t){const r=Number(s.dataset.eventTime);if(!Number.isFinite(r))continue;const o=Math.abs(r-e);o<a&&(a=o,i=s)}return i}function Ir(n,e={}){const t=is?.querySelector(".event-playlist-list");if(!t)return;const i=X2(t,n.currentTime),a=i?.dataset.eventKey??null;a===qi&&!e.forceScroll||(t.querySelectorAll(".event-playlist-item[data-active='true']").forEach(s=>{s.dataset.active="false"}),i&&(i.dataset.active="true",(Sl||e.forceScroll)&&i.scrollIntoView({block:"nearest"})),qi=a)}function Cn(n){return typeof n=="object"&&n!==null&&!Array.isArray(n)}function gm(n){return Cn(n)&&(n.kind==="time"||n.kind==="frame")&&typeof n.value=="number"&&Number.isFinite(n.value)?{kind:n.kind,value:n.value}:null}function Ro(n,e){if(n!=null){if(typeof n!="number"||!Number.isInteger(n)||!Number.isFinite(n)||n<0)throw new Error(`Review playlist page ${e} must be a non-negative integer.`);return n}}function _m(n,e){if(n!=null){if(typeof n!="string")throw new Error(`Review playlist page ${e} must be a string.`);return n}}function q2(n){if(n!=null){if(!Cn(n))throw new Error("Review playlist page must be an object.");return{next:_m(n.next,"next"),previous:_m(n.previous,"previous"),total:Ro(n.total,"total"),count:Ro(n.count,"count"),limit:Ro(n.limit,"limit"),offset:Ro(n.offset,"offset")}}}function Y2(n){if(!Cn(n)||!Array.isArray(n.items))throw new Error("Review playlist must contain an items array.");const e=n.items.map((i,a)=>{if(!Cn(i)||typeof i.replay!="string")throw new Error(`Invalid review item at index ${a}.`);const s=gm(i.start),r=gm(i.end);if(!s||!r)throw new Error(`Review item ${a+1} has invalid start or end.`);return{id:typeof i.id=="string"?i.id:void 0,replay:i.replay,start:s,end:r,label:typeof i.label=="string"?i.label:void 0,meta:Cn(i.meta)?i.meta:void 0}}),t=Array.isArray(n.replays)?n.replays.map(i=>!Cn(i)||typeof i.id!="string"?null:{id:i.id,path:typeof i.path=="string"?i.path:void 0,label:typeof i.label=="string"?i.label:void 0,locator:Cn(i.locator)?i.locator:void 0,meta:Cn(i.meta)?i.meta:void 0}).filter(i=>i!==null):void 0;return{label:typeof n.label=="string"?n.label:void 0,replays:t,items:e,page:q2(n.page),playback:n.playback,meta:n.meta}}function Iv(n){let e;try{e=JSON.parse(n)}catch(t){throw new Error(`Invalid review playlist JSON: ${t instanceof Error?t.message:String(t)}`)}return Y2(e)}function Z2(){const n=new URLSearchParams(window.location.search);return n.get("reviewPlaylist")?.trim()||n.get("review")?.trim()||n.get("playlist")?.trim()||n.get("playlistUrl")?.trim()||null}function K2(n){return/^\/(?:home|Users|tmp|var\/tmp|mnt|media|run\/user|nix\/store)\//.test(n)}function Dv(n,e){const t=n.startsWith("path:")?n.slice(5):n;return/^https?:\/\//i.test(t)||t.startsWith("/@fs/")?t:t.startsWith("/")?K2(t)?`/@fs${t}`:t:e?new URL(t,e).href:t}function Xl(n,e){const t=e.replaysById.get(n.replay);if(t?.path)return t.path;if(Cn(t?.locator)&&t.locator.kind==="path"&&typeof t.locator.path=="string")return t.locator.path;if(/^https?:\/\//i.test(n.replay)||n.replay.startsWith("/")||n.replay.startsWith("/@fs/")||n.replay.startsWith("path:"))return n.replay;throw new Error(`Review replay "${n.replay}" does not include a loadable path.`)}function Uv(n,e){const t=e.replaysById.get(n.replay),a=(t?.path??Xl(n,e)).replace(/^path:/,"").split("/").filter(Boolean).pop();return t?.label??a??"review replay"}function Fv(n,e,t){const i=Xl(n,e),a=Dv(i,e.sourceUrl);return{name:Uv(n,e),preparingStatus:"Loading review replay...",async readBytes(){const s=await fetch(a,{signal:t});if(!s.ok){const r=s.statusText?` ${s.statusText}`:"";throw new Error(`Failed to fetch review replay from ${a} (${s.status}${r})`)}return new Uint8Array(await s.arrayBuffer())}}}function vm(n){if(n.kind==="time")return n.value;const e=Math.max(0,Math.trunc(n.value));return Q?.replay.frames[e]?.time??Q?.replay.frames.at(-1)?.time??0}function Qo(n){return typeof n=="number"&&Number.isFinite(n)?`${n.toFixed(2)}s`:"--"}function ym(n){return n.kind==="time"?Qo(n.value):`frame ${Math.trunc(n.value)}`}function ga(n,e){if(!Cn(n.meta?.target))return null;const t=n.meta.target[e];return typeof t=="number"&&Number.isFinite(t)?t:null}function id(n,e){if(!Cn(n.meta?.target))return null;const t=n.meta.target[e];return typeof t=="number"&&Number.isFinite(t)?Math.trunc(t):null}function j2(n){const e=n.start.kind==="time"?n.start.value:null,t=n.end.kind==="time"?n.end.value:null,i=[`${ym(n.start)} to ${ym(n.end)}`];e!==null&&t!==null&&i.push(`${Math.max(0,t-e).toFixed(1)}s clip`);const a=ga(n,"startTime")??ga(n,"eventTime"),s=ga(n,"endTime")??ga(n,"eventTime");return e!==null&&a!==null&&i.push(`${Math.max(0,a-e).toFixed(1)}s preroll`),t!==null&&s!==null&&i.push(`${Math.max(0,t-s).toFixed(1)}s postroll`),i.join(" · ")}function J2(n){const e=ga(n,"eventTime"),t=ga(n,"startTime"),i=ga(n,"endTime"),a=id(n,"eventFrame"),s=id(n,"startFrame"),r=id(n,"endFrame"),o=t!==null&&i!==null&&Math.abs(i-t)>.001?`${Qo(t)} to ${Qo(i)}`:Qo(e??t??i),l=s!==null&&r!==null&&r!==s?`frames ${s}-${r}`:a!==null?`frame ${a}`:s!==null?`frame ${s}`:null;return[o,l].filter(c=>c&&c!=="--").join(" · ")||"--"}function Fu(n,e){return n.label??n.meta?.mechanicLabel??`Review item ${e+1}`}function kv(n){return typeof n.meta?.playerId=="string"?n.meta.playerId:Cn(n.meta?.target)&&typeof n.meta.target.playerId=="string"?n.meta.target.playerId:null}function Q2(n){if(typeof n.meta?.playerName=="string"&&n.meta.playerName.trim())return n.meta.playerName;const e=kv(n);return e?Q?.replay.players.find(t=>t.id===e)?.name??e:"--"}function bm(n){return typeof n.meta?.mechanicLabel=="string"&&n.meta.mechanicLabel.trim()?n.meta.mechanicLabel:typeof n.meta?.mechanic=="string"?Ht(n.meta.mechanic):"--"}function ku(n){return typeof n=="string"&&n.trim()?n.replaceAll("_"," "):"unreviewed"}function Ov(n){if(!n)return null;if(typeof n.meta?.reviewEndpoint=="string"&&n.meta.reviewEndpoint)return n.meta.reviewEndpoint;const e=typeof n.meta?.eventId=="string"&&n.meta.eventId?n.meta.eventId:n.id;return e?`/api/v1/mechanics/events/${encodeURIComponent(e)}/reviews`:null}function eL(){const n=new URLSearchParams(window.location.search),e=n.get("reviewToken")??n.get("token")??window.localStorage.getItem("rocket_sense_access_token");return e?{Authorization:`Bearer ${e}`}:{}}function cn(n){gu&&(gu.textContent=n)}function Bv(n){const e=new Map;for(const t of n.manifest.items)e.has(t.replay)||e.set(t.replay,t);return e}function tL(n){const e=new Map;for(const t of n.manifest.items)e.set(t.replay,(e.get(t.replay)??0)+1);return e}function nL(n){const e=tL(n);for(const[t,i]of Bv(n)){let a="",s=t;try{a=Xl(i,n),s=Uv(i,n)}catch{s=n.replaysById.get(t)?.label??t}n.replayLoadStates.set(t,{replayId:t,label:s,path:a,clipCount:e.get(t)??0,status:"idle",progress:null,error:null})}}function Po(n,e,t){const i=n.replayLoadStates.get(e)??{replayId:e,label:e,path:"",clipCount:0,status:"idle",progress:null,error:null};n.replayLoadStates.set(e,{...i,...t});const a=n.manifest.items[n.currentIndex];n.loading&&a?.replay===e&&t.progress&&(sn.textContent=Ms(t.progress),gi?.update(t.progress)),Ot===n&&zv(n)}function iL(n){if(!n)return"";const e=Ms(n);if(n.processedFrames!==void 0){const t=n.totalFrames!==void 0?` / ${n.totalFrames}`:"";return`${e} (${n.processedFrames}${t} frames)`}if(n.processedChunks!==void 0){const t=n.totalChunks!==void 0?` / ${n.totalChunks}`:"";return`${e} (${n.processedChunks}${t} chunks)`}return e}function aL(n){return n.status==="idle"?"Pending":n.status==="loading"?iL(n.progress)||"Loading":n.status==="loaded"?"Loaded":n.error?`Failed: ${n.error}`:"Failed"}function sL(n){if(n.status==="loaded")return 1;const e=n.progress?.progress;return typeof e=="number"&&Number.isFinite(e)?Math.max(0,Math.min(1,e)):0}function zv(n){if(!Su||!Eu||!Zs)return;const e=n?Array.from(n.replayLoadStates.values()):[],t=e.filter(o=>o.status==="loaded").length,i=e.filter(o=>o.status==="loading").length,a=e.filter(o=>o.status==="error").length,s=e.filter(o=>o.status==="idle").length,r=e.length===0?"0 replays":`${t}/${e.length} loaded${i>0?`, ${i} loading`:""}${a>0?`, ${a} failed`:""}`;if(Su.textContent=r,Eu.textContent=r,av.textContent=e.length===0?"No playlist":i>0?`${i} active, ${s} pending`:a>0?`${a} failed`:n?.preloading?`Background queue, ${s} pending`:t===e.length?"Complete":`${s} pending`,Zs.replaceChildren(),!n||e.length===0){const o=document.createElement("p");o.className="stat-window-empty",o.textContent="No replay sources.",Zs.append(o);return}for(const o of e){const l=document.createElement("div");l.className=`mechanics-review-replay-load ${o.status}`;const c=document.createElement("div");c.className="mechanics-review-replay-load-main";const d=document.createElement("span");d.className="mechanics-review-replay-load-title",d.textContent=o.label;const u=document.createElement("span");u.className="mechanics-review-replay-load-meta",u.textContent=[o.replayId,`${o.clipCount} ${o.clipCount===1?"clip":"clips"}`,o.path].filter(Boolean).join(" · "),c.append(d,u);const h=document.createElement("strong");h.className="mechanics-review-replay-load-status",h.textContent=aL(o);const f=document.createElement("div");f.className="mechanics-review-replay-load-progress";const g=document.createElement("span");g.style.width=`${Math.round(sL(o)*100)}%`,f.append(g),l.append(c,h,f),Zs.append(l)}}function rL(n,e){n.preloading||(n.preloading=!0,(async()=>{try{for(const[t,i]of Bv(n)){if(t===e)continue;const a=n.replayLoadStates.get(t);if(!(a?.status==="loaded"||a?.status==="loading"))try{await Hv(i,n)}catch{}}}finally{n.preloading=!1}})())}function Hv(n,e){const t=e.replayLoadCache.get(n.replay);if(t)return t;const i=Fv(n,e);Po(e,n.replay,{label:i.name,path:Xl(n,e),status:"loading",progress:null,error:null});const a=Promise.resolve().then(async()=>{const s=await i.readBytes();return kl(s,{reportEveryNFrames:100,onProgress(r){Po(e,n.replay,{status:"loading",progress:r,error:null})}})}).then(s=>(Po(e,n.replay,{status:"loaded",progress:null,error:null}),s)).catch(s=>{throw e.replayLoadCache.delete(n.replay),Po(e,n.replay,{status:"error",error:s instanceof Error?s.message:String(s)}),s});return e.replayLoadCache.set(n.replay,a),a}function ws(){if(!Ks)return;const n=Ot,e=n?.manifest.items??[],t=n?e[n.currentIndex]??null:null,i=e.length>0;sv.textContent=`${e.length} item${e.length===1?"":"s"}`,j_.textContent=i&&n?`${n.currentIndex+1} / ${e.length}`:"0 / 0",J_.textContent=t?Fu(t,n?.currentIndex??0):"No candidate selected",Q_.textContent=t?bm(t):"--",ev.textContent=t?Q2(t):"--",tv.textContent=t?j2(t):"--",nv.textContent=t?J2(t):"--",iv.textContent=t?.meta?.reason??"--",_u.disabled=!n||n.loading||n.currentIndex<=0,vu.disabled=!n||n.loading||!n.currentClip,yu.disabled=!n||n.loading||n.currentIndex>=e.length-1;const a=!n||n.loading||Ov(t)===null;if(bu.disabled=a,xu.disabled=a,wu.disabled=a,zv(n),Ks.replaceChildren(),!n||e.length===0){const s=document.createElement("p");s.className="stat-window-empty",s.textContent="No review playlist loaded.",Ks.append(s);return}e.forEach((s,r)=>{const o=document.createElement("button");o.type="button",o.className="mechanics-review-item",o.dataset.active=r===n.currentIndex?"true":"false",o.disabled=n.loading,o.addEventListener("click",()=>{El(r)});const l=document.createElement("span");l.textContent=Fu(s,r);const c=document.createElement("strong");c.textContent=[bm(s),ku(s.meta?.reviewStatus)].join(" · "),o.append(l,c),Ks.append(o)})}async function Gv(n,e){const t=new Map;for(const i of n.replays??[])t.set(i.id,i);Ot={manifest:n,sourceUrl:e,replaysById:t,replayLoadStates:new Map,replayLoadCache:new Map,currentIndex:0,loading:!1,preloading:!1,currentReplayId:null,currentClip:null},nL(Ot),Nv("replay-loading"),cn(n.label?`Loaded ${n.label}.`:"Loaded review playlist."),ws(),n.items.length>0&&await El(0)}async function xm(n){if(!n){cn("Enter a review playlist URL.");return}const e=Dv(n,window.location.href);cn("Loading review playlist...");const t=await fetch(e);if(!t.ok){const a=t.statusText?` ${t.statusText}`:"";throw new Error(`Failed to fetch review playlist from ${e} (${t.status}${a})`)}const i=Iv(await t.text());await Gv(i,t.url||e)}async function El(n){const e=Ot,t=e?.manifest.items[n];if(!(!e||!t||e.loading)){e.loading=!0,e.currentIndex=n,ws(),cn(`Loading ${Fu(t,n)}...`);try{if(!Q||e.currentReplayId!==t.replay){const r=Fv(t,e),o=Hv(t,e);await Rh(r,o),e.currentReplayId=t.replay}rL(e,t.replay);const i=Math.max(0,vm(t.start)),a=Math.min(Q?.getState().duration??Number.POSITIVE_INFINITY,Math.max(i,vm(t.end)));if(!Number.isFinite(i)||!Number.isFinite(a)||a<=i)throw new Error("Review item has an empty playback range.");const s=kv(t);s&&Q?.replay.players.some(r=>r.id===s)&&(Q.setAttachedPlayer(s),Q.setCameraViewMode("follow"),Kn=null),bn.checked=!1,xn.checked=!1,e.currentClip={startTime:i,endTime:a},Q?.setState({currentTime:i,playing:!0,skipPostGoalTransitionsEnabled:!1,skipKickoffsEnabled:!1}),cn(`Playing ${i.toFixed(2)}s to ${a.toFixed(2)}s`)}catch(i){console.error("Failed to activate mechanics review item:",i),e.currentClip=null,cn(i instanceof Error?i.message:"Failed to load review item")}finally{e.loading=!1,ws()}}}function oL(){const n=Ot?.currentClip;!n||!Q||Q.setState({currentTime:n.startTime,playing:!0,skipPostGoalTransitionsEnabled:!1,skipKickoffsEnabled:!1})}async function ad(n){const e=Ot,t=e?.manifest.items[e.currentIndex]??null,i=Ov(t);if(!e||!t||!i){cn("Current review item has no review endpoint.");return}cn(`Submitting ${ku(n)}...`);const a=await fetch(i,{method:"POST",headers:{"content-type":"application/json",...eL()},credentials:"same-origin",body:JSON.stringify({status:n})});if(!a.ok){let s=`${a.status}${a.statusText?` ${a.statusText}`:""}`;try{const r=await a.json();typeof r.error=="string"&&(s=r.error)}catch{}cn(`Review failed: ${s}`);return}t.meta=t.meta??{},t.meta.reviewStatus=n,cn(`Marked ${ku(n)}.`),ws()}function lL(n){const e=Ot?.currentClip;if(!e||!Q||Ko)return!1;const t=n.currentTime<e.startTime-.1,i=n.playing&&n.currentTime>=e.endTime-.025;if(!t&&!i)return!1;Ko=!0;try{Q.setState({currentTime:t?e.startTime:e.endTime,playing:!1,skipPostGoalTransitionsEnabled:!1,skipKickoffsEnabled:!1}),i&&cn(`Finished clip at ${e.endTime.toFixed(2)}s`)}finally{Ko=!1}return!0}function wm(n,e){const t=document.createElement("section");t.className="module-summary-group";const i=document.createElement("h3");i.textContent=n;const a=document.createElement("div");return a.className="module-list",a.append(...e),t.append(i,a),t}function sd(n,e){const t={"absolute-positioning:ranges":"Position zones","backboard:events":"Backboard","ball-carry:events":"Ball carry","boost:ranges":"Boost pickup timeline","bump:events":"Bump","ceiling-shot:events":"Ceiling shot","demo:events":"Demo","dodge-reset:events":"Dodge refresh","double-tap:events":"Double tap","fifty-fifty:events":"50/50","half-flip:events":"Half flip","musty-flick:events":"Musty flick","possession:ranges":"Possession","powerslide:events":"Powerslide","pressure:ranges":"Half control","rush:ranges":"Rush","speed-flip:events":"Speed flip","touch:events":"Touch","wavedash:events":"Wavedash"},i={"absolute-positioning":"Position zones","ceiling-shot":"Ceiling shot labels","fifty-fifty":"50/50 labels",pressure:"Half control","relative-positioning":"Player roles","speed-flip":"Speed flip labels",touch:"Touch labels"};return e==="effects"?i[n.id]??n.label:t[`${n.id}:${e}`]??`${n.label} timeline`}function rd(n,e,t){const i=Ev(t),a=i.has(n),s=document.createElement("button");s.type="button",s.className="module-summary-item",s.dataset.active=a?"true":"false",s.setAttribute("aria-pressed",a?"true":"false"),s.addEventListener("click",()=>{Tv(n,t,!i.has(n))});const r=document.createElement("span");r.textContent=e;const o=document.createElement("strong");return o.textContent=a?"On":"Off",s.append(r,o),s}function xi(){js.replaceChildren();const n=Zi(),e=vi.filter(t=>t.id!=="boost"&&t.id!==Y_).map(t=>t.renderSettings?.(n)??null).filter(t=>t instanceof HTMLElement);if(e.length===0){js.hidden=!0,Sm(),Mm();return}js.hidden=!1,js.append(...e),Sm(),Mm()}function Sm(){if(!Mu)return;const n=Zi(),e=Gl.renderSettings(n,{showHeader:!1});Mu.replaceChildren(e)}function cL(n){return typeof n=="number"&&Number.isFinite(n)?`${Math.round(n)}`:"--"}function Ml(n=Q?.getState().frameIndex??0){if(!Ys)return;Ys.replaceChildren();const e=Vv(n),t=Q?.replay??null;if(!e||!t){const a=document.createElement("p");a.className="scoreboard-empty",a.textContent="Load a replay to show the scoreboard.",Ys.append(a);return}const i=document.createElement("div");i.className="scoreboard-scoreline",i.append(Em(e.team_zero?.core.goals,!0),dL(),Em(e.team_one?.core.goals,!1)),Ys.append(i)}function dL(){const n=document.createElement("span");return n.className="scoreboard-divider",n.textContent="-",n}function Em(n,e){const t=document.createElement("strong");return t.className=`scoreboard-goal-value ${Ts(e)}`,t.textContent=cL(n),t}function Mm(){if(!Vo)return;const n=Zi(),t=As.find(i=>i.id===Y_)?.renderSettings?.(n)??null;Vo.replaceChildren(),t instanceof HTMLElement&&Vo.append(t)}function uL(n){return ya.find(e=>e.id===n)??null}function Vv(n){return Sa?St(Sa,n):null}function Th(n,e){return e==="blue"?n.team_zero??null:n.team_one??null}function Ah(n){return n==="blue"?"Blue":"Orange"}function $v(n){const e=Q?.replay.players.find(t=>t.id===n);return e?Ts(e.isTeamZero):null}function ql(n){return Ts(n==="blue")}function Wv(n,e){const t=Q?.replay.players??[];for(const i of["blue","orange"]){const a=t.filter(r=>r.isTeamZero===(i==="blue"));if(a.length===0)continue;const s=document.createElement("optgroup");s.label=`${Ah(i)} team`;for(const r of a)s.append(new Option(r.name,r.id,r.id===e,r.id===e));n.append(s)}}function hL(n){return n.kind==="player"?$v(n.playerId):n.kind==="team"?ql(n.team??"blue"):null}function fL(n,e){return n.scope==="player"?$v(e):ql(e==="orange"?"orange":"blue")}function pL(n){switch(n){case"player":return"Player stats";case"team":return"Team stats";case"all-players":return"All players stats";case"all-teams":return"All teams stats";case"goals-overview":return"Goal labels";case"ad-hoc":return"Ad hoc stats"}}function Xv(n){return n==="player"||n==="team"}function mL(n){return n!=="goals-overview"}function qv(n){switch(n){case"player":case"all-players":return"player";case"team":case"all-teams":return"team";case"goals-overview":return null;case"ad-hoc":return null}}function gL(){const n=Ea.size*18;return{x:Math.max(12,Math.min(window.innerWidth-360,96+n)),y:Math.max(64,Math.min(window.innerHeight-240,96+n))}}function Br(n=Q?.getState().frameIndex??0,e={}){for(const t of Ea.values())e.preserveOpenPickers&&(t.pickerOpen||t.element.contains(document.activeElement))||ii(t,n)}function Yv(n,e){const t=e?.id??`stats-${cr++}`,i=Number.parseInt(t.replace(/^stats-/,""),10);Number.isFinite(i)&&(cr=Math.max(cr,i+1));const{x:a,y:s}=gL(),r=document.createElement("section");r.className="stats-window",r.dataset.windowId=t,r.style.setProperty("--window-x",`${a}px`),r.style.setProperty("--window-y",`${s}px`),e&&Pv(r,e.placement);const o=document.createElement("header");o.className="stats-window-header";const l=document.createElement("div");l.className="stats-window-actions";const c=document.createElement("button");if(c.type="button",c.className="stats-window-action",c.textContent="Hide",l.append(c),Xv(n))o.classList.add("stats-window-header-actions-only"),o.append(l);else{const h=document.createElement("h2");h.textContent=pL(n),o.append(h,l)}const d=document.createElement("div");d.className="stats-window-body",r.append(o,d),Tu.append(r);const u={id:t,kind:n,entries:e?.entries.map(h=>({key:`${t}:${h.statId}:${h.targetId??"scope"}`,statId:h.statId,targetId:h.targetId}))??[],playerId:e?.playerId??Q?.replay.players[0]?.id??null,team:e?.team??"blue",pickerOpen:!1,query:"",element:r,body:d};return c.addEventListener("click",()=>{r.hidden=!0,je()}),Ea.set(t,u),e||Wl(r),dr(!1),ii(u),je(),u}function _L(n){for(const e of Ea.values())e.element.remove();Ea.clear(),cr=1;for(const e of n)Yv(e.kind,e)}function ii(n,e=Q?.getState().frameIndex??0){const t=document.activeElement,i=t instanceof HTMLInputElement&&t.dataset.statsWindowSearch===n.id,a=i?t.selectionStart:null,s=i?t.selectionEnd:null,r=i?t.selectionDirection:null;if(n.body.replaceChildren(),vL(n),mL(n.kind)&&(yL(n),bL(n)),SL(n,e),i){const o=n.body.querySelector(`input[data-stats-window-search="${n.id}"]`);o?.focus({preventScroll:!0}),o&&a!==null&&s!==null&&o.setSelectionRange(a,s,r??"none")}}function vL(n){if(n.kind!=="player"&&n.kind!=="team")return;const e=document.createElement("div");e.className="stats-window-scope-row";const t=document.createElement("select");t.className="stats-window-scope-select";const i=hL(n);i&&t.classList.add(i),t.setAttribute("aria-label",n.kind==="player"?"Player stats target":"Team stats target"),n.kind==="player"?(Wv(t,n.playerId),t.value=n.playerId??"",t.addEventListener("change",()=>{n.playerId=t.value||null,ii(n),je()})):(t.append(new Option("Blue","blue",n.team==="blue",n.team==="blue"),new Option("Orange","orange",n.team==="orange",n.team==="orange")),t.value=n.team??"blue",t.addEventListener("change",()=>{n.team=t.value==="orange"?"orange":"blue",ii(n),je()})),e.append(t),n.body.append(e)}function yL(n){const e=document.createElement("button");if(e.type="button",e.className="stats-window-add-button",e.textContent="+",e.title="Add stat",e.setAttribute("aria-label","Add stat"),e.setAttribute("aria-expanded",String(n.pickerOpen)),Ou(e,()=>{n.pickerOpen=!n.pickerOpen,ii(n)}),Xv(n.kind)){n.body.querySelector(".stats-window-scope-row")?.append(e);return}const t=document.createElement("div");t.className="stats-window-toolbar",t.append(e),n.body.append(t)}function Ou(n,e){let t=!1;n.addEventListener("pointerdown",i=>{n.disabled||(t=!0,i.preventDefault(),e())}),n.addEventListener("click",()=>{if(t){t=!1;return}n.disabled||e()})}function bL(n){const e=document.createElement("div");if(e.className="stats-window-picker",e.hidden=!n.pickerOpen,e.hidden){n.body.append(e);return}const t=qv(n.kind),i=document.createElement("input");i.type="search",i.placeholder="Search stats",i.value=n.query,i.dataset.statsWindowSearch=n.id;const a=document.createElement("div");a.className="stats-window-picker-list",i.addEventListener("input",()=>{n.query=i.value,Tm(n,a,t)}),Tm(n,a,t),e.append(i,a),n.body.append(e)}function Tm(n,e,t){e.replaceChildren();const i=t?ya.filter(r=>r.scope===t):ya,a=TP(i,n.query),s=new Map;for(const r of a){const o=s.get(r.category)??[];o.push(r),s.set(r.category,o)}for(const[r,o]of s){if(o.length<2)continue;const l=document.createElement("button");l.type="button",l.className="stats-window-picker-item",l.innerHTML=`<span>Add all ${r}</span><strong>${o.length}</strong>`,Ou(l,()=>{for(const c of o)Am(n,c);ii(n),je()}),e.append(l)}for(const r of a){const o=document.createElement("button");o.type="button",o.className="stats-window-picker-item",o.innerHTML=`<span>${r.label}</span><strong>${r.scope}</strong>`,o.disabled=n.kind!=="ad-hoc"&&n.entries.some(l=>l.statId===r.id),Ou(o,()=>{Am(n,r),ii(n),je()}),e.append(o)}if(a.length===0){const r=document.createElement("p");r.className="stat-window-empty",r.textContent=ya.length===0?"No stats available.":"No matching stats.",e.append(r)}}function Am(n,e){const t=n.kind==="ad-hoc"?xL(e):void 0;n.entries.some(i=>i.statId===e.id&&i.targetId===t)||n.entries.push({key:`${n.id}:${e.id}:${t??"scope"}`,statId:e.id,targetId:t})}function xL(n){return n.scope==="player"?Q?.replay.players[0]?.id??"":"blue"}function wL(n,e){const t=n.entries.findIndex(i=>i.key===e);t>=0&&n.entries.splice(t,1)}function SL(n,e){if(n.kind==="goals-overview"){EL(n);return}const t=Vv(e),i=qv(n.kind),a=n.entries.map(s=>({entry:s,definition:uL(s.statId)})).filter(s=>s.definition!==null&&(!i||s.definition.scope===i));if(a.length===0){const s=document.createElement("p");s.className="stat-window-empty",s.textContent="No stats added.",n.body.append(s);return}if(!t){const s=document.createElement("p");s.className="stat-window-empty",s.textContent="Load a replay to show stats.",n.body.append(s);return}if(n.kind==="all-players"){ML(n,t,a);return}if(n.kind==="all-teams"){TL(n,t,a);return}if(n.kind==="player"){const s=n.playerId?t.players.find(r=>at(r.player_id)===n.playerId)??null:null;Rm(n,s,a);return}if(n.kind==="team"){Rm(n,Th(t,n.team??"blue"),a);return}n.kind==="ad-hoc"&&AL(n,t,a)}function EL(n){const e=zt,t=Q?.replay??null;if(!e||!t){Cm(n,"Load a replay to show goal labels.");return}const i=[...e.events.goal_context??[]].sort((l,c)=>l.time-c.time),a=new Map;for(const l of e.events.goal_tags??[]){const c=a.get(l.goal_index)??[];c.push(l),a.set(l.goal_index,c)}for(const l of a.values())l.sort((c,d)=>c.kind.localeCompare(d.kind)||d.confidence-c.confidence);const s=new Set(i.map((l,c)=>c));for(const l of a.keys())s.add(l);const r=[...s].sort((l,c)=>l-c);if(r.length===0){Cm(n,"No goals loaded.");return}const o=document.createElement("div");o.className="goal-label-list";for(const l of r){const c=i[l]??null,d=a.get(l)??[],u=d[0]??null,h=c?.time??u?.time??0,f=c?.scorer??u?.scorer??null,g=f?at(f):null,_=f?t.players.find(v=>v.id===g)?.name??g:"Unknown scorer",m=c?.scoring_team_is_team_0??u?.scoring_team_is_team_0??null,p=document.createElement("section");p.className="goal-label-item",m!==null&&p.classList.add(Ts(m));const S=document.createElement("header"),x=document.createElement("h3");x.textContent=`Goal ${l+1}`;const y=document.createElement("span");y.textContent=`${Zv(h)} · ${_}`,S.append(x,y);const C=document.createElement("div");if(C.className="goal-label-tags",d.length===0){const v=document.createElement("span");v.className="goal-label-tag goal-label-tag-empty",v.textContent="Unlabeled",C.append(v)}else for(const v of d){const b=document.createElement("span");b.className="goal-label-tag",b.textContent=`${Ht(v.kind)} ${Math.round(v.confidence*100)}%`,C.append(b)}const M=document.createElement("div");M.className="goal-label-actions";const T=document.createElement("button");T.type="button",T.className="goal-label-watch",T.textContent="Watch",T.addEventListener("click",()=>{U2(h,g)});const A=document.createElement("button");A.type="button",A.textContent="Cue",A.addEventListener("click",()=>{Q?.setState({currentTime:Math.max(0,h-q_),playing:!1,skipPostGoalTransitionsEnabled:!1,skipKickoffsEnabled:!1}),bn.checked=!1,xn.checked=!1,je()}),M.append(T,A),p.append(S,C,M),o.append(p)}n.body.append(o)}function Cm(n,e){const t=document.createElement("p");t.className="stat-window-empty",t.textContent=e,n.body.append(t)}function Zv(n){if(!Number.isFinite(n))return"--";const e=Math.floor(Math.max(0,n)/60),t=Math.max(0,n)-e*60;return`${e}:${t.toFixed(1).padStart(4,"0")}`}function Rm(n,e,t){const i=document.createElement("div");i.className="stats-window-stat-list";for(const{entry:a,definition:s}of t)i.append(Yl(n,a,s,e?s.format(s.read(e)):"--"));n.body.append(i)}function ML(n,e,t){const i=document.createElement("div");i.className="stats-window-team-list";for(const a of["blue","orange"]){const s=e.players.filter(u=>u.is_team_0===(a==="blue"));if(s.length===0)continue;const r=document.createElement("section");r.className=`stats-window-team-group ${ql(a)}`;const o=document.createElement("header");o.className="stats-window-team-header";const l=document.createElement("h3");l.textContent=`${Ah(a)} team`;const c=document.createElement("span");c.textContent=`${s.length} player${s.length===1?"":"s"}`,o.append(l,c),r.append(o);const d=document.createElement("div");d.className="stats-window-entity-list";for(const u of s){const h=document.createElement("section");h.className=`stats-window-entity ${Ts(u.is_team_0)}`;const f=document.createElement("h4");f.className="stats-window-entity-title",f.textContent=u.name,h.append(f);for(const{entry:g,definition:_}of t)h.append(Yl(n,g,_,_.format(_.read(u))));d.append(h)}r.append(d),i.append(r)}n.body.append(i)}function TL(n,e,t){const i=document.createElement("div");i.className="stats-window-entity-list";for(const a of["blue","orange"]){const s=Th(e,a),r=document.createElement("section");r.className=`stats-window-entity ${ql(a)}`;const o=document.createElement("h3");o.className="stats-window-entity-title",o.textContent=Ah(a),r.append(o);for(const{entry:l,definition:c}of t)r.append(Yl(n,l,c,s?c.format(c.read(s)):"--"));i.append(r)}n.body.append(i)}function AL(n,e,t){const i=document.createElement("div");i.className="stats-window-stat-list";for(const{entry:a,definition:s}of t){const r=CL(e,s,a.targetId);i.append(Yl(n,a,s,r?s.format(s.read(r)):"--"))}n.body.append(i)}function CL(n,e,t){return e.scope==="player"?n.players.find(i=>at(i.player_id)===t)??n.players[0]??null:Th(n,t==="orange"?"orange":"blue")}function Yl(n,e,t,i){const a=document.createElement("div");a.className="stats-window-stat-row";const s=document.createElement("span");if(s.className="stats-window-stat-name",s.textContent=t.label,n.kind==="ad-hoc"){const l=document.createElement("select");l.className="stats-window-stat-target";const c=fL(t,e.targetId);c&&l.classList.add(c),t.scope==="player"?Wv(l,e.targetId):l.append(new Option("Blue","blue",e.targetId==="blue",e.targetId==="blue"),new Option("Orange","orange",e.targetId==="orange",e.targetId==="orange")),l.value=e.targetId??"",l.addEventListener("change",()=>{const d=l.value;if(n.entries.some(h=>h!==e&&h.statId===e.statId&&h.targetId===d)){ii(n);return}const u=n.entries.findIndex(h=>h.key===e.key);u>=0&&(n.entries[u]={key:`${n.id}:${e.statId}:${d}`,statId:e.statId,targetId:d}),ii(n),je()}),s.append(" ",l)}const r=document.createElement("span");r.className="stats-window-stat-value",r.textContent=i;const o=document.createElement("button");return o.type="button",o.className="stats-window-stat-remove",o.textContent="x",o.addEventListener("click",()=>{wL(n,e.key),ii(n),je()}),a.append(s,r,o),a}function Tn(n,e="",t=0){return n===void 0||Number.isNaN(n)?"--":`${n.toFixed(t)}${e}`}function Kv(){return{fov:110,height:100,pitch:-4,distance:270,stiffness:0,swivelSpeed:1,transitionSpeed:1}}function RL(n){return!Q||n===null?null:Q.replay.players.find(e=>e.id===n)?.cameraSettings??null}function jv(n){return{...Kv(),...RL(n.attachedPlayerId)??{},...n.customCameraSettings??{}}}function Pm(){return{fov:Number(Tr.value),height:Number(Ar.value),pitch:Number(Cr.value),distance:Number(Rr.value),stiffness:Number(Pr.value),swivelSpeed:Number(Lr.value),transitionSpeed:Number(Nr.value)}}function PL(n){bl.hidden=!Ui.checked,Tr.disabled=!n,Ar.disabled=!n,Cr.disabled=!n,Rr.disabled=!n,Pr.disabled=!n,Lr.disabled=!n,Nr.disabled=!n}function Jv(n){const e=Kv(),t=n.fov??e.fov,i=n.height??e.height,a=n.pitch??e.pitch,s=n.distance??e.distance,r=n.stiffness??e.stiffness,o=n.swivelSpeed??e.swivelSpeed,l=n.transitionSpeed??e.transitionSpeed;Tr.value=`${t}`,Ar.value=`${i}`,Cr.value=`${a}`,Rr.value=`${s}`,Pr.value=`${r}`,Lr.value=`${o}`,Nr.value=`${l}`,ov.textContent=Tn(t,"",0),lv.textContent=Tn(i,"",0),cv.textContent=Tn(a,"",0),dv.textContent=Tn(s,"",0),uv.textContent=Tn(r,"",2),hv.textContent=Tn(o,"",1),fv.textContent=Tn(l,"",2)}function Lm(n){yl.disabled=!n,va.disabled=!n,Hi.disabled=!n,bn.disabled=!n,xn.disabled=!n,Ch(n?Q?.getState():void 0)}function LL(n){switch(n){case"free":return Au;case"follow":return Cu}}function Ch(n){const e=n?.cameraViewMode??"free",t=Q!==null&&n!==void 0,i=(n?.attachedPlayerId??null)!==null;for(const a of f2){const s=LL(a);s.disabled=!t||a==="follow"&&!i;const r=a===e;s.dataset.active=r?"true":"false",s.setAttribute("aria-pressed",r?"true":"false")}sr.disabled=!t,rr.disabled=!t,sr.dataset.active="false",rr.dataset.active="false",sr.setAttribute("aria-pressed","false"),rr.setAttribute("aria-pressed","false")}function Bu(n){Ch(n);const e=Q!==null&&n?.cameraViewMode==="follow"&&(n.attachedPlayerId??null)!==null;or.disabled=!e,Ui.disabled=!e,PL(e&&n?.customCameraSettings!==null),lr.disabled=!e}function NL(n){Hi.replaceChildren(),Hi.append(new Option("Free camera",""));for(const e of n)Hi.append(new Option(`${e.name} (${e.isTeamZero?"Blue":"Orange"})`,e.id))}function IL(n){if(n<=0)return"--";const e=["B","KB","MB","GB"];let t=n,i=0;for(;t>=1024&&i<e.length-1;)t/=1024,i+=1;const a=i===0?0:t>=10?1:2;return`${t.toFixed(a)} ${e[i]}`}function DL(n){if(!n)return"No replay";if(n.error)return n.error;switch(n.state){case"idle":return"Idle";case"recording":return"Recording";case"stopping":return"Stopping";case"ready":return"Ready";case"error":return"Error"}}function Nm(){const n=Number(vs.value),e=Number(ys.value);return{fps:Number.isFinite(n)?Math.max(1,Math.min(120,Math.trunc(n))):60,playbackRate:Number.isFinite(e)?Math.max(.1,e):1}}function On(n=qt?.getStatus()??null){const e=qt!==null&&Q!==null,t=n?.state??"idle",i=t==="recording"||t==="stopping",a=(qt?.getRecording()??null)!==null;bv.textContent=DL(n),xv.textContent=`${(n?.elapsedSeconds??0).toFixed(1)}s`,wv.textContent=IL(n?.sizeBytes??0),Sv.textContent=n?.mimeType||"WebM",Lu.disabled=!e||i,Nu.disabled=!e||i,Iu.disabled=!e||!i,Du.disabled=!a||i,Uu.disabled=!a||i,vs.disabled=i,ys.disabled=i}function UL(){const e=(wl?.replace(/\.replay$/i,"")||"replay").replace(/[^a-zA-Z0-9._-]+/g,"-").replace(/^-+|-+$/g,""),t=new Date().toISOString().replace(/[:.]/g,"-");return`${e||"replay"}-${t}.webm`}function FL(n){const e=URL.createObjectURL(n),t=document.createElement("a");t.href=e,t.download=UL(),document.body.append(t),t.click(),t.remove(),window.setTimeout(()=>URL.revokeObjectURL(e),0)}function Qv(n){const e=n?.attachedPlayerId??null;if(!Q||n?.cameraViewMode!=="follow"||e===null){$o.textContent="Free camera",Wo.textContent="--",Xo.textContent="--",qo.textContent="--",Yo.textContent="--",Zo.textContent="--";return}const t=Q.replay.players.find(a=>a.id===e);if(!t){$o.textContent="Unknown",Wo.textContent="--",Xo.textContent="--",qo.textContent="--",Yo.textContent="--",Zo.textContent="--";return}const i=jv(n);$o.textContent=n.customCameraSettings===null?t.name:`${t.name} custom`,Wo.textContent=Tn(i.fov,"",0),Xo.textContent=Tn(i.height,"",0),qo.textContent=Tn(i.pitch,"",0),Yo.textContent=Tn(i.distance,"",0),Zo.textContent=Tn(i.stiffness,"",2)}function Im(n){lL(n)||(pv.textContent=`${n.currentTime.toFixed(2)}s`,mv.textContent=`${n.frameIndex}`,gv.textContent=`${n.duration.toFixed(2)}s`,_v.textContent=n.playing?"Playing":"Paused",yl.textContent=n.playing?"Pause":"Play",va.value=`${n.speed}`,or.value=`${n.cameraDistanceScale}`,rv.textContent=`${n.cameraDistanceScale.toFixed(2)}x`,Ui.checked=n.customCameraSettings!==null,bl.hidden=!Ui.checked,Jv(jv(n)),lr.checked=n.ballCamEnabled,Hi.value=n.attachedPlayerId??"",bn.checked=n.skipPostGoalTransitionsEnabled,xn.checked=n.skipKickoffsEnabled,_l.hidden=!0,Bu(n),Qv(n),Br(n.frameIndex,{preserveOpenPickers:!0}),Ml(n.frameIndex),Ir(n))}function kL(n){return Gl.includePickup(n)}function OL(n){return{name:n.name,preparingStatus:"Preparing replay...",async readBytes(){return new Uint8Array(await n.arrayBuffer())}}}function BL(n,e){return{name:n.name,preparingStatus:"Fetching replay...",async readBytes(){const t=await fetch(n.url,{...n.fetchInit,signal:e});if(!t.ok){const i=t.statusText?` ${t.statusText}`:"",a=n.kind==="ballchasing"&&[401,403,404].includes(t.status)?". The replay may be private, unavailable, or not downloadable without a Ballchasing session":"";throw new Error(`Failed to fetch replay from ${n.url.href} (${t.status}${i})${a}`)}return new Uint8Array(await t.arrayBuffer())}}}async function e0(n){await Rh(n,Promise.resolve().then(()=>zL(n,e=>{sn.textContent=Ms(e),gi?.update(e)})))}async function zL(n,e){const t=await n.readBytes();return kl(t,{reportEveryNFrames:100,onProgress:e})}async function Rh(n,e){sn.textContent=n.preparingStatus,ls.disabled=!0,gi?.show(n.name,n.preparingStatus),Lm(!1),Bu(),_l.hidden=!1,ns&&(ns(),ns=null),Sh(),Q?.destroy(),Q=null,qt=null,wl=null,vn=null,zt=null,Sa=null,ya=Er(null),Vl(),$l(),Av(),Xi=null,qi=null,Ml(),bi(),pm(),xs(),xi(),On();try{sn.textContent="Parsing replay...",gi?.show(n.name,"Parsing replay...");const t=await e,{replay:i}=t;zt=t.statsTimeline,Sa=XC(zt),ya=Er(zt.frames[0]??null),Mv(),vn=B1({replayEventsLabel:"Replay",replayEvents:r=>Jo(Kg(r.replay,hn))});const a=b1({onStatusChange:On});qt=a;const s=Li;if(Q=new IT(K_,i,{initialPlaybackRate:s?.playback.rate,initialCameraDistanceScale:s?.camera.distanceScale??X_,initialCustomCameraSettings:s?.camera.customSettings??null,initialAttachedPlayerId:s?.camera.attachedPlayerId??null,initialCameraViewMode:s?.camera.mode,initialBallCamEnabled:s?.camera.ballCam??!1,initialBoostPickupAnimationEnabled:s?.overlays.boostPickupAnimation??!1,initialSkipPostGoalTransitionsEnabled:bn.checked,initialSkipKickoffsEnabled:xn.checked,plugins:[$T(),m1({includePickup:kL}),a,vn]}),Eh(),bs(),ns=Q.subscribe(Im),s){cs=!0;try{k2(s)}finally{cs=!1}}NL(i.players),_l.hidden=!0,sn.textContent=`Loaded ${n.name}`,wl=n.name,vv.textContent=i.players.map(r=>r.name).join(", "),yv.textContent=`${i.frameCount}`,bi(),pm(),Xi=null,qi=null,xs(),Lm(!0),Bu(Q.getState()),Im(Q.getState()),Br(Q.getState().frameIndex),Ml(Q.getState().frameIndex),Ir(Q.getState(),{forceScroll:!0}),xi(),On(),gi?.hide()}catch(t){throw gi?.hide(),Q?.destroy(),Q=null,qt=null,On(),t}finally{ls.disabled=!1}}function HL(n){let e;try{e=H_(window.location.search,window.location.href)}catch(t){console.error("Invalid replay URL:",t),sn.textContent=t instanceof Error?t.message:"Invalid replay URL";return}e&&e0(BL(e,n)).catch(t=>{n.aborted||(console.error("Failed to load replay URL:",t),sn.textContent=t instanceof Error?t.message:"Failed to load replay URL")})}function GL(n,e={}){Co?.(),n.innerHTML=z1(X_),zi=n,gi=W1(n),ls=ne(n,"#replay-file"),K_=ne(n,"#viewport"),_l=ne(n,"#empty-state"),om=ne(n,"#empty-load-replay"),vl=ne(n,"#launcher-toggle"),mu=ne(n,"#launcher-menu"),lm=ne(n,"#load-replay-action"),cm=ne(n,"#floating-window-layer"),Ys=ne(n,"#scoreboard-window-body"),Pi=ne(n,"#mechanics-timeline-window-body"),is=ne(n,"#event-playlist-window-body"),Ao=ne(n,"#mechanics-review-file"),nd=ne(n,"#mechanics-review-url"),dm=ne(n,"#mechanics-review-load-url"),gu=ne(n,"#mechanics-review-status"),j_=ne(n,"#mechanics-review-index"),J_=ne(n,"#mechanics-review-title"),Q_=ne(n,"#mechanics-review-mechanic"),ev=ne(n,"#mechanics-review-player"),tv=ne(n,"#mechanics-review-clip"),nv=ne(n,"#mechanics-review-event"),iv=ne(n,"#mechanics-review-reason"),_u=ne(n,"#mechanics-review-prev"),vu=ne(n,"#mechanics-review-replay"),yu=ne(n,"#mechanics-review-next"),bu=ne(n,"#mechanics-review-confirm"),xu=ne(n,"#mechanics-review-reject"),wu=ne(n,"#mechanics-review-uncertain"),Su=ne(n,"#mechanics-review-replay-load-summary"),Eu=ne(n,"#replay-loading-summary"),av=ne(n,"#replay-loading-active"),Zs=ne(n,"#replay-loading-list"),sv=ne(n,"#mechanics-review-count"),Ks=ne(n,"#mechanics-review-list"),Mu=ne(n,"#boost-pickup-filters-window-body"),Vo=ne(n,"#touch-controls-window-body"),Tu=ne(n,"#stats-window-layer"),yl=ne(n,"#toggle-playback"),va=ne(n,"#playback-rate"),Hi=ne(n,"#attached-player"),Au=ne(n,"#camera-view-free"),Cu=ne(n,"#camera-view-follow"),sr=ne(n,"#camera-view-overhead"),rr=ne(n,"#camera-view-side"),or=ne(n,"#camera-distance"),rv=ne(n,"#camera-distance-readout"),Ui=ne(n,"#custom-camera-settings"),bl=ne(n,"#camera-settings-controls"),Tr=ne(n,"#custom-camera-fov"),Ar=ne(n,"#custom-camera-height"),Cr=ne(n,"#custom-camera-pitch"),Rr=ne(n,"#custom-camera-distance"),Pr=ne(n,"#custom-camera-stiffness"),Lr=ne(n,"#custom-camera-swivel-speed"),Nr=ne(n,"#custom-camera-transition-speed"),ov=ne(n,"#custom-camera-fov-readout"),lv=ne(n,"#custom-camera-height-readout"),cv=ne(n,"#custom-camera-pitch-readout"),dv=ne(n,"#custom-camera-distance-readout"),uv=ne(n,"#custom-camera-stiffness-readout"),hv=ne(n,"#custom-camera-swivel-speed-readout"),fv=ne(n,"#custom-camera-transition-speed-readout"),lr=ne(n,"#ball-cam"),Ru=ne(n,"#module-summary"),js=ne(n,"#module-settings"),pv=ne(n,"#time-readout"),mv=ne(n,"#frame-readout"),gv=ne(n,"#duration-readout"),_v=ne(n,"#playback-status-readout"),sn=ne(n,"#status-readout"),vv=ne(n,"#players-readout"),yv=ne(n,"#frames-readout"),Pu=ne(n,"#events-readout"),$o=ne(n,"#camera-profile-readout"),Wo=ne(n,"#camera-fov-readout"),Xo=ne(n,"#camera-height-readout"),qo=ne(n,"#camera-pitch-readout"),Yo=ne(n,"#camera-base-distance-readout"),Zo=ne(n,"#camera-stiffness-readout"),bn=ne(n,"#skip-post-goal-transitions"),xn=ne(n,"#skip-kickoffs"),vs=ne(n,"#recording-fps"),ys=ne(n,"#recording-playback-rate"),Lu=ne(n,"#recording-start"),Nu=ne(n,"#recording-full-replay"),Iu=ne(n,"#recording-stop"),Du=ne(n,"#recording-download"),Uu=ne(n,"#recording-clear"),bv=ne(n,"#recording-status"),xv=ne(n,"#recording-elapsed"),wv=ne(n,"#recording-size"),Sv=ne(n,"#recording-type");const t=G_(window.location),i=e2(window.location);let a=null;if(e.initialConfig!==void 0)Li=e.initialConfig;else{try{Li=QP(window.location)}catch(l){a=l,console.error("Invalid stats player config:",l),sn.textContent=l instanceof Error?l.message:"Invalid stats player config",Li=null}i&&L2(t,Li,a)}const s=new AbortController;fm(cm,s.signal),fm(Tu,s.signal);const r=()=>{s.abort(),ns?.(),ns=null,Sh(),Q?.destroy(),Q=null,qt=null,vn=null,zt=null,Sa=null,ya=Er(null),Ea.clear(),Vl(),$l(),Av(),vi=[],gi?.destroy(),gi=null,hn=new Set,Cs=new Set,rn=new Set,Rs=new Set,Xi=null,Sl=!0,qi=null,Ot=null,Ko=!1,yi=!0,wl=null,Kn=null,Li=null,ma!==null&&(window.clearTimeout(ma),ma=null),cs=!1,cr=1,xl=30,ml=null,zi===n&&(zi=null,n.replaceChildren()),Co===r&&(Co=null)};if(Co=r,Li){cs=!0;try{I2(Li)}finally{cs=!1}}vl.addEventListener("click",()=>{dr(mu.hidden)},{signal:s.signal}),n.addEventListener("click",l=>{l.target instanceof Element&&(l.target.closest(".top-chrome")||dr(!1))},{signal:s.signal}),lm.addEventListener("click",hm,{signal:s.signal}),om.addEventListener("click",hm,{signal:s.signal}),n.querySelectorAll("[data-window-toggle]").forEach(l=>{l.addEventListener("click",()=>{const c=l.dataset.windowToggle;c&&(O2(c),dr(!1))},{signal:s.signal})}),n.querySelectorAll("[data-window-hide]").forEach(l=>{l.addEventListener("click",()=>{const c=l.dataset.windowHide??w2(l);c&&B2(c)},{signal:s.signal})}),n.querySelectorAll("[data-create-stats-window]").forEach(l=>{l.addEventListener("click",()=>{Yv(l.dataset.createStatsWindow)},{signal:s.signal})}),ls.addEventListener("change",async()=>{const l=ls.files?.[0];if(l)try{Ot&&(Ot.currentClip=null,Ot.currentReplayId=null,ws()),await e0(OL(l))}catch(c){console.error("Failed to load replay:",c),sn.textContent=c instanceof Error?c.message:"Failed to load replay"}},{signal:s.signal}),Ao.addEventListener("change",async()=>{const l=Ao.files?.[0];if(l)try{const c=Iv(await l.text());await Gv(c,null)}catch(c){console.error("Failed to load mechanics review playlist:",c),cn(c instanceof Error?c.message:"Failed to load mechanics review playlist")}finally{Ao.value=""}},{signal:s.signal}),dm.addEventListener("click",()=>{xm(nd.value.trim()).catch(l=>{console.error("Failed to load mechanics review playlist URL:",l),cn(l instanceof Error?l.message:"Failed to load mechanics review playlist URL")})},{signal:s.signal}),_u.addEventListener("click",()=>{const l=Ot;l&&El(Math.max(0,l.currentIndex-1))},{signal:s.signal}),vu.addEventListener("click",oL,{signal:s.signal}),yu.addEventListener("click",()=>{const l=Ot;l&&El(Math.min(l.manifest.items.length-1,l.currentIndex+1))},{signal:s.signal}),bu.addEventListener("click",()=>{ad("confirmed")},{signal:s.signal}),xu.addEventListener("click",()=>{ad("rejected")},{signal:s.signal}),wu.addEventListener("click",()=>{ad("uncertain")},{signal:s.signal}),yl.addEventListener("click",()=>{Q?.togglePlayback(),je()},{signal:s.signal}),va.addEventListener("change",()=>{Q?.setPlaybackRate(Number(va.value)),je()},{signal:s.signal}),Lu.addEventListener("click",()=>{if(qt)try{const{fps:l}=Nm();qt.start({fps:l}),On()}catch(l){console.error("Failed to start recording:",l),sn.textContent=l instanceof Error?l.message:"Failed to start recording",On(qt.getStatus())}},{signal:s.signal}),Nu.addEventListener("click",()=>{if(!qt)return;const{fps:l,playbackRate:c}=Nm();qt.recordFullReplay({fps:l,playbackRate:c,restorePlaybackState:!0}).catch(d=>{console.error("Failed to record replay:",d),sn.textContent=d instanceof Error?d.message:"Failed to record replay",On(qt?.getStatus()??null)}),On()},{signal:s.signal}),Iu.addEventListener("click",()=>{qt?.stop().catch(l=>{console.error("Failed to stop recording:",l),sn.textContent=l instanceof Error?l.message:"Failed to stop recording"}),On()},{signal:s.signal}),Du.addEventListener("click",()=>{const l=qt?.getRecording();l&&FL(l)},{signal:s.signal}),Uu.addEventListener("click",()=>{try{qt?.clear(),On()}catch(l){console.error("Failed to clear recording:",l)}},{signal:s.signal}),vs.addEventListener("change",je,{signal:s.signal}),ys.addEventListener("change",je,{signal:s.signal}),or.addEventListener("input",()=>{Q?.setCameraDistanceScale(Number(or.value)),je()},{signal:s.signal}),Ui.addEventListener("change",()=>{bl.hidden=!Ui.checked,Q?.setCustomCameraSettings(Ui.checked?Pm():null),je()},{signal:s.signal});for(const l of[Tr,Ar,Cr,Rr,Pr,Lr,Nr])l.addEventListener("input",()=>{const c=Pm();Jv(c),Q?.setCustomCameraSettings(c),je()},{signal:s.signal});Hi.addEventListener("change",()=>{Q?.setAttachedPlayer(Hi.value||null),Kn=null,je()},{signal:s.signal}),Au.addEventListener("click",()=>{Q?.setCameraViewMode("free"),Kn=null,je()},{signal:s.signal}),Cu.addEventListener("click",()=>{Q?.setCameraViewMode("follow"),Kn=null,je()},{signal:s.signal}),sr.addEventListener("click",()=>{Q?.setFreeCameraPreset("overhead"),Kn="overhead",je()},{signal:s.signal}),rr.addEventListener("click",()=>{Q?.setFreeCameraPreset("side"),Kn="side",je()},{signal:s.signal}),lr.addEventListener("change",()=>{Q?.setBallCamEnabled(lr.checked),je()},{signal:s.signal}),bn.addEventListener("change",()=>{Q?.setSkipPostGoalTransitionsEnabled(bn.checked),je()},{signal:s.signal}),xn.addEventListener("change",()=>{Q?.setSkipKickoffsEnabled(xn.checked),je()},{signal:s.signal}),Yi(),xi(),Ml(),Qv(),Ch(),On(),bi(),ws(),xs(),e.initialBundle?Rh({name:e.initialReplayName??"replay",preparingStatus:"Preparing replay...",async readBytes(){throw new Error("Replay bytes are not available for this preloaded replay")}},Promise.resolve(e.initialBundle)).catch(l=>{s.signal.aborted||(console.error("Failed to load preprocessed replay bundle:",l),sn.textContent=l instanceof Error?l.message:"Failed to load preprocessed replay bundle")}):e.loadFromLocation!==!1&&HL(s.signal);const o=Z2();return o&&(nd.value=o,Nv("mechanics-review"),xm(o).catch(l=>{s.signal.aborted||(console.error("Failed to load mechanics review playlist from URL:",l),cn(l instanceof Error?l.message:"Failed to load mechanics review playlist from URL"))})),{root:n,destroy:r}}const on=["#58a6ff","#f39a37"],Dm=["#58a6ff","#f39a37","#65d6ad","#d2a8ff","#ff7b72","#f2cc60","#79c0ff","#ffa657"],Vs={zero:"#ff7b72",low:"#f39a37",midLow:"#f2cc60",midHigh:"#65d6ad",high:"#58a6ff"},Um={big:"#f39a37",small:"#65d6ad"};let el=null,Dr={};const t0=[{id:"overview",label:"Overview"},{id:"goals",label:"Goals"},{id:"boost",label:"Boost"},{id:"territory",label:"Possession & territory"},{id:"involvement",label:"Player involvement"},{id:"dump",label:"All stats"}],VL=[{statId:"player:core.score",kind:"bar",title:"Score by player"},{statId:"player:core.shots",kind:"bar",title:"Shots by player"},{statId:"player:touch.touch_count",kind:"bar",title:"Touches by player"},{statId:"team:core.shots",kind:"pie",title:"Shot share"},{statId:"team:possession.possession_time",kind:"pie",title:"Possession share"},{statId:"team:pressure.offensive_pressure_time",kind:"bar",title:"Offensive pressure"}],$L=[{statId:"player:touch.touch_count",kind:"bar",title:"Touches"},{statId:"player:touch.control_touch_count",kind:"bar",title:"Control touches"},{statId:"player:touch.hard_hit_count",kind:"bar",title:"Hard hits"},{statId:"player:demo.demos_inflicted",kind:"bar",title:"Demos inflicted"},{statId:"player:fifty_fifty.wins",kind:"bar",title:"50/50 wins"},{statId:"player:powerslide.total_duration",kind:"bar",title:"Powerslide time"}];function K(n,e={}){const t=document.createElement(n);return e.className&&(t.className=e.className),e.id&&(t.id=e.id),e.text!==void 0&&(t.textContent=e.text),t}function n0(n,e,t){return e==="player"?n.name||`Player ${t+1}`:t===0?"Blue":"Orange"}function Tl(n){return n?at(n):null}function ja(n,e){const t=Tl(e);return t?n.players.find(i=>Tl(i.player_id)===t)?.name??t:"--"}function zu(n){return n===!0?"Blue":n===!1?"Orange":"--"}function i0(n,e){return e==="player"?n.players:[n.team_zero,n.team_one]}function a0(n){return n.is_team_0?on[0]:on[1]}function WL(n,e,t){return e==="player"?a0(n):on[t%on.length]}function XL(n){return n.frames.at(-1)??null}function qL(n,e){const t=n.read(e);return typeof t=="number"&&Number.isFinite(t)?t:null}function Ps(n){return n==null||!Number.isFinite(n)?"--":`${Number(n.toFixed(1))}s`}function YL(n){return n==null||!Number.isFinite(n)?"--":`${Number(n.toFixed(1))}%`}function jn(n,e){return e>0?`${Ps(n)} (${YL(n/e*100)})`:"--"}function tl(n){return n?`x ${Math.round(n.x)}, y ${Math.round(n.y)}, z ${Math.round(n.z)}`:"--"}function Vn(n){return n==null||!Number.isFinite(n)?"--":`${Number(Ca(n).toFixed(0))}`}function hr(n){if(n==null||!Number.isFinite(n))return"--";const e=Math.max(0,n),t=Math.floor(e/60),i=e-t*60;return`${t}:${i.toFixed(1).padStart(4,"0")}`}function ZL(n,e,t){if(!n||e==null||!Number.isFinite(e))return null;const i=Tl(t),a=new URL("../",window.location.href);return a.searchParams.set("replayUrl",n.href),V_(a,s0(e,i)).href}function KL(n,e,t){if(e==null||!Number.isFinite(e))return null;const i=Tl(t);return{config:s0(e,i),href:ZL(n,e,t),goalTime:e,playerId:i}}function s0(n,e){return{version:fl,playback:{currentTime:Math.max(0,n-4),playing:!0,rate:1,skipPostGoalTransitions:!1,skipKickoffs:!1},camera:e?{mode:"follow",attachedPlayerId:e,ballCam:!0}:{mode:"free"},overlays:{timelineEvents:["core"],timelineRanges:[],mechanics:[],renderEffects:[],followedPlayerHud:!1,boostPads:!0,boostPickupAnimation:!1},recording:{},singletonWindows:[],statsWindows:[],moduleConfigs:{}}}function r0(n,e){return e>0?`${Number((Ca(n)/e*60).toFixed(1))}/min`:"--"}function jL(n){const e=new Map;for(const t of n){const i=`${t.scope}:${t.category}`,a=e.get(i);a?a.push(t):e.set(i,[t])}return new Map([...e].sort(([t],[i])=>t.localeCompare(i)))}function o0(n){const[e,t]=n.split(":"),i=(t??"").replace(/_/g," ").replace(/\b\w/g,a=>a.toUpperCase());return`${e==="player"?"Player":"Team"} ${i}`}function l0(n){return`stats-${n.replace(/[^a-z0-9]+/gi,"-").toLowerCase()}`}function JL(n){return n.path.slice(1).join(".")||n.label}function QL(n){return!n.path.includes("entries")}function dn(n,e,t){const i=K("section",{className:"stats-report-summary-card"});return i.append(K("span",{text:n}),K("strong",{text:e})),t&&i.append(K("small",{text:t})),i}function eN(n,e){const t=K("section",{className:"stats-report-summary"}),i=e.time>0?Ps(e.time):"--";return t.append(dn("Replay",n.fileName),dn("Frames",n.statsTimeline.frames.length.toLocaleString()),dn("Duration",i),dn("Players",e.players.length.toLocaleString())),t}function Ls(n,e){const t=K("section",{className:"stats-report-page-intro"});return t.append(K("h2",{text:n}),K("p",{text:e})),t}function tN(n,e,t){const i=e[0]?.scope??"player",a=i0(t,i),s=K("section",{className:"stats-report-section",id:l0(n)}),r=K("header");r.append(K("h2",{text:o0(n)}),K("span",{text:`${e.length} stats`}));const o=K("div",{className:"stats-report-table-wrap"}),l=K("table",{className:"stats-report-table"}),c=K("thead"),d=K("tr");d.append(K("th",{text:"Statistic"})),a.forEach((h,f)=>{d.append(K("th",{text:n0(h,i,f)}))}),c.append(d);const u=K("tbody");return e.forEach(h=>{const f=K("tr");f.append(K("td",{text:JL(h)})),a.forEach(g=>{f.append(K("td",{text:h.format(h.read(g))}))}),u.append(f)}),l.append(c,u),o.append(l),s.append(r,o),s}function Ph(n,e){return i0(e,n.scope).map((t,i)=>({label:n0(t,n.scope,i),value:qL(n,t)??0,color:WL(t,n.scope,i)})).filter(t=>t.value>0)}function Al(n,e){const t=Math.max(...n.map(a=>a.value),1),i=K("div",{className:"stats-report-bar-chart"});return n.forEach(a=>{const s=K("div",{className:"stats-report-bar-row"});s.style.setProperty("--bar-color",a.color),s.style.setProperty("--bar-width",`${Math.max(2,a.value/t*100)}%`),s.append(K("span",{className:"stats-report-bar-label",text:a.label}),K("span",{className:"stats-report-bar-track"}),K("strong",{text:a.formatted??e(a.value)})),i.append(s)}),i}function c0(n,e){const t=n.path.join(".");return n.category==="boost"&&(t.includes("amount_")||t.includes("overfill")||t.includes("boost_integral"))?Vn(e):t.endsWith("_time")||t.startsWith("time_")||t.includes(".time_")||t.endsWith("_duration")||t==="active_game_time"||t==="tracked_time"?Ps(e):n.format(e)}function nN(n,e){return Al(Ph(n,e),t=>c0(n,t))}function iN(n){const e=n.reduce((i,a)=>i+a.value,0);if(e<=0)return"conic-gradient(rgba(255,255,255,0.12) 0 360deg)";let t=0;return`conic-gradient(${n.map(i=>{const a=t;return t+=i.value/e*360,`${i.color} ${a}deg ${t}deg`}).join(", ")})`}function Lh(n,e){const t=n.reduce((r,o)=>r+o.value,0),i=K("div",{className:"stats-report-pie-chart"}),a=K("div",{className:"stats-report-pie"});a.style.background=iN(n);const s=K("div",{className:"stats-report-pie-legend"});return n.forEach(r=>{const o=K("div");o.style.setProperty("--legend-color",r.color);const l=t>0?`${Math.round(r.value/t*100)}%`:"--";o.append(K("span",{text:r.label}),K("strong",{text:`${r.formatted??e(r.value)} (${l})`})),s.append(o)}),i.append(a,s),i}function aN(n,e){return Lh(Ph(n,e),t=>c0(n,t))}function d0(n,e="Territory share"){return Pn(e,Lh([{label:"Blue half",value:n.team_zero.pressure.defensive_half_time,color:on[0]},{label:"Neutral",value:n.team_zero.pressure.neutral_time,color:"#65d6ad"},{label:"Orange half",value:n.team_zero.pressure.offensive_half_time,color:on[1]}],Ps))}function Pn(n,e,t){const i=K("section",{className:"stats-report-chart-card"});return i.append(K("h3",{text:n})),i.append(e),i}function u0(n,e,t){return Ph(e,t).length===0?null:Pn(n.title,n.kind==="pie"?aN(e,t):nN(e,t))}function h0(n,e,t){const i=new Map(n.map(s=>[s.id,s])),a=K("section",{className:"stats-report-charts"});return t.forEach(s=>{const r=i.get(s.statId);if(!r)return;const o=u0(s,r,e);o&&a.append(o)}),a.childElementCount>0?a:null}function Ss(n,e){const t=K("div",{className:"stats-report-stacked-chart"});return n.forEach(i=>{const a=i.segments.reduce((l,c)=>l+Math.max(0,c.value),0),s=K("div",{className:"stats-report-stacked-row"}),r=K("div",{className:"stats-report-stacked-track"});i.segments.forEach(l=>{const c=K("span");c.style.setProperty("--segment-color",l.color),c.style.setProperty("--segment-width",`${a>0?Math.max(1.5,l.value/a*100):0}%`),c.title=`${l.label}: ${e(l.value,a)}`,r.append(c)});const o=K("div",{className:"stats-report-stacked-legend"});i.segments.forEach(l=>{const c=K("span",{text:`${l.label}: ${e(l.value,a)}`});c.style.setProperty("--legend-color",l.color),o.append(c)}),s.append(K("strong",{text:i.label}),r,o),t.append(s)}),t}function Zl(n){const e=K("section",{className:"stats-report-metric-grid"});return e.append(...n),e}function _a(n,e,t){const i=[...n].sort((s,r)=>e(r)-e(s))[0],a=i?e(i):0;return dn(i?.name??"--",t(a))}function sN(n,e,t){const i=K("div",{className:"stats-report-page"});i.append(eN(n,e)),i.append(Ls("Featured stats","A shorter readout of stable scoreboard, touch, boost, possession, and pressure signals. The raw export remains available in All stats."));const a=`${e.team_zero.core.goals}-${e.team_one.core.goals}`;i.append(Zl([dn("Final score",a,"Blue - Orange"),_a(e.players,r=>r.touch.touch_count,r=>`${r} touches`),_a(e.players,r=>r.boost.tracked_time>0?Ca(r.boost.boost_integral/r.boost.tracked_time):0,r=>`${Number(r.toFixed(0))} avg boost`),_a(e.players,r=>r.core.score,r=>`${r} score`)]));const s=h0(t,e,VL)??K("section",{className:"stats-report-charts"});return s.append(d0(e)),i.append(s),i}function rN(n){const e=new Map;for(const t of n){const i=e.get(t.goal_index)??[];i.push(t),e.set(t.goal_index,i)}for(const t of e.values())t.sort((i,a)=>i.kind.localeCompare(a.kind)||a.confidence-i.confidence);return e}function oN(n,e){const t=new Set(n.map((i,a)=>a));for(const i of e.keys())t.add(i);return[...t].sort((i,a)=>i-a)}function lN(n){const e=new Map;for(const t of n)e.set(t.kind,(e.get(t.kind)??0)+1);return[...e.entries()].sort(([t,i],[a,s])=>s-i||Ht(t).localeCompare(Ht(a))).map(([t,i],a)=>({label:Ht(t),value:i,color:Dm[a%Dm.length],formatted:i.toLocaleString()}))}function cN(n){const e=K("dl",{className:"stats-report-detail-list"});for(const t of n){const i=K("div",{className:"stats-report-detail-item"});i.append(K("dt",{text:t.label}),K("dd",{text:t.value})),e.append(i)}return e}function dN(n){const e=K("div",{className:"stats-report-goal-tags"});if(n.length===0)return e.append(K("span",{className:"stats-report-goal-tag stats-report-goal-tag-empty",text:"Unlabeled"})),e;for(const t of n){const i=t.modifiers.length>0?` - ${t.modifiers.map(Ht).join(", ")}`:"";e.append(K("span",{className:"stats-report-goal-tag",text:`${Ht(t.kind)} ${Math.round(t.confidence*100)}%${i}`}))}return e}function uN(n,e){if(e.length===0)return null;const t=K("div",{className:"stats-report-goal-subsection"});t.append(K("h3",{text:"Player context"}));const i=K("div",{className:"stats-report-table-wrap"}),a=K("table",{className:"stats-report-table"}),s=K("thead"),r=K("tr");["Player","Team","Boost","Leadup avg","Leadup min","Role","Position"].forEach(l=>{r.append(K("th",{text:l}))}),s.append(r);const o=K("tbody");for(const l of e){const c=K("tr");c.append(K("td",{text:ja(n,l.player)}),K("td",{text:zu(l.is_team_0)}),K("td",{text:Vn(l.boost_amount)}),K("td",{text:Vn(l.average_boost_in_leadup)}),K("td",{text:Vn(l.min_boost_in_leadup)}),K("td",{text:l.is_most_back?"Most back":"--"}),K("td",{text:tl(l.position)})),o.append(c)}return a.append(s,o),i.append(a),t.append(i),t}function hN(n,e,t,i,a){const s=a[0]??null,r=i?.scoring_team_is_team_0??s?.scoring_team_is_team_0??null,o=i?.scorer??s?.scorer??null,l=i?.time??s?.time??null,c=i?.frame??s?.frame??null,d=KL(e,l,o),u=K("section",{className:"stats-report-goal-card"});r!==null&&(u.dataset.team=r?"blue":"orange");const h=K("header"),f=K("div",{className:"stats-report-goal-heading"});if(f.append(K("h2",{text:`Goal ${t+1}`}),K("span",{text:`${zu(r)} - ${ja(n,o)} - ${hr(l)}`})),h.append(f),d){if(Dr.onWatchGoal){const m=K("button",{className:"stats-report-goal-watch",text:"Watch"});m.type="button",m.addEventListener("click",()=>{Dr.onWatchGoal?.(d)}),h.append(m)}else if(d.href){const m=K("a",{className:"stats-report-goal-watch",text:"Watch"});m.setAttribute("href",d.href),m.setAttribute("target","_blank"),m.setAttribute("rel","noreferrer"),h.append(m)}}u.append(h),u.append(dN(a));const g=[{label:"Scoring team",value:zu(r)},{label:"Scorer",value:ja(n,o)},{label:"Time",value:hr(l)},{label:"Frame",value:c==null?"--":c.toLocaleString()},{label:"Scorer last touch",value:i?.scorer_last_touch?`${ja(n,i.scorer_last_touch.player)} at ${hr(i.scorer_last_touch.time)}`:"--"},{label:"Scoring most back",value:ja(n,i?.scoring_team_most_back_player)},{label:"Defending most back",value:ja(n,i?.defending_team_most_back_player)},{label:"Ball position",value:tl(i?.ball_position)},{label:"Last touch ball",value:tl(i?.scorer_last_touch?.ball_position)},{label:"Last touch player",value:tl(i?.scorer_last_touch?.player_position)}];u.append(cN(g));const _=uN(n,i?.players??[]);return _&&u.append(_),u}function fN(n,e){const t=K("div",{className:"stats-report-page"});t.append(Ls("Goal metadata","Goal-by-goal scorer, timing, context, tag confidence, and lead-up player state from the stats timeline event stream."));const i=[...n.statsTimeline.events.goal_context??[]].sort((h,f)=>h.time-f.time),a=[...n.statsTimeline.events.goal_tags??[]],s=rN(a),r=oN(i,s),o=[...s.values()].filter(h=>h.length>0).length,l=lN(a),c=l[0];if(t.append(Zl([dn("Goals found",r.length.toLocaleString()),dn("Tagged goals",o.toLocaleString()),dn("Goal tags",a.length.toLocaleString()),dn("Top tag",c?`${c.label} (${c.value})`:"--")])),r.length===0)return t.append(K("section",{className:"stats-report-empty",text:"No goal metadata was emitted for this replay."})),t;const d=K("section",{className:"stats-report-charts"});d.append(Pn("Goal tags by type",l.length>0?Al(l,h=>h.toLocaleString()):K("p",{className:"stats-report-note",text:"No goal tags emitted."})),Pn("Goal timing",Al(r.map(h=>{const f=i[h]??null,g=s.get(h)?.[0]??null,_=f?.time??g?.time??0,m=f?.scoring_team_is_team_0??g?.scoring_team_is_team_0??!0;return{label:`Goal ${h+1}`,value:_,color:m?on[0]:on[1],formatted:hr(_)}}),hr))),t.append(d);const u=K("div",{className:"stats-report-goal-list"});for(const h of r)u.append(hN(e,n.replayUrl,h,i[h]??null,s.get(h)??[]));return t.append(u),t}function pN(n,e){const t=K("div",{className:"stats-report-page"});t.append(Ls("Boost economy","A focused view of boost usage, collection, pad mix, starvation, and waste. Values are shown in normal 0-100 boost units.")),t.append(Zl([_a(n.players,s=>s.boost.amount_used,s=>`${Vn(s)} used`),_a(n.players,s=>s.boost.amount_stolen,s=>`${Vn(s)} stolen`),_a(n.players,s=>s.boost.overfill_total,s=>`${Vn(s)} overfill`),_a(n.players,s=>s.boost.time_zero_boost,s=>`${Ps(s)} at zero`)]));const i=K("section",{className:"stats-report-charts"});i.append(Pn("Boost used per minute",Al(n.players.map((s,r)=>({label:s.name||`Player ${r+1}`,value:s.boost.tracked_time>0?Ca(s.boost.amount_used)/s.boost.tracked_time*60:0,color:a0(s),formatted:r0(s.boost.amount_used,s.boost.tracked_time)})),s=>`${Number(s.toFixed(1))}/min`)),Pn("Pad collection mix",Ss(n.players.map((s,r)=>({label:s.name||`Player ${r+1}`,segments:[{label:"Big",value:s.boost.amount_collected_big,color:Um.big},{label:"Small",value:s.boost.amount_collected_small,color:Um.small}]})),s=>Vn(s))),Pn("Boost tank time",Ss(n.players.map((s,r)=>({label:s.name||`Player ${r+1}`,segments:[{label:"0",value:s.boost.time_zero_boost,color:Vs.zero},{label:"0-25",value:s.boost.time_boost_0_25,color:Vs.low},{label:"25-50",value:s.boost.time_boost_25_50,color:Vs.midLow},{label:"50-75",value:s.boost.time_boost_50_75,color:Vs.midHigh},{label:"75-100",value:s.boost.time_boost_75_100+s.boost.time_hundred_boost,color:Vs.high}]})),jn)));const a=new Map(e.map(s=>[s.id,s]));for(const s of[{statId:"player:boost.amount_used",kind:"bar",title:"Total boost used"},{statId:"player:boost.overfill_total",kind:"bar",title:"Boost overfill"},{statId:"player:boost.amount_stolen",kind:"bar",title:"Stolen boost"}]){const r=a.get(s.statId),o=r?u0(s,r,n):null;o&&i.append(o)}return t.append(i),t.append(mN(n)),t}function mN(n){const e=K("section",{className:"stats-report-section"}),t=K("header");t.append(K("h2",{text:"Boost scorecard"}),K("span",{text:"display units"}));const i=[{label:"Average boost",read(c){return c.boost.tracked_time>0?`${Number(Ca(c.boost.boost_integral/c.boost.tracked_time).toFixed(0))}`:"--"}},{label:"Used per minute",read(c){return r0(c.boost.amount_used,c.boost.tracked_time)}},{label:"Collected",read(c){return Vn(c.boost.amount_collected)}},{label:"Stolen",read(c){return Vn(c.boost.amount_stolen)}},{label:"Overfill",read(c){return Vn(c.boost.overfill_total)}},{label:"Big pads",read(c){return`${c.boost.big_pads_collected}`}},{label:"Small pads",read(c){return`${c.boost.small_pads_collected}`}},{label:"Time at zero",read(c){return jn(c.boost.time_zero_boost,c.boost.tracked_time)}}],a=K("div",{className:"stats-report-table-wrap"}),s=K("table",{className:"stats-report-table"}),r=K("thead"),o=K("tr");o.append(K("th",{text:"Metric"})),n.players.forEach((c,d)=>{o.append(K("th",{text:c.name||`Player ${d+1}`}))}),r.append(o);const l=K("tbody");return i.forEach(c=>{const d=K("tr");d.append(K("td",{text:c.label})),n.players.forEach(u=>{d.append(K("td",{text:c.read(u)}))}),l.append(d)}),s.append(r,l),a.append(s),e.append(t,a),e}function gN(n){const e=K("div",{className:"stats-report-page"});e.append(Ls("Possession & territory","Team control, field-half pressure, and where each player spent time relative to the field and the ball."));const t=n.team_zero.possession.tracked_time,i=n.team_zero.pressure.tracked_time;e.append(Zl([dn("Blue possession",jn(n.team_zero.possession.possession_time,t)),dn("Orange possession",jn(n.team_zero.possession.opponent_possession_time,t)),dn("Blue pressure",jn(n.team_zero.pressure.offensive_half_time,i),"Time in Orange half"),dn("Orange pressure",jn(n.team_zero.pressure.defensive_half_time,i),"Time in Blue half")]));const a=K("section",{className:"stats-report-charts"});return a.append(Pn("Possession split",Lh([{label:"Blue control",value:n.team_zero.possession.possession_time,color:on[0]},{label:"Neutral",value:n.team_zero.possession.neutral_time,color:"#65d6ad"},{label:"Orange control",value:n.team_zero.possession.opponent_possession_time,color:on[1]}],Ps)),d0(n,"Field half pressure"),Pn("Player field thirds",Ss(n.players.map((s,r)=>({label:s.name||`Player ${r+1}`,segments:[{label:"Def",value:s.positioning.time_defensive_third,color:s.is_team_0?on[0]:on[1]},{label:"Mid",value:s.positioning.time_neutral_third,color:"#65d6ad"},{label:"Off",value:s.positioning.time_offensive_third,color:s.is_team_0?on[1]:on[0]}]})),jn)),Pn("Role time",Ss(n.players.map((s,r)=>({label:s.name||`Player ${r+1}`,segments:[{label:"Most back",value:s.positioning.time_most_back,color:"#58a6ff"},{label:"Mid",value:s.positioning.time_mid_role,color:"#65d6ad"},{label:"Most forward",value:s.positioning.time_most_forward,color:"#f39a37"},{label:"Other",value:s.positioning.time_other_role,color:"rgba(255,255,255,0.22)"}]})),jn))),e.append(a),e}function _N(n,e){const t=K("div",{className:"stats-report-page"});t.append(Ls("Player involvement","Interaction stats that are usually easier to trust at a glance: touches, hits, demos, 50/50 outcomes, movement, and powerslide usage."));const i=h0(e,n,$L);i&&t.append(i);const a=K("section",{className:"stats-report-charts"});return a.append(Pn("Speed bands",Ss(n.players.map((s,r)=>({label:s.name||`Player ${r+1}`,segments:[{label:"Slow",value:s.movement.time_slow_speed,color:"#58a6ff"},{label:"Boost",value:s.movement.time_boost_speed,color:"#f2cc60"},{label:"Supersonic",value:s.movement.time_supersonic_speed,color:"#f39a37"}]})),jn)),Pn("Aerial profile",Ss(n.players.map((s,r)=>({label:s.name||`Player ${r+1}`,segments:[{label:"Ground",value:s.movement.time_on_ground,color:"#65d6ad"},{label:"Low air",value:s.movement.time_low_air,color:"#58a6ff"},{label:"High air",value:s.movement.time_high_air,color:"#d2a8ff"}]})),jn))),t.append(a),t.append(K("p",{className:"stats-report-note",text:"Experimental mechanic detectors such as musty flicks, speed flips, dodge refreshes, and ceiling shots are kept in All stats until their precision is stronger."})),t}function vN(n,e){const t=K("div",{className:"stats-report-page"});t.append(Ls("All stats dump","Everything emitted by the current stats timeline, including experimental mechanic counters and low-level breakdowns."));const i=K("nav",{className:"stats-report-jump-nav"});for(const s of n.keys()){const r=K("a",{text:o0(s)});r.setAttribute("href",`#${l0(s)}`),i.append(r)}t.append(i);const a=K("div",{className:"stats-report-grid"});for(const[s,r]of n)a.append(tN(s,r,e));return t.append(a),t}function f0(){const n=window.location.hash.replace(/^#/,"");return t0.some(e=>e.id===n)?n:"overview"}function yN(n,e,t){const i=K("nav",{className:"stats-report-tabs"});return t0.forEach(a=>{const s=K("button",{text:a.label});s.type="button",s.dataset.active=a.id===n?"true":"false",s.addEventListener("click",()=>{f0()!==a.id&&window.history.replaceState(null,"",`#${a.id}`),Cl(e,t)}),i.append(s)}),i}function Nh(n){const e=K("header",{className:"stats-report-header"}),t=K("div",{className:"stats-report-title"});if(t.append(K("h1",{text:"Replay Stats"}),K("p",{text:n??"Load a Rocket League replay to review curated stats pages, comparison graphs, and the complete raw stat dump."})),Dr.showStandaloneActions!==!1){const i=K("div",{className:"stats-report-actions"}),a=K("label",{className:"stats-report-file-label",text:"Load replay"}),s=K("input");s.type="file",s.accept=".replay",s.addEventListener("change",async()=>{const o=s.files?.[0],l=el;o&&l instanceof HTMLElement&&await bN(l,o)}),a.append(s);const r=K("a",{className:"stats-report-link",text:"Open player"});r.setAttribute("href","../"),i.append(a,r),e.append(t,i)}else e.append(t);return e}function Cl(n,e){const t=XL(e.statsTimeline);if(!t){n.replaceChildren(K("main",{className:"stats-report-empty",text:"The replay did not produce any stats frames."}));return}const i=Er(t).filter(QL),a=jL(i),s=f0(),r=K("main",{className:"stats-report"});r.append(Nh()),r.append(yN(s,n,e)),s==="goals"?r.append(fN(e,t)):s==="boost"?r.append(pN(t,i)):s==="territory"?r.append(gN(t)):s==="involvement"?r.append(_N(t,i)):s==="dump"?r.append(vN(a,t)):r.append(sN(e,t,i)),n.replaceChildren(r)}function Ur(n,e){const t=K("main",{className:"stats-report"});t.append(Nh(e)),t.append(K("p",{className:"stats-report-status",text:e})),n.replaceChildren(t)}async function p0(n,e,t,i){Ur(n,`Loading ${t}...`);const a=await kl(e,{onProgress(s){Ur(n,Ms(s))}});Cl(n,{fileName:t,replayUrl:i,statsTimeline:a.statsTimeline})}async function bN(n,e){try{await p0(n,new Uint8Array(await e.arrayBuffer()),e.name,null)}catch(t){Ur(n,t instanceof Error?t.message:String(t))}}async function xN(n,e){try{Ur(n,`Fetching ${e}...`);const t=await fetch(e);if(!t.ok)throw new Error(`Failed to fetch replay: ${t.status} ${t.statusText}`);const i=new URL(e,window.location.href).pathname,a=decodeURIComponent(i.split("/").pop()||"remote replay");await p0(n,new Uint8Array(await t.arrayBuffer()),a,t.url?new URL(t.url):new URL(e,window.location.href))}catch(t){Ur(n,t instanceof Error?t.message:String(t))}}function wN(n,e={}){if(el=n,Dr=e,e.initialData)Cl(n,e.initialData);else{const i=K("main",{className:"stats-report"});i.append(Nh()),i.append(K("section",{className:"stats-report-empty",text:"Load a replay to generate the stats report."})),n.replaceChildren(i)}const t=new URL(window.location.href).searchParams.get("replayUrl");return!e.initialData&&t&&xN(n,t),{root:n,render(i){Cl(n,i)},destroy(){el===n&&(el=null,Dr={}),n.replaceChildren()}}}const Lo="replay-review-document",Fm="replay-review-root";function _n(n,e={}){const t=document.createElement(n);return e.className&&(t.className=e.className),e.id&&(t.id=e.id),e.text!==void 0&&(t.textContent=e.text),t}function m0(n,e={}){let t=null;const i=async()=>n instanceof Uint8Array?n:await n(),a=s=>(t||(t=i().then(r=>kl(r,{reportEveryNFrames:100,onProgress:s}))),t);return{replayName:e.replayName,replayUrl:e.replayUrl??null,async getStatsTimeline(s){return(await a(s)).statsTimeline},getReplayBundle:a}}function SN(n=window.location){const e=H_(n.search,n.href);return e?m0(async()=>{const t=await fetch(e.url,e.fetchInit);if(!t.ok){const i=t.statusText?` ${t.statusText}`:"";throw new Error(`Failed to fetch replay: ${t.status}${i}`)}return new Uint8Array(await t.arrayBuffer())},{replayName:e.name,replayUrl:e.url}):null}function EN(n){return n||(new URL(window.location.href).searchParams.get("mode")==="viewer"?"viewer":"report")}function MN(n){const e=new URL(window.location.href);n==="report"?e.searchParams.delete("mode"):e.searchParams.set("mode",n),window.history.replaceState(null,"",e)}function TN(n,e={}){document.documentElement.classList.add(Lo),document.body.classList.add(Lo),n.classList.add(Fm);let t=e.provider??null,i=EN(e.initialMode),a=null,s=null,r=null,o=null,l=null,c=!1;const d=_n("main",{className:"replay-review-shell"}),u=_n("div",{className:"replay-review-toolbar"}),h=_n("div",{className:"replay-review-status"}),f=_n("button",{text:"Stats"}),g=_n("button",{text:"Viewer"}),_=_n("label",{className:"replay-review-file",text:"Load replay"}),m=_n("input"),p=_n("section",{className:"replay-review-pane"}),S=_n("section",{className:"replay-review-pane"});m.type="file",m.accept=".replay",_.append(m),u.append(h,_,f,g),d.append(u,p,S),n.replaceChildren(d);const x=I=>{h.textContent=I},y=I=>{x(Ms(I))},C=()=>{a?.destroy(),a=null,s?.destroy(),s=null,r=null,o=null,l=null},M=()=>t?.getReplayBundle?(o||(o=t.getReplayBundle(y)),o):null,T=()=>t?(r||(r=t.getStatsTimeline?t.getStatsTimeline(y):M()?.then(I=>I.statsTimeline)??null),r):null,A=()=>{p.replaceChildren(_n("section",{className:"replay-review-empty",text:"Load a replay to review stats and playback."}))},v=async()=>{if(a)return;const I=T();if(!I){A(),x("No replay loaded");return}p.replaceChildren(_n("section",{className:"replay-review-empty",text:"Loading stats..."}));const O={fileName:t?.replayName??"replay",replayUrl:t?.replayUrl??null,statsTimeline:await I};c||(a=wN(p,{initialData:O,showStandaloneActions:!1,onWatchGoal(H){l=H.config,s?.destroy(),s=null,i="viewer",R()}}),x(`Loaded ${O.fileName}`))},b=async()=>{if(s)return;const I=M();if(!I){S.replaceChildren(_n("section",{className:"replay-review-empty",text:"Replay playback is not available for this data source."})),x("Viewer unavailable");return}S.replaceChildren(_n("section",{className:"replay-review-empty",text:"Loading viewer..."}));const O=await I;c||(s=GL(S,{initialBundle:O,initialConfig:l,initialReplayName:t?.replayName,loadFromLocation:!1}),l=null,x(`Loaded ${t?.replayName??"replay"}`))},R=()=>{f.dataset.active=String(i==="report"),g.dataset.active=String(i==="viewer"),p.hidden=i!=="report",S.hidden=i!=="viewer",MN(i),(i==="report"?v():b()).catch(I=>{console.error("Failed to render replay review mode:",I),x(I instanceof Error?I.message:"Failed to load replay review")})};return f.addEventListener("click",()=>{i="report",R()}),g.addEventListener("click",()=>{i="viewer",R()}),m.addEventListener("change",()=>{const I=m.files?.[0];I&&(t=m0(async()=>new Uint8Array(await I.arrayBuffer()),{replayName:I.name,replayUrl:null}),C(),R())}),R(),{root:n,setMode(I){i=I,R()},setProvider(I,O={}){t=I,O.mode&&(i=O.mode),C(),R()},destroy(){c=!0,C(),n.classList.remove(Fm),document.documentElement.classList.remove(Lo),document.body.classList.remove(Lo),n.replaceChildren()}}}const g0=document.querySelector("#app");if(!(g0 instanceof HTMLElement))throw new Error("Missing #app mount element");let _0=null;try{_0=SN(window.location)}catch(n){console.error("Invalid replay URL:",n)}TN(g0,{provider:_0});
