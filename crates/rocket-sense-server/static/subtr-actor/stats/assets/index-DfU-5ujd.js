(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function t(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(s){if(s.ep)return;s.ep=!0;const a=t(s);fetch(s.href,a)}})();const Nu="180",na={ROTATE:0,DOLLY:1,PAN:2},Ks={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Qv=0,Ah=1,e0=2,xm=1,t0=2,hi=3,Hi=0,ln=1,Qe=2,Ui=0,ia=1,Fi=2,Ch=3,Rh=4,n0=5,cs=100,i0=101,s0=102,a0=103,r0=104,o0=200,l0=201,c0=202,d0=203,Qc=204,ed=205,u0=206,h0=207,f0=208,p0=209,m0=210,g0=211,_0=212,v0=213,y0=214,td=0,nd=1,id=2,ua=3,sd=4,ad=5,rd=6,od=7,wl=0,b0=1,x0=2,Oi=0,S0=1,w0=2,E0=3,M0=4,T0=5,A0=6,C0=7,Sm=300,ha=301,fa=302,ld=303,cd=304,El=306,dd=1e3,fs=1001,ud=1002,Gn=1003,R0=1004,zr=1005,Jn=1006,Wl=1007,ps=1008,ii=1009,wm=1010,Em=1011,dr=1012,Iu=1013,ys=1014,fi=1015,Ir=1016,Du=1017,Uu=1018,ur=1020,Mm=35902,Tm=35899,Am=1021,Cm=1022,zn=1023,hr=1026,fr=1027,Rm=1028,Fu=1029,Pm=1030,Ou=1031,ku=1033,Ro=33776,Po=33777,Lo=33778,No=33779,hd=35840,fd=35841,pd=35842,md=35843,gd=36196,_d=37492,vd=37496,yd=37808,bd=37809,xd=37810,Sd=37811,wd=37812,Ed=37813,Md=37814,Td=37815,Ad=37816,Cd=37817,Rd=37818,Pd=37819,Ld=37820,Nd=37821,Id=36492,Dd=36494,Ud=36495,Fd=36283,Od=36284,kd=36285,Bd=36286,P0=3200,L0=3201,Bu=0,N0=1,Ii="",Vt="srgb",pa="srgb-linear",jo="linear",dt="srgb",Rs=7680,Ph=519,I0=512,D0=513,U0=514,Lm=515,F0=516,O0=517,k0=518,B0=519,zd=35044,Lh="300 es",Qn=2e3,Jo=2001;class Es{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const s=i[e];if(s!==void 0){const a=s.indexOf(t);a!==-1&&s.splice(a,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let a=0,r=s.length;a<r;a++)s[a].call(this,e);e.target=null}}}const zt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Nh=1234567;const Ka=Math.PI/180,pr=180/Math.PI;function ei(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(zt[n&255]+zt[n>>8&255]+zt[n>>16&255]+zt[n>>24&255]+"-"+zt[e&255]+zt[e>>8&255]+"-"+zt[e>>16&15|64]+zt[e>>24&255]+"-"+zt[t&63|128]+zt[t>>8&255]+"-"+zt[t>>16&255]+zt[t>>24&255]+zt[i&255]+zt[i>>8&255]+zt[i>>16&255]+zt[i>>24&255]).toLowerCase()}function Ye(n,e,t){return Math.max(e,Math.min(t,n))}function zu(n,e){return(n%e+e)%e}function z0(n,e,t,i,s){return i+(n-e)*(s-i)/(t-e)}function H0(n,e,t){return n!==e?(t-n)/(e-n):0}function ja(n,e,t){return(1-t)*n+t*e}function G0(n,e,t,i){return ja(n,e,1-Math.exp(-t*i))}function V0(n,e=1){return e-Math.abs(zu(n,e*2)-e)}function $0(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function W0(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function X0(n,e){return n+Math.floor(Math.random()*(e-n+1))}function q0(n,e){return n+Math.random()*(e-n)}function Y0(n){return n*(.5-Math.random())}function Z0(n){n!==void 0&&(Nh=n);let e=Nh+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function K0(n){return n*Ka}function j0(n){return n*pr}function J0(n){return(n&n-1)===0&&n!==0}function Q0(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function ey(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function ty(n,e,t,i,s){const a=Math.cos,r=Math.sin,o=a(t/2),l=r(t/2),c=a((e+i)/2),d=r((e+i)/2),u=a((e-i)/2),h=r((e-i)/2),f=a((i-e)/2),g=r((i-e)/2);switch(s){case"XYX":n.set(o*d,l*u,l*h,o*c);break;case"YZY":n.set(l*h,o*d,l*u,o*c);break;case"ZXZ":n.set(l*u,l*h,o*d,o*c);break;case"XZX":n.set(o*d,l*g,l*f,o*c);break;case"YXY":n.set(l*f,o*d,l*g,o*c);break;case"ZYZ":n.set(l*g,l*f,o*d,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function kn(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function at(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const pt={DEG2RAD:Ka,RAD2DEG:pr,generateUUID:ei,clamp:Ye,euclideanModulo:zu,mapLinear:z0,inverseLerp:H0,lerp:ja,damp:G0,pingpong:V0,smoothstep:$0,smootherstep:W0,randInt:X0,randFloat:q0,randFloatSpread:Y0,seededRandom:Z0,degToRad:K0,radToDeg:j0,isPowerOfTwo:J0,ceilPowerOfTwo:Q0,floorPowerOfTwo:ey,setQuaternionFromProperEuler:ty,normalize:at,denormalize:kn};class ue{constructor(e=0,t=0){ue.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ye(this.x,e.x,t.x),this.y=Ye(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ye(this.x,e,t),this.y=Ye(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ye(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ye(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),a=this.x-e.x,r=this.y-e.y;return this.x=a*i-r*s+e.x,this.y=a*s+r*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Gi{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,a,r,o){let l=i[s+0],c=i[s+1],d=i[s+2],u=i[s+3];const h=a[r+0],f=a[r+1],g=a[r+2],_=a[r+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=d,e[t+3]=u;return}if(o===1){e[t+0]=h,e[t+1]=f,e[t+2]=g,e[t+3]=_;return}if(u!==_||l!==h||c!==f||d!==g){let m=1-o;const p=l*h+c*f+d*g+u*_,w=p>=0?1:-1,x=1-p*p;if(x>Number.EPSILON){const C=Math.sqrt(x),M=Math.atan2(C,p*w);m=Math.sin(m*M)/C,o=Math.sin(o*M)/C}const y=o*w;if(l=l*m+h*y,c=c*m+f*y,d=d*m+g*y,u=u*m+_*y,m===1-o){const C=1/Math.sqrt(l*l+c*c+d*d+u*u);l*=C,c*=C,d*=C,u*=C}}e[t]=l,e[t+1]=c,e[t+2]=d,e[t+3]=u}static multiplyQuaternionsFlat(e,t,i,s,a,r){const o=i[s],l=i[s+1],c=i[s+2],d=i[s+3],u=a[r],h=a[r+1],f=a[r+2],g=a[r+3];return e[t]=o*g+d*u+l*f-c*h,e[t+1]=l*g+d*h+c*u-o*f,e[t+2]=c*g+d*f+o*h-l*u,e[t+3]=d*g-o*u-l*h-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,s=e._y,a=e._z,r=e._order,o=Math.cos,l=Math.sin,c=o(i/2),d=o(s/2),u=o(a/2),h=l(i/2),f=l(s/2),g=l(a/2);switch(r){case"XYZ":this._x=h*d*u+c*f*g,this._y=c*f*u-h*d*g,this._z=c*d*g+h*f*u,this._w=c*d*u-h*f*g;break;case"YXZ":this._x=h*d*u+c*f*g,this._y=c*f*u-h*d*g,this._z=c*d*g-h*f*u,this._w=c*d*u+h*f*g;break;case"ZXY":this._x=h*d*u-c*f*g,this._y=c*f*u+h*d*g,this._z=c*d*g+h*f*u,this._w=c*d*u-h*f*g;break;case"ZYX":this._x=h*d*u-c*f*g,this._y=c*f*u+h*d*g,this._z=c*d*g-h*f*u,this._w=c*d*u+h*f*g;break;case"YZX":this._x=h*d*u+c*f*g,this._y=c*f*u+h*d*g,this._z=c*d*g-h*f*u,this._w=c*d*u-h*f*g;break;case"XZY":this._x=h*d*u-c*f*g,this._y=c*f*u-h*d*g,this._z=c*d*g+h*f*u,this._w=c*d*u+h*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+r)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],a=t[8],r=t[1],o=t[5],l=t[9],c=t[2],d=t[6],u=t[10],h=i+o+u;if(h>0){const f=.5/Math.sqrt(h+1);this._w=.25/f,this._x=(d-l)*f,this._y=(a-c)*f,this._z=(r-s)*f}else if(i>o&&i>u){const f=2*Math.sqrt(1+i-o-u);this._w=(d-l)/f,this._x=.25*f,this._y=(s+r)/f,this._z=(a+c)/f}else if(o>u){const f=2*Math.sqrt(1+o-i-u);this._w=(a-c)/f,this._x=(s+r)/f,this._y=.25*f,this._z=(l+d)/f}else{const f=2*Math.sqrt(1+u-i-o);this._w=(r-s)/f,this._x=(a+c)/f,this._y=(l+d)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ye(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,a=e._z,r=e._w,o=t._x,l=t._y,c=t._z,d=t._w;return this._x=i*d+r*o+s*c-a*l,this._y=s*d+r*l+a*o-i*c,this._z=a*d+r*c+i*l-s*o,this._w=r*d-i*o-s*l-a*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,s=this._y,a=this._z,r=this._w;let o=r*e._w+i*e._x+s*e._y+a*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=r,this._x=i,this._y=s,this._z=a,this;const l=1-o*o;if(l<=Number.EPSILON){const f=1-t;return this._w=f*r+t*this._w,this._x=f*i+t*this._x,this._y=f*s+t*this._y,this._z=f*a+t*this._z,this.normalize(),this}const c=Math.sqrt(l),d=Math.atan2(c,o),u=Math.sin((1-t)*d)/c,h=Math.sin(t*d)/c;return this._w=r*u+this._w*h,this._x=i*u+this._x*h,this._y=s*u+this._y*h,this._z=a*u+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),a=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),a*Math.sin(t),a*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class L{constructor(e=0,t=0,i=0){L.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ih.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ih.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,a=e.elements;return this.x=a[0]*t+a[3]*i+a[6]*s,this.y=a[1]*t+a[4]*i+a[7]*s,this.z=a[2]*t+a[5]*i+a[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,a=e.elements,r=1/(a[3]*t+a[7]*i+a[11]*s+a[15]);return this.x=(a[0]*t+a[4]*i+a[8]*s+a[12])*r,this.y=(a[1]*t+a[5]*i+a[9]*s+a[13])*r,this.z=(a[2]*t+a[6]*i+a[10]*s+a[14])*r,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,a=e.x,r=e.y,o=e.z,l=e.w,c=2*(r*s-o*i),d=2*(o*t-a*s),u=2*(a*i-r*t);return this.x=t+l*c+r*u-o*d,this.y=i+l*d+o*c-a*u,this.z=s+l*u+a*d-r*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*s,this.y=a[1]*t+a[5]*i+a[9]*s,this.z=a[2]*t+a[6]*i+a[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ye(this.x,e.x,t.x),this.y=Ye(this.y,e.y,t.y),this.z=Ye(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ye(this.x,e,t),this.y=Ye(this.y,e,t),this.z=Ye(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ye(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,a=e.z,r=t.x,o=t.y,l=t.z;return this.x=s*l-a*o,this.y=a*r-i*l,this.z=i*o-s*r,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Xl.copy(this).projectOnVector(e),this.sub(Xl)}reflect(e){return this.sub(Xl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ye(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Xl=new L,Ih=new Gi;class We{constructor(e,t,i,s,a,r,o,l,c){We.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,a,r,o,l,c)}set(e,t,i,s,a,r,o,l,c){const d=this.elements;return d[0]=e,d[1]=s,d[2]=o,d[3]=t,d[4]=a,d[5]=l,d[6]=i,d[7]=r,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,a=this.elements,r=i[0],o=i[3],l=i[6],c=i[1],d=i[4],u=i[7],h=i[2],f=i[5],g=i[8],_=s[0],m=s[3],p=s[6],w=s[1],x=s[4],y=s[7],C=s[2],M=s[5],T=s[8];return a[0]=r*_+o*w+l*C,a[3]=r*m+o*x+l*M,a[6]=r*p+o*y+l*T,a[1]=c*_+d*w+u*C,a[4]=c*m+d*x+u*M,a[7]=c*p+d*y+u*T,a[2]=h*_+f*w+g*C,a[5]=h*m+f*x+g*M,a[8]=h*p+f*y+g*T,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],a=e[3],r=e[4],o=e[5],l=e[6],c=e[7],d=e[8];return t*r*d-t*o*c-i*a*d+i*o*l+s*a*c-s*r*l}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],a=e[3],r=e[4],o=e[5],l=e[6],c=e[7],d=e[8],u=d*r-o*c,h=o*l-d*a,f=c*a-r*l,g=t*u+i*h+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=u*_,e[1]=(s*c-d*i)*_,e[2]=(o*i-s*r)*_,e[3]=h*_,e[4]=(d*t-s*l)*_,e[5]=(s*a-o*t)*_,e[6]=f*_,e[7]=(i*l-c*t)*_,e[8]=(r*t-i*a)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,a,r,o){const l=Math.cos(a),c=Math.sin(a);return this.set(i*l,i*c,-i*(l*r+c*o)+r+e,-s*c,s*l,-s*(-c*r+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(ql.makeScale(e,t)),this}rotate(e){return this.premultiply(ql.makeRotation(-e)),this}translate(e,t){return this.premultiply(ql.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const ql=new We;function Nm(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Qo(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function ny(){const n=Qo("canvas");return n.style.display="block",n}const Dh={};function mr(n){n in Dh||(Dh[n]=!0,console.warn(n))}function iy(n,e,t){return new Promise(function(i,s){function a(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(a,t);break;default:i()}}setTimeout(a,t)})}const Uh=new We().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Fh=new We().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function sy(){const n={enabled:!0,workingColorSpace:pa,spaces:{},convert:function(s,a,r){return this.enabled===!1||a===r||!a||!r||(this.spaces[a].transfer===dt&&(s.r=mi(s.r),s.g=mi(s.g),s.b=mi(s.b)),this.spaces[a].primaries!==this.spaces[r].primaries&&(s.applyMatrix3(this.spaces[a].toXYZ),s.applyMatrix3(this.spaces[r].fromXYZ)),this.spaces[r].transfer===dt&&(s.r=sa(s.r),s.g=sa(s.g),s.b=sa(s.b))),s},workingToColorSpace:function(s,a){return this.convert(s,this.workingColorSpace,a)},colorSpaceToWorking:function(s,a){return this.convert(s,a,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Ii?jo:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,a=this.workingColorSpace){return s.fromArray(this.spaces[a].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,a,r){return s.copy(this.spaces[a].toXYZ).multiply(this.spaces[r].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,a){return mr("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,a)},toWorkingColorSpace:function(s,a){return mr("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,a)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[pa]:{primaries:e,whitePoint:i,transfer:jo,toXYZ:Uh,fromXYZ:Fh,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Vt},outputColorSpaceConfig:{drawingBufferColorSpace:Vt}},[Vt]:{primaries:e,whitePoint:i,transfer:dt,toXYZ:Uh,fromXYZ:Fh,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Vt}}}),n}const nt=sy();function mi(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function sa(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Ps;class ay{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Ps===void 0&&(Ps=Qo("canvas")),Ps.width=e.width,Ps.height=e.height;const s=Ps.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=Ps}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Qo("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),a=s.data;for(let r=0;r<a.length;r++)a[r]=mi(a[r]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(mi(t[i]/255)*255):t[i]=mi(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let ry=0;class Hu{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:ry++}),this.uuid=ei(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let a;if(Array.isArray(s)){a=[];for(let r=0,o=s.length;r<o;r++)s[r].isDataTexture?a.push(Yl(s[r].image)):a.push(Yl(s[r]))}else a=Yl(s);i.url=a}return t||(e.images[this.uuid]=i),i}}function Yl(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?ay.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let oy=0;const Zl=new L;class Kt extends Es{constructor(e=Kt.DEFAULT_IMAGE,t=Kt.DEFAULT_MAPPING,i=fs,s=fs,a=Jn,r=ps,o=zn,l=ii,c=Kt.DEFAULT_ANISOTROPY,d=Ii){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:oy++}),this.uuid=ei(),this.name="",this.source=new Hu(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=a,this.minFilter=r,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ue(0,0),this.repeat=new ue(1,1),this.center=new ue(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new We,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Zl).x}get height(){return this.source.getSize(Zl).y}get depth(){return this.source.getSize(Zl).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Sm)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case dd:e.x=e.x-Math.floor(e.x);break;case fs:e.x=e.x<0?0:1;break;case ud:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case dd:e.y=e.y-Math.floor(e.y);break;case fs:e.y=e.y<0?0:1;break;case ud:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Kt.DEFAULT_IMAGE=null;Kt.DEFAULT_MAPPING=Sm;Kt.DEFAULT_ANISOTROPY=1;class Et{constructor(e=0,t=0,i=0,s=1){Et.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,a=this.w,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s+r[12]*a,this.y=r[1]*t+r[5]*i+r[9]*s+r[13]*a,this.z=r[2]*t+r[6]*i+r[10]*s+r[14]*a,this.w=r[3]*t+r[7]*i+r[11]*s+r[15]*a,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,a;const l=e.elements,c=l[0],d=l[4],u=l[8],h=l[1],f=l[5],g=l[9],_=l[2],m=l[6],p=l[10];if(Math.abs(d-h)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(d+h)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const x=(c+1)/2,y=(f+1)/2,C=(p+1)/2,M=(d+h)/4,T=(u+_)/4,A=(g+m)/4;return x>y&&x>C?x<.01?(i=0,s=.707106781,a=.707106781):(i=Math.sqrt(x),s=M/i,a=T/i):y>C?y<.01?(i=.707106781,s=0,a=.707106781):(s=Math.sqrt(y),i=M/s,a=A/s):C<.01?(i=.707106781,s=.707106781,a=0):(a=Math.sqrt(C),i=T/a,s=A/a),this.set(i,s,a,t),this}let w=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(h-d)*(h-d));return Math.abs(w)<.001&&(w=1),this.x=(m-g)/w,this.y=(u-_)/w,this.z=(h-d)/w,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ye(this.x,e.x,t.x),this.y=Ye(this.y,e.y,t.y),this.z=Ye(this.z,e.z,t.z),this.w=Ye(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ye(this.x,e,t),this.y=Ye(this.y,e,t),this.z=Ye(this.z,e,t),this.w=Ye(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ye(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class ly extends Es{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Jn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new Et(0,0,e,t),this.scissorTest=!1,this.viewport=new Et(0,0,e,t);const s={width:e,height:t,depth:i.depth},a=new Kt(s);this.textures=[];const r=i.count;for(let o=0;o<r;o++)this.textures[o]=a.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){const t={minFilter:Jn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,a=this.textures.length;s<a;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new Hu(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class bs extends ly{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Im extends Kt{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Gn,this.minFilter=Gn,this.wrapR=fs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class cy extends Kt{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Gn,this.minFilter=Gn,this.wrapR=fs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Dr{constructor(e=new L(1/0,1/0,1/0),t=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Pn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Pn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Pn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const a=i.getAttribute("position");if(t===!0&&a!==void 0&&e.isInstancedMesh!==!0)for(let r=0,o=a.count;r<o;r++)e.isMesh===!0?e.getVertexPosition(r,Pn):Pn.fromBufferAttribute(a,r),Pn.applyMatrix4(e.matrixWorld),this.expandByPoint(Pn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Hr.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Hr.copy(i.boundingBox)),Hr.applyMatrix4(e.matrixWorld),this.union(Hr)}const s=e.children;for(let a=0,r=s.length;a<r;a++)this.expandByObject(s[a],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Pn),Pn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Na),Gr.subVectors(this.max,Na),Ls.subVectors(e.a,Na),Ns.subVectors(e.b,Na),Is.subVectors(e.c,Na),Si.subVectors(Ns,Ls),wi.subVectors(Is,Ns),ji.subVectors(Ls,Is);let t=[0,-Si.z,Si.y,0,-wi.z,wi.y,0,-ji.z,ji.y,Si.z,0,-Si.x,wi.z,0,-wi.x,ji.z,0,-ji.x,-Si.y,Si.x,0,-wi.y,wi.x,0,-ji.y,ji.x,0];return!Kl(t,Ls,Ns,Is,Gr)||(t=[1,0,0,0,1,0,0,0,1],!Kl(t,Ls,Ns,Is,Gr))?!1:(Vr.crossVectors(Si,wi),t=[Vr.x,Vr.y,Vr.z],Kl(t,Ls,Ns,Is,Gr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Pn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Pn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ri[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ri[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ri[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ri[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ri[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ri[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ri[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ri[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ri),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const ri=[new L,new L,new L,new L,new L,new L,new L,new L],Pn=new L,Hr=new Dr,Ls=new L,Ns=new L,Is=new L,Si=new L,wi=new L,ji=new L,Na=new L,Gr=new L,Vr=new L,Ji=new L;function Kl(n,e,t,i,s){for(let a=0,r=n.length-3;a<=r;a+=3){Ji.fromArray(n,a);const o=s.x*Math.abs(Ji.x)+s.y*Math.abs(Ji.y)+s.z*Math.abs(Ji.z),l=e.dot(Ji),c=t.dot(Ji),d=i.dot(Ji);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>o)return!1}return!0}const dy=new Dr,Ia=new L,jl=new L;class Ml{constructor(e=new L,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):dy.setFromPoints(e).getCenter(i);let s=0;for(let a=0,r=e.length;a<r;a++)s=Math.max(s,i.distanceToSquared(e[a]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ia.subVectors(e,this.center);const t=Ia.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(Ia,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(jl.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ia.copy(e.center).add(jl)),this.expandByPoint(Ia.copy(e.center).sub(jl))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const oi=new L,Jl=new L,$r=new L,Ei=new L,Ql=new L,Wr=new L,ec=new L;class Gu{constructor(e=new L,t=new L(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,oi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=oi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(oi.copy(this.origin).addScaledVector(this.direction,t),oi.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){Jl.copy(e).add(t).multiplyScalar(.5),$r.copy(t).sub(e).normalize(),Ei.copy(this.origin).sub(Jl);const a=e.distanceTo(t)*.5,r=-this.direction.dot($r),o=Ei.dot(this.direction),l=-Ei.dot($r),c=Ei.lengthSq(),d=Math.abs(1-r*r);let u,h,f,g;if(d>0)if(u=r*l-o,h=r*o-l,g=a*d,u>=0)if(h>=-g)if(h<=g){const _=1/d;u*=_,h*=_,f=u*(u+r*h+2*o)+h*(r*u+h+2*l)+c}else h=a,u=Math.max(0,-(r*h+o)),f=-u*u+h*(h+2*l)+c;else h=-a,u=Math.max(0,-(r*h+o)),f=-u*u+h*(h+2*l)+c;else h<=-g?(u=Math.max(0,-(-r*a+o)),h=u>0?-a:Math.min(Math.max(-a,-l),a),f=-u*u+h*(h+2*l)+c):h<=g?(u=0,h=Math.min(Math.max(-a,-l),a),f=h*(h+2*l)+c):(u=Math.max(0,-(r*a+o)),h=u>0?a:Math.min(Math.max(-a,-l),a),f=-u*u+h*(h+2*l)+c);else h=r>0?-a:a,u=Math.max(0,-(r*h+o)),f=-u*u+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Jl).addScaledVector($r,h),f}intersectSphere(e,t){oi.subVectors(e.center,this.origin);const i=oi.dot(this.direction),s=oi.dot(oi)-i*i,a=e.radius*e.radius;if(s>a)return null;const r=Math.sqrt(a-s),o=i-r,l=i+r;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,a,r,o,l;const c=1/this.direction.x,d=1/this.direction.y,u=1/this.direction.z,h=this.origin;return c>=0?(i=(e.min.x-h.x)*c,s=(e.max.x-h.x)*c):(i=(e.max.x-h.x)*c,s=(e.min.x-h.x)*c),d>=0?(a=(e.min.y-h.y)*d,r=(e.max.y-h.y)*d):(a=(e.max.y-h.y)*d,r=(e.min.y-h.y)*d),i>r||a>s||((a>i||isNaN(i))&&(i=a),(r<s||isNaN(s))&&(s=r),u>=0?(o=(e.min.z-h.z)*u,l=(e.max.z-h.z)*u):(o=(e.max.z-h.z)*u,l=(e.min.z-h.z)*u),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,oi)!==null}intersectTriangle(e,t,i,s,a){Ql.subVectors(t,e),Wr.subVectors(i,e),ec.crossVectors(Ql,Wr);let r=this.direction.dot(ec),o;if(r>0){if(s)return null;o=1}else if(r<0)o=-1,r=-r;else return null;Ei.subVectors(this.origin,e);const l=o*this.direction.dot(Wr.crossVectors(Ei,Wr));if(l<0)return null;const c=o*this.direction.dot(Ql.cross(Ei));if(c<0||l+c>r)return null;const d=-o*Ei.dot(ec);return d<0?null:this.at(d/r,a)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class yt{constructor(e,t,i,s,a,r,o,l,c,d,u,h,f,g,_,m){yt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,a,r,o,l,c,d,u,h,f,g,_,m)}set(e,t,i,s,a,r,o,l,c,d,u,h,f,g,_,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=s,p[1]=a,p[5]=r,p[9]=o,p[13]=l,p[2]=c,p[6]=d,p[10]=u,p[14]=h,p[3]=f,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new yt().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,s=1/Ds.setFromMatrixColumn(e,0).length(),a=1/Ds.setFromMatrixColumn(e,1).length(),r=1/Ds.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*a,t[5]=i[5]*a,t[6]=i[6]*a,t[7]=0,t[8]=i[8]*r,t[9]=i[9]*r,t[10]=i[10]*r,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,a=e.z,r=Math.cos(i),o=Math.sin(i),l=Math.cos(s),c=Math.sin(s),d=Math.cos(a),u=Math.sin(a);if(e.order==="XYZ"){const h=r*d,f=r*u,g=o*d,_=o*u;t[0]=l*d,t[4]=-l*u,t[8]=c,t[1]=f+g*c,t[5]=h-_*c,t[9]=-o*l,t[2]=_-h*c,t[6]=g+f*c,t[10]=r*l}else if(e.order==="YXZ"){const h=l*d,f=l*u,g=c*d,_=c*u;t[0]=h+_*o,t[4]=g*o-f,t[8]=r*c,t[1]=r*u,t[5]=r*d,t[9]=-o,t[2]=f*o-g,t[6]=_+h*o,t[10]=r*l}else if(e.order==="ZXY"){const h=l*d,f=l*u,g=c*d,_=c*u;t[0]=h-_*o,t[4]=-r*u,t[8]=g+f*o,t[1]=f+g*o,t[5]=r*d,t[9]=_-h*o,t[2]=-r*c,t[6]=o,t[10]=r*l}else if(e.order==="ZYX"){const h=r*d,f=r*u,g=o*d,_=o*u;t[0]=l*d,t[4]=g*c-f,t[8]=h*c+_,t[1]=l*u,t[5]=_*c+h,t[9]=f*c-g,t[2]=-c,t[6]=o*l,t[10]=r*l}else if(e.order==="YZX"){const h=r*l,f=r*c,g=o*l,_=o*c;t[0]=l*d,t[4]=_-h*u,t[8]=g*u+f,t[1]=u,t[5]=r*d,t[9]=-o*d,t[2]=-c*d,t[6]=f*u+g,t[10]=h-_*u}else if(e.order==="XZY"){const h=r*l,f=r*c,g=o*l,_=o*c;t[0]=l*d,t[4]=-u,t[8]=c*d,t[1]=h*u+_,t[5]=r*d,t[9]=f*u-g,t[2]=g*u-f,t[6]=o*d,t[10]=_*u+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(uy,e,hy)}lookAt(e,t,i){const s=this.elements;return un.subVectors(e,t),un.lengthSq()===0&&(un.z=1),un.normalize(),Mi.crossVectors(i,un),Mi.lengthSq()===0&&(Math.abs(i.z)===1?un.x+=1e-4:un.z+=1e-4,un.normalize(),Mi.crossVectors(i,un)),Mi.normalize(),Xr.crossVectors(un,Mi),s[0]=Mi.x,s[4]=Xr.x,s[8]=un.x,s[1]=Mi.y,s[5]=Xr.y,s[9]=un.y,s[2]=Mi.z,s[6]=Xr.z,s[10]=un.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,a=this.elements,r=i[0],o=i[4],l=i[8],c=i[12],d=i[1],u=i[5],h=i[9],f=i[13],g=i[2],_=i[6],m=i[10],p=i[14],w=i[3],x=i[7],y=i[11],C=i[15],M=s[0],T=s[4],A=s[8],v=s[12],b=s[1],R=s[5],I=s[9],O=s[13],B=s[2],G=s[6],k=s[10],Y=s[14],H=s[3],ie=s[7],q=s[11],Q=s[15];return a[0]=r*M+o*b+l*B+c*H,a[4]=r*T+o*R+l*G+c*ie,a[8]=r*A+o*I+l*k+c*q,a[12]=r*v+o*O+l*Y+c*Q,a[1]=d*M+u*b+h*B+f*H,a[5]=d*T+u*R+h*G+f*ie,a[9]=d*A+u*I+h*k+f*q,a[13]=d*v+u*O+h*Y+f*Q,a[2]=g*M+_*b+m*B+p*H,a[6]=g*T+_*R+m*G+p*ie,a[10]=g*A+_*I+m*k+p*q,a[14]=g*v+_*O+m*Y+p*Q,a[3]=w*M+x*b+y*B+C*H,a[7]=w*T+x*R+y*G+C*ie,a[11]=w*A+x*I+y*k+C*q,a[15]=w*v+x*O+y*Y+C*Q,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],a=e[12],r=e[1],o=e[5],l=e[9],c=e[13],d=e[2],u=e[6],h=e[10],f=e[14],g=e[3],_=e[7],m=e[11],p=e[15];return g*(+a*l*u-s*c*u-a*o*h+i*c*h+s*o*f-i*l*f)+_*(+t*l*f-t*c*h+a*r*h-s*r*f+s*c*d-a*l*d)+m*(+t*c*u-t*o*f-a*r*u+i*r*f+a*o*d-i*c*d)+p*(-s*o*d-t*l*u+t*o*h+s*r*u-i*r*h+i*l*d)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],a=e[3],r=e[4],o=e[5],l=e[6],c=e[7],d=e[8],u=e[9],h=e[10],f=e[11],g=e[12],_=e[13],m=e[14],p=e[15],w=u*m*c-_*h*c+_*l*f-o*m*f-u*l*p+o*h*p,x=g*h*c-d*m*c-g*l*f+r*m*f+d*l*p-r*h*p,y=d*_*c-g*u*c+g*o*f-r*_*f-d*o*p+r*u*p,C=g*u*l-d*_*l-g*o*h+r*_*h+d*o*m-r*u*m,M=t*w+i*x+s*y+a*C;if(M===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const T=1/M;return e[0]=w*T,e[1]=(_*h*a-u*m*a-_*s*f+i*m*f+u*s*p-i*h*p)*T,e[2]=(o*m*a-_*l*a+_*s*c-i*m*c-o*s*p+i*l*p)*T,e[3]=(u*l*a-o*h*a-u*s*c+i*h*c+o*s*f-i*l*f)*T,e[4]=x*T,e[5]=(d*m*a-g*h*a+g*s*f-t*m*f-d*s*p+t*h*p)*T,e[6]=(g*l*a-r*m*a-g*s*c+t*m*c+r*s*p-t*l*p)*T,e[7]=(r*h*a-d*l*a+d*s*c-t*h*c-r*s*f+t*l*f)*T,e[8]=y*T,e[9]=(g*u*a-d*_*a-g*i*f+t*_*f+d*i*p-t*u*p)*T,e[10]=(r*_*a-g*o*a+g*i*c-t*_*c-r*i*p+t*o*p)*T,e[11]=(d*o*a-r*u*a-d*i*c+t*u*c+r*i*f-t*o*f)*T,e[12]=C*T,e[13]=(d*_*s-g*u*s+g*i*h-t*_*h-d*i*m+t*u*m)*T,e[14]=(g*o*s-r*_*s-g*i*l+t*_*l+r*i*m-t*o*m)*T,e[15]=(r*u*s-d*o*s+d*i*l-t*u*l-r*i*h+t*o*h)*T,this}scale(e){const t=this.elements,i=e.x,s=e.y,a=e.z;return t[0]*=i,t[4]*=s,t[8]*=a,t[1]*=i,t[5]*=s,t[9]*=a,t[2]*=i,t[6]*=s,t[10]*=a,t[3]*=i,t[7]*=s,t[11]*=a,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),a=1-i,r=e.x,o=e.y,l=e.z,c=a*r,d=a*o;return this.set(c*r+i,c*o-s*l,c*l+s*o,0,c*o+s*l,d*o+i,d*l-s*r,0,c*l-s*o,d*l+s*r,a*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,a,r){return this.set(1,i,a,0,e,1,r,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,a=t._x,r=t._y,o=t._z,l=t._w,c=a+a,d=r+r,u=o+o,h=a*c,f=a*d,g=a*u,_=r*d,m=r*u,p=o*u,w=l*c,x=l*d,y=l*u,C=i.x,M=i.y,T=i.z;return s[0]=(1-(_+p))*C,s[1]=(f+y)*C,s[2]=(g-x)*C,s[3]=0,s[4]=(f-y)*M,s[5]=(1-(h+p))*M,s[6]=(m+w)*M,s[7]=0,s[8]=(g+x)*T,s[9]=(m-w)*T,s[10]=(1-(h+_))*T,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;let a=Ds.set(s[0],s[1],s[2]).length();const r=Ds.set(s[4],s[5],s[6]).length(),o=Ds.set(s[8],s[9],s[10]).length();this.determinant()<0&&(a=-a),e.x=s[12],e.y=s[13],e.z=s[14],Ln.copy(this);const c=1/a,d=1/r,u=1/o;return Ln.elements[0]*=c,Ln.elements[1]*=c,Ln.elements[2]*=c,Ln.elements[4]*=d,Ln.elements[5]*=d,Ln.elements[6]*=d,Ln.elements[8]*=u,Ln.elements[9]*=u,Ln.elements[10]*=u,t.setFromRotationMatrix(Ln),i.x=a,i.y=r,i.z=o,this}makePerspective(e,t,i,s,a,r,o=Qn,l=!1){const c=this.elements,d=2*a/(t-e),u=2*a/(i-s),h=(t+e)/(t-e),f=(i+s)/(i-s);let g,_;if(l)g=a/(r-a),_=r*a/(r-a);else if(o===Qn)g=-(r+a)/(r-a),_=-2*r*a/(r-a);else if(o===Jo)g=-r/(r-a),_=-r*a/(r-a);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,s,a,r,o=Qn,l=!1){const c=this.elements,d=2/(t-e),u=2/(i-s),h=-(t+e)/(t-e),f=-(i+s)/(i-s);let g,_;if(l)g=1/(r-a),_=r/(r-a);else if(o===Qn)g=-2/(r-a),_=-(r+a)/(r-a);else if(o===Jo)g=-1/(r-a),_=-a/(r-a);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Ds=new L,Ln=new yt,uy=new L(0,0,0),hy=new L(1,1,1),Mi=new L,Xr=new L,un=new L,Oh=new yt,kh=new Gi;class Wn{constructor(e=0,t=0,i=0,s=Wn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,a=s[0],r=s[4],o=s[8],l=s[1],c=s[5],d=s[9],u=s[2],h=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(Ye(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,f),this._z=Math.atan2(-r,a)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ye(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,a),this._z=0);break;case"ZXY":this._x=Math.asin(Ye(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-r,c)):(this._y=0,this._z=Math.atan2(l,a));break;case"ZYX":this._y=Math.asin(-Ye(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(h,f),this._z=Math.atan2(l,a)):(this._x=0,this._z=Math.atan2(-r,c));break;case"YZX":this._z=Math.asin(Ye(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-u,a)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Ye(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,a)):(this._x=Math.atan2(-d,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Oh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Oh,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return kh.setFromEuler(this),this.setFromQuaternion(kh,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Wn.DEFAULT_ORDER="XYZ";class Dm{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let fy=0;const Bh=new L,Us=new Gi,li=new yt,qr=new L,Da=new L,py=new L,my=new Gi,zh=new L(1,0,0),Hh=new L(0,1,0),Gh=new L(0,0,1),Vh={type:"added"},gy={type:"removed"},Fs={type:"childadded",child:null},tc={type:"childremoved",child:null};class It extends Es{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:fy++}),this.uuid=ei(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=It.DEFAULT_UP.clone();const e=new L,t=new Wn,i=new Gi,s=new L(1,1,1);function a(){i.setFromEuler(t,!1)}function r(){t.setFromQuaternion(i,void 0,!1)}t._onChange(a),i._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new yt},normalMatrix:{value:new We}}),this.matrix=new yt,this.matrixWorld=new yt,this.matrixAutoUpdate=It.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=It.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Dm,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Us.setFromAxisAngle(e,t),this.quaternion.multiply(Us),this}rotateOnWorldAxis(e,t){return Us.setFromAxisAngle(e,t),this.quaternion.premultiply(Us),this}rotateX(e){return this.rotateOnAxis(zh,e)}rotateY(e){return this.rotateOnAxis(Hh,e)}rotateZ(e){return this.rotateOnAxis(Gh,e)}translateOnAxis(e,t){return Bh.copy(e).applyQuaternion(this.quaternion),this.position.add(Bh.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(zh,e)}translateY(e){return this.translateOnAxis(Hh,e)}translateZ(e){return this.translateOnAxis(Gh,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(li.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?qr.copy(e):qr.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),Da.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?li.lookAt(Da,qr,this.up):li.lookAt(qr,Da,this.up),this.quaternion.setFromRotationMatrix(li),s&&(li.extractRotation(s.matrixWorld),Us.setFromRotationMatrix(li),this.quaternion.premultiply(Us.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Vh),Fs.child=e,this.dispatchEvent(Fs),Fs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(gy),tc.child=e,this.dispatchEvent(tc),tc.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),li.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),li.multiply(e.parent.matrixWorld)),e.applyMatrix4(li),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Vh),Fs.child=e,this.dispatchEvent(Fs),Fs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const r=this.children[i].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const s=this.children;for(let a=0,r=s.length;a<r;a++)s[a].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Da,e,py),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Da,my,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let a=0,r=s.length;a<r;a++)s[a].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function a(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=a(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){const u=l[c];a(e.shapes,u)}else a(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(a(e.materials,this.material[l]));s.material=o}else s.material=a(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(a(e.animations,l))}}if(t){const o=r(e.geometries),l=r(e.materials),c=r(e.textures),d=r(e.images),u=r(e.shapes),h=r(e.skeletons),f=r(e.animations),g=r(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),d.length>0&&(i.images=d),u.length>0&&(i.shapes=u),h.length>0&&(i.skeletons=h),f.length>0&&(i.animations=f),g.length>0&&(i.nodes=g)}return i.object=s,i;function r(o){const l=[];for(const c in o){const d=o[c];delete d.metadata,l.push(d)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}}It.DEFAULT_UP=new L(0,1,0);It.DEFAULT_MATRIX_AUTO_UPDATE=!0;It.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Nn=new L,ci=new L,nc=new L,di=new L,Os=new L,ks=new L,$h=new L,ic=new L,sc=new L,ac=new L,rc=new Et,oc=new Et,lc=new Et;class Tn{constructor(e=new L,t=new L,i=new L){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),Nn.subVectors(e,t),s.cross(Nn);const a=s.lengthSq();return a>0?s.multiplyScalar(1/Math.sqrt(a)):s.set(0,0,0)}static getBarycoord(e,t,i,s,a){Nn.subVectors(s,t),ci.subVectors(i,t),nc.subVectors(e,t);const r=Nn.dot(Nn),o=Nn.dot(ci),l=Nn.dot(nc),c=ci.dot(ci),d=ci.dot(nc),u=r*c-o*o;if(u===0)return a.set(0,0,0),null;const h=1/u,f=(c*l-o*d)*h,g=(r*d-o*l)*h;return a.set(1-f-g,g,f)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,di)===null?!1:di.x>=0&&di.y>=0&&di.x+di.y<=1}static getInterpolation(e,t,i,s,a,r,o,l){return this.getBarycoord(e,t,i,s,di)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(a,di.x),l.addScaledVector(r,di.y),l.addScaledVector(o,di.z),l)}static getInterpolatedAttribute(e,t,i,s,a,r){return rc.setScalar(0),oc.setScalar(0),lc.setScalar(0),rc.fromBufferAttribute(e,t),oc.fromBufferAttribute(e,i),lc.fromBufferAttribute(e,s),r.setScalar(0),r.addScaledVector(rc,a.x),r.addScaledVector(oc,a.y),r.addScaledVector(lc,a.z),r}static isFrontFacing(e,t,i,s){return Nn.subVectors(i,t),ci.subVectors(e,t),Nn.cross(ci).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Nn.subVectors(this.c,this.b),ci.subVectors(this.a,this.b),Nn.cross(ci).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Tn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Tn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,a){return Tn.getInterpolation(e,this.a,this.b,this.c,t,i,s,a)}containsPoint(e){return Tn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Tn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,a=this.c;let r,o;Os.subVectors(s,i),ks.subVectors(a,i),ic.subVectors(e,i);const l=Os.dot(ic),c=ks.dot(ic);if(l<=0&&c<=0)return t.copy(i);sc.subVectors(e,s);const d=Os.dot(sc),u=ks.dot(sc);if(d>=0&&u<=d)return t.copy(s);const h=l*u-d*c;if(h<=0&&l>=0&&d<=0)return r=l/(l-d),t.copy(i).addScaledVector(Os,r);ac.subVectors(e,a);const f=Os.dot(ac),g=ks.dot(ac);if(g>=0&&f<=g)return t.copy(a);const _=f*c-l*g;if(_<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(i).addScaledVector(ks,o);const m=d*g-f*u;if(m<=0&&u-d>=0&&f-g>=0)return $h.subVectors(a,s),o=(u-d)/(u-d+(f-g)),t.copy(s).addScaledVector($h,o);const p=1/(m+_+h);return r=_*p,o=h*p,t.copy(i).addScaledVector(Os,r).addScaledVector(ks,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Um={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ti={h:0,s:0,l:0},Yr={h:0,s:0,l:0};function cc(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Ze{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Vt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,nt.colorSpaceToWorking(this,t),this}setRGB(e,t,i,s=nt.workingColorSpace){return this.r=e,this.g=t,this.b=i,nt.colorSpaceToWorking(this,s),this}setHSL(e,t,i,s=nt.workingColorSpace){if(e=zu(e,1),t=Ye(t,0,1),i=Ye(i,0,1),t===0)this.r=this.g=this.b=i;else{const a=i<=.5?i*(1+t):i+t-i*t,r=2*i-a;this.r=cc(r,a,e+1/3),this.g=cc(r,a,e),this.b=cc(r,a,e-1/3)}return nt.colorSpaceToWorking(this,s),this}setStyle(e,t=Vt){function i(a){a!==void 0&&parseFloat(a)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let a;const r=s[1],o=s[2];switch(r){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,t);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,t);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const a=s[1],r=a.length;if(r===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,t);if(r===6)return this.setHex(parseInt(a,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Vt){const i=Um[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=mi(e.r),this.g=mi(e.g),this.b=mi(e.b),this}copyLinearToSRGB(e){return this.r=sa(e.r),this.g=sa(e.g),this.b=sa(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Vt){return nt.workingToColorSpace(Ht.copy(this),e),Math.round(Ye(Ht.r*255,0,255))*65536+Math.round(Ye(Ht.g*255,0,255))*256+Math.round(Ye(Ht.b*255,0,255))}getHexString(e=Vt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=nt.workingColorSpace){nt.workingToColorSpace(Ht.copy(this),t);const i=Ht.r,s=Ht.g,a=Ht.b,r=Math.max(i,s,a),o=Math.min(i,s,a);let l,c;const d=(o+r)/2;if(o===r)l=0,c=0;else{const u=r-o;switch(c=d<=.5?u/(r+o):u/(2-r-o),r){case i:l=(s-a)/u+(s<a?6:0);break;case s:l=(a-i)/u+2;break;case a:l=(i-s)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=d,e}getRGB(e,t=nt.workingColorSpace){return nt.workingToColorSpace(Ht.copy(this),t),e.r=Ht.r,e.g=Ht.g,e.b=Ht.b,e}getStyle(e=Vt){nt.workingToColorSpace(Ht.copy(this),e);const t=Ht.r,i=Ht.g,s=Ht.b;return e!==Vt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(Ti),this.setHSL(Ti.h+e,Ti.s+t,Ti.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Ti),e.getHSL(Yr);const i=ja(Ti.h,Yr.h,t),s=ja(Ti.s,Yr.s,t),a=ja(Ti.l,Yr.l,t);return this.setHSL(i,s,a),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,a=e.elements;return this.r=a[0]*t+a[3]*i+a[6]*s,this.g=a[1]*t+a[4]*i+a[7]*s,this.b=a[2]*t+a[5]*i+a[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ht=new Ze;Ze.NAMES=Um;let _y=0;class xi extends Es{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:_y++}),this.uuid=ei(),this.name="",this.type="Material",this.blending=ia,this.side=Hi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Qc,this.blendDst=ed,this.blendEquation=cs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ze(0,0,0),this.blendAlpha=0,this.depthFunc=ua,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ph,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Rs,this.stencilZFail=Rs,this.stencilZPass=Rs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==ia&&(i.blending=this.blending),this.side!==Hi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Qc&&(i.blendSrc=this.blendSrc),this.blendDst!==ed&&(i.blendDst=this.blendDst),this.blendEquation!==cs&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==ua&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ph&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Rs&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Rs&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Rs&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(a){const r=[];for(const o in a){const l=a[o];delete l.metadata,r.push(l)}return r}if(t){const a=s(e.textures),r=s(e.images);a.length>0&&(i.textures=a),r.length>0&&(i.images=r)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let a=0;a!==s;++a)i[a]=t[a].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class rt extends xi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ze(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Wn,this.combine=wl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Pt=new L,Zr=new ue;let vy=0;class Vn{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:vy++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=zd,this.updateRanges=[],this.gpuType=fi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,a=this.itemSize;s<a;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Zr.fromBufferAttribute(this,t),Zr.applyMatrix3(e),this.setXY(t,Zr.x,Zr.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Pt.fromBufferAttribute(this,t),Pt.applyMatrix3(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Pt.fromBufferAttribute(this,t),Pt.applyMatrix4(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Pt.fromBufferAttribute(this,t),Pt.applyNormalMatrix(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Pt.fromBufferAttribute(this,t),Pt.transformDirection(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=kn(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=at(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=kn(t,this.array)),t}setX(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=kn(t,this.array)),t}setY(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=kn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=kn(t,this.array)),t}setW(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=at(t,this.array),i=at(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=at(t,this.array),i=at(i,this.array),s=at(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,a){return e*=this.itemSize,this.normalized&&(t=at(t,this.array),i=at(i,this.array),s=at(s,this.array),a=at(a,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=a,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==zd&&(e.usage=this.usage),e}}class Fm extends Vn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Om extends Vn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class st extends Vn{constructor(e,t,i){super(new Float32Array(e),t,i)}}let yy=0;const wn=new yt,dc=new It,Bs=new L,hn=new Dr,Ua=new Dr,Ot=new L;class Tt extends Es{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:yy++}),this.uuid=ei(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Nm(e)?Om:Fm)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const a=new We().getNormalMatrix(e);i.applyNormalMatrix(a),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return wn.makeRotationFromQuaternion(e),this.applyMatrix4(wn),this}rotateX(e){return wn.makeRotationX(e),this.applyMatrix4(wn),this}rotateY(e){return wn.makeRotationY(e),this.applyMatrix4(wn),this}rotateZ(e){return wn.makeRotationZ(e),this.applyMatrix4(wn),this}translate(e,t,i){return wn.makeTranslation(e,t,i),this.applyMatrix4(wn),this}scale(e,t,i){return wn.makeScale(e,t,i),this.applyMatrix4(wn),this}lookAt(e){return dc.lookAt(e),dc.updateMatrix(),this.applyMatrix4(dc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Bs).negate(),this.translate(Bs.x,Bs.y,Bs.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let s=0,a=e.length;s<a;s++){const r=e[s];i.push(r.x,r.y,r.z||0)}this.setAttribute("position",new st(i,3))}else{const i=Math.min(e.length,t.count);for(let s=0;s<i;s++){const a=e[s];t.setXYZ(s,a.x,a.y,a.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Dr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const a=t[i];hn.setFromBufferAttribute(a),this.morphTargetsRelative?(Ot.addVectors(this.boundingBox.min,hn.min),this.boundingBox.expandByPoint(Ot),Ot.addVectors(this.boundingBox.max,hn.max),this.boundingBox.expandByPoint(Ot)):(this.boundingBox.expandByPoint(hn.min),this.boundingBox.expandByPoint(hn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ml);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(e){const i=this.boundingSphere.center;if(hn.setFromBufferAttribute(e),t)for(let a=0,r=t.length;a<r;a++){const o=t[a];Ua.setFromBufferAttribute(o),this.morphTargetsRelative?(Ot.addVectors(hn.min,Ua.min),hn.expandByPoint(Ot),Ot.addVectors(hn.max,Ua.max),hn.expandByPoint(Ot)):(hn.expandByPoint(Ua.min),hn.expandByPoint(Ua.max))}hn.getCenter(i);let s=0;for(let a=0,r=e.count;a<r;a++)Ot.fromBufferAttribute(e,a),s=Math.max(s,i.distanceToSquared(Ot));if(t)for(let a=0,r=t.length;a<r;a++){const o=t[a],l=this.morphTargetsRelative;for(let c=0,d=o.count;c<d;c++)Ot.fromBufferAttribute(o,c),l&&(Bs.fromBufferAttribute(e,c),Ot.add(Bs)),s=Math.max(s,i.distanceToSquared(Ot))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,s=t.normal,a=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Vn(new Float32Array(4*i.count),4));const r=this.getAttribute("tangent"),o=[],l=[];for(let A=0;A<i.count;A++)o[A]=new L,l[A]=new L;const c=new L,d=new L,u=new L,h=new ue,f=new ue,g=new ue,_=new L,m=new L;function p(A,v,b){c.fromBufferAttribute(i,A),d.fromBufferAttribute(i,v),u.fromBufferAttribute(i,b),h.fromBufferAttribute(a,A),f.fromBufferAttribute(a,v),g.fromBufferAttribute(a,b),d.sub(c),u.sub(c),f.sub(h),g.sub(h);const R=1/(f.x*g.y-g.x*f.y);isFinite(R)&&(_.copy(d).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(R),m.copy(u).multiplyScalar(f.x).addScaledVector(d,-g.x).multiplyScalar(R),o[A].add(_),o[v].add(_),o[b].add(_),l[A].add(m),l[v].add(m),l[b].add(m))}let w=this.groups;w.length===0&&(w=[{start:0,count:e.count}]);for(let A=0,v=w.length;A<v;++A){const b=w[A],R=b.start,I=b.count;for(let O=R,B=R+I;O<B;O+=3)p(e.getX(O+0),e.getX(O+1),e.getX(O+2))}const x=new L,y=new L,C=new L,M=new L;function T(A){C.fromBufferAttribute(s,A),M.copy(C);const v=o[A];x.copy(v),x.sub(C.multiplyScalar(C.dot(v))).normalize(),y.crossVectors(M,v);const R=y.dot(l[A])<0?-1:1;r.setXYZW(A,x.x,x.y,x.z,R)}for(let A=0,v=w.length;A<v;++A){const b=w[A],R=b.start,I=b.count;for(let O=R,B=R+I;O<B;O+=3)T(e.getX(O+0)),T(e.getX(O+1)),T(e.getX(O+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Vn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let h=0,f=i.count;h<f;h++)i.setXYZ(h,0,0,0);const s=new L,a=new L,r=new L,o=new L,l=new L,c=new L,d=new L,u=new L;if(e)for(let h=0,f=e.count;h<f;h+=3){const g=e.getX(h+0),_=e.getX(h+1),m=e.getX(h+2);s.fromBufferAttribute(t,g),a.fromBufferAttribute(t,_),r.fromBufferAttribute(t,m),d.subVectors(r,a),u.subVectors(s,a),d.cross(u),o.fromBufferAttribute(i,g),l.fromBufferAttribute(i,_),c.fromBufferAttribute(i,m),o.add(d),l.add(d),c.add(d),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let h=0,f=t.count;h<f;h+=3)s.fromBufferAttribute(t,h+0),a.fromBufferAttribute(t,h+1),r.fromBufferAttribute(t,h+2),d.subVectors(r,a),u.subVectors(s,a),d.cross(u),i.setXYZ(h+0,d.x,d.y,d.z),i.setXYZ(h+1,d.x,d.y,d.z),i.setXYZ(h+2,d.x,d.y,d.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Ot.fromBufferAttribute(e,t),Ot.normalize(),e.setXYZ(t,Ot.x,Ot.y,Ot.z)}toNonIndexed(){function e(o,l){const c=o.array,d=o.itemSize,u=o.normalized,h=new c.constructor(l.length*d);let f=0,g=0;for(let _=0,m=l.length;_<m;_++){o.isInterleavedBufferAttribute?f=l[_]*o.data.stride+o.offset:f=l[_]*d;for(let p=0;p<d;p++)h[g++]=c[f++]}return new Vn(h,d,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Tt,i=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=e(l,i);t.setAttribute(o,c)}const a=this.morphAttributes;for(const o in a){const l=[],c=a[o];for(let d=0,u=c.length;d<u;d++){const h=c[d],f=e(h,i);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const r=this.groups;for(let o=0,l=r.length;o<l;o++){const c=r[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let a=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],d=[];for(let u=0,h=c.length;u<h;u++){const f=c[u];d.push(f.toJSON(e.data))}d.length>0&&(s[l]=d,a=!0)}a&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const r=this.groups;r.length>0&&(e.data.groups=JSON.parse(JSON.stringify(r)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const s=e.attributes;for(const c in s){const d=s[c];this.setAttribute(c,d.clone(t))}const a=e.morphAttributes;for(const c in a){const d=[],u=a[c];for(let h=0,f=u.length;h<f;h++)d.push(u[h].clone(t));this.morphAttributes[c]=d}this.morphTargetsRelative=e.morphTargetsRelative;const r=e.groups;for(let c=0,d=r.length;c<d;c++){const u=r[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Wh=new yt,Qi=new Gu,Kr=new Ml,Xh=new L,jr=new L,Jr=new L,Qr=new L,uc=new L,eo=new L,qh=new L,to=new L;class ze extends It{constructor(e=new Tt,t=new rt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,r=s.length;a<r;a++){const o=s[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,a=i.morphAttributes.position,r=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(a&&o){eo.set(0,0,0);for(let l=0,c=a.length;l<c;l++){const d=o[l],u=a[l];d!==0&&(uc.fromBufferAttribute(u,e),r?eo.addScaledVector(uc,d):eo.addScaledVector(uc.sub(t),d))}t.add(eo)}return t}raycast(e,t){const i=this.geometry,s=this.material,a=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Kr.copy(i.boundingSphere),Kr.applyMatrix4(a),Qi.copy(e.ray).recast(e.near),!(Kr.containsPoint(Qi.origin)===!1&&(Qi.intersectSphere(Kr,Xh)===null||Qi.origin.distanceToSquared(Xh)>(e.far-e.near)**2))&&(Wh.copy(a).invert(),Qi.copy(e.ray).applyMatrix4(Wh),!(i.boundingBox!==null&&Qi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Qi)))}_computeIntersections(e,t,i){let s;const a=this.geometry,r=this.material,o=a.index,l=a.attributes.position,c=a.attributes.uv,d=a.attributes.uv1,u=a.attributes.normal,h=a.groups,f=a.drawRange;if(o!==null)if(Array.isArray(r))for(let g=0,_=h.length;g<_;g++){const m=h[g],p=r[m.materialIndex],w=Math.max(m.start,f.start),x=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let y=w,C=x;y<C;y+=3){const M=o.getX(y),T=o.getX(y+1),A=o.getX(y+2);s=no(this,p,e,i,c,d,u,M,T,A),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),_=Math.min(o.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const w=o.getX(m),x=o.getX(m+1),y=o.getX(m+2);s=no(this,r,e,i,c,d,u,w,x,y),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(r))for(let g=0,_=h.length;g<_;g++){const m=h[g],p=r[m.materialIndex],w=Math.max(m.start,f.start),x=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let y=w,C=x;y<C;y+=3){const M=y,T=y+1,A=y+2;s=no(this,p,e,i,c,d,u,M,T,A),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const w=m,x=m+1,y=m+2;s=no(this,r,e,i,c,d,u,w,x,y),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function by(n,e,t,i,s,a,r,o){let l;if(e.side===ln?l=i.intersectTriangle(r,a,s,!0,o):l=i.intersectTriangle(s,a,r,e.side===Hi,o),l===null)return null;to.copy(o),to.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(to);return c<t.near||c>t.far?null:{distance:c,point:to.clone(),object:n}}function no(n,e,t,i,s,a,r,o,l,c){n.getVertexPosition(o,jr),n.getVertexPosition(l,Jr),n.getVertexPosition(c,Qr);const d=by(n,e,t,i,jr,Jr,Qr,qh);if(d){const u=new L;Tn.getBarycoord(qh,jr,Jr,Qr,u),s&&(d.uv=Tn.getInterpolatedAttribute(s,o,l,c,u,new ue)),a&&(d.uv1=Tn.getInterpolatedAttribute(a,o,l,c,u,new ue)),r&&(d.normal=Tn.getInterpolatedAttribute(r,o,l,c,u,new L),d.normal.dot(i.direction)>0&&d.normal.multiplyScalar(-1));const h={a:o,b:l,c,normal:new L,materialIndex:0};Tn.getNormal(jr,Jr,Qr,h.normal),d.face=h,d.barycoord=u}return d}class Ms extends Tt{constructor(e=1,t=1,i=1,s=1,a=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:a,depthSegments:r};const o=this;s=Math.floor(s),a=Math.floor(a),r=Math.floor(r);const l=[],c=[],d=[],u=[];let h=0,f=0;g("z","y","x",-1,-1,i,t,e,r,a,0),g("z","y","x",1,-1,i,t,-e,r,a,1),g("x","z","y",1,1,e,i,t,s,r,2),g("x","z","y",1,-1,e,i,-t,s,r,3),g("x","y","z",1,-1,e,t,i,s,a,4),g("x","y","z",-1,-1,e,t,-i,s,a,5),this.setIndex(l),this.setAttribute("position",new st(c,3)),this.setAttribute("normal",new st(d,3)),this.setAttribute("uv",new st(u,2));function g(_,m,p,w,x,y,C,M,T,A,v){const b=y/T,R=C/A,I=y/2,O=C/2,B=M/2,G=T+1,k=A+1;let Y=0,H=0;const ie=new L;for(let q=0;q<k;q++){const Q=q*R-O;for(let _e=0;_e<G;_e++){const ye=_e*b-I;ie[_]=ye*w,ie[m]=Q*x,ie[p]=B,c.push(ie.x,ie.y,ie.z),ie[_]=0,ie[m]=0,ie[p]=M>0?1:-1,d.push(ie.x,ie.y,ie.z),u.push(_e/T),u.push(1-q/A),Y+=1}}for(let q=0;q<A;q++)for(let Q=0;Q<T;Q++){const _e=h+Q+G*q,ye=h+Q+G*(q+1),Pe=h+(Q+1)+G*(q+1),te=h+(Q+1)+G*q;l.push(_e,ye,te),l.push(ye,Pe,te),H+=6}o.addGroup(f,H,v),f+=H,h+=Y}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ms(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function ma(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone():Array.isArray(s)?e[t][i]=s.slice():e[t][i]=s}}return e}function Zt(n){const e={};for(let t=0;t<n.length;t++){const i=ma(n[t]);for(const s in i)e[s]=i[s]}return e}function xy(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function km(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:nt.workingColorSpace}const Sy={clone:ma,merge:Zt};var wy=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ey=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Vi extends xi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=wy,this.fragmentShader=Ey,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ma(e.uniforms),this.uniformsGroups=xy(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const r=this.uniforms[s].value;r&&r.isTexture?t.uniforms[s]={type:"t",value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[s]={type:"c",value:r.getHex()}:r&&r.isVector2?t.uniforms[s]={type:"v2",value:r.toArray()}:r&&r.isVector3?t.uniforms[s]={type:"v3",value:r.toArray()}:r&&r.isVector4?t.uniforms[s]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?t.uniforms[s]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?t.uniforms[s]={type:"m4",value:r.toArray()}:t.uniforms[s]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class Bm extends It{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new yt,this.projectionMatrix=new yt,this.projectionMatrixInverse=new yt,this.coordinateSystem=Qn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Ai=new L,Yh=new ue,Zh=new ue;class Mn extends Bm{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=pr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ka*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return pr*2*Math.atan(Math.tan(Ka*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Ai.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ai.x,Ai.y).multiplyScalar(-e/Ai.z),Ai.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Ai.x,Ai.y).multiplyScalar(-e/Ai.z)}getViewSize(e,t){return this.getViewBounds(e,Yh,Zh),t.subVectors(Zh,Yh)}setViewOffset(e,t,i,s,a,r){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=a,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Ka*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,a=-.5*s;const r=this.view;if(this.view!==null&&this.view.enabled){const l=r.fullWidth,c=r.fullHeight;a+=r.offsetX*s/l,t-=r.offsetY*i/c,s*=r.width/l,i*=r.height/c}const o=this.filmOffset;o!==0&&(a+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+s,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const zs=-90,Hs=1;class My extends It{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Mn(zs,Hs,e,t);s.layers=this.layers,this.add(s);const a=new Mn(zs,Hs,e,t);a.layers=this.layers,this.add(a);const r=new Mn(zs,Hs,e,t);r.layers=this.layers,this.add(r);const o=new Mn(zs,Hs,e,t);o.layers=this.layers,this.add(o);const l=new Mn(zs,Hs,e,t);l.layers=this.layers,this.add(l);const c=new Mn(zs,Hs,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,a,r,o,l]=t;for(const c of t)this.remove(c);if(e===Qn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Jo)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[a,r,o,l,c,d]=this.children,u=e.getRenderTarget(),h=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,s),e.render(t,a),e.setRenderTarget(i,1,s),e.render(t,r),e.setRenderTarget(i,2,s),e.render(t,o),e.setRenderTarget(i,3,s),e.render(t,l),e.setRenderTarget(i,4,s),e.render(t,c),i.texture.generateMipmaps=_,e.setRenderTarget(i,5,s),e.render(t,d),e.setRenderTarget(u,h,f),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class zm extends Kt{constructor(e=[],t=ha,i,s,a,r,o,l,c,d){super(e,t,i,s,a,r,o,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Ty extends bs{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new zm(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Ms(5,5,5),a=new Vi({name:"CubemapFromEquirect",uniforms:ma(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:ln,blending:Ui});a.uniforms.tEquirect.value=t;const r=new ze(s,a),o=t.minFilter;return t.minFilter===ps&&(t.minFilter=Jn),new My(1,10,this).update(e,r),t.minFilter=o,r.geometry.dispose(),r.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){const a=e.getRenderTarget();for(let r=0;r<6;r++)e.setRenderTarget(this,r),e.clear(t,i,s);e.setRenderTarget(a)}}class _t extends It{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Ay={type:"move"};class hc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new _t,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new _t,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new _t,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,a=null,r=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){r=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,i),p=this._getHandJoint(c,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const d=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],h=d.position.distanceTo(u.position),f=.02,g=.005;c.inputState.pinching&&h>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(a=t.getPose(e.gripSpace,i),a!==null&&(l.matrix.fromArray(a.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,a.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(a.linearVelocity)):l.hasLinearVelocity=!1,a.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(a.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&a!==null&&(s=a),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Ay)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=a!==null),c!==null&&(c.visible=r!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new _t;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class Cy extends It{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Wn,this.environmentIntensity=1,this.environmentRotation=new Wn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Ry{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=zd,this.updateRanges=[],this.version=0,this.uuid=ei()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let s=0,a=this.stride;s<a;s++)this.array[e+s]=t.array[i+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ei()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ei()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Yt=new L;class el{constructor(e,t,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)Yt.fromBufferAttribute(this,t),Yt.applyMatrix4(e),this.setXYZ(t,Yt.x,Yt.y,Yt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Yt.fromBufferAttribute(this,t),Yt.applyNormalMatrix(e),this.setXYZ(t,Yt.x,Yt.y,Yt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Yt.fromBufferAttribute(this,t),Yt.transformDirection(e),this.setXYZ(t,Yt.x,Yt.y,Yt.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=kn(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=at(i,this.array)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=at(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=at(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=at(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=at(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=kn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=kn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=kn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=kn(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=at(t,this.array),i=at(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=at(t,this.array),i=at(i,this.array),s=at(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this}setXYZW(e,t,i,s,a){return e=e*this.data.stride+this.offset,this.normalized&&(t=at(t,this.array),i=at(i,this.array),s=at(s,this.array),a=at(a,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this.data.array[e+3]=a,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let a=0;a<this.itemSize;a++)t.push(this.data.array[s+a])}return new Vn(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new el(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let a=0;a<this.itemSize;a++)t.push(this.data.array[s+a])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Hm extends xi{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Ze(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Gs;const Fa=new L,Vs=new L,$s=new L,Ws=new ue,Oa=new ue,Gm=new yt,io=new L,ka=new L,so=new L,Kh=new ue,fc=new ue,jh=new ue;class Vm extends It{constructor(e=new Hm){if(super(),this.isSprite=!0,this.type="Sprite",Gs===void 0){Gs=new Tt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new Ry(t,5);Gs.setIndex([0,1,2,0,2,3]),Gs.setAttribute("position",new el(i,3,0,!1)),Gs.setAttribute("uv",new el(i,2,3,!1))}this.geometry=Gs,this.material=e,this.center=new ue(.5,.5),this.count=1}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Vs.setFromMatrixScale(this.matrixWorld),Gm.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),$s.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Vs.multiplyScalar(-$s.z);const i=this.material.rotation;let s,a;i!==0&&(a=Math.cos(i),s=Math.sin(i));const r=this.center;ao(io.set(-.5,-.5,0),$s,r,Vs,s,a),ao(ka.set(.5,-.5,0),$s,r,Vs,s,a),ao(so.set(.5,.5,0),$s,r,Vs,s,a),Kh.set(0,0),fc.set(1,0),jh.set(1,1);let o=e.ray.intersectTriangle(io,ka,so,!1,Fa);if(o===null&&(ao(ka.set(-.5,.5,0),$s,r,Vs,s,a),fc.set(0,1),o=e.ray.intersectTriangle(io,so,ka,!1,Fa),o===null))return;const l=e.ray.origin.distanceTo(Fa);l<e.near||l>e.far||t.push({distance:l,point:Fa.clone(),uv:Tn.getInterpolation(Fa,io,ka,so,Kh,fc,jh,new ue),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function ao(n,e,t,i,s,a){Ws.subVectors(n,t).addScalar(.5).multiply(i),s!==void 0?(Oa.x=a*Ws.x-s*Ws.y,Oa.y=s*Ws.x+a*Ws.y):Oa.copy(Ws),n.copy(e),n.x+=Oa.x,n.y+=Oa.y,n.applyMatrix4(Gm)}const pc=new L,Py=new L,Ly=new We;class Li{constructor(e=new L(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=pc.subVectors(i,t).cross(Py.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(pc),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return a<0||a>1?null:t.copy(e.start).addScaledVector(i,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||Ly.getNormalMatrix(e),s=this.coplanarPoint(pc).applyMatrix4(e),a=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(a),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const es=new Ml,Ny=new ue(.5,.5),ro=new L;class Vu{constructor(e=new Li,t=new Li,i=new Li,s=new Li,a=new Li,r=new Li){this.planes=[e,t,i,s,a,r]}set(e,t,i,s,a,r){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(s),o[4].copy(a),o[5].copy(r),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Qn,i=!1){const s=this.planes,a=e.elements,r=a[0],o=a[1],l=a[2],c=a[3],d=a[4],u=a[5],h=a[6],f=a[7],g=a[8],_=a[9],m=a[10],p=a[11],w=a[12],x=a[13],y=a[14],C=a[15];if(s[0].setComponents(c-r,f-d,p-g,C-w).normalize(),s[1].setComponents(c+r,f+d,p+g,C+w).normalize(),s[2].setComponents(c+o,f+u,p+_,C+x).normalize(),s[3].setComponents(c-o,f-u,p-_,C-x).normalize(),i)s[4].setComponents(l,h,m,y).normalize(),s[5].setComponents(c-l,f-h,p-m,C-y).normalize();else if(s[4].setComponents(c-l,f-h,p-m,C-y).normalize(),t===Qn)s[5].setComponents(c+l,f+h,p+m,C+y).normalize();else if(t===Jo)s[5].setComponents(l,h,m,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),es.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),es.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(es)}intersectsSprite(e){es.center.set(0,0,0);const t=Ny.distanceTo(e.center);return es.radius=.7071067811865476+t,es.applyMatrix4(e.matrixWorld),this.intersectsSphere(es)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let a=0;a<6;a++)if(t[a].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(ro.x=s.normal.x>0?e.max.x:e.min.x,ro.y=s.normal.y>0?e.max.y:e.min.y,ro.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(ro)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Tl extends xi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ze(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const tl=new L,nl=new L,Jh=new yt,Ba=new Gu,oo=new Ml,mc=new L,Qh=new L;class $u extends It{constructor(e=new Tt,t=new Tl){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let s=1,a=t.count;s<a;s++)tl.fromBufferAttribute(t,s-1),nl.fromBufferAttribute(t,s),i[s]=i[s-1],i[s]+=tl.distanceTo(nl);e.setAttribute("lineDistance",new st(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,a=e.params.Line.threshold,r=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),oo.copy(i.boundingSphere),oo.applyMatrix4(s),oo.radius+=a,e.ray.intersectsSphere(oo)===!1)return;Jh.copy(s).invert(),Ba.copy(e.ray).applyMatrix4(Jh);const o=a/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,d=i.index,h=i.attributes.position;if(d!==null){const f=Math.max(0,r.start),g=Math.min(d.count,r.start+r.count);for(let _=f,m=g-1;_<m;_+=c){const p=d.getX(_),w=d.getX(_+1),x=lo(this,e,Ba,l,p,w,_);x&&t.push(x)}if(this.isLineLoop){const _=d.getX(g-1),m=d.getX(f),p=lo(this,e,Ba,l,_,m,g-1);p&&t.push(p)}}else{const f=Math.max(0,r.start),g=Math.min(h.count,r.start+r.count);for(let _=f,m=g-1;_<m;_+=c){const p=lo(this,e,Ba,l,_,_+1,_);p&&t.push(p)}if(this.isLineLoop){const _=lo(this,e,Ba,l,g-1,f,g-1);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,r=s.length;a<r;a++){const o=s[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}}function lo(n,e,t,i,s,a,r){const o=n.geometry.attributes.position;if(tl.fromBufferAttribute(o,s),nl.fromBufferAttribute(o,a),t.distanceSqToSegment(tl,nl,mc,Qh)>i)return;mc.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(mc);if(!(c<e.near||c>e.far))return{distance:c,point:Qh.clone().applyMatrix4(n.matrixWorld),index:r,face:null,faceIndex:null,barycoord:null,object:n}}class Al extends Kt{constructor(e,t,i,s,a,r,o,l,c){super(e,t,i,s,a,r,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class $m extends Kt{constructor(e,t,i=ys,s,a,r,o=Gn,l=Gn,c,d=hr,u=1){if(d!==hr&&d!==fr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:e,height:t,depth:u};super(h,s,a,r,o,l,d,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Hu(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Wm extends Kt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class js extends Tt{constructor(e=1,t=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:s},t=Math.max(3,t);const a=[],r=[],o=[],l=[],c=new L,d=new ue;r.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let u=0,h=3;u<=t;u++,h+=3){const f=i+u/t*s;c.x=e*Math.cos(f),c.y=e*Math.sin(f),r.push(c.x,c.y,c.z),o.push(0,0,1),d.x=(r[h]/e+1)/2,d.y=(r[h+1]/e+1)/2,l.push(d.x,d.y)}for(let u=1;u<=t;u++)a.push(u,u+1,0);this.setIndex(a),this.setAttribute("position",new st(r,3)),this.setAttribute("normal",new st(o,3)),this.setAttribute("uv",new st(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new js(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Cl extends Tt{constructor(e=1,t=1,i=1,s=32,a=1,r=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:s,heightSegments:a,openEnded:r,thetaStart:o,thetaLength:l};const c=this;s=Math.floor(s),a=Math.floor(a);const d=[],u=[],h=[],f=[];let g=0;const _=[],m=i/2;let p=0;w(),r===!1&&(e>0&&x(!0),t>0&&x(!1)),this.setIndex(d),this.setAttribute("position",new st(u,3)),this.setAttribute("normal",new st(h,3)),this.setAttribute("uv",new st(f,2));function w(){const y=new L,C=new L;let M=0;const T=(t-e)/i;for(let A=0;A<=a;A++){const v=[],b=A/a,R=b*(t-e)+e;for(let I=0;I<=s;I++){const O=I/s,B=O*l+o,G=Math.sin(B),k=Math.cos(B);C.x=R*G,C.y=-b*i+m,C.z=R*k,u.push(C.x,C.y,C.z),y.set(G,T,k).normalize(),h.push(y.x,y.y,y.z),f.push(O,1-b),v.push(g++)}_.push(v)}for(let A=0;A<s;A++)for(let v=0;v<a;v++){const b=_[v][A],R=_[v+1][A],I=_[v+1][A+1],O=_[v][A+1];(e>0||v!==0)&&(d.push(b,R,O),M+=3),(t>0||v!==a-1)&&(d.push(R,I,O),M+=3)}c.addGroup(p,M,0),p+=M}function x(y){const C=g,M=new ue,T=new L;let A=0;const v=y===!0?e:t,b=y===!0?1:-1;for(let I=1;I<=s;I++)u.push(0,m*b,0),h.push(0,b,0),f.push(.5,.5),g++;const R=g;for(let I=0;I<=s;I++){const B=I/s*l+o,G=Math.cos(B),k=Math.sin(B);T.x=v*k,T.y=m*b,T.z=v*G,u.push(T.x,T.y,T.z),h.push(0,b,0),M.x=G*.5+.5,M.y=k*.5*b+.5,f.push(M.x,M.y),g++}for(let I=0;I<s;I++){const O=C+I,B=R+I;y===!0?d.push(B,B+1,O):d.push(B+1,B,O),A+=3}c.addGroup(p,A,y===!0?1:2),p+=A}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Cl(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class gr extends Cl{constructor(e=1,t=1,i=32,s=1,a=!1,r=0,o=Math.PI*2){super(0,e,t,i,s,a,r,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:s,openEnded:a,thetaStart:r,thetaLength:o}}static fromJSON(e){return new gr(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class si{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){const i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let i,s=this.getPoint(0),a=0;t.push(0);for(let r=1;r<=e;r++)i=this.getPoint(r/e),a+=i.distanceTo(s),t.push(a),s=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const i=this.getLengths();let s=0;const a=i.length;let r;t?r=t:r=e*i[a-1];let o=0,l=a-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=i[s]-r,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,i[s]===r)return s/(a-1);const d=i[s],h=i[s+1]-d,f=(r-d)/h;return(s+f)/(a-1)}getTangent(e,t){let s=e-1e-4,a=e+1e-4;s<0&&(s=0),a>1&&(a=1);const r=this.getPoint(s),o=this.getPoint(a),l=t||(r.isVector2?new ue:new L);return l.copy(o).sub(r).normalize(),l}getTangentAt(e,t){const i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t=!1){const i=new L,s=[],a=[],r=[],o=new L,l=new yt;for(let f=0;f<=e;f++){const g=f/e;s[f]=this.getTangentAt(g,new L)}a[0]=new L,r[0]=new L;let c=Number.MAX_VALUE;const d=Math.abs(s[0].x),u=Math.abs(s[0].y),h=Math.abs(s[0].z);d<=c&&(c=d,i.set(1,0,0)),u<=c&&(c=u,i.set(0,1,0)),h<=c&&i.set(0,0,1),o.crossVectors(s[0],i).normalize(),a[0].crossVectors(s[0],o),r[0].crossVectors(s[0],a[0]);for(let f=1;f<=e;f++){if(a[f]=a[f-1].clone(),r[f]=r[f-1].clone(),o.crossVectors(s[f-1],s[f]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(Ye(s[f-1].dot(s[f]),-1,1));a[f].applyMatrix4(l.makeRotationAxis(o,g))}r[f].crossVectors(s[f],a[f])}if(t===!0){let f=Math.acos(Ye(a[0].dot(a[e]),-1,1));f/=e,s[0].dot(o.crossVectors(a[0],a[e]))>0&&(f=-f);for(let g=1;g<=e;g++)a[g].applyMatrix4(l.makeRotationAxis(s[g],f*g)),r[g].crossVectors(s[g],a[g])}return{tangents:s,normals:a,binormals:r}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Wu extends si{constructor(e=0,t=0,i=1,s=1,a=0,r=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=s,this.aStartAngle=a,this.aEndAngle=r,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new ue){const i=t,s=Math.PI*2;let a=this.aEndAngle-this.aStartAngle;const r=Math.abs(a)<Number.EPSILON;for(;a<0;)a+=s;for(;a>s;)a-=s;a<Number.EPSILON&&(r?a=0:a=s),this.aClockwise===!0&&!r&&(a===s?a=-s:a=a-s);const o=this.aStartAngle+e*a;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const d=Math.cos(this.aRotation),u=Math.sin(this.aRotation),h=l-this.aX,f=c-this.aY;l=h*d-f*u+this.aX,c=h*u+f*d+this.aY}return i.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class Iy extends Wu{constructor(e,t,i,s,a,r){super(e,t,i,i,s,a,r),this.isArcCurve=!0,this.type="ArcCurve"}}function Xu(){let n=0,e=0,t=0,i=0;function s(a,r,o,l){n=a,e=o,t=-3*a+3*r-2*o-l,i=2*a-2*r+o+l}return{initCatmullRom:function(a,r,o,l,c){s(r,o,c*(o-a),c*(l-r))},initNonuniformCatmullRom:function(a,r,o,l,c,d,u){let h=(r-a)/c-(o-a)/(c+d)+(o-r)/d,f=(o-r)/d-(l-r)/(d+u)+(l-o)/u;h*=d,f*=d,s(r,o,h,f)},calc:function(a){const r=a*a,o=r*a;return n+e*a+t*r+i*o}}}const co=new L,gc=new Xu,_c=new Xu,vc=new Xu;class Dy extends si{constructor(e=[],t=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=s}getPoint(e,t=new L){const i=t,s=this.points,a=s.length,r=(a-(this.closed?0:1))*e;let o=Math.floor(r),l=r-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/a)+1)*a:l===0&&o===a-1&&(o=a-2,l=1);let c,d;this.closed||o>0?c=s[(o-1)%a]:(co.subVectors(s[0],s[1]).add(s[0]),c=co);const u=s[o%a],h=s[(o+1)%a];if(this.closed||o+2<a?d=s[(o+2)%a]:(co.subVectors(s[a-1],s[a-2]).add(s[a-1]),d=co),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(u),f),_=Math.pow(u.distanceToSquared(h),f),m=Math.pow(h.distanceToSquared(d),f);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),gc.initNonuniformCatmullRom(c.x,u.x,h.x,d.x,g,_,m),_c.initNonuniformCatmullRom(c.y,u.y,h.y,d.y,g,_,m),vc.initNonuniformCatmullRom(c.z,u.z,h.z,d.z,g,_,m)}else this.curveType==="catmullrom"&&(gc.initCatmullRom(c.x,u.x,h.x,d.x,this.tension),_c.initCatmullRom(c.y,u.y,h.y,d.y,this.tension),vc.initCatmullRom(c.z,u.z,h.z,d.z,this.tension));return i.set(gc.calc(l),_c.calc(l),vc.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(new L().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function ef(n,e,t,i,s){const a=(i-e)*.5,r=(s-t)*.5,o=n*n,l=n*o;return(2*t-2*i+a+r)*l+(-3*t+3*i-2*a-r)*o+a*n+t}function Uy(n,e){const t=1-n;return t*t*e}function Fy(n,e){return 2*(1-n)*n*e}function Oy(n,e){return n*n*e}function Ja(n,e,t,i){return Uy(n,e)+Fy(n,t)+Oy(n,i)}function ky(n,e){const t=1-n;return t*t*t*e}function By(n,e){const t=1-n;return 3*t*t*n*e}function zy(n,e){return 3*(1-n)*n*n*e}function Hy(n,e){return n*n*n*e}function Qa(n,e,t,i,s){return ky(n,e)+By(n,t)+zy(n,i)+Hy(n,s)}class Xm extends si{constructor(e=new ue,t=new ue,i=new ue,s=new ue){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=s}getPoint(e,t=new ue){const i=t,s=this.v0,a=this.v1,r=this.v2,o=this.v3;return i.set(Qa(e,s.x,a.x,r.x,o.x),Qa(e,s.y,a.y,r.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Gy extends si{constructor(e=new L,t=new L,i=new L,s=new L){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=s}getPoint(e,t=new L){const i=t,s=this.v0,a=this.v1,r=this.v2,o=this.v3;return i.set(Qa(e,s.x,a.x,r.x,o.x),Qa(e,s.y,a.y,r.y,o.y),Qa(e,s.z,a.z,r.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class qm extends si{constructor(e=new ue,t=new ue){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ue){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ue){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Vy extends si{constructor(e=new L,t=new L){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new L){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new L){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Ym extends si{constructor(e=new ue,t=new ue,i=new ue){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new ue){const i=t,s=this.v0,a=this.v1,r=this.v2;return i.set(Ja(e,s.x,a.x,r.x),Ja(e,s.y,a.y,r.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class $y extends si{constructor(e=new L,t=new L,i=new L){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new L){const i=t,s=this.v0,a=this.v1,r=this.v2;return i.set(Ja(e,s.x,a.x,r.x),Ja(e,s.y,a.y,r.y),Ja(e,s.z,a.z,r.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Zm extends si{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ue){const i=t,s=this.points,a=(s.length-1)*e,r=Math.floor(a),o=a-r,l=s[r===0?r:r-1],c=s[r],d=s[r>s.length-2?s.length-1:r+1],u=s[r>s.length-3?s.length-1:r+2];return i.set(ef(o,l.x,c.x,d.x,u.x),ef(o,l.y,c.y,d.y,u.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(new ue().fromArray(s))}return this}}var tf=Object.freeze({__proto__:null,ArcCurve:Iy,CatmullRomCurve3:Dy,CubicBezierCurve:Xm,CubicBezierCurve3:Gy,EllipseCurve:Wu,LineCurve:qm,LineCurve3:Vy,QuadraticBezierCurve:Ym,QuadraticBezierCurve3:$y,SplineCurve:Zm});class Wy extends si{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new tf[i](t,e))}return this}getPoint(e,t){const i=e*this.getLength(),s=this.getCurveLengths();let a=0;for(;a<s.length;){if(s[a]>=i){const r=s[a]-i,o=this.curves[a],l=o.getLength(),c=l===0?0:1-r/l;return o.getPointAt(c,t)}a++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let i=0,s=this.curves.length;i<s;i++)t+=this.curves[i].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let i;for(let s=0,a=this.curves;s<a.length;s++){const r=a[s],o=r.isEllipseCurve?e*2:r.isLineCurve||r.isLineCurve3?1:r.isSplineCurve?e*r.points.length:e,l=r.getPoints(o);for(let c=0;c<l.length;c++){const d=l[c];i&&i.equals(d)||(t.push(d),i=d)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,i=this.curves.length;t<i;t++){const s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const s=e.curves[t];this.curves.push(new tf[s.type]().fromJSON(s))}return this}}class nf extends Wy{constructor(e){super(),this.type="Path",this.currentPoint=new ue,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,i=e.length;t<i;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const i=new qm(this.currentPoint.clone(),new ue(e,t));return this.curves.push(i),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,i,s){const a=new Ym(this.currentPoint.clone(),new ue(e,t),new ue(i,s));return this.curves.push(a),this.currentPoint.set(i,s),this}bezierCurveTo(e,t,i,s,a,r){const o=new Xm(this.currentPoint.clone(),new ue(e,t),new ue(i,s),new ue(a,r));return this.curves.push(o),this.currentPoint.set(a,r),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),i=new Zm(t);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,i,s,a,r){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,i,s,a,r),this}absarc(e,t,i,s,a,r){return this.absellipse(e,t,i,i,s,a,r),this}ellipse(e,t,i,s,a,r,o,l){const c=this.currentPoint.x,d=this.currentPoint.y;return this.absellipse(e+c,t+d,i,s,a,r,o,l),this}absellipse(e,t,i,s,a,r,o,l){const c=new Wu(e,t,i,s,a,r,o,l);if(this.curves.length>0){const u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);const d=c.getPoint(1);return this.currentPoint.copy(d),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class qu extends nf{constructor(e){super(e),this.uuid=ei(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let i=0,s=this.holes.length;i<s;i++)t[i]=this.holes[i].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){const s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,i=this.holes.length;t<i;t++){const s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){const s=e.holes[t];this.holes.push(new nf().fromJSON(s))}return this}}function Xy(n,e,t=2){const i=e&&e.length,s=i?e[0]*t:n.length;let a=Km(n,0,s,t,!0);const r=[];if(!a||a.next===a.prev)return r;let o,l,c;if(i&&(a=jy(n,e,a,t)),n.length>80*t){o=1/0,l=1/0;let d=-1/0,u=-1/0;for(let h=t;h<s;h+=t){const f=n[h],g=n[h+1];f<o&&(o=f),g<l&&(l=g),f>d&&(d=f),g>u&&(u=g)}c=Math.max(d-o,u-l),c=c!==0?32767/c:0}return _r(a,r,t,o,l,c,0),r}function Km(n,e,t,i,s){let a;if(s===lb(n,e,t,i)>0)for(let r=e;r<t;r+=i)a=sf(r/i|0,n[r],n[r+1],a);else for(let r=t-i;r>=e;r-=i)a=sf(r/i|0,n[r],n[r+1],a);return a&&ga(a,a.next)&&(yr(a),a=a.next),a}function xs(n,e){if(!n)return n;e||(e=n);let t=n,i;do if(i=!1,!t.steiner&&(ga(t,t.next)||St(t.prev,t,t.next)===0)){if(yr(t),t=e=t.prev,t===t.next)break;i=!0}else t=t.next;while(i||t!==e);return e}function _r(n,e,t,i,s,a,r){if(!n)return;!r&&a&&nb(n,i,s,a);let o=n;for(;n.prev!==n.next;){const l=n.prev,c=n.next;if(a?Yy(n,i,s,a):qy(n)){e.push(l.i,n.i,c.i),yr(n),n=c.next,o=c.next;continue}if(n=c,n===o){r?r===1?(n=Zy(xs(n),e),_r(n,e,t,i,s,a,2)):r===2&&Ky(n,e,t,i,s,a):_r(xs(n),e,t,i,s,a,1);break}}}function qy(n){const e=n.prev,t=n,i=n.next;if(St(e,t,i)>=0)return!1;const s=e.x,a=t.x,r=i.x,o=e.y,l=t.y,c=i.y,d=Math.min(s,a,r),u=Math.min(o,l,c),h=Math.max(s,a,r),f=Math.max(o,l,c);let g=i.next;for(;g!==e;){if(g.x>=d&&g.x<=h&&g.y>=u&&g.y<=f&&Va(s,o,a,l,r,c,g.x,g.y)&&St(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Yy(n,e,t,i){const s=n.prev,a=n,r=n.next;if(St(s,a,r)>=0)return!1;const o=s.x,l=a.x,c=r.x,d=s.y,u=a.y,h=r.y,f=Math.min(o,l,c),g=Math.min(d,u,h),_=Math.max(o,l,c),m=Math.max(d,u,h),p=Hd(f,g,e,t,i),w=Hd(_,m,e,t,i);let x=n.prevZ,y=n.nextZ;for(;x&&x.z>=p&&y&&y.z<=w;){if(x.x>=f&&x.x<=_&&x.y>=g&&x.y<=m&&x!==s&&x!==r&&Va(o,d,l,u,c,h,x.x,x.y)&&St(x.prev,x,x.next)>=0||(x=x.prevZ,y.x>=f&&y.x<=_&&y.y>=g&&y.y<=m&&y!==s&&y!==r&&Va(o,d,l,u,c,h,y.x,y.y)&&St(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;x&&x.z>=p;){if(x.x>=f&&x.x<=_&&x.y>=g&&x.y<=m&&x!==s&&x!==r&&Va(o,d,l,u,c,h,x.x,x.y)&&St(x.prev,x,x.next)>=0)return!1;x=x.prevZ}for(;y&&y.z<=w;){if(y.x>=f&&y.x<=_&&y.y>=g&&y.y<=m&&y!==s&&y!==r&&Va(o,d,l,u,c,h,y.x,y.y)&&St(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function Zy(n,e){let t=n;do{const i=t.prev,s=t.next.next;!ga(i,s)&&Jm(i,t,t.next,s)&&vr(i,s)&&vr(s,i)&&(e.push(i.i,t.i,s.i),yr(t),yr(t.next),t=n=s),t=t.next}while(t!==n);return xs(t)}function Ky(n,e,t,i,s,a){let r=n;do{let o=r.next.next;for(;o!==r.prev;){if(r.i!==o.i&&ab(r,o)){let l=Qm(r,o);r=xs(r,r.next),l=xs(l,l.next),_r(r,e,t,i,s,a,0),_r(l,e,t,i,s,a,0);return}o=o.next}r=r.next}while(r!==n)}function jy(n,e,t,i){const s=[];for(let a=0,r=e.length;a<r;a++){const o=e[a]*i,l=a<r-1?e[a+1]*i:n.length,c=Km(n,o,l,i,!1);c===c.next&&(c.steiner=!0),s.push(sb(c))}s.sort(Jy);for(let a=0;a<s.length;a++)t=Qy(s[a],t);return t}function Jy(n,e){let t=n.x-e.x;if(t===0&&(t=n.y-e.y,t===0)){const i=(n.next.y-n.y)/(n.next.x-n.x),s=(e.next.y-e.y)/(e.next.x-e.x);t=i-s}return t}function Qy(n,e){const t=eb(n,e);if(!t)return e;const i=Qm(t,n);return xs(i,i.next),xs(t,t.next)}function eb(n,e){let t=e;const i=n.x,s=n.y;let a=-1/0,r;if(ga(n,t))return t;do{if(ga(n,t.next))return t.next;if(s<=t.y&&s>=t.next.y&&t.next.y!==t.y){const u=t.x+(s-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(u<=i&&u>a&&(a=u,r=t.x<t.next.x?t:t.next,u===i))return r}t=t.next}while(t!==e);if(!r)return null;const o=r,l=r.x,c=r.y;let d=1/0;t=r;do{if(i>=t.x&&t.x>=l&&i!==t.x&&jm(s<c?i:a,s,l,c,s<c?a:i,s,t.x,t.y)){const u=Math.abs(s-t.y)/(i-t.x);vr(t,n)&&(u<d||u===d&&(t.x>r.x||t.x===r.x&&tb(r,t)))&&(r=t,d=u)}t=t.next}while(t!==o);return r}function tb(n,e){return St(n.prev,n,e.prev)<0&&St(e.next,n,n.next)<0}function nb(n,e,t,i){let s=n;do s.z===0&&(s.z=Hd(s.x,s.y,e,t,i)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==n);s.prevZ.nextZ=null,s.prevZ=null,ib(s)}function ib(n){let e,t=1;do{let i=n,s;n=null;let a=null;for(e=0;i;){e++;let r=i,o=0;for(let c=0;c<t&&(o++,r=r.nextZ,!!r);c++);let l=t;for(;o>0||l>0&&r;)o!==0&&(l===0||!r||i.z<=r.z)?(s=i,i=i.nextZ,o--):(s=r,r=r.nextZ,l--),a?a.nextZ=s:n=s,s.prevZ=a,a=s;i=r}a.nextZ=null,t*=2}while(e>1);return n}function Hd(n,e,t,i,s){return n=(n-t)*s|0,e=(e-i)*s|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,n|e<<1}function sb(n){let e=n,t=n;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==n);return t}function jm(n,e,t,i,s,a,r,o){return(s-r)*(e-o)>=(n-r)*(a-o)&&(n-r)*(i-o)>=(t-r)*(e-o)&&(t-r)*(a-o)>=(s-r)*(i-o)}function Va(n,e,t,i,s,a,r,o){return!(n===r&&e===o)&&jm(n,e,t,i,s,a,r,o)}function ab(n,e){return n.next.i!==e.i&&n.prev.i!==e.i&&!rb(n,e)&&(vr(n,e)&&vr(e,n)&&ob(n,e)&&(St(n.prev,n,e.prev)||St(n,e.prev,e))||ga(n,e)&&St(n.prev,n,n.next)>0&&St(e.prev,e,e.next)>0)}function St(n,e,t){return(e.y-n.y)*(t.x-e.x)-(e.x-n.x)*(t.y-e.y)}function ga(n,e){return n.x===e.x&&n.y===e.y}function Jm(n,e,t,i){const s=ho(St(n,e,t)),a=ho(St(n,e,i)),r=ho(St(t,i,n)),o=ho(St(t,i,e));return!!(s!==a&&r!==o||s===0&&uo(n,t,e)||a===0&&uo(n,i,e)||r===0&&uo(t,n,i)||o===0&&uo(t,e,i))}function uo(n,e,t){return e.x<=Math.max(n.x,t.x)&&e.x>=Math.min(n.x,t.x)&&e.y<=Math.max(n.y,t.y)&&e.y>=Math.min(n.y,t.y)}function ho(n){return n>0?1:n<0?-1:0}function rb(n,e){let t=n;do{if(t.i!==n.i&&t.next.i!==n.i&&t.i!==e.i&&t.next.i!==e.i&&Jm(t,t.next,n,e))return!0;t=t.next}while(t!==n);return!1}function vr(n,e){return St(n.prev,n,n.next)<0?St(n,e,n.next)>=0&&St(n,n.prev,e)>=0:St(n,e,n.prev)<0||St(n,n.next,e)<0}function ob(n,e){let t=n,i=!1;const s=(n.x+e.x)/2,a=(n.y+e.y)/2;do t.y>a!=t.next.y>a&&t.next.y!==t.y&&s<(t.next.x-t.x)*(a-t.y)/(t.next.y-t.y)+t.x&&(i=!i),t=t.next;while(t!==n);return i}function Qm(n,e){const t=Gd(n.i,n.x,n.y),i=Gd(e.i,e.x,e.y),s=n.next,a=e.prev;return n.next=e,e.prev=n,t.next=s,s.prev=t,i.next=t,t.prev=i,a.next=i,i.prev=a,i}function sf(n,e,t,i){const s=Gd(n,e,t);return i?(s.next=i.next,s.prev=i,i.next.prev=s,i.next=s):(s.prev=s,s.next=s),s}function yr(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function Gd(n,e,t){return{i:n,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function lb(n,e,t,i){let s=0;for(let a=e,r=t-i;a<t;a+=i)s+=(n[r]-n[a])*(n[a+1]+n[r+1]),r=a;return s}class cb{static triangulate(e,t,i=2){return Xy(e,t,i)}}class er{static area(e){const t=e.length;let i=0;for(let s=t-1,a=0;a<t;s=a++)i+=e[s].x*e[a].y-e[a].x*e[s].y;return i*.5}static isClockWise(e){return er.area(e)<0}static triangulateShape(e,t){const i=[],s=[],a=[];af(e),rf(i,e);let r=e.length;t.forEach(af);for(let l=0;l<t.length;l++)s.push(r),r+=t[l].length,rf(i,t[l]);const o=cb.triangulate(i,s);for(let l=0;l<o.length;l+=3)a.push(o.slice(l,l+3));return a}}function af(n){const e=n.length;e>2&&n[e-1].equals(n[0])&&n.pop()}function rf(n,e){for(let t=0;t<e.length;t++)n.push(e[t].x),n.push(e[t].y)}class an extends Tt{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const a=e/2,r=t/2,o=Math.floor(i),l=Math.floor(s),c=o+1,d=l+1,u=e/o,h=t/l,f=[],g=[],_=[],m=[];for(let p=0;p<d;p++){const w=p*h-r;for(let x=0;x<c;x++){const y=x*u-a;g.push(y,-w,0),_.push(0,0,1),m.push(x/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let w=0;w<o;w++){const x=w+c*p,y=w+c*(p+1),C=w+1+c*(p+1),M=w+1+c*p;f.push(x,y,M),f.push(y,C,M)}this.setIndex(f),this.setAttribute("position",new st(g,3)),this.setAttribute("normal",new st(_,3)),this.setAttribute("uv",new st(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new an(e.width,e.height,e.widthSegments,e.heightSegments)}}class Ts extends Tt{constructor(e=.5,t=1,i=32,s=1,a=0,r=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:s,thetaStart:a,thetaLength:r},i=Math.max(3,i),s=Math.max(1,s);const o=[],l=[],c=[],d=[];let u=e;const h=(t-e)/s,f=new L,g=new ue;for(let _=0;_<=s;_++){for(let m=0;m<=i;m++){const p=a+m/i*r;f.x=u*Math.cos(p),f.y=u*Math.sin(p),l.push(f.x,f.y,f.z),c.push(0,0,1),g.x=(f.x/t+1)/2,g.y=(f.y/t+1)/2,d.push(g.x,g.y)}u+=h}for(let _=0;_<s;_++){const m=_*(i+1);for(let p=0;p<i;p++){const w=p+m,x=w,y=w+i+1,C=w+i+2,M=w+1;o.push(x,y,M),o.push(y,C,M)}}this.setIndex(o),this.setAttribute("position",new st(l,3)),this.setAttribute("normal",new st(c,3)),this.setAttribute("uv",new st(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ts(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Rl extends Tt{constructor(e=new qu([new ue(0,.5),new ue(-.5,-.5),new ue(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};const i=[],s=[],a=[],r=[];let o=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let d=0;d<e.length;d++)c(e[d]),this.addGroup(o,l,d),o+=l,l=0;this.setIndex(i),this.setAttribute("position",new st(s,3)),this.setAttribute("normal",new st(a,3)),this.setAttribute("uv",new st(r,2));function c(d){const u=s.length/3,h=d.extractPoints(t);let f=h.shape;const g=h.holes;er.isClockWise(f)===!1&&(f=f.reverse());for(let m=0,p=g.length;m<p;m++){const w=g[m];er.isClockWise(w)===!0&&(g[m]=w.reverse())}const _=er.triangulateShape(f,g);for(let m=0,p=g.length;m<p;m++){const w=g[m];f=f.concat(w)}for(let m=0,p=f.length;m<p;m++){const w=f[m];s.push(w.x,w.y,0),a.push(0,0,1),r.push(w.x,w.y)}for(let m=0,p=_.length;m<p;m++){const w=_[m],x=w[0]+u,y=w[1]+u,C=w[2]+u;i.push(x,y,C),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes;return db(t,e)}static fromJSON(e,t){const i=[];for(let s=0,a=e.shapes.length;s<a;s++){const r=t[e.shapes[s]];i.push(r)}return new Rl(i,e.curveSegments)}}function db(n,e){if(e.shapes=[],Array.isArray(n))for(let t=0,i=n.length;t<i;t++){const s=n[t];e.shapes.push(s.uuid)}else e.shapes.push(n.uuid);return e}class _a extends Tt{constructor(e=1,t=32,i=16,s=0,a=Math.PI*2,r=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:s,phiLength:a,thetaStart:r,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(r+o,Math.PI);let c=0;const d=[],u=new L,h=new L,f=[],g=[],_=[],m=[];for(let p=0;p<=i;p++){const w=[],x=p/i;let y=0;p===0&&r===0?y=.5/t:p===i&&l===Math.PI&&(y=-.5/t);for(let C=0;C<=t;C++){const M=C/t;u.x=-e*Math.cos(s+M*a)*Math.sin(r+x*o),u.y=e*Math.cos(r+x*o),u.z=e*Math.sin(s+M*a)*Math.sin(r+x*o),g.push(u.x,u.y,u.z),h.copy(u).normalize(),_.push(h.x,h.y,h.z),m.push(M+y,1-x),w.push(c++)}d.push(w)}for(let p=0;p<i;p++)for(let w=0;w<t;w++){const x=d[p][w+1],y=d[p][w],C=d[p+1][w],M=d[p+1][w+1];(p!==0||r>0)&&f.push(x,y,M),(p!==i-1||l<Math.PI)&&f.push(y,C,M)}this.setIndex(f),this.setAttribute("position",new st(g,3)),this.setAttribute("normal",new st(_,3)),this.setAttribute("uv",new st(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new _a(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Yu extends Tt{constructor(e=1,t=.4,i=12,s=48,a=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:s,arc:a},i=Math.floor(i),s=Math.floor(s);const r=[],o=[],l=[],c=[],d=new L,u=new L,h=new L;for(let f=0;f<=i;f++)for(let g=0;g<=s;g++){const _=g/s*a,m=f/i*Math.PI*2;u.x=(e+t*Math.cos(m))*Math.cos(_),u.y=(e+t*Math.cos(m))*Math.sin(_),u.z=t*Math.sin(m),o.push(u.x,u.y,u.z),d.x=e*Math.cos(_),d.y=e*Math.sin(_),h.subVectors(u,d).normalize(),l.push(h.x,h.y,h.z),c.push(g/s),c.push(f/i)}for(let f=1;f<=i;f++)for(let g=1;g<=s;g++){const _=(s+1)*f+g-1,m=(s+1)*(f-1)+g-1,p=(s+1)*(f-1)+g,w=(s+1)*f+g;r.push(_,m,w),r.push(m,p,w)}this.setIndex(r),this.setAttribute("position",new st(o,3)),this.setAttribute("normal",new st(l,3)),this.setAttribute("uv",new st(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Yu(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class il extends xi{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new Ze(16777215),this.specular=new Ze(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ze(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Bu,this.normalScale=new ue(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Wn,this.combine=wl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class eg extends xi{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Ze(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ze(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Bu,this.normalScale=new ue(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Wn,this.combine=wl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class ub extends xi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=P0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class hb extends xi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class tg extends It{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ze(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}const yc=new yt,of=new L,lf=new L;class fb{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ue(512,512),this.mapType=ii,this.map=null,this.mapPass=null,this.matrix=new yt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Vu,this._frameExtents=new ue(1,1),this._viewportCount=1,this._viewports=[new Et(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;of.setFromMatrixPosition(e.matrixWorld),t.position.copy(of),lf.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(lf),t.updateMatrixWorld(),yc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(yc,t.coordinateSystem,t.reversedDepth),t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(yc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class ng extends Bm{constructor(e=-1,t=1,i=1,s=-1,a=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=a,this.far=r,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,a,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=a,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let a=i-e,r=i+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=c*this.view.offsetX,r=a+c*this.view.width,o-=d*this.view.offsetY,l=o-d*this.view.height}this.projectionMatrix.makeOrthographic(a,r,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class pb extends fb{constructor(){super(new ng(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class cf extends tg{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(It.DEFAULT_UP),this.updateMatrix(),this.target=new It,this.shadow=new pb}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class mb extends tg{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class gb extends Mn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class df{constructor(e=1,t=0,i=0){this.radius=e,this.phi=t,this.theta=i}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Ye(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(Ye(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const uf=new L;let fo,bc;class _b extends It{constructor(e=new L(0,0,1),t=new L(0,0,0),i=1,s=16776960,a=i*.2,r=a*.2){super(),this.type="ArrowHelper",fo===void 0&&(fo=new Tt,fo.setAttribute("position",new st([0,0,0,0,1,0],3)),bc=new gr(.5,1,5,1),bc.translate(0,-.5,0)),this.position.copy(t),this.line=new $u(fo,new Tl({color:s,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new ze(bc,new rt({color:s,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(e),this.setLength(i,a,r)}setDirection(e){if(e.y>.99999)this.quaternion.set(0,0,0,1);else if(e.y<-.99999)this.quaternion.set(1,0,0,0);else{uf.set(e.z,0,-e.x).normalize();const t=Math.acos(e.y);this.quaternion.setFromAxisAngle(uf,t)}}setLength(e,t=e*.2,i=t*.2){this.line.scale.set(1,Math.max(1e-4,e-t),1),this.line.updateMatrix(),this.cone.scale.set(i,t,i),this.cone.position.y=e,this.cone.updateMatrix()}setColor(e){this.line.material.color.set(e),this.cone.material.color.set(e)}copy(e){return super.copy(e,!1),this.line.copy(e.line),this.cone.copy(e.cone),this}dispose(){this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}}class vb extends Es{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function hf(n,e,t,i){const s=yb(i);switch(t){case Am:return n*e;case Rm:return n*e/s.components*s.byteLength;case Fu:return n*e/s.components*s.byteLength;case Pm:return n*e*2/s.components*s.byteLength;case Ou:return n*e*2/s.components*s.byteLength;case Cm:return n*e*3/s.components*s.byteLength;case zn:return n*e*4/s.components*s.byteLength;case ku:return n*e*4/s.components*s.byteLength;case Ro:case Po:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Lo:case No:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case fd:case md:return Math.max(n,16)*Math.max(e,8)/4;case hd:case pd:return Math.max(n,8)*Math.max(e,8)/2;case gd:case _d:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case vd:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case yd:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case bd:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case xd:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Sd:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case wd:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Ed:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Md:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Td:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Ad:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Cd:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Rd:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Pd:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Ld:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Nd:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Id:case Dd:case Ud:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Fd:case Od:return Math.ceil(n/4)*Math.ceil(e/4)*8;case kd:case Bd:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function yb(n){switch(n){case ii:case wm:return{byteLength:1,components:1};case dr:case Em:case Ir:return{byteLength:2,components:1};case Du:case Uu:return{byteLength:2,components:4};case ys:case Iu:case fi:return{byteLength:4,components:1};case Mm:case Tm:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Nu}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Nu);function ig(){let n=null,e=!1,t=null,i=null;function s(a,r){t(a,r),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(a){t=a},setContext:function(a){n=a}}}function bb(n){const e=new WeakMap;function t(o,l){const c=o.array,d=o.usage,u=c.byteLength,h=n.createBuffer();n.bindBuffer(l,h),n.bufferData(l,c,d),o.onUploadCallback();let f;if(c instanceof Float32Array)f=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=n.HALF_FLOAT:f=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=n.SHORT;else if(c instanceof Uint32Array)f=n.UNSIGNED_INT;else if(c instanceof Int32Array)f=n.INT;else if(c instanceof Int8Array)f=n.BYTE;else if(c instanceof Uint8Array)f=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function i(o,l,c){const d=l.array,u=l.updateRanges;if(n.bindBuffer(c,o),u.length===0)n.bufferSubData(c,0,d);else{u.sort((f,g)=>f.start-g.start);let h=0;for(let f=1;f<u.length;f++){const g=u[h],_=u[f];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++h,u[h]=_)}u.length=h+1;for(let f=0,g=u.length;f<g;f++){const _=u[f];n.bufferSubData(c,_.start*d.BYTES_PER_ELEMENT,d,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function a(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(n.deleteBuffer(l.buffer),e.delete(o))}function r(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const d=e.get(o);(!d||d.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:s,remove:a,update:r}}var xb=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Sb=`#ifdef USE_ALPHAHASH
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
#endif`,wb=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Eb=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Mb=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Tb=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Ab=`#ifdef USE_AOMAP
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
#endif`,Cb=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Rb=`#ifdef USE_BATCHING
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
#endif`,Pb=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Lb=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Nb=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Ib=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Db=`#ifdef USE_IRIDESCENCE
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
#endif`,Ub=`#ifdef USE_BUMPMAP
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
#endif`,Fb=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Ob=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,kb=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Bb=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,zb=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Hb=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Gb=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Vb=`#if defined( USE_COLOR_ALPHA )
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
#endif`,$b=`#define PI 3.141592653589793
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
} // validated`,Wb=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Xb=`vec3 transformedNormal = objectNormal;
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
#endif`,qb=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Yb=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Zb=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Kb=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,jb="gl_FragColor = linearToOutputTexel( gl_FragColor );",Jb=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Qb=`#ifdef USE_ENVMAP
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
#endif`,ex=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,tx=`#ifdef USE_ENVMAP
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
#endif`,nx=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ix=`#ifdef USE_ENVMAP
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
#endif`,sx=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ax=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,rx=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ox=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,lx=`#ifdef USE_GRADIENTMAP
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
}`,cx=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,dx=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ux=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,hx=`uniform bool receiveShadow;
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
#endif`,fx=`#ifdef USE_ENVMAP
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
#endif`,px=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,mx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,gx=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,_x=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,vx=`PhysicalMaterial material;
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
#endif`,yx=`struct PhysicalMaterial {
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
}`,bx=`
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
#endif`,xx=`#if defined( RE_IndirectDiffuse )
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
#endif`,Sx=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,wx=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ex=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Mx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Tx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Ax=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Cx=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Rx=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Px=`#if defined( USE_POINTS_UV )
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
#endif`,Lx=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Nx=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ix=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Dx=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Ux=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Fx=`#ifdef USE_MORPHTARGETS
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
#endif`,Ox=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,kx=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Bx=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,zx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Hx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Gx=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Vx=`#ifdef USE_NORMALMAP
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
#endif`,$x=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Wx=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Xx=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,qx=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Yx=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Zx=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Kx=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,jx=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Jx=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Qx=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,eS=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,tS=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,nS=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,iS=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,sS=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,aS=`float getShadowMask() {
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
}`,rS=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,oS=`#ifdef USE_SKINNING
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
#endif`,lS=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,cS=`#ifdef USE_SKINNING
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
#endif`,dS=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,uS=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,hS=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,fS=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,pS=`#ifdef USE_TRANSMISSION
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
#endif`,mS=`#ifdef USE_TRANSMISSION
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
#endif`,gS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,_S=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,vS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,yS=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const bS=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,xS=`uniform sampler2D t2D;
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
}`,SS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,wS=`#ifdef ENVMAP_TYPE_CUBE
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
}`,ES=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,MS=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,TS=`#include <common>
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
}`,AS=`#if DEPTH_PACKING == 3200
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
}`,CS=`#define DISTANCE
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
}`,RS=`#define DISTANCE
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
}`,PS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,LS=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,NS=`uniform float scale;
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
}`,IS=`uniform vec3 diffuse;
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
}`,DS=`#include <common>
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
}`,US=`uniform vec3 diffuse;
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
}`,FS=`#define LAMBERT
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
}`,OS=`#define LAMBERT
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
}`,kS=`#define MATCAP
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
}`,BS=`#define MATCAP
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
}`,zS=`#define NORMAL
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
}`,HS=`#define NORMAL
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
}`,GS=`#define PHONG
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
}`,VS=`#define PHONG
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
}`,$S=`#define STANDARD
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
}`,WS=`#define STANDARD
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
}`,XS=`#define TOON
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
}`,qS=`#define TOON
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
}`,YS=`uniform float size;
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
}`,ZS=`uniform vec3 diffuse;
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
}`,KS=`#include <common>
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
}`,jS=`uniform vec3 color;
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
}`,JS=`uniform float rotation;
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
}`,QS=`uniform vec3 diffuse;
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
}`,qe={alphahash_fragment:xb,alphahash_pars_fragment:Sb,alphamap_fragment:wb,alphamap_pars_fragment:Eb,alphatest_fragment:Mb,alphatest_pars_fragment:Tb,aomap_fragment:Ab,aomap_pars_fragment:Cb,batching_pars_vertex:Rb,batching_vertex:Pb,begin_vertex:Lb,beginnormal_vertex:Nb,bsdfs:Ib,iridescence_fragment:Db,bumpmap_pars_fragment:Ub,clipping_planes_fragment:Fb,clipping_planes_pars_fragment:Ob,clipping_planes_pars_vertex:kb,clipping_planes_vertex:Bb,color_fragment:zb,color_pars_fragment:Hb,color_pars_vertex:Gb,color_vertex:Vb,common:$b,cube_uv_reflection_fragment:Wb,defaultnormal_vertex:Xb,displacementmap_pars_vertex:qb,displacementmap_vertex:Yb,emissivemap_fragment:Zb,emissivemap_pars_fragment:Kb,colorspace_fragment:jb,colorspace_pars_fragment:Jb,envmap_fragment:Qb,envmap_common_pars_fragment:ex,envmap_pars_fragment:tx,envmap_pars_vertex:nx,envmap_physical_pars_fragment:fx,envmap_vertex:ix,fog_vertex:sx,fog_pars_vertex:ax,fog_fragment:rx,fog_pars_fragment:ox,gradientmap_pars_fragment:lx,lightmap_pars_fragment:cx,lights_lambert_fragment:dx,lights_lambert_pars_fragment:ux,lights_pars_begin:hx,lights_toon_fragment:px,lights_toon_pars_fragment:mx,lights_phong_fragment:gx,lights_phong_pars_fragment:_x,lights_physical_fragment:vx,lights_physical_pars_fragment:yx,lights_fragment_begin:bx,lights_fragment_maps:xx,lights_fragment_end:Sx,logdepthbuf_fragment:wx,logdepthbuf_pars_fragment:Ex,logdepthbuf_pars_vertex:Mx,logdepthbuf_vertex:Tx,map_fragment:Ax,map_pars_fragment:Cx,map_particle_fragment:Rx,map_particle_pars_fragment:Px,metalnessmap_fragment:Lx,metalnessmap_pars_fragment:Nx,morphinstance_vertex:Ix,morphcolor_vertex:Dx,morphnormal_vertex:Ux,morphtarget_pars_vertex:Fx,morphtarget_vertex:Ox,normal_fragment_begin:kx,normal_fragment_maps:Bx,normal_pars_fragment:zx,normal_pars_vertex:Hx,normal_vertex:Gx,normalmap_pars_fragment:Vx,clearcoat_normal_fragment_begin:$x,clearcoat_normal_fragment_maps:Wx,clearcoat_pars_fragment:Xx,iridescence_pars_fragment:qx,opaque_fragment:Yx,packing:Zx,premultiplied_alpha_fragment:Kx,project_vertex:jx,dithering_fragment:Jx,dithering_pars_fragment:Qx,roughnessmap_fragment:eS,roughnessmap_pars_fragment:tS,shadowmap_pars_fragment:nS,shadowmap_pars_vertex:iS,shadowmap_vertex:sS,shadowmask_pars_fragment:aS,skinbase_vertex:rS,skinning_pars_vertex:oS,skinning_vertex:lS,skinnormal_vertex:cS,specularmap_fragment:dS,specularmap_pars_fragment:uS,tonemapping_fragment:hS,tonemapping_pars_fragment:fS,transmission_fragment:pS,transmission_pars_fragment:mS,uv_pars_fragment:gS,uv_pars_vertex:_S,uv_vertex:vS,worldpos_vertex:yS,background_vert:bS,background_frag:xS,backgroundCube_vert:SS,backgroundCube_frag:wS,cube_vert:ES,cube_frag:MS,depth_vert:TS,depth_frag:AS,distanceRGBA_vert:CS,distanceRGBA_frag:RS,equirect_vert:PS,equirect_frag:LS,linedashed_vert:NS,linedashed_frag:IS,meshbasic_vert:DS,meshbasic_frag:US,meshlambert_vert:FS,meshlambert_frag:OS,meshmatcap_vert:kS,meshmatcap_frag:BS,meshnormal_vert:zS,meshnormal_frag:HS,meshphong_vert:GS,meshphong_frag:VS,meshphysical_vert:$S,meshphysical_frag:WS,meshtoon_vert:XS,meshtoon_frag:qS,points_vert:YS,points_frag:ZS,shadow_vert:KS,shadow_frag:jS,sprite_vert:JS,sprite_frag:QS},fe={common:{diffuse:{value:new Ze(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new We}},envmap:{envMap:{value:null},envMapRotation:{value:new We},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new We}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new We}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new We},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new We},normalScale:{value:new ue(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new We},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new We}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new We}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new We}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ze(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ze(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0},uvTransform:{value:new We}},sprite:{diffuse:{value:new Ze(16777215)},opacity:{value:1},center:{value:new ue(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}}},Yn={basic:{uniforms:Zt([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.fog]),vertexShader:qe.meshbasic_vert,fragmentShader:qe.meshbasic_frag},lambert:{uniforms:Zt([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,fe.lights,{emissive:{value:new Ze(0)}}]),vertexShader:qe.meshlambert_vert,fragmentShader:qe.meshlambert_frag},phong:{uniforms:Zt([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,fe.lights,{emissive:{value:new Ze(0)},specular:{value:new Ze(1118481)},shininess:{value:30}}]),vertexShader:qe.meshphong_vert,fragmentShader:qe.meshphong_frag},standard:{uniforms:Zt([fe.common,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.roughnessmap,fe.metalnessmap,fe.fog,fe.lights,{emissive:{value:new Ze(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:qe.meshphysical_vert,fragmentShader:qe.meshphysical_frag},toon:{uniforms:Zt([fe.common,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.gradientmap,fe.fog,fe.lights,{emissive:{value:new Ze(0)}}]),vertexShader:qe.meshtoon_vert,fragmentShader:qe.meshtoon_frag},matcap:{uniforms:Zt([fe.common,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,{matcap:{value:null}}]),vertexShader:qe.meshmatcap_vert,fragmentShader:qe.meshmatcap_frag},points:{uniforms:Zt([fe.points,fe.fog]),vertexShader:qe.points_vert,fragmentShader:qe.points_frag},dashed:{uniforms:Zt([fe.common,fe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:qe.linedashed_vert,fragmentShader:qe.linedashed_frag},depth:{uniforms:Zt([fe.common,fe.displacementmap]),vertexShader:qe.depth_vert,fragmentShader:qe.depth_frag},normal:{uniforms:Zt([fe.common,fe.bumpmap,fe.normalmap,fe.displacementmap,{opacity:{value:1}}]),vertexShader:qe.meshnormal_vert,fragmentShader:qe.meshnormal_frag},sprite:{uniforms:Zt([fe.sprite,fe.fog]),vertexShader:qe.sprite_vert,fragmentShader:qe.sprite_frag},background:{uniforms:{uvTransform:{value:new We},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:qe.background_vert,fragmentShader:qe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new We}},vertexShader:qe.backgroundCube_vert,fragmentShader:qe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:qe.cube_vert,fragmentShader:qe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:qe.equirect_vert,fragmentShader:qe.equirect_frag},distanceRGBA:{uniforms:Zt([fe.common,fe.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:qe.distanceRGBA_vert,fragmentShader:qe.distanceRGBA_frag},shadow:{uniforms:Zt([fe.lights,fe.fog,{color:{value:new Ze(0)},opacity:{value:1}}]),vertexShader:qe.shadow_vert,fragmentShader:qe.shadow_frag}};Yn.physical={uniforms:Zt([Yn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new We},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new We},clearcoatNormalScale:{value:new ue(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new We},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new We},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new We},sheen:{value:0},sheenColor:{value:new Ze(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new We},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new We},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new We},transmissionSamplerSize:{value:new ue},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new We},attenuationDistance:{value:0},attenuationColor:{value:new Ze(0)},specularColor:{value:new Ze(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new We},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new We},anisotropyVector:{value:new ue},anisotropyMap:{value:null},anisotropyMapTransform:{value:new We}}]),vertexShader:qe.meshphysical_vert,fragmentShader:qe.meshphysical_frag};const po={r:0,b:0,g:0},ts=new Wn,ew=new yt;function tw(n,e,t,i,s,a,r){const o=new Ze(0);let l=a===!0?0:1,c,d,u=null,h=0,f=null;function g(x){let y=x.isScene===!0?x.background:null;return y&&y.isTexture&&(y=(x.backgroundBlurriness>0?t:e).get(y)),y}function _(x){let y=!1;const C=g(x);C===null?p(o,l):C&&C.isColor&&(p(C,1),y=!0);const M=n.xr.getEnvironmentBlendMode();M==="additive"?i.buffers.color.setClear(0,0,0,1,r):M==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,r),(n.autoClear||y)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(x,y){const C=g(y);C&&(C.isCubeTexture||C.mapping===El)?(d===void 0&&(d=new ze(new Ms(1,1,1),new Vi({name:"BackgroundCubeMaterial",uniforms:ma(Yn.backgroundCube.uniforms),vertexShader:Yn.backgroundCube.vertexShader,fragmentShader:Yn.backgroundCube.fragmentShader,side:ln,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(M,T,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(d)),ts.copy(y.backgroundRotation),ts.x*=-1,ts.y*=-1,ts.z*=-1,C.isCubeTexture&&C.isRenderTargetTexture===!1&&(ts.y*=-1,ts.z*=-1),d.material.uniforms.envMap.value=C,d.material.uniforms.flipEnvMap.value=C.isCubeTexture&&C.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(ew.makeRotationFromEuler(ts)),d.material.toneMapped=nt.getTransfer(C.colorSpace)!==dt,(u!==C||h!==C.version||f!==n.toneMapping)&&(d.material.needsUpdate=!0,u=C,h=C.version,f=n.toneMapping),d.layers.enableAll(),x.unshift(d,d.geometry,d.material,0,0,null)):C&&C.isTexture&&(c===void 0&&(c=new ze(new an(2,2),new Vi({name:"BackgroundMaterial",uniforms:ma(Yn.background.uniforms),vertexShader:Yn.background.vertexShader,fragmentShader:Yn.background.fragmentShader,side:Hi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=C,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.toneMapped=nt.getTransfer(C.colorSpace)!==dt,C.matrixAutoUpdate===!0&&C.updateMatrix(),c.material.uniforms.uvTransform.value.copy(C.matrix),(u!==C||h!==C.version||f!==n.toneMapping)&&(c.material.needsUpdate=!0,u=C,h=C.version,f=n.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null))}function p(x,y){x.getRGB(po,km(n)),i.buffers.color.setClear(po.r,po.g,po.b,y,r)}function w(){d!==void 0&&(d.geometry.dispose(),d.material.dispose(),d=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(x,y=1){o.set(x),l=y,p(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(x){l=x,p(o,l)},render:_,addToRenderList:m,dispose:w}}function nw(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=h(null);let a=s,r=!1;function o(b,R,I,O,B){let G=!1;const k=u(O,I,R);a!==k&&(a=k,c(a.object)),G=f(b,O,I,B),G&&g(b,O,I,B),B!==null&&e.update(B,n.ELEMENT_ARRAY_BUFFER),(G||r)&&(r=!1,y(b,R,I,O),B!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(B).buffer))}function l(){return n.createVertexArray()}function c(b){return n.bindVertexArray(b)}function d(b){return n.deleteVertexArray(b)}function u(b,R,I){const O=I.wireframe===!0;let B=i[b.id];B===void 0&&(B={},i[b.id]=B);let G=B[R.id];G===void 0&&(G={},B[R.id]=G);let k=G[O];return k===void 0&&(k=h(l()),G[O]=k),k}function h(b){const R=[],I=[],O=[];for(let B=0;B<t;B++)R[B]=0,I[B]=0,O[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:I,attributeDivisors:O,object:b,attributes:{},index:null}}function f(b,R,I,O){const B=a.attributes,G=R.attributes;let k=0;const Y=I.getAttributes();for(const H in Y)if(Y[H].location>=0){const q=B[H];let Q=G[H];if(Q===void 0&&(H==="instanceMatrix"&&b.instanceMatrix&&(Q=b.instanceMatrix),H==="instanceColor"&&b.instanceColor&&(Q=b.instanceColor)),q===void 0||q.attribute!==Q||Q&&q.data!==Q.data)return!0;k++}return a.attributesNum!==k||a.index!==O}function g(b,R,I,O){const B={},G=R.attributes;let k=0;const Y=I.getAttributes();for(const H in Y)if(Y[H].location>=0){let q=G[H];q===void 0&&(H==="instanceMatrix"&&b.instanceMatrix&&(q=b.instanceMatrix),H==="instanceColor"&&b.instanceColor&&(q=b.instanceColor));const Q={};Q.attribute=q,q&&q.data&&(Q.data=q.data),B[H]=Q,k++}a.attributes=B,a.attributesNum=k,a.index=O}function _(){const b=a.newAttributes;for(let R=0,I=b.length;R<I;R++)b[R]=0}function m(b){p(b,0)}function p(b,R){const I=a.newAttributes,O=a.enabledAttributes,B=a.attributeDivisors;I[b]=1,O[b]===0&&(n.enableVertexAttribArray(b),O[b]=1),B[b]!==R&&(n.vertexAttribDivisor(b,R),B[b]=R)}function w(){const b=a.newAttributes,R=a.enabledAttributes;for(let I=0,O=R.length;I<O;I++)R[I]!==b[I]&&(n.disableVertexAttribArray(I),R[I]=0)}function x(b,R,I,O,B,G,k){k===!0?n.vertexAttribIPointer(b,R,I,B,G):n.vertexAttribPointer(b,R,I,O,B,G)}function y(b,R,I,O){_();const B=O.attributes,G=I.getAttributes(),k=R.defaultAttributeValues;for(const Y in G){const H=G[Y];if(H.location>=0){let ie=B[Y];if(ie===void 0&&(Y==="instanceMatrix"&&b.instanceMatrix&&(ie=b.instanceMatrix),Y==="instanceColor"&&b.instanceColor&&(ie=b.instanceColor)),ie!==void 0){const q=ie.normalized,Q=ie.itemSize,_e=e.get(ie);if(_e===void 0)continue;const ye=_e.buffer,Pe=_e.type,te=_e.bytesPerElement,V=Pe===n.INT||Pe===n.UNSIGNED_INT||ie.gpuType===Iu;if(ie.isInterleavedBufferAttribute){const Z=ie.data,ce=Z.stride,Le=ie.offset;if(Z.isInstancedInterleavedBuffer){for(let ve=0;ve<H.locationSize;ve++)p(H.location+ve,Z.meshPerAttribute);b.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=Z.meshPerAttribute*Z.count)}else for(let ve=0;ve<H.locationSize;ve++)m(H.location+ve);n.bindBuffer(n.ARRAY_BUFFER,ye);for(let ve=0;ve<H.locationSize;ve++)x(H.location+ve,Q/H.locationSize,Pe,q,ce*te,(Le+Q/H.locationSize*ve)*te,V)}else{if(ie.isInstancedBufferAttribute){for(let Z=0;Z<H.locationSize;Z++)p(H.location+Z,ie.meshPerAttribute);b.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let Z=0;Z<H.locationSize;Z++)m(H.location+Z);n.bindBuffer(n.ARRAY_BUFFER,ye);for(let Z=0;Z<H.locationSize;Z++)x(H.location+Z,Q/H.locationSize,Pe,q,Q*te,Q/H.locationSize*Z*te,V)}}else if(k!==void 0){const q=k[Y];if(q!==void 0)switch(q.length){case 2:n.vertexAttrib2fv(H.location,q);break;case 3:n.vertexAttrib3fv(H.location,q);break;case 4:n.vertexAttrib4fv(H.location,q);break;default:n.vertexAttrib1fv(H.location,q)}}}}w()}function C(){A();for(const b in i){const R=i[b];for(const I in R){const O=R[I];for(const B in O)d(O[B].object),delete O[B];delete R[I]}delete i[b]}}function M(b){if(i[b.id]===void 0)return;const R=i[b.id];for(const I in R){const O=R[I];for(const B in O)d(O[B].object),delete O[B];delete R[I]}delete i[b.id]}function T(b){for(const R in i){const I=i[R];if(I[b.id]===void 0)continue;const O=I[b.id];for(const B in O)d(O[B].object),delete O[B];delete I[b.id]}}function A(){v(),r=!0,a!==s&&(a=s,c(a.object))}function v(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:A,resetDefaultState:v,dispose:C,releaseStatesOfGeometry:M,releaseStatesOfProgram:T,initAttributes:_,enableAttribute:m,disableUnusedAttributes:w}}function iw(n,e,t){let i;function s(c){i=c}function a(c,d){n.drawArrays(i,c,d),t.update(d,i,1)}function r(c,d,u){u!==0&&(n.drawArraysInstanced(i,c,d,u),t.update(d,i,u))}function o(c,d,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,d,0,u);let f=0;for(let g=0;g<u;g++)f+=d[g];t.update(f,i,1)}function l(c,d,u,h){if(u===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<c.length;g++)r(c[g],d[g],h[g]);else{f.multiDrawArraysInstancedWEBGL(i,c,0,d,0,h,0,u);let g=0;for(let _=0;_<u;_++)g+=d[_]*h[_];t.update(g,i,1)}}this.setMode=s,this.render=a,this.renderInstances=r,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function sw(n,e,t,i){let s;function a(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const T=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function r(T){return!(T!==zn&&i.convert(T)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(T){const A=T===Ir&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(T!==ii&&i.convert(T)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==fi&&!A)}function l(T){if(T==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const d=l(c);d!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",d,"instead."),c=d);const u=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),w=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),x=n.getParameter(n.MAX_VARYING_VECTORS),y=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),C=g>0,M=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:l,textureFormatReadable:r,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:h,maxTextures:f,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:w,maxVaryings:x,maxFragmentUniforms:y,vertexTextures:C,maxSamples:M}}function aw(n){const e=this;let t=null,i=0,s=!1,a=!1;const r=new Li,o=new We,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,h){const f=u.length!==0||h||i!==0||s;return s=h,i=u.length,f},this.beginShadows=function(){a=!0,d(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(u,h){t=d(u,h,0)},this.setState=function(u,h,f){const g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,p=n.get(u);if(!s||g===null||g.length===0||a&&!m)a?d(null):c();else{const w=a?0:i,x=w*4;let y=p.clippingState||null;l.value=y,y=d(g,h,x,f);for(let C=0;C!==x;++C)y[C]=t[C];p.clippingState=y,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=w}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function d(u,h,f,g){const _=u!==null?u.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const p=f+_*4,w=h.matrixWorldInverse;o.getNormalMatrix(w),(m===null||m.length<p)&&(m=new Float32Array(p));for(let x=0,y=f;x!==_;++x,y+=4)r.copy(u[x]).applyMatrix4(w,o),r.normal.toArray(m,y),m[y+3]=r.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function rw(n){let e=new WeakMap;function t(r,o){return o===ld?r.mapping=ha:o===cd&&(r.mapping=fa),r}function i(r){if(r&&r.isTexture){const o=r.mapping;if(o===ld||o===cd)if(e.has(r)){const l=e.get(r).texture;return t(l,r.mapping)}else{const l=r.image;if(l&&l.height>0){const c=new Ty(l.height);return c.fromEquirectangularTexture(n,r),e.set(r,c),r.addEventListener("dispose",s),t(c.texture,r.mapping)}else return null}}return r}function s(r){const o=r.target;o.removeEventListener("dispose",s);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function a(){e=new WeakMap}return{get:i,dispose:a}}const Js=4,ff=[.125,.215,.35,.446,.526,.582],ds=20,xc=new ng,pf=new Ze;let Sc=null,wc=0,Ec=0,Mc=!1;const os=(1+Math.sqrt(5))/2,Xs=1/os,mf=[new L(-os,Xs,0),new L(os,Xs,0),new L(-Xs,0,os),new L(Xs,0,os),new L(0,os,-Xs),new L(0,os,Xs),new L(-1,1,-1),new L(1,1,-1),new L(-1,1,1),new L(1,1,1)],ow=new L;class gf{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,s=100,a={}){const{size:r=256,position:o=ow}=a;Sc=this._renderer.getRenderTarget(),wc=this._renderer.getActiveCubeFace(),Ec=this._renderer.getActiveMipmapLevel(),Mc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(r);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,s,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=yf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=vf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Sc,wc,Ec),this._renderer.xr.enabled=Mc,e.scissorTest=!1,mo(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ha||e.mapping===fa?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Sc=this._renderer.getRenderTarget(),wc=this._renderer.getActiveCubeFace(),Ec=this._renderer.getActiveMipmapLevel(),Mc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Jn,minFilter:Jn,generateMipmaps:!1,type:Ir,format:zn,colorSpace:pa,depthBuffer:!1},s=_f(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=_f(e,t,i);const{_lodMax:a}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=lw(a)),this._blurMaterial=cw(a,e,t)}return s}_compileMaterial(e){const t=new ze(this._lodPlanes[0],e);this._renderer.compile(t,xc)}_sceneToCubeUV(e,t,i,s,a){const l=new Mn(90,1,t,i),c=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,f=u.toneMapping;u.getClearColor(pf),u.toneMapping=Oi,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null));const _=new rt({name:"PMREM.Background",side:ln,depthWrite:!1,depthTest:!1}),m=new ze(new Ms,_);let p=!1;const w=e.background;w?w.isColor&&(_.color.copy(w),e.background=null,p=!0):(_.color.copy(pf),p=!0);for(let x=0;x<6;x++){const y=x%3;y===0?(l.up.set(0,c[x],0),l.position.set(a.x,a.y,a.z),l.lookAt(a.x+d[x],a.y,a.z)):y===1?(l.up.set(0,0,c[x]),l.position.set(a.x,a.y,a.z),l.lookAt(a.x,a.y+d[x],a.z)):(l.up.set(0,c[x],0),l.position.set(a.x,a.y,a.z),l.lookAt(a.x,a.y,a.z+d[x]));const C=this._cubeSize;mo(s,y*C,x>2?C:0,C,C),u.setRenderTarget(s),p&&u.render(m,l),u.render(e,l)}m.geometry.dispose(),m.material.dispose(),u.toneMapping=f,u.autoClear=h,e.background=w}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===ha||e.mapping===fa;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=yf()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=vf());const a=s?this._cubemapMaterial:this._equirectMaterial,r=new ze(this._lodPlanes[0],a),o=a.uniforms;o.envMap.value=e;const l=this._cubeSize;mo(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(r,xc)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let a=1;a<s;a++){const r=Math.sqrt(this._sigmas[a]*this._sigmas[a]-this._sigmas[a-1]*this._sigmas[a-1]),o=mf[(s-a-1)%mf.length];this._blur(e,a-1,a,r,o)}t.autoClear=i}_blur(e,t,i,s,a){const r=this._pingPongRenderTarget;this._halfBlur(e,r,t,i,s,"latitudinal",a),this._halfBlur(r,e,i,i,s,"longitudinal",a)}_halfBlur(e,t,i,s,a,r,o){const l=this._renderer,c=this._blurMaterial;r!=="latitudinal"&&r!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const d=3,u=new ze(this._lodPlanes[s],c),h=c.uniforms,f=this._sizeLods[i]-1,g=isFinite(a)?Math.PI/(2*f):2*Math.PI/(2*ds-1),_=a/g,m=isFinite(a)?1+Math.floor(d*_):ds;m>ds&&console.warn(`sigmaRadians, ${a}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ds}`);const p=[];let w=0;for(let T=0;T<ds;++T){const A=T/_,v=Math.exp(-A*A/2);p.push(v),T===0?w+=v:T<m&&(w+=2*v)}for(let T=0;T<p.length;T++)p[T]=p[T]/w;h.envMap.value=e.texture,h.samples.value=m,h.weights.value=p,h.latitudinal.value=r==="latitudinal",o&&(h.poleAxis.value=o);const{_lodMax:x}=this;h.dTheta.value=g,h.mipInt.value=x-i;const y=this._sizeLods[s],C=3*y*(s>x-Js?s-x+Js:0),M=4*(this._cubeSize-y);mo(t,C,M,3*y,2*y),l.setRenderTarget(t),l.render(u,xc)}}function lw(n){const e=[],t=[],i=[];let s=n;const a=n-Js+1+ff.length;for(let r=0;r<a;r++){const o=Math.pow(2,s);t.push(o);let l=1/o;r>n-Js?l=ff[r-n+Js-1]:r===0&&(l=0),i.push(l);const c=1/(o-2),d=-c,u=1+c,h=[d,d,u,d,u,u,d,d,u,u,d,u],f=6,g=6,_=3,m=2,p=1,w=new Float32Array(_*g*f),x=new Float32Array(m*g*f),y=new Float32Array(p*g*f);for(let M=0;M<f;M++){const T=M%3*2/3-1,A=M>2?0:-1,v=[T,A,0,T+2/3,A,0,T+2/3,A+1,0,T,A,0,T+2/3,A+1,0,T,A+1,0];w.set(v,_*g*M),x.set(h,m*g*M);const b=[M,M,M,M,M,M];y.set(b,p*g*M)}const C=new Tt;C.setAttribute("position",new Vn(w,_)),C.setAttribute("uv",new Vn(x,m)),C.setAttribute("faceIndex",new Vn(y,p)),e.push(C),s>Js&&s--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function _f(n,e,t){const i=new bs(n,e,t);return i.texture.mapping=El,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function mo(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function cw(n,e,t){const i=new Float32Array(ds),s=new L(0,1,0);return new Vi({name:"SphericalGaussianBlur",defines:{n:ds,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Zu(),fragmentShader:`

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
		`,blending:Ui,depthTest:!1,depthWrite:!1})}function vf(){return new Vi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Zu(),fragmentShader:`

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
		`,blending:Ui,depthTest:!1,depthWrite:!1})}function yf(){return new Vi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Zu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ui,depthTest:!1,depthWrite:!1})}function Zu(){return`

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
	`}function dw(n){let e=new WeakMap,t=null;function i(o){if(o&&o.isTexture){const l=o.mapping,c=l===ld||l===cd,d=l===ha||l===fa;if(c||d){let u=e.get(o);const h=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==h)return t===null&&(t=new gf(n)),u=c?t.fromEquirectangular(o,u):t.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),u.texture;if(u!==void 0)return u.texture;{const f=o.image;return c&&f&&f.height>0||d&&f&&s(f)?(t===null&&(t=new gf(n)),u=c?t.fromEquirectangular(o):t.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),o.addEventListener("dispose",a),u.texture):null}}}return o}function s(o){let l=0;const c=6;for(let d=0;d<c;d++)o[d]!==void 0&&l++;return l===c}function a(o){const l=o.target;l.removeEventListener("dispose",a);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function r(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:r}}function uw(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const s=t(i);return s===null&&mr("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function hw(n,e,t,i){const s={},a=new WeakMap;function r(u){const h=u.target;h.index!==null&&e.remove(h.index);for(const g in h.attributes)e.remove(h.attributes[g]);h.removeEventListener("dispose",r),delete s[h.id];const f=a.get(h);f&&(e.remove(f),a.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function o(u,h){return s[h.id]===!0||(h.addEventListener("dispose",r),s[h.id]=!0,t.memory.geometries++),h}function l(u){const h=u.attributes;for(const f in h)e.update(h[f],n.ARRAY_BUFFER)}function c(u){const h=[],f=u.index,g=u.attributes.position;let _=0;if(f!==null){const w=f.array;_=f.version;for(let x=0,y=w.length;x<y;x+=3){const C=w[x+0],M=w[x+1],T=w[x+2];h.push(C,M,M,T,T,C)}}else if(g!==void 0){const w=g.array;_=g.version;for(let x=0,y=w.length/3-1;x<y;x+=3){const C=x+0,M=x+1,T=x+2;h.push(C,M,M,T,T,C)}}else return;const m=new(Nm(h)?Om:Fm)(h,1);m.version=_;const p=a.get(u);p&&e.remove(p),a.set(u,m)}function d(u){const h=a.get(u);if(h){const f=u.index;f!==null&&h.version<f.version&&c(u)}else c(u);return a.get(u)}return{get:o,update:l,getWireframeAttribute:d}}function fw(n,e,t){let i;function s(h){i=h}let a,r;function o(h){a=h.type,r=h.bytesPerElement}function l(h,f){n.drawElements(i,f,a,h*r),t.update(f,i,1)}function c(h,f,g){g!==0&&(n.drawElementsInstanced(i,f,a,h*r,g),t.update(f,i,g))}function d(h,f,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,a,h,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];t.update(m,i,1)}function u(h,f,g,_){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<h.length;p++)c(h[p]/r,f[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(i,f,0,a,h,0,_,0,g);let p=0;for(let w=0;w<g;w++)p+=f[w]*_[w];t.update(p,i,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=d,this.renderMultiDrawInstances=u}function pw(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(a,r,o){switch(t.calls++,r){case n.TRIANGLES:t.triangles+=o*(a/3);break;case n.LINES:t.lines+=o*(a/2);break;case n.LINE_STRIP:t.lines+=o*(a-1);break;case n.LINE_LOOP:t.lines+=o*a;break;case n.POINTS:t.points+=o*a;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",r);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function mw(n,e,t){const i=new WeakMap,s=new Et;function a(r,o,l){const c=r.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=d!==void 0?d.length:0;let h=i.get(o);if(h===void 0||h.count!==u){let v=function(){T.dispose(),i.delete(o),o.removeEventListener("dispose",v)};h!==void 0&&h.texture.dispose();const f=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],w=o.morphAttributes.color||[];let x=0;f===!0&&(x=1),g===!0&&(x=2),_===!0&&(x=3);let y=o.attributes.position.count*x,C=1;y>e.maxTextureSize&&(C=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);const M=new Float32Array(y*C*4*u),T=new Im(M,y,C,u);T.type=fi,T.needsUpdate=!0;const A=x*4;for(let b=0;b<u;b++){const R=m[b],I=p[b],O=w[b],B=y*C*4*b;for(let G=0;G<R.count;G++){const k=G*A;f===!0&&(s.fromBufferAttribute(R,G),M[B+k+0]=s.x,M[B+k+1]=s.y,M[B+k+2]=s.z,M[B+k+3]=0),g===!0&&(s.fromBufferAttribute(I,G),M[B+k+4]=s.x,M[B+k+5]=s.y,M[B+k+6]=s.z,M[B+k+7]=0),_===!0&&(s.fromBufferAttribute(O,G),M[B+k+8]=s.x,M[B+k+9]=s.y,M[B+k+10]=s.z,M[B+k+11]=O.itemSize===4?s.w:1)}}h={count:u,texture:T,size:new ue(y,C)},i.set(o,h),o.addEventListener("dispose",v)}if(r.isInstancedMesh===!0&&r.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",r.morphTexture,t);else{let f=0;for(let _=0;_<c.length;_++)f+=c[_];const g=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(n,"morphTargetBaseInfluence",g),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:a}}function gw(n,e,t,i){let s=new WeakMap;function a(l){const c=i.render.frame,d=l.geometry,u=e.get(l,d);if(s.get(u)!==c&&(e.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const h=l.skeleton;s.get(h)!==c&&(h.update(),s.set(h,c))}return u}function r(){s=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:a,dispose:r}}const sg=new Kt,bf=new $m(1,1),ag=new Im,rg=new cy,og=new zm,xf=[],Sf=[],wf=new Float32Array(16),Ef=new Float32Array(9),Mf=new Float32Array(4);function Ea(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let a=xf[s];if(a===void 0&&(a=new Float32Array(s),xf[s]=a),e!==0){i.toArray(a,0);for(let r=1,o=0;r!==e;++r)o+=t,n[r].toArray(a,o)}return a}function Dt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Ut(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Pl(n,e){let t=Sf[e];t===void 0&&(t=new Int32Array(e),Sf[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function _w(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function vw(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Dt(t,e))return;n.uniform2fv(this.addr,e),Ut(t,e)}}function yw(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Dt(t,e))return;n.uniform3fv(this.addr,e),Ut(t,e)}}function bw(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Dt(t,e))return;n.uniform4fv(this.addr,e),Ut(t,e)}}function xw(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Dt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Ut(t,e)}else{if(Dt(t,i))return;Mf.set(i),n.uniformMatrix2fv(this.addr,!1,Mf),Ut(t,i)}}function Sw(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Dt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Ut(t,e)}else{if(Dt(t,i))return;Ef.set(i),n.uniformMatrix3fv(this.addr,!1,Ef),Ut(t,i)}}function ww(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Dt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Ut(t,e)}else{if(Dt(t,i))return;wf.set(i),n.uniformMatrix4fv(this.addr,!1,wf),Ut(t,i)}}function Ew(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function Mw(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Dt(t,e))return;n.uniform2iv(this.addr,e),Ut(t,e)}}function Tw(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Dt(t,e))return;n.uniform3iv(this.addr,e),Ut(t,e)}}function Aw(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Dt(t,e))return;n.uniform4iv(this.addr,e),Ut(t,e)}}function Cw(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function Rw(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Dt(t,e))return;n.uniform2uiv(this.addr,e),Ut(t,e)}}function Pw(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Dt(t,e))return;n.uniform3uiv(this.addr,e),Ut(t,e)}}function Lw(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Dt(t,e))return;n.uniform4uiv(this.addr,e),Ut(t,e)}}function Nw(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let a;this.type===n.SAMPLER_2D_SHADOW?(bf.compareFunction=Lm,a=bf):a=sg,t.setTexture2D(e||a,s)}function Iw(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||rg,s)}function Dw(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||og,s)}function Uw(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||ag,s)}function Fw(n){switch(n){case 5126:return _w;case 35664:return vw;case 35665:return yw;case 35666:return bw;case 35674:return xw;case 35675:return Sw;case 35676:return ww;case 5124:case 35670:return Ew;case 35667:case 35671:return Mw;case 35668:case 35672:return Tw;case 35669:case 35673:return Aw;case 5125:return Cw;case 36294:return Rw;case 36295:return Pw;case 36296:return Lw;case 35678:case 36198:case 36298:case 36306:case 35682:return Nw;case 35679:case 36299:case 36307:return Iw;case 35680:case 36300:case 36308:case 36293:return Dw;case 36289:case 36303:case 36311:case 36292:return Uw}}function Ow(n,e){n.uniform1fv(this.addr,e)}function kw(n,e){const t=Ea(e,this.size,2);n.uniform2fv(this.addr,t)}function Bw(n,e){const t=Ea(e,this.size,3);n.uniform3fv(this.addr,t)}function zw(n,e){const t=Ea(e,this.size,4);n.uniform4fv(this.addr,t)}function Hw(n,e){const t=Ea(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function Gw(n,e){const t=Ea(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function Vw(n,e){const t=Ea(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function $w(n,e){n.uniform1iv(this.addr,e)}function Ww(n,e){n.uniform2iv(this.addr,e)}function Xw(n,e){n.uniform3iv(this.addr,e)}function qw(n,e){n.uniform4iv(this.addr,e)}function Yw(n,e){n.uniform1uiv(this.addr,e)}function Zw(n,e){n.uniform2uiv(this.addr,e)}function Kw(n,e){n.uniform3uiv(this.addr,e)}function jw(n,e){n.uniform4uiv(this.addr,e)}function Jw(n,e,t){const i=this.cache,s=e.length,a=Pl(t,s);Dt(i,a)||(n.uniform1iv(this.addr,a),Ut(i,a));for(let r=0;r!==s;++r)t.setTexture2D(e[r]||sg,a[r])}function Qw(n,e,t){const i=this.cache,s=e.length,a=Pl(t,s);Dt(i,a)||(n.uniform1iv(this.addr,a),Ut(i,a));for(let r=0;r!==s;++r)t.setTexture3D(e[r]||rg,a[r])}function eE(n,e,t){const i=this.cache,s=e.length,a=Pl(t,s);Dt(i,a)||(n.uniform1iv(this.addr,a),Ut(i,a));for(let r=0;r!==s;++r)t.setTextureCube(e[r]||og,a[r])}function tE(n,e,t){const i=this.cache,s=e.length,a=Pl(t,s);Dt(i,a)||(n.uniform1iv(this.addr,a),Ut(i,a));for(let r=0;r!==s;++r)t.setTexture2DArray(e[r]||ag,a[r])}function nE(n){switch(n){case 5126:return Ow;case 35664:return kw;case 35665:return Bw;case 35666:return zw;case 35674:return Hw;case 35675:return Gw;case 35676:return Vw;case 5124:case 35670:return $w;case 35667:case 35671:return Ww;case 35668:case 35672:return Xw;case 35669:case 35673:return qw;case 5125:return Yw;case 36294:return Zw;case 36295:return Kw;case 36296:return jw;case 35678:case 36198:case 36298:case 36306:case 35682:return Jw;case 35679:case 36299:case 36307:return Qw;case 35680:case 36300:case 36308:case 36293:return eE;case 36289:case 36303:case 36311:case 36292:return tE}}class iE{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Fw(t.type)}}class sE{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=nE(t.type)}}class aE{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let a=0,r=s.length;a!==r;++a){const o=s[a];o.setValue(e,t[o.id],i)}}}const Tc=/(\w+)(\])?(\[|\.)?/g;function Tf(n,e){n.seq.push(e),n.map[e.id]=e}function rE(n,e,t){const i=n.name,s=i.length;for(Tc.lastIndex=0;;){const a=Tc.exec(i),r=Tc.lastIndex;let o=a[1];const l=a[2]==="]",c=a[3];if(l&&(o=o|0),c===void 0||c==="["&&r+2===s){Tf(t,c===void 0?new iE(o,n,e):new sE(o,n,e));break}else{let u=t.map[o];u===void 0&&(u=new aE(o),Tf(t,u)),t=u}}}class Io{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const a=e.getActiveUniform(t,s),r=e.getUniformLocation(t,a.name);rE(a,r,this)}}setValue(e,t,i,s){const a=this.map[t];a!==void 0&&a.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let a=0,r=t.length;a!==r;++a){const o=t[a],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,a=e.length;s!==a;++s){const r=e[s];r.id in t&&i.push(r)}return i}}function Af(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const oE=37297;let lE=0;function cE(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),a=Math.min(e+6,t.length);for(let r=s;r<a;r++){const o=r+1;i.push(`${o===e?">":" "} ${o}: ${t[r]}`)}return i.join(`
`)}const Cf=new We;function dE(n){nt._getMatrix(Cf,nt.workingColorSpace,n);const e=`mat3( ${Cf.elements.map(t=>t.toFixed(4))} )`;switch(nt.getTransfer(n)){case jo:return[e,"LinearTransferOETF"];case dt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Rf(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),a=(n.getShaderInfoLog(e)||"").trim();if(i&&a==="")return"";const r=/ERROR: 0:(\d+)/.exec(a);if(r){const o=parseInt(r[1]);return t.toUpperCase()+`

`+a+`

`+cE(n.getShaderSource(e),o)}else return a}function uE(n,e){const t=dE(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function hE(n,e){let t;switch(e){case S0:t="Linear";break;case w0:t="Reinhard";break;case E0:t="Cineon";break;case M0:t="ACESFilmic";break;case A0:t="AgX";break;case C0:t="Neutral";break;case T0:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const go=new L;function fE(){nt.getLuminanceCoefficients(go);const n=go.x.toFixed(4),e=go.y.toFixed(4),t=go.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function pE(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter($a).join(`
`)}function mE(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function gE(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const a=n.getActiveAttrib(e,s),r=a.name;let o=1;a.type===n.FLOAT_MAT2&&(o=2),a.type===n.FLOAT_MAT3&&(o=3),a.type===n.FLOAT_MAT4&&(o=4),t[r]={type:a.type,location:n.getAttribLocation(e,r),locationSize:o}}return t}function $a(n){return n!==""}function Pf(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Lf(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const _E=/^[ \t]*#include +<([\w\d./]+)>/gm;function Vd(n){return n.replace(_E,yE)}const vE=new Map;function yE(n,e){let t=qe[e];if(t===void 0){const i=vE.get(e);if(i!==void 0)t=qe[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Vd(t)}const bE=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Nf(n){return n.replace(bE,xE)}function xE(n,e,t,i){let s="";for(let a=parseInt(e);a<parseInt(t);a++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return s}function If(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}function SE(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===xm?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===t0?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===hi&&(e="SHADOWMAP_TYPE_VSM"),e}function wE(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case ha:case fa:e="ENVMAP_TYPE_CUBE";break;case El:e="ENVMAP_TYPE_CUBE_UV";break}return e}function EE(n){let e="ENVMAP_MODE_REFLECTION";return n.envMap&&n.envMapMode===fa&&(e="ENVMAP_MODE_REFRACTION"),e}function ME(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case wl:e="ENVMAP_BLENDING_MULTIPLY";break;case b0:e="ENVMAP_BLENDING_MIX";break;case x0:e="ENVMAP_BLENDING_ADD";break}return e}function TE(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function AE(n,e,t,i){const s=n.getContext(),a=t.defines;let r=t.vertexShader,o=t.fragmentShader;const l=SE(t),c=wE(t),d=EE(t),u=ME(t),h=TE(t),f=pE(t),g=mE(a),_=s.createProgram();let m,p,w=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter($a).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter($a).join(`
`),p.length>0&&(p+=`
`)):(m=[If(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter($a).join(`
`),p=[If(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+d:"",t.envMap?"#define "+u:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Oi?"#define TONE_MAPPING":"",t.toneMapping!==Oi?qe.tonemapping_pars_fragment:"",t.toneMapping!==Oi?hE("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",qe.colorspace_pars_fragment,uE("linearToOutputTexel",t.outputColorSpace),fE(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter($a).join(`
`)),r=Vd(r),r=Pf(r,t),r=Lf(r,t),o=Vd(o),o=Pf(o,t),o=Lf(o,t),r=Nf(r),o=Nf(o),t.isRawShaderMaterial!==!0&&(w=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===Lh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Lh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const x=w+m+r,y=w+p+o,C=Af(s,s.VERTEX_SHADER,x),M=Af(s,s.FRAGMENT_SHADER,y);s.attachShader(_,C),s.attachShader(_,M),t.index0AttributeName!==void 0?s.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function T(R){if(n.debug.checkShaderErrors){const I=s.getProgramInfoLog(_)||"",O=s.getShaderInfoLog(C)||"",B=s.getShaderInfoLog(M)||"",G=I.trim(),k=O.trim(),Y=B.trim();let H=!0,ie=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(H=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,_,C,M);else{const q=Rf(s,C,"vertex"),Q=Rf(s,M,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+G+`
`+q+`
`+Q)}else G!==""?console.warn("THREE.WebGLProgram: Program Info Log:",G):(k===""||Y==="")&&(ie=!1);ie&&(R.diagnostics={runnable:H,programLog:G,vertexShader:{log:k,prefix:m},fragmentShader:{log:Y,prefix:p}})}s.deleteShader(C),s.deleteShader(M),A=new Io(s,_),v=gE(s,_)}let A;this.getUniforms=function(){return A===void 0&&T(this),A};let v;this.getAttributes=function(){return v===void 0&&T(this),v};let b=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return b===!1&&(b=s.getProgramParameter(_,oE)),b},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=lE++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=C,this.fragmentShader=M,this}let CE=0;class RE{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,s=this._getShaderStage(t),a=this._getShaderStage(i),r=this._getShaderCacheForMaterial(e);return r.has(s)===!1&&(r.add(s),s.usedTimes++),r.has(a)===!1&&(r.add(a),a.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new PE(e),t.set(e,i)),i}}class PE{constructor(e){this.id=CE++,this.code=e,this.usedTimes=0}}function LE(n,e,t,i,s,a,r){const o=new Dm,l=new RE,c=new Set,d=[],u=s.logarithmicDepthBuffer,h=s.vertexTextures;let f=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(v){return c.add(v),v===0?"uv":`uv${v}`}function m(v,b,R,I,O){const B=I.fog,G=O.geometry,k=v.isMeshStandardMaterial?I.environment:null,Y=(v.isMeshStandardMaterial?t:e).get(v.envMap||k),H=Y&&Y.mapping===El?Y.image.height:null,ie=g[v.type];v.precision!==null&&(f=s.getMaxPrecision(v.precision),f!==v.precision&&console.warn("THREE.WebGLProgram.getParameters:",v.precision,"not supported, using",f,"instead."));const q=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,Q=q!==void 0?q.length:0;let _e=0;G.morphAttributes.position!==void 0&&(_e=1),G.morphAttributes.normal!==void 0&&(_e=2),G.morphAttributes.color!==void 0&&(_e=3);let ye,Pe,te,V;if(ie){const it=Yn[ie];ye=it.vertexShader,Pe=it.fragmentShader}else ye=v.vertexShader,Pe=v.fragmentShader,l.update(v),te=l.getVertexShaderID(v),V=l.getFragmentShaderID(v);const Z=n.getRenderTarget(),ce=n.state.buffers.depth.getReversed(),Le=O.isInstancedMesh===!0,ve=O.isBatchedMesh===!0,Be=!!v.map,et=!!v.matcap,N=!!Y,lt=!!v.aoMap,Ge=!!v.lightMap,Oe=!!v.bumpMap,Ee=!!v.normalMap,vt=!!v.displacementMap,Me=!!v.emissiveMap,Xe=!!v.metalnessMap,Ft=!!v.roughnessMap,Mt=v.anisotropy>0,P=v.clearcoat>0,S=v.dispersion>0,z=v.iridescence>0,j=v.sheen>0,ee=v.transmission>0,K=Mt&&!!v.anisotropyMap,Ne=P&&!!v.clearcoatMap,de=P&&!!v.clearcoatNormalMap,Te=P&&!!v.clearcoatRoughnessMap,Ae=z&&!!v.iridescenceMap,oe=z&&!!v.iridescenceThicknessMap,ge=j&&!!v.sheenColorMap,Fe=j&&!!v.sheenRoughnessMap,Ce=!!v.specularMap,pe=!!v.specularColorMap,$e=!!v.specularIntensityMap,D=ee&&!!v.transmissionMap,le=ee&&!!v.thicknessMap,he=!!v.gradientMap,xe=!!v.alphaMap,se=v.alphaTest>0,J=!!v.alphaHash,we=!!v.extensions;let He=Oi;v.toneMapped&&(Z===null||Z.isXRRenderTarget===!0)&&(He=n.toneMapping);const ft={shaderID:ie,shaderType:v.type,shaderName:v.name,vertexShader:ye,fragmentShader:Pe,defines:v.defines,customVertexShaderID:te,customFragmentShaderID:V,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:f,batching:ve,batchingColor:ve&&O._colorsTexture!==null,instancing:Le,instancingColor:Le&&O.instanceColor!==null,instancingMorph:Le&&O.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:Z===null?n.outputColorSpace:Z.isXRRenderTarget===!0?Z.texture.colorSpace:pa,alphaToCoverage:!!v.alphaToCoverage,map:Be,matcap:et,envMap:N,envMapMode:N&&Y.mapping,envMapCubeUVHeight:H,aoMap:lt,lightMap:Ge,bumpMap:Oe,normalMap:Ee,displacementMap:h&&vt,emissiveMap:Me,normalMapObjectSpace:Ee&&v.normalMapType===N0,normalMapTangentSpace:Ee&&v.normalMapType===Bu,metalnessMap:Xe,roughnessMap:Ft,anisotropy:Mt,anisotropyMap:K,clearcoat:P,clearcoatMap:Ne,clearcoatNormalMap:de,clearcoatRoughnessMap:Te,dispersion:S,iridescence:z,iridescenceMap:Ae,iridescenceThicknessMap:oe,sheen:j,sheenColorMap:ge,sheenRoughnessMap:Fe,specularMap:Ce,specularColorMap:pe,specularIntensityMap:$e,transmission:ee,transmissionMap:D,thicknessMap:le,gradientMap:he,opaque:v.transparent===!1&&v.blending===ia&&v.alphaToCoverage===!1,alphaMap:xe,alphaTest:se,alphaHash:J,combine:v.combine,mapUv:Be&&_(v.map.channel),aoMapUv:lt&&_(v.aoMap.channel),lightMapUv:Ge&&_(v.lightMap.channel),bumpMapUv:Oe&&_(v.bumpMap.channel),normalMapUv:Ee&&_(v.normalMap.channel),displacementMapUv:vt&&_(v.displacementMap.channel),emissiveMapUv:Me&&_(v.emissiveMap.channel),metalnessMapUv:Xe&&_(v.metalnessMap.channel),roughnessMapUv:Ft&&_(v.roughnessMap.channel),anisotropyMapUv:K&&_(v.anisotropyMap.channel),clearcoatMapUv:Ne&&_(v.clearcoatMap.channel),clearcoatNormalMapUv:de&&_(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Te&&_(v.clearcoatRoughnessMap.channel),iridescenceMapUv:Ae&&_(v.iridescenceMap.channel),iridescenceThicknessMapUv:oe&&_(v.iridescenceThicknessMap.channel),sheenColorMapUv:ge&&_(v.sheenColorMap.channel),sheenRoughnessMapUv:Fe&&_(v.sheenRoughnessMap.channel),specularMapUv:Ce&&_(v.specularMap.channel),specularColorMapUv:pe&&_(v.specularColorMap.channel),specularIntensityMapUv:$e&&_(v.specularIntensityMap.channel),transmissionMapUv:D&&_(v.transmissionMap.channel),thicknessMapUv:le&&_(v.thicknessMap.channel),alphaMapUv:xe&&_(v.alphaMap.channel),vertexTangents:!!G.attributes.tangent&&(Ee||Mt),vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!G.attributes.uv&&(Be||xe),fog:!!B,useFog:v.fog===!0,fogExp2:!!B&&B.isFogExp2,flatShading:v.flatShading===!0&&v.wireframe===!1,sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:ce,skinning:O.isSkinnedMesh===!0,morphTargets:G.morphAttributes.position!==void 0,morphNormals:G.morphAttributes.normal!==void 0,morphColors:G.morphAttributes.color!==void 0,morphTargetsCount:Q,morphTextureStride:_e,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:v.dithering,shadowMapEnabled:n.shadowMap.enabled&&R.length>0,shadowMapType:n.shadowMap.type,toneMapping:He,decodeVideoTexture:Be&&v.map.isVideoTexture===!0&&nt.getTransfer(v.map.colorSpace)===dt,decodeVideoTextureEmissive:Me&&v.emissiveMap.isVideoTexture===!0&&nt.getTransfer(v.emissiveMap.colorSpace)===dt,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===Qe,flipSided:v.side===ln,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:we&&v.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(we&&v.extensions.multiDraw===!0||ve)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return ft.vertexUv1s=c.has(1),ft.vertexUv2s=c.has(2),ft.vertexUv3s=c.has(3),c.clear(),ft}function p(v){const b=[];if(v.shaderID?b.push(v.shaderID):(b.push(v.customVertexShaderID),b.push(v.customFragmentShaderID)),v.defines!==void 0)for(const R in v.defines)b.push(R),b.push(v.defines[R]);return v.isRawShaderMaterial===!1&&(w(b,v),x(b,v),b.push(n.outputColorSpace)),b.push(v.customProgramCacheKey),b.join()}function w(v,b){v.push(b.precision),v.push(b.outputColorSpace),v.push(b.envMapMode),v.push(b.envMapCubeUVHeight),v.push(b.mapUv),v.push(b.alphaMapUv),v.push(b.lightMapUv),v.push(b.aoMapUv),v.push(b.bumpMapUv),v.push(b.normalMapUv),v.push(b.displacementMapUv),v.push(b.emissiveMapUv),v.push(b.metalnessMapUv),v.push(b.roughnessMapUv),v.push(b.anisotropyMapUv),v.push(b.clearcoatMapUv),v.push(b.clearcoatNormalMapUv),v.push(b.clearcoatRoughnessMapUv),v.push(b.iridescenceMapUv),v.push(b.iridescenceThicknessMapUv),v.push(b.sheenColorMapUv),v.push(b.sheenRoughnessMapUv),v.push(b.specularMapUv),v.push(b.specularColorMapUv),v.push(b.specularIntensityMapUv),v.push(b.transmissionMapUv),v.push(b.thicknessMapUv),v.push(b.combine),v.push(b.fogExp2),v.push(b.sizeAttenuation),v.push(b.morphTargetsCount),v.push(b.morphAttributeCount),v.push(b.numDirLights),v.push(b.numPointLights),v.push(b.numSpotLights),v.push(b.numSpotLightMaps),v.push(b.numHemiLights),v.push(b.numRectAreaLights),v.push(b.numDirLightShadows),v.push(b.numPointLightShadows),v.push(b.numSpotLightShadows),v.push(b.numSpotLightShadowsWithMaps),v.push(b.numLightProbes),v.push(b.shadowMapType),v.push(b.toneMapping),v.push(b.numClippingPlanes),v.push(b.numClipIntersection),v.push(b.depthPacking)}function x(v,b){o.disableAll(),b.supportsVertexTextures&&o.enable(0),b.instancing&&o.enable(1),b.instancingColor&&o.enable(2),b.instancingMorph&&o.enable(3),b.matcap&&o.enable(4),b.envMap&&o.enable(5),b.normalMapObjectSpace&&o.enable(6),b.normalMapTangentSpace&&o.enable(7),b.clearcoat&&o.enable(8),b.iridescence&&o.enable(9),b.alphaTest&&o.enable(10),b.vertexColors&&o.enable(11),b.vertexAlphas&&o.enable(12),b.vertexUv1s&&o.enable(13),b.vertexUv2s&&o.enable(14),b.vertexUv3s&&o.enable(15),b.vertexTangents&&o.enable(16),b.anisotropy&&o.enable(17),b.alphaHash&&o.enable(18),b.batching&&o.enable(19),b.dispersion&&o.enable(20),b.batchingColor&&o.enable(21),b.gradientMap&&o.enable(22),v.push(o.mask),o.disableAll(),b.fog&&o.enable(0),b.useFog&&o.enable(1),b.flatShading&&o.enable(2),b.logarithmicDepthBuffer&&o.enable(3),b.reversedDepthBuffer&&o.enable(4),b.skinning&&o.enable(5),b.morphTargets&&o.enable(6),b.morphNormals&&o.enable(7),b.morphColors&&o.enable(8),b.premultipliedAlpha&&o.enable(9),b.shadowMapEnabled&&o.enable(10),b.doubleSided&&o.enable(11),b.flipSided&&o.enable(12),b.useDepthPacking&&o.enable(13),b.dithering&&o.enable(14),b.transmission&&o.enable(15),b.sheen&&o.enable(16),b.opaque&&o.enable(17),b.pointsUvs&&o.enable(18),b.decodeVideoTexture&&o.enable(19),b.decodeVideoTextureEmissive&&o.enable(20),b.alphaToCoverage&&o.enable(21),v.push(o.mask)}function y(v){const b=g[v.type];let R;if(b){const I=Yn[b];R=Sy.clone(I.uniforms)}else R=v.uniforms;return R}function C(v,b){let R;for(let I=0,O=d.length;I<O;I++){const B=d[I];if(B.cacheKey===b){R=B,++R.usedTimes;break}}return R===void 0&&(R=new AE(n,b,v,a),d.push(R)),R}function M(v){if(--v.usedTimes===0){const b=d.indexOf(v);d[b]=d[d.length-1],d.pop(),v.destroy()}}function T(v){l.remove(v)}function A(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:y,acquireProgram:C,releaseProgram:M,releaseShaderCache:T,programs:d,dispose:A}}function NE(){let n=new WeakMap;function e(r){return n.has(r)}function t(r){let o=n.get(r);return o===void 0&&(o={},n.set(r,o)),o}function i(r){n.delete(r)}function s(r,o,l){n.get(r)[o]=l}function a(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:a}}function IE(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function Df(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Uf(){const n=[];let e=0;const t=[],i=[],s=[];function a(){e=0,t.length=0,i.length=0,s.length=0}function r(u,h,f,g,_,m){let p=n[e];return p===void 0?(p={id:u.id,object:u,geometry:h,material:f,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},n[e]=p):(p.id=u.id,p.object=u,p.geometry=h,p.material=f,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=_,p.group=m),e++,p}function o(u,h,f,g,_,m){const p=r(u,h,f,g,_,m);f.transmission>0?i.push(p):f.transparent===!0?s.push(p):t.push(p)}function l(u,h,f,g,_,m){const p=r(u,h,f,g,_,m);f.transmission>0?i.unshift(p):f.transparent===!0?s.unshift(p):t.unshift(p)}function c(u,h){t.length>1&&t.sort(u||IE),i.length>1&&i.sort(h||Df),s.length>1&&s.sort(h||Df)}function d(){for(let u=e,h=n.length;u<h;u++){const f=n[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:i,transparent:s,init:a,push:o,unshift:l,finish:d,sort:c}}function DE(){let n=new WeakMap;function e(i,s){const a=n.get(i);let r;return a===void 0?(r=new Uf,n.set(i,[r])):s>=a.length?(r=new Uf,a.push(r)):r=a[s],r}function t(){n=new WeakMap}return{get:e,dispose:t}}function UE(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new L,color:new Ze};break;case"SpotLight":t={position:new L,direction:new L,color:new Ze,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new L,color:new Ze,distance:0,decay:0};break;case"HemisphereLight":t={direction:new L,skyColor:new Ze,groundColor:new Ze};break;case"RectAreaLight":t={color:new Ze,position:new L,halfWidth:new L,halfHeight:new L};break}return n[e.id]=t,t}}}function FE(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ue};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ue};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ue,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let OE=0;function kE(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function BE(n){const e=new UE,t=FE(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new L);const s=new L,a=new yt,r=new yt;function o(c){let d=0,u=0,h=0;for(let v=0;v<9;v++)i.probe[v].set(0,0,0);let f=0,g=0,_=0,m=0,p=0,w=0,x=0,y=0,C=0,M=0,T=0;c.sort(kE);for(let v=0,b=c.length;v<b;v++){const R=c[v],I=R.color,O=R.intensity,B=R.distance,G=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)d+=I.r*O,u+=I.g*O,h+=I.b*O;else if(R.isLightProbe){for(let k=0;k<9;k++)i.probe[k].addScaledVector(R.sh.coefficients[k],O);T++}else if(R.isDirectionalLight){const k=e.get(R);if(k.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const Y=R.shadow,H=t.get(R);H.shadowIntensity=Y.intensity,H.shadowBias=Y.bias,H.shadowNormalBias=Y.normalBias,H.shadowRadius=Y.radius,H.shadowMapSize=Y.mapSize,i.directionalShadow[f]=H,i.directionalShadowMap[f]=G,i.directionalShadowMatrix[f]=R.shadow.matrix,w++}i.directional[f]=k,f++}else if(R.isSpotLight){const k=e.get(R);k.position.setFromMatrixPosition(R.matrixWorld),k.color.copy(I).multiplyScalar(O),k.distance=B,k.coneCos=Math.cos(R.angle),k.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),k.decay=R.decay,i.spot[_]=k;const Y=R.shadow;if(R.map&&(i.spotLightMap[C]=R.map,C++,Y.updateMatrices(R),R.castShadow&&M++),i.spotLightMatrix[_]=Y.matrix,R.castShadow){const H=t.get(R);H.shadowIntensity=Y.intensity,H.shadowBias=Y.bias,H.shadowNormalBias=Y.normalBias,H.shadowRadius=Y.radius,H.shadowMapSize=Y.mapSize,i.spotShadow[_]=H,i.spotShadowMap[_]=G,y++}_++}else if(R.isRectAreaLight){const k=e.get(R);k.color.copy(I).multiplyScalar(O),k.halfWidth.set(R.width*.5,0,0),k.halfHeight.set(0,R.height*.5,0),i.rectArea[m]=k,m++}else if(R.isPointLight){const k=e.get(R);if(k.color.copy(R.color).multiplyScalar(R.intensity),k.distance=R.distance,k.decay=R.decay,R.castShadow){const Y=R.shadow,H=t.get(R);H.shadowIntensity=Y.intensity,H.shadowBias=Y.bias,H.shadowNormalBias=Y.normalBias,H.shadowRadius=Y.radius,H.shadowMapSize=Y.mapSize,H.shadowCameraNear=Y.camera.near,H.shadowCameraFar=Y.camera.far,i.pointShadow[g]=H,i.pointShadowMap[g]=G,i.pointShadowMatrix[g]=R.shadow.matrix,x++}i.point[g]=k,g++}else if(R.isHemisphereLight){const k=e.get(R);k.skyColor.copy(R.color).multiplyScalar(O),k.groundColor.copy(R.groundColor).multiplyScalar(O),i.hemi[p]=k,p++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=fe.LTC_FLOAT_1,i.rectAreaLTC2=fe.LTC_FLOAT_2):(i.rectAreaLTC1=fe.LTC_HALF_1,i.rectAreaLTC2=fe.LTC_HALF_2)),i.ambient[0]=d,i.ambient[1]=u,i.ambient[2]=h;const A=i.hash;(A.directionalLength!==f||A.pointLength!==g||A.spotLength!==_||A.rectAreaLength!==m||A.hemiLength!==p||A.numDirectionalShadows!==w||A.numPointShadows!==x||A.numSpotShadows!==y||A.numSpotMaps!==C||A.numLightProbes!==T)&&(i.directional.length=f,i.spot.length=_,i.rectArea.length=m,i.point.length=g,i.hemi.length=p,i.directionalShadow.length=w,i.directionalShadowMap.length=w,i.pointShadow.length=x,i.pointShadowMap.length=x,i.spotShadow.length=y,i.spotShadowMap.length=y,i.directionalShadowMatrix.length=w,i.pointShadowMatrix.length=x,i.spotLightMatrix.length=y+C-M,i.spotLightMap.length=C,i.numSpotLightShadowsWithMaps=M,i.numLightProbes=T,A.directionalLength=f,A.pointLength=g,A.spotLength=_,A.rectAreaLength=m,A.hemiLength=p,A.numDirectionalShadows=w,A.numPointShadows=x,A.numSpotShadows=y,A.numSpotMaps=C,A.numLightProbes=T,i.version=OE++)}function l(c,d){let u=0,h=0,f=0,g=0,_=0;const m=d.matrixWorldInverse;for(let p=0,w=c.length;p<w;p++){const x=c[p];if(x.isDirectionalLight){const y=i.directional[u];y.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),u++}else if(x.isSpotLight){const y=i.spot[f];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),f++}else if(x.isRectAreaLight){const y=i.rectArea[g];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(m),r.identity(),a.copy(x.matrixWorld),a.premultiply(m),r.extractRotation(a),y.halfWidth.set(x.width*.5,0,0),y.halfHeight.set(0,x.height*.5,0),y.halfWidth.applyMatrix4(r),y.halfHeight.applyMatrix4(r),g++}else if(x.isPointLight){const y=i.point[h];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(m),h++}else if(x.isHemisphereLight){const y=i.hemi[_];y.direction.setFromMatrixPosition(x.matrixWorld),y.direction.transformDirection(m),_++}}}return{setup:o,setupView:l,state:i}}function Ff(n){const e=new BE(n),t=[],i=[];function s(d){c.camera=d,t.length=0,i.length=0}function a(d){t.push(d)}function r(d){i.push(d)}function o(){e.setup(t)}function l(d){e.setupView(t,d)}const c={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:a,pushShadow:r}}function zE(n){let e=new WeakMap;function t(s,a=0){const r=e.get(s);let o;return r===void 0?(o=new Ff(n),e.set(s,[o])):a>=r.length?(o=new Ff(n),r.push(o)):o=r[a],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const HE=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,GE=`uniform sampler2D shadow_pass;
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
}`;function VE(n,e,t){let i=new Vu;const s=new ue,a=new ue,r=new Et,o=new ub({depthPacking:L0}),l=new hb,c={},d=t.maxTextureSize,u={[Hi]:ln,[ln]:Hi,[Qe]:Qe},h=new Vi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ue},radius:{value:4}},vertexShader:HE,fragmentShader:GE}),f=h.clone();f.defines.HORIZONTAL_PASS=1;const g=new Tt;g.setAttribute("position",new Vn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new ze(g,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=xm;let p=this.type;this.render=function(M,T,A){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||M.length===0)return;const v=n.getRenderTarget(),b=n.getActiveCubeFace(),R=n.getActiveMipmapLevel(),I=n.state;I.setBlending(Ui),I.buffers.depth.getReversed()===!0?I.buffers.color.setClear(0,0,0,0):I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);const O=p!==hi&&this.type===hi,B=p===hi&&this.type!==hi;for(let G=0,k=M.length;G<k;G++){const Y=M[G],H=Y.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",Y,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;s.copy(H.mapSize);const ie=H.getFrameExtents();if(s.multiply(ie),a.copy(H.mapSize),(s.x>d||s.y>d)&&(s.x>d&&(a.x=Math.floor(d/ie.x),s.x=a.x*ie.x,H.mapSize.x=a.x),s.y>d&&(a.y=Math.floor(d/ie.y),s.y=a.y*ie.y,H.mapSize.y=a.y)),H.map===null||O===!0||B===!0){const Q=this.type!==hi?{minFilter:Gn,magFilter:Gn}:{};H.map!==null&&H.map.dispose(),H.map=new bs(s.x,s.y,Q),H.map.texture.name=Y.name+".shadowMap",H.camera.updateProjectionMatrix()}n.setRenderTarget(H.map),n.clear();const q=H.getViewportCount();for(let Q=0;Q<q;Q++){const _e=H.getViewport(Q);r.set(a.x*_e.x,a.y*_e.y,a.x*_e.z,a.y*_e.w),I.viewport(r),H.updateMatrices(Y,Q),i=H.getFrustum(),y(T,A,H.camera,Y,this.type)}H.isPointLightShadow!==!0&&this.type===hi&&w(H,A),H.needsUpdate=!1}p=this.type,m.needsUpdate=!1,n.setRenderTarget(v,b,R)};function w(M,T){const A=e.update(_);h.defines.VSM_SAMPLES!==M.blurSamples&&(h.defines.VSM_SAMPLES=M.blurSamples,f.defines.VSM_SAMPLES=M.blurSamples,h.needsUpdate=!0,f.needsUpdate=!0),M.mapPass===null&&(M.mapPass=new bs(s.x,s.y)),h.uniforms.shadow_pass.value=M.map.texture,h.uniforms.resolution.value=M.mapSize,h.uniforms.radius.value=M.radius,n.setRenderTarget(M.mapPass),n.clear(),n.renderBufferDirect(T,null,A,h,_,null),f.uniforms.shadow_pass.value=M.mapPass.texture,f.uniforms.resolution.value=M.mapSize,f.uniforms.radius.value=M.radius,n.setRenderTarget(M.map),n.clear(),n.renderBufferDirect(T,null,A,f,_,null)}function x(M,T,A,v){let b=null;const R=A.isPointLight===!0?M.customDistanceMaterial:M.customDepthMaterial;if(R!==void 0)b=R;else if(b=A.isPointLight===!0?l:o,n.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0||T.alphaToCoverage===!0){const I=b.uuid,O=T.uuid;let B=c[I];B===void 0&&(B={},c[I]=B);let G=B[O];G===void 0&&(G=b.clone(),B[O]=G,T.addEventListener("dispose",C)),b=G}if(b.visible=T.visible,b.wireframe=T.wireframe,v===hi?b.side=T.shadowSide!==null?T.shadowSide:T.side:b.side=T.shadowSide!==null?T.shadowSide:u[T.side],b.alphaMap=T.alphaMap,b.alphaTest=T.alphaToCoverage===!0?.5:T.alphaTest,b.map=T.map,b.clipShadows=T.clipShadows,b.clippingPlanes=T.clippingPlanes,b.clipIntersection=T.clipIntersection,b.displacementMap=T.displacementMap,b.displacementScale=T.displacementScale,b.displacementBias=T.displacementBias,b.wireframeLinewidth=T.wireframeLinewidth,b.linewidth=T.linewidth,A.isPointLight===!0&&b.isMeshDistanceMaterial===!0){const I=n.properties.get(b);I.light=A}return b}function y(M,T,A,v,b){if(M.visible===!1)return;if(M.layers.test(T.layers)&&(M.isMesh||M.isLine||M.isPoints)&&(M.castShadow||M.receiveShadow&&b===hi)&&(!M.frustumCulled||i.intersectsObject(M))){M.modelViewMatrix.multiplyMatrices(A.matrixWorldInverse,M.matrixWorld);const O=e.update(M),B=M.material;if(Array.isArray(B)){const G=O.groups;for(let k=0,Y=G.length;k<Y;k++){const H=G[k],ie=B[H.materialIndex];if(ie&&ie.visible){const q=x(M,ie,v,b);M.onBeforeShadow(n,M,T,A,O,q,H),n.renderBufferDirect(A,null,O,q,M,H),M.onAfterShadow(n,M,T,A,O,q,H)}}}else if(B.visible){const G=x(M,B,v,b);M.onBeforeShadow(n,M,T,A,O,G,null),n.renderBufferDirect(A,null,O,G,M,null),M.onAfterShadow(n,M,T,A,O,G,null)}}const I=M.children;for(let O=0,B=I.length;O<B;O++)y(I[O],T,A,v,b)}function C(M){M.target.removeEventListener("dispose",C);for(const A in c){const v=c[A],b=M.target.uuid;b in v&&(v[b].dispose(),delete v[b])}}}const $E={[td]:nd,[id]:rd,[sd]:od,[ua]:ad,[nd]:td,[rd]:id,[od]:sd,[ad]:ua};function WE(n,e){function t(){let D=!1;const le=new Et;let he=null;const xe=new Et(0,0,0,0);return{setMask:function(se){he!==se&&!D&&(n.colorMask(se,se,se,se),he=se)},setLocked:function(se){D=se},setClear:function(se,J,we,He,ft){ft===!0&&(se*=He,J*=He,we*=He),le.set(se,J,we,He),xe.equals(le)===!1&&(n.clearColor(se,J,we,He),xe.copy(le))},reset:function(){D=!1,he=null,xe.set(-1,0,0,0)}}}function i(){let D=!1,le=!1,he=null,xe=null,se=null;return{setReversed:function(J){if(le!==J){const we=e.get("EXT_clip_control");J?we.clipControlEXT(we.LOWER_LEFT_EXT,we.ZERO_TO_ONE_EXT):we.clipControlEXT(we.LOWER_LEFT_EXT,we.NEGATIVE_ONE_TO_ONE_EXT),le=J;const He=se;se=null,this.setClear(He)}},getReversed:function(){return le},setTest:function(J){J?Z(n.DEPTH_TEST):ce(n.DEPTH_TEST)},setMask:function(J){he!==J&&!D&&(n.depthMask(J),he=J)},setFunc:function(J){if(le&&(J=$E[J]),xe!==J){switch(J){case td:n.depthFunc(n.NEVER);break;case nd:n.depthFunc(n.ALWAYS);break;case id:n.depthFunc(n.LESS);break;case ua:n.depthFunc(n.LEQUAL);break;case sd:n.depthFunc(n.EQUAL);break;case ad:n.depthFunc(n.GEQUAL);break;case rd:n.depthFunc(n.GREATER);break;case od:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}xe=J}},setLocked:function(J){D=J},setClear:function(J){se!==J&&(le&&(J=1-J),n.clearDepth(J),se=J)},reset:function(){D=!1,he=null,xe=null,se=null,le=!1}}}function s(){let D=!1,le=null,he=null,xe=null,se=null,J=null,we=null,He=null,ft=null;return{setTest:function(it){D||(it?Z(n.STENCIL_TEST):ce(n.STENCIL_TEST))},setMask:function(it){le!==it&&!D&&(n.stencilMask(it),le=it)},setFunc:function(it,ai,Xn){(he!==it||xe!==ai||se!==Xn)&&(n.stencilFunc(it,ai,Xn),he=it,xe=ai,se=Xn)},setOp:function(it,ai,Xn){(J!==it||we!==ai||He!==Xn)&&(n.stencilOp(it,ai,Xn),J=it,we=ai,He=Xn)},setLocked:function(it){D=it},setClear:function(it){ft!==it&&(n.clearStencil(it),ft=it)},reset:function(){D=!1,le=null,he=null,xe=null,se=null,J=null,we=null,He=null,ft=null}}}const a=new t,r=new i,o=new s,l=new WeakMap,c=new WeakMap;let d={},u={},h=new WeakMap,f=[],g=null,_=!1,m=null,p=null,w=null,x=null,y=null,C=null,M=null,T=new Ze(0,0,0),A=0,v=!1,b=null,R=null,I=null,O=null,B=null;const G=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let k=!1,Y=0;const H=n.getParameter(n.VERSION);H.indexOf("WebGL")!==-1?(Y=parseFloat(/^WebGL (\d)/.exec(H)[1]),k=Y>=1):H.indexOf("OpenGL ES")!==-1&&(Y=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),k=Y>=2);let ie=null,q={};const Q=n.getParameter(n.SCISSOR_BOX),_e=n.getParameter(n.VIEWPORT),ye=new Et().fromArray(Q),Pe=new Et().fromArray(_e);function te(D,le,he,xe){const se=new Uint8Array(4),J=n.createTexture();n.bindTexture(D,J),n.texParameteri(D,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(D,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let we=0;we<he;we++)D===n.TEXTURE_3D||D===n.TEXTURE_2D_ARRAY?n.texImage3D(le,0,n.RGBA,1,1,xe,0,n.RGBA,n.UNSIGNED_BYTE,se):n.texImage2D(le+we,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,se);return J}const V={};V[n.TEXTURE_2D]=te(n.TEXTURE_2D,n.TEXTURE_2D,1),V[n.TEXTURE_CUBE_MAP]=te(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),V[n.TEXTURE_2D_ARRAY]=te(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),V[n.TEXTURE_3D]=te(n.TEXTURE_3D,n.TEXTURE_3D,1,1),a.setClear(0,0,0,1),r.setClear(1),o.setClear(0),Z(n.DEPTH_TEST),r.setFunc(ua),Oe(!1),Ee(Ah),Z(n.CULL_FACE),lt(Ui);function Z(D){d[D]!==!0&&(n.enable(D),d[D]=!0)}function ce(D){d[D]!==!1&&(n.disable(D),d[D]=!1)}function Le(D,le){return u[D]!==le?(n.bindFramebuffer(D,le),u[D]=le,D===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=le),D===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=le),!0):!1}function ve(D,le){let he=f,xe=!1;if(D){he=h.get(le),he===void 0&&(he=[],h.set(le,he));const se=D.textures;if(he.length!==se.length||he[0]!==n.COLOR_ATTACHMENT0){for(let J=0,we=se.length;J<we;J++)he[J]=n.COLOR_ATTACHMENT0+J;he.length=se.length,xe=!0}}else he[0]!==n.BACK&&(he[0]=n.BACK,xe=!0);xe&&n.drawBuffers(he)}function Be(D){return g!==D?(n.useProgram(D),g=D,!0):!1}const et={[cs]:n.FUNC_ADD,[i0]:n.FUNC_SUBTRACT,[s0]:n.FUNC_REVERSE_SUBTRACT};et[a0]=n.MIN,et[r0]=n.MAX;const N={[o0]:n.ZERO,[l0]:n.ONE,[c0]:n.SRC_COLOR,[Qc]:n.SRC_ALPHA,[m0]:n.SRC_ALPHA_SATURATE,[f0]:n.DST_COLOR,[u0]:n.DST_ALPHA,[d0]:n.ONE_MINUS_SRC_COLOR,[ed]:n.ONE_MINUS_SRC_ALPHA,[p0]:n.ONE_MINUS_DST_COLOR,[h0]:n.ONE_MINUS_DST_ALPHA,[g0]:n.CONSTANT_COLOR,[_0]:n.ONE_MINUS_CONSTANT_COLOR,[v0]:n.CONSTANT_ALPHA,[y0]:n.ONE_MINUS_CONSTANT_ALPHA};function lt(D,le,he,xe,se,J,we,He,ft,it){if(D===Ui){_===!0&&(ce(n.BLEND),_=!1);return}if(_===!1&&(Z(n.BLEND),_=!0),D!==n0){if(D!==m||it!==v){if((p!==cs||y!==cs)&&(n.blendEquation(n.FUNC_ADD),p=cs,y=cs),it)switch(D){case ia:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Fi:n.blendFunc(n.ONE,n.ONE);break;case Ch:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Rh:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case ia:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Fi:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Ch:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Rh:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}w=null,x=null,C=null,M=null,T.set(0,0,0),A=0,m=D,v=it}return}se=se||le,J=J||he,we=we||xe,(le!==p||se!==y)&&(n.blendEquationSeparate(et[le],et[se]),p=le,y=se),(he!==w||xe!==x||J!==C||we!==M)&&(n.blendFuncSeparate(N[he],N[xe],N[J],N[we]),w=he,x=xe,C=J,M=we),(He.equals(T)===!1||ft!==A)&&(n.blendColor(He.r,He.g,He.b,ft),T.copy(He),A=ft),m=D,v=!1}function Ge(D,le){D.side===Qe?ce(n.CULL_FACE):Z(n.CULL_FACE);let he=D.side===ln;le&&(he=!he),Oe(he),D.blending===ia&&D.transparent===!1?lt(Ui):lt(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),r.setFunc(D.depthFunc),r.setTest(D.depthTest),r.setMask(D.depthWrite),a.setMask(D.colorWrite);const xe=D.stencilWrite;o.setTest(xe),xe&&(o.setMask(D.stencilWriteMask),o.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),o.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),Me(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?Z(n.SAMPLE_ALPHA_TO_COVERAGE):ce(n.SAMPLE_ALPHA_TO_COVERAGE)}function Oe(D){b!==D&&(D?n.frontFace(n.CW):n.frontFace(n.CCW),b=D)}function Ee(D){D!==Qv?(Z(n.CULL_FACE),D!==R&&(D===Ah?n.cullFace(n.BACK):D===e0?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):ce(n.CULL_FACE),R=D}function vt(D){D!==I&&(k&&n.lineWidth(D),I=D)}function Me(D,le,he){D?(Z(n.POLYGON_OFFSET_FILL),(O!==le||B!==he)&&(n.polygonOffset(le,he),O=le,B=he)):ce(n.POLYGON_OFFSET_FILL)}function Xe(D){D?Z(n.SCISSOR_TEST):ce(n.SCISSOR_TEST)}function Ft(D){D===void 0&&(D=n.TEXTURE0+G-1),ie!==D&&(n.activeTexture(D),ie=D)}function Mt(D,le,he){he===void 0&&(ie===null?he=n.TEXTURE0+G-1:he=ie);let xe=q[he];xe===void 0&&(xe={type:void 0,texture:void 0},q[he]=xe),(xe.type!==D||xe.texture!==le)&&(ie!==he&&(n.activeTexture(he),ie=he),n.bindTexture(D,le||V[D]),xe.type=D,xe.texture=le)}function P(){const D=q[ie];D!==void 0&&D.type!==void 0&&(n.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function S(){try{n.compressedTexImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function z(){try{n.compressedTexImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function j(){try{n.texSubImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ee(){try{n.texSubImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function K(){try{n.compressedTexSubImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ne(){try{n.compressedTexSubImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function de(){try{n.texStorage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Te(){try{n.texStorage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ae(){try{n.texImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function oe(){try{n.texImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ge(D){ye.equals(D)===!1&&(n.scissor(D.x,D.y,D.z,D.w),ye.copy(D))}function Fe(D){Pe.equals(D)===!1&&(n.viewport(D.x,D.y,D.z,D.w),Pe.copy(D))}function Ce(D,le){let he=c.get(le);he===void 0&&(he=new WeakMap,c.set(le,he));let xe=he.get(D);xe===void 0&&(xe=n.getUniformBlockIndex(le,D.name),he.set(D,xe))}function pe(D,le){const xe=c.get(le).get(D);l.get(le)!==xe&&(n.uniformBlockBinding(le,xe,D.__bindingPointIndex),l.set(le,xe))}function $e(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),r.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),d={},ie=null,q={},u={},h=new WeakMap,f=[],g=null,_=!1,m=null,p=null,w=null,x=null,y=null,C=null,M=null,T=new Ze(0,0,0),A=0,v=!1,b=null,R=null,I=null,O=null,B=null,ye.set(0,0,n.canvas.width,n.canvas.height),Pe.set(0,0,n.canvas.width,n.canvas.height),a.reset(),r.reset(),o.reset()}return{buffers:{color:a,depth:r,stencil:o},enable:Z,disable:ce,bindFramebuffer:Le,drawBuffers:ve,useProgram:Be,setBlending:lt,setMaterial:Ge,setFlipSided:Oe,setCullFace:Ee,setLineWidth:vt,setPolygonOffset:Me,setScissorTest:Xe,activeTexture:Ft,bindTexture:Mt,unbindTexture:P,compressedTexImage2D:S,compressedTexImage3D:z,texImage2D:Ae,texImage3D:oe,updateUBOMapping:Ce,uniformBlockBinding:pe,texStorage2D:de,texStorage3D:Te,texSubImage2D:j,texSubImage3D:ee,compressedTexSubImage2D:K,compressedTexSubImage3D:Ne,scissor:ge,viewport:Fe,reset:$e}}function XE(n,e,t,i,s,a,r){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ue,d=new WeakMap;let u;const h=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(P,S){return f?new OffscreenCanvas(P,S):Qo("canvas")}function _(P,S,z){let j=1;const ee=Mt(P);if((ee.width>z||ee.height>z)&&(j=z/Math.max(ee.width,ee.height)),j<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){const K=Math.floor(j*ee.width),Ne=Math.floor(j*ee.height);u===void 0&&(u=g(K,Ne));const de=S?g(K,Ne):u;return de.width=K,de.height=Ne,de.getContext("2d").drawImage(P,0,0,K,Ne),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ee.width+"x"+ee.height+") to ("+K+"x"+Ne+")."),de}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ee.width+"x"+ee.height+")."),P;return P}function m(P){return P.generateMipmaps}function p(P){n.generateMipmap(P)}function w(P){return P.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?n.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function x(P,S,z,j,ee=!1){if(P!==null){if(n[P]!==void 0)return n[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let K=S;if(S===n.RED&&(z===n.FLOAT&&(K=n.R32F),z===n.HALF_FLOAT&&(K=n.R16F),z===n.UNSIGNED_BYTE&&(K=n.R8)),S===n.RED_INTEGER&&(z===n.UNSIGNED_BYTE&&(K=n.R8UI),z===n.UNSIGNED_SHORT&&(K=n.R16UI),z===n.UNSIGNED_INT&&(K=n.R32UI),z===n.BYTE&&(K=n.R8I),z===n.SHORT&&(K=n.R16I),z===n.INT&&(K=n.R32I)),S===n.RG&&(z===n.FLOAT&&(K=n.RG32F),z===n.HALF_FLOAT&&(K=n.RG16F),z===n.UNSIGNED_BYTE&&(K=n.RG8)),S===n.RG_INTEGER&&(z===n.UNSIGNED_BYTE&&(K=n.RG8UI),z===n.UNSIGNED_SHORT&&(K=n.RG16UI),z===n.UNSIGNED_INT&&(K=n.RG32UI),z===n.BYTE&&(K=n.RG8I),z===n.SHORT&&(K=n.RG16I),z===n.INT&&(K=n.RG32I)),S===n.RGB_INTEGER&&(z===n.UNSIGNED_BYTE&&(K=n.RGB8UI),z===n.UNSIGNED_SHORT&&(K=n.RGB16UI),z===n.UNSIGNED_INT&&(K=n.RGB32UI),z===n.BYTE&&(K=n.RGB8I),z===n.SHORT&&(K=n.RGB16I),z===n.INT&&(K=n.RGB32I)),S===n.RGBA_INTEGER&&(z===n.UNSIGNED_BYTE&&(K=n.RGBA8UI),z===n.UNSIGNED_SHORT&&(K=n.RGBA16UI),z===n.UNSIGNED_INT&&(K=n.RGBA32UI),z===n.BYTE&&(K=n.RGBA8I),z===n.SHORT&&(K=n.RGBA16I),z===n.INT&&(K=n.RGBA32I)),S===n.RGB&&(z===n.UNSIGNED_INT_5_9_9_9_REV&&(K=n.RGB9_E5),z===n.UNSIGNED_INT_10F_11F_11F_REV&&(K=n.R11F_G11F_B10F)),S===n.RGBA){const Ne=ee?jo:nt.getTransfer(j);z===n.FLOAT&&(K=n.RGBA32F),z===n.HALF_FLOAT&&(K=n.RGBA16F),z===n.UNSIGNED_BYTE&&(K=Ne===dt?n.SRGB8_ALPHA8:n.RGBA8),z===n.UNSIGNED_SHORT_4_4_4_4&&(K=n.RGBA4),z===n.UNSIGNED_SHORT_5_5_5_1&&(K=n.RGB5_A1)}return(K===n.R16F||K===n.R32F||K===n.RG16F||K===n.RG32F||K===n.RGBA16F||K===n.RGBA32F)&&e.get("EXT_color_buffer_float"),K}function y(P,S){let z;return P?S===null||S===ys||S===ur?z=n.DEPTH24_STENCIL8:S===fi?z=n.DEPTH32F_STENCIL8:S===dr&&(z=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===ys||S===ur?z=n.DEPTH_COMPONENT24:S===fi?z=n.DEPTH_COMPONENT32F:S===dr&&(z=n.DEPTH_COMPONENT16),z}function C(P,S){return m(P)===!0||P.isFramebufferTexture&&P.minFilter!==Gn&&P.minFilter!==Jn?Math.log2(Math.max(S.width,S.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?S.mipmaps.length:1}function M(P){const S=P.target;S.removeEventListener("dispose",M),A(S),S.isVideoTexture&&d.delete(S)}function T(P){const S=P.target;S.removeEventListener("dispose",T),b(S)}function A(P){const S=i.get(P);if(S.__webglInit===void 0)return;const z=P.source,j=h.get(z);if(j){const ee=j[S.__cacheKey];ee.usedTimes--,ee.usedTimes===0&&v(P),Object.keys(j).length===0&&h.delete(z)}i.remove(P)}function v(P){const S=i.get(P);n.deleteTexture(S.__webglTexture);const z=P.source,j=h.get(z);delete j[S.__cacheKey],r.memory.textures--}function b(P){const S=i.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),i.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let j=0;j<6;j++){if(Array.isArray(S.__webglFramebuffer[j]))for(let ee=0;ee<S.__webglFramebuffer[j].length;ee++)n.deleteFramebuffer(S.__webglFramebuffer[j][ee]);else n.deleteFramebuffer(S.__webglFramebuffer[j]);S.__webglDepthbuffer&&n.deleteRenderbuffer(S.__webglDepthbuffer[j])}else{if(Array.isArray(S.__webglFramebuffer))for(let j=0;j<S.__webglFramebuffer.length;j++)n.deleteFramebuffer(S.__webglFramebuffer[j]);else n.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&n.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&n.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let j=0;j<S.__webglColorRenderbuffer.length;j++)S.__webglColorRenderbuffer[j]&&n.deleteRenderbuffer(S.__webglColorRenderbuffer[j]);S.__webglDepthRenderbuffer&&n.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const z=P.textures;for(let j=0,ee=z.length;j<ee;j++){const K=i.get(z[j]);K.__webglTexture&&(n.deleteTexture(K.__webglTexture),r.memory.textures--),i.remove(z[j])}i.remove(P)}let R=0;function I(){R=0}function O(){const P=R;return P>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+s.maxTextures),R+=1,P}function B(P){const S=[];return S.push(P.wrapS),S.push(P.wrapT),S.push(P.wrapR||0),S.push(P.magFilter),S.push(P.minFilter),S.push(P.anisotropy),S.push(P.internalFormat),S.push(P.format),S.push(P.type),S.push(P.generateMipmaps),S.push(P.premultiplyAlpha),S.push(P.flipY),S.push(P.unpackAlignment),S.push(P.colorSpace),S.join()}function G(P,S){const z=i.get(P);if(P.isVideoTexture&&Xe(P),P.isRenderTargetTexture===!1&&P.isExternalTexture!==!0&&P.version>0&&z.__version!==P.version){const j=P.image;if(j===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(j.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{V(z,P,S);return}}else P.isExternalTexture&&(z.__webglTexture=P.sourceTexture?P.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,z.__webglTexture,n.TEXTURE0+S)}function k(P,S){const z=i.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&z.__version!==P.version){V(z,P,S);return}t.bindTexture(n.TEXTURE_2D_ARRAY,z.__webglTexture,n.TEXTURE0+S)}function Y(P,S){const z=i.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&z.__version!==P.version){V(z,P,S);return}t.bindTexture(n.TEXTURE_3D,z.__webglTexture,n.TEXTURE0+S)}function H(P,S){const z=i.get(P);if(P.version>0&&z.__version!==P.version){Z(z,P,S);return}t.bindTexture(n.TEXTURE_CUBE_MAP,z.__webglTexture,n.TEXTURE0+S)}const ie={[dd]:n.REPEAT,[fs]:n.CLAMP_TO_EDGE,[ud]:n.MIRRORED_REPEAT},q={[Gn]:n.NEAREST,[R0]:n.NEAREST_MIPMAP_NEAREST,[zr]:n.NEAREST_MIPMAP_LINEAR,[Jn]:n.LINEAR,[Wl]:n.LINEAR_MIPMAP_NEAREST,[ps]:n.LINEAR_MIPMAP_LINEAR},Q={[I0]:n.NEVER,[B0]:n.ALWAYS,[D0]:n.LESS,[Lm]:n.LEQUAL,[U0]:n.EQUAL,[k0]:n.GEQUAL,[F0]:n.GREATER,[O0]:n.NOTEQUAL};function _e(P,S){if(S.type===fi&&e.has("OES_texture_float_linear")===!1&&(S.magFilter===Jn||S.magFilter===Wl||S.magFilter===zr||S.magFilter===ps||S.minFilter===Jn||S.minFilter===Wl||S.minFilter===zr||S.minFilter===ps)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(P,n.TEXTURE_WRAP_S,ie[S.wrapS]),n.texParameteri(P,n.TEXTURE_WRAP_T,ie[S.wrapT]),(P===n.TEXTURE_3D||P===n.TEXTURE_2D_ARRAY)&&n.texParameteri(P,n.TEXTURE_WRAP_R,ie[S.wrapR]),n.texParameteri(P,n.TEXTURE_MAG_FILTER,q[S.magFilter]),n.texParameteri(P,n.TEXTURE_MIN_FILTER,q[S.minFilter]),S.compareFunction&&(n.texParameteri(P,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(P,n.TEXTURE_COMPARE_FUNC,Q[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===Gn||S.minFilter!==zr&&S.minFilter!==ps||S.type===fi&&e.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||i.get(S).__currentAnisotropy){const z=e.get("EXT_texture_filter_anisotropic");n.texParameterf(P,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,s.getMaxAnisotropy())),i.get(S).__currentAnisotropy=S.anisotropy}}}function ye(P,S){let z=!1;P.__webglInit===void 0&&(P.__webglInit=!0,S.addEventListener("dispose",M));const j=S.source;let ee=h.get(j);ee===void 0&&(ee={},h.set(j,ee));const K=B(S);if(K!==P.__cacheKey){ee[K]===void 0&&(ee[K]={texture:n.createTexture(),usedTimes:0},r.memory.textures++,z=!0),ee[K].usedTimes++;const Ne=ee[P.__cacheKey];Ne!==void 0&&(ee[P.__cacheKey].usedTimes--,Ne.usedTimes===0&&v(S)),P.__cacheKey=K,P.__webglTexture=ee[K].texture}return z}function Pe(P,S,z){return Math.floor(Math.floor(P/z)/S)}function te(P,S,z,j){const K=P.updateRanges;if(K.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,S.width,S.height,z,j,S.data);else{K.sort((oe,ge)=>oe.start-ge.start);let Ne=0;for(let oe=1;oe<K.length;oe++){const ge=K[Ne],Fe=K[oe],Ce=ge.start+ge.count,pe=Pe(Fe.start,S.width,4),$e=Pe(ge.start,S.width,4);Fe.start<=Ce+1&&pe===$e&&Pe(Fe.start+Fe.count-1,S.width,4)===pe?ge.count=Math.max(ge.count,Fe.start+Fe.count-ge.start):(++Ne,K[Ne]=Fe)}K.length=Ne+1;const de=n.getParameter(n.UNPACK_ROW_LENGTH),Te=n.getParameter(n.UNPACK_SKIP_PIXELS),Ae=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,S.width);for(let oe=0,ge=K.length;oe<ge;oe++){const Fe=K[oe],Ce=Math.floor(Fe.start/4),pe=Math.ceil(Fe.count/4),$e=Ce%S.width,D=Math.floor(Ce/S.width),le=pe,he=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,$e),n.pixelStorei(n.UNPACK_SKIP_ROWS,D),t.texSubImage2D(n.TEXTURE_2D,0,$e,D,le,he,z,j,S.data)}P.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,de),n.pixelStorei(n.UNPACK_SKIP_PIXELS,Te),n.pixelStorei(n.UNPACK_SKIP_ROWS,Ae)}}function V(P,S,z){let j=n.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(j=n.TEXTURE_2D_ARRAY),S.isData3DTexture&&(j=n.TEXTURE_3D);const ee=ye(P,S),K=S.source;t.bindTexture(j,P.__webglTexture,n.TEXTURE0+z);const Ne=i.get(K);if(K.version!==Ne.__version||ee===!0){t.activeTexture(n.TEXTURE0+z);const de=nt.getPrimaries(nt.workingColorSpace),Te=S.colorSpace===Ii?null:nt.getPrimaries(S.colorSpace),Ae=S.colorSpace===Ii||de===Te?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,S.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,S.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ae);let oe=_(S.image,!1,s.maxTextureSize);oe=Ft(S,oe);const ge=a.convert(S.format,S.colorSpace),Fe=a.convert(S.type);let Ce=x(S.internalFormat,ge,Fe,S.colorSpace,S.isVideoTexture);_e(j,S);let pe;const $e=S.mipmaps,D=S.isVideoTexture!==!0,le=Ne.__version===void 0||ee===!0,he=K.dataReady,xe=C(S,oe);if(S.isDepthTexture)Ce=y(S.format===fr,S.type),le&&(D?t.texStorage2D(n.TEXTURE_2D,1,Ce,oe.width,oe.height):t.texImage2D(n.TEXTURE_2D,0,Ce,oe.width,oe.height,0,ge,Fe,null));else if(S.isDataTexture)if($e.length>0){D&&le&&t.texStorage2D(n.TEXTURE_2D,xe,Ce,$e[0].width,$e[0].height);for(let se=0,J=$e.length;se<J;se++)pe=$e[se],D?he&&t.texSubImage2D(n.TEXTURE_2D,se,0,0,pe.width,pe.height,ge,Fe,pe.data):t.texImage2D(n.TEXTURE_2D,se,Ce,pe.width,pe.height,0,ge,Fe,pe.data);S.generateMipmaps=!1}else D?(le&&t.texStorage2D(n.TEXTURE_2D,xe,Ce,oe.width,oe.height),he&&te(S,oe,ge,Fe)):t.texImage2D(n.TEXTURE_2D,0,Ce,oe.width,oe.height,0,ge,Fe,oe.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){D&&le&&t.texStorage3D(n.TEXTURE_2D_ARRAY,xe,Ce,$e[0].width,$e[0].height,oe.depth);for(let se=0,J=$e.length;se<J;se++)if(pe=$e[se],S.format!==zn)if(ge!==null)if(D){if(he)if(S.layerUpdates.size>0){const we=hf(pe.width,pe.height,S.format,S.type);for(const He of S.layerUpdates){const ft=pe.data.subarray(He*we/pe.data.BYTES_PER_ELEMENT,(He+1)*we/pe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,se,0,0,He,pe.width,pe.height,1,ge,ft)}S.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,se,0,0,0,pe.width,pe.height,oe.depth,ge,pe.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,se,Ce,pe.width,pe.height,oe.depth,0,pe.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else D?he&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,se,0,0,0,pe.width,pe.height,oe.depth,ge,Fe,pe.data):t.texImage3D(n.TEXTURE_2D_ARRAY,se,Ce,pe.width,pe.height,oe.depth,0,ge,Fe,pe.data)}else{D&&le&&t.texStorage2D(n.TEXTURE_2D,xe,Ce,$e[0].width,$e[0].height);for(let se=0,J=$e.length;se<J;se++)pe=$e[se],S.format!==zn?ge!==null?D?he&&t.compressedTexSubImage2D(n.TEXTURE_2D,se,0,0,pe.width,pe.height,ge,pe.data):t.compressedTexImage2D(n.TEXTURE_2D,se,Ce,pe.width,pe.height,0,pe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):D?he&&t.texSubImage2D(n.TEXTURE_2D,se,0,0,pe.width,pe.height,ge,Fe,pe.data):t.texImage2D(n.TEXTURE_2D,se,Ce,pe.width,pe.height,0,ge,Fe,pe.data)}else if(S.isDataArrayTexture)if(D){if(le&&t.texStorage3D(n.TEXTURE_2D_ARRAY,xe,Ce,oe.width,oe.height,oe.depth),he)if(S.layerUpdates.size>0){const se=hf(oe.width,oe.height,S.format,S.type);for(const J of S.layerUpdates){const we=oe.data.subarray(J*se/oe.data.BYTES_PER_ELEMENT,(J+1)*se/oe.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,J,oe.width,oe.height,1,ge,Fe,we)}S.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,oe.width,oe.height,oe.depth,ge,Fe,oe.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Ce,oe.width,oe.height,oe.depth,0,ge,Fe,oe.data);else if(S.isData3DTexture)D?(le&&t.texStorage3D(n.TEXTURE_3D,xe,Ce,oe.width,oe.height,oe.depth),he&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,oe.width,oe.height,oe.depth,ge,Fe,oe.data)):t.texImage3D(n.TEXTURE_3D,0,Ce,oe.width,oe.height,oe.depth,0,ge,Fe,oe.data);else if(S.isFramebufferTexture){if(le)if(D)t.texStorage2D(n.TEXTURE_2D,xe,Ce,oe.width,oe.height);else{let se=oe.width,J=oe.height;for(let we=0;we<xe;we++)t.texImage2D(n.TEXTURE_2D,we,Ce,se,J,0,ge,Fe,null),se>>=1,J>>=1}}else if($e.length>0){if(D&&le){const se=Mt($e[0]);t.texStorage2D(n.TEXTURE_2D,xe,Ce,se.width,se.height)}for(let se=0,J=$e.length;se<J;se++)pe=$e[se],D?he&&t.texSubImage2D(n.TEXTURE_2D,se,0,0,ge,Fe,pe):t.texImage2D(n.TEXTURE_2D,se,Ce,ge,Fe,pe);S.generateMipmaps=!1}else if(D){if(le){const se=Mt(oe);t.texStorage2D(n.TEXTURE_2D,xe,Ce,se.width,se.height)}he&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,ge,Fe,oe)}else t.texImage2D(n.TEXTURE_2D,0,Ce,ge,Fe,oe);m(S)&&p(j),Ne.__version=K.version,S.onUpdate&&S.onUpdate(S)}P.__version=S.version}function Z(P,S,z){if(S.image.length!==6)return;const j=ye(P,S),ee=S.source;t.bindTexture(n.TEXTURE_CUBE_MAP,P.__webglTexture,n.TEXTURE0+z);const K=i.get(ee);if(ee.version!==K.__version||j===!0){t.activeTexture(n.TEXTURE0+z);const Ne=nt.getPrimaries(nt.workingColorSpace),de=S.colorSpace===Ii?null:nt.getPrimaries(S.colorSpace),Te=S.colorSpace===Ii||Ne===de?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,S.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,S.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Te);const Ae=S.isCompressedTexture||S.image[0].isCompressedTexture,oe=S.image[0]&&S.image[0].isDataTexture,ge=[];for(let J=0;J<6;J++)!Ae&&!oe?ge[J]=_(S.image[J],!0,s.maxCubemapSize):ge[J]=oe?S.image[J].image:S.image[J],ge[J]=Ft(S,ge[J]);const Fe=ge[0],Ce=a.convert(S.format,S.colorSpace),pe=a.convert(S.type),$e=x(S.internalFormat,Ce,pe,S.colorSpace),D=S.isVideoTexture!==!0,le=K.__version===void 0||j===!0,he=ee.dataReady;let xe=C(S,Fe);_e(n.TEXTURE_CUBE_MAP,S);let se;if(Ae){D&&le&&t.texStorage2D(n.TEXTURE_CUBE_MAP,xe,$e,Fe.width,Fe.height);for(let J=0;J<6;J++){se=ge[J].mipmaps;for(let we=0;we<se.length;we++){const He=se[we];S.format!==zn?Ce!==null?D?he&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,we,0,0,He.width,He.height,Ce,He.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,we,$e,He.width,He.height,0,He.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):D?he&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,we,0,0,He.width,He.height,Ce,pe,He.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,we,$e,He.width,He.height,0,Ce,pe,He.data)}}}else{if(se=S.mipmaps,D&&le){se.length>0&&xe++;const J=Mt(ge[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,xe,$e,J.width,J.height)}for(let J=0;J<6;J++)if(oe){D?he&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,ge[J].width,ge[J].height,Ce,pe,ge[J].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,$e,ge[J].width,ge[J].height,0,Ce,pe,ge[J].data);for(let we=0;we<se.length;we++){const ft=se[we].image[J].image;D?he&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,we+1,0,0,ft.width,ft.height,Ce,pe,ft.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,we+1,$e,ft.width,ft.height,0,Ce,pe,ft.data)}}else{D?he&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,Ce,pe,ge[J]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,$e,Ce,pe,ge[J]);for(let we=0;we<se.length;we++){const He=se[we];D?he&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,we+1,0,0,Ce,pe,He.image[J]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+J,we+1,$e,Ce,pe,He.image[J])}}}m(S)&&p(n.TEXTURE_CUBE_MAP),K.__version=ee.version,S.onUpdate&&S.onUpdate(S)}P.__version=S.version}function ce(P,S,z,j,ee,K){const Ne=a.convert(z.format,z.colorSpace),de=a.convert(z.type),Te=x(z.internalFormat,Ne,de,z.colorSpace),Ae=i.get(S),oe=i.get(z);if(oe.__renderTarget=S,!Ae.__hasExternalTextures){const ge=Math.max(1,S.width>>K),Fe=Math.max(1,S.height>>K);ee===n.TEXTURE_3D||ee===n.TEXTURE_2D_ARRAY?t.texImage3D(ee,K,Te,ge,Fe,S.depth,0,Ne,de,null):t.texImage2D(ee,K,Te,ge,Fe,0,Ne,de,null)}t.bindFramebuffer(n.FRAMEBUFFER,P),Me(S)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,j,ee,oe.__webglTexture,0,vt(S)):(ee===n.TEXTURE_2D||ee>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ee<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,j,ee,oe.__webglTexture,K),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Le(P,S,z){if(n.bindRenderbuffer(n.RENDERBUFFER,P),S.depthBuffer){const j=S.depthTexture,ee=j&&j.isDepthTexture?j.type:null,K=y(S.stencilBuffer,ee),Ne=S.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,de=vt(S);Me(S)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,de,K,S.width,S.height):z?n.renderbufferStorageMultisample(n.RENDERBUFFER,de,K,S.width,S.height):n.renderbufferStorage(n.RENDERBUFFER,K,S.width,S.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Ne,n.RENDERBUFFER,P)}else{const j=S.textures;for(let ee=0;ee<j.length;ee++){const K=j[ee],Ne=a.convert(K.format,K.colorSpace),de=a.convert(K.type),Te=x(K.internalFormat,Ne,de,K.colorSpace),Ae=vt(S);z&&Me(S)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Ae,Te,S.width,S.height):Me(S)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Ae,Te,S.width,S.height):n.renderbufferStorage(n.RENDERBUFFER,Te,S.width,S.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function ve(P,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,P),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const j=i.get(S.depthTexture);j.__renderTarget=S,(!j.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),G(S.depthTexture,0);const ee=j.__webglTexture,K=vt(S);if(S.depthTexture.format===hr)Me(S)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ee,0,K):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ee,0);else if(S.depthTexture.format===fr)Me(S)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ee,0,K):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ee,0);else throw new Error("Unknown depthTexture format")}function Be(P){const S=i.get(P),z=P.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==P.depthTexture){const j=P.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),j){const ee=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,j.removeEventListener("dispose",ee)};j.addEventListener("dispose",ee),S.__depthDisposeCallback=ee}S.__boundDepthTexture=j}if(P.depthTexture&&!S.__autoAllocateDepthBuffer){if(z)throw new Error("target.depthTexture not supported in Cube render targets");const j=P.texture.mipmaps;j&&j.length>0?ve(S.__webglFramebuffer[0],P):ve(S.__webglFramebuffer,P)}else if(z){S.__webglDepthbuffer=[];for(let j=0;j<6;j++)if(t.bindFramebuffer(n.FRAMEBUFFER,S.__webglFramebuffer[j]),S.__webglDepthbuffer[j]===void 0)S.__webglDepthbuffer[j]=n.createRenderbuffer(),Le(S.__webglDepthbuffer[j],P,!1);else{const ee=P.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,K=S.__webglDepthbuffer[j];n.bindRenderbuffer(n.RENDERBUFFER,K),n.framebufferRenderbuffer(n.FRAMEBUFFER,ee,n.RENDERBUFFER,K)}}else{const j=P.texture.mipmaps;if(j&&j.length>0?t.bindFramebuffer(n.FRAMEBUFFER,S.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=n.createRenderbuffer(),Le(S.__webglDepthbuffer,P,!1);else{const ee=P.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,K=S.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,K),n.framebufferRenderbuffer(n.FRAMEBUFFER,ee,n.RENDERBUFFER,K)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function et(P,S,z){const j=i.get(P);S!==void 0&&ce(j.__webglFramebuffer,P,P.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),z!==void 0&&Be(P)}function N(P){const S=P.texture,z=i.get(P),j=i.get(S);P.addEventListener("dispose",T);const ee=P.textures,K=P.isWebGLCubeRenderTarget===!0,Ne=ee.length>1;if(Ne||(j.__webglTexture===void 0&&(j.__webglTexture=n.createTexture()),j.__version=S.version,r.memory.textures++),K){z.__webglFramebuffer=[];for(let de=0;de<6;de++)if(S.mipmaps&&S.mipmaps.length>0){z.__webglFramebuffer[de]=[];for(let Te=0;Te<S.mipmaps.length;Te++)z.__webglFramebuffer[de][Te]=n.createFramebuffer()}else z.__webglFramebuffer[de]=n.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){z.__webglFramebuffer=[];for(let de=0;de<S.mipmaps.length;de++)z.__webglFramebuffer[de]=n.createFramebuffer()}else z.__webglFramebuffer=n.createFramebuffer();if(Ne)for(let de=0,Te=ee.length;de<Te;de++){const Ae=i.get(ee[de]);Ae.__webglTexture===void 0&&(Ae.__webglTexture=n.createTexture(),r.memory.textures++)}if(P.samples>0&&Me(P)===!1){z.__webglMultisampledFramebuffer=n.createFramebuffer(),z.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let de=0;de<ee.length;de++){const Te=ee[de];z.__webglColorRenderbuffer[de]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,z.__webglColorRenderbuffer[de]);const Ae=a.convert(Te.format,Te.colorSpace),oe=a.convert(Te.type),ge=x(Te.internalFormat,Ae,oe,Te.colorSpace,P.isXRRenderTarget===!0),Fe=vt(P);n.renderbufferStorageMultisample(n.RENDERBUFFER,Fe,ge,P.width,P.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+de,n.RENDERBUFFER,z.__webglColorRenderbuffer[de])}n.bindRenderbuffer(n.RENDERBUFFER,null),P.depthBuffer&&(z.__webglDepthRenderbuffer=n.createRenderbuffer(),Le(z.__webglDepthRenderbuffer,P,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(K){t.bindTexture(n.TEXTURE_CUBE_MAP,j.__webglTexture),_e(n.TEXTURE_CUBE_MAP,S);for(let de=0;de<6;de++)if(S.mipmaps&&S.mipmaps.length>0)for(let Te=0;Te<S.mipmaps.length;Te++)ce(z.__webglFramebuffer[de][Te],P,S,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+de,Te);else ce(z.__webglFramebuffer[de],P,S,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+de,0);m(S)&&p(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ne){for(let de=0,Te=ee.length;de<Te;de++){const Ae=ee[de],oe=i.get(Ae);let ge=n.TEXTURE_2D;(P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(ge=P.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ge,oe.__webglTexture),_e(ge,Ae),ce(z.__webglFramebuffer,P,Ae,n.COLOR_ATTACHMENT0+de,ge,0),m(Ae)&&p(ge)}t.unbindTexture()}else{let de=n.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(de=P.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(de,j.__webglTexture),_e(de,S),S.mipmaps&&S.mipmaps.length>0)for(let Te=0;Te<S.mipmaps.length;Te++)ce(z.__webglFramebuffer[Te],P,S,n.COLOR_ATTACHMENT0,de,Te);else ce(z.__webglFramebuffer,P,S,n.COLOR_ATTACHMENT0,de,0);m(S)&&p(de),t.unbindTexture()}P.depthBuffer&&Be(P)}function lt(P){const S=P.textures;for(let z=0,j=S.length;z<j;z++){const ee=S[z];if(m(ee)){const K=w(P),Ne=i.get(ee).__webglTexture;t.bindTexture(K,Ne),p(K),t.unbindTexture()}}}const Ge=[],Oe=[];function Ee(P){if(P.samples>0){if(Me(P)===!1){const S=P.textures,z=P.width,j=P.height;let ee=n.COLOR_BUFFER_BIT;const K=P.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Ne=i.get(P),de=S.length>1;if(de)for(let Ae=0;Ae<S.length;Ae++)t.bindFramebuffer(n.FRAMEBUFFER,Ne.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ae,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,Ne.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ae,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,Ne.__webglMultisampledFramebuffer);const Te=P.texture.mipmaps;Te&&Te.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ne.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ne.__webglFramebuffer);for(let Ae=0;Ae<S.length;Ae++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(ee|=n.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(ee|=n.STENCIL_BUFFER_BIT)),de){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Ne.__webglColorRenderbuffer[Ae]);const oe=i.get(S[Ae]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,oe,0)}n.blitFramebuffer(0,0,z,j,0,0,z,j,ee,n.NEAREST),l===!0&&(Ge.length=0,Oe.length=0,Ge.push(n.COLOR_ATTACHMENT0+Ae),P.depthBuffer&&P.resolveDepthBuffer===!1&&(Ge.push(K),Oe.push(K),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Oe)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Ge))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),de)for(let Ae=0;Ae<S.length;Ae++){t.bindFramebuffer(n.FRAMEBUFFER,Ne.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ae,n.RENDERBUFFER,Ne.__webglColorRenderbuffer[Ae]);const oe=i.get(S[Ae]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,Ne.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ae,n.TEXTURE_2D,oe,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ne.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&l){const S=P.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[S])}}}function vt(P){return Math.min(s.maxSamples,P.samples)}function Me(P){const S=i.get(P);return P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function Xe(P){const S=r.render.frame;d.get(P)!==S&&(d.set(P,S),P.update())}function Ft(P,S){const z=P.colorSpace,j=P.format,ee=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||z!==pa&&z!==Ii&&(nt.getTransfer(z)===dt?(j!==zn||ee!==ii)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",z)),S}function Mt(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(c.width=P.naturalWidth||P.width,c.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(c.width=P.displayWidth,c.height=P.displayHeight):(c.width=P.width,c.height=P.height),c}this.allocateTextureUnit=O,this.resetTextureUnits=I,this.setTexture2D=G,this.setTexture2DArray=k,this.setTexture3D=Y,this.setTextureCube=H,this.rebindTextures=et,this.setupRenderTarget=N,this.updateRenderTargetMipmap=lt,this.updateMultisampleRenderTarget=Ee,this.setupDepthRenderbuffer=Be,this.setupFrameBufferTexture=ce,this.useMultisampledRTT=Me}function qE(n,e){function t(i,s=Ii){let a;const r=nt.getTransfer(s);if(i===ii)return n.UNSIGNED_BYTE;if(i===Du)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Uu)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Mm)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Tm)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===wm)return n.BYTE;if(i===Em)return n.SHORT;if(i===dr)return n.UNSIGNED_SHORT;if(i===Iu)return n.INT;if(i===ys)return n.UNSIGNED_INT;if(i===fi)return n.FLOAT;if(i===Ir)return n.HALF_FLOAT;if(i===Am)return n.ALPHA;if(i===Cm)return n.RGB;if(i===zn)return n.RGBA;if(i===hr)return n.DEPTH_COMPONENT;if(i===fr)return n.DEPTH_STENCIL;if(i===Rm)return n.RED;if(i===Fu)return n.RED_INTEGER;if(i===Pm)return n.RG;if(i===Ou)return n.RG_INTEGER;if(i===ku)return n.RGBA_INTEGER;if(i===Ro||i===Po||i===Lo||i===No)if(r===dt)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(i===Ro)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Po)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Lo)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===No)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(i===Ro)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Po)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Lo)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===No)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===hd||i===fd||i===pd||i===md)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(i===hd)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===fd)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===pd)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===md)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===gd||i===_d||i===vd)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(i===gd||i===_d)return r===dt?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(i===vd)return r===dt?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===yd||i===bd||i===xd||i===Sd||i===wd||i===Ed||i===Md||i===Td||i===Ad||i===Cd||i===Rd||i===Pd||i===Ld||i===Nd)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(i===yd)return r===dt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===bd)return r===dt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===xd)return r===dt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Sd)return r===dt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===wd)return r===dt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Ed)return r===dt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Md)return r===dt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Td)return r===dt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Ad)return r===dt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Cd)return r===dt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Rd)return r===dt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Pd)return r===dt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Ld)return r===dt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Nd)return r===dt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Id||i===Dd||i===Ud)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(i===Id)return r===dt?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Dd)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Ud)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Fd||i===Od||i===kd||i===Bd)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(i===Fd)return a.COMPRESSED_RED_RGTC1_EXT;if(i===Od)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===kd)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Bd)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===ur?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const YE=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,ZE=`
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

}`;class KE{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new Wm(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new Vi({vertexShader:YE,fragmentShader:ZE,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ze(new an(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class jE extends Es{constructor(e,t){super();const i=this;let s=null,a=1,r=null,o="local-floor",l=1,c=null,d=null,u=null,h=null,f=null,g=null;const _=typeof XRWebGLBinding<"u",m=new KE,p={},w=t.getContextAttributes();let x=null,y=null;const C=[],M=[],T=new ue;let A=null;const v=new Mn;v.viewport=new Et;const b=new Mn;b.viewport=new Et;const R=[v,b],I=new gb;let O=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(V){let Z=C[V];return Z===void 0&&(Z=new hc,C[V]=Z),Z.getTargetRaySpace()},this.getControllerGrip=function(V){let Z=C[V];return Z===void 0&&(Z=new hc,C[V]=Z),Z.getGripSpace()},this.getHand=function(V){let Z=C[V];return Z===void 0&&(Z=new hc,C[V]=Z),Z.getHandSpace()};function G(V){const Z=M.indexOf(V.inputSource);if(Z===-1)return;const ce=C[Z];ce!==void 0&&(ce.update(V.inputSource,V.frame,c||r),ce.dispatchEvent({type:V.type,data:V.inputSource}))}function k(){s.removeEventListener("select",G),s.removeEventListener("selectstart",G),s.removeEventListener("selectend",G),s.removeEventListener("squeeze",G),s.removeEventListener("squeezestart",G),s.removeEventListener("squeezeend",G),s.removeEventListener("end",k),s.removeEventListener("inputsourceschange",Y);for(let V=0;V<C.length;V++){const Z=M[V];Z!==null&&(M[V]=null,C[V].disconnect(Z))}O=null,B=null,m.reset();for(const V in p)delete p[V];e.setRenderTarget(x),f=null,h=null,u=null,s=null,y=null,te.stop(),i.isPresenting=!1,e.setPixelRatio(A),e.setSize(T.width,T.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(V){a=V,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(V){o=V,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||r},this.setReferenceSpace=function(V){c=V},this.getBaseLayer=function(){return h!==null?h:f},this.getBinding=function(){return u===null&&_&&(u=new XRWebGLBinding(s,t)),u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(V){if(s=V,s!==null){if(x=e.getRenderTarget(),s.addEventListener("select",G),s.addEventListener("selectstart",G),s.addEventListener("selectend",G),s.addEventListener("squeeze",G),s.addEventListener("squeezestart",G),s.addEventListener("squeezeend",G),s.addEventListener("end",k),s.addEventListener("inputsourceschange",Y),w.xrCompatible!==!0&&await t.makeXRCompatible(),A=e.getPixelRatio(),e.getSize(T),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let ce=null,Le=null,ve=null;w.depth&&(ve=w.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ce=w.stencil?fr:hr,Le=w.stencil?ur:ys);const Be={colorFormat:t.RGBA8,depthFormat:ve,scaleFactor:a};u=this.getBinding(),h=u.createProjectionLayer(Be),s.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),y=new bs(h.textureWidth,h.textureHeight,{format:zn,type:ii,depthTexture:new $m(h.textureWidth,h.textureHeight,Le,void 0,void 0,void 0,void 0,void 0,void 0,ce),stencilBuffer:w.stencil,colorSpace:e.outputColorSpace,samples:w.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{const ce={antialias:w.antialias,alpha:!0,depth:w.depth,stencil:w.stencil,framebufferScaleFactor:a};f=new XRWebGLLayer(s,t,ce),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new bs(f.framebufferWidth,f.framebufferHeight,{format:zn,type:ii,colorSpace:e.outputColorSpace,stencilBuffer:w.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,r=await s.requestReferenceSpace(o),te.setContext(s),te.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function Y(V){for(let Z=0;Z<V.removed.length;Z++){const ce=V.removed[Z],Le=M.indexOf(ce);Le>=0&&(M[Le]=null,C[Le].disconnect(ce))}for(let Z=0;Z<V.added.length;Z++){const ce=V.added[Z];let Le=M.indexOf(ce);if(Le===-1){for(let Be=0;Be<C.length;Be++)if(Be>=M.length){M.push(ce),Le=Be;break}else if(M[Be]===null){M[Be]=ce,Le=Be;break}if(Le===-1)break}const ve=C[Le];ve&&ve.connect(ce)}}const H=new L,ie=new L;function q(V,Z,ce){H.setFromMatrixPosition(Z.matrixWorld),ie.setFromMatrixPosition(ce.matrixWorld);const Le=H.distanceTo(ie),ve=Z.projectionMatrix.elements,Be=ce.projectionMatrix.elements,et=ve[14]/(ve[10]-1),N=ve[14]/(ve[10]+1),lt=(ve[9]+1)/ve[5],Ge=(ve[9]-1)/ve[5],Oe=(ve[8]-1)/ve[0],Ee=(Be[8]+1)/Be[0],vt=et*Oe,Me=et*Ee,Xe=Le/(-Oe+Ee),Ft=Xe*-Oe;if(Z.matrixWorld.decompose(V.position,V.quaternion,V.scale),V.translateX(Ft),V.translateZ(Xe),V.matrixWorld.compose(V.position,V.quaternion,V.scale),V.matrixWorldInverse.copy(V.matrixWorld).invert(),ve[10]===-1)V.projectionMatrix.copy(Z.projectionMatrix),V.projectionMatrixInverse.copy(Z.projectionMatrixInverse);else{const Mt=et+Xe,P=N+Xe,S=vt-Ft,z=Me+(Le-Ft),j=lt*N/P*Mt,ee=Ge*N/P*Mt;V.projectionMatrix.makePerspective(S,z,j,ee,Mt,P),V.projectionMatrixInverse.copy(V.projectionMatrix).invert()}}function Q(V,Z){Z===null?V.matrixWorld.copy(V.matrix):V.matrixWorld.multiplyMatrices(Z.matrixWorld,V.matrix),V.matrixWorldInverse.copy(V.matrixWorld).invert()}this.updateCamera=function(V){if(s===null)return;let Z=V.near,ce=V.far;m.texture!==null&&(m.depthNear>0&&(Z=m.depthNear),m.depthFar>0&&(ce=m.depthFar)),I.near=b.near=v.near=Z,I.far=b.far=v.far=ce,(O!==I.near||B!==I.far)&&(s.updateRenderState({depthNear:I.near,depthFar:I.far}),O=I.near,B=I.far),I.layers.mask=V.layers.mask|6,v.layers.mask=I.layers.mask&3,b.layers.mask=I.layers.mask&5;const Le=V.parent,ve=I.cameras;Q(I,Le);for(let Be=0;Be<ve.length;Be++)Q(ve[Be],Le);ve.length===2?q(I,v,b):I.projectionMatrix.copy(v.projectionMatrix),_e(V,I,Le)};function _e(V,Z,ce){ce===null?V.matrix.copy(Z.matrixWorld):(V.matrix.copy(ce.matrixWorld),V.matrix.invert(),V.matrix.multiply(Z.matrixWorld)),V.matrix.decompose(V.position,V.quaternion,V.scale),V.updateMatrixWorld(!0),V.projectionMatrix.copy(Z.projectionMatrix),V.projectionMatrixInverse.copy(Z.projectionMatrixInverse),V.isPerspectiveCamera&&(V.fov=pr*2*Math.atan(1/V.projectionMatrix.elements[5]),V.zoom=1)}this.getCamera=function(){return I},this.getFoveation=function(){if(!(h===null&&f===null))return l},this.setFoveation=function(V){l=V,h!==null&&(h.fixedFoveation=V),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=V)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(I)},this.getCameraTexture=function(V){return p[V]};let ye=null;function Pe(V,Z){if(d=Z.getViewerPose(c||r),g=Z,d!==null){const ce=d.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let Le=!1;ce.length!==I.cameras.length&&(I.cameras.length=0,Le=!0);for(let N=0;N<ce.length;N++){const lt=ce[N];let Ge=null;if(f!==null)Ge=f.getViewport(lt);else{const Ee=u.getViewSubImage(h,lt);Ge=Ee.viewport,N===0&&(e.setRenderTargetTextures(y,Ee.colorTexture,Ee.depthStencilTexture),e.setRenderTarget(y))}let Oe=R[N];Oe===void 0&&(Oe=new Mn,Oe.layers.enable(N),Oe.viewport=new Et,R[N]=Oe),Oe.matrix.fromArray(lt.transform.matrix),Oe.matrix.decompose(Oe.position,Oe.quaternion,Oe.scale),Oe.projectionMatrix.fromArray(lt.projectionMatrix),Oe.projectionMatrixInverse.copy(Oe.projectionMatrix).invert(),Oe.viewport.set(Ge.x,Ge.y,Ge.width,Ge.height),N===0&&(I.matrix.copy(Oe.matrix),I.matrix.decompose(I.position,I.quaternion,I.scale)),Le===!0&&I.cameras.push(Oe)}const ve=s.enabledFeatures;if(ve&&ve.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&_){u=i.getBinding();const N=u.getDepthInformation(ce[0]);N&&N.isValid&&N.texture&&m.init(N,s.renderState)}if(ve&&ve.includes("camera-access")&&_){e.state.unbindTexture(),u=i.getBinding();for(let N=0;N<ce.length;N++){const lt=ce[N].camera;if(lt){let Ge=p[lt];Ge||(Ge=new Wm,p[lt]=Ge);const Oe=u.getCameraImage(lt);Ge.sourceTexture=Oe}}}}for(let ce=0;ce<C.length;ce++){const Le=M[ce],ve=C[ce];Le!==null&&ve!==void 0&&ve.update(Le,Z,c||r)}ye&&ye(V,Z),Z.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:Z}),g=null}const te=new ig;te.setAnimationLoop(Pe),this.setAnimationLoop=function(V){ye=V},this.dispose=function(){}}}const ns=new Wn,JE=new yt;function QE(n,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,km(n)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,w,x,y){p.isMeshBasicMaterial||p.isMeshLambertMaterial?a(m,p):p.isMeshToonMaterial?(a(m,p),u(m,p)):p.isMeshPhongMaterial?(a(m,p),d(m,p)):p.isMeshStandardMaterial?(a(m,p),h(m,p),p.isMeshPhysicalMaterial&&f(m,p,y)):p.isMeshMatcapMaterial?(a(m,p),g(m,p)):p.isMeshDepthMaterial?a(m,p):p.isMeshDistanceMaterial?(a(m,p),_(m,p)):p.isMeshNormalMaterial?a(m,p):p.isLineBasicMaterial?(r(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,w,x):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function a(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===ln&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===ln&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const w=e.get(p),x=w.envMap,y=w.envMapRotation;x&&(m.envMap.value=x,ns.copy(y),ns.x*=-1,ns.y*=-1,ns.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(ns.y*=-1,ns.z*=-1),m.envMapRotation.value.setFromMatrix4(JE.makeRotationFromEuler(ns)),m.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function r(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,w,x){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*w,m.scale.value=x*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function d(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function h(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,w){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===ln&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=w.texture,m.transmissionSamplerSize.value.set(w.width,w.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const w=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(w.matrixWorld),m.nearDistance.value=w.shadow.camera.near,m.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function eM(n,e,t,i){let s={},a={},r=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(w,x){const y=x.program;i.uniformBlockBinding(w,y)}function c(w,x){let y=s[w.id];y===void 0&&(g(w),y=d(w),s[w.id]=y,w.addEventListener("dispose",m));const C=x.program;i.updateUBOMapping(w,C);const M=e.render.frame;a[w.id]!==M&&(h(w),a[w.id]=M)}function d(w){const x=u();w.__bindingPointIndex=x;const y=n.createBuffer(),C=w.__size,M=w.usage;return n.bindBuffer(n.UNIFORM_BUFFER,y),n.bufferData(n.UNIFORM_BUFFER,C,M),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,x,y),y}function u(){for(let w=0;w<o;w++)if(r.indexOf(w)===-1)return r.push(w),w;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(w){const x=s[w.id],y=w.uniforms,C=w.__cache;n.bindBuffer(n.UNIFORM_BUFFER,x);for(let M=0,T=y.length;M<T;M++){const A=Array.isArray(y[M])?y[M]:[y[M]];for(let v=0,b=A.length;v<b;v++){const R=A[v];if(f(R,M,v,C)===!0){const I=R.__offset,O=Array.isArray(R.value)?R.value:[R.value];let B=0;for(let G=0;G<O.length;G++){const k=O[G],Y=_(k);typeof k=="number"||typeof k=="boolean"?(R.__data[0]=k,n.bufferSubData(n.UNIFORM_BUFFER,I+B,R.__data)):k.isMatrix3?(R.__data[0]=k.elements[0],R.__data[1]=k.elements[1],R.__data[2]=k.elements[2],R.__data[3]=0,R.__data[4]=k.elements[3],R.__data[5]=k.elements[4],R.__data[6]=k.elements[5],R.__data[7]=0,R.__data[8]=k.elements[6],R.__data[9]=k.elements[7],R.__data[10]=k.elements[8],R.__data[11]=0):(k.toArray(R.__data,B),B+=Y.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,I,R.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function f(w,x,y,C){const M=w.value,T=x+"_"+y;if(C[T]===void 0)return typeof M=="number"||typeof M=="boolean"?C[T]=M:C[T]=M.clone(),!0;{const A=C[T];if(typeof M=="number"||typeof M=="boolean"){if(A!==M)return C[T]=M,!0}else if(A.equals(M)===!1)return A.copy(M),!0}return!1}function g(w){const x=w.uniforms;let y=0;const C=16;for(let T=0,A=x.length;T<A;T++){const v=Array.isArray(x[T])?x[T]:[x[T]];for(let b=0,R=v.length;b<R;b++){const I=v[b],O=Array.isArray(I.value)?I.value:[I.value];for(let B=0,G=O.length;B<G;B++){const k=O[B],Y=_(k),H=y%C,ie=H%Y.boundary,q=H+ie;y+=ie,q!==0&&C-q<Y.storage&&(y+=C-q),I.__data=new Float32Array(Y.storage/Float32Array.BYTES_PER_ELEMENT),I.__offset=y,y+=Y.storage}}}const M=y%C;return M>0&&(y+=C-M),w.__size=y,w.__cache={},this}function _(w){const x={boundary:0,storage:0};return typeof w=="number"||typeof w=="boolean"?(x.boundary=4,x.storage=4):w.isVector2?(x.boundary=8,x.storage=8):w.isVector3||w.isColor?(x.boundary=16,x.storage=12):w.isVector4?(x.boundary=16,x.storage=16):w.isMatrix3?(x.boundary=48,x.storage=48):w.isMatrix4?(x.boundary=64,x.storage=64):w.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",w),x}function m(w){const x=w.target;x.removeEventListener("dispose",m);const y=r.indexOf(x.__bindingPointIndex);r.splice(y,1),n.deleteBuffer(s[x.id]),delete s[x.id],delete a[x.id]}function p(){for(const w in s)n.deleteBuffer(s[w]);r=[],s={},a={}}return{bind:l,update:c,dispose:p}}class tM{constructor(e={}){const{canvas:t=ny(),context:i=null,depth:s=!0,stencil:a=!1,alpha:r=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:h=!1}=e;this.isWebGLRenderer=!0;let f;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=i.getContextAttributes().alpha}else f=r;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,p=null;const w=[],x=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Oi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const y=this;let C=!1;this._outputColorSpace=Vt;let M=0,T=0,A=null,v=-1,b=null;const R=new Et,I=new Et;let O=null;const B=new Ze(0);let G=0,k=t.width,Y=t.height,H=1,ie=null,q=null;const Q=new Et(0,0,k,Y),_e=new Et(0,0,k,Y);let ye=!1;const Pe=new Vu;let te=!1,V=!1;const Z=new yt,ce=new L,Le=new Et,ve={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Be=!1;function et(){return A===null?H:1}let N=i;function lt(E,U){return t.getContext(E,U)}try{const E={alpha:!0,depth:s,stencil:a,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Nu}`),t.addEventListener("webglcontextlost",he,!1),t.addEventListener("webglcontextrestored",xe,!1),t.addEventListener("webglcontextcreationerror",se,!1),N===null){const U="webgl2";if(N=lt(U,E),N===null)throw lt(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let Ge,Oe,Ee,vt,Me,Xe,Ft,Mt,P,S,z,j,ee,K,Ne,de,Te,Ae,oe,ge,Fe,Ce,pe,$e;function D(){Ge=new uw(N),Ge.init(),Ce=new qE(N,Ge),Oe=new sw(N,Ge,e,Ce),Ee=new WE(N,Ge),Oe.reversedDepthBuffer&&h&&Ee.buffers.depth.setReversed(!0),vt=new pw(N),Me=new NE,Xe=new XE(N,Ge,Ee,Me,Oe,Ce,vt),Ft=new rw(y),Mt=new dw(y),P=new bb(N),pe=new nw(N,P),S=new hw(N,P,vt,pe),z=new gw(N,S,P,vt),oe=new mw(N,Oe,Xe),de=new aw(Me),j=new LE(y,Ft,Mt,Ge,Oe,pe,de),ee=new QE(y,Me),K=new DE,Ne=new zE(Ge),Ae=new tw(y,Ft,Mt,Ee,z,f,l),Te=new VE(y,z,Oe),$e=new eM(N,vt,Oe,Ee),ge=new iw(N,Ge,vt),Fe=new fw(N,Ge,vt),vt.programs=j.programs,y.capabilities=Oe,y.extensions=Ge,y.properties=Me,y.renderLists=K,y.shadowMap=Te,y.state=Ee,y.info=vt}D();const le=new jE(y,N);this.xr=le,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const E=Ge.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=Ge.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return H},this.setPixelRatio=function(E){E!==void 0&&(H=E,this.setSize(k,Y,!1))},this.getSize=function(E){return E.set(k,Y)},this.setSize=function(E,U,$=!0){if(le.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}k=E,Y=U,t.width=Math.floor(E*H),t.height=Math.floor(U*H),$===!0&&(t.style.width=E+"px",t.style.height=U+"px"),this.setViewport(0,0,E,U)},this.getDrawingBufferSize=function(E){return E.set(k*H,Y*H).floor()},this.setDrawingBufferSize=function(E,U,$){k=E,Y=U,H=$,t.width=Math.floor(E*$),t.height=Math.floor(U*$),this.setViewport(0,0,E,U)},this.getCurrentViewport=function(E){return E.copy(R)},this.getViewport=function(E){return E.copy(Q)},this.setViewport=function(E,U,$,W){E.isVector4?Q.set(E.x,E.y,E.z,E.w):Q.set(E,U,$,W),Ee.viewport(R.copy(Q).multiplyScalar(H).round())},this.getScissor=function(E){return E.copy(_e)},this.setScissor=function(E,U,$,W){E.isVector4?_e.set(E.x,E.y,E.z,E.w):_e.set(E,U,$,W),Ee.scissor(I.copy(_e).multiplyScalar(H).round())},this.getScissorTest=function(){return ye},this.setScissorTest=function(E){Ee.setScissorTest(ye=E)},this.setOpaqueSort=function(E){ie=E},this.setTransparentSort=function(E){q=E},this.getClearColor=function(E){return E.copy(Ae.getClearColor())},this.setClearColor=function(){Ae.setClearColor(...arguments)},this.getClearAlpha=function(){return Ae.getClearAlpha()},this.setClearAlpha=function(){Ae.setClearAlpha(...arguments)},this.clear=function(E=!0,U=!0,$=!0){let W=0;if(E){let F=!1;if(A!==null){const ae=A.texture.format;F=ae===ku||ae===Ou||ae===Fu}if(F){const ae=A.texture.type,me=ae===ii||ae===ys||ae===dr||ae===ur||ae===Du||ae===Uu,Se=Ae.getClearColor(),be=Ae.getClearAlpha(),Ue=Se.r,ke=Se.g,Ie=Se.b;me?(g[0]=Ue,g[1]=ke,g[2]=Ie,g[3]=be,N.clearBufferuiv(N.COLOR,0,g)):(_[0]=Ue,_[1]=ke,_[2]=Ie,_[3]=be,N.clearBufferiv(N.COLOR,0,_))}else W|=N.COLOR_BUFFER_BIT}U&&(W|=N.DEPTH_BUFFER_BIT),$&&(W|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),N.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",he,!1),t.removeEventListener("webglcontextrestored",xe,!1),t.removeEventListener("webglcontextcreationerror",se,!1),Ae.dispose(),K.dispose(),Ne.dispose(),Me.dispose(),Ft.dispose(),Mt.dispose(),z.dispose(),pe.dispose(),$e.dispose(),j.dispose(),le.dispose(),le.removeEventListener("sessionstart",Xn),le.removeEventListener("sessionend",xh),Zi.stop()};function he(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function xe(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;const E=vt.autoReset,U=Te.enabled,$=Te.autoUpdate,W=Te.needsUpdate,F=Te.type;D(),vt.autoReset=E,Te.enabled=U,Te.autoUpdate=$,Te.needsUpdate=W,Te.type=F}function se(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function J(E){const U=E.target;U.removeEventListener("dispose",J),we(U)}function we(E){He(E),Me.remove(E)}function He(E){const U=Me.get(E).programs;U!==void 0&&(U.forEach(function($){j.releaseProgram($)}),E.isShaderMaterial&&j.releaseShaderCache(E))}this.renderBufferDirect=function(E,U,$,W,F,ae){U===null&&(U=ve);const me=F.isMesh&&F.matrixWorld.determinant()<0,Se=qv(E,U,$,W,F);Ee.setMaterial(W,me);let be=$.index,Ue=1;if(W.wireframe===!0){if(be=S.getWireframeAttribute($),be===void 0)return;Ue=2}const ke=$.drawRange,Ie=$.attributes.position;let Je=ke.start*Ue,ct=(ke.start+ke.count)*Ue;ae!==null&&(Je=Math.max(Je,ae.start*Ue),ct=Math.min(ct,(ae.start+ae.count)*Ue)),be!==null?(Je=Math.max(Je,0),ct=Math.min(ct,be.count)):Ie!=null&&(Je=Math.max(Je,0),ct=Math.min(ct,Ie.count));const wt=ct-Je;if(wt<0||wt===1/0)return;pe.setup(F,W,Se,$,be);let mt,ht=ge;if(be!==null&&(mt=P.get(be),ht=Fe,ht.setIndex(mt)),F.isMesh)W.wireframe===!0?(Ee.setLineWidth(W.wireframeLinewidth*et()),ht.setMode(N.LINES)):ht.setMode(N.TRIANGLES);else if(F.isLine){let De=W.linewidth;De===void 0&&(De=1),Ee.setLineWidth(De*et()),F.isLineSegments?ht.setMode(N.LINES):F.isLineLoop?ht.setMode(N.LINE_LOOP):ht.setMode(N.LINE_STRIP)}else F.isPoints?ht.setMode(N.POINTS):F.isSprite&&ht.setMode(N.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)mr("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ht.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if(Ge.get("WEBGL_multi_draw"))ht.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{const De=F._multiDrawStarts,bt=F._multiDrawCounts,tt=F._multiDrawCount,cn=be?P.get(be).bytesPerElement:1,Cs=Me.get(W).currentProgram.getUniforms();for(let dn=0;dn<tt;dn++)Cs.setValue(N,"_gl_DrawID",dn),ht.render(De[dn]/cn,bt[dn])}else if(F.isInstancedMesh)ht.renderInstances(Je,wt,F.count);else if($.isInstancedBufferGeometry){const De=$._maxInstanceCount!==void 0?$._maxInstanceCount:1/0,bt=Math.min($.instanceCount,De);ht.renderInstances(Je,wt,bt)}else ht.render(Je,wt)};function ft(E,U,$){E.transparent===!0&&E.side===Qe&&E.forceSinglePass===!1?(E.side=ln,E.needsUpdate=!0,Br(E,U,$),E.side=Hi,E.needsUpdate=!0,Br(E,U,$),E.side=Qe):Br(E,U,$)}this.compile=function(E,U,$=null){$===null&&($=E),p=Ne.get($),p.init(U),x.push(p),$.traverseVisible(function(F){F.isLight&&F.layers.test(U.layers)&&(p.pushLight(F),F.castShadow&&p.pushShadow(F))}),E!==$&&E.traverseVisible(function(F){F.isLight&&F.layers.test(U.layers)&&(p.pushLight(F),F.castShadow&&p.pushShadow(F))}),p.setupLights();const W=new Set;return E.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;const ae=F.material;if(ae)if(Array.isArray(ae))for(let me=0;me<ae.length;me++){const Se=ae[me];ft(Se,$,F),W.add(Se)}else ft(ae,$,F),W.add(ae)}),p=x.pop(),W},this.compileAsync=function(E,U,$=null){const W=this.compile(E,U,$);return new Promise(F=>{function ae(){if(W.forEach(function(me){Me.get(me).currentProgram.isReady()&&W.delete(me)}),W.size===0){F(E);return}setTimeout(ae,10)}Ge.get("KHR_parallel_shader_compile")!==null?ae():setTimeout(ae,10)})};let it=null;function ai(E){it&&it(E)}function Xn(){Zi.stop()}function xh(){Zi.start()}const Zi=new ig;Zi.setAnimationLoop(ai),typeof self<"u"&&Zi.setContext(self),this.setAnimationLoop=function(E){it=E,le.setAnimationLoop(E),E===null?Zi.stop():Zi.start()},le.addEventListener("sessionstart",Xn),le.addEventListener("sessionend",xh),this.render=function(E,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),le.enabled===!0&&le.isPresenting===!0&&(le.cameraAutoUpdate===!0&&le.updateCamera(U),U=le.getCamera()),E.isScene===!0&&E.onBeforeRender(y,E,U,A),p=Ne.get(E,x.length),p.init(U),x.push(p),Z.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),Pe.setFromProjectionMatrix(Z,Qn,U.reversedDepth),V=this.localClippingEnabled,te=de.init(this.clippingPlanes,V),m=K.get(E,w.length),m.init(),w.push(m),le.enabled===!0&&le.isPresenting===!0){const ae=y.xr.getDepthSensingMesh();ae!==null&&Vl(ae,U,-1/0,y.sortObjects)}Vl(E,U,0,y.sortObjects),m.finish(),y.sortObjects===!0&&m.sort(ie,q),Be=le.enabled===!1||le.isPresenting===!1||le.hasDepthSensing()===!1,Be&&Ae.addToRenderList(m,E),this.info.render.frame++,te===!0&&de.beginShadows();const $=p.state.shadowsArray;Te.render($,E,U),te===!0&&de.endShadows(),this.info.autoReset===!0&&this.info.reset();const W=m.opaque,F=m.transmissive;if(p.setupLights(),U.isArrayCamera){const ae=U.cameras;if(F.length>0)for(let me=0,Se=ae.length;me<Se;me++){const be=ae[me];wh(W,F,E,be)}Be&&Ae.render(E);for(let me=0,Se=ae.length;me<Se;me++){const be=ae[me];Sh(m,E,be,be.viewport)}}else F.length>0&&wh(W,F,E,U),Be&&Ae.render(E),Sh(m,E,U);A!==null&&T===0&&(Xe.updateMultisampleRenderTarget(A),Xe.updateRenderTargetMipmap(A)),E.isScene===!0&&E.onAfterRender(y,E,U),pe.resetDefaultState(),v=-1,b=null,x.pop(),x.length>0?(p=x[x.length-1],te===!0&&de.setGlobalState(y.clippingPlanes,p.state.camera)):p=null,w.pop(),w.length>0?m=w[w.length-1]:m=null};function Vl(E,U,$,W){if(E.visible===!1)return;if(E.layers.test(U.layers)){if(E.isGroup)$=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(U);else if(E.isLight)p.pushLight(E),E.castShadow&&p.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||Pe.intersectsSprite(E)){W&&Le.setFromMatrixPosition(E.matrixWorld).applyMatrix4(Z);const me=z.update(E),Se=E.material;Se.visible&&m.push(E,me,Se,$,Le.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||Pe.intersectsObject(E))){const me=z.update(E),Se=E.material;if(W&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),Le.copy(E.boundingSphere.center)):(me.boundingSphere===null&&me.computeBoundingSphere(),Le.copy(me.boundingSphere.center)),Le.applyMatrix4(E.matrixWorld).applyMatrix4(Z)),Array.isArray(Se)){const be=me.groups;for(let Ue=0,ke=be.length;Ue<ke;Ue++){const Ie=be[Ue],Je=Se[Ie.materialIndex];Je&&Je.visible&&m.push(E,me,Je,$,Le.z,Ie)}}else Se.visible&&m.push(E,me,Se,$,Le.z,null)}}const ae=E.children;for(let me=0,Se=ae.length;me<Se;me++)Vl(ae[me],U,$,W)}function Sh(E,U,$,W){const F=E.opaque,ae=E.transmissive,me=E.transparent;p.setupLightsView($),te===!0&&de.setGlobalState(y.clippingPlanes,$),W&&Ee.viewport(R.copy(W)),F.length>0&&kr(F,U,$),ae.length>0&&kr(ae,U,$),me.length>0&&kr(me,U,$),Ee.buffers.depth.setTest(!0),Ee.buffers.depth.setMask(!0),Ee.buffers.color.setMask(!0),Ee.setPolygonOffset(!1)}function wh(E,U,$,W){if(($.isScene===!0?$.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[W.id]===void 0&&(p.state.transmissionRenderTarget[W.id]=new bs(1,1,{generateMipmaps:!0,type:Ge.has("EXT_color_buffer_half_float")||Ge.has("EXT_color_buffer_float")?Ir:ii,minFilter:ps,samples:4,stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:nt.workingColorSpace}));const ae=p.state.transmissionRenderTarget[W.id],me=W.viewport||R;ae.setSize(me.z*y.transmissionResolutionScale,me.w*y.transmissionResolutionScale);const Se=y.getRenderTarget(),be=y.getActiveCubeFace(),Ue=y.getActiveMipmapLevel();y.setRenderTarget(ae),y.getClearColor(B),G=y.getClearAlpha(),G<1&&y.setClearColor(16777215,.5),y.clear(),Be&&Ae.render($);const ke=y.toneMapping;y.toneMapping=Oi;const Ie=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),p.setupLightsView(W),te===!0&&de.setGlobalState(y.clippingPlanes,W),kr(E,$,W),Xe.updateMultisampleRenderTarget(ae),Xe.updateRenderTargetMipmap(ae),Ge.has("WEBGL_multisampled_render_to_texture")===!1){let Je=!1;for(let ct=0,wt=U.length;ct<wt;ct++){const mt=U[ct],ht=mt.object,De=mt.geometry,bt=mt.material,tt=mt.group;if(bt.side===Qe&&ht.layers.test(W.layers)){const cn=bt.side;bt.side=ln,bt.needsUpdate=!0,Eh(ht,$,W,De,bt,tt),bt.side=cn,bt.needsUpdate=!0,Je=!0}}Je===!0&&(Xe.updateMultisampleRenderTarget(ae),Xe.updateRenderTargetMipmap(ae))}y.setRenderTarget(Se,be,Ue),y.setClearColor(B,G),Ie!==void 0&&(W.viewport=Ie),y.toneMapping=ke}function kr(E,U,$){const W=U.isScene===!0?U.overrideMaterial:null;for(let F=0,ae=E.length;F<ae;F++){const me=E[F],Se=me.object,be=me.geometry,Ue=me.group;let ke=me.material;ke.allowOverride===!0&&W!==null&&(ke=W),Se.layers.test($.layers)&&Eh(Se,U,$,be,ke,Ue)}}function Eh(E,U,$,W,F,ae){E.onBeforeRender(y,U,$,W,F,ae),E.modelViewMatrix.multiplyMatrices($.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),F.onBeforeRender(y,U,$,W,E,ae),F.transparent===!0&&F.side===Qe&&F.forceSinglePass===!1?(F.side=ln,F.needsUpdate=!0,y.renderBufferDirect($,U,W,F,E,ae),F.side=Hi,F.needsUpdate=!0,y.renderBufferDirect($,U,W,F,E,ae),F.side=Qe):y.renderBufferDirect($,U,W,F,E,ae),E.onAfterRender(y,U,$,W,F,ae)}function Br(E,U,$){U.isScene!==!0&&(U=ve);const W=Me.get(E),F=p.state.lights,ae=p.state.shadowsArray,me=F.state.version,Se=j.getParameters(E,F.state,ae,U,$),be=j.getProgramCacheKey(Se);let Ue=W.programs;W.environment=E.isMeshStandardMaterial?U.environment:null,W.fog=U.fog,W.envMap=(E.isMeshStandardMaterial?Mt:Ft).get(E.envMap||W.environment),W.envMapRotation=W.environment!==null&&E.envMap===null?U.environmentRotation:E.envMapRotation,Ue===void 0&&(E.addEventListener("dispose",J),Ue=new Map,W.programs=Ue);let ke=Ue.get(be);if(ke!==void 0){if(W.currentProgram===ke&&W.lightsStateVersion===me)return Th(E,Se),ke}else Se.uniforms=j.getUniforms(E),E.onBeforeCompile(Se,y),ke=j.acquireProgram(Se,be),Ue.set(be,ke),W.uniforms=Se.uniforms;const Ie=W.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Ie.clippingPlanes=de.uniform),Th(E,Se),W.needsLights=Zv(E),W.lightsStateVersion=me,W.needsLights&&(Ie.ambientLightColor.value=F.state.ambient,Ie.lightProbe.value=F.state.probe,Ie.directionalLights.value=F.state.directional,Ie.directionalLightShadows.value=F.state.directionalShadow,Ie.spotLights.value=F.state.spot,Ie.spotLightShadows.value=F.state.spotShadow,Ie.rectAreaLights.value=F.state.rectArea,Ie.ltc_1.value=F.state.rectAreaLTC1,Ie.ltc_2.value=F.state.rectAreaLTC2,Ie.pointLights.value=F.state.point,Ie.pointLightShadows.value=F.state.pointShadow,Ie.hemisphereLights.value=F.state.hemi,Ie.directionalShadowMap.value=F.state.directionalShadowMap,Ie.directionalShadowMatrix.value=F.state.directionalShadowMatrix,Ie.spotShadowMap.value=F.state.spotShadowMap,Ie.spotLightMatrix.value=F.state.spotLightMatrix,Ie.spotLightMap.value=F.state.spotLightMap,Ie.pointShadowMap.value=F.state.pointShadowMap,Ie.pointShadowMatrix.value=F.state.pointShadowMatrix),W.currentProgram=ke,W.uniformsList=null,ke}function Mh(E){if(E.uniformsList===null){const U=E.currentProgram.getUniforms();E.uniformsList=Io.seqWithValue(U.seq,E.uniforms)}return E.uniformsList}function Th(E,U){const $=Me.get(E);$.outputColorSpace=U.outputColorSpace,$.batching=U.batching,$.batchingColor=U.batchingColor,$.instancing=U.instancing,$.instancingColor=U.instancingColor,$.instancingMorph=U.instancingMorph,$.skinning=U.skinning,$.morphTargets=U.morphTargets,$.morphNormals=U.morphNormals,$.morphColors=U.morphColors,$.morphTargetsCount=U.morphTargetsCount,$.numClippingPlanes=U.numClippingPlanes,$.numIntersection=U.numClipIntersection,$.vertexAlphas=U.vertexAlphas,$.vertexTangents=U.vertexTangents,$.toneMapping=U.toneMapping}function qv(E,U,$,W,F){U.isScene!==!0&&(U=ve),Xe.resetTextureUnits();const ae=U.fog,me=W.isMeshStandardMaterial?U.environment:null,Se=A===null?y.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:pa,be=(W.isMeshStandardMaterial?Mt:Ft).get(W.envMap||me),Ue=W.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,ke=!!$.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),Ie=!!$.morphAttributes.position,Je=!!$.morphAttributes.normal,ct=!!$.morphAttributes.color;let wt=Oi;W.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(wt=y.toneMapping);const mt=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,ht=mt!==void 0?mt.length:0,De=Me.get(W),bt=p.state.lights;if(te===!0&&(V===!0||E!==b)){const qt=E===b&&W.id===v;de.setState(W,E,qt)}let tt=!1;W.version===De.__version?(De.needsLights&&De.lightsStateVersion!==bt.state.version||De.outputColorSpace!==Se||F.isBatchedMesh&&De.batching===!1||!F.isBatchedMesh&&De.batching===!0||F.isBatchedMesh&&De.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&De.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&De.instancing===!1||!F.isInstancedMesh&&De.instancing===!0||F.isSkinnedMesh&&De.skinning===!1||!F.isSkinnedMesh&&De.skinning===!0||F.isInstancedMesh&&De.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&De.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&De.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&De.instancingMorph===!1&&F.morphTexture!==null||De.envMap!==be||W.fog===!0&&De.fog!==ae||De.numClippingPlanes!==void 0&&(De.numClippingPlanes!==de.numPlanes||De.numIntersection!==de.numIntersection)||De.vertexAlphas!==Ue||De.vertexTangents!==ke||De.morphTargets!==Ie||De.morphNormals!==Je||De.morphColors!==ct||De.toneMapping!==wt||De.morphTargetsCount!==ht)&&(tt=!0):(tt=!0,De.__version=W.version);let cn=De.currentProgram;tt===!0&&(cn=Br(W,U,F));let Cs=!1,dn=!1,La=!1;const xt=cn.getUniforms(),xn=De.uniforms;if(Ee.useProgram(cn.program)&&(Cs=!0,dn=!0,La=!0),W.id!==v&&(v=W.id,dn=!0),Cs||b!==E){Ee.buffers.depth.getReversed()&&E.reversedDepth!==!0&&(E._reversedDepth=!0,E.updateProjectionMatrix()),xt.setValue(N,"projectionMatrix",E.projectionMatrix),xt.setValue(N,"viewMatrix",E.matrixWorldInverse);const Qt=xt.map.cameraPosition;Qt!==void 0&&Qt.setValue(N,ce.setFromMatrixPosition(E.matrixWorld)),Oe.logarithmicDepthBuffer&&xt.setValue(N,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&xt.setValue(N,"isOrthographic",E.isOrthographicCamera===!0),b!==E&&(b=E,dn=!0,La=!0)}if(F.isSkinnedMesh){xt.setOptional(N,F,"bindMatrix"),xt.setOptional(N,F,"bindMatrixInverse");const qt=F.skeleton;qt&&(qt.boneTexture===null&&qt.computeBoneTexture(),xt.setValue(N,"boneTexture",qt.boneTexture,Xe))}F.isBatchedMesh&&(xt.setOptional(N,F,"batchingTexture"),xt.setValue(N,"batchingTexture",F._matricesTexture,Xe),xt.setOptional(N,F,"batchingIdTexture"),xt.setValue(N,"batchingIdTexture",F._indirectTexture,Xe),xt.setOptional(N,F,"batchingColorTexture"),F._colorsTexture!==null&&xt.setValue(N,"batchingColorTexture",F._colorsTexture,Xe));const Sn=$.morphAttributes;if((Sn.position!==void 0||Sn.normal!==void 0||Sn.color!==void 0)&&oe.update(F,$,cn),(dn||De.receiveShadow!==F.receiveShadow)&&(De.receiveShadow=F.receiveShadow,xt.setValue(N,"receiveShadow",F.receiveShadow)),W.isMeshGouraudMaterial&&W.envMap!==null&&(xn.envMap.value=be,xn.flipEnvMap.value=be.isCubeTexture&&be.isRenderTargetTexture===!1?-1:1),W.isMeshStandardMaterial&&W.envMap===null&&U.environment!==null&&(xn.envMapIntensity.value=U.environmentIntensity),dn&&(xt.setValue(N,"toneMappingExposure",y.toneMappingExposure),De.needsLights&&Yv(xn,La),ae&&W.fog===!0&&ee.refreshFogUniforms(xn,ae),ee.refreshMaterialUniforms(xn,W,H,Y,p.state.transmissionRenderTarget[E.id]),Io.upload(N,Mh(De),xn,Xe)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(Io.upload(N,Mh(De),xn,Xe),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&xt.setValue(N,"center",F.center),xt.setValue(N,"modelViewMatrix",F.modelViewMatrix),xt.setValue(N,"normalMatrix",F.normalMatrix),xt.setValue(N,"modelMatrix",F.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){const qt=W.uniformsGroups;for(let Qt=0,$l=qt.length;Qt<$l;Qt++){const Ki=qt[Qt];$e.update(Ki,cn),$e.bind(Ki,cn)}}return cn}function Yv(E,U){E.ambientLightColor.needsUpdate=U,E.lightProbe.needsUpdate=U,E.directionalLights.needsUpdate=U,E.directionalLightShadows.needsUpdate=U,E.pointLights.needsUpdate=U,E.pointLightShadows.needsUpdate=U,E.spotLights.needsUpdate=U,E.spotLightShadows.needsUpdate=U,E.rectAreaLights.needsUpdate=U,E.hemisphereLights.needsUpdate=U}function Zv(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return M},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(E,U,$){const W=Me.get(E);W.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,W.__autoAllocateDepthBuffer===!1&&(W.__useRenderToTexture=!1),Me.get(E.texture).__webglTexture=U,Me.get(E.depthTexture).__webglTexture=W.__autoAllocateDepthBuffer?void 0:$,W.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,U){const $=Me.get(E);$.__webglFramebuffer=U,$.__useDefaultFramebuffer=U===void 0};const Kv=N.createFramebuffer();this.setRenderTarget=function(E,U=0,$=0){A=E,M=U,T=$;let W=!0,F=null,ae=!1,me=!1;if(E){const be=Me.get(E);if(be.__useDefaultFramebuffer!==void 0)Ee.bindFramebuffer(N.FRAMEBUFFER,null),W=!1;else if(be.__webglFramebuffer===void 0)Xe.setupRenderTarget(E);else if(be.__hasExternalTextures)Xe.rebindTextures(E,Me.get(E.texture).__webglTexture,Me.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const Ie=E.depthTexture;if(be.__boundDepthTexture!==Ie){if(Ie!==null&&Me.has(Ie)&&(E.width!==Ie.image.width||E.height!==Ie.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Xe.setupDepthRenderbuffer(E)}}const Ue=E.texture;(Ue.isData3DTexture||Ue.isDataArrayTexture||Ue.isCompressedArrayTexture)&&(me=!0);const ke=Me.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(ke[U])?F=ke[U][$]:F=ke[U],ae=!0):E.samples>0&&Xe.useMultisampledRTT(E)===!1?F=Me.get(E).__webglMultisampledFramebuffer:Array.isArray(ke)?F=ke[$]:F=ke,R.copy(E.viewport),I.copy(E.scissor),O=E.scissorTest}else R.copy(Q).multiplyScalar(H).floor(),I.copy(_e).multiplyScalar(H).floor(),O=ye;if($!==0&&(F=Kv),Ee.bindFramebuffer(N.FRAMEBUFFER,F)&&W&&Ee.drawBuffers(E,F),Ee.viewport(R),Ee.scissor(I),Ee.setScissorTest(O),ae){const be=Me.get(E.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+U,be.__webglTexture,$)}else if(me){const be=U;for(let Ue=0;Ue<E.textures.length;Ue++){const ke=Me.get(E.textures[Ue]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+Ue,ke.__webglTexture,$,be)}}else if(E!==null&&$!==0){const be=Me.get(E.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,be.__webglTexture,$)}v=-1},this.readRenderTargetPixels=function(E,U,$,W,F,ae,me,Se=0){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let be=Me.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&me!==void 0&&(be=be[me]),be){Ee.bindFramebuffer(N.FRAMEBUFFER,be);try{const Ue=E.textures[Se],ke=Ue.format,Ie=Ue.type;if(!Oe.textureFormatReadable(ke)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Oe.textureTypeReadable(Ie)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=E.width-W&&$>=0&&$<=E.height-F&&(E.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+Se),N.readPixels(U,$,W,F,Ce.convert(ke),Ce.convert(Ie),ae))}finally{const Ue=A!==null?Me.get(A).__webglFramebuffer:null;Ee.bindFramebuffer(N.FRAMEBUFFER,Ue)}}},this.readRenderTargetPixelsAsync=async function(E,U,$,W,F,ae,me,Se=0){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let be=Me.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&me!==void 0&&(be=be[me]),be)if(U>=0&&U<=E.width-W&&$>=0&&$<=E.height-F){Ee.bindFramebuffer(N.FRAMEBUFFER,be);const Ue=E.textures[Se],ke=Ue.format,Ie=Ue.type;if(!Oe.textureFormatReadable(ke))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Oe.textureTypeReadable(Ie))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Je=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,Je),N.bufferData(N.PIXEL_PACK_BUFFER,ae.byteLength,N.STREAM_READ),E.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+Se),N.readPixels(U,$,W,F,Ce.convert(ke),Ce.convert(Ie),0);const ct=A!==null?Me.get(A).__webglFramebuffer:null;Ee.bindFramebuffer(N.FRAMEBUFFER,ct);const wt=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await iy(N,wt,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,Je),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,ae),N.deleteBuffer(Je),N.deleteSync(wt),ae}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(E,U=null,$=0){const W=Math.pow(2,-$),F=Math.floor(E.image.width*W),ae=Math.floor(E.image.height*W),me=U!==null?U.x:0,Se=U!==null?U.y:0;Xe.setTexture2D(E,0),N.copyTexSubImage2D(N.TEXTURE_2D,$,0,0,me,Se,F,ae),Ee.unbindTexture()};const jv=N.createFramebuffer(),Jv=N.createFramebuffer();this.copyTextureToTexture=function(E,U,$=null,W=null,F=0,ae=null){ae===null&&(F!==0?(mr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ae=F,F=0):ae=0);let me,Se,be,Ue,ke,Ie,Je,ct,wt;const mt=E.isCompressedTexture?E.mipmaps[ae]:E.image;if($!==null)me=$.max.x-$.min.x,Se=$.max.y-$.min.y,be=$.isBox3?$.max.z-$.min.z:1,Ue=$.min.x,ke=$.min.y,Ie=$.isBox3?$.min.z:0;else{const Sn=Math.pow(2,-F);me=Math.floor(mt.width*Sn),Se=Math.floor(mt.height*Sn),E.isDataArrayTexture?be=mt.depth:E.isData3DTexture?be=Math.floor(mt.depth*Sn):be=1,Ue=0,ke=0,Ie=0}W!==null?(Je=W.x,ct=W.y,wt=W.z):(Je=0,ct=0,wt=0);const ht=Ce.convert(U.format),De=Ce.convert(U.type);let bt;U.isData3DTexture?(Xe.setTexture3D(U,0),bt=N.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(Xe.setTexture2DArray(U,0),bt=N.TEXTURE_2D_ARRAY):(Xe.setTexture2D(U,0),bt=N.TEXTURE_2D),N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,U.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,U.unpackAlignment);const tt=N.getParameter(N.UNPACK_ROW_LENGTH),cn=N.getParameter(N.UNPACK_IMAGE_HEIGHT),Cs=N.getParameter(N.UNPACK_SKIP_PIXELS),dn=N.getParameter(N.UNPACK_SKIP_ROWS),La=N.getParameter(N.UNPACK_SKIP_IMAGES);N.pixelStorei(N.UNPACK_ROW_LENGTH,mt.width),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,mt.height),N.pixelStorei(N.UNPACK_SKIP_PIXELS,Ue),N.pixelStorei(N.UNPACK_SKIP_ROWS,ke),N.pixelStorei(N.UNPACK_SKIP_IMAGES,Ie);const xt=E.isDataArrayTexture||E.isData3DTexture,xn=U.isDataArrayTexture||U.isData3DTexture;if(E.isDepthTexture){const Sn=Me.get(E),qt=Me.get(U),Qt=Me.get(Sn.__renderTarget),$l=Me.get(qt.__renderTarget);Ee.bindFramebuffer(N.READ_FRAMEBUFFER,Qt.__webglFramebuffer),Ee.bindFramebuffer(N.DRAW_FRAMEBUFFER,$l.__webglFramebuffer);for(let Ki=0;Ki<be;Ki++)xt&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Me.get(E).__webglTexture,F,Ie+Ki),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Me.get(U).__webglTexture,ae,wt+Ki)),N.blitFramebuffer(Ue,ke,me,Se,Je,ct,me,Se,N.DEPTH_BUFFER_BIT,N.NEAREST);Ee.bindFramebuffer(N.READ_FRAMEBUFFER,null),Ee.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(F!==0||E.isRenderTargetTexture||Me.has(E)){const Sn=Me.get(E),qt=Me.get(U);Ee.bindFramebuffer(N.READ_FRAMEBUFFER,jv),Ee.bindFramebuffer(N.DRAW_FRAMEBUFFER,Jv);for(let Qt=0;Qt<be;Qt++)xt?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Sn.__webglTexture,F,Ie+Qt):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Sn.__webglTexture,F),xn?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,qt.__webglTexture,ae,wt+Qt):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,qt.__webglTexture,ae),F!==0?N.blitFramebuffer(Ue,ke,me,Se,Je,ct,me,Se,N.COLOR_BUFFER_BIT,N.NEAREST):xn?N.copyTexSubImage3D(bt,ae,Je,ct,wt+Qt,Ue,ke,me,Se):N.copyTexSubImage2D(bt,ae,Je,ct,Ue,ke,me,Se);Ee.bindFramebuffer(N.READ_FRAMEBUFFER,null),Ee.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else xn?E.isDataTexture||E.isData3DTexture?N.texSubImage3D(bt,ae,Je,ct,wt,me,Se,be,ht,De,mt.data):U.isCompressedArrayTexture?N.compressedTexSubImage3D(bt,ae,Je,ct,wt,me,Se,be,ht,mt.data):N.texSubImage3D(bt,ae,Je,ct,wt,me,Se,be,ht,De,mt):E.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,ae,Je,ct,me,Se,ht,De,mt.data):E.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,ae,Je,ct,mt.width,mt.height,ht,mt.data):N.texSubImage2D(N.TEXTURE_2D,ae,Je,ct,me,Se,ht,De,mt);N.pixelStorei(N.UNPACK_ROW_LENGTH,tt),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,cn),N.pixelStorei(N.UNPACK_SKIP_PIXELS,Cs),N.pixelStorei(N.UNPACK_SKIP_ROWS,dn),N.pixelStorei(N.UNPACK_SKIP_IMAGES,La),ae===0&&U.generateMipmaps&&N.generateMipmap(bt),Ee.unbindTexture()},this.initRenderTarget=function(E){Me.get(E).__webglFramebuffer===void 0&&Xe.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?Xe.setTextureCube(E,0):E.isData3DTexture?Xe.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?Xe.setTexture2DArray(E,0):Xe.setTexture2D(E,0),Ee.unbindTexture()},this.resetState=function(){M=0,T=0,A=null,Ee.reset(),pe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Qn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=nt._getDrawingBufferColorSpace(e),t.unpackColorSpace=nt._getUnpackColorSpace()}}const Of={type:"change"},Ku={type:"start"},lg={type:"end"},_o=new Gu,kf=new Li,nM=Math.cos(70*pt.DEG2RAD),Lt=new L,en=2*Math.PI,ut={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Ac=1e-6;class iM extends vb{constructor(e,t=null){super(e,t),this.state=ut.NONE,this.target=new L,this.cursor=new L,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:na.ROTATE,MIDDLE:na.DOLLY,RIGHT:na.PAN},this.touches={ONE:Ks.ROTATE,TWO:Ks.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new L,this._lastQuaternion=new Gi,this._lastTargetPosition=new L,this._quat=new Gi().setFromUnitVectors(e.up,new L(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new df,this._sphericalDelta=new df,this._scale=1,this._panOffset=new L,this._rotateStart=new ue,this._rotateEnd=new ue,this._rotateDelta=new ue,this._panStart=new ue,this._panEnd=new ue,this._panDelta=new ue,this._dollyStart=new ue,this._dollyEnd=new ue,this._dollyDelta=new ue,this._dollyDirection=new L,this._mouse=new ue,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=aM.bind(this),this._onPointerDown=sM.bind(this),this._onPointerUp=rM.bind(this),this._onContextMenu=fM.bind(this),this._onMouseWheel=cM.bind(this),this._onKeyDown=dM.bind(this),this._onTouchStart=uM.bind(this),this._onTouchMove=hM.bind(this),this._onMouseDown=oM.bind(this),this._onMouseMove=lM.bind(this),this._interceptControlDown=pM.bind(this),this._interceptControlUp=mM.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Of),this.update(),this.state=ut.NONE}update(e=null){const t=this.object.position;Lt.copy(t).sub(this.target),Lt.applyQuaternion(this._quat),this._spherical.setFromVector3(Lt),this.autoRotate&&this.state===ut.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=en:i>Math.PI&&(i-=en),s<-Math.PI?s+=en:s>Math.PI&&(s-=en),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let a=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const r=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),a=r!=this._spherical.radius}if(Lt.setFromSpherical(this._spherical),Lt.applyQuaternion(this._quatInverse),t.copy(this.target).add(Lt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let r=null;if(this.object.isPerspectiveCamera){const o=Lt.length();r=this._clampDistance(o*this._scale);const l=o-r;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),a=!!l}else if(this.object.isOrthographicCamera){const o=new L(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),a=l!==this.object.zoom;const c=new L(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),r=Lt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;r!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(r).add(this.object.position):(_o.origin.copy(this.object.position),_o.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(_o.direction))<nM?this.object.lookAt(this.target):(kf.setFromNormalAndCoplanarPoint(this.object.up,this.target),_o.intersectPlane(kf,this.target))))}else if(this.object.isOrthographicCamera){const r=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),r!==this.object.zoom&&(this.object.updateProjectionMatrix(),a=!0)}return this._scale=1,this._performCursorZoom=!1,a||this._lastPosition.distanceToSquared(this.object.position)>Ac||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Ac||this._lastTargetPosition.distanceToSquared(this.target)>Ac?(this.dispatchEvent(Of),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?en/60*this.autoRotateSpeed*e:en/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Lt.setFromMatrixColumn(t,0),Lt.multiplyScalar(-e),this._panOffset.add(Lt)}_panUp(e,t){this.screenSpacePanning===!0?Lt.setFromMatrixColumn(t,1):(Lt.setFromMatrixColumn(t,0),Lt.crossVectors(this.object.up,Lt)),Lt.multiplyScalar(e),this._panOffset.add(Lt)}_pan(e,t){const i=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;Lt.copy(s).sub(this.target);let a=Lt.length();a*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*a/i.clientHeight,this.object.matrix),this._panUp(2*t*a/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),s=e-i.left,a=t-i.top,r=i.width,o=i.height;this._mouse.x=s/r*2-1,this._mouse.y=-(a/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(en*this._rotateDelta.x/t.clientHeight),this._rotateUp(en*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(en*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-en*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(en*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-en*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(i,s)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,s=e.pageY-t.y,a=Math.sqrt(i*i+s*s);this._dollyStart.set(0,a)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),a=.5*(e.pageY+i.y);this._rotateEnd.set(s,a)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(en*this._rotateDelta.x/t.clientHeight),this._rotateUp(en*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,s=e.pageY-t.y,a=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,a),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const r=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(r,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new ue,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function sM(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n)))}function aM(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function rM(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(lg),this.state=ut.NONE;break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function oM(n){let e;switch(n.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case na.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=ut.DOLLY;break;case na.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=ut.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=ut.ROTATE}break;case na.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=ut.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=ut.PAN}break;default:this.state=ut.NONE}this.state!==ut.NONE&&this.dispatchEvent(Ku)}function lM(n){switch(this.state){case ut.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case ut.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case ut.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function cM(n){this.enabled===!1||this.enableZoom===!1||this.state!==ut.NONE||(n.preventDefault(),this.dispatchEvent(Ku),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(lg))}function dM(n){this.enabled!==!1&&this._handleKeyDown(n)}function uM(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case Ks.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=ut.TOUCH_ROTATE;break;case Ks.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=ut.TOUCH_PAN;break;default:this.state=ut.NONE}break;case 2:switch(this.touches.TWO){case Ks.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=ut.TOUCH_DOLLY_PAN;break;case Ks.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=ut.TOUCH_DOLLY_ROTATE;break;default:this.state=ut.NONE}break;default:this.state=ut.NONE}this.state!==ut.NONE&&this.dispatchEvent(Ku)}function hM(n){switch(this._trackPointer(n),this.state){case ut.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case ut.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case ut.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case ut.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=ut.NONE}}function fM(n){this.enabled!==!1&&n.preventDefault()}function pM(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function mM(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const ju=1,Do=.32,Bf=1024,gM=16;function zf(n){const e=new rt({color:n,transparent:!0,opacity:ju,side:Qe});return e.forceSinglePass=!0,e}function _M(n){return new eg({color:n,side:Qe,transparent:!0,opacity:ju})}function qs(n,e,t,i){return new ze(new Ms(n,t,e,6,1,6),i)}function Cc(n,e,t,i,s,a,r,o){n.beginPath();for(let l=0;l<=e;l+=8){const c=l/e,d=i*t+Math.sin(c*Math.PI*2+a)*s+Math.sin(c*Math.PI*4+a*.5)*s*.35;l===0?n.moveTo(l,d):n.lineTo(l,d)}n.lineWidth=r,n.strokeStyle=o,n.stroke()}function Rc(n,e,t,i,s,a,r,o){n.beginPath();for(let l=0;l<=t;l+=8){const c=l/t,d=i*e+Math.sin(c*Math.PI*2+a)*s+Math.sin(c*Math.PI*6+a*.3)*s*.18;l===0?n.moveTo(d,l):n.lineTo(d,l)}n.lineWidth=r,n.strokeStyle=o,n.stroke()}function Pc(n,e,t,i,s,a){n.beginPath(),n.arc(e,t,i,0,Math.PI*2),n.fillStyle=s,n.fill(),n.lineWidth=Math.max(6,i*.15),n.strokeStyle=a,n.stroke()}function vM(n){const e=document.createElement("canvas");e.width=Bf,e.height=Bf;const t=e.getContext("2d");if(!t)throw new Error("Unable to create ball texture canvas");const{width:i,height:s}=e,a=t.createLinearGradient(0,0,i,s);a.addColorStop(0,"#faf7ee"),a.addColorStop(.55,"#e7e1d0"),a.addColorStop(1,"#d5cfbe"),t.fillStyle=a,t.fillRect(0,0,i,s),t.globalAlpha=.22;for(let l=0;l<28;l+=1){const c=l/27*s;t.fillStyle=l%2===0?"#ffffff":"#d3cbb6",t.fillRect(0,c,i,s/54)}t.globalAlpha=1;const r="#2d313b";t.lineCap="round",Cc(t,i,s,.24,22,.35,18,r),Cc(t,i,s,.5,14,1.1,20,r),Cc(t,i,s,.77,20,2.35,18,r),Rc(t,i,s,.2,24,.2,18,r),Rc(t,i,s,.48,18,1.6,18,r),Rc(t,i,s,.76,26,2.7,18,r),t.globalAlpha=.92,Pc(t,i*.28,s*.32,88,"#f1a63a","#fff4d7"),Pc(t,i*.68,s*.6,72,"#4db0ff","#eef8ff"),Pc(t,i*.76,s*.2,54,"#1f232c","#f0ece1"),t.globalAlpha=1,t.beginPath(),t.moveTo(i*.08,s*.86),t.quadraticCurveTo(i*.28,s*.72,i*.42,s*.8),t.quadraticCurveTo(i*.58,s*.9,i*.82,s*.78),t.lineWidth=24,t.strokeStyle="rgba(255, 246, 220, 0.9)",t.stroke();const o=new Al(e);return o.colorSpace=Vt,o.anisotropy=Math.min(8,n.capabilities.getMaxAnisotropy()),o}function yM(n,e,t,i){return new ze(new Ms(n,e,t,6,6,1),i)}function bM(n){const e=10280*n,t=8240*n,i=1960*n,s=1e3*n,a=1900*n,r=800*n,o=900*n,l=Math.max(1,n),c=[],d=[1,-1];function u(_,m,p=null){const w=_.material.clone();return _.material=w,c.push({mesh:_,material:w,outwardLocal:m.clone().normalize(),fixedOpacity:p}),_}function h(_){const m=new _t,p=zf(_),w=t/2-s-a/2,x=Math.sqrt(2*Math.pow(s,2));for(const C of d){const M=u(qs(w,i,l,p),new L(0,1,0));M.position.set(C*(w/2+a/2),0,i/2),m.add(M);const T=u(qs(x,i,l,p),new L(0,1,0));T.position.set(C*(t/2-s/2),-s/2,i/2),T.rotateZ(-C*Math.PI/4),m.add(T)}const y=u(qs(a,i-r,l,p),new L(0,1,0));return y.position.set(0,0,i/2+r/2),m.add(y),m}function f(_,m){const p=new _t,w=[[t/2,0],[-t/2,0],[-t/2,e/2-s],[-t/2+s,e/2],[-a/2,e/2],[-a/2,e/2+o],[a/2,e/2+o],[a/2,e/2],[t/2-s,e/2],[t/2,e/2-s],[t/2,0]],x=new qu;w.forEach(([b,R],I)=>{I===0?x.moveTo(b,R):x.lineTo(b,R)});const y=_M(_),C=zf(_),M=u(new ze(new Rl(x),y),new L(0,0,-1));M.receiveShadow=!0,p.add(M);for(const b of d){const R=u(qs(o,r,l,C),new L(0,-b,0),Do);R.position.set(b*a/2,e/2+o/2,r/2),R.rotateZ(Math.PI/2),p.add(R)}const T=u(yM(a,o,l,C),new L(0,0,1),Do);T.position.set(0,e/2+o/2,r),p.add(T);const A=u(qs(a,r,l,C),new L(0,1,0),Do);A.position.set(0,e/2+o,r/2),p.add(A);const v=h(_);v.position.y=e/2,p.add(v);for(const b of d){const R=u(qs(e/2-s,i,l,C),new L(0,-b,0));R.position.set(b*t/2,(e/2-s)/2,i/2),R.rotateZ(Math.PI/2),p.add(R)}return m&&p.rotateZ(Math.PI),p}const g=new _t;return g.add(f(16771251,!1)),g.add(f(8381439,!0)),{stadium:g,wallPanels:c}}function xM(n){const e=[[100,-100,100],[100,100,100],[-100,100,100],[-100,-100,100],[150,-220,20],[-150,-220,20],[130,-400,-20],[-130,-400,-20],[140,170,25],[-140,170,25],[130,240,25],[-130,240,25],[130,-400,-80],[-130,-400,-80],[150,-220,-80],[-150,-220,-80],[140,170,-80],[-140,170,-80],[130,240,-80],[-130,240,-80]],t=[[0,1,2],[0,2,3],[4,0,5],[0,3,5],[6,4,5],[6,5,7],[1,8,9],[1,9,2],[4,8,1],[4,1,0],[3,2,9],[3,9,5],[8,10,11],[8,11,9],[12,6,7],[12,7,13],[7,5,15],[7,15,13],[6,14,4],[12,14,6],[14,16,4],[4,16,8],[5,9,15],[15,9,17],[16,18,8],[8,18,10],[9,11,17],[17,11,19],[10,18,11],[11,18,19],[14,12,13],[14,13,15],[16,14,15],[16,15,17],[18,16,17],[18,17,19]],i=new Tt;i.setAttribute("position",new st(e.flat(),3)),i.setIndex(t.flat()),i.computeVertexNormals();const s=new _t,a=new _t,r=new ze(i,new eg({color:n}));r.castShadow=!0,a.add(r);const o=new il({color:1710894,shininess:120,transparent:!0,opacity:.82}),l=[[100,-100,100],[-100,-100,100],[150,-220,20],[-150,-220,20],[100,100,100],[-100,100,100],[140,170,25],[-140,170,25],[100,-100,100],[100,100,100],[150,-220,20],[140,170,25],[-100,-100,100],[-100,100,100],[-150,-220,20],[-140,170,25]],c=[[0,2,3],[0,3,1],[4,6,7],[4,7,5],[8,10,11],[8,11,9],[12,14,15],[12,15,13]],d=new Tt;d.setAttribute("position",new st(l.flat(),3)),d.setIndex(c.flat()),d.computeVertexNormals();const u=new ze(d,o);u.position.z=1,a.add(u);const h=new rt({color:8968191,transparent:!0,opacity:.34,side:Qe}),f=new Tt;f.setAttribute("position",new st([90,-110,95,-90,-110,95,140,-210,25,-140,-210,25],3)),f.setIndex([0,2,3,0,3,1]),f.computeVertexNormals();const g=new ze(f,h);g.position.z=2,a.add(g);const _=new il({color:2236962,shininess:48}),m=(p,w,x,y)=>{const C=new ze(new Cl(70,70,y,10),_);return C.rotateZ(Math.PI/2),C.position.set(p,w,x),C.castShadow=!0,C};return a.add(m(120,-300,-60,50)),a.add(m(-120,-300,-60,50)),a.add(m(120,150,-60,70)),a.add(m(-120,150,-60,70)),a.position.set(0,0,50),a.rotateZ(Math.PI/2),a.scale.set(.35,.35,.35),s.add(a),s}function SM(){const n=new _t;n.visible=!1,n.position.set(-124,0,8);const e=new gr(30,220,14,1,!0);e.rotateZ(Math.PI/2),e.translate(-110,0,0);const t=new gr(17,150,12,1,!0);t.rotateZ(Math.PI/2),t.translate(-75,0,0);const i=new _a(21,12,12),s=[-38,38];for(const a of s){const r=new _t;r.position.set(0,a,0);const o=new rt({color:"#ff9b2f",transparent:!0,opacity:.42,blending:Fi,depthWrite:!1,side:Qe});o.forceSinglePass=!0;const l=new ze(e,o);l.name="outer-flame",r.add(l);const c=new rt({color:"#fff2ba",transparent:!0,opacity:.9,blending:Fi,depthWrite:!1,side:Qe});c.forceSinglePass=!0;const d=new ze(t,c);d.name="inner-flame",r.add(d);const u=new rt({color:"#fff8db",transparent:!0,opacity:.62,blending:Fi,depthWrite:!1});u.forceSinglePass=!0;const h=new ze(i,u);h.name="glow",h.position.x=-10,r.add(h),n.add(r)}return n}function wM(){const n=new _t;n.visible=!1,n.position.set(0,0,235);const e=240,t=82,i=188,s=20,a=new an(e,t),r=new rt({color:463645,transparent:!0,opacity:.78,side:Qe,depthWrite:!1}),o=new ze(a,r);o.position.z=-1,n.add(o);const l=new an(i,s),c=new rt({color:1385521,transparent:!0,opacity:.92,side:Qe,depthWrite:!1}),d=new ze(l,c);d.position.y=-18,n.add(d);const u=new an(i,s),h=new rt({color:16761415,transparent:!0,opacity:.98,side:Qe,depthWrite:!1}),f=new ze(u,h);f.position.y=-18,n.add(f);const g=document.createElement("canvas");g.width=512,g.height=160;const _=g.getContext("2d");if(!_)throw new Error("Unable to create boost meter label context");const m=new Al(g);m.colorSpace=Vt,m.needsUpdate=!0;const p=new an(190,48),w=new rt({map:m,transparent:!0,depthWrite:!1,side:Qe}),x=new ze(p,w);return x.position.set(0,15,0),n.add(x),{group:n,fillMesh:f,fillMaterial:h,labelTexture:m,labelContext:_,labelCanvas:g,lastPercent:null}}function EM(){const n=new _t;n.visible=!1;const e=new rt({color:16765276,transparent:!0,opacity:.86,depthWrite:!1}),t=new ze(new Yu(170,8,8,48),e);t.position.z=16,n.add(t);const i=document.createElement("canvas");i.width=512,i.height=192;const s=i.getContext("2d");if(!s)throw new Error("Unable to create demo indicator label context");s.textAlign="center",s.textBaseline="middle",s.lineJoin="round",s.font="800 86px sans-serif",s.lineWidth=20,s.strokeStyle="rgba(7, 19, 29, 0.94)",s.strokeText("DEMO",i.width/2,88),s.fillStyle="#fff0b8",s.fillText("DEMO",i.width/2,88),s.font="700 34px sans-serif",s.lineWidth=10,s.strokeText("RESPAWNING",i.width/2,150),s.fillStyle="#ffbd4a",s.fillText("RESPAWNING",i.width/2,150);const a=new Al(i);a.colorSpace=Vt;const r=new rt({map:a,transparent:!0,depthWrite:!1,side:Qe}),o=new ze(new an(310,116),r);return o.position.z=300,n.add(o),{group:n,ring:t,label:o}}function MM(n,e,t,i){n.fillMesh.scale.x=Math.max(.001,e);const s=94;n.fillMesh.position.x=-(1-e)*s,n.fillMesh.position.y=-18;const a=Math.max(0,Math.min(100,Math.round(t/255*100)));if(n.lastPercent!==a){const{labelContext:r,labelCanvas:o,labelTexture:l}=n;r.clearRect(0,0,o.width,o.height),r.textAlign="center",r.textBaseline="middle",r.lineJoin="round",r.font="700 84px sans-serif",r.lineWidth=18,r.strokeStyle="rgba(7, 19, 29, 0.92)",r.strokeText(`${a}`,o.width/2,78),r.fillStyle="#fff8e1",r.fillText(`${a}`,o.width/2,78),r.font="600 30px sans-serif",r.lineWidth=10,r.strokeText("BOOST",o.width/2,130),r.fillStyle="#ffcf70",r.fillText("BOOST",o.width/2,130),l.needsUpdate=!0,n.lastPercent=a}n.group.quaternion.copy(i.quaternion)}function TM(n){n.add(new mb("#d8ecff",1.6));const e=new cf("#fff6df",2.4);e.position.set(4e3,-6e3,5e3),n.add(e);const t=new cf("#97d7ff",1.2);t.position.set(-5e3,4e3,3e3),n.add(t)}function AM(n){const e=vM(n),t=new il({color:16777215,map:e,shininess:42,specular:new Ze("#f7f2e3")});return{mesh:new ze(new _a(93,24,24),t),texture:e}}function CM(n,e,t){const i=new Cy;i.background=new Ze("#081119");const s=new Mn(48,1,10*t,5e5*t);s.up.set(0,0,1),s.position.set(0,-9e3*t,5e3*t),s.lookAt(0,0,0);const a=new tM({antialias:!0});a.setPixelRatio(window.devicePixelRatio),a.domElement.style.display="block",a.domElement.style.width="100%",a.domElement.style.height="100%",a.domElement.tabIndex=0,a.domElement.setAttribute("aria-label","Replay player viewport"),n.replaceChildren(a.domElement);const r=new iM(s,a.domElement);r.enableDamping=!0,r.maxDistance=16e4*t,r.keyPanSpeed=gM,r.target.set(0,0,600*t),r.listenToKeyEvents(a.domElement),r.update();const o=()=>{a.domElement.focus()};a.domElement.addEventListener("pointerdown",o);const{stadium:l,wallPanels:c}=bM(t);i.add(l),TM(i);const d=new _t;d.scale.set(-t,t,t),i.add(d);const{mesh:u,texture:h}=AM(a);d.add(u);const f=new Map,g=new Map,_=new Map,m=new Map;for(const A of e.players){const v=xM(A.isTeamZero?"#57a8ff":"#ff9c40"),b=SM();v.add(b);const R=wM();v.add(R.group);const I=EM();d.add(v),d.add(I.group),f.set(A.id,v),g.set(A.id,b),_.set(A.id,R),m.set(A.id,I)}const p=()=>{const A=n.clientWidth||1,v=n.clientHeight||1;s.aspect=A/v,s.updateProjectionMatrix(),a.setSize(A,v,!1)};p();const w=new L,x=new L,y=new Gi,C=new L;return{scene:i,replayRoot:d,camera:s,renderer:a,controls:r,resize:p,dispose:()=>{a.domElement.removeEventListener("pointerdown",o),r.stopListenToKeyEvents(),r.dispose(),h.dispose(),a.dispose(),n.replaceChildren()},ballMesh:u,playerMeshes:f,playerBoostTrails:g,playerBoostMeters:_,playerDemoIndicators:m,updateWallVisibility:()=>{i.updateMatrixWorld(!0);for(const A of c){if(A.fixedOpacity!==null){A.material.transparent=!0,A.material.opacity=A.fixedOpacity,A.material.depthWrite=!1;continue}A.mesh.getWorldPosition(w),A.mesh.getWorldQuaternion(y),x.copy(A.outwardLocal).applyQuaternion(y).normalize(),C.copy(s.position).sub(w);const v=x.dot(C)>0;A.material.transparent=!0,A.material.opacity=v?Do:ju,A.material.depthWrite=!v}}}}function Wa(n,e){if(n.frames.length===0)return 0;let t=0,i=n.frames.length-1;for(;t<=i;){const s=Math.floor((t+i)/2),a=n.frames[s]?.time??0;if(a<e)t=s+1;else if(a>e)i=s-1;else return s}return Math.max(0,t-1)}function RM(n,e){return n.frames.length===0?0:pt.clamp(Math.round(e),0,n.frames.length-1)}function PM(n){if(n.frames.length===0)return null;const e=new Map;for(const s of n.frames)e.set(s.gameState,(e.get(s.gameState)??0)+1);let t=null,i=-1;for(const[s,a]of e.entries())a<=i||(t=s,i=a);return t}function LM(n,e){if(e===null)return null;for(const t of n.frames){if(t.gameState===e)break;return t.gameState}return null}function cg(n,e){return e===null?n.kickoffCountdown<=0:n.gameState===e}function Ju(n,e){return n.kickoffCountdown>0?!0:e!==null&&n.gameState===e}function NM(n,e){return n.ballFrames[e]?.position?!0:n.players.some(t=>t.frames[e]?.position)}function IM(n,e,t,i){return Ju(e,i)&&NM(n,t)}function Uo(n,e,t,i,s){return!cg(e,i)&&!IM(n,e,t,s)}function Hf(n,e,t,i,s,a,r){return i&&Uo(n,e,t,a,r)||s&&Ju(e,r)}function DM(n,e,t,i,s){const a=[],{frames:r}=n;if(r.length===0||!e&&!t)return a;let o=0;for(;o<r.length;){const l=r[o];if(!l||!Hf(n,l,o,e,t,i,s)){o+=1;continue}const c=l.time;let d=o+1;for(;d<r.length&&Hf(n,r[d],d,e,t,i,s);)d+=1;const u=r[d]?.time??n.duration;if(u>c){const h=a.at(-1);h&&h.endTime>=c?h.endTime=Math.max(h.endTime,u):a.push({startTime:c,endTime:u})}o=d}return a}function UM(n,e,t){const i=pt.clamp(t,0,n);let s=0;for(const a of e){if(i<a.startTime)break;if(i<a.endTime)return{replayTime:i,timelineTime:a.startTime-s,seekTime:a.startTime,hiddenBySkip:!0};s+=a.endTime-a.startTime}return{replayTime:i,timelineTime:i-s,seekTime:i,hiddenBySkip:!1}}function FM(n,e,t,i){const s=pt.clamp(i,0,e);let a=0;for(const r of t){const o=r.startTime-a;if(s<=o)return s+a;a+=r.endTime-r.startTime}return pt.clamp(s+a,0,n)}function OM(n,e){const t=e.at(-1);return!t||t.endTime<n?n:pt.clamp(t.startTime,0,n)}function kM(n,e,t){const i=n.frames[e];if(!i||i.kickoffCountdown<=0)return null;let s=e;for(;s>0&&(n.frames[s-1]?.kickoffCountdown??0)>0;)s-=1;let a=e+1;for(;a<n.frames.length&&n.frames[a].kickoffCountdown>0;)a+=1;let r=0;for(let c=s;c<a;c+=1)r=Math.max(r,n.frames[c].kickoffCountdown);const o=n.frames[a]?.time??n.duration,l=Math.max(0,o-t);return{kind:"kickoff-countdown",countdown:Math.max(1,Math.min(r,Math.ceil(l))),secondsRemaining:l,endsAt:o}}function BM(n,e){const t=Wa(n,e),i=Math.min(t+1,n.frames.length-1);if(i===t)return{frameIndex:t,nextFrameIndex:i,alpha:0};const s=n.frames[t]?.time??0,a=n.frames[i]?.time??s;return a<=s?{frameIndex:t,nextFrameIndex:i,alpha:0}:{frameIndex:t,nextFrameIndex:i,alpha:pt.clamp((e-s)/(a-s),0,1)}}const zM=1.4,Ys=.18,vo=.14,HM=120,Gf=90,GM=40,VM=45,$M=.58,Vf=.82,WM=132,dg=new L(-1,0,0),us=new L(0,0,1),XM=new L(-1,0,0),qM=new L(0,0,18800),YM=new L(0,0,700),ZM=new L(-9600,-12600,6400),KM=new L(0,0,900),sl=48,jM=16,JM=16,QM=.003,eT=.05;function $f(n,e,t){return n?!e||t<=0?n:{x:pt.lerp(n.x,e.x,t),y:pt.lerp(n.y,e.y,t),z:pt.lerp(n.z,e.z,t)}:e}function Lc(n){return new L(n.x,n.y,n.z)}function ug(n,e){return new L(-n.x*e,n.y*e,n.z*e)}function Nc(n){return new L(-n.x,n.y,n.z).normalize()}function tT(n,e){switch(n){case"overhead":return{position:qM.clone().multiplyScalar(e),target:YM.clone().multiplyScalar(e),up:XM.clone(),fov:sl};case"side":return{position:ZM.clone().multiplyScalar(e),target:KM.clone().multiplyScalar(e),up:us.clone(),fov:sl}}}function nT(n){const{fov:e,position:t,sceneState:i,target:s,up:a}=n,{camera:r,controls:o}=i;o.enabled=!1,r.position.lerp(t,vo),o.target.lerp(s,vo),r.up.lerp(a,vo).normalize(),r.fov=pt.lerp(r.fov,e,vo),r.updateProjectionMatrix(),r.lookAt(o.target);const l=r.position.distanceToSquared(t)<=jM,c=o.target.distanceToSquared(s)<=JM,d=r.up.angleTo(a)<=QM,u=Math.abs(r.fov-e)<=eT;return!l||!c||!d||!u?!1:(r.position.copy(t),o.target.copy(s),r.up.copy(a).normalize(),r.fov=e,r.updateProjectionMatrix(),r.lookAt(s),o.enabled=!0,!0)}function iT(n){const e=n.linearVelocity?Nc(n.linearVelocity):null,t=n.forward?Nc(n.forward):null,i=n.up?Nc(n.up):null;if((n.position?.z??1/0)<HM){const l=(t??e??dg.clone()).clone().setZ(0);if(l.lengthSq()<1e-4)return null;l.normalize(),e&&e.lengthSq()>1e-4&&l.dot(e)<0&&l.negate();const c=new L().crossVectors(us,l).normalize(),d=new L().crossVectors(l,c).normalize();return{forward:l,up:d,right:c}}if(!t||!i)return null;const a=t.clone().normalize(),r=new L().crossVectors(i,a).normalize(),o=new L().crossVectors(a,r).normalize();return{forward:a,up:o,right:r}}function sT(n){const{cameraViewMode:e,attachedPlayerId:t,ballCamEnabled:i,ballPosition:s,cameraDistanceScale:a,customCameraSettings:r,desiredCameraPosition:o,desiredLookTarget:l,fieldScale:c,frameIndex:d,replay:u,sceneState:h}=n,f=h.controls;if(e==="free"){f.enabled=!0,h.camera.fov=pt.lerp(h.camera.fov,sl,Ys),h.camera.updateProjectionMatrix();return}if(!t){f.enabled=!0,h.camera.fov=pt.lerp(h.camera.fov,sl,Ys),h.camera.updateProjectionMatrix();return}const g=u.players.find(O=>O.id===t),_=g?.frames[d];if(!g||!_?.position||_.isPresent===!1){f.enabled=!0;return}f.enabled=!1;const m=ug(_.position,c),p=iT(_),w=p?.forward??dg.clone(),x=p?.right??new L(0,1,0),y={...g.cameraSettings,...r??{}},C=(y.distance??270)*c*a,M=(y.height??100)*c*zM,T=pt.degToRad(y.pitch??-4),A=w.clone().applyAxisAngle(x,T).normalize(),v=m.clone().addScaledVector(us,M),b=w.clone().multiplyScalar(-C).addScaledVector(us,M).applyAxisAngle(x,T),R=m.clone().addScaledVector(us,GM*c);let I=y.fov??110;if(i&&s){const O=s.clone().addScaledVector(us,VM*c),B=O.clone().sub(R),G=(B.lengthSq()>1e-4?B.normalize():A.clone()).multiplyScalar(Vf).addScaledVector(A,1-Vf).normalize();l.copy(R).lerp(O,$M),o.copy(v).addScaledVector(G,-C),o.z=Math.max(Gf*c,o.z);const k=R.clone().sub(o),Y=O.clone().sub(o);if(k.lengthSq()>1e-4&&Y.lengthSq()>1e-4){const H=k.angleTo(Y);I=Math.min(WM,Math.max(I,pt.radToDeg(H)*1.7))}}else o.copy(R).add(b),o.z=Math.max(Gf*c,o.z),l.copy(R);h.camera.position.lerp(o,Ys),h.camera.up.lerp(us,Ys).normalize(),f.target.lerp(l,Ys),h.camera.fov=pt.lerp(h.camera.fov,I,Ys),h.camera.updateProjectionMatrix(),h.camera.lookAt(f.target)}const aT=1,rT=2.25,yo="free",Wf=3.2;function is(n){return typeof n=="number"&&Number.isFinite(n)?n:void 0}function Ic(n){if(!n)return null;const e={},t=is(n.fov),i=is(n.height),s=is(n.pitch),a=is(n.distance),r=is(n.stiffness),o=is(n.swivelSpeed),l=is(n.transitionSpeed);return t!==void 0&&(e.fov=t),i!==void 0&&(e.height=i),s!==void 0&&(e.pitch=s),a!==void 0&&(e.distance=a),r!==void 0&&(e.stiffness=r),o!==void 0&&(e.swivelSpeed=o),l!==void 0&&(e.transitionSpeed=l),e}function oT(n){return!!n?.position&&n?.isPresent!==!1}class lT extends EventTarget{container;replay;options;sceneState;beforeRenderCallbacks=[];plugins=[];fieldScale;desiredCameraPosition=new L;desiredLookTarget=new L;boundWindowResize=()=>this.sceneState.resize();liveGameState;kickoffGameState;timelineSegmentsCacheKey=null;timelineSegmentsCache=[];timelineDurationCache=0;resizeObserver=null;animationFrameId=null;disposed=!1;playing=!1;speed=1;currentTime=0;playbackStartedAt=0;playbackStartedTime=0;cameraDistanceScale;customCameraSettings;cameraViewMode;freeCameraTransition=null;attachedPlayerId;ballCamEnabled;boostMeterEnabled;boostPickupAnimationEnabled;skipPostGoalTransitionsEnabled;skipKickoffsEnabled;constructor(e,t,i={}){super(),this.container=e,this.replay=t,this.options=i,this.fieldScale=i.fieldScale??aT,this.sceneState=CM(e,t,this.fieldScale),this.liveGameState=PM(t),this.kickoffGameState=LM(t,this.liveGameState),this.speed=Math.max(.1,i.initialPlaybackRate??1),this.cameraDistanceScale=Math.max(.25,i.initialCameraDistanceScale??rT),this.customCameraSettings=Ic(i.initialCustomCameraSettings),this.attachedPlayerId=i.initialAttachedPlayerId??null,this.cameraViewMode=i.initialCameraViewMode??(this.attachedPlayerId?"follow":yo),this.ballCamEnabled=i.initialBallCamEnabled??!1,this.boostMeterEnabled=i.initialBoostMeterEnabled??!1,this.boostPickupAnimationEnabled=i.initialBoostPickupAnimationEnabled??!0,this.skipPostGoalTransitionsEnabled=i.initialSkipPostGoalTransitionsEnabled??!0,this.skipKickoffsEnabled=i.initialSkipKickoffsEnabled??!1,this.skipPostGoalTransitionIfNeeded(),this.skipPastKickoffIfNeeded(),this.installResizeHandling();for(const s of i.plugins??[])this.installPlugin(s,!1);this.render(),this.scheduleAnimationFrame(),this.emitChange(),i.autoplay&&this.play()}play(){this.playing||(this.playing=!0,this.reanchorPlaybackClock(),this.emitChange())}pause(){this.playing&&(this.syncPlaybackClock(),this.playing=!1,this.emitChange())}togglePlayback(){this.playing?this.pause():this.play()}setPlaybackRate(e){this.playing&&this.syncPlaybackClock(),this.speed=Math.max(.1,e),this.playing&&this.reanchorPlaybackClock(),this.emitChange()}setCameraDistanceScale(e){this.cameraDistanceScale=Math.max(.25,e),this.render(),this.emitChange()}setCustomCameraSettings(e){this.customCameraSettings=Ic(e),this.render(),this.emitChange()}setAttachedPlayer(e){this.attachedPlayerId=e,this.cameraViewMode=e?"follow":yo,this.freeCameraTransition=null,this.render(),this.emitChange()}setCameraViewMode(e){this.cameraViewMode=e,this.freeCameraTransition=null,this.render(),this.emitChange()}setFreeCameraPreset(e){const{fov:t,position:i,target:s,up:a}=tT(e,this.fieldScale);this.cameraViewMode=yo,this.freeCameraTransition={position:i,target:s,up:a,fov:t},this.render(),this.emitChange()}setBallCamEnabled(e){this.ballCamEnabled=e,this.render(),this.emitChange()}setBoostMeterEnabled(e){if(this.boostMeterEnabled=e,!e)for(const t of this.sceneState.playerBoostMeters.values())t.group.visible=!1;this.render(),this.emitChange()}setBoostPickupAnimationEnabled(e){this.boostPickupAnimationEnabled=e,this.render(),this.emitChange()}setSkipPostGoalTransitionsEnabled(e){this.skipPostGoalTransitionsEnabled=e,e&&this.skipPostGoalTransitionIfNeeded(),this.render(),this.emitChange()}setSkipKickoffsEnabled(e){this.skipKickoffsEnabled=e,e&&(this.skipPostGoalTransitionIfNeeded(),this.skipPastKickoffIfNeeded()),this.render(),this.emitChange()}seek(e){this.currentTime=pt.clamp(e,0,this.getPlaybackEndTime()),this.skipPostGoalTransitionIfNeeded(),this.skipPastKickoffIfNeeded(),this.playing&&this.reanchorPlaybackClock(),this.render(),this.emitChange()}setFrameIndex(e){const t=RM(this.replay,e),i=this.replay.frames[t]?.time??0,s=this.playing,a=this.currentTime!==i||s;this.playing=!1,this.currentTime=i,this.render(),a&&this.emitChange()}stepFrames(e){if(!Number.isFinite(e)||this.replay.frames.length===0)return;const t=Wa(this.replay,this.currentTime);this.setFrameIndex(t+Math.trunc(e))}stepForwardFrame(){this.stepFrames(1)}stepBackwardFrame(){this.stepFrames(-1)}setState(e){const t=performance.now();if(e.speed!==void 0&&(this.playing&&this.syncPlaybackClock(t),this.speed=Math.max(.1,e.speed)),e.cameraDistanceScale!==void 0&&(this.cameraDistanceScale=Math.max(.25,e.cameraDistanceScale)),e.customCameraSettings!==void 0&&(this.customCameraSettings=Ic(e.customCameraSettings)),e.cameraViewMode!==void 0&&(this.cameraViewMode=e.cameraViewMode),e.attachedPlayerId!==void 0&&(this.attachedPlayerId=e.attachedPlayerId,e.cameraViewMode===void 0&&(this.cameraViewMode=this.attachedPlayerId?"follow":yo)),e.ballCamEnabled!==void 0&&(this.ballCamEnabled=e.ballCamEnabled),e.boostMeterEnabled!==void 0&&(this.boostMeterEnabled=e.boostMeterEnabled,!this.boostMeterEnabled))for(const i of this.sceneState.playerBoostMeters.values())i.group.visible=!1;e.boostPickupAnimationEnabled!==void 0&&(this.boostPickupAnimationEnabled=e.boostPickupAnimationEnabled),e.skipPostGoalTransitionsEnabled!==void 0&&(this.skipPostGoalTransitionsEnabled=e.skipPostGoalTransitionsEnabled),e.skipKickoffsEnabled!==void 0&&(this.skipKickoffsEnabled=e.skipKickoffsEnabled),e.currentTime!==void 0&&(this.currentTime=pt.clamp(e.currentTime,0,this.getPlaybackEndTime())),e.playing!==void 0&&e.playing!==this.playing&&(e.playing?this.playing=!0:(e.currentTime===void 0&&this.syncPlaybackClock(t),this.playing=!1)),this.playing&&this.reanchorPlaybackClock(t),this.skipPostGoalTransitionIfNeeded(t),this.skipPastKickoffIfNeeded(t),this.render(),this.emitChange()}getState(){const e=Wa(this.replay,this.currentTime);return{currentTime:this.currentTime,duration:this.replay.duration,frameIndex:e,activeMetadata:this.getActiveMetadata(e,this.currentTime),playing:this.playing,speed:this.speed,cameraDistanceScale:this.cameraDistanceScale,customCameraSettings:this.customCameraSettings,cameraViewMode:this.cameraViewMode,attachedPlayerId:this.attachedPlayerId,ballCamEnabled:this.ballCamEnabled,boostMeterEnabled:this.boostMeterEnabled,boostPickupAnimationEnabled:this.boostPickupAnimationEnabled,skipPostGoalTransitionsEnabled:this.skipPostGoalTransitionsEnabled,skipKickoffsEnabled:this.skipKickoffsEnabled}}getSnapshot(){return this.getState()}getTimelineDuration(){return this.getTimelineSegments().length===0?this.replay.duration:this.timelineDurationCache}getTimelineCurrentTime(){return this.projectReplayTimeToTimeline(this.currentTime).timelineTime}getTimelineSegments(){const e=`${this.skipPostGoalTransitionsEnabled}:${this.skipKickoffsEnabled}`;return this.timelineSegmentsCacheKey===e?this.timelineSegmentsCache:(this.timelineSegmentsCacheKey=e,this.timelineSegmentsCache=this.computeTimelineSegments(),this.timelineDurationCache=Math.max(0,this.replay.duration-this.timelineSegmentsCache.reduce((t,i)=>t+(i.endTime-i.startTime),0)),this.timelineSegmentsCache)}projectReplayTimeToTimeline(e){return UM(this.replay.duration,this.getTimelineSegments(),e)}projectTimelineTimeToReplay(e){return FM(this.replay.duration,this.getTimelineDuration(),this.getTimelineSegments(),e)}getPlaybackEndTime(){return OM(this.replay.duration,this.getTimelineSegments())}subscribe(e){const t=i=>{e(i.detail)};return this.addEventListener("change",t),e(this.getState()),()=>{this.removeEventListener("change",t)}}onBeforeRender(e){return this.beforeRenderCallbacks.push(e),()=>{const t=this.beforeRenderCallbacks.indexOf(e);t>=0&&this.beforeRenderCallbacks.splice(t,1)}}addPlugin(e){return this.installPlugin(e,!0)}removePlugin(e){const t=this.plugins.findIndex(s=>s.plugin.id===e);if(t<0)return!1;const[i]=this.plugins.splice(t,1);return i.plugin.teardown?.(this.createPluginContext()),this.render(),!0}getPlugins(){return this.plugins.map(e=>e.plugin)}destroy(){for(this.playing&&this.pause(),this.disposed=!0,this.animationFrameId!==null&&(cancelAnimationFrame(this.animationFrameId),this.animationFrameId=null),this.resizeObserver?(this.resizeObserver.disconnect(),this.resizeObserver=null):window.removeEventListener("resize",this.boundWindowResize);this.plugins.length>0;)this.plugins.pop()?.plugin.teardown?.(this.createPluginContext());this.sceneState.dispose()}dispose(){this.destroy()}installResizeHandling(){if(typeof ResizeObserver<"u"){this.resizeObserver=new ResizeObserver(()=>{this.sceneState.resize()}),this.resizeObserver.observe(this.container);return}window.addEventListener("resize",this.boundWindowResize)}scheduleAnimationFrame(){this.animationFrameId!==null||this.disposed||(this.animationFrameId=requestAnimationFrame(this.tick))}reanchorPlaybackClock(e=performance.now()){this.playbackStartedAt=e,this.playbackStartedTime=this.currentTime}syncPlaybackClock(e=performance.now()){if(!this.playing)return!1;const t=(e-this.playbackStartedAt)/1e3,i=pt.clamp(this.playbackStartedTime+t*this.speed,0,this.getPlaybackEndTime()),s=i!==this.currentTime;return this.currentTime=i,s}tick=e=>{if(this.animationFrameId=null,this.disposed)return;let t=!1;this.playing&&(t=this.syncPlaybackClock(e),t=this.skipPostGoalTransitionIfNeeded(e)||t,t=this.skipPastKickoffIfNeeded(e)||t,this.currentTime>=this.getPlaybackEndTime()&&(this.playing=!1,t=!0)),this.render(),t&&this.emitChange(),this.scheduleAnimationFrame()};render(){const e=BM(this.replay,this.currentTime),t=e.frameIndex,i=this.replay.ballFrames[t]??null,s=this.replay.ballFrames[e.nextFrameIndex]??i,a=$f(i?.position??null,s?.position??null,e.alpha),r=a?ug(a,this.fieldScale):null,o=[];a?(this.sceneState.ballMesh.visible=!0,this.sceneState.ballMesh.position.copy(Lc(a)),i?.rotation?this.sceneState.ballMesh.quaternion.set(i.rotation.x,i.rotation.y,i.rotation.z,i.rotation.w):this.sceneState.ballMesh.quaternion.identity()):this.sceneState.ballMesh.visible=!1;for(const[d,u]of this.replay.players.entries()){const h=this.sceneState.playerMeshes.get(u.id),f=this.sceneState.playerBoostTrails.get(u.id),g=this.sceneState.playerBoostMeters.get(u.id),_=this.sceneState.playerDemoIndicators.get(u.id),m=u.frames[t]??null,p=u.frames[e.nextFrameIndex]??m;let w=null,x=null,y=0;if(!h){_&&(_.group.visible=!1),o.push({track:u,mesh:null,boostTrail:f??null,frame:m,nextFrame:p,interpolatedPosition:x,boostFraction:y});continue}if(w=$f(m?.position??null,p?.position??null,e.alpha),!w){h.visible=!1,f&&(f.visible=!1),g&&(g.group.visible=!1),_&&(_.group.visible=!1),o.push({track:u,mesh:h,boostTrail:f??null,frame:m,nextFrame:p,interpolatedPosition:x,boostFraction:y});continue}if(!oT(m)){h.visible=!1,f&&(f.visible=!1),g&&(g.group.visible=!1),this.updateDemoIndicator(u.id,_??null,w),o.push({track:u,mesh:h,boostTrail:f??null,frame:m,nextFrame:p,interpolatedPosition:x,boostFraction:y});continue}h.visible=!0,_&&(_.group.visible=!1),x=w,h.position.copy(Lc(w)),m?.rotation?h.quaternion.set(m.rotation.x,m.rotation.y,m.rotation.z,m.rotation.w):h.quaternion.identity();const M=m?.boostFraction??0,T=p?.boostFraction??M;if(y=pt.lerp(M,T,e.alpha),f){const A=(e.alpha>=.5?p?.boostActive:m?.boostActive)??m?.boostActive??p?.boostActive??!1;this.updateBoostTrail(f,A,y,this.currentTime,d)}g&&(this.boostMeterEnabled?(g.group.visible=!0,MM(g,y,pt.lerp(m?.boostAmount??0,p?.boostAmount??m?.boostAmount??0,e.alpha),this.sceneState.camera)):g.group.visible=!1),o.push({track:u,mesh:h,boostTrail:f??null,frame:m,nextFrame:p,interpolatedPosition:x,boostFraction:y})}sT({sceneState:this.sceneState,replay:this.replay,fieldScale:this.fieldScale,cameraViewMode:this.cameraViewMode,attachedPlayerId:this.attachedPlayerId,ballCamEnabled:this.ballCamEnabled,cameraDistanceScale:this.cameraDistanceScale,customCameraSettings:this.customCameraSettings,frameIndex:t,ballPosition:r,desiredCameraPosition:this.desiredCameraPosition,desiredLookTarget:this.desiredLookTarget}),this.cameraViewMode==="free"&&this.freeCameraTransition&&nT({sceneState:this.sceneState,...this.freeCameraTransition})&&(this.freeCameraTransition=null),this.sceneState.controls.update(),this.sceneState.updateWallVisibility();const l={frameIndex:e.frameIndex,nextFrameIndex:e.nextFrameIndex,alpha:e.alpha,currentTime:this.currentTime};for(const d of this.beforeRenderCallbacks)d(l);const c=this.createRenderContext(l,i,s,r,o);for(const d of this.plugins)d.plugin.beforeRender?.(c);this.sceneState.renderer.render(this.sceneState.scene,this.sceneState.camera)}skipPastKickoffIfNeeded(e){if(!this.skipKickoffsEnabled)return!1;const t=Wa(this.replay,this.currentTime),i=this.replay.frames[t];if(!i||!Ju(i,this.kickoffGameState))return!1;const s=this.replay.frames.find((a,r)=>r>t&&cg(a,this.liveGameState));return!s||s.time===this.currentTime?!1:(this.currentTime=s.time,this.playing&&this.reanchorPlaybackClock(e),!0)}skipPostGoalTransitionIfNeeded(e){if(!this.skipPostGoalTransitionsEnabled)return!1;const t=Wa(this.replay,this.currentTime),i=this.replay.frames[t];if(!i||!Uo(this.replay,i,t,this.liveGameState,this.kickoffGameState))return!1;const s=this.replay.frames.find((a,r)=>r>t&&!Uo(this.replay,a,r,this.liveGameState,this.kickoffGameState));if(!s){let a=t;for(;a>0&&Uo(this.replay,this.replay.frames[a-1],a-1,this.liveGameState,this.kickoffGameState);)a-=1;const r=this.replay.frames[a]?.time;return r===void 0||r===this.currentTime?!1:(this.currentTime=r,this.playing&&this.reanchorPlaybackClock(e),!0)}return s.time===this.currentTime?!1:(this.currentTime=s.time,this.playing&&this.reanchorPlaybackClock(e),!0)}getActiveMetadata(e,t){return kM(this.replay,e,t)}computeTimelineSegments(){return DM(this.replay,this.skipPostGoalTransitionsEnabled,this.skipKickoffsEnabled,this.liveGameState,this.kickoffGameState)}installPlugin(e,t){const i=typeof e=="function"?e():e;if(this.plugins.some(a=>a.plugin.id===i.id))throw new Error(`Replay player plugin "${i.id}" is already installed`);const s={definition:e,plugin:i};return this.plugins.push(s),i.setup?.(this.createPluginContext()),i.onStateChange?.(this.createPluginStateContext(this.getState())),t&&this.render(),()=>{const a=this.plugins.indexOf(s);a<0||(this.plugins.splice(a,1),i.teardown?.(this.createPluginContext()),this.render())}}createPluginContext(){return{player:this,replay:this.replay,scene:this.sceneState,container:this.container,options:this.options}}createPluginStateContext(e){return{...this.createPluginContext(),state:e}}createRenderContext(e,t,i,s,a){return{...this.createPluginStateContext(this.getState()),...e,frame:this.replay.frames[e.frameIndex]??null,nextFrame:this.replay.frames[e.nextFrameIndex]??null,ballFrame:t,nextBallFrame:i,ballPosition:s,players:a}}emitChange(){const e=this.getState(),t=this.createPluginStateContext(e);for(const i of this.plugins)i.plugin.onStateChange?.(t);this.dispatchEvent(new CustomEvent("change",{detail:e}))}getActiveDemoEvent(e,t){for(let i=this.replay.timelineEvents.length-1;i>=0;i-=1){const s=this.replay.timelineEvents[i],a=t-s.time;if(!(a<0)){if(a>Wf)break;if(s.kind==="demo"&&s.secondaryPlayerId===e)return s}}return null}updateDemoIndicator(e,t,i){if(!t)return;const s=this.getActiveDemoEvent(e,this.currentTime),a=s?.location??i;if(!s||!a){t.group.visible=!1;return}const r=Math.max(0,this.currentTime-s.time),o=this.currentTime*8,l=1+.08*Math.sin(o);t.group.visible=!0,t.group.position.copy(Lc(a)),t.ring.rotation.z=o*.15,t.ring.scale.setScalar(l),t.label.quaternion.copy(this.sceneState.camera.quaternion),t.label.scale.setScalar(1+.04*Math.sin(o+1.3));const c=pt.clamp(1-r/Wf,.28,1);for(const d of[t.ring,t.label]){const u=d.material;u instanceof xi&&(u.opacity=c)}}updateBoostTrail(e,t,i,s,a){if(!t){e.visible=!1;return}e.visible=!0;const r=s*36+a*1.7,o=.86+.14*Math.sin(r),l=pt.clamp(.62+i*.88,.62,1.5),c=l*(1.02+o*.52),d=1.02+l*.28;e.scale.set(c,d,d);for(const[u,h]of e.children.entries()){const f=h,g=.92+.14*Math.sin(r+u*.85);f.scale.setScalar(g),f.traverse(_=>{if(!(_ instanceof ze))return;const m=_.material;if(m instanceof rt)switch(_.name){case"outer-flame":m.opacity=.24+l*.24;break;case"inner-flame":m.opacity=.58+l*.3;break;case"glow":m.opacity=.4+l*.26;break}})}}}const cT="https://ballchasing.com",dT=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;function uT(n,e){const i=(e instanceof URL?e.href:e).replace(/\/+$/,"");return new URL(`${i}/${n.replace(/^\/+/,"")}`)}function Xf(n){return dT.test(n.trim())}function Qu(n){const e=n.trim();if(Xf(e))return e.toLowerCase();let t;try{t=new URL(e)}catch{throw new Error(`Invalid Ballchasing replay id: ${n}`)}if(!/(^|\.)ballchasing\.com$/i.test(t.hostname))throw new Error(`Invalid Ballchasing replay URL: ${n}`);const i=t.pathname.split("/").filter(Boolean),s=i.findIndex(o=>o==="replay"),a=i.findIndex(o=>o==="replays"),r=s>=0?i[s+1]:a>=0?i[a+1]:void 0;if(!r||!Xf(r))throw new Error(`Invalid Ballchasing replay URL: ${n}`);return r.toLowerCase()}function hT(n){return`ballchasing-${Qu(n)}.replay`}function fT(n,e=cT){const t=Qu(n);return uT(`dl/replay/${encodeURIComponent(t)}`,e)}const qf="subtr-actor-ballchasing-overlay-styles",pT="#3b82f6",mT="#f59e0b";function gT(){if(document.getElementById(qf))return;const n=document.createElement("style");n.id=qf,n.textContent=`
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
      border-bottom: 2px solid ${pT};
    }

    .sap-bc-team-hud-orange {
      left: calc(50% + 0.35rem);
      flex-direction: row;
      justify-content: flex-start;
      border-bottom: 2px solid ${mT};
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
  `,document.head.append(n)}function _T(n,e){const t=n.players[e],i=t.frame?.boostAmount??0,s=t.nextFrame?.boostAmount??i;return pt.lerp(i,s,n.alpha)}function Yf(n,e,t,i){if(!n||!e)return;const s=Math.max(0,Math.min(100,Math.round(t/255*100)));n.style.width=`${s}%`,e.textContent=`${s} ${i}`}function Zf(n,e,t,i){if(!n)return;const s=()=>{e.player.setAttachedPlayer(t)};n.classList.add("sap-bc-player-selectable"),n.tabIndex=0,n.setAttribute("role","button"),n.setAttribute("aria-label",`Follow ${i}`),n.title=`Follow ${i}`,n.addEventListener("click",s),n.addEventListener("keydown",a=>{a.key!=="Enter"&&a.key!==" "||(a.preventDefault(),s())})}function vT(n,e,t,i,s){if(n.getWorldPosition(s),s.add(e),s.project(t),s.z<-1||s.z>1)return!1;const a=i.clientWidth||1,r=i.clientHeight||1;return s.x=(s.x+1)*a/2,s.y=(1-s.y)*r/2,!(s.x<-80||s.x>a+80||s.y<-80||s.y>r+80)}function yT(n={}){const e=n.showFloatingNames??!0,t=n.showFloatingBoostBars??!0,i=n.showTeamBoostHud??!0;let s=null,a=null,r=null,o=null,l=!1,c="";const d=new Map,u=new L,h=new L(0,0,255);function f(_){for(const[m,p]of d.entries()){const w=m===_;p.floatingRoot?.classList.toggle("sap-bc-player-following",w),p.teamHudEntry?.classList.toggle("sap-bc-player-following",w),p.floatingRoot?.setAttribute("aria-pressed",w?"true":"false"),p.teamHudEntry?.setAttribute("aria-pressed",w?"true":"false")}}function g(_,m){gT(),getComputedStyle(m).position==="static"&&(l=!0,c=m.style.position,m.style.position="relative"),s=document.createElement("div"),s.className="sap-bc-overlay-root",e||t?(a=document.createElement("div"),a.className="sap-bc-floating-layer",s.append(a)):a=null,i?(r=document.createElement("div"),r.className="sap-bc-team-hud sap-bc-team-hud-blue",o=document.createElement("div"),o.className="sap-bc-team-hud sap-bc-team-hud-orange",s.append(r,o)):(r=null,o=null);for(const p of _.replay.players){let w=null,x=null,y=null,C=null;a&&(w=document.createElement("div"),w.className="sap-bc-floating-track",w.hidden=!0,(e||t)&&(x=document.createElement("div"),x.className=`sap-bc-boost-bar ${p.isTeamZero?"sap-bc-boost-bar-blue":"sap-bc-boost-bar-orange"}`,y=document.createElement("div"),y.className=`sap-bc-boost-fill ${p.isTeamZero?"sap-bc-boost-fill-blue":"sap-bc-boost-fill-orange"}`,C=document.createElement("span"),C.className="sap-bc-boost-text",x.append(y,C),w.append(x)),Zf(w,_,p.id,p.name),a.append(w));let M=null,T=null,A=null;if(i){M=document.createElement("div"),M.className="sap-bc-hud-player";const v=document.createElement("div");v.className=`sap-bc-hud-boost-bar ${p.isTeamZero?"sap-bc-boost-bar-blue":"sap-bc-boost-bar-orange"}`,T=document.createElement("div"),T.className=`sap-bc-hud-boost-fill ${p.isTeamZero?"sap-bc-boost-fill-blue":"sap-bc-boost-fill-orange"}`,A=document.createElement("span"),A.className="sap-bc-hud-boost-text",v.append(T,A),M.append(v),Zf(M,_,p.id,p.name),(p.isTeamZero?r:o)?.append(M)}d.set(p.id,{floatingRoot:w,floatingBoostFill:y,floatingBoostText:C,teamHudEntry:M,teamHudFill:T,teamHudText:A})}h.set(0,0,255*(_.options.fieldScale??1)),m.append(s),f(_.player.getState().attachedPlayerId)}return{id:"ballchasing-overlay",setup(_){g(_,_.container)},onStateChange(_){f(_.state.attachedPlayerId)},teardown(_){s?.remove(),s=null,a=null,r=null,o=null,d.clear(),l&&(_.container.style.position=c,l=!1)},beforeRender(_){if(s)for(const[m,p]of _.players.entries()){const w=d.get(p.track.id);if(!w)continue;const x=_T(_,m);Yf(w.floatingBoostFill,w.floatingBoostText,x,p.track.name),Yf(w.teamHudFill,w.teamHudText,x,p.track.name);const y=p.mesh,C=y!==null&&p.interpolatedPosition!==null;if(w.teamHudEntry?.classList.toggle("sap-bc-hud-player-inactive",!C),!!w.floatingRoot){if(!C||!vT(y,h,_.scene.camera,_.container,u)){w.floatingRoot.hidden=!0;continue}w.floatingRoot.hidden=!1,w.floatingRoot.style.transform=`translate(${u.x.toFixed(1)}px, ${u.y.toFixed(1)}px) translate(-50%, -100%)`}}}}}function Dc(n){n.depthTest=!1,n.depthWrite=!1,n.transparent=!0,n.polygonOffset=!0,n.polygonOffsetFactor=-2,n.polygonOffsetUnits=-2,n.forceSinglePass=!0}const aa=6,bT=.6;function Ur(n){return n*bT}function xT(n){return Ur(n.size==="big"?150:92)}function hg(n){return Ur(n.size==="big"?155:46)}function ST(n){return Ur(n.size==="big"?34:14)}function fg(n){return aa+ST(n)+hg(n)}function pg(n){return n.size==="big"?fg(n):aa+Ur(1.2)}function mg(n){return n.size==="big"?fg(n):aa+Ur(.8)}function wT(n){return n.size==="big"?16096779:16436245}function ET(n){const e=xT(n),t=wT(n),i=hg(n),s=n.size==="big",a=new _t;a.position.set(n.position.x,n.position.y,n.position.z),a.renderOrder=20,a.frustumCulled=!1;const r=new ze(new Ts(e*.72,e,24),new rt({color:t,transparent:!0,opacity:.92,side:Qe,depthWrite:!1}));Dc(r.material),r.position.z=aa,r.renderOrder=20,r.frustumCulled=!1,a.add(r);const o=new ze(new js(e*.58,24),new rt({color:t,transparent:!0,opacity:.3,side:Qe,depthWrite:!1}));Dc(o.material),o.position.z=aa+.5,o.renderOrder=21,o.frustumCulled=!1,a.add(o);const l=new ze(new js(e*.42,20),new rt({color:16777215,transparent:!0,opacity:.22,side:Qe,depthWrite:!1}));Dc(l.material),l.position.z=aa+1,l.renderOrder=22,l.frustumCulled=!1,a.add(l);const c=new ze(s?new _a(i,32,18):new js(i*.9,24),s?new il({color:t,emissive:new Ze(t),emissiveIntensity:.6,shininess:88,specular:new Ze(16773826),transparent:!0,opacity:.92,depthWrite:!1}):new rt({color:t,transparent:!0,opacity:.88,side:Qe,blending:Fi,depthWrite:!1}));c.position.z=pg(n),c.renderOrder=23,c.frustumCulled=!1,a.add(c);const d=new ze(s?new _a(i*1.36,32,14):new js(i*1.35,28),new rt({color:t,transparent:!0,opacity:s?.2:.16,side:Qe,blending:Fi,depthWrite:!1}));return d.position.z=mg(n),d.renderOrder=24,d.frustumCulled=!1,a.add(d),{group:a,ring:r,core:o,cooldown:l,orb:c,glow:d}}function MT(n,e){let t=-1;for(let a=0;a<n.events.length&&!(n.events[a].time>e);a+=1)t=a;if(t<0)return{available:!0,progress:1};const i=n.events[t];if(i.available)return{available:!0,progress:1};const s=n.events.slice(t+1).find(a=>a.available);return!s||s.time<=i.time?{available:!1,progress:0}:{available:!1,progress:pt.clamp((e-i.time)/(s.time-i.time),0,1)}}function TT(n,e,t,i){const{available:s,progress:a}=MT(e,t),r=e.size==="big",o=.92+.08*Math.sin(t*6+e.index*.45),l=.96+.04*Math.sin(t*(r?4.8:7.2)+e.index*.37),c=r?Math.sin(t*2.2+e.index*.61)*18:0,d=pg(e)+c,u=mg(e)+c;if(n.orb.position.z=d,n.glow.position.z=u,n.orb.rotation.z=t*(r?.9:1.25),n.glow.rotation.z=-t*.45,s){n.group.visible=!0,n.ring.material.opacity=.95,n.core.material.opacity=r?.56:.5,n.cooldown.visible=!1,n.ring.scale.setScalar(o),n.core.scale.setScalar(1),n.orb.visible=!0,n.glow.visible=!0,n.orb.material.opacity=r?.96:.9,n.glow.material.opacity=(r?.2:.16)+(l-.96),n.orb.scale.setScalar(l),n.glow.scale.setScalar(r?1.02+(l-.96)*2:1);return}if(n.group.visible=!0,n.ring.material.opacity=.18,n.core.material.opacity=.07,n.ring.scale.setScalar(1),n.core.scale.setScalar(1),n.orb.visible=!1,n.glow.visible=!1,n.cooldown.visible=i,i){const h=.3+a*.7;n.cooldown.scale.setScalar(h),n.cooldown.material.opacity=.16+a*.2}}function AT(n={}){const e=n.showCooldownProgress??!0;let t=null;const i=new Map;function s(r){t=new _t,t.name="boost-pad-overlay",t.renderOrder=20,t.frustumCulled=!1;for(const o of r.replay.boostPads){const l=ET(o);t.add(l.group),i.set(o.index,l)}r.scene.replayRoot.add(t)}function a(r){for(const o of r.replay.boostPads){const l=i.get(o.index);l&&TT(l,o,r.state.currentTime,e)}}return{id:"boost-pad-overlay",setup(r){s(r),a({...r,state:r.player.getState()})},onStateChange(r){a(r)},teardown(){t?.removeFromParent(),t=null,i.clear()}}}const CT=1.35,RT="#57a8ff",PT="#ff9c40",LT=256,NT=160,IT=360,DT=225,UT=260,FT=430,gg=18,Kf=120;function OT(n){return n?RT:PT}function kT(n){return n.events.filter(e=>!e.available&&e.playerId)}function _g(n,e){const t=document.createElement("canvas");t.width=LT,t.height=NT;const i=t.getContext("2d");if(!i)throw new Error("Unable to create boost pickup count canvas");i.clearRect(0,0,t.width,t.height),i.textAlign="center",i.textBaseline="middle",i.lineJoin="round",i.font="800 124px sans-serif",i.lineWidth=18,i.strokeStyle="rgba(4, 10, 18, 0.88)",i.strokeText(`${n}`,t.width/2,t.height/2),i.fillStyle=e,i.fillText(`${n}`,t.width/2,t.height/2);const s=new Al(t);return s.colorSpace=Vt,s.needsUpdate=!0,s}function BT(n){n?.dispose()}function zT(n){const e=new _t;e.visible=!1,e.renderOrder=60,e.frustumCulled=!1;const t=_g(1,n),i=new Hm({map:t,transparent:!0,depthTest:!1,depthWrite:!1}),s=new Vm(i);s.scale.set(IT,DT,1),s.renderOrder=62,s.frustumCulled=!1,e.add(s);const a=new rt({color:n,transparent:!0,opacity:0,side:Qe,depthTest:!1,depthWrite:!1,blending:Fi}),r=new ze(new Ts(Kf*.72,Kf,36),a);return r.position.z=gg,r.renderOrder=61,r.frustumCulled=!1,e.add(r),{group:e,textMaterial:i,ringMaterial:a}}function HT(n,e){n.currentCount!==e&&(BT(n.textMaterial.map),n.textMaterial.map=_g(e,n.color),n.textMaterial.needsUpdate=!0,n.currentCount=e)}function GT(n){const e=new Map;for(const s of n.replay.players)e.set(s.id,s);const t=[];for(const s of n.replay.boostPads)for(const a of kT(s))t.push({pad:s,event:a});t.sort((s,a)=>s.event.time!==a.event.time?s.event.time-a.event.time:s.event.frame!==a.event.frame?s.event.frame-a.event.frame:s.pad.index-a.pad.index);const i=[];for(const{pad:s,event:a}of t){if(!a.playerId)continue;const r=e.get(a.playerId);if(!r)continue;const o=OT(r.isTeamZero),{group:l,textMaterial:c,ringMaterial:d}=zT(o);l.position.copy(s.position),n.scene.replayRoot.add(l),i.push({time:a.time,pad:s,event:a,player:r,color:o,currentCount:1,position:new L(s.position.x,s.position.y,s.position.z),size:s.size,group:l,textMaterial:c,ringMaterial:d})}return i}function VT(n,e,t){const i=pt.clamp(e/t,0,1),s=1-Math.pow(1-i,3),a=i*i,r=n.size==="big"?FT:UT,o=n.size==="big"?360:280,l=1+Math.sin(i*Math.PI)*.22;n.group.visible=!0,n.group.position.set(n.position.x,n.position.y,n.position.z+r+s*o),n.group.scale.setScalar(l),n.textMaterial.opacity=Math.max(0,1-a),n.ringMaterial.opacity=Math.max(0,.48*(1-i));const c=n.group.children[1];if(c){const d=.75+s*(n.size==="big"?2.8:1.85);c.scale.setScalar(d),c.position.z=gg-r-s*o}}function $T(n={}){const e=Math.max(.1,n.durationSeconds??CT);let t=[];function i(a){return n.includePickup?.({pad:a.pad,event:a.event,player:a.player})??!0}function s(){for(const a of t)a.group.visible=!1}return{id:"boost-pickup-animation",setup(a){t=GT(a)},beforeRender(a){if(!a.state.boostPickupAnimationEnabled){s();return}const r=a.currentTime-e,o=new Map;for(const l of t){if(l.time>a.currentTime){l.group.visible=!1;continue}if(!i(l)){l.group.visible=!1;continue}const c=(o.get(l.player.id)??0)+1;if(o.set(l.player.id,c),l.time<r){l.group.visible=!1;continue}HT(l,c),VT(l,a.currentTime-l.time,e)}},teardown(){for(const a of t)a.group.removeFromParent(),a.group.traverse(r=>{(r instanceof ze||r instanceof Vm)&&r.geometry?.dispose()}),a.textMaterial.map?.dispose(),a.textMaterial.dispose(),a.ringMaterial.dispose();t=[]}}}const WT=60,XT=["video/webm;codecs=vp9","video/webm;codecs=vp8","video/webm"];function qT(n){if(n&&MediaRecorder.isTypeSupported(n))return n;for(const e of XT)if(MediaRecorder.isTypeSupported(e))return e;return""}function YT(n){return n instanceof Error?n.message:String(n)}function ZT(n={}){let e=null,t=null,i=[],s=null,a=0,r=0,o="",l=0,c=null,d=null,u=null,h=null,f=!1,g=null;const _=new Set;function m(){return{state:t?t.state==="recording"?"recording":"stopping":c?"error":s?"ready":"idle",elapsedSeconds:r,mimeType:o,sizeBytes:l,error:c}}function p(){const M=m();n.onStatusChange?.(M);for(const T of _)T(M)}function w(){if(!e)throw new Error("Canvas recorder plugin is not installed");return e}function x(M){t=null,h=null,f=!1,s=M,l=M?.size??0,g&&e&&e.player.setState({currentTime:g.currentTime,speed:g.speed,playing:g.playing}),g=null,M&&n.onComplete?.(M),p(),u?.(M),u=null,d=null}function y(M){c=YT(M),t=null,h=null,f=!1,g=null,p(),u?.(null),u=null,d=null}const C={id:"canvas-recorder",setup(M){e=M},beforeRender(M){t?.state==="recording"&&(r=(performance.now()-a)/1e3,p()),t?.state==="recording"&&h!==null&&M.currentTime>=h&&C.stop()},onStateChange(M){f&&t?.state==="recording"&&!M.state.playing&&r>0&&C.stop()},teardown(){t?.state==="recording"&&t.stop(),e=null,t=null,h=null,f=!1,g=null,u?.(null),u=null,d=null,_.clear()},start(M={}){const T=w();if(t?.state==="recording")throw new Error("Canvas recording is already in progress");if(typeof MediaRecorder>"u")throw new Error("MediaRecorder is not available in this browser");const A=T.scene.renderer.domElement;if(!A.captureStream)throw new Error("Canvas captureStream is not available in this browser");c=null,s=null,i=[],l=0,r=0,a=performance.now(),o=qT(M.mimeType??n.mimeType);const v=Math.max(1,M.fps??n.fps??WT),b=A.captureStream(v);t=new MediaRecorder(b,{mimeType:o,videoBitsPerSecond:M.videoBitsPerSecond??n.videoBitsPerSecond}),d=new Promise(R=>{u=R}),t.addEventListener("dataavailable",R=>{R.data.size>0&&(i.push(R.data),l+=R.data.size,p())}),t.addEventListener("stop",()=>{b.getTracks().forEach(R=>R.stop()),x(new Blob(i,{type:o||"video/webm"}))},{once:!0}),t.addEventListener("error",R=>{b.getTracks().forEach(I=>I.stop()),y(R.error??R)},{once:!0}),t.start(1e3),p()},stop(){if(!t)return Promise.resolve(s);if(t.state==="inactive")return d??Promise.resolve(s);const M=d??new Promise(T=>{u=T});return t.stop(),p(),M},clear(){if(t?.state==="recording")throw new Error("Cannot clear a recording while recording is in progress");s=null,i=[],l=0,r=0,c=null,p()},getRecording(){return s},getStatus(){return m()},subscribe(M){return _.add(M),M(m()),()=>{_.delete(M)}},recordRange(M={}){const T=w(),A=T.player.getState();(M.restorePlaybackState??!0)&&(g=A);const v=M.playbackRate??A.speed,b=M.startTime??A.currentTime;h=M.endTime??A.duration,f=!0,T.player.setState({currentTime:b,speed:v,playing:!1}),C.start(M);const R=d;return T.player.play(),(R??Promise.resolve(null)).then(I=>{if(!I)throw new Error("Recording stopped without producing a video");return I})},recordFullReplay(M={}){return C.recordRange({...M,startTime:M.startTime??0,endTime:M.endTime??w().replay.duration})}};return C}const jf="subtr-actor-timeline-overlay-styles",KT=new Set(["goal","save"]),jT=.2,JT=.01,Jf=.01;function QT(){if(document.getElementById(jf))return;const n=document.createElement("style");n.id=jf,n.textContent=`
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
  `,document.head.append(n)}function $d(n){if(!Number.isFinite(n))return"--:--.--";const e=Math.max(0,n),t=Math.floor(e/60),i=Math.floor(e%60),s=Math.floor((e-Math.floor(e))*100);return`${t}:${String(i).padStart(2,"0")}.${String(s).padStart(2,"0")}`}function Qf(n){switch(n.kind){case"goal":return 5;case"demo":return 4;case"save":return 3;case"assist":return 2;case"shot":return 1;default:return 0}}function e1(n){if(n.color)return n.color;if(n.isTeamZero===!0)return"#3b82f6";if(n.isTeamZero===!1)return"#f59e0b";switch(n.kind){case"goal":return"#f5f7fa";case"demo":return"#ef4444";case"save":return"#34d399";case"assist":return"#c084fc";case"shot":return"#60a5fa";default:return"#d1d9e0"}}function t1(n){if(n.events.length>1)return`${n.events.length}`;const e=n.events[0];return e?e.shortLabel&&e.shortLabel.trim()!==""?e.shortLabel.slice(0,3).toUpperCase():e.kind.slice(0,1).toUpperCase():""}function n1(n){return n.events.map(e=>`${$d(e.time)} ${e.label??e.kind}`).join(`
`)}function vg(n){const e=new Map;for(const t of n){const i=t.frame!==void 0?`frame:${t.frame}`:`time:${t.time.toFixed(2)}`,s=e.get(i);if(s){s.events.push(t);continue}e.set(i,{key:i,time:t.time,events:[t]})}return[...e.values()].map(t=>({...t,events:[...t.events].sort((i,s)=>{const a=Qf(s)-Qf(i);return a!==0?a:i.time-s.time})})).sort((t,i)=>t.time-i.time)}function yg(n,e){return n?typeof n=="function"?n(e):n:[]}function i1(n,e){const t=[];for(const i of n){const s=yg(i.source,e);s.length!==0&&t.push({key:i.key,label:i.label,buckets:vg(s)})}return t}function s1(n,e){return n?typeof n=="function"?n(e):n:[]}function a1(n,e){const t=new Set,i=[];for(const s of n)for(const a of s1(s,e)){const r=a.id;if(r!==void 0){if(t.has(r))continue;t.add(r)}i.push(a)}return i}function r1(n){const e=new Map;for(const t of n){const i=t.lane??"default",s=t.laneLabel??t.lane??"",a=e.get(i);if(a){a.ranges.push(t);continue}e.set(i,{key:i,label:s,ranges:[t]})}return[...e.values()].map(t=>({...t,ranges:[...t.ranges].sort((i,s)=>i.startTime-s.startTime)}))}function o1(n){return n.color?n.color:n.isTeamZero===!0?"#3b82f6":n.isTeamZero===!1?"#f59e0b":"#d1d9e0"}function l1(n,e){if(n.replayEvents)return yg(n.replayEvents,e);if(n.includeReplayEvents===!1)return[];const t=new Set(n.replayEventKinds??KT);return e.replay.timelineEvents.filter(i=>t.has(i.kind))}function c1(n,e){const t=e.player.projectReplayTimeToTimeline(n);if(!t.hiddenBySkip)return t.seekTime;const i=Math.min(e.player.getTimelineDuration(),t.timelineTime+JT);return e.player.projectTimelineTimeToReplay(i)}function bo(n,e){return`${n/Math.max(e,1e-4)*100}%`}function d1(n,e,t){let i=n.timelineTime,s=e.timelineTime;return s<=i&&(n.hiddenBySkip||e.hiddenBySkip)&&(i>=t?(i=Math.max(0,t-Jf),s=t):s=Math.min(t,i+Jf)),{startTimelineTime:i,endTimelineTime:s}}function u1(n={}){const e=n.pauseWhileScrubbing??!0;let t=0;const i=n.events?[{key:"events:initial",label:n.eventsLabel??"Events",source:n.events}]:[],s=n.ranges?[n.ranges]:[];let a=null,r=null,o=null,l=null,c=null,d=null,u=null,h=null,f=null,g=null,_=null,m=null,p=!1,w="",x=!1,y=!1,C=null,M=[],T=[],A=null;const v=new Map,b=[],R=[];function I(){C&&(k(C),B({...C,state:C.player.getState()}))}function O(){C&&(Y(C),B({...C,state:C.player.getState()}))}function B(q){if(!l||!c||!d||!u||!h||!f||!r)return;const Q=q.player.getTimelineCurrentTime(),_e=q.player.getTimelineDuration(),ye=[_e.toFixed(4),q.state.skipKickoffsEnabled?"1":"0",q.state.skipPostGoalTransitionsEnabled?"1":"0"].join(":");A!==ye&&(k(q),Y(q),A=ye),l.min="0",l.max=`${_e}`,l.step="0.01",l.value=`${Math.min(Q,_e)}`,c.dataset.playing=q.state.playing?"true":"false",c.setAttribute("aria-label",q.state.playing?"Pause replay":"Play replay"),c.title=q.state.playing?"Pause replay":"Play replay",d.textContent=q.state.playing?"||":">",u.textContent=q.state.playing?"Pause":"Play",h.textContent=$d(Q),f.textContent=`-${$d(_e-Q)}`,r.dataset.scrubbing=x?"true":"false";for(const te of v.values()){const V=Q-te.timelineTime,Z=V>=0&&V<=jT;te.element.dataset.active=Z?"true":"false",te.element.dataset.passed=te.timelineTime<=Q?"true":"false"}for(const te of b){const V=Math.max(0,te.startTimelineTime),Z=Math.min(_e,te.endTimelineTime);if(Math.max(0,Z-V)<=1e-4){te.element.hidden=!0;continue}te.element.hidden=!1,te.element.dataset.active=Q>=V&&Q<=Z?"true":"false"}const Pe=bo(Math.min(Q,_e),_e);for(const te of R)te.element.style.left=Pe}function G(q,Q,_e){const ye=q.events[0];if(!ye)return null;const Pe=Q.player.projectReplayTimeToTimeline(q.time),te=document.createElement("button");return te.type="button",te.className="sap-tl-marker",te.style.left=bo(Pe.timelineTime,_e),te.style.color=e1(ye),te.title=n1(q),te.textContent=t1(q),te.addEventListener("click",()=>{Q.player.seek(c1(q.time,Q))}),te.dataset.active="false",te.dataset.passed="false",v.set(q.key,{element:te,timelineTime:Pe.timelineTime}),te}function k(q){if(!_||!g)return;_.replaceChildren(),g.replaceChildren(),v.clear();const Q=l1(n,q);M=[],Q.length>0&&M.push({key:"replay",label:n.replayEventsLabel??"Replay",buckets:vg(Q)}),M.push(...i1(i,q));const _e=Math.max(q.player.getTimelineDuration(),1e-4),ye=M[0];if(ye?.key==="replay")for(const te of ye.buckets){const V=G({...te,key:`${ye.key}:${te.key}`},q,_e);V&&_.append(V)}const Pe=M.filter(te=>te.key!=="replay");g.hidden=Pe.length===0;for(const te of Pe){const V=document.createElement("div");V.className="sap-tl-event-lane",V.dataset.label=te.label;const Z=document.createElement("span");Z.className="sap-tl-event-lane-label",Z.textContent=te.label,Z.setAttribute("aria-label",te.label),V.append(Z);const ce=document.createElement("div");ce.className="sap-tl-event-lane-track";const Le=document.createElement("div");Le.className="sap-tl-markers";for(const ve of te.buckets){const Be=G({...ve,key:`${te.key}:${ve.key}`},q,_e);Be&&Le.append(Be)}ce.append(Le),V.append(ce),g.append(V)}}function Y(q){if(!o)return;o.replaceChildren(),b.splice(0,b.length),R.splice(0,R.length);const Q=a1(s,q).filter(ye=>Number.isFinite(ye.startTime)&&Number.isFinite(ye.endTime)&&ye.endTime>ye.startTime);T=r1(Q);const _e=Math.max(q.player.getTimelineDuration(),1e-4);if(T.length===0){o.hidden=!0;return}o.hidden=!1;for(const ye of T){const Pe=document.createElement("div");Pe.className="sap-tl-range-lane";const te=document.createElement("div");if(te.className="sap-tl-range-lane-track",ye.label){Pe.dataset.label=ye.label;const Z=document.createElement("span");Z.className="sap-tl-range-lane-label",Z.textContent=ye.label,Z.setAttribute("aria-label",ye.label),Pe.append(Z)}for(const Z of ye.ranges){const ce=q.player.projectReplayTimeToTimeline(Z.startTime),Le=q.player.projectReplayTimeToTimeline(Z.endTime),{startTimelineTime:ve,endTimelineTime:Be}=d1(ce,Le,_e),et=document.createElement("div");et.className="sap-tl-range-segment",Z.className&&et.classList.add(Z.className),et.style.background=o1(Z),et.title=Z.label??ye.label,et.dataset.active="false",et.style.left=bo(ve,_e),et.style.width=bo(Math.max(0,Be-ve),_e),te.append(et),b.push({range:Z,element:et,startTimelineTime:ve,endTimelineTime:Be})}const V=document.createElement("div");V.className="sap-tl-range-playhead",te.append(V),R.push({element:V}),Pe.append(te),o.append(Pe)}}function H(){x&&(x=!1,r?.setAttribute("data-scrubbing","false"),y&&C?.player.play(),y=!1)}function ie(){if(x||(x=!0,r?.setAttribute("data-scrubbing","true"),!e))return;const q=C?.player;q&&(y=q.getState().playing,y&&q.pause())}return{id:"timeline-overlay",addEventSource(q,Q={}){return i.push({key:Q.id??`events:${t++}`,label:Q.label??"Events",source:q}),I(),()=>{this.removeEventSource(q)}},removeEventSource(q){const Q=i.findIndex(_e=>_e.source===q);return Q<0?!1:(i.splice(Q,1),I(),!0)},refreshEvents(){I()},addRangeSource(q){return s.push(q),O(),()=>{this.removeRangeSource(q)}},removeRangeSource(q){const Q=s.indexOf(q);return Q<0?!1:(s.splice(Q,1),O(),!0)},refreshRanges(){O()},setup(q){C=q,QT(),getComputedStyle(q.container).position==="static"&&(p=!0,w=q.container.style.position,q.container.style.position="relative"),a=document.createElement("div"),a.className="sap-tl-root",r=document.createElement("div"),r.className="sap-tl-shell",r.dataset.scrubbing="false";const Q=document.createElement("div");Q.className="sap-tl-topline";const _e=document.createElement("div");_e.className="sap-tl-primary",c=document.createElement("button"),c.type="button",c.className="sap-tl-toggle sap-tl-track-toggle",d=document.createElement("span"),d.className="sap-tl-toggle-icon",d.setAttribute("aria-hidden","true"),d.textContent=">",u=document.createElement("span"),u.className="sap-tl-toggle-label",u.textContent="Play",c.append(d,u),c.addEventListener("click",()=>{q.player.togglePlayback()}),h=document.createElement("span"),h.className="sap-tl-current",h.textContent="0:00.00",f=document.createElement("span"),f.className="sap-tl-remaining",f.textContent="-0:00.00",_e.append(h),Q.append(_e,f);const ye=document.createElement("div");ye.className="sap-tl-track-wrap",o=document.createElement("div"),o.className="sap-tl-ranges",o.hidden=!0,g=document.createElement("div"),g.className="sap-tl-event-lanes",g.hidden=!0;const Pe=document.createElement("div");Pe.className="sap-tl-track-rail";const te=document.createElement("div");te.className="sap-tl-main-rail",_=document.createElement("div"),_.className="sap-tl-markers",l=document.createElement("input"),l.className="sap-tl-range",l.type="range",l.min="0",l.max=`${q.replay.duration}`,l.step="0.01",l.value="0";const V=()=>{ie()},Z=()=>{l&&q.player.seek(q.player.projectTimelineTimeToReplay(Number(l.value)))},ce=()=>{H()};l.addEventListener("pointerdown",V),l.addEventListener("input",Z),l.addEventListener("change",ce),window.addEventListener("pointerup",ce),window.addEventListener("pointercancel",ce),m=()=>{l?.removeEventListener("pointerdown",V),l?.removeEventListener("input",Z),l?.removeEventListener("change",ce),window.removeEventListener("pointerup",ce),window.removeEventListener("pointercancel",ce)},Pe.append(te,_,l),ye.append(o,g,c,Pe),r.append(Q,ye),a.append(r),q.container.append(a),k(q),Y(q),B({...q,state:q.player.getState()})},onStateChange(q){C=q,B(q)},teardown(q){m?.(),m=null,H(),a?.remove(),a=null,r=null,o=null,g=null,l=null,c=null,d=null,u=null,h=null,f=null,_=null,C=null,M=[],T=[],A=null,v.clear(),b.splice(0,b.length),R.splice(0,R.length),p&&(q.container.style.position=w,p=!1)}}}function h1(n){return`
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
`}const eh=[{stage:"validating",index:1,total:8,label:"Parse replay",start:0,end:.08},{stage:"processing",index:2,total:8,label:"Process replay frames",start:.08,end:.62},{stage:"building-stats",index:3,total:8,label:"Build stats snapshots",start:.62,end:.7},{stage:"serializing-replay",index:4,total:8,label:"Serialize replay data",start:.7,end:.76},{stage:"serializing-stats",index:5,total:8,label:"Serialize stats timeline",start:.76,end:.86},{stage:"normalizing",index:6,total:8,label:"Normalize replay model",start:.86,end:.91},{stage:"decoding-replay",index:7,total:8,label:"Decode replay data",start:.91,end:.94},{stage:"decoding-stats",index:8,total:8,label:"Decode stats chunks",start:.94,end:.99}];function bg(n){return Math.max(0,Math.min(1,n))}function Uc(n,e,t){if(n!==void 0)return bg((n-e)/(t-e))}function th(n){if(n.stage!=="stats-timeline")return n;const e=n.progress;return e===void 0?{...n,stage:"building-stats"}:e<.35?{...n,stage:"building-stats",progress:Uc(e,0,.35)}:e<.55?{...n,stage:"serializing-replay",progress:Uc(e,.35,.55)}:{...n,stage:"serializing-stats",progress:Uc(e,.55,.92)}}function xg(n){const e=th(n);return eh.find(t=>t.stage===e.stage)}function f1(){return eh.map(({stage:n,index:e,total:t,label:i})=>({stage:n,index:e,total:t,label:i}))}function p1(n){const e=xg(n);return{stage:e.stage,index:e.index,total:e.total,label:e.label}}function m1(n){const e=th(n),t=xg(e);return eh.map(({stage:i,index:s,total:a,label:r})=>{if(s<t.index)return{stage:i,index:s,total:a,label:r,state:"complete",completion:1,indeterminate:!1};if(s>t.index)return{stage:i,index:s,total:a,label:r,state:"pending",completion:0,indeterminate:!1};const o=e.progress!==void 0;return{stage:i,index:s,total:a,label:r,state:"active",completion:o?bg(e.progress??0):1,indeterminate:!o}})}function Ma(n){const e=th(n),t=e.progress===void 0?null:Math.round(e.progress*100);switch(e.stage){case"validating":return"Parsing replay...";case"processing":return t!==null&&e.totalFrames!==void 0?`Processing replay frames... ${t}% (${e.processedFrames??0}/${e.totalFrames})`:"Processing replay frames...";case"building-stats":return t!==null?e.totalFrames!==void 0?`Building stats snapshots... ${t}% (${e.processedFrames??0}/${e.totalFrames})`:`Building stats snapshots... ${t}%`:"Building stats snapshots...";case"serializing-replay":return t!==null?`Serializing replay data... ${t}%`:"Serializing replay data...";case"serializing-stats":return t!==null?`Serializing stats timeline... ${t}%`:"Serializing stats timeline...";case"decoding-replay":return t!==null?`Decoding replay data... ${t}%`:"Decoding replay data...";case"decoding-stats":return t!==null?e.totalChunks!==void 0?`Decoding stats chunks... ${t}% (${e.processedChunks??0}/${e.totalChunks})`:`Decoding stats chunks... ${t}%`:"Decoding stats chunks...";case"normalizing":return t!==null?`Normalizing replay model... ${t}%`:"Normalizing replay model...";default:return"Loading replay..."}}function Xa(n,e){return JSON.parse(n.decode(new Uint8Array(e)))}async function g1(n,e,t){t?.({stage:"decoding-stats",progress:0});const i=Xa(n,e.configBuffer);t?.({stage:"decoding-stats",progress:.05}),await Qs();const s=Xa(n,e.replayMetaBuffer);t?.({stage:"decoding-stats",progress:.1}),await Qs();const a=Xa(n,e.eventsBuffer);t?.({stage:"decoding-stats",progress:.15}),await Qs();const r=[],o=e.frameChunkBuffers.length;for(let l=0;l<o;l+=1){const c=e.frameChunkBuffers[l];r.push(...Xa(n,c)),t?.({stage:"decoding-stats",processedChunks:l+1,totalChunks:o,progress:.15+(l+1)/Math.max(1,o)*.85}),await Qs()}return o===0&&t?.({stage:"decoding-stats",progress:1}),{config:i,replay_meta:s,events:a,frames:r}}function Qs(){return typeof requestAnimationFrame!="function"?Promise.resolve():new Promise(n=>requestAnimationFrame(()=>n()))}async function Ll(n,e={}){if(typeof Worker>"u")throw new Error("Replay loading worker is not available in this environment");const t=new Worker(new URL(""+new URL("replayLoader.worker-D2D8j1C-.js",import.meta.url).href,import.meta.url),{type:"module"}),i=n.slice(),s=e.reportEveryNFrames??100;return new Promise((a,r)=>{const o=()=>{t.terminate()};t.onmessage=async c=>{const d=c.data;if(d.type==="progress"){e.onProgress?.(d.progress);return}if(d.type==="error"){o(),r(new Error(d.error));return}o();const u=new TextDecoder;e.onProgress?.({stage:"decoding-replay",progress:0}),await Qs();const h=Xa(u,d.replayBuffer);e.onProgress?.({stage:"decoding-replay",progress:1}),await Qs();const f=await g1(u,d.statsTimelineParts,e.onProgress);a({replay:h,statsTimeline:f})},t.onerror=c=>{o(),r(new Error(c.message||"Replay loading worker failed"))};const l={type:"load-replay",bytes:i.buffer,reportEveryNFrames:s};t.postMessage(l,[i.buffer])})}function _1(n){const e=document.createElement("div");e.className="replay-load-modal",e.hidden=!0;const t=document.createElement("div");t.className="replay-load-modal__dialog",t.setAttribute("role","dialog"),t.setAttribute("aria-modal","true"),t.setAttribute("aria-labelledby","replay-load-modal-title");const i=document.createElement("p");i.className="replay-load-modal__eyebrow",i.textContent="Replay loading";const s=document.createElement("h2");s.id="replay-load-modal-title",s.className="replay-load-modal__title",s.textContent="Preparing replay pipeline";const a=document.createElement("p");a.className="replay-load-modal__status",a.textContent="Preparing replay...";const r=document.createElement("div");r.className="replay-load-modal__phase-list";const o=new Map;for(const f of f1()){const g=document.createElement("div");g.className="replay-load-modal__phase-row",g.dataset.state="pending";const _=document.createElement("p");_.className="replay-load-modal__phase-label",_.textContent=`${f.index}. ${f.label}`;const m=document.createElement("div");m.className="replay-load-modal__phase-bar";const p=document.createElement("div");p.className="replay-load-modal__phase-fill",p.dataset.indeterminate="false",m.append(p),g.append(_,m),r.append(g),o.set(f.stage,{row:g,fill:p})}const l=document.createElement("p");l.className="replay-load-modal__meta",t.append(i,s,a,r,l),e.append(t),n.append(e);let c="";const d=()=>{for(const{row:f,fill:g}of o.values())f.dataset.state="pending",g.style.width="0%",g.dataset.indeterminate="false"},u=f=>{for(const g of m1(f)){const _=o.get(g.stage);_&&(_.row.dataset.state=g.state,_.fill.dataset.indeterminate=g.indeterminate?"true":"false",_.fill.style.width=`${Math.round(g.completion*100)}%`)}},h=f=>{e.hidden=!f};return{show(f,g="Preparing replay..."){c=f,h(!0),d(),s.textContent="Preparing replay pipeline",a.textContent=g,l.textContent=`Loading ${f}`},update(f){h(!0);const g=p1(f);if(u(f),s.textContent=`Phase ${g.index} of ${g.total}: ${g.label}`,a.textContent=Ma(f),f.stage==="processing"&&f.totalFrames!==void 0){l.textContent=`${f.processedFrames??0}/${f.totalFrames} frames`;return}if(f.stage==="decoding-stats"&&f.totalChunks!==void 0){l.textContent=`${f.processedChunks??0}/${f.totalChunks} chunks`;return}l.textContent=c?`Loading ${c}`:""},hide(){h(!1)},destroy(){e.remove()}}}const v1=236,br=4120,y1=2300,b1=16185075,x1=.18,S1=1118481,Fo=5882879,Oo=16761180,w1=.55,Fc=.12,ep=.28,E1=3,M1=4,tp=5,np=2,T1=6,A1=856343,C1=.42,R1=18,P1=.24,L1=10,ip=220,N1=200,Sg=140,I1=220,D1=100,U1=120;function F1(n){const e=N1/2;if(n){const s=-br+ip,a=-e;return{minX:s,maxX:a,centerX:(s+a)/2,width:a-s}}const t=e,i=br-ip;return{minX:t,maxX:i,centerX:(t+i)/2,width:i-t}}function O1(n,e,t){if(n.length<2)return[];const i=Math.min(...n),s=Math.max(...n),a=s-i,r=e?-1:1,o=-r;return a<=t?[{kind:"other",centerY:(i+s)/2,halfDepth:Math.max(t-a/2,t*.35),directions:[r,o]}]:[{kind:"back",centerY:e?i:s,halfDepth:t,directions:[r]},{kind:"forward",centerY:e?s:i,halfDepth:t,directions:[o]}]}function k1(n,e){const t=new qu;return t.moveTo(0,e/2),t.lineTo(n/2,-e/2),t.lineTo(-n/2,-e/2),t.closePath(),new Rl(t)}function sp(n){const e=D1*n,t=new rt({color:S1,transparent:!0,opacity:.9,side:Qe,depthWrite:!1,depthTest:!1}),i=new _t;i.visible=!1;const s=new an(Sg*.55*n,1),a=new ze(s,t);a.position.z=tp,a.renderOrder=22,i.add(a);const r=k1(U1*n,e),o=new ze(r,t);return o.position.z=tp,o.renderOrder=23,i.add(o),{group:i,shaftGeom:s,shaftMesh:a,headGeom:r,headMesh:o,material:t,headLength:e}}function Oc(n,e,t,i){const s=Math.max(t-n.headLength,n.headLength*.2);n.group.position.x=e,n.group.rotation.z=i>0?0:Math.PI,n.shaftMesh.scale.y=s,n.shaftMesh.position.y=-n.headLength/2,n.headMesh.position.y=t/2-n.headLength/2,n.group.visible=!0}function al(n){n.group.visible=!1}function Zs(n,e){const t=new _t;t.visible=!1;const i=new rt({color:b1,transparent:!0,opacity:x1,side:Qe,depthWrite:!1,depthTest:!1}),s=new an(1,1),a=new ze(s,i);a.position.z=E1,a.renderOrder=20,t.add(a);const r=new rt({color:e,transparent:!0,opacity:w1,side:Qe,depthWrite:!1,depthTest:!1}),o=new an(1,1),l=new ze(o,r);l.position.z=M1,l.renderOrder=21,t.add(l);const c=sp(n),d=sp(n);return t.add(c.group),t.add(d.group),{group:t,floorGeom:s,floorMesh:a,floorMaterial:i,stripeGeom:o,stripeMesh:l,stripeMaterial:r,primaryMarker:c,secondaryMarker:d}}function B1(n){n.group.visible=!1,al(n.primaryMarker),al(n.secondaryMarker)}function z1(n,e,t,i){const s=e.halfDepth*2*i,a=br*2*i,r=t.width*i,o=t.centerX*i,l=Sg*i,c=Math.max(s-32*i,n.primaryMarker.headLength*1.15),d=Math.min(c,Math.max(I1*i,s*.6));if(n.group.position.y=e.centerY*i,n.floorMesh.position.x=0,n.floorMesh.scale.set(a,s,1),n.stripeMesh.position.x=o,n.stripeMesh.scale.set(l,s,1),al(n.primaryMarker),al(n.secondaryMarker),e.directions.length===1)Oc(n.primaryMarker,o,d,e.directions[0]);else{const u=r*.18;Oc(n.primaryMarker,o-u,d,e.directions[0]),Oc(n.secondaryMarker,o+u,d,e.directions[1])}n.group.visible=!0}function ap(n){n.group.removeFromParent(),n.shaftGeom.dispose(),n.headGeom.dispose(),n.material.dispose()}class H1{replay;blueBack;blueForward;blueOther;orangeBack;orangeForward;orangeOther;constructor(e,t,i){this.replay=t,this.blueBack=Zs(i,Fo),this.blueForward=Zs(i,Fo),this.blueOther=Zs(i,Fo),this.orangeBack=Zs(i,Oo),this.orangeForward=Zs(i,Oo),this.orangeOther=Zs(i,Oo);for(const s of this.getZones())e.add(s.group)}update(e,t){const{frameIndex:i}=e,s=v1;for(const a of[!0,!1]){const r=this.replay.players.filter(u=>u.isTeamZero===a).length,o=[];for(const u of this.replay.players){if(u.isTeamZero!==a)continue;const h=u.frames[i];h?.position&&o.push(h.position.y)}const l=F1(a),c=this.getTeamZones(a);for(const u of c.values())B1(u);if(r<2||o.length!==r)continue;const d=O1(o,a,s);for(const u of d){const h=c.get(u.kind);h&&z1(h,u,l,t)}}}dispose(){for(const e of this.getZones())e.group.removeFromParent(),e.floorGeom.dispose(),e.floorMaterial.dispose(),e.stripeGeom.dispose(),e.stripeMaterial.dispose(),ap(e.primaryMarker),ap(e.secondaryMarker)}getTeamZones(e){return e?new Map([["back",this.blueBack],["forward",this.blueForward],["other",this.blueOther]]):new Map([["back",this.orangeBack],["forward",this.orangeForward],["other",this.orangeOther]])}getZones(){return[this.blueBack,this.blueForward,this.blueOther,this.orangeBack,this.orangeForward,this.orangeOther]}}function G1(n){return n==null||Number.isNaN(n)?null:n<0?"team-zero":"team-one"}class V1{group;teamZeroSide;teamOneSide;constructor(e,t){this.group=new _t,this.teamZeroSide=this.createHalfFieldSide(Fo),this.teamOneSide=this.createHalfFieldSide(Oo);const i=br*t,s=5120*t;this.teamZeroSide.mesh.position.set(0,-s/2,np),this.teamZeroSide.mesh.scale.set(i*2,s,1),this.teamOneSide.mesh.position.set(0,s/2,np),this.teamOneSide.mesh.scale.set(i*2,s,1),this.group.add(this.teamZeroSide.mesh),this.group.add(this.teamOneSide.mesh),e.add(this.group)}update(e){const t=G1(e);this.teamZeroSide.material.opacity=t==="team-zero"?ep:Fc,this.teamOneSide.material.opacity=t==="team-one"?ep:Fc}dispose(){this.group.removeFromParent(),this.teamZeroSide.mesh.geometry.dispose(),this.teamZeroSide.material.dispose(),this.teamOneSide.mesh.geometry.dispose(),this.teamOneSide.material.dispose()}createHalfFieldSide(e){const t=new an(1,1),i=new rt({color:e,transparent:!0,opacity:Fc,side:Qe,depthWrite:!1,depthTest:!1}),s=new ze(t,i);return s.renderOrder=18,{mesh:s,material:i}}}function $1(n,e){const t=new _t,i=br*2*e,s=(a,r,o)=>{const l=new an(i,r*e),c=new rt({color:A1,transparent:!0,opacity:o,side:Qe,depthWrite:!1,depthTest:!1}),d=new ze(l,c);return d.position.set(0,a,T1),d.renderOrder=24,d};for(const a of[-1,1]){const r=a*y1*e;t.add(s(r,R1,C1))}return t.add(s(0,L1,P1)),n.add(t),t}function Nt(n){return n===void 0||Number.isNaN(n)?"?":`${Math.round(n)}`}function Wd(n,e,t=1){return n===void 0||e===void 0||Number.isNaN(n)||Number.isNaN(e)||e<=0?"?":`${(n*100/e).toFixed(t)}%`}function In(n,e){return`<div class="stat-row"><span class="label">${n}</span><span class="value">${e}</span></div>`}function W1(n,e){return`
      ${In("50s",Nt(n?.count))}
      ${In("Blue wins",`${Nt(n?.wins)} (${Wd(n?.wins,n?.count)})`)}
      ${In("Orange wins",`${Nt(n?.losses)} (${Wd(n?.losses,n?.count)})`)}
      ${In("Neutral",Nt(n?.neutral_outcomes))}
      ${In("Blue poss after",Nt(n?.possession_after_count))}
      ${In("Orange poss after",Nt(n?.opponent_possession_after_count))}
      ${In("Kickoff 50s",Nt(n?.kickoff_count))}
      ${In("Blue kickoff wins",Nt(n?.kickoff_wins))}
      ${In("Orange kickoff wins",Nt(n?.kickoff_losses))}
      ${In("Blue kickoff poss",Nt(n?.kickoff_possession_after_count))}
      ${In("Orange kickoff poss",Nt(n?.kickoff_opponent_possession_after_count))}
    `}function rp(n){return`
    <div class="stat-row"><span class="label">50s</span><span class="value">${Nt(n?.count)}</span></div>
    <div class="stat-row"><span class="label">Wins</span><span class="value">${Nt(n?.wins)} (${Wd(n?.wins,n?.count)})</span></div>
    <div class="stat-row"><span class="label">Losses</span><span class="value">${Nt(n?.losses)}</span></div>
    <div class="stat-row"><span class="label">Neutral</span><span class="value">${Nt(n?.neutral_outcomes)}</span></div>
    <div class="stat-row"><span class="label">Poss after</span><span class="value">${Nt(n?.possession_after_count)}</span></div>
    <div class="stat-row"><span class="label">Kickoff 50s</span><span class="value">${Nt(n?.kickoff_count)}</span></div>
    <div class="stat-row"><span class="label">Kickoff wins</span><span class="value">${Nt(n?.kickoff_wins)}</span></div>
    <div class="stat-row"><span class="label">Kickoff poss</span><span class="value">${Nt(n?.kickoff_possession_after_count)}</span></div>
  `}function X1(n,e=1,t=""){return n===void 0||Number.isNaN(n)?"?":`${n.toFixed(e)}${t}`}function q1(n,e,t=1){return n===void 0||e===void 0||Number.isNaN(n)||Number.isNaN(e)||e<=0?"?":`${(n*100/e).toFixed(t)}%`}function op(n,e,t=1){if(n===void 0||Number.isNaN(n))return"?";const i=q1(n,e,t);return i==="?"?`${n.toFixed(t)}s`:`${n.toFixed(t)}s (${i})`}function lp(n){return n.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Xd(n,e){return`<div class="stat-row"><span class="label">${lp(n)}</span><span class="value">${lp(e)}</span></div>`}function Y1(n){const e=new Set,t=[];for(const i of n??[])e.has(i)||(e.add(i),t.push(i));return t}function wg(n,e){return n==="neutral"?"Neutral":e.kind==="shared"?n==="own"?"Blue control":"Orange control":n==="own"?"Team control":"Opp control"}function qd(n){return n.kind==="shared"?["own","neutral","opponent"]:["own","neutral","opponent"]}function Z1(n,e){return n==="neutral_third"?"Neutral third":e.kind==="shared"?n==="defensive_third"?"Blue third":"Orange third":n==="defensive_third"?"Own third":"Opp third"}function K1(n){return n.kind==="shared"?["defensive_third","neutral_third","offensive_third"]:["defensive_third","neutral_third","offensive_third"]}function j1(n,e,t,i){for(const s of t){const a=s==="possession_state"?qd(i):K1(i),r=a.indexOf(n[s]),o=a.indexOf(e[s]),l=r===-1?Number.MAX_SAFE_INTEGER:r,c=o===-1?Number.MAX_SAFE_INTEGER:o;if(l!==c)return l-c}return 0}function J1(n,e,t){const i=(s,a)=>s==="possession_state"?wg(a,t):Z1(a,t);if(e.length===1){const s=e[0];return i(s,n[s])}return e.map(s=>i(s,n[s])).join(" / ")}function Q1(n,e,t,i){if(e.length===0)return"";const s=new Map;if(n?.labeled_time?.entries?.length)for(const a of n.labeled_time.entries){const r=new Map(a.labels.map(u=>[u.key,u.value])),o={};let l=!0;for(const u of e){const h=r.get(u);if(h===void 0){l=!1;break}o[u]=h}if(!l)continue;const c=e.map(u=>`${u}:${o[u]}`).join("|"),d=s.get(c);d?d.total+=a.value:s.set(c,{values:o,total:a.value})}if(s.size===0&&e.length===1&&e[0]==="possession_state"){const a=new Map;return n&&(a.set("own",n.possession_time),a.set("neutral",n.neutral_time??0),a.set("opponent",n.opponent_possession_time)),qd(i).some(r=>(a.get(r)??0)>0)?qd(i).filter(r=>a.has(r)).map(r=>Xd(wg(r,i),op(a.get(r),t))).join(""):""}return[...s.values()].sort((a,r)=>j1(a.values,r.values,e,i)).map(a=>Xd(J1(a.values,e,i),op(a.total,t))).join("")}function cp(n,e){const t=n?.tracked_time,i=Y1(e.breakdownClasses),s=Q1(n,i,t,e.labelPerspective);return`
    ${Xd("Tracked",X1(t,1,"s"))}
    ${s}
  `}function eA(n,e=1,t=""){return n===void 0||Number.isNaN(n)?"?":`${n.toFixed(e)}${t}`}function tA(n,e,t=1){return n===void 0||e===void 0||Number.isNaN(n)||Number.isNaN(e)||e<=0?"?":`${(n*100/e).toFixed(t)}%`}function nA(n,e,t=1){if(n===void 0||Number.isNaN(n))return"?";const i=tA(n,e,t);return i==="?"?`${n.toFixed(t)}s`:`${n.toFixed(t)}s (${i})`}function dp(n){return n.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Eg(n,e){return`<div class="stat-row"><span class="label">${dp(n)}</span><span class="value">${dp(e)}</span></div>`}function iA(n,e){return n==="neutral"?"Neutral zone":e.kind==="shared"?n==="defensive_half"?"Blue side":"Orange side":n==="defensive_half"?"Own half":"Opp half"}function sA(n,e,t){const i=new Map;if(n&&(i.set("defensive_half",n.defensive_half_time),i.set("neutral",n.neutral_time??0),i.set("offensive_half",n.offensive_half_time)),n?.labeled_time?.entries?.length){i.clear();for(const a of n.labeled_time.entries){const r=a.labels.find(o=>o.key==="field_half")?.value;r&&i.set(r,(i.get(r)??0)+a.value)}}const s=["defensive_half","neutral","offensive_half"];return s.some(a=>(i.get(a)??0)>0)?s.filter(a=>i.has(a)).map(a=>Eg(iA(a,t),nA(i.get(a),e))).join(""):""}function up(n,e){const t=n?.tracked_time,i=sA(n,t,e.labelPerspective);return`
    ${i.length===0?Eg("Tracked",eA(t,1,"s")):""}
    ${i}
  `}function ss(n){return n===void 0||Number.isNaN(n)?"?":`${Math.round(n)}`}function as(n,e){return`<div class="stat-row"><span class="label">${n}</span><span class="value">${e}</span></div>`}function kc(n){return`
    ${as("Rushes",ss(n?.count))}
    ${as("2v1",ss(n?.two_v_one_count))}
    ${as("2v2",ss(n?.two_v_two_count))}
    ${as("2v3",ss(n?.two_v_three_count))}
    ${as("3v1",ss(n?.three_v_one_count))}
    ${as("3v2",ss(n?.three_v_two_count))}
    ${as("3v3",ss(n?.three_v_three_count))}
  `}const hp="subtr-actor-fifty-fifty-overlay-styles",aA=5882879,rA=16761180,oA=15988472,lA=180,cA=4;function Yd(n){if(!n)return null;const[e,t]=Object.entries(n)[0]??["Unknown","unknown"],i=typeof t=="string"?t:JSON.stringify(t);return`${e}:${i}`}function fp(n,e){const t=Yd(e);return t?n.players.find(i=>i.id===t)?.name??t:"Unknown"}function dA(n,e){const t=fp(e,n.team_zero_player),i=fp(e,n.team_one_player),s=n.is_kickoff?"Kickoff 50/50":"50/50",a=n.winning_team_is_team_0===void 0?null:n.winning_team_is_team_0,r=n.possession_team_is_team_0===void 0?null:n.possession_team_is_team_0,o=a===null?"neutral":a?"blue win":"orange win",l=r===null?"neutral poss":r?"blue poss":"orange poss",c=a===null?"sap-fifty-fifty-overlay-label-neutral":a?"sap-fifty-fifty-overlay-label-blue":"sap-fifty-fifty-overlay-label-orange";return{text:`${s}: ${t} vs ${i} | ${o} | ${l}`,className:c,winnerIsTeamZero:a}}function Mg(n,e){return n.events.fifty_fifty.map(t=>{const i=dA(t,e),s=new L(...t.team_zero_position),a=new L(...t.team_one_position),r=new L(...t.midpoint),o=e.frames[t.start_frame]?.time??t.start_time;return{id:`fifty-fifty:${t.start_frame}:${Yd(t.team_zero_player)}:${Yd(t.team_one_player)}`,time:o,frame:t.start_frame,label:i.text,labelClassName:i.className,axisStart:s,axisEnd:a,midpoint:r,winnerIsTeamZero:i.winnerIsTeamZero}})}function uA(n,e,t){const i=Math.max(.1,t);return n.filter(s=>{const a=e-s.time;return a>=0&&a<=i})}function hA(){if(document.getElementById(hp))return;const n=document.createElement("style");n.id=hp,n.textContent=`
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
  `,document.head.append(n)}function fA(n,e,t,i){if(i.copy(n).project(e),i.z<-1||i.z>1)return!1;const s=t.clientWidth||1,a=t.clientHeight||1;return i.x=(i.x+1)*s/2,i.y=(1-i.y)*a/2,!(i.x<-100||i.x>s+100||i.y<-100||i.y>a+100)}class pA{scene;container;group=new _t;labelRoot;projectedPosition=new L;worldPosition=new L;labelOffset=new L(0,0,lA);markers;views=new Map;changedContainerPosition=!1;originalContainerPosition="";decaySeconds=cA;constructor(e,t,i,s){hA(),this.scene=e,this.container=t,this.markers=Mg(s,i),getComputedStyle(t).position==="static"&&(this.changedContainerPosition=!0,this.originalContainerPosition=t.style.position,t.style.position="relative"),this.group.name="fifty-fifty-overlay",this.scene.replayRoot.add(this.group),this.labelRoot=document.createElement("div"),this.labelRoot.className="sap-fifty-fifty-overlay-root",this.container.append(this.labelRoot)}update(e){const t=uA(this.markers,e,this.decaySeconds),i=new Set(t.map(s=>s.id));for(const[s,a]of this.views.entries())i.has(s)||(a.line.removeFromParent(),a.line.geometry.dispose(),a.material.dispose(),a.label.remove(),this.views.delete(s));for(const s of t){const a=Math.max(0,e-s.time),r=Math.max(0,1-a/this.decaySeconds),o=this.ensureView(s),l=.12+.78*r;o.material.opacity=l;const c=o.line.geometry.getAttribute("position");c.setXYZ(0,s.axisStart.x,s.axisStart.y,s.axisStart.z+24),c.setXYZ(1,s.axisEnd.x,s.axisEnd.y,s.axisEnd.z+24),c.needsUpdate=!0,this.worldPosition.copy(s.midpoint).add(this.labelOffset),this.scene.replayRoot.localToWorld(this.worldPosition),fA(this.worldPosition,this.scene.camera,this.container,this.projectedPosition)?(o.label.hidden=!1,o.label.style.opacity=`${.24+.76*r}`,o.label.style.transform=`translate(${this.projectedPosition.x.toFixed(1)}px, ${this.projectedPosition.y.toFixed(1)}px) translate(-50%, -100%)`):o.label.hidden=!0}}dispose(){for(const e of this.views.values())e.line.removeFromParent(),e.line.geometry.dispose(),e.material.dispose(),e.label.remove();this.views.clear(),this.group.removeFromParent(),this.labelRoot.remove(),this.changedContainerPosition&&(this.container.style.position=this.originalContainerPosition,this.changedContainerPosition=!1)}ensureView(e){const t=this.views.get(e.id);if(t)return t;const i=new Tt().setFromPoints([e.axisStart,e.axisEnd]),s=new Tl({color:e.winnerIsTeamZero===null?oA:e.winnerIsTeamZero?aA:rA,transparent:!0,opacity:.9}),a=new $u(i,s);a.renderOrder=3,this.group.add(a);const r=document.createElement("div");r.className=`sap-fifty-fifty-overlay-label ${e.labelClassName}`,r.textContent=e.label,this.labelRoot.append(r);const o={marker:e,line:a,material:s,label:r};return this.views.set(e.id,o),o}}const pp="subtr-actor-ceiling-shot-overlay-styles",mA=5882879,gA=16761180,_A=16185075,vA=140,yA=215,bA=220,xA=4.5;function Tg(n){if(!n)return null;const[e,t]=Object.entries(n)[0]??["Unknown","unknown"],i=typeof t=="string"?t:JSON.stringify(t);return`${e}:${i}`}function SA(n,e){const t=Tg(e);return t?n.players.find(i=>i.id===t)?.name??t:"Unknown"}function Ag(n,e){return n.events.ceiling_shot.map(t=>{const i=SA(e,t.player),s=Tg(t.player),a=e.frames[t.frame]?.time??t.time,r=t.confidence;return{id:`ceiling-shot:${t.frame}:${s}:${Math.round(r*1e3)}`,time:a,frame:t.frame,isTeamZero:t.is_team_0,playerId:s,playerName:i,ceilingContactPosition:{x:t.ceiling_contact_position[0],y:t.ceiling_contact_position[1],z:t.ceiling_contact_position[2]},touchPosition:{x:t.touch_position[0],y:t.touch_position[1],z:t.touch_position[2]},quality:r,qualityLabel:`${Math.round(r*100)}%`}})}function wA(n,e,t){const i=Math.max(.1,t);return n.filter(s=>{const a=e-s.time;return a>=0&&a<=i})}function EA(){if(document.getElementById(pp))return;const n=document.createElement("style");n.id=pp,n.textContent=`
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
  `,document.head.append(n)}function MA(n,e,t,i){if(i.copy(n).project(e),i.z<-1||i.z>1)return!1;const s=t.clientWidth||1,a=t.clientHeight||1;return i.x=(i.x+1)*s/2,i.y=(1-i.y)*a/2,!(i.x<-100||i.x>s+100||i.y<-100||i.y>a+100)}class TA{scene;container;group=new _t;labelRoot;projectedPosition=new L;worldPosition=new L;labelOffset=new L(0,0,bA);markers;views=new Map;changedContainerPosition=!1;originalContainerPosition="";decaySeconds=xA;constructor(e,t,i,s){EA(),this.scene=e,this.container=t,this.markers=Ag(s,i),getComputedStyle(t).position==="static"&&(this.changedContainerPosition=!0,this.originalContainerPosition=t.style.position,t.style.position="relative"),this.group.name="ceiling-shot-overlay",this.scene.replayRoot.add(this.group),this.labelRoot=document.createElement("div"),this.labelRoot.className="sap-ceiling-shot-overlay-root",this.container.append(this.labelRoot)}update(e){const t=wA(this.markers,e,this.decaySeconds),i=new Set(t.map(s=>s.id));for(const[s,a]of this.views.entries())i.has(s)||(a.ring.removeFromParent(),a.ring.geometry.dispose(),a.ringMaterial.dispose(),a.beam.removeFromParent(),a.beamGeometry.dispose(),a.beamMaterial.dispose(),a.label.remove(),this.views.delete(s));for(const s of t){const a=Math.max(0,e-s.time),r=Math.max(0,1-a/this.decaySeconds),o=this.ensureView(s),l=.14+.6*r,c=.94+(1-r)*.18;o.ringMaterial.opacity=l,o.beamMaterial.opacity=.18+.55*r,o.ring.position.set(s.touchPosition.x,s.touchPosition.y,s.touchPosition.z+12),o.ring.scale.setScalar(c+s.quality*.08),this.worldPosition.set(s.touchPosition.x,s.touchPosition.y,s.touchPosition.z).add(this.labelOffset);const d=MA(this.worldPosition,this.scene.camera,this.container,this.projectedPosition);o.label.style.display=d?"block":"none",d&&(o.label.style.left=`${this.projectedPosition.x}px`,o.label.style.top=`${this.projectedPosition.y}px`,o.label.style.opacity=`${.42+.58*r}`)}}dispose(){for(const e of this.views.values())e.ring.removeFromParent(),e.ring.geometry.dispose(),e.ringMaterial.dispose(),e.beam.removeFromParent(),e.beamGeometry.dispose(),e.beamMaterial.dispose(),e.label.remove();this.views.clear(),this.group.removeFromParent(),this.labelRoot.remove(),this.changedContainerPosition&&(this.container.style.position=this.originalContainerPosition)}ensureView(e){const t=this.views.get(e.id);if(t)return t;const i=e.quality>=.8?_A:e.isTeamZero?mA:gA,s=new rt({color:i,transparent:!0,opacity:.8,side:Qe,depthWrite:!1,depthTest:!1}),a=new Ts(vA,yA,48),r=new ze(a,s);r.renderOrder=30,this.group.add(r);const o=new Tt().setFromPoints([new L(e.ceilingContactPosition.x,e.ceilingContactPosition.y,e.ceilingContactPosition.z),new L(e.touchPosition.x,e.touchPosition.y,e.touchPosition.z)]),l=new Tl({color:i,transparent:!0,opacity:.7,depthWrite:!1,depthTest:!1}),c=new $u(o,l);c.renderOrder=29,this.group.add(c);const d=document.createElement("div");d.className=`sap-ceiling-shot-overlay-label ${e.isTeamZero?"sap-ceiling-shot-overlay-label-blue":"sap-ceiling-shot-overlay-label-orange"}`,d.textContent=`${e.playerName} ceiling shot ${e.qualityLabel}`,this.labelRoot.append(d);const u={marker:e,ring:r,ringMaterial:s,beam:c,beamGeometry:o,beamMaterial:l,label:d};return this.views.set(e.id,u),u}}const mp="subtr-actor-touch-overlay-styles",gp=5882879,_p=16761180,AA=120,CA=196,Bc=24,vp=210,yp=5,ko=.1,RA=48;function ot(n){const[e,t]=Object.entries(n)[0]??["Unknown","unknown"],i=typeof t=="string"?t:JSON.stringify(t);return`${e}:${i}`}function PA(n){return{touchCount:n.touch?.touch_count??0,totalBallTravelDistance:n.touch?.total_ball_travel_distance??0,totalBallAdvanceDistance:n.touch?.total_ball_advance_distance??0,totalBallRetreatDistance:n.touch?.total_ball_retreat_distance??0}}function zc(n,e){return Math.max(0,n-e)}function LA(n,e){if(e==="markers")return n.playerName;const t=Math.round(n.totalBallAdvanceDistance),i=Math.round(n.totalBallRetreatDistance);return t>0&&i>0?`${n.playerName} +${t} / -${i} uu`:i>0?`${n.playerName} -${i} uu`:`${n.playerName} +${t} uu`}function Cg(n,e){const t=new Map,i=new Map,s=[];for(const a of n.frames){const r=e.ballFrames[a.frame_number]?.position;for(const o of a.players){const l=ot(o.player_id),c=PA(o),d=t.get(l)??{touchCount:0,totalBallTravelDistance:0,totalBallAdvanceDistance:0,totalBallRetreatDistance:0},u=i.get(l),h=zc(c.totalBallTravelDistance,d.totalBallTravelDistance),f=zc(c.totalBallAdvanceDistance,d.totalBallAdvanceDistance),g=zc(c.totalBallRetreatDistance,d.totalBallRetreatDistance);if(u!==void 0&&r&&(h>ko||f>ko||g>ko)){const x=s[u];x&&(x.totalBallTravelDistance+=h,x.totalBallAdvanceDistance+=f,x.totalBallRetreatDistance+=g,x.endPosition={x:r.x,y:r.y,z:r.z})}const _=Math.max(0,c.touchCount-d.touchCount);if(_===0){t.set(l,c);continue}const m=o.touch?.last_touch_frame??a.frame_number,p=e.frames[m]?.time??o.touch?.last_touch_time??a.time,w=e.ballFrames[m]?.position;if(!w){t.set(l,c);continue}for(let x=0;x<_;x+=1){const y=s.length;s.push({id:`touch-stat:${m}:${l}:${c.touchCount-_+x+1}`,time:p,frame:m,isTeamZero:o.is_team_0,playerId:l,playerName:o.name,position:{x:w.x,y:w.y,z:w.z},endPosition:{x:w.x,y:w.y,z:w.z},totalBallTravelDistance:0,totalBallAdvanceDistance:0,totalBallRetreatDistance:0}),i.set(l,y)}t.set(l,c)}}return s}function NA(n,e,t){const i=Math.max(.1,t);return n.filter(s=>{const a=e-s.time;return a>=0&&a<=i})}function IA(){if(document.getElementById(mp))return;const n=document.createElement("style");n.id=mp,n.textContent=`
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
  `,document.head.append(n)}function DA(n,e,t,i){if(i.copy(n).project(e),i.z<-1||i.z>1)return!1;const s=t.clientWidth||1,a=t.clientHeight||1;return i.x=(i.x+1)*s/2,i.y=(1-i.y)*a/2,!(i.x<-100||i.x>s+100||i.y<-100||i.y>a+100)}function Rg(n){return[n.line.material,n.cone.material].flatMap(e=>Array.isArray(e)?e:[e])}function bp(n,e){for(const t of Rg(n))t.transparent=!0,t.opacity=e,t.depthWrite=!1,t.depthTest=!1}function xp(n){n.removeFromParent(),n.line.geometry.dispose(),n.cone.geometry.dispose();for(const e of Rg(n))e.dispose()}class UA{scene;container;group=new _t;labelRoot;projectedPosition=new L;worldPosition=new L;arrowStart=new L;arrowEnd=new L;arrowDirection=new L;labelOffset=new L(0,0,vp);markers;views=new Map;changedContainerPosition=!1;originalContainerPosition="";decaySeconds=yp;mode="markers";constructor(e,t,i,s,a){IA(),this.scene=e,this.container=t,this.decaySeconds=Math.max(.1,a?.decaySeconds??yp),this.mode=a?.mode??"markers",this.labelOffset.set(0,0,vp),this.markers=Cg(s,i),getComputedStyle(t).position==="static"&&(this.changedContainerPosition=!0,this.originalContainerPosition=t.style.position,t.style.position="relative"),this.group.name="touch-event-overlay",this.scene.replayRoot.add(this.group),this.labelRoot=document.createElement("div"),this.labelRoot.className="sap-touch-overlay-root",this.container.append(this.labelRoot)}getDecaySeconds(){return this.decaySeconds}setDecaySeconds(e){this.decaySeconds=Math.max(.1,e)}getMode(){return this.mode}setMode(e){this.mode=e}update(e){const t=NA(this.markers,e,this.decaySeconds),i=new Set(t.map(s=>s.id));for(const[s,a]of this.views.entries())i.has(s)||(a.ring.removeFromParent(),a.ring.geometry.dispose(),a.material.dispose(),xp(a.arrow),a.label.remove(),this.views.delete(s));for(const s of t){const a=Math.max(0,e-s.time),r=Math.max(0,1-a/this.decaySeconds),o=this.ensureView(s),l=.1+.6*r,c=.95+(1-r)*.28;o.material.opacity=l,o.ring.position.set(s.position.x,s.position.y,s.position.z+Bc),o.ring.scale.setScalar(c),o.label.textContent=LA(s,this.mode),o.label.classList.toggle("sap-touch-overlay-label-advancement",this.mode==="advancement"),this.updateArrow(o,s,l),this.worldPosition.set(s.position.x,s.position.y,s.position.z),this.worldPosition.add(this.labelOffset),this.scene.replayRoot.localToWorld(this.worldPosition),DA(this.worldPosition,this.scene.camera,this.container,this.projectedPosition)?(o.label.hidden=!1,o.label.style.opacity=`${.22+.78*r}`,o.label.style.transform=`translate(${this.projectedPosition.x.toFixed(1)}px, ${this.projectedPosition.y.toFixed(1)}px) translate(-50%, -100%)`):o.label.hidden=!0}}dispose(){for(const e of this.views.values())e.ring.removeFromParent(),e.ring.geometry.dispose(),e.material.dispose(),xp(e.arrow),e.label.remove();this.views.clear(),this.group.removeFromParent(),this.labelRoot.remove(),this.changedContainerPosition&&(this.container.style.position=this.originalContainerPosition,this.changedContainerPosition=!1)}ensureView(e){const t=this.views.get(e.id);if(t)return t;const i=new rt({color:e.isTeamZero?gp:_p,transparent:!0,opacity:.7,side:Qe,depthWrite:!1,depthTest:!1}),s=new ze(new Ts(AA,CA,48),i);s.rotation.x=-Math.PI/2,s.renderOrder=40,this.group.add(s);const a=new _b(new L(0,1,0),new L,1,e.isTeamZero?gp:_p,1,1);a.visible=!1,a.renderOrder=45,a.line.renderOrder=45,a.cone.renderOrder=45,bp(a,.7),this.group.add(a);const r=document.createElement("div");r.className=`sap-touch-overlay-label ${e.isTeamZero?"sap-touch-overlay-label-blue":"sap-touch-overlay-label-orange"}`,r.textContent=e.playerName,r.hidden=!0,this.labelRoot.append(r);const o={marker:e,ring:s,material:i,arrow:a,label:r};return this.views.set(e.id,o),o}updateArrow(e,t,i){if(this.mode!=="advancement"||t.totalBallTravelDistance<=ko){e.arrow.visible=!1;return}this.arrowStart.set(t.position.x,t.position.y,t.position.z+Bc*2),this.arrowEnd.set(t.endPosition.x,t.endPosition.y,t.endPosition.z+Bc*2),this.arrowDirection.copy(this.arrowEnd).sub(this.arrowStart);const s=this.arrowDirection.length();if(s<RA){e.arrow.visible=!1;return}this.arrowDirection.normalize(),e.arrow.visible=!0,e.arrow.position.copy(this.arrowStart),e.arrow.setDirection(this.arrowDirection),e.arrow.setLength(s,Math.min(140,Math.max(42,s*.18)),Math.min(86,Math.max(24,s*.1))),bp(e.arrow,Math.min(.86,i+.12))}}const Ct="#3b82f6",Rt="#f59e0b",FA="#d1d9e0",OA={air_dribble:"AD",ball_carry:"BC",ceiling_shot:"CS",double_tap:"DT",flick:"F",flip_reset:"FR",half_flip:"HF",half_volley:"HV",musty_flick:"M",one_timer:"OT",pass:"P",speed_flip:"SF",wavedash:"WD"},kA=new Set(["wavedash"]);function yi(n,e){return n.players.find(t=>t.id===e)?.name??e}function Jt(n,e,t){return n.frames[e??-1]?.time??t}function Bt(n){return n.split(/[_-]+/).filter(e=>e.length>0).map(e=>`${e.slice(0,1).toUpperCase()}${e.slice(1)}`).join(" ")}function BA(n){return OA[n]??(n.split(/[_-]+/).filter(e=>e.length>0).map(e=>e.slice(0,1).toUpperCase()).join("").slice(0,3)||"M")}function Pg(n){return[...new Set((n?.events.mechanics??[]).filter(e=>nh(e.kind)).map(e=>e.kind))].sort((e,t)=>Bt(e).localeCompare(Bt(t)))}function nh(n){return!kA.has(n)}function ih(n,e,t){const i=t?new Set(t):null,s=new Map(e.players.map(a=>[a.id,a.name]));return(n.events.mechanics??[]).filter(a=>nh(a.kind)&&a.timing.type==="moment"&&(!i||i.has(a.kind))).map(a=>{const r=ot(a.player_id),o=s.get(r)??r,l=Bt(a.kind);return{id:a.id,time:Jt(e,a.timing.frame,a.timing.time),frame:a.timing.frame,kind:a.kind,label:`${o} ${l.toLowerCase()}`,shortLabel:BA(a.kind),playerId:r,playerName:o,isTeamZero:a.is_team_0,color:a.is_team_0?Ct:Rt}})}function Lg(n,e,t){const i=[],s=new Map;for(const a of n.frames)for(const r of a.players){const o=ot(r.player_id),l=t.getCount(r),c=s.get(o)??0;s.set(o,l);const d=Math.max(0,l-c);if(d===0)continue;const u=Jt(e,a.frame_number,a.time);for(let h=0;h<d;h+=1){const f=l-d+h+1;i.push({id:`${t.idPrefix}:${a.frame_number}:${o}:${f}`,time:u,frame:a.frame_number,kind:t.kind,label:t.buildLabel(r),shortLabel:t.shortLabel,playerId:o,playerName:r.name,isTeamZero:r.is_team_0,color:r.is_team_0?Ct:Rt})}}return i}function zA(n){const e=new Set(n),t=new Set(["goal"]);return e.has("core")&&(t.add("save"),t.add("shot"),t.add("assist")),e.has("demo")&&t.add("demo"),[...t]}function Ng(n,e){const t=new Set(zA(e));return n.timelineEvents.filter(i=>t.has(i.kind))}function Ig(n,e){return Mg(n,e).map(t=>({id:t.id,time:t.time,frame:t.frame,kind:"fifty-fifty",label:t.label,shortLabel:t.label.startsWith("Kickoff 50/50")?"KO":"50",isTeamZero:t.winnerIsTeamZero,color:t.winnerIsTeamZero===null?FA:t.winnerIsTeamZero?Ct:Rt}))}function Dg(n,e){const t=[],i=new Map;for(const s of n.frames)for(const a of s.players){const r=ot(a.player_id),o=a.musty_flick?.count??0,l=i.get(r)??0;i.set(r,o);const c=Math.max(0,o-l);if(c===0)continue;const d=a.musty_flick?.last_musty_frame??s.frame_number,u=e.frames[d]?.time??a.musty_flick?.last_musty_time??s.time;for(let h=0;h<c;h+=1)t.push({id:`musty-flick:${d}:${r}:${o-c+h+1}`,time:u,frame:d,kind:"musty-flick",label:`${a.name} musty flick`,shortLabel:"M",playerId:r,playerName:a.name,isTeamZero:a.is_team_0,color:a.is_team_0?Ct:Rt})}return t}function Ug(n,e){const t=[],i=new Map;for(const s of n.frames)for(const a of s.players){const r=ot(a.player_id),o=a.flick?.count??0,l=i.get(r)??0;i.set(r,o);const c=Math.max(0,o-l);if(c===0)continue;const d=a.flick?.last_flick_frame??s.frame_number,u=e.frames[d]?.time??a.flick?.last_flick_time??s.time;for(let h=0;h<c;h+=1)t.push({id:`flick:${d}:${r}:${o-c+h+1}`,time:u,frame:d,kind:"flick",label:`${a.name} flick`,shortLabel:"F",playerId:r,playerName:a.name,isTeamZero:a.is_team_0,color:a.is_team_0?Ct:Rt})}return t}function Fg(n,e){return Cg(n,e).map(t=>({id:t.id,time:t.time,frame:t.frame,kind:"touch",label:`${t.playerName} touch`,shortLabel:"T",playerId:t.playerId,playerName:t.playerName,isTeamZero:t.isTeamZero,color:t.isTeamZero?Ct:Rt}))}function Og(n,e){return n.events.backboard.map((t,i)=>{const s=ot(t.player),a=e.players.find(r=>r.id===s)?.name??s;return{id:`backboard:${t.frame}:${s}:${i}`,time:Jt(e,t.frame,t.time),frame:t.frame,kind:"backboard",label:`${a} backboard`,shortLabel:"BB",playerId:s,playerName:a,isTeamZero:t.is_team_0,color:t.is_team_0?Ct:Rt}})}function kg(n,e){return Ag(n,e).map(t=>({id:t.id,time:t.time,frame:t.frame,kind:"ceiling-shot",label:`${t.playerName} ceiling shot ${t.qualityLabel}`,shortLabel:"CS",playerId:t.playerId,playerName:t.playerName,isTeamZero:t.isTeamZero,color:t.isTeamZero?Ct:Rt}))}function Bg(n,e){return n.events.double_tap.map((t,i)=>{const s=ot(t.player),a=yi(e,s);return{id:`double-tap:${t.frame}:${s}:${i}`,time:Jt(e,t.frame,t.time),frame:t.frame,kind:"double-tap",label:`${a} double tap`,shortLabel:"DT",playerId:s,playerName:a,isTeamZero:t.is_team_0,color:t.is_team_0?Ct:Rt}})}function HA(n,e){return n.events.center.map((t,i)=>{const s=ot(t.player),a=yi(e,s),r=Jt(e,t.frame,t.time),o=Math.round(t.lateral_centering_distance);return{id:`center:${t.frame}:${s}:${i}`,time:r,frame:t.frame,kind:"center",label:`${a} center | ${o}uu lateral`,shortLabel:"C",playerId:s,playerName:a,isTeamZero:t.is_team_0,color:t.is_team_0?Ct:Rt}})}function zg(n,e){return n.events.one_timer.map((t,i)=>{const s=ot(t.player),a=ot(t.passer),r=yi(e,s),o=yi(e,a),l=Jt(e,t.frame,t.time),c=Math.round(t.ball_speed);return{id:`one-timer:${t.frame}:${a}:${s}:${i}`,time:l,frame:t.frame,kind:"one-timer",label:`${r} one-timer from ${o} | ${c}uu/s`,shortLabel:"OT",playerId:s,playerName:r,secondaryPlayerId:a,secondaryPlayerName:o,isTeamZero:t.is_team_0,color:t.is_team_0?Ct:Rt}})}function GA(n){return Bt(n.replace(/_pass$/,""))}function Hg(n,e){return n.events.pass.map((t,i)=>{const s=ot(t.passer),a=ot(t.receiver),r=yi(e,s),o=yi(e,a),l=Jt(e,t.frame,t.time),c=Math.round(t.ball_travel_distance),d=GA(t.pass_kind);return{id:`pass:${t.frame}:${s}:${a}:${i}`,time:l,frame:t.frame,kind:"pass",label:`${r} to ${o} ${d.toLowerCase()} pass | ${c}uu`,shortLabel:"P",playerId:s,playerName:r,secondaryPlayerId:a,secondaryPlayerName:o,isTeamZero:t.is_team_0,color:t.is_team_0?Ct:Rt}})}function VA(n,e){return n.events.half_volley.map((t,i)=>{const s=ot(t.player),a=yi(e,s),r=Jt(e,t.frame,t.time),o=Math.round(t.ball_speed);return{id:`half-volley:${t.frame}:${s}:${i}`,time:r,frame:t.frame,kind:"half-volley",label:`${a} half volley | ${o}uu/s`,shortLabel:"HV",playerId:s,playerName:a,isTeamZero:t.is_team_0,color:t.is_team_0?Ct:Rt}})}function $A(n){return Bt(n.replace(/_goal$/,""))}function Gg(n,e){return n.events.goal_tags.map((t,i)=>{const s=t.scorer?ot(t.scorer):null,a=s?yi(e,s):null,r=Jt(e,t.frame,t.time),o=$A(t.kind),l=Math.round(t.confidence*100);return{id:`goal-tag:${t.goal_index}:${t.kind}:${i}`,time:r,frame:t.frame,kind:"goal-tag",label:`${a??"Goal"} ${o.toLowerCase()} goal ${l}%`,shortLabel:"GT",playerId:s,playerName:a,isTeamZero:t.scoring_team_is_team_0,color:t.scoring_team_is_team_0?Ct:Rt}})}function Vg(n,e){return n.events.goal_context.map((t,i)=>{const s=t.scorer?ot(t.scorer):null,a=s?yi(e,s):null,r=Jt(e,t.frame,t.time);return{id:`goal-context:${t.frame}:${s??"team"}:${i}`,time:r,frame:t.frame,kind:"goal-context",label:a?`${a} goal context`:"Goal context",shortLabel:"GC",playerId:s,playerName:a,isTeamZero:t.scoring_team_is_team_0,color:t.scoring_team_is_team_0?Ct:Rt}})}function $g(n,e){const t=[],i=new Map,s=new Map;for(const a of n.frames){const r=Jt(e,a.frame_number,a.time);for(const o of a.players){const l=ot(o.player_id),c=o.dodge_reset?.count??0,d=i.get(l)??0;i.set(l,c);const u=o.dodge_reset?.on_ball_count??0,h=s.get(l)??0;s.set(l,u);const f=Math.max(0,c-d),g=Math.min(f,Math.max(0,u-h));for(let _=0;_<f;_+=1){const m=c-f+_+1,p=_<g;t.push({id:`dodge-reset:${a.frame_number}:${l}:${m}:${p?"ball":"air"}`,time:r,frame:a.frame_number,kind:"dodge-reset",label:p?`${o.name} ball reset`:`${o.name} dodge reset`,shortLabel:p?"BR":"DR",playerId:l,playerName:o.name,isTeamZero:o.is_team_0,color:o.is_team_0?Ct:Rt})}}}return t}function Wg(n,e){return Lg(n,e,{kind:"ball-carry",idPrefix:"ball-carry",shortLabel:"BC",getCount:t=>t.ball_carry?.carry_count??0,buildLabel:t=>`${t.name} ball carry`})}function Xg(n,e){return Lg(n,e,{kind:"powerslide",idPrefix:"powerslide",shortLabel:"PS",getCount:t=>t.powerslide?.press_count??0,buildLabel:t=>`${t.name} powerslide`})}function qg(n,e){return n.events.speed_flip.map(t=>{const i=t.player?ot(t.player):null,s=i?e.players.find(o=>o.id===i)?.name??i:"Unknown",a=e.frames[t.frame]?.time??t.time,r=Math.round(t.confidence*100);return{id:`speed-flip:${t.frame}:${i}:${Math.round(t.confidence*1e3)}`,time:a,frame:t.frame,kind:"speed-flip",label:`${s} speed flip ${r}%`,shortLabel:"SF",playerId:i,playerName:s,isTeamZero:t.is_team_0,color:t.is_team_0?Ct:Rt}})}function Yg(n,e){return n.events.half_flip.map((t,i)=>{const s=ot(t.player),a=e.players.find(c=>c.id===s)?.name??s,r=Jt(e,t.frame,t.time),o=Math.round(t.confidence*100),l=Math.round(t.end_speed-t.start_speed);return{id:`half-flip:${t.frame}:${s}:${i}`,time:r,frame:t.frame,kind:"half-flip",label:`${a} half flip ${o}% | +${l}uu/s`,shortLabel:"HF",playerId:s,playerName:a,isTeamZero:t.is_team_0,color:t.is_team_0?Ct:Rt}})}function Zg(n,e){return n.events.wavedash.map((t,i)=>{const s=ot(t.player),a=e.players.find(c=>c.id===s)?.name??s,r=Jt(e,t.frame,t.time),o=Math.round(t.confidence*100),l=Math.round(t.horizontal_speed_gain);return{id:`wavedash:${t.frame}:${s}:${i}`,time:r,frame:t.frame,kind:"wavedash",label:`${a} wavedash ${o}% | +${l}uu/s`,shortLabel:"WD",playerId:s,playerName:a,isTeamZero:t.is_team_0,color:t.is_team_0?Ct:Rt}})}function Kg(n,e){return n.events.bump.map((t,i)=>{const s=ot(t.initiator),a=ot(t.victim),r=e.players.find(d=>d.id===s)?.name??s,o=e.players.find(d=>d.id===a)?.name??a,l=Jt(e,t.frame,t.time),c=Math.round(t.confidence*100);return{id:`bump:${t.frame}:${s}:${a}:${i}`,time:l,frame:t.frame,kind:"bump",label:`${r} bumped ${o} ${c}%`,shortLabel:"B",playerId:s,playerName:r,isTeamZero:t.initiator_is_team_0,color:t.initiator_is_team_0?Ct:Rt}})}function WA(n){return n.dodge_active?"DW":n.aerial?"AW":"W"}function XA(n){const e=[n.aerial?"aerial":"grounded"];return n.dodge_active&&e.push("dodge"),e.join(" ")}function jg(n,e){return n.events.whiff.map((t,i)=>{const s=ot(t.player),a=e.players.find(c=>c.id===s)?.name??s,r=Jt(e,t.frame,t.time),o=Math.round(t.closest_approach_distance),l=Math.round(t.approach_speed);return{id:`whiff:${t.frame}:${s}:${i}`,time:r,frame:t.frame,kind:"whiff",label:`${a} ${XA(t)} whiff | ${o}uu closest, ${l}uu/s`,shortLabel:WA(t),playerId:s,playerName:a,isTeamZero:t.is_team_0,color:t.is_team_0?Ct:Rt}})}function qA(n,e,t){const i=new Set(n);let s=Ng(e,i).length;return i.has("fifty-fifty")&&(s+=Ig(t,e).length),i.has("goal-context")&&(s+=Vg(t,e).length),i.has("goal-tags")&&(s+=Gg(t,e).length),i.has("musty-flick")&&(s+=Dg(t,e).length),i.has("flick")&&(s+=Ug(t,e).length),i.has("backboard")&&(s+=Og(t,e).length),i.has("ceiling-shot")&&(s+=kg(t,e).length),i.has("double-tap")&&(s+=Bg(t,e).length),i.has("center")&&(s+=HA(t,e).length),i.has("one-timer")&&(s+=zg(t,e).length),i.has("pass")&&(s+=Hg(t,e).length),i.has("touch")&&(s+=Fg(t,e).length),i.has("dodge-reset")&&(s+=$g(t,e).length),i.has("ball-carry")&&(s+=Wg(t,e).length),i.has("powerslide")&&(s+=Xg(t,e).length),i.has("speed-flip")&&(s+=qg(t,e).length),i.has("half-flip")&&(s+=Yg(t,e).length),i.has("half-volley")&&(s+=VA(t,e).length),i.has("wavedash")&&(s+=Zg(t,e).length),i.has("whiff")&&(s+=jg(t,e).length),i.has("bump")&&(s+=Kg(t,e).length),s}const Jg=.02,Bn=1e-4,YA=200,Qg=.08,ZA="#3b82f6",KA="#f59e0b",Zd={big:"rgba(245, 158, 11, 0.92)",small:"rgba(52, 211, 153, 0.86)"},Sp={both:"rgba(52, 211, 153, 0.86)",ghost:"rgba(239, 68, 68, 0.9)",missed:"rgba(59, 130, 246, 0.9)"},jA={air_dribble:"AD",ball_carry:"BC",ceiling_shot:"CS",double_tap:"DT",flick:"F",half_flip:"HF",half_volley:"HV",musty_flick:"M",one_timer:"OT",pass:"P",wavedash:"WD"};function JA(n){const e=n.config?.pressure_neutral_zone_half_width_y;return typeof e=="number"&&Number.isFinite(e)?Math.max(0,e):YA}function rl(n,e,t){return n?.frames?.[e??-1]?.time??t}function sh(n){return n===!0?ZA:n===!1?KA:null}function QA(n){return jA[n]??(n.split(/[_-]+/).filter(e=>e.length>0).map(e=>e.slice(0,1).toUpperCase()).join("").slice(0,3)||"M")}function e_(n,e,t){const i=t?new Set(t):null,s=new Map(e.players.map(a=>[a.id,a.name]));return(n.events.mechanics??[]).filter(a=>nh(a.kind)&&a.timing.type==="span"&&(!i||i.has(a.kind))).map(a=>{if(a.timing.type!=="span")throw new Error("unreachable non-span mechanic event");const r=Kd(a.player_id),o=s.get(r)??r,l=Bt(a.kind),c=rl(e,a.timing.start_frame,a.timing.start_time),d=Math.max(c,rl(e,a.timing.end_frame,a.timing.end_time));return{id:a.id,startTime:c,endTime:d,lane:`mechanic:${a.kind}`,laneLabel:l,label:`${o} ${l.toLowerCase()}`,shortLabel:QA(a.kind),isTeamZero:a.is_team_0,color:sh(a.is_team_0)??void 0}}).sort((a,r)=>a.startTime!==r.startTime?a.startTime-r.startTime:(a.id??"").localeCompare(r.id??""))}function eC(n,e,t,i,s,a){const r=e?.ballFrames[n]?.position?.y;return typeof r=="number"&&Number.isFinite(r)&&Math.abs(r)<=t+Bn||a>Bn?"neutral":i>s+Bn?"team_zero_side":s>i+Bn?"team_one_side":null}function tC(n,e,t){if(n==="neutral")return{id:`half-control:neutral:${e.toFixed(3)}`,startTime:e,endTime:t,lane:"half-control",laneLabel:"Half Control",label:"Neutral half control",color:"rgba(209, 217, 224, 0.7)",isTeamZero:null};const i=n==="team_zero_side";return{id:`half-control:${n}:${e.toFixed(3)}`,startTime:e,endTime:t,lane:"half-control",laneLabel:"Half Control",label:i?"Blue half control":"Orange half control",color:i?"rgba(89, 195, 255, 0.76)":"rgba(255, 193, 92, 0.76)",isTeamZero:i}}function nC(n,e){const t=[];let i=0,s=0,a=0,r=null;for(const o of n.frames){if(!Number.isFinite(o.time)||!Number.isFinite(o.dt)||o.dt<=0){r=o;continue}const l=o.team_zero?.possession?.possession_time??0,c=o.team_one?.possession?.possession_time??0,d=o.team_zero?.possession?.neutral_time??0,u=l-i,h=c-s,f=d-a;i=l,s=c,a=d;let g=null;const{startTime:_,endTime:m}=ah(o,r,e);u>h+Bn&&u>f+Bn?g={id:`possession:team_zero:${_.toFixed(3)}`,startTime:_,endTime:m,lane:"possession",laneLabel:"Possession",label:"Blue possession",color:"rgba(59, 130, 246, 0.88)",isTeamZero:!0}:h>u+Bn&&h>f+Bn?g={id:`possession:team_one:${_.toFixed(3)}`,startTime:_,endTime:m,lane:"possession",laneLabel:"Possession",label:"Orange possession",color:"rgba(245, 158, 11, 0.88)",isTeamZero:!1}:f>Bn&&(g={id:`possession:neutral:${_.toFixed(3)}`,startTime:_,endTime:m,lane:"possession",laneLabel:"Possession",label:"Neutral possession",color:"rgba(209, 217, 224, 0.7)",isTeamZero:null}),n_(t,g),r=o}return t}function iC(n,e){const t=[];let i=0,s=0,a=0;const r=JA(n);let o=null;for(const l of n.frames){if(!Number.isFinite(l.time)||!Number.isFinite(l.dt)||l.dt<=0){o=l;continue}const c=l.team_zero?.pressure?.defensive_half_time??0,d=l.team_one?.pressure?.defensive_half_time??0,u=l.team_zero?.pressure?.neutral_time??0,h=c-i,f=d-s,g=u-a;i=c,s=d,a=u;const{startTime:_,endTime:m}=ah(l,o,e),p=eC(l.frame_number,e,r,h,f,g),w=p?tC(p,_,m):null;n_(t,w),o=l}return t}function sC(n,e){return n.events.rush.map((t,i)=>{const s=e?.frames[t.start_frame]?.time??t.start_time,a=e?.frames[t.end_frame]?.time??t.end_time,r=`${t.attackers}v${t.defenders}`,o=t.is_team_0;return{id:`rush-range:${t.start_frame}:${t.end_frame}:${i}`,startTime:s,endTime:Math.max(s,a),lane:"rush",laneLabel:"Rush",label:`${o?"Blue":"Orange"} rush ${r}`,color:o?"rgba(59, 130, 246, 0.4)":"rgba(245, 158, 11, 0.4)",isTeamZero:o}})}function aC(n,e={}){const t=t_(e),i=new Set(e.comparisons??["both"]),s=new Set(e.activities??["active","inactive","unknown"]),a=new Set(e.fieldHalves??["own","opponent","unknown"]),r=e.playerIds?new Set(e.playerIds):null;if(t.size===0||!i.has("both")||!s.has("unknown")||!a.has("unknown")||r?.size===0)return[];const o=new Map(n.players.map(c=>[c.id,c.isTeamZero])),l=[];for(const c of n.boostPads)if(t.has(c.size))for(let d=0;d<c.events.length;d+=1){const u=c.events[d];if(u.available||!Number.isFinite(u.time)||r&&!u.playerId||u.playerId&&r&&!r.has(u.playerId))continue;const h=Math.max(0,rl(n,u.frame,u.time)),f=c.size==="big"?"Big":"Small",g=u.playerName?`${u.playerName} `:"",_=u.playerId?o.get(u.playerId)??null:null;l.push({id:`boost-pickup:${c.index}:${u.frame}:${d}`,startTime:h,endTime:Math.max(h+Qg,h),lane:"boost-pickups",laneLabel:"Boost Pickups",label:`${g}picked up ${f.toLowerCase()} boost pad ${c.index}`,shortLabel:c.size==="big"?"100":"12",color:sh(_)??Zd[c.size],isTeamZero:_})}return l.sort((c,d)=>c.startTime!==d.startTime?c.startTime-d.startTime:(c.id??"").localeCompare(d.id??""))}function t_(n){if(n.padTypes)return new Set(n.padTypes);if(n.sizes){const e=new Set(n.sizes),t=new Set;return e.has("big")&&t.add("big"),e.has("small")&&t.add("small"),e.has("big")&&e.has("small")&&t.add("ambiguous"),t}return new Set(["big","small","ambiguous"])}function Kd(n){const[e,t]=Object.entries(n)[0]??["Unknown","unknown"],i=typeof t=="string"?t:JSON.stringify(t);return`${e}:${i}`}function rC(n){return{big:"big",small:"small",ambiguous:"ambiguous"}[n]}function oC(n){return{both:"counted",ghost:"ghost",missed:"missed"}[n]}function lC(n,e){return n==="ghost"?"G":n==="missed"?"M":{big:"100",small:"12",ambiguous:"?"}[e]}function cC(n,e,t={}){const i=n.events?.boost_pickups??[];if(i.length===0&&e)return aC(e,t);const s=t_(t),a=new Set(t.comparisons??["both"]),r=new Set(t.activities??["active","inactive","unknown"]),o=new Set(t.fieldHalves??["own","opponent","unknown"]),l=t.playerIds?new Set(t.playerIds):null;if(s.size===0||a.size===0||r.size===0||o.size===0||l?.size===0)return[];const c=new Map((e?.players??[]).map(d=>[d.id,d.name]));return i.filter(d=>{const u=Kd(d.player_id);return s.has(d.pad_type)&&a.has(d.comparison)&&r.has(d.activity)&&o.has(d.field_half)&&(!l||l.has(u))}).map((d,u)=>{const h=Kd(d.player_id),f=c.get(h)??h,g=Math.max(0,rl(e,d.frame,d.time)),_=oC(d.comparison),m=rC(d.pad_type);return{id:`boost-pickup:${d.comparison}:${d.frame}:${h}:${u}`,startTime:g,endTime:Math.max(g+Qg,g),lane:"boost-pickups",laneLabel:"Boost Pickups",label:`${f} ${_} ${m} boost pickup`,shortLabel:lC(d.comparison,d.pad_type),color:sh(d.is_team_0)??(d.comparison==="both"?d.pad_type==="big"?Zd.big:d.pad_type==="small"?Zd.small:Sp.both:Sp[d.comparison]),isTeamZero:d.is_team_0}}).sort((d,u)=>d.startTime!==u.startTime?d.startTime-u.startTime:(d.id??"").localeCompare(u.id??""))}const dC=[{fieldName:"time_defensive_third",aliases:["time_defensive_zone"],label:"Def third",relativeColor:"own"},{fieldName:"time_neutral_third",aliases:["time_neutral_zone"],label:"Neutral third",relativeColor:"neutral"},{fieldName:"time_offensive_third",aliases:["time_offensive_zone"],label:"Off third",relativeColor:"opp"}];function uC(n,e){return n.relativeColor==="neutral"?"rgba(209, 217, 224, 0.68)":(n.relativeColor==="own"?e:!e)?"rgba(89, 195, 255, 0.74)":"rgba(255, 193, 92, 0.78)"}function hC(n){const[e,t]=Object.entries(n)[0]??["Unknown","unknown"],i=typeof t=="string"?t:JSON.stringify(t);return`${e}:${i}`}function fC(n,e){const t=n.positioning;if(!t)return 0;for(const i of[e.fieldName,...e.aliases??[]]){const s=t[i];if(typeof s=="number"&&Number.isFinite(s))return s}return 0}function pC(n,e){const t=new Map,i=[],s=new Map;let a=null;for(const r of n.frames){if(!Number.isFinite(r.time)||!Number.isFinite(r.dt)||r.dt<=0){a=r;continue}const{startTime:o,endTime:l}=ah(r,a,e);if(l-o<=Bn){a=r;continue}for(const c of r.players){const d=hC(c.player_id),u=t.get(d)??new Map;let h=null,f=0;for(const g of dC){const _=fC(c,g),m=_-(u.get(g.fieldName)??0);m>f+Bn&&(f=m,h=g),u.set(g.fieldName,_)}t.set(d,u),h&&mC(i,s,{id:`time-in-zone:${d}:${h.fieldName}:${o.toFixed(3)}`,startTime:o,endTime:l,lane:`time-in-zone:${d}`,laneLabel:c.name,label:h.label,color:uC(h,c.is_team_0),isTeamZero:c.is_team_0})}a=r}return i}function ah(n,e,t){const i=t?.frames[n.frame_number]?.time??n.time,s=e?t?.frames[e.frame_number]?.time??e.time:Math.max(0,i-n.dt);return{startTime:Math.max(0,s),endTime:Math.max(s,i)}}function n_(n,e){if(!e)return;const t=n[n.length-1];if(t&&t.lane===e.lane&&t.label===e.label&&Math.abs(t.endTime-e.startTime)<=Jg){t.endTime=e.endTime;return}n.push(e)}function mC(n,e,t){if(!t)return;const i=t.lane??"",s=e.get(i);if(s&&s.label===t.label&&Math.abs(s.endTime-t.startTime)<=Jg){s.endTime=t.endTime;return}n.push(t),e.set(i,t)}function gC(n){return new Map(n.frames.map(e=>[e.frame_number,e]))}function At(n,e){return n.get(e)??null}const Hc=236,i_="relative-positioning",_C={last:"Last",upfield:"Upfield",level:"Level",mid:"Mid"};function Fr(n){return n?"team-blue":"team-orange"}function s_(n,e,t){return`<div class="player-card ${t.tone==="shared"?"shared":t.tone==="blue"?"team-blue":"team-orange"}">
    <div class="player-card-header">
      <span class="player-name">${n}</span>
      ${t.metaHtml??""}
    </div>
    ${e}
  </div>`}function jt(n,e,t,i=""){return s_(n,t,{metaHtml:i,tone:e?"blue":"orange"})}function yn(n,e){return`<div class="player-team-stack">${[!0,!1].map(t=>{const i=n.filter(a=>a.is_team_0===t);if(i.length===0)return"";const s=t?"Blue":"Orange";return`<section class="player-team-group ${Fr(t)}">
        <div class="player-team-header">
          <h3>${s} team</h3>
          <span>${i.length} player${i.length===1?"":"s"}</span>
        </div>
        <div class="player-stats-grid">
          ${i.map(e).join("")}
        </div>
      </section>`}).join("")}</div>`}function rh(n,e,t=""){return s_(n,e,{metaHtml:t,tone:"shared"})}function Xt(n,e,t){const i=At(n.statsFrameLookup,e);return i?i.players.find(s=>ot(s.player_id)===t)??null:null}function vC(n,e,t){const i=n.players.find(g=>g.id===e);if(!i||!i.frames[t]?.position)return"mid";const a=i.isTeamZero,r=n.players.filter(g=>g.isTeamZero===a).length,o=[];let l=0;for(const g of n.players){if(g.isTeamZero!==a)continue;const _=g.frames[t];if(!_?.position)continue;const m=a?_.position.y:-_.position.y;o.push(m),g.id===e&&(l=m)}if(r<2||o.length!==r)return"mid";const c=Math.min(...o),d=Math.max(...o);if(d-c<=Hc)return"level";const h=l-c<=Hc,f=d-l<=Hc;return h&&!f?"last":f&&!h?"upfield":"mid"}function yC(n){let e=null,t=null;const i=new Set,s=["possession_state","field_third"];return{id:"possession",label:"Possession",setup(){a()},teardown(){},onBeforeRender(){},getTimelineRanges(o){return nC(o.statsTimeline,o.replay)},getConfig(){return{breakdownClasses:r()}},applyConfig(o){if(i.clear(),o&&typeof o=="object"&&!Array.isArray(o)){const l=o.breakdownClasses;if(Array.isArray(l))for(const c of l)s.includes(c)&&i.add(c)}a(),n.rerenderCurrentState()},renderStats(o,l){const d=At(l.statsFrameLookup,o)?.team_zero?.possession;return d?rh("Control State",cp(d,{labelPerspective:{kind:"shared"},breakdownClasses:r()})):""},renderFocusedPlayerStats(o,l,c){const d=At(c.statsFrameLookup,l),u=Xt(c,l,o),h=u?.is_team_0?d?.team_zero?.possession:d?.team_one?.possession;return!h||!u?"":cp(h,{labelPerspective:{kind:"team"},breakdownClasses:r()})},renderSettings(){if(!e){e=document.createElement("div"),e.className="module-settings-card";const o=document.createElement("div");o.className="module-settings-header";const l=document.createElement("div"),c=document.createElement("p");c.className="module-settings-eyebrow",c.textContent="Stat display";const d=document.createElement("h3");d.textContent="Possession breakdown",l.append(c,d),t=document.createElement("strong"),t.className="metric-readout",o.append(l,t);const u=document.createElement("div");u.className="module-settings-options";const h=document.createElement("label");h.className="toggle";const f=document.createElement("input");f.type="checkbox",f.dataset.breakdownClass="possession_state",f.addEventListener("change",()=>{f.checked?i.add("possession_state"):i.delete("possession_state"),a(),n.rerenderCurrentState(),n.requestConfigSync?.()});const g=document.createElement("span");g.textContent="Control",h.append(f,g),u.append(h);const _=document.createElement("label");_.className="toggle";const m=document.createElement("input");m.type="checkbox",m.dataset.breakdownClass="field_third",m.addEventListener("change",()=>{m.checked?i.add("field_third"):i.delete("field_third"),a(),n.rerenderCurrentState(),n.requestConfigSync?.()});const p=document.createElement("span");p.textContent="Third",_.append(m,p),u.append(_),e.append(o,u)}return a(),e}};function a(){if(e){for(const o of e.querySelectorAll("input[data-breakdown-class]")){const l=o.dataset.breakdownClass;o.checked=l?i.has(l):!1}if(t){const o=s.filter(l=>i.has(l));t.textContent=o.length===0?"Total only":o.map(l=>l==="possession_state"?"Control":"Third").join(" x ")}}}function r(){return s.filter(o=>i.has(o))}}function bC(){let n=null;return{id:"fifty-fifty",label:"50/50",setup(e){n=new pA(e.player.sceneState,e.player.container,e.replay,e.statsTimeline)},teardown(){n?.dispose(),n=null},onBeforeRender(e){n?.update(e.currentTime)},getTimelineEvents(e){return Ig(e.statsTimeline,e.replay)},renderStats(e,t){const i=At(t.statsFrameLookup,e);if(!i)return"";const s=rh("Challenge Summary",W1(i.team_zero?.fifty_fifty)),a=yn(i.players,r=>jt(r.name,r.is_team_0,rp(r.fifty_fifty)));return s+a},renderFocusedPlayerStats(e,t,i){const s=Xt(i,t,e);return s?rp(s.fifty_fifty):""}}}function xC(){let n=null,e=null;return{id:"pressure",label:"Half Control",setup(t){e=t.replay,n=new V1(t.player.sceneState.scene,t.fieldScale)},teardown(){n?.dispose(),n=null,e=null},onBeforeRender(t){const i=e?.ballFrames[t.frameIndex];n?.update(i?.position?.y??null)},getTimelineRanges(t){return iC(t.statsTimeline,t.replay)},renderStats(t,i){const a=At(i.statsFrameLookup,t)?.team_zero?.pressure;return a?rh("Field State",up(a,{labelPerspective:{kind:"shared"}})):""},renderFocusedPlayerStats(t,i,s){const a=At(s.statsFrameLookup,i),r=Xt(s,i,t),o=r?.is_team_0?a?.team_zero?.pressure:a?.team_one?.pressure;return!o||!r?"":up(o,{labelPerspective:{kind:"team"}})}}}function SC(){return{id:"rush",label:"Rush",setup(){},teardown(){},onBeforeRender(){},getTimelineRanges(n){return sC(n.statsTimeline,n.replay)},renderStats(n,e){const t=At(e.statsFrameLookup,n),i=t?.team_zero?.rush,s=t?.team_one?.rush;return!i||!s?"":[jt("Blue Team",!0,kc(i)),jt("Orange Team",!1,kc(s))].join("")},renderFocusedPlayerStats(n,e,t){const i=At(t.statsFrameLookup,e),s=Xt(t,e,n),a=s?.is_team_0?i?.team_zero?.rush:i?.team_one?.rush;return!a||!s?"":kc(a)}}}const jd={speed_band:{valueOrder:["slow","boost","supersonic"],formatValue:n=>({slow:"Slow",boost:"Boost",supersonic:"Supersonic"})[n]??n},height_band:{valueOrder:["ground","low_air","high_air"],formatValue:n=>({ground:"Ground",low_air:"Low air",high_air:"High air"})[n]??n}};function wC(n){const e=new Set,t=[];for(const i of n??[])e.has(i)||(e.add(i),t.push(i));return t}function Gc(n,e=1,t=""){return n===void 0||Number.isNaN(n)?"?":`${n.toFixed(e)}${t}`}function EC(n,e,t=1){return n===void 0||Number.isNaN(n)?"?":e===void 0||Number.isNaN(e)||e<=0?`${n.toFixed(t)}s`:`${n.toFixed(t)}s (${(n*100/e).toFixed(t)}%)`}function wp(n){return n.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Bo(n,e){return`<div class="stat-row"><span class="label">${wp(n)}</span><span class="value">${wp(e)}</span></div>`}function MC(n,e,t){for(const i of t){const{valueOrder:s}=jd[i],a=s.indexOf(n[i]),r=s.indexOf(e[i]),o=a===-1?Number.MAX_SAFE_INTEGER:a,l=r===-1?Number.MAX_SAFE_INTEGER:r;if(o!==l)return o-l}return 0}function TC(n,e){if(e.length===1){const t=e[0];return jd[t].formatValue(n[t])}return e.map(t=>jd[t].formatValue(n[t])).join(" / ")}function AC(n,e,t){if(e.length===0||!n?.labeled_tracked_time?.entries?.length)return"";const i=new Map,s=n?.labeled_tracked_time?.entries??[];for(const a of s){const r=new Map(a.labels.map(u=>[u.key,u.value])),o={};let l=!0;for(const u of e){const h=r.get(u);if(h===void 0){l=!1;break}o[u]=h}if(!l)continue;const c=e.map(u=>`${u}:${o[u]}`).join("|"),d=i.get(c);d?d.total+=a.value:i.set(c,{values:o,total:a.value})}return[...i.values()].sort((a,r)=>MC(a.values,r.values,e)).map(a=>Bo(TC(a.values,e),EC(a.total,t))).join("")}function Ep(n,e={}){const t=n?.tracked_time,i=n&&t&&t>0?n.speed_integral/t:t===0?0:void 0,s=wC(e.breakdownClasses),a=AC(n,s,t);return`
    ${Bo("Tracked",Gc(t,1,"s"))}
    ${Bo("Distance",Gc(n?.total_distance,0," uu"))}
    ${Bo("Avg speed",Gc(i,0," uu/s"))}
    ${a}
  `}const Jd={kind:{label:"Kind",valueOrder:["control","medium_hit","hard_hit"],formatValue:n=>({control:"Control",medium_hit:"Medium",hard_hit:"Hard"})[n]??n},height_band:{label:"Height",valueOrder:["ground","low_air","high_air"],formatValue:n=>({ground:"Ground",low_air:"Low air",high_air:"High air"})[n]??n},surface:{label:"Surface",valueOrder:["ground","air","wall"],formatValue:n=>({ground:"Ground",air:"Air",wall:"Wall"})[n]??n},dodge_state:{label:"Dodge",valueOrder:["no_dodge","dodge"],formatValue:n=>({no_dodge:"No dodge",dodge:"Dodge"})[n]??n}};function CC(n){const e=new Set,t=[];for(const i of n??[])e.has(i)||(e.add(i),t.push(i));return t}function Ni(n){return n===void 0||Number.isNaN(n)?"?":`${Math.round(n)}`}function Vc(n,e=0,t=""){return n===void 0||!Number.isFinite(n)?"?":`${n.toFixed(e)}${t}`}function Mp(n){return n.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function On(n,e){return`<div class="stat-row"><span class="label">${Mp(n)}</span><span class="value">${Mp(e)}</span></div>`}function RC(n,e,t){for(const i of t){const{valueOrder:s}=Jd[i],a=s.indexOf(n[i]),r=s.indexOf(e[i]),o=a===-1?Number.MAX_SAFE_INTEGER:a,l=r===-1?Number.MAX_SAFE_INTEGER:r;if(o!==l)return o-l}return 0}function PC(n,e){if(e.length===1){const t=e[0];return Jd[t].formatValue(n[t])}return e.map(t=>Jd[t].formatValue(n[t])).join(" / ")}function LC(n){return(n?.labeled_touch_counts?.entries??[]).map(e=>({labels:e.labels,count:e.count}))}function NC(n,e){if(e.length===0||n.length===0)return"";const t=new Map;for(const i of n){const s=new Map(i.labels.map(c=>[c.key,c.value])),a={};let r=!0;for(const c of e){const d=s.get(c);if(d===void 0){r=!1;break}a[c]=d}if(!r)continue;const o=e.map(c=>`${c}:${a[c]}`).join("|"),l=t.get(o);l?l.count+=i.count:t.set(o,{values:a,count:i.count})}return[...t.values()].sort((i,s)=>RC(i.values,s.values,e)).map(i=>On(PC(i.values,e),Ni(i.count))).join("")}function IC(n,e){if(!n||e.length!==1)return"";const[t]=e;if(t==="kind")return[On("Control",Ni(n.control_touch_count)),On("Medium",Ni(n.medium_hit_count)),On("Hard",Ni(n.hard_hit_count))].join("");if(t==="height_band"){const i=n.high_aerial_touch_count??0,s=(n.aerial_touch_count??0)-i,a=(n.touch_count??0)-(n.aerial_touch_count??0);return[On("Ground",Ni(a)),On("Low air",Ni(s)),On("High air",Ni(i))].join("")}return""}function Tp(n,e={}){const t=CC(e.breakdownClasses),i=LC(n),s=NC(i,t)||IC(n,t);return`
    ${On("Touches",Ni(n?.touch_count))}
    ${On("Ball advanced",Vc(n?.total_ball_advance_distance,0," uu"))}
    ${On("Ball traveled",Vc(n?.total_ball_travel_distance,0," uu"))}
    ${On("Ball retreated",Vc(n?.total_ball_retreat_distance,0," uu"))}
    ${s}
  `}const Ap="subtr-actor-speed-flip-overlay-styles",DC=5882879,UC=16761180,FC=16185075,OC=150,kC=230,BC=220,zC=4;function a_(n){if(!n)return null;const[e,t]=Object.entries(n)[0]??["Unknown","unknown"],i=typeof t=="string"?t:JSON.stringify(t);return`${e}:${i}`}function HC(n,e){const t=a_(e);return t?n.players.find(i=>i.id===t)?.name??t:"Unknown"}function GC(n,e){return n.events.speed_flip.map(t=>{const i=HC(e,t.player),s=a_(t.player),a=e.frames[t.frame]?.time??t.time,r=t.confidence;return{id:`speed-flip:${t.frame}:${s}:${Math.round(r*1e3)}`,time:a,frame:t.frame,isTeamZero:t.is_team_0,playerId:s,playerName:i,position:{x:t.start_position[0],y:t.start_position[1],z:t.start_position[2]},quality:r,qualityLabel:`${Math.round(r*100)}%`}})}function VC(n,e,t){const i=Math.max(.1,t);return n.filter(s=>{const a=e-s.time;return a>=0&&a<=i})}function $C(){if(document.getElementById(Ap))return;const n=document.createElement("style");n.id=Ap,n.textContent=`
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
  `,document.head.append(n)}function WC(n,e,t,i){if(i.copy(n).project(e),i.z<-1||i.z>1)return!1;const s=t.clientWidth||1,a=t.clientHeight||1;return i.x=(i.x+1)*s/2,i.y=(1-i.y)*a/2,!(i.x<-100||i.x>s+100||i.y<-100||i.y>a+100)}class XC{scene;container;group=new _t;labelRoot;projectedPosition=new L;worldPosition=new L;labelOffset=new L(0,0,BC);markers;views=new Map;changedContainerPosition=!1;originalContainerPosition="";decaySeconds=zC;constructor(e,t,i,s){$C(),this.scene=e,this.container=t,this.markers=GC(s,i),getComputedStyle(t).position==="static"&&(this.changedContainerPosition=!0,this.originalContainerPosition=t.style.position,t.style.position="relative"),this.group.name="speed-flip-overlay",this.scene.replayRoot.add(this.group),this.labelRoot=document.createElement("div"),this.labelRoot.className="sap-speed-flip-overlay-root",this.container.append(this.labelRoot)}update(e){const t=VC(this.markers,e,this.decaySeconds),i=new Set(t.map(s=>s.id));for(const[s,a]of this.views.entries())i.has(s)||(a.ring.removeFromParent(),a.ring.geometry.dispose(),a.material.dispose(),a.label.remove(),this.views.delete(s));for(const s of t){const a=Math.max(0,e-s.time),r=Math.max(0,1-a/this.decaySeconds),o=this.ensureView(s),l=.16+.56*r,c=.96+(1-r)*.22;o.material.opacity=l,o.ring.position.set(s.position.x,s.position.y,s.position.z+14),o.ring.scale.setScalar(c+s.quality*.08),this.worldPosition.set(s.position.x,s.position.y,s.position.z).add(this.labelOffset);const d=WC(this.worldPosition,this.scene.camera,this.container,this.projectedPosition);o.label.style.display=d?"block":"none",d&&(o.label.style.left=`${this.projectedPosition.x}px`,o.label.style.top=`${this.projectedPosition.y}px`,o.label.style.opacity=`${.42+.58*r}`)}}dispose(){for(const e of this.views.values())e.ring.removeFromParent(),e.ring.geometry.dispose(),e.material.dispose(),e.label.remove();this.views.clear(),this.group.removeFromParent(),this.labelRoot.remove(),this.changedContainerPosition&&(this.container.style.position=this.originalContainerPosition)}ensureView(e){const t=this.views.get(e.id);if(t)return t;const i=new rt({color:e.quality>=.75?FC:e.isTeamZero?DC:UC,transparent:!0,opacity:.8,side:Qe,depthWrite:!1,depthTest:!1}),s=new Ts(OC,kC,48),a=new ze(s,i);a.renderOrder=30,this.group.add(a);const r=document.createElement("div");r.className=`sap-speed-flip-overlay-label ${e.isTeamZero?"sap-speed-flip-overlay-label-blue":"sap-speed-flip-overlay-label-orange"}`,r.textContent=`${e.playerName} speed flip ${e.qualityLabel}`,this.labelRoot.append(r);const o={marker:e,ring:a,material:i,label:r};return this.views.set(e.id,o),o}}const xo=[{value:"big",label:"Big pads"},{value:"small",label:"Small pads"},{value:"ambiguous",label:"Ambiguous pads"}],$c=[{value:"both",label:"Pickup events"}],So=[{value:"active",label:"Active play"},{value:"inactive",label:"Inactive play"},{value:"unknown",label:"Unknown activity"}],wo=[{value:"own",label:"Own half"},{value:"opponent",label:"Opponent half"},{value:"unknown",label:"Unknown half"}];function qC(n,e){return n===e||n==="ambiguous"}function YC(n,e){const t=e?.events.boost_pickups??[];return t.length===0?null:t.find(i=>{const s=ot(i.player_id),a=i.reported_frame??i.frame;return s===n.player.id&&i.comparison==="both"&&a===n.event.frame&&qC(i.pad_type,n.pad.size)})??null}function r_(n={}){let e=null,t=null,i=null,s=null,a=null,r=null;const o=new Set(xo.map(T=>T.value)),l=new Set($c.map(T=>T.value)),c=new Set(So.map(T=>T.value)),d=new Set(wo.map(T=>T.value));let u=null,h=!1;function f(T,A,v,b){const R=document.createElement("div");R.className="boost-pickup-filter-group";const I=document.createElement("p");I.className="module-settings-group-title",I.textContent=T;const O=document.createElement("div");O.className="boost-pickup-filter-options";for(const B of A){const G=document.createElement("label");G.className="toggle";const k=document.createElement("input");k.type="checkbox",k.dataset.boostPickupFilter=b,k.dataset.boostPickupValue=B.value,k.addEventListener("change",()=>{k.checked?v.add(B.value):v.delete(B.value),m(a),n.refreshTimelineRanges?.(),n.rerenderCurrentState?.(),n.requestConfigSync?.()});const Y=document.createElement("span");Y.textContent=B.label,G.append(k,Y),O.append(G)}return R.append(I,O),R}function g(){const T=document.createElement("div");T.className="boost-pickup-filter-group boost-pickup-filter-group-wide",i=T;const A=document.createElement("p");return A.className="module-settings-group-title",A.textContent="Player",s=document.createElement("div"),s.className="boost-pickup-filter-options",T.append(A,s),T}function _(T){if(s&&(s.replaceChildren(),i&&(i.hidden=!T||T.players.length===0),!!T))for(const A of T.players){const v=document.createElement("label");v.className="toggle";const b=document.createElement("input");b.type="checkbox",b.dataset.boostPickupPlayerId=A.id,b.addEventListener("change",()=>{u||(u=new Set(T.players.map(I=>I.id))),b.checked?u.add(A.id):u.delete(A.id),m(T),n.refreshTimelineRanges?.(),n.rerenderCurrentState?.(),n.requestConfigSync?.()});const R=document.createElement("span");R.textContent=`${A.name} (${A.isTeamZero?"Blue":"Orange"})`,v.append(b,R),s.append(v)}}function m(T){if(e){for(const A of e.querySelectorAll("input[data-boost-pickup-filter][data-boost-pickup-value]")){const v=A.dataset.boostPickupFilter,b=A.dataset.boostPickupValue;A.checked=p(v,b)}for(const A of e.querySelectorAll("input[data-boost-pickup-player-id]")){const v=A.dataset.boostPickupPlayerId;A.checked=v?u?.has(v)??!0:!1}t&&(t.textContent=w(T))}}function p(T,A){if(!A)return!1;switch(T){case"pad-type":return o.has(A);case"comparison":return l.has(A);case"activity":return c.has(A);case"field-half":return d.has(A);default:return!1}}function w(T){const A=T?.players.length??0,v=u?u.size:A;if(o.size===0||l.size===0||c.size===0||d.size===0||u!==null&&u.size===0)return"Hidden";const R=[o.size<xo.length,l.size<$c.length,c.size<So.length,d.size<wo.length,u!==null&&v<A].filter(Boolean).length;return R===0?"All labels":`${R} filters`}function x(T){if(u&&!u.has(T.player.id))return!1;if((r?.events.boost_pickups??[]).length===0)return o.has(T.pad.size)&&l.has("both")&&c.has("unknown")&&d.has("unknown");const A=YC(T,r);return A?o.has(A.pad_type)&&l.has(A.comparison)&&c.has(A.activity)&&d.has(A.field_half):!1}function y(T,A,v){if(T.clear(),!Array.isArray(v)){for(const R of A)T.add(R.value);return}const b=new Set(A.map(R=>R.value));for(const R of v)typeof R=="string"&&b.has(R)&&T.add(R)}function C(){return{padTypes:[...o],comparisons:[...l],activities:[...c],fieldHalves:[...d],playerIds:u?[...u]:null}}function M(T){if(!T||typeof T!="object"||Array.isArray(T))return;const A=T;y(o,xo,A.padTypes),y(l,$c,A.comparisons),y(c,So,A.activities),y(d,wo,A.fieldHalves),u=Array.isArray(A.playerIds)?new Set(A.playerIds.filter(v=>typeof v=="string")):null,h=a===null&&u!==null,m(a),n.refreshTimelineRanges?.(),n.rerenderCurrentState?.(),n.requestConfigSync?.()}return{setup(T){a!==T.replay&&(a=T.replay,h?h=!1:u=null),r=T.statsTimeline,m(T.replay)},teardown(){},getConfig:C,applyConfig:M,getTimelineRangeOptions(){const T={padTypes:o,comparisons:l,activities:c,fieldHalves:d};return u&&(T.playerIds=u),T},includePickup:x,renderSettings(T,A){if(!e){e=document.createElement("div"),e.className="boost-pickup-filter-panel";const v=document.createElement("div");v.className="boost-pickup-filter-summary",t=document.createElement("strong"),t.className="metric-readout",v.append(t);const b=document.createElement("div");b.className="boost-pickup-filter-grid",b.append(f("Pad type",xo,o,"pad-type"),f("Activity",So,c,"activity"),f("Field half",wo,d,"field-half"),g()),(A.showHeader??!1)&&e.append(v),e.append(b)}return _(T?.replay??null),m(T?.replay??null),e}}}function bn(n){return{id:n.id,label:n.label,setup(){},teardown(){},onBeforeRender(){},getTimelineEvents:n.getTimelineEvents,renderStats(e,t){const i=At(t.statsFrameLookup,e);return i?yn(i.players,s=>jt(s.name,s.is_team_0,n.render(n.select(s),s))):""},renderFocusedPlayerStats(e,t,i){const s=Xt(i,t,e);return s?n.render(n.select(s),s):""}}}const ZC=255;function As(n){return n*100/ZC}function Un(n){return n==null?"?":As(n).toFixed(0)}function KC(n,e){const t=Un(n);if(n==null||e==null)return t;const i=Un(n+e);return`${t} (${i})`}function Wc(n){n&&typeof n=="object"&&"dispose"in n&&typeof n.dispose=="function"&&n.dispose()}function jC(n){n&&(n.removeFromParent(),n.traverse(e=>{const t="geometry"in e?e.geometry:null;Wc(t);const i="material"in e?e.material:null;if(Array.isArray(i))for(const s of i)Wc(s);else Wc(i)}))}function JC(){let n=0,e=null;return{acquire(t){e||(e=$1(t.player.sceneState.scene,t.fieldScale)),n+=1},release(){n<=0||(n-=1,n===0&&(jC(e),e=null))}}}const Cp=JC();function Ve(n){return n===void 0||Number.isNaN(n)?"?":`${Math.round(n)}`}function Re(n,e=1,t=""){return n===void 0||Number.isNaN(n)?"?":`${n.toFixed(e)}${t}`}function Qd(n,e=0){return Re(n,e,"%")}function o_(n,e,t=1,i=0){if(n===void 0||Number.isNaN(n))return Qd(e,i);const s=Re(n,t,"s");return e===void 0||Number.isNaN(e)?s:`${s} (${Qd(e,i)})`}function ls(n,e,t=1,i=0){const s=n!==void 0&&e!==void 0&&!Number.isNaN(n)&&!Number.isNaN(e)&&e>0?n*100/e:void 0;return o_(n,s,t,i)}function Ke(n){return typeof n=="number"&&Number.isFinite(n)?n:void 0}function ra(n){const e=Ke(n);return e===void 0?void 0:e*100}function l_(n){return Ke(n?.tracked_time)}function QC(n,e,t){const i=Ke(n?.[e]);if(i!==void 0)return i;const s=l_(n),a=Ke(n?.[t]);if(!(s===void 0||s<=0||a===void 0))return a*100/s}function tn(n,e,t){return o_(Ke(n?.[t]),QC(n,e,t))}function Rp(n,e,t){const i=Ke(n?.[e]);if(i!==void 0)return i;const s=l_(n),a=Ke(n?.[t]);if(!(s===void 0||s<=0||a===void 0))return a/s}function Pp(n){return`
    <div class="stat-row"><span class="label">Most back</span><span class="value">${tn(n,"percent_most_back","time_most_back")}</span></div>
    <div class="stat-row"><span class="label">Most forward</span><span class="value">${tn(n,"percent_most_forward","time_most_forward")}</span></div>
    <div class="stat-row"><span class="label">Mid role</span><span class="value">${tn(n,"percent_mid_role","time_mid_role")}</span></div>
    <div class="stat-row"><span class="label">Other role</span><span class="value">${tn(n,"percent_other_role","time_other_role")}</span></div>
    <div class="stat-row"><span class="label">Closest to ball</span><span class="value">${tn(n,"percent_closest_to_ball","time_closest_to_ball")}</span></div>
    <div class="stat-row"><span class="label">Farthest from ball</span><span class="value">${tn(n,"percent_farthest_from_ball","time_farthest_from_ball")}</span></div>
    <div class="stat-row"><span class="label">Behind ball</span><span class="value">${tn(n,"percent_behind_ball","time_behind_ball")}</span></div>
    <div class="stat-row"><span class="label">Level with ball</span><span class="value">${tn(n,"percent_level_with_ball","time_level_with_ball")}</span></div>
    <div class="stat-row"><span class="label">In front of ball</span><span class="value">${tn(n,"percent_in_front_of_ball","time_in_front_of_ball")}</span></div>
  `}function Lp(n){return`
    <div class="stat-row"><span class="label">Defensive zone</span><span class="value">${tn(n,"percent_defensive_third","time_defensive_third")}</span></div>
    <div class="stat-row"><span class="label">Neutral zone</span><span class="value">${tn(n,"percent_neutral_third","time_neutral_third")}</span></div>
    <div class="stat-row"><span class="label">Offensive zone</span><span class="value">${tn(n,"percent_offensive_third","time_offensive_third")}</span></div>
    <div class="stat-row"><span class="label">Defensive half</span><span class="value">${tn(n,"percent_defensive_half","time_defensive_half")}</span></div>
    <div class="stat-row"><span class="label">Offensive half</span><span class="value">${tn(n,"percent_offensive_half","time_offensive_half")}</span></div>
    <div class="stat-row"><span class="label">To teammates</span><span class="value">${Re(Rp(n,"average_distance_to_teammates","sum_distance_to_teammates"),0)}</span></div>
    <div class="stat-row"><span class="label">To ball</span><span class="value">${Re(Rp(n,"average_distance_to_ball","sum_distance_to_ball"),0)}</span></div>
  `}function rs(n,e){return ls(Ke(n?.[e]),Ke(n?.tracked_time))}function Np(n){return n?n.split("_").map(e=>e.charAt(0).toUpperCase()+e.slice(1)).join(" "):"?"}function eR(n){return`
    <div class="stat-row"><span class="label">Current role</span><span class="value">${Np(n?.current_role_state)}</span></div>
    <div class="stat-row"><span class="label">Current depth</span><span class="value">${Np(n?.current_depth_state)}</span></div>
    <div class="stat-row"><span class="label">First man</span><span class="value">${rs(n,"time_first_man")}</span></div>
    <div class="stat-row"><span class="label">Second man</span><span class="value">${rs(n,"time_second_man")}</span></div>
    <div class="stat-row"><span class="label">Third man</span><span class="value">${rs(n,"time_third_man")}</span></div>
    <div class="stat-row"><span class="label">Ambiguous</span><span class="value">${rs(n,"time_ambiguous_role")}</span></div>
    <div class="stat-row"><span class="label">Behind play</span><span class="value">${rs(n,"time_behind_play")}</span></div>
    <div class="stat-row"><span class="label">Level with play</span><span class="value">${rs(n,"time_level_with_play")}</span></div>
    <div class="stat-row"><span class="label">Ahead of play</span><span class="value">${rs(n,"time_ahead_of_play")}</span></div>
    <div class="stat-row"><span class="label">Became first</span><span class="value">${Ve(n?.became_first_man_count)}</span></div>
    <div class="stat-row"><span class="label">Lost first</span><span class="value">${Ve(n?.lost_first_man_count)}</span></div>
  `}function tR(n){const e=n&&n.shots>0?n.goals*100/n.shots:void 0;return`
    <div class="stat-row"><span class="label">Score</span><span class="value">${Ve(n?.score)}</span></div>
    <div class="stat-row"><span class="label">Goals</span><span class="value">${Ve(n?.goals)}</span></div>
    <div class="stat-row"><span class="label">Assists</span><span class="value">${Ve(n?.assists)}</span></div>
    <div class="stat-row"><span class="label">Saves</span><span class="value">${Ve(n?.saves)}</span></div>
    <div class="stat-row"><span class="label">Shots</span><span class="value">${Ve(n?.shots)}</span></div>
    <div class="stat-row"><span class="label">Shooting %</span><span class="value">${Qd(e)}</span></div>
  `}function nR(n){return`
    <div class="stat-row"><span class="label">Hits</span><span class="value">${Ve(n?.count)}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${Re(Ke(n?.time_since_last_backboard),2,"s")}</span></div>
  `}function iR(n){return`
    <div class="stat-row"><span class="label">Count</span><span class="value">${Ve(n?.count)}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${Re(Ke(n?.time_since_last_double_tap),2,"s")}</span></div>
  `}function sR(n){const e=n&&n.completed_pass_count>0?n.total_pass_distance/n.completed_pass_count:void 0,t=n&&n.completed_pass_count>0?n.total_pass_advance/n.completed_pass_count:void 0;return`
    <div class="stat-row"><span class="label">Completed</span><span class="value">${Ve(n?.completed_pass_count)}</span></div>
    <div class="stat-row"><span class="label">Received</span><span class="value">${Ve(n?.received_pass_count)}</span></div>
    <div class="stat-row"><span class="label">Avg distance</span><span class="value">${Re(e,0)}</span></div>
    <div class="stat-row"><span class="label">Avg advance</span><span class="value">${Re(t,0)}</span></div>
    <div class="stat-row"><span class="label">Longest</span><span class="value">${Re(n?.longest_pass_distance,0)}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${Re(Ke(n?.time_since_last_completed_pass),2,"s")}</span></div>
  `}function aR(n){const e=n&&n.count>0?n.total_ball_speed/n.count:void 0,t=n&&n.count>0?n.total_pass_distance/n.count:void 0;return`
    <div class="stat-row"><span class="label">Attempts</span><span class="value">${Ve(n?.count)}</span></div>
    <div class="stat-row"><span class="label">Avg speed</span><span class="value">${Re(e,0)}</span></div>
    <div class="stat-row"><span class="label">Fastest</span><span class="value">${Re(n?.fastest_ball_speed,0)}</span></div>
    <div class="stat-row"><span class="label">Avg pass distance</span><span class="value">${Re(t,0)}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${Re(Ke(n?.time_since_last_one_timer),2,"s")}</span></div>
  `}function Ip(n){const e=n&&n.count>0?n.cumulative_confidence/n.count:void 0;return`
    <div class="stat-row"><span class="label">Attempts</span><span class="value">${Ve(n?.count)}</span></div>
    <div class="stat-row"><span class="label">High conf</span><span class="value">${Ve(n?.high_confidence_count)}</span></div>
    <div class="stat-row"><span class="label">Last quality</span><span class="value">${Re(Ke(n?.last_confidence),0,"%")}</span></div>
    <div class="stat-row"><span class="label">Avg quality</span><span class="value">${Re(e,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Best quality</span><span class="value">${Re(Ke(n?.best_confidence),0,"%")}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${Re(Ke(n?.time_since_last_ceiling_shot),2,"s")}</span></div>
  `}function rR(n){const e=n&&n.carry_count>0?n.average_horizontal_gap_sum/n.carry_count:void 0;return`
    <div class="stat-row"><span class="label">Carries</span><span class="value">${Ve(n?.carry_count)}</span></div>
    <div class="stat-row"><span class="label">Total time</span><span class="value">${Re(n?.total_carry_time,1,"s")}</span></div>
    <div class="stat-row"><span class="label">Longest</span><span class="value">${Re(n?.longest_carry_time,1,"s")}</span></div>
    <div class="stat-row"><span class="label">Furthest</span><span class="value">${Re(n?.furthest_carry_distance,0)}</span></div>
    <div class="stat-row"><span class="label">Avg gap</span><span class="value">${Re(e,0)}</span></div>
  `}function oR(n){const e=n&&n.count>0?n.average_horizontal_gap_sum/n.count:void 0,t=n&&n.count>0?n.total_touch_count/n.count:void 0;return`
    <div class="stat-row"><span class="label">Air dribbles</span><span class="value">${Ve(n?.count)}</span></div>
    <div class="stat-row"><span class="label">Ground to air</span><span class="value">${Ve(n?.ground_to_air_count)}</span></div>
    <div class="stat-row"><span class="label">Wall to air</span><span class="value">${Ve(n?.wall_to_air_count)}</span></div>
    <div class="stat-row"><span class="label">Avg touches</span><span class="value">${Re(t,1)}</span></div>
    <div class="stat-row"><span class="label">Max touches</span><span class="value">${Ve(n?.max_touch_count)}</span></div>
    <div class="stat-row"><span class="label">Total time</span><span class="value">${Re(n?.total_time,1,"s")}</span></div>
    <div class="stat-row"><span class="label">Longest</span><span class="value">${Re(n?.longest_time,1,"s")}</span></div>
    <div class="stat-row"><span class="label">Furthest</span><span class="value">${Re(n?.furthest_distance,0)}</span></div>
    <div class="stat-row"><span class="label">Avg gap</span><span class="value">${Re(e,0)}</span></div>
  `}function lR(n){const e=n&&n.press_count>0?n.total_duration/n.press_count:void 0;return`
    <div class="stat-row"><span class="label">Presses</span><span class="value">${Ve(n?.press_count)}</span></div>
    <div class="stat-row"><span class="label">Total time</span><span class="value">${Re(n?.total_duration,1,"s")}</span></div>
    <div class="stat-row"><span class="label">Avg duration</span><span class="value">${Re(e,2,"s")}</span></div>
  `}function cR(n){const e=n&&n.whiff_count>0?n.cumulative_closest_approach_distance/n.whiff_count:void 0;return`
    <div class="stat-row"><span class="label">Whiffs</span><span class="value">${Ve(n?.whiff_count)}</span></div>
    <div class="stat-row"><span class="label">Grounded</span><span class="value">${Ve(n?.grounded_whiff_count)}</span></div>
    <div class="stat-row"><span class="label">Aerial</span><span class="value">${Ve(n?.aerial_whiff_count)}</span></div>
    <div class="stat-row"><span class="label">Dodge</span><span class="value">${Ve(n?.dodge_whiff_count)}</span></div>
    <div class="stat-row"><span class="label">Last closest</span><span class="value">${Re(Ke(n?.last_closest_approach_distance),0)}</span></div>
    <div class="stat-row"><span class="label">Best closest</span><span class="value">${Re(Ke(n?.best_closest_approach_distance),0)}</span></div>
    <div class="stat-row"><span class="label">Avg closest</span><span class="value">${Re(e,0)}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${Re(Ke(n?.time_since_last_whiff),2,"s")}</span></div>
  `}function dR(n){return`
    <div class="stat-row"><span class="label">Inflicted</span><span class="value">${Ve(n?.demos_inflicted)}</span></div>
    <div class="stat-row"><span class="label">Taken</span><span class="value">${Ve(n?.demos_taken)}</span></div>
  `}function uR(n){const e=n&&n.bumps_inflicted>0?n.cumulative_bump_strength/n.bumps_inflicted:void 0;return`
    <div class="stat-row"><span class="label">Inflicted</span><span class="value">${Ve(n?.bumps_inflicted)}</span></div>
    <div class="stat-row"><span class="label">Taken</span><span class="value">${Ve(n?.bumps_taken)}</span></div>
    <div class="stat-row"><span class="label">Team inflicted</span><span class="value">${Ve(n?.team_bumps_inflicted)}</span></div>
    <div class="stat-row"><span class="label">Team taken</span><span class="value">${Ve(n?.team_bumps_taken)}</span></div>
    <div class="stat-row"><span class="label">Last strength</span><span class="value">${Re(Ke(n?.last_bump_strength),0)}</span></div>
    <div class="stat-row"><span class="label">Max strength</span><span class="value">${Re(Ke(n?.max_bump_strength),0)}</span></div>
    <div class="stat-row"><span class="label">Avg strength</span><span class="value">${Re(e,0)}</span></div>
  `}function hR(n){return`
    <div class="stat-row"><span class="label">Count</span><span class="value">${Ve(n?.count)}</span></div>
    <div class="stat-row"><span class="label">On ball</span><span class="value">${Ve(n?.on_ball_count)}</span></div>
  `}function Dp(n){const e=n&&n.count>0?n.cumulative_confidence/n.count:void 0;return`
    <div class="stat-row"><span class="label">Attempts</span><span class="value">${Ve(n?.count)}</span></div>
    <div class="stat-row"><span class="label">High conf</span><span class="value">${Ve(n?.high_confidence_count)}</span></div>
    <div class="stat-row"><span class="label">Last quality</span><span class="value">${Re(Ke(n?.last_confidence),0,"%")}</span></div>
    <div class="stat-row"><span class="label">Avg quality</span><span class="value">${Re(e,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Best quality</span><span class="value">${Re(Ke(n?.best_confidence),0,"%")}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${Re(Ke(n?.time_since_last_musty),2,"s")}</span></div>
  `}function Up(n){const e=n&&n.count>0?n.cumulative_confidence/n.count:void 0,t=n&&n.count>0?n.cumulative_setup_duration/n.count:void 0,i=n&&n.count>0?n.cumulative_ball_speed_change/n.count:void 0;return`
    <div class="stat-row"><span class="label">Attempts</span><span class="value">${Ve(n?.count)}</span></div>
    <div class="stat-row"><span class="label">High conf</span><span class="value">${Ve(n?.high_confidence_count)}</span></div>
    <div class="stat-row"><span class="label">Last quality</span><span class="value">${Re(Ke(n?.last_confidence),0,"%")}</span></div>
    <div class="stat-row"><span class="label">Avg quality</span><span class="value">${Re(e,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Avg setup</span><span class="value">${Re(t,2,"s")}</span></div>
    <div class="stat-row"><span class="label">Avg impulse</span><span class="value">${Re(i,0,"uu/s")}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${Re(Ke(n?.time_since_last_flick),2,"s")}</span></div>
  `}function Fp(n){const e=n&&n.count>0?n.cumulative_quality/n.count:void 0;return`
    <div class="stat-row"><span class="label">Attempts</span><span class="value">${Ve(n?.count)}</span></div>
    <div class="stat-row"><span class="label">High conf</span><span class="value">${Ve(n?.high_confidence_count)}</span></div>
    <div class="stat-row"><span class="label">Last quality</span><span class="value">${Re(Ke(n?.last_quality),0,"%")}</span></div>
    <div class="stat-row"><span class="label">Avg quality</span><span class="value">${Re(e,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Best quality</span><span class="value">${Re(Ke(n?.best_quality),0,"%")}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${Re(Ke(n?.time_since_last_speed_flip),2,"s")}</span></div>
  `}function Op(n){const e=n&&n.count>0?n.cumulative_quality/n.count:void 0,t=ra(n?.last_quality),i=ra(e),s=ra(n?.best_quality);return`
    <div class="stat-row"><span class="label">Attempts</span><span class="value">${Ve(n?.count)}</span></div>
    <div class="stat-row"><span class="label">High conf</span><span class="value">${Ve(n?.high_confidence_count)}</span></div>
    <div class="stat-row"><span class="label">Last quality</span><span class="value">${Re(t,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Avg quality</span><span class="value">${Re(i,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Best quality</span><span class="value">${Re(s,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${Re(Ke(n?.time_since_last_half_flip),2,"s")}</span></div>
  `}function kp(n){const e=n&&n.count>0?n.cumulative_quality/n.count:void 0,t=ra(n?.last_quality),i=ra(e),s=ra(n?.best_quality);return`
    <div class="stat-row"><span class="label">Attempts</span><span class="value">${Ve(n?.count)}</span></div>
    <div class="stat-row"><span class="label">High conf</span><span class="value">${Ve(n?.high_confidence_count)}</span></div>
    <div class="stat-row"><span class="label">Last quality</span><span class="value">${Re(t,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Avg quality</span><span class="value">${Re(i,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Best quality</span><span class="value">${Re(s,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${Re(Ke(n?.time_since_last_wavedash),2,"s")}</span></div>
  `}function Bp(n){const e=n&&n.tracked_time>0?As(n.boost_integral/n.tracked_time).toFixed(0):"?",t=Ke(n?.tracked_time);return`
    <div class="stat-row"><span class="label">Collected</span><span class="value">${KC(n?.amount_collected,n?.amount_respawned)}</span></div>
    <div class="stat-row"><span class="label">Inactive collected</span><span class="value">${Un(n?.amount_collected_inactive)}</span></div>
    <div class="stat-row"><span class="label">Big pads amt</span><span class="value">${Un(n?.amount_collected_big)}</span></div>
    <div class="stat-row"><span class="label">Small pads amt</span><span class="value">${Un(n?.amount_collected_small)}</span></div>
    <div class="stat-row"><span class="label">Respawns</span><span class="value">${Un(n?.amount_respawned)}</span></div>
    <div class="stat-row"><span class="label">Overfill</span><span class="value">${Un(n?.overfill_total)}</span></div>
    <div class="stat-row"><span class="label">Used</span><span class="value">${Un(n?.amount_used)}</span></div>
    <div class="stat-row"><span class="label">Used ground</span><span class="value">${Un(n?.amount_used_while_grounded)}</span></div>
    <div class="stat-row"><span class="label">Used air</span><span class="value">${Un(n?.amount_used_while_airborne)}</span></div>
    <div class="stat-row"><span class="label">Big pads</span><span class="value">${n?.big_pads_collected??"?"}</span></div>
    <div class="stat-row"><span class="label">Small pads</span><span class="value">${n?.small_pads_collected??"?"}</span></div>
    <div class="stat-row"><span class="label">Inactive big pads</span><span class="value">${n?.big_pads_collected_inactive??"?"}</span></div>
    <div class="stat-row"><span class="label">Inactive small pads</span><span class="value">${n?.small_pads_collected_inactive??"?"}</span></div>
    <div class="stat-row"><span class="label">Stolen</span><span class="value">${Un(n?.amount_stolen)}</span></div>
    <div class="stat-row"><span class="label">Avg boost</span><span class="value">${e}</span></div>
    <div class="stat-row"><span class="label">Time @ 0</span><span class="value">${ls(Ke(n?.time_zero_boost),t)}</span></div>
    <div class="stat-row"><span class="label">Time 0-25</span><span class="value">${ls(Ke(n?.time_boost_0_25),t)}</span></div>
    <div class="stat-row"><span class="label">Time 25-50</span><span class="value">${ls(Ke(n?.time_boost_25_50),t)}</span></div>
    <div class="stat-row"><span class="label">Time 50-75</span><span class="value">${ls(Ke(n?.time_boost_50_75),t)}</span></div>
    <div class="stat-row"><span class="label">Time 75-100</span><span class="value">${ls(Ke(n?.time_boost_75_100),t)}</span></div>
    <div class="stat-row"><span class="label">Time @ 100</span><span class="value">${ls(Ke(n?.time_hundred_boost),t)}</span></div>
  `}function fR(n,e=r_({refreshTimelineRanges:n.refreshTimelineRanges,rerenderCurrentState:n.rerenderCurrentState})){return{id:"boost",label:"Boost",setup(t){e.setup(t)},teardown(){e.teardown()},onBeforeRender(){},getTimelineRanges(t){return cC(t.statsTimeline,t.replay,e.getTimelineRangeOptions())},getConfig(){return e.getConfig()},applyConfig(t){e.applyConfig(t)},includeBoostPickupAnimationPickup(t){return e.includePickup(t)},renderStats(t,i){const s=At(i.statsFrameLookup,t);return s?yn(s.players,a=>jt(a.name,a.is_team_0,Bp(a.boost))):""},renderFocusedPlayerStats(t,i,s){const a=Xt(s,i,t);return a?Bp(a.boost):""},renderSettings(t){return e.renderSettings(t,{showHeader:!0})}}}function pR(){return bn({id:"core",label:"Core",select:n=>n.core,render:n=>tR(n)})}function mR(){return bn({id:"backboard",label:"Backboard",select:n=>n.backboard,render:n=>nR(n),getTimelineEvents(n){return Og(n.statsTimeline,n.replay)}})}function gR(){let n=null;return{id:"ceiling-shot",label:"Ceiling Shot",setup(e){n=new TA(e.player.sceneState,e.player.container,e.replay,e.statsTimeline)},teardown(){n?.dispose(),n=null},onBeforeRender(e){n?.update(e.currentTime)},getTimelineEvents(e){return kg(e.statsTimeline,e.replay)},renderStats(e,t){const i=At(t.statsFrameLookup,e);return i?yn(i.players,s=>jt(s.name,s.is_team_0,Ip(s.ceiling_shot),s.ceiling_shot?.is_last_ceiling_shot?'<span class="role-indicator role-forward">Last Ceiling Shot</span>':"")):""},renderFocusedPlayerStats(e,t,i){const s=Xt(i,t,e);return s?Ip(s.ceiling_shot):""}}}function _R(){return bn({id:"ball-carry",label:"Ball Carry",select:n=>n.ball_carry,render:n=>rR(n),getTimelineEvents(n){return Wg(n.statsTimeline,n.replay)}})}function vR(){return bn({id:"air-dribble",label:"Air Dribble",select:n=>n.air_dribble,render:n=>oR(n)})}function yR(){return bn({id:"dodge-reset",label:"Dodge Reset",select:n=>n.dodge_reset,render:n=>hR(n),getTimelineEvents(n){return $g(n.statsTimeline,n.replay)}})}function bR(){return bn({id:"double-tap",label:"Double Tap",select:n=>n.double_tap,render:n=>iR(n),getTimelineEvents(n){return Bg(n.statsTimeline,n.replay)}})}function xR(){return bn({id:"pass",label:"Pass",select:n=>n.pass,render:n=>sR(n),getTimelineEvents(n){return Hg(n.statsTimeline,n.replay)}})}function SR(){return bn({id:"one-timer",label:"One-timer",select:n=>n.one_timer,render:n=>aR(n),getTimelineEvents(n){return zg(n.statsTimeline,n.replay)}})}function wR(){return{id:"musty-flick",label:"Musty Flick",setup(){},teardown(){},onBeforeRender(){},getTimelineEvents(n){return Dg(n.statsTimeline,n.replay)},renderStats(n,e){const t=At(e.statsFrameLookup,n);return t?yn(t.players,i=>jt(i.name,i.is_team_0,Dp(i.musty_flick),i.musty_flick?.is_last_musty?'<span class="role-indicator role-forward">Last Musty</span>':"")):""},renderFocusedPlayerStats(n,e,t){const i=Xt(t,e,n);return i?Dp(i.musty_flick):""}}}function ER(){return{id:"flick",label:"Flick",setup(){},teardown(){},onBeforeRender(){},getTimelineEvents(n){return Ug(n.statsTimeline,n.replay)},renderStats(n,e){const t=At(e.statsFrameLookup,n);return t?yn(t.players,i=>jt(i.name,i.is_team_0,Up(i.flick),i.flick?.is_last_flick?'<span class="role-indicator role-forward">Last Flick</span>':"")):""},renderFocusedPlayerStats(n,e,t){const i=Xt(t,e,n);return i?Up(i.flick):""}}}function MR(){let n=null;return{id:"speed-flip",label:"Speed Flip",setup(e){n=new XC(e.player.sceneState,e.player.container,e.replay,e.statsTimeline)},teardown(){n?.dispose(),n=null},onBeforeRender(e){n?.update(e.currentTime)},getTimelineEvents(e){return qg(e.statsTimeline,e.replay)},renderStats(e,t){const i=At(t.statsFrameLookup,e);return i?yn(i.players,s=>jt(s.name,s.is_team_0,Fp(s.speed_flip),s.speed_flip?.is_last_speed_flip?'<span class="role-indicator role-forward">Last Speed Flip</span>':"")):""},renderFocusedPlayerStats(e,t,i){const s=Xt(i,t,e);return s?Fp(s.speed_flip):""}}}function TR(){return{id:"half-flip",label:"Half Flip",setup(){},teardown(){},onBeforeRender(){},getTimelineEvents(n){return Yg(n.statsTimeline,n.replay)},renderStats(n,e){const t=At(e.statsFrameLookup,n);return t?yn(t.players,i=>jt(i.name,i.is_team_0,Op(i.half_flip),i.half_flip?.is_last_half_flip?'<span class="role-indicator role-forward">Last Half Flip</span>':"")):""},renderFocusedPlayerStats(n,e,t){const i=Xt(t,e,n);return i?Op(i.half_flip):""}}}function AR(){return{id:"wavedash",label:"Wavedash",setup(){},teardown(){},onBeforeRender(){},getTimelineEvents(n){return Zg(n.statsTimeline,n.replay)},renderStats(n,e){const t=At(e.statsFrameLookup,n);return t?yn(t.players,i=>jt(i.name,i.is_team_0,kp(i.wavedash),i.wavedash?.is_last_wavedash?'<span class="role-indicator role-forward">Last Wavedash</span>':"")):""},renderFocusedPlayerStats(n,e,t){const i=Xt(t,e,n);return i?kp(i.wavedash):""}}}function CR(n){let e=null,t=5,i="advancement",s=null,a=null,r=null,o=null;const l=new Set,c=["kind","height_band","surface","dodge_state"];return{id:"touch",label:"Touch",setup(h){e=new UA(h.player.sceneState,h.player.container,h.replay,h.statsTimeline,{mode:i}),e.setDecaySeconds(t),d()},teardown(){e?.dispose(),e=null},onBeforeRender(h){e?.update(h.currentTime)},getTimelineEvents(h){return Fg(h.statsTimeline,h.replay)},getConfig(){return{decaySeconds:t,overlayMode:i,breakdownClasses:u()}},applyConfig(h){if(h&&typeof h=="object"&&!Array.isArray(h)){const f=h;if(typeof f.decaySeconds=="number"&&Number.isFinite(f.decaySeconds)&&(t=Math.max(1,Math.min(10,f.decaySeconds)),e?.setDecaySeconds(t)),(f.overlayMode==="markers"||f.overlayMode==="advancement")&&(i=f.overlayMode,e?.setMode(i)),l.clear(),Array.isArray(f.breakdownClasses))for(const g of f.breakdownClasses)c.includes(g)&&l.add(g)}d(),n.rerenderCurrentState()},renderStats(h,f){const g=At(f.statsFrameLookup,h);return g?yn(g.players,_=>jt(_.name,_.is_team_0,Tp(_.touch,{breakdownClasses:u()}),_.touch?.is_last_touch?'<span class="role-indicator role-forward">Last Touch</span>':"")):""},renderFocusedPlayerStats(h,f,g){const _=Xt(g,f,h);return _?Tp(_.touch,{breakdownClasses:u()}):""},renderSettings(){if(!s){s=document.createElement("div"),s.className="module-settings-card";const h=document.createElement("div");h.className="module-settings-header";const f=document.createElement("div"),g=document.createElement("p");g.className="module-settings-eyebrow",g.textContent="Touch markers";const _=document.createElement("h3");_.textContent="Touch decay",f.append(g,_),a=document.createElement("strong"),a.className="metric-readout",h.append(f,a);const m=document.createElement("label"),p=document.createElement("span");p.className="label",p.textContent="Keep each marker visible after the touch";const w=document.createElement("input");w.type="range",w.min="1",w.max="10",w.step="0.5",w.value=`${t}`,w.addEventListener("input",()=>{const G=Number(w.value);t=Number.isFinite(G)?Math.max(1,Math.min(10,G)):t,e?.setDecaySeconds(t),d(t),n.requestConfigSync?.()}),m.append(p,w);const x=document.createElement("div");x.className="module-settings-subgroup";const y=document.createElement("div");y.className="module-settings-header";const C=document.createElement("div"),M=document.createElement("p");M.className="module-settings-eyebrow",M.textContent="Overlay";const T=document.createElement("h3");T.textContent="Touch mode",C.append(M,T),r=document.createElement("strong"),r.className="metric-readout",y.append(C,r);const A=document.createElement("div");A.className="module-settings-options";for(const G of[{mode:"markers",label:"Markers"},{mode:"advancement",label:"Advancement"}]){const k=document.createElement("label");k.className="toggle";const Y=document.createElement("input");Y.type="radio",Y.name="touch-overlay-mode",Y.dataset.overlayMode=G.mode,Y.addEventListener("change",()=>{Y.checked&&(i=G.mode,e?.setMode(i),d(),n.requestConfigSync?.())});const H=document.createElement("span");H.textContent=G.label,k.append(Y,H),A.append(k)}x.append(y,A);const v=document.createElement("div");v.className="module-settings-subgroup";const b=document.createElement("div");b.className="module-settings-header";const R=document.createElement("div"),I=document.createElement("p");I.className="module-settings-eyebrow",I.textContent="Stat display";const O=document.createElement("h3");O.textContent="Touch breakdown",R.append(I,O),o=document.createElement("strong"),o.className="metric-readout",b.append(R,o);const B=document.createElement("div");B.className="module-settings-options";for(const G of[{className:"kind",label:"Kind"},{className:"height_band",label:"Height"},{className:"surface",label:"Surface"},{className:"dodge_state",label:"Dodge"}]){const k=document.createElement("label");k.className="toggle";const Y=document.createElement("input");Y.type="checkbox",Y.dataset.breakdownClass=G.className,Y.addEventListener("change",()=>{Y.checked?l.add(G.className):l.delete(G.className),d(),n.rerenderCurrentState(),n.requestConfigSync?.()});const H=document.createElement("span");H.textContent=G.label,k.append(Y,H),B.append(k)}v.append(b,B),s.append(h,m,x,v)}return d(),s}};function d(h){if(!s)return;const f=h??t,g=s.querySelector("input");g instanceof HTMLInputElement&&(g.value=`${f}`),a&&(a.textContent=`${f.toFixed(1)}s`);for(const _ of s.querySelectorAll("input[data-overlay-mode]"))_.checked=_.dataset.overlayMode===i;r&&(r.textContent=i==="advancement"?"Advancement":"Markers");for(const _ of s.querySelectorAll("input[data-breakdown-class]")){const m=_.dataset.breakdownClass;_.checked=m?l.has(m):!1}if(o){const _=u();o.textContent=_.length>0?_.map(m=>({kind:"Kind",height_band:"Height",surface:"Surface",dodge_state:"Dodge"})[m]).join(" + "):"Total only"}}function u(){return c.filter(h=>l.has(h))}}function RR(){return bn({id:"whiff",label:"Whiff",select:n=>n.whiff,render:n=>cR(n),getTimelineEvents(n){return jg(n.statsTimeline,n.replay)}})}function PR(n){let e=null,t=null;const i=new Set,s=["speed_band","height_band"];return{id:"movement",label:"Movement",setup(){a()},teardown(){},onBeforeRender(){},getConfig(){return{breakdownClasses:r()}},applyConfig(o){if(i.clear(),o&&typeof o=="object"&&!Array.isArray(o)){const l=o.breakdownClasses;if(Array.isArray(l))for(const c of l)s.includes(c)&&i.add(c)}a(),n.rerenderCurrentState()},renderStats(o,l){const c=At(l.statsFrameLookup,o);return c?yn(c.players,d=>jt(d.name,d.is_team_0,Ep(d.movement,{breakdownClasses:r()}))):""},renderFocusedPlayerStats(o,l,c){const d=Xt(c,l,o);return d?Ep(d.movement,{breakdownClasses:r()}):""},renderSettings(){if(!e){e=document.createElement("div"),e.className="module-settings-card";const o=document.createElement("div");o.className="module-settings-header";const l=document.createElement("div"),c=document.createElement("p");c.className="module-settings-eyebrow",c.textContent="Stat display";const d=document.createElement("h3");d.textContent="Movement breakdown",l.append(c,d),t=document.createElement("strong"),t.className="metric-readout",o.append(l,t);const u=document.createElement("div");u.className="module-settings-options";for(const h of[{className:"speed_band",label:"Speed band"},{className:"height_band",label:"Height band"}]){const f=document.createElement("label");f.className="toggle";const g=document.createElement("input");g.type="checkbox",g.dataset.breakdownClass=h.className,g.addEventListener("change",()=>{g.checked?i.add(h.className):i.delete(h.className),a(),n.rerenderCurrentState(),n.requestConfigSync?.()});const _=document.createElement("span");_.textContent=h.label,f.append(g,_),u.append(f)}e.append(o,u)}return a(),e}};function a(){if(e){for(const o of e.querySelectorAll("input[data-breakdown-class]")){const l=o.dataset.breakdownClass;o.checked=l?i.has(l):!1}if(t){const o=r();t.textContent=o.length>0?o.map(l=>({speed_band:"Speed band",height_band:"Height band"})[l]).join(" + "):"Total only"}}}function r(){return s.filter(o=>i.has(o))}}function LR(){return bn({id:"powerslide",label:"Powerslide",select:n=>n.powerslide,render:n=>lR(n),getTimelineEvents(n){return Xg(n.statsTimeline,n.replay)}})}function NR(){return bn({id:"rotation",label:"Rotation",select:n=>n.rotation,render:n=>eR(n)})}function IR(){return bn({id:"demo",label:"Demo",select:n=>n.demo,render:n=>dR(n)})}function DR(){return bn({id:"bump",label:"Bump",select:n=>n.bump,render:n=>uR(n),getTimelineEvents(n){return Kg(n.statsTimeline,n.replay)}})}function UR(){let n=null,e=1;return{id:i_,label:"Relative Positioning",setup(t){e=t.fieldScale,n=new H1(t.player.sceneState.scene,t.replay,e)},teardown(){n?.dispose(),n=null},onBeforeRender(t){n?.update(t,e)},renderStats(t,i){const s=At(i.statsFrameLookup,t);return s?yn(s.players,a=>{const r=vC(i.replay,ot(a.player_id),t),o=_C[r];return jt(a.name,a.is_team_0,Pp(a.positioning),`<span class="depth-indicator depth-${r}" title="Team Depth: ${o}" aria-label="Team Depth: ${o}">${o}</span>`)}):""},renderFocusedPlayerStats(t,i,s){const a=Xt(s,i,t);return a?Pp(a.positioning):""}}}function FR(){return{id:"absolute-positioning",label:"Absolute Positioning",setup(n){Cp.acquire(n)},teardown(){Cp.release()},onBeforeRender(){},getTimelineRanges(n){return pC(n.statsTimeline,n.replay)},renderStats(n,e){const t=At(e.statsFrameLookup,n);return t?yn(t.players,i=>jt(i.name,i.is_team_0,Lp(i.positioning))):""},renderFocusedPlayerStats(n,e,t){const i=Xt(t,e,n);return i?Lp(i.positioning):""}}}function OR(n,e={}){return[pR(),mR(),gR(),bR(),SR(),xR(),yC(n),bC(),xC(),SC(),UR(),FR(),NR(),MR(),TR(),AR(),CR(n),RR(),ER(),wR(),yR(),vR(),fR(n,e.boostPickupFilters),_R(),PR(n),LR(),IR(),DR()]}function kR(n){const e={};for(const t of n)if(t.getConfig){if(Object.hasOwn(e,t.id))throw new Error(`Duplicate stats player config adapter id: ${t.id}`);e[t.id]=t.getConfig()}return e}function BR(n,e){for(const t of n)if(t.applyConfig){if(Object.hasOwn(e,t.id)){t.applyConfig(e[t.id]);continue}for(const i of t.aliases??[])if(Object.hasOwn(e,i)){t.applyConfig(e[i]);break}}}function c_(n,e){return n}function ol(n){return c_({fifty_fifty:{count:0,wins:0,losses:0,neutral_outcomes:0,kickoff_count:0,kickoff_wins:0,kickoff_losses:0,kickoff_neutral_outcomes:0,possession_after_count:0,opponent_possession_after_count:0,neutral_possession_after_count:0,kickoff_possession_after_count:0,kickoff_opponent_possession_after_count:0,kickoff_neutral_possession_after_count:0},possession:{tracked_time:0,possession_time:0,opponent_possession_time:0,neutral_time:0,labeled_time:{entries:[]}},pressure:{tracked_time:0,defensive_half_time:0,offensive_half_time:0,neutral_time:0,labeled_time:{entries:[]}},rotation:{first_man_changes_for_team:0,rotation_count:0},rush:{count:0,two_v_one_count:0,two_v_two_count:0,two_v_three_count:0,three_v_one_count:0,three_v_two_count:0,three_v_three_count:0},core:{score:0,goals:0,assists:0,saves:0,shots:0,kickoff_goal_count:0,short_goal_count:0,medium_goal_count:0,long_goal_count:0,counter_attack_goal_count:0,sustained_pressure_goal_count:0,other_buildup_goal_count:0,goal_ball_air_time_sample_count:0,cumulative_goal_ball_air_time:0,last_goal_ball_air_time:null},backboard:{count:0},double_tap:{count:0},one_timer:{count:0,total_ball_speed:0,fastest_ball_speed:0},half_volley:{count:0,total_ball_speed:0,fastest_ball_speed:0},pass:{completed_pass_count:0,total_pass_distance:0,total_pass_advance:0,longest_pass_distance:0},ball_carry:{carry_count:0,total_carry_time:0,total_straight_line_distance:0,total_path_distance:0,longest_carry_time:0,furthest_carry_distance:0,fastest_carry_speed:0,carry_speed_sum:0,average_horizontal_gap_sum:0,average_vertical_gap_sum:0},air_dribble:{count:0,ground_to_air_count:0,wall_to_air_count:0,total_touch_count:0,max_touch_count:0,total_time:0,total_straight_line_distance:0,total_path_distance:0,longest_time:0,furthest_distance:0,fastest_speed:0,speed_sum:0,average_horizontal_gap_sum:0,average_vertical_gap_sum:0},boost:{tracked_time:0,boost_integral:0,time_zero_boost:0,time_hundred_boost:0,time_boost_0_25:0,time_boost_25_50:0,time_boost_50_75:0,time_boost_75_100:0,amount_collected:0,amount_collected_inactive:0,big_pads_collected_inactive:0,small_pads_collected_inactive:0,amount_stolen:0,big_pads_collected:0,small_pads_collected:0,big_pads_stolen:0,small_pads_stolen:0,amount_collected_big:0,amount_stolen_big:0,amount_collected_small:0,amount_stolen_small:0,amount_respawned:0,overfill_total:0,overfill_from_stolen:0,amount_used:0,amount_used_while_grounded:0,amount_used_while_airborne:0,amount_used_while_supersonic:0},movement:{tracked_time:0,total_distance:0,speed_integral:0,time_slow_speed:0,time_boost_speed:0,time_supersonic_speed:0,time_on_ground:0,time_low_air:0,time_high_air:0,labeled_tracked_time:{entries:[]}},powerslide:{total_duration:0,press_count:0},demo:{demos_inflicted:0},bump:{bumps_inflicted:0,team_bumps_inflicted:0}})}function d_(n){return c_({player_id:{Steam:"test-player"},name:"Test Player",is_team_0:!0,core:{score:0,goals:0,assists:0,saves:0,shots:0,goals_conceded_while_last_defender:0,goals_for_while_most_back:0,goals_against_while_most_back:0,goal_against_boost_sample_count:0,cumulative_boost_on_goals_against:0,last_boost_on_goal_against:null,goal_against_boost_leadup_sample_count:0,cumulative_average_boost_in_goal_against_leadup:0,cumulative_min_boost_in_goal_against_leadup:0,last_average_boost_in_goal_against_leadup:null,last_min_boost_in_goal_against_leadup:null,goal_against_position_sample_count:0,cumulative_goal_against_position_x:0,cumulative_goal_against_position_y:0,cumulative_goal_against_position_z:0,last_goal_against_position:null,scoring_goal_last_touch_position_sample_count:0,cumulative_scoring_goal_last_touch_position_x:0,cumulative_scoring_goal_last_touch_position_y:0,cumulative_scoring_goal_last_touch_position_z:0,last_scoring_goal_last_touch_position:null,kickoff_goal_count:0,short_goal_count:0,medium_goal_count:0,long_goal_count:0,counter_attack_goal_count:0,sustained_pressure_goal_count:0,other_buildup_goal_count:0,goal_ball_air_time_sample_count:0,cumulative_goal_ball_air_time:0,last_goal_ball_air_time:null},backboard:{count:0,is_last_backboard:!1,last_backboard_time:null,last_backboard_frame:null,time_since_last_backboard:null,frames_since_last_backboard:null},ceiling_shot:{count:0,high_confidence_count:0,is_last_ceiling_shot:!1,last_ceiling_shot_time:null,last_ceiling_shot_frame:null,time_since_last_ceiling_shot:null,frames_since_last_ceiling_shot:null,last_confidence:null,best_confidence:0,cumulative_confidence:0},double_tap:{count:0,is_last_double_tap:!1,last_double_tap_time:null,last_double_tap_frame:null,time_since_last_double_tap:null,frames_since_last_double_tap:null},one_timer:{count:0,total_ball_speed:0,fastest_ball_speed:0,total_pass_distance:0,is_last_one_timer:!1,last_one_timer_time:null,last_one_timer_frame:null,time_since_last_one_timer:null,frames_since_last_one_timer:null},pass:{completed_pass_count:0,received_pass_count:0,total_pass_distance:0,total_pass_advance:0,longest_pass_distance:0,is_last_completed_pass:!1,last_completed_pass_time:null,last_completed_pass_frame:null,time_since_last_completed_pass:null,frames_since_last_completed_pass:null},fifty_fifty:{count:0,wins:0,losses:0,neutral_outcomes:0,kickoff_count:0,kickoff_wins:0,kickoff_losses:0,kickoff_neutral_outcomes:0,possession_after_count:0,kickoff_possession_after_count:0},speed_flip:{count:0,high_confidence_count:0,is_last_speed_flip:!1,last_speed_flip_time:null,last_speed_flip_frame:null,time_since_last_speed_flip:null,frames_since_last_speed_flip:null,last_quality:null,best_quality:0,cumulative_quality:0},half_flip:{count:0,high_confidence_count:0,is_last_half_flip:!1,last_half_flip_time:null,last_half_flip_frame:null,time_since_last_half_flip:null,frames_since_last_half_flip:null,last_quality:null,best_quality:0,cumulative_quality:0},half_volley:{count:0,total_ball_speed:0,fastest_ball_speed:0,is_last_half_volley:!1,last_half_volley_time:null,last_half_volley_frame:null,time_since_last_half_volley:null,frames_since_last_half_volley:null},wavedash:{count:0,high_confidence_count:0,is_last_wavedash:!1,last_wavedash_time:null,last_wavedash_frame:null,time_since_last_wavedash:null,frames_since_last_wavedash:null,last_quality:null,best_quality:0,cumulative_quality:0},touch:{touch_count:0,control_touch_count:0,medium_hit_count:0,hard_hit_count:0,aerial_touch_count:0,high_aerial_touch_count:0,wall_touch_count:0,is_last_touch:!1,last_touch_time:null,last_touch_frame:null,time_since_last_touch:null,frames_since_last_touch:null,last_ball_speed_change:null,max_ball_speed_change:0,cumulative_ball_speed_change:0,total_ball_travel_distance:0,total_ball_advance_distance:0,total_ball_retreat_distance:0,labeled_touch_counts:{entries:[]}},whiff:{whiff_count:0,grounded_whiff_count:0,aerial_whiff_count:0,dodge_whiff_count:0,is_last_whiff:!1,last_whiff_time:null,last_whiff_frame:null,time_since_last_whiff:null,frames_since_last_whiff:null,last_closest_approach_distance:null,best_closest_approach_distance:null,cumulative_closest_approach_distance:0},flick:{count:0,high_confidence_count:0,is_last_flick:!1,last_flick_time:null,last_flick_frame:null,time_since_last_flick:null,frames_since_last_flick:null,last_confidence:null,best_confidence:0,cumulative_confidence:0,cumulative_setup_duration:0,cumulative_ball_speed_change:0},musty_flick:{count:0,aerial_count:0,high_confidence_count:0,is_last_musty:!1,last_musty_time:null,last_musty_frame:null,time_since_last_musty:null,frames_since_last_musty:null,last_confidence:null,best_confidence:0,cumulative_confidence:0},dodge_reset:{count:0,on_ball_count:0},ball_carry:{carry_count:0,total_carry_time:0,total_straight_line_distance:0,total_path_distance:0,longest_carry_time:0,furthest_carry_distance:0,fastest_carry_speed:0,carry_speed_sum:0,average_horizontal_gap_sum:0,average_vertical_gap_sum:0},air_dribble:{count:0,ground_to_air_count:0,wall_to_air_count:0,total_touch_count:0,max_touch_count:0,total_time:0,total_straight_line_distance:0,total_path_distance:0,longest_time:0,furthest_distance:0,fastest_speed:0,speed_sum:0,average_horizontal_gap_sum:0,average_vertical_gap_sum:0},boost:ol().boost,movement:ol().movement,positioning:{active_game_time:0,tracked_time:0,sum_distance_to_teammates:0,sum_distance_to_ball:0,sum_distance_to_ball_has_possession:0,time_has_possession:0,sum_distance_to_ball_no_possession:0,time_no_possession:0,time_demolished:0,time_no_teammates:0,time_most_back:0,time_most_forward:0,time_mid_role:0,time_other_role:0,time_defensive_third:0,time_neutral_third:0,time_offensive_third:0,time_defensive_half:0,time_offensive_half:0,time_closest_to_ball:0,time_farthest_from_ball:0,time_behind_ball:0,time_level_with_ball:0,time_in_front_of_ball:0,times_caught_ahead_of_play_on_conceded_goals:0},rotation:{active_game_time:0,tracked_time:0,time_first_man:0,time_second_man:0,time_third_man:0,time_ambiguous_role:0,time_behind_play:0,time_level_with_play:0,time_ahead_of_play:0,became_first_man_count:0,lost_first_man_count:0,current_role_state:"unknown",current_depth_state:"unknown"},powerslide:{total_duration:0,press_count:0},demo:{demos_inflicted:0,demos_taken:0},bump:{bumps_inflicted:0,bumps_taken:0,team_bumps_inflicted:0,team_bumps_taken:0,last_bump_time:null,last_bump_frame:null,last_bump_strength:null,max_bump_strength:0,cumulative_bump_strength:0}})}const zR=new Set(["player_id","name","is_team_0"]);function HR(n){return n===null||typeof n=="number"||typeof n=="string"||typeof n=="boolean"||Array.isArray(n)}function GR(n,e){let t=n;for(const i of e){if(!t||typeof t!="object"||Array.isArray(t))return;t=t[i]}return t}function VR(n){return n==null?"--":typeof n=="number"?Number.isFinite(n)?Number.isInteger(n)?`${n}`:`${Number(n.toFixed(3))}`:"--":typeof n=="boolean"?n?"true":"false":Array.isArray(n)?n.length===0?"[]":JSON.stringify(n):`${n}`}function eu(n,e,t,i){if(!(!n||typeof n!="object"||Array.isArray(n)))for(const[s,a]of Object.entries(n)){if(e==="player"&&t.length===0&&zR.has(s))continue;const r=[...t,s];if(HR(a)){const o=`${e}:${r.join(".")}`;i.push({id:o,label:r.join("."),category:r[0]??e,scope:e,path:r,read(l){return GR(l,r)},format:VR});continue}eu(a,e,r,i)}}function $R(n){const e=new Set;return n.filter(t=>e.has(t.id)?!1:(e.add(t.id),!0))}function u_(n,e){const t=[];return n&&eu(n,"player",[],t),e&&eu(e,"team",[],t),$R(t).sort((i,s)=>i.label.localeCompare(s.label))}function WR(){return u_(d_(),ol())}function xr(n){return n?u_(n.players[0]??d_(),n.team_zero??n.team_one??ol()):WR()}function h_(n){return n.toLowerCase().replace(/[_/.-]+/g," ").replace(/\s+/g," ").trim()}function XR(n){return h_(n).split(" ").filter(Boolean)}function qR(n,e){const t=XR(e);if(t.length===0)return 0;const i=h_([n.scope,n.category,n.label,n.id,...n.path].join(" "));let s=0;for(const a of t){const r=i.indexOf(a);if(r<0)return null;s+=r}return s+i.length/1e3}function YR(n,e){return n.map((t,i)=>({definition:t,index:i,score:qR(t,e)})).filter(t=>t.score!==null).sort((t,i)=>t.score-i.score||t.index-i.index).map(t=>t.definition)}var kt=Uint8Array,gn=Uint16Array,oh=Int32Array,Nl=new kt([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),Il=new kt([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),tu=new kt([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),f_=function(n,e){for(var t=new gn(31),i=0;i<31;++i)t[i]=e+=1<<n[i-1];for(var s=new oh(t[30]),i=1;i<30;++i)for(var a=t[i];a<t[i+1];++a)s[a]=a-t[i]<<5|i;return{b:t,r:s}},p_=f_(Nl,2),m_=p_.b,nu=p_.r;m_[28]=258,nu[258]=28;var g_=f_(Il,0),ZR=g_.b,zp=g_.r,iu=new gn(32768);for(var gt=0;gt<32768;++gt){var Ci=(gt&43690)>>1|(gt&21845)<<1;Ci=(Ci&52428)>>2|(Ci&13107)<<2,Ci=(Ci&61680)>>4|(Ci&3855)<<4,iu[gt]=((Ci&65280)>>8|(Ci&255)<<8)>>1}var ti=(function(n,e,t){for(var i=n.length,s=0,a=new gn(e);s<i;++s)n[s]&&++a[n[s]-1];var r=new gn(e);for(s=1;s<e;++s)r[s]=r[s-1]+a[s-1]<<1;var o;if(t){o=new gn(1<<e);var l=15-e;for(s=0;s<i;++s)if(n[s])for(var c=s<<4|n[s],d=e-n[s],u=r[n[s]-1]++<<d,h=u|(1<<d)-1;u<=h;++u)o[iu[u]>>l]=c}else for(o=new gn(i),s=0;s<i;++s)n[s]&&(o[s]=iu[r[n[s]-1]++]>>15-n[s]);return o}),$i=new kt(288);for(var gt=0;gt<144;++gt)$i[gt]=8;for(var gt=144;gt<256;++gt)$i[gt]=9;for(var gt=256;gt<280;++gt)$i[gt]=7;for(var gt=280;gt<288;++gt)$i[gt]=8;var Sr=new kt(32);for(var gt=0;gt<32;++gt)Sr[gt]=5;var KR=ti($i,9,0),jR=ti($i,9,1),JR=ti(Sr,5,0),QR=ti(Sr,5,1),Xc=function(n){for(var e=n[0],t=1;t<n.length;++t)n[t]>e&&(e=n[t]);return e},Dn=function(n,e,t){var i=e/8|0;return(n[i]|n[i+1]<<8)>>(e&7)&t},qc=function(n,e){var t=e/8|0;return(n[t]|n[t+1]<<8|n[t+2]<<16)>>(e&7)},lh=function(n){return(n+7)/8|0},Dl=function(n,e,t){return(e==null||e<0)&&(e=0),(t==null||t>n.length)&&(t=n.length),new kt(n.subarray(e,t))},eP=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],qn=function(n,e,t){var i=new Error(e||eP[n]);if(i.code=n,Error.captureStackTrace&&Error.captureStackTrace(i,qn),!t)throw i;return i},tP=function(n,e,t,i){var s=n.length,a=0;if(!s||e.f&&!e.l)return t||new kt(0);var r=!t,o=r||e.i!=2,l=e.i;r&&(t=new kt(s*3));var c=function(Be){var et=t.length;if(Be>et){var N=new kt(Math.max(et*2,Be));N.set(t),t=N}},d=e.f||0,u=e.p||0,h=e.b||0,f=e.l,g=e.d,_=e.m,m=e.n,p=s*8;do{if(!f){d=Dn(n,u,1);var w=Dn(n,u+1,3);if(u+=3,w)if(w==1)f=jR,g=QR,_=9,m=5;else if(w==2){var M=Dn(n,u,31)+257,T=Dn(n,u+10,15)+4,A=M+Dn(n,u+5,31)+1;u+=14;for(var v=new kt(A),b=new kt(19),R=0;R<T;++R)b[tu[R]]=Dn(n,u+R*3,7);u+=T*3;for(var I=Xc(b),O=(1<<I)-1,B=ti(b,I,1),R=0;R<A;){var G=B[Dn(n,u,O)];u+=G&15;var x=G>>4;if(x<16)v[R++]=x;else{var k=0,Y=0;for(x==16?(Y=3+Dn(n,u,3),u+=2,k=v[R-1]):x==17?(Y=3+Dn(n,u,7),u+=3):x==18&&(Y=11+Dn(n,u,127),u+=7);Y--;)v[R++]=k}}var H=v.subarray(0,M),ie=v.subarray(M);_=Xc(H),m=Xc(ie),f=ti(H,_,1),g=ti(ie,m,1)}else qn(1);else{var x=lh(u)+4,y=n[x-4]|n[x-3]<<8,C=x+y;if(C>s){l&&qn(0);break}o&&c(h+y),t.set(n.subarray(x,C),h),e.b=h+=y,e.p=u=C*8,e.f=d;continue}if(u>p){l&&qn(0);break}}o&&c(h+131072);for(var q=(1<<_)-1,Q=(1<<m)-1,_e=u;;_e=u){var k=f[qc(n,u)&q],ye=k>>4;if(u+=k&15,u>p){l&&qn(0);break}if(k||qn(2),ye<256)t[h++]=ye;else if(ye==256){_e=u,f=null;break}else{var Pe=ye-254;if(ye>264){var R=ye-257,te=Nl[R];Pe=Dn(n,u,(1<<te)-1)+m_[R],u+=te}var V=g[qc(n,u)&Q],Z=V>>4;V||qn(3),u+=V&15;var ie=ZR[Z];if(Z>3){var te=Il[Z];ie+=qc(n,u)&(1<<te)-1,u+=te}if(u>p){l&&qn(0);break}o&&c(h+131072);var ce=h+Pe;if(h<ie){var Le=a-ie,ve=Math.min(ie,ce);for(Le+h<0&&qn(3);h<ve;++h)t[h]=i[Le+h]}for(;h<ce;++h)t[h]=t[h-ie]}}e.l=f,e.p=_e,e.b=h,e.f=d,f&&(d=1,e.m=_,e.d=g,e.n=m)}while(!d);return h!=t.length&&r?Dl(t,0,h):t.subarray(0,h)},ui=function(n,e,t){t<<=e&7;var i=e/8|0;n[i]|=t,n[i+1]|=t>>8},za=function(n,e,t){t<<=e&7;var i=e/8|0;n[i]|=t,n[i+1]|=t>>8,n[i+2]|=t>>16},Yc=function(n,e){for(var t=[],i=0;i<n.length;++i)n[i]&&t.push({s:i,f:n[i]});var s=t.length,a=t.slice();if(!s)return{t:v_,l:0};if(s==1){var r=new kt(t[0].s+1);return r[t[0].s]=1,{t:r,l:1}}t.sort(function(C,M){return C.f-M.f}),t.push({s:-1,f:25001});var o=t[0],l=t[1],c=0,d=1,u=2;for(t[0]={s:-1,f:o.f+l.f,l:o,r:l};d!=s-1;)o=t[t[c].f<t[u].f?c++:u++],l=t[c!=d&&t[c].f<t[u].f?c++:u++],t[d++]={s:-1,f:o.f+l.f,l:o,r:l};for(var h=a[0].s,i=1;i<s;++i)a[i].s>h&&(h=a[i].s);var f=new gn(h+1),g=su(t[d-1],f,0);if(g>e){var i=0,_=0,m=g-e,p=1<<m;for(a.sort(function(M,T){return f[T.s]-f[M.s]||M.f-T.f});i<s;++i){var w=a[i].s;if(f[w]>e)_+=p-(1<<g-f[w]),f[w]=e;else break}for(_>>=m;_>0;){var x=a[i].s;f[x]<e?_-=1<<e-f[x]++-1:++i}for(;i>=0&&_;--i){var y=a[i].s;f[y]==e&&(--f[y],++_)}g=e}return{t:new kt(f),l:g}},su=function(n,e,t){return n.s==-1?Math.max(su(n.l,e,t+1),su(n.r,e,t+1)):e[n.s]=t},Hp=function(n){for(var e=n.length;e&&!n[--e];);for(var t=new gn(++e),i=0,s=n[0],a=1,r=function(l){t[i++]=l},o=1;o<=e;++o)if(n[o]==s&&o!=e)++a;else{if(!s&&a>2){for(;a>138;a-=138)r(32754);a>2&&(r(a>10?a-11<<5|28690:a-3<<5|12305),a=0)}else if(a>3){for(r(s),--a;a>6;a-=6)r(8304);a>2&&(r(a-3<<5|8208),a=0)}for(;a--;)r(s);a=1,s=n[o]}return{c:t.subarray(0,i),n:e}},Ha=function(n,e){for(var t=0,i=0;i<e.length;++i)t+=n[i]*e[i];return t},__=function(n,e,t){var i=t.length,s=lh(e+2);n[s]=i&255,n[s+1]=i>>8,n[s+2]=n[s]^255,n[s+3]=n[s+1]^255;for(var a=0;a<i;++a)n[s+a+4]=t[a];return(s+4+i)*8},Gp=function(n,e,t,i,s,a,r,o,l,c,d){ui(e,d++,t),++s[256];for(var u=Yc(s,15),h=u.t,f=u.l,g=Yc(a,15),_=g.t,m=g.l,p=Hp(h),w=p.c,x=p.n,y=Hp(_),C=y.c,M=y.n,T=new gn(19),A=0;A<w.length;++A)++T[w[A]&31];for(var A=0;A<C.length;++A)++T[C[A]&31];for(var v=Yc(T,7),b=v.t,R=v.l,I=19;I>4&&!b[tu[I-1]];--I);var O=c+5<<3,B=Ha(s,$i)+Ha(a,Sr)+r,G=Ha(s,h)+Ha(a,_)+r+14+3*I+Ha(T,b)+2*T[16]+3*T[17]+7*T[18];if(l>=0&&O<=B&&O<=G)return __(e,d,n.subarray(l,l+c));var k,Y,H,ie;if(ui(e,d,1+(G<B)),d+=2,G<B){k=ti(h,f,0),Y=h,H=ti(_,m,0),ie=_;var q=ti(b,R,0);ui(e,d,x-257),ui(e,d+5,M-1),ui(e,d+10,I-4),d+=14;for(var A=0;A<I;++A)ui(e,d+3*A,b[tu[A]]);d+=3*I;for(var Q=[w,C],_e=0;_e<2;++_e)for(var ye=Q[_e],A=0;A<ye.length;++A){var Pe=ye[A]&31;ui(e,d,q[Pe]),d+=b[Pe],Pe>15&&(ui(e,d,ye[A]>>5&127),d+=ye[A]>>12)}}else k=KR,Y=$i,H=JR,ie=Sr;for(var A=0;A<o;++A){var te=i[A];if(te>255){var Pe=te>>18&31;za(e,d,k[Pe+257]),d+=Y[Pe+257],Pe>7&&(ui(e,d,te>>23&31),d+=Nl[Pe]);var V=te&31;za(e,d,H[V]),d+=ie[V],V>3&&(za(e,d,te>>5&8191),d+=Il[V])}else za(e,d,k[te]),d+=Y[te]}return za(e,d,k[256]),d+Y[256]},nP=new oh([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),v_=new kt(0),iP=function(n,e,t,i,s,a){var r=a.z||n.length,o=new kt(i+r+5*(1+Math.ceil(r/7e3))+s),l=o.subarray(i,o.length-s),c=a.l,d=(a.r||0)&7;if(e){d&&(l[0]=a.r>>3);for(var u=nP[e-1],h=u>>13,f=u&8191,g=(1<<t)-1,_=a.p||new gn(32768),m=a.h||new gn(g+1),p=Math.ceil(t/3),w=2*p,x=function(lt){return(n[lt]^n[lt+1]<<p^n[lt+2]<<w)&g},y=new oh(25e3),C=new gn(288),M=new gn(32),T=0,A=0,v=a.i||0,b=0,R=a.w||0,I=0;v+2<r;++v){var O=x(v),B=v&32767,G=m[O];if(_[B]=G,m[O]=B,R<=v){var k=r-v;if((T>7e3||b>24576)&&(k>423||!c)){d=Gp(n,l,0,y,C,M,A,b,I,v-I,d),b=T=A=0,I=v;for(var Y=0;Y<286;++Y)C[Y]=0;for(var Y=0;Y<30;++Y)M[Y]=0}var H=2,ie=0,q=f,Q=B-G&32767;if(k>2&&O==x(v-Q))for(var _e=Math.min(h,k)-1,ye=Math.min(32767,v),Pe=Math.min(258,k);Q<=ye&&--q&&B!=G;){if(n[v+H]==n[v+H-Q]){for(var te=0;te<Pe&&n[v+te]==n[v+te-Q];++te);if(te>H){if(H=te,ie=Q,te>_e)break;for(var V=Math.min(Q,te-2),Z=0,Y=0;Y<V;++Y){var ce=v-Q+Y&32767,Le=_[ce],ve=ce-Le&32767;ve>Z&&(Z=ve,G=ce)}}}B=G,G=_[B],Q+=B-G&32767}if(ie){y[b++]=268435456|nu[H]<<18|zp[ie];var Be=nu[H]&31,et=zp[ie]&31;A+=Nl[Be]+Il[et],++C[257+Be],++M[et],R=v+H,++T}else y[b++]=n[v],++C[n[v]]}}for(v=Math.max(v,R);v<r;++v)y[b++]=n[v],++C[n[v]];d=Gp(n,l,c,y,C,M,A,b,I,v-I,d),c||(a.r=d&7|l[d/8|0]<<3,d-=7,a.h=m,a.p=_,a.i=v,a.w=R)}else{for(var v=a.w||0;v<r+c;v+=65535){var N=v+65535;N>=r&&(l[d/8|0]=c,N=r),d=__(l,d+1,n.subarray(v,N))}a.i=r}return Dl(o,0,i+lh(d)+s)},sP=function(n,e,t,i,s){if(!s&&(s={l:1},e.dictionary)){var a=e.dictionary.subarray(-32768),r=new kt(a.length+n.length);r.set(a),r.set(n,a.length),n=r,s.w=a.length}return iP(n,e.level==null?6:e.level,e.mem==null?s.l?Math.ceil(Math.max(8,Math.min(13,Math.log(n.length)))*1.5):20:12+e.mem,t,i,s)};function aP(n,e){return sP(n,e||{},0,0)}function y_(n,e){return tP(n,{i:2},e,e)}var Vp=typeof TextEncoder<"u"&&new TextEncoder,au=typeof TextDecoder<"u"&&new TextDecoder,rP=0;try{au.decode(v_,{stream:!0}),rP=1}catch{}var oP=function(n){for(var e="",t=0;;){var i=n[t++],s=(i>127)+(i>223)+(i>239);if(t+s>n.length)return{s:e,r:Dl(n,t-1)};s?s==3?(i=((i&15)<<18|(n[t++]&63)<<12|(n[t++]&63)<<6|n[t++]&63)-65536,e+=String.fromCharCode(55296|i>>10,56320|i&1023)):s&1?e+=String.fromCharCode((i&31)<<6|n[t++]&63):e+=String.fromCharCode((i&15)<<12|(n[t++]&63)<<6|n[t++]&63):e+=String.fromCharCode(i)}};function lP(n,e){var t;if(Vp)return Vp.encode(n);for(var i=n.length,s=new kt(n.length+(n.length>>1)),a=0,r=function(c){s[a++]=c},t=0;t<i;++t){if(a+5>s.length){var o=new kt(a+8+(i-t<<1));o.set(s),s=o}var l=n.charCodeAt(t);l<128||e?r(l):l<2048?(r(192|l>>6),r(128|l&63)):l>55295&&l<57344?(l=65536+(l&1047552)|n.charCodeAt(++t)&1023,r(240|l>>18),r(128|l>>12&63),r(128|l>>6&63),r(128|l&63)):(r(224|l>>12),r(128|l>>6&63),r(128|l&63))}return Dl(s,0,a)}function b_(n,e){var t;if(au)return au.decode(n);var i=oP(n),s=i.s,t=i.r;return t.length&&qn(8),s}const cP=["replayUrl","replay_url","replay"],dP=["r","replayUrlZ","replay_url_z"],uP=["ballchasing","ballchasingId","ballchasingUuid","ballchasingReplay"];function hP(n){const e=n.replaceAll("-","+").replaceAll("_","/"),t=e.padEnd(Math.ceil(e.length/4)*4,"="),i=atob(t),s=new Uint8Array(i.length);for(let a=0;a<i.length;a+=1)s[a]=i.charCodeAt(a);return s}function fP(n){try{return b_(y_(hP(n)))}catch(e){throw new Error(`Invalid compressed replay URL: ${e instanceof Error?e.message:String(e)}`)}}function pP(n,e){const t=new URLSearchParams(n);for(const i of cP){const s=t.get(i)?.trim();if(!s)continue;const a=new URL(s,e);if(a.protocol!=="http:"&&a.protocol!=="https:")throw new Error(`Unsupported replay URL protocol: ${a.protocol}`);return a}for(const i of dP){const s=t.get(i)?.trim();if(!s)continue;const a=new URL(fP(s),e);if(a.protocol!=="http:"&&a.protocol!=="https:")throw new Error(`Unsupported replay URL protocol: ${a.protocol}`);return a}return null}function mP(n,e){for(const t of e){const i=n.get(t)?.trim();if(i)return i}return null}function x_(n,e){const t=new URLSearchParams(n),i=mP(t,uP);if(i){const a=Qu(i);return{kind:"ballchasing",url:fT(a),name:hT(a),fetchInit:{method:"POST"}}}const s=pP(n,e);return s?{kind:"url",url:s,name:gP(s)}:null}function gP(n){const t=n.pathname.replace(/\/+$/,"").split("/").pop();if(!t)return n.hostname||"remote replay";try{return decodeURIComponent(t)}catch{return t}}const ll=1,ru="cfg",$p="cfgDebug";function _P(n){let e="";for(const t of n)e+=String.fromCharCode(t);return btoa(e).replaceAll("+","-").replaceAll("/","_").replace(/=+$/,"")}function vP(n){const e=n.replaceAll("-","+").replaceAll("_","/"),t=e.padEnd(Math.ceil(e.length/4)*4,"="),i=atob(t),s=new Uint8Array(i.length);for(let a=0;a<i.length;a+=1)s[a]=i.charCodeAt(a);return s}function yP(n){return _P(aP(lP(JSON.stringify(n)),{level:9}))}function bP(n){let e;try{e=JSON.parse(b_(y_(vP(n))))}catch(t){throw new Error(`Invalid stats player config: ${t instanceof Error?t.message:String(t)}`)}return EP(e)}function xP(n){const e=S_(n);return e.selectedValue?bP(e.selectedValue):null}function S_(n){const e=new URLSearchParams(ch(n.hash)),t=new URLSearchParams(n.search),i=e.getAll(ru),s=t.getAll(ru),a=i[0]?"hash":s[0]?"search":null,r=a==="hash"?i[0]:a==="search"?s[0]:null;return{search:n.search,hash:n.hash,searchParams:[...t.entries()],hashParams:[...e.entries()],searchValues:s,hashValues:i,selectedSource:a,selectedValue:r}}function SP(n){const e=new URLSearchParams(n.search),t=new URLSearchParams(ch(n.hash)),i=e.get($p)??t.get($p);return i===""||i==="1"||i==="true"}function w_(n,e){const t=new URL(n.href),i=new URLSearchParams(ch(t.hash));return i.set(ru,yP(e)),t.hash=i.toString(),t}function ch(n){return n.startsWith("#")?n.slice(1):n}function wP(n,e,t=120,i=100){const s=cl(n.viewport.width)??e.width,a=cl(n.viewport.height)??e.height,r=e.width/Math.max(1,s),o=e.height/Math.max(1,a),l=Math.max(8,e.width-t),c=Math.max(8,e.height-i);return{x:Wp(n.x*r,8,l),y:Wp(n.y*o,8,c)}}function EP(n){if(!Rn(n)||n.version!==ll)throw new Error("Unsupported stats player config version");return{version:ll,playback:TP(n.playback),camera:AP(n.camera),overlays:RP(n.overlays),recording:MP(n.recording),singletonWindows:PP(n.singletonWindows),statsWindows:LP(n.statsWindows),moduleConfigs:Rn(n.moduleConfigs)?n.moduleConfigs:{}}}function MP(n){return Rn(n)?{fps:$t(n.fps),playbackRate:$t(n.playbackRate)}:{}}function TP(n){return Rn(n)?{currentTime:$t(n.currentTime),playing:ki(n.playing),rate:$t(n.rate),skipPostGoalTransitions:ki(n.skipPostGoalTransitions),skipKickoffs:ki(n.skipKickoffs)}:{}}function AP(n){if(!Rn(n))return{};const e={},t=n.mode==="follow"?"follow":n.mode==="free"?"free":void 0,i=n.freePreset==="overhead"?"overhead":n.freePreset==="side"?"side":n.freePreset===null?null:void 0,s=M_(n.attachedPlayerId),a=$t(n.distanceScale),r=ki(n.ballCam),o=CP(n.customSettings);return t!==void 0&&(e.mode=t),i!==void 0&&(e.freePreset=i),s!==void 0&&(e.attachedPlayerId=s),a!==void 0&&(e.distanceScale=a),r!==void 0&&(e.ballCam=r),o!==void 0&&(e.customSettings=o),e}function CP(n){if(n===null)return null;if(!Rn(n))return;const e={},t=$t(n.fov),i=$t(n.height),s=$t(n.pitch),a=$t(n.distance),r=$t(n.stiffness),o=$t(n.swivelSpeed),l=$t(n.transitionSpeed);return t!==void 0&&(e.fov=t),i!==void 0&&(e.height=i),s!==void 0&&(e.pitch=s),a!==void 0&&(e.distance=a),r!==void 0&&(e.stiffness=r),o!==void 0&&(e.swivelSpeed=o),l!==void 0&&(e.transitionSpeed=l),e}function RP(n){const e=Rn(n)?n:{};return{timelineEvents:Eo(e.timelineEvents),timelineRanges:Eo(e.timelineRanges),mechanics:Eo(e.mechanics),renderEffects:Eo(e.renderEffects),followedPlayerHud:ki(e.followedPlayerHud)??!1,boostPads:ki(e.boostPads)??!0,boostPickupAnimation:ki(e.boostPickupAnimation)??!1}}function PP(n){return Array.isArray(n)?n.map(e=>!Rn(e)||!IP(e.id)?null:{id:e.id,placement:E_(e.placement)}).filter(e=>e!==null):[]}function LP(n){return Array.isArray(n)?n.map(e=>!Rn(e)||typeof e.id!="string"||!DP(e.kind)?null:{id:e.id,kind:e.kind,placement:E_(e.placement),playerId:M_(e.playerId)??null,team:e.team==="orange"?"orange":e.team==="blue"?"blue":null,entries:NP(e.entries)}).filter(e=>e!==null):[]}function NP(n){return Array.isArray(n)?n.map(e=>!Rn(e)||typeof e.statId!="string"?null:{statId:e.statId,targetId:typeof e.targetId=="string"?e.targetId:void 0}).filter(e=>e!==null):[]}function E_(n){const e=Rn(n)?n:{},t=Rn(e.viewport)?e.viewport:{};return{x:$t(e.x)??8,y:$t(e.y)??8,viewport:{width:cl(t.width)??1,height:cl(t.height)??1},zIndex:$t(e.zIndex),visible:ki(e.visible)??!0}}function IP(n){return n==="camera"||n==="playback"||n==="recording"||n==="mechanics"||n==="event-playlist"||n==="mechanics-review"||n==="boost-pickups"||n==="touch-controls"}function DP(n){return n==="player"||n==="team"||n==="all-players"||n==="all-teams"||n==="goals-overview"||n==="ad-hoc"}function Rn(n){return typeof n=="object"&&n!==null&&!Array.isArray(n)}function $t(n){return typeof n=="number"&&Number.isFinite(n)?n:void 0}function cl(n){const e=$t(n);return e!==void 0&&e>0?e:void 0}function ki(n){return typeof n=="boolean"?n:void 0}function M_(n){return n===null?null:typeof n=="string"?n:void 0}function Eo(n){return Array.isArray(n)?n.filter(e=>typeof e=="string"):[]}function Wp(n,e,t){return Math.min(t,Math.max(e,n))}const T_=2.25,A_=4,UP=["free","follow"];let ne=null,mn=null,Gt=null,rn=null,Ss=null,ea=null,dl=null;const tr=new Map,ul=new Map,nr=new Map,Ul=r_({refreshTimelineRanges(){ca()},rerenderCurrentState(){ne&&ne.setBoostPickupAnimationEnabled(ne.getState().boostPickupAnimationEnabled)},requestConfigSync(){je()}}),Ta=OR({rerenderCurrentState(){if(!ne)return;const n=ne.getState();Or(n.frameIndex)},refreshTimelineRanges(){ca()},requestConfigSync(){je()}},{boostPickupFilters:Ul});let gi=[],vn=new Set,Aa=new Set,pn=new Set,Ca=new Set;const FP=new Set(["ceiling-shot","fifty-fifty","pressure",i_,"absolute-positioning","speed-flip","touch"]),C_="touch",OP="mechanics:ranges",R_=new Set(["ball-carry","ceiling-shot","double-tap","flick","half-flip","musty-flick","one-timer","pass","speed-flip"]),Xp=["#3b82f6","#06b6d4","#22c55e","#a855f7","#f97316","#ef4444","#f59e0b","#ec4899"],kP="#d1d9e0",P_=[{id:"core",label:"Shots, saves, assists",buildEvents(n){return n.replay.timelineEvents.filter(e=>e.kind==="shot"||e.kind==="save"||e.kind==="assist")}},{id:"demo",label:"Demos",buildEvents(n){return n.replay.timelineEvents.filter(e=>e.kind==="demo")}}],dh=[{id:"goal-context",label:"Goal Context",buildEvents(n){return Vg(n.statsTimeline,n.replay)}},{id:"goal-tags",label:"Goal Tags",buildEvents(n){return Gg(n.statsTimeline,n.replay)}}];let Bi=null,oa,L_,hl,qp,fl,ou,Yp,Zp,Ri,ta,Mo,Zc,Kp,lu,N_,I_,D_,U_,F_,cu,du,uu,hu,fu,pu,mu,qa,O_,Ya,gu,zo,_u,pl,_s,zi,vu,yu,ir,sr,ar,k_,Di,ml,wr,Er,Mr,Tr,Ar,Cr,Rr,B_,z_,H_,G_,V_,$_,W_,rr,bu,Za,X_,q_,Y_,Z_,nn,K_,j_,xu,Ho,Go,Vo,$o,Wo,Xo,An,pi=null,$n,va,ya,Su,wu,Eu,Mu,Tu,J_,Q_,ev,tv,To=null,vs=xr(null),gl=30,or=1,_i=!0,_l=null,Zn=null,Pi=null,la=!1,ms=null,Wi=null,vl=!0,Xi=null;const BP=["camera","playback","recording","mechanics","event-playlist","mechanics-review","boost-pickups","touch-controls"],ws=new Map;let Wt=null,qo=!1;function zP(){return new Set([...vn,...Aa,...Ca])}function nv(n){return n==="events"?vn:n==="ranges"?Aa:Ca}function Yi(){return!ne||!rn||!Ss?null:{player:ne,replay:ne.replay,statsTimeline:rn,statsFrameLookup:Ss,fieldScale:ne.options.fieldScale??1}}function ba(){uh();const n=Yi();if(!n)return;const e=zP();gi=Ta.filter(t=>e.has(t.id)),Ul.setup(n);for(const t of gi)t.setup(n);dl=n.player.onBeforeRender(t=>{for(const i of gi)Ca.has(i.id)&&i.onBeforeRender(t)}),Yo(),ca()}function uh(){dl?.(),dl=null,Fl(),Ol();for(const n of gi)n.teardown();gi=[]}function iv(n,e,t){const i=nv(e);if(t?i.add(n):i.delete(n),ba(),qi(),bi(),ne){const s=ne.getState();Or(s.frameIndex)}vi(),je()}function Fl(){for(const n of tr.values())n();tr.clear()}function Ol(){for(const n of ul.values())n();ul.clear()}function sv(){for(const n of nr.values())n();nr.clear()}function hh(){nr.get("boost-pad-overlay")?.(),nr.delete("boost-pad-overlay"),!(!ne||!_i)&&nr.set("boost-pad-overlay",ne.addPlugin(AT()))}function HP(){_i=!_i,hh(),qi(),je()}function Yo(){Fl();const n=Yi();if(!(!mn||!n)){for(const e of gi){if(!vn.has(e.id))continue;const t=e.getTimelineEvents?.(n);!t||t.length===0||tr.set(e.id,mn.addEventSource(t,{id:`module:${e.id}`,label:e.label}))}for(const e of dh){if(!vn.has(e.id))continue;const t=e.buildEvents(n);t.length!==0&&tr.set(`events:${e.id}`,mn.addEventSource(t,{id:`events:${e.id}`,label:e.label}))}for(const e of pn){const t=ih(n.statsTimeline,n.replay,[e]);t.length!==0&&tr.set(`mechanics:events:${e}`,mn.addEventSource(t,{id:`mechanics:${e}`,label:Bt(e)}))}mn.refreshEvents()}}function ca(){Ol();const n=Yi();if(!mn||!n)return;for(const t of gi)!Aa.has(t.id)||!t.getTimelineRanges||ul.set(t.id,mn.addRangeSource(()=>t.getTimelineRanges?.(n)??[]));const e=e_(n.statsTimeline,n.replay,pn);e.length>0&&ul.set(OP,mn.addRangeSource(e)),mn.refreshRanges()}function vi(){if(!ne||!rn){xu.textContent="--";return}const n=ih(rn,ne.replay,pn).length,e=e_(rn,ne.replay,pn).length;xu.textContent=`${qA(vn,ne.replay,rn)+n+e}`}function re(n,e){const t=n.querySelector(e);if(!(t instanceof HTMLElement))throw new Error(`Missing element for selector: ${e}`);return t}function GP(n){return n.closest("[data-window-id]")?.dataset.windowId??null}function av(){return{width:Math.max(1,window.innerWidth),height:Math.max(1,window.innerHeight)}}function jp(n,e){const t=n.style.getPropertyValue(e).trim(),i=getComputedStyle(n).getPropertyValue(e).trim(),s=t||i,a=Number.parseFloat(s);if(Number.isFinite(a))return a;const r=n.getBoundingClientRect();return e==="--window-y"?r.top:r.left}function rv(n){const e=Number.parseInt(n.style.zIndex,10);return{x:jp(n,"--window-x"),y:jp(n,"--window-y"),viewport:av(),zIndex:Number.isFinite(e)?e:void 0,visible:!n.hidden}}function ov(n,e){const t=wP(e,av());n.style.setProperty("--window-x",`${t.x}px`),n.style.setProperty("--window-y",`${t.y}px`),n.hidden=!e.visible,e.zIndex!==void 0&&(n.style.zIndex=`${e.zIndex}`,gl=Math.max(gl,e.zIndex+1))}function VP(){const n=[],e=Bi??document;for(const t of BP){const i=e.querySelector(`[data-window-id="${t}"]`);i&&n.push({id:t,placement:rv(i)})}return n}function lv(){return Ta.filter(n=>n.getConfig||n.applyConfig).map(n=>{const e={id:n.id};return n.id==="boost"&&(e.aliases=["boost-pickup-animation"]),n.getConfig&&(e.getConfig=()=>n.getConfig?.()),n.applyConfig&&(e.applyConfig=t=>n.applyConfig?.(t)),e})}function $P(){return kR(lv())}function WP(n){BR(lv(),n)}function XP(n){return{id:n.id,kind:n.kind,placement:rv(n.element),playerId:n.playerId,team:n.team,entries:n.entries.map(e=>({statId:e.statId,targetId:e.targetId}))}}function qP(){const n=ne?.getState();return{currentTime:n?.currentTime,playing:n?.playing,rate:n?.speed??Number(_s?.value??1),skipPostGoalTransitions:ne?n?.skipPostGoalTransitionsEnabled:An.checked,skipKickoffs:ne?n?.skipKickoffsEnabled:$n.checked}}function YP(){const n=ne?.getState();return{mode:n?.cameraViewMode,freePreset:Zn,attachedPlayerId:n?.attachedPlayerId,distanceScale:n?.cameraDistanceScale,ballCam:n?.ballCamEnabled,customSettings:n?.customCameraSettings}}function ZP(){return{fps:Number(va?.value),playbackRate:Number(ya?.value)}}function KP(){return{version:ll,playback:qP(),camera:YP(),overlays:{timelineEvents:[...vn],timelineRanges:[...Aa],mechanics:[...pn],renderEffects:[...Ca],followedPlayerHud:!1,boostPads:_i,boostPickupAnimation:ne?.getState().boostPickupAnimationEnabled??!1},recording:ZP(),singletonWindows:VP(),statsWindows:[...ws.values()].map(XP),moduleConfigs:$P()}}function je(){la||(ms!==null&&window.clearTimeout(ms),ms=window.setTimeout(()=>{ms=null;const n=w_(new URL(window.location.href),KP());window.history.replaceState(window.history.state,"",n)},150))}function jP(n,e,t){console.groupCollapsed("[subtr-actor] stats player cfg load"),console.log("location.href",window.location.href),console.log("location.search",n.search||"(empty)"),console.log("location.hash",n.hash||"(empty)"),console.table([...n.searchParams.map(([i,s])=>({source:"search",name:i,value:s})),...n.hashParams.map(([i,s])=>({source:"hash",name:i,value:s}))]),console.log("cfg selected source",n.selectedSource??"(none)"),console.log("cfg selected raw text",n.selectedValue??"(none)"),console.log("cfg selected raw length",n.selectedValue?.length??0),console.log("cfg search values",n.searchValues),console.log("cfg hash values",n.hashValues),n.hashValues.length>0&&n.searchValues.length>0&&console.warn("Both hash and search contain cfg; hash cfg is used."),e&&(console.log("cfg normalized JSON",JSON.stringify(e,null,2)),console.log("cfg normalized object",e)),t&&console.error("cfg decode/apply error",t),console.groupEnd()}function JP(n){const e=Bi??document;for(const t of n.singletonWindows){const i=e.querySelector(`[data-window-id="${t.id}"]`);i&&ov(i,t.placement)}}function QP(n){vn=new Set(n.overlays.timelineEvents),Aa=new Set(n.overlays.timelineRanges),pn=new Set(n.overlays.mechanics),Ca=new Set(n.overlays.renderEffects),_i=n.overlays.boostPads,An.checked=n.playback.skipPostGoalTransitions??An.checked,$n.checked=n.playback.skipKickoffs??$n.checked,n.playback.rate!==void 0&&(_s.value=`${n.playback.rate}`),n.recording.fps!==void 0&&(va.value=`${n.recording.fps}`),n.recording.playbackRate!==void 0&&(ya.value=`${n.recording.playbackRate}`),WP(n.moduleConfigs),JP(n),I2(n.statsWindows),qi(),bi(),vi()}function e2(n,e,t){return{currentTime:n.currentTime,playing:n.playing,speed:n.rate,cameraDistanceScale:e.distanceScale,customCameraSettings:e.customSettings,cameraViewMode:e.mode,attachedPlayerId:e.attachedPlayerId,ballCamEnabled:e.ballCam,boostPickupAnimationEnabled:t.overlays.boostPickupAnimation,skipPostGoalTransitionsEnabled:n.skipPostGoalTransitions,skipKickoffsEnabled:n.skipKickoffs}}function t2(n,e){if(!ne||!Number.isFinite(n))return;Wt&&(Wt.currentClip=null),e!==null&&ne.replay.players.some(i=>i.id===e)&&(ne.setAttachedPlayer(e),ne.setCameraViewMode("follow"),Zn=null),An.checked=!1,$n.checked=!1,ne.setState({currentTime:Math.max(0,n-A_),playing:!0,skipPostGoalTransitionsEnabled:!1,skipKickoffsEnabled:!1}),je()}function n2(n){ne&&(ne.setState(e2(n.playback,n.camera,n)),Zn=n.camera.freePreset??null,n.camera.mode==="free"&&n.camera.freePreset&&ne.setFreeCameraPreset(n.camera.freePreset),hh(),ba(),qi(),bi(),Or(ne.getState().frameIndex))}function kl(n){n.style.zIndex=`${gl++}`}function i2(n){const e=re(Bi??document,`[data-window-id="${n}"]`);e.hidden=!1,kl(e),je()}function s2(n){const e=re(Bi??document,`[data-window-id="${n}"]`);e.hidden=!e.hidden,e.hidden||kl(e),je()}function a2(n){const e=re(Bi??document,`[data-window-id="${n}"]`);e.hidden=!0,je()}function lr(n){ou.hidden=!n,fl.setAttribute("aria-label",n?"Close menu":"Open menu"),fl.setAttribute("aria-expanded",n?"true":"false")}function Jp(){oa.click(),lr(!1)}function r2(n){return n instanceof Element&&!!n.closest("button, input, select, textarea, option, label, a, [data-no-drag]")}function Qp(n,e){n.addEventListener("pointerdown",t=>{if(!(t.target instanceof HTMLElement)||r2(t.target))return;const i=t.target.closest("[data-window-id]");if(!i||i.hidden)return;kl(i);const s=t.clientX,a=t.clientY,r=i.getBoundingClientRect(),o=t.pointerId;i.setPointerCapture(o),t.preventDefault();const l=d=>{const u=Math.max(8,Math.min(window.innerWidth-120,r.left+d.clientX-s)),h=Math.max(8,Math.min(window.innerHeight-100,r.top+d.clientY-a));i.style.setProperty("--window-x",`${u}px`),i.style.setProperty("--window-y",`${h}px`)},c=()=>{i.releasePointerCapture(o),i.removeEventListener("pointermove",l),i.removeEventListener("pointerup",c),i.removeEventListener("pointercancel",c),je()};i.addEventListener("pointermove",l),i.addEventListener("pointerup",c),i.addEventListener("pointercancel",c)},{signal:e})}function qi(){bu.replaceChildren();const n=[],e=[];for(const c of Ta){const d=FP.has(c.id);!c.getTimelineEvents&&!c.getTimelineRanges&&!d||(c.getTimelineEvents&&n.push(Jc(c.id,jc(c,"events"),"events")),c.getTimelineRanges&&n.push(Jc(c.id,jc(c,"ranges"),"ranges")),d&&e.push(Jc(c.id,jc(c,"effects"),"effects")))}const t=ne?.getState().boostPickupAnimationEnabled??!1,i=document.createElement("button");i.type="button",i.className="module-summary-item",i.dataset.active=t?"true":"false",i.setAttribute("aria-pressed",t?"true":"false"),i.addEventListener("click",()=>{const c=!(ne?.getState().boostPickupAnimationEnabled??!1);ne?.setBoostPickupAnimationEnabled(c),ba(),qi(),bi(),je()});const s=document.createElement("span");s.textContent="Boost pickup animation";const a=document.createElement("strong");a.textContent=t?"On":"Off",i.append(s,a),e.push(i);const r=document.createElement("button");r.type="button",r.className="module-summary-item",r.dataset.active=_i?"true":"false",r.setAttribute("aria-pressed",_i?"true":"false"),r.addEventListener("click",HP);const o=document.createElement("span");o.textContent="Boost pad locations";const l=document.createElement("strong");l.textContent=_i?"On":"Off",r.append(o,l),e.push(r),bu.append(lm("Timeline visualizations",n),lm("In-game visualizations",e))}function cr(){Ri.replaceChildren();const n=Yi(),e=Pg(rn),t=new Map;for(const m of rn?.events.mechanics??[])t.set(m.kind,(t.get(m.kind)??0)+1);const i=Ta.filter(m=>m.getTimelineEvents&&!R_.has(m.id)).map(m=>({id:m.id,label:m.label,count:n?m.getTimelineEvents?.(n).length??0:0})),s=P_.map(m=>({id:m.id,label:m.label,count:n?m.buildEvents(n).length:0})),a=dh.map(m=>({id:m.id,label:m.label,count:n?m.buildEvents(n).length:0})),r=[...s,...i,...a].filter(m=>m.count>0).map(m=>m.id);if(r.length===0&&e.length===0){const m=document.createElement("p");m.className="stat-window-empty",m.textContent="No events loaded.",Ri.append(m);return}const o=document.createElement("div");o.className="mechanics-actions";const l=document.createElement("button");l.type="button",l.className="module-summary-item",l.addEventListener("click",()=>{for(const m of r)vn.add(m);pn=new Set(e),ba(),Yo(),ca(),cr(),qi(),bi(),vi(),je()});const c=document.createElement("span");c.textContent="All events";const d=document.createElement("strong");d.textContent=`${r.length+e.length}`,l.append(c,d);const u=document.createElement("button");u.type="button",u.className="module-summary-item",u.addEventListener("click",()=>{vn.clear(),pn.clear(),ba(),Yo(),ca(),cr(),qi(),bi(),vi(),je()});const h=document.createElement("span");h.textContent="No events";const f=document.createElement("strong");f.textContent="Off",u.append(h,f),o.append(l,u),Ri.append(o);const g=tm("Replay",s);g&&Ri.append(g);const _=tm("Stats",[...i,...a]);if(_&&Ri.append(_),e.length>0){const m=document.createElement("h3");m.className="module-settings-eyebrow",m.textContent="Mechanics",Ri.append(m);const p=document.createElement("div");p.className="module-list mechanics-list";for(const w of e){const x=pn.has(w),y=document.createElement("button");y.type="button",y.className="module-summary-item",y.dataset.active=x?"true":"false",y.setAttribute("aria-pressed",x?"true":"false"),y.addEventListener("click",()=>{pn.has(w)?pn.delete(w):pn.add(w),Yo(),ca(),cr(),vi(),je()});const C=document.createElement("span");C.textContent=Bt(w);const M=document.createElement("strong");M.textContent=`${x?"On":"Off"} ${t.get(w)??0}`,y.append(C,M),p.append(y)}Ri.append(p)}}function em(){cr()}function tm(n,e){const t=e.filter(r=>r.count>0);if(t.length===0)return null;const i=document.createElement("section"),s=document.createElement("h3");s.className="module-settings-eyebrow",s.textContent=n;const a=document.createElement("div");a.className="module-list mechanics-list";for(const r of t){const o=vn.has(r.id),l=document.createElement("button");l.type="button",l.className="module-summary-item",l.dataset.active=o?"true":"false",l.setAttribute("aria-pressed",o?"true":"false"),l.addEventListener("click",()=>{iv(r.id,"events",!vn.has(r.id)),cr(),vi()});const c=document.createElement("span");c.textContent=r.label;const d=document.createElement("strong");d.textContent=`${o?"On":"Off"} ${r.count}`,l.append(c,d),a.append(l)}return i.append(s,a),i}function o2(n){return[{id:"replay:goals",group:"Replay",label:"Goals",events:n.replay.timelineEvents.filter(t=>t.kind==="goal")},...P_.map(t=>({id:`replay:${t.id}`,group:"Replay",label:t.label,events:t.buildEvents(n)}))].filter(t=>t.events.length>0)}function l2(){const n=Yi();if(!n)return[];const e=Pg(n.statsTimeline),t=new Set(e.map(r=>r.replaceAll("_","-"))),i=Ta.filter(r=>r.getTimelineEvents&&!R_.has(r.id)&&!t.has(r.id)).map(r=>({id:`module:${r.id}`,group:"Stats",label:r.label,events:r.getTimelineEvents?.(n)??[]})).filter(r=>r.events.length>0),s=dh.map(r=>({id:`extra:${r.id}`,group:"Stats",label:r.label,events:r.buildEvents(n)})).filter(r=>r.events.length>0),a=e.map(r=>({id:`mechanic:${r}`,group:"Mechanics",label:Bt(r),events:ih(n.statsTimeline,n.replay,[r])})).filter(r=>r.events.length>0);return[...o2(n),...i,...s,...a]}function fh(n){const e=n.map(t=>t.id);return Wi===null?new Set(e):new Set(e.filter(t=>Wi?.has(t)))}function c2(n){const e=n.playerId??null,t=e&&ne?ne.replay.players.findIndex(i=>i.id===e):-1;return t>=0?Xp[t%Xp.length]:n.color??kP}function d2(n){const e=fh(n);return n.filter(t=>e.has(t.id)).flatMap(t=>t.events.map((i,s)=>({key:`${t.id}:${i.id??`${i.kind}:${i.time}:${s}`}`,sourceId:t.id,sourceLabel:t.label,event:i,color:c2(i)}))).sort((t,i)=>t.event.time!==i.event.time?t.event.time-i.event.time:(t.event.label??t.sourceLabel).localeCompare(i.event.label??i.sourceLabel))}function u2(n,e){const t=fh(n);e(t),Wi=t,Xi=null,xa();const i=ne?.getState();i&&Pr(i)}function xa(){if(!ta)return;ta.replaceChildren();const n=l2();if(n.length===0){const _=document.createElement("p");_.className="stat-window-empty",_.textContent=ne?"No events loaded.":"Load a replay to see events.",ta.append(_);return}const e=fh(n),t=d2(n),i=document.createElement("div");i.className="event-playlist-toolbar";const s=document.createElement("details");s.className="event-playlist-filter",s.dataset.noDrag="true";const a=document.createElement("summary");a.textContent=`Filters ${e.size}/${n.length}`,s.append(a);const r=document.createElement("div");r.className="event-playlist-filter-panel";const o=document.createElement("div");o.className="event-playlist-filter-actions";const l=document.createElement("button");l.type="button",l.textContent="All",l.addEventListener("click",()=>{Wi=null,Xi=null,xa();const _=ne?.getState();_&&Pr(_)});const c=document.createElement("button");c.type="button",c.textContent="None",c.addEventListener("click",()=>{Wi=new Set,Xi=null,xa()}),o.append(l,c),r.append(o);const d=new Map;for(const _ of n){const m=d.get(_.group)??[];m.push(_),d.set(_.group,m)}for(const[_,m]of d){const p=document.createElement("section");p.className="event-playlist-filter-group";const w=document.createElement("h3");w.textContent=_,p.append(w);for(const x of m){const y=document.createElement("label");y.className="toggle event-playlist-filter-option";const C=document.createElement("input");C.type="checkbox",C.checked=e.has(x.id),C.addEventListener("change",()=>{u2(n,T=>{C.checked?T.add(x.id):T.delete(x.id)})});const M=document.createElement("span");M.textContent=`${x.label} (${x.events.length})`,y.append(C,M),p.append(y)}r.append(p)}s.append(r);const u=document.createElement("label");u.className="toggle event-playlist-follow";const h=document.createElement("input");h.type="checkbox",h.checked=vl,h.addEventListener("change",()=>{vl=h.checked;const _=ne?.getState();_&&Pr(_,{forceScroll:!0})});const f=document.createElement("span");f.textContent="Auto-follow",u.append(h,f),i.append(s,u);const g=document.createElement("div");if(g.className="event-playlist-list",g.dataset.noDrag="true",t.length===0){const _=document.createElement("p");_.className="stat-window-empty",_.textContent="No event types selected.",g.append(_)}else for(const _ of t){const m=document.createElement("button");m.type="button",m.className="event-playlist-item",m.dataset.eventKey=_.key,m.dataset.eventTime=`${_.event.time}`,m.style.setProperty("--event-color",_.color),m.addEventListener("click",()=>{ne?.seek(_.event.time)});const p=document.createElement("span");p.className="event-playlist-time",p.textContent=Ev(_.event.time);const w=document.createElement("span");w.className="event-playlist-main";const x=document.createElement("strong");x.textContent=_.event.label??_.sourceLabel;const y=document.createElement("span");y.textContent=[_.event.playerName??null,_.event.frame!==void 0?`frame ${_.event.frame}`:null,_.sourceLabel].filter(C=>!!C).join(" · "),w.append(x,y),m.append(p,w),g.append(m)}ta.append(i,g)}function h2(n,e){const t=[...n.querySelectorAll(".event-playlist-item")];if(t.length===0)return null;let i=t[0]??null,s=Number.POSITIVE_INFINITY;for(const a of t){const r=Number(a.dataset.eventTime);if(!Number.isFinite(r))continue;const o=Math.abs(r-e);o<s&&(s=o,i=a)}return i}function Pr(n,e={}){const t=ta?.querySelector(".event-playlist-list");if(!t)return;const i=h2(t,n.currentTime),s=i?.dataset.eventKey??null;s===Xi&&!e.forceScroll||(t.querySelectorAll(".event-playlist-item[data-active='true']").forEach(a=>{a.dataset.active="false"}),i&&(i.dataset.active="true",(vl||e.forceScroll)&&i.scrollIntoView({block:"nearest"})),Xi=s)}function Kn(n){return typeof n=="object"&&n!==null&&!Array.isArray(n)}function nm(n){return Kn(n)&&(n.kind==="time"||n.kind==="frame")&&typeof n.value=="number"&&Number.isFinite(n.value)?{kind:n.kind,value:n.value}:null}function Ao(n,e){if(n!=null){if(typeof n!="number"||!Number.isInteger(n)||!Number.isFinite(n)||n<0)throw new Error(`Review playlist page ${e} must be a non-negative integer.`);return n}}function im(n,e){if(n!=null){if(typeof n!="string")throw new Error(`Review playlist page ${e} must be a string.`);return n}}function f2(n){if(n!=null){if(!Kn(n))throw new Error("Review playlist page must be an object.");return{next:im(n.next,"next"),previous:im(n.previous,"previous"),total:Ao(n.total,"total"),count:Ao(n.count,"count"),limit:Ao(n.limit,"limit"),offset:Ao(n.offset,"offset")}}}function p2(n){if(!Kn(n)||!Array.isArray(n.items))throw new Error("Review playlist must contain an items array.");const e=n.items.map((i,s)=>{if(!Kn(i)||typeof i.replay!="string")throw new Error(`Invalid review item at index ${s}.`);const a=nm(i.start),r=nm(i.end);if(!a||!r)throw new Error(`Review item ${s+1} has invalid start or end.`);return{id:typeof i.id=="string"?i.id:void 0,replay:i.replay,start:a,end:r,label:typeof i.label=="string"?i.label:void 0,meta:Kn(i.meta)?i.meta:void 0}}),t=Array.isArray(n.replays)?n.replays.map(i=>!Kn(i)||typeof i.id!="string"?null:{id:i.id,path:typeof i.path=="string"?i.path:void 0,label:typeof i.label=="string"?i.label:void 0,locator:Kn(i.locator)?i.locator:void 0,meta:Kn(i.meta)?i.meta:void 0}).filter(i=>i!==null):void 0;return{label:typeof n.label=="string"?n.label:void 0,replays:t,items:e,page:f2(n.page),playback:n.playback,meta:n.meta}}function cv(n){let e;try{e=JSON.parse(n)}catch(t){throw new Error(`Invalid review playlist JSON: ${t instanceof Error?t.message:String(t)}`)}return p2(e)}function m2(){const n=new URLSearchParams(window.location.search);return n.get("reviewPlaylist")?.trim()||n.get("review")?.trim()||n.get("playlist")?.trim()||n.get("playlistUrl")?.trim()||null}function g2(n){return/^\/(?:home|Users|tmp|var\/tmp|mnt|media|run\/user|nix\/store)\//.test(n)}function dv(n,e){const t=n.startsWith("path:")?n.slice(5):n;return/^https?:\/\//i.test(t)||t.startsWith("/@fs/")?t:t.startsWith("/")?g2(t)?`/@fs${t}`:t:e?new URL(t,e).href:t}function Bl(n,e){const t=e.replaysById.get(n.replay);if(t?.path)return t.path;if(Kn(t?.locator)&&t.locator.kind==="path"&&typeof t.locator.path=="string")return t.locator.path;if(/^https?:\/\//i.test(n.replay)||n.replay.startsWith("/")||n.replay.startsWith("/@fs/")||n.replay.startsWith("path:"))return n.replay;throw new Error(`Review replay "${n.replay}" does not include a loadable path.`)}function uv(n,e){const t=e.replaysById.get(n.replay),s=(t?.path??Bl(n,e)).replace(/^path:/,"").split("/").filter(Boolean).pop();return t?.label??s??"review replay"}function hv(n,e,t){const i=Bl(n,e),s=dv(i,e.sourceUrl);return{name:uv(n,e),preparingStatus:"Loading review replay...",async readBytes(){const a=await fetch(s,{signal:t});if(!a.ok){const r=a.statusText?` ${a.statusText}`:"";throw new Error(`Failed to fetch review replay from ${s} (${a.status}${r})`)}return new Uint8Array(await a.arrayBuffer())}}}function sm(n){if(n.kind==="time")return n.value;const e=Math.max(0,Math.trunc(n.value));return ne?.replay.frames[e]?.time??ne?.replay.frames.at(-1)?.time??0}function Au(n,e){return n.label??n.meta?.mechanicLabel??`Review item ${e+1}`}function fv(n){return typeof n.meta?.playerId=="string"?n.meta.playerId:Kn(n.meta?.target)&&typeof n.meta.target.playerId=="string"?n.meta.target.playerId:null}function _2(n){if(typeof n.meta?.playerName=="string"&&n.meta.playerName.trim())return n.meta.playerName;const e=fv(n);return e?ne?.replay.players.find(t=>t.id===e)?.name??e:"--"}function am(n){return typeof n.meta?.mechanicLabel=="string"&&n.meta.mechanicLabel.trim()?n.meta.mechanicLabel:typeof n.meta?.mechanic=="string"?Bt(n.meta.mechanic):"--"}function Cu(n){return typeof n=="string"&&n.trim()?n.replaceAll("_"," "):"unreviewed"}function pv(n){if(!n)return null;if(typeof n.meta?.reviewEndpoint=="string"&&n.meta.reviewEndpoint)return n.meta.reviewEndpoint;const e=typeof n.meta?.eventId=="string"&&n.meta.eventId?n.meta.eventId:n.id;return e?`/api/v1/mechanics/events/${encodeURIComponent(e)}/reviews`:null}function v2(){const n=new URLSearchParams(window.location.search),e=n.get("reviewToken")??n.get("token")??window.localStorage.getItem("rocket_sense_access_token");return e?{Authorization:`Bearer ${e}`}:{}}function _n(n){lu&&(lu.textContent=n)}function mv(n){const e=new Map;for(const t of n.manifest.items)e.has(t.replay)||e.set(t.replay,t);return e}function y2(n){const e=new Map;for(const t of n.manifest.items)e.set(t.replay,(e.get(t.replay)??0)+1);return e}function b2(n){const e=y2(n);for(const[t,i]of mv(n)){let s="",a=t;try{s=Bl(i,n),a=uv(i,n)}catch{a=n.replaysById.get(t)?.label??t}n.replayLoadStates.set(t,{replayId:t,label:a,path:s,clipCount:e.get(t)??0,status:"idle",progress:null,error:null})}}function Co(n,e,t){const i=n.replayLoadStates.get(e)??{replayId:e,label:e,path:"",clipCount:0,status:"idle",progress:null,error:null};n.replayLoadStates.set(e,{...i,...t});const s=n.manifest.items[n.currentIndex];n.loading&&s?.replay===e&&t.progress&&(nn.textContent=Ma(t.progress),pi?.update(t.progress)),Wt===n&&gv(n)}function x2(n){if(!n)return"";const e=Ma(n);if(n.processedFrames!==void 0){const t=n.totalFrames!==void 0?` / ${n.totalFrames}`:"";return`${e} (${n.processedFrames}${t} frames)`}if(n.processedChunks!==void 0){const t=n.totalChunks!==void 0?` / ${n.totalChunks}`:"";return`${e} (${n.processedChunks}${t} chunks)`}return e}function S2(n){return n.status==="idle"?"Pending":n.status==="loading"?x2(n.progress)||"Loading":n.status==="loaded"?"Loaded":n.error?`Failed: ${n.error}`:"Failed"}function w2(n){if(n.status==="loaded")return 1;const e=n.progress?.progress;return typeof e=="number"&&Number.isFinite(e)?Math.max(0,Math.min(1,e)):0}function gv(n){if(!qa||!mu)return;const e=n?Array.from(n.replayLoadStates.values()):[],t=e.filter(a=>a.status==="loaded").length,i=e.filter(a=>a.status==="loading").length,s=e.filter(a=>a.status==="error").length;if(mu.textContent=e.length===0?"0 replays":`${t}/${e.length} loaded${i>0?`, ${i} loading`:""}${s>0?`, ${s} failed`:""}`,qa.replaceChildren(),!n||e.length===0){const a=document.createElement("p");a.className="stat-window-empty",a.textContent="No replay sources.",qa.append(a);return}for(const a of e){const r=document.createElement("div");r.className=`mechanics-review-replay-load ${a.status}`;const o=document.createElement("div");o.className="mechanics-review-replay-load-main";const l=document.createElement("span");l.className="mechanics-review-replay-load-title",l.textContent=a.label;const c=document.createElement("span");c.className="mechanics-review-replay-load-meta",c.textContent=[a.replayId,`${a.clipCount} ${a.clipCount===1?"clip":"clips"}`,a.path].filter(Boolean).join(" · "),o.append(l,c);const d=document.createElement("strong");d.className="mechanics-review-replay-load-status",d.textContent=S2(a);const u=document.createElement("div");u.className="mechanics-review-replay-load-progress";const h=document.createElement("span");h.style.width=`${Math.round(w2(a)*100)}%`,u.append(h),r.append(o,d,u),qa.append(r)}}function rm(n,e){for(const[t,i]of mv(n))t!==e&&_v(i,n).catch(()=>{})}function _v(n,e){const t=e.replayLoadCache.get(n.replay);if(t)return t;const i=hv(n,e);Co(e,n.replay,{label:i.name,path:Bl(n,e),status:"loading",progress:null,error:null});const s=Promise.resolve().then(async()=>{const a=await i.readBytes();return Ll(a,{reportEveryNFrames:100,onProgress(r){Co(e,n.replay,{status:"loading",progress:r,error:null})}})}).then(a=>(Co(e,n.replay,{status:"loaded",progress:null,error:null}),a)).catch(a=>{throw e.replayLoadCache.delete(n.replay),Co(e,n.replay,{status:"error",error:a instanceof Error?a.message:String(a)}),a});return e.replayLoadCache.set(n.replay,s),s}function Sa(){if(!Ya)return;const n=Wt,e=n?.manifest.items??[],t=n?e[n.currentIndex]??null:null,i=e.length>0;O_.textContent=`${e.length} item${e.length===1?"":"s"}`,N_.textContent=i&&n?`${n.currentIndex+1} / ${e.length}`:"0 / 0",I_.textContent=t?Au(t,n?.currentIndex??0):"No candidate selected",D_.textContent=t?am(t):"--",U_.textContent=t?_2(t):"--",F_.textContent=t?.meta?.reason??"--",cu.disabled=!n||n.loading||n.currentIndex<=0,du.disabled=!n||n.loading||!n.currentClip,uu.disabled=!n||n.loading||n.currentIndex>=e.length-1;const s=!n||n.loading||pv(t)===null;if(hu.disabled=s,fu.disabled=s,pu.disabled=s,gv(n),Ya.replaceChildren(),!n||e.length===0){const a=document.createElement("p");a.className="stat-window-empty",a.textContent="No review playlist loaded.",Ya.append(a);return}e.forEach((a,r)=>{const o=document.createElement("button");o.type="button",o.className="mechanics-review-item",o.dataset.active=r===n.currentIndex?"true":"false",o.disabled=n.loading,o.addEventListener("click",()=>{yl(r)});const l=document.createElement("span");l.textContent=Au(a,r);const c=document.createElement("strong");c.textContent=[am(a),Cu(a.meta?.reviewStatus)].join(" · "),o.append(l,c),Ya.append(o)})}async function vv(n,e){const t=new Map;for(const i of n.replays??[])t.set(i.id,i);Wt={manifest:n,sourceUrl:e,replaysById:t,replayLoadStates:new Map,replayLoadCache:new Map,currentIndex:0,loading:!1,currentReplayId:null,currentClip:null},b2(Wt),_n(n.label?`Loaded ${n.label}.`:"Loaded review playlist."),Sa(),n.items.length>0&&await yl(0)}async function om(n){if(!n){_n("Enter a review playlist URL.");return}const e=dv(n,window.location.href);_n("Loading review playlist...");const t=await fetch(e);if(!t.ok){const s=t.statusText?` ${t.statusText}`:"";throw new Error(`Failed to fetch review playlist from ${e} (${t.status}${s})`)}const i=cv(await t.text());await vv(i,t.url||e)}async function yl(n){const e=Wt,t=e?.manifest.items[n];if(!(!e||!t||e.loading)){e.loading=!0,e.currentIndex=n,Sa(),_n(`Loading ${Au(t,n)}...`);try{if(!ne||e.currentReplayId!==t.replay){const r=hv(t,e),o=_v(t,e);rm(e,t.replay),await _h(r,o),e.currentReplayId=t.replay}else rm(e,t.replay);const i=Math.max(0,sm(t.start)),s=Math.min(ne?.getState().duration??Number.POSITIVE_INFINITY,Math.max(i,sm(t.end)));if(!Number.isFinite(i)||!Number.isFinite(s)||s<=i)throw new Error("Review item has an empty playback range.");const a=fv(t);a&&ne?.replay.players.some(r=>r.id===a)&&(ne.setAttachedPlayer(a),ne.setCameraViewMode("follow"),Zn=null),An.checked=!1,e.currentClip={startTime:i,endTime:s},ne?.setState({currentTime:i,playing:!1,skipPostGoalTransitionsEnabled:!1}),_n(`${i.toFixed(2)}s to ${s.toFixed(2)}s`)}catch(i){console.error("Failed to activate mechanics review item:",i),e.currentClip=null,_n(i instanceof Error?i.message:"Failed to load review item")}finally{e.loading=!1,Sa()}}}function E2(){const n=Wt?.currentClip;!n||!ne||ne.setState({currentTime:n.startTime,playing:!0,skipPostGoalTransitionsEnabled:!1})}async function Kc(n){const e=Wt,t=e?.manifest.items[e.currentIndex]??null,i=pv(t);if(!e||!t||!i){_n("Current review item has no review endpoint.");return}_n(`Submitting ${Cu(n)}...`);const s=await fetch(i,{method:"POST",headers:{"content-type":"application/json",...v2()},credentials:"same-origin",body:JSON.stringify({status:n})});if(!s.ok){let a=`${s.status}${s.statusText?` ${s.statusText}`:""}`;try{const r=await s.json();typeof r.error=="string"&&(a=r.error)}catch{}_n(`Review failed: ${a}`);return}t.meta=t.meta??{},t.meta.reviewStatus=n,_n(`Marked ${Cu(n)}.`),Sa()}function M2(n){const e=Wt?.currentClip;if(!e||!ne||qo)return!1;const t=n.currentTime<e.startTime-.1,i=n.currentTime>=e.endTime-.025;if(!t&&!i)return!1;qo=!0;try{ne.setState({currentTime:t?e.startTime:e.endTime,playing:!1,skipPostGoalTransitionsEnabled:!1})}finally{qo=!1}return!0}function lm(n,e){const t=document.createElement("section");t.className="module-summary-group";const i=document.createElement("h3");i.textContent=n;const s=document.createElement("div");return s.className="module-list",s.append(...e),t.append(i,s),t}function jc(n,e){const t={"absolute-positioning:ranges":"Position zones","backboard:events":"Backboard","ball-carry:events":"Ball carry","boost:ranges":"Boost pickup timeline","bump:events":"Bump","ceiling-shot:events":"Ceiling shot","demo:events":"Demo","dodge-reset:events":"Dodge reset","double-tap:events":"Double tap","fifty-fifty:events":"50/50","half-flip:events":"Half flip","musty-flick:events":"Musty flick","possession:ranges":"Possession","powerslide:events":"Powerslide","pressure:ranges":"Half control","rush:ranges":"Rush","speed-flip:events":"Speed flip","touch:events":"Touch","wavedash:events":"Wavedash"},i={"absolute-positioning":"Position zones","ceiling-shot":"Ceiling shot labels","fifty-fifty":"50/50 labels",pressure:"Half control","relative-positioning":"Player roles","speed-flip":"Speed flip labels",touch:"Touch labels"};return e==="effects"?i[n.id]??n.label:t[`${n.id}:${e}`]??`${n.label} timeline`}function Jc(n,e,t){const i=nv(t),s=i.has(n),a=document.createElement("button");a.type="button",a.className="module-summary-item",a.dataset.active=s?"true":"false",a.setAttribute("aria-pressed",s?"true":"false"),a.addEventListener("click",()=>{iv(n,t,!i.has(n))});const r=document.createElement("span");r.textContent=e;const o=document.createElement("strong");return o.textContent=s?"On":"Off",a.append(r,o),a}function bi(){Za.replaceChildren();const n=Yi(),e=gi.filter(t=>t.id!=="boost"&&t.id!==C_).map(t=>t.renderSettings?.(n)??null).filter(t=>t instanceof HTMLElement);if(e.length===0){Za.hidden=!0,cm(),dm();return}Za.hidden=!1,Za.append(...e),cm(),dm()}function cm(){if(!gu)return;const n=Yi(),e=Ul.renderSettings(n,{showHeader:!1});gu.replaceChildren(e)}function dm(){if(!zo)return;const n=Yi(),t=Ta.find(i=>i.id===C_)?.renderSettings?.(n)??null;zo.replaceChildren(),t instanceof HTMLElement&&zo.append(t)}function T2(n){return vs.find(e=>e.id===n)??null}function A2(n){return Ss?At(Ss,n):null}function ph(n,e){return e==="blue"?n.team_zero??null:n.team_one??null}function mh(n){return n==="blue"?"Blue":"Orange"}function yv(n){const e=ne?.replay.players.find(t=>t.id===n);return e?Fr(e.isTeamZero):null}function zl(n){return Fr(n==="blue")}function bv(n,e){const t=ne?.replay.players??[];for(const i of["blue","orange"]){const s=t.filter(r=>r.isTeamZero===(i==="blue"));if(s.length===0)continue;const a=document.createElement("optgroup");a.label=`${mh(i)} team`;for(const r of s)a.append(new Option(r.name,r.id,r.id===e,r.id===e));n.append(a)}}function C2(n){return n.kind==="player"?yv(n.playerId):n.kind==="team"?zl(n.team??"blue"):null}function R2(n,e){return n.scope==="player"?yv(e):zl(e==="orange"?"orange":"blue")}function P2(n){switch(n){case"player":return"Player stats";case"team":return"Team stats";case"all-players":return"All players stats";case"all-teams":return"All teams stats";case"goals-overview":return"Goal labels";case"ad-hoc":return"Ad hoc stats"}}function xv(n){return n==="player"||n==="team"}function L2(n){return n!=="goals-overview"}function Sv(n){switch(n){case"player":case"all-players":return"player";case"team":case"all-teams":return"team";case"goals-overview":return null;case"ad-hoc":return null}}function N2(){const n=ws.size*18;return{x:Math.max(12,Math.min(window.innerWidth-360,96+n)),y:Math.max(64,Math.min(window.innerHeight-240,96+n))}}function Or(n=ne?.getState().frameIndex??0,e={}){for(const t of ws.values())e.preserveOpenPickers&&(t.pickerOpen||t.element.contains(document.activeElement))||ni(t,n)}function wv(n,e){const t=e?.id??`stats-${or++}`,i=Number.parseInt(t.replace(/^stats-/,""),10);Number.isFinite(i)&&(or=Math.max(or,i+1));const{x:s,y:a}=N2(),r=document.createElement("section");r.className="stats-window",r.dataset.windowId=t,r.style.setProperty("--window-x",`${s}px`),r.style.setProperty("--window-y",`${a}px`),e&&ov(r,e.placement);const o=document.createElement("header");o.className="stats-window-header";const l=document.createElement("div");l.className="stats-window-actions";const c=document.createElement("button");if(c.type="button",c.className="stats-window-action",c.textContent="Hide",l.append(c),xv(n))o.classList.add("stats-window-header-actions-only"),o.append(l);else{const h=document.createElement("h2");h.textContent=P2(n),o.append(h,l)}const d=document.createElement("div");d.className="stats-window-body",r.append(o,d),_u.append(r);const u={id:t,kind:n,entries:e?.entries.map(h=>({key:`${t}:${h.statId}:${h.targetId??"scope"}`,statId:h.statId,targetId:h.targetId}))??[],playerId:e?.playerId??ne?.replay.players[0]?.id??null,team:e?.team??"blue",pickerOpen:!1,query:"",element:r,body:d};return c.addEventListener("click",()=>{r.hidden=!0,je()}),ws.set(t,u),e||kl(r),lr(!1),ni(u),je(),u}function I2(n){for(const e of ws.values())e.element.remove();ws.clear(),or=1;for(const e of n)wv(e.kind,e)}function ni(n,e=ne?.getState().frameIndex??0){const t=document.activeElement,i=t instanceof HTMLInputElement&&t.dataset.statsWindowSearch===n.id,s=i?t.selectionStart:null,a=i?t.selectionEnd:null,r=i?t.selectionDirection:null;if(n.body.replaceChildren(),D2(n),L2(n.kind)&&(U2(n),F2(n)),B2(n,e),i){const o=n.body.querySelector(`input[data-stats-window-search="${n.id}"]`);o?.focus({preventScroll:!0}),o&&s!==null&&a!==null&&o.setSelectionRange(s,a,r??"none")}}function D2(n){if(n.kind!=="player"&&n.kind!=="team")return;const e=document.createElement("div");e.className="stats-window-scope-row";const t=document.createElement("select");t.className="stats-window-scope-select";const i=C2(n);i&&t.classList.add(i),t.setAttribute("aria-label",n.kind==="player"?"Player stats target":"Team stats target"),n.kind==="player"?(bv(t,n.playerId),t.value=n.playerId??"",t.addEventListener("change",()=>{n.playerId=t.value||null,ni(n),je()})):(t.append(new Option("Blue","blue",n.team==="blue",n.team==="blue"),new Option("Orange","orange",n.team==="orange",n.team==="orange")),t.value=n.team??"blue",t.addEventListener("change",()=>{n.team=t.value==="orange"?"orange":"blue",ni(n),je()})),e.append(t),n.body.append(e)}function U2(n){const e=document.createElement("button");if(e.type="button",e.className="stats-window-add-button",e.textContent="+",e.title="Add stat",e.setAttribute("aria-label","Add stat"),e.setAttribute("aria-expanded",String(n.pickerOpen)),Ru(e,()=>{n.pickerOpen=!n.pickerOpen,ni(n)}),xv(n.kind)){n.body.querySelector(".stats-window-scope-row")?.append(e);return}const t=document.createElement("div");t.className="stats-window-toolbar",t.append(e),n.body.append(t)}function Ru(n,e){let t=!1;n.addEventListener("pointerdown",i=>{n.disabled||(t=!0,i.preventDefault(),e())}),n.addEventListener("click",()=>{if(t){t=!1;return}n.disabled||e()})}function F2(n){const e=document.createElement("div");if(e.className="stats-window-picker",e.hidden=!n.pickerOpen,e.hidden){n.body.append(e);return}const t=Sv(n.kind),i=document.createElement("input");i.type="search",i.placeholder="Search stats",i.value=n.query,i.dataset.statsWindowSearch=n.id;const s=document.createElement("div");s.className="stats-window-picker-list",i.addEventListener("input",()=>{n.query=i.value,um(n,s,t)}),um(n,s,t),e.append(i,s),n.body.append(e)}function um(n,e,t){e.replaceChildren();const i=t?vs.filter(r=>r.scope===t):vs,s=YR(i,n.query),a=new Map;for(const r of s){const o=a.get(r.category)??[];o.push(r),a.set(r.category,o)}for(const[r,o]of a){if(o.length<2)continue;const l=document.createElement("button");l.type="button",l.className="stats-window-picker-item",l.innerHTML=`<span>Add all ${r}</span><strong>${o.length}</strong>`,Ru(l,()=>{for(const c of o)hm(n,c);ni(n),je()}),e.append(l)}for(const r of s){const o=document.createElement("button");o.type="button",o.className="stats-window-picker-item",o.innerHTML=`<span>${r.label}</span><strong>${r.scope}</strong>`,o.disabled=n.kind!=="ad-hoc"&&n.entries.some(l=>l.statId===r.id),Ru(o,()=>{hm(n,r),ni(n),je()}),e.append(o)}if(s.length===0){const r=document.createElement("p");r.className="stat-window-empty",r.textContent=vs.length===0?"No stats available.":"No matching stats.",e.append(r)}}function hm(n,e){const t=n.kind==="ad-hoc"?O2(e):void 0;n.entries.some(i=>i.statId===e.id&&i.targetId===t)||n.entries.push({key:`${n.id}:${e.id}:${t??"scope"}`,statId:e.id,targetId:t})}function O2(n){return n.scope==="player"?ne?.replay.players[0]?.id??"":"blue"}function k2(n,e){const t=n.entries.findIndex(i=>i.key===e);t>=0&&n.entries.splice(t,1)}function B2(n,e){if(n.kind==="goals-overview"){z2(n);return}const t=A2(e),i=Sv(n.kind),s=n.entries.map(a=>({entry:a,definition:T2(a.statId)})).filter(a=>a.definition!==null&&(!i||a.definition.scope===i));if(s.length===0){const a=document.createElement("p");a.className="stat-window-empty",a.textContent="No stats added.",n.body.append(a);return}if(!t){const a=document.createElement("p");a.className="stat-window-empty",a.textContent="Load a replay to show stats.",n.body.append(a);return}if(n.kind==="all-players"){H2(n,t,s);return}if(n.kind==="all-teams"){G2(n,t,s);return}if(n.kind==="player"){const a=n.playerId?t.players.find(r=>ot(r.player_id)===n.playerId)??null:null;pm(n,a,s);return}if(n.kind==="team"){pm(n,ph(t,n.team??"blue"),s);return}n.kind==="ad-hoc"&&V2(n,t,s)}function z2(n){const e=rn,t=ne?.replay??null;if(!e||!t){fm(n,"Load a replay to show goal labels.");return}const i=[...e.events.goal_context??[]].sort((l,c)=>l.time-c.time),s=new Map;for(const l of e.events.goal_tags??[]){const c=s.get(l.goal_index)??[];c.push(l),s.set(l.goal_index,c)}for(const l of s.values())l.sort((c,d)=>c.kind.localeCompare(d.kind)||d.confidence-c.confidence);const a=new Set(i.map((l,c)=>c));for(const l of s.keys())a.add(l);const r=[...a].sort((l,c)=>l-c);if(r.length===0){fm(n,"No goals loaded.");return}const o=document.createElement("div");o.className="goal-label-list";for(const l of r){const c=i[l]??null,d=s.get(l)??[],u=d[0]??null,h=c?.time??u?.time??0,f=c?.scorer??u?.scorer??null,g=f?ot(f):null,_=f?t.players.find(v=>v.id===g)?.name??g:"Unknown scorer",m=c?.scoring_team_is_team_0??u?.scoring_team_is_team_0??null,p=document.createElement("section");p.className="goal-label-item",m!==null&&p.classList.add(Fr(m));const w=document.createElement("header"),x=document.createElement("h3");x.textContent=`Goal ${l+1}`;const y=document.createElement("span");y.textContent=`${Ev(h)} · ${_}`,w.append(x,y);const C=document.createElement("div");if(C.className="goal-label-tags",d.length===0){const v=document.createElement("span");v.className="goal-label-tag goal-label-tag-empty",v.textContent="Unlabeled",C.append(v)}else for(const v of d){const b=document.createElement("span");b.className="goal-label-tag",b.textContent=`${Bt(v.kind)} ${Math.round(v.confidence*100)}%`,C.append(b)}const M=document.createElement("div");M.className="goal-label-actions";const T=document.createElement("button");T.type="button",T.className="goal-label-watch",T.textContent="Watch",T.addEventListener("click",()=>{t2(h,g)});const A=document.createElement("button");A.type="button",A.textContent="Cue",A.addEventListener("click",()=>{ne?.setState({currentTime:Math.max(0,h-A_),playing:!1,skipPostGoalTransitionsEnabled:!1,skipKickoffsEnabled:!1}),An.checked=!1,$n.checked=!1,je()}),M.append(T,A),p.append(w,C,M),o.append(p)}n.body.append(o)}function fm(n,e){const t=document.createElement("p");t.className="stat-window-empty",t.textContent=e,n.body.append(t)}function Ev(n){if(!Number.isFinite(n))return"--";const e=Math.floor(Math.max(0,n)/60),t=Math.max(0,n)-e*60;return`${e}:${t.toFixed(1).padStart(4,"0")}`}function pm(n,e,t){const i=document.createElement("div");i.className="stats-window-stat-list";for(const{entry:s,definition:a}of t)i.append(Hl(n,s,a,e?a.format(a.read(e)):"--"));n.body.append(i)}function H2(n,e,t){const i=document.createElement("div");i.className="stats-window-team-list";for(const s of["blue","orange"]){const a=e.players.filter(u=>u.is_team_0===(s==="blue"));if(a.length===0)continue;const r=document.createElement("section");r.className=`stats-window-team-group ${zl(s)}`;const o=document.createElement("header");o.className="stats-window-team-header";const l=document.createElement("h3");l.textContent=`${mh(s)} team`;const c=document.createElement("span");c.textContent=`${a.length} player${a.length===1?"":"s"}`,o.append(l,c),r.append(o);const d=document.createElement("div");d.className="stats-window-entity-list";for(const u of a){const h=document.createElement("section");h.className=`stats-window-entity ${Fr(u.is_team_0)}`;const f=document.createElement("h4");f.className="stats-window-entity-title",f.textContent=u.name,h.append(f);for(const{entry:g,definition:_}of t)h.append(Hl(n,g,_,_.format(_.read(u))));d.append(h)}r.append(d),i.append(r)}n.body.append(i)}function G2(n,e,t){const i=document.createElement("div");i.className="stats-window-entity-list";for(const s of["blue","orange"]){const a=ph(e,s),r=document.createElement("section");r.className=`stats-window-entity ${zl(s)}`;const o=document.createElement("h3");o.className="stats-window-entity-title",o.textContent=mh(s),r.append(o);for(const{entry:l,definition:c}of t)r.append(Hl(n,l,c,a?c.format(c.read(a)):"--"));i.append(r)}n.body.append(i)}function V2(n,e,t){const i=document.createElement("div");i.className="stats-window-stat-list";for(const{entry:s,definition:a}of t){const r=$2(e,a,s.targetId);i.append(Hl(n,s,a,r?a.format(a.read(r)):"--"))}n.body.append(i)}function $2(n,e,t){return e.scope==="player"?n.players.find(i=>ot(i.player_id)===t)??n.players[0]??null:ph(n,t==="orange"?"orange":"blue")}function Hl(n,e,t,i){const s=document.createElement("div");s.className="stats-window-stat-row";const a=document.createElement("span");if(a.className="stats-window-stat-name",a.textContent=t.label,n.kind==="ad-hoc"){const l=document.createElement("select");l.className="stats-window-stat-target";const c=R2(t,e.targetId);c&&l.classList.add(c),t.scope==="player"?bv(l,e.targetId):l.append(new Option("Blue","blue",e.targetId==="blue",e.targetId==="blue"),new Option("Orange","orange",e.targetId==="orange",e.targetId==="orange")),l.value=e.targetId??"",l.addEventListener("change",()=>{const d=l.value;if(n.entries.some(h=>h!==e&&h.statId===e.statId&&h.targetId===d)){ni(n);return}const u=n.entries.findIndex(h=>h.key===e.key);u>=0&&(n.entries[u]={key:`${n.id}:${e.statId}:${d}`,statId:e.statId,targetId:d}),ni(n),je()}),a.append(" ",l)}const r=document.createElement("span");r.className="stats-window-stat-value",r.textContent=i;const o=document.createElement("button");return o.type="button",o.className="stats-window-stat-remove",o.textContent="x",o.addEventListener("click",()=>{k2(n,e.key),ni(n),je()}),s.append(a,r,o),s}function En(n,e="",t=0){return n===void 0||Number.isNaN(n)?"--":`${n.toFixed(t)}${e}`}function Mv(){return{fov:110,height:100,pitch:-4,distance:270,stiffness:0,swivelSpeed:1,transitionSpeed:1}}function W2(n){return!ne||n===null?null:ne.replay.players.find(e=>e.id===n)?.cameraSettings??null}function Tv(n){return{...Mv(),...W2(n.attachedPlayerId)??{},...n.customCameraSettings??{}}}function mm(){return{fov:Number(wr.value),height:Number(Er.value),pitch:Number(Mr.value),distance:Number(Tr.value),stiffness:Number(Ar.value),swivelSpeed:Number(Cr.value),transitionSpeed:Number(Rr.value)}}function X2(n){ml.hidden=!Di.checked,wr.disabled=!n,Er.disabled=!n,Mr.disabled=!n,Tr.disabled=!n,Ar.disabled=!n,Cr.disabled=!n,Rr.disabled=!n}function Av(n){const e=Mv(),t=n.fov??e.fov,i=n.height??e.height,s=n.pitch??e.pitch,a=n.distance??e.distance,r=n.stiffness??e.stiffness,o=n.swivelSpeed??e.swivelSpeed,l=n.transitionSpeed??e.transitionSpeed;wr.value=`${t}`,Er.value=`${i}`,Mr.value=`${s}`,Tr.value=`${a}`,Ar.value=`${r}`,Cr.value=`${o}`,Rr.value=`${l}`,B_.textContent=En(t,"",0),z_.textContent=En(i,"",0),H_.textContent=En(s,"",0),G_.textContent=En(a,"",0),V_.textContent=En(r,"",2),$_.textContent=En(o,"",1),W_.textContent=En(l,"",2)}function gm(n){pl.disabled=!n,_s.disabled=!n,zi.disabled=!n,An.disabled=!n,$n.disabled=!n,gh(n?ne?.getState():void 0)}function q2(n){switch(n){case"free":return vu;case"follow":return yu}}function gh(n){const e=n?.cameraViewMode??"free",t=ne!==null&&n!==void 0,i=(n?.attachedPlayerId??null)!==null;for(const s of UP){const a=q2(s);a.disabled=!t||s==="follow"&&!i;const r=s===e;a.dataset.active=r?"true":"false",a.setAttribute("aria-pressed",r?"true":"false")}ir.disabled=!t,sr.disabled=!t,ir.dataset.active="false",sr.dataset.active="false",ir.setAttribute("aria-pressed","false"),sr.setAttribute("aria-pressed","false")}function Pu(n){gh(n);const e=ne!==null&&n?.cameraViewMode==="follow"&&(n.attachedPlayerId??null)!==null;ar.disabled=!e,Di.disabled=!e,X2(e&&n?.customCameraSettings!==null),rr.disabled=!e}function Y2(n){zi.replaceChildren(),zi.append(new Option("Free camera",""));for(const e of n)zi.append(new Option(`${e.name} (${e.isTeamZero?"Blue":"Orange"})`,e.id))}function Z2(n){if(n<=0)return"--";const e=["B","KB","MB","GB"];let t=n,i=0;for(;t>=1024&&i<e.length-1;)t/=1024,i+=1;const s=i===0?0:t>=10?1:2;return`${t.toFixed(s)} ${e[i]}`}function K2(n){if(!n)return"No replay";if(n.error)return n.error;switch(n.state){case"idle":return"Idle";case"recording":return"Recording";case"stopping":return"Stopping";case"ready":return"Ready";case"error":return"Error"}}function _m(){const n=Number(va.value),e=Number(ya.value);return{fps:Number.isFinite(n)?Math.max(1,Math.min(120,Math.trunc(n))):60,playbackRate:Number.isFinite(e)?Math.max(.1,e):1}}function Fn(n=Gt?.getStatus()??null){const e=Gt!==null&&ne!==null,t=n?.state??"idle",i=t==="recording"||t==="stopping",s=(Gt?.getRecording()??null)!==null;J_.textContent=K2(n),Q_.textContent=`${(n?.elapsedSeconds??0).toFixed(1)}s`,ev.textContent=Z2(n?.sizeBytes??0),tv.textContent=n?.mimeType||"WebM",Su.disabled=!e||i,wu.disabled=!e||i,Eu.disabled=!e||!i,Mu.disabled=!s||i,Tu.disabled=!s||i,va.disabled=i,ya.disabled=i}function j2(){const e=(_l?.replace(/\.replay$/i,"")||"replay").replace(/[^a-zA-Z0-9._-]+/g,"-").replace(/^-+|-+$/g,""),t=new Date().toISOString().replace(/[:.]/g,"-");return`${e||"replay"}-${t}.webm`}function J2(n){const e=URL.createObjectURL(n),t=document.createElement("a");t.href=e,t.download=j2(),document.body.append(t),t.click(),t.remove(),window.setTimeout(()=>URL.revokeObjectURL(e),0)}function Cv(n){const e=n?.attachedPlayerId??null;if(!ne||n?.cameraViewMode!=="follow"||e===null){Ho.textContent="Free camera",Go.textContent="--",Vo.textContent="--",$o.textContent="--",Wo.textContent="--",Xo.textContent="--";return}const t=ne.replay.players.find(s=>s.id===e);if(!t){Ho.textContent="Unknown",Go.textContent="--",Vo.textContent="--",$o.textContent="--",Wo.textContent="--",Xo.textContent="--";return}const i=Tv(n);Ho.textContent=n.customCameraSettings===null?t.name:`${t.name} custom`,Go.textContent=En(i.fov,"",0),Vo.textContent=En(i.height,"",0),$o.textContent=En(i.pitch,"",0),Wo.textContent=En(i.distance,"",0),Xo.textContent=En(i.stiffness,"",2)}function vm(n){M2(n)||(X_.textContent=`${n.currentTime.toFixed(2)}s`,q_.textContent=`${n.frameIndex}`,Y_.textContent=`${n.duration.toFixed(2)}s`,Z_.textContent=n.playing?"Playing":"Paused",pl.textContent=n.playing?"Pause":"Play",_s.value=`${n.speed}`,ar.value=`${n.cameraDistanceScale}`,k_.textContent=`${n.cameraDistanceScale.toFixed(2)}x`,Di.checked=n.customCameraSettings!==null,ml.hidden=!Di.checked,Av(Tv(n)),rr.checked=n.ballCamEnabled,zi.value=n.attachedPlayerId??"",An.checked=n.skipPostGoalTransitionsEnabled,$n.checked=n.skipKickoffsEnabled,hl.hidden=!0,Pu(n),Cv(n),Or(n.frameIndex,{preserveOpenPickers:!0}),Pr(n))}function Q2(n){return Ul.includePickup(n)}function eL(n){return{name:n.name,preparingStatus:"Preparing replay...",async readBytes(){return new Uint8Array(await n.arrayBuffer())}}}function tL(n,e){return{name:n.name,preparingStatus:"Fetching replay...",async readBytes(){const t=await fetch(n.url,{...n.fetchInit,signal:e});if(!t.ok){const i=t.statusText?` ${t.statusText}`:"",s=n.kind==="ballchasing"&&[401,403,404].includes(t.status)?". The replay may be private, unavailable, or not downloadable without a Ballchasing session":"";throw new Error(`Failed to fetch replay from ${n.url.href} (${t.status}${i})${s}`)}return new Uint8Array(await t.arrayBuffer())}}}async function Rv(n){await _h(n,Promise.resolve().then(()=>nL(n,e=>{nn.textContent=Ma(e),pi?.update(e)})))}async function nL(n,e){const t=await n.readBytes();return Ll(t,{reportEveryNFrames:100,onProgress:e})}async function _h(n,e){nn.textContent=n.preparingStatus,oa.disabled=!0,pi?.show(n.name,n.preparingStatus),gm(!1),Pu(),hl.hidden=!1,ea&&(ea(),ea=null),uh(),ne?.destroy(),ne=null,Gt=null,_l=null,mn=null,rn=null,Ss=null,vs=xr(null),Fl(),Ol(),sv(),Wi=null,Xi=null,vi(),em(),xa(),bi(),Fn();try{nn.textContent="Parsing replay...",pi?.show(n.name,"Parsing replay...");const t=await e,{replay:i}=t;rn=t.statsTimeline,Ss=gC(rn),vs=xr(rn.frames[0]??null),mn=u1({replayEventsLabel:"Replay",replayEvents:r=>Ng(r.replay,vn)});const s=ZT({onStatusChange:Fn});Gt=s;const a=Pi;if(ne=new lT(L_,i,{initialPlaybackRate:a?.playback.rate,initialCameraDistanceScale:a?.camera.distanceScale??T_,initialCustomCameraSettings:a?.camera.customSettings??null,initialAttachedPlayerId:a?.camera.attachedPlayerId??null,initialCameraViewMode:a?.camera.mode,initialBallCamEnabled:a?.camera.ballCam??!1,initialBoostPickupAnimationEnabled:a?.overlays.boostPickupAnimation??!1,initialSkipPostGoalTransitionsEnabled:An.checked,initialSkipKickoffsEnabled:$n.checked,plugins:[yT(),$T({includePickup:Q2}),s,mn]}),hh(),ba(),ea=ne.subscribe(vm),a){la=!0;try{n2(a)}finally{la=!1}}Y2(i.players),hl.hidden=!0,nn.textContent=`Loaded ${n.name}`,_l=n.name,K_.textContent=i.players.map(r=>r.name).join(", "),j_.textContent=`${i.frameCount}`,vi(),em(),Wi=null,Xi=null,xa(),gm(!0),Pu(ne.getState()),vm(ne.getState()),Or(ne.getState().frameIndex),Pr(ne.getState(),{forceScroll:!0}),bi(),Fn(),pi?.hide()}catch(t){throw pi?.hide(),ne?.destroy(),ne=null,Gt=null,Fn(),t}finally{oa.disabled=!1}}function iL(n){let e;try{e=x_(window.location.search,window.location.href)}catch(t){console.error("Invalid replay URL:",t),nn.textContent=t instanceof Error?t.message:"Invalid replay URL";return}e&&Rv(tL(e,n)).catch(t=>{n.aborted||(console.error("Failed to load replay URL:",t),nn.textContent=t instanceof Error?t.message:"Failed to load replay URL")})}function sL(n,e={}){To?.(),n.innerHTML=h1(T_),Bi=n,pi=_1(n),oa=re(n,"#replay-file"),L_=re(n,"#viewport"),hl=re(n,"#empty-state"),qp=re(n,"#empty-load-replay"),fl=re(n,"#launcher-toggle"),ou=re(n,"#launcher-menu"),Yp=re(n,"#load-replay-action"),Zp=re(n,"#floating-window-layer"),Ri=re(n,"#mechanics-timeline-window-body"),ta=re(n,"#event-playlist-window-body"),Mo=re(n,"#mechanics-review-file"),Zc=re(n,"#mechanics-review-url"),Kp=re(n,"#mechanics-review-load-url"),lu=re(n,"#mechanics-review-status"),N_=re(n,"#mechanics-review-index"),I_=re(n,"#mechanics-review-title"),D_=re(n,"#mechanics-review-mechanic"),U_=re(n,"#mechanics-review-player"),F_=re(n,"#mechanics-review-reason"),cu=re(n,"#mechanics-review-prev"),du=re(n,"#mechanics-review-replay"),uu=re(n,"#mechanics-review-next"),hu=re(n,"#mechanics-review-confirm"),fu=re(n,"#mechanics-review-reject"),pu=re(n,"#mechanics-review-uncertain"),mu=re(n,"#mechanics-review-replay-load-summary"),qa=re(n,"#mechanics-review-replay-loads"),O_=re(n,"#mechanics-review-count"),Ya=re(n,"#mechanics-review-list"),gu=re(n,"#boost-pickup-filters-window-body"),zo=re(n,"#touch-controls-window-body"),_u=re(n,"#stats-window-layer"),pl=re(n,"#toggle-playback"),_s=re(n,"#playback-rate"),zi=re(n,"#attached-player"),vu=re(n,"#camera-view-free"),yu=re(n,"#camera-view-follow"),ir=re(n,"#camera-view-overhead"),sr=re(n,"#camera-view-side"),ar=re(n,"#camera-distance"),k_=re(n,"#camera-distance-readout"),Di=re(n,"#custom-camera-settings"),ml=re(n,"#camera-settings-controls"),wr=re(n,"#custom-camera-fov"),Er=re(n,"#custom-camera-height"),Mr=re(n,"#custom-camera-pitch"),Tr=re(n,"#custom-camera-distance"),Ar=re(n,"#custom-camera-stiffness"),Cr=re(n,"#custom-camera-swivel-speed"),Rr=re(n,"#custom-camera-transition-speed"),B_=re(n,"#custom-camera-fov-readout"),z_=re(n,"#custom-camera-height-readout"),H_=re(n,"#custom-camera-pitch-readout"),G_=re(n,"#custom-camera-distance-readout"),V_=re(n,"#custom-camera-stiffness-readout"),$_=re(n,"#custom-camera-swivel-speed-readout"),W_=re(n,"#custom-camera-transition-speed-readout"),rr=re(n,"#ball-cam"),bu=re(n,"#module-summary"),Za=re(n,"#module-settings"),X_=re(n,"#time-readout"),q_=re(n,"#frame-readout"),Y_=re(n,"#duration-readout"),Z_=re(n,"#playback-status-readout"),nn=re(n,"#status-readout"),K_=re(n,"#players-readout"),j_=re(n,"#frames-readout"),xu=re(n,"#events-readout"),Ho=re(n,"#camera-profile-readout"),Go=re(n,"#camera-fov-readout"),Vo=re(n,"#camera-height-readout"),$o=re(n,"#camera-pitch-readout"),Wo=re(n,"#camera-base-distance-readout"),Xo=re(n,"#camera-stiffness-readout"),An=re(n,"#skip-post-goal-transitions"),$n=re(n,"#skip-kickoffs"),va=re(n,"#recording-fps"),ya=re(n,"#recording-playback-rate"),Su=re(n,"#recording-start"),wu=re(n,"#recording-full-replay"),Eu=re(n,"#recording-stop"),Mu=re(n,"#recording-download"),Tu=re(n,"#recording-clear"),J_=re(n,"#recording-status"),Q_=re(n,"#recording-elapsed"),ev=re(n,"#recording-size"),tv=re(n,"#recording-type");const t=S_(window.location),i=SP(window.location);let s=null;if(e.initialConfig!==void 0)Pi=e.initialConfig;else{try{Pi=xP(window.location)}catch(l){s=l,console.error("Invalid stats player config:",l),nn.textContent=l instanceof Error?l.message:"Invalid stats player config",Pi=null}i&&jP(t,Pi,s)}const a=new AbortController;Qp(Zp,a.signal),Qp(_u,a.signal);const r=()=>{a.abort(),ea?.(),ea=null,uh(),ne?.destroy(),ne=null,Gt=null,mn=null,rn=null,Ss=null,vs=xr(null),ws.clear(),Fl(),Ol(),sv(),gi=[],pi?.destroy(),pi=null,vn=new Set,Aa=new Set,pn=new Set,Ca=new Set,Wi=null,vl=!0,Xi=null,Wt=null,qo=!1,_i=!0,_l=null,Zn=null,Pi=null,ms!==null&&(window.clearTimeout(ms),ms=null),la=!1,or=1,gl=30,dl=null,Bi===n&&(Bi=null,n.replaceChildren()),To===r&&(To=null)};if(To=r,Pi){la=!0;try{QP(Pi)}finally{la=!1}}fl.addEventListener("click",()=>{lr(ou.hidden)},{signal:a.signal}),n.addEventListener("click",l=>{l.target instanceof Element&&(l.target.closest(".top-chrome")||lr(!1))},{signal:a.signal}),Yp.addEventListener("click",Jp,{signal:a.signal}),qp.addEventListener("click",Jp,{signal:a.signal}),n.querySelectorAll("[data-window-toggle]").forEach(l=>{l.addEventListener("click",()=>{const c=l.dataset.windowToggle;c&&(s2(c),lr(!1))},{signal:a.signal})}),n.querySelectorAll("[data-window-hide]").forEach(l=>{l.addEventListener("click",()=>{const c=l.dataset.windowHide??GP(l);c&&a2(c)},{signal:a.signal})}),n.querySelectorAll("[data-create-stats-window]").forEach(l=>{l.addEventListener("click",()=>{wv(l.dataset.createStatsWindow)},{signal:a.signal})}),oa.addEventListener("change",async()=>{const l=oa.files?.[0];if(l)try{Wt&&(Wt.currentClip=null,Wt.currentReplayId=null,Sa()),await Rv(eL(l))}catch(c){console.error("Failed to load replay:",c),nn.textContent=c instanceof Error?c.message:"Failed to load replay"}},{signal:a.signal}),Mo.addEventListener("change",async()=>{const l=Mo.files?.[0];if(l)try{const c=cv(await l.text());await vv(c,null)}catch(c){console.error("Failed to load mechanics review playlist:",c),_n(c instanceof Error?c.message:"Failed to load mechanics review playlist")}finally{Mo.value=""}},{signal:a.signal}),Kp.addEventListener("click",()=>{om(Zc.value.trim()).catch(l=>{console.error("Failed to load mechanics review playlist URL:",l),_n(l instanceof Error?l.message:"Failed to load mechanics review playlist URL")})},{signal:a.signal}),cu.addEventListener("click",()=>{const l=Wt;l&&yl(Math.max(0,l.currentIndex-1))},{signal:a.signal}),du.addEventListener("click",E2,{signal:a.signal}),uu.addEventListener("click",()=>{const l=Wt;l&&yl(Math.min(l.manifest.items.length-1,l.currentIndex+1))},{signal:a.signal}),hu.addEventListener("click",()=>{Kc("confirmed")},{signal:a.signal}),fu.addEventListener("click",()=>{Kc("rejected")},{signal:a.signal}),pu.addEventListener("click",()=>{Kc("uncertain")},{signal:a.signal}),pl.addEventListener("click",()=>{ne?.togglePlayback(),je()},{signal:a.signal}),_s.addEventListener("change",()=>{ne?.setPlaybackRate(Number(_s.value)),je()},{signal:a.signal}),Su.addEventListener("click",()=>{if(Gt)try{const{fps:l}=_m();Gt.start({fps:l}),Fn()}catch(l){console.error("Failed to start recording:",l),nn.textContent=l instanceof Error?l.message:"Failed to start recording",Fn(Gt.getStatus())}},{signal:a.signal}),wu.addEventListener("click",()=>{if(!Gt)return;const{fps:l,playbackRate:c}=_m();Gt.recordFullReplay({fps:l,playbackRate:c,restorePlaybackState:!0}).catch(d=>{console.error("Failed to record replay:",d),nn.textContent=d instanceof Error?d.message:"Failed to record replay",Fn(Gt?.getStatus()??null)}),Fn()},{signal:a.signal}),Eu.addEventListener("click",()=>{Gt?.stop().catch(l=>{console.error("Failed to stop recording:",l),nn.textContent=l instanceof Error?l.message:"Failed to stop recording"}),Fn()},{signal:a.signal}),Mu.addEventListener("click",()=>{const l=Gt?.getRecording();l&&J2(l)},{signal:a.signal}),Tu.addEventListener("click",()=>{try{Gt?.clear(),Fn()}catch(l){console.error("Failed to clear recording:",l)}},{signal:a.signal}),va.addEventListener("change",je,{signal:a.signal}),ya.addEventListener("change",je,{signal:a.signal}),ar.addEventListener("input",()=>{ne?.setCameraDistanceScale(Number(ar.value)),je()},{signal:a.signal}),Di.addEventListener("change",()=>{ml.hidden=!Di.checked,ne?.setCustomCameraSettings(Di.checked?mm():null),je()},{signal:a.signal});for(const l of[wr,Er,Mr,Tr,Ar,Cr,Rr])l.addEventListener("input",()=>{const c=mm();Av(c),ne?.setCustomCameraSettings(c),je()},{signal:a.signal});zi.addEventListener("change",()=>{ne?.setAttachedPlayer(zi.value||null),Zn=null,je()},{signal:a.signal}),vu.addEventListener("click",()=>{ne?.setCameraViewMode("free"),Zn=null,je()},{signal:a.signal}),yu.addEventListener("click",()=>{ne?.setCameraViewMode("follow"),Zn=null,je()},{signal:a.signal}),ir.addEventListener("click",()=>{ne?.setFreeCameraPreset("overhead"),Zn="overhead",je()},{signal:a.signal}),sr.addEventListener("click",()=>{ne?.setFreeCameraPreset("side"),Zn="side",je()},{signal:a.signal}),rr.addEventListener("change",()=>{ne?.setBallCamEnabled(rr.checked),je()},{signal:a.signal}),An.addEventListener("change",()=>{ne?.setSkipPostGoalTransitionsEnabled(An.checked),je()},{signal:a.signal}),$n.addEventListener("change",()=>{ne?.setSkipKickoffsEnabled($n.checked),je()},{signal:a.signal}),qi(),bi(),Cv(),gh(),Fn(),vi(),Sa(),xa(),e.initialBundle?_h({name:e.initialReplayName??"replay",preparingStatus:"Preparing replay...",async readBytes(){throw new Error("Replay bytes are not available for this preloaded replay")}},Promise.resolve(e.initialBundle)).catch(l=>{a.signal.aborted||(console.error("Failed to load preprocessed replay bundle:",l),nn.textContent=l instanceof Error?l.message:"Failed to load preprocessed replay bundle")}):e.loadFromLocation!==!1&&iL(a.signal);const o=m2();return o&&(Zc.value=o,i2("mechanics-review"),om(o).catch(l=>{a.signal.aborted||(console.error("Failed to load mechanics review playlist from URL:",l),_n(l instanceof Error?l.message:"Failed to load mechanics review playlist from URL"))})),{root:n,destroy:r}}const sn=["#58a6ff","#f39a37"],ym=["#58a6ff","#f39a37","#65d6ad","#d2a8ff","#ff7b72","#f2cc60","#79c0ff","#ffa657"],Ga={zero:"#ff7b72",low:"#f39a37",midLow:"#f2cc60",midHigh:"#65d6ad",high:"#58a6ff"},bm={big:"#f39a37",small:"#65d6ad"};let Zo=null,Lr={};const Pv=[{id:"overview",label:"Overview"},{id:"goals",label:"Goals"},{id:"boost",label:"Boost"},{id:"territory",label:"Possession & territory"},{id:"involvement",label:"Player involvement"},{id:"dump",label:"All stats"}],aL=[{statId:"player:core.score",kind:"bar",title:"Score by player"},{statId:"player:core.shots",kind:"bar",title:"Shots by player"},{statId:"player:touch.touch_count",kind:"bar",title:"Touches by player"},{statId:"team:core.shots",kind:"pie",title:"Shot share"},{statId:"team:possession.possession_time",kind:"pie",title:"Possession share"},{statId:"team:pressure.offensive_pressure_time",kind:"bar",title:"Offensive pressure"}],rL=[{statId:"player:touch.touch_count",kind:"bar",title:"Touches"},{statId:"player:touch.control_touch_count",kind:"bar",title:"Control touches"},{statId:"player:touch.hard_hit_count",kind:"bar",title:"Hard hits"},{statId:"player:demo.demos_inflicted",kind:"bar",title:"Demos inflicted"},{statId:"player:fifty_fifty.wins",kind:"bar",title:"50/50 wins"},{statId:"player:powerslide.total_duration",kind:"bar",title:"Powerslide time"}];function X(n,e={}){const t=document.createElement(n);return e.className&&(t.className=e.className),e.id&&(t.id=e.id),e.text!==void 0&&(t.textContent=e.text),t}function Lv(n,e,t){return e==="player"?n.name||`Player ${t+1}`:t===0?"Blue":"Orange"}function bl(n){return n?ot(n):null}function hs(n,e){const t=bl(e);return t?n.players.find(i=>bl(i.player_id)===t)?.name??t:"--"}function Lu(n){return n===!0?"Blue":n===!1?"Orange":"--"}function Nv(n,e){return e==="player"?n.players:[n.team_zero,n.team_one]}function Iv(n){return n.is_team_0?sn[0]:sn[1]}function oL(n,e,t){return e==="player"?Iv(n):sn[t%sn.length]}function lL(n){return n.frames.at(-1)??null}function cL(n,e){const t=n.read(e);return typeof t=="number"&&Number.isFinite(t)?t:null}function Ra(n){return n==null||!Number.isFinite(n)?"--":`${Number(n.toFixed(1))}s`}function dL(n){return n==null||!Number.isFinite(n)?"--":`${Number(n.toFixed(1))}%`}function jn(n,e){return e>0?`${Ra(n)} (${dL(n/e*100)})`:"--"}function Ko(n){return n?`x ${Math.round(n.x)}, y ${Math.round(n.y)}, z ${Math.round(n.z)}`:"--"}function Hn(n){return n==null||!Number.isFinite(n)?"--":`${Number(As(n).toFixed(0))}`}function da(n){if(n==null||!Number.isFinite(n))return"--";const e=Math.max(0,n),t=Math.floor(e/60),i=e-t*60;return`${t}:${i.toFixed(1).padStart(4,"0")}`}function uL(n,e,t){if(!n||e==null||!Number.isFinite(e))return null;const i=bl(t),s=new URL("../",window.location.href);return s.searchParams.set("replayUrl",n.href),w_(s,Dv(e,i)).href}function hL(n,e,t){if(e==null||!Number.isFinite(e))return null;const i=bl(t);return{config:Dv(e,i),href:uL(n,e,t),goalTime:e,playerId:i}}function Dv(n,e){return{version:ll,playback:{currentTime:Math.max(0,n-4),playing:!0,rate:1,skipPostGoalTransitions:!1,skipKickoffs:!1},camera:e?{mode:"follow",attachedPlayerId:e,ballCam:!0}:{mode:"free"},overlays:{timelineEvents:["core"],timelineRanges:[],mechanics:[],renderEffects:[],followedPlayerHud:!1,boostPads:!0,boostPickupAnimation:!1},recording:{},singletonWindows:[],statsWindows:[],moduleConfigs:{}}}function Uv(n,e){return e>0?`${Number((As(n)/e*60).toFixed(1))}/min`:"--"}function fL(n){const e=new Map;for(const t of n){const i=`${t.scope}:${t.category}`,s=e.get(i);s?s.push(t):e.set(i,[t])}return new Map([...e].sort(([t],[i])=>t.localeCompare(i)))}function Fv(n){const[e,t]=n.split(":"),i=(t??"").replace(/_/g," ").replace(/\b\w/g,s=>s.toUpperCase());return`${e==="player"?"Player":"Team"} ${i}`}function Ov(n){return`stats-${n.replace(/[^a-z0-9]+/gi,"-").toLowerCase()}`}function pL(n){return n.path.slice(1).join(".")||n.label}function mL(n){return!n.path.includes("entries")}function on(n,e,t){const i=X("section",{className:"stats-report-summary-card"});return i.append(X("span",{text:n}),X("strong",{text:e})),t&&i.append(X("small",{text:t})),i}function gL(n,e){const t=X("section",{className:"stats-report-summary"}),i=e.time>0?Ra(e.time):"--";return t.append(on("Replay",n.fileName),on("Frames",n.statsTimeline.frames.length.toLocaleString()),on("Duration",i),on("Players",e.players.length.toLocaleString())),t}function Pa(n,e){const t=X("section",{className:"stats-report-page-intro"});return t.append(X("h2",{text:n}),X("p",{text:e})),t}function _L(n,e,t){const i=e[0]?.scope??"player",s=Nv(t,i),a=X("section",{className:"stats-report-section",id:Ov(n)}),r=X("header");r.append(X("h2",{text:Fv(n)}),X("span",{text:`${e.length} stats`}));const o=X("div",{className:"stats-report-table-wrap"}),l=X("table",{className:"stats-report-table"}),c=X("thead"),d=X("tr");d.append(X("th",{text:"Statistic"})),s.forEach((h,f)=>{d.append(X("th",{text:Lv(h,i,f)}))}),c.append(d);const u=X("tbody");return e.forEach(h=>{const f=X("tr");f.append(X("td",{text:pL(h)})),s.forEach(g=>{f.append(X("td",{text:h.format(h.read(g))}))}),u.append(f)}),l.append(c,u),o.append(l),a.append(r,o),a}function vh(n,e){return Nv(e,n.scope).map((t,i)=>({label:Lv(t,n.scope,i),value:cL(n,t)??0,color:oL(t,n.scope,i)})).filter(t=>t.value>0)}function xl(n,e){const t=Math.max(...n.map(s=>s.value),1),i=X("div",{className:"stats-report-bar-chart"});return n.forEach(s=>{const a=X("div",{className:"stats-report-bar-row"});a.style.setProperty("--bar-color",s.color),a.style.setProperty("--bar-width",`${Math.max(2,s.value/t*100)}%`),a.append(X("span",{className:"stats-report-bar-label",text:s.label}),X("span",{className:"stats-report-bar-track"}),X("strong",{text:s.formatted??e(s.value)})),i.append(a)}),i}function kv(n,e){const t=n.path.join(".");return n.category==="boost"&&(t.includes("amount_")||t.includes("overfill")||t.includes("boost_integral"))?Hn(e):t.endsWith("_time")||t.startsWith("time_")||t.includes(".time_")||t.endsWith("_duration")||t==="active_game_time"||t==="tracked_time"?Ra(e):n.format(e)}function vL(n,e){return xl(vh(n,e),t=>kv(n,t))}function yL(n){const e=n.reduce((i,s)=>i+s.value,0);if(e<=0)return"conic-gradient(rgba(255,255,255,0.12) 0 360deg)";let t=0;return`conic-gradient(${n.map(i=>{const s=t;return t+=i.value/e*360,`${i.color} ${s}deg ${t}deg`}).join(", ")})`}function yh(n,e){const t=n.reduce((r,o)=>r+o.value,0),i=X("div",{className:"stats-report-pie-chart"}),s=X("div",{className:"stats-report-pie"});s.style.background=yL(n);const a=X("div",{className:"stats-report-pie-legend"});return n.forEach(r=>{const o=X("div");o.style.setProperty("--legend-color",r.color);const l=t>0?`${Math.round(r.value/t*100)}%`:"--";o.append(X("span",{text:r.label}),X("strong",{text:`${r.formatted??e(r.value)} (${l})`})),a.append(o)}),i.append(s,a),i}function bL(n,e){return yh(vh(n,e),t=>kv(n,t))}function Bv(n,e="Territory share"){return Cn(e,yh([{label:"Blue half",value:n.team_zero.pressure.defensive_half_time,color:sn[0]},{label:"Neutral",value:n.team_zero.pressure.neutral_time,color:"#65d6ad"},{label:"Orange half",value:n.team_zero.pressure.offensive_half_time,color:sn[1]}],Ra))}function Cn(n,e,t){const i=X("section",{className:"stats-report-chart-card"});return i.append(X("h3",{text:n})),i.append(e),i}function zv(n,e,t){return vh(e,t).length===0?null:Cn(n.title,n.kind==="pie"?bL(e,t):vL(e,t))}function Hv(n,e,t){const i=new Map(n.map(a=>[a.id,a])),s=X("section",{className:"stats-report-charts"});return t.forEach(a=>{const r=i.get(a.statId);if(!r)return;const o=zv(a,r,e);o&&s.append(o)}),s.childElementCount>0?s:null}function wa(n,e){const t=X("div",{className:"stats-report-stacked-chart"});return n.forEach(i=>{const s=i.segments.reduce((l,c)=>l+Math.max(0,c.value),0),a=X("div",{className:"stats-report-stacked-row"}),r=X("div",{className:"stats-report-stacked-track"});i.segments.forEach(l=>{const c=X("span");c.style.setProperty("--segment-color",l.color),c.style.setProperty("--segment-width",`${s>0?Math.max(1.5,l.value/s*100):0}%`),c.title=`${l.label}: ${e(l.value,s)}`,r.append(c)});const o=X("div",{className:"stats-report-stacked-legend"});i.segments.forEach(l=>{const c=X("span",{text:`${l.label}: ${e(l.value,s)}`});c.style.setProperty("--legend-color",l.color),o.append(c)}),a.append(X("strong",{text:i.label}),r,o),t.append(a)}),t}function Gl(n){const e=X("section",{className:"stats-report-metric-grid"});return e.append(...n),e}function gs(n,e,t){const i=[...n].sort((a,r)=>e(r)-e(a))[0],s=i?e(i):0;return on(i?.name??"--",t(s))}function xL(n,e,t){const i=X("div",{className:"stats-report-page"});i.append(gL(n,e)),i.append(Pa("Featured stats","A shorter readout of stable scoreboard, touch, boost, possession, and pressure signals. The raw export remains available in All stats."));const s=`${e.team_zero.core.goals}-${e.team_one.core.goals}`;i.append(Gl([on("Final score",s,"Blue - Orange"),gs(e.players,r=>r.touch.touch_count,r=>`${r} touches`),gs(e.players,r=>r.boost.tracked_time>0?As(r.boost.boost_integral/r.boost.tracked_time):0,r=>`${Number(r.toFixed(0))} avg boost`),gs(e.players,r=>r.core.score,r=>`${r} score`)]));const a=Hv(t,e,aL)??X("section",{className:"stats-report-charts"});return a.append(Bv(e)),i.append(a),i}function SL(n){const e=new Map;for(const t of n){const i=e.get(t.goal_index)??[];i.push(t),e.set(t.goal_index,i)}for(const t of e.values())t.sort((i,s)=>i.kind.localeCompare(s.kind)||s.confidence-i.confidence);return e}function wL(n,e){const t=new Set(n.map((i,s)=>s));for(const i of e.keys())t.add(i);return[...t].sort((i,s)=>i-s)}function EL(n){const e=new Map;for(const t of n)e.set(t.kind,(e.get(t.kind)??0)+1);return[...e.entries()].sort(([t,i],[s,a])=>a-i||Bt(t).localeCompare(Bt(s))).map(([t,i],s)=>({label:Bt(t),value:i,color:ym[s%ym.length],formatted:i.toLocaleString()}))}function ML(n){const e=X("dl",{className:"stats-report-detail-list"});for(const t of n){const i=X("div",{className:"stats-report-detail-item"});i.append(X("dt",{text:t.label}),X("dd",{text:t.value})),e.append(i)}return e}function TL(n){const e=X("div",{className:"stats-report-goal-tags"});if(n.length===0)return e.append(X("span",{className:"stats-report-goal-tag stats-report-goal-tag-empty",text:"Unlabeled"})),e;for(const t of n){const i=t.modifiers.length>0?` - ${t.modifiers.map(Bt).join(", ")}`:"";e.append(X("span",{className:"stats-report-goal-tag",text:`${Bt(t.kind)} ${Math.round(t.confidence*100)}%${i}`}))}return e}function AL(n,e){const t=e.flatMap(c=>c.evidence.map(d=>({tag:c,evidence:d})));if(t.length===0)return null;const i=X("div",{className:"stats-report-goal-subsection"});i.append(X("h3",{text:"Tag evidence"}));const s=X("div",{className:"stats-report-table-wrap"}),a=X("table",{className:"stats-report-table"}),r=X("thead"),o=X("tr");["Tag","Evidence","Player","Time","Frame"].forEach(c=>{o.append(X("th",{text:c}))}),r.append(o);const l=X("tbody");for(const c of t){const d=X("tr");d.append(X("td",{text:Bt(c.tag.kind)}),X("td",{text:Bt(c.evidence.kind)}),X("td",{text:hs(n,c.evidence.player)}),X("td",{text:da(c.evidence.time)}),X("td",{text:c.evidence.frame.toLocaleString()})),l.append(d)}return a.append(r,l),s.append(a),i.append(s),i}function CL(n,e){if(e.length===0)return null;const t=X("div",{className:"stats-report-goal-subsection"});t.append(X("h3",{text:"Player context"}));const i=X("div",{className:"stats-report-table-wrap"}),s=X("table",{className:"stats-report-table"}),a=X("thead"),r=X("tr");["Player","Team","Boost","Leadup avg","Leadup min","Role","Position"].forEach(l=>{r.append(X("th",{text:l}))}),a.append(r);const o=X("tbody");for(const l of e){const c=X("tr");c.append(X("td",{text:hs(n,l.player)}),X("td",{text:Lu(l.is_team_0)}),X("td",{text:Hn(l.boost_amount)}),X("td",{text:Hn(l.average_boost_in_leadup)}),X("td",{text:Hn(l.min_boost_in_leadup)}),X("td",{text:l.is_most_back?"Most back":"--"}),X("td",{text:Ko(l.position)})),o.append(c)}return s.append(a,o),i.append(s),t.append(i),t}function RL(n,e,t,i,s){const a=s[0]??null,r=i?.scoring_team_is_team_0??a?.scoring_team_is_team_0??null,o=i?.scorer??a?.scorer??null,l=i?.time??a?.time??null,c=i?.frame??a?.frame??null,d=hL(e,l,o),u=X("section",{className:"stats-report-goal-card"});r!==null&&(u.dataset.team=r?"blue":"orange");const h=X("header"),f=X("div",{className:"stats-report-goal-heading"});if(f.append(X("h2",{text:`Goal ${t+1}`}),X("span",{text:`${Lu(r)} - ${hs(n,o)} - ${da(l)}`})),h.append(f),d){if(Lr.onWatchGoal){const p=X("button",{className:"stats-report-goal-watch",text:"Watch"});p.type="button",p.addEventListener("click",()=>{Lr.onWatchGoal?.(d)}),h.append(p)}else if(d.href){const p=X("a",{className:"stats-report-goal-watch",text:"Watch"});p.setAttribute("href",d.href),p.setAttribute("target","_blank"),p.setAttribute("rel","noreferrer"),h.append(p)}}u.append(h),u.append(TL(s));const g=[{label:"Scoring team",value:Lu(r)},{label:"Scorer",value:hs(n,o)},{label:"Time",value:da(l)},{label:"Frame",value:c==null?"--":c.toLocaleString()},{label:"Scorer last touch",value:i?.scorer_last_touch?`${hs(n,i.scorer_last_touch.player)} at ${da(i.scorer_last_touch.time)}`:"--"},{label:"Scoring most back",value:hs(n,i?.scoring_team_most_back_player)},{label:"Defending most back",value:hs(n,i?.defending_team_most_back_player)},{label:"Ball position",value:Ko(i?.ball_position)},{label:"Last touch ball",value:Ko(i?.scorer_last_touch?.ball_position)},{label:"Last touch player",value:Ko(i?.scorer_last_touch?.player_position)}];u.append(ML(g));const _=AL(n,s);_&&u.append(_);const m=CL(n,i?.players??[]);return m&&u.append(m),u}function PL(n,e){const t=X("div",{className:"stats-report-page"});t.append(Pa("Goal metadata","Goal-by-goal scorer, timing, context, tag confidence, evidence, and lead-up player state from the stats timeline event stream."));const i=[...n.statsTimeline.events.goal_context??[]].sort((h,f)=>h.time-f.time),s=[...n.statsTimeline.events.goal_tags??[]],a=SL(s),r=wL(i,a),o=[...a.values()].filter(h=>h.length>0).length,l=EL(s),c=l[0];if(t.append(Gl([on("Goals found",r.length.toLocaleString()),on("Tagged goals",o.toLocaleString()),on("Goal tags",s.length.toLocaleString()),on("Top tag",c?`${c.label} (${c.value})`:"--")])),r.length===0)return t.append(X("section",{className:"stats-report-empty",text:"No goal metadata was emitted for this replay."})),t;const d=X("section",{className:"stats-report-charts"});d.append(Cn("Goal tags by type",l.length>0?xl(l,h=>h.toLocaleString()):X("p",{className:"stats-report-note",text:"No goal tags emitted."})),Cn("Goal timing",xl(r.map(h=>{const f=i[h]??null,g=a.get(h)?.[0]??null,_=f?.time??g?.time??0,m=f?.scoring_team_is_team_0??g?.scoring_team_is_team_0??!0;return{label:`Goal ${h+1}`,value:_,color:m?sn[0]:sn[1],formatted:da(_)}}),da))),t.append(d);const u=X("div",{className:"stats-report-goal-list"});for(const h of r)u.append(RL(e,n.replayUrl,h,i[h]??null,a.get(h)??[]));return t.append(u),t}function LL(n,e){const t=X("div",{className:"stats-report-page"});t.append(Pa("Boost economy","A focused view of boost usage, collection, pad mix, starvation, and waste. Values are shown in normal 0-100 boost units.")),t.append(Gl([gs(n.players,a=>a.boost.amount_used,a=>`${Hn(a)} used`),gs(n.players,a=>a.boost.amount_stolen,a=>`${Hn(a)} stolen`),gs(n.players,a=>a.boost.overfill_total,a=>`${Hn(a)} overfill`),gs(n.players,a=>a.boost.time_zero_boost,a=>`${Ra(a)} at zero`)]));const i=X("section",{className:"stats-report-charts"});i.append(Cn("Boost used per minute",xl(n.players.map((a,r)=>({label:a.name||`Player ${r+1}`,value:a.boost.tracked_time>0?As(a.boost.amount_used)/a.boost.tracked_time*60:0,color:Iv(a),formatted:Uv(a.boost.amount_used,a.boost.tracked_time)})),a=>`${Number(a.toFixed(1))}/min`)),Cn("Pad collection mix",wa(n.players.map((a,r)=>({label:a.name||`Player ${r+1}`,segments:[{label:"Big",value:a.boost.amount_collected_big,color:bm.big},{label:"Small",value:a.boost.amount_collected_small,color:bm.small}]})),a=>Hn(a))),Cn("Boost tank time",wa(n.players.map((a,r)=>({label:a.name||`Player ${r+1}`,segments:[{label:"0",value:a.boost.time_zero_boost,color:Ga.zero},{label:"0-25",value:a.boost.time_boost_0_25,color:Ga.low},{label:"25-50",value:a.boost.time_boost_25_50,color:Ga.midLow},{label:"50-75",value:a.boost.time_boost_50_75,color:Ga.midHigh},{label:"75-100",value:a.boost.time_boost_75_100+a.boost.time_hundred_boost,color:Ga.high}]})),jn)));const s=new Map(e.map(a=>[a.id,a]));for(const a of[{statId:"player:boost.amount_used",kind:"bar",title:"Total boost used"},{statId:"player:boost.overfill_total",kind:"bar",title:"Boost overfill"},{statId:"player:boost.amount_stolen",kind:"bar",title:"Stolen boost"}]){const r=s.get(a.statId),o=r?zv(a,r,n):null;o&&i.append(o)}return t.append(i),t.append(NL(n)),t}function NL(n){const e=X("section",{className:"stats-report-section"}),t=X("header");t.append(X("h2",{text:"Boost scorecard"}),X("span",{text:"display units"}));const i=[{label:"Average boost",read(c){return c.boost.tracked_time>0?`${Number(As(c.boost.boost_integral/c.boost.tracked_time).toFixed(0))}`:"--"}},{label:"Used per minute",read(c){return Uv(c.boost.amount_used,c.boost.tracked_time)}},{label:"Collected",read(c){return Hn(c.boost.amount_collected)}},{label:"Stolen",read(c){return Hn(c.boost.amount_stolen)}},{label:"Overfill",read(c){return Hn(c.boost.overfill_total)}},{label:"Big pads",read(c){return`${c.boost.big_pads_collected}`}},{label:"Small pads",read(c){return`${c.boost.small_pads_collected}`}},{label:"Time at zero",read(c){return jn(c.boost.time_zero_boost,c.boost.tracked_time)}}],s=X("div",{className:"stats-report-table-wrap"}),a=X("table",{className:"stats-report-table"}),r=X("thead"),o=X("tr");o.append(X("th",{text:"Metric"})),n.players.forEach((c,d)=>{o.append(X("th",{text:c.name||`Player ${d+1}`}))}),r.append(o);const l=X("tbody");return i.forEach(c=>{const d=X("tr");d.append(X("td",{text:c.label})),n.players.forEach(u=>{d.append(X("td",{text:c.read(u)}))}),l.append(d)}),a.append(r,l),s.append(a),e.append(t,s),e}function IL(n){const e=X("div",{className:"stats-report-page"});e.append(Pa("Possession & territory","Team control, field-half pressure, and where each player spent time relative to the field and the ball."));const t=n.team_zero.possession.tracked_time,i=n.team_zero.pressure.tracked_time;e.append(Gl([on("Blue possession",jn(n.team_zero.possession.possession_time,t)),on("Orange possession",jn(n.team_zero.possession.opponent_possession_time,t)),on("Blue pressure",jn(n.team_zero.pressure.offensive_half_time,i),"Time in Orange half"),on("Orange pressure",jn(n.team_zero.pressure.defensive_half_time,i),"Time in Blue half")]));const s=X("section",{className:"stats-report-charts"});return s.append(Cn("Possession split",yh([{label:"Blue control",value:n.team_zero.possession.possession_time,color:sn[0]},{label:"Neutral",value:n.team_zero.possession.neutral_time,color:"#65d6ad"},{label:"Orange control",value:n.team_zero.possession.opponent_possession_time,color:sn[1]}],Ra)),Bv(n,"Field half pressure"),Cn("Player field thirds",wa(n.players.map((a,r)=>({label:a.name||`Player ${r+1}`,segments:[{label:"Def",value:a.positioning.time_defensive_third,color:a.is_team_0?sn[0]:sn[1]},{label:"Mid",value:a.positioning.time_neutral_third,color:"#65d6ad"},{label:"Off",value:a.positioning.time_offensive_third,color:a.is_team_0?sn[1]:sn[0]}]})),jn)),Cn("Role time",wa(n.players.map((a,r)=>({label:a.name||`Player ${r+1}`,segments:[{label:"Most back",value:a.positioning.time_most_back,color:"#58a6ff"},{label:"Mid",value:a.positioning.time_mid_role,color:"#65d6ad"},{label:"Most forward",value:a.positioning.time_most_forward,color:"#f39a37"},{label:"Other",value:a.positioning.time_other_role,color:"rgba(255,255,255,0.22)"}]})),jn))),e.append(s),e}function DL(n,e){const t=X("div",{className:"stats-report-page"});t.append(Pa("Player involvement","Interaction stats that are usually easier to trust at a glance: touches, hits, demos, 50/50 outcomes, movement, and powerslide usage."));const i=Hv(e,n,rL);i&&t.append(i);const s=X("section",{className:"stats-report-charts"});return s.append(Cn("Speed bands",wa(n.players.map((a,r)=>({label:a.name||`Player ${r+1}`,segments:[{label:"Slow",value:a.movement.time_slow_speed,color:"#58a6ff"},{label:"Boost",value:a.movement.time_boost_speed,color:"#f2cc60"},{label:"Supersonic",value:a.movement.time_supersonic_speed,color:"#f39a37"}]})),jn)),Cn("Aerial profile",wa(n.players.map((a,r)=>({label:a.name||`Player ${r+1}`,segments:[{label:"Ground",value:a.movement.time_on_ground,color:"#65d6ad"},{label:"Low air",value:a.movement.time_low_air,color:"#58a6ff"},{label:"High air",value:a.movement.time_high_air,color:"#d2a8ff"}]})),jn))),t.append(s),t.append(X("p",{className:"stats-report-note",text:"Experimental mechanic detectors such as musty flicks, speed flips, dodge resets, and ceiling shots are kept in All stats until their precision is stronger."})),t}function UL(n,e){const t=X("div",{className:"stats-report-page"});t.append(Pa("All stats dump","Everything emitted by the current stats timeline, including experimental mechanic counters and low-level breakdowns."));const i=X("nav",{className:"stats-report-jump-nav"});for(const a of n.keys()){const r=X("a",{text:Fv(a)});r.setAttribute("href",`#${Ov(a)}`),i.append(r)}t.append(i);const s=X("div",{className:"stats-report-grid"});for(const[a,r]of n)s.append(_L(a,r,e));return t.append(s),t}function Gv(){const n=window.location.hash.replace(/^#/,"");return Pv.some(e=>e.id===n)?n:"overview"}function FL(n,e,t){const i=X("nav",{className:"stats-report-tabs"});return Pv.forEach(s=>{const a=X("button",{text:s.label});a.type="button",a.dataset.active=s.id===n?"true":"false",a.addEventListener("click",()=>{Gv()!==s.id&&window.history.replaceState(null,"",`#${s.id}`),Sl(e,t)}),i.append(a)}),i}function bh(n){const e=X("header",{className:"stats-report-header"}),t=X("div",{className:"stats-report-title"});if(t.append(X("h1",{text:"Replay Stats"}),X("p",{text:n??"Load a Rocket League replay to review curated stats pages, comparison graphs, and the complete raw stat dump."})),Lr.showStandaloneActions!==!1){const i=X("div",{className:"stats-report-actions"}),s=X("label",{className:"stats-report-file-label",text:"Load replay"}),a=X("input");a.type="file",a.accept=".replay",a.addEventListener("change",async()=>{const o=a.files?.[0],l=Zo;o&&l instanceof HTMLElement&&await OL(l,o)}),s.append(a);const r=X("a",{className:"stats-report-link",text:"Open player"});r.setAttribute("href","../"),i.append(s,r),e.append(t,i)}else e.append(t);return e}function Sl(n,e){const t=lL(e.statsTimeline);if(!t){n.replaceChildren(X("main",{className:"stats-report-empty",text:"The replay did not produce any stats frames."}));return}const i=xr(t).filter(mL),s=fL(i),a=Gv(),r=X("main",{className:"stats-report"});r.append(bh()),r.append(FL(a,n,e)),a==="goals"?r.append(PL(e,t)):a==="boost"?r.append(LL(t,i)):a==="territory"?r.append(IL(t)):a==="involvement"?r.append(DL(t,i)):a==="dump"?r.append(UL(s,t)):r.append(xL(e,t,i)),n.replaceChildren(r)}function Nr(n,e){const t=X("main",{className:"stats-report"});t.append(bh(e)),t.append(X("p",{className:"stats-report-status",text:e})),n.replaceChildren(t)}async function Vv(n,e,t,i){Nr(n,`Loading ${t}...`);const s=await Ll(e,{onProgress(a){Nr(n,Ma(a))}});Sl(n,{fileName:t,replayUrl:i,statsTimeline:s.statsTimeline})}async function OL(n,e){try{await Vv(n,new Uint8Array(await e.arrayBuffer()),e.name,null)}catch(t){Nr(n,t instanceof Error?t.message:String(t))}}async function kL(n,e){try{Nr(n,`Fetching ${e}...`);const t=await fetch(e);if(!t.ok)throw new Error(`Failed to fetch replay: ${t.status} ${t.statusText}`);const i=new URL(e,window.location.href).pathname,s=decodeURIComponent(i.split("/").pop()||"remote replay");await Vv(n,new Uint8Array(await t.arrayBuffer()),s,t.url?new URL(t.url):new URL(e,window.location.href))}catch(t){Nr(n,t instanceof Error?t.message:String(t))}}function BL(n,e={}){if(Zo=n,Lr=e,e.initialData)Sl(n,e.initialData);else{const i=X("main",{className:"stats-report"});i.append(bh()),i.append(X("section",{className:"stats-report-empty",text:"Load a replay to generate the stats report."})),n.replaceChildren(i)}const t=new URL(window.location.href).searchParams.get("replayUrl");return!e.initialData&&t&&kL(n,t),{root:n,render(i){Sl(n,i)},destroy(){Zo===n&&(Zo=null,Lr={}),n.replaceChildren()}}}function fn(n,e={}){const t=document.createElement(n);return e.className&&(t.className=e.className),e.id&&(t.id=e.id),e.text!==void 0&&(t.textContent=e.text),t}function $v(n,e={}){let t=null;const i=async()=>n instanceof Uint8Array?n:await n(),s=a=>(t||(t=i().then(r=>Ll(r,{reportEveryNFrames:100,onProgress:a}))),t);return{replayName:e.replayName,replayUrl:e.replayUrl??null,async getStatsTimeline(a){return(await s(a)).statsTimeline},getReplayBundle:s}}function zL(n=window.location){const e=x_(n.search,n.href);return e?$v(async()=>{const t=await fetch(e.url,e.fetchInit);if(!t.ok){const i=t.statusText?` ${t.statusText}`:"";throw new Error(`Failed to fetch replay: ${t.status}${i}`)}return new Uint8Array(await t.arrayBuffer())},{replayName:e.name,replayUrl:e.url}):null}function HL(n){return n||(new URL(window.location.href).searchParams.get("mode")==="viewer"?"viewer":"report")}function GL(n){const e=new URL(window.location.href);n==="report"?e.searchParams.delete("mode"):e.searchParams.set("mode",n),window.history.replaceState(null,"",e)}function VL(n,e={}){let t=e.provider??null,i=HL(e.initialMode),s=null,a=null,r=null,o=null,l=null,c=!1;const d=fn("main",{className:"replay-review-shell"}),u=fn("div",{className:"replay-review-toolbar"}),h=fn("div",{className:"replay-review-status"}),f=fn("button",{text:"Stats"}),g=fn("button",{text:"Viewer"}),_=fn("label",{className:"replay-review-file",text:"Load replay"}),m=fn("input"),p=fn("section",{className:"replay-review-pane"}),w=fn("section",{className:"replay-review-pane"});m.type="file",m.accept=".replay",_.append(m),u.append(h,_,f,g),d.append(u,p,w),n.replaceChildren(d);const x=I=>{h.textContent=I},y=I=>{x(Ma(I))},C=()=>{s?.destroy(),s=null,a?.destroy(),a=null,r=null,o=null,l=null},M=()=>t?.getReplayBundle?(o||(o=t.getReplayBundle(y)),o):null,T=()=>t?(r||(r=t.getStatsTimeline?t.getStatsTimeline(y):M()?.then(I=>I.statsTimeline)??null),r):null,A=()=>{p.replaceChildren(fn("section",{className:"replay-review-empty",text:"Load a replay to review stats and playback."}))},v=async()=>{if(s)return;const I=T();if(!I){A(),x("No replay loaded");return}p.replaceChildren(fn("section",{className:"replay-review-empty",text:"Loading stats..."}));const O={fileName:t?.replayName??"replay",replayUrl:t?.replayUrl??null,statsTimeline:await I};c||(s=BL(p,{initialData:O,showStandaloneActions:!1,onWatchGoal(B){l=B.config,a?.destroy(),a=null,i="viewer",R()}}),x(`Loaded ${O.fileName}`))},b=async()=>{if(a)return;const I=M();if(!I){w.replaceChildren(fn("section",{className:"replay-review-empty",text:"Replay playback is not available for this data source."})),x("Viewer unavailable");return}w.replaceChildren(fn("section",{className:"replay-review-empty",text:"Loading viewer..."}));const O=await I;c||(a=sL(w,{initialBundle:O,initialConfig:l,initialReplayName:t?.replayName,loadFromLocation:!1}),l=null,x(`Loaded ${t?.replayName??"replay"}`))},R=()=>{f.dataset.active=String(i==="report"),g.dataset.active=String(i==="viewer"),p.hidden=i!=="report",w.hidden=i!=="viewer",GL(i),(i==="report"?v():b()).catch(I=>{console.error("Failed to render replay review mode:",I),x(I instanceof Error?I.message:"Failed to load replay review")})};return f.addEventListener("click",()=>{i="report",R()}),g.addEventListener("click",()=>{i="viewer",R()}),m.addEventListener("change",()=>{const I=m.files?.[0];I&&(t=$v(async()=>new Uint8Array(await I.arrayBuffer()),{replayName:I.name,replayUrl:null}),C(),R())}),R(),{root:n,setMode(I){i=I,R()},setProvider(I,O={}){t=I,O.mode&&(i=O.mode),C(),R()},destroy(){c=!0,C(),n.replaceChildren()}}}const Wv=document.querySelector("#app");if(!(Wv instanceof HTMLElement))throw new Error("Missing #app mount element");let Xv=null;try{Xv=zL(window.location)}catch(n){console.error("Invalid replay URL:",n)}VL(Wv,{provider:Xv});
