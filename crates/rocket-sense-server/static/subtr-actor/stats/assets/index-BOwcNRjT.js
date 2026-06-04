(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function t(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(a){if(a.ep)return;a.ep=!0;const s=t(a);fetch(a.href,s)}})();const Yd="180",ja={ROTATE:0,DOLLY:1,PAN:2},Ga={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},R0=0,Wf=1,P0=2,V_=1,L0=2,hi=3,Bi=0,sn=1,et=2,ki=0,Za=1,Di=2,Xf=3,qf=4,N0=5,ia=100,I0=101,k0=102,D0=103,F0=104,O0=200,U0=201,B0=202,z0=203,pu=204,hu=205,H0=206,V0=207,G0=208,$0=209,W0=210,X0=211,q0=212,K0=213,Y0=214,mu=0,_u=1,gu=2,fs=3,vu=4,yu=5,bu=6,Su=7,El=0,j0=1,Z0=2,Fi=0,J0=1,Q0=2,eb=3,tb=4,nb=5,ib=6,ab=7,G_=300,ps=301,hs=302,xu=303,wu=304,Ml=306,Eu=1e3,la=1001,Mu=1002,Bn=1003,sb=1004,Pr=1005,jn=1006,Vl=1007,ca=1008,ni=1009,$_=1010,W_=1011,ir=1012,jd=1013,fa=1014,vi=1015,wr=1016,Zd=1017,Jd=1018,ar=1020,X_=35902,q_=35899,K_=1021,Y_=1022,On=1023,sr=1026,rr=1027,j_=1028,Qd=1029,Z_=1030,ef=1031,tf=1033,ko=33776,Do=33777,Fo=33778,Oo=33779,Tu=35840,Cu=35841,Au=35842,Ru=35843,Pu=36196,Lu=37492,Nu=37496,Iu=37808,ku=37809,Du=37810,Fu=37811,Ou=37812,Uu=37813,Bu=37814,zu=37815,Hu=37816,Vu=37817,Gu=37818,$u=37819,Wu=37820,Xu=37821,qu=36492,Ku=36494,Yu=36495,ju=36283,Zu=36284,Ju=36285,Qu=36286,rb=3200,ob=3201,nf=0,lb=1,Li="",$t="srgb",ms="srgb-linear",nl="linear",ot="srgb",ya=7680,Kf=519,cb=512,ub=513,db=514,J_=515,fb=516,pb=517,hb=518,mb=519,ed=35044,Yf="300 es",Zn=2e3,il=2001;class ma{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const a=i[e];if(a!==void 0){const s=a.indexOf(t);s!==-1&&a.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const a=i.slice(0);for(let s=0,r=a.length;s<r;s++)a[s].call(this,e);e.target=null}}}const Vt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let jf=1234567;const Ja=Math.PI/180,or=180/Math.PI;function Qn(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Vt[n&255]+Vt[n>>8&255]+Vt[n>>16&255]+Vt[n>>24&255]+"-"+Vt[e&255]+Vt[e>>8&255]+"-"+Vt[e>>16&15|64]+Vt[e>>24&255]+"-"+Vt[t&63|128]+Vt[t>>8&255]+"-"+Vt[t>>16&255]+Vt[t>>24&255]+Vt[i&255]+Vt[i>>8&255]+Vt[i>>16&255]+Vt[i>>24&255]).toLowerCase()}function qe(n,e,t){return Math.max(e,Math.min(t,n))}function af(n,e){return(n%e+e)%e}function _b(n,e,t,i,a){return i+(n-e)*(a-i)/(t-e)}function gb(n,e,t){return n!==e?(t-n)/(e-n):0}function Ks(n,e,t){return(1-t)*n+t*e}function vb(n,e,t,i){return Ks(n,e,1-Math.exp(-t*i))}function yb(n,e=1){return e-Math.abs(af(n,e*2)-e)}function bb(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function Sb(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function xb(n,e){return n+Math.floor(Math.random()*(e-n+1))}function wb(n,e){return n+Math.random()*(e-n)}function Eb(n){return n*(.5-Math.random())}function Mb(n){n!==void 0&&(jf=n);let e=jf+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Tb(n){return n*Ja}function Cb(n){return n*or}function Ab(n){return(n&n-1)===0&&n!==0}function Rb(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Pb(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Lb(n,e,t,i,a){const s=Math.cos,r=Math.sin,o=s(t/2),l=r(t/2),c=s((e+i)/2),u=r((e+i)/2),d=s((e-i)/2),f=r((e-i)/2),p=s((i-e)/2),_=r((i-e)/2);switch(a){case"XYX":n.set(o*u,l*d,l*f,o*c);break;case"YZY":n.set(l*f,o*u,l*d,o*c);break;case"ZXZ":n.set(l*d,l*f,o*u,o*c);break;case"XZX":n.set(o*u,l*_,l*p,o*c);break;case"YXY":n.set(l*p,o*u,l*_,o*c);break;case"ZYZ":n.set(l*_,l*p,o*u,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+a)}}function Fn(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function nt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const dt={DEG2RAD:Ja,RAD2DEG:or,generateUUID:Qn,clamp:qe,euclideanModulo:af,mapLinear:_b,inverseLerp:gb,lerp:Ks,damp:vb,pingpong:yb,smoothstep:bb,smootherstep:Sb,randInt:xb,randFloat:wb,randFloatSpread:Eb,seededRandom:Mb,degToRad:Tb,radToDeg:Cb,isPowerOfTwo:Ab,ceilPowerOfTwo:Rb,floorPowerOfTwo:Pb,setQuaternionFromProperEuler:Lb,normalize:nt,denormalize:Fn};class le{constructor(e=0,t=0){le.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,a=e.elements;return this.x=a[0]*t+a[3]*i+a[6],this.y=a[1]*t+a[4]*i+a[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=qe(this.x,e.x,t.x),this.y=qe(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=qe(this.x,e,t),this.y=qe(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(qe(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(qe(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),a=Math.sin(t),s=this.x-e.x,r=this.y-e.y;return this.x=s*i-r*a+e.x,this.y=s*a+r*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ii{constructor(e=0,t=0,i=0,a=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=a}static slerpFlat(e,t,i,a,s,r,o){let l=i[a+0],c=i[a+1],u=i[a+2],d=i[a+3];const f=s[r+0],p=s[r+1],_=s[r+2],g=s[r+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d;return}if(o===1){e[t+0]=f,e[t+1]=p,e[t+2]=_,e[t+3]=g;return}if(d!==g||l!==f||c!==p||u!==_){let m=1-o;const h=l*f+c*p+u*_+d*g,y=h>=0?1:-1,x=1-h*h;if(x>Number.EPSILON){const A=Math.sqrt(x),M=Math.atan2(A,h*y);m=Math.sin(m*M)/A,o=Math.sin(o*M)/A}const b=o*y;if(l=l*m+f*b,c=c*m+p*b,u=u*m+_*b,d=d*m+g*b,m===1-o){const A=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=A,c*=A,u*=A,d*=A}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,a,s,r){const o=i[a],l=i[a+1],c=i[a+2],u=i[a+3],d=s[r],f=s[r+1],p=s[r+2],_=s[r+3];return e[t]=o*_+u*d+l*p-c*f,e[t+1]=l*_+u*f+c*d-o*p,e[t+2]=c*_+u*p+o*f-l*d,e[t+3]=u*_-o*d-l*f-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,a){return this._x=e,this._y=t,this._z=i,this._w=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,a=e._y,s=e._z,r=e._order,o=Math.cos,l=Math.sin,c=o(i/2),u=o(a/2),d=o(s/2),f=l(i/2),p=l(a/2),_=l(s/2);switch(r){case"XYZ":this._x=f*u*d+c*p*_,this._y=c*p*d-f*u*_,this._z=c*u*_+f*p*d,this._w=c*u*d-f*p*_;break;case"YXZ":this._x=f*u*d+c*p*_,this._y=c*p*d-f*u*_,this._z=c*u*_-f*p*d,this._w=c*u*d+f*p*_;break;case"ZXY":this._x=f*u*d-c*p*_,this._y=c*p*d+f*u*_,this._z=c*u*_+f*p*d,this._w=c*u*d-f*p*_;break;case"ZYX":this._x=f*u*d-c*p*_,this._y=c*p*d+f*u*_,this._z=c*u*_-f*p*d,this._w=c*u*d+f*p*_;break;case"YZX":this._x=f*u*d+c*p*_,this._y=c*p*d+f*u*_,this._z=c*u*_-f*p*d,this._w=c*u*d-f*p*_;break;case"XZY":this._x=f*u*d-c*p*_,this._y=c*p*d-f*u*_,this._z=c*u*_+f*p*d,this._w=c*u*d+f*p*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+r)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,a=Math.sin(i);return this._x=e.x*a,this._y=e.y*a,this._z=e.z*a,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],a=t[4],s=t[8],r=t[1],o=t[5],l=t[9],c=t[2],u=t[6],d=t[10],f=i+o+d;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(u-l)*p,this._y=(s-c)*p,this._z=(r-a)*p}else if(i>o&&i>d){const p=2*Math.sqrt(1+i-o-d);this._w=(u-l)/p,this._x=.25*p,this._y=(a+r)/p,this._z=(s+c)/p}else if(o>d){const p=2*Math.sqrt(1+o-i-d);this._w=(s-c)/p,this._x=(a+r)/p,this._y=.25*p,this._z=(l+u)/p}else{const p=2*Math.sqrt(1+d-i-o);this._w=(r-a)/p,this._x=(s+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(qe(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const a=Math.min(1,t/i);return this.slerp(e,a),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,a=e._y,s=e._z,r=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+r*o+a*c-s*l,this._y=a*u+r*l+s*o-i*c,this._z=s*u+r*c+i*l-a*o,this._w=r*u-i*o-a*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,a=this._y,s=this._z,r=this._w;let o=r*e._w+i*e._x+a*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=r,this._x=i,this._y=a,this._z=s,this;const l=1-o*o;if(l<=Number.EPSILON){const p=1-t;return this._w=p*r+t*this._w,this._x=p*i+t*this._x,this._y=p*a+t*this._y,this._z=p*s+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,o),d=Math.sin((1-t)*u)/c,f=Math.sin(t*u)/c;return this._w=r*d+this._w*f,this._x=i*d+this._x*f,this._y=a*d+this._y*f,this._z=s*d+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),a=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(a*Math.sin(e),a*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class L{constructor(e=0,t=0,i=0){L.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Zf.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Zf.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,a=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*a,this.y=s[1]*t+s[4]*i+s[7]*a,this.z=s[2]*t+s[5]*i+s[8]*a,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,a=this.z,s=e.elements,r=1/(s[3]*t+s[7]*i+s[11]*a+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*a+s[12])*r,this.y=(s[1]*t+s[5]*i+s[9]*a+s[13])*r,this.z=(s[2]*t+s[6]*i+s[10]*a+s[14])*r,this}applyQuaternion(e){const t=this.x,i=this.y,a=this.z,s=e.x,r=e.y,o=e.z,l=e.w,c=2*(r*a-o*i),u=2*(o*t-s*a),d=2*(s*i-r*t);return this.x=t+l*c+r*d-o*u,this.y=i+l*u+o*c-s*d,this.z=a+l*d+s*u-r*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,a=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*a,this.y=s[1]*t+s[5]*i+s[9]*a,this.z=s[2]*t+s[6]*i+s[10]*a,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=qe(this.x,e.x,t.x),this.y=qe(this.y,e.y,t.y),this.z=qe(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=qe(this.x,e,t),this.y=qe(this.y,e,t),this.z=qe(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(qe(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,a=e.y,s=e.z,r=t.x,o=t.y,l=t.z;return this.x=a*l-s*o,this.y=s*r-i*l,this.z=i*o-a*r,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Gl.copy(this).projectOnVector(e),this.sub(Gl)}reflect(e){return this.sub(Gl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(qe(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,a=this.z-e.z;return t*t+i*i+a*a}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const a=Math.sin(t)*e;return this.x=a*Math.sin(i),this.y=Math.cos(t)*e,this.z=a*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),a=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=a,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Gl=new L,Zf=new ii;class $e{constructor(e,t,i,a,s,r,o,l,c){$e.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,a,s,r,o,l,c)}set(e,t,i,a,s,r,o,l,c){const u=this.elements;return u[0]=e,u[1]=a,u[2]=o,u[3]=t,u[4]=s,u[5]=l,u[6]=i,u[7]=r,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,a=t.elements,s=this.elements,r=i[0],o=i[3],l=i[6],c=i[1],u=i[4],d=i[7],f=i[2],p=i[5],_=i[8],g=a[0],m=a[3],h=a[6],y=a[1],x=a[4],b=a[7],A=a[2],M=a[5],T=a[8];return s[0]=r*g+o*y+l*A,s[3]=r*m+o*x+l*M,s[6]=r*h+o*b+l*T,s[1]=c*g+u*y+d*A,s[4]=c*m+u*x+d*M,s[7]=c*h+u*b+d*T,s[2]=f*g+p*y+_*A,s[5]=f*m+p*x+_*M,s[8]=f*h+p*b+_*T,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],a=e[2],s=e[3],r=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*r*u-t*o*c-i*s*u+i*o*l+a*s*c-a*r*l}invert(){const e=this.elements,t=e[0],i=e[1],a=e[2],s=e[3],r=e[4],o=e[5],l=e[6],c=e[7],u=e[8],d=u*r-o*c,f=o*l-u*s,p=c*s-r*l,_=t*d+i*f+a*p;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/_;return e[0]=d*g,e[1]=(a*c-u*i)*g,e[2]=(o*i-a*r)*g,e[3]=f*g,e[4]=(u*t-a*l)*g,e[5]=(a*s-o*t)*g,e[6]=p*g,e[7]=(i*l-c*t)*g,e[8]=(r*t-i*s)*g,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,a,s,r,o){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*r+c*o)+r+e,-a*c,a*l,-a*(-c*r+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply($l.makeScale(e,t)),this}rotate(e){return this.premultiply($l.makeRotation(-e)),this}translate(e,t){return this.premultiply($l.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let a=0;a<9;a++)if(t[a]!==i[a])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const $l=new $e;function Q_(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function al(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Nb(){const n=al("canvas");return n.style.display="block",n}const Jf={};function lr(n){n in Jf||(Jf[n]=!0,console.warn(n))}function Ib(n,e,t){return new Promise(function(i,a){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:a();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}const Qf=new $e().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ep=new $e().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function kb(){const n={enabled:!0,workingColorSpace:ms,spaces:{},convert:function(a,s,r){return this.enabled===!1||s===r||!s||!r||(this.spaces[s].transfer===ot&&(a.r=yi(a.r),a.g=yi(a.g),a.b=yi(a.b)),this.spaces[s].primaries!==this.spaces[r].primaries&&(a.applyMatrix3(this.spaces[s].toXYZ),a.applyMatrix3(this.spaces[r].fromXYZ)),this.spaces[r].transfer===ot&&(a.r=Qa(a.r),a.g=Qa(a.g),a.b=Qa(a.b))),a},workingToColorSpace:function(a,s){return this.convert(a,this.workingColorSpace,s)},colorSpaceToWorking:function(a,s){return this.convert(a,s,this.workingColorSpace)},getPrimaries:function(a){return this.spaces[a].primaries},getTransfer:function(a){return a===Li?nl:this.spaces[a].transfer},getToneMappingMode:function(a){return this.spaces[a].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(a,s=this.workingColorSpace){return a.fromArray(this.spaces[s].luminanceCoefficients)},define:function(a){Object.assign(this.spaces,a)},_getMatrix:function(a,s,r){return a.copy(this.spaces[s].toXYZ).multiply(this.spaces[r].fromXYZ)},_getDrawingBufferColorSpace:function(a){return this.spaces[a].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(a=this.workingColorSpace){return this.spaces[a].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(a,s){return lr("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(a,s)},toWorkingColorSpace:function(a,s){return lr("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(a,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[ms]:{primaries:e,whitePoint:i,transfer:nl,toXYZ:Qf,fromXYZ:ep,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:$t},outputColorSpaceConfig:{drawingBufferColorSpace:$t}},[$t]:{primaries:e,whitePoint:i,transfer:ot,toXYZ:Qf,fromXYZ:ep,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:$t}}}),n}const Qe=kb();function yi(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Qa(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let ba;class Db{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{ba===void 0&&(ba=al("canvas")),ba.width=e.width,ba.height=e.height;const a=ba.getContext("2d");e instanceof ImageData?a.putImageData(e,0,0):a.drawImage(e,0,0,e.width,e.height),i=ba}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=al("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const a=i.getImageData(0,0,e.width,e.height),s=a.data;for(let r=0;r<s.length;r++)s[r]=yi(s[r]/255)*255;return i.putImageData(a,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(yi(t[i]/255)*255):t[i]=yi(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Fb=0;class sf{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Fb++}),this.uuid=Qn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},a=this.data;if(a!==null){let s;if(Array.isArray(a)){s=[];for(let r=0,o=a.length;r<o;r++)a[r].isDataTexture?s.push(Wl(a[r].image)):s.push(Wl(a[r]))}else s=Wl(a);i.url=s}return t||(e.images[this.uuid]=i),i}}function Wl(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Db.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Ob=0;const Xl=new L;class jt extends ma{constructor(e=jt.DEFAULT_IMAGE,t=jt.DEFAULT_MAPPING,i=la,a=la,s=jn,r=ca,o=On,l=ni,c=jt.DEFAULT_ANISOTROPY,u=Li){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ob++}),this.uuid=Qn(),this.name="",this.source=new sf(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=a,this.magFilter=s,this.minFilter=r,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new le(0,0),this.repeat=new le(1,1),this.center=new le(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new $e,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Xl).x}get height(){return this.source.getSize(Xl).y}get depth(){return this.source.getSize(Xl).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const a=this[t];if(a===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}a&&i&&a.isVector2&&i.isVector2||a&&i&&a.isVector3&&i.isVector3||a&&i&&a.isMatrix3&&i.isMatrix3?a.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==G_)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Eu:e.x=e.x-Math.floor(e.x);break;case la:e.x=e.x<0?0:1;break;case Mu:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Eu:e.y=e.y-Math.floor(e.y);break;case la:e.y=e.y<0?0:1;break;case Mu:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}jt.DEFAULT_IMAGE=null;jt.DEFAULT_MAPPING=G_;jt.DEFAULT_ANISOTROPY=1;class Mt{constructor(e=0,t=0,i=0,a=1){Mt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=a}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,a){return this.x=e,this.y=t,this.z=i,this.w=a,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,a=this.z,s=this.w,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*a+r[12]*s,this.y=r[1]*t+r[5]*i+r[9]*a+r[13]*s,this.z=r[2]*t+r[6]*i+r[10]*a+r[14]*s,this.w=r[3]*t+r[7]*i+r[11]*a+r[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,a,s;const l=e.elements,c=l[0],u=l[4],d=l[8],f=l[1],p=l[5],_=l[9],g=l[2],m=l[6],h=l[10];if(Math.abs(u-f)<.01&&Math.abs(d-g)<.01&&Math.abs(_-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(d+g)<.1&&Math.abs(_+m)<.1&&Math.abs(c+p+h-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const x=(c+1)/2,b=(p+1)/2,A=(h+1)/2,M=(u+f)/4,T=(d+g)/4,C=(_+m)/4;return x>b&&x>A?x<.01?(i=0,a=.707106781,s=.707106781):(i=Math.sqrt(x),a=M/i,s=T/i):b>A?b<.01?(i=.707106781,a=0,s=.707106781):(a=Math.sqrt(b),i=M/a,s=C/a):A<.01?(i=.707106781,a=.707106781,s=0):(s=Math.sqrt(A),i=T/s,a=C/s),this.set(i,a,s,t),this}let y=Math.sqrt((m-_)*(m-_)+(d-g)*(d-g)+(f-u)*(f-u));return Math.abs(y)<.001&&(y=1),this.x=(m-_)/y,this.y=(d-g)/y,this.z=(f-u)/y,this.w=Math.acos((c+p+h-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=qe(this.x,e.x,t.x),this.y=qe(this.y,e.y,t.y),this.z=qe(this.z,e.z,t.z),this.w=qe(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=qe(this.x,e,t),this.y=qe(this.y,e,t),this.z=qe(this.z,e,t),this.w=qe(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(qe(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Ub extends ma{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:jn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new Mt(0,0,e,t),this.scissorTest=!1,this.viewport=new Mt(0,0,e,t);const a={width:e,height:t,depth:i.depth},s=new jt(a);this.textures=[];const r=i.count;for(let o=0;o<r;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){const t={minFilter:jn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let a=0,s=this.textures.length;a<s;a++)this.textures[a].image.width=e,this.textures[a].image.height=t,this.textures[a].image.depth=i,this.textures[a].isArrayTexture=this.textures[a].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const a=Object.assign({},e.textures[t].image);this.textures[t].source=new sf(a)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class pa extends Ub{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class eg extends jt{constructor(e=null,t=1,i=1,a=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:a},this.magFilter=Bn,this.minFilter=Bn,this.wrapR=la,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Bb extends jt{constructor(e=null,t=1,i=1,a=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:a},this.magFilter=Bn,this.minFilter=Bn,this.wrapR=la,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Er{constructor(e=new L(1/0,1/0,1/0),t=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Mn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Mn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Mn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let r=0,o=s.count;r<o;r++)e.isMesh===!0?e.getVertexPosition(r,Mn):Mn.fromBufferAttribute(s,r),Mn.applyMatrix4(e.matrixWorld),this.expandByPoint(Mn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Lr.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Lr.copy(i.boundingBox)),Lr.applyMatrix4(e.matrixWorld),this.union(Lr)}const a=e.children;for(let s=0,r=a.length;s<r;s++)this.expandByObject(a[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Mn),Mn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(As),Nr.subVectors(this.max,As),Sa.subVectors(e.a,As),xa.subVectors(e.b,As),wa.subVectors(e.c,As),Si.subVectors(xa,Sa),xi.subVectors(wa,xa),Wi.subVectors(Sa,wa);let t=[0,-Si.z,Si.y,0,-xi.z,xi.y,0,-Wi.z,Wi.y,Si.z,0,-Si.x,xi.z,0,-xi.x,Wi.z,0,-Wi.x,-Si.y,Si.x,0,-xi.y,xi.x,0,-Wi.y,Wi.x,0];return!ql(t,Sa,xa,wa,Nr)||(t=[1,0,0,0,1,0,0,0,1],!ql(t,Sa,xa,wa,Nr))?!1:(Ir.crossVectors(Si,xi),t=[Ir.x,Ir.y,Ir.z],ql(t,Sa,xa,wa,Nr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Mn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Mn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(li[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),li[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),li[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),li[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),li[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),li[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),li[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),li[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(li),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const li=[new L,new L,new L,new L,new L,new L,new L,new L],Mn=new L,Lr=new Er,Sa=new L,xa=new L,wa=new L,Si=new L,xi=new L,Wi=new L,As=new L,Nr=new L,Ir=new L,Xi=new L;function ql(n,e,t,i,a){for(let s=0,r=n.length-3;s<=r;s+=3){Xi.fromArray(n,s);const o=a.x*Math.abs(Xi.x)+a.y*Math.abs(Xi.y)+a.z*Math.abs(Xi.z),l=e.dot(Xi),c=t.dot(Xi),u=i.dot(Xi);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const zb=new Er,Rs=new L,Kl=new L;class Tl{constructor(e=new L,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):zb.setFromPoints(e).getCenter(i);let a=0;for(let s=0,r=e.length;s<r;s++)a=Math.max(a,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(a),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Rs.subVectors(e,this.center);const t=Rs.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),a=(i-this.radius)*.5;this.center.addScaledVector(Rs,a/i),this.radius+=a}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Kl.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Rs.copy(e.center).add(Kl)),this.expandByPoint(Rs.copy(e.center).sub(Kl))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const ci=new L,Yl=new L,kr=new L,wi=new L,jl=new L,Dr=new L,Zl=new L;class rf{constructor(e=new L,t=new L(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ci)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=ci.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ci.copy(this.origin).addScaledVector(this.direction,t),ci.distanceToSquared(e))}distanceSqToSegment(e,t,i,a){Yl.copy(e).add(t).multiplyScalar(.5),kr.copy(t).sub(e).normalize(),wi.copy(this.origin).sub(Yl);const s=e.distanceTo(t)*.5,r=-this.direction.dot(kr),o=wi.dot(this.direction),l=-wi.dot(kr),c=wi.lengthSq(),u=Math.abs(1-r*r);let d,f,p,_;if(u>0)if(d=r*l-o,f=r*o-l,_=s*u,d>=0)if(f>=-_)if(f<=_){const g=1/u;d*=g,f*=g,p=d*(d+r*f+2*o)+f*(r*d+f+2*l)+c}else f=s,d=Math.max(0,-(r*f+o)),p=-d*d+f*(f+2*l)+c;else f=-s,d=Math.max(0,-(r*f+o)),p=-d*d+f*(f+2*l)+c;else f<=-_?(d=Math.max(0,-(-r*s+o)),f=d>0?-s:Math.min(Math.max(-s,-l),s),p=-d*d+f*(f+2*l)+c):f<=_?(d=0,f=Math.min(Math.max(-s,-l),s),p=f*(f+2*l)+c):(d=Math.max(0,-(r*s+o)),f=d>0?s:Math.min(Math.max(-s,-l),s),p=-d*d+f*(f+2*l)+c);else f=r>0?-s:s,d=Math.max(0,-(r*f+o)),p=-d*d+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),a&&a.copy(Yl).addScaledVector(kr,f),p}intersectSphere(e,t){ci.subVectors(e.center,this.origin);const i=ci.dot(this.direction),a=ci.dot(ci)-i*i,s=e.radius*e.radius;if(a>s)return null;const r=Math.sqrt(s-a),o=i-r,l=i+r;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,a,s,r,o,l;const c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,f=this.origin;return c>=0?(i=(e.min.x-f.x)*c,a=(e.max.x-f.x)*c):(i=(e.max.x-f.x)*c,a=(e.min.x-f.x)*c),u>=0?(s=(e.min.y-f.y)*u,r=(e.max.y-f.y)*u):(s=(e.max.y-f.y)*u,r=(e.min.y-f.y)*u),i>r||s>a||((s>i||isNaN(i))&&(i=s),(r<a||isNaN(a))&&(a=r),d>=0?(o=(e.min.z-f.z)*d,l=(e.max.z-f.z)*d):(o=(e.max.z-f.z)*d,l=(e.min.z-f.z)*d),i>l||o>a)||((o>i||i!==i)&&(i=o),(l<a||a!==a)&&(a=l),a<0)?null:this.at(i>=0?i:a,t)}intersectsBox(e){return this.intersectBox(e,ci)!==null}intersectTriangle(e,t,i,a,s){jl.subVectors(t,e),Dr.subVectors(i,e),Zl.crossVectors(jl,Dr);let r=this.direction.dot(Zl),o;if(r>0){if(a)return null;o=1}else if(r<0)o=-1,r=-r;else return null;wi.subVectors(this.origin,e);const l=o*this.direction.dot(Dr.crossVectors(wi,Dr));if(l<0)return null;const c=o*this.direction.dot(jl.cross(wi));if(c<0||l+c>r)return null;const u=-o*wi.dot(Zl);return u<0?null:this.at(u/r,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class yt{constructor(e,t,i,a,s,r,o,l,c,u,d,f,p,_,g,m){yt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,a,s,r,o,l,c,u,d,f,p,_,g,m)}set(e,t,i,a,s,r,o,l,c,u,d,f,p,_,g,m){const h=this.elements;return h[0]=e,h[4]=t,h[8]=i,h[12]=a,h[1]=s,h[5]=r,h[9]=o,h[13]=l,h[2]=c,h[6]=u,h[10]=d,h[14]=f,h[3]=p,h[7]=_,h[11]=g,h[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new yt().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,a=1/Ea.setFromMatrixColumn(e,0).length(),s=1/Ea.setFromMatrixColumn(e,1).length(),r=1/Ea.setFromMatrixColumn(e,2).length();return t[0]=i[0]*a,t[1]=i[1]*a,t[2]=i[2]*a,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*r,t[9]=i[9]*r,t[10]=i[10]*r,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,a=e.y,s=e.z,r=Math.cos(i),o=Math.sin(i),l=Math.cos(a),c=Math.sin(a),u=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const f=r*u,p=r*d,_=o*u,g=o*d;t[0]=l*u,t[4]=-l*d,t[8]=c,t[1]=p+_*c,t[5]=f-g*c,t[9]=-o*l,t[2]=g-f*c,t[6]=_+p*c,t[10]=r*l}else if(e.order==="YXZ"){const f=l*u,p=l*d,_=c*u,g=c*d;t[0]=f+g*o,t[4]=_*o-p,t[8]=r*c,t[1]=r*d,t[5]=r*u,t[9]=-o,t[2]=p*o-_,t[6]=g+f*o,t[10]=r*l}else if(e.order==="ZXY"){const f=l*u,p=l*d,_=c*u,g=c*d;t[0]=f-g*o,t[4]=-r*d,t[8]=_+p*o,t[1]=p+_*o,t[5]=r*u,t[9]=g-f*o,t[2]=-r*c,t[6]=o,t[10]=r*l}else if(e.order==="ZYX"){const f=r*u,p=r*d,_=o*u,g=o*d;t[0]=l*u,t[4]=_*c-p,t[8]=f*c+g,t[1]=l*d,t[5]=g*c+f,t[9]=p*c-_,t[2]=-c,t[6]=o*l,t[10]=r*l}else if(e.order==="YZX"){const f=r*l,p=r*c,_=o*l,g=o*c;t[0]=l*u,t[4]=g-f*d,t[8]=_*d+p,t[1]=d,t[5]=r*u,t[9]=-o*u,t[2]=-c*u,t[6]=p*d+_,t[10]=f-g*d}else if(e.order==="XZY"){const f=r*l,p=r*c,_=o*l,g=o*c;t[0]=l*u,t[4]=-d,t[8]=c*u,t[1]=f*d+g,t[5]=r*u,t[9]=p*d-_,t[2]=_*d-p,t[6]=o*u,t[10]=g*d+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Hb,e,Vb)}lookAt(e,t,i){const a=this.elements;return ln.subVectors(e,t),ln.lengthSq()===0&&(ln.z=1),ln.normalize(),Ei.crossVectors(i,ln),Ei.lengthSq()===0&&(Math.abs(i.z)===1?ln.x+=1e-4:ln.z+=1e-4,ln.normalize(),Ei.crossVectors(i,ln)),Ei.normalize(),Fr.crossVectors(ln,Ei),a[0]=Ei.x,a[4]=Fr.x,a[8]=ln.x,a[1]=Ei.y,a[5]=Fr.y,a[9]=ln.y,a[2]=Ei.z,a[6]=Fr.z,a[10]=ln.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,a=t.elements,s=this.elements,r=i[0],o=i[4],l=i[8],c=i[12],u=i[1],d=i[5],f=i[9],p=i[13],_=i[2],g=i[6],m=i[10],h=i[14],y=i[3],x=i[7],b=i[11],A=i[15],M=a[0],T=a[4],C=a[8],v=a[12],S=a[1],R=a[5],I=a[9],U=a[13],B=a[2],G=a[6],z=a[10],X=a[14],V=a[3],ee=a[7],fe=a[11],q=a[15];return s[0]=r*M+o*S+l*B+c*V,s[4]=r*T+o*R+l*G+c*ee,s[8]=r*C+o*I+l*z+c*fe,s[12]=r*v+o*U+l*X+c*q,s[1]=u*M+d*S+f*B+p*V,s[5]=u*T+d*R+f*G+p*ee,s[9]=u*C+d*I+f*z+p*fe,s[13]=u*v+d*U+f*X+p*q,s[2]=_*M+g*S+m*B+h*V,s[6]=_*T+g*R+m*G+h*ee,s[10]=_*C+g*I+m*z+h*fe,s[14]=_*v+g*U+m*X+h*q,s[3]=y*M+x*S+b*B+A*V,s[7]=y*T+x*R+b*G+A*ee,s[11]=y*C+x*I+b*z+A*fe,s[15]=y*v+x*U+b*X+A*q,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],a=e[8],s=e[12],r=e[1],o=e[5],l=e[9],c=e[13],u=e[2],d=e[6],f=e[10],p=e[14],_=e[3],g=e[7],m=e[11],h=e[15];return _*(+s*l*d-a*c*d-s*o*f+i*c*f+a*o*p-i*l*p)+g*(+t*l*p-t*c*f+s*r*f-a*r*p+a*c*u-s*l*u)+m*(+t*c*d-t*o*p-s*r*d+i*r*p+s*o*u-i*c*u)+h*(-a*o*u-t*l*d+t*o*f+a*r*d-i*r*f+i*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const a=this.elements;return e.isVector3?(a[12]=e.x,a[13]=e.y,a[14]=e.z):(a[12]=e,a[13]=t,a[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],a=e[2],s=e[3],r=e[4],o=e[5],l=e[6],c=e[7],u=e[8],d=e[9],f=e[10],p=e[11],_=e[12],g=e[13],m=e[14],h=e[15],y=d*m*c-g*f*c+g*l*p-o*m*p-d*l*h+o*f*h,x=_*f*c-u*m*c-_*l*p+r*m*p+u*l*h-r*f*h,b=u*g*c-_*d*c+_*o*p-r*g*p-u*o*h+r*d*h,A=_*d*l-u*g*l-_*o*f+r*g*f+u*o*m-r*d*m,M=t*y+i*x+a*b+s*A;if(M===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const T=1/M;return e[0]=y*T,e[1]=(g*f*s-d*m*s-g*a*p+i*m*p+d*a*h-i*f*h)*T,e[2]=(o*m*s-g*l*s+g*a*c-i*m*c-o*a*h+i*l*h)*T,e[3]=(d*l*s-o*f*s-d*a*c+i*f*c+o*a*p-i*l*p)*T,e[4]=x*T,e[5]=(u*m*s-_*f*s+_*a*p-t*m*p-u*a*h+t*f*h)*T,e[6]=(_*l*s-r*m*s-_*a*c+t*m*c+r*a*h-t*l*h)*T,e[7]=(r*f*s-u*l*s+u*a*c-t*f*c-r*a*p+t*l*p)*T,e[8]=b*T,e[9]=(_*d*s-u*g*s-_*i*p+t*g*p+u*i*h-t*d*h)*T,e[10]=(r*g*s-_*o*s+_*i*c-t*g*c-r*i*h+t*o*h)*T,e[11]=(u*o*s-r*d*s-u*i*c+t*d*c+r*i*p-t*o*p)*T,e[12]=A*T,e[13]=(u*g*a-_*d*a+_*i*f-t*g*f-u*i*m+t*d*m)*T,e[14]=(_*o*a-r*g*a-_*i*l+t*g*l+r*i*m-t*o*m)*T,e[15]=(r*d*a-u*o*a+u*i*l-t*d*l-r*i*f+t*o*f)*T,this}scale(e){const t=this.elements,i=e.x,a=e.y,s=e.z;return t[0]*=i,t[4]*=a,t[8]*=s,t[1]*=i,t[5]*=a,t[9]*=s,t[2]*=i,t[6]*=a,t[10]*=s,t[3]*=i,t[7]*=a,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],a=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,a))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),a=Math.sin(t),s=1-i,r=e.x,o=e.y,l=e.z,c=s*r,u=s*o;return this.set(c*r+i,c*o-a*l,c*l+a*o,0,c*o+a*l,u*o+i,u*l-a*r,0,c*l-a*o,u*l+a*r,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,a,s,r){return this.set(1,i,s,0,e,1,r,0,t,a,1,0,0,0,0,1),this}compose(e,t,i){const a=this.elements,s=t._x,r=t._y,o=t._z,l=t._w,c=s+s,u=r+r,d=o+o,f=s*c,p=s*u,_=s*d,g=r*u,m=r*d,h=o*d,y=l*c,x=l*u,b=l*d,A=i.x,M=i.y,T=i.z;return a[0]=(1-(g+h))*A,a[1]=(p+b)*A,a[2]=(_-x)*A,a[3]=0,a[4]=(p-b)*M,a[5]=(1-(f+h))*M,a[6]=(m+y)*M,a[7]=0,a[8]=(_+x)*T,a[9]=(m-y)*T,a[10]=(1-(f+g))*T,a[11]=0,a[12]=e.x,a[13]=e.y,a[14]=e.z,a[15]=1,this}decompose(e,t,i){const a=this.elements;let s=Ea.set(a[0],a[1],a[2]).length();const r=Ea.set(a[4],a[5],a[6]).length(),o=Ea.set(a[8],a[9],a[10]).length();this.determinant()<0&&(s=-s),e.x=a[12],e.y=a[13],e.z=a[14],Tn.copy(this);const c=1/s,u=1/r,d=1/o;return Tn.elements[0]*=c,Tn.elements[1]*=c,Tn.elements[2]*=c,Tn.elements[4]*=u,Tn.elements[5]*=u,Tn.elements[6]*=u,Tn.elements[8]*=d,Tn.elements[9]*=d,Tn.elements[10]*=d,t.setFromRotationMatrix(Tn),i.x=s,i.y=r,i.z=o,this}makePerspective(e,t,i,a,s,r,o=Zn,l=!1){const c=this.elements,u=2*s/(t-e),d=2*s/(i-a),f=(t+e)/(t-e),p=(i+a)/(i-a);let _,g;if(l)_=s/(r-s),g=r*s/(r-s);else if(o===Zn)_=-(r+s)/(r-s),g=-2*r*s/(r-s);else if(o===il)_=-r/(r-s),g=-r*s/(r-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=d,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=_,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,a,s,r,o=Zn,l=!1){const c=this.elements,u=2/(t-e),d=2/(i-a),f=-(t+e)/(t-e),p=-(i+a)/(i-a);let _,g;if(l)_=1/(r-s),g=r/(r-s);else if(o===Zn)_=-2/(r-s),g=-(r+s)/(r-s);else if(o===il)_=-1/(r-s),g=-s/(r-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=f,c[1]=0,c[5]=d,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=_,c[14]=g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let a=0;a<16;a++)if(t[a]!==i[a])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Ea=new L,Tn=new yt,Hb=new L(0,0,0),Vb=new L(1,1,1),Ei=new L,Fr=new L,ln=new L,tp=new yt,np=new ii;class Hn{constructor(e=0,t=0,i=0,a=Hn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=a}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,a=this._order){return this._x=e,this._y=t,this._z=i,this._order=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const a=e.elements,s=a[0],r=a[4],o=a[8],l=a[1],c=a[5],u=a[9],d=a[2],f=a[6],p=a[10];switch(t){case"XYZ":this._y=Math.asin(qe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-r,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-qe(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(qe(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-r,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-qe(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-r,c));break;case"YZX":this._z=Math.asin(qe(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-qe(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return tp.makeRotationFromQuaternion(e),this.setFromRotationMatrix(tp,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return np.setFromEuler(this),this.setFromQuaternion(np,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Hn.DEFAULT_ORDER="XYZ";class tg{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Gb=0;const ip=new L,Ma=new ii,ui=new yt,Or=new L,Ps=new L,$b=new L,Wb=new ii,ap=new L(1,0,0),sp=new L(0,1,0),rp=new L(0,0,1),op={type:"added"},Xb={type:"removed"},Ta={type:"childadded",child:null},Jl={type:"childremoved",child:null};class Lt extends ma{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Gb++}),this.uuid=Qn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Lt.DEFAULT_UP.clone();const e=new L,t=new Hn,i=new ii,a=new L(1,1,1);function s(){i.setFromEuler(t,!1)}function r(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:a},modelViewMatrix:{value:new yt},normalMatrix:{value:new $e}}),this.matrix=new yt,this.matrixWorld=new yt,this.matrixAutoUpdate=Lt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Lt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new tg,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ma.setFromAxisAngle(e,t),this.quaternion.multiply(Ma),this}rotateOnWorldAxis(e,t){return Ma.setFromAxisAngle(e,t),this.quaternion.premultiply(Ma),this}rotateX(e){return this.rotateOnAxis(ap,e)}rotateY(e){return this.rotateOnAxis(sp,e)}rotateZ(e){return this.rotateOnAxis(rp,e)}translateOnAxis(e,t){return ip.copy(e).applyQuaternion(this.quaternion),this.position.add(ip.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ap,e)}translateY(e){return this.translateOnAxis(sp,e)}translateZ(e){return this.translateOnAxis(rp,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ui.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Or.copy(e):Or.set(e,t,i);const a=this.parent;this.updateWorldMatrix(!0,!1),Ps.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ui.lookAt(Ps,Or,this.up):ui.lookAt(Or,Ps,this.up),this.quaternion.setFromRotationMatrix(ui),a&&(ui.extractRotation(a.matrixWorld),Ma.setFromRotationMatrix(ui),this.quaternion.premultiply(Ma.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(op),Ta.child=e,this.dispatchEvent(Ta),Ta.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Xb),Jl.child=e,this.dispatchEvent(Jl),Jl.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ui.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ui.multiply(e.parent.matrixWorld)),e.applyMatrix4(ui),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(op),Ta.child=e,this.dispatchEvent(Ta),Ta.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,a=this.children.length;i<a;i++){const r=this.children[i].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const a=this.children;for(let s=0,r=a.length;s<r;s++)a[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ps,e,$b),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ps,Wb,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,a=t.length;i<a;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,a=t.length;i<a;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,a=t.length;i<a;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const a=this.children;for(let s=0,r=a.length;s<r;s++)a[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const a={};a.uuid=this.uuid,a.type=this.type,this.name!==""&&(a.name=this.name),this.castShadow===!0&&(a.castShadow=!0),this.receiveShadow===!0&&(a.receiveShadow=!0),this.visible===!1&&(a.visible=!1),this.frustumCulled===!1&&(a.frustumCulled=!1),this.renderOrder!==0&&(a.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(a.userData=this.userData),a.layers=this.layers.mask,a.matrix=this.matrix.toArray(),a.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(a.matrixAutoUpdate=!1),this.isInstancedMesh&&(a.type="InstancedMesh",a.count=this.count,a.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(a.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(a.type="BatchedMesh",a.perObjectFrustumCulled=this.perObjectFrustumCulled,a.sortObjects=this.sortObjects,a.drawRanges=this._drawRanges,a.reservedRanges=this._reservedRanges,a.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),a.instanceInfo=this._instanceInfo.map(o=>({...o})),a.availableInstanceIds=this._availableInstanceIds.slice(),a.availableGeometryIds=this._availableGeometryIds.slice(),a.nextIndexStart=this._nextIndexStart,a.nextVertexStart=this._nextVertexStart,a.geometryCount=this._geometryCount,a.maxInstanceCount=this._maxInstanceCount,a.maxVertexCount=this._maxVertexCount,a.maxIndexCount=this._maxIndexCount,a.geometryInitialized=this._geometryInitialized,a.matricesTexture=this._matricesTexture.toJSON(e),a.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(a.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(a.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(a.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?a.background=this.background.toJSON():this.background.isTexture&&(a.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(a.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){a.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const d=l[c];s(e.shapes,d)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(a.bindMode=this.bindMode,a.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),a.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));a.material=o}else a.material=s(e.materials,this.material);if(this.children.length>0){a.children=[];for(let o=0;o<this.children.length;o++)a.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){a.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];a.animations.push(s(e.animations,l))}}if(t){const o=r(e.geometries),l=r(e.materials),c=r(e.textures),u=r(e.images),d=r(e.shapes),f=r(e.skeletons),p=r(e.animations),_=r(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),d.length>0&&(i.shapes=d),f.length>0&&(i.skeletons=f),p.length>0&&(i.animations=p),_.length>0&&(i.nodes=_)}return i.object=a,i;function r(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const a=e.children[i];this.add(a.clone())}return this}}Lt.DEFAULT_UP=new L(0,1,0);Lt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Lt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Cn=new L,di=new L,Ql=new L,fi=new L,Ca=new L,Aa=new L,lp=new L,ec=new L,tc=new L,nc=new L,ic=new Mt,ac=new Mt,sc=new Mt;class dn{constructor(e=new L,t=new L,i=new L){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,a){a.subVectors(i,t),Cn.subVectors(e,t),a.cross(Cn);const s=a.lengthSq();return s>0?a.multiplyScalar(1/Math.sqrt(s)):a.set(0,0,0)}static getBarycoord(e,t,i,a,s){Cn.subVectors(a,t),di.subVectors(i,t),Ql.subVectors(e,t);const r=Cn.dot(Cn),o=Cn.dot(di),l=Cn.dot(Ql),c=di.dot(di),u=di.dot(Ql),d=r*c-o*o;if(d===0)return s.set(0,0,0),null;const f=1/d,p=(c*l-o*u)*f,_=(r*u-o*l)*f;return s.set(1-p-_,_,p)}static containsPoint(e,t,i,a){return this.getBarycoord(e,t,i,a,fi)===null?!1:fi.x>=0&&fi.y>=0&&fi.x+fi.y<=1}static getInterpolation(e,t,i,a,s,r,o,l){return this.getBarycoord(e,t,i,a,fi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,fi.x),l.addScaledVector(r,fi.y),l.addScaledVector(o,fi.z),l)}static getInterpolatedAttribute(e,t,i,a,s,r){return ic.setScalar(0),ac.setScalar(0),sc.setScalar(0),ic.fromBufferAttribute(e,t),ac.fromBufferAttribute(e,i),sc.fromBufferAttribute(e,a),r.setScalar(0),r.addScaledVector(ic,s.x),r.addScaledVector(ac,s.y),r.addScaledVector(sc,s.z),r}static isFrontFacing(e,t,i,a){return Cn.subVectors(i,t),di.subVectors(e,t),Cn.cross(di).dot(a)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,a){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[a]),this}setFromAttributeAndIndices(e,t,i,a){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,a),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Cn.subVectors(this.c,this.b),di.subVectors(this.a,this.b),Cn.cross(di).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return dn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return dn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,a,s){return dn.getInterpolation(e,this.a,this.b,this.c,t,i,a,s)}containsPoint(e){return dn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return dn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,a=this.b,s=this.c;let r,o;Ca.subVectors(a,i),Aa.subVectors(s,i),ec.subVectors(e,i);const l=Ca.dot(ec),c=Aa.dot(ec);if(l<=0&&c<=0)return t.copy(i);tc.subVectors(e,a);const u=Ca.dot(tc),d=Aa.dot(tc);if(u>=0&&d<=u)return t.copy(a);const f=l*d-u*c;if(f<=0&&l>=0&&u<=0)return r=l/(l-u),t.copy(i).addScaledVector(Ca,r);nc.subVectors(e,s);const p=Ca.dot(nc),_=Aa.dot(nc);if(_>=0&&p<=_)return t.copy(s);const g=p*c-l*_;if(g<=0&&c>=0&&_<=0)return o=c/(c-_),t.copy(i).addScaledVector(Aa,o);const m=u*_-p*d;if(m<=0&&d-u>=0&&p-_>=0)return lp.subVectors(s,a),o=(d-u)/(d-u+(p-_)),t.copy(a).addScaledVector(lp,o);const h=1/(m+g+f);return r=g*h,o=f*h,t.copy(i).addScaledVector(Ca,r).addScaledVector(Aa,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const ng={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Mi={h:0,s:0,l:0},Ur={h:0,s:0,l:0};function rc(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Ye{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const a=e;a&&a.isColor?this.copy(a):typeof a=="number"?this.setHex(a):typeof a=="string"&&this.setStyle(a)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=$t){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Qe.colorSpaceToWorking(this,t),this}setRGB(e,t,i,a=Qe.workingColorSpace){return this.r=e,this.g=t,this.b=i,Qe.colorSpaceToWorking(this,a),this}setHSL(e,t,i,a=Qe.workingColorSpace){if(e=af(e,1),t=qe(t,0,1),i=qe(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,r=2*i-s;this.r=rc(r,s,e+1/3),this.g=rc(r,s,e),this.b=rc(r,s,e-1/3)}return Qe.colorSpaceToWorking(this,a),this}setStyle(e,t=$t){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let a;if(a=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const r=a[1],o=a[2];switch(r){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(a=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=a[1],r=s.length;if(r===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(r===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=$t){const i=ng[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=yi(e.r),this.g=yi(e.g),this.b=yi(e.b),this}copyLinearToSRGB(e){return this.r=Qa(e.r),this.g=Qa(e.g),this.b=Qa(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=$t){return Qe.workingToColorSpace(Gt.copy(this),e),Math.round(qe(Gt.r*255,0,255))*65536+Math.round(qe(Gt.g*255,0,255))*256+Math.round(qe(Gt.b*255,0,255))}getHexString(e=$t){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Qe.workingColorSpace){Qe.workingToColorSpace(Gt.copy(this),t);const i=Gt.r,a=Gt.g,s=Gt.b,r=Math.max(i,a,s),o=Math.min(i,a,s);let l,c;const u=(o+r)/2;if(o===r)l=0,c=0;else{const d=r-o;switch(c=u<=.5?d/(r+o):d/(2-r-o),r){case i:l=(a-s)/d+(a<s?6:0);break;case a:l=(s-i)/d+2;break;case s:l=(i-a)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=Qe.workingColorSpace){return Qe.workingToColorSpace(Gt.copy(this),t),e.r=Gt.r,e.g=Gt.g,e.b=Gt.b,e}getStyle(e=$t){Qe.workingToColorSpace(Gt.copy(this),e);const t=Gt.r,i=Gt.g,a=Gt.b;return e!==$t?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${a.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(a*255)})`}offsetHSL(e,t,i){return this.getHSL(Mi),this.setHSL(Mi.h+e,Mi.s+t,Mi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Mi),e.getHSL(Ur);const i=Ks(Mi.h,Ur.h,t),a=Ks(Mi.s,Ur.s,t),s=Ks(Mi.l,Ur.l,t);return this.setHSL(i,a,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,a=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*a,this.g=s[1]*t+s[4]*i+s[7]*a,this.b=s[2]*t+s[5]*i+s[8]*a,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Gt=new Ye;Ye.NAMES=ng;let qb=0;class bi extends ma{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:qb++}),this.uuid=Qn(),this.name="",this.type="Material",this.blending=Za,this.side=Bi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=pu,this.blendDst=hu,this.blendEquation=ia,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ye(0,0,0),this.blendAlpha=0,this.depthFunc=fs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Kf,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ya,this.stencilZFail=ya,this.stencilZPass=ya,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const a=this[t];if(a===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}a&&a.isColor?a.set(i):a&&a.isVector3&&i&&i.isVector3?a.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Za&&(i.blending=this.blending),this.side!==Bi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==pu&&(i.blendSrc=this.blendSrc),this.blendDst!==hu&&(i.blendDst=this.blendDst),this.blendEquation!==ia&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==fs&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Kf&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ya&&(i.stencilFail=this.stencilFail),this.stencilZFail!==ya&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==ya&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function a(s){const r=[];for(const o in s){const l=s[o];delete l.metadata,r.push(l)}return r}if(t){const s=a(e.textures),r=a(e.images);s.length>0&&(i.textures=s),r.length>0&&(i.images=r)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const a=t.length;i=new Array(a);for(let s=0;s!==a;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class ct extends bi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ye(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Hn,this.combine=El,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const At=new L,Br=new le;let Kb=0;class zn{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Kb++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=ed,this.updateRanges=[],this.gpuType=vi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let a=0,s=this.itemSize;a<s;a++)this.array[e+a]=t.array[i+a];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Br.fromBufferAttribute(this,t),Br.applyMatrix3(e),this.setXY(t,Br.x,Br.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)At.fromBufferAttribute(this,t),At.applyMatrix3(e),this.setXYZ(t,At.x,At.y,At.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)At.fromBufferAttribute(this,t),At.applyMatrix4(e),this.setXYZ(t,At.x,At.y,At.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)At.fromBufferAttribute(this,t),At.applyNormalMatrix(e),this.setXYZ(t,At.x,At.y,At.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)At.fromBufferAttribute(this,t),At.transformDirection(e),this.setXYZ(t,At.x,At.y,At.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Fn(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=nt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Fn(t,this.array)),t}setX(e,t){return this.normalized&&(t=nt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Fn(t,this.array)),t}setY(e,t){return this.normalized&&(t=nt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Fn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=nt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Fn(t,this.array)),t}setW(e,t){return this.normalized&&(t=nt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=nt(t,this.array),i=nt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,a){return e*=this.itemSize,this.normalized&&(t=nt(t,this.array),i=nt(i,this.array),a=nt(a,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=a,this}setXYZW(e,t,i,a,s){return e*=this.itemSize,this.normalized&&(t=nt(t,this.array),i=nt(i,this.array),a=nt(a,this.array),s=nt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=a,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==ed&&(e.usage=this.usage),e}}class ig extends zn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class ag extends zn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class it extends zn{constructor(e,t,i){super(new Float32Array(e),t,i)}}let Yb=0;const vn=new yt,oc=new Lt,Ra=new L,cn=new Er,Ls=new Er,Ot=new L;class Dt extends ma{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Yb++}),this.uuid=Qn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Q_(e)?ag:ig)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new $e().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const a=this.attributes.tangent;return a!==void 0&&(a.transformDirection(e),a.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return vn.makeRotationFromQuaternion(e),this.applyMatrix4(vn),this}rotateX(e){return vn.makeRotationX(e),this.applyMatrix4(vn),this}rotateY(e){return vn.makeRotationY(e),this.applyMatrix4(vn),this}rotateZ(e){return vn.makeRotationZ(e),this.applyMatrix4(vn),this}translate(e,t,i){return vn.makeTranslation(e,t,i),this.applyMatrix4(vn),this}scale(e,t,i){return vn.makeScale(e,t,i),this.applyMatrix4(vn),this}lookAt(e){return oc.lookAt(e),oc.updateMatrix(),this.applyMatrix4(oc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ra).negate(),this.translate(Ra.x,Ra.y,Ra.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let a=0,s=e.length;a<s;a++){const r=e[a];i.push(r.x,r.y,r.z||0)}this.setAttribute("position",new it(i,3))}else{const i=Math.min(e.length,t.count);for(let a=0;a<i;a++){const s=e[a];t.setXYZ(a,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Er);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,a=t.length;i<a;i++){const s=t[i];cn.setFromBufferAttribute(s),this.morphTargetsRelative?(Ot.addVectors(this.boundingBox.min,cn.min),this.boundingBox.expandByPoint(Ot),Ot.addVectors(this.boundingBox.max,cn.max),this.boundingBox.expandByPoint(Ot)):(this.boundingBox.expandByPoint(cn.min),this.boundingBox.expandByPoint(cn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Tl);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(e){const i=this.boundingSphere.center;if(cn.setFromBufferAttribute(e),t)for(let s=0,r=t.length;s<r;s++){const o=t[s];Ls.setFromBufferAttribute(o),this.morphTargetsRelative?(Ot.addVectors(cn.min,Ls.min),cn.expandByPoint(Ot),Ot.addVectors(cn.max,Ls.max),cn.expandByPoint(Ot)):(cn.expandByPoint(Ls.min),cn.expandByPoint(Ls.max))}cn.getCenter(i);let a=0;for(let s=0,r=e.count;s<r;s++)Ot.fromBufferAttribute(e,s),a=Math.max(a,i.distanceToSquared(Ot));if(t)for(let s=0,r=t.length;s<r;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Ot.fromBufferAttribute(o,c),l&&(Ra.fromBufferAttribute(e,c),Ot.add(Ra)),a=Math.max(a,i.distanceToSquared(Ot))}this.boundingSphere.radius=Math.sqrt(a),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,a=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new zn(new Float32Array(4*i.count),4));const r=this.getAttribute("tangent"),o=[],l=[];for(let C=0;C<i.count;C++)o[C]=new L,l[C]=new L;const c=new L,u=new L,d=new L,f=new le,p=new le,_=new le,g=new L,m=new L;function h(C,v,S){c.fromBufferAttribute(i,C),u.fromBufferAttribute(i,v),d.fromBufferAttribute(i,S),f.fromBufferAttribute(s,C),p.fromBufferAttribute(s,v),_.fromBufferAttribute(s,S),u.sub(c),d.sub(c),p.sub(f),_.sub(f);const R=1/(p.x*_.y-_.x*p.y);isFinite(R)&&(g.copy(u).multiplyScalar(_.y).addScaledVector(d,-p.y).multiplyScalar(R),m.copy(d).multiplyScalar(p.x).addScaledVector(u,-_.x).multiplyScalar(R),o[C].add(g),o[v].add(g),o[S].add(g),l[C].add(m),l[v].add(m),l[S].add(m))}let y=this.groups;y.length===0&&(y=[{start:0,count:e.count}]);for(let C=0,v=y.length;C<v;++C){const S=y[C],R=S.start,I=S.count;for(let U=R,B=R+I;U<B;U+=3)h(e.getX(U+0),e.getX(U+1),e.getX(U+2))}const x=new L,b=new L,A=new L,M=new L;function T(C){A.fromBufferAttribute(a,C),M.copy(A);const v=o[C];x.copy(v),x.sub(A.multiplyScalar(A.dot(v))).normalize(),b.crossVectors(M,v);const R=b.dot(l[C])<0?-1:1;r.setXYZW(C,x.x,x.y,x.z,R)}for(let C=0,v=y.length;C<v;++C){const S=y[C],R=S.start,I=S.count;for(let U=R,B=R+I;U<B;U+=3)T(e.getX(U+0)),T(e.getX(U+1)),T(e.getX(U+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new zn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let f=0,p=i.count;f<p;f++)i.setXYZ(f,0,0,0);const a=new L,s=new L,r=new L,o=new L,l=new L,c=new L,u=new L,d=new L;if(e)for(let f=0,p=e.count;f<p;f+=3){const _=e.getX(f+0),g=e.getX(f+1),m=e.getX(f+2);a.fromBufferAttribute(t,_),s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,m),u.subVectors(r,s),d.subVectors(a,s),u.cross(d),o.fromBufferAttribute(i,_),l.fromBufferAttribute(i,g),c.fromBufferAttribute(i,m),o.add(u),l.add(u),c.add(u),i.setXYZ(_,o.x,o.y,o.z),i.setXYZ(g,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,p=t.count;f<p;f+=3)a.fromBufferAttribute(t,f+0),s.fromBufferAttribute(t,f+1),r.fromBufferAttribute(t,f+2),u.subVectors(r,s),d.subVectors(a,s),u.cross(d),i.setXYZ(f+0,u.x,u.y,u.z),i.setXYZ(f+1,u.x,u.y,u.z),i.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Ot.fromBufferAttribute(e,t),Ot.normalize(),e.setXYZ(t,Ot.x,Ot.y,Ot.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,d=o.normalized,f=new c.constructor(l.length*u);let p=0,_=0;for(let g=0,m=l.length;g<m;g++){o.isInterleavedBufferAttribute?p=l[g]*o.data.stride+o.offset:p=l[g]*u;for(let h=0;h<u;h++)f[_++]=c[p++]}return new zn(f,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Dt,i=this.index.array,a=this.attributes;for(const o in a){const l=a[o],c=e(l,i);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let u=0,d=c.length;u<d;u++){const f=c[u],p=e(f,i);l.push(p)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const r=this.groups;for(let o=0,l=r.length;o<l;o++){const c=r[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const a={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let d=0,f=c.length;d<f;d++){const p=c[d];u.push(p.toJSON(e.data))}u.length>0&&(a[l]=u,s=!0)}s&&(e.data.morphAttributes=a,e.data.morphTargetsRelative=this.morphTargetsRelative);const r=this.groups;r.length>0&&(e.data.groups=JSON.parse(JSON.stringify(r)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const a=e.attributes;for(const c in a){const u=a[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],d=s[c];for(let f=0,p=d.length;f<p;f++)u.push(d[f].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const r=e.groups;for(let c=0,u=r.length;c<u;c++){const d=r[c];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const cp=new yt,qi=new rf,zr=new Tl,up=new L,Hr=new L,Vr=new L,Gr=new L,lc=new L,$r=new L,dp=new L,Wr=new L;class ze extends Lt{constructor(e=new Dt,t=new ct){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const a=t[i[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=a.length;s<r;s++){const o=a[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const i=this.geometry,a=i.attributes.position,s=i.morphAttributes.position,r=i.morphTargetsRelative;t.fromBufferAttribute(a,e);const o=this.morphTargetInfluences;if(s&&o){$r.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=o[l],d=s[l];u!==0&&(lc.fromBufferAttribute(d,e),r?$r.addScaledVector(lc,u):$r.addScaledVector(lc.sub(t),u))}t.add($r)}return t}raycast(e,t){const i=this.geometry,a=this.material,s=this.matrixWorld;a!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),zr.copy(i.boundingSphere),zr.applyMatrix4(s),qi.copy(e.ray).recast(e.near),!(zr.containsPoint(qi.origin)===!1&&(qi.intersectSphere(zr,up)===null||qi.origin.distanceToSquared(up)>(e.far-e.near)**2))&&(cp.copy(s).invert(),qi.copy(e.ray).applyMatrix4(cp),!(i.boundingBox!==null&&qi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,qi)))}_computeIntersections(e,t,i){let a;const s=this.geometry,r=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,d=s.attributes.normal,f=s.groups,p=s.drawRange;if(o!==null)if(Array.isArray(r))for(let _=0,g=f.length;_<g;_++){const m=f[_],h=r[m.materialIndex],y=Math.max(m.start,p.start),x=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let b=y,A=x;b<A;b+=3){const M=o.getX(b),T=o.getX(b+1),C=o.getX(b+2);a=Xr(this,h,e,i,c,u,d,M,T,C),a&&(a.faceIndex=Math.floor(b/3),a.face.materialIndex=m.materialIndex,t.push(a))}}else{const _=Math.max(0,p.start),g=Math.min(o.count,p.start+p.count);for(let m=_,h=g;m<h;m+=3){const y=o.getX(m),x=o.getX(m+1),b=o.getX(m+2);a=Xr(this,r,e,i,c,u,d,y,x,b),a&&(a.faceIndex=Math.floor(m/3),t.push(a))}}else if(l!==void 0)if(Array.isArray(r))for(let _=0,g=f.length;_<g;_++){const m=f[_],h=r[m.materialIndex],y=Math.max(m.start,p.start),x=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let b=y,A=x;b<A;b+=3){const M=b,T=b+1,C=b+2;a=Xr(this,h,e,i,c,u,d,M,T,C),a&&(a.faceIndex=Math.floor(b/3),a.face.materialIndex=m.materialIndex,t.push(a))}}else{const _=Math.max(0,p.start),g=Math.min(l.count,p.start+p.count);for(let m=_,h=g;m<h;m+=3){const y=m,x=m+1,b=m+2;a=Xr(this,r,e,i,c,u,d,y,x,b),a&&(a.faceIndex=Math.floor(m/3),t.push(a))}}}}function jb(n,e,t,i,a,s,r,o){let l;if(e.side===sn?l=i.intersectTriangle(r,s,a,!0,o):l=i.intersectTriangle(a,s,r,e.side===Bi,o),l===null)return null;Wr.copy(o),Wr.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(Wr);return c<t.near||c>t.far?null:{distance:c,point:Wr.clone(),object:n}}function Xr(n,e,t,i,a,s,r,o,l,c){n.getVertexPosition(o,Hr),n.getVertexPosition(l,Vr),n.getVertexPosition(c,Gr);const u=jb(n,e,t,i,Hr,Vr,Gr,dp);if(u){const d=new L;dn.getBarycoord(dp,Hr,Vr,Gr,d),a&&(u.uv=dn.getInterpolatedAttribute(a,o,l,c,d,new le)),s&&(u.uv1=dn.getInterpolatedAttribute(s,o,l,c,d,new le)),r&&(u.normal=dn.getInterpolatedAttribute(r,o,l,c,d,new L),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const f={a:o,b:l,c,normal:new L,materialIndex:0};dn.getNormal(Hr,Vr,Gr,f.normal),u.face=f,u.barycoord=d}return u}class xn extends Dt{constructor(e=1,t=1,i=1,a=1,s=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:a,heightSegments:s,depthSegments:r};const o=this;a=Math.floor(a),s=Math.floor(s),r=Math.floor(r);const l=[],c=[],u=[],d=[];let f=0,p=0;_("z","y","x",-1,-1,i,t,e,r,s,0),_("z","y","x",1,-1,i,t,-e,r,s,1),_("x","z","y",1,1,e,i,t,a,r,2),_("x","z","y",1,-1,e,i,-t,a,r,3),_("x","y","z",1,-1,e,t,i,a,s,4),_("x","y","z",-1,-1,e,t,-i,a,s,5),this.setIndex(l),this.setAttribute("position",new it(c,3)),this.setAttribute("normal",new it(u,3)),this.setAttribute("uv",new it(d,2));function _(g,m,h,y,x,b,A,M,T,C,v){const S=b/T,R=A/C,I=b/2,U=A/2,B=M/2,G=T+1,z=C+1;let X=0,V=0;const ee=new L;for(let fe=0;fe<z;fe++){const q=fe*R-U;for(let ue=0;ue<G;ue++){const xe=ue*S-I;ee[g]=xe*y,ee[m]=q*x,ee[h]=B,c.push(ee.x,ee.y,ee.z),ee[g]=0,ee[m]=0,ee[h]=M>0?1:-1,u.push(ee.x,ee.y,ee.z),d.push(ue/T),d.push(1-fe/C),X+=1}}for(let fe=0;fe<C;fe++)for(let q=0;q<T;q++){const ue=f+q+G*fe,xe=f+q+G*(fe+1),ye=f+(q+1)+G*(fe+1),he=f+(q+1)+G*fe;l.push(ue,xe,he),l.push(xe,ye,he),V+=6}o.addGroup(p,V,v),p+=V,f+=X}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new xn(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function _s(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const a=n[t][i];a&&(a.isColor||a.isMatrix3||a.isMatrix4||a.isVector2||a.isVector3||a.isVector4||a.isTexture||a.isQuaternion)?a.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=a.clone():Array.isArray(a)?e[t][i]=a.slice():e[t][i]=a}}return e}function Kt(n){const e={};for(let t=0;t<n.length;t++){const i=_s(n[t]);for(const a in i)e[a]=i[a]}return e}function Zb(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function sg(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Qe.workingColorSpace}const Jb={clone:_s,merge:Kt};var Qb=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,eS=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class zi extends bi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Qb,this.fragmentShader=eS,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=_s(e.uniforms),this.uniformsGroups=Zb(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const a in this.uniforms){const r=this.uniforms[a].value;r&&r.isTexture?t.uniforms[a]={type:"t",value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[a]={type:"c",value:r.getHex()}:r&&r.isVector2?t.uniforms[a]={type:"v2",value:r.toArray()}:r&&r.isVector3?t.uniforms[a]={type:"v3",value:r.toArray()}:r&&r.isVector4?t.uniforms[a]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?t.uniforms[a]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?t.uniforms[a]={type:"m4",value:r.toArray()}:t.uniforms[a]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const a in this.extensions)this.extensions[a]===!0&&(i[a]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class rg extends Lt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new yt,this.projectionMatrix=new yt,this.projectionMatrixInverse=new yt,this.coordinateSystem=Zn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Ti=new L,fp=new le,pp=new le;class bn extends rg{constructor(e=50,t=1,i=.1,a=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=a,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=or*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ja*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return or*2*Math.atan(Math.tan(Ja*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Ti.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ti.x,Ti.y).multiplyScalar(-e/Ti.z),Ti.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Ti.x,Ti.y).multiplyScalar(-e/Ti.z)}getViewSize(e,t){return this.getViewBounds(e,fp,pp),t.subVectors(pp,fp)}setViewOffset(e,t,i,a,s,r){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=a,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Ja*.5*this.fov)/this.zoom,i=2*t,a=this.aspect*i,s=-.5*a;const r=this.view;if(this.view!==null&&this.view.enabled){const l=r.fullWidth,c=r.fullHeight;s+=r.offsetX*a/l,t-=r.offsetY*i/c,a*=r.width/l,i*=r.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+a,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Pa=-90,La=1;class tS extends Lt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const a=new bn(Pa,La,e,t);a.layers=this.layers,this.add(a);const s=new bn(Pa,La,e,t);s.layers=this.layers,this.add(s);const r=new bn(Pa,La,e,t);r.layers=this.layers,this.add(r);const o=new bn(Pa,La,e,t);o.layers=this.layers,this.add(o);const l=new bn(Pa,La,e,t);l.layers=this.layers,this.add(l);const c=new bn(Pa,La,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,a,s,r,o,l]=t;for(const c of t)this.remove(c);if(e===Zn)i.up.set(0,1,0),i.lookAt(1,0,0),a.up.set(0,1,0),a.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===il)i.up.set(0,-1,0),i.lookAt(-1,0,0),a.up.set(0,-1,0),a.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:a}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,r,o,l,c,u]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const g=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,a),e.render(t,s),e.setRenderTarget(i,1,a),e.render(t,r),e.setRenderTarget(i,2,a),e.render(t,o),e.setRenderTarget(i,3,a),e.render(t,l),e.setRenderTarget(i,4,a),e.render(t,c),i.texture.generateMipmaps=g,e.setRenderTarget(i,5,a),e.render(t,u),e.setRenderTarget(d,f,p),e.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class og extends jt{constructor(e=[],t=ps,i,a,s,r,o,l,c,u){super(e,t,i,a,s,r,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class nS extends pa{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},a=[i,i,i,i,i,i];this.texture=new og(a),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},a=new xn(5,5,5),s=new zi({name:"CubemapFromEquirect",uniforms:_s(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:sn,blending:ki});s.uniforms.tEquirect.value=t;const r=new ze(a,s),o=t.minFilter;return t.minFilter===ca&&(t.minFilter=jn),new tS(1,10,this).update(e,r),t.minFilter=o,r.geometry.dispose(),r.material.dispose(),this}clear(e,t=!0,i=!0,a=!0){const s=e.getRenderTarget();for(let r=0;r<6;r++)e.setRenderTarget(this,r),e.clear(t,i,a);e.setRenderTarget(s)}}class pt extends Lt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const iS={type:"move"};class cc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new pt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new pt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new pt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let a=null,s=null,r=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){r=!0;for(const g of e.hand.values()){const m=t.getJointPose(g,i),h=this._getHandJoint(c,g);m!==null&&(h.matrix.fromArray(m.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=m.radius),h.visible=m!==null}const u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],f=u.position.distanceTo(d.position),p=.02,_=.005;c.inputState.pinching&&f>p+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=p-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(a=t.getPose(e.targetRaySpace,i),a===null&&s!==null&&(a=s),a!==null&&(o.matrix.fromArray(a.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,a.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(a.linearVelocity)):o.hasLinearVelocity=!1,a.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(a.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(iS)))}return o!==null&&(o.visible=a!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=r!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new pt;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class aS extends Lt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Hn,this.environmentIntensity=1,this.environmentRotation=new Hn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class sS{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=ed,this.updateRanges=[],this.version=0,this.uuid=Qn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let a=0,s=this.stride;a<s;a++)this.array[e+a]=t.array[i+a];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Qn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Qn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const qt=new L;class sl{constructor(e,t,i,a=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=a}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)qt.fromBufferAttribute(this,t),qt.applyMatrix4(e),this.setXYZ(t,qt.x,qt.y,qt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)qt.fromBufferAttribute(this,t),qt.applyNormalMatrix(e),this.setXYZ(t,qt.x,qt.y,qt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)qt.fromBufferAttribute(this,t),qt.transformDirection(e),this.setXYZ(t,qt.x,qt.y,qt.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=Fn(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=nt(i,this.array)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=nt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=nt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=nt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=nt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Fn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Fn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Fn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Fn(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=nt(t,this.array),i=nt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,a){return e=e*this.data.stride+this.offset,this.normalized&&(t=nt(t,this.array),i=nt(i,this.array),a=nt(a,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=a,this}setXYZW(e,t,i,a,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=nt(t,this.array),i=nt(i,this.array),a=nt(a,this.array),s=nt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=a,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const a=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[a+s])}return new zn(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new sl(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const a=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[a+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class lg extends bi{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Ye(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Na;const Ns=new L,Ia=new L,ka=new L,Da=new le,Is=new le,cg=new yt,qr=new L,ks=new L,Kr=new L,hp=new le,uc=new le,mp=new le;class ug extends Lt{constructor(e=new lg){if(super(),this.isSprite=!0,this.type="Sprite",Na===void 0){Na=new Dt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new sS(t,5);Na.setIndex([0,1,2,0,2,3]),Na.setAttribute("position",new sl(i,3,0,!1)),Na.setAttribute("uv",new sl(i,2,3,!1))}this.geometry=Na,this.material=e,this.center=new le(.5,.5),this.count=1}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Ia.setFromMatrixScale(this.matrixWorld),cg.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),ka.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Ia.multiplyScalar(-ka.z);const i=this.material.rotation;let a,s;i!==0&&(s=Math.cos(i),a=Math.sin(i));const r=this.center;Yr(qr.set(-.5,-.5,0),ka,r,Ia,a,s),Yr(ks.set(.5,-.5,0),ka,r,Ia,a,s),Yr(Kr.set(.5,.5,0),ka,r,Ia,a,s),hp.set(0,0),uc.set(1,0),mp.set(1,1);let o=e.ray.intersectTriangle(qr,ks,Kr,!1,Ns);if(o===null&&(Yr(ks.set(-.5,.5,0),ka,r,Ia,a,s),uc.set(0,1),o=e.ray.intersectTriangle(qr,Kr,ks,!1,Ns),o===null))return;const l=e.ray.origin.distanceTo(Ns);l<e.near||l>e.far||t.push({distance:l,point:Ns.clone(),uv:dn.getInterpolation(Ns,qr,ks,Kr,hp,uc,mp,new le),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Yr(n,e,t,i,a,s){Da.subVectors(n,t).addScalar(.5).multiply(i),a!==void 0?(Is.x=s*Da.x-a*Da.y,Is.y=a*Da.x+s*Da.y):Is.copy(Da),n.copy(e),n.x+=Is.x,n.y+=Is.y,n.applyMatrix4(cg)}const dc=new L,rS=new L,oS=new $e;class Ai{constructor(e=new L(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,a){return this.normal.set(e,t,i),this.constant=a,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const a=dc.subVectors(i,t).cross(rS.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(a,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(dc),a=this.normal.dot(i);if(a===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/a;return s<0||s>1?null:t.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||oS.getNormalMatrix(e),a=this.coplanarPoint(dc).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-a.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ki=new Tl,lS=new le(.5,.5),jr=new L;class of{constructor(e=new Ai,t=new Ai,i=new Ai,a=new Ai,s=new Ai,r=new Ai){this.planes=[e,t,i,a,s,r]}set(e,t,i,a,s,r){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(a),o[4].copy(s),o[5].copy(r),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Zn,i=!1){const a=this.planes,s=e.elements,r=s[0],o=s[1],l=s[2],c=s[3],u=s[4],d=s[5],f=s[6],p=s[7],_=s[8],g=s[9],m=s[10],h=s[11],y=s[12],x=s[13],b=s[14],A=s[15];if(a[0].setComponents(c-r,p-u,h-_,A-y).normalize(),a[1].setComponents(c+r,p+u,h+_,A+y).normalize(),a[2].setComponents(c+o,p+d,h+g,A+x).normalize(),a[3].setComponents(c-o,p-d,h-g,A-x).normalize(),i)a[4].setComponents(l,f,m,b).normalize(),a[5].setComponents(c-l,p-f,h-m,A-b).normalize();else if(a[4].setComponents(c-l,p-f,h-m,A-b).normalize(),t===Zn)a[5].setComponents(c+l,p+f,h+m,A+b).normalize();else if(t===il)a[5].setComponents(l,f,m,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ki.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ki.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ki)}intersectsSprite(e){Ki.center.set(0,0,0);const t=lS.distanceTo(e.center);return Ki.radius=.7071067811865476+t,Ki.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ki)}intersectsSphere(e){const t=this.planes,i=e.center,a=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<a)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const a=t[i];if(jr.x=a.normal.x>0?e.max.x:e.min.x,jr.y=a.normal.y>0?e.max.y:e.min.y,jr.z=a.normal.z>0?e.max.z:e.min.z,a.distanceToPoint(jr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Mr extends bi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ye(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const rl=new L,ol=new L,_p=new yt,Ds=new rf,Zr=new Tl,fc=new L,gp=new L;class Cl extends Lt{constructor(e=new Dt,t=new Mr){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let a=1,s=t.count;a<s;a++)rl.fromBufferAttribute(t,a-1),ol.fromBufferAttribute(t,a),i[a]=i[a-1],i[a]+=rl.distanceTo(ol);e.setAttribute("lineDistance",new it(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,a=this.matrixWorld,s=e.params.Line.threshold,r=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Zr.copy(i.boundingSphere),Zr.applyMatrix4(a),Zr.radius+=s,e.ray.intersectsSphere(Zr)===!1)return;_p.copy(a).invert(),Ds.copy(e.ray).applyMatrix4(_p);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,u=i.index,f=i.attributes.position;if(u!==null){const p=Math.max(0,r.start),_=Math.min(u.count,r.start+r.count);for(let g=p,m=_-1;g<m;g+=c){const h=u.getX(g),y=u.getX(g+1),x=Jr(this,e,Ds,l,h,y,g);x&&t.push(x)}if(this.isLineLoop){const g=u.getX(_-1),m=u.getX(p),h=Jr(this,e,Ds,l,g,m,_-1);h&&t.push(h)}}else{const p=Math.max(0,r.start),_=Math.min(f.count,r.start+r.count);for(let g=p,m=_-1;g<m;g+=c){const h=Jr(this,e,Ds,l,g,g+1,g);h&&t.push(h)}if(this.isLineLoop){const g=Jr(this,e,Ds,l,_-1,p,_-1);g&&t.push(g)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const a=t[i[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=a.length;s<r;s++){const o=a[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Jr(n,e,t,i,a,s,r){const o=n.geometry.attributes.position;if(rl.fromBufferAttribute(o,a),ol.fromBufferAttribute(o,s),t.distanceSqToSegment(rl,ol,fc,gp)>i)return;fc.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(fc);if(!(c<e.near||c>e.far))return{distance:c,point:gp.clone().applyMatrix4(n.matrixWorld),index:r,face:null,faceIndex:null,barycoord:null,object:n}}const vp=new L,yp=new L;class cS extends Cl{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let a=0,s=t.count;a<s;a+=2)vp.fromBufferAttribute(t,a),yp.fromBufferAttribute(t,a+1),i[a]=a===0?0:i[a-1],i[a+1]=i[a]+vp.distanceTo(yp);e.setAttribute("lineDistance",new it(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Al extends jt{constructor(e,t,i,a,s,r,o,l,c){super(e,t,i,a,s,r,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class dg extends jt{constructor(e,t,i=fa,a,s,r,o=Bn,l=Bn,c,u=sr,d=1){if(u!==sr&&u!==rr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:e,height:t,depth:d};super(f,a,s,r,o,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new sf(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class fg extends jt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class $a extends Dt{constructor(e=1,t=32,i=0,a=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:a},t=Math.max(3,t);const s=[],r=[],o=[],l=[],c=new L,u=new le;r.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let d=0,f=3;d<=t;d++,f+=3){const p=i+d/t*a;c.x=e*Math.cos(p),c.y=e*Math.sin(p),r.push(c.x,c.y,c.z),o.push(0,0,1),u.x=(r[f]/e+1)/2,u.y=(r[f+1]/e+1)/2,l.push(u.x,u.y)}for(let d=1;d<=t;d++)s.push(d,d+1,0);this.setIndex(s),this.setAttribute("position",new it(r,3)),this.setAttribute("normal",new it(o,3)),this.setAttribute("uv",new it(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new $a(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Rl extends Dt{constructor(e=1,t=1,i=1,a=32,s=1,r=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:a,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:l};const c=this;a=Math.floor(a),s=Math.floor(s);const u=[],d=[],f=[],p=[];let _=0;const g=[],m=i/2;let h=0;y(),r===!1&&(e>0&&x(!0),t>0&&x(!1)),this.setIndex(u),this.setAttribute("position",new it(d,3)),this.setAttribute("normal",new it(f,3)),this.setAttribute("uv",new it(p,2));function y(){const b=new L,A=new L;let M=0;const T=(t-e)/i;for(let C=0;C<=s;C++){const v=[],S=C/s,R=S*(t-e)+e;for(let I=0;I<=a;I++){const U=I/a,B=U*l+o,G=Math.sin(B),z=Math.cos(B);A.x=R*G,A.y=-S*i+m,A.z=R*z,d.push(A.x,A.y,A.z),b.set(G,T,z).normalize(),f.push(b.x,b.y,b.z),p.push(U,1-S),v.push(_++)}g.push(v)}for(let C=0;C<a;C++)for(let v=0;v<s;v++){const S=g[v][C],R=g[v+1][C],I=g[v+1][C+1],U=g[v][C+1];(e>0||v!==0)&&(u.push(S,R,U),M+=3),(t>0||v!==s-1)&&(u.push(R,I,U),M+=3)}c.addGroup(h,M,0),h+=M}function x(b){const A=_,M=new le,T=new L;let C=0;const v=b===!0?e:t,S=b===!0?1:-1;for(let I=1;I<=a;I++)d.push(0,m*S,0),f.push(0,S,0),p.push(.5,.5),_++;const R=_;for(let I=0;I<=a;I++){const B=I/a*l+o,G=Math.cos(B),z=Math.sin(B);T.x=v*z,T.y=m*S,T.z=v*G,d.push(T.x,T.y,T.z),f.push(0,S,0),M.x=G*.5+.5,M.y=z*.5*S+.5,p.push(M.x,M.y),_++}for(let I=0;I<a;I++){const U=A+I,B=R+I;b===!0?u.push(B,B+1,U):u.push(B+1,B,U),C+=3}c.addGroup(h,C,b===!0?1:2),h+=C}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Rl(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class cr extends Rl{constructor(e=1,t=1,i=32,a=1,s=!1,r=0,o=Math.PI*2){super(0,e,t,i,a,s,r,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:a,openEnded:s,thetaStart:r,thetaLength:o}}static fromJSON(e){return new cr(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}const Qr=new L,eo=new L,pc=new L,to=new dn;class uS extends Dt{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const a=Math.pow(10,4),s=Math.cos(Ja*t),r=e.getIndex(),o=e.getAttribute("position"),l=r?r.count:o.count,c=[0,0,0],u=["a","b","c"],d=new Array(3),f={},p=[];for(let _=0;_<l;_+=3){r?(c[0]=r.getX(_),c[1]=r.getX(_+1),c[2]=r.getX(_+2)):(c[0]=_,c[1]=_+1,c[2]=_+2);const{a:g,b:m,c:h}=to;if(g.fromBufferAttribute(o,c[0]),m.fromBufferAttribute(o,c[1]),h.fromBufferAttribute(o,c[2]),to.getNormal(pc),d[0]=`${Math.round(g.x*a)},${Math.round(g.y*a)},${Math.round(g.z*a)}`,d[1]=`${Math.round(m.x*a)},${Math.round(m.y*a)},${Math.round(m.z*a)}`,d[2]=`${Math.round(h.x*a)},${Math.round(h.y*a)},${Math.round(h.z*a)}`,!(d[0]===d[1]||d[1]===d[2]||d[2]===d[0]))for(let y=0;y<3;y++){const x=(y+1)%3,b=d[y],A=d[x],M=to[u[y]],T=to[u[x]],C=`${b}_${A}`,v=`${A}_${b}`;v in f&&f[v]?(pc.dot(f[v].normal)<=s&&(p.push(M.x,M.y,M.z),p.push(T.x,T.y,T.z)),f[v]=null):C in f||(f[C]={index0:c[y],index1:c[x],normal:pc.clone()})}}for(const _ in f)if(f[_]){const{index0:g,index1:m}=f[_];Qr.fromBufferAttribute(o,g),eo.fromBufferAttribute(o,m),p.push(Qr.x,Qr.y,Qr.z),p.push(eo.x,eo.y,eo.z)}this.setAttribute("position",new it(p,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class ai{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){const i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let i,a=this.getPoint(0),s=0;t.push(0);for(let r=1;r<=e;r++)i=this.getPoint(r/e),s+=i.distanceTo(a),t.push(s),a=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const i=this.getLengths();let a=0;const s=i.length;let r;t?r=t:r=e*i[s-1];let o=0,l=s-1,c;for(;o<=l;)if(a=Math.floor(o+(l-o)/2),c=i[a]-r,c<0)o=a+1;else if(c>0)l=a-1;else{l=a;break}if(a=l,i[a]===r)return a/(s-1);const u=i[a],f=i[a+1]-u,p=(r-u)/f;return(a+p)/(s-1)}getTangent(e,t){let a=e-1e-4,s=e+1e-4;a<0&&(a=0),s>1&&(s=1);const r=this.getPoint(a),o=this.getPoint(s),l=t||(r.isVector2?new le:new L);return l.copy(o).sub(r).normalize(),l}getTangentAt(e,t){const i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t=!1){const i=new L,a=[],s=[],r=[],o=new L,l=new yt;for(let p=0;p<=e;p++){const _=p/e;a[p]=this.getTangentAt(_,new L)}s[0]=new L,r[0]=new L;let c=Number.MAX_VALUE;const u=Math.abs(a[0].x),d=Math.abs(a[0].y),f=Math.abs(a[0].z);u<=c&&(c=u,i.set(1,0,0)),d<=c&&(c=d,i.set(0,1,0)),f<=c&&i.set(0,0,1),o.crossVectors(a[0],i).normalize(),s[0].crossVectors(a[0],o),r[0].crossVectors(a[0],s[0]);for(let p=1;p<=e;p++){if(s[p]=s[p-1].clone(),r[p]=r[p-1].clone(),o.crossVectors(a[p-1],a[p]),o.length()>Number.EPSILON){o.normalize();const _=Math.acos(qe(a[p-1].dot(a[p]),-1,1));s[p].applyMatrix4(l.makeRotationAxis(o,_))}r[p].crossVectors(a[p],s[p])}if(t===!0){let p=Math.acos(qe(s[0].dot(s[e]),-1,1));p/=e,a[0].dot(o.crossVectors(s[0],s[e]))>0&&(p=-p);for(let _=1;_<=e;_++)s[_].applyMatrix4(l.makeRotationAxis(a[_],p*_)),r[_].crossVectors(a[_],s[_])}return{tangents:a,normals:s,binormals:r}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class lf extends ai{constructor(e=0,t=0,i=1,a=1,s=0,r=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=a,this.aStartAngle=s,this.aEndAngle=r,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new le){const i=t,a=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const r=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=a;for(;s>a;)s-=a;s<Number.EPSILON&&(r?s=0:s=a),this.aClockwise===!0&&!r&&(s===a?s=-a:s=s-a);const o=this.aStartAngle+e*s;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const u=Math.cos(this.aRotation),d=Math.sin(this.aRotation),f=l-this.aX,p=c-this.aY;l=f*u-p*d+this.aX,c=f*d+p*u+this.aY}return i.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class dS extends lf{constructor(e,t,i,a,s,r){super(e,t,i,i,a,s,r),this.isArcCurve=!0,this.type="ArcCurve"}}function cf(){let n=0,e=0,t=0,i=0;function a(s,r,o,l){n=s,e=o,t=-3*s+3*r-2*o-l,i=2*s-2*r+o+l}return{initCatmullRom:function(s,r,o,l,c){a(r,o,c*(o-s),c*(l-r))},initNonuniformCatmullRom:function(s,r,o,l,c,u,d){let f=(r-s)/c-(o-s)/(c+u)+(o-r)/u,p=(o-r)/u-(l-r)/(u+d)+(l-o)/d;f*=u,p*=u,a(r,o,f,p)},calc:function(s){const r=s*s,o=r*s;return n+e*s+t*r+i*o}}}const no=new L,hc=new cf,mc=new cf,_c=new cf;class fS extends ai{constructor(e=[],t=!1,i="centripetal",a=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=a}getPoint(e,t=new L){const i=t,a=this.points,s=a.length,r=(s-(this.closed?0:1))*e;let o=Math.floor(r),l=r-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/s)+1)*s:l===0&&o===s-1&&(o=s-2,l=1);let c,u;this.closed||o>0?c=a[(o-1)%s]:(no.subVectors(a[0],a[1]).add(a[0]),c=no);const d=a[o%s],f=a[(o+1)%s];if(this.closed||o+2<s?u=a[(o+2)%s]:(no.subVectors(a[s-1],a[s-2]).add(a[s-1]),u=no),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let _=Math.pow(c.distanceToSquared(d),p),g=Math.pow(d.distanceToSquared(f),p),m=Math.pow(f.distanceToSquared(u),p);g<1e-4&&(g=1),_<1e-4&&(_=g),m<1e-4&&(m=g),hc.initNonuniformCatmullRom(c.x,d.x,f.x,u.x,_,g,m),mc.initNonuniformCatmullRom(c.y,d.y,f.y,u.y,_,g,m),_c.initNonuniformCatmullRom(c.z,d.z,f.z,u.z,_,g,m)}else this.curveType==="catmullrom"&&(hc.initCatmullRom(c.x,d.x,f.x,u.x,this.tension),mc.initCatmullRom(c.y,d.y,f.y,u.y,this.tension),_c.initCatmullRom(c.z,d.z,f.z,u.z,this.tension));return i.set(hc.calc(l),mc.calc(l),_c.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const a=e.points[t];this.points.push(a.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const a=this.points[t];e.points.push(a.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const a=e.points[t];this.points.push(new L().fromArray(a))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function bp(n,e,t,i,a){const s=(i-e)*.5,r=(a-t)*.5,o=n*n,l=n*o;return(2*t-2*i+s+r)*l+(-3*t+3*i-2*s-r)*o+s*n+t}function pS(n,e){const t=1-n;return t*t*e}function hS(n,e){return 2*(1-n)*n*e}function mS(n,e){return n*n*e}function Ys(n,e,t,i){return pS(n,e)+hS(n,t)+mS(n,i)}function _S(n,e){const t=1-n;return t*t*t*e}function gS(n,e){const t=1-n;return 3*t*t*n*e}function vS(n,e){return 3*(1-n)*n*n*e}function yS(n,e){return n*n*n*e}function js(n,e,t,i,a){return _S(n,e)+gS(n,t)+vS(n,i)+yS(n,a)}class pg extends ai{constructor(e=new le,t=new le,i=new le,a=new le){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=a}getPoint(e,t=new le){const i=t,a=this.v0,s=this.v1,r=this.v2,o=this.v3;return i.set(js(e,a.x,s.x,r.x,o.x),js(e,a.y,s.y,r.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class bS extends ai{constructor(e=new L,t=new L,i=new L,a=new L){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=a}getPoint(e,t=new L){const i=t,a=this.v0,s=this.v1,r=this.v2,o=this.v3;return i.set(js(e,a.x,s.x,r.x,o.x),js(e,a.y,s.y,r.y,o.y),js(e,a.z,s.z,r.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class hg extends ai{constructor(e=new le,t=new le){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new le){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new le){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class SS extends ai{constructor(e=new L,t=new L){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new L){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new L){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class mg extends ai{constructor(e=new le,t=new le,i=new le){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new le){const i=t,a=this.v0,s=this.v1,r=this.v2;return i.set(Ys(e,a.x,s.x,r.x),Ys(e,a.y,s.y,r.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class xS extends ai{constructor(e=new L,t=new L,i=new L){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new L){const i=t,a=this.v0,s=this.v1,r=this.v2;return i.set(Ys(e,a.x,s.x,r.x),Ys(e,a.y,s.y,r.y),Ys(e,a.z,s.z,r.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class _g extends ai{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new le){const i=t,a=this.points,s=(a.length-1)*e,r=Math.floor(s),o=s-r,l=a[r===0?r:r-1],c=a[r],u=a[r>a.length-2?a.length-1:r+1],d=a[r>a.length-3?a.length-1:r+2];return i.set(bp(o,l.x,c.x,u.x,d.x),bp(o,l.y,c.y,u.y,d.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const a=e.points[t];this.points.push(a.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const a=this.points[t];e.points.push(a.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const a=e.points[t];this.points.push(new le().fromArray(a))}return this}}var Sp=Object.freeze({__proto__:null,ArcCurve:dS,CatmullRomCurve3:fS,CubicBezierCurve:pg,CubicBezierCurve3:bS,EllipseCurve:lf,LineCurve:hg,LineCurve3:SS,QuadraticBezierCurve:mg,QuadraticBezierCurve3:xS,SplineCurve:_g});class wS extends ai{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Sp[i](t,e))}return this}getPoint(e,t){const i=e*this.getLength(),a=this.getCurveLengths();let s=0;for(;s<a.length;){if(a[s]>=i){const r=a[s]-i,o=this.curves[s],l=o.getLength(),c=l===0?0:1-r/l;return o.getPointAt(c,t)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let i=0,a=this.curves.length;i<a;i++)t+=this.curves[i].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let i;for(let a=0,s=this.curves;a<s.length;a++){const r=s[a],o=r.isEllipseCurve?e*2:r.isLineCurve||r.isLineCurve3?1:r.isSplineCurve?e*r.points.length:e,l=r.getPoints(o);for(let c=0;c<l.length;c++){const u=l[c];i&&i.equals(u)||(t.push(u),i=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const a=e.curves[t];this.curves.push(a.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,i=this.curves.length;t<i;t++){const a=this.curves[t];e.curves.push(a.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const a=e.curves[t];this.curves.push(new Sp[a.type]().fromJSON(a))}return this}}class xp extends wS{constructor(e){super(),this.type="Path",this.currentPoint=new le,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,i=e.length;t<i;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const i=new hg(this.currentPoint.clone(),new le(e,t));return this.curves.push(i),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,i,a){const s=new mg(this.currentPoint.clone(),new le(e,t),new le(i,a));return this.curves.push(s),this.currentPoint.set(i,a),this}bezierCurveTo(e,t,i,a,s,r){const o=new pg(this.currentPoint.clone(),new le(e,t),new le(i,a),new le(s,r));return this.curves.push(o),this.currentPoint.set(s,r),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),i=new _g(t);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,i,a,s,r){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,i,a,s,r),this}absarc(e,t,i,a,s,r){return this.absellipse(e,t,i,i,a,s,r),this}ellipse(e,t,i,a,s,r,o,l){const c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+c,t+u,i,a,s,r,o,l),this}absellipse(e,t,i,a,s,r,o,l){const c=new lf(e,t,i,a,s,r,o,l);if(this.curves.length>0){const d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);const u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class uf extends xp{constructor(e){super(e),this.uuid=Qn(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let i=0,a=this.holes.length;i<a;i++)t[i]=this.holes[i].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){const a=e.holes[t];this.holes.push(a.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,i=this.holes.length;t<i;t++){const a=this.holes[t];e.holes.push(a.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){const a=e.holes[t];this.holes.push(new xp().fromJSON(a))}return this}}function ES(n,e,t=2){const i=e&&e.length,a=i?e[0]*t:n.length;let s=gg(n,0,a,t,!0);const r=[];if(!s||s.next===s.prev)return r;let o,l,c;if(i&&(s=RS(n,e,s,t)),n.length>80*t){o=1/0,l=1/0;let u=-1/0,d=-1/0;for(let f=t;f<a;f+=t){const p=n[f],_=n[f+1];p<o&&(o=p),_<l&&(l=_),p>u&&(u=p),_>d&&(d=_)}c=Math.max(u-o,d-l),c=c!==0?32767/c:0}return ur(s,r,t,o,l,c,0),r}function gg(n,e,t,i,a){let s;if(a===zS(n,e,t,i)>0)for(let r=e;r<t;r+=i)s=wp(r/i|0,n[r],n[r+1],s);else for(let r=t-i;r>=e;r-=i)s=wp(r/i|0,n[r],n[r+1],s);return s&&gs(s,s.next)&&(fr(s),s=s.next),s}function ha(n,e){if(!n)return n;e||(e=n);let t=n,i;do if(i=!1,!t.steiner&&(gs(t,t.next)||wt(t.prev,t,t.next)===0)){if(fr(t),t=e=t.prev,t===t.next)break;i=!0}else t=t.next;while(i||t!==e);return e}function ur(n,e,t,i,a,s,r){if(!n)return;!r&&s&&kS(n,i,a,s);let o=n;for(;n.prev!==n.next;){const l=n.prev,c=n.next;if(s?TS(n,i,a,s):MS(n)){e.push(l.i,n.i,c.i),fr(n),n=c.next,o=c.next;continue}if(n=c,n===o){r?r===1?(n=CS(ha(n),e),ur(n,e,t,i,a,s,2)):r===2&&AS(n,e,t,i,a,s):ur(ha(n),e,t,i,a,s,1);break}}}function MS(n){const e=n.prev,t=n,i=n.next;if(wt(e,t,i)>=0)return!1;const a=e.x,s=t.x,r=i.x,o=e.y,l=t.y,c=i.y,u=Math.min(a,s,r),d=Math.min(o,l,c),f=Math.max(a,s,r),p=Math.max(o,l,c);let _=i.next;for(;_!==e;){if(_.x>=u&&_.x<=f&&_.y>=d&&_.y<=p&&zs(a,o,s,l,r,c,_.x,_.y)&&wt(_.prev,_,_.next)>=0)return!1;_=_.next}return!0}function TS(n,e,t,i){const a=n.prev,s=n,r=n.next;if(wt(a,s,r)>=0)return!1;const o=a.x,l=s.x,c=r.x,u=a.y,d=s.y,f=r.y,p=Math.min(o,l,c),_=Math.min(u,d,f),g=Math.max(o,l,c),m=Math.max(u,d,f),h=td(p,_,e,t,i),y=td(g,m,e,t,i);let x=n.prevZ,b=n.nextZ;for(;x&&x.z>=h&&b&&b.z<=y;){if(x.x>=p&&x.x<=g&&x.y>=_&&x.y<=m&&x!==a&&x!==r&&zs(o,u,l,d,c,f,x.x,x.y)&&wt(x.prev,x,x.next)>=0||(x=x.prevZ,b.x>=p&&b.x<=g&&b.y>=_&&b.y<=m&&b!==a&&b!==r&&zs(o,u,l,d,c,f,b.x,b.y)&&wt(b.prev,b,b.next)>=0))return!1;b=b.nextZ}for(;x&&x.z>=h;){if(x.x>=p&&x.x<=g&&x.y>=_&&x.y<=m&&x!==a&&x!==r&&zs(o,u,l,d,c,f,x.x,x.y)&&wt(x.prev,x,x.next)>=0)return!1;x=x.prevZ}for(;b&&b.z<=y;){if(b.x>=p&&b.x<=g&&b.y>=_&&b.y<=m&&b!==a&&b!==r&&zs(o,u,l,d,c,f,b.x,b.y)&&wt(b.prev,b,b.next)>=0)return!1;b=b.nextZ}return!0}function CS(n,e){let t=n;do{const i=t.prev,a=t.next.next;!gs(i,a)&&yg(i,t,t.next,a)&&dr(i,a)&&dr(a,i)&&(e.push(i.i,t.i,a.i),fr(t),fr(t.next),t=n=a),t=t.next}while(t!==n);return ha(t)}function AS(n,e,t,i,a,s){let r=n;do{let o=r.next.next;for(;o!==r.prev;){if(r.i!==o.i&&OS(r,o)){let l=bg(r,o);r=ha(r,r.next),l=ha(l,l.next),ur(r,e,t,i,a,s,0),ur(l,e,t,i,a,s,0);return}o=o.next}r=r.next}while(r!==n)}function RS(n,e,t,i){const a=[];for(let s=0,r=e.length;s<r;s++){const o=e[s]*i,l=s<r-1?e[s+1]*i:n.length,c=gg(n,o,l,i,!1);c===c.next&&(c.steiner=!0),a.push(FS(c))}a.sort(PS);for(let s=0;s<a.length;s++)t=LS(a[s],t);return t}function PS(n,e){let t=n.x-e.x;if(t===0&&(t=n.y-e.y,t===0)){const i=(n.next.y-n.y)/(n.next.x-n.x),a=(e.next.y-e.y)/(e.next.x-e.x);t=i-a}return t}function LS(n,e){const t=NS(n,e);if(!t)return e;const i=bg(t,n);return ha(i,i.next),ha(t,t.next)}function NS(n,e){let t=e;const i=n.x,a=n.y;let s=-1/0,r;if(gs(n,t))return t;do{if(gs(n,t.next))return t.next;if(a<=t.y&&a>=t.next.y&&t.next.y!==t.y){const d=t.x+(a-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(d<=i&&d>s&&(s=d,r=t.x<t.next.x?t:t.next,d===i))return r}t=t.next}while(t!==e);if(!r)return null;const o=r,l=r.x,c=r.y;let u=1/0;t=r;do{if(i>=t.x&&t.x>=l&&i!==t.x&&vg(a<c?i:s,a,l,c,a<c?s:i,a,t.x,t.y)){const d=Math.abs(a-t.y)/(i-t.x);dr(t,n)&&(d<u||d===u&&(t.x>r.x||t.x===r.x&&IS(r,t)))&&(r=t,u=d)}t=t.next}while(t!==o);return r}function IS(n,e){return wt(n.prev,n,e.prev)<0&&wt(e.next,n,n.next)<0}function kS(n,e,t,i){let a=n;do a.z===0&&(a.z=td(a.x,a.y,e,t,i)),a.prevZ=a.prev,a.nextZ=a.next,a=a.next;while(a!==n);a.prevZ.nextZ=null,a.prevZ=null,DS(a)}function DS(n){let e,t=1;do{let i=n,a;n=null;let s=null;for(e=0;i;){e++;let r=i,o=0;for(let c=0;c<t&&(o++,r=r.nextZ,!!r);c++);let l=t;for(;o>0||l>0&&r;)o!==0&&(l===0||!r||i.z<=r.z)?(a=i,i=i.nextZ,o--):(a=r,r=r.nextZ,l--),s?s.nextZ=a:n=a,a.prevZ=s,s=a;i=r}s.nextZ=null,t*=2}while(e>1);return n}function td(n,e,t,i,a){return n=(n-t)*a|0,e=(e-i)*a|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,n|e<<1}function FS(n){let e=n,t=n;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==n);return t}function vg(n,e,t,i,a,s,r,o){return(a-r)*(e-o)>=(n-r)*(s-o)&&(n-r)*(i-o)>=(t-r)*(e-o)&&(t-r)*(s-o)>=(a-r)*(i-o)}function zs(n,e,t,i,a,s,r,o){return!(n===r&&e===o)&&vg(n,e,t,i,a,s,r,o)}function OS(n,e){return n.next.i!==e.i&&n.prev.i!==e.i&&!US(n,e)&&(dr(n,e)&&dr(e,n)&&BS(n,e)&&(wt(n.prev,n,e.prev)||wt(n,e.prev,e))||gs(n,e)&&wt(n.prev,n,n.next)>0&&wt(e.prev,e,e.next)>0)}function wt(n,e,t){return(e.y-n.y)*(t.x-e.x)-(e.x-n.x)*(t.y-e.y)}function gs(n,e){return n.x===e.x&&n.y===e.y}function yg(n,e,t,i){const a=ao(wt(n,e,t)),s=ao(wt(n,e,i)),r=ao(wt(t,i,n)),o=ao(wt(t,i,e));return!!(a!==s&&r!==o||a===0&&io(n,t,e)||s===0&&io(n,i,e)||r===0&&io(t,n,i)||o===0&&io(t,e,i))}function io(n,e,t){return e.x<=Math.max(n.x,t.x)&&e.x>=Math.min(n.x,t.x)&&e.y<=Math.max(n.y,t.y)&&e.y>=Math.min(n.y,t.y)}function ao(n){return n>0?1:n<0?-1:0}function US(n,e){let t=n;do{if(t.i!==n.i&&t.next.i!==n.i&&t.i!==e.i&&t.next.i!==e.i&&yg(t,t.next,n,e))return!0;t=t.next}while(t!==n);return!1}function dr(n,e){return wt(n.prev,n,n.next)<0?wt(n,e,n.next)>=0&&wt(n,n.prev,e)>=0:wt(n,e,n.prev)<0||wt(n,n.next,e)<0}function BS(n,e){let t=n,i=!1;const a=(n.x+e.x)/2,s=(n.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&a<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(i=!i),t=t.next;while(t!==n);return i}function bg(n,e){const t=nd(n.i,n.x,n.y),i=nd(e.i,e.x,e.y),a=n.next,s=e.prev;return n.next=e,e.prev=n,t.next=a,a.prev=t,i.next=t,t.prev=i,s.next=i,i.prev=s,i}function wp(n,e,t,i){const a=nd(n,e,t);return i?(a.next=i.next,a.prev=i,i.next.prev=a,i.next=a):(a.prev=a,a.next=a),a}function fr(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function nd(n,e,t){return{i:n,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function zS(n,e,t,i){let a=0;for(let s=e,r=t-i;s<t;s+=i)a+=(n[r]-n[s])*(n[s+1]+n[r+1]),r=s;return a}class HS{static triangulate(e,t,i=2){return ES(e,t,i)}}class Zs{static area(e){const t=e.length;let i=0;for(let a=t-1,s=0;s<t;a=s++)i+=e[a].x*e[s].y-e[s].x*e[a].y;return i*.5}static isClockWise(e){return Zs.area(e)<0}static triangulateShape(e,t){const i=[],a=[],s=[];Ep(e),Mp(i,e);let r=e.length;t.forEach(Ep);for(let l=0;l<t.length;l++)a.push(r),r+=t[l].length,Mp(i,t[l]);const o=HS.triangulate(i,a);for(let l=0;l<o.length;l+=3)s.push(o.slice(l,l+3));return s}}function Ep(n){const e=n.length;e>2&&n[e-1].equals(n[0])&&n.pop()}function Mp(n,e){for(let t=0;t<e.length;t++)n.push(e[t].x),n.push(e[t].y)}class nn extends Dt{constructor(e=1,t=1,i=1,a=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:a};const s=e/2,r=t/2,o=Math.floor(i),l=Math.floor(a),c=o+1,u=l+1,d=e/o,f=t/l,p=[],_=[],g=[],m=[];for(let h=0;h<u;h++){const y=h*f-r;for(let x=0;x<c;x++){const b=x*d-s;_.push(b,-y,0),g.push(0,0,1),m.push(x/o),m.push(1-h/l)}}for(let h=0;h<l;h++)for(let y=0;y<o;y++){const x=y+c*h,b=y+c*(h+1),A=y+1+c*(h+1),M=y+1+c*h;p.push(x,b,M),p.push(b,A,M)}this.setIndex(p),this.setAttribute("position",new it(_,3)),this.setAttribute("normal",new it(g,3)),this.setAttribute("uv",new it(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new nn(e.width,e.height,e.widthSegments,e.heightSegments)}}class _a extends Dt{constructor(e=.5,t=1,i=32,a=1,s=0,r=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:a,thetaStart:s,thetaLength:r},i=Math.max(3,i),a=Math.max(1,a);const o=[],l=[],c=[],u=[];let d=e;const f=(t-e)/a,p=new L,_=new le;for(let g=0;g<=a;g++){for(let m=0;m<=i;m++){const h=s+m/i*r;p.x=d*Math.cos(h),p.y=d*Math.sin(h),l.push(p.x,p.y,p.z),c.push(0,0,1),_.x=(p.x/t+1)/2,_.y=(p.y/t+1)/2,u.push(_.x,_.y)}d+=f}for(let g=0;g<a;g++){const m=g*(i+1);for(let h=0;h<i;h++){const y=h+m,x=y,b=y+i+1,A=y+i+2,M=y+1;o.push(x,b,M),o.push(b,A,M)}}this.setIndex(o),this.setAttribute("position",new it(l,3)),this.setAttribute("normal",new it(c,3)),this.setAttribute("uv",new it(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new _a(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Pl extends Dt{constructor(e=new uf([new le(0,.5),new le(-.5,-.5),new le(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};const i=[],a=[],s=[],r=[];let o=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let u=0;u<e.length;u++)c(e[u]),this.addGroup(o,l,u),o+=l,l=0;this.setIndex(i),this.setAttribute("position",new it(a,3)),this.setAttribute("normal",new it(s,3)),this.setAttribute("uv",new it(r,2));function c(u){const d=a.length/3,f=u.extractPoints(t);let p=f.shape;const _=f.holes;Zs.isClockWise(p)===!1&&(p=p.reverse());for(let m=0,h=_.length;m<h;m++){const y=_[m];Zs.isClockWise(y)===!0&&(_[m]=y.reverse())}const g=Zs.triangulateShape(p,_);for(let m=0,h=_.length;m<h;m++){const y=_[m];p=p.concat(y)}for(let m=0,h=p.length;m<h;m++){const y=p[m];a.push(y.x,y.y,0),s.push(0,0,1),r.push(y.x,y.y)}for(let m=0,h=g.length;m<h;m++){const y=g[m],x=y[0]+d,b=y[1]+d,A=y[2]+d;i.push(x,b,A),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes;return VS(t,e)}static fromJSON(e,t){const i=[];for(let a=0,s=e.shapes.length;a<s;a++){const r=t[e.shapes[a]];i.push(r)}return new Pl(i,e.curveSegments)}}function VS(n,e){if(e.shapes=[],Array.isArray(n))for(let t=0,i=n.length;t<i;t++){const a=n[t];e.shapes.push(a.uuid)}else e.shapes.push(n.uuid);return e}class vs extends Dt{constructor(e=1,t=32,i=16,a=0,s=Math.PI*2,r=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:a,phiLength:s,thetaStart:r,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(r+o,Math.PI);let c=0;const u=[],d=new L,f=new L,p=[],_=[],g=[],m=[];for(let h=0;h<=i;h++){const y=[],x=h/i;let b=0;h===0&&r===0?b=.5/t:h===i&&l===Math.PI&&(b=-.5/t);for(let A=0;A<=t;A++){const M=A/t;d.x=-e*Math.cos(a+M*s)*Math.sin(r+x*o),d.y=e*Math.cos(r+x*o),d.z=e*Math.sin(a+M*s)*Math.sin(r+x*o),_.push(d.x,d.y,d.z),f.copy(d).normalize(),g.push(f.x,f.y,f.z),m.push(M+b,1-x),y.push(c++)}u.push(y)}for(let h=0;h<i;h++)for(let y=0;y<t;y++){const x=u[h][y+1],b=u[h][y],A=u[h+1][y],M=u[h+1][y+1];(h!==0||r>0)&&p.push(x,b,M),(h!==i-1||l<Math.PI)&&p.push(b,A,M)}this.setIndex(p),this.setAttribute("position",new it(_,3)),this.setAttribute("normal",new it(g,3)),this.setAttribute("uv",new it(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new vs(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class df extends Dt{constructor(e=1,t=.4,i=12,a=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:a,arc:s},i=Math.floor(i),a=Math.floor(a);const r=[],o=[],l=[],c=[],u=new L,d=new L,f=new L;for(let p=0;p<=i;p++)for(let _=0;_<=a;_++){const g=_/a*s,m=p/i*Math.PI*2;d.x=(e+t*Math.cos(m))*Math.cos(g),d.y=(e+t*Math.cos(m))*Math.sin(g),d.z=t*Math.sin(m),o.push(d.x,d.y,d.z),u.x=e*Math.cos(g),u.y=e*Math.sin(g),f.subVectors(d,u).normalize(),l.push(f.x,f.y,f.z),c.push(_/a),c.push(p/i)}for(let p=1;p<=i;p++)for(let _=1;_<=a;_++){const g=(a+1)*p+_-1,m=(a+1)*(p-1)+_-1,h=(a+1)*(p-1)+_,y=(a+1)*p+_;r.push(g,m,y),r.push(m,h,y)}this.setIndex(r),this.setAttribute("position",new it(o,3)),this.setAttribute("normal",new it(l,3)),this.setAttribute("uv",new it(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new df(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Js extends bi{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new Ye(16777215),this.specular=new Ye(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ye(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=nf,this.normalScale=new le(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Hn,this.combine=El,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Sg extends bi{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Ye(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ye(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=nf,this.normalScale=new le(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Hn,this.combine=El,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class GS extends bi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=rb,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class $S extends bi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class xg extends Lt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ye(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}const gc=new yt,Tp=new L,Cp=new L;class WS{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new le(512,512),this.mapType=ni,this.map=null,this.mapPass=null,this.matrix=new yt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new of,this._frameExtents=new le(1,1),this._viewportCount=1,this._viewports=[new Mt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;Tp.setFromMatrixPosition(e.matrixWorld),t.position.copy(Tp),Cp.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Cp),t.updateMatrixWorld(),gc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(gc,t.coordinateSystem,t.reversedDepth),t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(gc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class wg extends rg{constructor(e=-1,t=1,i=1,a=-1,s=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=a,this.near=s,this.far=r,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,a,s,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=a,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,a=(this.top+this.bottom)/2;let s=i-e,r=i+e,o=a+t,l=a-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,r=s+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,r,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class XS extends WS{constructor(){super(new wg(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Ap extends xg{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Lt.DEFAULT_UP),this.updateMatrix(),this.target=new Lt,this.shadow=new XS}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class qS extends xg{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class KS extends bn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class Rp{constructor(e=1,t=0,i=0){this.radius=e,this.phi=t,this.theta=i}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=qe(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(qe(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const Pp=new L;let so,vc;class YS extends Lt{constructor(e=new L(0,0,1),t=new L(0,0,0),i=1,a=16776960,s=i*.2,r=s*.2){super(),this.type="ArrowHelper",so===void 0&&(so=new Dt,so.setAttribute("position",new it([0,0,0,0,1,0],3)),vc=new cr(.5,1,5,1),vc.translate(0,-.5,0)),this.position.copy(t),this.line=new Cl(so,new Mr({color:a,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new ze(vc,new ct({color:a,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(e),this.setLength(i,s,r)}setDirection(e){if(e.y>.99999)this.quaternion.set(0,0,0,1);else if(e.y<-.99999)this.quaternion.set(1,0,0,0);else{Pp.set(e.z,0,-e.x).normalize();const t=Math.acos(e.y);this.quaternion.setFromAxisAngle(Pp,t)}}setLength(e,t=e*.2,i=t*.2){this.line.scale.set(1,Math.max(1e-4,e-t),1),this.line.updateMatrix(),this.cone.scale.set(i,t,i),this.cone.position.y=e,this.cone.updateMatrix()}setColor(e){this.line.material.color.set(e),this.cone.material.color.set(e)}copy(e){return super.copy(e,!1),this.line.copy(e.line),this.cone.copy(e.cone),this}dispose(){this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}}class jS extends ma{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function Lp(n,e,t,i){const a=ZS(i);switch(t){case K_:return n*e;case j_:return n*e/a.components*a.byteLength;case Qd:return n*e/a.components*a.byteLength;case Z_:return n*e*2/a.components*a.byteLength;case ef:return n*e*2/a.components*a.byteLength;case Y_:return n*e*3/a.components*a.byteLength;case On:return n*e*4/a.components*a.byteLength;case tf:return n*e*4/a.components*a.byteLength;case ko:case Do:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Fo:case Oo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Cu:case Ru:return Math.max(n,16)*Math.max(e,8)/4;case Tu:case Au:return Math.max(n,8)*Math.max(e,8)/2;case Pu:case Lu:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Nu:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Iu:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case ku:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Du:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Fu:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Ou:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Uu:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Bu:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case zu:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Hu:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Vu:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Gu:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case $u:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Wu:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Xu:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case qu:case Ku:case Yu:return Math.ceil(n/4)*Math.ceil(e/4)*16;case ju:case Zu:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Ju:case Qu:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function ZS(n){switch(n){case ni:case $_:return{byteLength:1,components:1};case ir:case W_:case wr:return{byteLength:2,components:1};case Zd:case Jd:return{byteLength:2,components:4};case fa:case jd:case vi:return{byteLength:4,components:1};case X_:case q_:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Yd}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Yd);function Eg(){let n=null,e=!1,t=null,i=null;function a(s,r){t(s,r),i=n.requestAnimationFrame(a)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(a),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function JS(n){const e=new WeakMap;function t(o,l){const c=o.array,u=o.usage,d=c.byteLength,f=n.createBuffer();n.bindBuffer(l,f),n.bufferData(l,c,u),o.onUploadCallback();let p;if(c instanceof Float32Array)p=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=n.SHORT;else if(c instanceof Uint32Array)p=n.UNSIGNED_INT;else if(c instanceof Int32Array)p=n.INT;else if(c instanceof Int8Array)p=n.BYTE;else if(c instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function i(o,l,c){const u=l.array,d=l.updateRanges;if(n.bindBuffer(c,o),d.length===0)n.bufferSubData(c,0,u);else{d.sort((p,_)=>p.start-_.start);let f=0;for(let p=1;p<d.length;p++){const _=d[f],g=d[p];g.start<=_.start+_.count+1?_.count=Math.max(_.count,g.start+g.count-_.start):(++f,d[f]=g)}d.length=f+1;for(let p=0,_=d.length;p<_;p++){const g=d[p];n.bufferSubData(c,g.start*u.BYTES_PER_ELEMENT,u,g.start,g.count)}l.clearUpdateRanges()}l.onUploadCallback()}function a(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(n.deleteBuffer(l.buffer),e.delete(o))}function r(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:a,remove:s,update:r}}var QS=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,ex=`#ifdef USE_ALPHAHASH
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
#endif`,tx=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,nx=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ix=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,ax=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,sx=`#ifdef USE_AOMAP
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
#endif`,rx=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,ox=`#ifdef USE_BATCHING
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
#endif`,lx=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,cx=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ux=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,dx=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,fx=`#ifdef USE_IRIDESCENCE
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
#endif`,px=`#ifdef USE_BUMPMAP
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
#endif`,hx=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,mx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,_x=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,gx=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,vx=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,yx=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,bx=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Sx=`#if defined( USE_COLOR_ALPHA )
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
#endif`,xx=`#define PI 3.141592653589793
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
} // validated`,wx=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Ex=`vec3 transformedNormal = objectNormal;
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
#endif`,Mx=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Tx=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Cx=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Ax=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Rx="gl_FragColor = linearToOutputTexel( gl_FragColor );",Px=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Lx=`#ifdef USE_ENVMAP
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
#endif`,Nx=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Ix=`#ifdef USE_ENVMAP
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
#endif`,kx=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Dx=`#ifdef USE_ENVMAP
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
#endif`,Fx=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Ox=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Ux=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Bx=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,zx=`#ifdef USE_GRADIENTMAP
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
}`,Hx=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Vx=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Gx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,$x=`uniform bool receiveShadow;
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
#endif`,Wx=`#ifdef USE_ENVMAP
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
#endif`,Xx=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,qx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Kx=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Yx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,jx=`PhysicalMaterial material;
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
#endif`,Zx=`struct PhysicalMaterial {
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
}`,Jx=`
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
#endif`,Qx=`#if defined( RE_IndirectDiffuse )
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
#endif`,ew=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,tw=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,nw=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,iw=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,aw=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,sw=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,rw=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,ow=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,lw=`#if defined( USE_POINTS_UV )
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
#endif`,cw=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,uw=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,dw=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,fw=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,pw=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,hw=`#ifdef USE_MORPHTARGETS
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
#endif`,mw=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,_w=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,gw=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,vw=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,yw=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,bw=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Sw=`#ifdef USE_NORMALMAP
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
#endif`,xw=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ww=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Ew=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Mw=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Tw=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Cw=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Aw=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Rw=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Pw=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Lw=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Nw=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Iw=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,kw=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Dw=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Fw=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Ow=`float getShadowMask() {
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
}`,Uw=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Bw=`#ifdef USE_SKINNING
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
#endif`,zw=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Hw=`#ifdef USE_SKINNING
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
#endif`,Vw=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Gw=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,$w=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Ww=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Xw=`#ifdef USE_TRANSMISSION
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
#endif`,qw=`#ifdef USE_TRANSMISSION
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
#endif`,Kw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Yw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,jw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Zw=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Jw=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Qw=`uniform sampler2D t2D;
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
}`,eE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,tE=`#ifdef ENVMAP_TYPE_CUBE
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
}`,nE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,iE=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,aE=`#include <common>
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
}`,sE=`#if DEPTH_PACKING == 3200
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
}`,rE=`#define DISTANCE
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
}`,oE=`#define DISTANCE
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
}`,lE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,cE=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,uE=`uniform float scale;
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
}`,dE=`uniform vec3 diffuse;
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
}`,fE=`#include <common>
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
}`,pE=`uniform vec3 diffuse;
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
}`,hE=`#define LAMBERT
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
}`,mE=`#define LAMBERT
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
}`,_E=`#define MATCAP
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
}`,gE=`#define MATCAP
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
}`,vE=`#define NORMAL
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
}`,yE=`#define NORMAL
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
}`,bE=`#define PHONG
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
}`,SE=`#define PHONG
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
}`,xE=`#define STANDARD
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
}`,wE=`#define STANDARD
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
}`,EE=`#define TOON
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
}`,ME=`#define TOON
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
}`,TE=`uniform float size;
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
}`,CE=`uniform vec3 diffuse;
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
}`,AE=`#include <common>
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
}`,RE=`uniform vec3 color;
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
}`,PE=`uniform float rotation;
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
}`,LE=`uniform vec3 diffuse;
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
}`,Xe={alphahash_fragment:QS,alphahash_pars_fragment:ex,alphamap_fragment:tx,alphamap_pars_fragment:nx,alphatest_fragment:ix,alphatest_pars_fragment:ax,aomap_fragment:sx,aomap_pars_fragment:rx,batching_pars_vertex:ox,batching_vertex:lx,begin_vertex:cx,beginnormal_vertex:ux,bsdfs:dx,iridescence_fragment:fx,bumpmap_pars_fragment:px,clipping_planes_fragment:hx,clipping_planes_pars_fragment:mx,clipping_planes_pars_vertex:_x,clipping_planes_vertex:gx,color_fragment:vx,color_pars_fragment:yx,color_pars_vertex:bx,color_vertex:Sx,common:xx,cube_uv_reflection_fragment:wx,defaultnormal_vertex:Ex,displacementmap_pars_vertex:Mx,displacementmap_vertex:Tx,emissivemap_fragment:Cx,emissivemap_pars_fragment:Ax,colorspace_fragment:Rx,colorspace_pars_fragment:Px,envmap_fragment:Lx,envmap_common_pars_fragment:Nx,envmap_pars_fragment:Ix,envmap_pars_vertex:kx,envmap_physical_pars_fragment:Wx,envmap_vertex:Dx,fog_vertex:Fx,fog_pars_vertex:Ox,fog_fragment:Ux,fog_pars_fragment:Bx,gradientmap_pars_fragment:zx,lightmap_pars_fragment:Hx,lights_lambert_fragment:Vx,lights_lambert_pars_fragment:Gx,lights_pars_begin:$x,lights_toon_fragment:Xx,lights_toon_pars_fragment:qx,lights_phong_fragment:Kx,lights_phong_pars_fragment:Yx,lights_physical_fragment:jx,lights_physical_pars_fragment:Zx,lights_fragment_begin:Jx,lights_fragment_maps:Qx,lights_fragment_end:ew,logdepthbuf_fragment:tw,logdepthbuf_pars_fragment:nw,logdepthbuf_pars_vertex:iw,logdepthbuf_vertex:aw,map_fragment:sw,map_pars_fragment:rw,map_particle_fragment:ow,map_particle_pars_fragment:lw,metalnessmap_fragment:cw,metalnessmap_pars_fragment:uw,morphinstance_vertex:dw,morphcolor_vertex:fw,morphnormal_vertex:pw,morphtarget_pars_vertex:hw,morphtarget_vertex:mw,normal_fragment_begin:_w,normal_fragment_maps:gw,normal_pars_fragment:vw,normal_pars_vertex:yw,normal_vertex:bw,normalmap_pars_fragment:Sw,clearcoat_normal_fragment_begin:xw,clearcoat_normal_fragment_maps:ww,clearcoat_pars_fragment:Ew,iridescence_pars_fragment:Mw,opaque_fragment:Tw,packing:Cw,premultiplied_alpha_fragment:Aw,project_vertex:Rw,dithering_fragment:Pw,dithering_pars_fragment:Lw,roughnessmap_fragment:Nw,roughnessmap_pars_fragment:Iw,shadowmap_pars_fragment:kw,shadowmap_pars_vertex:Dw,shadowmap_vertex:Fw,shadowmask_pars_fragment:Ow,skinbase_vertex:Uw,skinning_pars_vertex:Bw,skinning_vertex:zw,skinnormal_vertex:Hw,specularmap_fragment:Vw,specularmap_pars_fragment:Gw,tonemapping_fragment:$w,tonemapping_pars_fragment:Ww,transmission_fragment:Xw,transmission_pars_fragment:qw,uv_pars_fragment:Kw,uv_pars_vertex:Yw,uv_vertex:jw,worldpos_vertex:Zw,background_vert:Jw,background_frag:Qw,backgroundCube_vert:eE,backgroundCube_frag:tE,cube_vert:nE,cube_frag:iE,depth_vert:aE,depth_frag:sE,distanceRGBA_vert:rE,distanceRGBA_frag:oE,equirect_vert:lE,equirect_frag:cE,linedashed_vert:uE,linedashed_frag:dE,meshbasic_vert:fE,meshbasic_frag:pE,meshlambert_vert:hE,meshlambert_frag:mE,meshmatcap_vert:_E,meshmatcap_frag:gE,meshnormal_vert:vE,meshnormal_frag:yE,meshphong_vert:bE,meshphong_frag:SE,meshphysical_vert:xE,meshphysical_frag:wE,meshtoon_vert:EE,meshtoon_frag:ME,points_vert:TE,points_frag:CE,shadow_vert:AE,shadow_frag:RE,sprite_vert:PE,sprite_frag:LE},de={common:{diffuse:{value:new Ye(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new $e},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new $e}},envmap:{envMap:{value:null},envMapRotation:{value:new $e},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new $e}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new $e}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new $e},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new $e},normalScale:{value:new le(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new $e},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new $e}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new $e}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new $e}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ye(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ye(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0},uvTransform:{value:new $e}},sprite:{diffuse:{value:new Ye(16777215)},opacity:{value:1},center:{value:new le(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new $e},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0}}},qn={basic:{uniforms:Kt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.fog]),vertexShader:Xe.meshbasic_vert,fragmentShader:Xe.meshbasic_frag},lambert:{uniforms:Kt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new Ye(0)}}]),vertexShader:Xe.meshlambert_vert,fragmentShader:Xe.meshlambert_frag},phong:{uniforms:Kt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new Ye(0)},specular:{value:new Ye(1118481)},shininess:{value:30}}]),vertexShader:Xe.meshphong_vert,fragmentShader:Xe.meshphong_frag},standard:{uniforms:Kt([de.common,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.roughnessmap,de.metalnessmap,de.fog,de.lights,{emissive:{value:new Ye(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag},toon:{uniforms:Kt([de.common,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.gradientmap,de.fog,de.lights,{emissive:{value:new Ye(0)}}]),vertexShader:Xe.meshtoon_vert,fragmentShader:Xe.meshtoon_frag},matcap:{uniforms:Kt([de.common,de.bumpmap,de.normalmap,de.displacementmap,de.fog,{matcap:{value:null}}]),vertexShader:Xe.meshmatcap_vert,fragmentShader:Xe.meshmatcap_frag},points:{uniforms:Kt([de.points,de.fog]),vertexShader:Xe.points_vert,fragmentShader:Xe.points_frag},dashed:{uniforms:Kt([de.common,de.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Xe.linedashed_vert,fragmentShader:Xe.linedashed_frag},depth:{uniforms:Kt([de.common,de.displacementmap]),vertexShader:Xe.depth_vert,fragmentShader:Xe.depth_frag},normal:{uniforms:Kt([de.common,de.bumpmap,de.normalmap,de.displacementmap,{opacity:{value:1}}]),vertexShader:Xe.meshnormal_vert,fragmentShader:Xe.meshnormal_frag},sprite:{uniforms:Kt([de.sprite,de.fog]),vertexShader:Xe.sprite_vert,fragmentShader:Xe.sprite_frag},background:{uniforms:{uvTransform:{value:new $e},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Xe.background_vert,fragmentShader:Xe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new $e}},vertexShader:Xe.backgroundCube_vert,fragmentShader:Xe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Xe.cube_vert,fragmentShader:Xe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Xe.equirect_vert,fragmentShader:Xe.equirect_frag},distanceRGBA:{uniforms:Kt([de.common,de.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Xe.distanceRGBA_vert,fragmentShader:Xe.distanceRGBA_frag},shadow:{uniforms:Kt([de.lights,de.fog,{color:{value:new Ye(0)},opacity:{value:1}}]),vertexShader:Xe.shadow_vert,fragmentShader:Xe.shadow_frag}};qn.physical={uniforms:Kt([qn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new $e},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new $e},clearcoatNormalScale:{value:new le(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new $e},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new $e},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new $e},sheen:{value:0},sheenColor:{value:new Ye(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new $e},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new $e},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new $e},transmissionSamplerSize:{value:new le},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new $e},attenuationDistance:{value:0},attenuationColor:{value:new Ye(0)},specularColor:{value:new Ye(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new $e},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new $e},anisotropyVector:{value:new le},anisotropyMap:{value:null},anisotropyMapTransform:{value:new $e}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag};const ro={r:0,b:0,g:0},Yi=new Hn,NE=new yt;function IE(n,e,t,i,a,s,r){const o=new Ye(0);let l=s===!0?0:1,c,u,d=null,f=0,p=null;function _(x){let b=x.isScene===!0?x.background:null;return b&&b.isTexture&&(b=(x.backgroundBlurriness>0?t:e).get(b)),b}function g(x){let b=!1;const A=_(x);A===null?h(o,l):A&&A.isColor&&(h(A,1),b=!0);const M=n.xr.getEnvironmentBlendMode();M==="additive"?i.buffers.color.setClear(0,0,0,1,r):M==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,r),(n.autoClear||b)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(x,b){const A=_(b);A&&(A.isCubeTexture||A.mapping===Ml)?(u===void 0&&(u=new ze(new xn(1,1,1),new zi({name:"BackgroundCubeMaterial",uniforms:_s(qn.backgroundCube.uniforms),vertexShader:qn.backgroundCube.vertexShader,fragmentShader:qn.backgroundCube.fragmentShader,side:sn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(M,T,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),a.update(u)),Yi.copy(b.backgroundRotation),Yi.x*=-1,Yi.y*=-1,Yi.z*=-1,A.isCubeTexture&&A.isRenderTargetTexture===!1&&(Yi.y*=-1,Yi.z*=-1),u.material.uniforms.envMap.value=A,u.material.uniforms.flipEnvMap.value=A.isCubeTexture&&A.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(NE.makeRotationFromEuler(Yi)),u.material.toneMapped=Qe.getTransfer(A.colorSpace)!==ot,(d!==A||f!==A.version||p!==n.toneMapping)&&(u.material.needsUpdate=!0,d=A,f=A.version,p=n.toneMapping),u.layers.enableAll(),x.unshift(u,u.geometry,u.material,0,0,null)):A&&A.isTexture&&(c===void 0&&(c=new ze(new nn(2,2),new zi({name:"BackgroundMaterial",uniforms:_s(qn.background.uniforms),vertexShader:qn.background.vertexShader,fragmentShader:qn.background.fragmentShader,side:Bi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),a.update(c)),c.material.uniforms.t2D.value=A,c.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,c.material.toneMapped=Qe.getTransfer(A.colorSpace)!==ot,A.matrixAutoUpdate===!0&&A.updateMatrix(),c.material.uniforms.uvTransform.value.copy(A.matrix),(d!==A||f!==A.version||p!==n.toneMapping)&&(c.material.needsUpdate=!0,d=A,f=A.version,p=n.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null))}function h(x,b){x.getRGB(ro,sg(n)),i.buffers.color.setClear(ro.r,ro.g,ro.b,b,r)}function y(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(x,b=1){o.set(x),l=b,h(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(x){l=x,h(o,l)},render:g,addToRenderList:m,dispose:y}}function kE(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},a=f(null);let s=a,r=!1;function o(S,R,I,U,B){let G=!1;const z=d(U,I,R);s!==z&&(s=z,c(s.object)),G=p(S,U,I,B),G&&_(S,U,I,B),B!==null&&e.update(B,n.ELEMENT_ARRAY_BUFFER),(G||r)&&(r=!1,b(S,R,I,U),B!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(B).buffer))}function l(){return n.createVertexArray()}function c(S){return n.bindVertexArray(S)}function u(S){return n.deleteVertexArray(S)}function d(S,R,I){const U=I.wireframe===!0;let B=i[S.id];B===void 0&&(B={},i[S.id]=B);let G=B[R.id];G===void 0&&(G={},B[R.id]=G);let z=G[U];return z===void 0&&(z=f(l()),G[U]=z),z}function f(S){const R=[],I=[],U=[];for(let B=0;B<t;B++)R[B]=0,I[B]=0,U[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:I,attributeDivisors:U,object:S,attributes:{},index:null}}function p(S,R,I,U){const B=s.attributes,G=R.attributes;let z=0;const X=I.getAttributes();for(const V in X)if(X[V].location>=0){const fe=B[V];let q=G[V];if(q===void 0&&(V==="instanceMatrix"&&S.instanceMatrix&&(q=S.instanceMatrix),V==="instanceColor"&&S.instanceColor&&(q=S.instanceColor)),fe===void 0||fe.attribute!==q||q&&fe.data!==q.data)return!0;z++}return s.attributesNum!==z||s.index!==U}function _(S,R,I,U){const B={},G=R.attributes;let z=0;const X=I.getAttributes();for(const V in X)if(X[V].location>=0){let fe=G[V];fe===void 0&&(V==="instanceMatrix"&&S.instanceMatrix&&(fe=S.instanceMatrix),V==="instanceColor"&&S.instanceColor&&(fe=S.instanceColor));const q={};q.attribute=fe,fe&&fe.data&&(q.data=fe.data),B[V]=q,z++}s.attributes=B,s.attributesNum=z,s.index=U}function g(){const S=s.newAttributes;for(let R=0,I=S.length;R<I;R++)S[R]=0}function m(S){h(S,0)}function h(S,R){const I=s.newAttributes,U=s.enabledAttributes,B=s.attributeDivisors;I[S]=1,U[S]===0&&(n.enableVertexAttribArray(S),U[S]=1),B[S]!==R&&(n.vertexAttribDivisor(S,R),B[S]=R)}function y(){const S=s.newAttributes,R=s.enabledAttributes;for(let I=0,U=R.length;I<U;I++)R[I]!==S[I]&&(n.disableVertexAttribArray(I),R[I]=0)}function x(S,R,I,U,B,G,z){z===!0?n.vertexAttribIPointer(S,R,I,B,G):n.vertexAttribPointer(S,R,I,U,B,G)}function b(S,R,I,U){g();const B=U.attributes,G=I.getAttributes(),z=R.defaultAttributeValues;for(const X in G){const V=G[X];if(V.location>=0){let ee=B[X];if(ee===void 0&&(X==="instanceMatrix"&&S.instanceMatrix&&(ee=S.instanceMatrix),X==="instanceColor"&&S.instanceColor&&(ee=S.instanceColor)),ee!==void 0){const fe=ee.normalized,q=ee.itemSize,ue=e.get(ee);if(ue===void 0)continue;const xe=ue.buffer,ye=ue.type,he=ue.bytesPerElement,O=ye===n.INT||ye===n.UNSIGNED_INT||ee.gpuType===jd;if(ee.isInterleavedBufferAttribute){const K=ee.data,te=K.stride,Se=ee.offset;if(K.isInstancedInterleavedBuffer){for(let ve=0;ve<V.locationSize;ve++)h(V.location+ve,K.meshPerAttribute);S.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let ve=0;ve<V.locationSize;ve++)m(V.location+ve);n.bindBuffer(n.ARRAY_BUFFER,xe);for(let ve=0;ve<V.locationSize;ve++)x(V.location+ve,q/V.locationSize,ye,fe,te*he,(Se+q/V.locationSize*ve)*he,O)}else{if(ee.isInstancedBufferAttribute){for(let K=0;K<V.locationSize;K++)h(V.location+K,ee.meshPerAttribute);S.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=ee.meshPerAttribute*ee.count)}else for(let K=0;K<V.locationSize;K++)m(V.location+K);n.bindBuffer(n.ARRAY_BUFFER,xe);for(let K=0;K<V.locationSize;K++)x(V.location+K,q/V.locationSize,ye,fe,q*he,q/V.locationSize*K*he,O)}}else if(z!==void 0){const fe=z[X];if(fe!==void 0)switch(fe.length){case 2:n.vertexAttrib2fv(V.location,fe);break;case 3:n.vertexAttrib3fv(V.location,fe);break;case 4:n.vertexAttrib4fv(V.location,fe);break;default:n.vertexAttrib1fv(V.location,fe)}}}}y()}function A(){C();for(const S in i){const R=i[S];for(const I in R){const U=R[I];for(const B in U)u(U[B].object),delete U[B];delete R[I]}delete i[S]}}function M(S){if(i[S.id]===void 0)return;const R=i[S.id];for(const I in R){const U=R[I];for(const B in U)u(U[B].object),delete U[B];delete R[I]}delete i[S.id]}function T(S){for(const R in i){const I=i[R];if(I[S.id]===void 0)continue;const U=I[S.id];for(const B in U)u(U[B].object),delete U[B];delete I[S.id]}}function C(){v(),r=!0,s!==a&&(s=a,c(s.object))}function v(){a.geometry=null,a.program=null,a.wireframe=!1}return{setup:o,reset:C,resetDefaultState:v,dispose:A,releaseStatesOfGeometry:M,releaseStatesOfProgram:T,initAttributes:g,enableAttribute:m,disableUnusedAttributes:y}}function DE(n,e,t){let i;function a(c){i=c}function s(c,u){n.drawArrays(i,c,u),t.update(u,i,1)}function r(c,u,d){d!==0&&(n.drawArraysInstanced(i,c,u,d),t.update(u,i,d))}function o(c,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,u,0,d);let p=0;for(let _=0;_<d;_++)p+=u[_];t.update(p,i,1)}function l(c,u,d,f){if(d===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let _=0;_<c.length;_++)r(c[_],u[_],f[_]);else{p.multiDrawArraysInstancedWEBGL(i,c,0,u,0,f,0,d);let _=0;for(let g=0;g<d;g++)_+=u[g]*f[g];t.update(_,i,1)}}this.setMode=a,this.render=s,this.renderInstances=r,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function FE(n,e,t,i){let a;function s(){if(a!==void 0)return a;if(e.has("EXT_texture_filter_anisotropic")===!0){const T=e.get("EXT_texture_filter_anisotropic");a=n.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else a=0;return a}function r(T){return!(T!==On&&i.convert(T)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(T){const C=T===wr&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(T!==ni&&i.convert(T)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==vi&&!C)}function l(T){if(T==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const d=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),h=n.getParameter(n.MAX_VERTEX_ATTRIBS),y=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),x=n.getParameter(n.MAX_VARYING_VECTORS),b=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),A=_>0,M=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:r,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:_,maxTextureSize:g,maxCubemapSize:m,maxAttributes:h,maxVertexUniforms:y,maxVaryings:x,maxFragmentUniforms:b,vertexTextures:A,maxSamples:M}}function OE(n){const e=this;let t=null,i=0,a=!1,s=!1;const r=new Ai,o=new $e,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){const p=d.length!==0||f||i!==0||a;return a=f,i=d.length,p},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,f){t=u(d,f,0)},this.setState=function(d,f,p){const _=d.clippingPlanes,g=d.clipIntersection,m=d.clipShadows,h=n.get(d);if(!a||_===null||_.length===0||s&&!m)s?u(null):c();else{const y=s?0:i,x=y*4;let b=h.clippingState||null;l.value=b,b=u(_,f,x,p);for(let A=0;A!==x;++A)b[A]=t[A];h.clippingState=b,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(d,f,p,_){const g=d!==null?d.length:0;let m=null;if(g!==0){if(m=l.value,_!==!0||m===null){const h=p+g*4,y=f.matrixWorldInverse;o.getNormalMatrix(y),(m===null||m.length<h)&&(m=new Float32Array(h));for(let x=0,b=p;x!==g;++x,b+=4)r.copy(d[x]).applyMatrix4(y,o),r.normal.toArray(m,b),m[b+3]=r.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=g,e.numIntersection=0,m}}function UE(n){let e=new WeakMap;function t(r,o){return o===xu?r.mapping=ps:o===wu&&(r.mapping=hs),r}function i(r){if(r&&r.isTexture){const o=r.mapping;if(o===xu||o===wu)if(e.has(r)){const l=e.get(r).texture;return t(l,r.mapping)}else{const l=r.image;if(l&&l.height>0){const c=new nS(l.height);return c.fromEquirectangularTexture(n,r),e.set(r,c),r.addEventListener("dispose",a),t(c.texture,r.mapping)}else return null}}return r}function a(r){const o=r.target;o.removeEventListener("dispose",a);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}const Wa=4,Np=[.125,.215,.35,.446,.526,.582],aa=20,yc=new wg,Ip=new Ye;let bc=null,Sc=0,xc=0,wc=!1;const ta=(1+Math.sqrt(5))/2,Fa=1/ta,kp=[new L(-ta,Fa,0),new L(ta,Fa,0),new L(-Fa,0,ta),new L(Fa,0,ta),new L(0,ta,-Fa),new L(0,ta,Fa),new L(-1,1,-1),new L(1,1,-1),new L(-1,1,1),new L(1,1,1)],BE=new L;class Dp{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,a=100,s={}){const{size:r=256,position:o=BE}=s;bc=this._renderer.getRenderTarget(),Sc=this._renderer.getActiveCubeFace(),xc=this._renderer.getActiveMipmapLevel(),wc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(r);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,a,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Up(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Op(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(bc,Sc,xc),this._renderer.xr.enabled=wc,e.scissorTest=!1,oo(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ps||e.mapping===hs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),bc=this._renderer.getRenderTarget(),Sc=this._renderer.getActiveCubeFace(),xc=this._renderer.getActiveMipmapLevel(),wc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:jn,minFilter:jn,generateMipmaps:!1,type:wr,format:On,colorSpace:ms,depthBuffer:!1},a=Fp(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Fp(e,t,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=zE(s)),this._blurMaterial=HE(s,e,t)}return a}_compileMaterial(e){const t=new ze(this._lodPlanes[0],e);this._renderer.compile(t,yc)}_sceneToCubeUV(e,t,i,a,s){const l=new bn(90,1,t,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,f=d.autoClear,p=d.toneMapping;d.getClearColor(Ip),d.toneMapping=Fi,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(a),d.clearDepth(),d.setRenderTarget(null));const g=new ct({name:"PMREM.Background",side:sn,depthWrite:!1,depthTest:!1}),m=new ze(new xn,g);let h=!1;const y=e.background;y?y.isColor&&(g.color.copy(y),e.background=null,h=!0):(g.color.copy(Ip),h=!0);for(let x=0;x<6;x++){const b=x%3;b===0?(l.up.set(0,c[x],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[x],s.y,s.z)):b===1?(l.up.set(0,0,c[x]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[x],s.z)):(l.up.set(0,c[x],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[x]));const A=this._cubeSize;oo(a,b*A,x>2?A:0,A,A),d.setRenderTarget(a),h&&d.render(m,l),d.render(e,l)}m.geometry.dispose(),m.material.dispose(),d.toneMapping=p,d.autoClear=f,e.background=y}_textureToCubeUV(e,t){const i=this._renderer,a=e.mapping===ps||e.mapping===hs;a?(this._cubemapMaterial===null&&(this._cubemapMaterial=Up()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Op());const s=a?this._cubemapMaterial:this._equirectMaterial,r=new ze(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;oo(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(r,yc)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const a=this._lodPlanes.length;for(let s=1;s<a;s++){const r=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=kp[(a-s-1)%kp.length];this._blur(e,s-1,s,r,o)}t.autoClear=i}_blur(e,t,i,a,s){const r=this._pingPongRenderTarget;this._halfBlur(e,r,t,i,a,"latitudinal",s),this._halfBlur(r,e,i,i,a,"longitudinal",s)}_halfBlur(e,t,i,a,s,r,o){const l=this._renderer,c=this._blurMaterial;r!=="latitudinal"&&r!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,d=new ze(this._lodPlanes[a],c),f=c.uniforms,p=this._sizeLods[i]-1,_=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*aa-1),g=s/_,m=isFinite(s)?1+Math.floor(u*g):aa;m>aa&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${aa}`);const h=[];let y=0;for(let T=0;T<aa;++T){const C=T/g,v=Math.exp(-C*C/2);h.push(v),T===0?y+=v:T<m&&(y+=2*v)}for(let T=0;T<h.length;T++)h[T]=h[T]/y;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=h,f.latitudinal.value=r==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:x}=this;f.dTheta.value=_,f.mipInt.value=x-i;const b=this._sizeLods[a],A=3*b*(a>x-Wa?a-x+Wa:0),M=4*(this._cubeSize-b);oo(t,A,M,3*b,2*b),l.setRenderTarget(t),l.render(d,yc)}}function zE(n){const e=[],t=[],i=[];let a=n;const s=n-Wa+1+Np.length;for(let r=0;r<s;r++){const o=Math.pow(2,a);t.push(o);let l=1/o;r>n-Wa?l=Np[r-n+Wa-1]:r===0&&(l=0),i.push(l);const c=1/(o-2),u=-c,d=1+c,f=[u,u,d,u,d,d,u,u,d,d,u,d],p=6,_=6,g=3,m=2,h=1,y=new Float32Array(g*_*p),x=new Float32Array(m*_*p),b=new Float32Array(h*_*p);for(let M=0;M<p;M++){const T=M%3*2/3-1,C=M>2?0:-1,v=[T,C,0,T+2/3,C,0,T+2/3,C+1,0,T,C,0,T+2/3,C+1,0,T,C+1,0];y.set(v,g*_*M),x.set(f,m*_*M);const S=[M,M,M,M,M,M];b.set(S,h*_*M)}const A=new Dt;A.setAttribute("position",new zn(y,g)),A.setAttribute("uv",new zn(x,m)),A.setAttribute("faceIndex",new zn(b,h)),e.push(A),a>Wa&&a--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function Fp(n,e,t){const i=new pa(n,e,t);return i.texture.mapping=Ml,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function oo(n,e,t,i,a){n.viewport.set(e,t,i,a),n.scissor.set(e,t,i,a)}function HE(n,e,t){const i=new Float32Array(aa),a=new L(0,1,0);return new zi({name:"SphericalGaussianBlur",defines:{n:aa,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:a}},vertexShader:ff(),fragmentShader:`

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
		`,blending:ki,depthTest:!1,depthWrite:!1})}function Op(){return new zi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ff(),fragmentShader:`

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
		`,blending:ki,depthTest:!1,depthWrite:!1})}function Up(){return new zi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ff(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ki,depthTest:!1,depthWrite:!1})}function ff(){return`

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
	`}function VE(n){let e=new WeakMap,t=null;function i(o){if(o&&o.isTexture){const l=o.mapping,c=l===xu||l===wu,u=l===ps||l===hs;if(c||u){let d=e.get(o);const f=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==f)return t===null&&(t=new Dp(n)),d=c?t.fromEquirectangular(o,d):t.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),d.texture;if(d!==void 0)return d.texture;{const p=o.image;return c&&p&&p.height>0||u&&p&&a(p)?(t===null&&(t=new Dp(n)),d=c?t.fromEquirectangular(o):t.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),o.addEventListener("dispose",s),d.texture):null}}}return o}function a(o){let l=0;const c=6;for(let u=0;u<c;u++)o[u]!==void 0&&l++;return l===c}function s(o){const l=o.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function r(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:r}}function GE(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let a;switch(i){case"WEBGL_depth_texture":a=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":a=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":a=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":a=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:a=n.getExtension(i)}return e[i]=a,a}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const a=t(i);return a===null&&lr("THREE.WebGLRenderer: "+i+" extension not supported."),a}}}function $E(n,e,t,i){const a={},s=new WeakMap;function r(d){const f=d.target;f.index!==null&&e.remove(f.index);for(const _ in f.attributes)e.remove(f.attributes[_]);f.removeEventListener("dispose",r),delete a[f.id];const p=s.get(f);p&&(e.remove(p),s.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function o(d,f){return a[f.id]===!0||(f.addEventListener("dispose",r),a[f.id]=!0,t.memory.geometries++),f}function l(d){const f=d.attributes;for(const p in f)e.update(f[p],n.ARRAY_BUFFER)}function c(d){const f=[],p=d.index,_=d.attributes.position;let g=0;if(p!==null){const y=p.array;g=p.version;for(let x=0,b=y.length;x<b;x+=3){const A=y[x+0],M=y[x+1],T=y[x+2];f.push(A,M,M,T,T,A)}}else if(_!==void 0){const y=_.array;g=_.version;for(let x=0,b=y.length/3-1;x<b;x+=3){const A=x+0,M=x+1,T=x+2;f.push(A,M,M,T,T,A)}}else return;const m=new(Q_(f)?ag:ig)(f,1);m.version=g;const h=s.get(d);h&&e.remove(h),s.set(d,m)}function u(d){const f=s.get(d);if(f){const p=d.index;p!==null&&f.version<p.version&&c(d)}else c(d);return s.get(d)}return{get:o,update:l,getWireframeAttribute:u}}function WE(n,e,t){let i;function a(f){i=f}let s,r;function o(f){s=f.type,r=f.bytesPerElement}function l(f,p){n.drawElements(i,p,s,f*r),t.update(p,i,1)}function c(f,p,_){_!==0&&(n.drawElementsInstanced(i,p,s,f*r,_),t.update(p,i,_))}function u(f,p,_){if(_===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,s,f,0,_);let m=0;for(let h=0;h<_;h++)m+=p[h];t.update(m,i,1)}function d(f,p,_,g){if(_===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let h=0;h<f.length;h++)c(f[h]/r,p[h],g[h]);else{m.multiDrawElementsInstancedWEBGL(i,p,0,s,f,0,g,0,_);let h=0;for(let y=0;y<_;y++)h+=p[y]*g[y];t.update(h,i,1)}}this.setMode=a,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function XE(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,r,o){switch(t.calls++,r){case n.TRIANGLES:t.triangles+=o*(s/3);break;case n.LINES:t.lines+=o*(s/2);break;case n.LINE_STRIP:t.lines+=o*(s-1);break;case n.LINE_LOOP:t.lines+=o*s;break;case n.POINTS:t.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",r);break}}function a(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:a,update:i}}function qE(n,e,t){const i=new WeakMap,a=new Mt;function s(r,o,l){const c=r.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u!==void 0?u.length:0;let f=i.get(o);if(f===void 0||f.count!==d){let v=function(){T.dispose(),i.delete(o),o.removeEventListener("dispose",v)};f!==void 0&&f.texture.dispose();const p=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,g=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],h=o.morphAttributes.normal||[],y=o.morphAttributes.color||[];let x=0;p===!0&&(x=1),_===!0&&(x=2),g===!0&&(x=3);let b=o.attributes.position.count*x,A=1;b>e.maxTextureSize&&(A=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);const M=new Float32Array(b*A*4*d),T=new eg(M,b,A,d);T.type=vi,T.needsUpdate=!0;const C=x*4;for(let S=0;S<d;S++){const R=m[S],I=h[S],U=y[S],B=b*A*4*S;for(let G=0;G<R.count;G++){const z=G*C;p===!0&&(a.fromBufferAttribute(R,G),M[B+z+0]=a.x,M[B+z+1]=a.y,M[B+z+2]=a.z,M[B+z+3]=0),_===!0&&(a.fromBufferAttribute(I,G),M[B+z+4]=a.x,M[B+z+5]=a.y,M[B+z+6]=a.z,M[B+z+7]=0),g===!0&&(a.fromBufferAttribute(U,G),M[B+z+8]=a.x,M[B+z+9]=a.y,M[B+z+10]=a.z,M[B+z+11]=U.itemSize===4?a.w:1)}}f={count:d,texture:T,size:new le(b,A)},i.set(o,f),o.addEventListener("dispose",v)}if(r.isInstancedMesh===!0&&r.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",r.morphTexture,t);else{let p=0;for(let g=0;g<c.length;g++)p+=c[g];const _=o.morphTargetsRelative?1:1-p;l.getUniforms().setValue(n,"morphTargetBaseInfluence",_),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:s}}function KE(n,e,t,i){let a=new WeakMap;function s(l){const c=i.render.frame,u=l.geometry,d=e.get(l,u);if(a.get(d)!==c&&(e.update(d),a.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),a.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),a.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;a.get(f)!==c&&(f.update(),a.set(f,c))}return d}function r(){a=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:r}}const Mg=new jt,Bp=new dg(1,1),Tg=new eg,Cg=new Bb,Ag=new og,zp=[],Hp=[],Vp=new Float32Array(16),Gp=new Float32Array(9),$p=new Float32Array(4);function Ss(n,e,t){const i=n[0];if(i<=0||i>0)return n;const a=e*t;let s=zp[a];if(s===void 0&&(s=new Float32Array(a),zp[a]=s),e!==0){i.toArray(s,0);for(let r=1,o=0;r!==e;++r)o+=t,n[r].toArray(s,o)}return s}function It(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function kt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Ll(n,e){let t=Hp[e];t===void 0&&(t=new Int32Array(e),Hp[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function YE(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function jE(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(It(t,e))return;n.uniform2fv(this.addr,e),kt(t,e)}}function ZE(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(It(t,e))return;n.uniform3fv(this.addr,e),kt(t,e)}}function JE(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(It(t,e))return;n.uniform4fv(this.addr,e),kt(t,e)}}function QE(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(It(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),kt(t,e)}else{if(It(t,i))return;$p.set(i),n.uniformMatrix2fv(this.addr,!1,$p),kt(t,i)}}function eM(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(It(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),kt(t,e)}else{if(It(t,i))return;Gp.set(i),n.uniformMatrix3fv(this.addr,!1,Gp),kt(t,i)}}function tM(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(It(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),kt(t,e)}else{if(It(t,i))return;Vp.set(i),n.uniformMatrix4fv(this.addr,!1,Vp),kt(t,i)}}function nM(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function iM(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(It(t,e))return;n.uniform2iv(this.addr,e),kt(t,e)}}function aM(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(It(t,e))return;n.uniform3iv(this.addr,e),kt(t,e)}}function sM(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(It(t,e))return;n.uniform4iv(this.addr,e),kt(t,e)}}function rM(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function oM(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(It(t,e))return;n.uniform2uiv(this.addr,e),kt(t,e)}}function lM(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(It(t,e))return;n.uniform3uiv(this.addr,e),kt(t,e)}}function cM(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(It(t,e))return;n.uniform4uiv(this.addr,e),kt(t,e)}}function uM(n,e,t){const i=this.cache,a=t.allocateTextureUnit();i[0]!==a&&(n.uniform1i(this.addr,a),i[0]=a);let s;this.type===n.SAMPLER_2D_SHADOW?(Bp.compareFunction=J_,s=Bp):s=Mg,t.setTexture2D(e||s,a)}function dM(n,e,t){const i=this.cache,a=t.allocateTextureUnit();i[0]!==a&&(n.uniform1i(this.addr,a),i[0]=a),t.setTexture3D(e||Cg,a)}function fM(n,e,t){const i=this.cache,a=t.allocateTextureUnit();i[0]!==a&&(n.uniform1i(this.addr,a),i[0]=a),t.setTextureCube(e||Ag,a)}function pM(n,e,t){const i=this.cache,a=t.allocateTextureUnit();i[0]!==a&&(n.uniform1i(this.addr,a),i[0]=a),t.setTexture2DArray(e||Tg,a)}function hM(n){switch(n){case 5126:return YE;case 35664:return jE;case 35665:return ZE;case 35666:return JE;case 35674:return QE;case 35675:return eM;case 35676:return tM;case 5124:case 35670:return nM;case 35667:case 35671:return iM;case 35668:case 35672:return aM;case 35669:case 35673:return sM;case 5125:return rM;case 36294:return oM;case 36295:return lM;case 36296:return cM;case 35678:case 36198:case 36298:case 36306:case 35682:return uM;case 35679:case 36299:case 36307:return dM;case 35680:case 36300:case 36308:case 36293:return fM;case 36289:case 36303:case 36311:case 36292:return pM}}function mM(n,e){n.uniform1fv(this.addr,e)}function _M(n,e){const t=Ss(e,this.size,2);n.uniform2fv(this.addr,t)}function gM(n,e){const t=Ss(e,this.size,3);n.uniform3fv(this.addr,t)}function vM(n,e){const t=Ss(e,this.size,4);n.uniform4fv(this.addr,t)}function yM(n,e){const t=Ss(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function bM(n,e){const t=Ss(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function SM(n,e){const t=Ss(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function xM(n,e){n.uniform1iv(this.addr,e)}function wM(n,e){n.uniform2iv(this.addr,e)}function EM(n,e){n.uniform3iv(this.addr,e)}function MM(n,e){n.uniform4iv(this.addr,e)}function TM(n,e){n.uniform1uiv(this.addr,e)}function CM(n,e){n.uniform2uiv(this.addr,e)}function AM(n,e){n.uniform3uiv(this.addr,e)}function RM(n,e){n.uniform4uiv(this.addr,e)}function PM(n,e,t){const i=this.cache,a=e.length,s=Ll(t,a);It(i,s)||(n.uniform1iv(this.addr,s),kt(i,s));for(let r=0;r!==a;++r)t.setTexture2D(e[r]||Mg,s[r])}function LM(n,e,t){const i=this.cache,a=e.length,s=Ll(t,a);It(i,s)||(n.uniform1iv(this.addr,s),kt(i,s));for(let r=0;r!==a;++r)t.setTexture3D(e[r]||Cg,s[r])}function NM(n,e,t){const i=this.cache,a=e.length,s=Ll(t,a);It(i,s)||(n.uniform1iv(this.addr,s),kt(i,s));for(let r=0;r!==a;++r)t.setTextureCube(e[r]||Ag,s[r])}function IM(n,e,t){const i=this.cache,a=e.length,s=Ll(t,a);It(i,s)||(n.uniform1iv(this.addr,s),kt(i,s));for(let r=0;r!==a;++r)t.setTexture2DArray(e[r]||Tg,s[r])}function kM(n){switch(n){case 5126:return mM;case 35664:return _M;case 35665:return gM;case 35666:return vM;case 35674:return yM;case 35675:return bM;case 35676:return SM;case 5124:case 35670:return xM;case 35667:case 35671:return wM;case 35668:case 35672:return EM;case 35669:case 35673:return MM;case 5125:return TM;case 36294:return CM;case 36295:return AM;case 36296:return RM;case 35678:case 36198:case 36298:case 36306:case 35682:return PM;case 35679:case 36299:case 36307:return LM;case 35680:case 36300:case 36308:case 36293:return NM;case 36289:case 36303:case 36311:case 36292:return IM}}class DM{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=hM(t.type)}}class FM{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=kM(t.type)}}class OM{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const a=this.seq;for(let s=0,r=a.length;s!==r;++s){const o=a[s];o.setValue(e,t[o.id],i)}}}const Ec=/(\w+)(\])?(\[|\.)?/g;function Wp(n,e){n.seq.push(e),n.map[e.id]=e}function UM(n,e,t){const i=n.name,a=i.length;for(Ec.lastIndex=0;;){const s=Ec.exec(i),r=Ec.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&r+2===a){Wp(t,c===void 0?new DM(o,n,e):new FM(o,n,e));break}else{let d=t.map[o];d===void 0&&(d=new OM(o),Wp(t,d)),t=d}}}class Uo{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const s=e.getActiveUniform(t,a),r=e.getUniformLocation(t,s.name);UM(s,r,this)}}setValue(e,t,i,a){const s=this.map[t];s!==void 0&&s.setValue(e,i,a)}setOptional(e,t,i){const a=t[i];a!==void 0&&this.setValue(e,i,a)}static upload(e,t,i,a){for(let s=0,r=t.length;s!==r;++s){const o=t[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,a)}}static seqWithValue(e,t){const i=[];for(let a=0,s=e.length;a!==s;++a){const r=e[a];r.id in t&&i.push(r)}return i}}function Xp(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const BM=37297;let zM=0;function HM(n,e){const t=n.split(`
`),i=[],a=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let r=a;r<s;r++){const o=r+1;i.push(`${o===e?">":" "} ${o}: ${t[r]}`)}return i.join(`
`)}const qp=new $e;function VM(n){Qe._getMatrix(qp,Qe.workingColorSpace,n);const e=`mat3( ${qp.elements.map(t=>t.toFixed(4))} )`;switch(Qe.getTransfer(n)){case nl:return[e,"LinearTransferOETF"];case ot:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Kp(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+HM(n.getShaderSource(e),o)}else return s}function GM(n,e){const t=VM(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function $M(n,e){let t;switch(e){case J0:t="Linear";break;case Q0:t="Reinhard";break;case eb:t="Cineon";break;case tb:t="ACESFilmic";break;case ib:t="AgX";break;case ab:t="Neutral";break;case nb:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const lo=new L;function WM(){Qe.getLuminanceCoefficients(lo);const n=lo.x.toFixed(4),e=lo.y.toFixed(4),t=lo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function XM(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Hs).join(`
`)}function qM(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function KM(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let a=0;a<i;a++){const s=n.getActiveAttrib(e,a),r=s.name;let o=1;s.type===n.FLOAT_MAT2&&(o=2),s.type===n.FLOAT_MAT3&&(o=3),s.type===n.FLOAT_MAT4&&(o=4),t[r]={type:s.type,location:n.getAttribLocation(e,r),locationSize:o}}return t}function Hs(n){return n!==""}function Yp(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function jp(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const YM=/^[ \t]*#include +<([\w\d./]+)>/gm;function id(n){return n.replace(YM,ZM)}const jM=new Map;function ZM(n,e){let t=Xe[e];if(t===void 0){const i=jM.get(e);if(i!==void 0)t=Xe[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return id(t)}const JM=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Zp(n){return n.replace(JM,QM)}function QM(n,e,t,i){let a="";for(let s=parseInt(e);s<parseInt(t);s++)a+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return a}function Jp(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}function eT(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===V_?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===L0?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===hi&&(e="SHADOWMAP_TYPE_VSM"),e}function tT(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case ps:case hs:e="ENVMAP_TYPE_CUBE";break;case Ml:e="ENVMAP_TYPE_CUBE_UV";break}return e}function nT(n){let e="ENVMAP_MODE_REFLECTION";return n.envMap&&n.envMapMode===hs&&(e="ENVMAP_MODE_REFRACTION"),e}function iT(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case El:e="ENVMAP_BLENDING_MULTIPLY";break;case j0:e="ENVMAP_BLENDING_MIX";break;case Z0:e="ENVMAP_BLENDING_ADD";break}return e}function aT(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function sT(n,e,t,i){const a=n.getContext(),s=t.defines;let r=t.vertexShader,o=t.fragmentShader;const l=eT(t),c=tT(t),u=nT(t),d=iT(t),f=aT(t),p=XM(t),_=qM(s),g=a.createProgram();let m,h,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Hs).join(`
`),m.length>0&&(m+=`
`),h=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Hs).join(`
`),h.length>0&&(h+=`
`)):(m=[Jp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Hs).join(`
`),h=[Jp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Fi?"#define TONE_MAPPING":"",t.toneMapping!==Fi?Xe.tonemapping_pars_fragment:"",t.toneMapping!==Fi?$M("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Xe.colorspace_pars_fragment,GM("linearToOutputTexel",t.outputColorSpace),WM(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Hs).join(`
`)),r=id(r),r=Yp(r,t),r=jp(r,t),o=id(o),o=Yp(o,t),o=jp(o,t),r=Zp(r),o=Zp(o),t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,h=["#define varying in",t.glslVersion===Yf?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Yf?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);const x=y+m+r,b=y+h+o,A=Xp(a,a.VERTEX_SHADER,x),M=Xp(a,a.FRAGMENT_SHADER,b);a.attachShader(g,A),a.attachShader(g,M),t.index0AttributeName!==void 0?a.bindAttribLocation(g,0,t.index0AttributeName):t.morphTargets===!0&&a.bindAttribLocation(g,0,"position"),a.linkProgram(g);function T(R){if(n.debug.checkShaderErrors){const I=a.getProgramInfoLog(g)||"",U=a.getShaderInfoLog(A)||"",B=a.getShaderInfoLog(M)||"",G=I.trim(),z=U.trim(),X=B.trim();let V=!0,ee=!0;if(a.getProgramParameter(g,a.LINK_STATUS)===!1)if(V=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(a,g,A,M);else{const fe=Kp(a,A,"vertex"),q=Kp(a,M,"fragment");console.error("THREE.WebGLProgram: Shader Error "+a.getError()+" - VALIDATE_STATUS "+a.getProgramParameter(g,a.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+G+`
`+fe+`
`+q)}else G!==""?console.warn("THREE.WebGLProgram: Program Info Log:",G):(z===""||X==="")&&(ee=!1);ee&&(R.diagnostics={runnable:V,programLog:G,vertexShader:{log:z,prefix:m},fragmentShader:{log:X,prefix:h}})}a.deleteShader(A),a.deleteShader(M),C=new Uo(a,g),v=KM(a,g)}let C;this.getUniforms=function(){return C===void 0&&T(this),C};let v;this.getAttributes=function(){return v===void 0&&T(this),v};let S=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=a.getProgramParameter(g,BM)),S},this.destroy=function(){i.releaseStatesOfProgram(this),a.deleteProgram(g),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=zM++,this.cacheKey=e,this.usedTimes=1,this.program=g,this.vertexShader=A,this.fragmentShader=M,this}let rT=0;class oT{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,a=this._getShaderStage(t),s=this._getShaderStage(i),r=this._getShaderCacheForMaterial(e);return r.has(a)===!1&&(r.add(a),a.usedTimes++),r.has(s)===!1&&(r.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new lT(e),t.set(e,i)),i}}class lT{constructor(e){this.id=rT++,this.code=e,this.usedTimes=0}}function cT(n,e,t,i,a,s,r){const o=new tg,l=new oT,c=new Set,u=[],d=a.logarithmicDepthBuffer,f=a.vertexTextures;let p=a.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(v){return c.add(v),v===0?"uv":`uv${v}`}function m(v,S,R,I,U){const B=I.fog,G=U.geometry,z=v.isMeshStandardMaterial?I.environment:null,X=(v.isMeshStandardMaterial?t:e).get(v.envMap||z),V=X&&X.mapping===Ml?X.image.height:null,ee=_[v.type];v.precision!==null&&(p=a.getMaxPrecision(v.precision),p!==v.precision&&console.warn("THREE.WebGLProgram.getParameters:",v.precision,"not supported, using",p,"instead."));const fe=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,q=fe!==void 0?fe.length:0;let ue=0;G.morphAttributes.position!==void 0&&(ue=1),G.morphAttributes.normal!==void 0&&(ue=2),G.morphAttributes.color!==void 0&&(ue=3);let xe,ye,he,O;if(ee){const tt=qn[ee];xe=tt.vertexShader,ye=tt.fragmentShader}else xe=v.vertexShader,ye=v.fragmentShader,l.update(v),he=l.getVertexShaderID(v),O=l.getFragmentShaderID(v);const K=n.getRenderTarget(),te=n.state.buffers.depth.getReversed(),Se=U.isInstancedMesh===!0,ve=U.isBatchedMesh===!0,De=!!v.map,at=!!v.matcap,N=!!X,st=!!v.aoMap,Ve=!!v.lightMap,Ue=!!v.bumpMap,Te=!!v.normalMap,_t=!!v.displacementMap,Ce=!!v.emissiveMap,We=!!v.metalnessMap,Ft=!!v.roughnessMap,Tt=v.anisotropy>0,P=v.clearcoat>0,w=v.dispersion>0,H=v.iridescence>0,Z=v.sheen>0,Q=v.transmission>0,Y=Tt&&!!v.anisotropyMap,Le=P&&!!v.clearcoatMap,oe=P&&!!v.clearcoatNormalMap,Ae=P&&!!v.clearcoatRoughnessMap,Re=H&&!!v.iridescenceMap,se=H&&!!v.iridescenceThicknessMap,_e=Z&&!!v.sheenColorMap,Fe=Z&&!!v.sheenRoughnessMap,Pe=!!v.specularMap,pe=!!v.specularColorMap,Ge=!!v.specularIntensityMap,k=Q&&!!v.transmissionMap,re=Q&&!!v.thicknessMap,ce=!!v.gradientMap,we=!!v.alphaMap,ie=v.alphaTest>0,J=!!v.alphaHash,Me=!!v.extensions;let He=Fi;v.toneMapped&&(K===null||K.isXRRenderTarget===!0)&&(He=n.toneMapping);const ft={shaderID:ee,shaderType:v.type,shaderName:v.name,vertexShader:xe,fragmentShader:ye,defines:v.defines,customVertexShaderID:he,customFragmentShaderID:O,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:p,batching:ve,batchingColor:ve&&U._colorsTexture!==null,instancing:Se,instancingColor:Se&&U.instanceColor!==null,instancingMorph:Se&&U.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:K===null?n.outputColorSpace:K.isXRRenderTarget===!0?K.texture.colorSpace:ms,alphaToCoverage:!!v.alphaToCoverage,map:De,matcap:at,envMap:N,envMapMode:N&&X.mapping,envMapCubeUVHeight:V,aoMap:st,lightMap:Ve,bumpMap:Ue,normalMap:Te,displacementMap:f&&_t,emissiveMap:Ce,normalMapObjectSpace:Te&&v.normalMapType===lb,normalMapTangentSpace:Te&&v.normalMapType===nf,metalnessMap:We,roughnessMap:Ft,anisotropy:Tt,anisotropyMap:Y,clearcoat:P,clearcoatMap:Le,clearcoatNormalMap:oe,clearcoatRoughnessMap:Ae,dispersion:w,iridescence:H,iridescenceMap:Re,iridescenceThicknessMap:se,sheen:Z,sheenColorMap:_e,sheenRoughnessMap:Fe,specularMap:Pe,specularColorMap:pe,specularIntensityMap:Ge,transmission:Q,transmissionMap:k,thicknessMap:re,gradientMap:ce,opaque:v.transparent===!1&&v.blending===Za&&v.alphaToCoverage===!1,alphaMap:we,alphaTest:ie,alphaHash:J,combine:v.combine,mapUv:De&&g(v.map.channel),aoMapUv:st&&g(v.aoMap.channel),lightMapUv:Ve&&g(v.lightMap.channel),bumpMapUv:Ue&&g(v.bumpMap.channel),normalMapUv:Te&&g(v.normalMap.channel),displacementMapUv:_t&&g(v.displacementMap.channel),emissiveMapUv:Ce&&g(v.emissiveMap.channel),metalnessMapUv:We&&g(v.metalnessMap.channel),roughnessMapUv:Ft&&g(v.roughnessMap.channel),anisotropyMapUv:Y&&g(v.anisotropyMap.channel),clearcoatMapUv:Le&&g(v.clearcoatMap.channel),clearcoatNormalMapUv:oe&&g(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ae&&g(v.clearcoatRoughnessMap.channel),iridescenceMapUv:Re&&g(v.iridescenceMap.channel),iridescenceThicknessMapUv:se&&g(v.iridescenceThicknessMap.channel),sheenColorMapUv:_e&&g(v.sheenColorMap.channel),sheenRoughnessMapUv:Fe&&g(v.sheenRoughnessMap.channel),specularMapUv:Pe&&g(v.specularMap.channel),specularColorMapUv:pe&&g(v.specularColorMap.channel),specularIntensityMapUv:Ge&&g(v.specularIntensityMap.channel),transmissionMapUv:k&&g(v.transmissionMap.channel),thicknessMapUv:re&&g(v.thicknessMap.channel),alphaMapUv:we&&g(v.alphaMap.channel),vertexTangents:!!G.attributes.tangent&&(Te||Tt),vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,pointsUvs:U.isPoints===!0&&!!G.attributes.uv&&(De||we),fog:!!B,useFog:v.fog===!0,fogExp2:!!B&&B.isFogExp2,flatShading:v.flatShading===!0&&v.wireframe===!1,sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:te,skinning:U.isSkinnedMesh===!0,morphTargets:G.morphAttributes.position!==void 0,morphNormals:G.morphAttributes.normal!==void 0,morphColors:G.morphAttributes.color!==void 0,morphTargetsCount:q,morphTextureStride:ue,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:v.dithering,shadowMapEnabled:n.shadowMap.enabled&&R.length>0,shadowMapType:n.shadowMap.type,toneMapping:He,decodeVideoTexture:De&&v.map.isVideoTexture===!0&&Qe.getTransfer(v.map.colorSpace)===ot,decodeVideoTextureEmissive:Ce&&v.emissiveMap.isVideoTexture===!0&&Qe.getTransfer(v.emissiveMap.colorSpace)===ot,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===et,flipSided:v.side===sn,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:Me&&v.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Me&&v.extensions.multiDraw===!0||ve)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return ft.vertexUv1s=c.has(1),ft.vertexUv2s=c.has(2),ft.vertexUv3s=c.has(3),c.clear(),ft}function h(v){const S=[];if(v.shaderID?S.push(v.shaderID):(S.push(v.customVertexShaderID),S.push(v.customFragmentShaderID)),v.defines!==void 0)for(const R in v.defines)S.push(R),S.push(v.defines[R]);return v.isRawShaderMaterial===!1&&(y(S,v),x(S,v),S.push(n.outputColorSpace)),S.push(v.customProgramCacheKey),S.join()}function y(v,S){v.push(S.precision),v.push(S.outputColorSpace),v.push(S.envMapMode),v.push(S.envMapCubeUVHeight),v.push(S.mapUv),v.push(S.alphaMapUv),v.push(S.lightMapUv),v.push(S.aoMapUv),v.push(S.bumpMapUv),v.push(S.normalMapUv),v.push(S.displacementMapUv),v.push(S.emissiveMapUv),v.push(S.metalnessMapUv),v.push(S.roughnessMapUv),v.push(S.anisotropyMapUv),v.push(S.clearcoatMapUv),v.push(S.clearcoatNormalMapUv),v.push(S.clearcoatRoughnessMapUv),v.push(S.iridescenceMapUv),v.push(S.iridescenceThicknessMapUv),v.push(S.sheenColorMapUv),v.push(S.sheenRoughnessMapUv),v.push(S.specularMapUv),v.push(S.specularColorMapUv),v.push(S.specularIntensityMapUv),v.push(S.transmissionMapUv),v.push(S.thicknessMapUv),v.push(S.combine),v.push(S.fogExp2),v.push(S.sizeAttenuation),v.push(S.morphTargetsCount),v.push(S.morphAttributeCount),v.push(S.numDirLights),v.push(S.numPointLights),v.push(S.numSpotLights),v.push(S.numSpotLightMaps),v.push(S.numHemiLights),v.push(S.numRectAreaLights),v.push(S.numDirLightShadows),v.push(S.numPointLightShadows),v.push(S.numSpotLightShadows),v.push(S.numSpotLightShadowsWithMaps),v.push(S.numLightProbes),v.push(S.shadowMapType),v.push(S.toneMapping),v.push(S.numClippingPlanes),v.push(S.numClipIntersection),v.push(S.depthPacking)}function x(v,S){o.disableAll(),S.supportsVertexTextures&&o.enable(0),S.instancing&&o.enable(1),S.instancingColor&&o.enable(2),S.instancingMorph&&o.enable(3),S.matcap&&o.enable(4),S.envMap&&o.enable(5),S.normalMapObjectSpace&&o.enable(6),S.normalMapTangentSpace&&o.enable(7),S.clearcoat&&o.enable(8),S.iridescence&&o.enable(9),S.alphaTest&&o.enable(10),S.vertexColors&&o.enable(11),S.vertexAlphas&&o.enable(12),S.vertexUv1s&&o.enable(13),S.vertexUv2s&&o.enable(14),S.vertexUv3s&&o.enable(15),S.vertexTangents&&o.enable(16),S.anisotropy&&o.enable(17),S.alphaHash&&o.enable(18),S.batching&&o.enable(19),S.dispersion&&o.enable(20),S.batchingColor&&o.enable(21),S.gradientMap&&o.enable(22),v.push(o.mask),o.disableAll(),S.fog&&o.enable(0),S.useFog&&o.enable(1),S.flatShading&&o.enable(2),S.logarithmicDepthBuffer&&o.enable(3),S.reversedDepthBuffer&&o.enable(4),S.skinning&&o.enable(5),S.morphTargets&&o.enable(6),S.morphNormals&&o.enable(7),S.morphColors&&o.enable(8),S.premultipliedAlpha&&o.enable(9),S.shadowMapEnabled&&o.enable(10),S.doubleSided&&o.enable(11),S.flipSided&&o.enable(12),S.useDepthPacking&&o.enable(13),S.dithering&&o.enable(14),S.transmission&&o.enable(15),S.sheen&&o.enable(16),S.opaque&&o.enable(17),S.pointsUvs&&o.enable(18),S.decodeVideoTexture&&o.enable(19),S.decodeVideoTextureEmissive&&o.enable(20),S.alphaToCoverage&&o.enable(21),v.push(o.mask)}function b(v){const S=_[v.type];let R;if(S){const I=qn[S];R=Jb.clone(I.uniforms)}else R=v.uniforms;return R}function A(v,S){let R;for(let I=0,U=u.length;I<U;I++){const B=u[I];if(B.cacheKey===S){R=B,++R.usedTimes;break}}return R===void 0&&(R=new sT(n,S,v,s),u.push(R)),R}function M(v){if(--v.usedTimes===0){const S=u.indexOf(v);u[S]=u[u.length-1],u.pop(),v.destroy()}}function T(v){l.remove(v)}function C(){l.dispose()}return{getParameters:m,getProgramCacheKey:h,getUniforms:b,acquireProgram:A,releaseProgram:M,releaseShaderCache:T,programs:u,dispose:C}}function uT(){let n=new WeakMap;function e(r){return n.has(r)}function t(r){let o=n.get(r);return o===void 0&&(o={},n.set(r,o)),o}function i(r){n.delete(r)}function a(r,o,l){n.get(r)[o]=l}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:a,dispose:s}}function dT(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function Qp(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function eh(){const n=[];let e=0;const t=[],i=[],a=[];function s(){e=0,t.length=0,i.length=0,a.length=0}function r(d,f,p,_,g,m){let h=n[e];return h===void 0?(h={id:d.id,object:d,geometry:f,material:p,groupOrder:_,renderOrder:d.renderOrder,z:g,group:m},n[e]=h):(h.id=d.id,h.object=d,h.geometry=f,h.material=p,h.groupOrder=_,h.renderOrder=d.renderOrder,h.z=g,h.group=m),e++,h}function o(d,f,p,_,g,m){const h=r(d,f,p,_,g,m);p.transmission>0?i.push(h):p.transparent===!0?a.push(h):t.push(h)}function l(d,f,p,_,g,m){const h=r(d,f,p,_,g,m);p.transmission>0?i.unshift(h):p.transparent===!0?a.unshift(h):t.unshift(h)}function c(d,f){t.length>1&&t.sort(d||dT),i.length>1&&i.sort(f||Qp),a.length>1&&a.sort(f||Qp)}function u(){for(let d=e,f=n.length;d<f;d++){const p=n[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:i,transparent:a,init:s,push:o,unshift:l,finish:u,sort:c}}function fT(){let n=new WeakMap;function e(i,a){const s=n.get(i);let r;return s===void 0?(r=new eh,n.set(i,[r])):a>=s.length?(r=new eh,s.push(r)):r=s[a],r}function t(){n=new WeakMap}return{get:e,dispose:t}}function pT(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new L,color:new Ye};break;case"SpotLight":t={position:new L,direction:new L,color:new Ye,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new L,color:new Ye,distance:0,decay:0};break;case"HemisphereLight":t={direction:new L,skyColor:new Ye,groundColor:new Ye};break;case"RectAreaLight":t={color:new Ye,position:new L,halfWidth:new L,halfHeight:new L};break}return n[e.id]=t,t}}}function hT(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new le};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new le};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new le,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let mT=0;function _T(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function gT(n){const e=new pT,t=hT(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new L);const a=new L,s=new yt,r=new yt;function o(c){let u=0,d=0,f=0;for(let v=0;v<9;v++)i.probe[v].set(0,0,0);let p=0,_=0,g=0,m=0,h=0,y=0,x=0,b=0,A=0,M=0,T=0;c.sort(_T);for(let v=0,S=c.length;v<S;v++){const R=c[v],I=R.color,U=R.intensity,B=R.distance,G=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)u+=I.r*U,d+=I.g*U,f+=I.b*U;else if(R.isLightProbe){for(let z=0;z<9;z++)i.probe[z].addScaledVector(R.sh.coefficients[z],U);T++}else if(R.isDirectionalLight){const z=e.get(R);if(z.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const X=R.shadow,V=t.get(R);V.shadowIntensity=X.intensity,V.shadowBias=X.bias,V.shadowNormalBias=X.normalBias,V.shadowRadius=X.radius,V.shadowMapSize=X.mapSize,i.directionalShadow[p]=V,i.directionalShadowMap[p]=G,i.directionalShadowMatrix[p]=R.shadow.matrix,y++}i.directional[p]=z,p++}else if(R.isSpotLight){const z=e.get(R);z.position.setFromMatrixPosition(R.matrixWorld),z.color.copy(I).multiplyScalar(U),z.distance=B,z.coneCos=Math.cos(R.angle),z.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),z.decay=R.decay,i.spot[g]=z;const X=R.shadow;if(R.map&&(i.spotLightMap[A]=R.map,A++,X.updateMatrices(R),R.castShadow&&M++),i.spotLightMatrix[g]=X.matrix,R.castShadow){const V=t.get(R);V.shadowIntensity=X.intensity,V.shadowBias=X.bias,V.shadowNormalBias=X.normalBias,V.shadowRadius=X.radius,V.shadowMapSize=X.mapSize,i.spotShadow[g]=V,i.spotShadowMap[g]=G,b++}g++}else if(R.isRectAreaLight){const z=e.get(R);z.color.copy(I).multiplyScalar(U),z.halfWidth.set(R.width*.5,0,0),z.halfHeight.set(0,R.height*.5,0),i.rectArea[m]=z,m++}else if(R.isPointLight){const z=e.get(R);if(z.color.copy(R.color).multiplyScalar(R.intensity),z.distance=R.distance,z.decay=R.decay,R.castShadow){const X=R.shadow,V=t.get(R);V.shadowIntensity=X.intensity,V.shadowBias=X.bias,V.shadowNormalBias=X.normalBias,V.shadowRadius=X.radius,V.shadowMapSize=X.mapSize,V.shadowCameraNear=X.camera.near,V.shadowCameraFar=X.camera.far,i.pointShadow[_]=V,i.pointShadowMap[_]=G,i.pointShadowMatrix[_]=R.shadow.matrix,x++}i.point[_]=z,_++}else if(R.isHemisphereLight){const z=e.get(R);z.skyColor.copy(R.color).multiplyScalar(U),z.groundColor.copy(R.groundColor).multiplyScalar(U),i.hemi[h]=z,h++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=de.LTC_FLOAT_1,i.rectAreaLTC2=de.LTC_FLOAT_2):(i.rectAreaLTC1=de.LTC_HALF_1,i.rectAreaLTC2=de.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=d,i.ambient[2]=f;const C=i.hash;(C.directionalLength!==p||C.pointLength!==_||C.spotLength!==g||C.rectAreaLength!==m||C.hemiLength!==h||C.numDirectionalShadows!==y||C.numPointShadows!==x||C.numSpotShadows!==b||C.numSpotMaps!==A||C.numLightProbes!==T)&&(i.directional.length=p,i.spot.length=g,i.rectArea.length=m,i.point.length=_,i.hemi.length=h,i.directionalShadow.length=y,i.directionalShadowMap.length=y,i.pointShadow.length=x,i.pointShadowMap.length=x,i.spotShadow.length=b,i.spotShadowMap.length=b,i.directionalShadowMatrix.length=y,i.pointShadowMatrix.length=x,i.spotLightMatrix.length=b+A-M,i.spotLightMap.length=A,i.numSpotLightShadowsWithMaps=M,i.numLightProbes=T,C.directionalLength=p,C.pointLength=_,C.spotLength=g,C.rectAreaLength=m,C.hemiLength=h,C.numDirectionalShadows=y,C.numPointShadows=x,C.numSpotShadows=b,C.numSpotMaps=A,C.numLightProbes=T,i.version=mT++)}function l(c,u){let d=0,f=0,p=0,_=0,g=0;const m=u.matrixWorldInverse;for(let h=0,y=c.length;h<y;h++){const x=c[h];if(x.isDirectionalLight){const b=i.directional[d];b.direction.setFromMatrixPosition(x.matrixWorld),a.setFromMatrixPosition(x.target.matrixWorld),b.direction.sub(a),b.direction.transformDirection(m),d++}else if(x.isSpotLight){const b=i.spot[p];b.position.setFromMatrixPosition(x.matrixWorld),b.position.applyMatrix4(m),b.direction.setFromMatrixPosition(x.matrixWorld),a.setFromMatrixPosition(x.target.matrixWorld),b.direction.sub(a),b.direction.transformDirection(m),p++}else if(x.isRectAreaLight){const b=i.rectArea[_];b.position.setFromMatrixPosition(x.matrixWorld),b.position.applyMatrix4(m),r.identity(),s.copy(x.matrixWorld),s.premultiply(m),r.extractRotation(s),b.halfWidth.set(x.width*.5,0,0),b.halfHeight.set(0,x.height*.5,0),b.halfWidth.applyMatrix4(r),b.halfHeight.applyMatrix4(r),_++}else if(x.isPointLight){const b=i.point[f];b.position.setFromMatrixPosition(x.matrixWorld),b.position.applyMatrix4(m),f++}else if(x.isHemisphereLight){const b=i.hemi[g];b.direction.setFromMatrixPosition(x.matrixWorld),b.direction.transformDirection(m),g++}}}return{setup:o,setupView:l,state:i}}function th(n){const e=new gT(n),t=[],i=[];function a(u){c.camera=u,t.length=0,i.length=0}function s(u){t.push(u)}function r(u){i.push(u)}function o(){e.setup(t)}function l(u){e.setupView(t,u)}const c={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:a,state:c,setupLights:o,setupLightsView:l,pushLight:s,pushShadow:r}}function vT(n){let e=new WeakMap;function t(a,s=0){const r=e.get(a);let o;return r===void 0?(o=new th(n),e.set(a,[o])):s>=r.length?(o=new th(n),r.push(o)):o=r[s],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const yT=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,bT=`uniform sampler2D shadow_pass;
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
}`;function ST(n,e,t){let i=new of;const a=new le,s=new le,r=new Mt,o=new GS({depthPacking:ob}),l=new $S,c={},u=t.maxTextureSize,d={[Bi]:sn,[sn]:Bi,[et]:et},f=new zi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new le},radius:{value:4}},vertexShader:yT,fragmentShader:bT}),p=f.clone();p.defines.HORIZONTAL_PASS=1;const _=new Dt;_.setAttribute("position",new zn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new ze(_,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=V_;let h=this.type;this.render=function(M,T,C){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||M.length===0)return;const v=n.getRenderTarget(),S=n.getActiveCubeFace(),R=n.getActiveMipmapLevel(),I=n.state;I.setBlending(ki),I.buffers.depth.getReversed()===!0?I.buffers.color.setClear(0,0,0,0):I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);const U=h!==hi&&this.type===hi,B=h===hi&&this.type!==hi;for(let G=0,z=M.length;G<z;G++){const X=M[G],V=X.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",X,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;a.copy(V.mapSize);const ee=V.getFrameExtents();if(a.multiply(ee),s.copy(V.mapSize),(a.x>u||a.y>u)&&(a.x>u&&(s.x=Math.floor(u/ee.x),a.x=s.x*ee.x,V.mapSize.x=s.x),a.y>u&&(s.y=Math.floor(u/ee.y),a.y=s.y*ee.y,V.mapSize.y=s.y)),V.map===null||U===!0||B===!0){const q=this.type!==hi?{minFilter:Bn,magFilter:Bn}:{};V.map!==null&&V.map.dispose(),V.map=new pa(a.x,a.y,q),V.map.texture.name=X.name+".shadowMap",V.camera.updateProjectionMatrix()}n.setRenderTarget(V.map),n.clear();const fe=V.getViewportCount();for(let q=0;q<fe;q++){const ue=V.getViewport(q);r.set(s.x*ue.x,s.y*ue.y,s.x*ue.z,s.y*ue.w),I.viewport(r),V.updateMatrices(X,q),i=V.getFrustum(),b(T,C,V.camera,X,this.type)}V.isPointLightShadow!==!0&&this.type===hi&&y(V,C),V.needsUpdate=!1}h=this.type,m.needsUpdate=!1,n.setRenderTarget(v,S,R)};function y(M,T){const C=e.update(g);f.defines.VSM_SAMPLES!==M.blurSamples&&(f.defines.VSM_SAMPLES=M.blurSamples,p.defines.VSM_SAMPLES=M.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),M.mapPass===null&&(M.mapPass=new pa(a.x,a.y)),f.uniforms.shadow_pass.value=M.map.texture,f.uniforms.resolution.value=M.mapSize,f.uniforms.radius.value=M.radius,n.setRenderTarget(M.mapPass),n.clear(),n.renderBufferDirect(T,null,C,f,g,null),p.uniforms.shadow_pass.value=M.mapPass.texture,p.uniforms.resolution.value=M.mapSize,p.uniforms.radius.value=M.radius,n.setRenderTarget(M.map),n.clear(),n.renderBufferDirect(T,null,C,p,g,null)}function x(M,T,C,v){let S=null;const R=C.isPointLight===!0?M.customDistanceMaterial:M.customDepthMaterial;if(R!==void 0)S=R;else if(S=C.isPointLight===!0?l:o,n.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0||T.alphaToCoverage===!0){const I=S.uuid,U=T.uuid;let B=c[I];B===void 0&&(B={},c[I]=B);let G=B[U];G===void 0&&(G=S.clone(),B[U]=G,T.addEventListener("dispose",A)),S=G}if(S.visible=T.visible,S.wireframe=T.wireframe,v===hi?S.side=T.shadowSide!==null?T.shadowSide:T.side:S.side=T.shadowSide!==null?T.shadowSide:d[T.side],S.alphaMap=T.alphaMap,S.alphaTest=T.alphaToCoverage===!0?.5:T.alphaTest,S.map=T.map,S.clipShadows=T.clipShadows,S.clippingPlanes=T.clippingPlanes,S.clipIntersection=T.clipIntersection,S.displacementMap=T.displacementMap,S.displacementScale=T.displacementScale,S.displacementBias=T.displacementBias,S.wireframeLinewidth=T.wireframeLinewidth,S.linewidth=T.linewidth,C.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const I=n.properties.get(S);I.light=C}return S}function b(M,T,C,v,S){if(M.visible===!1)return;if(M.layers.test(T.layers)&&(M.isMesh||M.isLine||M.isPoints)&&(M.castShadow||M.receiveShadow&&S===hi)&&(!M.frustumCulled||i.intersectsObject(M))){M.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,M.matrixWorld);const U=e.update(M),B=M.material;if(Array.isArray(B)){const G=U.groups;for(let z=0,X=G.length;z<X;z++){const V=G[z],ee=B[V.materialIndex];if(ee&&ee.visible){const fe=x(M,ee,v,S);M.onBeforeShadow(n,M,T,C,U,fe,V),n.renderBufferDirect(C,null,U,fe,M,V),M.onAfterShadow(n,M,T,C,U,fe,V)}}}else if(B.visible){const G=x(M,B,v,S);M.onBeforeShadow(n,M,T,C,U,G,null),n.renderBufferDirect(C,null,U,G,M,null),M.onAfterShadow(n,M,T,C,U,G,null)}}const I=M.children;for(let U=0,B=I.length;U<B;U++)b(I[U],T,C,v,S)}function A(M){M.target.removeEventListener("dispose",A);for(const C in c){const v=c[C],S=M.target.uuid;S in v&&(v[S].dispose(),delete v[S])}}}const xT={[mu]:_u,[gu]:bu,[vu]:Su,[fs]:yu,[_u]:mu,[bu]:gu,[Su]:vu,[yu]:fs};function wT(n,e){function t(){let k=!1;const re=new Mt;let ce=null;const we=new Mt(0,0,0,0);return{setMask:function(ie){ce!==ie&&!k&&(n.colorMask(ie,ie,ie,ie),ce=ie)},setLocked:function(ie){k=ie},setClear:function(ie,J,Me,He,ft){ft===!0&&(ie*=He,J*=He,Me*=He),re.set(ie,J,Me,He),we.equals(re)===!1&&(n.clearColor(ie,J,Me,He),we.copy(re))},reset:function(){k=!1,ce=null,we.set(-1,0,0,0)}}}function i(){let k=!1,re=!1,ce=null,we=null,ie=null;return{setReversed:function(J){if(re!==J){const Me=e.get("EXT_clip_control");J?Me.clipControlEXT(Me.LOWER_LEFT_EXT,Me.ZERO_TO_ONE_EXT):Me.clipControlEXT(Me.LOWER_LEFT_EXT,Me.NEGATIVE_ONE_TO_ONE_EXT),re=J;const He=ie;ie=null,this.setClear(He)}},getReversed:function(){return re},setTest:function(J){J?K(n.DEPTH_TEST):te(n.DEPTH_TEST)},setMask:function(J){ce!==J&&!k&&(n.depthMask(J),ce=J)},setFunc:function(J){if(re&&(J=xT[J]),we!==J){switch(J){case mu:n.depthFunc(n.NEVER);break;case _u:n.depthFunc(n.ALWAYS);break;case gu:n.depthFunc(n.LESS);break;case fs:n.depthFunc(n.LEQUAL);break;case vu:n.depthFunc(n.EQUAL);break;case yu:n.depthFunc(n.GEQUAL);break;case bu:n.depthFunc(n.GREATER);break;case Su:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}we=J}},setLocked:function(J){k=J},setClear:function(J){ie!==J&&(re&&(J=1-J),n.clearDepth(J),ie=J)},reset:function(){k=!1,ce=null,we=null,ie=null,re=!1}}}function a(){let k=!1,re=null,ce=null,we=null,ie=null,J=null,Me=null,He=null,ft=null;return{setTest:function(tt){k||(tt?K(n.STENCIL_TEST):te(n.STENCIL_TEST))},setMask:function(tt){re!==tt&&!k&&(n.stencilMask(tt),re=tt)},setFunc:function(tt,oi,Vn){(ce!==tt||we!==oi||ie!==Vn)&&(n.stencilFunc(tt,oi,Vn),ce=tt,we=oi,ie=Vn)},setOp:function(tt,oi,Vn){(J!==tt||Me!==oi||He!==Vn)&&(n.stencilOp(tt,oi,Vn),J=tt,Me=oi,He=Vn)},setLocked:function(tt){k=tt},setClear:function(tt){ft!==tt&&(n.clearStencil(tt),ft=tt)},reset:function(){k=!1,re=null,ce=null,we=null,ie=null,J=null,Me=null,He=null,ft=null}}}const s=new t,r=new i,o=new a,l=new WeakMap,c=new WeakMap;let u={},d={},f=new WeakMap,p=[],_=null,g=!1,m=null,h=null,y=null,x=null,b=null,A=null,M=null,T=new Ye(0,0,0),C=0,v=!1,S=null,R=null,I=null,U=null,B=null;const G=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let z=!1,X=0;const V=n.getParameter(n.VERSION);V.indexOf("WebGL")!==-1?(X=parseFloat(/^WebGL (\d)/.exec(V)[1]),z=X>=1):V.indexOf("OpenGL ES")!==-1&&(X=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),z=X>=2);let ee=null,fe={};const q=n.getParameter(n.SCISSOR_BOX),ue=n.getParameter(n.VIEWPORT),xe=new Mt().fromArray(q),ye=new Mt().fromArray(ue);function he(k,re,ce,we){const ie=new Uint8Array(4),J=n.createTexture();n.bindTexture(k,J),n.texParameteri(k,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(k,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Me=0;Me<ce;Me++)k===n.TEXTURE_3D||k===n.TEXTURE_2D_ARRAY?n.texImage3D(re,0,n.RGBA,1,1,we,0,n.RGBA,n.UNSIGNED_BYTE,ie):n.texImage2D(re+Me,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ie);return J}const O={};O[n.TEXTURE_2D]=he(n.TEXTURE_2D,n.TEXTURE_2D,1),O[n.TEXTURE_CUBE_MAP]=he(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),O[n.TEXTURE_2D_ARRAY]=he(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),O[n.TEXTURE_3D]=he(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),r.setClear(1),o.setClear(0),K(n.DEPTH_TEST),r.setFunc(fs),Ue(!1),Te(Wf),K(n.CULL_FACE),st(ki);function K(k){u[k]!==!0&&(n.enable(k),u[k]=!0)}function te(k){u[k]!==!1&&(n.disable(k),u[k]=!1)}function Se(k,re){return d[k]!==re?(n.bindFramebuffer(k,re),d[k]=re,k===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=re),k===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=re),!0):!1}function ve(k,re){let ce=p,we=!1;if(k){ce=f.get(re),ce===void 0&&(ce=[],f.set(re,ce));const ie=k.textures;if(ce.length!==ie.length||ce[0]!==n.COLOR_ATTACHMENT0){for(let J=0,Me=ie.length;J<Me;J++)ce[J]=n.COLOR_ATTACHMENT0+J;ce.length=ie.length,we=!0}}else ce[0]!==n.BACK&&(ce[0]=n.BACK,we=!0);we&&n.drawBuffers(ce)}function De(k){return _!==k?(n.useProgram(k),_=k,!0):!1}const at={[ia]:n.FUNC_ADD,[I0]:n.FUNC_SUBTRACT,[k0]:n.FUNC_REVERSE_SUBTRACT};at[D0]=n.MIN,at[F0]=n.MAX;const N={[O0]:n.ZERO,[U0]:n.ONE,[B0]:n.SRC_COLOR,[pu]:n.SRC_ALPHA,[W0]:n.SRC_ALPHA_SATURATE,[G0]:n.DST_COLOR,[H0]:n.DST_ALPHA,[z0]:n.ONE_MINUS_SRC_COLOR,[hu]:n.ONE_MINUS_SRC_ALPHA,[$0]:n.ONE_MINUS_DST_COLOR,[V0]:n.ONE_MINUS_DST_ALPHA,[X0]:n.CONSTANT_COLOR,[q0]:n.ONE_MINUS_CONSTANT_COLOR,[K0]:n.CONSTANT_ALPHA,[Y0]:n.ONE_MINUS_CONSTANT_ALPHA};function st(k,re,ce,we,ie,J,Me,He,ft,tt){if(k===ki){g===!0&&(te(n.BLEND),g=!1);return}if(g===!1&&(K(n.BLEND),g=!0),k!==N0){if(k!==m||tt!==v){if((h!==ia||b!==ia)&&(n.blendEquation(n.FUNC_ADD),h=ia,b=ia),tt)switch(k){case Za:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Di:n.blendFunc(n.ONE,n.ONE);break;case Xf:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case qf:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}else switch(k){case Za:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Di:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Xf:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case qf:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}y=null,x=null,A=null,M=null,T.set(0,0,0),C=0,m=k,v=tt}return}ie=ie||re,J=J||ce,Me=Me||we,(re!==h||ie!==b)&&(n.blendEquationSeparate(at[re],at[ie]),h=re,b=ie),(ce!==y||we!==x||J!==A||Me!==M)&&(n.blendFuncSeparate(N[ce],N[we],N[J],N[Me]),y=ce,x=we,A=J,M=Me),(He.equals(T)===!1||ft!==C)&&(n.blendColor(He.r,He.g,He.b,ft),T.copy(He),C=ft),m=k,v=!1}function Ve(k,re){k.side===et?te(n.CULL_FACE):K(n.CULL_FACE);let ce=k.side===sn;re&&(ce=!ce),Ue(ce),k.blending===Za&&k.transparent===!1?st(ki):st(k.blending,k.blendEquation,k.blendSrc,k.blendDst,k.blendEquationAlpha,k.blendSrcAlpha,k.blendDstAlpha,k.blendColor,k.blendAlpha,k.premultipliedAlpha),r.setFunc(k.depthFunc),r.setTest(k.depthTest),r.setMask(k.depthWrite),s.setMask(k.colorWrite);const we=k.stencilWrite;o.setTest(we),we&&(o.setMask(k.stencilWriteMask),o.setFunc(k.stencilFunc,k.stencilRef,k.stencilFuncMask),o.setOp(k.stencilFail,k.stencilZFail,k.stencilZPass)),Ce(k.polygonOffset,k.polygonOffsetFactor,k.polygonOffsetUnits),k.alphaToCoverage===!0?K(n.SAMPLE_ALPHA_TO_COVERAGE):te(n.SAMPLE_ALPHA_TO_COVERAGE)}function Ue(k){S!==k&&(k?n.frontFace(n.CW):n.frontFace(n.CCW),S=k)}function Te(k){k!==R0?(K(n.CULL_FACE),k!==R&&(k===Wf?n.cullFace(n.BACK):k===P0?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):te(n.CULL_FACE),R=k}function _t(k){k!==I&&(z&&n.lineWidth(k),I=k)}function Ce(k,re,ce){k?(K(n.POLYGON_OFFSET_FILL),(U!==re||B!==ce)&&(n.polygonOffset(re,ce),U=re,B=ce)):te(n.POLYGON_OFFSET_FILL)}function We(k){k?K(n.SCISSOR_TEST):te(n.SCISSOR_TEST)}function Ft(k){k===void 0&&(k=n.TEXTURE0+G-1),ee!==k&&(n.activeTexture(k),ee=k)}function Tt(k,re,ce){ce===void 0&&(ee===null?ce=n.TEXTURE0+G-1:ce=ee);let we=fe[ce];we===void 0&&(we={type:void 0,texture:void 0},fe[ce]=we),(we.type!==k||we.texture!==re)&&(ee!==ce&&(n.activeTexture(ce),ee=ce),n.bindTexture(k,re||O[k]),we.type=k,we.texture=re)}function P(){const k=fe[ee];k!==void 0&&k.type!==void 0&&(n.bindTexture(k.type,null),k.type=void 0,k.texture=void 0)}function w(){try{n.compressedTexImage2D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function H(){try{n.compressedTexImage3D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Z(){try{n.texSubImage2D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Q(){try{n.texSubImage3D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Y(){try{n.compressedTexSubImage2D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Le(){try{n.compressedTexSubImage3D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function oe(){try{n.texStorage2D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Ae(){try{n.texStorage3D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Re(){try{n.texImage2D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function se(){try{n.texImage3D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function _e(k){xe.equals(k)===!1&&(n.scissor(k.x,k.y,k.z,k.w),xe.copy(k))}function Fe(k){ye.equals(k)===!1&&(n.viewport(k.x,k.y,k.z,k.w),ye.copy(k))}function Pe(k,re){let ce=c.get(re);ce===void 0&&(ce=new WeakMap,c.set(re,ce));let we=ce.get(k);we===void 0&&(we=n.getUniformBlockIndex(re,k.name),ce.set(k,we))}function pe(k,re){const we=c.get(re).get(k);l.get(re)!==we&&(n.uniformBlockBinding(re,we,k.__bindingPointIndex),l.set(re,we))}function Ge(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),r.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},ee=null,fe={},d={},f=new WeakMap,p=[],_=null,g=!1,m=null,h=null,y=null,x=null,b=null,A=null,M=null,T=new Ye(0,0,0),C=0,v=!1,S=null,R=null,I=null,U=null,B=null,xe.set(0,0,n.canvas.width,n.canvas.height),ye.set(0,0,n.canvas.width,n.canvas.height),s.reset(),r.reset(),o.reset()}return{buffers:{color:s,depth:r,stencil:o},enable:K,disable:te,bindFramebuffer:Se,drawBuffers:ve,useProgram:De,setBlending:st,setMaterial:Ve,setFlipSided:Ue,setCullFace:Te,setLineWidth:_t,setPolygonOffset:Ce,setScissorTest:We,activeTexture:Ft,bindTexture:Tt,unbindTexture:P,compressedTexImage2D:w,compressedTexImage3D:H,texImage2D:Re,texImage3D:se,updateUBOMapping:Pe,uniformBlockBinding:pe,texStorage2D:oe,texStorage3D:Ae,texSubImage2D:Z,texSubImage3D:Q,compressedTexSubImage2D:Y,compressedTexSubImage3D:Le,scissor:_e,viewport:Fe,reset:Ge}}function ET(n,e,t,i,a,s,r){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new le,u=new WeakMap;let d;const f=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(P,w){return p?new OffscreenCanvas(P,w):al("canvas")}function g(P,w,H){let Z=1;const Q=Tt(P);if((Q.width>H||Q.height>H)&&(Z=H/Math.max(Q.width,Q.height)),Z<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){const Y=Math.floor(Z*Q.width),Le=Math.floor(Z*Q.height);d===void 0&&(d=_(Y,Le));const oe=w?_(Y,Le):d;return oe.width=Y,oe.height=Le,oe.getContext("2d").drawImage(P,0,0,Y,Le),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+Y+"x"+Le+")."),oe}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),P;return P}function m(P){return P.generateMipmaps}function h(P){n.generateMipmap(P)}function y(P){return P.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?n.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function x(P,w,H,Z,Q=!1){if(P!==null){if(n[P]!==void 0)return n[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let Y=w;if(w===n.RED&&(H===n.FLOAT&&(Y=n.R32F),H===n.HALF_FLOAT&&(Y=n.R16F),H===n.UNSIGNED_BYTE&&(Y=n.R8)),w===n.RED_INTEGER&&(H===n.UNSIGNED_BYTE&&(Y=n.R8UI),H===n.UNSIGNED_SHORT&&(Y=n.R16UI),H===n.UNSIGNED_INT&&(Y=n.R32UI),H===n.BYTE&&(Y=n.R8I),H===n.SHORT&&(Y=n.R16I),H===n.INT&&(Y=n.R32I)),w===n.RG&&(H===n.FLOAT&&(Y=n.RG32F),H===n.HALF_FLOAT&&(Y=n.RG16F),H===n.UNSIGNED_BYTE&&(Y=n.RG8)),w===n.RG_INTEGER&&(H===n.UNSIGNED_BYTE&&(Y=n.RG8UI),H===n.UNSIGNED_SHORT&&(Y=n.RG16UI),H===n.UNSIGNED_INT&&(Y=n.RG32UI),H===n.BYTE&&(Y=n.RG8I),H===n.SHORT&&(Y=n.RG16I),H===n.INT&&(Y=n.RG32I)),w===n.RGB_INTEGER&&(H===n.UNSIGNED_BYTE&&(Y=n.RGB8UI),H===n.UNSIGNED_SHORT&&(Y=n.RGB16UI),H===n.UNSIGNED_INT&&(Y=n.RGB32UI),H===n.BYTE&&(Y=n.RGB8I),H===n.SHORT&&(Y=n.RGB16I),H===n.INT&&(Y=n.RGB32I)),w===n.RGBA_INTEGER&&(H===n.UNSIGNED_BYTE&&(Y=n.RGBA8UI),H===n.UNSIGNED_SHORT&&(Y=n.RGBA16UI),H===n.UNSIGNED_INT&&(Y=n.RGBA32UI),H===n.BYTE&&(Y=n.RGBA8I),H===n.SHORT&&(Y=n.RGBA16I),H===n.INT&&(Y=n.RGBA32I)),w===n.RGB&&(H===n.UNSIGNED_INT_5_9_9_9_REV&&(Y=n.RGB9_E5),H===n.UNSIGNED_INT_10F_11F_11F_REV&&(Y=n.R11F_G11F_B10F)),w===n.RGBA){const Le=Q?nl:Qe.getTransfer(Z);H===n.FLOAT&&(Y=n.RGBA32F),H===n.HALF_FLOAT&&(Y=n.RGBA16F),H===n.UNSIGNED_BYTE&&(Y=Le===ot?n.SRGB8_ALPHA8:n.RGBA8),H===n.UNSIGNED_SHORT_4_4_4_4&&(Y=n.RGBA4),H===n.UNSIGNED_SHORT_5_5_5_1&&(Y=n.RGB5_A1)}return(Y===n.R16F||Y===n.R32F||Y===n.RG16F||Y===n.RG32F||Y===n.RGBA16F||Y===n.RGBA32F)&&e.get("EXT_color_buffer_float"),Y}function b(P,w){let H;return P?w===null||w===fa||w===ar?H=n.DEPTH24_STENCIL8:w===vi?H=n.DEPTH32F_STENCIL8:w===ir&&(H=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===fa||w===ar?H=n.DEPTH_COMPONENT24:w===vi?H=n.DEPTH_COMPONENT32F:w===ir&&(H=n.DEPTH_COMPONENT16),H}function A(P,w){return m(P)===!0||P.isFramebufferTexture&&P.minFilter!==Bn&&P.minFilter!==jn?Math.log2(Math.max(w.width,w.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?w.mipmaps.length:1}function M(P){const w=P.target;w.removeEventListener("dispose",M),C(w),w.isVideoTexture&&u.delete(w)}function T(P){const w=P.target;w.removeEventListener("dispose",T),S(w)}function C(P){const w=i.get(P);if(w.__webglInit===void 0)return;const H=P.source,Z=f.get(H);if(Z){const Q=Z[w.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&v(P),Object.keys(Z).length===0&&f.delete(H)}i.remove(P)}function v(P){const w=i.get(P);n.deleteTexture(w.__webglTexture);const H=P.source,Z=f.get(H);delete Z[w.__cacheKey],r.memory.textures--}function S(P){const w=i.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),i.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(w.__webglFramebuffer[Z]))for(let Q=0;Q<w.__webglFramebuffer[Z].length;Q++)n.deleteFramebuffer(w.__webglFramebuffer[Z][Q]);else n.deleteFramebuffer(w.__webglFramebuffer[Z]);w.__webglDepthbuffer&&n.deleteRenderbuffer(w.__webglDepthbuffer[Z])}else{if(Array.isArray(w.__webglFramebuffer))for(let Z=0;Z<w.__webglFramebuffer.length;Z++)n.deleteFramebuffer(w.__webglFramebuffer[Z]);else n.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&n.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&n.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let Z=0;Z<w.__webglColorRenderbuffer.length;Z++)w.__webglColorRenderbuffer[Z]&&n.deleteRenderbuffer(w.__webglColorRenderbuffer[Z]);w.__webglDepthRenderbuffer&&n.deleteRenderbuffer(w.__webglDepthRenderbuffer)}const H=P.textures;for(let Z=0,Q=H.length;Z<Q;Z++){const Y=i.get(H[Z]);Y.__webglTexture&&(n.deleteTexture(Y.__webglTexture),r.memory.textures--),i.remove(H[Z])}i.remove(P)}let R=0;function I(){R=0}function U(){const P=R;return P>=a.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+a.maxTextures),R+=1,P}function B(P){const w=[];return w.push(P.wrapS),w.push(P.wrapT),w.push(P.wrapR||0),w.push(P.magFilter),w.push(P.minFilter),w.push(P.anisotropy),w.push(P.internalFormat),w.push(P.format),w.push(P.type),w.push(P.generateMipmaps),w.push(P.premultiplyAlpha),w.push(P.flipY),w.push(P.unpackAlignment),w.push(P.colorSpace),w.join()}function G(P,w){const H=i.get(P);if(P.isVideoTexture&&We(P),P.isRenderTargetTexture===!1&&P.isExternalTexture!==!0&&P.version>0&&H.__version!==P.version){const Z=P.image;if(Z===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{O(H,P,w);return}}else P.isExternalTexture&&(H.__webglTexture=P.sourceTexture?P.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,H.__webglTexture,n.TEXTURE0+w)}function z(P,w){const H=i.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&H.__version!==P.version){O(H,P,w);return}t.bindTexture(n.TEXTURE_2D_ARRAY,H.__webglTexture,n.TEXTURE0+w)}function X(P,w){const H=i.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&H.__version!==P.version){O(H,P,w);return}t.bindTexture(n.TEXTURE_3D,H.__webglTexture,n.TEXTURE0+w)}function V(P,w){const H=i.get(P);if(P.version>0&&H.__version!==P.version){K(H,P,w);return}t.bindTexture(n.TEXTURE_CUBE_MAP,H.__webglTexture,n.TEXTURE0+w)}const ee={[Eu]:n.REPEAT,[la]:n.CLAMP_TO_EDGE,[Mu]:n.MIRRORED_REPEAT},fe={[Bn]:n.NEAREST,[sb]:n.NEAREST_MIPMAP_NEAREST,[Pr]:n.NEAREST_MIPMAP_LINEAR,[jn]:n.LINEAR,[Vl]:n.LINEAR_MIPMAP_NEAREST,[ca]:n.LINEAR_MIPMAP_LINEAR},q={[cb]:n.NEVER,[mb]:n.ALWAYS,[ub]:n.LESS,[J_]:n.LEQUAL,[db]:n.EQUAL,[hb]:n.GEQUAL,[fb]:n.GREATER,[pb]:n.NOTEQUAL};function ue(P,w){if(w.type===vi&&e.has("OES_texture_float_linear")===!1&&(w.magFilter===jn||w.magFilter===Vl||w.magFilter===Pr||w.magFilter===ca||w.minFilter===jn||w.minFilter===Vl||w.minFilter===Pr||w.minFilter===ca)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(P,n.TEXTURE_WRAP_S,ee[w.wrapS]),n.texParameteri(P,n.TEXTURE_WRAP_T,ee[w.wrapT]),(P===n.TEXTURE_3D||P===n.TEXTURE_2D_ARRAY)&&n.texParameteri(P,n.TEXTURE_WRAP_R,ee[w.wrapR]),n.texParameteri(P,n.TEXTURE_MAG_FILTER,fe[w.magFilter]),n.texParameteri(P,n.TEXTURE_MIN_FILTER,fe[w.minFilter]),w.compareFunction&&(n.texParameteri(P,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(P,n.TEXTURE_COMPARE_FUNC,q[w.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===Bn||w.minFilter!==Pr&&w.minFilter!==ca||w.type===vi&&e.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||i.get(w).__currentAnisotropy){const H=e.get("EXT_texture_filter_anisotropic");n.texParameterf(P,H.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,a.getMaxAnisotropy())),i.get(w).__currentAnisotropy=w.anisotropy}}}function xe(P,w){let H=!1;P.__webglInit===void 0&&(P.__webglInit=!0,w.addEventListener("dispose",M));const Z=w.source;let Q=f.get(Z);Q===void 0&&(Q={},f.set(Z,Q));const Y=B(w);if(Y!==P.__cacheKey){Q[Y]===void 0&&(Q[Y]={texture:n.createTexture(),usedTimes:0},r.memory.textures++,H=!0),Q[Y].usedTimes++;const Le=Q[P.__cacheKey];Le!==void 0&&(Q[P.__cacheKey].usedTimes--,Le.usedTimes===0&&v(w)),P.__cacheKey=Y,P.__webglTexture=Q[Y].texture}return H}function ye(P,w,H){return Math.floor(Math.floor(P/H)/w)}function he(P,w,H,Z){const Y=P.updateRanges;if(Y.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,w.width,w.height,H,Z,w.data);else{Y.sort((se,_e)=>se.start-_e.start);let Le=0;for(let se=1;se<Y.length;se++){const _e=Y[Le],Fe=Y[se],Pe=_e.start+_e.count,pe=ye(Fe.start,w.width,4),Ge=ye(_e.start,w.width,4);Fe.start<=Pe+1&&pe===Ge&&ye(Fe.start+Fe.count-1,w.width,4)===pe?_e.count=Math.max(_e.count,Fe.start+Fe.count-_e.start):(++Le,Y[Le]=Fe)}Y.length=Le+1;const oe=n.getParameter(n.UNPACK_ROW_LENGTH),Ae=n.getParameter(n.UNPACK_SKIP_PIXELS),Re=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,w.width);for(let se=0,_e=Y.length;se<_e;se++){const Fe=Y[se],Pe=Math.floor(Fe.start/4),pe=Math.ceil(Fe.count/4),Ge=Pe%w.width,k=Math.floor(Pe/w.width),re=pe,ce=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,Ge),n.pixelStorei(n.UNPACK_SKIP_ROWS,k),t.texSubImage2D(n.TEXTURE_2D,0,Ge,k,re,ce,H,Z,w.data)}P.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,oe),n.pixelStorei(n.UNPACK_SKIP_PIXELS,Ae),n.pixelStorei(n.UNPACK_SKIP_ROWS,Re)}}function O(P,w,H){let Z=n.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(Z=n.TEXTURE_2D_ARRAY),w.isData3DTexture&&(Z=n.TEXTURE_3D);const Q=xe(P,w),Y=w.source;t.bindTexture(Z,P.__webglTexture,n.TEXTURE0+H);const Le=i.get(Y);if(Y.version!==Le.__version||Q===!0){t.activeTexture(n.TEXTURE0+H);const oe=Qe.getPrimaries(Qe.workingColorSpace),Ae=w.colorSpace===Li?null:Qe.getPrimaries(w.colorSpace),Re=w.colorSpace===Li||oe===Ae?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,w.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,w.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Re);let se=g(w.image,!1,a.maxTextureSize);se=Ft(w,se);const _e=s.convert(w.format,w.colorSpace),Fe=s.convert(w.type);let Pe=x(w.internalFormat,_e,Fe,w.colorSpace,w.isVideoTexture);ue(Z,w);let pe;const Ge=w.mipmaps,k=w.isVideoTexture!==!0,re=Le.__version===void 0||Q===!0,ce=Y.dataReady,we=A(w,se);if(w.isDepthTexture)Pe=b(w.format===rr,w.type),re&&(k?t.texStorage2D(n.TEXTURE_2D,1,Pe,se.width,se.height):t.texImage2D(n.TEXTURE_2D,0,Pe,se.width,se.height,0,_e,Fe,null));else if(w.isDataTexture)if(Ge.length>0){k&&re&&t.texStorage2D(n.TEXTURE_2D,we,Pe,Ge[0].width,Ge[0].height);for(let ie=0,J=Ge.length;ie<J;ie++)pe=Ge[ie],k?ce&&t.texSubImage2D(n.TEXTURE_2D,ie,0,0,pe.width,pe.height,_e,Fe,pe.data):t.texImage2D(n.TEXTURE_2D,ie,Pe,pe.width,pe.height,0,_e,Fe,pe.data);w.generateMipmaps=!1}else k?(re&&t.texStorage2D(n.TEXTURE_2D,we,Pe,se.width,se.height),ce&&he(w,se,_e,Fe)):t.texImage2D(n.TEXTURE_2D,0,Pe,se.width,se.height,0,_e,Fe,se.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){k&&re&&t.texStorage3D(n.TEXTURE_2D_ARRAY,we,Pe,Ge[0].width,Ge[0].height,se.depth);for(let ie=0,J=Ge.length;ie<J;ie++)if(pe=Ge[ie],w.format!==On)if(_e!==null)if(k){if(ce)if(w.layerUpdates.size>0){const Me=Lp(pe.width,pe.height,w.format,w.type);for(const He of w.layerUpdates){const ft=pe.data.subarray(He*Me/pe.data.BYTES_PER_ELEMENT,(He+1)*Me/pe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ie,0,0,He,pe.width,pe.height,1,_e,ft)}w.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ie,0,0,0,pe.width,pe.height,se.depth,_e,pe.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ie,Pe,pe.width,pe.height,se.depth,0,pe.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else k?ce&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,ie,0,0,0,pe.width,pe.height,se.depth,_e,Fe,pe.data):t.texImage3D(n.TEXTURE_2D_ARRAY,ie,Pe,pe.width,pe.height,se.depth,0,_e,Fe,pe.data)}else{k&&re&&t.texStorage2D(n.TEXTURE_2D,we,Pe,Ge[0].width,Ge[0].height);for(let ie=0,J=Ge.length;ie<J;ie++)pe=Ge[ie],w.format!==On?_e!==null?k?ce&&t.compressedTexSubImage2D(n.TEXTURE_2D,ie,0,0,pe.width,pe.height,_e,pe.data):t.compressedTexImage2D(n.TEXTURE_2D,ie,Pe,pe.width,pe.height,0,pe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):k?ce&&t.texSubImage2D(n.TEXTURE_2D,ie,0,0,pe.width,pe.height,_e,Fe,pe.data):t.texImage2D(n.TEXTURE_2D,ie,Pe,pe.width,pe.height,0,_e,Fe,pe.data)}else if(w.isDataArrayTexture)if(k){if(re&&t.texStorage3D(n.TEXTURE_2D_ARRAY,we,Pe,se.width,se.height,se.depth),ce)if(w.layerUpdates.size>0){const ie=Lp(se.width,se.height,w.format,w.type);for(const J of w.layerUpdates){const Me=se.data.subarray(J*ie/se.data.BYTES_PER_ELEMENT,(J+1)*ie/se.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,J,se.width,se.height,1,_e,Fe,Me)}w.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,se.width,se.height,se.depth,_e,Fe,se.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Pe,se.width,se.height,se.depth,0,_e,Fe,se.data);else if(w.isData3DTexture)k?(re&&t.texStorage3D(n.TEXTURE_3D,we,Pe,se.width,se.height,se.depth),ce&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,se.width,se.height,se.depth,_e,Fe,se.data)):t.texImage3D(n.TEXTURE_3D,0,Pe,se.width,se.height,se.depth,0,_e,Fe,se.data);else if(w.isFramebufferTexture){if(re)if(k)t.texStorage2D(n.TEXTURE_2D,we,Pe,se.width,se.height);else{let ie=se.width,J=se.height;for(let Me=0;Me<we;Me++)t.texImage2D(n.TEXTURE_2D,Me,Pe,ie,J,0,_e,Fe,null),ie>>=1,J>>=1}}else if(Ge.length>0){if(k&&re){const ie=Tt(Ge[0]);t.texStorage2D(n.TEXTURE_2D,we,Pe,ie.width,ie.height)}for(let ie=0,J=Ge.length;ie<J;ie++)pe=Ge[ie],k?ce&&t.texSubImage2D(n.TEXTURE_2D,ie,0,0,_e,Fe,pe):t.texImage2D(n.TEXTURE_2D,ie,Pe,_e,Fe,pe);w.generateMipmaps=!1}else if(k){if(re){const ie=Tt(se);t.texStorage2D(n.TEXTURE_2D,we,Pe,ie.width,ie.height)}ce&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,_e,Fe,se)}else t.texImage2D(n.TEXTURE_2D,0,Pe,_e,Fe,se);m(w)&&h(Z),Le.__version=Y.version,w.onUpdate&&w.onUpdate(w)}P.__version=w.version}function K(P,w,H){if(w.image.length!==6)return;const Z=xe(P,w),Q=w.source;t.bindTexture(n.TEXTURE_CUBE_MAP,P.__webglTexture,n.TEXTURE0+H);const Y=i.get(Q);if(Q.version!==Y.__version||Z===!0){t.activeTexture(n.TEXTURE0+H);const Le=Qe.getPrimaries(Qe.workingColorSpace),oe=w.colorSpace===Li?null:Qe.getPrimaries(w.colorSpace),Ae=w.colorSpace===Li||Le===oe?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,w.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,w.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ae);const Re=w.isCompressedTexture||w.image[0].isCompressedTexture,se=w.image[0]&&w.image[0].isDataTexture,_e=[];for(let J=0;J<6;J++)!Re&&!se?_e[J]=g(w.image[J],!0,a.maxCubemapSize):_e[J]=se?w.image[J].image:w.image[J],_e[J]=Ft(w,_e[J]);const Fe=_e[0],Pe=s.convert(w.format,w.colorSpace),pe=s.convert(w.type),Ge=x(w.internalFormat,Pe,pe,w.colorSpace),k=w.isVideoTexture!==!0,re=Y.__version===void 0||Z===!0,ce=Q.dataReady;let we=A(w,Fe);ue(n.TEXTURE_CUBE_MAP,w);let ie;if(Re){k&&re&&t.texStorage2D(n.TEXTURE_CUBE_MAP,we,Ge,Fe.width,Fe.height);for(let J=0;J<6;J++){ie=_e[J].mipmaps;for(let Me=0;Me<ie.length;Me++){const He=ie[Me];w.format!==On?Pe!==null?k?ce&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,Me,0,0,He.width,He.height,Pe,He.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,Me,Ge,He.width,He.height,0,He.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):k?ce&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,Me,0,0,He.width,He.height,Pe,pe,He.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,Me,Ge,He.width,He.height,0,Pe,pe,He.data)}}}else{if(ie=w.mipmaps,k&&re){ie.length>0&&we++;const J=Tt(_e[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,we,Ge,J.width,J.height)}for(let J=0;J<6;J++)if(se){k?ce&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,_e[J].width,_e[J].height,Pe,pe,_e[J].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,Ge,_e[J].width,_e[J].height,0,Pe,pe,_e[J].data);for(let Me=0;Me<ie.length;Me++){const ft=ie[Me].image[J].image;k?ce&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,Me+1,0,0,ft.width,ft.height,Pe,pe,ft.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,Me+1,Ge,ft.width,ft.height,0,Pe,pe,ft.data)}}else{k?ce&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,Pe,pe,_e[J]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,Ge,Pe,pe,_e[J]);for(let Me=0;Me<ie.length;Me++){const He=ie[Me];k?ce&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,Me+1,0,0,Pe,pe,He.image[J]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,Me+1,Ge,Pe,pe,He.image[J])}}}m(w)&&h(n.TEXTURE_CUBE_MAP),Y.__version=Q.version,w.onUpdate&&w.onUpdate(w)}P.__version=w.version}function te(P,w,H,Z,Q,Y){const Le=s.convert(H.format,H.colorSpace),oe=s.convert(H.type),Ae=x(H.internalFormat,Le,oe,H.colorSpace),Re=i.get(w),se=i.get(H);if(se.__renderTarget=w,!Re.__hasExternalTextures){const _e=Math.max(1,w.width>>Y),Fe=Math.max(1,w.height>>Y);Q===n.TEXTURE_3D||Q===n.TEXTURE_2D_ARRAY?t.texImage3D(Q,Y,Ae,_e,Fe,w.depth,0,Le,oe,null):t.texImage2D(Q,Y,Ae,_e,Fe,0,Le,oe,null)}t.bindFramebuffer(n.FRAMEBUFFER,P),Ce(w)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Z,Q,se.__webglTexture,0,_t(w)):(Q===n.TEXTURE_2D||Q>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,Z,Q,se.__webglTexture,Y),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Se(P,w,H){if(n.bindRenderbuffer(n.RENDERBUFFER,P),w.depthBuffer){const Z=w.depthTexture,Q=Z&&Z.isDepthTexture?Z.type:null,Y=b(w.stencilBuffer,Q),Le=w.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,oe=_t(w);Ce(w)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,oe,Y,w.width,w.height):H?n.renderbufferStorageMultisample(n.RENDERBUFFER,oe,Y,w.width,w.height):n.renderbufferStorage(n.RENDERBUFFER,Y,w.width,w.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Le,n.RENDERBUFFER,P)}else{const Z=w.textures;for(let Q=0;Q<Z.length;Q++){const Y=Z[Q],Le=s.convert(Y.format,Y.colorSpace),oe=s.convert(Y.type),Ae=x(Y.internalFormat,Le,oe,Y.colorSpace),Re=_t(w);H&&Ce(w)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Re,Ae,w.width,w.height):Ce(w)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Re,Ae,w.width,w.height):n.renderbufferStorage(n.RENDERBUFFER,Ae,w.width,w.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function ve(P,w){if(w&&w.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,P),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Z=i.get(w.depthTexture);Z.__renderTarget=w,(!Z.__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),G(w.depthTexture,0);const Q=Z.__webglTexture,Y=_t(w);if(w.depthTexture.format===sr)Ce(w)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,Q,0,Y):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,Q,0);else if(w.depthTexture.format===rr)Ce(w)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,Q,0,Y):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function De(P){const w=i.get(P),H=P.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==P.depthTexture){const Z=P.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),Z){const Q=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,Z.removeEventListener("dispose",Q)};Z.addEventListener("dispose",Q),w.__depthDisposeCallback=Q}w.__boundDepthTexture=Z}if(P.depthTexture&&!w.__autoAllocateDepthBuffer){if(H)throw new Error("target.depthTexture not supported in Cube render targets");const Z=P.texture.mipmaps;Z&&Z.length>0?ve(w.__webglFramebuffer[0],P):ve(w.__webglFramebuffer,P)}else if(H){w.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)if(t.bindFramebuffer(n.FRAMEBUFFER,w.__webglFramebuffer[Z]),w.__webglDepthbuffer[Z]===void 0)w.__webglDepthbuffer[Z]=n.createRenderbuffer(),Se(w.__webglDepthbuffer[Z],P,!1);else{const Q=P.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Y=w.__webglDepthbuffer[Z];n.bindRenderbuffer(n.RENDERBUFFER,Y),n.framebufferRenderbuffer(n.FRAMEBUFFER,Q,n.RENDERBUFFER,Y)}}else{const Z=P.texture.mipmaps;if(Z&&Z.length>0?t.bindFramebuffer(n.FRAMEBUFFER,w.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=n.createRenderbuffer(),Se(w.__webglDepthbuffer,P,!1);else{const Q=P.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Y=w.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,Y),n.framebufferRenderbuffer(n.FRAMEBUFFER,Q,n.RENDERBUFFER,Y)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function at(P,w,H){const Z=i.get(P);w!==void 0&&te(Z.__webglFramebuffer,P,P.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),H!==void 0&&De(P)}function N(P){const w=P.texture,H=i.get(P),Z=i.get(w);P.addEventListener("dispose",T);const Q=P.textures,Y=P.isWebGLCubeRenderTarget===!0,Le=Q.length>1;if(Le||(Z.__webglTexture===void 0&&(Z.__webglTexture=n.createTexture()),Z.__version=w.version,r.memory.textures++),Y){H.__webglFramebuffer=[];for(let oe=0;oe<6;oe++)if(w.mipmaps&&w.mipmaps.length>0){H.__webglFramebuffer[oe]=[];for(let Ae=0;Ae<w.mipmaps.length;Ae++)H.__webglFramebuffer[oe][Ae]=n.createFramebuffer()}else H.__webglFramebuffer[oe]=n.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){H.__webglFramebuffer=[];for(let oe=0;oe<w.mipmaps.length;oe++)H.__webglFramebuffer[oe]=n.createFramebuffer()}else H.__webglFramebuffer=n.createFramebuffer();if(Le)for(let oe=0,Ae=Q.length;oe<Ae;oe++){const Re=i.get(Q[oe]);Re.__webglTexture===void 0&&(Re.__webglTexture=n.createTexture(),r.memory.textures++)}if(P.samples>0&&Ce(P)===!1){H.__webglMultisampledFramebuffer=n.createFramebuffer(),H.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let oe=0;oe<Q.length;oe++){const Ae=Q[oe];H.__webglColorRenderbuffer[oe]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,H.__webglColorRenderbuffer[oe]);const Re=s.convert(Ae.format,Ae.colorSpace),se=s.convert(Ae.type),_e=x(Ae.internalFormat,Re,se,Ae.colorSpace,P.isXRRenderTarget===!0),Fe=_t(P);n.renderbufferStorageMultisample(n.RENDERBUFFER,Fe,_e,P.width,P.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+oe,n.RENDERBUFFER,H.__webglColorRenderbuffer[oe])}n.bindRenderbuffer(n.RENDERBUFFER,null),P.depthBuffer&&(H.__webglDepthRenderbuffer=n.createRenderbuffer(),Se(H.__webglDepthRenderbuffer,P,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(Y){t.bindTexture(n.TEXTURE_CUBE_MAP,Z.__webglTexture),ue(n.TEXTURE_CUBE_MAP,w);for(let oe=0;oe<6;oe++)if(w.mipmaps&&w.mipmaps.length>0)for(let Ae=0;Ae<w.mipmaps.length;Ae++)te(H.__webglFramebuffer[oe][Ae],P,w,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ae);else te(H.__webglFramebuffer[oe],P,w,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0);m(w)&&h(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Le){for(let oe=0,Ae=Q.length;oe<Ae;oe++){const Re=Q[oe],se=i.get(Re);let _e=n.TEXTURE_2D;(P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(_e=P.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(_e,se.__webglTexture),ue(_e,Re),te(H.__webglFramebuffer,P,Re,n.COLOR_ATTACHMENT0+oe,_e,0),m(Re)&&h(_e)}t.unbindTexture()}else{let oe=n.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(oe=P.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(oe,Z.__webglTexture),ue(oe,w),w.mipmaps&&w.mipmaps.length>0)for(let Ae=0;Ae<w.mipmaps.length;Ae++)te(H.__webglFramebuffer[Ae],P,w,n.COLOR_ATTACHMENT0,oe,Ae);else te(H.__webglFramebuffer,P,w,n.COLOR_ATTACHMENT0,oe,0);m(w)&&h(oe),t.unbindTexture()}P.depthBuffer&&De(P)}function st(P){const w=P.textures;for(let H=0,Z=w.length;H<Z;H++){const Q=w[H];if(m(Q)){const Y=y(P),Le=i.get(Q).__webglTexture;t.bindTexture(Y,Le),h(Y),t.unbindTexture()}}}const Ve=[],Ue=[];function Te(P){if(P.samples>0){if(Ce(P)===!1){const w=P.textures,H=P.width,Z=P.height;let Q=n.COLOR_BUFFER_BIT;const Y=P.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Le=i.get(P),oe=w.length>1;if(oe)for(let Re=0;Re<w.length;Re++)t.bindFramebuffer(n.FRAMEBUFFER,Le.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Re,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,Le.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Re,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,Le.__webglMultisampledFramebuffer);const Ae=P.texture.mipmaps;Ae&&Ae.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Le.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Le.__webglFramebuffer);for(let Re=0;Re<w.length;Re++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(Q|=n.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(Q|=n.STENCIL_BUFFER_BIT)),oe){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Le.__webglColorRenderbuffer[Re]);const se=i.get(w[Re]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,se,0)}n.blitFramebuffer(0,0,H,Z,0,0,H,Z,Q,n.NEAREST),l===!0&&(Ve.length=0,Ue.length=0,Ve.push(n.COLOR_ATTACHMENT0+Re),P.depthBuffer&&P.resolveDepthBuffer===!1&&(Ve.push(Y),Ue.push(Y),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Ue)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Ve))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),oe)for(let Re=0;Re<w.length;Re++){t.bindFramebuffer(n.FRAMEBUFFER,Le.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Re,n.RENDERBUFFER,Le.__webglColorRenderbuffer[Re]);const se=i.get(w[Re]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,Le.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Re,n.TEXTURE_2D,se,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Le.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&l){const w=P.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[w])}}}function _t(P){return Math.min(a.maxSamples,P.samples)}function Ce(P){const w=i.get(P);return P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function We(P){const w=r.render.frame;u.get(P)!==w&&(u.set(P,w),P.update())}function Ft(P,w){const H=P.colorSpace,Z=P.format,Q=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||H!==ms&&H!==Li&&(Qe.getTransfer(H)===ot?(Z!==On||Q!==ni)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",H)),w}function Tt(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(c.width=P.naturalWidth||P.width,c.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(c.width=P.displayWidth,c.height=P.displayHeight):(c.width=P.width,c.height=P.height),c}this.allocateTextureUnit=U,this.resetTextureUnits=I,this.setTexture2D=G,this.setTexture2DArray=z,this.setTexture3D=X,this.setTextureCube=V,this.rebindTextures=at,this.setupRenderTarget=N,this.updateRenderTargetMipmap=st,this.updateMultisampleRenderTarget=Te,this.setupDepthRenderbuffer=De,this.setupFrameBufferTexture=te,this.useMultisampledRTT=Ce}function MT(n,e){function t(i,a=Li){let s;const r=Qe.getTransfer(a);if(i===ni)return n.UNSIGNED_BYTE;if(i===Zd)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Jd)return n.UNSIGNED_SHORT_5_5_5_1;if(i===X_)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===q_)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===$_)return n.BYTE;if(i===W_)return n.SHORT;if(i===ir)return n.UNSIGNED_SHORT;if(i===jd)return n.INT;if(i===fa)return n.UNSIGNED_INT;if(i===vi)return n.FLOAT;if(i===wr)return n.HALF_FLOAT;if(i===K_)return n.ALPHA;if(i===Y_)return n.RGB;if(i===On)return n.RGBA;if(i===sr)return n.DEPTH_COMPONENT;if(i===rr)return n.DEPTH_STENCIL;if(i===j_)return n.RED;if(i===Qd)return n.RED_INTEGER;if(i===Z_)return n.RG;if(i===ef)return n.RG_INTEGER;if(i===tf)return n.RGBA_INTEGER;if(i===ko||i===Do||i===Fo||i===Oo)if(r===ot)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===ko)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Do)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Fo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Oo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===ko)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Do)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Fo)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Oo)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Tu||i===Cu||i===Au||i===Ru)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Tu)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Cu)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Au)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Ru)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Pu||i===Lu||i===Nu)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Pu||i===Lu)return r===ot?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Nu)return r===ot?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Iu||i===ku||i===Du||i===Fu||i===Ou||i===Uu||i===Bu||i===zu||i===Hu||i===Vu||i===Gu||i===$u||i===Wu||i===Xu)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Iu)return r===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===ku)return r===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Du)return r===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Fu)return r===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Ou)return r===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Uu)return r===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Bu)return r===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===zu)return r===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Hu)return r===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Vu)return r===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Gu)return r===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===$u)return r===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Wu)return r===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Xu)return r===ot?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===qu||i===Ku||i===Yu)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===qu)return r===ot?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Ku)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Yu)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===ju||i===Zu||i===Ju||i===Qu)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===ju)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Zu)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Ju)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Qu)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===ar?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const TT=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,CT=`
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

}`;class AT{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new fg(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new zi({vertexShader:TT,fragmentShader:CT,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ze(new nn(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class RT extends ma{constructor(e,t){super();const i=this;let a=null,s=1,r=null,o="local-floor",l=1,c=null,u=null,d=null,f=null,p=null,_=null;const g=typeof XRWebGLBinding<"u",m=new AT,h={},y=t.getContextAttributes();let x=null,b=null;const A=[],M=[],T=new le;let C=null;const v=new bn;v.viewport=new Mt;const S=new bn;S.viewport=new Mt;const R=[v,S],I=new KS;let U=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(O){let K=A[O];return K===void 0&&(K=new cc,A[O]=K),K.getTargetRaySpace()},this.getControllerGrip=function(O){let K=A[O];return K===void 0&&(K=new cc,A[O]=K),K.getGripSpace()},this.getHand=function(O){let K=A[O];return K===void 0&&(K=new cc,A[O]=K),K.getHandSpace()};function G(O){const K=M.indexOf(O.inputSource);if(K===-1)return;const te=A[K];te!==void 0&&(te.update(O.inputSource,O.frame,c||r),te.dispatchEvent({type:O.type,data:O.inputSource}))}function z(){a.removeEventListener("select",G),a.removeEventListener("selectstart",G),a.removeEventListener("selectend",G),a.removeEventListener("squeeze",G),a.removeEventListener("squeezestart",G),a.removeEventListener("squeezeend",G),a.removeEventListener("end",z),a.removeEventListener("inputsourceschange",X);for(let O=0;O<A.length;O++){const K=M[O];K!==null&&(M[O]=null,A[O].disconnect(K))}U=null,B=null,m.reset();for(const O in h)delete h[O];e.setRenderTarget(x),p=null,f=null,d=null,a=null,b=null,he.stop(),i.isPresenting=!1,e.setPixelRatio(C),e.setSize(T.width,T.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(O){s=O,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(O){o=O,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||r},this.setReferenceSpace=function(O){c=O},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return d===null&&g&&(d=new XRWebGLBinding(a,t)),d},this.getFrame=function(){return _},this.getSession=function(){return a},this.setSession=async function(O){if(a=O,a!==null){if(x=e.getRenderTarget(),a.addEventListener("select",G),a.addEventListener("selectstart",G),a.addEventListener("selectend",G),a.addEventListener("squeeze",G),a.addEventListener("squeezestart",G),a.addEventListener("squeezeend",G),a.addEventListener("end",z),a.addEventListener("inputsourceschange",X),y.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(T),g&&"createProjectionLayer"in XRWebGLBinding.prototype){let te=null,Se=null,ve=null;y.depth&&(ve=y.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,te=y.stencil?rr:sr,Se=y.stencil?ar:fa);const De={colorFormat:t.RGBA8,depthFormat:ve,scaleFactor:s};d=this.getBinding(),f=d.createProjectionLayer(De),a.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),b=new pa(f.textureWidth,f.textureHeight,{format:On,type:ni,depthTexture:new dg(f.textureWidth,f.textureHeight,Se,void 0,void 0,void 0,void 0,void 0,void 0,te),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const te={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(a,t,te),a.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),b=new pa(p.framebufferWidth,p.framebufferHeight,{format:On,type:ni,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(l),c=null,r=await a.requestReferenceSpace(o),he.setContext(a),he.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(a!==null)return a.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function X(O){for(let K=0;K<O.removed.length;K++){const te=O.removed[K],Se=M.indexOf(te);Se>=0&&(M[Se]=null,A[Se].disconnect(te))}for(let K=0;K<O.added.length;K++){const te=O.added[K];let Se=M.indexOf(te);if(Se===-1){for(let De=0;De<A.length;De++)if(De>=M.length){M.push(te),Se=De;break}else if(M[De]===null){M[De]=te,Se=De;break}if(Se===-1)break}const ve=A[Se];ve&&ve.connect(te)}}const V=new L,ee=new L;function fe(O,K,te){V.setFromMatrixPosition(K.matrixWorld),ee.setFromMatrixPosition(te.matrixWorld);const Se=V.distanceTo(ee),ve=K.projectionMatrix.elements,De=te.projectionMatrix.elements,at=ve[14]/(ve[10]-1),N=ve[14]/(ve[10]+1),st=(ve[9]+1)/ve[5],Ve=(ve[9]-1)/ve[5],Ue=(ve[8]-1)/ve[0],Te=(De[8]+1)/De[0],_t=at*Ue,Ce=at*Te,We=Se/(-Ue+Te),Ft=We*-Ue;if(K.matrixWorld.decompose(O.position,O.quaternion,O.scale),O.translateX(Ft),O.translateZ(We),O.matrixWorld.compose(O.position,O.quaternion,O.scale),O.matrixWorldInverse.copy(O.matrixWorld).invert(),ve[10]===-1)O.projectionMatrix.copy(K.projectionMatrix),O.projectionMatrixInverse.copy(K.projectionMatrixInverse);else{const Tt=at+We,P=N+We,w=_t-Ft,H=Ce+(Se-Ft),Z=st*N/P*Tt,Q=Ve*N/P*Tt;O.projectionMatrix.makePerspective(w,H,Z,Q,Tt,P),O.projectionMatrixInverse.copy(O.projectionMatrix).invert()}}function q(O,K){K===null?O.matrixWorld.copy(O.matrix):O.matrixWorld.multiplyMatrices(K.matrixWorld,O.matrix),O.matrixWorldInverse.copy(O.matrixWorld).invert()}this.updateCamera=function(O){if(a===null)return;let K=O.near,te=O.far;m.texture!==null&&(m.depthNear>0&&(K=m.depthNear),m.depthFar>0&&(te=m.depthFar)),I.near=S.near=v.near=K,I.far=S.far=v.far=te,(U!==I.near||B!==I.far)&&(a.updateRenderState({depthNear:I.near,depthFar:I.far}),U=I.near,B=I.far),I.layers.mask=O.layers.mask|6,v.layers.mask=I.layers.mask&3,S.layers.mask=I.layers.mask&5;const Se=O.parent,ve=I.cameras;q(I,Se);for(let De=0;De<ve.length;De++)q(ve[De],Se);ve.length===2?fe(I,v,S):I.projectionMatrix.copy(v.projectionMatrix),ue(O,I,Se)};function ue(O,K,te){te===null?O.matrix.copy(K.matrixWorld):(O.matrix.copy(te.matrixWorld),O.matrix.invert(),O.matrix.multiply(K.matrixWorld)),O.matrix.decompose(O.position,O.quaternion,O.scale),O.updateMatrixWorld(!0),O.projectionMatrix.copy(K.projectionMatrix),O.projectionMatrixInverse.copy(K.projectionMatrixInverse),O.isPerspectiveCamera&&(O.fov=or*2*Math.atan(1/O.projectionMatrix.elements[5]),O.zoom=1)}this.getCamera=function(){return I},this.getFoveation=function(){if(!(f===null&&p===null))return l},this.setFoveation=function(O){l=O,f!==null&&(f.fixedFoveation=O),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=O)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(I)},this.getCameraTexture=function(O){return h[O]};let xe=null;function ye(O,K){if(u=K.getViewerPose(c||r),_=K,u!==null){const te=u.views;p!==null&&(e.setRenderTargetFramebuffer(b,p.framebuffer),e.setRenderTarget(b));let Se=!1;te.length!==I.cameras.length&&(I.cameras.length=0,Se=!0);for(let N=0;N<te.length;N++){const st=te[N];let Ve=null;if(p!==null)Ve=p.getViewport(st);else{const Te=d.getViewSubImage(f,st);Ve=Te.viewport,N===0&&(e.setRenderTargetTextures(b,Te.colorTexture,Te.depthStencilTexture),e.setRenderTarget(b))}let Ue=R[N];Ue===void 0&&(Ue=new bn,Ue.layers.enable(N),Ue.viewport=new Mt,R[N]=Ue),Ue.matrix.fromArray(st.transform.matrix),Ue.matrix.decompose(Ue.position,Ue.quaternion,Ue.scale),Ue.projectionMatrix.fromArray(st.projectionMatrix),Ue.projectionMatrixInverse.copy(Ue.projectionMatrix).invert(),Ue.viewport.set(Ve.x,Ve.y,Ve.width,Ve.height),N===0&&(I.matrix.copy(Ue.matrix),I.matrix.decompose(I.position,I.quaternion,I.scale)),Se===!0&&I.cameras.push(Ue)}const ve=a.enabledFeatures;if(ve&&ve.includes("depth-sensing")&&a.depthUsage=="gpu-optimized"&&g){d=i.getBinding();const N=d.getDepthInformation(te[0]);N&&N.isValid&&N.texture&&m.init(N,a.renderState)}if(ve&&ve.includes("camera-access")&&g){e.state.unbindTexture(),d=i.getBinding();for(let N=0;N<te.length;N++){const st=te[N].camera;if(st){let Ve=h[st];Ve||(Ve=new fg,h[st]=Ve);const Ue=d.getCameraImage(st);Ve.sourceTexture=Ue}}}}for(let te=0;te<A.length;te++){const Se=M[te],ve=A[te];Se!==null&&ve!==void 0&&ve.update(Se,K,c||r)}xe&&xe(O,K),K.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:K}),_=null}const he=new Eg;he.setAnimationLoop(ye),this.setAnimationLoop=function(O){xe=O},this.dispose=function(){}}}const ji=new Hn,PT=new yt;function LT(n,e){function t(m,h){m.matrixAutoUpdate===!0&&m.updateMatrix(),h.value.copy(m.matrix)}function i(m,h){h.color.getRGB(m.fogColor.value,sg(n)),h.isFog?(m.fogNear.value=h.near,m.fogFar.value=h.far):h.isFogExp2&&(m.fogDensity.value=h.density)}function a(m,h,y,x,b){h.isMeshBasicMaterial||h.isMeshLambertMaterial?s(m,h):h.isMeshToonMaterial?(s(m,h),d(m,h)):h.isMeshPhongMaterial?(s(m,h),u(m,h)):h.isMeshStandardMaterial?(s(m,h),f(m,h),h.isMeshPhysicalMaterial&&p(m,h,b)):h.isMeshMatcapMaterial?(s(m,h),_(m,h)):h.isMeshDepthMaterial?s(m,h):h.isMeshDistanceMaterial?(s(m,h),g(m,h)):h.isMeshNormalMaterial?s(m,h):h.isLineBasicMaterial?(r(m,h),h.isLineDashedMaterial&&o(m,h)):h.isPointsMaterial?l(m,h,y,x):h.isSpriteMaterial?c(m,h):h.isShadowMaterial?(m.color.value.copy(h.color),m.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function s(m,h){m.opacity.value=h.opacity,h.color&&m.diffuse.value.copy(h.color),h.emissive&&m.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(m.map.value=h.map,t(h.map,m.mapTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,t(h.alphaMap,m.alphaMapTransform)),h.bumpMap&&(m.bumpMap.value=h.bumpMap,t(h.bumpMap,m.bumpMapTransform),m.bumpScale.value=h.bumpScale,h.side===sn&&(m.bumpScale.value*=-1)),h.normalMap&&(m.normalMap.value=h.normalMap,t(h.normalMap,m.normalMapTransform),m.normalScale.value.copy(h.normalScale),h.side===sn&&m.normalScale.value.negate()),h.displacementMap&&(m.displacementMap.value=h.displacementMap,t(h.displacementMap,m.displacementMapTransform),m.displacementScale.value=h.displacementScale,m.displacementBias.value=h.displacementBias),h.emissiveMap&&(m.emissiveMap.value=h.emissiveMap,t(h.emissiveMap,m.emissiveMapTransform)),h.specularMap&&(m.specularMap.value=h.specularMap,t(h.specularMap,m.specularMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest);const y=e.get(h),x=y.envMap,b=y.envMapRotation;x&&(m.envMap.value=x,ji.copy(b),ji.x*=-1,ji.y*=-1,ji.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(ji.y*=-1,ji.z*=-1),m.envMapRotation.value.setFromMatrix4(PT.makeRotationFromEuler(ji)),m.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=h.reflectivity,m.ior.value=h.ior,m.refractionRatio.value=h.refractionRatio),h.lightMap&&(m.lightMap.value=h.lightMap,m.lightMapIntensity.value=h.lightMapIntensity,t(h.lightMap,m.lightMapTransform)),h.aoMap&&(m.aoMap.value=h.aoMap,m.aoMapIntensity.value=h.aoMapIntensity,t(h.aoMap,m.aoMapTransform))}function r(m,h){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,h.map&&(m.map.value=h.map,t(h.map,m.mapTransform))}function o(m,h){m.dashSize.value=h.dashSize,m.totalSize.value=h.dashSize+h.gapSize,m.scale.value=h.scale}function l(m,h,y,x){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,m.size.value=h.size*y,m.scale.value=x*.5,h.map&&(m.map.value=h.map,t(h.map,m.uvTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,t(h.alphaMap,m.alphaMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest)}function c(m,h){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,m.rotation.value=h.rotation,h.map&&(m.map.value=h.map,t(h.map,m.mapTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,t(h.alphaMap,m.alphaMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest)}function u(m,h){m.specular.value.copy(h.specular),m.shininess.value=Math.max(h.shininess,1e-4)}function d(m,h){h.gradientMap&&(m.gradientMap.value=h.gradientMap)}function f(m,h){m.metalness.value=h.metalness,h.metalnessMap&&(m.metalnessMap.value=h.metalnessMap,t(h.metalnessMap,m.metalnessMapTransform)),m.roughness.value=h.roughness,h.roughnessMap&&(m.roughnessMap.value=h.roughnessMap,t(h.roughnessMap,m.roughnessMapTransform)),h.envMap&&(m.envMapIntensity.value=h.envMapIntensity)}function p(m,h,y){m.ior.value=h.ior,h.sheen>0&&(m.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),m.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(m.sheenColorMap.value=h.sheenColorMap,t(h.sheenColorMap,m.sheenColorMapTransform)),h.sheenRoughnessMap&&(m.sheenRoughnessMap.value=h.sheenRoughnessMap,t(h.sheenRoughnessMap,m.sheenRoughnessMapTransform))),h.clearcoat>0&&(m.clearcoat.value=h.clearcoat,m.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(m.clearcoatMap.value=h.clearcoatMap,t(h.clearcoatMap,m.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,t(h.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(m.clearcoatNormalMap.value=h.clearcoatNormalMap,t(h.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===sn&&m.clearcoatNormalScale.value.negate())),h.dispersion>0&&(m.dispersion.value=h.dispersion),h.iridescence>0&&(m.iridescence.value=h.iridescence,m.iridescenceIOR.value=h.iridescenceIOR,m.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(m.iridescenceMap.value=h.iridescenceMap,t(h.iridescenceMap,m.iridescenceMapTransform)),h.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=h.iridescenceThicknessMap,t(h.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),h.transmission>0&&(m.transmission.value=h.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),h.transmissionMap&&(m.transmissionMap.value=h.transmissionMap,t(h.transmissionMap,m.transmissionMapTransform)),m.thickness.value=h.thickness,h.thicknessMap&&(m.thicknessMap.value=h.thicknessMap,t(h.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=h.attenuationDistance,m.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(m.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(m.anisotropyMap.value=h.anisotropyMap,t(h.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=h.specularIntensity,m.specularColor.value.copy(h.specularColor),h.specularColorMap&&(m.specularColorMap.value=h.specularColorMap,t(h.specularColorMap,m.specularColorMapTransform)),h.specularIntensityMap&&(m.specularIntensityMap.value=h.specularIntensityMap,t(h.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,h){h.matcap&&(m.matcap.value=h.matcap)}function g(m,h){const y=e.get(h).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:a}}function NT(n,e,t,i){let a={},s={},r=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,x){const b=x.program;i.uniformBlockBinding(y,b)}function c(y,x){let b=a[y.id];b===void 0&&(_(y),b=u(y),a[y.id]=b,y.addEventListener("dispose",m));const A=x.program;i.updateUBOMapping(y,A);const M=e.render.frame;s[y.id]!==M&&(f(y),s[y.id]=M)}function u(y){const x=d();y.__bindingPointIndex=x;const b=n.createBuffer(),A=y.__size,M=y.usage;return n.bindBuffer(n.UNIFORM_BUFFER,b),n.bufferData(n.UNIFORM_BUFFER,A,M),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,x,b),b}function d(){for(let y=0;y<o;y++)if(r.indexOf(y)===-1)return r.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(y){const x=a[y.id],b=y.uniforms,A=y.__cache;n.bindBuffer(n.UNIFORM_BUFFER,x);for(let M=0,T=b.length;M<T;M++){const C=Array.isArray(b[M])?b[M]:[b[M]];for(let v=0,S=C.length;v<S;v++){const R=C[v];if(p(R,M,v,A)===!0){const I=R.__offset,U=Array.isArray(R.value)?R.value:[R.value];let B=0;for(let G=0;G<U.length;G++){const z=U[G],X=g(z);typeof z=="number"||typeof z=="boolean"?(R.__data[0]=z,n.bufferSubData(n.UNIFORM_BUFFER,I+B,R.__data)):z.isMatrix3?(R.__data[0]=z.elements[0],R.__data[1]=z.elements[1],R.__data[2]=z.elements[2],R.__data[3]=0,R.__data[4]=z.elements[3],R.__data[5]=z.elements[4],R.__data[6]=z.elements[5],R.__data[7]=0,R.__data[8]=z.elements[6],R.__data[9]=z.elements[7],R.__data[10]=z.elements[8],R.__data[11]=0):(z.toArray(R.__data,B),B+=X.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,I,R.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(y,x,b,A){const M=y.value,T=x+"_"+b;if(A[T]===void 0)return typeof M=="number"||typeof M=="boolean"?A[T]=M:A[T]=M.clone(),!0;{const C=A[T];if(typeof M=="number"||typeof M=="boolean"){if(C!==M)return A[T]=M,!0}else if(C.equals(M)===!1)return C.copy(M),!0}return!1}function _(y){const x=y.uniforms;let b=0;const A=16;for(let T=0,C=x.length;T<C;T++){const v=Array.isArray(x[T])?x[T]:[x[T]];for(let S=0,R=v.length;S<R;S++){const I=v[S],U=Array.isArray(I.value)?I.value:[I.value];for(let B=0,G=U.length;B<G;B++){const z=U[B],X=g(z),V=b%A,ee=V%X.boundary,fe=V+ee;b+=ee,fe!==0&&A-fe<X.storage&&(b+=A-fe),I.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),I.__offset=b,b+=X.storage}}}const M=b%A;return M>0&&(b+=A-M),y.__size=b,y.__cache={},this}function g(y){const x={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(x.boundary=4,x.storage=4):y.isVector2?(x.boundary=8,x.storage=8):y.isVector3||y.isColor?(x.boundary=16,x.storage=12):y.isVector4?(x.boundary=16,x.storage=16):y.isMatrix3?(x.boundary=48,x.storage=48):y.isMatrix4?(x.boundary=64,x.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),x}function m(y){const x=y.target;x.removeEventListener("dispose",m);const b=r.indexOf(x.__bindingPointIndex);r.splice(b,1),n.deleteBuffer(a[x.id]),delete a[x.id],delete s[x.id]}function h(){for(const y in a)n.deleteBuffer(a[y]);r=[],a={},s={}}return{bind:l,update:c,dispose:h}}class IT{constructor(e={}){const{canvas:t=Nb(),context:i=null,depth:a=!0,stencil:s=!1,alpha:r=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=r;const _=new Uint32Array(4),g=new Int32Array(4);let m=null,h=null;const y=[],x=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Fi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const b=this;let A=!1;this._outputColorSpace=$t;let M=0,T=0,C=null,v=-1,S=null;const R=new Mt,I=new Mt;let U=null;const B=new Ye(0);let G=0,z=t.width,X=t.height,V=1,ee=null,fe=null;const q=new Mt(0,0,z,X),ue=new Mt(0,0,z,X);let xe=!1;const ye=new of;let he=!1,O=!1;const K=new yt,te=new L,Se=new Mt,ve={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let De=!1;function at(){return C===null?V:1}let N=i;function st(E,D){return t.getContext(E,D)}try{const E={alpha:!0,depth:a,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Yd}`),t.addEventListener("webglcontextlost",ce,!1),t.addEventListener("webglcontextrestored",we,!1),t.addEventListener("webglcontextcreationerror",ie,!1),N===null){const D="webgl2";if(N=st(D,E),N===null)throw st(D)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let Ve,Ue,Te,_t,Ce,We,Ft,Tt,P,w,H,Z,Q,Y,Le,oe,Ae,Re,se,_e,Fe,Pe,pe,Ge;function k(){Ve=new GE(N),Ve.init(),Pe=new MT(N,Ve),Ue=new FE(N,Ve,e,Pe),Te=new wT(N,Ve),Ue.reversedDepthBuffer&&f&&Te.buffers.depth.setReversed(!0),_t=new XE(N),Ce=new uT,We=new ET(N,Ve,Te,Ce,Ue,Pe,_t),Ft=new UE(b),Tt=new VE(b),P=new JS(N),pe=new kE(N,P),w=new $E(N,P,_t,pe),H=new KE(N,w,P,_t),se=new qE(N,Ue,We),oe=new OE(Ce),Z=new cT(b,Ft,Tt,Ve,Ue,pe,oe),Q=new LT(b,Ce),Y=new fT,Le=new vT(Ve),Re=new IE(b,Ft,Tt,Te,H,p,l),Ae=new ST(b,H,Ue),Ge=new NT(N,_t,Ue,Te),_e=new DE(N,Ve,_t),Fe=new WE(N,Ve,_t),_t.programs=Z.programs,b.capabilities=Ue,b.extensions=Ve,b.properties=Ce,b.renderLists=Y,b.shadowMap=Ae,b.state=Te,b.info=_t}k();const re=new RT(b,N);this.xr=re,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const E=Ve.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=Ve.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(E){E!==void 0&&(V=E,this.setSize(z,X,!1))},this.getSize=function(E){return E.set(z,X)},this.setSize=function(E,D,$=!0){if(re.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}z=E,X=D,t.width=Math.floor(E*V),t.height=Math.floor(D*V),$===!0&&(t.style.width=E+"px",t.style.height=D+"px"),this.setViewport(0,0,E,D)},this.getDrawingBufferSize=function(E){return E.set(z*V,X*V).floor()},this.setDrawingBufferSize=function(E,D,$){z=E,X=D,V=$,t.width=Math.floor(E*$),t.height=Math.floor(D*$),this.setViewport(0,0,E,D)},this.getCurrentViewport=function(E){return E.copy(R)},this.getViewport=function(E){return E.copy(q)},this.setViewport=function(E,D,$,W){E.isVector4?q.set(E.x,E.y,E.z,E.w):q.set(E,D,$,W),Te.viewport(R.copy(q).multiplyScalar(V).round())},this.getScissor=function(E){return E.copy(ue)},this.setScissor=function(E,D,$,W){E.isVector4?ue.set(E.x,E.y,E.z,E.w):ue.set(E,D,$,W),Te.scissor(I.copy(ue).multiplyScalar(V).round())},this.getScissorTest=function(){return xe},this.setScissorTest=function(E){Te.setScissorTest(xe=E)},this.setOpaqueSort=function(E){ee=E},this.setTransparentSort=function(E){fe=E},this.getClearColor=function(E){return E.copy(Re.getClearColor())},this.setClearColor=function(){Re.setClearColor(...arguments)},this.getClearAlpha=function(){return Re.getClearAlpha()},this.setClearAlpha=function(){Re.setClearAlpha(...arguments)},this.clear=function(E=!0,D=!0,$=!0){let W=0;if(E){let F=!1;if(C!==null){const ae=C.texture.format;F=ae===tf||ae===ef||ae===Qd}if(F){const ae=C.texture.type,me=ae===ni||ae===fa||ae===ir||ae===ar||ae===Zd||ae===Jd,Ee=Re.getClearColor(),be=Re.getClearAlpha(),ke=Ee.r,Be=Ee.g,Ne=Ee.b;me?(_[0]=ke,_[1]=Be,_[2]=Ne,_[3]=be,N.clearBufferuiv(N.COLOR,0,_)):(g[0]=ke,g[1]=Be,g[2]=Ne,g[3]=be,N.clearBufferiv(N.COLOR,0,g))}else W|=N.COLOR_BUFFER_BIT}D&&(W|=N.DEPTH_BUFFER_BIT),$&&(W|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),N.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ce,!1),t.removeEventListener("webglcontextrestored",we,!1),t.removeEventListener("webglcontextcreationerror",ie,!1),Re.dispose(),Y.dispose(),Le.dispose(),Ce.dispose(),Ft.dispose(),Tt.dispose(),H.dispose(),pe.dispose(),Ge.dispose(),Z.dispose(),re.dispose(),re.removeEventListener("sessionstart",Vn),re.removeEventListener("sessionend",Bf),Gi.stop()};function ce(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),A=!0}function we(){console.log("THREE.WebGLRenderer: Context Restored."),A=!1;const E=_t.autoReset,D=Ae.enabled,$=Ae.autoUpdate,W=Ae.needsUpdate,F=Ae.type;k(),_t.autoReset=E,Ae.enabled=D,Ae.autoUpdate=$,Ae.needsUpdate=W,Ae.type=F}function ie(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function J(E){const D=E.target;D.removeEventListener("dispose",J),Me(D)}function Me(E){He(E),Ce.remove(E)}function He(E){const D=Ce.get(E).programs;D!==void 0&&(D.forEach(function($){Z.releaseProgram($)}),E.isShaderMaterial&&Z.releaseShaderCache(E))}this.renderBufferDirect=function(E,D,$,W,F,ae){D===null&&(D=ve);const me=F.isMesh&&F.matrixWorld.determinant()<0,Ee=w0(E,D,$,W,F);Te.setMaterial(W,me);let be=$.index,ke=1;if(W.wireframe===!0){if(be=w.getWireframeAttribute($),be===void 0)return;ke=2}const Be=$.drawRange,Ne=$.attributes.position;let je=Be.start*ke,rt=(Be.start+Be.count)*ke;ae!==null&&(je=Math.max(je,ae.start*ke),rt=Math.min(rt,(ae.start+ae.count)*ke)),be!==null?(je=Math.max(je,0),rt=Math.min(rt,be.count)):Ne!=null&&(je=Math.max(je,0),rt=Math.min(rt,Ne.count));const Et=rt-je;if(Et<0||Et===1/0)return;pe.setup(F,W,Ee,$,be);let ht,ut=_e;if(be!==null&&(ht=P.get(be),ut=Fe,ut.setIndex(ht)),F.isMesh)W.wireframe===!0?(Te.setLineWidth(W.wireframeLinewidth*at()),ut.setMode(N.LINES)):ut.setMode(N.TRIANGLES);else if(F.isLine){let Ie=W.linewidth;Ie===void 0&&(Ie=1),Te.setLineWidth(Ie*at()),F.isLineSegments?ut.setMode(N.LINES):F.isLineLoop?ut.setMode(N.LINE_LOOP):ut.setMode(N.LINE_STRIP)}else F.isPoints?ut.setMode(N.POINTS):F.isSprite&&ut.setMode(N.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)lr("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ut.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if(Ve.get("WEBGL_multi_draw"))ut.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{const Ie=F._multiDrawStarts,St=F._multiDrawCounts,Je=F._multiDrawCount,rn=be?P.get(be).bytesPerElement:1,va=Ce.get(W).currentProgram.getUniforms();for(let on=0;on<Je;on++)va.setValue(N,"_gl_DrawID",on),ut.render(Ie[on]/rn,St[on])}else if(F.isInstancedMesh)ut.renderInstances(je,Et,F.count);else if($.isInstancedBufferGeometry){const Ie=$._maxInstanceCount!==void 0?$._maxInstanceCount:1/0,St=Math.min($.instanceCount,Ie);ut.renderInstances(je,Et,St)}else ut.render(je,Et)};function ft(E,D,$){E.transparent===!0&&E.side===et&&E.forceSinglePass===!1?(E.side=sn,E.needsUpdate=!0,Rr(E,D,$),E.side=Bi,E.needsUpdate=!0,Rr(E,D,$),E.side=et):Rr(E,D,$)}this.compile=function(E,D,$=null){$===null&&($=E),h=Le.get($),h.init(D),x.push(h),$.traverseVisible(function(F){F.isLight&&F.layers.test(D.layers)&&(h.pushLight(F),F.castShadow&&h.pushShadow(F))}),E!==$&&E.traverseVisible(function(F){F.isLight&&F.layers.test(D.layers)&&(h.pushLight(F),F.castShadow&&h.pushShadow(F))}),h.setupLights();const W=new Set;return E.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;const ae=F.material;if(ae)if(Array.isArray(ae))for(let me=0;me<ae.length;me++){const Ee=ae[me];ft(Ee,$,F),W.add(Ee)}else ft(ae,$,F),W.add(ae)}),h=x.pop(),W},this.compileAsync=function(E,D,$=null){const W=this.compile(E,D,$);return new Promise(F=>{function ae(){if(W.forEach(function(me){Ce.get(me).currentProgram.isReady()&&W.delete(me)}),W.size===0){F(E);return}setTimeout(ae,10)}Ve.get("KHR_parallel_shader_compile")!==null?ae():setTimeout(ae,10)})};let tt=null;function oi(E){tt&&tt(E)}function Vn(){Gi.stop()}function Bf(){Gi.start()}const Gi=new Eg;Gi.setAnimationLoop(oi),typeof self<"u"&&Gi.setContext(self),this.setAnimationLoop=function(E){tt=E,re.setAnimationLoop(E),E===null?Gi.stop():Gi.start()},re.addEventListener("sessionstart",Vn),re.addEventListener("sessionend",Bf),this.render=function(E,D){if(D!==void 0&&D.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),re.enabled===!0&&re.isPresenting===!0&&(re.cameraAutoUpdate===!0&&re.updateCamera(D),D=re.getCamera()),E.isScene===!0&&E.onBeforeRender(b,E,D,C),h=Le.get(E,x.length),h.init(D),x.push(h),K.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),ye.setFromProjectionMatrix(K,Zn,D.reversedDepth),O=this.localClippingEnabled,he=oe.init(this.clippingPlanes,O),m=Y.get(E,y.length),m.init(),y.push(m),re.enabled===!0&&re.isPresenting===!0){const ae=b.xr.getDepthSensingMesh();ae!==null&&zl(ae,D,-1/0,b.sortObjects)}zl(E,D,0,b.sortObjects),m.finish(),b.sortObjects===!0&&m.sort(ee,fe),De=re.enabled===!1||re.isPresenting===!1||re.hasDepthSensing()===!1,De&&Re.addToRenderList(m,E),this.info.render.frame++,he===!0&&oe.beginShadows();const $=h.state.shadowsArray;Ae.render($,E,D),he===!0&&oe.endShadows(),this.info.autoReset===!0&&this.info.reset();const W=m.opaque,F=m.transmissive;if(h.setupLights(),D.isArrayCamera){const ae=D.cameras;if(F.length>0)for(let me=0,Ee=ae.length;me<Ee;me++){const be=ae[me];Hf(W,F,E,be)}De&&Re.render(E);for(let me=0,Ee=ae.length;me<Ee;me++){const be=ae[me];zf(m,E,be,be.viewport)}}else F.length>0&&Hf(W,F,E,D),De&&Re.render(E),zf(m,E,D);C!==null&&T===0&&(We.updateMultisampleRenderTarget(C),We.updateRenderTargetMipmap(C)),E.isScene===!0&&E.onAfterRender(b,E,D),pe.resetDefaultState(),v=-1,S=null,x.pop(),x.length>0?(h=x[x.length-1],he===!0&&oe.setGlobalState(b.clippingPlanes,h.state.camera)):h=null,y.pop(),y.length>0?m=y[y.length-1]:m=null};function zl(E,D,$,W){if(E.visible===!1)return;if(E.layers.test(D.layers)){if(E.isGroup)$=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(D);else if(E.isLight)h.pushLight(E),E.castShadow&&h.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||ye.intersectsSprite(E)){W&&Se.setFromMatrixPosition(E.matrixWorld).applyMatrix4(K);const me=H.update(E),Ee=E.material;Ee.visible&&m.push(E,me,Ee,$,Se.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||ye.intersectsObject(E))){const me=H.update(E),Ee=E.material;if(W&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),Se.copy(E.boundingSphere.center)):(me.boundingSphere===null&&me.computeBoundingSphere(),Se.copy(me.boundingSphere.center)),Se.applyMatrix4(E.matrixWorld).applyMatrix4(K)),Array.isArray(Ee)){const be=me.groups;for(let ke=0,Be=be.length;ke<Be;ke++){const Ne=be[ke],je=Ee[Ne.materialIndex];je&&je.visible&&m.push(E,me,je,$,Se.z,Ne)}}else Ee.visible&&m.push(E,me,Ee,$,Se.z,null)}}const ae=E.children;for(let me=0,Ee=ae.length;me<Ee;me++)zl(ae[me],D,$,W)}function zf(E,D,$,W){const F=E.opaque,ae=E.transmissive,me=E.transparent;h.setupLightsView($),he===!0&&oe.setGlobalState(b.clippingPlanes,$),W&&Te.viewport(R.copy(W)),F.length>0&&Ar(F,D,$),ae.length>0&&Ar(ae,D,$),me.length>0&&Ar(me,D,$),Te.buffers.depth.setTest(!0),Te.buffers.depth.setMask(!0),Te.buffers.color.setMask(!0),Te.setPolygonOffset(!1)}function Hf(E,D,$,W){if(($.isScene===!0?$.overrideMaterial:null)!==null)return;h.state.transmissionRenderTarget[W.id]===void 0&&(h.state.transmissionRenderTarget[W.id]=new pa(1,1,{generateMipmaps:!0,type:Ve.has("EXT_color_buffer_half_float")||Ve.has("EXT_color_buffer_float")?wr:ni,minFilter:ca,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Qe.workingColorSpace}));const ae=h.state.transmissionRenderTarget[W.id],me=W.viewport||R;ae.setSize(me.z*b.transmissionResolutionScale,me.w*b.transmissionResolutionScale);const Ee=b.getRenderTarget(),be=b.getActiveCubeFace(),ke=b.getActiveMipmapLevel();b.setRenderTarget(ae),b.getClearColor(B),G=b.getClearAlpha(),G<1&&b.setClearColor(16777215,.5),b.clear(),De&&Re.render($);const Be=b.toneMapping;b.toneMapping=Fi;const Ne=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),h.setupLightsView(W),he===!0&&oe.setGlobalState(b.clippingPlanes,W),Ar(E,$,W),We.updateMultisampleRenderTarget(ae),We.updateRenderTargetMipmap(ae),Ve.has("WEBGL_multisampled_render_to_texture")===!1){let je=!1;for(let rt=0,Et=D.length;rt<Et;rt++){const ht=D[rt],ut=ht.object,Ie=ht.geometry,St=ht.material,Je=ht.group;if(St.side===et&&ut.layers.test(W.layers)){const rn=St.side;St.side=sn,St.needsUpdate=!0,Vf(ut,$,W,Ie,St,Je),St.side=rn,St.needsUpdate=!0,je=!0}}je===!0&&(We.updateMultisampleRenderTarget(ae),We.updateRenderTargetMipmap(ae))}b.setRenderTarget(Ee,be,ke),b.setClearColor(B,G),Ne!==void 0&&(W.viewport=Ne),b.toneMapping=Be}function Ar(E,D,$){const W=D.isScene===!0?D.overrideMaterial:null;for(let F=0,ae=E.length;F<ae;F++){const me=E[F],Ee=me.object,be=me.geometry,ke=me.group;let Be=me.material;Be.allowOverride===!0&&W!==null&&(Be=W),Ee.layers.test($.layers)&&Vf(Ee,D,$,be,Be,ke)}}function Vf(E,D,$,W,F,ae){E.onBeforeRender(b,D,$,W,F,ae),E.modelViewMatrix.multiplyMatrices($.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),F.onBeforeRender(b,D,$,W,E,ae),F.transparent===!0&&F.side===et&&F.forceSinglePass===!1?(F.side=sn,F.needsUpdate=!0,b.renderBufferDirect($,D,W,F,E,ae),F.side=Bi,F.needsUpdate=!0,b.renderBufferDirect($,D,W,F,E,ae),F.side=et):b.renderBufferDirect($,D,W,F,E,ae),E.onAfterRender(b,D,$,W,F,ae)}function Rr(E,D,$){D.isScene!==!0&&(D=ve);const W=Ce.get(E),F=h.state.lights,ae=h.state.shadowsArray,me=F.state.version,Ee=Z.getParameters(E,F.state,ae,D,$),be=Z.getProgramCacheKey(Ee);let ke=W.programs;W.environment=E.isMeshStandardMaterial?D.environment:null,W.fog=D.fog,W.envMap=(E.isMeshStandardMaterial?Tt:Ft).get(E.envMap||W.environment),W.envMapRotation=W.environment!==null&&E.envMap===null?D.environmentRotation:E.envMapRotation,ke===void 0&&(E.addEventListener("dispose",J),ke=new Map,W.programs=ke);let Be=ke.get(be);if(Be!==void 0){if(W.currentProgram===Be&&W.lightsStateVersion===me)return $f(E,Ee),Be}else Ee.uniforms=Z.getUniforms(E),E.onBeforeCompile(Ee,b),Be=Z.acquireProgram(Ee,be),ke.set(be,Be),W.uniforms=Ee.uniforms;const Ne=W.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Ne.clippingPlanes=oe.uniform),$f(E,Ee),W.needsLights=M0(E),W.lightsStateVersion=me,W.needsLights&&(Ne.ambientLightColor.value=F.state.ambient,Ne.lightProbe.value=F.state.probe,Ne.directionalLights.value=F.state.directional,Ne.directionalLightShadows.value=F.state.directionalShadow,Ne.spotLights.value=F.state.spot,Ne.spotLightShadows.value=F.state.spotShadow,Ne.rectAreaLights.value=F.state.rectArea,Ne.ltc_1.value=F.state.rectAreaLTC1,Ne.ltc_2.value=F.state.rectAreaLTC2,Ne.pointLights.value=F.state.point,Ne.pointLightShadows.value=F.state.pointShadow,Ne.hemisphereLights.value=F.state.hemi,Ne.directionalShadowMap.value=F.state.directionalShadowMap,Ne.directionalShadowMatrix.value=F.state.directionalShadowMatrix,Ne.spotShadowMap.value=F.state.spotShadowMap,Ne.spotLightMatrix.value=F.state.spotLightMatrix,Ne.spotLightMap.value=F.state.spotLightMap,Ne.pointShadowMap.value=F.state.pointShadowMap,Ne.pointShadowMatrix.value=F.state.pointShadowMatrix),W.currentProgram=Be,W.uniformsList=null,Be}function Gf(E){if(E.uniformsList===null){const D=E.currentProgram.getUniforms();E.uniformsList=Uo.seqWithValue(D.seq,E.uniforms)}return E.uniformsList}function $f(E,D){const $=Ce.get(E);$.outputColorSpace=D.outputColorSpace,$.batching=D.batching,$.batchingColor=D.batchingColor,$.instancing=D.instancing,$.instancingColor=D.instancingColor,$.instancingMorph=D.instancingMorph,$.skinning=D.skinning,$.morphTargets=D.morphTargets,$.morphNormals=D.morphNormals,$.morphColors=D.morphColors,$.morphTargetsCount=D.morphTargetsCount,$.numClippingPlanes=D.numClippingPlanes,$.numIntersection=D.numClipIntersection,$.vertexAlphas=D.vertexAlphas,$.vertexTangents=D.vertexTangents,$.toneMapping=D.toneMapping}function w0(E,D,$,W,F){D.isScene!==!0&&(D=ve),We.resetTextureUnits();const ae=D.fog,me=W.isMeshStandardMaterial?D.environment:null,Ee=C===null?b.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:ms,be=(W.isMeshStandardMaterial?Tt:Ft).get(W.envMap||me),ke=W.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,Be=!!$.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),Ne=!!$.morphAttributes.position,je=!!$.morphAttributes.normal,rt=!!$.morphAttributes.color;let Et=Fi;W.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(Et=b.toneMapping);const ht=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,ut=ht!==void 0?ht.length:0,Ie=Ce.get(W),St=h.state.lights;if(he===!0&&(O===!0||E!==S)){const Xt=E===S&&W.id===v;oe.setState(W,E,Xt)}let Je=!1;W.version===Ie.__version?(Ie.needsLights&&Ie.lightsStateVersion!==St.state.version||Ie.outputColorSpace!==Ee||F.isBatchedMesh&&Ie.batching===!1||!F.isBatchedMesh&&Ie.batching===!0||F.isBatchedMesh&&Ie.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&Ie.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&Ie.instancing===!1||!F.isInstancedMesh&&Ie.instancing===!0||F.isSkinnedMesh&&Ie.skinning===!1||!F.isSkinnedMesh&&Ie.skinning===!0||F.isInstancedMesh&&Ie.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&Ie.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&Ie.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&Ie.instancingMorph===!1&&F.morphTexture!==null||Ie.envMap!==be||W.fog===!0&&Ie.fog!==ae||Ie.numClippingPlanes!==void 0&&(Ie.numClippingPlanes!==oe.numPlanes||Ie.numIntersection!==oe.numIntersection)||Ie.vertexAlphas!==ke||Ie.vertexTangents!==Be||Ie.morphTargets!==Ne||Ie.morphNormals!==je||Ie.morphColors!==rt||Ie.toneMapping!==Et||Ie.morphTargetsCount!==ut)&&(Je=!0):(Je=!0,Ie.__version=W.version);let rn=Ie.currentProgram;Je===!0&&(rn=Rr(W,D,F));let va=!1,on=!1,Cs=!1;const xt=rn.getUniforms(),_n=Ie.uniforms;if(Te.useProgram(rn.program)&&(va=!0,on=!0,Cs=!0),W.id!==v&&(v=W.id,on=!0),va||S!==E){Te.buffers.depth.getReversed()&&E.reversedDepth!==!0&&(E._reversedDepth=!0,E.updateProjectionMatrix()),xt.setValue(N,"projectionMatrix",E.projectionMatrix),xt.setValue(N,"viewMatrix",E.matrixWorldInverse);const Jt=xt.map.cameraPosition;Jt!==void 0&&Jt.setValue(N,te.setFromMatrixPosition(E.matrixWorld)),Ue.logarithmicDepthBuffer&&xt.setValue(N,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&xt.setValue(N,"isOrthographic",E.isOrthographicCamera===!0),S!==E&&(S=E,on=!0,Cs=!0)}if(F.isSkinnedMesh){xt.setOptional(N,F,"bindMatrix"),xt.setOptional(N,F,"bindMatrixInverse");const Xt=F.skeleton;Xt&&(Xt.boneTexture===null&&Xt.computeBoneTexture(),xt.setValue(N,"boneTexture",Xt.boneTexture,We))}F.isBatchedMesh&&(xt.setOptional(N,F,"batchingTexture"),xt.setValue(N,"batchingTexture",F._matricesTexture,We),xt.setOptional(N,F,"batchingIdTexture"),xt.setValue(N,"batchingIdTexture",F._indirectTexture,We),xt.setOptional(N,F,"batchingColorTexture"),F._colorsTexture!==null&&xt.setValue(N,"batchingColorTexture",F._colorsTexture,We));const gn=$.morphAttributes;if((gn.position!==void 0||gn.normal!==void 0||gn.color!==void 0)&&se.update(F,$,rn),(on||Ie.receiveShadow!==F.receiveShadow)&&(Ie.receiveShadow=F.receiveShadow,xt.setValue(N,"receiveShadow",F.receiveShadow)),W.isMeshGouraudMaterial&&W.envMap!==null&&(_n.envMap.value=be,_n.flipEnvMap.value=be.isCubeTexture&&be.isRenderTargetTexture===!1?-1:1),W.isMeshStandardMaterial&&W.envMap===null&&D.environment!==null&&(_n.envMapIntensity.value=D.environmentIntensity),on&&(xt.setValue(N,"toneMappingExposure",b.toneMappingExposure),Ie.needsLights&&E0(_n,Cs),ae&&W.fog===!0&&Q.refreshFogUniforms(_n,ae),Q.refreshMaterialUniforms(_n,W,V,X,h.state.transmissionRenderTarget[E.id]),Uo.upload(N,Gf(Ie),_n,We)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(Uo.upload(N,Gf(Ie),_n,We),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&xt.setValue(N,"center",F.center),xt.setValue(N,"modelViewMatrix",F.modelViewMatrix),xt.setValue(N,"normalMatrix",F.normalMatrix),xt.setValue(N,"modelMatrix",F.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){const Xt=W.uniformsGroups;for(let Jt=0,Hl=Xt.length;Jt<Hl;Jt++){const $i=Xt[Jt];Ge.update($i,rn),Ge.bind($i,rn)}}return rn}function E0(E,D){E.ambientLightColor.needsUpdate=D,E.lightProbe.needsUpdate=D,E.directionalLights.needsUpdate=D,E.directionalLightShadows.needsUpdate=D,E.pointLights.needsUpdate=D,E.pointLightShadows.needsUpdate=D,E.spotLights.needsUpdate=D,E.spotLightShadows.needsUpdate=D,E.rectAreaLights.needsUpdate=D,E.hemisphereLights.needsUpdate=D}function M0(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return M},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return C},this.setRenderTargetTextures=function(E,D,$){const W=Ce.get(E);W.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,W.__autoAllocateDepthBuffer===!1&&(W.__useRenderToTexture=!1),Ce.get(E.texture).__webglTexture=D,Ce.get(E.depthTexture).__webglTexture=W.__autoAllocateDepthBuffer?void 0:$,W.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,D){const $=Ce.get(E);$.__webglFramebuffer=D,$.__useDefaultFramebuffer=D===void 0};const T0=N.createFramebuffer();this.setRenderTarget=function(E,D=0,$=0){C=E,M=D,T=$;let W=!0,F=null,ae=!1,me=!1;if(E){const be=Ce.get(E);if(be.__useDefaultFramebuffer!==void 0)Te.bindFramebuffer(N.FRAMEBUFFER,null),W=!1;else if(be.__webglFramebuffer===void 0)We.setupRenderTarget(E);else if(be.__hasExternalTextures)We.rebindTextures(E,Ce.get(E.texture).__webglTexture,Ce.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const Ne=E.depthTexture;if(be.__boundDepthTexture!==Ne){if(Ne!==null&&Ce.has(Ne)&&(E.width!==Ne.image.width||E.height!==Ne.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");We.setupDepthRenderbuffer(E)}}const ke=E.texture;(ke.isData3DTexture||ke.isDataArrayTexture||ke.isCompressedArrayTexture)&&(me=!0);const Be=Ce.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Be[D])?F=Be[D][$]:F=Be[D],ae=!0):E.samples>0&&We.useMultisampledRTT(E)===!1?F=Ce.get(E).__webglMultisampledFramebuffer:Array.isArray(Be)?F=Be[$]:F=Be,R.copy(E.viewport),I.copy(E.scissor),U=E.scissorTest}else R.copy(q).multiplyScalar(V).floor(),I.copy(ue).multiplyScalar(V).floor(),U=xe;if($!==0&&(F=T0),Te.bindFramebuffer(N.FRAMEBUFFER,F)&&W&&Te.drawBuffers(E,F),Te.viewport(R),Te.scissor(I),Te.setScissorTest(U),ae){const be=Ce.get(E.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+D,be.__webglTexture,$)}else if(me){const be=D;for(let ke=0;ke<E.textures.length;ke++){const Be=Ce.get(E.textures[ke]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+ke,Be.__webglTexture,$,be)}}else if(E!==null&&$!==0){const be=Ce.get(E.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,be.__webglTexture,$)}v=-1},this.readRenderTargetPixels=function(E,D,$,W,F,ae,me,Ee=0){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let be=Ce.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&me!==void 0&&(be=be[me]),be){Te.bindFramebuffer(N.FRAMEBUFFER,be);try{const ke=E.textures[Ee],Be=ke.format,Ne=ke.type;if(!Ue.textureFormatReadable(Be)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ue.textureTypeReadable(Ne)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=E.width-W&&$>=0&&$<=E.height-F&&(E.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+Ee),N.readPixels(D,$,W,F,Pe.convert(Be),Pe.convert(Ne),ae))}finally{const ke=C!==null?Ce.get(C).__webglFramebuffer:null;Te.bindFramebuffer(N.FRAMEBUFFER,ke)}}},this.readRenderTargetPixelsAsync=async function(E,D,$,W,F,ae,me,Ee=0){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let be=Ce.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&me!==void 0&&(be=be[me]),be)if(D>=0&&D<=E.width-W&&$>=0&&$<=E.height-F){Te.bindFramebuffer(N.FRAMEBUFFER,be);const ke=E.textures[Ee],Be=ke.format,Ne=ke.type;if(!Ue.textureFormatReadable(Be))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ue.textureTypeReadable(Ne))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const je=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,je),N.bufferData(N.PIXEL_PACK_BUFFER,ae.byteLength,N.STREAM_READ),E.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+Ee),N.readPixels(D,$,W,F,Pe.convert(Be),Pe.convert(Ne),0);const rt=C!==null?Ce.get(C).__webglFramebuffer:null;Te.bindFramebuffer(N.FRAMEBUFFER,rt);const Et=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await Ib(N,Et,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,je),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,ae),N.deleteBuffer(je),N.deleteSync(Et),ae}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(E,D=null,$=0){const W=Math.pow(2,-$),F=Math.floor(E.image.width*W),ae=Math.floor(E.image.height*W),me=D!==null?D.x:0,Ee=D!==null?D.y:0;We.setTexture2D(E,0),N.copyTexSubImage2D(N.TEXTURE_2D,$,0,0,me,Ee,F,ae),Te.unbindTexture()};const C0=N.createFramebuffer(),A0=N.createFramebuffer();this.copyTextureToTexture=function(E,D,$=null,W=null,F=0,ae=null){ae===null&&(F!==0?(lr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ae=F,F=0):ae=0);let me,Ee,be,ke,Be,Ne,je,rt,Et;const ht=E.isCompressedTexture?E.mipmaps[ae]:E.image;if($!==null)me=$.max.x-$.min.x,Ee=$.max.y-$.min.y,be=$.isBox3?$.max.z-$.min.z:1,ke=$.min.x,Be=$.min.y,Ne=$.isBox3?$.min.z:0;else{const gn=Math.pow(2,-F);me=Math.floor(ht.width*gn),Ee=Math.floor(ht.height*gn),E.isDataArrayTexture?be=ht.depth:E.isData3DTexture?be=Math.floor(ht.depth*gn):be=1,ke=0,Be=0,Ne=0}W!==null?(je=W.x,rt=W.y,Et=W.z):(je=0,rt=0,Et=0);const ut=Pe.convert(D.format),Ie=Pe.convert(D.type);let St;D.isData3DTexture?(We.setTexture3D(D,0),St=N.TEXTURE_3D):D.isDataArrayTexture||D.isCompressedArrayTexture?(We.setTexture2DArray(D,0),St=N.TEXTURE_2D_ARRAY):(We.setTexture2D(D,0),St=N.TEXTURE_2D),N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,D.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,D.unpackAlignment);const Je=N.getParameter(N.UNPACK_ROW_LENGTH),rn=N.getParameter(N.UNPACK_IMAGE_HEIGHT),va=N.getParameter(N.UNPACK_SKIP_PIXELS),on=N.getParameter(N.UNPACK_SKIP_ROWS),Cs=N.getParameter(N.UNPACK_SKIP_IMAGES);N.pixelStorei(N.UNPACK_ROW_LENGTH,ht.width),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,ht.height),N.pixelStorei(N.UNPACK_SKIP_PIXELS,ke),N.pixelStorei(N.UNPACK_SKIP_ROWS,Be),N.pixelStorei(N.UNPACK_SKIP_IMAGES,Ne);const xt=E.isDataArrayTexture||E.isData3DTexture,_n=D.isDataArrayTexture||D.isData3DTexture;if(E.isDepthTexture){const gn=Ce.get(E),Xt=Ce.get(D),Jt=Ce.get(gn.__renderTarget),Hl=Ce.get(Xt.__renderTarget);Te.bindFramebuffer(N.READ_FRAMEBUFFER,Jt.__webglFramebuffer),Te.bindFramebuffer(N.DRAW_FRAMEBUFFER,Hl.__webglFramebuffer);for(let $i=0;$i<be;$i++)xt&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Ce.get(E).__webglTexture,F,Ne+$i),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Ce.get(D).__webglTexture,ae,Et+$i)),N.blitFramebuffer(ke,Be,me,Ee,je,rt,me,Ee,N.DEPTH_BUFFER_BIT,N.NEAREST);Te.bindFramebuffer(N.READ_FRAMEBUFFER,null),Te.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(F!==0||E.isRenderTargetTexture||Ce.has(E)){const gn=Ce.get(E),Xt=Ce.get(D);Te.bindFramebuffer(N.READ_FRAMEBUFFER,C0),Te.bindFramebuffer(N.DRAW_FRAMEBUFFER,A0);for(let Jt=0;Jt<be;Jt++)xt?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,gn.__webglTexture,F,Ne+Jt):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,gn.__webglTexture,F),_n?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Xt.__webglTexture,ae,Et+Jt):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Xt.__webglTexture,ae),F!==0?N.blitFramebuffer(ke,Be,me,Ee,je,rt,me,Ee,N.COLOR_BUFFER_BIT,N.NEAREST):_n?N.copyTexSubImage3D(St,ae,je,rt,Et+Jt,ke,Be,me,Ee):N.copyTexSubImage2D(St,ae,je,rt,ke,Be,me,Ee);Te.bindFramebuffer(N.READ_FRAMEBUFFER,null),Te.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else _n?E.isDataTexture||E.isData3DTexture?N.texSubImage3D(St,ae,je,rt,Et,me,Ee,be,ut,Ie,ht.data):D.isCompressedArrayTexture?N.compressedTexSubImage3D(St,ae,je,rt,Et,me,Ee,be,ut,ht.data):N.texSubImage3D(St,ae,je,rt,Et,me,Ee,be,ut,Ie,ht):E.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,ae,je,rt,me,Ee,ut,Ie,ht.data):E.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,ae,je,rt,ht.width,ht.height,ut,ht.data):N.texSubImage2D(N.TEXTURE_2D,ae,je,rt,me,Ee,ut,Ie,ht);N.pixelStorei(N.UNPACK_ROW_LENGTH,Je),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,rn),N.pixelStorei(N.UNPACK_SKIP_PIXELS,va),N.pixelStorei(N.UNPACK_SKIP_ROWS,on),N.pixelStorei(N.UNPACK_SKIP_IMAGES,Cs),ae===0&&D.generateMipmaps&&N.generateMipmap(St),Te.unbindTexture()},this.initRenderTarget=function(E){Ce.get(E).__webglFramebuffer===void 0&&We.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?We.setTextureCube(E,0):E.isData3DTexture?We.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?We.setTexture2DArray(E,0):We.setTexture2D(E,0),Te.unbindTexture()},this.resetState=function(){M=0,T=0,C=null,Te.reset(),pe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Zn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Qe._getDrawingBufferColorSpace(e),t.unpackColorSpace=Qe._getUnpackColorSpace()}}const nh={type:"change"},pf={type:"start"},Rg={type:"end"},co=new rf,ih=new Ai,kT=Math.cos(70*dt.DEG2RAD),Rt=new L,Qt=2*Math.PI,lt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Mc=1e-6;class DT extends jS{constructor(e,t=null){super(e,t),this.state=lt.NONE,this.target=new L,this.cursor=new L,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:ja.ROTATE,MIDDLE:ja.DOLLY,RIGHT:ja.PAN},this.touches={ONE:Ga.ROTATE,TWO:Ga.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new L,this._lastQuaternion=new ii,this._lastTargetPosition=new L,this._quat=new ii().setFromUnitVectors(e.up,new L(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Rp,this._sphericalDelta=new Rp,this._scale=1,this._panOffset=new L,this._rotateStart=new le,this._rotateEnd=new le,this._rotateDelta=new le,this._panStart=new le,this._panEnd=new le,this._panDelta=new le,this._dollyStart=new le,this._dollyEnd=new le,this._dollyDelta=new le,this._dollyDirection=new L,this._mouse=new le,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=OT.bind(this),this._onPointerDown=FT.bind(this),this._onPointerUp=UT.bind(this),this._onContextMenu=WT.bind(this),this._onMouseWheel=HT.bind(this),this._onKeyDown=VT.bind(this),this._onTouchStart=GT.bind(this),this._onTouchMove=$T.bind(this),this._onMouseDown=BT.bind(this),this._onMouseMove=zT.bind(this),this._interceptControlDown=XT.bind(this),this._interceptControlUp=qT.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(nh),this.update(),this.state=lt.NONE}update(e=null){const t=this.object.position;Rt.copy(t).sub(this.target),Rt.applyQuaternion(this._quat),this._spherical.setFromVector3(Rt),this.autoRotate&&this.state===lt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,a=this.maxAzimuthAngle;isFinite(i)&&isFinite(a)&&(i<-Math.PI?i+=Qt:i>Math.PI&&(i-=Qt),a<-Math.PI?a+=Qt:a>Math.PI&&(a-=Qt),i<=a?this._spherical.theta=Math.max(i,Math.min(a,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+a)/2?Math.max(i,this._spherical.theta):Math.min(a,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let s=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const r=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),s=r!=this._spherical.radius}if(Rt.setFromSpherical(this._spherical),Rt.applyQuaternion(this._quatInverse),t.copy(this.target).add(Rt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let r=null;if(this.object.isPerspectiveCamera){const o=Rt.length();r=this._clampDistance(o*this._scale);const l=o-r;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),s=!!l}else if(this.object.isOrthographicCamera){const o=new L(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),s=l!==this.object.zoom;const c=new L(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),r=Rt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;r!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(r).add(this.object.position):(co.origin.copy(this.object.position),co.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(co.direction))<kT?this.object.lookAt(this.target):(ih.setFromNormalAndCoplanarPoint(this.object.up,this.target),co.intersectPlane(ih,this.target))))}else if(this.object.isOrthographicCamera){const r=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),r!==this.object.zoom&&(this.object.updateProjectionMatrix(),s=!0)}return this._scale=1,this._performCursorZoom=!1,s||this._lastPosition.distanceToSquared(this.object.position)>Mc||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Mc||this._lastTargetPosition.distanceToSquared(this.target)>Mc?(this.dispatchEvent(nh),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Qt/60*this.autoRotateSpeed*e:Qt/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Rt.setFromMatrixColumn(t,0),Rt.multiplyScalar(-e),this._panOffset.add(Rt)}_panUp(e,t){this.screenSpacePanning===!0?Rt.setFromMatrixColumn(t,1):(Rt.setFromMatrixColumn(t,0),Rt.crossVectors(this.object.up,Rt)),Rt.multiplyScalar(e),this._panOffset.add(Rt)}_pan(e,t){const i=this.domElement;if(this.object.isPerspectiveCamera){const a=this.object.position;Rt.copy(a).sub(this.target);let s=Rt.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*s/i.clientHeight,this.object.matrix),this._panUp(2*t*s/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),a=e-i.left,s=t-i.top,r=i.width,o=i.height;this._mouse.x=a/r*2-1,this._mouse.y=-(s/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Qt*this._rotateDelta.x/t.clientHeight),this._rotateUp(Qt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Qt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Qt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Qt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Qt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),a=.5*(e.pageY+t.y);this._rotateStart.set(i,a)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),a=.5*(e.pageY+t.y);this._panStart.set(i,a)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,a=e.pageY-t.y,s=Math.sqrt(i*i+a*a);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),a=.5*(e.pageX+i.x),s=.5*(e.pageY+i.y);this._rotateEnd.set(a,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Qt*this._rotateDelta.x/t.clientHeight),this._rotateUp(Qt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),a=.5*(e.pageY+t.y);this._panEnd.set(i,a)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,a=e.pageY-t.y,s=Math.sqrt(i*i+a*a);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const r=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(r,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new le,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function FT(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n)))}function OT(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function UT(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Rg),this.state=lt.NONE;break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function BT(n){let e;switch(n.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case ja.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=lt.DOLLY;break;case ja.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=lt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=lt.ROTATE}break;case ja.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=lt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=lt.PAN}break;default:this.state=lt.NONE}this.state!==lt.NONE&&this.dispatchEvent(pf)}function zT(n){switch(this.state){case lt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case lt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case lt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function HT(n){this.enabled===!1||this.enableZoom===!1||this.state!==lt.NONE||(n.preventDefault(),this.dispatchEvent(pf),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(Rg))}function VT(n){this.enabled!==!1&&this._handleKeyDown(n)}function GT(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case Ga.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=lt.TOUCH_ROTATE;break;case Ga.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=lt.TOUCH_PAN;break;default:this.state=lt.NONE}break;case 2:switch(this.touches.TWO){case Ga.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=lt.TOUCH_DOLLY_PAN;break;case Ga.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=lt.TOUCH_DOLLY_ROTATE;break;default:this.state=lt.NONE}break;default:this.state=lt.NONE}this.state!==lt.NONE&&this.dispatchEvent(pf)}function $T(n){switch(this._trackPointer(n),this.state){case lt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case lt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case lt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case lt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=lt.NONE}}function WT(n){this.enabled!==!1&&n.preventDefault()}function XT(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function qT(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const hf=1,Bo=.32,ah=1024,KT=16,YT=1.5;function sh(n){const e=new ct({color:n,transparent:!0,opacity:hf,side:et});return e.forceSinglePass=!0,e}function jT(n){return new Sg({color:n,side:et,transparent:!0,opacity:hf})}function Oa(n,e,t,i){return new ze(new xn(n,t,e,6,1,6),i)}function Tc(n,e,t,i,a,s,r,o){n.beginPath();for(let l=0;l<=e;l+=8){const c=l/e,u=i*t+Math.sin(c*Math.PI*2+s)*a+Math.sin(c*Math.PI*4+s*.5)*a*.35;l===0?n.moveTo(l,u):n.lineTo(l,u)}n.lineWidth=r,n.strokeStyle=o,n.stroke()}function Cc(n,e,t,i,a,s,r,o){n.beginPath();for(let l=0;l<=t;l+=8){const c=l/t,u=i*e+Math.sin(c*Math.PI*2+s)*a+Math.sin(c*Math.PI*6+s*.3)*a*.18;l===0?n.moveTo(u,l):n.lineTo(u,l)}n.lineWidth=r,n.strokeStyle=o,n.stroke()}function Ac(n,e,t,i,a,s){n.beginPath(),n.arc(e,t,i,0,Math.PI*2),n.fillStyle=a,n.fill(),n.lineWidth=Math.max(6,i*.15),n.strokeStyle=s,n.stroke()}function ZT(n){const e=document.createElement("canvas");e.width=ah,e.height=ah;const t=e.getContext("2d");if(!t)throw new Error("Unable to create ball texture canvas");const{width:i,height:a}=e,s=t.createLinearGradient(0,0,i,a);s.addColorStop(0,"#faf7ee"),s.addColorStop(.55,"#e7e1d0"),s.addColorStop(1,"#d5cfbe"),t.fillStyle=s,t.fillRect(0,0,i,a),t.globalAlpha=.22;for(let l=0;l<28;l+=1){const c=l/27*a;t.fillStyle=l%2===0?"#ffffff":"#d3cbb6",t.fillRect(0,c,i,a/54)}t.globalAlpha=1;const r="#2d313b";t.lineCap="round",Tc(t,i,a,.24,22,.35,18,r),Tc(t,i,a,.5,14,1.1,20,r),Tc(t,i,a,.77,20,2.35,18,r),Cc(t,i,a,.2,24,.2,18,r),Cc(t,i,a,.48,18,1.6,18,r),Cc(t,i,a,.76,26,2.7,18,r),t.globalAlpha=.92,Ac(t,i*.28,a*.32,88,"#f1a63a","#fff4d7"),Ac(t,i*.68,a*.6,72,"#4db0ff","#eef8ff"),Ac(t,i*.76,a*.2,54,"#1f232c","#f0ece1"),t.globalAlpha=1,t.beginPath(),t.moveTo(i*.08,a*.86),t.quadraticCurveTo(i*.28,a*.72,i*.42,a*.8),t.quadraticCurveTo(i*.58,a*.9,i*.82,a*.78),t.lineWidth=24,t.strokeStyle="rgba(255, 246, 220, 0.9)",t.stroke();const o=new Al(e);return o.colorSpace=$t,o.anisotropy=Math.min(8,n.capabilities.getMaxAnisotropy()),o}function JT(n,e,t,i){return new ze(new xn(n,e,t,6,6,1),i)}function QT(n){const e=10280*n,t=8240*n,i=1960*n,a=1e3*n,s=1900*n,r=800*n,o=900*n,l=Math.max(1,n),c=[],u=[1,-1];function d(g,m,h=null){const y=g.material.clone();return g.material=y,c.push({mesh:g,material:y,outwardLocal:m.clone().normalize(),fixedOpacity:h}),g}function f(g){const m=new pt,h=sh(g),y=t/2-a-s/2,x=Math.sqrt(2*Math.pow(a,2));for(const A of u){const M=d(Oa(y,i,l,h),new L(0,1,0));M.position.set(A*(y/2+s/2),0,i/2),m.add(M);const T=d(Oa(x,i,l,h),new L(0,1,0));T.position.set(A*(t/2-a/2),-a/2,i/2),T.rotateZ(-A*Math.PI/4),m.add(T)}const b=d(Oa(s,i-r,l,h),new L(0,1,0));return b.position.set(0,0,i/2+r/2),m.add(b),m}function p(g,m){const h=new pt,y=[[t/2,0],[-t/2,0],[-t/2,e/2-a],[-t/2+a,e/2],[-s/2,e/2],[-s/2,e/2+o],[s/2,e/2+o],[s/2,e/2],[t/2-a,e/2],[t/2,e/2-a],[t/2,0]],x=new uf;y.forEach(([S,R],I)=>{I===0?x.moveTo(S,R):x.lineTo(S,R)});const b=jT(g),A=sh(g),M=d(new ze(new Pl(x),b),new L(0,0,-1));M.receiveShadow=!0,h.add(M);for(const S of u){const R=d(Oa(o,r,l,A),new L(0,-S,0),Bo);R.position.set(S*s/2,e/2+o/2,r/2),R.rotateZ(Math.PI/2),h.add(R)}const T=d(JT(s,o,l,A),new L(0,0,1),Bo);T.position.set(0,e/2+o/2,r),h.add(T);const C=d(Oa(s,r,l,A),new L(0,1,0),Bo);C.position.set(0,e/2+o,r/2),h.add(C);const v=f(g);v.position.y=e/2,h.add(v);for(const S of u){const R=d(Oa(e/2-a,i,l,A),new L(0,-S,0));R.position.set(S*t/2,(e/2-a)/2,i/2),R.rotateZ(Math.PI/2),h.add(R)}return m&&h.rotateZ(Math.PI),h}const _=new pt;return _.add(p(16771251,!1)),_.add(p(8381439,!0)),{stadium:_,wallPanels:c}}function eC(n,e){const t=new pt;t.name=`${n.kind}-hitbox-wireframe`,t.visible=!1,t.rotateY(dt.degToRad(n.slopeDegrees));const i=new xn(n.length,n.width,n.height),a=new uS(i),s=new Mr({color:e,transparent:!0,opacity:.92,depthWrite:!1}),r=new cS(a,s);return t.add(r),t}function tC(n,e){const t=new pt,i=new pt;i.rotateY(dt.degToRad(e.slopeDegrees)),t.add(i);const a=new Sg({color:n}),s=new Js({color:1253678,shininess:80}),r=new Js({color:8968191,transparent:!0,opacity:.42,shininess:120}),o=new Js({color:2039845,shininess:48}),l=new ze(new xn(e.length*.94,e.width*.88,e.height*.44),a);l.position.z=-e.height*.19,l.castShadow=!0,i.add(l);const c=new ze(new xn(e.length*.28,e.width*.82,e.height*.32),a);c.position.set(e.length*.31,0,e.height*.02),c.castShadow=!0,i.add(c);const u=new ze(new xn(e.length*.34,e.width*.62,e.height*.34),r);u.position.set(-e.length*.06,0,e.height*.16),u.castShadow=!0,i.add(u);const d=new ze(new xn(e.length*.24,e.width*.74,e.height*.18),s);d.position.set(-e.length*.35,0,e.height*.03),d.castShadow=!0,i.add(d);const f=Math.max(6,e.height*.27),p=Math.max(5,e.width*.12),_=new Rl(f,f,p,14),g=(y,x)=>{const b=new ze(_,o);return b.position.set(y,x,-e.height*.39),b.castShadow=!0,b},m=e.length*.32,h=e.width*.5;return i.add(g(m,h)),i.add(g(m,-h)),i.add(g(-m,h)),i.add(g(-m,-h)),t.userData.hitboxKind=e.kind,t.userData.hitboxLabel=e.label,t}function nC(n){const e=new pt;e.visible=!1,e.position.set(-n.length*.55,0,0);const t=new cr(30,220,14,1,!0);t.rotateZ(Math.PI/2),t.translate(-110,0,0);const i=new cr(17,150,12,1,!0);i.rotateZ(Math.PI/2),i.translate(-75,0,0);const a=new vs(21,12,12),s=[-38,38];for(const r of s){const o=new pt;o.position.set(0,r,0);const l=new ct({color:"#ff9b2f",transparent:!0,opacity:.42,blending:Di,depthWrite:!1,side:et});l.forceSinglePass=!0;const c=new ze(t,l);c.name="outer-flame",o.add(c);const u=new ct({color:"#fff2ba",transparent:!0,opacity:.9,blending:Di,depthWrite:!1,side:et});u.forceSinglePass=!0;const d=new ze(i,u);d.name="inner-flame",o.add(d);const f=new ct({color:"#fff8db",transparent:!0,opacity:.62,blending:Di,depthWrite:!1});f.forceSinglePass=!0;const p=new ze(a,f);p.name="glow",p.position.x=-10,o.add(p),e.add(o)}return e}function iC(){const n=new pt;n.visible=!1,n.position.set(0,0,235);const e=240,t=82,i=188,a=20,s=new nn(e,t),r=new ct({color:463645,transparent:!0,opacity:.78,side:et,depthWrite:!1}),o=new ze(s,r);o.position.z=-1,n.add(o);const l=new nn(i,a),c=new ct({color:1385521,transparent:!0,opacity:.92,side:et,depthWrite:!1}),u=new ze(l,c);u.position.y=-18,n.add(u);const d=new nn(i,a),f=new ct({color:16761415,transparent:!0,opacity:.98,side:et,depthWrite:!1}),p=new ze(d,f);p.position.y=-18,n.add(p);const _=document.createElement("canvas");_.width=512,_.height=160;const g=_.getContext("2d");if(!g)throw new Error("Unable to create boost meter label context");const m=new Al(_);m.colorSpace=$t,m.needsUpdate=!0;const h=new nn(190,48),y=new ct({map:m,transparent:!0,depthWrite:!1,side:et}),x=new ze(h,y);return x.position.set(0,15,0),n.add(x),{group:n,fillMesh:p,fillMaterial:f,labelTexture:m,labelContext:g,labelCanvas:_,lastPercent:null}}function aC(){const n=new pt;n.visible=!1;const e=new ct({color:16765276,transparent:!0,opacity:.86,depthWrite:!1}),t=new ze(new df(170,8,8,48),e);t.position.z=16,n.add(t);const i=document.createElement("canvas");i.width=512,i.height=192;const a=i.getContext("2d");if(!a)throw new Error("Unable to create demo indicator label context");a.textAlign="center",a.textBaseline="middle",a.lineJoin="round",a.font="800 86px sans-serif",a.lineWidth=20,a.strokeStyle="rgba(7, 19, 29, 0.94)",a.strokeText("DEMO",i.width/2,88),a.fillStyle="#fff0b8",a.fillText("DEMO",i.width/2,88),a.font="700 34px sans-serif",a.lineWidth=10,a.strokeText("RESPAWNING",i.width/2,150),a.fillStyle="#ffbd4a",a.fillText("RESPAWNING",i.width/2,150);const s=new Al(i);s.colorSpace=$t;const r=new ct({map:s,transparent:!0,depthWrite:!1,side:et}),o=new ze(new nn(310,116),r);return o.position.z=300,n.add(o),{group:n,ring:t,label:o}}function sC(n,e,t,i){n.fillMesh.scale.x=Math.max(.001,e);const a=94;n.fillMesh.position.x=-(1-e)*a,n.fillMesh.position.y=-18;const s=Math.max(0,Math.min(100,Math.round(t/255*100)));if(n.lastPercent!==s){const{labelContext:r,labelCanvas:o,labelTexture:l}=n;r.clearRect(0,0,o.width,o.height),r.textAlign="center",r.textBaseline="middle",r.lineJoin="round",r.font="700 84px sans-serif",r.lineWidth=18,r.strokeStyle="rgba(7, 19, 29, 0.92)",r.strokeText(`${s}`,o.width/2,78),r.fillStyle="#fff8e1",r.fillText(`${s}`,o.width/2,78),r.font="600 30px sans-serif",r.lineWidth=10,r.strokeText("BOOST",o.width/2,130),r.fillStyle="#ffcf70",r.fillText("BOOST",o.width/2,130),l.needsUpdate=!0,n.lastPercent=s}n.group.quaternion.copy(i.quaternion)}function rC(n){n.add(new qS("#d8ecff",1.6));const e=new Ap("#fff6df",2.4);e.position.set(4e3,-6e3,5e3),n.add(e);const t=new Ap("#97d7ff",1.2);t.position.set(-5e3,4e3,3e3),n.add(t)}function oC(n){const e=ZT(n),t=new Js({color:16777215,map:e,shininess:42,specular:new Ye("#f7f2e3")});return{mesh:new ze(new vs(93,24,24),t),texture:e}}function lC(n,e,t){const i=new aS;i.background=new Ye("#081119");const a=new bn(48,1,10*t,5e5*t);a.up.set(0,0,1),a.position.set(0,-9e3*t,5e3*t),a.lookAt(0,0,0);const s=new IT({antialias:!1,powerPreference:"high-performance"});s.setPixelRatio(Math.min(window.devicePixelRatio||1,YT)),s.domElement.style.display="block",s.domElement.style.width="100%",s.domElement.style.height="100%",s.domElement.tabIndex=0,s.domElement.setAttribute("aria-label","Replay player viewport"),n.replaceChildren(s.domElement);const r=new DT(a,s.domElement);r.enableDamping=!0,r.maxDistance=16e4*t,r.keyPanSpeed=KT,r.target.set(0,0,600*t),r.listenToKeyEvents(s.domElement),r.update();const o=()=>{s.domElement.focus()};s.domElement.addEventListener("pointerdown",o);const{stadium:l,wallPanels:c}=QT(t);i.add(l),rC(i);const u=new pt;u.scale.set(-t,t,t),i.add(u);const{mesh:d,texture:f}=oC(s);u.add(d);const p=new Map,_=new Map,g=new Map,m=new Map,h=new Map;for(const v of e.players){const S=tC(v.isTeamZero?"#57a8ff":"#ff9c40",v.hitbox),R=eC(v.hitbox,v.isTeamZero?"#b9e0ff":"#ffd2a3");S.add(R);const I=nC(v.hitbox);S.add(I);const U=iC();S.add(U.group);const B=aC();u.add(S),u.add(B.group),p.set(v.id,S),_.set(v.id,R),g.set(v.id,I),m.set(v.id,U),h.set(v.id,B)}const y=()=>{const v=n.clientWidth||1,S=n.clientHeight||1;a.aspect=v/S,a.updateProjectionMatrix(),s.setSize(v,S,!1)};y();const x=new L,b=new L,A=new ii,M=new L;return{scene:i,replayRoot:u,camera:a,renderer:s,controls:r,resize:y,dispose:()=>{s.domElement.removeEventListener("pointerdown",o),r.stopListenToKeyEvents(),r.dispose(),f.dispose(),s.dispose(),n.replaceChildren()},ballMesh:d,playerMeshes:p,playerHitboxes:_,playerBoostTrails:g,playerBoostMeters:m,playerDemoIndicators:h,updateWallVisibility:()=>{i.updateMatrixWorld(!0);for(const v of c){if(v.fixedOpacity!==null){v.material.transparent=!0,v.material.opacity=v.fixedOpacity,v.material.depthWrite=!1;continue}v.mesh.getWorldPosition(x),v.mesh.getWorldQuaternion(A),b.copy(v.outwardLocal).applyQuaternion(A).normalize(),M.copy(a.position).sub(x);const S=b.dot(M)>0;v.material.transparent=!0,v.material.opacity=S?Bo:hf,v.material.depthWrite=!S}}}}function pr(n,e){if(n.frames.length===0)return 0;let t=0,i=n.frames.length-1;for(;t<=i;){const a=Math.floor((t+i)/2),s=n.frames[a]?.time??0;if(s<e)t=a+1;else if(s>e)i=a-1;else return a}return Math.max(0,t-1)}function cC(n,e){return n.frames.length===0?0:dt.clamp(Math.round(e),0,n.frames.length-1)}function uC(n){if(n.frames.length===0)return null;const e=new Map;for(const a of n.frames)e.set(a.gameState,(e.get(a.gameState)??0)+1);let t=null,i=-1;for(const[a,s]of e.entries())s<=i||(t=a,i=s);return t}function dC(n,e){if(e===null)return null;for(const t of n.frames){if(t.gameState===e)break;return t.gameState}return null}function Pg(n,e){return e===null?n.kickoffCountdown<=0:n.gameState===e}function mf(n,e){return n.kickoffCountdown>0?!0:e!==null&&n.gameState===e}function fC(n,e){return n.ballFrames[e]?.position?!0:n.players.some(t=>t.frames[e]?.position)}function pC(n,e,t,i){return mf(e,i)&&fC(n,t)}function zo(n,e,t,i,a){return!Pg(e,i)&&!pC(n,e,t,a)}function rh(n,e,t,i,a,s,r){return i&&zo(n,e,t,s,r)||a&&mf(e,r)}function hC(n,e,t,i,a){const s=[],{frames:r}=n;if(r.length===0||!e&&!t)return s;let o=0;for(;o<r.length;){const l=r[o];if(!l||!rh(n,l,o,e,t,i,a)){o+=1;continue}const c=l.time;let u=o+1;for(;u<r.length&&rh(n,r[u],u,e,t,i,a);)u+=1;const d=r[u]?.time??n.duration;if(d>c){const f=s.at(-1);f&&f.endTime>=c?f.endTime=Math.max(f.endTime,d):s.push({startTime:c,endTime:d})}o=u}return s}function mC(n,e,t){const i=dt.clamp(t,0,n);let a=0;for(const s of e){if(i<s.startTime)break;if(i<s.endTime)return{replayTime:i,timelineTime:s.startTime-a,seekTime:s.startTime,hiddenBySkip:!0};a+=s.endTime-s.startTime}return{replayTime:i,timelineTime:i-a,seekTime:i,hiddenBySkip:!1}}function _C(n,e,t,i){const a=dt.clamp(i,0,e);let s=0;for(const r of t){const o=r.startTime-s;if(a<=o)return a+s;s+=r.endTime-r.startTime}return dt.clamp(a+s,0,n)}function gC(n,e){const t=e.at(-1);return!t||t.endTime<n?n:dt.clamp(t.startTime,0,n)}function vC(n,e,t){const i=n.frames[e];if(!i||i.kickoffCountdown<=0)return null;let a=e;for(;a>0&&(n.frames[a-1]?.kickoffCountdown??0)>0;)a-=1;let s=e+1;for(;s<n.frames.length&&n.frames[s].kickoffCountdown>0;)s+=1;let r=0;for(let c=a;c<s;c+=1)r=Math.max(r,n.frames[c].kickoffCountdown);const o=n.frames[s]?.time??n.duration,l=Math.max(0,o-t);return{kind:"kickoff-countdown",countdown:Math.max(1,Math.min(r,Math.ceil(l))),secondsRemaining:l,endsAt:o}}function yC(n,e){const t=pr(n,e),i=Math.min(t+1,n.frames.length-1);if(i===t)return{frameIndex:t,nextFrameIndex:i,alpha:0};const a=n.frames[t]?.time??0,s=n.frames[i]?.time??a;return s<=a?{frameIndex:t,nextFrameIndex:i,alpha:0}:{frameIndex:t,nextFrameIndex:i,alpha:dt.clamp((e-a)/(s-a),0,1)}}const bC=1.4,Ua=.18,uo=.14,SC=120,oh=90,xC=40,wC=45,EC=.58,lh=.82,MC=132,Lg=new L(-1,0,0),sa=new L(0,0,1),TC=new L(-1,0,0),CC=new L(0,0,18800),AC=new L(0,0,700),RC=new L(-9600,-12600,6400),PC=new L(0,0,900),ll=48,LC=16,NC=16,IC=.003,kC=.05;function Ng(n,e,t){return n?!e||t<=0?n:{x:dt.lerp(n.x,e.x,t),y:dt.lerp(n.y,e.y,t),z:dt.lerp(n.z,e.z,t)}:e}function Ig(n,e,t){const i=n??e;if(!i)return null;const a=new ii(i.x,i.y,i.z,i.w);return!e||t<=0||n===null?a:a.slerp(new ii(e.x,e.y,e.z,e.w),t)}function _f(n){return new L(n.x,n.y,n.z)}function kg(n,e){return new L(-n.x*e,n.y*e,n.z*e)}function Rc(n){return new L(-n.x,n.y,n.z).normalize()}function DC(n,e){switch(n){case"overhead":return{position:CC.clone().multiplyScalar(e),target:AC.clone().multiplyScalar(e),up:TC.clone(),fov:ll};case"side":return{position:RC.clone().multiplyScalar(e),target:PC.clone().multiplyScalar(e),up:sa.clone(),fov:ll}}}function FC(n){const{fov:e,position:t,sceneState:i,target:a,up:s}=n,{camera:r,controls:o}=i;o.enabled=!1,r.position.lerp(t,uo),o.target.lerp(a,uo),r.up.lerp(s,uo).normalize(),r.fov=dt.lerp(r.fov,e,uo),r.updateProjectionMatrix(),r.lookAt(o.target);const l=r.position.distanceToSquared(t)<=LC,c=o.target.distanceToSquared(a)<=NC,u=r.up.angleTo(s)<=IC,d=Math.abs(r.fov-e)<=kC;return!l||!c||!u||!d?!1:(r.position.copy(t),o.target.copy(a),r.up.copy(s).normalize(),r.fov=e,r.updateProjectionMatrix(),r.lookAt(a),o.enabled=!0,!0)}function OC(n){const e=n.linearVelocity?Rc(n.linearVelocity):null,t=n.forward?Rc(n.forward):null,i=n.up?Rc(n.up):null;if((n.position?.z??1/0)<SC){const l=(t??e??Lg.clone()).clone().setZ(0);if(l.lengthSq()<1e-4)return null;l.normalize(),e&&e.lengthSq()>1e-4&&l.dot(e)<0&&l.negate();const c=new L().crossVectors(sa,l).normalize(),u=new L().crossVectors(l,c).normalize();return{forward:l,up:u,right:c}}if(!t||!i)return null;const s=t.clone().normalize(),r=new L().crossVectors(i,s).normalize(),o=new L().crossVectors(s,r).normalize();return{forward:s,up:o,right:r}}function UC(n){const{cameraViewMode:e,attachedPlayerId:t,ballCamEnabled:i,ballPosition:a,cameraDistanceScale:s,customCameraSettings:r,desiredCameraPosition:o,desiredLookTarget:l,attachedPlayerUnavailable:c=!1,fieldScale:u,frameIndex:d,replay:f,sceneState:p}=n,_=p.controls;if(e==="free"){_.enabled=!0,p.camera.fov=dt.lerp(p.camera.fov,ll,Ua),p.camera.updateProjectionMatrix();return}if(!t){_.enabled=!0,p.camera.fov=dt.lerp(p.camera.fov,ll,Ua),p.camera.updateProjectionMatrix();return}const g=f.players.find(B=>B.id===t),m=g?.frames[d];if(!g||c||!m?.position||m.isPresent===!1){_.enabled=!0;return}_.enabled=!1;const h=kg(m.position,u),y=OC(m),x=y?.forward??Lg.clone(),b=y?.right??new L(0,1,0),A={...g.cameraSettings,...r??{}},M=(A.distance??270)*u*s,T=(A.height??100)*u*bC,C=dt.degToRad(A.pitch??-4),v=x.clone().applyAxisAngle(b,C).normalize(),S=h.clone().addScaledVector(sa,T),R=x.clone().multiplyScalar(-M).addScaledVector(sa,T).applyAxisAngle(b,C),I=h.clone().addScaledVector(sa,xC*u);let U=A.fov??110;if(i&&a){const B=a.clone().addScaledVector(sa,wC*u),G=B.clone().sub(I),z=(G.lengthSq()>1e-4?G.normalize():v.clone()).multiplyScalar(lh).addScaledVector(v,1-lh).normalize();l.copy(I).lerp(B,EC),o.copy(S).addScaledVector(z,-M),o.z=Math.max(oh*u,o.z);const X=I.clone().sub(o),V=B.clone().sub(o);if(X.lengthSq()>1e-4&&V.lengthSq()>1e-4){const ee=X.angleTo(V);U=Math.min(MC,Math.max(U,dt.radToDeg(ee)*1.7))}}else o.copy(I).add(R),o.z=Math.max(oh*u,o.z),l.copy(I);p.camera.position.lerp(o,Ua),p.camera.up.lerp(sa,Ua).normalize(),_.target.lerp(l,Ua),p.camera.fov=dt.lerp(p.camera.fov,U,Ua),p.camera.updateProjectionMatrix(),p.camera.lookAt(_.target)}const BC=2.25,Dg=3.2,Ho="free";function Zi(n){return typeof n=="number"&&Number.isFinite(n)?n:void 0}function ad(n){if(!n)return null;const e={},t=Zi(n.fov),i=Zi(n.height),a=Zi(n.pitch),s=Zi(n.distance),r=Zi(n.stiffness),o=Zi(n.swivelSpeed),l=Zi(n.transitionSpeed);return t!==void 0&&(e.fov=t),i!==void 0&&(e.height=i),a!==void 0&&(e.pitch=a),s!==void 0&&(e.distance=s),r!==void 0&&(e.stiffness=r),o!==void 0&&(e.swivelSpeed=o),l!==void 0&&(e.transitionSpeed=l),e}function zC(n){const e=n.initialAttachedPlayerId??null;return{speed:Math.max(.1,n.initialPlaybackRate??1),cameraDistanceScale:Math.max(.25,n.initialCameraDistanceScale??BC),customCameraSettings:ad(n.initialCustomCameraSettings),attachedPlayerId:e,cameraViewMode:n.initialCameraViewMode??(e?"follow":Ho),ballCamEnabled:n.initialBallCamEnabled??!1,boostMeterEnabled:n.initialBoostMeterEnabled??!1,boostPickupAnimationEnabled:n.initialBoostPickupAnimationEnabled??!0,hitboxWireframesEnabled:n.initialHitboxWireframesEnabled??!1,skipPostGoalTransitionsEnabled:n.initialSkipPostGoalTransitionsEnabled??!0,skipKickoffsEnabled:n.initialSkipKickoffsEnabled??!1}}function HC(n,e,t,i){const a=pr(n,e),s=n.frames[a];if(!s||!mf(s,i))return null;const r=n.frames.find((o,l)=>l>a&&Pg(o,t));return!r||r.time===e?null:r.time}function VC(n,e,t,i){const a=pr(n,e),s=n.frames[a];if(!s||!zo(n,s,a,t,i))return null;const r=n.frames.find((c,u)=>u>a&&!zo(n,c,u,t,i));if(r)return r.time===e?null:r.time;let o=a;for(;o>0&&zo(n,n.frames[o-1],o-1,t,i);)o-=1;const l=n.frames[o]?.time;return l===void 0||l===e?null:l}function GC({replay:n,sceneState:e,fieldScale:t,frameWindow:i}){const a=n.ballFrames[i.frameIndex]??null,s=n.ballFrames[i.nextFrameIndex]??a,r=Ng(a?.position??null,s?.position??null,i.alpha),o=r?kg(r,t):null;if(r){e.ballMesh.visible=!0,e.ballMesh.position.copy(_f(r));const l=Ig(a?.rotation??null,s?.rotation??null,i.alpha);l?e.ballMesh.quaternion.copy(l):e.ballMesh.quaternion.identity()}else e.ballMesh.visible=!1;return{ballFrame:a,nextBallFrame:s,ballPosition:o}}function $C(n){return!!n?.position&&n?.isPresent!==!1}function ch(n,e,t){for(let i=n.length-1;i>=0;i-=1){const a=n[i],s=t-a.time;if(!(s<0)){if(s>Dg)break;if(a.kind==="demo"&&a.secondaryPlayerId===e)return a}}return null}function Pc({indicator:n,fallbackPosition:e,demoEvent:t,currentTime:i,camera:a}){if(!n)return;const s=t?.location??e;if(!t||!s){n.group.visible=!1;return}const r=Math.max(0,i-t.time),o=i*8,l=1+.08*Math.sin(o);n.group.visible=!0,n.group.position.copy(_f(s)),n.ring.rotation.z=o*.15,n.ring.scale.setScalar(l),n.label.quaternion.copy(a.quaternion),n.label.scale.setScalar(1+.04*Math.sin(o+1.3));const c=dt.clamp(1-r/Dg,.28,1);for(const u of[n.ring,n.label]){const d=u.material;d instanceof bi&&(d.opacity=c)}}function WC(n,e,t,i,a){if(!e){n.visible=!1;return}n.visible=!0;const s=i*36+a*1.7,r=.86+.14*Math.sin(s),o=dt.clamp(.62+t*.88,.62,1.5),l=o*(1.02+r*.52),c=1.02+o*.28;n.scale.set(l,c,c);for(const[u,d]of n.children.entries()){const f=d,p=.92+.14*Math.sin(s+u*.85);f.scale.setScalar(p),f.traverse(_=>{if(!(_ instanceof ze))return;const g=_.material;if(g instanceof ct)switch(_.name){case"outer-flame":g.opacity=.24+o*.24;break;case"inner-flame":g.opacity=.58+o*.3;break;case"glow":g.opacity=.4+o*.26;break}})}}const XC=1;class qC extends EventTarget{container;replay;options;sceneState;beforeRenderCallbacks=[];plugins=[];fieldScale;desiredCameraPosition=new L;desiredLookTarget=new L;boundWindowResize=()=>this.sceneState.resize();liveGameState;kickoffGameState;timelineSegmentsCacheKey=null;timelineSegmentsCache=[];timelineDurationCache=0;resizeObserver=null;animationFrameId=null;disposed=!1;playing=!1;speed=1;currentTime=0;playbackStartedAt=0;playbackStartedTime=0;cameraDistanceScale;customCameraSettings;cameraViewMode;freeCameraTransition=null;attachedPlayerId;ballCamEnabled;boostMeterEnabled;boostPickupAnimationEnabled;hitboxWireframesEnabled;skipPostGoalTransitionsEnabled;skipKickoffsEnabled;constructor(e,t,i={}){super(),this.container=e,this.replay=t,this.options=i,this.fieldScale=i.fieldScale??XC,this.sceneState=lC(e,t,this.fieldScale),this.liveGameState=uC(t),this.kickoffGameState=dC(t,this.liveGameState);const a=zC(i);this.speed=a.speed,this.cameraDistanceScale=a.cameraDistanceScale,this.customCameraSettings=a.customCameraSettings,this.attachedPlayerId=a.attachedPlayerId,this.cameraViewMode=a.cameraViewMode,this.ballCamEnabled=a.ballCamEnabled,this.boostMeterEnabled=a.boostMeterEnabled,this.boostPickupAnimationEnabled=a.boostPickupAnimationEnabled,this.hitboxWireframesEnabled=a.hitboxWireframesEnabled,this.skipPostGoalTransitionsEnabled=a.skipPostGoalTransitionsEnabled,this.skipKickoffsEnabled=a.skipKickoffsEnabled,this.setHitboxWireframeVisibility(),this.skipPostGoalTransitionIfNeeded(),this.skipPastKickoffIfNeeded(),this.installResizeHandling();for(const s of i.plugins??[])this.installPlugin(s,!1);this.render(),this.scheduleAnimationFrame(),this.emitChange(),i.autoplay&&this.play()}play(){this.playing||(this.playing=!0,this.reanchorPlaybackClock(),this.emitChange())}pause(){this.playing&&(this.syncPlaybackClock(),this.playing=!1,this.emitChange())}togglePlayback(){this.playing?this.pause():this.play()}setPlaybackRate(e){this.playing&&this.syncPlaybackClock(),this.speed=Math.max(.1,e),this.playing&&this.reanchorPlaybackClock(),this.emitChange()}setCameraDistanceScale(e){this.cameraDistanceScale=Math.max(.25,e),this.render(),this.emitChange()}setCustomCameraSettings(e){this.customCameraSettings=ad(e),this.render(),this.emitChange()}setAttachedPlayer(e){this.attachedPlayerId=e,this.cameraViewMode=e?"follow":Ho,this.freeCameraTransition=null,this.render(),this.emitChange()}setCameraViewMode(e){this.cameraViewMode=e,this.freeCameraTransition=null,this.render(),this.emitChange()}setFreeCameraPreset(e){const{fov:t,position:i,target:a,up:s}=DC(e,this.fieldScale);this.cameraViewMode=Ho,this.freeCameraTransition={position:i,target:a,up:s,fov:t},this.render(),this.emitChange()}setBallCamEnabled(e){this.ballCamEnabled=e,this.render(),this.emitChange()}setBoostMeterEnabled(e){if(this.boostMeterEnabled=e,!e)for(const t of this.sceneState.playerBoostMeters.values())t.group.visible=!1;this.render(),this.emitChange()}setBoostPickupAnimationEnabled(e){this.boostPickupAnimationEnabled=e,this.render(),this.emitChange()}setHitboxWireframesEnabled(e){this.hitboxWireframesEnabled=e,this.setHitboxWireframeVisibility(),this.render(),this.emitChange()}setSkipPostGoalTransitionsEnabled(e){this.skipPostGoalTransitionsEnabled=e,e&&this.skipPostGoalTransitionIfNeeded(),this.render(),this.emitChange()}setSkipKickoffsEnabled(e){this.skipKickoffsEnabled=e,e&&(this.skipPostGoalTransitionIfNeeded(),this.skipPastKickoffIfNeeded()),this.render(),this.emitChange()}seek(e){this.currentTime=this.clampReplayTime(e),this.skipPostGoalTransitionIfNeeded(),this.skipPastKickoffIfNeeded(),this.playing&&this.reanchorPlaybackClock(),this.render(),this.emitChange()}setFrameIndex(e){const t=cC(this.replay,e),i=this.replay.frames[t]?.time??0,a=this.playing,s=this.currentTime!==i||a;this.playing=!1,this.currentTime=i,this.render(),s&&this.emitChange()}stepFrames(e){if(!Number.isFinite(e)||this.replay.frames.length===0)return;const t=pr(this.replay,this.currentTime);this.setFrameIndex(t+Math.trunc(e))}stepForwardFrame(){this.stepFrames(1)}stepBackwardFrame(){this.stepFrames(-1)}setState(e){const t=performance.now();if(e.speed!==void 0&&(this.playing&&this.syncPlaybackClock(t),this.speed=Math.max(.1,e.speed)),e.cameraDistanceScale!==void 0&&(this.cameraDistanceScale=Math.max(.25,e.cameraDistanceScale)),e.customCameraSettings!==void 0&&(this.customCameraSettings=ad(e.customCameraSettings)),e.cameraViewMode!==void 0&&(this.cameraViewMode=e.cameraViewMode),e.attachedPlayerId!==void 0&&(this.attachedPlayerId=e.attachedPlayerId,e.cameraViewMode===void 0&&(this.cameraViewMode=this.attachedPlayerId?"follow":Ho)),e.ballCamEnabled!==void 0&&(this.ballCamEnabled=e.ballCamEnabled),e.boostMeterEnabled!==void 0&&(this.boostMeterEnabled=e.boostMeterEnabled,!this.boostMeterEnabled))for(const i of this.sceneState.playerBoostMeters.values())i.group.visible=!1;e.boostPickupAnimationEnabled!==void 0&&(this.boostPickupAnimationEnabled=e.boostPickupAnimationEnabled),e.hitboxWireframesEnabled!==void 0&&(this.hitboxWireframesEnabled=e.hitboxWireframesEnabled,this.setHitboxWireframeVisibility()),e.skipPostGoalTransitionsEnabled!==void 0&&(this.skipPostGoalTransitionsEnabled=e.skipPostGoalTransitionsEnabled),e.skipKickoffsEnabled!==void 0&&(this.skipKickoffsEnabled=e.skipKickoffsEnabled),e.currentTime!==void 0&&(this.currentTime=this.clampReplayTime(e.currentTime)),e.playing!==void 0&&e.playing!==this.playing&&(e.playing?this.playing=!0:(e.currentTime===void 0&&this.syncPlaybackClock(t),this.playing=!1)),this.playing&&this.reanchorPlaybackClock(t),this.skipPostGoalTransitionIfNeeded(t),this.skipPastKickoffIfNeeded(t),this.render(),this.emitChange()}getState(){const e=pr(this.replay,this.currentTime);return{currentTime:this.currentTime,duration:this.replay.duration,frameIndex:e,activeMetadata:this.getActiveMetadata(e,this.currentTime),playing:this.playing,speed:this.speed,cameraDistanceScale:this.cameraDistanceScale,customCameraSettings:this.customCameraSettings,cameraViewMode:this.cameraViewMode,attachedPlayerId:this.attachedPlayerId,ballCamEnabled:this.ballCamEnabled,boostMeterEnabled:this.boostMeterEnabled,boostPickupAnimationEnabled:this.boostPickupAnimationEnabled,hitboxWireframesEnabled:this.hitboxWireframesEnabled,skipPostGoalTransitionsEnabled:this.skipPostGoalTransitionsEnabled,skipKickoffsEnabled:this.skipKickoffsEnabled}}getSnapshot(){return this.getState()}getTimelineDuration(){return this.getTimelineSegments().length===0?this.replay.duration:this.timelineDurationCache}getTimelineCurrentTime(){return this.projectReplayTimeToTimeline(this.currentTime).timelineTime}getTimelineSegments(){const e=`${this.skipPostGoalTransitionsEnabled}:${this.skipKickoffsEnabled}`;return this.timelineSegmentsCacheKey===e?this.timelineSegmentsCache:(this.timelineSegmentsCacheKey=e,this.timelineSegmentsCache=this.computeTimelineSegments(),this.timelineDurationCache=Math.max(0,this.replay.duration-this.timelineSegmentsCache.reduce((t,i)=>t+(i.endTime-i.startTime),0)),this.timelineSegmentsCache)}projectReplayTimeToTimeline(e){return mC(this.replay.duration,this.getTimelineSegments(),e)}projectTimelineTimeToReplay(e){return _C(this.replay.duration,this.getTimelineDuration(),this.getTimelineSegments(),e)}clampReplayTime(e){return dt.clamp(e,0,this.replay.duration)}getPlaybackEndTime(){return gC(this.replay.duration,this.getTimelineSegments())}subscribe(e){const t=i=>{e(i.detail)};return this.addEventListener("change",t),e(this.getState()),()=>{this.removeEventListener("change",t)}}onBeforeRender(e){return this.beforeRenderCallbacks.push(e),()=>{const t=this.beforeRenderCallbacks.indexOf(e);t>=0&&this.beforeRenderCallbacks.splice(t,1)}}addPlugin(e){return this.installPlugin(e,!0)}removePlugin(e){const t=this.plugins.findIndex(a=>a.plugin.id===e);if(t<0)return!1;const[i]=this.plugins.splice(t,1);return i.plugin.teardown?.(this.createPluginContext()),this.render(),!0}getPlugins(){return this.plugins.map(e=>e.plugin)}destroy(){for(this.playing&&this.pause(),this.disposed=!0,this.animationFrameId!==null&&(cancelAnimationFrame(this.animationFrameId),this.animationFrameId=null),this.resizeObserver?(this.resizeObserver.disconnect(),this.resizeObserver=null):window.removeEventListener("resize",this.boundWindowResize);this.plugins.length>0;)this.plugins.pop()?.plugin.teardown?.(this.createPluginContext());this.sceneState.dispose()}dispose(){this.destroy()}installResizeHandling(){if(typeof ResizeObserver<"u"){this.resizeObserver=new ResizeObserver(()=>{this.sceneState.resize()}),this.resizeObserver.observe(this.container);return}window.addEventListener("resize",this.boundWindowResize)}scheduleAnimationFrame(){this.animationFrameId!==null||this.disposed||(this.animationFrameId=requestAnimationFrame(this.tick))}reanchorPlaybackClock(e=performance.now()){this.playbackStartedAt=e,this.playbackStartedTime=this.currentTime}setHitboxWireframeVisibility(){for(const e of this.sceneState.playerHitboxes.values())e.visible=this.hitboxWireframesEnabled}syncPlaybackClock(e=performance.now()){if(!this.playing)return!1;const t=(e-this.playbackStartedAt)/1e3,i=dt.clamp(this.playbackStartedTime+t*this.speed,0,this.getPlaybackEndTime()),a=i!==this.currentTime;return this.currentTime=i,a}tick=e=>{if(this.animationFrameId=null,this.disposed)return;let t=!1;this.playing&&(t=this.syncPlaybackClock(e),t=this.skipPostGoalTransitionIfNeeded(e)||t,t=this.skipPastKickoffIfNeeded(e)||t,this.currentTime>=this.getPlaybackEndTime()&&(this.playing=!1,t=!0)),this.render(),t&&this.emitChange(),this.scheduleAnimationFrame()};render(){const e=yC(this.replay,this.currentTime),t=e.frameIndex,{ballFrame:i,nextBallFrame:a,ballPosition:s}=GC({replay:this.replay,sceneState:this.sceneState,fieldScale:this.fieldScale,frameWindow:e}),r=[];for(const[c,u]of this.replay.players.entries()){const d=this.sceneState.playerMeshes.get(u.id),f=this.sceneState.playerBoostTrails.get(u.id),p=this.sceneState.playerBoostMeters.get(u.id),_=this.sceneState.playerDemoIndicators.get(u.id),g=u.frames[t]??null,m=u.frames[e.nextFrameIndex]??g;let h=null,y=null,x=0;if(!d){_&&(_.group.visible=!1),r.push({track:u,mesh:null,boostTrail:f??null,frame:g,nextFrame:m,interpolatedPosition:y,boostFraction:x});continue}h=Ng(g?.position??null,m?.position??null,e.alpha);const b=ch(this.replay.timelineEvents,u.id,this.currentTime);if(!h){d.visible=!1,f&&(f.visible=!1),p&&(p.group.visible=!1),Pc({indicator:_??null,fallbackPosition:null,demoEvent:b,currentTime:this.currentTime,camera:this.sceneState.camera}),r.push({track:u,mesh:d,boostTrail:f??null,frame:g,nextFrame:m,interpolatedPosition:y,boostFraction:x});continue}if(b){d.visible=!1,f&&(f.visible=!1),p&&(p.group.visible=!1),Pc({indicator:_??null,fallbackPosition:h,demoEvent:b,currentTime:this.currentTime,camera:this.sceneState.camera}),r.push({track:u,mesh:d,boostTrail:f??null,frame:g,nextFrame:m,interpolatedPosition:y,boostFraction:x});continue}if(!$C(g)){d.visible=!1,f&&(f.visible=!1),p&&(p.group.visible=!1),Pc({indicator:_??null,fallbackPosition:h,demoEvent:null,currentTime:this.currentTime,camera:this.sceneState.camera}),r.push({track:u,mesh:d,boostTrail:f??null,frame:g,nextFrame:m,interpolatedPosition:y,boostFraction:x});continue}d.visible=!0,_&&(_.group.visible=!1),y=h,d.position.copy(_f(h));const M=Ig(g?.rotation??null,m?.rotation??null,e.alpha);M?d.quaternion.copy(M):d.quaternion.identity();const T=g?.boostFraction??0,C=m?.boostFraction??T;if(x=dt.lerp(T,C,e.alpha),f){const v=(e.alpha>=.5?m?.boostActive:g?.boostActive)??g?.boostActive??m?.boostActive??!1;WC(f,v,x,this.currentTime,c)}p&&(this.boostMeterEnabled?(p.group.visible=!0,sC(p,x,dt.lerp(g?.boostAmount??0,m?.boostAmount??g?.boostAmount??0,e.alpha),this.sceneState.camera)):p.group.visible=!1),r.push({track:u,mesh:d,boostTrail:f??null,frame:g,nextFrame:m,interpolatedPosition:y,boostFraction:x})}UC({sceneState:this.sceneState,replay:this.replay,fieldScale:this.fieldScale,cameraViewMode:this.cameraViewMode,attachedPlayerId:this.attachedPlayerId,ballCamEnabled:this.ballCamEnabled,cameraDistanceScale:this.cameraDistanceScale,customCameraSettings:this.customCameraSettings,frameIndex:t,attachedPlayerUnavailable:this.attachedPlayerId!==null&&ch(this.replay.timelineEvents,this.attachedPlayerId,this.currentTime)!==null,ballPosition:s,desiredCameraPosition:this.desiredCameraPosition,desiredLookTarget:this.desiredLookTarget}),this.cameraViewMode==="free"&&this.freeCameraTransition&&FC({sceneState:this.sceneState,...this.freeCameraTransition})&&(this.freeCameraTransition=null),this.sceneState.controls.update(),this.sceneState.updateWallVisibility();const o={frameIndex:e.frameIndex,nextFrameIndex:e.nextFrameIndex,alpha:e.alpha,currentTime:this.currentTime};for(const c of this.beforeRenderCallbacks)c(o);const l=this.createRenderContext(o,i,a,s,r);for(const c of this.plugins)c.plugin.beforeRender?.(l);this.sceneState.renderer.render(this.sceneState.scene,this.sceneState.camera)}skipPastKickoffIfNeeded(e){if(!this.skipKickoffsEnabled)return!1;const t=HC(this.replay,this.currentTime,this.liveGameState,this.kickoffGameState);return t===null?!1:(this.currentTime=t,this.playing&&this.reanchorPlaybackClock(e),!0)}skipPostGoalTransitionIfNeeded(e){if(!this.skipPostGoalTransitionsEnabled)return!1;const t=VC(this.replay,this.currentTime,this.liveGameState,this.kickoffGameState);return t===null?!1:(this.currentTime=t,this.playing&&this.reanchorPlaybackClock(e),!0)}getActiveMetadata(e,t){return vC(this.replay,e,t)}computeTimelineSegments(){return hC(this.replay,this.skipPostGoalTransitionsEnabled,this.skipKickoffsEnabled,this.liveGameState,this.kickoffGameState)}installPlugin(e,t){const i=typeof e=="function"?e():e;if(this.plugins.some(s=>s.plugin.id===i.id))throw new Error(`Replay player plugin "${i.id}" is already installed`);const a={definition:e,plugin:i};return this.plugins.push(a),i.setup?.(this.createPluginContext()),i.onStateChange?.(this.createPluginStateContext(this.getState())),t&&this.render(),()=>{const s=this.plugins.indexOf(a);s<0||(this.plugins.splice(s,1),i.teardown?.(this.createPluginContext()),this.render())}}createPluginContext(){return{player:this,replay:this.replay,scene:this.sceneState,container:this.container,options:this.options}}createPluginStateContext(e){return{...this.createPluginContext(),state:e}}createRenderContext(e,t,i,a,s){return{...this.createPluginStateContext(this.getState()),...e,frame:this.replay.frames[e.frameIndex]??null,nextFrame:this.replay.frames[e.nextFrameIndex]??null,ballFrame:t,nextBallFrame:i,ballPosition:a,players:s}}emitChange(){const e=this.getState(),t=this.createPluginStateContext(e);for(const i of this.plugins)i.plugin.onStateChange?.(t);this.dispatchEvent(new CustomEvent("change",{detail:e}))}}const KC="https://ballchasing.com",YC=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;function jC(n,e){const i=(e instanceof URL?e.href:e).replace(/\/+$/,"");return new URL(`${i}/${n.replace(/^\/+/,"")}`)}function uh(n){return YC.test(n.trim())}function gf(n){const e=n.trim();if(uh(e))return e.toLowerCase();let t;try{t=new URL(e)}catch{throw new Error(`Invalid Ballchasing replay id: ${n}`)}if(!/(^|\.)ballchasing\.com$/i.test(t.hostname))throw new Error(`Invalid Ballchasing replay URL: ${n}`);const i=t.pathname.split("/").filter(Boolean),a=i.findIndex(o=>o==="replay"),s=i.findIndex(o=>o==="replays"),r=a>=0?i[a+1]:s>=0?i[s+1]:void 0;if(!r||!uh(r))throw new Error(`Invalid Ballchasing replay URL: ${n}`);return r.toLowerCase()}function ZC(n){return`ballchasing-${gf(n)}.replay`}function JC(n,e=KC){const t=gf(n);return jC(`dl/replay/${encodeURIComponent(t)}`,e)}const dh="subtr-actor-ballchasing-overlay-styles",QC="#3b82f6",eA="#f59e0b";function tA(){if(document.getElementById(dh))return;const n=document.createElement("style");n.id=dh,n.textContent=`
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
      border-bottom: 2px solid ${QC};
    }

    .sap-bc-team-hud-orange {
      left: calc(50% + 2.7rem);
      flex-direction: row;
      justify-content: flex-start;
      border-bottom: 2px solid ${eA};
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
  `,document.head.append(n)}function nA(n,e){const t=n.players[e],i=t.frame?.boostAmount??0,a=t.nextFrame?.boostAmount??i;return dt.lerp(i,a,n.alpha)}function fh(n,e,t,i){if(!n||!e)return;const a=Math.max(0,Math.min(100,Math.round(t/255*100)));n.style.width=`${a}%`,e.textContent=`${a} ${i}`}function ph(n,e,t,i){if(!n)return;const a=()=>{e.player.setAttachedPlayer(t)};n.classList.add("sap-bc-player-selectable"),n.tabIndex=0,n.setAttribute("role","button"),n.setAttribute("aria-label",`Follow ${i}`),n.title=`Follow ${i}`,n.addEventListener("click",a),n.addEventListener("keydown",s=>{s.key!=="Enter"&&s.key!==" "||(s.preventDefault(),a())})}function iA(n,e,t,i,a){if(n.getWorldPosition(a),a.add(e),a.project(t),a.z<-1||a.z>1)return!1;const s=i.clientWidth||1,r=i.clientHeight||1;return a.x=(a.x+1)*s/2,a.y=(1-a.y)*r/2,!(a.x<-80||a.x>s+80||a.y<-80||a.y>r+80)}function aA(n={}){const e=n.showFloatingNames??!0,t=n.showFloatingBoostBars??!0,i=n.showTeamBoostHud??!0;let a=null,s=null,r=null,o=null,l=!1,c="";const u=new Map,d=new L,f=new L(0,0,255);function p(g){for(const[m,h]of u.entries()){const y=m===g;h.floatingRoot?.classList.toggle("sap-bc-player-following",y),h.teamHudEntry?.classList.toggle("sap-bc-player-following",y),h.floatingRoot?.setAttribute("aria-pressed",y?"true":"false"),h.teamHudEntry?.setAttribute("aria-pressed",y?"true":"false")}}function _(g,m){tA(),getComputedStyle(m).position==="static"&&(l=!0,c=m.style.position,m.style.position="relative"),a=document.createElement("div"),a.className="sap-bc-overlay-root",e||t?(s=document.createElement("div"),s.className="sap-bc-floating-layer",a.append(s)):s=null,i?(r=document.createElement("div"),r.className="sap-bc-team-hud sap-bc-team-hud-blue",o=document.createElement("div"),o.className="sap-bc-team-hud sap-bc-team-hud-orange",a.append(r,o)):(r=null,o=null);for(const h of g.replay.players){let y=null,x=null,b=null,A=null;s&&(y=document.createElement("div"),y.className="sap-bc-floating-track",y.hidden=!0,(e||t)&&(x=document.createElement("div"),x.className=`sap-bc-boost-bar ${h.isTeamZero?"sap-bc-boost-bar-blue":"sap-bc-boost-bar-orange"}`,b=document.createElement("div"),b.className=`sap-bc-boost-fill ${h.isTeamZero?"sap-bc-boost-fill-blue":"sap-bc-boost-fill-orange"}`,A=document.createElement("span"),A.className="sap-bc-boost-text",x.append(b,A),y.append(x)),ph(y,g,h.id,h.name),s.append(y));let M=null,T=null,C=null;if(i){M=document.createElement("div"),M.className="sap-bc-hud-player";const v=document.createElement("div");v.className=`sap-bc-hud-boost-bar ${h.isTeamZero?"sap-bc-boost-bar-blue":"sap-bc-boost-bar-orange"}`,T=document.createElement("div"),T.className=`sap-bc-hud-boost-fill ${h.isTeamZero?"sap-bc-boost-fill-blue":"sap-bc-boost-fill-orange"}`,C=document.createElement("span"),C.className="sap-bc-hud-boost-text",v.append(T,C),M.append(v),ph(M,g,h.id,h.name),(h.isTeamZero?r:o)?.append(M)}u.set(h.id,{floatingRoot:y,floatingBoostFill:b,floatingBoostText:A,teamHudEntry:M,teamHudFill:T,teamHudText:C})}f.set(0,0,255*(g.options.fieldScale??1)),m.append(a),p(g.player.getState().attachedPlayerId)}return{id:"ballchasing-overlay",setup(g){_(g,g.container)},onStateChange(g){p(g.state.attachedPlayerId)},teardown(g){a?.remove(),a=null,s=null,r=null,o=null,u.clear(),l&&(g.container.style.position=c,l=!1)},beforeRender(g){if(a)for(const[m,h]of g.players.entries()){const y=u.get(h.track.id);if(!y)continue;const x=nA(g,m);fh(y.floatingBoostFill,y.floatingBoostText,x,h.track.name),fh(y.teamHudFill,y.teamHudText,x,h.track.name);const b=h.mesh,A=b!==null&&h.interpolatedPosition!==null;if(y.teamHudEntry?.classList.toggle("sap-bc-hud-player-inactive",!A),!!y.floatingRoot){if(!A||!iA(b,f,g.scene.camera,g.container,d)){y.floatingRoot.hidden=!0;continue}y.floatingRoot.hidden=!1,y.floatingRoot.style.transform=`translate(${d.x.toFixed(1)}px, ${d.y.toFixed(1)}px) translate(-50%, -100%)`}}}}}function Lc(n){n.depthTest=!1,n.depthWrite=!1,n.transparent=!0,n.polygonOffset=!0,n.polygonOffsetFactor=-2,n.polygonOffsetUnits=-2,n.forceSinglePass=!0}const es=6,sA=.6;function Tr(n){return n*sA}function rA(n){return Tr(n.size==="big"?150:92)}function Fg(n){return Tr(n.size==="big"?155:46)}function oA(n){return Tr(n.size==="big"?34:14)}function Og(n){return es+oA(n)+Fg(n)}function Ug(n){return n.size==="big"?Og(n):es+Tr(1.2)}function Bg(n){return n.size==="big"?Og(n):es+Tr(.8)}function lA(n){return n.size==="big"?16096779:16436245}function cA(n){const e=rA(n),t=lA(n),i=Fg(n),a=n.size==="big",s=new pt;s.position.set(n.position.x,n.position.y,n.position.z),s.renderOrder=20,s.frustumCulled=!1;const r=new ze(new _a(e*.72,e,24),new ct({color:t,transparent:!0,opacity:.92,side:et,depthWrite:!1}));Lc(r.material),r.position.z=es,r.renderOrder=20,r.frustumCulled=!1,s.add(r);const o=new ze(new $a(e*.58,24),new ct({color:t,transparent:!0,opacity:.3,side:et,depthWrite:!1}));Lc(o.material),o.position.z=es+.5,o.renderOrder=21,o.frustumCulled=!1,s.add(o);const l=new ze(new $a(e*.42,20),new ct({color:16777215,transparent:!0,opacity:.22,side:et,depthWrite:!1}));Lc(l.material),l.position.z=es+1,l.renderOrder=22,l.frustumCulled=!1,s.add(l);const c=new ze(a?new vs(i,32,18):new $a(i*.9,24),a?new Js({color:t,emissive:new Ye(t),emissiveIntensity:.6,shininess:88,specular:new Ye(16773826),transparent:!0,opacity:.92,depthWrite:!1}):new ct({color:t,transparent:!0,opacity:.88,side:et,blending:Di,depthWrite:!1}));c.position.z=Ug(n),c.renderOrder=23,c.frustumCulled=!1,s.add(c);const u=new ze(a?new vs(i*1.36,32,14):new $a(i*1.35,28),new ct({color:t,transparent:!0,opacity:a?.2:.16,side:et,blending:Di,depthWrite:!1}));return u.position.z=Bg(n),u.renderOrder=24,u.frustumCulled=!1,s.add(u),{group:s,ring:r,core:o,cooldown:l,orb:c,glow:u}}function uA(n,e){let t=-1;for(let s=0;s<n.events.length&&!(n.events[s].time>e);s+=1)t=s;if(t<0)return{available:!0,progress:1};const i=n.events[t];if(i.available)return{available:!0,progress:1};const a=n.events.slice(t+1).find(s=>s.available);return!a||a.time<=i.time?{available:!1,progress:0}:{available:!1,progress:dt.clamp((e-i.time)/(a.time-i.time),0,1)}}function dA(n,e,t,i){const{available:a,progress:s}=uA(e,t),r=e.size==="big",o=.92+.08*Math.sin(t*6+e.index*.45),l=.96+.04*Math.sin(t*(r?4.8:7.2)+e.index*.37),c=r?Math.sin(t*2.2+e.index*.61)*18:0,u=Ug(e)+c,d=Bg(e)+c;if(n.orb.position.z=u,n.glow.position.z=d,n.orb.rotation.z=t*(r?.9:1.25),n.glow.rotation.z=-t*.45,a){n.group.visible=!0,n.ring.material.opacity=.95,n.core.material.opacity=r?.56:.5,n.cooldown.visible=!1,n.ring.scale.setScalar(o),n.core.scale.setScalar(1),n.orb.visible=!0,n.glow.visible=!0,n.orb.material.opacity=r?.96:.9,n.glow.material.opacity=(r?.2:.16)+(l-.96),n.orb.scale.setScalar(l),n.glow.scale.setScalar(r?1.02+(l-.96)*2:1);return}if(n.group.visible=!0,n.ring.material.opacity=.18,n.core.material.opacity=.07,n.ring.scale.setScalar(1),n.core.scale.setScalar(1),n.orb.visible=!1,n.glow.visible=!1,n.cooldown.visible=i,i){const f=.3+s*.7;n.cooldown.scale.setScalar(f),n.cooldown.material.opacity=.16+s*.2}}function fA(n={}){const e=n.showCooldownProgress??!0;let t=null;const i=new Map;function a(r){t=new pt,t.name="boost-pad-overlay",t.renderOrder=20,t.frustumCulled=!1;for(const o of r.replay.boostPads){const l=cA(o);t.add(l.group),i.set(o.index,l)}r.scene.replayRoot.add(t)}function s(r){for(const o of r.replay.boostPads){const l=i.get(o.index);l&&dA(l,o,r.state.currentTime,e)}}return{id:"boost-pad-overlay",setup(r){a(r),s({...r,state:r.player.getState()})},onStateChange(r){s(r)},teardown(){t?.removeFromParent(),t=null,i.clear()}}}const pA=1.35,hA="#57a8ff",mA="#ff9c40",_A=256,gA=160,vA=360,yA=225,bA=260,SA=430,zg=18,hh=120;function xA(n){return n?hA:mA}function wA(n){return n.events.filter(e=>!e.available&&e.playerId)}function Hg(n,e){const t=document.createElement("canvas");t.width=_A,t.height=gA;const i=t.getContext("2d");if(!i)throw new Error("Unable to create boost pickup count canvas");i.clearRect(0,0,t.width,t.height),i.textAlign="center",i.textBaseline="middle",i.lineJoin="round",i.font="800 124px sans-serif",i.lineWidth=18,i.strokeStyle="rgba(4, 10, 18, 0.88)",i.strokeText(`${n}`,t.width/2,t.height/2),i.fillStyle=e,i.fillText(`${n}`,t.width/2,t.height/2);const a=new Al(t);return a.colorSpace=$t,a.needsUpdate=!0,a}function EA(n){n?.dispose()}function MA(n){const e=new pt;e.visible=!1,e.renderOrder=60,e.frustumCulled=!1;const t=Hg(1,n),i=new lg({map:t,transparent:!0,depthTest:!1,depthWrite:!1}),a=new ug(i);a.scale.set(vA,yA,1),a.renderOrder=62,a.frustumCulled=!1,e.add(a);const s=new ct({color:n,transparent:!0,opacity:0,side:et,depthTest:!1,depthWrite:!1,blending:Di}),r=new ze(new _a(hh*.72,hh,36),s);return r.position.z=zg,r.renderOrder=61,r.frustumCulled=!1,e.add(r),{group:e,textMaterial:i,ringMaterial:s}}function TA(n,e){n.currentCount!==e&&(EA(n.textMaterial.map),n.textMaterial.map=Hg(e,n.color),n.textMaterial.needsUpdate=!0,n.currentCount=e)}function CA(n){const e=new Map;for(const a of n.replay.players)e.set(a.id,a);const t=[];for(const a of n.replay.boostPads)for(const s of wA(a))t.push({pad:a,event:s});t.sort((a,s)=>a.event.time!==s.event.time?a.event.time-s.event.time:a.event.frame!==s.event.frame?a.event.frame-s.event.frame:a.pad.index-s.pad.index);const i=[];for(const{pad:a,event:s}of t){if(!s.playerId)continue;const r=e.get(s.playerId);if(!r)continue;const o=xA(r.isTeamZero),{group:l,textMaterial:c,ringMaterial:u}=MA(o);l.position.copy(a.position),n.scene.replayRoot.add(l),i.push({time:s.time,pad:a,event:s,player:r,color:o,currentCount:1,position:new L(a.position.x,a.position.y,a.position.z),size:a.size,group:l,textMaterial:c,ringMaterial:u})}return i}function AA(n,e,t){const i=dt.clamp(e/t,0,1),a=1-Math.pow(1-i,3),s=i*i,r=n.size==="big"?SA:bA,o=n.size==="big"?360:280,l=1+Math.sin(i*Math.PI)*.22;n.group.visible=!0,n.group.position.set(n.position.x,n.position.y,n.position.z+r+a*o),n.group.scale.setScalar(l),n.textMaterial.opacity=Math.max(0,1-s),n.ringMaterial.opacity=Math.max(0,.48*(1-i));const c=n.group.children[1];if(c){const u=.75+a*(n.size==="big"?2.8:1.85);c.scale.setScalar(u),c.position.z=zg-r-a*o}}function RA(n={}){const e=Math.max(.1,n.durationSeconds??pA);let t=[];function i(s){return n.includePickup?.({pad:s.pad,event:s.event,player:s.player})??!0}function a(){for(const s of t)s.group.visible=!1}return{id:"boost-pickup-animation",setup(s){t=CA(s)},beforeRender(s){if(!s.state.boostPickupAnimationEnabled){a();return}const r=s.currentTime-e,o=new Map;for(const l of t){if(l.time>s.currentTime){l.group.visible=!1;continue}if(!i(l)){l.group.visible=!1;continue}const c=(o.get(l.player.id)??0)+1;if(o.set(l.player.id,c),l.time<r){l.group.visible=!1;continue}TA(l,c),AA(l,s.currentTime-l.time,e)}},teardown(){for(const s of t)s.group.removeFromParent(),s.group.traverse(r=>{(r instanceof ze||r instanceof ug)&&r.geometry?.dispose()}),s.textMaterial.map?.dispose(),s.textMaterial.dispose(),s.ringMaterial.dispose();t=[]}}}const PA=60,LA=["video/webm;codecs=vp9","video/webm;codecs=vp8","video/webm"];function NA(n){if(n&&MediaRecorder.isTypeSupported(n))return n;for(const e of LA)if(MediaRecorder.isTypeSupported(e))return e;return""}function IA(n){return n instanceof Error?n.message:String(n)}function kA(n={}){let e=null,t=null,i=[],a=null,s=0,r=0,o="",l=0,c=null,u=null,d=null,f=null,p=!1,_=null;const g=new Set;function m(){return{state:t?t.state==="recording"?"recording":"stopping":c?"error":a?"ready":"idle",elapsedSeconds:r,mimeType:o,sizeBytes:l,error:c}}function h(){const M=m();n.onStatusChange?.(M);for(const T of g)T(M)}function y(){if(!e)throw new Error("Canvas recorder plugin is not installed");return e}function x(M){t=null,f=null,p=!1,a=M,l=M?.size??0,_&&e&&e.player.setState({currentTime:_.currentTime,speed:_.speed,playing:_.playing}),_=null,M&&n.onComplete?.(M),h(),d?.(M),d=null,u=null}function b(M){c=IA(M),t=null,f=null,p=!1,_=null,h(),d?.(null),d=null,u=null}const A={id:"canvas-recorder",setup(M){e=M},beforeRender(M){t?.state==="recording"&&(r=(performance.now()-s)/1e3,h()),t?.state==="recording"&&f!==null&&M.currentTime>=f&&A.stop()},onStateChange(M){p&&t?.state==="recording"&&!M.state.playing&&r>0&&A.stop()},teardown(){t?.state==="recording"&&t.stop(),e=null,t=null,f=null,p=!1,_=null,d?.(null),d=null,u=null,g.clear()},start(M={}){const T=y();if(t?.state==="recording")throw new Error("Canvas recording is already in progress");if(typeof MediaRecorder>"u")throw new Error("MediaRecorder is not available in this browser");const C=T.scene.renderer.domElement;if(!C.captureStream)throw new Error("Canvas captureStream is not available in this browser");c=null,a=null,i=[],l=0,r=0,s=performance.now(),o=NA(M.mimeType??n.mimeType);const v=Math.max(1,M.fps??n.fps??PA),S=C.captureStream(v);t=new MediaRecorder(S,{mimeType:o,videoBitsPerSecond:M.videoBitsPerSecond??n.videoBitsPerSecond}),u=new Promise(R=>{d=R}),t.addEventListener("dataavailable",R=>{R.data.size>0&&(i.push(R.data),l+=R.data.size,h())}),t.addEventListener("stop",()=>{S.getTracks().forEach(R=>R.stop()),x(new Blob(i,{type:o||"video/webm"}))},{once:!0}),t.addEventListener("error",R=>{S.getTracks().forEach(I=>I.stop()),b(R.error??R)},{once:!0}),t.start(1e3),h()},stop(){if(!t)return Promise.resolve(a);if(t.state==="inactive")return u??Promise.resolve(a);const M=u??new Promise(T=>{d=T});return t.stop(),h(),M},clear(){if(t?.state==="recording")throw new Error("Cannot clear a recording while recording is in progress");a=null,i=[],l=0,r=0,c=null,h()},getRecording(){return a},getStatus(){return m()},subscribe(M){return g.add(M),M(m()),()=>{g.delete(M)}},recordRange(M={}){const T=y(),C=T.player.getState();(M.restorePlaybackState??!0)&&(_=C);const v=M.playbackRate??C.speed,S=M.startTime??C.currentTime;f=M.endTime??C.duration,p=!0,T.player.setState({currentTime:S,speed:v,playing:!1}),A.start(M);const R=u;return T.player.play(),(R??Promise.resolve(null)).then(I=>{if(!I)throw new Error("Recording stopped without producing a video");return I})},recordFullReplay(M={}){return A.recordRange({...M,startTime:M.startTime??0,endTime:M.endTime??y().replay.duration})}};return A}const mh="subtr-actor-timeline-overlay-styles";function DA(){if(document.getElementById(mh))return;const n=document.createElement("style");n.id=mh,n.textContent=`
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
  `,document.head.append(n)}const FA=new Set(["goal","save","bookmark"]),OA=.2,UA=2,BA=4,zA=.01,_h=.01;function sd(n){if(!Number.isFinite(n))return"--:--.--";const e=Math.max(0,n),t=Math.floor(e/60),i=Math.floor(e%60),a=Math.floor((e-Math.floor(e))*100);return`${t}:${String(i).padStart(2,"0")}.${String(a).padStart(2,"0")}`}function gh(n){switch(n.kind){case"goal":return 5;case"demo":return 4;case"save":return 3;case"assist":return 2;case"shot":case"bookmark":return 1;default:return 0}}function HA(n){switch(n.kind){case"goal":case"goal-context":case"goal-tag":return BA;default:return UA}}function vf(n){return n.seekTime!==void 0&&Number.isFinite(n.seekTime)?Math.max(0,n.seekTime):Number.isFinite(n.time)?Math.max(0,n.time-HA(n)):0}function VA(n){if(n.color)return n.color;if(n.isTeamZero===!0)return"#3b82f6";if(n.isTeamZero===!1)return"#f59e0b";switch(n.kind){case"goal":return"#f5f7fa";case"demo":return"#ef4444";case"save":return"#34d399";case"assist":return"#c084fc";case"shot":return"#60a5fa";case"bookmark":return"#facc15";default:return"#d1d9e0"}}function GA(n){if(n.events.length>1)return`${n.events.length}`;const e=n.events[0];return e?e.shortLabel&&e.shortLabel.trim()!==""?e.shortLabel.slice(0,3).toUpperCase():e.kind.slice(0,1).toUpperCase():""}function $A(n){return n.events.map(e=>`${sd(e.time)} ${e.label??e.kind}`).join(`
`)}function Vg(n){const e=new Map;for(const t of n){const i=t.frame!==void 0?`frame:${t.frame}`:`time:${t.time.toFixed(2)}`,a=e.get(i);if(a){a.events.push(t);continue}e.set(i,{key:i,time:t.time,events:[t]})}return[...e.values()].map(t=>({...t,events:[...t.events].sort((i,a)=>{const s=gh(a)-gh(i);return s!==0?s:i.time-a.time})})).sort((t,i)=>t.time-i.time)}function Gg(n,e){return n?typeof n=="function"?n(e):n:[]}function WA(n,e){const t=[];for(const i of n){const a=Gg(i.source,e);a.length!==0&&t.push({key:i.key,label:i.label,buckets:Vg(a)})}return t}function XA(n,e){return n?typeof n=="function"?n(e):n:[]}function qA(n,e){const t=new Set,i=[];for(const a of n)for(const s of XA(a,e)){const r=s.id;if(r!==void 0){if(t.has(r))continue;t.add(r)}i.push(s)}return i}function KA(n){const e=new Map;for(const t of n){const i=t.lane??"default",a=t.laneLabel??t.lane??"",s=e.get(i);if(s){s.ranges.push(t);continue}e.set(i,{key:i,label:a,ranges:[t]})}return[...e.values()].map(t=>({...t,ranges:[...t.ranges].sort((i,a)=>i.startTime-a.startTime)}))}function YA(n){return n.color?n.color:n.isTeamZero===!0?"#3b82f6":n.isTeamZero===!1?"#f59e0b":"#d1d9e0"}function jA(n,e){if(n.replayEvents)return Gg(n.replayEvents,e);if(n.includeReplayEvents===!1)return[];const t=new Set(n.replayEventKinds??FA);return e.replay.timelineEvents.filter(i=>t.has(i.kind))}function ZA(n,e){const t=e.player.projectReplayTimeToTimeline(vf(n));if(!t.hiddenBySkip)return t.seekTime;const i=Math.min(e.player.getTimelineDuration(),t.timelineTime+zA);return e.player.projectTimelineTimeToReplay(i)}function fo(n,e){return`${n/Math.max(e,1e-4)*100}%`}function JA(n,e,t){let i=n.timelineTime,a=e.timelineTime;return a<=i&&(n.hiddenBySkip||e.hiddenBySkip)&&(i>=t?(i=Math.max(0,t-_h),a=t):a=Math.min(t,i+_h)),{startTimelineTime:i,endTimelineTime:a}}function QA(n={}){const e=n.pauseWhileScrubbing??!0;let t=0;const i=n.events?[{key:"events:initial",label:n.eventsLabel??"Events",source:n.events}]:[],a=n.ranges?[n.ranges]:[];let s=null,r=null,o=null,l=null,c=null,u=null,d=null,f=null,p=null,_=null,g=null,m=null,h=!1,y="",x=!1,b=!1,A=null,M=[],T=[],C=null;const v=new Map,S=[],R=[],I=[];function U(){A&&(X(A),G({...A,state:A.player.getState()}))}function B(){A&&(V(A),G({...A,state:A.player.getState()}))}function G(q){if(!l||!c||!u||!d||!f||!p||!r)return;const ue=q.player.getTimelineCurrentTime(),xe=q.player.getTimelineDuration(),ye=[xe.toFixed(4),q.state.skipKickoffsEnabled?"1":"0",q.state.skipPostGoalTransitionsEnabled?"1":"0"].join(":");C!==ye&&(X(q),V(q),C=ye),l.min="0",l.max=`${xe}`,l.step="0.01",l.value=`${Math.min(ue,xe)}`,c.dataset.playing=q.state.playing?"true":"false",c.setAttribute("aria-label",q.state.playing?"Pause replay":"Play replay"),c.title=q.state.playing?"Pause replay":"Play replay",u.textContent=q.state.playing?"||":">",d.textContent=q.state.playing?"Pause":"Play",f.textContent=sd(ue),p.textContent=`-${sd(xe-ue)}`,r.dataset.scrubbing=x?"true":"false";for(const O of v.values()){const K=ue-O.timelineTime,te=K>=0&&K<=OA;O.element.dataset.active=te?"true":"false",O.element.dataset.passed=O.timelineTime<=ue?"true":"false"}for(const O of S){const K=Math.max(0,O.startTimelineTime),te=Math.min(xe,O.endTimelineTime);if(Math.max(0,te-K)<=1e-4){O.element.hidden=!0;continue}O.element.hidden=!1,O.element.dataset.active=ue>=K&&ue<=te?"true":"false"}const he=fo(Math.min(ue,xe),xe);for(const O of I)O.element.style.left=he;for(const O of R)O.element.style.left=he}function z(q,ue,xe){const ye=q.events[0];if(!ye)return null;const he=ue.player.projectReplayTimeToTimeline(q.time),O=document.createElement("button");return O.type="button",O.className="sap-tl-marker",O.style.left=fo(he.timelineTime,xe),O.style.color=VA(ye),O.title=$A(q),O.textContent=GA(q),O.addEventListener("click",()=>{ue.player.seek(ZA(ye,ue))}),O.dataset.active="false",O.dataset.passed="false",v.set(q.key,{element:O,timelineTime:he.timelineTime}),O}function X(q){if(!g||!_)return;g.replaceChildren(),_.replaceChildren(),v.clear(),I.splice(0,I.length);const ue=jA(n,q);M=[],ue.length>0&&M.push({key:"replay",label:n.replayEventsLabel??"Replay",buckets:Vg(ue)}),M.push(...WA(i,q));const xe=Math.max(q.player.getTimelineDuration(),1e-4),ye=M[0];if(ye?.key==="replay")for(const O of ye.buckets){const K=z({...O,key:`${ye.key}:${O.key}`},q,xe);K&&g.append(K)}const he=M.filter(O=>O.key!=="replay");_.hidden=he.length===0;for(const O of he){const K=document.createElement("div");K.className="sap-tl-event-lane",K.dataset.label=O.label;const te=document.createElement("span");te.className="sap-tl-event-lane-label",te.textContent=O.label,te.setAttribute("aria-label",O.label),K.append(te);const Se=document.createElement("div");Se.className="sap-tl-event-lane-track";const ve=document.createElement("div");ve.className="sap-tl-markers";for(const at of O.buckets){const N=z({...at,key:`${O.key}:${at.key}`},q,xe);N&&ve.append(N)}const De=document.createElement("div");De.className="sap-tl-event-playhead",Se.append(ve,De),I.push({element:De}),K.append(Se),_.append(K)}}function V(q){if(!o)return;o.replaceChildren(),S.splice(0,S.length),R.splice(0,R.length);const ue=qA(a,q).filter(ye=>Number.isFinite(ye.startTime)&&Number.isFinite(ye.endTime)&&ye.endTime>ye.startTime);T=KA(ue);const xe=Math.max(q.player.getTimelineDuration(),1e-4);if(T.length===0){o.hidden=!0;return}o.hidden=!1;for(const ye of T){const he=document.createElement("div");he.className="sap-tl-range-lane";const O=document.createElement("div");if(O.className="sap-tl-range-lane-track",ye.label){he.dataset.label=ye.label;const te=document.createElement("span");te.className="sap-tl-range-lane-label",te.textContent=ye.label,te.setAttribute("aria-label",ye.label),he.append(te)}for(const te of ye.ranges){const Se=q.player.projectReplayTimeToTimeline(te.startTime),ve=q.player.projectReplayTimeToTimeline(te.endTime),{startTimelineTime:De,endTimelineTime:at}=JA(Se,ve,xe),N=document.createElement("div");N.className="sap-tl-range-segment",te.className&&N.classList.add(te.className),N.style.background=YA(te),N.title=te.label??ye.label,N.dataset.active="false",N.style.left=fo(De,xe),N.style.width=fo(Math.max(0,at-De),xe),O.append(N),S.push({range:te,element:N,startTimelineTime:De,endTimelineTime:at})}const K=document.createElement("div");K.className="sap-tl-range-playhead",O.append(K),R.push({element:K}),he.append(O),o.append(he)}}function ee(){x&&(x=!1,r?.setAttribute("data-scrubbing","false"),b&&A?.player.play(),b=!1)}function fe(){if(x||(x=!0,r?.setAttribute("data-scrubbing","true"),!e))return;const q=A?.player;q&&(b=q.getState().playing,b&&q.pause())}return{id:"timeline-overlay",addEventSource(q,ue={}){return i.push({key:ue.id??`events:${t++}`,label:ue.label??"Events",source:q}),U(),()=>{this.removeEventSource(q)}},removeEventSource(q){const ue=i.findIndex(xe=>xe.source===q);return ue<0?!1:(i.splice(ue,1),U(),!0)},refreshEvents(){U()},addRangeSource(q){return a.push(q),B(),()=>{this.removeRangeSource(q)}},removeRangeSource(q){const ue=a.indexOf(q);return ue<0?!1:(a.splice(ue,1),B(),!0)},refreshRanges(){B()},setup(q){A=q,DA(),getComputedStyle(q.container).position==="static"&&(h=!0,y=q.container.style.position,q.container.style.position="relative"),s=document.createElement("div"),s.className="sap-tl-root",r=document.createElement("div"),r.className="sap-tl-shell",r.dataset.scrubbing="false";const ue=document.createElement("div");ue.className="sap-tl-topline";const xe=document.createElement("div");xe.className="sap-tl-primary",c=document.createElement("button"),c.type="button",c.className="sap-tl-toggle sap-tl-track-toggle",u=document.createElement("span"),u.className="sap-tl-toggle-icon",u.setAttribute("aria-hidden","true"),u.textContent=">",d=document.createElement("span"),d.className="sap-tl-toggle-label",d.textContent="Play",c.append(u,d),c.addEventListener("click",()=>{q.player.togglePlayback()}),f=document.createElement("span"),f.className="sap-tl-current",f.textContent="0:00.00",p=document.createElement("span"),p.className="sap-tl-remaining",p.textContent="-0:00.00",xe.append(f),ue.append(xe,p);const ye=document.createElement("div");ye.className="sap-tl-track-wrap",o=document.createElement("div"),o.className="sap-tl-ranges",o.hidden=!0,_=document.createElement("div"),_.className="sap-tl-event-lanes",_.hidden=!0;const he=document.createElement("div");he.className="sap-tl-track-rail";const O=document.createElement("div");O.className="sap-tl-main-rail",g=document.createElement("div"),g.className="sap-tl-markers",l=document.createElement("input"),l.className="sap-tl-range",l.type="range",l.min="0",l.max=`${q.replay.duration}`,l.step="0.01",l.value="0";const K=()=>{fe()},te=()=>{l&&q.player.seek(q.player.projectTimelineTimeToReplay(Number(l.value)))},Se=()=>{ee()};l.addEventListener("pointerdown",K),l.addEventListener("input",te),l.addEventListener("change",Se),window.addEventListener("pointerup",Se),window.addEventListener("pointercancel",Se),m=()=>{l?.removeEventListener("pointerdown",K),l?.removeEventListener("input",te),l?.removeEventListener("change",Se),window.removeEventListener("pointerup",Se),window.removeEventListener("pointercancel",Se)},he.append(O,g,l),ye.append(o,_,c,he),r.append(ue,ye),s.append(r),q.container.append(s),X(q),V(q),G({...q,state:q.player.getState()})},onStateChange(q){A=q,G(q)},teardown(q){m?.(),m=null,ee(),s?.remove(),s=null,r=null,o=null,_=null,l=null,c=null,u=null,d=null,f=null,p=null,g=null,A=null,M=[],T=[],C=null,v.clear(),S.splice(0,S.length),R.splice(0,R.length),I.splice(0,I.length),h&&(q.container.style.position=y,h=!1)}}}function e1(n){return`
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
            <label class="toggle">
              <input id="hitbox-wireframes" type="checkbox" />
              <span>Show hitboxes</span>
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
`}const yf=["timeline","core_player","core_player_goal_context","possession","pressure","territorial_pressure","movement","positioning","rotation_player","rotation_team","mechanics","goal_context","backboard","ceiling_shot","wall_aerial","wall_aerial_shot","center","flick","musty_flick","dodge_reset","double_tap","fifty_fifty","one_timer","pass","pass_last_completed","ball_carry","goal_tags","rush","speed_flip","half_flip","half_volley","wavedash","whiff","powerslide","touch","touch_ball_movement","touch_last_touch","boost_pickups","boost_ledger","boost_state","bump"],$g=["air_dribble","ball_carry","ceiling_shot","center","double_tap","flick","flip_reset","half_flip","half_volley","musty_flick","one_timer","pass","speed_flip","wall_aerial","wall_aerial_shot","wavedash"],Wg=[...new Set([...yf,...$g])],t1=new Set(yf),n1=new Set($g);function ts(){return Object.fromEntries(Wg.map(n=>[n,0]))}function Nc(n){return{...n??ts()}}function po(n,e){n[e]+=1}function i1(n){return Wg.includes(n)}function Xg(n){if(n==null)return null;if(!n||typeof n!="object")return String(n);const[e,t]=Object.entries(n)[0]??["Unknown","unknown"];return`${e}:${typeof t=="string"?t:JSON.stringify(t)}`}function rd(n){return Xg(n.player??n.player_id??n.scorer)}function a1(n){const e=n.is_team_0??n.scoring_team_is_team_0;return typeof e=="boolean"?e:null}function s1(n){const e=n.kind;return typeof e!="string"||!n1.has(e)||t1.has(e)||!i1(e)?null:e}function od(n){const e=n.timing,t=n.resolved_frame??n.frame??(e&&typeof e=="object"&&"frame"in e?e.frame:void 0)??(e&&typeof e=="object"&&"end_frame"in e?e.end_frame:void 0);return typeof t=="number"&&Number.isFinite(t)?t:null}function ld(n){const e=n.timing,t=n.resolved_time??n.time??(e&&typeof e=="object"&&"time"in e?e.time:void 0)??(e&&typeof e=="object"&&"end_time"in e?e.end_time:void 0);return typeof t=="number"&&Number.isFinite(t)?t:null}function r1(n,e){const t=od(n);if(t!==null)return t<=e.frame_number;const i=ld(n);return i!==null&&i<=e.time}function o1(n){return[...n].filter(e=>!!e&&typeof e=="object").sort((e,t)=>{const i=od(e),a=od(t);if(i!==a)return(i??Number.POSITIVE_INFINITY)-(a??Number.POSITIVE_INFINITY);const s=ld(e),r=ld(t);return s!==r?(s??Number.POSITIVE_INFINITY)-(r??Number.POSITIVE_INFINITY):(rd(e)??"").localeCompare(rd(t)??"")})}function qg(n){const e=Kg(n);for(const t of n.frames)e.applyFrame(t);return n}function Kg(n){const e=yf.map(a=>({eventType:a,events:o1(n.events[a]??[]),index:0})),t=new Map,i={teamZero:ts(),teamOne:ts()};return{applyFrame(a){for(const s of e)for(;s.index<s.events.length&&r1(s.events[s.index],a);){const r=s.events[s.index],o=rd(r),l=s.eventType==="mechanics"?s1(r):null;if(o!==null){const u=t.get(o)??ts();t.set(o,u),po(u,s.eventType),l!==null&&po(u,l)}const c=a1(r);if(c!==null){const u=c?i.teamZero:i.teamOne;po(u,s.eventType),l!==null&&po(u,l)}s.index+=1}for(const s of a.players){const r=Xg(s.player_id);s.event_counts=Nc(r===null?void 0:t.get(r))}a.team_zero.event_counts=Nc(i.teamZero),a.team_one.event_counts=Nc(i.teamOne)}}}function vh(n){if(!n||typeof n!="object")return String(n);const[e,t]=Object.entries(n)[0]??["Unknown","unknown"];return`${e}:${typeof t=="string"?t:JSON.stringify(t)}`}function Yg(){return{count:0,is_last_backboard:!1,last_backboard_time:null,last_backboard_frame:null,time_since_last_backboard:null,frames_since_last_backboard:null}}function l1(n){return n.map((e,t)=>({event:e,index:t})).sort((e,t)=>e.event.frame!==t.event.frame?e.event.frame-t.event.frame:e.event.time!==t.event.time?e.event.time-t.event.time:e.index-t.index).map(({event:e})=>e)}function c1(n,e,t,i){n.is_last_backboard=i,n.time_since_last_backboard=n.last_backboard_time==null?null:Math.max(0,t-n.last_backboard_time),n.frames_since_last_backboard=n.last_backboard_frame==null?null:Math.max(0,e-n.last_backboard_frame)}function u1(n,e,t,i){n.count+=1,n.last_backboard_time=e.time,n.last_backboard_frame=e.frame,n.time_since_last_backboard=Math.max(0,i-e.time),n.frames_since_last_backboard=Math.max(0,t-e.frame)}function d1(n,e){Object.assign(n,e??Yg())}function yh(n,e){n.count=e}function f1(n){const e=jg(n);for(const t of n.frames)e.applyFrame(t);return n}function jg(n){const e=l1(n.events.backboard??[]);let t=0,i=0,a=0,s=null;const r=new Map;return{applyFrame(o){for(const[c,u]of r)c1(u,o.frame_number,o.time,c===s);let l=!1;for(;t<e.length&&e[t].frame<=o.frame_number;){const c=e[t],u=vh(c.player),d=r.get(u)??Yg();r.set(u,d),u1(d,c,o.frame_number,o.time),c.is_team_0?i+=1:a+=1,s=u,l=!0,t+=1}if(l)for(const c of r.values())c.is_last_backboard=!1;if(s!=null){const c=r.get(s);c&&(c.is_last_backboard=!0)}yh(o.team_zero.backboard,i),yh(o.team_one.backboard,a);for(const c of o.players)d1(c.backboard,r.get(vh(c.player_id)))}}}function bh(n){if(!n||typeof n!="object")return String(n);const[e,t]=Object.entries(n)[0]??["Unknown","unknown"];return`${e}:${typeof t=="string"?t:JSON.stringify(t)}`}function Vo(){return{carry_count:0,total_carry_time:0,total_straight_line_distance:0,total_path_distance:0,longest_carry_time:0,furthest_carry_distance:0,fastest_carry_speed:0,carry_speed_sum:0,average_horizontal_gap_sum:0,average_vertical_gap_sum:0}}function Go(){return{count:0,ground_to_air_count:0,wall_to_air_count:0,total_touch_count:0,max_touch_count:0,total_time:0,total_straight_line_distance:0,total_path_distance:0,longest_time:0,furthest_distance:0,fastest_speed:0,speed_sum:0,average_horizontal_gap_sum:0,average_vertical_gap_sum:0}}function p1(n){return n.map((e,t)=>({event:e,index:t})).sort((e,t)=>e.event.end_frame!==t.event.end_frame?e.event.end_frame-t.event.end_frame:e.event.end_time!==t.event.end_time?e.event.end_time-t.event.end_time:e.index-t.index).map(({event:e})=>e)}function cd(n){return`${n.key}\0${n.value}`}function ho(n){return n.map(cd).join("")}function Zg(n,e){e.sort((a,s)=>cd(a).localeCompare(cd(s)));const t=n.labeled_event_counts??={entries:[]},i=t.entries.find(a=>ho(a.labels)===ho(e));i?i.count+=1:(t.entries.push({labels:[...e],count:1}),t.entries.sort((a,s)=>ho(a.labels).localeCompare(ho(s.labels))))}function Sh(n,e){return n.labeled_event_counts?.entries.filter(t=>t.labels.some(i=>i.key==="origin"&&i.value===e)).reduce((t,i)=>t+i.count,0)??0}function Jg(n){return n.labeled_event_counts?.entries.reduce((e,t)=>e+t.count,0)??0}function Qg(n){return{entries:n.entries.map(e=>({labels:e.labels.map(t=>({...t})),count:e.count}))}}function xh(n,e){Zg(n,[{key:"kind",value:"carry"}]),n.carry_count=Jg(n),n.total_carry_time+=e.duration,n.total_straight_line_distance+=e.straight_line_distance,n.total_path_distance+=e.path_distance,n.longest_carry_time=Math.max(n.longest_carry_time,e.duration),n.furthest_carry_distance=Math.max(n.furthest_carry_distance,e.straight_line_distance),n.fastest_carry_speed=Math.max(n.fastest_carry_speed,e.average_speed),n.carry_speed_sum+=e.average_speed,n.average_horizontal_gap_sum+=e.average_horizontal_gap,n.average_vertical_gap_sum+=e.average_vertical_gap}function wh(n,e){e.air_dribble_origin!=null&&Zg(n,[{key:"origin",value:e.air_dribble_origin}]),n.count=Jg(n),n.ground_to_air_count=Sh(n,"ground_to_air"),n.wall_to_air_count=Sh(n,"wall_to_air"),n.total_time+=e.duration,n.total_straight_line_distance+=e.straight_line_distance,n.total_path_distance+=e.path_distance,n.longest_time=Math.max(n.longest_time,e.duration),n.furthest_distance=Math.max(n.furthest_distance,e.straight_line_distance),n.fastest_speed=Math.max(n.fastest_speed,e.average_speed),n.speed_sum+=e.average_speed,n.average_horizontal_gap_sum+=e.average_horizontal_gap,n.average_vertical_gap_sum+=e.average_vertical_gap,n.total_touch_count+=e.touch_count,n.max_touch_count=Math.max(n.max_touch_count,e.touch_count)}function Ic(n,e){Object.assign(n,e??Vo()),e?.labeled_event_counts?n.labeled_event_counts=Qg(e.labeled_event_counts):delete n.labeled_event_counts}function kc(n,e){Object.assign(n,e??Go()),e?.labeled_event_counts?n.labeled_event_counts=Qg(e.labeled_event_counts):delete n.labeled_event_counts}function h1(n){const e=ev(n);for(const t of n.frames)e.applyFrame(t);return n}function ev(n){const e=p1(n.events.ball_carry??[]);let t=0;const i=new Map,a=new Map,s=Vo(),r=Vo(),o=Go(),l=Go();return{applyFrame(c){for(;t<e.length&&e[t].end_frame<c.frame_number;){const u=e[t],d=bh(u.player_id);if(u.kind==="carry"){const f=i.get(d)??Vo();i.set(d,f),xh(f,u),xh(u.is_team_0?s:r,u)}else{const f=a.get(d)??Go();a.set(d,f),wh(f,u),wh(u.is_team_0?o:l,u)}t+=1}Ic(c.team_zero.ball_carry,s),Ic(c.team_one.ball_carry,r),kc(c.team_zero.air_dribble,o),kc(c.team_one.air_dribble,l);for(const u of c.players){const d=bh(u.player_id);Ic(u.ball_carry,i.get(d)),kc(u.air_dribble,a.get(d))}}}}function Dc(n){if(!n||typeof n!="object")return String(n);const[e,t]=Object.entries(n)[0]??["Unknown","unknown"];return`${e}:${typeof t=="string"?t:JSON.stringify(t)}`}function ud(){return{bumps_inflicted:0,bumps_taken:0,team_bumps_inflicted:0,team_bumps_taken:0,last_bump_time:null,last_bump_frame:null,last_bump_strength:null,max_bump_strength:0,cumulative_bump_strength:0}}function Eh(){return{bumps_inflicted:0,team_bumps_inflicted:0}}function m1(n){return n.map((e,t)=>({event:e,index:t})).sort((e,t)=>e.event.frame!==t.event.frame?e.event.frame-t.event.frame:e.event.time!==t.event.time?e.event.time-t.event.time:e.index-t.index).map(({event:e})=>e)}function _1(n,e){n.bumps_inflicted+=1,e.is_team_bump&&(n.team_bumps_inflicted+=1),n.last_bump_time=e.time,n.last_bump_frame=e.frame,n.last_bump_strength=e.strength,n.max_bump_strength=Math.max(n.max_bump_strength,e.strength),n.cumulative_bump_strength+=e.strength}function g1(n,e){n.bumps_taken+=1,e.is_team_bump&&(n.team_bumps_taken+=1)}function v1(n,e){n.bumps_inflicted+=1,e.is_team_bump&&(n.team_bumps_inflicted+=1)}function y1(n,e){Object.assign(n,e??ud())}function Mh(n,e){Object.assign(n,e)}function b1(n){const e=tv(n);for(const t of n.frames)e.applyFrame(t);return n}function tv(n){const e=m1(n.events.bump??[]);let t=0;const i=new Map,a=Eh(),s=Eh();return{applyFrame(r){for(;t<e.length&&e[t].frame<=r.frame_number;){const o=e[t],l=Dc(o.initiator),c=i.get(l)??ud();i.set(l,c),_1(c,o);const u=Dc(o.victim),d=i.get(u)??ud();i.set(u,d),g1(d,o),v1(o.initiator_is_team_0?a:s,o),t+=1}Mh(r.team_zero.bump,a),Mh(r.team_one.bump,s);for(const o of r.players)y1(o.bump,i.get(Dc(o.player_id)))}}}const cl=255,S1=1,x1=cl-1,w1=11920928955078125e-23,E1=["tracked_time","boost_integral","time_zero_boost","time_hundred_boost","time_boost_0_25","time_boost_25_50","time_boost_50_75","time_boost_75_100"],M1=["amount_collected","amount_collected_inactive","big_pads_collected_inactive","small_pads_collected_inactive","amount_stolen","big_pads_collected","small_pads_collected","big_pads_stolen","small_pads_stolen","amount_collected_big","amount_stolen_big","amount_collected_small","amount_stolen_small","amount_respawned","overfill_total","overfill_from_stolen","amount_used","amount_used_while_grounded","amount_used_while_airborne","amount_used_while_supersonic"],T1=[...E1,...M1];function Nt(n){return Math.fround(n)}function vt(n,e){return Nt(Nt(n)+Nt(e))}function mo(n,e){return Nt(Nt(n)-Nt(e))}function mi(n,e){return Nt(Nt(n)*Nt(e))}function dd(n,e){return Nt(Nt(n)/Nt(e))}function nv(){return{tracked_time:0,boost_integral:0,time_zero_boost:0,time_hundred_boost:0,time_boost_0_25:0,time_boost_25_50:0,time_boost_50_75:0,time_boost_75_100:0,amount_collected:0,amount_collected_inactive:0,big_pads_collected_inactive:0,small_pads_collected_inactive:0,amount_stolen:0,big_pads_collected:0,small_pads_collected:0,big_pads_stolen:0,small_pads_stolen:0,amount_collected_big:0,amount_stolen_big:0,amount_collected_small:0,amount_stolen_small:0,amount_respawned:0,overfill_total:0,overfill_from_stolen:0,amount_used:0,amount_used_while_grounded:0,amount_used_while_airborne:0,amount_used_while_supersonic:0}}const C1=nv();function _o(){return{stats:nv(),countedPickupKeys:new Set,currentBoostAmount:null,currentBoostBefore:null,currentBoostFrame:null,previousBoostAmount:null,labeledAmountsVersion:0,labeledAmountsSnapshot:void 0,labeledAmountsSnapshotVersion:-1,labeledCountsVersion:0,labeledCountsSnapshot:void 0,labeledCountsSnapshotVersion:-1}}function Oi(n){const[e,t]=Object.entries(n)[0]??["Unknown","unknown"];return`${e}:${typeof t=="string"?t:JSON.stringify(t)}`}function gi(n,e){return n.labels?.find(t=>t.key===e)?.value??null}function iv(n){return[...n??[]].sort((e,t)=>e.key===t.key?e.value.localeCompare(t.value):e.key.localeCompare(t.key))}function ul(n){return JSON.stringify(iv(n))}function av(n){return iv(n).map(e=>({...e}))}function A1(n,e){const t=Nt(e.amount);if(t<=0)return!1;const i=(n.labeled_amounts??={entries:[]}).entries,a=ul(e.labels),s=i.find(r=>ul(r.labels)===a);return s?(s.value=vt(s.value,t),!0):(i.push({labels:av(e.labels),value:t}),i.sort((r,o)=>JSON.stringify(r.labels).localeCompare(JSON.stringify(o.labels))),!0)}function R1(n,e,t){if(t<=0)return!1;const i=(n.labeled_counts??={entries:[]}).entries,a=ul(e.labels),s=i.find(r=>ul(r.labels)===a);return s?(s.count+=t,!0):(i.push({labels:av(e.labels),count:t}),i.sort((r,o)=>JSON.stringify(r.labels).localeCompare(JSON.stringify(o.labels))),!0)}function Ba(n){return dd(mi(n,cl),100)}function za(n,e,t,i){const a=mo(e,n);if(Math.abs(a)<=w1)return n>=t&&n<i?1:0;const s=dd(mo(t,n),a),r=dd(mo(i,n),a),o=Math.max(Math.min(s,r),0),l=Math.min(Math.max(s,r),1);return Math.max(mo(l,o),0)}function P1(n,e){n.currentBoostAmount=Nt(e.boost_amount),n.currentBoostBefore=e.boost_before==null?null:Nt(e.boost_before),n.currentBoostFrame=e.frame}function sv(n,e,t,i){const a=Nt(e),s=Nt(t),r=Nt(i),o=mi(vt(a,s),.5);n.tracked_time=vt(n.tracked_time,r),n.boost_integral=vt(n.boost_integral,mi(o,r)),n.time_zero_boost=vt(n.time_zero_boost,mi(r,za(a,s,0,S1))),n.time_hundred_boost=vt(n.time_hundred_boost,mi(r,za(a,s,x1,cl+1))),n.time_boost_0_25=vt(n.time_boost_0_25,mi(r,za(a,s,0,Ba(25)))),n.time_boost_25_50=vt(n.time_boost_25_50,mi(r,za(a,s,Ba(25),Ba(50)))),n.time_boost_50_75=vt(n.time_boost_50_75,mi(r,za(a,s,Ba(50),Ba(75)))),n.time_boost_75_100=vt(n.time_boost_75_100,mi(r,za(a,s,Ba(75),cl+1)))}function L1(n,e,t){if(n.currentBoostFrame!==t)return null;const i=n.currentBoostAmount;if(i==null)return null;const a=n.currentBoostBefore??i;return sv(n.stats,a,i,e),n.previousBoostAmount=i,[a,i]}function Th(n,e){if(e.count<=0)return;const t=gi(e,"pad_size");if(t!=="big"&&t!=="small")return;const i=gi(e,"activity")??"unknown",a=gi(e,"field_half")??"unknown",s=`${e.frame}:${Oi(e.player_id)}:${t}:${i}:${a}`;if(!n.countedPickupKeys.has(s)){if(n.countedPickupKeys.add(s),i==="inactive"){t==="big"?n.stats.big_pads_collected_inactive+=1:n.stats.small_pads_collected_inactive+=1;return}t==="big"?n.stats.big_pads_collected+=1:n.stats.small_pads_collected+=1}}function Ch(n,e){const t=Nt(Number.isFinite(e.amount)?e.amount:0);e.transaction!=="used"&&A1(n.stats,e)&&(n.labeledAmountsVersion+=1),e.transaction==="collected"&&R1(n.stats,e,Math.max(e.count,1))&&(n.labeledCountsVersion+=1);const i=gi(e,"pad_size"),a=gi(e,"activity")??"active",s=gi(e,"field_half");switch(e.transaction){case"collected":if(Th(n,e),a==="inactive"){n.stats.amount_collected_inactive=vt(n.stats.amount_collected_inactive,t);break}n.stats.amount_collected=vt(n.stats.amount_collected,t),i==="big"?n.stats.amount_collected_big=vt(n.stats.amount_collected_big,t):i==="small"&&(n.stats.amount_collected_small=vt(n.stats.amount_collected_small,t));break;case"stolen":n.stats.amount_stolen=vt(n.stats.amount_stolen,t),i==="big"?(n.stats.big_pads_stolen+=1,n.stats.amount_stolen_big=vt(n.stats.amount_stolen_big,t)):i==="small"&&(n.stats.small_pads_stolen+=1,n.stats.amount_stolen_small=vt(n.stats.amount_stolen_small,t));break;case"overfill":n.stats.overfill_total=vt(n.stats.overfill_total,t),s==="opponent"&&(n.stats.overfill_from_stolen=vt(n.stats.overfill_from_stolen,t)),Th(n,e);break;case"respawn":n.stats.amount_respawned=vt(n.stats.amount_respawned,t);break;case"used":n.stats.amount_used=vt(n.stats.amount_used,t);break;case"used_allocation":gi(e,"vertical_state")==="grounded"?n.stats.amount_used_while_grounded=vt(n.stats.amount_used_while_grounded,t):gi(e,"vertical_state")==="aerial"&&(n.stats.amount_used_while_airborne=vt(n.stats.amount_used_while_airborne,t)),gi(e,"supersonic")==="true"&&(n.stats.amount_used_while_supersonic=vt(n.stats.amount_used_while_supersonic,t));break}}function N1(n){return n.labeledAmountsSnapshotVersion!==n.labeledAmountsVersion&&(n.labeledAmountsSnapshot=n.stats.labeled_amounts&&n.stats.labeled_amounts.entries.length>0?{entries:n.stats.labeled_amounts.entries.map(e=>({labels:e.labels.map(t=>({...t})),value:e.value}))}:void 0,n.labeledAmountsSnapshotVersion=n.labeledAmountsVersion),n.labeledAmountsSnapshot}function I1(n){return n.labeledCountsSnapshotVersion!==n.labeledCountsVersion&&(n.labeledCountsSnapshot=n.stats.labeled_counts&&n.stats.labeled_counts.entries.length>0?{entries:n.stats.labeled_counts.entries.map(e=>({labels:e.labels.map(t=>({...t})),count:e.count}))}:void 0,n.labeledCountsSnapshotVersion=n.labeledCountsVersion),n.labeledCountsSnapshot}function Fc(n,e){const t=e?.stats??C1;for(const s of T1)n[s]=t[s];const i=e?N1(e):void 0;i?n.labeled_amounts=i:delete n.labeled_amounts;const a=e?I1(e):void 0;a?n.labeled_counts=a:delete n.labeled_counts}function k1(n){return[...n.events.boost_ledger??[]].sort((e,t)=>e.frame!==t.frame?e.frame-t.frame:e.time!==t.time?e.time-t.time:Oi(e.player_id).localeCompare(Oi(t.player_id)))}function D1(n){return[...n.events.boost_state??[]].sort((e,t)=>e.frame!==t.frame?e.frame-t.frame:e.time!==t.time?e.time-t.time:Oi(e.player_id).localeCompare(Oi(t.player_id)))}function F1(n){const e=rv(n);for(const t of n.frames)e.applyFrame(t);return n}function rv(n){const e=k1(n),t=D1(n);let i=0,a=0;const s=new Map,r=_o(),o=_o();return{applyFrame(l){const c=[];for(;a<t.length&&t[a].frame<=l.frame_number;){const u=t[a],d=Oi(u.player_id);let f=s.get(d);f||(f=_o(),s.set(d,f)),P1(f,u),u.frame===l.frame_number&&c.push({key:d,isTeamZero:u.is_team_0}),a+=1}for(;i<e.length&&e[i].frame<=l.frame_number;){const u=e[i],d=Oi(u.player_id);let f=s.get(d);f||(f=_o(),s.set(d,f)),Ch(f,u),Ch(u.is_team_0?r:o,u),i+=1}for(const u of c){const d=s.get(u.key);if(!d)continue;const f=L1(d,l.dt,l.frame_number);f&&sv(u.isTeamZero?r.stats:o.stats,f[0],f[1],l.dt)}Fc(l.team_zero.boost,r),Fc(l.team_one.boost,o);for(const u of l.players){const d=s.get(Oi(u.player_id));Fc(u.boost,d)}}}}const O1=.78;function ns(n){return Math.fround(n)}function U1(n,e){return ns(ns(n)+ns(e))}function ov(n,e){return ns(ns(n)-ns(e))}function Ah(n){if(!n||typeof n!="object")return String(n);const[e,t]=Object.entries(n)[0]??["Unknown","unknown"];return`${e}:${typeof t=="string"?t:JSON.stringify(t)}`}function lv(){return{count:0,high_confidence_count:0,is_last_ceiling_shot:!1,last_ceiling_shot_time:null,last_ceiling_shot_frame:null,time_since_last_ceiling_shot:null,frames_since_last_ceiling_shot:null,last_confidence:null,best_confidence:0,cumulative_confidence:0}}function B1(n){return n.map((e,t)=>({event:e,index:t})).sort((e,t)=>e.event.frame!==t.event.frame?e.event.frame-t.event.frame:e.event.time!==t.event.time?e.event.time-t.event.time:e.index-t.index).map(({event:e})=>e)}function fd(n){return`${n.key}\0${n.value}`}function go(n){return n.map(fd).join("")}function z1(n,e){e.sort((a,s)=>fd(a).localeCompare(fd(s)));const t=n.labeled_event_counts??={entries:[]},i=t.entries.find(a=>go(a.labels)===go(e));i?i.count+=1:(t.entries.push({labels:[...e],count:1}),t.entries.sort((a,s)=>go(a.labels).localeCompare(go(s.labels))))}function H1(n,e){return n.labeled_event_counts?.entries.filter(t=>t.labels.some(i=>i.key==="confidence_band"&&i.value===e)).reduce((t,i)=>t+i.count,0)??0}function V1(n){return n.labeled_event_counts?.entries.reduce((e,t)=>e+t.count,0)??0}function G1(n){return{entries:n.entries.map(e=>({labels:e.labels.map(t=>({...t})),count:e.count}))}}function $1(n,e,t,i){n.is_last_ceiling_shot=i,n.time_since_last_ceiling_shot=n.last_ceiling_shot_time==null?null:Math.max(0,ov(t,n.last_ceiling_shot_time)),n.frames_since_last_ceiling_shot=n.last_ceiling_shot_frame==null?null:Math.max(0,e-n.last_ceiling_shot_frame)}function W1(n,e,t,i){z1(n,[{key:"confidence_band",value:e.confidence>=O1?"high":"standard"}]),n.count=V1(n),n.high_confidence_count=H1(n,"high"),n.is_last_ceiling_shot=!0,n.last_ceiling_shot_time=e.time,n.last_ceiling_shot_frame=e.frame,n.time_since_last_ceiling_shot=Math.max(0,ov(i,e.time)),n.frames_since_last_ceiling_shot=Math.max(0,t-e.frame),n.last_confidence=e.confidence,n.best_confidence=Math.max(n.best_confidence,e.confidence),n.cumulative_confidence=U1(n.cumulative_confidence,e.confidence)}function X1(n,e){Object.assign(n,e??lv()),e?.labeled_event_counts?n.labeled_event_counts=G1(e.labeled_event_counts):delete n.labeled_event_counts}function q1(n){const e=cv(n);for(const t of n.frames)e.applyFrame(t);return n}function cv(n){const e=B1(n.events.ceiling_shot??[]);let t=0,i=null;const a=new Map;return{applyFrame(s){if(s.is_live_play){for(const[r,o]of a)$1(o,s.frame_number,s.time,i===r);for(;t<e.length&&e[t].frame<=s.frame_number;){const r=e[t],o=Ah(r.player),l=a.get(o)??lv();a.set(o,l),W1(l,r,s.frame_number,s.time),i=o,t+=1}}else i=null;for(const r of s.players)X1(r.ceiling_shot,a.get(Ah(r.player_id)))}}}function Oc(n){if(!n||typeof n!="object")return String(n);const[e,t]=Object.entries(n)[0]??["Unknown","unknown"];return`${e}:${typeof t=="string"?t:JSON.stringify(t)}`}function Gn(n,e){return Math.fround(Math.fround(n)+Math.fround(e))}function pd(){return{score:0,goals:0,assists:0,saves:0,shots:0,kickoff_goal_count:0,short_goal_count:0,medium_goal_count:0,long_goal_count:0,counter_attack_goal_count:0,sustained_pressure_goal_count:0,other_buildup_goal_count:0,goal_ball_air_time_sample_count:0,cumulative_goal_ball_air_time:0,last_goal_ball_air_time:null}}function hd(){return{...pd(),goals_conceded_while_last_defender:0,goals_for_while_most_back:0,goals_against_while_most_back:0,goal_against_boost_sample_count:0,cumulative_boost_on_goals_against:0,last_boost_on_goal_against:null,goal_against_boost_leadup_sample_count:0,cumulative_average_boost_in_goal_against_leadup:0,cumulative_min_boost_in_goal_against_leadup:0,last_average_boost_in_goal_against_leadup:null,last_min_boost_in_goal_against_leadup:null,goal_against_position_sample_count:0,cumulative_goal_against_position_x:0,cumulative_goal_against_position_y:0,cumulative_goal_against_position_z:0,last_goal_against_position:null,scoring_goal_last_touch_position_sample_count:0,cumulative_scoring_goal_last_touch_position_x:0,cumulative_scoring_goal_last_touch_position_y:0,cumulative_scoring_goal_last_touch_position_z:0,last_scoring_goal_last_touch_position:null}}function Rh(n){return n.map((e,t)=>({event:e,index:t})).sort((e,t)=>e.event.frame!==t.event.frame?e.event.frame-t.event.frame:e.event.time!==t.event.time?e.event.time-t.event.time:e.index-t.index).map(({event:e})=>e)}function K1(n,e){Object.assign(n,e??hd())}function Ph(n,e){Object.assign(n,e)}function Lh(n,e){n.score+=e.score_delta,n.goals+=e.goals_delta,n.assists+=e.assists_delta,n.saves+=e.saves_delta,n.shots+=e.shots_delta}function uv(n,e){if(e.time_after_kickoff!=null){const t=Math.max(0,e.time_after_kickoff);t<10?n.kickoff_goal_count+=1:t<20?n.short_goal_count+=1:t<40?n.medium_goal_count+=1:n.long_goal_count+=1}if(e.goal_buildup==="counter_attack"?n.counter_attack_goal_count+=1:e.goal_buildup==="sustained_pressure"?n.sustained_pressure_goal_count+=1:e.goal_buildup!=null&&(n.other_buildup_goal_count+=1),e.ball_air_time_before_goal!=null){const t=Math.max(0,e.ball_air_time_before_goal);n.goal_ball_air_time_sample_count+=1,n.cumulative_goal_ball_air_time=Gn(n.cumulative_goal_ball_air_time,t),n.last_goal_ball_air_time=t}}function Y1(n,e){e.goals_conceded_while_last_defender&&(n.goals_conceded_while_last_defender+=1),e.goals_for_while_most_back&&(n.goals_for_while_most_back+=1),e.goals_against_while_most_back&&(n.goals_against_while_most_back+=1),e.goal_against_boost_amount!=null&&(n.goal_against_boost_sample_count+=1,n.cumulative_boost_on_goals_against=Gn(n.cumulative_boost_on_goals_against,e.goal_against_boost_amount),n.last_boost_on_goal_against=e.goal_against_boost_amount),e.goal_against_average_boost_in_leadup!=null&&e.goal_against_min_boost_in_leadup!=null&&(n.goal_against_boost_leadup_sample_count+=1,n.cumulative_average_boost_in_goal_against_leadup=Gn(n.cumulative_average_boost_in_goal_against_leadup,e.goal_against_average_boost_in_leadup),n.cumulative_min_boost_in_goal_against_leadup=Gn(n.cumulative_min_boost_in_goal_against_leadup,e.goal_against_min_boost_in_leadup),n.last_average_boost_in_goal_against_leadup=e.goal_against_average_boost_in_leadup,n.last_min_boost_in_goal_against_leadup=e.goal_against_min_boost_in_leadup),e.goal_against_position!=null&&(n.goal_against_position_sample_count+=1,n.cumulative_goal_against_position_x=Gn(n.cumulative_goal_against_position_x,e.goal_against_position.x),n.cumulative_goal_against_position_y=Gn(n.cumulative_goal_against_position_y,e.goal_against_position.y),n.cumulative_goal_against_position_z=Gn(n.cumulative_goal_against_position_z,e.goal_against_position.z),n.last_goal_against_position={...e.goal_against_position}),e.scoring_goal_last_touch_position!=null&&(n.scoring_goal_last_touch_position_sample_count+=1,n.cumulative_scoring_goal_last_touch_position_x=Gn(n.cumulative_scoring_goal_last_touch_position_x,e.scoring_goal_last_touch_position.x),n.cumulative_scoring_goal_last_touch_position_y=Gn(n.cumulative_scoring_goal_last_touch_position_y,e.scoring_goal_last_touch_position.y),n.cumulative_scoring_goal_last_touch_position_z=Gn(n.cumulative_scoring_goal_last_touch_position_z,e.scoring_goal_last_touch_position.z),n.last_scoring_goal_last_touch_position={...e.scoring_goal_last_touch_position}),uv(n,e)}function j1(n){const e=dv(n);for(const t of n.frames)e.applyFrame(t);return n}function dv(n){const e=Rh(n.events.core_player??[]),t=Rh(n.events.core_player_goal_context??[]);let i=0,a=0;const s=new Map,r=pd(),o=pd();return{applyFrame(l){for(;i<e.length&&e[i].frame<=l.frame_number;){const c=e[i],u=Oc(c.player),d=s.get(u)??hd();s.set(u,d),Lh(d,c);const f=c.is_team_0?r:o;Lh(f,c),i+=1}for(;a<t.length&&t[a].frame<=l.frame_number;){const c=t[a],u=Oc(c.player),d=s.get(u)??hd();s.set(u,d),Y1(d,c),(c.time_after_kickoff!=null||c.goal_buildup!=null||c.ball_air_time_before_goal!=null)&&uv(c.is_team_0?r:o,c),a+=1}Ph(l.team_zero.core,r),Ph(l.team_one.core,o);for(const c of l.players)K1(c.core,s.get(Oc(c.player_id)))}}}function Nh(n){if(!n||typeof n!="object")return String(n);const[e,t]=Object.entries(n)[0]??["Unknown","unknown"];return`${e}:${typeof t=="string"?t:JSON.stringify(t)}`}function fv(){return{count:0,on_ball_count:0}}function Z1(n){return n.map((e,t)=>({event:e,index:t})).sort((e,t)=>e.event.frame!==t.event.frame?e.event.frame-t.event.frame:e.event.time!==t.event.time?e.event.time-t.event.time:e.index-t.index).map(({event:e})=>e)}function J1(n,e){n.count+=1,e.on_ball&&(n.on_ball_count+=1)}function Q1(n,e){Object.assign(n,e??fv())}function eR(n){const e=pv(n);for(const t of n.frames)e.applyFrame(t);return n}function pv(n){const e=Z1(n.events.dodge_reset??[]);let t=0;const i=new Map;return{applyFrame(a){for(;t<e.length&&e[t].frame<=a.frame_number;){const s=e[t],r=Nh(s.player),o=i.get(r)??fv();i.set(r,o),J1(o,s),t+=1}for(const s of a.players)Q1(s.dodge_reset,i.get(Nh(s.player_id)))}}}function Ih(n){if(!n||typeof n!="object")return String(n);const[e,t]=Object.entries(n)[0]??["Unknown","unknown"];return`${e}:${typeof t=="string"?t:JSON.stringify(t)}`}function hv(){return{count:0,is_last_double_tap:!1,last_double_tap_time:null,last_double_tap_frame:null,time_since_last_double_tap:null,frames_since_last_double_tap:null}}function tR(n){return n.map((e,t)=>({event:e,index:t})).sort((e,t)=>e.event.frame!==t.event.frame?e.event.frame-t.event.frame:e.event.time!==t.event.time?e.event.time-t.event.time:e.index-t.index).map(({event:e})=>e)}function nR(n,e,t,i){n.is_last_double_tap=i,n.time_since_last_double_tap=n.last_double_tap_time==null?null:Math.max(0,t-n.last_double_tap_time),n.frames_since_last_double_tap=n.last_double_tap_frame==null?null:Math.max(0,e-n.last_double_tap_frame)}function iR(n,e,t,i){n.count+=1,n.last_double_tap_time=e.time,n.last_double_tap_frame=e.frame,n.time_since_last_double_tap=Math.max(0,i-e.time),n.frames_since_last_double_tap=Math.max(0,t-e.frame)}function aR(n,e){Object.assign(n,e??hv())}function kh(n,e){n.count=e}function sR(n){const e=mv(n);for(const t of n.frames)e.applyFrame(t);return n}function mv(n){const e=tR(n.events.double_tap??[]);let t=0,i=0,a=0,s=null;const r=new Map;return{applyFrame(o){for(const[c,u]of r)nR(u,o.frame_number,o.time,c===s);let l=!1;for(;t<e.length&&e[t].frame<=o.frame_number;){const c=e[t],u=Ih(c.player),d=r.get(u)??hv();r.set(u,d),iR(d,c,o.frame_number,o.time),c.is_team_0?i+=1:a+=1,s=u,l=!0,t+=1}if(l)for(const c of r.values())c.is_last_double_tap=!1;if(s!=null){const c=r.get(s);c&&(c.is_last_double_tap=!0)}kh(o.team_zero.double_tap,i),kh(o.team_one.double_tap,a);for(const c of o.players)aR(c.double_tap,r.get(Ih(c.player_id)))}}}function Dh(n){if(!n||typeof n!="object")return String(n);const[e,t]=Object.entries(n)[0]??["Unknown","unknown"];return`${e}:${typeof t=="string"?t:JSON.stringify(t)}`}function _v(){return{demos_inflicted:0,demos_taken:0}}function Fh(){return{demos_inflicted:0}}function rR(n){return n.filter(e=>e.kind==="Kill"||e.kind==="Death").map((e,t)=>({event:e,index:t})).sort((e,t)=>e.event.time!==t.event.time?e.event.time-t.event.time:e.index-t.index).map(({event:e})=>e)}function oR(n,e){Object.assign(n,e??_v())}function Oh(n,e){Object.assign(n,e)}function lR(n){const e=gv(n);for(const t of n.frames)e.applyFrame(t);return n}function gv(n){const e=rR(n.events.timeline??[]);let t=0;const i=new Map,a=Fh(),s=Fh();return{applyFrame(r){for(;t<e.length&&e[t].time<=r.time;){const o=e[t];if(o.player_id!=null){const l=Dh(o.player_id),c=i.get(l)??_v();i.set(l,c),o.kind==="Kill"?(c.demos_inflicted+=1,o.is_team_0===!0?a.demos_inflicted+=1:o.is_team_0===!1&&(s.demos_inflicted+=1)):o.kind==="Death"&&(c.demos_taken+=1)}t+=1}Oh(r.team_zero.demo,a),Oh(r.team_one.demo,s);for(const o of r.players)oR(o.demo,i.get(Dh(o.player_id)))}}}function Uc(n){if(!n||typeof n!="object")return String(n);const[e,t]=Object.entries(n)[0]??["Unknown","unknown"];return`${e}:${typeof t=="string"?t:JSON.stringify(t)}`}function Uh(){return{count:0,wins:0,losses:0,neutral_outcomes:0,kickoff_count:0,kickoff_wins:0,kickoff_losses:0,kickoff_neutral_outcomes:0,possession_after_count:0,opponent_possession_after_count:0,neutral_possession_after_count:0,kickoff_possession_after_count:0,kickoff_opponent_possession_after_count:0,kickoff_neutral_possession_after_count:0}}function md(){return{count:0,wins:0,losses:0,neutral_outcomes:0,kickoff_count:0,kickoff_wins:0,kickoff_losses:0,kickoff_neutral_outcomes:0,possession_after_count:0,kickoff_possession_after_count:0}}function cR(n){return n.map((e,t)=>({event:e,index:t})).sort((e,t)=>e.event.resolve_frame!==t.event.resolve_frame?e.event.resolve_frame-t.event.resolve_frame:e.event.resolve_time!==t.event.resolve_time?e.event.resolve_time-t.event.resolve_time:e.index-t.index).map(({event:e})=>e)}function uR(n){return{key:"phase",value:n?"kickoff":"open_play"}}function dR(n,e){return e==null?{key:"outcome",value:"neutral"}:{key:"outcome",value:e===n?"win":"loss"}}function fR(n,e){return e==null?{key:"possession_after",value:"neutral"}:{key:"possession_after",value:e===n?"self":"opponent"}}function pR(n,e){return{key:"dodge_state",value:(n?e.team_zero_dodge_contact:e.team_one_dodge_contact)?"dodge":"no_dodge"}}function _d(n){return`${n.key}\0${n.value}`}function vo(n){return n.map(_d).join("")}function hR(n,e){e.sort((a,s)=>_d(a).localeCompare(_d(s)));const t=n.labeled_event_counts??={entries:[]},i=t.entries.find(a=>vo(a.labels)===vo(e));i?i.count+=1:(t.entries.push({labels:[...e],count:1}),t.entries.sort((a,s)=>vo(a.labels).localeCompare(vo(s.labels))))}function mR(n){return{entries:n.entries.map(e=>({labels:e.labels.map(t=>({...t})),count:e.count}))}}function Bh(n,e,t){n.count+=1,t.winning_team_is_team_0==null?n.neutral_outcomes+=1:t.winning_team_is_team_0===e?n.wins+=1:n.losses+=1,t.possession_team_is_team_0==null?n.neutral_possession_after_count+=1:t.possession_team_is_team_0===e?n.possession_after_count+=1:n.opponent_possession_after_count+=1,t.is_kickoff&&(n.kickoff_count+=1,t.winning_team_is_team_0==null?n.kickoff_neutral_outcomes+=1:t.winning_team_is_team_0===e?n.kickoff_wins+=1:n.kickoff_losses+=1,t.possession_team_is_team_0==null?n.kickoff_neutral_possession_after_count+=1:t.possession_team_is_team_0===e?n.kickoff_possession_after_count+=1:n.kickoff_opponent_possession_after_count+=1)}function zh(n,e,t){hR(n,[uR(t.is_kickoff),dR(e,t.winning_team_is_team_0),fR(e,t.possession_team_is_team_0),pR(e,t)]),n.count+=1,t.winning_team_is_team_0==null?n.neutral_outcomes+=1:t.winning_team_is_team_0===e?n.wins+=1:n.losses+=1,t.possession_team_is_team_0===e&&(n.possession_after_count+=1),t.is_kickoff&&(n.kickoff_count+=1,t.winning_team_is_team_0==null?n.kickoff_neutral_outcomes+=1:t.winning_team_is_team_0===e?n.kickoff_wins+=1:n.kickoff_losses+=1,t.possession_team_is_team_0===e&&(n.kickoff_possession_after_count+=1))}function _R(n,e){Object.assign(n,e??md()),e?.labeled_event_counts?n.labeled_event_counts=mR(e.labeled_event_counts):delete n.labeled_event_counts}function Hh(n,e){Object.assign(n,e)}function gR(n){const e=vv(n);for(const t of n.frames)e.applyFrame(t);return n}function vv(n){const e=cR(n.events.fifty_fifty??[]);let t=0;const i=Uh(),a=Uh(),s=new Map;return{applyFrame(r){for(;t<e.length&&e[t].resolve_frame<=r.frame_number;){const o=e[t];if(Bh(i,!0,o),Bh(a,!1,o),o.team_zero_player!=null){const l=Uc(o.team_zero_player),c=s.get(l)??md();s.set(l,c),zh(c,!0,o)}if(o.team_one_player!=null){const l=Uc(o.team_one_player),c=s.get(l)??md();s.set(l,c),zh(c,!1,o)}t+=1}Hh(r.team_zero.fifty_fifty,i),Hh(r.team_one.fifty_fifty,a);for(const o of r.players)_R(o.fifty_fifty,s.get(Uc(o.player_id)))}}}const vR=.8;function is(n){return Math.fround(n)}function Bc(n,e){return is(is(n)+is(e))}function yv(n,e){return is(is(n)-is(e))}function Vh(n){if(!n||typeof n!="object")return String(n);const[e,t]=Object.entries(n)[0]??["Unknown","unknown"];return`${e}:${typeof t=="string"?t:JSON.stringify(t)}`}function bv(){return{count:0,high_confidence_count:0,is_last_flick:!1,last_flick_time:null,last_flick_frame:null,time_since_last_flick:null,frames_since_last_flick:null,last_confidence:null,best_confidence:0,cumulative_confidence:0,cumulative_setup_duration:0,cumulative_ball_speed_change:0}}function yR(n){return n.map((e,t)=>({event:e,index:t})).sort((e,t)=>{const i=e.event.sample_frame??e.event.frame,a=t.event.sample_frame??t.event.frame;if(i!==a)return i-a;const s=e.event.sample_time??e.event.time,r=t.event.sample_time??t.event.time;return s!==r?s-r:e.event.time!==t.event.time?e.event.time-t.event.time:e.index-t.index}).map(({event:e})=>e)}function gd(n){return`${n.key}\0${n.value}`}function yo(n){return n.map(gd).join("")}function bR(n,e){e.sort((a,s)=>gd(a).localeCompare(gd(s)));const t=n.labeled_event_counts??={entries:[]},i=t.entries.find(a=>yo(a.labels)===yo(e));i?i.count+=1:(t.entries.push({labels:[...e],count:1}),t.entries.sort((a,s)=>yo(a.labels).localeCompare(yo(s.labels))))}function SR(n,e){return n.labeled_event_counts?.entries.filter(t=>t.labels.some(i=>i.key==="confidence_band"&&i.value===e)).reduce((t,i)=>t+i.count,0)??0}function xR(n){return n.labeled_event_counts?.entries.reduce((e,t)=>e+t.count,0)??0}function wR(n){return{entries:n.entries.map(e=>({labels:e.labels.map(t=>({...t})),count:e.count}))}}function ER(n,e,t,i){n.is_last_flick=i,n.time_since_last_flick=n.last_flick_time==null?null:Math.max(0,yv(t,n.last_flick_time)),n.frames_since_last_flick=n.last_flick_frame==null?null:Math.max(0,e-n.last_flick_frame)}function MR(n,e,t,i){bR(n,[{key:"confidence_band",value:e.confidence>=vR?"high":"standard"}]),n.count=xR(n),n.high_confidence_count=SR(n,"high"),n.is_last_flick=!0,n.last_flick_time=e.time,n.last_flick_frame=e.frame,n.time_since_last_flick=Math.max(0,yv(i,e.time)),n.frames_since_last_flick=Math.max(0,t-e.frame),n.last_confidence=e.confidence,n.best_confidence=Math.max(n.best_confidence,e.confidence),n.cumulative_confidence=Bc(n.cumulative_confidence,e.confidence),n.cumulative_setup_duration=Bc(n.cumulative_setup_duration,e.setup_duration),n.cumulative_ball_speed_change=Bc(n.cumulative_ball_speed_change,e.ball_speed_change)}function TR(n,e){Object.assign(n,e??bv()),e?.labeled_event_counts?n.labeled_event_counts=wR(e.labeled_event_counts):delete n.labeled_event_counts}function CR(n){const e=Sv(n);for(const t of n.frames)e.applyFrame(t);return n}function Sv(n){const e=yR(n.events.flick??[]);let t=0,i=null;const a=new Map;return{applyFrame(s){if(s.is_live_play){for(const[r,o]of a)ER(o,s.frame_number,s.time,r===i);for(;t<e.length&&(e[t].sample_frame??e[t].frame)<=s.frame_number;){const r=e[t],o=Vh(r.player),l=a.get(o)??bv();a.set(o,l),MR(l,r,s.frame_number,s.time),i=o,t+=1}if(i!=null){const r=a.get(i);r&&(r.is_last_flick=!0)}}else i=null;for(const r of s.players)TR(r.flick,a.get(Vh(r.player_id)))}}}function as(n){return Math.fround(n)}function xv(n,e){return as(as(n)+as(e))}function wv(n,e){return as(as(n)-as(e))}function Gh(n){if(!n||typeof n!="object")return String(n);const[e,t]=Object.entries(n)[0]??["Unknown","unknown"];return`${e}:${typeof t=="string"?t:JSON.stringify(t)}`}function Ev(){return{count:0,total_ball_speed:0,fastest_ball_speed:0,is_last_half_volley:!1,last_half_volley_time:null,last_half_volley_frame:null,time_since_last_half_volley:null,frames_since_last_half_volley:null}}function AR(n){return n.map((e,t)=>({event:e,index:t})).sort((e,t)=>{const i=e.event.sample_frame??e.event.frame,a=t.event.sample_frame??t.event.frame;if(i!==a)return i-a;const s=e.event.sample_time??e.event.time,r=t.event.sample_time??t.event.time;return s!==r?s-r:e.event.time!==t.event.time?e.event.time-t.event.time:e.index-t.index}).map(({event:e})=>e)}function RR(n,e,t,i){n.is_last_half_volley=i,n.time_since_last_half_volley=n.last_half_volley_time==null?null:Math.max(0,wv(t,n.last_half_volley_time)),n.frames_since_last_half_volley=n.last_half_volley_frame==null?null:Math.max(0,e-n.last_half_volley_frame)}function PR(n,e,t,i){n.count+=1,n.total_ball_speed=xv(n.total_ball_speed,e.ball_speed),n.fastest_ball_speed=Math.max(n.fastest_ball_speed,e.ball_speed),n.last_half_volley_time=e.time,n.last_half_volley_frame=e.frame,n.time_since_last_half_volley=Math.max(0,wv(i,e.time)),n.frames_since_last_half_volley=Math.max(0,t-e.frame)}function LR(n,e){Object.assign(n,e??Ev())}function $h(n,e){Object.assign(n,e)}function NR(n){const e=Mv(n);for(const t of n.frames)e.applyFrame(t);return n}function Mv(n){const e=AR(n.events.half_volley??[]);let t=0,i=null;const a=new Map,s={count:0,total_ball_speed:0,fastest_ball_speed:0},r={count:0,total_ball_speed:0,fastest_ball_speed:0};return{applyFrame(o){for(const[l,c]of a)RR(c,o.frame_number,o.time,o.is_live_play&&l===i);if(!o.is_live_play)i=null;else{let l=!1;for(;t<e.length&&(e[t].sample_frame??e[t].frame)<=o.frame_number;){const c=e[t],u=Gh(c.player),d=a.get(u)??Ev();a.set(u,d),PR(d,c,o.frame_number,o.time);const f=c.is_team_0?s:r;f.count+=1,f.total_ball_speed=xv(f.total_ball_speed,c.ball_speed),f.fastest_ball_speed=Math.max(f.fastest_ball_speed,c.ball_speed),i=u,l=!0,t+=1}if(l)for(const c of a.values())c.is_last_half_volley=!1;if(i!=null){const c=a.get(i);c&&(c.is_last_half_volley=!0)}}$h(o.team_zero.half_volley,s),$h(o.team_one.half_volley,r);for(const l of o.players)LR(l.half_volley,a.get(Gh(l.player_id)))}}}const IR=.75,kR=.78,DR=.75;function kn(n){if(!n||typeof n!="object")return String(n);const[e,t]=Object.entries(n)[0]??["Unknown","unknown"];return`${e}:${typeof t=="string"?t:JSON.stringify(t)}`}function Wh(n){return[...n].sort((e,t)=>e.frame!==t.frame?e.frame-t.frame:e.time!==t.time?e.time-t.time:kn(e.player).localeCompare(kn(t.player)))}function FR(n){return[...n].sort((e,t)=>e.resolved_frame!==t.resolved_frame?e.resolved_frame-t.resolved_frame:e.resolved_time!==t.resolved_time?e.resolved_time-t.resolved_time:e.frame!==t.frame?e.frame-t.frame:e.time!==t.time?e.time-t.time:kn(e.player).localeCompare(kn(t.player)))}function zc(){return{count:0,highConfidenceCount:0,lastTime:null,lastFrame:null,lastResolvedTime:null,lastResolvedFrame:null,lastQuality:null,bestQuality:0,cumulativeQuality:0,labeledCounts:{entries:[]}}}function ss(n){return Math.fround(n)}function OR(n,e){return ss(ss(n)+ss(e))}function UR(n,e){return{key:"confidence_band",value:n>=e?"high":"standard"}}function BR(n,e){const t=e.sort((a,s)=>a.key===s.key?a.value.localeCompare(s.value):a.key.localeCompare(s.key)),i=n.entries.find(a=>a.labels.length===t.length&&a.labels.every((s,r)=>s.key===t[r]?.key&&s.value===t[r]?.value));if(i){i.count+=1;return}n.entries.push({labels:t,count:1}),n.entries.sort((a,s)=>JSON.stringify(a.labels).localeCompare(JSON.stringify(s.labels)))}function xs(n){return{entries:n.entries.map(e=>({labels:e.labels.map(t=>({...t})),count:e.count}))}}function Hc(n,e,t,i,a){n.count+=1,e.confidence>=a&&(n.highConfidenceCount+=1),BR(n.labeledCounts,[UR(e.confidence,a)]),n.lastTime=e.time,n.lastFrame=e.frame,n.lastResolvedTime=i,n.lastResolvedFrame=t,n.lastQuality=e.confidence,n.bestQuality=Math.max(n.bestQuality,e.confidence),n.cumulativeQuality=OR(n.cumulativeQuality,e.confidence)}function bf(n,e){return n?.lastTime==null?null:n.lastResolvedFrame===e.frame_number?0:Math.max(0,ss(ss(e.time)-ss(n.lastTime)))}function Sf(n,e){return n?.lastFrame==null?null:n.lastResolvedFrame===e.frame_number?0:Math.max(0,e.frame_number-n.lastFrame)}function Tv(n,e,t,i){n.count=e?.count??0,n.high_confidence_count=e?.highConfidenceCount??0,n.is_last_speed_flip=i,n.last_speed_flip_time=e?.lastTime??null,n.last_speed_flip_frame=e?.lastFrame??null,n.time_since_last_speed_flip=bf(e,t),n.frames_since_last_speed_flip=Sf(e,t),n.last_quality=e?.lastQuality??null,n.best_quality=e?.bestQuality??0,n.cumulative_quality=e?.cumulativeQuality??0,e?.labeledCounts.entries.length?n.labeled_event_counts=xs(e.labeledCounts):delete n.labeled_event_counts}function Cv(n,e,t,i){n.count=e?.count??0,n.high_confidence_count=e?.highConfidenceCount??0,n.is_last_half_flip=i,n.last_half_flip_time=e?.lastTime??null,n.last_half_flip_frame=e?.lastFrame??null,n.time_since_last_half_flip=bf(e,t),n.frames_since_last_half_flip=Sf(e,t),n.last_quality=e?.lastQuality??null,n.best_quality=e?.bestQuality??0,n.cumulative_quality=e?.cumulativeQuality??0,e?.labeledCounts.entries.length?n.labeled_event_counts=xs(e.labeledCounts):delete n.labeled_event_counts}function Av(n,e,t,i){n.count=e?.count??0,n.high_confidence_count=e?.highConfidenceCount??0,n.is_last_wavedash=i,n.last_wavedash_time=e?.lastTime??null,n.last_wavedash_frame=e?.lastFrame??null,n.time_since_last_wavedash=bf(e,t),n.frames_since_last_wavedash=Sf(e,t),n.last_quality=e?.lastQuality??null,n.best_quality=e?.bestQuality??0,n.cumulative_quality=e?.cumulativeQuality??0,e?.labeledCounts.entries.length?n.labeled_event_counts=xs(e.labeledCounts):delete n.labeled_event_counts}function zR(n){const e={...n};return n.labeled_event_counts?e.labeled_event_counts=xs(n.labeled_event_counts):delete e.labeled_event_counts,e}function HR(n){const e={...n};return n.labeled_event_counts?e.labeled_event_counts=xs(n.labeled_event_counts):delete e.labeled_event_counts,e}function VR(n){const e={...n};return n.labeled_event_counts?e.labeled_event_counts=xs(n.labeled_event_counts):delete e.labeled_event_counts,e}function GR(n,e){if(e){Object.assign(n,e);return}Tv(n,void 0,{frame_number:0,time:0},!1)}function $R(n,e){if(e){Object.assign(n,e);return}Cv(n,void 0,{frame_number:0,time:0},!1)}function WR(n,e){if(e){Object.assign(n,e);return}Av(n,void 0,{frame_number:0,time:0},!1)}function XR(n){return n.is_live_play||n.ball_has_been_hit===!1}function qR(n){const e=Rv(n);for(const t of n.frames)e.applyFrame(t);return n}function Rv(n){const e=FR(n.events.speed_flip??[]),t=Wh(n.events.half_flip??[]),i=Wh(n.events.wavedash??[]);let a=0,s=0,r=0,o=null,l=null,c=null;const u=new Map,d=new Map,f=new Map,p=new Map,_=new Map,g=new Map;return{applyFrame(m){if(XR(m)){for(;a<e.length&&e[a].resolved_frame<=m.frame_number;){const h=e[a],y=kn(h.player),x=u.get(y)??zc();u.set(y,x),Hc(x,h,h.resolved_frame,h.resolved_time,IR),o=y,a+=1}for(const h of m.players){const y=kn(h.player_id);Tv(h.speed_flip,u.get(y),m,y===o),p.set(y,zR(h.speed_flip))}}else for(const h of m.players){const y=kn(h.player_id);GR(h.speed_flip,p.get(y))}if(m.is_live_play){for(;s<t.length&&t[s].frame<=m.frame_number;){const h=t[s],y=kn(h.player),x=d.get(y)??zc();d.set(y,x),Hc(x,h,h.frame,h.time,kR),l=y,s+=1}for(;r<i.length&&i[r].frame<=m.frame_number;){const h=i[r],y=kn(h.player),x=f.get(y)??zc();f.set(y,x),Hc(x,h,h.frame,h.time,DR),c=y,r+=1}for(const h of m.players){const y=kn(h.player_id);Cv(h.half_flip,d.get(y),m,y===l),_.set(y,HR(h.half_flip)),Av(h.wavedash,f.get(y),m,y===c),g.set(y,VR(h.wavedash))}}else{for(const h of m.players){const y=kn(h.player_id);$R(h.half_flip,_.get(y)),WR(h.wavedash,g.get(y))}l=null,c=null}}}}const KR=["boost","slow","supersonic"],YR=["ground","high_air","low_air"];function Ui(n){return Math.fround(n)}function $n(n,e){return Ui(Ui(n)+Ui(e))}function jR(n,e){return Ui(Ui(n)*Ui(e))}function Xh(n){if(!n||typeof n!="object")return String(n);const[e,t]=Object.entries(n)[0]??["Unknown","unknown"];return`${e}:${typeof t=="string"?t:JSON.stringify(t)}`}function ZR(){return{entries:YR.flatMap(n=>KR.map(e=>({labels:[{key:"height_band",value:n},{key:"speed_band",value:e}],value:0}))).sort((n,e)=>JSON.stringify(n.labels).localeCompare(JSON.stringify(e.labels)))}}function $o(n=!1){return{tracked_time:0,total_distance:0,speed_integral:0,time_slow_speed:0,time_boost_speed:0,time_supersonic_speed:0,time_on_ground:0,time_low_air:0,time_high_air:0,labeled_tracked_time:n?ZR():{entries:[]}}}function JR(n){return n.map((e,t)=>({event:e,index:t})).sort((e,t)=>e.event.frame!==t.event.frame?e.event.frame-t.event.frame:e.event.time!==t.event.time?e.event.time-t.event.time:e.index-t.index).map(({event:e})=>e)}function QR(n){return n.sort((e,t)=>e.key===t.key?e.value.localeCompare(t.value):e.key.localeCompare(t.key))}function eP(n,e,t){const i=QR(e),a=n.entries.find(s=>s.labels.length===i.length&&s.labels.every((r,o)=>r.key===i[o]?.key&&r.value===i[o]?.value));a?a.value=$n(a.value,t):(n.entries.push({labels:i,value:Ui(t)}),n.entries.sort((s,r)=>JSON.stringify(s.labels).localeCompare(JSON.stringify(r.labels))))}function tP(n){return{entries:n.entries.map(e=>({labels:e.labels.map(t=>({...t})),value:e.value}))}}function qh(n,e){const t=Ui(e.dt);n.tracked_time=$n(n.tracked_time,t),n.total_distance=$n(n.total_distance,e.distance),n.speed_integral=$n(n.speed_integral,jR(e.speed,t)),e.speed_band==="slow"?n.time_slow_speed=$n(n.time_slow_speed,t):e.speed_band==="boost"?n.time_boost_speed=$n(n.time_boost_speed,t):e.speed_band==="supersonic"&&(n.time_supersonic_speed=$n(n.time_supersonic_speed,t)),e.height_band==="ground"?n.time_on_ground=$n(n.time_on_ground,t):e.height_band==="low_air"?n.time_low_air=$n(n.time_low_air,t):e.height_band==="high_air"&&(n.time_high_air=$n(n.time_high_air,t));const i=n.labeled_tracked_time??{entries:[]};n.labeled_tracked_time=i,eP(i,[{key:"speed_band",value:e.speed_band},{key:"height_band",value:e.height_band}],t)}function Vc(n,e){const t=e??$o(!0),i=t.labeled_tracked_time;Object.assign(n,t,{labeled_tracked_time:i?tP(i):void 0}),i?.entries.length||delete n.labeled_tracked_time}function nP(n){const e=Pv(n);for(const t of n.frames)e.applyFrame(t);return n}function Pv(n){const e=JR(n.events.movement??[]);let t=0;const i=new Map,a=$o(),s=$o();return{applyFrame(r){for(;t<e.length&&e[t].frame<=r.frame_number;){const o=e[t],l=Xh(o.player),c=i.get(l)??$o(!0);i.set(l,c),qh(c,o),qh(o.is_team_0?a:s,o),t+=1}Vc(r.team_zero.movement,a),Vc(r.team_one.movement,s);for(const o of r.players)Vc(o.movement,i.get(Xh(o.player_id)))}}}const iP=.8;function rs(n){return Math.fround(n)}function aP(n,e){return rs(rs(n)+rs(e))}function Lv(n,e){return rs(rs(n)-rs(e))}function Kh(n){if(!n||typeof n!="object")return String(n);const[e,t]=Object.entries(n)[0]??["Unknown","unknown"];return`${e}:${typeof t=="string"?t:JSON.stringify(t)}`}function Nv(){return{count:0,aerial_count:0,high_confidence_count:0,is_last_musty:!1,last_musty_time:null,last_musty_frame:null,time_since_last_musty:null,frames_since_last_musty:null,last_confidence:null,best_confidence:0,cumulative_confidence:0}}function sP(n){return n.map((e,t)=>({event:e,index:t})).sort((e,t)=>{const i=e.event.sample_frame??e.event.frame,a=t.event.sample_frame??t.event.frame;if(i!==a)return i-a;const s=e.event.sample_time??e.event.time,r=t.event.sample_time??t.event.time;return s!==r?s-r:e.index-t.index}).map(({event:e})=>e)}function vd(n){return`${n.key}\0${n.value}`}function bo(n){return n.map(vd).join("")}function rP(n,e){e.sort((a,s)=>vd(a).localeCompare(vd(s)));const t=n.labeled_event_counts??={entries:[]},i=t.entries.find(a=>bo(a.labels)===bo(e));i?i.count+=1:(t.entries.push({labels:[...e],count:1}),t.entries.sort((a,s)=>bo(a.labels).localeCompare(bo(s.labels))))}function Yh(n,e,t){return n.labeled_event_counts?.entries.filter(i=>i.labels.some(a=>a.key===e&&a.value===t)).reduce((i,a)=>i+a.count,0)??0}function oP(n){return n.labeled_event_counts?.entries.reduce((e,t)=>e+t.count,0)??0}function lP(n){return{entries:n.entries.map(e=>({labels:e.labels.map(t=>({...t})),count:e.count}))}}function cP(n,e,t,i){n.is_last_musty=i,n.time_since_last_musty=n.last_musty_time==null?null:Math.max(0,Lv(t,n.last_musty_time)),n.frames_since_last_musty=n.last_musty_frame==null?null:Math.max(0,e-n.last_musty_frame)}function uP(n,e,t,i){rP(n,[{key:"vertical_state",value:e.aerial?"aerial":"grounded"},{key:"confidence_band",value:e.confidence>=iP?"high":"standard"}]),n.count=oP(n),n.aerial_count=Yh(n,"vertical_state","aerial"),n.high_confidence_count=Yh(n,"confidence_band","high"),n.is_last_musty=!0,n.last_musty_time=e.time,n.last_musty_frame=e.frame,n.time_since_last_musty=Math.max(0,Lv(i,e.time)),n.frames_since_last_musty=Math.max(0,t-e.frame),n.last_confidence=e.confidence,n.best_confidence=Math.max(n.best_confidence,e.confidence),n.cumulative_confidence=aP(n.cumulative_confidence,e.confidence)}function dP(n,e){Object.assign(n,e??Nv()),e?.labeled_event_counts?n.labeled_event_counts=lP(e.labeled_event_counts):delete n.labeled_event_counts}function fP(n){const e=Iv(n);for(const t of n.frames)e.applyFrame(t);return n}function Iv(n){const e=sP(n.events.musty_flick??[]);let t=0,i=null;const a=new Map;return{applyFrame(s){if(s.is_live_play){for(const[o,l]of a)cP(l,s.frame_number,s.time,i===o);let r=!1;for(;t<e.length&&(e[t].sample_frame??e[t].frame)<=s.frame_number;){const o=e[t],l=Kh(o.player),c=a.get(l)??Nv();a.set(l,c),uP(c,o,s.frame_number,s.time),i=l,t+=1,r=!0}if(r)for(const o of a.values())o.is_last_musty=!1;if(i!=null){const o=a.get(i);o&&(o.is_last_musty=!0)}}else i=null;for(const r of s.players)dP(r.musty_flick,a.get(Kh(r.player_id)))}}}function jh(n){if(!n||typeof n!="object")return String(n);const[e,t]=Object.entries(n)[0]??["Unknown","unknown"];return`${e}:${typeof t=="string"?t:JSON.stringify(t)}`}function kv(){return{count:0,total_ball_speed:0,fastest_ball_speed:0,total_pass_distance:0,is_last_one_timer:!1,last_one_timer_time:null,last_one_timer_frame:null,time_since_last_one_timer:null,frames_since_last_one_timer:null}}function pP(n){return n.map((e,t)=>({event:e,index:t})).sort((e,t)=>e.event.frame!==t.event.frame?e.event.frame-t.event.frame:e.event.time!==t.event.time?e.event.time-t.event.time:e.index-t.index).map(({event:e})=>e)}function hP(n,e,t,i){n.is_last_one_timer=i,n.time_since_last_one_timer=n.last_one_timer_time==null?null:Math.max(0,t-n.last_one_timer_time),n.frames_since_last_one_timer=n.last_one_timer_frame==null?null:Math.max(0,e-n.last_one_timer_frame)}function mP(n,e,t,i){n.count+=1,n.total_ball_speed+=e.ball_speed,n.fastest_ball_speed=Math.max(n.fastest_ball_speed,e.ball_speed),n.total_pass_distance+=e.pass_travel_distance,n.last_one_timer_time=e.time,n.last_one_timer_frame=e.frame,n.time_since_last_one_timer=Math.max(0,i-e.time),n.frames_since_last_one_timer=Math.max(0,t-e.frame)}function _P(n,e){Object.assign(n,e??kv())}function Zh(n,e){Object.assign(n,e)}function gP(n){const e=Dv(n);for(const t of n.frames)e.applyFrame(t);return n}function Dv(n){const e=pP(n.events.one_timer??[]);let t=0,i=null;const a=new Map,s={count:0,total_ball_speed:0,fastest_ball_speed:0},r={count:0,total_ball_speed:0,fastest_ball_speed:0};return{applyFrame(o){for(const[l,c]of a)hP(c,o.frame_number,o.time,o.is_live_play&&l===i);if(!o.is_live_play)i=null;else{let l=!1;for(;t<e.length&&e[t].frame<=o.frame_number;){const c=e[t],u=jh(c.player),d=a.get(u)??kv();a.set(u,d),mP(d,c,o.frame_number,o.time);const f=c.is_team_0?s:r;f.count+=1,f.total_ball_speed+=c.ball_speed,f.fastest_ball_speed=Math.max(f.fastest_ball_speed,c.ball_speed),i=u,l=!0,t+=1}if(l)for(const c of a.values())c.is_last_one_timer=!1;if(i!=null){const c=a.get(i);c&&(c.is_last_one_timer=!0)}}Zh(o.team_zero.one_timer,s),Zh(o.team_one.one_timer,r);for(const l of o.players)_P(l.one_timer,a.get(jh(l.player_id)))}}}function So(n){if(!n||typeof n!="object")return String(n);const[e,t]=Object.entries(n)[0]??["Unknown","unknown"];return`${e}:${typeof t=="string"?t:JSON.stringify(t)}`}function yd(){return{completed_pass_count:0,received_pass_count:0,total_pass_distance:0,total_pass_advance:0,longest_pass_distance:0,is_last_completed_pass:!1,last_completed_pass_time:null,last_completed_pass_frame:null,time_since_last_completed_pass:null,frames_since_last_completed_pass:null}}function vP(n){return n.map((e,t)=>({event:e,index:t})).sort((e,t)=>{const i=e.event.sample_frame??e.event.frame,a=t.event.sample_frame??t.event.frame;if(i!==a)return i-a;const s=e.event.sample_time??e.event.time,r=t.event.sample_time??t.event.time;return s!==r?s-r:e.index-t.index}).map(({event:e})=>e)}function yP(n){return n.map((e,t)=>({event:e,index:t})).sort((e,t)=>e.event.frame!==t.event.frame?e.event.frame-t.event.frame:e.event.time!==t.event.time?e.event.time-t.event.time:e.index-t.index).map(({event:e})=>e)}function bP(n,e,t,i){n.is_last_completed_pass=i,n.time_since_last_completed_pass=n.last_completed_pass_time==null?null:Math.max(0,t-n.last_completed_pass_time),n.frames_since_last_completed_pass=n.last_completed_pass_frame==null?null:Math.max(0,e-n.last_completed_pass_frame)}function SP(n,e,t,i){n.completed_pass_count+=1,n.total_pass_distance+=e.ball_travel_distance,n.total_pass_advance+=e.ball_advance_distance,n.longest_pass_distance=Math.max(n.longest_pass_distance,e.ball_travel_distance),n.last_completed_pass_time=e.time,n.last_completed_pass_frame=e.frame,n.time_since_last_completed_pass=Math.max(0,i-e.time),n.frames_since_last_completed_pass=Math.max(0,t-e.frame)}function xP(n,e){Object.assign(n,e??yd())}function Jh(n,e){Object.assign(n,e)}function wP(n){const e=Fv(n);for(const t of n.frames)e.applyFrame(t);return n}function Fv(n){const e=vP(n.events.pass??[]),t=yP(n.events.pass_last_completed??[]),i=t.length>0;let a=0,s=0,r=null;const o=new Map,l={completed_pass_count:0,total_pass_distance:0,total_pass_advance:0,longest_pass_distance:0},c={completed_pass_count:0,total_pass_distance:0,total_pass_advance:0,longest_pass_distance:0};return{applyFrame(u){for(const[f,p]of o)bP(p,u.frame_number,u.time,u.is_live_play&&f===r);if(!u.is_live_play)r=null;else{let f=!1;for(;a<e.length&&(e[a].sample_frame??e[a].frame)<=u.frame_number;){const p=e[a],_=So(p.passer),g=o.get(_)??yd();o.set(_,g),SP(g,p,u.frame_number,u.time);const m=So(p.receiver),h=o.get(m)??yd();o.set(m,h),h.received_pass_count+=1;const y=p.is_team_0?l:c;y.completed_pass_count+=1,y.total_pass_distance+=p.ball_travel_distance,y.total_pass_advance+=p.ball_advance_distance,y.longest_pass_distance=Math.max(y.longest_pass_distance,p.ball_travel_distance),r=_,f=!0,a+=1}if(!i&&f)for(const p of o.values())p.is_last_completed_pass=!1;if(!i&&r!=null){const p=o.get(r);p&&(p.is_last_completed_pass=!0)}}let d=!1;for(;s<t.length&&t[s].frame<=u.frame_number;){const f=t[s];r=f.player==null?null:So(f.player),s+=1,d=!0}if(d){for(const f of o.values())f.is_last_completed_pass=!1;if(r!=null){const f=o.get(r);f&&(f.is_last_completed_pass=!0)}}Jh(u.team_zero.pass,l),Jh(u.team_one.pass,c);for(const f of u.players)xP(f.pass,o.get(So(f.player_id)))}}}function Qs(n){return Math.fround(n)}function Vs(n,e){return Qs(Qs(n)+Qs(e))}function EP(){return{tracked_time:0,team_zero_time:0,team_one_time:0,neutral_time:0,labeled_time:{entries:[]}}}function MP(){return{tracked_time:0,possession_time:0,opponent_possession_time:0,neutral_time:0,labeled_time:{entries:[]}}}function TP(n){return n.map((e,t)=>({event:e,index:t})).sort((e,t)=>e.event.frame!==t.event.frame?e.event.frame-t.event.frame:e.event.time!==t.event.time?e.event.time-t.event.time:e.index-t.index).map(({event:e})=>e)}function CP(n){return n.sort((e,t)=>e.key===t.key?e.value.localeCompare(t.value):e.key.localeCompare(t.key))}function Ov(n,e,t){const i=CP(e),a=n.entries.find(s=>s.labels.length===i.length&&s.labels.every((r,o)=>r.key===i[o]?.key&&r.value===i[o]?.value));a?a.value=Vs(a.value,t):(n.entries.push({labels:i,value:Qs(t)}),n.entries.sort((s,r)=>JSON.stringify(s.labels).localeCompare(JSON.stringify(r.labels))))}function AP(n,e){return n.key==="possession_state"&&n.value==="team_zero"?{key:"possession_state",value:e?"own":"opponent"}:n.key==="possession_state"&&n.value==="team_one"?{key:"possession_state",value:e?"opponent":"own"}:n.key==="field_third"&&n.value==="team_zero_third"?{key:"field_third",value:e?"defensive_third":"offensive_third"}:n.key==="field_third"&&n.value==="team_one_third"?{key:"field_third",value:e?"offensive_third":"defensive_third"}:{...n}}function Qh(n,e){const t={entries:[]};for(const i of n.labeled_time.entries)Ov(t,i.labels.map(a=>AP(a,e)),i.value);return{tracked_time:n.tracked_time,possession_time:e?n.team_zero_time:n.team_one_time,opponent_possession_time:e?n.team_one_time:n.team_zero_time,neutral_time:n.neutral_time,labeled_time:t}}function RP(n,e){n.active=e.active,n.possessionState=e.possession_state,n.fieldThird=e.field_third??null}function PP(n,e,t){if(!e.active)return;const i=Qs(t.dt);n.tracked_time=Vs(n.tracked_time,i),e.possessionState==="team_zero"?n.team_zero_time=Vs(n.team_zero_time,i):e.possessionState==="team_one"?n.team_one_time=Vs(n.team_one_time,i):n.neutral_time=Vs(n.neutral_time,i);const a=[{key:"possession_state",value:e.possessionState}];e.fieldThird!=null&&a.push({key:"field_third",value:e.fieldThird}),Ov(n.labeled_time,a,i)}function em(n,e){Object.assign(n,e??MP())}function LP(n){const e=Uv(n);for(const t of n.frames)e.applyFrame(t);return n}function Uv(n){const e=TP(n.events.possession??[]);let t=0;const i=EP(),a={active:!1,possessionState:"neutral",fieldThird:null};return{applyFrame(s){for(;t<e.length&&e[t].frame<=s.frame_number;)RP(a,e[t]),t+=1;PP(i,a,s),em(s.team_zero.possession,Qh(i,!0)),em(s.team_one.possession,Qh(i,!1))}}}function gt(n,e){return Math.fround(Math.fround(n)+Math.fround(e))}function tm(n){if(!n||typeof n!="object")return String(n);const[e,t]=Object.entries(n)[0]??["Unknown","unknown"];return`${e}:${typeof t=="string"?t:JSON.stringify(t)}`}function Bv(){return{active_game_time:0,tracked_time:0,sum_distance_to_teammates:0,sum_distance_to_ball:0,sum_distance_to_ball_has_possession:0,time_has_possession:0,sum_distance_to_ball_no_possession:0,time_no_possession:0,time_demolished:0,time_no_teammates:0,time_most_back:0,time_most_forward:0,time_mid_role:0,time_other_role:0,time_defensive_third:0,time_neutral_third:0,time_offensive_third:0,time_defensive_half:0,time_offensive_half:0,time_closest_to_ball:0,time_farthest_from_ball:0,time_behind_ball:0,time_level_with_ball:0,time_in_front_of_ball:0,times_caught_ahead_of_play_on_conceded_goals:0}}function NP(n){return n.map((e,t)=>({event:e,index:t})).sort((e,t)=>e.event.frame!==t.event.frame?e.event.frame-t.event.frame:e.event.time!==t.event.time?e.event.time-t.event.time:e.index-t.index).map(({event:e})=>e)}function IP(n,e){if(e.active&&(n.active_game_time=gt(n.active_game_time,e.duration)),e.tracked){if(n.tracked_time=gt(n.tracked_time,e.duration),e.distance_to_teammates!=null&&(n.sum_distance_to_teammates=gt(n.sum_distance_to_teammates,e.distance_to_teammates*e.duration)),e.distance_to_ball!=null){const t=e.distance_to_ball*e.duration;n.sum_distance_to_ball=gt(n.sum_distance_to_ball,t),e.possession_state==="has_possession"?n.sum_distance_to_ball_has_possession=gt(n.sum_distance_to_ball_has_possession,t):e.possession_state==="no_possession"&&(n.sum_distance_to_ball_no_possession=gt(n.sum_distance_to_ball_no_possession,t))}switch(e.possession_state==="has_possession"?n.time_has_possession=gt(n.time_has_possession,e.duration):e.possession_state==="no_possession"&&(n.time_no_possession=gt(n.time_no_possession,e.duration)),e.teammate_role){case"no_teammates":n.time_no_teammates=gt(n.time_no_teammates,e.duration);break;case"most_back":n.time_most_back=gt(n.time_most_back,e.duration);break;case"most_forward":n.time_most_forward=gt(n.time_most_forward,e.duration);break;case"mid":n.time_mid_role=gt(n.time_mid_role,e.duration);break;case"other":n.time_other_role=gt(n.time_other_role,e.duration);break}n.time_defensive_third=gt(n.time_defensive_third,e.duration*e.defensive_zone_fraction),n.time_neutral_third=gt(n.time_neutral_third,e.duration*e.neutral_zone_fraction),n.time_offensive_third=gt(n.time_offensive_third,e.duration*e.offensive_zone_fraction),n.time_defensive_half=gt(n.time_defensive_half,e.duration*e.defensive_half_fraction),n.time_offensive_half=gt(n.time_offensive_half,e.duration*e.offensive_half_fraction),e.closest_to_ball&&(n.time_closest_to_ball=gt(n.time_closest_to_ball,e.duration)),e.farthest_from_ball&&(n.time_farthest_from_ball=gt(n.time_farthest_from_ball,e.duration)),n.time_behind_ball=gt(n.time_behind_ball,e.duration*e.behind_ball_fraction),n.time_level_with_ball=gt(n.time_level_with_ball,e.duration*e.level_with_ball_fraction),n.time_in_front_of_ball=gt(n.time_in_front_of_ball,e.duration*e.in_front_of_ball_fraction)}e.demolished&&(n.time_demolished=gt(n.time_demolished,e.duration)),e.caught_ahead_of_play_on_conceded_goal&&(n.times_caught_ahead_of_play_on_conceded_goals+=1)}function kP(n,e){Object.assign(n,e??Bv())}function DP(n){const e=zv(n);for(const t of n.frames)e.applyFrame(t);return n}function zv(n){const e=NP(n.events.positioning??[]);let t=0;const i=new Map;return{applyFrame(a){for(;t<e.length&&e[t].frame<=a.frame_number;){const s=e[t],r=tm(s.player),o=i.get(r)??Bv();i.set(r,o),IP(o,s),t+=1}for(const s of a.players)kP(s.positioning,i.get(tm(s.player_id)))}}}function Gc(n){if(!n||typeof n!="object")return String(n);const[e,t]=Object.entries(n)[0]??["Unknown","unknown"];return`${e}:${typeof t=="string"?t:JSON.stringify(t)}`}function Gs(){return{total_duration:0,press_count:0}}function FP(n){return n.map((e,t)=>({event:e,index:t})).sort((e,t)=>e.event.frame!==t.event.frame?e.event.frame-t.event.frame:e.event.time!==t.event.time?e.event.time-t.event.time:e.index-t.index).map(({event:e})=>e)}function OP(n){return n.gameplay_phase==="active_play"||n.gameplay_phase==="kickoff_waiting_for_touch"}function $c(n,e){Object.assign(n,e??Gs())}function UP(n){const e=Hv(n);for(const t of n.frames)e.applyFrame(t);return n}function Hv(n){const e=FP(n.events.powerslide??[]);let t=0;const i=new Map,a=new Map,s=Gs(),r=Gs();return{applyFrame(o){const l=OP(o);for(;t<e.length&&e[t].frame<=o.frame_number;){const c=e[t],u=Gc(c.player),d=i.get(u)?.active??!1;if(i.set(u,{active:c.active,isTeamZero:c.is_team_0}),l&&c.active&&!d){const f=a.get(u)??Gs();a.set(u,f),f.press_count+=1;const p=c.is_team_0?s:r;p.press_count+=1}t+=1}if(l)for(const c of o.players){const u=Gc(c.player_id);if(!i.get(u)?.active)continue;const f=a.get(u)??Gs();a.set(u,f),f.total_duration+=o.dt;const p=c.is_team_0?s:r;p.total_duration+=o.dt}$c(o.team_zero.powerslide,s),$c(o.team_one.powerslide,r);for(const c of o.players)$c(c.powerslide,a.get(Gc(c.player_id)))}}}function er(n){return Math.fround(n)}function $s(n,e){return er(er(n)+er(e))}function BP(){return{tracked_time:0,team_zero_side_time:0,team_one_side_time:0,neutral_time:0,labeled_time:{entries:[]}}}function zP(){return{tracked_time:0,defensive_half_time:0,offensive_half_time:0,neutral_time:0,labeled_time:{entries:[]}}}function HP(n){return n.map((e,t)=>({event:e,index:t})).sort((e,t)=>e.event.frame!==t.event.frame?e.event.frame-t.event.frame:e.event.time!==t.event.time?e.event.time-t.event.time:e.index-t.index).map(({event:e})=>e)}function VP(n){return n.sort((e,t)=>e.key===t.key?e.value.localeCompare(t.value):e.key.localeCompare(t.key))}function Vv(n,e,t){const i=VP(e),a=n.entries.find(s=>s.labels.length===i.length&&s.labels.every((r,o)=>r.key===i[o]?.key&&r.value===i[o]?.value));a?a.value=$s(a.value,t):(n.entries.push({labels:i,value:er(t)}),n.entries.sort((s,r)=>JSON.stringify(s.labels).localeCompare(JSON.stringify(r.labels))))}function GP(n,e){return n.key==="field_half"&&n.value==="team_zero_side"?{key:"field_half",value:e?"defensive_half":"offensive_half"}:n.key==="field_half"&&n.value==="team_one_side"?{key:"field_half",value:e?"offensive_half":"defensive_half"}:{...n}}function nm(n,e){const t={entries:[]};for(const i of n.labeled_time.entries)Vv(t,i.labels.map(a=>GP(a,e)),i.value);return{tracked_time:n.tracked_time,defensive_half_time:e?n.team_zero_side_time:n.team_one_side_time,offensive_half_time:e?n.team_one_side_time:n.team_zero_side_time,neutral_time:n.neutral_time,labeled_time:t}}function $P(n,e){n.active=e.active,n.fieldHalf=e.field_half}function WP(n,e,t){if(!e.active)return;const i=er(t.dt);n.tracked_time=$s(n.tracked_time,i),e.fieldHalf==="team_zero_side"?n.team_zero_side_time=$s(n.team_zero_side_time,i):e.fieldHalf==="team_one_side"?n.team_one_side_time=$s(n.team_one_side_time,i):n.neutral_time=$s(n.neutral_time,i),Vv(n.labeled_time,[{key:"field_half",value:e.fieldHalf}],i)}function im(n,e){Object.assign(n,e??zP())}function XP(n){const e=Gv(n);for(const t of n.frames)e.applyFrame(t);return n}function Gv(n){const e=HP(n.events.pressure??[]);let t=0;const i=BP(),a={active:!1,fieldHalf:"neutral"};return{applyFrame(s){for(;t<e.length&&e[t].frame<=s.frame_number;)$P(a,e[t]),t+=1;WP(i,a,s),im(s.team_zero.pressure,nm(i,!0)),im(s.team_one.pressure,nm(i,!1))}}}function Wo(n){return Math.fround(n)}function xo(n,e){return Wo(Wo(n)+Wo(e))}function am(){return{tracked_time:0,session_count:0,opponent_session_count:0,session_time:0,opponent_session_time:0,offensive_half_time:0,offensive_third_time:0,longest_session_time:0,opponent_longest_session_time:0,average_session_time:0}}function qP(n){return n.map((e,t)=>({event:e,index:t})).sort((e,t)=>e.event.end_frame!==t.event.end_frame?e.event.end_frame-t.event.end_frame:e.event.end_time!==t.event.end_time?e.event.end_time-t.event.end_time:e.index-t.index).map(({event:e})=>e)}function KP(n,e,t){n.session_count+=1,n.session_time=xo(n.session_time,t.duration),n.offensive_half_time=xo(n.offensive_half_time,t.offensive_half_time),n.offensive_third_time=xo(n.offensive_third_time,t.offensive_third_time),n.longest_session_time=Math.max(n.longest_session_time,t.duration),n.average_session_time=n.session_count===0?0:Wo(n.session_time/n.session_count),e.opponent_session_count+=1,e.opponent_session_time=xo(e.opponent_session_time,t.duration),e.opponent_longest_session_time=Math.max(e.opponent_longest_session_time,t.duration)}function sm(n,e){Object.assign(n,e)}function YP(n){const e=$v(n);for(const t of n.frames)e.applyFrame(t);return n}function $v(n){const e=qP(n.events.territorial_pressure??[]);let t=0;const i=am(),a=am();return{applyFrame(s){for(;t<e.length&&s.frame_number>=e[t].end_frame;){const r=e[t];KP(r.team_is_team_0?i:a,r.team_is_team_0?a:i,r),t+=1}sm(s.team_zero.territorial_pressure,i),sm(s.team_one.territorial_pressure,a)}}}function Ln(n,e){return Math.fround(Math.fround(n)+Math.fround(e))}function Wv(n){if(!n||typeof n!="object")return String(n);const[e,t]=Object.entries(n)[0]??["Unknown","unknown"];return`${e}:${typeof t=="string"?t:JSON.stringify(t)}`}function Xv(){return{active_game_time:0,tracked_time:0,time_first_man:0,time_second_man:0,time_third_man:0,time_ambiguous_role:0,time_behind_play:0,time_level_with_play:0,time_ahead_of_play:0,longest_first_man_stint_time:0,first_man_stint_count:0,became_first_man_count:0,lost_first_man_count:0,current_role_state:"unknown",current_depth_state:"unknown"}}function rm(){return{first_man_changes_for_team:0,rotation_count:0}}function om(n){return n.map((e,t)=>({event:e,index:t})).sort((e,t)=>e.event.frame!==t.event.frame?e.event.frame-t.event.frame:e.event.time!==t.event.time?e.event.time-t.event.time:e.index-t.index).map(({event:e})=>e)}function jP(n,e){n.active=e.active,e.active||(n.firstManStintActive=!1,n.currentFirstManStintTime=0,n.nonFirstManSeconds=0);const t=n.stats;t.current_role_state=e.current_role_state,t.current_depth_state=e.current_depth_state}function ZP(n,e,t){if(!n.active)return;const i=n.stats;switch(i.active_game_time=Ln(i.active_game_time,e.dt),i.tracked_time=Ln(i.tracked_time,e.dt),i.current_role_state){case"first_man":n.firstManStintActive||(n.firstManStintActive=!0,n.currentFirstManStintTime=0,i.first_man_stint_count+=1),n.currentFirstManStintTime=Ln(n.currentFirstManStintTime,e.dt),i.longest_first_man_stint_time=Math.max(i.longest_first_man_stint_time,n.currentFirstManStintTime),n.nonFirstManSeconds=0,i.time_first_man=Ln(i.time_first_man,e.dt);break;case"second_man":wo(n,e,t),i.time_second_man=Ln(i.time_second_man,e.dt);break;case"third_man":wo(n,e,t),i.time_third_man=Ln(i.time_third_man,e.dt);break;case"ambiguous":wo(n,e,t),i.time_ambiguous_role=Ln(i.time_ambiguous_role,e.dt);break;default:wo(n,e,t);break}switch(i.current_depth_state){case"behind_play":i.time_behind_play=Ln(i.time_behind_play,e.dt);break;case"level_with_play":i.time_level_with_play=Ln(i.time_level_with_play,e.dt);break;case"ahead_of_play":i.time_ahead_of_play=Ln(i.time_ahead_of_play,e.dt);break}}function wo(n,e,t){n.firstManStintActive&&(n.nonFirstManSeconds=Ln(n.nonFirstManSeconds,e.dt),n.nonFirstManSeconds>t&&(n.firstManStintActive=!1,n.currentFirstManStintTime=0,n.nonFirstManSeconds=0))}function bd(n,e){const t=Wv(e),i=n.get(t)??{active:!1,firstManStintActive:!1,currentFirstManStintTime:0,nonFirstManSeconds:0,stats:Xv()};return n.set(t,i),i}function JP(n,e,t){n.first_man_changes_for_team+=1,n.rotation_count+=1,bd(e,t.previous_first_man).stats.lost_first_man_count+=1,bd(e,t.next_first_man).stats.became_first_man_count+=1}function QP(n,e){Object.assign(n,e??Xv())}function lm(n,e){Object.assign(n,e)}function eL(n){const e=qv(n);for(const t of n.frames)e.applyFrame(t);return n}function qv(n){const e=om(n.events.rotation_player??[]),t=om(n.events.rotation_team??[]),i=n.config.rotation_first_man_debounce_seconds;let a=0,s=0;const r=new Map,o=rm(),l=rm();return{applyFrame(c){for(;a<e.length&&e[a].frame<=c.frame_number;){const u=e[a],d=bd(r,u.player);jP(d,u),a+=1}for(;s<t.length&&t[s].frame<=c.frame_number;){const u=t[s];JP(u.is_team_0?o:l,r,u),s+=1}lm(c.team_zero.rotation,o),lm(c.team_one.rotation,l);for(const u of c.players){const d=r.get(Wv(u.player_id));d&&ZP(d,c,i),QP(u.rotation,d?.stats)}}}}function cm(){return{count:0,two_v_one_count:0,two_v_two_count:0,two_v_three_count:0,three_v_one_count:0,three_v_two_count:0,three_v_three_count:0}}function tL(n){return n.map((e,t)=>({event:e,index:t})).sort((e,t)=>e.event.start_frame!==t.event.start_frame?e.event.start_frame-t.event.start_frame:e.event.start_time!==t.event.start_time?e.event.start_time-t.event.start_time:e.event.end_frame!==t.event.end_frame?e.event.end_frame-t.event.end_frame:e.index-t.index).map(({event:e})=>e)}function nL(n,e){n.count+=1,e.attackers===2&&e.defenders===1?n.two_v_one_count+=1:e.attackers===2&&e.defenders===2?n.two_v_two_count+=1:e.attackers===2&&e.defenders===3?n.two_v_three_count+=1:e.attackers===3&&e.defenders===1?n.three_v_one_count+=1:e.attackers===3&&e.defenders===2?n.three_v_two_count+=1:e.attackers===3&&e.defenders===3&&(n.three_v_three_count+=1)}function um(n,e){Object.assign(n,e)}function iL(n){const e=Kv(n);for(const t of n.frames)e.applyFrame(t);return n}function Kv(n){const e=tL(n.events.rush??[]);let t=0;const i=cm(),a=cm(),s=n.config.rush_min_possession_retained_seconds;return{applyFrame(r){for(;t<e.length&&r.frame_number>=e[t].start_frame&&r.time-e[t].start_time>=s;){const o=e[t];nL(o.is_team_0?i:a,o),t+=1}um(r.team_zero.rush,i),um(r.team_one.rush,a)}}}const aL=["control","hard_hit","medium_hit"],sL=["ground","high_air","low_air"],rL=["air","ground","wall"],oL=["dodge","no_dodge"];function os(n){return Math.fround(n)}function Xo(n,e){return os(os(n)+os(e))}function Yv(n,e){return os(os(n)-os(e))}function Eo(n){if(!n||typeof n!="object")return String(n);const[e,t]=Object.entries(n)[0]??["Unknown","unknown"];return`${e}:${typeof t=="string"?t:JSON.stringify(t)}`}function lL(){return{entries:oL.flatMap(n=>sL.flatMap(e=>aL.flatMap(t=>rL.map(i=>({labels:[{key:"dodge_state",value:n},{key:"height_band",value:e},{key:"kind",value:t},{key:"surface",value:i}],count:0}))))).sort((n,e)=>JSON.stringify(n.labels).localeCompare(JSON.stringify(e.labels)))}}function jv(){return{touch_count:0,control_touch_count:0,medium_hit_count:0,hard_hit_count:0,aerial_touch_count:0,high_aerial_touch_count:0,wall_touch_count:0,is_last_touch:!1,last_touch_time:null,last_touch_frame:null,time_since_last_touch:null,frames_since_last_touch:null,last_ball_speed_change:null,max_ball_speed_change:0,cumulative_ball_speed_change:0,total_ball_travel_distance:0,total_ball_advance_distance:0,total_ball_retreat_distance:0,labeled_touch_counts:lL()}}const cL=jv();function dm(){return{stats:jv(),labeledCountsVersion:0,labeledCountsSnapshot:void 0,labeledCountsSnapshotVersion:-1}}function fm(n){return n.map((e,t)=>({event:e,index:t})).sort((e,t)=>{const i=e.event.sample_frame??e.event.frame,a=t.event.sample_frame??t.event.frame;if(i!==a)return i-a;const s=e.event.sample_time??e.event.time,r=t.event.sample_time??t.event.time;return s!==r?s-r:e.event.frame!==t.event.frame?e.event.frame-t.event.frame:e.event.time!==t.event.time?e.event.time-t.event.time:e.index-t.index}).map(({event:e})=>e)}function uL(n){return n.map((e,t)=>({event:e,index:t})).sort((e,t)=>e.event.frame!==t.event.frame?e.event.frame-t.event.frame:e.event.time!==t.event.time?e.event.time-t.event.time:e.index-t.index).map(({event:e})=>e)}function dL(n,e){e.sort((a,s)=>a.key===s.key?a.value.localeCompare(s.value):a.key.localeCompare(s.key));const t=n.labeled_touch_counts?.entries??[];n.labeled_touch_counts={entries:t};const i=t.find(a=>a.labels.length===e.length&&a.labels.every((s,r)=>s.key===e[r]?.key&&s.value===e[r]?.value));i?i.count+=1:(t.push({labels:e,count:1}),t.sort((a,s)=>JSON.stringify(a.labels).localeCompare(JSON.stringify(s.labels))))}function fL(n){return{entries:n.entries.map(e=>({labels:e.labels.map(t=>({...t})),count:e.count}))}}function pL(n,e,t){const i=n.stats;i.touch_count+=1,e.kind==="control"?i.control_touch_count+=1:e.kind==="medium_hit"?i.medium_hit_count+=1:e.kind==="hard_hit"&&(i.hard_hit_count+=1),e.height_band==="low_air"?i.aerial_touch_count+=1:e.height_band==="high_air"&&(i.aerial_touch_count+=1,i.high_aerial_touch_count+=1),e.surface==="wall"&&(i.wall_touch_count+=1),dL(i,[{key:"kind",value:e.kind},{key:"height_band",value:e.height_band},{key:"surface",value:e.surface},{key:"dodge_state",value:e.dodge_state}]),n.labeledCountsVersion+=1,i.last_touch_time=e.time,i.last_touch_frame=e.frame,i.time_since_last_touch=Math.max(0,Yv(t.time,e.time)),i.frames_since_last_touch=Math.max(0,t.frame_number-e.frame),i.last_ball_speed_change=e.ball_speed_change,i.max_ball_speed_change=Math.max(i.max_ball_speed_change,e.ball_speed_change),i.cumulative_ball_speed_change=Xo(i.cumulative_ball_speed_change,e.ball_speed_change)}function hL(n){return n.labeledCountsSnapshotVersion!==n.labeledCountsVersion&&(n.labeledCountsSnapshot=n.stats.labeled_touch_counts?fL(n.stats.labeled_touch_counts):void 0,n.labeledCountsSnapshotVersion=n.labeledCountsVersion),n.labeledCountsSnapshot}function mL(n,e){if(!e){Object.assign(n,cL);return}Object.assign(n,e.stats,{labeled_touch_counts:hL(e)})}function _L(n){const e=Zv(n);for(const t of n.frames)e.applyFrame(t);return n}function Zv(n){const e=fm(n.events.touch??[]),t=fm(n.events.touch_last_touch??[]),i=uL(n.events.touch_ball_movement??[]);let a=0,s=0,r=0,o=null;const l=new Map;return{applyFrame(c){if(!c.is_live_play)o=null;else{for(const u of l.values()){const d=u.stats;d.is_last_touch=!1,d.last_touch_time!=null&&(d.time_since_last_touch=Math.max(0,Yv(c.time,d.last_touch_time))),d.last_touch_frame!=null&&(d.frames_since_last_touch=Math.max(0,c.frame_number-d.last_touch_frame))}for(;a<e.length&&(e[a].sample_frame??e[a].frame)<=c.frame_number;){const u=e[a],d=Eo(u.player),f=l.get(d)??dm();l.set(d,f),pL(f,u,c),a+=1}for(;s<t.length&&(t[s].sample_frame??t[s].frame)<=c.frame_number;){const u=t[s];o=u.player==null?null:Eo(u.player),s+=1}if(o!=null){const u=l.get(o);u&&(u.stats.is_last_touch=!0)}}for(;r<i.length&&i[r].frame<=c.frame_number;){const u=i[r],d=Eo(u.player),f=l.get(d)??dm();l.set(d,f);const p=f.stats;p.total_ball_travel_distance=Xo(p.total_ball_travel_distance,u.travel_distance),p.total_ball_advance_distance=Xo(p.total_ball_advance_distance,u.advance_distance),p.total_ball_retreat_distance=Xo(p.total_ball_retreat_distance,u.retreat_distance),r+=1}for(const u of c.players)mL(u.touch,l.get(Eo(u.player_id)))}}}function Wc(n){if(!n||typeof n!="object")return String(n);const[e,t]=Object.entries(n)[0]??["Unknown","unknown"];return`${e}:${typeof t=="string"?t:JSON.stringify(t)}`}function Sd(){return{whiff_count:0,beaten_to_ball_count:0,grounded_whiff_count:0,aerial_whiff_count:0,dodge_whiff_count:0,is_last_whiff:!1,last_whiff_time:null,last_whiff_frame:null,time_since_last_whiff:null,frames_since_last_whiff:null,last_closest_approach_distance:null,best_closest_approach_distance:null,cumulative_closest_approach_distance:0}}function gL(n){return{...n}}function vL(n){return n.map((e,t)=>({event:e,index:t})).sort((e,t)=>e.event.resolved_frame!==t.event.resolved_frame?e.event.resolved_frame-t.event.resolved_frame:e.event.resolved_time!==t.event.resolved_time?e.event.resolved_time-t.event.resolved_time:e.index-t.index).map(({event:e})=>e)}function yL(n,e,t){n.is_last_whiff=!1,n.time_since_last_whiff=n.last_whiff_time==null?null:Math.max(0,t-n.last_whiff_time),n.frames_since_last_whiff=n.last_whiff_frame==null?null:Math.max(0,e-n.last_whiff_frame)}function bL(n,e,t,i){if((e.kind??"whiff")==="beaten_to_ball"){n.beaten_to_ball_count+=1;return}n.whiff_count+=1,e.aerial?n.aerial_whiff_count+=1:n.grounded_whiff_count+=1,e.dodge_active&&(n.dodge_whiff_count+=1),n.is_last_whiff=!0,n.last_whiff_time=e.time,n.last_whiff_frame=e.frame,n.time_since_last_whiff=Math.max(0,i-e.time),n.frames_since_last_whiff=Math.max(0,t-e.frame),n.last_closest_approach_distance=e.closest_approach_distance,n.best_closest_approach_distance=n.best_closest_approach_distance==null?e.closest_approach_distance:Math.min(n.best_closest_approach_distance,e.closest_approach_distance),n.cumulative_closest_approach_distance+=e.closest_approach_distance}function pm(n,e){Object.assign(n,e??Sd())}function SL(n){const e=Jv(n);for(const t of n.frames)e.applyFrame(t);return n}function Jv(n){const e=vL(n.events.whiff??[]);let t=0,i=null;const a=new Map,s=new Map;return{applyFrame(r){if(r.is_live_play){for(const o of a.values())yL(o,r.frame_number,r.time);for(;t<e.length&&e[t].resolved_frame<=r.frame_number;){const o=e[t],l=Wc(o.player),c=a.get(l)??Sd();a.set(l,c),bL(c,o,r.frame_number,r.time),(o.kind??"whiff")==="whiff"&&(i=l),t+=1}if(i!=null){const o=a.get(i);o&&(o.is_last_whiff=!0)}for(const o of r.players){const l=Wc(o.player_id),c=a.get(l);pm(o.whiff,c),s.set(l,gL(c??Sd()))}}else{for(const o of r.players){const l=Wc(o.player_id);pm(o.whiff,s.get(l))}i=null}}}}const xL=.78;function ls(n){return Math.fround(n)}function Mo(n,e){return ls(ls(n)+ls(e))}function Qv(n,e){return ls(ls(n)-ls(e))}function hm(n){if(!n||typeof n!="object")return String(n);const[e,t]=Object.entries(n)[0]??["Unknown","unknown"];return`${e}:${typeof t=="string"?t:JSON.stringify(t)}`}function ey(){return{count:0,high_confidence_count:0,is_last_wall_aerial:!1,last_wall_aerial_time:null,last_wall_aerial_frame:null,time_since_last_wall_aerial:null,frames_since_last_wall_aerial:null,last_confidence:null,best_confidence:0,cumulative_confidence:0,cumulative_setup_duration:0,cumulative_takeoff_to_touch_time:0,cumulative_touch_height:0}}function wL(n){return n.map((e,t)=>({event:e,index:t})).sort((e,t)=>{const i=e.event.sample_frame??e.event.frame,a=t.event.sample_frame??t.event.frame;if(i!==a)return i-a;const s=e.event.sample_time??e.event.time,r=t.event.sample_time??t.event.time;return s!==r?s-r:e.event.time!==t.event.time?e.event.time-t.event.time:e.index-t.index}).map(({event:e})=>e)}function EL(n,e,t,i){n.is_last_wall_aerial=i,n.time_since_last_wall_aerial=n.last_wall_aerial_time==null?null:Math.max(0,Qv(t,n.last_wall_aerial_time)),n.frames_since_last_wall_aerial=n.last_wall_aerial_frame==null?null:Math.max(0,e-n.last_wall_aerial_frame)}function ML(n,e,t,i){n.count+=1,e.confidence>=xL&&(n.high_confidence_count+=1),n.is_last_wall_aerial=!0,n.last_wall_aerial_time=e.time,n.last_wall_aerial_frame=e.frame,n.time_since_last_wall_aerial=Math.max(0,Qv(i,e.time)),n.frames_since_last_wall_aerial=Math.max(0,t-e.frame),n.last_confidence=e.confidence,n.best_confidence=Math.max(n.best_confidence,e.confidence),n.cumulative_confidence=Mo(n.cumulative_confidence,e.confidence),n.cumulative_setup_duration=Mo(n.cumulative_setup_duration,e.setup_duration),n.cumulative_takeoff_to_touch_time=Mo(n.cumulative_takeoff_to_touch_time,e.time_since_takeoff),n.cumulative_touch_height=Mo(n.cumulative_touch_height,e.player_position[2]??0)}function TL(n,e){Object.assign(n,e??ey())}function CL(n){const e=ty(n);for(const t of n.frames)e.applyFrame(t);return n}function ty(n){const e=wL(n.events.wall_aerial??[]);let t=0,i=null;const a=new Map;return{applyFrame(s){for(const[r,o]of a)EL(o,s.frame_number,s.time,s.is_live_play&&r===i);if(!s.is_live_play)i=null;else{for(;t<e.length&&(e[t].sample_frame??e[t].frame)<=s.frame_number;){const r=e[t],o=hm(r.player),l=a.get(o)??ey();a.set(o,l),ML(l,r,s.frame_number,s.time),i=o,t+=1}if(i!=null){const r=a.get(i);r&&(r.is_last_wall_aerial=!0)}}for(const r of s.players)TL(r.wall_aerial,a.get(hm(r.player_id)))}}}const AL=.78;function cs(n){return Math.fround(n)}function Xc(n,e){return cs(cs(n)+cs(e))}function ny(n,e){return cs(cs(n)-cs(e))}function mm(n){if(!n||typeof n!="object")return String(n);const[e,t]=Object.entries(n)[0]??["Unknown","unknown"];return`${e}:${typeof t=="string"?t:JSON.stringify(t)}`}function iy(){return{count:0,high_confidence_count:0,is_last_wall_aerial_shot:!1,last_wall_aerial_shot_time:null,last_wall_aerial_shot_frame:null,time_since_last_wall_aerial_shot:null,frames_since_last_wall_aerial_shot:null,last_confidence:null,best_confidence:0,cumulative_confidence:0,cumulative_takeoff_to_shot_time:0,cumulative_shot_height:0}}function RL(n){return n.map((e,t)=>({event:e,index:t})).sort((e,t)=>e.event.frame!==t.event.frame?e.event.frame-t.event.frame:e.event.time!==t.event.time?e.event.time-t.event.time:e.index-t.index).map(({event:e})=>e)}function PL(n,e,t,i){n.is_last_wall_aerial_shot=i,n.time_since_last_wall_aerial_shot=n.last_wall_aerial_shot_time==null?null:Math.max(0,ny(t,n.last_wall_aerial_shot_time)),n.frames_since_last_wall_aerial_shot=n.last_wall_aerial_shot_frame==null?null:Math.max(0,e-n.last_wall_aerial_shot_frame)}function LL(n,e,t,i){n.count+=1,e.confidence>=AL&&(n.high_confidence_count+=1),n.is_last_wall_aerial_shot=!0,n.last_wall_aerial_shot_time=e.time,n.last_wall_aerial_shot_frame=e.frame,n.time_since_last_wall_aerial_shot=Math.max(0,ny(i,e.time)),n.frames_since_last_wall_aerial_shot=Math.max(0,t-e.frame),n.last_confidence=e.confidence,n.best_confidence=Math.max(n.best_confidence,e.confidence),n.cumulative_confidence=Xc(n.cumulative_confidence,e.confidence),n.cumulative_takeoff_to_shot_time=Xc(n.cumulative_takeoff_to_shot_time,e.time_since_takeoff),n.cumulative_shot_height=Xc(n.cumulative_shot_height,e.player_position[2]??0)}function NL(n,e){Object.assign(n,e??iy())}function IL(n){const e=ay(n);for(const t of n.frames)e.applyFrame(t);return n}function ay(n){const e=RL(n.events.wall_aerial_shot??[]);let t=0,i=null;const a=new Map;return{applyFrame(s){for(const[r,o]of a)PL(o,s.frame_number,s.time,s.is_live_play&&r===i);if(!s.is_live_play)i=null;else{let r=!1;for(;t<e.length&&e[t].frame<=s.frame_number;){const o=e[t],l=mm(o.player),c=a.get(l)??iy();a.set(l,c),LL(c,o,s.frame_number,s.time),i=l,r=!0,t+=1}if(r)for(const o of a.values())o.is_last_wall_aerial_shot=!1;if(i!=null){const o=a.get(i);o&&(o.is_last_wall_aerial_shot=!0)}}for(const r of s.players)NL(r.wall_aerial_shot,a.get(mm(r.player_id)))}}}function xf(n,e){if(!e)return n;const t={...n};for(const[i,a]of Object.entries(e)){if(i==="player_id"){t[i]=a;continue}if(Array.isArray(a)){t[i]=a;continue}const s=t[i];if(a&&typeof a=="object"&&s&&typeof s=="object"&&!Array.isArray(s)){t[i]=xf(s,a);continue}t[i]=a}return t}function ys(n){return xf({event_counts:ts(),fifty_fifty:{count:0,wins:0,losses:0,neutral_outcomes:0,kickoff_count:0,kickoff_wins:0,kickoff_losses:0,kickoff_neutral_outcomes:0,possession_after_count:0,opponent_possession_after_count:0,neutral_possession_after_count:0,kickoff_possession_after_count:0,kickoff_opponent_possession_after_count:0,kickoff_neutral_possession_after_count:0},possession:{tracked_time:0,possession_time:0,opponent_possession_time:0,neutral_time:0,labeled_time:{entries:[]}},pressure:{tracked_time:0,defensive_half_time:0,offensive_half_time:0,neutral_time:0,labeled_time:{entries:[]}},territorial_pressure:{tracked_time:0,session_count:0,opponent_session_count:0,session_time:0,opponent_session_time:0,offensive_half_time:0,offensive_third_time:0,longest_session_time:0,opponent_longest_session_time:0,average_session_time:0},rotation:{first_man_changes_for_team:0,rotation_count:0},rush:{count:0,two_v_one_count:0,two_v_two_count:0,two_v_three_count:0,three_v_one_count:0,three_v_two_count:0,three_v_three_count:0},core:{score:0,goals:0,assists:0,saves:0,shots:0,kickoff_goal_count:0,short_goal_count:0,medium_goal_count:0,long_goal_count:0,counter_attack_goal_count:0,sustained_pressure_goal_count:0,other_buildup_goal_count:0,goal_ball_air_time_sample_count:0,cumulative_goal_ball_air_time:0,last_goal_ball_air_time:null},backboard:{count:0},double_tap:{count:0},one_timer:{count:0,total_ball_speed:0,fastest_ball_speed:0},half_volley:{count:0,total_ball_speed:0,fastest_ball_speed:0},pass:{completed_pass_count:0,total_pass_distance:0,total_pass_advance:0,longest_pass_distance:0},ball_carry:{carry_count:0,total_carry_time:0,total_straight_line_distance:0,total_path_distance:0,longest_carry_time:0,furthest_carry_distance:0,fastest_carry_speed:0,carry_speed_sum:0,average_horizontal_gap_sum:0,average_vertical_gap_sum:0},air_dribble:{count:0,ground_to_air_count:0,wall_to_air_count:0,total_touch_count:0,max_touch_count:0,total_time:0,total_straight_line_distance:0,total_path_distance:0,longest_time:0,furthest_distance:0,fastest_speed:0,speed_sum:0,average_horizontal_gap_sum:0,average_vertical_gap_sum:0},boost:{tracked_time:0,boost_integral:0,time_zero_boost:0,time_hundred_boost:0,time_boost_0_25:0,time_boost_25_50:0,time_boost_50_75:0,time_boost_75_100:0,amount_collected:0,amount_collected_inactive:0,big_pads_collected_inactive:0,small_pads_collected_inactive:0,amount_stolen:0,big_pads_collected:0,small_pads_collected:0,big_pads_stolen:0,small_pads_stolen:0,amount_collected_big:0,amount_stolen_big:0,amount_collected_small:0,amount_stolen_small:0,amount_respawned:0,overfill_total:0,overfill_from_stolen:0,amount_used:0,amount_used_while_grounded:0,amount_used_while_airborne:0,amount_used_while_supersonic:0},movement:{tracked_time:0,total_distance:0,speed_integral:0,time_slow_speed:0,time_boost_speed:0,time_supersonic_speed:0,time_on_ground:0,time_low_air:0,time_high_air:0,labeled_tracked_time:{entries:[]}},powerslide:{total_duration:0,press_count:0},demo:{demos_inflicted:0},bump:{bumps_inflicted:0,team_bumps_inflicted:0}},n)}function wf(n){return xf({event_counts:ts(),player_id:{Steam:"test-player"},name:"Test Player",is_team_0:!0,core:{score:0,goals:0,assists:0,saves:0,shots:0,goals_conceded_while_last_defender:0,goals_for_while_most_back:0,goals_against_while_most_back:0,goal_against_boost_sample_count:0,cumulative_boost_on_goals_against:0,last_boost_on_goal_against:null,goal_against_boost_leadup_sample_count:0,cumulative_average_boost_in_goal_against_leadup:0,cumulative_min_boost_in_goal_against_leadup:0,last_average_boost_in_goal_against_leadup:null,last_min_boost_in_goal_against_leadup:null,goal_against_position_sample_count:0,cumulative_goal_against_position_x:0,cumulative_goal_against_position_y:0,cumulative_goal_against_position_z:0,last_goal_against_position:null,scoring_goal_last_touch_position_sample_count:0,cumulative_scoring_goal_last_touch_position_x:0,cumulative_scoring_goal_last_touch_position_y:0,cumulative_scoring_goal_last_touch_position_z:0,last_scoring_goal_last_touch_position:null,kickoff_goal_count:0,short_goal_count:0,medium_goal_count:0,long_goal_count:0,counter_attack_goal_count:0,sustained_pressure_goal_count:0,other_buildup_goal_count:0,goal_ball_air_time_sample_count:0,cumulative_goal_ball_air_time:0,last_goal_ball_air_time:null},backboard:{count:0,is_last_backboard:!1,last_backboard_time:null,last_backboard_frame:null,time_since_last_backboard:null,frames_since_last_backboard:null},ceiling_shot:{count:0,high_confidence_count:0,is_last_ceiling_shot:!1,last_ceiling_shot_time:null,last_ceiling_shot_frame:null,time_since_last_ceiling_shot:null,frames_since_last_ceiling_shot:null,last_confidence:null,best_confidence:0,cumulative_confidence:0},wall_aerial:{count:0,high_confidence_count:0,is_last_wall_aerial:!1,last_wall_aerial_time:null,last_wall_aerial_frame:null,time_since_last_wall_aerial:null,frames_since_last_wall_aerial:null,last_confidence:null,best_confidence:0,cumulative_confidence:0,cumulative_setup_duration:0,cumulative_takeoff_to_touch_time:0,cumulative_touch_height:0},wall_aerial_shot:{count:0,high_confidence_count:0,is_last_wall_aerial_shot:!1,last_wall_aerial_shot_time:null,last_wall_aerial_shot_frame:null,time_since_last_wall_aerial_shot:null,frames_since_last_wall_aerial_shot:null,last_confidence:null,best_confidence:0,cumulative_confidence:0,cumulative_takeoff_to_shot_time:0,cumulative_shot_height:0},double_tap:{count:0,is_last_double_tap:!1,last_double_tap_time:null,last_double_tap_frame:null,time_since_last_double_tap:null,frames_since_last_double_tap:null},one_timer:{count:0,total_ball_speed:0,fastest_ball_speed:0,total_pass_distance:0,is_last_one_timer:!1,last_one_timer_time:null,last_one_timer_frame:null,time_since_last_one_timer:null,frames_since_last_one_timer:null},pass:{completed_pass_count:0,received_pass_count:0,total_pass_distance:0,total_pass_advance:0,longest_pass_distance:0,is_last_completed_pass:!1,last_completed_pass_time:null,last_completed_pass_frame:null,time_since_last_completed_pass:null,frames_since_last_completed_pass:null},fifty_fifty:{count:0,wins:0,losses:0,neutral_outcomes:0,kickoff_count:0,kickoff_wins:0,kickoff_losses:0,kickoff_neutral_outcomes:0,possession_after_count:0,kickoff_possession_after_count:0},speed_flip:{count:0,high_confidence_count:0,is_last_speed_flip:!1,last_speed_flip_time:null,last_speed_flip_frame:null,time_since_last_speed_flip:null,frames_since_last_speed_flip:null,last_quality:null,best_quality:0,cumulative_quality:0},half_flip:{count:0,high_confidence_count:0,is_last_half_flip:!1,last_half_flip_time:null,last_half_flip_frame:null,time_since_last_half_flip:null,frames_since_last_half_flip:null,last_quality:null,best_quality:0,cumulative_quality:0},half_volley:{count:0,total_ball_speed:0,fastest_ball_speed:0,is_last_half_volley:!1,last_half_volley_time:null,last_half_volley_frame:null,time_since_last_half_volley:null,frames_since_last_half_volley:null},wavedash:{count:0,high_confidence_count:0,is_last_wavedash:!1,last_wavedash_time:null,last_wavedash_frame:null,time_since_last_wavedash:null,frames_since_last_wavedash:null,last_quality:null,best_quality:0,cumulative_quality:0},touch:{touch_count:0,control_touch_count:0,medium_hit_count:0,hard_hit_count:0,aerial_touch_count:0,high_aerial_touch_count:0,wall_touch_count:0,is_last_touch:!1,last_touch_time:null,last_touch_frame:null,time_since_last_touch:null,frames_since_last_touch:null,last_ball_speed_change:null,max_ball_speed_change:0,cumulative_ball_speed_change:0,total_ball_travel_distance:0,total_ball_advance_distance:0,total_ball_retreat_distance:0,labeled_touch_counts:{entries:[]}},whiff:{whiff_count:0,beaten_to_ball_count:0,grounded_whiff_count:0,aerial_whiff_count:0,dodge_whiff_count:0,is_last_whiff:!1,last_whiff_time:null,last_whiff_frame:null,time_since_last_whiff:null,frames_since_last_whiff:null,last_closest_approach_distance:null,best_closest_approach_distance:null,cumulative_closest_approach_distance:0},flick:{count:0,high_confidence_count:0,is_last_flick:!1,last_flick_time:null,last_flick_frame:null,time_since_last_flick:null,frames_since_last_flick:null,last_confidence:null,best_confidence:0,cumulative_confidence:0,cumulative_setup_duration:0,cumulative_ball_speed_change:0},musty_flick:{count:0,aerial_count:0,high_confidence_count:0,is_last_musty:!1,last_musty_time:null,last_musty_frame:null,time_since_last_musty:null,frames_since_last_musty:null,last_confidence:null,best_confidence:0,cumulative_confidence:0},dodge_reset:{count:0,on_ball_count:0},ball_carry:{carry_count:0,total_carry_time:0,total_straight_line_distance:0,total_path_distance:0,longest_carry_time:0,furthest_carry_distance:0,fastest_carry_speed:0,carry_speed_sum:0,average_horizontal_gap_sum:0,average_vertical_gap_sum:0},air_dribble:{count:0,ground_to_air_count:0,wall_to_air_count:0,total_touch_count:0,max_touch_count:0,total_time:0,total_straight_line_distance:0,total_path_distance:0,longest_time:0,furthest_distance:0,fastest_speed:0,speed_sum:0,average_horizontal_gap_sum:0,average_vertical_gap_sum:0},boost:ys().boost,movement:ys().movement,positioning:{active_game_time:0,tracked_time:0,sum_distance_to_teammates:0,sum_distance_to_ball:0,sum_distance_to_ball_has_possession:0,time_has_possession:0,sum_distance_to_ball_no_possession:0,time_no_possession:0,time_demolished:0,time_no_teammates:0,time_most_back:0,time_most_forward:0,time_mid_role:0,time_other_role:0,time_defensive_third:0,time_neutral_third:0,time_offensive_third:0,time_defensive_half:0,time_offensive_half:0,time_closest_to_ball:0,time_farthest_from_ball:0,time_behind_ball:0,time_level_with_ball:0,time_in_front_of_ball:0,times_caught_ahead_of_play_on_conceded_goals:0},rotation:{active_game_time:0,tracked_time:0,time_first_man:0,time_second_man:0,time_third_man:0,time_ambiguous_role:0,time_behind_play:0,time_level_with_play:0,time_ahead_of_play:0,longest_first_man_stint_time:0,first_man_stint_count:0,became_first_man_count:0,lost_first_man_count:0,current_role_state:"unknown",current_depth_state:"unknown"},powerslide:{total_duration:0,press_count:0},demo:{demos_inflicted:0,demos_taken:0},bump:{bumps_inflicted:0,bumps_taken:0,team_bumps_inflicted:0,team_bumps_taken:0,last_bump_time:null,last_bump_frame:null,last_bump_strength:null,max_bump_strength:0,cumulative_bump_strength:0}},n)}const kL=300,DL=1200,FL=2,OL=[{id:"event-counts",playerModules:["event_counts"],teamModules:["event_counts"],apply:qg,createFrameAccumulator:Kg},{id:"boost-ledger",playerModules:["boost"],teamModules:["boost"],apply:F1,createFrameAccumulator:rv},{id:"core",playerModules:["core"],teamModules:["core"],apply:j1,createFrameAccumulator:dv},{id:"possession",playerModules:[],teamModules:["possession"],apply:LP,createFrameAccumulator:Uv},{id:"pressure",playerModules:[],teamModules:["pressure"],apply:XP,createFrameAccumulator:Gv},{id:"territorial-pressure",playerModules:[],teamModules:["territorial_pressure"],apply:YP,createFrameAccumulator:$v},{id:"movement",playerModules:["movement"],teamModules:["movement"],apply:nP,createFrameAccumulator:Pv},{id:"positioning",playerModules:["positioning"],teamModules:[],apply:DP,createFrameAccumulator:zv},{id:"rotation",playerModules:["rotation"],teamModules:["rotation"],apply:eL,createFrameAccumulator:qv},{id:"mechanics",playerModules:["speed_flip","half_flip","wavedash"],teamModules:[],apply:qR,createFrameAccumulator:Rv},{id:"whiff",playerModules:["whiff"],teamModules:[],apply:SL,createFrameAccumulator:Jv},{id:"backboard",playerModules:["backboard"],teamModules:["backboard"],apply:f1,createFrameAccumulator:jg},{id:"double-tap",playerModules:["double_tap"],teamModules:["double_tap"],apply:sR,createFrameAccumulator:mv},{id:"demo",playerModules:["demo"],teamModules:["demo"],apply:lR,createFrameAccumulator:gv},{id:"fifty-fifty",playerModules:["fifty_fifty"],teamModules:["fifty_fifty"],apply:gR,createFrameAccumulator:vv},{id:"bump",playerModules:["bump"],teamModules:["bump"],apply:b1,createFrameAccumulator:tv},{id:"rush",playerModules:[],teamModules:["rush"],apply:iL,createFrameAccumulator:Kv},{id:"pass",playerModules:["pass"],teamModules:["pass"],apply:wP,createFrameAccumulator:Fv},{id:"one-timer",playerModules:["one_timer"],teamModules:["one_timer"],apply:gP,createFrameAccumulator:Dv},{id:"ball-carry",playerModules:["ball_carry","air_dribble"],teamModules:["ball_carry","air_dribble"],apply:h1,createFrameAccumulator:ev},{id:"wall-aerial",playerModules:["wall_aerial"],teamModules:[],apply:CL,createFrameAccumulator:ty},{id:"wall-aerial-shot",playerModules:["wall_aerial_shot"],teamModules:[],apply:IL,createFrameAccumulator:ay},{id:"flick",playerModules:["flick"],teamModules:[],apply:CR,createFrameAccumulator:Sv},{id:"ceiling-shot",playerModules:["ceiling_shot"],teamModules:[],apply:q1,createFrameAccumulator:cv},{id:"musty-flick",playerModules:["musty_flick"],teamModules:[],apply:fP,createFrameAccumulator:Iv},{id:"dodge-reset",playerModules:["dodge_reset"],teamModules:[],apply:eR,createFrameAccumulator:pv},{id:"powerslide",playerModules:["powerslide"],teamModules:["powerslide"],apply:UP,createFrameAccumulator:Hv},{id:"touch",playerModules:["touch"],teamModules:[],apply:_L,createFrameAccumulator:Zv},{id:"half-volley",playerModules:["half_volley"],teamModules:["half_volley"],apply:NR,createFrameAccumulator:Mv}];function UL(n,e,t={}){const i=n.frames,a=new Map(i.map((p,_)=>[p.frame_number,_])),s=new Map,r={...n,frames:[]},o=OL.flatMap(p=>p.createFrameAccumulator?[p.createFrameAccumulator(r)]:[]),l=Math.max(1,t.materializationChunkSize??kL),c=Math.max(l,t.maxMaterializationChunkSize??DL);let u=-1,d=l;const f=p=>{if(p<=u)return;const _=Math.min(i.length-1,Math.max(p,u+d));for(let g=u+1;g<=_;g+=1){const m=i[g],h=m?HL(zL(m)):void 0;if(h){for(const y of o)y.applyFrame(h);s.set(h.frame_number,h)}}u=_,d=Math.min(c,i.length,d*FL)};return{get(p){const _=a.get(p);if(_!==void 0)return f(_),s.get(p)}}}function BL(n){return!n||typeof n!="object"?n:{...n}}function zL(n){return{...n,team_zero:{...n.team_zero},team_one:{...n.team_one},players:n.players.map(e=>({...e,player_id:BL(e.player_id)}))}}function HL(n){return{...n,team_zero:ys(n.team_zero??{}),team_one:ys(n.team_one??{}),players:n.players.map(t=>wf(t))}}const VL=new Set(["is_team_0","name","player_id"]);function _m(n){return!!n&&typeof n=="object"&&!Array.isArray(n)&&Object.keys(n).length===0}function GL(n){return!n||typeof n!="object"||Array.isArray(n)?!1:Object.keys(n).every(e=>VL.has(e))}function $L(n){return _m(n.team_zero)&&_m(n.team_one)&&n.players.every(e=>GL(e))}function WL(n){return new Map(qg(n).frames.map(e=>[e.frame_number,e]))}function sy(n,e,t){const i=n.frames.filter(a=>$L(a)).length;if(i===n.frames.length)return UL(n,e,t);if(i>0)throw new Error("stats timeline frames must be either all compact scaffolds or all materialized snapshots");return WL(n)}function bt(n,e){return n.get(e)??null}const Ef=[{stage:"validating",index:1,total:9,label:"Parse replay",start:0,end:.08},{stage:"processing",index:2,total:9,label:"Process replay frames",start:.08,end:.62},{stage:"building-stats",index:3,total:9,label:"Build stats events",start:.62,end:.7},{stage:"serializing-replay",index:4,total:9,label:"Serialize replay data",start:.7,end:.76},{stage:"serializing-stats",index:5,total:9,label:"Serialize stats timeline",start:.76,end:.86},{stage:"normalizing",index:6,total:9,label:"Normalize replay model",start:.86,end:.91},{stage:"decoding-replay",index:7,total:9,label:"Decode replay data",start:.91,end:.94},{stage:"decoding-stats",index:8,total:9,label:"Decode stats chunks",start:.94,end:.96},{stage:"deriving-stats",index:9,total:9,label:"Derive stats snapshots",start:.96,end:1}];function ry(n){return Math.max(0,Math.min(1,n))}function qc(n,e,t){if(n!==void 0)return ry((n-e)/(t-e))}function Mf(n){if(n.stage!=="stats-timeline")return n;const e=n.progress;return e===void 0?{...n,stage:"building-stats"}:e<.35?{...n,stage:"building-stats",progress:qc(e,0,.35)}:e<.55?{...n,stage:"serializing-replay",progress:qc(e,.35,.55)}:{...n,stage:"serializing-stats",progress:qc(e,.55,.92)}}function oy(n){const e=Mf(n);return Ef.find(t=>t.stage===e.stage)}function XL(){return Ef.map(({stage:n,index:e,total:t,label:i})=>({stage:n,index:e,total:t,label:i}))}function qL(n){const e=oy(n);return{stage:e.stage,index:e.index,total:e.total,label:e.label}}function KL(n){const e=Mf(n),t=oy(e);return Ef.map(({stage:i,index:a,total:s,label:r})=>{if(a<t.index)return{stage:i,index:a,total:s,label:r,state:"complete",completion:1,indeterminate:!1};if(a>t.index)return{stage:i,index:a,total:s,label:r,state:"pending",completion:0,indeterminate:!1};const o=e.progress!==void 0;return{stage:i,index:a,total:s,label:r,state:"active",completion:o?ry(e.progress??0):1,indeterminate:!o}})}function ws(n){const e=Mf(n),t=e.progress===void 0?null:Math.round(e.progress*100);switch(e.stage){case"validating":return"Parsing replay...";case"processing":return t!==null&&e.totalFrames!==void 0?`Processing replay frames... ${t}% (${e.processedFrames??0}/${e.totalFrames})`:"Processing replay frames...";case"building-stats":return t!==null?e.totalFrames!==void 0?`Building stats events... ${t}% (${e.processedFrames??0}/${e.totalFrames})`:`Building stats events... ${t}%`:"Building stats events...";case"serializing-replay":return t!==null?`Serializing replay data... ${t}%`:"Serializing replay data...";case"serializing-stats":return t!==null?`Serializing stats timeline... ${t}%`:"Serializing stats timeline...";case"decoding-replay":return t!==null?`Decoding replay data... ${t}%`:"Decoding replay data...";case"decoding-stats":return t!==null?e.totalChunks!==void 0?`Decoding stats chunks... ${t}% (${e.processedChunks??0}/${e.totalChunks})`:`Decoding stats chunks... ${t}%`:"Decoding stats chunks...";case"deriving-stats":return t!==null?`Deriving stats snapshots... ${t}%`:"Deriving stats snapshots...";case"normalizing":return t!==null?`Normalizing replay model... ${t}%`:"Normalizing replay model...";default:return"Loading replay..."}}function Ws(n,e){return JSON.parse(n.decode(new Uint8Array(e)))}async function YL(n,e,t){t?.({stage:"decoding-stats",progress:0});const i=Ws(n,e.configBuffer);t?.({stage:"decoding-stats",progress:.05}),await Xa();const a=Ws(n,e.replayMetaBuffer);t?.({stage:"decoding-stats",progress:.1}),await Xa();const s=Ws(n,e.eventsBuffer);t?.({stage:"decoding-stats",progress:.15}),await Xa();const r=[],o=e.frameChunkBuffers.length;for(let l=0;l<o;l+=1){const c=e.frameChunkBuffers[l];r.push(...Ws(n,c)),t?.({stage:"decoding-stats",processedChunks:l+1,totalChunks:o,progress:.15+(l+1)/Math.max(1,o)*.85}),await Xa()}return o===0&&t?.({stage:"decoding-stats",progress:1}),{config:i,replay_meta:a,events:s,frames:r}}function Xa(){return typeof requestAnimationFrame!="function"?Promise.resolve():new Promise(n=>requestAnimationFrame(()=>n()))}async function Nl(n,e={}){if(typeof Worker>"u")throw new Error("Replay loading worker is not available in this environment");const t=new Worker(new URL(""+new URL("replayLoader.worker-CeI9cLqT.js",import.meta.url).href,import.meta.url),{type:"module"}),i=n.slice(),a=e.reportEveryNFrames??100;return new Promise((s,r)=>{const o=()=>{t.terminate()};t.onmessage=async c=>{const u=c.data;if(u.type==="progress"){e.onProgress?.(u.progress);return}if(u.type==="error"){o(),r(new Error(u.error));return}o();const d=new TextDecoder;e.onProgress?.({stage:"decoding-replay",progress:0}),await Xa();const f=Ws(d,u.replayBuffer);e.onProgress?.({stage:"decoding-replay",progress:1}),await Xa();const p=await YL(d,u.statsTimelineParts,e.onProgress),_=sy(p);s({replay:f,statsTimeline:p,statsFrameLookup:_})},t.onerror=c=>{o(),r(new Error(c.message||"Replay loading worker failed"))};const l={type:"load-replay",bytes:i.buffer,reportEveryNFrames:a};t.postMessage(l,[i.buffer])})}function jL(n){const e=document.createElement("div");e.className="replay-load-modal",e.hidden=!0;const t=document.createElement("div");t.className="replay-load-modal__dialog",t.setAttribute("role","dialog"),t.setAttribute("aria-modal","true"),t.setAttribute("aria-labelledby","replay-load-modal-title");const i=document.createElement("p");i.className="replay-load-modal__eyebrow",i.textContent="Replay loading";const a=document.createElement("h2");a.id="replay-load-modal-title",a.className="replay-load-modal__title",a.textContent="Preparing replay pipeline";const s=document.createElement("p");s.className="replay-load-modal__status",s.textContent="Preparing replay...";const r=document.createElement("div");r.className="replay-load-modal__phase-list";const o=new Map;for(const p of XL()){const _=document.createElement("div");_.className="replay-load-modal__phase-row",_.dataset.state="pending";const g=document.createElement("p");g.className="replay-load-modal__phase-label",g.textContent=`${p.index}. ${p.label}`;const m=document.createElement("div");m.className="replay-load-modal__phase-bar";const h=document.createElement("div");h.className="replay-load-modal__phase-fill",h.dataset.indeterminate="false",m.append(h),_.append(g,m),r.append(_),o.set(p.stage,{row:_,fill:h})}const l=document.createElement("p");l.className="replay-load-modal__meta",t.append(i,a,s,r,l),e.append(t),n.append(e);let c="";const u=()=>{for(const{row:p,fill:_}of o.values())p.dataset.state="pending",_.style.width="0%",_.dataset.indeterminate="false"},d=p=>{for(const _ of KL(p)){const g=o.get(_.stage);g&&(g.row.dataset.state=_.state,g.fill.dataset.indeterminate=_.indeterminate?"true":"false",g.fill.style.width=`${Math.round(_.completion*100)}%`)}},f=p=>{e.hidden=!p};return{show(p,_="Preparing replay..."){c=p,f(!0),u(),a.textContent="Preparing replay pipeline",s.textContent=_,l.textContent=`Loading ${p}`},update(p){f(!0);const _=qL(p);if(d(p),a.textContent=`Phase ${_.index} of ${_.total}: ${_.label}`,s.textContent=ws(p),p.stage==="processing"&&p.totalFrames!==void 0){l.textContent=`${p.processedFrames??0}/${p.totalFrames} frames`;return}if(p.stage==="decoding-stats"&&p.totalChunks!==void 0){l.textContent=`${p.processedChunks??0}/${p.totalChunks} chunks`;return}l.textContent=c?`Loading ${c}`:""},hide(){f(!1)},destroy(){e.remove()}}}const ZL=["free","follow"];class JL{constructor(e){this.options=e}lastFreeCameraPreset=null;get freeCameraPreset(){return this.lastFreeCameraPreset}set freeCameraPreset(e){this.lastFreeCameraPreset=e}get ballCamChecked(){return this.options.elements.ballCam.checked}installEventListeners(e){const{elements:t}=this.options;t.cameraDistance.addEventListener("input",()=>{this.options.getReplayPlayer()?.setCameraDistanceScale(Number(t.cameraDistance.value)),this.options.requestConfigSync()},{signal:e}),t.customCameraSettings.addEventListener("change",()=>{t.cameraSettingsControls.hidden=!t.customCameraSettings.checked,this.options.getReplayPlayer()?.setCustomCameraSettings(t.customCameraSettings.checked?this.readCustomCameraSettings():null),this.options.requestConfigSync()},{signal:e});for(const i of[t.customCameraFov,t.customCameraHeight,t.customCameraPitch,t.customCameraDistance,t.customCameraStiffness,t.customCameraSwivelSpeed,t.customCameraTransitionSpeed])i.addEventListener("input",()=>{const a=this.readCustomCameraSettings();this.syncCustomCameraSettingControls(a),this.options.getReplayPlayer()?.setCustomCameraSettings(a),this.options.requestConfigSync()},{signal:e});t.attachedPlayer.addEventListener("change",()=>{this.options.getReplayPlayer()?.setAttachedPlayer(t.attachedPlayer.value||null),this.lastFreeCameraPreset=null,this.options.requestConfigSync()},{signal:e}),t.cameraViewFreeButton.addEventListener("click",()=>{this.options.getReplayPlayer()?.setCameraViewMode("free"),this.lastFreeCameraPreset=null,this.options.requestConfigSync()},{signal:e}),t.cameraViewFollowButton.addEventListener("click",()=>{this.options.getReplayPlayer()?.setCameraViewMode("follow"),this.lastFreeCameraPreset=null,this.options.requestConfigSync()},{signal:e}),t.cameraViewOverheadButton.addEventListener("click",()=>{this.options.getReplayPlayer()?.setFreeCameraPreset("overhead"),this.lastFreeCameraPreset="overhead",this.options.requestConfigSync()},{signal:e}),t.cameraViewSideButton.addEventListener("click",()=>{this.options.getReplayPlayer()?.setFreeCameraPreset("side"),this.lastFreeCameraPreset="side",this.options.requestConfigSync()},{signal:e}),t.ballCam.addEventListener("change",()=>{this.options.getReplayPlayer()?.setBallCamEnabled(t.ballCam.checked),this.options.requestConfigSync()},{signal:e})}setTransportEnabled(e,t){this.options.elements.attachedPlayer.disabled=!e,this.syncModeButtons(e?t:void 0)}syncState(e){const{elements:t}=this.options;t.cameraDistance.value=`${e.cameraDistanceScale}`,t.cameraDistanceReadout.textContent=`${e.cameraDistanceScale.toFixed(2)}x`,t.customCameraSettings.checked=e.customCameraSettings!==null,t.cameraSettingsControls.hidden=!t.customCameraSettings.checked,this.syncCustomCameraSettingControls(this.getEffectiveCameraSettings(e)),t.ballCam.checked=e.ballCamEnabled,t.attachedPlayer.value=e.attachedPlayerId??"",this.syncAvailability(e),this.renderProfile(e)}syncAvailability(e){this.syncModeButtons(e);const i=this.options.getReplayPlayer()!==null&&e?.cameraViewMode==="follow"&&(e.attachedPlayerId??null)!==null;this.options.elements.cameraDistance.disabled=!i,this.options.elements.customCameraSettings.disabled=!i,this.setCameraSettingControlsEnabled(i&&e?.customCameraSettings!==null),this.options.elements.ballCam.disabled=!i}syncModeButtons(e){const t=e?.cameraViewMode??"free",i=this.options.getReplayPlayer()!==null&&e!==void 0,a=(e?.attachedPlayerId??null)!==null;for(const o of ZL){const l=this.getCameraViewButton(o);l.disabled=!i||o==="follow"&&!a;const c=o===t;l.dataset.active=c?"true":"false",l.setAttribute("aria-pressed",c?"true":"false")}const{cameraViewOverheadButton:s,cameraViewSideButton:r}=this.options.elements;s.disabled=!i,r.disabled=!i,s.dataset.active="false",r.dataset.active="false",s.setAttribute("aria-pressed","false"),r.setAttribute("aria-pressed","false")}populateAttachedPlayerOptions(e){const{attachedPlayer:t}=this.options.elements;t.replaceChildren(),t.append(new Option("Free camera",""));for(const i of e)t.append(new Option(`${i.name} (${i.isTeamZero?"Blue":"Orange"})`,i.id))}renderProfile(e){const t=this.options.elements,i=this.options.getReplayPlayer(),a=e?.attachedPlayerId??null;if(!i||e?.cameraViewMode!=="follow"||a===null){this.renderEmptyProfile("Free camera");return}const s=i.replay.players.find(o=>o.id===a);if(!s){this.renderEmptyProfile("Unknown");return}const r=this.getEffectiveCameraSettings(e);t.cameraProfileReadout.textContent=e.customCameraSettings===null?s.name:`${s.name} custom`,t.cameraFovReadout.textContent=yn(r.fov,"",0),t.cameraHeightReadout.textContent=yn(r.height,"",0),t.cameraPitchReadout.textContent=yn(r.pitch,"",0),t.cameraBaseDistanceReadout.textContent=yn(r.distance,"",0),t.cameraStiffnessReadout.textContent=yn(r.stiffness,"",2)}getFallbackCameraSettings(){return{fov:110,height:100,pitch:-4,distance:270,stiffness:0,swivelSpeed:1,transitionSpeed:1}}getAttachedPlayerCameraSettings(e){const t=this.options.getReplayPlayer();return!t||e===null?null:t.replay.players.find(i=>i.id===e)?.cameraSettings??null}getEffectiveCameraSettings(e){return{...this.getFallbackCameraSettings(),...this.getAttachedPlayerCameraSettings(e.attachedPlayerId)??{},...e.customCameraSettings??{}}}readCustomCameraSettings(){const e=this.options.elements;return{fov:Number(e.customCameraFov.value),height:Number(e.customCameraHeight.value),pitch:Number(e.customCameraPitch.value),distance:Number(e.customCameraDistance.value),stiffness:Number(e.customCameraStiffness.value),swivelSpeed:Number(e.customCameraSwivelSpeed.value),transitionSpeed:Number(e.customCameraTransitionSpeed.value)}}setCameraSettingControlsEnabled(e){const t=this.options.elements;t.cameraSettingsControls.hidden=!t.customCameraSettings.checked,t.customCameraFov.disabled=!e,t.customCameraHeight.disabled=!e,t.customCameraPitch.disabled=!e,t.customCameraDistance.disabled=!e,t.customCameraStiffness.disabled=!e,t.customCameraSwivelSpeed.disabled=!e,t.customCameraTransitionSpeed.disabled=!e}syncCustomCameraSettingControls(e){const t=this.options.elements,i=this.getFallbackCameraSettings(),a=e.fov??i.fov,s=e.height??i.height,r=e.pitch??i.pitch,o=e.distance??i.distance,l=e.stiffness??i.stiffness,c=e.swivelSpeed??i.swivelSpeed,u=e.transitionSpeed??i.transitionSpeed;t.customCameraFov.value=`${a}`,t.customCameraHeight.value=`${s}`,t.customCameraPitch.value=`${r}`,t.customCameraDistance.value=`${o}`,t.customCameraStiffness.value=`${l}`,t.customCameraSwivelSpeed.value=`${c}`,t.customCameraTransitionSpeed.value=`${u}`,t.customCameraFovReadout.textContent=yn(a,"",0),t.customCameraHeightReadout.textContent=yn(s,"",0),t.customCameraPitchReadout.textContent=yn(r,"",0),t.customCameraDistanceReadout.textContent=yn(o,"",0),t.customCameraStiffnessReadout.textContent=yn(l,"",2),t.customCameraSwivelSpeedReadout.textContent=yn(c,"",1),t.customCameraTransitionSpeedReadout.textContent=yn(u,"",2)}getCameraViewButton(e){switch(e){case"free":return this.options.elements.cameraViewFreeButton;case"follow":return this.options.elements.cameraViewFollowButton}}renderEmptyProfile(e){const t=this.options.elements;t.cameraProfileReadout.textContent=e,t.cameraFovReadout.textContent="--",t.cameraHeightReadout.textContent="--",t.cameraPitchReadout.textContent="--",t.cameraBaseDistanceReadout.textContent="--",t.cameraStiffnessReadout.textContent="--"}}function yn(n,e="",t=0){return n===void 0||Number.isNaN(n)?"--":`${n.toFixed(t)}${e}`}function QL(n){return new JL(n)}const e2=236,hr=4120,t2=2300,n2=16185075,i2=.18,a2=1118481,qo=5882879,Ko=16761180,s2=.55,Kc=.12,gm=.28,r2=3,o2=4,vm=5,ym=2,l2=6,c2=856343,u2=.42,d2=18,f2=.24,p2=10,bm=220,h2=200,ly=140,m2=220,_2=100,g2=120;function v2(n){const e=h2/2;if(n){const a=-hr+bm,s=-e;return{minX:a,maxX:s,centerX:(a+s)/2,width:s-a}}const t=e,i=hr-bm;return{minX:t,maxX:i,centerX:(t+i)/2,width:i-t}}function y2(n,e,t){if(n.length<2)return[];const i=Math.min(...n),a=Math.max(...n),s=a-i,r=e?-1:1,o=-r;return s<=t?[{kind:"other",centerY:(i+a)/2,halfDepth:Math.max(t-s/2,t*.35),directions:[r,o]}]:[{kind:"back",centerY:e?i:a,halfDepth:t,directions:[r]},{kind:"forward",centerY:e?a:i,halfDepth:t,directions:[o]}]}function b2(n,e){const t=new uf;return t.moveTo(0,e/2),t.lineTo(n/2,-e/2),t.lineTo(-n/2,-e/2),t.closePath(),new Pl(t)}function Sm(n){const e=_2*n,t=new ct({color:a2,transparent:!0,opacity:.9,side:et,depthWrite:!1,depthTest:!1}),i=new pt;i.visible=!1;const a=new nn(ly*.55*n,1),s=new ze(a,t);s.position.z=vm,s.renderOrder=22,i.add(s);const r=b2(g2*n,e),o=new ze(r,t);return o.position.z=vm,o.renderOrder=23,i.add(o),{group:i,shaftGeom:a,shaftMesh:s,headGeom:r,headMesh:o,material:t,headLength:e}}function Yc(n,e,t,i){const a=Math.max(t-n.headLength,n.headLength*.2);n.group.position.x=e,n.group.rotation.z=i>0?0:Math.PI,n.shaftMesh.scale.y=a,n.shaftMesh.position.y=-n.headLength/2,n.headMesh.position.y=t/2-n.headLength/2,n.group.visible=!0}function dl(n){n.group.visible=!1}function Ha(n,e){const t=new pt;t.visible=!1;const i=new ct({color:n2,transparent:!0,opacity:i2,side:et,depthWrite:!1,depthTest:!1}),a=new nn(1,1),s=new ze(a,i);s.position.z=r2,s.renderOrder=20,t.add(s);const r=new ct({color:e,transparent:!0,opacity:s2,side:et,depthWrite:!1,depthTest:!1}),o=new nn(1,1),l=new ze(o,r);l.position.z=o2,l.renderOrder=21,t.add(l);const c=Sm(n),u=Sm(n);return t.add(c.group),t.add(u.group),{group:t,floorGeom:a,floorMesh:s,floorMaterial:i,stripeGeom:o,stripeMesh:l,stripeMaterial:r,primaryMarker:c,secondaryMarker:u}}function S2(n){n.group.visible=!1,dl(n.primaryMarker),dl(n.secondaryMarker)}function x2(n,e,t,i){const a=e.halfDepth*2*i,s=hr*2*i,r=t.width*i,o=t.centerX*i,l=ly*i,c=Math.max(a-32*i,n.primaryMarker.headLength*1.15),u=Math.min(c,Math.max(m2*i,a*.6));if(n.group.position.y=e.centerY*i,n.floorMesh.position.x=0,n.floorMesh.scale.set(s,a,1),n.stripeMesh.position.x=o,n.stripeMesh.scale.set(l,a,1),dl(n.primaryMarker),dl(n.secondaryMarker),e.directions.length===1)Yc(n.primaryMarker,o,u,e.directions[0]);else{const d=r*.18;Yc(n.primaryMarker,o-d,u,e.directions[0]),Yc(n.secondaryMarker,o+d,u,e.directions[1])}n.group.visible=!0}function xm(n){n.group.removeFromParent(),n.shaftGeom.dispose(),n.headGeom.dispose(),n.material.dispose()}class w2{replay;blueBack;blueForward;blueOther;orangeBack;orangeForward;orangeOther;constructor(e,t,i){this.replay=t,this.blueBack=Ha(i,qo),this.blueForward=Ha(i,qo),this.blueOther=Ha(i,qo),this.orangeBack=Ha(i,Ko),this.orangeForward=Ha(i,Ko),this.orangeOther=Ha(i,Ko);for(const a of this.getZones())e.add(a.group)}update(e,t){const{frameIndex:i}=e,a=e2;for(const s of[!0,!1]){const r=this.replay.players.filter(d=>d.isTeamZero===s).length,o=[];for(const d of this.replay.players){if(d.isTeamZero!==s)continue;const f=d.frames[i];f?.position&&o.push(f.position.y)}const l=v2(s),c=this.getTeamZones(s);for(const d of c.values())S2(d);if(r<2||o.length!==r)continue;const u=y2(o,s,a);for(const d of u){const f=c.get(d.kind);f&&x2(f,d,l,t)}}}dispose(){for(const e of this.getZones())e.group.removeFromParent(),e.floorGeom.dispose(),e.floorMaterial.dispose(),e.stripeGeom.dispose(),e.stripeMaterial.dispose(),xm(e.primaryMarker),xm(e.secondaryMarker)}getTeamZones(e){return e?new Map([["back",this.blueBack],["forward",this.blueForward],["other",this.blueOther]]):new Map([["back",this.orangeBack],["forward",this.orangeForward],["other",this.orangeOther]])}getZones(){return[this.blueBack,this.blueForward,this.blueOther,this.orangeBack,this.orangeForward,this.orangeOther]}}function E2(n){return n==null||Number.isNaN(n)?null:n<0?"team-zero":"team-one"}class M2{group;teamZeroSide;teamOneSide;constructor(e,t){this.group=new pt,this.teamZeroSide=this.createHalfFieldSide(qo),this.teamOneSide=this.createHalfFieldSide(Ko);const i=hr*t,a=5120*t;this.teamZeroSide.mesh.position.set(0,-a/2,ym),this.teamZeroSide.mesh.scale.set(i*2,a,1),this.teamOneSide.mesh.position.set(0,a/2,ym),this.teamOneSide.mesh.scale.set(i*2,a,1),this.group.add(this.teamZeroSide.mesh),this.group.add(this.teamOneSide.mesh),e.add(this.group)}update(e){const t=E2(e);this.teamZeroSide.material.opacity=t==="team-zero"?gm:Kc,this.teamOneSide.material.opacity=t==="team-one"?gm:Kc}dispose(){this.group.removeFromParent(),this.teamZeroSide.mesh.geometry.dispose(),this.teamZeroSide.material.dispose(),this.teamOneSide.mesh.geometry.dispose(),this.teamOneSide.material.dispose()}createHalfFieldSide(e){const t=new nn(1,1),i=new ct({color:e,transparent:!0,opacity:Kc,side:et,depthWrite:!1,depthTest:!1}),a=new ze(t,i);return a.renderOrder=18,{mesh:a,material:i}}}function T2(n,e){const t=new pt,i=hr*2*e,a=(s,r,o)=>{const l=new nn(i,r*e),c=new ct({color:c2,transparent:!0,opacity:o,side:et,depthWrite:!1,depthTest:!1}),u=new ze(l,c);return u.position.set(0,s,l2),u.renderOrder=24,u};for(const s of[-1,1]){const r=s*t2*e;t.add(a(r,d2,u2))}return t.add(a(0,p2,f2)),n.add(t),t}function Pt(n){return n===void 0||Number.isNaN(n)?"?":`${Math.round(n)}`}function xd(n,e,t=1){return n===void 0||e===void 0||Number.isNaN(n)||Number.isNaN(e)||e<=0?"?":`${(n*100/e).toFixed(t)}%`}function An(n,e){return`<div class="stat-row"><span class="label">${n}</span><span class="value">${e}</span></div>`}function C2(n,e){return`
      ${An("50s",Pt(n?.count))}
      ${An("Blue wins",`${Pt(n?.wins)} (${xd(n?.wins,n?.count)})`)}
      ${An("Orange wins",`${Pt(n?.losses)} (${xd(n?.losses,n?.count)})`)}
      ${An("Neutral",Pt(n?.neutral_outcomes))}
      ${An("Blue poss after",Pt(n?.possession_after_count))}
      ${An("Orange poss after",Pt(n?.opponent_possession_after_count))}
      ${An("Kickoff 50s",Pt(n?.kickoff_count))}
      ${An("Blue kickoff wins",Pt(n?.kickoff_wins))}
      ${An("Orange kickoff wins",Pt(n?.kickoff_losses))}
      ${An("Blue kickoff poss",Pt(n?.kickoff_possession_after_count))}
      ${An("Orange kickoff poss",Pt(n?.kickoff_opponent_possession_after_count))}
    `}function wm(n){return`
    <div class="stat-row"><span class="label">50s</span><span class="value">${Pt(n?.count)}</span></div>
    <div class="stat-row"><span class="label">Wins</span><span class="value">${Pt(n?.wins)} (${xd(n?.wins,n?.count)})</span></div>
    <div class="stat-row"><span class="label">Losses</span><span class="value">${Pt(n?.losses)}</span></div>
    <div class="stat-row"><span class="label">Neutral</span><span class="value">${Pt(n?.neutral_outcomes)}</span></div>
    <div class="stat-row"><span class="label">Poss after</span><span class="value">${Pt(n?.possession_after_count)}</span></div>
    <div class="stat-row"><span class="label">Kickoff 50s</span><span class="value">${Pt(n?.kickoff_count)}</span></div>
    <div class="stat-row"><span class="label">Kickoff wins</span><span class="value">${Pt(n?.kickoff_wins)}</span></div>
    <div class="stat-row"><span class="label">Kickoff poss</span><span class="value">${Pt(n?.kickoff_possession_after_count)}</span></div>
  `}function A2(n,e=1,t=""){return n===void 0||Number.isNaN(n)?"?":`${n.toFixed(e)}${t}`}function R2(n,e,t=1){return n===void 0||e===void 0||Number.isNaN(n)||Number.isNaN(e)||e<=0?"?":`${(n*100/e).toFixed(t)}%`}function Em(n,e,t=1){if(n===void 0||Number.isNaN(n))return"?";const i=R2(n,e,t);return i==="?"?`${n.toFixed(t)}s`:`${n.toFixed(t)}s (${i})`}function Mm(n){return n.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function wd(n,e){return`<div class="stat-row"><span class="label">${Mm(n)}</span><span class="value">${Mm(e)}</span></div>`}function P2(n){const e=new Set,t=[];for(const i of n??[])e.has(i)||(e.add(i),t.push(i));return t}function cy(n,e){return n==="neutral"?"Neutral":e.kind==="shared"?n==="own"?"Blue control":"Orange control":n==="own"?"Team control":"Opp control"}function Ed(n){return n.kind==="shared"?["own","neutral","opponent"]:["own","neutral","opponent"]}function L2(n,e){return n==="neutral_third"?"Neutral third":e.kind==="shared"?n==="defensive_third"?"Blue third":"Orange third":n==="defensive_third"?"Own third":"Opp third"}function N2(n){return n.kind==="shared"?["defensive_third","neutral_third","offensive_third"]:["defensive_third","neutral_third","offensive_third"]}function I2(n,e,t,i){for(const a of t){const s=a==="possession_state"?Ed(i):N2(i),r=s.indexOf(n[a]),o=s.indexOf(e[a]),l=r===-1?Number.MAX_SAFE_INTEGER:r,c=o===-1?Number.MAX_SAFE_INTEGER:o;if(l!==c)return l-c}return 0}function k2(n,e,t){const i=(a,s)=>a==="possession_state"?cy(s,t):L2(s,t);if(e.length===1){const a=e[0];return i(a,n[a])}return e.map(a=>i(a,n[a])).join(" / ")}function D2(n,e,t,i){if(e.length===0)return"";const a=new Map;if(n?.labeled_time?.entries?.length)for(const s of n.labeled_time.entries){const r=new Map(s.labels.map(d=>[d.key,d.value])),o={};let l=!0;for(const d of e){const f=r.get(d);if(f===void 0){l=!1;break}o[d]=f}if(!l)continue;const c=e.map(d=>`${d}:${o[d]}`).join("|"),u=a.get(c);u?u.total+=s.value:a.set(c,{values:o,total:s.value})}if(a.size===0&&e.length===1&&e[0]==="possession_state"){const s=new Map;return n&&(s.set("own",n.possession_time),s.set("neutral",n.neutral_time??0),s.set("opponent",n.opponent_possession_time)),Ed(i).some(r=>(s.get(r)??0)>0)?Ed(i).filter(r=>s.has(r)).map(r=>wd(cy(r,i),Em(s.get(r),t))).join(""):""}return[...a.values()].sort((s,r)=>I2(s.values,r.values,e,i)).map(s=>wd(k2(s.values,e,i),Em(s.total,t))).join("")}function Tm(n,e){const t=n?.tracked_time,i=P2(e.breakdownClasses),a=D2(n,i,t,e.labelPerspective);return`
    ${wd("Tracked",A2(t,1,"s"))}
    ${a}
  `}function F2(n,e=1,t=""){return n===void 0||Number.isNaN(n)?"?":`${n.toFixed(e)}${t}`}function O2(n,e,t=1){return n===void 0||e===void 0||Number.isNaN(n)||Number.isNaN(e)||e<=0?"?":`${(n*100/e).toFixed(t)}%`}function U2(n,e,t=1){if(n===void 0||Number.isNaN(n))return"?";const i=O2(n,e,t);return i==="?"?`${n.toFixed(t)}s`:`${n.toFixed(t)}s (${i})`}function Cm(n){return n.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function uy(n,e){return`<div class="stat-row"><span class="label">${Cm(n)}</span><span class="value">${Cm(e)}</span></div>`}function B2(n,e){return n==="neutral"?"Neutral zone":e.kind==="shared"?n==="defensive_half"?"Blue side":"Orange side":n==="defensive_half"?"Own half":"Opp half"}function z2(n,e,t){const i=new Map;if(n&&(i.set("defensive_half",n.defensive_half_time),i.set("neutral",n.neutral_time??0),i.set("offensive_half",n.offensive_half_time)),n?.labeled_time?.entries?.length){i.clear();for(const s of n.labeled_time.entries){const r=s.labels.find(o=>o.key==="field_half")?.value;r&&i.set(r,(i.get(r)??0)+s.value)}}const a=["defensive_half","neutral","offensive_half"];return a.some(s=>(i.get(s)??0)>0)?a.filter(s=>i.has(s)).map(s=>uy(B2(s,t),U2(i.get(s),e))).join(""):""}function Am(n,e){const t=n?.tracked_time,i=z2(n,t,e.labelPerspective);return`
    ${i.length===0?uy("Tracked",F2(t,1,"s")):""}
    ${i}
  `}function Ji(n){return n===void 0||Number.isNaN(n)?"?":`${Math.round(n)}`}function Qi(n,e){return`<div class="stat-row"><span class="label">${n}</span><span class="value">${e}</span></div>`}function jc(n){return`
    ${Qi("Rushes",Ji(n?.count))}
    ${Qi("2v1",Ji(n?.two_v_one_count))}
    ${Qi("2v2",Ji(n?.two_v_two_count))}
    ${Qi("2v3",Ji(n?.two_v_three_count))}
    ${Qi("3v1",Ji(n?.three_v_one_count))}
    ${Qi("3v2",Ji(n?.three_v_two_count))}
    ${Qi("3v3",Ji(n?.three_v_three_count))}
  `}const Rm="subtr-actor-fifty-fifty-overlay-styles",H2=5882879,V2=16761180,G2=15988472,$2=180,W2=4;function Md(n){if(!n)return null;const[e,t]=Object.entries(n)[0]??["Unknown","unknown"],i=typeof t=="string"?t:JSON.stringify(t);return`${e}:${i}`}function Pm(n,e){const t=Md(e);return t?n.players.find(i=>i.id===t)?.name??t:"Unknown"}function X2(n,e){const t=Pm(e,n.team_zero_player),i=Pm(e,n.team_one_player),a=n.is_kickoff?"Kickoff 50/50":"50/50",s=n.winning_team_is_team_0===void 0?null:n.winning_team_is_team_0,r=n.possession_team_is_team_0===void 0?null:n.possession_team_is_team_0,o=s===null?"neutral":s?"blue win":"orange win",l=r===null?"neutral poss":r?"blue poss":"orange poss",c=s===null?"sap-fifty-fifty-overlay-label-neutral":s?"sap-fifty-fifty-overlay-label-blue":"sap-fifty-fifty-overlay-label-orange";return{text:`${a}: ${t} vs ${i} | ${o} | ${l}`,className:c,winnerIsTeamZero:s}}function dy(n,e){return n.events.fifty_fifty.map(t=>{const i=X2(t,e),a=new L(...t.team_zero_position),s=new L(...t.team_one_position),r=new L(...t.midpoint),o=e.frames[t.start_frame]?.time??t.start_time;return{id:`fifty-fifty:${t.start_frame}:${Md(t.team_zero_player)}:${Md(t.team_one_player)}`,time:o,frame:t.start_frame,label:i.text,labelClassName:i.className,axisStart:a,axisEnd:s,midpoint:r,winnerIsTeamZero:i.winnerIsTeamZero}})}function q2(n,e,t){const i=Math.max(.1,t);return n.filter(a=>{const s=e-a.time;return s>=0&&s<=i})}function K2(){if(document.getElementById(Rm))return;const n=document.createElement("style");n.id=Rm,n.textContent=`
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
  `,document.head.append(n)}function Y2(n,e,t,i){if(i.copy(n).project(e),i.z<-1||i.z>1)return!1;const a=t.clientWidth||1,s=t.clientHeight||1;return i.x=(i.x+1)*a/2,i.y=(1-i.y)*s/2,!(i.x<-100||i.x>a+100||i.y<-100||i.y>s+100)}class j2{scene;container;group=new pt;labelRoot;projectedPosition=new L;worldPosition=new L;labelOffset=new L(0,0,$2);markers;views=new Map;changedContainerPosition=!1;originalContainerPosition="";decaySeconds=W2;constructor(e,t,i,a){K2(),this.scene=e,this.container=t,this.markers=dy(a,i),getComputedStyle(t).position==="static"&&(this.changedContainerPosition=!0,this.originalContainerPosition=t.style.position,t.style.position="relative"),this.group.name="fifty-fifty-overlay",this.scene.replayRoot.add(this.group),this.labelRoot=document.createElement("div"),this.labelRoot.className="sap-fifty-fifty-overlay-root",this.container.append(this.labelRoot)}update(e){const t=q2(this.markers,e,this.decaySeconds),i=new Set(t.map(a=>a.id));for(const[a,s]of this.views.entries())i.has(a)||(s.line.removeFromParent(),s.line.geometry.dispose(),s.material.dispose(),s.label.remove(),this.views.delete(a));for(const a of t){const s=Math.max(0,e-a.time),r=Math.max(0,1-s/this.decaySeconds),o=this.ensureView(a),l=.12+.78*r;o.material.opacity=l;const c=o.line.geometry.getAttribute("position");c.setXYZ(0,a.axisStart.x,a.axisStart.y,a.axisStart.z+24),c.setXYZ(1,a.axisEnd.x,a.axisEnd.y,a.axisEnd.z+24),c.needsUpdate=!0,this.worldPosition.copy(a.midpoint).add(this.labelOffset),this.scene.replayRoot.localToWorld(this.worldPosition),Y2(this.worldPosition,this.scene.camera,this.container,this.projectedPosition)?(o.label.hidden=!1,o.label.style.opacity=`${.24+.76*r}`,o.label.style.transform=`translate(${this.projectedPosition.x.toFixed(1)}px, ${this.projectedPosition.y.toFixed(1)}px) translate(-50%, -100%)`):o.label.hidden=!0}}dispose(){for(const e of this.views.values())e.line.removeFromParent(),e.line.geometry.dispose(),e.material.dispose(),e.label.remove();this.views.clear(),this.group.removeFromParent(),this.labelRoot.remove(),this.changedContainerPosition&&(this.container.style.position=this.originalContainerPosition,this.changedContainerPosition=!1)}ensureView(e){const t=this.views.get(e.id);if(t)return t;const i=new Dt().setFromPoints([e.axisStart,e.axisEnd]),a=new Mr({color:e.winnerIsTeamZero===null?G2:e.winnerIsTeamZero?H2:V2,transparent:!0,opacity:.9}),s=new Cl(i,a);s.renderOrder=3,this.group.add(s);const r=document.createElement("div");r.className=`sap-fifty-fifty-overlay-label ${e.labelClassName}`,r.textContent=e.label,this.labelRoot.append(r);const o={marker:e,line:s,material:a,label:r};return this.views.set(e.id,o),o}}const Lm="subtr-actor-ceiling-shot-overlay-styles",Z2=5882879,J2=16761180,Q2=16185075,eN=140,tN=215,nN=220,iN=4.5;function fy(n){if(!n)return null;const[e,t]=Object.entries(n)[0]??["Unknown","unknown"],i=typeof t=="string"?t:JSON.stringify(t);return`${e}:${i}`}function aN(n,e){const t=fy(e);return t?n.players.find(i=>i.id===t)?.name??t:"Unknown"}function sN(n,e){return n.events.ceiling_shot.map(t=>{const i=aN(e,t.player),a=fy(t.player),s=e.frames[t.frame]?.time??t.time,r=t.confidence;return{id:`ceiling-shot:${t.frame}:${a}:${Math.round(r*1e3)}`,time:s,frame:t.frame,isTeamZero:t.is_team_0,playerId:a,playerName:i,ceilingContactPosition:{x:t.ceiling_contact_position[0],y:t.ceiling_contact_position[1],z:t.ceiling_contact_position[2]},touchPosition:{x:t.touch_position[0],y:t.touch_position[1],z:t.touch_position[2]},quality:r,qualityLabel:`${Math.round(r*100)}%`}})}function rN(n,e,t){const i=Math.max(.1,t);return n.filter(a=>{const s=e-a.time;return s>=0&&s<=i})}function oN(){if(document.getElementById(Lm))return;const n=document.createElement("style");n.id=Lm,n.textContent=`
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
  `,document.head.append(n)}function lN(n,e,t,i){if(i.copy(n).project(e),i.z<-1||i.z>1)return!1;const a=t.clientWidth||1,s=t.clientHeight||1;return i.x=(i.x+1)*a/2,i.y=(1-i.y)*s/2,!(i.x<-100||i.x>a+100||i.y<-100||i.y>s+100)}class cN{scene;container;group=new pt;labelRoot;projectedPosition=new L;worldPosition=new L;labelOffset=new L(0,0,nN);markers;views=new Map;changedContainerPosition=!1;originalContainerPosition="";decaySeconds=iN;constructor(e,t,i,a){oN(),this.scene=e,this.container=t,this.markers=sN(a,i),getComputedStyle(t).position==="static"&&(this.changedContainerPosition=!0,this.originalContainerPosition=t.style.position,t.style.position="relative"),this.group.name="ceiling-shot-overlay",this.scene.replayRoot.add(this.group),this.labelRoot=document.createElement("div"),this.labelRoot.className="sap-ceiling-shot-overlay-root",this.container.append(this.labelRoot)}update(e){const t=rN(this.markers,e,this.decaySeconds),i=new Set(t.map(a=>a.id));for(const[a,s]of this.views.entries())i.has(a)||(s.ring.removeFromParent(),s.ring.geometry.dispose(),s.ringMaterial.dispose(),s.beam.removeFromParent(),s.beamGeometry.dispose(),s.beamMaterial.dispose(),s.label.remove(),this.views.delete(a));for(const a of t){const s=Math.max(0,e-a.time),r=Math.max(0,1-s/this.decaySeconds),o=this.ensureView(a),l=.14+.6*r,c=.94+(1-r)*.18;o.ringMaterial.opacity=l,o.beamMaterial.opacity=.18+.55*r,o.ring.position.set(a.touchPosition.x,a.touchPosition.y,a.touchPosition.z+12),o.ring.scale.setScalar(c+a.quality*.08),this.worldPosition.set(a.touchPosition.x,a.touchPosition.y,a.touchPosition.z).add(this.labelOffset);const u=lN(this.worldPosition,this.scene.camera,this.container,this.projectedPosition);o.label.style.display=u?"block":"none",u&&(o.label.style.left=`${this.projectedPosition.x}px`,o.label.style.top=`${this.projectedPosition.y}px`,o.label.style.opacity=`${.42+.58*r}`)}}dispose(){for(const e of this.views.values())e.ring.removeFromParent(),e.ring.geometry.dispose(),e.ringMaterial.dispose(),e.beam.removeFromParent(),e.beamGeometry.dispose(),e.beamMaterial.dispose(),e.label.remove();this.views.clear(),this.group.removeFromParent(),this.labelRoot.remove(),this.changedContainerPosition&&(this.container.style.position=this.originalContainerPosition)}ensureView(e){const t=this.views.get(e.id);if(t)return t;const i=e.quality>=.8?Q2:e.isTeamZero?Z2:J2,a=new ct({color:i,transparent:!0,opacity:.8,side:et,depthWrite:!1,depthTest:!1}),s=new _a(eN,tN,48),r=new ze(s,a);r.renderOrder=30,this.group.add(r);const o=new Dt().setFromPoints([new L(e.ceilingContactPosition.x,e.ceilingContactPosition.y,e.ceilingContactPosition.z),new L(e.touchPosition.x,e.touchPosition.y,e.touchPosition.z)]),l=new Mr({color:i,transparent:!0,opacity:.7,depthWrite:!1,depthTest:!1}),c=new Cl(o,l);c.renderOrder=29,this.group.add(c);const u=document.createElement("div");u.className=`sap-ceiling-shot-overlay-label ${e.isTeamZero?"sap-ceiling-shot-overlay-label-blue":"sap-ceiling-shot-overlay-label-orange"}`,u.textContent=`${e.playerName} ceiling shot ${e.qualityLabel}`,this.labelRoot.append(u);const d={marker:e,ring:r,ringMaterial:a,beam:c,beamGeometry:o,beamMaterial:l,label:u};return this.views.set(e.id,d),d}}const Nm="subtr-actor-touch-overlay-styles",Im=5882879,km=16761180,uN=120,dN=196,Zc=24,Dm=210,Fm=5,fN=.1,pN=48;function zt(n){const[e,t]=Object.entries(n)[0]??["Unknown","unknown"],i=typeof t=="string"?t:JSON.stringify(t);return`${e}:${i}`}function Jc(n,e){return Math.max(0,n-e)}function hN(n,e){if(e==="markers")return n.playerName;const t=Math.round(n.totalBallAdvanceDistance),i=Math.round(n.totalBallRetreatDistance);return t>0&&i>0?`${n.playerName} +${t} / -${i} uu`:i>0?`${n.playerName} -${i} uu`:`${n.playerName} +${t} uu`}function py(n,e){const t=new Map,i=[],a=[...(n.events?.touch??[]).map((s,r)=>({kind:"touch",frame:s.frame,time:s.time,index:r,event:s})),...(n.events?.touch_ball_movement??[]).map((s,r)=>({kind:"movement",frame:s.frame,time:s.time,index:r,event:s}))].sort((s,r)=>s.frame!==r.frame?s.frame-r.frame:s.time!==r.time?s.time-r.time:s.kind!==r.kind?s.kind==="touch"?-1:1:s.index-r.index);for(const s of a){if(s.kind==="touch"){const d=s.event,f=zt(d.player),p=e.ballFrames[d.frame]?.position;if(!p)continue;const _=i.length;i.push({id:`touch-stat:${d.frame}:${f}:${_+1}`,time:e.frames[d.frame]?.time??d.time,frame:d.frame,isTeamZero:d.is_team_0,playerId:f,playerName:e.players.find(g=>g.id===f)?.name??f,position:{x:p.x,y:p.y,z:p.z},endPosition:{x:p.x,y:p.y,z:p.z},totalBallTravelDistance:0,totalBallAdvanceDistance:0,totalBallRetreatDistance:0}),t.set(f,_);continue}const r=s.event,o=zt(r.player),l=t.get(o),c=e.ballFrames[r.frame]?.position;if(l===void 0||!c)continue;const u=i[l];u&&(u.totalBallTravelDistance+=Jc(r.travel_distance,0),u.totalBallAdvanceDistance+=Jc(r.advance_distance,0),u.totalBallRetreatDistance+=Jc(r.retreat_distance,0),u.endPosition={x:c.x,y:c.y,z:c.z})}return i}function mN(n,e,t){const i=Math.max(.1,t);return n.filter(a=>{const s=e-a.time;return s>=0&&s<=i})}function _N(){if(document.getElementById(Nm))return;const n=document.createElement("style");n.id=Nm,n.textContent=`
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
  `,document.head.append(n)}function gN(n,e,t,i){if(i.copy(n).project(e),i.z<-1||i.z>1)return!1;const a=t.clientWidth||1,s=t.clientHeight||1;return i.x=(i.x+1)*a/2,i.y=(1-i.y)*s/2,!(i.x<-100||i.x>a+100||i.y<-100||i.y>s+100)}function hy(n){return[n.line.material,n.cone.material].flatMap(e=>Array.isArray(e)?e:[e])}function Om(n,e){for(const t of hy(n))t.transparent=!0,t.opacity=e,t.depthWrite=!1,t.depthTest=!1}function Um(n){n.removeFromParent(),n.line.geometry.dispose(),n.cone.geometry.dispose();for(const e of hy(n))e.dispose()}class vN{scene;container;group=new pt;labelRoot;projectedPosition=new L;worldPosition=new L;arrowStart=new L;arrowEnd=new L;arrowDirection=new L;labelOffset=new L(0,0,Dm);markers;views=new Map;changedContainerPosition=!1;originalContainerPosition="";decaySeconds=Fm;mode="markers";constructor(e,t,i,a,s){_N(),this.scene=e,this.container=t,this.decaySeconds=Math.max(.1,s?.decaySeconds??Fm),this.mode=s?.mode??"markers",this.labelOffset.set(0,0,Dm),this.markers=py(a,i),getComputedStyle(t).position==="static"&&(this.changedContainerPosition=!0,this.originalContainerPosition=t.style.position,t.style.position="relative"),this.group.name="touch-event-overlay",this.scene.replayRoot.add(this.group),this.labelRoot=document.createElement("div"),this.labelRoot.className="sap-touch-overlay-root",this.container.append(this.labelRoot)}getDecaySeconds(){return this.decaySeconds}setDecaySeconds(e){this.decaySeconds=Math.max(.1,e)}getMode(){return this.mode}setMode(e){this.mode=e}update(e){const t=mN(this.markers,e,this.decaySeconds),i=new Set(t.map(a=>a.id));for(const[a,s]of this.views.entries())i.has(a)||(s.ring.removeFromParent(),s.ring.geometry.dispose(),s.material.dispose(),Um(s.arrow),s.label.remove(),this.views.delete(a));for(const a of t){const s=Math.max(0,e-a.time),r=Math.max(0,1-s/this.decaySeconds),o=this.ensureView(a),l=.1+.6*r,c=.95+(1-r)*.28;o.material.opacity=l,o.ring.position.set(a.position.x,a.position.y,a.position.z+Zc),o.ring.scale.setScalar(c),o.label.textContent=hN(a,this.mode),o.label.classList.toggle("sap-touch-overlay-label-advancement",this.mode==="advancement"),this.updateArrow(o,a,l),this.worldPosition.set(a.position.x,a.position.y,a.position.z),this.worldPosition.add(this.labelOffset),this.scene.replayRoot.localToWorld(this.worldPosition),gN(this.worldPosition,this.scene.camera,this.container,this.projectedPosition)?(o.label.hidden=!1,o.label.style.opacity=`${.22+.78*r}`,o.label.style.transform=`translate(${this.projectedPosition.x.toFixed(1)}px, ${this.projectedPosition.y.toFixed(1)}px) translate(-50%, -100%)`):o.label.hidden=!0}}dispose(){for(const e of this.views.values())e.ring.removeFromParent(),e.ring.geometry.dispose(),e.material.dispose(),Um(e.arrow),e.label.remove();this.views.clear(),this.group.removeFromParent(),this.labelRoot.remove(),this.changedContainerPosition&&(this.container.style.position=this.originalContainerPosition,this.changedContainerPosition=!1)}ensureView(e){const t=this.views.get(e.id);if(t)return t;const i=new ct({color:e.isTeamZero?Im:km,transparent:!0,opacity:.7,side:et,depthWrite:!1,depthTest:!1}),a=new ze(new _a(uN,dN,48),i);a.rotation.x=-Math.PI/2,a.renderOrder=40,this.group.add(a);const s=new YS(new L(0,1,0),new L,1,e.isTeamZero?Im:km,1,1);s.visible=!1,s.renderOrder=45,s.line.renderOrder=45,s.cone.renderOrder=45,Om(s,.7),this.group.add(s);const r=document.createElement("div");r.className=`sap-touch-overlay-label ${e.isTeamZero?"sap-touch-overlay-label-blue":"sap-touch-overlay-label-orange"}`,r.textContent=e.playerName,r.hidden=!0,this.labelRoot.append(r);const o={marker:e,ring:a,material:i,arrow:s,label:r};return this.views.set(e.id,o),o}updateArrow(e,t,i){if(this.mode!=="advancement"||t.totalBallTravelDistance<=fN){e.arrow.visible=!1;return}this.arrowStart.set(t.position.x,t.position.y,t.position.z+Zc*2),this.arrowEnd.set(t.endPosition.x,t.endPosition.y,t.endPosition.z+Zc*2),this.arrowDirection.copy(this.arrowEnd).sub(this.arrowStart);const a=this.arrowDirection.length();if(a<pN){e.arrow.visible=!1;return}this.arrowDirection.normalize(),e.arrow.visible=!0,e.arrow.position.copy(this.arrowStart),e.arrow.setDirection(this.arrowDirection),e.arrow.setLength(a,Math.min(140,Math.max(42,a*.18)),Math.min(86,Math.max(24,a*.1))),Om(e.arrow,Math.min(.86,i+.12))}}const si="#3b82f6",ri="#f59e0b",yN="#d1d9e0",bN={air_dribble:"AD",ball_carry:"BC",ceiling_shot:"CS",double_tap:"DT",flick:"F",flip_reset:"FR",half_flip:"HF",half_volley:"HV",musty_flick:"M",one_timer:"OT",pass:"P",speed_flip:"SF",wall_aerial:"WA",wall_aerial_shot:"WS",wavedash:"WD"},SN=new Set(["wavedash"]);function xN(n,e){return n.players.find(t=>t.id===e)?.name??e}function Vi(n,e,t){return n.frames[e??-1]?.time??t}function hn(n){return n.split(/[_-]+/).filter(e=>e.length>0).map(e=>`${e.slice(0,1).toUpperCase()}${e.slice(1)}`).join(" ")}function my(n){return bN[n]??(n.split(/[_-]+/).filter(e=>e.length>0).map(e=>e.slice(0,1).toUpperCase()).join("").slice(0,3)||"M")}function _y(n){return[...new Set((n?.events.mechanics??[]).filter(e=>Il(e.kind)).map(e=>e.kind))].sort((e,t)=>hn(e).localeCompare(hn(t)))}function Il(n){return!SN.has(n)}function wN(n){return n.replaceAll("_","-")}function EN(n,e,t){const i=t?new Set(t):null,a=new Map(e.players.map(s=>[s.id,s.name]));return(n.events.mechanics??[]).filter(s=>Il(s.kind)&&s.timing.type==="moment"&&(!i||i.has(s.kind))).map(s=>{const r=zt(s.player_id),o=a.get(r)??r,l=hn(s.kind);if(s.timing.type!=="moment")throw new Error("unreachable non-moment mechanic event");return{id:s.id,time:Vi(e,s.timing.frame,s.timing.time),frame:s.timing.frame,kind:s.kind,label:`${o} ${l.toLowerCase()}`,shortLabel:my(s.kind),playerId:r,playerName:o,isTeamZero:s.is_team_0,color:s.is_team_0?si:ri}})}function MN(n,e,t){const i=t?new Set(t):null,a=new Map(e.players.map(s=>[s.id,s.name]));return(n.events.mechanics??[]).filter(s=>Il(s.kind)&&(!i||i.has(s.kind))).map(s=>{const r=zt(s.player_id),o=a.get(r)??r,l=hn(s.kind),c=s.timing.type==="moment"?{frame:s.timing.frame,time:s.timing.time}:{frame:s.timing.end_frame,time:s.timing.end_time};return{id:`${s.id}:playlist`,time:Vi(e,c.frame,c.time),frame:c.frame,kind:s.kind,label:`${o} ${l.toLowerCase()}`,shortLabel:my(s.kind),playerId:r,playerName:o,isTeamZero:s.is_team_0,color:s.is_team_0?si:ri}})}function TN(n){const e=new Set(n),t=new Set(["goal"]);return e.has("core")&&(t.add("save"),t.add("shot"),t.add("assist")),e.has("demo")&&t.add("demo"),[...t]}function CN(n,e){const t=new Set(TN(e));return n.timelineEvents.filter(i=>t.has(i.kind))}function AN(n,e){return dy(n,e).map(t=>({id:t.id,time:t.time,frame:t.frame,kind:"fifty-fifty",label:t.label,shortLabel:t.label.startsWith("Kickoff 50/50")?"KO":"50",isTeamZero:t.winnerIsTeamZero,color:t.winnerIsTeamZero===null?yN:t.winnerIsTeamZero?si:ri}))}function RN(n,e){return py(n,e).map(t=>({id:t.id,time:t.time,frame:t.frame,kind:"touch",label:`${t.playerName} touch`,shortLabel:"T",playerId:t.playerId,playerName:t.playerName,isTeamZero:t.isTeamZero,color:t.isTeamZero?si:ri}))}function PN(n,e){return n.events.backboard.map((t,i)=>{const a=zt(t.player),s=e.players.find(r=>r.id===a)?.name??a;return{id:`backboard:${t.frame}:${a}:${i}`,time:Vi(e,t.frame,t.time),frame:t.frame,kind:"backboard",label:`${s} backboard`,shortLabel:"BB",playerId:a,playerName:s,isTeamZero:t.is_team_0,color:t.is_team_0?si:ri}})}function LN(n,e){return n.events.rush.map((t,i)=>{const a=Vi(e,t.end_frame,t.end_time),s=`${t.attackers}v${t.defenders}`,r=t.is_team_0?"Blue":"Orange";return{id:`rush:${t.start_frame}:${t.end_frame}:${i}`,time:a,frame:t.end_frame,kind:"rush",label:`${r} rush ${s}`,shortLabel:"R",playerId:null,playerName:null,isTeamZero:t.is_team_0,color:t.is_team_0?si:ri}})}function NN(n,e){return(n.events?.powerslide??[]).filter(t=>t.active).map((t,i)=>{const a=zt(t.player),s=xN(e,a);return{id:`powerslide:${t.frame}:${a}:${i+1}`,time:Vi(e,t.frame,t.time),frame:t.frame,kind:"powerslide",label:`${s} powerslide`,shortLabel:"PS",playerId:a,playerName:s,isTeamZero:t.is_team_0,color:t.is_team_0?si:ri}})}function IN(n,e){return n.events.wavedash.map((t,i)=>{const a=zt(t.player),s=e.players.find(c=>c.id===a)?.name??a,r=Vi(e,t.frame,t.time),o=Math.round(t.confidence*100),l=Math.round(t.horizontal_speed_gain);return{id:`wavedash:${t.frame}:${a}:${i}`,time:r,frame:t.frame,kind:"wavedash",label:`${s} wavedash ${o}% | +${l}uu/s`,shortLabel:"WD",playerId:a,playerName:s,isTeamZero:t.is_team_0,color:t.is_team_0?si:ri}})}function kN(n,e){return n.events.bump.map((t,i)=>{const a=zt(t.initiator),s=zt(t.victim),r=e.players.find(u=>u.id===a)?.name??a,o=e.players.find(u=>u.id===s)?.name??s,l=Vi(e,t.frame,t.time),c=Math.round(t.confidence*100);return{id:`bump:${t.frame}:${a}:${s}:${i}`,time:l,frame:t.frame,kind:"bump",label:`${r} bumped ${o} ${c}%`,shortLabel:"B",playerId:a,playerName:r,isTeamZero:t.initiator_is_team_0,color:t.initiator_is_team_0?si:ri}})}function DN(n){return n.kind==="beaten_to_ball"?"BT":n.dodge_active?"DW":n.aerial?"AW":"W"}function FN(n){const e=[n.aerial?"aerial":"grounded"];return n.dodge_active&&e.push("dodge"),e.join(" ")}function ON(n){return n.kind==="beaten_to_ball"?"beaten to ball":"whiff"}function UN(n,e){return n.events.whiff.map((t,i)=>{const a=zt(t.player),s=e.players.find(c=>c.id===a)?.name??a,r=Vi(e,t.frame,t.time),o=Math.round(t.closest_approach_distance),l=Math.round(t.approach_speed);return{id:`whiff:${t.frame}:${a}:${i}`,time:r,frame:t.frame,kind:"whiff",label:`${s} ${FN(t)} ${ON(t)} | ${o}uu closest, ${l}uu/s`,shortLabel:DN(t),playerId:a,playerName:s,isTeamZero:t.is_team_0,color:t.is_team_0?si:ri}})}const gy=.02,fn=1e-4,BN=200,vy=.08,zN="#3b82f6",HN="#f59e0b",Td={big:"rgba(245, 158, 11, 0.92)",small:"rgba(52, 211, 153, 0.86)"},Bm={both:"rgba(52, 211, 153, 0.86)",ghost:"rgba(239, 68, 68, 0.9)",missed:"rgba(59, 130, 246, 0.9)"},VN={air_dribble:"AD",ball_carry:"BC",ceiling_shot:"CS",double_tap:"DT",flick:"F",half_flip:"HF",half_volley:"HV",musty_flick:"M",one_timer:"OT",pass:"P",wavedash:"WD"};function GN(n){const e=n.config?.pressure_neutral_zone_half_width_y;return typeof e=="number"&&Number.isFinite(e)?Math.max(0,e):BN}function fl(n,e,t){return n?.frames?.[e??-1]?.time??t}function Tf(n){return n===!0?zN:n===!1?HN:null}function $N(n){return VN[n]??(n.split(/[_-]+/).filter(e=>e.length>0).map(e=>e.slice(0,1).toUpperCase()).join("").slice(0,3)||"M")}function WN(n,e,t){const i=t?new Set(t):null,a=new Map(e.players.map(s=>[s.id,s.name]));return(n.events.mechanics??[]).filter(s=>Il(s.kind)&&s.timing.type==="span"&&(!i||i.has(s.kind))).map(s=>{if(s.timing.type!=="span")throw new Error("unreachable non-span mechanic event");const r=Cd(s.player_id),o=a.get(r)??r,l=hn(s.kind),c=fl(e,s.timing.start_frame,s.timing.start_time),u=Math.max(c,fl(e,s.timing.end_frame,s.timing.end_time));return{id:s.id,startTime:c,endTime:u,lane:`mechanic:${s.kind}`,laneLabel:l,label:`${o} ${l.toLowerCase()}`,shortLabel:$N(s.kind),isTeamZero:s.is_team_0,color:Tf(s.is_team_0)??void 0}}).sort((s,r)=>s.startTime!==r.startTime?s.startTime-r.startTime:(s.id??"").localeCompare(r.id??""))}function XN(n,e,t,i,a,s){const r=e?.ballFrames[n]?.position?.y;return typeof r=="number"&&Number.isFinite(r)&&Math.abs(r)<=t+fn||s>fn?"neutral":i>a+fn?"team_zero_side":a>i+fn?"team_one_side":null}function yy(n,e,t){if(n==="neutral")return{id:`half-control:neutral:${e.toFixed(3)}`,startTime:e,endTime:t,lane:"half-control",laneLabel:"Half Control",label:"Neutral half control",color:"rgba(209, 217, 224, 0.7)",isTeamZero:null};const i=n==="team_zero_side";return{id:`half-control:${n}:${e.toFixed(3)}`,startTime:e,endTime:t,lane:"half-control",laneLabel:"Half Control",label:i?"Blue half control":"Orange half control",color:i?"rgba(89, 195, 255, 0.76)":"rgba(255, 193, 92, 0.76)",isTeamZero:i}}function Cf(n){return n.map((e,t)=>({event:e,index:t})).sort((e,t)=>e.event.frame!==t.event.frame?e.event.frame-t.event.frame:e.event.time!==t.event.time?e.event.time-t.event.time:e.index-t.index).map(({event:e})=>e)}function qN(n,e){const t=Cf(n.events?.possession??[]),i=[];let a=0,s=!1,r="neutral",o=null;for(const l of n.frames){for(;a<t.length&&t[a].frame<=l.frame_number;){const f=t[a];s=f.active,r=f.possession_state,a+=1}if(!Number.isFinite(l.time)||!Number.isFinite(l.dt)||l.dt<=0){o=l;continue}const{startTime:c,endTime:u}=Es(l,o,e);let d=null;s&&r==="team_zero"?d={id:`possession:team_zero:${c.toFixed(3)}`,startTime:c,endTime:u,lane:"possession",laneLabel:"Possession",label:"Blue possession",color:"rgba(59, 130, 246, 0.88)",isTeamZero:!0}:s&&r==="team_one"?d={id:`possession:team_one:${c.toFixed(3)}`,startTime:c,endTime:u,lane:"possession",laneLabel:"Possession",label:"Orange possession",color:"rgba(245, 158, 11, 0.88)",isTeamZero:!1}:s&&r==="neutral"&&(d={id:`possession:neutral:${c.toFixed(3)}`,startTime:c,endTime:u,lane:"possession",laneLabel:"Possession",label:"Neutral possession",color:"rgba(209, 217, 224, 0.7)",isTeamZero:null}),kl(i,d),o=l}return i}function KN(n,e){if((n.events?.possession?.length??0)>0)return qN(n,e);const t=[];let i=0,a=0,s=0,r=null;for(const o of n.frames){if(!Number.isFinite(o.time)||!Number.isFinite(o.dt)||o.dt<=0){r=o;continue}const l=o,c=l.team_zero?.possession?.possession_time??0,u=l.team_one?.possession?.possession_time??0,d=l.team_zero?.possession?.neutral_time??0,f=c-i,p=u-a,_=d-s;i=c,a=u,s=d;let g=null;const{startTime:m,endTime:h}=Es(o,r,e);f>p+fn&&f>_+fn?g={id:`possession:team_zero:${m.toFixed(3)}`,startTime:m,endTime:h,lane:"possession",laneLabel:"Possession",label:"Blue possession",color:"rgba(59, 130, 246, 0.88)",isTeamZero:!0}:p>f+fn&&p>_+fn?g={id:`possession:team_one:${m.toFixed(3)}`,startTime:m,endTime:h,lane:"possession",laneLabel:"Possession",label:"Orange possession",color:"rgba(245, 158, 11, 0.88)",isTeamZero:!1}:_>fn&&(g={id:`possession:neutral:${m.toFixed(3)}`,startTime:m,endTime:h,lane:"possession",laneLabel:"Possession",label:"Neutral possession",color:"rgba(209, 217, 224, 0.7)",isTeamZero:null}),kl(t,g),r=o}return t}function YN(n,e){const t=Cf(n.events?.pressure??[]),i=[];let a=0,s=!1,r="neutral",o=null;for(const l of n.frames){for(;a<t.length&&t[a].frame<=l.frame_number;){const d=t[a];s=d.active,r=d.field_half==="team_zero_side"||d.field_half==="team_one_side"?d.field_half:"neutral",a+=1}if(!Number.isFinite(l.time)||!Number.isFinite(l.dt)||l.dt<=0){o=l;continue}const{startTime:c,endTime:u}=Es(l,o,e);kl(i,s?yy(r,c,u):null),o=l}return i}function jN(n,e){if((n.events?.pressure?.length??0)>0)return YN(n,e);const t=[];let i=0,a=0,s=0;const r=GN(n);let o=null;for(const l of n.frames){if(!Number.isFinite(l.time)||!Number.isFinite(l.dt)||l.dt<=0){o=l;continue}const c=l,u=c.team_zero?.pressure?.defensive_half_time??0,d=c.team_one?.pressure?.defensive_half_time??0,f=c.team_zero?.pressure?.neutral_time??0,p=u-i,_=d-a,g=f-s;i=u,a=d,s=f;const{startTime:m,endTime:h}=Es(l,o,e),y=XN(l.frame_number,e,r,p,_,g),x=y?yy(y,m,h):null;kl(t,x),o=l}return t}function ZN(n,e){return n.events.rush.map((t,i)=>{const a=e?.frames[t.start_frame]?.time??t.start_time,s=e?.frames[t.end_frame]?.time??t.end_time,r=`${t.attackers}v${t.defenders}`,o=t.is_team_0;return{id:`rush-range:${t.start_frame}:${t.end_frame}:${i}`,startTime:a,endTime:Math.max(a,s),lane:"rush",laneLabel:"Rush",label:`${o?"Blue":"Orange"} rush ${r}`,color:o?"rgba(59, 130, 246, 0.4)":"rgba(245, 158, 11, 0.4)",isTeamZero:o}})}function JN(n,e={}){const t=by(e),i=new Set(e.comparisons??["both"]),a=new Set(e.activities??["active","inactive","unknown"]),s=new Set(e.fieldHalves??["own","opponent","unknown"]),r=e.playerIds?new Set(e.playerIds):null;if(t.size===0||!i.has("both")||!a.has("unknown")||!s.has("unknown")||r?.size===0)return[];const o=new Map(n.players.map(c=>[c.id,c.isTeamZero])),l=[];for(const c of n.boostPads)if(t.has(c.size))for(let u=0;u<c.events.length;u+=1){const d=c.events[u];if(d.available||!Number.isFinite(d.time)||r&&!d.playerId||d.playerId&&r&&!r.has(d.playerId))continue;const f=Math.max(0,fl(n,d.frame,d.time)),p=c.size==="big"?"Big":"Small",_=d.playerName?`${d.playerName} `:"",g=d.playerId?o.get(d.playerId)??null:null;l.push({id:`boost-pickup:${c.index}:${d.frame}:${u}`,startTime:f,endTime:Math.max(f+vy,f),lane:"boost-pickups",laneLabel:"Boost Pickups",label:`${_}picked up ${p.toLowerCase()} boost pad ${c.index}`,shortLabel:c.size==="big"?"100":"12",color:Tf(g)??Td[c.size],isTeamZero:g})}return l.sort((c,u)=>c.startTime!==u.startTime?c.startTime-u.startTime:(c.id??"").localeCompare(u.id??""))}function by(n){if(n.padTypes)return new Set(n.padTypes);if(n.sizes){const e=new Set(n.sizes),t=new Set;return e.has("big")&&t.add("big"),e.has("small")&&t.add("small"),e.has("big")&&e.has("small")&&t.add("ambiguous"),t}return new Set(["big","small","ambiguous"])}function Cd(n){const[e,t]=Object.entries(n)[0]??["Unknown","unknown"],i=typeof t=="string"?t:JSON.stringify(t);return`${e}:${i}`}function QN(n){return{big:"big",small:"small",ambiguous:"ambiguous"}[n]}function eI(n){return{both:"counted",ghost:"ghost",missed:"missed"}[n]}function tI(n,e){return n==="ghost"?"G":n==="missed"?"M":{big:"100",small:"12",ambiguous:"?"}[e]}function nI(n,e,t={}){const i=n.events?.boost_pickups??[];if(i.length===0&&e)return JN(e,t);const a=by(t),s=new Set(t.comparisons??["both"]),r=new Set(t.activities??["active","inactive","unknown"]),o=new Set(t.fieldHalves??["own","opponent","unknown"]),l=t.playerIds?new Set(t.playerIds):null;if(a.size===0||s.size===0||r.size===0||o.size===0||l?.size===0)return[];const c=new Map((e?.players??[]).map(u=>[u.id,u.name]));return i.filter(u=>{const d=Cd(u.player_id);return a.has(u.pad_type)&&s.has(u.comparison)&&r.has(u.activity)&&o.has(u.field_half)&&(!l||l.has(d))}).map((u,d)=>{const f=Cd(u.player_id),p=c.get(f)??f,_=Math.max(0,fl(e,u.frame,u.time)),g=eI(u.comparison),m=QN(u.pad_type);return{id:`boost-pickup:${u.comparison}:${u.frame}:${f}:${d}`,startTime:_,endTime:Math.max(_+vy,_),lane:"boost-pickups",laneLabel:"Boost Pickups",label:`${p} ${g} ${m} boost pickup`,shortLabel:tI(u.comparison,u.pad_type),color:Tf(u.is_team_0)??(u.comparison==="both"?u.pad_type==="big"?Td.big:u.pad_type==="small"?Td.small:Bm.both:Bm[u.comparison]),isTeamZero:u.is_team_0}}).sort((u,d)=>u.startTime!==d.startTime?u.startTime-d.startTime:(u.id??"").localeCompare(d.id??""))}const Ad=[{fieldName:"time_defensive_third",aliases:["time_defensive_zone"],label:"Def third",relativeColor:"own"},{fieldName:"time_neutral_third",aliases:["time_neutral_zone"],label:"Neutral third",relativeColor:"neutral"},{fieldName:"time_offensive_third",aliases:["time_offensive_zone"],label:"Off third",relativeColor:"opp"}];function Sy(n,e){return n.relativeColor==="neutral"?"rgba(209, 217, 224, 0.68)":(n.relativeColor==="own"?e:!e)?"rgba(89, 195, 255, 0.74)":"rgba(255, 193, 92, 0.78)"}function Af(n){const[e,t]=Object.entries(n)[0]??["Unknown","unknown"],i=typeof t=="string"?t:JSON.stringify(t);return`${e}:${i}`}function iI(n,e){const t=n.positioning;if(!t)return 0;for(const i of[e.fieldName,...e.aliases??[]]){const a=t[i];if(typeof a=="number"&&Number.isFinite(a))return a}return 0}function aI(n,e){return n.players.find(t=>Af(t.player_id)===e)?.name??e}function sI(n,e){for(const t of[e.fieldName,...e.aliases??[]]){const i=n[t];if(typeof i=="number"&&Number.isFinite(i))return i}return 0}function rI(n,e){const t=Cf(n.events?.positioning??[]),i=[],a=new Map;let s=0,r=null;for(const o of n.frames){const l=new Map;for(;s<t.length&&t[s].frame<=o.frame_number;){const d=t[s],f=Af(d.player),p=l.get(f)??{event:d,zoneDeltas:new Map};p.event=d;for(const _ of Ad)p.zoneDeltas.set(_.fieldName,(p.zoneDeltas.get(_.fieldName)??0)+sI(d,_));l.set(f,p),s+=1}if(!Number.isFinite(o.time)||!Number.isFinite(o.dt)||o.dt<=0){r=o;continue}const{startTime:c,endTime:u}=Es(o,r,e);if(u-c<=fn){r=o;continue}for(const[d,{event:f,zoneDeltas:p}]of l){let _=null,g=0;for(const m of Ad){const h=p.get(m.fieldName)??0;h>g+fn&&(g=h,_=m)}_&&xy(i,a,{id:`time-in-zone:${d}:${_.fieldName}:${c.toFixed(3)}`,startTime:c,endTime:u,lane:`time-in-zone:${d}`,laneLabel:aI(o,d),label:_.label,color:Sy(_,f.is_team_0),isTeamZero:f.is_team_0})}r=o}return i}function oI(n,e){if((n.events?.positioning?.length??0)>0)return rI(n,e);const t=new Map,i=[],a=new Map;let s=null;for(const r of n.frames){if(!Number.isFinite(r.time)||!Number.isFinite(r.dt)||r.dt<=0){s=r;continue}const{startTime:o,endTime:l}=Es(r,s,e);if(l-o<=fn){s=r;continue}for(const c of r.players){const u=Af(c.player_id),d=t.get(u)??new Map;let f=null,p=0;for(const _ of Ad){const g=iI(c,_),m=g-(d.get(_.fieldName)??0);m>p+fn&&(p=m,f=_),d.set(_.fieldName,g)}t.set(u,d),f&&xy(i,a,{id:`time-in-zone:${u}:${f.fieldName}:${o.toFixed(3)}`,startTime:o,endTime:l,lane:`time-in-zone:${u}`,laneLabel:c.name,label:f.label,color:Sy(f,c.is_team_0),isTeamZero:c.is_team_0})}s=r}return i}function Es(n,e,t){const i=t?.frames[n.frame_number]?.time??n.time,a=e?t?.frames[e.frame_number]?.time??e.time:Math.max(0,i-n.dt);return{startTime:Math.max(0,a),endTime:Math.max(a,i)}}function kl(n,e){if(!e)return;const t=n[n.length-1];if(t&&t.lane===e.lane&&t.label===e.label&&Math.abs(t.endTime-e.startTime)<=gy){t.endTime=e.endTime;return}n.push(e)}function xy(n,e,t){if(!t)return;const i=t.lane??"",a=e.get(i);if(a&&a.label===t.label&&Math.abs(a.endTime-t.startTime)<=gy){a.endTime=t.endTime;return}n.push(t),e.set(i,t)}const Qc=236,wy="relative-positioning",lI={last:"Last",upfield:"Upfield",level:"Level",mid:"Mid"};function qa(n){return n?"team-blue":"team-orange"}function Ey(n,e,t){return`<div class="player-card ${t.tone==="shared"?"shared":t.tone==="blue"?"team-blue":"team-orange"}">
    <div class="player-card-header">
      <span class="player-name">${n}</span>
      ${t.metaHtml??""}
    </div>
    ${e}
  </div>`}function Ht(n,e,t,i=""){return Ey(n,t,{metaHtml:i,tone:e?"blue":"orange"})}function Zt(n,e){return`<div class="player-team-stack">${[!0,!1].map(t=>{const i=n.filter(s=>s.is_team_0===t);if(i.length===0)return"";const a=t?"Blue":"Orange";return`<section class="player-team-group ${qa(t)}">
        <div class="player-team-header">
          <h3>${a} team</h3>
          <span>${i.length} player${i.length===1?"":"s"}</span>
        </div>
        <div class="player-stats-grid">
          ${i.map(e).join("")}
        </div>
      </section>`}).join("")}</div>`}function Rf(n,e,t=""){return Ey(n,e,{metaHtml:t,tone:"shared"})}function Bt(n,e,t){const i=bt(n.statsFrameLookup,e);return i?i.players.find(a=>zt(a.player_id)===t)??null:null}function cI(n,e,t){const i=n.players.find(_=>_.id===e);if(!i||!i.frames[t]?.position)return"mid";const s=i.isTeamZero,r=n.players.filter(_=>_.isTeamZero===s).length,o=[];let l=0;for(const _ of n.players){if(_.isTeamZero!==s)continue;const g=_.frames[t];if(!g?.position)continue;const m=s?g.position.y:-g.position.y;o.push(m),_.id===e&&(l=m)}if(r<2||o.length!==r)return"mid";const c=Math.min(...o),u=Math.max(...o);if(u-c<=Qc)return"level";const f=l-c<=Qc,p=u-l<=Qc;return f&&!p?"last":p&&!f?"upfield":"mid"}function uI(n){let e=null,t=null;const i=new Set,a=["possession_state","field_third"];return{id:"possession",label:"Possession",setup(){s()},teardown(){},onBeforeRender(){},getTimelineRanges(o){return KN(o.statsTimeline,o.replay)},getConfig(){return{breakdownClasses:r()}},applyConfig(o){if(i.clear(),o&&typeof o=="object"&&!Array.isArray(o)){const l=o.breakdownClasses;if(Array.isArray(l))for(const c of l)a.includes(c)&&i.add(c)}s(),n.rerenderCurrentState()},renderStats(o,l){const u=bt(l.statsFrameLookup,o)?.team_zero?.possession;return u?Rf("Control State",Tm(u,{labelPerspective:{kind:"shared"},breakdownClasses:r()})):""},renderFocusedPlayerStats(o,l,c){const u=bt(c.statsFrameLookup,l),d=Bt(c,l,o),f=d?.is_team_0?u?.team_zero?.possession:u?.team_one?.possession;return!f||!d?"":Tm(f,{labelPerspective:{kind:"team"},breakdownClasses:r()})},renderSettings(){if(!e){e=document.createElement("div"),e.className="module-settings-card";const o=document.createElement("div");o.className="module-settings-header";const l=document.createElement("div"),c=document.createElement("p");c.className="module-settings-eyebrow",c.textContent="Stat display";const u=document.createElement("h3");u.textContent="Possession breakdown",l.append(c,u),t=document.createElement("strong"),t.className="metric-readout",o.append(l,t);const d=document.createElement("div");d.className="module-settings-options";const f=document.createElement("label");f.className="toggle";const p=document.createElement("input");p.type="checkbox",p.dataset.breakdownClass="possession_state",p.addEventListener("change",()=>{p.checked?i.add("possession_state"):i.delete("possession_state"),s(),n.rerenderCurrentState(),n.requestConfigSync?.()});const _=document.createElement("span");_.textContent="Control",f.append(p,_),d.append(f);const g=document.createElement("label");g.className="toggle";const m=document.createElement("input");m.type="checkbox",m.dataset.breakdownClass="field_third",m.addEventListener("change",()=>{m.checked?i.add("field_third"):i.delete("field_third"),s(),n.rerenderCurrentState(),n.requestConfigSync?.()});const h=document.createElement("span");h.textContent="Third",g.append(m,h),d.append(g),e.append(o,d)}return s(),e}};function s(){if(e){for(const o of e.querySelectorAll("input[data-breakdown-class]")){const l=o.dataset.breakdownClass;o.checked=l?i.has(l):!1}if(t){const o=a.filter(l=>i.has(l));t.textContent=o.length===0?"Total only":o.map(l=>l==="possession_state"?"Control":"Third").join(" x ")}}}function r(){return a.filter(o=>i.has(o))}}function dI(){let n=null;return{id:"fifty-fifty",label:"50/50",setup(e){n=new j2(e.player.sceneState,e.player.container,e.replay,e.statsTimeline)},teardown(){n?.dispose(),n=null},onBeforeRender(e){n?.update(e.currentTime)},getTimelineEvents(e){return AN(e.statsTimeline,e.replay)},renderStats(e,t){const i=bt(t.statsFrameLookup,e);if(!i)return"";const a=Rf("Challenge Summary",C2(i.team_zero?.fifty_fifty)),s=Zt(i.players,r=>Ht(r.name,r.is_team_0,wm(r.fifty_fifty)));return a+s},renderFocusedPlayerStats(e,t,i){const a=Bt(i,t,e);return a?wm(a.fifty_fifty):""}}}function fI(){let n=null,e=null;return{id:"pressure",label:"Half Control",setup(t){e=t.replay,n=new M2(t.player.sceneState.scene,t.fieldScale)},teardown(){n?.dispose(),n=null,e=null},onBeforeRender(t){const i=e?.ballFrames[t.frameIndex];n?.update(i?.position?.y??null)},getTimelineRanges(t){return jN(t.statsTimeline,t.replay)},renderStats(t,i){const s=bt(i.statsFrameLookup,t)?.team_zero?.pressure;return s?Rf("Field State",Am(s,{labelPerspective:{kind:"shared"}})):""},renderFocusedPlayerStats(t,i,a){const s=bt(a.statsFrameLookup,i),r=Bt(a,i,t),o=r?.is_team_0?s?.team_zero?.pressure:s?.team_one?.pressure;return!o||!r?"":Am(o,{labelPerspective:{kind:"team"}})}}}function pI(){return{id:"rush",label:"Rush",setup(){},teardown(){},onBeforeRender(){},getTimelineRanges(n){return ZN(n.statsTimeline,n.replay)},getTimelineEvents(n){return LN(n.statsTimeline,n.replay)},renderStats(n,e){const t=bt(e.statsFrameLookup,n),i=t?.team_zero?.rush,a=t?.team_one?.rush;return!i||!a?"":[Ht("Blue Team",!0,jc(i)),Ht("Orange Team",!1,jc(a))].join("")},renderFocusedPlayerStats(n,e,t){const i=bt(t.statsFrameLookup,e),a=Bt(t,e,n),s=a?.is_team_0?i?.team_zero?.rush:i?.team_one?.rush;return!s||!a?"":jc(s)}}}const Rd={speed_band:{valueOrder:["slow","boost","supersonic"],formatValue:n=>({slow:"Slow",boost:"Boost",supersonic:"Supersonic"})[n]??n},height_band:{valueOrder:["ground","low_air","high_air"],formatValue:n=>({ground:"Ground",low_air:"Low air",high_air:"High air"})[n]??n}};function hI(n){const e=new Set,t=[];for(const i of n??[])e.has(i)||(e.add(i),t.push(i));return t}function eu(n,e=1,t=""){return n===void 0||Number.isNaN(n)?"?":`${n.toFixed(e)}${t}`}function mI(n,e,t=1){return n===void 0||Number.isNaN(n)?"?":e===void 0||Number.isNaN(e)||e<=0?`${n.toFixed(t)}s`:`${n.toFixed(t)}s (${(n*100/e).toFixed(t)}%)`}function zm(n){return n.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Yo(n,e){return`<div class="stat-row"><span class="label">${zm(n)}</span><span class="value">${zm(e)}</span></div>`}function _I(n,e,t){for(const i of t){const{valueOrder:a}=Rd[i],s=a.indexOf(n[i]),r=a.indexOf(e[i]),o=s===-1?Number.MAX_SAFE_INTEGER:s,l=r===-1?Number.MAX_SAFE_INTEGER:r;if(o!==l)return o-l}return 0}function gI(n,e){if(e.length===1){const t=e[0];return Rd[t].formatValue(n[t])}return e.map(t=>Rd[t].formatValue(n[t])).join(" / ")}function vI(n,e,t){if(e.length===0||!n?.labeled_tracked_time?.entries?.length)return"";const i=new Map,a=n?.labeled_tracked_time?.entries??[];for(const s of a){const r=new Map(s.labels.map(d=>[d.key,d.value])),o={};let l=!0;for(const d of e){const f=r.get(d);if(f===void 0){l=!1;break}o[d]=f}if(!l)continue;const c=e.map(d=>`${d}:${o[d]}`).join("|"),u=i.get(c);u?u.total+=s.value:i.set(c,{values:o,total:s.value})}return[...i.values()].sort((s,r)=>_I(s.values,r.values,e)).map(s=>Yo(gI(s.values,e),mI(s.total,t))).join("")}function Hm(n,e={}){const t=n?.tracked_time,i=n&&t&&t>0?n.speed_integral/t:t===0?0:void 0,a=hI(e.breakdownClasses),s=vI(n,a,t);return`
    ${Yo("Tracked",eu(t,1,"s"))}
    ${Yo("Distance",eu(n?.total_distance,0," uu"))}
    ${Yo("Avg speed",eu(i,0," uu/s"))}
    ${s}
  `}const Vm="subtr-actor-speed-flip-overlay-styles",yI=5882879,bI=16761180,SI=16185075,xI=150,wI=230,EI=220,MI=4;function My(n){if(!n)return null;const[e,t]=Object.entries(n)[0]??["Unknown","unknown"],i=typeof t=="string"?t:JSON.stringify(t);return`${e}:${i}`}function TI(n,e){const t=My(e);return t?n.players.find(i=>i.id===t)?.name??t:"Unknown"}function CI(n,e){return n.events.speed_flip.map(t=>{const i=TI(e,t.player),a=My(t.player),s=e.frames[t.frame]?.time??t.time,r=t.confidence;return{id:`speed-flip:${t.frame}:${a}:${Math.round(r*1e3)}`,time:s,frame:t.frame,isTeamZero:t.is_team_0,playerId:a,playerName:i,position:{x:t.start_position[0],y:t.start_position[1],z:t.start_position[2]},quality:r,qualityLabel:`${Math.round(r*100)}%`}})}function AI(n,e,t){const i=Math.max(.1,t);return n.filter(a=>{const s=e-a.time;return s>=0&&s<=i})}function RI(){if(document.getElementById(Vm))return;const n=document.createElement("style");n.id=Vm,n.textContent=`
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
  `,document.head.append(n)}function PI(n,e,t,i){if(i.copy(n).project(e),i.z<-1||i.z>1)return!1;const a=t.clientWidth||1,s=t.clientHeight||1;return i.x=(i.x+1)*a/2,i.y=(1-i.y)*s/2,!(i.x<-100||i.x>a+100||i.y<-100||i.y>s+100)}class LI{scene;container;group=new pt;labelRoot;projectedPosition=new L;worldPosition=new L;labelOffset=new L(0,0,EI);markers;views=new Map;changedContainerPosition=!1;originalContainerPosition="";decaySeconds=MI;constructor(e,t,i,a){RI(),this.scene=e,this.container=t,this.markers=CI(a,i),getComputedStyle(t).position==="static"&&(this.changedContainerPosition=!0,this.originalContainerPosition=t.style.position,t.style.position="relative"),this.group.name="speed-flip-overlay",this.scene.replayRoot.add(this.group),this.labelRoot=document.createElement("div"),this.labelRoot.className="sap-speed-flip-overlay-root",this.container.append(this.labelRoot)}update(e){const t=AI(this.markers,e,this.decaySeconds),i=new Set(t.map(a=>a.id));for(const[a,s]of this.views.entries())i.has(a)||(s.ring.removeFromParent(),s.ring.geometry.dispose(),s.material.dispose(),s.label.remove(),this.views.delete(a));for(const a of t){const s=Math.max(0,e-a.time),r=Math.max(0,1-s/this.decaySeconds),o=this.ensureView(a),l=.16+.56*r,c=.96+(1-r)*.22;o.material.opacity=l,o.ring.position.set(a.position.x,a.position.y,a.position.z+14),o.ring.scale.setScalar(c+a.quality*.08),this.worldPosition.set(a.position.x,a.position.y,a.position.z).add(this.labelOffset);const u=PI(this.worldPosition,this.scene.camera,this.container,this.projectedPosition);o.label.style.display=u?"block":"none",u&&(o.label.style.left=`${this.projectedPosition.x}px`,o.label.style.top=`${this.projectedPosition.y}px`,o.label.style.opacity=`${.42+.58*r}`)}}dispose(){for(const e of this.views.values())e.ring.removeFromParent(),e.ring.geometry.dispose(),e.material.dispose(),e.label.remove();this.views.clear(),this.group.removeFromParent(),this.labelRoot.remove(),this.changedContainerPosition&&(this.container.style.position=this.originalContainerPosition)}ensureView(e){const t=this.views.get(e.id);if(t)return t;const i=new ct({color:e.quality>=.75?SI:e.isTeamZero?yI:bI,transparent:!0,opacity:.8,side:et,depthWrite:!1,depthTest:!1}),a=new _a(xI,wI,48),s=new ze(a,i);s.renderOrder=30,this.group.add(s);const r=document.createElement("div");r.className=`sap-speed-flip-overlay-label ${e.isTeamZero?"sap-speed-flip-overlay-label-blue":"sap-speed-flip-overlay-label-orange"}`,r.textContent=`${e.playerName} speed flip ${e.qualityLabel}`,this.labelRoot.append(r);const o={marker:e,ring:s,material:i,label:r};return this.views.set(e.id,o),o}}const To=[{value:"big",label:"Big pads"},{value:"small",label:"Small pads"},{value:"ambiguous",label:"Ambiguous pads"}],tu=[{value:"both",label:"Pickup events"}],Co=[{value:"active",label:"Active play"},{value:"inactive",label:"Inactive play"},{value:"unknown",label:"Unknown activity"}],Ao=[{value:"own",label:"Own half"},{value:"opponent",label:"Opponent half"},{value:"unknown",label:"Unknown half"}];function NI(n,e){return n===e||n==="ambiguous"}function II(n,e){const t=e?.events.boost_pickups??[];return t.length===0?null:t.find(i=>{const a=zt(i.player_id),s=i.reported_frame??i.frame;return a===n.player.id&&i.comparison==="both"&&s===n.event.frame&&NI(i.pad_type,n.pad.size)})??null}function Ty(n={}){let e=null,t=null,i=null,a=null,s=null,r=null;const o=new Set(To.map(T=>T.value)),l=new Set(tu.map(T=>T.value)),c=new Set(Co.map(T=>T.value)),u=new Set(Ao.map(T=>T.value));let d=null,f=!1;function p(T,C,v,S){const R=document.createElement("div");R.className="boost-pickup-filter-group";const I=document.createElement("p");I.className="module-settings-group-title",I.textContent=T;const U=document.createElement("div");U.className="boost-pickup-filter-options";for(const B of C){const G=document.createElement("label");G.className="toggle";const z=document.createElement("input");z.type="checkbox",z.dataset.boostPickupFilter=S,z.dataset.boostPickupValue=B.value,z.addEventListener("change",()=>{z.checked?v.add(B.value):v.delete(B.value),m(s),n.refreshTimelineRanges?.(),n.rerenderCurrentState?.(),n.requestConfigSync?.()});const X=document.createElement("span");X.textContent=B.label,G.append(z,X),U.append(G)}return R.append(I,U),R}function _(){const T=document.createElement("div");T.className="boost-pickup-filter-group boost-pickup-filter-group-wide",i=T;const C=document.createElement("p");return C.className="module-settings-group-title",C.textContent="Player",a=document.createElement("div"),a.className="boost-pickup-filter-options",T.append(C,a),T}function g(T){if(a&&(a.replaceChildren(),i&&(i.hidden=!T||T.players.length===0),!!T))for(const C of T.players){const v=document.createElement("label");v.className="toggle";const S=document.createElement("input");S.type="checkbox",S.dataset.boostPickupPlayerId=C.id,S.addEventListener("change",()=>{d||(d=new Set(T.players.map(I=>I.id))),S.checked?d.add(C.id):d.delete(C.id),m(T),n.refreshTimelineRanges?.(),n.rerenderCurrentState?.(),n.requestConfigSync?.()});const R=document.createElement("span");R.textContent=`${C.name} (${C.isTeamZero?"Blue":"Orange"})`,v.append(S,R),a.append(v)}}function m(T){if(e){for(const C of e.querySelectorAll("input[data-boost-pickup-filter][data-boost-pickup-value]")){const v=C.dataset.boostPickupFilter,S=C.dataset.boostPickupValue;C.checked=h(v,S)}for(const C of e.querySelectorAll("input[data-boost-pickup-player-id]")){const v=C.dataset.boostPickupPlayerId;C.checked=v?d?.has(v)??!0:!1}t&&(t.textContent=y(T))}}function h(T,C){if(!C)return!1;switch(T){case"pad-type":return o.has(C);case"comparison":return l.has(C);case"activity":return c.has(C);case"field-half":return u.has(C);default:return!1}}function y(T){const C=T?.players.length??0,v=d?d.size:C;if(o.size===0||l.size===0||c.size===0||u.size===0||d!==null&&d.size===0)return"Hidden";const R=[o.size<To.length,l.size<tu.length,c.size<Co.length,u.size<Ao.length,d!==null&&v<C].filter(Boolean).length;return R===0?"All labels":`${R} filters`}function x(T){if(d&&!d.has(T.player.id))return!1;if((r?.events.boost_pickups??[]).length===0)return o.has(T.pad.size)&&l.has("both")&&c.has("unknown")&&u.has("unknown");const C=II(T,r);return C?o.has(C.pad_type)&&l.has(C.comparison)&&c.has(C.activity)&&u.has(C.field_half):!1}function b(T,C,v){if(T.clear(),!Array.isArray(v)){for(const R of C)T.add(R.value);return}const S=new Set(C.map(R=>R.value));for(const R of v)typeof R=="string"&&S.has(R)&&T.add(R)}function A(){return{padTypes:[...o],comparisons:[...l],activities:[...c],fieldHalves:[...u],playerIds:d?[...d]:null}}function M(T){if(!T||typeof T!="object"||Array.isArray(T))return;const C=T;b(o,To,C.padTypes),b(l,tu,C.comparisons),b(c,Co,C.activities),b(u,Ao,C.fieldHalves),d=Array.isArray(C.playerIds)?new Set(C.playerIds.filter(v=>typeof v=="string")):null,f=s===null&&d!==null,m(s),n.refreshTimelineRanges?.(),n.rerenderCurrentState?.(),n.requestConfigSync?.()}return{setup(T){s!==T.replay&&(s=T.replay,f?f=!1:d=null),r=T.statsTimeline,m(T.replay)},teardown(){},getConfig:A,applyConfig:M,getTimelineRangeOptions(){const T={padTypes:o,comparisons:l,activities:c,fieldHalves:u};return d&&(T.playerIds=d),T},includePickup:x,renderSettings(T,C){if(!e){e=document.createElement("div"),e.className="boost-pickup-filter-panel";const v=document.createElement("div");v.className="boost-pickup-filter-summary",t=document.createElement("strong"),t.className="metric-readout",v.append(t);const S=document.createElement("div");S.className="boost-pickup-filter-grid",S.append(p("Pad type",To,o,"pad-type"),p("Activity",Co,c,"activity"),p("Field half",Ao,u,"field-half"),_()),(C.showHeader??!1)&&e.append(v),e.append(S)}return g(T?.replay??null),m(T?.replay??null),e}}}function mn(n){return{id:n.id,label:n.label,setup(){},teardown(){},onBeforeRender(){},getTimelineEvents:n.getTimelineEvents,renderStats(e,t){const i=bt(t.statsFrameLookup,e);return i?Zt(i.players,a=>Ht(a.name,a.is_team_0,n.render(n.select(a),a))):""},renderFocusedPlayerStats(e,t,i){const a=Bt(i,t,e);return a?n.render(n.select(a),a):""}}}const kI=255;function ga(n){return n*100/kI}function Nn(n){return n==null?"?":ga(n).toFixed(0)}function DI(n,e){const t=Nn(n);if(n==null||e==null)return t;const i=Nn(n+e);return`${t} (${i})`}function nu(n){n&&typeof n=="object"&&"dispose"in n&&typeof n.dispose=="function"&&n.dispose()}function FI(n){n&&(n.removeFromParent(),n.traverse(e=>{const t="geometry"in e?e.geometry:null;nu(t);const i="material"in e?e.material:null;if(Array.isArray(i))for(const a of i)nu(a);else nu(i)}))}function OI(){let n=0,e=null;return{acquire(t){e||(e=T2(t.player.sceneState.scene,t.fieldScale)),n+=1},release(){n<=0||(n-=1,n===0&&(FI(e),e=null))}}}const Gm=OI();function Oe(n){return n===void 0||Number.isNaN(n)?"?":`${Math.round(n)}`}function ge(n,e=1,t=""){return n===void 0||Number.isNaN(n)?"?":`${n.toFixed(e)}${t}`}function Pd(n,e=0){return ge(n,e,"%")}function Cy(n,e,t=1,i=0){if(n===void 0||Number.isNaN(n))return Pd(e,i);const a=ge(n,t,"s");return e===void 0||Number.isNaN(e)?a:`${a} (${Pd(e,i)})`}function na(n,e,t=1,i=0){const a=n!==void 0&&e!==void 0&&!Number.isNaN(n)&&!Number.isNaN(e)&&e>0?n*100/e:void 0;return Cy(n,a,t,i)}function Ke(n){return typeof n=="number"&&Number.isFinite(n)?n:void 0}function ei(n){const e=Ke(n);return e===void 0?void 0:e*100}function Ay(n){return Ke(n?.tracked_time)}function UI(n,e,t){const i=Ke(n?.[e]);if(i!==void 0)return i;const a=Ay(n),s=Ke(n?.[t]);if(!(a===void 0||a<=0||s===void 0))return s*100/a}function en(n,e,t){return Cy(Ke(n?.[t]),UI(n,e,t))}function $m(n,e,t){const i=Ke(n?.[e]);if(i!==void 0)return i;const a=Ay(n),s=Ke(n?.[t]);if(!(a===void 0||a<=0||s===void 0))return s/a}function Wm(n){return`
    <div class="stat-row"><span class="label">Most back</span><span class="value">${en(n,"percent_most_back","time_most_back")}</span></div>
    <div class="stat-row"><span class="label">Most forward</span><span class="value">${en(n,"percent_most_forward","time_most_forward")}</span></div>
    <div class="stat-row"><span class="label">Mid role</span><span class="value">${en(n,"percent_mid_role","time_mid_role")}</span></div>
    <div class="stat-row"><span class="label">Other role</span><span class="value">${en(n,"percent_other_role","time_other_role")}</span></div>
    <div class="stat-row"><span class="label">Closest to ball</span><span class="value">${en(n,"percent_closest_to_ball","time_closest_to_ball")}</span></div>
    <div class="stat-row"><span class="label">Farthest from ball</span><span class="value">${en(n,"percent_farthest_from_ball","time_farthest_from_ball")}</span></div>
    <div class="stat-row"><span class="label">Behind ball</span><span class="value">${en(n,"percent_behind_ball","time_behind_ball")}</span></div>
    <div class="stat-row"><span class="label">Level with ball</span><span class="value">${en(n,"percent_level_with_ball","time_level_with_ball")}</span></div>
    <div class="stat-row"><span class="label">In front of ball</span><span class="value">${en(n,"percent_in_front_of_ball","time_in_front_of_ball")}</span></div>
  `}function Xm(n){return`
    <div class="stat-row"><span class="label">Defensive zone</span><span class="value">${en(n,"percent_defensive_third","time_defensive_third")}</span></div>
    <div class="stat-row"><span class="label">Neutral zone</span><span class="value">${en(n,"percent_neutral_third","time_neutral_third")}</span></div>
    <div class="stat-row"><span class="label">Offensive zone</span><span class="value">${en(n,"percent_offensive_third","time_offensive_third")}</span></div>
    <div class="stat-row"><span class="label">Defensive half</span><span class="value">${en(n,"percent_defensive_half","time_defensive_half")}</span></div>
    <div class="stat-row"><span class="label">Offensive half</span><span class="value">${en(n,"percent_offensive_half","time_offensive_half")}</span></div>
    <div class="stat-row"><span class="label">To teammates</span><span class="value">${ge($m(n,"average_distance_to_teammates","sum_distance_to_teammates"),0)}</span></div>
    <div class="stat-row"><span class="label">To ball</span><span class="value">${ge($m(n,"average_distance_to_ball","sum_distance_to_ball"),0)}</span></div>
  `}function ea(n,e){return na(Ke(n?.[e]),Ke(n?.tracked_time))}function qm(n){return n?n.split("_").map(e=>e.charAt(0).toUpperCase()+e.slice(1)).join(" "):"?"}function BI(n){const e=n&&n.first_man_stint_count>0?n.time_first_man/n.first_man_stint_count:void 0;return`
    <div class="stat-row"><span class="label">Current role</span><span class="value">${qm(n?.current_role_state)}</span></div>
    <div class="stat-row"><span class="label">Current depth</span><span class="value">${qm(n?.current_depth_state)}</span></div>
    <div class="stat-row"><span class="label">First man</span><span class="value">${ea(n,"time_first_man")}</span></div>
    <div class="stat-row"><span class="label">First stints</span><span class="value">${Oe(n?.first_man_stint_count)}</span></div>
    <div class="stat-row"><span class="label">Avg first stint</span><span class="value">${ge(e,2,"s")}</span></div>
    <div class="stat-row"><span class="label">Longest first stint</span><span class="value">${ge(n?.longest_first_man_stint_time,2,"s")}</span></div>
    <div class="stat-row"><span class="label">Second man</span><span class="value">${ea(n,"time_second_man")}</span></div>
    <div class="stat-row"><span class="label">Third man</span><span class="value">${ea(n,"time_third_man")}</span></div>
    <div class="stat-row"><span class="label">Ambiguous</span><span class="value">${ea(n,"time_ambiguous_role")}</span></div>
    <div class="stat-row"><span class="label">Behind play</span><span class="value">${ea(n,"time_behind_play")}</span></div>
    <div class="stat-row"><span class="label">Level with play</span><span class="value">${ea(n,"time_level_with_play")}</span></div>
    <div class="stat-row"><span class="label">Ahead of play</span><span class="value">${ea(n,"time_ahead_of_play")}</span></div>
    <div class="stat-row"><span class="label">Became first</span><span class="value">${Oe(n?.became_first_man_count)}</span></div>
    <div class="stat-row"><span class="label">Lost first</span><span class="value">${Oe(n?.lost_first_man_count)}</span></div>
  `}function zI(n){const e=n&&n.shots>0?n.goals*100/n.shots:void 0;return`
    <div class="stat-row"><span class="label">Score</span><span class="value">${Oe(n?.score)}</span></div>
    <div class="stat-row"><span class="label">Goals</span><span class="value">${Oe(n?.goals)}</span></div>
    <div class="stat-row"><span class="label">Assists</span><span class="value">${Oe(n?.assists)}</span></div>
    <div class="stat-row"><span class="label">Saves</span><span class="value">${Oe(n?.saves)}</span></div>
    <div class="stat-row"><span class="label">Shots</span><span class="value">${Oe(n?.shots)}</span></div>
    <div class="stat-row"><span class="label">Shooting %</span><span class="value">${Pd(e)}</span></div>
  `}function HI(n){return`
    <div class="stat-row"><span class="label">Hits</span><span class="value">${Oe(n?.count)}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${ge(Ke(n?.time_since_last_backboard),2,"s")}</span></div>
  `}function VI(n){return`
    <div class="stat-row"><span class="label">Count</span><span class="value">${Oe(n?.count)}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${ge(Ke(n?.time_since_last_double_tap),2,"s")}</span></div>
  `}function GI(n){const e=n&&n.completed_pass_count>0?n.total_pass_distance/n.completed_pass_count:void 0,t=n&&n.completed_pass_count>0?n.total_pass_advance/n.completed_pass_count:void 0;return`
    <div class="stat-row"><span class="label">Completed</span><span class="value">${Oe(n?.completed_pass_count)}</span></div>
    <div class="stat-row"><span class="label">Received</span><span class="value">${Oe(n?.received_pass_count)}</span></div>
    <div class="stat-row"><span class="label">Avg distance</span><span class="value">${ge(e,0)}</span></div>
    <div class="stat-row"><span class="label">Avg advance</span><span class="value">${ge(t,0)}</span></div>
    <div class="stat-row"><span class="label">Longest</span><span class="value">${ge(n?.longest_pass_distance,0)}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${ge(Ke(n?.time_since_last_completed_pass),2,"s")}</span></div>
  `}function $I(n){const e=n&&n.count>0?n.total_ball_speed/n.count:void 0,t=n&&n.count>0?n.total_pass_distance/n.count:void 0;return`
    <div class="stat-row"><span class="label">Attempts</span><span class="value">${Oe(n?.count)}</span></div>
    <div class="stat-row"><span class="label">Avg speed</span><span class="value">${ge(e,0)}</span></div>
    <div class="stat-row"><span class="label">Fastest</span><span class="value">${ge(n?.fastest_ball_speed,0)}</span></div>
    <div class="stat-row"><span class="label">Avg pass distance</span><span class="value">${ge(t,0)}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${ge(Ke(n?.time_since_last_one_timer),2,"s")}</span></div>
  `}function Km(n){const e=n&&n.count>0?n.cumulative_confidence/n.count:void 0;return`
    <div class="stat-row"><span class="label">Attempts</span><span class="value">${Oe(n?.count)}</span></div>
    <div class="stat-row"><span class="label">High conf</span><span class="value">${Oe(n?.high_confidence_count)}</span></div>
    <div class="stat-row"><span class="label">Last quality</span><span class="value">${ge(Ke(n?.last_confidence),0,"%")}</span></div>
    <div class="stat-row"><span class="label">Avg quality</span><span class="value">${ge(e,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Best quality</span><span class="value">${ge(Ke(n?.best_confidence),0,"%")}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${ge(Ke(n?.time_since_last_ceiling_shot),2,"s")}</span></div>
  `}function Ym(n){const e=n&&n.count>0?n.cumulative_confidence/n.count:void 0,t=ei(e),i=n&&n.count>0?n.cumulative_setup_duration/n.count:void 0,a=n&&n.count>0?n.cumulative_takeoff_to_touch_time/n.count:void 0,s=n&&n.count>0?n.cumulative_touch_height/n.count:void 0;return`
    <div class="stat-row"><span class="label">Plays</span><span class="value">${Oe(n?.count)}</span></div>
    <div class="stat-row"><span class="label">High conf</span><span class="value">${Oe(n?.high_confidence_count)}</span></div>
    <div class="stat-row"><span class="label">Last quality</span><span class="value">${ge(ei(n?.last_confidence),0,"%")}</span></div>
    <div class="stat-row"><span class="label">Avg quality</span><span class="value">${ge(t,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Avg setup</span><span class="value">${ge(i,2,"s")}</span></div>
    <div class="stat-row"><span class="label">Avg takeoff</span><span class="value">${ge(a,2,"s")}</span></div>
    <div class="stat-row"><span class="label">Avg height</span><span class="value">${ge(s,0)}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${ge(Ke(n?.time_since_last_wall_aerial),2,"s")}</span></div>
  `}function jm(n){const e=n&&n.count>0?n.cumulative_confidence/n.count:void 0,t=n&&n.count>0?n.cumulative_takeoff_to_shot_time/n.count:void 0,i=n&&n.count>0?n.cumulative_shot_height/n.count:void 0;return`
    <div class="stat-row"><span class="label">Shots</span><span class="value">${Oe(n?.count)}</span></div>
    <div class="stat-row"><span class="label">High conf</span><span class="value">${Oe(n?.high_confidence_count)}</span></div>
    <div class="stat-row"><span class="label">Last quality</span><span class="value">${ge(ei(n?.last_confidence),0,"%")}</span></div>
    <div class="stat-row"><span class="label">Avg quality</span><span class="value">${ge(ei(e),0,"%")}</span></div>
    <div class="stat-row"><span class="label">Avg takeoff</span><span class="value">${ge(t,2,"s")}</span></div>
    <div class="stat-row"><span class="label">Avg height</span><span class="value">${ge(i,0)}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${ge(Ke(n?.time_since_last_wall_aerial_shot),2,"s")}</span></div>
  `}function WI(n){const e=n&&n.carry_count>0?n.average_horizontal_gap_sum/n.carry_count:void 0;return`
    <div class="stat-row"><span class="label">Carries</span><span class="value">${Oe(n?.carry_count)}</span></div>
    <div class="stat-row"><span class="label">Total time</span><span class="value">${ge(n?.total_carry_time,1,"s")}</span></div>
    <div class="stat-row"><span class="label">Longest</span><span class="value">${ge(n?.longest_carry_time,1,"s")}</span></div>
    <div class="stat-row"><span class="label">Furthest</span><span class="value">${ge(n?.furthest_carry_distance,0)}</span></div>
    <div class="stat-row"><span class="label">Avg gap</span><span class="value">${ge(e,0)}</span></div>
  `}function XI(n){const e=n&&n.count>0?n.average_horizontal_gap_sum/n.count:void 0,t=n&&n.count>0?n.total_touch_count/n.count:void 0;return`
    <div class="stat-row"><span class="label">Air dribbles</span><span class="value">${Oe(n?.count)}</span></div>
    <div class="stat-row"><span class="label">Ground to air</span><span class="value">${Oe(n?.ground_to_air_count)}</span></div>
    <div class="stat-row"><span class="label">Wall to air</span><span class="value">${Oe(n?.wall_to_air_count)}</span></div>
    <div class="stat-row"><span class="label">Avg touches</span><span class="value">${ge(t,1)}</span></div>
    <div class="stat-row"><span class="label">Max touches</span><span class="value">${Oe(n?.max_touch_count)}</span></div>
    <div class="stat-row"><span class="label">Total time</span><span class="value">${ge(n?.total_time,1,"s")}</span></div>
    <div class="stat-row"><span class="label">Longest</span><span class="value">${ge(n?.longest_time,1,"s")}</span></div>
    <div class="stat-row"><span class="label">Furthest</span><span class="value">${ge(n?.furthest_distance,0)}</span></div>
    <div class="stat-row"><span class="label">Avg gap</span><span class="value">${ge(e,0)}</span></div>
  `}function qI(n){const e=n&&n.press_count>0?n.total_duration/n.press_count:void 0;return`
    <div class="stat-row"><span class="label">Presses</span><span class="value">${Oe(n?.press_count)}</span></div>
    <div class="stat-row"><span class="label">Total time</span><span class="value">${ge(n?.total_duration,1,"s")}</span></div>
    <div class="stat-row"><span class="label">Avg duration</span><span class="value">${ge(e,2,"s")}</span></div>
  `}function KI(n){const e=n&&n.whiff_count>0?n.cumulative_closest_approach_distance/n.whiff_count:void 0;return`
    <div class="stat-row"><span class="label">Whiffs</span><span class="value">${Oe(n?.whiff_count)}</span></div>
    <div class="stat-row"><span class="label">Beaten to ball</span><span class="value">${Oe(n?.beaten_to_ball_count)}</span></div>
    <div class="stat-row"><span class="label">Grounded</span><span class="value">${Oe(n?.grounded_whiff_count)}</span></div>
    <div class="stat-row"><span class="label">Aerial</span><span class="value">${Oe(n?.aerial_whiff_count)}</span></div>
    <div class="stat-row"><span class="label">Dodge</span><span class="value">${Oe(n?.dodge_whiff_count)}</span></div>
    <div class="stat-row"><span class="label">Last closest</span><span class="value">${ge(Ke(n?.last_closest_approach_distance),0)}</span></div>
    <div class="stat-row"><span class="label">Best closest</span><span class="value">${ge(Ke(n?.best_closest_approach_distance),0)}</span></div>
    <div class="stat-row"><span class="label">Avg closest</span><span class="value">${ge(e,0)}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${ge(Ke(n?.time_since_last_whiff),2,"s")}</span></div>
  `}function YI(n){return`
    <div class="stat-row"><span class="label">Inflicted</span><span class="value">${Oe(n?.demos_inflicted)}</span></div>
    <div class="stat-row"><span class="label">Taken</span><span class="value">${Oe(n?.demos_taken)}</span></div>
  `}function jI(n){const e=n&&n.bumps_inflicted>0?n.cumulative_bump_strength/n.bumps_inflicted:void 0;return`
    <div class="stat-row"><span class="label">Inflicted</span><span class="value">${Oe(n?.bumps_inflicted)}</span></div>
    <div class="stat-row"><span class="label">Taken</span><span class="value">${Oe(n?.bumps_taken)}</span></div>
    <div class="stat-row"><span class="label">Team inflicted</span><span class="value">${Oe(n?.team_bumps_inflicted)}</span></div>
    <div class="stat-row"><span class="label">Team taken</span><span class="value">${Oe(n?.team_bumps_taken)}</span></div>
    <div class="stat-row"><span class="label">Last strength</span><span class="value">${ge(Ke(n?.last_bump_strength),0)}</span></div>
    <div class="stat-row"><span class="label">Max strength</span><span class="value">${ge(Ke(n?.max_bump_strength),0)}</span></div>
    <div class="stat-row"><span class="label">Avg strength</span><span class="value">${ge(e,0)}</span></div>
  `}function ZI(n){return`
    <div class="stat-row"><span class="label">Refreshes</span><span class="value">${Oe(n?.count)}</span></div>
    <div class="stat-row"><span class="label">Flip resets</span><span class="value">${Oe(n?.on_ball_count)}</span></div>
  `}function Zm(n){const e=n&&n.count>0?n.cumulative_confidence/n.count:void 0;return`
    <div class="stat-row"><span class="label">Attempts</span><span class="value">${Oe(n?.count)}</span></div>
    <div class="stat-row"><span class="label">High conf</span><span class="value">${Oe(n?.high_confidence_count)}</span></div>
    <div class="stat-row"><span class="label">Last quality</span><span class="value">${ge(Ke(n?.last_confidence),0,"%")}</span></div>
    <div class="stat-row"><span class="label">Avg quality</span><span class="value">${ge(e,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Best quality</span><span class="value">${ge(Ke(n?.best_confidence),0,"%")}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${ge(Ke(n?.time_since_last_musty),2,"s")}</span></div>
  `}function Jm(n){const e=n&&n.count>0?n.cumulative_confidence/n.count:void 0,t=n&&n.count>0?n.cumulative_setup_duration/n.count:void 0,i=n&&n.count>0?n.cumulative_ball_speed_change/n.count:void 0;return`
    <div class="stat-row"><span class="label">Attempts</span><span class="value">${Oe(n?.count)}</span></div>
    <div class="stat-row"><span class="label">High conf</span><span class="value">${Oe(n?.high_confidence_count)}</span></div>
    <div class="stat-row"><span class="label">Last quality</span><span class="value">${ge(Ke(n?.last_confidence),0,"%")}</span></div>
    <div class="stat-row"><span class="label">Avg quality</span><span class="value">${ge(e,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Avg setup</span><span class="value">${ge(t,2,"s")}</span></div>
    <div class="stat-row"><span class="label">Avg impulse</span><span class="value">${ge(i,0,"uu/s")}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${ge(Ke(n?.time_since_last_flick),2,"s")}</span></div>
  `}function Qm(n){const e=n&&n.count>0?n.cumulative_quality/n.count:void 0;return`
    <div class="stat-row"><span class="label">Attempts</span><span class="value">${Oe(n?.count)}</span></div>
    <div class="stat-row"><span class="label">High conf</span><span class="value">${Oe(n?.high_confidence_count)}</span></div>
    <div class="stat-row"><span class="label">Last quality</span><span class="value">${ge(Ke(n?.last_quality),0,"%")}</span></div>
    <div class="stat-row"><span class="label">Avg quality</span><span class="value">${ge(e,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Best quality</span><span class="value">${ge(Ke(n?.best_quality),0,"%")}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${ge(Ke(n?.time_since_last_speed_flip),2,"s")}</span></div>
  `}function e_(n){const e=n&&n.count>0?n.cumulative_quality/n.count:void 0,t=ei(n?.last_quality),i=ei(e),a=ei(n?.best_quality);return`
    <div class="stat-row"><span class="label">Attempts</span><span class="value">${Oe(n?.count)}</span></div>
    <div class="stat-row"><span class="label">High conf</span><span class="value">${Oe(n?.high_confidence_count)}</span></div>
    <div class="stat-row"><span class="label">Last quality</span><span class="value">${ge(t,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Avg quality</span><span class="value">${ge(i,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Best quality</span><span class="value">${ge(a,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${ge(Ke(n?.time_since_last_half_flip),2,"s")}</span></div>
  `}function t_(n){const e=n&&n.count>0?n.cumulative_quality/n.count:void 0,t=ei(n?.last_quality),i=ei(e),a=ei(n?.best_quality);return`
    <div class="stat-row"><span class="label">Attempts</span><span class="value">${Oe(n?.count)}</span></div>
    <div class="stat-row"><span class="label">High conf</span><span class="value">${Oe(n?.high_confidence_count)}</span></div>
    <div class="stat-row"><span class="label">Last quality</span><span class="value">${ge(t,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Avg quality</span><span class="value">${ge(i,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Best quality</span><span class="value">${ge(a,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${ge(Ke(n?.time_since_last_wavedash),2,"s")}</span></div>
  `}function n_(n){const e=n&&n.tracked_time>0?ga(n.boost_integral/n.tracked_time).toFixed(0):"?",t=Ke(n?.tracked_time);return`
    <div class="stat-row"><span class="label">Collected</span><span class="value">${DI(n?.amount_collected,n?.amount_respawned)}</span></div>
    <div class="stat-row"><span class="label">Inactive collected</span><span class="value">${Nn(n?.amount_collected_inactive)}</span></div>
    <div class="stat-row"><span class="label">Big pads amt</span><span class="value">${Nn(n?.amount_collected_big)}</span></div>
    <div class="stat-row"><span class="label">Small pads amt</span><span class="value">${Nn(n?.amount_collected_small)}</span></div>
    <div class="stat-row"><span class="label">Respawns</span><span class="value">${Nn(n?.amount_respawned)}</span></div>
    <div class="stat-row"><span class="label">Overfill</span><span class="value">${Nn(n?.overfill_total)}</span></div>
    <div class="stat-row"><span class="label">Used</span><span class="value">${Nn(n?.amount_used)}</span></div>
    <div class="stat-row"><span class="label">Used ground</span><span class="value">${Nn(n?.amount_used_while_grounded)}</span></div>
    <div class="stat-row"><span class="label">Used air</span><span class="value">${Nn(n?.amount_used_while_airborne)}</span></div>
    <div class="stat-row"><span class="label">Big pads</span><span class="value">${n?.big_pads_collected??"?"}</span></div>
    <div class="stat-row"><span class="label">Small pads</span><span class="value">${n?.small_pads_collected??"?"}</span></div>
    <div class="stat-row"><span class="label">Inactive big pads</span><span class="value">${n?.big_pads_collected_inactive??"?"}</span></div>
    <div class="stat-row"><span class="label">Inactive small pads</span><span class="value">${n?.small_pads_collected_inactive??"?"}</span></div>
    <div class="stat-row"><span class="label">Stolen</span><span class="value">${Nn(n?.amount_stolen)}</span></div>
    <div class="stat-row"><span class="label">Avg boost</span><span class="value">${e}</span></div>
    <div class="stat-row"><span class="label">Time @ 0</span><span class="value">${na(Ke(n?.time_zero_boost),t)}</span></div>
    <div class="stat-row"><span class="label">Time 0-25</span><span class="value">${na(Ke(n?.time_boost_0_25),t)}</span></div>
    <div class="stat-row"><span class="label">Time 25-50</span><span class="value">${na(Ke(n?.time_boost_25_50),t)}</span></div>
    <div class="stat-row"><span class="label">Time 50-75</span><span class="value">${na(Ke(n?.time_boost_50_75),t)}</span></div>
    <div class="stat-row"><span class="label">Time 75-100</span><span class="value">${na(Ke(n?.time_boost_75_100),t)}</span></div>
    <div class="stat-row"><span class="label">Time @ 100</span><span class="value">${na(Ke(n?.time_hundred_boost),t)}</span></div>
  `}const Ld={kind:{label:"Kind",valueOrder:["control","medium_hit","hard_hit"],formatValue:n=>({control:"Control",medium_hit:"Medium",hard_hit:"Hard"})[n]??n},height_band:{label:"Height",valueOrder:["ground","low_air","high_air"],formatValue:n=>({ground:"Ground",low_air:"Low air",high_air:"High air"})[n]??n},surface:{label:"Surface",valueOrder:["ground","air","wall"],formatValue:n=>({ground:"Ground",air:"Air",wall:"Wall"})[n]??n},dodge_state:{label:"Dodge",valueOrder:["no_dodge","dodge"],formatValue:n=>({no_dodge:"No dodge",dodge:"Dodge"})[n]??n}};function JI(n){const e=new Set,t=[];for(const i of n??[])e.has(i)||(e.add(i),t.push(i));return t}function Ri(n){return n===void 0||Number.isNaN(n)?"?":`${Math.round(n)}`}function iu(n,e=0,t=""){return n===void 0||!Number.isFinite(n)?"?":`${n.toFixed(e)}${t}`}function i_(n){return n.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Dn(n,e){return`<div class="stat-row"><span class="label">${i_(n)}</span><span class="value">${i_(e)}</span></div>`}function QI(n,e,t){for(const i of t){const{valueOrder:a}=Ld[i],s=a.indexOf(n[i]),r=a.indexOf(e[i]),o=s===-1?Number.MAX_SAFE_INTEGER:s,l=r===-1?Number.MAX_SAFE_INTEGER:r;if(o!==l)return o-l}return 0}function ek(n,e){if(e.length===1){const t=e[0];return Ld[t].formatValue(n[t])}return e.map(t=>Ld[t].formatValue(n[t])).join(" / ")}function tk(n){return(n?.labeled_touch_counts?.entries??[]).map(e=>({labels:e.labels,count:e.count}))}function nk(n,e){if(e.length===0||n.length===0)return"";const t=new Map;for(const i of n){const a=new Map(i.labels.map(c=>[c.key,c.value])),s={};let r=!0;for(const c of e){const u=a.get(c);if(u===void 0){r=!1;break}s[c]=u}if(!r)continue;const o=e.map(c=>`${c}:${s[c]}`).join("|"),l=t.get(o);l?l.count+=i.count:t.set(o,{values:s,count:i.count})}return[...t.values()].sort((i,a)=>QI(i.values,a.values,e)).map(i=>Dn(ek(i.values,e),Ri(i.count))).join("")}function ik(n,e){if(!n||e.length!==1)return"";const[t]=e;if(t==="kind")return[Dn("Control",Ri(n.control_touch_count)),Dn("Medium",Ri(n.medium_hit_count)),Dn("Hard",Ri(n.hard_hit_count))].join("");if(t==="height_band"){const i=n.high_aerial_touch_count??0,a=(n.aerial_touch_count??0)-i,s=(n.touch_count??0)-(n.aerial_touch_count??0);return[Dn("Ground",Ri(s)),Dn("Low air",Ri(a)),Dn("High air",Ri(i))].join("")}return""}function a_(n,e={}){const t=JI(e.breakdownClasses),i=tk(n),a=nk(i,t)||ik(n,t);return`
    ${Dn("Touches",Ri(n?.touch_count))}
    ${Dn("Ball advanced",iu(n?.total_ball_advance_distance,0," uu"))}
    ${Dn("Ball traveled",iu(n?.total_ball_travel_distance,0," uu"))}
    ${Dn("Ball retreated",iu(n?.total_ball_retreat_distance,0," uu"))}
    ${a}
  `}function ak(n){let e=null,t=5,i="advancement",a=null,s=null,r=null,o=null;const l=new Set,c=["kind","height_band","surface","dodge_state"];return{id:"touch",label:"Touch",setup(f){e=new vN(f.player.sceneState,f.player.container,f.replay,f.statsTimeline,{mode:i}),e.setDecaySeconds(t),u()},teardown(){e?.dispose(),e=null},onBeforeRender(f){e?.update(f.currentTime)},getTimelineEvents(f){return RN(f.statsTimeline,f.replay)},getConfig(){return{decaySeconds:t,overlayMode:i,breakdownClasses:d()}},applyConfig(f){if(f&&typeof f=="object"&&!Array.isArray(f)){const p=f;if(typeof p.decaySeconds=="number"&&Number.isFinite(p.decaySeconds)&&(t=Math.max(1,Math.min(10,p.decaySeconds)),e?.setDecaySeconds(t)),(p.overlayMode==="markers"||p.overlayMode==="advancement")&&(i=p.overlayMode,e?.setMode(i)),l.clear(),Array.isArray(p.breakdownClasses))for(const _ of p.breakdownClasses)c.includes(_)&&l.add(_)}u(),n.rerenderCurrentState()},renderStats(f,p){const _=bt(p.statsFrameLookup,f);return _?Zt(_.players,g=>Ht(g.name,g.is_team_0,a_(g.touch,{breakdownClasses:d()}),g.touch?.is_last_touch?'<span class="role-indicator role-forward">Last Touch</span>':"")):""},renderFocusedPlayerStats(f,p,_){const g=Bt(_,p,f);return g?a_(g.touch,{breakdownClasses:d()}):""},renderSettings(){if(!a){a=document.createElement("div"),a.className="module-settings-card";const f=document.createElement("div");f.className="module-settings-header";const p=document.createElement("div"),_=document.createElement("p");_.className="module-settings-eyebrow",_.textContent="Touch markers";const g=document.createElement("h3");g.textContent="Touch decay",p.append(_,g),s=document.createElement("strong"),s.className="metric-readout",f.append(p,s);const m=document.createElement("label"),h=document.createElement("span");h.className="label",h.textContent="Keep each marker visible after the touch";const y=document.createElement("input");y.type="range",y.min="1",y.max="10",y.step="0.5",y.value=`${t}`,y.addEventListener("input",()=>{const G=Number(y.value);t=Number.isFinite(G)?Math.max(1,Math.min(10,G)):t,e?.setDecaySeconds(t),u(t),n.requestConfigSync?.()}),m.append(h,y);const x=document.createElement("div");x.className="module-settings-subgroup";const b=document.createElement("div");b.className="module-settings-header";const A=document.createElement("div"),M=document.createElement("p");M.className="module-settings-eyebrow",M.textContent="Overlay";const T=document.createElement("h3");T.textContent="Touch mode",A.append(M,T),r=document.createElement("strong"),r.className="metric-readout",b.append(A,r);const C=document.createElement("div");C.className="module-settings-options";for(const G of[{mode:"markers",label:"Markers"},{mode:"advancement",label:"Advancement"}]){const z=document.createElement("label");z.className="toggle";const X=document.createElement("input");X.type="radio",X.name="touch-overlay-mode",X.dataset.overlayMode=G.mode,X.addEventListener("change",()=>{X.checked&&(i=G.mode,e?.setMode(i),u(),n.requestConfigSync?.())});const V=document.createElement("span");V.textContent=G.label,z.append(X,V),C.append(z)}x.append(b,C);const v=document.createElement("div");v.className="module-settings-subgroup";const S=document.createElement("div");S.className="module-settings-header";const R=document.createElement("div"),I=document.createElement("p");I.className="module-settings-eyebrow",I.textContent="Stat display";const U=document.createElement("h3");U.textContent="Touch breakdown",R.append(I,U),o=document.createElement("strong"),o.className="metric-readout",S.append(R,o);const B=document.createElement("div");B.className="module-settings-options";for(const G of[{className:"kind",label:"Kind"},{className:"height_band",label:"Height"},{className:"surface",label:"Surface"},{className:"dodge_state",label:"Dodge"}]){const z=document.createElement("label");z.className="toggle";const X=document.createElement("input");X.type="checkbox",X.dataset.breakdownClass=G.className,X.addEventListener("change",()=>{X.checked?l.add(G.className):l.delete(G.className),u(),n.rerenderCurrentState(),n.requestConfigSync?.()});const V=document.createElement("span");V.textContent=G.label,z.append(X,V),B.append(z)}v.append(S,B),a.append(f,m,x,v)}return u(),a}};function u(f){if(!a)return;const p=f??t,_=a.querySelector("input");_ instanceof HTMLInputElement&&(_.value=`${p}`),s&&(s.textContent=`${p.toFixed(1)}s`);for(const g of a.querySelectorAll("input[data-overlay-mode]"))g.checked=g.dataset.overlayMode===i;r&&(r.textContent=i==="advancement"?"Advancement":"Markers");for(const g of a.querySelectorAll("input[data-breakdown-class]")){const m=g.dataset.breakdownClass;g.checked=m?l.has(m):!1}if(o){const g=d();o.textContent=g.length>0?g.map(m=>({kind:"Kind",height_band:"Height",surface:"Surface",dodge_state:"Dodge"})[m]).join(" + "):"Total only"}}function d(){return c.filter(f=>l.has(f))}}function sk(n,e=Ty({refreshTimelineRanges:n.refreshTimelineRanges,rerenderCurrentState:n.rerenderCurrentState})){return{id:"boost",label:"Boost",setup(t){e.setup(t)},teardown(){e.teardown()},onBeforeRender(){},getTimelineRanges(t){return nI(t.statsTimeline,t.replay,e.getTimelineRangeOptions())},getConfig(){return e.getConfig()},applyConfig(t){e.applyConfig(t)},includeBoostPickupAnimationPickup(t){return e.includePickup(t)},renderStats(t,i){const a=bt(i.statsFrameLookup,t);return a?Zt(a.players,s=>Ht(s.name,s.is_team_0,n_(s.boost))):""},renderFocusedPlayerStats(t,i,a){const s=Bt(a,i,t);return s?n_(s.boost):""},renderSettings(t){return e.renderSettings(t,{showHeader:!0})}}}function rk(){return mn({id:"core",label:"Core",select:n=>n.core,render:n=>zI(n)})}function ok(){return mn({id:"backboard",label:"Backboard",select:n=>n.backboard,render:n=>HI(n),getTimelineEvents(n){return PN(n.statsTimeline,n.replay)}})}function lk(){let n=null;return{id:"ceiling-shot",label:"Ceiling Shot",setup(e){n=new cN(e.player.sceneState,e.player.container,e.replay,e.statsTimeline)},teardown(){n?.dispose(),n=null},onBeforeRender(e){n?.update(e.currentTime)},renderStats(e,t){const i=bt(t.statsFrameLookup,e);return i?Zt(i.players,a=>Ht(a.name,a.is_team_0,Km(a.ceiling_shot),a.ceiling_shot?.is_last_ceiling_shot?'<span class="role-indicator role-forward">Last Ceiling Shot</span>':"")):""},renderFocusedPlayerStats(e,t,i){const a=Bt(i,t,e);return a?Km(a.ceiling_shot):""}}}function ck(){return{id:"wall-aerial",label:"Wall-to-Air Setup",setup(){},teardown(){},onBeforeRender(){},renderStats(n,e){const t=bt(e.statsFrameLookup,n);return t?Zt(t.players,i=>Ht(i.name,i.is_team_0,Ym(i.wall_aerial),i.wall_aerial?.is_last_wall_aerial?'<span class="role-indicator role-forward">Last Wall-to-Air Setup</span>':"")):""},renderFocusedPlayerStats(n,e,t){const i=Bt(t,e,n);return i?Ym(i.wall_aerial):""}}}function uk(){return{id:"wall-aerial-shot",label:"Wall Aerial Shot",setup(){},teardown(){},onBeforeRender(){},renderStats(n,e){const t=bt(e.statsFrameLookup,n);return t?Zt(t.players,i=>Ht(i.name,i.is_team_0,jm(i.wall_aerial_shot),i.wall_aerial_shot?.is_last_wall_aerial_shot?'<span class="role-indicator role-forward">Last Wall Aerial Shot</span>':"")):""},renderFocusedPlayerStats(n,e,t){const i=Bt(t,e,n);return i?jm(i.wall_aerial_shot):""}}}function dk(){return mn({id:"ball-carry",label:"Ball Carry",select:n=>n.ball_carry,render:n=>WI(n)})}function fk(){return mn({id:"air-dribble",label:"Air Dribble",select:n=>n.air_dribble,render:n=>XI(n)})}function pk(){return mn({id:"dodge-reset",label:"Dodge Refresh",select:n=>n.dodge_reset,render:n=>ZI(n)})}function hk(){return mn({id:"double-tap",label:"Double Tap",select:n=>n.double_tap,render:n=>VI(n)})}function mk(){return mn({id:"pass",label:"Pass",select:n=>n.pass,render:n=>GI(n)})}function _k(){return mn({id:"one-timer",label:"One-timer",select:n=>n.one_timer,render:n=>$I(n)})}function gk(){return{id:"musty-flick",label:"Musty Flick",setup(){},teardown(){},onBeforeRender(){},renderStats(n,e){const t=bt(e.statsFrameLookup,n);return t?Zt(t.players,i=>Ht(i.name,i.is_team_0,Zm(i.musty_flick),i.musty_flick?.is_last_musty?'<span class="role-indicator role-forward">Last Musty</span>':"")):""},renderFocusedPlayerStats(n,e,t){const i=Bt(t,e,n);return i?Zm(i.musty_flick):""}}}function vk(){return{id:"flick",label:"Flick",setup(){},teardown(){},onBeforeRender(){},renderStats(n,e){const t=bt(e.statsFrameLookup,n);return t?Zt(t.players,i=>Ht(i.name,i.is_team_0,Jm(i.flick),i.flick?.is_last_flick?'<span class="role-indicator role-forward">Last Flick</span>':"")):""},renderFocusedPlayerStats(n,e,t){const i=Bt(t,e,n);return i?Jm(i.flick):""}}}function yk(){let n=null;return{id:"speed-flip",label:"Speed Flip",setup(e){n=new LI(e.player.sceneState,e.player.container,e.replay,e.statsTimeline)},teardown(){n?.dispose(),n=null},onBeforeRender(e){n?.update(e.currentTime)},renderStats(e,t){const i=bt(t.statsFrameLookup,e);return i?Zt(i.players,a=>Ht(a.name,a.is_team_0,Qm(a.speed_flip),a.speed_flip?.is_last_speed_flip?'<span class="role-indicator role-forward">Last Speed Flip</span>':"")):""},renderFocusedPlayerStats(e,t,i){const a=Bt(i,t,e);return a?Qm(a.speed_flip):""}}}function bk(){return{id:"half-flip",label:"Half Flip",setup(){},teardown(){},onBeforeRender(){},renderStats(n,e){const t=bt(e.statsFrameLookup,n);return t?Zt(t.players,i=>Ht(i.name,i.is_team_0,e_(i.half_flip),i.half_flip?.is_last_half_flip?'<span class="role-indicator role-forward">Last Half Flip</span>':"")):""},renderFocusedPlayerStats(n,e,t){const i=Bt(t,e,n);return i?e_(i.half_flip):""}}}function Sk(){return{id:"wavedash",label:"Wavedash",setup(){},teardown(){},onBeforeRender(){},getTimelineEvents(n){return IN(n.statsTimeline,n.replay)},renderStats(n,e){const t=bt(e.statsFrameLookup,n);return t?Zt(t.players,i=>Ht(i.name,i.is_team_0,t_(i.wavedash),i.wavedash?.is_last_wavedash?'<span class="role-indicator role-forward">Last Wavedash</span>':"")):""},renderFocusedPlayerStats(n,e,t){const i=Bt(t,e,n);return i?t_(i.wavedash):""}}}function xk(){return mn({id:"whiff",label:"Whiff",select:n=>n.whiff,render:n=>KI(n),getTimelineEvents(n){return UN(n.statsTimeline,n.replay)}})}function wk(n){let e=null,t=null;const i=new Set,a=["speed_band","height_band"];return{id:"movement",label:"Movement",setup(){s()},teardown(){},onBeforeRender(){},getConfig(){return{breakdownClasses:r()}},applyConfig(o){if(i.clear(),o&&typeof o=="object"&&!Array.isArray(o)){const l=o.breakdownClasses;if(Array.isArray(l))for(const c of l)a.includes(c)&&i.add(c)}s(),n.rerenderCurrentState()},renderStats(o,l){const c=bt(l.statsFrameLookup,o);return c?Zt(c.players,u=>Ht(u.name,u.is_team_0,Hm(u.movement,{breakdownClasses:r()}))):""},renderFocusedPlayerStats(o,l,c){const u=Bt(c,l,o);return u?Hm(u.movement,{breakdownClasses:r()}):""},renderSettings(){if(!e){e=document.createElement("div"),e.className="module-settings-card";const o=document.createElement("div");o.className="module-settings-header";const l=document.createElement("div"),c=document.createElement("p");c.className="module-settings-eyebrow",c.textContent="Stat display";const u=document.createElement("h3");u.textContent="Movement breakdown",l.append(c,u),t=document.createElement("strong"),t.className="metric-readout",o.append(l,t);const d=document.createElement("div");d.className="module-settings-options";for(const f of[{className:"speed_band",label:"Speed band"},{className:"height_band",label:"Height band"}]){const p=document.createElement("label");p.className="toggle";const _=document.createElement("input");_.type="checkbox",_.dataset.breakdownClass=f.className,_.addEventListener("change",()=>{_.checked?i.add(f.className):i.delete(f.className),s(),n.rerenderCurrentState(),n.requestConfigSync?.()});const g=document.createElement("span");g.textContent=f.label,p.append(_,g),d.append(p)}e.append(o,d)}return s(),e}};function s(){if(e){for(const o of e.querySelectorAll("input[data-breakdown-class]")){const l=o.dataset.breakdownClass;o.checked=l?i.has(l):!1}if(t){const o=r();t.textContent=o.length>0?o.map(l=>({speed_band:"Speed band",height_band:"Height band"})[l]).join(" + "):"Total only"}}}function r(){return a.filter(o=>i.has(o))}}function Ek(){return mn({id:"powerslide",label:"Powerslide",select:n=>n.powerslide,render:n=>qI(n),getTimelineEvents(n){return NN(n.statsTimeline,n.replay)}})}function Mk(){return mn({id:"rotation",label:"Rotation",select:n=>n.rotation,render:n=>BI(n)})}function Tk(){return mn({id:"demo",label:"Demo",select:n=>n.demo,render:n=>YI(n)})}function Ck(){return mn({id:"bump",label:"Bump",select:n=>n.bump,render:n=>jI(n),getTimelineEvents(n){return kN(n.statsTimeline,n.replay)}})}function Ak(){let n=null,e=1;return{id:wy,label:"Relative Positioning",setup(t){e=t.fieldScale,n=new w2(t.player.sceneState.scene,t.replay,e)},teardown(){n?.dispose(),n=null},onBeforeRender(t){n?.update(t,e)},renderStats(t,i){const a=bt(i.statsFrameLookup,t);return a?Zt(a.players,s=>{const r=cI(i.replay,zt(s.player_id),t),o=lI[r];return Ht(s.name,s.is_team_0,Wm(s.positioning),`<span class="depth-indicator depth-${r}" title="Team Depth: ${o}" aria-label="Team Depth: ${o}">${o}</span>`)}):""},renderFocusedPlayerStats(t,i,a){const s=Bt(a,i,t);return s?Wm(s.positioning):""}}}function Rk(){return{id:"absolute-positioning",label:"Absolute Positioning",setup(n){Gm.acquire(n)},teardown(){Gm.release()},onBeforeRender(){},getTimelineRanges(n){return oI(n.statsTimeline,n.replay)},renderStats(n,e){const t=bt(e.statsFrameLookup,n);return t?Zt(t.players,i=>Ht(i.name,i.is_team_0,Xm(i.positioning))):""},renderFocusedPlayerStats(n,e,t){const i=Bt(t,e,n);return i?Xm(i.positioning):""}}}function Pk(n,e={}){return[rk(),ok(),lk(),ck(),uk(),hk(),_k(),mk(),uI(n),dI(),fI(),pI(),Ak(),Rk(),Mk(),yk(),bk(),Sk(),ak(n),xk(),vk(),gk(),pk(),fk(),sk(n,e.boostPickupFilters),dk(),wk(n),Ek(),Tk(),Ck()]}const Lk=new Set(["player_id","name","is_team_0"]),Nk=["is_last_","time_since_last_","frames_since_last_"];function Ik(n){return n===null||typeof n=="number"||typeof n=="string"||typeof n=="boolean"||Array.isArray(n)}function kk(n,e){let t=n;for(const i of e){if(!t||typeof t!="object"||Array.isArray(t))return;t=t[i]}return t}function Dk(n){return n==null?"--":typeof n=="number"?Number.isFinite(n)?Number.isInteger(n)?`${n}`:`${Number(n.toFixed(3))}`:"--":typeof n=="boolean"?n?"true":"false":Array.isArray(n)?n.length===0?"[]":JSON.stringify(n):`${n}`}function Fk(n,e){if(Nk.some(s=>n.startsWith(s)))return!0;const t=n.match(/^last_(.+)_time$/),i=n.match(/^last_(.+)_frame$/),a=t?.[1]??i?.[1];return a?`is_last_${a}`in e||`time_since_last_${a}`in e||`frames_since_last_${a}`in e:!1}function Nd(n,e,t,i){if(!n||typeof n!="object"||Array.isArray(n))return;const a=n;for(const[s,r]of Object.entries(a)){if(e==="player"&&t.length===0&&Lk.has(s)||Fk(s,a))continue;const o=[...t,s];if(Ik(r)){const l=`${e}:${o.join(".")}`;i.push({id:l,label:o.join("."),category:o[0]??e,scope:e,path:o,read(c){return kk(c,o)},format:Dk});continue}Nd(r,e,o,i)}}function Ok(n){const e=new Set;return n.filter(t=>e.has(t.id)?!1:(e.add(t.id),!0))}function Ry(n,e){const t=[];return n&&Nd(n,"player",[],t),e&&Nd(e,"team",[],t),Ok(t).sort((i,a)=>i.label.localeCompare(a.label))}function Uk(){return Ry(wf(),ys())}function mr(n){return n?Ry(n.players[0]??wf(),n.team_zero??n.team_one??ys()):Uk()}function Py(n){return n.toLowerCase().replace(/[_/.-]+/g," ").replace(/\s+/g," ").trim()}function Bk(n){return Py(n).split(" ").filter(Boolean)}function zk(n,e){const t=Bk(e);if(t.length===0)return 0;const i=Py([n.scope,n.category,n.label,n.id,...n.path].join(" "));let a=0;for(const s of t){const r=i.indexOf(s);if(r<0)return null;a+=r}return a+i.length/1e3}function Hk(n,e){return n.map((t,i)=>({definition:t,index:i,score:zk(t,e)})).filter(t=>t.score!==null).sort((t,i)=>t.score-i.score||t.index-i.index).map(t=>t.definition)}function Ly(n){if(!Number.isFinite(n))return"--";const e=Math.floor(Math.max(0,n)/60),t=Math.max(0,n)-e*60;return`${e}:${t.toFixed(1).padStart(4,"0")}`}class Vk{constructor(e){this.options=e}statsWindows=new Map;nextStatsWindowId=1;getConfigs(){return[...this.statsWindows.values()].map(e=>({id:e.id,kind:e.kind,placement:this.options.readWindowPlacement(e.element),playerId:e.playerId,team:e.team,entries:e.entries.map(t=>({statId:t.statId,targetId:t.targetId}))}))}clear(){for(const e of this.statsWindows.values())e.element.remove();this.statsWindows.clear(),this.nextStatsWindowId=1}replaceFromConfig(e){this.clear();for(const t of e)this.create(t.kind,t)}render(e=this.options.getReplayPlayer()?.getState().frameIndex??0,t={}){for(const i of this.statsWindows.values())t.preserveOpenPickers&&(i.pickerOpen||i.element.contains(document.activeElement))||this.renderStatsWindow(i,e)}create(e,t){const i=t?.id??`stats-${this.nextStatsWindowId++}`,a=Number.parseInt(i.replace(/^stats-/,""),10);Number.isFinite(a)&&(this.nextStatsWindowId=Math.max(this.nextStatsWindowId,a+1));const{x:s,y:r}=this.getStatsWindowDefaultPosition(),o=document.createElement("section");o.className="stats-window",o.dataset.windowId=i,o.style.setProperty("--window-x",`${s}px`),o.style.setProperty("--window-y",`${r}px`),t&&this.options.applyWindowPlacement(o,t.placement);const l=document.createElement("header");l.className="stats-window-header";const c=document.createElement("div");c.className="stats-window-actions";const u=document.createElement("button");if(u.type="button",u.className="stats-window-action",u.textContent="Hide",c.append(u),this.hasStatsWindowScopeSelector(e))l.classList.add("stats-window-header-actions-only"),l.append(c);else{const p=document.createElement("h2");p.textContent=this.getStatsWindowTitle(e),l.append(p,c)}const d=document.createElement("div");d.className="stats-window-body",o.append(l,d),this.options.layer.append(o);const f={id:i,kind:e,entries:t?.entries.map(p=>({key:`${i}:${p.statId}:${p.targetId??"scope"}`,statId:p.statId,targetId:p.targetId}))??[],playerId:t?.playerId??this.options.getReplayPlayer()?.replay.players[0]?.id??null,team:t?.team??"blue",pickerOpen:!1,query:"",element:o,body:d};return u.addEventListener("click",()=>{o.hidden=!0,this.options.requestConfigSync()}),this.statsWindows.set(i,f),t||this.options.bringWindowToFront(o),this.options.setLauncherOpen(!1),this.renderStatsWindow(f),this.options.requestConfigSync(),f}getStatById(e){return this.options.getStatRegistry().find(t=>t.id===e)??null}getCurrentStatsFrame(e){const t=this.options.getStatsFrameLookup();return t?bt(t,e):null}getTeamSnapshot(e,t){return t==="blue"?e.team_zero??null:e.team_one??null}getTeamLabel(e){return e==="blue"?"Blue":"Orange"}getPlayerTeamClass(e){const t=this.options.getReplayPlayer()?.replay.players.find(i=>i.id===e);return t?qa(t.isTeamZero):null}getTeamScopeClass(e){return qa(e==="blue")}appendGroupedPlayerOptions(e,t){const i=this.options.getReplayPlayer()?.replay.players??[];for(const a of["blue","orange"]){const s=i.filter(o=>o.isTeamZero===(a==="blue"));if(s.length===0)continue;const r=document.createElement("optgroup");r.label=`${this.getTeamLabel(a)} team`;for(const o of s)r.append(new Option(o.name,o.id,o.id===t,o.id===t));e.append(r)}}getStatsWindowScopeTeamClass(e){return e.kind==="player"?this.getPlayerTeamClass(e.playerId):e.kind==="team"?this.getTeamScopeClass(e.team??"blue"):null}getStatTargetTeamClass(e,t){return e.scope==="player"?this.getPlayerTeamClass(t):this.getTeamScopeClass(t==="orange"?"orange":"blue")}getStatsWindowTitle(e){switch(e){case"player":return"Player stats";case"team":return"Team stats";case"all-players":return"All players stats";case"all-teams":return"All teams stats";case"goals-overview":return"Goal labels";case"ad-hoc":return"Ad hoc stats"}}hasStatsWindowScopeSelector(e){return e==="player"||e==="team"}hasStatsWindowStatPicker(e){return e!=="goals-overview"}getStatsWindowAllowedScope(e){switch(e){case"player":case"all-players":return"player";case"team":case"all-teams":return"team";case"goals-overview":return null;case"ad-hoc":return null}}getStatsWindowDefaultPosition(){const e=this.statsWindows.size*18;return{x:Math.max(12,Math.min(window.innerWidth-360,96+e)),y:Math.max(64,Math.min(window.innerHeight-240,96+e))}}renderStatsWindow(e,t=this.options.getReplayPlayer()?.getState().frameIndex??0){const i=document.activeElement,a=i instanceof HTMLInputElement&&i.dataset.statsWindowSearch===e.id,s=a?i.selectionStart:null,r=a?i.selectionEnd:null,o=a?i.selectionDirection:null;if(e.body.replaceChildren(),this.renderStatsWindowScope(e),this.hasStatsWindowStatPicker(e.kind)&&(this.renderStatsWindowAddControl(e),this.renderStatsWindowPicker(e)),this.renderStatsWindowEntries(e,t),a){const l=e.body.querySelector(`input[data-stats-window-search="${e.id}"]`);l?.focus({preventScroll:!0}),l&&s!==null&&r!==null&&l.setSelectionRange(s,r,o??"none")}}renderStatsWindowScope(e){if(e.kind!=="player"&&e.kind!=="team")return;const t=document.createElement("div");t.className="stats-window-scope-row";const i=document.createElement("select");i.className="stats-window-scope-select";const a=this.getStatsWindowScopeTeamClass(e);a&&i.classList.add(a),i.setAttribute("aria-label",e.kind==="player"?"Player stats target":"Team stats target"),e.kind==="player"?(this.appendGroupedPlayerOptions(i,e.playerId),i.value=e.playerId??"",i.addEventListener("change",()=>{e.playerId=i.value||null,this.renderStatsWindow(e),this.options.requestConfigSync()})):(i.append(new Option("Blue","blue",e.team==="blue",e.team==="blue"),new Option("Orange","orange",e.team==="orange",e.team==="orange")),i.value=e.team??"blue",i.addEventListener("change",()=>{e.team=i.value==="orange"?"orange":"blue",this.renderStatsWindow(e),this.options.requestConfigSync()})),t.append(i),e.body.append(t)}renderStatsWindowAddControl(e){const t=document.createElement("button");if(t.type="button",t.className="stats-window-add-button",t.textContent="+",t.title="Add stat",t.setAttribute("aria-label","Add stat"),t.setAttribute("aria-expanded",String(e.pickerOpen)),this.activateButton(t,()=>{e.pickerOpen=!e.pickerOpen,this.renderStatsWindow(e)}),this.hasStatsWindowScopeSelector(e.kind)){e.body.querySelector(".stats-window-scope-row")?.append(t);return}const i=document.createElement("div");i.className="stats-window-toolbar",i.append(t),e.body.append(i)}activateButton(e,t){let i=!1;e.addEventListener("pointerdown",a=>{e.disabled||(i=!0,a.preventDefault(),t())}),e.addEventListener("click",()=>{if(i){i=!1;return}e.disabled||t()})}renderStatsWindowPicker(e){const t=document.createElement("div");if(t.className="stats-window-picker",t.hidden=!e.pickerOpen,t.hidden){e.body.append(t);return}const i=this.getStatsWindowAllowedScope(e.kind),a=document.createElement("input");a.type="search",a.placeholder="Search stats",a.value=e.query,a.dataset.statsWindowSearch=e.id;const s=document.createElement("div");s.className="stats-window-picker-list",a.addEventListener("input",()=>{e.query=a.value,this.renderStatsWindowPickerList(e,s,i)}),this.renderStatsWindowPickerList(e,s,i),t.append(a,s),e.body.append(t)}renderStatsWindowPickerList(e,t,i){t.replaceChildren();const a=this.options.getStatRegistry(),s=i?a.filter(l=>l.scope===i):a,r=Hk(s,e.query),o=new Map;for(const l of r){const c=o.get(l.category)??[];c.push(l),o.set(l.category,c)}for(const[l,c]of o){if(c.length<2)continue;const u=document.createElement("button");u.type="button",u.className="stats-window-picker-item",u.innerHTML=`<span>Add all ${l}</span><strong>${c.length}</strong>`,this.activateButton(u,()=>{for(const d of c)this.addStatToWindow(e,d);this.renderStatsWindow(e),this.options.requestConfigSync()}),t.append(u)}for(const l of r){const c=document.createElement("button");c.type="button",c.className="stats-window-picker-item",c.innerHTML=`<span>${l.label}</span><strong>${l.scope}</strong>`,c.disabled=e.kind!=="ad-hoc"&&e.entries.some(u=>u.statId===l.id),this.activateButton(c,()=>{this.addStatToWindow(e,l),this.renderStatsWindow(e),this.options.requestConfigSync()}),t.append(c)}if(r.length===0){const l=document.createElement("p");l.className="stat-window-empty",l.textContent=a.length===0?"No stats available.":"No matching stats.",t.append(l)}}addStatToWindow(e,t){const i=e.kind==="ad-hoc"?this.getDefaultAdHocTargetId(t):void 0;e.entries.some(a=>a.statId===t.id&&a.targetId===i)||e.entries.push({key:`${e.id}:${t.id}:${i??"scope"}`,statId:t.id,targetId:i})}getDefaultAdHocTargetId(e){return e.scope==="player"?this.options.getReplayPlayer()?.replay.players[0]?.id??"":"blue"}removeStatFromWindow(e,t){const i=e.entries.findIndex(a=>a.key===t);i>=0&&e.entries.splice(i,1)}renderStatsWindowEntries(e,t){if(e.kind==="goals-overview"){this.renderGoalLabelsOverview(e);return}const i=this.getStatsWindowAllowedScope(e.kind),a=e.entries.map(r=>({entry:r,definition:this.getStatById(r.statId)})).filter(r=>r.definition!==null&&(!i||r.definition.scope===i));if(a.length===0){const r=document.createElement("p");r.className="stat-window-empty",r.textContent="No stats added.",e.body.append(r);return}const s=this.getCurrentStatsFrame(t);if(!s){const r=document.createElement("p");r.className="stat-window-empty",r.textContent="Load a replay to show stats.",e.body.append(r);return}if(e.kind==="all-players"){this.renderAllPlayersStats(e,s,a);return}if(e.kind==="all-teams"){this.renderAllTeamsStats(e,s,a);return}if(e.kind==="player"){const r=e.playerId?s.players.find(o=>zt(o.player_id)===e.playerId)??null:null;this.renderScopedStatList(e,r,a);return}if(e.kind==="team"){this.renderScopedStatList(e,this.getTeamSnapshot(s,e.team??"blue"),a);return}e.kind==="ad-hoc"&&this.renderAdHocStats(e,s,a)}renderGoalLabelsOverview(e){const t=this.options.getStatsTimeline(),i=this.options.getReplayPlayer()?.replay??null;if(!t||!i){this.appendStatsWindowEmpty(e,"Load a replay to show goal labels.");return}const a=[...t.events.goal_context??[]].sort((c,u)=>c.time-u.time),s=new Map;for(const c of t.events.goal_tags??[]){const u=s.get(c.goal_index)??[];u.push(c),s.set(c.goal_index,u)}for(const c of s.values())c.sort((u,d)=>u.kind.localeCompare(d.kind)||d.confidence-u.confidence);const r=new Set(a.map((c,u)=>u));for(const c of s.keys())r.add(c);const o=[...r].sort((c,u)=>c-u);if(o.length===0){this.appendStatsWindowEmpty(e,"No goals loaded.");return}const l=document.createElement("div");l.className="goal-label-list";for(const c of o){const u=a[c]??null,d=s.get(c)??[],f=d[0]??null,p=u?.time??f?.time??0,_=u?.scorer??f?.scorer??null,g=_?zt(_):null,m=_?i.players.find(S=>S.id===g)?.name??g:"Unknown scorer",h=u?.scoring_team_is_team_0??f?.scoring_team_is_team_0??null,y=document.createElement("section");y.className="goal-label-item",h!==null&&y.classList.add(qa(h));const x=document.createElement("header"),b=document.createElement("h3");b.textContent=`Goal ${c+1}`;const A=document.createElement("span");A.textContent=`${Ly(p)} · ${m}`,x.append(b,A);const M=document.createElement("div");if(M.className="goal-label-tags",d.length===0){const S=document.createElement("span");S.className="goal-label-tag goal-label-tag-empty",S.textContent="Unlabeled",M.append(S)}else for(const S of d){const R=document.createElement("span");R.className="goal-label-tag",R.textContent=`${hn(S.kind)} ${Math.round(S.confidence*100)}%`,M.append(R)}const T=document.createElement("div");T.className="goal-label-actions";const C=document.createElement("button");C.type="button",C.className="goal-label-watch",C.textContent="Watch",C.addEventListener("click",()=>{this.options.watchGoalReplay(p,g)});const v=document.createElement("button");v.type="button",v.textContent="Cue",v.addEventListener("click",()=>{this.options.cueGoalReplay(p)}),T.append(C,v),y.append(x,M,T),l.append(y)}e.body.append(l)}appendStatsWindowEmpty(e,t){const i=document.createElement("p");i.className="stat-window-empty",i.textContent=t,e.body.append(i)}renderScopedStatList(e,t,i){const a=document.createElement("div");a.className="stats-window-stat-list";for(const{entry:s,definition:r}of i)a.append(this.renderStatRow(e,s,r,t?r.format(r.read(t)):"--"));e.body.append(a)}renderAllPlayersStats(e,t,i){const a=document.createElement("div");a.className="stats-window-team-list";for(const s of["blue","orange"]){const r=t.players.filter(f=>f.is_team_0===(s==="blue"));if(r.length===0)continue;const o=document.createElement("section");o.className=`stats-window-team-group ${this.getTeamScopeClass(s)}`;const l=document.createElement("header");l.className="stats-window-team-header";const c=document.createElement("h3");c.textContent=`${this.getTeamLabel(s)} team`;const u=document.createElement("span");u.textContent=`${r.length} player${r.length===1?"":"s"}`,l.append(c,u),o.append(l);const d=document.createElement("div");d.className="stats-window-entity-list";for(const f of r){const p=document.createElement("section");p.className=`stats-window-entity ${qa(f.is_team_0)}`;const _=document.createElement("h4");_.className="stats-window-entity-title",_.textContent=f.name,p.append(_);for(const{entry:g,definition:m}of i)p.append(this.renderStatRow(e,g,m,m.format(m.read(f))));d.append(p)}o.append(d),a.append(o)}e.body.append(a)}renderAllTeamsStats(e,t,i){const a=document.createElement("div");a.className="stats-window-entity-list";for(const s of["blue","orange"]){const r=this.getTeamSnapshot(t,s),o=document.createElement("section");o.className=`stats-window-entity ${this.getTeamScopeClass(s)}`;const l=document.createElement("h3");l.className="stats-window-entity-title",l.textContent=this.getTeamLabel(s),o.append(l);for(const{entry:c,definition:u}of i)o.append(this.renderStatRow(e,c,u,r?u.format(u.read(r)):"--"));a.append(o)}e.body.append(a)}renderAdHocStats(e,t,i){const a=document.createElement("div");a.className="stats-window-stat-list";for(const{entry:s,definition:r}of i){const o=this.getAdHocTarget(t,r,s.targetId);a.append(this.renderStatRow(e,s,r,o?r.format(r.read(o)):"--"))}e.body.append(a)}getAdHocTarget(e,t,i){return t.scope==="player"?e.players.find(a=>zt(a.player_id)===i)??e.players[0]??null:this.getTeamSnapshot(e,i==="orange"?"orange":"blue")}renderStatRow(e,t,i,a){const s=document.createElement("div");s.className="stats-window-stat-row";const r=document.createElement("span");if(r.className="stats-window-stat-name",r.textContent=i.label,e.kind==="ad-hoc"){const c=document.createElement("select");c.className="stats-window-stat-target";const u=this.getStatTargetTeamClass(i,t.targetId);u&&c.classList.add(u),i.scope==="player"?this.appendGroupedPlayerOptions(c,t.targetId):c.append(new Option("Blue","blue",t.targetId==="blue",t.targetId==="blue"),new Option("Orange","orange",t.targetId==="orange",t.targetId==="orange")),c.value=t.targetId??"",c.addEventListener("change",()=>{const d=c.value;if(e.entries.some(p=>p!==t&&p.statId===t.statId&&p.targetId===d)){this.renderStatsWindow(e);return}const f=e.entries.findIndex(p=>p.key===t.key);f>=0&&(e.entries[f]={key:`${e.id}:${t.statId}:${d}`,statId:t.statId,targetId:d}),this.renderStatsWindow(e),this.options.requestConfigSync()}),r.append(" ",c)}const o=document.createElement("span");o.className="stats-window-stat-value",o.textContent=a;const l=document.createElement("button");return l.type="button",l.className="stats-window-stat-remove",l.textContent="x",l.addEventListener("click",()=>{this.removeStatFromWindow(e,t.key),this.renderStatsWindow(e),this.options.requestConfigSync()}),s.append(r,o,l),s}}function Gk(n){return new Vk(n)}const $k=new Set(["module:touch","module:powerslide"]),s_=["#3b82f6","#06b6d4","#22c55e","#a855f7","#f97316","#ef4444","#f59e0b","#ec4899"],Wk="#d1d9e0",Xk=[{id:"core",label:"Shots, saves, assists",buildEvents(n){return n.replay.timelineEvents.filter(e=>e.kind==="shot"||e.kind==="save"||e.kind==="assist")}},{id:"demo",label:"Demos",buildEvents(n){return n.replay.timelineEvents.filter(e=>e.kind==="demo")}}],qk=[];function Kk({ctx:n,modules:e,activeTimelineEventSourceIds:t,activeMechanicTimelineKinds:i,toggleEventSource:a,setMechanicTimelineKind:s}){if(!n)return[];const r=[];for(const o of Xk){const l=o.buildEvents(n),c=l.length;c!==0&&r.push({id:o.id,playlistId:`replay:${o.id}`,timelineKey:`events:${o.id}`,timelineId:`events:${o.id}`,group:"Replay",label:o.label,count:c,active:t.has(o.id),buildTimelineEvents(){return l},buildPlaylistEvents(){return l},setActive(u){a(o.id,u)}})}for(const o of e.filter(l=>l.getTimelineEvents)){const l=o.getTimelineEvents?.(n)??[],c=l.length;c!==0&&r.push({id:o.id,playlistId:`module:${o.id}`,timelineKey:`module:${o.id}`,timelineId:`module:${o.id}`,group:"Stats",label:o.label,count:c,active:t.has(o.id),buildTimelineEvents(){return l},buildPlaylistEvents(){return l},setActive(u){a(o.id,u)}})}for(const o of qk){const l=o.buildEvents(n),c=l.length;c!==0&&r.push({id:o.id,playlistId:`extra:${o.id}`,timelineKey:`extra:${o.id}`,timelineId:`extra:${o.id}`,group:"Stats",label:o.label,count:c,active:t.has(o.id),buildTimelineEvents(){return l},buildPlaylistEvents(){return l},setActive(u){a(o.id,u)}})}for(const o of _y(n.statsTimeline)){const l=EN(n.statsTimeline,n.replay,[o]),c=MN(n.statsTimeline,n.replay,[o]),u=WN(n.statsTimeline,n.replay,[o]),d=l.length+u.length;d!==0&&r.push({id:`mechanic:${o}`,playlistId:`mechanic:${o}`,timelineKey:`mechanic:${o}`,timelineId:`mechanic:${o}`,group:"Mechanics",label:hn(o),count:d,active:i.has(o),buildTimelineEvents(){return l},buildPlaylistEvents(){return c},buildTimelineRanges(){return u},setActive(f){s(o,f)}})}return r.sort((o,l)=>o.label.localeCompare(l.label))}function Yk(n,e){if(!n)return[];const t=[{id:"replay:goals",group:"Replay",label:"Goals",events:n.replay.timelineEvents.filter(a=>a.kind==="goal")}].filter(a=>a.events.length>0),i=e.map(a=>({id:a.playlistId,group:a.group,label:a.label,events:a.buildPlaylistEvents()})).filter(a=>a.events.length>0);return[...t,...i]}function Id(n,e){const t=n.map(i=>i.id);return e===null?new Set(t.filter(i=>!$k.has(i))):new Set(t.filter(i=>e.has(i)))}function jk(n,e){const t=n.playerId??null,i=t?e.findIndex(a=>a.id===t):-1;return i>=0?s_[i%s_.length]:n.color??Wk}function Zk({sources:n,activeSourceIds:e,replayPlayers:t}){const i=Id(n,e);return n.filter(a=>i.has(a.id)).flatMap(a=>a.events.map((s,r)=>({key:`${a.id}:${s.id??`${s.kind}:${s.time}:${r}`}`,sourceId:a.id,sourceLabel:a.label,event:s,color:jk(s,t)}))).sort((a,s)=>a.event.time!==s.event.time?a.event.time-s.event.time:(a.event.label??a.sourceLabel).localeCompare(s.event.label??s.sourceLabel))}class Jk{constructor(e){this.options=e}getSources(e=this.options.getContext()){return Kk({ctx:e,modules:this.options.modules,activeTimelineEventSourceIds:this.options.getActiveTimelineEventSourceIds(),activeMechanicTimelineKinds:this.options.getActiveMechanicTimelineKinds(),toggleEventSource:this.options.toggleEventSource,setMechanicTimelineKind:this.options.setMechanicTimelineKind})}countVisibleSources(e){return e.replay.timelineEvents.filter(i=>i.kind==="goal").length+this.getSources(e).filter(i=>i.active).reduce((i,a)=>i+a.count,0)}render(){const{body:e}=this.options;e.replaceChildren();const t=this.getSources();if(t.length===0){const d=document.createElement("p");d.className="stat-window-empty",d.textContent="No events loaded.",e.append(d);return}const i=document.createElement("div");i.className="mechanics-actions";const a=document.createElement("button");a.type="button",a.className="module-summary-item",a.addEventListener("click",()=>{for(const d of t)d.setActive(!0);this.options.setupActiveModules(),this.options.syncTimelineEvents(),this.options.syncTimelineRanges(),this.render(),this.options.renderModuleSummary(),this.options.renderModuleSettings(),this.options.renderTimelineEventCount(),this.options.requestConfigSync()});const s=document.createElement("span");s.textContent="All events";const r=document.createElement("strong");r.textContent=`${t.length}`,a.append(s,r);const o=document.createElement("button");o.type="button",o.className="module-summary-item",o.addEventListener("click",()=>{for(const d of t)d.setActive(!1);this.options.setupActiveModules(),this.options.syncTimelineEvents(),this.options.syncTimelineRanges(),this.render(),this.options.renderModuleSummary(),this.options.renderModuleSettings(),this.options.renderTimelineEventCount(),this.options.requestConfigSync()});const l=document.createElement("span");l.textContent="No events";const c=document.createElement("strong");c.textContent="Off",o.append(l,c),i.append(a,o),e.append(i);const u=this.renderSourceList(t);u&&e.append(u)}renderSourceList(e){if(e.length===0)return null;const t=document.createElement("div");t.className="module-list mechanics-list mechanics-event-list",t.style.setProperty("--event-source-columns",`${Qk(e.length)}`);for(const i of e){const a=document.createElement("button");a.type="button",a.className="module-summary-item",a.dataset.active=i.active?"true":"false",a.setAttribute("aria-pressed",i.active?"true":"false"),a.addEventListener("click",()=>{i.setActive(!i.active),this.options.syncTimelineEvents(),this.options.syncTimelineRanges(),this.render(),this.options.renderTimelineEventCount()});const s=document.createElement("span");s.textContent=i.label;const r=document.createElement("strong");r.textContent=`${i.active?"On":"Off"} ${i.count}`,a.append(s,r),t.append(a)}return t}}function Qk(n){return window.innerWidth<640?1:window.innerWidth<900?n>=7?2:1:n>=13?3:n>=7?2:1}function eD(n){return new Jk(n)}const tD=new Set(["ceiling-shot","fifty-fifty","pressure",wy,"absolute-positioning","speed-flip","touch"]),r_="touch";class nD{constructor(e){this.options=e}renderSummary(){const{summary:e}=this.options.elements;e.replaceChildren();const t=[],i=[];for(const a of this.options.modules){const s=tD.has(a.id);!a.getTimelineEvents&&!a.getTimelineRanges&&!s||(a.getTimelineEvents&&t.push(this.renderCapabilityToggle(a.id,au(a,"events"),"events")),a.getTimelineRanges&&t.push(this.renderCapabilityToggle(a.id,au(a,"ranges"),"ranges")),s&&i.push(this.renderCapabilityToggle(a.id,au(a,"effects"),"effects")))}i.push(this.renderBoostPickupAnimationToggle()),i.push(this.renderBoostPadOverlayToggle()),e.append(o_("Timeline visualizations",t),o_("In-game visualizations",i))}renderSettings(){const{settings:e}=this.options.elements;e.replaceChildren();const t=this.options.getContext(),i=this.options.getActiveModules().filter(a=>a.id!=="boost"&&a.id!==r_).map(a=>a.renderSettings?.(t)??null).filter(a=>a instanceof HTMLElement);if(i.length===0){e.hidden=!0,this.renderBoostPickupFiltersWindow(),this.renderTouchControlsWindow();return}e.hidden=!1,e.append(...i),this.renderBoostPickupFiltersWindow(),this.renderTouchControlsWindow()}renderBoostPickupAnimationToggle(){const e=this.options.getBoostPickupAnimationEnabled(),t=document.createElement("button");t.type="button",t.className="module-summary-item",t.dataset.active=e?"true":"false",t.setAttribute("aria-pressed",e?"true":"false"),t.addEventListener("click",this.options.toggleBoostPickupAnimation);const i=document.createElement("span");i.textContent="Boost pickup animation";const a=document.createElement("strong");return a.textContent=e?"On":"Off",t.append(i,a),t}renderBoostPadOverlayToggle(){const e=this.options.getBoostPadOverlayEnabled(),t=document.createElement("button");t.type="button",t.className="module-summary-item",t.dataset.active=e?"true":"false",t.setAttribute("aria-pressed",e?"true":"false"),t.addEventListener("click",this.options.toggleBoostPadOverlay);const i=document.createElement("span");i.textContent="Boost pad locations";const a=document.createElement("strong");return a.textContent=e?"On":"Off",t.append(i,a),t}renderCapabilityToggle(e,t,i){const s=this.options.getActiveCapabilityIds(i).has(e),r=document.createElement("button");r.type="button",r.className="module-summary-item",r.dataset.active=s?"true":"false",r.setAttribute("aria-pressed",s?"true":"false"),r.addEventListener("click",()=>{this.options.toggleCapability(e,i,!this.options.getActiveCapabilityIds(i).has(e))});const o=document.createElement("span");o.textContent=t;const l=document.createElement("strong");return l.textContent=s?"On":"Off",r.append(o,l),r}renderBoostPickupFiltersWindow(){const e=this.options.getContext(),t=this.options.boostPickupFilters.renderSettings(e,{showHeader:!1});this.options.elements.boostPickupFilters.replaceChildren(t)}renderTouchControlsWindow(){const e=this.options.getContext(),i=this.options.modules.find(a=>a.id===r_)?.renderSettings?.(e)??null;this.options.elements.touchControls.replaceChildren(),i instanceof HTMLElement&&this.options.elements.touchControls.append(i)}}function o_(n,e){const t=document.createElement("section");t.className="module-summary-group";const i=document.createElement("h3");i.textContent=n;const a=document.createElement("div");return a.className="module-list",a.append(...e),t.append(i,a),t}function au(n,e){const t={"absolute-positioning:ranges":"Position zones","backboard:events":"Backboard","ball-carry:events":"Ball carry","boost:ranges":"Boost pickup timeline","bump:events":"Bump","ceiling-shot:events":"Ceiling shot","demo:events":"Demo","dodge-reset:events":"Dodge refresh","double-tap:events":"Double tap","fifty-fifty:events":"50/50","half-flip:events":"Half flip","musty-flick:events":"Musty flick","possession:ranges":"Possession","powerslide:events":"Powerslide","pressure:ranges":"Half control","rush:ranges":"Rush","speed-flip:events":"Speed flip","touch:events":"Touch","wavedash:events":"Wavedash"},i={"absolute-positioning":"Position zones","ceiling-shot":"Ceiling shot labels","fifty-fifty":"50/50 labels",pressure:"Half control","relative-positioning":"Player roles","speed-flip":"Speed flip labels",touch:"Touch labels"};return e==="effects"?i[n.id]??n.label:t[`${n.id}:${e}`]??`${n.label} timeline`}function iD(n){return new nD(n)}var Ut=Uint8Array,pn=Uint16Array,Pf=Int32Array,Dl=new Ut([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),Fl=new Ut([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),kd=new Ut([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),Ny=function(n,e){for(var t=new pn(31),i=0;i<31;++i)t[i]=e+=1<<n[i-1];for(var a=new Pf(t[30]),i=1;i<30;++i)for(var s=t[i];s<t[i+1];++s)a[s]=s-t[i]<<5|i;return{b:t,r:a}},Iy=Ny(Dl,2),ky=Iy.b,Dd=Iy.r;ky[28]=258,Dd[258]=28;var Dy=Ny(Fl,0),aD=Dy.b,l_=Dy.r,Fd=new pn(32768);for(var mt=0;mt<32768;++mt){var Ci=(mt&43690)>>1|(mt&21845)<<1;Ci=(Ci&52428)>>2|(Ci&13107)<<2,Ci=(Ci&61680)>>4|(Ci&3855)<<4,Fd[mt]=((Ci&65280)>>8|(Ci&255)<<8)>>1}var ti=(function(n,e,t){for(var i=n.length,a=0,s=new pn(e);a<i;++a)n[a]&&++s[n[a]-1];var r=new pn(e);for(a=1;a<e;++a)r[a]=r[a-1]+s[a-1]<<1;var o;if(t){o=new pn(1<<e);var l=15-e;for(a=0;a<i;++a)if(n[a])for(var c=a<<4|n[a],u=e-n[a],d=r[n[a]-1]++<<u,f=d|(1<<u)-1;d<=f;++d)o[Fd[d]>>l]=c}else for(o=new pn(i),a=0;a<i;++a)n[a]&&(o[a]=Fd[r[n[a]-1]++]>>15-n[a]);return o}),Hi=new Ut(288);for(var mt=0;mt<144;++mt)Hi[mt]=8;for(var mt=144;mt<256;++mt)Hi[mt]=9;for(var mt=256;mt<280;++mt)Hi[mt]=7;for(var mt=280;mt<288;++mt)Hi[mt]=8;var _r=new Ut(32);for(var mt=0;mt<32;++mt)_r[mt]=5;var sD=ti(Hi,9,0),rD=ti(Hi,9,1),oD=ti(_r,5,0),lD=ti(_r,5,1),su=function(n){for(var e=n[0],t=1;t<n.length;++t)n[t]>e&&(e=n[t]);return e},Rn=function(n,e,t){var i=e/8|0;return(n[i]|n[i+1]<<8)>>(e&7)&t},ru=function(n,e){var t=e/8|0;return(n[t]|n[t+1]<<8|n[t+2]<<16)>>(e&7)},Lf=function(n){return(n+7)/8|0},Ol=function(n,e,t){return(e==null||e<0)&&(e=0),(t==null||t>n.length)&&(t=n.length),new Ut(n.subarray(e,t))},cD=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],Wn=function(n,e,t){var i=new Error(e||cD[n]);if(i.code=n,Error.captureStackTrace&&Error.captureStackTrace(i,Wn),!t)throw i;return i},uD=function(n,e,t,i){var a=n.length,s=0;if(!a||e.f&&!e.l)return t||new Ut(0);var r=!t,o=r||e.i!=2,l=e.i;r&&(t=new Ut(a*3));var c=function(De){var at=t.length;if(De>at){var N=new Ut(Math.max(at*2,De));N.set(t),t=N}},u=e.f||0,d=e.p||0,f=e.b||0,p=e.l,_=e.d,g=e.m,m=e.n,h=a*8;do{if(!p){u=Rn(n,d,1);var y=Rn(n,d+1,3);if(d+=3,y)if(y==1)p=rD,_=lD,g=9,m=5;else if(y==2){var M=Rn(n,d,31)+257,T=Rn(n,d+10,15)+4,C=M+Rn(n,d+5,31)+1;d+=14;for(var v=new Ut(C),S=new Ut(19),R=0;R<T;++R)S[kd[R]]=Rn(n,d+R*3,7);d+=T*3;for(var I=su(S),U=(1<<I)-1,B=ti(S,I,1),R=0;R<C;){var G=B[Rn(n,d,U)];d+=G&15;var x=G>>4;if(x<16)v[R++]=x;else{var z=0,X=0;for(x==16?(X=3+Rn(n,d,3),d+=2,z=v[R-1]):x==17?(X=3+Rn(n,d,7),d+=3):x==18&&(X=11+Rn(n,d,127),d+=7);X--;)v[R++]=z}}var V=v.subarray(0,M),ee=v.subarray(M);g=su(V),m=su(ee),p=ti(V,g,1),_=ti(ee,m,1)}else Wn(1);else{var x=Lf(d)+4,b=n[x-4]|n[x-3]<<8,A=x+b;if(A>a){l&&Wn(0);break}o&&c(f+b),t.set(n.subarray(x,A),f),e.b=f+=b,e.p=d=A*8,e.f=u;continue}if(d>h){l&&Wn(0);break}}o&&c(f+131072);for(var fe=(1<<g)-1,q=(1<<m)-1,ue=d;;ue=d){var z=p[ru(n,d)&fe],xe=z>>4;if(d+=z&15,d>h){l&&Wn(0);break}if(z||Wn(2),xe<256)t[f++]=xe;else if(xe==256){ue=d,p=null;break}else{var ye=xe-254;if(xe>264){var R=xe-257,he=Dl[R];ye=Rn(n,d,(1<<he)-1)+ky[R],d+=he}var O=_[ru(n,d)&q],K=O>>4;O||Wn(3),d+=O&15;var ee=aD[K];if(K>3){var he=Fl[K];ee+=ru(n,d)&(1<<he)-1,d+=he}if(d>h){l&&Wn(0);break}o&&c(f+131072);var te=f+ye;if(f<ee){var Se=s-ee,ve=Math.min(ee,te);for(Se+f<0&&Wn(3);f<ve;++f)t[f]=i[Se+f]}for(;f<te;++f)t[f]=t[f-ee]}}e.l=p,e.p=ue,e.b=f,e.f=u,p&&(u=1,e.m=g,e.d=_,e.n=m)}while(!u);return f!=t.length&&r?Ol(t,0,f):t.subarray(0,f)},pi=function(n,e,t){t<<=e&7;var i=e/8|0;n[i]|=t,n[i+1]|=t>>8},Fs=function(n,e,t){t<<=e&7;var i=e/8|0;n[i]|=t,n[i+1]|=t>>8,n[i+2]|=t>>16},ou=function(n,e){for(var t=[],i=0;i<n.length;++i)n[i]&&t.push({s:i,f:n[i]});var a=t.length,s=t.slice();if(!a)return{t:Oy,l:0};if(a==1){var r=new Ut(t[0].s+1);return r[t[0].s]=1,{t:r,l:1}}t.sort(function(A,M){return A.f-M.f}),t.push({s:-1,f:25001});var o=t[0],l=t[1],c=0,u=1,d=2;for(t[0]={s:-1,f:o.f+l.f,l:o,r:l};u!=a-1;)o=t[t[c].f<t[d].f?c++:d++],l=t[c!=u&&t[c].f<t[d].f?c++:d++],t[u++]={s:-1,f:o.f+l.f,l:o,r:l};for(var f=s[0].s,i=1;i<a;++i)s[i].s>f&&(f=s[i].s);var p=new pn(f+1),_=Od(t[u-1],p,0);if(_>e){var i=0,g=0,m=_-e,h=1<<m;for(s.sort(function(M,T){return p[T.s]-p[M.s]||M.f-T.f});i<a;++i){var y=s[i].s;if(p[y]>e)g+=h-(1<<_-p[y]),p[y]=e;else break}for(g>>=m;g>0;){var x=s[i].s;p[x]<e?g-=1<<e-p[x]++-1:++i}for(;i>=0&&g;--i){var b=s[i].s;p[b]==e&&(--p[b],++g)}_=e}return{t:new Ut(p),l:_}},Od=function(n,e,t){return n.s==-1?Math.max(Od(n.l,e,t+1),Od(n.r,e,t+1)):e[n.s]=t},c_=function(n){for(var e=n.length;e&&!n[--e];);for(var t=new pn(++e),i=0,a=n[0],s=1,r=function(l){t[i++]=l},o=1;o<=e;++o)if(n[o]==a&&o!=e)++s;else{if(!a&&s>2){for(;s>138;s-=138)r(32754);s>2&&(r(s>10?s-11<<5|28690:s-3<<5|12305),s=0)}else if(s>3){for(r(a),--s;s>6;s-=6)r(8304);s>2&&(r(s-3<<5|8208),s=0)}for(;s--;)r(a);s=1,a=n[o]}return{c:t.subarray(0,i),n:e}},Os=function(n,e){for(var t=0,i=0;i<e.length;++i)t+=n[i]*e[i];return t},Fy=function(n,e,t){var i=t.length,a=Lf(e+2);n[a]=i&255,n[a+1]=i>>8,n[a+2]=n[a]^255,n[a+3]=n[a+1]^255;for(var s=0;s<i;++s)n[a+s+4]=t[s];return(a+4+i)*8},u_=function(n,e,t,i,a,s,r,o,l,c,u){pi(e,u++,t),++a[256];for(var d=ou(a,15),f=d.t,p=d.l,_=ou(s,15),g=_.t,m=_.l,h=c_(f),y=h.c,x=h.n,b=c_(g),A=b.c,M=b.n,T=new pn(19),C=0;C<y.length;++C)++T[y[C]&31];for(var C=0;C<A.length;++C)++T[A[C]&31];for(var v=ou(T,7),S=v.t,R=v.l,I=19;I>4&&!S[kd[I-1]];--I);var U=c+5<<3,B=Os(a,Hi)+Os(s,_r)+r,G=Os(a,f)+Os(s,g)+r+14+3*I+Os(T,S)+2*T[16]+3*T[17]+7*T[18];if(l>=0&&U<=B&&U<=G)return Fy(e,u,n.subarray(l,l+c));var z,X,V,ee;if(pi(e,u,1+(G<B)),u+=2,G<B){z=ti(f,p,0),X=f,V=ti(g,m,0),ee=g;var fe=ti(S,R,0);pi(e,u,x-257),pi(e,u+5,M-1),pi(e,u+10,I-4),u+=14;for(var C=0;C<I;++C)pi(e,u+3*C,S[kd[C]]);u+=3*I;for(var q=[y,A],ue=0;ue<2;++ue)for(var xe=q[ue],C=0;C<xe.length;++C){var ye=xe[C]&31;pi(e,u,fe[ye]),u+=S[ye],ye>15&&(pi(e,u,xe[C]>>5&127),u+=xe[C]>>12)}}else z=sD,X=Hi,V=oD,ee=_r;for(var C=0;C<o;++C){var he=i[C];if(he>255){var ye=he>>18&31;Fs(e,u,z[ye+257]),u+=X[ye+257],ye>7&&(pi(e,u,he>>23&31),u+=Dl[ye]);var O=he&31;Fs(e,u,V[O]),u+=ee[O],O>3&&(Fs(e,u,he>>5&8191),u+=Fl[O])}else Fs(e,u,z[he]),u+=X[he]}return Fs(e,u,z[256]),u+X[256]},dD=new Pf([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),Oy=new Ut(0),fD=function(n,e,t,i,a,s){var r=s.z||n.length,o=new Ut(i+r+5*(1+Math.ceil(r/7e3))+a),l=o.subarray(i,o.length-a),c=s.l,u=(s.r||0)&7;if(e){u&&(l[0]=s.r>>3);for(var d=dD[e-1],f=d>>13,p=d&8191,_=(1<<t)-1,g=s.p||new pn(32768),m=s.h||new pn(_+1),h=Math.ceil(t/3),y=2*h,x=function(st){return(n[st]^n[st+1]<<h^n[st+2]<<y)&_},b=new Pf(25e3),A=new pn(288),M=new pn(32),T=0,C=0,v=s.i||0,S=0,R=s.w||0,I=0;v+2<r;++v){var U=x(v),B=v&32767,G=m[U];if(g[B]=G,m[U]=B,R<=v){var z=r-v;if((T>7e3||S>24576)&&(z>423||!c)){u=u_(n,l,0,b,A,M,C,S,I,v-I,u),S=T=C=0,I=v;for(var X=0;X<286;++X)A[X]=0;for(var X=0;X<30;++X)M[X]=0}var V=2,ee=0,fe=p,q=B-G&32767;if(z>2&&U==x(v-q))for(var ue=Math.min(f,z)-1,xe=Math.min(32767,v),ye=Math.min(258,z);q<=xe&&--fe&&B!=G;){if(n[v+V]==n[v+V-q]){for(var he=0;he<ye&&n[v+he]==n[v+he-q];++he);if(he>V){if(V=he,ee=q,he>ue)break;for(var O=Math.min(q,he-2),K=0,X=0;X<O;++X){var te=v-q+X&32767,Se=g[te],ve=te-Se&32767;ve>K&&(K=ve,G=te)}}}B=G,G=g[B],q+=B-G&32767}if(ee){b[S++]=268435456|Dd[V]<<18|l_[ee];var De=Dd[V]&31,at=l_[ee]&31;C+=Dl[De]+Fl[at],++A[257+De],++M[at],R=v+V,++T}else b[S++]=n[v],++A[n[v]]}}for(v=Math.max(v,R);v<r;++v)b[S++]=n[v],++A[n[v]];u=u_(n,l,c,b,A,M,C,S,I,v-I,u),c||(s.r=u&7|l[u/8|0]<<3,u-=7,s.h=m,s.p=g,s.i=v,s.w=R)}else{for(var v=s.w||0;v<r+c;v+=65535){var N=v+65535;N>=r&&(l[u/8|0]=c,N=r),u=Fy(l,u+1,n.subarray(v,N))}s.i=r}return Ol(o,0,i+Lf(u)+a)},pD=function(n,e,t,i,a){if(!a&&(a={l:1},e.dictionary)){var s=e.dictionary.subarray(-32768),r=new Ut(s.length+n.length);r.set(s),r.set(n,s.length),n=r,a.w=s.length}return fD(n,e.level==null?6:e.level,e.mem==null?a.l?Math.ceil(Math.max(8,Math.min(13,Math.log(n.length)))*1.5):20:12+e.mem,t,i,a)};function hD(n,e){return pD(n,e||{},0,0)}function Uy(n,e){return uD(n,{i:2},e,e)}var d_=typeof TextEncoder<"u"&&new TextEncoder,Ud=typeof TextDecoder<"u"&&new TextDecoder,mD=0;try{Ud.decode(Oy,{stream:!0}),mD=1}catch{}var _D=function(n){for(var e="",t=0;;){var i=n[t++],a=(i>127)+(i>223)+(i>239);if(t+a>n.length)return{s:e,r:Ol(n,t-1)};a?a==3?(i=((i&15)<<18|(n[t++]&63)<<12|(n[t++]&63)<<6|n[t++]&63)-65536,e+=String.fromCharCode(55296|i>>10,56320|i&1023)):a&1?e+=String.fromCharCode((i&31)<<6|n[t++]&63):e+=String.fromCharCode((i&15)<<12|(n[t++]&63)<<6|n[t++]&63):e+=String.fromCharCode(i)}};function gD(n,e){var t;if(d_)return d_.encode(n);for(var i=n.length,a=new Ut(n.length+(n.length>>1)),s=0,r=function(c){a[s++]=c},t=0;t<i;++t){if(s+5>a.length){var o=new Ut(s+8+(i-t<<1));o.set(a),a=o}var l=n.charCodeAt(t);l<128||e?r(l):l<2048?(r(192|l>>6),r(128|l&63)):l>55295&&l<57344?(l=65536+(l&1047552)|n.charCodeAt(++t)&1023,r(240|l>>18),r(128|l>>12&63),r(128|l>>6&63),r(128|l&63)):(r(224|l>>12),r(128|l>>6&63),r(128|l&63))}return Ol(a,0,s)}function By(n,e){var t;if(Ud)return Ud.decode(n);var i=_D(n),a=i.s,t=i.r;return t.length&&Wn(8),a}const pl=1,Bd="cfg",f_="cfgDebug";function vD(n){let e="";for(const t of n)e+=String.fromCharCode(t);return btoa(e).replaceAll("+","-").replaceAll("/","_").replace(/=+$/,"")}function yD(n){const e=n.replaceAll("-","+").replaceAll("_","/"),t=e.padEnd(Math.ceil(e.length/4)*4,"="),i=atob(t),a=new Uint8Array(i.length);for(let s=0;s<i.length;s+=1)a[s]=i.charCodeAt(s);return a}function bD(n){return vD(hD(gD(JSON.stringify(n)),{level:9}))}function SD(n){let e;try{e=JSON.parse(By(Uy(yD(n))))}catch(t){try{e=JSON.parse(n)}catch{throw new Error(`Invalid stats player config: ${t instanceof Error?t.message:String(t)}`)}}return MD(e)}function xD(n){const e=zy(n);return e.selectedValue?SD(e.selectedValue):null}function zy(n){const e=new URLSearchParams(Nf(n.hash)),t=new URLSearchParams(n.search),i=e.getAll(Bd),a=t.getAll(Bd),s=i[0]?"hash":a[0]?"search":null,r=s==="hash"?i[0]:s==="search"?a[0]:null;return{search:n.search,hash:n.hash,searchParams:[...t.entries()],hashParams:[...e.entries()],searchValues:a,hashValues:i,selectedSource:s,selectedValue:r}}function wD(n){const e=new URLSearchParams(n.search),t=new URLSearchParams(Nf(n.hash)),i=e.get(f_)??t.get(f_);return i===""||i==="1"||i==="true"}function Hy(n,e){const t=new URL(n.href),i=new URLSearchParams(Nf(t.hash));return i.set(Bd,bD(e)),t.hash=i.toString(),t}function Nf(n){return n.startsWith("#")?n.slice(1):n}function ED(n,e,t=120,i=100){const a=hl(n.viewport.width)??e.width,s=hl(n.viewport.height)??e.height,r=e.width/Math.max(1,a),o=e.height/Math.max(1,s),l=Math.max(8,e.width-t),c=Math.max(8,e.height-i);return{x:p_(n.x*r,8,l),y:p_(n.y*o,8,c)}}function MD(n){if(!En(n)||n.version!==pl)throw new Error("Unsupported stats player config version");return{version:pl,playback:CD(n.playback),camera:AD(n.camera),overlays:PD(n.overlays),recording:TD(n.recording),singletonWindows:LD(n.singletonWindows),statsWindows:ND(n.statsWindows),moduleConfigs:En(n.moduleConfigs)?n.moduleConfigs:{}}}function TD(n){return En(n)?{fps:Wt(n.fps),playbackRate:Wt(n.playbackRate)}:{}}function CD(n){return En(n)?{currentTime:Wt(n.currentTime),playing:Yn(n.playing),rate:Wt(n.rate),skipPostGoalTransitions:Yn(n.skipPostGoalTransitions),skipKickoffs:Yn(n.skipKickoffs)}:{}}function AD(n){if(!En(n))return{};const e={},t=n.mode==="follow"?"follow":n.mode==="free"?"free":void 0,i=n.freePreset==="overhead"?"overhead":n.freePreset==="side"?"side":n.freePreset===null?null:void 0,a=Gy(n.attachedPlayerId),s=Wt(n.distanceScale),r=Yn(n.ballCam),o=RD(n.customSettings);return t!==void 0&&(e.mode=t),i!==void 0&&(e.freePreset=i),a!==void 0&&(e.attachedPlayerId=a),s!==void 0&&(e.distanceScale=s),r!==void 0&&(e.ballCam=r),o!==void 0&&(e.customSettings=o),e}function RD(n){if(n===null)return null;if(!En(n))return;const e={},t=Wt(n.fov),i=Wt(n.height),a=Wt(n.pitch),s=Wt(n.distance),r=Wt(n.stiffness),o=Wt(n.swivelSpeed),l=Wt(n.transitionSpeed);return t!==void 0&&(e.fov=t),i!==void 0&&(e.height=i),a!==void 0&&(e.pitch=a),s!==void 0&&(e.distance=s),r!==void 0&&(e.stiffness=r),o!==void 0&&(e.swivelSpeed=o),l!==void 0&&(e.transitionSpeed=l),e}function PD(n){const e=En(n)?n:{},t=Object.hasOwn(e,"pluginRenderEffects"),i=Object.hasOwn(e,"pluginHudOverlay");return{timelineEvents:Us(e.timelineEvents),timelineRanges:Us(e.timelineRanges),mechanics:Us(e.mechanics),renderEffects:Us(e.renderEffects),...t?{pluginRenderEffects:Us(e.pluginRenderEffects)}:{},...i?{pluginHudOverlay:Yn(e.pluginHudOverlay)??!1}:{},followedPlayerHud:Yn(e.followedPlayerHud)??!1,boostPads:Yn(e.boostPads)??!0,boostPickupAnimation:Yn(e.boostPickupAnimation)??!1,hitboxWireframes:Yn(e.hitboxWireframes)??!1}}function LD(n){return Array.isArray(n)?n.map(e=>!En(e)||!kD(e.id)?null:{id:e.id,placement:Vy(e.placement)}).filter(e=>e!==null):[]}function ND(n){return Array.isArray(n)?n.map(e=>!En(e)||typeof e.id!="string"||!DD(e.kind)?null:{id:e.id,kind:e.kind,placement:Vy(e.placement),playerId:Gy(e.playerId)??null,team:e.team==="orange"?"orange":e.team==="blue"?"blue":null,entries:ID(e.entries)}).filter(e=>e!==null):[]}function ID(n){return Array.isArray(n)?n.map(e=>!En(e)||typeof e.statId!="string"?null:{statId:e.statId,targetId:typeof e.targetId=="string"?e.targetId:void 0}).filter(e=>e!==null):[]}function Vy(n){const e=En(n)?n:{},t=En(e.viewport)?e.viewport:{};return{x:Wt(e.x)??8,y:Wt(e.y)??8,viewport:{width:hl(t.width)??1,height:hl(t.height)??1},zIndex:Wt(e.zIndex),visible:Yn(e.visible)??!0}}function kD(n){return n==="camera"||n==="scoreboard"||n==="playback"||n==="recording"||n==="mechanics"||n==="event-playlist"||n==="mechanics-review"||n==="replay-loading"||n==="boost-pickups"||n==="touch-controls"}function DD(n){return n==="player"||n==="team"||n==="all-players"||n==="all-teams"||n==="goals-overview"||n==="ad-hoc"}function En(n){return typeof n=="object"&&n!==null&&!Array.isArray(n)}function Wt(n){return typeof n=="number"&&Number.isFinite(n)?n:void 0}function hl(n){const e=Wt(n);return e!==void 0&&e>0?e:void 0}function Yn(n){return typeof n=="boolean"?n:void 0}function Gy(n){return n===null?null:typeof n=="string"?n:void 0}function Us(n){return Array.isArray(n)?n.filter(e=>typeof e=="string"):[]}function p_(n,e,t){return Math.min(t,Math.max(e,n))}const FD=["camera","scoreboard","playback","recording","mechanics","event-playlist","mechanics-review","replay-loading","boost-pickups","touch-controls"];class OD{constructor(e){this.options=e}nextZIndex=30;reset(){this.nextZIndex=30}bringToFront(e){e.style.zIndex=`${this.nextZIndex++}`}show(e){const t=this.mustWindow(e);t.hidden=!1,this.bringToFront(t),this.options.requestConfigSync()}toggle(e){const t=this.mustWindow(e);t.hidden=!t.hidden,t.hidden||this.bringToFront(t),this.options.requestConfigSync()}hide(e){const t=this.mustWindow(e);t.hidden=!0,this.options.requestConfigSync()}readPlacement(e){const t=Number.parseInt(e.style.zIndex,10);return{x:this.readCoordinate(e,"--window-x"),y:this.readCoordinate(e,"--window-y"),viewport:h_(),zIndex:Number.isFinite(t)?t:void 0,visible:!e.hidden}}applyPlacement(e,t){const i=ED(t,h_());e.style.setProperty("--window-x",`${i.x}px`),e.style.setProperty("--window-y",`${i.y}px`),e.hidden=!t.visible,t.zIndex!==void 0&&(e.style.zIndex=`${t.zIndex}`,this.nextZIndex=Math.max(this.nextZIndex,t.zIndex+1))}getSingletonConfigs(){const e=[],t=this.options.getRoot();for(const i of FD){const a=t.querySelector(`[data-window-id="${i}"]`);a&&e.push({id:i,placement:this.readPlacement(a)})}return e}applySingletonConfigs(e){const t=this.options.getRoot();for(const i of e){const a=t.querySelector(`[data-window-id="${i.id}"]`);a&&this.applyPlacement(a,i.placement)}}installDragging(e,t){e.addEventListener("pointerdown",i=>{if(!(i.target instanceof HTMLElement)||UD(i.target))return;const a=i.target.closest("[data-window-id]");if(!a||a.hidden)return;this.bringToFront(a);const s=i.clientX,r=i.clientY,o=a.getBoundingClientRect(),l=i.pointerId;a.setPointerCapture(l),i.preventDefault();const c=d=>{const f=Math.max(8,Math.min(window.innerWidth-120,o.left+d.clientX-s)),p=Math.max(8,Math.min(window.innerHeight-100,o.top+d.clientY-r));a.style.setProperty("--window-x",`${f}px`),a.style.setProperty("--window-y",`${p}px`)},u=()=>{a.releasePointerCapture(l),a.removeEventListener("pointermove",c),a.removeEventListener("pointerup",u),a.removeEventListener("pointercancel",u),this.options.requestConfigSync()};a.addEventListener("pointermove",c),a.addEventListener("pointerup",u),a.addEventListener("pointercancel",u)},{signal:t})}mustWindow(e){const t=this.options.getRoot().querySelector(`[data-window-id="${e}"]`);if(!t)throw new Error(`Missing window for id: ${e}`);return t}readCoordinate(e,t){const i=e.style.getPropertyValue(t).trim(),a=getComputedStyle(e).getPropertyValue(t).trim(),s=i||a,r=Number.parseFloat(s);if(Number.isFinite(r))return r;const o=e.getBoundingClientRect();return t==="--window-y"?o.top:o.left}}function h_(){return{width:Math.max(1,window.innerWidth),height:Math.max(1,window.innerHeight)}}function UD(n){return n instanceof Element&&!!n.closest("button, input, select, textarea, option, label, a, [data-no-drag]")}function BD(n){return new OD(n)}class zD{constructor(e){this.options=e}activeSourceIds=null;autoFollow=!0;lastActiveKey=null;reset(){this.activeSourceIds=null,this.lastActiveKey=null}render(){this.options.body.replaceChildren();const e=this.options.getSources();if(e.length===0){const m=document.createElement("p");m.className="stat-window-empty",m.textContent=this.options.getReplayPlayer()?"No events loaded.":"Load a replay to see events.",this.options.body.append(m);return}const t=Id(e,this.activeSourceIds),i=Zk({sources:e,activeSourceIds:this.activeSourceIds,replayPlayers:this.options.getReplayPlayer()?.replay.players??[]}),a=document.createElement("div");a.className="event-playlist-toolbar";const s=document.createElement("details");s.className="event-playlist-filter",s.dataset.noDrag="true";const r=document.createElement("summary");r.textContent=`Filters ${t.size}/${e.length}`,s.append(r);const o=document.createElement("div");o.className="event-playlist-filter-panel";const l=document.createElement("div");l.className="event-playlist-filter-actions";const c=document.createElement("button");c.type="button",c.textContent="All",c.addEventListener("click",()=>{this.activeSourceIds=new Set(e.map(h=>h.id)),this.lastActiveKey=null,this.render();const m=this.options.getReplayPlayer()?.getState();m&&this.syncTimeline(m)});const u=document.createElement("button");u.type="button",u.textContent="None",u.addEventListener("click",()=>{this.activeSourceIds=new Set,this.lastActiveKey=null,this.render()}),l.append(c,u),o.append(l);const d=new Map;for(const m of e){const h=d.get(m.group)??[];h.push(m),d.set(m.group,h)}for(const[m,h]of d){const y=document.createElement("section");y.className="event-playlist-filter-group";const x=document.createElement("h3");x.textContent=m,y.append(x);for(const b of h){const A=document.createElement("label");A.className="toggle event-playlist-filter-option";const M=document.createElement("input");M.type="checkbox",M.checked=t.has(b.id),M.addEventListener("change",()=>{this.setSourceSelection(e,C=>{M.checked?C.add(b.id):C.delete(b.id)})});const T=document.createElement("span");T.textContent=`${b.label} (${b.events.length})`,A.append(M,T),y.append(A)}o.append(y)}s.append(o);const f=document.createElement("label");f.className="toggle event-playlist-follow";const p=document.createElement("input");p.type="checkbox",p.checked=this.autoFollow,p.addEventListener("change",()=>{this.autoFollow=p.checked;const m=this.options.getReplayPlayer()?.getState();m&&this.syncTimeline(m,{forceScroll:!0})});const _=document.createElement("span");_.textContent="Auto-follow",f.append(p,_),a.append(s,f);const g=document.createElement("div");if(g.className="event-playlist-list",g.dataset.noDrag="true",i.length===0){const m=document.createElement("p");m.className="stat-window-empty",m.textContent="No event types selected.",g.append(m)}else for(const m of i){const h=document.createElement("button");h.type="button",h.className="event-playlist-item",h.dataset.eventKey=m.key,h.dataset.eventTime=`${m.event.time}`,h.style.setProperty("--event-color",m.color),h.addEventListener("click",()=>{this.options.cueTimelineEvent(m.event)});const y=document.createElement("span");y.className="event-playlist-time",y.textContent=this.options.formatTime(m.event.time);const x=document.createElement("span");x.className="event-playlist-main";const b=document.createElement("strong");b.textContent=m.event.label??m.sourceLabel;const A=document.createElement("span");A.textContent=[m.event.playerName??null,m.event.frame!==void 0?`frame ${m.event.frame}`:null,m.sourceLabel].filter(M=>!!M).join(" · "),x.append(b,A),h.append(y,x),g.append(h)}this.options.body.append(a,g)}syncTimeline(e,t={}){const i=this.options.body.querySelector(".event-playlist-list");if(!i)return;const a=this.getActiveItem(i,e.currentTime),s=a?.dataset.eventKey??null;s===this.lastActiveKey&&!t.forceScroll||(i.querySelectorAll(".event-playlist-item[data-active='true']").forEach(r=>{r.dataset.active="false"}),a&&(a.dataset.active="true",(this.autoFollow||t.forceScroll)&&a.scrollIntoView({block:"nearest"})),this.lastActiveKey=s)}setSourceSelection(e,t){const i=Id(e,this.activeSourceIds);t(i),this.activeSourceIds=i,this.lastActiveKey=null,this.render();const a=this.options.getReplayPlayer()?.getState();a&&this.syncTimeline(a)}getActiveItem(e,t){const i=[...e.querySelectorAll(".event-playlist-item")];if(i.length===0)return null;let a=i[0]??null,s=Number.POSITIVE_INFINITY;for(const r of i){const o=Number(r.dataset.eventTime);if(!Number.isFinite(o))continue;const l=Math.abs(o-t);l<s&&(s=l,a=r)}return a}}function HD(n){return new zD(n)}function VD(n){return{name:n.name,preparingStatus:"Preparing replay...",async readBytes(){return new Uint8Array(await n.arrayBuffer())}}}function GD(n,e){return{name:n.name,preparingStatus:"Fetching replay...",async readBytes(){const t=await fetch(n.url,{...n.fetchInit,signal:e});if(!t.ok){const i=t.statusText?` ${t.statusText}`:"",a=n.kind==="ballchasing"&&[401,403,404].includes(t.status)?". The replay may be private, unavailable, or not downloadable without a Ballchasing session":"";throw new Error(`Failed to fetch replay from ${n.url.href} (${t.status}${i})${a}`)}return new Uint8Array(await t.arrayBuffer())}}}async function $D(n,e){const t=await n.readBytes();return Nl(t,{reportEveryNFrames:100,onProgress:e})}async function WD(n,e,t){const{elements:i}=t;i.statusReadout.textContent=n.preparingStatus,i.fileInput.disabled=!0,t.getReplayLoadModal()?.show(n.name,n.preparingStatus),t.setTransportEnabled(!1),t.getCameraControlsController()?.syncAvailability(),i.emptyState.hidden=!1;const a=t.getUnsubscribe();a&&(a(),t.setUnsubscribe(null)),t.teardownActiveModules(),t.getReplayPlayer()?.destroy(),t.setReplayPlayer(null),t.setCanvasRecorder(null),t.setLoadedReplayName(null),t.setTimelineOverlay(null),t.setStatsTimeline(null),t.setStatsFrameLookup(null),t.setStatRegistry(mr(null)),t.clearTimelineEventSources(),t.clearTimelineRangeSources(),t.clearStandalonePlugins(),t.clearRenderCaches(),t.resetEventPlaylistWindow(),t.renderScoreboard(),t.renderTimelineEventCount(),t.renderMechanicsTimelineControls(),t.renderEventPlaylistWindow(),t.renderModuleSettings(),t.syncRecordingWindow();try{i.statusReadout.textContent="Parsing replay...",t.getReplayLoadModal()?.show(n.name,"Parsing replay...");const s=await e,{replay:r}=s;t.setStatsTimeline(s.statsTimeline),t.setStatsFrameLookup(s.statsFrameLookup),t.setStatRegistry(mr(null)),t.migrateMechanicBackedTimelineEventSelections();const o=QA({replayEventsLabel:"Replay",replayEvents:d=>t.withTimelineEventSeekTimes(t.getReplayTimelineEvents(d.replay))}),l=kA({onStatusChange:t.syncRecordingWindow});t.setCanvasRecorder(l);const c=t.getInitialConfig(),u=new qC(i.viewport,r,{initialPlaybackRate:c?.playback.rate,initialCameraDistanceScale:c?.camera.distanceScale??t.defaultCameraDistanceScale,initialCustomCameraSettings:c?.camera.customSettings??null,initialAttachedPlayerId:c?.camera.attachedPlayerId??null,initialCameraViewMode:c?.camera.mode,initialBallCamEnabled:c?.camera.ballCam??!1,initialBoostPickupAnimationEnabled:c?.overlays.boostPickupAnimation??!1,initialHitboxWireframesEnabled:c?.overlays.hitboxWireframes??i.hitboxWireframes.checked,initialSkipPostGoalTransitionsEnabled:i.skipPostGoalTransitions.checked,initialSkipKickoffsEnabled:i.skipKickoffs.checked,plugins:[aA(),RA({includePickup:t.includeBoostPickupAnimationPickup}),l,o]});if(t.setTimelineOverlay(o),t.setReplayPlayer(u),t.syncBoostPadOverlayPlugin(),t.setupActiveModules(),t.setUnsubscribe(u.subscribe(t.renderSnapshot)),c){t.setApplyingConfig(!0);try{t.applyConfigToReplayPlayer(c)}finally{t.setApplyingConfig(!1)}}t.getCameraControlsController()?.populateAttachedPlayerOptions(r.players),i.emptyState.hidden=!0,i.statusReadout.textContent=`Loaded ${n.name}`,t.setLoadedReplayName(n.name),i.playersReadout.textContent=r.players.map(d=>d.name).join(", "),i.framesReadout.textContent=`${r.frameCount}`,t.renderTimelineEventCount(),t.renderMechanicsTimelineControls(),t.resetEventPlaylistWindow(),t.renderEventPlaylistWindow(),t.setTransportEnabled(!0),t.getCameraControlsController()?.syncAvailability(u.getState()),t.renderSnapshot(u.getState()),t.renderStatsWindows(u.getState().frameIndex),t.renderScoreboard(u.getState().frameIndex),t.syncEventPlaylistTimeline(u.getState(),{forceScroll:!0}),t.renderModuleSettings(),t.syncRecordingWindow(),t.getReplayLoadModal()?.hide()}catch(s){throw t.getReplayLoadModal()?.hide(),t.getReplayPlayer()?.destroy(),t.setReplayPlayer(null),t.setCanvasRecorder(null),t.syncRecordingWindow(),s}finally{i.fileInput.disabled=!1}}function XD(n){if(n<=0)return"--";const e=["B","KB","MB","GB"];let t=n,i=0;for(;t>=1024&&i<e.length-1;)t/=1024,i+=1;const a=i===0?0:t>=10?1:2;return`${t.toFixed(a)} ${e[i]}`}function qD(n){if(!n)return"No replay";if(n.error)return n.error;switch(n.state){case"idle":return"Idle";case"recording":return"Recording";case"stopping":return"Stopping";case"ready":return"Ready";case"error":return"Error"}}function KD({fpsValue:n,playbackRateValue:e}){const t=Number(n),i=Number(e);return{fps:Number.isFinite(t)?Math.max(1,Math.min(120,Math.trunc(t))):60,playbackRate:Number.isFinite(i)?Math.max(.1,i):1}}function YD(n,e=new Date){const i=(n?.replace(/\.replay$/i,"")||"replay").replace(/[^a-zA-Z0-9._-]+/g,"-").replace(/^-+|-+$/g,""),a=e.toISOString().replace(/[:.]/g,"-");return`${i||"replay"}-${a}.webm`}function jD(n,e){const t=URL.createObjectURL(n),i=document.createElement("a");i.href=t,i.download=e,document.body.append(i),i.click(),i.remove(),window.setTimeout(()=>URL.revokeObjectURL(t),0)}class ZD{constructor(e){this.options=e}getConfigSnapshot(){const{elements:e}=this.options;return{fps:Number(e.fps.value),playbackRate:Number(e.playbackRate.value)}}applyConfig(e){const{elements:t}=this.options;e.fps!==void 0&&(t.fps.value=`${e.fps}`),e.playbackRate!==void 0&&(t.playbackRate.value=`${e.playbackRate}`)}sync(e=this.options.getCanvasRecorder()?.getStatus()??null){const{elements:t}=this.options,i=this.options.getCanvasRecorder()!==null&&this.options.getReplayPlayer()!==null,a=e?.state??"idle",s=a==="recording"||a==="stopping",r=(this.options.getCanvasRecorder()?.getRecording()??null)!==null;t.status.textContent=qD(e),t.elapsed.textContent=`${(e?.elapsedSeconds??0).toFixed(1)}s`,t.size.textContent=XD(e?.sizeBytes??0),t.type.textContent=e?.mimeType||"WebM",t.start.disabled=!i||s,t.fullReplay.disabled=!i||s,t.stop.disabled=!i||!s,t.download.disabled=!r||s,t.clear.disabled=!r||s,t.fps.disabled=s,t.playbackRate.disabled=s}installEventListeners(e){const{elements:t}=this.options;t.start.addEventListener("click",()=>{const i=this.options.getCanvasRecorder();if(i)try{const{fps:a}=this.getRecordingOptions();i.start({fps:a}),this.sync()}catch(a){console.error("Failed to start recording:",a),this.options.setStatus(a instanceof Error?a.message:"Failed to start recording"),this.sync(i.getStatus())}},{signal:e}),t.fullReplay.addEventListener("click",()=>{const i=this.options.getCanvasRecorder();if(!i)return;const{fps:a,playbackRate:s}=this.getRecordingOptions();i.recordFullReplay({fps:a,playbackRate:s,restorePlaybackState:!0}).catch(r=>{console.error("Failed to record replay:",r),this.options.setStatus(r instanceof Error?r.message:"Failed to record replay"),this.sync(this.options.getCanvasRecorder()?.getStatus()??null)}),this.sync()},{signal:e}),t.stop.addEventListener("click",()=>{this.options.getCanvasRecorder()?.stop().catch(i=>{console.error("Failed to stop recording:",i),this.options.setStatus(i instanceof Error?i.message:"Failed to stop recording")}),this.sync()},{signal:e}),t.download.addEventListener("click",()=>{const i=this.options.getCanvasRecorder()?.getRecording();i&&jD(i,YD(this.options.getLoadedReplayName()))},{signal:e}),t.clear.addEventListener("click",()=>{try{this.options.getCanvasRecorder()?.clear(),this.sync()}catch(i){console.error("Failed to clear recording:",i)}},{signal:e}),t.fps.addEventListener("change",this.options.requestConfigSync,{signal:e}),t.playbackRate.addEventListener("change",this.options.requestConfigSync,{signal:e})}getRecordingOptions(){const{elements:e}=this.options;return KD({fpsValue:e.fps.value,playbackRateValue:e.playbackRate.value})}}function JD(n){return new ZD(n)}class QD{constructor(e){this.options=e}render(e=this.options.getReplayPlayer()?.getState().frameIndex??0){const{body:t}=this.options;t.replaceChildren();const i=this.options.getStatsFrameLookup(),a=i?bt(i,e):null,s=this.options.getReplayPlayer()?.replay??null;if(!a||!s){const o=document.createElement("p");o.className="scoreboard-empty",o.textContent="Load a replay to show the scoreboard.",t.append(o);return}const r=document.createElement("div");r.className="scoreboard-scoreline",r.append(m_(a.team_zero?.core.goals,!0),tF(),m_(a.team_one?.core.goals,!1)),t.append(r)}}function eF(n){return typeof n=="number"&&Number.isFinite(n)?`${Math.round(n)}`:"--"}function tF(){const n=document.createElement("span");return n.className="scoreboard-divider",n.textContent="-",n}function m_(n,e){const t=document.createElement("strong");return t.className=`scoreboard-goal-value ${qa(e)}`,t.textContent=eF(n),t}function nF(n){return new QD(n)}class iF{constructor(e){this.options=e}setTransportEnabled(e,t){const{elements:i}=this.options;i.togglePlayback.disabled=!e,i.playbackRate.disabled=!e,i.skipPostGoalTransitions.disabled=!e,i.skipKickoffs.disabled=!e,i.hitboxWireframes.disabled=!e,this.options.getCameraControlsController()?.setTransportEnabled(e,t)}renderSnapshot(e){const{elements:t}=this.options;t.timeReadout.textContent=`${e.currentTime.toFixed(2)}s`,t.frameReadout.textContent=`${e.frameIndex}`,t.durationReadout.textContent=`${e.duration.toFixed(2)}s`,t.playbackStatusReadout.textContent=e.playing?"Playing":"Paused",t.togglePlayback.textContent=e.playing?"Pause":"Play",t.playbackRate.value=`${e.speed}`,this.options.getCameraControlsController()?.syncState(e),t.skipPostGoalTransitions.checked=e.skipPostGoalTransitionsEnabled,t.skipKickoffs.checked=e.skipKickoffsEnabled,t.hitboxWireframes.checked=e.hitboxWireframesEnabled,t.emptyState.hidden=!0}}function aF(n){return new iF(n)}function sF({elements:n,signal:e,setLauncherOpen:t,openReplayFilePicker:i,getElementWindowId:a,toggleWindow:s,hideWindow:r,createStatsWindow:o,loadReplayFile:l,togglePlayback:c,setPlaybackRate:u,setSkipPostGoalTransitionsEnabled:d,setSkipKickoffsEnabled:f,setHitboxWireframesEnabled:p}){n.launcherToggle.addEventListener("click",()=>{t(n.launcherMenu.hidden)},{signal:e}),n.root.addEventListener("click",_=>{_.target instanceof Element&&(_.target.closest(".top-chrome")||t(!1))},{signal:e}),n.loadReplayAction.addEventListener("click",i,{signal:e}),n.emptyLoadReplay.addEventListener("click",i,{signal:e}),n.root.querySelectorAll("[data-window-toggle]").forEach(_=>{_.addEventListener("click",()=>{const g=_.dataset.windowToggle;g&&(s(g),t(!1))},{signal:e})}),n.root.querySelectorAll("[data-window-hide]").forEach(_=>{_.addEventListener("click",()=>{const g=_.dataset.windowHide??a(_);g&&r(g)},{signal:e})}),n.root.querySelectorAll("[data-create-stats-window]").forEach(_=>{_.addEventListener("click",()=>{o(_.dataset.createStatsWindow)},{signal:e})}),n.fileInput.addEventListener("change",()=>{const _=n.fileInput.files?.[0];_&&l(_)},{signal:e}),n.togglePlayback.addEventListener("click",c,{signal:e}),n.playbackRate.addEventListener("change",()=>{u(Number(n.playbackRate.value))},{signal:e}),n.skipPostGoalTransitions.addEventListener("change",()=>{d(n.skipPostGoalTransitions.checked)},{signal:e}),n.skipKickoffs.addEventListener("change",()=>{f(n.skipKickoffs.checked)},{signal:e}),n.hitboxWireframes.addEventListener("change",()=>{p(n.hitboxWireframes.checked)},{signal:e})}class rF{constructor(e){this.options=e}activeModules=[];activeTimelineEventSourceIds=new Set;activeTimelineRangeModuleIds=new Set;activeMechanicTimelineKinds=new Set;activeRenderEffectModuleIds=new Set;removeRenderHook=null;timelineSourceRemovers=new Map;timelineRangeSourceRemovers=new Map;standalonePluginRemovers=new Map;boostPadOverlayEnabled=!0;getActiveModules(){return this.activeModules}getActiveTimelineEventSourceIds(){return this.activeTimelineEventSourceIds}getActiveTimelineRangeModuleIds(){return this.activeTimelineRangeModuleIds}getActiveMechanicTimelineKinds(){return this.activeMechanicTimelineKinds}getActiveRenderEffectModuleIds(){return this.activeRenderEffectModuleIds}getActiveCapabilityIds(e){return e==="events"?this.activeTimelineEventSourceIds:e==="ranges"?this.activeTimelineRangeModuleIds:this.activeRenderEffectModuleIds}getBoostPadOverlayEnabled(){return this.boostPadOverlayEnabled}getTimelineEventSourceIds(){return[...this.activeTimelineEventSourceIds]}getTimelineRangeModuleIds(){return[...this.activeTimelineRangeModuleIds]}getMechanicTimelineKinds(){return[...this.activeMechanicTimelineKinds]}getRenderEffectModuleIds(){return[...this.activeRenderEffectModuleIds]}applyOverlayConfig({timelineEvents:e,timelineRanges:t,mechanics:i,renderEffects:a,boostPads:s}){this.activeTimelineEventSourceIds=new Set(e),this.activeTimelineRangeModuleIds=new Set(t),this.activeMechanicTimelineKinds=new Set(i),this.migrateMechanicBackedTimelineEventSelections(),this.activeRenderEffectModuleIds=new Set(a),this.boostPadOverlayEnabled=s}reset(){this.teardownActiveModules(),this.clearStandalonePlugins(),this.activeModules=[],this.activeTimelineEventSourceIds=new Set,this.activeTimelineRangeModuleIds=new Set,this.activeMechanicTimelineKinds=new Set,this.activeRenderEffectModuleIds=new Set,this.boostPadOverlayEnabled=!0,this.removeRenderHook=null}setupActiveModules(){this.teardownActiveModules();const e=this.options.getContext();if(!e)return;const t=this.getActiveModuleIds();this.activeModules=this.options.modules.filter(i=>t.has(i.id)),this.options.boostPickupFilters.setup(e);for(const i of this.activeModules)i.setup(e);this.removeRenderHook=e.player.onBeforeRender(i=>{for(const a of this.activeModules)this.activeRenderEffectModuleIds.has(a.id)&&a.onBeforeRender(i)}),this.syncTimelineEvents(),this.syncTimelineRanges()}teardownActiveModules(){this.removeRenderHook?.(),this.removeRenderHook=null,this.clearTimelineEventSources(),this.clearTimelineRangeSources();for(const e of this.activeModules)e.teardown();this.activeModules=[]}toggleCapability(e,t,i){const a=this.getMutableActiveCapabilityIds(t);i?a.add(e):a.delete(e),this.setupActiveModules(),this.options.renderModuleSummary(),this.options.renderModuleSettings(),this.options.renderStatsWindows(),this.options.renderTimelineEventCount(),this.options.requestConfigSync()}setMechanicTimelineKind(e,t){t?this.activeMechanicTimelineKinds.add(e):this.activeMechanicTimelineKinds.delete(e),this.options.requestConfigSync()}activateMechanicTimelineKind(e){this.activeMechanicTimelineKinds.add(e),this.syncTimelineEvents(),this.syncTimelineRanges(),this.options.renderTimelineEventCount(),this.options.requestConfigSync()}migrateMechanicBackedTimelineEventSelections(){const e=this.options.getContext();for(const t of _y(e?.statsTimeline??null)){const i=wN(t);this.activeTimelineEventSourceIds.delete(i)&&this.activeMechanicTimelineKinds.add(t)}}clearTimelineEventSources(){for(const e of this.timelineSourceRemovers.values())e();this.timelineSourceRemovers.clear()}clearTimelineRangeSources(){for(const e of this.timelineRangeSourceRemovers.values())e();this.timelineRangeSourceRemovers.clear()}clearStandalonePlugins(){for(const e of this.standalonePluginRemovers.values())e();this.standalonePluginRemovers.clear()}syncBoostPadOverlayPlugin(){this.standalonePluginRemovers.get("boost-pad-overlay")?.(),this.standalonePluginRemovers.delete("boost-pad-overlay");const e=this.options.getReplayPlayer();!e||!this.boostPadOverlayEnabled||this.standalonePluginRemovers.set("boost-pad-overlay",e.addPlugin(fA()))}toggleBoostPadOverlay(){this.boostPadOverlayEnabled=!this.boostPadOverlayEnabled,this.syncBoostPadOverlayPlugin(),this.options.renderModuleSummary(),this.options.requestConfigSync()}syncTimelineEvents(){this.clearTimelineEventSources();const e=this.options.getContext(),t=this.options.getTimelineOverlay();if(!(!t||!e)){for(const i of this.options.getEventTimelineSources(e)){if(!i.active)continue;const a=i.buildTimelineEvents();a.length!==0&&this.timelineSourceRemovers.set(i.timelineKey,t.addEventSource(this.options.withTimelineEventSeekTimes(a),{id:i.timelineId,label:i.label}))}t.refreshEvents()}}syncTimelineRanges(){this.clearTimelineRangeSources();const e=this.options.getContext(),t=this.options.getTimelineOverlay();if(!(!t||!e)){for(const i of this.activeModules)!this.activeTimelineRangeModuleIds.has(i.id)||!i.getTimelineRanges||this.timelineRangeSourceRemovers.set(i.id,t.addRangeSource(()=>i.getTimelineRanges?.(e)??[]));for(const i of this.options.getEventTimelineSources(e)){if(!i.active||!i.buildTimelineRanges)continue;const a=i.buildTimelineRanges();a.length!==0&&this.timelineRangeSourceRemovers.set(i.timelineKey,t.addRangeSource(a))}t.refreshRanges()}}getActiveModuleIds(){return new Set([...this.activeTimelineEventSourceIds,...this.activeTimelineRangeModuleIds,...this.activeRenderEffectModuleIds])}getMutableActiveCapabilityIds(e){return e==="events"?this.activeTimelineEventSourceIds:e==="ranges"?this.activeTimelineRangeModuleIds:this.activeRenderEffectModuleIds}}function oF(n){return new rF(n)}function Sn(n){return typeof n=="object"&&n!==null&&!Array.isArray(n)}function __(n){return Sn(n)&&(n.kind==="time"||n.kind==="frame")&&typeof n.value=="number"&&Number.isFinite(n.value)?{kind:n.kind,value:n.value}:null}function Ro(n,e){if(n!=null){if(typeof n!="number"||!Number.isInteger(n)||!Number.isFinite(n)||n<0)throw new Error(`Review playlist page ${e} must be a non-negative integer.`);return n}}function g_(n,e){if(n!=null){if(typeof n!="string")throw new Error(`Review playlist page ${e} must be a string.`);return n}}function lF(n){if(n!=null){if(!Sn(n))throw new Error("Review playlist page must be an object.");return{next:g_(n.next,"next"),previous:g_(n.previous,"previous"),total:Ro(n.total,"total"),count:Ro(n.count,"count"),limit:Ro(n.limit,"limit"),offset:Ro(n.offset,"offset")}}}function cF(n){if(!Sn(n)||!Array.isArray(n.items))throw new Error("Review playlist must contain an items array.");const e=n.items.map((i,a)=>{if(!Sn(i)||typeof i.replay!="string")throw new Error(`Invalid review item at index ${a}.`);const s=__(i.start),r=__(i.end);if(!s||!r)throw new Error(`Review item ${a+1} has invalid start or end.`);return{id:typeof i.id=="string"?i.id:void 0,replay:i.replay,start:s,end:r,label:typeof i.label=="string"?i.label:void 0,meta:Sn(i.meta)?i.meta:void 0}}),t=Array.isArray(n.replays)?n.replays.map(i=>!Sn(i)||typeof i.id!="string"?null:{id:i.id,path:typeof i.path=="string"?i.path:void 0,label:typeof i.label=="string"?i.label:void 0,locator:Sn(i.locator)?i.locator:void 0,meta:Sn(i.meta)?i.meta:void 0}).filter(i=>i!==null):void 0;return{label:typeof n.label=="string"?n.label:void 0,replays:t,items:e,page:lF(n.page),playback:n.playback,meta:n.meta}}function v_(n){let e;try{e=JSON.parse(n)}catch(t){throw new Error(`Invalid review playlist JSON: ${t instanceof Error?t.message:String(t)}`)}return cF(e)}function uF(){const n=new URLSearchParams(window.location.search);return n.get("reviewPlaylist")?.trim()||n.get("review")?.trim()||n.get("playlist")?.trim()||n.get("playlistUrl")?.trim()||null}function dF(n){return/^\/(?:home|Users|tmp|var\/tmp|mnt|media|run\/user|nix\/store)\//.test(n)}function $y(n,e){const t=n.startsWith("path:")?n.slice(5):n;if(/^https?:\/\//i.test(t)||t.startsWith("/@fs/"))return t;if(t.startsWith("/")){if(dF(t))return`/@fs${t}`;if(e){const i=new URL(e,window.location.href);if(i.origin!==window.location.origin)return new URL(t,i.origin).href}return t}return e?new URL(t,e).href:t}function jo(n,e){const t=e.replaysById.get(n.replay);if(t?.path)return t.path;if(Sn(t?.locator)&&t.locator.kind==="path"&&typeof t.locator.path=="string")return t.locator.path;if(/^https?:\/\//i.test(n.replay)||n.replay.startsWith("/")||n.replay.startsWith("/@fs/")||n.replay.startsWith("path:"))return n.replay;throw new Error(`Review replay "${n.replay}" does not include a loadable path.`)}function y_(n,e){const t=e.replaysById.get(n.replay),a=(t?.path??jo(n,e)).replace(/^path:/,"").split("/").filter(Boolean).pop();return t?.label??a??"review replay"}function Zo(n){return typeof n=="number"&&Number.isFinite(n)?`${n.toFixed(2)}s`:"--"}function b_(n){return n.kind==="time"?Zo(n.value):`frame ${Math.trunc(n.value)}`}function Jn(n,e){if(!Sn(n.meta?.target))return null;const t=n.meta.target[e];return typeof t=="number"&&Number.isFinite(t)?t:null}function lu(n,e){if(!Sn(n.meta?.target))return null;const t=n.meta.target[e];return typeof t=="number"&&Number.isFinite(t)?Math.trunc(t):null}function fF(n){const e=n.start.kind==="time"?n.start.value:null,t=n.end.kind==="time"?n.end.value:null,i=[`${b_(n.start)} to ${b_(n.end)}`];e!==null&&t!==null&&i.push(`${Math.max(0,t-e).toFixed(1)}s clip`);const a=Jn(n,"startTime")??Jn(n,"eventTime"),s=Jn(n,"endTime")??Jn(n,"eventTime");return e!==null&&a!==null&&i.push(`${Math.max(0,a-e).toFixed(1)}s preroll`),t!==null&&s!==null&&i.push(`${Math.max(0,t-s).toFixed(1)}s postroll`),i.join(" · ")}function pF(n){const e=Jn(n,"eventTime"),t=Jn(n,"startTime"),i=Jn(n,"endTime"),a=lu(n,"eventFrame"),s=lu(n,"startFrame"),r=lu(n,"endFrame"),o=t!==null&&i!==null&&Math.abs(i-t)>.001?`${Zo(t)} to ${Zo(i)}`:Zo(e??t??i),l=s!==null&&r!==null&&r!==s?`frames ${s}-${r}`:a!==null?`frame ${a}`:s!==null?`frame ${s}`:null;return[o,l].filter(c=>c&&c!=="--").join(" · ")||"--"}function cu(n,e){return n.label??n.meta?.mechanicLabel??`Review item ${e+1}`}function S_(n){return typeof n.meta?.playerId=="string"?n.meta.playerId:Sn(n.meta?.target)&&typeof n.meta.target.playerId=="string"?n.meta.target.playerId:null}function x_(n){return typeof n.meta?.mechanicLabel=="string"&&n.meta.mechanicLabel.trim()?n.meta.mechanicLabel:typeof n.meta?.mechanic=="string"?hn(n.meta.mechanic):"--"}function hF(n){const e=n.meta?.mechanic;return typeof e=="string"&&e.trim()?e.trim().replaceAll("-","_"):null}function mF(n){return Jn(n,"eventTime")??Jn(n,"startTime")??Jn(n,"endTime")}class _F{constructor(e){this.options=e}createReplaySource(e,t,i){const a=jo(e,t),s=$y(a,t.sourceUrl);return{name:y_(e,t),preparingStatus:"Loading review replay...",async readBytes(){const r=await fetch(s,{signal:i});if(!r.ok){const o=r.statusText?` ${r.statusText}`:"";throw new Error(`Failed to fetch review replay from ${s} (${r.status}${o})`)}return new Uint8Array(await r.arrayBuffer())}}}initialize(e){const t=this.getReplayClipCounts(e);for(const[i,a]of this.getReplayItems(e)){let s="",r=i;try{s=jo(a,e),r=y_(a,e)}catch{r=e.replaysById.get(i)?.label??i}e.replayLoadStates.set(i,{replayId:i,label:r,path:s,clipCount:t.get(i)??0,status:"idle",progress:null,error:null})}}preload(e,t){e.preloading||(e.preloading=!0,(async()=>{try{for(const[i,a]of this.getReplayItems(e)){if(i===t)continue;const s=e.replayLoadStates.get(i);if(!(s?.status==="loaded"||s?.status==="loading"))try{await this.loadBundle(a,e)}catch{}}}finally{e.preloading=!1}})())}loadBundle(e,t){const i=t.replayLoadCache.get(e.replay);if(i)return i;const a=this.createReplaySource(e,t);this.updateLoadState(t,e.replay,{label:a.name,path:jo(e,t),status:"loading",progress:null,error:null});const s=Promise.resolve().then(async()=>{const r=await a.readBytes();return Nl(r,{reportEveryNFrames:100,onProgress:o=>{this.updateLoadState(t,e.replay,{status:"loading",progress:o,error:null})}})}).then(r=>(this.updateLoadState(t,e.replay,{status:"loaded",progress:null,error:null}),r)).catch(r=>{throw t.replayLoadCache.delete(e.replay),this.updateLoadState(t,e.replay,{status:"error",error:r instanceof Error?r.message:String(r)}),r});return t.replayLoadCache.set(e.replay,s),s}render(e){const{reviewSummary:t,loadingSummary:i,loadingActive:a,loadingList:s}=this.options.elements,r=e?Array.from(e.replayLoadStates.values()):[],o=r.filter(f=>f.status==="loaded").length,l=r.filter(f=>f.status==="loading").length,c=r.filter(f=>f.status==="error").length,u=r.filter(f=>f.status==="idle").length,d=r.length===0?"0 replays":`${o}/${r.length} loaded${l>0?`, ${l} loading`:""}${c>0?`, ${c} failed`:""}`;if(t.textContent=d,i.textContent=d,a.textContent=r.length===0?"No playlist":l>0?`${l} active, ${u} pending`:c>0?`${c} failed`:e?.preloading?`Background queue, ${u} pending`:o===r.length?"Complete":`${u} pending`,s.replaceChildren(),!e||r.length===0){const f=document.createElement("p");f.className="stat-window-empty",f.textContent="No replay sources.",s.append(f);return}for(const f of r){const p=document.createElement("div");p.className=`mechanics-review-replay-load ${f.status}`;const _=document.createElement("div");_.className="mechanics-review-replay-load-main";const g=document.createElement("span");g.className="mechanics-review-replay-load-title",g.textContent=f.label;const m=document.createElement("span");m.className="mechanics-review-replay-load-meta",m.textContent=[f.replayId,`${f.clipCount} ${f.clipCount===1?"clip":"clips"}`,f.path].filter(Boolean).join(" · "),_.append(g,m);const h=document.createElement("strong");h.className="mechanics-review-replay-load-status",h.textContent=this.replayLoadStatusText(f);const y=document.createElement("div");y.className="mechanics-review-replay-load-progress";const x=document.createElement("span");x.style.width=`${Math.round(this.replayLoadProgressValue(f)*100)}%`,y.append(x),p.append(_,h,y),s.append(p)}}updateLoadState(e,t,i){const a=e.replayLoadStates.get(t)??{replayId:t,label:t,path:"",clipCount:0,status:"idle",progress:null,error:null};e.replayLoadStates.set(t,{...a,...i});const s=e.manifest.items[e.currentIndex];e.loading&&s?.replay===t&&i.progress&&this.options.onActiveLoadProgress(i.progress),this.options.isActiveReview(e)&&this.render(e)}getReplayItems(e){const t=new Map;for(const i of e.manifest.items)t.has(i.replay)||t.set(i.replay,i);return t}getReplayClipCounts(e){const t=new Map;for(const i of e.manifest.items)t.set(i.replay,(t.get(i.replay)??0)+1);return t}replayLoadStatusText(e){return e.status==="idle"?"Pending":e.status==="loading"?this.replayLoadStateProgress(e.progress)||"Loading":e.status==="loaded"?"Loaded":e.error?`Failed: ${e.error}`:"Failed"}replayLoadStateProgress(e){if(!e)return"";const t=ws(e);if(e.processedFrames!==void 0){const i=e.totalFrames!==void 0?` / ${e.totalFrames}`:"";return`${t} (${e.processedFrames}${i} frames)`}if(e.processedChunks!==void 0){const i=e.totalChunks!==void 0?` / ${e.totalChunks}`:"";return`${t} (${e.processedChunks}${i} chunks)`}return t}replayLoadProgressValue(e){if(e.status==="loaded")return 1;const t=e.progress?.progress;return typeof t=="number"&&Number.isFinite(t)?Math.max(0,Math.min(1,t)):0}}function gF(n){return new _F(n)}class vF{constructor(e){this.options=e}activeReview=null;boundaryGuard=!1;get review(){return this.activeReview}reset(){this.activeReview=null,this.boundaryGuard=!1}setUrl(e){this.options.elements.url.value=e}clearCurrentClip({resetReplayId:e=!1,render:t=!1}={}){this.activeReview&&(this.activeReview.currentClip=null,e&&(this.activeReview.currentReplayId=null),t&&this.render())}setStatus(e){this.options.elements.status.textContent=e}installEventListeners(e){const{elements:t}=this.options;t.file.addEventListener("change",async()=>{const i=t.file.files?.[0];if(i)try{const a=v_(await i.text());await this.loadPlaylist(a,null)}catch(a){console.error("Failed to load review playlist:",a),this.setStatus(a instanceof Error?a.message:"Failed to load review playlist")}finally{t.file.value=""}},{signal:e}),t.loadUrl.addEventListener("click",()=>{this.loadPlaylistFromUrl(t.url.value.trim()).catch(i=>{console.error("Failed to load review playlist URL:",i),this.setStatus(i instanceof Error?i.message:"Failed to load review playlist URL")})},{signal:e}),t.previous.addEventListener("click",()=>{const i=this.activeReview;i&&this.activateItem(Math.max(0,i.currentIndex-1))},{signal:e}),t.replay.addEventListener("click",()=>this.replayClip(),{signal:e}),t.next.addEventListener("click",()=>{const i=this.activeReview;i&&this.activateItem(Math.min(i.manifest.items.length-1,i.currentIndex+1))},{signal:e}),t.confirm.addEventListener("click",()=>{this.submitDecision("confirmed")},{signal:e}),t.reject.addEventListener("click",()=>{this.submitDecision("rejected")},{signal:e}),t.uncertain.addEventListener("click",()=>{this.submitDecision("uncertain")},{signal:e})}render(){const{elements:e}=this.options,t=this.activeReview,i=t?.manifest.items??[],a=t?i[t.currentIndex]??null:null,s=i.length>0;e.count.textContent=`${i.length} item${i.length===1?"":"s"}`,e.index.textContent=s&&t?`${t.currentIndex+1} / ${i.length}`:"0 / 0",e.title.textContent=a?cu(a,t?.currentIndex??0):"No candidate selected",e.mechanic.textContent=a?x_(a):"--",e.player.textContent=a?this.getPlayerName(a):"--",e.clip.textContent=a?fF(a):"--",e.event.textContent=a?pF(a):"--",e.reason.textContent=a?.meta?.reason??"--",e.previous.disabled=!t||t.loading||t.currentIndex<=0,e.replay.disabled=!t||t.loading||!t.currentClip,e.next.disabled=!t||t.loading||t.currentIndex>=i.length-1;const r=!t||t.loading||w_(a)===null;if(e.confirm.disabled=r,e.reject.disabled=r,e.uncertain.disabled=r,this.options.replayLoads.render(t),e.list.replaceChildren(),!t||i.length===0){const o=document.createElement("p");o.className="stat-window-empty",o.textContent="No review playlist loaded.",e.list.append(o);return}i.forEach((o,l)=>{const c=document.createElement("button");c.type="button",c.className="mechanics-review-item",c.dataset.active=l===t.currentIndex?"true":"false",c.disabled=t.loading,c.addEventListener("click",()=>{this.activateItem(l)});const u=document.createElement("span");u.textContent=cu(o,l);const d=document.createElement("strong");d.textContent=[x_(o),this.getPlayerName(o),uu(o.meta?.reviewStatus)].filter(f=>f&&f!=="--").join(" · ")||"--",c.append(u,d),e.list.append(c)})}async loadPlaylist(e,t){const i=new Map;for(const a of e.replays??[])i.set(a.id,a);this.activeReview={manifest:e,sourceUrl:t,replaysById:i,replayLoadStates:new Map,replayLoadCache:new Map,currentIndex:0,loading:!1,preloading:!1,currentReplayId:null,currentClip:null},this.options.replayLoads.initialize(this.activeReview),this.options.showReplayLoadingWindow(),this.setStatus(e.label?`Loaded ${e.label}.`:"Loaded review playlist."),this.render(),e.items.length>0&&await this.activateItem(0)}async loadPlaylistFromUrl(e){if(!e){this.setStatus("Enter a review playlist URL.");return}const t=$y(e,window.location.href);this.setStatus("Loading review playlist...");const i=await fetch(t);if(!i.ok){const s=i.statusText?` ${i.statusText}`:"";throw new Error(`Failed to fetch review playlist from ${t} (${i.status}${s})`)}const a=v_(await i.text());await this.loadPlaylist(a,i.url||t)}async activateItem(e){const t=this.activeReview,i=t?.manifest.items[e];if(!(!t||!i||t.loading)){t.loading=!0,t.currentIndex=e,this.render(),this.setStatus(`Loading ${cu(i,e)}...`);try{if(!this.options.getReplayPlayer()||t.currentReplayId!==i.replay){const u=this.options.replayLoads.createReplaySource(i,t),d=this.options.replayLoads.loadBundle(i,t);await this.options.loadReplayBundleForDisplay(u,d),t.currentReplayId=i.replay}this.options.replayLoads.preload(t,i.replay);const s=Math.max(0,this.getBoundTime(i.start)),r=Math.min(this.options.getReplayPlayer()?.getState().duration??Number.POSITIVE_INFINITY,Math.max(s,this.getBoundTime(i.end)));if(!Number.isFinite(s)||!Number.isFinite(r)||r<=s)throw new Error("Review item has an empty playback range.");const o=S_(i),l=this.options.getReplayPlayer();o&&l?.replay.players.some(u=>u.id===o)&&(l.setAttachedPlayer(o),l.setCameraViewMode("follow"),this.options.clearFreeCameraPreset()),this.options.resetReplayTransitionControls();const c=mF(i);t.currentClip={startTime:s,endTime:r,targetTime:c},this.options.activateTimelineSource(i),this.options.getReplayPlayer()?.setState({currentTime:s,playing:!0,skipPostGoalTransitionsEnabled:!1,skipKickoffsEnabled:!1}),this.setStatus(c===null?`Playing ${s.toFixed(2)}s to ${r.toFixed(2)}s`:`Playing ${s.toFixed(2)}s to ${r.toFixed(2)}s; target ${c.toFixed(2)}s`)}catch(a){console.error("Failed to activate mechanics review item:",a),t.currentClip=null,this.setStatus(a instanceof Error?a.message:"Failed to load review item")}finally{t.loading=!1,this.render()}}}replayClip(){const e=this.activeReview?.currentClip,t=this.options.getReplayPlayer();!e||!t||t.setState({currentTime:e.startTime,playing:!0,skipPostGoalTransitionsEnabled:!1,skipKickoffsEnabled:!1})}async submitDecision(e){const t=this.activeReview,i=t?.manifest.items[t.currentIndex]??null,a=w_(i);if(!t||!i||!a){this.setStatus("Current review item has no review endpoint.");return}this.setStatus(`Submitting ${uu(e)}...`);const s=await fetch(a,{method:"POST",headers:{"content-type":"application/json",...yF()},credentials:"same-origin",body:JSON.stringify({status:e})});if(!s.ok){let r=`${s.status}${s.statusText?` ${s.statusText}`:""}`;try{const o=await s.json();typeof o.error=="string"&&(r=o.error)}catch{}this.setStatus(`Review failed: ${r}`);return}i.meta=i.meta??{},i.meta.reviewStatus=e,this.setStatus(`Marked ${uu(e)}.`),this.render()}enforceClipBoundary(e){const t=this.activeReview?.currentClip,i=this.options.getReplayPlayer();if(!t||!i||this.boundaryGuard)return!1;const a=e.currentTime<t.startTime-.1,s=e.playing&&e.currentTime>=t.endTime-.025;if(!a&&!s)return!1;this.boundaryGuard=!0;try{i.setState({currentTime:a?t.startTime:t.endTime,playing:!1,skipPostGoalTransitionsEnabled:!1,skipKickoffsEnabled:!1}),s&&this.setStatus(`Finished clip at ${t.endTime.toFixed(2)}s`)}finally{this.boundaryGuard=!1}return!0}getBoundTime(e){if(e.kind==="time")return e.value;const t=this.options.getReplayPlayer(),i=Math.max(0,Math.trunc(e.value));return t?.replay.frames[i]?.time??t?.replay.frames.at(-1)?.time??0}getPlayerName(e){if(typeof e.meta?.playerName=="string"&&e.meta.playerName.trim())return e.meta.playerName;const t=S_(e);return t?this.options.getReplayPlayer()?.replay.players.find(i=>i.id===t)?.name??t:"--"}}function uu(n){return typeof n=="string"&&n.trim()?n.replaceAll("_"," "):"unreviewed"}function w_(n){if(!n)return null;if(typeof n.meta?.reviewEndpoint=="string"&&n.meta.reviewEndpoint)return n.meta.reviewEndpoint;const e=typeof n.meta?.eventId=="string"&&n.meta.eventId?n.meta.eventId:n.id;return e?`/api/v1/mechanics/events/${encodeURIComponent(e)}/reviews`:null}function yF(){const n=new URLSearchParams(window.location.search),e=n.get("reviewToken")??n.get("token")??window.localStorage.getItem("rocket_sense_access_token");return e?{Authorization:`Bearer ${e}`}:{}}function bF(n){return new vF(n)}const SF=["replayUrl","replay_url","replay"],xF=["r","replayUrlZ","replay_url_z"],wF=["ballchasing","ballchasingId","ballchasingUuid","ballchasingReplay"];function EF(n){const e=n.replaceAll("-","+").replaceAll("_","/"),t=e.padEnd(Math.ceil(e.length/4)*4,"="),i=atob(t),a=new Uint8Array(i.length);for(let s=0;s<i.length;s+=1)a[s]=i.charCodeAt(s);return a}function MF(n){try{return By(Uy(EF(n)))}catch(e){throw new Error(`Invalid compressed replay URL: ${e instanceof Error?e.message:String(e)}`)}}function TF(n,e){const t=new URLSearchParams(n);for(const i of SF){const a=t.get(i)?.trim();if(!a)continue;const s=new URL(a,e);if(s.protocol!=="http:"&&s.protocol!=="https:")throw new Error(`Unsupported replay URL protocol: ${s.protocol}`);return s}for(const i of xF){const a=t.get(i)?.trim();if(!a)continue;const s=new URL(MF(a),e);if(s.protocol!=="http:"&&s.protocol!=="https:")throw new Error(`Unsupported replay URL protocol: ${s.protocol}`);return s}return null}function CF(n,e){for(const t of e){const i=n.get(t)?.trim();if(i)return i}return null}function Wy(n,e){const t=new URLSearchParams(n),i=CF(t,wF);if(i){const s=gf(i);return{kind:"ballchasing",url:JC(s),name:ZC(s),fetchInit:{method:"POST"}}}const a=TF(n,e);return a?{kind:"url",url:a,name:AF(a)}:null}function AF(n){const t=n.pathname.replace(/\/+$/,"").split("/").pop();if(!t)return n.hostname||"remote replay";try{return decodeURIComponent(t)}catch{return t}}function RF(n){let e;try{e=Wy(n.location.search,n.location.href)}catch(t){console.error("Invalid replay URL:",t),n.statusReadout.textContent=t instanceof Error?t.message:"Invalid replay URL";return}e&&n.loadReplay(GD(e,n.signal)).catch(t=>{n.signal.aborted||(console.error("Failed to load replay URL:",t),n.statusReadout.textContent=t instanceof Error?t.message:"Failed to load replay URL")})}function PF(n){n.initialBundle?n.loadReplayBundleForDisplay({name:n.initialReplayName??"replay",preparingStatus:"Preparing replay...",async readBytes(){throw new Error("Replay bytes are not available for this preloaded replay")}},Promise.resolve(n.initialBundle)).catch(i=>{n.signal.aborted||(console.error("Failed to load preprocessed replay bundle:",i),n.statusReadout.textContent=i instanceof Error?i.message:"Failed to load preprocessed replay bundle")}):n.loadFromLocation!==!1&&RF(n);const e=uF();if(!e)return;const t=n.getMechanicsReviewController();t?.setUrl(e),n.showMechanicsReviewWindow(),t?.loadPlaylistFromUrl(e).catch(i=>{n.signal.aborted||(console.error("Failed to load mechanics review playlist from URL:",i),t?.setStatus(i instanceof Error?i.message:"Failed to load mechanics review playlist from URL"))})}function LF(n){const e={};for(const t of n)if(t.getConfig){if(Object.hasOwn(e,t.id))throw new Error(`Duplicate stats player config adapter id: ${t.id}`);e[t.id]=t.getConfig()}return e}function NF(n,e){for(const t of n)if(t.applyConfig){if(Object.hasOwn(e,t.id)){t.applyConfig(e[t.id]);continue}for(const i of t.aliases??[])if(Object.hasOwn(e,i)){t.applyConfig(e[i]);break}}}function Xy(n){return n.filter(e=>e.getConfig||e.applyConfig).map(e=>{const t={id:e.id};return e.id==="boost"&&(t.aliases=["boost-pickup-animation"]),e.getConfig&&(t.getConfig=()=>e.getConfig?.()),e.applyConfig&&(t.applyConfig=i=>e.applyConfig?.(i)),t})}function IF(n){return LF(Xy(n))}function kF({replayPlayer:n,playbackRate:e,skipPostGoalTransitions:t,skipKickoffs:i}){const a=n?.getState();return{currentTime:a?.currentTime,playing:a?.playing,rate:a?.speed??Number(e?.value??1),skipPostGoalTransitions:n?a?.skipPostGoalTransitionsEnabled:t.checked,skipKickoffs:n?a?.skipKickoffsEnabled:i.checked}}function DF({replayPlayer:n,cameraControlsController:e}){const t=n?.getState();return{mode:t?.cameraViewMode,freePreset:e?.freeCameraPreset??null,attachedPlayerId:t?.attachedPlayerId,distanceScale:t?.cameraDistanceScale,ballCam:t?.ballCamEnabled??e?.ballCamChecked,customSettings:t?.customCameraSettings}}function FF({playback:n,camera:e,activeTimelineEventSourceIds:t,activeTimelineRangeModuleIds:i,activeMechanicTimelineKinds:a,activeRenderEffectModuleIds:s,initialConfig:r,replayPlayer:o,boostPadOverlayEnabled:l,recording:c,singletonWindows:u,statsWindows:d,moduleConfigs:f}){return{version:pl,playback:n,camera:e,overlays:{timelineEvents:[...t],timelineRanges:[...i],mechanics:[...a],renderEffects:[...s],...r?.overlays.pluginRenderEffects!==void 0?{pluginRenderEffects:[...r.overlays.pluginRenderEffects]}:{},...r?.overlays.pluginHudOverlay!==void 0?{pluginHudOverlay:r.overlays.pluginHudOverlay}:{},followedPlayerHud:!1,boostPads:l,boostPickupAnimation:o?.getState().boostPickupAnimationEnabled??!1,hitboxWireframes:o?.getState().hitboxWireframesEnabled??!1},recording:c,singletonWindows:u,statsWindows:d,moduleConfigs:f}}function OF(n,e,t){return{currentTime:n.currentTime,playing:n.playing,speed:n.rate,cameraDistanceScale:e.distanceScale,customCameraSettings:e.customSettings,cameraViewMode:e.mode,attachedPlayerId:e.attachedPlayerId,ballCamEnabled:e.ballCam,boostPickupAnimationEnabled:t.overlays.boostPickupAnimation,hitboxWireframesEnabled:t.overlays.hitboxWireframes,skipPostGoalTransitionsEnabled:n.skipPostGoalTransitions,skipKickoffsEnabled:n.skipKickoffs}}function UF(n,e,t){console.groupCollapsed("[subtr-actor] stats player cfg load"),console.log("location.href",window.location.href),console.log("location.search",n.search||"(empty)"),console.log("location.hash",n.hash||"(empty)"),console.table([...n.searchParams.map(([i,a])=>({source:"search",name:i,value:a})),...n.hashParams.map(([i,a])=>({source:"hash",name:i,value:a}))]),console.log("cfg selected source",n.selectedSource??"(none)"),console.log("cfg selected raw text",n.selectedValue??"(none)"),console.log("cfg selected raw length",n.selectedValue?.length??0),console.log("cfg search values",n.searchValues),console.log("cfg hash values",n.hashValues),n.hashValues.length>0&&n.searchValues.length>0&&console.warn("Both hash and search contain cfg; hash cfg is used."),e&&(console.log("cfg normalized JSON",JSON.stringify(e,null,2)),console.log("cfg normalized object",e)),t&&console.error("cfg decode/apply error",t),console.groupEnd()}function BF(n){const e=()=>{n.getSkipPostGoalTransitions().checked=!1,n.getSkipKickoffs().checked=!1},t=(i,a)=>{const s=n.getReplayPlayer();!s||!Number.isFinite(i)||(n.getMechanicsReviewController()?.clearCurrentClip(),e(),s.setState({currentTime:Math.max(0,i-n.goalWatchLeadSeconds),playing:a,skipPostGoalTransitionsEnabled:!1,skipKickoffsEnabled:!1}),n.scheduleConfigUrlUpdate())};return{watchGoalReplay(i,a){const s=n.getReplayPlayer();if(!s||!Number.isFinite(i))return;if(n.getMechanicsReviewController()?.clearCurrentClip(),a!==null&&s.replay.players.some(o=>o.id===a)){s.setAttachedPlayer(a),s.setCameraViewMode("follow");const o=n.getCameraControlsController();o&&(o.freeCameraPreset=null)}e(),s.setState({currentTime:Math.max(0,i-n.goalWatchLeadSeconds),playing:!0,skipPostGoalTransitionsEnabled:!1,skipKickoffsEnabled:!1}),n.scheduleConfigUrlUpdate()},cueGoalReplay(i){t(i,!1)},cueTimelineEvent(i){const a=n.getReplayPlayer();a&&(n.getMechanicsReviewController()?.clearCurrentClip(),e(),a.setState({currentTime:vf(i),skipPostGoalTransitionsEnabled:!1,skipKickoffsEnabled:!1}),n.scheduleConfigUrlUpdate())},applyConfigToReplayPlayer(i){const a=n.getReplayPlayer();if(!a)return;a.setState(OF(i.playback,i.camera,i));const s=n.getCameraControlsController();s&&(s.freeCameraPreset=i.camera.freePreset??null),i.camera.mode==="free"&&i.camera.freePreset&&a.setFreeCameraPreset(i.camera.freePreset),n.syncBoostPadOverlayPlugin(),n.setupActiveModules(),n.renderModuleSummary(),n.renderModuleSettings(),n.renderStatsWindows(a.getState().frameIndex)}}}function zF(n){let e=!1,t=null;const i=()=>n.getFloatingWindowController()?.getSingletonConfigs()??[],a=()=>n.getStatsWindowsController()?.getConfigs()??[],s=()=>{const o=n.getActiveModulesRuntime(),l=n.getReplayPlayer();return FF({playback:kF({replayPlayer:l,playbackRate:n.playbackRate,skipPostGoalTransitions:n.skipPostGoalTransitions,skipKickoffs:n.skipKickoffs}),camera:DF({replayPlayer:l,cameraControlsController:n.getCameraControlsController()}),activeTimelineEventSourceIds:o.getActiveTimelineEventSourceIds(),activeTimelineRangeModuleIds:o.getActiveTimelineRangeModuleIds(),activeMechanicTimelineKinds:o.getActiveMechanicTimelineKinds(),activeRenderEffectModuleIds:o.getActiveRenderEffectModuleIds(),initialConfig:n.getInitialConfig(),replayPlayer:l,boostPadOverlayEnabled:o.getBoostPadOverlayEnabled(),recording:n.getRecordingWindowController()?.getConfigSnapshot()??{},singletonWindows:i(),statsWindows:a(),moduleConfigs:IF(n.modules)})},r=o=>{NF(Xy(n.modules),o)};return{setApplyingConfig(o){e=o},reset(){t!==null&&(window.clearTimeout(t),t=null),e=!1},scheduleConfigUrlUpdate(){e||(t!==null&&window.clearTimeout(t),t=window.setTimeout(()=>{t=null;const o=Hy(new URL(window.location.href),s());window.history.replaceState(window.history.state,"",o)},150))},applyConfigToStaticControls(o){n.getActiveModulesRuntime().applyOverlayConfig(o.overlays),n.skipPostGoalTransitions.checked=o.playback.skipPostGoalTransitions??n.skipPostGoalTransitions.checked,n.skipKickoffs.checked=o.playback.skipKickoffs??n.skipKickoffs.checked,n.hitboxWireframes.checked=o.overlays.hitboxWireframes,o.playback.rate!==void 0&&(n.playbackRate.value=`${o.playback.rate}`),n.getRecordingWindowController()?.applyConfig(o.recording),r(o.moduleConfigs),n.getFloatingWindowController()?.applySingletonConfigs(o.singletonWindows),n.getStatsWindowsController()?.replaceFromConfig(o.statsWindows),n.renderModuleSummary(),n.renderModuleSettings(),n.renderTimelineEventCount()}}}function HF(n){const e=t=>{const i=n.getLauncherToggle();n.getLauncherMenu().hidden=!t,i.setAttribute("aria-label",t?"Close menu":"Open menu"),i.setAttribute("aria-expanded",t?"true":"false")};return{bringWindowToFront(t){n.getFloatingWindowController()?.bringToFront(t)},showWindow(t){n.getFloatingWindowController()?.show(t)},toggleWindow(t){n.getFloatingWindowController()?.toggle(t)},hideWindow(t){n.getFloatingWindowController()?.hide(t)},setLauncherOpen:e,openReplayFilePicker(){n.getFileInput().click(),e(!1)},installWindowDragging(t,i){n.getFloatingWindowController()?.installDragging(t,i)},getElementWindowId(t){return t.closest("[data-window-id]")?.dataset.windowId??null}}}const qy=2.25,VF=4,GF=100;let Ze=null,If=null,ml=null,gr=null,us=null,_l=null,E_=0;const Ul=Ty({refreshTimelineRanges(){kf()},rerenderCurrentState(){Ze&&Ze.setBoostPickupAnimationEnabled(Ze.getState().boostPickupAnimationEnabled)},requestConfigSync(){Yt()}}),Jo=Pk({rerenderCurrentState(){if(!Ze)return;const n=Ze.getState();Cr(n.frameIndex)},refreshTimelineRanges(){kf()},requestConfigSync(){Yt()}},{boostPickupFilters:Ul}),Ct=oF({modules:Jo,boostPickupFilters:Ul,getContext:br,getReplayPlayer:()=>Ze,getTimelineOverlay:()=>If,getEventTimelineSources:t0,withTimelineEventSeekTimes:Qy,renderModuleSummary:Ya,renderModuleSettings:ua,renderStatsWindows(){Ze&&Cr(Ze.getState().frameIndex)},renderTimelineEventCount:tr,requestConfigSync:Yt}),Qo=BF({goalWatchLeadSeconds:VF,getReplayPlayer:()=>Ze,getCameraControlsController:()=>In,getMechanicsReviewController:()=>Xn,getSkipPostGoalTransitions:()=>ra,getSkipKickoffs:()=>oa,syncBoostPadOverlayPlugin:Jy,setupActiveModules:bl,renderModuleSummary:Ya,renderModuleSettings:ua,renderStatsWindows(n){Cr(n)},scheduleConfigUrlUpdate:Yt}),Pn=HF({getFloatingWindowController:()=>Ii,getLauncherMenu:()=>Vd,getLauncherToggle:()=>Hd,getFileInput:()=>gl});let Po=null,gl,Ky,zd,M_,Hd,Vd,T_,C_,A_,R_,P_,L_,du,fu,Lo,N_,I_,k_,D_,Pi,Yy,jy,Gd,ra,Ka=null,oa,Xs,No=null,$d=mr(null),In=null,qs=null,ds=null,vr=null,yr=null,vl=null,Xn=null,Ii=null,Wd=null,yl=null,Ni=null,Xd=null,_i=null;function $F(n){return Ct.getActiveCapabilityIds(n)}function WF(){}function br(){return!Ze||!gr||!us?null:{player:Ze,replay:Ze.replay,statsTimeline:gr,statsFrameLookup:us,fieldScale:Ze.options.fieldScale??1}}function bl(){Ct.setupActiveModules()}function XF(){Ct.migrateMechanicBackedTimelineEventSelections()}function Zy(){Ct.teardownActiveModules()}function F_(n,e,t){Ct.toggleCapability(n,e,t)}function qF(){Ct.clearTimelineEventSources()}function KF(){Ct.clearTimelineRangeSources()}function YF(){Ct.clearStandalonePlugins()}function Jy(){Ct.syncBoostPadOverlayPlugin()}function jF(){Ct.toggleBoostPadOverlay()}function ZF(){Ct.syncTimelineEvents()}function kf(){Ct.syncTimelineRanges()}function tr(){const n=br();if(!n){Gd.textContent="--";return}Gd.textContent=`${JF(n)}`}function JF(n){return yr?.countVisibleSources(n)??0}function ne(n,e){const t=n.querySelector(e);if(!(t instanceof HTMLElement))throw new Error(`Missing element for selector: ${e}`);return t}function QF(n){if(!Ii)throw new Error("Floating windows are not initialized.");return Ii.readPlacement(n)}function eO(n,e){Ii?.applyPlacement(n,e)}function Cr(n=Ze?.getState().frameIndex??0,e={}){ds?.render(n,e)}function tO(n){ds?.create(n)}function nO(){ds?.clear()}function Yt(){Ni?.scheduleConfigUrlUpdate()}function iO(n){Ni?.applyConfigToStaticControls(n)}function Qy(n){return n.map(e=>({...e,seekTime:vf(e)}))}function Ya(){vl?.renderSummary()}function e0(){yr?.render()}function t0(n){return yr?.getSources(n)??[]}function aO(){const n=br();return Yk(n,t0(n))}function n0(){vr?.render()}function i0(n,e={}){vr?.syncTimeline(n,e)}function a0(){vr?.reset()}function sO(n){const e=hF(n);e&&(Ct.activateMechanicTimelineKind(e),e0())}function rO(n){return Xn?.enforceClipBoundary(n)??!1}function ua(){vl?.renderSettings()}function Df(n=Ze?.getState().frameIndex??0){Wd?.render(n)}function oO(n){yl?.setTransportEnabled(n,Ze?.getState())}function s0(n=ml?.getStatus()??null){qs?.sync(n)}function lO(n){if(rO(n))return;const e=performance.now();n.playing&&e-E_<GF||(E_=e,yl?.renderSnapshot(n),Cr(n.frameIndex,{preserveOpenPickers:!0}),Df(n.frameIndex),i0(n))}function cO(n){return Ul.includePickup(n)}async function O_(n){await qd(n,Promise.resolve().then(()=>$D(n,e=>{Pi.textContent=ws(e),Ka?.update(e)})))}async function qd(n,e){await WD(n,e,{elements:{fileInput:gl,viewport:Ky,emptyState:zd,statusReadout:Pi,playersReadout:Yy,framesReadout:jy,skipPostGoalTransitions:ra,skipKickoffs:oa,hitboxWireframes:Xs},defaultCameraDistanceScale:qy,getReplayLoadModal:()=>Ka,getReplayPlayer:()=>Ze,setReplayPlayer(t){Ze=t},getUnsubscribe:()=>_l,setUnsubscribe(t){_l=t},setCanvasRecorder(t){ml=t},setLoadedReplayName(t){Xd=t},setTimelineOverlay(t){If=t},setStatsTimeline(t){gr=t},setStatsFrameLookup(t){us=t},setStatRegistry(t){$d=t},getInitialConfig:()=>_i,setApplyingConfig(t){Ni?.setApplyingConfig(t)},getReplayTimelineEvents(t){return CN(t,Ct.getActiveTimelineEventSourceIds())},withTimelineEventSeekTimes:Qy,includeBoostPickupAnimationPickup:cO,syncRecordingWindow:s0,setTransportEnabled:oO,teardownActiveModules:Zy,clearTimelineEventSources:qF,clearTimelineRangeSources:KF,clearStandalonePlugins:YF,clearRenderCaches:WF,resetEventPlaylistWindow:a0,renderScoreboard:Df,renderTimelineEventCount:tr,renderMechanicsTimelineControls:e0,renderEventPlaylistWindow:n0,renderModuleSettings:ua,migrateMechanicBackedTimelineEventSelections:XF,syncBoostPadOverlayPlugin:Jy,setupActiveModules:bl,renderSnapshot:lO,applyConfigToReplayPlayer:Qo.applyConfigToReplayPlayer,renderStatsWindows:Cr,syncEventPlaylistTimeline:i0,getCameraControlsController:()=>In})}function uO(n,e={}){No?.(),n.innerHTML=e1(qy),Po=n,Ka=jL(n),Ii=BD({getRoot:()=>Po??document,requestConfigSync:Yt}),gl=ne(n,"#replay-file"),Ky=ne(n,"#viewport"),zd=ne(n,"#empty-state"),M_=ne(n,"#empty-load-replay"),Hd=ne(n,"#launcher-toggle"),Vd=ne(n,"#launcher-menu"),T_=ne(n,"#load-replay-action"),C_=ne(n,"#floating-window-layer"),Wd=nF({body:ne(n,"#scoreboard-window-body"),getReplayPlayer:()=>Ze,getStatsFrameLookup:()=>us});const t=ne(n,"#mechanics-timeline-window-body");yr=eD({body:t,modules:Jo,getContext:br,getActiveTimelineEventSourceIds:()=>Ct.getActiveTimelineEventSourceIds(),getActiveMechanicTimelineKinds:()=>Ct.getActiveMechanicTimelineKinds(),toggleEventSource(d,f){F_(d,"events",f)},setMechanicTimelineKind(d,f){Ct.setMechanicTimelineKind(d,f)},setupActiveModules:bl,syncTimelineEvents:ZF,syncTimelineRanges:kf,renderModuleSummary:Ya,renderModuleSettings:ua,renderTimelineEventCount:tr,requestConfigSync:Yt}),A_=ne(n,"#event-playlist-window-body"),vr=HD({body:A_,getReplayPlayer:()=>Ze,getSources:aO,cueTimelineEvent:Qo.cueTimelineEvent,formatTime:Ly}),R_=ne(n,"#replay-loading-summary"),P_=ne(n,"#replay-loading-active"),L_=ne(n,"#replay-loading-list");const i=gF({elements:{reviewSummary:ne(n,"#mechanics-review-replay-load-summary"),loadingSummary:R_,loadingActive:P_,loadingList:L_},isActiveReview(d){return Xn?.review===d},onActiveLoadProgress(d){Pi.textContent=ws(d),Ka?.update(d)}});Xn=bF({elements:{file:ne(n,"#mechanics-review-file"),url:ne(n,"#mechanics-review-url"),loadUrl:ne(n,"#mechanics-review-load-url"),status:ne(n,"#mechanics-review-status"),index:ne(n,"#mechanics-review-index"),title:ne(n,"#mechanics-review-title"),mechanic:ne(n,"#mechanics-review-mechanic"),player:ne(n,"#mechanics-review-player"),clip:ne(n,"#mechanics-review-clip"),event:ne(n,"#mechanics-review-event"),reason:ne(n,"#mechanics-review-reason"),previous:ne(n,"#mechanics-review-prev"),replay:ne(n,"#mechanics-review-replay"),next:ne(n,"#mechanics-review-next"),confirm:ne(n,"#mechanics-review-confirm"),reject:ne(n,"#mechanics-review-reject"),uncertain:ne(n,"#mechanics-review-uncertain"),count:ne(n,"#mechanics-review-count"),list:ne(n,"#mechanics-review-list")},replayLoads:i,getReplayPlayer:()=>Ze,clearFreeCameraPreset(){In&&(In.freeCameraPreset=null)},resetReplayTransitionControls(){ra.checked=!1,oa.checked=!1},activateTimelineSource:sO,loadReplayBundleForDisplay:qd,showReplayLoadingWindow(){Pn.showWindow("replay-loading")}});const a=ne(n,"#boost-pickup-filters-window-body"),s=ne(n,"#touch-controls-window-body");du=ne(n,"#stats-window-layer"),ds=Gk({layer:du,getReplayPlayer:()=>Ze,getStatsTimeline:()=>gr,getStatsFrameLookup:()=>us,getStatRegistry:()=>$d,readWindowPlacement:QF,applyWindowPlacement:eO,bringWindowToFront:Pn.bringWindowToFront,setLauncherOpen:Pn.setLauncherOpen,requestConfigSync:Yt,watchGoalReplay:Qo.watchGoalReplay,cueGoalReplay:Qo.cueGoalReplay}),fu=ne(n,"#toggle-playback"),Lo=ne(n,"#playback-rate"),In=QL({elements:{attachedPlayer:ne(n,"#attached-player"),cameraViewFreeButton:ne(n,"#camera-view-free"),cameraViewFollowButton:ne(n,"#camera-view-follow"),cameraViewOverheadButton:ne(n,"#camera-view-overhead"),cameraViewSideButton:ne(n,"#camera-view-side"),cameraDistance:ne(n,"#camera-distance"),cameraDistanceReadout:ne(n,"#camera-distance-readout"),customCameraSettings:ne(n,"#custom-camera-settings"),cameraSettingsControls:ne(n,"#camera-settings-controls"),customCameraFov:ne(n,"#custom-camera-fov"),customCameraHeight:ne(n,"#custom-camera-height"),customCameraPitch:ne(n,"#custom-camera-pitch"),customCameraDistance:ne(n,"#custom-camera-distance"),customCameraStiffness:ne(n,"#custom-camera-stiffness"),customCameraSwivelSpeed:ne(n,"#custom-camera-swivel-speed"),customCameraTransitionSpeed:ne(n,"#custom-camera-transition-speed"),customCameraFovReadout:ne(n,"#custom-camera-fov-readout"),customCameraHeightReadout:ne(n,"#custom-camera-height-readout"),customCameraPitchReadout:ne(n,"#custom-camera-pitch-readout"),customCameraDistanceReadout:ne(n,"#custom-camera-distance-readout"),customCameraStiffnessReadout:ne(n,"#custom-camera-stiffness-readout"),customCameraSwivelSpeedReadout:ne(n,"#custom-camera-swivel-speed-readout"),customCameraTransitionSpeedReadout:ne(n,"#custom-camera-transition-speed-readout"),ballCam:ne(n,"#ball-cam"),cameraProfileReadout:ne(n,"#camera-profile-readout"),cameraFovReadout:ne(n,"#camera-fov-readout"),cameraHeightReadout:ne(n,"#camera-height-readout"),cameraPitchReadout:ne(n,"#camera-pitch-readout"),cameraBaseDistanceReadout:ne(n,"#camera-base-distance-readout"),cameraStiffnessReadout:ne(n,"#camera-stiffness-readout")},getReplayPlayer:()=>Ze,requestConfigSync:Yt}),vl=iD({elements:{summary:ne(n,"#module-summary"),settings:ne(n,"#module-settings"),boostPickupFilters:a,touchControls:s},modules:Jo,boostPickupFilters:Ul,getContext:br,getActiveModules:()=>Ct.getActiveModules(),getActiveCapabilityIds:$F,getBoostPickupAnimationEnabled:()=>Ze?.getState().boostPickupAnimationEnabled??!1,getBoostPadOverlayEnabled:()=>Ct.getBoostPadOverlayEnabled(),toggleCapability:F_,toggleBoostPickupAnimation(){const d=!(Ze?.getState().boostPickupAnimationEnabled??!1);Ze?.setBoostPickupAnimationEnabled(d),bl(),Ya(),ua(),Yt()},toggleBoostPadOverlay:jF}),N_=ne(n,"#time-readout"),I_=ne(n,"#frame-readout"),k_=ne(n,"#duration-readout"),D_=ne(n,"#playback-status-readout"),Pi=ne(n,"#status-readout"),Yy=ne(n,"#players-readout"),jy=ne(n,"#frames-readout"),Gd=ne(n,"#events-readout"),ra=ne(n,"#skip-post-goal-transitions"),oa=ne(n,"#skip-kickoffs"),Xs=ne(n,"#hitbox-wireframes"),yl=aF({elements:{togglePlayback:fu,playbackRate:Lo,skipPostGoalTransitions:ra,skipKickoffs:oa,hitboxWireframes:Xs,emptyState:zd,timeReadout:N_,frameReadout:I_,durationReadout:k_,playbackStatusReadout:D_},getCameraControlsController:()=>In}),qs=JD({elements:{fps:ne(n,"#recording-fps"),playbackRate:ne(n,"#recording-playback-rate"),start:ne(n,"#recording-start"),fullReplay:ne(n,"#recording-full-replay"),stop:ne(n,"#recording-stop"),download:ne(n,"#recording-download"),clear:ne(n,"#recording-clear"),status:ne(n,"#recording-status"),elapsed:ne(n,"#recording-elapsed"),size:ne(n,"#recording-size"),type:ne(n,"#recording-type")},getCanvasRecorder:()=>ml,getReplayPlayer:()=>Ze,getLoadedReplayName:()=>Xd,setStatus(d){Pi.textContent=d},requestConfigSync:Yt}),Ni=zF({modules:Jo,playbackRate:Lo,skipPostGoalTransitions:ra,skipKickoffs:oa,hitboxWireframes:Xs,getReplayPlayer:()=>Ze,getCameraControlsController:()=>In,getRecordingWindowController:()=>qs,getFloatingWindowController:()=>Ii,getStatsWindowsController:()=>ds,getActiveModulesRuntime:()=>Ct,getInitialConfig:()=>_i,renderModuleSummary:Ya,renderModuleSettings:ua,renderTimelineEventCount:tr});const r=zy(window.location),o=wD(window.location);let l=null;if(e.initialConfig!==void 0)_i=e.initialConfig;else{try{_i=xD(window.location)}catch(d){l=d,console.error("Invalid stats player config:",d),Pi.textContent=d instanceof Error?d.message:"Invalid stats player config",_i=null}o&&UF(r,_i,l)}const c=new AbortController;Pn.installWindowDragging(C_,c.signal),Pn.installWindowDragging(du,c.signal);const u=()=>{c.abort(),_l?.(),_l=null,Zy(),Ze?.destroy(),Ze=null,ml=null,If=null,gr=null,us=null,$d=mr(null),nO(),ds=null,Ct.reset(),Ka?.destroy(),Ka=null,a0(),yr=null,vr=null,Xn?.reset(),Xn=null,Xd=null,In=null,qs=null,vl=null,Wd=null,yl=null,_i=null,Ni?.reset(),Ni=null,Ii?.reset(),Ii=null,Po===n&&(Po=null,n.replaceChildren()),No===u&&(No=null)};if(No=u,_i){Ni?.setApplyingConfig(!0);try{iO(_i)}finally{Ni?.setApplyingConfig(!1)}}return sF({elements:{root:n,launcherToggle:Hd,launcherMenu:Vd,loadReplayAction:T_,emptyLoadReplay:M_,fileInput:gl,togglePlayback:fu,playbackRate:Lo,skipPostGoalTransitions:ra,skipKickoffs:oa,hitboxWireframes:Xs},signal:c.signal,setLauncherOpen:Pn.setLauncherOpen,openReplayFilePicker:Pn.openReplayFilePicker,getElementWindowId:Pn.getElementWindowId,toggleWindow:Pn.toggleWindow,hideWindow:Pn.hideWindow,createStatsWindow:tO,async loadReplayFile(d){try{Xn?.clearCurrentClip({resetReplayId:!0,render:!0}),await O_(VD(d))}catch(f){console.error("Failed to load replay:",f),Pi.textContent=f instanceof Error?f.message:"Failed to load replay"}},togglePlayback(){Ze?.togglePlayback(),Yt()},setPlaybackRate(d){Ze?.setPlaybackRate(d),Yt()},setSkipPostGoalTransitionsEnabled(d){Ze?.setSkipPostGoalTransitionsEnabled(d),Yt()},setSkipKickoffsEnabled(d){Ze?.setSkipKickoffsEnabled(d),Yt()},setHitboxWireframesEnabled(d){Ze?.setHitboxWireframesEnabled(d),Yt()}}),Xn?.installEventListeners(c.signal),qs?.installEventListeners(c.signal),In?.installEventListeners(c.signal),Ya(),ua(),Df(),In?.renderProfile(),In?.syncModeButtons(),s0(),tr(),Xn?.render(),n0(),PF({signal:c.signal,location:window.location,statusReadout:Pi,initialBundle:e.initialBundle,initialReplayName:e.initialReplayName,loadFromLocation:e.loadFromLocation,loadReplay:O_,loadReplayBundleForDisplay:qd,getMechanicsReviewController:()=>Xn,showMechanicsReviewWindow(){Pn.showWindow("mechanics-review")}}),{root:n,destroy:u}}const tn=["#58a6ff","#f39a37"],U_=["#58a6ff","#f39a37","#65d6ad","#d2a8ff","#ff7b72","#f2cc60","#79c0ff","#ffa657"],Bs={zero:"#ff7b72",low:"#f39a37",midLow:"#f2cc60",midHigh:"#65d6ad",high:"#58a6ff"},B_={big:"#f39a37",small:"#65d6ad"},r0=[{id:"overview",label:"Overview"},{id:"goals",label:"Goals"},{id:"boost",label:"Boost"},{id:"territory",label:"Possession & territory"},{id:"involvement",label:"Player involvement"},{id:"dump",label:"All stats"}],dO=[{statId:"player:core.score",kind:"bar",title:"Score by player"},{statId:"player:core.shots",kind:"bar",title:"Shots by player"},{statId:"player:touch.touch_count",kind:"bar",title:"Touches by player"},{statId:"team:core.shots",kind:"pie",title:"Shot share"},{statId:"team:possession.possession_time",kind:"pie",title:"Possession share"},{statId:"team:pressure.offensive_pressure_time",kind:"bar",title:"Offensive pressure"}],fO=[{statId:"player:touch.touch_count",kind:"bar",title:"Touches"},{statId:"player:touch.control_touch_count",kind:"bar",title:"Control touches"},{statId:"player:touch.hard_hit_count",kind:"bar",title:"Hard hits"},{statId:"player:demo.demos_inflicted",kind:"bar",title:"Demos inflicted"},{statId:"player:fifty_fifty.wins",kind:"bar",title:"50/50 wins"},{statId:"player:powerslide.total_duration",kind:"bar",title:"Powerslide time"}];function j(n,e={}){const t=document.createElement(n);return e.className&&(t.className=e.className),e.id&&(t.id=e.id),e.text!==void 0&&(t.textContent=e.text),t}function o0(n,e,t){return e==="player"?n.name||`Player ${t+1}`:t===0?"Blue":"Orange"}function Sl(n){return n?zt(n):null}function Va(n,e){const t=Sl(e);return t?n.players.find(i=>Sl(i.player_id)===t)?.name??t:"--"}function Kd(n){return n===!0?"Blue":n===!1?"Orange":"--"}function l0(n,e){return e==="player"?n.players:[n.team_zero,n.team_one]}function c0(n){return n.is_team_0?tn[0]:tn[1]}function pO(n,e,t){return e==="player"?c0(n):tn[t%tn.length]}function hO(n,e){const t=n.frames.at(-1);return t?e.get(t.frame_number)??null:null}function mO(n,e){const t=n.read(e);return typeof t=="number"&&Number.isFinite(t)?t:null}function Ms(n){return n==null||!Number.isFinite(n)?"--":`${Number(n.toFixed(1))}s`}function _O(n){return n==null||!Number.isFinite(n)?"--":`${Number(n.toFixed(1))}%`}function Kn(n,e){return e>0?`${Ms(n)} (${_O(n/e*100)})`:"--"}function el(n){return n?`x ${Math.round(n.x)}, y ${Math.round(n.y)}, z ${Math.round(n.z)}`:"--"}function Un(n){return n==null||!Number.isFinite(n)?"--":`${Number(ga(n).toFixed(0))}`}function nr(n){if(n==null||!Number.isFinite(n))return"--";const e=Math.max(0,n),t=Math.floor(e/60),i=e-t*60;return`${t}:${i.toFixed(1).padStart(4,"0")}`}function gO(n,e,t){if(!n||e==null||!Number.isFinite(e))return null;const i=Sl(t),a=new URL("../",window.location.href);return a.searchParams.set("replayUrl",n.href),Hy(a,u0(e,i)).href}function vO(n,e,t){if(e==null||!Number.isFinite(e))return null;const i=Sl(t);return{config:u0(e,i),href:gO(n,e,t),goalTime:e,playerId:i}}function u0(n,e){return{version:pl,playback:{currentTime:Math.max(0,n-4),playing:!0,rate:1,skipPostGoalTransitions:!1,skipKickoffs:!1},camera:e?{mode:"follow",attachedPlayerId:e,ballCam:!0}:{mode:"free"},overlays:{timelineEvents:["core"],timelineRanges:[],mechanics:[],renderEffects:[],followedPlayerHud:!1,boostPads:!0,boostPickupAnimation:!1,hitboxWireframes:!1},recording:{},singletonWindows:[],statsWindows:[],moduleConfigs:{}}}function d0(n,e){return e>0?`${Number((ga(n)/e*60).toFixed(1))}/min`:"--"}function yO(n){const e=new Map;for(const t of n){const i=`${t.scope}:${t.category}`,a=e.get(i);a?a.push(t):e.set(i,[t])}return new Map([...e].sort(([t],[i])=>t.localeCompare(i)))}function f0(n){const[e,t]=n.split(":"),i=(t??"").replace(/_/g," ").replace(/\b\w/g,a=>a.toUpperCase());return`${e==="player"?"Player":"Team"} ${i}`}function p0(n){return`stats-${n.replace(/[^a-z0-9]+/gi,"-").toLowerCase()}`}function bO(n){return n.path.slice(1).join(".")||n.label}function SO(n){return!n.path.includes("entries")}function an(n,e,t){const i=j("section",{className:"stats-report-summary-card"});return i.append(j("span",{text:n}),j("strong",{text:e})),t&&i.append(j("small",{text:t})),i}function xO(n,e){const t=j("section",{className:"stats-report-summary"}),i=e.time>0?Ms(e.time):"--";return t.append(an("Replay",n.fileName),an("Frames",n.statsTimeline.frames.length.toLocaleString()),an("Duration",i),an("Players",e.players.length.toLocaleString())),t}function Ts(n,e){const t=j("section",{className:"stats-report-page-intro"});return t.append(j("h2",{text:n}),j("p",{text:e})),t}function wO(n,e,t){const i=e[0]?.scope??"player",a=l0(t,i),s=j("section",{className:"stats-report-section",id:p0(n)}),r=j("header");r.append(j("h2",{text:f0(n)}),j("span",{text:`${e.length} stats`}));const o=j("div",{className:"stats-report-table-wrap"}),l=j("table",{className:"stats-report-table"}),c=j("thead"),u=j("tr");u.append(j("th",{text:"Statistic"})),a.forEach((f,p)=>{u.append(j("th",{text:o0(f,i,p)}))}),c.append(u);const d=j("tbody");return e.forEach(f=>{const p=j("tr");p.append(j("td",{text:bO(f)})),a.forEach(_=>{p.append(j("td",{text:f.format(f.read(_))}))}),d.append(p)}),l.append(c,d),o.append(l),s.append(r,o),s}function Ff(n,e){return l0(e,n.scope).map((t,i)=>({label:o0(t,n.scope,i),value:mO(n,t)??0,color:pO(t,n.scope,i)})).filter(t=>t.value>0)}function xl(n,e){const t=Math.max(...n.map(a=>a.value),1),i=j("div",{className:"stats-report-bar-chart"});return n.forEach(a=>{const s=j("div",{className:"stats-report-bar-row"});s.style.setProperty("--bar-color",a.color),s.style.setProperty("--bar-width",`${Math.max(2,a.value/t*100)}%`),s.append(j("span",{className:"stats-report-bar-label",text:a.label}),j("span",{className:"stats-report-bar-track"}),j("strong",{text:a.formatted??e(a.value)})),i.append(s)}),i}function h0(n,e){const t=n.path.join(".");return n.category==="boost"&&(t.includes("amount_")||t.includes("overfill")||t.includes("boost_integral"))?Un(e):t.endsWith("_time")||t.startsWith("time_")||t.includes(".time_")||t.endsWith("_duration")||t==="active_game_time"||t==="tracked_time"?Ms(e):n.format(e)}function EO(n,e){return xl(Ff(n,e),t=>h0(n,t))}function MO(n){const e=n.reduce((i,a)=>i+a.value,0);if(e<=0)return"conic-gradient(rgba(255,255,255,0.12) 0 360deg)";let t=0;return`conic-gradient(${n.map(i=>{const a=t;return t+=i.value/e*360,`${i.color} ${a}deg ${t}deg`}).join(", ")})`}function Of(n,e){const t=n.reduce((r,o)=>r+o.value,0),i=j("div",{className:"stats-report-pie-chart"}),a=j("div",{className:"stats-report-pie"});a.style.background=MO(n);const s=j("div",{className:"stats-report-pie-legend"});return n.forEach(r=>{const o=j("div");o.style.setProperty("--legend-color",r.color);const l=t>0?`${Math.round(r.value/t*100)}%`:"--";o.append(j("span",{text:r.label}),j("strong",{text:`${r.formatted??e(r.value)} (${l})`})),s.append(o)}),i.append(a,s),i}function TO(n,e){return Of(Ff(n,e),t=>h0(n,t))}function m0(n,e="Territory share"){return wn(e,Of([{label:"Blue half",value:n.team_zero.pressure.defensive_half_time,color:tn[0]},{label:"Neutral",value:n.team_zero.pressure.neutral_time,color:"#65d6ad"},{label:"Orange half",value:n.team_zero.pressure.offensive_half_time,color:tn[1]}],Ms))}function wn(n,e,t){const i=j("section",{className:"stats-report-chart-card"});return i.append(j("h3",{text:n})),i.append(e),i}function _0(n,e,t){return Ff(e,t).length===0?null:wn(n.title,n.kind==="pie"?TO(e,t):EO(e,t))}function g0(n,e,t){const i=new Map(n.map(s=>[s.id,s])),a=j("section",{className:"stats-report-charts"});return t.forEach(s=>{const r=i.get(s.statId);if(!r)return;const o=_0(s,r,e);o&&a.append(o)}),a.childElementCount>0?a:null}function bs(n,e){const t=j("div",{className:"stats-report-stacked-chart"});return n.forEach(i=>{const a=i.segments.reduce((l,c)=>l+Math.max(0,c.value),0),s=j("div",{className:"stats-report-stacked-row"}),r=j("div",{className:"stats-report-stacked-track"});i.segments.forEach(l=>{const c=j("span");c.style.setProperty("--segment-color",l.color),c.style.setProperty("--segment-width",`${a>0?Math.max(1.5,l.value/a*100):0}%`),c.title=`${l.label}: ${e(l.value,a)}`,r.append(c)});const o=j("div",{className:"stats-report-stacked-legend"});i.segments.forEach(l=>{const c=j("span",{text:`${l.label}: ${e(l.value,a)}`});c.style.setProperty("--legend-color",l.color),o.append(c)}),s.append(j("strong",{text:i.label}),r,o),t.append(s)}),t}function Bl(n){const e=j("section",{className:"stats-report-metric-grid"});return e.append(...n),e}function da(n,e,t){const i=[...n].sort((s,r)=>e(r)-e(s))[0],a=i?e(i):0;return an(i?.name??"--",t(a))}function CO(n,e){const t=j("div",{className:"stats-report-page"});t.append(Ts("All stats dump","Everything emitted by the current stats timeline, including experimental mechanic counters and low-level breakdowns."));const i=j("nav",{className:"stats-report-jump-nav"});for(const s of n.keys()){const r=j("a",{text:f0(s)});r.setAttribute("href",`#${p0(s)}`),i.append(r)}t.append(i);const a=j("div",{className:"stats-report-grid"});for(const[s,r]of n)a.append(wO(s,r,e));return t.append(a),t}let tl=null,Sr={};function AO(n,e,t){const i=j("div",{className:"stats-report-page"});i.append(xO(n,e)),i.append(Ts("Featured stats","A shorter readout of stable scoreboard, touch, boost, possession, and pressure signals. The raw export remains available in All stats."));const a=`${e.team_zero.core.goals}-${e.team_one.core.goals}`;i.append(Bl([an("Final score",a,"Blue - Orange"),da(e.players,r=>r.touch.touch_count,r=>`${r} touches`),da(e.players,r=>r.boost.tracked_time>0?ga(r.boost.boost_integral/r.boost.tracked_time):0,r=>`${Number(r.toFixed(0))} avg boost`),da(e.players,r=>r.core.score,r=>`${r} score`)]));const s=g0(t,e,dO)??j("section",{className:"stats-report-charts"});return s.append(m0(e)),i.append(s),i}function RO(n){const e=new Map;for(const t of n){const i=e.get(t.goal_index)??[];i.push(t),e.set(t.goal_index,i)}for(const t of e.values())t.sort((i,a)=>i.kind.localeCompare(a.kind)||a.confidence-i.confidence);return e}function PO(n,e){const t=new Set(n.map((i,a)=>a));for(const i of e.keys())t.add(i);return[...t].sort((i,a)=>i-a)}function LO(n){const e=new Map;for(const t of n)e.set(t.kind,(e.get(t.kind)??0)+1);return[...e.entries()].sort(([t,i],[a,s])=>s-i||hn(t).localeCompare(hn(a))).map(([t,i],a)=>({label:hn(t),value:i,color:U_[a%U_.length],formatted:i.toLocaleString()}))}function NO(n){const e=j("dl",{className:"stats-report-detail-list"});for(const t of n){const i=j("div",{className:"stats-report-detail-item"});i.append(j("dt",{text:t.label}),j("dd",{text:t.value})),e.append(i)}return e}function IO(n){const e=j("div",{className:"stats-report-goal-tags"});if(n.length===0)return e.append(j("span",{className:"stats-report-goal-tag stats-report-goal-tag-empty",text:"Unlabeled"})),e;for(const t of n){const i=t.modifiers.length>0?` - ${t.modifiers.map(hn).join(", ")}`:"";e.append(j("span",{className:"stats-report-goal-tag",text:`${hn(t.kind)} ${Math.round(t.confidence*100)}%${i}`}))}return e}function kO(n,e){if(e.length===0)return null;const t=j("div",{className:"stats-report-goal-subsection"});t.append(j("h3",{text:"Player context"}));const i=j("div",{className:"stats-report-table-wrap"}),a=j("table",{className:"stats-report-table"}),s=j("thead"),r=j("tr");["Player","Team","Boost","Leadup avg","Leadup min","Role","Position"].forEach(l=>{r.append(j("th",{text:l}))}),s.append(r);const o=j("tbody");for(const l of e){const c=j("tr");c.append(j("td",{text:Va(n,l.player)}),j("td",{text:Kd(l.is_team_0)}),j("td",{text:Un(l.boost_amount)}),j("td",{text:Un(l.average_boost_in_leadup)}),j("td",{text:Un(l.min_boost_in_leadup)}),j("td",{text:l.is_most_back?"Most back":"--"}),j("td",{text:el(l.position)})),o.append(c)}return a.append(s,o),i.append(a),t.append(i),t}function DO(n,e,t,i,a){const s=a[0]??null,r=i?.scoring_team_is_team_0??s?.scoring_team_is_team_0??null,o=i?.scorer??s?.scorer??null,l=i?.time??s?.time??null,c=i?.frame??s?.frame??null,u=vO(e,l,o),d=j("section",{className:"stats-report-goal-card"});r!==null&&(d.dataset.team=r?"blue":"orange");const f=j("header"),p=j("div",{className:"stats-report-goal-heading"});if(p.append(j("h2",{text:`Goal ${t+1}`}),j("span",{text:`${Kd(r)} - ${Va(n,o)} - ${nr(l)}`})),f.append(p),u){if(Sr.onWatchGoal){const m=j("button",{className:"stats-report-goal-watch",text:"Watch"});m.type="button",m.addEventListener("click",()=>{Sr.onWatchGoal?.(u)}),f.append(m)}else if(u.href){const m=j("a",{className:"stats-report-goal-watch",text:"Watch"});m.setAttribute("href",u.href),m.setAttribute("target","_blank"),m.setAttribute("rel","noreferrer"),f.append(m)}}d.append(f),d.append(IO(a));const _=[{label:"Scoring team",value:Kd(r)},{label:"Scorer",value:Va(n,o)},{label:"Time",value:nr(l)},{label:"Frame",value:c==null?"--":c.toLocaleString()},{label:"Scorer last touch",value:i?.scorer_last_touch?`${Va(n,i.scorer_last_touch.player)} at ${nr(i.scorer_last_touch.time)}`:"--"},{label:"Scoring most back",value:Va(n,i?.scoring_team_most_back_player)},{label:"Defending most back",value:Va(n,i?.defending_team_most_back_player)},{label:"Ball position",value:el(i?.ball_position)},{label:"Last touch ball",value:el(i?.scorer_last_touch?.ball_position)},{label:"Last touch player",value:el(i?.scorer_last_touch?.player_position)}];d.append(NO(_));const g=kO(n,i?.players??[]);return g&&d.append(g),d}function FO(n,e){const t=j("div",{className:"stats-report-page"});t.append(Ts("Goal metadata","Goal-by-goal scorer, timing, context, tag confidence, and lead-up player state from the stats timeline event stream."));const i=[...n.statsTimeline.events.goal_context??[]].sort((f,p)=>f.time-p.time),a=[...n.statsTimeline.events.goal_tags??[]],s=RO(a),r=PO(i,s),o=[...s.values()].filter(f=>f.length>0).length,l=LO(a),c=l[0];if(t.append(Bl([an("Goals found",r.length.toLocaleString()),an("Tagged goals",o.toLocaleString()),an("Goal tags",a.length.toLocaleString()),an("Top tag",c?`${c.label} (${c.value})`:"--")])),r.length===0)return t.append(j("section",{className:"stats-report-empty",text:"No goal metadata was emitted for this replay."})),t;const u=j("section",{className:"stats-report-charts"});u.append(wn("Goal tags by type",l.length>0?xl(l,f=>f.toLocaleString()):j("p",{className:"stats-report-note",text:"No goal tags emitted."})),wn("Goal timing",xl(r.map(f=>{const p=i[f]??null,_=s.get(f)?.[0]??null,g=p?.time??_?.time??0,m=p?.scoring_team_is_team_0??_?.scoring_team_is_team_0??!0;return{label:`Goal ${f+1}`,value:g,color:m?tn[0]:tn[1],formatted:nr(g)}}),nr))),t.append(u);const d=j("div",{className:"stats-report-goal-list"});for(const f of r)d.append(DO(e,n.replayUrl,f,i[f]??null,s.get(f)??[]));return t.append(d),t}function OO(n,e){const t=j("div",{className:"stats-report-page"});t.append(Ts("Boost economy","A focused view of boost usage, collection, pad mix, starvation, and waste. Values are shown in normal 0-100 boost units.")),t.append(Bl([da(n.players,s=>s.boost.amount_used,s=>`${Un(s)} used`),da(n.players,s=>s.boost.amount_stolen,s=>`${Un(s)} stolen`),da(n.players,s=>s.boost.overfill_total,s=>`${Un(s)} overfill`),da(n.players,s=>s.boost.time_zero_boost,s=>`${Ms(s)} at zero`)]));const i=j("section",{className:"stats-report-charts"});i.append(wn("Boost used per minute",xl(n.players.map((s,r)=>({label:s.name||`Player ${r+1}`,value:s.boost.tracked_time>0?ga(s.boost.amount_used)/s.boost.tracked_time*60:0,color:c0(s),formatted:d0(s.boost.amount_used,s.boost.tracked_time)})),s=>`${Number(s.toFixed(1))}/min`)),wn("Pad collection mix",bs(n.players.map((s,r)=>({label:s.name||`Player ${r+1}`,segments:[{label:"Big",value:s.boost.amount_collected_big,color:B_.big},{label:"Small",value:s.boost.amount_collected_small,color:B_.small}]})),s=>Un(s))),wn("Boost tank time",bs(n.players.map((s,r)=>({label:s.name||`Player ${r+1}`,segments:[{label:"0",value:s.boost.time_zero_boost,color:Bs.zero},{label:"0-25",value:s.boost.time_boost_0_25,color:Bs.low},{label:"25-50",value:s.boost.time_boost_25_50,color:Bs.midLow},{label:"50-75",value:s.boost.time_boost_50_75,color:Bs.midHigh},{label:"75-100",value:s.boost.time_boost_75_100+s.boost.time_hundred_boost,color:Bs.high}]})),Kn)));const a=new Map(e.map(s=>[s.id,s]));for(const s of[{statId:"player:boost.amount_used",kind:"bar",title:"Total boost used"},{statId:"player:boost.overfill_total",kind:"bar",title:"Boost overfill"},{statId:"player:boost.amount_stolen",kind:"bar",title:"Stolen boost"}]){const r=a.get(s.statId),o=r?_0(s,r,n):null;o&&i.append(o)}return t.append(i),t.append(UO(n)),t}function UO(n){const e=j("section",{className:"stats-report-section"}),t=j("header");t.append(j("h2",{text:"Boost scorecard"}),j("span",{text:"display units"}));const i=[{label:"Average boost",read(c){return c.boost.tracked_time>0?`${Number(ga(c.boost.boost_integral/c.boost.tracked_time).toFixed(0))}`:"--"}},{label:"Used per minute",read(c){return d0(c.boost.amount_used,c.boost.tracked_time)}},{label:"Collected",read(c){return Un(c.boost.amount_collected)}},{label:"Stolen",read(c){return Un(c.boost.amount_stolen)}},{label:"Overfill",read(c){return Un(c.boost.overfill_total)}},{label:"Big pads",read(c){return`${c.boost.big_pads_collected}`}},{label:"Small pads",read(c){return`${c.boost.small_pads_collected}`}},{label:"Time at zero",read(c){return Kn(c.boost.time_zero_boost,c.boost.tracked_time)}}],a=j("div",{className:"stats-report-table-wrap"}),s=j("table",{className:"stats-report-table"}),r=j("thead"),o=j("tr");o.append(j("th",{text:"Metric"})),n.players.forEach((c,u)=>{o.append(j("th",{text:c.name||`Player ${u+1}`}))}),r.append(o);const l=j("tbody");return i.forEach(c=>{const u=j("tr");u.append(j("td",{text:c.label})),n.players.forEach(d=>{u.append(j("td",{text:c.read(d)}))}),l.append(u)}),s.append(r,l),a.append(s),e.append(t,a),e}function BO(n){const e=j("div",{className:"stats-report-page"});e.append(Ts("Possession & territory","Team control, field-half pressure, and where each player spent time relative to the field and the ball."));const t=n.team_zero.possession.tracked_time,i=n.team_zero.pressure.tracked_time;e.append(Bl([an("Blue possession",Kn(n.team_zero.possession.possession_time,t)),an("Orange possession",Kn(n.team_zero.possession.opponent_possession_time,t)),an("Blue pressure",Kn(n.team_zero.pressure.offensive_half_time,i),"Time in Orange half"),an("Orange pressure",Kn(n.team_zero.pressure.defensive_half_time,i),"Time in Blue half")]));const a=j("section",{className:"stats-report-charts"});return a.append(wn("Possession split",Of([{label:"Blue control",value:n.team_zero.possession.possession_time,color:tn[0]},{label:"Neutral",value:n.team_zero.possession.neutral_time,color:"#65d6ad"},{label:"Orange control",value:n.team_zero.possession.opponent_possession_time,color:tn[1]}],Ms)),m0(n,"Field half pressure"),wn("Player field thirds",bs(n.players.map((s,r)=>({label:s.name||`Player ${r+1}`,segments:[{label:"Def",value:s.positioning.time_defensive_third,color:s.is_team_0?tn[0]:tn[1]},{label:"Mid",value:s.positioning.time_neutral_third,color:"#65d6ad"},{label:"Off",value:s.positioning.time_offensive_third,color:s.is_team_0?tn[1]:tn[0]}]})),Kn)),wn("Role time",bs(n.players.map((s,r)=>({label:s.name||`Player ${r+1}`,segments:[{label:"Most back",value:s.positioning.time_most_back,color:"#58a6ff"},{label:"Mid",value:s.positioning.time_mid_role,color:"#65d6ad"},{label:"Most forward",value:s.positioning.time_most_forward,color:"#f39a37"},{label:"Other",value:s.positioning.time_other_role,color:"rgba(255,255,255,0.22)"}]})),Kn))),e.append(a),e}function zO(n,e){const t=j("div",{className:"stats-report-page"});t.append(Ts("Player involvement","Interaction stats that are usually easier to trust at a glance: touches, hits, demos, 50/50 outcomes, movement, and powerslide usage."));const i=g0(e,n,fO);i&&t.append(i);const a=j("section",{className:"stats-report-charts"});return a.append(wn("Speed bands",bs(n.players.map((s,r)=>({label:s.name||`Player ${r+1}`,segments:[{label:"Slow",value:s.movement.time_slow_speed,color:"#58a6ff"},{label:"Boost",value:s.movement.time_boost_speed,color:"#f2cc60"},{label:"Supersonic",value:s.movement.time_supersonic_speed,color:"#f39a37"}]})),Kn)),wn("Aerial profile",bs(n.players.map((s,r)=>({label:s.name||`Player ${r+1}`,segments:[{label:"Ground",value:s.movement.time_on_ground,color:"#65d6ad"},{label:"Low air",value:s.movement.time_low_air,color:"#58a6ff"},{label:"High air",value:s.movement.time_high_air,color:"#d2a8ff"}]})),Kn))),t.append(a),t.append(j("p",{className:"stats-report-note",text:"Experimental mechanic detectors such as musty flicks, speed flips, dodge refreshes, and ceiling shots are kept in All stats until their precision is stronger."})),t}function v0(){const n=window.location.hash.replace(/^#/,"");return r0.some(e=>e.id===n)?n:"overview"}function HO(n,e,t){const i=j("nav",{className:"stats-report-tabs"});return r0.forEach(a=>{const s=j("button",{text:a.label});s.type="button",s.dataset.active=a.id===n?"true":"false",s.addEventListener("click",()=>{v0()!==a.id&&window.history.replaceState(null,"",`#${a.id}`),wl(e,t)}),i.append(s)}),i}function Uf(n){const e=j("header",{className:"stats-report-header"}),t=j("div",{className:"stats-report-title"});if(t.append(j("h1",{text:"Replay Stats"}),j("p",{text:n??"Load a Rocket League replay to review curated stats pages, comparison graphs, and the complete raw stat dump."})),Sr.showStandaloneActions!==!1){const i=j("div",{className:"stats-report-actions"}),a=j("label",{className:"stats-report-file-label",text:"Load replay"}),s=j("input");s.type="file",s.accept=".replay",s.addEventListener("change",async()=>{const o=s.files?.[0],l=tl;o&&l instanceof HTMLElement&&await VO(l,o)}),a.append(s);const r=j("a",{className:"stats-report-link",text:"Open player"});r.setAttribute("href","../"),i.append(a,r),e.append(t,i)}else e.append(t);return e}function wl(n,e){const t=hO(e.statsTimeline,e.statsFrameLookup);if(!t){n.replaceChildren(j("main",{className:"stats-report-empty",text:"The replay did not produce any stats frames."}));return}const i=mr(t).filter(SO),a=yO(i),s=v0(),r=j("main",{className:"stats-report"});r.append(Uf()),r.append(HO(s,n,e)),s==="goals"?r.append(FO(e,t)):s==="boost"?r.append(OO(t,i)):s==="territory"?r.append(BO(t)):s==="involvement"?r.append(zO(t,i)):s==="dump"?r.append(CO(a,t)):r.append(AO(e,t,i)),n.replaceChildren(r)}function z_(n){return{...n,statsFrameLookup:n.statsFrameLookup??sy(n.statsTimeline)}}function xr(n,e){const t=j("main",{className:"stats-report"});t.append(Uf(e)),t.append(j("p",{className:"stats-report-status",text:e})),n.replaceChildren(t)}async function y0(n,e,t,i){xr(n,`Loading ${t}...`);const a=await Nl(e,{onProgress(s){xr(n,ws(s))}});wl(n,{fileName:t,replayUrl:i,statsTimeline:a.statsTimeline,statsFrameLookup:a.statsFrameLookup})}async function VO(n,e){try{await y0(n,new Uint8Array(await e.arrayBuffer()),e.name,null)}catch(t){xr(n,t instanceof Error?t.message:String(t))}}async function GO(n,e){try{xr(n,`Fetching ${e}...`);const t=await fetch(e);if(!t.ok)throw new Error(`Failed to fetch replay: ${t.status} ${t.statusText}`);const i=new URL(e,window.location.href).pathname,a=decodeURIComponent(i.split("/").pop()||"remote replay");await y0(n,new Uint8Array(await t.arrayBuffer()),a,t.url?new URL(t.url):new URL(e,window.location.href))}catch(t){xr(n,t instanceof Error?t.message:String(t))}}function $O(n,e={}){if(tl=n,Sr=e,e.initialData)wl(n,z_(e.initialData));else{const i=j("main",{className:"stats-report"});i.append(Uf()),i.append(j("section",{className:"stats-report-empty",text:"Load a replay to generate the stats report."})),n.replaceChildren(i)}const t=new URL(window.location.href).searchParams.get("replayUrl");return!e.initialData&&t&&GO(n,t),{root:n,render(i){wl(n,z_(i))},destroy(){tl===n&&(tl=null,Sr={}),n.replaceChildren()}}}const Io="replay-review-document",H_="replay-review-root";function un(n,e={}){const t=document.createElement(n);return e.className&&(t.className=e.className),e.id&&(t.id=e.id),e.text!==void 0&&(t.textContent=e.text),t}function b0(n,e={}){let t=null;const i=async()=>n instanceof Uint8Array?n:await n(),a=s=>(t||(t=i().then(r=>Nl(r,{reportEveryNFrames:100,onProgress:s}))),t);return{replayName:e.replayName,replayUrl:e.replayUrl??null,async getStatsTimeline(s){return(await a(s)).statsTimeline},getReplayBundle:a}}function WO(n=window.location){const e=Wy(n.search,n.href);return e?b0(async()=>{const t=await fetch(e.url,e.fetchInit);if(!t.ok){const i=t.statusText?` ${t.statusText}`:"";throw new Error(`Failed to fetch replay: ${t.status}${i}`)}return new Uint8Array(await t.arrayBuffer())},{replayName:e.name,replayUrl:e.url}):null}function XO(n){return n||(new URL(window.location.href).searchParams.get("mode")==="viewer"?"viewer":"report")}function qO(n){const e=new URL(window.location.href);n==="report"?e.searchParams.delete("mode"):e.searchParams.set("mode",n),window.history.replaceState(null,"",e)}function KO(n,e={}){document.documentElement.classList.add(Io),document.body.classList.add(Io),n.classList.add(H_);let t=e.provider??null,i=XO(e.initialMode),a=null,s=null,r=null,o=null,l=null,c=!1;const u=un("main",{className:"replay-review-shell"}),d=un("div",{className:"replay-review-toolbar"}),f=un("div",{className:"replay-review-status"}),p=un("button",{text:"Stats"}),_=un("button",{text:"Viewer"}),g=un("label",{className:"replay-review-file",text:"Load replay"}),m=un("input"),h=un("section",{className:"replay-review-pane"}),y=un("section",{className:"replay-review-pane"});m.type="file",m.accept=".replay",g.append(m),d.append(f,g,p,_),u.append(d,h,y),n.replaceChildren(u);const x=I=>{f.textContent=I},b=I=>{x(ws(I))},A=()=>{a?.destroy(),a=null,s?.destroy(),s=null,r=null,o=null,l=null},M=()=>t?.getReplayBundle?(o||(o=t.getReplayBundle(b)),o):null,T=()=>t?(r||(r=t.getStatsTimeline?t.getStatsTimeline(b):M()?.then(I=>I.statsTimeline)??null),r):null,C=()=>{h.replaceChildren(un("section",{className:"replay-review-empty",text:"Load a replay to review stats and playback."}))},v=async()=>{if(a)return;const I=T(),U=M();if(!I&&!U){C(),x("No replay loaded");return}h.replaceChildren(un("section",{className:"replay-review-empty",text:"Loading stats..."}));const B=await U,G=B?.statsTimeline??(I?await I:null);if(!G){C(),x("No replay loaded");return}const z={fileName:t?.replayName??"replay",replayUrl:t?.replayUrl??null,statsTimeline:G,statsFrameLookup:B?.statsFrameLookup};c||(a=$O(h,{initialData:z,showStandaloneActions:!1,onWatchGoal(X){l=X.config,s?.destroy(),s=null,i="viewer",R()}}),x(`Loaded ${z.fileName}`))},S=async()=>{if(s)return;const I=M();if(!I){y.replaceChildren(un("section",{className:"replay-review-empty",text:"Replay playback is not available for this data source."})),x("Viewer unavailable");return}y.replaceChildren(un("section",{className:"replay-review-empty",text:"Loading viewer..."}));const U=await I;c||(s=uO(y,{initialBundle:U,initialConfig:l,initialReplayName:t?.replayName,loadFromLocation:!1}),l=null,x(`Loaded ${t?.replayName??"replay"}`))},R=()=>{p.dataset.active=String(i==="report"),_.dataset.active=String(i==="viewer"),h.hidden=i!=="report",y.hidden=i!=="viewer",qO(i),(i==="report"?v():S()).catch(I=>{console.error("Failed to render replay review mode:",I),x(I instanceof Error?I.message:"Failed to load replay review")})};return p.addEventListener("click",()=>{i="report",R()}),_.addEventListener("click",()=>{i="viewer",R()}),m.addEventListener("change",()=>{const I=m.files?.[0];I&&(t=b0(async()=>new Uint8Array(await I.arrayBuffer()),{replayName:I.name,replayUrl:null}),A(),R())}),R(),{root:n,setMode(I){i=I,R()},setProvider(I,U={}){t=I,U.mode&&(i=U.mode),A(),R()},destroy(){c=!0,A(),n.classList.remove(H_),document.documentElement.classList.remove(Io),document.body.classList.remove(Io),n.replaceChildren()}}}const S0=document.querySelector("#app");if(!(S0 instanceof HTMLElement))throw new Error("Missing #app mount element");let x0=null;try{x0=WO(window.location)}catch(n){console.error("Invalid replay URL:",n)}KO(S0,{provider:x0});
