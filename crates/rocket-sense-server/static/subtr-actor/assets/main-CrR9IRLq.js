const ks={ROTATE:0,DOLLY:1,PAN:2},Ns={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},f_=0,Rd=1,p_=2,pp=1,m_=2,Jn=3,Ei=0,jt=1,et=2,yi=0,Bs=1,bi=2,Pd=3,Ld=4,g_=5,Xi=100,__=101,v_=102,y_=103,b_=104,x_=200,S_=201,w_=202,M_=203,pc=204,mc=205,E_=206,T_=207,A_=208,C_=209,R_=210,P_=211,L_=212,I_=213,N_=214,gc=0,_c=1,vc=2,Xs=3,yc=4,bc=5,xc=6,Sc=7,Vo=0,D_=1,U_=2,xi=0,F_=1,O_=2,k_=3,B_=4,z_=5,H_=6,V_=7,mp=300,qs=301,Ys=302,wc=303,Mc=304,Go=306,Ec=1e3,Zi=1001,Tc=1002,Pn=1003,G_=1004,ur=1005,On=1006,ll=1007,Ki=1008,Gn=1009,gp=1010,_p=1011,Oa=1012,Vu=1013,ts=1014,ni=1015,ir=1016,Gu=1017,Wu=1018,ka=1020,vp=35902,yp=35899,bp=1021,xp=1022,Rn=1023,Ba=1026,za=1027,Sp=1028,$u=1029,wp=1030,Xu=1031,qu=1033,Kr=33776,jr=33777,Jr=33778,Qr=33779,Ac=35840,Cc=35841,Rc=35842,Pc=35843,Lc=36196,Ic=37492,Nc=37496,Dc=37808,Uc=37809,Fc=37810,Oc=37811,kc=37812,Bc=37813,zc=37814,Hc=37815,Vc=37816,Gc=37817,Wc=37818,$c=37819,Xc=37820,qc=37821,Yc=36492,Zc=36494,Kc=36495,jc=36283,Jc=36284,Qc=36285,eu=36286,W_=3200,$_=3201,Yu=0,X_=1,gi="",Wt="srgb",Zs="srgb-linear",vo="linear",at="srgb",ds=7680,Id=519,q_=512,Y_=513,Z_=514,Mp=515,K_=516,j_=517,J_=518,Q_=519,tu=35044,Nd="300 es",kn=2e3,yo=2001;class os{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const s=i[e];if(s!==void 0){const a=s.indexOf(t);a!==-1&&s.splice(a,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let a=0,r=s.length;a<r;a++)s[a].call(this,e);e.target=null}}}const Ft=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Dd=1234567;const Ma=Math.PI/180,Ha=180/Math.PI;function Bn(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Ft[n&255]+Ft[n>>8&255]+Ft[n>>16&255]+Ft[n>>24&255]+"-"+Ft[e&255]+Ft[e>>8&255]+"-"+Ft[e>>16&15|64]+Ft[e>>24&255]+"-"+Ft[t&63|128]+Ft[t>>8&255]+"-"+Ft[t>>16&255]+Ft[t>>24&255]+Ft[i&255]+Ft[i>>8&255]+Ft[i>>16&255]+Ft[i>>24&255]).toLowerCase()}function Xe(n,e,t){return Math.max(e,Math.min(t,n))}function Zu(n,e){return(n%e+e)%e}function e0(n,e,t,i,s){return i+(n-e)*(s-i)/(t-e)}function t0(n,e,t){return n!==e?(t-n)/(e-n):0}function Ea(n,e,t){return(1-t)*n+t*e}function n0(n,e,t,i){return Ea(n,e,1-Math.exp(-t*i))}function i0(n,e=1){return e-Math.abs(Zu(n,e*2)-e)}function s0(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function a0(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function r0(n,e){return n+Math.floor(Math.random()*(e-n+1))}function o0(n,e){return n+Math.random()*(e-n)}function l0(n){return n*(.5-Math.random())}function c0(n){n!==void 0&&(Dd=n);let e=Dd+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function u0(n){return n*Ma}function d0(n){return n*Ha}function h0(n){return(n&n-1)===0&&n!==0}function f0(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function p0(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function m0(n,e,t,i,s){const a=Math.cos,r=Math.sin,o=a(t/2),l=r(t/2),c=a((e+i)/2),u=r((e+i)/2),d=a((e-i)/2),h=r((e-i)/2),f=a((i-e)/2),g=r((i-e)/2);switch(s){case"XYX":n.set(o*u,l*d,l*h,o*c);break;case"YZY":n.set(l*h,o*u,l*d,o*c);break;case"ZXZ":n.set(l*d,l*h,o*u,o*c);break;case"XZX":n.set(o*u,l*g,l*f,o*c);break;case"YXY":n.set(l*f,o*u,l*g,o*c);break;case"ZYZ":n.set(l*g,l*f,o*u,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function An(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function nt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const ht={DEG2RAD:Ma,RAD2DEG:Ha,generateUUID:Bn,clamp:Xe,euclideanModulo:Zu,mapLinear:e0,inverseLerp:t0,lerp:Ea,damp:n0,pingpong:i0,smoothstep:s0,smootherstep:a0,randInt:r0,randFloat:o0,randFloatSpread:l0,seededRandom:c0,degToRad:u0,radToDeg:d0,isPowerOfTwo:h0,ceilPowerOfTwo:f0,floorPowerOfTwo:p0,setQuaternionFromProperEuler:m0,normalize:nt,denormalize:An};class le{constructor(e=0,t=0){le.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Xe(this.x,e.x,t.x),this.y=Xe(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Xe(this.x,e,t),this.y=Xe(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Xe(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Xe(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),a=this.x-e.x,r=this.y-e.y;return this.x=a*i-r*s+e.x,this.y=a*s+r*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ti{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,a,r,o){let l=i[s+0],c=i[s+1],u=i[s+2],d=i[s+3];const h=a[r+0],f=a[r+1],g=a[r+2],_=a[r+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d;return}if(o===1){e[t+0]=h,e[t+1]=f,e[t+2]=g,e[t+3]=_;return}if(d!==_||l!==h||c!==f||u!==g){let m=1-o;const p=l*h+c*f+u*g+d*_,w=p>=0?1:-1,S=1-p*p;if(S>Number.EPSILON){const R=Math.sqrt(S),T=Math.atan2(R,p*w);m=Math.sin(m*T)/R,o=Math.sin(o*T)/R}const v=o*w;if(l=l*m+h*v,c=c*m+f*v,u=u*m+g*v,d=d*m+_*v,m===1-o){const R=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=R,c*=R,u*=R,d*=R}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,s,a,r){const o=i[s],l=i[s+1],c=i[s+2],u=i[s+3],d=a[r],h=a[r+1],f=a[r+2],g=a[r+3];return e[t]=o*g+u*d+l*f-c*h,e[t+1]=l*g+u*h+c*d-o*f,e[t+2]=c*g+u*f+o*h-l*d,e[t+3]=u*g-o*d-l*h-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,s=e._y,a=e._z,r=e._order,o=Math.cos,l=Math.sin,c=o(i/2),u=o(s/2),d=o(a/2),h=l(i/2),f=l(s/2),g=l(a/2);switch(r){case"XYZ":this._x=h*u*d+c*f*g,this._y=c*f*d-h*u*g,this._z=c*u*g+h*f*d,this._w=c*u*d-h*f*g;break;case"YXZ":this._x=h*u*d+c*f*g,this._y=c*f*d-h*u*g,this._z=c*u*g-h*f*d,this._w=c*u*d+h*f*g;break;case"ZXY":this._x=h*u*d-c*f*g,this._y=c*f*d+h*u*g,this._z=c*u*g+h*f*d,this._w=c*u*d-h*f*g;break;case"ZYX":this._x=h*u*d-c*f*g,this._y=c*f*d+h*u*g,this._z=c*u*g-h*f*d,this._w=c*u*d+h*f*g;break;case"YZX":this._x=h*u*d+c*f*g,this._y=c*f*d+h*u*g,this._z=c*u*g-h*f*d,this._w=c*u*d-h*f*g;break;case"XZY":this._x=h*u*d-c*f*g,this._y=c*f*d-h*u*g,this._z=c*u*g+h*f*d,this._w=c*u*d+h*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+r)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],a=t[8],r=t[1],o=t[5],l=t[9],c=t[2],u=t[6],d=t[10],h=i+o+d;if(h>0){const f=.5/Math.sqrt(h+1);this._w=.25/f,this._x=(u-l)*f,this._y=(a-c)*f,this._z=(r-s)*f}else if(i>o&&i>d){const f=2*Math.sqrt(1+i-o-d);this._w=(u-l)/f,this._x=.25*f,this._y=(s+r)/f,this._z=(a+c)/f}else if(o>d){const f=2*Math.sqrt(1+o-i-d);this._w=(a-c)/f,this._x=(s+r)/f,this._y=.25*f,this._z=(l+u)/f}else{const f=2*Math.sqrt(1+d-i-o);this._w=(r-s)/f,this._x=(a+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Xe(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,a=e._z,r=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+r*o+s*c-a*l,this._y=s*u+r*l+a*o-i*c,this._z=a*u+r*c+i*l-s*o,this._w=r*u-i*o-s*l-a*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,s=this._y,a=this._z,r=this._w;let o=r*e._w+i*e._x+s*e._y+a*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=r,this._x=i,this._y=s,this._z=a,this;const l=1-o*o;if(l<=Number.EPSILON){const f=1-t;return this._w=f*r+t*this._w,this._x=f*i+t*this._x,this._y=f*s+t*this._y,this._z=f*a+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,o),d=Math.sin((1-t)*u)/c,h=Math.sin(t*u)/c;return this._w=r*d+this._w*h,this._x=i*d+this._x*h,this._y=s*d+this._y*h,this._z=a*d+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),a=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),a*Math.sin(t),a*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class L{constructor(e=0,t=0,i=0){L.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ud.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ud.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,a=e.elements;return this.x=a[0]*t+a[3]*i+a[6]*s,this.y=a[1]*t+a[4]*i+a[7]*s,this.z=a[2]*t+a[5]*i+a[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,a=e.elements,r=1/(a[3]*t+a[7]*i+a[11]*s+a[15]);return this.x=(a[0]*t+a[4]*i+a[8]*s+a[12])*r,this.y=(a[1]*t+a[5]*i+a[9]*s+a[13])*r,this.z=(a[2]*t+a[6]*i+a[10]*s+a[14])*r,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,a=e.x,r=e.y,o=e.z,l=e.w,c=2*(r*s-o*i),u=2*(o*t-a*s),d=2*(a*i-r*t);return this.x=t+l*c+r*d-o*u,this.y=i+l*u+o*c-a*d,this.z=s+l*d+a*u-r*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*s,this.y=a[1]*t+a[5]*i+a[9]*s,this.z=a[2]*t+a[6]*i+a[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Xe(this.x,e.x,t.x),this.y=Xe(this.y,e.y,t.y),this.z=Xe(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Xe(this.x,e,t),this.y=Xe(this.y,e,t),this.z=Xe(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Xe(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,a=e.z,r=t.x,o=t.y,l=t.z;return this.x=s*l-a*o,this.y=a*r-i*l,this.z=i*o-s*r,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return cl.copy(this).projectOnVector(e),this.sub(cl)}reflect(e){return this.sub(cl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Xe(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const cl=new L,Ud=new Ti;class Ve{constructor(e,t,i,s,a,r,o,l,c){Ve.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,a,r,o,l,c)}set(e,t,i,s,a,r,o,l,c){const u=this.elements;return u[0]=e,u[1]=s,u[2]=o,u[3]=t,u[4]=a,u[5]=l,u[6]=i,u[7]=r,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,a=this.elements,r=i[0],o=i[3],l=i[6],c=i[1],u=i[4],d=i[7],h=i[2],f=i[5],g=i[8],_=s[0],m=s[3],p=s[6],w=s[1],S=s[4],v=s[7],R=s[2],T=s[5],E=s[8];return a[0]=r*_+o*w+l*R,a[3]=r*m+o*S+l*T,a[6]=r*p+o*v+l*E,a[1]=c*_+u*w+d*R,a[4]=c*m+u*S+d*T,a[7]=c*p+u*v+d*E,a[2]=h*_+f*w+g*R,a[5]=h*m+f*S+g*T,a[8]=h*p+f*v+g*E,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],a=e[3],r=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*r*u-t*o*c-i*a*u+i*o*l+s*a*c-s*r*l}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],a=e[3],r=e[4],o=e[5],l=e[6],c=e[7],u=e[8],d=u*r-o*c,h=o*l-u*a,f=c*a-r*l,g=t*d+i*h+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=d*_,e[1]=(s*c-u*i)*_,e[2]=(o*i-s*r)*_,e[3]=h*_,e[4]=(u*t-s*l)*_,e[5]=(s*a-o*t)*_,e[6]=f*_,e[7]=(i*l-c*t)*_,e[8]=(r*t-i*a)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,a,r,o){const l=Math.cos(a),c=Math.sin(a);return this.set(i*l,i*c,-i*(l*r+c*o)+r+e,-s*c,s*l,-s*(-c*r+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(ul.makeScale(e,t)),this}rotate(e){return this.premultiply(ul.makeRotation(-e)),this}translate(e,t){return this.premultiply(ul.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const ul=new Ve;function Ep(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function bo(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function g0(){const n=bo("canvas");return n.style.display="block",n}const Fd={};function Va(n){n in Fd||(Fd[n]=!0,console.warn(n))}function _0(n,e,t){return new Promise(function(i,s){function a(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(a,t);break;default:i()}}setTimeout(a,t)})}const Od=new Ve().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),kd=new Ve().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function v0(){const n={enabled:!0,workingColorSpace:Zs,spaces:{},convert:function(s,a,r){return this.enabled===!1||a===r||!a||!r||(this.spaces[a].transfer===at&&(s.r=ii(s.r),s.g=ii(s.g),s.b=ii(s.b)),this.spaces[a].primaries!==this.spaces[r].primaries&&(s.applyMatrix3(this.spaces[a].toXYZ),s.applyMatrix3(this.spaces[r].fromXYZ)),this.spaces[r].transfer===at&&(s.r=zs(s.r),s.g=zs(s.g),s.b=zs(s.b))),s},workingToColorSpace:function(s,a){return this.convert(s,this.workingColorSpace,a)},colorSpaceToWorking:function(s,a){return this.convert(s,a,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===gi?vo:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,a=this.workingColorSpace){return s.fromArray(this.spaces[a].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,a,r){return s.copy(this.spaces[a].toXYZ).multiply(this.spaces[r].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,a){return Va("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,a)},toWorkingColorSpace:function(s,a){return Va("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,a)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Zs]:{primaries:e,whitePoint:i,transfer:vo,toXYZ:Od,fromXYZ:kd,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Wt},outputColorSpaceConfig:{drawingBufferColorSpace:Wt}},[Wt]:{primaries:e,whitePoint:i,transfer:at,toXYZ:Od,fromXYZ:kd,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Wt}}}),n}const Qe=v0();function ii(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function zs(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let hs;class y0{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{hs===void 0&&(hs=bo("canvas")),hs.width=e.width,hs.height=e.height;const s=hs.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=hs}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=bo("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),a=s.data;for(let r=0;r<a.length;r++)a[r]=ii(a[r]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(ii(t[i]/255)*255):t[i]=ii(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let b0=0;class Ku{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:b0++}),this.uuid=Bn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let a;if(Array.isArray(s)){a=[];for(let r=0,o=s.length;r<o;r++)s[r].isDataTexture?a.push(dl(s[r].image)):a.push(dl(s[r]))}else a=dl(s);i.url=a}return t||(e.images[this.uuid]=i),i}}function dl(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?y0.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let x0=0;const hl=new L;class Xt extends os{constructor(e=Xt.DEFAULT_IMAGE,t=Xt.DEFAULT_MAPPING,i=Zi,s=Zi,a=On,r=Ki,o=Rn,l=Gn,c=Xt.DEFAULT_ANISOTROPY,u=gi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:x0++}),this.uuid=Bn(),this.name="",this.source=new Ku(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=a,this.minFilter=r,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new le(0,0),this.repeat=new le(1,1),this.center=new le(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ve,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(hl).x}get height(){return this.source.getSize(hl).y}get depth(){return this.source.getSize(hl).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==mp)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ec:e.x=e.x-Math.floor(e.x);break;case Zi:e.x=e.x<0?0:1;break;case Tc:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ec:e.y=e.y-Math.floor(e.y);break;case Zi:e.y=e.y<0?0:1;break;case Tc:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Xt.DEFAULT_IMAGE=null;Xt.DEFAULT_MAPPING=mp;Xt.DEFAULT_ANISOTROPY=1;class St{constructor(e=0,t=0,i=0,s=1){St.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,a=this.w,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s+r[12]*a,this.y=r[1]*t+r[5]*i+r[9]*s+r[13]*a,this.z=r[2]*t+r[6]*i+r[10]*s+r[14]*a,this.w=r[3]*t+r[7]*i+r[11]*s+r[15]*a,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,a;const l=e.elements,c=l[0],u=l[4],d=l[8],h=l[1],f=l[5],g=l[9],_=l[2],m=l[6],p=l[10];if(Math.abs(u-h)<.01&&Math.abs(d-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const S=(c+1)/2,v=(f+1)/2,R=(p+1)/2,T=(u+h)/4,E=(d+_)/4,A=(g+m)/4;return S>v&&S>R?S<.01?(i=0,s=.707106781,a=.707106781):(i=Math.sqrt(S),s=T/i,a=E/i):v>R?v<.01?(i=.707106781,s=0,a=.707106781):(s=Math.sqrt(v),i=T/s,a=A/s):R<.01?(i=.707106781,s=.707106781,a=0):(a=Math.sqrt(R),i=E/a,s=A/a),this.set(i,s,a,t),this}let w=Math.sqrt((m-g)*(m-g)+(d-_)*(d-_)+(h-u)*(h-u));return Math.abs(w)<.001&&(w=1),this.x=(m-g)/w,this.y=(d-_)/w,this.z=(h-u)/w,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Xe(this.x,e.x,t.x),this.y=Xe(this.y,e.y,t.y),this.z=Xe(this.z,e.z,t.z),this.w=Xe(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Xe(this.x,e,t),this.y=Xe(this.y,e,t),this.z=Xe(this.z,e,t),this.w=Xe(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Xe(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class S0 extends os{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:On,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new St(0,0,e,t),this.scissorTest=!1,this.viewport=new St(0,0,e,t);const s={width:e,height:t,depth:i.depth},a=new Xt(s);this.textures=[];const r=i.count;for(let o=0;o<r;o++)this.textures[o]=a.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){const t={minFilter:On,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,a=this.textures.length;s<a;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new Ku(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ns extends S0{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Tp extends Xt{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Pn,this.minFilter=Pn,this.wrapR=Zi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class w0 extends Xt{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Pn,this.minFilter=Pn,this.wrapR=Zi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class sr{constructor(e=new L(1/0,1/0,1/0),t=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(yn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(yn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=yn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const a=i.getAttribute("position");if(t===!0&&a!==void 0&&e.isInstancedMesh!==!0)for(let r=0,o=a.count;r<o;r++)e.isMesh===!0?e.getVertexPosition(r,yn):yn.fromBufferAttribute(a,r),yn.applyMatrix4(e.matrixWorld),this.expandByPoint(yn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),dr.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),dr.copy(i.boundingBox)),dr.applyMatrix4(e.matrixWorld),this.union(dr)}const s=e.children;for(let a=0,r=s.length;a<r;a++)this.expandByObject(s[a],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,yn),yn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(la),hr.subVectors(this.max,la),fs.subVectors(e.a,la),ps.subVectors(e.b,la),ms.subVectors(e.c,la),li.subVectors(ps,fs),ci.subVectors(ms,ps),Ui.subVectors(fs,ms);let t=[0,-li.z,li.y,0,-ci.z,ci.y,0,-Ui.z,Ui.y,li.z,0,-li.x,ci.z,0,-ci.x,Ui.z,0,-Ui.x,-li.y,li.x,0,-ci.y,ci.x,0,-Ui.y,Ui.x,0];return!fl(t,fs,ps,ms,hr)||(t=[1,0,0,0,1,0,0,0,1],!fl(t,fs,ps,ms,hr))?!1:(fr.crossVectors(li,ci),t=[fr.x,fr.y,fr.z],fl(t,fs,ps,ms,hr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,yn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(yn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Xn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Xn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Xn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Xn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Xn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Xn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Xn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Xn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Xn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Xn=[new L,new L,new L,new L,new L,new L,new L,new L],yn=new L,dr=new sr,fs=new L,ps=new L,ms=new L,li=new L,ci=new L,Ui=new L,la=new L,hr=new L,fr=new L,Fi=new L;function fl(n,e,t,i,s){for(let a=0,r=n.length-3;a<=r;a+=3){Fi.fromArray(n,a);const o=s.x*Math.abs(Fi.x)+s.y*Math.abs(Fi.y)+s.z*Math.abs(Fi.z),l=e.dot(Fi),c=t.dot(Fi),u=i.dot(Fi);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const M0=new sr,ca=new L,pl=new L;class Wo{constructor(e=new L,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):M0.setFromPoints(e).getCenter(i);let s=0;for(let a=0,r=e.length;a<r;a++)s=Math.max(s,i.distanceToSquared(e[a]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ca.subVectors(e,this.center);const t=ca.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(ca,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(pl.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ca.copy(e.center).add(pl)),this.expandByPoint(ca.copy(e.center).sub(pl))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const qn=new L,ml=new L,pr=new L,ui=new L,gl=new L,mr=new L,_l=new L;class ju{constructor(e=new L,t=new L(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,qn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=qn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(qn.copy(this.origin).addScaledVector(this.direction,t),qn.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){ml.copy(e).add(t).multiplyScalar(.5),pr.copy(t).sub(e).normalize(),ui.copy(this.origin).sub(ml);const a=e.distanceTo(t)*.5,r=-this.direction.dot(pr),o=ui.dot(this.direction),l=-ui.dot(pr),c=ui.lengthSq(),u=Math.abs(1-r*r);let d,h,f,g;if(u>0)if(d=r*l-o,h=r*o-l,g=a*u,d>=0)if(h>=-g)if(h<=g){const _=1/u;d*=_,h*=_,f=d*(d+r*h+2*o)+h*(r*d+h+2*l)+c}else h=a,d=Math.max(0,-(r*h+o)),f=-d*d+h*(h+2*l)+c;else h=-a,d=Math.max(0,-(r*h+o)),f=-d*d+h*(h+2*l)+c;else h<=-g?(d=Math.max(0,-(-r*a+o)),h=d>0?-a:Math.min(Math.max(-a,-l),a),f=-d*d+h*(h+2*l)+c):h<=g?(d=0,h=Math.min(Math.max(-a,-l),a),f=h*(h+2*l)+c):(d=Math.max(0,-(r*a+o)),h=d>0?a:Math.min(Math.max(-a,-l),a),f=-d*d+h*(h+2*l)+c);else h=r>0?-a:a,d=Math.max(0,-(r*h+o)),f=-d*d+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(ml).addScaledVector(pr,h),f}intersectSphere(e,t){qn.subVectors(e.center,this.origin);const i=qn.dot(this.direction),s=qn.dot(qn)-i*i,a=e.radius*e.radius;if(s>a)return null;const r=Math.sqrt(a-s),o=i-r,l=i+r;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,a,r,o,l;const c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return c>=0?(i=(e.min.x-h.x)*c,s=(e.max.x-h.x)*c):(i=(e.max.x-h.x)*c,s=(e.min.x-h.x)*c),u>=0?(a=(e.min.y-h.y)*u,r=(e.max.y-h.y)*u):(a=(e.max.y-h.y)*u,r=(e.min.y-h.y)*u),i>r||a>s||((a>i||isNaN(i))&&(i=a),(r<s||isNaN(s))&&(s=r),d>=0?(o=(e.min.z-h.z)*d,l=(e.max.z-h.z)*d):(o=(e.max.z-h.z)*d,l=(e.min.z-h.z)*d),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,qn)!==null}intersectTriangle(e,t,i,s,a){gl.subVectors(t,e),mr.subVectors(i,e),_l.crossVectors(gl,mr);let r=this.direction.dot(_l),o;if(r>0){if(s)return null;o=1}else if(r<0)o=-1,r=-r;else return null;ui.subVectors(this.origin,e);const l=o*this.direction.dot(mr.crossVectors(ui,mr));if(l<0)return null;const c=o*this.direction.dot(gl.cross(ui));if(c<0||l+c>r)return null;const u=-o*ui.dot(_l);return u<0?null:this.at(u/r,a)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class gt{constructor(e,t,i,s,a,r,o,l,c,u,d,h,f,g,_,m){gt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,a,r,o,l,c,u,d,h,f,g,_,m)}set(e,t,i,s,a,r,o,l,c,u,d,h,f,g,_,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=s,p[1]=a,p[5]=r,p[9]=o,p[13]=l,p[2]=c,p[6]=u,p[10]=d,p[14]=h,p[3]=f,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new gt().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,s=1/gs.setFromMatrixColumn(e,0).length(),a=1/gs.setFromMatrixColumn(e,1).length(),r=1/gs.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*a,t[5]=i[5]*a,t[6]=i[6]*a,t[7]=0,t[8]=i[8]*r,t[9]=i[9]*r,t[10]=i[10]*r,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,a=e.z,r=Math.cos(i),o=Math.sin(i),l=Math.cos(s),c=Math.sin(s),u=Math.cos(a),d=Math.sin(a);if(e.order==="XYZ"){const h=r*u,f=r*d,g=o*u,_=o*d;t[0]=l*u,t[4]=-l*d,t[8]=c,t[1]=f+g*c,t[5]=h-_*c,t[9]=-o*l,t[2]=_-h*c,t[6]=g+f*c,t[10]=r*l}else if(e.order==="YXZ"){const h=l*u,f=l*d,g=c*u,_=c*d;t[0]=h+_*o,t[4]=g*o-f,t[8]=r*c,t[1]=r*d,t[5]=r*u,t[9]=-o,t[2]=f*o-g,t[6]=_+h*o,t[10]=r*l}else if(e.order==="ZXY"){const h=l*u,f=l*d,g=c*u,_=c*d;t[0]=h-_*o,t[4]=-r*d,t[8]=g+f*o,t[1]=f+g*o,t[5]=r*u,t[9]=_-h*o,t[2]=-r*c,t[6]=o,t[10]=r*l}else if(e.order==="ZYX"){const h=r*u,f=r*d,g=o*u,_=o*d;t[0]=l*u,t[4]=g*c-f,t[8]=h*c+_,t[1]=l*d,t[5]=_*c+h,t[9]=f*c-g,t[2]=-c,t[6]=o*l,t[10]=r*l}else if(e.order==="YZX"){const h=r*l,f=r*c,g=o*l,_=o*c;t[0]=l*u,t[4]=_-h*d,t[8]=g*d+f,t[1]=d,t[5]=r*u,t[9]=-o*u,t[2]=-c*u,t[6]=f*d+g,t[10]=h-_*d}else if(e.order==="XZY"){const h=r*l,f=r*c,g=o*l,_=o*c;t[0]=l*u,t[4]=-d,t[8]=c*u,t[1]=h*d+_,t[5]=r*u,t[9]=f*d-g,t[2]=g*d-f,t[6]=o*u,t[10]=_*d+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(E0,e,T0)}lookAt(e,t,i){const s=this.elements;return nn.subVectors(e,t),nn.lengthSq()===0&&(nn.z=1),nn.normalize(),di.crossVectors(i,nn),di.lengthSq()===0&&(Math.abs(i.z)===1?nn.x+=1e-4:nn.z+=1e-4,nn.normalize(),di.crossVectors(i,nn)),di.normalize(),gr.crossVectors(nn,di),s[0]=di.x,s[4]=gr.x,s[8]=nn.x,s[1]=di.y,s[5]=gr.y,s[9]=nn.y,s[2]=di.z,s[6]=gr.z,s[10]=nn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,a=this.elements,r=i[0],o=i[4],l=i[8],c=i[12],u=i[1],d=i[5],h=i[9],f=i[13],g=i[2],_=i[6],m=i[10],p=i[14],w=i[3],S=i[7],v=i[11],R=i[15],T=s[0],E=s[4],A=s[8],y=s[12],b=s[1],C=s[5],N=s[9],z=s[13],V=s[2],G=s[6],B=s[10],U=s[14],O=s[3],Z=s[7],Q=s[11],se=s[15];return a[0]=r*T+o*b+l*V+c*O,a[4]=r*E+o*C+l*G+c*Z,a[8]=r*A+o*N+l*B+c*Q,a[12]=r*y+o*z+l*U+c*se,a[1]=u*T+d*b+h*V+f*O,a[5]=u*E+d*C+h*G+f*Z,a[9]=u*A+d*N+h*B+f*Q,a[13]=u*y+d*z+h*U+f*se,a[2]=g*T+_*b+m*V+p*O,a[6]=g*E+_*C+m*G+p*Z,a[10]=g*A+_*N+m*B+p*Q,a[14]=g*y+_*z+m*U+p*se,a[3]=w*T+S*b+v*V+R*O,a[7]=w*E+S*C+v*G+R*Z,a[11]=w*A+S*N+v*B+R*Q,a[15]=w*y+S*z+v*U+R*se,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],a=e[12],r=e[1],o=e[5],l=e[9],c=e[13],u=e[2],d=e[6],h=e[10],f=e[14],g=e[3],_=e[7],m=e[11],p=e[15];return g*(+a*l*d-s*c*d-a*o*h+i*c*h+s*o*f-i*l*f)+_*(+t*l*f-t*c*h+a*r*h-s*r*f+s*c*u-a*l*u)+m*(+t*c*d-t*o*f-a*r*d+i*r*f+a*o*u-i*c*u)+p*(-s*o*u-t*l*d+t*o*h+s*r*d-i*r*h+i*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],a=e[3],r=e[4],o=e[5],l=e[6],c=e[7],u=e[8],d=e[9],h=e[10],f=e[11],g=e[12],_=e[13],m=e[14],p=e[15],w=d*m*c-_*h*c+_*l*f-o*m*f-d*l*p+o*h*p,S=g*h*c-u*m*c-g*l*f+r*m*f+u*l*p-r*h*p,v=u*_*c-g*d*c+g*o*f-r*_*f-u*o*p+r*d*p,R=g*d*l-u*_*l-g*o*h+r*_*h+u*o*m-r*d*m,T=t*w+i*S+s*v+a*R;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const E=1/T;return e[0]=w*E,e[1]=(_*h*a-d*m*a-_*s*f+i*m*f+d*s*p-i*h*p)*E,e[2]=(o*m*a-_*l*a+_*s*c-i*m*c-o*s*p+i*l*p)*E,e[3]=(d*l*a-o*h*a-d*s*c+i*h*c+o*s*f-i*l*f)*E,e[4]=S*E,e[5]=(u*m*a-g*h*a+g*s*f-t*m*f-u*s*p+t*h*p)*E,e[6]=(g*l*a-r*m*a-g*s*c+t*m*c+r*s*p-t*l*p)*E,e[7]=(r*h*a-u*l*a+u*s*c-t*h*c-r*s*f+t*l*f)*E,e[8]=v*E,e[9]=(g*d*a-u*_*a-g*i*f+t*_*f+u*i*p-t*d*p)*E,e[10]=(r*_*a-g*o*a+g*i*c-t*_*c-r*i*p+t*o*p)*E,e[11]=(u*o*a-r*d*a-u*i*c+t*d*c+r*i*f-t*o*f)*E,e[12]=R*E,e[13]=(u*_*s-g*d*s+g*i*h-t*_*h-u*i*m+t*d*m)*E,e[14]=(g*o*s-r*_*s-g*i*l+t*_*l+r*i*m-t*o*m)*E,e[15]=(r*d*s-u*o*s+u*i*l-t*d*l-r*i*h+t*o*h)*E,this}scale(e){const t=this.elements,i=e.x,s=e.y,a=e.z;return t[0]*=i,t[4]*=s,t[8]*=a,t[1]*=i,t[5]*=s,t[9]*=a,t[2]*=i,t[6]*=s,t[10]*=a,t[3]*=i,t[7]*=s,t[11]*=a,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),a=1-i,r=e.x,o=e.y,l=e.z,c=a*r,u=a*o;return this.set(c*r+i,c*o-s*l,c*l+s*o,0,c*o+s*l,u*o+i,u*l-s*r,0,c*l-s*o,u*l+s*r,a*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,a,r){return this.set(1,i,a,0,e,1,r,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,a=t._x,r=t._y,o=t._z,l=t._w,c=a+a,u=r+r,d=o+o,h=a*c,f=a*u,g=a*d,_=r*u,m=r*d,p=o*d,w=l*c,S=l*u,v=l*d,R=i.x,T=i.y,E=i.z;return s[0]=(1-(_+p))*R,s[1]=(f+v)*R,s[2]=(g-S)*R,s[3]=0,s[4]=(f-v)*T,s[5]=(1-(h+p))*T,s[6]=(m+w)*T,s[7]=0,s[8]=(g+S)*E,s[9]=(m-w)*E,s[10]=(1-(h+_))*E,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;let a=gs.set(s[0],s[1],s[2]).length();const r=gs.set(s[4],s[5],s[6]).length(),o=gs.set(s[8],s[9],s[10]).length();this.determinant()<0&&(a=-a),e.x=s[12],e.y=s[13],e.z=s[14],bn.copy(this);const c=1/a,u=1/r,d=1/o;return bn.elements[0]*=c,bn.elements[1]*=c,bn.elements[2]*=c,bn.elements[4]*=u,bn.elements[5]*=u,bn.elements[6]*=u,bn.elements[8]*=d,bn.elements[9]*=d,bn.elements[10]*=d,t.setFromRotationMatrix(bn),i.x=a,i.y=r,i.z=o,this}makePerspective(e,t,i,s,a,r,o=kn,l=!1){const c=this.elements,u=2*a/(t-e),d=2*a/(i-s),h=(t+e)/(t-e),f=(i+s)/(i-s);let g,_;if(l)g=a/(r-a),_=r*a/(r-a);else if(o===kn)g=-(r+a)/(r-a),_=-2*r*a/(r-a);else if(o===yo)g=-r/(r-a),_=-r*a/(r-a);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=d,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,s,a,r,o=kn,l=!1){const c=this.elements,u=2/(t-e),d=2/(i-s),h=-(t+e)/(t-e),f=-(i+s)/(i-s);let g,_;if(l)g=1/(r-a),_=r/(r-a);else if(o===kn)g=-2/(r-a),_=-(r+a)/(r-a);else if(o===yo)g=-1/(r-a),_=-a/(r-a);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=d,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const gs=new L,bn=new gt,E0=new L(0,0,0),T0=new L(1,1,1),di=new L,gr=new L,nn=new L,Bd=new gt,zd=new Ti;class In{constructor(e=0,t=0,i=0,s=In.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,a=s[0],r=s[4],o=s[8],l=s[1],c=s[5],u=s[9],d=s[2],h=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(Xe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-r,a)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Xe(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,a),this._z=0);break;case"ZXY":this._x=Math.asin(Xe(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-r,c)):(this._y=0,this._z=Math.atan2(l,a));break;case"ZYX":this._y=Math.asin(-Xe(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,f),this._z=Math.atan2(l,a)):(this._x=0,this._z=Math.atan2(-r,c));break;case"YZX":this._z=Math.asin(Xe(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,a)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Xe(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,a)):(this._x=Math.atan2(-u,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Bd.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Bd,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return zd.setFromEuler(this),this.setFromQuaternion(zd,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}In.DEFAULT_ORDER="XYZ";class Ap{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let A0=0;const Hd=new L,_s=new Ti,Yn=new gt,_r=new L,ua=new L,C0=new L,R0=new Ti,Vd=new L(1,0,0),Gd=new L(0,1,0),Wd=new L(0,0,1),$d={type:"added"},P0={type:"removed"},vs={type:"childadded",child:null},vl={type:"childremoved",child:null};class Pt extends os{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:A0++}),this.uuid=Bn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Pt.DEFAULT_UP.clone();const e=new L,t=new In,i=new Ti,s=new L(1,1,1);function a(){i.setFromEuler(t,!1)}function r(){t.setFromQuaternion(i,void 0,!1)}t._onChange(a),i._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new gt},normalMatrix:{value:new Ve}}),this.matrix=new gt,this.matrixWorld=new gt,this.matrixAutoUpdate=Pt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ap,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return _s.setFromAxisAngle(e,t),this.quaternion.multiply(_s),this}rotateOnWorldAxis(e,t){return _s.setFromAxisAngle(e,t),this.quaternion.premultiply(_s),this}rotateX(e){return this.rotateOnAxis(Vd,e)}rotateY(e){return this.rotateOnAxis(Gd,e)}rotateZ(e){return this.rotateOnAxis(Wd,e)}translateOnAxis(e,t){return Hd.copy(e).applyQuaternion(this.quaternion),this.position.add(Hd.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Vd,e)}translateY(e){return this.translateOnAxis(Gd,e)}translateZ(e){return this.translateOnAxis(Wd,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Yn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?_r.copy(e):_r.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),ua.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Yn.lookAt(ua,_r,this.up):Yn.lookAt(_r,ua,this.up),this.quaternion.setFromRotationMatrix(Yn),s&&(Yn.extractRotation(s.matrixWorld),_s.setFromRotationMatrix(Yn),this.quaternion.premultiply(_s.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent($d),vs.child=e,this.dispatchEvent(vs),vs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(P0),vl.child=e,this.dispatchEvent(vl),vl.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Yn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Yn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Yn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent($d),vs.child=e,this.dispatchEvent(vs),vs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const r=this.children[i].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const s=this.children;for(let a=0,r=s.length;a<r;a++)s[a].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ua,e,C0),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ua,R0,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let a=0,r=s.length;a<r;a++)s[a].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function a(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=a(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const d=l[c];a(e.shapes,d)}else a(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(a(e.materials,this.material[l]));s.material=o}else s.material=a(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(a(e.animations,l))}}if(t){const o=r(e.geometries),l=r(e.materials),c=r(e.textures),u=r(e.images),d=r(e.shapes),h=r(e.skeletons),f=r(e.animations),g=r(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),d.length>0&&(i.shapes=d),h.length>0&&(i.skeletons=h),f.length>0&&(i.animations=f),g.length>0&&(i.nodes=g)}return i.object=s,i;function r(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}}Pt.DEFAULT_UP=new L(0,1,0);Pt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const xn=new L,Zn=new L,yl=new L,Kn=new L,ys=new L,bs=new L,Xd=new L,bl=new L,xl=new L,Sl=new L,wl=new St,Ml=new St,El=new St;class gn{constructor(e=new L,t=new L,i=new L){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),xn.subVectors(e,t),s.cross(xn);const a=s.lengthSq();return a>0?s.multiplyScalar(1/Math.sqrt(a)):s.set(0,0,0)}static getBarycoord(e,t,i,s,a){xn.subVectors(s,t),Zn.subVectors(i,t),yl.subVectors(e,t);const r=xn.dot(xn),o=xn.dot(Zn),l=xn.dot(yl),c=Zn.dot(Zn),u=Zn.dot(yl),d=r*c-o*o;if(d===0)return a.set(0,0,0),null;const h=1/d,f=(c*l-o*u)*h,g=(r*u-o*l)*h;return a.set(1-f-g,g,f)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,Kn)===null?!1:Kn.x>=0&&Kn.y>=0&&Kn.x+Kn.y<=1}static getInterpolation(e,t,i,s,a,r,o,l){return this.getBarycoord(e,t,i,s,Kn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(a,Kn.x),l.addScaledVector(r,Kn.y),l.addScaledVector(o,Kn.z),l)}static getInterpolatedAttribute(e,t,i,s,a,r){return wl.setScalar(0),Ml.setScalar(0),El.setScalar(0),wl.fromBufferAttribute(e,t),Ml.fromBufferAttribute(e,i),El.fromBufferAttribute(e,s),r.setScalar(0),r.addScaledVector(wl,a.x),r.addScaledVector(Ml,a.y),r.addScaledVector(El,a.z),r}static isFrontFacing(e,t,i,s){return xn.subVectors(i,t),Zn.subVectors(e,t),xn.cross(Zn).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return xn.subVectors(this.c,this.b),Zn.subVectors(this.a,this.b),xn.cross(Zn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return gn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return gn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,a){return gn.getInterpolation(e,this.a,this.b,this.c,t,i,s,a)}containsPoint(e){return gn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return gn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,a=this.c;let r,o;ys.subVectors(s,i),bs.subVectors(a,i),bl.subVectors(e,i);const l=ys.dot(bl),c=bs.dot(bl);if(l<=0&&c<=0)return t.copy(i);xl.subVectors(e,s);const u=ys.dot(xl),d=bs.dot(xl);if(u>=0&&d<=u)return t.copy(s);const h=l*d-u*c;if(h<=0&&l>=0&&u<=0)return r=l/(l-u),t.copy(i).addScaledVector(ys,r);Sl.subVectors(e,a);const f=ys.dot(Sl),g=bs.dot(Sl);if(g>=0&&f<=g)return t.copy(a);const _=f*c-l*g;if(_<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(i).addScaledVector(bs,o);const m=u*g-f*d;if(m<=0&&d-u>=0&&f-g>=0)return Xd.subVectors(a,s),o=(d-u)/(d-u+(f-g)),t.copy(s).addScaledVector(Xd,o);const p=1/(m+_+h);return r=_*p,o=h*p,t.copy(i).addScaledVector(ys,r).addScaledVector(bs,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Cp={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},hi={h:0,s:0,l:0},vr={h:0,s:0,l:0};function Tl(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class qe{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Wt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Qe.colorSpaceToWorking(this,t),this}setRGB(e,t,i,s=Qe.workingColorSpace){return this.r=e,this.g=t,this.b=i,Qe.colorSpaceToWorking(this,s),this}setHSL(e,t,i,s=Qe.workingColorSpace){if(e=Zu(e,1),t=Xe(t,0,1),i=Xe(i,0,1),t===0)this.r=this.g=this.b=i;else{const a=i<=.5?i*(1+t):i+t-i*t,r=2*i-a;this.r=Tl(r,a,e+1/3),this.g=Tl(r,a,e),this.b=Tl(r,a,e-1/3)}return Qe.colorSpaceToWorking(this,s),this}setStyle(e,t=Wt){function i(a){a!==void 0&&parseFloat(a)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let a;const r=s[1],o=s[2];switch(r){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,t);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,t);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const a=s[1],r=a.length;if(r===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,t);if(r===6)return this.setHex(parseInt(a,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Wt){const i=Cp[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ii(e.r),this.g=ii(e.g),this.b=ii(e.b),this}copyLinearToSRGB(e){return this.r=zs(e.r),this.g=zs(e.g),this.b=zs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Wt){return Qe.workingToColorSpace(Ot.copy(this),e),Math.round(Xe(Ot.r*255,0,255))*65536+Math.round(Xe(Ot.g*255,0,255))*256+Math.round(Xe(Ot.b*255,0,255))}getHexString(e=Wt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Qe.workingColorSpace){Qe.workingToColorSpace(Ot.copy(this),t);const i=Ot.r,s=Ot.g,a=Ot.b,r=Math.max(i,s,a),o=Math.min(i,s,a);let l,c;const u=(o+r)/2;if(o===r)l=0,c=0;else{const d=r-o;switch(c=u<=.5?d/(r+o):d/(2-r-o),r){case i:l=(s-a)/d+(s<a?6:0);break;case s:l=(a-i)/d+2;break;case a:l=(i-s)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=Qe.workingColorSpace){return Qe.workingToColorSpace(Ot.copy(this),t),e.r=Ot.r,e.g=Ot.g,e.b=Ot.b,e}getStyle(e=Wt){Qe.workingToColorSpace(Ot.copy(this),e);const t=Ot.r,i=Ot.g,s=Ot.b;return e!==Wt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(hi),this.setHSL(hi.h+e,hi.s+t,hi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(hi),e.getHSL(vr);const i=Ea(hi.h,vr.h,t),s=Ea(hi.s,vr.s,t),a=Ea(hi.l,vr.l,t);return this.setHSL(i,s,a),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,a=e.elements;return this.r=a[0]*t+a[3]*i+a[6]*s,this.g=a[1]*t+a[4]*i+a[7]*s,this.b=a[2]*t+a[5]*i+a[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ot=new qe;qe.NAMES=Cp;let L0=0;class Pi extends os{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:L0++}),this.uuid=Bn(),this.name="",this.type="Material",this.blending=Bs,this.side=Ei,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=pc,this.blendDst=mc,this.blendEquation=Xi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new qe(0,0,0),this.blendAlpha=0,this.depthFunc=Xs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Id,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ds,this.stencilZFail=ds,this.stencilZPass=ds,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Bs&&(i.blending=this.blending),this.side!==Ei&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==pc&&(i.blendSrc=this.blendSrc),this.blendDst!==mc&&(i.blendDst=this.blendDst),this.blendEquation!==Xi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Xs&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Id&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ds&&(i.stencilFail=this.stencilFail),this.stencilZFail!==ds&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==ds&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(a){const r=[];for(const o in a){const l=a[o];delete l.metadata,r.push(l)}return r}if(t){const a=s(e.textures),r=s(e.images);a.length>0&&(i.textures=a),r.length>0&&(i.images=r)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let a=0;a!==s;++a)i[a]=t[a].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class lt extends Pi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new qe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new In,this.combine=Vo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Et=new L,yr=new le;let I0=0;class Ln{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:I0++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=tu,this.updateRanges=[],this.gpuType=ni,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,a=this.itemSize;s<a;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)yr.fromBufferAttribute(this,t),yr.applyMatrix3(e),this.setXY(t,yr.x,yr.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Et.fromBufferAttribute(this,t),Et.applyMatrix3(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Et.fromBufferAttribute(this,t),Et.applyMatrix4(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Et.fromBufferAttribute(this,t),Et.applyNormalMatrix(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Et.fromBufferAttribute(this,t),Et.transformDirection(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=An(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=nt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=An(t,this.array)),t}setX(e,t){return this.normalized&&(t=nt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=An(t,this.array)),t}setY(e,t){return this.normalized&&(t=nt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=An(t,this.array)),t}setZ(e,t){return this.normalized&&(t=nt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=An(t,this.array)),t}setW(e,t){return this.normalized&&(t=nt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=nt(t,this.array),i=nt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=nt(t,this.array),i=nt(i,this.array),s=nt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,a){return e*=this.itemSize,this.normalized&&(t=nt(t,this.array),i=nt(i,this.array),s=nt(s,this.array),a=nt(a,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=a,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==tu&&(e.usage=this.usage),e}}class Rp extends Ln{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Pp extends Ln{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class ct extends Ln{constructor(e,t,i){super(new Float32Array(e),t,i)}}let N0=0;const dn=new gt,Al=new Pt,xs=new L,sn=new sr,da=new sr,Dt=new L;class Tt extends os{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:N0++}),this.uuid=Bn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Ep(e)?Pp:Rp)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const a=new Ve().getNormalMatrix(e);i.applyNormalMatrix(a),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return dn.makeRotationFromQuaternion(e),this.applyMatrix4(dn),this}rotateX(e){return dn.makeRotationX(e),this.applyMatrix4(dn),this}rotateY(e){return dn.makeRotationY(e),this.applyMatrix4(dn),this}rotateZ(e){return dn.makeRotationZ(e),this.applyMatrix4(dn),this}translate(e,t,i){return dn.makeTranslation(e,t,i),this.applyMatrix4(dn),this}scale(e,t,i){return dn.makeScale(e,t,i),this.applyMatrix4(dn),this}lookAt(e){return Al.lookAt(e),Al.updateMatrix(),this.applyMatrix4(Al.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(xs).negate(),this.translate(xs.x,xs.y,xs.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let s=0,a=e.length;s<a;s++){const r=e[s];i.push(r.x,r.y,r.z||0)}this.setAttribute("position",new ct(i,3))}else{const i=Math.min(e.length,t.count);for(let s=0;s<i;s++){const a=e[s];t.setXYZ(s,a.x,a.y,a.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new sr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const a=t[i];sn.setFromBufferAttribute(a),this.morphTargetsRelative?(Dt.addVectors(this.boundingBox.min,sn.min),this.boundingBox.expandByPoint(Dt),Dt.addVectors(this.boundingBox.max,sn.max),this.boundingBox.expandByPoint(Dt)):(this.boundingBox.expandByPoint(sn.min),this.boundingBox.expandByPoint(sn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Wo);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(e){const i=this.boundingSphere.center;if(sn.setFromBufferAttribute(e),t)for(let a=0,r=t.length;a<r;a++){const o=t[a];da.setFromBufferAttribute(o),this.morphTargetsRelative?(Dt.addVectors(sn.min,da.min),sn.expandByPoint(Dt),Dt.addVectors(sn.max,da.max),sn.expandByPoint(Dt)):(sn.expandByPoint(da.min),sn.expandByPoint(da.max))}sn.getCenter(i);let s=0;for(let a=0,r=e.count;a<r;a++)Dt.fromBufferAttribute(e,a),s=Math.max(s,i.distanceToSquared(Dt));if(t)for(let a=0,r=t.length;a<r;a++){const o=t[a],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Dt.fromBufferAttribute(o,c),l&&(xs.fromBufferAttribute(e,c),Dt.add(xs)),s=Math.max(s,i.distanceToSquared(Dt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,s=t.normal,a=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ln(new Float32Array(4*i.count),4));const r=this.getAttribute("tangent"),o=[],l=[];for(let A=0;A<i.count;A++)o[A]=new L,l[A]=new L;const c=new L,u=new L,d=new L,h=new le,f=new le,g=new le,_=new L,m=new L;function p(A,y,b){c.fromBufferAttribute(i,A),u.fromBufferAttribute(i,y),d.fromBufferAttribute(i,b),h.fromBufferAttribute(a,A),f.fromBufferAttribute(a,y),g.fromBufferAttribute(a,b),u.sub(c),d.sub(c),f.sub(h),g.sub(h);const C=1/(f.x*g.y-g.x*f.y);isFinite(C)&&(_.copy(u).multiplyScalar(g.y).addScaledVector(d,-f.y).multiplyScalar(C),m.copy(d).multiplyScalar(f.x).addScaledVector(u,-g.x).multiplyScalar(C),o[A].add(_),o[y].add(_),o[b].add(_),l[A].add(m),l[y].add(m),l[b].add(m))}let w=this.groups;w.length===0&&(w=[{start:0,count:e.count}]);for(let A=0,y=w.length;A<y;++A){const b=w[A],C=b.start,N=b.count;for(let z=C,V=C+N;z<V;z+=3)p(e.getX(z+0),e.getX(z+1),e.getX(z+2))}const S=new L,v=new L,R=new L,T=new L;function E(A){R.fromBufferAttribute(s,A),T.copy(R);const y=o[A];S.copy(y),S.sub(R.multiplyScalar(R.dot(y))).normalize(),v.crossVectors(T,y);const C=v.dot(l[A])<0?-1:1;r.setXYZW(A,S.x,S.y,S.z,C)}for(let A=0,y=w.length;A<y;++A){const b=w[A],C=b.start,N=b.count;for(let z=C,V=C+N;z<V;z+=3)E(e.getX(z+0)),E(e.getX(z+1)),E(e.getX(z+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Ln(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let h=0,f=i.count;h<f;h++)i.setXYZ(h,0,0,0);const s=new L,a=new L,r=new L,o=new L,l=new L,c=new L,u=new L,d=new L;if(e)for(let h=0,f=e.count;h<f;h+=3){const g=e.getX(h+0),_=e.getX(h+1),m=e.getX(h+2);s.fromBufferAttribute(t,g),a.fromBufferAttribute(t,_),r.fromBufferAttribute(t,m),u.subVectors(r,a),d.subVectors(s,a),u.cross(d),o.fromBufferAttribute(i,g),l.fromBufferAttribute(i,_),c.fromBufferAttribute(i,m),o.add(u),l.add(u),c.add(u),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let h=0,f=t.count;h<f;h+=3)s.fromBufferAttribute(t,h+0),a.fromBufferAttribute(t,h+1),r.fromBufferAttribute(t,h+2),u.subVectors(r,a),d.subVectors(s,a),u.cross(d),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Dt.fromBufferAttribute(e,t),Dt.normalize(),e.setXYZ(t,Dt.x,Dt.y,Dt.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,d=o.normalized,h=new c.constructor(l.length*u);let f=0,g=0;for(let _=0,m=l.length;_<m;_++){o.isInterleavedBufferAttribute?f=l[_]*o.data.stride+o.offset:f=l[_]*u;for(let p=0;p<u;p++)h[g++]=c[f++]}return new Ln(h,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Tt,i=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=e(l,i);t.setAttribute(o,c)}const a=this.morphAttributes;for(const o in a){const l=[],c=a[o];for(let u=0,d=c.length;u<d;u++){const h=c[u],f=e(h,i);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const r=this.groups;for(let o=0,l=r.length;o<l;o++){const c=r[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let a=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let d=0,h=c.length;d<h;d++){const f=c[d];u.push(f.toJSON(e.data))}u.length>0&&(s[l]=u,a=!0)}a&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const r=this.groups;r.length>0&&(e.data.groups=JSON.parse(JSON.stringify(r)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const s=e.attributes;for(const c in s){const u=s[c];this.setAttribute(c,u.clone(t))}const a=e.morphAttributes;for(const c in a){const u=[],d=a[c];for(let h=0,f=d.length;h<f;h++)u.push(d[h].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const r=e.groups;for(let c=0,u=r.length;c<u;c++){const d=r[c];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const qd=new gt,Oi=new ju,br=new Wo,Yd=new L,xr=new L,Sr=new L,wr=new L,Cl=new L,Mr=new L,Zd=new L,Er=new L;class ze extends Pt{constructor(e=new Tt,t=new lt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,r=s.length;a<r;a++){const o=s[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,a=i.morphAttributes.position,r=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(a&&o){Mr.set(0,0,0);for(let l=0,c=a.length;l<c;l++){const u=o[l],d=a[l];u!==0&&(Cl.fromBufferAttribute(d,e),r?Mr.addScaledVector(Cl,u):Mr.addScaledVector(Cl.sub(t),u))}t.add(Mr)}return t}raycast(e,t){const i=this.geometry,s=this.material,a=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),br.copy(i.boundingSphere),br.applyMatrix4(a),Oi.copy(e.ray).recast(e.near),!(br.containsPoint(Oi.origin)===!1&&(Oi.intersectSphere(br,Yd)===null||Oi.origin.distanceToSquared(Yd)>(e.far-e.near)**2))&&(qd.copy(a).invert(),Oi.copy(e.ray).applyMatrix4(qd),!(i.boundingBox!==null&&Oi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Oi)))}_computeIntersections(e,t,i){let s;const a=this.geometry,r=this.material,o=a.index,l=a.attributes.position,c=a.attributes.uv,u=a.attributes.uv1,d=a.attributes.normal,h=a.groups,f=a.drawRange;if(o!==null)if(Array.isArray(r))for(let g=0,_=h.length;g<_;g++){const m=h[g],p=r[m.materialIndex],w=Math.max(m.start,f.start),S=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let v=w,R=S;v<R;v+=3){const T=o.getX(v),E=o.getX(v+1),A=o.getX(v+2);s=Tr(this,p,e,i,c,u,d,T,E,A),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),_=Math.min(o.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const w=o.getX(m),S=o.getX(m+1),v=o.getX(m+2);s=Tr(this,r,e,i,c,u,d,w,S,v),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(r))for(let g=0,_=h.length;g<_;g++){const m=h[g],p=r[m.materialIndex],w=Math.max(m.start,f.start),S=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let v=w,R=S;v<R;v+=3){const T=v,E=v+1,A=v+2;s=Tr(this,p,e,i,c,u,d,T,E,A),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const w=m,S=m+1,v=m+2;s=Tr(this,r,e,i,c,u,d,w,S,v),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function D0(n,e,t,i,s,a,r,o){let l;if(e.side===jt?l=i.intersectTriangle(r,a,s,!0,o):l=i.intersectTriangle(s,a,r,e.side===Ei,o),l===null)return null;Er.copy(o),Er.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(Er);return c<t.near||c>t.far?null:{distance:c,point:Er.clone(),object:n}}function Tr(n,e,t,i,s,a,r,o,l,c){n.getVertexPosition(o,xr),n.getVertexPosition(l,Sr),n.getVertexPosition(c,wr);const u=D0(n,e,t,i,xr,Sr,wr,Zd);if(u){const d=new L;gn.getBarycoord(Zd,xr,Sr,wr,d),s&&(u.uv=gn.getInterpolatedAttribute(s,o,l,c,d,new le)),a&&(u.uv1=gn.getInterpolatedAttribute(a,o,l,c,d,new le)),r&&(u.normal=gn.getInterpolatedAttribute(r,o,l,c,d,new L),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const h={a:o,b:l,c,normal:new L,materialIndex:0};gn.getNormal(xr,Sr,wr,h.normal),u.face=h,u.barycoord=d}return u}class ls extends Tt{constructor(e=1,t=1,i=1,s=1,a=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:a,depthSegments:r};const o=this;s=Math.floor(s),a=Math.floor(a),r=Math.floor(r);const l=[],c=[],u=[],d=[];let h=0,f=0;g("z","y","x",-1,-1,i,t,e,r,a,0),g("z","y","x",1,-1,i,t,-e,r,a,1),g("x","z","y",1,1,e,i,t,s,r,2),g("x","z","y",1,-1,e,i,-t,s,r,3),g("x","y","z",1,-1,e,t,i,s,a,4),g("x","y","z",-1,-1,e,t,-i,s,a,5),this.setIndex(l),this.setAttribute("position",new ct(c,3)),this.setAttribute("normal",new ct(u,3)),this.setAttribute("uv",new ct(d,2));function g(_,m,p,w,S,v,R,T,E,A,y){const b=v/E,C=R/A,N=v/2,z=R/2,V=T/2,G=E+1,B=A+1;let U=0,O=0;const Z=new L;for(let Q=0;Q<B;Q++){const se=Q*C-z;for(let ge=0;ge<G;ge++){const Me=ge*b-N;Z[_]=Me*w,Z[m]=se*S,Z[p]=V,c.push(Z.x,Z.y,Z.z),Z[_]=0,Z[m]=0,Z[p]=T>0?1:-1,u.push(Z.x,Z.y,Z.z),d.push(ge/E),d.push(1-Q/A),U+=1}}for(let Q=0;Q<A;Q++)for(let se=0;se<E;se++){const ge=h+se+G*Q,Me=h+se+G*(Q+1),he=h+(se+1)+G*(Q+1),_e=h+(se+1)+G*Q;l.push(ge,Me,_e),l.push(Me,he,_e),O+=6}o.addGroup(f,O,y),f+=O,h+=U}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ls(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Ks(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone():Array.isArray(s)?e[t][i]=s.slice():e[t][i]=s}}return e}function Gt(n){const e={};for(let t=0;t<n.length;t++){const i=Ks(n[t]);for(const s in i)e[s]=i[s]}return e}function U0(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Lp(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Qe.workingColorSpace}const F0={clone:Ks,merge:Gt};var O0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,k0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ai extends Pi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=O0,this.fragmentShader=k0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ks(e.uniforms),this.uniformsGroups=U0(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const r=this.uniforms[s].value;r&&r.isTexture?t.uniforms[s]={type:"t",value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[s]={type:"c",value:r.getHex()}:r&&r.isVector2?t.uniforms[s]={type:"v2",value:r.toArray()}:r&&r.isVector3?t.uniforms[s]={type:"v3",value:r.toArray()}:r&&r.isVector4?t.uniforms[s]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?t.uniforms[s]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?t.uniforms[s]={type:"m4",value:r.toArray()}:t.uniforms[s]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class Ip extends Pt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new gt,this.projectionMatrix=new gt,this.projectionMatrixInverse=new gt,this.coordinateSystem=kn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const fi=new L,Kd=new le,jd=new le;class pn extends Ip{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Ha*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ma*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ha*2*Math.atan(Math.tan(Ma*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){fi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(fi.x,fi.y).multiplyScalar(-e/fi.z),fi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(fi.x,fi.y).multiplyScalar(-e/fi.z)}getViewSize(e,t){return this.getViewBounds(e,Kd,jd),t.subVectors(jd,Kd)}setViewOffset(e,t,i,s,a,r){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=a,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Ma*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,a=-.5*s;const r=this.view;if(this.view!==null&&this.view.enabled){const l=r.fullWidth,c=r.fullHeight;a+=r.offsetX*s/l,t-=r.offsetY*i/c,s*=r.width/l,i*=r.height/c}const o=this.filmOffset;o!==0&&(a+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+s,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Ss=-90,ws=1;class B0 extends Pt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new pn(Ss,ws,e,t);s.layers=this.layers,this.add(s);const a=new pn(Ss,ws,e,t);a.layers=this.layers,this.add(a);const r=new pn(Ss,ws,e,t);r.layers=this.layers,this.add(r);const o=new pn(Ss,ws,e,t);o.layers=this.layers,this.add(o);const l=new pn(Ss,ws,e,t);l.layers=this.layers,this.add(l);const c=new pn(Ss,ws,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,a,r,o,l]=t;for(const c of t)this.remove(c);if(e===kn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===yo)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[a,r,o,l,c,u]=this.children,d=e.getRenderTarget(),h=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,s),e.render(t,a),e.setRenderTarget(i,1,s),e.render(t,r),e.setRenderTarget(i,2,s),e.render(t,o),e.setRenderTarget(i,3,s),e.render(t,l),e.setRenderTarget(i,4,s),e.render(t,c),i.texture.generateMipmaps=_,e.setRenderTarget(i,5,s),e.render(t,u),e.setRenderTarget(d,h,f),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class Np extends Xt{constructor(e=[],t=qs,i,s,a,r,o,l,c,u){super(e,t,i,s,a,r,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class z0 extends ns{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new Np(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new ls(5,5,5),a=new Ai({name:"CubemapFromEquirect",uniforms:Ks(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:jt,blending:yi});a.uniforms.tEquirect.value=t;const r=new ze(s,a),o=t.minFilter;return t.minFilter===Ki&&(t.minFilter=On),new B0(1,10,this).update(e,r),t.minFilter=o,r.geometry.dispose(),r.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){const a=e.getRenderTarget();for(let r=0;r<6;r++)e.setRenderTarget(this,r),e.clear(t,i,s);e.setRenderTarget(a)}}class mt extends Pt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const H0={type:"move"};class Rl{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new mt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new mt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new mt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,a=null,r=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){r=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,i),p=this._getHandJoint(c,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],h=u.position.distanceTo(d.position),f=.02,g=.005;c.inputState.pinching&&h>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(a=t.getPose(e.gripSpace,i),a!==null&&(l.matrix.fromArray(a.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,a.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(a.linearVelocity)):l.hasLinearVelocity=!1,a.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(a.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&a!==null&&(s=a),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(H0)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=a!==null),c!==null&&(c.visible=r!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new mt;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class V0 extends Pt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new In,this.environmentIntensity=1,this.environmentRotation=new In,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class G0{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=tu,this.updateRanges=[],this.version=0,this.uuid=Bn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let s=0,a=this.stride;s<a;s++)this.array[e+s]=t.array[i+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Bn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Bn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Vt=new L;class xo{constructor(e,t,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)Vt.fromBufferAttribute(this,t),Vt.applyMatrix4(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Vt.fromBufferAttribute(this,t),Vt.applyNormalMatrix(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Vt.fromBufferAttribute(this,t),Vt.transformDirection(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=An(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=nt(i,this.array)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=nt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=nt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=nt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=nt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=An(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=An(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=An(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=An(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=nt(t,this.array),i=nt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=nt(t,this.array),i=nt(i,this.array),s=nt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this}setXYZW(e,t,i,s,a){return e=e*this.data.stride+this.offset,this.normalized&&(t=nt(t,this.array),i=nt(i,this.array),s=nt(s,this.array),a=nt(a,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this.data.array[e+3]=a,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let a=0;a<this.itemSize;a++)t.push(this.data.array[s+a])}return new Ln(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new xo(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let a=0;a<this.itemSize;a++)t.push(this.data.array[s+a])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Dp extends Pi{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new qe(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Ms;const ha=new L,Es=new L,Ts=new L,As=new le,fa=new le,Up=new gt,Ar=new L,pa=new L,Cr=new L,Jd=new le,Pl=new le,Qd=new le;class Fp extends Pt{constructor(e=new Dp){if(super(),this.isSprite=!0,this.type="Sprite",Ms===void 0){Ms=new Tt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new G0(t,5);Ms.setIndex([0,1,2,0,2,3]),Ms.setAttribute("position",new xo(i,3,0,!1)),Ms.setAttribute("uv",new xo(i,2,3,!1))}this.geometry=Ms,this.material=e,this.center=new le(.5,.5),this.count=1}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Es.setFromMatrixScale(this.matrixWorld),Up.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Ts.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Es.multiplyScalar(-Ts.z);const i=this.material.rotation;let s,a;i!==0&&(a=Math.cos(i),s=Math.sin(i));const r=this.center;Rr(Ar.set(-.5,-.5,0),Ts,r,Es,s,a),Rr(pa.set(.5,-.5,0),Ts,r,Es,s,a),Rr(Cr.set(.5,.5,0),Ts,r,Es,s,a),Jd.set(0,0),Pl.set(1,0),Qd.set(1,1);let o=e.ray.intersectTriangle(Ar,pa,Cr,!1,ha);if(o===null&&(Rr(pa.set(-.5,.5,0),Ts,r,Es,s,a),Pl.set(0,1),o=e.ray.intersectTriangle(Ar,Cr,pa,!1,ha),o===null))return;const l=e.ray.origin.distanceTo(ha);l<e.near||l>e.far||t.push({distance:l,point:ha.clone(),uv:gn.getInterpolation(ha,Ar,pa,Cr,Jd,Pl,Qd,new le),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Rr(n,e,t,i,s,a){As.subVectors(n,t).addScalar(.5).multiply(i),s!==void 0?(fa.x=a*As.x-s*As.y,fa.y=s*As.x+a*As.y):fa.copy(As),n.copy(e),n.x+=fa.x,n.y+=fa.y,n.applyMatrix4(Up)}const Ll=new L,W0=new L,$0=new Ve;class mi{constructor(e=new L(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=Ll.subVectors(i,t).cross(W0.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(Ll),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return a<0||a>1?null:t.copy(e.start).addScaledVector(i,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||$0.getNormalMatrix(e),s=this.coplanarPoint(Ll).applyMatrix4(e),a=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(a),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ki=new Wo,X0=new le(.5,.5),Pr=new L;class Ju{constructor(e=new mi,t=new mi,i=new mi,s=new mi,a=new mi,r=new mi){this.planes=[e,t,i,s,a,r]}set(e,t,i,s,a,r){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(s),o[4].copy(a),o[5].copy(r),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=kn,i=!1){const s=this.planes,a=e.elements,r=a[0],o=a[1],l=a[2],c=a[3],u=a[4],d=a[5],h=a[6],f=a[7],g=a[8],_=a[9],m=a[10],p=a[11],w=a[12],S=a[13],v=a[14],R=a[15];if(s[0].setComponents(c-r,f-u,p-g,R-w).normalize(),s[1].setComponents(c+r,f+u,p+g,R+w).normalize(),s[2].setComponents(c+o,f+d,p+_,R+S).normalize(),s[3].setComponents(c-o,f-d,p-_,R-S).normalize(),i)s[4].setComponents(l,h,m,v).normalize(),s[5].setComponents(c-l,f-h,p-m,R-v).normalize();else if(s[4].setComponents(c-l,f-h,p-m,R-v).normalize(),t===kn)s[5].setComponents(c+l,f+h,p+m,R+v).normalize();else if(t===yo)s[5].setComponents(l,h,m,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ki.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ki.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ki)}intersectsSprite(e){ki.center.set(0,0,0);const t=X0.distanceTo(e.center);return ki.radius=.7071067811865476+t,ki.applyMatrix4(e.matrixWorld),this.intersectsSphere(ki)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let a=0;a<6;a++)if(t[a].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(Pr.x=s.normal.x>0?e.max.x:e.min.x,Pr.y=s.normal.y>0?e.max.y:e.min.y,Pr.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Pr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class $o extends Pi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new qe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const So=new L,wo=new L,eh=new gt,ma=new ju,Lr=new Wo,Il=new L,th=new L;class Qu extends Pt{constructor(e=new Tt,t=new $o){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let s=1,a=t.count;s<a;s++)So.fromBufferAttribute(t,s-1),wo.fromBufferAttribute(t,s),i[s]=i[s-1],i[s]+=So.distanceTo(wo);e.setAttribute("lineDistance",new ct(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,a=e.params.Line.threshold,r=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Lr.copy(i.boundingSphere),Lr.applyMatrix4(s),Lr.radius+=a,e.ray.intersectsSphere(Lr)===!1)return;eh.copy(s).invert(),ma.copy(e.ray).applyMatrix4(eh);const o=a/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,u=i.index,h=i.attributes.position;if(u!==null){const f=Math.max(0,r.start),g=Math.min(u.count,r.start+r.count);for(let _=f,m=g-1;_<m;_+=c){const p=u.getX(_),w=u.getX(_+1),S=Ir(this,e,ma,l,p,w,_);S&&t.push(S)}if(this.isLineLoop){const _=u.getX(g-1),m=u.getX(f),p=Ir(this,e,ma,l,_,m,g-1);p&&t.push(p)}}else{const f=Math.max(0,r.start),g=Math.min(h.count,r.start+r.count);for(let _=f,m=g-1;_<m;_+=c){const p=Ir(this,e,ma,l,_,_+1,_);p&&t.push(p)}if(this.isLineLoop){const _=Ir(this,e,ma,l,g-1,f,g-1);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,r=s.length;a<r;a++){const o=s[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}}function Ir(n,e,t,i,s,a,r){const o=n.geometry.attributes.position;if(So.fromBufferAttribute(o,s),wo.fromBufferAttribute(o,a),t.distanceSqToSegment(So,wo,Il,th)>i)return;Il.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(Il);if(!(c<e.near||c>e.far))return{distance:c,point:th.clone().applyMatrix4(n.matrixWorld),index:r,face:null,faceIndex:null,barycoord:null,object:n}}class ed extends Xt{constructor(e,t,i,s,a,r,o,l,c){super(e,t,i,s,a,r,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Op extends Xt{constructor(e,t,i=ts,s,a,r,o=Pn,l=Pn,c,u=Ba,d=1){if(u!==Ba&&u!==za)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:e,height:t,depth:d};super(h,s,a,r,o,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ku(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class kp extends Xt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Ds extends Tt{constructor(e=1,t=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:s},t=Math.max(3,t);const a=[],r=[],o=[],l=[],c=new L,u=new le;r.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let d=0,h=3;d<=t;d++,h+=3){const f=i+d/t*s;c.x=e*Math.cos(f),c.y=e*Math.sin(f),r.push(c.x,c.y,c.z),o.push(0,0,1),u.x=(r[h]/e+1)/2,u.y=(r[h+1]/e+1)/2,l.push(u.x,u.y)}for(let d=1;d<=t;d++)a.push(d,d+1,0);this.setIndex(a),this.setAttribute("position",new ct(r,3)),this.setAttribute("normal",new ct(o,3)),this.setAttribute("uv",new ct(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ds(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Xo extends Tt{constructor(e=1,t=1,i=1,s=32,a=1,r=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:s,heightSegments:a,openEnded:r,thetaStart:o,thetaLength:l};const c=this;s=Math.floor(s),a=Math.floor(a);const u=[],d=[],h=[],f=[];let g=0;const _=[],m=i/2;let p=0;w(),r===!1&&(e>0&&S(!0),t>0&&S(!1)),this.setIndex(u),this.setAttribute("position",new ct(d,3)),this.setAttribute("normal",new ct(h,3)),this.setAttribute("uv",new ct(f,2));function w(){const v=new L,R=new L;let T=0;const E=(t-e)/i;for(let A=0;A<=a;A++){const y=[],b=A/a,C=b*(t-e)+e;for(let N=0;N<=s;N++){const z=N/s,V=z*l+o,G=Math.sin(V),B=Math.cos(V);R.x=C*G,R.y=-b*i+m,R.z=C*B,d.push(R.x,R.y,R.z),v.set(G,E,B).normalize(),h.push(v.x,v.y,v.z),f.push(z,1-b),y.push(g++)}_.push(y)}for(let A=0;A<s;A++)for(let y=0;y<a;y++){const b=_[y][A],C=_[y+1][A],N=_[y+1][A+1],z=_[y][A+1];(e>0||y!==0)&&(u.push(b,C,z),T+=3),(t>0||y!==a-1)&&(u.push(C,N,z),T+=3)}c.addGroup(p,T,0),p+=T}function S(v){const R=g,T=new le,E=new L;let A=0;const y=v===!0?e:t,b=v===!0?1:-1;for(let N=1;N<=s;N++)d.push(0,m*b,0),h.push(0,b,0),f.push(.5,.5),g++;const C=g;for(let N=0;N<=s;N++){const V=N/s*l+o,G=Math.cos(V),B=Math.sin(V);E.x=y*B,E.y=m*b,E.z=y*G,d.push(E.x,E.y,E.z),h.push(0,b,0),T.x=G*.5+.5,T.y=B*.5*b+.5,f.push(T.x,T.y),g++}for(let N=0;N<s;N++){const z=R+N,V=C+N;v===!0?u.push(V,V+1,z):u.push(V+1,V,z),A+=3}c.addGroup(p,A,v===!0?1:2),p+=A}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Xo(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Ga extends Xo{constructor(e=1,t=1,i=32,s=1,a=!1,r=0,o=Math.PI*2){super(0,e,t,i,s,a,r,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:s,openEnded:a,thetaStart:r,thetaLength:o}}static fromJSON(e){return new Ga(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Wn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){const i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let i,s=this.getPoint(0),a=0;t.push(0);for(let r=1;r<=e;r++)i=this.getPoint(r/e),a+=i.distanceTo(s),t.push(a),s=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const i=this.getLengths();let s=0;const a=i.length;let r;t?r=t:r=e*i[a-1];let o=0,l=a-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=i[s]-r,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,i[s]===r)return s/(a-1);const u=i[s],h=i[s+1]-u,f=(r-u)/h;return(s+f)/(a-1)}getTangent(e,t){let s=e-1e-4,a=e+1e-4;s<0&&(s=0),a>1&&(a=1);const r=this.getPoint(s),o=this.getPoint(a),l=t||(r.isVector2?new le:new L);return l.copy(o).sub(r).normalize(),l}getTangentAt(e,t){const i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t=!1){const i=new L,s=[],a=[],r=[],o=new L,l=new gt;for(let f=0;f<=e;f++){const g=f/e;s[f]=this.getTangentAt(g,new L)}a[0]=new L,r[0]=new L;let c=Number.MAX_VALUE;const u=Math.abs(s[0].x),d=Math.abs(s[0].y),h=Math.abs(s[0].z);u<=c&&(c=u,i.set(1,0,0)),d<=c&&(c=d,i.set(0,1,0)),h<=c&&i.set(0,0,1),o.crossVectors(s[0],i).normalize(),a[0].crossVectors(s[0],o),r[0].crossVectors(s[0],a[0]);for(let f=1;f<=e;f++){if(a[f]=a[f-1].clone(),r[f]=r[f-1].clone(),o.crossVectors(s[f-1],s[f]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(Xe(s[f-1].dot(s[f]),-1,1));a[f].applyMatrix4(l.makeRotationAxis(o,g))}r[f].crossVectors(s[f],a[f])}if(t===!0){let f=Math.acos(Xe(a[0].dot(a[e]),-1,1));f/=e,s[0].dot(o.crossVectors(a[0],a[e]))>0&&(f=-f);for(let g=1;g<=e;g++)a[g].applyMatrix4(l.makeRotationAxis(s[g],f*g)),r[g].crossVectors(s[g],a[g])}return{tangents:s,normals:a,binormals:r}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class td extends Wn{constructor(e=0,t=0,i=1,s=1,a=0,r=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=s,this.aStartAngle=a,this.aEndAngle=r,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new le){const i=t,s=Math.PI*2;let a=this.aEndAngle-this.aStartAngle;const r=Math.abs(a)<Number.EPSILON;for(;a<0;)a+=s;for(;a>s;)a-=s;a<Number.EPSILON&&(r?a=0:a=s),this.aClockwise===!0&&!r&&(a===s?a=-s:a=a-s);const o=this.aStartAngle+e*a;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const u=Math.cos(this.aRotation),d=Math.sin(this.aRotation),h=l-this.aX,f=c-this.aY;l=h*u-f*d+this.aX,c=h*d+f*u+this.aY}return i.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class q0 extends td{constructor(e,t,i,s,a,r){super(e,t,i,i,s,a,r),this.isArcCurve=!0,this.type="ArcCurve"}}function nd(){let n=0,e=0,t=0,i=0;function s(a,r,o,l){n=a,e=o,t=-3*a+3*r-2*o-l,i=2*a-2*r+o+l}return{initCatmullRom:function(a,r,o,l,c){s(r,o,c*(o-a),c*(l-r))},initNonuniformCatmullRom:function(a,r,o,l,c,u,d){let h=(r-a)/c-(o-a)/(c+u)+(o-r)/u,f=(o-r)/u-(l-r)/(u+d)+(l-o)/d;h*=u,f*=u,s(r,o,h,f)},calc:function(a){const r=a*a,o=r*a;return n+e*a+t*r+i*o}}}const Nr=new L,Nl=new nd,Dl=new nd,Ul=new nd;class Y0 extends Wn{constructor(e=[],t=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=s}getPoint(e,t=new L){const i=t,s=this.points,a=s.length,r=(a-(this.closed?0:1))*e;let o=Math.floor(r),l=r-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/a)+1)*a:l===0&&o===a-1&&(o=a-2,l=1);let c,u;this.closed||o>0?c=s[(o-1)%a]:(Nr.subVectors(s[0],s[1]).add(s[0]),c=Nr);const d=s[o%a],h=s[(o+1)%a];if(this.closed||o+2<a?u=s[(o+2)%a]:(Nr.subVectors(s[a-1],s[a-2]).add(s[a-1]),u=Nr),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(d),f),_=Math.pow(d.distanceToSquared(h),f),m=Math.pow(h.distanceToSquared(u),f);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),Nl.initNonuniformCatmullRom(c.x,d.x,h.x,u.x,g,_,m),Dl.initNonuniformCatmullRom(c.y,d.y,h.y,u.y,g,_,m),Ul.initNonuniformCatmullRom(c.z,d.z,h.z,u.z,g,_,m)}else this.curveType==="catmullrom"&&(Nl.initCatmullRom(c.x,d.x,h.x,u.x,this.tension),Dl.initCatmullRom(c.y,d.y,h.y,u.y,this.tension),Ul.initCatmullRom(c.z,d.z,h.z,u.z,this.tension));return i.set(Nl.calc(l),Dl.calc(l),Ul.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(new L().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function nh(n,e,t,i,s){const a=(i-e)*.5,r=(s-t)*.5,o=n*n,l=n*o;return(2*t-2*i+a+r)*l+(-3*t+3*i-2*a-r)*o+a*n+t}function Z0(n,e){const t=1-n;return t*t*e}function K0(n,e){return 2*(1-n)*n*e}function j0(n,e){return n*n*e}function Ta(n,e,t,i){return Z0(n,e)+K0(n,t)+j0(n,i)}function J0(n,e){const t=1-n;return t*t*t*e}function Q0(n,e){const t=1-n;return 3*t*t*n*e}function ev(n,e){return 3*(1-n)*n*n*e}function tv(n,e){return n*n*n*e}function Aa(n,e,t,i,s){return J0(n,e)+Q0(n,t)+ev(n,i)+tv(n,s)}class Bp extends Wn{constructor(e=new le,t=new le,i=new le,s=new le){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=s}getPoint(e,t=new le){const i=t,s=this.v0,a=this.v1,r=this.v2,o=this.v3;return i.set(Aa(e,s.x,a.x,r.x,o.x),Aa(e,s.y,a.y,r.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class nv extends Wn{constructor(e=new L,t=new L,i=new L,s=new L){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=s}getPoint(e,t=new L){const i=t,s=this.v0,a=this.v1,r=this.v2,o=this.v3;return i.set(Aa(e,s.x,a.x,r.x,o.x),Aa(e,s.y,a.y,r.y,o.y),Aa(e,s.z,a.z,r.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class zp extends Wn{constructor(e=new le,t=new le){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new le){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new le){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class iv extends Wn{constructor(e=new L,t=new L){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new L){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new L){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Hp extends Wn{constructor(e=new le,t=new le,i=new le){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new le){const i=t,s=this.v0,a=this.v1,r=this.v2;return i.set(Ta(e,s.x,a.x,r.x),Ta(e,s.y,a.y,r.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class sv extends Wn{constructor(e=new L,t=new L,i=new L){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new L){const i=t,s=this.v0,a=this.v1,r=this.v2;return i.set(Ta(e,s.x,a.x,r.x),Ta(e,s.y,a.y,r.y),Ta(e,s.z,a.z,r.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Vp extends Wn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new le){const i=t,s=this.points,a=(s.length-1)*e,r=Math.floor(a),o=a-r,l=s[r===0?r:r-1],c=s[r],u=s[r>s.length-2?s.length-1:r+1],d=s[r>s.length-3?s.length-1:r+2];return i.set(nh(o,l.x,c.x,u.x,d.x),nh(o,l.y,c.y,u.y,d.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(new le().fromArray(s))}return this}}var ih=Object.freeze({__proto__:null,ArcCurve:q0,CatmullRomCurve3:Y0,CubicBezierCurve:Bp,CubicBezierCurve3:nv,EllipseCurve:td,LineCurve:zp,LineCurve3:iv,QuadraticBezierCurve:Hp,QuadraticBezierCurve3:sv,SplineCurve:Vp});class av extends Wn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new ih[i](t,e))}return this}getPoint(e,t){const i=e*this.getLength(),s=this.getCurveLengths();let a=0;for(;a<s.length;){if(s[a]>=i){const r=s[a]-i,o=this.curves[a],l=o.getLength(),c=l===0?0:1-r/l;return o.getPointAt(c,t)}a++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let i=0,s=this.curves.length;i<s;i++)t+=this.curves[i].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let i;for(let s=0,a=this.curves;s<a.length;s++){const r=a[s],o=r.isEllipseCurve?e*2:r.isLineCurve||r.isLineCurve3?1:r.isSplineCurve?e*r.points.length:e,l=r.getPoints(o);for(let c=0;c<l.length;c++){const u=l[c];i&&i.equals(u)||(t.push(u),i=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,i=this.curves.length;t<i;t++){const s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const s=e.curves[t];this.curves.push(new ih[s.type]().fromJSON(s))}return this}}class sh extends av{constructor(e){super(),this.type="Path",this.currentPoint=new le,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,i=e.length;t<i;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const i=new zp(this.currentPoint.clone(),new le(e,t));return this.curves.push(i),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,i,s){const a=new Hp(this.currentPoint.clone(),new le(e,t),new le(i,s));return this.curves.push(a),this.currentPoint.set(i,s),this}bezierCurveTo(e,t,i,s,a,r){const o=new Bp(this.currentPoint.clone(),new le(e,t),new le(i,s),new le(a,r));return this.curves.push(o),this.currentPoint.set(a,r),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),i=new Vp(t);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,i,s,a,r){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,i,s,a,r),this}absarc(e,t,i,s,a,r){return this.absellipse(e,t,i,i,s,a,r),this}ellipse(e,t,i,s,a,r,o,l){const c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+c,t+u,i,s,a,r,o,l),this}absellipse(e,t,i,s,a,r,o,l){const c=new td(e,t,i,s,a,r,o,l);if(this.curves.length>0){const d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);const u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class id extends sh{constructor(e){super(e),this.uuid=Bn(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let i=0,s=this.holes.length;i<s;i++)t[i]=this.holes[i].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){const s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,i=this.holes.length;t<i;t++){const s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){const s=e.holes[t];this.holes.push(new sh().fromJSON(s))}return this}}function rv(n,e,t=2){const i=e&&e.length,s=i?e[0]*t:n.length;let a=Gp(n,0,s,t,!0);const r=[];if(!a||a.next===a.prev)return r;let o,l,c;if(i&&(a=dv(n,e,a,t)),n.length>80*t){o=1/0,l=1/0;let u=-1/0,d=-1/0;for(let h=t;h<s;h+=t){const f=n[h],g=n[h+1];f<o&&(o=f),g<l&&(l=g),f>u&&(u=f),g>d&&(d=g)}c=Math.max(u-o,d-l),c=c!==0?32767/c:0}return Wa(a,r,t,o,l,c,0),r}function Gp(n,e,t,i,s){let a;if(s===Sv(n,e,t,i)>0)for(let r=e;r<t;r+=i)a=ah(r/i|0,n[r],n[r+1],a);else for(let r=t-i;r>=e;r-=i)a=ah(r/i|0,n[r],n[r+1],a);return a&&js(a,a.next)&&(Xa(a),a=a.next),a}function is(n,e){if(!n)return n;e||(e=n);let t=n,i;do if(i=!1,!t.steiner&&(js(t,t.next)||yt(t.prev,t,t.next)===0)){if(Xa(t),t=e=t.prev,t===t.next)break;i=!0}else t=t.next;while(i||t!==e);return e}function Wa(n,e,t,i,s,a,r){if(!n)return;!r&&a&&gv(n,i,s,a);let o=n;for(;n.prev!==n.next;){const l=n.prev,c=n.next;if(a?lv(n,i,s,a):ov(n)){e.push(l.i,n.i,c.i),Xa(n),n=c.next,o=c.next;continue}if(n=c,n===o){r?r===1?(n=cv(is(n),e),Wa(n,e,t,i,s,a,2)):r===2&&uv(n,e,t,i,s,a):Wa(is(n),e,t,i,s,a,1);break}}}function ov(n){const e=n.prev,t=n,i=n.next;if(yt(e,t,i)>=0)return!1;const s=e.x,a=t.x,r=i.x,o=e.y,l=t.y,c=i.y,u=Math.min(s,a,r),d=Math.min(o,l,c),h=Math.max(s,a,r),f=Math.max(o,l,c);let g=i.next;for(;g!==e;){if(g.x>=u&&g.x<=h&&g.y>=d&&g.y<=f&&va(s,o,a,l,r,c,g.x,g.y)&&yt(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function lv(n,e,t,i){const s=n.prev,a=n,r=n.next;if(yt(s,a,r)>=0)return!1;const o=s.x,l=a.x,c=r.x,u=s.y,d=a.y,h=r.y,f=Math.min(o,l,c),g=Math.min(u,d,h),_=Math.max(o,l,c),m=Math.max(u,d,h),p=nu(f,g,e,t,i),w=nu(_,m,e,t,i);let S=n.prevZ,v=n.nextZ;for(;S&&S.z>=p&&v&&v.z<=w;){if(S.x>=f&&S.x<=_&&S.y>=g&&S.y<=m&&S!==s&&S!==r&&va(o,u,l,d,c,h,S.x,S.y)&&yt(S.prev,S,S.next)>=0||(S=S.prevZ,v.x>=f&&v.x<=_&&v.y>=g&&v.y<=m&&v!==s&&v!==r&&va(o,u,l,d,c,h,v.x,v.y)&&yt(v.prev,v,v.next)>=0))return!1;v=v.nextZ}for(;S&&S.z>=p;){if(S.x>=f&&S.x<=_&&S.y>=g&&S.y<=m&&S!==s&&S!==r&&va(o,u,l,d,c,h,S.x,S.y)&&yt(S.prev,S,S.next)>=0)return!1;S=S.prevZ}for(;v&&v.z<=w;){if(v.x>=f&&v.x<=_&&v.y>=g&&v.y<=m&&v!==s&&v!==r&&va(o,u,l,d,c,h,v.x,v.y)&&yt(v.prev,v,v.next)>=0)return!1;v=v.nextZ}return!0}function cv(n,e){let t=n;do{const i=t.prev,s=t.next.next;!js(i,s)&&$p(i,t,t.next,s)&&$a(i,s)&&$a(s,i)&&(e.push(i.i,t.i,s.i),Xa(t),Xa(t.next),t=n=s),t=t.next}while(t!==n);return is(t)}function uv(n,e,t,i,s,a){let r=n;do{let o=r.next.next;for(;o!==r.prev;){if(r.i!==o.i&&yv(r,o)){let l=Xp(r,o);r=is(r,r.next),l=is(l,l.next),Wa(r,e,t,i,s,a,0),Wa(l,e,t,i,s,a,0);return}o=o.next}r=r.next}while(r!==n)}function dv(n,e,t,i){const s=[];for(let a=0,r=e.length;a<r;a++){const o=e[a]*i,l=a<r-1?e[a+1]*i:n.length,c=Gp(n,o,l,i,!1);c===c.next&&(c.steiner=!0),s.push(vv(c))}s.sort(hv);for(let a=0;a<s.length;a++)t=fv(s[a],t);return t}function hv(n,e){let t=n.x-e.x;if(t===0&&(t=n.y-e.y,t===0)){const i=(n.next.y-n.y)/(n.next.x-n.x),s=(e.next.y-e.y)/(e.next.x-e.x);t=i-s}return t}function fv(n,e){const t=pv(n,e);if(!t)return e;const i=Xp(t,n);return is(i,i.next),is(t,t.next)}function pv(n,e){let t=e;const i=n.x,s=n.y;let a=-1/0,r;if(js(n,t))return t;do{if(js(n,t.next))return t.next;if(s<=t.y&&s>=t.next.y&&t.next.y!==t.y){const d=t.x+(s-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(d<=i&&d>a&&(a=d,r=t.x<t.next.x?t:t.next,d===i))return r}t=t.next}while(t!==e);if(!r)return null;const o=r,l=r.x,c=r.y;let u=1/0;t=r;do{if(i>=t.x&&t.x>=l&&i!==t.x&&Wp(s<c?i:a,s,l,c,s<c?a:i,s,t.x,t.y)){const d=Math.abs(s-t.y)/(i-t.x);$a(t,n)&&(d<u||d===u&&(t.x>r.x||t.x===r.x&&mv(r,t)))&&(r=t,u=d)}t=t.next}while(t!==o);return r}function mv(n,e){return yt(n.prev,n,e.prev)<0&&yt(e.next,n,n.next)<0}function gv(n,e,t,i){let s=n;do s.z===0&&(s.z=nu(s.x,s.y,e,t,i)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==n);s.prevZ.nextZ=null,s.prevZ=null,_v(s)}function _v(n){let e,t=1;do{let i=n,s;n=null;let a=null;for(e=0;i;){e++;let r=i,o=0;for(let c=0;c<t&&(o++,r=r.nextZ,!!r);c++);let l=t;for(;o>0||l>0&&r;)o!==0&&(l===0||!r||i.z<=r.z)?(s=i,i=i.nextZ,o--):(s=r,r=r.nextZ,l--),a?a.nextZ=s:n=s,s.prevZ=a,a=s;i=r}a.nextZ=null,t*=2}while(e>1);return n}function nu(n,e,t,i,s){return n=(n-t)*s|0,e=(e-i)*s|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,n|e<<1}function vv(n){let e=n,t=n;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==n);return t}function Wp(n,e,t,i,s,a,r,o){return(s-r)*(e-o)>=(n-r)*(a-o)&&(n-r)*(i-o)>=(t-r)*(e-o)&&(t-r)*(a-o)>=(s-r)*(i-o)}function va(n,e,t,i,s,a,r,o){return!(n===r&&e===o)&&Wp(n,e,t,i,s,a,r,o)}function yv(n,e){return n.next.i!==e.i&&n.prev.i!==e.i&&!bv(n,e)&&($a(n,e)&&$a(e,n)&&xv(n,e)&&(yt(n.prev,n,e.prev)||yt(n,e.prev,e))||js(n,e)&&yt(n.prev,n,n.next)>0&&yt(e.prev,e,e.next)>0)}function yt(n,e,t){return(e.y-n.y)*(t.x-e.x)-(e.x-n.x)*(t.y-e.y)}function js(n,e){return n.x===e.x&&n.y===e.y}function $p(n,e,t,i){const s=Ur(yt(n,e,t)),a=Ur(yt(n,e,i)),r=Ur(yt(t,i,n)),o=Ur(yt(t,i,e));return!!(s!==a&&r!==o||s===0&&Dr(n,t,e)||a===0&&Dr(n,i,e)||r===0&&Dr(t,n,i)||o===0&&Dr(t,e,i))}function Dr(n,e,t){return e.x<=Math.max(n.x,t.x)&&e.x>=Math.min(n.x,t.x)&&e.y<=Math.max(n.y,t.y)&&e.y>=Math.min(n.y,t.y)}function Ur(n){return n>0?1:n<0?-1:0}function bv(n,e){let t=n;do{if(t.i!==n.i&&t.next.i!==n.i&&t.i!==e.i&&t.next.i!==e.i&&$p(t,t.next,n,e))return!0;t=t.next}while(t!==n);return!1}function $a(n,e){return yt(n.prev,n,n.next)<0?yt(n,e,n.next)>=0&&yt(n,n.prev,e)>=0:yt(n,e,n.prev)<0||yt(n,n.next,e)<0}function xv(n,e){let t=n,i=!1;const s=(n.x+e.x)/2,a=(n.y+e.y)/2;do t.y>a!=t.next.y>a&&t.next.y!==t.y&&s<(t.next.x-t.x)*(a-t.y)/(t.next.y-t.y)+t.x&&(i=!i),t=t.next;while(t!==n);return i}function Xp(n,e){const t=iu(n.i,n.x,n.y),i=iu(e.i,e.x,e.y),s=n.next,a=e.prev;return n.next=e,e.prev=n,t.next=s,s.prev=t,i.next=t,t.prev=i,a.next=i,i.prev=a,i}function ah(n,e,t,i){const s=iu(n,e,t);return i?(s.next=i.next,s.prev=i,i.next.prev=s,i.next=s):(s.prev=s,s.next=s),s}function Xa(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function iu(n,e,t){return{i:n,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Sv(n,e,t,i){let s=0;for(let a=e,r=t-i;a<t;a+=i)s+=(n[r]-n[a])*(n[a+1]+n[r+1]),r=a;return s}class wv{static triangulate(e,t,i=2){return rv(e,t,i)}}class Ca{static area(e){const t=e.length;let i=0;for(let s=t-1,a=0;a<t;s=a++)i+=e[s].x*e[a].y-e[a].x*e[s].y;return i*.5}static isClockWise(e){return Ca.area(e)<0}static triangulateShape(e,t){const i=[],s=[],a=[];rh(e),oh(i,e);let r=e.length;t.forEach(rh);for(let l=0;l<t.length;l++)s.push(r),r+=t[l].length,oh(i,t[l]);const o=wv.triangulate(i,s);for(let l=0;l<o.length;l+=3)a.push(o.slice(l,l+3));return a}}function rh(n){const e=n.length;e>2&&n[e-1].equals(n[0])&&n.pop()}function oh(n,e){for(let t=0;t<e.length;t++)n.push(e[t].x),n.push(e[t].y)}class rn extends Tt{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const a=e/2,r=t/2,o=Math.floor(i),l=Math.floor(s),c=o+1,u=l+1,d=e/o,h=t/l,f=[],g=[],_=[],m=[];for(let p=0;p<u;p++){const w=p*h-r;for(let S=0;S<c;S++){const v=S*d-a;g.push(v,-w,0),_.push(0,0,1),m.push(S/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let w=0;w<o;w++){const S=w+c*p,v=w+c*(p+1),R=w+1+c*(p+1),T=w+1+c*p;f.push(S,v,T),f.push(v,R,T)}this.setIndex(f),this.setAttribute("position",new ct(g,3)),this.setAttribute("normal",new ct(_,3)),this.setAttribute("uv",new ct(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new rn(e.width,e.height,e.widthSegments,e.heightSegments)}}class cs extends Tt{constructor(e=.5,t=1,i=32,s=1,a=0,r=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:s,thetaStart:a,thetaLength:r},i=Math.max(3,i),s=Math.max(1,s);const o=[],l=[],c=[],u=[];let d=e;const h=(t-e)/s,f=new L,g=new le;for(let _=0;_<=s;_++){for(let m=0;m<=i;m++){const p=a+m/i*r;f.x=d*Math.cos(p),f.y=d*Math.sin(p),l.push(f.x,f.y,f.z),c.push(0,0,1),g.x=(f.x/t+1)/2,g.y=(f.y/t+1)/2,u.push(g.x,g.y)}d+=h}for(let _=0;_<s;_++){const m=_*(i+1);for(let p=0;p<i;p++){const w=p+m,S=w,v=w+i+1,R=w+i+2,T=w+1;o.push(S,v,T),o.push(v,R,T)}}this.setIndex(o),this.setAttribute("position",new ct(l,3)),this.setAttribute("normal",new ct(c,3)),this.setAttribute("uv",new ct(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new cs(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class qo extends Tt{constructor(e=new id([new le(0,.5),new le(-.5,-.5),new le(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};const i=[],s=[],a=[],r=[];let o=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let u=0;u<e.length;u++)c(e[u]),this.addGroup(o,l,u),o+=l,l=0;this.setIndex(i),this.setAttribute("position",new ct(s,3)),this.setAttribute("normal",new ct(a,3)),this.setAttribute("uv",new ct(r,2));function c(u){const d=s.length/3,h=u.extractPoints(t);let f=h.shape;const g=h.holes;Ca.isClockWise(f)===!1&&(f=f.reverse());for(let m=0,p=g.length;m<p;m++){const w=g[m];Ca.isClockWise(w)===!0&&(g[m]=w.reverse())}const _=Ca.triangulateShape(f,g);for(let m=0,p=g.length;m<p;m++){const w=g[m];f=f.concat(w)}for(let m=0,p=f.length;m<p;m++){const w=f[m];s.push(w.x,w.y,0),a.push(0,0,1),r.push(w.x,w.y)}for(let m=0,p=_.length;m<p;m++){const w=_[m],S=w[0]+d,v=w[1]+d,R=w[2]+d;i.push(S,v,R),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes;return Mv(t,e)}static fromJSON(e,t){const i=[];for(let s=0,a=e.shapes.length;s<a;s++){const r=t[e.shapes[s]];i.push(r)}return new qo(i,e.curveSegments)}}function Mv(n,e){if(e.shapes=[],Array.isArray(n))for(let t=0,i=n.length;t<i;t++){const s=n[t];e.shapes.push(s.uuid)}else e.shapes.push(n.uuid);return e}class Js extends Tt{constructor(e=1,t=32,i=16,s=0,a=Math.PI*2,r=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:s,phiLength:a,thetaStart:r,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(r+o,Math.PI);let c=0;const u=[],d=new L,h=new L,f=[],g=[],_=[],m=[];for(let p=0;p<=i;p++){const w=[],S=p/i;let v=0;p===0&&r===0?v=.5/t:p===i&&l===Math.PI&&(v=-.5/t);for(let R=0;R<=t;R++){const T=R/t;d.x=-e*Math.cos(s+T*a)*Math.sin(r+S*o),d.y=e*Math.cos(r+S*o),d.z=e*Math.sin(s+T*a)*Math.sin(r+S*o),g.push(d.x,d.y,d.z),h.copy(d).normalize(),_.push(h.x,h.y,h.z),m.push(T+v,1-S),w.push(c++)}u.push(w)}for(let p=0;p<i;p++)for(let w=0;w<t;w++){const S=u[p][w+1],v=u[p][w],R=u[p+1][w],T=u[p+1][w+1];(p!==0||r>0)&&f.push(S,v,T),(p!==i-1||l<Math.PI)&&f.push(v,R,T)}this.setIndex(f),this.setAttribute("position",new ct(g,3)),this.setAttribute("normal",new ct(_,3)),this.setAttribute("uv",new ct(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Js(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Mo extends Pi{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new qe(16777215),this.specular=new qe(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new qe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Yu,this.normalScale=new le(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new In,this.combine=Vo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class qp extends Pi{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new qe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new qe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Yu,this.normalScale=new le(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new In,this.combine=Vo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Ev extends Pi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=W_,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Tv extends Pi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Yp extends Pt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new qe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}const Fl=new gt,lh=new L,ch=new L;class Av{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new le(512,512),this.mapType=Gn,this.map=null,this.mapPass=null,this.matrix=new gt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ju,this._frameExtents=new le(1,1),this._viewportCount=1,this._viewports=[new St(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;lh.setFromMatrixPosition(e.matrixWorld),t.position.copy(lh),ch.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(ch),t.updateMatrixWorld(),Fl.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Fl,t.coordinateSystem,t.reversedDepth),t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Fl)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Zp extends Ip{constructor(e=-1,t=1,i=1,s=-1,a=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=a,this.far=r,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,a,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=a,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let a=i-e,r=i+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=c*this.view.offsetX,r=a+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(a,r,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Cv extends Av{constructor(){super(new Zp(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class uh extends Yp{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Pt.DEFAULT_UP),this.updateMatrix(),this.target=new Pt,this.shadow=new Cv}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Rv extends Yp{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class Pv extends pn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class dh{constructor(e=1,t=0,i=0){this.radius=e,this.phi=t,this.theta=i}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Xe(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(Xe(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const hh=new L;let Fr,Ol;class Lv extends Pt{constructor(e=new L(0,0,1),t=new L(0,0,0),i=1,s=16776960,a=i*.2,r=a*.2){super(),this.type="ArrowHelper",Fr===void 0&&(Fr=new Tt,Fr.setAttribute("position",new ct([0,0,0,0,1,0],3)),Ol=new Ga(.5,1,5,1),Ol.translate(0,-.5,0)),this.position.copy(t),this.line=new Qu(Fr,new $o({color:s,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new ze(Ol,new lt({color:s,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(e),this.setLength(i,a,r)}setDirection(e){if(e.y>.99999)this.quaternion.set(0,0,0,1);else if(e.y<-.99999)this.quaternion.set(1,0,0,0);else{hh.set(e.z,0,-e.x).normalize();const t=Math.acos(e.y);this.quaternion.setFromAxisAngle(hh,t)}}setLength(e,t=e*.2,i=t*.2){this.line.scale.set(1,Math.max(1e-4,e-t),1),this.line.updateMatrix(),this.cone.scale.set(i,t,i),this.cone.position.y=e,this.cone.updateMatrix()}setColor(e){this.line.material.color.set(e),this.cone.material.color.set(e)}copy(e){return super.copy(e,!1),this.line.copy(e.line),this.cone.copy(e.cone),this}dispose(){this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}}class Iv extends os{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function fh(n,e,t,i){const s=Nv(i);switch(t){case bp:return n*e;case Sp:return n*e/s.components*s.byteLength;case $u:return n*e/s.components*s.byteLength;case wp:return n*e*2/s.components*s.byteLength;case Xu:return n*e*2/s.components*s.byteLength;case xp:return n*e*3/s.components*s.byteLength;case Rn:return n*e*4/s.components*s.byteLength;case qu:return n*e*4/s.components*s.byteLength;case Kr:case jr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Jr:case Qr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Cc:case Pc:return Math.max(n,16)*Math.max(e,8)/4;case Ac:case Rc:return Math.max(n,8)*Math.max(e,8)/2;case Lc:case Ic:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Nc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Dc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Uc:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Fc:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Oc:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case kc:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Bc:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case zc:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Hc:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Vc:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Gc:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Wc:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case $c:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Xc:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case qc:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Yc:case Zc:case Kc:return Math.ceil(n/4)*Math.ceil(e/4)*16;case jc:case Jc:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Qc:case eu:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Nv(n){switch(n){case Gn:case gp:return{byteLength:1,components:1};case Oa:case _p:case ir:return{byteLength:2,components:1};case Gu:case Wu:return{byteLength:2,components:4};case ts:case Vu:case ni:return{byteLength:4,components:1};case vp:case yp:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");function Kp(){let n=null,e=!1,t=null,i=null;function s(a,r){t(a,r),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(a){t=a},setContext:function(a){n=a}}}function Dv(n){const e=new WeakMap;function t(o,l){const c=o.array,u=o.usage,d=c.byteLength,h=n.createBuffer();n.bindBuffer(l,h),n.bufferData(l,c,u),o.onUploadCallback();let f;if(c instanceof Float32Array)f=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=n.HALF_FLOAT:f=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=n.SHORT;else if(c instanceof Uint32Array)f=n.UNSIGNED_INT;else if(c instanceof Int32Array)f=n.INT;else if(c instanceof Int8Array)f=n.BYTE;else if(c instanceof Uint8Array)f=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function i(o,l,c){const u=l.array,d=l.updateRanges;if(n.bindBuffer(c,o),d.length===0)n.bufferSubData(c,0,u);else{d.sort((f,g)=>f.start-g.start);let h=0;for(let f=1;f<d.length;f++){const g=d[h],_=d[f];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++h,d[h]=_)}d.length=h+1;for(let f=0,g=d.length;f<g;f++){const _=d[f];n.bufferSubData(c,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function a(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(n.deleteBuffer(l.buffer),e.delete(o))}function r(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:s,remove:a,update:r}}var Uv=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Fv=`#ifdef USE_ALPHAHASH
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
#endif`,Ov=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,kv=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Bv=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,zv=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Hv=`#ifdef USE_AOMAP
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
#endif`,Vv=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Gv=`#ifdef USE_BATCHING
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
#endif`,Wv=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,$v=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Xv=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,qv=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Yv=`#ifdef USE_IRIDESCENCE
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
#endif`,Zv=`#ifdef USE_BUMPMAP
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
#endif`,Kv=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,jv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Jv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Qv=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ey=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,ty=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,ny=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,iy=`#if defined( USE_COLOR_ALPHA )
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
#endif`,sy=`#define PI 3.141592653589793
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
} // validated`,ay=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,ry=`vec3 transformedNormal = objectNormal;
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
#endif`,oy=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,ly=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,cy=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,uy=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,dy="gl_FragColor = linearToOutputTexel( gl_FragColor );",hy=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,fy=`#ifdef USE_ENVMAP
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
#endif`,py=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,my=`#ifdef USE_ENVMAP
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
#endif`,gy=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,_y=`#ifdef USE_ENVMAP
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
#endif`,vy=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,yy=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,by=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,xy=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Sy=`#ifdef USE_GRADIENTMAP
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
}`,wy=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,My=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Ey=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Ty=`uniform bool receiveShadow;
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
#endif`,Ay=`#ifdef USE_ENVMAP
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
#endif`,Cy=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Ry=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Py=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Ly=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Iy=`PhysicalMaterial material;
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
#endif`,Ny=`struct PhysicalMaterial {
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
}`,Dy=`
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
#endif`,Uy=`#if defined( RE_IndirectDiffuse )
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
#endif`,Fy=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Oy=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,ky=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,By=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,zy=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Hy=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Vy=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Gy=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Wy=`#if defined( USE_POINTS_UV )
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
#endif`,$y=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Xy=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,qy=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Yy=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Zy=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ky=`#ifdef USE_MORPHTARGETS
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
#endif`,jy=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Jy=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Qy=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,eb=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,tb=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,nb=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,ib=`#ifdef USE_NORMALMAP
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
#endif`,sb=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ab=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,rb=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ob=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,lb=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,cb=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,ub=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,db=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,hb=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,fb=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,pb=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,mb=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,gb=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,_b=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,vb=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,yb=`float getShadowMask() {
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
}`,bb=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,xb=`#ifdef USE_SKINNING
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
#endif`,Sb=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,wb=`#ifdef USE_SKINNING
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
#endif`,Mb=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Eb=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Tb=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Ab=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Cb=`#ifdef USE_TRANSMISSION
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
#endif`,Rb=`#ifdef USE_TRANSMISSION
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
#endif`,Pb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Lb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ib=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Nb=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Db=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Ub=`uniform sampler2D t2D;
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
}`,Fb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ob=`#ifdef ENVMAP_TYPE_CUBE
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
}`,kb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Bb=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,zb=`#include <common>
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
}`,Hb=`#if DEPTH_PACKING == 3200
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
}`,Vb=`#define DISTANCE
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
}`,Gb=`#define DISTANCE
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
}`,Wb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,$b=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Xb=`uniform float scale;
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
}`,qb=`uniform vec3 diffuse;
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
}`,Yb=`#include <common>
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
}`,Zb=`uniform vec3 diffuse;
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
}`,Kb=`#define LAMBERT
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
}`,jb=`#define LAMBERT
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
}`,Jb=`#define MATCAP
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
}`,Qb=`#define MATCAP
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
}`,ex=`#define NORMAL
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
}`,tx=`#define NORMAL
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
}`,nx=`#define PHONG
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
}`,ix=`#define PHONG
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
}`,sx=`#define STANDARD
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
}`,ax=`#define STANDARD
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
}`,rx=`#define TOON
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
}`,ox=`#define TOON
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
}`,lx=`uniform float size;
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
}`,cx=`uniform vec3 diffuse;
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
}`,ux=`#include <common>
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
}`,dx=`uniform vec3 color;
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
}`,hx=`uniform float rotation;
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
}`,fx=`uniform vec3 diffuse;
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
}`,$e={alphahash_fragment:Uv,alphahash_pars_fragment:Fv,alphamap_fragment:Ov,alphamap_pars_fragment:kv,alphatest_fragment:Bv,alphatest_pars_fragment:zv,aomap_fragment:Hv,aomap_pars_fragment:Vv,batching_pars_vertex:Gv,batching_vertex:Wv,begin_vertex:$v,beginnormal_vertex:Xv,bsdfs:qv,iridescence_fragment:Yv,bumpmap_pars_fragment:Zv,clipping_planes_fragment:Kv,clipping_planes_pars_fragment:jv,clipping_planes_pars_vertex:Jv,clipping_planes_vertex:Qv,color_fragment:ey,color_pars_fragment:ty,color_pars_vertex:ny,color_vertex:iy,common:sy,cube_uv_reflection_fragment:ay,defaultnormal_vertex:ry,displacementmap_pars_vertex:oy,displacementmap_vertex:ly,emissivemap_fragment:cy,emissivemap_pars_fragment:uy,colorspace_fragment:dy,colorspace_pars_fragment:hy,envmap_fragment:fy,envmap_common_pars_fragment:py,envmap_pars_fragment:my,envmap_pars_vertex:gy,envmap_physical_pars_fragment:Ay,envmap_vertex:_y,fog_vertex:vy,fog_pars_vertex:yy,fog_fragment:by,fog_pars_fragment:xy,gradientmap_pars_fragment:Sy,lightmap_pars_fragment:wy,lights_lambert_fragment:My,lights_lambert_pars_fragment:Ey,lights_pars_begin:Ty,lights_toon_fragment:Cy,lights_toon_pars_fragment:Ry,lights_phong_fragment:Py,lights_phong_pars_fragment:Ly,lights_physical_fragment:Iy,lights_physical_pars_fragment:Ny,lights_fragment_begin:Dy,lights_fragment_maps:Uy,lights_fragment_end:Fy,logdepthbuf_fragment:Oy,logdepthbuf_pars_fragment:ky,logdepthbuf_pars_vertex:By,logdepthbuf_vertex:zy,map_fragment:Hy,map_pars_fragment:Vy,map_particle_fragment:Gy,map_particle_pars_fragment:Wy,metalnessmap_fragment:$y,metalnessmap_pars_fragment:Xy,morphinstance_vertex:qy,morphcolor_vertex:Yy,morphnormal_vertex:Zy,morphtarget_pars_vertex:Ky,morphtarget_vertex:jy,normal_fragment_begin:Jy,normal_fragment_maps:Qy,normal_pars_fragment:eb,normal_pars_vertex:tb,normal_vertex:nb,normalmap_pars_fragment:ib,clearcoat_normal_fragment_begin:sb,clearcoat_normal_fragment_maps:ab,clearcoat_pars_fragment:rb,iridescence_pars_fragment:ob,opaque_fragment:lb,packing:cb,premultiplied_alpha_fragment:ub,project_vertex:db,dithering_fragment:hb,dithering_pars_fragment:fb,roughnessmap_fragment:pb,roughnessmap_pars_fragment:mb,shadowmap_pars_fragment:gb,shadowmap_pars_vertex:_b,shadowmap_vertex:vb,shadowmask_pars_fragment:yb,skinbase_vertex:bb,skinning_pars_vertex:xb,skinning_vertex:Sb,skinnormal_vertex:wb,specularmap_fragment:Mb,specularmap_pars_fragment:Eb,tonemapping_fragment:Tb,tonemapping_pars_fragment:Ab,transmission_fragment:Cb,transmission_pars_fragment:Rb,uv_pars_fragment:Pb,uv_pars_vertex:Lb,uv_vertex:Ib,worldpos_vertex:Nb,background_vert:Db,background_frag:Ub,backgroundCube_vert:Fb,backgroundCube_frag:Ob,cube_vert:kb,cube_frag:Bb,depth_vert:zb,depth_frag:Hb,distanceRGBA_vert:Vb,distanceRGBA_frag:Gb,equirect_vert:Wb,equirect_frag:$b,linedashed_vert:Xb,linedashed_frag:qb,meshbasic_vert:Yb,meshbasic_frag:Zb,meshlambert_vert:Kb,meshlambert_frag:jb,meshmatcap_vert:Jb,meshmatcap_frag:Qb,meshnormal_vert:ex,meshnormal_frag:tx,meshphong_vert:nx,meshphong_frag:ix,meshphysical_vert:sx,meshphysical_frag:ax,meshtoon_vert:rx,meshtoon_frag:ox,points_vert:lx,points_frag:cx,shadow_vert:ux,shadow_frag:dx,sprite_vert:hx,sprite_frag:fx},ue={common:{diffuse:{value:new qe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ve}},envmap:{envMap:{value:null},envMapRotation:{value:new Ve},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ve}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ve}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ve},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ve},normalScale:{value:new le(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ve},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ve}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ve}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ve}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new qe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new qe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0},uvTransform:{value:new Ve}},sprite:{diffuse:{value:new qe(16777215)},opacity:{value:1},center:{value:new le(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}}},Fn={basic:{uniforms:Gt([ue.common,ue.specularmap,ue.envmap,ue.aomap,ue.lightmap,ue.fog]),vertexShader:$e.meshbasic_vert,fragmentShader:$e.meshbasic_frag},lambert:{uniforms:Gt([ue.common,ue.specularmap,ue.envmap,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.fog,ue.lights,{emissive:{value:new qe(0)}}]),vertexShader:$e.meshlambert_vert,fragmentShader:$e.meshlambert_frag},phong:{uniforms:Gt([ue.common,ue.specularmap,ue.envmap,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.fog,ue.lights,{emissive:{value:new qe(0)},specular:{value:new qe(1118481)},shininess:{value:30}}]),vertexShader:$e.meshphong_vert,fragmentShader:$e.meshphong_frag},standard:{uniforms:Gt([ue.common,ue.envmap,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.roughnessmap,ue.metalnessmap,ue.fog,ue.lights,{emissive:{value:new qe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:$e.meshphysical_vert,fragmentShader:$e.meshphysical_frag},toon:{uniforms:Gt([ue.common,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.gradientmap,ue.fog,ue.lights,{emissive:{value:new qe(0)}}]),vertexShader:$e.meshtoon_vert,fragmentShader:$e.meshtoon_frag},matcap:{uniforms:Gt([ue.common,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.fog,{matcap:{value:null}}]),vertexShader:$e.meshmatcap_vert,fragmentShader:$e.meshmatcap_frag},points:{uniforms:Gt([ue.points,ue.fog]),vertexShader:$e.points_vert,fragmentShader:$e.points_frag},dashed:{uniforms:Gt([ue.common,ue.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:$e.linedashed_vert,fragmentShader:$e.linedashed_frag},depth:{uniforms:Gt([ue.common,ue.displacementmap]),vertexShader:$e.depth_vert,fragmentShader:$e.depth_frag},normal:{uniforms:Gt([ue.common,ue.bumpmap,ue.normalmap,ue.displacementmap,{opacity:{value:1}}]),vertexShader:$e.meshnormal_vert,fragmentShader:$e.meshnormal_frag},sprite:{uniforms:Gt([ue.sprite,ue.fog]),vertexShader:$e.sprite_vert,fragmentShader:$e.sprite_frag},background:{uniforms:{uvTransform:{value:new Ve},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:$e.background_vert,fragmentShader:$e.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ve}},vertexShader:$e.backgroundCube_vert,fragmentShader:$e.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:$e.cube_vert,fragmentShader:$e.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:$e.equirect_vert,fragmentShader:$e.equirect_frag},distanceRGBA:{uniforms:Gt([ue.common,ue.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:$e.distanceRGBA_vert,fragmentShader:$e.distanceRGBA_frag},shadow:{uniforms:Gt([ue.lights,ue.fog,{color:{value:new qe(0)},opacity:{value:1}}]),vertexShader:$e.shadow_vert,fragmentShader:$e.shadow_frag}};Fn.physical={uniforms:Gt([Fn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ve},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ve},clearcoatNormalScale:{value:new le(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ve},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ve},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ve},sheen:{value:0},sheenColor:{value:new qe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ve},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ve},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ve},transmissionSamplerSize:{value:new le},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ve},attenuationDistance:{value:0},attenuationColor:{value:new qe(0)},specularColor:{value:new qe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ve},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ve},anisotropyVector:{value:new le},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ve}}]),vertexShader:$e.meshphysical_vert,fragmentShader:$e.meshphysical_frag};const Or={r:0,b:0,g:0},Bi=new In,px=new gt;function mx(n,e,t,i,s,a,r){const o=new qe(0);let l=a===!0?0:1,c,u,d=null,h=0,f=null;function g(S){let v=S.isScene===!0?S.background:null;return v&&v.isTexture&&(v=(S.backgroundBlurriness>0?t:e).get(v)),v}function _(S){let v=!1;const R=g(S);R===null?p(o,l):R&&R.isColor&&(p(R,1),v=!0);const T=n.xr.getEnvironmentBlendMode();T==="additive"?i.buffers.color.setClear(0,0,0,1,r):T==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,r),(n.autoClear||v)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(S,v){const R=g(v);R&&(R.isCubeTexture||R.mapping===Go)?(u===void 0&&(u=new ze(new ls(1,1,1),new Ai({name:"BackgroundCubeMaterial",uniforms:Ks(Fn.backgroundCube.uniforms),vertexShader:Fn.backgroundCube.vertexShader,fragmentShader:Fn.backgroundCube.fragmentShader,side:jt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(T,E,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),Bi.copy(v.backgroundRotation),Bi.x*=-1,Bi.y*=-1,Bi.z*=-1,R.isCubeTexture&&R.isRenderTargetTexture===!1&&(Bi.y*=-1,Bi.z*=-1),u.material.uniforms.envMap.value=R,u.material.uniforms.flipEnvMap.value=R.isCubeTexture&&R.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(px.makeRotationFromEuler(Bi)),u.material.toneMapped=Qe.getTransfer(R.colorSpace)!==at,(d!==R||h!==R.version||f!==n.toneMapping)&&(u.material.needsUpdate=!0,d=R,h=R.version,f=n.toneMapping),u.layers.enableAll(),S.unshift(u,u.geometry,u.material,0,0,null)):R&&R.isTexture&&(c===void 0&&(c=new ze(new rn(2,2),new Ai({name:"BackgroundMaterial",uniforms:Ks(Fn.background.uniforms),vertexShader:Fn.background.vertexShader,fragmentShader:Fn.background.fragmentShader,side:Ei,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=R,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.toneMapped=Qe.getTransfer(R.colorSpace)!==at,R.matrixAutoUpdate===!0&&R.updateMatrix(),c.material.uniforms.uvTransform.value.copy(R.matrix),(d!==R||h!==R.version||f!==n.toneMapping)&&(c.material.needsUpdate=!0,d=R,h=R.version,f=n.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null))}function p(S,v){S.getRGB(Or,Lp(n)),i.buffers.color.setClear(Or.r,Or.g,Or.b,v,r)}function w(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(S,v=1){o.set(S),l=v,p(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(S){l=S,p(o,l)},render:_,addToRenderList:m,dispose:w}}function gx(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=h(null);let a=s,r=!1;function o(b,C,N,z,V){let G=!1;const B=d(z,N,C);a!==B&&(a=B,c(a.object)),G=f(b,z,N,V),G&&g(b,z,N,V),V!==null&&e.update(V,n.ELEMENT_ARRAY_BUFFER),(G||r)&&(r=!1,v(b,C,N,z),V!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(V).buffer))}function l(){return n.createVertexArray()}function c(b){return n.bindVertexArray(b)}function u(b){return n.deleteVertexArray(b)}function d(b,C,N){const z=N.wireframe===!0;let V=i[b.id];V===void 0&&(V={},i[b.id]=V);let G=V[C.id];G===void 0&&(G={},V[C.id]=G);let B=G[z];return B===void 0&&(B=h(l()),G[z]=B),B}function h(b){const C=[],N=[],z=[];for(let V=0;V<t;V++)C[V]=0,N[V]=0,z[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:N,attributeDivisors:z,object:b,attributes:{},index:null}}function f(b,C,N,z){const V=a.attributes,G=C.attributes;let B=0;const U=N.getAttributes();for(const O in U)if(U[O].location>=0){const Q=V[O];let se=G[O];if(se===void 0&&(O==="instanceMatrix"&&b.instanceMatrix&&(se=b.instanceMatrix),O==="instanceColor"&&b.instanceColor&&(se=b.instanceColor)),Q===void 0||Q.attribute!==se||se&&Q.data!==se.data)return!0;B++}return a.attributesNum!==B||a.index!==z}function g(b,C,N,z){const V={},G=C.attributes;let B=0;const U=N.getAttributes();for(const O in U)if(U[O].location>=0){let Q=G[O];Q===void 0&&(O==="instanceMatrix"&&b.instanceMatrix&&(Q=b.instanceMatrix),O==="instanceColor"&&b.instanceColor&&(Q=b.instanceColor));const se={};se.attribute=Q,Q&&Q.data&&(se.data=Q.data),V[O]=se,B++}a.attributes=V,a.attributesNum=B,a.index=z}function _(){const b=a.newAttributes;for(let C=0,N=b.length;C<N;C++)b[C]=0}function m(b){p(b,0)}function p(b,C){const N=a.newAttributes,z=a.enabledAttributes,V=a.attributeDivisors;N[b]=1,z[b]===0&&(n.enableVertexAttribArray(b),z[b]=1),V[b]!==C&&(n.vertexAttribDivisor(b,C),V[b]=C)}function w(){const b=a.newAttributes,C=a.enabledAttributes;for(let N=0,z=C.length;N<z;N++)C[N]!==b[N]&&(n.disableVertexAttribArray(N),C[N]=0)}function S(b,C,N,z,V,G,B){B===!0?n.vertexAttribIPointer(b,C,N,V,G):n.vertexAttribPointer(b,C,N,z,V,G)}function v(b,C,N,z){_();const V=z.attributes,G=N.getAttributes(),B=C.defaultAttributeValues;for(const U in G){const O=G[U];if(O.location>=0){let Z=V[U];if(Z===void 0&&(U==="instanceMatrix"&&b.instanceMatrix&&(Z=b.instanceMatrix),U==="instanceColor"&&b.instanceColor&&(Z=b.instanceColor)),Z!==void 0){const Q=Z.normalized,se=Z.itemSize,ge=e.get(Z);if(ge===void 0)continue;const Me=ge.buffer,he=ge.type,_e=ge.bytesPerElement,X=he===n.INT||he===n.UNSIGNED_INT||Z.gpuType===Vu;if(Z.isInterleavedBufferAttribute){const K=Z.data,pe=K.stride,xe=Z.offset;if(K.isInstancedInterleavedBuffer){for(let Se=0;Se<O.locationSize;Se++)p(O.location+Se,K.meshPerAttribute);b.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let Se=0;Se<O.locationSize;Se++)m(O.location+Se);n.bindBuffer(n.ARRAY_BUFFER,Me);for(let Se=0;Se<O.locationSize;Se++)S(O.location+Se,se/O.locationSize,he,Q,pe*_e,(xe+se/O.locationSize*Se)*_e,X)}else{if(Z.isInstancedBufferAttribute){for(let K=0;K<O.locationSize;K++)p(O.location+K,Z.meshPerAttribute);b.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=Z.meshPerAttribute*Z.count)}else for(let K=0;K<O.locationSize;K++)m(O.location+K);n.bindBuffer(n.ARRAY_BUFFER,Me);for(let K=0;K<O.locationSize;K++)S(O.location+K,se/O.locationSize,he,Q,se*_e,se/O.locationSize*K*_e,X)}}else if(B!==void 0){const Q=B[U];if(Q!==void 0)switch(Q.length){case 2:n.vertexAttrib2fv(O.location,Q);break;case 3:n.vertexAttrib3fv(O.location,Q);break;case 4:n.vertexAttrib4fv(O.location,Q);break;default:n.vertexAttrib1fv(O.location,Q)}}}}w()}function R(){A();for(const b in i){const C=i[b];for(const N in C){const z=C[N];for(const V in z)u(z[V].object),delete z[V];delete C[N]}delete i[b]}}function T(b){if(i[b.id]===void 0)return;const C=i[b.id];for(const N in C){const z=C[N];for(const V in z)u(z[V].object),delete z[V];delete C[N]}delete i[b.id]}function E(b){for(const C in i){const N=i[C];if(N[b.id]===void 0)continue;const z=N[b.id];for(const V in z)u(z[V].object),delete z[V];delete N[b.id]}}function A(){y(),r=!0,a!==s&&(a=s,c(a.object))}function y(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:A,resetDefaultState:y,dispose:R,releaseStatesOfGeometry:T,releaseStatesOfProgram:E,initAttributes:_,enableAttribute:m,disableUnusedAttributes:w}}function _x(n,e,t){let i;function s(c){i=c}function a(c,u){n.drawArrays(i,c,u),t.update(u,i,1)}function r(c,u,d){d!==0&&(n.drawArraysInstanced(i,c,u,d),t.update(u,i,d))}function o(c,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,u,0,d);let f=0;for(let g=0;g<d;g++)f+=u[g];t.update(f,i,1)}function l(c,u,d,h){if(d===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<c.length;g++)r(c[g],u[g],h[g]);else{f.multiDrawArraysInstancedWEBGL(i,c,0,u,0,h,0,d);let g=0;for(let _=0;_<d;_++)g+=u[_]*h[_];t.update(g,i,1)}}this.setMode=s,this.render=a,this.renderInstances=r,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function vx(n,e,t,i){let s;function a(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const E=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function r(E){return!(E!==Rn&&i.convert(E)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(E){const A=E===ir&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(E!==Gn&&i.convert(E)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&E!==ni&&!A)}function l(E){if(E==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const d=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),w=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),S=n.getParameter(n.MAX_VARYING_VECTORS),v=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),R=g>0,T=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:l,textureFormatReadable:r,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:h,maxTextures:f,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:w,maxVaryings:S,maxFragmentUniforms:v,vertexTextures:R,maxSamples:T}}function yx(n){const e=this;let t=null,i=0,s=!1,a=!1;const r=new mi,o=new Ve,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){const f=d.length!==0||h||i!==0||s;return s=h,i=d.length,f},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(d,h){t=u(d,h,0)},this.setState=function(d,h,f){const g=d.clippingPlanes,_=d.clipIntersection,m=d.clipShadows,p=n.get(d);if(!s||g===null||g.length===0||a&&!m)a?u(null):c();else{const w=a?0:i,S=w*4;let v=p.clippingState||null;l.value=v,v=u(g,h,S,f);for(let R=0;R!==S;++R)v[R]=t[R];p.clippingState=v,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=w}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(d,h,f,g){const _=d!==null?d.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const p=f+_*4,w=h.matrixWorldInverse;o.getNormalMatrix(w),(m===null||m.length<p)&&(m=new Float32Array(p));for(let S=0,v=f;S!==_;++S,v+=4)r.copy(d[S]).applyMatrix4(w,o),r.normal.toArray(m,v),m[v+3]=r.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function bx(n){let e=new WeakMap;function t(r,o){return o===wc?r.mapping=qs:o===Mc&&(r.mapping=Ys),r}function i(r){if(r&&r.isTexture){const o=r.mapping;if(o===wc||o===Mc)if(e.has(r)){const l=e.get(r).texture;return t(l,r.mapping)}else{const l=r.image;if(l&&l.height>0){const c=new z0(l.height);return c.fromEquirectangularTexture(n,r),e.set(r,c),r.addEventListener("dispose",s),t(c.texture,r.mapping)}else return null}}return r}function s(r){const o=r.target;o.removeEventListener("dispose",s);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function a(){e=new WeakMap}return{get:i,dispose:a}}const Us=4,ph=[.125,.215,.35,.446,.526,.582],qi=20,kl=new Zp,mh=new qe;let Bl=null,zl=0,Hl=0,Vl=!1;const Wi=(1+Math.sqrt(5))/2,Cs=1/Wi,gh=[new L(-Wi,Cs,0),new L(Wi,Cs,0),new L(-Cs,0,Wi),new L(Cs,0,Wi),new L(0,Wi,-Cs),new L(0,Wi,Cs),new L(-1,1,-1),new L(1,1,-1),new L(-1,1,1),new L(1,1,1)],xx=new L;class _h{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,s=100,a={}){const{size:r=256,position:o=xx}=a;Bl=this._renderer.getRenderTarget(),zl=this._renderer.getActiveCubeFace(),Hl=this._renderer.getActiveMipmapLevel(),Vl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(r);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,s,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=bh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=yh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Bl,zl,Hl),this._renderer.xr.enabled=Vl,e.scissorTest=!1,kr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===qs||e.mapping===Ys?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Bl=this._renderer.getRenderTarget(),zl=this._renderer.getActiveCubeFace(),Hl=this._renderer.getActiveMipmapLevel(),Vl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:On,minFilter:On,generateMipmaps:!1,type:ir,format:Rn,colorSpace:Zs,depthBuffer:!1},s=vh(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=vh(e,t,i);const{_lodMax:a}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Sx(a)),this._blurMaterial=wx(a,e,t)}return s}_compileMaterial(e){const t=new ze(this._lodPlanes[0],e);this._renderer.compile(t,kl)}_sceneToCubeUV(e,t,i,s,a){const l=new pn(90,1,t,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,h=d.autoClear,f=d.toneMapping;d.getClearColor(mh),d.toneMapping=xi,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null));const _=new lt({name:"PMREM.Background",side:jt,depthWrite:!1,depthTest:!1}),m=new ze(new ls,_);let p=!1;const w=e.background;w?w.isColor&&(_.color.copy(w),e.background=null,p=!0):(_.color.copy(mh),p=!0);for(let S=0;S<6;S++){const v=S%3;v===0?(l.up.set(0,c[S],0),l.position.set(a.x,a.y,a.z),l.lookAt(a.x+u[S],a.y,a.z)):v===1?(l.up.set(0,0,c[S]),l.position.set(a.x,a.y,a.z),l.lookAt(a.x,a.y+u[S],a.z)):(l.up.set(0,c[S],0),l.position.set(a.x,a.y,a.z),l.lookAt(a.x,a.y,a.z+u[S]));const R=this._cubeSize;kr(s,v*R,S>2?R:0,R,R),d.setRenderTarget(s),p&&d.render(m,l),d.render(e,l)}m.geometry.dispose(),m.material.dispose(),d.toneMapping=f,d.autoClear=h,e.background=w}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===qs||e.mapping===Ys;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=bh()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=yh());const a=s?this._cubemapMaterial:this._equirectMaterial,r=new ze(this._lodPlanes[0],a),o=a.uniforms;o.envMap.value=e;const l=this._cubeSize;kr(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(r,kl)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let a=1;a<s;a++){const r=Math.sqrt(this._sigmas[a]*this._sigmas[a]-this._sigmas[a-1]*this._sigmas[a-1]),o=gh[(s-a-1)%gh.length];this._blur(e,a-1,a,r,o)}t.autoClear=i}_blur(e,t,i,s,a){const r=this._pingPongRenderTarget;this._halfBlur(e,r,t,i,s,"latitudinal",a),this._halfBlur(r,e,i,i,s,"longitudinal",a)}_halfBlur(e,t,i,s,a,r,o){const l=this._renderer,c=this._blurMaterial;r!=="latitudinal"&&r!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,d=new ze(this._lodPlanes[s],c),h=c.uniforms,f=this._sizeLods[i]-1,g=isFinite(a)?Math.PI/(2*f):2*Math.PI/(2*qi-1),_=a/g,m=isFinite(a)?1+Math.floor(u*_):qi;m>qi&&console.warn(`sigmaRadians, ${a}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${qi}`);const p=[];let w=0;for(let E=0;E<qi;++E){const A=E/_,y=Math.exp(-A*A/2);p.push(y),E===0?w+=y:E<m&&(w+=2*y)}for(let E=0;E<p.length;E++)p[E]=p[E]/w;h.envMap.value=e.texture,h.samples.value=m,h.weights.value=p,h.latitudinal.value=r==="latitudinal",o&&(h.poleAxis.value=o);const{_lodMax:S}=this;h.dTheta.value=g,h.mipInt.value=S-i;const v=this._sizeLods[s],R=3*v*(s>S-Us?s-S+Us:0),T=4*(this._cubeSize-v);kr(t,R,T,3*v,2*v),l.setRenderTarget(t),l.render(d,kl)}}function Sx(n){const e=[],t=[],i=[];let s=n;const a=n-Us+1+ph.length;for(let r=0;r<a;r++){const o=Math.pow(2,s);t.push(o);let l=1/o;r>n-Us?l=ph[r-n+Us-1]:r===0&&(l=0),i.push(l);const c=1/(o-2),u=-c,d=1+c,h=[u,u,d,u,d,d,u,u,d,d,u,d],f=6,g=6,_=3,m=2,p=1,w=new Float32Array(_*g*f),S=new Float32Array(m*g*f),v=new Float32Array(p*g*f);for(let T=0;T<f;T++){const E=T%3*2/3-1,A=T>2?0:-1,y=[E,A,0,E+2/3,A,0,E+2/3,A+1,0,E,A,0,E+2/3,A+1,0,E,A+1,0];w.set(y,_*g*T),S.set(h,m*g*T);const b=[T,T,T,T,T,T];v.set(b,p*g*T)}const R=new Tt;R.setAttribute("position",new Ln(w,_)),R.setAttribute("uv",new Ln(S,m)),R.setAttribute("faceIndex",new Ln(v,p)),e.push(R),s>Us&&s--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function vh(n,e,t){const i=new ns(n,e,t);return i.texture.mapping=Go,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function kr(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function wx(n,e,t){const i=new Float32Array(qi),s=new L(0,1,0);return new Ai({name:"SphericalGaussianBlur",defines:{n:qi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:sd(),fragmentShader:`

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
		`,blending:yi,depthTest:!1,depthWrite:!1})}function yh(){return new Ai({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:sd(),fragmentShader:`

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
		`,blending:yi,depthTest:!1,depthWrite:!1})}function bh(){return new Ai({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:sd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:yi,depthTest:!1,depthWrite:!1})}function sd(){return`

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
	`}function Mx(n){let e=new WeakMap,t=null;function i(o){if(o&&o.isTexture){const l=o.mapping,c=l===wc||l===Mc,u=l===qs||l===Ys;if(c||u){let d=e.get(o);const h=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==h)return t===null&&(t=new _h(n)),d=c?t.fromEquirectangular(o,d):t.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),d.texture;if(d!==void 0)return d.texture;{const f=o.image;return c&&f&&f.height>0||u&&f&&s(f)?(t===null&&(t=new _h(n)),d=c?t.fromEquirectangular(o):t.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),o.addEventListener("dispose",a),d.texture):null}}}return o}function s(o){let l=0;const c=6;for(let u=0;u<c;u++)o[u]!==void 0&&l++;return l===c}function a(o){const l=o.target;l.removeEventListener("dispose",a);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function r(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:r}}function Ex(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const s=t(i);return s===null&&Va("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function Tx(n,e,t,i){const s={},a=new WeakMap;function r(d){const h=d.target;h.index!==null&&e.remove(h.index);for(const g in h.attributes)e.remove(h.attributes[g]);h.removeEventListener("dispose",r),delete s[h.id];const f=a.get(h);f&&(e.remove(f),a.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function o(d,h){return s[h.id]===!0||(h.addEventListener("dispose",r),s[h.id]=!0,t.memory.geometries++),h}function l(d){const h=d.attributes;for(const f in h)e.update(h[f],n.ARRAY_BUFFER)}function c(d){const h=[],f=d.index,g=d.attributes.position;let _=0;if(f!==null){const w=f.array;_=f.version;for(let S=0,v=w.length;S<v;S+=3){const R=w[S+0],T=w[S+1],E=w[S+2];h.push(R,T,T,E,E,R)}}else if(g!==void 0){const w=g.array;_=g.version;for(let S=0,v=w.length/3-1;S<v;S+=3){const R=S+0,T=S+1,E=S+2;h.push(R,T,T,E,E,R)}}else return;const m=new(Ep(h)?Pp:Rp)(h,1);m.version=_;const p=a.get(d);p&&e.remove(p),a.set(d,m)}function u(d){const h=a.get(d);if(h){const f=d.index;f!==null&&h.version<f.version&&c(d)}else c(d);return a.get(d)}return{get:o,update:l,getWireframeAttribute:u}}function Ax(n,e,t){let i;function s(h){i=h}let a,r;function o(h){a=h.type,r=h.bytesPerElement}function l(h,f){n.drawElements(i,f,a,h*r),t.update(f,i,1)}function c(h,f,g){g!==0&&(n.drawElementsInstanced(i,f,a,h*r,g),t.update(f,i,g))}function u(h,f,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,a,h,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];t.update(m,i,1)}function d(h,f,g,_){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<h.length;p++)c(h[p]/r,f[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(i,f,0,a,h,0,_,0,g);let p=0;for(let w=0;w<g;w++)p+=f[w]*_[w];t.update(p,i,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function Cx(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(a,r,o){switch(t.calls++,r){case n.TRIANGLES:t.triangles+=o*(a/3);break;case n.LINES:t.lines+=o*(a/2);break;case n.LINE_STRIP:t.lines+=o*(a-1);break;case n.LINE_LOOP:t.lines+=o*a;break;case n.POINTS:t.points+=o*a;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",r);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function Rx(n,e,t){const i=new WeakMap,s=new St;function a(r,o,l){const c=r.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u!==void 0?u.length:0;let h=i.get(o);if(h===void 0||h.count!==d){let y=function(){E.dispose(),i.delete(o),o.removeEventListener("dispose",y)};h!==void 0&&h.texture.dispose();const f=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],w=o.morphAttributes.color||[];let S=0;f===!0&&(S=1),g===!0&&(S=2),_===!0&&(S=3);let v=o.attributes.position.count*S,R=1;v>e.maxTextureSize&&(R=Math.ceil(v/e.maxTextureSize),v=e.maxTextureSize);const T=new Float32Array(v*R*4*d),E=new Tp(T,v,R,d);E.type=ni,E.needsUpdate=!0;const A=S*4;for(let b=0;b<d;b++){const C=m[b],N=p[b],z=w[b],V=v*R*4*b;for(let G=0;G<C.count;G++){const B=G*A;f===!0&&(s.fromBufferAttribute(C,G),T[V+B+0]=s.x,T[V+B+1]=s.y,T[V+B+2]=s.z,T[V+B+3]=0),g===!0&&(s.fromBufferAttribute(N,G),T[V+B+4]=s.x,T[V+B+5]=s.y,T[V+B+6]=s.z,T[V+B+7]=0),_===!0&&(s.fromBufferAttribute(z,G),T[V+B+8]=s.x,T[V+B+9]=s.y,T[V+B+10]=s.z,T[V+B+11]=z.itemSize===4?s.w:1)}}h={count:d,texture:E,size:new le(v,R)},i.set(o,h),o.addEventListener("dispose",y)}if(r.isInstancedMesh===!0&&r.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",r.morphTexture,t);else{let f=0;for(let _=0;_<c.length;_++)f+=c[_];const g=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(n,"morphTargetBaseInfluence",g),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:a}}function Px(n,e,t,i){let s=new WeakMap;function a(l){const c=i.render.frame,u=l.geometry,d=e.get(l,u);if(s.get(d)!==c&&(e.update(d),s.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const h=l.skeleton;s.get(h)!==c&&(h.update(),s.set(h,c))}return d}function r(){s=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:a,dispose:r}}const jp=new Xt,xh=new Op(1,1),Jp=new Tp,Qp=new w0,em=new Np,Sh=[],wh=[],Mh=new Float32Array(16),Eh=new Float32Array(9),Th=new Float32Array(4);function ta(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let a=Sh[s];if(a===void 0&&(a=new Float32Array(s),Sh[s]=a),e!==0){i.toArray(a,0);for(let r=1,o=0;r!==e;++r)o+=t,n[r].toArray(a,o)}return a}function Lt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function It(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Yo(n,e){let t=wh[e];t===void 0&&(t=new Int32Array(e),wh[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function Lx(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function Ix(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Lt(t,e))return;n.uniform2fv(this.addr,e),It(t,e)}}function Nx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Lt(t,e))return;n.uniform3fv(this.addr,e),It(t,e)}}function Dx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Lt(t,e))return;n.uniform4fv(this.addr,e),It(t,e)}}function Ux(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Lt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),It(t,e)}else{if(Lt(t,i))return;Th.set(i),n.uniformMatrix2fv(this.addr,!1,Th),It(t,i)}}function Fx(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Lt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),It(t,e)}else{if(Lt(t,i))return;Eh.set(i),n.uniformMatrix3fv(this.addr,!1,Eh),It(t,i)}}function Ox(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Lt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),It(t,e)}else{if(Lt(t,i))return;Mh.set(i),n.uniformMatrix4fv(this.addr,!1,Mh),It(t,i)}}function kx(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function Bx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Lt(t,e))return;n.uniform2iv(this.addr,e),It(t,e)}}function zx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Lt(t,e))return;n.uniform3iv(this.addr,e),It(t,e)}}function Hx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Lt(t,e))return;n.uniform4iv(this.addr,e),It(t,e)}}function Vx(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function Gx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Lt(t,e))return;n.uniform2uiv(this.addr,e),It(t,e)}}function Wx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Lt(t,e))return;n.uniform3uiv(this.addr,e),It(t,e)}}function $x(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Lt(t,e))return;n.uniform4uiv(this.addr,e),It(t,e)}}function Xx(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let a;this.type===n.SAMPLER_2D_SHADOW?(xh.compareFunction=Mp,a=xh):a=jp,t.setTexture2D(e||a,s)}function qx(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||Qp,s)}function Yx(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||em,s)}function Zx(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||Jp,s)}function Kx(n){switch(n){case 5126:return Lx;case 35664:return Ix;case 35665:return Nx;case 35666:return Dx;case 35674:return Ux;case 35675:return Fx;case 35676:return Ox;case 5124:case 35670:return kx;case 35667:case 35671:return Bx;case 35668:case 35672:return zx;case 35669:case 35673:return Hx;case 5125:return Vx;case 36294:return Gx;case 36295:return Wx;case 36296:return $x;case 35678:case 36198:case 36298:case 36306:case 35682:return Xx;case 35679:case 36299:case 36307:return qx;case 35680:case 36300:case 36308:case 36293:return Yx;case 36289:case 36303:case 36311:case 36292:return Zx}}function jx(n,e){n.uniform1fv(this.addr,e)}function Jx(n,e){const t=ta(e,this.size,2);n.uniform2fv(this.addr,t)}function Qx(n,e){const t=ta(e,this.size,3);n.uniform3fv(this.addr,t)}function eS(n,e){const t=ta(e,this.size,4);n.uniform4fv(this.addr,t)}function tS(n,e){const t=ta(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function nS(n,e){const t=ta(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function iS(n,e){const t=ta(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function sS(n,e){n.uniform1iv(this.addr,e)}function aS(n,e){n.uniform2iv(this.addr,e)}function rS(n,e){n.uniform3iv(this.addr,e)}function oS(n,e){n.uniform4iv(this.addr,e)}function lS(n,e){n.uniform1uiv(this.addr,e)}function cS(n,e){n.uniform2uiv(this.addr,e)}function uS(n,e){n.uniform3uiv(this.addr,e)}function dS(n,e){n.uniform4uiv(this.addr,e)}function hS(n,e,t){const i=this.cache,s=e.length,a=Yo(t,s);Lt(i,a)||(n.uniform1iv(this.addr,a),It(i,a));for(let r=0;r!==s;++r)t.setTexture2D(e[r]||jp,a[r])}function fS(n,e,t){const i=this.cache,s=e.length,a=Yo(t,s);Lt(i,a)||(n.uniform1iv(this.addr,a),It(i,a));for(let r=0;r!==s;++r)t.setTexture3D(e[r]||Qp,a[r])}function pS(n,e,t){const i=this.cache,s=e.length,a=Yo(t,s);Lt(i,a)||(n.uniform1iv(this.addr,a),It(i,a));for(let r=0;r!==s;++r)t.setTextureCube(e[r]||em,a[r])}function mS(n,e,t){const i=this.cache,s=e.length,a=Yo(t,s);Lt(i,a)||(n.uniform1iv(this.addr,a),It(i,a));for(let r=0;r!==s;++r)t.setTexture2DArray(e[r]||Jp,a[r])}function gS(n){switch(n){case 5126:return jx;case 35664:return Jx;case 35665:return Qx;case 35666:return eS;case 35674:return tS;case 35675:return nS;case 35676:return iS;case 5124:case 35670:return sS;case 35667:case 35671:return aS;case 35668:case 35672:return rS;case 35669:case 35673:return oS;case 5125:return lS;case 36294:return cS;case 36295:return uS;case 36296:return dS;case 35678:case 36198:case 36298:case 36306:case 35682:return hS;case 35679:case 36299:case 36307:return fS;case 35680:case 36300:case 36308:case 36293:return pS;case 36289:case 36303:case 36311:case 36292:return mS}}class _S{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Kx(t.type)}}class vS{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=gS(t.type)}}class yS{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let a=0,r=s.length;a!==r;++a){const o=s[a];o.setValue(e,t[o.id],i)}}}const Gl=/(\w+)(\])?(\[|\.)?/g;function Ah(n,e){n.seq.push(e),n.map[e.id]=e}function bS(n,e,t){const i=n.name,s=i.length;for(Gl.lastIndex=0;;){const a=Gl.exec(i),r=Gl.lastIndex;let o=a[1];const l=a[2]==="]",c=a[3];if(l&&(o=o|0),c===void 0||c==="["&&r+2===s){Ah(t,c===void 0?new _S(o,n,e):new vS(o,n,e));break}else{let d=t.map[o];d===void 0&&(d=new yS(o),Ah(t,d)),t=d}}}class eo{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const a=e.getActiveUniform(t,s),r=e.getUniformLocation(t,a.name);bS(a,r,this)}}setValue(e,t,i,s){const a=this.map[t];a!==void 0&&a.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let a=0,r=t.length;a!==r;++a){const o=t[a],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,a=e.length;s!==a;++s){const r=e[s];r.id in t&&i.push(r)}return i}}function Ch(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const xS=37297;let SS=0;function wS(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),a=Math.min(e+6,t.length);for(let r=s;r<a;r++){const o=r+1;i.push(`${o===e?">":" "} ${o}: ${t[r]}`)}return i.join(`
`)}const Rh=new Ve;function MS(n){Qe._getMatrix(Rh,Qe.workingColorSpace,n);const e=`mat3( ${Rh.elements.map(t=>t.toFixed(4))} )`;switch(Qe.getTransfer(n)){case vo:return[e,"LinearTransferOETF"];case at:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Ph(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),a=(n.getShaderInfoLog(e)||"").trim();if(i&&a==="")return"";const r=/ERROR: 0:(\d+)/.exec(a);if(r){const o=parseInt(r[1]);return t.toUpperCase()+`

`+a+`

`+wS(n.getShaderSource(e),o)}else return a}function ES(n,e){const t=MS(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function TS(n,e){let t;switch(e){case F_:t="Linear";break;case O_:t="Reinhard";break;case k_:t="Cineon";break;case B_:t="ACESFilmic";break;case H_:t="AgX";break;case V_:t="Neutral";break;case z_:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Br=new L;function AS(){Qe.getLuminanceCoefficients(Br);const n=Br.x.toFixed(4),e=Br.y.toFixed(4),t=Br.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function CS(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ya).join(`
`)}function RS(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function PS(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const a=n.getActiveAttrib(e,s),r=a.name;let o=1;a.type===n.FLOAT_MAT2&&(o=2),a.type===n.FLOAT_MAT3&&(o=3),a.type===n.FLOAT_MAT4&&(o=4),t[r]={type:a.type,location:n.getAttribLocation(e,r),locationSize:o}}return t}function ya(n){return n!==""}function Lh(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Ih(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const LS=/^[ \t]*#include +<([\w\d./]+)>/gm;function su(n){return n.replace(LS,NS)}const IS=new Map;function NS(n,e){let t=$e[e];if(t===void 0){const i=IS.get(e);if(i!==void 0)t=$e[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return su(t)}const DS=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Nh(n){return n.replace(DS,US)}function US(n,e,t,i){let s="";for(let a=parseInt(e);a<parseInt(t);a++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return s}function Dh(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}function FS(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===pp?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===m_?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Jn&&(e="SHADOWMAP_TYPE_VSM"),e}function OS(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case qs:case Ys:e="ENVMAP_TYPE_CUBE";break;case Go:e="ENVMAP_TYPE_CUBE_UV";break}return e}function kS(n){let e="ENVMAP_MODE_REFLECTION";return n.envMap&&n.envMapMode===Ys&&(e="ENVMAP_MODE_REFRACTION"),e}function BS(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Vo:e="ENVMAP_BLENDING_MULTIPLY";break;case D_:e="ENVMAP_BLENDING_MIX";break;case U_:e="ENVMAP_BLENDING_ADD";break}return e}function zS(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function HS(n,e,t,i){const s=n.getContext(),a=t.defines;let r=t.vertexShader,o=t.fragmentShader;const l=FS(t),c=OS(t),u=kS(t),d=BS(t),h=zS(t),f=CS(t),g=RS(a),_=s.createProgram();let m,p,w=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(ya).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(ya).join(`
`),p.length>0&&(p+=`
`)):(m=[Dh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ya).join(`
`),p=[Dh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==xi?"#define TONE_MAPPING":"",t.toneMapping!==xi?$e.tonemapping_pars_fragment:"",t.toneMapping!==xi?TS("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",$e.colorspace_pars_fragment,ES("linearToOutputTexel",t.outputColorSpace),AS(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ya).join(`
`)),r=su(r),r=Lh(r,t),r=Ih(r,t),o=su(o),o=Lh(o,t),o=Ih(o,t),r=Nh(r),o=Nh(o),t.isRawShaderMaterial!==!0&&(w=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===Nd?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Nd?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const S=w+m+r,v=w+p+o,R=Ch(s,s.VERTEX_SHADER,S),T=Ch(s,s.FRAGMENT_SHADER,v);s.attachShader(_,R),s.attachShader(_,T),t.index0AttributeName!==void 0?s.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function E(C){if(n.debug.checkShaderErrors){const N=s.getProgramInfoLog(_)||"",z=s.getShaderInfoLog(R)||"",V=s.getShaderInfoLog(T)||"",G=N.trim(),B=z.trim(),U=V.trim();let O=!0,Z=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(O=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,_,R,T);else{const Q=Ph(s,R,"vertex"),se=Ph(s,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+G+`
`+Q+`
`+se)}else G!==""?console.warn("THREE.WebGLProgram: Program Info Log:",G):(B===""||U==="")&&(Z=!1);Z&&(C.diagnostics={runnable:O,programLog:G,vertexShader:{log:B,prefix:m},fragmentShader:{log:U,prefix:p}})}s.deleteShader(R),s.deleteShader(T),A=new eo(s,_),y=PS(s,_)}let A;this.getUniforms=function(){return A===void 0&&E(this),A};let y;this.getAttributes=function(){return y===void 0&&E(this),y};let b=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return b===!1&&(b=s.getProgramParameter(_,xS)),b},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=SS++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=R,this.fragmentShader=T,this}let VS=0;class GS{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,s=this._getShaderStage(t),a=this._getShaderStage(i),r=this._getShaderCacheForMaterial(e);return r.has(s)===!1&&(r.add(s),s.usedTimes++),r.has(a)===!1&&(r.add(a),a.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new WS(e),t.set(e,i)),i}}class WS{constructor(e){this.id=VS++,this.code=e,this.usedTimes=0}}function $S(n,e,t,i,s,a,r){const o=new Ap,l=new GS,c=new Set,u=[],d=s.logarithmicDepthBuffer,h=s.vertexTextures;let f=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(y){return c.add(y),y===0?"uv":`uv${y}`}function m(y,b,C,N,z){const V=N.fog,G=z.geometry,B=y.isMeshStandardMaterial?N.environment:null,U=(y.isMeshStandardMaterial?t:e).get(y.envMap||B),O=U&&U.mapping===Go?U.image.height:null,Z=g[y.type];y.precision!==null&&(f=s.getMaxPrecision(y.precision),f!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",f,"instead."));const Q=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,se=Q!==void 0?Q.length:0;let ge=0;G.morphAttributes.position!==void 0&&(ge=1),G.morphAttributes.normal!==void 0&&(ge=2),G.morphAttributes.color!==void 0&&(ge=3);let Me,he,_e,X;if(Z){const tt=Fn[Z];Me=tt.vertexShader,he=tt.fragmentShader}else Me=y.vertexShader,he=y.fragmentShader,l.update(y),_e=l.getVertexShaderID(y),X=l.getFragmentShaderID(y);const K=n.getRenderTarget(),pe=n.state.buffers.depth.getReversed(),xe=z.isInstancedMesh===!0,Se=z.isBatchedMesh===!0,Ge=!!y.map,bt=!!y.matcap,I=!!U,it=!!y.aoMap,Be=!!y.lightMap,Fe=!!y.bumpMap,Ee=!!y.normalMap,pt=!!y.displacementMap,Te=!!y.emissiveMap,We=!!y.metalnessMap,Nt=!!y.roughnessMap,Mt=y.anisotropy>0,P=y.clearcoat>0,x=y.dispersion>0,H=y.iridescence>0,Y=y.sheen>0,J=y.transmission>0,q=Mt&&!!y.anisotropyMap,Pe=P&&!!y.clearcoatMap,oe=P&&!!y.clearcoatNormalMap,Ae=P&&!!y.clearcoatRoughnessMap,Ce=H&&!!y.iridescenceMap,ne=H&&!!y.iridescenceThicknessMap,me=Y&&!!y.sheenColorMap,Ue=Y&&!!y.sheenRoughnessMap,Re=!!y.specularMap,de=!!y.specularColorMap,He=!!y.specularIntensityMap,D=J&&!!y.transmissionMap,ie=J&&!!y.thicknessMap,ce=!!y.gradientMap,ye=!!y.alphaMap,ee=y.alphaTest>0,j=!!y.alphaHash,we=!!y.extensions;let ke=xi;y.toneMapped&&(K===null||K.isXRRenderTarget===!0)&&(ke=n.toneMapping);const ut={shaderID:Z,shaderType:y.type,shaderName:y.name,vertexShader:Me,fragmentShader:he,defines:y.defines,customVertexShaderID:_e,customFragmentShaderID:X,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:f,batching:Se,batchingColor:Se&&z._colorsTexture!==null,instancing:xe,instancingColor:xe&&z.instanceColor!==null,instancingMorph:xe&&z.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:K===null?n.outputColorSpace:K.isXRRenderTarget===!0?K.texture.colorSpace:Zs,alphaToCoverage:!!y.alphaToCoverage,map:Ge,matcap:bt,envMap:I,envMapMode:I&&U.mapping,envMapCubeUVHeight:O,aoMap:it,lightMap:Be,bumpMap:Fe,normalMap:Ee,displacementMap:h&&pt,emissiveMap:Te,normalMapObjectSpace:Ee&&y.normalMapType===X_,normalMapTangentSpace:Ee&&y.normalMapType===Yu,metalnessMap:We,roughnessMap:Nt,anisotropy:Mt,anisotropyMap:q,clearcoat:P,clearcoatMap:Pe,clearcoatNormalMap:oe,clearcoatRoughnessMap:Ae,dispersion:x,iridescence:H,iridescenceMap:Ce,iridescenceThicknessMap:ne,sheen:Y,sheenColorMap:me,sheenRoughnessMap:Ue,specularMap:Re,specularColorMap:de,specularIntensityMap:He,transmission:J,transmissionMap:D,thicknessMap:ie,gradientMap:ce,opaque:y.transparent===!1&&y.blending===Bs&&y.alphaToCoverage===!1,alphaMap:ye,alphaTest:ee,alphaHash:j,combine:y.combine,mapUv:Ge&&_(y.map.channel),aoMapUv:it&&_(y.aoMap.channel),lightMapUv:Be&&_(y.lightMap.channel),bumpMapUv:Fe&&_(y.bumpMap.channel),normalMapUv:Ee&&_(y.normalMap.channel),displacementMapUv:pt&&_(y.displacementMap.channel),emissiveMapUv:Te&&_(y.emissiveMap.channel),metalnessMapUv:We&&_(y.metalnessMap.channel),roughnessMapUv:Nt&&_(y.roughnessMap.channel),anisotropyMapUv:q&&_(y.anisotropyMap.channel),clearcoatMapUv:Pe&&_(y.clearcoatMap.channel),clearcoatNormalMapUv:oe&&_(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ae&&_(y.clearcoatRoughnessMap.channel),iridescenceMapUv:Ce&&_(y.iridescenceMap.channel),iridescenceThicknessMapUv:ne&&_(y.iridescenceThicknessMap.channel),sheenColorMapUv:me&&_(y.sheenColorMap.channel),sheenRoughnessMapUv:Ue&&_(y.sheenRoughnessMap.channel),specularMapUv:Re&&_(y.specularMap.channel),specularColorMapUv:de&&_(y.specularColorMap.channel),specularIntensityMapUv:He&&_(y.specularIntensityMap.channel),transmissionMapUv:D&&_(y.transmissionMap.channel),thicknessMapUv:ie&&_(y.thicknessMap.channel),alphaMapUv:ye&&_(y.alphaMap.channel),vertexTangents:!!G.attributes.tangent&&(Ee||Mt),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,pointsUvs:z.isPoints===!0&&!!G.attributes.uv&&(Ge||ye),fog:!!V,useFog:y.fog===!0,fogExp2:!!V&&V.isFogExp2,flatShading:y.flatShading===!0&&y.wireframe===!1,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:pe,skinning:z.isSkinnedMesh===!0,morphTargets:G.morphAttributes.position!==void 0,morphNormals:G.morphAttributes.normal!==void 0,morphColors:G.morphAttributes.color!==void 0,morphTargetsCount:se,morphTextureStride:ge,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:y.dithering,shadowMapEnabled:n.shadowMap.enabled&&C.length>0,shadowMapType:n.shadowMap.type,toneMapping:ke,decodeVideoTexture:Ge&&y.map.isVideoTexture===!0&&Qe.getTransfer(y.map.colorSpace)===at,decodeVideoTextureEmissive:Te&&y.emissiveMap.isVideoTexture===!0&&Qe.getTransfer(y.emissiveMap.colorSpace)===at,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===et,flipSided:y.side===jt,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:we&&y.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(we&&y.extensions.multiDraw===!0||Se)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return ut.vertexUv1s=c.has(1),ut.vertexUv2s=c.has(2),ut.vertexUv3s=c.has(3),c.clear(),ut}function p(y){const b=[];if(y.shaderID?b.push(y.shaderID):(b.push(y.customVertexShaderID),b.push(y.customFragmentShaderID)),y.defines!==void 0)for(const C in y.defines)b.push(C),b.push(y.defines[C]);return y.isRawShaderMaterial===!1&&(w(b,y),S(b,y),b.push(n.outputColorSpace)),b.push(y.customProgramCacheKey),b.join()}function w(y,b){y.push(b.precision),y.push(b.outputColorSpace),y.push(b.envMapMode),y.push(b.envMapCubeUVHeight),y.push(b.mapUv),y.push(b.alphaMapUv),y.push(b.lightMapUv),y.push(b.aoMapUv),y.push(b.bumpMapUv),y.push(b.normalMapUv),y.push(b.displacementMapUv),y.push(b.emissiveMapUv),y.push(b.metalnessMapUv),y.push(b.roughnessMapUv),y.push(b.anisotropyMapUv),y.push(b.clearcoatMapUv),y.push(b.clearcoatNormalMapUv),y.push(b.clearcoatRoughnessMapUv),y.push(b.iridescenceMapUv),y.push(b.iridescenceThicknessMapUv),y.push(b.sheenColorMapUv),y.push(b.sheenRoughnessMapUv),y.push(b.specularMapUv),y.push(b.specularColorMapUv),y.push(b.specularIntensityMapUv),y.push(b.transmissionMapUv),y.push(b.thicknessMapUv),y.push(b.combine),y.push(b.fogExp2),y.push(b.sizeAttenuation),y.push(b.morphTargetsCount),y.push(b.morphAttributeCount),y.push(b.numDirLights),y.push(b.numPointLights),y.push(b.numSpotLights),y.push(b.numSpotLightMaps),y.push(b.numHemiLights),y.push(b.numRectAreaLights),y.push(b.numDirLightShadows),y.push(b.numPointLightShadows),y.push(b.numSpotLightShadows),y.push(b.numSpotLightShadowsWithMaps),y.push(b.numLightProbes),y.push(b.shadowMapType),y.push(b.toneMapping),y.push(b.numClippingPlanes),y.push(b.numClipIntersection),y.push(b.depthPacking)}function S(y,b){o.disableAll(),b.supportsVertexTextures&&o.enable(0),b.instancing&&o.enable(1),b.instancingColor&&o.enable(2),b.instancingMorph&&o.enable(3),b.matcap&&o.enable(4),b.envMap&&o.enable(5),b.normalMapObjectSpace&&o.enable(6),b.normalMapTangentSpace&&o.enable(7),b.clearcoat&&o.enable(8),b.iridescence&&o.enable(9),b.alphaTest&&o.enable(10),b.vertexColors&&o.enable(11),b.vertexAlphas&&o.enable(12),b.vertexUv1s&&o.enable(13),b.vertexUv2s&&o.enable(14),b.vertexUv3s&&o.enable(15),b.vertexTangents&&o.enable(16),b.anisotropy&&o.enable(17),b.alphaHash&&o.enable(18),b.batching&&o.enable(19),b.dispersion&&o.enable(20),b.batchingColor&&o.enable(21),b.gradientMap&&o.enable(22),y.push(o.mask),o.disableAll(),b.fog&&o.enable(0),b.useFog&&o.enable(1),b.flatShading&&o.enable(2),b.logarithmicDepthBuffer&&o.enable(3),b.reversedDepthBuffer&&o.enable(4),b.skinning&&o.enable(5),b.morphTargets&&o.enable(6),b.morphNormals&&o.enable(7),b.morphColors&&o.enable(8),b.premultipliedAlpha&&o.enable(9),b.shadowMapEnabled&&o.enable(10),b.doubleSided&&o.enable(11),b.flipSided&&o.enable(12),b.useDepthPacking&&o.enable(13),b.dithering&&o.enable(14),b.transmission&&o.enable(15),b.sheen&&o.enable(16),b.opaque&&o.enable(17),b.pointsUvs&&o.enable(18),b.decodeVideoTexture&&o.enable(19),b.decodeVideoTextureEmissive&&o.enable(20),b.alphaToCoverage&&o.enable(21),y.push(o.mask)}function v(y){const b=g[y.type];let C;if(b){const N=Fn[b];C=F0.clone(N.uniforms)}else C=y.uniforms;return C}function R(y,b){let C;for(let N=0,z=u.length;N<z;N++){const V=u[N];if(V.cacheKey===b){C=V,++C.usedTimes;break}}return C===void 0&&(C=new HS(n,b,y,a),u.push(C)),C}function T(y){if(--y.usedTimes===0){const b=u.indexOf(y);u[b]=u[u.length-1],u.pop(),y.destroy()}}function E(y){l.remove(y)}function A(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:v,acquireProgram:R,releaseProgram:T,releaseShaderCache:E,programs:u,dispose:A}}function XS(){let n=new WeakMap;function e(r){return n.has(r)}function t(r){let o=n.get(r);return o===void 0&&(o={},n.set(r,o)),o}function i(r){n.delete(r)}function s(r,o,l){n.get(r)[o]=l}function a(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:a}}function qS(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function Uh(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Fh(){const n=[];let e=0;const t=[],i=[],s=[];function a(){e=0,t.length=0,i.length=0,s.length=0}function r(d,h,f,g,_,m){let p=n[e];return p===void 0?(p={id:d.id,object:d,geometry:h,material:f,groupOrder:g,renderOrder:d.renderOrder,z:_,group:m},n[e]=p):(p.id=d.id,p.object=d,p.geometry=h,p.material=f,p.groupOrder=g,p.renderOrder=d.renderOrder,p.z=_,p.group=m),e++,p}function o(d,h,f,g,_,m){const p=r(d,h,f,g,_,m);f.transmission>0?i.push(p):f.transparent===!0?s.push(p):t.push(p)}function l(d,h,f,g,_,m){const p=r(d,h,f,g,_,m);f.transmission>0?i.unshift(p):f.transparent===!0?s.unshift(p):t.unshift(p)}function c(d,h){t.length>1&&t.sort(d||qS),i.length>1&&i.sort(h||Uh),s.length>1&&s.sort(h||Uh)}function u(){for(let d=e,h=n.length;d<h;d++){const f=n[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:i,transparent:s,init:a,push:o,unshift:l,finish:u,sort:c}}function YS(){let n=new WeakMap;function e(i,s){const a=n.get(i);let r;return a===void 0?(r=new Fh,n.set(i,[r])):s>=a.length?(r=new Fh,a.push(r)):r=a[s],r}function t(){n=new WeakMap}return{get:e,dispose:t}}function ZS(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new L,color:new qe};break;case"SpotLight":t={position:new L,direction:new L,color:new qe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new L,color:new qe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new L,skyColor:new qe,groundColor:new qe};break;case"RectAreaLight":t={color:new qe,position:new L,halfWidth:new L,halfHeight:new L};break}return n[e.id]=t,t}}}function KS(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new le};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new le};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new le,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let jS=0;function JS(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function QS(n){const e=new ZS,t=KS(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new L);const s=new L,a=new gt,r=new gt;function o(c){let u=0,d=0,h=0;for(let y=0;y<9;y++)i.probe[y].set(0,0,0);let f=0,g=0,_=0,m=0,p=0,w=0,S=0,v=0,R=0,T=0,E=0;c.sort(JS);for(let y=0,b=c.length;y<b;y++){const C=c[y],N=C.color,z=C.intensity,V=C.distance,G=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)u+=N.r*z,d+=N.g*z,h+=N.b*z;else if(C.isLightProbe){for(let B=0;B<9;B++)i.probe[B].addScaledVector(C.sh.coefficients[B],z);E++}else if(C.isDirectionalLight){const B=e.get(C);if(B.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const U=C.shadow,O=t.get(C);O.shadowIntensity=U.intensity,O.shadowBias=U.bias,O.shadowNormalBias=U.normalBias,O.shadowRadius=U.radius,O.shadowMapSize=U.mapSize,i.directionalShadow[f]=O,i.directionalShadowMap[f]=G,i.directionalShadowMatrix[f]=C.shadow.matrix,w++}i.directional[f]=B,f++}else if(C.isSpotLight){const B=e.get(C);B.position.setFromMatrixPosition(C.matrixWorld),B.color.copy(N).multiplyScalar(z),B.distance=V,B.coneCos=Math.cos(C.angle),B.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),B.decay=C.decay,i.spot[_]=B;const U=C.shadow;if(C.map&&(i.spotLightMap[R]=C.map,R++,U.updateMatrices(C),C.castShadow&&T++),i.spotLightMatrix[_]=U.matrix,C.castShadow){const O=t.get(C);O.shadowIntensity=U.intensity,O.shadowBias=U.bias,O.shadowNormalBias=U.normalBias,O.shadowRadius=U.radius,O.shadowMapSize=U.mapSize,i.spotShadow[_]=O,i.spotShadowMap[_]=G,v++}_++}else if(C.isRectAreaLight){const B=e.get(C);B.color.copy(N).multiplyScalar(z),B.halfWidth.set(C.width*.5,0,0),B.halfHeight.set(0,C.height*.5,0),i.rectArea[m]=B,m++}else if(C.isPointLight){const B=e.get(C);if(B.color.copy(C.color).multiplyScalar(C.intensity),B.distance=C.distance,B.decay=C.decay,C.castShadow){const U=C.shadow,O=t.get(C);O.shadowIntensity=U.intensity,O.shadowBias=U.bias,O.shadowNormalBias=U.normalBias,O.shadowRadius=U.radius,O.shadowMapSize=U.mapSize,O.shadowCameraNear=U.camera.near,O.shadowCameraFar=U.camera.far,i.pointShadow[g]=O,i.pointShadowMap[g]=G,i.pointShadowMatrix[g]=C.shadow.matrix,S++}i.point[g]=B,g++}else if(C.isHemisphereLight){const B=e.get(C);B.skyColor.copy(C.color).multiplyScalar(z),B.groundColor.copy(C.groundColor).multiplyScalar(z),i.hemi[p]=B,p++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ue.LTC_FLOAT_1,i.rectAreaLTC2=ue.LTC_FLOAT_2):(i.rectAreaLTC1=ue.LTC_HALF_1,i.rectAreaLTC2=ue.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=d,i.ambient[2]=h;const A=i.hash;(A.directionalLength!==f||A.pointLength!==g||A.spotLength!==_||A.rectAreaLength!==m||A.hemiLength!==p||A.numDirectionalShadows!==w||A.numPointShadows!==S||A.numSpotShadows!==v||A.numSpotMaps!==R||A.numLightProbes!==E)&&(i.directional.length=f,i.spot.length=_,i.rectArea.length=m,i.point.length=g,i.hemi.length=p,i.directionalShadow.length=w,i.directionalShadowMap.length=w,i.pointShadow.length=S,i.pointShadowMap.length=S,i.spotShadow.length=v,i.spotShadowMap.length=v,i.directionalShadowMatrix.length=w,i.pointShadowMatrix.length=S,i.spotLightMatrix.length=v+R-T,i.spotLightMap.length=R,i.numSpotLightShadowsWithMaps=T,i.numLightProbes=E,A.directionalLength=f,A.pointLength=g,A.spotLength=_,A.rectAreaLength=m,A.hemiLength=p,A.numDirectionalShadows=w,A.numPointShadows=S,A.numSpotShadows=v,A.numSpotMaps=R,A.numLightProbes=E,i.version=jS++)}function l(c,u){let d=0,h=0,f=0,g=0,_=0;const m=u.matrixWorldInverse;for(let p=0,w=c.length;p<w;p++){const S=c[p];if(S.isDirectionalLight){const v=i.directional[d];v.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(m),d++}else if(S.isSpotLight){const v=i.spot[f];v.position.setFromMatrixPosition(S.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(m),f++}else if(S.isRectAreaLight){const v=i.rectArea[g];v.position.setFromMatrixPosition(S.matrixWorld),v.position.applyMatrix4(m),r.identity(),a.copy(S.matrixWorld),a.premultiply(m),r.extractRotation(a),v.halfWidth.set(S.width*.5,0,0),v.halfHeight.set(0,S.height*.5,0),v.halfWidth.applyMatrix4(r),v.halfHeight.applyMatrix4(r),g++}else if(S.isPointLight){const v=i.point[h];v.position.setFromMatrixPosition(S.matrixWorld),v.position.applyMatrix4(m),h++}else if(S.isHemisphereLight){const v=i.hemi[_];v.direction.setFromMatrixPosition(S.matrixWorld),v.direction.transformDirection(m),_++}}}return{setup:o,setupView:l,state:i}}function Oh(n){const e=new QS(n),t=[],i=[];function s(u){c.camera=u,t.length=0,i.length=0}function a(u){t.push(u)}function r(u){i.push(u)}function o(){e.setup(t)}function l(u){e.setupView(t,u)}const c={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:a,pushShadow:r}}function ew(n){let e=new WeakMap;function t(s,a=0){const r=e.get(s);let o;return r===void 0?(o=new Oh(n),e.set(s,[o])):a>=r.length?(o=new Oh(n),r.push(o)):o=r[a],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const tw=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,nw=`uniform sampler2D shadow_pass;
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
}`;function iw(n,e,t){let i=new Ju;const s=new le,a=new le,r=new St,o=new Ev({depthPacking:$_}),l=new Tv,c={},u=t.maxTextureSize,d={[Ei]:jt,[jt]:Ei,[et]:et},h=new Ai({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new le},radius:{value:4}},vertexShader:tw,fragmentShader:nw}),f=h.clone();f.defines.HORIZONTAL_PASS=1;const g=new Tt;g.setAttribute("position",new Ln(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new ze(g,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=pp;let p=this.type;this.render=function(T,E,A){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;const y=n.getRenderTarget(),b=n.getActiveCubeFace(),C=n.getActiveMipmapLevel(),N=n.state;N.setBlending(yi),N.buffers.depth.getReversed()===!0?N.buffers.color.setClear(0,0,0,0):N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);const z=p!==Jn&&this.type===Jn,V=p===Jn&&this.type!==Jn;for(let G=0,B=T.length;G<B;G++){const U=T[G],O=U.shadow;if(O===void 0){console.warn("THREE.WebGLShadowMap:",U,"has no shadow.");continue}if(O.autoUpdate===!1&&O.needsUpdate===!1)continue;s.copy(O.mapSize);const Z=O.getFrameExtents();if(s.multiply(Z),a.copy(O.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(a.x=Math.floor(u/Z.x),s.x=a.x*Z.x,O.mapSize.x=a.x),s.y>u&&(a.y=Math.floor(u/Z.y),s.y=a.y*Z.y,O.mapSize.y=a.y)),O.map===null||z===!0||V===!0){const se=this.type!==Jn?{minFilter:Pn,magFilter:Pn}:{};O.map!==null&&O.map.dispose(),O.map=new ns(s.x,s.y,se),O.map.texture.name=U.name+".shadowMap",O.camera.updateProjectionMatrix()}n.setRenderTarget(O.map),n.clear();const Q=O.getViewportCount();for(let se=0;se<Q;se++){const ge=O.getViewport(se);r.set(a.x*ge.x,a.y*ge.y,a.x*ge.z,a.y*ge.w),N.viewport(r),O.updateMatrices(U,se),i=O.getFrustum(),v(E,A,O.camera,U,this.type)}O.isPointLightShadow!==!0&&this.type===Jn&&w(O,A),O.needsUpdate=!1}p=this.type,m.needsUpdate=!1,n.setRenderTarget(y,b,C)};function w(T,E){const A=e.update(_);h.defines.VSM_SAMPLES!==T.blurSamples&&(h.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,h.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new ns(s.x,s.y)),h.uniforms.shadow_pass.value=T.map.texture,h.uniforms.resolution.value=T.mapSize,h.uniforms.radius.value=T.radius,n.setRenderTarget(T.mapPass),n.clear(),n.renderBufferDirect(E,null,A,h,_,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,n.setRenderTarget(T.map),n.clear(),n.renderBufferDirect(E,null,A,f,_,null)}function S(T,E,A,y){let b=null;const C=A.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(C!==void 0)b=C;else if(b=A.isPointLight===!0?l:o,n.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0||E.alphaToCoverage===!0){const N=b.uuid,z=E.uuid;let V=c[N];V===void 0&&(V={},c[N]=V);let G=V[z];G===void 0&&(G=b.clone(),V[z]=G,E.addEventListener("dispose",R)),b=G}if(b.visible=E.visible,b.wireframe=E.wireframe,y===Jn?b.side=E.shadowSide!==null?E.shadowSide:E.side:b.side=E.shadowSide!==null?E.shadowSide:d[E.side],b.alphaMap=E.alphaMap,b.alphaTest=E.alphaToCoverage===!0?.5:E.alphaTest,b.map=E.map,b.clipShadows=E.clipShadows,b.clippingPlanes=E.clippingPlanes,b.clipIntersection=E.clipIntersection,b.displacementMap=E.displacementMap,b.displacementScale=E.displacementScale,b.displacementBias=E.displacementBias,b.wireframeLinewidth=E.wireframeLinewidth,b.linewidth=E.linewidth,A.isPointLight===!0&&b.isMeshDistanceMaterial===!0){const N=n.properties.get(b);N.light=A}return b}function v(T,E,A,y,b){if(T.visible===!1)return;if(T.layers.test(E.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&b===Jn)&&(!T.frustumCulled||i.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(A.matrixWorldInverse,T.matrixWorld);const z=e.update(T),V=T.material;if(Array.isArray(V)){const G=z.groups;for(let B=0,U=G.length;B<U;B++){const O=G[B],Z=V[O.materialIndex];if(Z&&Z.visible){const Q=S(T,Z,y,b);T.onBeforeShadow(n,T,E,A,z,Q,O),n.renderBufferDirect(A,null,z,Q,T,O),T.onAfterShadow(n,T,E,A,z,Q,O)}}}else if(V.visible){const G=S(T,V,y,b);T.onBeforeShadow(n,T,E,A,z,G,null),n.renderBufferDirect(A,null,z,G,T,null),T.onAfterShadow(n,T,E,A,z,G,null)}}const N=T.children;for(let z=0,V=N.length;z<V;z++)v(N[z],E,A,y,b)}function R(T){T.target.removeEventListener("dispose",R);for(const A in c){const y=c[A],b=T.target.uuid;b in y&&(y[b].dispose(),delete y[b])}}}const sw={[gc]:_c,[vc]:xc,[yc]:Sc,[Xs]:bc,[_c]:gc,[xc]:vc,[Sc]:yc,[bc]:Xs};function aw(n,e){function t(){let D=!1;const ie=new St;let ce=null;const ye=new St(0,0,0,0);return{setMask:function(ee){ce!==ee&&!D&&(n.colorMask(ee,ee,ee,ee),ce=ee)},setLocked:function(ee){D=ee},setClear:function(ee,j,we,ke,ut){ut===!0&&(ee*=ke,j*=ke,we*=ke),ie.set(ee,j,we,ke),ye.equals(ie)===!1&&(n.clearColor(ee,j,we,ke),ye.copy(ie))},reset:function(){D=!1,ce=null,ye.set(-1,0,0,0)}}}function i(){let D=!1,ie=!1,ce=null,ye=null,ee=null;return{setReversed:function(j){if(ie!==j){const we=e.get("EXT_clip_control");j?we.clipControlEXT(we.LOWER_LEFT_EXT,we.ZERO_TO_ONE_EXT):we.clipControlEXT(we.LOWER_LEFT_EXT,we.NEGATIVE_ONE_TO_ONE_EXT),ie=j;const ke=ee;ee=null,this.setClear(ke)}},getReversed:function(){return ie},setTest:function(j){j?K(n.DEPTH_TEST):pe(n.DEPTH_TEST)},setMask:function(j){ce!==j&&!D&&(n.depthMask(j),ce=j)},setFunc:function(j){if(ie&&(j=sw[j]),ye!==j){switch(j){case gc:n.depthFunc(n.NEVER);break;case _c:n.depthFunc(n.ALWAYS);break;case vc:n.depthFunc(n.LESS);break;case Xs:n.depthFunc(n.LEQUAL);break;case yc:n.depthFunc(n.EQUAL);break;case bc:n.depthFunc(n.GEQUAL);break;case xc:n.depthFunc(n.GREATER);break;case Sc:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ye=j}},setLocked:function(j){D=j},setClear:function(j){ee!==j&&(ie&&(j=1-j),n.clearDepth(j),ee=j)},reset:function(){D=!1,ce=null,ye=null,ee=null,ie=!1}}}function s(){let D=!1,ie=null,ce=null,ye=null,ee=null,j=null,we=null,ke=null,ut=null;return{setTest:function(tt){D||(tt?K(n.STENCIL_TEST):pe(n.STENCIL_TEST))},setMask:function(tt){ie!==tt&&!D&&(n.stencilMask(tt),ie=tt)},setFunc:function(tt,$n,Dn){(ce!==tt||ye!==$n||ee!==Dn)&&(n.stencilFunc(tt,$n,Dn),ce=tt,ye=$n,ee=Dn)},setOp:function(tt,$n,Dn){(j!==tt||we!==$n||ke!==Dn)&&(n.stencilOp(tt,$n,Dn),j=tt,we=$n,ke=Dn)},setLocked:function(tt){D=tt},setClear:function(tt){ut!==tt&&(n.clearStencil(tt),ut=tt)},reset:function(){D=!1,ie=null,ce=null,ye=null,ee=null,j=null,we=null,ke=null,ut=null}}}const a=new t,r=new i,o=new s,l=new WeakMap,c=new WeakMap;let u={},d={},h=new WeakMap,f=[],g=null,_=!1,m=null,p=null,w=null,S=null,v=null,R=null,T=null,E=new qe(0,0,0),A=0,y=!1,b=null,C=null,N=null,z=null,V=null;const G=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let B=!1,U=0;const O=n.getParameter(n.VERSION);O.indexOf("WebGL")!==-1?(U=parseFloat(/^WebGL (\d)/.exec(O)[1]),B=U>=1):O.indexOf("OpenGL ES")!==-1&&(U=parseFloat(/^OpenGL ES (\d)/.exec(O)[1]),B=U>=2);let Z=null,Q={};const se=n.getParameter(n.SCISSOR_BOX),ge=n.getParameter(n.VIEWPORT),Me=new St().fromArray(se),he=new St().fromArray(ge);function _e(D,ie,ce,ye){const ee=new Uint8Array(4),j=n.createTexture();n.bindTexture(D,j),n.texParameteri(D,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(D,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let we=0;we<ce;we++)D===n.TEXTURE_3D||D===n.TEXTURE_2D_ARRAY?n.texImage3D(ie,0,n.RGBA,1,1,ye,0,n.RGBA,n.UNSIGNED_BYTE,ee):n.texImage2D(ie+we,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ee);return j}const X={};X[n.TEXTURE_2D]=_e(n.TEXTURE_2D,n.TEXTURE_2D,1),X[n.TEXTURE_CUBE_MAP]=_e(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),X[n.TEXTURE_2D_ARRAY]=_e(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),X[n.TEXTURE_3D]=_e(n.TEXTURE_3D,n.TEXTURE_3D,1,1),a.setClear(0,0,0,1),r.setClear(1),o.setClear(0),K(n.DEPTH_TEST),r.setFunc(Xs),Fe(!1),Ee(Rd),K(n.CULL_FACE),it(yi);function K(D){u[D]!==!0&&(n.enable(D),u[D]=!0)}function pe(D){u[D]!==!1&&(n.disable(D),u[D]=!1)}function xe(D,ie){return d[D]!==ie?(n.bindFramebuffer(D,ie),d[D]=ie,D===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=ie),D===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=ie),!0):!1}function Se(D,ie){let ce=f,ye=!1;if(D){ce=h.get(ie),ce===void 0&&(ce=[],h.set(ie,ce));const ee=D.textures;if(ce.length!==ee.length||ce[0]!==n.COLOR_ATTACHMENT0){for(let j=0,we=ee.length;j<we;j++)ce[j]=n.COLOR_ATTACHMENT0+j;ce.length=ee.length,ye=!0}}else ce[0]!==n.BACK&&(ce[0]=n.BACK,ye=!0);ye&&n.drawBuffers(ce)}function Ge(D){return g!==D?(n.useProgram(D),g=D,!0):!1}const bt={[Xi]:n.FUNC_ADD,[__]:n.FUNC_SUBTRACT,[v_]:n.FUNC_REVERSE_SUBTRACT};bt[y_]=n.MIN,bt[b_]=n.MAX;const I={[x_]:n.ZERO,[S_]:n.ONE,[w_]:n.SRC_COLOR,[pc]:n.SRC_ALPHA,[R_]:n.SRC_ALPHA_SATURATE,[A_]:n.DST_COLOR,[E_]:n.DST_ALPHA,[M_]:n.ONE_MINUS_SRC_COLOR,[mc]:n.ONE_MINUS_SRC_ALPHA,[C_]:n.ONE_MINUS_DST_COLOR,[T_]:n.ONE_MINUS_DST_ALPHA,[P_]:n.CONSTANT_COLOR,[L_]:n.ONE_MINUS_CONSTANT_COLOR,[I_]:n.CONSTANT_ALPHA,[N_]:n.ONE_MINUS_CONSTANT_ALPHA};function it(D,ie,ce,ye,ee,j,we,ke,ut,tt){if(D===yi){_===!0&&(pe(n.BLEND),_=!1);return}if(_===!1&&(K(n.BLEND),_=!0),D!==g_){if(D!==m||tt!==y){if((p!==Xi||v!==Xi)&&(n.blendEquation(n.FUNC_ADD),p=Xi,v=Xi),tt)switch(D){case Bs:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case bi:n.blendFunc(n.ONE,n.ONE);break;case Pd:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Ld:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case Bs:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case bi:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Pd:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Ld:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}w=null,S=null,R=null,T=null,E.set(0,0,0),A=0,m=D,y=tt}return}ee=ee||ie,j=j||ce,we=we||ye,(ie!==p||ee!==v)&&(n.blendEquationSeparate(bt[ie],bt[ee]),p=ie,v=ee),(ce!==w||ye!==S||j!==R||we!==T)&&(n.blendFuncSeparate(I[ce],I[ye],I[j],I[we]),w=ce,S=ye,R=j,T=we),(ke.equals(E)===!1||ut!==A)&&(n.blendColor(ke.r,ke.g,ke.b,ut),E.copy(ke),A=ut),m=D,y=!1}function Be(D,ie){D.side===et?pe(n.CULL_FACE):K(n.CULL_FACE);let ce=D.side===jt;ie&&(ce=!ce),Fe(ce),D.blending===Bs&&D.transparent===!1?it(yi):it(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),r.setFunc(D.depthFunc),r.setTest(D.depthTest),r.setMask(D.depthWrite),a.setMask(D.colorWrite);const ye=D.stencilWrite;o.setTest(ye),ye&&(o.setMask(D.stencilWriteMask),o.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),o.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),Te(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?K(n.SAMPLE_ALPHA_TO_COVERAGE):pe(n.SAMPLE_ALPHA_TO_COVERAGE)}function Fe(D){b!==D&&(D?n.frontFace(n.CW):n.frontFace(n.CCW),b=D)}function Ee(D){D!==f_?(K(n.CULL_FACE),D!==C&&(D===Rd?n.cullFace(n.BACK):D===p_?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):pe(n.CULL_FACE),C=D}function pt(D){D!==N&&(B&&n.lineWidth(D),N=D)}function Te(D,ie,ce){D?(K(n.POLYGON_OFFSET_FILL),(z!==ie||V!==ce)&&(n.polygonOffset(ie,ce),z=ie,V=ce)):pe(n.POLYGON_OFFSET_FILL)}function We(D){D?K(n.SCISSOR_TEST):pe(n.SCISSOR_TEST)}function Nt(D){D===void 0&&(D=n.TEXTURE0+G-1),Z!==D&&(n.activeTexture(D),Z=D)}function Mt(D,ie,ce){ce===void 0&&(Z===null?ce=n.TEXTURE0+G-1:ce=Z);let ye=Q[ce];ye===void 0&&(ye={type:void 0,texture:void 0},Q[ce]=ye),(ye.type!==D||ye.texture!==ie)&&(Z!==ce&&(n.activeTexture(ce),Z=ce),n.bindTexture(D,ie||X[D]),ye.type=D,ye.texture=ie)}function P(){const D=Q[Z];D!==void 0&&D.type!==void 0&&(n.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function x(){try{n.compressedTexImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function H(){try{n.compressedTexImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Y(){try{n.texSubImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function J(){try{n.texSubImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function q(){try{n.compressedTexSubImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Pe(){try{n.compressedTexSubImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function oe(){try{n.texStorage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ae(){try{n.texStorage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ce(){try{n.texImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ne(){try{n.texImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function me(D){Me.equals(D)===!1&&(n.scissor(D.x,D.y,D.z,D.w),Me.copy(D))}function Ue(D){he.equals(D)===!1&&(n.viewport(D.x,D.y,D.z,D.w),he.copy(D))}function Re(D,ie){let ce=c.get(ie);ce===void 0&&(ce=new WeakMap,c.set(ie,ce));let ye=ce.get(D);ye===void 0&&(ye=n.getUniformBlockIndex(ie,D.name),ce.set(D,ye))}function de(D,ie){const ye=c.get(ie).get(D);l.get(ie)!==ye&&(n.uniformBlockBinding(ie,ye,D.__bindingPointIndex),l.set(ie,ye))}function He(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),r.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},Z=null,Q={},d={},h=new WeakMap,f=[],g=null,_=!1,m=null,p=null,w=null,S=null,v=null,R=null,T=null,E=new qe(0,0,0),A=0,y=!1,b=null,C=null,N=null,z=null,V=null,Me.set(0,0,n.canvas.width,n.canvas.height),he.set(0,0,n.canvas.width,n.canvas.height),a.reset(),r.reset(),o.reset()}return{buffers:{color:a,depth:r,stencil:o},enable:K,disable:pe,bindFramebuffer:xe,drawBuffers:Se,useProgram:Ge,setBlending:it,setMaterial:Be,setFlipSided:Fe,setCullFace:Ee,setLineWidth:pt,setPolygonOffset:Te,setScissorTest:We,activeTexture:Nt,bindTexture:Mt,unbindTexture:P,compressedTexImage2D:x,compressedTexImage3D:H,texImage2D:Ce,texImage3D:ne,updateUBOMapping:Re,uniformBlockBinding:de,texStorage2D:oe,texStorage3D:Ae,texSubImage2D:Y,texSubImage3D:J,compressedTexSubImage2D:q,compressedTexSubImage3D:Pe,scissor:me,viewport:Ue,reset:He}}function rw(n,e,t,i,s,a,r){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new le,u=new WeakMap;let d;const h=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(P,x){return f?new OffscreenCanvas(P,x):bo("canvas")}function _(P,x,H){let Y=1;const J=Mt(P);if((J.width>H||J.height>H)&&(Y=H/Math.max(J.width,J.height)),Y<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){const q=Math.floor(Y*J.width),Pe=Math.floor(Y*J.height);d===void 0&&(d=g(q,Pe));const oe=x?g(q,Pe):d;return oe.width=q,oe.height=Pe,oe.getContext("2d").drawImage(P,0,0,q,Pe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+q+"x"+Pe+")."),oe}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),P;return P}function m(P){return P.generateMipmaps}function p(P){n.generateMipmap(P)}function w(P){return P.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?n.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function S(P,x,H,Y,J=!1){if(P!==null){if(n[P]!==void 0)return n[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let q=x;if(x===n.RED&&(H===n.FLOAT&&(q=n.R32F),H===n.HALF_FLOAT&&(q=n.R16F),H===n.UNSIGNED_BYTE&&(q=n.R8)),x===n.RED_INTEGER&&(H===n.UNSIGNED_BYTE&&(q=n.R8UI),H===n.UNSIGNED_SHORT&&(q=n.R16UI),H===n.UNSIGNED_INT&&(q=n.R32UI),H===n.BYTE&&(q=n.R8I),H===n.SHORT&&(q=n.R16I),H===n.INT&&(q=n.R32I)),x===n.RG&&(H===n.FLOAT&&(q=n.RG32F),H===n.HALF_FLOAT&&(q=n.RG16F),H===n.UNSIGNED_BYTE&&(q=n.RG8)),x===n.RG_INTEGER&&(H===n.UNSIGNED_BYTE&&(q=n.RG8UI),H===n.UNSIGNED_SHORT&&(q=n.RG16UI),H===n.UNSIGNED_INT&&(q=n.RG32UI),H===n.BYTE&&(q=n.RG8I),H===n.SHORT&&(q=n.RG16I),H===n.INT&&(q=n.RG32I)),x===n.RGB_INTEGER&&(H===n.UNSIGNED_BYTE&&(q=n.RGB8UI),H===n.UNSIGNED_SHORT&&(q=n.RGB16UI),H===n.UNSIGNED_INT&&(q=n.RGB32UI),H===n.BYTE&&(q=n.RGB8I),H===n.SHORT&&(q=n.RGB16I),H===n.INT&&(q=n.RGB32I)),x===n.RGBA_INTEGER&&(H===n.UNSIGNED_BYTE&&(q=n.RGBA8UI),H===n.UNSIGNED_SHORT&&(q=n.RGBA16UI),H===n.UNSIGNED_INT&&(q=n.RGBA32UI),H===n.BYTE&&(q=n.RGBA8I),H===n.SHORT&&(q=n.RGBA16I),H===n.INT&&(q=n.RGBA32I)),x===n.RGB&&(H===n.UNSIGNED_INT_5_9_9_9_REV&&(q=n.RGB9_E5),H===n.UNSIGNED_INT_10F_11F_11F_REV&&(q=n.R11F_G11F_B10F)),x===n.RGBA){const Pe=J?vo:Qe.getTransfer(Y);H===n.FLOAT&&(q=n.RGBA32F),H===n.HALF_FLOAT&&(q=n.RGBA16F),H===n.UNSIGNED_BYTE&&(q=Pe===at?n.SRGB8_ALPHA8:n.RGBA8),H===n.UNSIGNED_SHORT_4_4_4_4&&(q=n.RGBA4),H===n.UNSIGNED_SHORT_5_5_5_1&&(q=n.RGB5_A1)}return(q===n.R16F||q===n.R32F||q===n.RG16F||q===n.RG32F||q===n.RGBA16F||q===n.RGBA32F)&&e.get("EXT_color_buffer_float"),q}function v(P,x){let H;return P?x===null||x===ts||x===ka?H=n.DEPTH24_STENCIL8:x===ni?H=n.DEPTH32F_STENCIL8:x===Oa&&(H=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===ts||x===ka?H=n.DEPTH_COMPONENT24:x===ni?H=n.DEPTH_COMPONENT32F:x===Oa&&(H=n.DEPTH_COMPONENT16),H}function R(P,x){return m(P)===!0||P.isFramebufferTexture&&P.minFilter!==Pn&&P.minFilter!==On?Math.log2(Math.max(x.width,x.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?x.mipmaps.length:1}function T(P){const x=P.target;x.removeEventListener("dispose",T),A(x),x.isVideoTexture&&u.delete(x)}function E(P){const x=P.target;x.removeEventListener("dispose",E),b(x)}function A(P){const x=i.get(P);if(x.__webglInit===void 0)return;const H=P.source,Y=h.get(H);if(Y){const J=Y[x.__cacheKey];J.usedTimes--,J.usedTimes===0&&y(P),Object.keys(Y).length===0&&h.delete(H)}i.remove(P)}function y(P){const x=i.get(P);n.deleteTexture(x.__webglTexture);const H=P.source,Y=h.get(H);delete Y[x.__cacheKey],r.memory.textures--}function b(P){const x=i.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),i.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(x.__webglFramebuffer[Y]))for(let J=0;J<x.__webglFramebuffer[Y].length;J++)n.deleteFramebuffer(x.__webglFramebuffer[Y][J]);else n.deleteFramebuffer(x.__webglFramebuffer[Y]);x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer[Y])}else{if(Array.isArray(x.__webglFramebuffer))for(let Y=0;Y<x.__webglFramebuffer.length;Y++)n.deleteFramebuffer(x.__webglFramebuffer[Y]);else n.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&n.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let Y=0;Y<x.__webglColorRenderbuffer.length;Y++)x.__webglColorRenderbuffer[Y]&&n.deleteRenderbuffer(x.__webglColorRenderbuffer[Y]);x.__webglDepthRenderbuffer&&n.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const H=P.textures;for(let Y=0,J=H.length;Y<J;Y++){const q=i.get(H[Y]);q.__webglTexture&&(n.deleteTexture(q.__webglTexture),r.memory.textures--),i.remove(H[Y])}i.remove(P)}let C=0;function N(){C=0}function z(){const P=C;return P>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+s.maxTextures),C+=1,P}function V(P){const x=[];return x.push(P.wrapS),x.push(P.wrapT),x.push(P.wrapR||0),x.push(P.magFilter),x.push(P.minFilter),x.push(P.anisotropy),x.push(P.internalFormat),x.push(P.format),x.push(P.type),x.push(P.generateMipmaps),x.push(P.premultiplyAlpha),x.push(P.flipY),x.push(P.unpackAlignment),x.push(P.colorSpace),x.join()}function G(P,x){const H=i.get(P);if(P.isVideoTexture&&We(P),P.isRenderTargetTexture===!1&&P.isExternalTexture!==!0&&P.version>0&&H.__version!==P.version){const Y=P.image;if(Y===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{X(H,P,x);return}}else P.isExternalTexture&&(H.__webglTexture=P.sourceTexture?P.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,H.__webglTexture,n.TEXTURE0+x)}function B(P,x){const H=i.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&H.__version!==P.version){X(H,P,x);return}t.bindTexture(n.TEXTURE_2D_ARRAY,H.__webglTexture,n.TEXTURE0+x)}function U(P,x){const H=i.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&H.__version!==P.version){X(H,P,x);return}t.bindTexture(n.TEXTURE_3D,H.__webglTexture,n.TEXTURE0+x)}function O(P,x){const H=i.get(P);if(P.version>0&&H.__version!==P.version){K(H,P,x);return}t.bindTexture(n.TEXTURE_CUBE_MAP,H.__webglTexture,n.TEXTURE0+x)}const Z={[Ec]:n.REPEAT,[Zi]:n.CLAMP_TO_EDGE,[Tc]:n.MIRRORED_REPEAT},Q={[Pn]:n.NEAREST,[G_]:n.NEAREST_MIPMAP_NEAREST,[ur]:n.NEAREST_MIPMAP_LINEAR,[On]:n.LINEAR,[ll]:n.LINEAR_MIPMAP_NEAREST,[Ki]:n.LINEAR_MIPMAP_LINEAR},se={[q_]:n.NEVER,[Q_]:n.ALWAYS,[Y_]:n.LESS,[Mp]:n.LEQUAL,[Z_]:n.EQUAL,[J_]:n.GEQUAL,[K_]:n.GREATER,[j_]:n.NOTEQUAL};function ge(P,x){if(x.type===ni&&e.has("OES_texture_float_linear")===!1&&(x.magFilter===On||x.magFilter===ll||x.magFilter===ur||x.magFilter===Ki||x.minFilter===On||x.minFilter===ll||x.minFilter===ur||x.minFilter===Ki)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(P,n.TEXTURE_WRAP_S,Z[x.wrapS]),n.texParameteri(P,n.TEXTURE_WRAP_T,Z[x.wrapT]),(P===n.TEXTURE_3D||P===n.TEXTURE_2D_ARRAY)&&n.texParameteri(P,n.TEXTURE_WRAP_R,Z[x.wrapR]),n.texParameteri(P,n.TEXTURE_MAG_FILTER,Q[x.magFilter]),n.texParameteri(P,n.TEXTURE_MIN_FILTER,Q[x.minFilter]),x.compareFunction&&(n.texParameteri(P,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(P,n.TEXTURE_COMPARE_FUNC,se[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===Pn||x.minFilter!==ur&&x.minFilter!==Ki||x.type===ni&&e.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||i.get(x).__currentAnisotropy){const H=e.get("EXT_texture_filter_anisotropic");n.texParameterf(P,H.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),i.get(x).__currentAnisotropy=x.anisotropy}}}function Me(P,x){let H=!1;P.__webglInit===void 0&&(P.__webglInit=!0,x.addEventListener("dispose",T));const Y=x.source;let J=h.get(Y);J===void 0&&(J={},h.set(Y,J));const q=V(x);if(q!==P.__cacheKey){J[q]===void 0&&(J[q]={texture:n.createTexture(),usedTimes:0},r.memory.textures++,H=!0),J[q].usedTimes++;const Pe=J[P.__cacheKey];Pe!==void 0&&(J[P.__cacheKey].usedTimes--,Pe.usedTimes===0&&y(x)),P.__cacheKey=q,P.__webglTexture=J[q].texture}return H}function he(P,x,H){return Math.floor(Math.floor(P/H)/x)}function _e(P,x,H,Y){const q=P.updateRanges;if(q.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,x.width,x.height,H,Y,x.data);else{q.sort((ne,me)=>ne.start-me.start);let Pe=0;for(let ne=1;ne<q.length;ne++){const me=q[Pe],Ue=q[ne],Re=me.start+me.count,de=he(Ue.start,x.width,4),He=he(me.start,x.width,4);Ue.start<=Re+1&&de===He&&he(Ue.start+Ue.count-1,x.width,4)===de?me.count=Math.max(me.count,Ue.start+Ue.count-me.start):(++Pe,q[Pe]=Ue)}q.length=Pe+1;const oe=n.getParameter(n.UNPACK_ROW_LENGTH),Ae=n.getParameter(n.UNPACK_SKIP_PIXELS),Ce=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,x.width);for(let ne=0,me=q.length;ne<me;ne++){const Ue=q[ne],Re=Math.floor(Ue.start/4),de=Math.ceil(Ue.count/4),He=Re%x.width,D=Math.floor(Re/x.width),ie=de,ce=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,He),n.pixelStorei(n.UNPACK_SKIP_ROWS,D),t.texSubImage2D(n.TEXTURE_2D,0,He,D,ie,ce,H,Y,x.data)}P.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,oe),n.pixelStorei(n.UNPACK_SKIP_PIXELS,Ae),n.pixelStorei(n.UNPACK_SKIP_ROWS,Ce)}}function X(P,x,H){let Y=n.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(Y=n.TEXTURE_2D_ARRAY),x.isData3DTexture&&(Y=n.TEXTURE_3D);const J=Me(P,x),q=x.source;t.bindTexture(Y,P.__webglTexture,n.TEXTURE0+H);const Pe=i.get(q);if(q.version!==Pe.__version||J===!0){t.activeTexture(n.TEXTURE0+H);const oe=Qe.getPrimaries(Qe.workingColorSpace),Ae=x.colorSpace===gi?null:Qe.getPrimaries(x.colorSpace),Ce=x.colorSpace===gi||oe===Ae?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ce);let ne=_(x.image,!1,s.maxTextureSize);ne=Nt(x,ne);const me=a.convert(x.format,x.colorSpace),Ue=a.convert(x.type);let Re=S(x.internalFormat,me,Ue,x.colorSpace,x.isVideoTexture);ge(Y,x);let de;const He=x.mipmaps,D=x.isVideoTexture!==!0,ie=Pe.__version===void 0||J===!0,ce=q.dataReady,ye=R(x,ne);if(x.isDepthTexture)Re=v(x.format===za,x.type),ie&&(D?t.texStorage2D(n.TEXTURE_2D,1,Re,ne.width,ne.height):t.texImage2D(n.TEXTURE_2D,0,Re,ne.width,ne.height,0,me,Ue,null));else if(x.isDataTexture)if(He.length>0){D&&ie&&t.texStorage2D(n.TEXTURE_2D,ye,Re,He[0].width,He[0].height);for(let ee=0,j=He.length;ee<j;ee++)de=He[ee],D?ce&&t.texSubImage2D(n.TEXTURE_2D,ee,0,0,de.width,de.height,me,Ue,de.data):t.texImage2D(n.TEXTURE_2D,ee,Re,de.width,de.height,0,me,Ue,de.data);x.generateMipmaps=!1}else D?(ie&&t.texStorage2D(n.TEXTURE_2D,ye,Re,ne.width,ne.height),ce&&_e(x,ne,me,Ue)):t.texImage2D(n.TEXTURE_2D,0,Re,ne.width,ne.height,0,me,Ue,ne.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){D&&ie&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ye,Re,He[0].width,He[0].height,ne.depth);for(let ee=0,j=He.length;ee<j;ee++)if(de=He[ee],x.format!==Rn)if(me!==null)if(D){if(ce)if(x.layerUpdates.size>0){const we=fh(de.width,de.height,x.format,x.type);for(const ke of x.layerUpdates){const ut=de.data.subarray(ke*we/de.data.BYTES_PER_ELEMENT,(ke+1)*we/de.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ee,0,0,ke,de.width,de.height,1,me,ut)}x.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ee,0,0,0,de.width,de.height,ne.depth,me,de.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ee,Re,de.width,de.height,ne.depth,0,de.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else D?ce&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,ee,0,0,0,de.width,de.height,ne.depth,me,Ue,de.data):t.texImage3D(n.TEXTURE_2D_ARRAY,ee,Re,de.width,de.height,ne.depth,0,me,Ue,de.data)}else{D&&ie&&t.texStorage2D(n.TEXTURE_2D,ye,Re,He[0].width,He[0].height);for(let ee=0,j=He.length;ee<j;ee++)de=He[ee],x.format!==Rn?me!==null?D?ce&&t.compressedTexSubImage2D(n.TEXTURE_2D,ee,0,0,de.width,de.height,me,de.data):t.compressedTexImage2D(n.TEXTURE_2D,ee,Re,de.width,de.height,0,de.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):D?ce&&t.texSubImage2D(n.TEXTURE_2D,ee,0,0,de.width,de.height,me,Ue,de.data):t.texImage2D(n.TEXTURE_2D,ee,Re,de.width,de.height,0,me,Ue,de.data)}else if(x.isDataArrayTexture)if(D){if(ie&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ye,Re,ne.width,ne.height,ne.depth),ce)if(x.layerUpdates.size>0){const ee=fh(ne.width,ne.height,x.format,x.type);for(const j of x.layerUpdates){const we=ne.data.subarray(j*ee/ne.data.BYTES_PER_ELEMENT,(j+1)*ee/ne.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,j,ne.width,ne.height,1,me,Ue,we)}x.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ne.width,ne.height,ne.depth,me,Ue,ne.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Re,ne.width,ne.height,ne.depth,0,me,Ue,ne.data);else if(x.isData3DTexture)D?(ie&&t.texStorage3D(n.TEXTURE_3D,ye,Re,ne.width,ne.height,ne.depth),ce&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ne.width,ne.height,ne.depth,me,Ue,ne.data)):t.texImage3D(n.TEXTURE_3D,0,Re,ne.width,ne.height,ne.depth,0,me,Ue,ne.data);else if(x.isFramebufferTexture){if(ie)if(D)t.texStorage2D(n.TEXTURE_2D,ye,Re,ne.width,ne.height);else{let ee=ne.width,j=ne.height;for(let we=0;we<ye;we++)t.texImage2D(n.TEXTURE_2D,we,Re,ee,j,0,me,Ue,null),ee>>=1,j>>=1}}else if(He.length>0){if(D&&ie){const ee=Mt(He[0]);t.texStorage2D(n.TEXTURE_2D,ye,Re,ee.width,ee.height)}for(let ee=0,j=He.length;ee<j;ee++)de=He[ee],D?ce&&t.texSubImage2D(n.TEXTURE_2D,ee,0,0,me,Ue,de):t.texImage2D(n.TEXTURE_2D,ee,Re,me,Ue,de);x.generateMipmaps=!1}else if(D){if(ie){const ee=Mt(ne);t.texStorage2D(n.TEXTURE_2D,ye,Re,ee.width,ee.height)}ce&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,me,Ue,ne)}else t.texImage2D(n.TEXTURE_2D,0,Re,me,Ue,ne);m(x)&&p(Y),Pe.__version=q.version,x.onUpdate&&x.onUpdate(x)}P.__version=x.version}function K(P,x,H){if(x.image.length!==6)return;const Y=Me(P,x),J=x.source;t.bindTexture(n.TEXTURE_CUBE_MAP,P.__webglTexture,n.TEXTURE0+H);const q=i.get(J);if(J.version!==q.__version||Y===!0){t.activeTexture(n.TEXTURE0+H);const Pe=Qe.getPrimaries(Qe.workingColorSpace),oe=x.colorSpace===gi?null:Qe.getPrimaries(x.colorSpace),Ae=x.colorSpace===gi||Pe===oe?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ae);const Ce=x.isCompressedTexture||x.image[0].isCompressedTexture,ne=x.image[0]&&x.image[0].isDataTexture,me=[];for(let j=0;j<6;j++)!Ce&&!ne?me[j]=_(x.image[j],!0,s.maxCubemapSize):me[j]=ne?x.image[j].image:x.image[j],me[j]=Nt(x,me[j]);const Ue=me[0],Re=a.convert(x.format,x.colorSpace),de=a.convert(x.type),He=S(x.internalFormat,Re,de,x.colorSpace),D=x.isVideoTexture!==!0,ie=q.__version===void 0||Y===!0,ce=J.dataReady;let ye=R(x,Ue);ge(n.TEXTURE_CUBE_MAP,x);let ee;if(Ce){D&&ie&&t.texStorage2D(n.TEXTURE_CUBE_MAP,ye,He,Ue.width,Ue.height);for(let j=0;j<6;j++){ee=me[j].mipmaps;for(let we=0;we<ee.length;we++){const ke=ee[we];x.format!==Rn?Re!==null?D?ce&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,we,0,0,ke.width,ke.height,Re,ke.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,we,He,ke.width,ke.height,0,ke.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):D?ce&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,we,0,0,ke.width,ke.height,Re,de,ke.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,we,He,ke.width,ke.height,0,Re,de,ke.data)}}}else{if(ee=x.mipmaps,D&&ie){ee.length>0&&ye++;const j=Mt(me[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,ye,He,j.width,j.height)}for(let j=0;j<6;j++)if(ne){D?ce&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,me[j].width,me[j].height,Re,de,me[j].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,He,me[j].width,me[j].height,0,Re,de,me[j].data);for(let we=0;we<ee.length;we++){const ut=ee[we].image[j].image;D?ce&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,we+1,0,0,ut.width,ut.height,Re,de,ut.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,we+1,He,ut.width,ut.height,0,Re,de,ut.data)}}else{D?ce&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,Re,de,me[j]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,He,Re,de,me[j]);for(let we=0;we<ee.length;we++){const ke=ee[we];D?ce&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,we+1,0,0,Re,de,ke.image[j]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+j,we+1,He,Re,de,ke.image[j])}}}m(x)&&p(n.TEXTURE_CUBE_MAP),q.__version=J.version,x.onUpdate&&x.onUpdate(x)}P.__version=x.version}function pe(P,x,H,Y,J,q){const Pe=a.convert(H.format,H.colorSpace),oe=a.convert(H.type),Ae=S(H.internalFormat,Pe,oe,H.colorSpace),Ce=i.get(x),ne=i.get(H);if(ne.__renderTarget=x,!Ce.__hasExternalTextures){const me=Math.max(1,x.width>>q),Ue=Math.max(1,x.height>>q);J===n.TEXTURE_3D||J===n.TEXTURE_2D_ARRAY?t.texImage3D(J,q,Ae,me,Ue,x.depth,0,Pe,oe,null):t.texImage2D(J,q,Ae,me,Ue,0,Pe,oe,null)}t.bindFramebuffer(n.FRAMEBUFFER,P),Te(x)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Y,J,ne.__webglTexture,0,pt(x)):(J===n.TEXTURE_2D||J>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,Y,J,ne.__webglTexture,q),t.bindFramebuffer(n.FRAMEBUFFER,null)}function xe(P,x,H){if(n.bindRenderbuffer(n.RENDERBUFFER,P),x.depthBuffer){const Y=x.depthTexture,J=Y&&Y.isDepthTexture?Y.type:null,q=v(x.stencilBuffer,J),Pe=x.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,oe=pt(x);Te(x)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,oe,q,x.width,x.height):H?n.renderbufferStorageMultisample(n.RENDERBUFFER,oe,q,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,q,x.width,x.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Pe,n.RENDERBUFFER,P)}else{const Y=x.textures;for(let J=0;J<Y.length;J++){const q=Y[J],Pe=a.convert(q.format,q.colorSpace),oe=a.convert(q.type),Ae=S(q.internalFormat,Pe,oe,q.colorSpace),Ce=pt(x);H&&Te(x)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Ce,Ae,x.width,x.height):Te(x)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Ce,Ae,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,Ae,x.width,x.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Se(P,x){if(x&&x.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,P),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Y=i.get(x.depthTexture);Y.__renderTarget=x,(!Y.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),G(x.depthTexture,0);const J=Y.__webglTexture,q=pt(x);if(x.depthTexture.format===Ba)Te(x)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,J,0,q):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,J,0);else if(x.depthTexture.format===za)Te(x)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,J,0,q):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,J,0);else throw new Error("Unknown depthTexture format")}function Ge(P){const x=i.get(P),H=P.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==P.depthTexture){const Y=P.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),Y){const J=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,Y.removeEventListener("dispose",J)};Y.addEventListener("dispose",J),x.__depthDisposeCallback=J}x.__boundDepthTexture=Y}if(P.depthTexture&&!x.__autoAllocateDepthBuffer){if(H)throw new Error("target.depthTexture not supported in Cube render targets");const Y=P.texture.mipmaps;Y&&Y.length>0?Se(x.__webglFramebuffer[0],P):Se(x.__webglFramebuffer,P)}else if(H){x.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(t.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer[Y]),x.__webglDepthbuffer[Y]===void 0)x.__webglDepthbuffer[Y]=n.createRenderbuffer(),xe(x.__webglDepthbuffer[Y],P,!1);else{const J=P.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,q=x.__webglDepthbuffer[Y];n.bindRenderbuffer(n.RENDERBUFFER,q),n.framebufferRenderbuffer(n.FRAMEBUFFER,J,n.RENDERBUFFER,q)}}else{const Y=P.texture.mipmaps;if(Y&&Y.length>0?t.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=n.createRenderbuffer(),xe(x.__webglDepthbuffer,P,!1);else{const J=P.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,q=x.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,q),n.framebufferRenderbuffer(n.FRAMEBUFFER,J,n.RENDERBUFFER,q)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function bt(P,x,H){const Y=i.get(P);x!==void 0&&pe(Y.__webglFramebuffer,P,P.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),H!==void 0&&Ge(P)}function I(P){const x=P.texture,H=i.get(P),Y=i.get(x);P.addEventListener("dispose",E);const J=P.textures,q=P.isWebGLCubeRenderTarget===!0,Pe=J.length>1;if(Pe||(Y.__webglTexture===void 0&&(Y.__webglTexture=n.createTexture()),Y.__version=x.version,r.memory.textures++),q){H.__webglFramebuffer=[];for(let oe=0;oe<6;oe++)if(x.mipmaps&&x.mipmaps.length>0){H.__webglFramebuffer[oe]=[];for(let Ae=0;Ae<x.mipmaps.length;Ae++)H.__webglFramebuffer[oe][Ae]=n.createFramebuffer()}else H.__webglFramebuffer[oe]=n.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){H.__webglFramebuffer=[];for(let oe=0;oe<x.mipmaps.length;oe++)H.__webglFramebuffer[oe]=n.createFramebuffer()}else H.__webglFramebuffer=n.createFramebuffer();if(Pe)for(let oe=0,Ae=J.length;oe<Ae;oe++){const Ce=i.get(J[oe]);Ce.__webglTexture===void 0&&(Ce.__webglTexture=n.createTexture(),r.memory.textures++)}if(P.samples>0&&Te(P)===!1){H.__webglMultisampledFramebuffer=n.createFramebuffer(),H.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let oe=0;oe<J.length;oe++){const Ae=J[oe];H.__webglColorRenderbuffer[oe]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,H.__webglColorRenderbuffer[oe]);const Ce=a.convert(Ae.format,Ae.colorSpace),ne=a.convert(Ae.type),me=S(Ae.internalFormat,Ce,ne,Ae.colorSpace,P.isXRRenderTarget===!0),Ue=pt(P);n.renderbufferStorageMultisample(n.RENDERBUFFER,Ue,me,P.width,P.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+oe,n.RENDERBUFFER,H.__webglColorRenderbuffer[oe])}n.bindRenderbuffer(n.RENDERBUFFER,null),P.depthBuffer&&(H.__webglDepthRenderbuffer=n.createRenderbuffer(),xe(H.__webglDepthRenderbuffer,P,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(q){t.bindTexture(n.TEXTURE_CUBE_MAP,Y.__webglTexture),ge(n.TEXTURE_CUBE_MAP,x);for(let oe=0;oe<6;oe++)if(x.mipmaps&&x.mipmaps.length>0)for(let Ae=0;Ae<x.mipmaps.length;Ae++)pe(H.__webglFramebuffer[oe][Ae],P,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Ae);else pe(H.__webglFramebuffer[oe],P,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0);m(x)&&p(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Pe){for(let oe=0,Ae=J.length;oe<Ae;oe++){const Ce=J[oe],ne=i.get(Ce);let me=n.TEXTURE_2D;(P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(me=P.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(me,ne.__webglTexture),ge(me,Ce),pe(H.__webglFramebuffer,P,Ce,n.COLOR_ATTACHMENT0+oe,me,0),m(Ce)&&p(me)}t.unbindTexture()}else{let oe=n.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(oe=P.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(oe,Y.__webglTexture),ge(oe,x),x.mipmaps&&x.mipmaps.length>0)for(let Ae=0;Ae<x.mipmaps.length;Ae++)pe(H.__webglFramebuffer[Ae],P,x,n.COLOR_ATTACHMENT0,oe,Ae);else pe(H.__webglFramebuffer,P,x,n.COLOR_ATTACHMENT0,oe,0);m(x)&&p(oe),t.unbindTexture()}P.depthBuffer&&Ge(P)}function it(P){const x=P.textures;for(let H=0,Y=x.length;H<Y;H++){const J=x[H];if(m(J)){const q=w(P),Pe=i.get(J).__webglTexture;t.bindTexture(q,Pe),p(q),t.unbindTexture()}}}const Be=[],Fe=[];function Ee(P){if(P.samples>0){if(Te(P)===!1){const x=P.textures,H=P.width,Y=P.height;let J=n.COLOR_BUFFER_BIT;const q=P.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Pe=i.get(P),oe=x.length>1;if(oe)for(let Ce=0;Ce<x.length;Ce++)t.bindFramebuffer(n.FRAMEBUFFER,Pe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ce,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,Pe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ce,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,Pe.__webglMultisampledFramebuffer);const Ae=P.texture.mipmaps;Ae&&Ae.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Pe.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Pe.__webglFramebuffer);for(let Ce=0;Ce<x.length;Ce++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(J|=n.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(J|=n.STENCIL_BUFFER_BIT)),oe){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Pe.__webglColorRenderbuffer[Ce]);const ne=i.get(x[Ce]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ne,0)}n.blitFramebuffer(0,0,H,Y,0,0,H,Y,J,n.NEAREST),l===!0&&(Be.length=0,Fe.length=0,Be.push(n.COLOR_ATTACHMENT0+Ce),P.depthBuffer&&P.resolveDepthBuffer===!1&&(Be.push(q),Fe.push(q),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Fe)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Be))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),oe)for(let Ce=0;Ce<x.length;Ce++){t.bindFramebuffer(n.FRAMEBUFFER,Pe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ce,n.RENDERBUFFER,Pe.__webglColorRenderbuffer[Ce]);const ne=i.get(x[Ce]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,Pe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ce,n.TEXTURE_2D,ne,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Pe.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&l){const x=P.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[x])}}}function pt(P){return Math.min(s.maxSamples,P.samples)}function Te(P){const x=i.get(P);return P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function We(P){const x=r.render.frame;u.get(P)!==x&&(u.set(P,x),P.update())}function Nt(P,x){const H=P.colorSpace,Y=P.format,J=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||H!==Zs&&H!==gi&&(Qe.getTransfer(H)===at?(Y!==Rn||J!==Gn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",H)),x}function Mt(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(c.width=P.naturalWidth||P.width,c.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(c.width=P.displayWidth,c.height=P.displayHeight):(c.width=P.width,c.height=P.height),c}this.allocateTextureUnit=z,this.resetTextureUnits=N,this.setTexture2D=G,this.setTexture2DArray=B,this.setTexture3D=U,this.setTextureCube=O,this.rebindTextures=bt,this.setupRenderTarget=I,this.updateRenderTargetMipmap=it,this.updateMultisampleRenderTarget=Ee,this.setupDepthRenderbuffer=Ge,this.setupFrameBufferTexture=pe,this.useMultisampledRTT=Te}function ow(n,e){function t(i,s=gi){let a;const r=Qe.getTransfer(s);if(i===Gn)return n.UNSIGNED_BYTE;if(i===Gu)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Wu)return n.UNSIGNED_SHORT_5_5_5_1;if(i===vp)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===yp)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===gp)return n.BYTE;if(i===_p)return n.SHORT;if(i===Oa)return n.UNSIGNED_SHORT;if(i===Vu)return n.INT;if(i===ts)return n.UNSIGNED_INT;if(i===ni)return n.FLOAT;if(i===ir)return n.HALF_FLOAT;if(i===bp)return n.ALPHA;if(i===xp)return n.RGB;if(i===Rn)return n.RGBA;if(i===Ba)return n.DEPTH_COMPONENT;if(i===za)return n.DEPTH_STENCIL;if(i===Sp)return n.RED;if(i===$u)return n.RED_INTEGER;if(i===wp)return n.RG;if(i===Xu)return n.RG_INTEGER;if(i===qu)return n.RGBA_INTEGER;if(i===Kr||i===jr||i===Jr||i===Qr)if(r===at)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(i===Kr)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===jr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Jr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Qr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(i===Kr)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===jr)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Jr)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Qr)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Ac||i===Cc||i===Rc||i===Pc)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(i===Ac)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Cc)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Rc)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Pc)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Lc||i===Ic||i===Nc)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(i===Lc||i===Ic)return r===at?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(i===Nc)return r===at?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Dc||i===Uc||i===Fc||i===Oc||i===kc||i===Bc||i===zc||i===Hc||i===Vc||i===Gc||i===Wc||i===$c||i===Xc||i===qc)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(i===Dc)return r===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Uc)return r===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Fc)return r===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Oc)return r===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===kc)return r===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Bc)return r===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===zc)return r===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Hc)return r===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Vc)return r===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Gc)return r===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Wc)return r===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===$c)return r===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Xc)return r===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===qc)return r===at?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Yc||i===Zc||i===Kc)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(i===Yc)return r===at?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Zc)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Kc)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===jc||i===Jc||i===Qc||i===eu)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(i===jc)return a.COMPRESSED_RED_RGTC1_EXT;if(i===Jc)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Qc)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===eu)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===ka?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const lw=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,cw=`
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

}`;class uw{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new kp(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new Ai({vertexShader:lw,fragmentShader:cw,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ze(new rn(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class dw extends os{constructor(e,t){super();const i=this;let s=null,a=1,r=null,o="local-floor",l=1,c=null,u=null,d=null,h=null,f=null,g=null;const _=typeof XRWebGLBinding<"u",m=new uw,p={},w=t.getContextAttributes();let S=null,v=null;const R=[],T=[],E=new le;let A=null;const y=new pn;y.viewport=new St;const b=new pn;b.viewport=new St;const C=[y,b],N=new Pv;let z=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let K=R[X];return K===void 0&&(K=new Rl,R[X]=K),K.getTargetRaySpace()},this.getControllerGrip=function(X){let K=R[X];return K===void 0&&(K=new Rl,R[X]=K),K.getGripSpace()},this.getHand=function(X){let K=R[X];return K===void 0&&(K=new Rl,R[X]=K),K.getHandSpace()};function G(X){const K=T.indexOf(X.inputSource);if(K===-1)return;const pe=R[K];pe!==void 0&&(pe.update(X.inputSource,X.frame,c||r),pe.dispatchEvent({type:X.type,data:X.inputSource}))}function B(){s.removeEventListener("select",G),s.removeEventListener("selectstart",G),s.removeEventListener("selectend",G),s.removeEventListener("squeeze",G),s.removeEventListener("squeezestart",G),s.removeEventListener("squeezeend",G),s.removeEventListener("end",B),s.removeEventListener("inputsourceschange",U);for(let X=0;X<R.length;X++){const K=T[X];K!==null&&(T[X]=null,R[X].disconnect(K))}z=null,V=null,m.reset();for(const X in p)delete p[X];e.setRenderTarget(S),f=null,h=null,d=null,s=null,v=null,_e.stop(),i.isPresenting=!1,e.setPixelRatio(A),e.setSize(E.width,E.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){a=X,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){o=X,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||r},this.setReferenceSpace=function(X){c=X},this.getBaseLayer=function(){return h!==null?h:f},this.getBinding=function(){return d===null&&_&&(d=new XRWebGLBinding(s,t)),d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(X){if(s=X,s!==null){if(S=e.getRenderTarget(),s.addEventListener("select",G),s.addEventListener("selectstart",G),s.addEventListener("selectend",G),s.addEventListener("squeeze",G),s.addEventListener("squeezestart",G),s.addEventListener("squeezeend",G),s.addEventListener("end",B),s.addEventListener("inputsourceschange",U),w.xrCompatible!==!0&&await t.makeXRCompatible(),A=e.getPixelRatio(),e.getSize(E),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let pe=null,xe=null,Se=null;w.depth&&(Se=w.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,pe=w.stencil?za:Ba,xe=w.stencil?ka:ts);const Ge={colorFormat:t.RGBA8,depthFormat:Se,scaleFactor:a};d=this.getBinding(),h=d.createProjectionLayer(Ge),s.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),v=new ns(h.textureWidth,h.textureHeight,{format:Rn,type:Gn,depthTexture:new Op(h.textureWidth,h.textureHeight,xe,void 0,void 0,void 0,void 0,void 0,void 0,pe),stencilBuffer:w.stencil,colorSpace:e.outputColorSpace,samples:w.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{const pe={antialias:w.antialias,alpha:!0,depth:w.depth,stencil:w.stencil,framebufferScaleFactor:a};f=new XRWebGLLayer(s,t,pe),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),v=new ns(f.framebufferWidth,f.framebufferHeight,{format:Rn,type:Gn,colorSpace:e.outputColorSpace,stencilBuffer:w.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,r=await s.requestReferenceSpace(o),_e.setContext(s),_e.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function U(X){for(let K=0;K<X.removed.length;K++){const pe=X.removed[K],xe=T.indexOf(pe);xe>=0&&(T[xe]=null,R[xe].disconnect(pe))}for(let K=0;K<X.added.length;K++){const pe=X.added[K];let xe=T.indexOf(pe);if(xe===-1){for(let Ge=0;Ge<R.length;Ge++)if(Ge>=T.length){T.push(pe),xe=Ge;break}else if(T[Ge]===null){T[Ge]=pe,xe=Ge;break}if(xe===-1)break}const Se=R[xe];Se&&Se.connect(pe)}}const O=new L,Z=new L;function Q(X,K,pe){O.setFromMatrixPosition(K.matrixWorld),Z.setFromMatrixPosition(pe.matrixWorld);const xe=O.distanceTo(Z),Se=K.projectionMatrix.elements,Ge=pe.projectionMatrix.elements,bt=Se[14]/(Se[10]-1),I=Se[14]/(Se[10]+1),it=(Se[9]+1)/Se[5],Be=(Se[9]-1)/Se[5],Fe=(Se[8]-1)/Se[0],Ee=(Ge[8]+1)/Ge[0],pt=bt*Fe,Te=bt*Ee,We=xe/(-Fe+Ee),Nt=We*-Fe;if(K.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(Nt),X.translateZ(We),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),Se[10]===-1)X.projectionMatrix.copy(K.projectionMatrix),X.projectionMatrixInverse.copy(K.projectionMatrixInverse);else{const Mt=bt+We,P=I+We,x=pt-Nt,H=Te+(xe-Nt),Y=it*I/P*Mt,J=Be*I/P*Mt;X.projectionMatrix.makePerspective(x,H,Y,J,Mt,P),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function se(X,K){K===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(K.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(s===null)return;let K=X.near,pe=X.far;m.texture!==null&&(m.depthNear>0&&(K=m.depthNear),m.depthFar>0&&(pe=m.depthFar)),N.near=b.near=y.near=K,N.far=b.far=y.far=pe,(z!==N.near||V!==N.far)&&(s.updateRenderState({depthNear:N.near,depthFar:N.far}),z=N.near,V=N.far),N.layers.mask=X.layers.mask|6,y.layers.mask=N.layers.mask&3,b.layers.mask=N.layers.mask&5;const xe=X.parent,Se=N.cameras;se(N,xe);for(let Ge=0;Ge<Se.length;Ge++)se(Se[Ge],xe);Se.length===2?Q(N,y,b):N.projectionMatrix.copy(y.projectionMatrix),ge(X,N,xe)};function ge(X,K,pe){pe===null?X.matrix.copy(K.matrixWorld):(X.matrix.copy(pe.matrixWorld),X.matrix.invert(),X.matrix.multiply(K.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(K.projectionMatrix),X.projectionMatrixInverse.copy(K.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=Ha*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return N},this.getFoveation=function(){if(!(h===null&&f===null))return l},this.setFoveation=function(X){l=X,h!==null&&(h.fixedFoveation=X),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=X)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(N)},this.getCameraTexture=function(X){return p[X]};let Me=null;function he(X,K){if(u=K.getViewerPose(c||r),g=K,u!==null){const pe=u.views;f!==null&&(e.setRenderTargetFramebuffer(v,f.framebuffer),e.setRenderTarget(v));let xe=!1;pe.length!==N.cameras.length&&(N.cameras.length=0,xe=!0);for(let I=0;I<pe.length;I++){const it=pe[I];let Be=null;if(f!==null)Be=f.getViewport(it);else{const Ee=d.getViewSubImage(h,it);Be=Ee.viewport,I===0&&(e.setRenderTargetTextures(v,Ee.colorTexture,Ee.depthStencilTexture),e.setRenderTarget(v))}let Fe=C[I];Fe===void 0&&(Fe=new pn,Fe.layers.enable(I),Fe.viewport=new St,C[I]=Fe),Fe.matrix.fromArray(it.transform.matrix),Fe.matrix.decompose(Fe.position,Fe.quaternion,Fe.scale),Fe.projectionMatrix.fromArray(it.projectionMatrix),Fe.projectionMatrixInverse.copy(Fe.projectionMatrix).invert(),Fe.viewport.set(Be.x,Be.y,Be.width,Be.height),I===0&&(N.matrix.copy(Fe.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale)),xe===!0&&N.cameras.push(Fe)}const Se=s.enabledFeatures;if(Se&&Se.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&_){d=i.getBinding();const I=d.getDepthInformation(pe[0]);I&&I.isValid&&I.texture&&m.init(I,s.renderState)}if(Se&&Se.includes("camera-access")&&_){e.state.unbindTexture(),d=i.getBinding();for(let I=0;I<pe.length;I++){const it=pe[I].camera;if(it){let Be=p[it];Be||(Be=new kp,p[it]=Be);const Fe=d.getCameraImage(it);Be.sourceTexture=Fe}}}}for(let pe=0;pe<R.length;pe++){const xe=T[pe],Se=R[pe];xe!==null&&Se!==void 0&&Se.update(xe,K,c||r)}Me&&Me(X,K),K.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:K}),g=null}const _e=new Kp;_e.setAnimationLoop(he),this.setAnimationLoop=function(X){Me=X},this.dispose=function(){}}}const zi=new In,hw=new gt;function fw(n,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,Lp(n)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,w,S,v){p.isMeshBasicMaterial||p.isMeshLambertMaterial?a(m,p):p.isMeshToonMaterial?(a(m,p),d(m,p)):p.isMeshPhongMaterial?(a(m,p),u(m,p)):p.isMeshStandardMaterial?(a(m,p),h(m,p),p.isMeshPhysicalMaterial&&f(m,p,v)):p.isMeshMatcapMaterial?(a(m,p),g(m,p)):p.isMeshDepthMaterial?a(m,p):p.isMeshDistanceMaterial?(a(m,p),_(m,p)):p.isMeshNormalMaterial?a(m,p):p.isLineBasicMaterial?(r(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,w,S):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function a(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===jt&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===jt&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const w=e.get(p),S=w.envMap,v=w.envMapRotation;S&&(m.envMap.value=S,zi.copy(v),zi.x*=-1,zi.y*=-1,zi.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(zi.y*=-1,zi.z*=-1),m.envMapRotation.value.setFromMatrix4(hw.makeRotationFromEuler(zi)),m.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function r(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,w,S){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*w,m.scale.value=S*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function h(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,w){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===jt&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=w.texture,m.transmissionSamplerSize.value.set(w.width,w.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const w=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(w.matrixWorld),m.nearDistance.value=w.shadow.camera.near,m.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function pw(n,e,t,i){let s={},a={},r=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(w,S){const v=S.program;i.uniformBlockBinding(w,v)}function c(w,S){let v=s[w.id];v===void 0&&(g(w),v=u(w),s[w.id]=v,w.addEventListener("dispose",m));const R=S.program;i.updateUBOMapping(w,R);const T=e.render.frame;a[w.id]!==T&&(h(w),a[w.id]=T)}function u(w){const S=d();w.__bindingPointIndex=S;const v=n.createBuffer(),R=w.__size,T=w.usage;return n.bindBuffer(n.UNIFORM_BUFFER,v),n.bufferData(n.UNIFORM_BUFFER,R,T),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,S,v),v}function d(){for(let w=0;w<o;w++)if(r.indexOf(w)===-1)return r.push(w),w;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(w){const S=s[w.id],v=w.uniforms,R=w.__cache;n.bindBuffer(n.UNIFORM_BUFFER,S);for(let T=0,E=v.length;T<E;T++){const A=Array.isArray(v[T])?v[T]:[v[T]];for(let y=0,b=A.length;y<b;y++){const C=A[y];if(f(C,T,y,R)===!0){const N=C.__offset,z=Array.isArray(C.value)?C.value:[C.value];let V=0;for(let G=0;G<z.length;G++){const B=z[G],U=_(B);typeof B=="number"||typeof B=="boolean"?(C.__data[0]=B,n.bufferSubData(n.UNIFORM_BUFFER,N+V,C.__data)):B.isMatrix3?(C.__data[0]=B.elements[0],C.__data[1]=B.elements[1],C.__data[2]=B.elements[2],C.__data[3]=0,C.__data[4]=B.elements[3],C.__data[5]=B.elements[4],C.__data[6]=B.elements[5],C.__data[7]=0,C.__data[8]=B.elements[6],C.__data[9]=B.elements[7],C.__data[10]=B.elements[8],C.__data[11]=0):(B.toArray(C.__data,V),V+=U.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,N,C.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function f(w,S,v,R){const T=w.value,E=S+"_"+v;if(R[E]===void 0)return typeof T=="number"||typeof T=="boolean"?R[E]=T:R[E]=T.clone(),!0;{const A=R[E];if(typeof T=="number"||typeof T=="boolean"){if(A!==T)return R[E]=T,!0}else if(A.equals(T)===!1)return A.copy(T),!0}return!1}function g(w){const S=w.uniforms;let v=0;const R=16;for(let E=0,A=S.length;E<A;E++){const y=Array.isArray(S[E])?S[E]:[S[E]];for(let b=0,C=y.length;b<C;b++){const N=y[b],z=Array.isArray(N.value)?N.value:[N.value];for(let V=0,G=z.length;V<G;V++){const B=z[V],U=_(B),O=v%R,Z=O%U.boundary,Q=O+Z;v+=Z,Q!==0&&R-Q<U.storage&&(v+=R-Q),N.__data=new Float32Array(U.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=v,v+=U.storage}}}const T=v%R;return T>0&&(v+=R-T),w.__size=v,w.__cache={},this}function _(w){const S={boundary:0,storage:0};return typeof w=="number"||typeof w=="boolean"?(S.boundary=4,S.storage=4):w.isVector2?(S.boundary=8,S.storage=8):w.isVector3||w.isColor?(S.boundary=16,S.storage=12):w.isVector4?(S.boundary=16,S.storage=16):w.isMatrix3?(S.boundary=48,S.storage=48):w.isMatrix4?(S.boundary=64,S.storage=64):w.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",w),S}function m(w){const S=w.target;S.removeEventListener("dispose",m);const v=r.indexOf(S.__bindingPointIndex);r.splice(v,1),n.deleteBuffer(s[S.id]),delete s[S.id],delete a[S.id]}function p(){for(const w in s)n.deleteBuffer(s[w]);r=[],s={},a={}}return{bind:l,update:c,dispose:p}}class mw{constructor(e={}){const{canvas:t=g0(),context:i=null,depth:s=!0,stencil:a=!1,alpha:r=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:h=!1}=e;this.isWebGLRenderer=!0;let f;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=i.getContextAttributes().alpha}else f=r;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,p=null;const w=[],S=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=xi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const v=this;let R=!1;this._outputColorSpace=Wt;let T=0,E=0,A=null,y=-1,b=null;const C=new St,N=new St;let z=null;const V=new qe(0);let G=0,B=t.width,U=t.height,O=1,Z=null,Q=null;const se=new St(0,0,B,U),ge=new St(0,0,B,U);let Me=!1;const he=new Ju;let _e=!1,X=!1;const K=new gt,pe=new L,xe=new St,Se={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ge=!1;function bt(){return A===null?O:1}let I=i;function it(M,F){return t.getContext(M,F)}try{const M={alpha:!0,depth:s,stencil:a,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine","three.js r180"),t.addEventListener("webglcontextlost",ce,!1),t.addEventListener("webglcontextrestored",ye,!1),t.addEventListener("webglcontextcreationerror",ee,!1),I===null){const F="webgl2";if(I=it(F,M),I===null)throw it(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(M){throw console.error("THREE.WebGLRenderer: "+M.message),M}let Be,Fe,Ee,pt,Te,We,Nt,Mt,P,x,H,Y,J,q,Pe,oe,Ae,Ce,ne,me,Ue,Re,de,He;function D(){Be=new Ex(I),Be.init(),Re=new ow(I,Be),Fe=new vx(I,Be,e,Re),Ee=new aw(I,Be),Fe.reversedDepthBuffer&&h&&Ee.buffers.depth.setReversed(!0),pt=new Cx(I),Te=new XS,We=new rw(I,Be,Ee,Te,Fe,Re,pt),Nt=new bx(v),Mt=new Mx(v),P=new Dv(I),de=new gx(I,P),x=new Tx(I,P,pt,de),H=new Px(I,x,P,pt),ne=new Rx(I,Fe,We),oe=new yx(Te),Y=new $S(v,Nt,Mt,Be,Fe,de,oe),J=new fw(v,Te),q=new YS,Pe=new ew(Be),Ce=new mx(v,Nt,Mt,Ee,H,f,l),Ae=new iw(v,H,Fe),He=new pw(I,pt,Fe,Ee),me=new _x(I,Be,pt),Ue=new Ax(I,Be,pt),pt.programs=Y.programs,v.capabilities=Fe,v.extensions=Be,v.properties=Te,v.renderLists=q,v.shadowMap=Ae,v.state=Ee,v.info=pt}D();const ie=new dw(v,I);this.xr=ie,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const M=Be.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){const M=Be.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return O},this.setPixelRatio=function(M){M!==void 0&&(O=M,this.setSize(B,U,!1))},this.getSize=function(M){return M.set(B,U)},this.setSize=function(M,F,W=!0){if(ie.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}B=M,U=F,t.width=Math.floor(M*O),t.height=Math.floor(F*O),W===!0&&(t.style.width=M+"px",t.style.height=F+"px"),this.setViewport(0,0,M,F)},this.getDrawingBufferSize=function(M){return M.set(B*O,U*O).floor()},this.setDrawingBufferSize=function(M,F,W){B=M,U=F,O=W,t.width=Math.floor(M*W),t.height=Math.floor(F*W),this.setViewport(0,0,M,F)},this.getCurrentViewport=function(M){return M.copy(C)},this.getViewport=function(M){return M.copy(se)},this.setViewport=function(M,F,W,$){M.isVector4?se.set(M.x,M.y,M.z,M.w):se.set(M,F,W,$),Ee.viewport(C.copy(se).multiplyScalar(O).round())},this.getScissor=function(M){return M.copy(ge)},this.setScissor=function(M,F,W,$){M.isVector4?ge.set(M.x,M.y,M.z,M.w):ge.set(M,F,W,$),Ee.scissor(N.copy(ge).multiplyScalar(O).round())},this.getScissorTest=function(){return Me},this.setScissorTest=function(M){Ee.setScissorTest(Me=M)},this.setOpaqueSort=function(M){Z=M},this.setTransparentSort=function(M){Q=M},this.getClearColor=function(M){return M.copy(Ce.getClearColor())},this.setClearColor=function(){Ce.setClearColor(...arguments)},this.getClearAlpha=function(){return Ce.getClearAlpha()},this.setClearAlpha=function(){Ce.setClearAlpha(...arguments)},this.clear=function(M=!0,F=!0,W=!0){let $=0;if(M){let k=!1;if(A!==null){const te=A.texture.format;k=te===qu||te===Xu||te===$u}if(k){const te=A.texture.type,fe=te===Gn||te===ts||te===Oa||te===ka||te===Gu||te===Wu,be=Ce.getClearColor(),ve=Ce.getClearAlpha(),De=be.r,Oe=be.g,Le=be.b;fe?(g[0]=De,g[1]=Oe,g[2]=Le,g[3]=ve,I.clearBufferuiv(I.COLOR,0,g)):(_[0]=De,_[1]=Oe,_[2]=Le,_[3]=ve,I.clearBufferiv(I.COLOR,0,_))}else $|=I.COLOR_BUFFER_BIT}F&&($|=I.DEPTH_BUFFER_BIT),W&&($|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),I.clear($)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ce,!1),t.removeEventListener("webglcontextrestored",ye,!1),t.removeEventListener("webglcontextcreationerror",ee,!1),Ce.dispose(),q.dispose(),Pe.dispose(),Te.dispose(),Nt.dispose(),Mt.dispose(),H.dispose(),de.dispose(),He.dispose(),Y.dispose(),ie.dispose(),ie.removeEventListener("sessionstart",Dn),ie.removeEventListener("sessionend",wd),Ni.stop()};function ce(M){M.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),R=!0}function ye(){console.log("THREE.WebGLRenderer: Context Restored."),R=!1;const M=pt.autoReset,F=Ae.enabled,W=Ae.autoUpdate,$=Ae.needsUpdate,k=Ae.type;D(),pt.autoReset=M,Ae.enabled=F,Ae.autoUpdate=W,Ae.needsUpdate=$,Ae.type=k}function ee(M){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function j(M){const F=M.target;F.removeEventListener("dispose",j),we(F)}function we(M){ke(M),Te.remove(M)}function ke(M){const F=Te.get(M).programs;F!==void 0&&(F.forEach(function(W){Y.releaseProgram(W)}),M.isShaderMaterial&&Y.releaseShaderCache(M))}this.renderBufferDirect=function(M,F,W,$,k,te){F===null&&(F=Se);const fe=k.isMesh&&k.matrixWorld.determinant()<0,be=o_(M,F,W,$,k);Ee.setMaterial($,fe);let ve=W.index,De=1;if($.wireframe===!0){if(ve=x.getWireframeAttribute(W),ve===void 0)return;De=2}const Oe=W.drawRange,Le=W.attributes.position;let Ye=Oe.start*De,st=(Oe.start+Oe.count)*De;te!==null&&(Ye=Math.max(Ye,te.start*De),st=Math.min(st,(te.start+te.count)*De)),ve!==null?(Ye=Math.max(Ye,0),st=Math.min(st,ve.count)):Le!=null&&(Ye=Math.max(Ye,0),st=Math.min(st,Le.count));const xt=st-Ye;if(xt<0||xt===1/0)return;de.setup(k,$,be,W,ve);let dt,ot=me;if(ve!==null&&(dt=P.get(ve),ot=Ue,ot.setIndex(dt)),k.isMesh)$.wireframe===!0?(Ee.setLineWidth($.wireframeLinewidth*bt()),ot.setMode(I.LINES)):ot.setMode(I.TRIANGLES);else if(k.isLine){let Ne=$.linewidth;Ne===void 0&&(Ne=1),Ee.setLineWidth(Ne*bt()),k.isLineSegments?ot.setMode(I.LINES):k.isLineLoop?ot.setMode(I.LINE_LOOP):ot.setMode(I.LINE_STRIP)}else k.isPoints?ot.setMode(I.POINTS):k.isSprite&&ot.setMode(I.TRIANGLES);if(k.isBatchedMesh)if(k._multiDrawInstances!==null)Va("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ot.renderMultiDrawInstances(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount,k._multiDrawInstances);else if(Be.get("WEBGL_multi_draw"))ot.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{const Ne=k._multiDrawStarts,_t=k._multiDrawCounts,Je=k._multiDrawCount,en=ve?P.get(ve).bytesPerElement:1,us=Te.get($).currentProgram.getUniforms();for(let tn=0;tn<Je;tn++)us.setValue(I,"_gl_DrawID",tn),ot.render(Ne[tn]/en,_t[tn])}else if(k.isInstancedMesh)ot.renderInstances(Ye,xt,k.count);else if(W.isInstancedBufferGeometry){const Ne=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,_t=Math.min(W.instanceCount,Ne);ot.renderInstances(Ye,xt,_t)}else ot.render(Ye,xt)};function ut(M,F,W){M.transparent===!0&&M.side===et&&M.forceSinglePass===!1?(M.side=jt,M.needsUpdate=!0,cr(M,F,W),M.side=Ei,M.needsUpdate=!0,cr(M,F,W),M.side=et):cr(M,F,W)}this.compile=function(M,F,W=null){W===null&&(W=M),p=Pe.get(W),p.init(F),S.push(p),W.traverseVisible(function(k){k.isLight&&k.layers.test(F.layers)&&(p.pushLight(k),k.castShadow&&p.pushShadow(k))}),M!==W&&M.traverseVisible(function(k){k.isLight&&k.layers.test(F.layers)&&(p.pushLight(k),k.castShadow&&p.pushShadow(k))}),p.setupLights();const $=new Set;return M.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;const te=k.material;if(te)if(Array.isArray(te))for(let fe=0;fe<te.length;fe++){const be=te[fe];ut(be,W,k),$.add(be)}else ut(te,W,k),$.add(te)}),p=S.pop(),$},this.compileAsync=function(M,F,W=null){const $=this.compile(M,F,W);return new Promise(k=>{function te(){if($.forEach(function(fe){Te.get(fe).currentProgram.isReady()&&$.delete(fe)}),$.size===0){k(M);return}setTimeout(te,10)}Be.get("KHR_parallel_shader_compile")!==null?te():setTimeout(te,10)})};let tt=null;function $n(M){tt&&tt(M)}function Dn(){Ni.stop()}function wd(){Ni.start()}const Ni=new Kp;Ni.setAnimationLoop($n),typeof self<"u"&&Ni.setContext(self),this.setAnimationLoop=function(M){tt=M,ie.setAnimationLoop(M),M===null?Ni.stop():Ni.start()},ie.addEventListener("sessionstart",Dn),ie.addEventListener("sessionend",wd),this.render=function(M,F){if(F!==void 0&&F.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),ie.enabled===!0&&ie.isPresenting===!0&&(ie.cameraAutoUpdate===!0&&ie.updateCamera(F),F=ie.getCamera()),M.isScene===!0&&M.onBeforeRender(v,M,F,A),p=Pe.get(M,S.length),p.init(F),S.push(p),K.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),he.setFromProjectionMatrix(K,kn,F.reversedDepth),X=this.localClippingEnabled,_e=oe.init(this.clippingPlanes,X),m=q.get(M,w.length),m.init(),w.push(m),ie.enabled===!0&&ie.isPresenting===!0){const te=v.xr.getDepthSensingMesh();te!==null&&rl(te,F,-1/0,v.sortObjects)}rl(M,F,0,v.sortObjects),m.finish(),v.sortObjects===!0&&m.sort(Z,Q),Ge=ie.enabled===!1||ie.isPresenting===!1||ie.hasDepthSensing()===!1,Ge&&Ce.addToRenderList(m,M),this.info.render.frame++,_e===!0&&oe.beginShadows();const W=p.state.shadowsArray;Ae.render(W,M,F),_e===!0&&oe.endShadows(),this.info.autoReset===!0&&this.info.reset();const $=m.opaque,k=m.transmissive;if(p.setupLights(),F.isArrayCamera){const te=F.cameras;if(k.length>0)for(let fe=0,be=te.length;fe<be;fe++){const ve=te[fe];Ed($,k,M,ve)}Ge&&Ce.render(M);for(let fe=0,be=te.length;fe<be;fe++){const ve=te[fe];Md(m,M,ve,ve.viewport)}}else k.length>0&&Ed($,k,M,F),Ge&&Ce.render(M),Md(m,M,F);A!==null&&E===0&&(We.updateMultisampleRenderTarget(A),We.updateRenderTargetMipmap(A)),M.isScene===!0&&M.onAfterRender(v,M,F),de.resetDefaultState(),y=-1,b=null,S.pop(),S.length>0?(p=S[S.length-1],_e===!0&&oe.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,w.pop(),w.length>0?m=w[w.length-1]:m=null};function rl(M,F,W,$){if(M.visible===!1)return;if(M.layers.test(F.layers)){if(M.isGroup)W=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(F);else if(M.isLight)p.pushLight(M),M.castShadow&&p.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||he.intersectsSprite(M)){$&&xe.setFromMatrixPosition(M.matrixWorld).applyMatrix4(K);const fe=H.update(M),be=M.material;be.visible&&m.push(M,fe,be,W,xe.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||he.intersectsObject(M))){const fe=H.update(M),be=M.material;if($&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),xe.copy(M.boundingSphere.center)):(fe.boundingSphere===null&&fe.computeBoundingSphere(),xe.copy(fe.boundingSphere.center)),xe.applyMatrix4(M.matrixWorld).applyMatrix4(K)),Array.isArray(be)){const ve=fe.groups;for(let De=0,Oe=ve.length;De<Oe;De++){const Le=ve[De],Ye=be[Le.materialIndex];Ye&&Ye.visible&&m.push(M,fe,Ye,W,xe.z,Le)}}else be.visible&&m.push(M,fe,be,W,xe.z,null)}}const te=M.children;for(let fe=0,be=te.length;fe<be;fe++)rl(te[fe],F,W,$)}function Md(M,F,W,$){const k=M.opaque,te=M.transmissive,fe=M.transparent;p.setupLightsView(W),_e===!0&&oe.setGlobalState(v.clippingPlanes,W),$&&Ee.viewport(C.copy($)),k.length>0&&lr(k,F,W),te.length>0&&lr(te,F,W),fe.length>0&&lr(fe,F,W),Ee.buffers.depth.setTest(!0),Ee.buffers.depth.setMask(!0),Ee.buffers.color.setMask(!0),Ee.setPolygonOffset(!1)}function Ed(M,F,W,$){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[$.id]===void 0&&(p.state.transmissionRenderTarget[$.id]=new ns(1,1,{generateMipmaps:!0,type:Be.has("EXT_color_buffer_half_float")||Be.has("EXT_color_buffer_float")?ir:Gn,minFilter:Ki,samples:4,stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Qe.workingColorSpace}));const te=p.state.transmissionRenderTarget[$.id],fe=$.viewport||C;te.setSize(fe.z*v.transmissionResolutionScale,fe.w*v.transmissionResolutionScale);const be=v.getRenderTarget(),ve=v.getActiveCubeFace(),De=v.getActiveMipmapLevel();v.setRenderTarget(te),v.getClearColor(V),G=v.getClearAlpha(),G<1&&v.setClearColor(16777215,.5),v.clear(),Ge&&Ce.render(W);const Oe=v.toneMapping;v.toneMapping=xi;const Le=$.viewport;if($.viewport!==void 0&&($.viewport=void 0),p.setupLightsView($),_e===!0&&oe.setGlobalState(v.clippingPlanes,$),lr(M,W,$),We.updateMultisampleRenderTarget(te),We.updateRenderTargetMipmap(te),Be.has("WEBGL_multisampled_render_to_texture")===!1){let Ye=!1;for(let st=0,xt=F.length;st<xt;st++){const dt=F[st],ot=dt.object,Ne=dt.geometry,_t=dt.material,Je=dt.group;if(_t.side===et&&ot.layers.test($.layers)){const en=_t.side;_t.side=jt,_t.needsUpdate=!0,Td(ot,W,$,Ne,_t,Je),_t.side=en,_t.needsUpdate=!0,Ye=!0}}Ye===!0&&(We.updateMultisampleRenderTarget(te),We.updateRenderTargetMipmap(te))}v.setRenderTarget(be,ve,De),v.setClearColor(V,G),Le!==void 0&&($.viewport=Le),v.toneMapping=Oe}function lr(M,F,W){const $=F.isScene===!0?F.overrideMaterial:null;for(let k=0,te=M.length;k<te;k++){const fe=M[k],be=fe.object,ve=fe.geometry,De=fe.group;let Oe=fe.material;Oe.allowOverride===!0&&$!==null&&(Oe=$),be.layers.test(W.layers)&&Td(be,F,W,ve,Oe,De)}}function Td(M,F,W,$,k,te){M.onBeforeRender(v,F,W,$,k,te),M.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),k.onBeforeRender(v,F,W,$,M,te),k.transparent===!0&&k.side===et&&k.forceSinglePass===!1?(k.side=jt,k.needsUpdate=!0,v.renderBufferDirect(W,F,$,k,M,te),k.side=Ei,k.needsUpdate=!0,v.renderBufferDirect(W,F,$,k,M,te),k.side=et):v.renderBufferDirect(W,F,$,k,M,te),M.onAfterRender(v,F,W,$,k,te)}function cr(M,F,W){F.isScene!==!0&&(F=Se);const $=Te.get(M),k=p.state.lights,te=p.state.shadowsArray,fe=k.state.version,be=Y.getParameters(M,k.state,te,F,W),ve=Y.getProgramCacheKey(be);let De=$.programs;$.environment=M.isMeshStandardMaterial?F.environment:null,$.fog=F.fog,$.envMap=(M.isMeshStandardMaterial?Mt:Nt).get(M.envMap||$.environment),$.envMapRotation=$.environment!==null&&M.envMap===null?F.environmentRotation:M.envMapRotation,De===void 0&&(M.addEventListener("dispose",j),De=new Map,$.programs=De);let Oe=De.get(ve);if(Oe!==void 0){if($.currentProgram===Oe&&$.lightsStateVersion===fe)return Cd(M,be),Oe}else be.uniforms=Y.getUniforms(M),M.onBeforeCompile(be,v),Oe=Y.acquireProgram(be,ve),De.set(ve,Oe),$.uniforms=be.uniforms;const Le=$.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(Le.clippingPlanes=oe.uniform),Cd(M,be),$.needsLights=c_(M),$.lightsStateVersion=fe,$.needsLights&&(Le.ambientLightColor.value=k.state.ambient,Le.lightProbe.value=k.state.probe,Le.directionalLights.value=k.state.directional,Le.directionalLightShadows.value=k.state.directionalShadow,Le.spotLights.value=k.state.spot,Le.spotLightShadows.value=k.state.spotShadow,Le.rectAreaLights.value=k.state.rectArea,Le.ltc_1.value=k.state.rectAreaLTC1,Le.ltc_2.value=k.state.rectAreaLTC2,Le.pointLights.value=k.state.point,Le.pointLightShadows.value=k.state.pointShadow,Le.hemisphereLights.value=k.state.hemi,Le.directionalShadowMap.value=k.state.directionalShadowMap,Le.directionalShadowMatrix.value=k.state.directionalShadowMatrix,Le.spotShadowMap.value=k.state.spotShadowMap,Le.spotLightMatrix.value=k.state.spotLightMatrix,Le.spotLightMap.value=k.state.spotLightMap,Le.pointShadowMap.value=k.state.pointShadowMap,Le.pointShadowMatrix.value=k.state.pointShadowMatrix),$.currentProgram=Oe,$.uniformsList=null,Oe}function Ad(M){if(M.uniformsList===null){const F=M.currentProgram.getUniforms();M.uniformsList=eo.seqWithValue(F.seq,M.uniforms)}return M.uniformsList}function Cd(M,F){const W=Te.get(M);W.outputColorSpace=F.outputColorSpace,W.batching=F.batching,W.batchingColor=F.batchingColor,W.instancing=F.instancing,W.instancingColor=F.instancingColor,W.instancingMorph=F.instancingMorph,W.skinning=F.skinning,W.morphTargets=F.morphTargets,W.morphNormals=F.morphNormals,W.morphColors=F.morphColors,W.morphTargetsCount=F.morphTargetsCount,W.numClippingPlanes=F.numClippingPlanes,W.numIntersection=F.numClipIntersection,W.vertexAlphas=F.vertexAlphas,W.vertexTangents=F.vertexTangents,W.toneMapping=F.toneMapping}function o_(M,F,W,$,k){F.isScene!==!0&&(F=Se),We.resetTextureUnits();const te=F.fog,fe=$.isMeshStandardMaterial?F.environment:null,be=A===null?v.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:Zs,ve=($.isMeshStandardMaterial?Mt:Nt).get($.envMap||fe),De=$.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,Oe=!!W.attributes.tangent&&(!!$.normalMap||$.anisotropy>0),Le=!!W.morphAttributes.position,Ye=!!W.morphAttributes.normal,st=!!W.morphAttributes.color;let xt=xi;$.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(xt=v.toneMapping);const dt=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,ot=dt!==void 0?dt.length:0,Ne=Te.get($),_t=p.state.lights;if(_e===!0&&(X===!0||M!==b)){const Ht=M===b&&$.id===y;oe.setState($,M,Ht)}let Je=!1;$.version===Ne.__version?(Ne.needsLights&&Ne.lightsStateVersion!==_t.state.version||Ne.outputColorSpace!==be||k.isBatchedMesh&&Ne.batching===!1||!k.isBatchedMesh&&Ne.batching===!0||k.isBatchedMesh&&Ne.batchingColor===!0&&k.colorTexture===null||k.isBatchedMesh&&Ne.batchingColor===!1&&k.colorTexture!==null||k.isInstancedMesh&&Ne.instancing===!1||!k.isInstancedMesh&&Ne.instancing===!0||k.isSkinnedMesh&&Ne.skinning===!1||!k.isSkinnedMesh&&Ne.skinning===!0||k.isInstancedMesh&&Ne.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&Ne.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&Ne.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&Ne.instancingMorph===!1&&k.morphTexture!==null||Ne.envMap!==ve||$.fog===!0&&Ne.fog!==te||Ne.numClippingPlanes!==void 0&&(Ne.numClippingPlanes!==oe.numPlanes||Ne.numIntersection!==oe.numIntersection)||Ne.vertexAlphas!==De||Ne.vertexTangents!==Oe||Ne.morphTargets!==Le||Ne.morphNormals!==Ye||Ne.morphColors!==st||Ne.toneMapping!==xt||Ne.morphTargetsCount!==ot)&&(Je=!0):(Je=!0,Ne.__version=$.version);let en=Ne.currentProgram;Je===!0&&(en=cr($,F,k));let us=!1,tn=!1,oa=!1;const vt=en.getUniforms(),cn=Ne.uniforms;if(Ee.useProgram(en.program)&&(us=!0,tn=!0,oa=!0),$.id!==y&&(y=$.id,tn=!0),us||b!==M){Ee.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),vt.setValue(I,"projectionMatrix",M.projectionMatrix),vt.setValue(I,"viewMatrix",M.matrixWorldInverse);const Yt=vt.map.cameraPosition;Yt!==void 0&&Yt.setValue(I,pe.setFromMatrixPosition(M.matrixWorld)),Fe.logarithmicDepthBuffer&&vt.setValue(I,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),($.isMeshPhongMaterial||$.isMeshToonMaterial||$.isMeshLambertMaterial||$.isMeshBasicMaterial||$.isMeshStandardMaterial||$.isShaderMaterial)&&vt.setValue(I,"isOrthographic",M.isOrthographicCamera===!0),b!==M&&(b=M,tn=!0,oa=!0)}if(k.isSkinnedMesh){vt.setOptional(I,k,"bindMatrix"),vt.setOptional(I,k,"bindMatrixInverse");const Ht=k.skeleton;Ht&&(Ht.boneTexture===null&&Ht.computeBoneTexture(),vt.setValue(I,"boneTexture",Ht.boneTexture,We))}k.isBatchedMesh&&(vt.setOptional(I,k,"batchingTexture"),vt.setValue(I,"batchingTexture",k._matricesTexture,We),vt.setOptional(I,k,"batchingIdTexture"),vt.setValue(I,"batchingIdTexture",k._indirectTexture,We),vt.setOptional(I,k,"batchingColorTexture"),k._colorsTexture!==null&&vt.setValue(I,"batchingColorTexture",k._colorsTexture,We));const un=W.morphAttributes;if((un.position!==void 0||un.normal!==void 0||un.color!==void 0)&&ne.update(k,W,en),(tn||Ne.receiveShadow!==k.receiveShadow)&&(Ne.receiveShadow=k.receiveShadow,vt.setValue(I,"receiveShadow",k.receiveShadow)),$.isMeshGouraudMaterial&&$.envMap!==null&&(cn.envMap.value=ve,cn.flipEnvMap.value=ve.isCubeTexture&&ve.isRenderTargetTexture===!1?-1:1),$.isMeshStandardMaterial&&$.envMap===null&&F.environment!==null&&(cn.envMapIntensity.value=F.environmentIntensity),tn&&(vt.setValue(I,"toneMappingExposure",v.toneMappingExposure),Ne.needsLights&&l_(cn,oa),te&&$.fog===!0&&J.refreshFogUniforms(cn,te),J.refreshMaterialUniforms(cn,$,O,U,p.state.transmissionRenderTarget[M.id]),eo.upload(I,Ad(Ne),cn,We)),$.isShaderMaterial&&$.uniformsNeedUpdate===!0&&(eo.upload(I,Ad(Ne),cn,We),$.uniformsNeedUpdate=!1),$.isSpriteMaterial&&vt.setValue(I,"center",k.center),vt.setValue(I,"modelViewMatrix",k.modelViewMatrix),vt.setValue(I,"normalMatrix",k.normalMatrix),vt.setValue(I,"modelMatrix",k.matrixWorld),$.isShaderMaterial||$.isRawShaderMaterial){const Ht=$.uniformsGroups;for(let Yt=0,ol=Ht.length;Yt<ol;Yt++){const Di=Ht[Yt];He.update(Di,en),He.bind(Di,en)}}return en}function l_(M,F){M.ambientLightColor.needsUpdate=F,M.lightProbe.needsUpdate=F,M.directionalLights.needsUpdate=F,M.directionalLightShadows.needsUpdate=F,M.pointLights.needsUpdate=F,M.pointLightShadows.needsUpdate=F,M.spotLights.needsUpdate=F,M.spotLightShadows.needsUpdate=F,M.rectAreaLights.needsUpdate=F,M.hemisphereLights.needsUpdate=F}function c_(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return E},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(M,F,W){const $=Te.get(M);$.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,$.__autoAllocateDepthBuffer===!1&&($.__useRenderToTexture=!1),Te.get(M.texture).__webglTexture=F,Te.get(M.depthTexture).__webglTexture=$.__autoAllocateDepthBuffer?void 0:W,$.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,F){const W=Te.get(M);W.__webglFramebuffer=F,W.__useDefaultFramebuffer=F===void 0};const u_=I.createFramebuffer();this.setRenderTarget=function(M,F=0,W=0){A=M,T=F,E=W;let $=!0,k=null,te=!1,fe=!1;if(M){const ve=Te.get(M);if(ve.__useDefaultFramebuffer!==void 0)Ee.bindFramebuffer(I.FRAMEBUFFER,null),$=!1;else if(ve.__webglFramebuffer===void 0)We.setupRenderTarget(M);else if(ve.__hasExternalTextures)We.rebindTextures(M,Te.get(M.texture).__webglTexture,Te.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){const Le=M.depthTexture;if(ve.__boundDepthTexture!==Le){if(Le!==null&&Te.has(Le)&&(M.width!==Le.image.width||M.height!==Le.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");We.setupDepthRenderbuffer(M)}}const De=M.texture;(De.isData3DTexture||De.isDataArrayTexture||De.isCompressedArrayTexture)&&(fe=!0);const Oe=Te.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(Oe[F])?k=Oe[F][W]:k=Oe[F],te=!0):M.samples>0&&We.useMultisampledRTT(M)===!1?k=Te.get(M).__webglMultisampledFramebuffer:Array.isArray(Oe)?k=Oe[W]:k=Oe,C.copy(M.viewport),N.copy(M.scissor),z=M.scissorTest}else C.copy(se).multiplyScalar(O).floor(),N.copy(ge).multiplyScalar(O).floor(),z=Me;if(W!==0&&(k=u_),Ee.bindFramebuffer(I.FRAMEBUFFER,k)&&$&&Ee.drawBuffers(M,k),Ee.viewport(C),Ee.scissor(N),Ee.setScissorTest(z),te){const ve=Te.get(M.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+F,ve.__webglTexture,W)}else if(fe){const ve=F;for(let De=0;De<M.textures.length;De++){const Oe=Te.get(M.textures[De]);I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0+De,Oe.__webglTexture,W,ve)}}else if(M!==null&&W!==0){const ve=Te.get(M.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,ve.__webglTexture,W)}y=-1},this.readRenderTargetPixels=function(M,F,W,$,k,te,fe,be=0){if(!(M&&M.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ve=Te.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&fe!==void 0&&(ve=ve[fe]),ve){Ee.bindFramebuffer(I.FRAMEBUFFER,ve);try{const De=M.textures[be],Oe=De.format,Le=De.type;if(!Fe.textureFormatReadable(Oe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Fe.textureTypeReadable(Le)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=M.width-$&&W>=0&&W<=M.height-k&&(M.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+be),I.readPixels(F,W,$,k,Re.convert(Oe),Re.convert(Le),te))}finally{const De=A!==null?Te.get(A).__webglFramebuffer:null;Ee.bindFramebuffer(I.FRAMEBUFFER,De)}}},this.readRenderTargetPixelsAsync=async function(M,F,W,$,k,te,fe,be=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ve=Te.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&fe!==void 0&&(ve=ve[fe]),ve)if(F>=0&&F<=M.width-$&&W>=0&&W<=M.height-k){Ee.bindFramebuffer(I.FRAMEBUFFER,ve);const De=M.textures[be],Oe=De.format,Le=De.type;if(!Fe.textureFormatReadable(Oe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Fe.textureTypeReadable(Le))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ye=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,Ye),I.bufferData(I.PIXEL_PACK_BUFFER,te.byteLength,I.STREAM_READ),M.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+be),I.readPixels(F,W,$,k,Re.convert(Oe),Re.convert(Le),0);const st=A!==null?Te.get(A).__webglFramebuffer:null;Ee.bindFramebuffer(I.FRAMEBUFFER,st);const xt=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await _0(I,xt,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,Ye),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,te),I.deleteBuffer(Ye),I.deleteSync(xt),te}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,F=null,W=0){const $=Math.pow(2,-W),k=Math.floor(M.image.width*$),te=Math.floor(M.image.height*$),fe=F!==null?F.x:0,be=F!==null?F.y:0;We.setTexture2D(M,0),I.copyTexSubImage2D(I.TEXTURE_2D,W,0,0,fe,be,k,te),Ee.unbindTexture()};const d_=I.createFramebuffer(),h_=I.createFramebuffer();this.copyTextureToTexture=function(M,F,W=null,$=null,k=0,te=null){te===null&&(k!==0?(Va("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),te=k,k=0):te=0);let fe,be,ve,De,Oe,Le,Ye,st,xt;const dt=M.isCompressedTexture?M.mipmaps[te]:M.image;if(W!==null)fe=W.max.x-W.min.x,be=W.max.y-W.min.y,ve=W.isBox3?W.max.z-W.min.z:1,De=W.min.x,Oe=W.min.y,Le=W.isBox3?W.min.z:0;else{const un=Math.pow(2,-k);fe=Math.floor(dt.width*un),be=Math.floor(dt.height*un),M.isDataArrayTexture?ve=dt.depth:M.isData3DTexture?ve=Math.floor(dt.depth*un):ve=1,De=0,Oe=0,Le=0}$!==null?(Ye=$.x,st=$.y,xt=$.z):(Ye=0,st=0,xt=0);const ot=Re.convert(F.format),Ne=Re.convert(F.type);let _t;F.isData3DTexture?(We.setTexture3D(F,0),_t=I.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(We.setTexture2DArray(F,0),_t=I.TEXTURE_2D_ARRAY):(We.setTexture2D(F,0),_t=I.TEXTURE_2D),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,F.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,F.unpackAlignment);const Je=I.getParameter(I.UNPACK_ROW_LENGTH),en=I.getParameter(I.UNPACK_IMAGE_HEIGHT),us=I.getParameter(I.UNPACK_SKIP_PIXELS),tn=I.getParameter(I.UNPACK_SKIP_ROWS),oa=I.getParameter(I.UNPACK_SKIP_IMAGES);I.pixelStorei(I.UNPACK_ROW_LENGTH,dt.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,dt.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,De),I.pixelStorei(I.UNPACK_SKIP_ROWS,Oe),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Le);const vt=M.isDataArrayTexture||M.isData3DTexture,cn=F.isDataArrayTexture||F.isData3DTexture;if(M.isDepthTexture){const un=Te.get(M),Ht=Te.get(F),Yt=Te.get(un.__renderTarget),ol=Te.get(Ht.__renderTarget);Ee.bindFramebuffer(I.READ_FRAMEBUFFER,Yt.__webglFramebuffer),Ee.bindFramebuffer(I.DRAW_FRAMEBUFFER,ol.__webglFramebuffer);for(let Di=0;Di<ve;Di++)vt&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Te.get(M).__webglTexture,k,Le+Di),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Te.get(F).__webglTexture,te,xt+Di)),I.blitFramebuffer(De,Oe,fe,be,Ye,st,fe,be,I.DEPTH_BUFFER_BIT,I.NEAREST);Ee.bindFramebuffer(I.READ_FRAMEBUFFER,null),Ee.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(k!==0||M.isRenderTargetTexture||Te.has(M)){const un=Te.get(M),Ht=Te.get(F);Ee.bindFramebuffer(I.READ_FRAMEBUFFER,d_),Ee.bindFramebuffer(I.DRAW_FRAMEBUFFER,h_);for(let Yt=0;Yt<ve;Yt++)vt?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,un.__webglTexture,k,Le+Yt):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,un.__webglTexture,k),cn?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Ht.__webglTexture,te,xt+Yt):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Ht.__webglTexture,te),k!==0?I.blitFramebuffer(De,Oe,fe,be,Ye,st,fe,be,I.COLOR_BUFFER_BIT,I.NEAREST):cn?I.copyTexSubImage3D(_t,te,Ye,st,xt+Yt,De,Oe,fe,be):I.copyTexSubImage2D(_t,te,Ye,st,De,Oe,fe,be);Ee.bindFramebuffer(I.READ_FRAMEBUFFER,null),Ee.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else cn?M.isDataTexture||M.isData3DTexture?I.texSubImage3D(_t,te,Ye,st,xt,fe,be,ve,ot,Ne,dt.data):F.isCompressedArrayTexture?I.compressedTexSubImage3D(_t,te,Ye,st,xt,fe,be,ve,ot,dt.data):I.texSubImage3D(_t,te,Ye,st,xt,fe,be,ve,ot,Ne,dt):M.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,te,Ye,st,fe,be,ot,Ne,dt.data):M.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,te,Ye,st,dt.width,dt.height,ot,dt.data):I.texSubImage2D(I.TEXTURE_2D,te,Ye,st,fe,be,ot,Ne,dt);I.pixelStorei(I.UNPACK_ROW_LENGTH,Je),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,en),I.pixelStorei(I.UNPACK_SKIP_PIXELS,us),I.pixelStorei(I.UNPACK_SKIP_ROWS,tn),I.pixelStorei(I.UNPACK_SKIP_IMAGES,oa),te===0&&F.generateMipmaps&&I.generateMipmap(_t),Ee.unbindTexture()},this.initRenderTarget=function(M){Te.get(M).__webglFramebuffer===void 0&&We.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?We.setTextureCube(M,0):M.isData3DTexture?We.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?We.setTexture2DArray(M,0):We.setTexture2D(M,0),Ee.unbindTexture()},this.resetState=function(){T=0,E=0,A=null,Ee.reset(),de.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return kn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Qe._getDrawingBufferColorSpace(e),t.unpackColorSpace=Qe._getUnpackColorSpace()}}const kh={type:"change"},ad={type:"start"},tm={type:"end"},zr=new ju,Bh=new mi,gw=Math.cos(70*ht.DEG2RAD),Ct=new L,Zt=2*Math.PI,rt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Wl=1e-6;class _w extends Iv{constructor(e,t=null){super(e,t),this.state=rt.NONE,this.target=new L,this.cursor=new L,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:ks.ROTATE,MIDDLE:ks.DOLLY,RIGHT:ks.PAN},this.touches={ONE:Ns.ROTATE,TWO:Ns.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new L,this._lastQuaternion=new Ti,this._lastTargetPosition=new L,this._quat=new Ti().setFromUnitVectors(e.up,new L(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new dh,this._sphericalDelta=new dh,this._scale=1,this._panOffset=new L,this._rotateStart=new le,this._rotateEnd=new le,this._rotateDelta=new le,this._panStart=new le,this._panEnd=new le,this._panDelta=new le,this._dollyStart=new le,this._dollyEnd=new le,this._dollyDelta=new le,this._dollyDirection=new L,this._mouse=new le,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=yw.bind(this),this._onPointerDown=vw.bind(this),this._onPointerUp=bw.bind(this),this._onContextMenu=Aw.bind(this),this._onMouseWheel=ww.bind(this),this._onKeyDown=Mw.bind(this),this._onTouchStart=Ew.bind(this),this._onTouchMove=Tw.bind(this),this._onMouseDown=xw.bind(this),this._onMouseMove=Sw.bind(this),this._interceptControlDown=Cw.bind(this),this._interceptControlUp=Rw.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(kh),this.update(),this.state=rt.NONE}update(e=null){const t=this.object.position;Ct.copy(t).sub(this.target),Ct.applyQuaternion(this._quat),this._spherical.setFromVector3(Ct),this.autoRotate&&this.state===rt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=Zt:i>Math.PI&&(i-=Zt),s<-Math.PI?s+=Zt:s>Math.PI&&(s-=Zt),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let a=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const r=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),a=r!=this._spherical.radius}if(Ct.setFromSpherical(this._spherical),Ct.applyQuaternion(this._quatInverse),t.copy(this.target).add(Ct),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let r=null;if(this.object.isPerspectiveCamera){const o=Ct.length();r=this._clampDistance(o*this._scale);const l=o-r;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),a=!!l}else if(this.object.isOrthographicCamera){const o=new L(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),a=l!==this.object.zoom;const c=new L(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),r=Ct.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;r!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(r).add(this.object.position):(zr.origin.copy(this.object.position),zr.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(zr.direction))<gw?this.object.lookAt(this.target):(Bh.setFromNormalAndCoplanarPoint(this.object.up,this.target),zr.intersectPlane(Bh,this.target))))}else if(this.object.isOrthographicCamera){const r=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),r!==this.object.zoom&&(this.object.updateProjectionMatrix(),a=!0)}return this._scale=1,this._performCursorZoom=!1,a||this._lastPosition.distanceToSquared(this.object.position)>Wl||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Wl||this._lastTargetPosition.distanceToSquared(this.target)>Wl?(this.dispatchEvent(kh),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Zt/60*this.autoRotateSpeed*e:Zt/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Ct.setFromMatrixColumn(t,0),Ct.multiplyScalar(-e),this._panOffset.add(Ct)}_panUp(e,t){this.screenSpacePanning===!0?Ct.setFromMatrixColumn(t,1):(Ct.setFromMatrixColumn(t,0),Ct.crossVectors(this.object.up,Ct)),Ct.multiplyScalar(e),this._panOffset.add(Ct)}_pan(e,t){const i=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;Ct.copy(s).sub(this.target);let a=Ct.length();a*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*a/i.clientHeight,this.object.matrix),this._panUp(2*t*a/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),s=e-i.left,a=t-i.top,r=i.width,o=i.height;this._mouse.x=s/r*2-1,this._mouse.y=-(a/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Zt*this._rotateDelta.x/t.clientHeight),this._rotateUp(Zt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Zt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Zt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Zt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Zt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(i,s)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,s=e.pageY-t.y,a=Math.sqrt(i*i+s*s);this._dollyStart.set(0,a)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),a=.5*(e.pageY+i.y);this._rotateEnd.set(s,a)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Zt*this._rotateDelta.x/t.clientHeight),this._rotateUp(Zt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,s=e.pageY-t.y,a=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,a),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const r=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(r,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new le,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function vw(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n)))}function yw(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function bw(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(tm),this.state=rt.NONE;break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function xw(n){let e;switch(n.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case ks.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=rt.DOLLY;break;case ks.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=rt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=rt.ROTATE}break;case ks.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=rt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=rt.PAN}break;default:this.state=rt.NONE}this.state!==rt.NONE&&this.dispatchEvent(ad)}function Sw(n){switch(this.state){case rt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case rt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case rt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function ww(n){this.enabled===!1||this.enableZoom===!1||this.state!==rt.NONE||(n.preventDefault(),this.dispatchEvent(ad),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(tm))}function Mw(n){this.enabled!==!1&&this._handleKeyDown(n)}function Ew(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case Ns.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=rt.TOUCH_ROTATE;break;case Ns.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=rt.TOUCH_PAN;break;default:this.state=rt.NONE}break;case 2:switch(this.touches.TWO){case Ns.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=rt.TOUCH_DOLLY_PAN;break;case Ns.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=rt.TOUCH_DOLLY_ROTATE;break;default:this.state=rt.NONE}break;default:this.state=rt.NONE}this.state!==rt.NONE&&this.dispatchEvent(ad)}function Tw(n){switch(this._trackPointer(n),this.state){case rt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case rt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case rt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case rt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=rt.NONE}}function Aw(n){this.enabled!==!1&&n.preventDefault()}function Cw(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Rw(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const rd=1,to=.32,zh=1024,Pw=16;function Hh(n){const e=new lt({color:n,transparent:!0,opacity:rd,side:et});return e.forceSinglePass=!0,e}function Lw(n){return new qp({color:n,side:et,transparent:!0,opacity:rd})}function Rs(n,e,t,i){return new ze(new ls(n,t,e,6,1,6),i)}function $l(n,e,t,i,s,a,r,o){n.beginPath();for(let l=0;l<=e;l+=8){const c=l/e,u=i*t+Math.sin(c*Math.PI*2+a)*s+Math.sin(c*Math.PI*4+a*.5)*s*.35;l===0?n.moveTo(l,u):n.lineTo(l,u)}n.lineWidth=r,n.strokeStyle=o,n.stroke()}function Xl(n,e,t,i,s,a,r,o){n.beginPath();for(let l=0;l<=t;l+=8){const c=l/t,u=i*e+Math.sin(c*Math.PI*2+a)*s+Math.sin(c*Math.PI*6+a*.3)*s*.18;l===0?n.moveTo(u,l):n.lineTo(u,l)}n.lineWidth=r,n.strokeStyle=o,n.stroke()}function ql(n,e,t,i,s,a){n.beginPath(),n.arc(e,t,i,0,Math.PI*2),n.fillStyle=s,n.fill(),n.lineWidth=Math.max(6,i*.15),n.strokeStyle=a,n.stroke()}function Iw(n){const e=document.createElement("canvas");e.width=zh,e.height=zh;const t=e.getContext("2d");if(!t)throw new Error("Unable to create ball texture canvas");const{width:i,height:s}=e,a=t.createLinearGradient(0,0,i,s);a.addColorStop(0,"#faf7ee"),a.addColorStop(.55,"#e7e1d0"),a.addColorStop(1,"#d5cfbe"),t.fillStyle=a,t.fillRect(0,0,i,s),t.globalAlpha=.22;for(let l=0;l<28;l+=1){const c=l/27*s;t.fillStyle=l%2===0?"#ffffff":"#d3cbb6",t.fillRect(0,c,i,s/54)}t.globalAlpha=1;const r="#2d313b";t.lineCap="round",$l(t,i,s,.24,22,.35,18,r),$l(t,i,s,.5,14,1.1,20,r),$l(t,i,s,.77,20,2.35,18,r),Xl(t,i,s,.2,24,.2,18,r),Xl(t,i,s,.48,18,1.6,18,r),Xl(t,i,s,.76,26,2.7,18,r),t.globalAlpha=.92,ql(t,i*.28,s*.32,88,"#f1a63a","#fff4d7"),ql(t,i*.68,s*.6,72,"#4db0ff","#eef8ff"),ql(t,i*.76,s*.2,54,"#1f232c","#f0ece1"),t.globalAlpha=1,t.beginPath(),t.moveTo(i*.08,s*.86),t.quadraticCurveTo(i*.28,s*.72,i*.42,s*.8),t.quadraticCurveTo(i*.58,s*.9,i*.82,s*.78),t.lineWidth=24,t.strokeStyle="rgba(255, 246, 220, 0.9)",t.stroke();const o=new ed(e);return o.colorSpace=Wt,o.anisotropy=Math.min(8,n.capabilities.getMaxAnisotropy()),o}function Nw(n,e,t,i){return new ze(new ls(n,e,t,6,6,1),i)}function Dw(n){const e=10280*n,t=8240*n,i=1960*n,s=1e3*n,a=1900*n,r=800*n,o=900*n,l=Math.max(1,n),c=[],u=[1,-1];function d(_,m,p=null){const w=_.material.clone();return _.material=w,c.push({mesh:_,material:w,outwardLocal:m.clone().normalize(),fixedOpacity:p}),_}function h(_){const m=new mt,p=Hh(_),w=t/2-s-a/2,S=Math.sqrt(2*Math.pow(s,2));for(const R of u){const T=d(Rs(w,i,l,p),new L(0,1,0));T.position.set(R*(w/2+a/2),0,i/2),m.add(T);const E=d(Rs(S,i,l,p),new L(0,1,0));E.position.set(R*(t/2-s/2),-s/2,i/2),E.rotateZ(-R*Math.PI/4),m.add(E)}const v=d(Rs(a,i-r,l,p),new L(0,1,0));return v.position.set(0,0,i/2+r/2),m.add(v),m}function f(_,m){const p=new mt,w=[[t/2,0],[-t/2,0],[-t/2,e/2-s],[-t/2+s,e/2],[-a/2,e/2],[-a/2,e/2+o],[a/2,e/2+o],[a/2,e/2],[t/2-s,e/2],[t/2,e/2-s],[t/2,0]],S=new id;w.forEach(([b,C],N)=>{N===0?S.moveTo(b,C):S.lineTo(b,C)});const v=Lw(_),R=Hh(_),T=d(new ze(new qo(S),v),new L(0,0,-1));T.receiveShadow=!0,p.add(T);for(const b of u){const C=d(Rs(o,r,l,R),new L(0,-b,0),to);C.position.set(b*a/2,e/2+o/2,r/2),C.rotateZ(Math.PI/2),p.add(C)}const E=d(Nw(a,o,l,R),new L(0,0,1),to);E.position.set(0,e/2+o/2,r),p.add(E);const A=d(Rs(a,r,l,R),new L(0,1,0),to);A.position.set(0,e/2+o,r/2),p.add(A);const y=h(_);y.position.y=e/2,p.add(y);for(const b of u){const C=d(Rs(e/2-s,i,l,R),new L(0,-b,0));C.position.set(b*t/2,(e/2-s)/2,i/2),C.rotateZ(Math.PI/2),p.add(C)}return m&&p.rotateZ(Math.PI),p}const g=new mt;return g.add(f(16771251,!1)),g.add(f(8381439,!0)),{stadium:g,wallPanels:c}}function Uw(n){const e=[[100,-100,100],[100,100,100],[-100,100,100],[-100,-100,100],[150,-220,20],[-150,-220,20],[130,-400,-20],[-130,-400,-20],[140,170,25],[-140,170,25],[130,240,25],[-130,240,25],[130,-400,-80],[-130,-400,-80],[150,-220,-80],[-150,-220,-80],[140,170,-80],[-140,170,-80],[130,240,-80],[-130,240,-80]],t=[[0,1,2],[0,2,3],[4,0,5],[0,3,5],[6,4,5],[6,5,7],[1,8,9],[1,9,2],[4,8,1],[4,1,0],[3,2,9],[3,9,5],[8,10,11],[8,11,9],[12,6,7],[12,7,13],[7,5,15],[7,15,13],[6,14,4],[12,14,6],[14,16,4],[4,16,8],[5,9,15],[15,9,17],[16,18,8],[8,18,10],[9,11,17],[17,11,19],[10,18,11],[11,18,19],[14,12,13],[14,13,15],[16,14,15],[16,15,17],[18,16,17],[18,17,19]],i=new Tt;i.setAttribute("position",new ct(e.flat(),3)),i.setIndex(t.flat()),i.computeVertexNormals();const s=new mt,a=new mt,r=new ze(i,new qp({color:n}));r.castShadow=!0,a.add(r);const o=new Mo({color:1710894,shininess:120,transparent:!0,opacity:.82}),l=[[100,-100,100],[-100,-100,100],[150,-220,20],[-150,-220,20],[100,100,100],[-100,100,100],[140,170,25],[-140,170,25],[100,-100,100],[100,100,100],[150,-220,20],[140,170,25],[-100,-100,100],[-100,100,100],[-150,-220,20],[-140,170,25]],c=[[0,2,3],[0,3,1],[4,6,7],[4,7,5],[8,10,11],[8,11,9],[12,14,15],[12,15,13]],u=new Tt;u.setAttribute("position",new ct(l.flat(),3)),u.setIndex(c.flat()),u.computeVertexNormals();const d=new ze(u,o);d.position.z=1,a.add(d);const h=new lt({color:8968191,transparent:!0,opacity:.34,side:et}),f=new Tt;f.setAttribute("position",new ct([90,-110,95,-90,-110,95,140,-210,25,-140,-210,25],3)),f.setIndex([0,2,3,0,3,1]),f.computeVertexNormals();const g=new ze(f,h);g.position.z=2,a.add(g);const _=new Mo({color:2236962,shininess:48}),m=(p,w,S,v)=>{const R=new ze(new Xo(70,70,v,10),_);return R.rotateZ(Math.PI/2),R.position.set(p,w,S),R.castShadow=!0,R};return a.add(m(120,-300,-60,50)),a.add(m(-120,-300,-60,50)),a.add(m(120,150,-60,70)),a.add(m(-120,150,-60,70)),a.position.set(0,0,50),a.rotateZ(Math.PI/2),a.scale.set(.35,.35,.35),s.add(a),s}function Fw(){const n=new mt;n.visible=!1,n.position.set(-124,0,8);const e=new Ga(30,220,14,1,!0);e.rotateZ(Math.PI/2),e.translate(-110,0,0);const t=new Ga(17,150,12,1,!0);t.rotateZ(Math.PI/2),t.translate(-75,0,0);const i=new Js(21,12,12),s=[-38,38];for(const a of s){const r=new mt;r.position.set(0,a,0);const o=new lt({color:"#ff9b2f",transparent:!0,opacity:.42,blending:bi,depthWrite:!1,side:et});o.forceSinglePass=!0;const l=new ze(e,o);l.name="outer-flame",r.add(l);const c=new lt({color:"#fff2ba",transparent:!0,opacity:.9,blending:bi,depthWrite:!1,side:et});c.forceSinglePass=!0;const u=new ze(t,c);u.name="inner-flame",r.add(u);const d=new lt({color:"#fff8db",transparent:!0,opacity:.62,blending:bi,depthWrite:!1});d.forceSinglePass=!0;const h=new ze(i,d);h.name="glow",h.position.x=-10,r.add(h),n.add(r)}return n}function Ow(){const n=new mt;n.visible=!1,n.position.set(0,0,235);const e=240,t=82,i=188,s=20,a=new rn(e,t),r=new lt({color:463645,transparent:!0,opacity:.78,side:et,depthWrite:!1}),o=new ze(a,r);o.position.z=-1,n.add(o);const l=new rn(i,s),c=new lt({color:1385521,transparent:!0,opacity:.92,side:et,depthWrite:!1}),u=new ze(l,c);u.position.y=-18,n.add(u);const d=new rn(i,s),h=new lt({color:16761415,transparent:!0,opacity:.98,side:et,depthWrite:!1}),f=new ze(d,h);f.position.y=-18,n.add(f);const g=document.createElement("canvas");g.width=512,g.height=160;const _=g.getContext("2d");if(!_)throw new Error("Unable to create boost meter label context");const m=new ed(g);m.colorSpace=Wt,m.needsUpdate=!0;const p=new rn(190,48),w=new lt({map:m,transparent:!0,depthWrite:!1,side:et}),S=new ze(p,w);return S.position.set(0,15,0),n.add(S),{group:n,fillMesh:f,fillMaterial:h,labelTexture:m,labelContext:_,labelCanvas:g,lastPercent:null}}function kw(n,e,t,i){n.fillMesh.scale.x=Math.max(.001,e);const s=94;n.fillMesh.position.x=-(1-e)*s,n.fillMesh.position.y=-18;const a=Math.max(0,Math.min(100,Math.round(t/255*100)));if(n.lastPercent!==a){const{labelContext:r,labelCanvas:o,labelTexture:l}=n;r.clearRect(0,0,o.width,o.height),r.textAlign="center",r.textBaseline="middle",r.lineJoin="round",r.font="700 84px sans-serif",r.lineWidth=18,r.strokeStyle="rgba(7, 19, 29, 0.92)",r.strokeText(`${a}`,o.width/2,78),r.fillStyle="#fff8e1",r.fillText(`${a}`,o.width/2,78),r.font="600 30px sans-serif",r.lineWidth=10,r.strokeText("BOOST",o.width/2,130),r.fillStyle="#ffcf70",r.fillText("BOOST",o.width/2,130),l.needsUpdate=!0,n.lastPercent=a}n.group.quaternion.copy(i.quaternion)}function Bw(n){n.add(new Rv("#d8ecff",1.6));const e=new uh("#fff6df",2.4);e.position.set(4e3,-6e3,5e3),n.add(e);const t=new uh("#97d7ff",1.2);t.position.set(-5e3,4e3,3e3),n.add(t)}function zw(n){const e=Iw(n),t=new Mo({color:16777215,map:e,shininess:42,specular:new qe("#f7f2e3")});return{mesh:new ze(new Js(93,24,24),t),texture:e}}function Hw(n,e,t){const i=new V0;i.background=new qe("#081119");const s=new pn(48,1,10*t,5e5*t);s.up.set(0,0,1),s.position.set(0,-9e3*t,5e3*t),s.lookAt(0,0,0);const a=new mw({antialias:!0});a.setPixelRatio(window.devicePixelRatio),a.domElement.style.display="block",a.domElement.style.width="100%",a.domElement.style.height="100%",a.domElement.tabIndex=0,a.domElement.setAttribute("aria-label","Replay player viewport"),n.replaceChildren(a.domElement);const r=new _w(s,a.domElement);r.enableDamping=!0,r.maxDistance=16e4*t,r.keyPanSpeed=Pw,r.target.set(0,0,600*t),r.listenToKeyEvents(a.domElement),r.update();const o=()=>{a.domElement.focus()};a.domElement.addEventListener("pointerdown",o);const{stadium:l,wallPanels:c}=Dw(t);i.add(l),Bw(i);const u=new mt;u.scale.set(-t,t,t),i.add(u);const{mesh:d,texture:h}=zw(a);u.add(d);const f=new Map,g=new Map,_=new Map;for(const E of e.players){const A=Uw(E.isTeamZero?"#57a8ff":"#ff9c40"),y=Fw();A.add(y);const b=Ow();A.add(b.group),u.add(A),f.set(E.id,A),g.set(E.id,y),_.set(E.id,b)}const m=()=>{const E=n.clientWidth||1,A=n.clientHeight||1;s.aspect=E/A,s.updateProjectionMatrix(),a.setSize(E,A,!1)};m();const p=new L,w=new L,S=new Ti,v=new L;return{scene:i,replayRoot:u,camera:s,renderer:a,controls:r,resize:m,dispose:()=>{a.domElement.removeEventListener("pointerdown",o),r.stopListenToKeyEvents(),r.dispose(),h.dispose(),a.dispose(),n.replaceChildren()},ballMesh:d,playerMeshes:f,playerBoostTrails:g,playerBoostMeters:_,updateWallVisibility:()=>{i.updateMatrixWorld(!0);for(const E of c){if(E.fixedOpacity!==null){E.material.transparent=!0,E.material.opacity=E.fixedOpacity,E.material.depthWrite=!1;continue}E.mesh.getWorldPosition(p),E.mesh.getWorldQuaternion(S),w.copy(E.outwardLocal).applyQuaternion(S).normalize(),v.copy(s.position).sub(p);const A=w.dot(v)>0;E.material.transparent=!0,E.material.opacity=A?to:rd,E.material.depthWrite=!A}}}}function ba(n,e){if(n.frames.length===0)return 0;let t=0,i=n.frames.length-1;for(;t<=i;){const s=Math.floor((t+i)/2),a=n.frames[s]?.time??0;if(a<e)t=s+1;else if(a>e)i=s-1;else return s}return Math.max(0,t-1)}function Vw(n,e){return n.frames.length===0?0:ht.clamp(Math.round(e),0,n.frames.length-1)}function Gw(n){if(n.frames.length===0)return null;const e=new Map;for(const s of n.frames)e.set(s.gameState,(e.get(s.gameState)??0)+1);let t=null,i=-1;for(const[s,a]of e.entries())a<=i||(t=s,i=a);return t}function Ww(n,e){if(e===null)return null;for(const t of n.frames){if(t.gameState===e)break;return t.gameState}return null}function nm(n,e){return e===null?n.kickoffCountdown<=0:n.gameState===e}function od(n,e){return n.kickoffCountdown>0?!0:e!==null&&n.gameState===e}function $w(n,e){return n.ballFrames[e]?.position?!0:n.players.some(t=>t.frames[e]?.position)}function Xw(n,e,t,i){return od(e,i)&&$w(n,t)}function no(n,e,t,i,s){return!nm(e,i)&&!Xw(n,e,t,s)}function Vh(n,e,t,i,s,a,r){return i&&no(n,e,t,a,r)||s&&od(e,r)}function qw(n,e,t,i,s){const a=[],{frames:r}=n;if(r.length===0||!e&&!t)return a;let o=0;for(;o<r.length;){const l=r[o];if(!l||!Vh(n,l,o,e,t,i,s)){o+=1;continue}const c=l.time;let u=o+1;for(;u<r.length&&Vh(n,r[u],u,e,t,i,s);)u+=1;const d=r[u]?.time??n.duration;if(d>c){const h=a.at(-1);h&&h.endTime>=c?h.endTime=Math.max(h.endTime,d):a.push({startTime:c,endTime:d})}o=u}return a}function Yw(n,e,t){const i=ht.clamp(t,0,n);let s=0;for(const a of e){if(i<a.startTime)break;if(i<a.endTime)return{replayTime:i,timelineTime:a.startTime-s,seekTime:a.startTime,hiddenBySkip:!0};s+=a.endTime-a.startTime}return{replayTime:i,timelineTime:i-s,seekTime:i,hiddenBySkip:!1}}function Zw(n,e,t,i){const s=ht.clamp(i,0,e);let a=0;for(const r of t){const o=r.startTime-a;if(s<=o)return s+a;a+=r.endTime-r.startTime}return ht.clamp(s+a,0,n)}function Kw(n,e){const t=e.at(-1);return!t||t.endTime<n?n:ht.clamp(t.startTime,0,n)}function jw(n,e,t){const i=n.frames[e];if(!i||i.kickoffCountdown<=0)return null;let s=e;for(;s>0&&(n.frames[s-1]?.kickoffCountdown??0)>0;)s-=1;let a=e+1;for(;a<n.frames.length&&n.frames[a].kickoffCountdown>0;)a+=1;let r=0;for(let c=s;c<a;c+=1)r=Math.max(r,n.frames[c].kickoffCountdown);const o=n.frames[a]?.time??n.duration,l=Math.max(0,o-t);return{kind:"kickoff-countdown",countdown:Math.max(1,Math.min(r,Math.ceil(l))),secondsRemaining:l,endsAt:o}}function Jw(n,e){const t=ba(n,e),i=Math.min(t+1,n.frames.length-1);if(i===t)return{frameIndex:t,nextFrameIndex:i,alpha:0};const s=n.frames[t]?.time??0,a=n.frames[i]?.time??s;return a<=s?{frameIndex:t,nextFrameIndex:i,alpha:0}:{frameIndex:t,nextFrameIndex:i,alpha:ht.clamp((e-s)/(a-s),0,1)}}const Qw=1.4,Ps=.18,Hr=.14,eM=120,Gh=90,tM=40,nM=45,iM=.58,Wh=.82,sM=132,im=new L(-1,0,0),Yi=new L(0,0,1),aM=new L(-1,0,0),rM=new L(0,0,18800),oM=new L(0,0,700),lM=new L(-9600,-12600,6400),cM=new L(0,0,900),Eo=48,uM=16,dM=16,hM=.003,fM=.05;function $h(n,e,t){return n?!e||t<=0?n:{x:ht.lerp(n.x,e.x,t),y:ht.lerp(n.y,e.y,t),z:ht.lerp(n.z,e.z,t)}:e}function Xh(n){return new L(n.x,n.y,n.z)}function sm(n,e){return new L(-n.x*e,n.y*e,n.z*e)}function Yl(n){return new L(-n.x,n.y,n.z).normalize()}function pM(n,e){switch(n){case"overhead":return{position:rM.clone().multiplyScalar(e),target:oM.clone().multiplyScalar(e),up:aM.clone(),fov:Eo};case"side":return{position:lM.clone().multiplyScalar(e),target:cM.clone().multiplyScalar(e),up:Yi.clone(),fov:Eo}}}function mM(n){const{fov:e,position:t,sceneState:i,target:s,up:a}=n,{camera:r,controls:o}=i;o.enabled=!1,r.position.lerp(t,Hr),o.target.lerp(s,Hr),r.up.lerp(a,Hr).normalize(),r.fov=ht.lerp(r.fov,e,Hr),r.updateProjectionMatrix(),r.lookAt(o.target);const l=r.position.distanceToSquared(t)<=uM,c=o.target.distanceToSquared(s)<=dM,u=r.up.angleTo(a)<=hM,d=Math.abs(r.fov-e)<=fM;return!l||!c||!u||!d?!1:(r.position.copy(t),o.target.copy(s),r.up.copy(a).normalize(),r.fov=e,r.updateProjectionMatrix(),r.lookAt(s),o.enabled=!0,!0)}function gM(n){const e=n.linearVelocity?Yl(n.linearVelocity):null,t=n.forward?Yl(n.forward):null,i=n.up?Yl(n.up):null;if((n.position?.z??1/0)<eM){const l=(t??e??im.clone()).clone().setZ(0);if(l.lengthSq()<1e-4)return null;l.normalize(),e&&e.lengthSq()>1e-4&&l.dot(e)<0&&l.negate();const c=new L().crossVectors(Yi,l).normalize(),u=new L().crossVectors(l,c).normalize();return{forward:l,up:u,right:c}}if(!t||!i)return null;const a=t.clone().normalize(),r=new L().crossVectors(i,a).normalize(),o=new L().crossVectors(a,r).normalize();return{forward:a,up:o,right:r}}function _M(n){const{cameraViewMode:e,attachedPlayerId:t,ballCamEnabled:i,ballPosition:s,cameraDistanceScale:a,customCameraSettings:r,desiredCameraPosition:o,desiredLookTarget:l,fieldScale:c,frameIndex:u,replay:d,sceneState:h}=n,f=h.controls;if(e==="free"){f.enabled=!0,h.camera.fov=ht.lerp(h.camera.fov,Eo,Ps),h.camera.updateProjectionMatrix();return}if(!t){f.enabled=!0,h.camera.fov=ht.lerp(h.camera.fov,Eo,Ps),h.camera.updateProjectionMatrix();return}const g=d.players.find(z=>z.id===t),_=g?.frames[u];if(!g||!_?.position){f.enabled=!0;return}f.enabled=!1;const m=sm(_.position,c),p=gM(_),w=p?.forward??im.clone(),S=p?.right??new L(0,1,0),v={...g.cameraSettings,...r??{}},R=(v.distance??270)*c*a,T=(v.height??100)*c*Qw,E=ht.degToRad(v.pitch??-4),A=w.clone().applyAxisAngle(S,E).normalize(),y=m.clone().addScaledVector(Yi,T),b=w.clone().multiplyScalar(-R).addScaledVector(Yi,T).applyAxisAngle(S,E),C=m.clone().addScaledVector(Yi,tM*c);let N=v.fov??110;if(i&&s){const z=s.clone().addScaledVector(Yi,nM*c),V=z.clone().sub(C),G=(V.lengthSq()>1e-4?V.normalize():A.clone()).multiplyScalar(Wh).addScaledVector(A,1-Wh).normalize();l.copy(C).lerp(z,iM),o.copy(y).addScaledVector(G,-R),o.z=Math.max(Gh*c,o.z);const B=C.clone().sub(o),U=z.clone().sub(o);if(B.lengthSq()>1e-4&&U.lengthSq()>1e-4){const O=B.angleTo(U);N=Math.min(sM,Math.max(N,ht.radToDeg(O)*1.7))}}else o.copy(C).add(b),o.z=Math.max(Gh*c,o.z),l.copy(C);h.camera.position.lerp(o,Ps),h.camera.up.lerp(Yi,Ps).normalize(),f.target.lerp(l,Ps),h.camera.fov=ht.lerp(h.camera.fov,N,Ps),h.camera.updateProjectionMatrix(),h.camera.lookAt(f.target)}const vM=1,yM=2.25,Vr="free";function Hi(n){return typeof n=="number"&&Number.isFinite(n)?n:void 0}function Zl(n){if(!n)return null;const e={},t=Hi(n.fov),i=Hi(n.height),s=Hi(n.pitch),a=Hi(n.distance),r=Hi(n.stiffness),o=Hi(n.swivelSpeed),l=Hi(n.transitionSpeed);return t!==void 0&&(e.fov=t),i!==void 0&&(e.height=i),s!==void 0&&(e.pitch=s),a!==void 0&&(e.distance=a),r!==void 0&&(e.stiffness=r),o!==void 0&&(e.swivelSpeed=o),l!==void 0&&(e.transitionSpeed=l),e}class bM extends EventTarget{container;replay;options;sceneState;beforeRenderCallbacks=[];plugins=[];fieldScale;desiredCameraPosition=new L;desiredLookTarget=new L;boundWindowResize=()=>this.sceneState.resize();liveGameState;kickoffGameState;timelineSegmentsCacheKey=null;timelineSegmentsCache=[];timelineDurationCache=0;resizeObserver=null;animationFrameId=null;disposed=!1;playing=!1;speed=1;currentTime=0;playbackStartedAt=0;playbackStartedTime=0;cameraDistanceScale;customCameraSettings;cameraViewMode;freeCameraTransition=null;attachedPlayerId;ballCamEnabled;boostMeterEnabled;boostPickupAnimationEnabled;skipPostGoalTransitionsEnabled;skipKickoffsEnabled;constructor(e,t,i={}){super(),this.container=e,this.replay=t,this.options=i,this.fieldScale=i.fieldScale??vM,this.sceneState=Hw(e,t,this.fieldScale),this.liveGameState=Gw(t),this.kickoffGameState=Ww(t,this.liveGameState),this.speed=Math.max(.1,i.initialPlaybackRate??1),this.cameraDistanceScale=Math.max(.25,i.initialCameraDistanceScale??yM),this.customCameraSettings=Zl(i.initialCustomCameraSettings),this.attachedPlayerId=i.initialAttachedPlayerId??null,this.cameraViewMode=i.initialCameraViewMode??(this.attachedPlayerId?"follow":Vr),this.ballCamEnabled=i.initialBallCamEnabled??!1,this.boostMeterEnabled=i.initialBoostMeterEnabled??!1,this.boostPickupAnimationEnabled=i.initialBoostPickupAnimationEnabled??!0,this.skipPostGoalTransitionsEnabled=i.initialSkipPostGoalTransitionsEnabled??!0,this.skipKickoffsEnabled=i.initialSkipKickoffsEnabled??!1,this.skipPostGoalTransitionIfNeeded(),this.skipPastKickoffIfNeeded(),this.installResizeHandling();for(const s of i.plugins??[])this.installPlugin(s,!1);this.render(),this.scheduleAnimationFrame(),this.emitChange(),i.autoplay&&this.play()}play(){this.playing||(this.playing=!0,this.reanchorPlaybackClock(),this.emitChange())}pause(){this.playing&&(this.syncPlaybackClock(),this.playing=!1,this.emitChange())}togglePlayback(){this.playing?this.pause():this.play()}setPlaybackRate(e){this.playing&&this.syncPlaybackClock(),this.speed=Math.max(.1,e),this.playing&&this.reanchorPlaybackClock(),this.emitChange()}setCameraDistanceScale(e){this.cameraDistanceScale=Math.max(.25,e),this.render(),this.emitChange()}setCustomCameraSettings(e){this.customCameraSettings=Zl(e),this.render(),this.emitChange()}setAttachedPlayer(e){this.attachedPlayerId=e,this.cameraViewMode=e?"follow":Vr,this.freeCameraTransition=null,this.render(),this.emitChange()}setCameraViewMode(e){this.cameraViewMode=e,this.freeCameraTransition=null,this.render(),this.emitChange()}setFreeCameraPreset(e){const{fov:t,position:i,target:s,up:a}=pM(e,this.fieldScale);this.cameraViewMode=Vr,this.freeCameraTransition={position:i,target:s,up:a,fov:t},this.render(),this.emitChange()}setBallCamEnabled(e){this.ballCamEnabled=e,this.render(),this.emitChange()}setBoostMeterEnabled(e){if(this.boostMeterEnabled=e,!e)for(const t of this.sceneState.playerBoostMeters.values())t.group.visible=!1;this.render(),this.emitChange()}setBoostPickupAnimationEnabled(e){this.boostPickupAnimationEnabled=e,this.render(),this.emitChange()}setSkipPostGoalTransitionsEnabled(e){this.skipPostGoalTransitionsEnabled=e,e&&this.skipPostGoalTransitionIfNeeded(),this.render(),this.emitChange()}setSkipKickoffsEnabled(e){this.skipKickoffsEnabled=e,e&&(this.skipPostGoalTransitionIfNeeded(),this.skipPastKickoffIfNeeded()),this.render(),this.emitChange()}seek(e){this.currentTime=ht.clamp(e,0,this.getPlaybackEndTime()),this.skipPostGoalTransitionIfNeeded(),this.skipPastKickoffIfNeeded(),this.playing&&this.reanchorPlaybackClock(),this.render(),this.emitChange()}setFrameIndex(e){const t=Vw(this.replay,e),i=this.replay.frames[t]?.time??0,s=this.playing,a=this.currentTime!==i||s;this.playing=!1,this.currentTime=i,this.render(),a&&this.emitChange()}stepFrames(e){if(!Number.isFinite(e)||this.replay.frames.length===0)return;const t=ba(this.replay,this.currentTime);this.setFrameIndex(t+Math.trunc(e))}stepForwardFrame(){this.stepFrames(1)}stepBackwardFrame(){this.stepFrames(-1)}setState(e){const t=performance.now();if(e.speed!==void 0&&(this.playing&&this.syncPlaybackClock(t),this.speed=Math.max(.1,e.speed)),e.cameraDistanceScale!==void 0&&(this.cameraDistanceScale=Math.max(.25,e.cameraDistanceScale)),e.customCameraSettings!==void 0&&(this.customCameraSettings=Zl(e.customCameraSettings)),e.cameraViewMode!==void 0&&(this.cameraViewMode=e.cameraViewMode),e.attachedPlayerId!==void 0&&(this.attachedPlayerId=e.attachedPlayerId,e.cameraViewMode===void 0&&(this.cameraViewMode=this.attachedPlayerId?"follow":Vr)),e.ballCamEnabled!==void 0&&(this.ballCamEnabled=e.ballCamEnabled),e.boostMeterEnabled!==void 0&&(this.boostMeterEnabled=e.boostMeterEnabled,!this.boostMeterEnabled))for(const i of this.sceneState.playerBoostMeters.values())i.group.visible=!1;e.boostPickupAnimationEnabled!==void 0&&(this.boostPickupAnimationEnabled=e.boostPickupAnimationEnabled),e.skipPostGoalTransitionsEnabled!==void 0&&(this.skipPostGoalTransitionsEnabled=e.skipPostGoalTransitionsEnabled),e.skipKickoffsEnabled!==void 0&&(this.skipKickoffsEnabled=e.skipKickoffsEnabled),e.currentTime!==void 0&&(this.currentTime=ht.clamp(e.currentTime,0,this.getPlaybackEndTime())),e.playing!==void 0&&e.playing!==this.playing&&(e.playing?this.playing=!0:(e.currentTime===void 0&&this.syncPlaybackClock(t),this.playing=!1)),this.playing&&this.reanchorPlaybackClock(t),this.skipPostGoalTransitionIfNeeded(t),this.skipPastKickoffIfNeeded(t),this.render(),this.emitChange()}getState(){const e=ba(this.replay,this.currentTime);return{currentTime:this.currentTime,duration:this.replay.duration,frameIndex:e,activeMetadata:this.getActiveMetadata(e,this.currentTime),playing:this.playing,speed:this.speed,cameraDistanceScale:this.cameraDistanceScale,customCameraSettings:this.customCameraSettings,cameraViewMode:this.cameraViewMode,attachedPlayerId:this.attachedPlayerId,ballCamEnabled:this.ballCamEnabled,boostMeterEnabled:this.boostMeterEnabled,boostPickupAnimationEnabled:this.boostPickupAnimationEnabled,skipPostGoalTransitionsEnabled:this.skipPostGoalTransitionsEnabled,skipKickoffsEnabled:this.skipKickoffsEnabled}}getSnapshot(){return this.getState()}getTimelineDuration(){return this.getTimelineSegments().length===0?this.replay.duration:this.timelineDurationCache}getTimelineCurrentTime(){return this.projectReplayTimeToTimeline(this.currentTime).timelineTime}getTimelineSegments(){const e=`${this.skipPostGoalTransitionsEnabled}:${this.skipKickoffsEnabled}`;return this.timelineSegmentsCacheKey===e?this.timelineSegmentsCache:(this.timelineSegmentsCacheKey=e,this.timelineSegmentsCache=this.computeTimelineSegments(),this.timelineDurationCache=Math.max(0,this.replay.duration-this.timelineSegmentsCache.reduce((t,i)=>t+(i.endTime-i.startTime),0)),this.timelineSegmentsCache)}projectReplayTimeToTimeline(e){return Yw(this.replay.duration,this.getTimelineSegments(),e)}projectTimelineTimeToReplay(e){return Zw(this.replay.duration,this.getTimelineDuration(),this.getTimelineSegments(),e)}getPlaybackEndTime(){return Kw(this.replay.duration,this.getTimelineSegments())}subscribe(e){const t=i=>{e(i.detail)};return this.addEventListener("change",t),e(this.getState()),()=>{this.removeEventListener("change",t)}}onBeforeRender(e){return this.beforeRenderCallbacks.push(e),()=>{const t=this.beforeRenderCallbacks.indexOf(e);t>=0&&this.beforeRenderCallbacks.splice(t,1)}}addPlugin(e){return this.installPlugin(e,!0)}removePlugin(e){const t=this.plugins.findIndex(s=>s.plugin.id===e);if(t<0)return!1;const[i]=this.plugins.splice(t,1);return i.plugin.teardown?.(this.createPluginContext()),this.render(),!0}getPlugins(){return this.plugins.map(e=>e.plugin)}destroy(){for(this.playing&&this.pause(),this.disposed=!0,this.animationFrameId!==null&&(cancelAnimationFrame(this.animationFrameId),this.animationFrameId=null),this.resizeObserver?(this.resizeObserver.disconnect(),this.resizeObserver=null):window.removeEventListener("resize",this.boundWindowResize);this.plugins.length>0;)this.plugins.pop()?.plugin.teardown?.(this.createPluginContext());this.sceneState.dispose()}dispose(){this.destroy()}installResizeHandling(){if(typeof ResizeObserver<"u"){this.resizeObserver=new ResizeObserver(()=>{this.sceneState.resize()}),this.resizeObserver.observe(this.container);return}window.addEventListener("resize",this.boundWindowResize)}scheduleAnimationFrame(){this.animationFrameId!==null||this.disposed||(this.animationFrameId=requestAnimationFrame(this.tick))}reanchorPlaybackClock(e=performance.now()){this.playbackStartedAt=e,this.playbackStartedTime=this.currentTime}syncPlaybackClock(e=performance.now()){if(!this.playing)return!1;const t=(e-this.playbackStartedAt)/1e3,i=ht.clamp(this.playbackStartedTime+t*this.speed,0,this.getPlaybackEndTime()),s=i!==this.currentTime;return this.currentTime=i,s}tick=e=>{if(this.animationFrameId=null,this.disposed)return;let t=!1;this.playing&&(t=this.syncPlaybackClock(e),t=this.skipPostGoalTransitionIfNeeded(e)||t,t=this.skipPastKickoffIfNeeded(e)||t,this.currentTime>=this.getPlaybackEndTime()&&(this.playing=!1,t=!0)),this.render(),t&&this.emitChange(),this.scheduleAnimationFrame()};render(){const e=Jw(this.replay,this.currentTime),t=e.frameIndex,i=this.replay.ballFrames[t]??null,s=this.replay.ballFrames[e.nextFrameIndex]??i,a=$h(i?.position??null,s?.position??null,e.alpha),r=a?sm(a,this.fieldScale):null,o=[];a?(this.sceneState.ballMesh.visible=!0,this.sceneState.ballMesh.position.copy(Xh(a)),i?.rotation?this.sceneState.ballMesh.quaternion.set(i.rotation.x,i.rotation.y,i.rotation.z,i.rotation.w):this.sceneState.ballMesh.quaternion.identity()):this.sceneState.ballMesh.visible=!1;for(const[u,d]of this.replay.players.entries()){const h=this.sceneState.playerMeshes.get(d.id),f=this.sceneState.playerBoostTrails.get(d.id),g=d.frames[t]??null,_=d.frames[e.nextFrameIndex]??g;let m=null,p=0;if(!h){o.push({track:d,mesh:null,boostTrail:f??null,frame:g,nextFrame:_,interpolatedPosition:m,boostFraction:p});continue}if(m=$h(g?.position??null,_?.position??null,e.alpha),!m){h.visible=!1,f&&(f.visible=!1),o.push({track:d,mesh:h,boostTrail:f??null,frame:g,nextFrame:_,interpolatedPosition:m,boostFraction:p});continue}h.visible=!0,h.position.copy(Xh(m)),g?.rotation?h.quaternion.set(g.rotation.x,g.rotation.y,g.rotation.z,g.rotation.w):h.quaternion.identity();const w=g?.boostFraction??0,S=_?.boostFraction??w;if(p=ht.lerp(w,S,e.alpha),f){const R=(e.alpha>=.5?_?.boostActive:g?.boostActive)??g?.boostActive??_?.boostActive??!1;this.updateBoostTrail(f,R,p,this.currentTime,u)}const v=this.sceneState.playerBoostMeters.get(d.id);v&&(this.boostMeterEnabled?(v.group.visible=!0,kw(v,p,ht.lerp(g?.boostAmount??0,_?.boostAmount??g?.boostAmount??0,e.alpha),this.sceneState.camera)):v.group.visible=!1),o.push({track:d,mesh:h,boostTrail:f??null,frame:g,nextFrame:_,interpolatedPosition:m,boostFraction:p})}_M({sceneState:this.sceneState,replay:this.replay,fieldScale:this.fieldScale,cameraViewMode:this.cameraViewMode,attachedPlayerId:this.attachedPlayerId,ballCamEnabled:this.ballCamEnabled,cameraDistanceScale:this.cameraDistanceScale,customCameraSettings:this.customCameraSettings,frameIndex:t,ballPosition:r,desiredCameraPosition:this.desiredCameraPosition,desiredLookTarget:this.desiredLookTarget}),this.cameraViewMode==="free"&&this.freeCameraTransition&&mM({sceneState:this.sceneState,...this.freeCameraTransition})&&(this.freeCameraTransition=null),this.sceneState.controls.update(),this.sceneState.updateWallVisibility();const l={frameIndex:e.frameIndex,nextFrameIndex:e.nextFrameIndex,alpha:e.alpha,currentTime:this.currentTime};for(const u of this.beforeRenderCallbacks)u(l);const c=this.createRenderContext(l,i,s,r,o);for(const u of this.plugins)u.plugin.beforeRender?.(c);this.sceneState.renderer.render(this.sceneState.scene,this.sceneState.camera)}skipPastKickoffIfNeeded(e){if(!this.skipKickoffsEnabled)return!1;const t=ba(this.replay,this.currentTime),i=this.replay.frames[t];if(!i||!od(i,this.kickoffGameState))return!1;const s=this.replay.frames.find((a,r)=>r>t&&nm(a,this.liveGameState));return!s||s.time===this.currentTime?!1:(this.currentTime=s.time,this.playing&&this.reanchorPlaybackClock(e),!0)}skipPostGoalTransitionIfNeeded(e){if(!this.skipPostGoalTransitionsEnabled)return!1;const t=ba(this.replay,this.currentTime),i=this.replay.frames[t];if(!i||!no(this.replay,i,t,this.liveGameState,this.kickoffGameState))return!1;const s=this.replay.frames.find((a,r)=>r>t&&!no(this.replay,a,r,this.liveGameState,this.kickoffGameState));if(!s){let a=t;for(;a>0&&no(this.replay,this.replay.frames[a-1],a-1,this.liveGameState,this.kickoffGameState);)a-=1;const r=this.replay.frames[a]?.time;return r===void 0||r===this.currentTime?!1:(this.currentTime=r,this.playing&&this.reanchorPlaybackClock(e),!0)}return s.time===this.currentTime?!1:(this.currentTime=s.time,this.playing&&this.reanchorPlaybackClock(e),!0)}getActiveMetadata(e,t){return jw(this.replay,e,t)}computeTimelineSegments(){return qw(this.replay,this.skipPostGoalTransitionsEnabled,this.skipKickoffsEnabled,this.liveGameState,this.kickoffGameState)}installPlugin(e,t){const i=typeof e=="function"?e():e;if(this.plugins.some(a=>a.plugin.id===i.id))throw new Error(`Replay player plugin "${i.id}" is already installed`);const s={definition:e,plugin:i};return this.plugins.push(s),i.setup?.(this.createPluginContext()),i.onStateChange?.(this.createPluginStateContext(this.getState())),t&&this.render(),()=>{const a=this.plugins.indexOf(s);a<0||(this.plugins.splice(a,1),i.teardown?.(this.createPluginContext()),this.render())}}createPluginContext(){return{player:this,replay:this.replay,scene:this.sceneState,container:this.container,options:this.options}}createPluginStateContext(e){return{...this.createPluginContext(),state:e}}createRenderContext(e,t,i,s,a){return{...this.createPluginStateContext(this.getState()),...e,frame:this.replay.frames[e.frameIndex]??null,nextFrame:this.replay.frames[e.nextFrameIndex]??null,ballFrame:t,nextBallFrame:i,ballPosition:s,players:a}}emitChange(){const e=this.getState(),t=this.createPluginStateContext(e);for(const i of this.plugins)i.plugin.onStateChange?.(t);this.dispatchEvent(new CustomEvent("change",{detail:e}))}updateBoostTrail(e,t,i,s,a){if(!t){e.visible=!1;return}e.visible=!0;const r=s*36+a*1.7,o=.86+.14*Math.sin(r),l=ht.clamp(.62+i*.88,.62,1.5),c=l*(1.02+o*.52),u=1.02+l*.28;e.scale.set(c,u,u);for(const[d,h]of e.children.entries()){const f=h,g=.92+.14*Math.sin(r+d*.85);f.scale.setScalar(g),f.traverse(_=>{if(!(_ instanceof ze))return;const m=_.material;if(m instanceof lt)switch(_.name){case"outer-flame":m.opacity=.24+l*.24;break;case"inner-flame":m.opacity=.58+l*.3;break;case"glow":m.opacity=.4+l*.26;break}})}}}const xM="https://ballchasing.com",SM=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;function wM(n,e){const i=(e instanceof URL?e.href:e).replace(/\/+$/,"");return new URL(`${i}/${n.replace(/^\/+/,"")}`)}function qh(n){return SM.test(n.trim())}function ld(n){const e=n.trim();if(qh(e))return e.toLowerCase();let t;try{t=new URL(e)}catch{throw new Error(`Invalid Ballchasing replay id: ${n}`)}if(!/(^|\.)ballchasing\.com$/i.test(t.hostname))throw new Error(`Invalid Ballchasing replay URL: ${n}`);const i=t.pathname.split("/").filter(Boolean),s=i.findIndex(o=>o==="replay"),a=i.findIndex(o=>o==="replays"),r=s>=0?i[s+1]:a>=0?i[a+1]:void 0;if(!r||!qh(r))throw new Error(`Invalid Ballchasing replay URL: ${n}`);return r.toLowerCase()}function MM(n){return`ballchasing-${ld(n)}.replay`}function EM(n,e=xM){const t=ld(n);return wM(`dl/replay/${encodeURIComponent(t)}`,e)}const Yh="subtr-actor-ballchasing-overlay-styles",TM="#3b82f6",AM="#f59e0b";function CM(){if(document.getElementById(Yh))return;const n=document.createElement("style");n.id=Yh,n.textContent=`
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
      border-bottom: 2px solid ${TM};
    }

    .sap-bc-team-hud-orange {
      left: calc(50% + 0.35rem);
      flex-direction: row;
      justify-content: flex-start;
      border-bottom: 2px solid ${AM};
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
  `,document.head.append(n)}function RM(n,e){const t=n.players[e],i=t.frame?.boostAmount??0,s=t.nextFrame?.boostAmount??i;return ht.lerp(i,s,n.alpha)}function Zh(n,e,t,i){if(!n||!e)return;const s=Math.max(0,Math.min(100,Math.round(t/255*100)));n.style.width=`${s}%`,e.textContent=`${s} ${i}`}function Kh(n,e,t,i){if(!n)return;const s=()=>{e.player.setAttachedPlayer(t)};n.classList.add("sap-bc-player-selectable"),n.tabIndex=0,n.setAttribute("role","button"),n.setAttribute("aria-label",`Follow ${i}`),n.title=`Follow ${i}`,n.addEventListener("click",s),n.addEventListener("keydown",a=>{a.key!=="Enter"&&a.key!==" "||(a.preventDefault(),s())})}function PM(n,e,t,i,s){if(n.getWorldPosition(s),s.add(e),s.project(t),s.z<-1||s.z>1)return!1;const a=i.clientWidth||1,r=i.clientHeight||1;return s.x=(s.x+1)*a/2,s.y=(1-s.y)*r/2,!(s.x<-80||s.x>a+80||s.y<-80||s.y>r+80)}function LM(n={}){const e=n.showFloatingNames??!0,t=n.showFloatingBoostBars??!0,i=n.showTeamBoostHud??!0;let s=null,a=null,r=null,o=null,l=!1,c="";const u=new Map,d=new L,h=new L(0,0,255);function f(_){for(const[m,p]of u.entries()){const w=m===_;p.floatingRoot?.classList.toggle("sap-bc-player-following",w),p.teamHudEntry?.classList.toggle("sap-bc-player-following",w),p.floatingRoot?.setAttribute("aria-pressed",w?"true":"false"),p.teamHudEntry?.setAttribute("aria-pressed",w?"true":"false")}}function g(_,m){CM(),getComputedStyle(m).position==="static"&&(l=!0,c=m.style.position,m.style.position="relative"),s=document.createElement("div"),s.className="sap-bc-overlay-root",e||t?(a=document.createElement("div"),a.className="sap-bc-floating-layer",s.append(a)):a=null,i?(r=document.createElement("div"),r.className="sap-bc-team-hud sap-bc-team-hud-blue",o=document.createElement("div"),o.className="sap-bc-team-hud sap-bc-team-hud-orange",s.append(r,o)):(r=null,o=null);for(const p of _.replay.players){let w=null,S=null,v=null,R=null;a&&(w=document.createElement("div"),w.className="sap-bc-floating-track",w.hidden=!0,(e||t)&&(S=document.createElement("div"),S.className=`sap-bc-boost-bar ${p.isTeamZero?"sap-bc-boost-bar-blue":"sap-bc-boost-bar-orange"}`,v=document.createElement("div"),v.className=`sap-bc-boost-fill ${p.isTeamZero?"sap-bc-boost-fill-blue":"sap-bc-boost-fill-orange"}`,R=document.createElement("span"),R.className="sap-bc-boost-text",S.append(v,R),w.append(S)),Kh(w,_,p.id,p.name),a.append(w));let T=null,E=null,A=null;if(i){T=document.createElement("div"),T.className="sap-bc-hud-player";const y=document.createElement("div");y.className=`sap-bc-hud-boost-bar ${p.isTeamZero?"sap-bc-boost-bar-blue":"sap-bc-boost-bar-orange"}`,E=document.createElement("div"),E.className=`sap-bc-hud-boost-fill ${p.isTeamZero?"sap-bc-boost-fill-blue":"sap-bc-boost-fill-orange"}`,A=document.createElement("span"),A.className="sap-bc-hud-boost-text",y.append(E,A),T.append(y),Kh(T,_,p.id,p.name),(p.isTeamZero?r:o)?.append(T)}u.set(p.id,{floatingRoot:w,floatingBoostFill:v,floatingBoostText:R,teamHudEntry:T,teamHudFill:E,teamHudText:A})}h.set(0,0,255*(_.options.fieldScale??1)),m.append(s),f(_.player.getState().attachedPlayerId)}return{id:"ballchasing-overlay",setup(_){g(_,_.container)},onStateChange(_){f(_.state.attachedPlayerId)},teardown(_){s?.remove(),s=null,a=null,r=null,o=null,u.clear(),l&&(_.container.style.position=c,l=!1)},beforeRender(_){if(s)for(const[m,p]of _.players.entries()){const w=u.get(p.track.id);if(!w)continue;const S=RM(_,m);Zh(w.floatingBoostFill,w.floatingBoostText,S,p.track.name),Zh(w.teamHudFill,w.teamHudText,S,p.track.name);const v=p.mesh,R=v!==null&&p.interpolatedPosition!==null;if(w.teamHudEntry?.classList.toggle("sap-bc-hud-player-inactive",!R),!!w.floatingRoot){if(!R||!PM(v,h,_.scene.camera,_.container,d)){w.floatingRoot.hidden=!0;continue}w.floatingRoot.hidden=!1,w.floatingRoot.style.transform=`translate(${d.x.toFixed(1)}px, ${d.y.toFixed(1)}px) translate(-50%, -100%)`}}}}}function Kl(n){n.depthTest=!1,n.depthWrite=!1,n.transparent=!0,n.polygonOffset=!0,n.polygonOffsetFactor=-2,n.polygonOffsetUnits=-2,n.forceSinglePass=!0}const Hs=6,IM=.6;function ar(n){return n*IM}function NM(n){return ar(n.size==="big"?150:92)}function am(n){return ar(n.size==="big"?155:46)}function DM(n){return ar(n.size==="big"?34:14)}function rm(n){return Hs+DM(n)+am(n)}function om(n){return n.size==="big"?rm(n):Hs+ar(1.2)}function lm(n){return n.size==="big"?rm(n):Hs+ar(.8)}function UM(n){return n.size==="big"?16096779:16436245}function FM(n){const e=NM(n),t=UM(n),i=am(n),s=n.size==="big",a=new mt;a.position.set(n.position.x,n.position.y,n.position.z),a.renderOrder=20,a.frustumCulled=!1;const r=new ze(new cs(e*.72,e,24),new lt({color:t,transparent:!0,opacity:.92,side:et,depthWrite:!1}));Kl(r.material),r.position.z=Hs,r.renderOrder=20,r.frustumCulled=!1,a.add(r);const o=new ze(new Ds(e*.58,24),new lt({color:t,transparent:!0,opacity:.3,side:et,depthWrite:!1}));Kl(o.material),o.position.z=Hs+.5,o.renderOrder=21,o.frustumCulled=!1,a.add(o);const l=new ze(new Ds(e*.42,20),new lt({color:16777215,transparent:!0,opacity:.22,side:et,depthWrite:!1}));Kl(l.material),l.position.z=Hs+1,l.renderOrder=22,l.frustumCulled=!1,a.add(l);const c=new ze(s?new Js(i,32,18):new Ds(i*.9,24),s?new Mo({color:t,emissive:new qe(t),emissiveIntensity:.6,shininess:88,specular:new qe(16773826),transparent:!0,opacity:.92,depthWrite:!1}):new lt({color:t,transparent:!0,opacity:.88,side:et,blending:bi,depthWrite:!1}));c.position.z=om(n),c.renderOrder=23,c.frustumCulled=!1,a.add(c);const u=new ze(s?new Js(i*1.36,32,14):new Ds(i*1.35,28),new lt({color:t,transparent:!0,opacity:s?.2:.16,side:et,blending:bi,depthWrite:!1}));return u.position.z=lm(n),u.renderOrder=24,u.frustumCulled=!1,a.add(u),{group:a,ring:r,core:o,cooldown:l,orb:c,glow:u}}function OM(n,e){let t=-1;for(let a=0;a<n.events.length&&!(n.events[a].time>e);a+=1)t=a;if(t<0)return{available:!0,progress:1};const i=n.events[t];if(i.available)return{available:!0,progress:1};const s=n.events.slice(t+1).find(a=>a.available);return!s||s.time<=i.time?{available:!1,progress:0}:{available:!1,progress:ht.clamp((e-i.time)/(s.time-i.time),0,1)}}function kM(n,e,t,i){const{available:s,progress:a}=OM(e,t),r=e.size==="big",o=.92+.08*Math.sin(t*6+e.index*.45),l=.96+.04*Math.sin(t*(r?4.8:7.2)+e.index*.37),c=r?Math.sin(t*2.2+e.index*.61)*18:0,u=om(e)+c,d=lm(e)+c;if(n.orb.position.z=u,n.glow.position.z=d,n.orb.rotation.z=t*(r?.9:1.25),n.glow.rotation.z=-t*.45,s){n.group.visible=!0,n.ring.material.opacity=.95,n.core.material.opacity=r?.56:.5,n.cooldown.visible=!1,n.ring.scale.setScalar(o),n.core.scale.setScalar(1),n.orb.visible=!0,n.glow.visible=!0,n.orb.material.opacity=r?.96:.9,n.glow.material.opacity=(r?.2:.16)+(l-.96),n.orb.scale.setScalar(l),n.glow.scale.setScalar(r?1.02+(l-.96)*2:1);return}if(n.group.visible=!0,n.ring.material.opacity=.18,n.core.material.opacity=.07,n.ring.scale.setScalar(1),n.core.scale.setScalar(1),n.orb.visible=!1,n.glow.visible=!1,n.cooldown.visible=i,i){const h=.3+a*.7;n.cooldown.scale.setScalar(h),n.cooldown.material.opacity=.16+a*.2}}function BM(n={}){const e=n.showCooldownProgress??!0;let t=null;const i=new Map;function s(r){t=new mt,t.name="boost-pad-overlay",t.renderOrder=20,t.frustumCulled=!1;for(const o of r.replay.boostPads){const l=FM(o);t.add(l.group),i.set(o.index,l)}r.scene.replayRoot.add(t)}function a(r){for(const o of r.replay.boostPads){const l=i.get(o.index);l&&kM(l,o,r.state.currentTime,e)}}return{id:"boost-pad-overlay",setup(r){s(r),a({...r,state:r.player.getState()})},onStateChange(r){a(r)},teardown(){t?.removeFromParent(),t=null,i.clear()}}}const zM=1.35,HM="#57a8ff",VM="#ff9c40",GM=256,WM=160,$M=360,XM=225,qM=260,YM=430,cm=18,jh=120;function ZM(n){return n?HM:VM}function KM(n){return n.events.filter(e=>!e.available&&e.playerId)}function um(n,e){const t=document.createElement("canvas");t.width=GM,t.height=WM;const i=t.getContext("2d");if(!i)throw new Error("Unable to create boost pickup count canvas");i.clearRect(0,0,t.width,t.height),i.textAlign="center",i.textBaseline="middle",i.lineJoin="round",i.font="800 124px sans-serif",i.lineWidth=18,i.strokeStyle="rgba(4, 10, 18, 0.88)",i.strokeText(`${n}`,t.width/2,t.height/2),i.fillStyle=e,i.fillText(`${n}`,t.width/2,t.height/2);const s=new ed(t);return s.colorSpace=Wt,s.needsUpdate=!0,s}function jM(n){n?.dispose()}function JM(n){const e=new mt;e.visible=!1,e.renderOrder=60,e.frustumCulled=!1;const t=um(1,n),i=new Dp({map:t,transparent:!0,depthTest:!1,depthWrite:!1}),s=new Fp(i);s.scale.set($M,XM,1),s.renderOrder=62,s.frustumCulled=!1,e.add(s);const a=new lt({color:n,transparent:!0,opacity:0,side:et,depthTest:!1,depthWrite:!1,blending:bi}),r=new ze(new cs(jh*.72,jh,36),a);return r.position.z=cm,r.renderOrder=61,r.frustumCulled=!1,e.add(r),{group:e,textMaterial:i,ringMaterial:a}}function QM(n,e){n.currentCount!==e&&(jM(n.textMaterial.map),n.textMaterial.map=um(e,n.color),n.textMaterial.needsUpdate=!0,n.currentCount=e)}function eE(n){const e=new Map;for(const s of n.replay.players)e.set(s.id,s);const t=[];for(const s of n.replay.boostPads)for(const a of KM(s))t.push({pad:s,event:a});t.sort((s,a)=>s.event.time!==a.event.time?s.event.time-a.event.time:s.event.frame!==a.event.frame?s.event.frame-a.event.frame:s.pad.index-a.pad.index);const i=[];for(const{pad:s,event:a}of t){if(!a.playerId)continue;const r=e.get(a.playerId);if(!r)continue;const o=ZM(r.isTeamZero),{group:l,textMaterial:c,ringMaterial:u}=JM(o);l.position.copy(s.position),n.scene.replayRoot.add(l),i.push({time:a.time,pad:s,event:a,player:r,color:o,currentCount:1,position:new L(s.position.x,s.position.y,s.position.z),size:s.size,group:l,textMaterial:c,ringMaterial:u})}return i}function tE(n,e,t){const i=ht.clamp(e/t,0,1),s=1-Math.pow(1-i,3),a=i*i,r=n.size==="big"?YM:qM,o=n.size==="big"?360:280,l=1+Math.sin(i*Math.PI)*.22;n.group.visible=!0,n.group.position.set(n.position.x,n.position.y,n.position.z+r+s*o),n.group.scale.setScalar(l),n.textMaterial.opacity=Math.max(0,1-a),n.ringMaterial.opacity=Math.max(0,.48*(1-i));const c=n.group.children[1];if(c){const u=.75+s*(n.size==="big"?2.8:1.85);c.scale.setScalar(u),c.position.z=cm-r-s*o}}function nE(n={}){const e=Math.max(.1,n.durationSeconds??zM);let t=[];function i(a){return n.includePickup?.({pad:a.pad,event:a.event,player:a.player})??!0}function s(){for(const a of t)a.group.visible=!1}return{id:"boost-pickup-animation",setup(a){t=eE(a)},beforeRender(a){if(!a.state.boostPickupAnimationEnabled){s();return}const r=a.currentTime-e,o=new Map;for(const l of t){if(l.time>a.currentTime){l.group.visible=!1;continue}if(!i(l)){l.group.visible=!1;continue}const c=(o.get(l.player.id)??0)+1;if(o.set(l.player.id,c),l.time<r){l.group.visible=!1;continue}QM(l,c),tE(l,a.currentTime-l.time,e)}},teardown(){for(const a of t)a.group.removeFromParent(),a.group.traverse(r=>{(r instanceof ze||r instanceof Fp)&&r.geometry?.dispose()}),a.textMaterial.map?.dispose(),a.textMaterial.dispose(),a.ringMaterial.dispose();t=[]}}}const iE=60,sE=["video/webm;codecs=vp9","video/webm;codecs=vp8","video/webm"];function aE(n){if(n&&MediaRecorder.isTypeSupported(n))return n;for(const e of sE)if(MediaRecorder.isTypeSupported(e))return e;return""}function rE(n){return n instanceof Error?n.message:String(n)}function oE(n={}){let e=null,t=null,i=[],s=null,a=0,r=0,o="",l=0,c=null,u=null,d=null,h=null,f=!1,g=null;const _=new Set;function m(){return{state:t?t.state==="recording"?"recording":"stopping":c?"error":s?"ready":"idle",elapsedSeconds:r,mimeType:o,sizeBytes:l,error:c}}function p(){const T=m();n.onStatusChange?.(T);for(const E of _)E(T)}function w(){if(!e)throw new Error("Canvas recorder plugin is not installed");return e}function S(T){t=null,h=null,f=!1,s=T,l=T?.size??0,g&&e&&e.player.setState({currentTime:g.currentTime,speed:g.speed,playing:g.playing}),g=null,T&&n.onComplete?.(T),p(),d?.(T),d=null,u=null}function v(T){c=rE(T),t=null,h=null,f=!1,g=null,p(),d?.(null),d=null,u=null}const R={id:"canvas-recorder",setup(T){e=T},beforeRender(T){t?.state==="recording"&&(r=(performance.now()-a)/1e3,p()),t?.state==="recording"&&h!==null&&T.currentTime>=h&&R.stop()},onStateChange(T){f&&t?.state==="recording"&&!T.state.playing&&r>0&&R.stop()},teardown(){t?.state==="recording"&&t.stop(),e=null,t=null,h=null,f=!1,g=null,d?.(null),d=null,u=null,_.clear()},start(T={}){const E=w();if(t?.state==="recording")throw new Error("Canvas recording is already in progress");if(typeof MediaRecorder>"u")throw new Error("MediaRecorder is not available in this browser");const A=E.scene.renderer.domElement;if(!A.captureStream)throw new Error("Canvas captureStream is not available in this browser");c=null,s=null,i=[],l=0,r=0,a=performance.now(),o=aE(T.mimeType??n.mimeType);const y=Math.max(1,T.fps??n.fps??iE),b=A.captureStream(y);t=new MediaRecorder(b,{mimeType:o,videoBitsPerSecond:T.videoBitsPerSecond??n.videoBitsPerSecond}),u=new Promise(C=>{d=C}),t.addEventListener("dataavailable",C=>{C.data.size>0&&(i.push(C.data),l+=C.data.size,p())}),t.addEventListener("stop",()=>{b.getTracks().forEach(C=>C.stop()),S(new Blob(i,{type:o||"video/webm"}))},{once:!0}),t.addEventListener("error",C=>{b.getTracks().forEach(N=>N.stop()),v(C.error??C)},{once:!0}),t.start(1e3),p()},stop(){if(!t)return Promise.resolve(s);if(t.state==="inactive")return u??Promise.resolve(s);const T=u??new Promise(E=>{d=E});return t.stop(),p(),T},clear(){if(t?.state==="recording")throw new Error("Cannot clear a recording while recording is in progress");s=null,i=[],l=0,r=0,c=null,p()},getRecording(){return s},getStatus(){return m()},subscribe(T){return _.add(T),T(m()),()=>{_.delete(T)}},recordRange(T={}){const E=w(),A=E.player.getState();(T.restorePlaybackState??!0)&&(g=A);const y=T.playbackRate??A.speed,b=T.startTime??A.currentTime;h=T.endTime??A.duration,f=!0,E.player.setState({currentTime:b,speed:y,playing:!1}),R.start(T);const C=u;return E.player.play(),(C??Promise.resolve(null)).then(N=>{if(!N)throw new Error("Recording stopped without producing a video");return N})},recordFullReplay(T={}){return R.recordRange({...T,startTime:T.startTime??0,endTime:T.endTime??w().replay.duration})}};return R}const Jh="subtr-actor-timeline-overlay-styles",lE=new Set(["goal","save"]),cE=.2,uE=.01,Qh=.01;function dE(){if(document.getElementById(Jh))return;const n=document.createElement("style");n.id=Jh,n.textContent=`
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
      pointer-events: none;
    }

    .sap-tl-range-lane {
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
  `,document.head.append(n)}function au(n){if(!Number.isFinite(n))return"--:--.--";const e=Math.max(0,n),t=Math.floor(e/60),i=Math.floor(e%60),s=Math.floor((e-Math.floor(e))*100);return`${t}:${String(i).padStart(2,"0")}.${String(s).padStart(2,"0")}`}function ef(n){switch(n.kind){case"goal":return 5;case"demo":return 4;case"save":return 3;case"assist":return 2;case"shot":return 1;default:return 0}}function hE(n){if(n.color)return n.color;if(n.isTeamZero===!0)return"#3b82f6";if(n.isTeamZero===!1)return"#f59e0b";switch(n.kind){case"goal":return"#f5f7fa";case"demo":return"#ef4444";case"save":return"#34d399";case"assist":return"#c084fc";case"shot":return"#60a5fa";default:return"#d1d9e0"}}function fE(n){if(n.events.length>1)return`${n.events.length}`;const e=n.events[0];return e?e.shortLabel&&e.shortLabel.trim()!==""?e.shortLabel.slice(0,3).toUpperCase():e.kind.slice(0,1).toUpperCase():""}function pE(n){return n.events.map(e=>`${au(e.time)} ${e.label??e.kind}`).join(`
`)}function mE(n){const e=new Map;for(const t of n){const i=t.frame!==void 0?`frame:${t.frame}`:`time:${t.time.toFixed(2)}`,s=e.get(i);if(s){s.events.push(t);continue}e.set(i,{key:i,time:t.time,events:[t]})}return[...e.values()].map(t=>({...t,events:[...t.events].sort((i,s)=>{const a=ef(s)-ef(i);return a!==0?a:i.time-s.time})})).sort((t,i)=>t.time-i.time)}function dm(n,e){return n?typeof n=="function"?n(e):n:[]}function gE(n,e){const t=[];for(const i of n)t.push(...dm(i,e));return t}function _E(n,e){return n?typeof n=="function"?n(e):n:[]}function vE(n,e){const t=new Set,i=[];for(const s of n)for(const a of _E(s,e)){const r=a.id;if(r!==void 0){if(t.has(r))continue;t.add(r)}i.push(a)}return i}function yE(n){const e=new Map;for(const t of n){const i=t.lane??"default",s=t.laneLabel??t.lane??"",a=e.get(i);if(a){a.ranges.push(t);continue}e.set(i,{key:i,label:s,ranges:[t]})}return[...e.values()].map(t=>({...t,ranges:[...t.ranges].sort((i,s)=>i.startTime-s.startTime)}))}function bE(n){return n.color?n.color:n.isTeamZero===!0?"#3b82f6":n.isTeamZero===!1?"#f59e0b":"#d1d9e0"}function xE(n,e){if(n.replayEvents)return dm(n.replayEvents,e);if(n.includeReplayEvents===!1)return[];const t=new Set(n.replayEventKinds??lE);return e.replay.timelineEvents.filter(i=>t.has(i.kind))}function SE(n,e){const t=e.player.projectReplayTimeToTimeline(n);if(!t.hiddenBySkip)return t.seekTime;const i=Math.min(e.player.getTimelineDuration(),t.timelineTime+uE);return e.player.projectTimelineTimeToReplay(i)}function Gr(n,e){return`${n/Math.max(e,1e-4)*100}%`}function wE(n,e,t){let i=n.timelineTime,s=e.timelineTime;return s<=i&&(n.hiddenBySkip||e.hiddenBySkip)&&(i>=t?(i=Math.max(0,t-Qh),s=t):s=Math.min(t,i+Qh)),{startTimelineTime:i,endTimelineTime:s}}function ME(n={}){const e=n.pauseWhileScrubbing??!0,t=n.events?[n.events]:[],i=n.ranges?[n.ranges]:[];let s=null,a=null,r=null,o=null,l=null,c=null,u=null,d=null,h=null,f=null,g=null,_=!1,m="",p=!1,w=!1,S=null,v=[],R=[],T=null;const E=new Map,A=[],y=[];function b(){S&&(z(S),N({...S,state:S.player.getState()}))}function C(){S&&(V(S),N({...S,state:S.player.getState()}))}function N(U){if(!o||!l||!c||!u||!d||!h||!a)return;const O=U.player.getTimelineCurrentTime(),Z=U.player.getTimelineDuration(),Q=[Z.toFixed(4),U.state.skipKickoffsEnabled?"1":"0",U.state.skipPostGoalTransitionsEnabled?"1":"0"].join(":");T!==Q&&(z(U),V(U),T=Q),o.min="0",o.max=`${Z}`,o.step="0.01",o.value=`${Math.min(O,Z)}`,l.dataset.playing=U.state.playing?"true":"false",l.setAttribute("aria-label",U.state.playing?"Pause replay":"Play replay"),l.title=U.state.playing?"Pause replay":"Play replay",c.textContent=U.state.playing?"||":">",u.textContent=U.state.playing?"Pause":"Play",d.textContent=au(O),h.textContent=`-${au(Z-O)}`,a.dataset.scrubbing=p?"true":"false";for(const ge of v){const Me=E.get(ge.key);if(!Me)continue;const he=O-Me.timelineTime,_e=he>=0&&he<=cE;Me.element.dataset.active=_e?"true":"false",Me.element.dataset.passed=Me.timelineTime<=O?"true":"false"}for(const ge of A){const Me=Math.max(0,ge.startTimelineTime),he=Math.min(Z,ge.endTimelineTime);if(Math.max(0,he-Me)<=1e-4){ge.element.hidden=!0;continue}ge.element.hidden=!1,ge.element.dataset.active=O>=Me&&O<=he?"true":"false"}const se=Gr(Math.min(O,Z),Z);for(const ge of y)ge.element.style.left=se}function z(U){if(!f)return;f.replaceChildren(),E.clear();const O=xE(n,U),Z=gE(t,U);v=mE([...O,...Z]);const Q=Math.max(U.player.getTimelineDuration(),1e-4);for(const se of v){const ge=se.events[0];if(!ge)continue;const Me=U.player.projectReplayTimeToTimeline(se.time),he=document.createElement("button");he.type="button",he.className="sap-tl-marker",he.style.left=Gr(Me.timelineTime,Q),he.style.color=hE(ge),he.title=pE(se),he.textContent=fE(se),he.addEventListener("click",()=>{U.player.seek(SE(se.time,U))}),he.dataset.active="false",he.dataset.passed="false",f.append(he),E.set(se.key,{element:he,timelineTime:Me.timelineTime})}}function V(U){if(!r)return;r.replaceChildren(),A.splice(0,A.length),y.splice(0,y.length);const O=vE(i,U).filter(Q=>Number.isFinite(Q.startTime)&&Number.isFinite(Q.endTime)&&Q.endTime>Q.startTime);R=yE(O);const Z=Math.max(U.player.getTimelineDuration(),1e-4);if(R.length===0){r.hidden=!0;return}r.hidden=!1;for(const Q of R){const se=document.createElement("div");se.className="sap-tl-range-lane";const ge=document.createElement("div");if(ge.className="sap-tl-range-lane-track",Q.label){const he=document.createElement("span");he.className="sap-tl-range-lane-label",he.textContent=Q.label,he.title=Q.label,se.append(he)}for(const he of Q.ranges){const _e=U.player.projectReplayTimeToTimeline(he.startTime),X=U.player.projectReplayTimeToTimeline(he.endTime),{startTimelineTime:K,endTimelineTime:pe}=wE(_e,X,Z),xe=document.createElement("div");xe.className="sap-tl-range-segment",he.className&&xe.classList.add(he.className),xe.style.background=bE(he),xe.title=he.label??Q.label,xe.dataset.active="false",xe.style.left=Gr(K,Z),xe.style.width=Gr(Math.max(0,pe-K),Z),ge.append(xe),A.push({range:he,element:xe,startTimelineTime:K,endTimelineTime:pe})}const Me=document.createElement("div");Me.className="sap-tl-range-playhead",ge.append(Me),y.push({element:Me}),se.append(ge),r.append(se)}}function G(){p&&(p=!1,a?.setAttribute("data-scrubbing","false"),w&&S?.player.play(),w=!1)}function B(){if(p||(p=!0,a?.setAttribute("data-scrubbing","true"),!e))return;const U=S?.player;U&&(w=U.getState().playing,w&&U.pause())}return{id:"timeline-overlay",addEventSource(U){return t.push(U),b(),()=>{this.removeEventSource(U)}},removeEventSource(U){const O=t.indexOf(U);return O<0?!1:(t.splice(O,1),b(),!0)},refreshEvents(){b()},addRangeSource(U){return i.push(U),C(),()=>{this.removeRangeSource(U)}},removeRangeSource(U){const O=i.indexOf(U);return O<0?!1:(i.splice(O,1),C(),!0)},refreshRanges(){C()},setup(U){S=U,dE(),getComputedStyle(U.container).position==="static"&&(_=!0,m=U.container.style.position,U.container.style.position="relative"),s=document.createElement("div"),s.className="sap-tl-root",a=document.createElement("div"),a.className="sap-tl-shell",a.dataset.scrubbing="false";const O=document.createElement("div");O.className="sap-tl-topline";const Z=document.createElement("div");Z.className="sap-tl-primary",l=document.createElement("button"),l.type="button",l.className="sap-tl-toggle sap-tl-track-toggle",c=document.createElement("span"),c.className="sap-tl-toggle-icon",c.setAttribute("aria-hidden","true"),c.textContent=">",u=document.createElement("span"),u.className="sap-tl-toggle-label",u.textContent="Play",l.append(c,u),l.addEventListener("click",()=>{U.player.togglePlayback()}),d=document.createElement("span"),d.className="sap-tl-current",d.textContent="0:00.00",h=document.createElement("span"),h.className="sap-tl-remaining",h.textContent="-0:00.00",Z.append(d),O.append(Z,h);const Q=document.createElement("div");Q.className="sap-tl-track-wrap",r=document.createElement("div"),r.className="sap-tl-ranges",r.hidden=!0;const se=document.createElement("div");se.className="sap-tl-track-rail";const ge=document.createElement("div");ge.className="sap-tl-main-rail",f=document.createElement("div"),f.className="sap-tl-markers",o=document.createElement("input"),o.className="sap-tl-range",o.type="range",o.min="0",o.max=`${U.replay.duration}`,o.step="0.01",o.value="0";const Me=()=>{B()},he=()=>{o&&U.player.seek(U.player.projectTimelineTimeToReplay(Number(o.value)))},_e=()=>{G()};o.addEventListener("pointerdown",Me),o.addEventListener("input",he),o.addEventListener("change",_e),window.addEventListener("pointerup",_e),window.addEventListener("pointercancel",_e),g=()=>{o?.removeEventListener("pointerdown",Me),o?.removeEventListener("input",he),o?.removeEventListener("change",_e),window.removeEventListener("pointerup",_e),window.removeEventListener("pointercancel",_e)},se.append(ge,f,o),Q.append(r,l,se),a.append(O,Q),s.append(a),U.container.append(s),z(U),V(U),N({...U,state:U.player.getState()})},onStateChange(U){S=U,N(U)},teardown(U){g?.(),g=null,G(),s?.remove(),s=null,a=null,r=null,o=null,l=null,c=null,u=null,d=null,h=null,f=null,S=null,v=[],R=[],T=null,E.clear(),A.splice(0,A.length),y.splice(0,y.length),_&&(U.container.style.position=m,_=!1)}}}function EE(n){return`
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
              <button type="button" data-window-toggle="mechanics">Mechanics</button>
              <button type="button" data-window-toggle="mechanics-review">Mechanics review</button>
              <button type="button" data-window-toggle="boost-pickups">Boost pickup filters</button>
              <button type="button" data-window-toggle="touch-controls">Touch controls</button>
              <button type="button" data-create-stats-window="player">New player stats</button>
              <button type="button" data-create-stats-window="team">New team stats</button>
              <button type="button" data-create-stats-window="all-players">New all players stats</button>
              <button type="button" data-create-stats-window="all-teams">New all teams stats</button>
              <button type="button" data-create-stats-window="mechanics-overview">New mechanics counts</button>
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
                <h2>Mechanics</h2>
              </div>
              <button class="floating-window-hide" type="button" data-window-hide="mechanics">
                Hide
              </button>
            </header>
            <div id="mechanics-timeline-window-body"></div>
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
`}const cd=[{stage:"validating",index:1,total:8,label:"Parse replay",start:0,end:.08},{stage:"processing",index:2,total:8,label:"Process replay frames",start:.08,end:.62},{stage:"building-stats",index:3,total:8,label:"Build stats snapshots",start:.62,end:.7},{stage:"serializing-replay",index:4,total:8,label:"Serialize replay data",start:.7,end:.76},{stage:"serializing-stats",index:5,total:8,label:"Serialize stats timeline",start:.76,end:.86},{stage:"normalizing",index:6,total:8,label:"Normalize replay model",start:.86,end:.91},{stage:"decoding-replay",index:7,total:8,label:"Decode replay data",start:.91,end:.94},{stage:"decoding-stats",index:8,total:8,label:"Decode stats chunks",start:.94,end:.99}];function hm(n){return Math.max(0,Math.min(1,n))}function jl(n,e,t){if(n!==void 0)return hm((n-e)/(t-e))}function ud(n){if(n.stage!=="stats-timeline")return n;const e=n.progress;return e===void 0?{...n,stage:"building-stats"}:e<.35?{...n,stage:"building-stats",progress:jl(e,0,.35)}:e<.55?{...n,stage:"serializing-replay",progress:jl(e,.35,.55)}:{...n,stage:"serializing-stats",progress:jl(e,.55,.92)}}function fm(n){const e=ud(n);return cd.find(t=>t.stage===e.stage)}function TE(){return cd.map(({stage:n,index:e,total:t,label:i})=>({stage:n,index:e,total:t,label:i}))}function AE(n){const e=fm(n);return{stage:e.stage,index:e.index,total:e.total,label:e.label}}function CE(n){const e=ud(n),t=fm(e);return cd.map(({stage:i,index:s,total:a,label:r})=>{if(s<t.index)return{stage:i,index:s,total:a,label:r,state:"complete",completion:1,indeterminate:!1};if(s>t.index)return{stage:i,index:s,total:a,label:r,state:"pending",completion:0,indeterminate:!1};const o=e.progress!==void 0;return{stage:i,index:s,total:a,label:r,state:"active",completion:o?hm(e.progress??0):1,indeterminate:!o}})}function pm(n){const e=ud(n),t=e.progress===void 0?null:Math.round(e.progress*100);switch(e.stage){case"validating":return"Parsing replay...";case"processing":return t!==null&&e.totalFrames!==void 0?`Processing replay frames... ${t}% (${e.processedFrames??0}/${e.totalFrames})`:"Processing replay frames...";case"building-stats":return t!==null?e.totalFrames!==void 0?`Building stats snapshots... ${t}% (${e.processedFrames??0}/${e.totalFrames})`:`Building stats snapshots... ${t}%`:"Building stats snapshots...";case"serializing-replay":return t!==null?`Serializing replay data... ${t}%`:"Serializing replay data...";case"serializing-stats":return t!==null?`Serializing stats timeline... ${t}%`:"Serializing stats timeline...";case"decoding-replay":return t!==null?`Decoding replay data... ${t}%`:"Decoding replay data...";case"decoding-stats":return t!==null?e.totalChunks!==void 0?`Decoding stats chunks... ${t}% (${e.processedChunks??0}/${e.totalChunks})`:`Decoding stats chunks... ${t}%`:"Decoding stats chunks...";case"normalizing":return t!==null?`Normalizing replay model... ${t}%`:"Normalizing replay model...";default:return"Loading replay..."}}function xa(n,e){return JSON.parse(n.decode(new Uint8Array(e)))}async function RE(n,e,t){t?.({stage:"decoding-stats",progress:0});const i=xa(n,e.configBuffer);t?.({stage:"decoding-stats",progress:.05}),await Fs();const s=xa(n,e.replayMetaBuffer);t?.({stage:"decoding-stats",progress:.1}),await Fs();const a=xa(n,e.eventsBuffer);t?.({stage:"decoding-stats",progress:.15}),await Fs();const r=[],o=e.frameChunkBuffers.length;for(let l=0;l<o;l+=1){const c=e.frameChunkBuffers[l];r.push(...xa(n,c)),t?.({stage:"decoding-stats",processedChunks:l+1,totalChunks:o,progress:.15+(l+1)/Math.max(1,o)*.85}),await Fs()}return o===0&&t?.({stage:"decoding-stats",progress:1}),{config:i,replay_meta:s,events:a,frames:r}}function Fs(){return typeof requestAnimationFrame!="function"?Promise.resolve():new Promise(n=>requestAnimationFrame(()=>n()))}async function PE(n,e={}){if(typeof Worker>"u")throw new Error("Replay loading worker is not available in this environment");const t=new Worker(new URL(""+new URL("replayLoader.worker-D2-XMRtw.js",import.meta.url).href,import.meta.url),{type:"module"}),i=n.slice(),s=e.reportEveryNFrames??100;return new Promise((a,r)=>{const o=()=>{t.terminate()};t.onmessage=async c=>{const u=c.data;if(u.type==="progress"){e.onProgress?.(u.progress);return}if(u.type==="error"){o(),r(new Error(u.error));return}o();const d=new TextDecoder;e.onProgress?.({stage:"decoding-replay",progress:0}),await Fs();const h=xa(d,u.replayBuffer);e.onProgress?.({stage:"decoding-replay",progress:1}),await Fs();const f=await RE(d,u.statsTimelineParts,e.onProgress);a({replay:h,statsTimeline:f})},t.onerror=c=>{o(),r(new Error(c.message||"Replay loading worker failed"))};const l={type:"load-replay",bytes:i.buffer,reportEveryNFrames:s};t.postMessage(l,[i.buffer])})}function LE(n){const e=document.createElement("div");e.className="replay-load-modal",e.hidden=!0;const t=document.createElement("div");t.className="replay-load-modal__dialog",t.setAttribute("role","dialog"),t.setAttribute("aria-modal","true"),t.setAttribute("aria-labelledby","replay-load-modal-title");const i=document.createElement("p");i.className="replay-load-modal__eyebrow",i.textContent="Replay loading";const s=document.createElement("h2");s.id="replay-load-modal-title",s.className="replay-load-modal__title",s.textContent="Preparing replay pipeline";const a=document.createElement("p");a.className="replay-load-modal__status",a.textContent="Preparing replay...";const r=document.createElement("div");r.className="replay-load-modal__phase-list";const o=new Map;for(const f of TE()){const g=document.createElement("div");g.className="replay-load-modal__phase-row",g.dataset.state="pending";const _=document.createElement("p");_.className="replay-load-modal__phase-label",_.textContent=`${f.index}. ${f.label}`;const m=document.createElement("div");m.className="replay-load-modal__phase-bar";const p=document.createElement("div");p.className="replay-load-modal__phase-fill",p.dataset.indeterminate="false",m.append(p),g.append(_,m),r.append(g),o.set(f.stage,{row:g,fill:p})}const l=document.createElement("p");l.className="replay-load-modal__meta",t.append(i,s,a,r,l),e.append(t),n.append(e);let c="";const u=()=>{for(const{row:f,fill:g}of o.values())f.dataset.state="pending",g.style.width="0%",g.dataset.indeterminate="false"},d=f=>{for(const g of CE(f)){const _=o.get(g.stage);_&&(_.row.dataset.state=g.state,_.fill.dataset.indeterminate=g.indeterminate?"true":"false",_.fill.style.width=`${Math.round(g.completion*100)}%`)}},h=f=>{e.hidden=!f};return{show(f,g="Preparing replay..."){c=f,h(!0),u(),s.textContent="Preparing replay pipeline",a.textContent=g,l.textContent=`Loading ${f}`},update(f){h(!0);const g=AE(f);if(d(f),s.textContent=`Phase ${g.index} of ${g.total}: ${g.label}`,a.textContent=pm(f),f.stage==="processing"&&f.totalFrames!==void 0){l.textContent=`${f.processedFrames??0}/${f.totalFrames} frames`;return}if(f.stage==="decoding-stats"&&f.totalChunks!==void 0){l.textContent=`${f.processedChunks??0}/${f.totalChunks} chunks`;return}l.textContent=c?`Loading ${c}`:""},hide(){h(!1)},destroy(){e.remove()}}}const IE=236,qa=4120,NE=2300,DE=16185075,UE=.18,FE=1118481,io=5882879,so=16761180,OE=.55,Jl=.12,tf=.28,kE=3,BE=4,nf=5,sf=2,zE=6,HE=856343,VE=.42,GE=18,WE=.24,$E=10,af=220,XE=200,mm=140,qE=220,YE=100,ZE=120;function KE(n){const e=XE/2;if(n){const s=-qa+af,a=-e;return{minX:s,maxX:a,centerX:(s+a)/2,width:a-s}}const t=e,i=qa-af;return{minX:t,maxX:i,centerX:(t+i)/2,width:i-t}}function jE(n,e,t){if(n.length<2)return[];const i=Math.min(...n),s=Math.max(...n),a=s-i,r=e?-1:1,o=-r;return a<=t?[{kind:"other",centerY:(i+s)/2,halfDepth:Math.max(t-a/2,t*.35),directions:[r,o]}]:[{kind:"back",centerY:e?i:s,halfDepth:t,directions:[r]},{kind:"forward",centerY:e?s:i,halfDepth:t,directions:[o]}]}function JE(n,e){const t=new id;return t.moveTo(0,e/2),t.lineTo(n/2,-e/2),t.lineTo(-n/2,-e/2),t.closePath(),new qo(t)}function rf(n){const e=YE*n,t=new lt({color:FE,transparent:!0,opacity:.9,side:et,depthWrite:!1,depthTest:!1}),i=new mt;i.visible=!1;const s=new rn(mm*.55*n,1),a=new ze(s,t);a.position.z=nf,a.renderOrder=22,i.add(a);const r=JE(ZE*n,e),o=new ze(r,t);return o.position.z=nf,o.renderOrder=23,i.add(o),{group:i,shaftGeom:s,shaftMesh:a,headGeom:r,headMesh:o,material:t,headLength:e}}function Ql(n,e,t,i){const s=Math.max(t-n.headLength,n.headLength*.2);n.group.position.x=e,n.group.rotation.z=i>0?0:Math.PI,n.shaftMesh.scale.y=s,n.shaftMesh.position.y=-n.headLength/2,n.headMesh.position.y=t/2-n.headLength/2,n.group.visible=!0}function To(n){n.group.visible=!1}function Ls(n,e){const t=new mt;t.visible=!1;const i=new lt({color:DE,transparent:!0,opacity:UE,side:et,depthWrite:!1,depthTest:!1}),s=new rn(1,1),a=new ze(s,i);a.position.z=kE,a.renderOrder=20,t.add(a);const r=new lt({color:e,transparent:!0,opacity:OE,side:et,depthWrite:!1,depthTest:!1}),o=new rn(1,1),l=new ze(o,r);l.position.z=BE,l.renderOrder=21,t.add(l);const c=rf(n),u=rf(n);return t.add(c.group),t.add(u.group),{group:t,floorGeom:s,floorMesh:a,floorMaterial:i,stripeGeom:o,stripeMesh:l,stripeMaterial:r,primaryMarker:c,secondaryMarker:u}}function QE(n){n.group.visible=!1,To(n.primaryMarker),To(n.secondaryMarker)}function eT(n,e,t,i){const s=e.halfDepth*2*i,a=qa*2*i,r=t.width*i,o=t.centerX*i,l=mm*i,c=Math.max(s-32*i,n.primaryMarker.headLength*1.15),u=Math.min(c,Math.max(qE*i,s*.6));if(n.group.position.y=e.centerY*i,n.floorMesh.position.x=0,n.floorMesh.scale.set(a,s,1),n.stripeMesh.position.x=o,n.stripeMesh.scale.set(l,s,1),To(n.primaryMarker),To(n.secondaryMarker),e.directions.length===1)Ql(n.primaryMarker,o,u,e.directions[0]);else{const d=r*.18;Ql(n.primaryMarker,o-d,u,e.directions[0]),Ql(n.secondaryMarker,o+d,u,e.directions[1])}n.group.visible=!0}function of(n){n.group.removeFromParent(),n.shaftGeom.dispose(),n.headGeom.dispose(),n.material.dispose()}class tT{replay;blueBack;blueForward;blueOther;orangeBack;orangeForward;orangeOther;constructor(e,t,i){this.replay=t,this.blueBack=Ls(i,io),this.blueForward=Ls(i,io),this.blueOther=Ls(i,io),this.orangeBack=Ls(i,so),this.orangeForward=Ls(i,so),this.orangeOther=Ls(i,so);for(const s of this.getZones())e.add(s.group)}update(e,t){const{frameIndex:i}=e,s=IE;for(const a of[!0,!1]){const r=this.replay.players.filter(d=>d.isTeamZero===a).length,o=[];for(const d of this.replay.players){if(d.isTeamZero!==a)continue;const h=d.frames[i];h?.position&&o.push(h.position.y)}const l=KE(a),c=this.getTeamZones(a);for(const d of c.values())QE(d);if(r<2||o.length!==r)continue;const u=jE(o,a,s);for(const d of u){const h=c.get(d.kind);h&&eT(h,d,l,t)}}}dispose(){for(const e of this.getZones())e.group.removeFromParent(),e.floorGeom.dispose(),e.floorMaterial.dispose(),e.stripeGeom.dispose(),e.stripeMaterial.dispose(),of(e.primaryMarker),of(e.secondaryMarker)}getTeamZones(e){return e?new Map([["back",this.blueBack],["forward",this.blueForward],["other",this.blueOther]]):new Map([["back",this.orangeBack],["forward",this.orangeForward],["other",this.orangeOther]])}getZones(){return[this.blueBack,this.blueForward,this.blueOther,this.orangeBack,this.orangeForward,this.orangeOther]}}function nT(n){return n==null||Number.isNaN(n)?null:n<0?"team-zero":"team-one"}class iT{group;teamZeroSide;teamOneSide;constructor(e,t){this.group=new mt,this.teamZeroSide=this.createHalfFieldSide(io),this.teamOneSide=this.createHalfFieldSide(so);const i=qa*t,s=5120*t;this.teamZeroSide.mesh.position.set(0,-s/2,sf),this.teamZeroSide.mesh.scale.set(i*2,s,1),this.teamOneSide.mesh.position.set(0,s/2,sf),this.teamOneSide.mesh.scale.set(i*2,s,1),this.group.add(this.teamZeroSide.mesh),this.group.add(this.teamOneSide.mesh),e.add(this.group)}update(e){const t=nT(e);this.teamZeroSide.material.opacity=t==="team-zero"?tf:Jl,this.teamOneSide.material.opacity=t==="team-one"?tf:Jl}dispose(){this.group.removeFromParent(),this.teamZeroSide.mesh.geometry.dispose(),this.teamZeroSide.material.dispose(),this.teamOneSide.mesh.geometry.dispose(),this.teamOneSide.material.dispose()}createHalfFieldSide(e){const t=new rn(1,1),i=new lt({color:e,transparent:!0,opacity:Jl,side:et,depthWrite:!1,depthTest:!1}),s=new ze(t,i);return s.renderOrder=18,{mesh:s,material:i}}}function sT(n,e){const t=new mt,i=qa*2*e,s=(a,r,o)=>{const l=new rn(i,r*e),c=new lt({color:HE,transparent:!0,opacity:o,side:et,depthWrite:!1,depthTest:!1}),u=new ze(l,c);return u.position.set(0,a,zE),u.renderOrder=24,u};for(const a of[-1,1]){const r=a*NE*e;t.add(s(r,GE,VE))}return t.add(s(0,$E,WE)),n.add(t),t}function Rt(n){return n===void 0||Number.isNaN(n)?"?":`${Math.round(n)}`}function ru(n,e,t=1){return n===void 0||e===void 0||Number.isNaN(n)||Number.isNaN(e)||e<=0?"?":`${(n*100/e).toFixed(t)}%`}function Sn(n,e){return`<div class="stat-row"><span class="label">${n}</span><span class="value">${e}</span></div>`}function aT(n,e){return`
      ${Sn("50s",Rt(n?.count))}
      ${Sn("Blue wins",`${Rt(n?.wins)} (${ru(n?.wins,n?.count)})`)}
      ${Sn("Orange wins",`${Rt(n?.losses)} (${ru(n?.losses,n?.count)})`)}
      ${Sn("Neutral",Rt(n?.neutral_outcomes))}
      ${Sn("Blue poss after",Rt(n?.possession_after_count))}
      ${Sn("Orange poss after",Rt(n?.opponent_possession_after_count))}
      ${Sn("Kickoff 50s",Rt(n?.kickoff_count))}
      ${Sn("Blue kickoff wins",Rt(n?.kickoff_wins))}
      ${Sn("Orange kickoff wins",Rt(n?.kickoff_losses))}
      ${Sn("Blue kickoff poss",Rt(n?.kickoff_possession_after_count))}
      ${Sn("Orange kickoff poss",Rt(n?.kickoff_opponent_possession_after_count))}
    `}function lf(n){return`
    <div class="stat-row"><span class="label">50s</span><span class="value">${Rt(n?.count)}</span></div>
    <div class="stat-row"><span class="label">Wins</span><span class="value">${Rt(n?.wins)} (${ru(n?.wins,n?.count)})</span></div>
    <div class="stat-row"><span class="label">Losses</span><span class="value">${Rt(n?.losses)}</span></div>
    <div class="stat-row"><span class="label">Neutral</span><span class="value">${Rt(n?.neutral_outcomes)}</span></div>
    <div class="stat-row"><span class="label">Poss after</span><span class="value">${Rt(n?.possession_after_count)}</span></div>
    <div class="stat-row"><span class="label">Kickoff 50s</span><span class="value">${Rt(n?.kickoff_count)}</span></div>
    <div class="stat-row"><span class="label">Kickoff wins</span><span class="value">${Rt(n?.kickoff_wins)}</span></div>
    <div class="stat-row"><span class="label">Kickoff poss</span><span class="value">${Rt(n?.kickoff_possession_after_count)}</span></div>
  `}function rT(n,e=1,t=""){return n===void 0||Number.isNaN(n)?"?":`${n.toFixed(e)}${t}`}function oT(n,e,t=1){return n===void 0||e===void 0||Number.isNaN(n)||Number.isNaN(e)||e<=0?"?":`${(n*100/e).toFixed(t)}%`}function cf(n,e,t=1){if(n===void 0||Number.isNaN(n))return"?";const i=oT(n,e,t);return i==="?"?`${n.toFixed(t)}s`:`${n.toFixed(t)}s (${i})`}function uf(n){return n.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function ou(n,e){return`<div class="stat-row"><span class="label">${uf(n)}</span><span class="value">${uf(e)}</span></div>`}function lT(n){const e=new Set,t=[];for(const i of n??[])e.has(i)||(e.add(i),t.push(i));return t}function gm(n,e){return n==="neutral"?"Neutral":e.kind==="shared"?n==="own"?"Blue control":"Orange control":n==="own"?"Team control":"Opp control"}function lu(n){return n.kind==="shared"?["own","neutral","opponent"]:["own","neutral","opponent"]}function cT(n,e){return n==="neutral_third"?"Neutral third":e.kind==="shared"?n==="defensive_third"?"Blue third":"Orange third":n==="defensive_third"?"Own third":"Opp third"}function uT(n){return n.kind==="shared"?["defensive_third","neutral_third","offensive_third"]:["defensive_third","neutral_third","offensive_third"]}function dT(n,e,t,i){for(const s of t){const a=s==="possession_state"?lu(i):uT(i),r=a.indexOf(n[s]),o=a.indexOf(e[s]),l=r===-1?Number.MAX_SAFE_INTEGER:r,c=o===-1?Number.MAX_SAFE_INTEGER:o;if(l!==c)return l-c}return 0}function hT(n,e,t){const i=(s,a)=>s==="possession_state"?gm(a,t):cT(a,t);if(e.length===1){const s=e[0];return i(s,n[s])}return e.map(s=>i(s,n[s])).join(" / ")}function fT(n,e,t,i){if(e.length===0)return"";const s=new Map;if(n?.labeled_time?.entries?.length)for(const a of n.labeled_time.entries){const r=new Map(a.labels.map(d=>[d.key,d.value])),o={};let l=!0;for(const d of e){const h=r.get(d);if(h===void 0){l=!1;break}o[d]=h}if(!l)continue;const c=e.map(d=>`${d}:${o[d]}`).join("|"),u=s.get(c);u?u.total+=a.value:s.set(c,{values:o,total:a.value})}if(s.size===0&&e.length===1&&e[0]==="possession_state"){const a=new Map;return n&&(a.set("own",n.possession_time),a.set("neutral",n.neutral_time??0),a.set("opponent",n.opponent_possession_time)),lu(i).some(r=>(a.get(r)??0)>0)?lu(i).filter(r=>a.has(r)).map(r=>ou(gm(r,i),cf(a.get(r),t))).join(""):""}return[...s.values()].sort((a,r)=>dT(a.values,r.values,e,i)).map(a=>ou(hT(a.values,e,i),cf(a.total,t))).join("")}function df(n,e){const t=n?.tracked_time,i=lT(e.breakdownClasses),s=fT(n,i,t,e.labelPerspective);return`
    ${ou("Tracked",rT(t,1,"s"))}
    ${s}
  `}function pT(n,e=1,t=""){return n===void 0||Number.isNaN(n)?"?":`${n.toFixed(e)}${t}`}function mT(n,e,t=1){return n===void 0||e===void 0||Number.isNaN(n)||Number.isNaN(e)||e<=0?"?":`${(n*100/e).toFixed(t)}%`}function gT(n,e,t=1){if(n===void 0||Number.isNaN(n))return"?";const i=mT(n,e,t);return i==="?"?`${n.toFixed(t)}s`:`${n.toFixed(t)}s (${i})`}function hf(n){return n.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function _m(n,e){return`<div class="stat-row"><span class="label">${hf(n)}</span><span class="value">${hf(e)}</span></div>`}function _T(n,e){return n==="neutral"?"Neutral zone":e.kind==="shared"?n==="defensive_half"?"Blue side":"Orange side":n==="defensive_half"?"Own half":"Opp half"}function vT(n,e,t){const i=new Map;if(n&&(i.set("defensive_half",n.defensive_half_time),i.set("neutral",n.neutral_time??0),i.set("offensive_half",n.offensive_half_time)),n?.labeled_time?.entries?.length){i.clear();for(const a of n.labeled_time.entries){const r=a.labels.find(o=>o.key==="field_half")?.value;r&&i.set(r,(i.get(r)??0)+a.value)}}const s=["defensive_half","neutral","offensive_half"];return s.some(a=>(i.get(a)??0)>0)?s.filter(a=>i.has(a)).map(a=>_m(_T(a,t),gT(i.get(a),e))).join(""):""}function ff(n,e){const t=n?.tracked_time,i=vT(n,t,e.labelPerspective);return`
    ${i.length===0?_m("Tracked",pT(t,1,"s")):""}
    ${i}
  `}function Vi(n){return n===void 0||Number.isNaN(n)?"?":`${Math.round(n)}`}function Gi(n,e){return`<div class="stat-row"><span class="label">${n}</span><span class="value">${e}</span></div>`}function ec(n){return`
    ${Gi("Rushes",Vi(n?.count))}
    ${Gi("2v1",Vi(n?.two_v_one_count))}
    ${Gi("2v2",Vi(n?.two_v_two_count))}
    ${Gi("2v3",Vi(n?.two_v_three_count))}
    ${Gi("3v1",Vi(n?.three_v_one_count))}
    ${Gi("3v2",Vi(n?.three_v_two_count))}
    ${Gi("3v3",Vi(n?.three_v_three_count))}
  `}const pf="subtr-actor-fifty-fifty-overlay-styles",yT=5882879,bT=16761180,xT=15988472,ST=180,wT=4;function cu(n){if(!n)return null;const[e,t]=Object.entries(n)[0]??["Unknown","unknown"],i=typeof t=="string"?t:JSON.stringify(t);return`${e}:${i}`}function mf(n,e){const t=cu(e);return t?n.players.find(i=>i.id===t)?.name??t:"Unknown"}function MT(n,e){const t=mf(e,n.team_zero_player),i=mf(e,n.team_one_player),s=n.is_kickoff?"Kickoff 50/50":"50/50",a=n.winning_team_is_team_0===void 0?null:n.winning_team_is_team_0,r=n.possession_team_is_team_0===void 0?null:n.possession_team_is_team_0,o=a===null?"neutral":a?"blue win":"orange win",l=r===null?"neutral poss":r?"blue poss":"orange poss",c=a===null?"sap-fifty-fifty-overlay-label-neutral":a?"sap-fifty-fifty-overlay-label-blue":"sap-fifty-fifty-overlay-label-orange";return{text:`${s}: ${t} vs ${i} | ${o} | ${l}`,className:c,winnerIsTeamZero:a}}function vm(n,e){return n.events.fifty_fifty.map(t=>{const i=MT(t,e),s=new L(...t.team_zero_position),a=new L(...t.team_one_position),r=new L(...t.midpoint),o=e.frames[t.start_frame]?.time??t.start_time;return{id:`fifty-fifty:${t.start_frame}:${cu(t.team_zero_player)}:${cu(t.team_one_player)}`,time:o,frame:t.start_frame,label:i.text,labelClassName:i.className,axisStart:s,axisEnd:a,midpoint:r,winnerIsTeamZero:i.winnerIsTeamZero}})}function ET(n,e,t){const i=Math.max(.1,t);return n.filter(s=>{const a=e-s.time;return a>=0&&a<=i})}function TT(){if(document.getElementById(pf))return;const n=document.createElement("style");n.id=pf,n.textContent=`
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
  `,document.head.append(n)}function AT(n,e,t,i){if(i.copy(n).project(e),i.z<-1||i.z>1)return!1;const s=t.clientWidth||1,a=t.clientHeight||1;return i.x=(i.x+1)*s/2,i.y=(1-i.y)*a/2,!(i.x<-100||i.x>s+100||i.y<-100||i.y>a+100)}class CT{scene;container;group=new mt;labelRoot;projectedPosition=new L;worldPosition=new L;labelOffset=new L(0,0,ST);markers;views=new Map;changedContainerPosition=!1;originalContainerPosition="";decaySeconds=wT;constructor(e,t,i,s){TT(),this.scene=e,this.container=t,this.markers=vm(s,i),getComputedStyle(t).position==="static"&&(this.changedContainerPosition=!0,this.originalContainerPosition=t.style.position,t.style.position="relative"),this.group.name="fifty-fifty-overlay",this.scene.replayRoot.add(this.group),this.labelRoot=document.createElement("div"),this.labelRoot.className="sap-fifty-fifty-overlay-root",this.container.append(this.labelRoot)}update(e){const t=ET(this.markers,e,this.decaySeconds),i=new Set(t.map(s=>s.id));for(const[s,a]of this.views.entries())i.has(s)||(a.line.removeFromParent(),a.line.geometry.dispose(),a.material.dispose(),a.label.remove(),this.views.delete(s));for(const s of t){const a=Math.max(0,e-s.time),r=Math.max(0,1-a/this.decaySeconds),o=this.ensureView(s),l=.12+.78*r;o.material.opacity=l;const c=o.line.geometry.getAttribute("position");c.setXYZ(0,s.axisStart.x,s.axisStart.y,s.axisStart.z+24),c.setXYZ(1,s.axisEnd.x,s.axisEnd.y,s.axisEnd.z+24),c.needsUpdate=!0,this.worldPosition.copy(s.midpoint).add(this.labelOffset),this.scene.replayRoot.localToWorld(this.worldPosition),AT(this.worldPosition,this.scene.camera,this.container,this.projectedPosition)?(o.label.hidden=!1,o.label.style.opacity=`${.24+.76*r}`,o.label.style.transform=`translate(${this.projectedPosition.x.toFixed(1)}px, ${this.projectedPosition.y.toFixed(1)}px) translate(-50%, -100%)`):o.label.hidden=!0}}dispose(){for(const e of this.views.values())e.line.removeFromParent(),e.line.geometry.dispose(),e.material.dispose(),e.label.remove();this.views.clear(),this.group.removeFromParent(),this.labelRoot.remove(),this.changedContainerPosition&&(this.container.style.position=this.originalContainerPosition,this.changedContainerPosition=!1)}ensureView(e){const t=this.views.get(e.id);if(t)return t;const i=new Tt().setFromPoints([e.axisStart,e.axisEnd]),s=new $o({color:e.winnerIsTeamZero===null?xT:e.winnerIsTeamZero?yT:bT,transparent:!0,opacity:.9}),a=new Qu(i,s);a.renderOrder=3,this.group.add(a);const r=document.createElement("div");r.className=`sap-fifty-fifty-overlay-label ${e.labelClassName}`,r.textContent=e.label,this.labelRoot.append(r);const o={marker:e,line:a,material:s,label:r};return this.views.set(e.id,o),o}}const gf="subtr-actor-ceiling-shot-overlay-styles",RT=5882879,PT=16761180,LT=16185075,IT=140,NT=215,DT=220,UT=4.5;function ym(n){if(!n)return null;const[e,t]=Object.entries(n)[0]??["Unknown","unknown"],i=typeof t=="string"?t:JSON.stringify(t);return`${e}:${i}`}function FT(n,e){const t=ym(e);return t?n.players.find(i=>i.id===t)?.name??t:"Unknown"}function bm(n,e){return n.events.ceiling_shot.map(t=>{const i=FT(e,t.player),s=ym(t.player),a=e.frames[t.frame]?.time??t.time,r=t.confidence;return{id:`ceiling-shot:${t.frame}:${s}:${Math.round(r*1e3)}`,time:a,frame:t.frame,isTeamZero:t.is_team_0,playerId:s,playerName:i,ceilingContactPosition:{x:t.ceiling_contact_position[0],y:t.ceiling_contact_position[1],z:t.ceiling_contact_position[2]},touchPosition:{x:t.touch_position[0],y:t.touch_position[1],z:t.touch_position[2]},quality:r,qualityLabel:`${Math.round(r*100)}%`}})}function OT(n,e,t){const i=Math.max(.1,t);return n.filter(s=>{const a=e-s.time;return a>=0&&a<=i})}function kT(){if(document.getElementById(gf))return;const n=document.createElement("style");n.id=gf,n.textContent=`
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
  `,document.head.append(n)}function BT(n,e,t,i){if(i.copy(n).project(e),i.z<-1||i.z>1)return!1;const s=t.clientWidth||1,a=t.clientHeight||1;return i.x=(i.x+1)*s/2,i.y=(1-i.y)*a/2,!(i.x<-100||i.x>s+100||i.y<-100||i.y>a+100)}class zT{scene;container;group=new mt;labelRoot;projectedPosition=new L;worldPosition=new L;labelOffset=new L(0,0,DT);markers;views=new Map;changedContainerPosition=!1;originalContainerPosition="";decaySeconds=UT;constructor(e,t,i,s){kT(),this.scene=e,this.container=t,this.markers=bm(s,i),getComputedStyle(t).position==="static"&&(this.changedContainerPosition=!0,this.originalContainerPosition=t.style.position,t.style.position="relative"),this.group.name="ceiling-shot-overlay",this.scene.replayRoot.add(this.group),this.labelRoot=document.createElement("div"),this.labelRoot.className="sap-ceiling-shot-overlay-root",this.container.append(this.labelRoot)}update(e){const t=OT(this.markers,e,this.decaySeconds),i=new Set(t.map(s=>s.id));for(const[s,a]of this.views.entries())i.has(s)||(a.ring.removeFromParent(),a.ring.geometry.dispose(),a.ringMaterial.dispose(),a.beam.removeFromParent(),a.beamGeometry.dispose(),a.beamMaterial.dispose(),a.label.remove(),this.views.delete(s));for(const s of t){const a=Math.max(0,e-s.time),r=Math.max(0,1-a/this.decaySeconds),o=this.ensureView(s),l=.14+.6*r,c=.94+(1-r)*.18;o.ringMaterial.opacity=l,o.beamMaterial.opacity=.18+.55*r,o.ring.position.set(s.touchPosition.x,s.touchPosition.y,s.touchPosition.z+12),o.ring.scale.setScalar(c+s.quality*.08),this.worldPosition.set(s.touchPosition.x,s.touchPosition.y,s.touchPosition.z).add(this.labelOffset);const u=BT(this.worldPosition,this.scene.camera,this.container,this.projectedPosition);o.label.style.display=u?"block":"none",u&&(o.label.style.left=`${this.projectedPosition.x}px`,o.label.style.top=`${this.projectedPosition.y}px`,o.label.style.opacity=`${.42+.58*r}`)}}dispose(){for(const e of this.views.values())e.ring.removeFromParent(),e.ring.geometry.dispose(),e.ringMaterial.dispose(),e.beam.removeFromParent(),e.beamGeometry.dispose(),e.beamMaterial.dispose(),e.label.remove();this.views.clear(),this.group.removeFromParent(),this.labelRoot.remove(),this.changedContainerPosition&&(this.container.style.position=this.originalContainerPosition)}ensureView(e){const t=this.views.get(e.id);if(t)return t;const i=e.quality>=.8?LT:e.isTeamZero?RT:PT,s=new lt({color:i,transparent:!0,opacity:.8,side:et,depthWrite:!1,depthTest:!1}),a=new cs(IT,NT,48),r=new ze(a,s);r.renderOrder=30,this.group.add(r);const o=new Tt().setFromPoints([new L(e.ceilingContactPosition.x,e.ceilingContactPosition.y,e.ceilingContactPosition.z),new L(e.touchPosition.x,e.touchPosition.y,e.touchPosition.z)]),l=new $o({color:i,transparent:!0,opacity:.7,depthWrite:!1,depthTest:!1}),c=new Qu(o,l);c.renderOrder=29,this.group.add(c);const u=document.createElement("div");u.className=`sap-ceiling-shot-overlay-label ${e.isTeamZero?"sap-ceiling-shot-overlay-label-blue":"sap-ceiling-shot-overlay-label-orange"}`,u.textContent=`${e.playerName} ceiling shot ${e.qualityLabel}`,this.labelRoot.append(u);const d={marker:e,ring:r,ringMaterial:s,beam:c,beamGeometry:o,beamMaterial:l,label:u};return this.views.set(e.id,d),d}}const _f="subtr-actor-touch-overlay-styles",vf=5882879,yf=16761180,HT=120,VT=196,tc=24,bf=210,xf=5,ao=.1,GT=48;function At(n){const[e,t]=Object.entries(n)[0]??["Unknown","unknown"],i=typeof t=="string"?t:JSON.stringify(t);return`${e}:${i}`}function WT(n){return{touchCount:n.touch?.touch_count??0,totalBallTravelDistance:n.touch?.total_ball_travel_distance??0,totalBallAdvanceDistance:n.touch?.total_ball_advance_distance??0,totalBallRetreatDistance:n.touch?.total_ball_retreat_distance??0}}function nc(n,e){return Math.max(0,n-e)}function $T(n,e){if(e==="markers")return n.playerName;const t=Math.round(n.totalBallAdvanceDistance),i=Math.round(n.totalBallRetreatDistance);return t>0&&i>0?`${n.playerName} +${t} / -${i} uu`:i>0?`${n.playerName} -${i} uu`:`${n.playerName} +${t} uu`}function xm(n,e){const t=new Map,i=new Map,s=[];for(const a of n.frames){const r=e.ballFrames[a.frame_number]?.position;for(const o of a.players){const l=At(o.player_id),c=WT(o),u=t.get(l)??{touchCount:0,totalBallTravelDistance:0,totalBallAdvanceDistance:0,totalBallRetreatDistance:0},d=i.get(l),h=nc(c.totalBallTravelDistance,u.totalBallTravelDistance),f=nc(c.totalBallAdvanceDistance,u.totalBallAdvanceDistance),g=nc(c.totalBallRetreatDistance,u.totalBallRetreatDistance);if(d!==void 0&&r&&(h>ao||f>ao||g>ao)){const S=s[d];S&&(S.totalBallTravelDistance+=h,S.totalBallAdvanceDistance+=f,S.totalBallRetreatDistance+=g,S.endPosition={x:r.x,y:r.y,z:r.z})}const _=Math.max(0,c.touchCount-u.touchCount);if(_===0){t.set(l,c);continue}const m=o.touch?.last_touch_frame??a.frame_number,p=e.frames[m]?.time??o.touch?.last_touch_time??a.time,w=e.ballFrames[m]?.position;if(!w){t.set(l,c);continue}for(let S=0;S<_;S+=1){const v=s.length;s.push({id:`touch-stat:${m}:${l}:${c.touchCount-_+S+1}`,time:p,frame:m,isTeamZero:o.is_team_0,playerId:l,playerName:o.name,position:{x:w.x,y:w.y,z:w.z},endPosition:{x:w.x,y:w.y,z:w.z},totalBallTravelDistance:0,totalBallAdvanceDistance:0,totalBallRetreatDistance:0}),i.set(l,v)}t.set(l,c)}}return s}function XT(n,e,t){const i=Math.max(.1,t);return n.filter(s=>{const a=e-s.time;return a>=0&&a<=i})}function qT(){if(document.getElementById(_f))return;const n=document.createElement("style");n.id=_f,n.textContent=`
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
  `,document.head.append(n)}function YT(n,e,t,i){if(i.copy(n).project(e),i.z<-1||i.z>1)return!1;const s=t.clientWidth||1,a=t.clientHeight||1;return i.x=(i.x+1)*s/2,i.y=(1-i.y)*a/2,!(i.x<-100||i.x>s+100||i.y<-100||i.y>a+100)}function Sm(n){return[n.line.material,n.cone.material].flatMap(e=>Array.isArray(e)?e:[e])}function Sf(n,e){for(const t of Sm(n))t.transparent=!0,t.opacity=e,t.depthWrite=!1,t.depthTest=!1}function wf(n){n.removeFromParent(),n.line.geometry.dispose(),n.cone.geometry.dispose();for(const e of Sm(n))e.dispose()}class ZT{scene;container;group=new mt;labelRoot;projectedPosition=new L;worldPosition=new L;arrowStart=new L;arrowEnd=new L;arrowDirection=new L;labelOffset=new L(0,0,bf);markers;views=new Map;changedContainerPosition=!1;originalContainerPosition="";decaySeconds=xf;mode="markers";constructor(e,t,i,s,a){qT(),this.scene=e,this.container=t,this.decaySeconds=Math.max(.1,a?.decaySeconds??xf),this.mode=a?.mode??"markers",this.labelOffset.set(0,0,bf),this.markers=xm(s,i),getComputedStyle(t).position==="static"&&(this.changedContainerPosition=!0,this.originalContainerPosition=t.style.position,t.style.position="relative"),this.group.name="touch-event-overlay",this.scene.replayRoot.add(this.group),this.labelRoot=document.createElement("div"),this.labelRoot.className="sap-touch-overlay-root",this.container.append(this.labelRoot)}getDecaySeconds(){return this.decaySeconds}setDecaySeconds(e){this.decaySeconds=Math.max(.1,e)}getMode(){return this.mode}setMode(e){this.mode=e}update(e){const t=XT(this.markers,e,this.decaySeconds),i=new Set(t.map(s=>s.id));for(const[s,a]of this.views.entries())i.has(s)||(a.ring.removeFromParent(),a.ring.geometry.dispose(),a.material.dispose(),wf(a.arrow),a.label.remove(),this.views.delete(s));for(const s of t){const a=Math.max(0,e-s.time),r=Math.max(0,1-a/this.decaySeconds),o=this.ensureView(s),l=.1+.6*r,c=.95+(1-r)*.28;o.material.opacity=l,o.ring.position.set(s.position.x,s.position.y,s.position.z+tc),o.ring.scale.setScalar(c),o.label.textContent=$T(s,this.mode),o.label.classList.toggle("sap-touch-overlay-label-advancement",this.mode==="advancement"),this.updateArrow(o,s,l),this.worldPosition.set(s.position.x,s.position.y,s.position.z),this.worldPosition.add(this.labelOffset),this.scene.replayRoot.localToWorld(this.worldPosition),YT(this.worldPosition,this.scene.camera,this.container,this.projectedPosition)?(o.label.hidden=!1,o.label.style.opacity=`${.22+.78*r}`,o.label.style.transform=`translate(${this.projectedPosition.x.toFixed(1)}px, ${this.projectedPosition.y.toFixed(1)}px) translate(-50%, -100%)`):o.label.hidden=!0}}dispose(){for(const e of this.views.values())e.ring.removeFromParent(),e.ring.geometry.dispose(),e.material.dispose(),wf(e.arrow),e.label.remove();this.views.clear(),this.group.removeFromParent(),this.labelRoot.remove(),this.changedContainerPosition&&(this.container.style.position=this.originalContainerPosition,this.changedContainerPosition=!1)}ensureView(e){const t=this.views.get(e.id);if(t)return t;const i=new lt({color:e.isTeamZero?vf:yf,transparent:!0,opacity:.7,side:et,depthWrite:!1,depthTest:!1}),s=new ze(new cs(HT,VT,48),i);s.rotation.x=-Math.PI/2,s.renderOrder=40,this.group.add(s);const a=new Lv(new L(0,1,0),new L,1,e.isTeamZero?vf:yf,1,1);a.visible=!1,a.renderOrder=45,a.line.renderOrder=45,a.cone.renderOrder=45,Sf(a,.7),this.group.add(a);const r=document.createElement("div");r.className=`sap-touch-overlay-label ${e.isTeamZero?"sap-touch-overlay-label-blue":"sap-touch-overlay-label-orange"}`,r.textContent=e.playerName,r.hidden=!0,this.labelRoot.append(r);const o={marker:e,ring:s,material:i,arrow:a,label:r};return this.views.set(e.id,o),o}updateArrow(e,t,i){if(this.mode!=="advancement"||t.totalBallTravelDistance<=ao){e.arrow.visible=!1;return}this.arrowStart.set(t.position.x,t.position.y,t.position.z+tc*2),this.arrowEnd.set(t.endPosition.x,t.endPosition.y,t.endPosition.z+tc*2),this.arrowDirection.copy(this.arrowEnd).sub(this.arrowStart);const s=this.arrowDirection.length();if(s<GT){e.arrow.visible=!1;return}this.arrowDirection.normalize(),e.arrow.visible=!0,e.arrow.position.copy(this.arrowStart),e.arrow.setDirection(this.arrowDirection),e.arrow.setLength(s,Math.min(140,Math.max(42,s*.18)),Math.min(86,Math.max(24,s*.1))),Sf(e.arrow,Math.min(.86,i+.12))}}const Jt="#3b82f6",Qt="#f59e0b",KT="#d1d9e0",jT={air_dribble:"AD",ball_carry:"BC",ceiling_shot:"CS",double_tap:"DT",flick:"F",flip_reset:"FR",half_flip:"HF",musty_flick:"M",one_timer:"OT",pass:"P",speed_flip:"SF",wavedash:"WD"},JT=new Set(["wavedash"]);function Li(n,e,t){return n.frames[e??-1]?.time??t}function Ci(n){return n.split(/[_-]+/).filter(e=>e.length>0).map(e=>`${e.slice(0,1).toUpperCase()}${e.slice(1)}`).join(" ")}function QT(n){return jT[n]??(n.split(/[_-]+/).filter(e=>e.length>0).map(e=>e.slice(0,1).toUpperCase()).join("").slice(0,3)||"M")}function wm(n){return[...new Set((n?.events.mechanics??[]).filter(e=>Zo(e.kind)).map(e=>e.kind))].sort((e,t)=>Ci(e).localeCompare(Ci(t)))}function Zo(n){return!JT.has(n)}function Mm(n,e,t){const i=t?new Set(t):null,s=new Map(e.players.map(a=>[a.id,a.name]));return(n.events.mechanics??[]).filter(a=>Zo(a.kind)&&a.timing.type==="moment"&&(!i||i.has(a.kind))).map(a=>{const r=At(a.player_id),o=s.get(r)??r,l=Ci(a.kind);return{id:a.id,time:Li(e,a.timing.frame,a.timing.time),frame:a.timing.frame,kind:a.kind,label:`${o} ${l.toLowerCase()}`,shortLabel:QT(a.kind),playerId:r,playerName:o,isTeamZero:a.is_team_0,color:a.is_team_0?Jt:Qt}})}function Em(n,e,t){const i=[],s=new Map;for(const a of n.frames)for(const r of a.players){const o=At(r.player_id),l=t.getCount(r),c=s.get(o)??0;s.set(o,l);const u=Math.max(0,l-c);if(u===0)continue;const d=Li(e,a.frame_number,a.time);for(let h=0;h<u;h+=1){const f=l-u+h+1;i.push({id:`${t.idPrefix}:${a.frame_number}:${o}:${f}`,time:d,frame:a.frame_number,kind:t.kind,label:t.buildLabel(r),shortLabel:t.shortLabel,playerId:o,playerName:r.name,isTeamZero:r.is_team_0,color:r.is_team_0?Jt:Qt})}}return i}function e1(n){const e=new Set(n),t=new Set(["goal"]);return e.has("core")&&(t.add("save"),t.add("shot")),e.has("demo")&&t.add("demo"),[...t]}function Tm(n,e){const t=new Set(e1(e));return n.timelineEvents.filter(i=>t.has(i.kind))}function Am(n,e){return vm(n,e).map(t=>({id:t.id,time:t.time,frame:t.frame,kind:"fifty-fifty",label:t.label,shortLabel:t.label.startsWith("Kickoff 50/50")?"KO":"50",isTeamZero:t.winnerIsTeamZero,color:t.winnerIsTeamZero===null?KT:t.winnerIsTeamZero?Jt:Qt}))}function Cm(n,e){const t=[],i=new Map;for(const s of n.frames)for(const a of s.players){const r=At(a.player_id),o=a.musty_flick?.count??0,l=i.get(r)??0;i.set(r,o);const c=Math.max(0,o-l);if(c===0)continue;const u=a.musty_flick?.last_musty_frame??s.frame_number,d=e.frames[u]?.time??a.musty_flick?.last_musty_time??s.time;for(let h=0;h<c;h+=1)t.push({id:`musty-flick:${u}:${r}:${o-c+h+1}`,time:d,frame:u,kind:"musty-flick",label:`${a.name} musty flick`,shortLabel:"M",playerId:r,playerName:a.name,isTeamZero:a.is_team_0,color:a.is_team_0?Jt:Qt})}return t}function Rm(n,e){const t=[],i=new Map;for(const s of n.frames)for(const a of s.players){const r=At(a.player_id),o=a.flick?.count??0,l=i.get(r)??0;i.set(r,o);const c=Math.max(0,o-l);if(c===0)continue;const u=a.flick?.last_flick_frame??s.frame_number,d=e.frames[u]?.time??a.flick?.last_flick_time??s.time;for(let h=0;h<c;h+=1)t.push({id:`flick:${u}:${r}:${o-c+h+1}`,time:d,frame:u,kind:"flick",label:`${a.name} flick`,shortLabel:"F",playerId:r,playerName:a.name,isTeamZero:a.is_team_0,color:a.is_team_0?Jt:Qt})}return t}function Pm(n,e){return xm(n,e).map(t=>({id:t.id,time:t.time,frame:t.frame,kind:"touch",label:`${t.playerName} touch`,shortLabel:"T",playerId:t.playerId,playerName:t.playerName,isTeamZero:t.isTeamZero,color:t.isTeamZero?Jt:Qt}))}function Lm(n,e){return n.events.backboard.map((t,i)=>{const s=At(t.player),a=e.players.find(r=>r.id===s)?.name??s;return{id:`backboard:${t.frame}:${s}:${i}`,time:Li(e,t.frame,t.time),frame:t.frame,kind:"backboard",label:`${a} backboard`,shortLabel:"BB",playerId:s,playerName:a,isTeamZero:t.is_team_0,color:t.is_team_0?Jt:Qt}})}function Im(n,e){return bm(n,e).map(t=>({id:t.id,time:t.time,frame:t.frame,kind:"ceiling-shot",label:`${t.playerName} ceiling shot ${t.qualityLabel}`,shortLabel:"CS",playerId:t.playerId,playerName:t.playerName,isTeamZero:t.isTeamZero,color:t.isTeamZero?Jt:Qt}))}function Nm(n,e){return n.events.double_tap.map((t,i)=>{const s=At(t.player),a=e.players.find(r=>r.id===s)?.name??s;return{id:`double-tap:${t.frame}:${s}:${i}`,time:Li(e,t.frame,t.time),frame:t.frame,kind:"double-tap",label:`${a} double tap`,shortLabel:"DT",playerId:s,playerName:a,isTeamZero:t.is_team_0,color:t.is_team_0?Jt:Qt}})}function Dm(n,e){const t=[],i=new Map,s=new Map;for(const a of n.frames){const r=Li(e,a.frame_number,a.time);for(const o of a.players){const l=At(o.player_id),c=o.dodge_reset?.count??0,u=i.get(l)??0;i.set(l,c);const d=o.dodge_reset?.on_ball_count??0,h=s.get(l)??0;s.set(l,d);const f=Math.max(0,c-u),g=Math.min(f,Math.max(0,d-h));for(let _=0;_<f;_+=1){const m=c-f+_+1,p=_<g;t.push({id:`dodge-reset:${a.frame_number}:${l}:${m}:${p?"ball":"air"}`,time:r,frame:a.frame_number,kind:"dodge-reset",label:p?`${o.name} ball reset`:`${o.name} dodge reset`,shortLabel:p?"BR":"DR",playerId:l,playerName:o.name,isTeamZero:o.is_team_0,color:o.is_team_0?Jt:Qt})}}}return t}function Um(n,e){return Em(n,e,{kind:"ball-carry",idPrefix:"ball-carry",shortLabel:"BC",getCount:t=>t.ball_carry?.carry_count??0,buildLabel:t=>`${t.name} ball carry`})}function Fm(n,e){return Em(n,e,{kind:"powerslide",idPrefix:"powerslide",shortLabel:"PS",getCount:t=>t.powerslide?.press_count??0,buildLabel:t=>`${t.name} powerslide`})}function Om(n,e){return n.events.speed_flip.map(t=>{const i=t.player?At(t.player):null,s=i?e.players.find(o=>o.id===i)?.name??i:"Unknown",a=e.frames[t.frame]?.time??t.time,r=Math.round(t.confidence*100);return{id:`speed-flip:${t.frame}:${i}:${Math.round(t.confidence*1e3)}`,time:a,frame:t.frame,kind:"speed-flip",label:`${s} speed flip ${r}%`,shortLabel:"SF",playerId:i,playerName:s,isTeamZero:t.is_team_0,color:t.is_team_0?Jt:Qt}})}function km(n,e){return n.events.half_flip.map((t,i)=>{const s=At(t.player),a=e.players.find(c=>c.id===s)?.name??s,r=Li(e,t.frame,t.time),o=Math.round(t.confidence*100),l=Math.round(t.end_speed-t.start_speed);return{id:`half-flip:${t.frame}:${s}:${i}`,time:r,frame:t.frame,kind:"half-flip",label:`${a} half flip ${o}% | +${l}uu/s`,shortLabel:"HF",playerId:s,playerName:a,isTeamZero:t.is_team_0,color:t.is_team_0?Jt:Qt}})}function Bm(n,e){return n.events.wavedash.map((t,i)=>{const s=At(t.player),a=e.players.find(c=>c.id===s)?.name??s,r=Li(e,t.frame,t.time),o=Math.round(t.confidence*100),l=Math.round(t.horizontal_speed_gain);return{id:`wavedash:${t.frame}:${s}:${i}`,time:r,frame:t.frame,kind:"wavedash",label:`${a} wavedash ${o}% | +${l}uu/s`,shortLabel:"WD",playerId:s,playerName:a,isTeamZero:t.is_team_0,color:t.is_team_0?Jt:Qt}})}function t1(n){return n.dodge_active?"DW":n.aerial?"AW":"W"}function n1(n){const e=[n.aerial?"aerial":"grounded"];return n.dodge_active&&e.push("dodge"),e.join(" ")}function zm(n,e){return n.events.whiff.map((t,i)=>{const s=At(t.player),a=e.players.find(c=>c.id===s)?.name??s,r=Li(e,t.frame,t.time),o=Math.round(t.closest_approach_distance),l=Math.round(t.approach_speed);return{id:`whiff:${t.frame}:${s}:${i}`,time:r,frame:t.frame,kind:"whiff",label:`${a} ${n1(t)} whiff | ${o}uu closest, ${l}uu/s`,shortLabel:t1(t),playerId:s,playerName:a,isTeamZero:t.is_team_0,color:t.is_team_0?Jt:Qt}})}function i1(n,e,t){const i=new Set(n);let s=Tm(e,i).length;return i.has("fifty-fifty")&&(s+=Am(t,e).length),i.has("musty-flick")&&(s+=Cm(t,e).length),i.has("flick")&&(s+=Rm(t,e).length),i.has("backboard")&&(s+=Lm(t,e).length),i.has("ceiling-shot")&&(s+=Im(t,e).length),i.has("double-tap")&&(s+=Nm(t,e).length),i.has("touch")&&(s+=Pm(t,e).length),i.has("dodge-reset")&&(s+=Dm(t,e).length),i.has("ball-carry")&&(s+=Um(t,e).length),i.has("powerslide")&&(s+=Fm(t,e).length),i.has("speed-flip")&&(s+=Om(t,e).length),i.has("half-flip")&&(s+=km(t,e).length),i.has("wavedash")&&(s+=Bm(t,e).length),i.has("whiff")&&(s+=zm(t,e).length),s}const Hm=.02,Cn=1e-4,s1=200,Vm=.08,a1="#3b82f6",r1="#f59e0b",uu={big:"rgba(245, 158, 11, 0.92)",small:"rgba(52, 211, 153, 0.86)"},Mf={both:"rgba(52, 211, 153, 0.86)",ghost:"rgba(239, 68, 68, 0.9)",missed:"rgba(59, 130, 246, 0.9)"},o1={air_dribble:"AD",ball_carry:"BC",ceiling_shot:"CS",double_tap:"DT",flick:"F",half_flip:"HF",musty_flick:"M",one_timer:"OT",pass:"P",wavedash:"WD"};function l1(n){const e=n.config?.pressure_neutral_zone_half_width_y;return typeof e=="number"&&Number.isFinite(e)?Math.max(0,e):s1}function Ao(n,e,t){return n?.frames?.[e??-1]?.time??t}function dd(n){return n===!0?a1:n===!1?r1:null}function c1(n){return o1[n]??(n.split(/[_-]+/).filter(e=>e.length>0).map(e=>e.slice(0,1).toUpperCase()).join("").slice(0,3)||"M")}function Gm(n,e,t){const i=t?new Set(t):null,s=new Map(e.players.map(a=>[a.id,a.name]));return(n.events.mechanics??[]).filter(a=>Zo(a.kind)&&a.timing.type==="span"&&(!i||i.has(a.kind))).map(a=>{if(a.timing.type!=="span")throw new Error("unreachable non-span mechanic event");const r=du(a.player_id),o=s.get(r)??r,l=Ci(a.kind),c=Ao(e,a.timing.start_frame,a.timing.start_time),u=Math.max(c,Ao(e,a.timing.end_frame,a.timing.end_time));return{id:a.id,startTime:c,endTime:u,lane:`mechanic:${a.kind}`,laneLabel:l,label:`${o} ${l.toLowerCase()}`,shortLabel:c1(a.kind),isTeamZero:a.is_team_0,color:dd(a.is_team_0)??void 0}}).sort((a,r)=>a.startTime!==r.startTime?a.startTime-r.startTime:(a.id??"").localeCompare(r.id??""))}function u1(n,e,t,i,s,a){const r=e?.ballFrames[n]?.position?.y;return typeof r=="number"&&Number.isFinite(r)&&Math.abs(r)<=t+Cn||a>Cn?"neutral":i>s+Cn?"team_zero_side":s>i+Cn?"team_one_side":null}function d1(n,e,t){if(n==="neutral")return{id:`half-control:neutral:${e.toFixed(3)}`,startTime:e,endTime:t,lane:"half-control",laneLabel:"Half Control",label:"Neutral half control",color:"rgba(209, 217, 224, 0.7)",isTeamZero:null};const i=n==="team_zero_side";return{id:`half-control:${n}:${e.toFixed(3)}`,startTime:e,endTime:t,lane:"half-control",laneLabel:"Half Control",label:i?"Blue half control":"Orange half control",color:i?"rgba(89, 195, 255, 0.76)":"rgba(255, 193, 92, 0.76)",isTeamZero:i}}function h1(n,e){const t=[];let i=0,s=0,a=0,r=null;for(const o of n.frames){if(!Number.isFinite(o.time)||!Number.isFinite(o.dt)||o.dt<=0){r=o;continue}const l=o.team_zero?.possession?.possession_time??0,c=o.team_one?.possession?.possession_time??0,u=o.team_zero?.possession?.neutral_time??0,d=l-i,h=c-s,f=u-a;i=l,s=c,a=u;let g=null;const{startTime:_,endTime:m}=hd(o,r,e);d>h+Cn&&d>f+Cn?g={id:`possession:team_zero:${_.toFixed(3)}`,startTime:_,endTime:m,lane:"possession",laneLabel:"Possession",label:"Blue possession",color:"rgba(59, 130, 246, 0.88)",isTeamZero:!0}:h>d+Cn&&h>f+Cn?g={id:`possession:team_one:${_.toFixed(3)}`,startTime:_,endTime:m,lane:"possession",laneLabel:"Possession",label:"Orange possession",color:"rgba(245, 158, 11, 0.88)",isTeamZero:!1}:f>Cn&&(g={id:`possession:neutral:${_.toFixed(3)}`,startTime:_,endTime:m,lane:"possession",laneLabel:"Possession",label:"Neutral possession",color:"rgba(209, 217, 224, 0.7)",isTeamZero:null}),$m(t,g),r=o}return t}function f1(n,e){const t=[];let i=0,s=0,a=0;const r=l1(n);let o=null;for(const l of n.frames){if(!Number.isFinite(l.time)||!Number.isFinite(l.dt)||l.dt<=0){o=l;continue}const c=l.team_zero?.pressure?.defensive_half_time??0,u=l.team_one?.pressure?.defensive_half_time??0,d=l.team_zero?.pressure?.neutral_time??0,h=c-i,f=u-s,g=d-a;i=c,s=u,a=d;const{startTime:_,endTime:m}=hd(l,o,e),p=u1(l.frame_number,e,r,h,f,g),w=p?d1(p,_,m):null;$m(t,w),o=l}return t}function p1(n,e){return n.events.rush.map((t,i)=>{const s=e?.frames[t.start_frame]?.time??t.start_time,a=e?.frames[t.end_frame]?.time??t.end_time,r=`${t.attackers}v${t.defenders}`,o=t.is_team_0;return{id:`rush-range:${t.start_frame}:${t.end_frame}:${i}`,startTime:s,endTime:Math.max(s,a),lane:"rush",laneLabel:"Rush",label:`${o?"Blue":"Orange"} rush ${r}`,color:o?"rgba(59, 130, 246, 0.4)":"rgba(245, 158, 11, 0.4)",isTeamZero:o}})}function m1(n,e={}){const t=Wm(e),i=new Set(e.comparisons??["both"]),s=new Set(e.activities??["active","inactive","unknown"]),a=new Set(e.fieldHalves??["own","opponent","unknown"]),r=e.playerIds?new Set(e.playerIds):null;if(t.size===0||!i.has("both")||!s.has("unknown")||!a.has("unknown")||r?.size===0)return[];const o=new Map(n.players.map(c=>[c.id,c.isTeamZero])),l=[];for(const c of n.boostPads)if(t.has(c.size))for(let u=0;u<c.events.length;u+=1){const d=c.events[u];if(d.available||!Number.isFinite(d.time)||r&&!d.playerId||d.playerId&&r&&!r.has(d.playerId))continue;const h=Math.max(0,Ao(n,d.frame,d.time)),f=c.size==="big"?"Big":"Small",g=d.playerName?`${d.playerName} `:"",_=d.playerId?o.get(d.playerId)??null:null;l.push({id:`boost-pickup:${c.index}:${d.frame}:${u}`,startTime:h,endTime:Math.max(h+Vm,h),lane:"boost-pickups",laneLabel:"Boost Pickups",label:`${g}picked up ${f.toLowerCase()} boost pad ${c.index}`,shortLabel:c.size==="big"?"100":"12",color:dd(_)??uu[c.size],isTeamZero:_})}return l.sort((c,u)=>c.startTime!==u.startTime?c.startTime-u.startTime:(c.id??"").localeCompare(u.id??""))}function Wm(n){if(n.padTypes)return new Set(n.padTypes);if(n.sizes){const e=new Set(n.sizes),t=new Set;return e.has("big")&&t.add("big"),e.has("small")&&t.add("small"),e.has("big")&&e.has("small")&&t.add("ambiguous"),t}return new Set(["big","small","ambiguous"])}function du(n){const[e,t]=Object.entries(n)[0]??["Unknown","unknown"],i=typeof t=="string"?t:JSON.stringify(t);return`${e}:${i}`}function g1(n){return{big:"big",small:"small",ambiguous:"ambiguous"}[n]}function _1(n){return{both:"counted",ghost:"ghost",missed:"missed"}[n]}function v1(n,e){return n==="ghost"?"G":n==="missed"?"M":{big:"100",small:"12",ambiguous:"?"}[e]}function y1(n,e,t={}){const i=n.events?.boost_pickups??[];if(i.length===0&&e)return m1(e,t);const s=Wm(t),a=new Set(t.comparisons??["both"]),r=new Set(t.activities??["active","inactive","unknown"]),o=new Set(t.fieldHalves??["own","opponent","unknown"]),l=t.playerIds?new Set(t.playerIds):null;if(s.size===0||a.size===0||r.size===0||o.size===0||l?.size===0)return[];const c=new Map((e?.players??[]).map(u=>[u.id,u.name]));return i.filter(u=>{const d=du(u.player_id);return s.has(u.pad_type)&&a.has(u.comparison)&&r.has(u.activity)&&o.has(u.field_half)&&(!l||l.has(d))}).map((u,d)=>{const h=du(u.player_id),f=c.get(h)??h,g=Math.max(0,Ao(e,u.frame,u.time)),_=_1(u.comparison),m=g1(u.pad_type);return{id:`boost-pickup:${u.comparison}:${u.frame}:${h}:${d}`,startTime:g,endTime:Math.max(g+Vm,g),lane:"boost-pickups",laneLabel:"Boost Pickups",label:`${f} ${_} ${m} boost pickup`,shortLabel:v1(u.comparison,u.pad_type),color:dd(u.is_team_0)??(u.comparison==="both"?u.pad_type==="big"?uu.big:u.pad_type==="small"?uu.small:Mf.both:Mf[u.comparison]),isTeamZero:u.is_team_0}}).sort((u,d)=>u.startTime!==d.startTime?u.startTime-d.startTime:(u.id??"").localeCompare(d.id??""))}const b1=[{fieldName:"time_defensive_third",aliases:["time_defensive_zone"],label:"Def third",relativeColor:"own"},{fieldName:"time_neutral_third",aliases:["time_neutral_zone"],label:"Neutral third",relativeColor:"neutral"},{fieldName:"time_offensive_third",aliases:["time_offensive_zone"],label:"Off third",relativeColor:"opp"}];function x1(n,e){return n.relativeColor==="neutral"?"rgba(209, 217, 224, 0.68)":(n.relativeColor==="own"?e:!e)?"rgba(89, 195, 255, 0.74)":"rgba(255, 193, 92, 0.78)"}function S1(n){const[e,t]=Object.entries(n)[0]??["Unknown","unknown"],i=typeof t=="string"?t:JSON.stringify(t);return`${e}:${i}`}function w1(n,e){const t=n.positioning;if(!t)return 0;for(const i of[e.fieldName,...e.aliases??[]]){const s=t[i];if(typeof s=="number"&&Number.isFinite(s))return s}return 0}function M1(n,e){const t=new Map,i=[],s=new Map;let a=null;for(const r of n.frames){if(!Number.isFinite(r.time)||!Number.isFinite(r.dt)||r.dt<=0){a=r;continue}const{startTime:o,endTime:l}=hd(r,a,e);if(l-o<=Cn){a=r;continue}for(const c of r.players){const u=S1(c.player_id),d=t.get(u)??new Map;let h=null,f=0;for(const g of b1){const _=w1(c,g),m=_-(d.get(g.fieldName)??0);m>f+Cn&&(f=m,h=g),d.set(g.fieldName,_)}t.set(u,d),h&&E1(i,s,{id:`time-in-zone:${u}:${h.fieldName}:${o.toFixed(3)}`,startTime:o,endTime:l,lane:`time-in-zone:${u}`,laneLabel:c.name,label:h.label,color:x1(h,c.is_team_0),isTeamZero:c.is_team_0})}a=r}return i}function hd(n,e,t){const i=t?.frames[n.frame_number]?.time??n.time,s=e?t?.frames[e.frame_number]?.time??e.time:Math.max(0,i-n.dt);return{startTime:Math.max(0,s),endTime:Math.max(s,i)}}function $m(n,e){if(!e)return;const t=n[n.length-1];if(t&&t.lane===e.lane&&t.label===e.label&&Math.abs(t.endTime-e.startTime)<=Hm){t.endTime=e.endTime;return}n.push(e)}function E1(n,e,t){if(!t)return;const i=t.lane??"",s=e.get(i);if(s&&s.label===t.label&&Math.abs(s.endTime-t.startTime)<=Hm){s.endTime=t.endTime;return}n.push(t),e.set(i,t)}function T1(n){return new Map(n.frames.map(e=>[e.frame_number,e]))}function wt(n,e){return n.get(e)??null}const ic=236,Xm="relative-positioning",A1={last:"Last",upfield:"Upfield",level:"Level",mid:"Mid"};function na(n){return n?"team-blue":"team-orange"}function qm(n,e,t){return`<div class="player-card ${t.tone==="shared"?"shared":t.tone==="blue"?"team-blue":"team-orange"}">
    <div class="player-card-header">
      <span class="player-name">${n}</span>
      ${t.metaHtml??""}
    </div>
    ${e}
  </div>`}function qt(n,e,t,i=""){return qm(n,t,{metaHtml:i,tone:e?"blue":"orange"})}function ln(n,e){return`<div class="player-team-stack">${[!0,!1].map(t=>{const i=n.filter(a=>a.is_team_0===t);if(i.length===0)return"";const s=t?"Blue":"Orange";return`<section class="player-team-group ${na(t)}">
        <div class="player-team-header">
          <h3>${s} team</h3>
          <span>${i.length} player${i.length===1?"":"s"}</span>
        </div>
        <div class="player-stats-grid">
          ${i.map(e).join("")}
        </div>
      </section>`}).join("")}</div>`}function fd(n,e,t=""){return qm(n,e,{metaHtml:t,tone:"shared"})}function zt(n,e,t){const i=wt(n.statsFrameLookup,e);return i?i.players.find(s=>At(s.player_id)===t)??null:null}function C1(n,e,t){const i=n.players.find(g=>g.id===e);if(!i||!i.frames[t]?.position)return"mid";const a=i.isTeamZero,r=n.players.filter(g=>g.isTeamZero===a).length,o=[];let l=0;for(const g of n.players){if(g.isTeamZero!==a)continue;const _=g.frames[t];if(!_?.position)continue;const m=a?_.position.y:-_.position.y;o.push(m),g.id===e&&(l=m)}if(r<2||o.length!==r)return"mid";const c=Math.min(...o),u=Math.max(...o);if(u-c<=ic)return"level";const h=l-c<=ic,f=u-l<=ic;return h&&!f?"last":f&&!h?"upfield":"mid"}function R1(n){let e=null,t=null;const i=new Set,s=["possession_state","field_third"];return{id:"possession",label:"Possession",setup(){a()},teardown(){},onBeforeRender(){},getTimelineRanges(o){return h1(o.statsTimeline,o.replay)},getConfig(){return{breakdownClasses:r()}},applyConfig(o){if(i.clear(),o&&typeof o=="object"&&!Array.isArray(o)){const l=o.breakdownClasses;if(Array.isArray(l))for(const c of l)s.includes(c)&&i.add(c)}a(),n.rerenderCurrentState()},renderStats(o,l){const u=wt(l.statsFrameLookup,o)?.team_zero?.possession;return u?fd("Control State",df(u,{labelPerspective:{kind:"shared"},breakdownClasses:r()})):""},renderFocusedPlayerStats(o,l,c){const u=wt(c.statsFrameLookup,l),d=zt(c,l,o),h=d?.is_team_0?u?.team_zero?.possession:u?.team_one?.possession;return!h||!d?"":df(h,{labelPerspective:{kind:"team"},breakdownClasses:r()})},renderSettings(){if(!e){e=document.createElement("div"),e.className="module-settings-card";const o=document.createElement("div");o.className="module-settings-header";const l=document.createElement("div"),c=document.createElement("p");c.className="module-settings-eyebrow",c.textContent="Stat display";const u=document.createElement("h3");u.textContent="Possession breakdown",l.append(c,u),t=document.createElement("strong"),t.className="metric-readout",o.append(l,t);const d=document.createElement("div");d.className="module-settings-options";const h=document.createElement("label");h.className="toggle";const f=document.createElement("input");f.type="checkbox",f.dataset.breakdownClass="possession_state",f.addEventListener("change",()=>{f.checked?i.add("possession_state"):i.delete("possession_state"),a(),n.rerenderCurrentState(),n.requestConfigSync?.()});const g=document.createElement("span");g.textContent="Control",h.append(f,g),d.append(h);const _=document.createElement("label");_.className="toggle";const m=document.createElement("input");m.type="checkbox",m.dataset.breakdownClass="field_third",m.addEventListener("change",()=>{m.checked?i.add("field_third"):i.delete("field_third"),a(),n.rerenderCurrentState(),n.requestConfigSync?.()});const p=document.createElement("span");p.textContent="Third",_.append(m,p),d.append(_),e.append(o,d)}return a(),e}};function a(){if(e){for(const o of e.querySelectorAll("input[data-breakdown-class]")){const l=o.dataset.breakdownClass;o.checked=l?i.has(l):!1}if(t){const o=s.filter(l=>i.has(l));t.textContent=o.length===0?"Total only":o.map(l=>l==="possession_state"?"Control":"Third").join(" x ")}}}function r(){return s.filter(o=>i.has(o))}}function P1(){let n=null;return{id:"fifty-fifty",label:"50/50",setup(e){n=new CT(e.player.sceneState,e.player.container,e.replay,e.statsTimeline)},teardown(){n?.dispose(),n=null},onBeforeRender(e){n?.update(e.currentTime)},getTimelineEvents(e){return Am(e.statsTimeline,e.replay)},renderStats(e,t){const i=wt(t.statsFrameLookup,e);if(!i)return"";const s=fd("Challenge Summary",aT(i.team_zero?.fifty_fifty)),a=ln(i.players,r=>qt(r.name,r.is_team_0,lf(r.fifty_fifty)));return s+a},renderFocusedPlayerStats(e,t,i){const s=zt(i,t,e);return s?lf(s.fifty_fifty):""}}}function L1(){let n=null,e=null;return{id:"pressure",label:"Half Control",setup(t){e=t.replay,n=new iT(t.player.sceneState.scene,t.fieldScale)},teardown(){n?.dispose(),n=null,e=null},onBeforeRender(t){const i=e?.ballFrames[t.frameIndex];n?.update(i?.position?.y??null)},getTimelineRanges(t){return f1(t.statsTimeline,t.replay)},renderStats(t,i){const a=wt(i.statsFrameLookup,t)?.team_zero?.pressure;return a?fd("Field State",ff(a,{labelPerspective:{kind:"shared"}})):""},renderFocusedPlayerStats(t,i,s){const a=wt(s.statsFrameLookup,i),r=zt(s,i,t),o=r?.is_team_0?a?.team_zero?.pressure:a?.team_one?.pressure;return!o||!r?"":ff(o,{labelPerspective:{kind:"team"}})}}}function I1(){return{id:"rush",label:"Rush",setup(){},teardown(){},onBeforeRender(){},getTimelineRanges(n){return p1(n.statsTimeline,n.replay)},renderStats(n,e){const t=wt(e.statsFrameLookup,n),i=t?.team_zero?.rush,s=t?.team_one?.rush;return!i||!s?"":[qt("Blue Team",!0,ec(i)),qt("Orange Team",!1,ec(s))].join("")},renderFocusedPlayerStats(n,e,t){const i=wt(t.statsFrameLookup,e),s=zt(t,e,n),a=s?.is_team_0?i?.team_zero?.rush:i?.team_one?.rush;return!a||!s?"":ec(a)}}}const hu={speed_band:{valueOrder:["slow","boost","supersonic"],formatValue:n=>({slow:"Slow",boost:"Boost",supersonic:"Supersonic"})[n]??n},height_band:{valueOrder:["ground","low_air","high_air"],formatValue:n=>({ground:"Ground",low_air:"Low air",high_air:"High air"})[n]??n}};function N1(n){const e=new Set,t=[];for(const i of n??[])e.has(i)||(e.add(i),t.push(i));return t}function sc(n,e=1,t=""){return n===void 0||Number.isNaN(n)?"?":`${n.toFixed(e)}${t}`}function D1(n,e,t=1){return n===void 0||Number.isNaN(n)?"?":e===void 0||Number.isNaN(e)||e<=0?`${n.toFixed(t)}s`:`${n.toFixed(t)}s (${(n*100/e).toFixed(t)}%)`}function Ef(n){return n.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function ro(n,e){return`<div class="stat-row"><span class="label">${Ef(n)}</span><span class="value">${Ef(e)}</span></div>`}function U1(n,e,t){for(const i of t){const{valueOrder:s}=hu[i],a=s.indexOf(n[i]),r=s.indexOf(e[i]),o=a===-1?Number.MAX_SAFE_INTEGER:a,l=r===-1?Number.MAX_SAFE_INTEGER:r;if(o!==l)return o-l}return 0}function F1(n,e){if(e.length===1){const t=e[0];return hu[t].formatValue(n[t])}return e.map(t=>hu[t].formatValue(n[t])).join(" / ")}function O1(n,e,t){if(e.length===0||!n?.labeled_tracked_time?.entries?.length)return"";const i=new Map,s=n?.labeled_tracked_time?.entries??[];for(const a of s){const r=new Map(a.labels.map(d=>[d.key,d.value])),o={};let l=!0;for(const d of e){const h=r.get(d);if(h===void 0){l=!1;break}o[d]=h}if(!l)continue;const c=e.map(d=>`${d}:${o[d]}`).join("|"),u=i.get(c);u?u.total+=a.value:i.set(c,{values:o,total:a.value})}return[...i.values()].sort((a,r)=>U1(a.values,r.values,e)).map(a=>ro(F1(a.values,e),D1(a.total,t))).join("")}function Tf(n,e={}){const t=n?.tracked_time,i=n&&t&&t>0?n.speed_integral/t:t===0?0:void 0,s=N1(e.breakdownClasses),a=O1(n,s,t);return`
    ${ro("Tracked",sc(t,1,"s"))}
    ${ro("Distance",sc(n?.total_distance,0," uu"))}
    ${ro("Avg speed",sc(i,0," uu/s"))}
    ${a}
  `}const fu={kind:{label:"Kind",valueOrder:["dribble","control","medium_hit","hard_hit"],formatValue:n=>({dribble:"Dribble",control:"Control",medium_hit:"Medium",hard_hit:"Hard"})[n]??n},height_band:{label:"Height",valueOrder:["ground","low_air","high_air"],formatValue:n=>({ground:"Ground",low_air:"Low air",high_air:"High air"})[n]??n}};function k1(n){const e=new Set,t=[];for(const i of n??[])e.has(i)||(e.add(i),t.push(i));return t}function Qn(n){return n===void 0||Number.isNaN(n)?"?":`${Math.round(n)}`}function ac(n,e=0,t=""){return n===void 0||!Number.isFinite(n)?"?":`${n.toFixed(e)}${t}`}function Af(n){return n.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function hn(n,e){return`<div class="stat-row"><span class="label">${Af(n)}</span><span class="value">${Af(e)}</span></div>`}function B1(n,e,t){for(const i of t){const{valueOrder:s}=fu[i],a=s.indexOf(n[i]),r=s.indexOf(e[i]),o=a===-1?Number.MAX_SAFE_INTEGER:a,l=r===-1?Number.MAX_SAFE_INTEGER:r;if(o!==l)return o-l}return 0}function z1(n,e){if(e.length===1){const t=e[0];return fu[t].formatValue(n[t])}return e.map(t=>fu[t].formatValue(n[t])).join(" / ")}function H1(n){return(n?.labeled_touch_counts?.entries??[]).map(e=>({labels:e.labels,count:e.count}))}function V1(n,e){if(e.length===0||n.length===0)return"";const t=new Map;for(const i of n){const s=new Map(i.labels.map(c=>[c.key,c.value])),a={};let r=!0;for(const c of e){const u=s.get(c);if(u===void 0){r=!1;break}a[c]=u}if(!r)continue;const o=e.map(c=>`${c}:${a[c]}`).join("|"),l=t.get(o);l?l.count+=i.count:t.set(o,{values:a,count:i.count})}return[...t.values()].sort((i,s)=>B1(i.values,s.values,e)).map(i=>hn(z1(i.values,e),Qn(i.count))).join("")}function G1(n,e){if(!n||e.length!==1)return"";const[t]=e;if(t==="kind")return[hn("Dribble",Qn(n.dribble_touch_count)),hn("Control",Qn(n.control_touch_count)),hn("Medium",Qn(n.medium_hit_count)),hn("Hard",Qn(n.hard_hit_count))].join("");if(t==="height_band"){const i=n.high_aerial_touch_count??0,s=(n.aerial_touch_count??0)-i,a=(n.touch_count??0)-(n.aerial_touch_count??0);return[hn("Ground",Qn(a)),hn("Low air",Qn(s)),hn("High air",Qn(i))].join("")}return""}function Cf(n,e={}){const t=k1(e.breakdownClasses),i=H1(n),s=V1(i,t)||G1(n,t);return`
    ${hn("Touches",Qn(n?.touch_count))}
    ${hn("Ball advanced",ac(n?.total_ball_advance_distance,0," uu"))}
    ${hn("Ball traveled",ac(n?.total_ball_travel_distance,0," uu"))}
    ${hn("Ball retreated",ac(n?.total_ball_retreat_distance,0," uu"))}
    ${s}
  `}const Rf="subtr-actor-speed-flip-overlay-styles",W1=5882879,$1=16761180,X1=16185075,q1=150,Y1=230,Z1=220,K1=4;function Ym(n){if(!n)return null;const[e,t]=Object.entries(n)[0]??["Unknown","unknown"],i=typeof t=="string"?t:JSON.stringify(t);return`${e}:${i}`}function j1(n,e){const t=Ym(e);return t?n.players.find(i=>i.id===t)?.name??t:"Unknown"}function J1(n,e){return n.events.speed_flip.map(t=>{const i=j1(e,t.player),s=Ym(t.player),a=e.frames[t.frame]?.time??t.time,r=t.confidence;return{id:`speed-flip:${t.frame}:${s}:${Math.round(r*1e3)}`,time:a,frame:t.frame,isTeamZero:t.is_team_0,playerId:s,playerName:i,position:{x:t.start_position[0],y:t.start_position[1],z:t.start_position[2]},quality:r,qualityLabel:`${Math.round(r*100)}%`}})}function Q1(n,e,t){const i=Math.max(.1,t);return n.filter(s=>{const a=e-s.time;return a>=0&&a<=i})}function eA(){if(document.getElementById(Rf))return;const n=document.createElement("style");n.id=Rf,n.textContent=`
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
  `,document.head.append(n)}function tA(n,e,t,i){if(i.copy(n).project(e),i.z<-1||i.z>1)return!1;const s=t.clientWidth||1,a=t.clientHeight||1;return i.x=(i.x+1)*s/2,i.y=(1-i.y)*a/2,!(i.x<-100||i.x>s+100||i.y<-100||i.y>a+100)}class nA{scene;container;group=new mt;labelRoot;projectedPosition=new L;worldPosition=new L;labelOffset=new L(0,0,Z1);markers;views=new Map;changedContainerPosition=!1;originalContainerPosition="";decaySeconds=K1;constructor(e,t,i,s){eA(),this.scene=e,this.container=t,this.markers=J1(s,i),getComputedStyle(t).position==="static"&&(this.changedContainerPosition=!0,this.originalContainerPosition=t.style.position,t.style.position="relative"),this.group.name="speed-flip-overlay",this.scene.replayRoot.add(this.group),this.labelRoot=document.createElement("div"),this.labelRoot.className="sap-speed-flip-overlay-root",this.container.append(this.labelRoot)}update(e){const t=Q1(this.markers,e,this.decaySeconds),i=new Set(t.map(s=>s.id));for(const[s,a]of this.views.entries())i.has(s)||(a.ring.removeFromParent(),a.ring.geometry.dispose(),a.material.dispose(),a.label.remove(),this.views.delete(s));for(const s of t){const a=Math.max(0,e-s.time),r=Math.max(0,1-a/this.decaySeconds),o=this.ensureView(s),l=.16+.56*r,c=.96+(1-r)*.22;o.material.opacity=l,o.ring.position.set(s.position.x,s.position.y,s.position.z+14),o.ring.scale.setScalar(c+s.quality*.08),this.worldPosition.set(s.position.x,s.position.y,s.position.z).add(this.labelOffset);const u=tA(this.worldPosition,this.scene.camera,this.container,this.projectedPosition);o.label.style.display=u?"block":"none",u&&(o.label.style.left=`${this.projectedPosition.x}px`,o.label.style.top=`${this.projectedPosition.y}px`,o.label.style.opacity=`${.42+.58*r}`)}}dispose(){for(const e of this.views.values())e.ring.removeFromParent(),e.ring.geometry.dispose(),e.material.dispose(),e.label.remove();this.views.clear(),this.group.removeFromParent(),this.labelRoot.remove(),this.changedContainerPosition&&(this.container.style.position=this.originalContainerPosition)}ensureView(e){const t=this.views.get(e.id);if(t)return t;const i=new lt({color:e.quality>=.75?X1:e.isTeamZero?W1:$1,transparent:!0,opacity:.8,side:et,depthWrite:!1,depthTest:!1}),s=new cs(q1,Y1,48),a=new ze(s,i);a.renderOrder=30,this.group.add(a);const r=document.createElement("div");r.className=`sap-speed-flip-overlay-label ${e.isTeamZero?"sap-speed-flip-overlay-label-blue":"sap-speed-flip-overlay-label-orange"}`,r.textContent=`${e.playerName} speed flip ${e.qualityLabel}`,this.labelRoot.append(r);const o={marker:e,ring:a,material:i,label:r};return this.views.set(e.id,o),o}}const Wr=[{value:"big",label:"Big pads"},{value:"small",label:"Small pads"},{value:"ambiguous",label:"Ambiguous pads"}],rc=[{value:"both",label:"Pickup events"}],$r=[{value:"active",label:"Active play"},{value:"inactive",label:"Inactive play"},{value:"unknown",label:"Unknown activity"}],Xr=[{value:"own",label:"Own half"},{value:"opponent",label:"Opponent half"},{value:"unknown",label:"Unknown half"}];function iA(n,e){return n===e||n==="ambiguous"}function sA(n,e){const t=e?.events.boost_pickups??[];return t.length===0?null:t.find(i=>{const s=At(i.player_id),a=i.reported_frame??i.frame;return s===n.player.id&&i.comparison==="both"&&a===n.event.frame&&iA(i.pad_type,n.pad.size)})??null}function Zm(n={}){let e=null,t=null,i=null,s=null,a=null,r=null;const o=new Set(Wr.map(E=>E.value)),l=new Set(rc.map(E=>E.value)),c=new Set($r.map(E=>E.value)),u=new Set(Xr.map(E=>E.value));let d=null,h=!1;function f(E,A,y,b){const C=document.createElement("div");C.className="boost-pickup-filter-group";const N=document.createElement("p");N.className="module-settings-group-title",N.textContent=E;const z=document.createElement("div");z.className="boost-pickup-filter-options";for(const V of A){const G=document.createElement("label");G.className="toggle";const B=document.createElement("input");B.type="checkbox",B.dataset.boostPickupFilter=b,B.dataset.boostPickupValue=V.value,B.addEventListener("change",()=>{B.checked?y.add(V.value):y.delete(V.value),m(a),n.refreshTimelineRanges?.(),n.rerenderCurrentState?.(),n.requestConfigSync?.()});const U=document.createElement("span");U.textContent=V.label,G.append(B,U),z.append(G)}return C.append(N,z),C}function g(){const E=document.createElement("div");E.className="boost-pickup-filter-group boost-pickup-filter-group-wide",i=E;const A=document.createElement("p");return A.className="module-settings-group-title",A.textContent="Player",s=document.createElement("div"),s.className="boost-pickup-filter-options",E.append(A,s),E}function _(E){if(s&&(s.replaceChildren(),i&&(i.hidden=!E||E.players.length===0),!!E))for(const A of E.players){const y=document.createElement("label");y.className="toggle";const b=document.createElement("input");b.type="checkbox",b.dataset.boostPickupPlayerId=A.id,b.addEventListener("change",()=>{d||(d=new Set(E.players.map(N=>N.id))),b.checked?d.add(A.id):d.delete(A.id),m(E),n.refreshTimelineRanges?.(),n.rerenderCurrentState?.(),n.requestConfigSync?.()});const C=document.createElement("span");C.textContent=`${A.name} (${A.isTeamZero?"Blue":"Orange"})`,y.append(b,C),s.append(y)}}function m(E){if(e){for(const A of e.querySelectorAll("input[data-boost-pickup-filter][data-boost-pickup-value]")){const y=A.dataset.boostPickupFilter,b=A.dataset.boostPickupValue;A.checked=p(y,b)}for(const A of e.querySelectorAll("input[data-boost-pickup-player-id]")){const y=A.dataset.boostPickupPlayerId;A.checked=y?d?.has(y)??!0:!1}t&&(t.textContent=w(E))}}function p(E,A){if(!A)return!1;switch(E){case"pad-type":return o.has(A);case"comparison":return l.has(A);case"activity":return c.has(A);case"field-half":return u.has(A);default:return!1}}function w(E){const A=E?.players.length??0,y=d?d.size:A;if(o.size===0||l.size===0||c.size===0||u.size===0||d!==null&&d.size===0)return"Hidden";const C=[o.size<Wr.length,l.size<rc.length,c.size<$r.length,u.size<Xr.length,d!==null&&y<A].filter(Boolean).length;return C===0?"All labels":`${C} filters`}function S(E){if(d&&!d.has(E.player.id))return!1;if((r?.events.boost_pickups??[]).length===0)return o.has(E.pad.size)&&l.has("both")&&c.has("unknown")&&u.has("unknown");const A=sA(E,r);return A?o.has(A.pad_type)&&l.has(A.comparison)&&c.has(A.activity)&&u.has(A.field_half):!1}function v(E,A,y){if(E.clear(),!Array.isArray(y)){for(const C of A)E.add(C.value);return}const b=new Set(A.map(C=>C.value));for(const C of y)typeof C=="string"&&b.has(C)&&E.add(C)}function R(){return{padTypes:[...o],comparisons:[...l],activities:[...c],fieldHalves:[...u],playerIds:d?[...d]:null}}function T(E){if(!E||typeof E!="object"||Array.isArray(E))return;const A=E;v(o,Wr,A.padTypes),v(l,rc,A.comparisons),v(c,$r,A.activities),v(u,Xr,A.fieldHalves),d=Array.isArray(A.playerIds)?new Set(A.playerIds.filter(y=>typeof y=="string")):null,h=a===null&&d!==null,m(a),n.refreshTimelineRanges?.(),n.rerenderCurrentState?.(),n.requestConfigSync?.()}return{setup(E){a!==E.replay&&(a=E.replay,h?h=!1:d=null),r=E.statsTimeline,m(E.replay)},teardown(){},getConfig:R,applyConfig:T,getTimelineRangeOptions(){const E={padTypes:o,comparisons:l,activities:c,fieldHalves:u};return d&&(E.playerIds=d),E},includePickup:S,renderSettings(E,A){if(!e){e=document.createElement("div"),e.className="boost-pickup-filter-panel";const y=document.createElement("div");y.className="boost-pickup-filter-summary",t=document.createElement("strong"),t.className="metric-readout",y.append(t);const b=document.createElement("div");b.className="boost-pickup-filter-grid",b.append(f("Pad type",Wr,o,"pad-type"),f("Activity",$r,c,"activity"),f("Field half",Xr,u,"field-half"),g()),(A.showHeader??!1)&&e.append(y),e.append(b)}return _(E?.replay??null),m(E?.replay??null),e}}}function Nn(n){return{id:n.id,label:n.label,setup(){},teardown(){},onBeforeRender(){},getTimelineEvents:n.getTimelineEvents,renderStats(e,t){const i=wt(t.statsFrameLookup,e);return i?ln(i.players,s=>qt(s.name,s.is_team_0,n.render(n.select(s),s))):""},renderFocusedPlayerStats(e,t,i){const s=zt(i,t,e);return s?n.render(n.select(s),s):""}}}const aA=255;function Km(n){return n*100/aA}function Mn(n){return n==null?"?":Km(n).toFixed(0)}function rA(n,e){const t=Mn(n);if(n==null||e==null)return t;const i=Mn(n+e);return`${t} (${i})`}function oc(n){n&&typeof n=="object"&&"dispose"in n&&typeof n.dispose=="function"&&n.dispose()}function oA(n){n&&(n.removeFromParent(),n.traverse(e=>{const t="geometry"in e?e.geometry:null;oc(t);const i="material"in e?e.material:null;if(Array.isArray(i))for(const s of i)oc(s);else oc(i)}))}function lA(){let n=0,e=null;return{acquire(t){e||(e=sT(t.player.sceneState.scene,t.fieldScale)),n+=1},release(){n<=0||(n-=1,n===0&&(oA(e),e=null))}}}const Pf=lA();function je(n){return n===void 0||Number.isNaN(n)?"?":`${Math.round(n)}`}function Ie(n,e=1,t=""){return n===void 0||Number.isNaN(n)?"?":`${n.toFixed(e)}${t}`}function pu(n,e=0){return Ie(n,e,"%")}function jm(n,e,t=1,i=0){if(n===void 0||Number.isNaN(n))return pu(e,i);const s=Ie(n,t,"s");return e===void 0||Number.isNaN(e)?s:`${s} (${pu(e,i)})`}function Is(n,e,t=1,i=0){const s=n!==void 0&&e!==void 0&&!Number.isNaN(n)&&!Number.isNaN(e)&&e>0?n*100/e:void 0;return jm(n,s,t,i)}function Ke(n){return typeof n=="number"&&Number.isFinite(n)?n:void 0}function Vs(n){const e=Ke(n);return e===void 0?void 0:e*100}function Jm(n){return Ke(n?.tracked_time)}function cA(n,e,t){const i=Ke(n?.[e]);if(i!==void 0)return i;const s=Jm(n),a=Ke(n?.[t]);if(!(s===void 0||s<=0||a===void 0))return a*100/s}function Kt(n,e,t){return jm(Ke(n?.[t]),cA(n,e,t))}function Lf(n,e,t){const i=Ke(n?.[e]);if(i!==void 0)return i;const s=Jm(n),a=Ke(n?.[t]);if(!(s===void 0||s<=0||a===void 0))return a/s}function If(n){return`
    <div class="stat-row"><span class="label">Most back</span><span class="value">${Kt(n,"percent_most_back","time_most_back")}</span></div>
    <div class="stat-row"><span class="label">Most forward</span><span class="value">${Kt(n,"percent_most_forward","time_most_forward")}</span></div>
    <div class="stat-row"><span class="label">Mid role</span><span class="value">${Kt(n,"percent_mid_role","time_mid_role")}</span></div>
    <div class="stat-row"><span class="label">Other role</span><span class="value">${Kt(n,"percent_other_role","time_other_role")}</span></div>
    <div class="stat-row"><span class="label">Closest to ball</span><span class="value">${Kt(n,"percent_closest_to_ball","time_closest_to_ball")}</span></div>
    <div class="stat-row"><span class="label">Farthest from ball</span><span class="value">${Kt(n,"percent_farthest_from_ball","time_farthest_from_ball")}</span></div>
    <div class="stat-row"><span class="label">Behind ball</span><span class="value">${Kt(n,"percent_behind_ball","time_behind_ball")}</span></div>
    <div class="stat-row"><span class="label">Level with ball</span><span class="value">${Kt(n,"percent_level_with_ball","time_level_with_ball")}</span></div>
    <div class="stat-row"><span class="label">In front of ball</span><span class="value">${Kt(n,"percent_in_front_of_ball","time_in_front_of_ball")}</span></div>
  `}function Nf(n){return`
    <div class="stat-row"><span class="label">Defensive zone</span><span class="value">${Kt(n,"percent_defensive_third","time_defensive_third")}</span></div>
    <div class="stat-row"><span class="label">Neutral zone</span><span class="value">${Kt(n,"percent_neutral_third","time_neutral_third")}</span></div>
    <div class="stat-row"><span class="label">Offensive zone</span><span class="value">${Kt(n,"percent_offensive_third","time_offensive_third")}</span></div>
    <div class="stat-row"><span class="label">Defensive half</span><span class="value">${Kt(n,"percent_defensive_half","time_defensive_half")}</span></div>
    <div class="stat-row"><span class="label">Offensive half</span><span class="value">${Kt(n,"percent_offensive_half","time_offensive_half")}</span></div>
    <div class="stat-row"><span class="label">To teammates</span><span class="value">${Ie(Lf(n,"average_distance_to_teammates","sum_distance_to_teammates"),0)}</span></div>
    <div class="stat-row"><span class="label">To ball</span><span class="value">${Ie(Lf(n,"average_distance_to_ball","sum_distance_to_ball"),0)}</span></div>
  `}function uA(n){const e=n&&n.shots>0?n.goals*100/n.shots:void 0;return`
    <div class="stat-row"><span class="label">Score</span><span class="value">${je(n?.score)}</span></div>
    <div class="stat-row"><span class="label">Goals</span><span class="value">${je(n?.goals)}</span></div>
    <div class="stat-row"><span class="label">Assists</span><span class="value">${je(n?.assists)}</span></div>
    <div class="stat-row"><span class="label">Saves</span><span class="value">${je(n?.saves)}</span></div>
    <div class="stat-row"><span class="label">Shots</span><span class="value">${je(n?.shots)}</span></div>
    <div class="stat-row"><span class="label">Shooting %</span><span class="value">${pu(e)}</span></div>
  `}function dA(n){return`
    <div class="stat-row"><span class="label">Hits</span><span class="value">${je(n?.count)}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${Ie(Ke(n?.time_since_last_backboard),2,"s")}</span></div>
  `}function hA(n){return`
    <div class="stat-row"><span class="label">Count</span><span class="value">${je(n?.count)}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${Ie(Ke(n?.time_since_last_double_tap),2,"s")}</span></div>
  `}function fA(n){const e=n&&n.completed_pass_count>0?n.total_pass_distance/n.completed_pass_count:void 0,t=n&&n.completed_pass_count>0?n.total_pass_advance/n.completed_pass_count:void 0;return`
    <div class="stat-row"><span class="label">Completed</span><span class="value">${je(n?.completed_pass_count)}</span></div>
    <div class="stat-row"><span class="label">Received</span><span class="value">${je(n?.received_pass_count)}</span></div>
    <div class="stat-row"><span class="label">Avg distance</span><span class="value">${Ie(e,0)}</span></div>
    <div class="stat-row"><span class="label">Avg advance</span><span class="value">${Ie(t,0)}</span></div>
    <div class="stat-row"><span class="label">Longest</span><span class="value">${Ie(n?.longest_pass_distance,0)}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${Ie(Ke(n?.time_since_last_completed_pass),2,"s")}</span></div>
  `}function pA(n){const e=n&&n.count>0?n.total_ball_speed/n.count:void 0,t=n&&n.count>0?n.total_pass_distance/n.count:void 0;return`
    <div class="stat-row"><span class="label">Attempts</span><span class="value">${je(n?.count)}</span></div>
    <div class="stat-row"><span class="label">Avg speed</span><span class="value">${Ie(e,0)}</span></div>
    <div class="stat-row"><span class="label">Fastest</span><span class="value">${Ie(n?.fastest_ball_speed,0)}</span></div>
    <div class="stat-row"><span class="label">Avg pass distance</span><span class="value">${Ie(t,0)}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${Ie(Ke(n?.time_since_last_one_timer),2,"s")}</span></div>
  `}function Df(n){const e=n&&n.count>0?n.cumulative_confidence/n.count:void 0;return`
    <div class="stat-row"><span class="label">Attempts</span><span class="value">${je(n?.count)}</span></div>
    <div class="stat-row"><span class="label">High conf</span><span class="value">${je(n?.high_confidence_count)}</span></div>
    <div class="stat-row"><span class="label">Last quality</span><span class="value">${Ie(Ke(n?.last_confidence),0,"%")}</span></div>
    <div class="stat-row"><span class="label">Avg quality</span><span class="value">${Ie(e,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Best quality</span><span class="value">${Ie(Ke(n?.best_confidence),0,"%")}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${Ie(Ke(n?.time_since_last_ceiling_shot),2,"s")}</span></div>
  `}function mA(n){const e=n&&n.carry_count>0?n.average_horizontal_gap_sum/n.carry_count:void 0;return`
    <div class="stat-row"><span class="label">Carries</span><span class="value">${je(n?.carry_count)}</span></div>
    <div class="stat-row"><span class="label">Total time</span><span class="value">${Ie(n?.total_carry_time,1,"s")}</span></div>
    <div class="stat-row"><span class="label">Longest</span><span class="value">${Ie(n?.longest_carry_time,1,"s")}</span></div>
    <div class="stat-row"><span class="label">Furthest</span><span class="value">${Ie(n?.furthest_carry_distance,0)}</span></div>
    <div class="stat-row"><span class="label">Avg gap</span><span class="value">${Ie(e,0)}</span></div>
  `}function gA(n){const e=n&&n.count>0?n.average_horizontal_gap_sum/n.count:void 0;return`
    <div class="stat-row"><span class="label">Air dribbles</span><span class="value">${je(n?.count)}</span></div>
    <div class="stat-row"><span class="label">Total time</span><span class="value">${Ie(n?.total_time,1,"s")}</span></div>
    <div class="stat-row"><span class="label">Longest</span><span class="value">${Ie(n?.longest_time,1,"s")}</span></div>
    <div class="stat-row"><span class="label">Furthest</span><span class="value">${Ie(n?.furthest_distance,0)}</span></div>
    <div class="stat-row"><span class="label">Avg gap</span><span class="value">${Ie(e,0)}</span></div>
  `}function _A(n){const e=n&&n.press_count>0?n.total_duration/n.press_count:void 0;return`
    <div class="stat-row"><span class="label">Presses</span><span class="value">${je(n?.press_count)}</span></div>
    <div class="stat-row"><span class="label">Total time</span><span class="value">${Ie(n?.total_duration,1,"s")}</span></div>
    <div class="stat-row"><span class="label">Avg duration</span><span class="value">${Ie(e,2,"s")}</span></div>
  `}function vA(n){const e=n&&n.whiff_count>0?n.cumulative_closest_approach_distance/n.whiff_count:void 0;return`
    <div class="stat-row"><span class="label">Whiffs</span><span class="value">${je(n?.whiff_count)}</span></div>
    <div class="stat-row"><span class="label">Grounded</span><span class="value">${je(n?.grounded_whiff_count)}</span></div>
    <div class="stat-row"><span class="label">Aerial</span><span class="value">${je(n?.aerial_whiff_count)}</span></div>
    <div class="stat-row"><span class="label">Dodge</span><span class="value">${je(n?.dodge_whiff_count)}</span></div>
    <div class="stat-row"><span class="label">Last closest</span><span class="value">${Ie(Ke(n?.last_closest_approach_distance),0)}</span></div>
    <div class="stat-row"><span class="label">Best closest</span><span class="value">${Ie(Ke(n?.best_closest_approach_distance),0)}</span></div>
    <div class="stat-row"><span class="label">Avg closest</span><span class="value">${Ie(e,0)}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${Ie(Ke(n?.time_since_last_whiff),2,"s")}</span></div>
  `}function yA(n){return`
    <div class="stat-row"><span class="label">Inflicted</span><span class="value">${je(n?.demos_inflicted)}</span></div>
    <div class="stat-row"><span class="label">Taken</span><span class="value">${je(n?.demos_taken)}</span></div>
  `}function bA(n){return`
    <div class="stat-row"><span class="label">Count</span><span class="value">${je(n?.count)}</span></div>
    <div class="stat-row"><span class="label">On ball</span><span class="value">${je(n?.on_ball_count)}</span></div>
  `}function Uf(n){const e=n&&n.count>0?n.cumulative_confidence/n.count:void 0;return`
    <div class="stat-row"><span class="label">Attempts</span><span class="value">${je(n?.count)}</span></div>
    <div class="stat-row"><span class="label">High conf</span><span class="value">${je(n?.high_confidence_count)}</span></div>
    <div class="stat-row"><span class="label">Last quality</span><span class="value">${Ie(Ke(n?.last_confidence),0,"%")}</span></div>
    <div class="stat-row"><span class="label">Avg quality</span><span class="value">${Ie(e,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Best quality</span><span class="value">${Ie(Ke(n?.best_confidence),0,"%")}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${Ie(Ke(n?.time_since_last_musty),2,"s")}</span></div>
  `}function Ff(n){const e=n&&n.count>0?n.cumulative_confidence/n.count:void 0,t=n&&n.count>0?n.cumulative_setup_duration/n.count:void 0,i=n&&n.count>0?n.cumulative_ball_speed_change/n.count:void 0;return`
    <div class="stat-row"><span class="label">Attempts</span><span class="value">${je(n?.count)}</span></div>
    <div class="stat-row"><span class="label">High conf</span><span class="value">${je(n?.high_confidence_count)}</span></div>
    <div class="stat-row"><span class="label">Last quality</span><span class="value">${Ie(Ke(n?.last_confidence),0,"%")}</span></div>
    <div class="stat-row"><span class="label">Avg quality</span><span class="value">${Ie(e,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Avg setup</span><span class="value">${Ie(t,2,"s")}</span></div>
    <div class="stat-row"><span class="label">Avg impulse</span><span class="value">${Ie(i,0,"uu/s")}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${Ie(Ke(n?.time_since_last_flick),2,"s")}</span></div>
  `}function Of(n){const e=n&&n.count>0?n.cumulative_quality/n.count:void 0;return`
    <div class="stat-row"><span class="label">Attempts</span><span class="value">${je(n?.count)}</span></div>
    <div class="stat-row"><span class="label">High conf</span><span class="value">${je(n?.high_confidence_count)}</span></div>
    <div class="stat-row"><span class="label">Last quality</span><span class="value">${Ie(Ke(n?.last_quality),0,"%")}</span></div>
    <div class="stat-row"><span class="label">Avg quality</span><span class="value">${Ie(e,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Best quality</span><span class="value">${Ie(Ke(n?.best_quality),0,"%")}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${Ie(Ke(n?.time_since_last_speed_flip),2,"s")}</span></div>
  `}function kf(n){const e=n&&n.count>0?n.cumulative_quality/n.count:void 0,t=Vs(n?.last_quality),i=Vs(e),s=Vs(n?.best_quality);return`
    <div class="stat-row"><span class="label">Attempts</span><span class="value">${je(n?.count)}</span></div>
    <div class="stat-row"><span class="label">High conf</span><span class="value">${je(n?.high_confidence_count)}</span></div>
    <div class="stat-row"><span class="label">Last quality</span><span class="value">${Ie(t,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Avg quality</span><span class="value">${Ie(i,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Best quality</span><span class="value">${Ie(s,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${Ie(Ke(n?.time_since_last_half_flip),2,"s")}</span></div>
  `}function Bf(n){const e=n&&n.count>0?n.cumulative_quality/n.count:void 0,t=Vs(n?.last_quality),i=Vs(e),s=Vs(n?.best_quality);return`
    <div class="stat-row"><span class="label">Attempts</span><span class="value">${je(n?.count)}</span></div>
    <div class="stat-row"><span class="label">High conf</span><span class="value">${je(n?.high_confidence_count)}</span></div>
    <div class="stat-row"><span class="label">Last quality</span><span class="value">${Ie(t,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Avg quality</span><span class="value">${Ie(i,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Best quality</span><span class="value">${Ie(s,0,"%")}</span></div>
    <div class="stat-row"><span class="label">Since last</span><span class="value">${Ie(Ke(n?.time_since_last_wavedash),2,"s")}</span></div>
  `}function zf(n){const e=n&&n.tracked_time>0?Km(n.boost_integral/n.tracked_time).toFixed(0):"?",t=Ke(n?.tracked_time);return`
    <div class="stat-row"><span class="label">Collected</span><span class="value">${rA(n?.amount_collected,n?.amount_respawned)}</span></div>
    <div class="stat-row"><span class="label">Inactive collected</span><span class="value">${Mn(n?.amount_collected_inactive)}</span></div>
    <div class="stat-row"><span class="label">Big pads amt</span><span class="value">${Mn(n?.amount_collected_big)}</span></div>
    <div class="stat-row"><span class="label">Small pads amt</span><span class="value">${Mn(n?.amount_collected_small)}</span></div>
    <div class="stat-row"><span class="label">Respawns</span><span class="value">${Mn(n?.amount_respawned)}</span></div>
    <div class="stat-row"><span class="label">Overfill</span><span class="value">${Mn(n?.overfill_total)}</span></div>
    <div class="stat-row"><span class="label">Used</span><span class="value">${Mn(n?.amount_used)}</span></div>
    <div class="stat-row"><span class="label">Used ground</span><span class="value">${Mn(n?.amount_used_while_grounded)}</span></div>
    <div class="stat-row"><span class="label">Used air</span><span class="value">${Mn(n?.amount_used_while_airborne)}</span></div>
    <div class="stat-row"><span class="label">Big pads</span><span class="value">${n?.big_pads_collected??"?"}</span></div>
    <div class="stat-row"><span class="label">Small pads</span><span class="value">${n?.small_pads_collected??"?"}</span></div>
    <div class="stat-row"><span class="label">Inactive big pads</span><span class="value">${n?.big_pads_collected_inactive??"?"}</span></div>
    <div class="stat-row"><span class="label">Inactive small pads</span><span class="value">${n?.small_pads_collected_inactive??"?"}</span></div>
    <div class="stat-row"><span class="label">Stolen</span><span class="value">${Mn(n?.amount_stolen)}</span></div>
    <div class="stat-row"><span class="label">Avg boost</span><span class="value">${e}</span></div>
    <div class="stat-row"><span class="label">Time @ 0</span><span class="value">${Is(Ke(n?.time_zero_boost),t)}</span></div>
    <div class="stat-row"><span class="label">Time 0-25</span><span class="value">${Is(Ke(n?.time_boost_0_25),t)}</span></div>
    <div class="stat-row"><span class="label">Time 25-50</span><span class="value">${Is(Ke(n?.time_boost_25_50),t)}</span></div>
    <div class="stat-row"><span class="label">Time 50-75</span><span class="value">${Is(Ke(n?.time_boost_50_75),t)}</span></div>
    <div class="stat-row"><span class="label">Time 75-100</span><span class="value">${Is(Ke(n?.time_boost_75_100),t)}</span></div>
    <div class="stat-row"><span class="label">Time @ 100</span><span class="value">${Is(Ke(n?.time_hundred_boost),t)}</span></div>
  `}function xA(n,e=Zm({refreshTimelineRanges:n.refreshTimelineRanges,rerenderCurrentState:n.rerenderCurrentState})){return{id:"boost",label:"Boost",setup(t){e.setup(t)},teardown(){e.teardown()},onBeforeRender(){},getTimelineRanges(t){return y1(t.statsTimeline,t.replay,e.getTimelineRangeOptions())},getConfig(){return e.getConfig()},applyConfig(t){e.applyConfig(t)},includeBoostPickupAnimationPickup(t){return e.includePickup(t)},renderStats(t,i){const s=wt(i.statsFrameLookup,t);return s?ln(s.players,a=>qt(a.name,a.is_team_0,zf(a.boost))):""},renderFocusedPlayerStats(t,i,s){const a=zt(s,i,t);return a?(wt(s.statsFrameLookup,i),zf(a.boost)):""},renderSettings(t){return e.renderSettings(t,{showHeader:!0})}}}function SA(){return Nn({id:"core",label:"Core",select:n=>n.core,render:n=>uA(n)})}function wA(){return Nn({id:"backboard",label:"Backboard",select:n=>n.backboard,render:n=>dA(n),getTimelineEvents(n){return Lm(n.statsTimeline,n.replay)}})}function MA(){let n=null;return{id:"ceiling-shot",label:"Ceiling Shot",setup(e){n=new zT(e.player.sceneState,e.player.container,e.replay,e.statsTimeline)},teardown(){n?.dispose(),n=null},onBeforeRender(e){n?.update(e.currentTime)},getTimelineEvents(e){return Im(e.statsTimeline,e.replay)},renderStats(e,t){const i=wt(t.statsFrameLookup,e);return i?ln(i.players,s=>qt(s.name,s.is_team_0,Df(s.ceiling_shot),s.ceiling_shot?.is_last_ceiling_shot?'<span class="role-indicator role-forward">Last Ceiling Shot</span>':"")):""},renderFocusedPlayerStats(e,t,i){const s=zt(i,t,e);return s?Df(s.ceiling_shot):""}}}function EA(){return Nn({id:"ball-carry",label:"Ball Carry",select:n=>n.ball_carry,render:n=>mA(n),getTimelineEvents(n){return Um(n.statsTimeline,n.replay)}})}function TA(){return Nn({id:"air-dribble",label:"Air Dribble",select:n=>n.air_dribble,render:n=>gA(n)})}function AA(){return Nn({id:"dodge-reset",label:"Dodge Reset",select:n=>n.dodge_reset,render:n=>bA(n),getTimelineEvents(n){return Dm(n.statsTimeline,n.replay)}})}function CA(){return Nn({id:"double-tap",label:"Double Tap",select:n=>n.double_tap,render:n=>hA(n),getTimelineEvents(n){return Nm(n.statsTimeline,n.replay)}})}function RA(){return Nn({id:"pass",label:"Pass",select:n=>n.pass,render:n=>fA(n)})}function PA(){return Nn({id:"one-timer",label:"One-timer",select:n=>n.one_timer,render:n=>pA(n)})}function LA(){return{id:"musty-flick",label:"Musty Flick",setup(){},teardown(){},onBeforeRender(){},getTimelineEvents(n){return Cm(n.statsTimeline,n.replay)},renderStats(n,e){const t=wt(e.statsFrameLookup,n);return t?ln(t.players,i=>qt(i.name,i.is_team_0,Uf(i.musty_flick),i.musty_flick?.is_last_musty?'<span class="role-indicator role-forward">Last Musty</span>':"")):""},renderFocusedPlayerStats(n,e,t){const i=zt(t,e,n);return i?Uf(i.musty_flick):""}}}function IA(){return{id:"flick",label:"Flick",setup(){},teardown(){},onBeforeRender(){},getTimelineEvents(n){return Rm(n.statsTimeline,n.replay)},renderStats(n,e){const t=wt(e.statsFrameLookup,n);return t?ln(t.players,i=>qt(i.name,i.is_team_0,Ff(i.flick),i.flick?.is_last_flick?'<span class="role-indicator role-forward">Last Flick</span>':"")):""},renderFocusedPlayerStats(n,e,t){const i=zt(t,e,n);return i?Ff(i.flick):""}}}function NA(){let n=null;return{id:"speed-flip",label:"Speed Flip",setup(e){n=new nA(e.player.sceneState,e.player.container,e.replay,e.statsTimeline)},teardown(){n?.dispose(),n=null},onBeforeRender(e){n?.update(e.currentTime)},getTimelineEvents(e){return Om(e.statsTimeline,e.replay)},renderStats(e,t){const i=wt(t.statsFrameLookup,e);return i?ln(i.players,s=>qt(s.name,s.is_team_0,Of(s.speed_flip),s.speed_flip?.is_last_speed_flip?'<span class="role-indicator role-forward">Last Speed Flip</span>':"")):""},renderFocusedPlayerStats(e,t,i){const s=zt(i,t,e);return s?Of(s.speed_flip):""}}}function DA(){return{id:"half-flip",label:"Half Flip",setup(){},teardown(){},onBeforeRender(){},getTimelineEvents(n){return km(n.statsTimeline,n.replay)},renderStats(n,e){const t=wt(e.statsFrameLookup,n);return t?ln(t.players,i=>qt(i.name,i.is_team_0,kf(i.half_flip),i.half_flip?.is_last_half_flip?'<span class="role-indicator role-forward">Last Half Flip</span>':"")):""},renderFocusedPlayerStats(n,e,t){const i=zt(t,e,n);return i?kf(i.half_flip):""}}}function UA(){return{id:"wavedash",label:"Wavedash",setup(){},teardown(){},onBeforeRender(){},getTimelineEvents(n){return Bm(n.statsTimeline,n.replay)},renderStats(n,e){const t=wt(e.statsFrameLookup,n);return t?ln(t.players,i=>qt(i.name,i.is_team_0,Bf(i.wavedash),i.wavedash?.is_last_wavedash?'<span class="role-indicator role-forward">Last Wavedash</span>':"")):""},renderFocusedPlayerStats(n,e,t){const i=zt(t,e,n);return i?Bf(i.wavedash):""}}}function FA(n){let e=null,t=5,i="advancement",s=null,a=null,r=null,o=null;const l=new Set,c=["kind","height_band"];return{id:"touch",label:"Touch",setup(h){e=new ZT(h.player.sceneState,h.player.container,h.replay,h.statsTimeline,{mode:i}),e.setDecaySeconds(t),u()},teardown(){e?.dispose(),e=null},onBeforeRender(h){e?.update(h.currentTime)},getTimelineEvents(h){return Pm(h.statsTimeline,h.replay)},getConfig(){return{decaySeconds:t,overlayMode:i,breakdownClasses:d()}},applyConfig(h){if(h&&typeof h=="object"&&!Array.isArray(h)){const f=h;if(typeof f.decaySeconds=="number"&&Number.isFinite(f.decaySeconds)&&(t=Math.max(1,Math.min(10,f.decaySeconds)),e?.setDecaySeconds(t)),(f.overlayMode==="markers"||f.overlayMode==="advancement")&&(i=f.overlayMode,e?.setMode(i)),l.clear(),Array.isArray(f.breakdownClasses))for(const g of f.breakdownClasses)c.includes(g)&&l.add(g)}u(),n.rerenderCurrentState()},renderStats(h,f){const g=wt(f.statsFrameLookup,h);return g?ln(g.players,_=>qt(_.name,_.is_team_0,Cf(_.touch,{breakdownClasses:d()}),_.touch?.is_last_touch?'<span class="role-indicator role-forward">Last Touch</span>':"")):""},renderFocusedPlayerStats(h,f,g){const _=zt(g,f,h);return _?Cf(_.touch,{breakdownClasses:d()}):""},renderSettings(){if(!s){s=document.createElement("div"),s.className="module-settings-card";const h=document.createElement("div");h.className="module-settings-header";const f=document.createElement("div"),g=document.createElement("p");g.className="module-settings-eyebrow",g.textContent="Touch markers";const _=document.createElement("h3");_.textContent="Touch decay",f.append(g,_),a=document.createElement("strong"),a.className="metric-readout",h.append(f,a);const m=document.createElement("label"),p=document.createElement("span");p.className="label",p.textContent="Keep each marker visible after the touch";const w=document.createElement("input");w.type="range",w.min="1",w.max="10",w.step="0.5",w.value=`${t}`,w.addEventListener("input",()=>{const G=Number(w.value);t=Number.isFinite(G)?Math.max(1,Math.min(10,G)):t,e?.setDecaySeconds(t),u(t),n.requestConfigSync?.()}),m.append(p,w);const S=document.createElement("div");S.className="module-settings-subgroup";const v=document.createElement("div");v.className="module-settings-header";const R=document.createElement("div"),T=document.createElement("p");T.className="module-settings-eyebrow",T.textContent="Overlay";const E=document.createElement("h3");E.textContent="Touch mode",R.append(T,E),r=document.createElement("strong"),r.className="metric-readout",v.append(R,r);const A=document.createElement("div");A.className="module-settings-options";for(const G of[{mode:"markers",label:"Markers"},{mode:"advancement",label:"Advancement"}]){const B=document.createElement("label");B.className="toggle";const U=document.createElement("input");U.type="radio",U.name="touch-overlay-mode",U.dataset.overlayMode=G.mode,U.addEventListener("change",()=>{U.checked&&(i=G.mode,e?.setMode(i),u(),n.requestConfigSync?.())});const O=document.createElement("span");O.textContent=G.label,B.append(U,O),A.append(B)}S.append(v,A);const y=document.createElement("div");y.className="module-settings-subgroup";const b=document.createElement("div");b.className="module-settings-header";const C=document.createElement("div"),N=document.createElement("p");N.className="module-settings-eyebrow",N.textContent="Stat display";const z=document.createElement("h3");z.textContent="Touch breakdown",C.append(N,z),o=document.createElement("strong"),o.className="metric-readout",b.append(C,o);const V=document.createElement("div");V.className="module-settings-options";for(const G of[{className:"kind",label:"Kind"},{className:"height_band",label:"Height"}]){const B=document.createElement("label");B.className="toggle";const U=document.createElement("input");U.type="checkbox",U.dataset.breakdownClass=G.className,U.addEventListener("change",()=>{U.checked?l.add(G.className):l.delete(G.className),u(),n.rerenderCurrentState(),n.requestConfigSync?.()});const O=document.createElement("span");O.textContent=G.label,B.append(U,O),V.append(B)}y.append(b,V),s.append(h,m,S,y)}return u(),s}};function u(h){if(!s)return;const f=h??t,g=s.querySelector("input");g instanceof HTMLInputElement&&(g.value=`${f}`),a&&(a.textContent=`${f.toFixed(1)}s`);for(const _ of s.querySelectorAll("input[data-overlay-mode]"))_.checked=_.dataset.overlayMode===i;r&&(r.textContent=i==="advancement"?"Advancement":"Markers");for(const _ of s.querySelectorAll("input[data-breakdown-class]")){const m=_.dataset.breakdownClass;_.checked=m?l.has(m):!1}if(o){const _=d();o.textContent=_.length>0?_.map(m=>({kind:"Kind",height_band:"Height"})[m]).join(" + "):"Total only"}}function d(){return c.filter(h=>l.has(h))}}function OA(){return Nn({id:"whiff",label:"Whiff",select:n=>n.whiff,render:n=>vA(n),getTimelineEvents(n){return zm(n.statsTimeline,n.replay)}})}function kA(n){let e=null,t=null;const i=new Set,s=["speed_band","height_band"];return{id:"movement",label:"Movement",setup(){a()},teardown(){},onBeforeRender(){},getConfig(){return{breakdownClasses:r()}},applyConfig(o){if(i.clear(),o&&typeof o=="object"&&!Array.isArray(o)){const l=o.breakdownClasses;if(Array.isArray(l))for(const c of l)s.includes(c)&&i.add(c)}a(),n.rerenderCurrentState()},renderStats(o,l){const c=wt(l.statsFrameLookup,o);return c?ln(c.players,u=>qt(u.name,u.is_team_0,Tf(u.movement,{breakdownClasses:r()}))):""},renderFocusedPlayerStats(o,l,c){const u=zt(c,l,o);return u?Tf(u.movement,{breakdownClasses:r()}):""},renderSettings(){if(!e){e=document.createElement("div"),e.className="module-settings-card";const o=document.createElement("div");o.className="module-settings-header";const l=document.createElement("div"),c=document.createElement("p");c.className="module-settings-eyebrow",c.textContent="Stat display";const u=document.createElement("h3");u.textContent="Movement breakdown",l.append(c,u),t=document.createElement("strong"),t.className="metric-readout",o.append(l,t);const d=document.createElement("div");d.className="module-settings-options";for(const h of[{className:"speed_band",label:"Speed band"},{className:"height_band",label:"Height band"}]){const f=document.createElement("label");f.className="toggle";const g=document.createElement("input");g.type="checkbox",g.dataset.breakdownClass=h.className,g.addEventListener("change",()=>{g.checked?i.add(h.className):i.delete(h.className),a(),n.rerenderCurrentState(),n.requestConfigSync?.()});const _=document.createElement("span");_.textContent=h.label,f.append(g,_),d.append(f)}e.append(o,d)}return a(),e}};function a(){if(e){for(const o of e.querySelectorAll("input[data-breakdown-class]")){const l=o.dataset.breakdownClass;o.checked=l?i.has(l):!1}if(t){const o=r();t.textContent=o.length>0?o.map(l=>({speed_band:"Speed band",height_band:"Height band"})[l]).join(" + "):"Total only"}}}function r(){return s.filter(o=>i.has(o))}}function BA(){return Nn({id:"powerslide",label:"Powerslide",select:n=>n.powerslide,render:n=>_A(n),getTimelineEvents(n){return Fm(n.statsTimeline,n.replay)}})}function zA(){return Nn({id:"demo",label:"Demo",select:n=>n.demo,render:n=>yA(n)})}function HA(){let n=null,e=1;return{id:Xm,label:"Relative Positioning",setup(t){e=t.fieldScale,n=new tT(t.player.sceneState.scene,t.replay,e)},teardown(){n?.dispose(),n=null},onBeforeRender(t){n?.update(t,e)},renderStats(t,i){const s=wt(i.statsFrameLookup,t);return s?ln(s.players,a=>{const r=C1(i.replay,At(a.player_id),t),o=A1[r];return qt(a.name,a.is_team_0,If(a.positioning),`<span class="depth-indicator depth-${r}" title="Team Depth: ${o}" aria-label="Team Depth: ${o}">${o}</span>`)}):""},renderFocusedPlayerStats(t,i,s){const a=zt(s,i,t);return a?If(a.positioning):""}}}function VA(){return{id:"absolute-positioning",label:"Absolute Positioning",setup(n){Pf.acquire(n)},teardown(){Pf.release()},onBeforeRender(){},getTimelineRanges(n){return M1(n.statsTimeline,n.replay)},renderStats(n,e){const t=wt(e.statsFrameLookup,n);return t?ln(t.players,i=>qt(i.name,i.is_team_0,Nf(i.positioning))):""},renderFocusedPlayerStats(n,e,t){const i=zt(t,e,n);return i?Nf(i.positioning):""}}}function GA(n,e={}){return[SA(),wA(),MA(),CA(),PA(),RA(),R1(n),P1(),L1(),I1(),HA(),VA(),NA(),DA(),UA(),FA(n),OA(),IA(),LA(),AA(),TA(),xA(n,e.boostPickupFilters),EA(),kA(n),BA(),zA()]}function WA(n){const e={};for(const t of n)if(t.getConfig){if(Object.hasOwn(e,t.id))throw new Error(`Duplicate stats player config adapter id: ${t.id}`);e[t.id]=t.getConfig()}return e}function $A(n,e){for(const t of n)if(t.applyConfig){if(Object.hasOwn(e,t.id)){t.applyConfig(e[t.id]);continue}for(const i of t.aliases??[])if(Object.hasOwn(e,i)){t.applyConfig(e[i]);break}}}function Qm(n,e){return n}function Co(n){return Qm({fifty_fifty:{count:0,wins:0,losses:0,neutral_outcomes:0,kickoff_count:0,kickoff_wins:0,kickoff_losses:0,kickoff_neutral_outcomes:0,possession_after_count:0,opponent_possession_after_count:0,neutral_possession_after_count:0,kickoff_possession_after_count:0,kickoff_opponent_possession_after_count:0,kickoff_neutral_possession_after_count:0},possession:{tracked_time:0,possession_time:0,opponent_possession_time:0,neutral_time:0,labeled_time:{entries:[]}},pressure:{tracked_time:0,defensive_half_time:0,offensive_half_time:0,neutral_time:0,labeled_time:{entries:[]}},rush:{count:0,two_v_one_count:0,two_v_two_count:0,two_v_three_count:0,three_v_one_count:0,three_v_two_count:0,three_v_three_count:0},core:{score:0,goals:0,assists:0,saves:0,shots:0,kickoff_goal_count:0,short_goal_count:0,medium_goal_count:0,long_goal_count:0,counter_attack_goal_count:0,sustained_pressure_goal_count:0,other_buildup_goal_count:0},backboard:{count:0},double_tap:{count:0},one_timer:{count:0,total_ball_speed:0,fastest_ball_speed:0},pass:{completed_pass_count:0,total_pass_distance:0,total_pass_advance:0,longest_pass_distance:0},ball_carry:{carry_count:0,total_carry_time:0,total_straight_line_distance:0,total_path_distance:0,longest_carry_time:0,furthest_carry_distance:0,fastest_carry_speed:0,carry_speed_sum:0,average_horizontal_gap_sum:0,average_vertical_gap_sum:0},air_dribble:{count:0,total_time:0,total_straight_line_distance:0,total_path_distance:0,longest_time:0,furthest_distance:0,fastest_speed:0,speed_sum:0,average_horizontal_gap_sum:0,average_vertical_gap_sum:0},boost:{tracked_time:0,boost_integral:0,time_zero_boost:0,time_hundred_boost:0,time_boost_0_25:0,time_boost_25_50:0,time_boost_50_75:0,time_boost_75_100:0,amount_collected:0,amount_collected_inactive:0,big_pads_collected_inactive:0,small_pads_collected_inactive:0,amount_stolen:0,big_pads_collected:0,small_pads_collected:0,big_pads_stolen:0,small_pads_stolen:0,amount_collected_big:0,amount_stolen_big:0,amount_collected_small:0,amount_stolen_small:0,amount_respawned:0,overfill_total:0,overfill_from_stolen:0,amount_used:0,amount_used_while_grounded:0,amount_used_while_airborne:0,amount_used_while_supersonic:0},movement:{tracked_time:0,total_distance:0,speed_integral:0,time_slow_speed:0,time_boost_speed:0,time_supersonic_speed:0,time_on_ground:0,time_low_air:0,time_high_air:0,labeled_tracked_time:{entries:[]}},powerslide:{total_duration:0,press_count:0},demo:{demos_inflicted:0}})}function eg(n){return Qm({player_id:{Steam:"test-player"},name:"Test Player",is_team_0:!0,core:{score:0,goals:0,assists:0,saves:0,shots:0,goals_conceded_while_last_defender:0,goals_for_while_most_back:0,goals_against_while_most_back:0,goal_against_boost_sample_count:0,cumulative_boost_on_goals_against:0,last_boost_on_goal_against:null,goal_against_boost_leadup_sample_count:0,cumulative_average_boost_in_goal_against_leadup:0,cumulative_min_boost_in_goal_against_leadup:0,last_average_boost_in_goal_against_leadup:null,last_min_boost_in_goal_against_leadup:null,goal_against_position_sample_count:0,cumulative_goal_against_position_x:0,cumulative_goal_against_position_y:0,cumulative_goal_against_position_z:0,last_goal_against_position:null,scoring_goal_last_touch_position_sample_count:0,cumulative_scoring_goal_last_touch_position_x:0,cumulative_scoring_goal_last_touch_position_y:0,cumulative_scoring_goal_last_touch_position_z:0,last_scoring_goal_last_touch_position:null,kickoff_goal_count:0,short_goal_count:0,medium_goal_count:0,long_goal_count:0,counter_attack_goal_count:0,sustained_pressure_goal_count:0,other_buildup_goal_count:0},backboard:{count:0,is_last_backboard:!1,last_backboard_time:null,last_backboard_frame:null,time_since_last_backboard:null,frames_since_last_backboard:null},ceiling_shot:{count:0,high_confidence_count:0,is_last_ceiling_shot:!1,last_ceiling_shot_time:null,last_ceiling_shot_frame:null,time_since_last_ceiling_shot:null,frames_since_last_ceiling_shot:null,last_confidence:null,best_confidence:0,cumulative_confidence:0},double_tap:{count:0,is_last_double_tap:!1,last_double_tap_time:null,last_double_tap_frame:null,time_since_last_double_tap:null,frames_since_last_double_tap:null},one_timer:{count:0,total_ball_speed:0,fastest_ball_speed:0,total_pass_distance:0,is_last_one_timer:!1,last_one_timer_time:null,last_one_timer_frame:null,time_since_last_one_timer:null,frames_since_last_one_timer:null},pass:{completed_pass_count:0,received_pass_count:0,total_pass_distance:0,total_pass_advance:0,longest_pass_distance:0,is_last_completed_pass:!1,last_completed_pass_time:null,last_completed_pass_frame:null,time_since_last_completed_pass:null,frames_since_last_completed_pass:null},fifty_fifty:{count:0,wins:0,losses:0,neutral_outcomes:0,kickoff_count:0,kickoff_wins:0,kickoff_losses:0,kickoff_neutral_outcomes:0,possession_after_count:0,kickoff_possession_after_count:0},speed_flip:{count:0,high_confidence_count:0,is_last_speed_flip:!1,last_speed_flip_time:null,last_speed_flip_frame:null,time_since_last_speed_flip:null,frames_since_last_speed_flip:null,last_quality:null,best_quality:0,cumulative_quality:0},half_flip:{count:0,high_confidence_count:0,is_last_half_flip:!1,last_half_flip_time:null,last_half_flip_frame:null,time_since_last_half_flip:null,frames_since_last_half_flip:null,last_quality:null,best_quality:0,cumulative_quality:0},wavedash:{count:0,high_confidence_count:0,is_last_wavedash:!1,last_wavedash_time:null,last_wavedash_frame:null,time_since_last_wavedash:null,frames_since_last_wavedash:null,last_quality:null,best_quality:0,cumulative_quality:0},touch:{touch_count:0,dribble_touch_count:0,control_touch_count:0,medium_hit_count:0,hard_hit_count:0,aerial_touch_count:0,high_aerial_touch_count:0,is_last_touch:!1,last_touch_time:null,last_touch_frame:null,time_since_last_touch:null,frames_since_last_touch:null,last_ball_speed_change:null,max_ball_speed_change:0,cumulative_ball_speed_change:0,total_ball_travel_distance:0,total_ball_advance_distance:0,total_ball_retreat_distance:0,labeled_touch_counts:{entries:[]}},whiff:{whiff_count:0,grounded_whiff_count:0,aerial_whiff_count:0,dodge_whiff_count:0,is_last_whiff:!1,last_whiff_time:null,last_whiff_frame:null,time_since_last_whiff:null,frames_since_last_whiff:null,last_closest_approach_distance:null,best_closest_approach_distance:null,cumulative_closest_approach_distance:0},flick:{count:0,high_confidence_count:0,is_last_flick:!1,last_flick_time:null,last_flick_frame:null,time_since_last_flick:null,frames_since_last_flick:null,last_confidence:null,best_confidence:0,cumulative_confidence:0,cumulative_setup_duration:0,cumulative_ball_speed_change:0},musty_flick:{count:0,aerial_count:0,high_confidence_count:0,is_last_musty:!1,last_musty_time:null,last_musty_frame:null,time_since_last_musty:null,frames_since_last_musty:null,last_confidence:null,best_confidence:0,cumulative_confidence:0},dodge_reset:{count:0,on_ball_count:0},ball_carry:{carry_count:0,total_carry_time:0,total_straight_line_distance:0,total_path_distance:0,longest_carry_time:0,furthest_carry_distance:0,fastest_carry_speed:0,carry_speed_sum:0,average_horizontal_gap_sum:0,average_vertical_gap_sum:0},air_dribble:{count:0,total_time:0,total_straight_line_distance:0,total_path_distance:0,longest_time:0,furthest_distance:0,fastest_speed:0,speed_sum:0,average_horizontal_gap_sum:0,average_vertical_gap_sum:0},boost:Co().boost,movement:Co().movement,positioning:{active_game_time:0,tracked_time:0,sum_distance_to_teammates:0,sum_distance_to_ball:0,sum_distance_to_ball_has_possession:0,time_has_possession:0,sum_distance_to_ball_no_possession:0,time_no_possession:0,time_demolished:0,time_no_teammates:0,time_most_back:0,time_most_forward:0,time_mid_role:0,time_other_role:0,time_defensive_third:0,time_neutral_third:0,time_offensive_third:0,time_defensive_half:0,time_offensive_half:0,time_closest_to_ball:0,time_farthest_from_ball:0,time_behind_ball:0,time_level_with_ball:0,time_in_front_of_ball:0,times_caught_ahead_of_play_on_conceded_goals:0},powerslide:{total_duration:0,press_count:0},demo:{demos_inflicted:0,demos_taken:0}})}const XA=new Set(["player_id","name","is_team_0"]);function qA(n){return n===null||typeof n=="number"||typeof n=="string"||typeof n=="boolean"||Array.isArray(n)}function YA(n,e){let t=n;for(const i of e){if(!t||typeof t!="object"||Array.isArray(t))return;t=t[i]}return t}function ZA(n){return n==null?"--":typeof n=="number"?Number.isFinite(n)?Number.isInteger(n)?`${n}`:`${Number(n.toFixed(3))}`:"--":typeof n=="boolean"?n?"true":"false":Array.isArray(n)?n.length===0?"[]":JSON.stringify(n):`${n}`}function mu(n,e,t,i){if(!(!n||typeof n!="object"||Array.isArray(n)))for(const[s,a]of Object.entries(n)){if(e==="player"&&t.length===0&&XA.has(s))continue;const r=[...t,s];if(qA(a)){const o=`${e}:${r.join(".")}`;i.push({id:o,label:r.join("."),category:r[0]??e,scope:e,path:r,read(l){return YA(l,r)},format:ZA});continue}mu(a,e,r,i)}}function KA(n){const e=new Set;return n.filter(t=>e.has(t.id)?!1:(e.add(t.id),!0))}function tg(n,e){const t=[];return n&&mu(n,"player",[],t),e&&mu(e,"team",[],t),KA(t).sort((i,s)=>i.label.localeCompare(s.label))}function jA(){return tg(eg(),Co())}function Ro(n){return n?tg(n.players[0]??eg(),n.team_zero??n.team_one??Co()):jA()}function ng(n){return n.toLowerCase().replace(/[_/.-]+/g," ").replace(/\s+/g," ").trim()}function JA(n){return ng(n).split(" ").filter(Boolean)}function QA(n,e){const t=JA(e);if(t.length===0)return 0;const i=ng([n.scope,n.category,n.label,n.id,...n.path].join(" "));let s=0;for(const a of t){const r=i.indexOf(a);if(r<0)return null;s+=r}return s+i.length/1e3}function eC(n,e){return n.map((t,i)=>({definition:t,index:i,score:QA(t,e)})).filter(t=>t.score!==null).sort((t,i)=>t.score-i.score||t.index-i.index).map(t=>t.definition)}var Ut=Uint8Array,on=Uint16Array,pd=Int32Array,Ko=new Ut([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),jo=new Ut([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),gu=new Ut([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),ig=function(n,e){for(var t=new on(31),i=0;i<31;++i)t[i]=e+=1<<n[i-1];for(var s=new pd(t[30]),i=1;i<30;++i)for(var a=t[i];a<t[i+1];++a)s[a]=a-t[i]<<5|i;return{b:t,r:s}},sg=ig(Ko,2),ag=sg.b,_u=sg.r;ag[28]=258,_u[258]=28;var rg=ig(jo,0),tC=rg.b,Hf=rg.r,vu=new on(32768);for(var ft=0;ft<32768;++ft){var pi=(ft&43690)>>1|(ft&21845)<<1;pi=(pi&52428)>>2|(pi&13107)<<2,pi=(pi&61680)>>4|(pi&3855)<<4,vu[ft]=((pi&65280)>>8|(pi&255)<<8)>>1}var zn=(function(n,e,t){for(var i=n.length,s=0,a=new on(e);s<i;++s)n[s]&&++a[n[s]-1];var r=new on(e);for(s=1;s<e;++s)r[s]=r[s-1]+a[s-1]<<1;var o;if(t){o=new on(1<<e);var l=15-e;for(s=0;s<i;++s)if(n[s])for(var c=s<<4|n[s],u=e-n[s],d=r[n[s]-1]++<<u,h=d|(1<<u)-1;d<=h;++d)o[vu[d]>>l]=c}else for(o=new on(i),s=0;s<i;++s)n[s]&&(o[s]=vu[r[n[s]-1]++]>>15-n[s]);return o}),Ri=new Ut(288);for(var ft=0;ft<144;++ft)Ri[ft]=8;for(var ft=144;ft<256;++ft)Ri[ft]=9;for(var ft=256;ft<280;++ft)Ri[ft]=7;for(var ft=280;ft<288;++ft)Ri[ft]=8;var Ya=new Ut(32);for(var ft=0;ft<32;++ft)Ya[ft]=5;var nC=zn(Ri,9,0),iC=zn(Ri,9,1),sC=zn(Ya,5,0),aC=zn(Ya,5,1),lc=function(n){for(var e=n[0],t=1;t<n.length;++t)n[t]>e&&(e=n[t]);return e},wn=function(n,e,t){var i=e/8|0;return(n[i]|n[i+1]<<8)>>(e&7)&t},cc=function(n,e){var t=e/8|0;return(n[t]|n[t+1]<<8|n[t+2]<<16)>>(e&7)},md=function(n){return(n+7)/8|0},Jo=function(n,e,t){return(e==null||e<0)&&(e=0),(t==null||t>n.length)&&(t=n.length),new Ut(n.subarray(e,t))},rC=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],Un=function(n,e,t){var i=new Error(e||rC[n]);if(i.code=n,Error.captureStackTrace&&Error.captureStackTrace(i,Un),!t)throw i;return i},oC=function(n,e,t,i){var s=n.length,a=0;if(!s||e.f&&!e.l)return t||new Ut(0);var r=!t,o=r||e.i!=2,l=e.i;r&&(t=new Ut(s*3));var c=function(Ge){var bt=t.length;if(Ge>bt){var I=new Ut(Math.max(bt*2,Ge));I.set(t),t=I}},u=e.f||0,d=e.p||0,h=e.b||0,f=e.l,g=e.d,_=e.m,m=e.n,p=s*8;do{if(!f){u=wn(n,d,1);var w=wn(n,d+1,3);if(d+=3,w)if(w==1)f=iC,g=aC,_=9,m=5;else if(w==2){var T=wn(n,d,31)+257,E=wn(n,d+10,15)+4,A=T+wn(n,d+5,31)+1;d+=14;for(var y=new Ut(A),b=new Ut(19),C=0;C<E;++C)b[gu[C]]=wn(n,d+C*3,7);d+=E*3;for(var N=lc(b),z=(1<<N)-1,V=zn(b,N,1),C=0;C<A;){var G=V[wn(n,d,z)];d+=G&15;var S=G>>4;if(S<16)y[C++]=S;else{var B=0,U=0;for(S==16?(U=3+wn(n,d,3),d+=2,B=y[C-1]):S==17?(U=3+wn(n,d,7),d+=3):S==18&&(U=11+wn(n,d,127),d+=7);U--;)y[C++]=B}}var O=y.subarray(0,T),Z=y.subarray(T);_=lc(O),m=lc(Z),f=zn(O,_,1),g=zn(Z,m,1)}else Un(1);else{var S=md(d)+4,v=n[S-4]|n[S-3]<<8,R=S+v;if(R>s){l&&Un(0);break}o&&c(h+v),t.set(n.subarray(S,R),h),e.b=h+=v,e.p=d=R*8,e.f=u;continue}if(d>p){l&&Un(0);break}}o&&c(h+131072);for(var Q=(1<<_)-1,se=(1<<m)-1,ge=d;;ge=d){var B=f[cc(n,d)&Q],Me=B>>4;if(d+=B&15,d>p){l&&Un(0);break}if(B||Un(2),Me<256)t[h++]=Me;else if(Me==256){ge=d,f=null;break}else{var he=Me-254;if(Me>264){var C=Me-257,_e=Ko[C];he=wn(n,d,(1<<_e)-1)+ag[C],d+=_e}var X=g[cc(n,d)&se],K=X>>4;X||Un(3),d+=X&15;var Z=tC[K];if(K>3){var _e=jo[K];Z+=cc(n,d)&(1<<_e)-1,d+=_e}if(d>p){l&&Un(0);break}o&&c(h+131072);var pe=h+he;if(h<Z){var xe=a-Z,Se=Math.min(Z,pe);for(xe+h<0&&Un(3);h<Se;++h)t[h]=i[xe+h]}for(;h<pe;++h)t[h]=t[h-Z]}}e.l=f,e.p=ge,e.b=h,e.f=u,f&&(u=1,e.m=_,e.d=g,e.n=m)}while(!u);return h!=t.length&&r?Jo(t,0,h):t.subarray(0,h)},jn=function(n,e,t){t<<=e&7;var i=e/8|0;n[i]|=t,n[i+1]|=t>>8},ga=function(n,e,t){t<<=e&7;var i=e/8|0;n[i]|=t,n[i+1]|=t>>8,n[i+2]|=t>>16},uc=function(n,e){for(var t=[],i=0;i<n.length;++i)n[i]&&t.push({s:i,f:n[i]});var s=t.length,a=t.slice();if(!s)return{t:lg,l:0};if(s==1){var r=new Ut(t[0].s+1);return r[t[0].s]=1,{t:r,l:1}}t.sort(function(R,T){return R.f-T.f}),t.push({s:-1,f:25001});var o=t[0],l=t[1],c=0,u=1,d=2;for(t[0]={s:-1,f:o.f+l.f,l:o,r:l};u!=s-1;)o=t[t[c].f<t[d].f?c++:d++],l=t[c!=u&&t[c].f<t[d].f?c++:d++],t[u++]={s:-1,f:o.f+l.f,l:o,r:l};for(var h=a[0].s,i=1;i<s;++i)a[i].s>h&&(h=a[i].s);var f=new on(h+1),g=yu(t[u-1],f,0);if(g>e){var i=0,_=0,m=g-e,p=1<<m;for(a.sort(function(T,E){return f[E.s]-f[T.s]||T.f-E.f});i<s;++i){var w=a[i].s;if(f[w]>e)_+=p-(1<<g-f[w]),f[w]=e;else break}for(_>>=m;_>0;){var S=a[i].s;f[S]<e?_-=1<<e-f[S]++-1:++i}for(;i>=0&&_;--i){var v=a[i].s;f[v]==e&&(--f[v],++_)}g=e}return{t:new Ut(f),l:g}},yu=function(n,e,t){return n.s==-1?Math.max(yu(n.l,e,t+1),yu(n.r,e,t+1)):e[n.s]=t},Vf=function(n){for(var e=n.length;e&&!n[--e];);for(var t=new on(++e),i=0,s=n[0],a=1,r=function(l){t[i++]=l},o=1;o<=e;++o)if(n[o]==s&&o!=e)++a;else{if(!s&&a>2){for(;a>138;a-=138)r(32754);a>2&&(r(a>10?a-11<<5|28690:a-3<<5|12305),a=0)}else if(a>3){for(r(s),--a;a>6;a-=6)r(8304);a>2&&(r(a-3<<5|8208),a=0)}for(;a--;)r(s);a=1,s=n[o]}return{c:t.subarray(0,i),n:e}},_a=function(n,e){for(var t=0,i=0;i<e.length;++i)t+=n[i]*e[i];return t},og=function(n,e,t){var i=t.length,s=md(e+2);n[s]=i&255,n[s+1]=i>>8,n[s+2]=n[s]^255,n[s+3]=n[s+1]^255;for(var a=0;a<i;++a)n[s+a+4]=t[a];return(s+4+i)*8},Gf=function(n,e,t,i,s,a,r,o,l,c,u){jn(e,u++,t),++s[256];for(var d=uc(s,15),h=d.t,f=d.l,g=uc(a,15),_=g.t,m=g.l,p=Vf(h),w=p.c,S=p.n,v=Vf(_),R=v.c,T=v.n,E=new on(19),A=0;A<w.length;++A)++E[w[A]&31];for(var A=0;A<R.length;++A)++E[R[A]&31];for(var y=uc(E,7),b=y.t,C=y.l,N=19;N>4&&!b[gu[N-1]];--N);var z=c+5<<3,V=_a(s,Ri)+_a(a,Ya)+r,G=_a(s,h)+_a(a,_)+r+14+3*N+_a(E,b)+2*E[16]+3*E[17]+7*E[18];if(l>=0&&z<=V&&z<=G)return og(e,u,n.subarray(l,l+c));var B,U,O,Z;if(jn(e,u,1+(G<V)),u+=2,G<V){B=zn(h,f,0),U=h,O=zn(_,m,0),Z=_;var Q=zn(b,C,0);jn(e,u,S-257),jn(e,u+5,T-1),jn(e,u+10,N-4),u+=14;for(var A=0;A<N;++A)jn(e,u+3*A,b[gu[A]]);u+=3*N;for(var se=[w,R],ge=0;ge<2;++ge)for(var Me=se[ge],A=0;A<Me.length;++A){var he=Me[A]&31;jn(e,u,Q[he]),u+=b[he],he>15&&(jn(e,u,Me[A]>>5&127),u+=Me[A]>>12)}}else B=nC,U=Ri,O=sC,Z=Ya;for(var A=0;A<o;++A){var _e=i[A];if(_e>255){var he=_e>>18&31;ga(e,u,B[he+257]),u+=U[he+257],he>7&&(jn(e,u,_e>>23&31),u+=Ko[he]);var X=_e&31;ga(e,u,O[X]),u+=Z[X],X>3&&(ga(e,u,_e>>5&8191),u+=jo[X])}else ga(e,u,B[_e]),u+=U[_e]}return ga(e,u,B[256]),u+U[256]},lC=new pd([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),lg=new Ut(0),cC=function(n,e,t,i,s,a){var r=a.z||n.length,o=new Ut(i+r+5*(1+Math.ceil(r/7e3))+s),l=o.subarray(i,o.length-s),c=a.l,u=(a.r||0)&7;if(e){u&&(l[0]=a.r>>3);for(var d=lC[e-1],h=d>>13,f=d&8191,g=(1<<t)-1,_=a.p||new on(32768),m=a.h||new on(g+1),p=Math.ceil(t/3),w=2*p,S=function(it){return(n[it]^n[it+1]<<p^n[it+2]<<w)&g},v=new pd(25e3),R=new on(288),T=new on(32),E=0,A=0,y=a.i||0,b=0,C=a.w||0,N=0;y+2<r;++y){var z=S(y),V=y&32767,G=m[z];if(_[V]=G,m[z]=V,C<=y){var B=r-y;if((E>7e3||b>24576)&&(B>423||!c)){u=Gf(n,l,0,v,R,T,A,b,N,y-N,u),b=E=A=0,N=y;for(var U=0;U<286;++U)R[U]=0;for(var U=0;U<30;++U)T[U]=0}var O=2,Z=0,Q=f,se=V-G&32767;if(B>2&&z==S(y-se))for(var ge=Math.min(h,B)-1,Me=Math.min(32767,y),he=Math.min(258,B);se<=Me&&--Q&&V!=G;){if(n[y+O]==n[y+O-se]){for(var _e=0;_e<he&&n[y+_e]==n[y+_e-se];++_e);if(_e>O){if(O=_e,Z=se,_e>ge)break;for(var X=Math.min(se,_e-2),K=0,U=0;U<X;++U){var pe=y-se+U&32767,xe=_[pe],Se=pe-xe&32767;Se>K&&(K=Se,G=pe)}}}V=G,G=_[V],se+=V-G&32767}if(Z){v[b++]=268435456|_u[O]<<18|Hf[Z];var Ge=_u[O]&31,bt=Hf[Z]&31;A+=Ko[Ge]+jo[bt],++R[257+Ge],++T[bt],C=y+O,++E}else v[b++]=n[y],++R[n[y]]}}for(y=Math.max(y,C);y<r;++y)v[b++]=n[y],++R[n[y]];u=Gf(n,l,c,v,R,T,A,b,N,y-N,u),c||(a.r=u&7|l[u/8|0]<<3,u-=7,a.h=m,a.p=_,a.i=y,a.w=C)}else{for(var y=a.w||0;y<r+c;y+=65535){var I=y+65535;I>=r&&(l[u/8|0]=c,I=r),u=og(l,u+1,n.subarray(y,I))}a.i=r}return Jo(o,0,i+md(u)+s)},uC=function(n,e,t,i,s){if(!s&&(s={l:1},e.dictionary)){var a=e.dictionary.subarray(-32768),r=new Ut(a.length+n.length);r.set(a),r.set(n,a.length),n=r,s.w=a.length}return cC(n,e.level==null?6:e.level,e.mem==null?s.l?Math.ceil(Math.max(8,Math.min(13,Math.log(n.length)))*1.5):20:12+e.mem,t,i,s)};function dC(n,e){return uC(n,e||{},0,0)}function cg(n,e){return oC(n,{i:2},e,e)}var Wf=typeof TextEncoder<"u"&&new TextEncoder,bu=typeof TextDecoder<"u"&&new TextDecoder,hC=0;try{bu.decode(lg,{stream:!0}),hC=1}catch{}var fC=function(n){for(var e="",t=0;;){var i=n[t++],s=(i>127)+(i>223)+(i>239);if(t+s>n.length)return{s:e,r:Jo(n,t-1)};s?s==3?(i=((i&15)<<18|(n[t++]&63)<<12|(n[t++]&63)<<6|n[t++]&63)-65536,e+=String.fromCharCode(55296|i>>10,56320|i&1023)):s&1?e+=String.fromCharCode((i&31)<<6|n[t++]&63):e+=String.fromCharCode((i&15)<<12|(n[t++]&63)<<6|n[t++]&63):e+=String.fromCharCode(i)}};function pC(n,e){var t;if(Wf)return Wf.encode(n);for(var i=n.length,s=new Ut(n.length+(n.length>>1)),a=0,r=function(c){s[a++]=c},t=0;t<i;++t){if(a+5>s.length){var o=new Ut(a+8+(i-t<<1));o.set(s),s=o}var l=n.charCodeAt(t);l<128||e?r(l):l<2048?(r(192|l>>6),r(128|l&63)):l>55295&&l<57344?(l=65536+(l&1047552)|n.charCodeAt(++t)&1023,r(240|l>>18),r(128|l>>12&63),r(128|l>>6&63),r(128|l&63)):(r(224|l>>12),r(128|l>>6&63),r(128|l&63))}return Jo(s,0,a)}function ug(n,e){var t;if(bu)return bu.decode(n);var i=fC(n),s=i.s,t=i.r;return t.length&&Un(8),s}const mC=["replayUrl","replay_url","replay"],gC=["r","replayUrlZ","replay_url_z"],_C=["ballchasing","ballchasingId","ballchasingUuid","ballchasingReplay"];function vC(n){const e=n.replaceAll("-","+").replaceAll("_","/"),t=e.padEnd(Math.ceil(e.length/4)*4,"="),i=atob(t),s=new Uint8Array(i.length);for(let a=0;a<i.length;a+=1)s[a]=i.charCodeAt(a);return s}function yC(n){try{return ug(cg(vC(n)))}catch(e){throw new Error(`Invalid compressed replay URL: ${e instanceof Error?e.message:String(e)}`)}}function bC(n,e){const t=new URLSearchParams(n);for(const i of mC){const s=t.get(i)?.trim();if(!s)continue;const a=new URL(s,e);if(a.protocol!=="http:"&&a.protocol!=="https:")throw new Error(`Unsupported replay URL protocol: ${a.protocol}`);return a}for(const i of gC){const s=t.get(i)?.trim();if(!s)continue;const a=new URL(yC(s),e);if(a.protocol!=="http:"&&a.protocol!=="https:")throw new Error(`Unsupported replay URL protocol: ${a.protocol}`);return a}return null}function xC(n,e){for(const t of e){const i=n.get(t)?.trim();if(i)return i}return null}function SC(n,e){const t=new URLSearchParams(n),i=xC(t,_C);if(i){const a=ld(i);return{kind:"ballchasing",url:EM(a),name:MM(a),fetchInit:{method:"POST"}}}const s=bC(n,e);return s?{kind:"url",url:s,name:wC(s)}:null}function wC(n){const t=n.pathname.replace(/\/+$/,"").split("/").pop();if(!t)return n.hostname||"remote replay";try{return decodeURIComponent(t)}catch{return t}}const xu=1,Su="cfg",$f="cfgDebug";function MC(n){let e="";for(const t of n)e+=String.fromCharCode(t);return btoa(e).replaceAll("+","-").replaceAll("/","_").replace(/=+$/,"")}function EC(n){const e=n.replaceAll("-","+").replaceAll("_","/"),t=e.padEnd(Math.ceil(e.length/4)*4,"="),i=atob(t),s=new Uint8Array(i.length);for(let a=0;a<i.length;a+=1)s[a]=i.charCodeAt(a);return s}function TC(n){return MC(dC(pC(JSON.stringify(n)),{level:9}))}function AC(n){let e;try{e=JSON.parse(ug(cg(EC(n))))}catch(t){throw new Error(`Invalid stats player config: ${t instanceof Error?t.message:String(t)}`)}return IC(e)}function CC(n){const e=dg(n);return e.selectedValue?AC(e.selectedValue):null}function dg(n){const e=new URLSearchParams(gd(n.hash)),t=new URLSearchParams(n.search),i=e.getAll(Su),s=t.getAll(Su),a=i[0]?"hash":s[0]?"search":null,r=a==="hash"?i[0]:a==="search"?s[0]:null;return{search:n.search,hash:n.hash,searchParams:[...t.entries()],hashParams:[...e.entries()],searchValues:s,hashValues:i,selectedSource:a,selectedValue:r}}function RC(n){const e=new URLSearchParams(n.search),t=new URLSearchParams(gd(n.hash)),i=e.get($f)??t.get($f);return i===""||i==="1"||i==="true"}function PC(n,e){const t=new URL(n.href),i=new URLSearchParams(gd(t.hash));return i.set(Su,TC(e)),t.hash=i.toString(),t}function gd(n){return n.startsWith("#")?n.slice(1):n}function LC(n,e,t=120,i=100){const s=Po(n.viewport.width)??e.width,a=Po(n.viewport.height)??e.height,r=e.width/Math.max(1,s),o=e.height/Math.max(1,a),l=Math.max(8,e.width-t),c=Math.max(8,e.height-i);return{x:Xf(n.x*r,8,l),y:Xf(n.y*o,8,c)}}function IC(n){if(!vn(n)||n.version!==xu)throw new Error("Unsupported stats player config version");return{version:xu,playback:DC(n.playback),camera:UC(n.camera),overlays:OC(n.overlays),recording:NC(n.recording),singletonWindows:kC(n.singletonWindows),statsWindows:BC(n.statsWindows),moduleConfigs:vn(n.moduleConfigs)?n.moduleConfigs:{}}}function NC(n){return vn(n)?{fps:Bt(n.fps),playbackRate:Bt(n.playbackRate)}:{}}function DC(n){return vn(n)?{currentTime:Bt(n.currentTime),rate:Bt(n.rate),skipPostGoalTransitions:Ji(n.skipPostGoalTransitions),skipKickoffs:Ji(n.skipKickoffs)}:{}}function UC(n){if(!vn(n))return{};const e={},t=n.mode==="follow"?"follow":n.mode==="free"?"free":void 0,i=n.freePreset==="overhead"?"overhead":n.freePreset==="side"?"side":n.freePreset===null?null:void 0,s=fg(n.attachedPlayerId),a=Bt(n.distanceScale),r=Ji(n.ballCam),o=FC(n.customSettings);return t!==void 0&&(e.mode=t),i!==void 0&&(e.freePreset=i),s!==void 0&&(e.attachedPlayerId=s),a!==void 0&&(e.distanceScale=a),r!==void 0&&(e.ballCam=r),o!==void 0&&(e.customSettings=o),e}function FC(n){if(n===null)return null;if(!vn(n))return;const e={},t=Bt(n.fov),i=Bt(n.height),s=Bt(n.pitch),a=Bt(n.distance),r=Bt(n.stiffness),o=Bt(n.swivelSpeed),l=Bt(n.transitionSpeed);return t!==void 0&&(e.fov=t),i!==void 0&&(e.height=i),s!==void 0&&(e.pitch=s),a!==void 0&&(e.distance=a),r!==void 0&&(e.stiffness=r),o!==void 0&&(e.swivelSpeed=o),l!==void 0&&(e.transitionSpeed=l),e}function OC(n){const e=vn(n)?n:{};return{timelineEvents:qr(e.timelineEvents),timelineRanges:qr(e.timelineRanges),mechanics:qr(e.mechanics),renderEffects:qr(e.renderEffects),followedPlayerHud:Ji(e.followedPlayerHud)??!1,boostPads:Ji(e.boostPads)??!0,boostPickupAnimation:Ji(e.boostPickupAnimation)??!1}}function kC(n){return Array.isArray(n)?n.map(e=>!vn(e)||!HC(e.id)?null:{id:e.id,placement:hg(e.placement)}).filter(e=>e!==null):[]}function BC(n){return Array.isArray(n)?n.map(e=>!vn(e)||typeof e.id!="string"||!VC(e.kind)?null:{id:e.id,kind:e.kind,placement:hg(e.placement),playerId:fg(e.playerId)??null,team:e.team==="orange"?"orange":e.team==="blue"?"blue":null,entries:zC(e.entries)}).filter(e=>e!==null):[]}function zC(n){return Array.isArray(n)?n.map(e=>!vn(e)||typeof e.statId!="string"?null:{statId:e.statId,targetId:typeof e.targetId=="string"?e.targetId:void 0}).filter(e=>e!==null):[]}function hg(n){const e=vn(n)?n:{},t=vn(e.viewport)?e.viewport:{};return{x:Bt(e.x)??8,y:Bt(e.y)??8,viewport:{width:Po(t.width)??1,height:Po(t.height)??1},zIndex:Bt(e.zIndex),visible:Ji(e.visible)??!0}}function HC(n){return n==="camera"||n==="playback"||n==="recording"||n==="mechanics"||n==="mechanics-review"||n==="boost-pickups"||n==="touch-controls"}function VC(n){return n==="player"||n==="team"||n==="all-players"||n==="all-teams"||n==="mechanics-overview"||n==="goals-overview"||n==="ad-hoc"}function vn(n){return typeof n=="object"&&n!==null&&!Array.isArray(n)}function Bt(n){return typeof n=="number"&&Number.isFinite(n)?n:void 0}function Po(n){const e=Bt(n);return e!==void 0&&e>0?e:void 0}function Ji(n){return typeof n=="boolean"?n:void 0}function fg(n){return n===null?null:typeof n=="string"?n:void 0}function qr(n){return Array.isArray(n)?n.filter(e=>typeof e=="string"):[]}function Xf(n,e,t){return Math.min(t,Math.max(e,n))}const pg=2.25,GC=["free","follow"];let re=null,_n=null,kt=null,$t=null,ss=null,Os=null,Lo=null;const Io=new Map,No=new Map,Ra=new Map,Qo=Zm({refreshTimelineRanges(){$s()},rerenderCurrentState(){re&&re.setBoostPickupAnimationEnabled(re.getState().boostPickupAnimationEnabled)},requestConfigSync(){Ze()}}),el=GA({rerenderCurrentState(){if(!re)return;const n=re.getState();or(n.frameIndex)},refreshTimelineRanges(){$s()},requestConfigSync(){Ze()}},{boostPickupFilters:Qo});let si=[],Ii=new Set,ia=new Set,an=new Set,sa=new Set;const WC=new Set(["ceiling-shot","fifty-fifty","pressure",Xm,"absolute-positioning","speed-flip","touch"]),mg="touch",$C="mechanics:events",XC="mechanics:ranges";let Si=null,Gs,gg,Do,qf,Uo,wu,Yf,Zf,oo,Yr,dc,Kf,Mu,_g,vg,yg,bg,xg,Eu,Tu,Au,Sg,Sa,Cu,lo,Ru,Fo,Qi,wi,Pu,Lu,Pa,La,Ia,wg,vi,Oo,Za,Ka,ja,Ja,Qa,er,tr,Mg,Eg,Tg,Ag,Cg,Rg,Pg,Na,Iu,wa,Lg,Ig,Ng,Dg,mn,Ug,Fg,Nu,co,uo,ho,fo,po,mo,Hn,_i=null,ai,Qs,ea,Du,Uu,Fu,Ou,ku,Og,kg,Bg,zg,Zr=null,es=Ro(null),ko=30,Da=1,ri=!0,Bo=null,ei=null,$i=null,Ws=!1,ji=null;const qC=["camera","playback","recording","mechanics","mechanics-review","boost-pickups","touch-controls"],as=new Map;let Tn=null,go=!1;function YC(){return new Set([...Ii,...ia,...sa])}function Hg(n){return n==="events"?Ii:n==="ranges"?ia:sa}function aa(){return!re||!$t||!ss?null:{player:re,replay:re.replay,statsTimeline:$t,statsFrameLookup:ss,fieldScale:re.options.fieldScale??1}}function tl(){_d();const n=aa();if(!n)return;const e=YC();si=el.filter(t=>e.has(t.id)),Qo.setup(n);for(const t of si)t.setup(n);Lo=n.player.onBeforeRender(t=>{for(const i of si)sa.has(i.id)&&i.onBeforeRender(t)}),_o(),$s()}function _d(){Lo?.(),Lo=null,nl(),il();for(const n of si)n.teardown();si=[]}function ZC(n,e,t){const i=Hg(e);if(t?i.add(n):i.delete(n),tl(),ra(),rs(),re){const s=re.getState();or(s.frameIndex)}Mi(),Ze()}function nl(){for(const n of Io.values())n();Io.clear()}function il(){for(const n of No.values())n();No.clear()}function Vg(){for(const n of Ra.values())n();Ra.clear()}function vd(){Ra.get("boost-pad-overlay")?.(),Ra.delete("boost-pad-overlay"),!(!re||!ri)&&Ra.set("boost-pad-overlay",re.addPlugin(BM()))}function KC(){ri=!ri,vd(),ra(),Ze()}function _o(){nl();const n=aa();if(!_n||!n)return;for(const t of si){if(!Ii.has(t.id))continue;const i=t.getTimelineEvents?.(n);!i||i.length===0||Io.set(t.id,_n.addEventSource(i))}const e=Mm(n.statsTimeline,n.replay,an);e.length>0&&Io.set($C,_n.addEventSource(e)),_n.refreshEvents()}function $s(){il();const n=aa();if(!_n||!n)return;for(const t of si)!ia.has(t.id)||!t.getTimelineRanges||No.set(t.id,_n.addRangeSource(()=>t.getTimelineRanges?.(n)??[]));const e=Gm(n.statsTimeline,n.replay,an);e.length>0&&No.set(XC,_n.addRangeSource(e)),_n.refreshRanges()}function Mi(){if(!re||!$t){Nu.textContent="--";return}const n=Mm($t,re.replay,an).length,e=Gm($t,re.replay,an).length;Nu.textContent=`${i1(Ii,re.replay,$t)+n+e}`}function ae(n,e){const t=n.querySelector(e);if(!(t instanceof HTMLElement))throw new Error(`Missing element for selector: ${e}`);return t}function jC(n){return n.closest("[data-window-id]")?.dataset.windowId??null}function Gg(){return{width:Math.max(1,window.innerWidth),height:Math.max(1,window.innerHeight)}}function jf(n,e){const t=n.style.getPropertyValue(e).trim(),i=getComputedStyle(n).getPropertyValue(e).trim(),s=t||i,a=Number.parseFloat(s);if(Number.isFinite(a))return a;const r=n.getBoundingClientRect();return e==="--window-y"?r.top:r.left}function Wg(n){const e=Number.parseInt(n.style.zIndex,10);return{x:jf(n,"--window-x"),y:jf(n,"--window-y"),viewport:Gg(),zIndex:Number.isFinite(e)?e:void 0,visible:!n.hidden}}function $g(n,e){const t=LC(e,Gg());n.style.setProperty("--window-x",`${t.x}px`),n.style.setProperty("--window-y",`${t.y}px`),n.hidden=!e.visible,e.zIndex!==void 0&&(n.style.zIndex=`${e.zIndex}`,ko=Math.max(ko,e.zIndex+1))}function JC(){const n=[],e=Si??document;for(const t of qC){const i=e.querySelector(`[data-window-id="${t}"]`);i&&n.push({id:t,placement:Wg(i)})}return n}function Xg(){return el.filter(n=>n.getConfig||n.applyConfig).map(n=>{const e={id:n.id};return n.id==="boost"&&(e.aliases=["boost-pickup-animation"]),n.getConfig&&(e.getConfig=()=>n.getConfig?.()),n.applyConfig&&(e.applyConfig=t=>n.applyConfig?.(t)),e})}function QC(){return WA(Xg())}function eR(n){$A(Xg(),n)}function tR(n){return{id:n.id,kind:n.kind,placement:Wg(n.element),playerId:n.playerId,team:n.team,entries:n.entries.map(e=>({statId:e.statId,targetId:e.targetId}))}}function nR(){const n=re?.getState();return{currentTime:n?.currentTime,rate:n?.speed??Number(Qi?.value??1),skipPostGoalTransitions:re?n?.skipPostGoalTransitionsEnabled:Hn.checked,skipKickoffs:re?n?.skipKickoffsEnabled:ai.checked}}function iR(){const n=re?.getState();return{mode:n?.cameraViewMode,freePreset:ei,attachedPlayerId:n?.attachedPlayerId,distanceScale:n?.cameraDistanceScale,ballCam:n?.ballCamEnabled,customSettings:n?.customCameraSettings}}function sR(){return{fps:Number(Qs?.value),playbackRate:Number(ea?.value)}}function aR(){return{version:xu,playback:nR(),camera:iR(),overlays:{timelineEvents:[...Ii],timelineRanges:[...ia],mechanics:[...an],renderEffects:[...sa],followedPlayerHud:!1,boostPads:ri,boostPickupAnimation:re?.getState().boostPickupAnimationEnabled??!1},recording:sR(),singletonWindows:JC(),statsWindows:[...as.values()].map(tR),moduleConfigs:QC()}}function Ze(){Ws||(ji!==null&&window.clearTimeout(ji),ji=window.setTimeout(()=>{ji=null;const n=PC(new URL(window.location.href),aR());window.history.replaceState(window.history.state,"",n)},150))}function rR(n,e,t){console.groupCollapsed("[subtr-actor] stats player cfg load"),console.log("location.href",window.location.href),console.log("location.search",n.search||"(empty)"),console.log("location.hash",n.hash||"(empty)"),console.table([...n.searchParams.map(([i,s])=>({source:"search",name:i,value:s})),...n.hashParams.map(([i,s])=>({source:"hash",name:i,value:s}))]),console.log("cfg selected source",n.selectedSource??"(none)"),console.log("cfg selected raw text",n.selectedValue??"(none)"),console.log("cfg selected raw length",n.selectedValue?.length??0),console.log("cfg search values",n.searchValues),console.log("cfg hash values",n.hashValues),n.hashValues.length>0&&n.searchValues.length>0&&console.warn("Both hash and search contain cfg; hash cfg is used."),e&&(console.log("cfg normalized JSON",JSON.stringify(e,null,2)),console.log("cfg normalized object",e)),t&&console.error("cfg decode/apply error",t),console.groupEnd()}function oR(n){const e=Si??document;for(const t of n.singletonWindows){const i=e.querySelector(`[data-window-id="${t.id}"]`);i&&$g(i,t.placement)}}function lR(n){Ii=new Set(n.overlays.timelineEvents),ia=new Set(n.overlays.timelineRanges),an=new Set(n.overlays.mechanics),sa=new Set(n.overlays.renderEffects),ri=n.overlays.boostPads,Hn.checked=n.playback.skipPostGoalTransitions??Hn.checked,ai.checked=n.playback.skipKickoffs??ai.checked,n.playback.rate!==void 0&&(Qi.value=`${n.playback.rate}`),n.recording.fps!==void 0&&(Qs.value=`${n.recording.fps}`),n.recording.playbackRate!==void 0&&(ea.value=`${n.recording.playbackRate}`),eR(n.moduleConfigs),oR(n),RR(n.statsWindows),ra(),rs(),Mi()}function cR(n,e,t){return{currentTime:n.currentTime,speed:n.rate,cameraDistanceScale:e.distanceScale,customCameraSettings:e.customSettings,cameraViewMode:e.mode,attachedPlayerId:e.attachedPlayerId,ballCamEnabled:e.ballCam,boostPickupAnimationEnabled:t.overlays.boostPickupAnimation,skipPostGoalTransitionsEnabled:n.skipPostGoalTransitions,skipKickoffsEnabled:n.skipKickoffs}}function uR(n){re&&(re.setState(cR(n.playback,n.camera,n)),ei=n.camera.freePreset??null,n.camera.mode==="free"&&n.camera.freePreset&&re.setFreeCameraPreset(n.camera.freePreset),vd(),tl(),ra(),rs(),or(re.getState().frameIndex))}function sl(n){n.style.zIndex=`${ko++}`}function dR(n){const e=ae(Si??document,`[data-window-id="${n}"]`);e.hidden=!1,sl(e),Ze()}function hR(n){const e=ae(Si??document,`[data-window-id="${n}"]`);e.hidden=!e.hidden,e.hidden||sl(e),Ze()}function fR(n){const e=ae(Si??document,`[data-window-id="${n}"]`);e.hidden=!0,Ze()}function Ua(n){wu.hidden=!n,Uo.setAttribute("aria-label",n?"Close menu":"Open menu"),Uo.setAttribute("aria-expanded",n?"true":"false")}function Jf(){Gs.click(),Ua(!1)}function pR(n){return n instanceof Element&&!!n.closest("button, input, select, textarea, option, label, a, [data-no-drag]")}function Qf(n,e){n.addEventListener("pointerdown",t=>{if(!(t.target instanceof HTMLElement)||pR(t.target))return;const i=t.target.closest("[data-window-id]");if(!i||i.hidden)return;sl(i);const s=t.clientX,a=t.clientY,r=i.getBoundingClientRect(),o=t.pointerId;i.setPointerCapture(o),t.preventDefault();const l=u=>{const d=Math.max(8,Math.min(window.innerWidth-120,r.left+u.clientX-s)),h=Math.max(8,Math.min(window.innerHeight-100,r.top+u.clientY-a));i.style.setProperty("--window-x",`${d}px`),i.style.setProperty("--window-y",`${h}px`)},c=()=>{i.releasePointerCapture(o),i.removeEventListener("pointermove",l),i.removeEventListener("pointerup",c),i.removeEventListener("pointercancel",c),Ze()};i.addEventListener("pointermove",l),i.addEventListener("pointerup",c),i.addEventListener("pointercancel",c)},{signal:e})}function ra(){Iu.replaceChildren();const n=[],e=[];for(const c of el){const u=WC.has(c.id);!c.getTimelineEvents&&!c.getTimelineRanges&&!u||(c.getTimelineEvents&&n.push(fc(c.id,hc(c,"events"),"events")),c.getTimelineRanges&&n.push(fc(c.id,hc(c,"ranges"),"ranges")),u&&e.push(fc(c.id,hc(c,"effects"),"effects")))}const t=re?.getState().boostPickupAnimationEnabled??!1,i=document.createElement("button");i.type="button",i.className="module-summary-item",i.dataset.active=t?"true":"false",i.setAttribute("aria-pressed",t?"true":"false"),i.addEventListener("click",()=>{const c=!(re?.getState().boostPickupAnimationEnabled??!1);re?.setBoostPickupAnimationEnabled(c),tl(),ra(),rs(),Ze()});const s=document.createElement("span");s.textContent="Boost pickup animation";const a=document.createElement("strong");a.textContent=t?"On":"Off",i.append(s,a),e.push(i);const r=document.createElement("button");r.type="button",r.className="module-summary-item",r.dataset.active=ri?"true":"false",r.setAttribute("aria-pressed",ri?"true":"false"),r.addEventListener("click",KC);const o=document.createElement("span");o.textContent="Boost pad locations";const l=document.createElement("strong");l.textContent=ri?"On":"Off",r.append(o,l),e.push(r),Iu.append(sp("Timeline visualizations",n),sp("In-game visualizations",e))}function Fa(){oo.replaceChildren();const n=wm($t),e=new Map;for(const u of $t?.events.mechanics??[])e.set(u.kind,(e.get(u.kind)??0)+1);if(n.length===0){const u=document.createElement("p");u.className="stat-window-empty",u.textContent="No mechanic events loaded.",oo.append(u);return}const t=document.createElement("div");t.className="mechanics-actions";const i=document.createElement("button");i.type="button",i.className="module-summary-item",i.addEventListener("click",()=>{an=new Set(n),_o(),$s(),Fa(),Mi(),Ze()});const s=document.createElement("span");s.textContent="All mechanics";const a=document.createElement("strong");a.textContent=`${n.length}`,i.append(s,a);const r=document.createElement("button");r.type="button",r.className="module-summary-item",r.addEventListener("click",()=>{an.clear(),_o(),$s(),Fa(),Mi(),Ze()});const o=document.createElement("span");o.textContent="No mechanics";const l=document.createElement("strong");l.textContent="Off",r.append(o,l),t.append(i,r);const c=document.createElement("div");c.className="module-list mechanics-list";for(const u of n){const d=an.has(u),h=document.createElement("button");h.type="button",h.className="module-summary-item",h.dataset.active=d?"true":"false",h.setAttribute("aria-pressed",d?"true":"false"),h.addEventListener("click",()=>{an.has(u)?an.delete(u):an.add(u),_o(),$s(),Fa(),Mi(),Ze()});const f=document.createElement("span");f.textContent=Ci(u);const g=document.createElement("strong");g.textContent=`${d?"On":"Off"} ${e.get(u)??0}`,h.append(f,g),c.append(h)}oo.append(t,c)}function ti(n){return typeof n=="object"&&n!==null&&!Array.isArray(n)}function ep(n){return ti(n)&&(n.kind==="time"||n.kind==="frame")&&typeof n.value=="number"&&Number.isFinite(n.value)?{kind:n.kind,value:n.value}:null}function mR(n){if(!ti(n)||!Array.isArray(n.items))throw new Error("Review playlist must contain an items array.");const e=n.items.map((i,s)=>{if(!ti(i)||typeof i.replay!="string")throw new Error(`Invalid review item at index ${s}.`);const a=ep(i.start),r=ep(i.end);if(!a||!r)throw new Error(`Review item ${s+1} has invalid start or end.`);return{id:typeof i.id=="string"?i.id:void 0,replay:i.replay,start:a,end:r,label:typeof i.label=="string"?i.label:void 0,meta:ti(i.meta)?i.meta:void 0}}),t=Array.isArray(n.replays)?n.replays.map(i=>!ti(i)||typeof i.id!="string"?null:{id:i.id,path:typeof i.path=="string"?i.path:void 0,label:typeof i.label=="string"?i.label:void 0,locator:ti(i.locator)?i.locator:void 0,meta:ti(i.meta)?i.meta:void 0}).filter(i=>i!==null):void 0;return{label:typeof n.label=="string"?n.label:void 0,replays:t,items:e,playback:n.playback,meta:n.meta}}function qg(n){let e;try{e=JSON.parse(n)}catch(t){throw new Error(`Invalid review playlist JSON: ${t instanceof Error?t.message:String(t)}`)}return mR(e)}function gR(){const n=new URLSearchParams(window.location.search);return n.get("reviewPlaylist")?.trim()||n.get("review")?.trim()||n.get("playlistUrl")?.trim()||null}function Yg(n,e){const t=n.startsWith("path:")?n.slice(5):n;return/^https?:\/\//i.test(t)||t.startsWith("/@fs/")?t:t.startsWith("/")?`/@fs${t}`:e?new URL(t,e).href:t}function Zg(n,e){const t=e.replaysById.get(n.replay);if(t?.path)return t.path;if(ti(t?.locator)&&t.locator.kind==="path"&&typeof t.locator.path=="string")return t.locator.path;if(/^https?:\/\//i.test(n.replay)||n.replay.startsWith("/")||n.replay.startsWith("/@fs/")||n.replay.startsWith("path:"))return n.replay;throw new Error(`Review replay "${n.replay}" does not include a loadable path.`)}function _R(n,e){const t=e.replaysById.get(n.replay),s=(t?.path??Zg(n,e)).replace(/^path:/,"").split("/").filter(Boolean).pop();return t?.label??s??"review replay"}function vR(n,e,t){const i=Zg(n,e),s=Yg(i,e.sourceUrl);return{name:_R(n,e),preparingStatus:"Loading review replay...",async readBytes(){const a=await fetch(s,{signal:t});if(!a.ok){const r=a.statusText?` ${a.statusText}`:"";throw new Error(`Failed to fetch review replay from ${s} (${a.status}${r})`)}return new Uint8Array(await a.arrayBuffer())}}}function tp(n){if(n.kind==="time")return n.value;const e=Math.max(0,Math.trunc(n.value));return re?.replay.frames[e]?.time??re?.replay.frames.at(-1)?.time??0}function Bu(n,e){return n.label??n.meta?.mechanicLabel??`Review item ${e+1}`}function Kg(n){return typeof n.meta?.playerId=="string"?n.meta.playerId:ti(n.meta?.target)&&typeof n.meta.target.playerId=="string"?n.meta.target.playerId:null}function yR(n){if(typeof n.meta?.playerName=="string"&&n.meta.playerName.trim())return n.meta.playerName;const e=Kg(n);return e?re?.replay.players.find(t=>t.id===e)?.name??e:"--"}function np(n){return typeof n.meta?.mechanicLabel=="string"&&n.meta.mechanicLabel.trim()?n.meta.mechanicLabel:typeof n.meta?.mechanic=="string"?Ci(n.meta.mechanic):"--"}function oi(n){Mu&&(Mu.textContent=n)}function nr(){if(!Sa)return;const n=Tn,e=n?.manifest.items??[],t=n?e[n.currentIndex]??null:null,i=e.length>0;if(Sg.textContent=`${e.length} item${e.length===1?"":"s"}`,_g.textContent=i&&n?`${n.currentIndex+1} / ${e.length}`:"0 / 0",vg.textContent=t?Bu(t,n?.currentIndex??0):"No candidate selected",yg.textContent=t?np(t):"--",bg.textContent=t?yR(t):"--",xg.textContent=t?.meta?.reason??"--",Eu.disabled=!n||n.loading||n.currentIndex<=0,Tu.disabled=!n||n.loading||!n.currentClip,Au.disabled=!n||n.loading||n.currentIndex>=e.length-1,Sa.replaceChildren(),!n||e.length===0){const s=document.createElement("p");s.className="stat-window-empty",s.textContent="No review playlist loaded.",Sa.append(s);return}e.forEach((s,a)=>{const r=document.createElement("button");r.type="button",r.className="mechanics-review-item",r.dataset.active=a===n.currentIndex?"true":"false",r.disabled=n.loading,r.addEventListener("click",()=>{zo(a)});const o=document.createElement("span");o.textContent=Bu(s,a);const l=document.createElement("strong");l.textContent=np(s),r.append(o,l),Sa.append(r)})}async function jg(n,e){const t=new Map;for(const i of n.replays??[])t.set(i.id,i);Tn={manifest:n,sourceUrl:e,replaysById:t,currentIndex:0,loading:!1,currentReplayId:null,currentClip:null},oi(n.label?`Loaded ${n.label}.`:"Loaded review playlist."),nr(),n.items.length>0&&await zo(0)}async function ip(n){if(!n){oi("Enter a review playlist URL.");return}const e=Yg(n,window.location.href);oi("Loading review playlist...");const t=await fetch(e);if(!t.ok){const s=t.statusText?` ${t.statusText}`:"";throw new Error(`Failed to fetch review playlist from ${e} (${t.status}${s})`)}const i=qg(await t.text());await jg(i,t.url||e)}async function zo(n){const e=Tn,t=e?.manifest.items[n];if(!(!e||!t||e.loading)){e.loading=!0,e.currentIndex=n,nr(),oi(`Loading ${Bu(t,n)}...`);try{(!re||e.currentReplayId!==t.replay)&&(await Sd(vR(t,e)),e.currentReplayId=t.replay);const i=Math.max(0,tp(t.start)),s=Math.min(re?.getState().duration??Number.POSITIVE_INFINITY,Math.max(i,tp(t.end)));if(!Number.isFinite(i)||!Number.isFinite(s)||s<=i)throw new Error("Review item has an empty playback range.");const a=Kg(t);a&&re?.replay.players.some(r=>r.id===a)&&(re.setAttachedPlayer(a),re.setCameraViewMode("follow"),ei=null),Hn.checked=!1,e.currentClip={startTime:i,endTime:s},re?.setState({currentTime:i,playing:!1,skipPostGoalTransitionsEnabled:!1}),oi(`${i.toFixed(2)}s to ${s.toFixed(2)}s`)}catch(i){console.error("Failed to activate mechanics review item:",i),e.currentClip=null,oi(i instanceof Error?i.message:"Failed to load review item")}finally{e.loading=!1,nr()}}}function bR(){const n=Tn?.currentClip;!n||!re||re.setState({currentTime:n.startTime,playing:!0,skipPostGoalTransitionsEnabled:!1})}function xR(n){const e=Tn?.currentClip;if(!e||!re||go)return!1;const t=n.currentTime<e.startTime-.1,i=n.currentTime>=e.endTime-.025;if(!t&&!i)return!1;go=!0;try{re.setState({currentTime:t?e.startTime:e.endTime,playing:!1,skipPostGoalTransitionsEnabled:!1})}finally{go=!1}return!0}function sp(n,e){const t=document.createElement("section");t.className="module-summary-group";const i=document.createElement("h3");i.textContent=n;const s=document.createElement("div");return s.className="module-list",s.append(...e),t.append(i,s),t}function hc(n,e){const t={"absolute-positioning:ranges":"Position zones","backboard:events":"Backboard","ball-carry:events":"Ball carry","boost:ranges":"Boost pickup timeline","ceiling-shot:events":"Ceiling shot","demo:events":"Demo","dodge-reset:events":"Dodge reset","double-tap:events":"Double tap","fifty-fifty:events":"50/50","half-flip:events":"Half flip","musty-flick:events":"Musty flick","possession:ranges":"Possession","powerslide:events":"Powerslide","pressure:ranges":"Half control","rush:ranges":"Rush","speed-flip:events":"Speed flip","touch:events":"Touch","wavedash:events":"Wavedash"},i={"absolute-positioning":"Position zones","ceiling-shot":"Ceiling shot labels","fifty-fifty":"50/50 labels",pressure:"Half control","relative-positioning":"Player roles","speed-flip":"Speed flip labels",touch:"Touch labels"};return e==="effects"?i[n.id]??n.label:t[`${n.id}:${e}`]??`${n.label} timeline`}function fc(n,e,t){const i=Hg(t),s=i.has(n),a=document.createElement("button");a.type="button",a.className="module-summary-item",a.dataset.active=s?"true":"false",a.setAttribute("aria-pressed",s?"true":"false"),a.addEventListener("click",()=>{ZC(n,t,!i.has(n))});const r=document.createElement("span");r.textContent=e;const o=document.createElement("strong");return o.textContent=s?"On":"Off",a.append(r,o),a}function rs(){wa.replaceChildren();const n=aa(),e=si.filter(t=>t.id!=="boost"&&t.id!==mg).map(t=>t.renderSettings?.(n)??null).filter(t=>t instanceof HTMLElement);if(e.length===0){wa.hidden=!0,ap(),rp();return}wa.hidden=!1,wa.append(...e),ap(),rp()}function ap(){if(!Cu)return;const n=aa(),e=Qo.renderSettings(n,{showHeader:!1});Cu.replaceChildren(e)}function rp(){if(!lo)return;const n=aa(),t=el.find(i=>i.id===mg)?.renderSettings?.(n)??null;lo.replaceChildren(),t instanceof HTMLElement&&lo.append(t)}function SR(n){return es.find(e=>e.id===n)??null}function wR(n){return ss?wt(ss,n):null}function yd(n,e){return e==="blue"?n.team_zero??null:n.team_one??null}function bd(n){return n==="blue"?"Blue":"Orange"}function Jg(n){const e=re?.replay.players.find(t=>t.id===n);return e?na(e.isTeamZero):null}function rr(n){return na(n==="blue")}function Qg(n,e){const t=re?.replay.players??[];for(const i of["blue","orange"]){const s=t.filter(r=>r.isTeamZero===(i==="blue"));if(s.length===0)continue;const a=document.createElement("optgroup");a.label=`${bd(i)} team`;for(const r of s)a.append(new Option(r.name,r.id,r.id===e,r.id===e));n.append(a)}}function MR(n){return n.kind==="player"?Jg(n.playerId):n.kind==="team"?rr(n.team??"blue"):null}function ER(n,e){return n.scope==="player"?Jg(e):rr(e==="orange"?"orange":"blue")}function TR(n){switch(n){case"player":return"Player stats";case"team":return"Team stats";case"all-players":return"All players stats";case"all-teams":return"All teams stats";case"mechanics-overview":return"Mechanics counts";case"goals-overview":return"Goal labels";case"ad-hoc":return"Ad hoc stats"}}function e_(n){return n==="player"||n==="team"}function AR(n){return n!=="mechanics-overview"&&n!=="goals-overview"}function t_(n){switch(n){case"player":case"all-players":return"player";case"team":case"all-teams":return"team";case"mechanics-overview":case"goals-overview":return null;case"ad-hoc":return null}}function CR(){const n=as.size*18;return{x:Math.max(12,Math.min(window.innerWidth-360,96+n)),y:Math.max(64,Math.min(window.innerHeight-240,96+n))}}function or(n=re?.getState().frameIndex??0,e={}){for(const t of as.values())e.preserveOpenPickers&&(t.pickerOpen||t.element.contains(document.activeElement))||Vn(t,n)}function n_(n,e){const t=e?.id??`stats-${Da++}`,i=Number.parseInt(t.replace(/^stats-/,""),10);Number.isFinite(i)&&(Da=Math.max(Da,i+1));const{x:s,y:a}=CR(),r=document.createElement("section");r.className="stats-window",r.dataset.windowId=t,r.style.setProperty("--window-x",`${s}px`),r.style.setProperty("--window-y",`${a}px`),e&&$g(r,e.placement);const o=document.createElement("header");o.className="stats-window-header";const l=document.createElement("div");l.className="stats-window-actions";const c=document.createElement("button");if(c.type="button",c.className="stats-window-action",c.textContent="Hide",l.append(c),e_(n))o.classList.add("stats-window-header-actions-only"),o.append(l);else{const h=document.createElement("h2");h.textContent=TR(n),o.append(h,l)}const u=document.createElement("div");u.className="stats-window-body",r.append(o,u),Ru.append(r);const d={id:t,kind:n,entries:e?.entries.map(h=>({key:`${t}:${h.statId}:${h.targetId??"scope"}`,statId:h.statId,targetId:h.targetId}))??[],playerId:e?.playerId??re?.replay.players[0]?.id??null,team:e?.team??"blue",pickerOpen:!1,query:"",element:r,body:u};return c.addEventListener("click",()=>{r.hidden=!0,Ze()}),as.set(t,d),e||sl(r),Ua(!1),Vn(d),Ze(),d}function RR(n){for(const e of as.values())e.element.remove();as.clear(),Da=1;for(const e of n)n_(e.kind,e)}function Vn(n,e=re?.getState().frameIndex??0){const t=document.activeElement,i=t instanceof HTMLInputElement&&t.dataset.statsWindowSearch===n.id,s=i?t.selectionStart:null,a=i?t.selectionEnd:null,r=i?t.selectionDirection:null;if(n.body.replaceChildren(),PR(n),AR(n.kind)&&(LR(n),IR(n)),UR(n,e),i){const o=n.body.querySelector(`input[data-stats-window-search="${n.id}"]`);o?.focus({preventScroll:!0}),o&&s!==null&&a!==null&&o.setSelectionRange(s,a,r??"none")}}function PR(n){if(n.kind!=="player"&&n.kind!=="team")return;const e=document.createElement("div");e.className="stats-window-scope-row";const t=document.createElement("select");t.className="stats-window-scope-select";const i=MR(n);i&&t.classList.add(i),t.setAttribute("aria-label",n.kind==="player"?"Player stats target":"Team stats target"),n.kind==="player"?(Qg(t,n.playerId),t.value=n.playerId??"",t.addEventListener("change",()=>{n.playerId=t.value||null,Vn(n),Ze()})):(t.append(new Option("Blue","blue",n.team==="blue",n.team==="blue"),new Option("Orange","orange",n.team==="orange",n.team==="orange")),t.value=n.team??"blue",t.addEventListener("change",()=>{n.team=t.value==="orange"?"orange":"blue",Vn(n),Ze()})),e.append(t),n.body.append(e)}function LR(n){const e=document.createElement("button");if(e.type="button",e.className="stats-window-add-button",e.textContent="+",e.title="Add stat",e.setAttribute("aria-label","Add stat"),e.setAttribute("aria-expanded",String(n.pickerOpen)),zu(e,()=>{n.pickerOpen=!n.pickerOpen,Vn(n)}),e_(n.kind)){n.body.querySelector(".stats-window-scope-row")?.append(e);return}const t=document.createElement("div");t.className="stats-window-toolbar",t.append(e),n.body.append(t)}function zu(n,e){let t=!1;n.addEventListener("pointerdown",i=>{n.disabled||(t=!0,i.preventDefault(),e())}),n.addEventListener("click",()=>{if(t){t=!1;return}n.disabled||e()})}function IR(n){const e=document.createElement("div");if(e.className="stats-window-picker",e.hidden=!n.pickerOpen,e.hidden){n.body.append(e);return}const t=t_(n.kind),i=document.createElement("input");i.type="search",i.placeholder="Search stats",i.value=n.query,i.dataset.statsWindowSearch=n.id;const s=document.createElement("div");s.className="stats-window-picker-list",i.addEventListener("input",()=>{n.query=i.value,op(n,s,t)}),op(n,s,t),e.append(i,s),n.body.append(e)}function op(n,e,t){e.replaceChildren();const i=t?es.filter(r=>r.scope===t):es,s=eC(i,n.query),a=new Map;for(const r of s){const o=a.get(r.category)??[];o.push(r),a.set(r.category,o)}for(const[r,o]of a){if(o.length<2)continue;const l=document.createElement("button");l.type="button",l.className="stats-window-picker-item",l.innerHTML=`<span>Add all ${r}</span><strong>${o.length}</strong>`,zu(l,()=>{for(const c of o)lp(n,c);Vn(n),Ze()}),e.append(l)}for(const r of s){const o=document.createElement("button");o.type="button",o.className="stats-window-picker-item",o.innerHTML=`<span>${r.label}</span><strong>${r.scope}</strong>`,o.disabled=n.kind!=="ad-hoc"&&n.entries.some(l=>l.statId===r.id),zu(o,()=>{lp(n,r),Vn(n),Ze()}),e.append(o)}if(s.length===0){const r=document.createElement("p");r.className="stat-window-empty",r.textContent=es.length===0?"No stats available.":"No matching stats.",e.append(r)}}function lp(n,e){const t=n.kind==="ad-hoc"?NR(e):void 0;n.entries.some(i=>i.statId===e.id&&i.targetId===t)||n.entries.push({key:`${n.id}:${e.id}:${t??"scope"}`,statId:e.id,targetId:t})}function NR(n){return n.scope==="player"?re?.replay.players[0]?.id??"":"blue"}function DR(n,e){const t=n.entries.findIndex(i=>i.key===e);t>=0&&n.entries.splice(t,1)}function UR(n,e){if(n.kind==="mechanics-overview"){FR(n);return}if(n.kind==="goals-overview"){OR(n);return}const t=wR(e),i=t_(n.kind),s=n.entries.map(a=>({entry:a,definition:SR(a.statId)})).filter(a=>a.definition!==null&&(!i||a.definition.scope===i));if(s.length===0){const a=document.createElement("p");a.className="stat-window-empty",a.textContent="No stats added.",n.body.append(a);return}if(!t){const a=document.createElement("p");a.className="stat-window-empty",a.textContent="Load a replay to show stats.",n.body.append(a);return}if(n.kind==="all-players"){BR(n,t,s);return}if(n.kind==="all-teams"){zR(n,t,s);return}if(n.kind==="player"){const a=n.playerId?t.players.find(r=>At(r.player_id)===n.playerId)??null:null;cp(n,a,s);return}if(n.kind==="team"){cp(n,yd(t,n.team??"blue"),s);return}n.kind==="ad-hoc"&&HR(n,t,s)}function FR(n){const e=$t,t=re?.replay??null;if(!e||!t){Ho(n,"Load a replay to show mechanics.");return}const i=t.players,s=new Map(i.map(_=>[_.id,_.name])),a=new Map(i.map(_=>[_.id,_.isTeamZero])),r=wm(e);if(r.length===0){Ho(n,"No mechanic events loaded.");return}const o=new Map,l=new Map;for(const _ of e.events.mechanics??[]){if(!Zo(_.kind))continue;const m=At(_.player_id),p=`${_.kind}:${m}`;o.set(p,(o.get(p)??0)+1);const w=`${_.kind}:${_.is_team_0?"blue":"orange"}`;l.set(w,(l.get(w)??0)+1),s.has(m)||(s.set(m,m),a.set(m,_.is_team_0))}const c=[...i.map(_=>_.id),...[...s.keys()].filter(_=>!i.some(m=>m.id===_))],u=document.createElement("div");u.className="stats-overview-table-wrap";const d=document.createElement("table");d.className="stats-overview-table mechanics-count-table";const h=document.createElement("thead"),f=document.createElement("tr");for(const _ of["Mechanic","Blue","Orange",...c.map(m=>s.get(m)??m)]){const m=document.createElement("th");m.scope="col",m.textContent=_,f.append(m)}h.append(f);const g=document.createElement("tbody");for(const _ of r){const m=document.createElement("tr"),p=document.createElement("th");p.scope="row",p.textContent=Ci(_),m.append(p);for(const w of["blue","orange"]){const S=document.createElement("td");S.className=`stats-overview-count ${rr(w)}`,S.textContent=String(l.get(`${_}:${w}`)??0),m.append(S)}for(const w of c){const S=document.createElement("td"),v=a.get(w);v!==void 0?S.className=`stats-overview-count ${na(v)}`:S.className="stats-overview-count",S.textContent=String(o.get(`${_}:${w}`)??0),m.append(S)}g.append(m)}d.append(h,g),u.append(d),n.body.append(u)}function OR(n){const e=$t,t=re?.replay??null;if(!e||!t){Ho(n,"Load a replay to show goal labels.");return}const i=[...e.events.goal_context??[]].sort((l,c)=>l.time-c.time),s=new Map;for(const l of e.events.goal_tags??[]){const c=s.get(l.goal_index)??[];c.push(l),s.set(l.goal_index,c)}for(const l of s.values())l.sort((c,u)=>c.kind.localeCompare(u.kind)||u.confidence-c.confidence);const a=new Set(i.map((l,c)=>c));for(const l of s.keys())a.add(l);const r=[...a].sort((l,c)=>l-c);if(r.length===0){Ho(n,"No goals loaded.");return}const o=document.createElement("div");o.className="goal-label-list";for(const l of r){const c=i[l]??null,u=s.get(l)??[],d=u[0]??null,h=c?.time??d?.time??0,f=c?.scorer??d?.scorer??null,g=f?t.players.find(E=>E.id===At(f))?.name??At(f):"Unknown scorer",_=c?.scoring_team_is_team_0??d?.scoring_team_is_team_0??null,m=document.createElement("section");m.className="goal-label-item",_!==null&&m.classList.add(na(_));const p=document.createElement("header"),w=document.createElement("h3");w.textContent=`Goal ${l+1}`;const S=document.createElement("span");S.textContent=`${kR(h)} · ${g}`,p.append(w,S);const v=document.createElement("div");if(v.className="goal-label-tags",u.length===0){const E=document.createElement("span");E.className="goal-label-tag goal-label-tag-empty",E.textContent="Unlabeled",v.append(E)}else for(const E of u){const A=document.createElement("span");A.className="goal-label-tag",A.textContent=`${Ci(E.kind)} ${Math.round(E.confidence*100)}%`,v.append(A)}const R=document.createElement("div");R.className="goal-label-actions";const T=document.createElement("button");T.type="button",T.textContent="Go",T.addEventListener("click",()=>{re?.seek(Math.max(0,h-2))}),R.append(T),m.append(p,v,R),o.append(m)}n.body.append(o)}function Ho(n,e){const t=document.createElement("p");t.className="stat-window-empty",t.textContent=e,n.body.append(t)}function kR(n){if(!Number.isFinite(n))return"--";const e=Math.floor(Math.max(0,n)/60),t=Math.max(0,n)-e*60;return`${e}:${t.toFixed(1).padStart(4,"0")}`}function cp(n,e,t){const i=document.createElement("div");i.className="stats-window-stat-list";for(const{entry:s,definition:a}of t)i.append(al(n,s,a,e?a.format(a.read(e)):"--"));n.body.append(i)}function BR(n,e,t){const i=document.createElement("div");i.className="stats-window-team-list";for(const s of["blue","orange"]){const a=e.players.filter(d=>d.is_team_0===(s==="blue"));if(a.length===0)continue;const r=document.createElement("section");r.className=`stats-window-team-group ${rr(s)}`;const o=document.createElement("header");o.className="stats-window-team-header";const l=document.createElement("h3");l.textContent=`${bd(s)} team`;const c=document.createElement("span");c.textContent=`${a.length} player${a.length===1?"":"s"}`,o.append(l,c),r.append(o);const u=document.createElement("div");u.className="stats-window-entity-list";for(const d of a){const h=document.createElement("section");h.className=`stats-window-entity ${na(d.is_team_0)}`;const f=document.createElement("h4");f.className="stats-window-entity-title",f.textContent=d.name,h.append(f);for(const{entry:g,definition:_}of t)h.append(al(n,g,_,_.format(_.read(d))));u.append(h)}r.append(u),i.append(r)}n.body.append(i)}function zR(n,e,t){const i=document.createElement("div");i.className="stats-window-entity-list";for(const s of["blue","orange"]){const a=yd(e,s),r=document.createElement("section");r.className=`stats-window-entity ${rr(s)}`;const o=document.createElement("h3");o.className="stats-window-entity-title",o.textContent=bd(s),r.append(o);for(const{entry:l,definition:c}of t)r.append(al(n,l,c,a?c.format(c.read(a)):"--"));i.append(r)}n.body.append(i)}function HR(n,e,t){const i=document.createElement("div");i.className="stats-window-stat-list";for(const{entry:s,definition:a}of t){const r=VR(e,a,s.targetId);i.append(al(n,s,a,r?a.format(a.read(r)):"--"))}n.body.append(i)}function VR(n,e,t){return e.scope==="player"?n.players.find(i=>At(i.player_id)===t)??n.players[0]??null:yd(n,t==="orange"?"orange":"blue")}function al(n,e,t,i){const s=document.createElement("div");s.className="stats-window-stat-row";const a=document.createElement("span");if(a.className="stats-window-stat-name",a.textContent=t.label,n.kind==="ad-hoc"){const l=document.createElement("select");l.className="stats-window-stat-target";const c=ER(t,e.targetId);c&&l.classList.add(c),t.scope==="player"?Qg(l,e.targetId):l.append(new Option("Blue","blue",e.targetId==="blue",e.targetId==="blue"),new Option("Orange","orange",e.targetId==="orange",e.targetId==="orange")),l.value=e.targetId??"",l.addEventListener("change",()=>{const u=l.value;if(n.entries.some(h=>h!==e&&h.statId===e.statId&&h.targetId===u)){Vn(n);return}const d=n.entries.findIndex(h=>h.key===e.key);d>=0&&(n.entries[d]={key:`${n.id}:${e.statId}:${u}`,statId:e.statId,targetId:u}),Vn(n),Ze()}),a.append(" ",l)}const r=document.createElement("span");r.className="stats-window-stat-value",r.textContent=i;const o=document.createElement("button");return o.type="button",o.className="stats-window-stat-remove",o.textContent="x",o.addEventListener("click",()=>{DR(n,e.key),Vn(n),Ze()}),s.append(a,r,o),s}function fn(n,e="",t=0){return n===void 0||Number.isNaN(n)?"--":`${n.toFixed(t)}${e}`}function i_(){return{fov:110,height:100,pitch:-4,distance:270,stiffness:0,swivelSpeed:1,transitionSpeed:1}}function GR(n){return!re||n===null?null:re.replay.players.find(e=>e.id===n)?.cameraSettings??null}function s_(n){return{...i_(),...GR(n.attachedPlayerId)??{},...n.customCameraSettings??{}}}function up(){return{fov:Number(Za.value),height:Number(Ka.value),pitch:Number(ja.value),distance:Number(Ja.value),stiffness:Number(Qa.value),swivelSpeed:Number(er.value),transitionSpeed:Number(tr.value)}}function WR(n){Oo.hidden=!vi.checked,Za.disabled=!n,Ka.disabled=!n,ja.disabled=!n,Ja.disabled=!n,Qa.disabled=!n,er.disabled=!n,tr.disabled=!n}function a_(n){const e=i_(),t=n.fov??e.fov,i=n.height??e.height,s=n.pitch??e.pitch,a=n.distance??e.distance,r=n.stiffness??e.stiffness,o=n.swivelSpeed??e.swivelSpeed,l=n.transitionSpeed??e.transitionSpeed;Za.value=`${t}`,Ka.value=`${i}`,ja.value=`${s}`,Ja.value=`${a}`,Qa.value=`${r}`,er.value=`${o}`,tr.value=`${l}`,Mg.textContent=fn(t,"",0),Eg.textContent=fn(i,"",0),Tg.textContent=fn(s,"",0),Ag.textContent=fn(a,"",0),Cg.textContent=fn(r,"",2),Rg.textContent=fn(o,"",1),Pg.textContent=fn(l,"",2)}function dp(n){Fo.disabled=!n,Qi.disabled=!n,wi.disabled=!n,Hn.disabled=!n,ai.disabled=!n,xd(n?re?.getState():void 0)}function $R(n){switch(n){case"free":return Pu;case"follow":return Lu}}function xd(n){const e=n?.cameraViewMode??"free",t=re!==null&&n!==void 0,i=(n?.attachedPlayerId??null)!==null;for(const s of GC){const a=$R(s);a.disabled=!t||s==="follow"&&!i;const r=s===e;a.dataset.active=r?"true":"false",a.setAttribute("aria-pressed",r?"true":"false")}Pa.disabled=!t,La.disabled=!t,Pa.dataset.active="false",La.dataset.active="false",Pa.setAttribute("aria-pressed","false"),La.setAttribute("aria-pressed","false")}function Hu(n){xd(n);const e=re!==null&&n?.cameraViewMode==="follow"&&(n.attachedPlayerId??null)!==null;Ia.disabled=!e,vi.disabled=!e,WR(e&&n?.customCameraSettings!==null),Na.disabled=!e}function XR(n){wi.replaceChildren(),wi.append(new Option("Free camera",""));for(const e of n)wi.append(new Option(`${e.name} (${e.isTeamZero?"Blue":"Orange"})`,e.id))}function qR(n){if(n<=0)return"--";const e=["B","KB","MB","GB"];let t=n,i=0;for(;t>=1024&&i<e.length-1;)t/=1024,i+=1;const s=i===0?0:t>=10?1:2;return`${t.toFixed(s)} ${e[i]}`}function YR(n){if(!n)return"No replay";if(n.error)return n.error;switch(n.state){case"idle":return"Idle";case"recording":return"Recording";case"stopping":return"Stopping";case"ready":return"Ready";case"error":return"Error"}}function hp(){const n=Number(Qs.value),e=Number(ea.value);return{fps:Number.isFinite(n)?Math.max(1,Math.min(120,Math.trunc(n))):60,playbackRate:Number.isFinite(e)?Math.max(.1,e):1}}function En(n=kt?.getStatus()??null){const e=kt!==null&&re!==null,t=n?.state??"idle",i=t==="recording"||t==="stopping",s=(kt?.getRecording()??null)!==null;Og.textContent=YR(n),kg.textContent=`${(n?.elapsedSeconds??0).toFixed(1)}s`,Bg.textContent=qR(n?.sizeBytes??0),zg.textContent=n?.mimeType||"WebM",Du.disabled=!e||i,Uu.disabled=!e||i,Fu.disabled=!e||!i,Ou.disabled=!s||i,ku.disabled=!s||i,Qs.disabled=i,ea.disabled=i}function ZR(){const e=(Bo?.replace(/\.replay$/i,"")||"replay").replace(/[^a-zA-Z0-9._-]+/g,"-").replace(/^-+|-+$/g,""),t=new Date().toISOString().replace(/[:.]/g,"-");return`${e||"replay"}-${t}.webm`}function KR(n){const e=URL.createObjectURL(n),t=document.createElement("a");t.href=e,t.download=ZR(),document.body.append(t),t.click(),t.remove(),window.setTimeout(()=>URL.revokeObjectURL(e),0)}function r_(n){const e=n?.attachedPlayerId??null;if(!re||n?.cameraViewMode!=="follow"||e===null){co.textContent="Free camera",uo.textContent="--",ho.textContent="--",fo.textContent="--",po.textContent="--",mo.textContent="--";return}const t=re.replay.players.find(s=>s.id===e);if(!t){co.textContent="Unknown",uo.textContent="--",ho.textContent="--",fo.textContent="--",po.textContent="--",mo.textContent="--";return}const i=s_(n);co.textContent=n.customCameraSettings===null?t.name:`${t.name} custom`,uo.textContent=fn(i.fov,"",0),ho.textContent=fn(i.height,"",0),fo.textContent=fn(i.pitch,"",0),po.textContent=fn(i.distance,"",0),mo.textContent=fn(i.stiffness,"",2)}function fp(n){xR(n)||(Lg.textContent=`${n.currentTime.toFixed(2)}s`,Ig.textContent=`${n.frameIndex}`,Ng.textContent=`${n.duration.toFixed(2)}s`,Dg.textContent=n.playing?"Playing":"Paused",Fo.textContent=n.playing?"Pause":"Play",Qi.value=`${n.speed}`,Ia.value=`${n.cameraDistanceScale}`,wg.textContent=`${n.cameraDistanceScale.toFixed(2)}x`,vi.checked=n.customCameraSettings!==null,Oo.hidden=!vi.checked,a_(s_(n)),Na.checked=n.ballCamEnabled,wi.value=n.attachedPlayerId??"",Hn.checked=n.skipPostGoalTransitionsEnabled,ai.checked=n.skipKickoffsEnabled,Do.hidden=!0,Hu(n),r_(n),or(n.frameIndex,{preserveOpenPickers:!0}))}function jR(n){return Qo.includePickup(n)}function JR(n){return{name:n.name,preparingStatus:"Preparing replay...",async readBytes(){return new Uint8Array(await n.arrayBuffer())}}}function QR(n,e){return{name:n.name,preparingStatus:"Fetching replay...",async readBytes(){const t=await fetch(n.url,{...n.fetchInit,signal:e});if(!t.ok){const i=t.statusText?` ${t.statusText}`:"",s=n.kind==="ballchasing"&&[401,403,404].includes(t.status)?". The replay may be private, unavailable, or not downloadable without a Ballchasing session":"";throw new Error(`Failed to fetch replay from ${n.url.href} (${t.status}${i})${s}`)}return new Uint8Array(await t.arrayBuffer())}}}async function Sd(n){mn.textContent=n.preparingStatus,Gs.disabled=!0,_i?.show(n.name,n.preparingStatus),dp(!1),Hu(),Do.hidden=!1,Os&&(Os(),Os=null),_d(),re?.destroy(),re=null,kt=null,Bo=null,_n=null,$t=null,ss=null,es=Ro(null),nl(),il(),Vg(),Mi(),Fa(),rs(),En();try{const e=await n.readBytes();mn.textContent="Parsing replay...",_i?.show(n.name,"Parsing replay...");const t=await PE(e,{reportEveryNFrames:100,onProgress(r){mn.textContent=pm(r),_i?.update(r)}}),{replay:i}=t;$t=t.statsTimeline,ss=T1($t),es=Ro($t.frames[0]??null),_n=ME({replayEvents:r=>Tm(r.replay,Ii)});const s=oE({onStatusChange:En});kt=s;const a=$i;if(re=new bM(gg,i,{initialPlaybackRate:a?.playback.rate,initialCameraDistanceScale:a?.camera.distanceScale??pg,initialCustomCameraSettings:a?.camera.customSettings??null,initialAttachedPlayerId:a?.camera.attachedPlayerId??null,initialCameraViewMode:a?.camera.mode,initialBallCamEnabled:a?.camera.ballCam??!1,initialBoostPickupAnimationEnabled:a?.overlays.boostPickupAnimation??!1,initialSkipPostGoalTransitionsEnabled:Hn.checked,initialSkipKickoffsEnabled:ai.checked,plugins:[LM(),nE({includePickup:jR}),s,_n]}),vd(),tl(),Os=re.subscribe(fp),a){Ws=!0;try{uR(a)}finally{Ws=!1}}XR(i.players),Do.hidden=!0,mn.textContent=`Loaded ${n.name}`,Bo=n.name,Ug.textContent=i.players.map(r=>r.name).join(", "),Fg.textContent=`${i.frameCount}`,Mi(),Fa(),dp(!0),Hu(re.getState()),fp(re.getState()),or(re.getState().frameIndex),rs(),En(),_i?.hide()}catch(e){throw _i?.hide(),re?.destroy(),re=null,kt=null,En(),e}finally{Gs.disabled=!1}}function eP(n){let e;try{e=SC(window.location.search,window.location.href)}catch(t){console.error("Invalid replay URL:",t),mn.textContent=t instanceof Error?t.message:"Invalid replay URL";return}e&&Sd(QR(e,n)).catch(t=>{n.aborted||(console.error("Failed to load replay URL:",t),mn.textContent=t instanceof Error?t.message:"Failed to load replay URL")})}function tP(n){Zr?.(),n.innerHTML=EE(pg),Si=n,_i=LE(n),Gs=ae(n,"#replay-file"),gg=ae(n,"#viewport"),Do=ae(n,"#empty-state"),qf=ae(n,"#empty-load-replay"),Uo=ae(n,"#launcher-toggle"),wu=ae(n,"#launcher-menu"),Yf=ae(n,"#load-replay-action"),Zf=ae(n,"#floating-window-layer"),oo=ae(n,"#mechanics-timeline-window-body"),Yr=ae(n,"#mechanics-review-file"),dc=ae(n,"#mechanics-review-url"),Kf=ae(n,"#mechanics-review-load-url"),Mu=ae(n,"#mechanics-review-status"),_g=ae(n,"#mechanics-review-index"),vg=ae(n,"#mechanics-review-title"),yg=ae(n,"#mechanics-review-mechanic"),bg=ae(n,"#mechanics-review-player"),xg=ae(n,"#mechanics-review-reason"),Eu=ae(n,"#mechanics-review-prev"),Tu=ae(n,"#mechanics-review-replay"),Au=ae(n,"#mechanics-review-next"),Sg=ae(n,"#mechanics-review-count"),Sa=ae(n,"#mechanics-review-list"),Cu=ae(n,"#boost-pickup-filters-window-body"),lo=ae(n,"#touch-controls-window-body"),Ru=ae(n,"#stats-window-layer"),Fo=ae(n,"#toggle-playback"),Qi=ae(n,"#playback-rate"),wi=ae(n,"#attached-player"),Pu=ae(n,"#camera-view-free"),Lu=ae(n,"#camera-view-follow"),Pa=ae(n,"#camera-view-overhead"),La=ae(n,"#camera-view-side"),Ia=ae(n,"#camera-distance"),wg=ae(n,"#camera-distance-readout"),vi=ae(n,"#custom-camera-settings"),Oo=ae(n,"#camera-settings-controls"),Za=ae(n,"#custom-camera-fov"),Ka=ae(n,"#custom-camera-height"),ja=ae(n,"#custom-camera-pitch"),Ja=ae(n,"#custom-camera-distance"),Qa=ae(n,"#custom-camera-stiffness"),er=ae(n,"#custom-camera-swivel-speed"),tr=ae(n,"#custom-camera-transition-speed"),Mg=ae(n,"#custom-camera-fov-readout"),Eg=ae(n,"#custom-camera-height-readout"),Tg=ae(n,"#custom-camera-pitch-readout"),Ag=ae(n,"#custom-camera-distance-readout"),Cg=ae(n,"#custom-camera-stiffness-readout"),Rg=ae(n,"#custom-camera-swivel-speed-readout"),Pg=ae(n,"#custom-camera-transition-speed-readout"),Na=ae(n,"#ball-cam"),Iu=ae(n,"#module-summary"),wa=ae(n,"#module-settings"),Lg=ae(n,"#time-readout"),Ig=ae(n,"#frame-readout"),Ng=ae(n,"#duration-readout"),Dg=ae(n,"#playback-status-readout"),mn=ae(n,"#status-readout"),Ug=ae(n,"#players-readout"),Fg=ae(n,"#frames-readout"),Nu=ae(n,"#events-readout"),co=ae(n,"#camera-profile-readout"),uo=ae(n,"#camera-fov-readout"),ho=ae(n,"#camera-height-readout"),fo=ae(n,"#camera-pitch-readout"),po=ae(n,"#camera-base-distance-readout"),mo=ae(n,"#camera-stiffness-readout"),Hn=ae(n,"#skip-post-goal-transitions"),ai=ae(n,"#skip-kickoffs"),Qs=ae(n,"#recording-fps"),ea=ae(n,"#recording-playback-rate"),Du=ae(n,"#recording-start"),Uu=ae(n,"#recording-full-replay"),Fu=ae(n,"#recording-stop"),Ou=ae(n,"#recording-download"),ku=ae(n,"#recording-clear"),Og=ae(n,"#recording-status"),kg=ae(n,"#recording-elapsed"),Bg=ae(n,"#recording-size"),zg=ae(n,"#recording-type");const e=dg(window.location),t=RC(window.location);let i=null;try{$i=CC(window.location)}catch(o){i=o,console.error("Invalid stats player config:",o),mn.textContent=o instanceof Error?o.message:"Invalid stats player config",$i=null}t&&rR(e,$i,i);const s=new AbortController;Qf(Zf,s.signal),Qf(Ru,s.signal);const a=()=>{s.abort(),Os?.(),Os=null,_d(),re?.destroy(),re=null,kt=null,_n=null,$t=null,ss=null,es=Ro(null),as.clear(),nl(),il(),Vg(),si=[],_i?.destroy(),_i=null,Ii=new Set,ia=new Set,an=new Set,sa=new Set,Tn=null,go=!1,ri=!0,Bo=null,ei=null,$i=null,ji!==null&&(window.clearTimeout(ji),ji=null),Ws=!1,Da=1,ko=30,Lo=null,Si===n&&(Si=null,n.replaceChildren()),Zr===a&&(Zr=null)};if(Zr=a,$i){Ws=!0;try{lR($i)}finally{Ws=!1}}Uo.addEventListener("click",()=>{Ua(wu.hidden)},{signal:s.signal}),n.addEventListener("click",o=>{o.target instanceof Element&&(o.target.closest(".top-chrome")||Ua(!1))},{signal:s.signal}),Yf.addEventListener("click",Jf,{signal:s.signal}),qf.addEventListener("click",Jf,{signal:s.signal}),n.querySelectorAll("[data-window-toggle]").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.windowToggle;l&&(hR(l),Ua(!1))},{signal:s.signal})}),n.querySelectorAll("[data-window-hide]").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.windowHide??jC(o);l&&fR(l)},{signal:s.signal})}),n.querySelectorAll("[data-create-stats-window]").forEach(o=>{o.addEventListener("click",()=>{n_(o.dataset.createStatsWindow)},{signal:s.signal})}),Gs.addEventListener("change",async()=>{const o=Gs.files?.[0];if(o)try{Tn&&(Tn.currentClip=null,Tn.currentReplayId=null,nr()),await Sd(JR(o))}catch(l){console.error("Failed to load replay:",l),mn.textContent=l instanceof Error?l.message:"Failed to load replay"}},{signal:s.signal}),Yr.addEventListener("change",async()=>{const o=Yr.files?.[0];if(o)try{const l=qg(await o.text());await jg(l,null)}catch(l){console.error("Failed to load mechanics review playlist:",l),oi(l instanceof Error?l.message:"Failed to load mechanics review playlist")}finally{Yr.value=""}},{signal:s.signal}),Kf.addEventListener("click",()=>{ip(dc.value.trim()).catch(o=>{console.error("Failed to load mechanics review playlist URL:",o),oi(o instanceof Error?o.message:"Failed to load mechanics review playlist URL")})},{signal:s.signal}),Eu.addEventListener("click",()=>{const o=Tn;o&&zo(Math.max(0,o.currentIndex-1))},{signal:s.signal}),Tu.addEventListener("click",bR,{signal:s.signal}),Au.addEventListener("click",()=>{const o=Tn;o&&zo(Math.min(o.manifest.items.length-1,o.currentIndex+1))},{signal:s.signal}),Fo.addEventListener("click",()=>{re?.togglePlayback(),Ze()},{signal:s.signal}),Qi.addEventListener("change",()=>{re?.setPlaybackRate(Number(Qi.value)),Ze()},{signal:s.signal}),Du.addEventListener("click",()=>{if(kt)try{const{fps:o}=hp();kt.start({fps:o}),En()}catch(o){console.error("Failed to start recording:",o),mn.textContent=o instanceof Error?o.message:"Failed to start recording",En(kt.getStatus())}},{signal:s.signal}),Uu.addEventListener("click",()=>{if(!kt)return;const{fps:o,playbackRate:l}=hp();kt.recordFullReplay({fps:o,playbackRate:l,restorePlaybackState:!0}).catch(c=>{console.error("Failed to record replay:",c),mn.textContent=c instanceof Error?c.message:"Failed to record replay",En(kt?.getStatus()??null)}),En()},{signal:s.signal}),Fu.addEventListener("click",()=>{kt?.stop().catch(o=>{console.error("Failed to stop recording:",o),mn.textContent=o instanceof Error?o.message:"Failed to stop recording"}),En()},{signal:s.signal}),Ou.addEventListener("click",()=>{const o=kt?.getRecording();o&&KR(o)},{signal:s.signal}),ku.addEventListener("click",()=>{try{kt?.clear(),En()}catch(o){console.error("Failed to clear recording:",o)}},{signal:s.signal}),Qs.addEventListener("change",Ze,{signal:s.signal}),ea.addEventListener("change",Ze,{signal:s.signal}),Ia.addEventListener("input",()=>{re?.setCameraDistanceScale(Number(Ia.value)),Ze()},{signal:s.signal}),vi.addEventListener("change",()=>{Oo.hidden=!vi.checked,re?.setCustomCameraSettings(vi.checked?up():null),Ze()},{signal:s.signal});for(const o of[Za,Ka,ja,Ja,Qa,er,tr])o.addEventListener("input",()=>{const l=up();a_(l),re?.setCustomCameraSettings(l),Ze()},{signal:s.signal});wi.addEventListener("change",()=>{re?.setAttachedPlayer(wi.value||null),ei=null,Ze()},{signal:s.signal}),Pu.addEventListener("click",()=>{re?.setCameraViewMode("free"),ei=null,Ze()},{signal:s.signal}),Lu.addEventListener("click",()=>{re?.setCameraViewMode("follow"),ei=null,Ze()},{signal:s.signal}),Pa.addEventListener("click",()=>{re?.setFreeCameraPreset("overhead"),ei="overhead",Ze()},{signal:s.signal}),La.addEventListener("click",()=>{re?.setFreeCameraPreset("side"),ei="side",Ze()},{signal:s.signal}),Na.addEventListener("change",()=>{re?.setBallCamEnabled(Na.checked),Ze()},{signal:s.signal}),Hn.addEventListener("change",()=>{re?.setSkipPostGoalTransitionsEnabled(Hn.checked),Ze()},{signal:s.signal}),ai.addEventListener("change",()=>{re?.setSkipKickoffsEnabled(ai.checked),Ze()},{signal:s.signal}),ra(),rs(),r_(),xd(),En(),Mi(),nr(),eP(s.signal);const r=gR();return r&&(dc.value=r,dR("mechanics-review"),ip(r).catch(o=>{s.signal.aborted||(console.error("Failed to load mechanics review playlist from URL:",o),oi(o instanceof Error?o.message:"Failed to load mechanics review playlist from URL"))})),{root:n,destroy:a}}export{tP as mountStatEvaluationPlayer};
