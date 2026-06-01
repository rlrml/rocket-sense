(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function n(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(a){if(a.ep)return;a.ep=!0;const s=n(a);fetch(a.href,s)}})();const fp="180",hs={ROTATE:0,DOLLY:1,PAN:2},ls={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},zx=0,dh=1,Hx=2,dv=1,Vx=2,gi=3,Yi=0,on=1,Qe=2,Bi=0,ms=1,zi=2,fh=3,ph=4,Gx=5,_a=100,$x=101,Wx=102,Xx=103,qx=104,Yx=200,Kx=201,jx=202,Zx=203,hd=204,md=205,Jx=206,Qx=207,eS=208,tS=209,nS=210,iS=211,aS=212,sS=213,rS=214,_d=0,gd=1,vd=2,Rs=3,yd=4,bd=5,xd=6,Sd=7,xc=0,oS=1,lS=2,Hi=0,cS=1,uS=2,dS=3,fS=4,pS=5,hS=6,mS=7,fv=300,Ps=301,Ls=302,wd=303,Ed=304,Sc=306,Md=1e3,ya=1001,Td=1002,Vn=1003,_S=1004,_o=1005,Jn=1006,Wc=1007,ba=1008,si=1009,pv=1010,hv=1011,Ur=1012,pp=1013,Aa=1014,bi=1015,oo=1016,hp=1017,mp=1018,Br=1020,mv=35902,_v=35899,gv=1021,vv=1022,Bn=1023,zr=1026,Hr=1027,yv=1028,_p=1029,bv=1030,gp=1031,vp=1033,vl=33776,yl=33777,bl=33778,xl=33779,Ad=35840,Cd=35841,Rd=35842,Pd=35843,Ld=36196,Nd=37492,Id=37496,Dd=37808,kd=37809,Fd=37810,Od=37811,Ud=37812,Bd=37813,zd=37814,Hd=37815,Vd=37816,Gd=37817,$d=37818,Wd=37819,Xd=37820,qd=37821,Yd=36492,Kd=36494,jd=36495,Zd=36283,Jd=36284,Qd=36285,ef=36286,gS=3200,vS=3201,yp=0,yS=1,Oi="",Wt="srgb",Ns="srgb-linear",Wl="linear",ct="srgb",Ua=7680,hh=519,bS=512,xS=513,SS=514,xv=515,wS=516,ES=517,MS=518,TS=519,tf=35044,mh="300 es",Qn=2e3,Xl=2001;class Ia{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(n)===-1&&i[e].push(n)}hasEventListener(e,n){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(n)!==-1}removeEventListener(e,n){const i=this._listeners;if(i===void 0)return;const a=i[e];if(a!==void 0){const s=a.indexOf(n);s!==-1&&a.splice(s,1)}}dispatchEvent(e){const n=this._listeners;if(n===void 0)return;const i=n[e.type];if(i!==void 0){e.target=this;const a=i.slice(0);for(let s=0,r=a.length;s<r;s++)a[s].call(this,e);e.target=null}}}const Vt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let _h=1234567;const wr=Math.PI/180,Vr=180/Math.PI;function ei(){const t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Vt[t&255]+Vt[t>>8&255]+Vt[t>>16&255]+Vt[t>>24&255]+"-"+Vt[e&255]+Vt[e>>8&255]+"-"+Vt[e>>16&15|64]+Vt[e>>24&255]+"-"+Vt[n&63|128]+Vt[n>>8&255]+"-"+Vt[n>>16&255]+Vt[n>>24&255]+Vt[i&255]+Vt[i>>8&255]+Vt[i>>16&255]+Vt[i>>24&255]).toLowerCase()}function Ye(t,e,n){return Math.max(e,Math.min(n,t))}function bp(t,e){return(t%e+e)%e}function AS(t,e,n,i,a){return i+(t-e)*(a-i)/(n-e)}function CS(t,e,n){return t!==e?(n-t)/(e-t):0}function Er(t,e,n){return(1-n)*t+n*e}function RS(t,e,n,i){return Er(t,e,1-Math.exp(-n*i))}function PS(t,e=1){return e-Math.abs(bp(t,e*2)-e)}function LS(t,e,n){return t<=e?0:t>=n?1:(t=(t-e)/(n-e),t*t*(3-2*t))}function NS(t,e,n){return t<=e?0:t>=n?1:(t=(t-e)/(n-e),t*t*t*(t*(t*6-15)+10))}function IS(t,e){return t+Math.floor(Math.random()*(e-t+1))}function DS(t,e){return t+Math.random()*(e-t)}function kS(t){return t*(.5-Math.random())}function FS(t){t!==void 0&&(_h=t);let e=_h+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function OS(t){return t*wr}function US(t){return t*Vr}function BS(t){return(t&t-1)===0&&t!==0}function zS(t){return Math.pow(2,Math.ceil(Math.log(t)/Math.LN2))}function HS(t){return Math.pow(2,Math.floor(Math.log(t)/Math.LN2))}function VS(t,e,n,i,a){const s=Math.cos,r=Math.sin,o=s(n/2),l=r(n/2),c=s((e+i)/2),u=r((e+i)/2),d=s((e-i)/2),f=r((e-i)/2),p=s((i-e)/2),_=r((i-e)/2);switch(a){case"XYX":t.set(o*u,l*d,l*f,o*c);break;case"YZY":t.set(l*f,o*u,l*d,o*c);break;case"ZXZ":t.set(l*d,l*f,o*u,o*c);break;case"XZX":t.set(o*u,l*_,l*p,o*c);break;case"YXY":t.set(l*p,o*u,l*_,o*c);break;case"ZYZ":t.set(l*_,l*p,o*u,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+a)}}function Un(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return t/4294967295;case Uint16Array:return t/65535;case Uint8Array:return t/255;case Int32Array:return Math.max(t/2147483647,-1);case Int16Array:return Math.max(t/32767,-1);case Int8Array:return Math.max(t/127,-1);default:throw new Error("Invalid component type.")}}function at(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return Math.round(t*4294967295);case Uint16Array:return Math.round(t*65535);case Uint8Array:return Math.round(t*255);case Int32Array:return Math.round(t*2147483647);case Int16Array:return Math.round(t*32767);case Int8Array:return Math.round(t*127);default:throw new Error("Invalid component type.")}}const ht={DEG2RAD:wr,RAD2DEG:Vr,generateUUID:ei,clamp:Ye,euclideanModulo:bp,mapLinear:AS,inverseLerp:CS,lerp:Er,damp:RS,pingpong:PS,smoothstep:LS,smootherstep:NS,randInt:IS,randFloat:DS,randFloatSpread:kS,seededRandom:FS,degToRad:OS,radToDeg:US,isPowerOfTwo:BS,ceilPowerOfTwo:zS,floorPowerOfTwo:HS,setQuaternionFromProperEuler:VS,normalize:at,denormalize:Un};class ce{constructor(e=0,n=0){ce.prototype.isVector2=!0,this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,i=this.y,a=e.elements;return this.x=a[0]*n+a[3]*i+a[6],this.y=a[1]*n+a[4]*i+a[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=Ye(this.x,e.x,n.x),this.y=Ye(this.y,e.y,n.y),this}clampScalar(e,n){return this.x=Ye(this.x,e,n),this.y=Ye(this.y,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ye(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(Ye(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y;return n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const i=Math.cos(n),a=Math.sin(n),s=this.x-e.x,r=this.y-e.y;return this.x=s*i-r*a+e.x,this.y=s*a+r*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ri{constructor(e=0,n=0,i=0,a=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=i,this._w=a}static slerpFlat(e,n,i,a,s,r,o){let l=i[a+0],c=i[a+1],u=i[a+2],d=i[a+3];const f=s[r+0],p=s[r+1],_=s[r+2],g=s[r+3];if(o===0){e[n+0]=l,e[n+1]=c,e[n+2]=u,e[n+3]=d;return}if(o===1){e[n+0]=f,e[n+1]=p,e[n+2]=_,e[n+3]=g;return}if(d!==g||l!==f||c!==p||u!==_){let m=1-o;const h=l*f+c*p+u*_+d*g,b=h>=0?1:-1,S=1-h*h;if(S>Number.EPSILON){const C=Math.sqrt(S),M=Math.atan2(C,h*b);m=Math.sin(m*M)/C,o=Math.sin(o*M)/C}const y=o*b;if(l=l*m+f*y,c=c*m+p*y,u=u*m+_*y,d=d*m+g*y,m===1-o){const C=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=C,c*=C,u*=C,d*=C}}e[n]=l,e[n+1]=c,e[n+2]=u,e[n+3]=d}static multiplyQuaternionsFlat(e,n,i,a,s,r){const o=i[a],l=i[a+1],c=i[a+2],u=i[a+3],d=s[r],f=s[r+1],p=s[r+2],_=s[r+3];return e[n]=o*_+u*d+l*p-c*f,e[n+1]=l*_+u*f+c*d-o*p,e[n+2]=c*_+u*p+o*f-l*d,e[n+3]=u*_-o*d-l*f-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,i,a){return this._x=e,this._y=n,this._z=i,this._w=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const i=e._x,a=e._y,s=e._z,r=e._order,o=Math.cos,l=Math.sin,c=o(i/2),u=o(a/2),d=o(s/2),f=l(i/2),p=l(a/2),_=l(s/2);switch(r){case"XYZ":this._x=f*u*d+c*p*_,this._y=c*p*d-f*u*_,this._z=c*u*_+f*p*d,this._w=c*u*d-f*p*_;break;case"YXZ":this._x=f*u*d+c*p*_,this._y=c*p*d-f*u*_,this._z=c*u*_-f*p*d,this._w=c*u*d+f*p*_;break;case"ZXY":this._x=f*u*d-c*p*_,this._y=c*p*d+f*u*_,this._z=c*u*_+f*p*d,this._w=c*u*d-f*p*_;break;case"ZYX":this._x=f*u*d-c*p*_,this._y=c*p*d+f*u*_,this._z=c*u*_-f*p*d,this._w=c*u*d+f*p*_;break;case"YZX":this._x=f*u*d+c*p*_,this._y=c*p*d+f*u*_,this._z=c*u*_-f*p*d,this._w=c*u*d-f*p*_;break;case"XZY":this._x=f*u*d-c*p*_,this._y=c*p*d-f*u*_,this._z=c*u*_+f*p*d,this._w=c*u*d+f*p*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+r)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const i=n/2,a=Math.sin(i);return this._x=e.x*a,this._y=e.y*a,this._z=e.z*a,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,i=n[0],a=n[4],s=n[8],r=n[1],o=n[5],l=n[9],c=n[2],u=n[6],d=n[10],f=i+o+d;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(u-l)*p,this._y=(s-c)*p,this._z=(r-a)*p}else if(i>o&&i>d){const p=2*Math.sqrt(1+i-o-d);this._w=(u-l)/p,this._x=.25*p,this._y=(a+r)/p,this._z=(s+c)/p}else if(o>d){const p=2*Math.sqrt(1+o-i-d);this._w=(s-c)/p,this._x=(a+r)/p,this._y=.25*p,this._z=(l+u)/p}else{const p=2*Math.sqrt(1+d-i-o);this._w=(r-a)/p,this._x=(s+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let i=e.dot(n)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ye(this.dot(e),-1,1)))}rotateTowards(e,n){const i=this.angleTo(e);if(i===0)return this;const a=Math.min(1,n/i);return this.slerp(e,a),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const i=e._x,a=e._y,s=e._z,r=e._w,o=n._x,l=n._y,c=n._z,u=n._w;return this._x=i*u+r*o+a*c-s*l,this._y=a*u+r*l+s*o-i*c,this._z=s*u+r*c+i*l-a*o,this._w=r*u-i*o-a*l-s*c,this._onChangeCallback(),this}slerp(e,n){if(n===0)return this;if(n===1)return this.copy(e);const i=this._x,a=this._y,s=this._z,r=this._w;let o=r*e._w+i*e._x+a*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=r,this._x=i,this._y=a,this._z=s,this;const l=1-o*o;if(l<=Number.EPSILON){const p=1-n;return this._w=p*r+n*this._w,this._x=p*i+n*this._x,this._y=p*a+n*this._y,this._z=p*s+n*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,o),d=Math.sin((1-n)*u)/c,f=Math.sin(n*u)/c;return this._w=r*d+this._w*f,this._x=i*d+this._x*f,this._y=a*d+this._y*f,this._z=s*d+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,n,i){return this.copy(e).slerp(n,i)}random(){const e=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),a=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(a*Math.sin(e),a*Math.cos(e),s*Math.sin(n),s*Math.cos(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class L{constructor(e=0,n=0,i=0){L.prototype.isVector3=!0,this.x=e,this.y=n,this.z=i}set(e,n,i){return i===void 0&&(i=this.z),this.x=e,this.y=n,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(gh.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(gh.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,i=this.y,a=this.z,s=e.elements;return this.x=s[0]*n+s[3]*i+s[6]*a,this.y=s[1]*n+s[4]*i+s[7]*a,this.z=s[2]*n+s[5]*i+s[8]*a,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,i=this.y,a=this.z,s=e.elements,r=1/(s[3]*n+s[7]*i+s[11]*a+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*a+s[12])*r,this.y=(s[1]*n+s[5]*i+s[9]*a+s[13])*r,this.z=(s[2]*n+s[6]*i+s[10]*a+s[14])*r,this}applyQuaternion(e){const n=this.x,i=this.y,a=this.z,s=e.x,r=e.y,o=e.z,l=e.w,c=2*(r*a-o*i),u=2*(o*n-s*a),d=2*(s*i-r*n);return this.x=n+l*c+r*d-o*u,this.y=i+l*u+o*c-s*d,this.z=a+l*d+s*u-r*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,i=this.y,a=this.z,s=e.elements;return this.x=s[0]*n+s[4]*i+s[8]*a,this.y=s[1]*n+s[5]*i+s[9]*a,this.z=s[2]*n+s[6]*i+s[10]*a,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=Ye(this.x,e.x,n.x),this.y=Ye(this.y,e.y,n.y),this.z=Ye(this.z,e.z,n.z),this}clampScalar(e,n){return this.x=Ye(this.x,e,n),this.y=Ye(this.y,e,n),this.z=Ye(this.z,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ye(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const i=e.x,a=e.y,s=e.z,r=n.x,o=n.y,l=n.z;return this.x=a*l-s*o,this.y=s*r-i*l,this.z=i*o-a*r,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const i=e.dot(this)/n;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Xc.copy(this).projectOnVector(e),this.sub(Xc)}reflect(e){return this.sub(Xc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(Ye(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y,a=this.z-e.z;return n*n+i*i+a*a}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,i){const a=Math.sin(n)*e;return this.x=a*Math.sin(i),this.y=Math.cos(n)*e,this.z=a*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,i){return this.x=e*Math.sin(n),this.y=i,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),a=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=i,this.z=a,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(e),this.y=n,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Xc=new L,gh=new ri;class We{constructor(e,n,i,a,s,r,o,l,c){We.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,i,a,s,r,o,l,c)}set(e,n,i,a,s,r,o,l,c){const u=this.elements;return u[0]=e,u[1]=a,u[2]=o,u[3]=n,u[4]=s,u[5]=l,u[6]=i,u[7]=r,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(e,n,i){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,a=n.elements,s=this.elements,r=i[0],o=i[3],l=i[6],c=i[1],u=i[4],d=i[7],f=i[2],p=i[5],_=i[8],g=a[0],m=a[3],h=a[6],b=a[1],S=a[4],y=a[7],C=a[2],M=a[5],T=a[8];return s[0]=r*g+o*b+l*C,s[3]=r*m+o*S+l*M,s[6]=r*h+o*y+l*T,s[1]=c*g+u*b+d*C,s[4]=c*m+u*S+d*M,s[7]=c*h+u*y+d*T,s[2]=f*g+p*b+_*C,s[5]=f*m+p*S+_*M,s[8]=f*h+p*y+_*T,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[1],a=e[2],s=e[3],r=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return n*r*u-n*o*c-i*s*u+i*o*l+a*s*c-a*r*l}invert(){const e=this.elements,n=e[0],i=e[1],a=e[2],s=e[3],r=e[4],o=e[5],l=e[6],c=e[7],u=e[8],d=u*r-o*c,f=o*l-u*s,p=c*s-r*l,_=n*d+i*f+a*p;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/_;return e[0]=d*g,e[1]=(a*c-u*i)*g,e[2]=(o*i-a*r)*g,e[3]=f*g,e[4]=(u*n-a*l)*g,e[5]=(a*s-o*n)*g,e[6]=p*g,e[7]=(i*l-c*n)*g,e[8]=(r*n-i*s)*g,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,i,a,s,r,o){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*r+c*o)+r+e,-a*c,a*l,-a*(-c*r+l*o)+o+n,0,0,1),this}scale(e,n){return this.premultiply(qc.makeScale(e,n)),this}rotate(e){return this.premultiply(qc.makeRotation(-e)),this}translate(e,n){return this.premultiply(qc.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,i=e.elements;for(let a=0;a<9;a++)if(n[a]!==i[a])return!1;return!0}fromArray(e,n=0){for(let i=0;i<9;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const qc=new We;function Sv(t){for(let e=t.length-1;e>=0;--e)if(t[e]>=65535)return!0;return!1}function ql(t){return document.createElementNS("http://www.w3.org/1999/xhtml",t)}function GS(){const t=ql("canvas");return t.style.display="block",t}const vh={};function Gr(t){t in vh||(vh[t]=!0,console.warn(t))}function $S(t,e,n){return new Promise(function(i,a){function s(){switch(t.clientWaitSync(e,t.SYNC_FLUSH_COMMANDS_BIT,0)){case t.WAIT_FAILED:a();break;case t.TIMEOUT_EXPIRED:setTimeout(s,n);break;default:i()}}setTimeout(s,n)})}const yh=new We().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),bh=new We().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function WS(){const t={enabled:!0,workingColorSpace:Ns,spaces:{},convert:function(a,s,r){return this.enabled===!1||s===r||!s||!r||(this.spaces[s].transfer===ct&&(a.r=Si(a.r),a.g=Si(a.g),a.b=Si(a.b)),this.spaces[s].primaries!==this.spaces[r].primaries&&(a.applyMatrix3(this.spaces[s].toXYZ),a.applyMatrix3(this.spaces[r].fromXYZ)),this.spaces[r].transfer===ct&&(a.r=_s(a.r),a.g=_s(a.g),a.b=_s(a.b))),a},workingToColorSpace:function(a,s){return this.convert(a,this.workingColorSpace,s)},colorSpaceToWorking:function(a,s){return this.convert(a,s,this.workingColorSpace)},getPrimaries:function(a){return this.spaces[a].primaries},getTransfer:function(a){return a===Oi?Wl:this.spaces[a].transfer},getToneMappingMode:function(a){return this.spaces[a].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(a,s=this.workingColorSpace){return a.fromArray(this.spaces[s].luminanceCoefficients)},define:function(a){Object.assign(this.spaces,a)},_getMatrix:function(a,s,r){return a.copy(this.spaces[s].toXYZ).multiply(this.spaces[r].fromXYZ)},_getDrawingBufferColorSpace:function(a){return this.spaces[a].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(a=this.workingColorSpace){return this.spaces[a].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(a,s){return Gr("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),t.workingToColorSpace(a,s)},toWorkingColorSpace:function(a,s){return Gr("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),t.colorSpaceToWorking(a,s)}},e=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],i=[.3127,.329];return t.define({[Ns]:{primaries:e,whitePoint:i,transfer:Wl,toXYZ:yh,fromXYZ:bh,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Wt},outputColorSpaceConfig:{drawingBufferColorSpace:Wt}},[Wt]:{primaries:e,whitePoint:i,transfer:ct,toXYZ:yh,fromXYZ:bh,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Wt}}}),t}const tt=WS();function Si(t){return t<.04045?t*.0773993808:Math.pow(t*.9478672986+.0521327014,2.4)}function _s(t){return t<.0031308?t*12.92:1.055*Math.pow(t,.41666)-.055}let Ba;class XS{static getDataURL(e,n="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Ba===void 0&&(Ba=ql("canvas")),Ba.width=e.width,Ba.height=e.height;const a=Ba.getContext("2d");e instanceof ImageData?a.putImageData(e,0,0):a.drawImage(e,0,0,e.width,e.height),i=Ba}return i.toDataURL(n)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=ql("canvas");n.width=e.width,n.height=e.height;const i=n.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const a=i.getImageData(0,0,e.width,e.height),s=a.data;for(let r=0;r<s.length;r++)s[r]=Si(s[r]/255)*255;return i.putImageData(a,0,0),n}else if(e.data){const n=e.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(Si(n[i]/255)*255):n[i]=Si(n[i]);return{data:n,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let qS=0;class xp{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:qS++}),this.uuid=ei(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const n=this.data;return typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement?e.set(n.videoWidth,n.videoHeight,0):n instanceof VideoFrame?e.set(n.displayHeight,n.displayWidth,0):n!==null?e.set(n.width,n.height,n.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},a=this.data;if(a!==null){let s;if(Array.isArray(a)){s=[];for(let r=0,o=a.length;r<o;r++)a[r].isDataTexture?s.push(Yc(a[r].image)):s.push(Yc(a[r]))}else s=Yc(a);i.url=s}return n||(e.images[this.uuid]=i),i}}function Yc(t){return typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap?XS.getDataURL(t):t.data?{data:Array.from(t.data),width:t.width,height:t.height,type:t.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let YS=0;const Kc=new L;class jt extends Ia{constructor(e=jt.DEFAULT_IMAGE,n=jt.DEFAULT_MAPPING,i=ya,a=ya,s=Jn,r=ba,o=Bn,l=si,c=jt.DEFAULT_ANISOTROPY,u=Oi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:YS++}),this.uuid=ei(),this.name="",this.source=new xp(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=a,this.magFilter=s,this.minFilter=r,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ce(0,0),this.repeat=new ce(1,1),this.center=new ce(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new We,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Kc).x}get height(){return this.source.getSize(Kc).y}get depth(){return this.source.getSize(Kc).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const n in e){const i=e[n];if(i===void 0){console.warn(`THREE.Texture.setValues(): parameter '${n}' has value of undefined.`);continue}const a=this[n];if(a===void 0){console.warn(`THREE.Texture.setValues(): property '${n}' does not exist.`);continue}a&&i&&a.isVector2&&i.isVector2||a&&i&&a.isVector3&&i.isVector3||a&&i&&a.isMatrix3&&i.isMatrix3?a.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==fv)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Md:e.x=e.x-Math.floor(e.x);break;case ya:e.x=e.x<0?0:1;break;case Td:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Md:e.y=e.y-Math.floor(e.y);break;case ya:e.y=e.y<0?0:1;break;case Td:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}jt.DEFAULT_IMAGE=null;jt.DEFAULT_MAPPING=fv;jt.DEFAULT_ANISOTROPY=1;class Mt{constructor(e=0,n=0,i=0,a=1){Mt.prototype.isVector4=!0,this.x=e,this.y=n,this.z=i,this.w=a}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,i,a){return this.x=e,this.y=n,this.z=i,this.w=a,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,i=this.y,a=this.z,s=this.w,r=e.elements;return this.x=r[0]*n+r[4]*i+r[8]*a+r[12]*s,this.y=r[1]*n+r[5]*i+r[9]*a+r[13]*s,this.z=r[2]*n+r[6]*i+r[10]*a+r[14]*s,this.w=r[3]*n+r[7]*i+r[11]*a+r[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,i,a,s;const l=e.elements,c=l[0],u=l[4],d=l[8],f=l[1],p=l[5],_=l[9],g=l[2],m=l[6],h=l[10];if(Math.abs(u-f)<.01&&Math.abs(d-g)<.01&&Math.abs(_-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(d+g)<.1&&Math.abs(_+m)<.1&&Math.abs(c+p+h-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const S=(c+1)/2,y=(p+1)/2,C=(h+1)/2,M=(u+f)/4,T=(d+g)/4,A=(_+m)/4;return S>y&&S>C?S<.01?(i=0,a=.707106781,s=.707106781):(i=Math.sqrt(S),a=M/i,s=T/i):y>C?y<.01?(i=.707106781,a=0,s=.707106781):(a=Math.sqrt(y),i=M/a,s=A/a):C<.01?(i=.707106781,a=.707106781,s=0):(s=Math.sqrt(C),i=T/s,a=A/s),this.set(i,a,s,n),this}let b=Math.sqrt((m-_)*(m-_)+(d-g)*(d-g)+(f-u)*(f-u));return Math.abs(b)<.001&&(b=1),this.x=(m-_)/b,this.y=(d-g)/b,this.z=(f-u)/b,this.w=Math.acos((c+p+h-1)/2),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=Ye(this.x,e.x,n.x),this.y=Ye(this.y,e.y,n.y),this.z=Ye(this.z,e.z,n.z),this.w=Ye(this.w,e.w,n.w),this}clampScalar(e,n){return this.x=Ye(this.x,e,n),this.y=Ye(this.y,e,n),this.z=Ye(this.z,e,n),this.w=Ye(this.w,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ye(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this.w=e.w+(n.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class KS extends Ia{constructor(e=1,n=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Jn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=i.depth,this.scissor=new Mt(0,0,e,n),this.scissorTest=!1,this.viewport=new Mt(0,0,e,n);const a={width:e,height:n,depth:i.depth},s=new jt(a);this.textures=[];const r=i.count;for(let o=0;o<r;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){const n={minFilter:Jn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(n.mapping=e.mapping),e.wrapS!==void 0&&(n.wrapS=e.wrapS),e.wrapT!==void 0&&(n.wrapT=e.wrapT),e.wrapR!==void 0&&(n.wrapR=e.wrapR),e.magFilter!==void 0&&(n.magFilter=e.magFilter),e.minFilter!==void 0&&(n.minFilter=e.minFilter),e.format!==void 0&&(n.format=e.format),e.type!==void 0&&(n.type=e.type),e.anisotropy!==void 0&&(n.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(n.colorSpace=e.colorSpace),e.flipY!==void 0&&(n.flipY=e.flipY),e.generateMipmaps!==void 0&&(n.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(n.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(n)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,n,i=1){if(this.width!==e||this.height!==n||this.depth!==i){this.width=e,this.height=n,this.depth=i;for(let a=0,s=this.textures.length;a<s;a++)this.textures[a].image.width=e,this.textures[a].image.height=n,this.textures[a].image.depth=i,this.textures[a].isArrayTexture=this.textures[a].image.depth>1;this.dispose()}this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++){this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const a=Object.assign({},e.textures[n].image);this.textures[n].source=new xp(a)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ca extends KS{constructor(e=1,n=1,i={}){super(e,n,i),this.isWebGLRenderTarget=!0}}class wv extends jt{constructor(e=null,n=1,i=1,a=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:a},this.magFilter=Vn,this.minFilter=Vn,this.wrapR=ya,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class jS extends jt{constructor(e=null,n=1,i=1,a=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:a},this.magFilter=Vn,this.minFilter=Vn,this.wrapR=ya,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class lo{constructor(e=new L(1/0,1/0,1/0),n=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n+=3)this.expandByPoint(Cn.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,i=e.count;n<i;n++)this.expandByPoint(Cn.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const i=Cn.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(n===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let r=0,o=s.count;r<o;r++)e.isMesh===!0?e.getVertexPosition(r,Cn):Cn.fromBufferAttribute(s,r),Cn.applyMatrix4(e.matrixWorld),this.expandByPoint(Cn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),go.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),go.copy(i.boundingBox)),go.applyMatrix4(e.matrixWorld),this.union(go)}const a=e.children;for(let s=0,r=a.length;s<r;s++)this.expandByObject(a[s],n);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Cn),Cn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,i;return e.normal.x>0?(n=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),n<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(er),vo.subVectors(this.max,er),za.subVectors(e.a,er),Ha.subVectors(e.b,er),Va.subVectors(e.c,er),Ai.subVectors(Ha,za),Ci.subVectors(Va,Ha),aa.subVectors(za,Va);let n=[0,-Ai.z,Ai.y,0,-Ci.z,Ci.y,0,-aa.z,aa.y,Ai.z,0,-Ai.x,Ci.z,0,-Ci.x,aa.z,0,-aa.x,-Ai.y,Ai.x,0,-Ci.y,Ci.x,0,-aa.y,aa.x,0];return!jc(n,za,Ha,Va,vo)||(n=[1,0,0,0,1,0,0,0,1],!jc(n,za,Ha,Va,vo))?!1:(yo.crossVectors(Ai,Ci),n=[yo.x,yo.y,yo.z],jc(n,za,Ha,Va,vo))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Cn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Cn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(di[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),di[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),di[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),di[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),di[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),di[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),di[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),di[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(di),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const di=[new L,new L,new L,new L,new L,new L,new L,new L],Cn=new L,go=new lo,za=new L,Ha=new L,Va=new L,Ai=new L,Ci=new L,aa=new L,er=new L,vo=new L,yo=new L,sa=new L;function jc(t,e,n,i,a){for(let s=0,r=t.length-3;s<=r;s+=3){sa.fromArray(t,s);const o=a.x*Math.abs(sa.x)+a.y*Math.abs(sa.y)+a.z*Math.abs(sa.z),l=e.dot(sa),c=n.dot(sa),u=i.dot(sa);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const ZS=new lo,tr=new L,Zc=new L;class wc{constructor(e=new L,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const i=this.center;n!==void 0?i.copy(n):ZS.setFromPoints(e).getCenter(i);let a=0;for(let s=0,r=e.length;s<r;s++)a=Math.max(a,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(a),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const i=this.center.distanceToSquared(e);return n.copy(e),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;tr.subVectors(e,this.center);const n=tr.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),a=(i-this.radius)*.5;this.center.addScaledVector(tr,a/i),this.radius+=a}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Zc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(tr.copy(e.center).add(Zc)),this.expandByPoint(tr.copy(e.center).sub(Zc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const fi=new L,Jc=new L,bo=new L,Ri=new L,Qc=new L,xo=new L,eu=new L;class Sp{constructor(e=new L,n=new L(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,fi)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=fi.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(fi.copy(this.origin).addScaledVector(this.direction,n),fi.distanceToSquared(e))}distanceSqToSegment(e,n,i,a){Jc.copy(e).add(n).multiplyScalar(.5),bo.copy(n).sub(e).normalize(),Ri.copy(this.origin).sub(Jc);const s=e.distanceTo(n)*.5,r=-this.direction.dot(bo),o=Ri.dot(this.direction),l=-Ri.dot(bo),c=Ri.lengthSq(),u=Math.abs(1-r*r);let d,f,p,_;if(u>0)if(d=r*l-o,f=r*o-l,_=s*u,d>=0)if(f>=-_)if(f<=_){const g=1/u;d*=g,f*=g,p=d*(d+r*f+2*o)+f*(r*d+f+2*l)+c}else f=s,d=Math.max(0,-(r*f+o)),p=-d*d+f*(f+2*l)+c;else f=-s,d=Math.max(0,-(r*f+o)),p=-d*d+f*(f+2*l)+c;else f<=-_?(d=Math.max(0,-(-r*s+o)),f=d>0?-s:Math.min(Math.max(-s,-l),s),p=-d*d+f*(f+2*l)+c):f<=_?(d=0,f=Math.min(Math.max(-s,-l),s),p=f*(f+2*l)+c):(d=Math.max(0,-(r*s+o)),f=d>0?s:Math.min(Math.max(-s,-l),s),p=-d*d+f*(f+2*l)+c);else f=r>0?-s:s,d=Math.max(0,-(r*f+o)),p=-d*d+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),a&&a.copy(Jc).addScaledVector(bo,f),p}intersectSphere(e,n){fi.subVectors(e.center,this.origin);const i=fi.dot(this.direction),a=fi.dot(fi)-i*i,s=e.radius*e.radius;if(a>s)return null;const r=Math.sqrt(s-a),o=i-r,l=i+r;return l<0?null:o<0?this.at(l,n):this.at(o,n)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/n;return i>=0?i:null}intersectPlane(e,n){const i=this.distanceToPlane(e);return i===null?null:this.at(i,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let i,a,s,r,o,l;const c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,f=this.origin;return c>=0?(i=(e.min.x-f.x)*c,a=(e.max.x-f.x)*c):(i=(e.max.x-f.x)*c,a=(e.min.x-f.x)*c),u>=0?(s=(e.min.y-f.y)*u,r=(e.max.y-f.y)*u):(s=(e.max.y-f.y)*u,r=(e.min.y-f.y)*u),i>r||s>a||((s>i||isNaN(i))&&(i=s),(r<a||isNaN(a))&&(a=r),d>=0?(o=(e.min.z-f.z)*d,l=(e.max.z-f.z)*d):(o=(e.max.z-f.z)*d,l=(e.min.z-f.z)*d),i>l||o>a)||((o>i||i!==i)&&(i=o),(l<a||a!==a)&&(a=l),a<0)?null:this.at(i>=0?i:a,n)}intersectsBox(e){return this.intersectBox(e,fi)!==null}intersectTriangle(e,n,i,a,s){Qc.subVectors(n,e),xo.subVectors(i,e),eu.crossVectors(Qc,xo);let r=this.direction.dot(eu),o;if(r>0){if(a)return null;o=1}else if(r<0)o=-1,r=-r;else return null;Ri.subVectors(this.origin,e);const l=o*this.direction.dot(xo.crossVectors(Ri,xo));if(l<0)return null;const c=o*this.direction.dot(Qc.cross(Ri));if(c<0||l+c>r)return null;const u=-o*Ri.dot(eu);return u<0?null:this.at(u/r,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class yt{constructor(e,n,i,a,s,r,o,l,c,u,d,f,p,_,g,m){yt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,i,a,s,r,o,l,c,u,d,f,p,_,g,m)}set(e,n,i,a,s,r,o,l,c,u,d,f,p,_,g,m){const h=this.elements;return h[0]=e,h[4]=n,h[8]=i,h[12]=a,h[1]=s,h[5]=r,h[9]=o,h[13]=l,h[2]=c,h[6]=u,h[10]=d,h[14]=f,h[3]=p,h[7]=_,h[11]=g,h[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new yt().fromArray(this.elements)}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(e){const n=this.elements,i=e.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,i){return e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,n,i){return this.set(e.x,n.x,i.x,0,e.y,n.y,i.y,0,e.z,n.z,i.z,0,0,0,0,1),this}extractRotation(e){const n=this.elements,i=e.elements,a=1/Ga.setFromMatrixColumn(e,0).length(),s=1/Ga.setFromMatrixColumn(e,1).length(),r=1/Ga.setFromMatrixColumn(e,2).length();return n[0]=i[0]*a,n[1]=i[1]*a,n[2]=i[2]*a,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*r,n[9]=i[9]*r,n[10]=i[10]*r,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,i=e.x,a=e.y,s=e.z,r=Math.cos(i),o=Math.sin(i),l=Math.cos(a),c=Math.sin(a),u=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const f=r*u,p=r*d,_=o*u,g=o*d;n[0]=l*u,n[4]=-l*d,n[8]=c,n[1]=p+_*c,n[5]=f-g*c,n[9]=-o*l,n[2]=g-f*c,n[6]=_+p*c,n[10]=r*l}else if(e.order==="YXZ"){const f=l*u,p=l*d,_=c*u,g=c*d;n[0]=f+g*o,n[4]=_*o-p,n[8]=r*c,n[1]=r*d,n[5]=r*u,n[9]=-o,n[2]=p*o-_,n[6]=g+f*o,n[10]=r*l}else if(e.order==="ZXY"){const f=l*u,p=l*d,_=c*u,g=c*d;n[0]=f-g*o,n[4]=-r*d,n[8]=_+p*o,n[1]=p+_*o,n[5]=r*u,n[9]=g-f*o,n[2]=-r*c,n[6]=o,n[10]=r*l}else if(e.order==="ZYX"){const f=r*u,p=r*d,_=o*u,g=o*d;n[0]=l*u,n[4]=_*c-p,n[8]=f*c+g,n[1]=l*d,n[5]=g*c+f,n[9]=p*c-_,n[2]=-c,n[6]=o*l,n[10]=r*l}else if(e.order==="YZX"){const f=r*l,p=r*c,_=o*l,g=o*c;n[0]=l*u,n[4]=g-f*d,n[8]=_*d+p,n[1]=d,n[5]=r*u,n[9]=-o*u,n[2]=-c*u,n[6]=p*d+_,n[10]=f-g*d}else if(e.order==="XZY"){const f=r*l,p=r*c,_=o*l,g=o*c;n[0]=l*u,n[4]=-d,n[8]=c*u,n[1]=f*d+g,n[5]=r*u,n[9]=p*d-_,n[2]=_*d-p,n[6]=o*u,n[10]=g*d+f}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(JS,e,QS)}lookAt(e,n,i){const a=this.elements;return un.subVectors(e,n),un.lengthSq()===0&&(un.z=1),un.normalize(),Pi.crossVectors(i,un),Pi.lengthSq()===0&&(Math.abs(i.z)===1?un.x+=1e-4:un.z+=1e-4,un.normalize(),Pi.crossVectors(i,un)),Pi.normalize(),So.crossVectors(un,Pi),a[0]=Pi.x,a[4]=So.x,a[8]=un.x,a[1]=Pi.y,a[5]=So.y,a[9]=un.y,a[2]=Pi.z,a[6]=So.z,a[10]=un.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,a=n.elements,s=this.elements,r=i[0],o=i[4],l=i[8],c=i[12],u=i[1],d=i[5],f=i[9],p=i[13],_=i[2],g=i[6],m=i[10],h=i[14],b=i[3],S=i[7],y=i[11],C=i[15],M=a[0],T=a[4],A=a[8],v=a[12],x=a[1],R=a[5],I=a[9],U=a[13],z=a[2],G=a[6],B=a[10],X=a[14],V=a[3],ee=a[7],pe=a[11],q=a[15];return s[0]=r*M+o*x+l*z+c*V,s[4]=r*T+o*R+l*G+c*ee,s[8]=r*A+o*I+l*B+c*pe,s[12]=r*v+o*U+l*X+c*q,s[1]=u*M+d*x+f*z+p*V,s[5]=u*T+d*R+f*G+p*ee,s[9]=u*A+d*I+f*B+p*pe,s[13]=u*v+d*U+f*X+p*q,s[2]=_*M+g*x+m*z+h*V,s[6]=_*T+g*R+m*G+h*ee,s[10]=_*A+g*I+m*B+h*pe,s[14]=_*v+g*U+m*X+h*q,s[3]=b*M+S*x+y*z+C*V,s[7]=b*T+S*R+y*G+C*ee,s[11]=b*A+S*I+y*B+C*pe,s[15]=b*v+S*U+y*X+C*q,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[4],a=e[8],s=e[12],r=e[1],o=e[5],l=e[9],c=e[13],u=e[2],d=e[6],f=e[10],p=e[14],_=e[3],g=e[7],m=e[11],h=e[15];return _*(+s*l*d-a*c*d-s*o*f+i*c*f+a*o*p-i*l*p)+g*(+n*l*p-n*c*f+s*r*f-a*r*p+a*c*u-s*l*u)+m*(+n*c*d-n*o*p-s*r*d+i*r*p+s*o*u-i*c*u)+h*(-a*o*u-n*l*d+n*o*f+a*r*d-i*r*f+i*l*u)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,i){const a=this.elements;return e.isVector3?(a[12]=e.x,a[13]=e.y,a[14]=e.z):(a[12]=e,a[13]=n,a[14]=i),this}invert(){const e=this.elements,n=e[0],i=e[1],a=e[2],s=e[3],r=e[4],o=e[5],l=e[6],c=e[7],u=e[8],d=e[9],f=e[10],p=e[11],_=e[12],g=e[13],m=e[14],h=e[15],b=d*m*c-g*f*c+g*l*p-o*m*p-d*l*h+o*f*h,S=_*f*c-u*m*c-_*l*p+r*m*p+u*l*h-r*f*h,y=u*g*c-_*d*c+_*o*p-r*g*p-u*o*h+r*d*h,C=_*d*l-u*g*l-_*o*f+r*g*f+u*o*m-r*d*m,M=n*b+i*S+a*y+s*C;if(M===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const T=1/M;return e[0]=b*T,e[1]=(g*f*s-d*m*s-g*a*p+i*m*p+d*a*h-i*f*h)*T,e[2]=(o*m*s-g*l*s+g*a*c-i*m*c-o*a*h+i*l*h)*T,e[3]=(d*l*s-o*f*s-d*a*c+i*f*c+o*a*p-i*l*p)*T,e[4]=S*T,e[5]=(u*m*s-_*f*s+_*a*p-n*m*p-u*a*h+n*f*h)*T,e[6]=(_*l*s-r*m*s-_*a*c+n*m*c+r*a*h-n*l*h)*T,e[7]=(r*f*s-u*l*s+u*a*c-n*f*c-r*a*p+n*l*p)*T,e[8]=y*T,e[9]=(_*d*s-u*g*s-_*i*p+n*g*p+u*i*h-n*d*h)*T,e[10]=(r*g*s-_*o*s+_*i*c-n*g*c-r*i*h+n*o*h)*T,e[11]=(u*o*s-r*d*s-u*i*c+n*d*c+r*i*p-n*o*p)*T,e[12]=C*T,e[13]=(u*g*a-_*d*a+_*i*f-n*g*f-u*i*m+n*d*m)*T,e[14]=(_*o*a-r*g*a-_*i*l+n*g*l+r*i*m-n*o*m)*T,e[15]=(r*d*a-u*o*a+u*i*l-n*d*l-r*i*f+n*o*f)*T,this}scale(e){const n=this.elements,i=e.x,a=e.y,s=e.z;return n[0]*=i,n[4]*=a,n[8]*=s,n[1]*=i,n[5]*=a,n[9]*=s,n[2]*=i,n[6]*=a,n[10]*=s,n[3]*=i,n[7]*=a,n[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],a=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,i,a))}makeTranslation(e,n,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const i=Math.cos(n),a=Math.sin(n),s=1-i,r=e.x,o=e.y,l=e.z,c=s*r,u=s*o;return this.set(c*r+i,c*o-a*l,c*l+a*o,0,c*o+a*l,u*o+i,u*l-a*r,0,c*l-a*o,u*l+a*r,s*l*l+i,0,0,0,0,1),this}makeScale(e,n,i){return this.set(e,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,n,i,a,s,r){return this.set(1,i,s,0,e,1,r,0,n,a,1,0,0,0,0,1),this}compose(e,n,i){const a=this.elements,s=n._x,r=n._y,o=n._z,l=n._w,c=s+s,u=r+r,d=o+o,f=s*c,p=s*u,_=s*d,g=r*u,m=r*d,h=o*d,b=l*c,S=l*u,y=l*d,C=i.x,M=i.y,T=i.z;return a[0]=(1-(g+h))*C,a[1]=(p+y)*C,a[2]=(_-S)*C,a[3]=0,a[4]=(p-y)*M,a[5]=(1-(f+h))*M,a[6]=(m+b)*M,a[7]=0,a[8]=(_+S)*T,a[9]=(m-b)*T,a[10]=(1-(f+g))*T,a[11]=0,a[12]=e.x,a[13]=e.y,a[14]=e.z,a[15]=1,this}decompose(e,n,i){const a=this.elements;let s=Ga.set(a[0],a[1],a[2]).length();const r=Ga.set(a[4],a[5],a[6]).length(),o=Ga.set(a[8],a[9],a[10]).length();this.determinant()<0&&(s=-s),e.x=a[12],e.y=a[13],e.z=a[14],Rn.copy(this);const c=1/s,u=1/r,d=1/o;return Rn.elements[0]*=c,Rn.elements[1]*=c,Rn.elements[2]*=c,Rn.elements[4]*=u,Rn.elements[5]*=u,Rn.elements[6]*=u,Rn.elements[8]*=d,Rn.elements[9]*=d,Rn.elements[10]*=d,n.setFromRotationMatrix(Rn),i.x=s,i.y=r,i.z=o,this}makePerspective(e,n,i,a,s,r,o=Qn,l=!1){const c=this.elements,u=2*s/(n-e),d=2*s/(i-a),f=(n+e)/(n-e),p=(i+a)/(i-a);let _,g;if(l)_=s/(r-s),g=r*s/(r-s);else if(o===Qn)_=-(r+s)/(r-s),g=-2*r*s/(r-s);else if(o===Xl)_=-r/(r-s),g=-r*s/(r-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=d,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=_,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,n,i,a,s,r,o=Qn,l=!1){const c=this.elements,u=2/(n-e),d=2/(i-a),f=-(n+e)/(n-e),p=-(i+a)/(i-a);let _,g;if(l)_=1/(r-s),g=r/(r-s);else if(o===Qn)_=-2/(r-s),g=-(r+s)/(r-s);else if(o===Xl)_=-1/(r-s),g=-s/(r-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=f,c[1]=0,c[5]=d,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=_,c[14]=g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const n=this.elements,i=e.elements;for(let a=0;a<16;a++)if(n[a]!==i[a])return!1;return!0}fromArray(e,n=0){for(let i=0;i<16;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e[n+9]=i[9],e[n+10]=i[10],e[n+11]=i[11],e[n+12]=i[12],e[n+13]=i[13],e[n+14]=i[14],e[n+15]=i[15],e}}const Ga=new L,Rn=new yt,JS=new L(0,0,0),QS=new L(1,1,1),Pi=new L,So=new L,un=new L,xh=new yt,Sh=new ri;class $n{constructor(e=0,n=0,i=0,a=$n.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=i,this._order=a}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,i,a=this._order){return this._x=e,this._y=n,this._z=i,this._order=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,i=!0){const a=e.elements,s=a[0],r=a[4],o=a[8],l=a[1],c=a[5],u=a[9],d=a[2],f=a[6],p=a[10];switch(n){case"XYZ":this._y=Math.asin(Ye(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-r,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ye(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ye(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-r,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Ye(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-r,c));break;case"YZX":this._z=Math.asin(Ye(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Ye(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,i){return xh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(xh,n,i)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return Sh.setFromEuler(this),this.setFromQuaternion(Sh,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}$n.DEFAULT_ORDER="XYZ";class Ev{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let ew=0;const wh=new L,$a=new ri,pi=new yt,wo=new L,nr=new L,tw=new L,nw=new ri,Eh=new L(1,0,0),Mh=new L(0,1,0),Th=new L(0,0,1),Ah={type:"added"},iw={type:"removed"},Wa={type:"childadded",child:null},tu={type:"childremoved",child:null};class Lt extends Ia{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ew++}),this.uuid=ei(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Lt.DEFAULT_UP.clone();const e=new L,n=new $n,i=new ri,a=new L(1,1,1);function s(){i.setFromEuler(n,!1)}function r(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:a},modelViewMatrix:{value:new yt},normalMatrix:{value:new We}}),this.matrix=new yt,this.matrixWorld=new yt,this.matrixAutoUpdate=Lt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Lt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ev,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return $a.setFromAxisAngle(e,n),this.quaternion.multiply($a),this}rotateOnWorldAxis(e,n){return $a.setFromAxisAngle(e,n),this.quaternion.premultiply($a),this}rotateX(e){return this.rotateOnAxis(Eh,e)}rotateY(e){return this.rotateOnAxis(Mh,e)}rotateZ(e){return this.rotateOnAxis(Th,e)}translateOnAxis(e,n){return wh.copy(e).applyQuaternion(this.quaternion),this.position.add(wh.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(Eh,e)}translateY(e){return this.translateOnAxis(Mh,e)}translateZ(e){return this.translateOnAxis(Th,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(pi.copy(this.matrixWorld).invert())}lookAt(e,n,i){e.isVector3?wo.copy(e):wo.set(e,n,i);const a=this.parent;this.updateWorldMatrix(!0,!1),nr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?pi.lookAt(nr,wo,this.up):pi.lookAt(wo,nr,this.up),this.quaternion.setFromRotationMatrix(pi),a&&(pi.extractRotation(a.matrixWorld),$a.setFromRotationMatrix(pi),this.quaternion.premultiply($a.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Ah),Wa.child=e,this.dispatchEvent(Wa),Wa.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(iw),tu.child=e,this.dispatchEvent(tu),tu.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),pi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),pi.multiply(e.parent.matrixWorld)),e.applyMatrix4(pi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Ah),Wa.child=e,this.dispatchEvent(Wa),Wa.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let i=0,a=this.children.length;i<a;i++){const r=this.children[i].getObjectByProperty(e,n);if(r!==void 0)return r}}getObjectsByProperty(e,n,i=[]){this[e]===n&&i.push(this);const a=this.children;for(let s=0,r=a.length;s<r;s++)a[s].getObjectsByProperty(e,n,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(nr,e,tw),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(nr,nw,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let i=0,a=n.length;i<a;i++)n[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let i=0,a=n.length;i<a;i++)n[i].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let i=0,a=n.length;i<a;i++)n[i].updateMatrixWorld(e)}updateWorldMatrix(e,n){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){const a=this.children;for(let s=0,r=a.length;s<r;s++)a[s].updateWorldMatrix(!1,!0)}}toJSON(e){const n=e===void 0||typeof e=="string",i={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const a={};a.uuid=this.uuid,a.type=this.type,this.name!==""&&(a.name=this.name),this.castShadow===!0&&(a.castShadow=!0),this.receiveShadow===!0&&(a.receiveShadow=!0),this.visible===!1&&(a.visible=!1),this.frustumCulled===!1&&(a.frustumCulled=!1),this.renderOrder!==0&&(a.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(a.userData=this.userData),a.layers=this.layers.mask,a.matrix=this.matrix.toArray(),a.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(a.matrixAutoUpdate=!1),this.isInstancedMesh&&(a.type="InstancedMesh",a.count=this.count,a.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(a.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(a.type="BatchedMesh",a.perObjectFrustumCulled=this.perObjectFrustumCulled,a.sortObjects=this.sortObjects,a.drawRanges=this._drawRanges,a.reservedRanges=this._reservedRanges,a.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),a.instanceInfo=this._instanceInfo.map(o=>({...o})),a.availableInstanceIds=this._availableInstanceIds.slice(),a.availableGeometryIds=this._availableGeometryIds.slice(),a.nextIndexStart=this._nextIndexStart,a.nextVertexStart=this._nextVertexStart,a.geometryCount=this._geometryCount,a.maxInstanceCount=this._maxInstanceCount,a.maxVertexCount=this._maxVertexCount,a.maxIndexCount=this._maxIndexCount,a.geometryInitialized=this._geometryInitialized,a.matricesTexture=this._matricesTexture.toJSON(e),a.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(a.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(a.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(a.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?a.background=this.background.toJSON():this.background.isTexture&&(a.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(a.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){a.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const d=l[c];s(e.shapes,d)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(a.bindMode=this.bindMode,a.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),a.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));a.material=o}else a.material=s(e.materials,this.material);if(this.children.length>0){a.children=[];for(let o=0;o<this.children.length;o++)a.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){a.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];a.animations.push(s(e.animations,l))}}if(n){const o=r(e.geometries),l=r(e.materials),c=r(e.textures),u=r(e.images),d=r(e.shapes),f=r(e.skeletons),p=r(e.animations),_=r(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),d.length>0&&(i.shapes=d),f.length>0&&(i.skeletons=f),p.length>0&&(i.animations=p),_.length>0&&(i.nodes=_)}return i.object=a,i;function r(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let i=0;i<e.children.length;i++){const a=e.children[i];this.add(a.clone())}return this}}Lt.DEFAULT_UP=new L(0,1,0);Lt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Lt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Pn=new L,hi=new L,nu=new L,mi=new L,Xa=new L,qa=new L,Ch=new L,iu=new L,au=new L,su=new L,ru=new Mt,ou=new Mt,lu=new Mt;class Mn{constructor(e=new L,n=new L,i=new L){this.a=e,this.b=n,this.c=i}static getNormal(e,n,i,a){a.subVectors(i,n),Pn.subVectors(e,n),a.cross(Pn);const s=a.lengthSq();return s>0?a.multiplyScalar(1/Math.sqrt(s)):a.set(0,0,0)}static getBarycoord(e,n,i,a,s){Pn.subVectors(a,n),hi.subVectors(i,n),nu.subVectors(e,n);const r=Pn.dot(Pn),o=Pn.dot(hi),l=Pn.dot(nu),c=hi.dot(hi),u=hi.dot(nu),d=r*c-o*o;if(d===0)return s.set(0,0,0),null;const f=1/d,p=(c*l-o*u)*f,_=(r*u-o*l)*f;return s.set(1-p-_,_,p)}static containsPoint(e,n,i,a){return this.getBarycoord(e,n,i,a,mi)===null?!1:mi.x>=0&&mi.y>=0&&mi.x+mi.y<=1}static getInterpolation(e,n,i,a,s,r,o,l){return this.getBarycoord(e,n,i,a,mi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,mi.x),l.addScaledVector(r,mi.y),l.addScaledVector(o,mi.z),l)}static getInterpolatedAttribute(e,n,i,a,s,r){return ru.setScalar(0),ou.setScalar(0),lu.setScalar(0),ru.fromBufferAttribute(e,n),ou.fromBufferAttribute(e,i),lu.fromBufferAttribute(e,a),r.setScalar(0),r.addScaledVector(ru,s.x),r.addScaledVector(ou,s.y),r.addScaledVector(lu,s.z),r}static isFrontFacing(e,n,i,a){return Pn.subVectors(i,n),hi.subVectors(e,n),Pn.cross(hi).dot(a)<0}set(e,n,i){return this.a.copy(e),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(e,n,i,a){return this.a.copy(e[n]),this.b.copy(e[i]),this.c.copy(e[a]),this}setFromAttributeAndIndices(e,n,i,a){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,a),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Pn.subVectors(this.c,this.b),hi.subVectors(this.a,this.b),Pn.cross(hi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Mn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return Mn.getBarycoord(e,this.a,this.b,this.c,n)}getInterpolation(e,n,i,a,s){return Mn.getInterpolation(e,this.a,this.b,this.c,n,i,a,s)}containsPoint(e){return Mn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Mn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const i=this.a,a=this.b,s=this.c;let r,o;Xa.subVectors(a,i),qa.subVectors(s,i),iu.subVectors(e,i);const l=Xa.dot(iu),c=qa.dot(iu);if(l<=0&&c<=0)return n.copy(i);au.subVectors(e,a);const u=Xa.dot(au),d=qa.dot(au);if(u>=0&&d<=u)return n.copy(a);const f=l*d-u*c;if(f<=0&&l>=0&&u<=0)return r=l/(l-u),n.copy(i).addScaledVector(Xa,r);su.subVectors(e,s);const p=Xa.dot(su),_=qa.dot(su);if(_>=0&&p<=_)return n.copy(s);const g=p*c-l*_;if(g<=0&&c>=0&&_<=0)return o=c/(c-_),n.copy(i).addScaledVector(qa,o);const m=u*_-p*d;if(m<=0&&d-u>=0&&p-_>=0)return Ch.subVectors(s,a),o=(d-u)/(d-u+(p-_)),n.copy(a).addScaledVector(Ch,o);const h=1/(m+g+f);return r=g*h,o=f*h,n.copy(i).addScaledVector(Xa,r).addScaledVector(qa,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Mv={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Li={h:0,s:0,l:0},Eo={h:0,s:0,l:0};function cu(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*6*(2/3-n):t}class je{constructor(e,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,i)}set(e,n,i){if(n===void 0&&i===void 0){const a=e;a&&a.isColor?this.copy(a):typeof a=="number"?this.setHex(a):typeof a=="string"&&this.setStyle(a)}else this.setRGB(e,n,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=Wt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,tt.colorSpaceToWorking(this,n),this}setRGB(e,n,i,a=tt.workingColorSpace){return this.r=e,this.g=n,this.b=i,tt.colorSpaceToWorking(this,a),this}setHSL(e,n,i,a=tt.workingColorSpace){if(e=bp(e,1),n=Ye(n,0,1),i=Ye(i,0,1),n===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+n):i+n-i*n,r=2*i-s;this.r=cu(r,s,e+1/3),this.g=cu(r,s,e),this.b=cu(r,s,e-1/3)}return tt.colorSpaceToWorking(this,a),this}setStyle(e,n=Wt){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let a;if(a=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const r=a[1],o=a[2];switch(r){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,n);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(a=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=a[1],r=s.length;if(r===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(r===6)return this.setHex(parseInt(s,16),n);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=Wt){const i=Mv[e.toLowerCase()];return i!==void 0?this.setHex(i,n):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Si(e.r),this.g=Si(e.g),this.b=Si(e.b),this}copyLinearToSRGB(e){return this.r=_s(e.r),this.g=_s(e.g),this.b=_s(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Wt){return tt.workingToColorSpace(Gt.copy(this),e),Math.round(Ye(Gt.r*255,0,255))*65536+Math.round(Ye(Gt.g*255,0,255))*256+Math.round(Ye(Gt.b*255,0,255))}getHexString(e=Wt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=tt.workingColorSpace){tt.workingToColorSpace(Gt.copy(this),n);const i=Gt.r,a=Gt.g,s=Gt.b,r=Math.max(i,a,s),o=Math.min(i,a,s);let l,c;const u=(o+r)/2;if(o===r)l=0,c=0;else{const d=r-o;switch(c=u<=.5?d/(r+o):d/(2-r-o),r){case i:l=(a-s)/d+(a<s?6:0);break;case a:l=(s-i)/d+2;break;case s:l=(i-a)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,n=tt.workingColorSpace){return tt.workingToColorSpace(Gt.copy(this),n),e.r=Gt.r,e.g=Gt.g,e.b=Gt.b,e}getStyle(e=Wt){tt.workingToColorSpace(Gt.copy(this),e);const n=Gt.r,i=Gt.g,a=Gt.b;return e!==Wt?`color(${e} ${n.toFixed(3)} ${i.toFixed(3)} ${a.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(a*255)})`}offsetHSL(e,n,i){return this.getHSL(Li),this.setHSL(Li.h+e,Li.s+n,Li.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,i){return this.r=e.r+(n.r-e.r)*i,this.g=e.g+(n.g-e.g)*i,this.b=e.b+(n.b-e.b)*i,this}lerpHSL(e,n){this.getHSL(Li),e.getHSL(Eo);const i=Er(Li.h,Eo.h,n),a=Er(Li.s,Eo.s,n),s=Er(Li.l,Eo.l,n);return this.setHSL(i,a,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,i=this.g,a=this.b,s=e.elements;return this.r=s[0]*n+s[3]*i+s[6]*a,this.g=s[1]*n+s[4]*i+s[7]*a,this.b=s[2]*n+s[5]*i+s[8]*a,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Gt=new je;je.NAMES=Mv;let aw=0;class Mi extends Ia{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:aw++}),this.uuid=ei(),this.name="",this.type="Material",this.blending=ms,this.side=Yi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=hd,this.blendDst=md,this.blendEquation=_a,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new je(0,0,0),this.blendAlpha=0,this.depthFunc=Rs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=hh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ua,this.stencilZFail=Ua,this.stencilZPass=Ua,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const i=e[n];if(i===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}const a=this[n];if(a===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}a&&a.isColor?a.set(i):a&&a.isVector3&&i&&i.isVector3?a.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==ms&&(i.blending=this.blending),this.side!==Yi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==hd&&(i.blendSrc=this.blendSrc),this.blendDst!==md&&(i.blendDst=this.blendDst),this.blendEquation!==_a&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Rs&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==hh&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ua&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Ua&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Ua&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function a(s){const r=[];for(const o in s){const l=s[o];delete l.metadata,r.push(l)}return r}if(n){const s=a(e.textures),r=a(e.images);s.length>0&&(i.textures=s),r.length>0&&(i.images=r)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let i=null;if(n!==null){const a=n.length;i=new Array(a);for(let s=0;s!==a;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class st extends Mi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new je(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new $n,this.combine=xc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Ct=new L,Mo=new ce;let sw=0;class Gn{constructor(e,n,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:sw++}),this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=i,this.usage=tf,this.updateRanges=[],this.gpuType=bi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,i){e*=this.itemSize,i*=n.itemSize;for(let a=0,s=this.itemSize;a<s;a++)this.array[e+a]=n.array[i+a];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)Mo.fromBufferAttribute(this,n),Mo.applyMatrix3(e),this.setXY(n,Mo.x,Mo.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)Ct.fromBufferAttribute(this,n),Ct.applyMatrix3(e),this.setXYZ(n,Ct.x,Ct.y,Ct.z);return this}applyMatrix4(e){for(let n=0,i=this.count;n<i;n++)Ct.fromBufferAttribute(this,n),Ct.applyMatrix4(e),this.setXYZ(n,Ct.x,Ct.y,Ct.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)Ct.fromBufferAttribute(this,n),Ct.applyNormalMatrix(e),this.setXYZ(n,Ct.x,Ct.y,Ct.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)Ct.fromBufferAttribute(this,n),Ct.transformDirection(e),this.setXYZ(n,Ct.x,Ct.y,Ct.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let i=this.array[e*this.itemSize+n];return this.normalized&&(i=Un(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=at(i,this.array)),this.array[e*this.itemSize+n]=i,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=Un(n,this.array)),n}setX(e,n){return this.normalized&&(n=at(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=Un(n,this.array)),n}setY(e,n){return this.normalized&&(n=at(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=Un(n,this.array)),n}setZ(e,n){return this.normalized&&(n=at(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=Un(n,this.array)),n}setW(e,n){return this.normalized&&(n=at(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,i){return e*=this.itemSize,this.normalized&&(n=at(n,this.array),i=at(i,this.array)),this.array[e+0]=n,this.array[e+1]=i,this}setXYZ(e,n,i,a){return e*=this.itemSize,this.normalized&&(n=at(n,this.array),i=at(i,this.array),a=at(a,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=a,this}setXYZW(e,n,i,a,s){return e*=this.itemSize,this.normalized&&(n=at(n,this.array),i=at(i,this.array),a=at(a,this.array),s=at(s,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=a,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==tf&&(e.usage=this.usage),e}}class Tv extends Gn{constructor(e,n,i){super(new Uint16Array(e),n,i)}}class Av extends Gn{constructor(e,n,i){super(new Uint32Array(e),n,i)}}class it extends Gn{constructor(e,n,i){super(new Float32Array(e),n,i)}}let rw=0;const xn=new yt,uu=new Lt,Ya=new L,dn=new lo,ir=new lo,Ft=new L;class At extends Ia{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:rw++}),this.uuid=ei(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Sv(e)?Av:Tv)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,i=0){this.groups.push({start:e,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new We().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const a=this.attributes.tangent;return a!==void 0&&(a.transformDirection(e),a.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return xn.makeRotationFromQuaternion(e),this.applyMatrix4(xn),this}rotateX(e){return xn.makeRotationX(e),this.applyMatrix4(xn),this}rotateY(e){return xn.makeRotationY(e),this.applyMatrix4(xn),this}rotateZ(e){return xn.makeRotationZ(e),this.applyMatrix4(xn),this}translate(e,n,i){return xn.makeTranslation(e,n,i),this.applyMatrix4(xn),this}scale(e,n,i){return xn.makeScale(e,n,i),this.applyMatrix4(xn),this}lookAt(e){return uu.lookAt(e),uu.updateMatrix(),this.applyMatrix4(uu.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ya).negate(),this.translate(Ya.x,Ya.y,Ya.z),this}setFromPoints(e){const n=this.getAttribute("position");if(n===void 0){const i=[];for(let a=0,s=e.length;a<s;a++){const r=e[a];i.push(r.x,r.y,r.z||0)}this.setAttribute("position",new it(i,3))}else{const i=Math.min(e.length,n.count);for(let a=0;a<i;a++){const s=e[a];n.setXYZ(a,s.x,s.y,s.z||0)}e.length>n.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new lo);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let i=0,a=n.length;i<a;i++){const s=n[i];dn.setFromBufferAttribute(s),this.morphTargetsRelative?(Ft.addVectors(this.boundingBox.min,dn.min),this.boundingBox.expandByPoint(Ft),Ft.addVectors(this.boundingBox.max,dn.max),this.boundingBox.expandByPoint(Ft)):(this.boundingBox.expandByPoint(dn.min),this.boundingBox.expandByPoint(dn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new wc);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(e){const i=this.boundingSphere.center;if(dn.setFromBufferAttribute(e),n)for(let s=0,r=n.length;s<r;s++){const o=n[s];ir.setFromBufferAttribute(o),this.morphTargetsRelative?(Ft.addVectors(dn.min,ir.min),dn.expandByPoint(Ft),Ft.addVectors(dn.max,ir.max),dn.expandByPoint(Ft)):(dn.expandByPoint(ir.min),dn.expandByPoint(ir.max))}dn.getCenter(i);let a=0;for(let s=0,r=e.count;s<r;s++)Ft.fromBufferAttribute(e,s),a=Math.max(a,i.distanceToSquared(Ft));if(n)for(let s=0,r=n.length;s<r;s++){const o=n[s],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Ft.fromBufferAttribute(o,c),l&&(Ya.fromBufferAttribute(e,c),Ft.add(Ya)),a=Math.max(a,i.distanceToSquared(Ft))}this.boundingSphere.radius=Math.sqrt(a),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=n.position,a=n.normal,s=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Gn(new Float32Array(4*i.count),4));const r=this.getAttribute("tangent"),o=[],l=[];for(let A=0;A<i.count;A++)o[A]=new L,l[A]=new L;const c=new L,u=new L,d=new L,f=new ce,p=new ce,_=new ce,g=new L,m=new L;function h(A,v,x){c.fromBufferAttribute(i,A),u.fromBufferAttribute(i,v),d.fromBufferAttribute(i,x),f.fromBufferAttribute(s,A),p.fromBufferAttribute(s,v),_.fromBufferAttribute(s,x),u.sub(c),d.sub(c),p.sub(f),_.sub(f);const R=1/(p.x*_.y-_.x*p.y);isFinite(R)&&(g.copy(u).multiplyScalar(_.y).addScaledVector(d,-p.y).multiplyScalar(R),m.copy(d).multiplyScalar(p.x).addScaledVector(u,-_.x).multiplyScalar(R),o[A].add(g),o[v].add(g),o[x].add(g),l[A].add(m),l[v].add(m),l[x].add(m))}let b=this.groups;b.length===0&&(b=[{start:0,count:e.count}]);for(let A=0,v=b.length;A<v;++A){const x=b[A],R=x.start,I=x.count;for(let U=R,z=R+I;U<z;U+=3)h(e.getX(U+0),e.getX(U+1),e.getX(U+2))}const S=new L,y=new L,C=new L,M=new L;function T(A){C.fromBufferAttribute(a,A),M.copy(C);const v=o[A];S.copy(v),S.sub(C.multiplyScalar(C.dot(v))).normalize(),y.crossVectors(M,v);const R=y.dot(l[A])<0?-1:1;r.setXYZW(A,S.x,S.y,S.z,R)}for(let A=0,v=b.length;A<v;++A){const x=b[A],R=x.start,I=x.count;for(let U=R,z=R+I;U<z;U+=3)T(e.getX(U+0)),T(e.getX(U+1)),T(e.getX(U+2))}}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Gn(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let f=0,p=i.count;f<p;f++)i.setXYZ(f,0,0,0);const a=new L,s=new L,r=new L,o=new L,l=new L,c=new L,u=new L,d=new L;if(e)for(let f=0,p=e.count;f<p;f+=3){const _=e.getX(f+0),g=e.getX(f+1),m=e.getX(f+2);a.fromBufferAttribute(n,_),s.fromBufferAttribute(n,g),r.fromBufferAttribute(n,m),u.subVectors(r,s),d.subVectors(a,s),u.cross(d),o.fromBufferAttribute(i,_),l.fromBufferAttribute(i,g),c.fromBufferAttribute(i,m),o.add(u),l.add(u),c.add(u),i.setXYZ(_,o.x,o.y,o.z),i.setXYZ(g,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,p=n.count;f<p;f+=3)a.fromBufferAttribute(n,f+0),s.fromBufferAttribute(n,f+1),r.fromBufferAttribute(n,f+2),u.subVectors(r,s),d.subVectors(a,s),u.cross(d),i.setXYZ(f+0,u.x,u.y,u.z),i.setXYZ(f+1,u.x,u.y,u.z),i.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,i=e.count;n<i;n++)Ft.fromBufferAttribute(e,n),Ft.normalize(),e.setXYZ(n,Ft.x,Ft.y,Ft.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,d=o.normalized,f=new c.constructor(l.length*u);let p=0,_=0;for(let g=0,m=l.length;g<m;g++){o.isInterleavedBufferAttribute?p=l[g]*o.data.stride+o.offset:p=l[g]*u;for(let h=0;h<u;h++)f[_++]=c[p++]}return new Gn(f,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new At,i=this.index.array,a=this.attributes;for(const o in a){const l=a[o],c=e(l,i);n.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let u=0,d=c.length;u<d;u++){const f=c[u],p=e(f,i);l.push(p)}n.morphAttributes[o]=l}n.morphTargetsRelative=this.morphTargetsRelative;const r=this.groups;for(let o=0,l=r.length;o<l;o++){const c=r[o];n.addGroup(c.start,c.count,c.materialIndex)}return n}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const a={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let d=0,f=c.length;d<f;d++){const p=c[d];u.push(p.toJSON(e.data))}u.length>0&&(a[l]=u,s=!0)}s&&(e.data.morphAttributes=a,e.data.morphTargetsRelative=this.morphTargetsRelative);const r=this.groups;r.length>0&&(e.data.groups=JSON.parse(JSON.stringify(r)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const a=e.attributes;for(const c in a){const u=a[c];this.setAttribute(c,u.clone(n))}const s=e.morphAttributes;for(const c in s){const u=[],d=s[c];for(let f=0,p=d.length;f<p;f++)u.push(d[f].clone(n));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const r=e.groups;for(let c=0,u=r.length;c<u;c++){const d=r[c];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Rh=new yt,ra=new Sp,To=new wc,Ph=new L,Ao=new L,Co=new L,Ro=new L,du=new L,Po=new L,Lh=new L,Lo=new L;class He extends Lt{constructor(e=new At,n=new st){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const a=n[i[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=a.length;s<r;s++){const o=a[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,n){const i=this.geometry,a=i.attributes.position,s=i.morphAttributes.position,r=i.morphTargetsRelative;n.fromBufferAttribute(a,e);const o=this.morphTargetInfluences;if(s&&o){Po.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=o[l],d=s[l];u!==0&&(du.fromBufferAttribute(d,e),r?Po.addScaledVector(du,u):Po.addScaledVector(du.sub(n),u))}n.add(Po)}return n}raycast(e,n){const i=this.geometry,a=this.material,s=this.matrixWorld;a!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),To.copy(i.boundingSphere),To.applyMatrix4(s),ra.copy(e.ray).recast(e.near),!(To.containsPoint(ra.origin)===!1&&(ra.intersectSphere(To,Ph)===null||ra.origin.distanceToSquared(Ph)>(e.far-e.near)**2))&&(Rh.copy(s).invert(),ra.copy(e.ray).applyMatrix4(Rh),!(i.boundingBox!==null&&ra.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,n,ra)))}_computeIntersections(e,n,i){let a;const s=this.geometry,r=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,d=s.attributes.normal,f=s.groups,p=s.drawRange;if(o!==null)if(Array.isArray(r))for(let _=0,g=f.length;_<g;_++){const m=f[_],h=r[m.materialIndex],b=Math.max(m.start,p.start),S=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let y=b,C=S;y<C;y+=3){const M=o.getX(y),T=o.getX(y+1),A=o.getX(y+2);a=No(this,h,e,i,c,u,d,M,T,A),a&&(a.faceIndex=Math.floor(y/3),a.face.materialIndex=m.materialIndex,n.push(a))}}else{const _=Math.max(0,p.start),g=Math.min(o.count,p.start+p.count);for(let m=_,h=g;m<h;m+=3){const b=o.getX(m),S=o.getX(m+1),y=o.getX(m+2);a=No(this,r,e,i,c,u,d,b,S,y),a&&(a.faceIndex=Math.floor(m/3),n.push(a))}}else if(l!==void 0)if(Array.isArray(r))for(let _=0,g=f.length;_<g;_++){const m=f[_],h=r[m.materialIndex],b=Math.max(m.start,p.start),S=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let y=b,C=S;y<C;y+=3){const M=y,T=y+1,A=y+2;a=No(this,h,e,i,c,u,d,M,T,A),a&&(a.faceIndex=Math.floor(y/3),a.face.materialIndex=m.materialIndex,n.push(a))}}else{const _=Math.max(0,p.start),g=Math.min(l.count,p.start+p.count);for(let m=_,h=g;m<h;m+=3){const b=m,S=m+1,y=m+2;a=No(this,r,e,i,c,u,d,b,S,y),a&&(a.faceIndex=Math.floor(m/3),n.push(a))}}}}function ow(t,e,n,i,a,s,r,o){let l;if(e.side===on?l=i.intersectTriangle(r,s,a,!0,o):l=i.intersectTriangle(a,s,r,e.side===Yi,o),l===null)return null;Lo.copy(o),Lo.applyMatrix4(t.matrixWorld);const c=n.ray.origin.distanceTo(Lo);return c<n.near||c>n.far?null:{distance:c,point:Lo.clone(),object:t}}function No(t,e,n,i,a,s,r,o,l,c){t.getVertexPosition(o,Ao),t.getVertexPosition(l,Co),t.getVertexPosition(c,Ro);const u=ow(t,e,n,i,Ao,Co,Ro,Lh);if(u){const d=new L;Mn.getBarycoord(Lh,Ao,Co,Ro,d),a&&(u.uv=Mn.getInterpolatedAttribute(a,o,l,c,d,new ce)),s&&(u.uv1=Mn.getInterpolatedAttribute(s,o,l,c,d,new ce)),r&&(u.normal=Mn.getInterpolatedAttribute(r,o,l,c,d,new L),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const f={a:o,b:l,c,normal:new L,materialIndex:0};Mn.getNormal(Ao,Co,Ro,f.normal),u.face=f,u.barycoord=d}return u}class Da extends At{constructor(e=1,n=1,i=1,a=1,s=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:i,widthSegments:a,heightSegments:s,depthSegments:r};const o=this;a=Math.floor(a),s=Math.floor(s),r=Math.floor(r);const l=[],c=[],u=[],d=[];let f=0,p=0;_("z","y","x",-1,-1,i,n,e,r,s,0),_("z","y","x",1,-1,i,n,-e,r,s,1),_("x","z","y",1,1,e,i,n,a,r,2),_("x","z","y",1,-1,e,i,-n,a,r,3),_("x","y","z",1,-1,e,n,i,a,s,4),_("x","y","z",-1,-1,e,n,-i,a,s,5),this.setIndex(l),this.setAttribute("position",new it(c,3)),this.setAttribute("normal",new it(u,3)),this.setAttribute("uv",new it(d,2));function _(g,m,h,b,S,y,C,M,T,A,v){const x=y/T,R=C/A,I=y/2,U=C/2,z=M/2,G=T+1,B=A+1;let X=0,V=0;const ee=new L;for(let pe=0;pe<B;pe++){const q=pe*R-U;for(let de=0;de<G;de++){const we=de*x-I;ee[g]=we*b,ee[m]=q*S,ee[h]=z,c.push(ee.x,ee.y,ee.z),ee[g]=0,ee[m]=0,ee[h]=M>0?1:-1,u.push(ee.x,ee.y,ee.z),d.push(de/T),d.push(1-pe/A),X+=1}}for(let pe=0;pe<A;pe++)for(let q=0;q<T;q++){const de=f+q+G*pe,we=f+q+G*(pe+1),be=f+(q+1)+G*(pe+1),me=f+(q+1)+G*pe;l.push(de,we,me),l.push(we,be,me),V+=6}o.addGroup(p,V,v),p+=V,f+=X}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Da(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Is(t){const e={};for(const n in t){e[n]={};for(const i in t[n]){const a=t[n][i];a&&(a.isColor||a.isMatrix3||a.isMatrix4||a.isVector2||a.isVector3||a.isVector4||a.isTexture||a.isQuaternion)?a.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][i]=null):e[n][i]=a.clone():Array.isArray(a)?e[n][i]=a.slice():e[n][i]=a}}return e}function Kt(t){const e={};for(let n=0;n<t.length;n++){const i=Is(t[n]);for(const a in i)e[a]=i[a]}return e}function lw(t){const e=[];for(let n=0;n<t.length;n++)e.push(t[n].clone());return e}function Cv(t){const e=t.getRenderTarget();return e===null?t.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:tt.workingColorSpace}const cw={clone:Is,merge:Kt};var uw=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,dw=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ki extends Mi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=uw,this.fragmentShader=dw,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Is(e.uniforms),this.uniformsGroups=lw(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const a in this.uniforms){const r=this.uniforms[a].value;r&&r.isTexture?n.uniforms[a]={type:"t",value:r.toJSON(e).uuid}:r&&r.isColor?n.uniforms[a]={type:"c",value:r.getHex()}:r&&r.isVector2?n.uniforms[a]={type:"v2",value:r.toArray()}:r&&r.isVector3?n.uniforms[a]={type:"v3",value:r.toArray()}:r&&r.isVector4?n.uniforms[a]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?n.uniforms[a]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?n.uniforms[a]={type:"m4",value:r.toArray()}:n.uniforms[a]={value:r}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const a in this.extensions)this.extensions[a]===!0&&(i[a]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}}class Rv extends Lt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new yt,this.projectionMatrix=new yt,this.projectionMatrixInverse=new yt,this.coordinateSystem=Qn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,n){super.updateWorldMatrix(e,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Ni=new L,Nh=new ce,Ih=new ce;class wn extends Rv{constructor(e=50,n=1,i=.1,a=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=a,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=Vr*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(wr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Vr*2*Math.atan(Math.tan(wr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,n,i){Ni.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ni.x,Ni.y).multiplyScalar(-e/Ni.z),Ni.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Ni.x,Ni.y).multiplyScalar(-e/Ni.z)}getViewSize(e,n){return this.getViewBounds(e,Nh,Ih),n.subVectors(Ih,Nh)}setViewOffset(e,n,i,a,s,r){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=a,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(wr*.5*this.fov)/this.zoom,i=2*n,a=this.aspect*i,s=-.5*a;const r=this.view;if(this.view!==null&&this.view.enabled){const l=r.fullWidth,c=r.fullHeight;s+=r.offsetX*a/l,n-=r.offsetY*i/c,a*=r.width/l,i*=r.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+a,n,n-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}const Ka=-90,ja=1;class fw extends Lt{constructor(e,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const a=new wn(Ka,ja,e,n);a.layers=this.layers,this.add(a);const s=new wn(Ka,ja,e,n);s.layers=this.layers,this.add(s);const r=new wn(Ka,ja,e,n);r.layers=this.layers,this.add(r);const o=new wn(Ka,ja,e,n);o.layers=this.layers,this.add(o);const l=new wn(Ka,ja,e,n);l.layers=this.layers,this.add(l);const c=new wn(Ka,ja,e,n);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[i,a,s,r,o,l]=n;for(const c of n)this.remove(c);if(e===Qn)i.up.set(0,1,0),i.lookAt(1,0,0),a.up.set(0,1,0),a.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Xl)i.up.set(0,-1,0),i.lookAt(-1,0,0),a.up.set(0,-1,0),a.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of n)this.add(c),c.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:a}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,r,o,l,c,u]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const g=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,a),e.render(n,s),e.setRenderTarget(i,1,a),e.render(n,r),e.setRenderTarget(i,2,a),e.render(n,o),e.setRenderTarget(i,3,a),e.render(n,l),e.setRenderTarget(i,4,a),e.render(n,c),i.texture.generateMipmaps=g,e.setRenderTarget(i,5,a),e.render(n,u),e.setRenderTarget(d,f,p),e.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class Pv extends jt{constructor(e=[],n=Ps,i,a,s,r,o,l,c,u){super(e,n,i,a,s,r,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class pw extends Ca{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},a=[i,i,i,i,i,i];this.texture=new Pv(a),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},a=new Da(5,5,5),s=new Ki({name:"CubemapFromEquirect",uniforms:Is(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:on,blending:Bi});s.uniforms.tEquirect.value=n;const r=new He(a,s),o=n.minFilter;return n.minFilter===ba&&(n.minFilter=Jn),new fw(1,10,this).update(e,r),n.minFilter=o,r.geometry.dispose(),r.material.dispose(),this}clear(e,n=!0,i=!0,a=!0){const s=e.getRenderTarget();for(let r=0;r<6;r++)e.setRenderTarget(this,r),e.clear(n,i,a);e.setRenderTarget(s)}}class _t extends Lt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const hw={type:"move"};class fu{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new _t,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new _t,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new _t,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const i of e.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,i){let a=null,s=null,r=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(c&&e.hand){r=!0;for(const g of e.hand.values()){const m=n.getJointPose(g,i),h=this._getHandJoint(c,g);m!==null&&(h.matrix.fromArray(m.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=m.radius),h.visible=m!==null}const u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],f=u.position.distanceTo(d.position),p=.02,_=.005;c.inputState.pinching&&f>p+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=p-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=n.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(a=n.getPose(e.targetRaySpace,i),a===null&&s!==null&&(a=s),a!==null&&(o.matrix.fromArray(a.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,a.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(a.linearVelocity)):o.hasLinearVelocity=!1,a.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(a.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(hw)))}return o!==null&&(o.visible=a!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=r!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const i=new _t;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[n.jointName]=i,e.add(i)}return e.joints[n.jointName]}}class mw extends Lt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new $n,this.environmentIntensity=1,this.environmentRotation=new $n,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}class _w{constructor(e,n){this.isInterleavedBuffer=!0,this.array=e,this.stride=n,this.count=e!==void 0?e.length/n:0,this.usage=tf,this.updateRanges=[],this.version=0,this.uuid=ei()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,n,i){e*=this.stride,i*=n.stride;for(let a=0,s=this.stride;a<s;a++)this.array[e+a]=n.array[i+a];return this}set(e,n=0){return this.array.set(e,n),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ei()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const n=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(n,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ei()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Yt=new L;class Yl{constructor(e,n,i,a=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=n,this.offset=i,this.normalized=a}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let n=0,i=this.data.count;n<i;n++)Yt.fromBufferAttribute(this,n),Yt.applyMatrix4(e),this.setXYZ(n,Yt.x,Yt.y,Yt.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)Yt.fromBufferAttribute(this,n),Yt.applyNormalMatrix(e),this.setXYZ(n,Yt.x,Yt.y,Yt.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)Yt.fromBufferAttribute(this,n),Yt.transformDirection(e),this.setXYZ(n,Yt.x,Yt.y,Yt.z);return this}getComponent(e,n){let i=this.array[e*this.data.stride+this.offset+n];return this.normalized&&(i=Un(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=at(i,this.array)),this.data.array[e*this.data.stride+this.offset+n]=i,this}setX(e,n){return this.normalized&&(n=at(n,this.array)),this.data.array[e*this.data.stride+this.offset]=n,this}setY(e,n){return this.normalized&&(n=at(n,this.array)),this.data.array[e*this.data.stride+this.offset+1]=n,this}setZ(e,n){return this.normalized&&(n=at(n,this.array)),this.data.array[e*this.data.stride+this.offset+2]=n,this}setW(e,n){return this.normalized&&(n=at(n,this.array)),this.data.array[e*this.data.stride+this.offset+3]=n,this}getX(e){let n=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(n=Un(n,this.array)),n}getY(e){let n=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(n=Un(n,this.array)),n}getZ(e){let n=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(n=Un(n,this.array)),n}getW(e){let n=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(n=Un(n,this.array)),n}setXY(e,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(n=at(n,this.array),i=at(i,this.array)),this.data.array[e+0]=n,this.data.array[e+1]=i,this}setXYZ(e,n,i,a){return e=e*this.data.stride+this.offset,this.normalized&&(n=at(n,this.array),i=at(i,this.array),a=at(a,this.array)),this.data.array[e+0]=n,this.data.array[e+1]=i,this.data.array[e+2]=a,this}setXYZW(e,n,i,a,s){return e=e*this.data.stride+this.offset,this.normalized&&(n=at(n,this.array),i=at(i,this.array),a=at(a,this.array),s=at(s,this.array)),this.data.array[e+0]=n,this.data.array[e+1]=i,this.data.array[e+2]=a,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const n=[];for(let i=0;i<this.count;i++){const a=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)n.push(this.data.array[a+s])}return new Gn(new this.array.constructor(n),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Yl(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const n=[];for(let i=0;i<this.count;i++){const a=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)n.push(this.data.array[a+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:n,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Lv extends Mi{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new je(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Za;const ar=new L,Ja=new L,Qa=new L,es=new ce,sr=new ce,Nv=new yt,Io=new L,rr=new L,Do=new L,Dh=new ce,pu=new ce,kh=new ce;class Iv extends Lt{constructor(e=new Lv){if(super(),this.isSprite=!0,this.type="Sprite",Za===void 0){Za=new At;const n=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new _w(n,5);Za.setIndex([0,1,2,0,2,3]),Za.setAttribute("position",new Yl(i,3,0,!1)),Za.setAttribute("uv",new Yl(i,2,3,!1))}this.geometry=Za,this.material=e,this.center=new ce(.5,.5),this.count=1}raycast(e,n){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Ja.setFromMatrixScale(this.matrixWorld),Nv.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Qa.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Ja.multiplyScalar(-Qa.z);const i=this.material.rotation;let a,s;i!==0&&(s=Math.cos(i),a=Math.sin(i));const r=this.center;ko(Io.set(-.5,-.5,0),Qa,r,Ja,a,s),ko(rr.set(.5,-.5,0),Qa,r,Ja,a,s),ko(Do.set(.5,.5,0),Qa,r,Ja,a,s),Dh.set(0,0),pu.set(1,0),kh.set(1,1);let o=e.ray.intersectTriangle(Io,rr,Do,!1,ar);if(o===null&&(ko(rr.set(-.5,.5,0),Qa,r,Ja,a,s),pu.set(0,1),o=e.ray.intersectTriangle(Io,Do,rr,!1,ar),o===null))return;const l=e.ray.origin.distanceTo(ar);l<e.near||l>e.far||n.push({distance:l,point:ar.clone(),uv:Mn.getInterpolation(ar,Io,rr,Do,Dh,pu,kh,new ce),face:null,object:this})}copy(e,n){return super.copy(e,n),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function ko(t,e,n,i,a,s){es.subVectors(t,n).addScalar(.5).multiply(i),a!==void 0?(sr.x=s*es.x-a*es.y,sr.y=a*es.x+s*es.y):sr.copy(es),t.copy(e),t.x+=sr.x,t.y+=sr.y,t.applyMatrix4(Nv)}const hu=new L,gw=new L,vw=new We;class ki{constructor(e=new L(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,i,a){return this.normal.set(e,n,i),this.constant=a,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,i){const a=hu.subVectors(i,n).cross(gw.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(a,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n){const i=e.delta(hu),a=this.normal.dot(i);if(a===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/a;return s<0||s>1?null:n.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const n=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return n<0&&i>0||i<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const i=n||vw.getNormalMatrix(e),a=this.coplanarPoint(hu).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-a.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const oa=new wc,yw=new ce(.5,.5),Fo=new L;class wp{constructor(e=new ki,n=new ki,i=new ki,a=new ki,s=new ki,r=new ki){this.planes=[e,n,i,a,s,r]}set(e,n,i,a,s,r){const o=this.planes;return o[0].copy(e),o[1].copy(n),o[2].copy(i),o[3].copy(a),o[4].copy(s),o[5].copy(r),this}copy(e){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,n=Qn,i=!1){const a=this.planes,s=e.elements,r=s[0],o=s[1],l=s[2],c=s[3],u=s[4],d=s[5],f=s[6],p=s[7],_=s[8],g=s[9],m=s[10],h=s[11],b=s[12],S=s[13],y=s[14],C=s[15];if(a[0].setComponents(c-r,p-u,h-_,C-b).normalize(),a[1].setComponents(c+r,p+u,h+_,C+b).normalize(),a[2].setComponents(c+o,p+d,h+g,C+S).normalize(),a[3].setComponents(c-o,p-d,h-g,C-S).normalize(),i)a[4].setComponents(l,f,m,y).normalize(),a[5].setComponents(c-l,p-f,h-m,C-y).normalize();else if(a[4].setComponents(c-l,p-f,h-m,C-y).normalize(),n===Qn)a[5].setComponents(c+l,p+f,h+m,C+y).normalize();else if(n===Xl)a[5].setComponents(l,f,m,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),oa.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),oa.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(oa)}intersectsSprite(e){oa.center.set(0,0,0);const n=yw.distanceTo(e.center);return oa.radius=.7071067811865476+n,oa.applyMatrix4(e.matrixWorld),this.intersectsSphere(oa)}intersectsSphere(e){const n=this.planes,i=e.center,a=-e.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<a)return!1;return!0}intersectsBox(e){const n=this.planes;for(let i=0;i<6;i++){const a=n[i];if(Fo.x=a.normal.x>0?e.max.x:e.min.x,Fo.y=a.normal.y>0?e.max.y:e.min.y,Fo.z=a.normal.z>0?e.max.z:e.min.z,a.distanceToPoint(Fo)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Ec extends Mi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new je(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Kl=new L,jl=new L,Fh=new yt,or=new Sp,Oo=new wc,mu=new L,Oh=new L;class Ep extends Lt{constructor(e=new At,n=new Ec){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,i=[0];for(let a=1,s=n.count;a<s;a++)Kl.fromBufferAttribute(n,a-1),jl.fromBufferAttribute(n,a),i[a]=i[a-1],i[a]+=Kl.distanceTo(jl);e.setAttribute("lineDistance",new it(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,n){const i=this.geometry,a=this.matrixWorld,s=e.params.Line.threshold,r=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Oo.copy(i.boundingSphere),Oo.applyMatrix4(a),Oo.radius+=s,e.ray.intersectsSphere(Oo)===!1)return;Fh.copy(a).invert(),or.copy(e.ray).applyMatrix4(Fh);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,u=i.index,f=i.attributes.position;if(u!==null){const p=Math.max(0,r.start),_=Math.min(u.count,r.start+r.count);for(let g=p,m=_-1;g<m;g+=c){const h=u.getX(g),b=u.getX(g+1),S=Uo(this,e,or,l,h,b,g);S&&n.push(S)}if(this.isLineLoop){const g=u.getX(_-1),m=u.getX(p),h=Uo(this,e,or,l,g,m,_-1);h&&n.push(h)}}else{const p=Math.max(0,r.start),_=Math.min(f.count,r.start+r.count);for(let g=p,m=_-1;g<m;g+=c){const h=Uo(this,e,or,l,g,g+1,g);h&&n.push(h)}if(this.isLineLoop){const g=Uo(this,e,or,l,_-1,p,_-1);g&&n.push(g)}}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const a=n[i[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=a.length;s<r;s++){const o=a[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Uo(t,e,n,i,a,s,r){const o=t.geometry.attributes.position;if(Kl.fromBufferAttribute(o,a),jl.fromBufferAttribute(o,s),n.distanceSqToSegment(Kl,jl,mu,Oh)>i)return;mu.applyMatrix4(t.matrixWorld);const c=e.ray.origin.distanceTo(mu);if(!(c<e.near||c>e.far))return{distance:c,point:Oh.clone().applyMatrix4(t.matrixWorld),index:r,face:null,faceIndex:null,barycoord:null,object:t}}class Mc extends jt{constructor(e,n,i,a,s,r,o,l,c){super(e,n,i,a,s,r,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Dv extends jt{constructor(e,n,i=Aa,a,s,r,o=Vn,l=Vn,c,u=zr,d=1){if(u!==zr&&u!==Hr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:e,height:n,depth:d};super(f,a,s,r,o,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new xp(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}class kv extends jt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class cs extends At{constructor(e=1,n=32,i=0,a=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:n,thetaStart:i,thetaLength:a},n=Math.max(3,n);const s=[],r=[],o=[],l=[],c=new L,u=new ce;r.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let d=0,f=3;d<=n;d++,f+=3){const p=i+d/n*a;c.x=e*Math.cos(p),c.y=e*Math.sin(p),r.push(c.x,c.y,c.z),o.push(0,0,1),u.x=(r[f]/e+1)/2,u.y=(r[f+1]/e+1)/2,l.push(u.x,u.y)}for(let d=1;d<=n;d++)s.push(d,d+1,0);this.setIndex(s),this.setAttribute("position",new it(r,3)),this.setAttribute("normal",new it(o,3)),this.setAttribute("uv",new it(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new cs(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Tc extends At{constructor(e=1,n=1,i=1,a=32,s=1,r=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:n,height:i,radialSegments:a,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:l};const c=this;a=Math.floor(a),s=Math.floor(s);const u=[],d=[],f=[],p=[];let _=0;const g=[],m=i/2;let h=0;b(),r===!1&&(e>0&&S(!0),n>0&&S(!1)),this.setIndex(u),this.setAttribute("position",new it(d,3)),this.setAttribute("normal",new it(f,3)),this.setAttribute("uv",new it(p,2));function b(){const y=new L,C=new L;let M=0;const T=(n-e)/i;for(let A=0;A<=s;A++){const v=[],x=A/s,R=x*(n-e)+e;for(let I=0;I<=a;I++){const U=I/a,z=U*l+o,G=Math.sin(z),B=Math.cos(z);C.x=R*G,C.y=-x*i+m,C.z=R*B,d.push(C.x,C.y,C.z),y.set(G,T,B).normalize(),f.push(y.x,y.y,y.z),p.push(U,1-x),v.push(_++)}g.push(v)}for(let A=0;A<a;A++)for(let v=0;v<s;v++){const x=g[v][A],R=g[v+1][A],I=g[v+1][A+1],U=g[v][A+1];(e>0||v!==0)&&(u.push(x,R,U),M+=3),(n>0||v!==s-1)&&(u.push(R,I,U),M+=3)}c.addGroup(h,M,0),h+=M}function S(y){const C=_,M=new ce,T=new L;let A=0;const v=y===!0?e:n,x=y===!0?1:-1;for(let I=1;I<=a;I++)d.push(0,m*x,0),f.push(0,x,0),p.push(.5,.5),_++;const R=_;for(let I=0;I<=a;I++){const z=I/a*l+o,G=Math.cos(z),B=Math.sin(z);T.x=v*B,T.y=m*x,T.z=v*G,d.push(T.x,T.y,T.z),f.push(0,x,0),M.x=G*.5+.5,M.y=B*.5*x+.5,p.push(M.x,M.y),_++}for(let I=0;I<a;I++){const U=C+I,z=R+I;y===!0?u.push(z,z+1,U):u.push(z+1,z,U),A+=3}c.addGroup(h,A,y===!0?1:2),h+=A}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Tc(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class $r extends Tc{constructor(e=1,n=1,i=32,a=1,s=!1,r=0,o=Math.PI*2){super(0,e,n,i,a,s,r,o),this.type="ConeGeometry",this.parameters={radius:e,height:n,radialSegments:i,heightSegments:a,openEnded:s,thetaStart:r,thetaLength:o}}static fromJSON(e){return new $r(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class oi{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,n){const i=this.getUtoTmapping(e);return this.getPoint(i,n)}getPoints(e=5){const n=[];for(let i=0;i<=e;i++)n.push(this.getPoint(i/e));return n}getSpacedPoints(e=5){const n=[];for(let i=0;i<=e;i++)n.push(this.getPointAt(i/e));return n}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const n=[];let i,a=this.getPoint(0),s=0;n.push(0);for(let r=1;r<=e;r++)i=this.getPoint(r/e),s+=i.distanceTo(a),n.push(s),a=i;return this.cacheArcLengths=n,n}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,n=null){const i=this.getLengths();let a=0;const s=i.length;let r;n?r=n:r=e*i[s-1];let o=0,l=s-1,c;for(;o<=l;)if(a=Math.floor(o+(l-o)/2),c=i[a]-r,c<0)o=a+1;else if(c>0)l=a-1;else{l=a;break}if(a=l,i[a]===r)return a/(s-1);const u=i[a],f=i[a+1]-u,p=(r-u)/f;return(a+p)/(s-1)}getTangent(e,n){let a=e-1e-4,s=e+1e-4;a<0&&(a=0),s>1&&(s=1);const r=this.getPoint(a),o=this.getPoint(s),l=n||(r.isVector2?new ce:new L);return l.copy(o).sub(r).normalize(),l}getTangentAt(e,n){const i=this.getUtoTmapping(e);return this.getTangent(i,n)}computeFrenetFrames(e,n=!1){const i=new L,a=[],s=[],r=[],o=new L,l=new yt;for(let p=0;p<=e;p++){const _=p/e;a[p]=this.getTangentAt(_,new L)}s[0]=new L,r[0]=new L;let c=Number.MAX_VALUE;const u=Math.abs(a[0].x),d=Math.abs(a[0].y),f=Math.abs(a[0].z);u<=c&&(c=u,i.set(1,0,0)),d<=c&&(c=d,i.set(0,1,0)),f<=c&&i.set(0,0,1),o.crossVectors(a[0],i).normalize(),s[0].crossVectors(a[0],o),r[0].crossVectors(a[0],s[0]);for(let p=1;p<=e;p++){if(s[p]=s[p-1].clone(),r[p]=r[p-1].clone(),o.crossVectors(a[p-1],a[p]),o.length()>Number.EPSILON){o.normalize();const _=Math.acos(Ye(a[p-1].dot(a[p]),-1,1));s[p].applyMatrix4(l.makeRotationAxis(o,_))}r[p].crossVectors(a[p],s[p])}if(n===!0){let p=Math.acos(Ye(s[0].dot(s[e]),-1,1));p/=e,a[0].dot(o.crossVectors(s[0],s[e]))>0&&(p=-p);for(let _=1;_<=e;_++)s[_].applyMatrix4(l.makeRotationAxis(a[_],p*_)),r[_].crossVectors(a[_],s[_])}return{tangents:a,normals:s,binormals:r}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Mp extends oi{constructor(e=0,n=0,i=1,a=1,s=0,r=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=n,this.xRadius=i,this.yRadius=a,this.aStartAngle=s,this.aEndAngle=r,this.aClockwise=o,this.aRotation=l}getPoint(e,n=new ce){const i=n,a=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const r=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=a;for(;s>a;)s-=a;s<Number.EPSILON&&(r?s=0:s=a),this.aClockwise===!0&&!r&&(s===a?s=-a:s=s-a);const o=this.aStartAngle+e*s;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const u=Math.cos(this.aRotation),d=Math.sin(this.aRotation),f=l-this.aX,p=c-this.aY;l=f*u-p*d+this.aX,c=f*d+p*u+this.aY}return i.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class bw extends Mp{constructor(e,n,i,a,s,r){super(e,n,i,i,a,s,r),this.isArcCurve=!0,this.type="ArcCurve"}}function Tp(){let t=0,e=0,n=0,i=0;function a(s,r,o,l){t=s,e=o,n=-3*s+3*r-2*o-l,i=2*s-2*r+o+l}return{initCatmullRom:function(s,r,o,l,c){a(r,o,c*(o-s),c*(l-r))},initNonuniformCatmullRom:function(s,r,o,l,c,u,d){let f=(r-s)/c-(o-s)/(c+u)+(o-r)/u,p=(o-r)/u-(l-r)/(u+d)+(l-o)/d;f*=u,p*=u,a(r,o,f,p)},calc:function(s){const r=s*s,o=r*s;return t+e*s+n*r+i*o}}}const Bo=new L,_u=new Tp,gu=new Tp,vu=new Tp;class xw extends oi{constructor(e=[],n=!1,i="centripetal",a=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=n,this.curveType=i,this.tension=a}getPoint(e,n=new L){const i=n,a=this.points,s=a.length,r=(s-(this.closed?0:1))*e;let o=Math.floor(r),l=r-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/s)+1)*s:l===0&&o===s-1&&(o=s-2,l=1);let c,u;this.closed||o>0?c=a[(o-1)%s]:(Bo.subVectors(a[0],a[1]).add(a[0]),c=Bo);const d=a[o%s],f=a[(o+1)%s];if(this.closed||o+2<s?u=a[(o+2)%s]:(Bo.subVectors(a[s-1],a[s-2]).add(a[s-1]),u=Bo),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let _=Math.pow(c.distanceToSquared(d),p),g=Math.pow(d.distanceToSquared(f),p),m=Math.pow(f.distanceToSquared(u),p);g<1e-4&&(g=1),_<1e-4&&(_=g),m<1e-4&&(m=g),_u.initNonuniformCatmullRom(c.x,d.x,f.x,u.x,_,g,m),gu.initNonuniformCatmullRom(c.y,d.y,f.y,u.y,_,g,m),vu.initNonuniformCatmullRom(c.z,d.z,f.z,u.z,_,g,m)}else this.curveType==="catmullrom"&&(_u.initCatmullRom(c.x,d.x,f.x,u.x,this.tension),gu.initCatmullRom(c.y,d.y,f.y,u.y,this.tension),vu.initCatmullRom(c.z,d.z,f.z,u.z,this.tension));return i.set(_u.calc(l),gu.calc(l),vu.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let n=0,i=e.points.length;n<i;n++){const a=e.points[n];this.points.push(a.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let n=0,i=this.points.length;n<i;n++){const a=this.points[n];e.points.push(a.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let n=0,i=e.points.length;n<i;n++){const a=e.points[n];this.points.push(new L().fromArray(a))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Uh(t,e,n,i,a){const s=(i-e)*.5,r=(a-n)*.5,o=t*t,l=t*o;return(2*n-2*i+s+r)*l+(-3*n+3*i-2*s-r)*o+s*t+n}function Sw(t,e){const n=1-t;return n*n*e}function ww(t,e){return 2*(1-t)*t*e}function Ew(t,e){return t*t*e}function Mr(t,e,n,i){return Sw(t,e)+ww(t,n)+Ew(t,i)}function Mw(t,e){const n=1-t;return n*n*n*e}function Tw(t,e){const n=1-t;return 3*n*n*t*e}function Aw(t,e){return 3*(1-t)*t*t*e}function Cw(t,e){return t*t*t*e}function Tr(t,e,n,i,a){return Mw(t,e)+Tw(t,n)+Aw(t,i)+Cw(t,a)}class Fv extends oi{constructor(e=new ce,n=new ce,i=new ce,a=new ce){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=n,this.v2=i,this.v3=a}getPoint(e,n=new ce){const i=n,a=this.v0,s=this.v1,r=this.v2,o=this.v3;return i.set(Tr(e,a.x,s.x,r.x,o.x),Tr(e,a.y,s.y,r.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Rw extends oi{constructor(e=new L,n=new L,i=new L,a=new L){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=n,this.v2=i,this.v3=a}getPoint(e,n=new L){const i=n,a=this.v0,s=this.v1,r=this.v2,o=this.v3;return i.set(Tr(e,a.x,s.x,r.x,o.x),Tr(e,a.y,s.y,r.y,o.y),Tr(e,a.z,s.z,r.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Ov extends oi{constructor(e=new ce,n=new ce){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=n}getPoint(e,n=new ce){const i=n;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,n){return this.getPoint(e,n)}getTangent(e,n=new ce){return n.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,n){return this.getTangent(e,n)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Pw extends oi{constructor(e=new L,n=new L){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=n}getPoint(e,n=new L){const i=n;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,n){return this.getPoint(e,n)}getTangent(e,n=new L){return n.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,n){return this.getTangent(e,n)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Uv extends oi{constructor(e=new ce,n=new ce,i=new ce){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=n,this.v2=i}getPoint(e,n=new ce){const i=n,a=this.v0,s=this.v1,r=this.v2;return i.set(Mr(e,a.x,s.x,r.x),Mr(e,a.y,s.y,r.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Lw extends oi{constructor(e=new L,n=new L,i=new L){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=n,this.v2=i}getPoint(e,n=new L){const i=n,a=this.v0,s=this.v1,r=this.v2;return i.set(Mr(e,a.x,s.x,r.x),Mr(e,a.y,s.y,r.y),Mr(e,a.z,s.z,r.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Bv extends oi{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,n=new ce){const i=n,a=this.points,s=(a.length-1)*e,r=Math.floor(s),o=s-r,l=a[r===0?r:r-1],c=a[r],u=a[r>a.length-2?a.length-1:r+1],d=a[r>a.length-3?a.length-1:r+2];return i.set(Uh(o,l.x,c.x,u.x,d.x),Uh(o,l.y,c.y,u.y,d.y)),i}copy(e){super.copy(e),this.points=[];for(let n=0,i=e.points.length;n<i;n++){const a=e.points[n];this.points.push(a.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let n=0,i=this.points.length;n<i;n++){const a=this.points[n];e.points.push(a.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let n=0,i=e.points.length;n<i;n++){const a=e.points[n];this.points.push(new ce().fromArray(a))}return this}}var Bh=Object.freeze({__proto__:null,ArcCurve:bw,CatmullRomCurve3:xw,CubicBezierCurve:Fv,CubicBezierCurve3:Rw,EllipseCurve:Mp,LineCurve:Ov,LineCurve3:Pw,QuadraticBezierCurve:Uv,QuadraticBezierCurve3:Lw,SplineCurve:Bv});class Nw extends oi{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),n=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(n)){const i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Bh[i](n,e))}return this}getPoint(e,n){const i=e*this.getLength(),a=this.getCurveLengths();let s=0;for(;s<a.length;){if(a[s]>=i){const r=a[s]-i,o=this.curves[s],l=o.getLength(),c=l===0?0:1-r/l;return o.getPointAt(c,n)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let n=0;for(let i=0,a=this.curves.length;i<a;i++)n+=this.curves[i].getLength(),e.push(n);return this.cacheLengths=e,e}getSpacedPoints(e=40){const n=[];for(let i=0;i<=e;i++)n.push(this.getPoint(i/e));return this.autoClose&&n.push(n[0]),n}getPoints(e=12){const n=[];let i;for(let a=0,s=this.curves;a<s.length;a++){const r=s[a],o=r.isEllipseCurve?e*2:r.isLineCurve||r.isLineCurve3?1:r.isSplineCurve?e*r.points.length:e,l=r.getPoints(o);for(let c=0;c<l.length;c++){const u=l[c];i&&i.equals(u)||(n.push(u),i=u)}}return this.autoClose&&n.length>1&&!n[n.length-1].equals(n[0])&&n.push(n[0]),n}copy(e){super.copy(e),this.curves=[];for(let n=0,i=e.curves.length;n<i;n++){const a=e.curves[n];this.curves.push(a.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let n=0,i=this.curves.length;n<i;n++){const a=this.curves[n];e.curves.push(a.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let n=0,i=e.curves.length;n<i;n++){const a=e.curves[n];this.curves.push(new Bh[a.type]().fromJSON(a))}return this}}class zh extends Nw{constructor(e){super(),this.type="Path",this.currentPoint=new ce,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let n=1,i=e.length;n<i;n++)this.lineTo(e[n].x,e[n].y);return this}moveTo(e,n){return this.currentPoint.set(e,n),this}lineTo(e,n){const i=new Ov(this.currentPoint.clone(),new ce(e,n));return this.curves.push(i),this.currentPoint.set(e,n),this}quadraticCurveTo(e,n,i,a){const s=new Uv(this.currentPoint.clone(),new ce(e,n),new ce(i,a));return this.curves.push(s),this.currentPoint.set(i,a),this}bezierCurveTo(e,n,i,a,s,r){const o=new Fv(this.currentPoint.clone(),new ce(e,n),new ce(i,a),new ce(s,r));return this.curves.push(o),this.currentPoint.set(s,r),this}splineThru(e){const n=[this.currentPoint.clone()].concat(e),i=new Bv(n);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,n,i,a,s,r){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,n+l,i,a,s,r),this}absarc(e,n,i,a,s,r){return this.absellipse(e,n,i,i,a,s,r),this}ellipse(e,n,i,a,s,r,o,l){const c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+c,n+u,i,a,s,r,o,l),this}absellipse(e,n,i,a,s,r,o,l){const c=new Mp(e,n,i,a,s,r,o,l);if(this.curves.length>0){const d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);const u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Ap extends zh{constructor(e){super(e),this.uuid=ei(),this.type="Shape",this.holes=[]}getPointsHoles(e){const n=[];for(let i=0,a=this.holes.length;i<a;i++)n[i]=this.holes[i].getPoints(e);return n}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let n=0,i=e.holes.length;n<i;n++){const a=e.holes[n];this.holes.push(a.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let n=0,i=this.holes.length;n<i;n++){const a=this.holes[n];e.holes.push(a.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let n=0,i=e.holes.length;n<i;n++){const a=e.holes[n];this.holes.push(new zh().fromJSON(a))}return this}}function Iw(t,e,n=2){const i=e&&e.length,a=i?e[0]*n:t.length;let s=zv(t,0,a,n,!0);const r=[];if(!s||s.next===s.prev)return r;let o,l,c;if(i&&(s=Uw(t,e,s,n)),t.length>80*n){o=1/0,l=1/0;let u=-1/0,d=-1/0;for(let f=n;f<a;f+=n){const p=t[f],_=t[f+1];p<o&&(o=p),_<l&&(l=_),p>u&&(u=p),_>d&&(d=_)}c=Math.max(u-o,d-l),c=c!==0?32767/c:0}return Wr(s,r,n,o,l,c,0),r}function zv(t,e,n,i,a){let s;if(a===Kw(t,e,n,i)>0)for(let r=e;r<n;r+=i)s=Hh(r/i|0,t[r],t[r+1],s);else for(let r=n-i;r>=e;r-=i)s=Hh(r/i|0,t[r],t[r+1],s);return s&&Ds(s,s.next)&&(qr(s),s=s.next),s}function Ra(t,e){if(!t)return t;e||(e=t);let n=t,i;do if(i=!1,!n.steiner&&(Ds(n,n.next)||St(n.prev,n,n.next)===0)){if(qr(n),n=e=n.prev,n===n.next)break;i=!0}else n=n.next;while(i||n!==e);return e}function Wr(t,e,n,i,a,s,r){if(!t)return;!r&&s&&Gw(t,i,a,s);let o=t;for(;t.prev!==t.next;){const l=t.prev,c=t.next;if(s?kw(t,i,a,s):Dw(t)){e.push(l.i,t.i,c.i),qr(t),t=c.next,o=c.next;continue}if(t=c,t===o){r?r===1?(t=Fw(Ra(t),e),Wr(t,e,n,i,a,s,2)):r===2&&Ow(t,e,n,i,a,s):Wr(Ra(t),e,n,i,a,s,1);break}}}function Dw(t){const e=t.prev,n=t,i=t.next;if(St(e,n,i)>=0)return!1;const a=e.x,s=n.x,r=i.x,o=e.y,l=n.y,c=i.y,u=Math.min(a,s,r),d=Math.min(o,l,c),f=Math.max(a,s,r),p=Math.max(o,l,c);let _=i.next;for(;_!==e;){if(_.x>=u&&_.x<=f&&_.y>=d&&_.y<=p&&dr(a,o,s,l,r,c,_.x,_.y)&&St(_.prev,_,_.next)>=0)return!1;_=_.next}return!0}function kw(t,e,n,i){const a=t.prev,s=t,r=t.next;if(St(a,s,r)>=0)return!1;const o=a.x,l=s.x,c=r.x,u=a.y,d=s.y,f=r.y,p=Math.min(o,l,c),_=Math.min(u,d,f),g=Math.max(o,l,c),m=Math.max(u,d,f),h=nf(p,_,e,n,i),b=nf(g,m,e,n,i);let S=t.prevZ,y=t.nextZ;for(;S&&S.z>=h&&y&&y.z<=b;){if(S.x>=p&&S.x<=g&&S.y>=_&&S.y<=m&&S!==a&&S!==r&&dr(o,u,l,d,c,f,S.x,S.y)&&St(S.prev,S,S.next)>=0||(S=S.prevZ,y.x>=p&&y.x<=g&&y.y>=_&&y.y<=m&&y!==a&&y!==r&&dr(o,u,l,d,c,f,y.x,y.y)&&St(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;S&&S.z>=h;){if(S.x>=p&&S.x<=g&&S.y>=_&&S.y<=m&&S!==a&&S!==r&&dr(o,u,l,d,c,f,S.x,S.y)&&St(S.prev,S,S.next)>=0)return!1;S=S.prevZ}for(;y&&y.z<=b;){if(y.x>=p&&y.x<=g&&y.y>=_&&y.y<=m&&y!==a&&y!==r&&dr(o,u,l,d,c,f,y.x,y.y)&&St(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function Fw(t,e){let n=t;do{const i=n.prev,a=n.next.next;!Ds(i,a)&&Vv(i,n,n.next,a)&&Xr(i,a)&&Xr(a,i)&&(e.push(i.i,n.i,a.i),qr(n),qr(n.next),n=t=a),n=n.next}while(n!==t);return Ra(n)}function Ow(t,e,n,i,a,s){let r=t;do{let o=r.next.next;for(;o!==r.prev;){if(r.i!==o.i&&Xw(r,o)){let l=Gv(r,o);r=Ra(r,r.next),l=Ra(l,l.next),Wr(r,e,n,i,a,s,0),Wr(l,e,n,i,a,s,0);return}o=o.next}r=r.next}while(r!==t)}function Uw(t,e,n,i){const a=[];for(let s=0,r=e.length;s<r;s++){const o=e[s]*i,l=s<r-1?e[s+1]*i:t.length,c=zv(t,o,l,i,!1);c===c.next&&(c.steiner=!0),a.push(Ww(c))}a.sort(Bw);for(let s=0;s<a.length;s++)n=zw(a[s],n);return n}function Bw(t,e){let n=t.x-e.x;if(n===0&&(n=t.y-e.y,n===0)){const i=(t.next.y-t.y)/(t.next.x-t.x),a=(e.next.y-e.y)/(e.next.x-e.x);n=i-a}return n}function zw(t,e){const n=Hw(t,e);if(!n)return e;const i=Gv(n,t);return Ra(i,i.next),Ra(n,n.next)}function Hw(t,e){let n=e;const i=t.x,a=t.y;let s=-1/0,r;if(Ds(t,n))return n;do{if(Ds(t,n.next))return n.next;if(a<=n.y&&a>=n.next.y&&n.next.y!==n.y){const d=n.x+(a-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(d<=i&&d>s&&(s=d,r=n.x<n.next.x?n:n.next,d===i))return r}n=n.next}while(n!==e);if(!r)return null;const o=r,l=r.x,c=r.y;let u=1/0;n=r;do{if(i>=n.x&&n.x>=l&&i!==n.x&&Hv(a<c?i:s,a,l,c,a<c?s:i,a,n.x,n.y)){const d=Math.abs(a-n.y)/(i-n.x);Xr(n,t)&&(d<u||d===u&&(n.x>r.x||n.x===r.x&&Vw(r,n)))&&(r=n,u=d)}n=n.next}while(n!==o);return r}function Vw(t,e){return St(t.prev,t,e.prev)<0&&St(e.next,t,t.next)<0}function Gw(t,e,n,i){let a=t;do a.z===0&&(a.z=nf(a.x,a.y,e,n,i)),a.prevZ=a.prev,a.nextZ=a.next,a=a.next;while(a!==t);a.prevZ.nextZ=null,a.prevZ=null,$w(a)}function $w(t){let e,n=1;do{let i=t,a;t=null;let s=null;for(e=0;i;){e++;let r=i,o=0;for(let c=0;c<n&&(o++,r=r.nextZ,!!r);c++);let l=n;for(;o>0||l>0&&r;)o!==0&&(l===0||!r||i.z<=r.z)?(a=i,i=i.nextZ,o--):(a=r,r=r.nextZ,l--),s?s.nextZ=a:t=a,a.prevZ=s,s=a;i=r}s.nextZ=null,n*=2}while(e>1);return t}function nf(t,e,n,i,a){return t=(t-n)*a|0,e=(e-i)*a|0,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,t|e<<1}function Ww(t){let e=t,n=t;do(e.x<n.x||e.x===n.x&&e.y<n.y)&&(n=e),e=e.next;while(e!==t);return n}function Hv(t,e,n,i,a,s,r,o){return(a-r)*(e-o)>=(t-r)*(s-o)&&(t-r)*(i-o)>=(n-r)*(e-o)&&(n-r)*(s-o)>=(a-r)*(i-o)}function dr(t,e,n,i,a,s,r,o){return!(t===r&&e===o)&&Hv(t,e,n,i,a,s,r,o)}function Xw(t,e){return t.next.i!==e.i&&t.prev.i!==e.i&&!qw(t,e)&&(Xr(t,e)&&Xr(e,t)&&Yw(t,e)&&(St(t.prev,t,e.prev)||St(t,e.prev,e))||Ds(t,e)&&St(t.prev,t,t.next)>0&&St(e.prev,e,e.next)>0)}function St(t,e,n){return(e.y-t.y)*(n.x-e.x)-(e.x-t.x)*(n.y-e.y)}function Ds(t,e){return t.x===e.x&&t.y===e.y}function Vv(t,e,n,i){const a=Ho(St(t,e,n)),s=Ho(St(t,e,i)),r=Ho(St(n,i,t)),o=Ho(St(n,i,e));return!!(a!==s&&r!==o||a===0&&zo(t,n,e)||s===0&&zo(t,i,e)||r===0&&zo(n,t,i)||o===0&&zo(n,e,i))}function zo(t,e,n){return e.x<=Math.max(t.x,n.x)&&e.x>=Math.min(t.x,n.x)&&e.y<=Math.max(t.y,n.y)&&e.y>=Math.min(t.y,n.y)}function Ho(t){return t>0?1:t<0?-1:0}function qw(t,e){let n=t;do{if(n.i!==t.i&&n.next.i!==t.i&&n.i!==e.i&&n.next.i!==e.i&&Vv(n,n.next,t,e))return!0;n=n.next}while(n!==t);return!1}function Xr(t,e){return St(t.prev,t,t.next)<0?St(t,e,t.next)>=0&&St(t,t.prev,e)>=0:St(t,e,t.prev)<0||St(t,t.next,e)<0}function Yw(t,e){let n=t,i=!1;const a=(t.x+e.x)/2,s=(t.y+e.y)/2;do n.y>s!=n.next.y>s&&n.next.y!==n.y&&a<(n.next.x-n.x)*(s-n.y)/(n.next.y-n.y)+n.x&&(i=!i),n=n.next;while(n!==t);return i}function Gv(t,e){const n=af(t.i,t.x,t.y),i=af(e.i,e.x,e.y),a=t.next,s=e.prev;return t.next=e,e.prev=t,n.next=a,a.prev=n,i.next=n,n.prev=i,s.next=i,i.prev=s,i}function Hh(t,e,n,i){const a=af(t,e,n);return i?(a.next=i.next,a.prev=i,i.next.prev=a,i.next=a):(a.prev=a,a.next=a),a}function qr(t){t.next.prev=t.prev,t.prev.next=t.next,t.prevZ&&(t.prevZ.nextZ=t.nextZ),t.nextZ&&(t.nextZ.prevZ=t.prevZ)}function af(t,e,n){return{i:t,x:e,y:n,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Kw(t,e,n,i){let a=0;for(let s=e,r=n-i;s<n;s+=i)a+=(t[r]-t[s])*(t[s+1]+t[r+1]),r=s;return a}class jw{static triangulate(e,n,i=2){return Iw(e,n,i)}}class Ar{static area(e){const n=e.length;let i=0;for(let a=n-1,s=0;s<n;a=s++)i+=e[a].x*e[s].y-e[s].x*e[a].y;return i*.5}static isClockWise(e){return Ar.area(e)<0}static triangulateShape(e,n){const i=[],a=[],s=[];Vh(e),Gh(i,e);let r=e.length;n.forEach(Vh);for(let l=0;l<n.length;l++)a.push(r),r+=n[l].length,Gh(i,n[l]);const o=jw.triangulate(i,a);for(let l=0;l<o.length;l+=3)s.push(o.slice(l,l+3));return s}}function Vh(t){const e=t.length;e>2&&t[e-1].equals(t[0])&&t.pop()}function Gh(t,e){for(let n=0;n<e.length;n++)t.push(e[n].x),t.push(e[n].y)}class an extends At{constructor(e=1,n=1,i=1,a=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:i,heightSegments:a};const s=e/2,r=n/2,o=Math.floor(i),l=Math.floor(a),c=o+1,u=l+1,d=e/o,f=n/l,p=[],_=[],g=[],m=[];for(let h=0;h<u;h++){const b=h*f-r;for(let S=0;S<c;S++){const y=S*d-s;_.push(y,-b,0),g.push(0,0,1),m.push(S/o),m.push(1-h/l)}}for(let h=0;h<l;h++)for(let b=0;b<o;b++){const S=b+c*h,y=b+c*(h+1),C=b+1+c*(h+1),M=b+1+c*h;p.push(S,y,M),p.push(y,C,M)}this.setIndex(p),this.setAttribute("position",new it(_,3)),this.setAttribute("normal",new it(g,3)),this.setAttribute("uv",new it(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new an(e.width,e.height,e.widthSegments,e.heightSegments)}}class ka extends At{constructor(e=.5,n=1,i=32,a=1,s=0,r=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:n,thetaSegments:i,phiSegments:a,thetaStart:s,thetaLength:r},i=Math.max(3,i),a=Math.max(1,a);const o=[],l=[],c=[],u=[];let d=e;const f=(n-e)/a,p=new L,_=new ce;for(let g=0;g<=a;g++){for(let m=0;m<=i;m++){const h=s+m/i*r;p.x=d*Math.cos(h),p.y=d*Math.sin(h),l.push(p.x,p.y,p.z),c.push(0,0,1),_.x=(p.x/n+1)/2,_.y=(p.y/n+1)/2,u.push(_.x,_.y)}d+=f}for(let g=0;g<a;g++){const m=g*(i+1);for(let h=0;h<i;h++){const b=h+m,S=b,y=b+i+1,C=b+i+2,M=b+1;o.push(S,y,M),o.push(y,C,M)}}this.setIndex(o),this.setAttribute("position",new it(l,3)),this.setAttribute("normal",new it(c,3)),this.setAttribute("uv",new it(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ka(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Ac extends At{constructor(e=new Ap([new ce(0,.5),new ce(-.5,-.5),new ce(.5,-.5)]),n=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:n};const i=[],a=[],s=[],r=[];let o=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let u=0;u<e.length;u++)c(e[u]),this.addGroup(o,l,u),o+=l,l=0;this.setIndex(i),this.setAttribute("position",new it(a,3)),this.setAttribute("normal",new it(s,3)),this.setAttribute("uv",new it(r,2));function c(u){const d=a.length/3,f=u.extractPoints(n);let p=f.shape;const _=f.holes;Ar.isClockWise(p)===!1&&(p=p.reverse());for(let m=0,h=_.length;m<h;m++){const b=_[m];Ar.isClockWise(b)===!0&&(_[m]=b.reverse())}const g=Ar.triangulateShape(p,_);for(let m=0,h=_.length;m<h;m++){const b=_[m];p=p.concat(b)}for(let m=0,h=p.length;m<h;m++){const b=p[m];a.push(b.x,b.y,0),s.push(0,0,1),r.push(b.x,b.y)}for(let m=0,h=g.length;m<h;m++){const b=g[m],S=b[0]+d,y=b[1]+d,C=b[2]+d;i.push(S,y,C),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),n=this.parameters.shapes;return Zw(n,e)}static fromJSON(e,n){const i=[];for(let a=0,s=e.shapes.length;a<s;a++){const r=n[e.shapes[a]];i.push(r)}return new Ac(i,e.curveSegments)}}function Zw(t,e){if(e.shapes=[],Array.isArray(t))for(let n=0,i=t.length;n<i;n++){const a=t[n];e.shapes.push(a.uuid)}else e.shapes.push(t.uuid);return e}class ks extends At{constructor(e=1,n=32,i=16,a=0,s=Math.PI*2,r=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:n,heightSegments:i,phiStart:a,phiLength:s,thetaStart:r,thetaLength:o},n=Math.max(3,Math.floor(n)),i=Math.max(2,Math.floor(i));const l=Math.min(r+o,Math.PI);let c=0;const u=[],d=new L,f=new L,p=[],_=[],g=[],m=[];for(let h=0;h<=i;h++){const b=[],S=h/i;let y=0;h===0&&r===0?y=.5/n:h===i&&l===Math.PI&&(y=-.5/n);for(let C=0;C<=n;C++){const M=C/n;d.x=-e*Math.cos(a+M*s)*Math.sin(r+S*o),d.y=e*Math.cos(r+S*o),d.z=e*Math.sin(a+M*s)*Math.sin(r+S*o),_.push(d.x,d.y,d.z),f.copy(d).normalize(),g.push(f.x,f.y,f.z),m.push(M+y,1-S),b.push(c++)}u.push(b)}for(let h=0;h<i;h++)for(let b=0;b<n;b++){const S=u[h][b+1],y=u[h][b],C=u[h+1][b],M=u[h+1][b+1];(h!==0||r>0)&&p.push(S,y,M),(h!==i-1||l<Math.PI)&&p.push(y,C,M)}this.setIndex(p),this.setAttribute("position",new it(_,3)),this.setAttribute("normal",new it(g,3)),this.setAttribute("uv",new it(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ks(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Cp extends At{constructor(e=1,n=.4,i=12,a=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:n,radialSegments:i,tubularSegments:a,arc:s},i=Math.floor(i),a=Math.floor(a);const r=[],o=[],l=[],c=[],u=new L,d=new L,f=new L;for(let p=0;p<=i;p++)for(let _=0;_<=a;_++){const g=_/a*s,m=p/i*Math.PI*2;d.x=(e+n*Math.cos(m))*Math.cos(g),d.y=(e+n*Math.cos(m))*Math.sin(g),d.z=n*Math.sin(m),o.push(d.x,d.y,d.z),u.x=e*Math.cos(g),u.y=e*Math.sin(g),f.subVectors(d,u).normalize(),l.push(f.x,f.y,f.z),c.push(_/a),c.push(p/i)}for(let p=1;p<=i;p++)for(let _=1;_<=a;_++){const g=(a+1)*p+_-1,m=(a+1)*(p-1)+_-1,h=(a+1)*(p-1)+_,b=(a+1)*p+_;r.push(g,m,b),r.push(m,h,b)}this.setIndex(r),this.setAttribute("position",new it(o,3)),this.setAttribute("normal",new it(l,3)),this.setAttribute("uv",new it(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Cp(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Zl extends Mi{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new je(16777215),this.specular=new je(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new je(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=yp,this.normalScale=new ce(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new $n,this.combine=xc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class $v extends Mi{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new je(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new je(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=yp,this.normalScale=new ce(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new $n,this.combine=xc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Jw extends Mi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=gS,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Qw extends Mi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Wv extends Lt{constructor(e,n=1){super(),this.isLight=!0,this.type="Light",this.color=new je(e),this.intensity=n}dispose(){}copy(e,n){return super.copy(e,n),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const n=super.toJSON(e);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,this.groundColor!==void 0&&(n.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(n.object.distance=this.distance),this.angle!==void 0&&(n.object.angle=this.angle),this.decay!==void 0&&(n.object.decay=this.decay),this.penumbra!==void 0&&(n.object.penumbra=this.penumbra),this.shadow!==void 0&&(n.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(n.object.target=this.target.uuid),n}}const yu=new yt,$h=new L,Wh=new L;class eE{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ce(512,512),this.mapType=si,this.map=null,this.mapPass=null,this.matrix=new yt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new wp,this._frameExtents=new ce(1,1),this._viewportCount=1,this._viewports=[new Mt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const n=this.camera,i=this.matrix;$h.setFromMatrixPosition(e.matrixWorld),n.position.copy($h),Wh.setFromMatrixPosition(e.target.matrixWorld),n.lookAt(Wh),n.updateMatrixWorld(),yu.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(yu,n.coordinateSystem,n.reversedDepth),n.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(yu)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Xv extends Rv{constructor(e=-1,n=1,i=1,a=-1,s=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=i,this.bottom=a,this.near=s,this.far=r,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,i,a,s,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=a,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,a=(this.top+this.bottom)/2;let s=i-e,r=i+e,o=a+n,l=a-n;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,r=s+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,r,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}class tE extends eE{constructor(){super(new Xv(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Xh extends Wv{constructor(e,n){super(e,n),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Lt.DEFAULT_UP),this.updateMatrix(),this.target=new Lt,this.shadow=new tE}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class nE extends Wv{constructor(e,n){super(e,n),this.isAmbientLight=!0,this.type="AmbientLight"}}class iE extends wn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class qh{constructor(e=1,n=0,i=0){this.radius=e,this.phi=n,this.theta=i}set(e,n,i){return this.radius=e,this.phi=n,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Ye(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,n,i){return this.radius=Math.sqrt(e*e+n*n+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(Ye(n/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const Yh=new L;let Vo,bu;class aE extends Lt{constructor(e=new L(0,0,1),n=new L(0,0,0),i=1,a=16776960,s=i*.2,r=s*.2){super(),this.type="ArrowHelper",Vo===void 0&&(Vo=new At,Vo.setAttribute("position",new it([0,0,0,0,1,0],3)),bu=new $r(.5,1,5,1),bu.translate(0,-.5,0)),this.position.copy(n),this.line=new Ep(Vo,new Ec({color:a,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new He(bu,new st({color:a,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(e),this.setLength(i,s,r)}setDirection(e){if(e.y>.99999)this.quaternion.set(0,0,0,1);else if(e.y<-.99999)this.quaternion.set(1,0,0,0);else{Yh.set(e.z,0,-e.x).normalize();const n=Math.acos(e.y);this.quaternion.setFromAxisAngle(Yh,n)}}setLength(e,n=e*.2,i=n*.2){this.line.scale.set(1,Math.max(1e-4,e-n),1),this.line.updateMatrix(),this.cone.scale.set(i,n,i),this.cone.position.y=e,this.cone.updateMatrix()}setColor(e){this.line.material.color.set(e),this.cone.material.color.set(e)}copy(e){return super.copy(e,!1),this.line.copy(e.line),this.cone.copy(e.cone),this}dispose(){this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}}class sE extends Ia{constructor(e,n=null){super(),this.object=e,this.domElement=n,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function Kh(t,e,n,i){const a=rE(i);switch(n){case gv:return t*e;case yv:return t*e/a.components*a.byteLength;case _p:return t*e/a.components*a.byteLength;case bv:return t*e*2/a.components*a.byteLength;case gp:return t*e*2/a.components*a.byteLength;case vv:return t*e*3/a.components*a.byteLength;case Bn:return t*e*4/a.components*a.byteLength;case vp:return t*e*4/a.components*a.byteLength;case vl:case yl:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case bl:case xl:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case Cd:case Pd:return Math.max(t,16)*Math.max(e,8)/4;case Ad:case Rd:return Math.max(t,8)*Math.max(e,8)/2;case Ld:case Nd:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case Id:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case Dd:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case kd:return Math.floor((t+4)/5)*Math.floor((e+3)/4)*16;case Fd:return Math.floor((t+4)/5)*Math.floor((e+4)/5)*16;case Od:return Math.floor((t+5)/6)*Math.floor((e+4)/5)*16;case Ud:return Math.floor((t+5)/6)*Math.floor((e+5)/6)*16;case Bd:return Math.floor((t+7)/8)*Math.floor((e+4)/5)*16;case zd:return Math.floor((t+7)/8)*Math.floor((e+5)/6)*16;case Hd:return Math.floor((t+7)/8)*Math.floor((e+7)/8)*16;case Vd:return Math.floor((t+9)/10)*Math.floor((e+4)/5)*16;case Gd:return Math.floor((t+9)/10)*Math.floor((e+5)/6)*16;case $d:return Math.floor((t+9)/10)*Math.floor((e+7)/8)*16;case Wd:return Math.floor((t+9)/10)*Math.floor((e+9)/10)*16;case Xd:return Math.floor((t+11)/12)*Math.floor((e+9)/10)*16;case qd:return Math.floor((t+11)/12)*Math.floor((e+11)/12)*16;case Yd:case Kd:case jd:return Math.ceil(t/4)*Math.ceil(e/4)*16;case Zd:case Jd:return Math.ceil(t/4)*Math.ceil(e/4)*8;case Qd:case ef:return Math.ceil(t/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function rE(t){switch(t){case si:case pv:return{byteLength:1,components:1};case Ur:case hv:case oo:return{byteLength:2,components:1};case hp:case mp:return{byteLength:2,components:4};case Aa:case pp:case bi:return{byteLength:4,components:1};case mv:case _v:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${t}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:fp}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=fp);function qv(){let t=null,e=!1,n=null,i=null;function a(s,r){n(s,r),i=t.requestAnimationFrame(a)}return{start:function(){e!==!0&&n!==null&&(i=t.requestAnimationFrame(a),e=!0)},stop:function(){t.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){n=s},setContext:function(s){t=s}}}function oE(t){const e=new WeakMap;function n(o,l){const c=o.array,u=o.usage,d=c.byteLength,f=t.createBuffer();t.bindBuffer(l,f),t.bufferData(l,c,u),o.onUploadCallback();let p;if(c instanceof Float32Array)p=t.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=t.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=t.HALF_FLOAT:p=t.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=t.SHORT;else if(c instanceof Uint32Array)p=t.UNSIGNED_INT;else if(c instanceof Int32Array)p=t.INT;else if(c instanceof Int8Array)p=t.BYTE;else if(c instanceof Uint8Array)p=t.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=t.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function i(o,l,c){const u=l.array,d=l.updateRanges;if(t.bindBuffer(c,o),d.length===0)t.bufferSubData(c,0,u);else{d.sort((p,_)=>p.start-_.start);let f=0;for(let p=1;p<d.length;p++){const _=d[f],g=d[p];g.start<=_.start+_.count+1?_.count=Math.max(_.count,g.start+g.count-_.start):(++f,d[f]=g)}d.length=f+1;for(let p=0,_=d.length;p<_;p++){const g=d[p];t.bufferSubData(c,g.start*u.BYTES_PER_ELEMENT,u,g.start,g.count)}l.clearUpdateRanges()}l.onUploadCallback()}function a(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(t.deleteBuffer(l.buffer),e.delete(o))}function r(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,n(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:a,remove:s,update:r}}var lE=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,cE=`#ifdef USE_ALPHAHASH
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
#endif`,uE=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,dE=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,fE=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,pE=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,hE=`#ifdef USE_AOMAP
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
#endif`,mE=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,_E=`#ifdef USE_BATCHING
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
#endif`,gE=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,vE=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,yE=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bE=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,xE=`#ifdef USE_IRIDESCENCE
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
#endif`,SE=`#ifdef USE_BUMPMAP
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
#endif`,wE=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,EE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,ME=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,TE=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,AE=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,CE=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,RE=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,PE=`#if defined( USE_COLOR_ALPHA )
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
#endif`,LE=`#define PI 3.141592653589793
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
} // validated`,NE=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,IE=`vec3 transformedNormal = objectNormal;
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
#endif`,DE=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,kE=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,FE=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,OE=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,UE="gl_FragColor = linearToOutputTexel( gl_FragColor );",BE=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,zE=`#ifdef USE_ENVMAP
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
#endif`,HE=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,VE=`#ifdef USE_ENVMAP
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
#endif`,GE=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,$E=`#ifdef USE_ENVMAP
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
#endif`,WE=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,XE=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,qE=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,YE=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,KE=`#ifdef USE_GRADIENTMAP
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
}`,jE=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ZE=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,JE=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,QE=`uniform bool receiveShadow;
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
#endif`,eM=`#ifdef USE_ENVMAP
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
#endif`,tM=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,nM=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,iM=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,aM=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,sM=`PhysicalMaterial material;
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
#endif`,rM=`struct PhysicalMaterial {
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
}`,oM=`
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
#endif`,lM=`#if defined( RE_IndirectDiffuse )
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
#endif`,cM=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,uM=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,dM=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,fM=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,pM=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,hM=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,mM=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,_M=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,gM=`#if defined( USE_POINTS_UV )
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
#endif`,vM=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,yM=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,bM=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,xM=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,SM=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,wM=`#ifdef USE_MORPHTARGETS
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
#endif`,EM=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,MM=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,TM=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,AM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,CM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,RM=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,PM=`#ifdef USE_NORMALMAP
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
#endif`,LM=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,NM=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,IM=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,DM=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,kM=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,FM=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,OM=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,UM=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,BM=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,zM=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,HM=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,VM=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,GM=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,$M=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,WM=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,XM=`float getShadowMask() {
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
}`,qM=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,YM=`#ifdef USE_SKINNING
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
#endif`,KM=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,jM=`#ifdef USE_SKINNING
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
#endif`,ZM=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,JM=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,QM=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,eT=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,tT=`#ifdef USE_TRANSMISSION
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
#endif`,nT=`#ifdef USE_TRANSMISSION
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
#endif`,iT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,aT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,sT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,rT=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const oT=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,lT=`uniform sampler2D t2D;
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
}`,cT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,uT=`#ifdef ENVMAP_TYPE_CUBE
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
}`,dT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,fT=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,pT=`#include <common>
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
}`,hT=`#if DEPTH_PACKING == 3200
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
}`,mT=`#define DISTANCE
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
}`,_T=`#define DISTANCE
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
}`,gT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,vT=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,yT=`uniform float scale;
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
}`,bT=`uniform vec3 diffuse;
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
}`,xT=`#include <common>
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
}`,ST=`uniform vec3 diffuse;
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
}`,wT=`#define LAMBERT
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
}`,ET=`#define LAMBERT
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
}`,MT=`#define MATCAP
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
}`,TT=`#define MATCAP
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
}`,AT=`#define NORMAL
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
}`,CT=`#define NORMAL
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
}`,RT=`#define PHONG
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
}`,PT=`#define PHONG
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
}`,LT=`#define STANDARD
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
}`,NT=`#define STANDARD
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
}`,IT=`#define TOON
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
}`,DT=`#define TOON
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
}`,kT=`uniform float size;
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
}`,FT=`uniform vec3 diffuse;
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
}`,OT=`#include <common>
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
}`,UT=`uniform vec3 color;
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
}`,BT=`uniform float rotation;
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
}`,zT=`uniform vec3 diffuse;
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
}`,qe={alphahash_fragment:lE,alphahash_pars_fragment:cE,alphamap_fragment:uE,alphamap_pars_fragment:dE,alphatest_fragment:fE,alphatest_pars_fragment:pE,aomap_fragment:hE,aomap_pars_fragment:mE,batching_pars_vertex:_E,batching_vertex:gE,begin_vertex:vE,beginnormal_vertex:yE,bsdfs:bE,iridescence_fragment:xE,bumpmap_pars_fragment:SE,clipping_planes_fragment:wE,clipping_planes_pars_fragment:EE,clipping_planes_pars_vertex:ME,clipping_planes_vertex:TE,color_fragment:AE,color_pars_fragment:CE,color_pars_vertex:RE,color_vertex:PE,common:LE,cube_uv_reflection_fragment:NE,defaultnormal_vertex:IE,displacementmap_pars_vertex:DE,displacementmap_vertex:kE,emissivemap_fragment:FE,emissivemap_pars_fragment:OE,colorspace_fragment:UE,colorspace_pars_fragment:BE,envmap_fragment:zE,envmap_common_pars_fragment:HE,envmap_pars_fragment:VE,envmap_pars_vertex:GE,envmap_physical_pars_fragment:eM,envmap_vertex:$E,fog_vertex:WE,fog_pars_vertex:XE,fog_fragment:qE,fog_pars_fragment:YE,gradientmap_pars_fragment:KE,lightmap_pars_fragment:jE,lights_lambert_fragment:ZE,lights_lambert_pars_fragment:JE,lights_pars_begin:QE,lights_toon_fragment:tM,lights_toon_pars_fragment:nM,lights_phong_fragment:iM,lights_phong_pars_fragment:aM,lights_physical_fragment:sM,lights_physical_pars_fragment:rM,lights_fragment_begin:oM,lights_fragment_maps:lM,lights_fragment_end:cM,logdepthbuf_fragment:uM,logdepthbuf_pars_fragment:dM,logdepthbuf_pars_vertex:fM,logdepthbuf_vertex:pM,map_fragment:hM,map_pars_fragment:mM,map_particle_fragment:_M,map_particle_pars_fragment:gM,metalnessmap_fragment:vM,metalnessmap_pars_fragment:yM,morphinstance_vertex:bM,morphcolor_vertex:xM,morphnormal_vertex:SM,morphtarget_pars_vertex:wM,morphtarget_vertex:EM,normal_fragment_begin:MM,normal_fragment_maps:TM,normal_pars_fragment:AM,normal_pars_vertex:CM,normal_vertex:RM,normalmap_pars_fragment:PM,clearcoat_normal_fragment_begin:LM,clearcoat_normal_fragment_maps:NM,clearcoat_pars_fragment:IM,iridescence_pars_fragment:DM,opaque_fragment:kM,packing:FM,premultiplied_alpha_fragment:OM,project_vertex:UM,dithering_fragment:BM,dithering_pars_fragment:zM,roughnessmap_fragment:HM,roughnessmap_pars_fragment:VM,shadowmap_pars_fragment:GM,shadowmap_pars_vertex:$M,shadowmap_vertex:WM,shadowmask_pars_fragment:XM,skinbase_vertex:qM,skinning_pars_vertex:YM,skinning_vertex:KM,skinnormal_vertex:jM,specularmap_fragment:ZM,specularmap_pars_fragment:JM,tonemapping_fragment:QM,tonemapping_pars_fragment:eT,transmission_fragment:tT,transmission_pars_fragment:nT,uv_pars_fragment:iT,uv_pars_vertex:aT,uv_vertex:sT,worldpos_vertex:rT,background_vert:oT,background_frag:lT,backgroundCube_vert:cT,backgroundCube_frag:uT,cube_vert:dT,cube_frag:fT,depth_vert:pT,depth_frag:hT,distanceRGBA_vert:mT,distanceRGBA_frag:_T,equirect_vert:gT,equirect_frag:vT,linedashed_vert:yT,linedashed_frag:bT,meshbasic_vert:xT,meshbasic_frag:ST,meshlambert_vert:wT,meshlambert_frag:ET,meshmatcap_vert:MT,meshmatcap_frag:TT,meshnormal_vert:AT,meshnormal_frag:CT,meshphong_vert:RT,meshphong_frag:PT,meshphysical_vert:LT,meshphysical_frag:NT,meshtoon_vert:IT,meshtoon_frag:DT,points_vert:kT,points_frag:FT,shadow_vert:OT,shadow_frag:UT,sprite_vert:BT,sprite_frag:zT},fe={common:{diffuse:{value:new je(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new We}},envmap:{envMap:{value:null},envMapRotation:{value:new We},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new We}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new We}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new We},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new We},normalScale:{value:new ce(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new We},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new We}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new We}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new We}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new je(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new je(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0},uvTransform:{value:new We}},sprite:{diffuse:{value:new je(16777215)},opacity:{value:1},center:{value:new ce(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}}},Kn={basic:{uniforms:Kt([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.fog]),vertexShader:qe.meshbasic_vert,fragmentShader:qe.meshbasic_frag},lambert:{uniforms:Kt([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,fe.lights,{emissive:{value:new je(0)}}]),vertexShader:qe.meshlambert_vert,fragmentShader:qe.meshlambert_frag},phong:{uniforms:Kt([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,fe.lights,{emissive:{value:new je(0)},specular:{value:new je(1118481)},shininess:{value:30}}]),vertexShader:qe.meshphong_vert,fragmentShader:qe.meshphong_frag},standard:{uniforms:Kt([fe.common,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.roughnessmap,fe.metalnessmap,fe.fog,fe.lights,{emissive:{value:new je(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:qe.meshphysical_vert,fragmentShader:qe.meshphysical_frag},toon:{uniforms:Kt([fe.common,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.gradientmap,fe.fog,fe.lights,{emissive:{value:new je(0)}}]),vertexShader:qe.meshtoon_vert,fragmentShader:qe.meshtoon_frag},matcap:{uniforms:Kt([fe.common,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,{matcap:{value:null}}]),vertexShader:qe.meshmatcap_vert,fragmentShader:qe.meshmatcap_frag},points:{uniforms:Kt([fe.points,fe.fog]),vertexShader:qe.points_vert,fragmentShader:qe.points_frag},dashed:{uniforms:Kt([fe.common,fe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:qe.linedashed_vert,fragmentShader:qe.linedashed_frag},depth:{uniforms:Kt([fe.common,fe.displacementmap]),vertexShader:qe.depth_vert,fragmentShader:qe.depth_frag},normal:{uniforms:Kt([fe.common,fe.bumpmap,fe.normalmap,fe.displacementmap,{opacity:{value:1}}]),vertexShader:qe.meshnormal_vert,fragmentShader:qe.meshnormal_frag},sprite:{uniforms:Kt([fe.sprite,fe.fog]),vertexShader:qe.sprite_vert,fragmentShader:qe.sprite_frag},background:{uniforms:{uvTransform:{value:new We},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:qe.background_vert,fragmentShader:qe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new We}},vertexShader:qe.backgroundCube_vert,fragmentShader:qe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:qe.cube_vert,fragmentShader:qe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:qe.equirect_vert,fragmentShader:qe.equirect_frag},distanceRGBA:{uniforms:Kt([fe.common,fe.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:qe.distanceRGBA_vert,fragmentShader:qe.distanceRGBA_frag},shadow:{uniforms:Kt([fe.lights,fe.fog,{color:{value:new je(0)},opacity:{value:1}}]),vertexShader:qe.shadow_vert,fragmentShader:qe.shadow_frag}};Kn.physical={uniforms:Kt([Kn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new We},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new We},clearcoatNormalScale:{value:new ce(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new We},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new We},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new We},sheen:{value:0},sheenColor:{value:new je(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new We},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new We},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new We},transmissionSamplerSize:{value:new ce},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new We},attenuationDistance:{value:0},attenuationColor:{value:new je(0)},specularColor:{value:new je(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new We},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new We},anisotropyVector:{value:new ce},anisotropyMap:{value:null},anisotropyMapTransform:{value:new We}}]),vertexShader:qe.meshphysical_vert,fragmentShader:qe.meshphysical_frag};const Go={r:0,b:0,g:0},la=new $n,HT=new yt;function VT(t,e,n,i,a,s,r){const o=new je(0);let l=s===!0?0:1,c,u,d=null,f=0,p=null;function _(S){let y=S.isScene===!0?S.background:null;return y&&y.isTexture&&(y=(S.backgroundBlurriness>0?n:e).get(y)),y}function g(S){let y=!1;const C=_(S);C===null?h(o,l):C&&C.isColor&&(h(C,1),y=!0);const M=t.xr.getEnvironmentBlendMode();M==="additive"?i.buffers.color.setClear(0,0,0,1,r):M==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,r),(t.autoClear||y)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil))}function m(S,y){const C=_(y);C&&(C.isCubeTexture||C.mapping===Sc)?(u===void 0&&(u=new He(new Da(1,1,1),new Ki({name:"BackgroundCubeMaterial",uniforms:Is(Kn.backgroundCube.uniforms),vertexShader:Kn.backgroundCube.vertexShader,fragmentShader:Kn.backgroundCube.fragmentShader,side:on,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(M,T,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),a.update(u)),la.copy(y.backgroundRotation),la.x*=-1,la.y*=-1,la.z*=-1,C.isCubeTexture&&C.isRenderTargetTexture===!1&&(la.y*=-1,la.z*=-1),u.material.uniforms.envMap.value=C,u.material.uniforms.flipEnvMap.value=C.isCubeTexture&&C.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(HT.makeRotationFromEuler(la)),u.material.toneMapped=tt.getTransfer(C.colorSpace)!==ct,(d!==C||f!==C.version||p!==t.toneMapping)&&(u.material.needsUpdate=!0,d=C,f=C.version,p=t.toneMapping),u.layers.enableAll(),S.unshift(u,u.geometry,u.material,0,0,null)):C&&C.isTexture&&(c===void 0&&(c=new He(new an(2,2),new Ki({name:"BackgroundMaterial",uniforms:Is(Kn.background.uniforms),vertexShader:Kn.background.vertexShader,fragmentShader:Kn.background.fragmentShader,side:Yi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),a.update(c)),c.material.uniforms.t2D.value=C,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.toneMapped=tt.getTransfer(C.colorSpace)!==ct,C.matrixAutoUpdate===!0&&C.updateMatrix(),c.material.uniforms.uvTransform.value.copy(C.matrix),(d!==C||f!==C.version||p!==t.toneMapping)&&(c.material.needsUpdate=!0,d=C,f=C.version,p=t.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null))}function h(S,y){S.getRGB(Go,Cv(t)),i.buffers.color.setClear(Go.r,Go.g,Go.b,y,r)}function b(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(S,y=1){o.set(S),l=y,h(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(S){l=S,h(o,l)},render:g,addToRenderList:m,dispose:b}}function GT(t,e){const n=t.getParameter(t.MAX_VERTEX_ATTRIBS),i={},a=f(null);let s=a,r=!1;function o(x,R,I,U,z){let G=!1;const B=d(U,I,R);s!==B&&(s=B,c(s.object)),G=p(x,U,I,z),G&&_(x,U,I,z),z!==null&&e.update(z,t.ELEMENT_ARRAY_BUFFER),(G||r)&&(r=!1,y(x,R,I,U),z!==null&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,e.get(z).buffer))}function l(){return t.createVertexArray()}function c(x){return t.bindVertexArray(x)}function u(x){return t.deleteVertexArray(x)}function d(x,R,I){const U=I.wireframe===!0;let z=i[x.id];z===void 0&&(z={},i[x.id]=z);let G=z[R.id];G===void 0&&(G={},z[R.id]=G);let B=G[U];return B===void 0&&(B=f(l()),G[U]=B),B}function f(x){const R=[],I=[],U=[];for(let z=0;z<n;z++)R[z]=0,I[z]=0,U[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:I,attributeDivisors:U,object:x,attributes:{},index:null}}function p(x,R,I,U){const z=s.attributes,G=R.attributes;let B=0;const X=I.getAttributes();for(const V in X)if(X[V].location>=0){const pe=z[V];let q=G[V];if(q===void 0&&(V==="instanceMatrix"&&x.instanceMatrix&&(q=x.instanceMatrix),V==="instanceColor"&&x.instanceColor&&(q=x.instanceColor)),pe===void 0||pe.attribute!==q||q&&pe.data!==q.data)return!0;B++}return s.attributesNum!==B||s.index!==U}function _(x,R,I,U){const z={},G=R.attributes;let B=0;const X=I.getAttributes();for(const V in X)if(X[V].location>=0){let pe=G[V];pe===void 0&&(V==="instanceMatrix"&&x.instanceMatrix&&(pe=x.instanceMatrix),V==="instanceColor"&&x.instanceColor&&(pe=x.instanceColor));const q={};q.attribute=pe,pe&&pe.data&&(q.data=pe.data),z[V]=q,B++}s.attributes=z,s.attributesNum=B,s.index=U}function g(){const x=s.newAttributes;for(let R=0,I=x.length;R<I;R++)x[R]=0}function m(x){h(x,0)}function h(x,R){const I=s.newAttributes,U=s.enabledAttributes,z=s.attributeDivisors;I[x]=1,U[x]===0&&(t.enableVertexAttribArray(x),U[x]=1),z[x]!==R&&(t.vertexAttribDivisor(x,R),z[x]=R)}function b(){const x=s.newAttributes,R=s.enabledAttributes;for(let I=0,U=R.length;I<U;I++)R[I]!==x[I]&&(t.disableVertexAttribArray(I),R[I]=0)}function S(x,R,I,U,z,G,B){B===!0?t.vertexAttribIPointer(x,R,I,z,G):t.vertexAttribPointer(x,R,I,U,z,G)}function y(x,R,I,U){g();const z=U.attributes,G=I.getAttributes(),B=R.defaultAttributeValues;for(const X in G){const V=G[X];if(V.location>=0){let ee=z[X];if(ee===void 0&&(X==="instanceMatrix"&&x.instanceMatrix&&(ee=x.instanceMatrix),X==="instanceColor"&&x.instanceColor&&(ee=x.instanceColor)),ee!==void 0){const pe=ee.normalized,q=ee.itemSize,de=e.get(ee);if(de===void 0)continue;const we=de.buffer,be=de.type,me=de.bytesPerElement,O=be===t.INT||be===t.UNSIGNED_INT||ee.gpuType===pp;if(ee.isInterleavedBufferAttribute){const Y=ee.data,ie=Y.stride,Se=ee.offset;if(Y.isInstancedInterleavedBuffer){for(let ye=0;ye<V.locationSize;ye++)h(V.location+ye,Y.meshPerAttribute);x.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=Y.meshPerAttribute*Y.count)}else for(let ye=0;ye<V.locationSize;ye++)m(V.location+ye);t.bindBuffer(t.ARRAY_BUFFER,we);for(let ye=0;ye<V.locationSize;ye++)S(V.location+ye,q/V.locationSize,be,pe,ie*me,(Se+q/V.locationSize*ye)*me,O)}else{if(ee.isInstancedBufferAttribute){for(let Y=0;Y<V.locationSize;Y++)h(V.location+Y,ee.meshPerAttribute);x.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=ee.meshPerAttribute*ee.count)}else for(let Y=0;Y<V.locationSize;Y++)m(V.location+Y);t.bindBuffer(t.ARRAY_BUFFER,we);for(let Y=0;Y<V.locationSize;Y++)S(V.location+Y,q/V.locationSize,be,pe,q*me,q/V.locationSize*Y*me,O)}}else if(B!==void 0){const pe=B[X];if(pe!==void 0)switch(pe.length){case 2:t.vertexAttrib2fv(V.location,pe);break;case 3:t.vertexAttrib3fv(V.location,pe);break;case 4:t.vertexAttrib4fv(V.location,pe);break;default:t.vertexAttrib1fv(V.location,pe)}}}}b()}function C(){A();for(const x in i){const R=i[x];for(const I in R){const U=R[I];for(const z in U)u(U[z].object),delete U[z];delete R[I]}delete i[x]}}function M(x){if(i[x.id]===void 0)return;const R=i[x.id];for(const I in R){const U=R[I];for(const z in U)u(U[z].object),delete U[z];delete R[I]}delete i[x.id]}function T(x){for(const R in i){const I=i[R];if(I[x.id]===void 0)continue;const U=I[x.id];for(const z in U)u(U[z].object),delete U[z];delete I[x.id]}}function A(){v(),r=!0,s!==a&&(s=a,c(s.object))}function v(){a.geometry=null,a.program=null,a.wireframe=!1}return{setup:o,reset:A,resetDefaultState:v,dispose:C,releaseStatesOfGeometry:M,releaseStatesOfProgram:T,initAttributes:g,enableAttribute:m,disableUnusedAttributes:b}}function $T(t,e,n){let i;function a(c){i=c}function s(c,u){t.drawArrays(i,c,u),n.update(u,i,1)}function r(c,u,d){d!==0&&(t.drawArraysInstanced(i,c,u,d),n.update(u,i,d))}function o(c,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,u,0,d);let p=0;for(let _=0;_<d;_++)p+=u[_];n.update(p,i,1)}function l(c,u,d,f){if(d===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let _=0;_<c.length;_++)r(c[_],u[_],f[_]);else{p.multiDrawArraysInstancedWEBGL(i,c,0,u,0,f,0,d);let _=0;for(let g=0;g<d;g++)_+=u[g]*f[g];n.update(_,i,1)}}this.setMode=a,this.render=s,this.renderInstances=r,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function WT(t,e,n,i){let a;function s(){if(a!==void 0)return a;if(e.has("EXT_texture_filter_anisotropic")===!0){const T=e.get("EXT_texture_filter_anisotropic");a=t.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else a=0;return a}function r(T){return!(T!==Bn&&i.convert(T)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(T){const A=T===oo&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(T!==si&&i.convert(T)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==bi&&!A)}function l(T){if(T==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=n.precision!==void 0?n.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const d=n.logarithmicDepthBuffer===!0,f=n.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),p=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),_=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=t.getParameter(t.MAX_TEXTURE_SIZE),m=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),h=t.getParameter(t.MAX_VERTEX_ATTRIBS),b=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),S=t.getParameter(t.MAX_VARYING_VECTORS),y=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),C=_>0,M=t.getParameter(t.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:r,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:_,maxTextureSize:g,maxCubemapSize:m,maxAttributes:h,maxVertexUniforms:b,maxVaryings:S,maxFragmentUniforms:y,vertexTextures:C,maxSamples:M}}function XT(t){const e=this;let n=null,i=0,a=!1,s=!1;const r=new ki,o=new We,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){const p=d.length!==0||f||i!==0||a;return a=f,i=d.length,p},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,f){n=u(d,f,0)},this.setState=function(d,f,p){const _=d.clippingPlanes,g=d.clipIntersection,m=d.clipShadows,h=t.get(d);if(!a||_===null||_.length===0||s&&!m)s?u(null):c();else{const b=s?0:i,S=b*4;let y=h.clippingState||null;l.value=y,y=u(_,f,S,p);for(let C=0;C!==S;++C)y[C]=n[C];h.clippingState=y,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(d,f,p,_){const g=d!==null?d.length:0;let m=null;if(g!==0){if(m=l.value,_!==!0||m===null){const h=p+g*4,b=f.matrixWorldInverse;o.getNormalMatrix(b),(m===null||m.length<h)&&(m=new Float32Array(h));for(let S=0,y=p;S!==g;++S,y+=4)r.copy(d[S]).applyMatrix4(b,o),r.normal.toArray(m,y),m[y+3]=r.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=g,e.numIntersection=0,m}}function qT(t){let e=new WeakMap;function n(r,o){return o===wd?r.mapping=Ps:o===Ed&&(r.mapping=Ls),r}function i(r){if(r&&r.isTexture){const o=r.mapping;if(o===wd||o===Ed)if(e.has(r)){const l=e.get(r).texture;return n(l,r.mapping)}else{const l=r.image;if(l&&l.height>0){const c=new pw(l.height);return c.fromEquirectangularTexture(t,r),e.set(r,c),r.addEventListener("dispose",a),n(c.texture,r.mapping)}else return null}}return r}function a(r){const o=r.target;o.removeEventListener("dispose",a);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}const us=4,jh=[.125,.215,.35,.446,.526,.582],ga=20,xu=new Xv,Zh=new je;let Su=null,wu=0,Eu=0,Mu=!1;const ha=(1+Math.sqrt(5))/2,ts=1/ha,Jh=[new L(-ha,ts,0),new L(ha,ts,0),new L(-ts,0,ha),new L(ts,0,ha),new L(0,ha,-ts),new L(0,ha,ts),new L(-1,1,-1),new L(1,1,-1),new L(-1,1,1),new L(1,1,1)],YT=new L;class Qh{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,n=0,i=.1,a=100,s={}){const{size:r=256,position:o=YT}=s;Su=this._renderer.getRenderTarget(),wu=this._renderer.getActiveCubeFace(),Eu=this._renderer.getActiveMipmapLevel(),Mu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(r);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,a,l,o),n>0&&this._blur(l,0,0,n),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=nm(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=tm(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Su,wu,Eu),this._renderer.xr.enabled=Mu,e.scissorTest=!1,$o(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===Ps||e.mapping===Ls?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Su=this._renderer.getRenderTarget(),wu=this._renderer.getActiveCubeFace(),Eu=this._renderer.getActiveMipmapLevel(),Mu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=n||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:Jn,minFilter:Jn,generateMipmaps:!1,type:oo,format:Bn,colorSpace:Ns,depthBuffer:!1},a=em(e,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=em(e,n,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=KT(s)),this._blurMaterial=jT(s,e,n)}return a}_compileMaterial(e){const n=new He(this._lodPlanes[0],e);this._renderer.compile(n,xu)}_sceneToCubeUV(e,n,i,a,s){const l=new wn(90,1,n,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,f=d.autoClear,p=d.toneMapping;d.getClearColor(Zh),d.toneMapping=Hi,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(a),d.clearDepth(),d.setRenderTarget(null));const g=new st({name:"PMREM.Background",side:on,depthWrite:!1,depthTest:!1}),m=new He(new Da,g);let h=!1;const b=e.background;b?b.isColor&&(g.color.copy(b),e.background=null,h=!0):(g.color.copy(Zh),h=!0);for(let S=0;S<6;S++){const y=S%3;y===0?(l.up.set(0,c[S],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[S],s.y,s.z)):y===1?(l.up.set(0,0,c[S]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[S],s.z)):(l.up.set(0,c[S],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[S]));const C=this._cubeSize;$o(a,y*C,S>2?C:0,C,C),d.setRenderTarget(a),h&&d.render(m,l),d.render(e,l)}m.geometry.dispose(),m.material.dispose(),d.toneMapping=p,d.autoClear=f,e.background=b}_textureToCubeUV(e,n){const i=this._renderer,a=e.mapping===Ps||e.mapping===Ls;a?(this._cubemapMaterial===null&&(this._cubemapMaterial=nm()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=tm());const s=a?this._cubemapMaterial:this._equirectMaterial,r=new He(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;$o(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(r,xu)}_applyPMREM(e){const n=this._renderer,i=n.autoClear;n.autoClear=!1;const a=this._lodPlanes.length;for(let s=1;s<a;s++){const r=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=Jh[(a-s-1)%Jh.length];this._blur(e,s-1,s,r,o)}n.autoClear=i}_blur(e,n,i,a,s){const r=this._pingPongRenderTarget;this._halfBlur(e,r,n,i,a,"latitudinal",s),this._halfBlur(r,e,i,i,a,"longitudinal",s)}_halfBlur(e,n,i,a,s,r,o){const l=this._renderer,c=this._blurMaterial;r!=="latitudinal"&&r!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,d=new He(this._lodPlanes[a],c),f=c.uniforms,p=this._sizeLods[i]-1,_=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*ga-1),g=s/_,m=isFinite(s)?1+Math.floor(u*g):ga;m>ga&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ga}`);const h=[];let b=0;for(let T=0;T<ga;++T){const A=T/g,v=Math.exp(-A*A/2);h.push(v),T===0?b+=v:T<m&&(b+=2*v)}for(let T=0;T<h.length;T++)h[T]=h[T]/b;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=h,f.latitudinal.value=r==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:S}=this;f.dTheta.value=_,f.mipInt.value=S-i;const y=this._sizeLods[a],C=3*y*(a>S-us?a-S+us:0),M=4*(this._cubeSize-y);$o(n,C,M,3*y,2*y),l.setRenderTarget(n),l.render(d,xu)}}function KT(t){const e=[],n=[],i=[];let a=t;const s=t-us+1+jh.length;for(let r=0;r<s;r++){const o=Math.pow(2,a);n.push(o);let l=1/o;r>t-us?l=jh[r-t+us-1]:r===0&&(l=0),i.push(l);const c=1/(o-2),u=-c,d=1+c,f=[u,u,d,u,d,d,u,u,d,d,u,d],p=6,_=6,g=3,m=2,h=1,b=new Float32Array(g*_*p),S=new Float32Array(m*_*p),y=new Float32Array(h*_*p);for(let M=0;M<p;M++){const T=M%3*2/3-1,A=M>2?0:-1,v=[T,A,0,T+2/3,A,0,T+2/3,A+1,0,T,A,0,T+2/3,A+1,0,T,A+1,0];b.set(v,g*_*M),S.set(f,m*_*M);const x=[M,M,M,M,M,M];y.set(x,h*_*M)}const C=new At;C.setAttribute("position",new Gn(b,g)),C.setAttribute("uv",new Gn(S,m)),C.setAttribute("faceIndex",new Gn(y,h)),e.push(C),a>us&&a--}return{lodPlanes:e,sizeLods:n,sigmas:i}}function em(t,e,n){const i=new Ca(t,e,n);return i.texture.mapping=Sc,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function $o(t,e,n,i,a){t.viewport.set(e,n,i,a),t.scissor.set(e,n,i,a)}function jT(t,e,n){const i=new Float32Array(ga),a=new L(0,1,0);return new Ki({name:"SphericalGaussianBlur",defines:{n:ga,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:a}},vertexShader:Rp(),fragmentShader:`

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
		`,blending:Bi,depthTest:!1,depthWrite:!1})}function tm(){return new Ki({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Rp(),fragmentShader:`

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
		`,blending:Bi,depthTest:!1,depthWrite:!1})}function nm(){return new Ki({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Rp(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Bi,depthTest:!1,depthWrite:!1})}function Rp(){return`

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
	`}function ZT(t){let e=new WeakMap,n=null;function i(o){if(o&&o.isTexture){const l=o.mapping,c=l===wd||l===Ed,u=l===Ps||l===Ls;if(c||u){let d=e.get(o);const f=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==f)return n===null&&(n=new Qh(t)),d=c?n.fromEquirectangular(o,d):n.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),d.texture;if(d!==void 0)return d.texture;{const p=o.image;return c&&p&&p.height>0||u&&p&&a(p)?(n===null&&(n=new Qh(t)),d=c?n.fromEquirectangular(o):n.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),o.addEventListener("dispose",s),d.texture):null}}}return o}function a(o){let l=0;const c=6;for(let u=0;u<c;u++)o[u]!==void 0&&l++;return l===c}function s(o){const l=o.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function r(){e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:r}}function JT(t){const e={};function n(i){if(e[i]!==void 0)return e[i];let a;switch(i){case"WEBGL_depth_texture":a=t.getExtension("WEBGL_depth_texture")||t.getExtension("MOZ_WEBGL_depth_texture")||t.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":a=t.getExtension("EXT_texture_filter_anisotropic")||t.getExtension("MOZ_EXT_texture_filter_anisotropic")||t.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":a=t.getExtension("WEBGL_compressed_texture_s3tc")||t.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":a=t.getExtension("WEBGL_compressed_texture_pvrtc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:a=t.getExtension(i)}return e[i]=a,a}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){const a=n(i);return a===null&&Gr("THREE.WebGLRenderer: "+i+" extension not supported."),a}}}function QT(t,e,n,i){const a={},s=new WeakMap;function r(d){const f=d.target;f.index!==null&&e.remove(f.index);for(const _ in f.attributes)e.remove(f.attributes[_]);f.removeEventListener("dispose",r),delete a[f.id];const p=s.get(f);p&&(e.remove(p),s.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,n.memory.geometries--}function o(d,f){return a[f.id]===!0||(f.addEventListener("dispose",r),a[f.id]=!0,n.memory.geometries++),f}function l(d){const f=d.attributes;for(const p in f)e.update(f[p],t.ARRAY_BUFFER)}function c(d){const f=[],p=d.index,_=d.attributes.position;let g=0;if(p!==null){const b=p.array;g=p.version;for(let S=0,y=b.length;S<y;S+=3){const C=b[S+0],M=b[S+1],T=b[S+2];f.push(C,M,M,T,T,C)}}else if(_!==void 0){const b=_.array;g=_.version;for(let S=0,y=b.length/3-1;S<y;S+=3){const C=S+0,M=S+1,T=S+2;f.push(C,M,M,T,T,C)}}else return;const m=new(Sv(f)?Av:Tv)(f,1);m.version=g;const h=s.get(d);h&&e.remove(h),s.set(d,m)}function u(d){const f=s.get(d);if(f){const p=d.index;p!==null&&f.version<p.version&&c(d)}else c(d);return s.get(d)}return{get:o,update:l,getWireframeAttribute:u}}function e1(t,e,n){let i;function a(f){i=f}let s,r;function o(f){s=f.type,r=f.bytesPerElement}function l(f,p){t.drawElements(i,p,s,f*r),n.update(p,i,1)}function c(f,p,_){_!==0&&(t.drawElementsInstanced(i,p,s,f*r,_),n.update(p,i,_))}function u(f,p,_){if(_===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,s,f,0,_);let m=0;for(let h=0;h<_;h++)m+=p[h];n.update(m,i,1)}function d(f,p,_,g){if(_===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let h=0;h<f.length;h++)c(f[h]/r,p[h],g[h]);else{m.multiDrawElementsInstancedWEBGL(i,p,0,s,f,0,g,0,_);let h=0;for(let b=0;b<_;b++)h+=p[b]*g[b];n.update(h,i,1)}}this.setMode=a,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function t1(t){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,r,o){switch(n.calls++,r){case t.TRIANGLES:n.triangles+=o*(s/3);break;case t.LINES:n.lines+=o*(s/2);break;case t.LINE_STRIP:n.lines+=o*(s-1);break;case t.LINE_LOOP:n.lines+=o*s;break;case t.POINTS:n.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",r);break}}function a(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:a,update:i}}function n1(t,e,n){const i=new WeakMap,a=new Mt;function s(r,o,l){const c=r.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u!==void 0?u.length:0;let f=i.get(o);if(f===void 0||f.count!==d){let v=function(){T.dispose(),i.delete(o),o.removeEventListener("dispose",v)};f!==void 0&&f.texture.dispose();const p=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,g=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],h=o.morphAttributes.normal||[],b=o.morphAttributes.color||[];let S=0;p===!0&&(S=1),_===!0&&(S=2),g===!0&&(S=3);let y=o.attributes.position.count*S,C=1;y>e.maxTextureSize&&(C=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);const M=new Float32Array(y*C*4*d),T=new wv(M,y,C,d);T.type=bi,T.needsUpdate=!0;const A=S*4;for(let x=0;x<d;x++){const R=m[x],I=h[x],U=b[x],z=y*C*4*x;for(let G=0;G<R.count;G++){const B=G*A;p===!0&&(a.fromBufferAttribute(R,G),M[z+B+0]=a.x,M[z+B+1]=a.y,M[z+B+2]=a.z,M[z+B+3]=0),_===!0&&(a.fromBufferAttribute(I,G),M[z+B+4]=a.x,M[z+B+5]=a.y,M[z+B+6]=a.z,M[z+B+7]=0),g===!0&&(a.fromBufferAttribute(U,G),M[z+B+8]=a.x,M[z+B+9]=a.y,M[z+B+10]=a.z,M[z+B+11]=U.itemSize===4?a.w:1)}}f={count:d,texture:T,size:new ce(y,C)},i.set(o,f),o.addEventListener("dispose",v)}if(r.isInstancedMesh===!0&&r.morphTexture!==null)l.getUniforms().setValue(t,"morphTexture",r.morphTexture,n);else{let p=0;for(let g=0;g<c.length;g++)p+=c[g];const _=o.morphTargetsRelative?1:1-p;l.getUniforms().setValue(t,"morphTargetBaseInfluence",_),l.getUniforms().setValue(t,"morphTargetInfluences",c)}l.getUniforms().setValue(t,"morphTargetsTexture",f.texture,n),l.getUniforms().setValue(t,"morphTargetsTextureSize",f.size)}return{update:s}}function i1(t,e,n,i){let a=new WeakMap;function s(l){const c=i.render.frame,u=l.geometry,d=e.get(l,u);if(a.get(d)!==c&&(e.update(d),a.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),a.get(l)!==c&&(n.update(l.instanceMatrix,t.ARRAY_BUFFER),l.instanceColor!==null&&n.update(l.instanceColor,t.ARRAY_BUFFER),a.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;a.get(f)!==c&&(f.update(),a.set(f,c))}return d}function r(){a=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),n.remove(c.instanceMatrix),c.instanceColor!==null&&n.remove(c.instanceColor)}return{update:s,dispose:r}}const Yv=new jt,im=new Dv(1,1),Kv=new wv,jv=new jS,Zv=new Pv,am=[],sm=[],rm=new Float32Array(16),om=new Float32Array(9),lm=new Float32Array(4);function $s(t,e,n){const i=t[0];if(i<=0||i>0)return t;const a=e*n;let s=am[a];if(s===void 0&&(s=new Float32Array(a),am[a]=s),e!==0){i.toArray(s,0);for(let r=1,o=0;r!==e;++r)o+=n,t[r].toArray(s,o)}return s}function It(t,e){if(t.length!==e.length)return!1;for(let n=0,i=t.length;n<i;n++)if(t[n]!==e[n])return!1;return!0}function Dt(t,e){for(let n=0,i=e.length;n<i;n++)t[n]=e[n]}function Cc(t,e){let n=sm[e];n===void 0&&(n=new Int32Array(e),sm[e]=n);for(let i=0;i!==e;++i)n[i]=t.allocateTextureUnit();return n}function a1(t,e){const n=this.cache;n[0]!==e&&(t.uniform1f(this.addr,e),n[0]=e)}function s1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(It(n,e))return;t.uniform2fv(this.addr,e),Dt(n,e)}}function r1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(t.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(It(n,e))return;t.uniform3fv(this.addr,e),Dt(n,e)}}function o1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(It(n,e))return;t.uniform4fv(this.addr,e),Dt(n,e)}}function l1(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(It(n,e))return;t.uniformMatrix2fv(this.addr,!1,e),Dt(n,e)}else{if(It(n,i))return;lm.set(i),t.uniformMatrix2fv(this.addr,!1,lm),Dt(n,i)}}function c1(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(It(n,e))return;t.uniformMatrix3fv(this.addr,!1,e),Dt(n,e)}else{if(It(n,i))return;om.set(i),t.uniformMatrix3fv(this.addr,!1,om),Dt(n,i)}}function u1(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(It(n,e))return;t.uniformMatrix4fv(this.addr,!1,e),Dt(n,e)}else{if(It(n,i))return;rm.set(i),t.uniformMatrix4fv(this.addr,!1,rm),Dt(n,i)}}function d1(t,e){const n=this.cache;n[0]!==e&&(t.uniform1i(this.addr,e),n[0]=e)}function f1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(It(n,e))return;t.uniform2iv(this.addr,e),Dt(n,e)}}function p1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(It(n,e))return;t.uniform3iv(this.addr,e),Dt(n,e)}}function h1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(It(n,e))return;t.uniform4iv(this.addr,e),Dt(n,e)}}function m1(t,e){const n=this.cache;n[0]!==e&&(t.uniform1ui(this.addr,e),n[0]=e)}function _1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(It(n,e))return;t.uniform2uiv(this.addr,e),Dt(n,e)}}function g1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(It(n,e))return;t.uniform3uiv(this.addr,e),Dt(n,e)}}function v1(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(It(n,e))return;t.uniform4uiv(this.addr,e),Dt(n,e)}}function y1(t,e,n){const i=this.cache,a=n.allocateTextureUnit();i[0]!==a&&(t.uniform1i(this.addr,a),i[0]=a);let s;this.type===t.SAMPLER_2D_SHADOW?(im.compareFunction=xv,s=im):s=Yv,n.setTexture2D(e||s,a)}function b1(t,e,n){const i=this.cache,a=n.allocateTextureUnit();i[0]!==a&&(t.uniform1i(this.addr,a),i[0]=a),n.setTexture3D(e||jv,a)}function x1(t,e,n){const i=this.cache,a=n.allocateTextureUnit();i[0]!==a&&(t.uniform1i(this.addr,a),i[0]=a),n.setTextureCube(e||Zv,a)}function S1(t,e,n){const i=this.cache,a=n.allocateTextureUnit();i[0]!==a&&(t.uniform1i(this.addr,a),i[0]=a),n.setTexture2DArray(e||Kv,a)}function w1(t){switch(t){case 5126:return a1;case 35664:return s1;case 35665:return r1;case 35666:return o1;case 35674:return l1;case 35675:return c1;case 35676:return u1;case 5124:case 35670:return d1;case 35667:case 35671:return f1;case 35668:case 35672:return p1;case 35669:case 35673:return h1;case 5125:return m1;case 36294:return _1;case 36295:return g1;case 36296:return v1;case 35678:case 36198:case 36298:case 36306:case 35682:return y1;case 35679:case 36299:case 36307:return b1;case 35680:case 36300:case 36308:case 36293:return x1;case 36289:case 36303:case 36311:case 36292:return S1}}function E1(t,e){t.uniform1fv(this.addr,e)}function M1(t,e){const n=$s(e,this.size,2);t.uniform2fv(this.addr,n)}function T1(t,e){const n=$s(e,this.size,3);t.uniform3fv(this.addr,n)}function A1(t,e){const n=$s(e,this.size,4);t.uniform4fv(this.addr,n)}function C1(t,e){const n=$s(e,this.size,4);t.uniformMatrix2fv(this.addr,!1,n)}function R1(t,e){const n=$s(e,this.size,9);t.uniformMatrix3fv(this.addr,!1,n)}function P1(t,e){const n=$s(e,this.size,16);t.uniformMatrix4fv(this.addr,!1,n)}function L1(t,e){t.uniform1iv(this.addr,e)}function N1(t,e){t.uniform2iv(this.addr,e)}function I1(t,e){t.uniform3iv(this.addr,e)}function D1(t,e){t.uniform4iv(this.addr,e)}function k1(t,e){t.uniform1uiv(this.addr,e)}function F1(t,e){t.uniform2uiv(this.addr,e)}function O1(t,e){t.uniform3uiv(this.addr,e)}function U1(t,e){t.uniform4uiv(this.addr,e)}function B1(t,e,n){const i=this.cache,a=e.length,s=Cc(n,a);It(i,s)||(t.uniform1iv(this.addr,s),Dt(i,s));for(let r=0;r!==a;++r)n.setTexture2D(e[r]||Yv,s[r])}function z1(t,e,n){const i=this.cache,a=e.length,s=Cc(n,a);It(i,s)||(t.uniform1iv(this.addr,s),Dt(i,s));for(let r=0;r!==a;++r)n.setTexture3D(e[r]||jv,s[r])}function H1(t,e,n){const i=this.cache,a=e.length,s=Cc(n,a);It(i,s)||(t.uniform1iv(this.addr,s),Dt(i,s));for(let r=0;r!==a;++r)n.setTextureCube(e[r]||Zv,s[r])}function V1(t,e,n){const i=this.cache,a=e.length,s=Cc(n,a);It(i,s)||(t.uniform1iv(this.addr,s),Dt(i,s));for(let r=0;r!==a;++r)n.setTexture2DArray(e[r]||Kv,s[r])}function G1(t){switch(t){case 5126:return E1;case 35664:return M1;case 35665:return T1;case 35666:return A1;case 35674:return C1;case 35675:return R1;case 35676:return P1;case 5124:case 35670:return L1;case 35667:case 35671:return N1;case 35668:case 35672:return I1;case 35669:case 35673:return D1;case 5125:return k1;case 36294:return F1;case 36295:return O1;case 36296:return U1;case 35678:case 36198:case 36298:case 36306:case 35682:return B1;case 35679:case 36299:case 36307:return z1;case 35680:case 36300:case 36308:case 36293:return H1;case 36289:case 36303:case 36311:case 36292:return V1}}class $1{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.setValue=w1(n.type)}}class W1{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=G1(n.type)}}class X1{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,i){const a=this.seq;for(let s=0,r=a.length;s!==r;++s){const o=a[s];o.setValue(e,n[o.id],i)}}}const Tu=/(\w+)(\])?(\[|\.)?/g;function cm(t,e){t.seq.push(e),t.map[e.id]=e}function q1(t,e,n){const i=t.name,a=i.length;for(Tu.lastIndex=0;;){const s=Tu.exec(i),r=Tu.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&r+2===a){cm(n,c===void 0?new $1(o,t,e):new W1(o,t,e));break}else{let d=n.map[o];d===void 0&&(d=new X1(o),cm(n,d)),n=d}}}class Sl{constructor(e,n){this.seq=[],this.map={};const i=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const s=e.getActiveUniform(n,a),r=e.getUniformLocation(n,s.name);q1(s,r,this)}}setValue(e,n,i,a){const s=this.map[n];s!==void 0&&s.setValue(e,i,a)}setOptional(e,n,i){const a=n[i];a!==void 0&&this.setValue(e,i,a)}static upload(e,n,i,a){for(let s=0,r=n.length;s!==r;++s){const o=n[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,a)}}static seqWithValue(e,n){const i=[];for(let a=0,s=e.length;a!==s;++a){const r=e[a];r.id in n&&i.push(r)}return i}}function um(t,e,n){const i=t.createShader(e);return t.shaderSource(i,n),t.compileShader(i),i}const Y1=37297;let K1=0;function j1(t,e){const n=t.split(`
`),i=[],a=Math.max(e-6,0),s=Math.min(e+6,n.length);for(let r=a;r<s;r++){const o=r+1;i.push(`${o===e?">":" "} ${o}: ${n[r]}`)}return i.join(`
`)}const dm=new We;function Z1(t){tt._getMatrix(dm,tt.workingColorSpace,t);const e=`mat3( ${dm.elements.map(n=>n.toFixed(4))} )`;switch(tt.getTransfer(t)){case Wl:return[e,"LinearTransferOETF"];case ct:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",t),[e,"LinearTransferOETF"]}}function fm(t,e,n){const i=t.getShaderParameter(e,t.COMPILE_STATUS),s=(t.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return n.toUpperCase()+`

`+s+`

`+j1(t.getShaderSource(e),o)}else return s}function J1(t,e){const n=Z1(e);return[`vec4 ${t}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}function Q1(t,e){let n;switch(e){case cS:n="Linear";break;case uS:n="Reinhard";break;case dS:n="Cineon";break;case fS:n="ACESFilmic";break;case hS:n="AgX";break;case mS:n="Neutral";break;case pS:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),n="Linear"}return"vec3 "+t+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const Wo=new L;function eA(){tt.getLuminanceCoefficients(Wo);const t=Wo.x.toFixed(4),e=Wo.y.toFixed(4),n=Wo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${t}, ${e}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function tA(t){return[t.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",t.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(fr).join(`
`)}function nA(t){const e=[];for(const n in t){const i=t[n];i!==!1&&e.push("#define "+n+" "+i)}return e.join(`
`)}function iA(t,e){const n={},i=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES);for(let a=0;a<i;a++){const s=t.getActiveAttrib(e,a),r=s.name;let o=1;s.type===t.FLOAT_MAT2&&(o=2),s.type===t.FLOAT_MAT3&&(o=3),s.type===t.FLOAT_MAT4&&(o=4),n[r]={type:s.type,location:t.getAttribLocation(e,r),locationSize:o}}return n}function fr(t){return t!==""}function pm(t,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return t.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function hm(t,e){return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const aA=/^[ \t]*#include +<([\w\d./]+)>/gm;function sf(t){return t.replace(aA,rA)}const sA=new Map;function rA(t,e){let n=qe[e];if(n===void 0){const i=sA.get(e);if(i!==void 0)n=qe[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return sf(n)}const oA=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function mm(t){return t.replace(oA,lA)}function lA(t,e,n,i){let a="";for(let s=parseInt(e);s<parseInt(n);s++)a+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return a}function _m(t){let e=`precision ${t.precision} float;
	precision ${t.precision} int;
	precision ${t.precision} sampler2D;
	precision ${t.precision} samplerCube;
	precision ${t.precision} sampler3D;
	precision ${t.precision} sampler2DArray;
	precision ${t.precision} sampler2DShadow;
	precision ${t.precision} samplerCubeShadow;
	precision ${t.precision} sampler2DArrayShadow;
	precision ${t.precision} isampler2D;
	precision ${t.precision} isampler3D;
	precision ${t.precision} isamplerCube;
	precision ${t.precision} isampler2DArray;
	precision ${t.precision} usampler2D;
	precision ${t.precision} usampler3D;
	precision ${t.precision} usamplerCube;
	precision ${t.precision} usampler2DArray;
	`;return t.precision==="highp"?e+=`
#define HIGH_PRECISION`:t.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:t.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function cA(t){let e="SHADOWMAP_TYPE_BASIC";return t.shadowMapType===dv?e="SHADOWMAP_TYPE_PCF":t.shadowMapType===Vx?e="SHADOWMAP_TYPE_PCF_SOFT":t.shadowMapType===gi&&(e="SHADOWMAP_TYPE_VSM"),e}function uA(t){let e="ENVMAP_TYPE_CUBE";if(t.envMap)switch(t.envMapMode){case Ps:case Ls:e="ENVMAP_TYPE_CUBE";break;case Sc:e="ENVMAP_TYPE_CUBE_UV";break}return e}function dA(t){let e="ENVMAP_MODE_REFLECTION";return t.envMap&&t.envMapMode===Ls&&(e="ENVMAP_MODE_REFRACTION"),e}function fA(t){let e="ENVMAP_BLENDING_NONE";if(t.envMap)switch(t.combine){case xc:e="ENVMAP_BLENDING_MULTIPLY";break;case oS:e="ENVMAP_BLENDING_MIX";break;case lS:e="ENVMAP_BLENDING_ADD";break}return e}function pA(t){const e=t.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),112)),texelHeight:i,maxMip:n}}function hA(t,e,n,i){const a=t.getContext(),s=n.defines;let r=n.vertexShader,o=n.fragmentShader;const l=cA(n),c=uA(n),u=dA(n),d=fA(n),f=pA(n),p=tA(n),_=nA(s),g=a.createProgram();let m,h,b=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(m=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_].filter(fr).join(`
`),m.length>0&&(m+=`
`),h=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_].filter(fr).join(`
`),h.length>0&&(h+=`
`)):(m=[_m(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+u:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(fr).join(`
`),h=[_m(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+u:"",n.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor||n.batchingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==Hi?"#define TONE_MAPPING":"",n.toneMapping!==Hi?qe.tonemapping_pars_fragment:"",n.toneMapping!==Hi?Q1("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",qe.colorspace_pars_fragment,J1("linearToOutputTexel",n.outputColorSpace),eA(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(fr).join(`
`)),r=sf(r),r=pm(r,n),r=hm(r,n),o=sf(o),o=pm(o,n),o=hm(o,n),r=mm(r),o=mm(o),n.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,h=["#define varying in",n.glslVersion===mh?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===mh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);const S=b+m+r,y=b+h+o,C=um(a,a.VERTEX_SHADER,S),M=um(a,a.FRAGMENT_SHADER,y);a.attachShader(g,C),a.attachShader(g,M),n.index0AttributeName!==void 0?a.bindAttribLocation(g,0,n.index0AttributeName):n.morphTargets===!0&&a.bindAttribLocation(g,0,"position"),a.linkProgram(g);function T(R){if(t.debug.checkShaderErrors){const I=a.getProgramInfoLog(g)||"",U=a.getShaderInfoLog(C)||"",z=a.getShaderInfoLog(M)||"",G=I.trim(),B=U.trim(),X=z.trim();let V=!0,ee=!0;if(a.getProgramParameter(g,a.LINK_STATUS)===!1)if(V=!1,typeof t.debug.onShaderError=="function")t.debug.onShaderError(a,g,C,M);else{const pe=fm(a,C,"vertex"),q=fm(a,M,"fragment");console.error("THREE.WebGLProgram: Shader Error "+a.getError()+" - VALIDATE_STATUS "+a.getProgramParameter(g,a.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+G+`
`+pe+`
`+q)}else G!==""?console.warn("THREE.WebGLProgram: Program Info Log:",G):(B===""||X==="")&&(ee=!1);ee&&(R.diagnostics={runnable:V,programLog:G,vertexShader:{log:B,prefix:m},fragmentShader:{log:X,prefix:h}})}a.deleteShader(C),a.deleteShader(M),A=new Sl(a,g),v=iA(a,g)}let A;this.getUniforms=function(){return A===void 0&&T(this),A};let v;this.getAttributes=function(){return v===void 0&&T(this),v};let x=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return x===!1&&(x=a.getProgramParameter(g,Y1)),x},this.destroy=function(){i.releaseStatesOfProgram(this),a.deleteProgram(g),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=K1++,this.cacheKey=e,this.usedTimes=1,this.program=g,this.vertexShader=C,this.fragmentShader=M,this}let mA=0;class _A{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const n=e.vertexShader,i=e.fragmentShader,a=this._getShaderStage(n),s=this._getShaderStage(i),r=this._getShaderCacheForMaterial(e);return r.has(a)===!1&&(r.add(a),a.usedTimes++),r.has(s)===!1&&(r.add(s),s.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let i=n.get(e);return i===void 0&&(i=new Set,n.set(e,i)),i}_getShaderStage(e){const n=this.shaderCache;let i=n.get(e);return i===void 0&&(i=new gA(e),n.set(e,i)),i}}class gA{constructor(e){this.id=mA++,this.code=e,this.usedTimes=0}}function vA(t,e,n,i,a,s,r){const o=new Ev,l=new _A,c=new Set,u=[],d=a.logarithmicDepthBuffer,f=a.vertexTextures;let p=a.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(v){return c.add(v),v===0?"uv":`uv${v}`}function m(v,x,R,I,U){const z=I.fog,G=U.geometry,B=v.isMeshStandardMaterial?I.environment:null,X=(v.isMeshStandardMaterial?n:e).get(v.envMap||B),V=X&&X.mapping===Sc?X.image.height:null,ee=_[v.type];v.precision!==null&&(p=a.getMaxPrecision(v.precision),p!==v.precision&&console.warn("THREE.WebGLProgram.getParameters:",v.precision,"not supported, using",p,"instead."));const pe=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,q=pe!==void 0?pe.length:0;let de=0;G.morphAttributes.position!==void 0&&(de=1),G.morphAttributes.normal!==void 0&&(de=2),G.morphAttributes.color!==void 0&&(de=3);let we,be,me,O;if(ee){const nt=Kn[ee];we=nt.vertexShader,be=nt.fragmentShader}else we=v.vertexShader,be=v.fragmentShader,l.update(v),me=l.getVertexShaderID(v),O=l.getFragmentShaderID(v);const Y=t.getRenderTarget(),ie=t.state.buffers.depth.getReversed(),Se=U.isInstancedMesh===!0,ye=U.isBatchedMesh===!0,Fe=!!v.map,rt=!!v.matcap,N=!!X,ot=!!v.aoMap,Ge=!!v.lightMap,Be=!!v.bumpMap,Ae=!!v.normalMap,gt=!!v.displacementMap,Ce=!!v.emissiveMap,Xe=!!v.metalnessMap,kt=!!v.roughnessMap,Tt=v.anisotropy>0,P=v.clearcoat>0,w=v.dispersion>0,H=v.iridescence>0,Z=v.sheen>0,Q=v.transmission>0,K=Tt&&!!v.anisotropyMap,Ne=P&&!!v.clearcoatMap,le=P&&!!v.clearcoatNormalMap,Re=P&&!!v.clearcoatRoughnessMap,Pe=H&&!!v.iridescenceMap,re=H&&!!v.iridescenceThicknessMap,ge=Z&&!!v.sheenColorMap,Oe=Z&&!!v.sheenRoughnessMap,Le=!!v.specularMap,he=!!v.specularColorMap,$e=!!v.specularIntensityMap,D=Q&&!!v.transmissionMap,oe=Q&&!!v.thicknessMap,ue=!!v.gradientMap,Ee=!!v.alphaMap,ae=v.alphaTest>0,J=!!v.alphaHash,Te=!!v.extensions;let Ve=Hi;v.toneMapped&&(Y===null||Y.isXRRenderTarget===!0)&&(Ve=t.toneMapping);const ft={shaderID:ee,shaderType:v.type,shaderName:v.name,vertexShader:we,fragmentShader:be,defines:v.defines,customVertexShaderID:me,customFragmentShaderID:O,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:p,batching:ye,batchingColor:ye&&U._colorsTexture!==null,instancing:Se,instancingColor:Se&&U.instanceColor!==null,instancingMorph:Se&&U.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:Y===null?t.outputColorSpace:Y.isXRRenderTarget===!0?Y.texture.colorSpace:Ns,alphaToCoverage:!!v.alphaToCoverage,map:Fe,matcap:rt,envMap:N,envMapMode:N&&X.mapping,envMapCubeUVHeight:V,aoMap:ot,lightMap:Ge,bumpMap:Be,normalMap:Ae,displacementMap:f&&gt,emissiveMap:Ce,normalMapObjectSpace:Ae&&v.normalMapType===yS,normalMapTangentSpace:Ae&&v.normalMapType===yp,metalnessMap:Xe,roughnessMap:kt,anisotropy:Tt,anisotropyMap:K,clearcoat:P,clearcoatMap:Ne,clearcoatNormalMap:le,clearcoatRoughnessMap:Re,dispersion:w,iridescence:H,iridescenceMap:Pe,iridescenceThicknessMap:re,sheen:Z,sheenColorMap:ge,sheenRoughnessMap:Oe,specularMap:Le,specularColorMap:he,specularIntensityMap:$e,transmission:Q,transmissionMap:D,thicknessMap:oe,gradientMap:ue,opaque:v.transparent===!1&&v.blending===ms&&v.alphaToCoverage===!1,alphaMap:Ee,alphaTest:ae,alphaHash:J,combine:v.combine,mapUv:Fe&&g(v.map.channel),aoMapUv:ot&&g(v.aoMap.channel),lightMapUv:Ge&&g(v.lightMap.channel),bumpMapUv:Be&&g(v.bumpMap.channel),normalMapUv:Ae&&g(v.normalMap.channel),displacementMapUv:gt&&g(v.displacementMap.channel),emissiveMapUv:Ce&&g(v.emissiveMap.channel),metalnessMapUv:Xe&&g(v.metalnessMap.channel),roughnessMapUv:kt&&g(v.roughnessMap.channel),anisotropyMapUv:K&&g(v.anisotropyMap.channel),clearcoatMapUv:Ne&&g(v.clearcoatMap.channel),clearcoatNormalMapUv:le&&g(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Re&&g(v.clearcoatRoughnessMap.channel),iridescenceMapUv:Pe&&g(v.iridescenceMap.channel),iridescenceThicknessMapUv:re&&g(v.iridescenceThicknessMap.channel),sheenColorMapUv:ge&&g(v.sheenColorMap.channel),sheenRoughnessMapUv:Oe&&g(v.sheenRoughnessMap.channel),specularMapUv:Le&&g(v.specularMap.channel),specularColorMapUv:he&&g(v.specularColorMap.channel),specularIntensityMapUv:$e&&g(v.specularIntensityMap.channel),transmissionMapUv:D&&g(v.transmissionMap.channel),thicknessMapUv:oe&&g(v.thicknessMap.channel),alphaMapUv:Ee&&g(v.alphaMap.channel),vertexTangents:!!G.attributes.tangent&&(Ae||Tt),vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,pointsUvs:U.isPoints===!0&&!!G.attributes.uv&&(Fe||Ee),fog:!!z,useFog:v.fog===!0,fogExp2:!!z&&z.isFogExp2,flatShading:v.flatShading===!0&&v.wireframe===!1,sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:ie,skinning:U.isSkinnedMesh===!0,morphTargets:G.morphAttributes.position!==void 0,morphNormals:G.morphAttributes.normal!==void 0,morphColors:G.morphAttributes.color!==void 0,morphTargetsCount:q,morphTextureStride:de,numDirLights:x.directional.length,numPointLights:x.point.length,numSpotLights:x.spot.length,numSpotLightMaps:x.spotLightMap.length,numRectAreaLights:x.rectArea.length,numHemiLights:x.hemi.length,numDirLightShadows:x.directionalShadowMap.length,numPointLightShadows:x.pointShadowMap.length,numSpotLightShadows:x.spotShadowMap.length,numSpotLightShadowsWithMaps:x.numSpotLightShadowsWithMaps,numLightProbes:x.numLightProbes,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:v.dithering,shadowMapEnabled:t.shadowMap.enabled&&R.length>0,shadowMapType:t.shadowMap.type,toneMapping:Ve,decodeVideoTexture:Fe&&v.map.isVideoTexture===!0&&tt.getTransfer(v.map.colorSpace)===ct,decodeVideoTextureEmissive:Ce&&v.emissiveMap.isVideoTexture===!0&&tt.getTransfer(v.emissiveMap.colorSpace)===ct,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===Qe,flipSided:v.side===on,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:Te&&v.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Te&&v.extensions.multiDraw===!0||ye)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return ft.vertexUv1s=c.has(1),ft.vertexUv2s=c.has(2),ft.vertexUv3s=c.has(3),c.clear(),ft}function h(v){const x=[];if(v.shaderID?x.push(v.shaderID):(x.push(v.customVertexShaderID),x.push(v.customFragmentShaderID)),v.defines!==void 0)for(const R in v.defines)x.push(R),x.push(v.defines[R]);return v.isRawShaderMaterial===!1&&(b(x,v),S(x,v),x.push(t.outputColorSpace)),x.push(v.customProgramCacheKey),x.join()}function b(v,x){v.push(x.precision),v.push(x.outputColorSpace),v.push(x.envMapMode),v.push(x.envMapCubeUVHeight),v.push(x.mapUv),v.push(x.alphaMapUv),v.push(x.lightMapUv),v.push(x.aoMapUv),v.push(x.bumpMapUv),v.push(x.normalMapUv),v.push(x.displacementMapUv),v.push(x.emissiveMapUv),v.push(x.metalnessMapUv),v.push(x.roughnessMapUv),v.push(x.anisotropyMapUv),v.push(x.clearcoatMapUv),v.push(x.clearcoatNormalMapUv),v.push(x.clearcoatRoughnessMapUv),v.push(x.iridescenceMapUv),v.push(x.iridescenceThicknessMapUv),v.push(x.sheenColorMapUv),v.push(x.sheenRoughnessMapUv),v.push(x.specularMapUv),v.push(x.specularColorMapUv),v.push(x.specularIntensityMapUv),v.push(x.transmissionMapUv),v.push(x.thicknessMapUv),v.push(x.combine),v.push(x.fogExp2),v.push(x.sizeAttenuation),v.push(x.morphTargetsCount),v.push(x.morphAttributeCount),v.push(x.numDirLights),v.push(x.numPointLights),v.push(x.numSpotLights),v.push(x.numSpotLightMaps),v.push(x.numHemiLights),v.push(x.numRectAreaLights),v.push(x.numDirLightShadows),v.push(x.numPointLightShadows),v.push(x.numSpotLightShadows),v.push(x.numSpotLightShadowsWithMaps),v.push(x.numLightProbes),v.push(x.shadowMapType),v.push(x.toneMapping),v.push(x.numClippingPlanes),v.push(x.numClipIntersection),v.push(x.depthPacking)}function S(v,x){o.disableAll(),x.supportsVertexTextures&&o.enable(0),x.instancing&&o.enable(1),x.instancingColor&&o.enable(2),x.instancingMorph&&o.enable(3),x.matcap&&o.enable(4),x.envMap&&o.enable(5),x.normalMapObjectSpace&&o.enable(6),x.normalMapTangentSpace&&o.enable(7),x.clearcoat&&o.enable(8),x.iridescence&&o.enable(9),x.alphaTest&&o.enable(10),x.vertexColors&&o.enable(11),x.vertexAlphas&&o.enable(12),x.vertexUv1s&&o.enable(13),x.vertexUv2s&&o.enable(14),x.vertexUv3s&&o.enable(15),x.vertexTangents&&o.enable(16),x.anisotropy&&o.enable(17),x.alphaHash&&o.enable(18),x.batching&&o.enable(19),x.dispersion&&o.enable(20),x.batchingColor&&o.enable(21),x.gradientMap&&o.enable(22),v.push(o.mask),o.disableAll(),x.fog&&o.enable(0),x.useFog&&o.enable(1),x.flatShading&&o.enable(2),x.logarithmicDepthBuffer&&o.enable(3),x.reversedDepthBuffer&&o.enable(4),x.skinning&&o.enable(5),x.morphTargets&&o.enable(6),x.morphNormals&&o.enable(7),x.morphColors&&o.enable(8),x.premultipliedAlpha&&o.enable(9),x.shadowMapEnabled&&o.enable(10),x.doubleSided&&o.enable(11),x.flipSided&&o.enable(12),x.useDepthPacking&&o.enable(13),x.dithering&&o.enable(14),x.transmission&&o.enable(15),x.sheen&&o.enable(16),x.opaque&&o.enable(17),x.pointsUvs&&o.enable(18),x.decodeVideoTexture&&o.enable(19),x.decodeVideoTextureEmissive&&o.enable(20),x.alphaToCoverage&&o.enable(21),v.push(o.mask)}function y(v){const x=_[v.type];let R;if(x){const I=Kn[x];R=cw.clone(I.uniforms)}else R=v.uniforms;return R}function C(v,x){let R;for(let I=0,U=u.length;I<U;I++){const z=u[I];if(z.cacheKey===x){R=z,++R.usedTimes;break}}return R===void 0&&(R=new hA(t,x,v,s),u.push(R)),R}function M(v){if(--v.usedTimes===0){const x=u.indexOf(v);u[x]=u[u.length-1],u.pop(),v.destroy()}}function T(v){l.remove(v)}function A(){l.dispose()}return{getParameters:m,getProgramCacheKey:h,getUniforms:y,acquireProgram:C,releaseProgram:M,releaseShaderCache:T,programs:u,dispose:A}}function yA(){let t=new WeakMap;function e(r){return t.has(r)}function n(r){let o=t.get(r);return o===void 0&&(o={},t.set(r,o)),o}function i(r){t.delete(r)}function a(r,o,l){t.get(r)[o]=l}function s(){t=new WeakMap}return{has:e,get:n,remove:i,update:a,dispose:s}}function bA(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.material.id!==e.material.id?t.material.id-e.material.id:t.z!==e.z?t.z-e.z:t.id-e.id}function gm(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.z!==e.z?e.z-t.z:t.id-e.id}function vm(){const t=[];let e=0;const n=[],i=[],a=[];function s(){e=0,n.length=0,i.length=0,a.length=0}function r(d,f,p,_,g,m){let h=t[e];return h===void 0?(h={id:d.id,object:d,geometry:f,material:p,groupOrder:_,renderOrder:d.renderOrder,z:g,group:m},t[e]=h):(h.id=d.id,h.object=d,h.geometry=f,h.material=p,h.groupOrder=_,h.renderOrder=d.renderOrder,h.z=g,h.group=m),e++,h}function o(d,f,p,_,g,m){const h=r(d,f,p,_,g,m);p.transmission>0?i.push(h):p.transparent===!0?a.push(h):n.push(h)}function l(d,f,p,_,g,m){const h=r(d,f,p,_,g,m);p.transmission>0?i.unshift(h):p.transparent===!0?a.unshift(h):n.unshift(h)}function c(d,f){n.length>1&&n.sort(d||bA),i.length>1&&i.sort(f||gm),a.length>1&&a.sort(f||gm)}function u(){for(let d=e,f=t.length;d<f;d++){const p=t[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:n,transmissive:i,transparent:a,init:s,push:o,unshift:l,finish:u,sort:c}}function xA(){let t=new WeakMap;function e(i,a){const s=t.get(i);let r;return s===void 0?(r=new vm,t.set(i,[r])):a>=s.length?(r=new vm,s.push(r)):r=s[a],r}function n(){t=new WeakMap}return{get:e,dispose:n}}function SA(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new L,color:new je};break;case"SpotLight":n={position:new L,direction:new L,color:new je,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new L,color:new je,distance:0,decay:0};break;case"HemisphereLight":n={direction:new L,skyColor:new je,groundColor:new je};break;case"RectAreaLight":n={color:new je,position:new L,halfWidth:new L,halfHeight:new L};break}return t[e.id]=n,n}}}function wA(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ce};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ce};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ce,shadowCameraNear:1,shadowCameraFar:1e3};break}return t[e.id]=n,n}}}let EA=0;function MA(t,e){return(e.castShadow?2:0)-(t.castShadow?2:0)+(e.map?1:0)-(t.map?1:0)}function TA(t){const e=new SA,n=wA(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new L);const a=new L,s=new yt,r=new yt;function o(c){let u=0,d=0,f=0;for(let v=0;v<9;v++)i.probe[v].set(0,0,0);let p=0,_=0,g=0,m=0,h=0,b=0,S=0,y=0,C=0,M=0,T=0;c.sort(MA);for(let v=0,x=c.length;v<x;v++){const R=c[v],I=R.color,U=R.intensity,z=R.distance,G=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)u+=I.r*U,d+=I.g*U,f+=I.b*U;else if(R.isLightProbe){for(let B=0;B<9;B++)i.probe[B].addScaledVector(R.sh.coefficients[B],U);T++}else if(R.isDirectionalLight){const B=e.get(R);if(B.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const X=R.shadow,V=n.get(R);V.shadowIntensity=X.intensity,V.shadowBias=X.bias,V.shadowNormalBias=X.normalBias,V.shadowRadius=X.radius,V.shadowMapSize=X.mapSize,i.directionalShadow[p]=V,i.directionalShadowMap[p]=G,i.directionalShadowMatrix[p]=R.shadow.matrix,b++}i.directional[p]=B,p++}else if(R.isSpotLight){const B=e.get(R);B.position.setFromMatrixPosition(R.matrixWorld),B.color.copy(I).multiplyScalar(U),B.distance=z,B.coneCos=Math.cos(R.angle),B.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),B.decay=R.decay,i.spot[g]=B;const X=R.shadow;if(R.map&&(i.spotLightMap[C]=R.map,C++,X.updateMatrices(R),R.castShadow&&M++),i.spotLightMatrix[g]=X.matrix,R.castShadow){const V=n.get(R);V.shadowIntensity=X.intensity,V.shadowBias=X.bias,V.shadowNormalBias=X.normalBias,V.shadowRadius=X.radius,V.shadowMapSize=X.mapSize,i.spotShadow[g]=V,i.spotShadowMap[g]=G,y++}g++}else if(R.isRectAreaLight){const B=e.get(R);B.color.copy(I).multiplyScalar(U),B.halfWidth.set(R.width*.5,0,0),B.halfHeight.set(0,R.height*.5,0),i.rectArea[m]=B,m++}else if(R.isPointLight){const B=e.get(R);if(B.color.copy(R.color).multiplyScalar(R.intensity),B.distance=R.distance,B.decay=R.decay,R.castShadow){const X=R.shadow,V=n.get(R);V.shadowIntensity=X.intensity,V.shadowBias=X.bias,V.shadowNormalBias=X.normalBias,V.shadowRadius=X.radius,V.shadowMapSize=X.mapSize,V.shadowCameraNear=X.camera.near,V.shadowCameraFar=X.camera.far,i.pointShadow[_]=V,i.pointShadowMap[_]=G,i.pointShadowMatrix[_]=R.shadow.matrix,S++}i.point[_]=B,_++}else if(R.isHemisphereLight){const B=e.get(R);B.skyColor.copy(R.color).multiplyScalar(U),B.groundColor.copy(R.groundColor).multiplyScalar(U),i.hemi[h]=B,h++}}m>0&&(t.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=fe.LTC_FLOAT_1,i.rectAreaLTC2=fe.LTC_FLOAT_2):(i.rectAreaLTC1=fe.LTC_HALF_1,i.rectAreaLTC2=fe.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=d,i.ambient[2]=f;const A=i.hash;(A.directionalLength!==p||A.pointLength!==_||A.spotLength!==g||A.rectAreaLength!==m||A.hemiLength!==h||A.numDirectionalShadows!==b||A.numPointShadows!==S||A.numSpotShadows!==y||A.numSpotMaps!==C||A.numLightProbes!==T)&&(i.directional.length=p,i.spot.length=g,i.rectArea.length=m,i.point.length=_,i.hemi.length=h,i.directionalShadow.length=b,i.directionalShadowMap.length=b,i.pointShadow.length=S,i.pointShadowMap.length=S,i.spotShadow.length=y,i.spotShadowMap.length=y,i.directionalShadowMatrix.length=b,i.pointShadowMatrix.length=S,i.spotLightMatrix.length=y+C-M,i.spotLightMap.length=C,i.numSpotLightShadowsWithMaps=M,i.numLightProbes=T,A.directionalLength=p,A.pointLength=_,A.spotLength=g,A.rectAreaLength=m,A.hemiLength=h,A.numDirectionalShadows=b,A.numPointShadows=S,A.numSpotShadows=y,A.numSpotMaps=C,A.numLightProbes=T,i.version=EA++)}function l(c,u){let d=0,f=0,p=0,_=0,g=0;const m=u.matrixWorldInverse;for(let h=0,b=c.length;h<b;h++){const S=c[h];if(S.isDirectionalLight){const y=i.directional[d];y.direction.setFromMatrixPosition(S.matrixWorld),a.setFromMatrixPosition(S.target.matrixWorld),y.direction.sub(a),y.direction.transformDirection(m),d++}else if(S.isSpotLight){const y=i.spot[p];y.position.setFromMatrixPosition(S.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(S.matrixWorld),a.setFromMatrixPosition(S.target.matrixWorld),y.direction.sub(a),y.direction.transformDirection(m),p++}else if(S.isRectAreaLight){const y=i.rectArea[_];y.position.setFromMatrixPosition(S.matrixWorld),y.position.applyMatrix4(m),r.identity(),s.copy(S.matrixWorld),s.premultiply(m),r.extractRotation(s),y.halfWidth.set(S.width*.5,0,0),y.halfHeight.set(0,S.height*.5,0),y.halfWidth.applyMatrix4(r),y.halfHeight.applyMatrix4(r),_++}else if(S.isPointLight){const y=i.point[f];y.position.setFromMatrixPosition(S.matrixWorld),y.position.applyMatrix4(m),f++}else if(S.isHemisphereLight){const y=i.hemi[g];y.direction.setFromMatrixPosition(S.matrixWorld),y.direction.transformDirection(m),g++}}}return{setup:o,setupView:l,state:i}}function ym(t){const e=new TA(t),n=[],i=[];function a(u){c.camera=u,n.length=0,i.length=0}function s(u){n.push(u)}function r(u){i.push(u)}function o(){e.setup(n)}function l(u){e.setupView(n,u)}const c={lightsArray:n,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:a,state:c,setupLights:o,setupLightsView:l,pushLight:s,pushShadow:r}}function AA(t){let e=new WeakMap;function n(a,s=0){const r=e.get(a);let o;return r===void 0?(o=new ym(t),e.set(a,[o])):s>=r.length?(o=new ym(t),r.push(o)):o=r[s],o}function i(){e=new WeakMap}return{get:n,dispose:i}}const CA=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,RA=`uniform sampler2D shadow_pass;
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
}`;function PA(t,e,n){let i=new wp;const a=new ce,s=new ce,r=new Mt,o=new Jw({depthPacking:vS}),l=new Qw,c={},u=n.maxTextureSize,d={[Yi]:on,[on]:Yi,[Qe]:Qe},f=new Ki({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ce},radius:{value:4}},vertexShader:CA,fragmentShader:RA}),p=f.clone();p.defines.HORIZONTAL_PASS=1;const _=new At;_.setAttribute("position",new Gn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new He(_,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=dv;let h=this.type;this.render=function(M,T,A){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||M.length===0)return;const v=t.getRenderTarget(),x=t.getActiveCubeFace(),R=t.getActiveMipmapLevel(),I=t.state;I.setBlending(Bi),I.buffers.depth.getReversed()===!0?I.buffers.color.setClear(0,0,0,0):I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);const U=h!==gi&&this.type===gi,z=h===gi&&this.type!==gi;for(let G=0,B=M.length;G<B;G++){const X=M[G],V=X.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",X,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;a.copy(V.mapSize);const ee=V.getFrameExtents();if(a.multiply(ee),s.copy(V.mapSize),(a.x>u||a.y>u)&&(a.x>u&&(s.x=Math.floor(u/ee.x),a.x=s.x*ee.x,V.mapSize.x=s.x),a.y>u&&(s.y=Math.floor(u/ee.y),a.y=s.y*ee.y,V.mapSize.y=s.y)),V.map===null||U===!0||z===!0){const q=this.type!==gi?{minFilter:Vn,magFilter:Vn}:{};V.map!==null&&V.map.dispose(),V.map=new Ca(a.x,a.y,q),V.map.texture.name=X.name+".shadowMap",V.camera.updateProjectionMatrix()}t.setRenderTarget(V.map),t.clear();const pe=V.getViewportCount();for(let q=0;q<pe;q++){const de=V.getViewport(q);r.set(s.x*de.x,s.y*de.y,s.x*de.z,s.y*de.w),I.viewport(r),V.updateMatrices(X,q),i=V.getFrustum(),y(T,A,V.camera,X,this.type)}V.isPointLightShadow!==!0&&this.type===gi&&b(V,A),V.needsUpdate=!1}h=this.type,m.needsUpdate=!1,t.setRenderTarget(v,x,R)};function b(M,T){const A=e.update(g);f.defines.VSM_SAMPLES!==M.blurSamples&&(f.defines.VSM_SAMPLES=M.blurSamples,p.defines.VSM_SAMPLES=M.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),M.mapPass===null&&(M.mapPass=new Ca(a.x,a.y)),f.uniforms.shadow_pass.value=M.map.texture,f.uniforms.resolution.value=M.mapSize,f.uniforms.radius.value=M.radius,t.setRenderTarget(M.mapPass),t.clear(),t.renderBufferDirect(T,null,A,f,g,null),p.uniforms.shadow_pass.value=M.mapPass.texture,p.uniforms.resolution.value=M.mapSize,p.uniforms.radius.value=M.radius,t.setRenderTarget(M.map),t.clear(),t.renderBufferDirect(T,null,A,p,g,null)}function S(M,T,A,v){let x=null;const R=A.isPointLight===!0?M.customDistanceMaterial:M.customDepthMaterial;if(R!==void 0)x=R;else if(x=A.isPointLight===!0?l:o,t.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0||T.alphaToCoverage===!0){const I=x.uuid,U=T.uuid;let z=c[I];z===void 0&&(z={},c[I]=z);let G=z[U];G===void 0&&(G=x.clone(),z[U]=G,T.addEventListener("dispose",C)),x=G}if(x.visible=T.visible,x.wireframe=T.wireframe,v===gi?x.side=T.shadowSide!==null?T.shadowSide:T.side:x.side=T.shadowSide!==null?T.shadowSide:d[T.side],x.alphaMap=T.alphaMap,x.alphaTest=T.alphaToCoverage===!0?.5:T.alphaTest,x.map=T.map,x.clipShadows=T.clipShadows,x.clippingPlanes=T.clippingPlanes,x.clipIntersection=T.clipIntersection,x.displacementMap=T.displacementMap,x.displacementScale=T.displacementScale,x.displacementBias=T.displacementBias,x.wireframeLinewidth=T.wireframeLinewidth,x.linewidth=T.linewidth,A.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const I=t.properties.get(x);I.light=A}return x}function y(M,T,A,v,x){if(M.visible===!1)return;if(M.layers.test(T.layers)&&(M.isMesh||M.isLine||M.isPoints)&&(M.castShadow||M.receiveShadow&&x===gi)&&(!M.frustumCulled||i.intersectsObject(M))){M.modelViewMatrix.multiplyMatrices(A.matrixWorldInverse,M.matrixWorld);const U=e.update(M),z=M.material;if(Array.isArray(z)){const G=U.groups;for(let B=0,X=G.length;B<X;B++){const V=G[B],ee=z[V.materialIndex];if(ee&&ee.visible){const pe=S(M,ee,v,x);M.onBeforeShadow(t,M,T,A,U,pe,V),t.renderBufferDirect(A,null,U,pe,M,V),M.onAfterShadow(t,M,T,A,U,pe,V)}}}else if(z.visible){const G=S(M,z,v,x);M.onBeforeShadow(t,M,T,A,U,G,null),t.renderBufferDirect(A,null,U,G,M,null),M.onAfterShadow(t,M,T,A,U,G,null)}}const I=M.children;for(let U=0,z=I.length;U<z;U++)y(I[U],T,A,v,x)}function C(M){M.target.removeEventListener("dispose",C);for(const A in c){const v=c[A],x=M.target.uuid;x in v&&(v[x].dispose(),delete v[x])}}}const LA={[_d]:gd,[vd]:xd,[yd]:Sd,[Rs]:bd,[gd]:_d,[xd]:vd,[Sd]:yd,[bd]:Rs};function NA(t,e){function n(){let D=!1;const oe=new Mt;let ue=null;const Ee=new Mt(0,0,0,0);return{setMask:function(ae){ue!==ae&&!D&&(t.colorMask(ae,ae,ae,ae),ue=ae)},setLocked:function(ae){D=ae},setClear:function(ae,J,Te,Ve,ft){ft===!0&&(ae*=Ve,J*=Ve,Te*=Ve),oe.set(ae,J,Te,Ve),Ee.equals(oe)===!1&&(t.clearColor(ae,J,Te,Ve),Ee.copy(oe))},reset:function(){D=!1,ue=null,Ee.set(-1,0,0,0)}}}function i(){let D=!1,oe=!1,ue=null,Ee=null,ae=null;return{setReversed:function(J){if(oe!==J){const Te=e.get("EXT_clip_control");J?Te.clipControlEXT(Te.LOWER_LEFT_EXT,Te.ZERO_TO_ONE_EXT):Te.clipControlEXT(Te.LOWER_LEFT_EXT,Te.NEGATIVE_ONE_TO_ONE_EXT),oe=J;const Ve=ae;ae=null,this.setClear(Ve)}},getReversed:function(){return oe},setTest:function(J){J?Y(t.DEPTH_TEST):ie(t.DEPTH_TEST)},setMask:function(J){ue!==J&&!D&&(t.depthMask(J),ue=J)},setFunc:function(J){if(oe&&(J=LA[J]),Ee!==J){switch(J){case _d:t.depthFunc(t.NEVER);break;case gd:t.depthFunc(t.ALWAYS);break;case vd:t.depthFunc(t.LESS);break;case Rs:t.depthFunc(t.LEQUAL);break;case yd:t.depthFunc(t.EQUAL);break;case bd:t.depthFunc(t.GEQUAL);break;case xd:t.depthFunc(t.GREATER);break;case Sd:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}Ee=J}},setLocked:function(J){D=J},setClear:function(J){ae!==J&&(oe&&(J=1-J),t.clearDepth(J),ae=J)},reset:function(){D=!1,ue=null,Ee=null,ae=null,oe=!1}}}function a(){let D=!1,oe=null,ue=null,Ee=null,ae=null,J=null,Te=null,Ve=null,ft=null;return{setTest:function(nt){D||(nt?Y(t.STENCIL_TEST):ie(t.STENCIL_TEST))},setMask:function(nt){oe!==nt&&!D&&(t.stencilMask(nt),oe=nt)},setFunc:function(nt,ui,Wn){(ue!==nt||Ee!==ui||ae!==Wn)&&(t.stencilFunc(nt,ui,Wn),ue=nt,Ee=ui,ae=Wn)},setOp:function(nt,ui,Wn){(J!==nt||Te!==ui||Ve!==Wn)&&(t.stencilOp(nt,ui,Wn),J=nt,Te=ui,Ve=Wn)},setLocked:function(nt){D=nt},setClear:function(nt){ft!==nt&&(t.clearStencil(nt),ft=nt)},reset:function(){D=!1,oe=null,ue=null,Ee=null,ae=null,J=null,Te=null,Ve=null,ft=null}}}const s=new n,r=new i,o=new a,l=new WeakMap,c=new WeakMap;let u={},d={},f=new WeakMap,p=[],_=null,g=!1,m=null,h=null,b=null,S=null,y=null,C=null,M=null,T=new je(0,0,0),A=0,v=!1,x=null,R=null,I=null,U=null,z=null;const G=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let B=!1,X=0;const V=t.getParameter(t.VERSION);V.indexOf("WebGL")!==-1?(X=parseFloat(/^WebGL (\d)/.exec(V)[1]),B=X>=1):V.indexOf("OpenGL ES")!==-1&&(X=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),B=X>=2);let ee=null,pe={};const q=t.getParameter(t.SCISSOR_BOX),de=t.getParameter(t.VIEWPORT),we=new Mt().fromArray(q),be=new Mt().fromArray(de);function me(D,oe,ue,Ee){const ae=new Uint8Array(4),J=t.createTexture();t.bindTexture(D,J),t.texParameteri(D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(D,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let Te=0;Te<ue;Te++)D===t.TEXTURE_3D||D===t.TEXTURE_2D_ARRAY?t.texImage3D(oe,0,t.RGBA,1,1,Ee,0,t.RGBA,t.UNSIGNED_BYTE,ae):t.texImage2D(oe+Te,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,ae);return J}const O={};O[t.TEXTURE_2D]=me(t.TEXTURE_2D,t.TEXTURE_2D,1),O[t.TEXTURE_CUBE_MAP]=me(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),O[t.TEXTURE_2D_ARRAY]=me(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),O[t.TEXTURE_3D]=me(t.TEXTURE_3D,t.TEXTURE_3D,1,1),s.setClear(0,0,0,1),r.setClear(1),o.setClear(0),Y(t.DEPTH_TEST),r.setFunc(Rs),Be(!1),Ae(dh),Y(t.CULL_FACE),ot(Bi);function Y(D){u[D]!==!0&&(t.enable(D),u[D]=!0)}function ie(D){u[D]!==!1&&(t.disable(D),u[D]=!1)}function Se(D,oe){return d[D]!==oe?(t.bindFramebuffer(D,oe),d[D]=oe,D===t.DRAW_FRAMEBUFFER&&(d[t.FRAMEBUFFER]=oe),D===t.FRAMEBUFFER&&(d[t.DRAW_FRAMEBUFFER]=oe),!0):!1}function ye(D,oe){let ue=p,Ee=!1;if(D){ue=f.get(oe),ue===void 0&&(ue=[],f.set(oe,ue));const ae=D.textures;if(ue.length!==ae.length||ue[0]!==t.COLOR_ATTACHMENT0){for(let J=0,Te=ae.length;J<Te;J++)ue[J]=t.COLOR_ATTACHMENT0+J;ue.length=ae.length,Ee=!0}}else ue[0]!==t.BACK&&(ue[0]=t.BACK,Ee=!0);Ee&&t.drawBuffers(ue)}function Fe(D){return _!==D?(t.useProgram(D),_=D,!0):!1}const rt={[_a]:t.FUNC_ADD,[$x]:t.FUNC_SUBTRACT,[Wx]:t.FUNC_REVERSE_SUBTRACT};rt[Xx]=t.MIN,rt[qx]=t.MAX;const N={[Yx]:t.ZERO,[Kx]:t.ONE,[jx]:t.SRC_COLOR,[hd]:t.SRC_ALPHA,[nS]:t.SRC_ALPHA_SATURATE,[eS]:t.DST_COLOR,[Jx]:t.DST_ALPHA,[Zx]:t.ONE_MINUS_SRC_COLOR,[md]:t.ONE_MINUS_SRC_ALPHA,[tS]:t.ONE_MINUS_DST_COLOR,[Qx]:t.ONE_MINUS_DST_ALPHA,[iS]:t.CONSTANT_COLOR,[aS]:t.ONE_MINUS_CONSTANT_COLOR,[sS]:t.CONSTANT_ALPHA,[rS]:t.ONE_MINUS_CONSTANT_ALPHA};function ot(D,oe,ue,Ee,ae,J,Te,Ve,ft,nt){if(D===Bi){g===!0&&(ie(t.BLEND),g=!1);return}if(g===!1&&(Y(t.BLEND),g=!0),D!==Gx){if(D!==m||nt!==v){if((h!==_a||y!==_a)&&(t.blendEquation(t.FUNC_ADD),h=_a,y=_a),nt)switch(D){case ms:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case zi:t.blendFunc(t.ONE,t.ONE);break;case fh:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case ph:t.blendFuncSeparate(t.DST_COLOR,t.ONE_MINUS_SRC_ALPHA,t.ZERO,t.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case ms:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case zi:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE,t.ONE,t.ONE);break;case fh:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case ph:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}b=null,S=null,C=null,M=null,T.set(0,0,0),A=0,m=D,v=nt}return}ae=ae||oe,J=J||ue,Te=Te||Ee,(oe!==h||ae!==y)&&(t.blendEquationSeparate(rt[oe],rt[ae]),h=oe,y=ae),(ue!==b||Ee!==S||J!==C||Te!==M)&&(t.blendFuncSeparate(N[ue],N[Ee],N[J],N[Te]),b=ue,S=Ee,C=J,M=Te),(Ve.equals(T)===!1||ft!==A)&&(t.blendColor(Ve.r,Ve.g,Ve.b,ft),T.copy(Ve),A=ft),m=D,v=!1}function Ge(D,oe){D.side===Qe?ie(t.CULL_FACE):Y(t.CULL_FACE);let ue=D.side===on;oe&&(ue=!ue),Be(ue),D.blending===ms&&D.transparent===!1?ot(Bi):ot(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),r.setFunc(D.depthFunc),r.setTest(D.depthTest),r.setMask(D.depthWrite),s.setMask(D.colorWrite);const Ee=D.stencilWrite;o.setTest(Ee),Ee&&(o.setMask(D.stencilWriteMask),o.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),o.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),Ce(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?Y(t.SAMPLE_ALPHA_TO_COVERAGE):ie(t.SAMPLE_ALPHA_TO_COVERAGE)}function Be(D){x!==D&&(D?t.frontFace(t.CW):t.frontFace(t.CCW),x=D)}function Ae(D){D!==zx?(Y(t.CULL_FACE),D!==R&&(D===dh?t.cullFace(t.BACK):D===Hx?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))):ie(t.CULL_FACE),R=D}function gt(D){D!==I&&(B&&t.lineWidth(D),I=D)}function Ce(D,oe,ue){D?(Y(t.POLYGON_OFFSET_FILL),(U!==oe||z!==ue)&&(t.polygonOffset(oe,ue),U=oe,z=ue)):ie(t.POLYGON_OFFSET_FILL)}function Xe(D){D?Y(t.SCISSOR_TEST):ie(t.SCISSOR_TEST)}function kt(D){D===void 0&&(D=t.TEXTURE0+G-1),ee!==D&&(t.activeTexture(D),ee=D)}function Tt(D,oe,ue){ue===void 0&&(ee===null?ue=t.TEXTURE0+G-1:ue=ee);let Ee=pe[ue];Ee===void 0&&(Ee={type:void 0,texture:void 0},pe[ue]=Ee),(Ee.type!==D||Ee.texture!==oe)&&(ee!==ue&&(t.activeTexture(ue),ee=ue),t.bindTexture(D,oe||O[D]),Ee.type=D,Ee.texture=oe)}function P(){const D=pe[ee];D!==void 0&&D.type!==void 0&&(t.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function w(){try{t.compressedTexImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function H(){try{t.compressedTexImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Z(){try{t.texSubImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Q(){try{t.texSubImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function K(){try{t.compressedTexSubImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ne(){try{t.compressedTexSubImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function le(){try{t.texStorage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Re(){try{t.texStorage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Pe(){try{t.texImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function re(){try{t.texImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ge(D){we.equals(D)===!1&&(t.scissor(D.x,D.y,D.z,D.w),we.copy(D))}function Oe(D){be.equals(D)===!1&&(t.viewport(D.x,D.y,D.z,D.w),be.copy(D))}function Le(D,oe){let ue=c.get(oe);ue===void 0&&(ue=new WeakMap,c.set(oe,ue));let Ee=ue.get(D);Ee===void 0&&(Ee=t.getUniformBlockIndex(oe,D.name),ue.set(D,Ee))}function he(D,oe){const Ee=c.get(oe).get(D);l.get(oe)!==Ee&&(t.uniformBlockBinding(oe,Ee,D.__bindingPointIndex),l.set(oe,Ee))}function $e(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),r.setReversed(!1),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),u={},ee=null,pe={},d={},f=new WeakMap,p=[],_=null,g=!1,m=null,h=null,b=null,S=null,y=null,C=null,M=null,T=new je(0,0,0),A=0,v=!1,x=null,R=null,I=null,U=null,z=null,we.set(0,0,t.canvas.width,t.canvas.height),be.set(0,0,t.canvas.width,t.canvas.height),s.reset(),r.reset(),o.reset()}return{buffers:{color:s,depth:r,stencil:o},enable:Y,disable:ie,bindFramebuffer:Se,drawBuffers:ye,useProgram:Fe,setBlending:ot,setMaterial:Ge,setFlipSided:Be,setCullFace:Ae,setLineWidth:gt,setPolygonOffset:Ce,setScissorTest:Xe,activeTexture:kt,bindTexture:Tt,unbindTexture:P,compressedTexImage2D:w,compressedTexImage3D:H,texImage2D:Pe,texImage3D:re,updateUBOMapping:Le,uniformBlockBinding:he,texStorage2D:le,texStorage3D:Re,texSubImage2D:Z,texSubImage3D:Q,compressedTexSubImage2D:K,compressedTexSubImage3D:Ne,scissor:ge,viewport:Oe,reset:$e}}function IA(t,e,n,i,a,s,r){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ce,u=new WeakMap;let d;const f=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(P,w){return p?new OffscreenCanvas(P,w):ql("canvas")}function g(P,w,H){let Z=1;const Q=Tt(P);if((Q.width>H||Q.height>H)&&(Z=H/Math.max(Q.width,Q.height)),Z<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){const K=Math.floor(Z*Q.width),Ne=Math.floor(Z*Q.height);d===void 0&&(d=_(K,Ne));const le=w?_(K,Ne):d;return le.width=K,le.height=Ne,le.getContext("2d").drawImage(P,0,0,K,Ne),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+K+"x"+Ne+")."),le}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),P;return P}function m(P){return P.generateMipmaps}function h(P){t.generateMipmap(P)}function b(P){return P.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?t.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?t.TEXTURE_2D_ARRAY:t.TEXTURE_2D}function S(P,w,H,Z,Q=!1){if(P!==null){if(t[P]!==void 0)return t[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let K=w;if(w===t.RED&&(H===t.FLOAT&&(K=t.R32F),H===t.HALF_FLOAT&&(K=t.R16F),H===t.UNSIGNED_BYTE&&(K=t.R8)),w===t.RED_INTEGER&&(H===t.UNSIGNED_BYTE&&(K=t.R8UI),H===t.UNSIGNED_SHORT&&(K=t.R16UI),H===t.UNSIGNED_INT&&(K=t.R32UI),H===t.BYTE&&(K=t.R8I),H===t.SHORT&&(K=t.R16I),H===t.INT&&(K=t.R32I)),w===t.RG&&(H===t.FLOAT&&(K=t.RG32F),H===t.HALF_FLOAT&&(K=t.RG16F),H===t.UNSIGNED_BYTE&&(K=t.RG8)),w===t.RG_INTEGER&&(H===t.UNSIGNED_BYTE&&(K=t.RG8UI),H===t.UNSIGNED_SHORT&&(K=t.RG16UI),H===t.UNSIGNED_INT&&(K=t.RG32UI),H===t.BYTE&&(K=t.RG8I),H===t.SHORT&&(K=t.RG16I),H===t.INT&&(K=t.RG32I)),w===t.RGB_INTEGER&&(H===t.UNSIGNED_BYTE&&(K=t.RGB8UI),H===t.UNSIGNED_SHORT&&(K=t.RGB16UI),H===t.UNSIGNED_INT&&(K=t.RGB32UI),H===t.BYTE&&(K=t.RGB8I),H===t.SHORT&&(K=t.RGB16I),H===t.INT&&(K=t.RGB32I)),w===t.RGBA_INTEGER&&(H===t.UNSIGNED_BYTE&&(K=t.RGBA8UI),H===t.UNSIGNED_SHORT&&(K=t.RGBA16UI),H===t.UNSIGNED_INT&&(K=t.RGBA32UI),H===t.BYTE&&(K=t.RGBA8I),H===t.SHORT&&(K=t.RGBA16I),H===t.INT&&(K=t.RGBA32I)),w===t.RGB&&(H===t.UNSIGNED_INT_5_9_9_9_REV&&(K=t.RGB9_E5),H===t.UNSIGNED_INT_10F_11F_11F_REV&&(K=t.R11F_G11F_B10F)),w===t.RGBA){const Ne=Q?Wl:tt.getTransfer(Z);H===t.FLOAT&&(K=t.RGBA32F),H===t.HALF_FLOAT&&(K=t.RGBA16F),H===t.UNSIGNED_BYTE&&(K=Ne===ct?t.SRGB8_ALPHA8:t.RGBA8),H===t.UNSIGNED_SHORT_4_4_4_4&&(K=t.RGBA4),H===t.UNSIGNED_SHORT_5_5_5_1&&(K=t.RGB5_A1)}return(K===t.R16F||K===t.R32F||K===t.RG16F||K===t.RG32F||K===t.RGBA16F||K===t.RGBA32F)&&e.get("EXT_color_buffer_float"),K}function y(P,w){let H;return P?w===null||w===Aa||w===Br?H=t.DEPTH24_STENCIL8:w===bi?H=t.DEPTH32F_STENCIL8:w===Ur&&(H=t.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===Aa||w===Br?H=t.DEPTH_COMPONENT24:w===bi?H=t.DEPTH_COMPONENT32F:w===Ur&&(H=t.DEPTH_COMPONENT16),H}function C(P,w){return m(P)===!0||P.isFramebufferTexture&&P.minFilter!==Vn&&P.minFilter!==Jn?Math.log2(Math.max(w.width,w.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?w.mipmaps.length:1}function M(P){const w=P.target;w.removeEventListener("dispose",M),A(w),w.isVideoTexture&&u.delete(w)}function T(P){const w=P.target;w.removeEventListener("dispose",T),x(w)}function A(P){const w=i.get(P);if(w.__webglInit===void 0)return;const H=P.source,Z=f.get(H);if(Z){const Q=Z[w.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&v(P),Object.keys(Z).length===0&&f.delete(H)}i.remove(P)}function v(P){const w=i.get(P);t.deleteTexture(w.__webglTexture);const H=P.source,Z=f.get(H);delete Z[w.__cacheKey],r.memory.textures--}function x(P){const w=i.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),i.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(w.__webglFramebuffer[Z]))for(let Q=0;Q<w.__webglFramebuffer[Z].length;Q++)t.deleteFramebuffer(w.__webglFramebuffer[Z][Q]);else t.deleteFramebuffer(w.__webglFramebuffer[Z]);w.__webglDepthbuffer&&t.deleteRenderbuffer(w.__webglDepthbuffer[Z])}else{if(Array.isArray(w.__webglFramebuffer))for(let Z=0;Z<w.__webglFramebuffer.length;Z++)t.deleteFramebuffer(w.__webglFramebuffer[Z]);else t.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&t.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&t.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let Z=0;Z<w.__webglColorRenderbuffer.length;Z++)w.__webglColorRenderbuffer[Z]&&t.deleteRenderbuffer(w.__webglColorRenderbuffer[Z]);w.__webglDepthRenderbuffer&&t.deleteRenderbuffer(w.__webglDepthRenderbuffer)}const H=P.textures;for(let Z=0,Q=H.length;Z<Q;Z++){const K=i.get(H[Z]);K.__webglTexture&&(t.deleteTexture(K.__webglTexture),r.memory.textures--),i.remove(H[Z])}i.remove(P)}let R=0;function I(){R=0}function U(){const P=R;return P>=a.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+a.maxTextures),R+=1,P}function z(P){const w=[];return w.push(P.wrapS),w.push(P.wrapT),w.push(P.wrapR||0),w.push(P.magFilter),w.push(P.minFilter),w.push(P.anisotropy),w.push(P.internalFormat),w.push(P.format),w.push(P.type),w.push(P.generateMipmaps),w.push(P.premultiplyAlpha),w.push(P.flipY),w.push(P.unpackAlignment),w.push(P.colorSpace),w.join()}function G(P,w){const H=i.get(P);if(P.isVideoTexture&&Xe(P),P.isRenderTargetTexture===!1&&P.isExternalTexture!==!0&&P.version>0&&H.__version!==P.version){const Z=P.image;if(Z===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{O(H,P,w);return}}else P.isExternalTexture&&(H.__webglTexture=P.sourceTexture?P.sourceTexture:null);n.bindTexture(t.TEXTURE_2D,H.__webglTexture,t.TEXTURE0+w)}function B(P,w){const H=i.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&H.__version!==P.version){O(H,P,w);return}n.bindTexture(t.TEXTURE_2D_ARRAY,H.__webglTexture,t.TEXTURE0+w)}function X(P,w){const H=i.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&H.__version!==P.version){O(H,P,w);return}n.bindTexture(t.TEXTURE_3D,H.__webglTexture,t.TEXTURE0+w)}function V(P,w){const H=i.get(P);if(P.version>0&&H.__version!==P.version){Y(H,P,w);return}n.bindTexture(t.TEXTURE_CUBE_MAP,H.__webglTexture,t.TEXTURE0+w)}const ee={[Md]:t.REPEAT,[ya]:t.CLAMP_TO_EDGE,[Td]:t.MIRRORED_REPEAT},pe={[Vn]:t.NEAREST,[_S]:t.NEAREST_MIPMAP_NEAREST,[_o]:t.NEAREST_MIPMAP_LINEAR,[Jn]:t.LINEAR,[Wc]:t.LINEAR_MIPMAP_NEAREST,[ba]:t.LINEAR_MIPMAP_LINEAR},q={[bS]:t.NEVER,[TS]:t.ALWAYS,[xS]:t.LESS,[xv]:t.LEQUAL,[SS]:t.EQUAL,[MS]:t.GEQUAL,[wS]:t.GREATER,[ES]:t.NOTEQUAL};function de(P,w){if(w.type===bi&&e.has("OES_texture_float_linear")===!1&&(w.magFilter===Jn||w.magFilter===Wc||w.magFilter===_o||w.magFilter===ba||w.minFilter===Jn||w.minFilter===Wc||w.minFilter===_o||w.minFilter===ba)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),t.texParameteri(P,t.TEXTURE_WRAP_S,ee[w.wrapS]),t.texParameteri(P,t.TEXTURE_WRAP_T,ee[w.wrapT]),(P===t.TEXTURE_3D||P===t.TEXTURE_2D_ARRAY)&&t.texParameteri(P,t.TEXTURE_WRAP_R,ee[w.wrapR]),t.texParameteri(P,t.TEXTURE_MAG_FILTER,pe[w.magFilter]),t.texParameteri(P,t.TEXTURE_MIN_FILTER,pe[w.minFilter]),w.compareFunction&&(t.texParameteri(P,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(P,t.TEXTURE_COMPARE_FUNC,q[w.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===Vn||w.minFilter!==_o&&w.minFilter!==ba||w.type===bi&&e.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||i.get(w).__currentAnisotropy){const H=e.get("EXT_texture_filter_anisotropic");t.texParameterf(P,H.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,a.getMaxAnisotropy())),i.get(w).__currentAnisotropy=w.anisotropy}}}function we(P,w){let H=!1;P.__webglInit===void 0&&(P.__webglInit=!0,w.addEventListener("dispose",M));const Z=w.source;let Q=f.get(Z);Q===void 0&&(Q={},f.set(Z,Q));const K=z(w);if(K!==P.__cacheKey){Q[K]===void 0&&(Q[K]={texture:t.createTexture(),usedTimes:0},r.memory.textures++,H=!0),Q[K].usedTimes++;const Ne=Q[P.__cacheKey];Ne!==void 0&&(Q[P.__cacheKey].usedTimes--,Ne.usedTimes===0&&v(w)),P.__cacheKey=K,P.__webglTexture=Q[K].texture}return H}function be(P,w,H){return Math.floor(Math.floor(P/H)/w)}function me(P,w,H,Z){const K=P.updateRanges;if(K.length===0)n.texSubImage2D(t.TEXTURE_2D,0,0,0,w.width,w.height,H,Z,w.data);else{K.sort((re,ge)=>re.start-ge.start);let Ne=0;for(let re=1;re<K.length;re++){const ge=K[Ne],Oe=K[re],Le=ge.start+ge.count,he=be(Oe.start,w.width,4),$e=be(ge.start,w.width,4);Oe.start<=Le+1&&he===$e&&be(Oe.start+Oe.count-1,w.width,4)===he?ge.count=Math.max(ge.count,Oe.start+Oe.count-ge.start):(++Ne,K[Ne]=Oe)}K.length=Ne+1;const le=t.getParameter(t.UNPACK_ROW_LENGTH),Re=t.getParameter(t.UNPACK_SKIP_PIXELS),Pe=t.getParameter(t.UNPACK_SKIP_ROWS);t.pixelStorei(t.UNPACK_ROW_LENGTH,w.width);for(let re=0,ge=K.length;re<ge;re++){const Oe=K[re],Le=Math.floor(Oe.start/4),he=Math.ceil(Oe.count/4),$e=Le%w.width,D=Math.floor(Le/w.width),oe=he,ue=1;t.pixelStorei(t.UNPACK_SKIP_PIXELS,$e),t.pixelStorei(t.UNPACK_SKIP_ROWS,D),n.texSubImage2D(t.TEXTURE_2D,0,$e,D,oe,ue,H,Z,w.data)}P.clearUpdateRanges(),t.pixelStorei(t.UNPACK_ROW_LENGTH,le),t.pixelStorei(t.UNPACK_SKIP_PIXELS,Re),t.pixelStorei(t.UNPACK_SKIP_ROWS,Pe)}}function O(P,w,H){let Z=t.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(Z=t.TEXTURE_2D_ARRAY),w.isData3DTexture&&(Z=t.TEXTURE_3D);const Q=we(P,w),K=w.source;n.bindTexture(Z,P.__webglTexture,t.TEXTURE0+H);const Ne=i.get(K);if(K.version!==Ne.__version||Q===!0){n.activeTexture(t.TEXTURE0+H);const le=tt.getPrimaries(tt.workingColorSpace),Re=w.colorSpace===Oi?null:tt.getPrimaries(w.colorSpace),Pe=w.colorSpace===Oi||le===Re?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,w.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,w.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,Pe);let re=g(w.image,!1,a.maxTextureSize);re=kt(w,re);const ge=s.convert(w.format,w.colorSpace),Oe=s.convert(w.type);let Le=S(w.internalFormat,ge,Oe,w.colorSpace,w.isVideoTexture);de(Z,w);let he;const $e=w.mipmaps,D=w.isVideoTexture!==!0,oe=Ne.__version===void 0||Q===!0,ue=K.dataReady,Ee=C(w,re);if(w.isDepthTexture)Le=y(w.format===Hr,w.type),oe&&(D?n.texStorage2D(t.TEXTURE_2D,1,Le,re.width,re.height):n.texImage2D(t.TEXTURE_2D,0,Le,re.width,re.height,0,ge,Oe,null));else if(w.isDataTexture)if($e.length>0){D&&oe&&n.texStorage2D(t.TEXTURE_2D,Ee,Le,$e[0].width,$e[0].height);for(let ae=0,J=$e.length;ae<J;ae++)he=$e[ae],D?ue&&n.texSubImage2D(t.TEXTURE_2D,ae,0,0,he.width,he.height,ge,Oe,he.data):n.texImage2D(t.TEXTURE_2D,ae,Le,he.width,he.height,0,ge,Oe,he.data);w.generateMipmaps=!1}else D?(oe&&n.texStorage2D(t.TEXTURE_2D,Ee,Le,re.width,re.height),ue&&me(w,re,ge,Oe)):n.texImage2D(t.TEXTURE_2D,0,Le,re.width,re.height,0,ge,Oe,re.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){D&&oe&&n.texStorage3D(t.TEXTURE_2D_ARRAY,Ee,Le,$e[0].width,$e[0].height,re.depth);for(let ae=0,J=$e.length;ae<J;ae++)if(he=$e[ae],w.format!==Bn)if(ge!==null)if(D){if(ue)if(w.layerUpdates.size>0){const Te=Kh(he.width,he.height,w.format,w.type);for(const Ve of w.layerUpdates){const ft=he.data.subarray(Ve*Te/he.data.BYTES_PER_ELEMENT,(Ve+1)*Te/he.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,ae,0,0,Ve,he.width,he.height,1,ge,ft)}w.clearLayerUpdates()}else n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,ae,0,0,0,he.width,he.height,re.depth,ge,he.data)}else n.compressedTexImage3D(t.TEXTURE_2D_ARRAY,ae,Le,he.width,he.height,re.depth,0,he.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else D?ue&&n.texSubImage3D(t.TEXTURE_2D_ARRAY,ae,0,0,0,he.width,he.height,re.depth,ge,Oe,he.data):n.texImage3D(t.TEXTURE_2D_ARRAY,ae,Le,he.width,he.height,re.depth,0,ge,Oe,he.data)}else{D&&oe&&n.texStorage2D(t.TEXTURE_2D,Ee,Le,$e[0].width,$e[0].height);for(let ae=0,J=$e.length;ae<J;ae++)he=$e[ae],w.format!==Bn?ge!==null?D?ue&&n.compressedTexSubImage2D(t.TEXTURE_2D,ae,0,0,he.width,he.height,ge,he.data):n.compressedTexImage2D(t.TEXTURE_2D,ae,Le,he.width,he.height,0,he.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):D?ue&&n.texSubImage2D(t.TEXTURE_2D,ae,0,0,he.width,he.height,ge,Oe,he.data):n.texImage2D(t.TEXTURE_2D,ae,Le,he.width,he.height,0,ge,Oe,he.data)}else if(w.isDataArrayTexture)if(D){if(oe&&n.texStorage3D(t.TEXTURE_2D_ARRAY,Ee,Le,re.width,re.height,re.depth),ue)if(w.layerUpdates.size>0){const ae=Kh(re.width,re.height,w.format,w.type);for(const J of w.layerUpdates){const Te=re.data.subarray(J*ae/re.data.BYTES_PER_ELEMENT,(J+1)*ae/re.data.BYTES_PER_ELEMENT);n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,J,re.width,re.height,1,ge,Oe,Te)}w.clearLayerUpdates()}else n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,re.width,re.height,re.depth,ge,Oe,re.data)}else n.texImage3D(t.TEXTURE_2D_ARRAY,0,Le,re.width,re.height,re.depth,0,ge,Oe,re.data);else if(w.isData3DTexture)D?(oe&&n.texStorage3D(t.TEXTURE_3D,Ee,Le,re.width,re.height,re.depth),ue&&n.texSubImage3D(t.TEXTURE_3D,0,0,0,0,re.width,re.height,re.depth,ge,Oe,re.data)):n.texImage3D(t.TEXTURE_3D,0,Le,re.width,re.height,re.depth,0,ge,Oe,re.data);else if(w.isFramebufferTexture){if(oe)if(D)n.texStorage2D(t.TEXTURE_2D,Ee,Le,re.width,re.height);else{let ae=re.width,J=re.height;for(let Te=0;Te<Ee;Te++)n.texImage2D(t.TEXTURE_2D,Te,Le,ae,J,0,ge,Oe,null),ae>>=1,J>>=1}}else if($e.length>0){if(D&&oe){const ae=Tt($e[0]);n.texStorage2D(t.TEXTURE_2D,Ee,Le,ae.width,ae.height)}for(let ae=0,J=$e.length;ae<J;ae++)he=$e[ae],D?ue&&n.texSubImage2D(t.TEXTURE_2D,ae,0,0,ge,Oe,he):n.texImage2D(t.TEXTURE_2D,ae,Le,ge,Oe,he);w.generateMipmaps=!1}else if(D){if(oe){const ae=Tt(re);n.texStorage2D(t.TEXTURE_2D,Ee,Le,ae.width,ae.height)}ue&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,ge,Oe,re)}else n.texImage2D(t.TEXTURE_2D,0,Le,ge,Oe,re);m(w)&&h(Z),Ne.__version=K.version,w.onUpdate&&w.onUpdate(w)}P.__version=w.version}function Y(P,w,H){if(w.image.length!==6)return;const Z=we(P,w),Q=w.source;n.bindTexture(t.TEXTURE_CUBE_MAP,P.__webglTexture,t.TEXTURE0+H);const K=i.get(Q);if(Q.version!==K.__version||Z===!0){n.activeTexture(t.TEXTURE0+H);const Ne=tt.getPrimaries(tt.workingColorSpace),le=w.colorSpace===Oi?null:tt.getPrimaries(w.colorSpace),Re=w.colorSpace===Oi||Ne===le?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,w.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,w.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,Re);const Pe=w.isCompressedTexture||w.image[0].isCompressedTexture,re=w.image[0]&&w.image[0].isDataTexture,ge=[];for(let J=0;J<6;J++)!Pe&&!re?ge[J]=g(w.image[J],!0,a.maxCubemapSize):ge[J]=re?w.image[J].image:w.image[J],ge[J]=kt(w,ge[J]);const Oe=ge[0],Le=s.convert(w.format,w.colorSpace),he=s.convert(w.type),$e=S(w.internalFormat,Le,he,w.colorSpace),D=w.isVideoTexture!==!0,oe=K.__version===void 0||Z===!0,ue=Q.dataReady;let Ee=C(w,Oe);de(t.TEXTURE_CUBE_MAP,w);let ae;if(Pe){D&&oe&&n.texStorage2D(t.TEXTURE_CUBE_MAP,Ee,$e,Oe.width,Oe.height);for(let J=0;J<6;J++){ae=ge[J].mipmaps;for(let Te=0;Te<ae.length;Te++){const Ve=ae[Te];w.format!==Bn?Le!==null?D?ue&&n.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+J,Te,0,0,Ve.width,Ve.height,Le,Ve.data):n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+J,Te,$e,Ve.width,Ve.height,0,Ve.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):D?ue&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+J,Te,0,0,Ve.width,Ve.height,Le,he,Ve.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+J,Te,$e,Ve.width,Ve.height,0,Le,he,Ve.data)}}}else{if(ae=w.mipmaps,D&&oe){ae.length>0&&Ee++;const J=Tt(ge[0]);n.texStorage2D(t.TEXTURE_CUBE_MAP,Ee,$e,J.width,J.height)}for(let J=0;J<6;J++)if(re){D?ue&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,ge[J].width,ge[J].height,Le,he,ge[J].data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,$e,ge[J].width,ge[J].height,0,Le,he,ge[J].data);for(let Te=0;Te<ae.length;Te++){const ft=ae[Te].image[J].image;D?ue&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+J,Te+1,0,0,ft.width,ft.height,Le,he,ft.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+J,Te+1,$e,ft.width,ft.height,0,Le,he,ft.data)}}else{D?ue&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,Le,he,ge[J]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,$e,Le,he,ge[J]);for(let Te=0;Te<ae.length;Te++){const Ve=ae[Te];D?ue&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+J,Te+1,0,0,Le,he,Ve.image[J]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+J,Te+1,$e,Le,he,Ve.image[J])}}}m(w)&&h(t.TEXTURE_CUBE_MAP),K.__version=Q.version,w.onUpdate&&w.onUpdate(w)}P.__version=w.version}function ie(P,w,H,Z,Q,K){const Ne=s.convert(H.format,H.colorSpace),le=s.convert(H.type),Re=S(H.internalFormat,Ne,le,H.colorSpace),Pe=i.get(w),re=i.get(H);if(re.__renderTarget=w,!Pe.__hasExternalTextures){const ge=Math.max(1,w.width>>K),Oe=Math.max(1,w.height>>K);Q===t.TEXTURE_3D||Q===t.TEXTURE_2D_ARRAY?n.texImage3D(Q,K,Re,ge,Oe,w.depth,0,Ne,le,null):n.texImage2D(Q,K,Re,ge,Oe,0,Ne,le,null)}n.bindFramebuffer(t.FRAMEBUFFER,P),Ce(w)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,Z,Q,re.__webglTexture,0,gt(w)):(Q===t.TEXTURE_2D||Q>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,Z,Q,re.__webglTexture,K),n.bindFramebuffer(t.FRAMEBUFFER,null)}function Se(P,w,H){if(t.bindRenderbuffer(t.RENDERBUFFER,P),w.depthBuffer){const Z=w.depthTexture,Q=Z&&Z.isDepthTexture?Z.type:null,K=y(w.stencilBuffer,Q),Ne=w.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,le=gt(w);Ce(w)?o.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,le,K,w.width,w.height):H?t.renderbufferStorageMultisample(t.RENDERBUFFER,le,K,w.width,w.height):t.renderbufferStorage(t.RENDERBUFFER,K,w.width,w.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,Ne,t.RENDERBUFFER,P)}else{const Z=w.textures;for(let Q=0;Q<Z.length;Q++){const K=Z[Q],Ne=s.convert(K.format,K.colorSpace),le=s.convert(K.type),Re=S(K.internalFormat,Ne,le,K.colorSpace),Pe=gt(w);H&&Ce(w)===!1?t.renderbufferStorageMultisample(t.RENDERBUFFER,Pe,Re,w.width,w.height):Ce(w)?o.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,Pe,Re,w.width,w.height):t.renderbufferStorage(t.RENDERBUFFER,Re,w.width,w.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function ye(P,w){if(w&&w.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(t.FRAMEBUFFER,P),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Z=i.get(w.depthTexture);Z.__renderTarget=w,(!Z.__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),G(w.depthTexture,0);const Q=Z.__webglTexture,K=gt(w);if(w.depthTexture.format===zr)Ce(w)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,Q,0,K):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,Q,0);else if(w.depthTexture.format===Hr)Ce(w)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,Q,0,K):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function Fe(P){const w=i.get(P),H=P.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==P.depthTexture){const Z=P.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),Z){const Q=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,Z.removeEventListener("dispose",Q)};Z.addEventListener("dispose",Q),w.__depthDisposeCallback=Q}w.__boundDepthTexture=Z}if(P.depthTexture&&!w.__autoAllocateDepthBuffer){if(H)throw new Error("target.depthTexture not supported in Cube render targets");const Z=P.texture.mipmaps;Z&&Z.length>0?ye(w.__webglFramebuffer[0],P):ye(w.__webglFramebuffer,P)}else if(H){w.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)if(n.bindFramebuffer(t.FRAMEBUFFER,w.__webglFramebuffer[Z]),w.__webglDepthbuffer[Z]===void 0)w.__webglDepthbuffer[Z]=t.createRenderbuffer(),Se(w.__webglDepthbuffer[Z],P,!1);else{const Q=P.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,K=w.__webglDepthbuffer[Z];t.bindRenderbuffer(t.RENDERBUFFER,K),t.framebufferRenderbuffer(t.FRAMEBUFFER,Q,t.RENDERBUFFER,K)}}else{const Z=P.texture.mipmaps;if(Z&&Z.length>0?n.bindFramebuffer(t.FRAMEBUFFER,w.__webglFramebuffer[0]):n.bindFramebuffer(t.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=t.createRenderbuffer(),Se(w.__webglDepthbuffer,P,!1);else{const Q=P.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,K=w.__webglDepthbuffer;t.bindRenderbuffer(t.RENDERBUFFER,K),t.framebufferRenderbuffer(t.FRAMEBUFFER,Q,t.RENDERBUFFER,K)}}n.bindFramebuffer(t.FRAMEBUFFER,null)}function rt(P,w,H){const Z=i.get(P);w!==void 0&&ie(Z.__webglFramebuffer,P,P.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0),H!==void 0&&Fe(P)}function N(P){const w=P.texture,H=i.get(P),Z=i.get(w);P.addEventListener("dispose",T);const Q=P.textures,K=P.isWebGLCubeRenderTarget===!0,Ne=Q.length>1;if(Ne||(Z.__webglTexture===void 0&&(Z.__webglTexture=t.createTexture()),Z.__version=w.version,r.memory.textures++),K){H.__webglFramebuffer=[];for(let le=0;le<6;le++)if(w.mipmaps&&w.mipmaps.length>0){H.__webglFramebuffer[le]=[];for(let Re=0;Re<w.mipmaps.length;Re++)H.__webglFramebuffer[le][Re]=t.createFramebuffer()}else H.__webglFramebuffer[le]=t.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){H.__webglFramebuffer=[];for(let le=0;le<w.mipmaps.length;le++)H.__webglFramebuffer[le]=t.createFramebuffer()}else H.__webglFramebuffer=t.createFramebuffer();if(Ne)for(let le=0,Re=Q.length;le<Re;le++){const Pe=i.get(Q[le]);Pe.__webglTexture===void 0&&(Pe.__webglTexture=t.createTexture(),r.memory.textures++)}if(P.samples>0&&Ce(P)===!1){H.__webglMultisampledFramebuffer=t.createFramebuffer(),H.__webglColorRenderbuffer=[],n.bindFramebuffer(t.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let le=0;le<Q.length;le++){const Re=Q[le];H.__webglColorRenderbuffer[le]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,H.__webglColorRenderbuffer[le]);const Pe=s.convert(Re.format,Re.colorSpace),re=s.convert(Re.type),ge=S(Re.internalFormat,Pe,re,Re.colorSpace,P.isXRRenderTarget===!0),Oe=gt(P);t.renderbufferStorageMultisample(t.RENDERBUFFER,Oe,ge,P.width,P.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+le,t.RENDERBUFFER,H.__webglColorRenderbuffer[le])}t.bindRenderbuffer(t.RENDERBUFFER,null),P.depthBuffer&&(H.__webglDepthRenderbuffer=t.createRenderbuffer(),Se(H.__webglDepthRenderbuffer,P,!0)),n.bindFramebuffer(t.FRAMEBUFFER,null)}}if(K){n.bindTexture(t.TEXTURE_CUBE_MAP,Z.__webglTexture),de(t.TEXTURE_CUBE_MAP,w);for(let le=0;le<6;le++)if(w.mipmaps&&w.mipmaps.length>0)for(let Re=0;Re<w.mipmaps.length;Re++)ie(H.__webglFramebuffer[le][Re],P,w,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+le,Re);else ie(H.__webglFramebuffer[le],P,w,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+le,0);m(w)&&h(t.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(Ne){for(let le=0,Re=Q.length;le<Re;le++){const Pe=Q[le],re=i.get(Pe);let ge=t.TEXTURE_2D;(P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(ge=P.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(ge,re.__webglTexture),de(ge,Pe),ie(H.__webglFramebuffer,P,Pe,t.COLOR_ATTACHMENT0+le,ge,0),m(Pe)&&h(ge)}n.unbindTexture()}else{let le=t.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(le=P.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(le,Z.__webglTexture),de(le,w),w.mipmaps&&w.mipmaps.length>0)for(let Re=0;Re<w.mipmaps.length;Re++)ie(H.__webglFramebuffer[Re],P,w,t.COLOR_ATTACHMENT0,le,Re);else ie(H.__webglFramebuffer,P,w,t.COLOR_ATTACHMENT0,le,0);m(w)&&h(le),n.unbindTexture()}P.depthBuffer&&Fe(P)}function ot(P){const w=P.textures;for(let H=0,Z=w.length;H<Z;H++){const Q=w[H];if(m(Q)){const K=b(P),Ne=i.get(Q).__webglTexture;n.bindTexture(K,Ne),h(K),n.unbindTexture()}}}const Ge=[],Be=[];function Ae(P){if(P.samples>0){if(Ce(P)===!1){const w=P.textures,H=P.width,Z=P.height;let Q=t.COLOR_BUFFER_BIT;const K=P.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,Ne=i.get(P),le=w.length>1;if(le)for(let Pe=0;Pe<w.length;Pe++)n.bindFramebuffer(t.FRAMEBUFFER,Ne.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+Pe,t.RENDERBUFFER,null),n.bindFramebuffer(t.FRAMEBUFFER,Ne.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+Pe,t.TEXTURE_2D,null,0);n.bindFramebuffer(t.READ_FRAMEBUFFER,Ne.__webglMultisampledFramebuffer);const Re=P.texture.mipmaps;Re&&Re.length>0?n.bindFramebuffer(t.DRAW_FRAMEBUFFER,Ne.__webglFramebuffer[0]):n.bindFramebuffer(t.DRAW_FRAMEBUFFER,Ne.__webglFramebuffer);for(let Pe=0;Pe<w.length;Pe++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(Q|=t.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(Q|=t.STENCIL_BUFFER_BIT)),le){t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,Ne.__webglColorRenderbuffer[Pe]);const re=i.get(w[Pe]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,re,0)}t.blitFramebuffer(0,0,H,Z,0,0,H,Z,Q,t.NEAREST),l===!0&&(Ge.length=0,Be.length=0,Ge.push(t.COLOR_ATTACHMENT0+Pe),P.depthBuffer&&P.resolveDepthBuffer===!1&&(Ge.push(K),Be.push(K),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,Be)),t.invalidateFramebuffer(t.READ_FRAMEBUFFER,Ge))}if(n.bindFramebuffer(t.READ_FRAMEBUFFER,null),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),le)for(let Pe=0;Pe<w.length;Pe++){n.bindFramebuffer(t.FRAMEBUFFER,Ne.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+Pe,t.RENDERBUFFER,Ne.__webglColorRenderbuffer[Pe]);const re=i.get(w[Pe]).__webglTexture;n.bindFramebuffer(t.FRAMEBUFFER,Ne.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+Pe,t.TEXTURE_2D,re,0)}n.bindFramebuffer(t.DRAW_FRAMEBUFFER,Ne.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&l){const w=P.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[w])}}}function gt(P){return Math.min(a.maxSamples,P.samples)}function Ce(P){const w=i.get(P);return P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function Xe(P){const w=r.render.frame;u.get(P)!==w&&(u.set(P,w),P.update())}function kt(P,w){const H=P.colorSpace,Z=P.format,Q=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||H!==Ns&&H!==Oi&&(tt.getTransfer(H)===ct?(Z!==Bn||Q!==si)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",H)),w}function Tt(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(c.width=P.naturalWidth||P.width,c.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(c.width=P.displayWidth,c.height=P.displayHeight):(c.width=P.width,c.height=P.height),c}this.allocateTextureUnit=U,this.resetTextureUnits=I,this.setTexture2D=G,this.setTexture2DArray=B,this.setTexture3D=X,this.setTextureCube=V,this.rebindTextures=rt,this.setupRenderTarget=N,this.updateRenderTargetMipmap=ot,this.updateMultisampleRenderTarget=Ae,this.setupDepthRenderbuffer=Fe,this.setupFrameBufferTexture=ie,this.useMultisampledRTT=Ce}function DA(t,e){function n(i,a=Oi){let s;const r=tt.getTransfer(a);if(i===si)return t.UNSIGNED_BYTE;if(i===hp)return t.UNSIGNED_SHORT_4_4_4_4;if(i===mp)return t.UNSIGNED_SHORT_5_5_5_1;if(i===mv)return t.UNSIGNED_INT_5_9_9_9_REV;if(i===_v)return t.UNSIGNED_INT_10F_11F_11F_REV;if(i===pv)return t.BYTE;if(i===hv)return t.SHORT;if(i===Ur)return t.UNSIGNED_SHORT;if(i===pp)return t.INT;if(i===Aa)return t.UNSIGNED_INT;if(i===bi)return t.FLOAT;if(i===oo)return t.HALF_FLOAT;if(i===gv)return t.ALPHA;if(i===vv)return t.RGB;if(i===Bn)return t.RGBA;if(i===zr)return t.DEPTH_COMPONENT;if(i===Hr)return t.DEPTH_STENCIL;if(i===yv)return t.RED;if(i===_p)return t.RED_INTEGER;if(i===bv)return t.RG;if(i===gp)return t.RG_INTEGER;if(i===vp)return t.RGBA_INTEGER;if(i===vl||i===yl||i===bl||i===xl)if(r===ct)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===vl)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===yl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===bl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===xl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===vl)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===yl)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===bl)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===xl)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Ad||i===Cd||i===Rd||i===Pd)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Ad)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Cd)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Rd)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Pd)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Ld||i===Nd||i===Id)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Ld||i===Nd)return r===ct?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Id)return r===ct?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Dd||i===kd||i===Fd||i===Od||i===Ud||i===Bd||i===zd||i===Hd||i===Vd||i===Gd||i===$d||i===Wd||i===Xd||i===qd)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Dd)return r===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===kd)return r===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Fd)return r===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Od)return r===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Ud)return r===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Bd)return r===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===zd)return r===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Hd)return r===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Vd)return r===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Gd)return r===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===$d)return r===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Wd)return r===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Xd)return r===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===qd)return r===ct?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Yd||i===Kd||i===jd)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===Yd)return r===ct?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Kd)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===jd)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Zd||i===Jd||i===Qd||i===ef)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===Zd)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Jd)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Qd)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===ef)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Br?t.UNSIGNED_INT_24_8:t[i]!==void 0?t[i]:null}return{convert:n}}const kA=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,FA=`
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

}`;class OA{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,n){if(this.texture===null){const i=new kv(e.texture);(e.depthNear!==n.depthNear||e.depthFar!==n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const n=e.cameras[0].viewport,i=new Ki({vertexShader:kA,fragmentShader:FA,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new He(new an(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class UA extends Ia{constructor(e,n){super();const i=this;let a=null,s=1,r=null,o="local-floor",l=1,c=null,u=null,d=null,f=null,p=null,_=null;const g=typeof XRWebGLBinding<"u",m=new OA,h={},b=n.getContextAttributes();let S=null,y=null;const C=[],M=[],T=new ce;let A=null;const v=new wn;v.viewport=new Mt;const x=new wn;x.viewport=new Mt;const R=[v,x],I=new iE;let U=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(O){let Y=C[O];return Y===void 0&&(Y=new fu,C[O]=Y),Y.getTargetRaySpace()},this.getControllerGrip=function(O){let Y=C[O];return Y===void 0&&(Y=new fu,C[O]=Y),Y.getGripSpace()},this.getHand=function(O){let Y=C[O];return Y===void 0&&(Y=new fu,C[O]=Y),Y.getHandSpace()};function G(O){const Y=M.indexOf(O.inputSource);if(Y===-1)return;const ie=C[Y];ie!==void 0&&(ie.update(O.inputSource,O.frame,c||r),ie.dispatchEvent({type:O.type,data:O.inputSource}))}function B(){a.removeEventListener("select",G),a.removeEventListener("selectstart",G),a.removeEventListener("selectend",G),a.removeEventListener("squeeze",G),a.removeEventListener("squeezestart",G),a.removeEventListener("squeezeend",G),a.removeEventListener("end",B),a.removeEventListener("inputsourceschange",X);for(let O=0;O<C.length;O++){const Y=M[O];Y!==null&&(M[O]=null,C[O].disconnect(Y))}U=null,z=null,m.reset();for(const O in h)delete h[O];e.setRenderTarget(S),p=null,f=null,d=null,a=null,y=null,me.stop(),i.isPresenting=!1,e.setPixelRatio(A),e.setSize(T.width,T.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(O){s=O,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(O){o=O,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||r},this.setReferenceSpace=function(O){c=O},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return d===null&&g&&(d=new XRWebGLBinding(a,n)),d},this.getFrame=function(){return _},this.getSession=function(){return a},this.setSession=async function(O){if(a=O,a!==null){if(S=e.getRenderTarget(),a.addEventListener("select",G),a.addEventListener("selectstart",G),a.addEventListener("selectend",G),a.addEventListener("squeeze",G),a.addEventListener("squeezestart",G),a.addEventListener("squeezeend",G),a.addEventListener("end",B),a.addEventListener("inputsourceschange",X),b.xrCompatible!==!0&&await n.makeXRCompatible(),A=e.getPixelRatio(),e.getSize(T),g&&"createProjectionLayer"in XRWebGLBinding.prototype){let ie=null,Se=null,ye=null;b.depth&&(ye=b.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,ie=b.stencil?Hr:zr,Se=b.stencil?Br:Aa);const Fe={colorFormat:n.RGBA8,depthFormat:ye,scaleFactor:s};d=this.getBinding(),f=d.createProjectionLayer(Fe),a.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),y=new Ca(f.textureWidth,f.textureHeight,{format:Bn,type:si,depthTexture:new Dv(f.textureWidth,f.textureHeight,Se,void 0,void 0,void 0,void 0,void 0,void 0,ie),stencilBuffer:b.stencil,colorSpace:e.outputColorSpace,samples:b.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const ie={antialias:b.antialias,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(a,n,ie),a.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),y=new Ca(p.framebufferWidth,p.framebufferHeight,{format:Bn,type:si,colorSpace:e.outputColorSpace,stencilBuffer:b.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,r=await a.requestReferenceSpace(o),me.setContext(a),me.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(a!==null)return a.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function X(O){for(let Y=0;Y<O.removed.length;Y++){const ie=O.removed[Y],Se=M.indexOf(ie);Se>=0&&(M[Se]=null,C[Se].disconnect(ie))}for(let Y=0;Y<O.added.length;Y++){const ie=O.added[Y];let Se=M.indexOf(ie);if(Se===-1){for(let Fe=0;Fe<C.length;Fe++)if(Fe>=M.length){M.push(ie),Se=Fe;break}else if(M[Fe]===null){M[Fe]=ie,Se=Fe;break}if(Se===-1)break}const ye=C[Se];ye&&ye.connect(ie)}}const V=new L,ee=new L;function pe(O,Y,ie){V.setFromMatrixPosition(Y.matrixWorld),ee.setFromMatrixPosition(ie.matrixWorld);const Se=V.distanceTo(ee),ye=Y.projectionMatrix.elements,Fe=ie.projectionMatrix.elements,rt=ye[14]/(ye[10]-1),N=ye[14]/(ye[10]+1),ot=(ye[9]+1)/ye[5],Ge=(ye[9]-1)/ye[5],Be=(ye[8]-1)/ye[0],Ae=(Fe[8]+1)/Fe[0],gt=rt*Be,Ce=rt*Ae,Xe=Se/(-Be+Ae),kt=Xe*-Be;if(Y.matrixWorld.decompose(O.position,O.quaternion,O.scale),O.translateX(kt),O.translateZ(Xe),O.matrixWorld.compose(O.position,O.quaternion,O.scale),O.matrixWorldInverse.copy(O.matrixWorld).invert(),ye[10]===-1)O.projectionMatrix.copy(Y.projectionMatrix),O.projectionMatrixInverse.copy(Y.projectionMatrixInverse);else{const Tt=rt+Xe,P=N+Xe,w=gt-kt,H=Ce+(Se-kt),Z=ot*N/P*Tt,Q=Ge*N/P*Tt;O.projectionMatrix.makePerspective(w,H,Z,Q,Tt,P),O.projectionMatrixInverse.copy(O.projectionMatrix).invert()}}function q(O,Y){Y===null?O.matrixWorld.copy(O.matrix):O.matrixWorld.multiplyMatrices(Y.matrixWorld,O.matrix),O.matrixWorldInverse.copy(O.matrixWorld).invert()}this.updateCamera=function(O){if(a===null)return;let Y=O.near,ie=O.far;m.texture!==null&&(m.depthNear>0&&(Y=m.depthNear),m.depthFar>0&&(ie=m.depthFar)),I.near=x.near=v.near=Y,I.far=x.far=v.far=ie,(U!==I.near||z!==I.far)&&(a.updateRenderState({depthNear:I.near,depthFar:I.far}),U=I.near,z=I.far),I.layers.mask=O.layers.mask|6,v.layers.mask=I.layers.mask&3,x.layers.mask=I.layers.mask&5;const Se=O.parent,ye=I.cameras;q(I,Se);for(let Fe=0;Fe<ye.length;Fe++)q(ye[Fe],Se);ye.length===2?pe(I,v,x):I.projectionMatrix.copy(v.projectionMatrix),de(O,I,Se)};function de(O,Y,ie){ie===null?O.matrix.copy(Y.matrixWorld):(O.matrix.copy(ie.matrixWorld),O.matrix.invert(),O.matrix.multiply(Y.matrixWorld)),O.matrix.decompose(O.position,O.quaternion,O.scale),O.updateMatrixWorld(!0),O.projectionMatrix.copy(Y.projectionMatrix),O.projectionMatrixInverse.copy(Y.projectionMatrixInverse),O.isPerspectiveCamera&&(O.fov=Vr*2*Math.atan(1/O.projectionMatrix.elements[5]),O.zoom=1)}this.getCamera=function(){return I},this.getFoveation=function(){if(!(f===null&&p===null))return l},this.setFoveation=function(O){l=O,f!==null&&(f.fixedFoveation=O),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=O)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(I)},this.getCameraTexture=function(O){return h[O]};let we=null;function be(O,Y){if(u=Y.getViewerPose(c||r),_=Y,u!==null){const ie=u.views;p!==null&&(e.setRenderTargetFramebuffer(y,p.framebuffer),e.setRenderTarget(y));let Se=!1;ie.length!==I.cameras.length&&(I.cameras.length=0,Se=!0);for(let N=0;N<ie.length;N++){const ot=ie[N];let Ge=null;if(p!==null)Ge=p.getViewport(ot);else{const Ae=d.getViewSubImage(f,ot);Ge=Ae.viewport,N===0&&(e.setRenderTargetTextures(y,Ae.colorTexture,Ae.depthStencilTexture),e.setRenderTarget(y))}let Be=R[N];Be===void 0&&(Be=new wn,Be.layers.enable(N),Be.viewport=new Mt,R[N]=Be),Be.matrix.fromArray(ot.transform.matrix),Be.matrix.decompose(Be.position,Be.quaternion,Be.scale),Be.projectionMatrix.fromArray(ot.projectionMatrix),Be.projectionMatrixInverse.copy(Be.projectionMatrix).invert(),Be.viewport.set(Ge.x,Ge.y,Ge.width,Ge.height),N===0&&(I.matrix.copy(Be.matrix),I.matrix.decompose(I.position,I.quaternion,I.scale)),Se===!0&&I.cameras.push(Be)}const ye=a.enabledFeatures;if(ye&&ye.includes("depth-sensing")&&a.depthUsage=="gpu-optimized"&&g){d=i.getBinding();const N=d.getDepthInformation(ie[0]);N&&N.isValid&&N.texture&&m.init(N,a.renderState)}if(ye&&ye.includes("camera-access")&&g){e.state.unbindTexture(),d=i.getBinding();for(let N=0;N<ie.length;N++){const ot=ie[N].camera;if(ot){let Ge=h[ot];Ge||(Ge=new kv,h[ot]=Ge);const Be=d.getCameraImage(ot);Ge.sourceTexture=Be}}}}for(let ie=0;ie<C.length;ie++){const Se=M[ie],ye=C[ie];Se!==null&&ye!==void 0&&ye.update(Se,Y,c||r)}we&&we(O,Y),Y.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:Y}),_=null}const me=new qv;me.setAnimationLoop(be),this.setAnimationLoop=function(O){we=O},this.dispose=function(){}}}const ca=new $n,BA=new yt;function zA(t,e){function n(m,h){m.matrixAutoUpdate===!0&&m.updateMatrix(),h.value.copy(m.matrix)}function i(m,h){h.color.getRGB(m.fogColor.value,Cv(t)),h.isFog?(m.fogNear.value=h.near,m.fogFar.value=h.far):h.isFogExp2&&(m.fogDensity.value=h.density)}function a(m,h,b,S,y){h.isMeshBasicMaterial||h.isMeshLambertMaterial?s(m,h):h.isMeshToonMaterial?(s(m,h),d(m,h)):h.isMeshPhongMaterial?(s(m,h),u(m,h)):h.isMeshStandardMaterial?(s(m,h),f(m,h),h.isMeshPhysicalMaterial&&p(m,h,y)):h.isMeshMatcapMaterial?(s(m,h),_(m,h)):h.isMeshDepthMaterial?s(m,h):h.isMeshDistanceMaterial?(s(m,h),g(m,h)):h.isMeshNormalMaterial?s(m,h):h.isLineBasicMaterial?(r(m,h),h.isLineDashedMaterial&&o(m,h)):h.isPointsMaterial?l(m,h,b,S):h.isSpriteMaterial?c(m,h):h.isShadowMaterial?(m.color.value.copy(h.color),m.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function s(m,h){m.opacity.value=h.opacity,h.color&&m.diffuse.value.copy(h.color),h.emissive&&m.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(m.map.value=h.map,n(h.map,m.mapTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,n(h.alphaMap,m.alphaMapTransform)),h.bumpMap&&(m.bumpMap.value=h.bumpMap,n(h.bumpMap,m.bumpMapTransform),m.bumpScale.value=h.bumpScale,h.side===on&&(m.bumpScale.value*=-1)),h.normalMap&&(m.normalMap.value=h.normalMap,n(h.normalMap,m.normalMapTransform),m.normalScale.value.copy(h.normalScale),h.side===on&&m.normalScale.value.negate()),h.displacementMap&&(m.displacementMap.value=h.displacementMap,n(h.displacementMap,m.displacementMapTransform),m.displacementScale.value=h.displacementScale,m.displacementBias.value=h.displacementBias),h.emissiveMap&&(m.emissiveMap.value=h.emissiveMap,n(h.emissiveMap,m.emissiveMapTransform)),h.specularMap&&(m.specularMap.value=h.specularMap,n(h.specularMap,m.specularMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest);const b=e.get(h),S=b.envMap,y=b.envMapRotation;S&&(m.envMap.value=S,ca.copy(y),ca.x*=-1,ca.y*=-1,ca.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(ca.y*=-1,ca.z*=-1),m.envMapRotation.value.setFromMatrix4(BA.makeRotationFromEuler(ca)),m.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=h.reflectivity,m.ior.value=h.ior,m.refractionRatio.value=h.refractionRatio),h.lightMap&&(m.lightMap.value=h.lightMap,m.lightMapIntensity.value=h.lightMapIntensity,n(h.lightMap,m.lightMapTransform)),h.aoMap&&(m.aoMap.value=h.aoMap,m.aoMapIntensity.value=h.aoMapIntensity,n(h.aoMap,m.aoMapTransform))}function r(m,h){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,h.map&&(m.map.value=h.map,n(h.map,m.mapTransform))}function o(m,h){m.dashSize.value=h.dashSize,m.totalSize.value=h.dashSize+h.gapSize,m.scale.value=h.scale}function l(m,h,b,S){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,m.size.value=h.size*b,m.scale.value=S*.5,h.map&&(m.map.value=h.map,n(h.map,m.uvTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,n(h.alphaMap,m.alphaMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest)}function c(m,h){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,m.rotation.value=h.rotation,h.map&&(m.map.value=h.map,n(h.map,m.mapTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,n(h.alphaMap,m.alphaMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest)}function u(m,h){m.specular.value.copy(h.specular),m.shininess.value=Math.max(h.shininess,1e-4)}function d(m,h){h.gradientMap&&(m.gradientMap.value=h.gradientMap)}function f(m,h){m.metalness.value=h.metalness,h.metalnessMap&&(m.metalnessMap.value=h.metalnessMap,n(h.metalnessMap,m.metalnessMapTransform)),m.roughness.value=h.roughness,h.roughnessMap&&(m.roughnessMap.value=h.roughnessMap,n(h.roughnessMap,m.roughnessMapTransform)),h.envMap&&(m.envMapIntensity.value=h.envMapIntensity)}function p(m,h,b){m.ior.value=h.ior,h.sheen>0&&(m.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),m.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(m.sheenColorMap.value=h.sheenColorMap,n(h.sheenColorMap,m.sheenColorMapTransform)),h.sheenRoughnessMap&&(m.sheenRoughnessMap.value=h.sheenRoughnessMap,n(h.sheenRoughnessMap,m.sheenRoughnessMapTransform))),h.clearcoat>0&&(m.clearcoat.value=h.clearcoat,m.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(m.clearcoatMap.value=h.clearcoatMap,n(h.clearcoatMap,m.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,n(h.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(m.clearcoatNormalMap.value=h.clearcoatNormalMap,n(h.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===on&&m.clearcoatNormalScale.value.negate())),h.dispersion>0&&(m.dispersion.value=h.dispersion),h.iridescence>0&&(m.iridescence.value=h.iridescence,m.iridescenceIOR.value=h.iridescenceIOR,m.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(m.iridescenceMap.value=h.iridescenceMap,n(h.iridescenceMap,m.iridescenceMapTransform)),h.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=h.iridescenceThicknessMap,n(h.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),h.transmission>0&&(m.transmission.value=h.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),h.transmissionMap&&(m.transmissionMap.value=h.transmissionMap,n(h.transmissionMap,m.transmissionMapTransform)),m.thickness.value=h.thickness,h.thicknessMap&&(m.thicknessMap.value=h.thicknessMap,n(h.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=h.attenuationDistance,m.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(m.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(m.anisotropyMap.value=h.anisotropyMap,n(h.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=h.specularIntensity,m.specularColor.value.copy(h.specularColor),h.specularColorMap&&(m.specularColorMap.value=h.specularColorMap,n(h.specularColorMap,m.specularColorMapTransform)),h.specularIntensityMap&&(m.specularIntensityMap.value=h.specularIntensityMap,n(h.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,h){h.matcap&&(m.matcap.value=h.matcap)}function g(m,h){const b=e.get(h).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:a}}function HA(t,e,n,i){let a={},s={},r=[];const o=t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS);function l(b,S){const y=S.program;i.uniformBlockBinding(b,y)}function c(b,S){let y=a[b.id];y===void 0&&(_(b),y=u(b),a[b.id]=y,b.addEventListener("dispose",m));const C=S.program;i.updateUBOMapping(b,C);const M=e.render.frame;s[b.id]!==M&&(f(b),s[b.id]=M)}function u(b){const S=d();b.__bindingPointIndex=S;const y=t.createBuffer(),C=b.__size,M=b.usage;return t.bindBuffer(t.UNIFORM_BUFFER,y),t.bufferData(t.UNIFORM_BUFFER,C,M),t.bindBuffer(t.UNIFORM_BUFFER,null),t.bindBufferBase(t.UNIFORM_BUFFER,S,y),y}function d(){for(let b=0;b<o;b++)if(r.indexOf(b)===-1)return r.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(b){const S=a[b.id],y=b.uniforms,C=b.__cache;t.bindBuffer(t.UNIFORM_BUFFER,S);for(let M=0,T=y.length;M<T;M++){const A=Array.isArray(y[M])?y[M]:[y[M]];for(let v=0,x=A.length;v<x;v++){const R=A[v];if(p(R,M,v,C)===!0){const I=R.__offset,U=Array.isArray(R.value)?R.value:[R.value];let z=0;for(let G=0;G<U.length;G++){const B=U[G],X=g(B);typeof B=="number"||typeof B=="boolean"?(R.__data[0]=B,t.bufferSubData(t.UNIFORM_BUFFER,I+z,R.__data)):B.isMatrix3?(R.__data[0]=B.elements[0],R.__data[1]=B.elements[1],R.__data[2]=B.elements[2],R.__data[3]=0,R.__data[4]=B.elements[3],R.__data[5]=B.elements[4],R.__data[6]=B.elements[5],R.__data[7]=0,R.__data[8]=B.elements[6],R.__data[9]=B.elements[7],R.__data[10]=B.elements[8],R.__data[11]=0):(B.toArray(R.__data,z),z+=X.storage/Float32Array.BYTES_PER_ELEMENT)}t.bufferSubData(t.UNIFORM_BUFFER,I,R.__data)}}}t.bindBuffer(t.UNIFORM_BUFFER,null)}function p(b,S,y,C){const M=b.value,T=S+"_"+y;if(C[T]===void 0)return typeof M=="number"||typeof M=="boolean"?C[T]=M:C[T]=M.clone(),!0;{const A=C[T];if(typeof M=="number"||typeof M=="boolean"){if(A!==M)return C[T]=M,!0}else if(A.equals(M)===!1)return A.copy(M),!0}return!1}function _(b){const S=b.uniforms;let y=0;const C=16;for(let T=0,A=S.length;T<A;T++){const v=Array.isArray(S[T])?S[T]:[S[T]];for(let x=0,R=v.length;x<R;x++){const I=v[x],U=Array.isArray(I.value)?I.value:[I.value];for(let z=0,G=U.length;z<G;z++){const B=U[z],X=g(B),V=y%C,ee=V%X.boundary,pe=V+ee;y+=ee,pe!==0&&C-pe<X.storage&&(y+=C-pe),I.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),I.__offset=y,y+=X.storage}}}const M=y%C;return M>0&&(y+=C-M),b.__size=y,b.__cache={},this}function g(b){const S={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(S.boundary=4,S.storage=4):b.isVector2?(S.boundary=8,S.storage=8):b.isVector3||b.isColor?(S.boundary=16,S.storage=12):b.isVector4?(S.boundary=16,S.storage=16):b.isMatrix3?(S.boundary=48,S.storage=48):b.isMatrix4?(S.boundary=64,S.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),S}function m(b){const S=b.target;S.removeEventListener("dispose",m);const y=r.indexOf(S.__bindingPointIndex);r.splice(y,1),t.deleteBuffer(a[S.id]),delete a[S.id],delete s[S.id]}function h(){for(const b in a)t.deleteBuffer(a[b]);r=[],a={},s={}}return{bind:l,update:c,dispose:h}}class VA{constructor(e={}){const{canvas:n=GS(),context:i=null,depth:a=!0,stencil:s=!1,alpha:r=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=r;const _=new Uint32Array(4),g=new Int32Array(4);let m=null,h=null;const b=[],S=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Hi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const y=this;let C=!1;this._outputColorSpace=Wt;let M=0,T=0,A=null,v=-1,x=null;const R=new Mt,I=new Mt;let U=null;const z=new je(0);let G=0,B=n.width,X=n.height,V=1,ee=null,pe=null;const q=new Mt(0,0,B,X),de=new Mt(0,0,B,X);let we=!1;const be=new wp;let me=!1,O=!1;const Y=new yt,ie=new L,Se=new Mt,ye={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Fe=!1;function rt(){return A===null?V:1}let N=i;function ot(E,k){return n.getContext(E,k)}try{const E={alpha:!0,depth:a,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${fp}`),n.addEventListener("webglcontextlost",ue,!1),n.addEventListener("webglcontextrestored",Ee,!1),n.addEventListener("webglcontextcreationerror",ae,!1),N===null){const k="webgl2";if(N=ot(k,E),N===null)throw ot(k)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let Ge,Be,Ae,gt,Ce,Xe,kt,Tt,P,w,H,Z,Q,K,Ne,le,Re,Pe,re,ge,Oe,Le,he,$e;function D(){Ge=new JT(N),Ge.init(),Le=new DA(N,Ge),Be=new WT(N,Ge,e,Le),Ae=new NA(N,Ge),Be.reversedDepthBuffer&&f&&Ae.buffers.depth.setReversed(!0),gt=new t1(N),Ce=new yA,Xe=new IA(N,Ge,Ae,Ce,Be,Le,gt),kt=new qT(y),Tt=new ZT(y),P=new oE(N),he=new GT(N,P),w=new QT(N,P,gt,he),H=new i1(N,w,P,gt),re=new n1(N,Be,Xe),le=new XT(Ce),Z=new vA(y,kt,Tt,Ge,Be,he,le),Q=new zA(y,Ce),K=new xA,Ne=new AA(Ge),Pe=new VT(y,kt,Tt,Ae,H,p,l),Re=new PA(y,H,Be),$e=new HA(N,gt,Be,Ae),ge=new $T(N,Ge,gt),Oe=new e1(N,Ge,gt),gt.programs=Z.programs,y.capabilities=Be,y.extensions=Ge,y.properties=Ce,y.renderLists=K,y.shadowMap=Re,y.state=Ae,y.info=gt}D();const oe=new UA(y,N);this.xr=oe,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const E=Ge.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=Ge.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(E){E!==void 0&&(V=E,this.setSize(B,X,!1))},this.getSize=function(E){return E.set(B,X)},this.setSize=function(E,k,$=!0){if(oe.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}B=E,X=k,n.width=Math.floor(E*V),n.height=Math.floor(k*V),$===!0&&(n.style.width=E+"px",n.style.height=k+"px"),this.setViewport(0,0,E,k)},this.getDrawingBufferSize=function(E){return E.set(B*V,X*V).floor()},this.setDrawingBufferSize=function(E,k,$){B=E,X=k,V=$,n.width=Math.floor(E*$),n.height=Math.floor(k*$),this.setViewport(0,0,E,k)},this.getCurrentViewport=function(E){return E.copy(R)},this.getViewport=function(E){return E.copy(q)},this.setViewport=function(E,k,$,W){E.isVector4?q.set(E.x,E.y,E.z,E.w):q.set(E,k,$,W),Ae.viewport(R.copy(q).multiplyScalar(V).round())},this.getScissor=function(E){return E.copy(de)},this.setScissor=function(E,k,$,W){E.isVector4?de.set(E.x,E.y,E.z,E.w):de.set(E,k,$,W),Ae.scissor(I.copy(de).multiplyScalar(V).round())},this.getScissorTest=function(){return we},this.setScissorTest=function(E){Ae.setScissorTest(we=E)},this.setOpaqueSort=function(E){ee=E},this.setTransparentSort=function(E){pe=E},this.getClearColor=function(E){return E.copy(Pe.getClearColor())},this.setClearColor=function(){Pe.setClearColor(...arguments)},this.getClearAlpha=function(){return Pe.getClearAlpha()},this.setClearAlpha=function(){Pe.setClearAlpha(...arguments)},this.clear=function(E=!0,k=!0,$=!0){let W=0;if(E){let F=!1;if(A!==null){const se=A.texture.format;F=se===vp||se===gp||se===_p}if(F){const se=A.texture.type,_e=se===si||se===Aa||se===Ur||se===Br||se===hp||se===mp,Me=Pe.getClearColor(),xe=Pe.getClearAlpha(),ke=Me.r,ze=Me.g,Ie=Me.b;_e?(_[0]=ke,_[1]=ze,_[2]=Ie,_[3]=xe,N.clearBufferuiv(N.COLOR,0,_)):(g[0]=ke,g[1]=ze,g[2]=Ie,g[3]=xe,N.clearBufferiv(N.COLOR,0,g))}else W|=N.COLOR_BUFFER_BIT}k&&(W|=N.DEPTH_BUFFER_BIT),$&&(W|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),N.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",ue,!1),n.removeEventListener("webglcontextrestored",Ee,!1),n.removeEventListener("webglcontextcreationerror",ae,!1),Pe.dispose(),K.dispose(),Ne.dispose(),Ce.dispose(),kt.dispose(),Tt.dispose(),H.dispose(),he.dispose(),$e.dispose(),Z.dispose(),oe.dispose(),oe.removeEventListener("sessionstart",Wn),oe.removeEventListener("sessionend",sh),na.stop()};function ue(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function Ee(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;const E=gt.autoReset,k=Re.enabled,$=Re.autoUpdate,W=Re.needsUpdate,F=Re.type;D(),gt.autoReset=E,Re.enabled=k,Re.autoUpdate=$,Re.needsUpdate=W,Re.type=F}function ae(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function J(E){const k=E.target;k.removeEventListener("dispose",J),Te(k)}function Te(E){Ve(E),Ce.remove(E)}function Ve(E){const k=Ce.get(E).programs;k!==void 0&&(k.forEach(function($){Z.releaseProgram($)}),E.isShaderMaterial&&Z.releaseShaderCache(E))}this.renderBufferDirect=function(E,k,$,W,F,se){k===null&&(k=ye);const _e=F.isMesh&&F.matrixWorld.determinant()<0,Me=Dx(E,k,$,W,F);Ae.setMaterial(W,_e);let xe=$.index,ke=1;if(W.wireframe===!0){if(xe=w.getWireframeAttribute($),xe===void 0)return;ke=2}const ze=$.drawRange,Ie=$.attributes.position;let Je=ze.start*ke,lt=(ze.start+ze.count)*ke;se!==null&&(Je=Math.max(Je,se.start*ke),lt=Math.min(lt,(se.start+se.count)*ke)),xe!==null?(Je=Math.max(Je,0),lt=Math.min(lt,xe.count)):Ie!=null&&(Je=Math.max(Je,0),lt=Math.min(lt,Ie.count));const Et=lt-Je;if(Et<0||Et===1/0)return;he.setup(F,W,Me,$,xe);let pt,dt=ge;if(xe!==null&&(pt=P.get(xe),dt=Oe,dt.setIndex(pt)),F.isMesh)W.wireframe===!0?(Ae.setLineWidth(W.wireframeLinewidth*rt()),dt.setMode(N.LINES)):dt.setMode(N.TRIANGLES);else if(F.isLine){let De=W.linewidth;De===void 0&&(De=1),Ae.setLineWidth(De*rt()),F.isLineSegments?dt.setMode(N.LINES):F.isLineLoop?dt.setMode(N.LINE_LOOP):dt.setMode(N.LINE_STRIP)}else F.isPoints?dt.setMode(N.POINTS):F.isSprite&&dt.setMode(N.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)Gr("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),dt.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if(Ge.get("WEBGL_multi_draw"))dt.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{const De=F._multiDrawStarts,bt=F._multiDrawCounts,et=F._multiDrawCount,ln=xe?P.get(xe).bytesPerElement:1,Oa=Ce.get(W).currentProgram.getUniforms();for(let cn=0;cn<et;cn++)Oa.setValue(N,"_gl_DrawID",cn),dt.render(De[cn]/ln,bt[cn])}else if(F.isInstancedMesh)dt.renderInstances(Je,Et,F.count);else if($.isInstancedBufferGeometry){const De=$._maxInstanceCount!==void 0?$._maxInstanceCount:1/0,bt=Math.min($.instanceCount,De);dt.renderInstances(Je,Et,bt)}else dt.render(Je,Et)};function ft(E,k,$){E.transparent===!0&&E.side===Qe&&E.forceSinglePass===!1?(E.side=on,E.needsUpdate=!0,mo(E,k,$),E.side=Yi,E.needsUpdate=!0,mo(E,k,$),E.side=Qe):mo(E,k,$)}this.compile=function(E,k,$=null){$===null&&($=E),h=Ne.get($),h.init(k),S.push(h),$.traverseVisible(function(F){F.isLight&&F.layers.test(k.layers)&&(h.pushLight(F),F.castShadow&&h.pushShadow(F))}),E!==$&&E.traverseVisible(function(F){F.isLight&&F.layers.test(k.layers)&&(h.pushLight(F),F.castShadow&&h.pushShadow(F))}),h.setupLights();const W=new Set;return E.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;const se=F.material;if(se)if(Array.isArray(se))for(let _e=0;_e<se.length;_e++){const Me=se[_e];ft(Me,$,F),W.add(Me)}else ft(se,$,F),W.add(se)}),h=S.pop(),W},this.compileAsync=function(E,k,$=null){const W=this.compile(E,k,$);return new Promise(F=>{function se(){if(W.forEach(function(_e){Ce.get(_e).currentProgram.isReady()&&W.delete(_e)}),W.size===0){F(E);return}setTimeout(se,10)}Ge.get("KHR_parallel_shader_compile")!==null?se():setTimeout(se,10)})};let nt=null;function ui(E){nt&&nt(E)}function Wn(){na.stop()}function sh(){na.start()}const na=new qv;na.setAnimationLoop(ui),typeof self<"u"&&na.setContext(self),this.setAnimationLoop=function(E){nt=E,oe.setAnimationLoop(E),E===null?na.stop():na.start()},oe.addEventListener("sessionstart",Wn),oe.addEventListener("sessionend",sh),this.render=function(E,k){if(k!==void 0&&k.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),oe.enabled===!0&&oe.isPresenting===!0&&(oe.cameraAutoUpdate===!0&&oe.updateCamera(k),k=oe.getCamera()),E.isScene===!0&&E.onBeforeRender(y,E,k,A),h=Ne.get(E,S.length),h.init(k),S.push(h),Y.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),be.setFromProjectionMatrix(Y,Qn,k.reversedDepth),O=this.localClippingEnabled,me=le.init(this.clippingPlanes,O),m=K.get(E,b.length),m.init(),b.push(m),oe.enabled===!0&&oe.isPresenting===!0){const se=y.xr.getDepthSensingMesh();se!==null&&Gc(se,k,-1/0,y.sortObjects)}Gc(E,k,0,y.sortObjects),m.finish(),y.sortObjects===!0&&m.sort(ee,pe),Fe=oe.enabled===!1||oe.isPresenting===!1||oe.hasDepthSensing()===!1,Fe&&Pe.addToRenderList(m,E),this.info.render.frame++,me===!0&&le.beginShadows();const $=h.state.shadowsArray;Re.render($,E,k),me===!0&&le.endShadows(),this.info.autoReset===!0&&this.info.reset();const W=m.opaque,F=m.transmissive;if(h.setupLights(),k.isArrayCamera){const se=k.cameras;if(F.length>0)for(let _e=0,Me=se.length;_e<Me;_e++){const xe=se[_e];oh(W,F,E,xe)}Fe&&Pe.render(E);for(let _e=0,Me=se.length;_e<Me;_e++){const xe=se[_e];rh(m,E,xe,xe.viewport)}}else F.length>0&&oh(W,F,E,k),Fe&&Pe.render(E),rh(m,E,k);A!==null&&T===0&&(Xe.updateMultisampleRenderTarget(A),Xe.updateRenderTargetMipmap(A)),E.isScene===!0&&E.onAfterRender(y,E,k),he.resetDefaultState(),v=-1,x=null,S.pop(),S.length>0?(h=S[S.length-1],me===!0&&le.setGlobalState(y.clippingPlanes,h.state.camera)):h=null,b.pop(),b.length>0?m=b[b.length-1]:m=null};function Gc(E,k,$,W){if(E.visible===!1)return;if(E.layers.test(k.layers)){if(E.isGroup)$=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(k);else if(E.isLight)h.pushLight(E),E.castShadow&&h.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||be.intersectsSprite(E)){W&&Se.setFromMatrixPosition(E.matrixWorld).applyMatrix4(Y);const _e=H.update(E),Me=E.material;Me.visible&&m.push(E,_e,Me,$,Se.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||be.intersectsObject(E))){const _e=H.update(E),Me=E.material;if(W&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),Se.copy(E.boundingSphere.center)):(_e.boundingSphere===null&&_e.computeBoundingSphere(),Se.copy(_e.boundingSphere.center)),Se.applyMatrix4(E.matrixWorld).applyMatrix4(Y)),Array.isArray(Me)){const xe=_e.groups;for(let ke=0,ze=xe.length;ke<ze;ke++){const Ie=xe[ke],Je=Me[Ie.materialIndex];Je&&Je.visible&&m.push(E,_e,Je,$,Se.z,Ie)}}else Me.visible&&m.push(E,_e,Me,$,Se.z,null)}}const se=E.children;for(let _e=0,Me=se.length;_e<Me;_e++)Gc(se[_e],k,$,W)}function rh(E,k,$,W){const F=E.opaque,se=E.transmissive,_e=E.transparent;h.setupLightsView($),me===!0&&le.setGlobalState(y.clippingPlanes,$),W&&Ae.viewport(R.copy(W)),F.length>0&&ho(F,k,$),se.length>0&&ho(se,k,$),_e.length>0&&ho(_e,k,$),Ae.buffers.depth.setTest(!0),Ae.buffers.depth.setMask(!0),Ae.buffers.color.setMask(!0),Ae.setPolygonOffset(!1)}function oh(E,k,$,W){if(($.isScene===!0?$.overrideMaterial:null)!==null)return;h.state.transmissionRenderTarget[W.id]===void 0&&(h.state.transmissionRenderTarget[W.id]=new Ca(1,1,{generateMipmaps:!0,type:Ge.has("EXT_color_buffer_half_float")||Ge.has("EXT_color_buffer_float")?oo:si,minFilter:ba,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:tt.workingColorSpace}));const se=h.state.transmissionRenderTarget[W.id],_e=W.viewport||R;se.setSize(_e.z*y.transmissionResolutionScale,_e.w*y.transmissionResolutionScale);const Me=y.getRenderTarget(),xe=y.getActiveCubeFace(),ke=y.getActiveMipmapLevel();y.setRenderTarget(se),y.getClearColor(z),G=y.getClearAlpha(),G<1&&y.setClearColor(16777215,.5),y.clear(),Fe&&Pe.render($);const ze=y.toneMapping;y.toneMapping=Hi;const Ie=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),h.setupLightsView(W),me===!0&&le.setGlobalState(y.clippingPlanes,W),ho(E,$,W),Xe.updateMultisampleRenderTarget(se),Xe.updateRenderTargetMipmap(se),Ge.has("WEBGL_multisampled_render_to_texture")===!1){let Je=!1;for(let lt=0,Et=k.length;lt<Et;lt++){const pt=k[lt],dt=pt.object,De=pt.geometry,bt=pt.material,et=pt.group;if(bt.side===Qe&&dt.layers.test(W.layers)){const ln=bt.side;bt.side=on,bt.needsUpdate=!0,lh(dt,$,W,De,bt,et),bt.side=ln,bt.needsUpdate=!0,Je=!0}}Je===!0&&(Xe.updateMultisampleRenderTarget(se),Xe.updateRenderTargetMipmap(se))}y.setRenderTarget(Me,xe,ke),y.setClearColor(z,G),Ie!==void 0&&(W.viewport=Ie),y.toneMapping=ze}function ho(E,k,$){const W=k.isScene===!0?k.overrideMaterial:null;for(let F=0,se=E.length;F<se;F++){const _e=E[F],Me=_e.object,xe=_e.geometry,ke=_e.group;let ze=_e.material;ze.allowOverride===!0&&W!==null&&(ze=W),Me.layers.test($.layers)&&lh(Me,k,$,xe,ze,ke)}}function lh(E,k,$,W,F,se){E.onBeforeRender(y,k,$,W,F,se),E.modelViewMatrix.multiplyMatrices($.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),F.onBeforeRender(y,k,$,W,E,se),F.transparent===!0&&F.side===Qe&&F.forceSinglePass===!1?(F.side=on,F.needsUpdate=!0,y.renderBufferDirect($,k,W,F,E,se),F.side=Yi,F.needsUpdate=!0,y.renderBufferDirect($,k,W,F,E,se),F.side=Qe):y.renderBufferDirect($,k,W,F,E,se),E.onAfterRender(y,k,$,W,F,se)}function mo(E,k,$){k.isScene!==!0&&(k=ye);const W=Ce.get(E),F=h.state.lights,se=h.state.shadowsArray,_e=F.state.version,Me=Z.getParameters(E,F.state,se,k,$),xe=Z.getProgramCacheKey(Me);let ke=W.programs;W.environment=E.isMeshStandardMaterial?k.environment:null,W.fog=k.fog,W.envMap=(E.isMeshStandardMaterial?Tt:kt).get(E.envMap||W.environment),W.envMapRotation=W.environment!==null&&E.envMap===null?k.environmentRotation:E.envMapRotation,ke===void 0&&(E.addEventListener("dispose",J),ke=new Map,W.programs=ke);let ze=ke.get(xe);if(ze!==void 0){if(W.currentProgram===ze&&W.lightsStateVersion===_e)return uh(E,Me),ze}else Me.uniforms=Z.getUniforms(E),E.onBeforeCompile(Me,y),ze=Z.acquireProgram(Me,xe),ke.set(xe,ze),W.uniforms=Me.uniforms;const Ie=W.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Ie.clippingPlanes=le.uniform),uh(E,Me),W.needsLights=Fx(E),W.lightsStateVersion=_e,W.needsLights&&(Ie.ambientLightColor.value=F.state.ambient,Ie.lightProbe.value=F.state.probe,Ie.directionalLights.value=F.state.directional,Ie.directionalLightShadows.value=F.state.directionalShadow,Ie.spotLights.value=F.state.spot,Ie.spotLightShadows.value=F.state.spotShadow,Ie.rectAreaLights.value=F.state.rectArea,Ie.ltc_1.value=F.state.rectAreaLTC1,Ie.ltc_2.value=F.state.rectAreaLTC2,Ie.pointLights.value=F.state.point,Ie.pointLightShadows.value=F.state.pointShadow,Ie.hemisphereLights.value=F.state.hemi,Ie.directionalShadowMap.value=F.state.directionalShadowMap,Ie.directionalShadowMatrix.value=F.state.directionalShadowMatrix,Ie.spotShadowMap.value=F.state.spotShadowMap,Ie.spotLightMatrix.value=F.state.spotLightMatrix,Ie.spotLightMap.value=F.state.spotLightMap,Ie.pointShadowMap.value=F.state.pointShadowMap,Ie.pointShadowMatrix.value=F.state.pointShadowMatrix),W.currentProgram=ze,W.uniformsList=null,ze}function ch(E){if(E.uniformsList===null){const k=E.currentProgram.getUniforms();E.uniformsList=Sl.seqWithValue(k.seq,E.uniforms)}return E.uniformsList}function uh(E,k){const $=Ce.get(E);$.outputColorSpace=k.outputColorSpace,$.batching=k.batching,$.batchingColor=k.batchingColor,$.instancing=k.instancing,$.instancingColor=k.instancingColor,$.instancingMorph=k.instancingMorph,$.skinning=k.skinning,$.morphTargets=k.morphTargets,$.morphNormals=k.morphNormals,$.morphColors=k.morphColors,$.morphTargetsCount=k.morphTargetsCount,$.numClippingPlanes=k.numClippingPlanes,$.numIntersection=k.numClipIntersection,$.vertexAlphas=k.vertexAlphas,$.vertexTangents=k.vertexTangents,$.toneMapping=k.toneMapping}function Dx(E,k,$,W,F){k.isScene!==!0&&(k=ye),Xe.resetTextureUnits();const se=k.fog,_e=W.isMeshStandardMaterial?k.environment:null,Me=A===null?y.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:Ns,xe=(W.isMeshStandardMaterial?Tt:kt).get(W.envMap||_e),ke=W.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,ze=!!$.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),Ie=!!$.morphAttributes.position,Je=!!$.morphAttributes.normal,lt=!!$.morphAttributes.color;let Et=Hi;W.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(Et=y.toneMapping);const pt=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,dt=pt!==void 0?pt.length:0,De=Ce.get(W),bt=h.state.lights;if(me===!0&&(O===!0||E!==x)){const qt=E===x&&W.id===v;le.setState(W,E,qt)}let et=!1;W.version===De.__version?(De.needsLights&&De.lightsStateVersion!==bt.state.version||De.outputColorSpace!==Me||F.isBatchedMesh&&De.batching===!1||!F.isBatchedMesh&&De.batching===!0||F.isBatchedMesh&&De.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&De.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&De.instancing===!1||!F.isInstancedMesh&&De.instancing===!0||F.isSkinnedMesh&&De.skinning===!1||!F.isSkinnedMesh&&De.skinning===!0||F.isInstancedMesh&&De.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&De.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&De.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&De.instancingMorph===!1&&F.morphTexture!==null||De.envMap!==xe||W.fog===!0&&De.fog!==se||De.numClippingPlanes!==void 0&&(De.numClippingPlanes!==le.numPlanes||De.numIntersection!==le.numIntersection)||De.vertexAlphas!==ke||De.vertexTangents!==ze||De.morphTargets!==Ie||De.morphNormals!==Je||De.morphColors!==lt||De.toneMapping!==Et||De.morphTargetsCount!==dt)&&(et=!0):(et=!0,De.__version=W.version);let ln=De.currentProgram;et===!0&&(ln=mo(W,k,F));let Oa=!1,cn=!1,Qs=!1;const xt=ln.getUniforms(),yn=De.uniforms;if(Ae.useProgram(ln.program)&&(Oa=!0,cn=!0,Qs=!0),W.id!==v&&(v=W.id,cn=!0),Oa||x!==E){Ae.buffers.depth.getReversed()&&E.reversedDepth!==!0&&(E._reversedDepth=!0,E.updateProjectionMatrix()),xt.setValue(N,"projectionMatrix",E.projectionMatrix),xt.setValue(N,"viewMatrix",E.matrixWorldInverse);const Jt=xt.map.cameraPosition;Jt!==void 0&&Jt.setValue(N,ie.setFromMatrixPosition(E.matrixWorld)),Be.logarithmicDepthBuffer&&xt.setValue(N,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&xt.setValue(N,"isOrthographic",E.isOrthographicCamera===!0),x!==E&&(x=E,cn=!0,Qs=!0)}if(F.isSkinnedMesh){xt.setOptional(N,F,"bindMatrix"),xt.setOptional(N,F,"bindMatrixInverse");const qt=F.skeleton;qt&&(qt.boneTexture===null&&qt.computeBoneTexture(),xt.setValue(N,"boneTexture",qt.boneTexture,Xe))}F.isBatchedMesh&&(xt.setOptional(N,F,"batchingTexture"),xt.setValue(N,"batchingTexture",F._matricesTexture,Xe),xt.setOptional(N,F,"batchingIdTexture"),xt.setValue(N,"batchingIdTexture",F._indirectTexture,Xe),xt.setOptional(N,F,"batchingColorTexture"),F._colorsTexture!==null&&xt.setValue(N,"batchingColorTexture",F._colorsTexture,Xe));const bn=$.morphAttributes;if((bn.position!==void 0||bn.normal!==void 0||bn.color!==void 0)&&re.update(F,$,ln),(cn||De.receiveShadow!==F.receiveShadow)&&(De.receiveShadow=F.receiveShadow,xt.setValue(N,"receiveShadow",F.receiveShadow)),W.isMeshGouraudMaterial&&W.envMap!==null&&(yn.envMap.value=xe,yn.flipEnvMap.value=xe.isCubeTexture&&xe.isRenderTargetTexture===!1?-1:1),W.isMeshStandardMaterial&&W.envMap===null&&k.environment!==null&&(yn.envMapIntensity.value=k.environmentIntensity),cn&&(xt.setValue(N,"toneMappingExposure",y.toneMappingExposure),De.needsLights&&kx(yn,Qs),se&&W.fog===!0&&Q.refreshFogUniforms(yn,se),Q.refreshMaterialUniforms(yn,W,V,X,h.state.transmissionRenderTarget[E.id]),Sl.upload(N,ch(De),yn,Xe)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(Sl.upload(N,ch(De),yn,Xe),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&xt.setValue(N,"center",F.center),xt.setValue(N,"modelViewMatrix",F.modelViewMatrix),xt.setValue(N,"normalMatrix",F.normalMatrix),xt.setValue(N,"modelMatrix",F.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){const qt=W.uniformsGroups;for(let Jt=0,$c=qt.length;Jt<$c;Jt++){const ia=qt[Jt];$e.update(ia,ln),$e.bind(ia,ln)}}return ln}function kx(E,k){E.ambientLightColor.needsUpdate=k,E.lightProbe.needsUpdate=k,E.directionalLights.needsUpdate=k,E.directionalLightShadows.needsUpdate=k,E.pointLights.needsUpdate=k,E.pointLightShadows.needsUpdate=k,E.spotLights.needsUpdate=k,E.spotLightShadows.needsUpdate=k,E.rectAreaLights.needsUpdate=k,E.hemisphereLights.needsUpdate=k}function Fx(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return M},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(E,k,$){const W=Ce.get(E);W.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,W.__autoAllocateDepthBuffer===!1&&(W.__useRenderToTexture=!1),Ce.get(E.texture).__webglTexture=k,Ce.get(E.depthTexture).__webglTexture=W.__autoAllocateDepthBuffer?void 0:$,W.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,k){const $=Ce.get(E);$.__webglFramebuffer=k,$.__useDefaultFramebuffer=k===void 0};const Ox=N.createFramebuffer();this.setRenderTarget=function(E,k=0,$=0){A=E,M=k,T=$;let W=!0,F=null,se=!1,_e=!1;if(E){const xe=Ce.get(E);if(xe.__useDefaultFramebuffer!==void 0)Ae.bindFramebuffer(N.FRAMEBUFFER,null),W=!1;else if(xe.__webglFramebuffer===void 0)Xe.setupRenderTarget(E);else if(xe.__hasExternalTextures)Xe.rebindTextures(E,Ce.get(E.texture).__webglTexture,Ce.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const Ie=E.depthTexture;if(xe.__boundDepthTexture!==Ie){if(Ie!==null&&Ce.has(Ie)&&(E.width!==Ie.image.width||E.height!==Ie.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Xe.setupDepthRenderbuffer(E)}}const ke=E.texture;(ke.isData3DTexture||ke.isDataArrayTexture||ke.isCompressedArrayTexture)&&(_e=!0);const ze=Ce.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(ze[k])?F=ze[k][$]:F=ze[k],se=!0):E.samples>0&&Xe.useMultisampledRTT(E)===!1?F=Ce.get(E).__webglMultisampledFramebuffer:Array.isArray(ze)?F=ze[$]:F=ze,R.copy(E.viewport),I.copy(E.scissor),U=E.scissorTest}else R.copy(q).multiplyScalar(V).floor(),I.copy(de).multiplyScalar(V).floor(),U=we;if($!==0&&(F=Ox),Ae.bindFramebuffer(N.FRAMEBUFFER,F)&&W&&Ae.drawBuffers(E,F),Ae.viewport(R),Ae.scissor(I),Ae.setScissorTest(U),se){const xe=Ce.get(E.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+k,xe.__webglTexture,$)}else if(_e){const xe=k;for(let ke=0;ke<E.textures.length;ke++){const ze=Ce.get(E.textures[ke]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+ke,ze.__webglTexture,$,xe)}}else if(E!==null&&$!==0){const xe=Ce.get(E.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,xe.__webglTexture,$)}v=-1},this.readRenderTargetPixels=function(E,k,$,W,F,se,_e,Me=0){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let xe=Ce.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&_e!==void 0&&(xe=xe[_e]),xe){Ae.bindFramebuffer(N.FRAMEBUFFER,xe);try{const ke=E.textures[Me],ze=ke.format,Ie=ke.type;if(!Be.textureFormatReadable(ze)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Be.textureTypeReadable(Ie)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=E.width-W&&$>=0&&$<=E.height-F&&(E.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+Me),N.readPixels(k,$,W,F,Le.convert(ze),Le.convert(Ie),se))}finally{const ke=A!==null?Ce.get(A).__webglFramebuffer:null;Ae.bindFramebuffer(N.FRAMEBUFFER,ke)}}},this.readRenderTargetPixelsAsync=async function(E,k,$,W,F,se,_e,Me=0){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let xe=Ce.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&_e!==void 0&&(xe=xe[_e]),xe)if(k>=0&&k<=E.width-W&&$>=0&&$<=E.height-F){Ae.bindFramebuffer(N.FRAMEBUFFER,xe);const ke=E.textures[Me],ze=ke.format,Ie=ke.type;if(!Be.textureFormatReadable(ze))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Be.textureTypeReadable(Ie))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Je=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,Je),N.bufferData(N.PIXEL_PACK_BUFFER,se.byteLength,N.STREAM_READ),E.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+Me),N.readPixels(k,$,W,F,Le.convert(ze),Le.convert(Ie),0);const lt=A!==null?Ce.get(A).__webglFramebuffer:null;Ae.bindFramebuffer(N.FRAMEBUFFER,lt);const Et=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await $S(N,Et,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,Je),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,se),N.deleteBuffer(Je),N.deleteSync(Et),se}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(E,k=null,$=0){const W=Math.pow(2,-$),F=Math.floor(E.image.width*W),se=Math.floor(E.image.height*W),_e=k!==null?k.x:0,Me=k!==null?k.y:0;Xe.setTexture2D(E,0),N.copyTexSubImage2D(N.TEXTURE_2D,$,0,0,_e,Me,F,se),Ae.unbindTexture()};const Ux=N.createFramebuffer(),Bx=N.createFramebuffer();this.copyTextureToTexture=function(E,k,$=null,W=null,F=0,se=null){se===null&&(F!==0?(Gr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),se=F,F=0):se=0);let _e,Me,xe,ke,ze,Ie,Je,lt,Et;const pt=E.isCompressedTexture?E.mipmaps[se]:E.image;if($!==null)_e=$.max.x-$.min.x,Me=$.max.y-$.min.y,xe=$.isBox3?$.max.z-$.min.z:1,ke=$.min.x,ze=$.min.y,Ie=$.isBox3?$.min.z:0;else{const bn=Math.pow(2,-F);_e=Math.floor(pt.width*bn),Me=Math.floor(pt.height*bn),E.isDataArrayTexture?xe=pt.depth:E.isData3DTexture?xe=Math.floor(pt.depth*bn):xe=1,ke=0,ze=0,Ie=0}W!==null?(Je=W.x,lt=W.y,Et=W.z):(Je=0,lt=0,Et=0);const dt=Le.convert(k.format),De=Le.convert(k.type);let bt;k.isData3DTexture?(Xe.setTexture3D(k,0),bt=N.TEXTURE_3D):k.isDataArrayTexture||k.isCompressedArrayTexture?(Xe.setTexture2DArray(k,0),bt=N.TEXTURE_2D_ARRAY):(Xe.setTexture2D(k,0),bt=N.TEXTURE_2D),N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,k.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,k.unpackAlignment);const et=N.getParameter(N.UNPACK_ROW_LENGTH),ln=N.getParameter(N.UNPACK_IMAGE_HEIGHT),Oa=N.getParameter(N.UNPACK_SKIP_PIXELS),cn=N.getParameter(N.UNPACK_SKIP_ROWS),Qs=N.getParameter(N.UNPACK_SKIP_IMAGES);N.pixelStorei(N.UNPACK_ROW_LENGTH,pt.width),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,pt.height),N.pixelStorei(N.UNPACK_SKIP_PIXELS,ke),N.pixelStorei(N.UNPACK_SKIP_ROWS,ze),N.pixelStorei(N.UNPACK_SKIP_IMAGES,Ie);const xt=E.isDataArrayTexture||E.isData3DTexture,yn=k.isDataArrayTexture||k.isData3DTexture;if(E.isDepthTexture){const bn=Ce.get(E),qt=Ce.get(k),Jt=Ce.get(bn.__renderTarget),$c=Ce.get(qt.__renderTarget);Ae.bindFramebuffer(N.READ_FRAMEBUFFER,Jt.__webglFramebuffer),Ae.bindFramebuffer(N.DRAW_FRAMEBUFFER,$c.__webglFramebuffer);for(let ia=0;ia<xe;ia++)xt&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Ce.get(E).__webglTexture,F,Ie+ia),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Ce.get(k).__webglTexture,se,Et+ia)),N.blitFramebuffer(ke,ze,_e,Me,Je,lt,_e,Me,N.DEPTH_BUFFER_BIT,N.NEAREST);Ae.bindFramebuffer(N.READ_FRAMEBUFFER,null),Ae.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(F!==0||E.isRenderTargetTexture||Ce.has(E)){const bn=Ce.get(E),qt=Ce.get(k);Ae.bindFramebuffer(N.READ_FRAMEBUFFER,Ux),Ae.bindFramebuffer(N.DRAW_FRAMEBUFFER,Bx);for(let Jt=0;Jt<xe;Jt++)xt?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,bn.__webglTexture,F,Ie+Jt):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,bn.__webglTexture,F),yn?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,qt.__webglTexture,se,Et+Jt):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,qt.__webglTexture,se),F!==0?N.blitFramebuffer(ke,ze,_e,Me,Je,lt,_e,Me,N.COLOR_BUFFER_BIT,N.NEAREST):yn?N.copyTexSubImage3D(bt,se,Je,lt,Et+Jt,ke,ze,_e,Me):N.copyTexSubImage2D(bt,se,Je,lt,ke,ze,_e,Me);Ae.bindFramebuffer(N.READ_FRAMEBUFFER,null),Ae.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else yn?E.isDataTexture||E.isData3DTexture?N.texSubImage3D(bt,se,Je,lt,Et,_e,Me,xe,dt,De,pt.data):k.isCompressedArrayTexture?N.compressedTexSubImage3D(bt,se,Je,lt,Et,_e,Me,xe,dt,pt.data):N.texSubImage3D(bt,se,Je,lt,Et,_e,Me,xe,dt,De,pt):E.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,se,Je,lt,_e,Me,dt,De,pt.data):E.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,se,Je,lt,pt.width,pt.height,dt,pt.data):N.texSubImage2D(N.TEXTURE_2D,se,Je,lt,_e,Me,dt,De,pt);N.pixelStorei(N.UNPACK_ROW_LENGTH,et),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,ln),N.pixelStorei(N.UNPACK_SKIP_PIXELS,Oa),N.pixelStorei(N.UNPACK_SKIP_ROWS,cn),N.pixelStorei(N.UNPACK_SKIP_IMAGES,Qs),se===0&&k.generateMipmaps&&N.generateMipmap(bt),Ae.unbindTexture()},this.initRenderTarget=function(E){Ce.get(E).__webglFramebuffer===void 0&&Xe.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?Xe.setTextureCube(E,0):E.isData3DTexture?Xe.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?Xe.setTexture2DArray(E,0):Xe.setTexture2D(E,0),Ae.unbindTexture()},this.resetState=function(){M=0,T=0,A=null,Ae.reset(),he.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Qn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorSpace=tt._getDrawingBufferColorSpace(e),n.unpackColorSpace=tt._getUnpackColorSpace()}}const bm={type:"change"},Pp={type:"start"},Jv={type:"end"},Xo=new Sp,xm=new ki,GA=Math.cos(70*ht.DEG2RAD),Rt=new L,Qt=2*Math.PI,ut={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Au=1e-6;class $A extends sE{constructor(e,n=null){super(e,n),this.state=ut.NONE,this.target=new L,this.cursor=new L,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:hs.ROTATE,MIDDLE:hs.DOLLY,RIGHT:hs.PAN},this.touches={ONE:ls.ROTATE,TWO:ls.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new L,this._lastQuaternion=new ri,this._lastTargetPosition=new L,this._quat=new ri().setFromUnitVectors(e.up,new L(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new qh,this._sphericalDelta=new qh,this._scale=1,this._panOffset=new L,this._rotateStart=new ce,this._rotateEnd=new ce,this._rotateDelta=new ce,this._panStart=new ce,this._panEnd=new ce,this._panDelta=new ce,this._dollyStart=new ce,this._dollyEnd=new ce,this._dollyDelta=new ce,this._dollyDirection=new L,this._mouse=new ce,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=XA.bind(this),this._onPointerDown=WA.bind(this),this._onPointerUp=qA.bind(this),this._onContextMenu=eC.bind(this),this._onMouseWheel=jA.bind(this),this._onKeyDown=ZA.bind(this),this._onTouchStart=JA.bind(this),this._onTouchMove=QA.bind(this),this._onMouseDown=YA.bind(this),this._onMouseMove=KA.bind(this),this._interceptControlDown=tC.bind(this),this._interceptControlUp=nC.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(bm),this.update(),this.state=ut.NONE}update(e=null){const n=this.object.position;Rt.copy(n).sub(this.target),Rt.applyQuaternion(this._quat),this._spherical.setFromVector3(Rt),this.autoRotate&&this.state===ut.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,a=this.maxAzimuthAngle;isFinite(i)&&isFinite(a)&&(i<-Math.PI?i+=Qt:i>Math.PI&&(i-=Qt),a<-Math.PI?a+=Qt:a>Math.PI&&(a-=Qt),i<=a?this._spherical.theta=Math.max(i,Math.min(a,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+a)/2?Math.max(i,this._spherical.theta):Math.min(a,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let s=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const r=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),s=r!=this._spherical.radius}if(Rt.setFromSpherical(this._spherical),Rt.applyQuaternion(this._quatInverse),n.copy(this.target).add(Rt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let r=null;if(this.object.isPerspectiveCamera){const o=Rt.length();r=this._clampDistance(o*this._scale);const l=o-r;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),s=!!l}else if(this.object.isOrthographicCamera){const o=new L(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),s=l!==this.object.zoom;const c=new L(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),r=Rt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;r!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(r).add(this.object.position):(Xo.origin.copy(this.object.position),Xo.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Xo.direction))<GA?this.object.lookAt(this.target):(xm.setFromNormalAndCoplanarPoint(this.object.up,this.target),Xo.intersectPlane(xm,this.target))))}else if(this.object.isOrthographicCamera){const r=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),r!==this.object.zoom&&(this.object.updateProjectionMatrix(),s=!0)}return this._scale=1,this._performCursorZoom=!1,s||this._lastPosition.distanceToSquared(this.object.position)>Au||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Au||this._lastTargetPosition.distanceToSquared(this.target)>Au?(this.dispatchEvent(bm),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Qt/60*this.autoRotateSpeed*e:Qt/60/60*this.autoRotateSpeed}_getZoomScale(e){const n=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*n)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,n){Rt.setFromMatrixColumn(n,0),Rt.multiplyScalar(-e),this._panOffset.add(Rt)}_panUp(e,n){this.screenSpacePanning===!0?Rt.setFromMatrixColumn(n,1):(Rt.setFromMatrixColumn(n,0),Rt.crossVectors(this.object.up,Rt)),Rt.multiplyScalar(e),this._panOffset.add(Rt)}_pan(e,n){const i=this.domElement;if(this.object.isPerspectiveCamera){const a=this.object.position;Rt.copy(a).sub(this.target);let s=Rt.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*s/i.clientHeight,this.object.matrix),this._panUp(2*n*s/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(n*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,n){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),a=e-i.left,s=n-i.top,r=i.width,o=i.height;this._mouse.x=a/r*2-1,this._mouse.y=-(s/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const n=this.domElement;this._rotateLeft(Qt*this._rotateDelta.x/n.clientHeight),this._rotateUp(Qt*this._rotateDelta.y/n.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let n=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Qt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),n=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Qt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),n=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Qt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),n=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Qt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),n=!0;break}n&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),a=.5*(e.pageY+n.y);this._rotateStart.set(i,a)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),a=.5*(e.pageY+n.y);this._panStart.set(i,a)}}_handleTouchStartDolly(e){const n=this._getSecondPointerPosition(e),i=e.pageX-n.x,a=e.pageY-n.y,s=Math.sqrt(i*i+a*a);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),a=.5*(e.pageX+i.x),s=.5*(e.pageY+i.y);this._rotateEnd.set(a,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const n=this.domElement;this._rotateLeft(Qt*this._rotateDelta.x/n.clientHeight),this._rotateUp(Qt*this._rotateDelta.y/n.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),a=.5*(e.pageY+n.y);this._panEnd.set(i,a)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const n=this._getSecondPointerPosition(e),i=e.pageX-n.x,a=e.pageY-n.y,s=Math.sqrt(i*i+a*a);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const r=(e.pageX+n.x)*.5,o=(e.pageY+n.y)*.5;this._updateZoomParameters(r,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let n=0;n<this._pointers.length;n++)if(this._pointers[n]==e.pointerId){this._pointers.splice(n,1);return}}_isTrackingPointer(e){for(let n=0;n<this._pointers.length;n++)if(this._pointers[n]==e.pointerId)return!0;return!1}_trackPointer(e){let n=this._pointerPositions[e.pointerId];n===void 0&&(n=new ce,this._pointerPositions[e.pointerId]=n),n.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const n=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[n]}_customWheelEvent(e){const n=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(n){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function WA(t){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(t.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(t)&&(this._addPointer(t),t.pointerType==="touch"?this._onTouchStart(t):this._onMouseDown(t)))}function XA(t){this.enabled!==!1&&(t.pointerType==="touch"?this._onTouchMove(t):this._onMouseMove(t))}function qA(t){switch(this._removePointer(t),this._pointers.length){case 0:this.domElement.releasePointerCapture(t.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Jv),this.state=ut.NONE;break;case 1:const e=this._pointers[0],n=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:n.x,pageY:n.y});break}}function YA(t){let e;switch(t.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case hs.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(t),this.state=ut.DOLLY;break;case hs.ROTATE:if(t.ctrlKey||t.metaKey||t.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(t),this.state=ut.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(t),this.state=ut.ROTATE}break;case hs.PAN:if(t.ctrlKey||t.metaKey||t.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(t),this.state=ut.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(t),this.state=ut.PAN}break;default:this.state=ut.NONE}this.state!==ut.NONE&&this.dispatchEvent(Pp)}function KA(t){switch(this.state){case ut.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(t);break;case ut.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(t);break;case ut.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(t);break}}function jA(t){this.enabled===!1||this.enableZoom===!1||this.state!==ut.NONE||(t.preventDefault(),this.dispatchEvent(Pp),this._handleMouseWheel(this._customWheelEvent(t)),this.dispatchEvent(Jv))}function ZA(t){this.enabled!==!1&&this._handleKeyDown(t)}function JA(t){switch(this._trackPointer(t),this._pointers.length){case 1:switch(this.touches.ONE){case ls.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(t),this.state=ut.TOUCH_ROTATE;break;case ls.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(t),this.state=ut.TOUCH_PAN;break;default:this.state=ut.NONE}break;case 2:switch(this.touches.TWO){case ls.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(t),this.state=ut.TOUCH_DOLLY_PAN;break;case ls.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(t),this.state=ut.TOUCH_DOLLY_ROTATE;break;default:this.state=ut.NONE}break;default:this.state=ut.NONE}this.state!==ut.NONE&&this.dispatchEvent(Pp)}function QA(t){switch(this._trackPointer(t),this.state){case ut.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(t),this.update();break;case ut.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(t),this.update();break;case ut.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(t),this.update();break;case ut.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(t),this.update();break;default:this.state=ut.NONE}}function eC(t){this.enabled!==!1&&t.preventDefault()}function tC(t){t.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function nC(t){t.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Lp=1,wl=.32,Sm=1024,iC=16,aC=1.5;function wm(t){const e=new st({color:t,transparent:!0,opacity:Lp,side:Qe});return e.forceSinglePass=!0,e}function sC(t){return new $v({color:t,side:Qe,transparent:!0,opacity:Lp})}function ns(t,e,n,i){return new He(new Da(t,n,e,6,1,6),i)}function Cu(t,e,n,i,a,s,r,o){t.beginPath();for(let l=0;l<=e;l+=8){const c=l/e,u=i*n+Math.sin(c*Math.PI*2+s)*a+Math.sin(c*Math.PI*4+s*.5)*a*.35;l===0?t.moveTo(l,u):t.lineTo(l,u)}t.lineWidth=r,t.strokeStyle=o,t.stroke()}function Ru(t,e,n,i,a,s,r,o){t.beginPath();for(let l=0;l<=n;l+=8){const c=l/n,u=i*e+Math.sin(c*Math.PI*2+s)*a+Math.sin(c*Math.PI*6+s*.3)*a*.18;l===0?t.moveTo(u,l):t.lineTo(u,l)}t.lineWidth=r,t.strokeStyle=o,t.stroke()}function Pu(t,e,n,i,a,s){t.beginPath(),t.arc(e,n,i,0,Math.PI*2),t.fillStyle=a,t.fill(),t.lineWidth=Math.max(6,i*.15),t.strokeStyle=s,t.stroke()}function rC(t){const e=document.createElement("canvas");e.width=Sm,e.height=Sm;const n=e.getContext("2d");if(!n)throw new Error("Unable to create ball texture canvas");const{width:i,height:a}=e,s=n.createLinearGradient(0,0,i,a);s.addColorStop(0,"#faf7ee"),s.addColorStop(.55,"#e7e1d0"),s.addColorStop(1,"#d5cfbe"),n.fillStyle=s,n.fillRect(0,0,i,a),n.globalAlpha=.22;for(let l=0;l<28;l+=1){const c=l/27*a;n.fillStyle=l%2===0?"#ffffff":"#d3cbb6",n.fillRect(0,c,i,a/54)}n.globalAlpha=1;const r="#2d313b";n.lineCap="round",Cu(n,i,a,.24,22,.35,18,r),Cu(n,i,a,.5,14,1.1,20,r),Cu(n,i,a,.77,20,2.35,18,r),Ru(n,i,a,.2,24,.2,18,r),Ru(n,i,a,.48,18,1.6,18,r),Ru(n,i,a,.76,26,2.7,18,r),n.globalAlpha=.92,Pu(n,i*.28,a*.32,88,"#f1a63a","#fff4d7"),Pu(n,i*.68,a*.6,72,"#4db0ff","#eef8ff"),Pu(n,i*.76,a*.2,54,"#1f232c","#f0ece1"),n.globalAlpha=1,n.beginPath(),n.moveTo(i*.08,a*.86),n.quadraticCurveTo(i*.28,a*.72,i*.42,a*.8),n.quadraticCurveTo(i*.58,a*.9,i*.82,a*.78),n.lineWidth=24,n.strokeStyle="rgba(255, 246, 220, 0.9)",n.stroke();const o=new Mc(e);return o.colorSpace=Wt,o.anisotropy=Math.min(8,t.capabilities.getMaxAnisotropy()),o}function oC(t,e,n,i){return new He(new Da(t,e,n,6,6,1),i)}function lC(t){const e=10280*t,n=8240*t,i=1960*t,a=1e3*t,s=1900*t,r=800*t,o=900*t,l=Math.max(1,t),c=[],u=[1,-1];function d(g,m,h=null){const b=g.material.clone();return g.material=b,c.push({mesh:g,material:b,outwardLocal:m.clone().normalize(),fixedOpacity:h}),g}function f(g){const m=new _t,h=wm(g),b=n/2-a-s/2,S=Math.sqrt(2*Math.pow(a,2));for(const C of u){const M=d(ns(b,i,l,h),new L(0,1,0));M.position.set(C*(b/2+s/2),0,i/2),m.add(M);const T=d(ns(S,i,l,h),new L(0,1,0));T.position.set(C*(n/2-a/2),-a/2,i/2),T.rotateZ(-C*Math.PI/4),m.add(T)}const y=d(ns(s,i-r,l,h),new L(0,1,0));return y.position.set(0,0,i/2+r/2),m.add(y),m}function p(g,m){const h=new _t,b=[[n/2,0],[-n/2,0],[-n/2,e/2-a],[-n/2+a,e/2],[-s/2,e/2],[-s/2,e/2+o],[s/2,e/2+o],[s/2,e/2],[n/2-a,e/2],[n/2,e/2-a],[n/2,0]],S=new Ap;b.forEach(([x,R],I)=>{I===0?S.moveTo(x,R):S.lineTo(x,R)});const y=sC(g),C=wm(g),M=d(new He(new Ac(S),y),new L(0,0,-1));M.receiveShadow=!0,h.add(M);for(const x of u){const R=d(ns(o,r,l,C),new L(0,-x,0),wl);R.position.set(x*s/2,e/2+o/2,r/2),R.rotateZ(Math.PI/2),h.add(R)}const T=d(oC(s,o,l,C),new L(0,0,1),wl);T.position.set(0,e/2+o/2,r),h.add(T);const A=d(ns(s,r,l,C),new L(0,1,0),wl);A.position.set(0,e/2+o,r/2),h.add(A);const v=f(g);v.position.y=e/2,h.add(v);for(const x of u){const R=d(ns(e/2-a,i,l,C),new L(0,-x,0));R.position.set(x*n/2,(e/2-a)/2,i/2),R.rotateZ(Math.PI/2),h.add(R)}return m&&h.rotateZ(Math.PI),h}const _=new _t;return _.add(p(16771251,!1)),_.add(p(8381439,!0)),{stadium:_,wallPanels:c}}function cC(t){const e=[[100,-100,100],[100,100,100],[-100,100,100],[-100,-100,100],[150,-220,20],[-150,-220,20],[130,-400,-20],[-130,-400,-20],[140,170,25],[-140,170,25],[130,240,25],[-130,240,25],[130,-400,-80],[-130,-400,-80],[150,-220,-80],[-150,-220,-80],[140,170,-80],[-140,170,-80],[130,240,-80],[-130,240,-80]],n=[[0,1,2],[0,2,3],[4,0,5],[0,3,5],[6,4,5],[6,5,7],[1,8,9],[1,9,2],[4,8,1],[4,1,0],[3,2,9],[3,9,5],[8,10,11],[8,11,9],[12,6,7],[12,7,13],[7,5,15],[7,15,13],[6,14,4],[12,14,6],[14,16,4],[4,16,8],[5,9,15],[15,9,17],[16,18,8],[8,18,10],[9,11,17],[17,11,19],[10,18,11],[11,18,19],[14,12,13],[14,13,15],[16,14,15],[16,15,17],[18,16,17],[18,17,19]],i=new At;i.setAttribute("position",new it(e.flat(),3)),i.setIndex(n.flat()),i.computeVertexNormals();const a=new _t,s=new _t,r=new He(i,new $v({color:t}));r.castShadow=!0,s.add(r);const o=new Zl({color:1710894,shininess:120,transparent:!0,opacity:.82}),l=[[100,-100,100],[-100,-100,100],[150,-220,20],[-150,-220,20],[100,100,100],[-100,100,100],[140,170,25],[-140,170,25],[100,-100,100],[100,100,100],[150,-220,20],[140,170,25],[-100,-100,100],[-100,100,100],[-150,-220,20],[-140,170,25]],c=[[0,2,3],[0,3,1],[4,6,7],[4,7,5],[8,10,11],[8,11,9],[12,14,15],[12,15,13]],u=new At;u.setAttribute("position",new it(l.flat(),3)),u.setIndex(c.flat()),u.computeVertexNormals();const d=new He(u,o);d.position.z=1,s.add(d);const f=new st({color:8968191,transparent:!0,opacity:.34,side:Qe}),p=new At;p.setAttribute("position",new it([90,-110,95,-90,-110,95,140,-210,25,-140,-210,25],3)),p.setIndex([0,2,3,0,3,1]),p.computeVertexNormals();const _=new He(p,f);_.position.z=2,s.add(_);const g=new Zl({color:2236962,shininess:48}),m=(h,b,S,y)=>{const C=new He(new Tc(70,70,y,10),g);return C.rotateZ(Math.PI/2),C.position.set(h,b,S),C.castShadow=!0,C};return s.add(m(120,-300,-60,50)),s.add(m(-120,-300,-60,50)),s.add(m(120,150,-60,70)),s.add(m(-120,150,-60,70)),s.position.set(0,0,50),s.rotateZ(Math.PI/2),s.scale.set(.35,.35,.35),a.add(s),a}function uC(){const t=new _t;t.visible=!1,t.position.set(-124,0,8);const e=new $r(30,220,14,1,!0);e.rotateZ(Math.PI/2),e.translate(-110,0,0);const n=new $r(17,150,12,1,!0);n.rotateZ(Math.PI/2),n.translate(-75,0,0);const i=new ks(21,12,12),a=[-38,38];for(const s of a){const r=new _t;r.position.set(0,s,0);const o=new st({color:"#ff9b2f",transparent:!0,opacity:.42,blending:zi,depthWrite:!1,side:Qe});o.forceSinglePass=!0;const l=new He(e,o);l.name="outer-flame",r.add(l);const c=new st({color:"#fff2ba",transparent:!0,opacity:.9,blending:zi,depthWrite:!1,side:Qe});c.forceSinglePass=!0;const u=new He(n,c);u.name="inner-flame",r.add(u);const d=new st({color:"#fff8db",transparent:!0,opacity:.62,blending:zi,depthWrite:!1});d.forceSinglePass=!0;const f=new He(i,d);f.name="glow",f.position.x=-10,r.add(f),t.add(r)}return t}function dC(){const t=new _t;t.visible=!1,t.position.set(0,0,235);const e=240,n=82,i=188,a=20,s=new an(e,n),r=new st({color:463645,transparent:!0,opacity:.78,side:Qe,depthWrite:!1}),o=new He(s,r);o.position.z=-1,t.add(o);const l=new an(i,a),c=new st({color:1385521,transparent:!0,opacity:.92,side:Qe,depthWrite:!1}),u=new He(l,c);u.position.y=-18,t.add(u);const d=new an(i,a),f=new st({color:16761415,transparent:!0,opacity:.98,side:Qe,depthWrite:!1}),p=new He(d,f);p.position.y=-18,t.add(p);const _=document.createElement("canvas");_.width=512,_.height=160;const g=_.getContext("2d");if(!g)throw new Error("Unable to create boost meter label context");const m=new Mc(_);m.colorSpace=Wt,m.needsUpdate=!0;const h=new an(190,48),b=new st({map:m,transparent:!0,depthWrite:!1,side:Qe}),S=new He(h,b);return S.position.set(0,15,0),t.add(S),{group:t,fillMesh:p,fillMaterial:f,labelTexture:m,labelContext:g,labelCanvas:_,lastPercent:null}}function fC(){const t=new _t;t.visible=!1;const e=new st({color:16765276,transparent:!0,opacity:.86,depthWrite:!1}),n=new He(new Cp(170,8,8,48),e);n.position.z=16,t.add(n);const i=document.createElement("canvas");i.width=512,i.height=192;const a=i.getContext("2d");if(!a)throw new Error("Unable to create demo indicator label context");a.textAlign="center",a.textBaseline="middle",a.lineJoin="round",a.font="800 86px sans-serif",a.lineWidth=20,a.strokeStyle="rgba(7, 19, 29, 0.94)",a.strokeText("DEMO",i.width/2,88),a.fillStyle="#fff0b8",a.fillText("DEMO",i.width/2,88),a.font="700 34px sans-serif",a.lineWidth=10,a.strokeText("RESPAWNING",i.width/2,150),a.fillStyle="#ffbd4a",a.fillText("RESPAWNING",i.width/2,150);const s=new Mc(i);s.colorSpace=Wt;const r=new st({map:s,transparent:!0,depthWrite:!1,side:Qe}),o=new He(new an(310,116),r);return o.position.z=300,t.add(o),{group:t,ring:n,label:o}}function pC(t,e,n,i){t.fillMesh.scale.x=Math.max(.001,e);const a=94;t.fillMesh.position.x=-(1-e)*a,t.fillMesh.position.y=-18;const s=Math.max(0,Math.min(100,Math.round(n/255*100)));if(t.lastPercent!==s){const{labelContext:r,labelCanvas:o,labelTexture:l}=t;r.clearRect(0,0,o.width,o.height),r.textAlign="center",r.textBaseline="middle",r.lineJoin="round",r.font="700 84px sans-serif",r.lineWidth=18,r.strokeStyle="rgba(7, 19, 29, 0.92)",r.strokeText(`${s}`,o.width/2,78),r.fillStyle="#fff8e1",r.fillText(`${s}`,o.width/2,78),r.font="600 30px sans-serif",r.lineWidth=10,r.strokeText("BOOST",o.width/2,130),r.fillStyle="#ffcf70",r.fillText("BOOST",o.width/2,130),l.needsUpdate=!0,t.lastPercent=s}t.group.quaternion.copy(i.quaternion)}function hC(t){t.add(new nE("#d8ecff",1.6));const e=new Xh("#fff6df",2.4);e.position.set(4e3,-6e3,5e3),t.add(e);const n=new Xh("#97d7ff",1.2);n.position.set(-5e3,4e3,3e3),t.add(n)}function mC(t){const e=rC(t),n=new Zl({color:16777215,map:e,shininess:42,specular:new je("#f7f2e3")});return{mesh:new He(new ks(93,24,24),n),texture:e}}function _C(t,e,n){const i=new mw;i.background=new je("#081119");const a=new wn(48,1,10*n,5e5*n);a.up.set(0,0,1),a.position.set(0,-9e3*n,5e3*n),a.lookAt(0,0,0);const s=new VA({antialias:!1,powerPreference:"high-performance"});s.setPixelRatio(Math.min(window.devicePixelRatio||1,aC)),s.domElement.style.display="block",s.domElement.style.width="100%",s.domElement.style.height="100%",s.domElement.tabIndex=0,s.domElement.setAttribute("aria-label","Replay player viewport"),t.replaceChildren(s.domElement);const r=new $A(a,s.domElement);r.enableDamping=!0,r.maxDistance=16e4*n,r.keyPanSpeed=iC,r.target.set(0,0,600*n),r.listenToKeyEvents(s.domElement),r.update();const o=()=>{s.domElement.focus()};s.domElement.addEventListener("pointerdown",o);const{stadium:l,wallPanels:c}=lC(n);i.add(l),hC(i);const u=new _t;u.scale.set(-n,n,n),i.add(u);const{mesh:d,texture:f}=mC(s);u.add(d);const p=new Map,_=new Map,g=new Map,m=new Map;for(const A of e.players){const v=cC(A.isTeamZero?"#57a8ff":"#ff9c40"),x=uC();v.add(x);const R=dC();v.add(R.group);const I=fC();u.add(v),u.add(I.group),p.set(A.id,v),_.set(A.id,x),g.set(A.id,R),m.set(A.id,I)}const h=()=>{const A=t.clientWidth||1,v=t.clientHeight||1;a.aspect=A/v,a.updateProjectionMatrix(),s.setSize(A,v,!1)};h();const b=new L,S=new L,y=new ri,C=new L;return{scene:i,replayRoot:u,camera:a,renderer:s,controls:r,resize:h,dispose:()=>{s.domElement.removeEventListener("pointerdown",o),r.stopListenToKeyEvents(),r.dispose(),f.dispose(),s.dispose(),t.replaceChildren()},ballMesh:d,playerMeshes:p,playerBoostTrails:_,playerBoostMeters:g,playerDemoIndicators:m,updateWallVisibility:()=>{i.updateMatrixWorld(!0);for(const A of c){if(A.fixedOpacity!==null){A.material.transparent=!0,A.material.opacity=A.fixedOpacity,A.material.depthWrite=!1;continue}A.mesh.getWorldPosition(b),A.mesh.getWorldQuaternion(y),S.copy(A.outwardLocal).applyQuaternion(y).normalize(),C.copy(a.position).sub(b);const v=S.dot(C)>0;A.material.transparent=!0,A.material.opacity=v?wl:Lp,A.material.depthWrite=!v}}}}function pr(t,e){if(t.frames.length===0)return 0;let n=0,i=t.frames.length-1;for(;n<=i;){const a=Math.floor((n+i)/2),s=t.frames[a]?.time??0;if(s<e)n=a+1;else if(s>e)i=a-1;else return a}return Math.max(0,n-1)}function gC(t,e){return t.frames.length===0?0:ht.clamp(Math.round(e),0,t.frames.length-1)}function vC(t){if(t.frames.length===0)return null;const e=new Map;for(const a of t.frames)e.set(a.gameState,(e.get(a.gameState)??0)+1);let n=null,i=-1;for(const[a,s]of e.entries())s<=i||(n=a,i=s);return n}function yC(t,e){if(e===null)return null;for(const n of t.frames){if(n.gameState===e)break;return n.gameState}return null}function Qv(t,e){return e===null?t.kickoffCountdown<=0:t.gameState===e}function Np(t,e){return t.kickoffCountdown>0?!0:e!==null&&t.gameState===e}function bC(t,e){return t.ballFrames[e]?.position?!0:t.players.some(n=>n.frames[e]?.position)}function xC(t,e,n,i){return Np(e,i)&&bC(t,n)}function El(t,e,n,i,a){return!Qv(e,i)&&!xC(t,e,n,a)}function Em(t,e,n,i,a,s,r){return i&&El(t,e,n,s,r)||a&&Np(e,r)}function SC(t,e,n,i,a){const s=[],{frames:r}=t;if(r.length===0||!e&&!n)return s;let o=0;for(;o<r.length;){const l=r[o];if(!l||!Em(t,l,o,e,n,i,a)){o+=1;continue}const c=l.time;let u=o+1;for(;u<r.length&&Em(t,r[u],u,e,n,i,a);)u+=1;const d=r[u]?.time??t.duration;if(d>c){const f=s.at(-1);f&&f.endTime>=c?f.endTime=Math.max(f.endTime,d):s.push({startTime:c,endTime:d})}o=u}return s}function wC(t,e,n){const i=ht.clamp(n,0,t);let a=0;for(const s of e){if(i<s.startTime)break;if(i<s.endTime)return{replayTime:i,timelineTime:s.startTime-a,seekTime:s.startTime,hiddenBySkip:!0};a+=s.endTime-s.startTime}return{replayTime:i,timelineTime:i-a,seekTime:i,hiddenBySkip:!1}}function EC(t,e,n,i){const a=ht.clamp(i,0,e);let s=0;for(const r of n){const o=r.startTime-s;if(a<=o)return a+s;s+=r.endTime-r.startTime}return ht.clamp(a+s,0,t)}function MC(t,e){const n=e.at(-1);return!n||n.endTime<t?t:ht.clamp(n.startTime,0,t)}function TC(t,e,n){const i=t.frames[e];if(!i||i.kickoffCountdown<=0)return null;let a=e;for(;a>0&&(t.frames[a-1]?.kickoffCountdown??0)>0;)a-=1;let s=e+1;for(;s<t.frames.length&&t.frames[s].kickoffCountdown>0;)s+=1;let r=0;for(let c=a;c<s;c+=1)r=Math.max(r,t.frames[c].kickoffCountdown);const o=t.frames[s]?.time??t.duration,l=Math.max(0,o-n);return{kind:"kickoff-countdown",countdown:Math.max(1,Math.min(r,Math.ceil(l))),secondsRemaining:l,endsAt:o}}function AC(t,e){const n=pr(t,e),i=Math.min(n+1,t.frames.length-1);if(i===n)return{frameIndex:n,nextFrameIndex:i,alpha:0};const a=t.frames[n]?.time??0,s=t.frames[i]?.time??a;return s<=a?{frameIndex:n,nextFrameIndex:i,alpha:0}:{frameIndex:n,nextFrameIndex:i,alpha:ht.clamp((e-a)/(s-a),0,1)}}const CC=1.4,is=.18,qo=.14,RC=120,Mm=90,PC=40,LC=45,NC=.58,Tm=.82,IC=132,e0=new L(-1,0,0),va=new L(0,0,1),DC=new L(-1,0,0),kC=new L(0,0,18800),FC=new L(0,0,700),OC=new L(-9600,-12600,6400),UC=new L(0,0,900),Jl=48,BC=16,zC=16,HC=.003,VC=.05;function Am(t,e,n){return t?!e||n<=0?t:{x:ht.lerp(t.x,e.x,n),y:ht.lerp(t.y,e.y,n),z:ht.lerp(t.z,e.z,n)}:e}function Cm(t,e,n){const i=t??e;if(!i)return null;const a=new ri(i.x,i.y,i.z,i.w);return!e||n<=0||t===null?a:a.slerp(new ri(e.x,e.y,e.z,e.w),n)}function Lu(t){return new L(t.x,t.y,t.z)}function t0(t,e){return new L(-t.x*e,t.y*e,t.z*e)}function Nu(t){return new L(-t.x,t.y,t.z).normalize()}function GC(t,e){switch(t){case"overhead":return{position:kC.clone().multiplyScalar(e),target:FC.clone().multiplyScalar(e),up:DC.clone(),fov:Jl};case"side":return{position:OC.clone().multiplyScalar(e),target:UC.clone().multiplyScalar(e),up:va.clone(),fov:Jl}}}function $C(t){const{fov:e,position:n,sceneState:i,target:a,up:s}=t,{camera:r,controls:o}=i;o.enabled=!1,r.position.lerp(n,qo),o.target.lerp(a,qo),r.up.lerp(s,qo).normalize(),r.fov=ht.lerp(r.fov,e,qo),r.updateProjectionMatrix(),r.lookAt(o.target);const l=r.position.distanceToSquared(n)<=BC,c=o.target.distanceToSquared(a)<=zC,u=r.up.angleTo(s)<=HC,d=Math.abs(r.fov-e)<=VC;return!l||!c||!u||!d?!1:(r.position.copy(n),o.target.copy(a),r.up.copy(s).normalize(),r.fov=e,r.updateProjectionMatrix(),r.lookAt(a),o.enabled=!0,!0)}function WC(t){const e=t.linearVelocity?Nu(t.linearVelocity):null,n=t.forward?Nu(t.forward):null,i=t.up?Nu(t.up):null;if((t.position?.z??1/0)<RC){const l=(n??e??e0.clone()).clone().setZ(0);if(l.lengthSq()<1e-4)return null;l.normalize(),e&&e.lengthSq()>1e-4&&l.dot(e)<0&&l.negate();const c=new L().crossVectors(va,l).normalize(),u=new L().crossVectors(l,c).normalize();return{forward:l,up:u,right:c}}if(!n||!i)return null;const s=n.clone().normalize(),r=new L().crossVectors(i,s).normalize(),o=new L().crossVectors(s,r).normalize();return{forward:s,up:o,right:r}}function XC(t){const{cameraViewMode:e,attachedPlayerId:n,ballCamEnabled:i,ballPosition:a,cameraDistanceScale:s,customCameraSettings:r,desiredCameraPosition:o,desiredLookTarget:l,attachedPlayerUnavailable:c=!1,fieldScale:u,frameIndex:d,replay:f,sceneState:p}=t,_=p.controls;if(e==="free"){_.enabled=!0,p.camera.fov=ht.lerp(p.camera.fov,Jl,is),p.camera.updateProjectionMatrix();return}if(!n){_.enabled=!0,p.camera.fov=ht.lerp(p.camera.fov,Jl,is),p.camera.updateProjectionMatrix();return}const g=f.players.find(z=>z.id===n),m=g?.frames[d];if(!g||c||!m?.position||m.isPresent===!1){_.enabled=!0;return}_.enabled=!1;const h=t0(m.position,u),b=WC(m),S=b?.forward??e0.clone(),y=b?.right??new L(0,1,0),C={...g.cameraSettings,...r??{}},M=(C.distance??270)*u*s,T=(C.height??100)*u*CC,A=ht.degToRad(C.pitch??-4),v=S.clone().applyAxisAngle(y,A).normalize(),x=h.clone().addScaledVector(va,T),R=S.clone().multiplyScalar(-M).addScaledVector(va,T).applyAxisAngle(y,A),I=h.clone().addScaledVector(va,PC*u);let U=C.fov??110;if(i&&a){const z=a.clone().addScaledVector(va,LC*u),G=z.clone().sub(I),B=(G.lengthSq()>1e-4?G.normalize():v.clone()).multiplyScalar(Tm).addScaledVector(v,1-Tm).normalize();l.copy(I).lerp(z,NC),o.copy(x).addScaledVector(B,-M),o.z=Math.max(Mm*u,o.z);const X=I.clone().sub(o),V=z.clone().sub(o);if(X.lengthSq()>1e-4&&V.lengthSq()>1e-4){const ee=X.angleTo(V);U=Math.min(IC,Math.max(U,ht.radToDeg(ee)*1.7))}}else o.copy(I).add(R),o.z=Math.max(Mm*u,o.z),l.copy(I);p.camera.position.lerp(o,is),p.camera.up.lerp(va,is).normalize(),_.target.lerp(l,is),p.camera.fov=ht.lerp(p.camera.fov,U,is),p.camera.updateProjectionMatrix(),p.camera.lookAt(_.target)}const qC=1,YC=2.25,Yo="free",Rm=3.2;function ua(t){return typeof t=="number"&&Number.isFinite(t)?t:void 0}function Iu(t){if(!t)return null;const e={},n=ua(t.fov),i=ua(t.height),a=ua(t.pitch),s=ua(t.distance),r=ua(t.stiffness),o=ua(t.swivelSpeed),l=ua(t.transitionSpeed);return n!==void 0&&(e.fov=n),i!==void 0&&(e.height=i),a!==void 0&&(e.pitch=a),s!==void 0&&(e.distance=s),r!==void 0&&(e.stiffness=r),o!==void 0&&(e.swivelSpeed=o),l!==void 0&&(e.transitionSpeed=l),e}function KC(t){return!!t?.position&&t?.isPresent!==!1}class jC extends EventTarget{container;replay;options;sceneState;beforeRenderCallbacks=[];plugins=[];fieldScale;desiredCameraPosition=new L;desiredLookTarget=new L;boundWindowResize=()=>this.sceneState.resize();liveGameState;kickoffGameState;timelineSegmentsCacheKey=null;timelineSegmentsCache=[];timelineDurationCache=0;resizeObserver=null;animationFrameId=null;disposed=!1;playing=!1;speed=1;currentTime=0;playbackStartedAt=0;playbackStartedTime=0;cameraDistanceScale;customCameraSettings;cameraViewMode;freeCameraTransition=null;attachedPlayerId;ballCamEnabled;boostMeterEnabled;boostPickupAnimationEnabled;skipPostGoalTransitionsEnabled;skipKickoffsEnabled;constructor(e,n,i={}){super(),this.container=e,this.replay=n,this.options=i,this.fieldScale=i.fieldScale??qC,this.sceneState=_C(e,n,this.fieldScale),this.liveGameState=vC(n),this.kickoffGameState=yC(n,this.liveGameState),this.speed=Math.max(.1,i.initialPlaybackRate??1),this.cameraDistanceScale=Math.max(.25,i.initialCameraDistanceScale??YC),this.customCameraSettings=Iu(i.initialCustomCameraSettings),this.attachedPlayerId=i.initialAttachedPlayerId??null,this.cameraViewMode=i.initialCameraViewMode??(this.attachedPlayerId?"follow":Yo),this.ballCamEnabled=i.initialBallCamEnabled??!1,this.boostMeterEnabled=i.initialBoostMeterEnabled??!1,this.boostPickupAnimationEnabled=i.initialBoostPickupAnimationEnabled??!0,this.skipPostGoalTransitionsEnabled=i.initialSkipPostGoalTransitionsEnabled??!0,this.skipKickoffsEnabled=i.initialSkipKickoffsEnabled??!1,this.skipPostGoalTransitionIfNeeded(),this.skipPastKickoffIfNeeded(),this.installResizeHandling();for(const a of i.plugins??[])this.installPlugin(a,!1);this.render(),this.scheduleAnimationFrame(),this.emitChange(),i.autoplay&&this.play()}play(){this.playing||(this.playing=!0,this.reanchorPlaybackClock(),this.emitChange())}pause(){this.playing&&(this.syncPlaybackClock(),this.playing=!1,this.emitChange())}togglePlayback(){this.playing?this.pause():this.play()}setPlaybackRate(e){this.playing&&this.syncPlaybackClock(),this.speed=Math.max(.1,e),this.playing&&this.reanchorPlaybackClock(),this.emitChange()}setCameraDistanceScale(e){this.cameraDistanceScale=Math.max(.25,e),this.render(),this.emitChange()}setCustomCameraSettings(e){this.customCameraSettings=Iu(e),this.render(),this.emitChange()}setAttachedPlayer(e){this.attachedPlayerId=e,this.cameraViewMode=e?"follow":Yo,this.freeCameraTransition=null,this.render(),this.emitChange()}setCameraViewMode(e){this.cameraViewMode=e,this.freeCameraTransition=null,this.render(),this.emitChange()}setFreeCameraPreset(e){const{fov:n,position:i,target:a,up:s}=GC(e,this.fieldScale);this.cameraViewMode=Yo,this.freeCameraTransition={position:i,target:a,up:s,fov:n},this.render(),this.emitChange()}setBallCamEnabled(e){this.ballCamEnabled=e,this.render(),this.emitChange()}setBoostMeterEnabled(e){if(this.boostMeterEnabled=e,!e)for(const n of this.sceneState.playerBoostMeters.values())n.group.visible=!1;this.render(),this.emitChange()}setBoostPickupAnimationEnabled(e){this.boostPickupAnimationEnabled=e,this.render(),this.emitChange()}setSkipPostGoalTransitionsEnabled(e){this.skipPostGoalTransitionsEnabled=e,e&&this.skipPostGoalTransitionIfNeeded(),this.render(),this.emitChange()}setSkipKickoffsEnabled(e){this.skipKickoffsEnabled=e,e&&(this.skipPostGoalTransitionIfNeeded(),this.skipPastKickoffIfNeeded()),this.render(),this.emitChange()}seek(e){this.currentTime=this.clampReplayTime(e),this.skipPostGoalTransitionIfNeeded(),this.skipPastKickoffIfNeeded(),this.playing&&this.reanchorPlaybackClock(),this.render(),this.emitChange()}setFrameIndex(e){const n=gC(this.replay,e),i=this.replay.frames[n]?.time??0,a=this.playing,s=this.currentTime!==i||a;this.playing=!1,this.currentTime=i,this.render(),s&&this.emitChange()}stepFrames(e){if(!Number.isFinite(e)||this.replay.frames.length===0)return;const n=pr(this.replay,this.currentTime);this.setFrameIndex(n+Math.trunc(e))}stepForwardFrame(){this.stepFrames(1)}stepBackwardFrame(){this.stepFrames(-1)}setState(e){const n=performance.now();if(e.speed!==void 0&&(this.playing&&this.syncPlaybackClock(n),this.speed=Math.max(.1,e.speed)),e.cameraDistanceScale!==void 0&&(this.cameraDistanceScale=Math.max(.25,e.cameraDistanceScale)),e.customCameraSettings!==void 0&&(this.customCameraSettings=Iu(e.customCameraSettings)),e.cameraViewMode!==void 0&&(this.cameraViewMode=e.cameraViewMode),e.attachedPlayerId!==void 0&&(this.attachedPlayerId=e.attachedPlayerId,e.cameraViewMode===void 0&&(this.cameraViewMode=this.attachedPlayerId?"follow":Yo)),e.ballCamEnabled!==void 0&&(this.ballCamEnabled=e.ballCamEnabled),e.boostMeterEnabled!==void 0&&(this.boostMeterEnabled=e.boostMeterEnabled,!this.boostMeterEnabled))for(const i of this.sceneState.playerBoostMeters.values())i.group.visible=!1;e.boostPickupAnimationEnabled!==void 0&&(this.boostPickupAnimationEnabled=e.boostPickupAnimationEnabled),e.skipPostGoalTransitionsEnabled!==void 0&&(this.skipPostGoalTransitionsEnabled=e.skipPostGoalTransitionsEnabled),e.skipKickoffsEnabled!==void 0&&(this.skipKickoffsEnabled=e.skipKickoffsEnabled),e.currentTime!==void 0&&(this.currentTime=this.clampReplayTime(e.currentTime)),e.playing!==void 0&&e.playing!==this.playing&&(e.playing?this.playing=!0:(e.currentTime===void 0&&this.syncPlaybackClock(n),this.playing=!1)),this.playing&&this.reanchorPlaybackClock(n),this.skipPostGoalTransitionIfNeeded(n),this.skipPastKickoffIfNeeded(n),this.render(),this.emitChange()}getState(){const e=pr(this.replay,this.currentTime);return{currentTime:this.currentTime,duration:this.replay.duration,frameIndex:e,activeMetadata:this.getActiveMetadata(e,this.currentTime),playing:this.playing,speed:this.speed,cameraDistanceScale:this.cameraDistanceScale,customCameraSettings:this.customCameraSettings,cameraViewMode:this.cameraViewMode,attachedPlayerId:this.attachedPlayerId,ballCamEnabled:this.ballCamEnabled,boostMeterEnabled:this.boostMeterEnabled,boostPickupAnimationEnabled:this.boostPickupAnimationEnabled,skipPostGoalTransitionsEnabled:this.skipPostGoalTransitionsEnabled,skipKickoffsEnabled:this.skipKickoffsEnabled}}getSnapshot(){return this.getState()}getTimelineDuration(){return this.getTimelineSegments().length===0?this.replay.duration:this.timelineDurationCache}getTimelineCurrentTime(){return this.projectReplayTimeToTimeline(this.currentTime).timelineTime}getTimelineSegments(){const e=`${this.skipPostGoalTransitionsEnabled}:${this.skipKickoffsEnabled}`;return this.timelineSegmentsCacheKey===e?this.timelineSegmentsCache:(this.timelineSegmentsCacheKey=e,this.timelineSegmentsCache=this.computeTimelineSegments(),this.timelineDurationCache=Math.max(0,this.replay.duration-this.timelineSegmentsCache.reduce((n,i)=>n+(i.endTime-i.startTime),0)),this.timelineSegmentsCache)}projectReplayTimeToTimeline(e){return wC(this.replay.duration,this.getTimelineSegments(),e)}projectTimelineTimeToReplay(e){return EC(this.replay.duration,this.getTimelineDuration(),this.getTimelineSegments(),e)}clampReplayTime(e){return ht.clamp(e,0,this.replay.duration)}getPlaybackEndTime(){return MC(this.replay.duration,this.getTimelineSegments())}subscribe(e){const n=i=>{e(i.detail)};return this.addEventListener("change",n),e(this.getState()),()=>{this.removeEventListener("change",n)}}onBeforeRender(e){return this.beforeRenderCallbacks.push(e),()=>{const n=this.beforeRenderCallbacks.indexOf(e);n>=0&&this.beforeRenderCallbacks.splice(n,1)}}addPlugin(e){return this.installPlugin(e,!0)}removePlugin(e){const n=this.plugins.findIndex(a=>a.plugin.id===e);if(n<0)return!1;const[i]=this.plugins.splice(n,1);return i.plugin.teardown?.(this.createPluginContext()),this.render(),!0}getPlugins(){return this.plugins.map(e=>e.plugin)}destroy(){for(this.playing&&this.pause(),this.disposed=!0,this.animationFrameId!==null&&(cancelAnimationFrame(this.animationFrameId),this.animationFrameId=null),this.resizeObserver?(this.resizeObserver.disconnect(),this.resizeObserver=null):window.removeEventListener("resize",this.boundWindowResize);this.plugins.length>0;)this.plugins.pop()?.plugin.teardown?.(this.createPluginContext());this.sceneState.dispose()}dispose(){this.destroy()}installResizeHandling(){if(typeof ResizeObserver<"u"){this.resizeObserver=new ResizeObserver(()=>{this.sceneState.resize()}),this.resizeObserver.observe(this.container);return}window.addEventListener("resize",this.boundWindowResize)}scheduleAnimationFrame(){this.animationFrameId!==null||this.disposed||(this.animationFrameId=requestAnimationFrame(this.tick))}reanchorPlaybackClock(e=performance.now()){this.playbackStartedAt=e,this.playbackStartedTime=this.currentTime}syncPlaybackClock(e=performance.now()){if(!this.playing)return!1;const n=(e-this.playbackStartedAt)/1e3,i=ht.clamp(this.playbackStartedTime+n*this.speed,0,this.getPlaybackEndTime()),a=i!==this.currentTime;return this.currentTime=i,a}tick=e=>{if(this.animationFrameId=null,this.disposed)return;let n=!1;this.playing&&(n=this.syncPlaybackClock(e),n=this.skipPostGoalTransitionIfNeeded(e)||n,n=this.skipPastKickoffIfNeeded(e)||n,this.currentTime>=this.getPlaybackEndTime()&&(this.playing=!1,n=!0)),this.render(),n&&this.emitChange(),this.scheduleAnimationFrame()};render(){const e=AC(this.replay,this.currentTime),n=e.frameIndex,i=this.replay.ballFrames[n]??null,a=this.replay.ballFrames[e.nextFrameIndex]??i,s=Am(i?.position??null,a?.position??null,e.alpha),r=s?t0(s,this.fieldScale):null,o=[];if(s){this.sceneState.ballMesh.visible=!0,this.sceneState.ballMesh.position.copy(Lu(s));const u=Cm(i?.rotation??null,a?.rotation??null,e.alpha);u?this.sceneState.ballMesh.quaternion.copy(u):this.sceneState.ballMesh.quaternion.identity()}else this.sceneState.ballMesh.visible=!1;for(const[u,d]of this.replay.players.entries()){const f=this.sceneState.playerMeshes.get(d.id),p=this.sceneState.playerBoostTrails.get(d.id),_=this.sceneState.playerBoostMeters.get(d.id),g=this.sceneState.playerDemoIndicators.get(d.id),m=d.frames[n]??null,h=d.frames[e.nextFrameIndex]??m;let b=null,S=null,y=0;if(!f){g&&(g.group.visible=!1),o.push({track:d,mesh:null,boostTrail:p??null,frame:m,nextFrame:h,interpolatedPosition:S,boostFraction:y});continue}b=Am(m?.position??null,h?.position??null,e.alpha);const C=this.getActiveDemoEvent(d.id,this.currentTime);if(!b){f.visible=!1,p&&(p.visible=!1),_&&(_.group.visible=!1),this.updateDemoIndicator(d.id,g??null,null,C),o.push({track:d,mesh:f,boostTrail:p??null,frame:m,nextFrame:h,interpolatedPosition:S,boostFraction:y});continue}if(C){f.visible=!1,p&&(p.visible=!1),_&&(_.group.visible=!1),this.updateDemoIndicator(d.id,g??null,b,C),o.push({track:d,mesh:f,boostTrail:p??null,frame:m,nextFrame:h,interpolatedPosition:S,boostFraction:y});continue}if(!KC(m)){f.visible=!1,p&&(p.visible=!1),_&&(_.group.visible=!1),this.updateDemoIndicator(d.id,g??null,b),o.push({track:d,mesh:f,boostTrail:p??null,frame:m,nextFrame:h,interpolatedPosition:S,boostFraction:y});continue}f.visible=!0,g&&(g.group.visible=!1),S=b,f.position.copy(Lu(b));const T=Cm(m?.rotation??null,h?.rotation??null,e.alpha);T?f.quaternion.copy(T):f.quaternion.identity();const A=m?.boostFraction??0,v=h?.boostFraction??A;if(y=ht.lerp(A,v,e.alpha),p){const x=(e.alpha>=.5?h?.boostActive:m?.boostActive)??m?.boostActive??h?.boostActive??!1;this.updateBoostTrail(p,x,y,this.currentTime,u)}_&&(this.boostMeterEnabled?(_.group.visible=!0,pC(_,y,ht.lerp(m?.boostAmount??0,h?.boostAmount??m?.boostAmount??0,e.alpha),this.sceneState.camera)):_.group.visible=!1),o.push({track:d,mesh:f,boostTrail:p??null,frame:m,nextFrame:h,interpolatedPosition:S,boostFraction:y})}XC({sceneState:this.sceneState,replay:this.replay,fieldScale:this.fieldScale,cameraViewMode:this.cameraViewMode,attachedPlayerId:this.attachedPlayerId,ballCamEnabled:this.ballCamEnabled,cameraDistanceScale:this.cameraDistanceScale,customCameraSettings:this.customCameraSettings,frameIndex:n,attachedPlayerUnavailable:this.attachedPlayerId!==null&&this.getActiveDemoEvent(this.attachedPlayerId,this.currentTime)!==null,ballPosition:r,desiredCameraPosition:this.desiredCameraPosition,desiredLookTarget:this.desiredLookTarget}),this.cameraViewMode==="free"&&this.freeCameraTransition&&$C({sceneState:this.sceneState,...this.freeCameraTransition})&&(this.freeCameraTransition=null),this.sceneState.controls.update(),this.sceneState.updateWallVisibility();const l={frameIndex:e.frameIndex,nextFrameIndex:e.nextFrameIndex,alpha:e.alpha,currentTime:this.currentTime};for(const u of this.beforeRenderCallbacks)u(l);const c=this.createRenderContext(l,i,a,r,o);for(const u of this.plugins)u.plugin.beforeRender?.(c);this.sceneState.renderer.render(this.sceneState.scene,this.sceneState.camera)}skipPastKickoffIfNeeded(e){if(!this.skipKickoffsEnabled)return!1;const n=pr(this.replay,this.currentTime),i=this.replay.frames[n];if(!i||!Np(i,this.kickoffGameState))return!1;const a=this.replay.frames.find((s,r)=>r>n&&Qv(s,this.liveGameState));return!a||a.time===this.currentTime?!1:(this.currentTime=a.time,this.playing&&this.reanchorPlaybackClock(e),!0)}skipPostGoalTransitionIfNeeded(e){if(!this.skipPostGoalTransitionsEnabled)return!1;const n=pr(this.replay,this.currentTime),i=this.replay.frames[n];if(!i||!El(this.replay,i,n,this.liveGameState,this.kickoffGameState))return!1;const a=this.replay.frames.find((s,r)=>r>n&&!El(this.replay,s,r,this.liveGameState,this.kickoffGameState));if(!a){let s=n;for(;s>0&&El(this.replay,this.replay.frames[s-1],s-1,this.liveGameState,this.kickoffGameState);)s-=1;const r=this.replay.frames[s]?.time;return r===void 0||r===this.currentTime?!1:(this.currentTime=r,this.playing&&this.reanchorPlaybackClock(e),!0)}return a.time===this.currentTime?!1:(this.currentTime=a.time,this.playing&&this.reanchorPlaybackClock(e),!0)}getActiveMetadata(e,n){return TC(this.replay,e,n)}computeTimelineSegments(){return SC(this.replay,this.skipPostGoalTransitionsEnabled,this.skipKickoffsEnabled,this.liveGameState,this.kickoffGameState)}installPlugin(e,n){const i=typeof e=="function"?e():e;if(this.plugins.some(s=>s.plugin.id===i.id))throw new Error(`Replay player plugin "${i.id}" is already installed`);const a={definition:e,plugin:i};return this.plugins.push(a),i.setup?.(this.createPluginContext()),i.onStateChange?.(this.createPluginStateContext(this.getState())),n&&this.render(),()=>{const s=this.plugins.indexOf(a);s<0||(this.plugins.splice(s,1),i.teardown?.(this.createPluginContext()),this.render())}}createPluginContext(){return{player:this,replay:this.replay,scene:this.sceneState,container:this.container,options:this.options}}createPluginStateContext(e){return{...this.createPluginContext(),state:e}}createRenderContext(e,n,i,a,s){return{...this.createPluginStateContext(this.getState()),...e,frame:this.replay.frames[e.frameIndex]??null,nextFrame:this.replay.frames[e.nextFrameIndex]??null,ballFrame:n,nextBallFrame:i,ballPosition:a,players:s}}emitChange(){const e=this.getState(),n=this.createPluginStateContext(e);for(const i of this.plugins)i.plugin.onStateChange?.(n);this.dispatchEvent(new CustomEvent("change",{detail:e}))}getActiveDemoEvent(e,n){for(let i=this.replay.timelineEvents.length-1;i>=0;i-=1){const a=this.replay.timelineEvents[i],s=n-a.time;if(!(s<0)){if(s>Rm)break;if(a.kind==="demo"&&a.secondaryPlayerId===e)return a}}return null}updateDemoIndicator(e,n,i,a=this.getActiveDemoEvent(e,this.currentTime)){if(!n)return;const s=a?.location??i;if(!a||!s){n.group.visible=!1;return}const r=Math.max(0,this.currentTime-a.time),o=this.currentTime*8,l=1+.08*Math.sin(o);n.group.visible=!0,n.group.position.copy(Lu(s)),n.ring.rotation.z=o*.15,n.ring.scale.setScalar(l),n.label.quaternion.copy(this.sceneState.camera.quaternion),n.label.scale.setScalar(1+.04*Math.sin(o+1.3));const c=ht.clamp(1-r/Rm,.28,1);for(const u of[n.ring,n.label]){const d=u.material;d instanceof Mi&&(d.opacity=c)}}updateBoostTrail(e,n,i,a,s){if(!n){e.visible=!1;return}e.visible=!0;const r=a*36+s*1.7,o=.86+.14*Math.sin(r),l=ht.clamp(.62+i*.88,.62,1.5),c=l*(1.02+o*.52),u=1.02+l*.28;e.scale.set(c,u,u);for(const[d,f]of e.children.entries()){const p=f,_=.92+.14*Math.sin(r+d*.85);p.scale.setScalar(_),p.traverse(g=>{if(!(g instanceof He))return;const m=g.material;if(m instanceof st)switch(g.name){case"outer-flame":m.opacity=.24+l*.24;break;case"inner-flame":m.opacity=.58+l*.3;break;case"glow":m.opacity=.4+l*.26;break}})}}}const ZC="https://ballchasing.com",JC=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;function QC(t,e){const i=(e instanceof URL?e.href:e).replace(/\/+$/,"");return new URL(`${i}/${t.replace(/^\/+/,"")}`)}function Pm(t){return JC.test(t.trim())}function Ip(t){const e=t.trim();if(Pm(e))return e.toLowerCase();let n;try{n=new URL(e)}catch{throw new Error(`Invalid Ballchasing replay id: ${t}`)}if(!/(^|\.)ballchasing\.com$/i.test(n.hostname))throw new Error(`Invalid Ballchasing replay URL: ${t}`);const i=n.pathname.split("/").filter(Boolean),a=i.findIndex(o=>o==="replay"),s=i.findIndex(o=>o==="replays"),r=a>=0?i[a+1]:s>=0?i[s+1]:void 0;if(!r||!Pm(r))throw new Error(`Invalid Ballchasing replay URL: ${t}`);return r.toLowerCase()}function eR(t){return`ballchasing-${Ip(t)}.replay`}function tR(t,e=ZC){const n=Ip(t);return QC(`dl/replay/${encodeURIComponent(n)}`,e)}const Lm="subtr-actor-ballchasing-overlay-styles",nR="#3b82f6",iR="#f59e0b";function aR(){if(document.getElementById(Lm))return;const t=document.createElement("style");t.id=Lm,t.textContent=`
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
      border-bottom: 2px solid ${nR};
    }

    .sap-bc-team-hud-orange {
      left: calc(50% + 2.7rem);
      flex-direction: row;
      justify-content: flex-start;
      border-bottom: 2px solid ${iR};
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
  `,document.head.append(t)}function sR(t,e){const n=t.players[e],i=n.frame?.boostAmount??0,a=n.nextFrame?.boostAmount??i;return ht.lerp(i,a,t.alpha)}function Nm(t,e,n,i){if(!t||!e)return;const a=Math.max(0,Math.min(100,Math.round(n/255*100)));t.style.width=`${a}%`,e.textContent=`${a} ${i}`}function Im(t,e,n,i){if(!t)return;const a=()=>{e.player.setAttachedPlayer(n)};t.classList.add("sap-bc-player-selectable"),t.tabIndex=0,t.setAttribute("role","button"),t.setAttribute("aria-label",`Follow ${i}`),t.title=`Follow ${i}`,t.addEventListener("click",a),t.addEventListener("keydown",s=>{s.key!=="Enter"&&s.key!==" "||(s.preventDefault(),a())})}function rR(t,e,n,i,a){if(t.getWorldPosition(a),a.add(e),a.project(n),a.z<-1||a.z>1)return!1;const s=i.clientWidth||1,r=i.clientHeight||1;return a.x=(a.x+1)*s/2,a.y=(1-a.y)*r/2,!(a.x<-80||a.x>s+80||a.y<-80||a.y>r+80)}function oR(t={}){const e=t.showFloatingNames??!0,n=t.showFloatingBoostBars??!0,i=t.showTeamBoostHud??!0;let a=null,s=null,r=null,o=null,l=!1,c="";const u=new Map,d=new L,f=new L(0,0,255);function p(g){for(const[m,h]of u.entries()){const b=m===g;h.floatingRoot?.classList.toggle("sap-bc-player-following",b),h.teamHudEntry?.classList.toggle("sap-bc-player-following",b),h.floatingRoot?.setAttribute("aria-pressed",b?"true":"false"),h.teamHudEntry?.setAttribute("aria-pressed",b?"true":"false")}}function _(g,m){aR(),getComputedStyle(m).position==="static"&&(l=!0,c=m.style.position,m.style.position="relative"),a=document.createElement("div"),a.className="sap-bc-overlay-root",e||n?(s=document.createElement("div"),s.className="sap-bc-floating-layer",a.append(s)):s=null,i?(r=document.createElement("div"),r.className="sap-bc-team-hud sap-bc-team-hud-blue",o=document.createElement("div"),o.className="sap-bc-team-hud sap-bc-team-hud-orange",a.append(r,o)):(r=null,o=null);for(const h of g.replay.players){let b=null,S=null,y=null,C=null;s&&(b=document.createElement("div"),b.className="sap-bc-floating-track",b.hidden=!0,(e||n)&&(S=document.createElement("div"),S.className=`sap-bc-boost-bar ${h.isTeamZero?"sap-bc-boost-bar-blue":"sap-bc-boost-bar-orange"}`,y=document.createElement("div"),y.className=`sap-bc-boost-fill ${h.isTeamZero?"sap-bc-boost-fill-blue":"sap-bc-boost-fill-orange"}`,C=document.createElement("span"),C.className="sap-bc-boost-text",S.append(y,C),b.append(S)),Im(b,g,h.id,h.name),s.append(b));let M=null,T=null,A=null;if(i){M=document.createElement("div"),M.className="sap-bc-hud-player";const v=document.createElement("div");v.className=`sap-bc-hud-boost-bar ${h.isTeamZero?"sap-bc-boost-bar-blue":"sap-bc-boost-bar-orange"}`,T=document.createElement("div"),T.className=`sap-bc-hud-boost-fill ${h.isTeamZero?"sap-bc-boost-fill-blue":"sap-bc-boost-fill-orange"}`,A=document.createElement("span"),A.className="sap-bc-hud-boost-text",v.append(T,A),M.append(v),Im(M,g,h.id,h.name),(h.isTeamZero?r:o)?.append(M)}u.set(h.id,{floatingRoot:b,floatingBoostFill:y,floatingBoostText:C,teamHudEntry:M,teamHudFill:T,teamHudText:A})}f.set(0,0,255*(g.options.fieldScale??1)),m.append(a),p(g.player.getState().attachedPlayerId)}return{id:"ballchasing-overlay",setup(g){_(g,g.container)},onStateChange(g){p(g.state.attachedPlayerId)},teardown(g){a?.remove(),a=null,s=null,r=null,o=null,u.clear(),l&&(g.container.style.position=c,l=!1)},beforeRender(g){if(a)for(const[m,h]of g.players.entries()){const b=u.get(h.track.id);if(!b)continue;const S=sR(g,m);Nm(b.floatingBoostFill,b.floatingBoostText,S,h.track.name),Nm(b.teamHudFill,b.teamHudText,S,h.track.name);const y=h.mesh,C=y!==null&&h.interpolatedPosition!==null;if(b.teamHudEntry?.classList.toggle("sap-bc-hud-player-inactive",!C),!!b.floatingRoot){if(!C||!rR(y,f,g.scene.camera,g.container,d)){b.floatingRoot.hidden=!0;continue}b.floatingRoot.hidden=!1,b.floatingRoot.style.transform=`translate(${d.x.toFixed(1)}px, ${d.y.toFixed(1)}px) translate(-50%, -100%)`}}}}}function Du(t){t.depthTest=!1,t.depthWrite=!1,t.transparent=!0,t.polygonOffset=!0,t.polygonOffsetFactor=-2,t.polygonOffsetUnits=-2,t.forceSinglePass=!0}const gs=6,lR=.6;function co(t){return t*lR}function cR(t){return co(t.size==="big"?150:92)}function n0(t){return co(t.size==="big"?155:46)}function uR(t){return co(t.size==="big"?34:14)}function i0(t){return gs+uR(t)+n0(t)}function a0(t){return t.size==="big"?i0(t):gs+co(1.2)}function s0(t){return t.size==="big"?i0(t):gs+co(.8)}function dR(t){return t.size==="big"?16096779:16436245}function fR(t){const e=cR(t),n=dR(t),i=n0(t),a=t.size==="big",s=new _t;s.position.set(t.position.x,t.position.y,t.position.z),s.renderOrder=20,s.frustumCulled=!1;const r=new He(new ka(e*.72,e,24),new st({color:n,transparent:!0,opacity:.92,side:Qe,depthWrite:!1}));Du(r.material),r.position.z=gs,r.renderOrder=20,r.frustumCulled=!1,s.add(r);const o=new He(new cs(e*.58,24),new st({color:n,transparent:!0,opacity:.3,side:Qe,depthWrite:!1}));Du(o.material),o.position.z=gs+.5,o.renderOrder=21,o.frustumCulled=!1,s.add(o);const l=new He(new cs(e*.42,20),new st({color:16777215,transparent:!0,opacity:.22,side:Qe,depthWrite:!1}));Du(l.material),l.position.z=gs+1,l.renderOrder=22,l.frustumCulled=!1,s.add(l);const c=new He(a?new ks(i,32,18):new cs(i*.9,24),a?new Zl({color:n,emissive:new je(n),emissiveIntensity:.6,shininess:88,specular:new je(16773826),transparent:!0,opacity:.92,depthWrite:!1}):new st({color:n,transparent:!0,opacity:.88,side:Qe,blending:zi,depthWrite:!1}));c.position.z=a0(t),c.renderOrder=23,c.frustumCulled=!1,s.add(c);const u=new He(a?new ks(i*1.36,32,14):new cs(i*1.35,28),new st({color:n,transparent:!0,opacity:a?.2:.16,side:Qe,blending:zi,depthWrite:!1}));return u.position.z=s0(t),u.renderOrder=24,u.frustumCulled=!1,s.add(u),{group:s,ring:r,core:o,cooldown:l,orb:c,glow:u}}function pR(t,e){let n=-1;for(let s=0;s<t.events.length&&!(t.events[s].time>e);s+=1)n=s;if(n<0)return{available:!0,progress:1};const i=t.events[n];if(i.available)return{available:!0,progress:1};const a=t.events.slice(n+1).find(s=>s.available);return!a||a.time<=i.time?{available:!1,progress:0}:{available:!1,progress:ht.clamp((e-i.time)/(a.time-i.time),0,1)}}function hR(t,e,n,i){const{available:a,progress:s}=pR(e,n),r=e.size==="big",o=.92+.08*Math.sin(n*6+e.index*.45),l=.96+.04*Math.sin(n*(r?4.8:7.2)+e.index*.37),c=r?Math.sin(n*2.2+e.index*.61)*18:0,u=a0(e)+c,d=s0(e)+c;if(t.orb.position.z=u,t.glow.position.z=d,t.orb.rotation.z=n*(r?.9:1.25),t.glow.rotation.z=-n*.45,a){t.group.visible=!0,t.ring.material.opacity=.95,t.core.material.opacity=r?.56:.5,t.cooldown.visible=!1,t.ring.scale.setScalar(o),t.core.scale.setScalar(1),t.orb.visible=!0,t.glow.visible=!0,t.orb.material.opacity=r?.96:.9,t.glow.material.opacity=(r?.2:.16)+(l-.96),t.orb.scale.setScalar(l),t.glow.scale.setScalar(r?1.02+(l-.96)*2:1);return}if(t.group.visible=!0,t.ring.material.opacity=.18,t.core.material.opacity=.07,t.ring.scale.setScalar(1),t.core.scale.setScalar(1),t.orb.visible=!1,t.glow.visible=!1,t.cooldown.visible=i,i){const f=.3+s*.7;t.cooldown.scale.setScalar(f),t.cooldown.material.opacity=.16+s*.2}}function mR(t={}){const e=t.showCooldownProgress??!0;let n=null;const i=new Map;function a(r){n=new _t,n.name="boost-pad-overlay",n.renderOrder=20,n.frustumCulled=!1;for(const o of r.replay.boostPads){const l=fR(o);n.add(l.group),i.set(o.index,l)}r.scene.replayRoot.add(n)}function s(r){for(const o of r.replay.boostPads){const l=i.get(o.index);l&&hR(l,o,r.state.currentTime,e)}}return{id:"boost-pad-overlay",setup(r){a(r),s({...r,state:r.player.getState()})},onStateChange(r){s(r)},teardown(){n?.removeFromParent(),n=null,i.clear()}}}const _R=1.35,gR="#57a8ff",vR="#ff9c40",yR=256,bR=160,xR=360,SR=225,wR=260,ER=430,r0=18,Dm=120;function MR(t){return t?gR:vR}function TR(t){return t.events.filter(e=>!e.available&&e.playerId)}function o0(t,e){const n=document.createElement("canvas");n.width=yR,n.height=bR;const i=n.getContext("2d");if(!i)throw new Error("Unable to create boost pickup count canvas");i.clearRect(0,0,n.width,n.height),i.textAlign="center",i.textBaseline="middle",i.lineJoin="round",i.font="800 124px sans-serif",i.lineWidth=18,i.strokeStyle="rgba(4, 10, 18, 0.88)",i.strokeText(`${t}`,n.width/2,n.height/2),i.fillStyle=e,i.fillText(`${t}`,n.width/2,n.height/2);const a=new Mc(n);return a.colorSpace=Wt,a.needsUpdate=!0,a}function AR(t){t?.dispose()}function CR(t){const e=new _t;e.visible=!1,e.renderOrder=60,e.frustumCulled=!1;const n=o0(1,t),i=new Lv({map:n,transparent:!0,depthTest:!1,depthWrite:!1}),a=new Iv(i);a.scale.set(xR,SR,1),a.renderOrder=62,a.frustumCulled=!1,e.add(a);const s=new st({color:t,transparent:!0,opacity:0,side:Qe,depthTest:!1,depthWrite:!1,blending:zi}),r=new He(new ka(Dm*.72,Dm,36),s);return r.position.z=r0,r.renderOrder=61,r.frustumCulled=!1,e.add(r),{group:e,textMaterial:i,ringMaterial:s}}function RR(t,e){t.currentCount!==e&&(AR(t.textMaterial.map),t.textMaterial.map=o0(e,t.color),t.textMaterial.needsUpdate=!0,t.currentCount=e)}function PR(t){const e=new Map;for(const a of t.replay.players)e.set(a.id,a);const n=[];for(const a of t.replay.boostPads)for(const s of TR(a))n.push({pad:a,event:s});n.sort((a,s)=>a.event.time!==s.event.time?a.event.time-s.event.time:a.event.frame!==s.event.frame?a.event.frame-s.event.frame:a.pad.index-s.pad.index);const i=[];for(const{pad:a,event:s}of n){if(!s.playerId)continue;const r=e.get(s.playerId);if(!r)continue;const o=MR(r.isTeamZero),{group:l,textMaterial:c,ringMaterial:u}=CR(o);l.position.copy(a.position),t.scene.replayRoot.add(l),i.push({time:s.time,pad:a,event:s,player:r,color:o,currentCount:1,position:new L(a.position.x,a.position.y,a.position.z),size:a.size,group:l,textMaterial:c,ringMaterial:u})}return i}function LR(t,e,n){const i=ht.clamp(e/n,0,1),a=1-Math.pow(1-i,3),s=i*i,r=t.size==="big"?ER:wR,o=t.size==="big"?360:280,l=1+Math.sin(i*Math.PI)*.22;t.group.visible=!0,t.group.position.set(t.position.x,t.position.y,t.position.z+r+a*o),t.group.scale.setScalar(l),t.textMaterial.opacity=Math.max(0,1-s),t.ringMaterial.opacity=Math.max(0,.48*(1-i));const c=t.group.children[1];if(c){const u=.75+a*(t.size==="big"?2.8:1.85);c.scale.setScalar(u),c.position.z=r0-r-a*o}}function NR(t={}){const e=Math.max(.1,t.durationSeconds??_R);let n=[];function i(s){return t.includePickup?.({pad:s.pad,event:s.event,player:s.player})??!0}function a(){for(const s of n)s.group.visible=!1}return{id:"boost-pickup-animation",setup(s){n=PR(s)},beforeRender(s){if(!s.state.boostPickupAnimationEnabled){a();return}const r=s.currentTime-e,o=new Map;for(const l of n){if(l.time>s.currentTime){l.group.visible=!1;continue}if(!i(l)){l.group.visible=!1;continue}const c=(o.get(l.player.id)??0)+1;if(o.set(l.player.id,c),l.time<r){l.group.visible=!1;continue}RR(l,c),LR(l,s.currentTime-l.time,e)}},teardown(){for(const s of n)s.group.removeFromParent(),s.group.traverse(r=>{(r instanceof He||r instanceof Iv)&&r.geometry?.dispose()}),s.textMaterial.map?.dispose(),s.textMaterial.dispose(),s.ringMaterial.dispose();n=[]}}}const IR=60,DR=["video/webm;codecs=vp9","video/webm;codecs=vp8","video/webm"];function kR(t){if(t&&MediaRecorder.isTypeSupported(t))return t;for(const e of DR)if(MediaRecorder.isTypeSupported(e))return e;return""}function FR(t){return t instanceof Error?t.message:String(t)}function OR(t={}){let e=null,n=null,i=[],a=null,s=0,r=0,o="",l=0,c=null,u=null,d=null,f=null,p=!1,_=null;const g=new Set;function m(){return{state:n?n.state==="recording"?"recording":"stopping":c?"error":a?"ready":"idle",elapsedSeconds:r,mimeType:o,sizeBytes:l,error:c}}function h(){const M=m();t.onStatusChange?.(M);for(const T of g)T(M)}function b(){if(!e)throw new Error("Canvas recorder plugin is not installed");return e}function S(M){n=null,f=null,p=!1,a=M,l=M?.size??0,_&&e&&e.player.setState({currentTime:_.currentTime,speed:_.speed,playing:_.playing}),_=null,M&&t.onComplete?.(M),h(),d?.(M),d=null,u=null}function y(M){c=FR(M),n=null,f=null,p=!1,_=null,h(),d?.(null),d=null,u=null}const C={id:"canvas-recorder",setup(M){e=M},beforeRender(M){n?.state==="recording"&&(r=(performance.now()-s)/1e3,h()),n?.state==="recording"&&f!==null&&M.currentTime>=f&&C.stop()},onStateChange(M){p&&n?.state==="recording"&&!M.state.playing&&r>0&&C.stop()},teardown(){n?.state==="recording"&&n.stop(),e=null,n=null,f=null,p=!1,_=null,d?.(null),d=null,u=null,g.clear()},start(M={}){const T=b();if(n?.state==="recording")throw new Error("Canvas recording is already in progress");if(typeof MediaRecorder>"u")throw new Error("MediaRecorder is not available in this browser");const A=T.scene.renderer.domElement;if(!A.captureStream)throw new Error("Canvas captureStream is not available in this browser");c=null,a=null,i=[],l=0,r=0,s=performance.now(),o=kR(M.mimeType??t.mimeType);const v=Math.max(1,M.fps??t.fps??IR),x=A.captureStream(v);n=new MediaRecorder(x,{mimeType:o,videoBitsPerSecond:M.videoBitsPerSecond??t.videoBitsPerSecond}),u=new Promise(R=>{d=R}),n.addEventListener("dataavailable",R=>{R.data.size>0&&(i.push(R.data),l+=R.data.size,h())}),n.addEventListener("stop",()=>{x.getTracks().forEach(R=>R.stop()),S(new Blob(i,{type:o||"video/webm"}))},{once:!0}),n.addEventListener("error",R=>{x.getTracks().forEach(I=>I.stop()),y(R.error??R)},{once:!0}),n.start(1e3),h()},stop(){if(!n)return Promise.resolve(a);if(n.state==="inactive")return u??Promise.resolve(a);const M=u??new Promise(T=>{d=T});return n.stop(),h(),M},clear(){if(n?.state==="recording")throw new Error("Cannot clear a recording while recording is in progress");a=null,i=[],l=0,r=0,c=null,h()},getRecording(){return a},getStatus(){return m()},subscribe(M){return g.add(M),M(m()),()=>{g.delete(M)}},recordRange(M={}){const T=b(),A=T.player.getState();(M.restorePlaybackState??!0)&&(_=A);const v=M.playbackRate??A.speed,x=M.startTime??A.currentTime;f=M.endTime??A.duration,p=!0,T.player.setState({currentTime:x,speed:v,playing:!1}),C.start(M);const R=u;return T.player.play(),(R??Promise.resolve(null)).then(I=>{if(!I)throw new Error("Recording stopped without producing a video");return I})},recordFullReplay(M={}){return C.recordRange({...M,startTime:M.startTime??0,endTime:M.endTime??b().replay.duration})}};return C}const km="subtr-actor-timeline-overlay-styles",UR=new Set(["goal","save"]),BR=.2,zR=2,HR=4,VR=.01,Fm=.01;function GR(){if(document.getElementById(km))return;const t=document.createElement("style");t.id=km,t.textContent=`
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
  `,document.head.append(t)}function rf(t){if(!Number.isFinite(t))return"--:--.--";const e=Math.max(0,t),n=Math.floor(e/60),i=Math.floor(e%60),a=Math.floor((e-Math.floor(e))*100);return`${n}:${String(i).padStart(2,"0")}.${String(a).padStart(2,"0")}`}function Om(t){switch(t.kind){case"goal":return 5;case"demo":return 4;case"save":return 3;case"assist":return 2;case"shot":return 1;default:return 0}}function $R(t){switch(t.kind){case"goal":case"goal-context":case"goal-tag":return HR;default:return zR}}function Dp(t){return t.seekTime!==void 0&&Number.isFinite(t.seekTime)?Math.max(0,t.seekTime):Number.isFinite(t.time)?Math.max(0,t.time-$R(t)):0}function WR(t){if(t.color)return t.color;if(t.isTeamZero===!0)return"#3b82f6";if(t.isTeamZero===!1)return"#f59e0b";switch(t.kind){case"goal":return"#f5f7fa";case"demo":return"#ef4444";case"save":return"#34d399";case"assist":return"#c084fc";case"shot":return"#60a5fa";default:return"#d1d9e0"}}function XR(t){if(t.events.length>1)return`${t.events.length}`;const e=t.events[0];return e?e.shortLabel&&e.shortLabel.trim()!==""?e.shortLabel.slice(0,3).toUpperCase():e.kind.slice(0,1).toUpperCase():""}function qR(t){return t.events.map(e=>`${rf(e.time)} ${e.label??e.kind}`).join(`
`)}function l0(t){const e=new Map;for(const n of t){const i=n.frame!==void 0?`frame:${n.frame}`:`time:${n.time.toFixed(2)}`,a=e.get(i);if(a){a.events.push(n);continue}e.set(i,{key:i,time:n.time,events:[n]})}return[...e.values()].map(n=>({...n,events:[...n.events].sort((i,a)=>{const s=Om(a)-Om(i);return s!==0?s:i.time-a.time})})).sort((n,i)=>n.time-i.time)}function c0(t,e){return t?typeof t=="function"?t(e):t:[]}function YR(t,e){const n=[];for(const i of t){const a=c0(i.source,e);a.length!==0&&n.push({key:i.key,label:i.label,buckets:l0(a)})}return n}function KR(t,e){return t?typeof t=="function"?t(e):t:[]}function jR(t,e){const n=new Set,i=[];for(const a of t)for(const s of KR(a,e)){const r=s.id;if(r!==void 0){if(n.has(r))continue;n.add(r)}i.push(s)}return i}function ZR(t){const e=new Map;for(const n of t){const i=n.lane??"default",a=n.laneLabel??n.lane??"",s=e.get(i);if(s){s.ranges.push(n);continue}e.set(i,{key:i,label:a,ranges:[n]})}return[...e.values()].map(n=>({...n,ranges:[...n.ranges].sort((i,a)=>i.startTime-a.startTime)}))}function JR(t){return t.color?t.color:t.isTeamZero===!0?"#3b82f6":t.isTeamZero===!1?"#f59e0b":"#d1d9e0"}function QR(t,e){if(t.replayEvents)return c0(t.replayEvents,e);if(t.includeReplayEvents===!1)return[];const n=new Set(t.replayEventKinds??UR);return e.replay.timelineEvents.filter(i=>n.has(i.kind))}function eP(t,e){const n=e.player.projectReplayTimeToTimeline(Dp(t));if(!n.hiddenBySkip)return n.seekTime;const i=Math.min(e.player.getTimelineDuration(),n.timelineTime+VR);return e.player.projectTimelineTimeToReplay(i)}function Ko(t,e){return`${t/Math.max(e,1e-4)*100}%`}function tP(t,e,n){let i=t.timelineTime,a=e.timelineTime;return a<=i&&(t.hiddenBySkip||e.hiddenBySkip)&&(i>=n?(i=Math.max(0,n-Fm),a=n):a=Math.min(n,i+Fm)),{startTimelineTime:i,endTimelineTime:a}}function nP(t={}){const e=t.pauseWhileScrubbing??!0;let n=0;const i=t.events?[{key:"events:initial",label:t.eventsLabel??"Events",source:t.events}]:[],a=t.ranges?[t.ranges]:[];let s=null,r=null,o=null,l=null,c=null,u=null,d=null,f=null,p=null,_=null,g=null,m=null,h=!1,b="",S=!1,y=!1,C=null,M=[],T=[],A=null;const v=new Map,x=[],R=[],I=[];function U(){C&&(X(C),G({...C,state:C.player.getState()}))}function z(){C&&(V(C),G({...C,state:C.player.getState()}))}function G(q){if(!l||!c||!u||!d||!f||!p||!r)return;const de=q.player.getTimelineCurrentTime(),we=q.player.getTimelineDuration(),be=[we.toFixed(4),q.state.skipKickoffsEnabled?"1":"0",q.state.skipPostGoalTransitionsEnabled?"1":"0"].join(":");A!==be&&(X(q),V(q),A=be),l.min="0",l.max=`${we}`,l.step="0.01",l.value=`${Math.min(de,we)}`,c.dataset.playing=q.state.playing?"true":"false",c.setAttribute("aria-label",q.state.playing?"Pause replay":"Play replay"),c.title=q.state.playing?"Pause replay":"Play replay",u.textContent=q.state.playing?"||":">",d.textContent=q.state.playing?"Pause":"Play",f.textContent=rf(de),p.textContent=`-${rf(we-de)}`,r.dataset.scrubbing=S?"true":"false";for(const O of v.values()){const Y=de-O.timelineTime,ie=Y>=0&&Y<=BR;O.element.dataset.active=ie?"true":"false",O.element.dataset.passed=O.timelineTime<=de?"true":"false"}for(const O of x){const Y=Math.max(0,O.startTimelineTime),ie=Math.min(we,O.endTimelineTime);if(Math.max(0,ie-Y)<=1e-4){O.element.hidden=!0;continue}O.element.hidden=!1,O.element.dataset.active=de>=Y&&de<=ie?"true":"false"}const me=Ko(Math.min(de,we),we);for(const O of I)O.element.style.left=me;for(const O of R)O.element.style.left=me}function B(q,de,we){const be=q.events[0];if(!be)return null;const me=de.player.projectReplayTimeToTimeline(q.time),O=document.createElement("button");return O.type="button",O.className="sap-tl-marker",O.style.left=Ko(me.timelineTime,we),O.style.color=WR(be),O.title=qR(q),O.textContent=XR(q),O.addEventListener("click",()=>{de.player.seek(eP(be,de))}),O.dataset.active="false",O.dataset.passed="false",v.set(q.key,{element:O,timelineTime:me.timelineTime}),O}function X(q){if(!g||!_)return;g.replaceChildren(),_.replaceChildren(),v.clear(),I.splice(0,I.length);const de=QR(t,q);M=[],de.length>0&&M.push({key:"replay",label:t.replayEventsLabel??"Replay",buckets:l0(de)}),M.push(...YR(i,q));const we=Math.max(q.player.getTimelineDuration(),1e-4),be=M[0];if(be?.key==="replay")for(const O of be.buckets){const Y=B({...O,key:`${be.key}:${O.key}`},q,we);Y&&g.append(Y)}const me=M.filter(O=>O.key!=="replay");_.hidden=me.length===0;for(const O of me){const Y=document.createElement("div");Y.className="sap-tl-event-lane",Y.dataset.label=O.label;const ie=document.createElement("span");ie.className="sap-tl-event-lane-label",ie.textContent=O.label,ie.setAttribute("aria-label",O.label),Y.append(ie);const Se=document.createElement("div");Se.className="sap-tl-event-lane-track";const ye=document.createElement("div");ye.className="sap-tl-markers";for(const rt of O.buckets){const N=B({...rt,key:`${O.key}:${rt.key}`},q,we);N&&ye.append(N)}const Fe=document.createElement("div");Fe.className="sap-tl-event-playhead",Se.append(ye,Fe),I.push({element:Fe}),Y.append(Se),_.append(Y)}}function V(q){if(!o)return;o.replaceChildren(),x.splice(0,x.length),R.splice(0,R.length);const de=jR(a,q).filter(be=>Number.isFinite(be.startTime)&&Number.isFinite(be.endTime)&&be.endTime>be.startTime);T=ZR(de);const we=Math.max(q.player.getTimelineDuration(),1e-4);if(T.length===0){o.hidden=!0;return}o.hidden=!1;for(const be of T){const me=document.createElement("div");me.className="sap-tl-range-lane";const O=document.createElement("div");if(O.className="sap-tl-range-lane-track",be.label){me.dataset.label=be.label;const ie=document.createElement("span");ie.className="sap-tl-range-lane-label",ie.textContent=be.label,ie.setAttribute("aria-label",be.label),me.append(ie)}for(const ie of be.ranges){const Se=q.player.projectReplayTimeToTimeline(ie.startTime),ye=q.player.projectReplayTimeToTimeline(ie.endTime),{startTimelineTime:Fe,endTimelineTime:rt}=tP(Se,ye,we),N=document.createElement("div");N.className="sap-tl-range-segment",ie.className&&N.classList.add(ie.className),N.style.background=JR(ie),N.title=ie.label??be.label,N.dataset.active="false",N.style.left=Ko(Fe,we),N.style.width=Ko(Math.max(0,rt-Fe),we),O.append(N),x.push({range:ie,element:N,startTimelineTime:Fe,endTimelineTime:rt})}const Y=document.createElement("div");Y.className="sap-tl-range-playhead",O.append(Y),R.push({element:Y}),me.append(O),o.append(me)}}function ee(){S&&(S=!1,r?.setAttribute("data-scrubbing","false"),y&&C?.player.play(),y=!1)}function pe(){if(S||(S=!0,r?.setAttribute("data-scrubbing","true"),!e))return;const q=C?.player;q&&(y=q.getState().playing,y&&q.pause())}return{id:"timeline-overlay",addEventSource(q,de={}){return i.push({key:de.id??`events:${n++}`,label:de.label??"Events",source:q}),U(),()=>{this.removeEventSource(q)}},removeEventSource(q){const de=i.findIndex(we=>we.source===q);return de<0?!1:(i.splice(de,1),U(),!0)},refreshEvents(){U()},addRangeSource(q){return a.push(q),z(),()=>{this.removeRangeSource(q)}},removeRangeSource(q){const de=a.indexOf(q);return de<0?!1:(a.splice(de,1),z(),!0)},refreshRanges(){z()},setup(q){C=q,GR(),getComputedStyle(q.container).position==="static"&&(h=!0,b=q.container.style.position,q.container.style.position="relative"),s=document.createElement("div"),s.className="sap-tl-root",r=document.createElement("div"),r.className="sap-tl-shell",r.dataset.scrubbing="false";const de=document.createElement("div");de.className="sap-tl-topline";const we=document.createElement("div");we.className="sap-tl-primary",c=document.createElement("button"),c.type="button",c.className="sap-tl-toggle sap-tl-track-toggle",u=document.createElement("span"),u.className="sap-tl-toggle-icon",u.setAttribute("aria-hidden","true"),u.textContent=">",d=document.createElement("span"),d.className="sap-tl-toggle-label",d.textContent="Play",c.append(u,d),c.addEventListener("click",()=>{q.player.togglePlayback()}),f=document.createElement("span"),f.className="sap-tl-current",f.textContent="0:00.00",p=document.createElement("span"),p.className="sap-tl-remaining",p.textContent="-0:00.00",we.append(f),de.append(we,p);const be=document.createElement("div");be.className="sap-tl-track-wrap",o=document.createElement("div"),o.className="sap-tl-ranges",o.hidden=!0,_=document.createElement("div"),_.className="sap-tl-event-lanes",_.hidden=!0;const me=document.createElement("div");me.className="sap-tl-track-rail";const O=document.createElement("div");O.className="sap-tl-main-rail",g=document.createElement("div"),g.className="sap-tl-markers",l=document.createElement("input"),l.className="sap-tl-range",l.type="range",l.min="0",l.max=`${q.replay.duration}`,l.step="0.01",l.value="0";const Y=()=>{pe()},ie=()=>{l&&q.player.seek(q.player.projectTimelineTimeToReplay(Number(l.value)))},Se=()=>{ee()};l.addEventListener("pointerdown",Y),l.addEventListener("input",ie),l.addEventListener("change",Se),window.addEventListener("pointerup",Se),window.addEventListener("pointercancel",Se),m=()=>{l?.removeEventListener("pointerdown",Y),l?.removeEventListener("input",ie),l?.removeEventListener("change",Se),window.removeEventListener("pointerup",Se),window.removeEventListener("pointercancel",Se)},me.append(O,g,l),be.append(o,_,c,me),r.append(de,be),s.append(r),q.container.append(s),X(q),V(q),G({...q,state:q.player.getState()})},onStateChange(q){C=q,G(q)},teardown(q){m?.(),m=null,ee(),s?.remove(),s=null,r=null,o=null,_=null,l=null,c=null,u=null,d=null,f=null,p=null,g=null,C=null,M=[],T=[],A=null,v.clear(),x.splice(0,x.length),R.splice(0,R.length),I.splice(0,I.length),h&&(q.container.style.position=b,h=!1)}}}function iP(t){return`
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
                value="${t}"
                disabled
              />
            </label>
            <strong id="camera-distance-readout" class="metric-readout">
              ${t.toFixed(2)}x
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
            <div id="mechanics-timeline-window-body" class="mechanics-timeline-window-body"></div>
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
`}const kp=["timeline","core_player","core_team","possession","pressure","territorial_pressure","movement","positioning","rotation_player","rotation_team","mechanics","goal_context","backboard","ceiling_shot","wall_aerial","wall_aerial_shot","center","flick","musty_flick","dodge_reset","double_tap","fifty_fifty","one_timer","pass","pass_last_completed","ball_carry","goal_tags","rush","speed_flip","half_flip","half_volley","wavedash","whiff","powerslide","touch","touch_ball_movement","touch_last_touch","boost_pickups","boost_ledger","boost_state","bump"],u0=["air_dribble","ball_carry","ceiling_shot","center","double_tap","flick","flip_reset","half_flip","half_volley","musty_flick","one_timer","pass","speed_flip","wall_aerial","wall_aerial_shot","wavedash"],d0=[...new Set([...kp,...u0])],aP=new Set(kp),sP=new Set(u0);function vs(){return Object.fromEntries(d0.map(t=>[t,0]))}function ku(t){return{...t??vs()}}function jo(t,e){t[e]+=1}function rP(t){return d0.includes(t)}function f0(t){if(t==null)return null;if(!t||typeof t!="object")return String(t);const[e,n]=Object.entries(t)[0]??["Unknown","unknown"];return`${e}:${typeof n=="string"?n:JSON.stringify(n)}`}function of(t){return f0(t.player??t.player_id??t.scorer)}function oP(t){const e=t.is_team_0??t.scoring_team_is_team_0;return typeof e=="boolean"?e:null}function lP(t){const e=t.kind;return typeof e!="string"||!sP.has(e)||aP.has(e)||!rP(e)?null:e}function lf(t){const e=t.timing,n=t.resolved_frame??t.frame??(e&&typeof e=="object"&&"frame"in e?e.frame:void 0)??(e&&typeof e=="object"&&"end_frame"in e?e.end_frame:void 0);return typeof n=="number"&&Number.isFinite(n)?n:null}function cf(t){const e=t.timing,n=t.resolved_time??t.time??(e&&typeof e=="object"&&"time"in e?e.time:void 0)??(e&&typeof e=="object"&&"end_time"in e?e.end_time:void 0);return typeof n=="number"&&Number.isFinite(n)?n:null}function cP(t,e){const n=lf(t);if(n!==null)return n<=e.frame_number;const i=cf(t);return i!==null&&i<=e.time}function uP(t){return[...t].filter(e=>!!e&&typeof e=="object").sort((e,n)=>{const i=lf(e),a=lf(n);if(i!==a)return(i??Number.POSITIVE_INFINITY)-(a??Number.POSITIVE_INFINITY);const s=cf(e),r=cf(n);return s!==r?(s??Number.POSITIVE_INFINITY)-(r??Number.POSITIVE_INFINITY):(of(e)??"").localeCompare(of(n)??"")})}function p0(t){const e=h0(t);for(const n of t.frames)e.applyFrame(n);return t}function h0(t){const e=kp.map(a=>({eventType:a,events:uP(t.events[a]??[]),index:0})),n=new Map,i={teamZero:vs(),teamOne:vs()};return{applyFrame(a){for(const s of e)for(;s.index<s.events.length&&cP(s.events[s.index],a);){const r=s.events[s.index],o=of(r),l=s.eventType==="mechanics"?lP(r):null;if(o!==null){const u=n.get(o)??vs();n.set(o,u),jo(u,s.eventType),l!==null&&jo(u,l)}const c=oP(r);if(c!==null){const u=c?i.teamZero:i.teamOne;jo(u,s.eventType),l!==null&&jo(u,l)}s.index+=1}for(const s of a.players){const r=f0(s.player_id);s.event_counts=ku(r===null?void 0:n.get(r))}a.team_zero.event_counts=ku(i.teamZero),a.team_one.event_counts=ku(i.teamOne)}}}function Um(t){if(!t||typeof t!="object")return String(t);const[e,n]=Object.entries(t)[0]??["Unknown","unknown"];return`${e}:${typeof n=="string"?n:JSON.stringify(n)}`}function m0(){return{count:0,is_last_backboard:!1,last_backboard_time:null,last_backboard_frame:null,time_since_last_backboard:null,frames_since_last_backboard:null}}function dP(t){return t.map((e,n)=>({event:e,index:n})).sort((e,n)=>e.event.frame!==n.event.frame?e.event.frame-n.event.frame:e.event.time!==n.event.time?e.event.time-n.event.time:e.index-n.index).map(({event:e})=>e)}function fP(t,e,n,i){t.is_last_backboard=i,t.time_since_last_backboard=t.last_backboard_time==null?null:Math.max(0,n-t.last_backboard_time),t.frames_since_last_backboard=t.last_backboard_frame==null?null:Math.max(0,e-t.last_backboard_frame)}function pP(t,e,n,i){t.count+=1,t.last_backboard_time=e.time,t.last_backboard_frame=e.frame,t.time_since_last_backboard=Math.max(0,i-e.time),t.frames_since_last_backboard=Math.max(0,n-e.frame)}function hP(t,e){Object.assign(t,e??m0())}function Bm(t,e){t.count=e}function mP(t){const e=_0(t);for(const n of t.frames)e.applyFrame(n);return t}function _0(t){const e=dP(t.events.backboard??[]);let n=0,i=0,a=0,s=null;const r=new Map;return{applyFrame(o){for(const[c,u]of r)fP(u,o.frame_number,o.time,c===s);let l=!1;for(;n<e.length&&e[n].frame<=o.frame_number;){const c=e[n],u=Um(c.player),d=r.get(u)??m0();r.set(u,d),pP(d,c,o.frame_number,o.time),c.is_team_0?i+=1:a+=1,s=u,l=!0,n+=1}if(l)for(const c of r.values())c.is_last_backboard=!1;if(s!=null){const c=r.get(s);c&&(c.is_last_backboard=!0)}Bm(o.team_zero.backboard,i),Bm(o.team_one.backboard,a);for(const c of o.players)hP(c.backboard,r.get(Um(c.player_id)))}}}function zm(t){if(!t||typeof t!="object")return String(t);const[e,n]=Object.entries(t)[0]??["Unknown","unknown"];return`${e}:${typeof n=="string"?n:JSON.stringify(n)}`}function Ml(){return{carry_count:0,total_carry_time:0,total_straight_line_distance:0,total_path_distance:0,longest_carry_time:0,furthest_carry_distance:0,fastest_carry_speed:0,carry_speed_sum:0,average_horizontal_gap_sum:0,average_vertical_gap_sum:0}}function Tl(){return{count:0,ground_to_air_count:0,wall_to_air_count:0,total_touch_count:0,max_touch_count:0,total_time:0,total_straight_line_distance:0,total_path_distance:0,longest_time:0,furthest_distance:0,fastest_speed:0,speed_sum:0,average_horizontal_gap_sum:0,average_vertical_gap_sum:0}}function _P(t){return t.map((e,n)=>({event:e,index:n})).sort((e,n)=>e.event.end_frame!==n.event.end_frame?e.event.end_frame-n.event.end_frame:e.event.end_time!==n.event.end_time?e.event.end_time-n.event.end_time:e.index-n.index).map(({event:e})=>e)}function uf(t){return`${t.key}\0${t.value}`}function Zo(t){return t.map(uf).join("")}function g0(t,e){e.sort((a,s)=>uf(a).localeCompare(uf(s)));const n=t.labeled_event_counts??={entries:[]},i=n.entries.find(a=>Zo(a.labels)===Zo(e));i?i.count+=1:(n.entries.push({labels:[...e],count:1}),n.entries.sort((a,s)=>Zo(a.labels).localeCompare(Zo(s.labels))))}function Hm(t,e){return t.labeled_event_counts?.entries.filter(n=>n.labels.some(i=>i.key==="origin"&&i.value===e)).reduce((n,i)=>n+i.count,0)??0}function v0(t){return t.labeled_event_counts?.entries.reduce((e,n)=>e+n.count,0)??0}function y0(t){return{entries:t.entries.map(e=>({labels:e.labels.map(n=>({...n})),count:e.count}))}}function Vm(t,e){g0(t,[{key:"kind",value:"carry"}]),t.carry_count=v0(t),t.total_carry_time+=e.duration,t.total_straight_line_distance+=e.straight_line_distance,t.total_path_distance+=e.path_distance,t.longest_carry_time=Math.max(t.longest_carry_time,e.duration),t.furthest_carry_distance=Math.max(t.furthest_carry_distance,e.straight_line_distance),t.fastest_carry_speed=Math.max(t.fastest_carry_speed,e.average_speed),t.carry_speed_sum+=e.average_speed,t.average_horizontal_gap_sum+=e.average_horizontal_gap,t.average_vertical_gap_sum+=e.average_vertical_gap}function Gm(t,e){e.air_dribble_origin!=null&&g0(t,[{key:"origin",value:e.air_dribble_origin}]),t.count=v0(t),t.ground_to_air_count=Hm(t,"ground_to_air"),t.wall_to_air_count=Hm(t,"wall_to_air"),t.total_time+=e.duration,t.total_straight_line_distance+=e.straight_line_distance,t.total_path_distance+=e.path_distance,t.longest_time=Math.max(t.longest_time,e.duration),t.furthest_distance=Math.max(t.furthest_distance,e.straight_line_distance),t.fastest_speed=Math.max(t.fastest_speed,e.average_speed),t.speed_sum+=e.average_speed,t.average_horizontal_gap_sum+=e.average_horizontal_gap,t.average_vertical_gap_sum+=e.average_vertical_gap,t.total_touch_count+=e.touch_count,t.max_touch_count=Math.max(t.max_touch_count,e.touch_count)}function Fu(t,e){Object.assign(t,e??Ml()),e?.labeled_event_counts?t.labeled_event_counts=y0(e.labeled_event_counts):delete t.labeled_event_counts}function Ou(t,e){Object.assign(t,e??Tl()),e?.labeled_event_counts?t.labeled_event_counts=y0(e.labeled_event_counts):delete t.labeled_event_counts}function gP(t){const e=b0(t);for(const n of t.frames)e.applyFrame(n);return t}function b0(t){const e=_P(t.events.ball_carry??[]);let n=0;const i=new Map,a=new Map,s=Ml(),r=Ml(),o=Tl(),l=Tl();return{applyFrame(c){for(;n<e.length&&e[n].end_frame<c.frame_number;){const u=e[n],d=zm(u.player_id);if(u.kind==="carry"){const f=i.get(d)??Ml();i.set(d,f),Vm(f,u),Vm(u.is_team_0?s:r,u)}else{const f=a.get(d)??Tl();a.set(d,f),Gm(f,u),Gm(u.is_team_0?o:l,u)}n+=1}Fu(c.team_zero.ball_carry,s),Fu(c.team_one.ball_carry,r),Ou(c.team_zero.air_dribble,o),Ou(c.team_one.air_dribble,l);for(const u of c.players){const d=zm(u.player_id);Fu(u.ball_carry,i.get(d)),Ou(u.air_dribble,a.get(d))}}}}function Uu(t){if(!t||typeof t!="object")return String(t);const[e,n]=Object.entries(t)[0]??["Unknown","unknown"];return`${e}:${typeof n=="string"?n:JSON.stringify(n)}`}function df(){return{bumps_inflicted:0,bumps_taken:0,team_bumps_inflicted:0,team_bumps_taken:0,last_bump_time:null,last_bump_frame:null,last_bump_strength:null,max_bump_strength:0,cumulative_bump_strength:0}}function $m(){return{bumps_inflicted:0,team_bumps_inflicted:0}}function vP(t){return t.map((e,n)=>({event:e,index:n})).sort((e,n)=>e.event.frame!==n.event.frame?e.event.frame-n.event.frame:e.event.time!==n.event.time?e.event.time-n.event.time:e.index-n.index).map(({event:e})=>e)}function yP(t,e){t.bumps_inflicted+=1,e.is_team_bump&&(t.team_bumps_inflicted+=1),t.last_bump_time=e.time,t.last_bump_frame=e.frame,t.last_bump_strength=e.strength,t.max_bump_strength=Math.max(t.max_bump_strength,e.strength),t.cumulative_bump_strength+=e.strength}function bP(t,e){t.bumps_taken+=1,e.is_team_bump&&(t.team_bumps_taken+=1)}function xP(t,e){t.bumps_inflicted+=1,e.is_team_bump&&(t.team_bumps_inflicted+=1)}function SP(t,e){Object.assign(t,e??df())}function Wm(t,e){Object.assign(t,e)}function wP(t){const e=x0(t);for(const n of t.frames)e.applyFrame(n);return t}function x0(t){const e=vP(t.events.bump??[]);let n=0;const i=new Map,a=$m(),s=$m();return{applyFrame(r){for(;n<e.length&&e[n].frame<=r.frame_number;){const o=e[n],l=Uu(o.initiator),c=i.get(l)??df();i.set(l,c),yP(c,o);const u=Uu(o.victim),d=i.get(u)??df();i.set(u,d),bP(d,o),xP(o.initiator_is_team_0?a:s,o),n+=1}Wm(r.team_zero.bump,a),Wm(r.team_one.bump,s);for(const o of r.players)SP(o.bump,i.get(Uu(o.player_id)))}}}const Ql=255,EP=1,MP=Ql-1,TP=11920928955078125e-23,AP=["tracked_time","boost_integral","time_zero_boost","time_hundred_boost","time_boost_0_25","time_boost_25_50","time_boost_50_75","time_boost_75_100"],CP=["amount_collected","amount_collected_inactive","big_pads_collected_inactive","small_pads_collected_inactive","amount_stolen","big_pads_collected","small_pads_collected","big_pads_stolen","small_pads_stolen","amount_collected_big","amount_stolen_big","amount_collected_small","amount_stolen_small","amount_respawned","overfill_total","overfill_from_stolen","amount_used","amount_used_while_grounded","amount_used_while_airborne","amount_used_while_supersonic"],RP=[...AP,...CP];function Nt(t){return Math.fround(t)}function vt(t,e){return Nt(Nt(t)+Nt(e))}function Jo(t,e){return Nt(Nt(t)-Nt(e))}function vi(t,e){return Nt(Nt(t)*Nt(e))}function ff(t,e){return Nt(Nt(t)/Nt(e))}function S0(){return{tracked_time:0,boost_integral:0,time_zero_boost:0,time_hundred_boost:0,time_boost_0_25:0,time_boost_25_50:0,time_boost_50_75:0,time_boost_75_100:0,amount_collected:0,amount_collected_inactive:0,big_pads_collected_inactive:0,small_pads_collected_inactive:0,amount_stolen:0,big_pads_collected:0,small_pads_collected:0,big_pads_stolen:0,small_pads_stolen:0,amount_collected_big:0,amount_stolen_big:0,amount_collected_small:0,amount_stolen_small:0,amount_respawned:0,overfill_total:0,overfill_from_stolen:0,amount_used:0,amount_used_while_grounded:0,amount_used_while_airborne:0,amount_used_while_supersonic:0}}const PP=S0();function Qo(){return{stats:S0(),countedPickupKeys:new Set,currentBoostAmount:null,currentBoostBefore:null,currentBoostFrame:null,previousBoostAmount:null,labeledAmountsVersion:0,labeledAmountsSnapshot:void 0,labeledAmountsSnapshotVersion:-1,labeledCountsVersion:0,labeledCountsSnapshot:void 0,labeledCountsSnapshotVersion:-1}}function Vi(t){const[e,n]=Object.entries(t)[0]??["Unknown","unknown"];return`${e}:${typeof n=="string"?n:JSON.stringify(n)}`}function yi(t,e){return t.labels?.find(n=>n.key===e)?.value??null}function w0(t){return[...t??[]].sort((e,n)=>e.key===n.key?e.value.localeCompare(n.value):e.key.localeCompare(n.key))}function ec(t){return JSON.stringify(w0(t))}function E0(t){return w0(t).map(e=>({...e}))}function LP(t,e){const n=Nt(e.amount);if(n<=0)return!1;const i=(t.labeled_amounts??={entries:[]}).entries,a=ec(e.labels),s=i.find(r=>ec(r.labels)===a);return s?(s.value=vt(s.value,n),!0):(i.push({labels:E0(e.labels),value:n}),i.sort((r,o)=>JSON.stringify(r.labels).localeCompare(JSON.stringify(o.labels))),!0)}function NP(t,e,n){if(n<=0)return!1;const i=(t.labeled_counts??={entries:[]}).entries,a=ec(e.labels),s=i.find(r=>ec(r.labels)===a);return s?(s.count+=n,!0):(i.push({labels:E0(e.labels),count:n}),i.sort((r,o)=>JSON.stringify(r.labels).localeCompare(JSON.stringify(o.labels))),!0)}function as(t){return ff(vi(t,Ql),100)}function ss(t,e,n,i){const a=Jo(e,t);if(Math.abs(a)<=TP)return t>=n&&t<i?1:0;const s=ff(Jo(n,t),a),r=ff(Jo(i,t),a),o=Math.max(Math.min(s,r),0),l=Math.min(Math.max(s,r),1);return Math.max(Jo(l,o),0)}function IP(t,e){t.currentBoostAmount=Nt(e.boost_amount),t.currentBoostBefore=e.boost_before==null?null:Nt(e.boost_before),t.currentBoostFrame=e.frame}function M0(t,e,n,i){const a=Nt(e),s=Nt(n),r=Nt(i),o=vi(vt(a,s),.5);t.tracked_time=vt(t.tracked_time,r),t.boost_integral=vt(t.boost_integral,vi(o,r)),t.time_zero_boost=vt(t.time_zero_boost,vi(r,ss(a,s,0,EP))),t.time_hundred_boost=vt(t.time_hundred_boost,vi(r,ss(a,s,MP,Ql+1))),t.time_boost_0_25=vt(t.time_boost_0_25,vi(r,ss(a,s,0,as(25)))),t.time_boost_25_50=vt(t.time_boost_25_50,vi(r,ss(a,s,as(25),as(50)))),t.time_boost_50_75=vt(t.time_boost_50_75,vi(r,ss(a,s,as(50),as(75)))),t.time_boost_75_100=vt(t.time_boost_75_100,vi(r,ss(a,s,as(75),Ql+1)))}function DP(t,e,n){if(t.currentBoostFrame!==n)return null;const i=t.currentBoostAmount;if(i==null)return null;const a=t.currentBoostBefore??i;return M0(t.stats,a,i,e),t.previousBoostAmount=i,[a,i]}function Xm(t,e){if(e.count<=0)return;const n=yi(e,"pad_size");if(n!=="big"&&n!=="small")return;const i=yi(e,"activity")??"unknown",a=yi(e,"field_half")??"unknown",s=`${e.frame}:${Vi(e.player_id)}:${n}:${i}:${a}`;if(!t.countedPickupKeys.has(s)){if(t.countedPickupKeys.add(s),i==="inactive"){n==="big"?t.stats.big_pads_collected_inactive+=1:t.stats.small_pads_collected_inactive+=1;return}n==="big"?t.stats.big_pads_collected+=1:t.stats.small_pads_collected+=1}}function qm(t,e){const n=Nt(Number.isFinite(e.amount)?e.amount:0);e.transaction!=="used"&&LP(t.stats,e)&&(t.labeledAmountsVersion+=1),e.transaction==="collected"&&NP(t.stats,e,Math.max(e.count,1))&&(t.labeledCountsVersion+=1);const i=yi(e,"pad_size"),a=yi(e,"activity")??"active",s=yi(e,"field_half");switch(e.transaction){case"collected":if(Xm(t,e),a==="inactive"){t.stats.amount_collected_inactive=vt(t.stats.amount_collected_inactive,n);break}t.stats.amount_collected=vt(t.stats.amount_collected,n),i==="big"?t.stats.amount_collected_big=vt(t.stats.amount_collected_big,n):i==="small"&&(t.stats.amount_collected_small=vt(t.stats.amount_collected_small,n));break;case"stolen":t.stats.amount_stolen=vt(t.stats.amount_stolen,n),i==="big"?(t.stats.big_pads_stolen+=1,t.stats.amount_stolen_big=vt(t.stats.amount_stolen_big,n)):i==="small"&&(t.stats.small_pads_stolen+=1,t.stats.amount_stolen_small=vt(t.stats.amount_stolen_small,n));break;case"overfill":t.stats.overfill_total=vt(t.stats.overfill_total,n),s==="opponent"&&(t.stats.overfill_from_stolen=vt(t.stats.overfill_from_stolen,n)),Xm(t,e);break;case"respawn":t.stats.amount_respawned=vt(t.stats.amount_respawned,n);break;case"used":t.stats.amount_used=vt(t.stats.amount_used,n);break;case"used_allocation":yi(e,"vertical_state")==="grounded"?t.stats.amount_used_while_grounded=vt(t.stats.amount_used_while_grounded,n):yi(e,"vertical_state")==="aerial"&&(t.stats.amount_used_while_airborne=vt(t.stats.amount_used_while_airborne,n)),yi(e,"supersonic")==="true"&&(t.stats.amount_used_while_supersonic=vt(t.stats.amount_used_while_supersonic,n));break}}function kP(t){return t.labeledAmountsSnapshotVersion!==t.labeledAmountsVersion&&(t.labeledAmountsSnapshot=t.stats.labeled_amounts&&t.stats.labeled_amounts.entries.length>0?{entries:t.stats.labeled_amounts.entries.map(e=>({labels:e.labels.map(n=>({...n})),value:e.value}))}:void 0,t.labeledAmountsSnapshotVersion=t.labeledAmountsVersion),t.labeledAmountsSnapshot}function FP(t){return t.labeledCountsSnapshotVersion!==t.labeledCountsVersion&&(t.labeledCountsSnapshot=t.stats.labeled_counts&&t.stats.labeled_counts.entries.length>0?{entries:t.stats.labeled_counts.entries.map(e=>({labels:e.labels.map(n=>({...n})),count:e.count}))}:void 0,t.labeledCountsSnapshotVersion=t.labeledCountsVersion),t.labeledCountsSnapshot}function Bu(t,e){const n=e?.stats??PP;for(const s of RP)t[s]=n[s];const i=e?kP(e):void 0;i?t.labeled_amounts=i:delete t.labeled_amounts;const a=e?FP(e):void 0;a?t.labeled_counts=a:delete t.labeled_counts}function OP(t){return[...t.events.boost_ledger??[]].sort((e,n)=>e.frame!==n.frame?e.frame-n.frame:e.time!==n.time?e.time-n.time:Vi(e.player_id).localeCompare(Vi(n.player_id)))}function UP(t){return[...t.events.boost_state??[]].sort((e,n)=>e.frame!==n.frame?e.frame-n.frame:e.time!==n.time?e.time-n.time:Vi(e.player_id).localeCompare(Vi(n.player_id)))}function BP(t){const e=T0(t);for(const n of t.frames)e.applyFrame(n);return t}function T0(t){const e=OP(t),n=UP(t);let i=0,a=0;const s=new Map,r=Qo(),o=Qo();return{applyFrame(l){const c=[];for(;a<n.length&&n[a].frame<=l.frame_number;){const u=n[a],d=Vi(u.player_id);let f=s.get(d);f||(f=Qo(),s.set(d,f)),IP(f,u),u.frame===l.frame_number&&c.push({key:d,isTeamZero:u.is_team_0}),a+=1}for(;i<e.length&&e[i].frame<=l.frame_number;){const u=e[i],d=Vi(u.player_id);let f=s.get(d);f||(f=Qo(),s.set(d,f)),qm(f,u),qm(u.is_team_0?r:o,u),i+=1}for(const u of c){const d=s.get(u.key);if(!d)continue;const f=DP(d,l.dt,l.frame_number);f&&M0(u.isTeamZero?r.stats:o.stats,f[0],f[1],l.dt)}Bu(l.team_zero.boost,r),Bu(l.team_one.boost,o);for(const u of l.players){const d=s.get(Vi(u.player_id));Bu(u.boost,d)}}}}const zP=.78;function ys(t){return Math.fround(t)}function HP(t,e){return ys(ys(t)+ys(e))}function A0(t,e){return ys(ys(t)-ys(e))}function Ym(t){if(!t||typeof t!="object")return String(t);const[e,n]=Object.entries(t)[0]??["Unknown","unknown"];return`${e}:${typeof n=="string"?n:JSON.stringify(n)}`}function C0(){return{count:0,high_confidence_count:0,is_last_ceiling_shot:!1,last_ceiling_shot_time:null,last_ceiling_shot_frame:null,time_since_last_ceiling_shot:null,frames_since_last_ceiling_shot:null,last_confidence:null,best_confidence:0,cumulative_confidence:0}}function VP(t){return t.map((e,n)=>({event:e,index:n})).sort((e,n)=>e.event.frame!==n.event.frame?e.event.frame-n.event.frame:e.event.time!==n.event.time?e.event.time-n.event.time:e.index-n.index).map(({event:e})=>e)}function pf(t){return`${t.key}\0${t.value}`}function el(t){return t.map(pf).join("")}function GP(t,e){e.sort((a,s)=>pf(a).localeCompare(pf(s)));const n=t.labeled_event_counts??={entries:[]},i=n.entries.find(a=>el(a.labels)===el(e));i?i.count+=1:(n.entries.push({labels:[...e],count:1}),n.entries.sort((a,s)=>el(a.labels).localeCompare(el(s.labels))))}function $P(t,e){return t.labeled_event_counts?.entries.filter(n=>n.labels.some(i=>i.key==="confidence_band"&&i.value===e)).reduce((n,i)=>n+i.count,0)??0}function WP(t){return t.labeled_event_counts?.entries.reduce((e,n)=>e+n.count,0)??0}function XP(t){return{entries:t.entries.map(e=>({labels:e.labels.map(n=>({...n})),count:e.count}))}}function qP(t,e,n,i){t.is_last_ceiling_shot=i,t.time_since_last_ceiling_shot=t.last_ceiling_shot_time==null?null:Math.max(0,A0(n,t.last_ceiling_shot_time)),t.frames_since_last_ceiling_shot=t.last_ceiling_shot_frame==null?null:Math.max(0,e-t.last_ceiling_shot_frame)}function YP(t,e,n,i){GP(t,[{key:"confidence_band",value:e.confidence>=zP?"high":"standard"}]),t.count=WP(t),t.high_confidence_count=$P(t,"high"),t.is_last_ceiling_shot=!0,t.last_ceiling_shot_time=e.time,t.last_ceiling_shot_frame=e.frame,t.time_since_last_ceiling_shot=Math.max(0,A0(i,e.time)),t.frames_since_last_ceiling_shot=Math.max(0,n-e.frame),t.last_confidence=e.confidence,t.best_confidence=Math.max(t.best_confidence,e.confidence),t.cumulative_confidence=HP(t.cumulative_confidence,e.confidence)}function KP(t,e){Object.assign(t,e??C0()),e?.labeled_event_counts?t.labeled_event_counts=XP(e.labeled_event_counts):delete t.labeled_event_counts}function jP(t){const e=R0(t);for(const n of t.frames)e.applyFrame(n);return t}function R0(t){const e=VP(t.events.ceiling_shot??[]);let n=0,i=null;const a=new Map;return{applyFrame(s){if(s.is_live_play){for(const[r,o]of a)qP(o,s.frame_number,s.time,i===r);for(;n<e.length&&e[n].frame<=s.frame_number;){const r=e[n],o=Ym(r.player),l=a.get(o)??C0();a.set(o,l),YP(l,r,s.frame_number,s.time),i=o,n+=1}}else i=null;for(const r of s.players)KP(r.ceiling_shot,a.get(Ym(r.player_id)))}}}function Km(t){if(!t||typeof t!="object")return String(t);const[e,n]=Object.entries(t)[0]??["Unknown","unknown"];return`${e}:${typeof n=="string"?n:JSON.stringify(n)}`}function Xn(t,e){return Math.fround(Math.fround(t)+Math.fround(e))}function hf(){return{score:0,goals:0,assists:0,saves:0,shots:0,kickoff_goal_count:0,short_goal_count:0,medium_goal_count:0,long_goal_count:0,counter_attack_goal_count:0,sustained_pressure_goal_count:0,other_buildup_goal_count:0,goal_ball_air_time_sample_count:0,cumulative_goal_ball_air_time:0,last_goal_ball_air_time:null}}function P0(){return{...hf(),goals_conceded_while_last_defender:0,goals_for_while_most_back:0,goals_against_while_most_back:0,goal_against_boost_sample_count:0,cumulative_boost_on_goals_against:0,last_boost_on_goal_against:null,goal_against_boost_leadup_sample_count:0,cumulative_average_boost_in_goal_against_leadup:0,cumulative_min_boost_in_goal_against_leadup:0,last_average_boost_in_goal_against_leadup:null,last_min_boost_in_goal_against_leadup:null,goal_against_position_sample_count:0,cumulative_goal_against_position_x:0,cumulative_goal_against_position_y:0,cumulative_goal_against_position_z:0,last_goal_against_position:null,scoring_goal_last_touch_position_sample_count:0,cumulative_scoring_goal_last_touch_position_x:0,cumulative_scoring_goal_last_touch_position_y:0,cumulative_scoring_goal_last_touch_position_z:0,last_scoring_goal_last_touch_position:null}}function jm(t){return t.map((e,n)=>({event:e,index:n})).sort((e,n)=>e.event.frame!==n.event.frame?e.event.frame-n.event.frame:e.event.time!==n.event.time?e.event.time-n.event.time:e.index-n.index).map(({event:e})=>e)}function ZP(t,e){Object.assign(t,e??P0())}function Zm(t,e){Object.assign(t,e)}function Jm(t,e){return e==null?t:{...e}}function mf(t,e){t.score+=e.score,t.goals+=e.goals,t.assists+=e.assists,t.saves+=e.saves,t.shots+=e.shots,t.kickoff_goal_count+=e.kickoff_goal_count,t.short_goal_count+=e.short_goal_count,t.medium_goal_count+=e.medium_goal_count,t.long_goal_count+=e.long_goal_count,t.counter_attack_goal_count+=e.counter_attack_goal_count,t.sustained_pressure_goal_count+=e.sustained_pressure_goal_count,t.other_buildup_goal_count+=e.other_buildup_goal_count,t.goal_ball_air_time_sample_count+=e.goal_ball_air_time_sample_count,t.cumulative_goal_ball_air_time=Xn(t.cumulative_goal_ball_air_time,e.cumulative_goal_ball_air_time),e.last_goal_ball_air_time!=null&&(t.last_goal_ball_air_time=e.last_goal_ball_air_time)}function JP(t,e){mf(t,e),t.goals_conceded_while_last_defender+=e.goals_conceded_while_last_defender,t.goals_for_while_most_back+=e.goals_for_while_most_back,t.goals_against_while_most_back+=e.goals_against_while_most_back,t.goal_against_boost_sample_count+=e.goal_against_boost_sample_count,t.cumulative_boost_on_goals_against=Xn(t.cumulative_boost_on_goals_against,e.cumulative_boost_on_goals_against),e.last_boost_on_goal_against!=null&&(t.last_boost_on_goal_against=e.last_boost_on_goal_against),t.goal_against_boost_leadup_sample_count+=e.goal_against_boost_leadup_sample_count,t.cumulative_average_boost_in_goal_against_leadup=Xn(t.cumulative_average_boost_in_goal_against_leadup,e.cumulative_average_boost_in_goal_against_leadup),t.cumulative_min_boost_in_goal_against_leadup=Xn(t.cumulative_min_boost_in_goal_against_leadup,e.cumulative_min_boost_in_goal_against_leadup),e.last_average_boost_in_goal_against_leadup!=null&&(t.last_average_boost_in_goal_against_leadup=e.last_average_boost_in_goal_against_leadup),e.last_min_boost_in_goal_against_leadup!=null&&(t.last_min_boost_in_goal_against_leadup=e.last_min_boost_in_goal_against_leadup),t.goal_against_position_sample_count+=e.goal_against_position_sample_count,t.cumulative_goal_against_position_x=Xn(t.cumulative_goal_against_position_x,e.cumulative_goal_against_position_x),t.cumulative_goal_against_position_y=Xn(t.cumulative_goal_against_position_y,e.cumulative_goal_against_position_y),t.cumulative_goal_against_position_z=Xn(t.cumulative_goal_against_position_z,e.cumulative_goal_against_position_z),t.last_goal_against_position=Jm(t.last_goal_against_position,e.last_goal_against_position),t.scoring_goal_last_touch_position_sample_count+=e.scoring_goal_last_touch_position_sample_count,t.cumulative_scoring_goal_last_touch_position_x=Xn(t.cumulative_scoring_goal_last_touch_position_x,e.cumulative_scoring_goal_last_touch_position_x),t.cumulative_scoring_goal_last_touch_position_y=Xn(t.cumulative_scoring_goal_last_touch_position_y,e.cumulative_scoring_goal_last_touch_position_y),t.cumulative_scoring_goal_last_touch_position_z=Xn(t.cumulative_scoring_goal_last_touch_position_z,e.cumulative_scoring_goal_last_touch_position_z),t.last_scoring_goal_last_touch_position=Jm(t.last_scoring_goal_last_touch_position,e.last_scoring_goal_last_touch_position)}function QP(t){const e=L0(t);for(const n of t.frames)e.applyFrame(n);return t}function L0(t){const e=jm(t.events.core_player??[]),n=jm(t.events.core_team??[]);let i=0,a=0;const s=new Map,r=hf(),o=hf();return{applyFrame(l){for(;i<e.length&&e[i].frame<=l.frame_number;){const c=e[i],u=Km(c.player),d=s.get(u)??P0();s.set(u,d),JP(d,c.delta),i+=1}for(;a<n.length&&n[a].frame<=l.frame_number;){const c=n[a];c.is_team_0?mf(r,c.delta):mf(o,c.delta),a+=1}Zm(l.team_zero.core,r),Zm(l.team_one.core,o);for(const c of l.players)ZP(c.core,s.get(Km(c.player_id)))}}}function Qm(t){if(!t||typeof t!="object")return String(t);const[e,n]=Object.entries(t)[0]??["Unknown","unknown"];return`${e}:${typeof n=="string"?n:JSON.stringify(n)}`}function N0(){return{count:0,on_ball_count:0}}function e2(t){return t.map((e,n)=>({event:e,index:n})).sort((e,n)=>e.event.frame!==n.event.frame?e.event.frame-n.event.frame:e.event.time!==n.event.time?e.event.time-n.event.time:e.index-n.index).map(({event:e})=>e)}function t2(t,e){t.count+=1,e.on_ball&&(t.on_ball_count+=1)}function n2(t,e){Object.assign(t,e??N0())}function i2(t){const e=I0(t);for(const n of t.frames)e.applyFrame(n);return t}function I0(t){const e=e2(t.events.dodge_reset??[]);let n=0;const i=new Map;return{applyFrame(a){for(;n<e.length&&e[n].frame<=a.frame_number;){const s=e[n],r=Qm(s.player),o=i.get(r)??N0();i.set(r,o),t2(o,s),n+=1}for(const s of a.players)n2(s.dodge_reset,i.get(Qm(s.player_id)))}}}function e_(t){if(!t||typeof t!="object")return String(t);const[e,n]=Object.entries(t)[0]??["Unknown","unknown"];return`${e}:${typeof n=="string"?n:JSON.stringify(n)}`}function D0(){return{count:0,is_last_double_tap:!1,last_double_tap_time:null,last_double_tap_frame:null,time_since_last_double_tap:null,frames_since_last_double_tap:null}}function a2(t){return t.map((e,n)=>({event:e,index:n})).sort((e,n)=>e.event.frame!==n.event.frame?e.event.frame-n.event.frame:e.event.time!==n.event.time?e.event.time-n.event.time:e.index-n.index).map(({event:e})=>e)}function s2(t,e,n,i){t.is_last_double_tap=i,t.time_since_last_double_tap=t.last_double_tap_time==null?null:Math.max(0,n-t.last_double_tap_time),t.frames_since_last_double_tap=t.last_double_tap_frame==null?null:Math.max(0,e-t.last_double_tap_frame)}function r2(t,e,n,i){t.count+=1,t.last_double_tap_time=e.time,t.last_double_tap_frame=e.frame,t.time_since_last_double_tap=Math.max(0,i-e.time),t.frames_since_last_double_tap=Math.max(0,n-e.frame)}function o2(t,e){Object.assign(t,e??D0())}function t_(t,e){t.count=e}function l2(t){const e=k0(t);for(const n of t.frames)e.applyFrame(n);return t}function k0(t){const e=a2(t.events.double_tap??[]);let n=0,i=0,a=0,s=null;const r=new Map;return{applyFrame(o){for(const[c,u]of r)s2(u,o.frame_number,o.time,c===s);let l=!1;for(;n<e.length&&e[n].frame<=o.frame_number;){const c=e[n],u=e_(c.player),d=r.get(u)??D0();r.set(u,d),r2(d,c,o.frame_number,o.time),c.is_team_0?i+=1:a+=1,s=u,l=!0,n+=1}if(l)for(const c of r.values())c.is_last_double_tap=!1;if(s!=null){const c=r.get(s);c&&(c.is_last_double_tap=!0)}t_(o.team_zero.double_tap,i),t_(o.team_one.double_tap,a);for(const c of o.players)o2(c.double_tap,r.get(e_(c.player_id)))}}}function n_(t){if(!t||typeof t!="object")return String(t);const[e,n]=Object.entries(t)[0]??["Unknown","unknown"];return`${e}:${typeof n=="string"?n:JSON.stringify(n)}`}function F0(){return{demos_inflicted:0,demos_taken:0}}function i_(){return{demos_inflicted:0}}function c2(t){return t.filter(e=>e.kind==="Kill"||e.kind==="Death").map((e,n)=>({event:e,index:n})).sort((e,n)=>e.event.time!==n.event.time?e.event.time-n.event.time:e.index-n.index).map(({event:e})=>e)}function u2(t,e){Object.assign(t,e??F0())}function a_(t,e){Object.assign(t,e)}function d2(t){const e=O0(t);for(const n of t.frames)e.applyFrame(n);return t}function O0(t){const e=c2(t.events.timeline??[]);let n=0;const i=new Map,a=i_(),s=i_();return{applyFrame(r){for(;n<e.length&&e[n].time<=r.time;){const o=e[n];if(o.player_id!=null){const l=n_(o.player_id),c=i.get(l)??F0();i.set(l,c),o.kind==="Kill"?(c.demos_inflicted+=1,o.is_team_0===!0?a.demos_inflicted+=1:o.is_team_0===!1&&(s.demos_inflicted+=1)):o.kind==="Death"&&(c.demos_taken+=1)}n+=1}a_(r.team_zero.demo,a),a_(r.team_one.demo,s);for(const o of r.players)u2(o.demo,i.get(n_(o.player_id)))}}}function zu(t){if(!t||typeof t!="object")return String(t);const[e,n]=Object.entries(t)[0]??["Unknown","unknown"];return`${e}:${typeof n=="string"?n:JSON.stringify(n)}`}function s_(){return{count:0,wins:0,losses:0,neutral_outcomes:0,kickoff_count:0,kickoff_wins:0,kickoff_losses:0,kickoff_neutral_outcomes:0,possession_after_count:0,opponent_possession_after_count:0,neutral_possession_after_count:0,kickoff_possession_after_count:0,kickoff_opponent_possession_after_count:0,kickoff_neutral_possession_after_count:0}}function _f(){return{count:0,wins:0,losses:0,neutral_outcomes:0,kickoff_count:0,kickoff_wins:0,kickoff_losses:0,kickoff_neutral_outcomes:0,possession_after_count:0,kickoff_possession_after_count:0}}function f2(t){return t.map((e,n)=>({event:e,index:n})).sort((e,n)=>e.event.resolve_frame!==n.event.resolve_frame?e.event.resolve_frame-n.event.resolve_frame:e.event.resolve_time!==n.event.resolve_time?e.event.resolve_time-n.event.resolve_time:e.index-n.index).map(({event:e})=>e)}function p2(t){return{key:"phase",value:t?"kickoff":"open_play"}}function h2(t,e){return e==null?{key:"outcome",value:"neutral"}:{key:"outcome",value:e===t?"win":"loss"}}function m2(t,e){return e==null?{key:"possession_after",value:"neutral"}:{key:"possession_after",value:e===t?"self":"opponent"}}function _2(t,e){return{key:"dodge_state",value:(t?e.team_zero_dodge_contact:e.team_one_dodge_contact)?"dodge":"no_dodge"}}function gf(t){return`${t.key}\0${t.value}`}function tl(t){return t.map(gf).join("")}function g2(t,e){e.sort((a,s)=>gf(a).localeCompare(gf(s)));const n=t.labeled_event_counts??={entries:[]},i=n.entries.find(a=>tl(a.labels)===tl(e));i?i.count+=1:(n.entries.push({labels:[...e],count:1}),n.entries.sort((a,s)=>tl(a.labels).localeCompare(tl(s.labels))))}function v2(t){return{entries:t.entries.map(e=>({labels:e.labels.map(n=>({...n})),count:e.count}))}}function r_(t,e,n){t.count+=1,n.winning_team_is_team_0==null?t.neutral_outcomes+=1:n.winning_team_is_team_0===e?t.wins+=1:t.losses+=1,n.possession_team_is_team_0==null?t.neutral_possession_after_count+=1:n.possession_team_is_team_0===e?t.possession_after_count+=1:t.opponent_possession_after_count+=1,n.is_kickoff&&(t.kickoff_count+=1,n.winning_team_is_team_0==null?t.kickoff_neutral_outcomes+=1:n.winning_team_is_team_0===e?t.kickoff_wins+=1:t.kickoff_losses+=1,n.possession_team_is_team_0==null?t.kickoff_neutral_possession_after_count+=1:n.possession_team_is_team_0===e?t.kickoff_possession_after_count+=1:t.kickoff_opponent_possession_after_count+=1)}function o_(t,e,n){g2(t,[p2(n.is_kickoff),h2(e,n.winning_team_is_team_0),m2(e,n.possession_team_is_team_0),_2(e,n)]),t.count+=1,n.winning_team_is_team_0==null?t.neutral_outcomes+=1:n.winning_team_is_team_0===e?t.wins+=1:t.losses+=1,n.possession_team_is_team_0===e&&(t.possession_after_count+=1),n.is_kickoff&&(t.kickoff_count+=1,n.winning_team_is_team_0==null?t.kickoff_neutral_outcomes+=1:n.winning_team_is_team_0===e?t.kickoff_wins+=1:t.kickoff_losses+=1,n.possession_team_is_team_0===e&&(t.kickoff_possession_after_count+=1))}function y2(t,e){Object.assign(t,e??_f()),e?.labeled_event_counts?t.labeled_event_counts=v2(e.labeled_event_counts):delete t.labeled_event_counts}function l_(t,e){Object.assign(t,e)}function b2(t){const e=U0(t);for(const n of t.frames)e.applyFrame(n);return t}function U0(t){const e=f2(t.events.fifty_fifty??[]);let n=0;const i=s_(),a=s_(),s=new Map;return{applyFrame(r){for(;n<e.length&&e[n].resolve_frame<=r.frame_number;){const o=e[n];if(r_(i,!0,o),r_(a,!1,o),o.team_zero_player!=null){const l=zu(o.team_zero_player),c=s.get(l)??_f();s.set(l,c),o_(c,!0,o)}if(o.team_one_player!=null){const l=zu(o.team_one_player),c=s.get(l)??_f();s.set(l,c),o_(c,!1,o)}n+=1}l_(r.team_zero.fifty_fifty,i),l_(r.team_one.fifty_fifty,a);for(const o of r.players)y2(o.fifty_fifty,s.get(zu(o.player_id)))}}}const x2=.8;function bs(t){return Math.fround(t)}function Hu(t,e){return bs(bs(t)+bs(e))}function B0(t,e){return bs(bs(t)-bs(e))}function c_(t){if(!t||typeof t!="object")return String(t);const[e,n]=Object.entries(t)[0]??["Unknown","unknown"];return`${e}:${typeof n=="string"?n:JSON.stringify(n)}`}function z0(){return{count:0,high_confidence_count:0,is_last_flick:!1,last_flick_time:null,last_flick_frame:null,time_since_last_flick:null,frames_since_last_flick:null,last_confidence:null,best_confidence:0,cumulative_confidence:0,cumulative_setup_duration:0,cumulative_ball_speed_change:0}}function S2(t){return t.map((e,n)=>({event:e,index:n})).sort((e,n)=>{const i=e.event.sample_frame??e.event.frame,a=n.event.sample_frame??n.event.frame;if(i!==a)return i-a;const s=e.event.sample_time??e.event.time,r=n.event.sample_time??n.event.time;return s!==r?s-r:e.event.time!==n.event.time?e.event.time-n.event.time:e.index-n.index}).map(({event:e})=>e)}function vf(t){return`${t.key}\0${t.value}`}function nl(t){return t.map(vf).join("")}function w2(t,e){e.sort((a,s)=>vf(a).localeCompare(vf(s)));const n=t.labeled_event_counts??={entries:[]},i=n.entries.find(a=>nl(a.labels)===nl(e));i?i.count+=1:(n.entries.push({labels:[...e],count:1}),n.entries.sort((a,s)=>nl(a.labels).localeCompare(nl(s.labels))))}function E2(t,e){return t.labeled_event_counts?.entries.filter(n=>n.labels.some(i=>i.key==="confidence_band"&&i.value===e)).reduce((n,i)=>n+i.count,0)??0}function M2(t){return t.labeled_event_counts?.entries.reduce((e,n)=>e+n.count,0)??0}function T2(t){return{entries:t.entries.map(e=>({labels:e.labels.map(n=>({...n})),count:e.count}))}}function A2(t,e,n,i){t.is_last_flick=i,t.time_since_last_flick=t.last_flick_time==null?null:Math.max(0,B0(n,t.last_flick_time)),t.frames_since_last_flick=t.last_flick_frame==null?null:Math.max(0,e-t.last_flick_frame)}function C2(t,e,n,i){w2(t,[{key:"confidence_band",value:e.confidence>=x2?"high":"standard"}]),t.count=M2(t),t.high_confidence_count=E2(t,"high"),t.is_last_flick=!0,t.last_flick_time=e.time,t.last_flick_frame=e.frame,t.time_since_last_flick=Math.max(0,B0(i,e.time)),t.frames_since_last_flick=Math.max(0,n-e.frame),t.last_confidence=e.confidence,t.best_confidence=Math.max(t.best_confidence,e.confidence),t.cumulative_confidence=Hu(t.cumulative_confidence,e.confidence),t.cumulative_setup_duration=Hu(t.cumulative_setup_duration,e.setup_duration),t.cumulative_ball_speed_change=Hu(t.cumulative_ball_speed_change,e.ball_speed_change)}function R2(t,e){Object.assign(t,e??z0()),e?.labeled_event_counts?t.labeled_event_counts=T2(e.labeled_event_counts):delete t.labeled_event_counts}function P2(t){const e=H0(t);for(const n of t.frames)e.applyFrame(n);return t}function H0(t){const e=S2(t.events.flick??[]);let n=0,i=null;const a=new Map;return{applyFrame(s){if(s.is_live_play){for(const[r,o]of a)A2(o,s.frame_number,s.time,r===i);for(;n<e.length&&(e[n].sample_frame??e[n].frame)<=s.frame_number;){const r=e[n],o=c_(r.player),l=a.get(o)??z0();a.set(o,l),C2(l,r,s.frame_number,s.time),i=o,n+=1}if(i!=null){const r=a.get(i);r&&(r.is_last_flick=!0)}}else i=null;for(const r of s.players)R2(r.flick,a.get(c_(r.player_id)))}}}function xs(t){return Math.fround(t)}function V0(t,e){return xs(xs(t)+xs(e))}function G0(t,e){return xs(xs(t)-xs(e))}function u_(t){if(!t||typeof t!="object")return String(t);const[e,n]=Object.entries(t)[0]??["Unknown","unknown"];return`${e}:${typeof n=="string"?n:JSON.stringify(n)}`}function $0(){return{count:0,total_ball_speed:0,fastest_ball_speed:0,is_last_half_volley:!1,last_half_volley_time:null,last_half_volley_frame:null,time_since_last_half_volley:null,frames_since_last_half_volley:null}}function L2(t){return t.map((e,n)=>({event:e,index:n})).sort((e,n)=>{const i=e.event.sample_frame??e.event.frame,a=n.event.sample_frame??n.event.frame;if(i!==a)return i-a;const s=e.event.sample_time??e.event.time,r=n.event.sample_time??n.event.time;return s!==r?s-r:e.event.time!==n.event.time?e.event.time-n.event.time:e.index-n.index}).map(({event:e})=>e)}function N2(t,e,n,i){t.is_last_half_volley=i,t.time_since_last_half_volley=t.last_half_volley_time==null?null:Math.max(0,G0(n,t.last_half_volley_time)),t.frames_since_last_half_volley=t.last_half_volley_frame==null?null:Math.max(0,e-t.last_half_volley_frame)}function I2(t,e,n,i){t.count+=1,t.total_ball_speed=V0(t.total_ball_speed,e.ball_speed),t.fastest_ball_speed=Math.max(t.fastest_ball_speed,e.ball_speed),t.last_half_volley_time=e.time,t.last_half_volley_frame=e.frame,t.time_since_last_half_volley=Math.max(0,G0(i,e.time)),t.frames_since_last_half_volley=Math.max(0,n-e.frame)}function D2(t,e){Object.assign(t,e??$0())}function d_(t,e){Object.assign(t,e)}function k2(t){const e=W0(t);for(const n of t.frames)e.applyFrame(n);return t}function W0(t){const e=L2(t.events.half_volley??[]);let n=0,i=null;const a=new Map,s={count:0,total_ball_speed:0,fastest_ball_speed:0},r={count:0,total_ball_speed:0,fastest_ball_speed:0};return{applyFrame(o){for(const[l,c]of a)N2(c,o.frame_number,o.time,o.is_live_play&&l===i);if(!o.is_live_play)i=null;else{let l=!1;for(;n<e.length&&(e[n].sample_frame??e[n].frame)<=o.frame_number;){const c=e[n],u=u_(c.player),d=a.get(u)??$0();a.set(u,d),I2(d,c,o.frame_number,o.time);const f=c.is_team_0?s:r;f.count+=1,f.total_ball_speed=V0(f.total_ball_speed,c.ball_speed),f.fastest_ball_speed=Math.max(f.fastest_ball_speed,c.ball_speed),i=u,l=!0,n+=1}if(l)for(const c of a.values())c.is_last_half_volley=!1;if(i!=null){const c=a.get(i);c&&(c.is_last_half_volley=!0)}}d_(o.team_zero.half_volley,s),d_(o.team_one.half_volley,r);for(const l of o.players)D2(l.half_volley,a.get(u_(l.player_id)))}}}const F2=.75,O2=.78,U2=.75;function kn(t){if(!t||typeof t!="object")return String(t);const[e,n]=Object.entries(t)[0]??["Unknown","unknown"];return`${e}:${typeof n=="string"?n:JSON.stringify(n)}`}function f_(t){return[...t].sort((e,n)=>e.frame!==n.frame?e.frame-n.frame:e.time!==n.time?e.time-n.time:kn(e.player).localeCompare(kn(n.player)))}function B2(t){return[...t].sort((e,n)=>e.resolved_frame!==n.resolved_frame?e.resolved_frame-n.resolved_frame:e.resolved_time!==n.resolved_time?e.resolved_time-n.resolved_time:e.frame!==n.frame?e.frame-n.frame:e.time!==n.time?e.time-n.time:kn(e.player).localeCompare(kn(n.player)))}function Vu(){return{count:0,highConfidenceCount:0,lastTime:null,lastFrame:null,lastResolvedTime:null,lastResolvedFrame:null,lastQuality:null,bestQuality:0,cumulativeQuality:0,labeledCounts:{entries:[]}}}function Ss(t){return Math.fround(t)}function z2(t,e){return Ss(Ss(t)+Ss(e))}function H2(t,e){return{key:"confidence_band",value:t>=e?"high":"standard"}}function V2(t,e){const n=e.sort((a,s)=>a.key===s.key?a.value.localeCompare(s.value):a.key.localeCompare(s.key)),i=t.entries.find(a=>a.labels.length===n.length&&a.labels.every((s,r)=>s.key===n[r]?.key&&s.value===n[r]?.value));if(i){i.count+=1;return}t.entries.push({labels:n,count:1}),t.entries.sort((a,s)=>JSON.stringify(a.labels).localeCompare(JSON.stringify(s.labels)))}function Ws(t){return{entries:t.entries.map(e=>({labels:e.labels.map(n=>({...n})),count:e.count}))}}function Gu(t,e,n,i,a){t.count+=1,e.confidence>=a&&(t.highConfidenceCount+=1),V2(t.labeledCounts,[H2(e.confidence,a)]),t.lastTime=e.time,t.lastFrame=e.frame,t.lastResolvedTime=i,t.lastResolvedFrame=n,t.lastQuality=e.confidence,t.bestQuality=Math.max(t.bestQuality,e.confidence),t.cumulativeQuality=z2(t.cumulativeQuality,e.confidence)}function Fp(t,e){return t?.lastTime==null?null:t.lastResolvedFrame===e.frame_number?0:Math.max(0,Ss(Ss(e.time)-Ss(t.lastTime)))}function Op(t,e){return t?.lastFrame==null?null:t.lastResolvedFrame===e.frame_number?0:Math.max(0,e.frame_number-t.lastFrame)}function X0(t,e,n,i){t.count=e?.count??0,t.high_confidence_count=e?.highConfidenceCount??0,t.is_last_speed_flip=i,t.last_speed_flip_time=e?.lastTime??null,t.last_speed_flip_frame=e?.lastFrame??null,t.time_since_last_speed_flip=Fp(e,n),t.frames_since_last_speed_flip=Op(e,n),t.last_quality=e?.lastQuality??null,t.best_quality=e?.bestQuality??0,t.cumulative_quality=e?.cumulativeQuality??0,e?.labeledCounts.entries.length?t.labeled_event_counts=Ws(e.labeledCounts):delete t.labeled_event_counts}function q0(t,e,n,i){t.count=e?.count??0,t.high_confidence_count=e?.highConfidenceCount??0,t.is_last_half_flip=i,t.last_half_flip_time=e?.lastTime??null,t.last_half_flip_frame=e?.lastFrame??null,t.time_since_last_half_flip=Fp(e,n),t.frames_since_last_half_flip=Op(e,n),t.last_quality=e?.lastQuality??null,t.best_quality=e?.bestQuality??0,t.cumulative_quality=e?.cumulativeQuality??0,e?.labeledCounts.entries.length?t.labeled_event_counts=Ws(e.labeledCounts):delete t.labeled_event_counts}function Y0(t,e,n,i){t.count=e?.count??0,t.high_confidence_count=e?.highConfidenceCount??0,t.is_last_wavedash=i,t.last_wavedash_time=e?.lastTime??null,t.last_wavedash_frame=e?.lastFrame??null,t.time_since_last_wavedash=Fp(e,n),t.frames_since_last_wavedash=Op(e,n),t.last_quality=e?.lastQuality??null,t.best_quality=e?.bestQuality??0,t.cumulative_quality=e?.cumulativeQuality??0,e?.labeledCounts.entries.length?t.labeled_event_counts=Ws(e.labeledCounts):delete t.labeled_event_counts}function G2(t){const e={...t};return t.labeled_event_counts?e.labeled_event_counts=Ws(t.labeled_event_counts):delete e.labeled_event_counts,e}function $2(t){const e={...t};return t.labeled_event_counts?e.labeled_event_counts=Ws(t.labeled_event_counts):delete e.labeled_event_counts,e}function W2(t){const e={...t};return t.labeled_event_counts?e.labeled_event_counts=Ws(t.labeled_event_counts):delete e.labeled_event_counts,e}function X2(t,e){if(e){Object.assign(t,e);return}X0(t,void 0,{frame_number:0,time:0},!1)}function q2(t,e){if(e){Object.assign(t,e);return}q0(t,void 0,{frame_number:0,time:0},!1)}function Y2(t,e){if(e){Object.assign(t,e);return}Y0(t,void 0,{frame_number:0,time:0},!1)}function K2(t){return t.is_live_play||t.ball_has_been_hit===!1}function j2(t){const e=K0(t);for(const n of t.frames)e.applyFrame(n);return t}function K0(t){const e=B2(t.events.speed_flip??[]),n=f_(t.events.half_flip??[]),i=f_(t.events.wavedash??[]);let a=0,s=0,r=0,o=null,l=null,c=null;const u=new Map,d=new Map,f=new Map,p=new Map,_=new Map,g=new Map;return{applyFrame(m){if(K2(m)){for(;a<e.length&&e[a].resolved_frame<=m.frame_number;){const h=e[a],b=kn(h.player),S=u.get(b)??Vu();u.set(b,S),Gu(S,h,h.resolved_frame,h.resolved_time,F2),o=b,a+=1}for(const h of m.players){const b=kn(h.player_id);X0(h.speed_flip,u.get(b),m,b===o),p.set(b,G2(h.speed_flip))}}else for(const h of m.players){const b=kn(h.player_id);X2(h.speed_flip,p.get(b))}if(m.is_live_play){for(;s<n.length&&n[s].frame<=m.frame_number;){const h=n[s],b=kn(h.player),S=d.get(b)??Vu();d.set(b,S),Gu(S,h,h.frame,h.time,O2),l=b,s+=1}for(;r<i.length&&i[r].frame<=m.frame_number;){const h=i[r],b=kn(h.player),S=f.get(b)??Vu();f.set(b,S),Gu(S,h,h.frame,h.time,U2),c=b,r+=1}for(const h of m.players){const b=kn(h.player_id);q0(h.half_flip,d.get(b),m,b===l),_.set(b,$2(h.half_flip)),Y0(h.wavedash,f.get(b),m,b===c),g.set(b,W2(h.wavedash))}}else{for(const h of m.players){const b=kn(h.player_id);q2(h.half_flip,_.get(b)),Y2(h.wavedash,g.get(b))}l=null,c=null}}}}const Z2=["boost","slow","supersonic"],J2=["ground","high_air","low_air"];function Gi(t){return Math.fround(t)}function qn(t,e){return Gi(Gi(t)+Gi(e))}function Q2(t,e){return Gi(Gi(t)*Gi(e))}function p_(t){if(!t||typeof t!="object")return String(t);const[e,n]=Object.entries(t)[0]??["Unknown","unknown"];return`${e}:${typeof n=="string"?n:JSON.stringify(n)}`}function eL(){return{entries:J2.flatMap(t=>Z2.map(e=>({labels:[{key:"height_band",value:t},{key:"speed_band",value:e}],value:0}))).sort((t,e)=>JSON.stringify(t.labels).localeCompare(JSON.stringify(e.labels)))}}function Al(t=!1){return{tracked_time:0,total_distance:0,speed_integral:0,time_slow_speed:0,time_boost_speed:0,time_supersonic_speed:0,time_on_ground:0,time_low_air:0,time_high_air:0,labeled_tracked_time:t?eL():{entries:[]}}}function tL(t){return t.map((e,n)=>({event:e,index:n})).sort((e,n)=>e.event.frame!==n.event.frame?e.event.frame-n.event.frame:e.event.time!==n.event.time?e.event.time-n.event.time:e.index-n.index).map(({event:e})=>e)}function nL(t){return t.sort((e,n)=>e.key===n.key?e.value.localeCompare(n.value):e.key.localeCompare(n.key))}function iL(t,e,n){const i=nL(e),a=t.entries.find(s=>s.labels.length===i.length&&s.labels.every((r,o)=>r.key===i[o]?.key&&r.value===i[o]?.value));a?a.value=qn(a.value,n):(t.entries.push({labels:i,value:Gi(n)}),t.entries.sort((s,r)=>JSON.stringify(s.labels).localeCompare(JSON.stringify(r.labels))))}function aL(t){return{entries:t.entries.map(e=>({labels:e.labels.map(n=>({...n})),value:e.value}))}}function h_(t,e){const n=Gi(e.dt);t.tracked_time=qn(t.tracked_time,n),t.total_distance=qn(t.total_distance,e.distance),t.speed_integral=qn(t.speed_integral,Q2(e.speed,n)),e.speed_band==="slow"?t.time_slow_speed=qn(t.time_slow_speed,n):e.speed_band==="boost"?t.time_boost_speed=qn(t.time_boost_speed,n):e.speed_band==="supersonic"&&(t.time_supersonic_speed=qn(t.time_supersonic_speed,n)),e.height_band==="ground"?t.time_on_ground=qn(t.time_on_ground,n):e.height_band==="low_air"?t.time_low_air=qn(t.time_low_air,n):e.height_band==="high_air"&&(t.time_high_air=qn(t.time_high_air,n));const i=t.labeled_tracked_time??{entries:[]};t.labeled_tracked_time=i,iL(i,[{key:"speed_band",value:e.speed_band},{key:"height_band",value:e.height_band}],n)}function $u(t,e){const n=e??Al(!0),i=n.labeled_tracked_time;Object.assign(t,n,{labeled_tracked_time:i?aL(i):void 0}),i?.entries.length||delete t.labeled_tracked_time}function sL(t){const e=j0(t);for(const n of t.frames)e.applyFrame(n);return t}function j0(t){const e=tL(t.events.movement??[]);let n=0;const i=new Map,a=Al(),s=Al();return{applyFrame(r){for(;n<e.length&&e[n].frame<=r.frame_number;){const o=e[n],l=p_(o.player),c=i.get(l)??Al(!0);i.set(l,c),h_(c,o),h_(o.is_team_0?a:s,o),n+=1}$u(r.team_zero.movement,a),$u(r.team_one.movement,s);for(const o of r.players)$u(o.movement,i.get(p_(o.player_id)))}}}const rL=.8;function ws(t){return Math.fround(t)}function oL(t,e){return ws(ws(t)+ws(e))}function Z0(t,e){return ws(ws(t)-ws(e))}function m_(t){if(!t||typeof t!="object")return String(t);const[e,n]=Object.entries(t)[0]??["Unknown","unknown"];return`${e}:${typeof n=="string"?n:JSON.stringify(n)}`}function J0(){return{count:0,aerial_count:0,high_confidence_count:0,is_last_musty:!1,last_musty_time:null,last_musty_frame:null,time_since_last_musty:null,frames_since_last_musty:null,last_confidence:null,best_confidence:0,cumulative_confidence:0}}function lL(t){return t.map((e,n)=>({event:e,index:n})).sort((e,n)=>{const i=e.event.sample_frame??e.event.frame,a=n.event.sample_frame??n.event.frame;if(i!==a)return i-a;const s=e.event.sample_time??e.event.time,r=n.event.sample_time??n.event.time;return s!==r?s-r:e.index-n.index}).map(({event:e})=>e)}function yf(t){return`${t.key}\0${t.value}`}function il(t){return t.map(yf).join("")}function cL(t,e){e.sort((a,s)=>yf(a).localeCompare(yf(s)));const n=t.labeled_event_counts??={entries:[]},i=n.entries.find(a=>il(a.labels)===il(e));i?i.count+=1:(n.entries.push({labels:[...e],count:1}),n.entries.sort((a,s)=>il(a.labels).localeCompare(il(s.labels))))}function __(t,e,n){return t.labeled_event_counts?.entries.filter(i=>i.labels.some(a=>a.key===e&&a.value===n)).reduce((i,a)=>i+a.count,0)??0}function uL(t){return t.labeled_event_counts?.entries.reduce((e,n)=>e+n.count,0)??0}function dL(t){return{entries:t.entries.map(e=>({labels:e.labels.map(n=>({...n})),count:e.count}))}}function fL(t,e,n,i){t.is_last_musty=i,t.time_since_last_musty=t.last_musty_time==null?null:Math.max(0,Z0(n,t.last_musty_time)),t.frames_since_last_musty=t.last_musty_frame==null?null:Math.max(0,e-t.last_musty_frame)}function pL(t,e,n,i){cL(t,[{key:"vertical_state",value:e.aerial?"aerial":"grounded"},{key:"confidence_band",value:e.confidence>=rL?"high":"standard"}]),t.count=uL(t),t.aerial_count=__(t,"vertical_state","aerial"),t.high_confidence_count=__(t,"confidence_band","high"),t.is_last_musty=!0,t.last_musty_time=e.time,t.last_musty_frame=e.frame,t.time_since_last_musty=Math.max(0,Z0(i,e.time)),t.frames_since_last_musty=Math.max(0,n-e.frame),t.last_confidence=e.confidence,t.best_confidence=Math.max(t.best_confidence,e.confidence),t.cumulative_confidence=oL(t.cumulative_confidence,e.confidence)}function hL(t,e){Object.assign(t,e??J0()),e?.labeled_event_counts?t.labeled_event_counts=dL(e.labeled_event_counts):delete t.labeled_event_counts}function mL(t){const e=Q0(t);for(const n of t.frames)e.applyFrame(n);return t}function Q0(t){const e=lL(t.events.musty_flick??[]);let n=0,i=null;const a=new Map;return{applyFrame(s){if(s.is_live_play){for(const[o,l]of a)fL(l,s.frame_number,s.time,i===o);let r=!1;for(;n<e.length&&(e[n].sample_frame??e[n].frame)<=s.frame_number;){const o=e[n],l=m_(o.player),c=a.get(l)??J0();a.set(l,c),pL(c,o,s.frame_number,s.time),i=l,n+=1,r=!0}if(r)for(const o of a.values())o.is_last_musty=!1;if(i!=null){const o=a.get(i);o&&(o.is_last_musty=!0)}}else i=null;for(const r of s.players)hL(r.musty_flick,a.get(m_(r.player_id)))}}}function g_(t){if(!t||typeof t!="object")return String(t);const[e,n]=Object.entries(t)[0]??["Unknown","unknown"];return`${e}:${typeof n=="string"?n:JSON.stringify(n)}`}function ey(){return{count:0,total_ball_speed:0,fastest_ball_speed:0,total_pass_distance:0,is_last_one_timer:!1,last_one_timer_time:null,last_one_timer_frame:null,time_since_last_one_timer:null,frames_since_last_one_timer:null}}function _L(t){return t.map((e,n)=>({event:e,index:n})).sort((e,n)=>e.event.frame!==n.event.frame?e.event.frame-n.event.frame:e.event.time!==n.event.time?e.event.time-n.event.time:e.index-n.index).map(({event:e})=>e)}function gL(t,e,n,i){t.is_last_one_timer=i,t.time_since_last_one_timer=t.last_one_timer_time==null?null:Math.max(0,n-t.last_one_timer_time),t.frames_since_last_one_timer=t.last_one_timer_frame==null?null:Math.max(0,e-t.last_one_timer_frame)}function vL(t,e,n,i){t.count+=1,t.total_ball_speed+=e.ball_speed,t.fastest_ball_speed=Math.max(t.fastest_ball_speed,e.ball_speed),t.total_pass_distance+=e.pass_travel_distance,t.last_one_timer_time=e.time,t.last_one_timer_frame=e.frame,t.time_since_last_one_timer=Math.max(0,i-e.time),t.frames_since_last_one_timer=Math.max(0,n-e.frame)}function yL(t,e){Object.assign(t,e??ey())}function v_(t,e){Object.assign(t,e)}function bL(t){const e=ty(t);for(const n of t.frames)e.applyFrame(n);return t}function ty(t){const e=_L(t.events.one_timer??[]);let n=0,i=null;const a=new Map,s={count:0,total_ball_speed:0,fastest_ball_speed:0},r={count:0,total_ball_speed:0,fastest_ball_speed:0};return{applyFrame(o){for(const[l,c]of a)gL(c,o.frame_number,o.time,o.is_live_play&&l===i);if(!o.is_live_play)i=null;else{let l=!1;for(;n<e.length&&e[n].frame<=o.frame_number;){const c=e[n],u=g_(c.player),d=a.get(u)??ey();a.set(u,d),vL(d,c,o.frame_number,o.time);const f=c.is_team_0?s:r;f.count+=1,f.total_ball_speed+=c.ball_speed,f.fastest_ball_speed=Math.max(f.fastest_ball_speed,c.ball_speed),i=u,l=!0,n+=1}if(l)for(const c of a.values())c.is_last_one_timer=!1;if(i!=null){const c=a.get(i);c&&(c.is_last_one_timer=!0)}}v_(o.team_zero.one_timer,s),v_(o.team_one.one_timer,r);for(const l of o.players)yL(l.one_timer,a.get(g_(l.player_id)))}}}function al(t){if(!t||typeof t!="object")return String(t);const[e,n]=Object.entries(t)[0]??["Unknown","unknown"];return`${e}:${typeof n=="string"?n:JSON.stringify(n)}`}function bf(){return{completed_pass_count:0,received_pass_count:0,total_pass_distance:0,total_pass_advance:0,longest_pass_distance:0,is_last_completed_pass:!1,last_completed_pass_time:null,last_completed_pass_frame:null,time_since_last_completed_pass:null,frames_since_last_completed_pass:null}}function xL(t){return t.map((e,n)=>({event:e,index:n})).sort((e,n)=>{const i=e.event.sample_frame??e.event.frame,a=n.event.sample_frame??n.event.frame;if(i!==a)return i-a;const s=e.event.sample_time??e.event.time,r=n.event.sample_time??n.event.time;return s!==r?s-r:e.index-n.index}).map(({event:e})=>e)}function SL(t){return t.map((e,n)=>({event:e,index:n})).sort((e,n)=>e.event.frame!==n.event.frame?e.event.frame-n.event.frame:e.event.time!==n.event.time?e.event.time-n.event.time:e.index-n.index).map(({event:e})=>e)}function wL(t,e,n,i){t.is_last_completed_pass=i,t.time_since_last_completed_pass=t.last_completed_pass_time==null?null:Math.max(0,n-t.last_completed_pass_time),t.frames_since_last_completed_pass=t.last_completed_pass_frame==null?null:Math.max(0,e-t.last_completed_pass_frame)}function EL(t,e,n,i){t.completed_pass_count+=1,t.total_pass_distance+=e.ball_travel_distance,t.total_pass_advance+=e.ball_advance_distance,t.longest_pass_distance=Math.max(t.longest_pass_distance,e.ball_travel_distance),t.last_completed_pass_time=e.time,t.last_completed_pass_frame=e.frame,t.time_since_last_completed_pass=Math.max(0,i-e.time),t.frames_since_last_completed_pass=Math.max(0,n-e.frame)}function ML(t,e){Object.assign(t,e??bf())}function y_(t,e){Object.assign(t,e)}function TL(t){const e=ny(t);for(const n of t.frames)e.applyFrame(n);return t}function ny(t){const e=xL(t.events.pass??[]),n=SL(t.events.pass_last_completed??[]),i=n.length>0;let a=0,s=0,r=null;const o=new Map,l={completed_pass_count:0,total_pass_distance:0,total_pass_advance:0,longest_pass_distance:0},c={completed_pass_count:0,total_pass_distance:0,total_pass_advance:0,longest_pass_distance:0};return{applyFrame(u){for(const[f,p]of o)wL(p,u.frame_number,u.time,u.is_live_play&&f===r);if(!u.is_live_play)r=null;else{let f=!1;for(;a<e.length&&(e[a].sample_frame??e[a].frame)<=u.frame_number;){const p=e[a],_=al(p.passer),g=o.get(_)??bf();o.set(_,g),EL(g,p,u.frame_number,u.time);const m=al(p.receiver),h=o.get(m)??bf();o.set(m,h),h.received_pass_count+=1;const b=p.is_team_0?l:c;b.completed_pass_count+=1,b.total_pass_distance+=p.ball_travel_distance,b.total_pass_advance+=p.ball_advance_distance,b.longest_pass_distance=Math.max(b.longest_pass_distance,p.ball_travel_distance),r=_,f=!0,a+=1}if(!i&&f)for(const p of o.values())p.is_last_completed_pass=!1;if(!i&&r!=null){const p=o.get(r);p&&(p.is_last_completed_pass=!0)}}let d=!1;for(;s<n.length&&n[s].frame<=u.frame_number;){const f=n[s];r=f.player==null?null:al(f.player),s+=1,d=!0}if(d){for(const f of o.values())f.is_last_completed_pass=!1;if(r!=null){const f=o.get(r);f&&(f.is_last_completed_pass=!0)}}y_(u.team_zero.pass,l),y_(u.team_one.pass,c);for(const f of u.players)ML(f.pass,o.get(al(f.player_id)))}}}function Cr(t){return Math.fround(t)}function hr(t,e){return Cr(Cr(t)+Cr(e))}function AL(){return{tracked_time:0,team_zero_time:0,team_one_time:0,neutral_time:0,labeled_time:{entries:[]}}}function CL(){return{tracked_time:0,possession_time:0,opponent_possession_time:0,neutral_time:0,labeled_time:{entries:[]}}}function RL(t){return t.map((e,n)=>({event:e,index:n})).sort((e,n)=>e.event.frame!==n.event.frame?e.event.frame-n.event.frame:e.event.time!==n.event.time?e.event.time-n.event.time:e.index-n.index).map(({event:e})=>e)}function PL(t){return t.sort((e,n)=>e.key===n.key?e.value.localeCompare(n.value):e.key.localeCompare(n.key))}function iy(t,e,n){const i=PL(e),a=t.entries.find(s=>s.labels.length===i.length&&s.labels.every((r,o)=>r.key===i[o]?.key&&r.value===i[o]?.value));a?a.value=hr(a.value,n):(t.entries.push({labels:i,value:Cr(n)}),t.entries.sort((s,r)=>JSON.stringify(s.labels).localeCompare(JSON.stringify(r.labels))))}function LL(t,e){return t.key==="possession_state"&&t.value==="team_zero"?{key:"possession_state",value:e?"own":"opponent"}:t.key==="possession_state"&&t.value==="team_one"?{key:"possession_state",value:e?"opponent":"own"}:t.key==="field_third"&&t.value==="team_zero_third"?{key:"field_third",value:e?"defensive_third":"offensive_third"}:t.key==="field_third"&&t.value==="team_one_third"?{key:"field_third",value:e?"offensive_third":"defensive_third"}:{...t}}function b_(t,e){const n={entries:[]};for(const i of t.labeled_time.entries)iy(n,i.labels.map(a=>LL(a,e)),i.value);return{tracked_time:t.tracked_time,possession_time:e?t.team_zero_time:t.team_one_time,opponent_possession_time:e?t.team_one_time:t.team_zero_time,neutral_time:t.neutral_time,labeled_time:n}}function NL(t,e){t.active=e.active,t.possessionState=e.possession_state,t.fieldThird=e.field_third??null}function IL(t,e,n){if(!e.active)return;const i=Cr(n.dt);t.tracked_time=hr(t.tracked_time,i),e.possessionState==="team_zero"?t.team_zero_time=hr(t.team_zero_time,i):e.possessionState==="team_one"?t.team_one_time=hr(t.team_one_time,i):t.neutral_time=hr(t.neutral_time,i);const a=[{key:"possession_state",value:e.possessionState}];e.fieldThird!=null&&a.push({key:"field_third",value:e.fieldThird}),iy(t.labeled_time,a,i)}function x_(t,e){Object.assign(t,e??CL())}function DL(t){const e=ay(t);for(const n of t.frames)e.applyFrame(n);return t}function ay(t){const e=RL(t.events.possession??[]);let n=0;const i=AL(),a={active:!1,possessionState:"neutral",fieldThird:null};return{applyFrame(s){for(;n<e.length&&e[n].frame<=s.frame_number;)NL(a,e[n]),n+=1;IL(i,a,s),x_(s.team_zero.possession,b_(i,!0)),x_(s.team_one.possession,b_(i,!1))}}}const kL=["active_game_time","tracked_time","sum_distance_to_teammates","sum_distance_to_ball","sum_distance_to_ball_has_possession","time_has_possession","sum_distance_to_ball_no_possession","time_no_possession","time_demolished","time_no_teammates","time_most_back","time_most_forward","time_mid_role","time_other_role","time_defensive_third","time_neutral_third","time_offensive_third","time_defensive_half","time_offensive_half","time_closest_to_ball","time_farthest_from_ball","time_behind_ball","time_level_with_ball","time_in_front_of_ball"];function FL(t,e){return Math.fround(Math.fround(t)+Math.fround(e))}function S_(t){if(!t||typeof t!="object")return String(t);const[e,n]=Object.entries(t)[0]??["Unknown","unknown"];return`${e}:${typeof n=="string"?n:JSON.stringify(n)}`}function sy(){return{active_game_time:0,tracked_time:0,sum_distance_to_teammates:0,sum_distance_to_ball:0,sum_distance_to_ball_has_possession:0,time_has_possession:0,sum_distance_to_ball_no_possession:0,time_no_possession:0,time_demolished:0,time_no_teammates:0,time_most_back:0,time_most_forward:0,time_mid_role:0,time_other_role:0,time_defensive_third:0,time_neutral_third:0,time_offensive_third:0,time_defensive_half:0,time_offensive_half:0,time_closest_to_ball:0,time_farthest_from_ball:0,time_behind_ball:0,time_level_with_ball:0,time_in_front_of_ball:0,times_caught_ahead_of_play_on_conceded_goals:0}}function OL(t){return t.map((e,n)=>({event:e,index:n})).sort((e,n)=>e.event.frame!==n.event.frame?e.event.frame-n.event.frame:e.event.time!==n.event.time?e.event.time-n.event.time:e.index-n.index).map(({event:e})=>e)}function UL(t,e){for(const n of kL)t[n]=FL(t[n],e[n]);t.times_caught_ahead_of_play_on_conceded_goals+=e.times_caught_ahead_of_play_on_conceded_goals}function BL(t,e){Object.assign(t,e??sy())}function zL(t){const e=ry(t);for(const n of t.frames)e.applyFrame(n);return t}function ry(t){const e=OL(t.events.positioning??[]);let n=0;const i=new Map;return{applyFrame(a){for(;n<e.length&&e[n].frame<=a.frame_number;){const s=e[n],r=S_(s.player),o=i.get(r)??sy();i.set(r,o),UL(o,s),n+=1}for(const s of a.players)BL(s.positioning,i.get(S_(s.player_id)))}}}function Wu(t){if(!t||typeof t!="object")return String(t);const[e,n]=Object.entries(t)[0]??["Unknown","unknown"];return`${e}:${typeof n=="string"?n:JSON.stringify(n)}`}function mr(){return{total_duration:0,press_count:0}}function HL(t){return t.map((e,n)=>({event:e,index:n})).sort((e,n)=>e.event.frame!==n.event.frame?e.event.frame-n.event.frame:e.event.time!==n.event.time?e.event.time-n.event.time:e.index-n.index).map(({event:e})=>e)}function VL(t){return t.gameplay_phase==="active_play"||t.gameplay_phase==="kickoff_waiting_for_touch"}function Xu(t,e){Object.assign(t,e??mr())}function GL(t){const e=oy(t);for(const n of t.frames)e.applyFrame(n);return t}function oy(t){const e=HL(t.events.powerslide??[]);let n=0;const i=new Map,a=new Map,s=mr(),r=mr();return{applyFrame(o){const l=VL(o);for(;n<e.length&&e[n].frame<=o.frame_number;){const c=e[n],u=Wu(c.player),d=i.get(u)?.active??!1;if(i.set(u,{active:c.active,isTeamZero:c.is_team_0}),l&&c.active&&!d){const f=a.get(u)??mr();a.set(u,f),f.press_count+=1;const p=c.is_team_0?s:r;p.press_count+=1}n+=1}if(l)for(const c of o.players){const u=Wu(c.player_id);if(!i.get(u)?.active)continue;const f=a.get(u)??mr();a.set(u,f),f.total_duration+=o.dt;const p=c.is_team_0?s:r;p.total_duration+=o.dt}Xu(o.team_zero.powerslide,s),Xu(o.team_one.powerslide,r);for(const c of o.players)Xu(c.powerslide,a.get(Wu(c.player_id)))}}}function Rr(t){return Math.fround(t)}function _r(t,e){return Rr(Rr(t)+Rr(e))}function $L(){return{tracked_time:0,team_zero_side_time:0,team_one_side_time:0,neutral_time:0,labeled_time:{entries:[]}}}function WL(){return{tracked_time:0,defensive_half_time:0,offensive_half_time:0,neutral_time:0,labeled_time:{entries:[]}}}function XL(t){return t.map((e,n)=>({event:e,index:n})).sort((e,n)=>e.event.frame!==n.event.frame?e.event.frame-n.event.frame:e.event.time!==n.event.time?e.event.time-n.event.time:e.index-n.index).map(({event:e})=>e)}function qL(t){return t.sort((e,n)=>e.key===n.key?e.value.localeCompare(n.value):e.key.localeCompare(n.key))}function ly(t,e,n){const i=qL(e),a=t.entries.find(s=>s.labels.length===i.length&&s.labels.every((r,o)=>r.key===i[o]?.key&&r.value===i[o]?.value));a?a.value=_r(a.value,n):(t.entries.push({labels:i,value:Rr(n)}),t.entries.sort((s,r)=>JSON.stringify(s.labels).localeCompare(JSON.stringify(r.labels))))}function YL(t,e){return t.key==="field_half"&&t.value==="team_zero_side"?{key:"field_half",value:e?"defensive_half":"offensive_half"}:t.key==="field_half"&&t.value==="team_one_side"?{key:"field_half",value:e?"offensive_half":"defensive_half"}:{...t}}function w_(t,e){const n={entries:[]};for(const i of t.labeled_time.entries)ly(n,i.labels.map(a=>YL(a,e)),i.value);return{tracked_time:t.tracked_time,defensive_half_time:e?t.team_zero_side_time:t.team_one_side_time,offensive_half_time:e?t.team_one_side_time:t.team_zero_side_time,neutral_time:t.neutral_time,labeled_time:n}}function KL(t,e){t.active=e.active,t.fieldHalf=e.field_half}function jL(t,e,n){if(!e.active)return;const i=Rr(n.dt);t.tracked_time=_r(t.tracked_time,i),e.fieldHalf==="team_zero_side"?t.team_zero_side_time=_r(t.team_zero_side_time,i):e.fieldHalf==="team_one_side"?t.team_one_side_time=_r(t.team_one_side_time,i):t.neutral_time=_r(t.neutral_time,i),ly(t.labeled_time,[{key:"field_half",value:e.fieldHalf}],i)}function E_(t,e){Object.assign(t,e??WL())}function ZL(t){const e=cy(t);for(const n of t.frames)e.applyFrame(n);return t}function cy(t){const e=XL(t.events.pressure??[]);let n=0;const i=$L(),a={active:!1,fieldHalf:"neutral"};return{applyFrame(s){for(;n<e.length&&e[n].frame<=s.frame_number;)KL(a,e[n]),n+=1;jL(i,a,s),E_(s.team_zero.pressure,w_(i,!0)),E_(s.team_one.pressure,w_(i,!1))}}}function Cl(t){return Math.fround(t)}function sl(t,e){return Cl(Cl(t)+Cl(e))}function M_(){return{tracked_time:0,session_count:0,opponent_session_count:0,session_time:0,opponent_session_time:0,offensive_half_time:0,offensive_third_time:0,longest_session_time:0,opponent_longest_session_time:0,average_session_time:0}}function JL(t){return t.map((e,n)=>({event:e,index:n})).sort((e,n)=>e.event.end_frame!==n.event.end_frame?e.event.end_frame-n.event.end_frame:e.event.end_time!==n.event.end_time?e.event.end_time-n.event.end_time:e.index-n.index).map(({event:e})=>e)}function QL(t,e,n){t.session_count+=1,t.session_time=sl(t.session_time,n.duration),t.offensive_half_time=sl(t.offensive_half_time,n.offensive_half_time),t.offensive_third_time=sl(t.offensive_third_time,n.offensive_third_time),t.longest_session_time=Math.max(t.longest_session_time,n.duration),t.average_session_time=t.session_count===0?0:Cl(t.session_time/t.session_count),e.opponent_session_count+=1,e.opponent_session_time=sl(e.opponent_session_time,n.duration),e.opponent_longest_session_time=Math.max(e.opponent_longest_session_time,n.duration)}function T_(t,e){Object.assign(t,e)}function eN(t){const e=uy(t);for(const n of t.frames)e.applyFrame(n);return t}function uy(t){const e=JL(t.events.territorial_pressure??[]);let n=0;const i=M_(),a=M_();return{applyFrame(s){for(;n<e.length&&s.frame_number>=e[n].end_frame;){const r=e[n];QL(r.team_is_team_0?i:a,r.team_is_team_0?a:i,r),n+=1}T_(s.team_zero.territorial_pressure,i),T_(s.team_one.territorial_pressure,a)}}}function In(t,e){return Math.fround(Math.fround(t)+Math.fround(e))}function A_(t){if(!t||typeof t!="object")return String(t);const[e,n]=Object.entries(t)[0]??["Unknown","unknown"];return`${e}:${typeof n=="string"?n:JSON.stringify(n)}`}function dy(){return{active_game_time:0,tracked_time:0,time_first_man:0,time_second_man:0,time_third_man:0,time_ambiguous_role:0,time_behind_play:0,time_level_with_play:0,time_ahead_of_play:0,longest_first_man_stint_time:0,first_man_stint_count:0,became_first_man_count:0,lost_first_man_count:0,current_role_state:"unknown",current_depth_state:"unknown"}}function C_(){return{first_man_changes_for_team:0,rotation_count:0}}function R_(t){return t.map((e,n)=>({event:e,index:n})).sort((e,n)=>e.event.frame!==n.event.frame?e.event.frame-n.event.frame:e.event.time!==n.event.time?e.event.time-n.event.time:e.index-n.index).map(({event:e})=>e)}function tN(t,e){t.active=e.active,e.active||(t.firstManStintActive=!1,t.currentFirstManStintTime=0,t.nonFirstManSeconds=0);const n=t.stats;n.became_first_man_count+=e.became_first_man_count,n.lost_first_man_count+=e.lost_first_man_count,n.current_role_state=e.current_role_state,n.current_depth_state=e.current_depth_state}function nN(t,e,n){if(!t.active)return;const i=t.stats;switch(i.active_game_time=In(i.active_game_time,e.dt),i.tracked_time=In(i.tracked_time,e.dt),i.current_role_state){case"first_man":t.firstManStintActive||(t.firstManStintActive=!0,t.currentFirstManStintTime=0,i.first_man_stint_count+=1),t.currentFirstManStintTime=In(t.currentFirstManStintTime,e.dt),i.longest_first_man_stint_time=Math.max(i.longest_first_man_stint_time,t.currentFirstManStintTime),t.nonFirstManSeconds=0,i.time_first_man=In(i.time_first_man,e.dt);break;case"second_man":rl(t,e,n),i.time_second_man=In(i.time_second_man,e.dt);break;case"third_man":rl(t,e,n),i.time_third_man=In(i.time_third_man,e.dt);break;case"ambiguous":rl(t,e,n),i.time_ambiguous_role=In(i.time_ambiguous_role,e.dt);break;default:rl(t,e,n);break}switch(i.current_depth_state){case"behind_play":i.time_behind_play=In(i.time_behind_play,e.dt);break;case"level_with_play":i.time_level_with_play=In(i.time_level_with_play,e.dt);break;case"ahead_of_play":i.time_ahead_of_play=In(i.time_ahead_of_play,e.dt);break}}function rl(t,e,n){t.firstManStintActive&&(t.nonFirstManSeconds=In(t.nonFirstManSeconds,e.dt),t.nonFirstManSeconds>n&&(t.firstManStintActive=!1,t.currentFirstManStintTime=0,t.nonFirstManSeconds=0))}function iN(t,e){t.first_man_changes_for_team+=e.first_man_changes_for_team,t.rotation_count+=e.rotation_count}function aN(t,e){Object.assign(t,e??dy())}function P_(t,e){Object.assign(t,e)}function sN(t){const e=fy(t);for(const n of t.frames)e.applyFrame(n);return t}function fy(t){const e=R_(t.events.rotation_player??[]),n=R_(t.events.rotation_team??[]),i=t.config.rotation_first_man_debounce_seconds;let a=0,s=0;const r=new Map,o=C_(),l=C_();return{applyFrame(c){for(;a<e.length&&e[a].frame<=c.frame_number;){const u=e[a],d=A_(u.player),f=r.get(d)??{active:!1,firstManStintActive:!1,currentFirstManStintTime:0,nonFirstManSeconds:0,stats:dy()};r.set(d,f),tN(f,u),a+=1}for(;s<n.length&&n[s].frame<=c.frame_number;){const u=n[s];iN(u.is_team_0?o:l,u),s+=1}P_(c.team_zero.rotation,o),P_(c.team_one.rotation,l);for(const u of c.players){const d=r.get(A_(u.player_id));d&&nN(d,c,i),aN(u.rotation,d?.stats)}}}}function L_(){return{count:0,two_v_one_count:0,two_v_two_count:0,two_v_three_count:0,three_v_one_count:0,three_v_two_count:0,three_v_three_count:0}}function rN(t){return t.map((e,n)=>({event:e,index:n})).sort((e,n)=>e.event.start_frame!==n.event.start_frame?e.event.start_frame-n.event.start_frame:e.event.start_time!==n.event.start_time?e.event.start_time-n.event.start_time:e.event.end_frame!==n.event.end_frame?e.event.end_frame-n.event.end_frame:e.index-n.index).map(({event:e})=>e)}function oN(t,e){t.count+=1,e.attackers===2&&e.defenders===1?t.two_v_one_count+=1:e.attackers===2&&e.defenders===2?t.two_v_two_count+=1:e.attackers===2&&e.defenders===3?t.two_v_three_count+=1:e.attackers===3&&e.defenders===1?t.three_v_one_count+=1:e.attackers===3&&e.defenders===2?t.three_v_two_count+=1:e.attackers===3&&e.defenders===3&&(t.three_v_three_count+=1)}function N_(t,e){Object.assign(t,e)}function lN(t){const e=py(t);for(const n of t.frames)e.applyFrame(n);return t}function py(t){const e=rN(t.events.rush??[]);let n=0;const i=L_(),a=L_(),s=t.config.rush_min_possession_retained_seconds;return{applyFrame(r){for(;n<e.length&&r.frame_number>=e[n].start_frame&&r.time-e[n].start_time>=s;){const o=e[n];oN(o.is_team_0?i:a,o),n+=1}N_(r.team_zero.rush,i),N_(r.team_one.rush,a)}}}const cN=["control","hard_hit","medium_hit"],uN=["ground","high_air","low_air"],dN=["air","ground","wall"],fN=["dodge","no_dodge"];function Es(t){return Math.fround(t)}function Rl(t,e){return Es(Es(t)+Es(e))}function hy(t,e){return Es(Es(t)-Es(e))}function ol(t){if(!t||typeof t!="object")return String(t);const[e,n]=Object.entries(t)[0]??["Unknown","unknown"];return`${e}:${typeof n=="string"?n:JSON.stringify(n)}`}function pN(){return{entries:fN.flatMap(t=>uN.flatMap(e=>cN.flatMap(n=>dN.map(i=>({labels:[{key:"dodge_state",value:t},{key:"height_band",value:e},{key:"kind",value:n},{key:"surface",value:i}],count:0}))))).sort((t,e)=>JSON.stringify(t.labels).localeCompare(JSON.stringify(e.labels)))}}function my(){return{touch_count:0,control_touch_count:0,medium_hit_count:0,hard_hit_count:0,aerial_touch_count:0,high_aerial_touch_count:0,wall_touch_count:0,is_last_touch:!1,last_touch_time:null,last_touch_frame:null,time_since_last_touch:null,frames_since_last_touch:null,last_ball_speed_change:null,max_ball_speed_change:0,cumulative_ball_speed_change:0,total_ball_travel_distance:0,total_ball_advance_distance:0,total_ball_retreat_distance:0,labeled_touch_counts:pN()}}const hN=my();function I_(){return{stats:my(),labeledCountsVersion:0,labeledCountsSnapshot:void 0,labeledCountsSnapshotVersion:-1}}function D_(t){return t.map((e,n)=>({event:e,index:n})).sort((e,n)=>{const i=e.event.sample_frame??e.event.frame,a=n.event.sample_frame??n.event.frame;if(i!==a)return i-a;const s=e.event.sample_time??e.event.time,r=n.event.sample_time??n.event.time;return s!==r?s-r:e.event.frame!==n.event.frame?e.event.frame-n.event.frame:e.event.time!==n.event.time?e.event.time-n.event.time:e.index-n.index}).map(({event:e})=>e)}function mN(t){return t.map((e,n)=>({event:e,index:n})).sort((e,n)=>e.event.frame!==n.event.frame?e.event.frame-n.event.frame:e.event.time!==n.event.time?e.event.time-n.event.time:e.index-n.index).map(({event:e})=>e)}function _N(t,e){e.sort((a,s)=>a.key===s.key?a.value.localeCompare(s.value):a.key.localeCompare(s.key));const n=t.labeled_touch_counts?.entries??[];t.labeled_touch_counts={entries:n};const i=n.find(a=>a.labels.length===e.length&&a.labels.every((s,r)=>s.key===e[r]?.key&&s.value===e[r]?.value));i?i.count+=1:(n.push({labels:e,count:1}),n.sort((a,s)=>JSON.stringify(a.labels).localeCompare(JSON.stringify(s.labels))))}function gN(t){return{entries:t.entries.map(e=>({labels:e.labels.map(n=>({...n})),count:e.count}))}}function vN(t,e,n){const i=t.stats;i.touch_count+=1,e.kind==="control"?i.control_touch_count+=1:e.kind==="medium_hit"?i.medium_hit_count+=1:e.kind==="hard_hit"&&(i.hard_hit_count+=1),e.height_band==="low_air"?i.aerial_touch_count+=1:e.height_band==="high_air"&&(i.aerial_touch_count+=1,i.high_aerial_touch_count+=1),e.surface==="wall"&&(i.wall_touch_count+=1),_N(i,[{key:"kind",value:e.kind},{key:"height_band",value:e.height_band},{key:"surface",value:e.surface},{key:"dodge_state",value:e.dodge_state}]),t.labeledCountsVersion+=1,i.last_touch_time=e.time,i.last_touch_frame=e.frame,i.time_since_last_touch=Math.max(0,hy(n.time,e.time)),i.frames_since_last_touch=Math.max(0,n.frame_number-e.frame),i.last_ball_speed_change=e.ball_speed_change,i.max_ball_speed_change=Math.max(i.max_ball_speed_change,e.ball_speed_change),i.cumulative_ball_speed_change=Rl(i.cumulative_ball_speed_change,e.ball_speed_change)}function yN(t){return t.labeledCountsSnapshotVersion!==t.labeledCountsVersion&&(t.labeledCountsSnapshot=t.stats.labeled_touch_counts?gN(t.stats.labeled_touch_counts):void 0,t.labeledCountsSnapshotVersion=t.labeledCountsVersion),t.labeledCountsSnapshot}function bN(t,e){if(!e){Object.assign(t,hN);return}Object.assign(t,e.stats,{labeled_touch_counts:yN(e)})}function xN(t){const e=_y(t);for(const n of t.frames)e.applyFrame(n);return t}function _y(t){const e=D_(t.events.touch??[]),n=D_(t.events.touch_last_touch??[]),i=mN(t.events.touch_ball_movement??[]);let a=0,s=0,r=0,o=null;const l=new Map;return{applyFrame(c){if(!c.is_live_play)o=null;else{for(const u of l.values()){const d=u.stats;d.is_last_touch=!1,d.last_touch_time!=null&&(d.time_since_last_touch=Math.max(0,hy(c.time,d.last_touch_time))),d.last_touch_frame!=null&&(d.frames_since_last_touch=Math.max(0,c.frame_number-d.last_touch_frame))}for(;a<e.length&&(e[a].sample_frame??e[a].frame)<=c.frame_number;){const u=e[a],d=ol(u.player),f=l.get(d)??I_();l.set(d,f),vN(f,u,c),a+=1}for(;s<n.length&&(n[s].sample_frame??n[s].frame)<=c.frame_number;){const u=n[s];o=u.player==null?null:ol(u.player),s+=1}if(o!=null){const u=l.get(o);u&&(u.stats.is_last_touch=!0)}}for(;r<i.length&&i[r].frame<=c.frame_number;){const u=i[r],d=ol(u.player),f=l.get(d)??I_();l.set(d,f);const p=f.stats;p.total_ball_travel_distance=Rl(p.total_ball_travel_distance,u.travel_distance),p.total_ball_advance_distance=Rl(p.total_ball_advance_distance,u.advance_distance),p.total_ball_retreat_distance=Rl(p.total_ball_retreat_distance,u.retreat_distance),r+=1}for(const u of c.players)bN(u.touch,l.get(ol(u.player_id)))}}}function qu(t){if(!t||typeof t!="object")return String(t);const[e,n]=Object.entries(t)[0]??["Unknown","unknown"];return`${e}:${typeof n=="string"?n:JSON.stringify(n)}`}function xf(){return{whiff_count:0,beaten_to_ball_count:0,grounded_whiff_count:0,aerial_whiff_count:0,dodge_whiff_count:0,is_last_whiff:!1,last_whiff_time:null,last_whiff_frame:null,time_since_last_whiff:null,frames_since_last_whiff:null,last_closest_approach_distance:null,best_closest_approach_distance:null,cumulative_closest_approach_distance:0}}function SN(t){return{...t}}function wN(t){return t.map((e,n)=>({event:e,index:n})).sort((e,n)=>e.event.resolved_frame!==n.event.resolved_frame?e.event.resolved_frame-n.event.resolved_frame:e.event.resolved_time!==n.event.resolved_time?e.event.resolved_time-n.event.resolved_time:e.index-n.index).map(({event:e})=>e)}function EN(t,e,n){t.is_last_whiff=!1,t.time_since_last_whiff=t.last_whiff_time==null?null:Math.max(0,n-t.last_whiff_time),t.frames_since_last_whiff=t.last_whiff_frame==null?null:Math.max(0,e-t.last_whiff_frame)}function MN(t,e,n,i){if((e.kind??"whiff")==="beaten_to_ball"){t.beaten_to_ball_count+=1;return}t.whiff_count+=1,e.aerial?t.aerial_whiff_count+=1:t.grounded_whiff_count+=1,e.dodge_active&&(t.dodge_whiff_count+=1),t.is_last_whiff=!0,t.last_whiff_time=e.time,t.last_whiff_frame=e.frame,t.time_since_last_whiff=Math.max(0,i-e.time),t.frames_since_last_whiff=Math.max(0,n-e.frame),t.last_closest_approach_distance=e.closest_approach_distance,t.best_closest_approach_distance=t.best_closest_approach_distance==null?e.closest_approach_distance:Math.min(t.best_closest_approach_distance,e.closest_approach_distance),t.cumulative_closest_approach_distance+=e.closest_approach_distance}function k_(t,e){Object.assign(t,e??xf())}function TN(t){const e=gy(t);for(const n of t.frames)e.applyFrame(n);return t}function gy(t){const e=wN(t.events.whiff??[]);let n=0,i=null;const a=new Map,s=new Map;return{applyFrame(r){if(r.is_live_play){for(const o of a.values())EN(o,r.frame_number,r.time);for(;n<e.length&&e[n].resolved_frame<=r.frame_number;){const o=e[n],l=qu(o.player),c=a.get(l)??xf();a.set(l,c),MN(c,o,r.frame_number,r.time),(o.kind??"whiff")==="whiff"&&(i=l),n+=1}if(i!=null){const o=a.get(i);o&&(o.is_last_whiff=!0)}for(const o of r.players){const l=qu(o.player_id),c=a.get(l);k_(o.whiff,c),s.set(l,SN(c??xf()))}}else{for(const o of r.players){const l=qu(o.player_id);k_(o.whiff,s.get(l))}i=null}}}}const AN=.78;function Ms(t){return Math.fround(t)}function ll(t,e){return Ms(Ms(t)+Ms(e))}function vy(t,e){return Ms(Ms(t)-Ms(e))}function F_(t){if(!t||typeof t!="object")return String(t);const[e,n]=Object.entries(t)[0]??["Unknown","unknown"];return`${e}:${typeof n=="string"?n:JSON.stringify(n)}`}function yy(){return{count:0,high_confidence_count:0,is_last_wall_aerial:!1,last_wall_aerial_time:null,last_wall_aerial_frame:null,time_since_last_wall_aerial:null,frames_since_last_wall_aerial:null,last_confidence:null,best_confidence:0,cumulative_confidence:0,cumulative_setup_duration:0,cumulative_takeoff_to_touch_time:0,cumulative_touch_height:0}}function CN(t){return t.map((e,n)=>({event:e,index:n})).sort((e,n)=>{const i=e.event.sample_frame??e.event.frame,a=n.event.sample_frame??n.event.frame;if(i!==a)return i-a;const s=e.event.sample_time??e.event.time,r=n.event.sample_time??n.event.time;return s!==r?s-r:e.event.time!==n.event.time?e.event.time-n.event.time:e.index-n.index}).map(({event:e})=>e)}function RN(t,e,n,i){t.is_last_wall_aerial=i,t.time_since_last_wall_aerial=t.last_wall_aerial_time==null?null:Math.max(0,vy(n,t.last_wall_aerial_time)),t.frames_since_last_wall_aerial=t.last_wall_aerial_frame==null?null:Math.max(0,e-t.last_wall_aerial_frame)}function PN(t,e,n,i){t.count+=1,e.confidence>=AN&&(t.high_confidence_count+=1),t.is_last_wall_aerial=!0,t.last_wall_aerial_time=e.time,t.last_wall_aerial_frame=e.frame,t.time_since_last_wall_aerial=Math.max(0,vy(i,e.time)),t.frames_since_last_wall_aerial=Math.max(0,n-e.frame),t.last_confidence=e.confidence,t.best_confidence=Math.max(t.best_confidence,e.confidence),t.cumulative_confidence=ll(t.cumulative_confidence,e.confidence),t.cumulative_setup_duration=ll(t.cumulative_setup_duration,e.setup_duration),t.cumulative_takeoff_to_touch_time=ll(t.cumulative_takeoff_to_touch_time,e.time_since_takeoff),t.cumulative_touch_height=ll(t.cumulative_touch_height,e.player_position[2]??0)}function LN(t,e){Object.assign(t,e??yy())}function NN(t){const e=by(t);for(const n of t.frames)e.applyFrame(n);return t}function by(t){const e=CN(t.events.wall_aerial??[]);let n=0,i=null;const a=new Map;return{applyFrame(s){for(const[r,o]of a)RN(o,s.frame_number,s.time,s.is_live_play&&r===i);if(!s.is_live_play)i=null;else{for(;n<e.length&&(e[n].sample_frame??e[n].frame)<=s.frame_number;){const r=e[n],o=F_(r.player),l=a.get(o)??yy();a.set(o,l),PN(l,r,s.frame_number,s.time),i=o,n+=1}if(i!=null){const r=a.get(i);r&&(r.is_last_wall_aerial=!0)}}for(const r of s.players)LN(r.wall_aerial,a.get(F_(r.player_id)))}}}const IN=.78;function Ts(t){return Math.fround(t)}function Yu(t,e){return Ts(Ts(t)+Ts(e))}function xy(t,e){return Ts(Ts(t)-Ts(e))}function O_(t){if(!t||typeof t!="object")return String(t);const[e,n]=Object.entries(t)[0]??["Unknown","unknown"];return`${e}:${typeof n=="string"?n:JSON.stringify(n)}`}function Sy(){return{count:0,high_confidence_count:0,is_last_wall_aerial_shot:!1,last_wall_aerial_shot_time:null,last_wall_aerial_shot_frame:null,time_since_last_wall_aerial_shot:null,frames_since_last_wall_aerial_shot:null,last_confidence:null,best_confidence:0,cumulative_confidence:0,cumulative_takeoff_to_shot_time:0,cumulative_shot_height:0}}function DN(t){return t.map((e,n)=>({event:e,index:n})).sort((e,n)=>e.event.frame!==n.event.frame?e.event.frame-n.event.frame:e.event.time!==n.event.time?e.event.time-n.event.time:e.index-n.index).map(({event:e})=>e)}function kN(t,e,n,i){t.is_last_wall_aerial_shot=i,t.time_since_last_wall_aerial_shot=t.last_wall_aerial_shot_time==null?null:Math.max(0,xy(n,t.last_wall_aerial_shot_time)),t.frames_since_last_wall_aerial_shot=t.last_wall_aerial_shot_frame==null?null:Math.max(0,e-t.last_wall_aerial_shot_frame)}function FN(t,e,n,i){t.count+=1,e.confidence>=IN&&(t.high_confidence_count+=1),t.is_last_wall_aerial_shot=!0,t.last_wall_aerial_shot_time=e.time,t.last_wall_aerial_shot_frame=e.frame,t.time_since_last_wall_aerial_shot=Math.max(0,xy(i,e.time)),t.frames_since_last_wall_aerial_shot=Math.max(0,n-e.frame),t.last_confidence=e.confidence,t.best_confidence=Math.max(t.best_confidence,e.confidence),t.cumulative_confidence=Yu(t.cumulative_confidence,e.confidence),t.cumulative_takeoff_to_shot_time=Yu(t.cumulative_takeoff_to_shot_time,e.time_since_takeoff),t.cumulative_shot_height=Yu(t.cumulative_shot_height,e.player_position[2]??0)}function ON(t,e){Object.assign(t,e??Sy())}function UN(t){const e=wy(t);for(const n of t.frames)e.applyFrame(n);return t}function wy(t){const e=DN(t.events.wall_aerial_shot??[]);let n=0,i=null;const a=new Map;return{applyFrame(s){for(const[r,o]of a)kN(o,s.frame_number,s.time,s.is_live_play&&r===i);if(!s.is_live_play)i=null;else{let r=!1;for(;n<e.length&&e[n].frame<=s.frame_number;){const o=e[n],l=O_(o.player),c=a.get(l)??Sy();a.set(l,c),FN(c,o,s.frame_number,s.time),i=l,r=!0,n+=1}if(r)for(const o of a.values())o.is_last_wall_aerial_shot=!1;if(i!=null){const o=a.get(i);o&&(o.is_last_wall_aerial_shot=!0)}}for(const r of s.players)ON(r.wall_aerial_shot,a.get(O_(r.player_id)))}}}function Up(t,e){if(!e)return t;const n={...t};for(const[i,a]of Object.entries(e)){if(i==="player_id"){n[i]=a;continue}if(Array.isArray(a)){n[i]=a;continue}const s=n[i];if(a&&typeof a=="object"&&s&&typeof s=="object"&&!Array.isArray(s)){n[i]=Up(s,a);continue}n[i]=a}return n}function Fs(t){return Up({event_counts:vs(),fifty_fifty:{count:0,wins:0,losses:0,neutral_outcomes:0,kickoff_count:0,kickoff_wins:0,kickoff_losses:0,kickoff_neutral_outcomes:0,possession_after_count:0,opponent_possession_after_count:0,neutral_possession_after_count:0,kickoff_possession_after_count:0,kickoff_opponent_possession_after_count:0,kickoff_neutral_possession_after_count:0},possession:{tracked_time:0,possession_time:0,opponent_possession_time:0,neutral_time:0,labeled_time:{entries:[]}},pressure:{tracked_time:0,defensive_half_time:0,offensive_half_time:0,neutral_time:0,labeled_time:{entries:[]}},territorial_pressure:{tracked_time:0,session_count:0,opponent_session_count:0,session_time:0,opponent_session_time:0,offensive_half_time:0,offensive_third_time:0,longest_session_time:0,opponent_longest_session_time:0,average_session_time:0},rotation:{first_man_changes_for_team:0,rotation_count:0},rush:{count:0,two_v_one_count:0,two_v_two_count:0,two_v_three_count:0,three_v_one_count:0,three_v_two_count:0,three_v_three_count:0},core:{score:0,goals:0,assists:0,saves:0,shots:0,kickoff_goal_count:0,short_goal_count:0,medium_goal_count:0,long_goal_count:0,counter_attack_goal_count:0,sustained_pressure_goal_count:0,other_buildup_goal_count:0,goal_ball_air_time_sample_count:0,cumulative_goal_ball_air_time:0,last_goal_ball_air_time:null},backboard:{count:0},double_tap:{count:0},one_timer:{count:0,total_ball_speed:0,fastest_ball_speed:0},half_volley:{count:0,total_ball_speed:0,fastest_ball_speed:0},pass:{completed_pass_count:0,total_pass_distance:0,total_pass_advance:0,longest_pass_distance:0},ball_carry:{carry_count:0,total_carry_time:0,total_straight_line_distance:0,total_path_distance:0,longest_carry_time:0,furthest_carry_distance:0,fastest_carry_speed:0,carry_speed_sum:0,average_horizontal_gap_sum:0,average_vertical_gap_sum:0},air_dribble:{count:0,ground_to_air_count:0,wall_to_air_count:0,total_touch_count:0,max_touch_count:0,total_time:0,total_straight_line_distance:0,total_path_distance:0,longest_time:0,furthest_distance:0,fastest_speed:0,speed_sum:0,average_horizontal_gap_sum:0,average_vertical_gap_sum:0},boost:{tracked_time:0,boost_integral:0,time_zero_boost:0,time_hundred_boost:0,time_boost_0_25:0,time_boost_25_50:0,time_boost_50_75:0,time_boost_75_100:0,amount_collected:0,amount_collected_inactive:0,big_pads_collected_inactive:0,small_pads_collected_inactive:0,amount_stolen:0,big_pads_collected:0,small_pads_collected:0,big_pads_stolen:0,small_pads_stolen:0,amount_collected_big:0,amount_stolen_big:0,amount_collected_small:0,amount_stolen_small:0,amount_respawned:0,overfill_total:0,overfill_from_stolen:0,amount_used:0,amount_used_while_grounded:0,amount_used_while_airborne:0,amount_used_while_supersonic:0},movement:{tracked_time:0,total_distance:0,speed_integral:0,time_slow_speed:0,time_boost_speed:0,time_supersonic_speed:0,time_on_ground:0,time_low_air:0,time_high_air:0,labeled_tracked_time:{entries:[]}},powerslide:{total_duration:0,press_count:0},demo:{demos_inflicted:0},bump:{bumps_inflicted:0,team_bumps_inflicted:0}},t)}function Bp(t){return Up({event_counts:vs(),player_id:{Steam:"test-player"},name:"Test Player",is_team_0:!0,core:{score:0,goals:0,assists:0,saves:0,shots:0,goals_conceded_while_last_defender:0,goals_for_while_most_back:0,goals_against_while_most_back:0,goal_against_boost_sample_count:0,cumulative_boost_on_goals_against:0,last_boost_on_goal_against:null,goal_against_boost_leadup_sample_count:0,cumulative_average_boost_in_goal_against_leadup:0,cumulative_min_boost_in_goal_against_leadup:0,last_average_boost_in_goal_against_leadup:null,last_min_boost_in_goal_against_leadup:null,goal_against_position_sample_count:0,cumulative_goal_against_position_x:0,cumulative_goal_against_position_y:0,cumulative_goal_against_position_z:0,last_goal_against_position:null,scoring_goal_last_touch_position_sample_count:0,cumulative_scoring_goal_last_touch_position_x:0,cumulative_scoring_goal_last_touch_position_y:0,cumulative_scoring_goal_last_touch_position_z:0,last_scoring_goal_last_touch_position:null,kickoff_goal_count:0,short_goal_count:0,medium_goal_count:0,long_goal_count:0,counter_attack_goal_count:0,sustained_pressure_goal_count:0,other_buildup_goal_count:0,goal_ball_air_time_sample_count:0,cumulative_goal_ball_air_time:0,last_goal_ball_air_time:null},backboard:{count:0,is_last_backboard:!1,last_backboard_time:null,last_backboard_frame:null,time_since_last_backboard:null,frames_since_last_backboard:null},ceiling_shot:{count:0,high_confidence_count:0,is_last_ceiling_shot:!1,last_ceiling_shot_time:null,last_ceiling_shot_frame:null,time_since_last_ceiling_shot:null,frames_since_last_ceiling_shot:null,last_confidence:null,best_confidence:0,cumulative_confidence:0},wall_aerial:{count:0,high_confidence_count:0,is_last_wall_aerial:!1,last_wall_aerial_time:null,last_wall_aerial_frame:null,time_since_last_wall_aerial:null,frames_since_last_wall_aerial:null,last_confidence:null,best_confidence:0,cumulative_confidence:0,cumulative_setup_duration:0,cumulative_takeoff_to_touch_time:0,cumulative_touch_height:0},wall_aerial_shot:{count:0,high_confidence_count:0,is_last_wall_aerial_shot:!1,last_wall_aerial_shot_time:null,last_wall_aerial_shot_frame:null,time_since_last_wall_aerial_shot:null,frames_since_last_wall_aerial_shot:null,last_confidence:null,best_confidence:0,cumulative_confidence:0,cumulative_takeoff_to_shot_time:0,cumulative_shot_height:0},double_tap:{count:0,is_last_double_tap:!1,last_double_tap_time:null,last_double_tap_frame:null,time_since_last_double_tap:null,frames_since_last_double_tap:null},one_timer:{count:0,total_ball_speed:0,fastest_ball_speed:0,total_pass_distance:0,is_last_one_timer:!1,last_one_timer_time:null,last_one_timer_frame:null,time_since_last_one_timer:null,frames_since_last_one_timer:null},pass:{completed_pass_count:0,received_pass_count:0,total_pass_distance:0,total_pass_advance:0,longest_pass_distance:0,is_last_completed_pass:!1,last_completed_pass_time:null,last_completed_pass_frame:null,time_since_last_completed_pass:null,frames_since_last_completed_pass:null},fifty_fifty:{count:0,wins:0,losses:0,neutral_outcomes:0,kickoff_count:0,kickoff_wins:0,kickoff_losses:0,kickoff_neutral_outcomes:0,possession_after_count:0,kickoff_possession_after_count:0},speed_flip:{count:0,high_confidence_count:0,is_last_speed_flip:!1,last_speed_flip_time:null,last_speed_flip_frame:null,time_since_last_speed_flip:null,frames_since_last_speed_flip:null,last_quality:null,best_quality:0,cumulative_quality:0},half_flip:{count:0,high_confidence_count:0,is_last_half_flip:!1,last_half_flip_time:null,last_half_flip_frame:null,time_since_last_half_flip:null,frames_since_last_half_flip:null,last_quality:null,best_quality:0,cumulative_quality:0},half_volley:{count:0,total_ball_speed:0,fastest_ball_speed:0,is_last_half_volley:!1,last_half_volley_time:null,last_half_volley_frame:null,time_since_last_half_volley:null,frames_since_last_half_volley:null},wavedash:{count:0,high_confidence_count:0,is_last_wavedash:!1,last_wavedash_time:null,last_wavedash_frame:null,time_since_last_wavedash:null,frames_since_last_wavedash:null,last_quality:null,best_quality:0,cumulative_quality:0},touch:{touch_count:0,control_touch_count:0,medium_hit_count:0,hard_hit_count:0,aerial_touch_count:0,high_aerial_touch_count:0,wall_touch_count:0,is_last_touch:!1,last_touch_time:null,last_touch_frame:null,time_since_last_touch:null,frames_since_last_touch:null,last_ball_speed_change:null,max_ball_speed_change:0,cumulative_ball_speed_change:0,total_ball_travel_distance:0,total_ball_advance_distance:0,total_ball_retreat_distance:0,labeled_touch_counts:{entries:[]}},whiff:{whiff_count:0,beaten_to_ball_count:0,grounded_whiff_count:0,aerial_whiff_count:0,dodge_whiff_count:0,is_last_whiff:!1,last_whiff_time:null,last_whiff_frame:null,time_since_last_whiff:null,frames_since_last_whiff:null,last_closest_approach_distance:null,best_closest_approach_distance:null,cumulative_closest_approach_distance:0},flick:{count:0,high_confidence_count:0,is_last_flick:!1,last_flick_time:null,last_flick_frame:null,time_since_last_flick:null,frames_since_last_flick:null,last_confidence:null,best_confidence:0,cumulative_confidence:0,cumulative_setup_duration:0,cumulative_ball_speed_change:0},musty_flick:{count:0,aerial_count:0,high_confidence_count:0,is_last_musty:!1,last_musty_time:null,last_musty_frame:null,time_since_last_musty:null,frames_since_last_musty:null,last_confidence:null,best_confidence:0,cumulative_confidence:0},dodge_reset:{count:0,on_ball_count:0},ball_carry:{carry_count:0,total_carry_time:0,total_straight_line_distance:0,total_path_distance:0,longest_carry_time:0,furthest_carry_distance:0,fastest_carry_speed:0,carry_speed_sum:0,average_horizontal_gap_sum:0,average_vertical_gap_sum:0},air_dribble:{count:0,ground_to_air_count:0,wall_to_air_count:0,total_touch_count:0,max_touch_count:0,total_time:0,total_straight_line_distance:0,total_path_distance:0,longest_time:0,furthest_distance:0,fastest_speed:0,speed_sum:0,average_horizontal_gap_sum:0,average_vertical_gap_sum:0},boost:Fs().boost,movement:Fs().movement,positioning:{active_game_time:0,tracked_time:0,sum_distance_to_teammates:0,sum_distance_to_ball:0,sum_distance_to_ball_has_possession:0,time_has_possession:0,sum_distance_to_ball_no_possession:0,time_no_possession:0,time_demolished:0,time_no_teammates:0,time_most_back:0,time_most_forward:0,time_mid_role:0,time_other_role:0,time_defensive_third:0,time_neutral_third:0,time_offensive_third:0,time_defensive_half:0,time_offensive_half:0,time_closest_to_ball:0,time_farthest_from_ball:0,time_behind_ball:0,time_level_with_ball:0,time_in_front_of_ball:0,times_caught_ahead_of_play_on_conceded_goals:0},rotation:{active_game_time:0,tracked_time:0,time_first_man:0,time_second_man:0,time_third_man:0,time_ambiguous_role:0,time_behind_play:0,time_level_with_play:0,time_ahead_of_play:0,longest_first_man_stint_time:0,first_man_stint_count:0,became_first_man_count:0,lost_first_man_count:0,current_role_state:"unknown",current_depth_state:"unknown"},powerslide:{total_duration:0,press_count:0},demo:{demos_inflicted:0,demos_taken:0},bump:{bumps_inflicted:0,bumps_taken:0,team_bumps_inflicted:0,team_bumps_taken:0,last_bump_time:null,last_bump_frame:null,last_bump_strength:null,max_bump_strength:0,cumulative_bump_strength:0}},t)}const BN=300,zN=1200,HN=2,VN=[{id:"event-counts",playerModules:["event_counts"],teamModules:["event_counts"],apply:p0,createFrameAccumulator:h0},{id:"boost-ledger",playerModules:["boost"],teamModules:["boost"],apply:BP,createFrameAccumulator:T0},{id:"core",playerModules:["core"],teamModules:["core"],apply:QP,createFrameAccumulator:L0},{id:"possession",playerModules:[],teamModules:["possession"],apply:DL,createFrameAccumulator:ay},{id:"pressure",playerModules:[],teamModules:["pressure"],apply:ZL,createFrameAccumulator:cy},{id:"territorial-pressure",playerModules:[],teamModules:["territorial_pressure"],apply:eN,createFrameAccumulator:uy},{id:"movement",playerModules:["movement"],teamModules:["movement"],apply:sL,createFrameAccumulator:j0},{id:"positioning",playerModules:["positioning"],teamModules:[],apply:zL,createFrameAccumulator:ry},{id:"rotation",playerModules:["rotation"],teamModules:["rotation"],apply:sN,createFrameAccumulator:fy},{id:"mechanics",playerModules:["speed_flip","half_flip","wavedash"],teamModules:[],apply:j2,createFrameAccumulator:K0},{id:"whiff",playerModules:["whiff"],teamModules:[],apply:TN,createFrameAccumulator:gy},{id:"backboard",playerModules:["backboard"],teamModules:["backboard"],apply:mP,createFrameAccumulator:_0},{id:"double-tap",playerModules:["double_tap"],teamModules:["double_tap"],apply:l2,createFrameAccumulator:k0},{id:"demo",playerModules:["demo"],teamModules:["demo"],apply:d2,createFrameAccumulator:O0},{id:"fifty-fifty",playerModules:["fifty_fifty"],teamModules:["fifty_fifty"],apply:b2,createFrameAccumulator:U0},{id:"bump",playerModules:["bump"],teamModules:["bump"],apply:wP,createFrameAccumulator:x0},{id:"rush",playerModules:[],teamModules:["rush"],apply:lN,createFrameAccumulator:py},{id:"pass",playerModules:["pass"],teamModules:["pass"],apply:TL,createFrameAccumulator:ny},{id:"one-timer",playerModules:["one_timer"],teamModules:["one_timer"],apply:bL,createFrameAccumulator:ty},{id:"ball-carry",playerModules:["ball_carry","air_dribble"],teamModules:["ball_carry","air_dribble"],apply:gP,createFrameAccumulator:b0},{id:"wall-aerial",playerModules:["wall_aerial"],teamModules:[],apply:NN,createFrameAccumulator:by},{id:"wall-aerial-shot",playerModules:["wall_aerial_shot"],teamModules:[],apply:UN,createFrameAccumulator:wy},{id:"flick",playerModules:["flick"],teamModules:[],apply:P2,createFrameAccumulator:H0},{id:"ceiling-shot",playerModules:["ceiling_shot"],teamModules:[],apply:jP,createFrameAccumulator:R0},{id:"musty-flick",playerModules:["musty_flick"],teamModules:[],apply:mL,createFrameAccumulator:Q0},{id:"dodge-reset",playerModules:["dodge_reset"],teamModules:[],apply:i2,createFrameAccumulator:I0},{id:"powerslide",playerModules:["powerslide"],teamModules:["powerslide"],apply:GL,createFrameAccumulator:oy},{id:"touch",playerModules:["touch"],teamModules:[],apply:xN,createFrameAccumulator:_y},{id:"half-volley",playerModules:["half_volley"],teamModules:["half_volley"],apply:k2,createFrameAccumulator:W0}];function GN(t,e,n={}){const i=t.frames,a=new Map(i.map((p,_)=>[p.frame_number,_])),s=new Map,r={...t,frames:[]},o=VN.flatMap(p=>p.createFrameAccumulator?[p.createFrameAccumulator(r)]:[]),l=Math.max(1,n.materializationChunkSize??BN),c=Math.max(l,n.maxMaterializationChunkSize??zN);let u=-1,d=l;const f=p=>{if(p<=u)return;const _=Math.min(i.length-1,Math.max(p,u+d));for(let g=u+1;g<=_;g+=1){const m=i[g],h=m?XN(WN(m)):void 0;if(h){for(const b of o)b.applyFrame(h);s.set(h.frame_number,h)}}u=_,d=Math.min(c,i.length,d*HN)};return{get(p){const _=a.get(p);if(_!==void 0)return f(_),s.get(p)}}}function $N(t){return!t||typeof t!="object"?t:{...t}}function WN(t){return{...t,team_zero:{...t.team_zero},team_one:{...t.team_one},players:t.players.map(e=>({...e,player_id:$N(e.player_id)}))}}function XN(t){return{...t,team_zero:Fs(t.team_zero??{}),team_one:Fs(t.team_one??{}),players:t.players.map(n=>Bp(n))}}const qN=new Set(["is_team_0","name","player_id"]);function U_(t){return!!t&&typeof t=="object"&&!Array.isArray(t)&&Object.keys(t).length===0}function YN(t){return!t||typeof t!="object"||Array.isArray(t)?!1:Object.keys(t).every(e=>qN.has(e))}function KN(t){return U_(t.team_zero)&&U_(t.team_one)&&t.players.every(e=>YN(e))}function jN(t){return new Map(p0(t).frames.map(e=>[e.frame_number,e]))}function Ey(t,e,n){const i=t.frames.filter(a=>KN(a)).length;if(i===t.frames.length)return GN(t,e,n);if(i>0)throw new Error("stats timeline frames must be either all compact scaffolds or all materialized snapshots");return jN(t)}function wt(t,e){return t.get(e)??null}const zp=[{stage:"validating",index:1,total:9,label:"Parse replay",start:0,end:.08},{stage:"processing",index:2,total:9,label:"Process replay frames",start:.08,end:.62},{stage:"building-stats",index:3,total:9,label:"Build stats events",start:.62,end:.7},{stage:"serializing-replay",index:4,total:9,label:"Serialize replay data",start:.7,end:.76},{stage:"serializing-stats",index:5,total:9,label:"Serialize stats timeline",start:.76,end:.86},{stage:"normalizing",index:6,total:9,label:"Normalize replay model",start:.86,end:.91},{stage:"decoding-replay",index:7,total:9,label:"Decode replay data",start:.91,end:.94},{stage:"decoding-stats",index:8,total:9,label:"Decode stats chunks",start:.94,end:.96},{stage:"deriving-stats",index:9,total:9,label:"Derive stats snapshots",start:.96,end:1}];function My(t){return Math.max(0,Math.min(1,t))}function Ku(t,e,n){if(t!==void 0)return My((t-e)/(n-e))}function Hp(t){if(t.stage!=="stats-timeline")return t;const e=t.progress;return e===void 0?{...t,stage:"building-stats"}:e<.35?{...t,stage:"building-stats",progress:Ku(e,0,.35)}:e<.55?{...t,stage:"serializing-replay",progress:Ku(e,.35,.55)}:{...t,stage:"serializing-stats",progress:Ku(e,.55,.92)}}function Ty(t){const e=Hp(t);return zp.find(n=>n.stage===e.stage)}function ZN(){return zp.map(({stage:t,index:e,total:n,label:i})=>({stage:t,index:e,total:n,label:i}))}function JN(t){const e=Ty(t);return{stage:e.stage,index:e.index,total:e.total,label:e.label}}function QN(t){const e=Hp(t),n=Ty(e);return zp.map(({stage:i,index:a,total:s,label:r})=>{if(a<n.index)return{stage:i,index:a,total:s,label:r,state:"complete",completion:1,indeterminate:!1};if(a>n.index)return{stage:i,index:a,total:s,label:r,state:"pending",completion:0,indeterminate:!1};const o=e.progress!==void 0;return{stage:i,index:a,total:s,label:r,state:"active",completion:o?My(e.progress??0):1,indeterminate:!o}})}function Xs(t){const e=Hp(t),n=e.progress===void 0?null:Math.round(e.progress*100);switch(e.stage){case"validating":return"Parsing replay...";case"processing":return n!==null&&e.totalFrames!==void 0?`Processing replay frames... ${n}% (${e.processedFrames??0}/${e.totalFrames})`:"Processing replay frames...";case"building-stats":return n!==null?e.totalFrames!==void 0?`Building stats events... ${n}% (${e.processedFrames??0}/${e.totalFrames})`:`Building stats events... ${n}%`:"Building stats events...";case"serializing-replay":return n!==null?`Serializing replay data... ${n}%`:"Serializing replay data...";case"serializing-stats":return n!==null?`Serializing stats timeline... ${n}%`:"Serializing stats timeline...";case"decoding-replay":return n!==null?`Decoding replay data... ${n}%`:"Decoding replay data...";case"decoding-stats":return n!==null?e.totalChunks!==void 0?`Decoding stats chunks... ${n}% (${e.processedChunks??0}/${e.totalChunks})`:`Decoding stats chunks... ${n}%`:"Decoding stats chunks...";case"deriving-stats":return n!==null?`Deriving stats snapshots... ${n}%`:"Deriving stats snapshots...";case"normalizing":return n!==null?`Normalizing replay model... ${n}%`:"Normalizing replay model...";default:return"Loading replay..."}}function gr(t,e){return JSON.parse(t.decode(new Uint8Array(e)))}async function eI(t,e,n){n?.({stage:"decoding-stats",progress:0});const i=gr(t,e.configBuffer);n?.({stage:"decoding-stats",progress:.05}),await ds();const a=gr(t,e.replayMetaBuffer);n?.({stage:"decoding-stats",progress:.1}),await ds();const s=gr(t,e.eventsBuffer);n?.({stage:"decoding-stats",progress:.15}),await ds();const r=[],o=e.frameChunkBuffers.length;for(let l=0;l<o;l+=1){const c=e.frameChunkBuffers[l];r.push(...gr(t,c)),n?.({stage:"decoding-stats",processedChunks:l+1,totalChunks:o,progress:.15+(l+1)/Math.max(1,o)*.85}),await ds()}return o===0&&n?.({stage:"decoding-stats",progress:1}),{config:i,replay_meta:a,events:s,frames:r}}function ds(){return typeof requestAnimationFrame!="function"?Promise.resolve():new Promise(t=>requestAnimationFrame(()=>t()))}async function Rc(t,e={}){if(typeof Worker>"u")throw new Error("Replay loading worker is not available in this environment");const n=new Worker(new URL(""+new URL("replayLoader.worker-4Lxy11fY.js",import.meta.url).href,import.meta.url),{type:"module"}),i=t.slice(),a=e.reportEveryNFrames??100;return new Promise((s,r)=>{const o=()=>{n.terminate()};n.onmessage=async c=>{const u=c.data;if(u.type==="progress"){e.onProgress?.(u.progress);return}if(u.type==="error"){o(),r(new Error(u.error));return}o();const d=new TextDecoder;e.onProgress?.({stage:"decoding-replay",progress:0}),await ds();const f=gr(d,u.replayBuffer);e.onProgress?.({stage:"decoding-replay",progress:1}),await ds();const p=await eI(d,u.statsTimelineParts,e.onProgress),_=Ey(p);s({replay:f,statsTimeline:p,statsFrameLookup:_})},n.onerror=c=>{o(),r(new Error(c.message||"Replay loading worker failed"))};const l={type:"load-replay",bytes:i.buffer,reportEveryNFrames:a};n.postMessage(l,[i.buffer])})}function tI(t){const e=document.createElement("div");e.className="replay-load-modal",e.hidden=!0;const n=document.createElement("div");n.className="replay-load-modal__dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.setAttribute("aria-labelledby","replay-load-modal-title");const i=document.createElement("p");i.className="replay-load-modal__eyebrow",i.textContent="Replay loading";const a=document.createElement("h2");a.id="replay-load-modal-title",a.className="replay-load-modal__title",a.textContent="Preparing replay pipeline";const s=document.createElement("p");s.className="replay-load-modal__status",s.textContent="Preparing replay...";const r=document.createElement("div");r.className="replay-load-modal__phase-list";const o=new Map;for(const p of ZN()){const _=document.createElement("div");_.className="replay-load-modal__phase-row",_.dataset.state="pending";const g=document.createElement("p");g.className="replay-load-modal__phase-label",g.textContent=`${p.index}. ${p.label}`;const m=document.createElement("div");m.className="replay-load-modal__phase-bar";const h=document.createElement("div");h.className="replay-load-modal__phase-fill",h.dataset.indeterminate="false",m.append(h),_.append(g,m),r.append(_),o.set(p.stage,{row:_,fill:h})}const l=document.createElement("p");l.className="replay-load-modal__meta",n.append(i,a,s,r,l),e.append(n),t.append(e);let c="";const u=()=>{for(const{row:p,fill:_}of o.values())p.dataset.state="pending",_.style.width="0%",_.dataset.indeterminate="false"},d=p=>{for(const _ of QN(p)){const g=o.get(_.stage);g&&(g.row.dataset.state=_.state,g.fill.dataset.indeterminate=_.indeterminate?"true":"false",g.fill.style.width=`${Math.round(_.completion*100)}%`)}},f=p=>{e.hidden=!p};return{show(p,_="Preparing replay..."){c=p,f(!0),u(),a.textContent="Preparing replay pipeline",s.textContent=_,l.textContent=`Loading ${p}`},update(p){f(!0);const _=JN(p);if(d(p),a.textContent=`Phase ${_.index} of ${_.total}: ${_.label}`,s.textContent=Xs(p),p.stage==="processing"&&p.totalFrames!==void 0){l.textContent=`${p.processedFrames??0}/${p.totalFrames} frames`;return}if(p.stage==="decoding-stats"&&p.totalChunks!==void 0){l.textContent=`${p.processedChunks??0}/${p.totalChunks} chunks`;return}l.textContent=c?`Loading ${c}`:""},hide(){f(!1)},destroy(){e.remove()}}}const nI=236,Yr=4120,iI=2300,aI=16185075,sI=.18,rI=1118481,Pl=5882879,Ll=16761180,oI=.55,ju=.12,B_=.28,lI=3,cI=4,z_=5,H_=2,uI=6,dI=856343,fI=.42,pI=18,hI=.24,mI=10,V_=220,_I=200,Ay=140,gI=220,vI=100,yI=120;function bI(t){const e=_I/2;if(t){const a=-Yr+V_,s=-e;return{minX:a,maxX:s,centerX:(a+s)/2,width:s-a}}const n=e,i=Yr-V_;return{minX:n,maxX:i,centerX:(n+i)/2,width:i-n}}function xI(t,e,n){if(t.length<2)return[];const i=Math.min(...t),a=Math.max(...t),s=a-i,r=e?-1:1,o=-r;return s<=n?[{kind:"other",centerY:(i+a)/2,halfDepth:Math.max(n-s/2,n*.35),directions:[r,o]}]:[{kind:"back",centerY:e?i:a,halfDepth:n,directions:[r]},{kind:"forward",centerY:e?a:i,halfDepth:n,directions:[o]}]}function SI(t,e){const n=new Ap;return n.moveTo(0,e/2),n.lineTo(t/2,-e/2),n.lineTo(-t/2,-e/2),n.closePath(),new Ac(n)}function G_(t){const e=vI*t,n=new st({color:rI,transparent:!0,opacity:.9,side:Qe,depthWrite:!1,depthTest:!1}),i=new _t;i.visible=!1;const a=new an(Ay*.55*t,1),s=new He(a,n);s.position.z=z_,s.renderOrder=22,i.add(s);const r=SI(yI*t,e),o=new He(r,n);return o.position.z=z_,o.renderOrder=23,i.add(o),{group:i,shaftGeom:a,shaftMesh:s,headGeom:r,headMesh:o,material:n,headLength:e}}function Zu(t,e,n,i){const a=Math.max(n-t.headLength,t.headLength*.2);t.group.position.x=e,t.group.rotation.z=i>0?0:Math.PI,t.shaftMesh.scale.y=a,t.shaftMesh.position.y=-t.headLength/2,t.headMesh.position.y=n/2-t.headLength/2,t.group.visible=!0}function tc(t){t.group.visible=!1}function rs(t,e){const n=new _t;n.visible=!1;const i=new st({color:aI,transparent:!0,opacity:sI,side:Qe,depthWrite:!1,depthTest:!1}),a=new an(1,1),s=new He(a,i);s.position.z=lI,s.renderOrder=20,n.add(s);const r=new st({color:e,transparent:!0,opacity:oI,side:Qe,depthWrite:!1,depthTest:!1}),o=new an(1,1),l=new He(o,r);l.position.z=cI,l.renderOrder=21,n.add(l);const c=G_(t),u=G_(t);return n.add(c.group),n.add(u.group),{group:n,floorGeom:a,floorMesh:s,floorMaterial:i,stripeGeom:o,stripeMesh:l,stripeMaterial:r,primaryMarker:c,secondaryMarker:u}}function wI(t){t.group.visible=!1,tc(t.primaryMarker),tc(t.secondaryMarker)}function EI(t,e,n,i){const a=e.halfDepth*2*i,s=Yr*2*i,r=n.width*i,o=n.centerX*i,l=Ay*i,c=Math.max(a-32*i,t.primaryMarker.headLength*1.15),u=Math.min(c,Math.max(gI*i,a*.6));if(t.group.position.y=e.centerY*i,t.floorMesh.position.x=0,t.floorMesh.scale.set(s,a,1),t.stripeMesh.position.x=o,t.stripeMesh.scale.set(l,a,1),tc(t.primaryMarker),tc(t.secondaryMarker),e.directions.length===1)Zu(t.primaryMarker,o,u,e.directions[0]);else{const d=r*.18;Zu(t.primaryMarker,o-d,u,e.directions[0]),Zu(t.secondaryMarker,o+d,u,e.directions[1])}t.group.visible=!0}function $_(t){t.group.removeFromParent(),t.shaftGeom.dispose(),t.headGeom.dispose(),t.material.dispose()}class MI{replay;blueBack;blueForward;blueOther;orangeBack;orangeForward;orangeOther;constructor(e,n,i){this.replay=n,this.blueBack=rs(i,Pl),this.blueForward=rs(i,Pl),this.blueOther=rs(i,Pl),this.orangeBack=rs(i,Ll),this.orangeForward=rs(i,Ll),this.orangeOther=rs(i,Ll);for(const a of this.getZones())e.add(a.group)}update(e,n){const{frameIndex:i}=e,a=nI;for(const s of[!0,!1]){const r=this.replay.players.filter(d=>d.isTeamZero===s).length,o=[];for(const d of this.replay.players){if(d.isTeamZero!==s)continue;const f=d.frames[i];f?.position&&o.push(f.position.y)}const l=bI(s),c=this.getTeamZones(s);for(const d of c.values())wI(d);if(r<2||o.length!==r)continue;const u=xI(o,s,a);for(const d of u){const f=c.get(d.kind);f&&EI(f,d,l,n)}}}dispose(){for(const e of this.getZones())e.group.removeFromParent(),e.floorGeom.dispose(),e.floorMaterial.dispose(),e.stripeGeom.dispose(),e.stripeMaterial.dispose(),$_(e.primaryMarker),$_(e.secondaryMarker)}getTeamZones(e){return e?new Map([["back",this.blueBack],["forward",this.blueForward],["other",this.blueOther]]):new Map([["back",this.orangeBack],["forward",this.orangeForward],["other",this.orangeOther]])}getZones(){return[this.blueBack,this.blueForward,this.blueOther,this.orangeBack,this.orangeForward,this.orangeOther]}}function TI(t){return t==null||Number.isNaN(t)?null:t<0?"team-zero":"team-one"}class AI{group;teamZeroSide;teamOneSide;constructor(e,n){this.group=new _t,this.teamZeroSide=this.createHalfFieldSide(Pl),this.teamOneSide=this.createHalfFieldSide(Ll);const i=Yr*n,a=5120*n;this.teamZeroSide.mesh.position.set(0,-a/2,H_),this.teamZeroSide.mesh.scale.set(i*2,a,1),this.teamOneSide.mesh.position.set(0,a/2,H_),this.teamOneSide.mesh.scale.set(i*2,a,1),this.group.add(this.teamZeroSide.mesh),this.group.add(this.teamOneSide.mesh),e.add(this.group)}update(e){const n=TI(e);this.teamZeroSide.material.opacity=n==="team-zero"?B_:ju,this.teamOneSide.material.opacity=n==="team-one"?B_:ju}dispose(){this.group.removeFromParent(),this.teamZeroSide.mesh.geometry.dispose(),this.teamZeroSide.material.dispose(),this.teamOneSide.mesh.geometry.dispose(),this.teamOneSide.material.dispose()}createHalfFieldSide(e){const n=new an(1,1),i=new st({color:e,transparent:!0,opacity:ju,side:Qe,depthWrite:!1,depthTest:!1}),a=new He(n,i);return a.renderOrder=18,{mesh:a,material:i}}}function CI(t,e){const n=new _t,i=Yr*2*e,a=(s,r,o)=>{const l=new an(i,r*e),c=new st({color:dI,transparent:!0,opacity:o,side:Qe,depthWrite:!1,depthTest:!1}),u=new He(l,c);return u.position.set(0,s,uI),u.renderOrder=24,u};for(const s of[-1,1]){const r=s*iI*e;n.add(a(r,pI,fI))}return n.add(a(0,mI,hI)),t.add(n),n}function Pt(t){return t===void 0||Number.isNaN(t)?"?":`${Math.round(t)}`}function Sf(t,e,n=1){return t===void 0||e===void 0||Number.isNaN(t)||Number.isNaN(e)||e<=0?"?":`${(t*100/e).toFixed(n)}%`}function Ln(t,e){return`<div class="stat-row"><span class="label">${t}</span><span class="value">${e}</span></div>`}function RI(t,e){return`
      ${Ln("50s",Pt(t?.count))}
      ${Ln("Blue wins",`${Pt(t?.wins)} (${Sf(t?.wins,t?.count)})`)}
      ${Ln("Orange wins",`${Pt(t?.losses)} (${Sf(t?.losses,t?.count)})`)}
      ${Ln("Neutral",Pt(t?.neutral_outcomes))}
      ${Ln("Blue poss after",Pt(t?.possession_after_count))}
      ${Ln("Orange poss after",Pt(t?.opponent_possession_after_count))}
      ${Ln("Kickoff 50s",Pt(t?.kickoff_count))}
      ${Ln("Blue kickoff wins",Pt(t?.kickoff_wins))}
      ${Ln("Orange kickoff wins",Pt(t?.kickoff_losses))}
      ${Ln("Blue kickoff poss",Pt(t?.kickoff_possession_after_count))}
      ${Ln("Orange kickoff poss",Pt(t?.kickoff_opponent_possession_after_count))}
    `}function W_(t){return`
    <div class="stat-row"><span class="label">50s</span><span class="value">${Pt(t?.count)}</span></div>
    <div class="stat-row"><span class="label">Wins</span><span class="value">${Pt(t?.wins)} (${Sf(t?.wins,t?.count)})</span></div>
    <div class="stat-row"><span class="label">Losses</span><span class="value">${Pt(t?.losses)}</span></div>
    <div class="stat-row"><span class="label">Neutral</span><span class="value">${Pt(t?.neutral_outcomes)}</span></div>
    <div class="stat-row"><span class="label">Poss after</span><span class="value">${Pt(t?.possession_after_count)}</span></div>
    <div class="stat-row"><span class="label">Kickoff 50s</span><span class="value">${Pt(t?.kickoff_count)}</span></div>
    <div class="stat-row"><span class="label">Kickoff wins</span><span class="value">${Pt(t?.kickoff_wins)}</span></div>
    <div class="stat-row"><span class="label">Kickoff poss</span><span class="value">${Pt(t?.kickoff_possession_after_count)}</span></div>
  `}function PI(t,e=1,n=""){return t===void 0||Number.isNaN(t)?"?":`${t.toFixed(e)}${n}`}function LI(t,e,n=1){return t===void 0||e===void 0||Number.isNaN(t)||Number.isNaN(e)||e<=0?"?":`${(t*100/e).toFixed(n)}%`}function X_(t,e,n=1){if(t===void 0||Number.isNaN(t))return"?";const i=LI(t,e,n);return i==="?"?`${t.toFixed(n)}s`:`${t.toFixed(n)}s (${i})`}function q_(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function wf(t,e){return`<div class="stat-row"><span class="label">${q_(t)}</span><span class="value">${q_(e)}</span></div>`}function NI(t){const e=new Set,n=[];for(const i of t??[])e.has(i)||(e.add(i),n.push(i));return n}function Cy(t,e){return t==="neutral"?"Neutral":e.kind==="shared"?t==="own"?"Blue control":"Orange control":t==="own"?"Team control":"Opp control"}function Ef(t){return t.kind==="shared"?["own","neutral","opponent"]:["own","neutral","opponent"]}function II(t,e){return t==="neutral_third"?"Neutral third":e.kind==="shared"?t==="defensive_third"?"Blue third":"Orange third":t==="defensive_third"?"Own third":"Opp third"}function DI(t){return t.kind==="shared"?["defensive_third","neutral_third","offensive_third"]:["defensive_third","neutral_third","offensive_third"]}function kI(t,e,n,i){for(const a of n){const s=a==="possession_state"?Ef(i):DI(i),r=s.indexOf(t[a]),o=s.indexOf(e[a]),l=r===-1?Number.MAX_SAFE_INTEGER:r,c=o===-1?Number.MAX_SAFE_INTEGER:o;if(l!==c)return l-c}return 0}function FI(t,e,n){const i=(a,s)=>a==="possession_state"?Cy(s,n):II(s,n);if(e.length===1){const a=e[0];return i(a,t[a])}return e.map(a=>i(a,t[a])).join(" / ")}function OI(t,e,n,i){if(e.length===0)return"";const a=new Map;if(t?.labeled_time?.entries?.length)for(const s of t.labeled_time.entries){const r=new Map(s.labels.map(d=>[d.key,d.value])),o={};let l=!0;for(const d of e){const f=r.get(d);if(f===void 0){l=!1;break}o[d]=f}if(!l)continue;const c=e.map(d=>`${d}:${o[d]}`).join("|"),u=a.get(c);u?u.total+=s.value:a.set(c,{values:o,total:s.value})}if(a.size===0&&e.length===1&&e[0]==="possession_state"){const s=new Map;return t&&(s.set("own",t.possession_time),s.set("neutral",t.neutral_time??0),s.set("opponent",t.opponent_possession_time)),Ef(i).some(r=>(s.get(r)??0)>0)?Ef(i).filter(r=>s.has(r)).map(r=>wf(Cy(r,i),X_(s.get(r),n))).join(""):""}return[...a.values()].sort((s,r)=>kI(s.values,r.values,e,i)).map(s=>wf(FI(s.values,e,i),X_(s.total,n))).join("")}function Y_(t,e){const n=t?.tracked_time,i=NI(e.breakdownClasses),a=OI(t,i,n,e.labelPerspective);return`
    ${wf("Tracked",PI(n,1,"s"))}
    ${a}
  `}function UI(t,e=1,n=""){return t===void 0||Number.isNaN(t)?"?":`${t.toFixed(e)}${n}`}function BI(t,e,n=1){return t===void 0||e===void 0||Number.isNaN(t)||Number.isNaN(e)||e<=0?"?":`${(t*100/e).toFixed(n)}%`}function zI(t,e,n=1){if(t===void 0||Number.isNaN(t))return"?";const i=BI(t,e,n);return i==="?"?`${t.toFixed(n)}s`:`${t.toFixed(n)}s (${i})`}function K_(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Ry(t,e){return`<div class="stat-row"><span class="label">${K_(t)}</span><span class="value">${K_(e)}</span></div>`}function HI(t,e){return t==="neutral"?"Neutral zone":e.kind==="shared"?t==="defensive_half"?"Blue side":"Orange side":t==="defensive_half"?"Own half":"Opp half"}function VI(t,e,n){const i=new Map;if(t&&(i.set("defensive_half",t.defensive_half_time),i.set("neutral",t.neutral_time??0),i.set("offensive_half",t.offensive_half_time)),t?.labeled_time?.entries?.length){i.clear();for(const s of t.labeled_time.entries){const r=s.labels.find(o=>o.key==="field_half")?.value;r&&i.set(r,(i.get(r)??0)+s.value)}}const a=["defensive_half","neutral","offensive_half"];return a.some(s=>(i.get(s)??0)>0)?a.filter(s=>i.has(s)).map(s=>Ry(HI(s,n),zI(i.get(s),e))).join(""):""}function j_(t,e){const n=t?.tracked_time,i=VI(t,n,e.labelPerspective);return`
    ${i.length===0?Ry("Tracked",UI(n,1,"s")):""}
    ${i}
  `}function da(t){return t===void 0||Number.isNaN(t)?"?":`${Math.round(t)}`}function fa(t,e){return`<div class="stat-row"><span class="label">${t}</span><span class="value">${e}</span></div>`}function Ju(t){return`
    ${fa("Rushes",da(t?.count))}
    ${fa("2v1",da(t?.two_v_one_count))}
    ${fa("2v2",da(t?.two_v_two_count))}
    ${fa("2v3",da(t?.two_v_three_count))}
    ${fa("3v1",da(t?.three_v_one_count))}
    ${fa("3v2",da(t?.three_v_two_count))}
    ${fa("3v3",da(t?.three_v_three_count))}
  `}const Z_="subtr-actor-fifty-fifty-overlay-styles",GI=5882879,$I=16761180,WI=15988472,XI=180,qI=4;function Mf(t){if(!t)return null;const[e,n]=Object.entries(t)[0]??["Unknown","unknown"],i=typeof n=="string"?n:JSON.stringify(n);return`${e}:${i}`}function J_(t,e){const n=Mf(e);return n?t.players.find(i=>i.id===n)?.name??n:"Unknown"}function YI(t,e){const n=J_(e,t.team_zero_player),i=J_(e,t.team_one_player),a=t.is_kickoff?"Kickoff 50/50":"50/50",s=t.winning_team_is_team_0===void 0?null:t.winning_team_is_team_0,r=t.possession_team_is_team_0===void 0?null:t.possession_team_is_team_0,o=s===null?"neutral":s?"blue win":"orange win",l=r===null?"neutral poss":r?"blue poss":"orange poss",c=s===null?"sap-fifty-fifty-overlay-label-neutral":s?"sap-fifty-fifty-overlay-label-blue":"sap-fifty-fifty-overlay-label-orange";return{text:`${a}: ${n} vs ${i} | ${o} | ${l}`,className:c,winnerIsTeamZero:s}}function Py(t,e){return t.events.fifty_fifty.map(n=>{const i=YI(n,e),a=new L(...n.team_zero_position),s=new L(...n.team_one_position),r=new L(...n.midpoint),o=e.frames[n.start_frame]?.time??n.start_time;return{id:`fifty-fifty:${n.start_frame}:${Mf(n.team_zero_player)}:${Mf(n.team_one_player)}`,time:o,frame:n.start_frame,label:i.text,labelClassName:i.className,axisStart:a,axisEnd:s,midpoint:r,winnerIsTeamZero:i.winnerIsTeamZero}})}function KI(t,e,n){const i=Math.max(.1,n);return t.filter(a=>{const s=e-a.time;return s>=0&&s<=i})}function jI(){if(document.getElementById(Z_))return;const t=document.createElement("style");t.id=Z_,t.textContent=`
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
  `,document.head.append(t)}function ZI(t,e,n,i){if(i.copy(t).project(e),i.z<-1||i.z>1)return!1;const a=n.clientWidth||1,s=n.clientHeight||1;return i.x=(i.x+1)*a/2,i.y=(1-i.y)*s/2,!(i.x<-100||i.x>a+100||i.y<-100||i.y>s+100)}class JI{scene;container;group=new _t;labelRoot;projectedPosition=new L;worldPosition=new L;labelOffset=new L(0,0,XI);markers;views=new Map;changedContainerPosition=!1;originalContainerPosition="";decaySeconds=qI;constructor(e,n,i,a){jI(),this.scene=e,this.container=n,this.markers=Py(a,i),getComputedStyle(n).position==="static"&&(this.changedContainerPosition=!0,this.originalContainerPosition=n.style.position,n.style.position="relative"),this.group.name="fifty-fifty-overlay",this.scene.replayRoot.add(this.group),this.labelRoot=document.createElement("div"),this.labelRoot.className="sap-fifty-fifty-overlay-root",this.container.append(this.labelRoot)}update(e){const n=KI(this.markers,e,this.decaySeconds),i=new Set(n.map(a=>a.id));for(const[a,s]of this.views.entries())i.has(a)||(s.line.removeFromParent(),s.line.geometry.dispose(),s.material.dispose(),s.label.remove(),this.views.delete(a));for(const a of n){const s=Math.max(0,e-a.time),r=Math.max(0,1-s/this.decaySeconds),o=this.ensureView(a),l=.12+.78*r;o.material.opacity=l;const c=o.line.geometry.getAttribute("position");c.setXYZ(0,a.axisStart.x,a.axisStart.y,a.axisStart.z+24),c.setXYZ(1,a.axisEnd.x,a.axisEnd.y,a.axisEnd.z+24),c.needsUpdate=!0,this.worldPosition.copy(a.midpoint).add(this.labelOffset),this.scene.replayRoot.localToWorld(this.worldPosition),ZI(this.worldPosition,this.scene.camera,this.container,this.projectedPosition)?(o.label.hidden=!1,o.label.style.opacity=`${.24+.76*r}`,o.label.style.transform=`translate(${this.projectedPosition.x.toFixed(1)}px, ${this.projectedPosition.y.toFixed(1)}px) translate(-50%, -100%)`):o.label.hidden=!0}}dispose(){for(const e of this.views.values())e.line.removeFromParent(),e.line.geometry.dispose(),e.material.dispose(),e.label.remove();this.views.clear(),this.group.removeFromParent(),this.labelRoot.remove(),this.changedContainerPosition&&(this.container.style.position=this.originalContainerPosition,this.changedContainerPosition=!1)}ensureView(e){const n=this.views.get(e.id);if(n)return n;const i=new At().setFromPoints([e.axisStart,e.axisEnd]),a=new Ec({color:e.winnerIsTeamZero===null?WI:e.winnerIsTeamZero?GI:$I,transparent:!0,opacity:.9}),s=new Ep(i,a);s.renderOrder=3,this.group.add(s);const r=document.createElement("div");r.className=`sap-fifty-fifty-overlay-label ${e.labelClassName}`,r.textContent=e.label,this.labelRoot.append(r);const o={marker:e,line:s,material:a,label:r};return this.views.set(e.id,o),o}}const Q_="subtr-actor-ceiling-shot-overlay-styles",QI=5882879,eD=16761180,tD=16185075,nD=140,iD=215,aD=220,sD=4.5;function Ly(t){if(!t)return null;const[e,n]=Object.entries(t)[0]??["Unknown","unknown"],i=typeof n=="string"?n:JSON.stringify(n);return`${e}:${i}`}function rD(t,e){const n=Ly(e);return n?t.players.find(i=>i.id===n)?.name??n:"Unknown"}function oD(t,e){return t.events.ceiling_shot.map(n=>{const i=rD(e,n.player),a=Ly(n.player),s=e.frames[n.frame]?.time??n.time,r=n.confidence;return{id:`ceiling-shot:${n.frame}:${a}:${Math.round(r*1e3)}`,time:s,frame:n.frame,isTeamZero:n.is_team_0,playerId:a,playerName:i,ceilingContactPosition:{x:n.ceiling_contact_position[0],y:n.ceiling_contact_position[1],z:n.ceiling_contact_position[2]},touchPosition:{x:n.touch_position[0],y:n.touch_position[1],z:n.touch_position[2]},quality:r,qualityLabel:`${Math.round(r*100)}%`}})}function lD(t,e,n){const i=Math.max(.1,n);return t.filter(a=>{const s=e-a.time;return s>=0&&s<=i})}function cD(){if(document.getElementById(Q_))return;const t=document.createElement("style");t.id=Q_,t.textContent=`
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
  `,document.head.append(t)}function uD(t,e,n,i){if(i.copy(t).project(e),i.z<-1||i.z>1)return!1;const a=n.clientWidth||1,s=n.clientHeight||1;return i.x=(i.x+1)*a/2,i.y=(1-i.y)*s/2,!(i.x<-100||i.x>a+100||i.y<-100||i.y>s+100)}class dD{scene;container;group=new _t;labelRoot;projectedPosition=new L;worldPosition=new L;labelOffset=new L(0,0,aD);markers;views=new Map;changedContainerPosition=!1;originalContainerPosition="";decaySeconds=sD;constructor(e,n,i,a){cD(),this.scene=e,this.container=n,this.markers=oD(a,i),getComputedStyle(n).position==="static"&&(this.changedContainerPosition=!0,this.originalContainerPosition=n.style.position,n.style.position="relative"),this.group.name="ceiling-shot-overlay",this.scene.replayRoot.add(this.group),this.labelRoot=document.createElement("div"),this.labelRoot.className="sap-ceiling-shot-overlay-root",this.container.append(this.labelRoot)}update(e){const n=lD(this.markers,e,this.decaySeconds),i=new Set(n.map(a=>a.id));for(const[a,s]of this.views.entries())i.has(a)||(s.ring.removeFromParent(),s.ring.geometry.dispose(),s.ringMaterial.dispose(),s.beam.removeFromParent(),s.beamGeometry.dispose(),s.beamMaterial.dispose(),s.label.remove(),this.views.delete(a));for(const a of n){const s=Math.max(0,e-a.time),r=Math.max(0,1-s/this.decaySeconds),o=this.ensureView(a),l=.14+.6*r,c=.94+(1-r)*.18;o.ringMaterial.opacity=l,o.beamMaterial.opacity=.18+.55*r,o.ring.position.set(a.touchPosition.x,a.touchPosition.y,a.touchPosition.z+12),o.ring.scale.setScalar(c+a.quality*.08),this.worldPosition.set(a.touchPosition.x,a.touchPosition.y,a.touchPosition.z).add(this.labelOffset);const u=uD(this.worldPosition,this.scene.camera,this.container,this.projectedPosition);o.label.style.display=u?"block":"none",u&&(o.label.style.left=`${this.projectedPosition.x}px`,o.label.style.top=`${this.projectedPosition.y}px`,o.label.style.opacity=`${.42+.58*r}`)}}dispose(){for(const e of this.views.values())e.ring.removeFromParent(),e.ring.geometry.dispose(),e.ringMaterial.dispose(),e.beam.removeFromParent(),e.beamGeometry.dispose(),e.beamMaterial.dispose(),e.label.remove();this.views.clear(),this.group.removeFromParent(),this.labelRoot.remove(),this.changedContainerPosition&&(this.container.style.position=this.originalContainerPosition)}ensureView(e){const n=this.views.get(e.id);if(n)return n;const i=e.quality>=.8?tD:e.isTeamZero?QI:eD,a=new st({color:i,transparent:!0,opacity:.8,side:Qe,depthWrite:!1,depthTest:!1}),s=new ka(nD,iD,48),r=new He(s,a);r.renderOrder=30,this.group.add(r);const o=new At().setFromPoints([new L(e.ceilingContactPosition.x,e.ceilingContactPosition.y,e.ceilingContactPosition.z),new L(e.touchPosition.x,e.touchPosition.y,e.touchPosition.z)]),l=new Ec({color:i,transparent:!0,opacity:.7,depthWrite:!1,depthTest:!1}),c=new Ep(o,l);c.renderOrder=29,this.group.add(c);const u=document.createElement("div");u.className=`sap-ceiling-shot-overlay-label ${e.isTeamZero?"sap-ceiling-shot-overlay-label-blue":"sap-ceiling-shot-overlay-label-orange"}`,u.textContent=`${e.playerName} ceiling shot ${e.qualityLabel}`,this.labelRoot.append(u);const d={marker:e,ring:r,ringMaterial:a,beam:c,beamGeometry:o,beamMaterial:l,label:u};return this.views.set(e.id,d),d}}const eg="subtr-actor-touch-overlay-styles",tg=5882879,ng=16761180,fD=120,pD=196,Qu=24,ig=210,ag=5,hD=.1,mD=48;function zt(t){const[e,n]=Object.entries(t)[0]??["Unknown","unknown"],i=typeof n=="string"?n:JSON.stringify(n);return`${e}:${i}`}function ed(t,e){return Math.max(0,t-e)}function _D(t,e){if(e==="markers")return t.playerName;const n=Math.round(t.totalBallAdvanceDistance),i=Math.round(t.totalBallRetreatDistance);return n>0&&i>0?`${t.playerName} +${n} / -${i} uu`:i>0?`${t.playerName} -${i} uu`:`${t.playerName} +${n} uu`}function Ny(t,e){const n=new Map,i=[],a=[...(t.events?.touch??[]).map((s,r)=>({kind:"touch",frame:s.frame,time:s.time,index:r,event:s})),...(t.events?.touch_ball_movement??[]).map((s,r)=>({kind:"movement",frame:s.frame,time:s.time,index:r,event:s}))].sort((s,r)=>s.frame!==r.frame?s.frame-r.frame:s.time!==r.time?s.time-r.time:s.kind!==r.kind?s.kind==="touch"?-1:1:s.index-r.index);for(const s of a){if(s.kind==="touch"){const d=s.event,f=zt(d.player),p=e.ballFrames[d.frame]?.position;if(!p)continue;const _=i.length;i.push({id:`touch-stat:${d.frame}:${f}:${_+1}`,time:e.frames[d.frame]?.time??d.time,frame:d.frame,isTeamZero:d.is_team_0,playerId:f,playerName:e.players.find(g=>g.id===f)?.name??f,position:{x:p.x,y:p.y,z:p.z},endPosition:{x:p.x,y:p.y,z:p.z},totalBallTravelDistance:0,totalBallAdvanceDistance:0,totalBallRetreatDistance:0}),n.set(f,_);continue}const r=s.event,o=zt(r.player),l=n.get(o),c=e.ballFrames[r.frame]?.position;if(l===void 0||!c)continue;const u=i[l];u&&(u.totalBallTravelDistance+=ed(r.travel_distance,0),u.totalBallAdvanceDistance+=ed(r.advance_distance,0),u.totalBallRetreatDistance+=ed(r.retreat_distance,0),u.endPosition={x:c.x,y:c.y,z:c.z})}return i}function gD(t,e,n){const i=Math.max(.1,n);return t.filter(a=>{const s=e-a.time;return s>=0&&s<=i})}function vD(){if(document.getElementById(eg))return;const t=document.createElement("style");t.id=eg,t.textContent=`
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
  `,document.head.append(t)}function yD(t,e,n,i){if(i.copy(t).project(e),i.z<-1||i.z>1)return!1;const a=n.clientWidth||1,s=n.clientHeight||1;return i.x=(i.x+1)*a/2,i.y=(1-i.y)*s/2,!(i.x<-100||i.x>a+100||i.y<-100||i.y>s+100)}function Iy(t){return[t.line.material,t.cone.material].flatMap(e=>Array.isArray(e)?e:[e])}function sg(t,e){for(const n of Iy(t))n.transparent=!0,n.opacity=e,n.depthWrite=!1,n.depthTest=!1}function rg(t){t.removeFromParent(),t.line.geometry.dispose(),t.cone.geometry.dispose();for(const e of Iy(t))e.dispose()}class bD{scene;container;group=new _t;labelRoot;projectedPosition=new L;worldPosition=new L;arrowStart=new L;arrowEnd=new L;arrowDirection=new L;labelOffset=new L(0,0,ig);markers;views=new Map;changedContainerPosition=!1;originalContainerPosition="";decaySeconds=ag;mode="markers";constructor(e,n,i,a,s){vD(),this.scene=e,this.container=n,this.decaySeconds=Math.max(.1,s?.decaySeconds??ag),this.mode=s?.mode??"markers",this.labelOffset.set(0,0,ig),this.markers=Ny(a,i),getComputedStyle(n).position==="static"&&(this.changedContainerPosition=!0,this.originalContainerPosition=n.style.position,n.style.position="relative"),this.group.name="touch-event-overlay",this.scene.replayRoot.add(this.group),this.labelRoot=document.createElement("div"),this.labelRoot.className="sap-touch-overlay-root",this.container.append(this.labelRoot)}getDecaySeconds(){return this.decaySeconds}setDecaySeconds(e){this.decaySeconds=Math.max(.1,e)}getMode(){return this.mode}setMode(e){this.mode=e}update(e){const n=gD(this.markers,e,this.decaySeconds),i=new Set(n.map(a=>a.id));for(const[a,s]of this.views.entries())i.has(a)||(s.ring.removeFromParent(),s.ring.geometry.dispose(),s.material.dispose(),rg(s.arrow),s.label.remove(),this.views.delete(a));for(const a of n){const s=Math.max(0,e-a.time),r=Math.max(0,1-s/this.decaySeconds),o=this.ensureView(a),l=.1+.6*r,c=.95+(1-r)*.28;o.material.opacity=l,o.ring.position.set(a.position.x,a.position.y,a.position.z+Qu),o.ring.scale.setScalar(c),o.label.textContent=_D(a,this.mode),o.label.classList.toggle("sap-touch-overlay-label-advancement",this.mode==="advancement"),this.updateArrow(o,a,l),this.worldPosition.set(a.position.x,a.position.y,a.position.z),this.worldPosition.add(this.labelOffset),this.scene.replayRoot.localToWorld(this.worldPosition),yD(this.worldPosition,this.scene.camera,this.container,this.projectedPosition)?(o.label.hidden=!1,o.label.style.opacity=`${.22+.78*r}`,o.label.style.transform=`translate(${this.projectedPosition.x.toFixed(1)}px, ${this.projectedPosition.y.toFixed(1)}px) translate(-50%, -100%)`):o.label.hidden=!0}}dispose(){for(const e of this.views.values())e.ring.removeFromParent(),e.ring.geometry.dispose(),e.material.dispose(),rg(e.arrow),e.label.remove();this.views.clear(),this.group.removeFromParent(),this.labelRoot.remove(),this.changedContainerPosition&&(this.container.style.position=this.originalContainerPosition,this.changedContainerPosition=!1)}ensureView(e){const n=this.views.get(e.id);if(n)return n;const i=new st({color:e.isTeamZero?tg:ng,transparent:!0,opacity:.7,side:Qe,depthWrite:!1,depthTest:!1}),a=new He(new ka(fD,pD,48),i);a.rotation.x=-Math.PI/2,a.renderOrder=40,this.group.add(a);const s=new aE(new L(0,1,0),new L,1,e.isTeamZero?tg:ng,1,1);s.visible=!1,s.renderOrder=45,s.line.renderOrder=45,s.cone.renderOrder=45,sg(s,.7),this.group.add(s);const r=document.createElement("div");r.className=`sap-touch-overlay-label ${e.isTeamZero?"sap-touch-overlay-label-blue":"sap-touch-overlay-label-orange"}`,r.textContent=e.playerName,r.hidden=!0,this.labelRoot.append(r);const o={marker:e,ring:a,material:i,arrow:s,label:r};return this.views.set(e.id,o),o}updateArrow(e,n,i){if(this.mode!=="advancement"||n.totalBallTravelDistance<=hD){e.arrow.visible=!1;return}this.arrowStart.set(n.position.x,n.position.y,n.position.z+Qu*2),this.arrowEnd.set(n.endPosition.x,n.endPosition.y,n.endPosition.z+Qu*2),this.arrowDirection.copy(this.arrowEnd).sub(this.arrowStart);const a=this.arrowDirection.length();if(a<mD){e.arrow.visible=!1;return}this.arrowDirection.normalize(),e.arrow.visible=!0,e.arrow.position.copy(this.arrowStart),e.arrow.setDirection(this.arrowDirection),e.arrow.setLength(a,Math.min(140,Math.max(42,a*.18)),Math.min(86,Math.max(24,a*.1))),sg(e.arrow,Math.min(.86,i+.12))}}const li="#3b82f6",ci="#f59e0b",xD="#d1d9e0",SD={air_dribble:"AD",ball_carry:"BC",ceiling_shot:"CS",double_tap:"DT",flick:"F",flip_reset:"FR",half_flip:"HF",half_volley:"HV",musty_flick:"M",one_timer:"OT",pass:"P",speed_flip:"SF",wall_aerial:"WA",wall_aerial_shot:"WS",wavedash:"WD"},wD=new Set(["wavedash"]);function ED(t,e){return t.players.find(n=>n.id===e)?.name??e}function ta(t,e,n){return t.frames[e??-1]?.time??n}function mn(t){return t.split(/[_-]+/).filter(e=>e.length>0).map(e=>`${e.slice(0,1).toUpperCase()}${e.slice(1)}`).join(" ")}function Dy(t){return SD[t]??(t.split(/[_-]+/).filter(e=>e.length>0).map(e=>e.slice(0,1).toUpperCase()).join("").slice(0,3)||"M")}function ky(t){return[...new Set((t?.events.mechanics??[]).filter(e=>Pc(e.kind)).map(e=>e.kind))].sort((e,n)=>mn(e).localeCompare(mn(n)))}function Pc(t){return!wD.has(t)}function MD(t){return t.replaceAll("_","-")}function TD(t,e,n){const i=n?new Set(n):null,a=new Map(e.players.map(s=>[s.id,s.name]));return(t.events.mechanics??[]).filter(s=>Pc(s.kind)&&s.timing.type==="moment"&&(!i||i.has(s.kind))).map(s=>{const r=zt(s.player_id),o=a.get(r)??r,l=mn(s.kind);if(s.timing.type!=="moment")throw new Error("unreachable non-moment mechanic event");return{id:s.id,time:ta(e,s.timing.frame,s.timing.time),frame:s.timing.frame,kind:s.kind,label:`${o} ${l.toLowerCase()}`,shortLabel:Dy(s.kind),playerId:r,playerName:o,isTeamZero:s.is_team_0,color:s.is_team_0?li:ci}})}function AD(t,e,n){const i=n?new Set(n):null,a=new Map(e.players.map(s=>[s.id,s.name]));return(t.events.mechanics??[]).filter(s=>Pc(s.kind)&&(!i||i.has(s.kind))).map(s=>{const r=zt(s.player_id),o=a.get(r)??r,l=mn(s.kind),c=s.timing.type==="moment"?{frame:s.timing.frame,time:s.timing.time}:{frame:s.timing.end_frame,time:s.timing.end_time};return{id:`${s.id}:playlist`,time:ta(e,c.frame,c.time),frame:c.frame,kind:s.kind,label:`${o} ${l.toLowerCase()}`,shortLabel:Dy(s.kind),playerId:r,playerName:o,isTeamZero:s.is_team_0,color:s.is_team_0?li:ci}})}function CD(t){const e=new Set(t),n=new Set(["goal"]);return e.has("core")&&(n.add("save"),n.add("shot"),n.add("assist")),e.has("demo")&&n.add("demo"),[...n]}function RD(t,e){const n=new Set(CD(e));return t.timelineEvents.filter(i=>n.has(i.kind))}function PD(t,e){return Py(t,e).map(n=>({id:n.id,time:n.time,frame:n.frame,kind:"fifty-fifty",label:n.label,shortLabel:n.label.startsWith("Kickoff 50/50")?"KO":"50",isTeamZero:n.winnerIsTeamZero,color:n.winnerIsTeamZero===null?xD:n.winnerIsTeamZero?li:ci}))}function LD(t,e){return Ny(t,e).map(n=>({id:n.id,time:n.time,frame:n.frame,kind:"touch",label:`${n.playerName} touch`,shortLabel:"T",playerId:n.playerId,playerName:n.playerName,isTeamZero:n.isTeamZero,color:n.isTeamZero?li:ci}))}function ND(t,e){return t.events.backboard.map((n,i)=>{const a=zt(n.player),s=e.players.find(r=>r.id===a)?.name??a;return{id:`backboard:${n.frame}:${a}:${i}`,time:ta(e,n.frame,n.time),frame:n.frame,kind:"backboard",label:`${s} backboard`,shortLabel:"BB",playerId:a,playerName:s,isTeamZero:n.is_team_0,color:n.is_team_0?li:ci}})}function ID(t,e){return t.events.rush.map((n,i)=>{const a=ta(e,n.end_frame,n.end_time),s=`${n.attackers}v${n.defenders}`,r=n.is_team_0?"Blue":"Orange";return{id:`rush:${n.start_frame}:${n.end_frame}:${i}`,time:a,frame:n.end_frame,kind:"rush",label:`${r} rush ${s}`,shortLabel:"R",playerId:null,playerName:null,isTeamZero:n.is_team_0,color:n.is_team_0?li:ci}})}function DD(t,e){return(t.events?.powerslide??[]).filter(n=>n.active).map((n,i)=>{const a=zt(n.player),s=ED(e,a);return{id:`powerslide:${n.frame}:${a}:${i+1}`,time:ta(e,n.frame,n.time),frame:n.frame,kind:"powerslide",label:`${s} powerslide`,shortLabel:"PS",playerId:a,playerName:s,isTeamZero:n.is_team_0,color:n.is_team_0?li:ci}})}function kD(t,e){return t.events.wavedash.map((n,i)=>{const a=zt(n.player),s=e.players.find(c=>c.id===a)?.name??a,r=ta(e,n.frame,n.time),o=Math.round(n.confidence*100),l=Math.round(n.horizontal_speed_gain);return{id:`wavedash:${n.frame}:${a}:${i}`,time:r,frame:n.frame,kind:"wavedash",label:`${s} wavedash ${o}% | +${l}uu/s`,shortLabel:"WD",playerId:a,playerName:s,isTeamZero:n.is_team_0,color:n.is_team_0?li:ci}})}function FD(t,e){return t.events.bump.map((n,i)=>{const a=zt(n.initiator),s=zt(n.victim),r=e.players.find(u=>u.id===a)?.name??a,o=e.players.find(u=>u.id===s)?.name??s,l=ta(e,n.frame,n.time),c=Math.round(n.confidence*100);return{id:`bump:${n.frame}:${a}:${s}:${i}`,time:l,frame:n.frame,kind:"bump",label:`${r} bumped ${o} ${c}%`,shortLabel:"B",playerId:a,playerName:r,isTeamZero:n.initiator_is_team_0,color:n.initiator_is_team_0?li:ci}})}function OD(t){return t.kind==="beaten_to_ball"?"BT":t.dodge_active?"DW":t.aerial?"AW":"W"}function UD(t){const e=[t.aerial?"aerial":"grounded"];return t.dodge_active&&e.push("dodge"),e.join(" ")}function BD(t){return t.kind==="beaten_to_ball"?"beaten to ball":"whiff"}function zD(t,e){return t.events.whiff.map((n,i)=>{const a=zt(n.player),s=e.players.find(c=>c.id===a)?.name??a,r=ta(e,n.frame,n.time),o=Math.round(n.closest_approach_distance),l=Math.round(n.approach_speed);return{id:`whiff:${n.frame}:${a}:${i}`,time:r,frame:n.frame,kind:"whiff",label:`${s} ${UD(n)} ${BD(n)} | ${o}uu closest, ${l}uu/s`,shortLabel:OD(n),playerId:a,playerName:s,isTeamZero:n.is_team_0,color:n.is_team_0?li:ci}})}const Fy=.02,pn=1e-4,HD=200,Oy=.08,VD="#3b82f6",GD="#f59e0b",Tf={big:"rgba(245, 158, 11, 0.92)",small:"rgba(52, 211, 153, 0.86)"},og={both:"rgba(52, 211, 153, 0.86)",ghost:"rgba(239, 68, 68, 0.9)",missed:"rgba(59, 130, 246, 0.9)"},$D={air_dribble:"AD",ball_carry:"BC",ceiling_shot:"CS",double_tap:"DT",flick:"F",half_flip:"HF",half_volley:"HV",musty_flick:"M",one_timer:"OT",pass:"P",wavedash:"WD"};function WD(t){const e=t.config?.pressure_neutral_zone_half_width_y;return typeof e=="number"&&Number.isFinite(e)?Math.max(0,e):HD}function nc(t,e,n){return t?.frames?.[e??-1]?.time??n}function Vp(t){return t===!0?VD:t===!1?GD:null}function XD(t){return $D[t]??(t.split(/[_-]+/).filter(e=>e.length>0).map(e=>e.slice(0,1).toUpperCase()).join("").slice(0,3)||"M")}function qD(t,e,n){const i=n?new Set(n):null,a=new Map(e.players.map(s=>[s.id,s.name]));return(t.events.mechanics??[]).filter(s=>Pc(s.kind)&&s.timing.type==="span"&&(!i||i.has(s.kind))).map(s=>{if(s.timing.type!=="span")throw new Error("unreachable non-span mechanic event");const r=Af(s.player_id),o=a.get(r)??r,l=mn(s.kind),c=nc(e,s.timing.start_frame,s.timing.start_time),u=Math.max(c,nc(e,s.timing.end_frame,s.timing.end_time));return{id:s.id,startTime:c,endTime:u,lane:`mechanic:${s.kind}`,laneLabel:l,label:`${o} ${l.toLowerCase()}`,shortLabel:XD(s.kind),isTeamZero:s.is_team_0,color:Vp(s.is_team_0)??void 0}}).sort((s,r)=>s.startTime!==r.startTime?s.startTime-r.startTime:(s.id??"").localeCompare(r.id??""))}function YD(t,e,n,i,a,s){const r=e?.ballFrames[t]?.position?.y;return typeof r=="number"&&Number.isFinite(r)&&Math.abs(r)<=n+pn||s>pn?"neutral":i>a+pn?"team_zero_side":a>i+pn?"team_one_side":null}function Uy(t,e,n){if(t==="neutral")return{id:`half-control:neutral:${e.toFixed(3)}`,startTime:e,endTime:n,lane:"half-control",laneLabel:"Half Control",label:"Neutral half control",color:"rgba(209, 217, 224, 0.7)",isTeamZero:null};const i=t==="team_zero_side";return{id:`half-control:${t}:${e.toFixed(3)}`,startTime:e,endTime:n,lane:"half-control",laneLabel:"Half Control",label:i?"Blue half control":"Orange half control",color:i?"rgba(89, 195, 255, 0.76)":"rgba(255, 193, 92, 0.76)",isTeamZero:i}}function Gp(t){return t.map((e,n)=>({event:e,index:n})).sort((e,n)=>e.event.frame!==n.event.frame?e.event.frame-n.event.frame:e.event.time!==n.event.time?e.event.time-n.event.time:e.index-n.index).map(({event:e})=>e)}function KD(t,e){const n=Gp(t.events?.possession??[]),i=[];let a=0,s=!1,r="neutral",o=null;for(const l of t.frames){for(;a<n.length&&n[a].frame<=l.frame_number;){const f=n[a];s=f.active,r=f.possession_state,a+=1}if(!Number.isFinite(l.time)||!Number.isFinite(l.dt)||l.dt<=0){o=l;continue}const{startTime:c,endTime:u}=qs(l,o,e);let d=null;s&&r==="team_zero"?d={id:`possession:team_zero:${c.toFixed(3)}`,startTime:c,endTime:u,lane:"possession",laneLabel:"Possession",label:"Blue possession",color:"rgba(59, 130, 246, 0.88)",isTeamZero:!0}:s&&r==="team_one"?d={id:`possession:team_one:${c.toFixed(3)}`,startTime:c,endTime:u,lane:"possession",laneLabel:"Possession",label:"Orange possession",color:"rgba(245, 158, 11, 0.88)",isTeamZero:!1}:s&&r==="neutral"&&(d={id:`possession:neutral:${c.toFixed(3)}`,startTime:c,endTime:u,lane:"possession",laneLabel:"Possession",label:"Neutral possession",color:"rgba(209, 217, 224, 0.7)",isTeamZero:null}),Lc(i,d),o=l}return i}function jD(t,e){if((t.events?.possession?.length??0)>0)return KD(t,e);const n=[];let i=0,a=0,s=0,r=null;for(const o of t.frames){if(!Number.isFinite(o.time)||!Number.isFinite(o.dt)||o.dt<=0){r=o;continue}const l=o,c=l.team_zero?.possession?.possession_time??0,u=l.team_one?.possession?.possession_time??0,d=l.team_zero?.possession?.neutral_time??0,f=c-i,p=u-a,_=d-s;i=c,a=u,s=d;let g=null;const{startTime:m,endTime:h}=qs(o,r,e);f>p+pn&&f>_+pn?g={id:`possession:team_zero:${m.toFixed(3)}`,startTime:m,endTime:h,lane:"possession",laneLabel:"Possession",label:"Blue possession",color:"rgba(59, 130, 246, 0.88)",isTeamZero:!0}:p>f+pn&&p>_+pn?g={id:`possession:team_one:${m.toFixed(3)}`,startTime:m,endTime:h,lane:"possession",laneLabel:"Possession",label:"Orange possession",color:"rgba(245, 158, 11, 0.88)",isTeamZero:!1}:_>pn&&(g={id:`possession:neutral:${m.toFixed(3)}`,startTime:m,endTime:h,lane:"possession",laneLabel:"Possession",label:"Neutral possession",color:"rgba(209, 217, 224, 0.7)",isTeamZero:null}),Lc(n,g),r=o}return n}function ZD(t,e){const n=Gp(t.events?.pressure??[]),i=[];let a=0,s=!1,r="neutral",o=null;for(const l of t.frames){for(;a<n.length&&n[a].frame<=l.frame_number;){const d=n[a];s=d.active,r=d.field_half==="team_zero_side"||d.field_half==="team_one_side"?d.field_half:"neutral",a+=1}if(!Number.isFinite(l.time)||!Number.isFinite(l.dt)||l.dt<=0){o=l;continue}const{startTime:c,endTime:u}=qs(l,o,e);Lc(i,s?Uy(r,c,u):null),o=l}return i}function JD(t,e){if((t.events?.pressure?.length??0)>0)return ZD(t,e);const n=[];let i=0,a=0,s=0;const r=WD(t);let o=null;for(const l of t.frames){if(!Number.isFinite(l.time)||!Number.isFinite(l.dt)||l.dt<=0){o=l;continue}const c=l,u=c.team_zero?.pressure?.defensive_half_time??0,d=c.team_one?.pressure?.defensive_half_time??0,f=c.team_zero?.pressure?.neutral_time??0,p=u-i,_=d-a,g=f-s;i=u,a=d,s=f;const{startTime:m,endTime:h}=qs(l,o,e),b=YD(l.frame_number,e,r,p,_,g),S=b?Uy(b,m,h):null;Lc(n,S),o=l}return n}function QD(t,e){return t.events.rush.map((n,i)=>{const a=e?.frames[n.start_frame]?.time??n.start_time,s=e?.frames[n.end_frame]?.time??n.end_time,r=`${n.attackers}v${n.defenders}`,o=n.is_team_0;return{id:`rush-range:${n.start_frame}:${n.end_frame}:${i}`,startTime:a,endTime:Math.max(a,s),lane:"rush",laneLabel:"Rush",label:`${o?"Blue":"Orange"} rush ${r}`,color:o?"rgba(59, 130, 246, 0.4)":"rgba(245, 158, 11, 0.4)",isTeamZero:o}})}function ek(t,e={}){const n=By(e),i=new Set(e.comparisons??["both"]),a=new Set(e.activities??["active","inactive","unknown"]),s=new Set(e.fieldHalves??["own","opponent","unknown"]),r=e.playerIds?new Set(e.playerIds):null;if(n.size===0||!i.has("both")||!a.has("unknown")||!s.has("unknown")||r?.size===0)return[];const o=new Map(t.players.map(c=>[c.id,c.isTeamZero])),l=[];for(const c of t.boostPads)if(n.has(c.size))for(let u=0;u<c.events.length;u+=1){const d=c.events[u];if(d.available||!Number.isFinite(d.time)||r&&!d.playerId||d.playerId&&r&&!r.has(d.playerId))continue;const f=Math.max(0,nc(t,d.frame,d.time)),p=c.size==="big"?"Big":"Small",_=d.playerName?`${d.playerName} `:"",g=d.playerId?o.get(d.playerId)??null:null;l.push({id:`boost-pickup:${c.index}:${d.frame}:${u}`,startTime:f,endTime:Math.max(f+Oy,f),lane:"boost-pickups",laneLabel:"Boost Pickups",label:`${_}picked up ${p.toLowerCase()} boost pad ${c.index}`,shortLabel:c.size==="big"?"100":"12",color:Vp(g)??Tf[c.size],isTeamZero:g})}return l.sort((c,u)=>c.startTime!==u.startTime?c.startTime-u.startTime:(c.id??"").localeCompare(u.id??""))}function By(t){if(t.padTypes)return new Set(t.padTypes);if(t.sizes){const e=new Set(t.sizes),n=new Set;return e.has("big")&&n.add("big"),e.has("small")&&n.add("small"),e.has("big")&&e.has("small")&&n.add("ambiguous"),n}return new Set(["big","small","ambiguous"])}function Af(t){const[e,n]=Object.entries(t)[0]??["Unknown","unknown"],i=typeof n=="string"?n:JSON.stringify(n);return`${e}:${i}`}function tk(t){return{big:"big",small:"small",ambiguous:"ambiguous"}[t]}function nk(t){return{both:"counted",ghost:"ghost",missed:"missed"}[t]}function ik(t,e){return t==="ghost"?"G":t==="missed"?"M":{big:"100",small:"12",ambiguous:"?"}[e]}function ak(t,e,n={}){const i=t.events?.boost_pickups??[];if(i.length===0&&e)return ek(e,n);const a=By(n),s=new Set(n.comparisons??["both"]),r=new Set(n.activities??["active","inactive","unknown"]),o=new Set(n.fieldHalves??["own","opponent","unknown"]),l=n.playerIds?new Set(n.playerIds):null;if(a.size===0||s.size===0||r.size===0||o.size===0||l?.size===0)return[];const c=new Map((e?.players??[]).map(u=>[u.id,u.name]));return i.filter(u=>{const d=Af(u.player_id);return a.has(u.pad_type)&&s.has(u.comparison)&&r.has(u.activity)&&o.has(u.field_half)&&(!l||l.has(d))}).map((u,d)=>{const f=Af(u.player_id),p=c.get(f)??f,_=Math.max(0,nc(e,u.frame,u.time)),g=nk(u.comparison),m=tk(u.pad_type);return{id:`boost-pickup:${u.comparison}:${u.frame}:${f}:${d}`,startTime:_,endTime:Math.max(_+Oy,_),lane:"boost-pickups",laneLabel:"Boost Pickups",label:`${p} ${g} ${m} boost pickup`,shortLabel:ik(u.comparison,u.pad_type),color:Vp(u.is_team_0)??(u.comparison==="both"?u.pad_type==="big"?Tf.big:u.pad_type==="small"?Tf.small:og.both:og[u.comparison]),isTeamZero:u.is_team_0}}).sort((u,d)=>u.startTime!==d.startTime?u.startTime-d.startTime:(u.id??"").localeCompare(d.id??""))}const Cf=[{fieldName:"time_defensive_third",aliases:["time_defensive_zone"],label:"Def third",relativeColor:"own"},{fieldName:"time_neutral_third",aliases:["time_neutral_zone"],label:"Neutral third",relativeColor:"neutral"},{fieldName:"time_offensive_third",aliases:["time_offensive_zone"],label:"Off third",relativeColor:"opp"}];function zy(t,e){return t.relativeColor==="neutral"?"rgba(209, 217, 224, 0.68)":(t.relativeColor==="own"?e:!e)?"rgba(89, 195, 255, 0.74)":"rgba(255, 193, 92, 0.78)"}function $p(t){const[e,n]=Object.entries(t)[0]??["Unknown","unknown"],i=typeof n=="string"?n:JSON.stringify(n);return`${e}:${i}`}function sk(t,e){const n=t.positioning;if(!n)return 0;for(const i of[e.fieldName,...e.aliases??[]]){const a=n[i];if(typeof a=="number"&&Number.isFinite(a))return a}return 0}function rk(t,e){return t.players.find(n=>$p(n.player_id)===e)?.name??e}function ok(t,e){for(const n of[e.fieldName,...e.aliases??[]]){const i=t[n];if(typeof i=="number"&&Number.isFinite(i))return i}return 0}function lk(t,e){const n=Gp(t.events?.positioning??[]),i=[],a=new Map;let s=0,r=null;for(const o of t.frames){const l=new Map;for(;s<n.length&&n[s].frame<=o.frame_number;){const d=n[s],f=$p(d.player),p=l.get(f)??{event:d,zoneDeltas:new Map};p.event=d;for(const _ of Cf)p.zoneDeltas.set(_.fieldName,(p.zoneDeltas.get(_.fieldName)??0)+ok(d,_));l.set(f,p),s+=1}if(!Number.isFinite(o.time)||!Number.isFinite(o.dt)||o.dt<=0){r=o;continue}const{startTime:c,endTime:u}=qs(o,r,e);if(u-c<=pn){r=o;continue}for(const[d,{event:f,zoneDeltas:p}]of l){let _=null,g=0;for(const m of Cf){const h=p.get(m.fieldName)??0;h>g+pn&&(g=h,_=m)}_&&Hy(i,a,{id:`time-in-zone:${d}:${_.fieldName}:${c.toFixed(3)}`,startTime:c,endTime:u,lane:`time-in-zone:${d}`,laneLabel:rk(o,d),label:_.label,color:zy(_,f.is_team_0),isTeamZero:f.is_team_0})}r=o}return i}function ck(t,e){if((t.events?.positioning?.length??0)>0)return lk(t,e);const n=new Map,i=[],a=new Map;let s=null;for(const r of t.frames){if(!Number.isFinite(r.time)||!Number.isFinite(r.dt)||r.dt<=0){s=r;continue}const{startTime:o,endTime:l}=qs(r,s,e);if(l-o<=pn){s=r;continue}for(const c of r.players){const u=$p(c.player_id),d=n.get(u)??new Map;let f=null,p=0;for(const _ of Cf){const g=sk(c,_),m=g-(d.get(_.fieldName)??0);m>p+pn&&(p=m,f=_),d.set(_.fieldName,g)}n.set(u,d),f&&Hy(i,a,{id:`time-in-zone:${u}:${f.fieldName}:${o.toFixed(3)}`,startTime:o,endTime:l,lane:`time-in-zone:${u}`,laneLabel:c.name,label:f.label,color:zy(f,c.is_team_0),isTeamZero:c.is_team_0})}s=r}return i}function qs(t,e,n){const i=n?.frames[t.frame_number]?.time??t.time,a=e?n?.frames[e.frame_number]?.time??e.time:Math.max(0,i-t.dt);return{startTime:Math.max(0,a),endTime:Math.max(a,i)}}function Lc(t,e){if(!e)return;const n=t[t.length-1];if(n&&n.lane===e.lane&&n.label===e.label&&Math.abs(n.endTime-e.startTime)<=Fy){n.endTime=e.endTime;return}t.push(e)}function Hy(t,e,n){if(!n)return;const i=n.lane??"",a=e.get(i);if(a&&a.label===n.label&&Math.abs(a.endTime-n.startTime)<=Fy){a.endTime=n.endTime;return}t.push(n),e.set(i,n)}const td=236,Vy="relative-positioning",uk={last:"Last",upfield:"Upfield",level:"Level",mid:"Mid"};function Ys(t){return t?"team-blue":"team-orange"}function Gy(t,e,n){return`<div class="player-card ${n.tone==="shared"?"shared":n.tone==="blue"?"team-blue":"team-orange"}">
    <div class="player-card-header">
      <span class="player-name">${t}</span>
      ${n.metaHtml??""}
    </div>
    ${e}
  </div>`}function Ht(t,e,n,i=""){return Gy(t,n,{metaHtml:i,tone:e?"blue":"orange"})}function Zt(t,e){return`<div class="player-team-stack">${[!0,!1].map(n=>{const i=t.filter(s=>s.is_team_0===n);if(i.length===0)return"";const a=n?"Blue":"Orange";return`<section class="player-team-group ${Ys(n)}">
        <div class="player-team-header">
          <h3>${a} team</h3>
          <span>${i.length} player${i.length===1?"":"s"}</span>
        </div>
        <div class="player-stats-grid">
          ${i.map(e).join("")}
        </div>
      </section>`}).join("")}</div>`}function Wp(t,e,n=""){return Gy(t,e,{metaHtml:n,tone:"shared"})}function Bt(t,e,n){const i=wt(t.statsFrameLookup,e);return i?i.players.find(a=>zt(a.player_id)===n)??null:null}function dk(t,e,n){const i=t.players.find(_=>_.id===e);if(!i||!i.frames[n]?.position)return"mid";const s=i.isTeamZero,r=t.players.filter(_=>_.isTeamZero===s).length,o=[];let l=0;for(const _ of t.players){if(_.isTeamZero!==s)continue;const g=_.frames[n];if(!g?.position)continue;const m=s?g.position.y:-g.position.y;o.push(m),_.id===e&&(l=m)}if(r<2||o.length!==r)return"mid";const c=Math.min(...o),u=Math.max(...o);if(u-c<=td)return"level";const f=l-c<=td,p=u-l<=td;return f&&!p?"last":p&&!f?"upfield":"mid"}function fk(t){let e=null,n=null;const i=new Set,a=["possession_state","field_third"];return{id:"possession",label:"Possession",setup(){s()},teardown(){},onBeforeRender(){},getTimelineRanges(o){return jD(o.statsTimeline,o.replay)},getConfig(){return{breakdownClasses:r()}},applyConfig(o){if(i.clear(),o&&typeof o=="object"&&!Array.isArray(o)){const l=o.breakdownClasses;if(Array.isArray(l))for(const c of l)a.includes(c)&&i.add(c)}s(),t.rerenderCurrentState()},renderStats(o,l){const u=wt(l.statsFrameLookup,o)?.team_zero?.possession;return u?Wp("Control State",Y_(u,{labelPerspective:{kind:"shared"},breakdownClasses:r()})):""},renderFocusedPlayerStats(o,l,c){const u=wt(c.statsFrameLookup,l),d=Bt(c,l,o),f=d?.is_team_0?u?.team_zero?.possession:u?.team_one?.possession;return!f||!d?"":Y_(f,{labelPerspective:{kind:"team"},breakdownClasses:r()})},renderSettings(){if(!e){e=document.createElement("div"),e.className="module-settings-card";const o=document.createElement("div");o.className="module-settings-header";const l=document.createElement("div"),c=document.createElement("p");c.className="module-settings-eyebrow",c.textContent="Stat display";const u=document.createElement("h3");u.textContent="Possession breakdown",l.append(c,u),n=document.createElement("strong"),n.className="metric-readout",o.append(l,n);const d=document.createElement("div");d.className="module-settings-options";const f=document.createElement("label");f.className="toggle";const p=document.createElement("input");p.type="checkbox",p.dataset.breakdownClass="possession_state",p.addEventListener("change",()=>{p.checked?i.add("possession_state"):i.delete("possession_state"),s(),t.rerenderCurrentState(),t.requestConfigSync?.()});const _=document.createElement("span");_.textContent="Control",f.append(p,_),d.append(f);const g=document.createElement("label");g.className="toggle";const m=document.createElement("input");m.type="checkbox",m.dataset.breakdownClass="field_third",m.addEventListener("change",()=>{m.checked?i.add("field_third"):i.delete("field_third"),s(),t.rerenderCurrentState(),t.requestConfigSync?.()});const h=document.createElement("span");h.textContent="Third",g.append(m,h),d.append(g),e.append(o,d)}return s(),e}};function s(){if(e){for(const o of e.querySelectorAll("input[data-breakdown-class]")){const l=o.dataset.breakdownClass;o.checked=l?i.has(l):!1}if(n){const o=a.filter(l=>i.has(l));n.textContent=o.length===0?"Total only":o.map(l=>l==="possession_state"?"Control":"Third").join(" x ")}}}function r(){return a.filter(o=>i.has(o))}}function pk(){let t=null;return{id:"fifty-fifty",label:"50/50",setup(e){t=new JI(e.player.sceneState,e.player.container,e.replay,e.statsTimeline)},teardown(){t?.dispose(),t=null},onBeforeRender(e){t?.update(e.currentTime)},getTimelineEvents(e){return PD(e.statsTimeline,e.replay)},renderStats(e,n){const i=wt(n.statsFrameLookup,e);if(!i)return"";const a=Wp("Challenge Summary",RI(i.team_zero?.fifty_fifty)),s=Zt(i.players,r=>Ht(r.name,r.is_team_0,W_(r.fifty_fifty)));return a+s},renderFocusedPlayerStats(e,n,i){const a=Bt(i,n,e);return a?W_(a.fifty_fifty):""}}}function hk(){let t=null,e=null;return{id:"pressure",label:"Half Control",setup(n){e=n.replay,t=new AI(n.player.sceneState.scene,n.fieldScale)},teardown(){t?.dispose(),t=null,e=null},onBeforeRender(n){const i=e?.ballFrames[n.frameIndex];t?.update(i?.position?.y??null)},getTimelineRanges(n){return JD(n.statsTimeline,n.replay)},renderStats(n,i){const s=wt(i.statsFrameLookup,n)?.team_zero?.pressure;return s?Wp("Field State",j_(s,{labelPerspective:{kind:"shared"}})):""},renderFocusedPlayerStats(n,i,a){const s=wt(a.statsFrameLookup,i),r=Bt(a,i,n),o=r?.is_team_0?s?.team_zero?.pressure:s?.team_one?.pressure;return!o||!r?"":j_(o,{labelPerspective:{kind:"team"}})}}}function mk(){return{id:"rush",label:"Rush",setup(){},teardown(){},onBeforeRender(){},getTimelineRanges(t){return QD(t.statsTimeline,t.replay)},getTimelineEvents(t){return ID(t.statsTimeline,t.replay)},renderStats(t,e){const n=wt(e.statsFrameLookup,t),i=n?.team_zero?.rush,a=n?.team_one?.rush;return!i||!a?"":[Ht("Blue Team",!0,Ju(i)),Ht("Orange Team",!1,Ju(a))].join("")},renderFocusedPlayerStats(t,e,n){const i=wt(n.statsFrameLookup,e),a=Bt(n,e,t),s=a?.is_team_0?i?.team_zero?.rush:i?.team_one?.rush;return!s||!a?"":Ju(s)}}}const Rf={speed_band:{valueOrder:["slow","boost","supersonic"],formatValue:t=>({slow:"Slow",boost:"Boost",supersonic:"Supersonic"})[t]??t},height_band:{valueOrder:["ground","low_air","high_air"],formatValue:t=>({ground:"Ground",low_air:"Low air",high_air:"High air"})[t]??t}};function _k(t){const e=new Set,n=[];for(const i of t??[])e.has(i)||(e.add(i),n.push(i));return n}function nd(t,e=1,n=""){return t===void 0||Number.isNaN(t)?"?":`${t.toFixed(e)}${n}`}function gk(t,e,n=1){return t===void 0||Number.isNaN(t)?"?":e===void 0||Number.isNaN(e)||e<=0?`${t.toFixed(n)}s`:`${t.toFixed(n)}s (${(t*100/e).toFixed(n)}%)`}function lg(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Nl(t,e){return`<div class="stat-row"><span class="label">${lg(t)}</span><span class="value">${lg(e)}</span></div>`}function vk(t,e,n){for(const i of n){const{valueOrder:a}=Rf[i],s=a.indexOf(t[i]),r=a.indexOf(e[i]),o=s===-1?Number.MAX_SAFE_INTEGER:s,l=r===-1?Number.MAX_SAFE_INTEGER:r;if(o!==l)return o-l}return 0}function yk(t,e){if(e.length===1){const n=e[0];return Rf[n].formatValue(t[n])}return e.map(n=>Rf[n].formatValue(t[n])).join(" / ")}function bk(t,e,n){if(e.length===0||!t?.labeled_tracked_time?.entries?.length)return"";const i=new Map,a=t?.labeled_tracked_time?.entries??[];for(const s of a){const r=new Map(s.labels.map(d=>[d.key,d.value])),o={};let l=!0;for(const d of e){const f=r.get(d);if(f===void 0){l=!1;break}o[d]=f}if(!l)continue;const c=e.map(d=>`${d}:${o[d]}`).join("|"),u=i.get(c);u?u.total+=s.value:i.set(c,{values:o,total:s.value})}return[...i.values()].sort((s,r)=>vk(s.values,r.values,e)).map(s=>Nl(yk(s.values,e),gk(s.total,n))).join("")}function cg(t,e={}){const n=t?.tracked_time,i=t&&n&&n>0?t.speed_integral/n:n===0?0:void 0,a=_k(e.breakdownClasses),s=bk(t,a,n);return`
    ${Nl("Tracked",nd(n,1,"s"))}
    ${Nl("Distance",nd(t?.total_distance,0," uu"))}
    ${Nl("Avg speed",nd(i,0," uu/s"))}
    ${s}
  `}const Pf={kind:{label:"Kind",valueOrder:["control","medium_hit","hard_hit"],formatValue:t=>({control:"Control",medium_hit:"Medium",hard_hit:"Hard"})[t]??t},height_band:{label:"Height",valueOrder:["ground","low_air","high_air"],formatValue:t=>({ground:"Ground",low_air:"Low air",high_air:"High air"})[t]??t},surface:{label:"Surface",valueOrder:["ground","air","wall"],formatValue:t=>({ground:"Ground",air:"Air",wall:"Wall"})[t]??t},dodge_state:{label:"Dodge",valueOrder:["no_dodge","dodge"],formatValue:t=>({no_dodge:"No dodge",dodge:"Dodge"})[t]??t}};function xk(t){const e=new Set,n=[];for(const i of t??[])e.has(i)||(e.add(i),n.push(i));return n}function Fi(t){return t===void 0||Number.isNaN(t)?"?":`${Math.round(t)}`}function id(t,e=0,n=""){return t===void 0||!Number.isFinite(t)?"?":`${t.toFixed(e)}${n}`}function ug(t){return t.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function On(t,e){return`<div class="stat-row"><span class="label">${ug(t)}</span><span class="value">${ug(e)}</span></div>`}function Sk(t,e,n){for(const i of n){const{valueOrder:a}=Pf[i],s=a.indexOf(t[i]),r=a.indexOf(e[i]),o=s===-1?Number.MAX_SAFE_INTEGER:s,l=r===-1?Number.MAX_SAFE_INTEGER:r;if(o!==l)return o-l}return 0}function wk(t,e){if(e.length===1){const n=e[0];return Pf[n].formatValue(t[n])}return e.map(n=>Pf[n].formatValue(t[n])).join(" / ")}function Ek(t){return(t?.labeled_touch_counts?.entries??[]).map(e=>({labels:e.labels,count:e.count}))}function Mk(t,e){if(e.length===0||t.length===0)return"";const n=new Map;for(const i of t){const a=new Map(i.labels.map(c=>[c.key,c.value])),s={};let r=!0;for(const c of e){const u=a.get(c);if(u===void 0){r=!1;break}s[c]=u}if(!r)continue;const o=e.map(c=>`${c}:${s[c]}`).join("|"),l=n.get(o);l?l.count+=i.count:n.set(o,{values:s,count:i.count})}return[...n.values()].sort((i,a)=>Sk(i.values,a.values,e)).map(i=>On(wk(i.values,e),Fi(i.count))).join("")}function Tk(t,e){if(!t||e.length!==1)return"";const[n]=e;if(n==="kind")return[On("Control",Fi(t.control_touch_count)),On("Medium",Fi(t.medium_hit_count)),On("Hard",Fi(t.hard_hit_count))].join("");if(n==="height_band"){const i=t.high_aerial_touch_count??0,a=(t.aerial_touch_count??0)-i,s=(t.touch_count??0)-(t.aerial_touch_count??0);return[On("Ground",Fi(s)),On("Low air",Fi(a)),On("High air",Fi(i))].join("")}return""}function dg(t,e={}){const n=xk(e.breakdownClasses),i=Ek(t),a=Mk(i,n)||Tk(t,n);return`
    ${On("Touches",Fi(t?.touch_count))}
    ${On("Ball advanced",id(t?.total_ball_advance_distance,0," uu"))}
    ${On("Ball traveled",id(t?.total_ball_travel_distance,0," uu"))}
    ${On("Ball retreated",id(t?.total_ball_retreat_distance,0," uu"))}
    ${a}
  `}const fg="subtr-actor-speed-flip-overlay-styles",Ak=5882879,Ck=16761180,Rk=16185075,Pk=150,Lk=230,Nk=220,Ik=4;function $y(t){if(!t)return null;const[e,n]=Object.entries(t)[0]??["Unknown","unknown"],i=typeof n=="string"?n:JSON.stringify(n);return`${e}:${i}`}function Dk(t,e){const n=$y(e);return n?t.players.find(i=>i.id===n)?.name??n:"Unknown"}function kk(t,e){return t.events.speed_flip.map(n=>{const i=Dk(e,n.player),a=$y(n.player),s=e.frames[n.frame]?.time??n.time,r=n.confidence;return{id:`speed-flip:${n.frame}:${a}:${Math.round(r*1e3)}`,time:s,frame:n.frame,isTeamZero:n.is_team_0,playerId:a,playerName:i,position:{x:n.start_position[0],y:n.start_position[1],z:n.start_position[2]},quality:r,qualityLabel:`${Math.round(r*100)}%`}})}function Fk(t,e,n){const i=Math.max(.1,n);return t.filter(a=>{const s=e-a.time;return s>=0&&s<=i})}function Ok(){if(document.getElementById(fg))return;const t=document.createElement("style");t.id=fg,t.textContent=`
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
  `,document.head.append(t)}function Uk(t,e,n,i){if(i.copy(t).project(e),i.z<-1||i.z>1)return!1;const a=n.clientWidth||1,s=n.clientHeight||1;return i.x=(i.x+1)*a/2,i.y=(1-i.y)*s/2,!(i.x<-100||i.x>a+100||i.y<-100||i.y>s+100)}class Bk{scene;container;group=new _t;labelRoot;projectedPosition=new L;worldPosition=new L;labelOffset=new L(0,0,Nk);markers;views=new Map;changedContainerPosition=!1;originalContainerPosition="";decaySeconds=Ik;constructor(e,n,i,a){Ok(),this.scene=e,this.container=n,this.markers=kk(a,i),getComputedStyle(n).position==="static"&&(this.changedContainerPosition=!0,this.originalContainerPosition=n.style.position,n.style.position="relative"),this.group.name="speed-flip-overlay",this.scene.replayRoot.add(this.group),this.labelRoot=document.createElement("div"),this.labelRoot.className="sap-speed-flip-overlay-root",this.container.append(this.labelRoot)}update(e){const n=Fk(this.markers,e,this.decaySeconds),i=new Set(n.map(a=>a.id));for(const[a,s]of this.views.entries())i.has(a)||(s.ring.removeFromParent(),s.ring.geometry.dispose(),s.material.dispose(),s.label.remove(),this.views.delete(a));for(const a of n){const s=Math.max(0,e-a.time),r=Math.max(0,1-s/this.decaySeconds),o=this.ensureView(a),l=.16+.56*r,c=.96+(1-r)*.22;o.material.opacity=l,o.ring.position.set(a.position.x,a.position.y,a.position.z+14),o.ring.scale.setScalar(c+a.quality*.08),this.worldPosition.set(a.position.x,a.position.y,a.position.z).add(this.labelOffset);const u=Uk(this.worldPosition,this.scene.camera,this.container,this.projectedPosition);o.label.style.display=u?"block":"none",u&&(o.label.style.left=`${this.projectedPosition.x}px`,o.label.style.top=`${this.projectedPosition.y}px`,o.label.style.opacity=`${.42+.58*r}`)}}dispose(){for(const e of this.views.values())e.ring.removeFromParent(),e.ring.geometry.dispose(),e.material.dispose(),e.label.remove();this.views.clear(),this.group.removeFromParent(),this.labelRoot.remove(),this.changedContainerPosition&&(this.container.style.position=this.originalContainerPosition)}ensureView(e){const n=this.views.get(e.id);if(n)return n;const i=new st({color:e.quality>=.75?Rk:e.isTeamZero?Ak:Ck,transparent:!0,opacity:.8,side:Qe,depthWrite:!1,depthTest:!1}),a=new ka(Pk,Lk,48),s=new He(a,i);s.renderOrder=30,this.group.add(s);const r=document.createElement("div");r.className=`sap-speed-flip-overlay-label ${e.isTeamZero?"sap-speed-flip-overlay-label-blue":"sap-speed-flip-overlay-label-orange"}`,r.textContent=`${e.playerName} speed flip ${e.qualityLabel}`,this.labelRoot.append(r);const o={marker:e,ring:s,material:i,label:r};return this.views.set(e.id,o),o}}const cl=[{value:"big",label:"Big pads"},{value:"small",label:"Small pads"},{value:"ambiguous",label:"Ambiguous pads"}],ad=[{value:"both",label:"Pickup events"}],ul=[{value:"active",label:"Active play"},{value:"inactive",label:"Inactive play"},{value:"unknown",label:"Unknown activity"}],dl=[{value:"own",label:"Own half"},{value:"opponent",label:"Opponent half"},{value:"unknown",label:"Unknown half"}];function zk(t,e){return t===e||t==="ambiguous"}function Hk(t,e){const n=e?.events.boost_pickups??[];return n.length===0?null:n.find(i=>{const a=zt(i.player_id),s=i.reported_frame??i.frame;return a===t.player.id&&i.comparison==="both"&&s===t.event.frame&&zk(i.pad_type,t.pad.size)})??null}function Wy(t={}){let e=null,n=null,i=null,a=null,s=null,r=null;const o=new Set(cl.map(T=>T.value)),l=new Set(ad.map(T=>T.value)),c=new Set(ul.map(T=>T.value)),u=new Set(dl.map(T=>T.value));let d=null,f=!1;function p(T,A,v,x){const R=document.createElement("div");R.className="boost-pickup-filter-group";const I=document.createElement("p");I.className="module-settings-group-title",I.textContent=T;const U=document.createElement("div");U.className="boost-pickup-filter-options";for(const z of A){const G=document.createElement("label");G.className="toggle";const B=document.createElement("input");B.type="checkbox",B.dataset.boostPickupFilter=x,B.dataset.boostPickupValue=z.value,B.addEventListener("change",()=>{B.checked?v.add(z.value):v.delete(z.value),m(s),t.refreshTimelineRanges?.(),t.rerenderCurrentState?.(),t.requestConfigSync?.()});const X=document.createElement("span");X.textContent=z.label,G.append(B,X),U.append(G)}return R.append(I,U),R}function _(){const T=document.createElement("div");T.className="boost-pickup-filter-group boost-pickup-filter-group-wide",i=T;const A=document.createElement("p");return A.className="module-settings-group-title",A.textContent="Player",a=document.createElement("div"),a.className="boost-pickup-filter-options",T.append(A,a),T}function g(T){if(a&&(a.replaceChildren(),i&&(i.hidden=!T||T.players.length===0),!!T))for(const A of T.players){const v=document.createElement("label");v.className="toggle";const x=document.createElement("input");x.type="checkbox",x.dataset.boostPickupPlayerId=A.id,x.addEventListener("change",()=>{d||(d=new Set(T.players.map(I=>I.id))),x.checked?d.add(A.id):d.delete(A.id),m(T),t.refreshTimelineRanges?.(),t.rerenderCurrentState?.(),t.requestConfigSync?.()});const R=document.createElement("span");R.textContent=`${A.name} (${A.isTeamZero?"Blue":"Orange"})`,v.append(x,R),a.append(v)}}function m(T){if(e){for(const A of e.querySelectorAll("input[data-boost-pickup-filter][data-boost-pickup-value]")){const v=A.dataset.boostPickupFilter,x=A.dataset.boostPickupValue;A.checked=h(v,x)}for(const A of e.querySelectorAll("input[data-boost-pickup-player-id]")){const v=A.dataset.boostPickupPlayerId;A.checked=v?d?.has(v)??!0:!1}n&&(n.textContent=b(T))}}function h(T,A){if(!A)return!1;switch(T){case"pad-type":return o.has(A);case"comparison":return l.has(A);case"activity":return c.has(A);case"field-half":return u.has(A);default:return!1}}function b(T){const A=T?.players.length??0,v=d?d.size:A;if(o.size===0||l.size===0||c.size===0||u.size===0||d!==null&&d.size===0)return"Hidden";const R=[o.size<cl.length,l.size<ad.length,c.size<ul.length,u.size<dl.length,d!==null&&v<A].filter(Boolean).length;return R===0?"All labels":`${R} filters`}function S(T){if(d&&!d.has(T.player.id))return!1;if((r?.events.boost_pickups??[]).length===0)return o.has(T.pad.size)&&l.has("both")&&c.has("unknown")&&u.has("unknown");const A=Hk(T,r);return A?o.has(A.pad_type)&&l.has(A.comparison)&&c.has(A.activity)&&u.has(A.field_half):!1}function y(T,A,v){if(T.clear(),!Array.isArray(v)){for(const R of A)T.add(R.value);return}const x=new Set(A.map(R=>R.value));for(const R of v)typeof R=="string"&&x.has(R)&&T.add(R)}function C(){return{padTypes:[...o],comparisons:[...l],activities:[...c],fieldHalves:[...u],playerIds:d?[...d]:null}}function M(T){if(!T||typeof T!="object"||Array.isArray(T))return;const A=T;y(o,cl,A.padTypes),y(l,ad,A.comparisons),y(c,ul,A.activities),y(u,dl,A.fieldHalves),d=Array.isArray(A.playerIds)?new Set(A.playerIds.filter(v=>typeof v=="string")):null,f=s===null&&d!==null,m(s),t.refreshTimelineRanges?.(),t.rerenderCurrentState?.(),t.requestConfigSync?.()}return{setup(T){s!==T.replay&&(s=T.replay,f?f=!1:d=null),r=T.statsTimeline,m(T.replay)},teardown(){},getConfig:C,applyConfig:M,getTimelineRangeOptions(){const T={padTypes:o,comparisons:l,activities:c,fieldHalves:u};return d&&(T.playerIds=d),T},includePickup:S,renderSettings(T,A){if(!e){e=document.createElement("div"),e.className="boost-pickup-filter-panel";const v=document.createElement("div");v.className="boost-pickup-filter-summary",n=document.createElement("strong"),n.className="metric-readout",v.append(n);const x=document.createElement("div");x.className="boost-pickup-filter-grid",x.append(p("Pad type",cl,o,"pad-type"),p("Activity",ul,c,"activity"),p("Field half",dl,u,"field-half"),_()),(A.showHeader??!1)&&e.append(v),e.append(x)}return g(T?.replay??null),m(T?.replay??null),e}}}function vn(t){return{id:t.id,label:t.label,setup(){},teardown(){},onBeforeRender(){},getTimelineEvents:t.getTimelineEvents,renderStats(e,n){const i=wt(n.statsFrameLookup,e);return i?Zt(i.players,a=>Ht(a.name,a.is_team_0,t.render(t.select(a),a))):""},renderFocusedPlayerStats(e,n,i){const a=Bt(i,n,e);return a?t.render(t.select(a),a):""}}}const Vk=255;function Fa(t){return t*100/Vk}function Dn(t){return t==null?"?":Fa(t).toFixed(0)}function Gk(t,e){const n=Dn(t);if(t==null||e==null)return n;const i=Dn(t+e);return`${n} (${i})`}function sd(t){t&&typeof t=="object"&&"dispose"in t&&typeof t.dispose=="function"&&t.dispose()}function $k(t){t&&(t.removeFromParent(),t.traverse(e=>{const n="geometry"in e?e.geometry:null;sd(n);const i="material"in e?e.material:null;if(Array.isArray(i))for(const a of i)sd(a);else sd(i)}))}function Wk(){let t=0,e=null;return{acquire(n){e||(e=CI(n.player.sceneState.scene,n.fieldScale)),t+=1},release(){t<=0||(t-=1,t===0&&($k(e),e=null))}}}const pg=Wk();function Ue(t){return t===void 0||Number.isNaN(t)?"?":`${Math.round(t)}`}function ve(t,e=1,n=""){return t===void 0||Number.isNaN(t)?"?":`${t.toFixed(e)}${n}`}function Lf(t,e=0){return ve(t,e,"%")}function Xy(t,e,n=1,i=0){if(t===void 0||Number.isNaN(t))return Lf(e,i);const a=ve(t,n,"s");return e===void 0||Number.isNaN(e)?a:`${a} (${Lf(e,i)})`}function ma(t,e,n=1,i=0){const a=t!==void 0&&e!==void 0&&!Number.isNaN(t)&&!Number.isNaN(e)&&e>0?t*100/e:void 0;return Xy(t,a,n,i)}function Ke(t){return typeof t=="number"&&Number.isFinite(t)?t:void 0}function ti(t){const e=Ke(t);return e===void 0?void 0:e*100}function qy(t){return Ke(t?.tracked_time)}function Xk(t,e,n){const i=Ke(t?.[e]);if(i!==void 0)return i;const a=qy(t),s=Ke(t?.[n]);if(!(a===void 0||a<=0||s===void 0))return s*100/a}function en(t,e,n){return Xy(Ke(t?.[n]),Xk(t,e,n))}function hg(t,e,n){const i=Ke(t?.[e]);if(i!==void 0)return i;const a=qy(t),s=Ke(t?.[n]);if(!(a===void 0||a<=0||s===void 0))return s/a}function mg(t){return`
    <div class="stat-row"><span class="label">Most back</span><span class="value">${en(t,"percent_most_back","time_most_back")}</span></div>
    <div class="stat-row"><span class="label">Most forward</span><span class="value">${en(t,"percent_most_forward","time_most_forward")}</span></div>
    <div class="stat-row"><span class="label">Mid role</span><span class="value">${en(t,"percent_mid_role","time_mid_role")}</span></div>
    <div class="stat-row"><span class="label">Other role</span><span class="value">${en(t,"percent_other_role","time_other_role")}</span></div>
    <div class="stat-row"><span class="label">Closest to ball</span><span class="value">${en(t,"percent_closest_to_ball","time_closest_to_ball")}</span></div>
    <div class="stat-row"><span class="label">Farthest from ball</span><span class="value">${en(t,"percent_farthest_from_ball","time_farthest_from_ball")}</span></div>
    <div class="stat-row"><span class="label">Behind ball</span><span class="value">${en(t,"percent_behind_ball","time_behind_ball")}</span></div>
    <div class="stat-row"><span class="label">Level with ball</span><span class="value">${en(t,"percent_level_with_ball","time_level_with_ball")}</span></div>
    <div class="stat-row"><span class="label">In front of ball</span><span class="value">${en(t,"percent_in_front_of_ball","time_in_front_of_ball")}</span></div>
  `}function _g(t){return`
    <div class="stat-row"><span class="label">Defensive zone</span><span class="value">${en(t,"percent_defensive_third","time_defensive_third")}</span></div>
    <div class="stat-row"><span class="label">Neutral zone</span><span class="value">${en(t,"percent_neutral_third","time_neutral_third")}</span></div>
    <div class="stat-row"><span class="label">Offensive zone</span><span class="value">${en(t,"percent_offensive_third","time_offensive_third")}</span></div>
    <div class="stat-row"><span class="label">Defensive half</span><span class="value">${en(t,"percent_defensive_half","time_defensive_half")}</span></div>
    <div class="stat-row"><span class="label">Offensive half</span><span class="value">${en(t,"percent_offensive_half","time_offensive_half")}</span></div>
    <div class="stat-row"><span class="label">To teammates</span><span class="value">${ve(hg(t,"average_distance_to_teammates","sum_distance_to_teammates"),0)}</span></div>
    <div class="stat-row"><span class="label">To ball</span><span class="value">${ve(hg(t,"average_distance_to_ball","sum_distance_to_ball"),0)}</span></div>
  `}function pa(t,e){return ma(Ke(t?.[e]),Ke(t?.tracked_time))}function gg(t){return t?t.split("_").map(e=>e.charAt(0).toUpperCase()+e.slice(1)).join(" "):"?"}function qk(t){const e=t&&t.first_man_stint_count>0?t.time_first_man/t.first_man_stint_count:void 0;return`
    <div class="stat-row"><span class="label">Current role</span><span class="value">${gg(t?.current_role_state)}</span></div>
    <div class="stat-row"><span class="label">Current depth</span><span class="value">${gg(t?.current_depth_state)}</span></div>
    <div class="stat-row"><span class="label">First man</span><span class="value">${pa(t,"time_first_man")}</span></div>
    <div class="stat-row"><span class="label">First stints</span><span class="value">${Ue(t?.first_man_stint_count)}</span></div>
    <div class="stat-row"><span class="label">Avg first stint</span><span class="value">${ve(e,2,"s")}</span></div>
    <div class="stat-row"><span class="label">Longest first stint</span><span class="value">${ve(t?.longest_first_man_stint_time,2,"s")}</span></div>
    <div class="stat-row"><span class="label">Second man</span><span class="value">${pa(t,"time_second_man")}</span></div>
    <div class="stat-row"><span class="label">Third man</span><span class="value">${pa(t,"time_third_man")}</span></div>
    <div class="stat-row"><span class="label">Ambiguous</span><span class="value">${pa(t,"time_ambiguous_role")}</span></div>
    <div class="stat-row"><span class="label">Behind play</span><span class="value">${pa(t,"time_behind_play")}</span></div>
    <div class="stat-row"><span class="label">Level with play</span><span class="value">${pa(t,"time_level_with_play")}</span></div>
    <div class="stat-row"><span class="label">Ahead of play</span><span class="value">${pa(t,"time_ahead_of_play")}</span></div>
    <div class="stat-row"><span class="label">Became first</span><span class="value">${Ue(t?.became_first_man_count)}</span></div>
    <div class="stat-row"><span class="label">Lost first</span><span class="value">${Ue(t?.lost_first_man_count)}</span></div>
  `}function Yk(t){const e=t&&t.shots>0?t.goals*100/t.shots:void 0;return`
    <div class="stat-row"><span class="label">Score</span><span class="value">${Ue(t?.score)}</span></div>
    <div class="stat-row"><span class="label">Goals</span><span class="value">${Ue(t?.goals)}</span></div>
    <div class="stat-row"><span class="label">Assists</span><span class="value">${Ue(t?.assists)}</span></div>
    <div class="stat-row"><span class="label">Saves</span><span class="value">${Ue(t?.saves)}</span></div>
    <div class="stat-row"><span class="label">Shots</span><span class="value">${Ue(t?.shots)}</span></div>
    <div class="stat-row"><span class="label">Shooting %</span><span class="value">${Lf(e)}</span></div>
  `}function Kk(t){return`
    <div class="stat-row"><span class="label">Hits</span><span class="value">${Ue(t?.count)}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${ve(Ke(t?.time_since_last_backboard),2,"s")}</span></div>
  `}function jk(t){return`
    <div class="stat-row"><span class="label">Count</span><span class="value">${Ue(t?.count)}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${ve(Ke(t?.time_since_last_double_tap),2,"s")}</span></div>
  `}function Zk(t){const e=t&&t.completed_pass_count>0?t.total_pass_distance/t.completed_pass_count:void 0,n=t&&t.completed_pass_count>0?t.total_pass_advance/t.completed_pass_count:void 0;return`
    <div class="stat-row"><span class="label">Completed</span><span class="value">${Ue(t?.completed_pass_count)}</span></div>
    <div class="stat-row"><span class="label">Received</span><span class="value">${Ue(t?.received_pass_count)}</span></div>
    <div class="stat-row"><span class="label">Avg distance</span><span class="value">${ve(e,0)}</span></div>
    <div class="stat-row"><span class="label">Avg advance</span><span class="value">${ve(n,0)}</span></div>
    <div class="stat-row"><span class="label">Longest</span><span class="value">${ve(t?.longest_pass_distance,0)}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${ve(Ke(t?.time_since_last_completed_pass),2,"s")}</span></div>
  `}function Jk(t){const e=t&&t.count>0?t.total_ball_speed/t.count:void 0,n=t&&t.count>0?t.total_pass_distance/t.count:void 0;return`
    <div class="stat-row"><span class="label">Attempts</span><span class="value">${Ue(t?.count)}</span></div>
    <div class="stat-row"><span class="label">Avg speed</span><span class="value">${ve(e,0)}</span></div>
    <div class="stat-row"><span class="label">Fastest</span><span class="value">${ve(t?.fastest_ball_speed,0)}</span></div>
    <div class="stat-row"><span class="label">Avg pass distance</span><span class="value">${ve(n,0)}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${ve(Ke(t?.time_since_last_one_timer),2,"s")}</span></div>
  `}function vg(t){const e=t&&t.count>0?t.cumulative_confidence/t.count:void 0;return`
    <div class="stat-row"><span class="label">Attempts</span><span class="value">${Ue(t?.count)}</span></div>
    <div class="stat-row"><span class="label">High conf</span><span class="value">${Ue(t?.high_confidence_count)}</span></div>
    <div class="stat-row"><span class="label">Last quality</span><span class="value">${ve(Ke(t?.last_confidence),0,"%")}</span></div>
    <div class="stat-row"><span class="label">Avg quality</span><span class="value">${ve(e,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Best quality</span><span class="value">${ve(Ke(t?.best_confidence),0,"%")}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${ve(Ke(t?.time_since_last_ceiling_shot),2,"s")}</span></div>
  `}function yg(t){const e=t&&t.count>0?t.cumulative_confidence/t.count:void 0,n=ti(e),i=t&&t.count>0?t.cumulative_setup_duration/t.count:void 0,a=t&&t.count>0?t.cumulative_takeoff_to_touch_time/t.count:void 0,s=t&&t.count>0?t.cumulative_touch_height/t.count:void 0;return`
    <div class="stat-row"><span class="label">Plays</span><span class="value">${Ue(t?.count)}</span></div>
    <div class="stat-row"><span class="label">High conf</span><span class="value">${Ue(t?.high_confidence_count)}</span></div>
    <div class="stat-row"><span class="label">Last quality</span><span class="value">${ve(ti(t?.last_confidence),0,"%")}</span></div>
    <div class="stat-row"><span class="label">Avg quality</span><span class="value">${ve(n,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Avg setup</span><span class="value">${ve(i,2,"s")}</span></div>
    <div class="stat-row"><span class="label">Avg takeoff</span><span class="value">${ve(a,2,"s")}</span></div>
    <div class="stat-row"><span class="label">Avg height</span><span class="value">${ve(s,0)}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${ve(Ke(t?.time_since_last_wall_aerial),2,"s")}</span></div>
  `}function bg(t){const e=t&&t.count>0?t.cumulative_confidence/t.count:void 0,n=t&&t.count>0?t.cumulative_takeoff_to_shot_time/t.count:void 0,i=t&&t.count>0?t.cumulative_shot_height/t.count:void 0;return`
    <div class="stat-row"><span class="label">Shots</span><span class="value">${Ue(t?.count)}</span></div>
    <div class="stat-row"><span class="label">High conf</span><span class="value">${Ue(t?.high_confidence_count)}</span></div>
    <div class="stat-row"><span class="label">Last quality</span><span class="value">${ve(ti(t?.last_confidence),0,"%")}</span></div>
    <div class="stat-row"><span class="label">Avg quality</span><span class="value">${ve(ti(e),0,"%")}</span></div>
    <div class="stat-row"><span class="label">Avg takeoff</span><span class="value">${ve(n,2,"s")}</span></div>
    <div class="stat-row"><span class="label">Avg height</span><span class="value">${ve(i,0)}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${ve(Ke(t?.time_since_last_wall_aerial_shot),2,"s")}</span></div>
  `}function Qk(t){const e=t&&t.carry_count>0?t.average_horizontal_gap_sum/t.carry_count:void 0;return`
    <div class="stat-row"><span class="label">Carries</span><span class="value">${Ue(t?.carry_count)}</span></div>
    <div class="stat-row"><span class="label">Total time</span><span class="value">${ve(t?.total_carry_time,1,"s")}</span></div>
    <div class="stat-row"><span class="label">Longest</span><span class="value">${ve(t?.longest_carry_time,1,"s")}</span></div>
    <div class="stat-row"><span class="label">Furthest</span><span class="value">${ve(t?.furthest_carry_distance,0)}</span></div>
    <div class="stat-row"><span class="label">Avg gap</span><span class="value">${ve(e,0)}</span></div>
  `}function eF(t){const e=t&&t.count>0?t.average_horizontal_gap_sum/t.count:void 0,n=t&&t.count>0?t.total_touch_count/t.count:void 0;return`
    <div class="stat-row"><span class="label">Air dribbles</span><span class="value">${Ue(t?.count)}</span></div>
    <div class="stat-row"><span class="label">Ground to air</span><span class="value">${Ue(t?.ground_to_air_count)}</span></div>
    <div class="stat-row"><span class="label">Wall to air</span><span class="value">${Ue(t?.wall_to_air_count)}</span></div>
    <div class="stat-row"><span class="label">Avg touches</span><span class="value">${ve(n,1)}</span></div>
    <div class="stat-row"><span class="label">Max touches</span><span class="value">${Ue(t?.max_touch_count)}</span></div>
    <div class="stat-row"><span class="label">Total time</span><span class="value">${ve(t?.total_time,1,"s")}</span></div>
    <div class="stat-row"><span class="label">Longest</span><span class="value">${ve(t?.longest_time,1,"s")}</span></div>
    <div class="stat-row"><span class="label">Furthest</span><span class="value">${ve(t?.furthest_distance,0)}</span></div>
    <div class="stat-row"><span class="label">Avg gap</span><span class="value">${ve(e,0)}</span></div>
  `}function tF(t){const e=t&&t.press_count>0?t.total_duration/t.press_count:void 0;return`
    <div class="stat-row"><span class="label">Presses</span><span class="value">${Ue(t?.press_count)}</span></div>
    <div class="stat-row"><span class="label">Total time</span><span class="value">${ve(t?.total_duration,1,"s")}</span></div>
    <div class="stat-row"><span class="label">Avg duration</span><span class="value">${ve(e,2,"s")}</span></div>
  `}function nF(t){const e=t&&t.whiff_count>0?t.cumulative_closest_approach_distance/t.whiff_count:void 0;return`
    <div class="stat-row"><span class="label">Whiffs</span><span class="value">${Ue(t?.whiff_count)}</span></div>
    <div class="stat-row"><span class="label">Beaten to ball</span><span class="value">${Ue(t?.beaten_to_ball_count)}</span></div>
    <div class="stat-row"><span class="label">Grounded</span><span class="value">${Ue(t?.grounded_whiff_count)}</span></div>
    <div class="stat-row"><span class="label">Aerial</span><span class="value">${Ue(t?.aerial_whiff_count)}</span></div>
    <div class="stat-row"><span class="label">Dodge</span><span class="value">${Ue(t?.dodge_whiff_count)}</span></div>
    <div class="stat-row"><span class="label">Last closest</span><span class="value">${ve(Ke(t?.last_closest_approach_distance),0)}</span></div>
    <div class="stat-row"><span class="label">Best closest</span><span class="value">${ve(Ke(t?.best_closest_approach_distance),0)}</span></div>
    <div class="stat-row"><span class="label">Avg closest</span><span class="value">${ve(e,0)}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${ve(Ke(t?.time_since_last_whiff),2,"s")}</span></div>
  `}function iF(t){return`
    <div class="stat-row"><span class="label">Inflicted</span><span class="value">${Ue(t?.demos_inflicted)}</span></div>
    <div class="stat-row"><span class="label">Taken</span><span class="value">${Ue(t?.demos_taken)}</span></div>
  `}function aF(t){const e=t&&t.bumps_inflicted>0?t.cumulative_bump_strength/t.bumps_inflicted:void 0;return`
    <div class="stat-row"><span class="label">Inflicted</span><span class="value">${Ue(t?.bumps_inflicted)}</span></div>
    <div class="stat-row"><span class="label">Taken</span><span class="value">${Ue(t?.bumps_taken)}</span></div>
    <div class="stat-row"><span class="label">Team inflicted</span><span class="value">${Ue(t?.team_bumps_inflicted)}</span></div>
    <div class="stat-row"><span class="label">Team taken</span><span class="value">${Ue(t?.team_bumps_taken)}</span></div>
    <div class="stat-row"><span class="label">Last strength</span><span class="value">${ve(Ke(t?.last_bump_strength),0)}</span></div>
    <div class="stat-row"><span class="label">Max strength</span><span class="value">${ve(Ke(t?.max_bump_strength),0)}</span></div>
    <div class="stat-row"><span class="label">Avg strength</span><span class="value">${ve(e,0)}</span></div>
  `}function sF(t){return`
    <div class="stat-row"><span class="label">Refreshes</span><span class="value">${Ue(t?.count)}</span></div>
    <div class="stat-row"><span class="label">Flip resets</span><span class="value">${Ue(t?.on_ball_count)}</span></div>
  `}function xg(t){const e=t&&t.count>0?t.cumulative_confidence/t.count:void 0;return`
    <div class="stat-row"><span class="label">Attempts</span><span class="value">${Ue(t?.count)}</span></div>
    <div class="stat-row"><span class="label">High conf</span><span class="value">${Ue(t?.high_confidence_count)}</span></div>
    <div class="stat-row"><span class="label">Last quality</span><span class="value">${ve(Ke(t?.last_confidence),0,"%")}</span></div>
    <div class="stat-row"><span class="label">Avg quality</span><span class="value">${ve(e,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Best quality</span><span class="value">${ve(Ke(t?.best_confidence),0,"%")}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${ve(Ke(t?.time_since_last_musty),2,"s")}</span></div>
  `}function Sg(t){const e=t&&t.count>0?t.cumulative_confidence/t.count:void 0,n=t&&t.count>0?t.cumulative_setup_duration/t.count:void 0,i=t&&t.count>0?t.cumulative_ball_speed_change/t.count:void 0;return`
    <div class="stat-row"><span class="label">Attempts</span><span class="value">${Ue(t?.count)}</span></div>
    <div class="stat-row"><span class="label">High conf</span><span class="value">${Ue(t?.high_confidence_count)}</span></div>
    <div class="stat-row"><span class="label">Last quality</span><span class="value">${ve(Ke(t?.last_confidence),0,"%")}</span></div>
    <div class="stat-row"><span class="label">Avg quality</span><span class="value">${ve(e,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Avg setup</span><span class="value">${ve(n,2,"s")}</span></div>
    <div class="stat-row"><span class="label">Avg impulse</span><span class="value">${ve(i,0,"uu/s")}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${ve(Ke(t?.time_since_last_flick),2,"s")}</span></div>
  `}function wg(t){const e=t&&t.count>0?t.cumulative_quality/t.count:void 0;return`
    <div class="stat-row"><span class="label">Attempts</span><span class="value">${Ue(t?.count)}</span></div>
    <div class="stat-row"><span class="label">High conf</span><span class="value">${Ue(t?.high_confidence_count)}</span></div>
    <div class="stat-row"><span class="label">Last quality</span><span class="value">${ve(Ke(t?.last_quality),0,"%")}</span></div>
    <div class="stat-row"><span class="label">Avg quality</span><span class="value">${ve(e,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Best quality</span><span class="value">${ve(Ke(t?.best_quality),0,"%")}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${ve(Ke(t?.time_since_last_speed_flip),2,"s")}</span></div>
  `}function Eg(t){const e=t&&t.count>0?t.cumulative_quality/t.count:void 0,n=ti(t?.last_quality),i=ti(e),a=ti(t?.best_quality);return`
    <div class="stat-row"><span class="label">Attempts</span><span class="value">${Ue(t?.count)}</span></div>
    <div class="stat-row"><span class="label">High conf</span><span class="value">${Ue(t?.high_confidence_count)}</span></div>
    <div class="stat-row"><span class="label">Last quality</span><span class="value">${ve(n,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Avg quality</span><span class="value">${ve(i,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Best quality</span><span class="value">${ve(a,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${ve(Ke(t?.time_since_last_half_flip),2,"s")}</span></div>
  `}function Mg(t){const e=t&&t.count>0?t.cumulative_quality/t.count:void 0,n=ti(t?.last_quality),i=ti(e),a=ti(t?.best_quality);return`
    <div class="stat-row"><span class="label">Attempts</span><span class="value">${Ue(t?.count)}</span></div>
    <div class="stat-row"><span class="label">High conf</span><span class="value">${Ue(t?.high_confidence_count)}</span></div>
    <div class="stat-row"><span class="label">Last quality</span><span class="value">${ve(n,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Avg quality</span><span class="value">${ve(i,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Best quality</span><span class="value">${ve(a,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${ve(Ke(t?.time_since_last_wavedash),2,"s")}</span></div>
  `}function Tg(t){const e=t&&t.tracked_time>0?Fa(t.boost_integral/t.tracked_time).toFixed(0):"?",n=Ke(t?.tracked_time);return`
    <div class="stat-row"><span class="label">Collected</span><span class="value">${Gk(t?.amount_collected,t?.amount_respawned)}</span></div>
    <div class="stat-row"><span class="label">Inactive collected</span><span class="value">${Dn(t?.amount_collected_inactive)}</span></div>
    <div class="stat-row"><span class="label">Big pads amt</span><span class="value">${Dn(t?.amount_collected_big)}</span></div>
    <div class="stat-row"><span class="label">Small pads amt</span><span class="value">${Dn(t?.amount_collected_small)}</span></div>
    <div class="stat-row"><span class="label">Respawns</span><span class="value">${Dn(t?.amount_respawned)}</span></div>
    <div class="stat-row"><span class="label">Overfill</span><span class="value">${Dn(t?.overfill_total)}</span></div>
    <div class="stat-row"><span class="label">Used</span><span class="value">${Dn(t?.amount_used)}</span></div>
    <div class="stat-row"><span class="label">Used ground</span><span class="value">${Dn(t?.amount_used_while_grounded)}</span></div>
    <div class="stat-row"><span class="label">Used air</span><span class="value">${Dn(t?.amount_used_while_airborne)}</span></div>
    <div class="stat-row"><span class="label">Big pads</span><span class="value">${t?.big_pads_collected??"?"}</span></div>
    <div class="stat-row"><span class="label">Small pads</span><span class="value">${t?.small_pads_collected??"?"}</span></div>
    <div class="stat-row"><span class="label">Inactive big pads</span><span class="value">${t?.big_pads_collected_inactive??"?"}</span></div>
    <div class="stat-row"><span class="label">Inactive small pads</span><span class="value">${t?.small_pads_collected_inactive??"?"}</span></div>
    <div class="stat-row"><span class="label">Stolen</span><span class="value">${Dn(t?.amount_stolen)}</span></div>
    <div class="stat-row"><span class="label">Avg boost</span><span class="value">${e}</span></div>
    <div class="stat-row"><span class="label">Time @ 0</span><span class="value">${ma(Ke(t?.time_zero_boost),n)}</span></div>
    <div class="stat-row"><span class="label">Time 0-25</span><span class="value">${ma(Ke(t?.time_boost_0_25),n)}</span></div>
    <div class="stat-row"><span class="label">Time 25-50</span><span class="value">${ma(Ke(t?.time_boost_25_50),n)}</span></div>
    <div class="stat-row"><span class="label">Time 50-75</span><span class="value">${ma(Ke(t?.time_boost_50_75),n)}</span></div>
    <div class="stat-row"><span class="label">Time 75-100</span><span class="value">${ma(Ke(t?.time_boost_75_100),n)}</span></div>
    <div class="stat-row"><span class="label">Time @ 100</span><span class="value">${ma(Ke(t?.time_hundred_boost),n)}</span></div>
  `}function rF(t,e=Wy({refreshTimelineRanges:t.refreshTimelineRanges,rerenderCurrentState:t.rerenderCurrentState})){return{id:"boost",label:"Boost",setup(n){e.setup(n)},teardown(){e.teardown()},onBeforeRender(){},getTimelineRanges(n){return ak(n.statsTimeline,n.replay,e.getTimelineRangeOptions())},getConfig(){return e.getConfig()},applyConfig(n){e.applyConfig(n)},includeBoostPickupAnimationPickup(n){return e.includePickup(n)},renderStats(n,i){const a=wt(i.statsFrameLookup,n);return a?Zt(a.players,s=>Ht(s.name,s.is_team_0,Tg(s.boost))):""},renderFocusedPlayerStats(n,i,a){const s=Bt(a,i,n);return s?Tg(s.boost):""},renderSettings(n){return e.renderSettings(n,{showHeader:!0})}}}function oF(){return vn({id:"core",label:"Core",select:t=>t.core,render:t=>Yk(t)})}function lF(){return vn({id:"backboard",label:"Backboard",select:t=>t.backboard,render:t=>Kk(t),getTimelineEvents(t){return ND(t.statsTimeline,t.replay)}})}function cF(){let t=null;return{id:"ceiling-shot",label:"Ceiling Shot",setup(e){t=new dD(e.player.sceneState,e.player.container,e.replay,e.statsTimeline)},teardown(){t?.dispose(),t=null},onBeforeRender(e){t?.update(e.currentTime)},renderStats(e,n){const i=wt(n.statsFrameLookup,e);return i?Zt(i.players,a=>Ht(a.name,a.is_team_0,vg(a.ceiling_shot),a.ceiling_shot?.is_last_ceiling_shot?'<span class="role-indicator role-forward">Last Ceiling Shot</span>':"")):""},renderFocusedPlayerStats(e,n,i){const a=Bt(i,n,e);return a?vg(a.ceiling_shot):""}}}function uF(){return{id:"wall-aerial",label:"Wall-to-Air Setup",setup(){},teardown(){},onBeforeRender(){},renderStats(t,e){const n=wt(e.statsFrameLookup,t);return n?Zt(n.players,i=>Ht(i.name,i.is_team_0,yg(i.wall_aerial),i.wall_aerial?.is_last_wall_aerial?'<span class="role-indicator role-forward">Last Wall-to-Air Setup</span>':"")):""},renderFocusedPlayerStats(t,e,n){const i=Bt(n,e,t);return i?yg(i.wall_aerial):""}}}function dF(){return{id:"wall-aerial-shot",label:"Wall Aerial Shot",setup(){},teardown(){},onBeforeRender(){},renderStats(t,e){const n=wt(e.statsFrameLookup,t);return n?Zt(n.players,i=>Ht(i.name,i.is_team_0,bg(i.wall_aerial_shot),i.wall_aerial_shot?.is_last_wall_aerial_shot?'<span class="role-indicator role-forward">Last Wall Aerial Shot</span>':"")):""},renderFocusedPlayerStats(t,e,n){const i=Bt(n,e,t);return i?bg(i.wall_aerial_shot):""}}}function fF(){return vn({id:"ball-carry",label:"Ball Carry",select:t=>t.ball_carry,render:t=>Qk(t)})}function pF(){return vn({id:"air-dribble",label:"Air Dribble",select:t=>t.air_dribble,render:t=>eF(t)})}function hF(){return vn({id:"dodge-reset",label:"Dodge Refresh",select:t=>t.dodge_reset,render:t=>sF(t)})}function mF(){return vn({id:"double-tap",label:"Double Tap",select:t=>t.double_tap,render:t=>jk(t)})}function _F(){return vn({id:"pass",label:"Pass",select:t=>t.pass,render:t=>Zk(t)})}function gF(){return vn({id:"one-timer",label:"One-timer",select:t=>t.one_timer,render:t=>Jk(t)})}function vF(){return{id:"musty-flick",label:"Musty Flick",setup(){},teardown(){},onBeforeRender(){},renderStats(t,e){const n=wt(e.statsFrameLookup,t);return n?Zt(n.players,i=>Ht(i.name,i.is_team_0,xg(i.musty_flick),i.musty_flick?.is_last_musty?'<span class="role-indicator role-forward">Last Musty</span>':"")):""},renderFocusedPlayerStats(t,e,n){const i=Bt(n,e,t);return i?xg(i.musty_flick):""}}}function yF(){return{id:"flick",label:"Flick",setup(){},teardown(){},onBeforeRender(){},renderStats(t,e){const n=wt(e.statsFrameLookup,t);return n?Zt(n.players,i=>Ht(i.name,i.is_team_0,Sg(i.flick),i.flick?.is_last_flick?'<span class="role-indicator role-forward">Last Flick</span>':"")):""},renderFocusedPlayerStats(t,e,n){const i=Bt(n,e,t);return i?Sg(i.flick):""}}}function bF(){let t=null;return{id:"speed-flip",label:"Speed Flip",setup(e){t=new Bk(e.player.sceneState,e.player.container,e.replay,e.statsTimeline)},teardown(){t?.dispose(),t=null},onBeforeRender(e){t?.update(e.currentTime)},renderStats(e,n){const i=wt(n.statsFrameLookup,e);return i?Zt(i.players,a=>Ht(a.name,a.is_team_0,wg(a.speed_flip),a.speed_flip?.is_last_speed_flip?'<span class="role-indicator role-forward">Last Speed Flip</span>':"")):""},renderFocusedPlayerStats(e,n,i){const a=Bt(i,n,e);return a?wg(a.speed_flip):""}}}function xF(){return{id:"half-flip",label:"Half Flip",setup(){},teardown(){},onBeforeRender(){},renderStats(t,e){const n=wt(e.statsFrameLookup,t);return n?Zt(n.players,i=>Ht(i.name,i.is_team_0,Eg(i.half_flip),i.half_flip?.is_last_half_flip?'<span class="role-indicator role-forward">Last Half Flip</span>':"")):""},renderFocusedPlayerStats(t,e,n){const i=Bt(n,e,t);return i?Eg(i.half_flip):""}}}function SF(){return{id:"wavedash",label:"Wavedash",setup(){},teardown(){},onBeforeRender(){},getTimelineEvents(t){return kD(t.statsTimeline,t.replay)},renderStats(t,e){const n=wt(e.statsFrameLookup,t);return n?Zt(n.players,i=>Ht(i.name,i.is_team_0,Mg(i.wavedash),i.wavedash?.is_last_wavedash?'<span class="role-indicator role-forward">Last Wavedash</span>':"")):""},renderFocusedPlayerStats(t,e,n){const i=Bt(n,e,t);return i?Mg(i.wavedash):""}}}function wF(t){let e=null,n=5,i="advancement",a=null,s=null,r=null,o=null;const l=new Set,c=["kind","height_band","surface","dodge_state"];return{id:"touch",label:"Touch",setup(f){e=new bD(f.player.sceneState,f.player.container,f.replay,f.statsTimeline,{mode:i}),e.setDecaySeconds(n),u()},teardown(){e?.dispose(),e=null},onBeforeRender(f){e?.update(f.currentTime)},getTimelineEvents(f){return LD(f.statsTimeline,f.replay)},getConfig(){return{decaySeconds:n,overlayMode:i,breakdownClasses:d()}},applyConfig(f){if(f&&typeof f=="object"&&!Array.isArray(f)){const p=f;if(typeof p.decaySeconds=="number"&&Number.isFinite(p.decaySeconds)&&(n=Math.max(1,Math.min(10,p.decaySeconds)),e?.setDecaySeconds(n)),(p.overlayMode==="markers"||p.overlayMode==="advancement")&&(i=p.overlayMode,e?.setMode(i)),l.clear(),Array.isArray(p.breakdownClasses))for(const _ of p.breakdownClasses)c.includes(_)&&l.add(_)}u(),t.rerenderCurrentState()},renderStats(f,p){const _=wt(p.statsFrameLookup,f);return _?Zt(_.players,g=>Ht(g.name,g.is_team_0,dg(g.touch,{breakdownClasses:d()}),g.touch?.is_last_touch?'<span class="role-indicator role-forward">Last Touch</span>':"")):""},renderFocusedPlayerStats(f,p,_){const g=Bt(_,p,f);return g?dg(g.touch,{breakdownClasses:d()}):""},renderSettings(){if(!a){a=document.createElement("div"),a.className="module-settings-card";const f=document.createElement("div");f.className="module-settings-header";const p=document.createElement("div"),_=document.createElement("p");_.className="module-settings-eyebrow",_.textContent="Touch markers";const g=document.createElement("h3");g.textContent="Touch decay",p.append(_,g),s=document.createElement("strong"),s.className="metric-readout",f.append(p,s);const m=document.createElement("label"),h=document.createElement("span");h.className="label",h.textContent="Keep each marker visible after the touch";const b=document.createElement("input");b.type="range",b.min="1",b.max="10",b.step="0.5",b.value=`${n}`,b.addEventListener("input",()=>{const G=Number(b.value);n=Number.isFinite(G)?Math.max(1,Math.min(10,G)):n,e?.setDecaySeconds(n),u(n),t.requestConfigSync?.()}),m.append(h,b);const S=document.createElement("div");S.className="module-settings-subgroup";const y=document.createElement("div");y.className="module-settings-header";const C=document.createElement("div"),M=document.createElement("p");M.className="module-settings-eyebrow",M.textContent="Overlay";const T=document.createElement("h3");T.textContent="Touch mode",C.append(M,T),r=document.createElement("strong"),r.className="metric-readout",y.append(C,r);const A=document.createElement("div");A.className="module-settings-options";for(const G of[{mode:"markers",label:"Markers"},{mode:"advancement",label:"Advancement"}]){const B=document.createElement("label");B.className="toggle";const X=document.createElement("input");X.type="radio",X.name="touch-overlay-mode",X.dataset.overlayMode=G.mode,X.addEventListener("change",()=>{X.checked&&(i=G.mode,e?.setMode(i),u(),t.requestConfigSync?.())});const V=document.createElement("span");V.textContent=G.label,B.append(X,V),A.append(B)}S.append(y,A);const v=document.createElement("div");v.className="module-settings-subgroup";const x=document.createElement("div");x.className="module-settings-header";const R=document.createElement("div"),I=document.createElement("p");I.className="module-settings-eyebrow",I.textContent="Stat display";const U=document.createElement("h3");U.textContent="Touch breakdown",R.append(I,U),o=document.createElement("strong"),o.className="metric-readout",x.append(R,o);const z=document.createElement("div");z.className="module-settings-options";for(const G of[{className:"kind",label:"Kind"},{className:"height_band",label:"Height"},{className:"surface",label:"Surface"},{className:"dodge_state",label:"Dodge"}]){const B=document.createElement("label");B.className="toggle";const X=document.createElement("input");X.type="checkbox",X.dataset.breakdownClass=G.className,X.addEventListener("change",()=>{X.checked?l.add(G.className):l.delete(G.className),u(),t.rerenderCurrentState(),t.requestConfigSync?.()});const V=document.createElement("span");V.textContent=G.label,B.append(X,V),z.append(B)}v.append(x,z),a.append(f,m,S,v)}return u(),a}};function u(f){if(!a)return;const p=f??n,_=a.querySelector("input");_ instanceof HTMLInputElement&&(_.value=`${p}`),s&&(s.textContent=`${p.toFixed(1)}s`);for(const g of a.querySelectorAll("input[data-overlay-mode]"))g.checked=g.dataset.overlayMode===i;r&&(r.textContent=i==="advancement"?"Advancement":"Markers");for(const g of a.querySelectorAll("input[data-breakdown-class]")){const m=g.dataset.breakdownClass;g.checked=m?l.has(m):!1}if(o){const g=d();o.textContent=g.length>0?g.map(m=>({kind:"Kind",height_band:"Height",surface:"Surface",dodge_state:"Dodge"})[m]).join(" + "):"Total only"}}function d(){return c.filter(f=>l.has(f))}}function EF(){return vn({id:"whiff",label:"Whiff",select:t=>t.whiff,render:t=>nF(t),getTimelineEvents(t){return zD(t.statsTimeline,t.replay)}})}function MF(t){let e=null,n=null;const i=new Set,a=["speed_band","height_band"];return{id:"movement",label:"Movement",setup(){s()},teardown(){},onBeforeRender(){},getConfig(){return{breakdownClasses:r()}},applyConfig(o){if(i.clear(),o&&typeof o=="object"&&!Array.isArray(o)){const l=o.breakdownClasses;if(Array.isArray(l))for(const c of l)a.includes(c)&&i.add(c)}s(),t.rerenderCurrentState()},renderStats(o,l){const c=wt(l.statsFrameLookup,o);return c?Zt(c.players,u=>Ht(u.name,u.is_team_0,cg(u.movement,{breakdownClasses:r()}))):""},renderFocusedPlayerStats(o,l,c){const u=Bt(c,l,o);return u?cg(u.movement,{breakdownClasses:r()}):""},renderSettings(){if(!e){e=document.createElement("div"),e.className="module-settings-card";const o=document.createElement("div");o.className="module-settings-header";const l=document.createElement("div"),c=document.createElement("p");c.className="module-settings-eyebrow",c.textContent="Stat display";const u=document.createElement("h3");u.textContent="Movement breakdown",l.append(c,u),n=document.createElement("strong"),n.className="metric-readout",o.append(l,n);const d=document.createElement("div");d.className="module-settings-options";for(const f of[{className:"speed_band",label:"Speed band"},{className:"height_band",label:"Height band"}]){const p=document.createElement("label");p.className="toggle";const _=document.createElement("input");_.type="checkbox",_.dataset.breakdownClass=f.className,_.addEventListener("change",()=>{_.checked?i.add(f.className):i.delete(f.className),s(),t.rerenderCurrentState(),t.requestConfigSync?.()});const g=document.createElement("span");g.textContent=f.label,p.append(_,g),d.append(p)}e.append(o,d)}return s(),e}};function s(){if(e){for(const o of e.querySelectorAll("input[data-breakdown-class]")){const l=o.dataset.breakdownClass;o.checked=l?i.has(l):!1}if(n){const o=r();n.textContent=o.length>0?o.map(l=>({speed_band:"Speed band",height_band:"Height band"})[l]).join(" + "):"Total only"}}}function r(){return a.filter(o=>i.has(o))}}function TF(){return vn({id:"powerslide",label:"Powerslide",select:t=>t.powerslide,render:t=>tF(t),getTimelineEvents(t){return DD(t.statsTimeline,t.replay)}})}function AF(){return vn({id:"rotation",label:"Rotation",select:t=>t.rotation,render:t=>qk(t)})}function CF(){return vn({id:"demo",label:"Demo",select:t=>t.demo,render:t=>iF(t)})}function RF(){return vn({id:"bump",label:"Bump",select:t=>t.bump,render:t=>aF(t),getTimelineEvents(t){return FD(t.statsTimeline,t.replay)}})}function PF(){let t=null,e=1;return{id:Vy,label:"Relative Positioning",setup(n){e=n.fieldScale,t=new MI(n.player.sceneState.scene,n.replay,e)},teardown(){t?.dispose(),t=null},onBeforeRender(n){t?.update(n,e)},renderStats(n,i){const a=wt(i.statsFrameLookup,n);return a?Zt(a.players,s=>{const r=dk(i.replay,zt(s.player_id),n),o=uk[r];return Ht(s.name,s.is_team_0,mg(s.positioning),`<span class="depth-indicator depth-${r}" title="Team Depth: ${o}" aria-label="Team Depth: ${o}">${o}</span>`)}):""},renderFocusedPlayerStats(n,i,a){const s=Bt(a,i,n);return s?mg(s.positioning):""}}}function LF(){return{id:"absolute-positioning",label:"Absolute Positioning",setup(t){pg.acquire(t)},teardown(){pg.release()},onBeforeRender(){},getTimelineRanges(t){return ck(t.statsTimeline,t.replay)},renderStats(t,e){const n=wt(e.statsFrameLookup,t);return n?Zt(n.players,i=>Ht(i.name,i.is_team_0,_g(i.positioning))):""},renderFocusedPlayerStats(t,e,n){const i=Bt(n,e,t);return i?_g(i.positioning):""}}}function NF(t,e={}){return[oF(),lF(),cF(),uF(),dF(),mF(),gF(),_F(),fk(t),pk(),hk(),mk(),PF(),LF(),AF(),bF(),xF(),SF(),wF(t),EF(),yF(),vF(),hF(),pF(),rF(t,e.boostPickupFilters),fF(),MF(t),TF(),CF(),RF()]}function IF(t){const e={};for(const n of t)if(n.getConfig){if(Object.hasOwn(e,n.id))throw new Error(`Duplicate stats player config adapter id: ${n.id}`);e[n.id]=n.getConfig()}return e}function DF(t,e){for(const n of t)if(n.applyConfig){if(Object.hasOwn(e,n.id)){n.applyConfig(e[n.id]);continue}for(const i of n.aliases??[])if(Object.hasOwn(e,i)){n.applyConfig(e[i]);break}}}const kF=new Set(["player_id","name","is_team_0"]),FF=["is_last_","time_since_last_","frames_since_last_"];function OF(t){return t===null||typeof t=="number"||typeof t=="string"||typeof t=="boolean"||Array.isArray(t)}function UF(t,e){let n=t;for(const i of e){if(!n||typeof n!="object"||Array.isArray(n))return;n=n[i]}return n}function BF(t){return t==null?"--":typeof t=="number"?Number.isFinite(t)?Number.isInteger(t)?`${t}`:`${Number(t.toFixed(3))}`:"--":typeof t=="boolean"?t?"true":"false":Array.isArray(t)?t.length===0?"[]":JSON.stringify(t):`${t}`}function zF(t,e){if(FF.some(s=>t.startsWith(s)))return!0;const n=t.match(/^last_(.+)_time$/),i=t.match(/^last_(.+)_frame$/),a=n?.[1]??i?.[1];return a?`is_last_${a}`in e||`time_since_last_${a}`in e||`frames_since_last_${a}`in e:!1}function Nf(t,e,n,i){if(!t||typeof t!="object"||Array.isArray(t))return;const a=t;for(const[s,r]of Object.entries(a)){if(e==="player"&&n.length===0&&kF.has(s)||zF(s,a))continue;const o=[...n,s];if(OF(r)){const l=`${e}:${o.join(".")}`;i.push({id:l,label:o.join("."),category:o[0]??e,scope:e,path:o,read(c){return UF(c,o)},format:BF});continue}Nf(r,e,o,i)}}function HF(t){const e=new Set;return t.filter(n=>e.has(n.id)?!1:(e.add(n.id),!0))}function Yy(t,e){const n=[];return t&&Nf(t,"player",[],n),e&&Nf(e,"team",[],n),HF(n).sort((i,a)=>i.label.localeCompare(a.label))}function VF(){return Yy(Bp(),Fs())}function Kr(t){return t?Yy(t.players[0]??Bp(),t.team_zero??t.team_one??Fs()):VF()}function Ky(t){return t.toLowerCase().replace(/[_/.-]+/g," ").replace(/\s+/g," ").trim()}function GF(t){return Ky(t).split(" ").filter(Boolean)}function $F(t,e){const n=GF(e);if(n.length===0)return 0;const i=Ky([t.scope,t.category,t.label,t.id,...t.path].join(" "));let a=0;for(const s of n){const r=i.indexOf(s);if(r<0)return null;a+=r}return a+i.length/1e3}function WF(t,e){return t.map((n,i)=>({definition:n,index:i,score:$F(n,e)})).filter(n=>n.score!==null).sort((n,i)=>n.score-i.score||n.index-i.index).map(n=>n.definition)}var Ut=Uint8Array,hn=Uint16Array,Xp=Int32Array,Nc=new Ut([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),Ic=new Ut([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),If=new Ut([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),jy=function(t,e){for(var n=new hn(31),i=0;i<31;++i)n[i]=e+=1<<t[i-1];for(var a=new Xp(n[30]),i=1;i<30;++i)for(var s=n[i];s<n[i+1];++s)a[s]=s-n[i]<<5|i;return{b:n,r:a}},Zy=jy(Nc,2),Jy=Zy.b,Df=Zy.r;Jy[28]=258,Df[258]=28;var Qy=jy(Ic,0),XF=Qy.b,Ag=Qy.r,kf=new hn(32768);for(var mt=0;mt<32768;++mt){var Ii=(mt&43690)>>1|(mt&21845)<<1;Ii=(Ii&52428)>>2|(Ii&13107)<<2,Ii=(Ii&61680)>>4|(Ii&3855)<<4,kf[mt]=((Ii&65280)>>8|(Ii&255)<<8)>>1}var ni=(function(t,e,n){for(var i=t.length,a=0,s=new hn(e);a<i;++a)t[a]&&++s[t[a]-1];var r=new hn(e);for(a=1;a<e;++a)r[a]=r[a-1]+s[a-1]<<1;var o;if(n){o=new hn(1<<e);var l=15-e;for(a=0;a<i;++a)if(t[a])for(var c=a<<4|t[a],u=e-t[a],d=r[t[a]-1]++<<u,f=d|(1<<u)-1;d<=f;++d)o[kf[d]>>l]=c}else for(o=new hn(i),a=0;a<i;++a)t[a]&&(o[a]=kf[r[t[a]-1]++]>>15-t[a]);return o}),ji=new Ut(288);for(var mt=0;mt<144;++mt)ji[mt]=8;for(var mt=144;mt<256;++mt)ji[mt]=9;for(var mt=256;mt<280;++mt)ji[mt]=7;for(var mt=280;mt<288;++mt)ji[mt]=8;var jr=new Ut(32);for(var mt=0;mt<32;++mt)jr[mt]=5;var qF=ni(ji,9,0),YF=ni(ji,9,1),KF=ni(jr,5,0),jF=ni(jr,5,1),rd=function(t){for(var e=t[0],n=1;n<t.length;++n)t[n]>e&&(e=t[n]);return e},Nn=function(t,e,n){var i=e/8|0;return(t[i]|t[i+1]<<8)>>(e&7)&n},od=function(t,e){var n=e/8|0;return(t[n]|t[n+1]<<8|t[n+2]<<16)>>(e&7)},qp=function(t){return(t+7)/8|0},Dc=function(t,e,n){return(e==null||e<0)&&(e=0),(n==null||n>t.length)&&(n=t.length),new Ut(t.subarray(e,n))},ZF=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],Yn=function(t,e,n){var i=new Error(e||ZF[t]);if(i.code=t,Error.captureStackTrace&&Error.captureStackTrace(i,Yn),!n)throw i;return i},JF=function(t,e,n,i){var a=t.length,s=0;if(!a||e.f&&!e.l)return n||new Ut(0);var r=!n,o=r||e.i!=2,l=e.i;r&&(n=new Ut(a*3));var c=function(Fe){var rt=n.length;if(Fe>rt){var N=new Ut(Math.max(rt*2,Fe));N.set(n),n=N}},u=e.f||0,d=e.p||0,f=e.b||0,p=e.l,_=e.d,g=e.m,m=e.n,h=a*8;do{if(!p){u=Nn(t,d,1);var b=Nn(t,d+1,3);if(d+=3,b)if(b==1)p=YF,_=jF,g=9,m=5;else if(b==2){var M=Nn(t,d,31)+257,T=Nn(t,d+10,15)+4,A=M+Nn(t,d+5,31)+1;d+=14;for(var v=new Ut(A),x=new Ut(19),R=0;R<T;++R)x[If[R]]=Nn(t,d+R*3,7);d+=T*3;for(var I=rd(x),U=(1<<I)-1,z=ni(x,I,1),R=0;R<A;){var G=z[Nn(t,d,U)];d+=G&15;var S=G>>4;if(S<16)v[R++]=S;else{var B=0,X=0;for(S==16?(X=3+Nn(t,d,3),d+=2,B=v[R-1]):S==17?(X=3+Nn(t,d,7),d+=3):S==18&&(X=11+Nn(t,d,127),d+=7);X--;)v[R++]=B}}var V=v.subarray(0,M),ee=v.subarray(M);g=rd(V),m=rd(ee),p=ni(V,g,1),_=ni(ee,m,1)}else Yn(1);else{var S=qp(d)+4,y=t[S-4]|t[S-3]<<8,C=S+y;if(C>a){l&&Yn(0);break}o&&c(f+y),n.set(t.subarray(S,C),f),e.b=f+=y,e.p=d=C*8,e.f=u;continue}if(d>h){l&&Yn(0);break}}o&&c(f+131072);for(var pe=(1<<g)-1,q=(1<<m)-1,de=d;;de=d){var B=p[od(t,d)&pe],we=B>>4;if(d+=B&15,d>h){l&&Yn(0);break}if(B||Yn(2),we<256)n[f++]=we;else if(we==256){de=d,p=null;break}else{var be=we-254;if(we>264){var R=we-257,me=Nc[R];be=Nn(t,d,(1<<me)-1)+Jy[R],d+=me}var O=_[od(t,d)&q],Y=O>>4;O||Yn(3),d+=O&15;var ee=XF[Y];if(Y>3){var me=Ic[Y];ee+=od(t,d)&(1<<me)-1,d+=me}if(d>h){l&&Yn(0);break}o&&c(f+131072);var ie=f+be;if(f<ee){var Se=s-ee,ye=Math.min(ee,ie);for(Se+f<0&&Yn(3);f<ye;++f)n[f]=i[Se+f]}for(;f<ie;++f)n[f]=n[f-ee]}}e.l=p,e.p=de,e.b=f,e.f=u,p&&(u=1,e.m=g,e.d=_,e.n=m)}while(!u);return f!=n.length&&r?Dc(n,0,f):n.subarray(0,f)},_i=function(t,e,n){n<<=e&7;var i=e/8|0;t[i]|=n,t[i+1]|=n>>8},lr=function(t,e,n){n<<=e&7;var i=e/8|0;t[i]|=n,t[i+1]|=n>>8,t[i+2]|=n>>16},ld=function(t,e){for(var n=[],i=0;i<t.length;++i)t[i]&&n.push({s:i,f:t[i]});var a=n.length,s=n.slice();if(!a)return{t:tb,l:0};if(a==1){var r=new Ut(n[0].s+1);return r[n[0].s]=1,{t:r,l:1}}n.sort(function(C,M){return C.f-M.f}),n.push({s:-1,f:25001});var o=n[0],l=n[1],c=0,u=1,d=2;for(n[0]={s:-1,f:o.f+l.f,l:o,r:l};u!=a-1;)o=n[n[c].f<n[d].f?c++:d++],l=n[c!=u&&n[c].f<n[d].f?c++:d++],n[u++]={s:-1,f:o.f+l.f,l:o,r:l};for(var f=s[0].s,i=1;i<a;++i)s[i].s>f&&(f=s[i].s);var p=new hn(f+1),_=Ff(n[u-1],p,0);if(_>e){var i=0,g=0,m=_-e,h=1<<m;for(s.sort(function(M,T){return p[T.s]-p[M.s]||M.f-T.f});i<a;++i){var b=s[i].s;if(p[b]>e)g+=h-(1<<_-p[b]),p[b]=e;else break}for(g>>=m;g>0;){var S=s[i].s;p[S]<e?g-=1<<e-p[S]++-1:++i}for(;i>=0&&g;--i){var y=s[i].s;p[y]==e&&(--p[y],++g)}_=e}return{t:new Ut(p),l:_}},Ff=function(t,e,n){return t.s==-1?Math.max(Ff(t.l,e,n+1),Ff(t.r,e,n+1)):e[t.s]=n},Cg=function(t){for(var e=t.length;e&&!t[--e];);for(var n=new hn(++e),i=0,a=t[0],s=1,r=function(l){n[i++]=l},o=1;o<=e;++o)if(t[o]==a&&o!=e)++s;else{if(!a&&s>2){for(;s>138;s-=138)r(32754);s>2&&(r(s>10?s-11<<5|28690:s-3<<5|12305),s=0)}else if(s>3){for(r(a),--s;s>6;s-=6)r(8304);s>2&&(r(s-3<<5|8208),s=0)}for(;s--;)r(a);s=1,a=t[o]}return{c:n.subarray(0,i),n:e}},cr=function(t,e){for(var n=0,i=0;i<e.length;++i)n+=t[i]*e[i];return n},eb=function(t,e,n){var i=n.length,a=qp(e+2);t[a]=i&255,t[a+1]=i>>8,t[a+2]=t[a]^255,t[a+3]=t[a+1]^255;for(var s=0;s<i;++s)t[a+s+4]=n[s];return(a+4+i)*8},Rg=function(t,e,n,i,a,s,r,o,l,c,u){_i(e,u++,n),++a[256];for(var d=ld(a,15),f=d.t,p=d.l,_=ld(s,15),g=_.t,m=_.l,h=Cg(f),b=h.c,S=h.n,y=Cg(g),C=y.c,M=y.n,T=new hn(19),A=0;A<b.length;++A)++T[b[A]&31];for(var A=0;A<C.length;++A)++T[C[A]&31];for(var v=ld(T,7),x=v.t,R=v.l,I=19;I>4&&!x[If[I-1]];--I);var U=c+5<<3,z=cr(a,ji)+cr(s,jr)+r,G=cr(a,f)+cr(s,g)+r+14+3*I+cr(T,x)+2*T[16]+3*T[17]+7*T[18];if(l>=0&&U<=z&&U<=G)return eb(e,u,t.subarray(l,l+c));var B,X,V,ee;if(_i(e,u,1+(G<z)),u+=2,G<z){B=ni(f,p,0),X=f,V=ni(g,m,0),ee=g;var pe=ni(x,R,0);_i(e,u,S-257),_i(e,u+5,M-1),_i(e,u+10,I-4),u+=14;for(var A=0;A<I;++A)_i(e,u+3*A,x[If[A]]);u+=3*I;for(var q=[b,C],de=0;de<2;++de)for(var we=q[de],A=0;A<we.length;++A){var be=we[A]&31;_i(e,u,pe[be]),u+=x[be],be>15&&(_i(e,u,we[A]>>5&127),u+=we[A]>>12)}}else B=qF,X=ji,V=KF,ee=jr;for(var A=0;A<o;++A){var me=i[A];if(me>255){var be=me>>18&31;lr(e,u,B[be+257]),u+=X[be+257],be>7&&(_i(e,u,me>>23&31),u+=Nc[be]);var O=me&31;lr(e,u,V[O]),u+=ee[O],O>3&&(lr(e,u,me>>5&8191),u+=Ic[O])}else lr(e,u,B[me]),u+=X[me]}return lr(e,u,B[256]),u+X[256]},QF=new Xp([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),tb=new Ut(0),eO=function(t,e,n,i,a,s){var r=s.z||t.length,o=new Ut(i+r+5*(1+Math.ceil(r/7e3))+a),l=o.subarray(i,o.length-a),c=s.l,u=(s.r||0)&7;if(e){u&&(l[0]=s.r>>3);for(var d=QF[e-1],f=d>>13,p=d&8191,_=(1<<n)-1,g=s.p||new hn(32768),m=s.h||new hn(_+1),h=Math.ceil(n/3),b=2*h,S=function(ot){return(t[ot]^t[ot+1]<<h^t[ot+2]<<b)&_},y=new Xp(25e3),C=new hn(288),M=new hn(32),T=0,A=0,v=s.i||0,x=0,R=s.w||0,I=0;v+2<r;++v){var U=S(v),z=v&32767,G=m[U];if(g[z]=G,m[U]=z,R<=v){var B=r-v;if((T>7e3||x>24576)&&(B>423||!c)){u=Rg(t,l,0,y,C,M,A,x,I,v-I,u),x=T=A=0,I=v;for(var X=0;X<286;++X)C[X]=0;for(var X=0;X<30;++X)M[X]=0}var V=2,ee=0,pe=p,q=z-G&32767;if(B>2&&U==S(v-q))for(var de=Math.min(f,B)-1,we=Math.min(32767,v),be=Math.min(258,B);q<=we&&--pe&&z!=G;){if(t[v+V]==t[v+V-q]){for(var me=0;me<be&&t[v+me]==t[v+me-q];++me);if(me>V){if(V=me,ee=q,me>de)break;for(var O=Math.min(q,me-2),Y=0,X=0;X<O;++X){var ie=v-q+X&32767,Se=g[ie],ye=ie-Se&32767;ye>Y&&(Y=ye,G=ie)}}}z=G,G=g[z],q+=z-G&32767}if(ee){y[x++]=268435456|Df[V]<<18|Ag[ee];var Fe=Df[V]&31,rt=Ag[ee]&31;A+=Nc[Fe]+Ic[rt],++C[257+Fe],++M[rt],R=v+V,++T}else y[x++]=t[v],++C[t[v]]}}for(v=Math.max(v,R);v<r;++v)y[x++]=t[v],++C[t[v]];u=Rg(t,l,c,y,C,M,A,x,I,v-I,u),c||(s.r=u&7|l[u/8|0]<<3,u-=7,s.h=m,s.p=g,s.i=v,s.w=R)}else{for(var v=s.w||0;v<r+c;v+=65535){var N=v+65535;N>=r&&(l[u/8|0]=c,N=r),u=eb(l,u+1,t.subarray(v,N))}s.i=r}return Dc(o,0,i+qp(u)+a)},tO=function(t,e,n,i,a){if(!a&&(a={l:1},e.dictionary)){var s=e.dictionary.subarray(-32768),r=new Ut(s.length+t.length);r.set(s),r.set(t,s.length),t=r,a.w=s.length}return eO(t,e.level==null?6:e.level,e.mem==null?a.l?Math.ceil(Math.max(8,Math.min(13,Math.log(t.length)))*1.5):20:12+e.mem,n,i,a)};function nO(t,e){return tO(t,e||{},0,0)}function nb(t,e){return JF(t,{i:2},e,e)}var Pg=typeof TextEncoder<"u"&&new TextEncoder,Of=typeof TextDecoder<"u"&&new TextDecoder,iO=0;try{Of.decode(tb,{stream:!0}),iO=1}catch{}var aO=function(t){for(var e="",n=0;;){var i=t[n++],a=(i>127)+(i>223)+(i>239);if(n+a>t.length)return{s:e,r:Dc(t,n-1)};a?a==3?(i=((i&15)<<18|(t[n++]&63)<<12|(t[n++]&63)<<6|t[n++]&63)-65536,e+=String.fromCharCode(55296|i>>10,56320|i&1023)):a&1?e+=String.fromCharCode((i&31)<<6|t[n++]&63):e+=String.fromCharCode((i&15)<<12|(t[n++]&63)<<6|t[n++]&63):e+=String.fromCharCode(i)}};function sO(t,e){var n;if(Pg)return Pg.encode(t);for(var i=t.length,a=new Ut(t.length+(t.length>>1)),s=0,r=function(c){a[s++]=c},n=0;n<i;++n){if(s+5>a.length){var o=new Ut(s+8+(i-n<<1));o.set(a),a=o}var l=t.charCodeAt(n);l<128||e?r(l):l<2048?(r(192|l>>6),r(128|l&63)):l>55295&&l<57344?(l=65536+(l&1047552)|t.charCodeAt(++n)&1023,r(240|l>>18),r(128|l>>12&63),r(128|l>>6&63),r(128|l&63)):(r(224|l>>12),r(128|l>>6&63),r(128|l&63))}return Dc(a,0,s)}function ib(t,e){var n;if(Of)return Of.decode(t);var i=aO(t),a=i.s,n=i.r;return n.length&&Yn(8),a}const rO=["replayUrl","replay_url","replay"],oO=["r","replayUrlZ","replay_url_z"],lO=["ballchasing","ballchasingId","ballchasingUuid","ballchasingReplay"];function cO(t){const e=t.replaceAll("-","+").replaceAll("_","/"),n=e.padEnd(Math.ceil(e.length/4)*4,"="),i=atob(n),a=new Uint8Array(i.length);for(let s=0;s<i.length;s+=1)a[s]=i.charCodeAt(s);return a}function uO(t){try{return ib(nb(cO(t)))}catch(e){throw new Error(`Invalid compressed replay URL: ${e instanceof Error?e.message:String(e)}`)}}function dO(t,e){const n=new URLSearchParams(t);for(const i of rO){const a=n.get(i)?.trim();if(!a)continue;const s=new URL(a,e);if(s.protocol!=="http:"&&s.protocol!=="https:")throw new Error(`Unsupported replay URL protocol: ${s.protocol}`);return s}for(const i of oO){const a=n.get(i)?.trim();if(!a)continue;const s=new URL(uO(a),e);if(s.protocol!=="http:"&&s.protocol!=="https:")throw new Error(`Unsupported replay URL protocol: ${s.protocol}`);return s}return null}function fO(t,e){for(const n of e){const i=t.get(n)?.trim();if(i)return i}return null}function ab(t,e){const n=new URLSearchParams(t),i=fO(n,lO);if(i){const s=Ip(i);return{kind:"ballchasing",url:tR(s),name:eR(s),fetchInit:{method:"POST"}}}const a=dO(t,e);return a?{kind:"url",url:a,name:pO(a)}:null}function pO(t){const n=t.pathname.replace(/\/+$/,"").split("/").pop();if(!n)return t.hostname||"remote replay";try{return decodeURIComponent(n)}catch{return n}}const ic=1,Uf="cfg",Lg="cfgDebug";function hO(t){let e="";for(const n of t)e+=String.fromCharCode(n);return btoa(e).replaceAll("+","-").replaceAll("/","_").replace(/=+$/,"")}function mO(t){const e=t.replaceAll("-","+").replaceAll("_","/"),n=e.padEnd(Math.ceil(e.length/4)*4,"="),i=atob(n),a=new Uint8Array(i.length);for(let s=0;s<i.length;s+=1)a[s]=i.charCodeAt(s);return a}function _O(t){return hO(nO(sO(JSON.stringify(t)),{level:9}))}function gO(t){let e;try{e=JSON.parse(ib(nb(mO(t))))}catch(n){throw new Error(`Invalid stats player config: ${n instanceof Error?n.message:String(n)}`)}return xO(e)}function vO(t){const e=sb(t);return e.selectedValue?gO(e.selectedValue):null}function sb(t){const e=new URLSearchParams(Yp(t.hash)),n=new URLSearchParams(t.search),i=e.getAll(Uf),a=n.getAll(Uf),s=i[0]?"hash":a[0]?"search":null,r=s==="hash"?i[0]:s==="search"?a[0]:null;return{search:t.search,hash:t.hash,searchParams:[...n.entries()],hashParams:[...e.entries()],searchValues:a,hashValues:i,selectedSource:s,selectedValue:r}}function yO(t){const e=new URLSearchParams(t.search),n=new URLSearchParams(Yp(t.hash)),i=e.get(Lg)??n.get(Lg);return i===""||i==="1"||i==="true"}function rb(t,e){const n=new URL(t.href),i=new URLSearchParams(Yp(n.hash));return i.set(Uf,_O(e)),n.hash=i.toString(),n}function Yp(t){return t.startsWith("#")?t.slice(1):t}function bO(t,e,n=120,i=100){const a=ac(t.viewport.width)??e.width,s=ac(t.viewport.height)??e.height,r=e.width/Math.max(1,a),o=e.height/Math.max(1,s),l=Math.max(8,e.width-n),c=Math.max(8,e.height-i);return{x:Ng(t.x*r,8,l),y:Ng(t.y*o,8,c)}}function xO(t){if(!An(t)||t.version!==ic)throw new Error("Unsupported stats player config version");return{version:ic,playback:wO(t.playback),camera:EO(t.camera),overlays:TO(t.overlays),recording:SO(t.recording),singletonWindows:AO(t.singletonWindows),statsWindows:CO(t.statsWindows),moduleConfigs:An(t.moduleConfigs)?t.moduleConfigs:{}}}function SO(t){return An(t)?{fps:Xt(t.fps),playbackRate:Xt(t.playbackRate)}:{}}function wO(t){return An(t)?{currentTime:Xt(t.currentTime),playing:$i(t.playing),rate:Xt(t.rate),skipPostGoalTransitions:$i(t.skipPostGoalTransitions),skipKickoffs:$i(t.skipKickoffs)}:{}}function EO(t){if(!An(t))return{};const e={},n=t.mode==="follow"?"follow":t.mode==="free"?"free":void 0,i=t.freePreset==="overhead"?"overhead":t.freePreset==="side"?"side":t.freePreset===null?null:void 0,a=lb(t.attachedPlayerId),s=Xt(t.distanceScale),r=$i(t.ballCam),o=MO(t.customSettings);return n!==void 0&&(e.mode=n),i!==void 0&&(e.freePreset=i),a!==void 0&&(e.attachedPlayerId=a),s!==void 0&&(e.distanceScale=s),r!==void 0&&(e.ballCam=r),o!==void 0&&(e.customSettings=o),e}function MO(t){if(t===null)return null;if(!An(t))return;const e={},n=Xt(t.fov),i=Xt(t.height),a=Xt(t.pitch),s=Xt(t.distance),r=Xt(t.stiffness),o=Xt(t.swivelSpeed),l=Xt(t.transitionSpeed);return n!==void 0&&(e.fov=n),i!==void 0&&(e.height=i),a!==void 0&&(e.pitch=a),s!==void 0&&(e.distance=s),r!==void 0&&(e.stiffness=r),o!==void 0&&(e.swivelSpeed=o),l!==void 0&&(e.transitionSpeed=l),e}function TO(t){const e=An(t)?t:{};return{timelineEvents:fl(e.timelineEvents),timelineRanges:fl(e.timelineRanges),mechanics:fl(e.mechanics),renderEffects:fl(e.renderEffects),followedPlayerHud:$i(e.followedPlayerHud)??!1,boostPads:$i(e.boostPads)??!0,boostPickupAnimation:$i(e.boostPickupAnimation)??!1}}function AO(t){return Array.isArray(t)?t.map(e=>!An(e)||!PO(e.id)?null:{id:e.id,placement:ob(e.placement)}).filter(e=>e!==null):[]}function CO(t){return Array.isArray(t)?t.map(e=>!An(e)||typeof e.id!="string"||!LO(e.kind)?null:{id:e.id,kind:e.kind,placement:ob(e.placement),playerId:lb(e.playerId)??null,team:e.team==="orange"?"orange":e.team==="blue"?"blue":null,entries:RO(e.entries)}).filter(e=>e!==null):[]}function RO(t){return Array.isArray(t)?t.map(e=>!An(e)||typeof e.statId!="string"?null:{statId:e.statId,targetId:typeof e.targetId=="string"?e.targetId:void 0}).filter(e=>e!==null):[]}function ob(t){const e=An(t)?t:{},n=An(e.viewport)?e.viewport:{};return{x:Xt(e.x)??8,y:Xt(e.y)??8,viewport:{width:ac(n.width)??1,height:ac(n.height)??1},zIndex:Xt(e.zIndex),visible:$i(e.visible)??!0}}function PO(t){return t==="camera"||t==="scoreboard"||t==="playback"||t==="recording"||t==="mechanics"||t==="event-playlist"||t==="mechanics-review"||t==="replay-loading"||t==="boost-pickups"||t==="touch-controls"}function LO(t){return t==="player"||t==="team"||t==="all-players"||t==="all-teams"||t==="goals-overview"||t==="ad-hoc"}function An(t){return typeof t=="object"&&t!==null&&!Array.isArray(t)}function Xt(t){return typeof t=="number"&&Number.isFinite(t)?t:void 0}function ac(t){const e=Xt(t);return e!==void 0&&e>0?e:void 0}function $i(t){return typeof t=="boolean"?t:void 0}function lb(t){return t===null?null:typeof t=="string"?t:void 0}function fl(t){return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function Ng(t,e,n){return Math.min(n,Math.max(e,t))}const cb=2.25,ub=4,NO=100,IO=["free","follow"];let ne=null,zn=null,$t=null,Pa=null,La=null,fs=null,sc=null,Ig=0;const Bf=new Map,rc=new Map,Pr=new Map,kc=Wy({refreshTimelineRanges(){zs()},rerenderCurrentState(){ne&&ne.setBoostPickupAnimationEnabled(ne.getState().boostPickupAnimationEnabled)},requestConfigSync(){Ze()}}),uo=NF({rerenderCurrentState(){if(!ne)return;const t=ne.getState();po(t.frameIndex)},refreshTimelineRanges(){zs()},requestConfigSync(){Ze()}},{boostPickupFilters:kc});let Wi=[],ii=new Set,Ks=new Set,Ea=new Set,js=new Set;const DO=new Set(["ceiling-shot","fifty-fifty","pressure",Vy,"absolute-positioning","speed-flip","touch"]),db="touch",kO=new Set(["module:touch","module:powerslide"]),Dg=["#3b82f6","#06b6d4","#22c55e","#a855f7","#f97316","#ef4444","#f59e0b","#ec4899"],FO="#d1d9e0",OO=[{id:"core",label:"Shots, saves, assists",buildEvents(t){return t.replay.timelineEvents.filter(e=>e.kind==="shot"||e.kind==="save"||e.kind==="assist")}},{id:"demo",label:"Demos",buildEvents(t){return t.replay.timelineEvents.filter(e=>e.kind==="demo")}}],UO=[];let Xi=null,As,fb,oc,kg,lc,zf,Fg,Og,vr,yr,ps,pl,cd,Ug,Hf,pb,hb,mb,_b,gb,vb,yb,Vf,Gf,$f,Wf,Xf,qf,Yf,Kf,bb,br,xb,xr,jf,Il,Zf,cc,Ma,qi,Jf,Qf,Lr,Nr,Ir,Sb,Ui,uc,Zr,Jr,Qr,eo,to,no,io,wb,Eb,Mb,Tb,Ab,Cb,Rb,Dr,ep,Sr,Pb,Lb,Nb,Ib,tn,Db,kb,tp,Dl,kl,Fl,Ol,Ul,Bl,_n,xi=null,gn,Os,Us,np,ip,ap,sp,rp,Fb,Ob,Ub,Bb,hl=null,Ta=Kr(null),dc=30,kr=1,wi=!0,fc=null,jn=null,Di=null,Cs=!1,xa=null,Zi=null,pc=!0,Ji=null;const BO=["camera","scoreboard","playback","recording","mechanics","event-playlist","mechanics-review","replay-loading","boost-pickups","touch-controls"],Na=new Map;let Ot=null,zl=!1;function zO(){return new Set([...ii,...Ks,...js])}function zb(t){return t==="events"?ii:t==="ranges"?Ks:js}function Ti(){return!ne||!Pa||!La?null:{player:ne,replay:ne.replay,statsTimeline:Pa,statsFrameLookup:La,fieldScale:ne.options.fieldScale??1}}function Bs(){Kp();const t=Ti();if(!t)return;const e=zO();Wi=uo.filter(n=>e.has(n.id)),kc.setup(t);for(const n of Wi)n.setup(t);sc=t.player.onBeforeRender(n=>{for(const i of Wi)js.has(i.id)&&i.onBeforeRender(n)}),hc(),zs()}function Hb(){for(const t of ky(Pa)){const e=MD(t);ii.delete(e)&&Ea.add(t)}}function Kp(){sc?.(),sc=null,Fc(),Oc();for(const t of Wi)t.teardown();Wi=[]}function Hl(t,e,n){const i=zb(e);if(n?i.add(t):i.delete(t),Bs(),ea(),Ei(),ne){const a=ne.getState();po(a.frameIndex)}Qi(),Ze()}function Fc(){for(const t of Bf.values())t();Bf.clear()}function Oc(){for(const t of rc.values())t();rc.clear()}function Vb(){for(const t of Pr.values())t();Pr.clear()}function jp(){Pr.get("boost-pad-overlay")?.(),Pr.delete("boost-pad-overlay"),!(!ne||!wi)&&Pr.set("boost-pad-overlay",ne.addPlugin(mR()))}function HO(){wi=!wi,jp(),ea(),Ze()}function hc(){Fc();const t=Ti();if(!(!zn||!t)){for(const e of fo(t)){if(!e.active)continue;const n=e.buildTimelineEvents();n.length!==0&&Bf.set(e.timelineKey,zn.addEventSource(qb(n),{id:e.timelineId,label:e.label}))}zn.refreshEvents()}}function zs(){Oc();const t=Ti();if(!(!zn||!t)){for(const e of Wi)!Ks.has(e.id)||!e.getTimelineRanges||rc.set(e.id,zn.addRangeSource(()=>e.getTimelineRanges?.(t)??[]));for(const e of fo(t)){if(!e.active||!e.buildTimelineRanges)continue;const n=e.buildTimelineRanges();n.length!==0&&rc.set(e.timelineKey,zn.addRangeSource(n))}zn.refreshRanges()}}function Qi(){const t=Ti();if(!t){tp.textContent="--";return}tp.textContent=`${VO(t)}`}function VO(t){return t.replay.timelineEvents.filter(n=>n.kind==="goal").length+fo(t).filter(n=>n.active).reduce((n,i)=>n+i.count,0)}function te(t,e){const n=t.querySelector(e);if(!(n instanceof HTMLElement))throw new Error(`Missing element for selector: ${e}`);return n}function GO(t){return t.closest("[data-window-id]")?.dataset.windowId??null}function Gb(){return{width:Math.max(1,window.innerWidth),height:Math.max(1,window.innerHeight)}}function Bg(t,e){const n=t.style.getPropertyValue(e).trim(),i=getComputedStyle(t).getPropertyValue(e).trim(),a=n||i,s=Number.parseFloat(a);if(Number.isFinite(s))return s;const r=t.getBoundingClientRect();return e==="--window-y"?r.top:r.left}function $b(t){const e=Number.parseInt(t.style.zIndex,10);return{x:Bg(t,"--window-x"),y:Bg(t,"--window-y"),viewport:Gb(),zIndex:Number.isFinite(e)?e:void 0,visible:!t.hidden}}function Wb(t,e){const n=bO(e,Gb());t.style.setProperty("--window-x",`${n.x}px`),t.style.setProperty("--window-y",`${n.y}px`),t.hidden=!e.visible,e.zIndex!==void 0&&(t.style.zIndex=`${e.zIndex}`,dc=Math.max(dc,e.zIndex+1))}function $O(){const t=[],e=Xi??document;for(const n of BO){const i=e.querySelector(`[data-window-id="${n}"]`);i&&t.push({id:n,placement:$b(i)})}return t}function Xb(){return uo.filter(t=>t.getConfig||t.applyConfig).map(t=>{const e={id:t.id};return t.id==="boost"&&(e.aliases=["boost-pickup-animation"]),t.getConfig&&(e.getConfig=()=>t.getConfig?.()),t.applyConfig&&(e.applyConfig=n=>t.applyConfig?.(n)),e})}function WO(){return IF(Xb())}function XO(t){DF(Xb(),t)}function qO(t){return{id:t.id,kind:t.kind,placement:$b(t.element),playerId:t.playerId,team:t.team,entries:t.entries.map(e=>({statId:e.statId,targetId:e.targetId}))}}function YO(){const t=ne?.getState();return{currentTime:t?.currentTime,playing:t?.playing,rate:t?.speed??Number(Ma?.value??1),skipPostGoalTransitions:ne?t?.skipPostGoalTransitionsEnabled:_n.checked,skipKickoffs:ne?t?.skipKickoffsEnabled:gn.checked}}function KO(){const t=ne?.getState();return{mode:t?.cameraViewMode,freePreset:jn,attachedPlayerId:t?.attachedPlayerId,distanceScale:t?.cameraDistanceScale,ballCam:t?.ballCamEnabled,customSettings:t?.customCameraSettings}}function jO(){return{fps:Number(Os?.value),playbackRate:Number(Us?.value)}}function ZO(){return{version:ic,playback:YO(),camera:KO(),overlays:{timelineEvents:[...ii],timelineRanges:[...Ks],mechanics:[...Ea],renderEffects:[...js],followedPlayerHud:!1,boostPads:wi,boostPickupAnimation:ne?.getState().boostPickupAnimationEnabled??!1},recording:jO(),singletonWindows:$O(),statsWindows:[...Na.values()].map(qO),moduleConfigs:WO()}}function Ze(){Cs||(xa!==null&&window.clearTimeout(xa),xa=window.setTimeout(()=>{xa=null;const t=rb(new URL(window.location.href),ZO());window.history.replaceState(window.history.state,"",t)},150))}function JO(t,e,n){console.groupCollapsed("[subtr-actor] stats player cfg load"),console.log("location.href",window.location.href),console.log("location.search",t.search||"(empty)"),console.log("location.hash",t.hash||"(empty)"),console.table([...t.searchParams.map(([i,a])=>({source:"search",name:i,value:a})),...t.hashParams.map(([i,a])=>({source:"hash",name:i,value:a}))]),console.log("cfg selected source",t.selectedSource??"(none)"),console.log("cfg selected raw text",t.selectedValue??"(none)"),console.log("cfg selected raw length",t.selectedValue?.length??0),console.log("cfg search values",t.searchValues),console.log("cfg hash values",t.hashValues),t.hashValues.length>0&&t.searchValues.length>0&&console.warn("Both hash and search contain cfg; hash cfg is used."),e&&(console.log("cfg normalized JSON",JSON.stringify(e,null,2)),console.log("cfg normalized object",e)),n&&console.error("cfg decode/apply error",n),console.groupEnd()}function QO(t){const e=Xi??document;for(const n of t.singletonWindows){const i=e.querySelector(`[data-window-id="${n.id}"]`);i&&Wb(i,n.placement)}}function eU(t){ii=new Set(t.overlays.timelineEvents),Ks=new Set(t.overlays.timelineRanges),Ea=new Set(t.overlays.mechanics),Hb(),js=new Set(t.overlays.renderEffects),wi=t.overlays.boostPads,_n.checked=t.playback.skipPostGoalTransitions??_n.checked,gn.checked=t.playback.skipKickoffs??gn.checked,t.playback.rate!==void 0&&(Ma.value=`${t.playback.rate}`),t.recording.fps!==void 0&&(Os.value=`${t.recording.fps}`),t.recording.playbackRate!==void 0&&(Us.value=`${t.recording.playbackRate}`),XO(t.moduleConfigs),QO(t),zU(t.statsWindows),ea(),Ei(),Qi()}function tU(t,e,n){return{currentTime:t.currentTime,playing:t.playing,speed:t.rate,cameraDistanceScale:e.distanceScale,customCameraSettings:e.customSettings,cameraViewMode:e.mode,attachedPlayerId:e.attachedPlayerId,ballCamEnabled:e.ballCam,boostPickupAnimationEnabled:n.overlays.boostPickupAnimation,skipPostGoalTransitionsEnabled:t.skipPostGoalTransitions,skipKickoffsEnabled:t.skipKickoffs}}function nU(t,e){if(!ne||!Number.isFinite(t))return;Ot&&(Ot.currentClip=null),e!==null&&ne.replay.players.some(i=>i.id===e)&&(ne.setAttachedPlayer(e),ne.setCameraViewMode("follow"),jn=null),_n.checked=!1,gn.checked=!1,ne.setState({currentTime:Math.max(0,t-ub),playing:!0,skipPostGoalTransitionsEnabled:!1,skipKickoffsEnabled:!1}),Ze()}function iU(t){ne&&(Ot&&(Ot.currentClip=null),_n.checked=!1,gn.checked=!1,ne.setState({currentTime:Dp(t),skipPostGoalTransitionsEnabled:!1,skipKickoffsEnabled:!1}),Ze())}function qb(t){return t.map(e=>({...e,seekTime:Dp(e)}))}function aU(t){ne&&(ne.setState(tU(t.playback,t.camera,t)),jn=t.camera.freePreset??null,t.camera.mode==="free"&&t.camera.freePreset&&ne.setFreeCameraPreset(t.camera.freePreset),jp(),Bs(),ea(),Ei(),po(ne.getState().frameIndex))}function Uc(t){t.style.zIndex=`${dc++}`}function Yb(t){const e=te(Xi??document,`[data-window-id="${t}"]`);e.hidden=!1,Uc(e),Ze()}function sU(t){const e=te(Xi??document,`[data-window-id="${t}"]`);e.hidden=!e.hidden,e.hidden||Uc(e),Ze()}function rU(t){const e=te(Xi??document,`[data-window-id="${t}"]`);e.hidden=!0,Ze()}function Fr(t){zf.hidden=!t,lc.setAttribute("aria-label",t?"Close menu":"Open menu"),lc.setAttribute("aria-expanded",t?"true":"false")}function zg(){As.click(),Fr(!1)}function oU(t){return t instanceof Element&&!!t.closest("button, input, select, textarea, option, label, a, [data-no-drag]")}function Hg(t,e){t.addEventListener("pointerdown",n=>{if(!(n.target instanceof HTMLElement)||oU(n.target))return;const i=n.target.closest("[data-window-id]");if(!i||i.hidden)return;Uc(i);const a=n.clientX,s=n.clientY,r=i.getBoundingClientRect(),o=n.pointerId;i.setPointerCapture(o),n.preventDefault();const l=u=>{const d=Math.max(8,Math.min(window.innerWidth-120,r.left+u.clientX-a)),f=Math.max(8,Math.min(window.innerHeight-100,r.top+u.clientY-s));i.style.setProperty("--window-x",`${d}px`),i.style.setProperty("--window-y",`${f}px`)},c=()=>{i.releasePointerCapture(o),i.removeEventListener("pointermove",l),i.removeEventListener("pointerup",c),i.removeEventListener("pointercancel",c),Ze()};i.addEventListener("pointermove",l),i.addEventListener("pointerup",c),i.addEventListener("pointercancel",c)},{signal:e})}function ea(){ep.replaceChildren();const t=[],e=[];for(const c of uo){const u=DO.has(c.id);!c.getTimelineEvents&&!c.getTimelineRanges&&!u||(c.getTimelineEvents&&t.push(pd(c.id,fd(c,"events"),"events")),c.getTimelineRanges&&t.push(pd(c.id,fd(c,"ranges"),"ranges")),u&&e.push(pd(c.id,fd(c,"effects"),"effects")))}const n=ne?.getState().boostPickupAnimationEnabled??!1,i=document.createElement("button");i.type="button",i.className="module-summary-item",i.dataset.active=n?"true":"false",i.setAttribute("aria-pressed",n?"true":"false"),i.addEventListener("click",()=>{const c=!(ne?.getState().boostPickupAnimationEnabled??!1);ne?.setBoostPickupAnimationEnabled(c),Bs(),ea(),Ei(),Ze()});const a=document.createElement("span");a.textContent="Boost pickup animation";const s=document.createElement("strong");s.textContent=n?"On":"Off",i.append(a,s),e.push(i);const r=document.createElement("button");r.type="button",r.className="module-summary-item",r.dataset.active=wi?"true":"false",r.setAttribute("aria-pressed",wi?"true":"false"),r.addEventListener("click",HO);const o=document.createElement("span");o.textContent="Boost pad locations";const l=document.createElement("strong");l.textContent=wi?"On":"Off",r.append(o,l),e.push(r),ep.append(Kg("Timeline visualizations",t),Kg("In-game visualizations",e))}function mc(){yr.replaceChildren();const t=Ti(),e=fo(t);if(e.length===0){const u=document.createElement("p");u.className="stat-window-empty",u.textContent="No events loaded.",yr.append(u);return}const n=document.createElement("div");n.className="mechanics-actions";const i=document.createElement("button");i.type="button",i.className="module-summary-item",i.addEventListener("click",()=>{for(const u of e)u.setActive(!0);Bs(),hc(),zs(),mc(),ea(),Ei(),Qi(),Ze()});const a=document.createElement("span");a.textContent="All events";const s=document.createElement("strong");s.textContent=`${e.length}`,i.append(a,s);const r=document.createElement("button");r.type="button",r.className="module-summary-item",r.addEventListener("click",()=>{for(const u of e)u.setActive(!1);Bs(),hc(),zs(),mc(),ea(),Ei(),Qi(),Ze()});const o=document.createElement("span");o.textContent="No events";const l=document.createElement("strong");l.textContent="Off",r.append(o,l),n.append(i,r),yr.append(n);const c=lU(e);c&&yr.append(c)}function Vg(){mc()}function fo(t){if(!t)return[];const e=[];for(const n of OO){const i=n.buildEvents(t),a=i.length;a!==0&&e.push({id:n.id,playlistId:`replay:${n.id}`,timelineKey:`events:${n.id}`,timelineId:`events:${n.id}`,group:"Replay",label:n.label,count:a,active:ii.has(n.id),buildTimelineEvents(){return i},buildPlaylistEvents(){return i},setActive(s){Hl(n.id,"events",s)}})}for(const n of uo.filter(i=>i.getTimelineEvents)){const i=n.getTimelineEvents?.(t)??[],a=i.length;a!==0&&e.push({id:n.id,playlistId:`module:${n.id}`,timelineKey:`module:${n.id}`,timelineId:`module:${n.id}`,group:"Stats",label:n.label,count:a,active:ii.has(n.id),buildTimelineEvents(){return i},buildPlaylistEvents(){return i},setActive(s){Hl(n.id,"events",s)}})}for(const n of UO){const i=n.buildEvents(t),a=i.length;a!==0&&e.push({id:n.id,playlistId:`extra:${n.id}`,timelineKey:`extra:${n.id}`,timelineId:`extra:${n.id}`,group:"Stats",label:n.label,count:a,active:ii.has(n.id),buildTimelineEvents(){return i},buildPlaylistEvents(){return i},setActive(s){Hl(n.id,"events",s)}})}for(const n of ky(t.statsTimeline)){const i=TD(t.statsTimeline,t.replay,[n]),a=AD(t.statsTimeline,t.replay,[n]),s=qD(t.statsTimeline,t.replay,[n]),r=i.length+s.length;r!==0&&e.push({id:`mechanic:${n}`,playlistId:`mechanic:${n}`,timelineKey:`mechanic:${n}`,timelineId:`mechanic:${n}`,group:"Mechanics",label:mn(n),count:r,active:Ea.has(n),buildTimelineEvents(){return i},buildPlaylistEvents(){return a},buildTimelineRanges(){return s},setActive(o){o?Ea.add(n):Ea.delete(n),Ze()}})}return e.sort((n,i)=>n.label.localeCompare(i.label))}function lU(t){if(t.length===0)return null;const e=document.createElement("div");e.className="module-list mechanics-list mechanics-event-list",e.style.setProperty("--event-source-columns",`${cU(t.length)}`);for(const n of t){const i=document.createElement("button");i.type="button",i.className="module-summary-item",i.dataset.active=n.active?"true":"false",i.setAttribute("aria-pressed",n.active?"true":"false"),i.addEventListener("click",()=>{n.setActive(!n.active),hc(),zs(),mc(),Qi()});const a=document.createElement("span");a.textContent=n.label;const s=document.createElement("strong");s.textContent=`${n.active?"On":"Off"} ${n.count}`,i.append(a,s),e.append(i)}return e}function cU(t){return window.innerWidth<640?1:window.innerWidth<900?t>=7?2:1:t>=13?3:t>=7?2:1}function uU(t){return[{id:"replay:goals",group:"Replay",label:"Goals",events:t.replay.timelineEvents.filter(n=>n.kind==="goal")}].filter(n=>n.events.length>0)}function dU(){const t=Ti();if(!t)return[];const e=fo(t).map(n=>({id:n.playlistId,group:n.group,label:n.label,events:n.buildPlaylistEvents()})).filter(n=>n.events.length>0);return[...uU(t),...e]}function Zp(t){const e=t.map(n=>n.id);return Zi===null?new Set(e.filter(n=>!kO.has(n))):new Set(e.filter(n=>Zi?.has(n)))}function fU(t){const e=t.playerId??null,n=e&&ne?ne.replay.players.findIndex(i=>i.id===e):-1;return n>=0?Dg[n%Dg.length]:t.color??FO}function pU(t){const e=Zp(t);return t.filter(n=>e.has(n.id)).flatMap(n=>n.events.map((i,a)=>({key:`${n.id}:${i.id??`${i.kind}:${i.time}:${a}`}`,sourceId:n.id,sourceLabel:n.label,event:i,color:fU(i)}))).sort((n,i)=>n.event.time!==i.event.time?n.event.time-i.event.time:(n.event.label??n.sourceLabel).localeCompare(i.event.label??i.sourceLabel))}function hU(t,e){const n=Zp(t);e(n),Zi=n,Ji=null,Hs();const i=ne?.getState();i&&ao(i)}function Hs(){if(!ps)return;ps.replaceChildren();const t=dU();if(t.length===0){const g=document.createElement("p");g.className="stat-window-empty",g.textContent=ne?"No events loaded.":"Load a replay to see events.",ps.append(g);return}const e=Zp(t),n=pU(t),i=document.createElement("div");i.className="event-playlist-toolbar";const a=document.createElement("details");a.className="event-playlist-filter",a.dataset.noDrag="true";const s=document.createElement("summary");s.textContent=`Filters ${e.size}/${t.length}`,a.append(s);const r=document.createElement("div");r.className="event-playlist-filter-panel";const o=document.createElement("div");o.className="event-playlist-filter-actions";const l=document.createElement("button");l.type="button",l.textContent="All",l.addEventListener("click",()=>{Zi=new Set(t.map(m=>m.id)),Ji=null,Hs();const g=ne?.getState();g&&ao(g)});const c=document.createElement("button");c.type="button",c.textContent="None",c.addEventListener("click",()=>{Zi=new Set,Ji=null,Hs()}),o.append(l,c),r.append(o);const u=new Map;for(const g of t){const m=u.get(g.group)??[];m.push(g),u.set(g.group,m)}for(const[g,m]of u){const h=document.createElement("section");h.className="event-playlist-filter-group";const b=document.createElement("h3");b.textContent=g,h.append(b);for(const S of m){const y=document.createElement("label");y.className="toggle event-playlist-filter-option";const C=document.createElement("input");C.type="checkbox",C.checked=e.has(S.id),C.addEventListener("change",()=>{hU(t,T=>{C.checked?T.add(S.id):T.delete(S.id)})});const M=document.createElement("span");M.textContent=`${S.label} (${S.events.length})`,y.append(C,M),h.append(y)}r.append(h)}a.append(r);const d=document.createElement("label");d.className="toggle event-playlist-follow";const f=document.createElement("input");f.type="checkbox",f.checked=pc,f.addEventListener("change",()=>{pc=f.checked;const g=ne?.getState();g&&ao(g,{forceScroll:!0})});const p=document.createElement("span");p.textContent="Auto-follow",d.append(f,p),i.append(a,d);const _=document.createElement("div");if(_.className="event-playlist-list",_.dataset.noDrag="true",n.length===0){const g=document.createElement("p");g.className="stat-window-empty",g.textContent="No event types selected.",_.append(g)}else for(const g of n){const m=document.createElement("button");m.type="button",m.className="event-playlist-item",m.dataset.eventKey=g.key,m.dataset.eventTime=`${g.event.time}`,m.style.setProperty("--event-color",g.color),m.addEventListener("click",()=>{iU(g.event)});const h=document.createElement("span");h.className="event-playlist-time",h.textContent=dx(g.event.time);const b=document.createElement("span");b.className="event-playlist-main";const S=document.createElement("strong");S.textContent=g.event.label??g.sourceLabel;const y=document.createElement("span");y.textContent=[g.event.playerName??null,g.event.frame!==void 0?`frame ${g.event.frame}`:null,g.sourceLabel].filter(C=>!!C).join(" · "),b.append(S,y),m.append(h,b),_.append(m)}ps.append(i,_)}function mU(t,e){const n=[...t.querySelectorAll(".event-playlist-item")];if(n.length===0)return null;let i=n[0]??null,a=Number.POSITIVE_INFINITY;for(const s of n){const r=Number(s.dataset.eventTime);if(!Number.isFinite(r))continue;const o=Math.abs(r-e);o<a&&(a=o,i=s)}return i}function ao(t,e={}){const n=ps?.querySelector(".event-playlist-list");if(!n)return;const i=mU(n,t.currentTime),a=i?.dataset.eventKey??null;a===Ji&&!e.forceScroll||(n.querySelectorAll(".event-playlist-item[data-active='true']").forEach(s=>{s.dataset.active="false"}),i&&(i.dataset.active="true",(pc||e.forceScroll)&&i.scrollIntoView({block:"nearest"})),Ji=a)}function En(t){return typeof t=="object"&&t!==null&&!Array.isArray(t)}function Gg(t){return En(t)&&(t.kind==="time"||t.kind==="frame")&&typeof t.value=="number"&&Number.isFinite(t.value)?{kind:t.kind,value:t.value}:null}function ml(t,e){if(t!=null){if(typeof t!="number"||!Number.isInteger(t)||!Number.isFinite(t)||t<0)throw new Error(`Review playlist page ${e} must be a non-negative integer.`);return t}}function $g(t,e){if(t!=null){if(typeof t!="string")throw new Error(`Review playlist page ${e} must be a string.`);return t}}function _U(t){if(t!=null){if(!En(t))throw new Error("Review playlist page must be an object.");return{next:$g(t.next,"next"),previous:$g(t.previous,"previous"),total:ml(t.total,"total"),count:ml(t.count,"count"),limit:ml(t.limit,"limit"),offset:ml(t.offset,"offset")}}}function gU(t){if(!En(t)||!Array.isArray(t.items))throw new Error("Review playlist must contain an items array.");const e=t.items.map((i,a)=>{if(!En(i)||typeof i.replay!="string")throw new Error(`Invalid review item at index ${a}.`);const s=Gg(i.start),r=Gg(i.end);if(!s||!r)throw new Error(`Review item ${a+1} has invalid start or end.`);return{id:typeof i.id=="string"?i.id:void 0,replay:i.replay,start:s,end:r,label:typeof i.label=="string"?i.label:void 0,meta:En(i.meta)?i.meta:void 0}}),n=Array.isArray(t.replays)?t.replays.map(i=>!En(i)||typeof i.id!="string"?null:{id:i.id,path:typeof i.path=="string"?i.path:void 0,label:typeof i.label=="string"?i.label:void 0,locator:En(i.locator)?i.locator:void 0,meta:En(i.meta)?i.meta:void 0}).filter(i=>i!==null):void 0;return{label:typeof t.label=="string"?t.label:void 0,replays:n,items:e,page:_U(t.page),playback:t.playback,meta:t.meta}}function Kb(t){let e;try{e=JSON.parse(t)}catch(n){throw new Error(`Invalid review playlist JSON: ${n instanceof Error?n.message:String(n)}`)}return gU(e)}function vU(){const t=new URLSearchParams(window.location.search);return t.get("reviewPlaylist")?.trim()||t.get("review")?.trim()||t.get("playlist")?.trim()||t.get("playlistUrl")?.trim()||null}function yU(t){return/^\/(?:home|Users|tmp|var\/tmp|mnt|media|run\/user|nix\/store)\//.test(t)}function jb(t,e){const n=t.startsWith("path:")?t.slice(5):t;if(/^https?:\/\//i.test(n)||n.startsWith("/@fs/"))return n;if(n.startsWith("/")){if(yU(n))return`/@fs${n}`;if(e){const i=new URL(e,window.location.href);if(i.origin!==window.location.origin)return new URL(n,i.origin).href}return n}return e?new URL(n,e).href:n}function Bc(t,e){const n=e.replaysById.get(t.replay);if(n?.path)return n.path;if(En(n?.locator)&&n.locator.kind==="path"&&typeof n.locator.path=="string")return n.locator.path;if(/^https?:\/\//i.test(t.replay)||t.replay.startsWith("/")||t.replay.startsWith("/@fs/")||t.replay.startsWith("path:"))return t.replay;throw new Error(`Review replay "${t.replay}" does not include a loadable path.`)}function Zb(t,e){const n=e.replaysById.get(t.replay),a=(n?.path??Bc(t,e)).replace(/^path:/,"").split("/").filter(Boolean).pop();return n?.label??a??"review replay"}function Jb(t,e,n){const i=Bc(t,e),a=jb(i,e.sourceUrl);return{name:Zb(t,e),preparingStatus:"Loading review replay...",async readBytes(){const s=await fetch(a,{signal:n});if(!s.ok){const r=s.statusText?` ${s.statusText}`:"";throw new Error(`Failed to fetch review replay from ${a} (${s.status}${r})`)}return new Uint8Array(await s.arrayBuffer())}}}function Wg(t){if(t.kind==="time")return t.value;const e=Math.max(0,Math.trunc(t.value));return ne?.replay.frames[e]?.time??ne?.replay.frames.at(-1)?.time??0}function Vl(t){return typeof t=="number"&&Number.isFinite(t)?`${t.toFixed(2)}s`:"--"}function Xg(t){return t.kind==="time"?Vl(t.value):`frame ${Math.trunc(t.value)}`}function Sa(t,e){if(!En(t.meta?.target))return null;const n=t.meta.target[e];return typeof n=="number"&&Number.isFinite(n)?n:null}function ud(t,e){if(!En(t.meta?.target))return null;const n=t.meta.target[e];return typeof n=="number"&&Number.isFinite(n)?Math.trunc(n):null}function bU(t){const e=t.start.kind==="time"?t.start.value:null,n=t.end.kind==="time"?t.end.value:null,i=[`${Xg(t.start)} to ${Xg(t.end)}`];e!==null&&n!==null&&i.push(`${Math.max(0,n-e).toFixed(1)}s clip`);const a=Sa(t,"startTime")??Sa(t,"eventTime"),s=Sa(t,"endTime")??Sa(t,"eventTime");return e!==null&&a!==null&&i.push(`${Math.max(0,a-e).toFixed(1)}s preroll`),n!==null&&s!==null&&i.push(`${Math.max(0,n-s).toFixed(1)}s postroll`),i.join(" · ")}function xU(t){const e=Sa(t,"eventTime"),n=Sa(t,"startTime"),i=Sa(t,"endTime"),a=ud(t,"eventFrame"),s=ud(t,"startFrame"),r=ud(t,"endFrame"),o=n!==null&&i!==null&&Math.abs(i-n)>.001?`${Vl(n)} to ${Vl(i)}`:Vl(e??n??i),l=s!==null&&r!==null&&r!==s?`frames ${s}-${r}`:a!==null?`frame ${a}`:s!==null?`frame ${s}`:null;return[o,l].filter(c=>c&&c!=="--").join(" · ")||"--"}function op(t,e){return t.label??t.meta?.mechanicLabel??`Review item ${e+1}`}function Qb(t){return typeof t.meta?.playerId=="string"?t.meta.playerId:En(t.meta?.target)&&typeof t.meta.target.playerId=="string"?t.meta.target.playerId:null}function SU(t){if(typeof t.meta?.playerName=="string"&&t.meta.playerName.trim())return t.meta.playerName;const e=Qb(t);return e?ne?.replay.players.find(n=>n.id===e)?.name??e:"--"}function qg(t){return typeof t.meta?.mechanicLabel=="string"&&t.meta.mechanicLabel.trim()?t.meta.mechanicLabel:typeof t.meta?.mechanic=="string"?mn(t.meta.mechanic):"--"}function lp(t){return typeof t=="string"&&t.trim()?t.replaceAll("_"," "):"unreviewed"}function ex(t){if(!t)return null;if(typeof t.meta?.reviewEndpoint=="string"&&t.meta.reviewEndpoint)return t.meta.reviewEndpoint;const e=typeof t.meta?.eventId=="string"&&t.meta.eventId?t.meta.eventId:t.id;return e?`/api/v1/mechanics/events/${encodeURIComponent(e)}/reviews`:null}function wU(){const t=new URLSearchParams(window.location.search),e=t.get("reviewToken")??t.get("token")??window.localStorage.getItem("rocket_sense_access_token");return e?{Authorization:`Bearer ${e}`}:{}}function sn(t){Hf&&(Hf.textContent=t)}function tx(t){const e=new Map;for(const n of t.manifest.items)e.has(n.replay)||e.set(n.replay,n);return e}function EU(t){const e=new Map;for(const n of t.manifest.items)e.set(n.replay,(e.get(n.replay)??0)+1);return e}function MU(t){const e=EU(t);for(const[n,i]of tx(t)){let a="",s=n;try{a=Bc(i,t),s=Zb(i,t)}catch{s=t.replaysById.get(n)?.label??n}t.replayLoadStates.set(n,{replayId:n,label:s,path:a,clipCount:e.get(n)??0,status:"idle",progress:null,error:null})}}function _l(t,e,n){const i=t.replayLoadStates.get(e)??{replayId:e,label:e,path:"",clipCount:0,status:"idle",progress:null,error:null};t.replayLoadStates.set(e,{...i,...n});const a=t.manifest.items[t.currentIndex];t.loading&&a?.replay===e&&n.progress&&(tn.textContent=Xs(n.progress),xi?.update(n.progress)),Ot===t&&nx(t)}function TU(t){if(!t)return"";const e=Xs(t);if(t.processedFrames!==void 0){const n=t.totalFrames!==void 0?` / ${t.totalFrames}`:"";return`${e} (${t.processedFrames}${n} frames)`}if(t.processedChunks!==void 0){const n=t.totalChunks!==void 0?` / ${t.totalChunks}`:"";return`${e} (${t.processedChunks}${n} chunks)`}return e}function AU(t){return t.status==="idle"?"Pending":t.status==="loading"?TU(t.progress)||"Loading":t.status==="loaded"?"Loaded":t.error?`Failed: ${t.error}`:"Failed"}function CU(t){if(t.status==="loaded")return 1;const e=t.progress?.progress;return typeof e=="number"&&Number.isFinite(e)?Math.max(0,Math.min(1,e)):0}function nx(t){if(!Yf||!Kf||!br)return;const e=t?Array.from(t.replayLoadStates.values()):[],n=e.filter(o=>o.status==="loaded").length,i=e.filter(o=>o.status==="loading").length,a=e.filter(o=>o.status==="error").length,s=e.filter(o=>o.status==="idle").length,r=e.length===0?"0 replays":`${n}/${e.length} loaded${i>0?`, ${i} loading`:""}${a>0?`, ${a} failed`:""}`;if(Yf.textContent=r,Kf.textContent=r,bb.textContent=e.length===0?"No playlist":i>0?`${i} active, ${s} pending`:a>0?`${a} failed`:t?.preloading?`Background queue, ${s} pending`:n===e.length?"Complete":`${s} pending`,br.replaceChildren(),!t||e.length===0){const o=document.createElement("p");o.className="stat-window-empty",o.textContent="No replay sources.",br.append(o);return}for(const o of e){const l=document.createElement("div");l.className=`mechanics-review-replay-load ${o.status}`;const c=document.createElement("div");c.className="mechanics-review-replay-load-main";const u=document.createElement("span");u.className="mechanics-review-replay-load-title",u.textContent=o.label;const d=document.createElement("span");d.className="mechanics-review-replay-load-meta",d.textContent=[o.replayId,`${o.clipCount} ${o.clipCount===1?"clip":"clips"}`,o.path].filter(Boolean).join(" · "),c.append(u,d);const f=document.createElement("strong");f.className="mechanics-review-replay-load-status",f.textContent=AU(o);const p=document.createElement("div");p.className="mechanics-review-replay-load-progress";const _=document.createElement("span");_.style.width=`${Math.round(CU(o)*100)}%`,p.append(_),l.append(c,f,p),br.append(l)}}function RU(t,e){t.preloading||(t.preloading=!0,(async()=>{try{for(const[n,i]of tx(t)){if(n===e)continue;const a=t.replayLoadStates.get(n);if(!(a?.status==="loaded"||a?.status==="loading"))try{await ix(i,t)}catch{}}}finally{t.preloading=!1}})())}function ix(t,e){const n=e.replayLoadCache.get(t.replay);if(n)return n;const i=Jb(t,e);_l(e,t.replay,{label:i.name,path:Bc(t,e),status:"loading",progress:null,error:null});const a=Promise.resolve().then(async()=>{const s=await i.readBytes();return Rc(s,{reportEveryNFrames:100,onProgress(r){_l(e,t.replay,{status:"loading",progress:r,error:null})}})}).then(s=>(_l(e,t.replay,{status:"loaded",progress:null,error:null}),s)).catch(s=>{throw e.replayLoadCache.delete(t.replay),_l(e,t.replay,{status:"error",error:s instanceof Error?s.message:String(s)}),s});return e.replayLoadCache.set(t.replay,a),a}function Vs(){if(!xr)return;const t=Ot,e=t?.manifest.items??[],n=t?e[t.currentIndex]??null:null,i=e.length>0;xb.textContent=`${e.length} item${e.length===1?"":"s"}`,pb.textContent=i&&t?`${t.currentIndex+1} / ${e.length}`:"0 / 0",hb.textContent=n?op(n,t?.currentIndex??0):"No candidate selected",mb.textContent=n?qg(n):"--",_b.textContent=n?SU(n):"--",gb.textContent=n?bU(n):"--",vb.textContent=n?xU(n):"--",yb.textContent=n?.meta?.reason??"--",Vf.disabled=!t||t.loading||t.currentIndex<=0,Gf.disabled=!t||t.loading||!t.currentClip,$f.disabled=!t||t.loading||t.currentIndex>=e.length-1;const a=!t||t.loading||ex(n)===null;if(Wf.disabled=a,Xf.disabled=a,qf.disabled=a,nx(t),xr.replaceChildren(),!t||e.length===0){const s=document.createElement("p");s.className="stat-window-empty",s.textContent="No review playlist loaded.",xr.append(s);return}e.forEach((s,r)=>{const o=document.createElement("button");o.type="button",o.className="mechanics-review-item",o.dataset.active=r===t.currentIndex?"true":"false",o.disabled=t.loading,o.addEventListener("click",()=>{_c(r)});const l=document.createElement("span");l.textContent=op(s,r);const c=document.createElement("strong");c.textContent=[qg(s),lp(s.meta?.reviewStatus)].join(" · "),o.append(l,c),xr.append(o)})}async function ax(t,e){const n=new Map;for(const i of t.replays??[])n.set(i.id,i);Ot={manifest:t,sourceUrl:e,replaysById:n,replayLoadStates:new Map,replayLoadCache:new Map,currentIndex:0,loading:!1,preloading:!1,currentReplayId:null,currentClip:null},MU(Ot),Yb("replay-loading"),sn(t.label?`Loaded ${t.label}.`:"Loaded review playlist."),Vs(),t.items.length>0&&await _c(0)}async function Yg(t){if(!t){sn("Enter a review playlist URL.");return}const e=jb(t,window.location.href);sn("Loading review playlist...");const n=await fetch(e);if(!n.ok){const a=n.statusText?` ${n.statusText}`:"";throw new Error(`Failed to fetch review playlist from ${e} (${n.status}${a})`)}const i=Kb(await n.text());await ax(i,n.url||e)}async function _c(t){const e=Ot,n=e?.manifest.items[t];if(!(!e||!n||e.loading)){e.loading=!0,e.currentIndex=t,Vs(),sn(`Loading ${op(n,t)}...`);try{if(!ne||e.currentReplayId!==n.replay){const r=Jb(n,e),o=ix(n,e);await th(r,o),e.currentReplayId=n.replay}RU(e,n.replay);const i=Math.max(0,Wg(n.start)),a=Math.min(ne?.getState().duration??Number.POSITIVE_INFINITY,Math.max(i,Wg(n.end)));if(!Number.isFinite(i)||!Number.isFinite(a)||a<=i)throw new Error("Review item has an empty playback range.");const s=Qb(n);s&&ne?.replay.players.some(r=>r.id===s)&&(ne.setAttachedPlayer(s),ne.setCameraViewMode("follow"),jn=null),_n.checked=!1,gn.checked=!1,e.currentClip={startTime:i,endTime:a},ne?.setState({currentTime:i,playing:!0,skipPostGoalTransitionsEnabled:!1,skipKickoffsEnabled:!1}),sn(`Playing ${i.toFixed(2)}s to ${a.toFixed(2)}s`)}catch(i){console.error("Failed to activate mechanics review item:",i),e.currentClip=null,sn(i instanceof Error?i.message:"Failed to load review item")}finally{e.loading=!1,Vs()}}}function PU(){const t=Ot?.currentClip;!t||!ne||ne.setState({currentTime:t.startTime,playing:!0,skipPostGoalTransitionsEnabled:!1,skipKickoffsEnabled:!1})}async function dd(t){const e=Ot,n=e?.manifest.items[e.currentIndex]??null,i=ex(n);if(!e||!n||!i){sn("Current review item has no review endpoint.");return}sn(`Submitting ${lp(t)}...`);const a=await fetch(i,{method:"POST",headers:{"content-type":"application/json",...wU()},credentials:"same-origin",body:JSON.stringify({status:t})});if(!a.ok){let s=`${a.status}${a.statusText?` ${a.statusText}`:""}`;try{const r=await a.json();typeof r.error=="string"&&(s=r.error)}catch{}sn(`Review failed: ${s}`);return}n.meta=n.meta??{},n.meta.reviewStatus=t,sn(`Marked ${lp(t)}.`),Vs()}function LU(t){const e=Ot?.currentClip;if(!e||!ne||zl)return!1;const n=t.currentTime<e.startTime-.1,i=t.playing&&t.currentTime>=e.endTime-.025;if(!n&&!i)return!1;zl=!0;try{ne.setState({currentTime:n?e.startTime:e.endTime,playing:!1,skipPostGoalTransitionsEnabled:!1,skipKickoffsEnabled:!1}),i&&sn(`Finished clip at ${e.endTime.toFixed(2)}s`)}finally{zl=!1}return!0}function Kg(t,e){const n=document.createElement("section");n.className="module-summary-group";const i=document.createElement("h3");i.textContent=t;const a=document.createElement("div");return a.className="module-list",a.append(...e),n.append(i,a),n}function fd(t,e){const n={"absolute-positioning:ranges":"Position zones","backboard:events":"Backboard","ball-carry:events":"Ball carry","boost:ranges":"Boost pickup timeline","bump:events":"Bump","ceiling-shot:events":"Ceiling shot","demo:events":"Demo","dodge-reset:events":"Dodge refresh","double-tap:events":"Double tap","fifty-fifty:events":"50/50","half-flip:events":"Half flip","musty-flick:events":"Musty flick","possession:ranges":"Possession","powerslide:events":"Powerslide","pressure:ranges":"Half control","rush:ranges":"Rush","speed-flip:events":"Speed flip","touch:events":"Touch","wavedash:events":"Wavedash"},i={"absolute-positioning":"Position zones","ceiling-shot":"Ceiling shot labels","fifty-fifty":"50/50 labels",pressure:"Half control","relative-positioning":"Player roles","speed-flip":"Speed flip labels",touch:"Touch labels"};return e==="effects"?i[t.id]??t.label:n[`${t.id}:${e}`]??`${t.label} timeline`}function pd(t,e,n){const i=zb(n),a=i.has(t),s=document.createElement("button");s.type="button",s.className="module-summary-item",s.dataset.active=a?"true":"false",s.setAttribute("aria-pressed",a?"true":"false"),s.addEventListener("click",()=>{Hl(t,n,!i.has(t))});const r=document.createElement("span");r.textContent=e;const o=document.createElement("strong");return o.textContent=a?"On":"Off",s.append(r,o),s}function Ei(){Sr.replaceChildren();const t=Ti(),e=Wi.filter(n=>n.id!=="boost"&&n.id!==db).map(n=>n.renderSettings?.(t)??null).filter(n=>n instanceof HTMLElement);if(e.length===0){Sr.hidden=!0,jg(),Jg();return}Sr.hidden=!1,Sr.append(...e),jg(),Jg()}function jg(){if(!jf)return;const t=Ti(),e=kc.renderSettings(t,{showHeader:!1});jf.replaceChildren(e)}function NU(t){return typeof t=="number"&&Number.isFinite(t)?`${Math.round(t)}`:"--"}function gc(t=ne?.getState().frameIndex??0){if(!vr)return;vr.replaceChildren();const e=sx(t),n=ne?.replay??null;if(!e||!n){const a=document.createElement("p");a.className="scoreboard-empty",a.textContent="Load a replay to show the scoreboard.",vr.append(a);return}const i=document.createElement("div");i.className="scoreboard-scoreline",i.append(Zg(e.team_zero?.core.goals,!0),IU(),Zg(e.team_one?.core.goals,!1)),vr.append(i)}function IU(){const t=document.createElement("span");return t.className="scoreboard-divider",t.textContent="-",t}function Zg(t,e){const n=document.createElement("strong");return n.className=`scoreboard-goal-value ${Ys(e)}`,n.textContent=NU(t),n}function Jg(){if(!Il)return;const t=Ti(),n=uo.find(i=>i.id===db)?.renderSettings?.(t)??null;Il.replaceChildren(),n instanceof HTMLElement&&Il.append(n)}function DU(t){return Ta.find(e=>e.id===t)??null}function sx(t){return La?wt(La,t):null}function Jp(t,e){return e==="blue"?t.team_zero??null:t.team_one??null}function Qp(t){return t==="blue"?"Blue":"Orange"}function rx(t){const e=ne?.replay.players.find(n=>n.id===t);return e?Ys(e.isTeamZero):null}function zc(t){return Ys(t==="blue")}function ox(t,e){const n=ne?.replay.players??[];for(const i of["blue","orange"]){const a=n.filter(r=>r.isTeamZero===(i==="blue"));if(a.length===0)continue;const s=document.createElement("optgroup");s.label=`${Qp(i)} team`;for(const r of a)s.append(new Option(r.name,r.id,r.id===e,r.id===e));t.append(s)}}function kU(t){return t.kind==="player"?rx(t.playerId):t.kind==="team"?zc(t.team??"blue"):null}function FU(t,e){return t.scope==="player"?rx(e):zc(e==="orange"?"orange":"blue")}function OU(t){switch(t){case"player":return"Player stats";case"team":return"Team stats";case"all-players":return"All players stats";case"all-teams":return"All teams stats";case"goals-overview":return"Goal labels";case"ad-hoc":return"Ad hoc stats"}}function lx(t){return t==="player"||t==="team"}function UU(t){return t!=="goals-overview"}function cx(t){switch(t){case"player":case"all-players":return"player";case"team":case"all-teams":return"team";case"goals-overview":return null;case"ad-hoc":return null}}function BU(){const t=Na.size*18;return{x:Math.max(12,Math.min(window.innerWidth-360,96+t)),y:Math.max(64,Math.min(window.innerHeight-240,96+t))}}function po(t=ne?.getState().frameIndex??0,e={}){for(const n of Na.values())e.preserveOpenPickers&&(n.pickerOpen||n.element.contains(document.activeElement))||ai(n,t)}function ux(t,e){const n=e?.id??`stats-${kr++}`,i=Number.parseInt(n.replace(/^stats-/,""),10);Number.isFinite(i)&&(kr=Math.max(kr,i+1));const{x:a,y:s}=BU(),r=document.createElement("section");r.className="stats-window",r.dataset.windowId=n,r.style.setProperty("--window-x",`${a}px`),r.style.setProperty("--window-y",`${s}px`),e&&Wb(r,e.placement);const o=document.createElement("header");o.className="stats-window-header";const l=document.createElement("div");l.className="stats-window-actions";const c=document.createElement("button");if(c.type="button",c.className="stats-window-action",c.textContent="Hide",l.append(c),lx(t))o.classList.add("stats-window-header-actions-only"),o.append(l);else{const f=document.createElement("h2");f.textContent=OU(t),o.append(f,l)}const u=document.createElement("div");u.className="stats-window-body",r.append(o,u),Zf.append(r);const d={id:n,kind:t,entries:e?.entries.map(f=>({key:`${n}:${f.statId}:${f.targetId??"scope"}`,statId:f.statId,targetId:f.targetId}))??[],playerId:e?.playerId??ne?.replay.players[0]?.id??null,team:e?.team??"blue",pickerOpen:!1,query:"",element:r,body:u};return c.addEventListener("click",()=>{r.hidden=!0,Ze()}),Na.set(n,d),e||Uc(r),Fr(!1),ai(d),Ze(),d}function zU(t){for(const e of Na.values())e.element.remove();Na.clear(),kr=1;for(const e of t)ux(e.kind,e)}function ai(t,e=ne?.getState().frameIndex??0){const n=document.activeElement,i=n instanceof HTMLInputElement&&n.dataset.statsWindowSearch===t.id,a=i?n.selectionStart:null,s=i?n.selectionEnd:null,r=i?n.selectionDirection:null;if(t.body.replaceChildren(),HU(t),UU(t.kind)&&(VU(t),GU(t)),XU(t,e),i){const o=t.body.querySelector(`input[data-stats-window-search="${t.id}"]`);o?.focus({preventScroll:!0}),o&&a!==null&&s!==null&&o.setSelectionRange(a,s,r??"none")}}function HU(t){if(t.kind!=="player"&&t.kind!=="team")return;const e=document.createElement("div");e.className="stats-window-scope-row";const n=document.createElement("select");n.className="stats-window-scope-select";const i=kU(t);i&&n.classList.add(i),n.setAttribute("aria-label",t.kind==="player"?"Player stats target":"Team stats target"),t.kind==="player"?(ox(n,t.playerId),n.value=t.playerId??"",n.addEventListener("change",()=>{t.playerId=n.value||null,ai(t),Ze()})):(n.append(new Option("Blue","blue",t.team==="blue",t.team==="blue"),new Option("Orange","orange",t.team==="orange",t.team==="orange")),n.value=t.team??"blue",n.addEventListener("change",()=>{t.team=n.value==="orange"?"orange":"blue",ai(t),Ze()})),e.append(n),t.body.append(e)}function VU(t){const e=document.createElement("button");if(e.type="button",e.className="stats-window-add-button",e.textContent="+",e.title="Add stat",e.setAttribute("aria-label","Add stat"),e.setAttribute("aria-expanded",String(t.pickerOpen)),cp(e,()=>{t.pickerOpen=!t.pickerOpen,ai(t)}),lx(t.kind)){t.body.querySelector(".stats-window-scope-row")?.append(e);return}const n=document.createElement("div");n.className="stats-window-toolbar",n.append(e),t.body.append(n)}function cp(t,e){let n=!1;t.addEventListener("pointerdown",i=>{t.disabled||(n=!0,i.preventDefault(),e())}),t.addEventListener("click",()=>{if(n){n=!1;return}t.disabled||e()})}function GU(t){const e=document.createElement("div");if(e.className="stats-window-picker",e.hidden=!t.pickerOpen,e.hidden){t.body.append(e);return}const n=cx(t.kind),i=document.createElement("input");i.type="search",i.placeholder="Search stats",i.value=t.query,i.dataset.statsWindowSearch=t.id;const a=document.createElement("div");a.className="stats-window-picker-list",i.addEventListener("input",()=>{t.query=i.value,Qg(t,a,n)}),Qg(t,a,n),e.append(i,a),t.body.append(e)}function Qg(t,e,n){e.replaceChildren();const i=n?Ta.filter(r=>r.scope===n):Ta,a=WF(i,t.query),s=new Map;for(const r of a){const o=s.get(r.category)??[];o.push(r),s.set(r.category,o)}for(const[r,o]of s){if(o.length<2)continue;const l=document.createElement("button");l.type="button",l.className="stats-window-picker-item",l.innerHTML=`<span>Add all ${r}</span><strong>${o.length}</strong>`,cp(l,()=>{for(const c of o)ev(t,c);ai(t),Ze()}),e.append(l)}for(const r of a){const o=document.createElement("button");o.type="button",o.className="stats-window-picker-item",o.innerHTML=`<span>${r.label}</span><strong>${r.scope}</strong>`,o.disabled=t.kind!=="ad-hoc"&&t.entries.some(l=>l.statId===r.id),cp(o,()=>{ev(t,r),ai(t),Ze()}),e.append(o)}if(a.length===0){const r=document.createElement("p");r.className="stat-window-empty",r.textContent=Ta.length===0?"No stats available.":"No matching stats.",e.append(r)}}function ev(t,e){const n=t.kind==="ad-hoc"?$U(e):void 0;t.entries.some(i=>i.statId===e.id&&i.targetId===n)||t.entries.push({key:`${t.id}:${e.id}:${n??"scope"}`,statId:e.id,targetId:n})}function $U(t){return t.scope==="player"?ne?.replay.players[0]?.id??"":"blue"}function WU(t,e){const n=t.entries.findIndex(i=>i.key===e);n>=0&&t.entries.splice(n,1)}function XU(t,e){if(t.kind==="goals-overview"){qU(t);return}const n=cx(t.kind),i=t.entries.map(s=>({entry:s,definition:DU(s.statId)})).filter(s=>s.definition!==null&&(!n||s.definition.scope===n));if(i.length===0){const s=document.createElement("p");s.className="stat-window-empty",s.textContent="No stats added.",t.body.append(s);return}const a=sx(e);if(!a){const s=document.createElement("p");s.className="stat-window-empty",s.textContent="Load a replay to show stats.",t.body.append(s);return}if(t.kind==="all-players"){YU(t,a,i);return}if(t.kind==="all-teams"){KU(t,a,i);return}if(t.kind==="player"){const s=t.playerId?a.players.find(r=>zt(r.player_id)===t.playerId)??null:null;nv(t,s,i);return}if(t.kind==="team"){nv(t,Jp(a,t.team??"blue"),i);return}t.kind==="ad-hoc"&&jU(t,a,i)}function qU(t){const e=Pa,n=ne?.replay??null;if(!e||!n){tv(t,"Load a replay to show goal labels.");return}const i=[...e.events.goal_context??[]].sort((l,c)=>l.time-c.time),a=new Map;for(const l of e.events.goal_tags??[]){const c=a.get(l.goal_index)??[];c.push(l),a.set(l.goal_index,c)}for(const l of a.values())l.sort((c,u)=>c.kind.localeCompare(u.kind)||u.confidence-c.confidence);const s=new Set(i.map((l,c)=>c));for(const l of a.keys())s.add(l);const r=[...s].sort((l,c)=>l-c);if(r.length===0){tv(t,"No goals loaded.");return}const o=document.createElement("div");o.className="goal-label-list";for(const l of r){const c=i[l]??null,u=a.get(l)??[],d=u[0]??null,f=c?.time??d?.time??0,p=c?.scorer??d?.scorer??null,_=p?zt(p):null,g=p?n.players.find(v=>v.id===_)?.name??_:"Unknown scorer",m=c?.scoring_team_is_team_0??d?.scoring_team_is_team_0??null,h=document.createElement("section");h.className="goal-label-item",m!==null&&h.classList.add(Ys(m));const b=document.createElement("header"),S=document.createElement("h3");S.textContent=`Goal ${l+1}`;const y=document.createElement("span");y.textContent=`${dx(f)} · ${g}`,b.append(S,y);const C=document.createElement("div");if(C.className="goal-label-tags",u.length===0){const v=document.createElement("span");v.className="goal-label-tag goal-label-tag-empty",v.textContent="Unlabeled",C.append(v)}else for(const v of u){const x=document.createElement("span");x.className="goal-label-tag",x.textContent=`${mn(v.kind)} ${Math.round(v.confidence*100)}%`,C.append(x)}const M=document.createElement("div");M.className="goal-label-actions";const T=document.createElement("button");T.type="button",T.className="goal-label-watch",T.textContent="Watch",T.addEventListener("click",()=>{nU(f,_)});const A=document.createElement("button");A.type="button",A.textContent="Cue",A.addEventListener("click",()=>{ne?.setState({currentTime:Math.max(0,f-ub),playing:!1,skipPostGoalTransitionsEnabled:!1,skipKickoffsEnabled:!1}),_n.checked=!1,gn.checked=!1,Ze()}),M.append(T,A),h.append(b,C,M),o.append(h)}t.body.append(o)}function tv(t,e){const n=document.createElement("p");n.className="stat-window-empty",n.textContent=e,t.body.append(n)}function dx(t){if(!Number.isFinite(t))return"--";const e=Math.floor(Math.max(0,t)/60),n=Math.max(0,t)-e*60;return`${e}:${n.toFixed(1).padStart(4,"0")}`}function nv(t,e,n){const i=document.createElement("div");i.className="stats-window-stat-list";for(const{entry:a,definition:s}of n)i.append(Hc(t,a,s,e?s.format(s.read(e)):"--"));t.body.append(i)}function YU(t,e,n){const i=document.createElement("div");i.className="stats-window-team-list";for(const a of["blue","orange"]){const s=e.players.filter(d=>d.is_team_0===(a==="blue"));if(s.length===0)continue;const r=document.createElement("section");r.className=`stats-window-team-group ${zc(a)}`;const o=document.createElement("header");o.className="stats-window-team-header";const l=document.createElement("h3");l.textContent=`${Qp(a)} team`;const c=document.createElement("span");c.textContent=`${s.length} player${s.length===1?"":"s"}`,o.append(l,c),r.append(o);const u=document.createElement("div");u.className="stats-window-entity-list";for(const d of s){const f=document.createElement("section");f.className=`stats-window-entity ${Ys(d.is_team_0)}`;const p=document.createElement("h4");p.className="stats-window-entity-title",p.textContent=d.name,f.append(p);for(const{entry:_,definition:g}of n)f.append(Hc(t,_,g,g.format(g.read(d))));u.append(f)}r.append(u),i.append(r)}t.body.append(i)}function KU(t,e,n){const i=document.createElement("div");i.className="stats-window-entity-list";for(const a of["blue","orange"]){const s=Jp(e,a),r=document.createElement("section");r.className=`stats-window-entity ${zc(a)}`;const o=document.createElement("h3");o.className="stats-window-entity-title",o.textContent=Qp(a),r.append(o);for(const{entry:l,definition:c}of n)r.append(Hc(t,l,c,s?c.format(c.read(s)):"--"));i.append(r)}t.body.append(i)}function jU(t,e,n){const i=document.createElement("div");i.className="stats-window-stat-list";for(const{entry:a,definition:s}of n){const r=ZU(e,s,a.targetId);i.append(Hc(t,a,s,r?s.format(s.read(r)):"--"))}t.body.append(i)}function ZU(t,e,n){return e.scope==="player"?t.players.find(i=>zt(i.player_id)===n)??t.players[0]??null:Jp(t,n==="orange"?"orange":"blue")}function Hc(t,e,n,i){const a=document.createElement("div");a.className="stats-window-stat-row";const s=document.createElement("span");if(s.className="stats-window-stat-name",s.textContent=n.label,t.kind==="ad-hoc"){const l=document.createElement("select");l.className="stats-window-stat-target";const c=FU(n,e.targetId);c&&l.classList.add(c),n.scope==="player"?ox(l,e.targetId):l.append(new Option("Blue","blue",e.targetId==="blue",e.targetId==="blue"),new Option("Orange","orange",e.targetId==="orange",e.targetId==="orange")),l.value=e.targetId??"",l.addEventListener("change",()=>{const u=l.value;if(t.entries.some(f=>f!==e&&f.statId===e.statId&&f.targetId===u)){ai(t);return}const d=t.entries.findIndex(f=>f.key===e.key);d>=0&&(t.entries[d]={key:`${t.id}:${e.statId}:${u}`,statId:e.statId,targetId:u}),ai(t),Ze()}),s.append(" ",l)}const r=document.createElement("span");r.className="stats-window-stat-value",r.textContent=i;const o=document.createElement("button");return o.type="button",o.className="stats-window-stat-remove",o.textContent="x",o.addEventListener("click",()=>{WU(t,e.key),ai(t),Ze()}),a.append(s,r,o),a}function Sn(t,e="",n=0){return t===void 0||Number.isNaN(t)?"--":`${t.toFixed(n)}${e}`}function fx(){return{fov:110,height:100,pitch:-4,distance:270,stiffness:0,swivelSpeed:1,transitionSpeed:1}}function JU(t){return!ne||t===null?null:ne.replay.players.find(e=>e.id===t)?.cameraSettings??null}function px(t){return{...fx(),...JU(t.attachedPlayerId)??{},...t.customCameraSettings??{}}}function iv(){return{fov:Number(Zr.value),height:Number(Jr.value),pitch:Number(Qr.value),distance:Number(eo.value),stiffness:Number(to.value),swivelSpeed:Number(no.value),transitionSpeed:Number(io.value)}}function QU(t){uc.hidden=!Ui.checked,Zr.disabled=!t,Jr.disabled=!t,Qr.disabled=!t,eo.disabled=!t,to.disabled=!t,no.disabled=!t,io.disabled=!t}function hx(t){const e=fx(),n=t.fov??e.fov,i=t.height??e.height,a=t.pitch??e.pitch,s=t.distance??e.distance,r=t.stiffness??e.stiffness,o=t.swivelSpeed??e.swivelSpeed,l=t.transitionSpeed??e.transitionSpeed;Zr.value=`${n}`,Jr.value=`${i}`,Qr.value=`${a}`,eo.value=`${s}`,to.value=`${r}`,no.value=`${o}`,io.value=`${l}`,wb.textContent=Sn(n,"",0),Eb.textContent=Sn(i,"",0),Mb.textContent=Sn(a,"",0),Tb.textContent=Sn(s,"",0),Ab.textContent=Sn(r,"",2),Cb.textContent=Sn(o,"",1),Rb.textContent=Sn(l,"",2)}function av(t){cc.disabled=!t,Ma.disabled=!t,qi.disabled=!t,_n.disabled=!t,gn.disabled=!t,eh(t?ne?.getState():void 0)}function e3(t){switch(t){case"free":return Jf;case"follow":return Qf}}function eh(t){const e=t?.cameraViewMode??"free",n=ne!==null&&t!==void 0,i=(t?.attachedPlayerId??null)!==null;for(const a of IO){const s=e3(a);s.disabled=!n||a==="follow"&&!i;const r=a===e;s.dataset.active=r?"true":"false",s.setAttribute("aria-pressed",r?"true":"false")}Lr.disabled=!n,Nr.disabled=!n,Lr.dataset.active="false",Nr.dataset.active="false",Lr.setAttribute("aria-pressed","false"),Nr.setAttribute("aria-pressed","false")}function up(t){eh(t);const e=ne!==null&&t?.cameraViewMode==="follow"&&(t.attachedPlayerId??null)!==null;Ir.disabled=!e,Ui.disabled=!e,QU(e&&t?.customCameraSettings!==null),Dr.disabled=!e}function t3(t){qi.replaceChildren(),qi.append(new Option("Free camera",""));for(const e of t)qi.append(new Option(`${e.name} (${e.isTeamZero?"Blue":"Orange"})`,e.id))}function n3(t){if(t<=0)return"--";const e=["B","KB","MB","GB"];let n=t,i=0;for(;n>=1024&&i<e.length-1;)n/=1024,i+=1;const a=i===0?0:n>=10?1:2;return`${n.toFixed(a)} ${e[i]}`}function i3(t){if(!t)return"No replay";if(t.error)return t.error;switch(t.state){case"idle":return"Idle";case"recording":return"Recording";case"stopping":return"Stopping";case"ready":return"Ready";case"error":return"Error"}}function sv(){const t=Number(Os.value),e=Number(Us.value);return{fps:Number.isFinite(t)?Math.max(1,Math.min(120,Math.trunc(t))):60,playbackRate:Number.isFinite(e)?Math.max(.1,e):1}}function Fn(t=$t?.getStatus()??null){const e=$t!==null&&ne!==null,n=t?.state??"idle",i=n==="recording"||n==="stopping",a=($t?.getRecording()??null)!==null;Fb.textContent=i3(t),Ob.textContent=`${(t?.elapsedSeconds??0).toFixed(1)}s`,Ub.textContent=n3(t?.sizeBytes??0),Bb.textContent=t?.mimeType||"WebM",np.disabled=!e||i,ip.disabled=!e||i,ap.disabled=!e||!i,sp.disabled=!a||i,rp.disabled=!a||i,Os.disabled=i,Us.disabled=i}function a3(){const e=(fc?.replace(/\.replay$/i,"")||"replay").replace(/[^a-zA-Z0-9._-]+/g,"-").replace(/^-+|-+$/g,""),n=new Date().toISOString().replace(/[:.]/g,"-");return`${e||"replay"}-${n}.webm`}function s3(t){const e=URL.createObjectURL(t),n=document.createElement("a");n.href=e,n.download=a3(),document.body.append(n),n.click(),n.remove(),window.setTimeout(()=>URL.revokeObjectURL(e),0)}function mx(t){const e=t?.attachedPlayerId??null;if(!ne||t?.cameraViewMode!=="follow"||e===null){Dl.textContent="Free camera",kl.textContent="--",Fl.textContent="--",Ol.textContent="--",Ul.textContent="--",Bl.textContent="--";return}const n=ne.replay.players.find(a=>a.id===e);if(!n){Dl.textContent="Unknown",kl.textContent="--",Fl.textContent="--",Ol.textContent="--",Ul.textContent="--",Bl.textContent="--";return}const i=px(t);Dl.textContent=t.customCameraSettings===null?n.name:`${n.name} custom`,kl.textContent=Sn(i.fov,"",0),Fl.textContent=Sn(i.height,"",0),Ol.textContent=Sn(i.pitch,"",0),Ul.textContent=Sn(i.distance,"",0),Bl.textContent=Sn(i.stiffness,"",2)}function rv(t){if(LU(t))return;const e=performance.now();t.playing&&e-Ig<NO||(Ig=e,Pb.textContent=`${t.currentTime.toFixed(2)}s`,Lb.textContent=`${t.frameIndex}`,Nb.textContent=`${t.duration.toFixed(2)}s`,Ib.textContent=t.playing?"Playing":"Paused",cc.textContent=t.playing?"Pause":"Play",Ma.value=`${t.speed}`,Ir.value=`${t.cameraDistanceScale}`,Sb.textContent=`${t.cameraDistanceScale.toFixed(2)}x`,Ui.checked=t.customCameraSettings!==null,uc.hidden=!Ui.checked,hx(px(t)),Dr.checked=t.ballCamEnabled,qi.value=t.attachedPlayerId??"",_n.checked=t.skipPostGoalTransitionsEnabled,gn.checked=t.skipKickoffsEnabled,oc.hidden=!0,up(t),mx(t),po(t.frameIndex,{preserveOpenPickers:!0}),gc(t.frameIndex),ao(t))}function r3(t){return kc.includePickup(t)}function o3(t){return{name:t.name,preparingStatus:"Preparing replay...",async readBytes(){return new Uint8Array(await t.arrayBuffer())}}}function l3(t,e){return{name:t.name,preparingStatus:"Fetching replay...",async readBytes(){const n=await fetch(t.url,{...t.fetchInit,signal:e});if(!n.ok){const i=n.statusText?` ${n.statusText}`:"",a=t.kind==="ballchasing"&&[401,403,404].includes(n.status)?". The replay may be private, unavailable, or not downloadable without a Ballchasing session":"";throw new Error(`Failed to fetch replay from ${t.url.href} (${n.status}${i})${a}`)}return new Uint8Array(await n.arrayBuffer())}}}async function _x(t){await th(t,Promise.resolve().then(()=>c3(t,e=>{tn.textContent=Xs(e),xi?.update(e)})))}async function c3(t,e){const n=await t.readBytes();return Rc(n,{reportEveryNFrames:100,onProgress:e})}async function th(t,e){tn.textContent=t.preparingStatus,As.disabled=!0,xi?.show(t.name,t.preparingStatus),av(!1),up(),oc.hidden=!1,fs&&(fs(),fs=null),Kp(),ne?.destroy(),ne=null,$t=null,fc=null,zn=null,Pa=null,La=null,Ta=Kr(null),Fc(),Oc(),Vb(),Zi=null,Ji=null,gc(),Qi(),Vg(),Hs(),Ei(),Fn();try{tn.textContent="Parsing replay...",xi?.show(t.name,"Parsing replay...");const n=await e,{replay:i}=n;Pa=n.statsTimeline,La=n.statsFrameLookup,Ta=Kr(null),Hb(),zn=nP({replayEventsLabel:"Replay",replayEvents:r=>qb(RD(r.replay,ii))});const a=OR({onStatusChange:Fn});$t=a;const s=Di;if(ne=new jC(fb,i,{initialPlaybackRate:s?.playback.rate,initialCameraDistanceScale:s?.camera.distanceScale??cb,initialCustomCameraSettings:s?.camera.customSettings??null,initialAttachedPlayerId:s?.camera.attachedPlayerId??null,initialCameraViewMode:s?.camera.mode,initialBallCamEnabled:s?.camera.ballCam??!1,initialBoostPickupAnimationEnabled:s?.overlays.boostPickupAnimation??!1,initialSkipPostGoalTransitionsEnabled:_n.checked,initialSkipKickoffsEnabled:gn.checked,plugins:[oR(),NR({includePickup:r3}),a,zn]}),jp(),Bs(),fs=ne.subscribe(rv),s){Cs=!0;try{aU(s)}finally{Cs=!1}}t3(i.players),oc.hidden=!0,tn.textContent=`Loaded ${t.name}`,fc=t.name,Db.textContent=i.players.map(r=>r.name).join(", "),kb.textContent=`${i.frameCount}`,Qi(),Vg(),Zi=null,Ji=null,Hs(),av(!0),up(ne.getState()),rv(ne.getState()),po(ne.getState().frameIndex),gc(ne.getState().frameIndex),ao(ne.getState(),{forceScroll:!0}),Ei(),Fn(),xi?.hide()}catch(n){throw xi?.hide(),ne?.destroy(),ne=null,$t=null,Fn(),n}finally{As.disabled=!1}}function u3(t){let e;try{e=ab(window.location.search,window.location.href)}catch(n){console.error("Invalid replay URL:",n),tn.textContent=n instanceof Error?n.message:"Invalid replay URL";return}e&&_x(l3(e,t)).catch(n=>{t.aborted||(console.error("Failed to load replay URL:",n),tn.textContent=n instanceof Error?n.message:"Failed to load replay URL")})}function d3(t,e={}){hl?.(),t.innerHTML=iP(cb),Xi=t,xi=tI(t),As=te(t,"#replay-file"),fb=te(t,"#viewport"),oc=te(t,"#empty-state"),kg=te(t,"#empty-load-replay"),lc=te(t,"#launcher-toggle"),zf=te(t,"#launcher-menu"),Fg=te(t,"#load-replay-action"),Og=te(t,"#floating-window-layer"),vr=te(t,"#scoreboard-window-body"),yr=te(t,"#mechanics-timeline-window-body"),ps=te(t,"#event-playlist-window-body"),pl=te(t,"#mechanics-review-file"),cd=te(t,"#mechanics-review-url"),Ug=te(t,"#mechanics-review-load-url"),Hf=te(t,"#mechanics-review-status"),pb=te(t,"#mechanics-review-index"),hb=te(t,"#mechanics-review-title"),mb=te(t,"#mechanics-review-mechanic"),_b=te(t,"#mechanics-review-player"),gb=te(t,"#mechanics-review-clip"),vb=te(t,"#mechanics-review-event"),yb=te(t,"#mechanics-review-reason"),Vf=te(t,"#mechanics-review-prev"),Gf=te(t,"#mechanics-review-replay"),$f=te(t,"#mechanics-review-next"),Wf=te(t,"#mechanics-review-confirm"),Xf=te(t,"#mechanics-review-reject"),qf=te(t,"#mechanics-review-uncertain"),Yf=te(t,"#mechanics-review-replay-load-summary"),Kf=te(t,"#replay-loading-summary"),bb=te(t,"#replay-loading-active"),br=te(t,"#replay-loading-list"),xb=te(t,"#mechanics-review-count"),xr=te(t,"#mechanics-review-list"),jf=te(t,"#boost-pickup-filters-window-body"),Il=te(t,"#touch-controls-window-body"),Zf=te(t,"#stats-window-layer"),cc=te(t,"#toggle-playback"),Ma=te(t,"#playback-rate"),qi=te(t,"#attached-player"),Jf=te(t,"#camera-view-free"),Qf=te(t,"#camera-view-follow"),Lr=te(t,"#camera-view-overhead"),Nr=te(t,"#camera-view-side"),Ir=te(t,"#camera-distance"),Sb=te(t,"#camera-distance-readout"),Ui=te(t,"#custom-camera-settings"),uc=te(t,"#camera-settings-controls"),Zr=te(t,"#custom-camera-fov"),Jr=te(t,"#custom-camera-height"),Qr=te(t,"#custom-camera-pitch"),eo=te(t,"#custom-camera-distance"),to=te(t,"#custom-camera-stiffness"),no=te(t,"#custom-camera-swivel-speed"),io=te(t,"#custom-camera-transition-speed"),wb=te(t,"#custom-camera-fov-readout"),Eb=te(t,"#custom-camera-height-readout"),Mb=te(t,"#custom-camera-pitch-readout"),Tb=te(t,"#custom-camera-distance-readout"),Ab=te(t,"#custom-camera-stiffness-readout"),Cb=te(t,"#custom-camera-swivel-speed-readout"),Rb=te(t,"#custom-camera-transition-speed-readout"),Dr=te(t,"#ball-cam"),ep=te(t,"#module-summary"),Sr=te(t,"#module-settings"),Pb=te(t,"#time-readout"),Lb=te(t,"#frame-readout"),Nb=te(t,"#duration-readout"),Ib=te(t,"#playback-status-readout"),tn=te(t,"#status-readout"),Db=te(t,"#players-readout"),kb=te(t,"#frames-readout"),tp=te(t,"#events-readout"),Dl=te(t,"#camera-profile-readout"),kl=te(t,"#camera-fov-readout"),Fl=te(t,"#camera-height-readout"),Ol=te(t,"#camera-pitch-readout"),Ul=te(t,"#camera-base-distance-readout"),Bl=te(t,"#camera-stiffness-readout"),_n=te(t,"#skip-post-goal-transitions"),gn=te(t,"#skip-kickoffs"),Os=te(t,"#recording-fps"),Us=te(t,"#recording-playback-rate"),np=te(t,"#recording-start"),ip=te(t,"#recording-full-replay"),ap=te(t,"#recording-stop"),sp=te(t,"#recording-download"),rp=te(t,"#recording-clear"),Fb=te(t,"#recording-status"),Ob=te(t,"#recording-elapsed"),Ub=te(t,"#recording-size"),Bb=te(t,"#recording-type");const n=sb(window.location),i=yO(window.location);let a=null;if(e.initialConfig!==void 0)Di=e.initialConfig;else{try{Di=vO(window.location)}catch(l){a=l,console.error("Invalid stats player config:",l),tn.textContent=l instanceof Error?l.message:"Invalid stats player config",Di=null}i&&JO(n,Di,a)}const s=new AbortController;Hg(Og,s.signal),Hg(Zf,s.signal);const r=()=>{s.abort(),fs?.(),fs=null,Kp(),ne?.destroy(),ne=null,$t=null,zn=null,Pa=null,La=null,Ta=Kr(null),Na.clear(),Fc(),Oc(),Vb(),Wi=[],xi?.destroy(),xi=null,ii=new Set,Ks=new Set,Ea=new Set,js=new Set,Zi=null,pc=!0,Ji=null,Ot=null,zl=!1,wi=!0,fc=null,jn=null,Di=null,xa!==null&&(window.clearTimeout(xa),xa=null),Cs=!1,kr=1,dc=30,sc=null,Xi===t&&(Xi=null,t.replaceChildren()),hl===r&&(hl=null)};if(hl=r,Di){Cs=!0;try{eU(Di)}finally{Cs=!1}}lc.addEventListener("click",()=>{Fr(zf.hidden)},{signal:s.signal}),t.addEventListener("click",l=>{l.target instanceof Element&&(l.target.closest(".top-chrome")||Fr(!1))},{signal:s.signal}),Fg.addEventListener("click",zg,{signal:s.signal}),kg.addEventListener("click",zg,{signal:s.signal}),t.querySelectorAll("[data-window-toggle]").forEach(l=>{l.addEventListener("click",()=>{const c=l.dataset.windowToggle;c&&(sU(c),Fr(!1))},{signal:s.signal})}),t.querySelectorAll("[data-window-hide]").forEach(l=>{l.addEventListener("click",()=>{const c=l.dataset.windowHide??GO(l);c&&rU(c)},{signal:s.signal})}),t.querySelectorAll("[data-create-stats-window]").forEach(l=>{l.addEventListener("click",()=>{ux(l.dataset.createStatsWindow)},{signal:s.signal})}),As.addEventListener("change",async()=>{const l=As.files?.[0];if(l)try{Ot&&(Ot.currentClip=null,Ot.currentReplayId=null,Vs()),await _x(o3(l))}catch(c){console.error("Failed to load replay:",c),tn.textContent=c instanceof Error?c.message:"Failed to load replay"}},{signal:s.signal}),pl.addEventListener("change",async()=>{const l=pl.files?.[0];if(l)try{const c=Kb(await l.text());await ax(c,null)}catch(c){console.error("Failed to load mechanics review playlist:",c),sn(c instanceof Error?c.message:"Failed to load mechanics review playlist")}finally{pl.value=""}},{signal:s.signal}),Ug.addEventListener("click",()=>{Yg(cd.value.trim()).catch(l=>{console.error("Failed to load mechanics review playlist URL:",l),sn(l instanceof Error?l.message:"Failed to load mechanics review playlist URL")})},{signal:s.signal}),Vf.addEventListener("click",()=>{const l=Ot;l&&_c(Math.max(0,l.currentIndex-1))},{signal:s.signal}),Gf.addEventListener("click",PU,{signal:s.signal}),$f.addEventListener("click",()=>{const l=Ot;l&&_c(Math.min(l.manifest.items.length-1,l.currentIndex+1))},{signal:s.signal}),Wf.addEventListener("click",()=>{dd("confirmed")},{signal:s.signal}),Xf.addEventListener("click",()=>{dd("rejected")},{signal:s.signal}),qf.addEventListener("click",()=>{dd("uncertain")},{signal:s.signal}),cc.addEventListener("click",()=>{ne?.togglePlayback(),Ze()},{signal:s.signal}),Ma.addEventListener("change",()=>{ne?.setPlaybackRate(Number(Ma.value)),Ze()},{signal:s.signal}),np.addEventListener("click",()=>{if($t)try{const{fps:l}=sv();$t.start({fps:l}),Fn()}catch(l){console.error("Failed to start recording:",l),tn.textContent=l instanceof Error?l.message:"Failed to start recording",Fn($t.getStatus())}},{signal:s.signal}),ip.addEventListener("click",()=>{if(!$t)return;const{fps:l,playbackRate:c}=sv();$t.recordFullReplay({fps:l,playbackRate:c,restorePlaybackState:!0}).catch(u=>{console.error("Failed to record replay:",u),tn.textContent=u instanceof Error?u.message:"Failed to record replay",Fn($t?.getStatus()??null)}),Fn()},{signal:s.signal}),ap.addEventListener("click",()=>{$t?.stop().catch(l=>{console.error("Failed to stop recording:",l),tn.textContent=l instanceof Error?l.message:"Failed to stop recording"}),Fn()},{signal:s.signal}),sp.addEventListener("click",()=>{const l=$t?.getRecording();l&&s3(l)},{signal:s.signal}),rp.addEventListener("click",()=>{try{$t?.clear(),Fn()}catch(l){console.error("Failed to clear recording:",l)}},{signal:s.signal}),Os.addEventListener("change",Ze,{signal:s.signal}),Us.addEventListener("change",Ze,{signal:s.signal}),Ir.addEventListener("input",()=>{ne?.setCameraDistanceScale(Number(Ir.value)),Ze()},{signal:s.signal}),Ui.addEventListener("change",()=>{uc.hidden=!Ui.checked,ne?.setCustomCameraSettings(Ui.checked?iv():null),Ze()},{signal:s.signal});for(const l of[Zr,Jr,Qr,eo,to,no,io])l.addEventListener("input",()=>{const c=iv();hx(c),ne?.setCustomCameraSettings(c),Ze()},{signal:s.signal});qi.addEventListener("change",()=>{ne?.setAttachedPlayer(qi.value||null),jn=null,Ze()},{signal:s.signal}),Jf.addEventListener("click",()=>{ne?.setCameraViewMode("free"),jn=null,Ze()},{signal:s.signal}),Qf.addEventListener("click",()=>{ne?.setCameraViewMode("follow"),jn=null,Ze()},{signal:s.signal}),Lr.addEventListener("click",()=>{ne?.setFreeCameraPreset("overhead"),jn="overhead",Ze()},{signal:s.signal}),Nr.addEventListener("click",()=>{ne?.setFreeCameraPreset("side"),jn="side",Ze()},{signal:s.signal}),Dr.addEventListener("change",()=>{ne?.setBallCamEnabled(Dr.checked),Ze()},{signal:s.signal}),_n.addEventListener("change",()=>{ne?.setSkipPostGoalTransitionsEnabled(_n.checked),Ze()},{signal:s.signal}),gn.addEventListener("change",()=>{ne?.setSkipKickoffsEnabled(gn.checked),Ze()},{signal:s.signal}),ea(),Ei(),gc(),mx(),eh(),Fn(),Qi(),Vs(),Hs(),e.initialBundle?th({name:e.initialReplayName??"replay",preparingStatus:"Preparing replay...",async readBytes(){throw new Error("Replay bytes are not available for this preloaded replay")}},Promise.resolve(e.initialBundle)).catch(l=>{s.signal.aborted||(console.error("Failed to load preprocessed replay bundle:",l),tn.textContent=l instanceof Error?l.message:"Failed to load preprocessed replay bundle")}):e.loadFromLocation!==!1&&u3(s.signal);const o=vU();return o&&(cd.value=o,Yb("mechanics-review"),Yg(o).catch(l=>{s.signal.aborted||(console.error("Failed to load mechanics review playlist from URL:",l),sn(l instanceof Error?l.message:"Failed to load mechanics review playlist from URL"))})),{root:t,destroy:r}}const nn=["#58a6ff","#f39a37"],ov=["#58a6ff","#f39a37","#65d6ad","#d2a8ff","#ff7b72","#f2cc60","#79c0ff","#ffa657"],ur={zero:"#ff7b72",low:"#f39a37",midLow:"#f2cc60",midHigh:"#65d6ad",high:"#58a6ff"},lv={big:"#f39a37",small:"#65d6ad"};let Gl=null,so={};const gx=[{id:"overview",label:"Overview"},{id:"goals",label:"Goals"},{id:"boost",label:"Boost"},{id:"territory",label:"Possession & territory"},{id:"involvement",label:"Player involvement"},{id:"dump",label:"All stats"}],f3=[{statId:"player:core.score",kind:"bar",title:"Score by player"},{statId:"player:core.shots",kind:"bar",title:"Shots by player"},{statId:"player:touch.touch_count",kind:"bar",title:"Touches by player"},{statId:"team:core.shots",kind:"pie",title:"Shot share"},{statId:"team:possession.possession_time",kind:"pie",title:"Possession share"},{statId:"team:pressure.offensive_pressure_time",kind:"bar",title:"Offensive pressure"}],p3=[{statId:"player:touch.touch_count",kind:"bar",title:"Touches"},{statId:"player:touch.control_touch_count",kind:"bar",title:"Control touches"},{statId:"player:touch.hard_hit_count",kind:"bar",title:"Hard hits"},{statId:"player:demo.demos_inflicted",kind:"bar",title:"Demos inflicted"},{statId:"player:fifty_fifty.wins",kind:"bar",title:"50/50 wins"},{statId:"player:powerslide.total_duration",kind:"bar",title:"Powerslide time"}];function j(t,e={}){const n=document.createElement(t);return e.className&&(n.className=e.className),e.id&&(n.id=e.id),e.text!==void 0&&(n.textContent=e.text),n}function vx(t,e,n){return e==="player"?t.name||`Player ${n+1}`:n===0?"Blue":"Orange"}function vc(t){return t?zt(t):null}function os(t,e){const n=vc(e);return n?t.players.find(i=>vc(i.player_id)===n)?.name??n:"--"}function dp(t){return t===!0?"Blue":t===!1?"Orange":"--"}function yx(t,e){return e==="player"?t.players:[t.team_zero,t.team_one]}function bx(t){return t.is_team_0?nn[0]:nn[1]}function h3(t,e,n){return e==="player"?bx(t):nn[n%nn.length]}function m3(t,e){const n=t.frames.at(-1);return n?e.get(n.frame_number)??null:null}function _3(t,e){const n=t.read(e);return typeof n=="number"&&Number.isFinite(n)?n:null}function Zs(t){return t==null||!Number.isFinite(t)?"--":`${Number(t.toFixed(1))}s`}function g3(t){return t==null||!Number.isFinite(t)?"--":`${Number(t.toFixed(1))}%`}function Zn(t,e){return e>0?`${Zs(t)} (${g3(t/e*100)})`:"--"}function $l(t){return t?`x ${Math.round(t.x)}, y ${Math.round(t.y)}, z ${Math.round(t.z)}`:"--"}function Hn(t){return t==null||!Number.isFinite(t)?"--":`${Number(Fa(t).toFixed(0))}`}function Or(t){if(t==null||!Number.isFinite(t))return"--";const e=Math.max(0,t),n=Math.floor(e/60),i=e-n*60;return`${n}:${i.toFixed(1).padStart(4,"0")}`}function v3(t,e,n){if(!t||e==null||!Number.isFinite(e))return null;const i=vc(n),a=new URL("../",window.location.href);return a.searchParams.set("replayUrl",t.href),rb(a,xx(e,i)).href}function y3(t,e,n){if(e==null||!Number.isFinite(e))return null;const i=vc(n);return{config:xx(e,i),href:v3(t,e,n),goalTime:e,playerId:i}}function xx(t,e){return{version:ic,playback:{currentTime:Math.max(0,t-4),playing:!0,rate:1,skipPostGoalTransitions:!1,skipKickoffs:!1},camera:e?{mode:"follow",attachedPlayerId:e,ballCam:!0}:{mode:"free"},overlays:{timelineEvents:["core"],timelineRanges:[],mechanics:[],renderEffects:[],followedPlayerHud:!1,boostPads:!0,boostPickupAnimation:!1},recording:{},singletonWindows:[],statsWindows:[],moduleConfigs:{}}}function Sx(t,e){return e>0?`${Number((Fa(t)/e*60).toFixed(1))}/min`:"--"}function b3(t){const e=new Map;for(const n of t){const i=`${n.scope}:${n.category}`,a=e.get(i);a?a.push(n):e.set(i,[n])}return new Map([...e].sort(([n],[i])=>n.localeCompare(i)))}function wx(t){const[e,n]=t.split(":"),i=(n??"").replace(/_/g," ").replace(/\b\w/g,a=>a.toUpperCase());return`${e==="player"?"Player":"Team"} ${i}`}function Ex(t){return`stats-${t.replace(/[^a-z0-9]+/gi,"-").toLowerCase()}`}function x3(t){return t.path.slice(1).join(".")||t.label}function S3(t){return!t.path.includes("entries")}function rn(t,e,n){const i=j("section",{className:"stats-report-summary-card"});return i.append(j("span",{text:t}),j("strong",{text:e})),n&&i.append(j("small",{text:n})),i}function w3(t,e){const n=j("section",{className:"stats-report-summary"}),i=e.time>0?Zs(e.time):"--";return n.append(rn("Replay",t.fileName),rn("Frames",t.statsTimeline.frames.length.toLocaleString()),rn("Duration",i),rn("Players",e.players.length.toLocaleString())),n}function Js(t,e){const n=j("section",{className:"stats-report-page-intro"});return n.append(j("h2",{text:t}),j("p",{text:e})),n}function E3(t,e,n){const i=e[0]?.scope??"player",a=yx(n,i),s=j("section",{className:"stats-report-section",id:Ex(t)}),r=j("header");r.append(j("h2",{text:wx(t)}),j("span",{text:`${e.length} stats`}));const o=j("div",{className:"stats-report-table-wrap"}),l=j("table",{className:"stats-report-table"}),c=j("thead"),u=j("tr");u.append(j("th",{text:"Statistic"})),a.forEach((f,p)=>{u.append(j("th",{text:vx(f,i,p)}))}),c.append(u);const d=j("tbody");return e.forEach(f=>{const p=j("tr");p.append(j("td",{text:x3(f)})),a.forEach(_=>{p.append(j("td",{text:f.format(f.read(_))}))}),d.append(p)}),l.append(c,d),o.append(l),s.append(r,o),s}function nh(t,e){return yx(e,t.scope).map((n,i)=>({label:vx(n,t.scope,i),value:_3(t,n)??0,color:h3(n,t.scope,i)})).filter(n=>n.value>0)}function yc(t,e){const n=Math.max(...t.map(a=>a.value),1),i=j("div",{className:"stats-report-bar-chart"});return t.forEach(a=>{const s=j("div",{className:"stats-report-bar-row"});s.style.setProperty("--bar-color",a.color),s.style.setProperty("--bar-width",`${Math.max(2,a.value/n*100)}%`),s.append(j("span",{className:"stats-report-bar-label",text:a.label}),j("span",{className:"stats-report-bar-track"}),j("strong",{text:a.formatted??e(a.value)})),i.append(s)}),i}function Mx(t,e){const n=t.path.join(".");return t.category==="boost"&&(n.includes("amount_")||n.includes("overfill")||n.includes("boost_integral"))?Hn(e):n.endsWith("_time")||n.startsWith("time_")||n.includes(".time_")||n.endsWith("_duration")||n==="active_game_time"||n==="tracked_time"?Zs(e):t.format(e)}function M3(t,e){return yc(nh(t,e),n=>Mx(t,n))}function T3(t){const e=t.reduce((i,a)=>i+a.value,0);if(e<=0)return"conic-gradient(rgba(255,255,255,0.12) 0 360deg)";let n=0;return`conic-gradient(${t.map(i=>{const a=n;return n+=i.value/e*360,`${i.color} ${a}deg ${n}deg`}).join(", ")})`}function ih(t,e){const n=t.reduce((r,o)=>r+o.value,0),i=j("div",{className:"stats-report-pie-chart"}),a=j("div",{className:"stats-report-pie"});a.style.background=T3(t);const s=j("div",{className:"stats-report-pie-legend"});return t.forEach(r=>{const o=j("div");o.style.setProperty("--legend-color",r.color);const l=n>0?`${Math.round(r.value/n*100)}%`:"--";o.append(j("span",{text:r.label}),j("strong",{text:`${r.formatted??e(r.value)} (${l})`})),s.append(o)}),i.append(a,s),i}function A3(t,e){return ih(nh(t,e),n=>Mx(t,n))}function Tx(t,e="Territory share"){return Tn(e,ih([{label:"Blue half",value:t.team_zero.pressure.defensive_half_time,color:nn[0]},{label:"Neutral",value:t.team_zero.pressure.neutral_time,color:"#65d6ad"},{label:"Orange half",value:t.team_zero.pressure.offensive_half_time,color:nn[1]}],Zs))}function Tn(t,e,n){const i=j("section",{className:"stats-report-chart-card"});return i.append(j("h3",{text:t})),i.append(e),i}function Ax(t,e,n){return nh(e,n).length===0?null:Tn(t.title,t.kind==="pie"?A3(e,n):M3(e,n))}function Cx(t,e,n){const i=new Map(t.map(s=>[s.id,s])),a=j("section",{className:"stats-report-charts"});return n.forEach(s=>{const r=i.get(s.statId);if(!r)return;const o=Ax(s,r,e);o&&a.append(o)}),a.childElementCount>0?a:null}function Gs(t,e){const n=j("div",{className:"stats-report-stacked-chart"});return t.forEach(i=>{const a=i.segments.reduce((l,c)=>l+Math.max(0,c.value),0),s=j("div",{className:"stats-report-stacked-row"}),r=j("div",{className:"stats-report-stacked-track"});i.segments.forEach(l=>{const c=j("span");c.style.setProperty("--segment-color",l.color),c.style.setProperty("--segment-width",`${a>0?Math.max(1.5,l.value/a*100):0}%`),c.title=`${l.label}: ${e(l.value,a)}`,r.append(c)});const o=j("div",{className:"stats-report-stacked-legend"});i.segments.forEach(l=>{const c=j("span",{text:`${l.label}: ${e(l.value,a)}`});c.style.setProperty("--legend-color",l.color),o.append(c)}),s.append(j("strong",{text:i.label}),r,o),n.append(s)}),n}function Vc(t){const e=j("section",{className:"stats-report-metric-grid"});return e.append(...t),e}function wa(t,e,n){const i=[...t].sort((s,r)=>e(r)-e(s))[0],a=i?e(i):0;return rn(i?.name??"--",n(a))}function C3(t,e,n){const i=j("div",{className:"stats-report-page"});i.append(w3(t,e)),i.append(Js("Featured stats","A shorter readout of stable scoreboard, touch, boost, possession, and pressure signals. The raw export remains available in All stats."));const a=`${e.team_zero.core.goals}-${e.team_one.core.goals}`;i.append(Vc([rn("Final score",a,"Blue - Orange"),wa(e.players,r=>r.touch.touch_count,r=>`${r} touches`),wa(e.players,r=>r.boost.tracked_time>0?Fa(r.boost.boost_integral/r.boost.tracked_time):0,r=>`${Number(r.toFixed(0))} avg boost`),wa(e.players,r=>r.core.score,r=>`${r} score`)]));const s=Cx(n,e,f3)??j("section",{className:"stats-report-charts"});return s.append(Tx(e)),i.append(s),i}function R3(t){const e=new Map;for(const n of t){const i=e.get(n.goal_index)??[];i.push(n),e.set(n.goal_index,i)}for(const n of e.values())n.sort((i,a)=>i.kind.localeCompare(a.kind)||a.confidence-i.confidence);return e}function P3(t,e){const n=new Set(t.map((i,a)=>a));for(const i of e.keys())n.add(i);return[...n].sort((i,a)=>i-a)}function L3(t){const e=new Map;for(const n of t)e.set(n.kind,(e.get(n.kind)??0)+1);return[...e.entries()].sort(([n,i],[a,s])=>s-i||mn(n).localeCompare(mn(a))).map(([n,i],a)=>({label:mn(n),value:i,color:ov[a%ov.length],formatted:i.toLocaleString()}))}function N3(t){const e=j("dl",{className:"stats-report-detail-list"});for(const n of t){const i=j("div",{className:"stats-report-detail-item"});i.append(j("dt",{text:n.label}),j("dd",{text:n.value})),e.append(i)}return e}function I3(t){const e=j("div",{className:"stats-report-goal-tags"});if(t.length===0)return e.append(j("span",{className:"stats-report-goal-tag stats-report-goal-tag-empty",text:"Unlabeled"})),e;for(const n of t){const i=n.modifiers.length>0?` - ${n.modifiers.map(mn).join(", ")}`:"";e.append(j("span",{className:"stats-report-goal-tag",text:`${mn(n.kind)} ${Math.round(n.confidence*100)}%${i}`}))}return e}function D3(t,e){if(e.length===0)return null;const n=j("div",{className:"stats-report-goal-subsection"});n.append(j("h3",{text:"Player context"}));const i=j("div",{className:"stats-report-table-wrap"}),a=j("table",{className:"stats-report-table"}),s=j("thead"),r=j("tr");["Player","Team","Boost","Leadup avg","Leadup min","Role","Position"].forEach(l=>{r.append(j("th",{text:l}))}),s.append(r);const o=j("tbody");for(const l of e){const c=j("tr");c.append(j("td",{text:os(t,l.player)}),j("td",{text:dp(l.is_team_0)}),j("td",{text:Hn(l.boost_amount)}),j("td",{text:Hn(l.average_boost_in_leadup)}),j("td",{text:Hn(l.min_boost_in_leadup)}),j("td",{text:l.is_most_back?"Most back":"--"}),j("td",{text:$l(l.position)})),o.append(c)}return a.append(s,o),i.append(a),n.append(i),n}function k3(t,e,n,i,a){const s=a[0]??null,r=i?.scoring_team_is_team_0??s?.scoring_team_is_team_0??null,o=i?.scorer??s?.scorer??null,l=i?.time??s?.time??null,c=i?.frame??s?.frame??null,u=y3(e,l,o),d=j("section",{className:"stats-report-goal-card"});r!==null&&(d.dataset.team=r?"blue":"orange");const f=j("header"),p=j("div",{className:"stats-report-goal-heading"});if(p.append(j("h2",{text:`Goal ${n+1}`}),j("span",{text:`${dp(r)} - ${os(t,o)} - ${Or(l)}`})),f.append(p),u){if(so.onWatchGoal){const m=j("button",{className:"stats-report-goal-watch",text:"Watch"});m.type="button",m.addEventListener("click",()=>{so.onWatchGoal?.(u)}),f.append(m)}else if(u.href){const m=j("a",{className:"stats-report-goal-watch",text:"Watch"});m.setAttribute("href",u.href),m.setAttribute("target","_blank"),m.setAttribute("rel","noreferrer"),f.append(m)}}d.append(f),d.append(I3(a));const _=[{label:"Scoring team",value:dp(r)},{label:"Scorer",value:os(t,o)},{label:"Time",value:Or(l)},{label:"Frame",value:c==null?"--":c.toLocaleString()},{label:"Scorer last touch",value:i?.scorer_last_touch?`${os(t,i.scorer_last_touch.player)} at ${Or(i.scorer_last_touch.time)}`:"--"},{label:"Scoring most back",value:os(t,i?.scoring_team_most_back_player)},{label:"Defending most back",value:os(t,i?.defending_team_most_back_player)},{label:"Ball position",value:$l(i?.ball_position)},{label:"Last touch ball",value:$l(i?.scorer_last_touch?.ball_position)},{label:"Last touch player",value:$l(i?.scorer_last_touch?.player_position)}];d.append(N3(_));const g=D3(t,i?.players??[]);return g&&d.append(g),d}function F3(t,e){const n=j("div",{className:"stats-report-page"});n.append(Js("Goal metadata","Goal-by-goal scorer, timing, context, tag confidence, and lead-up player state from the stats timeline event stream."));const i=[...t.statsTimeline.events.goal_context??[]].sort((f,p)=>f.time-p.time),a=[...t.statsTimeline.events.goal_tags??[]],s=R3(a),r=P3(i,s),o=[...s.values()].filter(f=>f.length>0).length,l=L3(a),c=l[0];if(n.append(Vc([rn("Goals found",r.length.toLocaleString()),rn("Tagged goals",o.toLocaleString()),rn("Goal tags",a.length.toLocaleString()),rn("Top tag",c?`${c.label} (${c.value})`:"--")])),r.length===0)return n.append(j("section",{className:"stats-report-empty",text:"No goal metadata was emitted for this replay."})),n;const u=j("section",{className:"stats-report-charts"});u.append(Tn("Goal tags by type",l.length>0?yc(l,f=>f.toLocaleString()):j("p",{className:"stats-report-note",text:"No goal tags emitted."})),Tn("Goal timing",yc(r.map(f=>{const p=i[f]??null,_=s.get(f)?.[0]??null,g=p?.time??_?.time??0,m=p?.scoring_team_is_team_0??_?.scoring_team_is_team_0??!0;return{label:`Goal ${f+1}`,value:g,color:m?nn[0]:nn[1],formatted:Or(g)}}),Or))),n.append(u);const d=j("div",{className:"stats-report-goal-list"});for(const f of r)d.append(k3(e,t.replayUrl,f,i[f]??null,s.get(f)??[]));return n.append(d),n}function O3(t,e){const n=j("div",{className:"stats-report-page"});n.append(Js("Boost economy","A focused view of boost usage, collection, pad mix, starvation, and waste. Values are shown in normal 0-100 boost units.")),n.append(Vc([wa(t.players,s=>s.boost.amount_used,s=>`${Hn(s)} used`),wa(t.players,s=>s.boost.amount_stolen,s=>`${Hn(s)} stolen`),wa(t.players,s=>s.boost.overfill_total,s=>`${Hn(s)} overfill`),wa(t.players,s=>s.boost.time_zero_boost,s=>`${Zs(s)} at zero`)]));const i=j("section",{className:"stats-report-charts"});i.append(Tn("Boost used per minute",yc(t.players.map((s,r)=>({label:s.name||`Player ${r+1}`,value:s.boost.tracked_time>0?Fa(s.boost.amount_used)/s.boost.tracked_time*60:0,color:bx(s),formatted:Sx(s.boost.amount_used,s.boost.tracked_time)})),s=>`${Number(s.toFixed(1))}/min`)),Tn("Pad collection mix",Gs(t.players.map((s,r)=>({label:s.name||`Player ${r+1}`,segments:[{label:"Big",value:s.boost.amount_collected_big,color:lv.big},{label:"Small",value:s.boost.amount_collected_small,color:lv.small}]})),s=>Hn(s))),Tn("Boost tank time",Gs(t.players.map((s,r)=>({label:s.name||`Player ${r+1}`,segments:[{label:"0",value:s.boost.time_zero_boost,color:ur.zero},{label:"0-25",value:s.boost.time_boost_0_25,color:ur.low},{label:"25-50",value:s.boost.time_boost_25_50,color:ur.midLow},{label:"50-75",value:s.boost.time_boost_50_75,color:ur.midHigh},{label:"75-100",value:s.boost.time_boost_75_100+s.boost.time_hundred_boost,color:ur.high}]})),Zn)));const a=new Map(e.map(s=>[s.id,s]));for(const s of[{statId:"player:boost.amount_used",kind:"bar",title:"Total boost used"},{statId:"player:boost.overfill_total",kind:"bar",title:"Boost overfill"},{statId:"player:boost.amount_stolen",kind:"bar",title:"Stolen boost"}]){const r=a.get(s.statId),o=r?Ax(s,r,t):null;o&&i.append(o)}return n.append(i),n.append(U3(t)),n}function U3(t){const e=j("section",{className:"stats-report-section"}),n=j("header");n.append(j("h2",{text:"Boost scorecard"}),j("span",{text:"display units"}));const i=[{label:"Average boost",read(c){return c.boost.tracked_time>0?`${Number(Fa(c.boost.boost_integral/c.boost.tracked_time).toFixed(0))}`:"--"}},{label:"Used per minute",read(c){return Sx(c.boost.amount_used,c.boost.tracked_time)}},{label:"Collected",read(c){return Hn(c.boost.amount_collected)}},{label:"Stolen",read(c){return Hn(c.boost.amount_stolen)}},{label:"Overfill",read(c){return Hn(c.boost.overfill_total)}},{label:"Big pads",read(c){return`${c.boost.big_pads_collected}`}},{label:"Small pads",read(c){return`${c.boost.small_pads_collected}`}},{label:"Time at zero",read(c){return Zn(c.boost.time_zero_boost,c.boost.tracked_time)}}],a=j("div",{className:"stats-report-table-wrap"}),s=j("table",{className:"stats-report-table"}),r=j("thead"),o=j("tr");o.append(j("th",{text:"Metric"})),t.players.forEach((c,u)=>{o.append(j("th",{text:c.name||`Player ${u+1}`}))}),r.append(o);const l=j("tbody");return i.forEach(c=>{const u=j("tr");u.append(j("td",{text:c.label})),t.players.forEach(d=>{u.append(j("td",{text:c.read(d)}))}),l.append(u)}),s.append(r,l),a.append(s),e.append(n,a),e}function B3(t){const e=j("div",{className:"stats-report-page"});e.append(Js("Possession & territory","Team control, field-half pressure, and where each player spent time relative to the field and the ball."));const n=t.team_zero.possession.tracked_time,i=t.team_zero.pressure.tracked_time;e.append(Vc([rn("Blue possession",Zn(t.team_zero.possession.possession_time,n)),rn("Orange possession",Zn(t.team_zero.possession.opponent_possession_time,n)),rn("Blue pressure",Zn(t.team_zero.pressure.offensive_half_time,i),"Time in Orange half"),rn("Orange pressure",Zn(t.team_zero.pressure.defensive_half_time,i),"Time in Blue half")]));const a=j("section",{className:"stats-report-charts"});return a.append(Tn("Possession split",ih([{label:"Blue control",value:t.team_zero.possession.possession_time,color:nn[0]},{label:"Neutral",value:t.team_zero.possession.neutral_time,color:"#65d6ad"},{label:"Orange control",value:t.team_zero.possession.opponent_possession_time,color:nn[1]}],Zs)),Tx(t,"Field half pressure"),Tn("Player field thirds",Gs(t.players.map((s,r)=>({label:s.name||`Player ${r+1}`,segments:[{label:"Def",value:s.positioning.time_defensive_third,color:s.is_team_0?nn[0]:nn[1]},{label:"Mid",value:s.positioning.time_neutral_third,color:"#65d6ad"},{label:"Off",value:s.positioning.time_offensive_third,color:s.is_team_0?nn[1]:nn[0]}]})),Zn)),Tn("Role time",Gs(t.players.map((s,r)=>({label:s.name||`Player ${r+1}`,segments:[{label:"Most back",value:s.positioning.time_most_back,color:"#58a6ff"},{label:"Mid",value:s.positioning.time_mid_role,color:"#65d6ad"},{label:"Most forward",value:s.positioning.time_most_forward,color:"#f39a37"},{label:"Other",value:s.positioning.time_other_role,color:"rgba(255,255,255,0.22)"}]})),Zn))),e.append(a),e}function z3(t,e){const n=j("div",{className:"stats-report-page"});n.append(Js("Player involvement","Interaction stats that are usually easier to trust at a glance: touches, hits, demos, 50/50 outcomes, movement, and powerslide usage."));const i=Cx(e,t,p3);i&&n.append(i);const a=j("section",{className:"stats-report-charts"});return a.append(Tn("Speed bands",Gs(t.players.map((s,r)=>({label:s.name||`Player ${r+1}`,segments:[{label:"Slow",value:s.movement.time_slow_speed,color:"#58a6ff"},{label:"Boost",value:s.movement.time_boost_speed,color:"#f2cc60"},{label:"Supersonic",value:s.movement.time_supersonic_speed,color:"#f39a37"}]})),Zn)),Tn("Aerial profile",Gs(t.players.map((s,r)=>({label:s.name||`Player ${r+1}`,segments:[{label:"Ground",value:s.movement.time_on_ground,color:"#65d6ad"},{label:"Low air",value:s.movement.time_low_air,color:"#58a6ff"},{label:"High air",value:s.movement.time_high_air,color:"#d2a8ff"}]})),Zn))),n.append(a),n.append(j("p",{className:"stats-report-note",text:"Experimental mechanic detectors such as musty flicks, speed flips, dodge refreshes, and ceiling shots are kept in All stats until their precision is stronger."})),n}function H3(t,e){const n=j("div",{className:"stats-report-page"});n.append(Js("All stats dump","Everything emitted by the current stats timeline, including experimental mechanic counters and low-level breakdowns."));const i=j("nav",{className:"stats-report-jump-nav"});for(const s of t.keys()){const r=j("a",{text:wx(s)});r.setAttribute("href",`#${Ex(s)}`),i.append(r)}n.append(i);const a=j("div",{className:"stats-report-grid"});for(const[s,r]of t)a.append(E3(s,r,e));return n.append(a),n}function Rx(){const t=window.location.hash.replace(/^#/,"");return gx.some(e=>e.id===t)?t:"overview"}function V3(t,e,n){const i=j("nav",{className:"stats-report-tabs"});return gx.forEach(a=>{const s=j("button",{text:a.label});s.type="button",s.dataset.active=a.id===t?"true":"false",s.addEventListener("click",()=>{Rx()!==a.id&&window.history.replaceState(null,"",`#${a.id}`),bc(e,n)}),i.append(s)}),i}function ah(t){const e=j("header",{className:"stats-report-header"}),n=j("div",{className:"stats-report-title"});if(n.append(j("h1",{text:"Replay Stats"}),j("p",{text:t??"Load a Rocket League replay to review curated stats pages, comparison graphs, and the complete raw stat dump."})),so.showStandaloneActions!==!1){const i=j("div",{className:"stats-report-actions"}),a=j("label",{className:"stats-report-file-label",text:"Load replay"}),s=j("input");s.type="file",s.accept=".replay",s.addEventListener("change",async()=>{const o=s.files?.[0],l=Gl;o&&l instanceof HTMLElement&&await G3(l,o)}),a.append(s);const r=j("a",{className:"stats-report-link",text:"Open player"});r.setAttribute("href","../"),i.append(a,r),e.append(n,i)}else e.append(n);return e}function bc(t,e){const n=m3(e.statsTimeline,e.statsFrameLookup);if(!n){t.replaceChildren(j("main",{className:"stats-report-empty",text:"The replay did not produce any stats frames."}));return}const i=Kr(n).filter(S3),a=b3(i),s=Rx(),r=j("main",{className:"stats-report"});r.append(ah()),r.append(V3(s,t,e)),s==="goals"?r.append(F3(e,n)):s==="boost"?r.append(O3(n,i)):s==="territory"?r.append(B3(n)):s==="involvement"?r.append(z3(n,i)):s==="dump"?r.append(H3(a,n)):r.append(C3(e,n,i)),t.replaceChildren(r)}function cv(t){return{...t,statsFrameLookup:t.statsFrameLookup??Ey(t.statsTimeline)}}function ro(t,e){const n=j("main",{className:"stats-report"});n.append(ah(e)),n.append(j("p",{className:"stats-report-status",text:e})),t.replaceChildren(n)}async function Px(t,e,n,i){ro(t,`Loading ${n}...`);const a=await Rc(e,{onProgress(s){ro(t,Xs(s))}});bc(t,{fileName:n,replayUrl:i,statsTimeline:a.statsTimeline,statsFrameLookup:a.statsFrameLookup})}async function G3(t,e){try{await Px(t,new Uint8Array(await e.arrayBuffer()),e.name,null)}catch(n){ro(t,n instanceof Error?n.message:String(n))}}async function $3(t,e){try{ro(t,`Fetching ${e}...`);const n=await fetch(e);if(!n.ok)throw new Error(`Failed to fetch replay: ${n.status} ${n.statusText}`);const i=new URL(e,window.location.href).pathname,a=decodeURIComponent(i.split("/").pop()||"remote replay");await Px(t,new Uint8Array(await n.arrayBuffer()),a,n.url?new URL(n.url):new URL(e,window.location.href))}catch(n){ro(t,n instanceof Error?n.message:String(n))}}function W3(t,e={}){if(Gl=t,so=e,e.initialData)bc(t,cv(e.initialData));else{const i=j("main",{className:"stats-report"});i.append(ah()),i.append(j("section",{className:"stats-report-empty",text:"Load a replay to generate the stats report."})),t.replaceChildren(i)}const n=new URL(window.location.href).searchParams.get("replayUrl");return!e.initialData&&n&&$3(t,n),{root:t,render(i){bc(t,cv(i))},destroy(){Gl===t&&(Gl=null,so={}),t.replaceChildren()}}}const gl="replay-review-document",uv="replay-review-root";function fn(t,e={}){const n=document.createElement(t);return e.className&&(n.className=e.className),e.id&&(n.id=e.id),e.text!==void 0&&(n.textContent=e.text),n}function Lx(t,e={}){let n=null;const i=async()=>t instanceof Uint8Array?t:await t(),a=s=>(n||(n=i().then(r=>Rc(r,{reportEveryNFrames:100,onProgress:s}))),n);return{replayName:e.replayName,replayUrl:e.replayUrl??null,async getStatsTimeline(s){return(await a(s)).statsTimeline},getReplayBundle:a}}function X3(t=window.location){const e=ab(t.search,t.href);return e?Lx(async()=>{const n=await fetch(e.url,e.fetchInit);if(!n.ok){const i=n.statusText?` ${n.statusText}`:"";throw new Error(`Failed to fetch replay: ${n.status}${i}`)}return new Uint8Array(await n.arrayBuffer())},{replayName:e.name,replayUrl:e.url}):null}function q3(t){return t||(new URL(window.location.href).searchParams.get("mode")==="viewer"?"viewer":"report")}function Y3(t){const e=new URL(window.location.href);t==="report"?e.searchParams.delete("mode"):e.searchParams.set("mode",t),window.history.replaceState(null,"",e)}function K3(t,e={}){document.documentElement.classList.add(gl),document.body.classList.add(gl),t.classList.add(uv);let n=e.provider??null,i=q3(e.initialMode),a=null,s=null,r=null,o=null,l=null,c=!1;const u=fn("main",{className:"replay-review-shell"}),d=fn("div",{className:"replay-review-toolbar"}),f=fn("div",{className:"replay-review-status"}),p=fn("button",{text:"Stats"}),_=fn("button",{text:"Viewer"}),g=fn("label",{className:"replay-review-file",text:"Load replay"}),m=fn("input"),h=fn("section",{className:"replay-review-pane"}),b=fn("section",{className:"replay-review-pane"});m.type="file",m.accept=".replay",g.append(m),d.append(f,g,p,_),u.append(d,h,b),t.replaceChildren(u);const S=I=>{f.textContent=I},y=I=>{S(Xs(I))},C=()=>{a?.destroy(),a=null,s?.destroy(),s=null,r=null,o=null,l=null},M=()=>n?.getReplayBundle?(o||(o=n.getReplayBundle(y)),o):null,T=()=>n?(r||(r=n.getStatsTimeline?n.getStatsTimeline(y):M()?.then(I=>I.statsTimeline)??null),r):null,A=()=>{h.replaceChildren(fn("section",{className:"replay-review-empty",text:"Load a replay to review stats and playback."}))},v=async()=>{if(a)return;const I=T(),U=M();if(!I&&!U){A(),S("No replay loaded");return}h.replaceChildren(fn("section",{className:"replay-review-empty",text:"Loading stats..."}));const z=await U,G=z?.statsTimeline??(I?await I:null);if(!G){A(),S("No replay loaded");return}const B={fileName:n?.replayName??"replay",replayUrl:n?.replayUrl??null,statsTimeline:G,statsFrameLookup:z?.statsFrameLookup};c||(a=W3(h,{initialData:B,showStandaloneActions:!1,onWatchGoal(X){l=X.config,s?.destroy(),s=null,i="viewer",R()}}),S(`Loaded ${B.fileName}`))},x=async()=>{if(s)return;const I=M();if(!I){b.replaceChildren(fn("section",{className:"replay-review-empty",text:"Replay playback is not available for this data source."})),S("Viewer unavailable");return}b.replaceChildren(fn("section",{className:"replay-review-empty",text:"Loading viewer..."}));const U=await I;c||(s=d3(b,{initialBundle:U,initialConfig:l,initialReplayName:n?.replayName,loadFromLocation:!1}),l=null,S(`Loaded ${n?.replayName??"replay"}`))},R=()=>{p.dataset.active=String(i==="report"),_.dataset.active=String(i==="viewer"),h.hidden=i!=="report",b.hidden=i!=="viewer",Y3(i),(i==="report"?v():x()).catch(I=>{console.error("Failed to render replay review mode:",I),S(I instanceof Error?I.message:"Failed to load replay review")})};return p.addEventListener("click",()=>{i="report",R()}),_.addEventListener("click",()=>{i="viewer",R()}),m.addEventListener("change",()=>{const I=m.files?.[0];I&&(n=Lx(async()=>new Uint8Array(await I.arrayBuffer()),{replayName:I.name,replayUrl:null}),C(),R())}),R(),{root:t,setMode(I){i=I,R()},setProvider(I,U={}){n=I,U.mode&&(i=U.mode),C(),R()},destroy(){c=!0,C(),t.classList.remove(uv),document.documentElement.classList.remove(gl),document.body.classList.remove(gl),t.replaceChildren()}}}const Nx=document.querySelector("#app");if(!(Nx instanceof HTMLElement))throw new Error("Missing #app mount element");let Ix=null;try{Ix=X3(window.location)}catch(t){console.error("Invalid replay URL:",t)}K3(Nx,{provider:Ix});
